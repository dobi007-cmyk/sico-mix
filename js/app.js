// ========== ОСНОВНИЙ МОДУЛЬ ДОДАТКУ (ВИПРАВЛЕНО + ТЕМИ + ФОТО) ==========
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
        let recipePhotoDataUrl = null; // ADDED

        // Для пагінації каталогу
        let catalogFilteredSeries = [];
        let catalogPage = 1;
        const CATALOG_PAGE_SIZE = 5; // кількість серій на сторінку (можна змінити)

        // ---------- DOM ЕЛЕМЕНТИ ----------
        let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
        let navLinks, pageContents, totalPaintsEl, headerPaintCount;
        let ingredientsList, paintSearch, categoryFilter;
        let addIngredientBtn, saveRecipeBtn, clearRecipeBtn;
        let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
        let paintCatalogEl, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
        let languageSelect, unitsSelect, themeSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;
        let actionCards;
        let startImportBtn, startExportBtn, importFormat, exportFormat, importFile, importRecipesCheckbox, importPaintsCheckbox;
        let exportRecipesCheckbox, exportPaintsCheckbox, exportCalculationsCheckbox, includePhotosCheckbox, compressDataCheckbox;
        let loadMoreCatalogBtn;
        // ADDED: photo elements
        let recipePhotoInput, recipePhotoPreview, recipePhotoImg, fileNameSpan;

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
            // ADDED
            recipePhotoInput = document.getElementById('recipePhoto');
            recipePhotoPreview = document.getElementById('recipePhotoPreview');
            recipePhotoImg = document.getElementById('recipePhotoImg');
            fileNameSpan = document.getElementById('fileName');
        }

        // ---------- ЗАВАНТАЖЕННЯ ТА ЗБЕРЕЖЕННЯ ----------
        function loadData() {
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

            paintCatalog = [...basePaints, ...userPaints];

            const savedRecipes = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipes', []);
            recipes = savedRecipes.map(r => ({
                ...r,
                id: String(r.id),
                ingredients: (r.ingredients || []).map(ing => ({
                    ...ing,
                    paintId: String(ing.paintId)
                }))
            }));

            currentSettings = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumSettings', SICOMIX.data.defaultSettings || {});
            recipeDraft = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipeDraft', null);
            // If draft has photo, set it
            if (recipeDraft && recipeDraft.photo) {
                recipePhotoDataUrl = recipeDraft.photo;
            }
        }

        function saveData() {
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumUserPaints', userPaints);
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
            updatePaintCount();
        }

        // ---------- АВТОЗБЕРЕЖЕННЯ ЧЕРНЕТКИ РЕЦЕПТУ ----------
        function autoSaveRecipeDraft() {
            if (!currentSettings.autoSave) return;
            if (!document.getElementById('new-recipe-page')?.classList.contains('active')) return;
            if (isEditingRecipe) return; // Don't auto-save draft when editing (we could, but careful)

            const draft = {
                name: document.getElementById('recipeName')?.value || '',
                category: document.getElementById('recipeCategory')?.value || '',
                series: document.getElementById('recipeSeries')?.value || '',
                description: document.getElementById('recipeDescription')?.value || '',
                ingredients: selectedIngredients.map(ing => ({ ...ing })),
                photo: recipePhotoDataUrl // ADDED
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
            // ADDED: load photo
            if (recipeDraft.photo) {
                recipePhotoDataUrl = recipeDraft.photo;
                showPhotoPreview(recipePhotoDataUrl);
            } else {
                resetPhotoPreview();
            }
            renderIngredientsList();
            calculatePercentages();
        }

        function clearRecipeDraft() {
            localStorage.removeItem('sicoSpectrumRecipeDraft');
            recipeDraft = null;
            // ADDED: clear photo
            recipePhotoDataUrl = null;
            resetPhotoPreview();
        }

        // ADDED: photo preview helpers
        function showPhotoPreview(dataUrl) {
            if (recipePhotoImg && recipePhotoPreview) {
                recipePhotoImg.src = dataUrl;
                recipePhotoPreview.style.display = 'block';
            }
            if (fileNameSpan) {
                fileNameSpan.textContent = SICOMIX.i18n.t('upload_photo') + ' (фото обрано)';
            }
        }
        function resetPhotoPreview() {
            if (recipePhotoPreview) recipePhotoPreview.style.display = 'none';
            if (recipePhotoImg) recipePhotoImg.src = '#';
            if (fileNameSpan) fileNameSpan.textContent = SICOMIX.i18n.t('upload_photo');
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
                const navItem = e.target.closest('[data-page]');
                if (navItem) {
                    e.preventDefault();
                    const page = navItem.getAttribute('data-page');
                    switchPage(page);
                    if (window.innerWidth <= 992) {
                        sidebar?.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
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

            // MODIFIED: handle photo change
            if (recipePhotoInput) {
                recipePhotoInput.addEventListener('change', function() {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            recipePhotoDataUrl = e.target.result;
                            showPhotoPreview(recipePhotoDataUrl);
                            debouncedAutoSave(); // autosave when photo selected
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

            if (startImportBtn) startImportBtn.addEventListener('click', startImport);
            if (startExportBtn) startExportBtn.addEventListener('click', startExport);

            if (languageSelect) {
                languageSelect.addEventListener('change', function() {
                    const newLang = this.value;
                    currentSettings.language = newLang;
                    SICOMIX.i18n.setLanguage(newLang);
                    SICOMIX.i18n.applyTranslations();
                    
                    populateCategoryFilters();
                    populateStandardCategorySelect();
                    populateSeriesSelect();
                    
                    const activePage = document.querySelector('.page-content.active');
                    if (activePage) {
                        const pageId = activePage.id.replace('-page', '');
                        if (pageId === 'recipes') renderRecipes();
                        if (pageId === 'catalog') renderPaintCatalog();
                        if (pageId === 'new-recipe') renderIngredientsList();
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
                    renderPaintCatalog(true); // довантажити
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

            // Попередження про незбережені зміни
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
                    loadRecipeDraft();
                }
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
                const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId));
                if (!paint) return;
                const paintName = paint.displayName?.[SICOMIX.i18n.getLanguage()] || paint.name;
                html += `<tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:24px; height:24px; background:${SICOMIX.utils.escapeHtml(paint.color)}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                            <div>
                                <div style="font-weight:600;">${SICOMIX.utils.escapeHtml(paintName)}</div>
                                <div style="font-size:12px; color:var(--text-secondary);">
                                    ${SICOMIX.i18n.translateCategory(paint.category)} 
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
                    calculatePercentages(); // автоматичний перерахунок
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
            selectedSeries = seriesSelect.value;

            const term = paintSearch?.value.toLowerCase() || '';
            const cat = categoryFilter?.value || '';
            
            let filtered = paintCatalog.filter(p => p.series === selectedSeries);
            
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
                        <div><strong>${SICOMIX.utils.escapeHtml(paintName)}</strong><br><span style="font-size:12px;">${SICOMIX.i18n.translateCategory(p.category)} (${SICOMIX.utils.escapeHtml(p.series)})</span></div>
                    </div>
                </div>
            `}).join('');
            modal.classList.add('active');

            // Використовуємо делегування для уникнення накопичення слухачів
            const clickHandler = (e) => {
                const card = e.target.closest('.paint-selection-card');
                if (!card) return;
                const pid = card.dataset.id;
                const paint = paintCatalog.find(p => String(p.id) === pid);
                if (!paint) return;
                
                if (paint.series !== selectedSeries) {
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('series_mismatch'), 'error');
                    return;
                }
                
                if (selectedIngredients.some(ing => String(ing.paintId) === pid)) {
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                } else {
                    selectedIngredients.push({ paintId: pid, amount: 100, unit: 'г', percentage: 0 });
                    calculatePercentages();
                    renderIngredientsList();
                    debouncedAutoSave();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
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
                selectedIngredients.splice(index, 1);
                renderIngredientsList();
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

            // MODIFIED: include photo
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
            // ADDED: clear photo
            recipePhotoDataUrl = null;
            resetPhotoPreview();
            renderIngredientsList();
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
                // MODIFIED: display photo if exists
                const photoHtml = r.photo ? `<img src="${SICOMIX.utils.escapeHtml(r.photo)}" style="width:100%; height:100%; object-fit:cover;">` : `<i class="fas fa-palette"></i>`;
                return `<div class="recipe-card" data-id="${r.id}">
                    <div class="recipe-image" style="background: linear-gradient(145deg, #3a86ff80, #7b2cbf80);">
                        ${photoHtml}
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div><h3 class="recipe-title">${SICOMIX.utils.escapeHtml(r.name)}</h3><span class="recipe-category">${SICOMIX.i18n.translateCategory(r.category)} / ${SICOMIX.utils.escapeHtml(r.series)}</span></div>
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
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th { background: rgba(58, 134, 255, 0.2); padding: 12px; text-align: left; color: white; }
                    td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                    .footer { text-align: center; margin-top: 50px; color: #b0c0ce; font-size: 12px; }
                    @media print { body { background: white; color: black; } .recipe-card { background: #f5f5f5; border: 1px solid #ccc; } th { background: #ddd; color: black; } .company-name { -webkit-text-fill-color: #333; } .print-date { color: #666; } }
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
                        <span><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategory(recipe.category)} / ${SICOMIX.utils.escapeHtml(recipe.series)}</span>
                        <span><strong>${SICOMIX.i18n.t('date')}:</strong> ${SICOMIX.utils.escapeHtml(recipe.date || SICOMIX.i18n.t('unknown'))}</span>
                        <span><strong>${SICOMIX.i18n.t('total_weight')}:</strong> ${total} г</span>
                    </div>
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
                    const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId));
                    const paintName = paint ? (paint.displayName?.[lang] || paint.name) : '?';
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

        // ---------- КАТАЛОГ ФАРБ (з пагінацією) ----------
        function renderPaintCatalog(append = false) {
            if (!paintCatalogEl) {
                console.warn('⚠️ paintCatalogEl не знайдено!');
                return;
            }

            try {
                const search = document.getElementById('catalogSearch')?.value?.toLowerCase() || '';
                const allSeries = SICOMIX.data.series || [];
                const lang = SICOMIX.i18n.getLanguage();
                
                // Фільтруємо серії, які мають хоча б одну фарбу після фільтрації
                let seriesWithPaints = allSeries.filter(series => {
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

                // Пагінація
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
                
                paginatedSeries.forEach(series => {
                    let seriesPaints = paintCatalog.filter(p => p.series === series.id);
                    
                    if (search) {
                        seriesPaints = seriesPaints.filter(p => {
                            const paintName = p.displayName?.[lang] || p.name;
                            return paintName.toLowerCase().includes(search) ||
                                   (p.article && p.article.toLowerCase().includes(search));
                        });
                    }
                    
                    const seriesName = series.name[lang] || series.id;
                    const category = series.category || '';
                    const description = series.description[lang] || series.description['uk'] || '';
                    const properties = series.properties || {};
                    
                    html += `
                        <div class="series-card" data-series="${series.id}">
                            <div class="series-header" style="background: linear-gradient(145deg, #3a86ff20, #7b2cbf20);">
                                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                    <div>
                                        <h3 style="font-size: 24px; margin-bottom: 5px;">${SICOMIX.utils.escapeHtml(seriesName)}</h3>
                                        <span class="recipe-category">${SICOMIX.i18n.translateCategory(category)}</span>
                                    </div>
                                    <button class="btn-icon toggle-series" style="font-size: 20px;">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                </div>
                                <p style="margin-top: 15px; color: var(--text-secondary);">${SICOMIX.utils.escapeHtml(description)}</p>
                            </div>
                            
                            <div class="series-properties" style="display: none; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 12px; margin: 15px 0;">
                                <h4 style="margin-bottom: 10px; color: var(--spectrum-cyan);" data-i18n="properties">Властивості</h4>
                                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
                                    ${properties.type ? `<div><strong data-i18n="type">Тип:</strong> ${SICOMIX.utils.escapeHtml(properties.type[lang] || properties.type['uk'])}</div>` : ''}
                                    ${properties.finish ? `<div><strong data-i18n="finish">Поверхня:</strong> ${SICOMIX.utils.escapeHtml(properties.finish[lang] || properties.finish['uk'])}</div>` : ''}
                                    ${properties.drying ? `<div><strong data-i18n="drying">Сушіння:</strong> ${SICOMIX.utils.escapeHtml(properties.drying[lang] || properties.drying['uk'])}</div>` : ''}
                                    ${properties.mesh ? `<div><strong data-i18n="mesh">Сітка:</strong> ${SICOMIX.utils.escapeHtml(properties.mesh[lang] || properties.mesh['uk'])}</div>` : ''}
                                    ${properties.cleaning ? `<div><strong data-i18n="cleaning">Очищення:</strong> ${SICOMIX.utils.escapeHtml(properties.cleaning[lang] || properties.cleaning['uk'])}</div>` : ''}
                                    ${properties.storage ? `<div><strong data-i18n="storage">Зберігання:</strong> ${SICOMIX.utils.escapeHtml(properties.storage[lang] || properties.storage['uk'])}</div>` : ''}
                                    ${properties.resistance ? `<div><strong data-i18n="resistance">Стійкість:</strong> ${SICOMIX.utils.escapeHtml(properties.resistance[lang] || properties.resistance['uk'])}</div>` : ''}
                                    ${properties.thinning ? `<div><strong data-i18n="thinning">Розрідження:</strong> ${SICOMIX.utils.escapeHtml(properties.thinning[lang] || properties.thinning['uk'])}</div>` : ''}
                                    ${properties.additives ? `<div><strong data-i18n="additives">Добавки:</strong> ${SICOMIX.utils.escapeHtml(properties.additives[lang] || properties.additives['uk'])}</div>` : ''}
                                    ${properties.special ? `<div><strong data-i18n="special">Спеціальне:</strong> ${SICOMIX.utils.escapeHtml(properties.special[lang] || properties.special['uk'])}</div>` : ''}
                                </div>
                            </div>
                            
                            <div class="series-paints" style="display: none; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
                                ${seriesPaints.map(p => {
                                    const paintName = p.displayName?.[lang] || p.name;
                                    return `
                                    <div class="paint-mini-card" data-paint-id="${p.id}">
                                        <div class="paint-mini-swatch" style="background: ${SICOMIX.utils.escapeHtml(p.color)};"></div>
                                        <div class="paint-mini-info">
                                            <div class="paint-mini-name">${SICOMIX.utils.escapeHtml(paintName)}</div>
                                            <div class="paint-mini-article">${SICOMIX.utils.escapeHtml(p.article || '')}</div>
                                        </div>
                                        ${!p.isDefault ? `
                                            <button class="btn-icon delete-paint" data-paint-id="${p.id}" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.5); border-radius: 50%; padding: 5px;">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        ` : ''}
                                    </div>
                                `}).join('')}
                            </div>
                        </div>
                    `;
                });

                if (append) {
                    paintCatalogEl.insertAdjacentHTML('beforeend', html);
                } else {
                    paintCatalogEl.innerHTML = html;
                }

                // Обробники для згортання/розгортання серій
                document.querySelectorAll('.toggle-series').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const seriesCard = this.closest('.series-card');
                        const paintsDiv = seriesCard.querySelector('.series-paints');
                        const propertiesDiv = seriesCard.querySelector('.series-properties');
                        const icon = this.querySelector('i');
                        
                        if (paintsDiv.style.display === 'none') {
                            paintsDiv.style.display = 'grid';
                            propertiesDiv.style.display = 'grid';
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        } else {
                            paintsDiv.style.display = 'none';
                            propertiesDiv.style.display = 'none';
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    });
                });

                document.querySelectorAll('.series-header').forEach(header => {
                    header.addEventListener('click', function(e) {
                        if (!e.target.closest('.toggle-series')) {
                            const btn = this.querySelector('.toggle-series');
                            if (btn) btn.click();
                        }
                    });
                });

                document.querySelectorAll('.paint-mini-card').forEach(card => {
                    card.addEventListener('click', function(e) {
                        if (e.target.closest('.delete-paint')) return;
                        const paintId = this.dataset.paintId;
                        const paint = paintCatalog.find(p => String(p.id) === paintId);
                        if (paint) showPaintDetails(paint);
                    });
                });

                document.querySelectorAll('.delete-paint').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const paintId = this.dataset.paintId;
                        if (paintId) {
                            deletePaint(paintId);
                        }
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
                        <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('category')}</th><td>${SICOMIX.i18n.translateCategory(paint.category)}</td></tr>
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
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
                    }
                );
            } else {
                userPaints = userPaints.filter(p => String(p.id) !== String(id));
                paintCatalog = [...basePaints, ...userPaints];
                saveData();
                renderPaintCatalog();
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
            // ADDED: load photo
            recipePhotoDataUrl = recipe.photo || null;
            if (recipePhotoDataUrl) {
                showPhotoPreview(recipePhotoDataUrl);
            } else {
                resetPhotoPreview();
            }
            renderIngredientsList();
            calculatePercentages();
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
                    saveData();
                    populateCategoryFilters();
                    renderRecipes();
                    renderPaintCatalog();
                    updatePaintCount();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('data_cleared'), 'success');
                }
            );
        }

        // ---------- ІМПОРТ/ЕКСПОРТ КАТАЛОГУ ----------
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
                    opt.textContent = SICOMIX.i18n.translateCategory(c);
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
                opt.textContent = SICOMIX.i18n.translateCategory(c);
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

        // ---------- ІНІЦІАЛІЗАЦІЯ ----------
        function initApp() {
            cacheDOMElements();
            loadData();
            initSettings();
            setupEventListeners();
            updatePaintCount();
            renderPaintCatalog();
            renderRecipes();
            renderIngredientsList();
            populateCategoryFilters();
            populateSeriesSelect();

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

        return {
            init: initApp,
            deleteRecipe,
            exportRecipe,
            editRecipe,
            deletePaint,
            showNotification: SICOMIX.utils.showNotification
        };
    })();

})(window);
