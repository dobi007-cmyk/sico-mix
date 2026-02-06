// ========== УТІЛІТИ ДЛЯ РОБОТИ З ДАНИМИ ==========
const Utils = {
    // Форматування дати
    formatDate(date, format = 'dd.mm.yyyy') {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        
        switch (format) {
            case 'dd.mm.yyyy':
                return `${day}.${month}.${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            default:
                return d.toLocaleDateString();
        }
    },
    
    // Форматування числа
    formatNumber(num, decimals = 2) {
        return parseFloat(num).toFixed(decimals);
    },
    
    // Генерація унікального ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Копіювання тексту в буфер обміну
    copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback для старих браузерів
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                document.body.removeChild(textArea);
            }
        });
    },
    
    // Завантаження файлу
    downloadFile(filename, content, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Читання файлу
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    },
    
    // Валідація email
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Валідація HEX кольору
    isValidHexColor(color) {
        const re = /^#([0-9A-F]{3}){1,2}$/i;
        return re.test(color);
    },
    
    // Фільтрація масиву
    filterArray(array, filters) {
        return array.filter(item => {
            for (const key in filters) {
                if (filters[key] && item[key] !== filters[key]) {
                    return false;
                }
            }
            return true;
        });
    },
    
    // Сортування масиву
    sortArray(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
    },
    
    // Дебаунс функція
    debounce(func, wait) {
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

// ========== ФУНКЦІЇ ДЛЯ РОБОТИ З ЛОКАЛЬНИМ СХОВИЩЕМ ==========
const Storage = {
    // Зберегти дані
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Помилка збереження даних:', error);
            return false;
        }
    },
    
    // Завантажити дані
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Помилка завантаження даних:', error);
            return defaultValue;
        }
    },
    
    // Видалити дані
    remove(key) {
        localStorage.removeItem(key);
    },
    
    // Очистити всі дані
    clear() {
        localStorage.clear();
    },
    
    // Отримати всі ключі
    getAllKeys() {
        return Object.keys(localStorage);
    }
};

// ========== ФУНКЦІЇ ДЛЯ РОБОТИ З DOM ==========
const DOM = {
    // Показати/приховати елемент
    toggleElement(element, show) {
        if (show) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    },
    
    // Додати клас з анімацією
    addClassWithAnimation(element, className, duration = 300) {
        element.classList.add(className);
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    },
    
    // Створити елемент
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        // Додати атрибути
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'style') {
                Object.assign(element.style, value);
            } else if (key === 'class') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        }
        
        // Додати дітей
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // Отримати елемент по селектору
    $(selector) {
        return document.querySelector(selector);
    },
    
    // Отримати всі елементи по селектору
    $$(selector) {
        return document.querySelectorAll(selector);
    }
};

// ========== ФУНКЦІЇ ДЛЯ РОБОТИ З ФАЙЛАМИ ==========
const FileUtils = {
    // Конвертація JSON в CSV
    jsonToCsv(json) {
        if (!Array.isArray(json) || json.length === 0) {
            return '';
        }
        
        const headers = Object.keys(json[0]);
        const rows = json.map(obj => 
            headers.map(header => JSON.stringify(obj[header] || '')).join(',')
        );
        
        return [headers.join(','), ...rows].join('\n');
    },
    
    // Конвертація CSV в JSON
    csvToJson(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ? values[index].trim() : '';
            });
            return obj;
        });
    },
    
    // Експорт даних в різних форматах
    exportData(data, format, filename) {
        let content, mimeType;
        
        switch (format) {
            case 'json':
                content = JSON.stringify(data, null, 2);
                mimeType = 'application/json';
                break;
                
            case 'csv':
                content = this.jsonToCsv(data);
                mimeType = 'text/csv';
                break;
                
            case 'txt':
                content = data.toString();
                mimeType = 'text/plain';
                break;
                
            default:
                throw new Error('Непідтримуваний формат');
        }
        
        Utils.downloadFile(filename, content, mimeType);
    }
};

// Експорт всіх утиліт
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, Storage, DOM, FileUtils };
}
