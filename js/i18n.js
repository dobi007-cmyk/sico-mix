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
    sum:"Сума",
    noColors:"Немає фарб у рецепті",
    grams:"г",
    kilograms:"кг",
    filterSeries:"Серія фарб",
    allSeries:"Всі серії",
    errorSeries:"Можна змішувати тільки в межах однієї серії",
    currentSeries:"Поточна серія"
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
    sum:"Suma",
    noColors:"Brak farb",
    grams:"g",
    kilograms:"kg",
    filterSeries:"Seria farb",
    allSeries:"Wszystkie serie",
    errorSeries:"Można mieszać tylko w jednej serii",
    currentSeries:"Aktualna seria"
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
    sum:"Total",
    noColors:"No colors",
    grams:"g",
    kilograms:"kg",
    filterSeries:"Paint series",
    allSeries:"All series",
    errorSeries:"You can mix only within one series",
    currentSeries:"Current series"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

function t(k){
  return i18n[currentLang][k] || k;
}

function setLang(lang){
  currentLang = lang;
  localStorage.setItem("sico_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent = t(e.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{
    e.placeholder = t(e.dataset.i18nPlaceholder);
  });

  renderWeightOptions();
  renderColors();
  renderRecipes();
  renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", ()=>setLang(currentLang));
