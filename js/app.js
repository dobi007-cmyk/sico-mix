const qs = id=>document.getElementById(id);

let currentRecipe = { items:[] };
let currentSeries = null;
let recipes = JSON.parse(localStorage.getItem("sico_recipes")||"[]");

/* ---------- UI ---------- */
function showTab(id){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  qs(id).classList.add("active");
}

/* ---------- SERIES ---------- */
function initSeries(){
  const s = qs("seriesFilter");
  SERIES.forEach(x=>{
    const o=document.createElement("option");
    o.value=x.id;
    o.textContent=x.name;
    s.appendChild(o);
  });
}

function renderColors(){
  const v=qs("seriesFilter").value;
  const list = v==="ALL"?COLORS:COLORS.filter(c=>c.series===v);
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

/* ---------- RECIPE ---------- */
function addColor(code){
  const c=COLORS.find(x=>x.code===code);
  if(!currentSeries) currentSeries=c.series;
  if(c.series!==currentSeries){
    alert(t("errorSeries")+"\n"+t("currentSeries")+": "+currentSeries);
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
    box.innerHTML+=`
      <div class="recipe-item">
        ${i.code}
        <input type="number" value="${i.percent}" onchange="updatePercent(${idx},this.value)">%
        <button onclick="removeColor(${idx})">✕</button>
      </div>`;
  });
  box.innerHTML+=`<strong>${t("sum")}: ${sum}%</strong>`;
}

function updatePercent(i,v){
  currentRecipe.items[i].percent=Number(v);
  renderRecipe();
}
function removeColor(i){
  currentRecipe.items.splice(i,1);
  if(!currentRecipe.items.length) currentSeries=null;
  renderRecipe();
}

/* ---------- WEIGHT ---------- */
function renderWeight(){
  qs("totalWeight").innerHTML=`
    <option value="100">100 ${t("grams")}</option>
    <option value="500">500 ${t("grams")}</option>
    <option value="1000">1 ${t("kilograms")}</option>
    <option value="5000">5 ${t("kilograms")}</option>`;
}

function calculateWeight(){
  const w=Number(qs("totalWeight").value);
  qs("weightResult").innerHTML=currentRecipe.items.map(i=>
    `${i.code}: ${(w*i.percent/100).toFixed(1)} ${t("grams")}`
  ).join("<br>");
}

/* ---------- SAVE / EXPORT ---------- */
function saveRecipe(){
  const name=qs("recipeName").value.trim();
  if(!name) return;
  recipes.push({name,items:currentRecipe.items});
  localStorage.setItem("sico_recipes",JSON.stringify(recipes));
  currentRecipe={items:[]};
  renderRecipes();
}

function exportTXT(){
  const txt=JSON.stringify(recipes,null,2);
  download(txt,"recipes.txt","text/plain");
}

function exportPDF(){
  const txt=recipes.map(r=>r.name).join("\n");
  download(txt,"recipes.pdf","application/pdf");
}

function download(content,name,type){
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([content],{type}));
  a.download=name;
  a.click();
}

/* ---------- INIT ---------- */
function renderRecipes(){
  const box=qs("recipeList");
  box.innerHTML=recipes.length
    ? recipes.map(r=>`<div class="color"><strong>${r.name}</strong></div>`).join("")
    : `<p>${t("noRecipes")}</p>`;
}

document.addEventListener("DOMContentLoaded",()=>{
  initSeries();
  renderColors();
  renderWeight();
  setLang(currentLang);
  /* =========================
   EXPORT / IMPORT TXT
   ========================= */

function exportTXT(){
  let txt = recipes.map(r=>{
    return `# ${r.name}
Series: ${r.series}
${r.items.map(i=>`${i.code} ${i.percent}%`).join("\n")}
`;
  }).join("\n----------------\n");

  const blob = new Blob([txt], {type:"text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sico-recipes.txt";
  a.click();
}

function importTXT(input){
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = e=>{
    const blocks = e.target.result.split("----------------");
    blocks.forEach(b=>{
      const lines = b.trim().split("\n");
      if(!lines.length) return;

      const name = lines[0].replace("#","").trim();
      const seriesLine = lines.find(l=>l.startsWith("Series"));
      const series = seriesLine ? seriesLine.split(":")[1].trim() : null;

      const items = lines.filter(l=>l.includes("%")).map(l=>{
        const [code,p] = l.split(" ");
        return {code, percent:Number(p.replace("%",""))};
      });

      recipes.push({name, series, items});
    });

    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    alert("Imported");
    renderRecipes();
  };
  reader.readAsText(file);
}

/* =========================
   PRINT / PDF
   ========================= */

function printRecipes(){
  let html = `<h1>SICO MIX</h1>`;
  recipes.forEach(r=>{
    html += `<h2>${r.name}</h2>`;
    html += `<p>Series: ${r.series}</p>`;
    r.items.forEach(i=>{
      html += `${i.code}: ${i.percent}%<br>`;
    });
    html += "<hr>";
  });

  const w = window.open("");
  w.document.write(html);
  w.print();
}

/* =========================
   NOTES
   ========================= */

function saveGlobalNote(){
  const note = qs("globalNote").value;
  localStorage.setItem("sico_note", note);
  alert("Saved");
}

document.addEventListener("DOMContentLoaded", ()=>{
  const n = localStorage.getItem("sico_note");
  if(n) qs("globalNote").value = n;
});

/* =========================
   PHOTO
   ========================= */

function savePhoto(input){
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = e=>{
    localStorage.setItem("sico_photo", e.target.result);
    showPhoto();
  };
  reader.readAsDataURL(file);
}

function showPhoto(){
  const img = localStorage.getItem("sico_photo");
  if(img){
    qs("photoPreview").innerHTML = `<img src="${img}" style="max-width:100%">`;
  }
}

document.addEventListener("DOMContentLoaded", showPhoto);
});
