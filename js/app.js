const qs=id=>document.getElementById(id);

let recipes=JSON.parse(localStorage.getItem("sico_recipes")||"[]");
let currentRecipe={items:[]};
let currentSeries=null;
let mode="percent";

function showTab(id){
 document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
 qs(id).classList.add("active");
 if(id==="recipes") renderRecipes();
}

function initSeries(){
 const s=qs("seriesFilter");
 s.innerHTML=`<option value="ALL">${t("allSeries")}</option>`;
 SERIES.filter(x=>x.id!=="ALL").forEach(x=>{
  const o=document.createElement("option");
  o.value=x.id;
  o.textContent=x.id;
  s.appendChild(o);
 });
 s.onchange=applySeriesFilter;
}

function applySeriesFilter(){
 const v=qs("seriesFilter").value;
 renderColors(v==="ALL"?COLORS:COLORS.filter(c=>c.series===v));
}

function renderColors(list=COLORS){
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

function addColor(code){
 const c=COLORS.find(x=>x.code===code);
 if(!currentSeries){
  currentSeries=c.series;
  qs("seriesFilter").value=c.series;
  qs("seriesBadge").textContent=c.series;
  qs("seriesBadge").style.display="inline-block";
 }
 if(c.series!==currentSeries){
  alert(t("errorSeries"));
  return;
 }
 currentRecipe.items.push({code:c.code,percent:0});
 renderCurrentRecipe();
}

function renderCurrentRecipe(){
 const box=qs("recipeItems");
 const total=Number(qs("totalWeight").value||1000);
 let sum=0;
 box.innerHTML="";
 currentRecipe.items.forEach((i,idx)=>{
  const val=mode==="percent"?i.percent:(i.percent*total/100).toFixed(1);
  sum+=i.percent;
  box.innerHTML+=`
   <div class="recipe-item">
    ${i.code}
    <input type="number" value="${val}" onchange="updateItem(${idx},this.value)">
    ${mode==="percent"?"%":"g"}
    <button onclick="removeItem(${idx})">✕</button>
   </div>`;
 });
 box.innerHTML+=`<strong>${t("sum")}: ${sum}%</strong>`;
}

function updateItem(i,v){
 const total=Number(qs("totalWeight").value||1000);
 currentRecipe.items[i].percent=mode==="percent"?Number(v):(Number(v)/total*100);
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

function toggleMode(el){
 mode=el.checked?"gram":"percent";
 renderCurrentRecipe();
}

function saveRecipe(){
 currentRecipe.name=qs("recipeName").value;
 currentRecipe.note=qs("recipeNote").value;
 recipes.push({...currentRecipe,series:currentSeries});
 localStorage.setItem("sico_recipes",JSON.stringify(recipes));
 currentRecipe={items:[]};
 currentSeries=null;
 qs("seriesBadge").style.display="none";
 renderCurrentRecipe();
 showTab("recipes");
}

function renderRecipes(){
 const box=qs("recipeList");
 box.innerHTML=recipes.length?recipes.map(r=>`
  <div class="color"><strong>${r.name}</strong><br>${r.series}</div>`).join("")
  :"<p>—</p>";
}

document.addEventListener("DOMContentLoaded",()=>{
 initSeries();
 renderColors();
});