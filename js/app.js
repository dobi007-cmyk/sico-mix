let currentRecipe={items:[]};
let recipes=JSON.parse(localStorage.getItem("sico_recipes")||"[]");

const qs=id=>document.getElementById(id);

function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
  if(id==="recipes") renderRecipes();
}

function getFilteredColors(){
  const s=qs("seriesFilter").value;
  const q=(qs("colorSearch").value||"").toLowerCase();
  return COLORS.filter(c=>
    (s==="ALL"||c.series===s) &&
    (c.code.toLowerCase().includes(q)||c.name[currentLang].toLowerCase().includes(q))
  );
}

function renderColors(){
  const list=qs("colorList");
  list.innerHTML="";
  getFilteredColors().forEach(c=>{
    const d=document.createElement("div");
    d.className="color-card";
    d.innerHTML=`
      <div class="swatch" style="background:${c.hex}"></div>
      <div><strong>${c.code}</strong><small>${c.name[currentLang]}</small></div>
      <button onclick="addColor('${c.code}')">+</button>`;
    list.appendChild(d);
  });
}

function addColor(code){
  currentRecipe.items.push({code,percent:0});
  renderCurrentRecipe();
}

function renderCurrentRecipe(){
  qs("recipeItems").innerHTML=currentRecipe.items.map((i,idx)=>`
    <div>${i.code}
      <input type="number" value="${i.percent}" onchange="update(${idx},this.value)">%
      <button onclick="removeItem(${idx})">✕</button>
    </div>`).join("");
}

function update(i,v){currentRecipe.items[i].percent=Number(v);}
function removeItem(i){currentRecipe.items.splice(i,1);renderCurrentRecipe();}

function saveRecipe(){
  recipes.push({
    name:qs("recipeName").value,
    note:qs("recipeNote").value,
    items:currentRecipe.items
  });
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  showTab("recipes");
}

function renderRecipes(){
  qs("recipeList").innerHTML=recipes.map(r=>`
    <div><strong>${r.name}</strong><br>
    ${r.items.map(i=>`${i.code}: ${i.percent}%`).join("<br>")}</div>`).join("");
}

function calculateWeight(){
  const t=Number(qs("totalWeight").value);
  qs("weightResult").innerHTML=currentRecipe.items.map(i=>{
    return `${i.code}: ${(t*i.percent/100).toFixed(1)} g`;
  }).join("<br>");
}

function exportRecipes(){
  let txt="";
  recipes.forEach(r=>{
    txt+=`RECIPE\nNAME:${r.name}\n`;
    r.items.forEach(i=>txt+=`${i.code}=${i.percent}\n`);
    txt+="END\n\n";
  });
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([txt]));
  a.download="sico_recipes.txt";
  a.click();
}

document.addEventListener("DOMContentLoaded",renderColors);