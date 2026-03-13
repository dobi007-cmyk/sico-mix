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
    let catalogFilteredSeries = [];
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
        renderIngredientsList();
        calculatePercentages();
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
        dom, // об'єкт з DOM елементами
        unitMap
    });

    // Ініціалізація (буде викликана з app.js)
    SICOMIX.app.init = async function() {
        cacheDOMElements();
        // Завантаження даних відбувається в app.js після авторизації
    };

})(window);
