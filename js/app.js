const qs=id=>document.getElementById(id);

let inputMode="percent";
let currentSeries=null;

let currentRecipe={items:[]};
let recipes=JSON.parse(localStorage.getItem("sico_recipes")||"[]");

/* TABS */
function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes")renderRecipes();
}

/* SERIES */
function initSeries(){
  const s=qs("seriesFilter");
  s.innerHTML="";
  SERIES.forEach(x=>{
    const o=document.createElement("option");
    o.value=x.id;
    o.textContent=x.id==="ALL"?t("allSeries"):x.name;
    s.appendChild(o);
  });
  s.onchange=renderColors;
}

/* COLORS */
function renderColors(){
  const f=qs("seriesFilter").value;
  const list=f==="ALL"?COLORS:COLORS.filter(c=>c.series===f);
  const box=qs("colorList");
  box.innerHTML="";
  list.forEach(c=>{
    box.innerHTML+=`
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div><strong>${c.code}</strong><br>${c.name[currentLang]}</div>
        <button onclick="addColor('${c.code}')">+</button>
      </div>`;
  });
}

/* RECIPE */
function addColor(code){
  const c=COLORS.find(x=>x.code===code);
  if(!currentSeries)currentSeries=c.series;
  if(c.series!==currentSeries){
    alert(t("errorSeries")+" — "+currentSeries);
    return;
  }
  currentRecipe.items.push({code:c.code,percent:0});
  renderRecipe();
}

function renderRecipe(){
  const box=qs("recipeItems");
  let sum=0;
  box.innerHTML="";
  currentRecipe.items.forEach((i,idx)=>{
    sum+=i.percent;
    const val=inputMode==="percent"?i.percent:(i.percent*qs("totalWeight").value/100).toFixed(1);
    box.innerHTML+=`
      <div>
        ${i.code}
        <input type="number" value="${val}" onchange="updateValue(${idx},this.value)">
        ${inputMode==="percent"?"%":t("grams")}
        <button onclick="removeColor(${idx})">✕</button>
      </div>`;
  });
  box.innerHTML+=`<strong>${t("sum")}: ${sum.toFixed(1)}%</strong>`;
  calculateWeight();
}

function updateValue(i,v){
  v=Number(v)||0;
  if(inputMode==="percent")currentRecipe.items[i].percent=v;
  else currentRecipe.items[i].percent=v/qs("totalWeight").value*100;
  renderRecipe();
}

function removeColor(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length)currentSeries=null;
  renderRecipe();
}

function toggleMode(){
  inputMode=inputMode==="percent"?"grams":"percent";
  renderRecipe();
}

/* WEIGHT */
function renderWeightSelect(){
  qs("totalWeight").innerHTML=`
    <option value="100">100 ${t("grams")}</option>
    <option value="500">500 ${t("grams")}</option>
    <option value="1000">1 ${t("kilograms")}</option>
    <option value="5000">5 ${t("kilograms")}</option>`;
}

function calculateWeight(){
  const r=qs("weightResult");
  const total=Number(qs("totalWeight").value);
  r.innerHTML="";
  const sum=currentRecipe.items.reduce((s,i)=>s+i.percent,0);
  if(sum!==100)return;
  currentRecipe.items.forEach(i=>{
    r.innerHTML+=`${i.code}: <b>${(total*i.percent/100).toFixed(1)} ${t("grams")}</b><br>`;
  });
}

/* SAVE */
function saveRecipe(){
  const name=qs("recipeName").value.trim();
  if(!name)return;
  recipes.push({name,series:currentSeries,items:currentRecipe.items});
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  currentSeries=null;
  qs("recipeName").value="";
  qs("recipeNote").value="";
  renderRecipe();
  showTab("recipes");
}

/* RECIPES */
function renderRecipes(){
  qs("recipeList").innerHTML=recipes.length
    ?recipes.map(r=>`<div><b>${r.name}</b> (${r.series})</div>`).join("")
    :`<p>${t("noRecipes")}</p>`;
}

/* EXPORT */
function exportTxt(){
  const txt=recipes.map(r=>r.name+"\n"+r.items.map(i=>i.code+" "+i.percent+"%").join("\n")).join("\n\n");
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"}));
  a.download="sico-recipes.txt";
  a.click();
}

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{
  initSeries();
  renderColors();
  renderWeightSelect();
  setLang(currentLang);
});
