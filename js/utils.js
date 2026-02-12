if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.utils = (function() {
    function showNotification(message, type = 'success', duration = 3000) {
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(145deg, #3a86ff, #7b2cbf)' : 
                         type === 'error' ? '#e63946' : 
                         type === 'warning' ? '#fb8500' : '#3a86ff'};
            color: white;
            padding: 16px 28px;
            border-radius: 40px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            z-index: 3000;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 12px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.2);
            animation: slideIn 0.3s ease;
        `;
        const icon = type === 'success' ? 'fa-check-circle' :
                     type === 'error' ? 'fa-exclamation-circle' :
                     type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        notification.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    function showConfirmation(title, message, onConfirm, onCancel) {
        const modal = document.getElementById('confirmationModal');
        const titleEl = document.getElementById('confirmationTitle');
        const msgEl = document.getElementById('confirmationMessage');
        const confirmBtn = document.getElementById('confirmActionBtn');
        const cancelBtn = document.getElementById('cancelActionBtn');
        const closeBtn = document.getElementById('closeConfirmationModal');

        titleEl.textContent = title;
        msgEl.innerHTML = `<span>${message}</span>`;
        modal.classList.add('active');

        const handleConfirm = () => {
            onConfirm?.();
            modal.classList.remove('active');
            cleanup();
        };
        const handleCancel = () => {
            onCancel?.();
            modal.classList.remove('active');
            cleanup();
        };
        const cleanup = () => {
            confirmBtn.onclick = null;
            cancelBtn.onclick = null;
            closeBtn.onclick = null;
        };

        confirmBtn.onclick = handleConfirm;
        cancelBtn.onclick = handleCancel;
        closeBtn.onclick = handleCancel;

        const escHandler = (e) => { if (e.key === 'Escape') handleCancel(); };
        document.addEventListener('keydown', escHandler);
        modal._escHandler = escHandler;
    }

    function generateId() {
        return Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    }

    function calculateIngredientPercentages(ingredients) {
        const total = ingredients.reduce((sum, ing) => sum + (parseFloat(ing.amount) || 0), 0);
        if (total === 0) return ingredients;
        return ingredients.map(ing => ({
            ...ing,
            percentage: parseFloat(((ing.amount / total) * 100).toFixed(1))
        }));
    }

    function exportToFile(data, filename, type = 'application/json') {
        const content = type === 'application/json' ? JSON.stringify(data, null, 2) : convertToCSV(data);
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function convertToCSV(data) {
        if (!Array.isArray(data) || data.length === 0) return '';
        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(h => item[h] ?? '').join(','));
        return [headers.join(','), ...rows].join('\n');
    }

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function saveToLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('LocalStorage save error:', e);
            return false;
        }
    }

    function loadFromLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('LocalStorage load error:', e);
            return defaultValue;
        }
    }

    // ========== НОВА ФУНКЦІЯ: захист від XSS ==========
    function escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // ========== ОЧИЩЕННЯ ФАРБ ДЛЯ LOCALSTORAGE ==========
function sanitizePaintForStorage(paint) {
    return {
        id: paint.id,
        name: paint.name,
        displayName: paint.displayName,
        searchName: paint.searchName,
        series: paint.series,
        baseColorCode: paint.baseColorCode,
        category: paint.category,
        color: paint.color,
        manufacturer: paint.manufacturer,
        article: paint.article,
        description: paint.description,
        colorName: paint.colorName,
        colorCode: paint.colorCode
        // properties, fullInfo – ВИДАЛЕНО
    };
}
    
    return {
        showNotification,
        showConfirmation,
        generateId,
        calculateIngredientPercentages,
        exportToFile,
        convertToCSV,
        debounce,
        saveToLocalStorage,
        loadFromLocalStorage,
        escapeHTML   // <-- експорт
    };
})();

window.SICOMIX = SICOMIX;
