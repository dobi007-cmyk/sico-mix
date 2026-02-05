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
    errorEmptyRecipe: "Вкажіть назву та додайте хоча б один колір",
    searchPlaceholder: "Пошук за кодом або назвою",
    statusDraft: "Чернетка",
    statusReady: "Готовий",
    import: "Імпорт",
    exportText: "Експорт JSON",
    exportPdf: "Експорт PDF",
    addPhoto: "Додати фото змішаної фарби",
    themeToggle: "Змінити тему",
    cancel: "Скасувати",
    confirm: "Підтвердити",
    sumWarning: "Сума повинна бути близько 100%",
    savedSuccess: "Рецепт збережено",
    error: "Помилка"
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
    errorEmptyRecipe: "Podaj nazwę i dodaj kolor",
    searchPlaceholder: "Szukaj po kodzie lub nazwie",
    statusDraft: "Szkic",
    statusReady: "Gotowy",
    import: "Import",
    exportText: "Eksport JSON",
    exportPdf: "Eksport PDF",
    addPhoto: "Dodaj zdjęcie zmieszanej farby",
    themeToggle: "Zmień motyw",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    sumWarning: "Suma powinna być około 100%",
    savedSuccess: "Receptura zapisana",
    error: "Błąd"
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
    errorEmptyRecipe: "Enter name and add color",
    searchPlaceholder: "Search by code or name",
    statusDraft: "Draft",
    statusReady: "Ready",
    import: "Import",
    exportText: "Export JSON",
    exportPdf: "Export PDF",
    addPhoto: "Add photo of mixed paint",
    themeToggle: "Toggle theme",
    cancel: "Cancel",
    confirm: "Confirm",
    sumWarning: "Sum should be around 100%",
    savedSuccess: "Recipe saved",
    error: "Error"
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

  // Оновити опції селектів тощо
  document.querySelectorAll("option[data-i18n]").forEach(o => {
    o.textContent = t(o.dataset.i18n);
  });

  renderAll(); // Оновити все при зміні мови
}
