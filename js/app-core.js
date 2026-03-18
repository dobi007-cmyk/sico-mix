// ========== CORE MODULE ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';
import * as sync from './sync.js';
import { data } from './data-colors.js';

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

    // Елементи авторизації
    dom.authButton = document.getElementById('authButton');
    dom.authModal = document.getElementById('authModal');
    dom.closeAuthModal = document.getElementById('closeAuthModal');
    dom.authEmail = document.getElementById('authEmail');
    dom.authPassword = document.getElementById('authPassword');
    dom.authLoginBtn = document.getElementById('authLoginBtn');
    dom.authSignupBtn = document.getElementById('authSignupBtn');
    dom.authGoogleBtn = document.getElementById('authGoogleBtn');
}

// ---------- ЗАВАНТАЖЕННЯ ТА ЗБЕРЕЖЕННЯ ----------
async function loadData() {
    if (data && Array.isArray(data.paints)) {
        basePaints = data.paints.map(p => ({
            ...p,
            id: String(p.id),
            isDefault: true
        }));
    } else {
        console.error('[SICOMIX] data.paints не знайдено!');
        basePaints = [];
    }

    userPaints = utils.loadFromLocalStorage('sicoSpectrumUserPaints', [])
        .map(p => ({ ...p, id: String(p.id), isDefault: false }));

    recipes = utils.loadFromLocalStorage('sicoSpectrumRecipes', [])
        .map(r => ({
            ...r,
            id: String(r.id),
            ingredients: (r.ingredients || []).map(ing => ({
                ...ing,
                paintId: String(ing.paintId)
            }))
        }));

    currentSettings = utils.loadFromLocalStorage('sicoSpectrumSettings', data.defaultSettings || {});

    const user = sync.getCurrentUser();
    if (user) {
        try {
            const remoteData = await sync.loadUserData(user.uid);
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

    recipeDraft = utils.loadFromLocalStorage('sicoSpectrumRecipeDraft', null);
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
    utils.saveToLocalStorage('sicoSpectrumUserPaints', userPaints);
    utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
    utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
    updatePaintCount();
    invalidateSeriesCache();

    if (currentSettings.backup) {
        createLocalBackup();
    }

    const user = sync.getCurrentUser();
    if (user) {
        const dataToSync = {
            recipes: recipes,
            userPaints: userPaints,
            settings: currentSettings
        };
        sync.saveUserData(user.uid, dataToSync).catch(error => {
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
    utils.saveToLocalStorage('sicoSpectrumRecipeDraft', draft);
    recipeDraft = draft;
}

const debouncedAutoSave = utils.debounce(autoSaveRecipeDraft, 300);

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
    if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    if (window.SICOMIX?.app?.calculatePercentages) window.SICOMIX.app.calculatePercentages();
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
        return { valid: false, message: i18n.t('series_mismatch') };
    }

    if (paint.category !== lockedCategory) {
        return { valid: false, message: i18n.t('category_mismatch') };
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
    utils.saveToLocalStorage('sicoSpectrumBackup', backupData);
    utils.showNotification(i18n.t('backup_created'), 'success');
}

function exportBackup() {
    const backupData = {
        recipes: recipes,
        userPaints: userPaints,
        settings: currentSettings,
        timestamp: new Date().toISOString()
    };
    const filename = `sico_spectrum_backup_${new Date().toISOString().split('T')[0]}.json`;
    utils.exportToFile(backupData, filename, 'application/json');
    utils.showNotification(i18n.t('backup_exported'), 'success');
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
        sel.innerHTML = `<option value="" data-i18n="select_category">${i18n.t('select_category')}</option>`;
        
        uniqueCategories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = i18n.translateCategoryName(c);
            sel.appendChild(opt);
        });
        
        if (current && uniqueCategories.includes(current)) {
            sel.value = current;
        }
    });
    
    i18n.applyTranslations();
}

function populateStandardCategorySelect(selectElement) {
    if (!selectElement) return;
    const standardCategories = data.categories || [];
    const current = selectElement.value;
    selectElement.innerHTML = `<option value="" data-i18n="select_category">${i18n.t('select_category')}</option>`;
    standardCategories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = i18n.translateCategoryName(c);
        selectElement.appendChild(opt);
    });
    if (current && standardCategories.includes(current)) {
        selectElement.value = current;
    }
    i18n.applyTranslations();
}

