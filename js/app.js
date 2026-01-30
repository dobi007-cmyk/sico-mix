/* =========================
   SICO MIX – App Logic
   ========================= */

// ---- STATE ----
let currentRecipe = {
  name: "",
  note: "",
  items: [] // {code, name, percent}
};

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

// ---- UI HELPERS ----
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "recipes") renderRecipes();
}

function qs(id) {
  return document.getElementById(id);
}

// ---- COLORS LIST ----
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

// ---- ADD COLOR TO RECIPE ----
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

  html += <p><strong>Сума:</strong> ${total}%</p>;

  qs("recipeItems").innerHTML = html;
}

// ---- UPDATE / REMOVE ----
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
    alert("Сума має бути 100%");
    return;
  }

  recipes.push({
    name,
    note,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  // reset
  currentRecipe = { name: "", note: "", items: [] };
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeItems").innerHTML = "";

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

// ---- VIEW RECIPE ----
function showRecipe(index) {
  const r = recipes[index];
  let text = ${r.name}\n\n;

  r.items.forEach(i => {
    text += ${i.code} – ${i.percent}%\n;
  });

  alert(text);
}

// ---- INIT ----
renderColors();
