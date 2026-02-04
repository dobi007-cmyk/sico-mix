const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { items: [] };
let currentSeries = null;
let mode = "percent";
let filteredColors = COLORS;

/* ================= TAB ================= */

function showTab(id) {
  qsa(".tab").forEach(t => t.classList.remove("active"));
  qsa("nav button").forEach(b => b.classList.remove("active"));

  qs(id).classList.add("active");
  document.querySelector(`nav button[data-tab="${id}"]`)?.classList.add("active");

  if (id === "recipes") renderRecipes();
}

/* ================= SERIES ================= */

function initSeriesFilter() {
  const select = qs("seriesFilter");
  select.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;

  const seriesSet = [...new Set(COLORS.map(c => c.series))];
  seriesSet.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });

  select.onchange = applySeriesFilter;
}

function applySeriesFilter() {
  const v = qs("seriesFilter").value;
  filteredColors = v === "ALL" ? COLORS : COLORS.filter(c => c.series === v);
  renderColors();
}

/* ================= COLORS ================= */

function renderColors() {
  const box = qs("colorList");
  box.innerHTML = filteredColors.map(c => `
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        ${c.name[currentLang] || c.code}
      </div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>
  `).join("");
}

/* ================= RECIPE ================= */

function addColor(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesBadge").textContent = color.series;
    qs("seriesBadge").style.display = "inline-block";
    qs("seriesFilter").value = color.series;
    applySeriesFilter();
  }

  if (color.series !== currentSeries) {
    alert(t("errorSeries"));
    return;
  }

  currentRecipe.items.push({ code, percent: 0 });
  renderCurrentRecipe();
}

function renderCurrentRecipe() {
  const box = qs("recipeItems");
  const totalWeight = Number(qs("totalWeight").value);
  let sum = 0;

  box.innerHTML = currentRecipe.items.map((i, idx) => {
    sum += i.percent;
    const val = mode === "percent"
      ? i.percent.toFixed(2)
      : (i.percent * totalWeight / 100).toFixed(1);

    return `
      <div class="recipe-item">
        <span class="code">${i.code}</span>
        <input type="number" value="${val}"
          onchange="updateItem(${idx}, this.value)">
        <span>${mode === "percent" ? "%" : "g"}</span>
        <button onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  }).join("") + `
    <div class="sum-line">${t("sum")}: ${sum.toFixed(2)}%</div>
  `;
}

function updateItem(i, val) {
  const totalWeight = Number(qs("totalWeight").value);
  const num = Number(val) || 0;

  currentRecipe.items[i].percent =
    mode === "percent" ? num : (num / totalWeight * 100);

  renderCurrentRecipe();
}

function removeItem(i) {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
    qs("seriesFilter").value = "ALL";
    applySeriesFilter();
  }
  renderCurrentRecipe();
}

function toggleMode(cb) {
  mode = cb.checked ? "gram" : "percent";
  renderCurrentRecipe();
}

/* ================= SAVE ================= */

function saveRecipe() {
  const name = qs("recipeName").value.trim();
  const sum = currentRecipe.items.reduce((s,i)=>s+i.percent,0);

  if (!name || !currentRecipe.items.length) {
    alert(t("errorEmptyRecipe"));
    return;
  }

  if (Math.round(sum) !== 100) {
    alert(t("sum") + " ≠ 100%");
    return;
  }

  recipes.push({
    name,
    note: qs("recipeNote").value,
    series: currentSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { items: [] };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";

  renderCurrentRecipe();
  showTab("recipes");
}

/* ================= RECIPES ================= */

function renderRecipes() {
  const box = qs("recipeList");
  box.innerHTML = recipes.length
    ? recipes.map(r => `
      <div class="color">
        <strong>${r.name}</strong><br>
        ${r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")}
      </div>
    `).join("")
    : `<p>${t("noRecipes")}</p>`;
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  initSeriesFilter();
  applySeriesFilter();
});