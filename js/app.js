import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId, calculateWeights } from "./utils.js";

/* =======================
   GLOBAL & HELPERS
======================= */

window.SICO = { version: "2.0.0", colors: COLORS, series: SERIES };

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);
const nowISO = () => new Date().toISOString();

const storage = {
  get: (k, d = null) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? d; }
    catch { return d; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: k => localStorage.removeItem(k)
};

/* =======================
   STATE
======================= */

let recipes = storage.get("sico_recipes", []);
let currentRecipe = createEmptyRecipe();
let currentSeries = null;
let mode = storage.get("sico_mode", "percent");
let theme = storage.get("sico_theme", "auto");
let recipeFilter = "all";

/* =======================
   DOM CACHE
======================= */

const el = {
  themeToggle: qs("themeToggle"),
  seriesBadge: qs("seriesBadge"),
  recipeStats: qs("recipeStats"),
  totalColors: qs("totalColors"),
  totalPercent: qs("totalPercent"),
  totalWeightGrams: qs("totalWeightGrams"),
  colorList: qs("colorList"),
  addColorList: qs("addColorList"),
  recipeItems: qs("recipeItems"),
  recipeList: qs("recipeList"),
  modalOverlay: qs("modalOverlay"),
  modalTitle: qs("modalTitle"),
  modalBody: qs("modalBody"),
  modalConfirm: qs("modalConfirm"),
  toastContainer: qs("toastContainer"),
  loadingOverlay: qs("loadingOverlay"),
  photoPreview: qs("photoPreview")
};

/* =======================
   INIT
======================= */

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  setLang(currentLang);
  initSeriesFilter();
  loadDraft();
  bindEvents();
  renderAll();
});

/* =======================
   FACTORIES
======================= */

function createEmptyRecipe() {
  return {
    id: generateId(),
    name: "",
    note: "",
    items: [],
    status: "draft",
    photo: null,
    createdAt: nowISO(),
    updatedAt: nowISO()
  };
}

/* =======================
   THEME
======================= */

function applyTheme() {
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "auto" && prefersDark);

  document.documentElement.dataset.theme = theme;
  document.body.classList.toggle("dark", dark);

  el.themeToggle.querySelector(".theme-icon").textContent = dark ? "☀️" : "🌙";
  qs('meta[name="theme-color"]').content = dark ? "#0f172a" : "#f8fafc";
}

window.toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
window.setTheme = v => {
  theme = v;
  storage.set("sico_theme", theme);
  applyTheme();
  toast(t("themeChanged"), "success");
};

/* =======================
   SERIES / COLORS
======================= */

