/* ==========================================
   SICO MIX — PRO Utils Module
========================================== */

window.SICOMIX = window.SICOMIX || {};

SICOMIX.utils = (() => {

    /* ================= STORAGE ================= */

    const storage = {

        save(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) {
                console.error('Storage save error:', e);
                return false;
            }
        },

        load(key, fallback = null) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : fallback;
            } catch (e) {
                console.error('Storage load error:', e);
                return fallback;
            }
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        }
    };

    /* ================= ID ================= */

    const uid = () =>
        Date.now().toString(36) + Math.random().toString(36).substring(2, 9);


    /* ================= DEBOUNCE ================= */

    const debounce = (fn, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };


    /* ================= COLOR ================= */

    const hexToRgb = hex => {
        hex = hex.replace('#', '');
        const bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };

    const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('');

    const brightness = hex => {
        const { r, g, b } = hexToRgb(hex);
        return (r * 299 + g * 587 + b * 114) / 1000;
    };


    /* ================= CSV EXPORT ================= */

    const toCSV = array => {
        if (!array.length) return '';

        const headers = Object.keys(array[0]);
        const rows = array.map(obj =>
            headers.map(h => JSON.stringify(obj[h] ?? '')).join(',')
        );

        return [headers.join(','), ...rows].join('\n');
    };

    const downloadFile = (data, filename, type) => {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    };


    /* ================= NOTIFICATIONS ================= */

    const notify = (message, duration = 2500) => {
        const el = document.createElement('div');
        el.className = 'notification';
        el.textContent = message;

        document.body.appendChild(el);

        el.style.animation = 'slideIn 0.3s ease';

        setTimeout(() => {
            el.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => el.remove(), 300);
        }, duration);
    };


    /* ================= FORMAT ================= */

    const formatDate = ts => {
        const d = new Date(ts);
        return d.toLocaleDateString();
    };

    const round = (num, decimals = 2) =>
        Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);


    /* ================= NETWORK ================= */

    const isOnline = () => navigator.onLine;


    /* ================= RETURN PUBLIC API ================= */

    return {
        storage,
        uid,
        debounce,
        hexToRgb,
        rgbToHex,
        brightness,
        toCSV,
        downloadFile,
        notify,
        formatDate,
        round,
        isOnline
    };

})();