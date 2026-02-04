// ────────────────────────────────────────────────
// i18n – Internationalization for SICO MIX
// ────────────────────────────────────────────────

const i18n = {
  ua: {
    paints:          "Фарби",
    recipes:         "Рецепти",
    newRecipe:       "Новий рецепт",
    catalog:         "Каталог фарб",
    recipeName:      "Назва рецепта",
    recipeNote:      "Нотатка / коментар",
    addRecipe:       "Зберегти рецепт",
    filterSeries:    "Серія фарб",
    allSeries:       "Всі серії",
    weightCalc:      "Розрахункова вага",
    sum:             "Сума",
    errorSeries:     "Можна змішувати тільки в межах однієї серії",
    noRecipes:       "Ще немає збережених рецептів",
    errorEmptyRecipe:"Вкажіть назву та додайте хоча б один колір"
  },
  pl: {
    paints:          "Farby",
    recipes:         "Receptury",
    newRecipe:       "Nowa receptura",
    catalog:         "Katalog farb",
    recipeName:      "Nazwa receptury",
    recipeNote:      "Notatka / komentarz",
    addRecipe:       "Zapisz recepturę",
    filterSeries:    "Seria farb",
    allSeries:       "Wszystkie serie",
    weightCalc:      "Waga obliczeniowa",
    sum:             "Suma",
    errorSeries:     "Można mieszać tylko w ramach jednej serii",
    noRecipes:       "Brak zapisanych receptur",
    errorEmptyRecipe:"Podaj nazwę i dodaj co najmniej jeden kolor"
  },
  en: {
    paints:          "Paints",
    recipes:         "Recipes",
    newRecipe:       "New recipe",
    catalog:         "Paint catalog",
    recipeName:      "Recipe name",
    recipeNote:      "Note / comment",
    addRecipe:       "Save recipe",
    filterSeries:    "Paint series",
    allSeries:       "All series",
    weightCalc:      "Target weight",
    sum:             "Sum",
    errorSeries:     "You can only mix colors within the same series",
    noRecipes:       "No saved recipes yet",
    errorEmptyRecipe:"Enter a name and add at least one color"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

// ────────────────────────────────────────────────
// Translate function
// ────────────────────────────────────────────────
function t(key) {
  return i18n[currentLang]?.[key] || i18n.ua[key] || key;
}

// ────────────────────────────────────────────────
// Change language & update UI
// ────────────────────────────────────────────────
function setLang(lang) {
  if (!["ua", "pl", "en"].includes(lang)) {
    lang = "ua";
  }

  currentLang = lang;
  localStorage.setItem("sico_lang", lang);

  // Оновлюємо текстовий вміст
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  // Оновлюємо плейсхолдери
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });

  // Оновлюємо динамічний контент, якщо функції існують
  if (typeof renderColors === "function") {
    renderColors();
  }
  if (typeof renderCurrentRecipe === "function") {
    renderCurrentRecipe();
  }
  if (typeof renderRecipes === "function") {
    renderRecipes();
  }
}

// ────────────────────────────────────────────────
// Ініціалізація при завантаженні сторінки
// ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
});

// Експорт (якщо перейдете на модулі пізніше)
export { t, setLang, currentLang };