function populateSeriesSelect() {
    const seriesSelect = document.getElementById('recipeSeries');
    if (!seriesSelect) return;
    
    const allSeries = data.series || [];
    const current = seriesSelect.value;
    
    seriesSelect.innerHTML = `<option value="" data-i18n="select_series">${i18n.t('select_series')}</option>`;
    
    allSeries.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.name[i18n.getLanguage()] || s.id;
        seriesSelect.appendChild(opt);
    });
    
    if (current && allSeries.some(s => s.id === current)) {
        seriesSelect.value = current;
    } else {
        seriesSelect.value = '';
    }
    
    i18n.applyTranslations();
}

function showPhotoPreview(dataUrl) {
    if (!dom.recipePhotoPreview || !dom.recipePhotoImg || !dom.fileNameSpan) return;
    dom.recipePhotoPreview.style.display = 'block';
    dom.recipePhotoImg.src = dataUrl;
    dom.fileNameSpan.textContent = i18n.t('photo_uploaded');
}

function resetPhotoPreview() {
    if (!dom.recipePhotoPreview || !dom.recipePhotoImg || !dom.fileNameSpan) return;
    dom.recipePhotoPreview.style.display = 'none';
    dom.recipePhotoImg.src = '';
    dom.fileNameSpan.textContent = i18n.t('upload_photo');
}

function getUniqueSeries() {
    if (!cachedUniqueSeries) {
        const allSeries = data.series || [];
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
        return false;
    }

    if (isEditingRecipe && editingRecipeId) {
        const originalRecipe = recipes.find(r => String(r.id) === String(editingRecipeId));
        if (!originalRecipe) return false;

        const currentName = document.getElementById('recipeName')?.value.trim() || '';
        const currentCategory = document.getElementById('recipeCategory')?.value || '';
        const currentSeries = document.getElementById('recipeSeries')?.value || '';
        const currentDesc = document.getElementById('recipeDescription')?.value.trim() || '';
        const currentPhoto = recipePhotoDataUrl || null;

        const nameChanged = currentName !== (originalRecipe.name || '');
        const categoryChanged = currentCategory !== (originalRecipe.category || '');
        const seriesChanged = currentSeries !== (originalRecipe.series || '');
        const descChanged = currentDesc !== (originalRecipe.description || '');
        const photoChanged = currentPhoto !== (originalRecipe.photo || null);

        let ingredientsChanged = false;
        const currentIngredients = selectedIngredients;
        const originalIngredients = originalRecipe.ingredients || [];
        if (currentIngredients.length !== originalIngredients.length) {
            ingredientsChanged = true;
        } else {
            for (let i = 0; i < currentIngredients.length; i++) {
                const a = currentIngredients[i];
                const b = originalIngredients[i];
                if (a.paintId !== b.paintId || a.amount !== b.amount || a.unit !== b.unit) {
                    ingredientsChanged = true;
                    break;
                }
            }
        }

        const changed = nameChanged || categoryChanged || seriesChanged || descChanged || photoChanged || ingredientsChanged;
        return changed;
    }

    const name = document.getElementById('recipeName')?.value.trim() || '';
    const category = document.getElementById('recipeCategory')?.value || '';
    const series = document.getElementById('recipeSeries')?.value || '';
    const description = document.getElementById('recipeDescription')?.value.trim() || '';

    const hasText = !!(name || category || series || description);
    const hasIngredients = selectedIngredients.length > 0;
    const hasPhoto = !!recipePhotoDataUrl;

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
        clearRecipeForm();
        clearRecipeDraft();
    }

    dom.pageContents.forEach(p => {
        p.classList.remove('active');
    });

    targetPage.classList.add('active');

    dom.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    if (pageId === 'recipes') {
        if (window.SICOMIX?.app?.renderRecipes) window.SICOMIX.app.renderRecipes();
    } else if (pageId === 'catalog') {
        catalogPage = 1;
        if (window.SICOMIX?.app?.renderPaintCatalog) window.SICOMIX.app.renderPaintCatalog();
    } else if (pageId === 'new-recipe') {
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
        if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    } else if (pageId === 'pantone') {
        if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
    } else if (pageId === 'ral') {
        if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
    }
}

