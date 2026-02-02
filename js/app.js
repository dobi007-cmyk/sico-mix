let currentRecipe = { items: [] };
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");

function qs(id){ return document.getElementById(id); }

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes") renderRecipes();
}

function renderColors(){
  const list = qs("colorList");
  list.innerHTML = "";
  COLORS.forEach(c=>{
    list.innerHTML += `
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <div><strong>${c.code}</strong><br><small>${c.name[currentLang]}</small></div>
        <button onclick="addColor('${c.code}')">+</button>
      </div>`;
  });
}

function addColor(code){
  currentRecipe.items.push({ code, percent: 0 });
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  const box = qs("recipeItems");
  let total = 0;
  box.innerHTML = "";
  currentRecipe.items.forEach((i,idx)=>{
    total += i.percent;
    box.innerHTML += `
      <div>
        ${i.code}
        <input type="number" value="${i.percent}" min="0" max="100"
        onchange="updatePercent(${idx},this.value)"> %
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  });
  box.innerHTML += `<p><strong>${t("sum")}:</strong> ${total}%</p>`;
}

function updatePercent(i,v){
  currentRecipe.items[i].percent = Number(v);
  renderCurrentRecipe();
}

function removeItem(i){
  currentRecipe.items.splice(i,1);
  renderCurrentRecipe();
}

function saveRecipe(){
  const name = qs("recipeName").value.trim();
  if(!name) return alert(t("errorName"));

  const sum = currentRecipe.items.reduce((s,i)=>s+i.percent,0);
  if(sum!==100) return alert(t("errorPercent"));

  recipes.push({ name, items: currentRecipe.items });
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  currentRecipe = { items: [] };
  qs("recipeItems").innerHTML="";
  showTab("recipes");
}

function renderRecipes(){
  const list = qs("recipeList");
  list.innerHTML = recipes.length
    ? recipes.map(r=>`<div><strong>${r.name}</strong><br>`+
        r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")+
      `</div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

function calculateWeight(){
  const w = Number(qs("totalWeight").value);
  const out = qs("weightResult");
  if(!currentRecipe.items.length){
    out.innerHTML = `<p>${t("noColors")}</p>`;
    return;
  }
  out.innerHTML = `<h4>${w} ${t("grams")}</h4>`+
    currentRecipe.items.map(i=>{
      return `${i.code}: ${(w*i.percent/100).toFixed(1)} ${t("grams")}`;
    }).join("<br>");
}

document.addEventListener("DOMContentLoaded", renderColors);
