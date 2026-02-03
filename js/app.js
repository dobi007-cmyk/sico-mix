let currentRecipeSeries = null;
let currentRecipe = { items: [] };
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

const qs = id => document.getElementById(id);

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes") renderRecipes();
}

/* SERIES */
function initSeriesFilter(){
  const s = qs("seriesFilter");
  SERIES.forEach(x=>{
    const o=document.createElement("option");
    o.value=x.id;
    o.textContent=x.id;
    s.appendChild(o);
  });
}

function applySeriesFilter(){
  const v=qs("seriesFilter").value;
  renderColors(v==="ALL"?COLORS:COLORS.filter(c=>c.series===v));
}

/* COLORS */
function renderColors(list=COLORS){
  qs("colorList").innerHTML = list.map(c=>`
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div><strong>${c.code}</strong><br><small>${c.name[currentLang]}</small></div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>`).join("");
}

function addColor(code){
  const c=COLORS.find(x=>x.code===code);
  if(!c) return;

  if(!currentRecipeSeries) currentRecipeSeries=c.series;
  if(c.series!==currentRecipeSeries){
    alert(t("errorSeries")+": "+currentRecipeSeries);
    return;
  }
  currentRecipe.items.push({code,percent:0});
  renderCurrentRecipe();
}

/* RECIPE */
function renderCurrentRecipe(){
  let sum=0;
  qs("recipeItems").innerHTML =
    currentRecipe.items.map((i,idx)=>{
      sum+=i.percent;
      return `<div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}" onchange="updatePercent(${idx},this.value)">%
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
    }).join("")+`<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
}

function updatePercent(i,v){
  currentRecipe.items[i].percent=Number(v);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length) currentRecipeSeries=null;
  renderCurrentRecipe();
}

/* SAVE */
function saveRecipe(){
  const name=qs("recipeName").value.trim();
  if(!name) return alert(t("errorName"));

  if(currentRecipe.items.reduce((s,i)=>s+i.percent,0)!==100)
    return alert(t("errorPercent"));

  recipes.push({name,series:currentRecipeSeries,items:currentRecipe.items});
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  currentRecipeSeries=null;
  qs("recipeItems").innerHTML="";
  showTab("recipes");
}

/* LIST */
function renderRecipes(){
  qs("recipeList").innerHTML = recipes.length
    ? recipes.map(r=>`
      <div class="color">
        <div><strong>${r.name}</strong> (${r.series})<br>
        ${r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")}
        </div>
      </div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{
  initSeriesFilter();
  renderColors();
});
