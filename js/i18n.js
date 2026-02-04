// =========================
// SICO MIX — i18n
// =========================

const i18n = {
  ua: {
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий рецепт",
    import: "Імпорт / Експорт",
    catalog: "Каталог фарб",
    recipeName: "Назва рецепта",
    recipeNote: "Нотатка",
    addRecipe: "Зберегти рецепт",
    noRecipes: "Немає рецептів",
    weightCalc: "Калькулятор ваги",
    sum: "Сума",
    filterSeries: "Серія фарб",
    allSeries: "Всі серії",
    errorSeries: "Можна змішувати тільки в межах однієї серії",
    currentSeries: "Поточна серія",
    exportTxt: "Експорт TXT",
    exportPdf: "Експорт PDF",
    grams: "г",
    kilograms: "кг"
  },

  pl: {
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowa receptura",
    import: "Import / Export",
    catalog: "Katalog farb",
    recipeName: "Nazwa receptury",
    recipeNote: "Notatka",
    addRecipe: "Zapisz recepturę",
    noRecipes: "Brak receptur",
    weightCalc: "Kalkulator wagi",
    sum: "Suma",
    filterSeries: "Seria farb",
    allSeries: "Wszystkie serie",
    errorSeries: "Można mieszać tylko w jednej serii",
    currentSeries: "Aktualna seria",
    exportTxt: "Eksport TXT",
    exportPdf: "Eksport PDF",
    grams: "g",
    kilograms: "kg"
  },

  en: {
    paints: "Paints",
    recipes: "Recipes",
    newRecipe: "New recipe",
    import: "Import / Export",
    catalog: "Paint catalog",
    recipeName: "Recipe name",
    recipeNote: "Note",
    addRecipe: "Save recipe",
    noRecipes: "No recipes",
    weightCalc: "Weight calculator",
    sum: "Total",
    filterSeries: "Paint series",
    allSeries: "All series",
    errorSeries: "You can mix only within one series",
    currentSeries: "Current series",
    exportTxt: "Export TXT",
    exportPdf: "Export PDF",
    grams: "g",
    kilograms: "kg"
  }
};

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
}
