const i18n = {
  ua: {
    // Наявні переклади
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
    
    // НОВІ переклади
    searchByCodeName: "Пошук за кодом або назвою",
    grams: "г",
    percent: "%",
    weight: "Вага",
    mode: "Режим",
    draft: "Чернетка",
    ready: "Готовий",
    status: "Статус",
    import: "Імпорт",
    export: "Експорт",
    exportTxt: "Експорт TXT",
    exportPdf: "Експорт PDF",
    importRecipes: "Імпорт рецептів",
    exportRecipes: "Експорт рецептів",
    addPhoto: "Додати фото",
    takePhoto: "Зробити фото",
    removePhoto: "Видалити фото",
    recipePhoto: "Фото результату",
    autoSave: "Автозбереження",
    saved: "Збережено",
    saving: "Збереження...",
    theme: "Тема",
    light: "Світла",
    dark: "Темна",
    system: "Системна",
    delete: "Видалити",
    edit: "Редагувати",
    cancel: "Скасувати",
    save: "Зберегти",
    confirmDelete: "Підтвердити видалення",
    recipeWillBeDeleted: "Рецепт буде видалено",
    no: "Ні",
    yes: "Так",
    totalWeight: "Загальна вага",
    switchMode: "Перемикач режиму",
    toggleModeHelp: "Перемикає між відсотками та грамами"
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
    
    // НОВІ переклади
    searchByCodeName: "Szukaj po kodzie lub nazwie",
    grams: "g",
    percent: "%",
    weight: "Waga",
    mode: "Tryb",
    draft: "Szkic",
    ready: "Gotowy",
    status: "Status",
    import: "Importuj",
    export: "Eksportuj",
    exportTxt: "Eksport TXT",
    exportPdf: "Eksport PDF",
    importRecipes: "Import receptur",
    exportRecipes: "Eksport receptur",
    addPhoto: "Dodaj zdjęcie",
    takePhoto: "Zrób zdjęcie",
    removePhoto: "Usuń zdjęcie",
    recipePhoto: "Zdjęcie wyniku",
    autoSave: "Autozapisywanie",
    saved: "Zapisano",
    saving: "Zapisywanie...",
    theme: "Motyw",
    light: "Jasny",
    dark: "Ciemny",
    system: "Systemowy",
    delete: "Usuń",
    edit: "Edytuj",
    cancel: "Anuluj",
    save: "Zapisz",
    confirmDelete: "Potwierdź usunięcie",
    recipeWillBeDeleted: "Receptura zostanie usunięta",
    no: "Nie",
    yes: "Tak",
    totalWeight: "Waga całkowita",
    switchMode: "Przełącznik trybu",
    toggleModeHelp: "Przełącza między procentami a gramami"
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
    
    // НОВІ переклади
    searchByCodeName: "Search by code or name",
    grams: "g",
    percent: "%",
    weight: "Weight",
    mode: "Mode",
    draft: "Draft",
    ready: "Ready",
    status: "Status",
    import: "Import",
    export: "Export",
    exportTxt: "Export TXT",
    exportPdf: "Export PDF",
    importRecipes: "Import recipes",
    exportRecipes: "Export recipes",
    addPhoto: "Add photo",
    takePhoto: "Take photo",
    removePhoto: "Remove photo",
    recipePhoto: "Result photo",
    autoSave: "Auto-save",
    saved: "Saved",
    saving: "Saving...",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save",
    confirmDelete: "Confirm delete",
    recipeWillBeDeleted: "Recipe will be deleted",
    no: "No",
    yes: "Yes",
    totalWeight: "Total weight",
    switchMode: "Mode switch",
    toggleModeHelp: "Switches between percentages and grams"
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

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
}
