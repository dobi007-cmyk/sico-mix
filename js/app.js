const qs = id => document.getElementById(id);

let recipes = JSON.parse(localStorage.getItem("sico_recipes")||"[]");
let currentRecipe = { items:[] };
let currentSeries = null;
let mode = "percent";

/* Tabs */
function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes") renderRecipes();
}

/* Series */
function initSeries(){
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(x=>{
    const o=document.createElement("option");
    o.value=x.id;
    o.textContent=x.id;
    s.appendChild(o);
  });
  s.onchange = renderColors;
}

/* Colors */
function renderColors(){
  const v = qs("seriesFilter").value;
  const list = v==="ALL"?COLORS:COLORS.filter(c=>c.series===v);
  qs("colorList").innerHTML = list.map(c=>`
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div><strong>${c.code}</strong><br>${c.name[currentLang]}</div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>
  `).join("");
}

/* Recipe */
function addColor(code){
  const c = COLORS.find(x=>x.code===code);
  if(!currentSeries) currentSeries=c.series;
  if(c.series!==currentSeries){
    alert(t("errorSeries"));
    return;
  }
  currentRecipe.items.push({code:c.code,percent:0});
  qs("seriesBadge").textContent=currentSeries;
  qs("seriesBadge").style.display="inline-block";
  renderCurrentRecipe();
}

function toggleMode(cb){
  mode = cb.checked ? "gram" : "percent";
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  const w = Number(qs("totalWeight").value);
  let sum=0;
  qs("recipeItems").innerHTML = currentRecipe.items.map((i,idx)=>{
    sum+=i.percent;
    const val = mode==="percent"?i.percent:(i.percent*w/100).toFixed(1);
    return `
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${val}"
          onchange="updateItem(${idx},this.value)">
        ${mode==="percent"?"%":"g"}
        <button onclick="removeItem(${idx})">✕</button>
      </div>
    `;
  }).join("") + `<strong>${t("sum")}: ${sum.toFixed(1)}%</strong>`;
}

function updateItem(i,v){
  const w = Number(qs("totalWeight").value);
  currentRecipe.items[i].percent =
    mode==="percent"?Number(v):(Number(v)/w*100);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length){
    currentSeries=null;
    qs("seriesBadge").style.display="none";
  }
  renderCurrentRecipe();
}

/* Save */
function saveRecipe(){
  if(!qs("recipeName").value || !currentRecipe.items.length) return;
  recipes.push({
    name:qs("recipeName").value,
    note:qs("recipeNote").value,
    series:currentSeries,
    items:currentRecipe.items
  });
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  currentSeries=null;
  qs("recipeName").value="";
  qs("recipeNote").value="";
  qs("seriesBadge").style.display="none";
  showTab("recipes");
}

/* List */
function renderRecipes(){
  qs("recipeList").innerHTML = recipes.length
    ? recipes.map(r=>`<div><strong>${r.name}</strong> (${r.series})</div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

document.addEventListener("DOMContentLoaded",()=>{
  initSeries();
  renderColors();
});
