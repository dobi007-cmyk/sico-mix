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
    importTextBtn: "Імпортувати текст"
  },

  pl: {
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowy",
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
    importTextBtn: "Importuj tekst"
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
    importTextBtn: "Import text"
  }
};

let currentLang = "ua";

function setLang(lang) {
  currentLang = lang;

  // text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });

  localStorage.setItem("sico_lang", lang);
  
  // ДОДАНО: перемалювати список рецептів, якщо функція існує
  if (typeof renderRecipes === 'function') {
    renderRecipes();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("sico_lang");
  if (savedLang) currentLang = savedLang;
  setLang(currentLang);
});