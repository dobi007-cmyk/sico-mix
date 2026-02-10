// ========== УТІЛІТИ ==========

if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.utils = (function() {
    'use strict';
    
    // Показ сповіщень
    function showNotification(message, type = 'success', duration = 3000) {
        // Видаляємо попередні сповіщення
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'var(--success, #28a745)' : 
                       type === 'error' ? 'var(--danger, #dc3545)' : 
                       type === 'warning' ? 'var(--warning, #ffc107)' : 
                       type === 'info' ? 'var(--info, #17a2b8)' : 'var(--gray, #6c757d)';
        
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            word-break: break-word;
        `;
        
        const icon = type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Автоматичне приховування
        const hideTimer = setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
        
        // Дозволити закриття кліком
        notification.addEventListener('click', () => {
            clearTimeout(hideTimer);
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        return notification;
    }

    // Показ підтвердження
    function showConfirmation(title, message, onConfirm, onCancel = null) {
        const confirmationModal = document.getElementById('confirmationModal');
        const confirmationTitle = document.getElementById('confirmationTitle');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const confirmActionBtn = document.getElementById('confirmActionBtn');
        const cancelActionBtn = document.getElementById('cancelActionBtn');
        const closeConfirmationModal = document.getElementById('closeConfirmationModal');
        
        // Оновлення текстів з підтримкою i18n
        if (confirmationTitle) confirmationTitle.textContent = title;
        if (confirmationMessage) confirmationMessage.innerHTML = `<span>${message}</span>`;
        confirmationModal.classList.add('active');
        
        const handleConfirm = () => {
            if (onConfirm && typeof onConfirm === 'function') onConfirm();
            confirmationModal.classList.remove('active');
            cleanup();
        };
        
        const handleCancel = () => {
            if (onCancel && typeof onCancel === 'function') onCancel();
            confirmationModal.classList.remove('active');
            cleanup();
        };
        
        function cleanup() {
            confirmActionBtn.onclick = null;
            cancelActionBtn.onclick = null;
            closeConfirmationModal.onclick = null;
        }
        
        confirmActionBtn.onclick = handleConfirm;
        cancelActionBtn.onclick = handleCancel;
        closeConfirmationModal.onclick = handleCancel;
        
        // Додати обробник для клавіші Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        
        // Прибираємо обробник після закриття
        confirmationModal.addEventListener('transitionend', function handler() {
            if (!confirmationModal.classList.contains('active')) {
                document.removeEventListener('keydown', handleEscape);
                confirmationModal.removeEventListener('transitionend', handler);
            }
        });
    }

    // Розрахунок відсотків інгредієнтів
    function calculateIngredientPercentages(ingredients) {
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return [];
        }
        
        const totalAmount = ingredients.reduce((sum, ing) => {
            return sum + (parseFloat(ing.amount) || 0);
        }, 0);
        
        if (totalAmount === 0) return ingredients.map(ing => ({...ing, percentage: 0}));

        return ingredients.map(ingredient => ({
            ...ingredient,
            percentage: parseFloat(((ingredient.amount / totalAmount) * 100).toFixed(1))
        }));
    }

    // Генерація унікального ID
    function generateId(prefix = '') {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${prefix}${timestamp}_${random}`;
    }

    // Експорт у файл
    function exportToFile(data, filename, type = 'application/json') {
        try {
            let dataStr, mimeType;
            
            switch (type) {
                case 'application/json':
                    dataStr = JSON.stringify(data, null, 2);
                    mimeType = 'application/json';
                    if (!filename.endsWith('.json')) filename += '.json';
                    break;
                    
                case 'text/csv':
                    dataStr = convertToCSV(data);
                    mimeType = 'text/csv';
                    if (!filename.endsWith('.csv')) filename += '.csv';
                    break;
                    
                default:
                    dataStr = JSON.stringify(data, null, 2);
                    mimeType = 'application/json';
                    filename += '.json';
            }
            
            const blob = new Blob([dataStr], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            
            // Очищення
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);
            
            return true;
        } catch (error) {
            console.error('Помилка експорту файлу:', error);
            showNotification('Помилка експорту файлу', 'error');
            return false;
        }
    }

    // Конвертація у CSV з правильним екрануванням
    function convertToCSV(data) {
        if (!Array.isArray(data) || data.length === 0) return '';
        
        // Отримуємо всі унікальні ключі
        const headers = new Set();
        data.forEach(item => {
            Object.keys(item).forEach(key => headers.add(key));
        });
        
        const headerArray = Array.from(headers);
        
        // Формуємо заголовки
        const csvRows = [];
        
        // Екрануємо значення для CSV
        const escapeCSV = (value) => {
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        };
        
        // Додаємо заголовки
        csvRows.push(headerArray.map(escapeCSV).join(','));
        
        // Додаємо дані
        data.forEach(item => {
            const row = headerArray.map(header => {
                const value = item[header];
                if (typeof value === 'object' && value !== null) {
                    return escapeCSV(JSON.stringify(value));
                }
                return escapeCSV(value);
            });
            csvRows.push(row.join(','));
        });
        
        return csvRows.join('\n');
    }

    // Форматування дати
    function formatDate(date, locale = 'uk-UA', options = {}) {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            return 'Невірна дата';
        }
        
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return d.toLocaleDateString(locale, { ...defaultOptions, ...options });
    }

    // Форматування дати для файлів (без спецсимволів)
    function formatDateForFilename(date = new Date()) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}_${hours}-${minutes}`;
    }

    // Валідація email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Валідація кольору HEX
    function validateHexColor(color) {
        const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return re.test(color);
    }

    // Валідація обов'язкових полів
    function validateRequiredFields(fields, fieldNames = {}) {
        const errors = [];
        
        Object.entries(fields).forEach(([key, value]) => {
            if (!value && value !== 0) {
                const fieldName = fieldNames[key] || key;
                errors.push(`Поле "${fieldName}" є обов'язковим`);
            }
        });
        
        return errors;
    }

    // Debounce функція
    function debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Throttle функція
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Глибоке клонування
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
        return obj;
    }

    // Генерація випадкового кольору
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 60%)`;
    }

    // Конвертація HEX у RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Форматування числа
    function formatNumber(num, decimals = 2, locale = 'uk-UA') {
        if (isNaN(num) || num === null || num === undefined) return '0';
        
        const options = {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        };
        
        return parseFloat(num).toLocaleString(locale, options);
    }

    // Розрахунок загальної суми
    function calculateTotal(items, key = 'amount') {
        if (!Array.isArray(items)) return 0;
        return items.reduce((total, item) => {
            const value = parseFloat(item[key]) || 0;
            return total + value;
        }, 0);
    }

    // Перевірка об'єкта на порожність
    function isEmpty(obj) {
        if (!obj) return true;
        if (Array.isArray(obj)) return obj.length === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return !obj;
    }

    // Фільтрація масиву за кількома критеріями
    function filterArray(array, filters) {
        if (!Array.isArray(array)) return [];
        
        return array.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (value === null || value === undefined || value === '') return true;
                
                const itemValue = item[key];
                
                if (typeof value === 'string') {
                    return String(itemValue).toLowerCase().includes(value.toLowerCase());
                }
                
                if (typeof value === 'function') {
                    return value(itemValue);
                }
                
                if (Array.isArray(value)) {
                    return value.includes(itemValue);
                }
                
                return itemValue === value;
            });
        });
    }

    // Сортування масиву
    function sortArray(array, key, direction = 'asc') {
        if (!Array.isArray(array)) return [];
        
        return [...array].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];
            
            // Якщо значення - рядки
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
                return direction === 'asc' 
                    ? aVal.localeCompare(bVal, 'uk')
                    : bVal.localeCompare(aVal, 'uk');
            }
            
            // Якщо значення - числа
            aVal = parseFloat(aVal) || 0;
            bVal = parseFloat(bVal) || 0;
            
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }

    // Групування масиву
    function groupBy(array, key) {
        if (!Array.isArray(array)) return {};
        
        return array.reduce((groups, item) => {
            const groupKey = item[key];
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(item);
            return groups;
        }, {});
    }

    // Завантаження зображення
    function loadImage(file) {
        return new Promise((resolve, reject) => {
            if (!file || !(file instanceof Blob)) {
                reject(new Error('Невірний файл'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Помилка завантаження зображення'));
            reader.readAsDataURL(file);
        });
    }

    // Зменшення розміру зображення
    function compressImage(file, maxWidth = 800, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob(
                        (blob) => resolve(blob),
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }

    // Збереження в localStorage з обробкою помилок
    function saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Помилка збереження в localStorage:', error);
            showNotification('Помилка збереження даних. Можливо, перевищено ліміт сховища.', 'error');
            return false;
        }
    }

    // Завантаження з localStorage з обробкою помилок
    function loadFromLocalStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (data === null) return defaultValue;
            return JSON.parse(data);
        } catch (error) {
            console.error('Помилка завантаження з localStorage:', error);
            return defaultValue;
        }
    }

    // Очищення даних з localStorage
    function clearLocalStorage() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Помилка очищення localStorage:', error);
            return false;
        }
    }

    // Відкриття модального вікна
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Фокус на першому інпуті
            const firstInput = modal.querySelector('input, textarea, select, button');
            if (firstInput) setTimeout(() => firstInput.focus(), 100);
        }
    }

    // Закриття модального вікна
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Імпорт даних з файлу
    function importFromFile(file, type = 'application/json') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    let data;
                    
                    switch (type) {
                        case 'application/json':
                            data = JSON.parse(e.target.result);
                            break;
                            
                        case 'text/csv':
                            data = parseCSV(e.target.result);
                            break;
                            
                        default:
                            data = JSON.parse(e.target.result);
                    }
                    
                    resolve(data);
                } catch (error) {
                    reject(new Error('Помилка парсингу файлу: ' + error.message));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Помилка читання файлу'));
            };
            
            if (type === 'text/csv') {
                reader.readAsText(file);
            } else {
                reader.readAsText(file);
            }
        });
    }

    // Парсинг CSV
    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        if (lines.length < 2) return [];
        
        const headers = lines[0].split(',').map(h => h.trim());
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const obj = {};
            const currentLine = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
            
            headers.forEach((header, index) => {
                let value = currentLine[index] || '';
                value = value.trim();
                
                // Видаляємо лапки
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1);
                }
                
                // Спроба парсити JSON
                if (value.startsWith('{') || value.startsWith('[')) {
                    try {
                        obj[header] = JSON.parse(value);
                    } catch {
                        obj[header] = value;
                    }
                } else {
                    obj[header] = value;
                }
            });
            
            result.push(obj);
        }
        
        return result;
    }

    // Копіювання в буфер обміну
    function copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback для старих браузерів
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    if (successful) {
                        resolve();
                    } else {
                        reject(new Error('Не вдалося скопіювати'));
                    }
                } catch (error) {
                    document.body.removeChild(textArea);
                    reject(error);
                }
            }
        });
    }

    // Генерація QR коду (проста реалізація)
    function generateQRCode(text, size = 128) {
        // Для справжньої реалізації потрібна бібліотека, але тут базова реалізація
        return new Promise((resolve) => {
            // Тут може бути інтеграція з бібліотекою QR code
            // Наразі повертаємо заглушку
            resolve(`QR код для: ${text.substring(0, 50)}...`);
        });
    }

    // Перевірка підтримки PWA
    function isPWAInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || 
               window.navigator.standalone === true;
    }

    // Вібрація (якщо підтримується)
    function vibrate(pattern = 50) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    return {
        showNotification,
        showConfirmation,
        calculateIngredientPercentages,
        generateId,
        exportToFile,
        convertToCSV,
        parseCSV,
        formatDate,
        formatDateForFilename,
        validateEmail,
        validateHexColor,
        validateRequiredFields,
        debounce,
        throttle,
        deepClone,
        getRandomColor,
        hexToRgb,
        formatNumber,
        calculateTotal,
        isEmpty,
        filterArray,
        sortArray,
        groupBy,
        loadImage,
        compressImage,
        saveToLocalStorage,
        loadFromLocalStorage,
        clearLocalStorage,
        openModal,
        closeModal,
        importFromFile,
        copyToClipboard,
        generateQRCode,
        isPWAInstalled,
        vibrate
    };
})();

// Експорт у глобальну область видимості
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.utils = SICOMIX.utils;
