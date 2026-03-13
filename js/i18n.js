// ========== ІНТЕРНАЦІОНАЛІЗАЦІЯ ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    const translations = {
        uk: {
            // Загальні
            "app_name": "SICO Spectrum",
            "app_subtitle": "Цифрова лабораторія кольору",
            "version": "Версія",
            "loading": "Завантаження...",
            "save": "Зберегти",
            "cancel": "Скасувати",
            "delete": "Видалити",
            "edit": "Редагувати",
            "add": "Додати",
            "search": "Пошук",
            "filter": "Фільтр",
            "all": "Всі",
            "yes": "Так",
            "no": "Ні",
            "confirm": "Підтвердити",
            "close": "Закрити",
            "back": "Назад",
            "next": "Далі",
            "finish": "Завершити",
            "continue": "Продовжити",
            "retry": "Повторити",
            "error": "Помилка",
            "warning": "Попередження",
            "info": "Інформація",
            "success": "Успішно",
            "not_found": "Не знайдено",
            "no_data": "Немає даних",
            "required_field": "Обов'язкове поле",
            "optional": "Необов'язково",
            "actions": "Дії",
            "properties": "Властивості",
            "details": "Деталі",
            "settings": "Налаштування",
            "language": "Мова",
            "theme": "Тема",
            "dark_mode": "Темний режим",
            "light_mode": "Світлий режим",
            "auto": "Авто",
            "notifications": "Сповіщення",
            "sound": "Звук",
            "vibration": "Вібрація",
            "privacy_policy": "Політика конфіденційності",
            "terms_of_use": "Умови використання",
            "contact_us": "Зв'язатися з нами",
            "about": "Про програму",
            "help": "Допомога",
            "feedback": "Зворотній зв'язок",
            "rate_app": "Оцінити програму",
            "share_app": "Поділитися програмою",

            // Меню
            "main_menu": "Головне меню",
            "home": "Головна",
            "new_recipe": "Новий рецепт",
            "recipes": "Рецепти",
            "catalog": "Каталог фарб",
            "pantone": "Pantone",
            "ral": "RAL",
            "import_export": "Імпорт/Експорт",
            "import": "Імпорт",
            "export": "Експорт",
            "settings": "Налаштування",
            "login": "Увійти",
            "logout": "Вийти",
            "signup": "Зареєструватися",
            "profile": "Профіль",
            "sync": "Синхронізація",
            "backup": "Резервне копіювання",
            "restore": "Відновлення",

            // Головна сторінка
            "welcome_title": "Ласкаво просимо до SICO Spectrum",
            "welcome_subtitle": "Цифрова лабораторія кольору",
            "quick_actions": "Швидкі дії",
            "recent_recipes": "Останні рецепти",
            "popular_paints": "Популярні фарби",
            "statistics": "Статистика",
            "total_recipes": "Всього рецептів",
            "total_paints": "Всього фарб",
            "total_calculations": "Всього розрахунків",
            "last_sync": "Остання синхронізація",
            "new_recipe_desc": "Створіть новий рецепт фарби",
            "my_recipes_desc": "Переглядайте та керуйте рецептами",
            "paint_catalog_desc": "База всіх доступних фарб",
            "pantone_desc": "Кольори Pantone з каталогів Formula Guide",
            "ral_desc": "Кольори RAL Classic",
            "export_desc": "Експортуйте рецепти у різних форматах",
            "catalog_desc": "Каталог SICO Polska",
            "export_data": "Експорт",

            // Новий рецепт
            "new_recipe_desc_long": "Створіть новий рецепт фарби, додаючи інгредієнти",
            "basic_info": "Основна інформація",
            "recipe_name": "Назва рецепту",
            "recipe_name_placeholder": "Введіть назву рецепту",
            "category": "Категорія",
            "select_category": "Оберіть категорію",
            "series": "Серія фарб",
            "select_series": "Оберіть серію",
            "recipe_description": "Опис рецепту",
            "recipe_description_placeholder": "Введіть опис рецепту",
            "recipe_photo": "Фото готового кольору",
            "upload_photo": "Завантажити фото кольору",
            "photo_uploaded": "Фото завантажено",
            "change_photo": "Змінити фото",
            "remove_photo": "Видалити фото",
            "recipe_ingredients": "Інгредієнти рецепту",
            "add_ingredient": "Додати інгредієнт",
            "paint": "Фарба",
            "quantity": "Кількість",
            "units": "Одиниці",
            "percentage": "Відсоток",
            "grams": "Грами (г)",
            "ml": "Мілілітри (мл)",
            "percent": "Відсотки (%)",
            "select_paint": "Оберіть фарбу",
            "paint_already_added": "Ця фарба вже додана до рецепту",
            "paint_added_to_recipe": "Фарбу додано до рецепту",
            "paint_removed_from_recipe": "Фарбу видалено з рецепту",
            "fill_required_fields": "Заповніть всі обов'язкові поля",
            "save_recipe": "Зберегти рецепт",
            "update_recipe": "Оновити рецепт",
            "clear_form": "Очистити форму",
            "recipe_saved": "Рецепт збережено: ",
            "select_series_first": "Спочатку оберіть серію фарб",
            "paints_not_found_in_series": "Не знайдено фарб у цій серії",
            "series_mismatch": "Не можна додавати фарби з різних серій",
            "category_mismatch": "Не можна додавати фарби з різних категорій",
            "scan_recipe": "Сканувати рецепт з фото",
            "scanning_recipe": "Сканування рецепту...",
            "scan_success": "Знайдено {{count}} інгредієнтів",
            "scan_no_paints": "Не вдалося розпізнати жодної фарби",
            "scan_error": "Помилка сканування",
            "search_paints": "Пошук фарб...",

            // Рецепти
            "my_recipes": "Мої рецепти",
            "my_recipes_desc_long": "Переглядайте, редагуйте та керуйте рецептами",
            "search_recipes": "Пошук рецептів...",
            "all_categories": "Всі категорії",
            "no_recipes": "У вас ще немає рецептів",
            "select": "Обрати",
            "ingredients_count": "Інгредієнтів",
            "total_weight": "Загальна вага",
            "date": "Дата",
            "no_description": "Опис відсутній",
            "delete_recipe": "Видалити рецепт",
            "delete_recipe_confirmation": "Ви впевнені, що хочете видалити цей рецепт?",
            "recipe_deleted": "Рецепт видалено",
            "delete_selected": "Видалити обрані",
            "select_recipes_to_delete": "Виберіть рецепти для видалення",
            "delete_recipes": "Видалити рецепти",
            "delete_recipes_confirmation": "Ви впевнені, що хочете видалити",
            "deleted": "Видалено",
            "recipe_exported": "Рецепт експортовано",
            "exported": "Експортовано",
            "print": "Друк",
            "print_label": "Етикетка",
            "select_recipes_to_print": "Виберіть рецепти для друку",
            "print_recipes": "Друк рецептів",
            "import_recipes": "Імпорт рецептів",
            "found_recipes": "Знайдено рецептів:",
            "import_confirm": "Імпортувати?",
            "imported": "Імпортовано",
            "no_recipes_to_export": "Немає рецептів для експорту",

            // Каталог фарб
            "paint_catalog": "Каталог фарб",
            "catalog_desc_long": "База всіх доступних фарб",
            "search_catalog": "Пошук у каталозі...",
            "add_new_paint": "Додати нову фарбу",
            "catalog_empty": "Каталог порожній",
            "load_more": "Завантажити ще",
            "catalog_render_error": "Помилка відображення каталогу",
            "expand": "Розгорнути",
            "collapse": "Згорнути",
            "series_description": "Опис серії",
            "paints_in_catalog": "фарб у каталозі",
            "search_results": "Результати пошуку",
            "paints_found": "Знайдено фарб",

            // Додавання/редагування фарби
            "add_new_paint_title": "Додати нову фарбу",
            "edit_paint": "Редагувати фарбу",
            "paint_name": "Назва фарби",
            "paint_name_placeholder": "Введіть назву фарби",
            "color_code": "Код кольору",
            "color_code_placeholder": "#000000",
            "paint_description": "Опис фарби",
            "paint_description_placeholder": "Введіть опис фарби",
            "manufacturer": "Виробник",
            "manufacturer_placeholder": "Назва виробника",
            "article": "Артикул",
            "article_placeholder": "Введіть артикул",
            "save_paint": "Зберегти фарбу",
            "paint_added": "Фарбу додано: ",
            "paint_updated": "Фарбу оновлено: ",
            "paint_deleted": "Фарбу видалено",
            "cannot_delete_default_paint": "Не можна видалити стандартну фарбу",
            "paint_in_use_title": "Фарба використовується",
            "paint_in_use_message": "Ця фарба використовується в {{count}} рецептах. Видалити її з рецептів?",

            // Pantone
            "pantone_desc": "Кольори Pantone з каталогів Formula Guide",
            "search_pantone": "Пошук Pantone...",
            "coated": "Глянцеві (Coated)",
            "uncoated": "Матові (Uncoated)",
            "plus_series": "Plus Series",
            "special_editions": "Спеціальні видання",
            "no_pantone": "Pantone не знайдено",
            "pantone_recipe": "Рецепт Pantone",
            "ingredient": "Інгредієнт",
            "amount": "Кількість",
            "no_recipe_data": "Немає даних про інгредієнти",
            "add_pantone_to_recipe": "Додати Pantone до рецепту",

            // RAL
            "ral_desc": "Кольори RAL Classic",
            "search_ral": "Пошук RAL...",
            "no_ral": "RAL не знайдено",
            "add_ral_to_recipe": "Додати RAL до рецепту",

            // PDF кнопки
            "open_ral_pdf": "Відкрити віяло RAL",
            "open_pantone_pdf": "Відкрити віяло Pantone",

            // Імпорт/Експорт
            "import_desc": "Імпортуйте рецепти та каталог з файлів",
            "export_desc_long": "Експортуйте ваші дані у різних форматах",
            "select_import_file": "Виберіть файл для імпорту",
            "file_format": "Формат файлу",
            "select_file": "Оберіть файл",
            "import_data_type": "Тип даних для імпорту",
            "paints": "Фарби з каталогу",
            "start_import": "Почати імпорт",
            "export_settings": "Налаштування експорту",
            "export_format": "Формат експорту",
            "data_to_export": "Дані для експорту",
            "calculations": "Розрахунки",
            "additional_options": "Додаткові опції",
            "include_photos": "Включати фотографії",
            "compress_data": "Стиснути дані (ZIP)",
            "start_export": "Почати експорт",
            "select_data_to_export": "Виберіть дані для експорту",
            "invalid_file_format": "Невірний формат файлу",
            "select_data_to_import": "Виберіть тип даних для імпорту",
            "and": "та",
            "export_error": "Помилка експорту",

            // Налаштування
            "settings_desc": "Налаштуйте систему за вашими потребами",
            "general_settings": "Загальні налаштування",
            "interface_language": "Мова інтерфейсу",
            "ukrainian": "Українська",
            "english": "Англійська",
            "polish": "Польська",
            "measurement_units": "Одиниці вимірювання",
            "theme": "Тема оформлення",
            "theme_spectrum": "Спектр (темна)",
            "theme_organic": "Органічна (світла)",
            "catalog_layout": "Компонування каталогу",
            "layout_classic": "Класичне",
            "layout_compact": "Компактне",
            "layout_list": "Списком",
            "auto_save_changes": "Автоматично зберігати зміни",
            "create_backups": "Створювати резервні копії",
            "export_backup": "Експортувати бекап",
            "backup_created": "Резервну копію створено",
            "backup_exported": "Бекап експортовано",
            "save_settings": "Зберегти налаштування",
            "reset_defaults": "Скинути до стандартних",
            "clear_all_data": "Очистити всі дані",
            "clear_all_data_confirmation": "Ви впевнені? Всі рецепти та додані фарби будуть видалені!",
            "data_cleared": "Всі дані очищено",

            // Модальні вікна
            "confirmation": "Підтвердження",
            "confirmation_message": "Ви впевнені?",
            "confirm_action": "Так",
            "unsaved_changes_warning": "У вас є незбережені зміни. Ви дійсно хочете піти?",
            "recipe_exists_title": "Рецепт вже існує",
            "recipe_exists_message": "Рецепт з такою назвою вже існує. Замінити його?",

            // Синхронізація
            "syncing": "Синхронізація...",
            "sync_complete": "Синхронізацію завершено",
            "sync_error": "Помилка синхронізації",
            "sync_offline": "Немає з'єднання з інтернетом",
            "sync_in_progress": "Синхронізація...",

            // Авторизація
            "email": "Email",
            "password": "Пароль",
            "or": "або",
            "signin_google": "Увійти через Google",
            "auth_note": "Дані синхронізуються між пристроями",
            "logout_confirmation": "Ви дійсно хочете вийти?",
            "logged_out": "Ви вийшли з системи",

            // Помилки та повідомлення
            "paints_not_found": "Фарби не знайдено",
            "unknown_error": "Невідома помилка",
            "network_error": "Помилка мережі",
            "timeout_error": "Час очікування вичерпано",
            "permission_denied": "Доступ заборонено",
            "not_found_error": "Ресурс не знайдено",
            "validation_error": "Помилка валідації",
            "server_error": "Помилка сервера",
            "try_again": "Спробуйте ще раз пізніше",
            "operation_successful": "Операцію виконано успішно",
            "operation_failed": "Операцію не виконано",

            // Одиниці вимірювання
            "unit_g": "г",
            "unit_kg": "кг",
            "unit_ml": "мл",
            "unit_l": "л",
            "unit_percent": "%",

            // Стандартні категорії (ключі)
            "cat_standard": "Стандартні",
            "cat_metallic": "Металік",
            "cat_matte": "Матові",
            "cat_glossy": "Глянцеві",
            "cat_pearl": "Перламутрові",
            "cat_fluorescent": "Флуоресцентні",
            "cat_thermochromic": "Термохромні",
            "cat_photochromic": "Фотохромні",
            "cat_special": "Спеціальні",

            // Місяці
            "january": "Січень",
            "february": "Лютий",
            "march": "Березень",
            "april": "Квітень",
            "may": "Травень",
            "june": "Червень",
            "july": "Липень",
            "august": "Серпень",
            "september": "Вересень",
            "october": "Жовтень",
            "november": "Листопад",
            "december": "Грудень",

            // Дні тижня
            "monday": "Понеділок",
            "tuesday": "Вівторок",
            "wednesday": "Середа",
            "thursday": "Четвер",
            "friday": "П'ятниця",
            "saturday": "Субота",
            "sunday": "Неділя",

            // Скорочені дні тижня
            "mon": "Пн",
            "tue": "Вт",
            "wed": "Ср",
            "thu": "Чт",
            "fri": "Пт",
            "sat": "Сб",
            "sun": "Нд",

            // Користувацькі категорії (для перекладу)
            "cat_universal": "Універсальні",
            "cat_paper_cardboard": "Папір/картон",
            "cat_plastics": "Пластики",
            "cat_textiles": "Текстиль",
            "cat_uv": "UV фарби",
            "cat_uv_led": "UV фарби (LED)",

            // Друк етикетки
            "enter_weight_kg": "Введіть вагу (кг):"
        },

        en: {
            // General
            "app_name": "SICO Spectrum",
            "app_subtitle": "Digital Color Laboratory",
            "version": "Version",
            "loading": "Loading...",
            "save": "Save",
            "cancel": "Cancel",
            "delete": "Delete",
            "edit": "Edit",
            "add": "Add",
            "search": "Search",
            "filter": "Filter",
            "all": "All",
            "yes": "Yes",
            "no": "No",
            "confirm": "Confirm",
            "close": "Close",
            "back": "Back",
            "next": "Next",
            "finish": "Finish",
            "continue": "Continue",
            "retry": "Retry",
            "error": "Error",
            "warning": "Warning",
            "info": "Info",
            "success": "Success",
            "not_found": "Not found",
            "no_data": "No data",
            "required_field": "Required field",
            "optional": "Optional",
            "actions": "Actions",
            "properties": "Properties",
            "details": "Details",
            "settings": "Settings",
            "language": "Language",
            "theme": "Theme",
            "dark_mode": "Dark mode",
            "light_mode": "Light mode",
            "auto": "Auto",
            "notifications": "Notifications",
            "sound": "Sound",
            "vibration": "Vibration",
            "privacy_policy": "Privacy policy",
            "terms_of_use": "Terms of use",
            "contact_us": "Contact us",
            "about": "About",
            "help": "Help",
            "feedback": "Feedback",
            "rate_app": "Rate app",
            "share_app": "Share app",

            // Menu
            "main_menu": "Main menu",
            "home": "Home",
            "new_recipe": "New recipe",
            "recipes": "Recipes",
            "catalog": "Paint catalog",
            "pantone": "Pantone",
            "ral": "RAL",
            "import_export": "Import/Export",
            "import": "Import",
            "export": "Export",
            "settings": "Settings",
            "login": "Login",
            "logout": "Logout",
            "signup": "Sign up",
            "profile": "Profile",
            "sync": "Sync",
            "backup": "Backup",
            "restore": "Restore",

            // Home page
            "welcome_title": "Welcome to SICO Spectrum",
            "welcome_subtitle": "Digital Color Laboratory",
            "quick_actions": "Quick actions",
            "recent_recipes": "Recent recipes",
            "popular_paints": "Popular paints",
            "statistics": "Statistics",
            "total_recipes": "Total recipes",
            "total_paints": "Total paints",
            "total_calculations": "Total calculations",
            "last_sync": "Last sync",
            "new_recipe_desc": "Create a new paint recipe",
            "my_recipes_desc": "View and manage recipes",
            "paint_catalog_desc": "Database of all available paints",
            "pantone_desc": "Pantone colors from Formula Guide catalogs",
            "ral_desc": "RAL Classic colors",
            "export_desc": "Export recipes in various formats",
            "catalog_desc": "SICO Polska Catalog",
            "export_data": "Export",

            // New recipe
            "new_recipe_desc_long": "Create a new paint recipe by adding ingredients",
            "basic_info": "Basic information",
            "recipe_name": "Recipe name",
            "recipe_name_placeholder": "Enter recipe name",
            "category": "Category",
            "select_category": "Select category",
            "series": "Paint series",
            "select_series": "Select series",
            "recipe_description": "Recipe description",
            "recipe_description_placeholder": "Enter recipe description",
            "recipe_photo": "Finished color photo",
            "upload_photo": "Upload color photo",
            "photo_uploaded": "Photo uploaded",
            "change_photo": "Change photo",
            "remove_photo": "Remove photo",
            "recipe_ingredients": "Recipe ingredients",
            "add_ingredient": "Add ingredient",
            "paint": "Paint",
            "quantity": "Quantity",
            "units": "Units",
            "percentage": "Percentage",
            "grams": "Grams (g)",
            "ml": "Milliliters (ml)",
            "percent": "Percent (%)",
            "select_paint": "Select paint",
            "paint_already_added": "This paint is already added to the recipe",
            "paint_added_to_recipe": "Paint added to recipe",
            "paint_removed_from_recipe": "Paint removed from recipe",
            "fill_required_fields": "Fill all required fields",
            "save_recipe": "Save recipe",
            "update_recipe": "Update recipe",
            "clear_form": "Clear form",
            "recipe_saved": "Recipe saved: ",
            "select_series_first": "Select paint series first",
            "paints_not_found_in_series": "No paints found in this series",
            "series_mismatch": "Cannot add paints from different series",
            "category_mismatch": "Cannot add paints from different categories",
            "scan_recipe": "Scan recipe from photo",
            "scanning_recipe": "Scanning recipe...",
            "scan_success": "Found {{count}} ingredients",
            "scan_no_paints": "No paints recognized",
            "scan_error": "Scan error",
            "search_paints": "Search paints...",

            // Recipes
            "my_recipes": "My recipes",
            "my_recipes_desc_long": "View, edit and manage recipes",
            "search_recipes": "Search recipes...",
            "all_categories": "All categories",
            "no_recipes": "You have no recipes yet",
            "select": "Select",
            "ingredients_count": "Ingredients",
            "total_weight": "Total weight",
            "date": "Date",
            "no_description": "No description",
            "delete_recipe": "Delete recipe",
            "delete_recipe_confirmation": "Are you sure you want to delete this recipe?",
            "recipe_deleted": "Recipe deleted",
            "delete_selected": "Delete selected",
            "select_recipes_to_delete": "Select recipes to delete",
            "delete_recipes": "Delete recipes",
            "delete_recipes_confirmation": "Are you sure you want to delete",
            "deleted": "Deleted",
            "recipe_exported": "Recipe exported",
            "exported": "Exported",
            "print": "Print",
            "print_label": "Label",
            "select_recipes_to_print": "Select recipes to print",
            "print_recipes": "Print recipes",
            "import_recipes": "Import recipes",
            "found_recipes": "Recipes found:",
            "import_confirm": "Import?",
            "imported": "Imported",
            "no_recipes_to_export": "No recipes to export",

            // Paint catalog
            "paint_catalog": "Paint catalog",
            "catalog_desc_long": "Database of all available paints",
            "search_catalog": "Search catalog...",
            "add_new_paint": "Add new paint",
            "catalog_empty": "Catalog is empty",
            "load_more": "Load more",
            "catalog_render_error": "Catalog render error",
            "expand": "Expand",
            "collapse": "Collapse",
            "series_description": "Series description",
            "paints_in_catalog": "paints in catalog",
            "search_results": "Search results",
            "paints_found": "Paints found",

            // Add/edit paint
            "add_new_paint_title": "Add new paint",
            "edit_paint": "Edit paint",
            "paint_name": "Paint name",
            "paint_name_placeholder": "Enter paint name",
            "color_code": "Color code",
            "color_code_placeholder": "#000000",
            "paint_description": "Paint description",
            "paint_description_placeholder": "Enter paint description",
            "manufacturer": "Manufacturer",
            "manufacturer_placeholder": "Manufacturer name",
            "article": "Article",
            "article_placeholder": "Enter article",
            "save_paint": "Save paint",
            "paint_added": "Paint added: ",
            "paint_updated": "Paint updated: ",
            "paint_deleted": "Paint deleted",
            "cannot_delete_default_paint": "Cannot delete default paint",
            "paint_in_use_title": "Paint in use",
            "paint_in_use_message": "This paint is used in {{count}} recipes. Remove it from recipes?",

            // Pantone
            "pantone_desc": "Pantone colors from Formula Guide catalogs",
            "search_pantone": "Search Pantone...",
            "coated": "Coated",
            "uncoated": "Uncoated",
            "plus_series": "Plus Series",
            "special_editions": "Special editions",
            "no_pantone": "No Pantone found",
            "pantone_recipe": "Pantone recipe",
            "ingredient": "Ingredient",
            "amount": "Amount",
            "no_recipe_data": "No ingredient data",
            "add_pantone_to_recipe": "Add Pantone to recipe",

            // RAL
            "ral_desc": "RAL Classic colors",
            "search_ral": "Search RAL...",
            "no_ral": "No RAL found",
            "add_ral_to_recipe": "Add RAL to recipe",

            // PDF buttons
            "open_ral_pdf": "Open RAL fan deck",
            "open_pantone_pdf": "Open Pantone fan deck",

            // Import/Export
            "import_desc": "Import recipes and catalog from files",
            "export_desc_long": "Export your data in various formats",
            "select_import_file": "Select file for import",
            "file_format": "File format",
            "select_file": "Select file",
            "import_data_type": "Data type for import",
            "paints": "Catalog paints",
            "start_import": "Start import",
            "export_settings": "Export settings",
            "export_format": "Export format",
            "data_to_export": "Data to export",
            "calculations": "Calculations",
            "additional_options": "Additional options",
            "include_photos": "Include photos",
            "compress_data": "Compress data (ZIP)",
            "start_export": "Start export",
            "select_data_to_export": "Select data to export",
            "invalid_file_format": "Invalid file format",
            "select_data_to_import": "Select data type to import",
            "and": "and",
            "export_error": "Export error",

            // Settings
            "settings_desc": "Configure the system according to your needs",
            "general_settings": "General settings",
            "interface_language": "Interface language",
            "ukrainian": "Ukrainian",
            "english": "English",
            "polish": "Polish",
            "measurement_units": "Measurement units",
            "theme": "Theme",
            "theme_spectrum": "Spectrum (dark)",
            "theme_organic": "Organic (light)",
            "catalog_layout": "Catalog layout",
            "layout_classic": "Classic",
            "layout_compact": "Compact",
            "layout_list": "List",
            "auto_save_changes": "Auto-save changes",
            "create_backups": "Create backups",
            "export_backup": "Export backup",
            "backup_created": "Backup created",
            "backup_exported": "Backup exported",
            "save_settings": "Save settings",
            "reset_defaults": "Reset to defaults",
            "clear_all_data": "Clear all data",
            "clear_all_data_confirmation": "Are you sure? All recipes and added paints will be deleted!",
            "data_cleared": "All data cleared",

            // Modals
            "confirmation": "Confirmation",
            "confirmation_message": "Are you sure?",
            "confirm_action": "Yes",
            "unsaved_changes_warning": "You have unsaved changes. Are you sure you want to leave?",
            "recipe_exists_title": "Recipe already exists",
            "recipe_exists_message": "A recipe with this name already exists. Replace it?",

            // Sync
            "syncing": "Syncing...",
            "sync_complete": "Sync complete",
            "sync_error": "Sync error",
            "sync_offline": "No internet connection",
            "sync_in_progress": "Syncing...",

            // Auth
            "email": "Email",
            "password": "Password",
            "or": "or",
            "signin_google": "Sign in with Google",
            "auth_note": "Data is synced between devices",
            "logout_confirmation": "Are you sure you want to logout?",
            "logged_out": "You have been logged out",

            // Errors and messages
            "paints_not_found": "Paints not found",
            "unknown_error": "Unknown error",
            "network_error": "Network error",
            "timeout_error": "Timeout error",
            "permission_denied": "Permission denied",
            "not_found_error": "Resource not found",
            "validation_error": "Validation error",
            "server_error": "Server error",
            "try_again": "Try again later",
            "operation_successful": "Operation successful",
            "operation_failed": "Operation failed",

            // Units
            "unit_g": "g",
            "unit_kg": "kg",
            "unit_ml": "ml",
            "unit_l": "l",
            "unit_percent": "%",

            // Standard categories (keys)
            "cat_standard": "Standard",
            "cat_metallic": "Metallic",
            "cat_matte": "Matte",
            "cat_glossy": "Glossy",
            "cat_pearl": "Pearl",
            "cat_fluorescent": "Fluorescent",
            "cat_thermochromic": "Thermochromic",
            "cat_photochromic": "Photochromic",
            "cat_special": "Special",

            // Months
            "january": "January",
            "february": "February",
            "march": "March",
            "april": "April",
            "may": "May",
            "june": "June",
            "july": "July",
            "august": "August",
            "september": "September",
            "october": "October",
            "november": "November",
            "december": "December",

            // Days
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "sunday": "Sunday",

            // Short days
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat",
            "sun": "Sun",

            // Custom categories (for translation)
            "cat_universal": "Universal",
            "cat_paper_cardboard": "Paper/Cardboard",
            "cat_plastics": "Plastics",
            "cat_textiles": "Textiles",
            "cat_uv": "UV paints",
            "cat_uv_led": "UV paints (LED)",

            // Label printing
            "enter_weight_kg": "Enter weight (kg):"
        },

        pl: {
            // Ogólne
            "app_name": "SICO Spectrum",
            "app_subtitle": "Cyfrowe laboratorium kolorów",
            "version": "Wersja",
            "loading": "Ładowanie...",
            "save": "Zapisz",
            "cancel": "Anuluj",
            "delete": "Usuń",
            "edit": "Edytuj",
            "add": "Dodaj",
            "search": "Szukaj",
            "filter": "Filtruj",
            "all": "Wszystkie",
            "yes": "Tak",
            "no": "Nie",
            "confirm": "Potwierdź",
            "close": "Zamknij",
            "back": "Wstecz",
            "next": "Dalej",
            "finish": "Zakończ",
            "continue": "Kontynuuj",
            "retry": "Ponów",
            "error": "Błąd",
            "warning": "Ostrzeżenie",
            "info": "Informacja",
            "success": "Sukces",
            "not_found": "Nie znaleziono",
            "no_data": "Brak danych",
            "required_field": "Pole wymagane",
            "optional": "Opcjonalne",
            "actions": "Akcje",
            "properties": "Właściwości",
            "details": "Szczegóły",
            "settings": "Ustawienia",
            "language": "Język",
            "theme": "Motyw",
            "dark_mode": "Tryb ciemny",
            "light_mode": "Tryb jasny",
            "auto": "Auto",
            "notifications": "Powiadomienia",
            "sound": "Dźwięk",
            "vibration": "Wibracje",
            "privacy_policy": "Polityka prywatności",
            "terms_of_use": "Warunki użytkowania",
            "contact_us": "Kontakt",
            "about": "O aplikacji",
            "help": "Pomoc",
            "feedback": "Opinia",
            "rate_app": "Oceń aplikację",
            "share_app": "Udostępnij aplikację",

            // Menu
            "main_menu": "Menu główne",
            "home": "Strona główna",
            "new_recipe": "Nowa receptura",
            "recipes": "Receptury",
            "catalog": "Katalog farb",
            "pantone": "Pantone",
            "ral": "RAL",
            "import_export": "Import/Eksport",
            "import": "Import",
            "export": "Eksport",
            "settings": "Ustawienia",
            "login": "Zaloguj",
            "logout": "Wyloguj",
            "signup": "Zarejestruj",
            "profile": "Profil",
            "sync": "Synchronizacja",
            "backup": "Kopia zapasowa",
            "restore": "Przywróć",

            // Strona główna
            "welcome_title": "Witaj w SICO Spectrum",
            "welcome_subtitle": "Cyfrowe laboratorium kolorów",
            "quick_actions": "Szybkie akcje",
            "recent_recipes": "Ostatnie receptury",
            "popular_paints": "Popularne farby",
            "statistics": "Statystyki",
            "total_recipes": "Razem receptur",
            "total_paints": "Razem farb",
            "total_calculations": "Razem obliczeń",
            "last_sync": "Ostatnia synchronizacja",
            "new_recipe_desc": "Stwórz nową recepturę farby",
            "my_recipes_desc": "Przeglądaj i zarządzaj recepturami",
            "paint_catalog_desc": "Baza wszystkich dostępnych farb",
            "pantone_desc": "Kolory Pantone z katalogów Formula Guide",
            "ral_desc": "Kolory RAL Classic",
            "export_desc": "Eksportuj receptury w różnych formatach",
            "catalog_desc": "Katalog SICO Polska",
            "export_data": "Eksport",

            // Nowa receptura
            "new_recipe_desc_long": "Stwórz nową recepturę farby, dodając składniki",
            "basic_info": "Podstawowe informacje",
            "recipe_name": "Nazwa receptury",
            "recipe_name_placeholder": "Wprowadź nazwę receptury",
            "category": "Kategoria",
            "select_category": "Wybierz kategorię",
            "series": "Seria farb",
            "select_series": "Wybierz serię",
            "recipe_description": "Opis receptury",
            "recipe_description_placeholder": "Wprowadź opis receptury",
            "recipe_photo": "Zdjęcie gotowego koloru",
            "upload_photo": "Prześlij zdjęcie koloru",
            "photo_uploaded": "Zdjęcie przesłane",
            "change_photo": "Zmień zdjęcie",
            "remove_photo": "Usuń zdjęcie",
            "recipe_ingredients": "Składniki receptury",
            "add_ingredient": "Dodaj składnik",
            "paint": "Farba",
            "quantity": "Ilość",
            "units": "Jednostki",
            "percentage": "Procent",
            "grams": "Gramy (g)",
            "ml": "Mililitry (ml)",
            "percent": "Procent (%)",
            "select_paint": "Wybierz farbę",
            "paint_already_added": "Ta farba została już dodana do receptury",
            "paint_added_to_recipe": "Farbę dodano do receptury",
            "paint_removed_from_recipe": "Farbę usunięto z receptury",
            "fill_required_fields": "Wypełnij wszystkie wymagane pola",
            "save_recipe": "Zapisz recepturę",
            "update_recipe": "Aktualizuj recepturę",
            "clear_form": "Wyczyść formularz",
            "recipe_saved": "Receptura zapisana: ",
            "select_series_first": "Najpierw wybierz serię farb",
            "paints_not_found_in_series": "Nie znaleziono farb w tej serii",
            "series_mismatch": "Nie można dodawać farb z różnych serii",
            "category_mismatch": "Nie można dodawać farb z różnych kategorii",
            "scan_recipe": "Skanuj recepturę ze zdjęcia",
            "scanning_recipe": "Skanowanie receptury...",
            "scan_success": "Znaleziono {{count}} składników",
            "scan_no_paints": "Nie rozpoznano żadnej farby",
            "scan_error": "Błąd skanowania",
            "search_paints": "Szukaj farb...",

            // Receptury
            "my_recipes": "Moje receptury",
            "my_recipes_desc_long": "Przeglądaj, edytuj i zarządzaj recepturami",
            "search_recipes": "Szukaj receptur...",
            "all_categories": "Wszystkie kategorie",
            "no_recipes": "Nie masz jeszcze receptur",
            "select": "Wybierz",
            "ingredients_count": "Składników",
            "total_weight": "Waga całkowita",
            "date": "Data",
            "no_description": "Brak opisu",
            "delete_recipe": "Usuń recepturę",
            "delete_recipe_confirmation": "Czy na pewno chcesz usunąć tę recepturę?",
            "recipe_deleted": "Receptura usunięta",
            "delete_selected": "Usuń wybrane",
            "select_recipes_to_delete": "Wybierz receptury do usunięcia",
            "delete_recipes": "Usuń receptury",
            "delete_recipes_confirmation": "Czy na pewno chcesz usunąć",
            "deleted": "Usunięto",
            "recipe_exported": "Receptura wyeksportowana",
            "exported": "Wyeksportowano",
            "print": "Drukuj",
            "print_label": "Etykieta",
            "select_recipes_to_print": "Wybierz receptury do wydruku",
            "print_recipes": "Drukuj receptury",
            "import_recipes": "Importuj receptury",
            "found_recipes": "Znaleziono receptur:",
            "import_confirm": "Importować?",
            "imported": "Zaimportowano",
            "no_recipes_to_export": "Brak receptur do eksportu",

            // Katalog farb
            "paint_catalog": "Katalog farb",
            "catalog_desc_long": "Baza wszystkich dostępnych farb",
            "search_catalog": "Szukaj w katalogu...",
            "add_new_paint": "Dodaj nową farbę",
            "catalog_empty": "Katalog jest pusty",
            "load_more": "Załaduj więcej",
            "catalog_render_error": "Błąd renderowania katalogu",
            "expand": "Rozwiń",
            "collapse": "Zwiń",
            "series_description": "Opis serii",
            "paints_in_catalog": "farb w katalogu",
            "search_results": "Wyniki wyszukiwania",
            "paints_found": "Znaleziono farb",

            // Dodawanie/edycja farby
            "add_new_paint_title": "Dodaj nową farbę",
            "edit_paint": "Edytuj farbę",
            "paint_name": "Nazwa farby",
            "paint_name_placeholder": "Wprowadź nazwę farby",
            "color_code": "Kod koloru",
            "color_code_placeholder": "#000000",
            "paint_description": "Opis farby",
            "paint_description_placeholder": "Wprowadź opis farby",
            "manufacturer": "Producent",
            "manufacturer_placeholder": "Nazwa producenta",
            "article": "Artykuł",
            "article_placeholder": "Wprowadź artykuł",
            "save_paint": "Zapisz farbę",
            "paint_added": "Farbę dodano: ",
            "paint_updated": "Farbę zaktualizowano: ",
            "paint_deleted": "Farbę usunięto",
            "cannot_delete_default_paint": "Nie można usunąć domyślnej farby",
            "paint_in_use_title": "Farba jest używana",
            "paint_in_use_message": "Ta farba jest używana w {{count}} recepturach. Usunąć ją z receptur?",

            // Pantone
            "pantone_desc": "Kolory Pantone z katalogów Formula Guide",
            "search_pantone": "Szukaj Pantone...",
            "coated": "Błyszczące (Coated)",
            "uncoated": "Matowe (Uncoated)",
            "plus_series": "Plus Series",
            "special_editions": "Edycje specjalne",
            "no_pantone": "Nie znaleziono Pantone",
            "pantone_recipe": "Receptura Pantone",
            "ingredient": "Składnik",
            "amount": "Ilość",
            "no_recipe_data": "Brak danych o składnikach",
            "add_pantone_to_recipe": "Dodaj Pantone do receptury",

            // RAL
            "ral_desc": "Kolory RAL Classic",
            "search_ral": "Szukaj RAL...",
            "no_ral": "Nie znaleziono RAL",
            "add_ral_to_recipe": "Dodaj RAL do receptury",

            // Przyciski PDF
            "open_ral_pdf": "Otwórz wachlarz RAL",
            "open_pantone_pdf": "Otwórz wachlarz Pantone",

            // Import/Eksport
            "import_desc": "Importuj receptury i katalog z plików",
            "export_desc_long": "Eksportuj swoje dane w różnych formatach",
            "select_import_file": "Wybierz plik do importu",
            "file_format": "Format pliku",
            "select_file": "Wybierz plik",
            "import_data_type": "Typ danych do importu",
            "paints": "Farby z katalogu",
            "start_import": "Rozpocznij import",
            "export_settings": "Ustawienia eksportu",
            "export_format": "Format eksportu",
            "data_to_export": "Dane do eksportu",
            "calculations": "Obliczenia",
            "additional_options": "Opcje dodatkowe",
            "include_photos": "Dołącz zdjęcia",
            "compress_data": "Kompresuj dane (ZIP)",
            "start_export": "Rozpocznij eksport",
            "select_data_to_export": "Wybierz dane do eksportu",
            "invalid_file_format": "Nieprawidłowy format pliku",
            "select_data_to_import": "Wybierz typ danych do importu",
            "and": "i",
            "export_error": "Błąd eksportu",

            // Ustawienia
            "settings_desc": "Skonfiguruj system według swoich potrzeb",
            "general_settings": "Ustawienia ogólne",
            "interface_language": "Język interfejsu",
            "ukrainian": "Ukraiński",
            "english": "Angielski",
            "polish": "Polski",
            "measurement_units": "Jednostki miary",
            "theme": "Motyw",
            "theme_spectrum": "Spektrum (ciemny)",
            "theme_organic": "Organiczny (jasny)",
            "catalog_layout": "Układ katalogu",
            "layout_classic": "Klasyczny",
            "layout_compact": "Kompaktowy",
            "layout_list": "Lista",
            "auto_save_changes": "Automatycznie zapisuj zmiany",
            "create_backups": "Twórz kopie zapasowe",
            "export_backup": "Eksportuj kopię",
            "backup_created": "Kopia zapasowa utworzona",
            "backup_exported": "Kopia wyeksportowana",
            "save_settings": "Zapisz ustawienia",
            "reset_defaults": "Przywróć domyślne",
            "clear_all_data": "Wyczyść wszystkie dane",
            "clear_all_data_confirmation": "Czy na pewno? Wszystkie receptury i dodane farby zostaną usunięte!",
            "data_cleared": "Wszystkie dane wyczyszczone",

            // Okna modalne
            "confirmation": "Potwierdzenie",
            "confirmation_message": "Czy na pewno?",
            "confirm_action": "Tak",
            "unsaved_changes_warning": "Masz niezapisane zmiany. Czy na pewno chcesz wyjść?",
            "recipe_exists_title": "Przepis już istnieje",
            "recipe_exists_message": "Przepis o tej nazwie już istnieje. Zastąpić go?",

            // Synchronizacja
            "syncing": "Synchronizacja...",
            "sync_complete": "Synchronizacja zakończona",
            "sync_error": "Błąd synchronizacji",
            "sync_offline": "Brak połączenia z internetem",
            "sync_in_progress": "Synchronizacja...",

            // Autoryzacja
            "email": "Email",
            "password": "Hasło",
            "or": "lub",
            "signin_google": "Zaloguj przez Google",
            "auth_note": "Dane są synchronizowane między urządzeniami",
            "logout_confirmation": "Czy na pewno chcesz się wylogować?",
            "logged_out": "Zostałeś wylogowany",

            // Błędy i komunikaty
            "paints_not_found": "Nie znaleziono farb",
            "unknown_error": "Nieznany błąd",
            "network_error": "Błąd sieci",
            "timeout_error": "Przekroczono czas oczekiwania",
            "permission_denied": "Brak dostępu",
            "not_found_error": "Nie znaleziono zasobu",
            "validation_error": "Błąd walidacji",
            "server_error": "Błąd serwera",
            "try_again": "Spróbuj ponownie później",
            "operation_successful": "Operacja zakończona pomyślnie",
            "operation_failed": "Operacja nie powiodła się",

            // Jednostki
            "unit_g": "g",
            "unit_kg": "kg",
            "unit_ml": "ml",
            "unit_l": "l",
            "unit_percent": "%",

            // Standardowe kategorie (klucze)
            "cat_standard": "Standardowe",
            "cat_metallic": "Metaliczne",
            "cat_matte": "Matowe",
            "cat_glossy": "Błyszczące",
            "cat_pearl": "Perłowe",
            "cat_fluorescent": "Fluorescencyjne",
            "cat_thermochromic": "Termochromowe",
            "cat_photochromic": "Fotochromowe",
            "cat_special": "Specjalne",

            // Miesiące
            "january": "Styczeń",
            "february": "Luty",
            "march": "Marzec",
            "april": "Kwiecień",
            "may": "Maj",
            "june": "Czerwiec",
            "july": "Lipiec",
            "august": "Sierpień",
            "september": "Wrzesień",
            "october": "Październik",
            "november": "Listopad",
            "december": "Grudzień",

            // Dni tygodnia
            "monday": "Poniedziałek",
            "tuesday": "Wtorek",
            "wednesday": "Środa",
            "thursday": "Czwartek",
            "friday": "Piątek",
            "saturday": "Sobota",
            "sunday": "Niedziela",

            // Skrócone dni
            "mon": "Pon",
            "tue": "Wt",
            "wed": "Śr",
            "thu": "Czw",
            "fri": "Pt",
            "sat": "Sob",
            "sun": "Niedz",

            // Niestandardowe kategorie (do tłumaczenia)
            "cat_universal": "Uniwersalne",
            "cat_paper_cardboard": "Papier/Tektura",
            "cat_plastics": "Tworzywa sztuczne",
            "cat_textiles": "Tekstylia",
            "cat_uv": "Farby UV",
            "cat_uv_led": "Farby UV (LED)",

            // Drukowanie etykiety
            "enter_weight_kg": "Wprowadź wagę (kg):"
        }
    };

    // Поточна мова
    let currentLanguage = 'uk';

    // Функція для отримання перекладу
    function t(key, params = {}) {
        const lang = currentLanguage;
        const translation = translations[lang]?.[key] || translations.uk[key] || key;
        
        // Заміна параметрів у форматі {{param}}
        return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
            return params[param] !== undefined ? params[param] : match;
        });
    }

    // Функція для встановлення мови
    function setLanguage(lang) {
        if (translations[lang]) {
            currentLanguage = lang;
            document.documentElement.lang = lang;
            localStorage.setItem('sicoSpectrumLanguage', lang);
        }
    }

    // Функція для отримання поточної мови
    function getLanguage() {
        return currentLanguage;
    }

    // Функція для перекладу стандартних категорій (за ключем)
    function translateCategory(categoryKey) {
        const categoryMap = {
            'standard': t('cat_standard'),
            'metallic': t('cat_metallic'),
            'matte': t('cat_matte'),
            'glossy': t('cat_glossy'),
            'pearl': t('cat_pearl'),
            'fluorescent': t('cat_fluorescent'),
            'thermochromic': t('cat_thermochromic'),
            'photochromic': t('cat_photochromic'),
            'special': t('cat_special')
        };
        return categoryMap[categoryKey] || categoryKey;
    }

    // Функція для перекладу назв категорій (прямих рядків, наприклад з data-colors)
    function translateCategoryName(ukrainianName) {
        const lang = currentLanguage;
        // Мапа відповідностей для кожної мови
        const categoryNameMap = {
            uk: {
                "Універсальні": "Універсальні",
                "Папір/картон": "Папір/картон",
                "Пластики": "Пластики",
                "Текстиль": "Текстиль",
                "UV фарби": "UV фарби",
                "UV фарби (LED)": "UV фарби (LED)"
            },
            en: {
                "Універсальні": "Universal",
                "Папір/картон": "Paper/Cardboard",
                "Пластики": "Plastics",
                "Текстиль": "Textiles",
                "UV фарби": "UV paints",
                "UV фарби (LED)": "UV paints (LED)"
            },
            pl: {
                "Універсальні": "Uniwersalne",
                "Папір/картон": "Papier/Tektura",
                "Пластики": "Tworzywa sztuczne",
                "Текстиль": "Tekstylia",
                "UV фарби": "Farby UV",
                "UV фарби (LED)": "Farby UV (LED)"
            }
        };
        return categoryNameMap[lang]?.[ukrainianName] || ukrainianName;
    }

    // Функція для локалізації символу одиниці вимірювання
    function localizeUnitSymbol(unit) {
        const unitMap = {
            'г': t('unit_g'),
            'кг': t('unit_kg'),
            'мл': t('unit_ml'),
            'л': t('unit_l'),
            '%': t('unit_percent')
        };
        return unitMap[unit] || unit;
    }

    // Функція для застосування перекладів до DOM
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) el.textContent = t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) el.placeholder = t(key);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (key) el.title = t(key);
        });

        document.querySelectorAll('[data-i18n-value]').forEach(el => {
            const key = el.getAttribute('data-i18n-value');
            if (key) el.value = t(key);
        });
    }

    // Ініціалізація
    function init() {
        const savedLang = localStorage.getItem('sicoSpectrumLanguage');
        if (savedLang && translations[savedLang]) {
            currentLanguage = savedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                currentLanguage = browserLang;
            }
        }
        document.documentElement.lang = currentLanguage;
        applyTranslations();
        // Оновлюємо тексти опцій в налаштуваннях, якщо модуль вже завантажено
        if (SICOMIX.app && typeof SICOMIX.app.updateLayoutOptionsText === 'function') {
            SICOMIX.app.updateLayoutOptionsText();
        }
    }

    // Експортуємо публічні методи
    SICOMIX.i18n = {
        t,
        setLanguage,
        getLanguage,
        translateCategory,
        translateCategoryName,
        localizeUnitSymbol,
        applyTranslations,
        init
    };

})(window);