function switchPage(pageId) {
    if (!pageId) {
        console.warn('⚠️ pageId порожній');
        return;
    }

    if (hasUnsavedChanges() && pageId !== 'new-recipe') {
        utils.showConfirmation(
            i18n.t('unsaved_changes_warning'),
            i18n.t('confirmation_message'),
            () => {
                if (isEditingRecipe) {
                    resetEditMode();
                    clearRecipeForm();
                    clearRecipeDraft();
                } else {
                    clearRecipeDraft();
                }
                performSwitch(pageId);
            },
            () => {}
        );
        return;
    }

    performSwitch(pageId);
}

function resetEditMode() {
    isEditingRecipe = false;
    editingRecipeId = null;
    if (dom.saveRecipeBtn) {
        dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
        i18n.applyTranslations();
    }
}

function clearRecipeForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeCategory').value = '';
    document.getElementById('recipeSeries').value = '';
    selectedSeries = '';
    document.getElementById('recipeDescription').value = '';
    selectedIngredients = [];
    recipePhotoDataUrl = null;
    resetPhotoPreview();
    lockedSeries = null;
    lockedCategory = null;
    updateSeriesLockUI();
    if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
    if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
    resetEditMode();
}

// ---------- НАЛАШТУВАННЯ ----------
function initSettings() {
    if (dom.unitsSelect) dom.unitsSelect.value = currentSettings.units || 'grams';
    if (dom.autoSaveCheckbox) dom.autoSaveCheckbox.checked = currentSettings.autoSave !== false;
    if (dom.backupCheckbox) dom.backupCheckbox.checked = currentSettings.backup === true;
    if (dom.languageSelect) dom.languageSelect.value = i18n.getLanguage();
    if (dom.themeSelect) dom.themeSelect.value = currentSettings.theme || 'spectrum';
    if (dom.catalogLayoutSelect) dom.catalogLayoutSelect.value = currentSettings.catalogLayout || 'classic';
    
    if (window.SICOMIX?.app?.updateLayoutOptionsText) window.SICOMIX.app.updateLayoutOptionsText();
    
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
    if (window.SICOMIX?.app?.renderPaintCatalog) {
        window.SICOMIX.app.setCatalogPage(1);
        window.SICOMIX.app.renderPaintCatalog();
    }
}

// ---------- ІМПОРТ/ЕКСПОРТ ----------
function startImport() {
    if (!dom.importFile || !dom.importFile.files || dom.importFile.files.length === 0) {
        utils.showNotification(i18n.t('select_import_file'), 'error');
        return;
    }

    if (!dom.importRecipesCheckbox?.checked && !dom.importPaintsCheckbox?.checked) {
        utils.showNotification(i18n.t('select_data_to_import'), 'warning');
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
                data = utils.parseCSV(e.target.result);
            } else {
                utils.showNotification(i18n.t('invalid_file_format'), 'error');
                return;
            }

            const importRecipes = dom.importRecipesCheckbox?.checked;
            const importPaints = dom.importPaintsCheckbox?.checked;

            let recipesCount = 0;
            let paintsCount = 0;

            if (importRecipes && data.recipes && Array.isArray(data.recipes)) {
                data.recipes.forEach(r => {
                    r.id = utils.generateId();
                    if (r.ingredients) {
                        r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                    }
                    recipes.push(r);
                    recipesCount++;
                });
            }
            if (importPaints && data.paints && Array.isArray(data.paints)) {
                data.paints.forEach(p => {
                    p.id = utils.generateId();
                    p.isDefault = false;
                    userPaints.push(p);
                    paintsCount++;
                });
                paintCatalog = [...basePaints, ...userPaints];
                invalidateSeriesCache();
            }

            saveData();
            populateCategoryFilters();
            if (window.SICOMIX?.app?.renderRecipes) window.SICOMIX.app.renderRecipes();
            if (window.SICOMIX?.app?.renderPaintCatalog) window.SICOMIX.app.renderPaintCatalog();
            if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
            if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();

            let message = i18n.t('imported') + '!';
            if (recipesCount > 0 && paintsCount > 0) {
                message = `${i18n.t('imported')} ${recipesCount} ${i18n.t('recipes')} ${i18n.t('and')} ${paintsCount} ${i18n.t('paints')}`;
            } else if (recipesCount > 0) {
                message = `${i18n.t('imported')} ${recipesCount} ${i18n.t('recipes')}`;
            } else if (paintsCount > 0) {
                message = `${i18n.t('imported')} ${paintsCount} ${i18n.t('paints')}`;
            }
            utils.showNotification(message, 'success');

        } catch (err) {
            console.error(err);
            utils.showNotification(i18n.t('invalid_file_format'), 'error');
        }
    };
    reader.readAsText(file);
}

