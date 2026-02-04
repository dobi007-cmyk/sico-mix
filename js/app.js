/* =========================
   SICO MIX – App Logic
   ========================= */

const qs = id => document.getElementById(id);

/* ---------- STATE ---------- */
let currentRecipe = {
  name: "",
  items: [] // { code, percent }
};

let currentSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let mode = "percent"; // percent | grams

/* ---------- UI ---------- */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
}

/* ---------- SERIES ---------- */
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

/* ---------- COLORS ---------- */
function renderColors() {
  const v = qs("seriesFilter").value;
  const list = v === "ALL" ? COLORS : COLORS.filter(c => c.series === v);
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

/* ---------- RECIPE ---------- */
function addColor(code) {
  const c = COLORS.find(x => x.code === code);
  if (!c) return;

  if (!currentSeries) currentSeries = c.series;
  if (c.series !== currentSeries) {
    alert(`${t("errorSeries")}\n${t("currentSeries")}: ${currentSeries}`);
    return;
  }

  currentRecipe.items.push({ code: c.code, percent: 0 });
  renderRecipe();
}

function renderRecipe() {
  const box = qs("recipeItems");
  box.innerHTML = "";

  if (!currentRecipe.items.length) {
    box.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }

  let sum = 0;
  currentRecipe.items.forEach((i, idx) => {
    sum += i.percent;

    const value =
      mode === "percent"
        ? i.percent
        : ((i.percent / 100) * Number(qs("totalWeight").value)).toFixed(1);

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

  calculateWeight();
}

function updateValue(index, value) {
  value = Number(value);
  if (mode === "percent") {
    currentRecipe.items[index].percent = value;
  } else {
    const total = Number(qs("totalWeight").value);
    currentRecipe.items[index].percent = (value / total) * 100;
  }
  renderRecipe();
}

function removeColor(index) {
  currentRecipe.items.splice(index, 1);
  if (!currentRecipe.items.length) currentSeries = null;
  renderRecipe();
}

/* ---------- MODE ---------- */
function toggleMode() {
  mode = mode === "percent" ? "grams" : "percent";
  renderRecipe();
}

/* ---------- WEIGHT ---------- */
function renderWeightOptions() {
  qs("totalWeight").innerHTML = `
    <option value="100">100 ${t("grams")}</option>
    <option value="500">500 ${t("grams")}</option>
    <option value="1000">1 ${t("kilograms")}</option>
    <option value="5000">5 ${t("kilograms")}</option>
  `;
}

function calculateWeight() {
  const w = Number(qs("totalWeight").value);
  const out = qs("weightResult");

  if (!currentRecipe.items.length) {
    out.innerHTML = "";
    return;
  }

  out.innerHTML = currentRecipe.items
    .map(i => {
      const g = ((w * i.percent) / 100).toFixed(1);
      return `${i.code}: <strong>${g} ${t("grams")}</strong>`;
    })
    .join("<br>");
}

/* ---------- SAVE ---------- */
function saveRecipe() {
  const name = qs("recipeName").value.trim();
  if (!name) return alert(t("recipeName"));

  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  if (Math.round(sum) !== 100) return alert(`${t("sum")} ≠ 100%`);

  recipes.push({
    name,
    series: currentSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { name: "", items: [] };
  currentSeries = null;
  qs("recipeName").value = "";

  renderRecipe();
  renderRecipes();
  showTab("recipes");
}

/* ---------- RECIPES ---------- */
function renderRecipes() {
  const box = qs("recipeList");
  box.innerHTML = "";

  if (!recipes.length) {
    box.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }

  recipes.forEach(r => {
    box.innerHTML += `
      <div class="color">
        <strong>${r.name}</strong><br>
        <small>${r.series}</small>
      </div>
    `;
  });
}

/* ---------- EXPORT / IMPORT ---------- */
function exportTXT() {
  let txt = recipes
    .map(
      r =>
        `# ${r.name}
Series: ${r.series}
${r.items.map(i => `${i.code} ${i.percent}%`).join("\n")}`
    )
    .join("\n----------------\n");

  download(txt, "sico-recipes.txt", "text/plain");
}

function importTXT(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const blocks = e.target.result.split("----------------");
    blocks.forEach(b => {
      const lines = b.trim().split("\n");
      if (!lines.length) return;

      const name = lines[0].replace("#", "").trim();
      const seriesLine = lines.find(l => l.startsWith("Series"));
      const series = seriesLine?.split(":")[1].trim();

      const items = lines
        .filter(l => l.includes("%"))
        .map(l => {
          const [code, p] = l.split(" ");
          return { code, percent: Number(p.replace("%", "")) };
        });

      recipes.push({ name, series, items });
    });

    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    renderRecipes();
    alert("Imported");
  };
  reader.readAsText(file);
}

function download(content, name, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initSeries();
  renderColors();
  renderWeightOptions();
  renderRecipe();
  renderRecipes();
});
