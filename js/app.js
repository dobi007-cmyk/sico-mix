// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

const getNumber = val => Number(val) || 0;

// ────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { items: [] };
let currentSeries = null;
let mode = "percent";           // "percent" | "gram"

// ────────────────────────────────────────────────
// Tab switching
// ────────────────────────────────────────────────
function showTab(tabId) {
  qsa(".tab").forEach(tab => tab.classList.remove("active"));
  qs(tabId)?.classList.add("active");

  if (tabId === "recipes") {
    renderRecipes();
  }
}

// ────────────────────────────────────────────────
// Series filter
// ────────────────────────────────────────────────
function initSeriesFilter() {
  const select = qs("seriesFilter");
  if (!select) return;

  select.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;

  SERIES.forEach(series => {
    if (series.id === "ALL") return;
    const option = document.createElement("option");
    option.value = series.id;
    option.textContent = series.id;
    select.appendChild(option);
  });

  select.addEventListener("change", applySeriesFilter);
}

function applySeriesFilter() {
  const value = qs("seriesFilter").value;
  const filtered = value === "ALL" ? COLORS : COLORS.filter(c => c.series === value);
  renderColors(filtered);
}

// ────────────────────────────────────────────────
// Color catalog
// ────────────────────────────────────────────────
function renderColors(colors = COLORS) {
  const container = qs("colorList");
  if (!container) return;

  container.innerHTML = colors.map(color => `
    <div class="color">
      <div class="swatch" style="background:${color.hex}"></div>
      <div>
        <strong>${color.code}</strong><br>
        ${color.name[currentLang] || color.name.uk || color.code}
      </div>
      <button type="button" onclick="addColor('${color.code}')">+</button>
    </div>
  `).join("");
}

// ────────────────────────────────────────────────
// Recipe management
// ────────────────────────────────────────────────
function addColor(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesFilter").value = color.series;
    qs("seriesBadge").textContent = color.series;
    qs("seriesBadge").style.display = "inline-block";
  }

  if (color.series !== currentSeries) {
    alert(t("errorSeries"));
    return;
  }

  currentRecipe.items.push({ code: color.code, percent: 0 });
  renderCurrentRecipe();
}

function updateItem(index, rawValue) {
  const totalWeight = getNumber(qs("totalWeight")?.value) || 1000;
  const value = getNumber(rawValue);

  if (mode === "percent") {
    currentRecipe.items[index].percent = value;
  } else {
    currentRecipe.items[index].percent = (value / totalWeight) * 100;
  }

  renderCurrentRecipe();
}

function removeItem(index) {
  currentRecipe.items.splice(index, 1);

  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
  }

  renderCurrentRecipe();
}

function renderCurrentRecipe() {
  const container = qs("recipeItems");
  const totalWeight = getNumber(qs("totalWeight")?.value) || 1000;
  let sumPercent = 0;

  if (!container) return;

  container.innerHTML = currentRecipe.items.map((item, idx) => {
    const displayValue = mode === "percent"
      ? item.percent.toFixed(2)
      : (item.percent * totalWeight / 100).toFixed(1);

    sumPercent += item.percent;

    return `
      <div class="recipe-item">
        <span class="code">${item.code}</span>
        <input type="number" 
               step="${mode === 'percent' ? '0.1' : '1'}" 
               min="0" 
               value="${displayValue}" 
               onchange="updateItem(${idx}, this.value)">
        <span class="unit">${mode === "percent" ? "%" : "g"}</span>
        <button type="button" onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  }).join("");

  container.innerHTML += `
    <div class="sum-line">
      <strong>${t("sum")}: ${sumPercent.toFixed(2)}%</strong>
    </div>
  `;
}

function toggleMode(checkbox) {
  mode = checkbox.checked ? "gram" : "percent";
  renderCurrentRecipe();
}

function saveRecipe() {
  const name = qs("recipeName")?.value.trim();
  if (!name || currentRecipe.items.length === 0) {
    alert(t("errorEmptyRecipe") || "Вкажіть назву та додайте хоча б один колір");
    return;
  }

  const recipeToSave = {
    name,
    note: qs("recipeNote")?.value.trim() || "",
    items: currentRecipe.items.map(i => ({ ...i })), // deep copy
    series: currentSeries,
    created: new Date().toISOString()
  };

  recipes.push(recipeToSave);
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  // Reset
  currentRecipe = { items: [] };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";

  renderCurrentRecipe();
  showTab("recipes");
}

// ────────────────────────────────────────────────
// Saved recipes list
// ────────────────────────────────────────────────
function renderRecipes() {
  const container = qs("recipeList");
  if (!container) return;

  if (recipes.length === 0) {
    container.innerHTML = `<p data-i18n="noRecipes">—</p>`;
    return;
  }

  container.innerHTML = recipes.map(recipe => `
    <div class="recipe-preview">
      <strong>${recipe.name}</strong>
      <div class="meta">${recipe.series || "?"} • ${recipe.items.length} кол.</div>
      ${recipe.note ? `<small>${recipe.note}</small>` : ""}
    </div>
  `).join("");
}

// ────────────────────────────────────────────────
// Init
// ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initSeriesFilter();
  renderColors();
  // Можна додати qs("seriesBadge").style.display = "none"; якщо потрібно
});