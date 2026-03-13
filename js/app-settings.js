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
        
        // Оновлюємо тексти опцій компонування
        updateLayoutOptionsText();
        
        applyTheme(currentSettings.theme || 'spectrum');
        applyCatalogLayout(currentSettings.catalogLayout || 'classic');
    }

    function updateLayoutOptionsText() {
        console.log('🔄 updateLayoutOptionsText викликано');
        if (!dom.catalogLayoutSelect) {
            console.warn('❌ dom.catalogLayoutSelect не знайдено');
            return;
        }
        const options = dom.catalogLayoutSelect.options;
        for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            if (opt.value === 'classic') {
                opt.textContent = SICOMIX.i18n.t('layout_classic');
            } else if (opt.value === 'compact') {
                opt.textContent = SICOMIX.i18n.t('layout_compact');
            } else if (opt.value === 'list') {
                opt.textContent = SICOMIX.i18n.t('layout_list');
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
        
        // Після зміни мови оновлюємо тексти опцій
        updateLayoutOptionsText();
        
        applyTheme(newTheme);
        applyCatalogLayout(newCatalogLayout);
        
        // Якщо сторінка каталогу активна, перерендеримо її, щоб застосувати нове компонування
        if (document.getElementById('catalog-page')?.classList.contains('active')) {
            if (SICOMIX.app.renderPaintCatalog) {
                SICOMIX.app.setCatalogPage(1);
                SICOMIX.app.renderPaintCatalog();
            }
        }
        
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
                
                updateLayoutOptionsText();
                
                applyTheme(defaultSettings.theme || 'spectrum');
                applyCatalogLayout(defaultSettings.catalogLayout || 'classic');

                if (document.getElementById('catalog-page')?.classList.contains('active')) {
                    if (SICOMIX.app.renderPaintCatalog) {
                        SICOMIX.app.setCatalogPage(1);
                        SICOMIX.app.renderPaintCatalog();
                    }
                }

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

    function attachSettingsEventListeners() {
        console.log('⚙️ attachSettingsEventListeners викликано');
        if (dom.saveSettingsBtn) {
            dom.saveSettingsBtn.addEventListener('click', saveSettings);
            console.log('✅ saveSettingsBtn обробник додано');
        }
        if (dom.resetSettingsBtn) {
            dom.resetSettingsBtn.addEventListener('click', resetSettings);
            console.log('✅ resetSettingsBtn обробник додано');
        }
        if (dom.clearAllDataBtn) {
            dom.clearAllDataBtn.addEventListener('click', clearAllData);
            console.log('✅ clearAllDataBtn обробник додано');
        }
        if (dom.exportBackupBtn) {
            dom.exportBackupBtn.addEventListener('click', () => {
                if (typeof app.exportBackup === 'function') {
                    app.exportBackup();
                } else {
                    console.error('❌ exportBackup не знайдено в app');
                    SICOMIX.utils.showNotification('Помилка: функція експорту не доступна', 'error');
                }
            });
            console.log('✅ exportBackupBtn обробник додано');
        }
        // При зміні мови через селект одразу оновлюємо текст опцій (для попереднього перегляду)
        if (dom.languageSelect) {
            dom.languageSelect.addEventListener('change', () => {
                updateLayoutOptionsText();
            });
        }
    }

    Object.assign(SICOMIX.app, {
        initSettings,
        applyTheme,
        applyCatalogLayout,
        saveSettings,
        resetSettings,
        clearAllData,
        attachSettingsEventListeners,
        updateLayoutOptionsText
    });

    console.log('📦 app-settings.js завантажено, SICOMIX.app містить:', Object.keys(SICOMIX.app));

})(window);
