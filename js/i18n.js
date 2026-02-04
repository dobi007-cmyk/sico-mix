const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    import:"Імпорт / Експорт",
    catalog:"Каталог фарб",
    mixed:"Збережені рецепти",
    recipeName:"Назва рецепта",
    recipeNote:"Нотатка",
    addRecipe:"Зберегти рецепт",
    updateRecipe:"Оновити рецепт",
    noRecipes:"Немає рецептів",
    weightCalc:"Калькулятор ваги",
    sum:"Сума",
    grams:"г",
    kilograms:"кг",
    filterSeries:"Серія фарб",
    allSeries:"Всі серії",
    errorSeries:"Можна змішувати тільки в межах однієї серії",
    currentSeries:"Поточна серія",
    delete:"Видалити",
    exportTxt:"Експорт TXT",
    exportPdf:"Експорт PDF",
    importTxt:"Імпорт TXT",
    notes:"Нотатки"
  },
  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowa receptura",
    import:"Import / Export",
    catalog:"Katalog farb",
    mixed:"Zapisane receptury",
    recipeName:"Nazwa receptury",
    recipeNote:"Notatka",
    addRecipe:"Zapisz recepturę",
    updateRecipe:"Aktualizuj recepturę",
    noRecipes:"Brak receptur",
    weightCalc:"Kalkulator wagi",
    sum:"Suma",
    grams:"g",
    kilograms:"kg",
    filterSeries:"Seria farb",
    allSeries:"Wszystkie serie",
    errorSeries:"Można mieszać tylko w jednej serii",
    currentSeries:"Aktualna seria",
    delete:"Usuń",
    exportTxt:"Eksport TXT",
    exportPdf:"Eksport PDF",
    importTxt:"Import TXT",
    notes:"Notatki"
  },
  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    import:"Import / Export",
    catalog:"Paint catalog",
    mixed:"Saved recipes",
    recipeName:"Recipe name",
    recipeNote:"Note",
    addRecipe:"Save recipe",
    updateRecipe:"Update recipe",
    noRecipes:"No recipes",
    weightCalc:"Weight calculator",
    sum:"Total",
    grams:"g",
    kilograms:"kg",
    filterSeries:"Paint series",
    allSeries:"All series",
    errorSeries:"You can mix only within one series",
    currentSeries:"Current series",
    delete:"Delete",
    exportTxt:"Export TXT",
    exportPdf:"Export PDF",
    importTxt:"Import TXT",
    notes:"Notes"
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

  renderColors();
  renderRecipes();
  renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", ()=>setLang(currentLang));
