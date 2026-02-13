// ========== МОДУЛЬ ІНТЕРНАЦІОНАЛІЗАЦІЇ (ВИПРАВЛЕНО) ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

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
                // ... (додайте ваш англійський переклад або залиште коментар)
            },
            pl: {
                // ... (додайте ваш польський переклад або залиште коментар)
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
                console.warn(`⚠️ Missing translation key: ${key} [${currentLang}]`);
                return translations['uk'][key] || key;
            }
            return translation;
        }

        function applyTranslations() {
            if (!document || !document.querySelectorAll) return;

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

})(window);
