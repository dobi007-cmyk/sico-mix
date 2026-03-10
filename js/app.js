// ========== ОСНОВНИЙ МОДУЛЬ ДОДАТКУ ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    SICOMIX.app = (function() {
        // ---------- СТАН ----------
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

        // Для пагінації каталогу
        let catalogFilteredSeries = [];
        let catalogPage = 1;
        const CATALOG_PAGE_SIZE = 5;

        // ---------- DOM ЕЛЕМЕНТИ ----------
        let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
        let navLinks, pageContents, totalPaintsEl, headerPaintCount;
        let ingredientsList, paintSearch, categoryFilter;
        let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, scanRecipeBtn;
        let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
        let paintCatalogEl, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
        let languageSelect, unitsSelect, themeSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;
        let actionCards;
        let startImportBtn, startExportBtn, importFormat, exportFormat, importFile, importRecipesCheckbox, importPaintsCheckbox;
        let exportRecipesCheckbox, exportPaintsCheckbox, exportCalculationsCheckbox, includePhotosCheckbox, compressDataCheckbox;
        let loadMoreCatalogBtn;
        let recipePhotoInput, recipePhotoPreview, recipePhotoImg, fileNameSpan;
        let seriesDetailsModal, closeSeriesModal, seriesDetailsTitle, seriesDetailsContent;
        // Pantone елементи
        let pantoneSearch, pantoneCategoryFilter, pantoneCatalog;
        let pantoneRecipeModal, closePantoneRecipe, pantoneRecipeContent, addPantoneFromRecipeBtn;
        // RAL елементи
        let ralSearch, ralCatalog;

        // ---------- КЕШУВАННЯ DOM ----------
        function cacheDOMElements() {
            sidebar = document.getElementById('sidebar');
            menuToggle = document.getElementById('menuToggle');
            desktopMenuToggle = document.getElementById('desktopMenuToggle');
            closeSidebar = document.getElementById('closeSidebar');
            mainContainer = document.getElementById('mainContainer');
            navLinks = document.querySelectorAll('.nav-link');
            pageContents = document.querySelectorAll('.page-content');
            totalPaintsEl = document.getElementById('totalPaints');
            headerPaintCount = document.getElementById('headerPaintCount');
            ingredientsList = document.getElementById('ingredientsList');
            paintSearch = document.getElementById('paintSearch');
            categoryFilter = document.getElementById('categoryFilter');
            addIngredientBtn = document.getElementById('addIngredientBtn');
            saveRecipeBtn = document.getElementById('saveRecipeBtn');
            clearRecipeBtn = document.getElementById('clearRecipeBtn');
            scanRecipeBtn = document.getElementById('scanRecipeBtn');
            recipesContainer = document.getElementById('recipesContainer');
            exportRecipesBtn = document.getElementById('exportRecipesBtn');
            importRecipesBtn = document.getElementById('importRecipesBtn');
            printRecipesBtn = document.getElementById('printRecipesBtn');
            deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
            paintCatalogEl = document.getElementById('paintCatalog');
            addNewPaintBtn = document.getElementById('addNewPaintBtn');
            addPaintModal = document.getElementById('addPaintModal');
            closePaintModal = document.getElementById('closePaintModal');
            savePaintBtn = document.getElementById('savePaintBtn');
            cancelPaintBtn = document.getElementById('cancelPaintBtn');
            actionCards = document.querySelectorAll('.action-card');
            languageSelect = document.getElementById('languageSelect');
            unitsSelect = document.getElementById('unitsSelect');
            themeSelect = document.getElementById('themeSelect');
            autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
            backupCheckbox = document.getElementById('backupCheckbox');
            saveSettingsBtn = document.getElementById('saveSettingsBtn');
            resetSettingsBtn = document.getElementById('resetSettingsBtn');
            clearAllDataBtn = document.getElementById('clearAllDataBtn');
            startImportBtn = document.getElementById('startImportBtn');
            startExportBtn = document.getElementById('startExportBtn');
            importFormat = document.getElementById('importFormat');
            exportFormat = document.getElementById('exportFormat');
            importFile = document.getElementById('importFile');
            importRecipesCheckbox = document.getElementById('importRecipesCheckbox');
            importPaintsCheckbox = document.getElementById('importPaintsCheckbox');
            exportRecipesCheckbox = document.getElementById('exportRecipesCheckbox');
            exportPaintsCheckbox = document.getElementById('exportPaintsCheckbox');
            exportCalculationsCheckbox = document.getElementById('exportCalculationsCheckbox');
            includePhotosCheckbox = document.getElementById('includePhotosCheckbox');
            compressDataCheckbox = document.getElementById('compressDataCheckbox');
            loadMoreCatalogBtn = document.getElementById('loadMoreCatalogBtn');
            recipePhotoInput = document.getElementById('recipePhoto');
            recipePhotoPreview = document.getElementById('recipePhotoPreview');
            recipePhotoImg = document.getElementById('recipePhotoImg');
            fileNameSpan = document.getElementById('fileName');
            seriesDetailsModal = document.getElementById('seriesDetailsModal');
            closeSeriesModal = document.getElementById('closeSeriesModal');
            seriesDetailsTitle = document.getElementById('seriesDetailsTitle');
            seriesDetailsContent = document.getElementById('seriesDetailsContent');
            // Pantone
            pantoneSearch = document.getElementById('pantoneSearch');
            pantoneCategoryFilter = document.getElementById('pantoneCategoryFilter');
            pantoneCatalog = document.getElementById('pantoneCatalog');
            pantoneRecipeModal = document.getElementById('pantoneRecipeModal');
            closePantoneRecipe = document.querySelector('.close-pantone-recipe');
            pantoneRecipeContent = document.getElementById('pantoneRecipeContent');
            addPantoneFromRecipeBtn = document.getElementById('addPantoneFromRecipeBtn');
            // RAL
            ralSearch = document.getElementById('ralSearch');
            ralCatalog = document.getElementById('ralCatalog');
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

        // ---------- АВТОЗБЕРЕЖЕННЯ ЧЕРНЕТКИ РЕЦЕПТУ ----------
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

        // ---------- ПЕРЕВІРКА СУМІСНОСТІ ФАРБИ ----------
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

        // ---------- НАЛАШТУВАННЯ ----------
        function initSettings() {
            if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
            if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
            if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
            if (languageSelect) languageSelect.value = SICOMIX.i18n.getLanguage();
            if (themeSelect) themeSelect.value = currentSettings.theme || 'spectrum';
            applyTheme(currentSettings.theme || 'spectrum');
        }

        function applyTheme(theme) {
            document.body.classList.remove('theme-organic');
            if (theme === 'organic') {
                document.body.classList.add('theme-organic');
            }
        }

        // ---------- ПОДІЇ ----------
        function setupEventListeners() {
            document.addEventListener('click', function(e) {
                const navLink = e.target.closest('.nav-link[data-page]');
                if (navLink) {
                    e.preventDefault();
                    const page = navLink.getAttribute('data-page');
                    switchPage(page);
                    if (window.innerWidth <= 992) {
                        sidebar?.classList.remove('active');
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

            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
            if (desktopMenuToggle) {
                desktopMenuToggle.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        sidebar.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    } else {
                        sidebar.classList.add('active');
                        mainContainer.classList.add('sidebar-open');
                    }
                });
            }
            if (closeSidebar) {
                closeSidebar.addEventListener('click', () => {
                    sidebar.classList.remove('active');
                    mainContainer.classList.remove('sidebar-open');
                    document.body.style.overflow = 'auto';
                });
            }

            if (recipePhotoInput) {
                recipePhotoInput.addEventListener('change', function() {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            recipePhotoDataUrl = e.target.result;
                            showPhotoPreview(recipePhotoDataUrl);
                            debouncedAutoSave();
                        };
                        reader.readAsDataURL(file);
                    } else {
                        recipePhotoDataUrl = null;
                        resetPhotoPreview();
                        debouncedAutoSave();
                    }
                });
            }

            if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
            if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
            if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
            if (scanRecipeBtn) scanRecipeBtn.addEventListener('click', scanRecipeFromPhoto);

            if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
            if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
            if (printRecipesBtn) printRecipesBtn.addEventListener('click', printRecipes);
            if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);

            if (addNewPaintBtn) addNewPaintBtn.addEventListener('click', addNewPaint);
            if (closePaintModal) closePaintModal.addEventListener('click', () => {
                addPaintModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', () => {
                addPaintModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            if (savePaintBtn) savePaintBtn.addEventListener('click', saveNewPaint);

            if (paintSearch) paintSearch.addEventListener('input', SICOMIX.utils.debounce(renderIngredientsList, 300));
            if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);
            if (document.getElementById('catalogSearch')) {
                document.getElementById('catalogSearch').addEventListener('input', SICOMIX.utils.debounce(() => {
                    catalogPage = 1;
                    renderPaintCatalog();
                }, 300));
            }

            // Pantone події
            if (pantoneSearch) {
                pantoneSearch.addEventListener('input', SICOMIX.utils.debounce(() => {
                    renderPantoneCatalog();
                }, 300));
            }
            if (pantoneCategoryFilter) {
                pantoneCategoryFilter.addEventListener('change', () => {
                    renderPantoneCatalog();
                });
            }

            if (pantoneCatalog) {
                pantoneCatalog.addEventListener('click', function(e) {
                    const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
                    if (!btn) return;
                    e.stopPropagation();

                    if (btn.classList.contains('glass-remove-btn')) {
                        const pantoneNumber = btn.dataset.pantoneNumber;
                        if (pantoneNumber) {
                            removeIngredientByArticle(pantoneNumber);
                        }
                    } else if (btn.classList.contains('glass-add-btn')) {
                        const pantoneNumber = btn.dataset.pantoneNumber;
                        if (pantoneNumber) {
                            addPantoneToRecipe(pantoneNumber);
                        }
                    }
                });
            }

            if (closePantoneRecipe) {
                closePantoneRecipe.addEventListener('click', () => {
                    pantoneRecipeModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

            if (addPantoneFromRecipeBtn) {
                addPantoneFromRecipeBtn.addEventListener('click', function() {
                    const pantoneNumber = this.dataset.pantoneNumber;
                    if (pantoneNumber) {
                        addPantoneToRecipe(pantoneNumber);
                        pantoneRecipeModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            // RAL події
            if (ralSearch) {
                ralSearch.addEventListener('input', SICOMIX.utils.debounce(() => {
                    renderRalCatalog();
                }, 300));
            }

            if (ralCatalog) {
                ralCatalog.addEventListener('click', function(e) {
                    const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
                    if (!btn) return;
                    e.stopPropagation();

                    if (btn.classList.contains('glass-remove-btn')) {
                        const code = btn.dataset.ralCode;
                        if (code) {
                            removeIngredientByArticle(code);
                        }
                    } else if (btn.classList.contains('glass-add-btn')) {
                        const code = btn.dataset.ralCode;
                        const hex = btn.dataset.ralHex;
                        if (code) {
                            addRalToRecipe(code, hex);
                        }
                    }
                });
            }

            const openRalPdf = document.getElementById('openRalPdf');
            if (openRalPdf) {
                openRalPdf.addEventListener('click', () => {
                    window.open('./files/Wzornik RAL.PDF', '_blank');
                });
            }

            const openPantonePdf = document.getElementById('openPantonePdf');
            if (openPantonePdf) {
                openPantonePdf.addEventListener('click', () => {
                    window.open('./files/60-vzornik-pantone.pdf', '_blank');
                });
            }

            if (startImportBtn) startImportBtn.addEventListener('click', startImport);
            if (startExportBtn) startExportBtn.addEventListener('click', startExport);

            if (languageSelect) {
                languageSelect.addEventListener('change', function() {
                    const newLang = this.value;
                    currentSettings.language = newLang;
                    SICOMIX.i18n.setLanguage(newLang);
                    SICOMIX.i18n.applyTranslations();

                    if (document.getElementById('new-recipe-page')?.classList.contains('active')) {
                        if (recipePhotoDataUrl) {
                            fileNameSpan.textContent = SICOMIX.i18n.t('photo_uploaded');
                        } else {
                            fileNameSpan.textContent = SICOMIX.i18n.t('upload_photo');
                        }
                    }

                    populateCategoryFilters();
                    populateStandardCategorySelect();
                    populateSeriesSelect();

                    const activePage = document.querySelector('.page-content.active');
                    if (activePage) {
                        const pageId = activePage.id.replace('-page', '');
                        if (pageId === 'recipes') renderRecipes();
                        if (pageId === 'catalog') renderPaintCatalog();
                        if (pageId === 'new-recipe') renderIngredientsList();
                        if (pageId === 'pantone') renderPantoneCatalog();
                        if (pageId === 'ral') renderRalCatalog();
                    }

                    saveData();
                });
            }

            if (themeSelect) {
                themeSelect.addEventListener('change', function() {
                    currentSettings.theme = this.value;
                    applyTheme(this.value);
                    saveData();
                });
            }

            if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
            if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
            if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);

            if (loadMoreCatalogBtn) {
                loadMoreCatalogBtn.addEventListener('click', function() {
                    catalogPage++;
                    renderPaintCatalog(true);
                });
            }

            if (closeSeriesModal) {
                closeSeriesModal.addEventListener('click', () => {
                    seriesDetailsModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }

            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    if (document.getElementById('new-recipe-page')?.classList.contains('active')) {
                        saveRecipeBtn?.click();
                    }
                }
                if (e.key === 'Escape') {
                    if (sidebar?.classList.contains('active') && window.innerWidth <= 992) {
                        sidebar.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    if (addPaintModal?.classList.contains('active')) {
                        addPaintModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    if (seriesDetailsModal?.classList.contains('active')) {
                        seriesDetailsModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    if (pantoneRecipeModal?.classList.contains('active')) {
                        pantoneRecipeModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }
            });

            document.addEventListener('click', function(e) {
                if (!sidebar || window.innerWidth > 992) return;
                if (!sidebar.classList.contains('active')) return;
                if (sidebar.contains(e.target) || menuToggle?.contains(e.target) || desktopMenuToggle?.contains(e.target) || closeSidebar?.contains(e.target)) return;
                sidebar.classList.remove('active');
                mainContainer?.classList.remove('sidebar-open');
                document.body.style.overflow = 'auto';
            });

            attachAutoSaveListeners();

            window.addEventListener('beforeunload', function(e) {
                if (document.getElementById('new-recipe-page')?.classList.contains('active') && !isEditingRecipe) {
                    const currentName = document.getElementById('recipeName')?.value;
                    const currentIngredients = selectedIngredients.length;
                    if (currentName || currentIngredients > 0 || recipePhotoDataUrl) {
                        const message = SICOMIX.i18n.t('unsaved_changes_warning');
                        e.returnValue = message;
                        return message;
                    }
                }
            });

            if (paintCatalogEl) {
                paintCatalogEl.addEventListener('click', function(e) {
                    const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
                    if (!btn) return;
                    e.stopPropagation();
                    const paintId = btn.dataset.paintId;
                    const paint = paintCatalog.find(p => String(p.id) === paintId);
                    if (!paint) return;

                    if (btn.classList.contains('glass-add-btn')) {
                        const validation = validatePaintAddition(paint);
                        if (validation.valid) {
                            addPaintToRecipeFromCatalog(paint);
                            updatePaintButton(paintId, true);
                        } else {
                            SICOMIX.utils.showNotification(validation.message, 'error');
                        }
                    } else if (btn.classList.contains('glass-remove-btn')) {
                        removeIngredientByPaintId(paintId);
                        updatePaintButton(paintId, false);
                    }
                });
            }
        }

        // ---------- НАВІГАЦІЯ ----------
        function switchPage(pageId) {
            if (!pageId) return;
            const targetPage = document.getElementById(`${pageId}-page`);
            if (!targetPage) return;
            if (targetPage.classList.contains('active')) return;

            if (isEditingRecipe && pageId !== 'new-recipe') {
                resetEditMode();
            }

            pageContents.forEach(p => p.classList.remove('active'));
            targetPage.classList.add('active');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });

            if (pageId === 'recipes') {
                renderRecipes();
            } else if (pageId === 'catalog') {
                catalogPage = 1;
                renderPaintCatalog();
            } else if (pageId === 'new-recipe') {
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
                renderIngredientsList();
            } else if (pageId === 'pantone') {
                renderPantoneCatalog();
            } else if (pageId === 'ral') {
                renderRalCatalog();
            }
        }

        // ---------- НОВИЙ РЕЦЕПТ ----------
        function renderIngredientsList() {
            if (!ingredientsList) return;
            if (selectedIngredients.length === 0) {
                ingredientsList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px;">
                    <i class="fas fa-palette" style="font-size:32px; opacity:0.5;"></i><br>
                    <span>${SICOMIX.i18n.t('paints_not_found')}</span>
                </td></tr>`;
                return;
            }

            let html = '';
            selectedIngredients.forEach((ing, idx) => {
                const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing; // для тимчасових Pantone/RAL
                const paintName = paint.displayName?.[SICOMIX.i18n.getLanguage()] || paint.name;
                html += `<tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:24px; height:24px; background:${SICOMIX.utils.escapeHtml(paint.color)}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                            <div>
                                <div style="font-weight:600;">${SICOMIX.utils.escapeHtml(paintName)}</div>
                                <div style="font-size:12px; color:var(--text-secondary);">
                                    ${SICOMIX.i18n.translateCategoryName(paint.category)} 
                                    <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:12px; margin-left:6px;">${SICOMIX.utils.escapeHtml(paint.series)}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><input type="number" class="input-small" value="${ing.amount}" data-index="${idx}" data-field="amount" min="0" step="0.1"></td>
                    <td>
                        <select class="unit-select" data-index="${idx}" data-field="unit">
                            <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('г')}</option>
                            <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('кг')}</option>
                            <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('мл')}</option>
                            <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('л')}</option>
                        </select>
                    </td>
                    <td><input type="number" class="input-small" value="${ing.percentage || 0}" readonly> %</td>
                    <td><button class="btn-icon delete-ingredient" data-index="${idx}"><i class="fas fa-trash"></i></button></td>
                </tr>`;
            });
            ingredientsList.innerHTML = html;

            ingredientsList.querySelectorAll('input, select').forEach(el => {
                el.addEventListener('change', function(e) {
                    handleIngredientChange(e);
                    calculatePercentages();
                    debouncedAutoSave();
                });
            });
            ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
                btn.addEventListener('click', function() {
                    deleteIngredient(parseInt(this.dataset.index));
                    calculatePercentages();
                    debouncedAutoSave();
                });
            });
        }

        function handleIngredientChange(e) {
            const idx = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            if (idx >= 0 && idx < selectedIngredients.length) {
                selectedIngredients[idx][field] = field === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value;
            }
        }

        function addIngredient() {
            const seriesSelect = document.getElementById('recipeSeries');
            if (!seriesSelect || !seriesSelect.value) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
                return;
            }
            let targetSeries = lockedSeries || seriesSelect.value;
            if (lockedSeries && targetSeries !== lockedSeries) {
                targetSeries = lockedSeries;
            }

            const term = paintSearch?.value.toLowerCase() || '';
            const cat = categoryFilter?.value || '';
            
            let filtered = paintCatalog.filter(p => p.series === targetSeries);
            
            if (term) filtered = filtered.filter(p => p && p.name && p.name.toLowerCase().includes(term));
            if (cat) filtered = filtered.filter(p => p && p.category === cat);
            
            if (filtered.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paints_not_found_in_series'), 'error');
                return;
            }
            showPaintSelectionModal(filtered);
        }

        function showPaintSelectionModal(paints) {
            const modal = document.getElementById('paintSelectionModal');
            const list = document.getElementById('paintSelectionList');
            list.innerHTML = paints.map(p => {
                const paintName = p.displayName?.[SICOMIX.i18n.getLanguage()] || p.name;
                return `
                <div class="paint-selection-card" data-id="${p.id}">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:32px; height:32px; background:${SICOMIX.utils.escapeHtml(p.color)}; border-radius:8px;"></div>
                        <div><strong>${SICOMIX.utils.escapeHtml(paintName)}</strong><br><span style="font-size:12px;">${SICOMIX.i18n.translateCategoryName(p.category)} (${SICOMIX.utils.escapeHtml(p.series)})</span></div>
                    </div>
                </div>
            `}).join('');
            modal.classList.add('active');

            const clickHandler = (e) => {
                const card = e.target.closest('.paint-selection-card');
                if (!card) return;
                const pid = card.dataset.id;
                const paint = paintCatalog.find(p => String(p.id) === pid);
                if (!paint) return;
                
                const validation = validatePaintAddition(paint);
                if (!validation.valid) {
                    SICOMIX.utils.showNotification(validation.message, 'error');
                    modal.classList.remove('active');
                    list.removeEventListener('click', clickHandler);
                    closeBtn?.removeEventListener('click', closeHandler);
                    return;
                }
                
                if (selectedIngredients.some(ing => String(ing.paintId) === pid)) {
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                } else {
                    selectedIngredients.push({ paintId: pid, amount: 100, unit: 'г', percentage: 0 });
                    calculatePercentages();
                    renderIngredientsList();
                    updateSeriesLockUI();
                    autoSaveRecipeDraft();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
                    
                    renderPantoneCatalog();
                    renderRalCatalog();
                }
                modal.classList.remove('active');
                list.removeEventListener('click', clickHandler);
                closeBtn?.removeEventListener('click', closeHandler);
            };
            const closeHandler = () => {
                modal.classList.remove('active');
                list.removeEventListener('click', clickHandler);
                closeBtn?.removeEventListener('click', closeHandler);
            };
            list.addEventListener('click', clickHandler);
            const closeBtn = modal.querySelector('.close-paint-selection');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeHandler, { once: true });
            }
        }

        function deleteIngredient(index) {
            if (index >= 0) {
                const removed = selectedIngredients[index];
                selectedIngredients.splice(index, 1);
                if (selectedIngredients.length === 0) {
                    lockedSeries = null;
                    lockedCategory = null;
                }
                renderIngredientsList();
                updateSeriesLockUI();
                autoSaveRecipeDraft();
                
                renderPantoneCatalog();
                renderRalCatalog();
                
                if (removed && paintCatalog.some(p => String(p.id) === removed.paintId)) {
                    updatePaintButton(removed.paintId, false);
                }
            }
        }

        function removeIngredientByPaintId(paintId) {
            const index = selectedIngredients.findIndex(ing => String(ing.paintId) === String(paintId));
            if (index !== -1) {
                deleteIngredient(index);
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_removed_from_recipe'), 'success');
            }
        }

        function removeIngredientByArticle(article) {
            const index = selectedIngredients.findIndex(ing => ing.article === article);
            if (index !== -1) {
                deleteIngredient(index);
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_removed_from_recipe'), 'success');
            }
        }

        function calculatePercentages() {
            selectedIngredients = SICOMIX.utils.calculateIngredientPercentages(selectedIngredients);
            renderIngredientsList();
        }

        function saveRecipe() {
            const name = document.getElementById('recipeName')?.value.trim();
            const cat = document.getElementById('recipeCategory')?.value;
            const series = document.getElementById('recipeSeries')?.value;
            const desc = document.getElementById('recipeDescription')?.value.trim();

            if (!name || !cat || !series || selectedIngredients.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
                return;
            }

            const recipeData = {
                name,
                category: cat,
                series,
                description: desc,
                ingredients: [...selectedIngredients],
                photo: recipePhotoDataUrl || null
            };

            if (isEditingRecipe && editingRecipeId) {
                const idx = recipes.findIndex(r => String(r.id) === String(editingRecipeId));
                if (idx !== -1) {
                    recipes[idx] = {
                        ...recipes[idx],
                        ...recipeData,
                        date: new Date().toLocaleDateString('uk-UA')
                    };
                    saveData();
                    SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
                    resetEditMode();
                }
            } else {
                const newRecipe = {
                    id: SICOMIX.utils.generateId(),
                    ...recipeData,
                    date: new Date().toLocaleDateString('uk-UA')
                };
                recipes.push(newRecipe);
                saveData();
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
            }
            clearRecipeForm();
            clearRecipeDraft();
            switchPage('recipes');
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
            renderIngredientsList();
            renderPantoneCatalog();
            renderRalCatalog();
            resetEditMode();
        }

        function resetEditMode() {
            isEditingRecipe = false;
            editingRecipeId = null;
            if (saveRecipeBtn) {
                saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
                SICOMIX.i18n.applyTranslations();
            }
        }

        // ---------- РЕЦЕПТИ ----------
        function renderRecipes() {
            if (!recipesContainer) return;
            const search = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
            const cat = document.getElementById('recipeCategoryFilter')?.value || '';
            let filtered = recipes;
            if (search) filtered = filtered.filter(r => r.name.toLowerCase().includes(search) || (r.description && r.description.toLowerCase().includes(search)));
            if (cat) filtered = filtered.filter(r => r.category === cat);

            if (filtered.length === 0) {
                recipesContainer.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_recipes')}</p>`;
                return;
            }

            recipesContainer.innerHTML = filtered.map(r => {
                const total = r.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
                const photoHtml = r.photo ? `<img src="${SICOMIX.utils.escapeHtml(r.photo)}" style="width:100%; height:100%; object-fit:cover;">` : `<i class="fas fa-palette"></i>`;
                return `<div class="recipe-card" data-id="${r.id}">
                    <div class="recipe-image" style="background: linear-gradient(145deg, #3a86ff80, #7b2cbf80);">
                        ${photoHtml}
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div><h3 class="recipe-title">${SICOMIX.utils.escapeHtml(r.name)}</h3><span class="recipe-category">${SICOMIX.i18n.translateCategoryName(r.category)} / ${SICOMIX.utils.escapeHtml(r.series)}</span></div>
                            <div class="recipe-select-container">
                                <input type="checkbox" class="recipe-select" value="${r.id}" ${selectedRecipes.includes(r.id) ? 'checked' : ''}>
                                <span>${SICOMIX.i18n.t('select')}</span>
                            </div>
                        </div>
                        <p class="recipe-description">${SICOMIX.utils.escapeHtml(r.description || SICOMIX.i18n.t('no_description'))}</p>
                        <div class="recipe-meta">
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('ingredients_count')}</span><br><strong>${r.ingredients.length}</strong></div>
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('total_weight')}</span><br><strong>${total} ${SICOMIX.i18n.localizeUnitSymbol('г')}</strong></div>
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('date')}</span><br><strong>${SICOMIX.utils.escapeHtml(r.date)}</strong></div>
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn edit-recipe"><i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}</button>
                            <button class="recipe-btn delete-recipe"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>
                            <button class="recipe-btn export-recipe"><i class="fas fa-download"></i> ${SICOMIX.i18n.t('export')}</button>
                            <button class="recipe-btn print-label" data-recipe-id="${r.id}">
                                <i class="fas fa-tag"></i> ${SICOMIX.i18n.t('print_label')}
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            recipesContainer.querySelectorAll('.edit-recipe').forEach(btn => btn.addEventListener('click', (e) => {
                const id = e.target.closest('.recipe-card').dataset.id;
                editRecipe(id);
            }));
            recipesContainer.querySelectorAll('.delete-recipe').forEach(btn => btn.addEventListener('click', (e) => {
                const id = e.target.closest('.recipe-card').dataset.id;
                deleteRecipe(id);
            }));
            recipesContainer.querySelectorAll('.export-recipe').forEach(btn => btn.addEventListener('click', (e) => {
                const id = e.target.closest('.recipe-card').dataset.id;
                exportRecipe(id);
            }));
            recipesContainer.querySelectorAll('.print-label').forEach(btn => btn.addEventListener('click', (e) => {
                const id = e.target.closest('.recipe-card').dataset.id;
                printLabel(id);
            }));
            recipesContainer.querySelectorAll('.recipe-select').forEach(cb => cb.addEventListener('change', function() {
                const id = this.value;
                if (this.checked) {
                    if (!selectedRecipes.includes(id)) selectedRecipes.push(id);
                } else {
                    selectedRecipes = selectedRecipes.filter(v => v !== id);
                }
            }));
        }

        function deleteRecipe(id) {
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('delete_recipe'),
                SICOMIX.i18n.t('delete_recipe_confirmation'),
                () => {
                    recipes = recipes.filter(r => String(r.id) !== String(id));
                    selectedRecipes = selectedRecipes.filter(rid => String(rid) !== String(id));
                    saveData();
                    renderRecipes();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('recipe_deleted'), 'success');
                }
            );
        }

        function deleteSelectedRecipes() {
            if (selectedRecipes.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_recipes_to_delete'), 'warning');
                return;
            }
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('delete_recipes'),
                `${SICOMIX.i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}?`,
                () => {
                    recipes = recipes.filter(r => !selectedRecipes.includes(String(r.id)));
                    selectedRecipes = [];
                    saveData();
                    renderRecipes();
                    SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('deleted')} ${selectedRecipes.length}`, 'success');
                }
            );
        }

        function exportRecipe(id) {
            const recipe = recipes.find(r => String(r.id) === String(id));
            if (recipe) {
                SICOMIX.utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_exported')}`, 'success');
            }
        }

        function exportAllRecipes() {
            if (recipes.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
                return;
            }
            const format = exportFormat?.value || 'json';
            const filename = `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.${format}`;
            const mime = format === 'json' ? 'application/json' : 'text/csv';
            SICOMIX.utils.exportToFile(recipes, filename, mime);
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
        }

        function importRecipes() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json,.csv';
            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                    try {
                        let imported;
                        if (file.name.endsWith('.json')) {
                            imported = JSON.parse(ev.target.result);
                        } else if (file.name.endsWith('.csv')) {
                            imported = SICOMIX.utils.parseCSV(ev.target.result);
                        } else {
                            SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                            return;
                        }
                        const arr = Array.isArray(imported) ? imported : [imported];
                        SICOMIX.utils.showConfirmation(
                            SICOMIX.i18n.t('import_recipes'),
                            `${SICOMIX.i18n.t('found_recipes')} ${arr.length}. ${SICOMIX.i18n.t('import_confirm')}`,
                            () => {
                                arr.forEach(r => {
                                    r.id = SICOMIX.utils.generateId();
                                    if (r.ingredients) {
                                        r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                                    }
                                    recipes.push(r);
                                });
                                saveData();
                                renderRecipes();
                                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('imported')} ${arr.length}`, 'success');
                            }
                        );
                    } catch (err) {
                        console.error(err);
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        function printRecipes() {
            if (selectedRecipes.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_recipes_to_print'), 'warning');
                return;
            }

            const recipesToPrint = recipes.filter(r => selectedRecipes.includes(String(r.id)));
            const lang = SICOMIX.i18n.getLanguage();
            let html = `
            <!DOCTYPE html>
            <html lang="${lang}">
            <head>
                <meta charset="UTF-8">
                <title>${SICOMIX.i18n.t('print_recipes')}</title>
                <style>
                    body { font-family: 'Inter', sans-serif; background: #0a0c0f; color: #f0f4f8; padding: 30px; margin: 0; }
                    .print-header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; border-bottom: 2px solid #3a86ff; padding-bottom: 20px; }
                    .logo { font-size: 48px; color: #3a86ff; background: linear-gradient(145deg, #3a86ff, #7b2cbf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    .company-name { font-size: 32px; font-weight: 700; background: linear-gradient(145deg, white, #4cc9f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    .print-date { margin-left: auto; color: #b0c0ce; }
                    .recipe-card { background: rgba(20, 24, 28, 0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 25px; margin-bottom: 30px; page-break-inside: avoid; }
                    .recipe-title { font-size: 28px; font-weight: 700; color: white; margin-bottom: 10px; }
                    .recipe-meta { display: flex; gap: 20px; margin-bottom: 20px; color: #b0c0ce; }
                    .recipe-photo { max-width: 200px; border-radius: 12px; margin: 15px 0; border: 2px solid rgba(255,255,255,0.1); }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background: rgba(58, 134, 255, 0.2); padding: 12px; text-align: left; color: white; }
                    td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                    .footer { text-align: center; margin-top: 50px; color: #b0c0ce; font-size: 12px; }
                    @media print { 
                        body { background: white; color: black; } 
                        .recipe-card { background: #f5f5f5; border: 1px solid #ccc; } 
                        th { background: #ddd; color: black; } 
                        .company-name { -webkit-text-fill-color: #333; } 
                        .print-date { color: #666; } 
                        .recipe-photo { border: 1px solid #ccc; }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <div class="logo"><i class="fas fa-prism"></i></div>
                    <div class="company-name">SICO Spectrum</div>
                    <div class="print-date">${new Date().toLocaleDateString(lang)}</div>
                </div>
            `;

            recipesToPrint.forEach(recipe => {
                const total = recipe.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
                html += `
                <div class="recipe-card">
                    <h2 class="recipe-title">${SICOMIX.utils.escapeHtml(recipe.name)}</h2>
                    <div class="recipe-meta">
                        <span><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategoryName(recipe.category)} / ${SICOMIX.utils.escapeHtml(recipe.series)}</span>
                        <span><strong>${SICOMIX.i18n.t('date')}:</strong> ${SICOMIX.utils.escapeHtml(recipe.date || SICOMIX.i18n.t('unknown'))}</span>
                        <span><strong>${SICOMIX.i18n.t('total_weight')}:</strong> ${total} г</span>
                    </div>
                    ${recipe.photo ? `<img src="${SICOMIX.utils.escapeHtml(recipe.photo)}" alt="Color sample" class="recipe-photo">` : ''}
                    <p>${SICOMIX.utils.escapeHtml(recipe.description || SICOMIX.i18n.t('no_description'))}</p>
                    <h3>${SICOMIX.i18n.t('recipe_ingredients')}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>${SICOMIX.i18n.t('paint')}</th>
                                <th>${SICOMIX.i18n.t('quantity')}</th>
                                <th>${SICOMIX.i18n.t('percentage')}</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                recipe.ingredients.forEach(ing => {
                    const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing;
                    const paintName = paint.displayName?.[lang] || paint.name;
                    html += `
                        <tr>
                            <td>${SICOMIX.utils.escapeHtml(paintName)}</td>
                            <td>${ing.amount} ${ing.unit}</td>
                            <td>${ing.percentage || 0}%</td>
                        </tr>
                    `;
                });
                html += `
                        </tbody>
                    </table>
                </div>
                `;
            });

            html += `
                <div class="footer">
                    <p>SICO Spectrum • ${SICOMIX.i18n.t('version')} 1.0 • © ${new Date().getFullYear()}</p>
                </div>
            </body>
            </html>
            `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }

        // ---------- ДРУК ЕТИКЕТКИ ----------
        function printLabel(recipeId) {
            const recipe = recipes.find(r => String(r.id) === String(recipeId));
            if (!recipe) return;

            const totalWeight = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            let weightInput = prompt(SICOMIX.i18n.t('enter_weight_kg'), (totalWeight / 1000).toFixed(2));
            if (weightInput === null) return;
            let weightKg = parseFloat(weightInput.replace(',', '.'));
            if (isNaN(weightKg) || weightKg <= 0) weightKg = totalWeight / 1000;

            const lang = SICOMIX.i18n.getLanguage();
            const date = new Date().toLocaleDateString(lang);
            const labelHtml = `
            <!DOCTYPE html>
            <html lang="${lang}">
            <head>
                <meta charset="UTF-8">
                <title>Etykieta - ${SICOMIX.utils.escapeHtml(recipe.name)}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .label {
                        width: 300px;
                        border: 2px solid black;
                        padding: 15px;
                        background: white;
                        color: black;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 10px;
                        border-bottom: 1px solid black;
                        padding-bottom: 5px;
                    }
                    .product-name {
                        font-size: 16px;
                        font-weight: bold;
                        margin: 10px 0;
                        text-align: center;
                    }
                    .details {
                        margin: 10px 0;
                        font-size: 14px;
                    }
                    .details div {
                        margin: 5px 0;
                    }
                    .weight {
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                        margin: 15px 0;
                    }
                    .footer {
                        font-size: 12px;
                        text-align: center;
                        margin-top: 15px;
                        border-top: 1px solid black;
                        padding-top: 10px;
                    }
                    .note {
                        font-size: 10px;
                        text-align: center;
                        color: #333;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="label">
                    <div class="header">SICO POLSKA - FARBA MIESZANA</div>
                    <div class="product-name">${SICOMIX.utils.escapeHtml(recipe.name)}</div>
                    <div class="details">
                        <div><strong>${SICOMIX.i18n.t('series')}:</strong> ${SICOMIX.utils.escapeHtml(recipe.series)}</div>
                        <div><strong>${SICOMIX.i18n.t('date')}:</strong> ${date}</div>
                        <div><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategoryName(recipe.category)}</div>
                    </div>
                    <div class="weight">${weightKg.toFixed(2)} kg</div>
                    <div class="footer">
                        <div>Wyłączny dystrybutor w Polsce</div>
                        <div>SICO Polska Sp. z o. o.</div>
                        <div>ul. Annopol 3, 03-236 Warszawa</div>
                        <div>tel.: +48 22 660 48 50, e-mail: sico@sico.pl</div>
                    </div>
                    <div class="note">
                        PRZED DRUKIEM NAKŁADU ZALECAMY SPRAWDZENIE ZGODNOŚCI KOLORYSTYCZNEJ
                    </div>
                </div>
            </body>
            </html>
            `;

            const printWindow = window.open('', '_blank');
            printWindow.document.write(labelHtml);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }

        // ---------- ФУНКЦІЯ ОНОВЛЕННЯ КНОПКИ НА КАРТЦІ ----------
        function updatePaintButton(paintId, isInRecipe) {
            const card = document.querySelector(`.paint-card-glass[data-paint-id="${paintId}"]`);
            if (!card) return;
            const btn = card.querySelector('.glass-add-btn, .glass-remove-btn');
            if (btn) {
                if (isInRecipe) {
                    btn.classList.remove('glass-add-btn');
                    btn.classList.add('glass-remove-btn');
                    btn.innerHTML = '<i class="fas fa-trash"></i>';
                    btn.title = SICOMIX.i18n.t('remove_from_recipe');
                } else {
                    btn.classList.remove('glass-remove-btn');
                    btn.classList.add('glass-add-btn');
                    btn.innerHTML = '<i class="fas fa-plus"></i>';
                    btn.title = SICOMIX.i18n.t('add_ingredient');
                }
            }
        }

        // ---------- КАТАЛОГ ФАРБ ----------
        function renderPaintCatalog(append = false) {
            if (!paintCatalogEl) {
                console.warn('⚠️ paintCatalogEl не знайдено!');
                return;
            }

            try {
                const search = document.getElementById('catalogSearch')?.value?.toLowerCase() || '';
                const allSeries = SICOMIX.data.series || [];
                const lang = SICOMIX.i18n.getLanguage();

                const seriesMap = new Map();
                allSeries.forEach(series => {
                    if (!seriesMap.has(series.id)) {
                        seriesMap.set(series.id, series);
                    }
                });
                const uniqueSeries = Array.from(seriesMap.values());

                let seriesWithPaints = uniqueSeries.filter(series => {
                    let seriesPaints = paintCatalog.filter(p => p.series === series.id);
                    if (search) {
                        seriesPaints = seriesPaints.filter(p => {
                            const paintName = p.displayName?.[lang] || p.name;
                            return paintName.toLowerCase().includes(search) ||
                                   (p.article && p.article.toLowerCase().includes(search));
                        });
                    }
                    return seriesPaints.length > 0;
                });

                const startIndex = 0;
                const endIndex = catalogPage * CATALOG_PAGE_SIZE;
                const paginatedSeries = seriesWithPaints.slice(startIndex, endIndex);
                const hasMore = seriesWithPaints.length > endIndex;

                if (loadMoreCatalogBtn) {
                    loadMoreCatalogBtn.style.display = hasMore ? 'inline-block' : 'none';
                }

                if (paginatedSeries.length === 0 && !append) {
                    paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
                    return;
                }

                let html = '';
                let totalFoundPaints = 0;

                paginatedSeries.forEach(series => {
                    let seriesPaints = paintCatalog.filter(p => p.series === series.id);
                    if (search) {
                        seriesPaints = seriesPaints.filter(p => {
                            const paintName = p.displayName?.[lang] || p.name;
                            return paintName.toLowerCase().includes(search) ||
                                   (p.article && p.article.toLowerCase().includes(search));
                        });
                    }
                    totalFoundPaints += seriesPaints.length;

                    const seriesName = series.name[lang] || series.id;
                    const category = series.category || '';

                    const paintsHtml = seriesPaints.map(p => {
                        const paintName = p.displayName?.[lang] || p.name;
                        const isInRecipe = selectedIngredients.some(ing => String(ing.paintId) === String(p.id));
                        const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
                        const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
                        const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
                        
                        return `
                        <div class="paint-card-glass" data-paint-id="${p.id}" data-paint-series="${p.series}" style="color: ${p.color};">
                            <div class="glass-swatch" style="background: ${SICOMIX.utils.escapeHtml(p.color)};"></div>
                            <div class="glass-name">${SICOMIX.utils.escapeHtml(paintName)}</div>
                            <div class="glass-article">${SICOMIX.utils.escapeHtml(p.article || '')}</div>
                            <button class="${buttonClass}" data-paint-id="${p.id}" title="${buttonTitle}">
                                <i class="fas ${buttonIcon}"></i>
                            </button>
                            ${!p.isDefault ? `
                                <button class="delete-paint" data-paint-id="${p.id}" title="${SICOMIX.i18n.t('delete')}">
                                    <i class="fas fa-trash"></i>
                                </button>` : ''}
                        </div>
                    `}).join('');

                    html += `
                        <div class="series-card" data-series="${series.id}">
                            <div class="series-header">
                                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                    <div>
                                        <h3>
                                            ${SICOMIX.utils.escapeHtml(seriesName)}
                                            <span class="series-count">(${seriesPaints.length})</span>
                                        </h3>
                                        <span class="recipe-category">${SICOMIX.i18n.translateCategoryName(category)}</span>
                                    </div>
                                    <div style="display: flex; gap: 8px;">
                                        <button class="btn-icon series-info-btn" title="${SICOMIX.i18n.t('properties')}">
                                            <i class="fas fa-info-circle"></i>
                                        </button>
                                        <button class="btn-icon toggle-series" title="${SICOMIX.i18n.t('expand')}">
                                            <i class="fas fa-chevron-down"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="series-paints" style="display: none;">
                                ${paintsHtml}
                            </div>
                        </div>
                    `;
                });

                if (search && !append) {
                    const statsHtml = `<div class="search-stats"><i class="fas fa-search"></i> Знайдено фарб: ${totalFoundPaints} у ${paginatedSeries.length} серіях</div>`;
                    html = statsHtml + html;
                }

                if (append) {
                    const existingSeriesIds = new Set(Array.from(document.querySelectorAll('.series-card')).map(card => card.dataset.series));
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const newSeries = Array.from(tempDiv.children).filter(el => {
                        if (el.classList.contains('series-card')) {
                            const seriesId = el.dataset.series;
                            return !existingSeriesIds.has(seriesId);
                        }
                        return true;
                    });
                    if (newSeries.length > 0) {
                        paintCatalogEl.insertAdjacentHTML('beforeend', newSeries.map(el => el.outerHTML).join(''));
                    }
                } else {
                    paintCatalogEl.innerHTML = html;
                }

                if (search) {
                    document.querySelectorAll('.series-card').forEach(card => {
                        const paintsDiv = card.querySelector('.series-paints');
                        const icon = card.querySelector('.toggle-series i');
                        if (paintsDiv) {
                            paintsDiv.style.display = 'grid';
                            if (icon) {
                                icon.classList.remove('fa-chevron-down');
                                icon.classList.add('fa-chevron-up');
                            }
                        }
                    });
                }

                document.querySelectorAll('.toggle-series').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const card = this.closest('.series-card');
                        const paintsDiv = card.querySelector('.series-paints');
                        const icon = this.querySelector('i');

                        if (paintsDiv.style.display === 'none') {
                            paintsDiv.style.display = 'grid';
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        } else {
                            paintsDiv.style.display = 'none';
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    });
                });

                document.querySelectorAll('.series-info-btn').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const card = this.closest('.series-card');
                        const seriesId = card.dataset.series;
                        const series = SICOMIX.data.series.find(s => s.id === seriesId);
                        if (series) {
                            openSeriesDetailsModal(series);
                        }
                    });
                });

                document.querySelectorAll('.series-header').forEach(header => {
                    header.addEventListener('click', function(e) {
                        if (!e.target.closest('.toggle-series') && !e.target.closest('.series-info-btn')) {
                            const btn = this.querySelector('.toggle-series');
                            if (btn) btn.click();
                        }
                    });
                });

                document.querySelectorAll('.delete-paint').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const paintId = btn.dataset.paintId;
                        if (paintId) deletePaint(paintId);
                    });
                });

                document.querySelectorAll('.paint-card-glass').forEach(card => {
                    card.addEventListener('click', function(e) {
                        if (e.target.closest('button')) return;
                        const paintId = this.dataset.paintId;
                        const paint = paintCatalog.find(p => String(p.id) === paintId);
                        if (paint) showPaintDetails(paint);
                    });
                });

                SICOMIX.i18n.applyTranslations();

            } catch (error) {
                console.error('❌ Помилка в renderPaintCatalog:', error);
                paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                    <i class="fas fa-exclamation-triangle"></i> ${SICOMIX.i18n.t('catalog_render_error')}<br>${SICOMIX.utils.escapeHtml(error.message)}
                </p>`;
            }
        }

        function openSeriesDetailsModal(series) {
            if (!seriesDetailsModal || !seriesDetailsTitle || !seriesDetailsContent) return;
            const lang = SICOMIX.i18n.getLanguage();
            seriesDetailsTitle.textContent = series.name[lang] || series.id;
            
            let html = `<p><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategoryName(series.category)}</p>`;
            if (series.description && series.description[lang]) {
                html += `<p><strong>${SICOMIX.i18n.t('series_description')}:</strong> ${series.description[lang]}</p>`;
            }
            if (series.properties && Object.keys(series.properties).length > 0) {
                html += `<h4 style="margin:15px 0 10px;">${SICOMIX.i18n.t('properties')}</h4>`;
                html += `<div class="properties-grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px;">`;
                Object.entries(series.properties).forEach(([key, val]) => {
                    const value = val[lang] || val.uk;
                    if (value) {
                        html += `<div class="property-item"><strong>${SICOMIX.i18n.t(key)}:</strong> <span>${SICOMIX.utils.escapeHtml(value)}</span></div>`;
                    }
                });
                html += `</div>`;
            }
            seriesDetailsContent.innerHTML = html;
            seriesDetailsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // ---------- ДОДАВАННЯ ФАРБИ З КАТАЛОГУ ----------
        function addPaintToRecipeFromCatalog(paint) {
            const validation = validatePaintAddition(paint);
            if (!validation.valid) {
                SICOMIX.utils.showNotification(validation.message, 'error');
                return;
            }

            const existing = selectedIngredients.find(ing => String(ing.paintId) === String(paint.id));
            if (existing) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                return;
            }

            selectedIngredients.push({
                paintId: paint.id,
                article: paint.article,
                name: paint.name,
                category: paint.category,
                series: paint.series,
                color: paint.color,
                amount: 100,
                unit: 'г',
                percentage: 0
            });

            calculatePercentages();
            renderIngredientsList();
            updateSeriesLockUI();
            autoSaveRecipeDraft();

            renderPantoneCatalog();
            renderRalCatalog();

            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
        }

        function showPaintDetails(paint) {
            const modal = document.getElementById('paintSelectionModal');
            const list = document.getElementById('paintSelectionList');
            const lang = SICOMIX.i18n.getLanguage();
            const paintName = paint.displayName?.[lang] || paint.name;
            
            const modalTitle = modal.querySelector('.modal-title');
            if (modalTitle) modalTitle.textContent = paintName;
            
            list.innerHTML = `
                <div style="padding: 20px;">
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                        <div style="width: 80px; height: 80px; background: ${SICOMIX.utils.escapeHtml(paint.color)}; border-radius: 12px; border: 2px solid rgba(255,255,255,0.2);"></div>
                        <div>
                            <h2 style="font-size: 24px; margin-bottom: 5px;">${SICOMIX.utils.escapeHtml(paintName)}</h2>
                            <p style="color: var(--text-secondary);">${SICOMIX.utils.escapeHtml(paint.article || '')}</p>
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('category')}</th><td>${SICOMIX.i18n.translateCategoryName(paint.category)}</td></tr>
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('series')}</th><td>${SICOMIX.utils.escapeHtml(paint.series)}</td></tr>
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('manufacturer')}</th><td>${SICOMIX.utils.escapeHtml(paint.manufacturer || 'SICO')}</td></tr>
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('color_code')}</th><td>${SICOMIX.utils.escapeHtml(paint.color)}</td></tr>
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('article')}</th><td>${SICOMIX.utils.escapeHtml(paint.article || '-')}</td></tr>
                    </table>
                    <p style="margin-top: 20px;">${SICOMIX.utils.escapeHtml(paint.description || '')}</p>
                </div>
            `;
            
            modal.classList.add('active');
            
            const closeBtn = modal.querySelector('.close-paint-selection');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => modal.classList.remove('active'), { once: true });
            }
        }

        function addNewPaint() {
            document.getElementById('paintName').value = '';
            populateStandardCategorySelect(document.getElementById('paintCategory'));
            document.getElementById('paintColorCode').value = '#3a86ff';
            document.getElementById('paintDescription').value = '';
            document.getElementById('paintManufacturer').value = 'SICO';
            document.getElementById('paintArticle').value = '';
            addPaintModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function saveNewPaint() {
            const name = document.getElementById('paintName').value.trim();
            const cat = document.getElementById('paintCategory').value;
            const color = document.getElementById('paintColorCode').value || '#3a86ff';
            const desc = document.getElementById('paintDescription').value.trim();
            const mfr = document.getElementById('paintManufacturer').value.trim() || 'SICO';
            const art = document.getElementById('paintArticle').value.trim();

            if (!name || !cat) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
                return;
            }

            const newPaint = {
                id: SICOMIX.utils.generateId(),
                name,
                category: cat,
                color,
                description: desc,
                manufacturer: mfr,
                article: art,
                isDefault: false,
                displayName: { uk: name, en: name, pl: name }
            };
            userPaints.push(newPaint);
            paintCatalog = [...basePaints, ...userPaints];
            saveData();
            addPaintModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            populateCategoryFilters();
            renderPaintCatalog();
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('paint_added')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
        }

        function deletePaint(id) {
            const paint = paintCatalog.find(p => String(p.id) === String(id));
            if (!paint) return;
            
            if (paint.isDefault) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('cannot_delete_default_paint'), 'warning');
                return;
            }

            const usedInRecipes = recipes.filter(r => 
                r.ingredients.some(ing => String(ing.paintId) === String(id))
            );
            const count = usedInRecipes.length;

            if (count > 0) {
                SICOMIX.utils.showConfirmation(
                    SICOMIX.i18n.t('paint_in_use_title'),
                    SICOMIX.i18n.t('paint_in_use_message', { count }),
                    () => {
                        usedInRecipes.forEach(r => {
                            r.ingredients = r.ingredients.filter(ing => String(ing.paintId) !== String(id));
                        });
                        userPaints = userPaints.filter(p => String(p.id) !== String(id));
                        paintCatalog = [...basePaints, ...userPaints];
                        saveData();
                        renderPaintCatalog();
                        renderRecipes();
                        renderPantoneCatalog();
                        renderRalCatalog();
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
                    }
                );
            } else {
                userPaints = userPaints.filter(p => String(p.id) !== String(id));
                paintCatalog = [...basePaints, ...userPaints];
                saveData();
                renderPaintCatalog();
                renderPantoneCatalog();
                renderRalCatalog();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
            }
        }

        function updatePaintCount() {
            const count = paintCatalog.length;
            if (totalPaintsEl) totalPaintsEl.textContent = count;
            if (headerPaintCount) headerPaintCount.textContent = count;
        }

        // ---------- РЕДАГУВАННЯ РЕЦЕПТУ ----------
        function editRecipe(id) {
            const recipe = recipes.find(r => String(r.id) === String(id));
            if (!recipe) return;
            document.getElementById('recipeName').value = recipe.name;
            document.getElementById('recipeCategory').value = recipe.category;
            document.getElementById('recipeSeries').value = recipe.series || '';
            selectedSeries = recipe.series || '';
            document.getElementById('recipeDescription').value = recipe.description || '';
            selectedIngredients = recipe.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
            recipePhotoDataUrl = recipe.photo || null;
            if (recipePhotoDataUrl) {
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
            isEditingRecipe = true;
            editingRecipeId = id;
            if (saveRecipeBtn) {
                saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe"></span>`;
                SICOMIX.i18n.applyTranslations();
            }
            switchPage('new-recipe');
            SICOMIX.utils.showNotification(`"${SICOMIX.utils.escapeHtml(recipe.name)}" ${SICOMIX.i18n.t('edit')}`, 'info');
        }

        // ---------- НАЛАШТУВАННЯ ----------
        function saveSettings() {
            currentSettings = {
                language: languageSelect.value,
                units: unitsSelect.value,
                autoSave: autoSaveCheckbox.checked,
                backup: backupCheckbox.checked,
                theme: themeSelect.value,
                notifications: true,
                defaultCategory: 'Standard',
                defaultUnit: 'г',
                calculationsPrecision: 2
            };
            saveData();
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('save_settings'), 'success');
        }

        function resetSettings() {
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('reset_defaults'),
                SICOMIX.i18n.t('confirmation_message'),
                () => {
                    currentSettings = SICOMIX.data.defaultSettings || {};
                    saveData();
                    initSettings();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('reset_defaults'), 'success');
                }
            );
        }

        function clearAllData() {
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('clear_all_data'),
                SICOMIX.i18n.t('clear_all_data_confirmation'),
                () => {
                    recipes = [];
                    userPaints = [];
                    paintCatalog = [...basePaints];
                    selectedIngredients = [];
                    selectedRecipes = [];
                    lockedSeries = null;
                    lockedCategory = null;
                    saveData();
                    populateCategoryFilters();
                    renderRecipes();
                    renderPaintCatalog();
                    renderPantoneCatalog();
                    renderRalCatalog();
                    updatePaintCount();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('data_cleared'), 'success');
                }
            );
        }

        // ---------- ІМПОРТ/ЕКСПОРТ ----------
        function startImport() {
            if (!importFile || !importFile.files || importFile.files.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_import_file'), 'error');
                return;
            }
            const file = importFile.files[0];
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
                    const importRecipes = importRecipesCheckbox?.checked;
                    const importPaints = importPaintsCheckbox?.checked;

                    if (importRecipes && data.recipes && Array.isArray(data.recipes)) {
                        data.recipes.forEach(r => {
                            r.id = SICOMIX.utils.generateId();
                            if (r.ingredients) {
                                r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                            }
                            recipes.push(r);
                        });
                    }
                    if (importPaints && data.paints && Array.isArray(data.paints)) {
                        data.paints.forEach(p => {
                            p.id = SICOMIX.utils.generateId();
                            p.isDefault = false;
                            userPaints.push(p);
                        });
                        paintCatalog = [...basePaints, ...userPaints];
                    }
                    saveData();
                    populateCategoryFilters();
                    renderRecipes();
                    renderPaintCatalog();
                    renderPantoneCatalog();
                    renderRalCatalog();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('imported') + '!', 'success');
                } catch (err) {
                    console.error(err);
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                }
            };
            reader.readAsText(file);
        }

        function startExport() {
            const format = exportFormat?.value || 'json';
            const exportRecipes = exportRecipesCheckbox?.checked;
            const exportPaints = exportPaintsCheckbox?.checked;
            const exportCalculations = exportCalculationsCheckbox?.checked;

            const exportData = {};
            if (exportRecipes) exportData.recipes = recipes;
            if (exportPaints) exportData.paints = userPaints;
            if (exportCalculations) exportData.calculations = [];

            if (Object.keys(exportData).length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_data_to_export'), 'warning');
                return;
            }

            const filename = `sico_spectrum_export_${new Date().toISOString().split('T')[0]}.${format}`;
            const mime = format === 'json' ? 'application/json' : 'text/csv';
            SICOMIX.utils.exportToFile(exportData, filename, mime);
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('exported') + '!', 'success');
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
            if (!recipePhotoPreview || !recipePhotoImg || !fileNameSpan) return;
            recipePhotoPreview.style.display = 'block';
            recipePhotoImg.src = dataUrl;
            fileNameSpan.textContent = SICOMIX.i18n.t('photo_uploaded');
        }

        function resetPhotoPreview() {
            if (!recipePhotoPreview || !recipePhotoImg || !fileNameSpan) return;
            recipePhotoPreview.style.display = 'none';
            recipePhotoImg.src = '';
            fileNameSpan.textContent = SICOMIX.i18n.t('upload_photo');
        }

        // ---------- ФУНКЦІЯ ДЛЯ ВІДОБРАЖЕННЯ ПАНТОНІВ ----------
        function renderPantoneCatalog() {
            if (!pantoneCatalog) {
                console.warn('pantoneCatalog element not found');
                return;
            }

            if (!SICOMIX.pantone || !SICOMIX.pantone.colors) {
                pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">Дані Pantone не завантажено</p>`;
                return;
            }

            const search = pantoneSearch?.value.toLowerCase() || '';
            const category = pantoneCategoryFilter?.value || 'all';

            let filtered = SICOMIX.pantone.colors;

            if (category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }

            if (search) {
                filtered = filtered.filter(p => 
                    p.number.toLowerCase().includes(search) || 
                    (p.name && p.name.toLowerCase().includes(search))
                );
            }

            if (filtered.length === 0) {
                pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_pantone')}</p>`;
                return;
            }

            const html = filtered.map(p => {
                const firstIngredient = p.ingredients && p.ingredients.length > 0 ? p.ingredients[0].name : '';
                const firstAmount = p.ingredients && p.ingredients.length > 0 ? p.ingredients[0].amount : '';
                const hex = p.hex && p.hex !== '#CCCCCC' ? p.hex : '#CCCCCC';
                
                const isInRecipe = selectedIngredients.some(ing => ing.article === p.number);
                const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
                const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
                const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
                
                return `
                <div class="paint-card-glass pantone-card" style="color: #000;">
                    <div class="glass-swatch" style="background: ${hex};"></div>
                    <div class="glass-name">${SICOMIX.utils.escapeHtml(p.number)}</div>
                    <div class="glass-article">${SICOMIX.utils.escapeHtml(p.name || '')}</div>
                    <div style="font-size: 11px; margin-top: 5px; color: var(--text-tertiary);">${firstIngredient} ${firstAmount}</div>
                    <button class="${buttonClass}" data-pantone-number="${p.number}" title="${buttonTitle}">
                        <i class="fas ${buttonIcon}"></i>
                    </button>
                </div>
            `}).join('');

            pantoneCatalog.innerHTML = html;
        }

        function showPantoneRecipeModal(pantoneNumber) {
            if (!SICOMIX.pantone) return;
            
            const modal = document.getElementById('pantoneRecipeModal');
            const modalTitle = modal.querySelector('.modal-title');
            const modalContent = document.getElementById('pantoneRecipeContent');
            const addBtn = document.getElementById('addPantoneFromRecipeBtn');
            
            if (!modal || !modalContent) return;
            
            const html = SICOMIX.pantone.getRecipeHTML(pantoneNumber);
            
            if (modalTitle) {
                modalTitle.textContent = `${SICOMIX.i18n.t('pantone_recipe')}: ${pantoneNumber}`;
            }
            modalContent.innerHTML = html;
            
            if (addBtn) {
                addBtn.dataset.pantoneNumber = pantoneNumber;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // ---------- ДОДАВАННЯ PANTONE (без додавання до каталогу) ----------
        function addPantoneToRecipe(pantoneNumber) {
            const pantone = SICOMIX.pantone.findByNumber(pantoneNumber);
            if (!pantone) return;

            const seriesSelect = document.getElementById('recipeSeries');
            const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
            
            if (!currentSeries) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
                return;
            }

            // Створюємо тимчасовий об'єкт фарби (НЕ додаємо до userPaints)
            const tempPaintId = 'pantone-' + pantone.number.replace(/\s+/g, '_');
            const tempPaint = {
                id: tempPaintId,
                name: pantone.number,
                category: 'Pantone',
                series: currentSeries,
                color: pantone.hex && pantone.hex !== '#CCCCCC' ? pantone.hex : '#CCCCCC',
                description: pantone.name || '',
                manufacturer: 'Pantone',
                article: pantone.number,
                isDefault: false,
                displayName: { uk: pantone.number, en: pantone.number, pl: pantone.number }
            };

            const validation = validatePaintAddition(tempPaint);
            if (!validation.valid) {
                SICOMIX.utils.showNotification(validation.message, 'error');
                return;
            }

            const existing = selectedIngredients.find(ing => ing.article === pantone.number);
            if (existing) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                return;
            }

            selectedIngredients.push({
                paintId: tempPaintId,
                article: pantone.number,
                name: pantone.number,
                category: 'Pantone',
                series: currentSeries,
                color: tempPaint.color,
                amount: 100,
                unit: 'г',
                percentage: 0
            });

            calculatePercentages();
            renderIngredientsList();
            updateSeriesLockUI();
            autoSaveRecipeDraft();

            renderPantoneCatalog();
            
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
        }

        // ---------- RAL ----------
        function renderRalCatalog() {
            if (!ralCatalog) {
                console.warn('ralCatalog element not found');
                return;
            }

            if (!window.ralColors || !Array.isArray(window.ralColors)) {
                ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">Дані RAL не завантажено</p>`;
                return;
            }

            const search = ralSearch?.value.toLowerCase() || '';

            let filtered = window.ralColors;

            if (search) {
                filtered = filtered.filter(c => 
                    c.code.toLowerCase().includes(search) || 
                    c.name.toLowerCase().includes(search)
                );
            }

            if (filtered.length === 0) {
                ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_ral') || 'RAL не знайдено'}</p>`;
                return;
            }

            const html = filtered.map(c => {
                const isInRecipe = selectedIngredients.some(ing => ing.article === c.code);
                const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
                const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
                const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
                
                return `
                <div class="paint-card-glass ral-card" style="color: #000;">
                    <div class="glass-swatch" style="background: ${c.hex};"></div>
                    <div class="glass-name">${SICOMIX.utils.escapeHtml(c.code)}</div>
                    <div class="glass-article">${SICOMIX.utils.escapeHtml(c.name)}</div>
                    <button class="${buttonClass}" data-ral-code="${c.code}" data-ral-hex="${c.hex}" title="${buttonTitle}">
                        <i class="fas ${buttonIcon}"></i>
                    </button>
                </div>
            `}).join('');

            ralCatalog.innerHTML = html;
        }

        // ---------- ДОДАВАННЯ RAL (без додавання до каталогу) ----------
        function addRalToRecipe(code, hex) {
            const seriesSelect = document.getElementById('recipeSeries');
            const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
            
            if (!currentSeries) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
                return;
            }

            const tempPaintId = 'ral-' + code.replace(/\s+/g, '_');
            const tempPaint = {
                id: tempPaintId,
                name: code,
                category: 'RAL',
                series: currentSeries,
                color: hex || '#CCCCCC',
                description: '',
                manufacturer: 'RAL',
                article: code,
                isDefault: false,
                displayName: { uk: code, en: code, pl: code }
            };

            const validation = validatePaintAddition(tempPaint);
            if (!validation.valid) {
                SICOMIX.utils.showNotification(validation.message, 'error');
                return;
            }

            const existing = selectedIngredients.find(ing => ing.article === code);
            if (existing) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                return;
            }

            selectedIngredients.push({
                paintId: tempPaintId,
                article: code,
                name: code,
                category: 'RAL',
                series: currentSeries,
                color: tempPaint.color,
                amount: 100,
                unit: 'г',
                percentage: 0
            });

            calculatePercentages();
            renderIngredientsList();
            updateSeriesLockUI();
            autoSaveRecipeDraft();

            renderRalCatalog();
            
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
        }

        // ---------- СКАНУВАННЯ РЕЦЕПТУ З ФОТО ----------
        async function scanRecipeFromPhoto() {
            const seriesSelect = document.getElementById('recipeSeries');
            if (!seriesSelect || !seriesSelect.value) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
                return;
            }

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.capture = 'environment';

            input.onchange = async function(e) {
                const file = e.target.files[0];
                if (!file) return;

                SICOMIX.utils.showNotification(SICOMIX.i18n.t('scanning_recipe'), 'info', 0);

                try {
                    const { data: { text } } = await Tesseract.recognize(
                        file,
                        'ukr+eng',
                        { 
                            logger: m => console.log(m),
                            tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя -+.,'
                        }
                    );

                    console.log('Розпізнаний текст:', text);

                    const lines = text.split('\n').filter(line => line.trim().length > 0);
                    const targetSeries = lockedSeries || seriesSelect.value;
                    const seriesPaints = paintCatalog.filter(p => p.series === targetSeries);

                    let seriesPrefix = '';
                    for (let line of lines) {
                        const match = line.toUpperCase().match(/\b([A-Z]{2})[A-Z0-9]*\b/);
                        if (match) {
                            seriesPrefix = match[1];
                            break;
                        }
                    }

                    const ingredientSums = {};

                    function normalizePaintIdentifier(identifier, prefix) {
                        if (prefix && /^\d+$/.test(identifier)) {
                            return prefix + identifier;
                        }
                        return identifier;
                    }

                    function normalizeUnit(unitStr) {
                        const unit = unitStr.toLowerCase();
                        if (unit === 'g' || unit === 'г' || unit === '') return 'г';
                        if (unit === 'kg' || unit === 'кг') return 'кг';
                        if (unit === 'ml' || unit === 'мл') return 'мл';
                        if (unit === 'l' || unit === 'л') return 'л';
                        return 'г';
                    }

                    function findPaint(identifier, paints, prefix) {
                        let paint = paints.find(p => p.article && p.article === identifier);
                        if (paint) return paint;

                        const normalized = normalizePaintIdentifier(identifier, prefix);
                        paint = paints.find(p => p.name.toUpperCase() === normalized.toUpperCase());
                        if (paint) return paint;

                        paint = paints.find(p => p.name.toUpperCase().includes(identifier.toUpperCase()));
                        if (paint) return paint;

                        paint = paints.find(p => p.article && p.article.toUpperCase().includes(identifier.toUpperCase()));
                        if (paint) return paint;

                        if (prefix && /^\d+$/.test(identifier)) {
                            paint = paints.find(p => p.name.toUpperCase().includes(identifier));
                            if (paint) return paint;
                        }

                        return null;
                    }

                    lines.forEach(line => {
                        const dashMatch = line.match(/([A-Za-z0-9]+)\s*[-–]\s*(.+)/);
                        if (dashMatch) {
                            const identifier = dashMatch[1].trim();
                            const rightPart = dashMatch[2].trim();

                            const amountParts = rightPart.split('+').map(p => p.trim()).filter(p => p.length > 0);

                            amountParts.forEach(part => {
                                const amountMatch = part.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Zа-яА-Я]*)/);
                                if (amountMatch) {
                                    const amount = parseFloat(amountMatch[1].replace(',', '.'));
                                    if (isNaN(amount) || amount <= 0) return;

                                    const unit = normalizeUnit(amountMatch[2] || 'г');

                                    const paint = findPaint(identifier, seriesPaints, seriesPrefix);
                                    if (paint) {
                                        const key = paint.id + '_' + unit;
                                        if (!ingredientSums[key]) {
                                            ingredientSums[key] = {
                                                paintId: paint.id,
                                                unit: unit,
                                                amount: 0
                                            };
                                        }
                                        ingredientSums[key].amount += amount;
                                    } else {
                                        console.log('Не вдалося знайти фарбу для ідентифікатора:', identifier);
                                    }
                                }
                            });
                        } else {
                            const amountMatch = line.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Zа-яА-Я]*)/);
                            if (amountMatch) {
                                const amount = parseFloat(amountMatch[1].replace(',', '.'));
                                if (isNaN(amount) || amount <= 0) return;
                                const unit = normalizeUnit(amountMatch[2] || 'г');

                                for (let paint of seriesPaints) {
                                    if (line.toUpperCase().includes(paint.name.toUpperCase())) {
                                        const key = paint.id + '_' + unit;
                                        if (!ingredientSums[key]) {
                                            ingredientSums[key] = {
                                                paintId: paint.id,
                                                unit: unit,
                                                amount: 0
                                            };
                                        }
                                        ingredientSums[key].amount += amount;
                                        break;
                                    }
                                }
                            }
                        }
                    });

                    const foundIngredients = Object.values(ingredientSums).map(item => ({
                        paintId: item.paintId,
                        amount: item.amount,
                        unit: item.unit,
                        percentage: 0
                    }));

                    SICOMIX.utils.hideNotification();

                    if (foundIngredients.length === 0) {
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('scan_no_paints'), 'warning');
                        return;
                    }

                    let message = '';
                    foundIngredients.forEach(ing => {
                        const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId));
                        if (paint) {
                            message += `\n• ${paint.name} – ${ing.amount} ${ing.unit}`;
                        }
                    });

                    SICOMIX.utils.showConfirmation(
                        SICOMIX.i18n.t('scan_success', { count: foundIngredients.length }),
                        message,
                        () => {
                            foundIngredients.forEach(ing => {
                                const existing = selectedIngredients.find(
                                    ex => String(ex.paintId) === String(ing.paintId) && ex.unit === ing.unit
                                );
                                if (existing) {
                                    existing.amount += ing.amount;
                                } else {
                                    selectedIngredients.push(ing);
                                }
                            });
                            calculatePercentages();
                            renderIngredientsList();
                            updateSeriesLockUI();
                            autoSaveRecipeDraft();
                            
                            renderPantoneCatalog();
                            renderRalCatalog();
                            
                            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
                        },
                        () => {}
                    );

                } catch (error) {
                    console.error('Помилка сканування:', error);
                    SICOMIX.utils.hideNotification();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('scan_error'), 'error');
                }
            };

            input.click();
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
                        loadData();
                    }
                    initSettings();
                    setupEventListeners();
                    updatePaintCount();
                    renderPaintCatalog();
                    renderRecipes();
                    renderIngredientsList();
                    populateCategoryFilters();
                    populateSeriesSelect();
                    updateSeriesLockUI();
                    
                    if (window.innerWidth > 992) {
                        sidebar.classList.add('active');
                        mainContainer.classList.add('sidebar-open');
                    }

                    if (document.getElementById('new-recipe-page')?.classList.contains('active')) {
                        loadRecipeDraft();
                    }

                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.style.opacity = '0';
                        setTimeout(() => preloader.remove(), 500);
                    }

                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
                });
            } else {
                loadData();
                initSettings();
                setupEventListeners();
                updatePaintCount();
                renderPaintCatalog();
                renderRecipes();
                renderIngredientsList();
                populateCategoryFilters();
                populateSeriesSelect();
                updateSeriesLockUI();

                if (window.innerWidth > 992) {
                    sidebar.classList.add('active');
                    mainContainer.classList.add('sidebar-open');
                }

                if (document.getElementById('new-recipe-page')?.classList.contains('active')) {
                    loadRecipeDraft();
                }

                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.remove(), 500);
                }

                SICOMIX.utils.showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
            }
        }

        return {
            init: initApp,
            deleteRecipe,
            exportRecipe,
            editRecipe,
            deletePaint,
            printLabel,
            showNotification: SICOMIX.utils.showNotification,
            addPantoneToRecipe: addPantoneToRecipe,
            addRalToRecipe: addRalToRecipe
        };
    })();

})(window);
