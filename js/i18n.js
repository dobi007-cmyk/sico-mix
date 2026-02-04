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
  renderCurrentRecipe();
  renderRecipes();
}

document.addEventListener("DOMContentLoaded", ()=>setLang(currentLang));