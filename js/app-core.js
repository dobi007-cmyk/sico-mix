// ========== CORE MODULE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // Стан
    let recipes = [];
    let basePaints = [];
    let userPaints = [];
    let paintCatalog = [];
    let selectedIngredients = [];
    let selectedRecipes = [];
    let currentSettings = {};
    let isEditingRecipe = false;
    let editingRecipeId = null;
    let recipeDraft = null;
    let selectedSeries = '';
    let recipePhotoDataUrl = null;
    let lockedSeries = null;
    let lockedCategory = null;

    // Пагінація каталогу
    let catalogPage = 1;
    const CATALOG_PAGE_SIZE = 5;

    // Кеш серій
    let cachedUniqueSeries = null;

    // Мапа одиниць
    const unitMap = {
        'grams': 'г',
        'ml': 'мл',
        'percent': '%'
    };

    // DOM елементи
    const dom = {};

    // ---------- КЕШУВАННЯ DOM ----------
    function cacheDOMElements() {
        console.log('🔍 cacheDOMElements початок');
        dom.sidebar = document.getElementById('sidebar');
        dom.menuToggle = document.getElementById('menuToggle');
        dom.desktopMenuToggle = document.getElementById('desktopMenuToggle');
        dom.closeSidebar = document.getElementById('closeSidebar');
        dom.mainContainer = document.getElementById('mainContainer');
        dom.navLinks = document.querySelectorAll('.nav-link');
        dom.pageContents = document.querySelectorAll('.page-content');
        dom.totalPaintsEl = document.getElementById('totalPaints');
        dom.headerPaintCount = document.getElementById('headerPaintCount');
        dom.ingredientsList = document.getElementById('ingredientsList');
        dom.paintSearch = document.getElementById('paintSearch');
        dom.categoryFilter = document.getElementById('categoryFilter');
        dom.addIngredientBtn = document.getElementById('addIngredientBtn');
        dom.saveRecipeBtn = document.getElementById('saveRecipeBtn');
        dom.clearRecipeBtn = document.getElementById('clearRecipeBtn');
        dom.scanRecipeBtn = document.getElementById('scanRecipeBtn');
        dom.recipesContainer = document.getElementById('recipesContainer');
        dom.exportRecipesBtn = document.getElementById('exportRecipesBtn');
        dom.importRecipesBtn = document.getElementById('importRecipesBtn');
        dom.printRecipesBtn = document.getElementById('printRecipesBtn');
        dom.deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
        dom.paintCatalogEl = document.getElementById('paintCatalog');
        dom.addNewPaintBtn = document.getElementById('addNewPaintBtn');
        dom.addPaintModal = document.getElementById('addPaintModal');
        dom.closePaintModal = document.getElementById('closePaintModal');
        dom.savePaintBtn = document.getElementById('savePaintBtn');
        dom.cancelPaintBtn = document.getElementById('cancelPaintBtn');
        dom.languageSelect = document.getElementById('languageSelect');
        dom.unitsSelect = document.getElementById('unitsSelect');
        dom.themeSelect = document.getElementById('themeSelect');
        dom.autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
        dom.backupCheckbox = document.getElementById('backupCheckbox');
        dom.catalogLayoutSelect = document.getElementById('catalogLayoutSelect');
        dom.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        dom.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        dom.clearAllDataBtn = document.getElementById('clearAllDataBtn');
        dom.exportBackupBtn = document.getElementById('exportBackupBtn');
        dom.startImportBtn = document.getElementById('startImportBtn');
        dom.startExportBtn = document.getElementById('startExportBtn');
        dom.importFormat = document.getElementById('importFormat');
        dom.exportFormat = document.getElementById('exportFormat');
        dom.importFile = document.getElementById('importFile');
        dom.importRecipesCheckbox = document.getElementById('importRecipesCheckbox');
        dom.importPaintsCheckbox = document.getElementById('importPaintsCheckbox');
        dom.exportRecipesCheckbox = document.getElementById('exportRecipesCheckbox');
        dom.includePhotosCheckbox = document.getElementById('includePhotosCheckbox');
        dom.loadMoreCatalogBtn = document.getElementById('loadMoreCatalogBtn');
        dom.recipePhotoInput = document.getElementById('recipePhoto');
        dom.recipePhotoPreview = document.getElementById('recipePhotoPreview');
        dom.recipePhotoImg = document.getElementById('recipePhotoImg');
        dom.fileNameSpan = document.getElementById('fileName');
        dom.seriesDetailsModal = document.getElementById('seriesDetailsModal');
        dom.closeSeriesModal = document.getElementById('closeSeriesModal');
        dom.seriesDetailsTitle = document.getElementById('seriesDetailsTitle');
        dom.seriesDetailsContent = document.getElementById('seriesDetailsContent');
        dom.pantoneSearch = document.getElementById('pantoneSearch');
        dom.pantoneCategoryFilter = document.getElementById('pantoneCategoryFilter');
        dom.pantoneCatalog = document.getElementById('pantoneCatalog');
        dom.pantoneRecipeModal = document.getElementById('pantoneRecipeModal');
        dom.closePantoneRecipe = document.querySelector('.close-pantone-recipe');
        dom.pantoneRecipeContent = document.getElementById('pantoneRecipeContent');
        dom.addPantoneFromRecipeBtn = document.getElementById('addPantoneFromRecipeBtn');
        dom.ralSearch = document.getElementById('ralSearch');
        dom.ralCatalog = document.getElementById('ralCatalog');
        dom.weightInputModal = document.getElementById('weightInputModal');
        dom.closeWeightModal = document.getElementById('closeWeightModal');
        dom.weightInput = document.getElementById('weightInput');
        dom.weightConfirmBtn = document.getElementById('weightConfirmBtn');
        dom.weightCancelBtn = document.getElementById('weightCancelBtn');

        console.log('✅ Знайдено сторінок (pageContents):', dom.pageContents.length);
        dom.pageContents.forEach(p => console.log('   -', p.id));
    }

    // ---------- ЗАВАНТАЖЕННЯ ТА ЗБЕРЕЖЕННЯ ----------
    async function loadData() {
        if (SICOMIX.data && Array.isArray(SICOMIX.data.paints)) {
            basePaints = SICOMIX.data.paints.map(p => ({
                ...p,
                id: String(p.id),
                isDefault: true
            }));
        } else {
            console.error('[SICOMIX] data.paints не знайдено!');
            basePaints = [];
        }

        userPaints = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumUserPaints', [])
            .map(p => ({ ...p, id: String(p.id), isDefault: false }));

        recipes = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipes', [])
            .map(r => ({
                ...r,
                id: String(r.id),
                ingredients: (r.ingredients || []).map(ing => ({
                    ...ing,
                    paintId: String(ing.paintId)
                }))
            }));

        currentSettings = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumSettings', SICOMIX.data.defaultSettings || {});

        const user = SICOMIX.sync?.getCurrentUser();
        if (user) {
            try {
                const remoteData = await SICOMIX.sync.loadUserData(user.uid);
                if (remoteData) {
                    if (remoteData.recipes) {
                        recipes = remoteData.recipes.map(r => ({ ...r, id: String(r.id) }));
                    }
                    if (remoteData.userPaints) {
                        userPaints = remoteData.userPaints.map(p => ({ ...p, id: String(p.id), isDefault: false }));
                    }
                    if (remoteData.settings) {
                        currentSettings = remoteData.settings;
                    }
                }
            } catch (error) {
                console.error('Помилка синхронізації:', error);
            }
        }

        paintCatalog = [...basePaints, ...userPaints];
        invalidateSeriesCache();

        recipeDraft = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipeDraft', null);
        if (recipeDraft && recipeDraft.photo) {
            recipePhotoDataUrl = recipeDraft.photo;
        }
        if (recipeDraft && recipeDraft.ingredients && recipeDraft.ingredients.length > 0) {
            const firstPaint = paintCatalog.find(p => String(p.id) === String(recipeDraft.ingredients[0].paintId));
            if (firstPaint) {
                lockedSeries = firstPaint.series;
                lockedCategory = firstPaint.category;
            }
        } else {
            lockedSeries = null;
            lockedCategory = null;
        }
    }

    function saveData() {
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumUserPaints', userPaints);
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
        updatePaintCount();
        invalidateSeriesCache();

        if (currentSettings.backup) {
            createLocalBackup();
        }

        const user = SICOMIX.sync?.getCurrentUser();
        if (user) {
            const dataToSync = {
                recipes: recipes,
                userPaints: userPaints,
                settings: currentSettings
            };
            SICOMIX.sync.saveUserData(user.uid, dataToSync).catch(error => {
                console.error('Помилка збереження в Firestore:', error);
            });
        }
    }

    // ---------- АВТОЗБЕРЕЖЕННЯ ЧЕРНЕТКИ ----------
    function autoSaveRecipeDraft() {
        if (!currentSettings.autoSave) return;
        if (!document.getElementById('new-recipe-page')?.classList.contains('active')) return;
        if (isEditingRecipe) return;

        const draft = {
            name: document.getElementById('recipeName')?.value || '',
            category: document.getElementById('recipeCategory')?.value || '',
            series: document.getElementById('recipeSeries')?.value || '',
            description: document.getElementById('recipeDescription')?.value || '',
            ingredients: selectedIngredients.map(ing => ({ ...ing })),
            photo: recipePhotoDataUrl
        };
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipeDraft', draft);
        recipeDraft = draft;
    }

    const debouncedAutoSave = SICOMIX.utils.debounce(autoSaveRecipeDraft, 300);

    function attachAutoSaveListeners() {
        const recipeName = document.getElementById('recipeName');
        const recipeCategory = document.getElementById('recipeCategory');
        const recipeSeries = document.getElementById('recipeSeries');
        const recipeDescription = document.getElementById('recipeDescription');

        if (recipeName) recipeName.addEventListener('input', debouncedAutoSave);
        if (recipeCategory) recipeCategory.addEventListener('change', debouncedAutoSave);
        if (recipeSeries) recipeSeries.addEventListener('change', debouncedAutoSave);
        if (recipeDescription) recipeDescription.addEventListener('input', debouncedAutoSave);
    }

    function loadRecipeDraft() {
        if (isEditingRecipe || !recipeDraft) return;
        document.getElementById('recipeName').value = recipeDraft.name || '';
        document.getElementById('recipeCategory').value = recipeDraft.category || '';
        document.getElementById('recipeSeries').value = recipeDraft.series || '';
        selectedSeries = recipeDraft.series || '';
        document.getElementById('recipeDescription').value = recipeDraft.description || '';
        selectedIngredients = (recipeDraft.ingredients || []).map(ing => ({ ...ing }));
        if (recipeDraft.photo) {
            recipePhotoDataUrl = recipeDraft.photo;
            showPhotoPreview(recipePhotoDataUrl);
        } else {
            resetPhotoPreview();
        }
        if (selectedIngredients.length > 0) {
            const firstPaint = paintCatalog.find(p => String(p.id) === String(selectedIngredients[0].paintId));
            if (firstPaint) {
                lockedSeries = firstPaint.series;
                lockedCategory = firstPaint.category;
            }
        } else {
            lockedSeries = null;
            lockedCategory = null;
        }
        if (SICOMIX.app.renderIngredientsList) SICOMIX.app.renderIngredientsList();
        if (SICOMIX.app.calculatePercentages) SICOMIX.app.calculatePercentages();
        updateSeriesLockUI();
    }

    function clearRecipeDraft() {
        localStorage.removeItem('sicoSpectrumRecipeDraft');
        recipeDraft = null;
        recipePhotoDataUrl = null;
        resetPhotoPreview();
        lockedSeries = null;
        lockedCategory = null;
        updateSeriesLockUI();
    }

    function updateSeriesLockUI() {
        const seriesSelect = document.getElementById('recipeSeries');
        if (!seriesSelect) return;
        if (lockedSeries && selectedIngredients.length > 0) {
            seriesSelect.value = lockedSeries;
            seriesSelect.disabled = true;
        } else {
            seriesSelect.disabled = false;
            if (!selectedSeries && seriesSelect.value) {
                selectedSeries = seriesSelect.value;
            }
        }
    }

    function validatePaintAddition(paint) {
        if (selectedIngredients.length === 0) {
            lockedSeries = paint.series;
            lockedCategory = paint.category;
            updateSeriesLockUI();
            return { valid: true, message: '' };
        }

        if (paint.series !== lockedSeries) {
            return { valid: false, message: SICOMIX.i18n.t('series_mismatch') };
        }

        if (paint.category !== lockedCategory) {
            return { valid: false, message: SICOMIX.i18n.t('category_mismatch') };
        }

        return { valid: true, message: '' };
    }

    function getDefaultUnitSymbol() {
        const unitKey = currentSettings.units || 'grams';
        return unitMap[unitKey] || 'г';
    }

    function updatePaintCount() {
        const count = paintCatalog.length;
        if (dom.totalPaintsEl) dom.totalPaintsEl.textContent = count;
        if (dom.headerPaintCount) dom.headerPaintCount.textContent = count;
    }

    function createLocalBackup() {
        const backupData = {
            recipes: recipes,
            userPaints: userPaints,
            settings: currentSettings,
            timestamp: new Date().toISOString()
        };
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumBackup', backupData);
        SICOMIX.utils.showNotification(SICOMIX.i18n.t('backup_created'), 'success');
    }

    function exportBackup() {
        const backupData = {
            recipes: recipes,
            userPaints: userPaints,
            settings: currentSettings,
            timestamp: new Date().toISOString()
        };
        const filename = `sico_spectrum_backup_${new Date().toISOString().split('T')[0]}.json`;
        SICOMIX.utils.exportToFile(backupData, filename, 'application/json');
        SICOMIX.utils.showNotification(SICOMIX.i18n.t('backup_exported'), 'success');
    }

    // ---------- ДОПОМІЖНІ ФУНКЦІЇ ----------
    function populateCategoryFilters() {
        const uniqueCategories = [...new Set(paintCatalog.map(p => p.category).filter(Boolean))].sort();
        
        const selects = [
            document.getElementById('recipeCategory'),
            document.getElementById('categoryFilter'),
            document.getElementById('recipeCategoryFilter')
        ];
        
        selects.forEach(sel => {
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = `<option value="" data-i18n="select_category">${SICOMIX.i18n.t('select_category')}</option>`;
            
            uniqueCategories.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = SICOMIX.i18n.translateCategoryName(c);
                sel.appendChild(opt);
            });
            
            if (current && uniqueCategories.includes(current)) {
                sel.value = current;
            }
        });
        
        SICOMIX.i18n.applyTranslations();
    }

    function populateStandardCategorySelect(selectElement) {
        if (!selectElement) return;
        const standardCategories = SICOMIX.data.categories || [];
        const current = selectElement.value;
        selectElement.innerHTML = `<option value="" data-i18n="select_category">${SICOMIX.i18n.t('select_category')}</option>`;
        standardCategories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = SICOMIX.i18n.translateCategoryName(c);
            selectElement.appendChild(opt);
        });
        if (current && standardCategories.includes(current)) {
            selectElement.value = current;
        }
        SICOMIX.i18n.applyTranslations();
    }

    function populateSeriesSelect() {
        const seriesSelect = document.getElementById('recipeSeries');
        if (!seriesSelect) return;
        
        const allSeries = SICOMIX.data.series || [];
        const current = seriesSelect.value;
        
        seriesSelect.innerHTML = `<option value="" data-i18n="select_series">${SICOMIX.i18n.t('select_series')}</option>`;
        
        allSeries.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name[SICOMIX.i18n.getLanguage()] || s.id;
            seriesSelect.appendChild(opt);
        });
        
        if (current && allSeries.some(s => s.id === current)) {
            seriesSelect.value = current;
        } else {
            seriesSelect.value = '';
        }
        
        SICOMIX.i18n.applyTranslations();
    }

    function showPhotoPreview(dataUrl) {
        if (!dom.recipePhotoPreview || !dom.recipePhotoImg || !dom.fileNameSpan) return;
        dom.recipePhotoPreview.style.display = 'block';
        dom.recipePhotoImg.src = dataUrl;
        dom.fileNameSpan.textContent = SICOMIX.i18n.t('photo_uploaded');
    }

    function resetPhotoPreview() {
        if (!dom.recipePhotoPreview || !dom.recipePhotoImg || !dom.fileNameSpan) return;
        dom.recipePhotoPreview.style.display = 'none';
        dom.recipePhotoImg.src = '';
        dom.fileNameSpan.textContent = SICOMIX.i18n.t('upload_photo');
    }

    function getUniqueSeries() {
        if (!cachedUniqueSeries) {
            const allSeries = SICOMIX.data.series || [];
            const seriesMap = new Map();
            allSeries.forEach(series => seriesMap.set(series.id, series));
            cachedUniqueSeries = Array.from(seriesMap.values());
        }
        return cachedUniqueSeries;
    }

    function invalidateSeriesCache() {
        cachedUniqueSeries = null;
    }

    // ---------- НАВІГАЦІЯ ----------
    function hasUnsavedChanges() {
        const newRecipeActive = document.getElementById('new-recipe-page')?.classList.contains('active');
        if (!newRecipeActive) {
            console.log('📝 hasUnsavedChanges: сторінка не new-recipe, повертаємо false');
            return false;
        }
        if (isEditingRecipe) {
            console.log('📝 hasUnsavedChanges: режим редагування, повертаємо false (або можна true, якщо є зміни)');
            // Якщо потрібно попереджати і при редагуванні, можна додати перевірку на зміни
            return false;
        }

        const name = document.getElementById('recipeName')?.value.trim() || '';
        const category = document.getElementById('recipeCategory')?.value || '';
        const series = document.getElementById('recipeSeries')?.value || '';
        const description = document.getElementById('recipeDescription')?.value.trim() || '';

        const hasText = !!(name || category || series || description);
        const hasIngredients = selectedIngredients.length > 0;
        const hasPhoto = !!recipePhotoDataUrl;

        console.log('📝 hasUnsavedChanges:', { name, category, series, description, hasText, hasIngredients, hasPhoto });

        return hasText || hasIngredients || hasPhoto;
    }

    function performSwitch(pageId) {
        const targetPage = document.getElementById(`${pageId}-page`);
        if (!targetPage) {
            console.error('❌ Сторінка не знайдена:', pageId);
            return;
        }
        if (targetPage.classList.contains('active')) {
            console.log('⏭️ Сторінка вже активна');
            return;
        }

        if (isEditingRecipe && pageId !== 'new-recipe') {
            resetEditMode();
        }

        console.log('🗂️ Приховуємо всі сторінки...');
        dom.pageContents.forEach(p => {
            p.classList.remove('active');
            console.log('   - приховано', p.id);
        });

        targetPage.classList.add('active');
        console.log('✅ Показано сторінку', targetPage.id);

        dom.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        if (pageId === 'recipes') {
            console.log('🍳 Викликаємо renderRecipes');
            if (SICOMIX.app.renderRecipes) SICOMIX.app.renderRecipes();
        } else if (pageId === 'catalog') {
            console.log('📚 Викликаємо renderPaintCatalog');
            catalogPage = 1;
            if (SICOMIX.app.renderPaintCatalog) SICOMIX.app.renderPaintCatalog();
        } else if (pageId === 'new-recipe') {
            console.log('🆕 Підготовка нової рецептури');
            const seriesSelect = document.getElementById('recipeSeries');
            if (seriesSelect && seriesSelect.options.length <= 1) {
                populateSeriesSelect();
            }
            const catSelect = document.getElementById('recipeCategory');
            if (catSelect && catSelect.options.length <= 1) {
                populateCategoryFilters();
            }
            if (!isEditingRecipe) {
                if (selectedIngredients.length === 0) {
                    loadRecipeDraft();
                }
                if (recipePhotoDataUrl) {
                    showPhotoPreview(recipePhotoDataUrl);
                } else {
                    resetPhotoPreview();
                }
            }
            updateSeriesLockUI();
            if (SICOMIX.app.renderIngredientsList) SICOMIX.app.renderIngredientsList();
        } else if (pageId === 'pantone') {
            console.log('🎨 Викликаємо renderPantoneCatalog');
            if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
        } else if (pageId === 'ral') {
            console.log('🎨 Викликаємо renderRalCatalog');
            if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
        }
    }

    function switchPage(pageId) {
        console.log('🔄 switchPage викликано з pageId =', pageId);
        if (!pageId) {
            console.warn('⚠️ pageId порожній');
            return;
        }

        if (hasUnsavedChanges() && pageId !== 'new-recipe') {
            console.log('⚠️ Є незбережені зміни, показуємо підтвердження');
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('unsaved_changes_warning'),
                SICOMIX.i18n.t('confirmation_message'),
                () => {
                    // Підтвердили – переходимо
                    performSwitch(pageId);
                },
                () => {
                    // Скасували – нічого не робимо
                    console.log('⏭️ Перехід скасовано');
                }
            );
            return;
        }

        // Якщо змін немає, переходимо одразу
        performSwitch(pageId);
    }

    function resetEditMode() {
        isEditingRecipe = false;
        editingRecipeId = null;
        if (dom.saveRecipeBtn) {
            dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
            SICOMIX.i18n.applyTranslations();
        }
    }

    // ---------- НАЛАШТУВАННЯ ----------
    function initSettings() {
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

    // ---------- ІМПОРТ/ЕКСПОРТ ----------
    function startImport() {
        if (!dom.importFile || !dom.importFile.files || dom.importFile.files.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_import_file'), 'error');
            return;
        }

        if (!dom.importRecipesCheckbox?.checked && !dom.importPaintsCheckbox?.checked) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_data_to_import'), 'warning');
            return;
        }

        const file = dom.importFile.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                let data;
                if (file.name.endsWith('.json')) {
                    data = JSON.parse(e.target.result);
                } else if (file.name.endsWith('.csv')) {
                    data = SICOMIX.utils.parseCSV(e.target.result);
                } else {
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                    return;
                }

                const importRecipes = dom.importRecipesCheckbox?.checked;
                const importPaints = dom.importPaintsCheckbox?.checked;

                let recipesCount = 0;
                let paintsCount = 0;

                if (importRecipes && data.recipes && Array.isArray(data.recipes)) {
                    data.recipes.forEach(r => {
                        r.id = SICOMIX.utils.generateId();
                        if (r.ingredients) {
                            r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                        }
                        recipes.push(r);
                        recipesCount++;
                    });
                }
                if (importPaints && data.paints && Array.isArray(data.paints)) {
                    data.paints.forEach(p => {
                        p.id = SICOMIX.utils.generateId();
                        p.isDefault = false;
                        userPaints.push(p);
                        paintsCount++;
                    });
                    paintCatalog = [...basePaints, ...userPaints];
                    invalidateSeriesCache();
                }

                saveData();
                populateCategoryFilters();
                if (SICOMIX.app.renderRecipes) SICOMIX.app.renderRecipes();
                if (SICOMIX.app.renderPaintCatalog) SICOMIX.app.renderPaintCatalog();
                if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
                if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();

                let message = SICOMIX.i18n.t('imported') + '!';
                if (recipesCount > 0 && paintsCount > 0) {
                    message = `${SICOMIX.i18n.t('imported')} ${recipesCount} ${SICOMIX.i18n.t('recipes')} ${SICOMIX.i18n.t('and')} ${paintsCount} ${SICOMIX.i18n.t('paints')}`;
                } else if (recipesCount > 0) {
                    message = `${SICOMIX.i18n.t('imported')} ${recipesCount} ${SICOMIX.i18n.t('recipes')}`;
                } else if (paintsCount > 0) {
                    message = `${SICOMIX.i18n.t('imported')} ${paintsCount} ${SICOMIX.i18n.t('paints')}`;
                }
                SICOMIX.utils.showNotification(message, 'success');

            } catch (err) {
                console.error(err);
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
            }
        };
        reader.readAsText(file);
    }

    function startExport() {
        const format = dom.exportFormat?.value || 'json';
        const exportRecipes = dom.exportRecipesCheckbox?.checked;
        const includePhotos = dom.includePhotosCheckbox?.checked;

        if (!exportRecipes) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_data_to_export'), 'warning');
            return;
        }

        let exportData = {};

        if (exportRecipes) {
            if (!includePhotos) {
                exportData.recipes = recipes.map(r => {
                    const { photo, ...rest } = r;
                    return rest;
                });
            } else {
                exportData.recipes = recipes;
            }
        }

        const filename = `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.${format}`;

        if (format === 'csv') {
            try {
                const simpleRecipes = exportData.recipes.map(r => ({
                    id: r.id,
                    name: r.name,
                    category: r.category,
                    series: r.series,
                    description: r.description || '',
                    date: r.date || '',
                    ingredients: JSON.stringify(r.ingredients)
                }));
                const csvContent = SICOMIX.utils.convertToCSV(simpleRecipes);
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
            } catch (e) {
                console.error('Помилка створення CSV:', e);
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('export_error'), 'error');
            }
        } else {
            SICOMIX.utils.exportToFile(exportData, filename, 'application/json');
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
        }
    }

    // ---------- ГОЛОВНІ ПОДІЇ ----------
    function setupCoreEventListeners() {
        console.log('🔊 setupCoreEventListeners викликано');

        document.addEventListener('click', function(e) {
            console.log('🖱️ Клік по document, target:', e.target);

            const navLink = e.target.closest('.nav-link[data-page]');
            if (navLink) {
                console.log('✅ Знайдено navLink з data-page =', navLink.getAttribute('data-page'));
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                switchPage(page);
                if (window.innerWidth <= 992) {
                    dom.sidebar?.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                return;
            }

            const actionCard = e.target.closest('.action-card[data-page]');
            if (actionCard) {
                console.log('✅ Знайдено actionCard з data-page =', actionCard.getAttribute('data-page'));
                e.preventDefault();
                const page = actionCard.getAttribute('data-page');
                switchPage(page);
                return;
            }
        });

        if (dom.menuToggle) {
            dom.menuToggle.addEventListener('click', () => {
                dom.sidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        if (dom.desktopMenuToggle) {
            dom.desktopMenuToggle.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    dom.sidebar.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    dom.sidebar.classList.add('active');
                    dom.mainContainer.classList.add('sidebar-open');
                }
            });
        }
        if (dom.closeSidebar) {
            dom.closeSidebar.addEventListener('click', () => {
                dom.sidebar.classList.remove('active');
                dom.mainContainer.classList.remove('sidebar-open');
                document.body.style.overflow = 'auto';
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (dom.sidebar?.classList.contains('active') && window.innerWidth <= 992) {
                    dom.sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                if (dom.addPaintModal?.classList.contains('active')) {
                    dom.addPaintModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                if (dom.seriesDetailsModal?.classList.contains('active')) {
                    dom.seriesDetailsModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                if (dom.pantoneRecipeModal?.classList.contains('active')) {
                    dom.pantoneRecipeModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                if (dom.weightInputModal?.classList.contains('active')) {
                    dom.weightInputModal.classList.remove('active');
                }
            }
        });

        document.addEventListener('click', function(e) {
            if (!dom.sidebar || window.innerWidth > 992) return;
            if (!dom.sidebar.classList.contains('active')) return;
            if (dom.sidebar.contains(e.target) || dom.menuToggle?.contains(e.target) || dom.desktopMenuToggle?.contains(e.target) || dom.closeSidebar?.contains(e.target)) return;
            dom.sidebar.classList.remove('active');
            dom.mainContainer?.classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
        });

        attachAutoSaveListeners();

        if (dom.startImportBtn) {
            dom.startImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                startImport();
            });
        }
        if (dom.startExportBtn) {
            dom.startExportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                startExport();
            });
        }

        window.addEventListener('beforeunload', function(e) {
            if (hasUnsavedChanges()) {
                const message = SICOMIX.i18n.t('unsaved_changes_warning');
                e.returnValue = message;
                return message;
            }
        });
    }

    // ---------- ПРИВ'ЯЗКА ВСІХ ОБРОБНИКІВ З МОДУЛІВ ----------
    function attachAllEventListeners() {
        console.log('🔌 attachAllEventListeners початок');
        if (SICOMIX.app.attachRecipeEventListeners) {
            console.log('✅ attachRecipeEventListeners викликається');
            SICOMIX.app.attachRecipeEventListeners();
        } else {
            console.warn('❌ attachRecipeEventListeners не знайдено');
        }
        if (SICOMIX.app.attachCatalogEventListeners) {
            console.log('✅ attachCatalogEventListeners викликається');
            SICOMIX.app.attachCatalogEventListeners();
        } else {
            console.warn('❌ attachCatalogEventListeners не знайдено');
        }
        if (SICOMIX.app.attachSettingsEventListeners) {
            console.log('✅ attachSettingsEventListeners викликається');
            SICOMIX.app.attachSettingsEventListeners();
        } else {
            console.warn('❌ attachSettingsEventListeners не знайдено');
        }
        console.log('🔌 attachAllEventListeners завершено');
    }

    // ---------- ІНІЦІАЛІЗАЦІЯ ----------
    async function initApp() {
        cacheDOMElements();

        const auth = SICOMIX.firebase?.auth;
        if (auth) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    console.log('Користувач увійшов:', user.email);
                    await loadData();
                } else {
                    console.log('Користувач вийшов');
                    await loadData();
                }
                populateSeriesSelect();
                populateCategoryFilters();
                initSettings();
                updatePaintCount();
                attachAllEventListeners();
                setupCoreEventListeners();

                const activePage = document.querySelector('.page-content.active');
                if (activePage) {
                    const pageId = activePage.id.replace('-page', '');
                    switchPage(pageId);
                }

                if (window.innerWidth > 992) {
                    dom.sidebar.classList.add('active');
                    dom.mainContainer.classList.add('sidebar-open');
                }

                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.remove(), 500);
                }

                SICOMIX.utils.showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
            });
        } else {
            await loadData();
            populateSeriesSelect();
            populateCategoryFilters();
            initSettings();
            updatePaintCount();
            attachAllEventListeners();
            setupCoreEventListeners();

            const activePage = document.querySelector('.page-content.active');
            if (activePage) {
                const pageId = activePage.id.replace('-page', '');
                switchPage(pageId);
            }

            if (window.innerWidth > 992) {
                dom.sidebar.classList.add('active');
                dom.mainContainer.classList.add('sidebar-open');
            }

            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 500);
            }

            SICOMIX.utils.showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
        }
    }

    // ---------- ПУБЛІЧНІ МЕТОДИ ----------
    SICOMIX.app = SICOMIX.app || {};
    Object.assign(SICOMIX.app, {
        // Стан (геттери)
        getRecipes: () => recipes,
        getUserPaints: () => userPaints,
        getPaintCatalog: () => paintCatalog,
        getSelectedIngredients: () => selectedIngredients,
        getSelectedRecipes: () => selectedRecipes,
        getCurrentSettings: () => currentSettings,
        getIsEditingRecipe: () => isEditingRecipe,
        getEditingRecipeId: () => editingRecipeId,
        getLockedSeries: () => lockedSeries,
        getLockedCategory: () => lockedCategory,
        getRecipePhotoDataUrl: () => recipePhotoDataUrl,
        getCatalogPage: () => catalogPage,
        getCATALOG_PAGE_SIZE: () => CATALOG_PAGE_SIZE,

        // Сеттери
        setRecipes: (newRecipes) => { recipes = newRecipes; },
        setUserPaints: (newPaints) => { userPaints = newPaints; },
        setPaintCatalog: (newCatalog) => { paintCatalog = newCatalog; },
        setSelectedIngredients: (newIngredients) => { selectedIngredients = newIngredients; },
        setSelectedRecipes: (newSelected) => { selectedRecipes = newSelected; },
        setCurrentSettings: (newSettings) => { currentSettings = newSettings; },
        setIsEditingRecipe: (value) => { isEditingRecipe = value; },
        setEditingRecipeId: (id) => { editingRecipeId = id; },
        setLockedSeries: (series) => { lockedSeries = series; },
        setLockedCategory: (category) => { lockedCategory = category; },
        setRecipePhotoDataUrl: (url) => { recipePhotoDataUrl = url; },
        setRecipeDraft: (draft) => { recipeDraft = draft; },
        setCatalogPage: (page) => { catalogPage = page; },
        setSelectedSeries: (series) => { selectedSeries = series; },

        // Базові функції
        cacheDOMElements,
        loadData,
        saveData,
        autoSaveRecipeDraft,
        debouncedAutoSave,
        attachAutoSaveListeners,
        loadRecipeDraft,
        clearRecipeDraft,
        updateSeriesLockUI,
        validatePaintAddition,
        getDefaultUnitSymbol,
        updatePaintCount,
        createLocalBackup,
        exportBackup,
        populateCategoryFilters,
        populateStandardCategorySelect,
        populateSeriesSelect,
        showPhotoPreview,
        resetPhotoPreview,
        getUniqueSeries,
        invalidateSeriesCache,
        dom,
        unitMap,

        // Навігація та налаштування
        switchPage,
        resetEditMode,
        initSettings,
        applyTheme,
        applyCatalogLayout,

        // Імпорт/Експорт
        startImport,
        startExport,

        // Головна ініціалізація
        init: initApp,

        // Додаємо функції, які будуть використовуватися в інших модулях
        attachAllEventListeners,
        hasUnsavedChanges
    });

})(window);
