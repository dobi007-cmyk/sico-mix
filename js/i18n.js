/* =========================
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
    noRecipes: "Немає рецептів",

    grams: "г",
    kilograms: "кг",

    filterSeries: "Серія фарб",
    allSeries: "Всі серії",

    errorSeries: "Можна змішувати тільки в межах однієї серії",
    currentSeries: "Поточна серія",

    percentMode: "Відсотки",
    gramMode: "Грами",

    imported: "Імпорт завершено",
    saved: "Збережено"
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
    noRecipes: "Brak receptur",

    grams: "g",
    kilograms: "kg",

    filterSeries: "Seria farb",
    allSeries: "Wszystkie serie",

    errorSeries: "Można mieszać tylko w jednej serii",
    currentSeries: "Aktualna seria",

    percentMode: "Procenty",
    gramMode: "Gramy",

    imported: "Import zakończony",
    saved: "Zapisano"
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
    noRecipes: "No recipes",

    grams: "g",
    kilograms: "kg",

    filterSeries: "Paint series",
    allSeries: "All series",

    errorSeries: "You can mix only within one series",
    currentSeries: "Current series",

    percentMode: "Percent",
    gramMode: "Grams",

    imported: "Import completed",
    saved: "Saved"
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

  // оновлення динаміки
  if (typeof initSeries === "function") initSeries();
  if (typeof renderColors === "function") renderColors();
  if (typeof renderWeightOptions === "function") renderWeightOptions();
  if (typeof renderRecipe === "function") renderRecipe();
  if (typeof renderRecipes === "function") renderRecipes();
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});
