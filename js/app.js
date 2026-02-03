const qs = id => document.getElementById(id);

let inputMode = "percent"; // percent | gram
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = null;
let currentRecipeSeries = null;

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
}

function initSeriesFilter(){
  const s = qs("seriesFilter");
  s.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(x=>{
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

function renderColors(list=COLORS){
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

function newRecipe(){
  currentRecipe = { id:Date.now(), name:"", note:"", items:[] };
  currentRecipeSeries = null;
  renderCurrentRecipe();
}

function addColor(code){
  const c = COLORS.find(x=>x.code===code);
  if(!currentRecipe) newRecipe();

  if(!currentRecipeSeries) currentRecipeSeries = c.series;
  if(c.series !== currentRecipeSeries){
    alert(t("errorSeries")+" ("+currentRecipeSeries+")");
    return;
  }

  currentRecipe.items.push({ code:c.code, percent:0 });
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  if(currentRecipe.items.length===0) currentRecipeSeries=null;
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  if(!currentRecipe) return;

  qs("recipeName").value = currentRecipe.name || "";
  qs("recipeNote").value = currentRecipe.note || "";

  const box = qs("recipeItems");
  box.innerHTML = "";

  let sum = 0;
  currentRecipe.items.forEach((it,i)=>{
    sum += it.percent;
    box.innerHTML += `
      <div class="recipe-item">
        ${it.code}
        <input type="number" value="${it.percent}"
          onchange="currentRecipe.items[${i}].percent=Number(this.value);renderCurrentRecipe()"> %
        <button onclick="removeItem(${i})">${t("delete")}</button>
      </div>`;
  });

  box.innerHTML += `<strong>${t("sum")}: ${sum}%</strong>`;
}

function saveRecipe(){
  currentRecipe.name = qs("recipeName").value;
  currentRecipe.note = qs("recipeNote").value;

  const i = recipes.findIndex(r=>r.id===currentRecipe.id);
  if(i>=0) recipes[i]=currentRecipe;
  else recipes.push(currentRecipe);

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  renderRecipes();
  alert("OK");
}

function renderRecipes(){
  const box = qs("recipeList");
  if(!recipes.length){
    box.innerHTML = `<p>${t("noRecipes")}</p>`;
    return;
  }

  box.innerHTML = recipes.map(r=>`
    <div class="color">
      <strong>${r.name}</strong>
      <button onclick="editRecipe(${r.id})">✏️</button>
    </div>`).join("");
}

function editRecipe(id){
  currentRecipe = recipes.find(r=>r.id===id);
  currentRecipeSeries = currentRecipe.items.length
    ? COLORS.find(c=>c.code===currentRecipe.items[0].code).series
    : null;
  showTab("new");
  renderCurrentRecipe();
}

/* ===== EXPORT / IMPORT ===== */

function exportTxt(){
  let ttxt = recipes.map(r=>{
    return `# ${r.name}\n${r.note}\n` +
      r.items.map(i=>`${i.code} ${i.percent}%`).join("\n");
  }).join("\n\n");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ttxt]));
  a.download = "sico_recipes.txt";
  a.click();
}

function importTxt(input){
  const r = new FileReader();
  r.onload = ()=>{
    alert("Імпорт через TXT — додай парсер за потреби");
  };
  r.readAsText(input.files[0]);
}

function exportPdf(){
  window.print();
}

function loadRecipePhoto(input){
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = e=>{
    const img = document.getElementById("recipePhoto");
    img.src = e.target.result;
    img.style.display = "block";
    currentRecipe.photo = e.target.result; // зберігаємо в рецепт
  };
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", ()=>{
  initSeriesFilter();
  renderColors();
  renderRecipes();
});