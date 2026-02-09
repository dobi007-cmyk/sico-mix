/* ==========================================
   SICO MIX — PRO i18n Engine
========================================== */

window.SICOMIX = window.SICOMIX || {};

SICOMIX.i18n = (() => {

    const STORAGE_KEY = 'sicomix_language';

    let currentLang = 'uk';

    /* ================= TRANSLATIONS ================= */

    const translations = {

        uk: {
            home: "Головна",
            new_recipe: "Новий рецепт",
            recipes: "Рецепти",
            catalog: "Каталог фарб",
            settings: "Налаштування",
            save: "Зберегти",
            cancel: "Скасувати",
            delete: "Видалити",
            export: "Експорт",
            import: "Імпорт",
            welcome_title: "Ласкаво просимо до SICO MIX",
            add_ingredient: "Додати інгредієнт",
            save_recipe: "Зберегти рецепт"
        },

        en: {
            home: "Home",
            new_recipe: "New Recipe",
            recipes: "Recipes",
            catalog: "Paint Catalog",
            settings: "Settings",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            export: "Export",
            import: "Import",
            welcome_title: "Welcome to SICO MIX",
            add_ingredient: "Add Ingredient",
            save_recipe: "Save Recipe"
        },

        pl: {
            home: "Strona główna",
            new_recipe: "Nowa receptura",
            recipes: "Receptury",
            catalog: "Katalog farb",
            settings: "Ustawienia",
            save: "Zapisz",
            cancel: "Anuluj",
            delete: "Usuń",
            export: "Eksport",
            import: "Import",
            welcome_title: "Witamy w SICO MIX",
            add_ingredient: "Dodaj składnik",
            save_recipe: "Zapisz recepturę"
        }
    };


    /* ================= CORE ================= */

    function translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {

            const key = el.dataset.i18n;
            const value =
                translations[currentLang][key] ||
                translations['uk'][key] ||
                key;

            el.textContent = value;
        });
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;

        currentLang = lang;

        SICOMIX.utils.storage.save(STORAGE_KEY, lang);

        translatePage();
    }

    function getLanguage() {
        return currentLang;
    }

    function t(key) {
        return (
            translations[currentLang][key] ||
            translations['uk'][key] ||
            key
        );
    }

    /* ================= INIT ================= */

    function init() {

        const saved =
            SICOMIX.utils.storage.load(STORAGE_KEY);

        if (saved && translations[saved]) {
            currentLang = saved;
        }

        translatePage();

        const select = document.getElementById('languageSelect');

        if (select) {
            select.value = currentLang;

            select.addEventListener('change', e =>
                setLanguage(e.target.value)
            );
        }
    }

    /* ================= PUBLIC ================= */

    return {
        init,
        setLanguage,
        getLanguage,
        t
    };

})();