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

// ---- COLORS CATALOG ----
function renderColors() {
  const list = qs("colorList");
  list.innerHTML = "";

  COLORS.forEach(c => {
    const div = document.createElement("div");
    div.className = "color";
    div.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div style="flex:1">
        <strong>${c.code}</strong><br>
        <small>${c.name}</small>
      </div>
      <button onclick="addColorToRecipe('${c.code}')">➕</button>
    `;
    list.appendChild(div);
  });
}

function addColorToRecipe(code) {
  if (currentRecipe.items.find(i => i.code === code)) return;

  currentRecipe.items.push({
    code,
    percent: 0
  });
  renderCurrentRecipe();
}

// ---- CURRENT RECIPE ----
function renderCurrentRecipe() {
  const box = qs("recipeItems");
  box.innerHTML = "";

  let total = 0;

  currentRecipe.items.forEach((item, index) => {
    total += Number(item.percent);

    box.innerHTML += `
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <strong style="width:60px">${item.code}</strong>
        <input
          type="number"
          min="0"
          max="100"
          value="${item.percent}"
          style="flex:1"
          oninput="updatePercent(${index}, this.value)"
        >
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  box.innerHTML += `<p><strong>Сума:</strong> ${total}%</p>`;
}

function updatePercent(index, value) {
  currentRecipe.items[index].percent = Number(value);
  renderCurrentRecipe();
}

function removeItem(index) {
  currentRecipe.items.splice(index, 1);
  renderCurrentRecipe();
}

// ---- SAVE RECIPE ----
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  const note = qs("recipeNote").value.trim();

  if (!name) {
    alert("Введи назву рецепта");
    return;
  }

  const total = currentRecipe.items.reduce((s, i) => s + Number(i.percent), 0);
  if (total !== 100) {
    alert("Сума компонентів має бути 100%");
    return;
  }

  recipes.push({
    name,
    note,
    items: JSON.parse(JSON.stringify(currentRecipe.items))
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  // reset
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
    list.innerHTML = "<p data-i18n='noRecipes'></p>";
    if (typeof setLang === "function") setLang(currentLang);
    return;
  }

  recipes.forEach(r => {
    let html = `<div class="card"><strong>${r.name}</strong><br>`;
    if (r.note) html += `<em>${r.note}</em><br>`;
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
    const grams = (total * i.percent / 100).toFixed(1);
    html += `<div>${i.code}: <strong>${grams} г</strong></div>`;
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
    text += `RECIPE\nNAME:${r.name}\nNOTE:${r.note || ""}\n`;
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

// ---- IMPORT (заглушка) ----
function importFromText() {
  alert("Імпорт буде додано далі");
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  renderColors();
});});});
