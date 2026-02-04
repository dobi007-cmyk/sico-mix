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
    currentSeries: "Поточна серія,
    addColor: "Додати фарбу"
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
    currentSeries: "Aktualna seria",
    addColor: "Dodaj farbę"
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
    currentSeries: "Current series",
    addColor: "Add color"
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
document.addEventListener("DOMContentLoaded",()=>setLang(currentLang));/* =========================
   SICO MIX – i18n
   ========================= */

const i18n = {
  ua: {
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий рецепт",
    import: "Імпорт / Експорт",

    catalog: "Каталог фарб",
    mixed: "Змішані рецепти",

    recipeName: "Назва рецепта",
    recipeNote: "Нотатка",
    addRecipe: "Зберегти рецепт",

    weightCalc: "Калькулятор ваги",
    sum: "Сума",
    noColors: "Немає фарб у рецепті",

    grams: "г",
    kilograms: "кг",

    filterSeries: "Серія фарб",
    allSeries: "Всі серії",

    errorSeries: "Можна змішувати тільки в межах однієї серії",
    currentSeries: "Поточна серія",

    noRecipes: "Немає рецептів"
  },

  pl: {
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowa receptura",
    import: "Import / Export",

    catalog: "Katalog farb",
    mixed: "Receptury mieszane",

    recipeName: "Nazwa receptury",
    recipeNote: "Notatka",
    addRecipe: "Zapisz recepturę",

    weightCalc: "Kalkulator wagi",
    sum: "Suma",
    noColors: "Brak farb w recepturze",

    grams: "g",
    kilograms: "kg",

    filterSeries: "Seria farb",
    allSeries: "Wszystkie serie",

    errorSeries: "Można mieszać tylko w jednej serii",
    currentSeries: "Aktualna seria",

    noRecipes: "Brak receptur"
  },

  en: {
    paints: "Paints",
    recipes: "Recipes",
    newRecipe: "New recipe",
    import: "Import / Export",

    catalog: "Paint catalog",
    mixed: "Mixed recipes",

    recipeName: "Recipe name",
    recipeNote: "Note",
    addRecipe: "Save recipe",

    weightCalc: "Weight calculator",
    sum: "Total",
    noColors: "No colors in recipe",

    grams: "g",
    kilograms: "kg",

    filterSeries: "Paint series",
    allSeries: "All series",

    errorSeries: "You can mix only within one series",
    currentSeries: "Current series",

    noRecipes: "No recipes"
  }
};

/* =========================
   Language handling
   ========================= */

let currentLang = localStorage.getItem("sico_lang") || "ua";

function t(key) {
  return i18n[currentLang][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("sico_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // оновлення динамічних частин
  if (typeof renderWeightOptions === "function") renderWeightOptions();
  if (typeof renderColors === "function") renderColors();
  if (typeof renderRecipes === "function") renderRecipes();
  if (typeof renderCurrentRecipe === "function") renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});
