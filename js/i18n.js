const i18n = {
  ua: {
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий рецепт",
    import: "Імпорт / Експорт",

    catalog: "Каталог фарб",
    mixed: "Змішані рецепти",

    recipeName: "Назва рецепту",
    recipeNote: "Нотатка",

    addRecipe: "Зберегти рецепт",
    noRecipes: "Немає рецептів",

    weightCalc: "Калькулятор ваги",

    exportTxt: "Експорт TXT",
    importTxt: "Імпорт TXT",
    pasteText: "Або встав текст рецепта:",
    importTextBtn: "Імпортувати текст",

    // 🔹 ДОДАНО
    sum: "Сума",
    noColors: "Немає фарб у рецепті",
    grams: "г",
    add: "Додати",
    remove: "Видалити",
    errorName: "Введи назву рецепта",
    errorPercent: "Сума компонентів має бути 100%",
    noData: "Немає даних"
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
    noRecipes: "Brak receptur",

    weightCalc: "Kalkulator wagi",

    exportTxt: "Eksport TXT",
    importTxt: "Import TXT",
    pasteText: "Lub wklej tekst receptury:",
    importTextBtn: "Importuj tekst",

    // 🔹 ДОДАНО
    sum: "Suma",
    noColors: "Brak farb w recepturze",
    grams: "g",
    add: "Dodaj",
    remove: "Usuń",
    errorName: "Podaj nazwę receptury",
    errorPercent: "Suma musi wynosić 100%",
    noData: "Brak danych"
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
    noRecipes: "No recipes",

    weightCalc: "Weight calculator",

    exportTxt: "Export TXT",
    importTxt: "Import TXT",
    pasteText: "Or paste recipe text:",
    importTextBtn: "Import text",

    // 🔹 ДОДАНО
    sum: "Total",
    noColors: "No colors in recipe",
    grams: "g",
    add: "Add",
    remove: "Remove",
    errorName: "Enter recipe name",
    errorPercent: "Total must be 100%",
    noData: "No data"
  }
};

let currentLang = "ua";

function t(key) {
  return i18n[currentLang][key] || key;
}

function setLang(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });

  localStorage.setItem("sico_lang", lang);

  // перемалювати динамічні секції
  if (typeof renderRecipes === "function") renderRecipes();
  if (typeof renderCurrentRecipe === "function") renderCurrentRecipe();
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("sico_lang");
  if (saved) currentLang = saved;
  setLang(currentLang);
});document.addEventListener("DOMContentLoaded",()=>setLang("ua"));