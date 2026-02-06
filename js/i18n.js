// ========== СИСТЕМА ІНТЕРНАЦІОНАЛІЗАЦІЇ ==========
const i18n = {
    // Поточна мова
    currentLanguage: 'uk',
    
    // Словники перекладів
    translations: {
        uk: {
            // Загальні
            appName: "SICO MIX",
            appDescription: "Система управління рецептами фарб",
            
            // Навігація
            home: "Головна",
            newRecipe: "Новий рецепт",
            recipes: "Рецепти",
            catalog: "Каталог фарб",
            import: "Імпорт",
            export: "Експорт",
            settings: "Налаштування",
            
            // Кнопки
            save: "Зберегти",
            cancel: "Скасувати",
            delete: "Видалити",
            edit: "Редагувати",
            add: "Додати",
            search: "Пошук",
            print: "Друк",
            
            // Повідомлення
            loading: "Завантаження...",
            saved: "Збережено!",
            deleted: "Видалено",
            error: "Помилка",
            success: "Успіх",
            warning: "Увага",
            
            // Тексти сторінок
            welcomeTitle: "Ласкаво просимо до SICO MIX",
            welcomeSubtitle: "Професійна система управління рецептами фарб для створення, зберігання та аналізу ваших кольорових рішень",
            
            // Підписи полів
            recipeName: "Назва рецепту",
            recipeCategory: "Категорія",
            recipeColor: "Колір",
            recipeDescription: "Опис рецепту",
            recipePhoto: "Фото рецепту",
            
            // Помилки
            requiredField: "Це поле обов'язкове",
            invalidEmail: "Невірний формат email",
            invalidNumber: "Невірне число",
            
            // Підтвердження
            confirmDelete: "Ви впевнені, що хочете видалити?",
            confirmAction: "Ви впевнені, що хочете виконати цю дію?",
            
            // Статистика
            paintsInCatalog: "фарб у каталозі",
            totalRecipes: "всього рецептів",
            lastUpdated: "останнє оновлення"
        },
        en: {
            // General
            appName: "SICO MIX",
            appDescription: "Paint Recipe Management System",
            
            // Navigation
            home: "Home",
            newRecipe: "New Recipe",
            recipes: "Recipes",
            catalog: "Paint Catalog",
            import: "Import",
            export: "Export",
            settings: "Settings",
            
            // Buttons
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            add: "Add",
            search: "Search",
            print: "Print",
            
            // Messages
            loading: "Loading...",
            saved: "Saved!",
            deleted: "Deleted",
            error: "Error",
            success: "Success",
            warning: "Warning",
            
            // Page texts
            welcomeTitle: "Welcome to SICO MIX",
            welcomeSubtitle: "Professional paint recipe management system for creating, storing and analyzing your color solutions",
            
            // Field labels
            recipeName: "Recipe name",
            recipeCategory: "Category",
            recipeColor: "Color",
            recipeDescription: "Recipe description",
            recipePhoto: "Recipe photo",
            
            // Errors
            requiredField: "This field is required",
            invalidEmail: "Invalid email format",
            invalidNumber: "Invalid number",
            
            // Confirmations
            confirmDelete: "Are you sure you want to delete?",
            confirmAction: "Are you sure you want to perform this action?",
            
            // Statistics
            paintsInCatalog: "paints in catalog",
            totalRecipes: "total recipes",
            lastUpdated: "last updated"
        },
        pl: {
            // Ogólne
            appName: "SICO MIX",
            appDescription: "System zarządzania recepturami farb",
            
            // Nawigacja
            home: "Strona główna",
            newRecipe: "Nowy przepis",
            recipes: "Przepisy",
            catalog: "Katalog farb",
            import: "Import",
            export: "Eksport",
            settings: "Ustawienia",
            
            // Przyciski
            save: "Zapisz",
            cancel: "Anuluj",
            delete: "Usuń",
            edit: "Edytuj",
            add: "Dodaj",
            search: "Szukaj",
            print: "Drukuj",
            
            // Komunikaty
            loading: "Ładowanie...",
            saved: "Zapisano!",
            deleted: "Usunięto",
            error: "Błąd",
            success: "Sukces",
            warning: "Ostrzeżenie",
            
            // Teksty stron
            welcomeTitle: "Witamy w SICO MIX",
            welcomeSubtitle: "Profesjonalny system zarządzania recepturami farb do tworzenia, przechowywania i analizowania rozwiązań kolorystycznych",
            
            // Etykiety pól
            recipeName: "Nazwa przepisu",
            recipeCategory: "Kategoria",
            recipeColor: "Kolor",
            recipeDescription: "Opis przepisu",
            recipePhoto: "Zdjęcie przepisu",
            
            // Błędy
            requiredField: "To pole jest wymagane",
            invalidEmail: "Nieprawidłowy format email",
            invalidNumber: "Nieprawidłowa liczba",
            
            // Potwierdzenia
            confirmDelete: "Czy na pewno chcesz usunąć?",
            confirmAction: "Czy na pewno chcesz wykonać tę akcję?",
            
            // Statystyki
            paintsInCatalog: "farb w katalogu",
            totalRecipes: "wszystkich przepisów",
            lastUpdated: "ostatnia aktualizacja"
        }
    },
    
    // Змінити мову
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.applyTranslations();
            localStorage.setItem('sicoMixLanguage', lang);
            return true;
        }
        return false;
    },
    
    // Отримати переклад
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    },
    
    // Застосувати переклади до всіх елементів
    applyTranslations() {
        // Оновлення тексту в елементах з атрибутом data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Оновлення заголовка сторінки
        document.title = `${this.t('appName')} • ${this.t('appDescription')}`;
    },
    
    // Ініціалізація мови
    initialize() {
        const savedLanguage = localStorage.getItem('sicoMixLanguage') || 'uk';
        this.setLanguage(savedLanguage);
        
        // Оновлення вибору мови в налаштуваннях
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }
};

// Ініціалізація i18n при завантаженні
function initializeI18n() {
    i18n.initialize();
}

// Експорт для використання в інших файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
