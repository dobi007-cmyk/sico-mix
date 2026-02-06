const translations = {
  ua: {
    // Навігація
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий рецепт",
    settings: "Налаштування",
    catalog: "Каталог фарб",

    // Форма рецепту
    recipeName: "Назва рецепта",
    recipeNamePlaceholder: "Введіть назву рецепта",
    recipeNote: "Нотатка / коментар",
    recipeNotePlaceholder: "Додаткові примітки (опціонально)",
    saveRecipe: "Зберегти рецепт",
    clearDraft: "Очистити чернетку",
    status: "Статус",
    statusDraft: "Чернетка",
    statusReady: "Готовий",

    // Кольори
    colors: "фарб",
    addColor: "Додати фарбу",
    colorAlreadyAdded: "Цю фарбу вже додано",
    seriesSet: "Встановлено серію",

    // Калькулятор
    totalWeight: "Загальна вага",
    totalWeightGrams: "г",
    totalColors: "Фарб",
    totalPercent: "Сума %",
    percentMode: "Режим %",
    gramMode: "Режим грами",
    modeChanged: "Режим змінено",

    // Пошук та фільтри
    search: "Пошук",
    searchColorsPlaceholder: "Пошук за кодом або назвою",
    searchRecipesPlaceholder: "Пошук рецептів за назвою або нотаткою",
    filterSeries: "Серія",
    allSeries: "Усі серії",

    // Фото
    addPhoto: "Додати фото суміші",
    clickToUpload: "Натисніть або перетягніть фото",
    maxSize: "Макс. 5 МБ",
    photoAdded: "Фото додано",
    photoRemoved: "Фото видалено",
    fileTooLarge: "Файл завеликий (макс. 5 МБ)",
    invalidImage: "Непідтримуваний формат зображення",

    // Тема та мова
    theme: "Тема",
    themeLight: "Світла",
    themeDark: "Темна",
    themeAuto: "Системна",
    themeChanged: "Тему змінено",
    language: "Мова",
    languageChanged: "Мову змінено",

    // Керування даними
    dataManagement: "Дані та резервні копії",
    exportAll: "Експортувати всі дані",
    backupCreated: "Резервну копію створено",
    resetAllData: "Скинути всі дані",
    confirmResetTitle: "Скинути додаток?",
    confirmResetMessage: "Усі рецепти, чернетки та налаштування буде видалено. Дію не можна скасувати.",
    dataResetSuccess: "Дані повністю скинуто",

    // Експорт / імпорт
    exportJson: "Експорт JSON",
    exportPdf: "Експорт PDF",
    importRecipes: "Імпортувати рецепти",
    importSuccess: "Рецепти успішно імпортовано",
    importError: "Помилка імпорту файлу",
    pdfExported: "PDF успішно збережено",
    exportError: "Помилка експорту",

    // Повідомлення
    savedSuccess: "Рецепт збережено",
    saveError: "Не вдалося зберегти рецепт",
    draftCleared: "Чернетку очищено",
    recipeLoaded: "Рецепт завантажено для редагування",
    recipeDeleted: "Рецепт видалено",

    // Помилки та попередження
    error: "Помилка",
    errorSeriesMismatch: "Не можна змішувати фарби різних серій",
    errorEmptyRecipe: "Додайте хоча б одну фарбу",
    errorEmptyName: "Вкажіть назву рецепта",
    sumWarning: "Сума відсотків бажано має бути близькою до 100%",

    // Порожні стани
    noRecipes: "Ще немає збережених рецептів",
    noColorsAdded: "Додайте фарби до рецепта",
    createFirstRecipe: "Створіть свій перший рецепт!",

    // Інше
    about: "Про програму",
    version: "Версія",
    quickNew: "Новий",
    quickSave: "Зберегти",
    quickClear: "Очистити"
  },

  pl: {
    // ... (аналогічна структура для польської мови, скорочено для прикладу)
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowy przepis",
    // і так далі...
  },

  en: {
    paints: "Paints",
    recipes: "Recipes",
    newRecipe: "New recipe",
    settings: "Settings",
    catalog: "Paint catalog",
    recipeName: "Recipe name",
    recipeNamePlaceholder: "Enter recipe name",
    recipeNote: "Note",
    recipeNotePlaceholder: "Additional notes (optional)",
    saveRecipe: "Save recipe",
    clearDraft: "Clear draft",
    status: "Status",
    statusDraft: "Draft",
    statusReady: "Ready",
    // ... і решта перекладів аналогічно
  }
};

export let currentLang = localStorage.getItem("sico_lang") || "ua";

export function t(key) {
  return translations[currentLang]?.[key] || translations.ua?.[key] || key;
}

export function setLang(lang) {
  if (!translations[lang]) return;

  currentLang = lang;
  localStorage.setItem("sico_lang", lang);
  document.documentElement.lang = lang;

  // Оновлюємо весь інтерфейс
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const text = t(key);
    if (text !== key) el.textContent = text;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
  });

  // Оновлюємо динамічні елементи
  if (window.renderAll) window.renderAll();
  if (window.initSeriesFilter) window.initSeriesFilter();

  showToast?.(t("languageChanged"), "success");
}
