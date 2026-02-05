const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { items: [] };
let currentSeries = null;
let mode = "percent";

function showTab(id) {
  qsa(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
}

function initSeriesFilter() {
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(x => {
    const o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.id;
    s.appendChild(o);
  });
  s.onchange = renderColors;
}

function renderColors() {
  const v = qs("seriesFilter").value;
  const list = v === "ALL" ? COLORS : COLORS.filter(c => c.series === v);
  const box = qs("colorList");
  box.innerHTML = list.map(c => `
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        ${c.name[currentLang]}
      </div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>
  `).join("");
}

function addColor(code) {
  const c = COLORS.find(x => x.code === code);
  if (!currentSeries) {
    currentSeries = c.series;
    qs("seriesBadge").textContent = c.series;
    qs("seriesBadge").style.display = "inline-block";
  }
  if (c.series !== currentSeries) {
    alert(t("errorSeries"));
    return;
  }
  currentRecipe.items.push({ code, percent: 0 });
  renderCurrentRecipe();
}

function renderCurrentRecipe() {
  const box = qs("recipeItems");
  const total = Number(qs("totalWeight").value);
  let sum = 0;

  box.innerHTML = currentRecipe.items.map((i, idx) => {
    const val = mode === "percent"
      ? i.percent
      : (i.percent * total / 100).toFixed(1);
    sum += i.percent;
    return `
      <div class="recipe-item">
        <span class="code">${i.code}</span>
        <input type="number" value="${val}" onchange="updateItem(${idx},this.value)">
        <span class="unit">${mode === "percent" ? "%" : "g"}</span>
        <button onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  }).join("");

  box.innerHTML += `<div class="sum-line"><strong>${t("sum")}: ${sum.toFixed(2)}%</strong></div>`;
}

function updateItem(i, v) {
  const total = Number(qs("totalWeight").value);
  currentRecipe.items[i].percent =
    mode === "percent" ? Number(v) : (Number(v) / total) * 100;
  renderCurrentRecipe();
}

function removeItem(i) {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
  }
  renderCurrentRecipe();
}

function toggleMode(cb) {
  mode = cb.checked ? "gram" : "percent";
  renderCurrentRecipe();
}

function saveRecipe() {
  if (!qs("recipeName").value || !currentRecipe.items.length) {
    alert(t("errorEmptyRecipe"));
    return;
  }
  recipes.push({
    name: qs("recipeName").value,
    note: qs("recipeNote").value,
    items: currentRecipe.items,
    series: currentSeries
  });
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  currentRecipe = { items: [] };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  showTab("recipes");
  renderRecipes();
}

function renderRecipes() {
  const box = qs("recipeList");
  box.innerHTML = recipes.length
    ? recipes.map(r => `<div class="color"><strong>${r.name}</strong></div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  initSeriesFilter();
  renderColors();
});
