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
    errorEmptyRecipe:"Вкажіть назву та додайте хоча б один колір",
    mode:            "Режим вводу:",
    reset:           "Скинути",
    cancel:          "Скасувати",
    delete:          "Видалити",
    confirmDeleteTitle: "Видалити рецепт?",
    confirmDeleteMessage: "Цю дію не можна скасувати. Ви впевнені?",
    load:            "Завантажити",
    edit:            "Редагувати",
    copy:            "Копіювати",
    colors:          "кольори",
    recipeDeleted:   "Рецепт видалено",
    recipeSaved:     "Рецепт збережено",
    loading:         "Завантаження...",
    error:           "Помилка",
    success:         "Успіх",
    warning:         "Попередження"
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
    errorEmptyRecipe:"Podaj nazwę i dodaj co najmniej jeden kolor",
    mode:            "Tryb wprowadzania:",
    reset:           "Resetuj",
    cancel:          "Anuluj",
    delete:          "Usuń",
    confirmDeleteTitle: "Usunąć recepturę?",
    confirmDeleteMessage: "Tej akcji nie można cofnąć. Jesteś pewien?",
    load:            "Załaduj",
    edit:            "Edytuj",
    copy:            "Kopiuj",
    colors:          "kolory",
    recipeDeleted:   "Receptura usunięta",
    recipeSaved:     "Receptura zapisana",
    loading:         "Ładowanie...",
    error:           "Błąd",
    success:         "Sukces",
    warning:         "Ostrzeżenie"
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
    errorEmptyRecipe:"Enter a name and add at least one color",
    mode:            "Input mode:",
    reset:           "Reset",
    cancel:          "Cancel",
    delete:          "Delete",
    confirmDeleteTitle: "Delete recipe?",
    confirmDeleteMessage: "This action cannot be undone. Are you sure?",
    load:            "Load",
    edit:            "Edit",
    copy:            "Copy",
    colors:          "colors",
    recipeDeleted:   "Recipe deleted",
    recipeSaved:     "Recipe saved",
    loading:         "Loading...",
    error:           "Error",
    success:         "Success",
    warning:         "Warning"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

// ────────────────────────────────────────────────
// Translate function
// ────────────────────────────────────────────────
function t(key, params = {}) {
  let text = i18n[currentLang]?.[key] || i18n.ua[key] || key;
  
  // Заміна параметрів
  Object.keys(params).forEach(param => {
    text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
  });
  
  return text;
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
  
  // Оновлюємо атрибут lang в html
  document.documentElement.lang = lang;

  // Оновлюємо текстовий вміст
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key) {
      // Можна додати обробку параметрів з data-атрибута
      const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
      el.textContent = t(key, params);
    }
  });

  // Оновлюємо плейсхолдери
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });
  
  // Оновлюємо aria-атрибути
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    if (key) el.setAttribute('aria-label', t(key));
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
  
  // Оновлюємо активні кнопки вибору мови
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    const btnLang = btn.getAttribute('onclick').match(/'(\w+)'/)?.[1];
    btn.setAttribute('aria-pressed', btnLang === lang ? 'true' : 'false');
  });
}

// ────────────────────────────────────────────────
// Ініціалізація при завантаженні сторінки
// ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Визначаємо мову браузера, якщо не збережено
  if (!localStorage.getItem("sico_lang")) {
    const browserLang = navigator.language || navigator.userLanguage;
    let detectedLang = "ua";
    if (browserLang.startsWith("pl")) detectedLang = "pl";
    else if (browserLang.startsWith("en")) detectedLang = "en";
    setLang(detectedLang);
  } else {
    setLang(currentLang);
  }
});

// Експорт (якщо перейдете на модулі пізніше)
export { t, setLang, currentLang };