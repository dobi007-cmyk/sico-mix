// ========== ІНТЕРНАЦІОНАЛІЗАЦІЯ (i18n) ==========
(function() {
    'use strict';
    
    if (!window.SICOMIX) window.SICOMIX = {};

    const TRANSLATIONS = {
        uk: {
            // Загальні
            app_title: "SICO MIX • Управління рецептами фарб",
            home: "Головна",
            new_recipe: "Новий рецепт",
            recipes: "Рецепти",
            catalog: "Каталог фарб",
            import: "Імпорт",
            export: "Експорт",
            settings: "Налаштування",
            about: "Про додаток",
            paints_in_catalog: "фарб у каталозі",
            loading: "Завантаження SICO MIX...",
            offline_mode: "Офлайн режим. Деякі функції можуть бути недоступні.",
            
            // Головна
            welcome_title: "Ласкаво просимо до SICO MIX",
            welcome_subtitle: "Професійна система управління рецептами фарб для створення, зберігання та аналізу ваших кольорових рішень",
            quick_start: "Швидкий старт",
            show_tutorial: "Показати навчання",
            new_recipe_desc: "Створіть новий рецепт фарби з детальними пропорціями та характеристиками",
            my_recipes: "Мої рецепти",
            my_recipes_desc: "Переглядайте, редагуйте та керуйте всіма вашими збереженими рецептами",
            paint_catalog: "Каталог фарб",
            catalog_desc: "База всіх доступних фарб з можливістю пошуку та фільтрації",
            export_data: "Експорт даних",
            export_desc: "Експортуйте ваші рецепти у різних форматах для подальшого використання",
            your_statistics: "Ваша статистика",
            total_recipes: "Всього рецептів",
            total_paints: "Фарб у каталозі",
            total_calculations: "Розрахунків виконано",
            
            // Новий рецепт
            new_recipe_desc_long: "Створіть новий рецепт фарби, додаючи інгредієнти та вказуючи пропорції",
            basic_info: "Основна інформація",
            recipe_name: "Назва рецепту",
            recipe_name_placeholder: "Введіть назву рецепту",
            category: "Категорія",
            select_category: "Оберіть категорію",
            color: "Колір",
            recipe_description: "Опис рецепту",
            recipe_description_placeholder: "Додайте опис рецепту (необов'язково)",
            recipe_photo: "Фото рецепту",
            upload_photo: "Завантажити фото",
            remove_photo: "Видалити фото",
            recipe_ingredients: "Інгредієнти рецепту",
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
            save_draft: "Зберегти чернетку",
            update_recipe: "Оновити рецепт",
            no_ingredients: "Ще немає інгредієнтів",
            total_amount: "Загальна кількість:",
            total_percentage: "Загальний відсоток:",
            
            // Рецепти
            my_recipes_desc_long: "Переглядайте, редагуйте та керуйте всіма вашими рецептами фарб",
            search_recipes: "Пошук рецептів...",
            sort: "Сортувати",
            print: "Друк",
            delete_selected: "Видалити обрані",
            select_all: "Обрати все",
            create_first_recipe: "Створити перший рецепт",
            select: "Обрати",
            ingredients_count: "Інгредієнтів",
            total_weight: "Загальна вага",
            date: "Дата",
            edit: "Редагувати",
            delete: "Видалити",
            no_description: "Опис відсутній",
            no_recipes: "Немає збережених рецептів",
            no_recipes_desc: "Створіть свій перший рецепт, натиснувши 'Новий рецепт'",
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
            catalog_desc_long: "База всіх доступних фарб з детальною інформацією та характеристиками",
            search_catalog: "Пошук фарб у каталозі...",
            all_manufacturers: "Всі виробники",
            add_new_paint: "Додати нову фарбу",
            manufacturer: "Виробник",
            article: "Артикул",
            catalog_empty: "Каталог фарб порожній",
            no_paints: "Каталог фарб порожній",
            no_paints_desc: "Додайте першу фарбу до каталогу",
            add_first_paint: "Додати першу фарбу",
            delete_paint: "Видалення фарби",
            delete_paint_confirmation: "Ви впевнені, що хочете видалити цю фарбу з каталогу?",
            paint_deleted: "Фарбу видалено з каталогу",
            paint_added: "Фарбу додано до каталогу",
            
            // Імпорт
            import_desc: "Імпортуйте рецепти та каталог фарб з файлів різних форматів",
            select_import_file: "Виберіть файл для імпорту",
            file_format: "Формат файлу",
            select_file: "Оберіть файл",
            import_data_type: "Тип даних для імпорту",
            paints: "Фарби з каталогу",
            import_options: "Опції імпорту",
            overwrite_existing: "Перезаписати існуючі записи",
            validate_data: "Валідувати дані перед імпортом",
            start_import: "Почати імпорт",
            import_progress: "Прогрес імпорту",
            import_starting: "Початок імпорту...",
            drag_drop_hint: "або перетягніть файл сюди",
            selected_file: "Обраний файл:",
            file_size: "Розмір файлу:",
            
            // Експорт
            export_desc_long: "Експортуйте ваші дані у різних форматах для зберігання та подальшого використання",
            export_settings: "Налаштування експорту",
            export_format: "Формат експорту",
            data_to_export: "Дані для експорту",
            calculations: "Розрахунки",
            additional_options: "Додаткові опції",
            include_photos: "Включати фотографії",
            compress_data: "Стиснути дані (ZIP)",
            include_metadata: "Включати метадані",
            timestamp_filename: "Додати час до імені файлу",
            start_export: "Почати експорт",
            preview_export: "Попередній перегляд",
            export_filename: "Ім'я файлу",
            export_progress: "Прогрес експорту",
            export_starting: "Початок експорту...",
            
            // Налаштування
            settings_desc: "Налаштуйте систему SICO MIX за вашими потребами",
            general_settings: "Загальні налаштування",
            interface_language: "Мова інтерфейсу",
            measurement_units: "Одиниці вимірювання",
            date_format: "Формат дати",
            number_format: "Формат чисел",
            auto_save: "Автоматичне збереження",
            auto_save_changes: "Автоматично зберігати зміни",
            create_backups: "Створювати резервні копії",
            sync_data: "Синхронізувати дані між пристроями",
            auto_save_interval: "Інтервал авто-збереження (секунди)",
            save_settings: "Зберегти налаштування",
            reset_defaults: "Скинути до стандартних",
            clear_all_data: "Очистити всі дані",
            pwa_settings: "Налаштування PWA",
            pwa_features: "Функції PWA",
            offline_mode: "Офлайн режим",
            notifications: "Сповіщення",
            background_sync: "Фонова синхронізація",
            install_app: "Встановити додаток",
            clear_cache: "Очистити кеш",
            check_updates: "Перевірити оновлення",
            about_app: "Про додаток",
            app_name: "Назва додатку",
            version: "Версія",
            build_date: "Дата збірки",
            developer: "Розробник",
            license: "Ліцензія",
            changelog: "Список змін",
            export_logs: "Експорт логів",
            report_bug: "Повідомити про помилку",
            enabled: "Увімкнено",
            
            // Модальні вікна
            add_new_paint: "Додати нову фарбу",
            paint_name: "Назва фарби",
            paint_name_placeholder: "Введіть назву фарби",
            color_code: "Код кольору",
            color_code_placeholder: "#000000 або RGB",
            paint_description: "Опис фарби",
            paint_description_placeholder: "Опишіть характеристики фарби",
            manufacturer_placeholder: "Назва виробника",
            article_placeholder: "Артикул продукту",
            price: "Ціна",
            unit: "Одиниця виміру",
            save_paint: "Зберегти фарбу",
            cancel: "Скасувати",
            confirmation: "Підтвердження дії",
            confirmation_message: "Ви впевнені, що хочете виконати цю дію?",
            confirm_action: "Так, виконати",
            select_paint: "Оберіть фарбу",
            
            // Повідомлення та помилки
            paints_not_found: "Фарб не знайдено",
            paint_already_added: "Ця фарба вже додана до рецепту",
            paint_added_to_recipe: "Фарбу додано до рецепту",
            fill_required_fields: "Будь ласка, заповніть всі обов'язкові поля та додайте хоча б один інгредієнт",
            recipe_saved: "Рецепт успішно збережено!",
            invalid_file_format: "Невірний формат файлу",
            file_read_error: "Помилка читання файлу",
            feature_in_development: "Функція в розробці",
            
            // Футер
            privacy_policy: "Політика конфіденційності",
            terms_of_service: "Умови використання",
            contact_support: "Зв'язатися з підтримкою"
        },
        
        en: {
            // General
            app_title: "SICO MIX • Paint Recipe Management",
            home: "Home",
            new_recipe: "New Recipe",
            recipes: "Recipes",
            catalog: "Paint Catalog",
            import: "Import",
            export: "Export",
            settings: "Settings",
            about: "About",
            paints_in_catalog: "paints in catalog",
            loading: "Loading SICO MIX...",
            offline_mode: "Offline mode. Some features may be unavailable.",
            
            // Home
            welcome_title: "Welcome to SICO MIX",
            welcome_subtitle: "Professional paint recipe management system for creating, storing and analyzing your color solutions",
            quick_start: "Quick Start",
            show_tutorial: "Show Tutorial",
            new_recipe_desc: "Create a new paint recipe with detailed proportions and characteristics",
            my_recipes: "My Recipes",
            my_recipes_desc: "View, edit and manage all your saved recipes",
            paint_catalog: "Paint Catalog",
            catalog_desc: "Database of all available paints with search and filtering capabilities",
            export_data: "Export Data",
            export_desc: "Export your recipes in various formats for further use",
            your_statistics: "Your Statistics",
            total_recipes: "Total Recipes",
            total_paints: "Paints in Catalog",
            total_calculations: "Calculations Performed",
            
            // New Recipe
            new_recipe_desc_long: "Create a new paint recipe by adding ingredients and specifying proportions",
            basic_info: "Basic Information",
            recipe_name: "Recipe Name",
            recipe_name_placeholder: "Enter recipe name",
            category: "Category",
            select_category: "Select category",
            color: "Color",
            recipe_description: "Recipe Description",
            recipe_description_placeholder: "Add recipe description (optional)",
            recipe_photo: "Recipe Photo",
            upload_photo: "Upload Photo",
            remove_photo: "Remove Photo",
            recipe_ingredients: "Recipe Ingredients",
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
            save_draft: "Save Draft",
            update_recipe: "Update Recipe",
            no_ingredients: "No ingredients yet",
            total_amount: "Total amount:",
            total_percentage: "Total percentage:",
            
            // Recipes
            my_recipes_desc_long: "View, edit and manage all your paint recipes",
            search_recipes: "Search recipes...",
            sort: "Sort",
            print: "Print",
            delete_selected: "Delete Selected",
            select_all: "Select All",
            create_first_recipe: "Create First Recipe",
            select: "Select",
            ingredients_count: "Ingredients",
            total_weight: "Total Weight",
            date: "Date",
            edit: "Edit",
            delete: "Delete",
            no_description: "No description",
            no_recipes: "No saved recipes",
            no_recipes_desc: "Create your first recipe by clicking 'New Recipe'",
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
            
            // Catalog
            catalog_desc_long: "Database of all available paints with detailed information and characteristics",
            search_catalog: "Search paint catalog...",
            all_manufacturers: "All Manufacturers",
            add_new_paint: "Add New Paint",
            manufacturer: "Manufacturer",
            article: "Article",
            catalog_empty: "Paint catalog is empty",
            no_paints: "Paint catalog is empty",
            no_paints_desc: "Add first paint to catalog",
            add_first_paint: "Add First Paint",
            delete_paint: "Delete Paint",
            delete_paint_confirmation: "Are you sure you want to delete this paint from catalog?",
            paint_deleted: "Paint deleted from catalog",
            paint_added: "Paint added to catalog",
            
            // Import
            import_desc: "Import recipes and paint catalog from files of various formats",
            select_import_file: "Select file to import",
            file_format: "File Format",
            select_file: "Select File",
            import_data_type: "Data type for import",
            paints: "Paints from catalog",
            import_options: "Import Options",
            overwrite_existing: "Overwrite existing entries",
            validate_data: "Validate data before import",
            start_import: "Start Import",
            import_progress: "Import Progress",
            import_starting: "Starting import...",
            drag_drop_hint: "or drag and drop file here",
            selected_file: "Selected file:",
            file_size: "File size:",
            
            // Export
            export_desc_long: "Export your data in various formats for storage and further use",
            export_settings: "Export Settings",
            export_format: "Export Format",
            data_to_export: "Data to Export",
            calculations: "Calculations",
            additional_options: "Additional Options",
            include_photos: "Include Photos",
            compress_data: "Compress Data (ZIP)",
            include_metadata: "Include Metadata",
            timestamp_filename: "Add timestamp to filename",
            start_export: "Start Export",
            preview_export: "Preview Export",
            export_filename: "Filename",
            export_progress: "Export Progress",
            export_starting: "Starting export...",
            
            // Settings
            settings_desc: "Configure SICO MIX system according to your needs",
            general_settings: "General Settings",
            interface_language: "Interface Language",
            measurement_units: "Measurement Units",
            date_format: "Date Format",
            number_format: "Number Format",
            auto_save: "Auto Save",
            auto_save_changes: "Automatically save changes",
            create_backups: "Create backups",
            sync_data: "Sync data between devices",
            auto_save_interval: "Auto-save interval (seconds)",
            save_settings: "Save Settings",
            reset_defaults: "Reset to Defaults",
            clear_all_data: "Clear All Data",
            pwa_settings: "PWA Settings",
            pwa_features: "PWA Features",
            offline_mode: "Offline Mode",
            notifications: "Notifications",
            background_sync: "Background Sync",
            install_app: "Install App",
            clear_cache: "Clear Cache",
            check_updates: "Check for Updates",
            about_app: "About App",
            app_name: "App Name",
            version: "Version",
            build_date: "Build Date",
            developer: "Developer",
            license: "License",
            changelog: "Changelog",
            export_logs: "Export Logs",
            report_bug: "Report Bug",
            enabled: "Enabled",
            
            // Modals
            add_new_paint: "Add New Paint",
            paint_name: "Paint Name",
            paint_name_placeholder: "Enter paint name",
            color_code: "Color Code",
            color_code_placeholder: "#000000 or RGB",
            paint_description: "Paint Description",
            paint_description_placeholder: "Describe paint characteristics",
            manufacturer_placeholder: "Manufacturer name",
            article_placeholder: "Product article",
            price: "Price",
            unit: "Unit",
            save_paint: "Save Paint",
            cancel: "Cancel",
            confirmation: "Confirmation",
            confirmation_message: "Are you sure you want to perform this action?",
            confirm_action: "Yes, proceed",
            select_paint: "Select Paint",
            
            // Messages and Errors
            paints_not_found: "Paints not found",
            paint_already_added: "This paint is already added to the recipe",
            paint_added_to_recipe: "Paint added to recipe",
            fill_required_fields: "Please fill all required fields and add at least one ingredient",
            recipe_saved: "Recipe saved successfully!",
            invalid_file_format: "Invalid file format",
            file_read_error: "File read error",
            feature_in_development: "Feature in development",
            
            // Footer
            privacy_policy: "Privacy Policy",
            terms_of_service: "Terms of Service",
            contact_support: "Contact Support"
        },
        
        pl: {
            // Ogólne
            app_title: "SICO MIX • Zarządzanie przepisami farb",
            home: "Strona główna",
            new_recipe: "Nowy przepis",
            recipes: "Przepisy",
            catalog: "Katalog farb",
            import: "Import",
            export: "Eksport",
            settings: "Ustawienia",
            about: "O aplikacji",
            paints_in_catalog: "farb w katalogu",
            loading: "Ładowanie SICO MIX...",
            offline_mode: "Tryb offline. Niektóre funkcje mogą być niedostępne.",
            
            // Strona główna
            welcome_title: "Witamy w SICO MIX",
            welcome_subtitle: "Profesjonalny system zarządzania przepisami farb do tworzenia, przechowywania i analizowania rozwiązań kolorystycznych",
            quick_start: "Szybki start",
            show_tutorial: "Pokaż samouczek",
            new_recipe_desc: "Utwórz nowy przepis farby ze szczegółowymi proporcjami i charakterystyką",
            my_recipes: "Moje przepisy",
            my_recipes_desc: "Przeglądaj, edytuj i zarządzaj wszystkimi zapisanymi przepisami",
            paint_catalog: "Katalog farb",
            catalog_desc: "Baza wszystkich dostępnych farb z możliwością wyszukiwania i filtrowania",
            export_data: "Eksport danych",
            export_desc: "Eksportuj swoje przepisy w różnych formatach do dalszego wykorzystania",
            your_statistics: "Twoje statystyki",
            total_recipes: "Wszystkich przepisów",
            total_paints: "Farb w katalogu",
            total_calculations: "Wykonanych obliczeń",
            
            // Nowy przepis
            new_recipe_desc_long: "Utwórz nowy przepis farby dodając składniki i określając proporcje",
            basic_info: "Podstawowe informacje",
            recipe_name: "Nazwa przepisu",
            recipe_name_placeholder: "Wprowadź nazwę przepisu",
            category: "Kategoria",
            select_category: "Wybierz kategorię",
            color: "Kolor",
            recipe_description: "Opis przepisu",
            recipe_description_placeholder: "Dodaj opis przepisu (opcjonalnie)",
            recipe_photo: "Zdjęcie przepisu",
            upload_photo: "Prześlij zdjęcie",
            remove_photo: "Usuń zdjęcie",
            recipe_ingredients: "Składniki przepisu",
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
            save_draft: "Zapisz szkic",
            update_recipe: "Aktualizuj przepis",
            no_ingredients: "Brak składników",
            total_amount: "Całkowita ilość:",
            total_percentage: "Całkowity procent:",
            
            // Przepisy
            my_recipes_desc_long: "Przeglądaj, edytuj i zarządzaj wszystkimi przepisami farb",
            search_recipes: "Szukaj przepisów...",
            sort: "Sortuj",
            print: "Drukuj",
            delete_selected: "Usuń wybrane",
            select_all: "Zaznacz wszystkie",
            create_first_recipe: "Utwórz pierwszy przepis",
            select: "Wybierz",
            ingredients_count: "Składników",
            total_weight: "Waga całkowita",
            date: "Data",
            edit: "Edytuj",
            delete: "Usuń",
            no_description: "Brak opisu",
            no_recipes: "Brak zapisanych przepisów",
            no_recipes_desc: "Utwórz pierwszy przepis klikając 'Nowy przepis'",
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
            import_confirm: "przepisów. Zaimportować?",
            imported: "Zaimportowano",
            print_recipes: "Drukuj przepisy",
            print_date: "Data druku",
            creation_date: "Data utworzenia",
            unknown: "Nieznany",
            deleted: "Usunięto",
            
            // Katalog
            catalog_desc_long: "Baza wszystkich dostępnych farb ze szczegółowymi informacjami i charakterystyką",
            search_catalog: "Szukaj w katalogu farb...",
            all_manufacturers: "Wszyscy producenci",
            add_new_paint: "Dodaj nową farbę",
            manufacturer: "Producent",
            article: "Artykuł",
            catalog_empty: "Katalog farb jest pusty",
            no_paints: "Katalog farb jest pusty",
            no_paints_desc: "Dodaj pierwszą farbę do katalogu",
            add_first_paint: "Dodaj pierwszą farbę",
            delete_paint: "Usuwanie farby",
            delete_paint_confirmation: "Czy na pewno chcesz usunąć tę farbę z katalogu?",
            paint_deleted: "Farba usunięta z katalogu",
            paint_added: "Farba dodana do katalogu",
            
            // Import
            import_desc: "Importuj przepisy i katalog farb z plików różnych formatów",
            select_import_file: "Wybierz plik do importu",
            file_format: "Format pliku",
            select_file: "Wybierz plik",
            import_data_type: "Typ danych do importu",
            paints: "Farb z katalogu",
            import_options: "Opcje importu",
            overwrite_existing: "Nadpisz istniejące wpisy",
            validate_data: "Waliduj dane przed importem",
            start_import: "Rozpocznij import",
            import_progress: "Postęp importu",
            import_starting: "Rozpoczynanie importu...",
            drag_drop_hint: "lub przeciągnij i upuść plik tutaj",
            selected_file: "Wybrany plik:",
            file_size: "Rozmiar pliku:",
            
            // Eksport
            export_desc_long: "Eksportuj dane w różnych formatach do przechowywania i dalszego wykorzystania",
            export_settings: "Ustawienia eksportu",
            export_format: "Format eksportu",
            data_to_export: "Dane do eksportu",
            calculations: "Obliczenia",
            additional_options: "Dodatkowe opcje",
            include_photos: "Uwzględnij zdjęcia",
            compress_data: "Kompresuj dane (ZIP)",
            include_metadata: "Uwzględnij metadane",
            timestamp_filename: "Dodaj znacznik czasu do nazwy pliku",
            start_export: "Rozpocznij eksport",
            preview_export: "Podgląd eksportu",
            export_filename: "Nazwa pliku",
            export_progress: "Postęp eksportu",
            export_starting: "Rozpoczynanie eksportu...",
            
            // Ustawienia
            settings_desc: "Skonfiguruj system SICO MIX zgodnie ze swoimi potrzebami",
            general_settings: "Ustawienia ogólne",
            interface_language: "Język interfejsu",
            measurement_units: "Jednostki miary",
            date_format: "Format daty",
            number_format: "Format liczb",
            auto_save: "Automatyczne zapisywanie",
            auto_save_changes: "Automatycznie zapisuj zmiany",
            create_backups: "Twórz kopie zapasowe",
            sync_data: "Synchronizuj dane między urządzeniami",
            auto_save_interval: "Interwał auto-zapisu (sekundy)",
            save_settings: "Zapisz ustawienia",
            reset_defaults: "Przywróć domyślne",
            clear_all_data: "Wyczyść wszystkie dane",
            pwa_settings: "Ustawienia PWA",
            pwa_features: "Funkcje PWA",
            offline_mode: "Tryb offline",
            notifications: "Powiadomienia",
            background_sync: "Synchronizacja w tle",
            install_app: "Zainstaluj aplikację",
            clear_cache: "Wyczyść pamięć podręczną",
            check_updates: "Sprawdź aktualizacje",
            about_app: "O aplikacji",
            app_name: "Nazwa aplikacji",
            version: "Wersja",
            build_date: "Data kompilacji",
            developer: "Deweloper",
            license: "Licencja",
            changelog: "Dziennik zmian",
            export_logs: "Eksport logów",
            report_bug: "Zgłoś błąd",
            enabled: "Włączone",
            
            // Modale
            add_new_paint: "Dodaj nową farbę",
            paint_name: "Nazwa farby",
            paint_name_placeholder: "Wprowadź nazwę farby",
            color_code: "Kod koloru",
            color_code_placeholder: "#000000 lub RGB",
            paint_description: "Opis farby",
            paint_description_placeholder: "Opisz charakterystykę farby",
            manufacturer_placeholder: "Nazwa producenta",
            article_placeholder: "Artykuł produktu",
            price: "Cena",
            unit: "Jednostka miary",
            save_paint: "Zapisz farbę",
            cancel: "Anuluj",
            confirmation: "Potwierdzenie",
            confirmation_message: "Czy na pewno chcesz wykonać tę akcję?",
            confirm_action: "Tak, wykonaj",
            select_paint: "Wybierz farbę",
            
            // Wiadomości i błędy
            paints_not_found: "Nie znaleziono farb",
            paint_already_added: "Ta farba jest już dodana do przepisu",
            paint_added_to_recipe: "Farba dodana do przepisu",
            fill_required_fields: "Proszę wypełnić wszystkie wymagane pola i dodać co najmniej jeden składnik",
            recipe_saved: "Przepis zapisany pomyślnie!",
            invalid_file_format: "Nieprawidłowy format pliku",
            file_read_error: "Błąd odczytu pliku",
            feature_in_development: "Funkcja w rozwoju",
            
            // Stopka
            privacy_policy: "Polityka prywatności",
            terms_of_service: "Warunki korzystania",
            contact_support: "Skontaktuj się z pomocą"
        }
    };

    // ========== КЛАС I18N ==========
    class I18n {
        constructor() {
            this.currentLang = 'uk';
            this.initialized = false;
        }

        // ========== ОСНОВНІ МЕТОДИ ==========
        setLanguage(lang) {
            try {
                if (TRANSLATIONS[lang]) {
                    this.currentLang = lang;
                    localStorage.setItem('sicoMixLanguage', lang);
                    
                    // Оновити HTML атрибут lang
                    document.documentElement.setAttribute('lang', lang);
                    
                    // Застосувати переклади
                    this.applyTranslations();
                    
                    // Повідомити про зміну мови
                    this.dispatchLanguageChangeEvent();
                    
                    return true;
                }
                
                console.warn(`Мова "${lang}" не підтримується. Використовуються українські переклади.`);
                return false;
            } catch (error) {
                console.error('Помилка зміни мови:', error);
                return false;
            }
        }

        getLanguage() {
            return this.currentLang;
        }

        t(key, params = {}) {
            try {
                let translation = TRANSLATIONS[this.currentLang]?.[key];
                
                if (translation === undefined) {
                    // Fallback до української
                    translation = TRANSLATIONS['uk']?.[key];
                    
                    if (translation === undefined) {
                        console.warn(`Ключ перекладу не знайдено: "${key}" для мови: ${this.currentLang}`);
                        return `[${key}]`;
                    }
                }
                
                // Заміна параметрів у тексті
                if (Object.keys(params).length > 0) {
                    Object.keys(params).forEach(param => {
                        const regex = new RegExp(`\\{${param}\\}`, 'g');
                        translation = translation.replace(regex, params[param]);
                    });
                }
                
                return translation;
            } catch (error) {
                console.error('Помилка перекладу:', error);
                return key;
            }
        }

        applyTranslations() {
            try {
                // 1. Текстові елементи з data-i18n
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    const translation = this.t(key);
                    
                    this.applyTranslationToElement(element, translation);
                });
                
                // 2. Плейсхолдери з data-i18n-placeholder
                document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                    const key = element.getAttribute('data-i18n-placeholder');
                    const translation = this.t(key);
                    
                    element.setAttribute('placeholder', translation);
                });
                
                // 3. Тайтли з data-i18n-title
                document.querySelectorAll('[data-i18n-title]').forEach(element => {
                    const key = element.getAttribute('data-i18n-title');
                    const translation = this.t(key);
                    
                    element.setAttribute('title', translation);
                });
                
                // 4. Альт текст з data-i18n-alt
                document.querySelectorAll('[data-i18n-alt]').forEach(element => {
                    const key = element.getAttribute('data-i18n-alt');
                    const translation = this.t(key);
                    
                    element.setAttribute('alt', translation);
                });
                
                // 5. Значення кнопок та input з data-i18n-value
                document.querySelectorAll('[data-i18n-value]').forEach(element => {
                    const key = element.getAttribute('data-i18n-value');
                    const translation = this.t(key);
                    
                    if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                        element.value = translation;
                    }
                });
                
                // 6. Оновлення заголовка сторінки
                document.title = this.t('app_title');
                
                console.log(`Переклади застосовано для мови: ${this.currentLang}`);
            } catch (error) {
                console.error('Помилка застосування перекладів:', error);
            }
        }

        applyTranslationToElement(element, translation) {
            try {
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else if (element.tagName === 'INPUT') {
                    const type = element.getAttribute('type');
                    if (type === 'button' || type === 'submit' || type === 'reset') {
                        element.value = translation;
                    } else if (!element.value || element.value === element.defaultValue) {
                        // Не змінюємо значення, якщо воно введене користувачем
                        element.value = translation;
                    }
                } else if (element.tagName === 'TEXTAREA') {
                    if (!element.value || element.value === element.defaultValue) {
                        element.value = translation;
                    }
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            } catch (error) {
                console.error('Помилка застосування перекладу до елемента:', error);
            }
        }

        getAvailableLanguages() {
            return Object.keys(TRANSLATIONS).map(code => ({
                code,
                name: this.getLanguageName(code),
                nativeName: this.getNativeLanguageName(code)
            }));
        }

        getLanguageName(code) {
            const names = {
                uk: 'Ukrainian',
                en: 'English',
                pl: 'Polish',
                ru: 'Russian',
                de: 'German'
            };
            return names[code] || code.toUpperCase();
        }

        getNativeLanguageName(code) {
            const names = {
                uk: 'Українська',
                en: 'English',
                pl: 'Polski',
                ru: 'Русский',
                de: 'Deutsch'
            };
            return names[code] || code.toUpperCase();
        }

        // ========== УТІЛІТИ ==========
        formatNumber(number, options = {}) {
            const format = this.getNumberFormat();
            const formatter = new Intl.NumberFormat(this.currentLang, {
                minimumFractionDigits: options.minDigits || 0,
                maximumFractionDigits: options.maxDigits || 2,
                useGrouping: true
            });
            
            return formatter.format(number);
        }

        formatDate(date, format = 'medium') {
            const dateObj = new Date(date);
            const formatter = new Intl.DateTimeFormat(this.currentLang, {
                dateStyle: format === 'short' ? 'short' : 'medium',
                timeStyle: format === 'datetime' ? 'short' : undefined
            });
            
            return formatter.format(dateObj);
        }

        getNumberFormat() {
            const formats = {
                uk: 'comma',
                en: 'dot',
                pl: 'comma',
                ru: 'comma',
                de: 'comma'
            };
            return formats[this.currentLang] || 'comma';
        }

        getDateFormat() {
            const formats = {
                uk: 'DD.MM.YYYY',
                en: 'MM/DD/YYYY',
                pl: 'DD.MM.YYYY',
                ru: 'DD.MM.YYYY',
                de: 'DD.MM.YYYY'
            };
            return formats[this.currentLang] || 'DD.MM.YYYY';
        }

        // ========== ПОДІЇ ==========
        dispatchLanguageChangeEvent() {
            const event = new CustomEvent('languageChanged', {
                detail: { language: this.currentLang }
            });
            document.dispatchEvent(event);
        }

        addLanguageChangeListener(callback) {
            document.addEventListener('languageChanged', (event) => {
                callback(event.detail.language);
            });
        }

        // ========== ІНІЦІАЛІЗАЦІЯ ==========
        init() {
            try {
                if (this.initialized) {
                    console.warn('I18n вже ініціалізовано');
                    return this.currentLang;
                }
                
                // Визначення мови
                const savedLang = localStorage.getItem('sicoMixLanguage');
                const browserLang = navigator.language.split('-')[0];
                
                let targetLang = 'uk';
                
                if (savedLang && TRANSLATIONS[savedLang]) {
                    targetLang = savedLang;
                } else if (TRANSLATIONS[browserLang]) {
                    targetLang = browserLang;
                }
                
                // Встановлення мови
                this.setLanguage(targetLang);
                
                this.initialized = true;
                console.log(`I18n ініціалізовано з мовою: ${targetLang}`);
                
                return this.currentLang;
            } catch (error) {
                console.error('Помилка ініціалізації I18n:', error);
                return 'uk';
            }
        }

        // ========== ДИНАМІЧНІ ПЕРЕКЛАДИ ==========
        addTranslations(lang, newTranslations) {
            try {
                if (!TRANSLATIONS[lang]) {
                    TRANSLATIONS[lang] = {};
                }
                
                Object.assign(TRANSLATIONS[lang], newTranslations);
                
                // Якщо це поточна мова, оновити переклади
                if (lang === this.currentLang) {
                    this.applyTranslations();
                }
                
                return true;
            } catch (error) {
                console.error('Помилка додавання перекладів:', error);
                return false;
            }
        }

        removeTranslation(lang, key) {
            try {
                if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                    delete TRANSLATIONS[lang][key];
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Помилка видалення перекладу:', error);
                return false;
            }
        }

        // ========== ДЕТЕКТУВАННЯ МОВИ ==========
        detectUserLanguage() {
            try {
                // 1. Збережена в localStorage
                const savedLang = localStorage.getItem('sicoMixLanguage');
                if (savedLang && TRANSLATIONS[savedLang]) {
                    return savedLang;
                }
                
                // 2. Мова браузера
                const browserLang = navigator.language.split('-')[0];
                if (TRANSLATIONS[browserLang]) {
                    return browserLang;
                }
                
                // 3. Геолокація (спрощено)
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (timezone.includes('Europe/Kiev') || timezone.includes('Europe/Kyiv')) {
                    return 'uk';
                }
                
                // 4. Мова системи
                const systemLang = navigator.languages?.[0]?.split('-')[0];
                if (systemLang && TRANSLATIONS[systemLang]) {
                    return systemLang;
                }
                
                return 'uk';
            } catch (error) {
                console.error('Помилка детектування мови:', error);
                return 'uk';
            }
        }

        // ========== ПЕРЕВІРКА ПЕРЕКЛАДІВ ==========
        getMissingTranslations(lang = null) {
            const targetLang = lang || this.currentLang;
            const baseLang = 'uk';
            const missing = [];
            
            if (!TRANSLATIONS[targetLang]) {
                return [`Мова "${targetLang}" не знайдена`];
            }
            
            // Порівняння з базовою мовою (українською)
            Object.keys(TRANSLATIONS[baseLang]).forEach(key => {
                if (!TRANSLATIONS[targetLang][key]) {
                    missing.push(key);
                }
            });
            
            return missing;
        }

        validateTranslations(lang = null) {
            const targetLang = lang || this.currentLang;
            const missing = this.getMissingTranslations(targetLang);
            
            if (missing.length > 0) {
                console.warn(`Відсутні переклади для мови "${targetLang}":`, missing);
                return {
                    valid: false,
                    missingCount: missing.length,
                    missingKeys: missing
                };
            }
            
            return {
                valid: true,
                missingCount: 0,
                missingKeys: []
            };
        }
    }

    // ========== ЕКСПОРТ ==========
    SICOMIX.i18n = new I18n();
    
    // Автоматична ініціалізація при завантаженні
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            SICOMIX.i18n.init();
        }, 100);
    });
    
    // Експорт глобальних функцій
    window.t = (key, params) => SICOMIX.i18n.t(key, params);
    window.setLanguage = (lang) => SICOMIX.i18n.setLanguage(lang);
    window.getLanguage = () => SICOMIX.i18n.getLanguage();
    
    console.log('I18n модуль завантажено');
})();
