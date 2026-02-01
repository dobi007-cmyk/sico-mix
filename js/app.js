/* =========================
   SICO MIX – App Logic
   ========================= */

// ---- STATE ----
let currentRecipe = {
  name: "",
  note: "",
  items: []
};

let currentSeries = null; // ⬅️ ДОДАНО
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

// ---- HELPERS ----
function qs(id) {
  return document.getElementById(id);
}

function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if (id === "recipes") renderRecipes();
}

// ---- SERIES FILTER ----
function applySeriesFilter() {
  renderColors();
}

// ---- COLORS ----
function renderColors() {
  const list = qs("colorList");
  list.innerHTML = "";

  const selected = qs("seriesFilter")?.value || "ALL";

  COLORS
    .filter(c => selected === "ALL" || c.series === selected)
    .forEach(c => {
      const div = document.createElement("div");
      div.className = "color";
      div.innerHTML = `
        <div class="swatch" style="background:${c.hex}"></div>
        <div>
          <strong>${c.code}</strong><br>
          <small>${c.name[currentLang]}</small>
        </div>
        <button type="button" onclick="addColorToRecipe('${c.code}')">+</button>
      `;
      list.appendChild(div);
    });
}

function addColorToRecipe(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  // ❗ ПЕРЕВІРКА СЕРІЇ
  if (!currentSeries) {
    currentSeries = color.series;
  } else if (currentSeries !== color.series) {
    alert("❌ Можна змішувати лише фарби однієї серії");
    return;
  }

  currentRecipe.items.push({
    code: color.code,
    percent: 0
  });

  renderCurrentRecipe();
}

// ---- CURRENT RECIPE ----
function renderCurrentRecipe() {
  let html = "";
  let total = 0;

  currentRecipe.items.forEach((i, idx) => {
    total += Number(i.percent);
    html += `
      <div class="recipe-item">
        <strong>${i.code}</strong>
        <input type="number"
               min="0"
               max="100"
               value="${i.percent}"
               onchange="updatePercent(${idx}, this.value)"> %
        <button type="button" onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  });

  html += `<p><strong>${t("sum")}:</strong> ${total}%</p>`;
  qs("recipeItems").innerHTML = html;
}

function updatePercent(i, val) {
  currentRecipe.items[i].percent = Number(val);
  renderCurrentRecipe();
}

function removeItem(i) {
  currentRecipe.items.splice(i, 1);
  if (currentRecipe.items.length === 0) {
    currentSeries = null; // ⬅️ СКИДАЄМО СЕРІЮ
  }
  renderCurrentRecipe();
}

// ---- SAVE ----
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  const note = qs("recipeNote").value.trim();

  if (!name) {
    alert(t("errorName"));
    return;
  }

  const total = currentRecipe.items.reduce((s, i) => s + Number(i.percent), 0);
  if (total !== 100) {
    alert(t("errorPercent"));
    return;
  }

  recipes.push({
    name,
    note,
    series: currentSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { name: "", note: "", items: [] };
  currentSeries = null;

  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeItems").innerHTML = "";

  showTab("recipes");
}

// ---- RECIPES LIST ----
function renderRecipes() {
  const list = qs("recipeList");
  list.innerHTML = "";

  if (!recipes.length) {
    list.innerHTML = `<p data-i18n="noRecipes"></p>`;
    setLang(currentLang);
    return;
  }

  recipes.forEach(r => {
    let html = `<div class="card">
      <strong>${r.name}</strong><br>
      <small>Серія: ${r.series}</small><br>`;
    r.items.forEach(i => {
      html += `${i.code}: ${i.percent}%<br>`;
    });
    html += "</div>";
    list.innerHTML += html;
  });
}

// ---- WEIGHT CALCULATOR ----
function calculateWeight() {
  const total = Number(qs("totalWeight").value);
  const out = qs("weightResult");

  if (!currentRecipe.items.length) {
    out.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }

  let html = `<h4>${total} ${t("grams")}</h4>`;
  currentRecipe.items.forEach(i => {
    const g = (total * i.percent / 100).toFixed(1);
    html += `<div>${i.code}: <strong>${g} ${t("grams")}</strong></div>`;
  });

  out.innerHTML = html;
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  // заповнити фільтр серій
  const select = qs("seriesFilter");
  SERIES.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });

  renderColors();
});});});});document.addEventListener("DOMContentLoaded",renderColors);