const qs = id => document.getElementById(id);

/* =========================
   STATE
========================= */
let currentLang = localStorage.getItem("sico_lang") || "ua";
let mode = "percent"; // percent | gram

let currentRecipe = {
  items: [],
  series: null
};

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

/* =========================
   TABS
========================= */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
}

/* =========================
   SERIES
========================= */
function initSeries() {
  const s = qs("seriesFilter");
  s.innerHTML = "";

  SERIES.forEach(x => {
    const o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.id === "ALL" ? t("allSeries") : x.name;
    s.appendChild(o);
  });
}

/* =========================
   COLORS
========================= */
function renderColors() {
  const filter = qs("seriesFilter").value;
  const list = filter === "ALL"
    ? COLORS
    : COLORS.filter(c => c.series === filter);

  const box = qs("colorList");
  box.innerHTML = "";

  list.forEach(c => {
    box.innerHTML += `
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div>
          <strong>${c.code}</strong><br>
          ${c.name[currentLang]}
        </div>
        <button onclick="addColor('${c.code}')">+</button>
      </div>
    `;
  });
}

/* =========================
   RECIPE
========================= */
function addColor(code) {
  const c = COLORS.find(x => x.code === code);
  if (!c) return;

  if (!currentRecipe.series) {
    currentRecipe.series = c.series;
  }

  if (c.series !== currentRecipe.series) {
    alert(t("errorSeries") + ": " + currentRecipe.series);
    return;
  }

  currentRecipe.items.push({
    code: c.code,
    percent: 0
  });

  renderRecipe();
}

function renderRecipe() {
  const box = qs("recipeItems");
  box.innerHTML = "";

  let sum = 0;
  const totalWeight = Number(qs("totalWeight").value || 1000);

  currentRecipe.items.forEach((i, idx) => {
    sum += i.percent;

    const value = mode === "percent"
      ? i.percent
      : ((totalWeight * i.percent) / 100).toFixed(1);

    const unit = mode === "percent" ? "%" : t("grams");

    box.innerHTML += `
      <div class="recipe-item">
        ${i.code}
        <input type="number"
               value="${value}"
               onchange="updateValue(${idx}, this.value)">
        ${unit}
        <button onclick="removeColor(${idx})">✕</button>
      </div>
    `;
  });

  box.innerHTML += `<strong>${t("sum")}: ${sum}%</strong>`;

  renderWeightResult();
}

function updateValue(index, value) {
  const totalWeight = Number(qs("totalWeight").value || 1000);

  if (mode === "percent") {
    currentRecipe.items[index].percent = Number(value);
  } else {
    currentRecipe.items[index].percent =
      (Number(value) / totalWeight) * 100;
  }

  renderRecipe();
}

function removeColor(i) {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) currentRecipe.series = null;
  renderRecipe();
}

/* =========================
   MODE
========================= */
function toggleMode() {
  mode = mode === "percent" ? "gram" : "percent";
  renderRecipe();
}

/* =========================
   WEIGHT
========================= */
function renderWeightOptions() {
  qs("totalWeight").innerHTML = `
    <option value="100">100 ${t("grams")}</option>
    <option value="500">500 ${t("grams")}</option>
    <option value="1000">1 ${t("kilograms")}</option>
    <option value="5000">5 ${t("kilograms")}</option>
  `;
}

function renderWeightResult() {
  const total = Number(qs("totalWeight").value || 1000);
  const box = qs("weightResult");

  box.innerHTML = currentRecipe.items.map(i => {
    const g = ((total * i.percent) / 100).toFixed(1);
    return `${i.code}: <strong>${g} ${t("grams")}</strong>`;
  }).join("<br>");
}

/* =========================
   SAVE / LIST
========================= */
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  if (!name) return;

  recipes.push({
    name,
    series: currentRecipe.series,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { items: [], series: null };
  qs("recipeName").value = "";

  renderRecipe();
  renderRecipes();
  showTab("recipes");
}

function renderRecipes() {
  const box = qs("recipeList");
  box.innerHTML = recipes.length
    ? recipes.map(r => `<div class="color"><strong>${r.name}</strong></div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initSeries();
  renderWeightOptions();
  renderColors();
  renderRecipe();
  renderRecipes();
});
