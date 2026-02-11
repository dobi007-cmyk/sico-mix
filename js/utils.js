// ========== УТІЛІТИ ==========
if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.utils = (function() {
    function showNotification(message, type = 'success', duration = 3000) {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'var(--primary)' : 
                       type === 'error' ? 'var(--danger)' : 
                       type === 'warning' ? 'var(--warning)' : 'var(--gray)';
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-hover);
            z-index: 1001;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        const icon = type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        notification.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        return notification;
    }

    function showConfirmation(title, message, onConfirm, onCancel = null) {
        const confirmationModal = document.getElementById('confirmationModal');
        const confirmationTitle = document.getElementById('confirmationTitle');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const confirmActionBtn = document.getElementById('confirmActionBtn');
        const cancelActionBtn = document.getElementById('cancelActionBtn');
        const closeConfirmationModal = document.getElementById('closeConfirmationModal');
        
        confirmationTitle.textContent = title;
        confirmationMessage.innerHTML = `<span>${message}</span>`;
        confirmationModal.classList.add('active');
        
        const handleConfirm = () => { if (onConfirm) onConfirm(); confirmationModal.classList.remove('active'); cleanup(); };
        const handleCancel = () => { if (onCancel) onCancel(); confirmationModal.classList.remove('active'); cleanup(); };
        function cleanup() { confirmActionBtn.onclick = null; cancelActionBtn.onclick = null; closeConfirmationModal.onclick = null; }
        
        confirmActionBtn.onclick = handleConfirm;
        cancelActionBtn.onclick = handleCancel;
        closeConfirmationModal.onclick = handleCancel;
        
        const handleEscape = (e) => { if (e.key === 'Escape') { handleCancel(); document.removeEventListener('keydown', handleEscape); } };
        document.addEventListener('keydown', handleEscape);
    }

    function calculateIngredientPercentages(ingredients) {
        const totalAmount = ingredients.reduce((sum, ing) => sum + (parseFloat(ing.amount) || 0), 0);
        if (totalAmount === 0) return ingredients;
        return ingredients.map(ing => ({ ...ing, percentage: parseFloat(((ing.amount / totalAmount) * 100).toFixed(1)) }));
    }

    function generateId() { return Date.now() + Math.random().toString(36).substr(2, 9); }

    function exportToFile(data, filename, type = 'application/json') {
        const dataStr = type === 'application/json' ? JSON.stringify(data, null, 2) : convertToCSV(data);
        const dataUri = `data:${type};charset=utf-8,${encodeURIComponent(dataStr)}`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', filename);
        linkElement.click();
        return true;
    }

    function convertToCSV(data) {
        if (!Array.isArray(data)) return '';
        const headers = Object.keys(data[0] || {});
        const rows = data.map(item => headers.map(h => {
            const v = item[h]; return typeof v === 'object' ? JSON.stringify(v) : v;
        }).join(','));
        return [headers.join(','), ...rows].join('\n');
    }

    function formatDate(date, locale = 'uk-UA') {
        const d = new Date(date);
        return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; }
    function throttle(func, limit) { let inThrottle; return function() { if (!inThrottle) { func.apply(this, arguments); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }
    function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
    function getRandomColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); }
    function formatNumber(num, decimals = 2) { return parseFloat(num).toFixed(decimals); }
    function calculateTotal(ingredients) { return ingredients.reduce((total, ing) => total + (parseFloat(ing.amount) || 0), 0); }
    function isEmpty(obj) { if (!obj) return true; if (Array.isArray(obj)) return obj.length === 0; return Object.keys(obj).length === 0; }
    function filterArray(array, filters) {
        return array.filter(item => Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            if (typeof value === 'string') return String(item[key]).toLowerCase().includes(value.toLowerCase());
            if (typeof value === 'function') return value(item[key]);
            return item[key] === value;
        }));
    }
    function sortArray(array, key, direction = 'asc') {
        return [...array].sort((a, b) => {
            const aVal = a[key], bVal = b[key];
            if (typeof aVal === 'string' && typeof bVal === 'string')
                return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            return direction === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }
    function groupBy(array, key) {
        return array.reduce((groups, item) => { const gKey = item[key]; if (!groups[gKey]) groups[gKey] = []; groups[gKey].push(item); return groups; }, {});
    }
    function loadImage(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = e => resolve(e.target.result); reader.onerror = reject; reader.readAsDataURL(file); }); }
    function saveToLocalStorage(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch (e) { console.error('Помилка збереження в localStorage:', e); showNotification('Помилка збереження даних', 'error'); return false; } }
    function loadFromLocalStorage(key, defaultValue = null) { try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : defaultValue; } catch (e) { console.error('Помилка завантаження з localStorage:', e); return defaultValue; } }
    function clearLocalStorage() { try { localStorage.clear(); return true; } catch (e) { console.error('Помилка очищення localStorage:', e); return false; } }
    function openModal(modalId) { const modal = document.getElementById(modalId); if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    function closeModal(modalId) { const modal = document.getElementById(modalId); if (modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; } }

    return {
        showNotification, showConfirmation, calculateIngredientPercentages, generateId, exportToFile, convertToCSV,
        formatDate, validateEmail, debounce, throttle, deepClone, getRandomColor, formatNumber, calculateTotal,
        isEmpty, filterArray, sortArray, groupBy, loadImage, saveToLocalStorage, loadFromLocalStorage, clearLocalStorage,
        openModal, closeModal
    };
})();

window.SICOMIX = SICOMIX;
