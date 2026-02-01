let currentRecipe = { items: [] };
let currentRecipeSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

function qs(id) {
  return document.getElementById(id);
}

function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if (id === "recipes") renderRecipes();
}

function renderSeriesFilter() {
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="">Всі серії</option>`;
  SERIES.forEach(x => {
    s.innerHTML += `<option value="${x}">${x}</option>`;
  });
}

function renderColors() {
  const list = qs("colorList");
  list.innerHTML = "";

  const filter = qs("seriesFilter").value;

  COLORS.filter(c => !filter || c.series === filter)
    .forEach(c => {
      const div = document.createElement("div");
      div.className = "color";
      div.innerHTML = `
        <div class="swatch" style="background:${c.hex}"></div>
        <strong>${c.code}</strong>
        <button onclick="addColor('${c.code}')">+</button>
      `;
      list.appendChild(div);
    });
}

function addColor(code) {
  const c = COLORS.find(x => x.code === code);

  if (!currentRecipeSeries) {
    currentRecipeSeries = c.series;
  }

  if (c.series !== currentRecipeSeries) {
    alert("❌ Мішати можна тільки в межах однієї серії!");
    return;
  }

  currentRecipe.items.push({ code, percent: 0 });
  renderRecipe();
}

function renderRecipe() {
  let html = `<p><b>Серія:</b> ${currentRecipeSeries}</p>`;
  currentRecipe.items.forEach((i, idx) => {
    html += `
      <div>
        ${i.code}
        <input type="number" value="${i.percent}" onchange="update(${idx},this.value)"> %
        <button onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  });
  qs("recipeItems").innerHTML = html;
}

function update(i, v) {
  currentRecipe.items[i].percent = Number(v);
}

function removeItem(i) {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) currentRecipeSeries = null;
  renderRecipe();
}

function saveRecipe() {
  recipes.push({
    series: currentRecipeSeries,
    items: currentRecipe.items
  });
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  currentRecipe = { items: [] };
  currentRecipeSeries = null;
  renderRecipe();
}

function renderRecipes() {
  qs("recipeList").innerHTML = recipes.map(r =>
    `<div><b>${r.series}</b><br>${r.items.map(i => i.code).join(", ")}</div>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSeriesFilter();
  renderColors();
});document.addEventListener("DOMContentLoaded",renderColors);