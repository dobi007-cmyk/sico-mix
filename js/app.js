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

// ---- TABS ----
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
      <div>
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
  let total = 0;

  if (!currentRecipe.items.length) {
    box.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }

  box.innerHTML = "";

  currentRecipe.items.forEach((item, idx) => {
    total += Number(item.percent);

    const row = document.createElement("div");
    row.innerHTML = `
      <strong>${item.code}</strong>
      <input type="number" min="0" max="100" value="${item.percent}"
        onchange="updatePercent(${idx}, this.value)"> %
      <button onclick="removeItem(${idx})">❌</button>
    `;
    box.appendChild(row);
  });

  const sum = document.createElement("p");
  sum.innerHTML = `<strong>${t("sum")}:</strong> ${total}%`;
  box.appendChild(sum);
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
    list.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }

  recipes.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `<strong>${r.name}</strong><br>`;
    if (r.note) html += `<em>${r.note}</em><br><br>`;

    r.items.forEach(i => {
      html += `${i.code}: ${i.percent}%<br>`;
    });

    card.innerHTML = html;
    list.appendChild(card);
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

// ---- EXPORT ----
function exportRecipes() {
  if (!recipes.length) {
    alert(t("noData"));
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

// ---- IMPORT (TEXTAREA) ----
function importFromText() {
  const text = qs("importText").value.trim();
  if (!text) return;

  const blocks = text.split("RECIPE").map(b => b.trim()).filter(Boolean);

  blocks.forEach(block => {
    const lines = block.split("\n");
    let name = "";
    let note = "";
    let items = [];

    lines.forEach(l => {
      if (l.startsWith("NAME:")) name = l.replace("NAME:", "").trim();
      else if (l.startsWith("NOTE:")) note = l.replace("NOTE:", "").trim();
      else if (l.includes("=")) {
        const [code, percent] = l.split("=");
        items.push({ code: code.trim(), percent: Number(percent) });
      }
    });

    if (name && items.length) {
      recipes.push({ name, note, items });
    }
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  qs("importText").value = "";
  showTab("recipes");
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  renderColors();
});});
