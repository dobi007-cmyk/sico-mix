const qs = id => document.getElementById(id);
const qsa = s => document.querySelectorAll(s);

let recipes = JSON.parse(localStorage.getItem("sico_recipes")||"[]");
let currentRecipe = {items:[]};
let currentSeries = null;
let mode = "percent";

function showTab(id){
  qsa(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");

  qsa("nav button").forEach(b=>b.classList.remove("active"));
  document.querySelector(`nav button[onclick*="${id}"]`)?.classList.add("active");

  if(id==="recipes") renderRecipes();
}

function initSeriesFilter(){
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(x=>{
    s.innerHTML += `<option value="${x.id}">${x.id}</option>`;
  });
  s.onchange = ()=>renderColors();
}

function renderColors(){
  const filter = qs("seriesFilter").value;
  const list = filter==="ALL" ? COLORS : COLORS.filter(c=>c.series===filter);
  qs("colorList").innerHTML = list.map(c=>`
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div><strong>${c.code}</strong><br>${c.name[currentLang]}</div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>`).join("");
}

function addColor(code){
  const c = COLORS.find(x=>x.code===code);
  if(!currentSeries) currentSeries=c.series;
  if(c.series!==currentSeries) return alert(t("errorSeries"));
  currentRecipe.items.push({code:c.code,percent:0});
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  const w = +qs("totalWeight").value || 1000;
  let sum = 0;
  qs("recipeItems").innerHTML = currentRecipe.items.map((i,idx)=>{
    const val = mode==="percent"?i.percent:(i.percent*w/100);
    sum+=i.percent;
    return `
    <div class="recipe-item">
      <span class="code">${i.code}</span>
      <input type="number" value="${val}" onchange="updateItem(${idx},this.value)">
      <span>${mode==="percent"?"%":"g"}</span>
      <button onclick="removeItem(${idx})">✕</button>
    </div>`;
  }).join("") + `<div class="sum-line">${t("sum")}: ${sum.toFixed(2)}%</div>`;
}

function updateItem(i,v){
  const w = +qs("totalWeight").value || 1000;
  currentRecipe.items[i].percent = mode==="percent"?+v:(+v/w*100);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length) currentSeries=null;
  renderCurrentRecipe();
}

function toggleMode(cb){
  mode = cb.checked?"gram":"percent";
  renderCurrentRecipe();
}

function saveRecipe(){
  if(!qs("recipeName").value || !currentRecipe.items.length)
    return alert(t("errorEmptyRecipe"));
  recipes.push({...currentRecipe,name:qs("recipeName").value});
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  renderRecipes();
  showTab("recipes");
}

function renderRecipes(){
  const c = qs("recipeList");
  if(!recipes.length){
    c.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }
  c.innerHTML = recipes.map(r=>`<div><strong>${r.name}</strong></div>`).join("");
}

document.addEventListener("DOMContentLoaded",()=>{
  initSeriesFilter();
  renderColors();
});
