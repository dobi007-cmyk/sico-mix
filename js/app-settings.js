// ========== SETTINGS MODULE ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';
import * as app from './app-core.js';

function initSettings() {
    const currentSettings = app.getCurrentSettings();
    const dom = app.dom;
    if (dom.unitsSelect) dom.unitsSelect.value = currentSettings.units || 'grams';
    if (dom.autoSaveCheckbox) dom.autoSaveCheckbox.checked = currentSettings.autoSave !== false;
    if (dom.backupCheckbox) dom.backupCheckbox.checked = currentSettings.backup === true;
    if (dom.languageSelect) dom.languageSelect.value = i18n.getLanguage();
    if (dom.themeSelect) dom.themeSelect.value = currentSettings.theme || 'spectrum';
    if (dom.catalogLayoutSelect) dom.catalogLayoutSelect.value = currentSettings.catalogLayout || 'classic';
    
    updateLayoutOptionsText();
    
    applyTheme(currentSettings.theme || 'spectrum');
    applyCatalogLayout(currentSettings.catalogLayout || 'classic');
}

function updateLayoutOptionsText() {
    const dom = app.dom;
    if (!dom.catalogLayoutSelect) return;
    const options = dom.catalogLayoutSelect.options;
    for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (opt.value === 'classic') {
            opt.textContent = i18n.t('layout_classic');
        } else if (opt.value === 'compact') {
            opt.textContent = i18n.t('layout_compact');
        } else if (opt.value === 'list') {
            opt.textContent = i18n.t('layout_list');
        }
    }
}

function applyTheme(theme) {
    document.body.classList.remove('theme-organic');
    if (theme === 'organic') {
        document.body.classList.add('theme-organic');
    }
}

function applyCatalogLayout(layout) {
    const dom = app.dom;
    if (dom.paintCatalogEl) {
        dom.paintCatalogEl.classList.remove('catalog-layout-classic', 'catalog-layout-compact', 'catalog-layout-list');
        dom.paintCatalogEl.classList.add(`catalog-layout-${layout}`);
    }
}

function saveSettings() {
    const dom = app.dom;
    const newLanguage = dom.languageSelect.value;
    const newUnits = dom.unitsSelect.value;
    const newTheme = dom.themeSelect.value;
    const newAutoSave = dom.autoSaveCheckbox.checked;
    const newBackup = dom.backupCheckbox.checked;
    const newCatalogLayout = dom.catalogLayoutSelect.value;

    const currentSettings = app.getCurrentSettings();
    const updatedSettings = {
        ...currentSettings,
        language: newLanguage,
        units: newUnits,
        autoSave: newAutoSave,
        backup: newBackup,
        theme: newTheme,
        catalogLayout: newCatalogLayout,
        notifications: true,
        defaultCategory: 'Standard',
        defaultUnit: app.unitMap[newUnits] || 'г',
        calculationsPrecision: 2
    };
    app.setCurrentSettings(updatedSettings);

    i18n.setLanguage(newLanguage);
    i18n.applyTranslations();
    
    updateLayoutOptionsText();
    
    applyTheme(newTheme);
    applyCatalogLayout(newCatalogLayout);
    
    if (document.getElementById('catalog-page')?.classList.contains('active')) {
        if (window.SICOMIX?.app?.renderPaintCatalog) {
            app.setCatalogPage(1);
            window.SICOMIX.app.renderPaintCatalog();
        }
    }
    
    app.saveData();
    utils.showNotification(i18n.t('save_settings'), 'success');
}

function resetSettings() {
    utils.showConfirmation(
        i18n.t('reset_defaults'),
        i18n.t('confirmation_message'),
        () => {
            const defaultSettings = window.SICOMIX.data?.defaultSettings || {};
            app.setCurrentSettings(defaultSettings);
            const dom = app.dom;
            dom.languageSelect.value = defaultSettings.language || 'uk';
            dom.unitsSelect.value = defaultSettings.units || 'grams';
            dom.themeSelect.value = defaultSettings.theme || 'spectrum';
            dom.autoSaveCheckbox.checked = defaultSettings.autoSave !== false;
            dom.backupCheckbox.checked = defaultSettings.backup === true;
            dom.catalogLayoutSelect.value = defaultSettings.catalogLayout || 'classic';

            i18n.setLanguage(defaultSettings.language || 'uk');
            i18n.applyTranslations();
            
            updateLayoutOptionsText();
            
            applyTheme(defaultSettings.theme || 'spectrum');
            applyCatalogLayout(defaultSettings.catalogLayout || 'classic');

            if (document.getElementById('catalog-page')?.classList.contains('active')) {
                if (window.SICOMIX?.app?.renderPaintCatalog) {
                    app.setCatalogPage(1);
                    window.SICOMIX.app.renderPaintCatalog();
                }
            }

            app.saveData();
            utils.showNotification(i18n.t('reset_defaults'), 'success');
        }
    );
}

function clearAllData() {
    utils.showConfirmation(
        i18n.t('clear_all_data'),
        i18n.t('clear_all_data_confirmation'),
        () => {
            app.setRecipes([]);
            app.setUserPaints([]);
            app.setPaintCatalog([...app.getPaintCatalog().filter(p => p.isDefault)]);
            app.setSelectedIngredients([]);
            app.setSelectedRecipes([]);
            app.setLockedSeries(null);
            app.setLockedCategory(null);
            app.invalidateSeriesCache();
            app.saveData();
            app.populateCategoryFilters();
            if (window.SICOMIX?.app?.renderRecipes) window.SICOMIX.app.renderRecipes();
            if (window.SICOMIX?.app?.renderPaintCatalog) window.SICOMIX.app.renderPaintCatalog();
            if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
            if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
            app.updatePaintCount();
            utils.showNotification(i18n.t('data_cleared'), 'success');
        }
    );
}

function attachSettingsEventListeners() {
    const dom = app.dom;
    if (dom.saveSettingsBtn) {
        dom.saveSettingsBtn.addEventListener('click', saveSettings);
    }
    if (dom.resetSettingsBtn) {
        dom.resetSettingsBtn.addEventListener('click', resetSettings);
    }
    if (dom.clearAllDataBtn) {
        dom.clearAllDataBtn.addEventListener('click', clearAllData);
    }
    if (dom.exportBackupBtn) {
        dom.exportBackupBtn.addEventListener('click', () => {
            if (typeof app.exportBackup === 'function') {
                app.exportBackup();
            } else {
                console.error('❌ exportBackup не знайдено в app');
                utils.showNotification('Помилка: функція експорту не доступна', 'error');
            }
        });
    }
    if (dom.languageSelect) {
        dom.languageSelect.addEventListener('change', () => {
            updateLayoutOptionsText();
        });
    }
}

// Експорт функцій
export {
    initSettings,
    applyTheme,
    applyCatalogLayout,
    saveSettings,
    resetSettings,
    clearAllData,
    attachSettingsEventListeners,
    updateLayoutOptionsText
};

// Для зворотної сумісності додаємо до глобального SICOMIX.app
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.app = window.SICOMIX.app || {};
Object.assign(window.SICOMIX.app, {
    initSettings,
    applyTheme,
    applyCatalogLayout,
    saveSettings,
    resetSettings,
    clearAllData,
    attachSettingsEventListeners,
    updateLayoutOptionsText
});