function startExport() {
    const format = dom.exportFormat?.value || 'json';
    const exportRecipes = dom.exportRecipesCheckbox?.checked;
    const includePhotos = dom.includePhotosCheckbox?.checked;

    if (!exportRecipes) {
        utils.showNotification(i18n.t('select_data_to_export'), 'warning');
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
            const csvContent = utils.convertToCSV(simpleRecipes);
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            utils.showNotification(`${i18n.t('exported')} ${recipes.length} ${i18n.t('recipes')}`, 'success');
        } catch (e) {
            console.error('Помилка створення CSV:', e);
            utils.showNotification(i18n.t('export_error'), 'error');
        }
    } else {
        utils.exportToFile(exportData, filename, 'application/json');
        utils.showNotification(`${i18n.t('exported')} ${recipes.length} ${i18n.t('recipes')}`, 'success');
    }
}

// ---------- ФУНКЦІЇ АВТОРИЗАЦІЇ ----------
async function handleLogin() {
    const email = dom.authEmail?.value.trim();
    const password = dom.authPassword?.value.trim();
    
    if (!email || !password) {
        utils.showNotification(i18n.t('fill_required_fields'), 'error');
        return;
    }
    
    try {
        const auth = window.SICOMIX?.firebase?.auth;
        if (!auth) throw new Error('Firebase auth not initialized');
        
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('Успішний вхід:', userCredential.user.email);
        utils.showNotification(i18n.t('login_success'), 'success');
        dom.authModal?.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Оновити дані після входу
        await loadData();
    } catch (error) {
        console.error('Помилка входу:', error);
        utils.showNotification(error.message || i18n.t('login_error'), 'error');
    }
}

async function handleSignup() {
    const email = dom.authEmail?.value.trim();
    const password = dom.authPassword?.value.trim();
    
    if (!email || !password) {
        utils.showNotification(i18n.t('fill_required_fields'), 'error');
        return;
    }
    
    try {
        const auth = window.SICOMIX?.firebase?.auth;
        if (!auth) throw new Error('Firebase auth not initialized');
        
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log('Успішна реєстрація:', userCredential.user.email);
        utils.showNotification(i18n.t('signup_success'), 'success');
        dom.authModal?.classList.remove('active');
        document.body.style.overflow = 'auto';
        await loadData();
    } catch (error) {
        console.error('Помилка реєстрації:', error);
        utils.showNotification(error.message || i18n.t('signup_error'), 'error');
    }
}

async function handleGoogleSignIn() {
    try {
        const auth = window.SICOMIX?.firebase?.auth;
        if (!auth) throw new Error('Firebase auth not initialized');
        
        const provider = new auth.GoogleAuthProvider();
        const userCredential = await auth.signInWithPopup(provider);
        console.log('Успішний вхід через Google:', userCredential.user.email);
        utils.showNotification(i18n.t('login_success'), 'success');
        dom.authModal?.classList.remove('active');
        document.body.style.overflow = 'auto';
        await loadData();
    } catch (error) {
        console.error('Помилка входу через Google:', error);
        utils.showNotification(error.message || i18n.t('login_error'), 'error');
    }
}

