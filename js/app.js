import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";

window.setLang = setLang;

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { items: [] };
let currentSeries = null;
let mode = "percent";

window.showTab = function (id) {
  qsa(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if (id === "recipes") renderRecipes();
};

function initSeriesFilter() {
  const select = qs("seriesFilter");
  select.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.id;
    select.appendChild(o);
  });
  select.onchange = () => renderColors();
}

function renderColors() {
  const series = qs("seriesFilter").value;
  const list = series === "ALL"
    ? COLORS
    : COLORS.filter(c => c.series === series);

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

window.addColor = function (code) {
  const color = getColorByCode(code);
  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesBadge").textContent = currentSeries;
    qs("seriesBadge").style.display = "inline-block";
  }
  if (color.series !== currentSeries) {
    alert(t("errorSeries"));
    return;
  }
  currentRecipe.items.push({ code, percent: 0 });
  renderCurrentRecipe();
};

window.toggleMode = checkbox => {
  mode = checkbox.checked ? "gram" : "percent";
  renderCurrentRecipe();
};

window.renderCurrentRecipe = function () {
  const total = Number(qs("totalWeight").value);
  let sum = 0;

  qs("recipeItems").innerHTML = currentRecipe.items.map((i, idx) => {
    const val = mode === "percent"
      ? i.percent.toFixed(2)
      : (i.percent * total / 100).toFixed(1);
    sum += i.percent;
    return `
      <div class="recipe-item">
        <span>${i.code}</span>
        <input type="number" value="${val}"
          onchange="updateItem(${idx}, this.value)">
        <span>${mode === "percent" ? "%" : "g"}</span>
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  }).join("") + `<div class="sum-line">${t("sum")}: ${sum.toFixed(2)}%</div>`;
};

window.updateItem = (i, val) => {
  const total = Number(qs("totalWeight").value);
  currentRecipe.items[i].percent =
    mode === "percent" ? Number(val) : (val / total) * 100;
  renderCurrentRecipe();
};

window.removeItem = i => {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
  }
  renderCurrentRecipe();
};

window.saveRecipe = function () {
  const name = qs("recipeName").value.trim();
  if (!name || !currentRecipe.items.length) return;

  recipes.push({
    name,
    note: qs("recipeNote").value,
    series: currentSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  currentRecipe = { items: [] };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  showTab("recipes");
};

function renderRecipes() {
  qs("recipeList").innerHTML = recipes.length
    ? recipes.map(r => `<div><strong>${r.name}</strong></div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  initSeriesFilter();
  renderColors();
});
