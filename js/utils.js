// Утилітні функції
const utils = {
    // Форматування числа
    formatNumber: function(num, decimals = 2) {
        return parseFloat(num).toFixed(decimals);
    },

    // Генерація унікального ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Конвертація одиниць вимірювання
    convertUnits: function(value, fromUnit, toUnit) {
        const conversions = {
            'г': { 'кг': 0.001, 'мл': 1, 'л': 0.001 },
            'кг': { 'г': 1000, 'мл': 1000, 'л': 1 },
            'мл': { 'г': 1, 'кг': 0.001, 'л': 0.001 },
            'л': { 'г': 1000, 'кг': 1, 'мл': 1000 }
        };
        
        if (fromUnit === toUnit) return value;
        if (!conversions[fromUnit] || !conversions[fromUnit][toUnit]) {
            console.error('Неможлива конвертація:', fromUnit, '->', toUnit);
            return value;
        }
        
        return value * conversions[fromUnit][toUnit];
    },

    // Обчислення відсотків
    calculatePercentages: function(ingredients) {
        const total = ingredients.reduce((sum, ing) => sum + ing.amount, 0);
        return ingredients.map(ing => ({
            ...ing,
            percentage: total > 0 ? (ing.amount / total * 100).toFixed(1) : 0
        }));
    },

    // Перевірка HEX кольору
    isValidHexColor: function(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    },

    // Темний/світлий текст для кольору
    getContrastColor: function(hexColor) {
        // Конвертація HEX в RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // Формула яскравості
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        return brightness > 128 ? '#000000' : '#FFFFFF';
    },

    // Збереження в localStorage з обробкою помилок
    saveToStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Помилка збереження в localStorage:', e);
            return false;
        }
    },

    // Завантаження з localStorage
    loadFromStorage: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Помилка завантаження з localStorage:', e);
            return null;
        }
    },

    // Експорт даних у файл
    exportToFile: function(data, filename, type = 'application/json') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    // Імпорт даних з файлу
    importFromFile: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Невірний формат файлу'));
                }
            };
            reader.onerror = () => reject(new Error('Помилка читання файлу'));
            reader.readAsText(file);
        });
    },

    // Фільтрація масиву
    filterArray: function(array, filters) {
        return array.filter(item => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                if (typeof item[key] === 'string') {
                    return item[key].toLowerCase().includes(filters[key].toLowerCase());
                }
                return item[key] == filters[key];
            });
        });
    },

    // Сортування масиву
    sortArray: function(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    },

    // Форматування дати
    formatDate: function(date, format = 'uk-UA') {
        const d = new Date(date);
        return d.toLocaleDateString(format, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    },

    // Копіювання в буфер обміну
    copyToClipboard: function(text) {
        return navigator.clipboard.writeText(text)
            .then(() => true)
            .catch(() => {
                // Fallback для старих браузерів
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            });
    },

    // Обмеження частоти викликів (debounce)
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