// ---------- ГОЛОВНІ ПОДІЇ ----------
function setupCoreEventListeners() {
    document.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-link[data-page]');
        if (navLink) {
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
            if (dom.authModal?.classList.contains('active')) {
                dom.authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
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

    // Обробник для кнопки "Увійти"
    if (dom.authButton) {
        dom.authButton.addEventListener('click', () => {
            if (dom.authModal) {
                dom.authModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Обробник для закриття модального вікна авторизації
    if (dom.closeAuthModal) {
        dom.closeAuthModal.addEventListener('click', () => {
            dom.authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Обробники для кнопок всередині модального вікна
    if (dom.authLoginBtn) {
        dom.authLoginBtn.addEventListener('click', handleLogin);
    }
    if (dom.authSignupBtn) {
        dom.authSignupBtn.addEventListener('click', handleSignup);
    }
    if (dom.authGoogleBtn) {
        dom.authGoogleBtn.addEventListener('click', handleGoogleSignIn);
    }

    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges()) {
            const message = i18n.t('unsaved_changes_warning');
            e.returnValue = message;
            return message;
        }
    });
}

function attachAllEventListeners() {
    if (window.SICOMIX?.app?.attachRecipeEventListeners) window.SICOMIX.app.attachRecipeEventListeners();
    if (window.SICOMIX?.app?.attachCatalogEventListeners) window.SICOMIX.app.attachCatalogEventListeners();
    if (window.SICOMIX?.app?.attachSettingsEventListeners) window.SICOMIX.app.attachSettingsEventListeners();
}

// ---------- ІНІЦІАЛІЗАЦІЯ ----------
async function initApp() {
    cacheDOMElements();

    const auth = window.SICOMIX?.firebase?.auth;
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

            utils.showNotification(i18n.t('welcome_title'), 'success', 2000);
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

        utils.showNotification(i18n.t('welcome_title'), 'success', 2000);
    }
}

// ========== ЕКСПОРТ ПУБЛІЧНИХ МЕТОДІВ (ІМЕНОВАНІ) ==========

// Геттери
export function getRecipes() { return recipes; }
export function getUserPaints() { return userPaints; }
export function getPaintCatalog() { return paintCatalog; }
export function getSelectedIngredients() { return selectedIngredients; }
export function getSelectedRecipes() { return selectedRecipes; }
export function getCurrentSettings() { return currentSettings; }
export function getIsEditingRecipe() { return isEditingRecipe; }
export function getEditingRecipeId() { return editingRecipeId; }
export function getLockedSeries() { return lockedSeries; }
export function getLockedCategory() { return lockedCategory; }
export function getRecipePhotoDataUrl() { return recipePhotoDataUrl; }
export function getCatalogPage() { return catalogPage; }
export function getCATALOG_PAGE_SIZE() { return CATALOG_PAGE_SIZE; }

// Сеттери
export function setRecipes(newRecipes) { recipes = newRecipes; }
export function setUserPaints(newPaints) { userPaints = newPaints; }
export function setPaintCatalog(newCatalog) { paintCatalog = newCatalog; }
export function setSelectedIngredients(newIngredients) { selectedIngredients = newIngredients; }
export function setSelectedRecipes(newSelected) { selectedRecipes = newSelected; }
export function setCurrentSettings(newSettings) { currentSettings = newSettings; }
export function setIsEditingRecipe(value) { isEditingRecipe = value; }
export function setEditingRecipeId(id) { editingRecipeId = id; }
export function setLockedSeries(series) { lockedSeries = series; }
export function setLockedCategory(category) { lockedCategory = category; }
export function setRecipePhotoDataUrl(url) { recipePhotoDataUrl = url; }
export function setRecipeDraft(draft) { recipeDraft = draft; }
export function setCatalogPage(page) { catalogPage = page; }
export function setSelectedSeries(series) { selectedSeries = series; }

// Інші функції (вже визначені вище)
export {
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
    switchPage,
    resetEditMode,
    clearRecipeForm,
    initSettings,
    applyTheme,
    applyCatalogLayout,
    startImport,
    startExport,
    initApp as init,
    attachAllEventListeners,
    hasUnsavedChanges
};

// Експорт констант та об'єктів, які можуть знадобитися
export { unitMap, dom, CATALOG_PAGE_SIZE };

// Для зворотної сумісності створюємо глобальний об'єкт
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.app = {
    getRecipes,
    getUserPaints,
    getPaintCatalog,
    getSelectedIngredients,
    getSelectedRecipes,
    getCurrentSettings,
    getIsEditingRecipe,
    getEditingRecipeId,
    getLockedSeries,
    getLockedCategory,
    getRecipePhotoDataUrl,
    getCatalogPage,
    getCATALOG_PAGE_SIZE,
    setRecipes,
    setUserPaints,
    setPaintCatalog,
    setSelectedIngredients,
    setSelectedRecipes,
    setCurrentSettings,
    setIsEditingRecipe,
    setEditingRecipeId,
    setLockedSeries,
    setLockedCategory,
    setRecipePhotoDataUrl,
    setRecipeDraft,
    setCatalogPage,
    setSelectedSeries,
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
    switchPage,
    resetEditMode,
    clearRecipeForm,
    initSettings,
    applyTheme,
    applyCatalogLayout,
    startImport,
    startExport,
    init: initApp,
    attachAllEventListeners,
    hasUnsavedChanges
};
