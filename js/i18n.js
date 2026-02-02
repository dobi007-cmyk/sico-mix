const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    import:"Імпорт / Експорт",
    catalog:"Каталог фарб",
    mixed:"Змішані рецепти",
    recipeName:"Назва рецепта",
    recipeNote:"Нотатка",
    addRecipe:"Зберегти рецепт",
    noRecipes:"Немає рецептів",
    weightCalc:"Калькулятор ваги",
    exportTxt:"Експорт TXT",
    importTxt:"Імпорт TXT",
    pasteText:"Або встав текст рецепта:",
    importTextBtn:"Імпортувати текст",
    sum:"Сума",
    noColors:"Немає фарб у рецепті",
    grams:"г",
    errorName:"Введи назву рецепта",
    errorPercent:"Сума має бути 100%"
    filterSeries: "Серія фарб",
    allSeries: "Всі серії",
    errorSeries: "Можна змішувати тільки в межах однієї серії",
    currentSeries: "Поточна серія"
  },
  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowa receptura",
    import:"Import / Export",
    catalog:"Katalog farb",
    mixed:"Receptury mieszane",
    recipeName:"Nazwa receptury",
    recipeNote:"Notatka",
    addRecipe:"Zapisz recepturę",
    noRecipes:"Brak receptur",
    weightCalc:"Kalkulator wagi",
    exportTxt:"Eksport TXT",
    importTxt:"Import TXT",
    pasteText:"Lub wklej tekst receptury:",
    importTextBtn:"Importuj tekst",
    sum:"Suma",
    noColors:"Brak farb w recepturze",
    grams:"g",
    errorName:"Podaj nazwę receptury",
    errorPercent:"Suma musi wynosić 100%"
    filterSeries: "Seria farb",
    allSeries: "Wszystkie serie",
    errorSeries: "Można mieszać tylko w obrębie jednej serii",
    currentSeries: "Aktualna seria"
  },
  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    import:"Import / Export",
    catalog:"Paint catalog",
    mixed:"Mixed recipes",
    recipeName:"Recipe name",
    recipeNote:"Note",
    addRecipe:"Save recipe",
    noRecipes:"No recipes",
    weightCalc:"Weight calculator",
    exportTxt:"Export TXT",
    importTxt:"Import TXT",
    pasteText:"Or paste recipe text:",
    importTextBtn:"Import text",
    sum:"Total",
    noColors:"No colors in recipe",
    grams:"g",
    errorName:"Enter recipe name",
    errorPercent:"Total must be 100%"
    filterSeries: "Paint series",
    allSeries: "All series",
    errorSeries: "You can mix paints only within one series",
    currentSeries: "Current series"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

function t(k){ return i18n[currentLang][k] || k; }

function setLang(lang){
  currentLang = lang;
  localStorage.setItem("sico_lang",lang);

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

document.addEventListener("DOMContentLoaded",()=>setLang(currentLang));
