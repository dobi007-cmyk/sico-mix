let currentRecipeSeries = null;
let currentRecipe = { items: [] };
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

const qs = id => document.getElementById(id);

function showTab(id){
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id === "recipes") renderRecipes();
}

/* SERIES */
function initSeriesFilter(){
  const select = qs("seriesFilter");
  SERIES.forEach(s=>{
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.id;
    select.appendChild(o);
  });
}

function applySeriesFilter(){
  const v = qs("seriesFilter").value;
  renderColors(v === "ALL" ? COLORS : COLORS.filter(c=>c.series===v));
}

/* COLORS */
function renderColors(list = COLORS){
  qs("colorList").innerHTML = list.map(c=>`
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div><strong>${c.code}</strong><br><small>${c.name[currentLang]}</small></div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>`).join("");
}

function addColor(code){
  const c = COLORS.find(x=>x.code===code);
  if(!currentRecipeSeries) currentRecipeSeries = c.series;
  if(c.series !== currentRecipeSeries){
    alert(`${t("errorSeries")}\n${t("currentSeries")}: ${currentRecipeSeries}`);
    return;
  }
  currentRecipe.items.push({ code, percent: 0 });
  renderCurrentRecipe();
}

/* RECIPE */
function renderCurrentRecipe(){
  let sum = 0;
  qs("recipeItems").innerHTML = currentRecipe.items.map((i,idx)=>{
    sum += i.percent;
    return `
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}" min="0" max="100"
        onchange="updatePercent(${idx},this.value)"> %
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  }).join("") + `<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
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

/* SAVE */
function saveRecipe(){
  const name = qs("recipeName").value.trim();
  if(!name) return alert(t("errorName"));
  if(currentRecipe.items.reduce((s,i)=>s+i.percent,0)!==100)
    return alert(t("errorPercent"));
  recipes.push({ name, series: currentRecipeSeries, items: currentRecipe.items });
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  currentRecipe={items:[]}; currentRecipeSeries=null;
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

/* CALC */
function calculateWeight(){
  const w = Number(qs("totalWeight").value);
  qs("weightResult").innerHTML = currentRecipe.items.length
    ? `<h4>${w} ${t("grams")}</h4>`+
      currentRecipe.items.map(i=>`${i.code}: ${(w*i.percent/100).toFixed(1)} ${t("grams")}`).join("<br>")
    : `<p>${t("noColors")}</p>`;
}

document.addEventListener("DOMContentLoaded", ()=>{
  initSeriesFilter();
  renderColors();
});
