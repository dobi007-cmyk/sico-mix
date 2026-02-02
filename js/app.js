let currentRecipeSeries = null;
let currentRecipe = { items: [] };
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

const qs = id => document.getElementById(id);

function showTab(id){
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id === "recipes") renderRecipes();
}

/* =========================
   SERIES FILTER
   ========================= */

function initSeriesFilter(){
  const select = qs("seriesFilter");
  if(!select) return;

  SERIES.forEach(s=>{
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.id;
    select.appendChild(opt);
  });
}

function applySeriesFilter(){
  const value = qs("seriesFilter").value;
  const list =
    value === "ALL"
      ? COLORS
      : COLORS.filter(c => c.series === value);

  renderColors(list);
}

/* =========================
   COLORS
   ========================= */

function renderColors(list = COLORS){
  const box = qs("colorList");
  box.innerHTML = "";

  list.forEach(c=>{
    box.innerHTML += `
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div>
          <strong>${c.code}</strong><br>
          <small>${c.name[currentLang]}</small>
        </div>
        <button onclick="addColorToRecipe('${c.code}')">+</button>
      </div>
    `;
  });
}

function addColorToRecipe(code){
  const color = COLORS.find(c => c.code === code);
  if(!color) return;

  if(!currentRecipeSeries){
    currentRecipeSeries = color.series;

    const select = qs("seriesFilter");
    if(select){
      select.value = color.series;
      applySeriesFilter();
    }
  }

  if(color.series !== currentRecipeSeries){
    alert(
      `❌ ${t("errorSeries")}\n` +
      `${t("currentSeries")}: ${currentRecipeSeries}`
    );
    return;
  }

  currentRecipe.items.push({
    code: color.code,
    percent: 0
  });

  renderCurrentRecipe();
}

/* =========================
   CURRENT RECIPE
   ========================= */

function renderCurrentRecipe(){
  const box = qs("recipeItems");
  let sum = 0;
  box.innerHTML = "";

  currentRecipe.items.forEach((i, idx)=>{
    sum += i.percent;
    box.innerHTML += `
      <div class="recipe-item">
        ${i.code}
        <input type="number"
               min="0"
               max="100"
               value="${i.percent}"
               onchange="updatePercent(${idx}, this.value)"> %
        <button onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  });

  box.innerHTML += `<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
}

function updatePercent(i, v){
  currentRecipe.items[i].percent = Number(v);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i, 1);
  renderCurrentRecipe();

  if(currentRecipe.items.length === 0){
    currentRecipeSeries = null;
    const select = qs("seriesFilter");
    if(select){
      select.value = "ALL";
      applySeriesFilter();
    }
  }
}

/* =========================
   SAVE
   ========================= */

function saveRecipe(){
  const name = qs("recipeName").value.trim();
  if(!name) return alert(t("errorName"));

  const sum = currentRecipe.items.reduce((s,i)=>s+i.percent,0);
  if(sum !== 100) return alert(t("errorPercent"));

  recipes.push({
    name,
    series: currentRecipeSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = { items: [] };
  currentRecipeSeries = null;

  qs("recipeItems").innerHTML = "";

  const select = qs("seriesFilter");
  if(select){
    select.value = "ALL";
    applySeriesFilter();
  }

  showTab("recipes");
}

/* =========================
   RECIPES LIST
   ========================= */

function renderRecipes(){
  const list = qs("recipeList");
  list.innerHTML = recipes.length
    ? recipes.map(r=>`
        <div class="color">
          <div>
            <strong>${r.name}</strong>
            ${r.series ? `<small> (${r.series})</small>` : ""}
            <br>
            ${r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")}
          </div>
        </div>
      `).join("")
    : `<p>${t("noRecipes")}</p>`;
}

/* =========================
   CALCULATOR
   ========================= */

function calculateWeight(){
  const w = Number(qs("totalWeight").value);
  const out = qs("weightResult");

  if(!currentRecipe.items.length){
    out.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }

  out.innerHTML =
    `<h4>${w} ${t("grams")}</h4>` +
    currentRecipe.items.map(i =>
      `${i.code}: ${(w * i.percent / 100).toFixed(1)} ${t("grams")}`
    ).join("<br>");
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", ()=>{
  initSeriesFilter();
  renderColors();
});