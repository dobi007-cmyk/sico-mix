const qs = id => document.getElementById(id);

let currentRecipe = { items:[] };
let currentRecipeSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
}

function initSeriesFilter(){
  const s = qs("seriesFilter");
  SERIES.forEach(x=>{
    const o = document.createElement("option");
    o.value = x.id;
    o.textContent = x.id;
    s.appendChild(o);
  });
}

function applySeriesFilter(){
  const v = qs("seriesFilter").value;
  renderColors(v==="ALL" ? COLORS : COLORS.filter(c=>c.series===v));
}

function renderColors(list=COLORS){
  const box = qs("colorList");
  box.innerHTML = "";
  list.forEach(c=>{
    box.innerHTML += `
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div><strong>${c.code}</strong><br>${c.name[currentLang]}</div>
        <button onclick="addColor('${c.code}')">+</button>
      </div>`;
  });
}

function addColor(code){
  const c = COLORS.find(x=>x.code===code);
  if(!currentRecipeSeries) currentRecipeSeries = c.series;
  if(c.series !== currentRecipeSeries){
    alert(t("errorSeries")+"\n"+t("currentSeries")+": "+currentRecipeSeries);
    return;
  }
  currentRecipe.items.push({code:c.code,percent:0});
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  const box = qs("recipeItems");
  let sum = 0;
  box.innerHTML = "";
  currentRecipe.items.forEach((i,idx)=>{
    sum += i.percent;
    box.innerHTML += `
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}" onchange="updatePercent(${idx},this.value)"> %
      </div>`;
  });
  box.innerHTML += `<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
}

function updatePercent(i,v){
  currentRecipe.items[i].percent = Number(v);
  renderCurrentRecipe();
}

function renderWeightOptions(){
  qs("totalWeight").innerHTML = `
    <option value="100">100 ${t("grams")}</option>
    <option value="500">500 ${t("grams")}</option>
    <option value="1000">1 ${t("kilograms")}</option>
    <option value="5000">5 ${t("kilograms")}</option>`;
}

function calculateWeight(){
  const w = Number(qs("totalWeight").value);
  const out = qs("weightResult");
  out.innerHTML = currentRecipe.items.map(i=>
    `${i.code}: ${(w*i.percent/100).toFixed(1)} ${t("grams")}`
  ).join("<br>");
}

function renderRecipes(){
  const box = qs("recipeList");
  box.innerHTML = recipes.length
    ? recipes.map(r=>`<div class="color"><strong>${r.name}</strong></div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

document.addEventListener("DOMContentLoaded", ()=>{
  initSeriesFilter();
  renderWeightOptions();
  renderColors();
});