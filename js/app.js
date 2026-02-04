// =========================
// SICO MIX — App Logic
// =========================

const qs = id => document.getElementById(id);

/* ---------- STATE ---------- */
let currentRecipe = {
  name: "",
  note: "",
  items: [] // { code, percent }
};

let currentSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

/* ---------- TABS ---------- */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");

  if (id === "recipes") renderRecipes();
}

/* ---------- SERIES ---------- */
function initSeries() {
  const select = qs("seriesFilter");
  select.innerHTML = "";

  SERIES.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.id === "ALL" ? t("allSeries") : s.name;
    select.appendChild(opt);
  });

  select.onchange = renderColors;
}

/* ---------- COLORS ---------- */
function renderColors() {
  const filter = qs("seriesFilter").value;
  const list = filter === "ALL"
    ? COLORS
    : COLORS.filter(c => c.series === filter);

  const box = qs("colorList");
  box.innerHTML = "";

  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "color";
    div.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div style="flex:1">
        <strong>${c.code}</strong><br>
        ${c.name[currentLang]}
      </div>
      <button onclick="addColor('${c.code}')">+</button>
    `;
    box.appendChild(div);
  });
}

/* ---------- RECIPE ---------- */
function addColor(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  if (!currentSeries) {
    currentSeries = color.series;
  } else if (color.series !== currentSeries) {
    alert(`${t("errorSeries")}\n${t("currentSeries")}: ${currentSeries}`);
    return;
  }

  currentRecipe.items.push({
    code: color.code,
    percent: 0
  });

  renderRecipe();
}

function renderRecipe() {
  const box = qs("recipeItems");
  box.innerHTML = "";

  let sum = 0;

  currentRecipe.items.forEach((item, index) => {
    sum += item.percent;

    box.innerHTML += `
      <div class="recipe-item">
        <strong>${item.code}</strong>
        <input type="number" min="0" max="100"
          value="${item.percent}"
          onchange="updatePercent(${index}, this.value)"> %
        <button onclick="removeColor(${index})">✕</button>
      </div>
    `;
  });

  box.innerHTML += `
    <div style="margin-top:10px">
      <strong>${t("sum")}: ${sum}%</strong>
    </div>
  `;

  calculateWeight();
}

function updatePercent(index, value) {
  currentRecipe.items[index].percent = Number(value) || 0;
  renderRecipe();
}

function removeColor(index) {
  currentRecipe.items.splice(index, 1);
  if (currentRecipe.items.length === 0) currentSeries = null;
  renderRecipe();
}

/* ---------- WEIGHT ---------- */
function calculateWeight() {
  const total = Number(qs("totalWeight").value);
  const result = qs("weightResult");
  result.innerHTML = "";

  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  if (sum !== 100) {
    result.innerHTML = `<span style="color:red">${t("sum")} ≠ 100%</span>`;
    return;
  }

  currentRecipe.items.forEach(i => {
    const grams = (total * i.percent / 100).toFixed(1);
    result.innerHTML += `
      <div>${i.code}: <strong>${grams} ${t("grams")}</strong></div>
    `;
  });
}

/* ---------- SAVE ---------- */
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  const note = qs("recipeNote").value.trim();

  if (!name) {
    alert(t("recipeName"));
    return;
  }

  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  if (sum !== 100) {
    alert(`${t("sum")} ≠ 100%`);
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
  qs("weightResult").innerHTML = "";

  showTab("recipes");
}

/* ---------- RECIPES ---------- */
function renderRecipes() {
  const box = qs("recipeList");
  box.innerHTML = "";

  if (recipes.length === 0) {
    box.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }

  recipes.forEach(r => {
    box.innerHTML += `
      <div class="card">
        <strong>${r.name}</strong><br>
        <small>${r.series}</small>
      </div>
    `;
  });
}

/* ---------- EXPORT ---------- */
function exportTxt() {
  const text = recipes.map(r =>
    `${r.name}\n` +
    r.items.map(i => `  ${i.code}: ${i.percent}%`).join("\n")
  ).join("\n\n");

  download(text, "sico-recipes.txt", "text/plain");
}

function exportPdf() {
  alert("PDF буде додано пізніше");
}

function download(content, filename, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename;
  a.click();
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initSeries();
  renderColors();
  setLang(currentLang);
});
