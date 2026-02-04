const i18n={
 ua:{
  paints:"Фарби",
  recipes:"Рецепти",
  newRecipe:"Новий рецепт",
  catalog:"Каталог фарб",
  recipeName:"Назва рецепта",
  recipeNote:"Нотатка",
  addRecipe:"Зберегти рецепт",
  filterSeries:"Серія фарб",
  allSeries:"Всі серії",
  weightCalc:"Вага",
  sum:"Сума",
  errorSeries:"Можна змішувати тільки в межах однієї серії"
 },
 pl:{
  paints:"Farby",
  recipes:"Receptury",
  newRecipe:"Nowa receptura",
  catalog:"Katalog farb",
  recipeName:"Nazwa receptury",
  recipeNote:"Notatka",
  addRecipe:"Zapisz recepturę",
  filterSeries:"Seria farb",
  allSeries:"Wszystkie serie",
  weightCalc:"Waga",
  sum:"Suma",
  errorSeries:"Można mieszać tylko w jednej serii"
 },
 en:{
  paints:"Paints",
  recipes:"Recipes",
  newRecipe:"New recipe",
  catalog:"Paint catalog",
  recipeName:"Recipe name",
  recipeNote:"Note",
  addRecipe:"Save recipe",
  filterSeries:"Paint series",
  allSeries:"All series",
  weightCalc:"Weight",
  sum:"Total",
  errorSeries:"You can mix only within one series"
 }
};

let currentLang=localStorage.getItem("sico_lang")||"ua";
function t(k){return i18n[currentLang][k]||k}

function setLang(l){
 currentLang=l;
 localStorage.setItem("sico_lang",l);
 document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));
 document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=t(e.dataset.i18nPlaceholder));
 if(window.renderColors) renderColors();
 if(window.renderCurrentRecipe) renderCurrentRecipe();
}
document.addEventListener("DOMContentLoaded",()=>setLang(currentLang));