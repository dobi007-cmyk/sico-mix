const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    catalog:"Каталог фарб",
    recipeName:"Назва рецепта",
    recipeNote:"Нотатка",
    addRecipe:"Зберегти рецепт",
    noRecipes:"Немає рецептів",
    weightCalc:"Калькулятор ваги",
    sum:"Сума",
    grams:"г",
    filterSeries:"Серія фарб",
    allSeries:"Всі серії",
    errorSeries:"Можна змішувати тільки в межах однієї серії",
    exportTxt:"Експорт TXT"
  },
  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowa receptura",
    catalog:"Katalog farb",
    recipeName:"Nazwa receptury",
    recipeNote:"Notatka",
    addRecipe:"Zapisz recepturę",
    noRecipes:"Brak receptur",
    weightCalc:"Kalkulator wagi",
    sum:"Suma",
    grams:"g",
    filterSeries:"Seria farb",
    allSeries:"Wszystkie serie",
    errorSeries:"Można mieszać tylko w jednej serii",
    exportTxt:"Eksport TXT"
  },
  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    catalog:"Paint catalog",
    recipeName:"Recipe name",
    recipeNote:"Note",
    addRecipe:"Save recipe",
    noRecipes:"No recipes",
    weightCalc:"Weight calculator",
    sum:"Total",
    grams:"g",
    filterSeries:"Paint series",
    allSeries:"All series",
    errorSeries:"You can mix only within one series",
    exportTxt:"Export TXT"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

function t(k){ return i18n[currentLang][k] || k; }

function setLang(lang){
  currentLang = lang;
  localStorage.setItem("sico_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent = t(e.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{
    e.placeholder = t(e.dataset.i18nPlaceholder);
  });

  if(window.renderColors) renderColors();
  if(window.renderRecipes) renderRecipes();
  if(window.renderCurrentRecipe) renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", ()=>setLang(currentLang));