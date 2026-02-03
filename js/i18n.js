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

    exportTxt: "Експорт TXT",
    importTxt: "Імпорт TXT",

    pasteText: "Або встав текст рецепта:",
    importTextBtn: "Імпортувати текст",

    filterSeries: "Серія",
    allSeries: "Усі серії",

    sum: "Сума",
    grams: "г",

    noRecipes: "Немає рецептів",
    noColors: "Немає фарб у рецепті",

    errorName: "Введи назву рецепта",
    errorPercent: "Сума має бути 100%",
    errorSeries: "Не можна змішувати різні серії",
    currentSeries: "Поточна серія"
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

    exportTxt: "Eksport TXT",
    importTxt: "Import TXT",

    pasteText: "Lub wklej tekst receptury:",
    importTextBtn: "Importuj tekst",

    filterSeries: "Seria",
    allSeries: "Wszystkie serie",

    sum: "Suma",
    grams: "g",

    noRecipes: "Brak receptur",
    noColors: "Brak farb w recepturze",

    errorName: "Podaj nazwę receptury",
    errorPercent: "Suma musi wynosić 100%",
    errorSeries: "Nie można mieszać różnych serii",
    currentSeries: "Aktualna seria"
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

    exportTxt: "Export TXT",
    importTxt: "Import TXT",

    pasteText: "Or paste recipe text:",
    importTextBtn: "Import text",

    filterSeries: "Series",
    allSeries: "All series",

    sum: "Total",
    grams: "g",

    noRecipes: "No recipes",
    noColors: "No colors in recipe",

    errorName: "Enter recipe name",
    errorPercent: "Total must be 100%",
    errorSeries: "You cannot mix different series",
    currentSeries: "Current series"
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

  if (window.renderColors) renderColors();
  if (window.renderRecipes) renderRecipes();
  if (window.renderCurrentRecipe) renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});
