// i18n.js
// Інтернаціоналізація

const translations = {
    uk: {
        welcomeTitle: "Ласкаво просимо до SICO MIX",
        welcomeSubtitle: "Професійна система управління рецептами фарб для створення, зберігання та аналізу ваших кольорових рішень",
        newRecipe: "Новий рецепт",
        myRecipes: "Мої рецепти",
        paintCatalog: "Каталог фарб",
        exportData: "Експорт даних",
        // ... інші переклади
    },
    en: {
        welcomeTitle: "Welcome to SICO MIX",
        welcomeSubtitle: "Professional paint recipe management system for creating, storing and analyzing your color solutions",
        newRecipe: "New recipe",
        myRecipes: "My recipes",
        paintCatalog: "Paint catalog",
        exportData: "Export data",
        // ... інші переклади
    },
    pl: {
        welcomeTitle: "Witamy w SICO MIX",
        welcomeSubtitle: "Profesjonalny system zarządzania przepisami farb do tworzenia, przechowywania i analizowania rozwiązań kolorystycznych",
        newRecipe: "Nowy przepis",
        myRecipes: "Moje przepisy",
        paintCatalog: "Katalog farb",
        exportData: "Eksport danych",
        // ... інші переклади
    }
};

let currentLanguage = 'uk';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        applyTranslations();
        localStorage.setItem('sicoMixLanguage', lang);
    }
}

function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

function applyTranslations() {
    // Застосовуємо переклади до елементів з data-i18n атрибутом
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (element.tagName === 'INPUT' && element.type === 'placeholder') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
}

// Завантажуємо збережену мову
const savedLanguage = localStorage.getItem('sicoMixLanguage');
if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
}

// Застосовуємо переклади при завантаженні
document.addEventListener('DOMContentLoaded', applyTranslations);