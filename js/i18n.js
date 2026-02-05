const i18n = {
  ua: {
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий рецепт",
    catalog: "Каталог фарб",
    recipeName: "Назва рецепта",
    recipeNote: "Нотатка",
    addRecipe: "Зберегти рецепт",
    filterSeries: "Серія фарб",
    allSeries: "Всі серії",
    weightCalc: "Розрахункова вага",
    sum: "Сума",
    errorSeries: "Можна змішувати тільки в межах однієї серії",
    noRecipes: "Немає рецептів",
    errorEmptyRecipe: "Вкажіть назву та додайте хоча б один колір"
  },
  pl: {
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowa receptura",
    catalog: "Katalog farb",
    recipeName: "Nazwa receptury",
    recipeNote: "Notatka",
    addRecipe: "Zapisz recepturę",
    filterSeries: "Seria farb",
    allSeries: "Wszystkie serie",
    weightCalc: "Waga",
    sum: "Suma",
    errorSeries: "Można mieszać tylko w jednej serii",
    noRecipes: "Brak receptur",
    errorEmptyRecipe: "Podaj nazwę i dodaj kolor"
  },
  en: {
    paints: "Paints",
    recipes: "Recipes",
    newRecipe: "New recipe",
    catalog: "Paint catalog",
    recipeName: "Recipe name",
    recipeNote: "Note",
    addRecipe: "Save recipe",
    filterSeries: "Paint series",
    allSeries: "All series",
    weightCalc: "Weight",
    sum: "Sum",
    errorSeries: "You can mix only within one series",
    noRecipes: "No recipes",
    errorEmptyRecipe: "Enter name and add color"
  }
};

export let currentLang = localStorage.getItem("sico_lang") || "ua";

export function t(key) {
  return i18n[currentLang]?.[key] || key;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("sico_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}
