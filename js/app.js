app.js

/* =========================
   SICO MIX – App Logic
   ========================= */

// ---- STATE ----
let currentRecipe = {
  name: "",
  note: "",
  items: []
};

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

// ---- COLORS ----
function renderColors() {
  const list = qs("colorList");
  list.innerHTML = "";

  COLORS.forEach(c => {
    const div = document.createElement("div");
    div.className = "color";
    div.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        <small>${c.name}</small>
      </div>
      <button type="button" onclick="addColorToRecipe('${c.code}')">+</button>
    `;
    list.appendChild(div);
  });
}

function addColorToRecipe(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

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

  html += `<p><strong>Сума:</strong> ${total}%</p>`;
  qs("recipeItems").innerHTML = html;
}

function updatePercent(i, val) {
  currentRecipe.items[i].percent = Number(val);
  renderCurrentRecipe();
}

function removeItem(i) {
  currentRecipe.items.splice(i, 1);
  renderCurrentRecipe();
}

// ---- SAVE ----
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  const note = qs("recipeNote").value.trim();

  if (!name) {
    alert("Введи назву рецепта");
    return;
  }

  const total = currentRecipe.items.reduce((s, i) => s + Number(i.percent), 0);
  if (total !== 100) {
    alert("Сума має бути 100%");
    return;
  }

  recipes.push({
    name,
    note,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { name: "", note: "", items: [] };
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
    if (typeof setLang === "function") {
      setLang(currentLang);
    }
    return;
  }

  recipes.forEach(r => {
    let html = `<div class="card"><strong>${r.name}</strong><br>`;
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
    out.innerHTML = "<p>Немає фарб у рецепті</p>";
    return;
  }

  let html = `<h4>${total} г</h4>`;
  currentRecipe.items.forEach(i => {
    const g = (total * i.percent / 100).toFixed(1);
    html += `<div>${i.code}: <strong>${g} г</strong></div>`;
  });

  out.innerHTML = html;
}

// ---- EXPORT ----
function exportRecipes() {
  if (!recipes.length) {
    alert("Немає рецептів");
    return;
  }

  let text = "";
  recipes.forEach(r => {
    text += `RECIPE
NAME:${r.name}
NOTE:${r.note}
`;
    r.items.forEach(i => {
      text += `${i.code}=${i.percent}\n`;
    });
    text += "END\n\n";
  });

  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sico_recipes.txt";
  a.click();
}

// ---- IMPORT (поки без парсингу) ----
function importFromText() {
  alert("Імпорт буде доданий на наступному кроці");
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  renderColors();
});