function initSeriesFilter() {
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>` +
    SERIES.map(x => `<option value="${x.id}">${x.id} - ${x.name[currentLang]}</option>`).join("");
  s.onchange = renderColors;
}

function renderColors() {
  const series = qs("seriesFilter").value;
  const q = qs("colorSearch").value.toLowerCase();

  let list = COLORS.filter(c =>
    (series === "ALL" || c.series === series) &&
    (!q || c.code.toLowerCase().includes(q) || c.name[currentLang].toLowerCase().includes(q))
  );

  qs("colorCount").textContent = `${list.length} ${t("colors")}`;
  el.colorList.innerHTML = list.map(c => colorCard(c)).join("");
}

function renderAddColors() {
  const q = qs("recipeSearch").value.toLowerCase();
  el.addColorList.innerHTML = COLORS
    .filter(c => (!currentSeries || c.series === currentSeries))
    .filter(c => !q || c.code.toLowerCase().includes(q) || c.name[currentLang].toLowerCase().includes(q))
    .map(c => colorCard(c, true))
    .join("");
}

const colorCard = (c, compact = false) => `
<div class="color-card ${compact ? "compact" : ""}" onclick="addColor('${c.code}')">
  <div class="color-swatch" style="background:${c.hex}"></div>
  <div class="color-info">
    <div class="color-code">${c.code}</div>
    <div class="color-name">${c.name[currentLang]}</div>
  </div>
</div>`;

/* =======================
   RECIPE LOGIC
======================= */

window.addColor = code => {
  const c = getColorByCode(code);
  if (!currentSeries) {
    currentSeries = c.series;
    el.seriesBadge.textContent = currentSeries;
    el.seriesBadge.style.display = "inline-flex";
  }
  if (c.series !== currentSeries) return toast(t("errorSeries"), "error");
  if (currentRecipe.items.some(i => i.code === code)) return toast(t("colorAlreadyAdded"), "warning");

  currentRecipe.items.push({ code, percent: 0 });
  redistribute();
  autosave();
  renderRecipe();
};

function redistribute() {
  const p = 100 / currentRecipe.items.length;
  currentRecipe.items.forEach(i => i.percent = +p.toFixed(2));
}

window.updateItem = (i, v) => {
  const w = getTotalWeight();
  currentRecipe.items[i].percent =
    mode === "percent"
      ? clamp(+v || 0, 0, 100)
      : clamp((+v || 0) / w * 100, 0, 100);
  autosave();
  renderRecipe();
};

window.removeItem = i => {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) currentSeries = null;
  autosave();
  renderRecipe();
};

/* =======================
   RENDER RECIPE
======================= */

function renderRecipe() {
  if (!currentRecipe.items.length) {
    el.recipeItems.innerHTML = emptyState();
    updateStats();
    return;
  }

  const w = getTotalWeight();
  el.recipeItems.innerHTML = currentRecipe.items.map((i, idx) => {
    const c = getColorByCode(i.code);
    const val = mode === "percent" ? i.percent : i.percent * w / 100;
    return `
    <div class="recipe-item">
      <div class="recipe-color">
        <div class="color-chip" style="background:${c.hex}"></div>
        <div>
          <div class="color-code">${i.code}</div>
          <div class="color-name">${c.name[currentLang]}</div>
        </div>
      </div>
      <input type="number" value="${formatNumber(val, 2)}"
        onchange="updateItem(${idx},this.value)">
      <span>${mode === "percent" ? "%" : "g"}</span>
      <button onclick="removeItem(${idx})">✕</button>
    </div>`;
  }).join("");

  updateStats();
}

const emptyState = () => `
<div class="empty-state">
  <div class="empty-icon">🎨</div>
  <p>${t("noColorsAdded")}</p>
</div>`;

/* =======================
   SAVE / DRAFT
======================= */

window.saveRecipe = () => {
  if (!validate()) return;

  showLoading();
  currentRecipe.updatedAt = nowISO();
  currentRecipe.totalWeight = getTotalWeight();
  currentRecipe.items = calculateWeights(currentRecipe.items, currentRecipe.totalWeight);

  const i = recipes.findIndex(r => r.id === currentRecipe.id);
  i >= 0 ? recipes[i] = { ...currentRecipe } : recipes.push({ ...currentRecipe });

  storage.set("sico_recipes", recipes);
  storage.del("sico_draft");
  hideLoading();
  toast(t("savedSuccess"), "success");
  clearDraft();
  showTab("recipes");
};

function autosave() {
  currentRecipe.updatedAt = nowISO();
  storage.set("sico_draft", currentRecipe);
}

function loadDraft() {
  const d = storage.get("sico_draft");
  if (!d) return;
  currentRecipe = d;
  currentSeries = d.series || null;
}

/* =======================
   UTILS
======================= */

function getTotalWeight() {
  const v = qs("totalWeight").value;
  return v === "custom" ? +qs("customWeight").value || 1000 : +v;
}

function validate() {
  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  if (sum < 95 || sum > 105) return toast(t("sumWarning"), "warning"), false;
  if (!qs("recipeName").value.trim()) return toast(t("errorEmptyName"), "error"), false;
  return true;
}

function updateStats() {
  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  el.recipeStats.textContent = `${currentRecipe.items.length} ${t("colors")}`;
  el.totalPercent.textContent = `${formatNumber(sum, 2)}%`;
}

/* =======================
   UI HELPERS
======================= */

function toast(msg, type = "info") {
  const d = document.createElement("div");
  d.className = `toast ${type}`;
  d.innerHTML = `<span>${msg}</span>`;
  el.toastContainer.appendChild(d);
  setTimeout(() => d.remove(), 3000);
}

function showLoading() {
  el.loadingOverlay.classList.remove("hidden");
}
function hideLoading() {
  el.loadingOverlay.classList.add("hidden");
}

function renderAll() {
  renderColors();
  renderAddColors();
  renderRecipe();
}

/* =======================
   DEBUG
======================= */

window.SICO_DEBUG = {
  state: () => ({ recipes, currentRecipe, currentSeries, mode, theme, currentLang })
};

console.log("SICO MIX ready ✔");
