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
      <div style="flex:1">
        <strong>${c.code}</strong><br>
        <small>${c.name}</small>
      </div>
      <button onclick="addColorToRecipe('${c.code}')">+</button>
    `;
    list.appendChild(div);
  });
}

// ---- ADD COLOR ----
function addColorToRecipe(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  currentRecipe.items.push({
    code: color.code,
    name: color.name,
    percent: 0
  });

  renderCurrentRecipe();
}

// ---- CURRENT RECIPE ----
function renderCurrentRecipe() {
  let html = "";
  let total = 0;

  currentRecipe.items.forEach((item, i) => {
    total += Number(item.percent);

    html += `
      <div style="margin-bottom:8px">
        <strong>${item.code}</strong>
        <input type="number" min="0" max="100"
          value="${item.percent}"
          style="width:70px;margin-left:10px"
          onchange="updatePercent(${i}, this.value)"> %
        <button onclick="removeItem(${i})">✕</button>
      </div>
    `;
  });

  html += `<p><strong>Сума:</strong> ${total}%</p>`;

  qs("recipeItems").innerHTML = html;
}

// ---- UPDATE ----
function updatePercent(index, value) {
  currentRecipe.items[index].percent = Number(value);
  renderCurrentRecipe();
  calculateWeight();
}

function removeItem(index) {
  currentRecipe.items.splice(index, 1);
  renderCurrentRecipe();
  calculateWeight();
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

  recipes.push({ name, note, items: currentRecipe.items });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { name: "", note: "", items: [] };
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeItems").innerHTML = "";
  qs("weightResult").innerHTML = "";

  alert("Рецепт збережено");
  showTab("recipes");
}

// ---- RECIPES LIST ----
function renderRecipes() {
  const list = qs("recipeList");
  list.innerHTML = "";

  if (recipes.length === 0) {
    list.innerHTML = "<p>Немає рецептів</p>";
    return;
  }

  recipes.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${r.name}</strong><br>
      <small>${r.note || ""}</small><br>
      <button onclick="showRecipe(${i})">Відкрити</button>
    `;
    list.appendChild(div);
  });
}

// ---- VIEW ----
function showRecipe(index) {
  const r = recipes[index];
  let text = `${r.name}\n\n`;

  r.items.forEach(i => {
    text += `${i.code} – ${i.percent}%\n`;
  });

  alert(text);
}

// ---- WEIGHT ----
function calculateWeight() {
  const total = Number(qs("totalWeight").value);
  let html = "";
  let sum = 0;

  currentRecipe.items.forEach(i => sum += Number(i.percent));

  if (sum !== 100) {
    qs("weightResult").innerHTML =
      "<p style='color:red'>Сума повинна бути 100%</p>";
    return;
  }

  currentRecipe.items.forEach(i => {
    const grams = (total * i.percent / 100).toFixed(1);
    html += `<div>${i.code}: <strong>${grams}
// ---- EXPORT ----
function exportRecipes() {
  if (recipes.length === 0) {
    alert("Немає рецептів для експорту");
    return;
  }

  let text = "";

  recipes.forEach(r => {
    text += "RECIPE\n";
    text += `NAME: ${r.name}\n`;
    text += `NOTE: ${r.note || ""}\n`;
    r.items.forEach(i => {
      text += `${i.code}=${i.percent}\n`;
    });
    text += "END\n\n";
  });

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sico_recipes.txt";
  a.click();

  URL.revokeObjectURL(url);
}

// ---- IMPORT ----
function importRecipes() {
  document.getElementById("importFile").click();
}

function handleImport(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => parseImportedText(e.target.result);
  reader.readAsText(file);
}

function parseImportedText(text) {
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
  alert("Імпорт завершено");
  showTab("recipes");
}
