const qs = id => document.getElementById(id);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = null;
let currentRecipeSeries = null;
let inputMode = "percent";

/* UI */
function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
}

/* COLORS */
function initSeriesFilter(){
  const s = qs("seriesFilter");
  s.innerHTML = <option value="ALL">${t("allSeries")}</option>;
  SERIES.forEach(x=>{
    const o=document.createElement("option");
    o.value=x.id;o.textContent=x.id;
    s.appendChild(o);
  });
  s.onchange=()=>renderColors();
}

function renderColors(){
  const v=qs("seriesFilter").value;
  const list=v==="ALL"?COLORS:COLORS.filter(c=>c.series===v);
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
function newRecipe(){
  currentRecipe={id:Date.now(),name:"",note:"",items:[]};
  currentRecipeSeries=null;
  qs("recipeName").value="";
  qs("recipeNote").value="";
  renderCurrentRecipe();
}

function addColor(code){
  if(!currentRecipe) newRecipe();
  const c=COLORS.find(x=>x.code===code);
  if(!currentRecipeSeries) currentRecipeSeries=c.series;
  if(c.series!==currentRecipeSeries){
    alert(t("errorSeries"));
    return;
  }
  currentRecipe.items.push({code:c.code,percent:0});
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length) currentRecipeSeries=null;
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  const box=qs("recipeItems");
  const w=Number(qs("totalWeight").value||1000);
  let sum=0;
  box.innerHTML="";
  currentRecipe?.items.forEach((i,idx)=>{
    const val=inputMode==="percent"?i.percent:(i.percent*w/100).toFixed(1);
    sum+=i.percent;
    box.innerHTML+=`
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${val}" onchange="updateItem(${idx},this.value)">
        ${inputMode==="percent"?"%":"g"}
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  });
  if(currentRecipe) box.innerHTML+=`<p><strong>${t("sum")}:</strong> ${sum}%</p>`;
}

function updateItem(i,v){
  const w=Number(qs("totalWeight").value||1000);
  currentRecipe.items[i].percent=
    inputMode==="percent"?Number(v):(Number(v)/w*100);
  renderCurrentRecipe();
}

function toggleMode(){
  inputMode=qs("modeToggle").checked?"gram":"percent";
  renderCurrentRecipe();
}

/* SAVE / LOAD */
function saveRecipe(){
  currentRecipe.name=qs("recipeName").value;
  currentRecipe.note=qs("recipeNote").value;
  const i=recipes.findIndex(r=>r.id===currentRecipe.id);
  if(i>=0)recipes[i]=currentRecipe; else recipes.push(currentRecipe);
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  renderRecipes();
  alert("OK");
}

function renderRecipes(){
  const box=qs("recipeList");
  if(!recipes.length){box.innerHTML=`<p>${t("noRecipes")}</p>`;return;}
  box.innerHTML=recipes.map(r=>`
    <div class="color">
      <strong>${r.name}</strong>
      <button onclick="editRecipe(${r.id})">✏️</button>
    </div>`).join("");
}

function editRecipe(id){
  currentRecipe=recipes.find(r=>r.id===id);
  currentRecipeSeries=currentRecipe.items.length
    ?COLORS.find(c=>c.code===currentRecipe.items[0].code).series:null;
  qs("recipeName").value=currentRecipe.name;
  qs("recipeNote").value=currentRecipe.note;
  showTab("new");
  renderCurrentRecipe();
}

/* EXPORT */
function exportTxt(){
  const txt=recipes.map(r=>`# ${r.name}\n${r.note}\n`+
    r.items.map(i=>`${i.code} ${i.percent}%`).join("\n")).join("\n\n");
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([txt]));
  a.download="sico_recipes.txt";
  a.click();
}

function exportPdf(){ window.print(); }

/* PHOTO */
function loadRecipePhoto(input){
  const f=input.files[0];
  if(!f||!currentRecipe)return;
  const r=new FileReader();
  r.onload=e=>{
    qs("recipePhoto").src=e.target.result;
    qs("recipePhoto").style.display="block";
    currentRecipe.photo=e.target.result;
  };
  r.readAsDataURL(f);
}

/* INIT */
document.addEventListener("DOMContentLoaded",()=>{
  initSeriesFilter();
  renderColors();
  renderRecipes();
  setLang(currentLang);
});
