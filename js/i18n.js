if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.i18n = (function() {
    const translations = {
        uk: {
            // Глобальні
            app_subtitle: "Цифрова лабораторія кольору",
            home: "Головна",
            new_recipe: "Новий рецепт",
            recipes: "Рецепти",
            catalog: "Каталог фарб",
            import: "Імпорт",
            export: "Експорт",
            settings: "Налаштування",
            paints_in_catalog: "фарб у каталозі",
            main_menu: "Головне меню",
            import_export: "Імпорт/Експорт",
            version: "Версія",

            // Головна
            welcome_title: "Ласкаво просимо до SICO Spectrum",
            welcome_subtitle: "Цифрова лабораторія кольору",
            new_recipe_desc: "Створіть новий рецепт фарби",
            my_recipes: "Мої рецепти",
            my_recipes_desc: "Переглядайте та керуйте рецептами",
            paint_catalog: "Каталог фарб",
            catalog_desc: "База всіх доступних фарб",
            export_data: "Експорт даних",
            export_desc: "Експортуйте рецепти у різних форматах",

            // Новий рецепт
            new_recipe_desc_long: "Створіть новий рецепт фарби, додаючи інгредієнти",
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

            // Рецепти
            my_recipes_desc_long: "Переглядайте, редагуйте та керуйте рецептами",
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

            // Каталог
            catalog_desc_long: "База всіх доступних фарб",
            search_catalog: "Пошук фарб...",
            add_new_paint: "Додати нову фарбу",
            manufacturer: "Виробник",
            article: "Артикул",
            catalog_empty: "Каталог порожній",
            delete_paint: "Видалення фарби",
            delete_paint_confirmation: "Ви впевнені, що хочете видалити цю фарбу?",
            paint_deleted: "Фарбу видалено",
            paint_added: "Фарбу додано",

            // Імпорт/Експорт
            import_desc: "Імпортуйте рецепти та каталог з файлів",
            select_import_file: "Виберіть файл для імпорту",
            file_format: "Формат файлу",
            select_file: "Оберіть файл",
            import_data_type: "Тип даних для імпорту",
            paints: "Фарби",
            start_import: "Почати імпорт",
            export_desc_long: "Експортуйте ваші дані у різних форматах",
            export_settings: "Налаштування експорту",
            export_format: "Формат експорту",
            data_to_export: "Дані для експорту",
            calculations: "Розрахунки",
            additional_options: "Додаткові опції",
            include_photos: "Включати фотографії",
            compress_data: "Стиснути дані (ZIP)",
            start_export: "Почати експорт",

            // Налаштування
            settings_desc: "Налаштуйте систему за вашими потребами",
            general_settings: "Загальні налаштування",
            interface_language: "Мова інтерфейсу",
            measurement_units: "Одиниці вимірювання",
            grams: "Грами (г)",
            ml: "Мілілітри (мл)",
            percent: "Відсотки (%)",
            auto_save: "Автоматичне збереження",
            auto_save_changes: "Автоматично зберігати зміни",
            create_backups: "Створювати резервні копії",
            save_settings: "Зберегти налаштування",
            reset_defaults: "Скинути до стандартних",
            clear_all_data: "Очистити всі дані",

            // Модальні вікна
            add_new_paint: "Додати нову фарбу",
            paint_name: "Назва фарби",
            paint_name_placeholder: "Введіть назву фарби",
            color_code: "Код кольору",
            color_code_placeholder: "#000000 або RGB",
            paint_description: "Опис фарби",
            paint_description_placeholder: "Опишіть характеристики",
            manufacturer_placeholder: "Назва виробника",
            article_placeholder: "Артикул продукту",
            save_paint: "Зберегти фарбу",
            cancel: "Скасувати",
            confirmation: "Підтвердження",
            confirmation_message: "Ви впевнені?",
            confirm_action: "Так, виконати",
            select_paint: "Оберіть фарбу",

            // Повідомлення
            paints_not_found: "Фарб не знайдено",
            paint_already_added: "Ця фарба вже додана",
            paint_added_to_recipe: "Фарбу додано до рецепту",
            fill_required_fields: "Заповніть обов'язкові поля та додайте хоча б один інгредієнт",
            recipe_saved: "Рецепт успішно збережено!",
            invalid_file_format: "Невірний формат файлу",
            file_read_error: "Помилка читання файлу",
            feature_in_development: "Функція в розробці",
            loading: "Завантаження...",
            save_first: "Спочатку збережіть рецепт"
        },
        en: {
            app_subtitle: "Digital Color Laboratory",
            home: "Home",
            new_recipe: "New Recipe",
            recipes: "Recipes",
            catalog: "Paint Catalog",
            import: "Import",
            export: "Export",
            settings: "Settings",
            paints_in_catalog: "paints in catalog",
            main_menu: "Main Menu",
            import_export: "Import/Export",
            version: "Version",

            welcome_title: "Welcome to SICO Spectrum",
            welcome_subtitle: "Digital Color Laboratory",
            new_recipe_desc: "Create a new paint recipe",
            my_recipes: "My Recipes",
            my_recipes_desc: "View and manage recipes",
            paint_catalog: "Paint Catalog",
            catalog_desc: "Database of available paints",
            export_data: "Export Data",
            export_desc: "Export recipes in various formats",

            new_recipe_desc_long: "Create a new paint recipe by adding ingredients",
            basic_info: "Basic Information",
            recipe_name: "Recipe Name",
            recipe_name_placeholder: "Enter recipe name",
            category: "Category",
            select_category: "Select category",
            color: "Color",
            recipe_description: "Recipe Description",
            recipe_description_placeholder: "Add description (optional)",
            recipe_photo: "Recipe Photo",
            upload_photo: "Upload Photo",
            recipe_ingredients: "Ingredients",
            paint: "Paint",
            quantity: "Quantity",
            units: "Units",
            percentage: "Percentage",
            actions: "Actions",
            search_paints: "Search paints...",
            all_categories: "All Categories",
            add_ingredient: "Add Ingredient",
            save_recipe: "Save Recipe",
            calculate_percentages: "Calculate Percentages",
            clear_form: "Clear Form",
            update_recipe: "Update Recipe",

            my_recipes_desc_long: "View, edit and manage your recipes",
            search_recipes: "Search recipes...",
            print: "Print",
            delete_selected: "Delete Selected",
            select: "Select",
            ingredients_count: "Ingredients",
            total_weight: "Total Weight",
            date: "Date",
            edit: "Edit",
            delete: "Delete",
            no_description: "No description",
            no_recipes: "No recipes found",
            delete_recipe: "Delete Recipe",
            delete_recipe_confirmation: "Are you sure you want to delete this recipe?",
            recipe_deleted: "Recipe deleted",
            select_recipes_to_delete: "Select recipes to delete",
            delete_recipes: "Delete Recipes",
            delete_recipes_confirmation: "Are you sure you want to delete",
            recipe_exported: "Recipe exported",
            no_recipes_to_export: "No recipes to export",
            exported: "Exported",
            import_recipes: "Import Recipes",
            found_recipes: "Found",
            import_confirm: "recipes. Import?",
            imported: "Imported",
            print_recipes: "Print Recipes",
            print_date: "Print Date",
            creation_date: "Creation Date",
            unknown: "Unknown",
            deleted: "Deleted",

            catalog_desc_long: "Database of all available paints",
            search_catalog: "Search paints...",
            add_new_paint: "Add New Paint",
            manufacturer: "Manufacturer",
            article: "Article",
            catalog_empty: "Catalog is empty",
            delete_paint: "Delete Paint",
            delete_paint_confirmation: "Are you sure you want to delete this paint?",
            paint_deleted: "Paint deleted",
            paint_added: "Paint added",

            import_desc: "Import recipes and catalog from files",
            select_import_file: "Select file to import",
            file_format: "File Format",
            select_file: "Select File",
            import_data_type: "Data type for import",
            paints: "Paints",
            start_import: "Start Import",
            export_desc_long: "Export your data in various formats",
            export_settings: "Export Settings",
            export_format: "Export Format",
            data_to_export: "Data to Export",
            calculations: "Calculations",
            additional_options: "Additional Options",
            include_photos: "Include Photos",
            compress_data: "Compress Data (ZIP)",
            start_export: "Start Export",

            settings_desc: "Configure system according to your needs",
            general_settings: "General Settings",
            interface_language: "Interface Language",
            measurement_units: "Measurement Units",
            grams: "Grams (g)",
            ml: "Milliliters (ml)",
            percent: "Percent (%)",
            auto_save: "Auto Save",
            auto_save_changes: "Automatically save changes",
            create_backups: "Create backups",
            save_settings: "Save Settings",
            reset_defaults: "Reset to Defaults",
            clear_all_data: "Clear All Data",

            add_new_paint: "Add New Paint",
            paint_name: "Paint Name",
            paint_name_placeholder: "Enter paint name",
            color_code: "Color Code",
            color_code_placeholder: "#000000 or RGB",
            paint_description: "Paint Description",
            paint_description_placeholder: "Describe characteristics",
            manufacturer_placeholder: "Manufacturer name",
            article_placeholder: "Product article",
            save_paint: "Save Paint",
            cancel: "Cancel",
            confirmation: "Confirmation",
            confirmation_message: "Are you sure?",
            confirm_action: "Yes, proceed",
            select_paint: "Select Paint",

            paints_not_found: "Paints not found",
            paint_already_added: "This paint is already added",
            paint_added_to_recipe: "Paint added to recipe",
            fill_required_fields: "Please fill all required fields and add at least one ingredient",
            recipe_saved: "Recipe saved successfully!",
            invalid_file_format: "Invalid file format",
            file_read_error: "File read error",
            feature_in_development: "Feature in development",
            loading: "Loading...",
            save_first: "Save the recipe first"
        },
        pl: {
            app_subtitle: "Cyfrowe Laboratorium Kolorów",
            home: "Strona główna",
            new_recipe: "Nowy przepis",
            recipes: "Przepisy",
            catalog: "Katalog farb",
            import: "Import",
            export: "Eksport",
            settings: "Ustawienia",
            paints_in_catalog: "farb w katalogu",
            main_menu: "Menu główne",
            import_export: "Import/Eksport",
            version: "Wersja",

            welcome_title: "Witamy w SICO Spectrum",
            welcome_subtitle: "Cyfrowe Laboratorium Kolorów",
            new_recipe_desc: "Utwórz nowy przepis farby",
            my_recipes: "Moje przepisy",
            my_recipes_desc: "Przeglądaj i zarządzaj przepisami",
            paint_catalog: "Katalog farb",
            catalog_desc: "Baza dostępnych farb",
            export_data: "Eksport danych",
            export_desc: "Eksportuj przepisy w różnych formatach",

            new_recipe_desc_long: "Utwórz nowy przepis farby dodając składniki",
            basic_info: "Podstawowe informacje",
            recipe_name: "Nazwa przepisu",
            recipe_name_placeholder: "Wprowadź nazwę przepisu",
            category: "Kategoria",
            select_category: "Wybierz kategorię",
            color: "Kolor",
            recipe_description: "Opis przepisu",
            recipe_description_placeholder: "Dodaj opis (opcjonalnie)",
            recipe_photo: "Zdjęcie przepisu",
            upload_photo: "Prześlij zdjęcie",
            recipe_ingredients: "Składniki",
            paint: "Farba",
            quantity: "Ilość",
            units: "Jednostki",
            percentage: "Procent",
            actions: "Akcje",
            search_paints: "Szukaj farb...",
            all_categories: "Wszystkie kategorie",
            add_ingredient: "Dodaj składnik",
            save_recipe: "Zapisz przepis",
            calculate_percentages: "Oblicz procenty",
            clear_form: "Wyczyść formularz",
            update_recipe: "Aktualizuj przepis",

            my_recipes_desc_long: "Przeglądaj, edytuj i zarządzaj przepisami",
            search_recipes: "Szukaj przepisów...",
            print: "Drukuj",
            delete_selected: "Usuń wybrane",
            select: "Wybierz",
            ingredients_count: "Składników",
            total_weight: "Waga całkowita",
            date: "Data",
            edit: "Edytuj",
            delete: "Usuń",
            no_description: "Brak opisu",
            no_recipes: "Nie znaleziono przepisów",
            delete_recipe: "Usuwanie przepisu",
            delete_recipe_confirmation: "Czy na pewno chcesz usunąć ten przepis?",
            recipe_deleted: "Przepis usunięty",
            select_recipes_to_delete: "Wybierz przepisy do usunięcia",
            delete_recipes: "Usuwanie przepisów",
            delete_recipes_confirmation: "Czy na pewno chcesz usunąć",
            recipe_exported: "Przepis wyeksportowany",
            no_recipes_to_export: "Brak przepisów do eksportu",
            exported: "Wyeksportowano",
            import_recipes: "Import przepisów",
            found_recipes: "Znaleziono",
            import_confirm: "przepisów. Importować?",
            imported: "Zaimportowano",
            print_recipes: "Drukuj przepisy",
            print_date: "Data druku",
            creation_date: "Data utworzenia",
            unknown: "Nieznany",
            deleted: "Usunięto",

            catalog_desc_long: "Baza wszystkich dostępnych farb",
            search_catalog: "Szukaj farb...",
            add_new_paint: "Dodaj nową farbę",
            manufacturer: "Producent",
            article: "Artykuł",
            catalog_empty: "Katalog jest pusty",
            delete_paint: "Usuwanie farby",
            delete_paint_confirmation: "Czy na pewno chcesz usunąć tę farbę?",
            paint_deleted: "Farba usunięta",
            paint_added: "Farba dodana",

            import_desc: "Importuj przepisy i katalog z plików",
            select_import_file: "Wybierz plik do importu",
            file_format: "Format pliku",
            select_file: "Wybierz plik",
            import_data_type: "Typ danych do importu",
            paints: "Farby",
            start_import: "Rozpocznij import",
            export_desc_long: "Eksportuj dane w różnych formatach",
            export_settings: "Ustawienia eksportu",
            export_format: "Format eksportu",
            data_to_export: "Dane do eksportu",
            calculations: "Obliczenia",
            additional_options: "Opcje dodatkowe",
            include_photos: "Dołącz zdjęcia",
            compress_data: "Kompresuj dane (ZIP)",
            start_export: "Rozpocznij eksport",

            settings_desc: "Skonfiguruj system według potrzeb",
            general_settings: "Ustawienia ogólne",
            interface_language: "Język interfejsu",
            measurement_units: "Jednostki miary",
            grams: "Gramy (g)",
            ml: "Mililitry (ml)",
            percent: "Procenty (%)",
            auto_save: "Automatyczne zapisywanie",
            auto_save_changes: "Automatycznie zapisuj zmiany",
            create_backups: "Twórz kopie zapasowe",
            save_settings: "Zapisz ustawienia",
            reset_defaults: "Przywróć domyślne",
            clear_all_data: "Wyczyść wszystkie dane",

            add_new_paint: "Dodaj nową farbę",
            paint_name: "Nazwa farby",
            paint_name_placeholder: "Wprowadź nazwę farby",
            color_code: "Kod koloru",
            color_code_placeholder: "#000000 lub RGB",
            paint_description: "Opis farby",
            paint_description_placeholder: "Opisz charakterystykę",
            manufacturer_placeholder: "Nazwa producenta",
            article_placeholder: "Artykuł produktu",
            save_paint: "Zapisz farbę",
            cancel: "Anuluj",
            confirmation: "Potwierdzenie",
            confirmation_message: "Czy na pewno?",
            confirm_action: "Tak, wykonaj",
            select_paint: "Wybierz farbę",

            paints_not_found: "Nie znaleziono farb",
            paint_already_added: "Ta farba jest już dodana",
            paint_added_to_recipe: "Farba dodana do przepisu",
            fill_required_fields: "Proszę wypełnić wszystkie wymagane pola i dodać co najmniej jeden składnik",
            recipe_saved: "Przepis zapisany pomyślnie!",
            invalid_file_format: "Nieprawidłowy format pliku",
            file_read_error: "Błąd odczytu pliku",
            feature_in_development: "Funkcja w rozwoju",
            loading: "Ładowanie...",
            save_first: "Najpierw zapisz przepis"
        }
    };

    let currentLang = 'uk';

    function setLanguage(lang) {
        if (translations[lang]) {
            currentLang = lang;
            localStorage.setItem('sicoSpectrumLanguage', lang);
            applyTranslations();
            return true;
        }
        return false;
    }

    function getLanguage() {
        return currentLang;
    }

    function t(key) {
        const translation = translations[currentLang]?.[key];
        if (translation === undefined) {
            console.warn(`Missing translation key: ${key} [${currentLang}]`);
            return translations['uk'][key] || key;
        }
        return translation;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = t(key);
            if (el.placeholder !== undefined) {
                el.placeholder = text;
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.type !== 'submit' && el.type !== 'button') {
                    el.value = text;
                }
            } else {
                el.textContent = text;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        document.title = `SICO Spectrum • ${t('paint_catalog')}`;
    }

    function init() {
        const savedLang = localStorage.getItem('sicoSpectrumLanguage') || 'uk';
        setLanguage(savedLang);
        return currentLang;
    }

    return {
        setLanguage,
        getLanguage,
        t,
        applyTranslations,
        init
    };
})();

window.SICOMIX = SICOMIX;
