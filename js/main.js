// ========== ГОЛОВНИЙ МОДУЛЬ ==========
// Порядок імпорту важливий!

// Спочатку конфігурація Firebase (створює SICOMIX.firebase)
import './firebase-config.js';

// Потім утиліти, дані, переклади
import './data-colors.js';
import './i18n.js';
import './utils.js';
import './sync.js';

// Додаткові дані
import './pantone-external-colors.js';
import './ral-data.js';
import './pantone-data.js';

// Потім модулі додатку
import './app-core.js';
import './app-recipe.js';
import './app-catalog.js';
import './app-pantone-ral.js';
import './app-settings.js';

// Ініціалізація після завантаження всіх модулів
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Всі модулі завантажено, ініціалізація SICOMIX.app...');
    if (window.SICOMIX?.app?.init) {
        window.SICOMIX.app.init();
    }
});
