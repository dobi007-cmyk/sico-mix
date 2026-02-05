import { COLORS, SERIES } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";

window.setLang=setLang;

const qs=id=>document.getElementById(id);
let recipes=JSON.parse(localStorage.getItem("recipes")||"[]");
let currentRecipe={items:[],photo:null};
let mode="percent";

/* tabs */
window.showTab=id=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
};

/* colors */
function initSeries(){
  qs("seriesFilter").innerHTML=`<option value="ALL">${t("allSeries")||"ALL"}</option>`+
  SERIES.map(s=>`<option>${s.id}</option>`).join("");
}

window.renderColors=()=>{
  const f=qs("seriesFilter").value;
  const q=qs("colorSearch").value.toLowerCase();
  qs("colorList").innerHTML=COLORS
    .filter(c=>(f==="ALL"||c.series===f)&&
      (c.code.toLowerCase().includes(q)||c.name[currentLang].toLowerCase().includes(q)))
    .map(c=>`
      <div class="color">
        <div class="swatch" style="background:${c.hex}"></div>
        <b>${c.code}</b> ${c.name[currentLang]}
        <button onclick="addColor('${c.code}')">+</button>
      </div>`).join("");
};

/* recipe */
window.addColor=code=>{
  const c=COLORS.find(x=>x.code===code);
  currentRecipe.items.push({code:c.code,percent:0});
  saveDraft(); renderCurrentRecipe();
};

window.renderCurrentRecipe=()=>{
  const w=Number(qs("totalWeight").value||1000);
  qs("recipeItems").innerHTML=currentRecipe.items.map((i,idx)=>{
    const v=mode==="percent"?i.percent:(i.percent*w/100);
    return `<div>
      ${i.code}
      <input type="number" value="${v}" onchange="updateItem(${idx},this.value)">
      ${mode==="percent"?"%":"g"}
      <button onclick="removeItem(${idx})">✕</button>
    </div>`;
  }).join("");
};

window.updateItem=(i,v)=>{
  const w=Number(qs("totalWeight").value||1000);
  currentRecipe.items[i].percent=mode==="percent"?Number(v):(Number(v)/w*100);
  saveDraft();
};

window.removeItem=i=>{
  currentRecipe.items.splice(i,1);
  saveDraft(); renderCurrentRecipe();
};

window.toggleMode=cb=>{
  mode=cb.checked?"gram":"percent";
  renderCurrentRecipe();
};

/* save */
window.saveRecipe=()=>{
  recipes.push({
    name:qs("recipeName").value,
    note:qs("recipeNote").value,
    status:qs("recipeStatus").value,
    photo:currentRecipe.photo,
    items:currentRecipe.items
  });
  localStorage.setItem("recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  renderRecipes(); showTab("recipes");
};

/* draft */
function saveDraft(){
  localStorage.setItem("draft",JSON.stringify(currentRecipe));
}
const d=localStorage.getItem("draft");
if(d) currentRecipe=JSON.parse(d);

/* photo */
window.savePhoto=input=>{
  const r=new FileReader();
  r.onload=e=>{
    currentRecipe.photo=e.target.result;
    qs("photoPreview").innerHTML=`<img src="${e.target.result}" style="max-width:100%">`;
    saveDraft();
  };
  r.readAsDataURL(input.files[0]);
};

/* recipes */
function renderRecipes(){
  qs("recipeList").innerHTML=recipes.map(r=>`
    <div>
      <b>${r.name}</b> (${r.status})
      ${r.photo?`<img src="${r.photo}" width="60">`:""}
    </div>`).join("");
}
window.exportTXT=()=>{
  const t=recipes.map(r=>r.name).join("\n");
  download(t,"recipes.txt","text/plain");
};
window.exportPDF=()=>window.print();
window.importTXT=i=>{
  const r=new FileReader();
  r.onload=e=>{
    e.target.result.split("\n").forEach(n=>recipes.push({name:n,items:[]}));
    localStorage.setItem("recipes",JSON.stringify(recipes));
    renderRecipes();
  };
  r.readAsText(i.files[0]);
};
function download(c,n,t){
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([c],{type:t}));
  a.download=n; a.click();
}

/* theme */
window.toggleTheme=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",document.body.classList.contains("dark"));
};

/* init */
document.addEventListener("DOMContentLoaded",()=>{
  initSeries(); renderColors(); renderRecipes(); setLang(currentLang);
});
