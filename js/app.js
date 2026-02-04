const qs = id => document.getElementById(id);

let currentRecipe = { items: [] };
let currentRecipeSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

/* ================= TABS ================= */

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes") renderRecipes();
}

/* ================= SERIES FILTER ================= */

function initSeriesFilter(){
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.filter(x=>x.id!=="ALL").forEach(x=>{
    const o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.id;
    s.appendChild(o);
  });
  s.onchange = applySeriesFilter;
}

function applySeriesFilter(){
  const v = qs("seriesFilter").value;
  renderColors(v==="ALL" ? COLORS : COLORS.filter(c=>c.series===v));
}

/* ================= COLORS ================= */

function renderColors(list = COLORS){
  const box = qs("colorList");
  box.innerHTML = "";
  list.forEach(c=>{
    box.innerHTML += `
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div>
          <strong>${c.code}</strong><br>
          ${c.name[currentLang]}
        </div>
        <button onclick="addColor('${c.code}')">+</button>
      </div>`;
  });
}

function addColor(code){
  const c = COLORS.find(x=>x.code===code);

  if(!currentRecipeSeries) currentRecipeSeries = c.series;
  if(c.series !== currentRecipeSeries){
    alert(t("errorSeries")+": "+currentRecipeSeries);
    return;
  }

  currentRecipe.items.push({code:c.code, percent:0});
  renderCurrentRecipe();
}

/* ================= RECIPE ================= */

function renderCurrentRecipe(){
  const box = qs("recipeItems");
  let sum = 0;
  box.innerHTML = "";

  currentRecipe.items.forEach((i,idx)=>{
    sum += i.percent;
    box.innerHTML += `
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}"
          onchange="updatePercent(${idx},this.value)"> %
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  });

  box.innerHTML += `<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
}

function updatePercent(i,v){
  currentRecipe.items[i].percent = Number(v);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length) currentRecipeSeries=null;
  renderCurrentRecipe();
}

/* ================= SAVE ================= */

function saveRecipe(){
  const name = qs("recipeName").value.trim();
  if(!name) return;

  recipes.push({
    name,
    note: qs("recipeNote").value,
    series: currentRecipeSeries,
    items: currentRecipe.items
  });

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  currentRecipe = {items:[]};
  currentRecipeSeries = null;
  qs("recipeItems").innerHTML = "";
  showTab("recipes");
}

/* ================= LIST ================= */

function renderRecipes(){
  const box = qs("recipeList");
  box.innerHTML = recipes.length
    ? recipes.map(r=>`
      <div class="color">
        <strong>${r.name}</strong><br>
        ${r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")}
      </div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

/* ================= CALC ================= */

function calculateWeight(){
  const w = Number(qs("totalWeight").value);
  qs("weightResult").innerHTML =
    currentRecipe.items.map(i=>
      `${i.code}: ${(w*i.percent/100).toFixed(1)} ${t("grams")}`
    ).join("<br>");
}

/* ================= EXPORT ================= */

function exportTxt(){
  const txt = recipes.map(r=>
    `${r.name}\n${r.items.map(i=>`${i.code} ${i.percent}%`).join("\n")}`
  ).join("\n\n");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt]));
  a.download = "sico_recipes.txt";
  a.click();
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", ()=>{
  initSeriesFilter();
  renderColors();
});