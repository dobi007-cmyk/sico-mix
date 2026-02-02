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
    noRecipes: "Немає рецептів",
    weightCalc: "Калькулятор ваги",
    exportTxt: "Експорт TXT",
    importTxt: "Імпорт TXT",
    pasteText: "Або встав текст рецепта:",
    importTextBtn: "Імпортувати текст",
    sum: "Сума",
    noColors: "Немає фарб у рецепті",
    grams: "г",
    errorName: "Введи назву рецепта",
    errorPercent: "Сума має бути 100%"
  },
  pl: { /* скорочено — логіка та сама */ },
  en: { /* скорочено — логіка та сама */ }
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
