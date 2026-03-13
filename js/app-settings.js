// ========== SETTINGS MODULE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const app = SICOMIX.app;
    const dom = app.dom;

    function initSettings() {
        const currentSettings = app.getCurrentSettings();
        if (dom.unitsSelect) dom.unitsSelect.value = currentSettings.units || 'grams';
        if (dom.autoSaveCheckbox) dom.autoSaveCheckbox.checked = currentSettings.autoSave !== false;
        if (dom.backupCheckbox) dom.backupCheckbox.checked = currentSettings.backup === true;
        if (dom.languageSelect) dom.languageSelect.value = SICOMIX.i18n.getLanguage();
        if (dom.themeSelect) dom.themeSelect.value = currentSettings.theme || 'spectrum';
        if (dom.catalogLayoutSelect) dom.catalogLayoutSelect.value = currentSettings.catalogLayout || 'classic';
        applyTheme(currentSettings.theme || 'spectrum');
        applyCatalogLayout(currentSettings.catalogLayout || 'classic');
    }

    function applyTheme(theme) {
        document.body.classList.remove('theme-organic');
        if (theme === 'organic') {
            document.body.classList.add('theme-organic');
        }
    }

    function applyCatalogLayout(layout) {
        if (dom.paintCatalogEl) {
            dom.paintCatalogEl.classList.remove('catalog-layout-classic', 'catalog-layout-compact', 'catalog-layout-list');
            dom.paintCatalogEl.classList.add(`catalog-layout-${layout}`);
        }
    }

    function saveSettings() {
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

        SICOMIX.i18n.setLanguage(newLanguage);
        SICOMIX.i18n.applyTranslations();
        applyTheme(newTheme);
        applyCatalogLayout(newCatalogLayout);
        app.saveData();
        SICOMIX.utils.showNotification(SICOMIX.i18n.t('save_settings'), 'success');
    }

    function resetSettings() {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('reset_defaults'),
            SICOMIX.i18n.t('confirmation_message'),
            () => {
                const defaultSettings = SICOMIX.data.defaultSettings || {};
                app.setCurrentSettings(defaultSettings);
                dom.languageSelect.value = defaultSettings.language || 'uk';
                dom.unitsSelect.value = defaultSettings.units || 'grams';
                dom.themeSelect.value = defaultSettings.theme || 'spectrum';
                dom.autoSaveCheckbox.checked = defaultSettings.autoSave !== false;
                dom.backupCheckbox.checked = defaultSettings.backup === true;
                dom.catalogLayoutSelect.value = defaultSettings.catalogLayout || 'classic';

                SICOMIX.i18n.setLanguage(defaultSettings.language || 'uk');
                SICOMIX.i18n.applyTranslations();
                applyTheme(defaultSettings.theme || 'spectrum');
                applyCatalogLayout(defaultSettings.catalogLayout || 'classic');

                app.saveData();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('reset_defaults'), 'success');
            }
        );
    }

    function clearAllData() {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('clear_all_data'),
            SICOMIX.i18n.t('clear_all_data_confirmation'),
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
                if (SICOMIX.app.renderRecipes) SICOMIX.app.renderRecipes();
                if (SICOMIX.app.renderPaintCatalog) SICOMIX.app.renderPaintCatalog();
                if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
                if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
                app.updatePaintCount();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('data_cleared'), 'success');
            }
        );
    }

    // ---------- ЕКСПОРТ МЕТОДІВ ----------
    Object.assign(SICOMIX.app, {
        initSettings,
        applyTheme,
        applyCatalogLayout,
        saveSettings,
        resetSettings,
        clearAllData
    });

})(window);
