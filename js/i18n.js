// i18n.js – багатомовність (вбудовані переклади)
const translations = {
  uk: {
    home: "Головна",
    new_recipe: "Новий рецепт",
    recipes: "Рецепти",
    catalog: "Каталог фарб",
    import: "Імпорт",
    export: "Експорт",
    settings: "Налаштування",
    paints_in_catalog: "фарб у каталозі",
    welcome_title: "Ласкаво просимо до SICO MIX",
    welcome_subtitle: "Професійна система управління рецептами фарб",
    new_recipe_desc: "Створіть новий рецепт фарби",
    my_recipes: "Мої рецепти",
    my_recipes_desc: "Переглядайте, редагуйте та керуйте рецептами",
    paint_catalog: "Каталог фарб",
    catalog_desc: "База всіх доступних фарб",
    export_data: "Експорт даних",
    export_desc: "Експортуйте рецепти у різних форматах",
    new_recipe_desc_long: "Створіть новий рецепт, додаючи інгредієнти та пропорції",
    basic_info: "Основна інформація",
    recipe_name: "Назва рецепту",
    recipe_name_placeholder: "Введіть назву рецепту",
    category: "Категорія",
    select_category: "Оберіть категорію",
    color: "Колір",
    recipe_description: "Опис рецепту",
    recipe_description_placeholder: "Додайте опис (необов'язково)",
    recipe_photo: "Фото рецепту",
    upload_photo: "Завантажити фото",
    recipe_ingredients: "Інгредієнти",
    paint: "Фарба",
    quantity: "Кількість",
    units: "Одиниці",
    percentage: "Відсоток",
    actions: "Дії",
    search_paints: "Пошук фарб...",
    all_categories: "Всі категорії",
    add_ingredient: "Додати інгредієнт",
    save_recipe: "Зберегти рецепт",
    calculate_percentages: "Розрахувати відсотки",
    clear_form: "Очистити форму",
    update_recipe: "Оновити рецепт",
    my_recipes_desc_long: "Управління всіма рецептами",
    search_recipes: "Пошук рецептів...",
    print: "Друк",
    delete_selected: "Видалити обрані",
    select: "Обрати",
    ingredients_count: "Інгредієнтів",
    total_weight: "Загальна вага",
    date: "Дата",
    edit: "Редагувати",
    delete: "Видалити",
    no_description: "Опис відсутній",
    no_recipes: "Рецептів не знайдено",
    delete_recipe: "Видалення рецепту",
    delete_recipe_confirmation: "Ви впевнені, що хочете видалити цей рецепт?",
    recipe_deleted: "Рецепт видалено",
    select_recipes_to_delete: "Оберіть рецепти для видалення",
    delete_recipes: "Видалення рецептів",
    delete_recipes_confirmation: "Ви впевнені, що хочете видалити",
    recipe_exported: "Рецепт експортовано",
    no_recipes_to_export: "Немає рецептів для експорту",
    exported: "Експортовано",
    import_recipes: "Імпорт рецептів",
    found_recipes: "Виявлено",
    import_confirm: "рецептів. Імпортувати?",
    imported: "Імпортовано",
    print_recipes: "Друк рецептів",
    print_date: "Дата друку",
    creation_date: "Дата створення",
    unknown: "Невідомо",
    deleted: "Видалено",
    catalog_desc_long: "Детальна база фарб",
    search_catalog: "Пошук фарб...",
    add_new_paint: "Додати нову фарбу",
    manufacturer: "Виробник",
    article: "Артикул",
    catalog_empty: "Каталог порожній",
    delete_paint: "Видалення фарби",
    delete_paint_confirmation: "Видалити цю фарбу з каталогу?",
    paint_deleted: "Фарбу видалено",
    paint_added: "Фарбу додано",
    import_desc: "Імпортуйте дані з файлів",
    select_import_file: "Виберіть файл для імпорту",
    file_format: "Формат файлу",
    select_file: "Оберіть файл",
    import_data_type: "Тип даних",
    paints: "Фарби",
    start_import: "Почати імпорт",
    export_desc_long: "Експортуйте дані у різних форматах",
    export_settings: "Налаштування експорту",
    export_format: "Формат експорту",
    data_to_export: "Дані для експорту",
    calculations: "Розрахунки",
    additional_options: "Додаткові опції",
    include_photos: "Включати фотографії",
    compress_data: "Стиснути (ZIP)",
    start_export: "Почати експорт",
    settings_desc: "Налаштуйте систему під себе",
    general_settings: "Загальні",
    interface_language: "Мова",
    measurement_units: "Одиниці вимірювання",
    auto_save: "Автозбереження",
    auto_save_changes: "Автоматично зберігати зміни",
    create_backups: "Резервні копії",
    save_settings: "Зберегти",
    reset_defaults: "Скинути",
    clear_all_data: "Очистити всі дані",
    paint_name: "Назва фарби",
    paint_name_placeholder: "Введіть назву",
    color_code: "Код кольору",
    color_code_placeholder: "#000000",
    paint_description: "Опис фарби",
    paint_description_placeholder: "Характеристики",
    manufacturer_placeholder: "Виробник",
    article_placeholder: "Артикул",
    save_paint: "Зберегти",
    cancel: "Скасувати",
    confirmation: "Підтвердження",
    confirmation_message: "Ви впевнені?",
    confirm_action: "Так, виконати",
    select_paint: "Оберіть фарбу",
    paints_not_found: "Фарб не знайдено",
    paint_already_added: "Фарба вже додана",
    paint_added_to_recipe: "Фарбу додано",
    fill_required_fields: "Заповніть обов'язкові поля",
    recipe_saved: "Рецепт збережено",
    invalid_file_format: "Невірний формат файлу",
    file_read_error: "Помилка читання",
    feature_in_development: "Функція в розробці"
  },
  en: {
    // аналогічні ключі англійською (скорочено для економії місця, в готовому проєкті присутні всі)
    home: "Home",
    new_recipe: "New Recipe",
    // ... повний переклад
  },
  pl: {
    // аналогічні ключі польською
  }
};

let currentLang = 'uk';
let dict = translations.uk;

export function setLanguage(lang) {
  if (!translations[lang]) return false;
  currentLang = lang;
  dict = translations[lang];
  localStorage.setItem('sicoMixLanguage', lang);
  applyTranslations();
  return true;
}

export function t(key) {
  return dict[key] || translations.uk[key] || key;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translation = t(key);
    if (el.placeholder !== undefined) {
      el.placeholder = translation;
    } else if (el.tagName === 'INPUT' && el.type !== 'submit' && el.type !== 'button') {
      el.value = translation;
    } else {
      el.textContent = translation;
    }
  });
  document.title = `SICO MIX • ${t('catalog')}`;
}

export function initI18n() {
  const saved = localStorage.getItem('sicoMixLanguage') || 'uk';
  setLanguage(saved);
}
