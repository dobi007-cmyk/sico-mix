// Система інтернаціоналізації
const i18n = {
    translations: {
        uk: {
            // Загальні
            'app.title': 'SICOMIX - Каталог фарб',
            'app.welcome': 'Ласкаво просимо до каталогу фарб SICOMIX!',
            'app.loading': 'Завантаження...',
            'app.save': 'Зберегти',
            'app.cancel': 'Скасувати',
            'app.delete': 'Видалити',
            'app.edit': 'Редагувати',
            'app.close': 'Закрити',
            'app.search': 'Пошук...',
            
            // Навігація
            'nav.home': 'Головна',
            'nav.series': 'Серії фарб',
            'nav.colors': 'Кольори',
            'nav.recipes': 'Рецепти',
            'nav.calculator': 'Калькулятор',
            'nav.settings': 'Налаштування',
            
            // Статистика
            'stats.series': 'Серії фарб',
            'stats.colors': 'Кольори',
            'stats.paints': 'Фарби',
            'stats.available': 'доступних',
            'stats.seriesCount': 'доступних серій',
            'stats.colorsCount': 'базових кольорів',
            'stats.paintsCount': 'доступних фарб',
            
            // Кнопки
            'btn.viewSeries': 'Переглянути серії',
            'btn.findColor': 'Знайти колір',
            'btn.createRecipe': 'Створити рецепт',
            'btn.addColor': 'Додати колір',
            'btn.export': 'Експортувати',
            'btn.import': 'Імпортувати',
            'btn.reset': 'Скинути',
            'btn.calculate': 'Розрахувати',
            
            // Фільтри
            'filter.allCategories': 'Всі категорії',
            'filter.allSeries': 'Всі серії',
            'filter.allTypes': 'Всі типи',
            'filter.byCode': 'Пошук за кодом або назвою...',
            
            // Серії
            'series.type': 'Тип',
            'series.finish': 'Фініш',
            'series.drying': 'Сушіння',
            'series.mesh': 'Сито',
            'series.cleaning': 'Чищення',
            'series.storage': 'Зберігання',
            'series.resistance': 'Стійкість',
            'series.additionalProducts': 'Додаткові продукти',
            
            // Кольори
            'color.code': 'Код',
            'color.name': 'Назва',
            'color.series': 'Серія',
            'color.manufacturer': 'Виробник',
            'color.article': 'Артикул',
            'color.hex': 'HEX колір',
            'color.addToRecipe': 'Додати до рецепту',
            'color.viewSeriesColors': 'Переглянути кольори цієї серії',
            
            // Рецепти
            'recipes.myRecipes': 'Мої рецепти',
            'recipes.newRecipe': 'Новий рецепт',
            'recipes.recipeName': 'Назва рецепту',
            'recipes.category': 'Категорія',
            'recipes.description': 'Опис',
            'recipes.ingredients': 'Інгредієнти',
            'recipes.addIngredient': 'Додати інгредієнт',
            'recipes.amount': 'Кількість',
            'recipes.unit': 'Одиниця',
            'recipes.percentage': 'Відсоток',
            'recipes.date': 'Дата',
            'recipes.noRecipes': 'Рецептів ще немає. Створіть перший!',
            
            // Калькулятор
            'calculator.title': 'Калькулятор фарби',
            'calculator.printArea': 'Площа друку (м²)',
            'calculator.paintConsumption': 'Витрата фарби (м²/л)',
            'calculator.colorCount': 'Кількість кольорів',
            'calculator.totalPaint': 'Загальна кількість фарби',
            'calculator.paintPerColor': 'На один колір',
            'calculator.paintInGrams': 'У грамах (приблизно)',
            
            // Налаштування
            'settings.title': 'Налаштування',
            'settings.language': 'Мова інтерфейсу',
            'settings.units': 'Одиниці вимірювання',
            'settings.theme': 'Тема інтерфейсу',
            'settings.autoSave': 'Автозбереження',
            'settings.precision': 'Точність розрахунків',
            'settings.saveSettings': 'Зберегти налаштування',
            'settings.resetSettings': 'Скинути до стандартних',
            'settings.exportData': 'Експортувати дані',
            'settings.clearData': 'Очистити всі дані',
            'settings.decimalPlaces': 'знаків після коми',
            
            // Темі
            'theme.light': 'Світла',
            'theme.dark': 'Темна',
            'theme.auto': 'Авто',
            
            // Одиниці
            'unit.grams': 'Грами',
            'unit.kg': 'Кілограми',
            'unit.ml': 'Мілілітри',
            'unit.l': 'Літри',
            'unit.pcs': 'Штуки',
            'unit.percent': 'Відсотки',
            
            // Повідомлення
            'message.settingsSaved': 'Налаштування збережено!',
            'message.recipeSaved': 'Рецепт збережено!',
            'message.recipeDeleted': 'Рецепт видалено',
            'message.colorAdded': 'Фарбу додано до рецепту',
            'message.dataExported': 'Дані експортовано!',
            'message.languageChanged': 'Мову змінено. Оновіть сторінку для застосування.',
            'message.confirmReset': 'Скинути налаштування до стандартних?',
            'message.confirmDelete': 'Видалити цей рецепт?',
            'message.confirmClear': 'Ця дія видалить всі ваші рецепти та налаштування. Продовжити?',
            
            // Категорії
            'category.universal': 'Універсальні',
            'category.textile': 'Текстиль',
            'category.paper': 'Папір/картон',
            'category.plastics': 'Пластики',
            'category.uv': 'UV фарби',
            'category.metallic': 'Металік',
            'category.pearl': 'Перламутр',
            'category.fluorescent': 'Флуоресцентні',
            'category.cmyk': 'CMYK'
        },
        
        en: {
            // General
            'app.title': 'SICOMIX - Paint Catalog',
            'app.welcome': 'Welcome to SICOMIX Paint Catalog!',
            'app.loading': 'Loading...',
            'app.save': 'Save',
            'app.cancel': 'Cancel',
            'app.delete': 'Delete',
            'app.edit': 'Edit',
            'app.close': 'Close',
            'app.search': 'Search...',
            
            // Navigation
            'nav.home': 'Home',
            'nav.series': 'Paint Series',
            'nav.colors': 'Colors',
            'nav.recipes': 'Recipes',
            'nav.calculator': 'Calculator',
            'nav.settings': 'Settings',
            
            // Statistics
            'stats.series': 'Paint Series',
            'stats.colors': 'Colors',
            'stats.paints': 'Paints',
            'stats.available': 'available',
            'stats.seriesCount': 'available series',
            'stats.colorsCount': 'base colors',
            'stats.paintsCount': 'available paints',
            
            // Buttons
            'btn.viewSeries': 'View Series',
            'btn.findColor': 'Find Color',
            'btn.createRecipe': 'Create Recipe',
            'btn.addColor': 'Add Color',
            'btn.export': 'Export',
            'btn.import': 'Import',
            'btn.reset': 'Reset',
            'btn.calculate': 'Calculate',
            
            // Filters
            'filter.allCategories': 'All Categories',
            'filter.allSeries': 'All Series',
            'filter.allTypes': 'All Types',
            'filter.byCode': 'Search by code or name...',
            
            // Series
            'series.type': 'Type',
            'series.finish': 'Finish',
            'series.drying': 'Drying',
            'series.mesh': 'Mesh',
            'series.cleaning': 'Cleaning',
            'series.storage': 'Storage',
            'series.resistance': 'Resistance',
            'series.additionalProducts': 'Additional Products',
            
            // Colors
            'color.code': 'Code',
            'color.name': 'Name',
            'color.series': 'Series',
            'color.manufacturer': 'Manufacturer',
            'color.article': 'Article',
            'color.hex': 'HEX Color',
            'color.addToRecipe': 'Add to Recipe',
            'color.viewSeriesColors': 'View Colors of This Series',
            
            // Recipes
            'recipes.myRecipes': 'My Recipes',
            'recipes.newRecipe': 'New Recipe',
            'recipes.recipeName': 'Recipe Name',
            'recipes.category': 'Category',
            'recipes.description': 'Description',
            'recipes.ingredients': 'Ingredients',
            'recipes.addIngredient': 'Add Ingredient',
            'recipes.amount': 'Amount',
            'recipes.unit': 'Unit',
            'recipes.percentage': 'Percentage',
            'recipes.date': 'Date',
            'recipes.noRecipes': 'No recipes yet. Create the first one!',
            
            // Calculator
            'calculator.title': 'Paint Calculator',
            'calculator.printArea': 'Print Area (m²)',
            'calculator.paintConsumption': 'Paint Consumption (m²/l)',
            'calculator.colorCount': 'Number of Colors',
            'calculator.totalPaint': 'Total Paint Amount',
            'calculator.paintPerColor': 'Per Color',
            'calculator.paintInGrams': 'In Grams (approx)',
            
            // Settings
            'settings.title': 'Settings',
            'settings.language': 'Interface Language',
            'settings.units': 'Measurement Units',
            'settings.theme': 'Interface Theme',
            'settings.autoSave': 'Auto Save',
            'settings.precision': 'Calculation Precision',
            'settings.saveSettings': 'Save Settings',
            'settings.resetSettings': 'Reset to Default',
            'settings.exportData': 'Export Data',
            'settings.clearData': 'Clear All Data',
            'settings.decimalPlaces': 'decimal places',
            
            // Themes
            'theme.light': 'Light',
            'theme.dark': 'Dark',
            'theme.auto': 'Auto',
            
            // Units
            'unit.grams': 'Grams',
            'unit.kg': 'Kilograms',
            'unit.ml': 'Milliliters',
            'unit.l': 'Liters',
            'unit.pcs': 'Pieces',
            'unit.percent': 'Percent',
            
            // Messages
            'message.settingsSaved': 'Settings saved!',
            'message.recipeSaved': 'Recipe saved!',
            'message.recipeDeleted': 'Recipe deleted',
            'message.colorAdded': 'Paint added to recipe',
            'message.dataExported': 'Data exported!',
            'message.languageChanged': 'Language changed. Refresh page to apply.',
            'message.confirmReset': 'Reset settings to default?',
            'message.confirmDelete': 'Delete this recipe?',
            'message.confirmClear': 'This will delete all your recipes and settings. Continue?',
            
            // Categories
            'category.universal': 'Universal',
            'category.textile': 'Textile',
            'category.paper': 'Paper/Cardboard',
            'category.plastics': 'Plastics',
            'category.uv': 'UV Paints',
            'category.metallic': 'Metallic',
            'category.pearl': 'Pearl',
            'category.fluorescent': 'Fluorescent',
            'category.cmyk': 'CMYK'
        },
        
        pl: {
            // Ogólne
            'app.title': 'SICOMIX - Katalog farb',
            'app.welcome': 'Witamy w katalogu farb SICOMIX!',
            'app.loading': 'Ładowanie...',
            'app.save': 'Zapisz',
            'app.cancel': 'Anuluj',
            'app.delete': 'Usuń',
            'app.edit': 'Edytuj',
            'app.close': 'Zamknij',
            'app.search': 'Szukaj...',
            
            // Nawigacja
            'nav.home': 'Strona główna',
            'nav.series': 'Serie farb',
            'nav.colors': 'Kolory',
            'nav.recipes': 'Receptury',
            'nav.calculator': 'Kalkulator',
            'nav.settings': 'Ustawienia',
            
            // Statystyki
            'stats.series': 'Serie farb',
            'stats.colors': 'Kolory',
            'stats.paints': 'Farby',
            'stats.available': 'dostępnych',
            'stats.seriesCount': 'dostępnych serii',
            'stats.colorsCount': 'kolorów bazowych',
            'stats.paintsCount': 'dostępnych farb',
            
            // Przyciski
            'btn.viewSeries': 'Przeglądaj serie',
            'btn.findColor': 'Znajdź kolor',
            'btn.createRecipe': 'Utwórz recepturę',
            'btn.addColor': 'Dodaj kolor',
            'btn.export': 'Eksportuj',
            'btn.import': 'Importuj',
            'btn.reset': 'Resetuj',
            'btn.calculate': 'Oblicz',
            
            // Filtry
            'filter.allCategories': 'Wszystkie kategorie',
            'filter.allSeries': 'Wszystkie serie',
            'filter.allTypes': 'Wszystkie typy',
            'filter.byCode': 'Szukaj według kodu lub nazwy...',
            
            // Serie
            'series.type': 'Typ',
            'series.finish': 'Wykończenie',
            'series.drying': 'Suszanie',
            'series.mesh': 'Sito',
            'series.cleaning': 'Czyszczenie',
            'series.storage': 'Przechowywanie',
            'series.resistance': 'Odporność',
            'series.additionalProducts': 'Produkty dodatkowe',
            
            // Kolory
            'color.code': 'Kod',
            'color.name': 'Nazwa',
            'color.series': 'Seria',
            'color.manufacturer': 'Producent',
            'color.article': 'Artykuł',
            'color.hex': 'Kolor HEX',
            'color.addToRecipe': 'Dodaj do receptury',
            'color.viewSeriesColors': 'Zobacz kolory tej serii',
            
            // Receptury
            'recipes.myRecipes': 'Moje receptury',
            'recipes.newRecipe': 'Nowa receptura',
            'recipes.recipeName': 'Nazwa receptury',
            'recipes.category': 'Kategoria',
            'recipes.description': 'Opis',
            'recipes.ingredients': 'Składniki',
            'recipes.addIngredient': 'Dodaj składnik',
            'recipes.amount': 'Ilość',
            'recipes.unit': 'Jednostka',
            'recipes.percentage': 'Procent',
            'recipes.date': 'Data',
            'recipes.noRecipes': 'Brak receptur. Utwórz pierwszą!',
            
            // Kalkulator
            'calculator.title': 'Kalkulator farby',
            'calculator.printArea': 'Powierzchnia druku (m²)',
            'calculator.paintConsumption': 'Zużycie farby (m²/l)',
            'calculator.colorCount': 'Liczba kolorów',
            'calculator.totalPaint': 'Całkowita ilość farby',
            'calculator.paintPerColor': 'Na jeden kolor',
            'calculator.paintInGrams': 'W gramach (w przybliżeniu)',
            
            // Ustawienia
            'settings.title': 'Ustawienia',
            'settings.language': 'Język interfejsu',
            'settings.units': 'Jednostki miary',
            'settings.theme': 'Motyw interfejsu',
            'settings.autoSave': 'Autozapisywanie',
            'settings.precision': 'Dokładność obliczeń',
            'settings.saveSettings': 'Zapisz ustawienia',
            'settings.resetSettings': 'Przywróć domyślne',
            'settings.exportData': 'Eksportuj dane',
            'settings.clearData': 'Wyczyść wszystkie dane',
            'settings.decimalPlaces': 'miejsc po przecinku',
            
            // Motywy
            'theme.light': 'Jasny',
            'theme.dark': 'Ciemny',
            'theme.auto': 'Auto',
            
            // Jednostki
            'unit.grams': 'Gramy',
            'unit.kg': 'Kilogramy',
            'unit.ml': 'Mililitry',
            'unit.l': 'Litry',
            'unit.pcs': 'Sztuki',
            'unit.percent': 'Procenty',
            
            // Komunikaty
            'message.settingsSaved': 'Ustawienia zapisane!',
            'message.recipeSaved': 'Receptura zapisana!',
            'message.recipeDeleted': 'Receptura usunięta',
            'message.colorAdded': 'Farba dodana do receptury',
            'message.dataExported': 'Dane wyeksportowane!',
            'message.languageChanged': 'Język zmieniony. Odśwież stronę, aby zastosować.',
            'message.confirmReset': 'Przywrócić ustawienia domyślne?',
            'message.confirmDelete': 'Usunąć tę recepturę?',
            'message.confirmClear': 'Spowoduje to usunięcie wszystkich receptur i ustawień. Kontynuować?',
            
            // Kategorie
            'category.universal': 'Uniwersalne',
            'category.textile': 'Tekstylia',
            'category.paper': 'Papier/tektura',
            'category.plastics': 'Tworzywa sztuczne',
            'category.uv': 'Farby UV',
            'category.metallic': 'Metalik',
            'category.pearl': 'Perłowe',
            'category.fluorescent': 'Fluorescencyjne',
            'category.cmyk': 'CMYK'
        }
    },
    
    // Поточна мова
    currentLang: 'uk',
    
    // Ініціалізація
    init: function() {
        // Встановлення мови з налаштувань або браузера
        const savedLang = localStorage.getItem('sicomix_language');
        const browserLang = navigator.language.split('-')[0];
        
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        } else if (this.translations[browserLang]) {
            this.currentLang = browserLang;
        }
        
        // Застосування перекладів
        this.applyTranslations();
    },
    
    // Зміна мови
    setLanguage: function(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('sicomix_language', lang);
            this.applyTranslations();
            return true;
        }
        return false;
    },
    
    // Отримання перекладу
    t: function(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Повернення ключа, якщо переклад не знайдено
                return key;
            }
        }
        
        return value;
    },
    
    // Застосування перекладів до сторінки
    applyTranslations: function() {
        // Пошук всіх елементів з атрибутом data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Оновлення заголовка сторінки
        document.title = this.t('app.title');
    },
    
    // Отримання поточної мови
    getCurrentLanguage: function() {
        return this.currentLang;
    },
    
    // Отримання списку доступних мов
    getAvailableLanguages: function() {
        return Object.keys(this.translations);
    },
    
    // Форматування числа згідно з локаллю
    formatNumber: function(number, options = {}) {
        return new Intl.NumberFormat(this.currentLang, options).format(number);
    },
    
    // Форматування дати згідно з локаллю
    formatDate: function(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        
        const mergedOptions = { ...defaultOptions, ...options };
        return new Date(date).toLocaleDateString(this.currentLang, mergedOptions);
    },
    
    // Форматування часу
    formatTime: function(date, options = {}) {
        const defaultOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const mergedOptions = { ...defaultOptions, ...options };
        return new Date(date).toLocaleTimeString(this.currentLang, mergedOptions);
    }
};

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
