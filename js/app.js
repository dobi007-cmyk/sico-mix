const qs = id => document.getElementById(id);

/* ---------- STATE ---------- */
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let draft = JSON.parse(localStorage.getItem("sico_draft") || "null");

let currentRecipe = draft || {
  name: "",
  items: [],
  status: "draft",
  version: 1,
  series: null
};

/* ---------- TABS ---------- */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
}

/* ---------- SERIES ---------- */
function initSeries() {
  const s = qs("seriesFilter");
  if (!s) return;

  s.innerHTML = "";
  SERIES.forEach(x => {
    const o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.id === "ALL" ? t("allSeries") : x.name;
    s.appendChild(o);
  });
}

/* ---------- COLORS ---------- */
function renderColors() {
  const filter = qs("seriesFilter");
  if (!filter) return;

  const v = filter.value;
  const list = v === "ALL" ? COLORS : COLORS.filter(c => c.series === v);

  qs("colorList").innerHTML = list.map(c => `
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

/* ---------- RECIPE ---------- */
function addColor(code) {
  const c = COLORS.find(x => x.code === code);
  if (!c) return;

  if (!currentRecipe.series) currentRecipe.series = c.series;
  if (c.series !== currentRecipe.series) {
    alert(t("errorSeries"));
    return;
  }

  currentRecipe.items.push({ code: c.code, percent: 0 });
  autosave();
  renderRecipe();
}

function renderRecipe() {
  const box = qs("recipeItems");
  if (!box) return;

  if (!currentRecipe.items.length) {
    box.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }

  let sum = 0;
  box.innerHTML = currentRecipe.items.map((i, idx) => {
    sum += i.percent;
    return `
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}"
          onchange="updatePercent(${idx}, this.value)"> %
        <button onclick="removeColor(${idx})">✕</button>
      </div>
    `;
  }).join("");

  box.innerHTML += `<strong>${t("sum")}: ${sum}%</strong>`;
  calculateWeight();
}

function updatePercent(i, v) {
  currentRecipe.items[i].percent = Number(v);
  autosave();
  renderRecipe();
}

function removeColor(i) {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) currentRecipe.series = null;
  autosave();
  renderRecipe();
}

/* ---------- WEIGHT ---------- */
function setWeight(v) {
  qs("totalWeight").value = v;
  calculateWeight();
}

function calculateWeight() {
  const w = Number(qs("totalWeight")?.value || 0);
  const out = qs("weightResult");
  if (!out) return;

  out.innerHTML = currentRecipe.items.map(i =>
    `${i.code}: ${(w * i.percent / 100).toFixed(1)} ${t("grams")}`
  ).join("<br>");
}

/* ---------- SAVE ---------- */
function saveRecipe() {
  currentRecipe.name = qs("recipeName").value.trim();
  if (!currentRecipe.name) return;

  recipes.push({ ...currentRecipe });
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  localStorage.removeItem("sico_draft");

  currentRecipe = { name: "", items: [], status: "draft", version: 1, series: null };
  qs("recipeName").value = "";

  renderRecipe();
  renderRecipes();
  showTab("recipes");
}

/* ---------- CLONE ---------- */
function cloneRecipe(index) {
  const r = recipes[index];
  currentRecipe = {
    ...r,
    version: r.version + 1,
    status: "draft"
  };
  qs("recipeName").value = `${r.name} v${currentRecipe.version}`;
  autosave();
  showTab("new");
  renderRecipe();
}

/* ---------- AUTOSAVE ---------- */
function autosave() {
  localStorage.setItem("sico_draft", JSON.stringify(currentRecipe));
}

/* ---------- LIST ---------- */
function renderRecipes() {
  const box = qs("recipeList");
  if (!box) return;

  if (!recipes.length) {
    box.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }

  box.innerHTML = recipes.map((r, i) => `
    <div class="color">
      <strong>${r.name} v${r.version}</strong><br>
      ${t(r.status)}
      <button onclick="cloneRecipe(${i})">📋</button>
    </div>
  `).join("");
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initSeries();
  renderColors();
  renderRecipe();
  renderRecipes();

  if (draft) qs("recipeName").value = draft.name || "";
});
