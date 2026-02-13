// ========== ОСНОВНИЙ МОДУЛЬ ДОДАТКУ (СТАБІЛЬНА ВЕРСІЯ + ПАГІНАЦІЯ + ПЕРЕКЛАД) ==========
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

        // Для пагінації каталогу
        let catalogFiltered = [];
        let catalogPage = 1;
        const CATALOG_PAGE_SIZE = 30;

        // ---------- DOM ЕЛЕМЕНТИ ----------
        let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
        let navLinks, pageContents, totalPaintsEl, headerPaintCount;
        let colorPreview, recipeColor, ingredientsList, paintSearch, categoryFilter;
        let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
        let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
        let paintCatalogEl, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
        let languageSelect, unitsSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;
        let actionCards;

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
            colorPreview = document.getElementById('colorPreview');
            recipeColor = document.getElementById('recipeColor');
            ingredientsList = document.getElementById('ingredientsList');
            paintSearch = document.getElementById('paintSearch');
            categoryFilter = document.getElementById('categoryFilter');
            addIngredientBtn = document.getElementById('addIngredientBtn');
            saveRecipeBtn = document.getElementById('saveRecipeBtn');
            clearRecipeBtn = document.getElementById('clearRecipeBtn');
            calculatePercentagesBtn = document.getElementById('calculatePercentagesBtn');
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
            autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
            backupCheckbox = document.getElementById('backupCheckbox');
            saveSettingsBtn = document.getElementById('saveSettingsBtn');
            resetSettingsBtn = document.getElementById('resetSettingsBtn');
            clearAllDataBtn = document.getElementById('clearAllDataBtn');
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
        }

        function saveData() {
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumUserPaints', userPaints);
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
        }

        // ---------- АВТОЗБЕРЕЖЕННЯ ЧЕРНЕТКИ РЕЦЕПТУ ----------
        function autoSaveRecipeDraft() {
            if (!document.getElementById('new-recipe-page')?.classList.contains('active')) return;
            if (isEditingRecipe) return;

            const draft = {
                name: document.getElementById('recipeName')?.value || '',
                category: document.getElementById('recipeCategory')?.value || '',
                color: document.getElementById('recipeColor')?.value || '#3a86ff',
                description: document.getElementById('recipeDescription')?.value || '',
                ingredients: selectedIngredients.map(ing => ({ ...ing }))
            };
            SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipeDraft', draft);
            recipeDraft = draft;
        }

        const debouncedAutoSave = SICOMIX.utils.debounce(autoSaveRecipeDraft, 300);

        function attachAutoSaveListeners() {
            const recipeName = document.getElementById('recipeName');
            const recipeCategory = document.getElementById('recipeCategory');
            const recipeColor = document.getElementById('recipeColor');
            const recipeDescription = document.getElementById('recipeDescription');

            if (recipeName) recipeName.addEventListener('input', debouncedAutoSave);
            if (recipeCategory) recipeCategory.addEventListener('change', debouncedAutoSave);
            if (recipeColor) recipeColor.addEventListener('input', debouncedAutoSave);
            if (recipeDescription) recipeDescription.addEventListener('input', debouncedAutoSave);
        }

        function loadRecipeDraft() {
            if (isEditingRecipe || !recipeDraft) return;
            document.getElementById('recipeName').value = recipeDraft.name || '';
            document.getElementById('recipeCategory').value = recipeDraft.category || '';
            document.getElementById('recipeColor').value = recipeDraft.color || '#3a86ff';
            if (colorPreview) colorPreview.style.background = recipeDraft.color || '#3a86ff';
            document.getElementById('recipeDescription').value = recipeDraft.description || '';
            selectedIngredients = (recipeDraft.ingredients || []).map(ing => ({ ...ing }));
            renderIngredientsList();
            calculatePercentages();
        }

        function clearRecipeDraft() {
            localStorage.removeItem('sicoSpectrumRecipeDraft');
            recipeDraft = null;
        }

        // ---------- НАЛАШТУВАННЯ ----------
        function initSettings() {
            if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
            if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
            if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
            if (languageSelect) languageSelect.value = SICOMIX.i18n.getLanguage();
        }

        // ---------- ПОДІЇ ----------
        function setupEventListeners() {
            // ---- Делегований обробник навігації ----
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

            // ---- Мобільне меню ----
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

            // ---- Колір пікер ----
            if (recipeColor && colorPreview) {
                recipeColor.addEventListener('input', () => {
                    colorPreview.style.background = recipeColor.value;
                    debouncedAutoSave();
                });
            }

            // ---- Фото ----
            const recipePhoto = document.getElementById('recipePhoto');
            if (recipePhoto) {
                recipePhoto.addEventListener('change', function() {
                    const fileName = this.files[0]?.name || SICOMIX.i18n.t('upload_photo');
                    document.getElementById('fileName').textContent = fileName;
                });
            }

            // ---- Новий рецепт ----
            if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
            if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
            if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
            if (calculatePercentagesBtn) calculatePercentagesBtn.addEventListener('click', calculatePercentages);

            // ---- Рецепти ----
            if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
            if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
            if (printRecipesBtn) printRecipesBtn.addEventListener('click', printRecipes);
            if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);

            // ---- Каталог ----
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

            // ---- Пошук з дебаунсом ----
            if (paintSearch) paintSearch.addEventListener('input', SICOMIX.utils.debounce(renderIngredientsList, 300));
            if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);
            if (document.getElementById('catalogSearch')) {
                document.getElementById('catalogSearch').addEventListener('input', SICOMIX.utils.debounce(() => {
                    catalogPage = 1;
                    renderPaintCatalog();
                }, 300));
            }

            // ---- НАЛАШТУВАННЯ МОВИ – ВИПРАВЛЕНО: негайне перемикання ----
            if (languageSelect) {
                languageSelect.addEventListener('change', function() {
                    const newLang = this.value;
                    currentSettings.language = newLang;
                    SICOMIX.i18n.setLanguage(newLang);
                    SICOMIX.i18n.applyTranslations();
                    populateCategoryFilters(); // оновлюємо всі селекти категорій
                    
                    // Оновлюємо поточну сторінку
                    const activePage = document.querySelector('.page-content.active');
                    if (activePage) {
                        const pageId = activePage.id.replace('-page', '');
                        if (pageId === 'recipes') renderRecipes();
                        if (pageId === 'catalog') renderPaintCatalog();
                    }
                    
                    saveData();
                });
            }

            if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
            if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
            if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);

            // ---- Гарячі клавіші ----
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    saveRecipeBtn?.click();
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

            // ---- Закриття сайдбару кліком поза ним (мобільні) ----
            document.addEventListener('click', function(e) {
                if (!sidebar || window.innerWidth > 992) return;
                if (!sidebar.classList.contains('active')) return;
                if (sidebar.contains(e.target) || menuToggle?.contains(e.target) || desktopMenuToggle?.contains(e.target) || closeSidebar?.contains(e.target)) return;
                sidebar.classList.remove('active');
                mainContainer?.classList.remove('sidebar-open');
                document.body.style.overflow = 'auto';
            });

            attachAutoSaveListeners();
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
                html += `<tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:24px; height:24px; background:${paint.color}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                            <div>
                                <div style="font-weight:600;">${paint.name}</div>
                                <div style="font-size:12px; color:var(--text-secondary);">${SICOMIX.i18n.translateCategory(paint.category)}</div>
                            </div>
                        </div>
                    </td>
                    <td><input type="number" class="input-small" value="${ing.amount}" data-index="${idx}" data-field="amount" min="0" step="0.1"></td>
                    <td>
                        <select class="unit-select" data-index="${idx}" data-field="unit">
                            <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>г</option>
                            <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>кг</option>
                            <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>мл</option>
                            <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>л</option>
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
                    debouncedAutoSave();
                });
            });
            ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
                btn.addEventListener('click', function() {
                    deleteIngredient(parseInt(this.dataset.index));
                    debouncedAutoSave();
                });
            });
        }

        function handleIngredientChange(e) {
            const idx = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            if (idx >= 0 && idx < selectedIngredients.length) {
                selectedIngredients[idx][field] = field === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value;
                if (field === 'amount') calculatePercentages();
            }
        }

        function addIngredient() {
            const term = paintSearch?.value.toLowerCase() || '';
            const cat = categoryFilter?.value || '';
            let filtered = paintCatalog;
            if (term) filtered = filtered.filter(p => p && p.name && p.name.toLowerCase().includes(term));
            if (cat) filtered = filtered.filter(p => p && p.category === cat);
            if (filtered.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paints_not_found'), 'error');
                return;
            }
            showPaintSelectionModal(filtered);
        }

        function showPaintSelectionModal(paints) {
            const modal = document.getElementById('paintSelectionModal');
            const list = document.getElementById('paintSelectionList');
            list.innerHTML = paints.map(p => `
                <div class="paint-selection-card" data-id="${p.id}">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:32px; height:32px; background:${p.color}; border-radius:8px;"></div>
                        <div><strong>${p.name}</strong><br><span style="font-size:12px;">${SICOMIX.i18n.translateCategory(p.category)}</span></div>
                    </div>
                </div>
            `).join('');
            modal.classList.add('active');

            list.querySelectorAll('.paint-selection-card').forEach(card => {
                card.addEventListener('click', function() {
                    const pid = this.dataset.id;
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
                });
            });

            const closeBtn = modal.querySelector('.close-paint-selection');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => modal.classList.remove('active'));
            }
        }

        function deleteIngredient(index) {
            if (index >= 0) {
                selectedIngredients.splice(index, 1);
                calculatePercentages();
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
            const color = document.getElementById('recipeColor')?.value;
            const desc = document.getElementById('recipeDescription')?.value.trim();

            if (!name || !cat || selectedIngredients.length === 0) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
                return;
            }

            if (isEditingRecipe && editingRecipeId) {
                const idx = recipes.findIndex(r => String(r.id) === String(editingRecipeId));
                if (idx !== -1) {
                    recipes[idx] = {
                        ...recipes[idx],
                        name,
                        category: cat,
                        color,
                        description: desc,
                        ingredients: [...selectedIngredients],
                        date: new Date().toLocaleDateString('uk-UA')
                    };
                    saveData();
                    SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`, 'success');
                    resetEditMode();
                }
            } else {
                const newRecipe = {
                    id: SICOMIX.utils.generateId(),
                    name,
                    category: cat,
                    color,
                    description: desc,
                    ingredients: [...selectedIngredients],
                    date: new Date().toLocaleDateString('uk-UA'),
                    photo: null
                };
                recipes.push(newRecipe);
                saveData();
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`, 'success');
            }
            clearRecipeForm();
            clearRecipeDraft();
            switchPage('recipes');
        }

        function clearRecipeForm() {
            document.getElementById('recipeName').value = '';
            document.getElementById('recipeCategory').value = '';
            if (recipeColor) recipeColor.value = '#3a86ff';
            if (colorPreview) colorPreview.style.background = '#3a86ff';
            document.getElementById('recipeDescription').value = '';
            selectedIngredients = [];
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
                return `<div class="recipe-card" data-id="${r.id}">
                    <div class="recipe-image" style="background: linear-gradient(145deg, ${r.color}80, ${r.color});">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div><h3 class="recipe-title">${r.name}</h3><span class="recipe-category">${SICOMIX.i18n.translateCategory(r.category)}</span></div>
                            <div class="recipe-select-container">
                                <input type="checkbox" class="recipe-select" value="${r.id}" ${selectedRecipes.includes(r.id) ? 'checked' : ''}>
                                <span>${SICOMIX.i18n.t('select')}</span>
                            </div>
                        </div>
                        <p class="recipe-description">${r.description || SICOMIX.i18n.t('no_description')}</p>
                        <div class="recipe-meta">
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('ingredients_count')}</span><br><strong>${r.ingredients.length}</strong></div>
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('total_weight')}</span><br><strong>${total} г</strong></div>
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('date')}</span><br><strong>${r.date}</strong></div>
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
            SICOMIX.utils.exportToFile(recipes, `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.json`);
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
        }

        function importRecipes() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                    try {
                        const imported = JSON.parse(ev.target.result);
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
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        function printRecipes() {
            const win = window.open('', '_blank');
            win.document.write(`<html><head><title>${SICOMIX.i18n.t('print_recipes')}</title><style>body{font-family:Inter,sans-serif;padding:20px;background:#0a0c0f;color:#f0f4f8;}</style></head><body><h1>SICO Spectrum</h1><p>${SICOMIX.i18n.t('print_date')}: ${new Date().toLocaleDateString()}</p>${recipes.map(r => `<div style="margin-bottom:30px;"><h2>${r.name}</h2><p>${r.description || ''}</p></div>`).join('')}</body></html>`);
            win.document.close();
            win.print();
        }

        // ---------- КАТАЛОГ ФАРБ (З ПАГІНАЦІЄЮ) ----------
        function renderPaintCatalog() {
            if (!paintCatalogEl) {
                console.warn('⚠️ paintCatalogEl не знайдено!');
                return;
            }

            try {
                const search = document.getElementById('catalogSearch')?.value?.toLowerCase() || '';
                let filtered = paintCatalog.filter(p => p != null);

                if (search) {
                    filtered = filtered.filter(p => 
                        (p.name && p.name.toLowerCase().includes(search)) || 
                        (p.category && p.category.toLowerCase().includes(search)) ||
                        (p.article && p.article.toLowerCase().includes(search))
                    );
                }

                catalogFiltered = filtered;

                if (catalogFiltered.length === 0) {
                    paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
                    return;
                }

                // Визначаємо, чи показувати пагінацію (на мобільних)
                const isMobile = window.innerWidth <= 768;
                const pageSize = isMobile ? CATALOG_PAGE_SIZE : Infinity;
                
                // Скидаємо сторінку, якщо поточна перевищує доступну кількість
                const maxPage = Math.ceil(catalogFiltered.length / pageSize);
                if (catalogPage > maxPage) catalogPage = maxPage;
                if (catalogPage < 1) catalogPage = 1;

                const start = 0;
                const end = isMobile ? catalogPage * pageSize : catalogFiltered.length;
                const paginated = catalogFiltered.slice(start, end);

                let html = paginated.map(p => {
                    const name = p.name || 'Без назви';
                    const category = SICOMIX.i18n.translateCategory(p.category) || 'Інше';
                    const color = p.color || '#7b2cbf';
                    const manufacturer = p.manufacturer || 'SICO';
                    const article = p.article || '—';
                    const description = p.description || SICOMIX.i18n.t('no_description');
                    const isDefault = p.isDefault === true;
                    const canDelete = !isDefault;

                    return `
                        <div class="recipe-card" data-id="${p.id || ''}">
                            <div class="recipe-image" style="background:${color};"></div>
                            <div class="recipe-content">
                                <div class="recipe-header">
                                    <div><h3 class="recipe-title">${name}</h3><span class="recipe-category">${category}</span></div>
                                    ${isDefault ? `<span style="font-size:11px; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:20px;">SICO · ${SICOMIX.i18n.t('default_paint')}</span>` : ''}
                                </div>
                                <div style="margin-bottom:15px;">
                                    <div style="display:flex; gap:15px;">
                                        <div><span style="font-size:12px;">${SICOMIX.i18n.t('manufacturer')}</span><br><strong>${manufacturer}</strong></div>
                                        <div><span style="font-size:12px;">${SICOMIX.i18n.t('article')}</span><br><strong>${article}</strong></div>
                                    </div>
                                    <p style="color:var(--text-secondary);">${description}</p>
                                </div>
                                <div class="recipe-actions">
                                    ${canDelete ? 
                                        `<button class="recipe-btn delete-paint" data-id="${p.id}"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>` : 
                                        `<button class="recipe-btn" disabled style="opacity:0.5; cursor:not-allowed;"><i class="fas fa-ban"></i> ${SICOMIX.i18n.t('default_paint')}</button>`
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Кнопка "Завантажити ще" тільки якщо є невідображені елементи
                if (isMobile && end < catalogFiltered.length) {
                    html += `
                        <div style="text-align:center; margin:20px 0;">
                            <button class="btn btn-primary" id="loadMoreCatalogBtn">
                                <i class="fas fa-arrow-down"></i> ${SICOMIX.i18n.t('load_more')} (${catalogFiltered.length - end} ${SICOMIX.i18n.t('paints')})
                            </button>
                        </div>
                    `;
                }

                paintCatalogEl.innerHTML = html;

                // Додаємо обробник для кнопки "Завантажити ще"
                const loadMoreBtn = document.getElementById('loadMoreCatalogBtn');
                if (loadMoreBtn) {
                    loadMoreBtn.addEventListener('click', () => {
                        catalogPage++;
                        renderPaintCatalog();
                    });
                }

                // Обробники видалення
                paintCatalogEl.querySelectorAll('.delete-paint').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deletePaint(btn.dataset.id);
                    });
                });

                updatePaintCount();
            } catch (error) {
                console.error('❌ Помилка в renderPaintCatalog:', error);
                paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                    <i class="fas fa-exclamation-triangle"></i> ${SICOMIX.i18n.t('catalog_render_error')}<br>${error.message}
                </p>`;
            }
        }

        function addNewPaint() {
            document.getElementById('paintName').value = '';
            document.getElementById('paintCategory').value = '';
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
                isDefault: false
            };
            userPaints.push(newPaint);
            paintCatalog = [...basePaints, ...userPaints];
            saveData();
            addPaintModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            populateCategoryFilters(); // Оновлюємо фільтри після додавання нової категорії
            renderPaintCatalog();
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('paint_added')} "${name}"`, 'success');
        }

        function deletePaint(id) {
            const index = userPaints.findIndex(p => String(p.id) === String(id));
            if (index !== -1) {
                SICOMIX.utils.showConfirmation(
                    SICOMIX.i18n.t('delete_paint'),
                    SICOMIX.i18n.t('delete_paint_confirmation'),
                    () => {
                        userPaints.splice(index, 1);
                        paintCatalog = [...basePaints, ...userPaints];
                        saveData();
                        populateCategoryFilters(); // Оновлюємо фільтри після видалення
                        renderPaintCatalog();
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
                    }
                );
            } else {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('cannot_delete_default_paint'), 'warning');
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
            document.getElementById('recipeColor').value = recipe.color;
            if (colorPreview) colorPreview.style.background = recipe.color;
            document.getElementById('recipeDescription').value = recipe.description || '';
            selectedIngredients = recipe.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
            renderIngredientsList();
            isEditingRecipe = true;
            editingRecipeId = id;
            if (saveRecipeBtn) {
                saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe"></span>`;
                SICOMIX.i18n.applyTranslations();
            }
            switchPage('new-recipe');
            SICOMIX.utils.showNotification(`"${recipe.name}" ${SICOMIX.i18n.t('edit')}`, 'info');
        }

        // ---------- НАЛАШТУВАННЯ ----------
        function saveSettings() {
            currentSettings = {
                language: languageSelect.value,
                units: unitsSelect.value,
                autoSave: autoSaveCheckbox.checked,
                backup: backupCheckbox.checked,
                theme: 'dark',
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
                    populateCategoryFilters(); // Оновлюємо фільтри після очищення
                    renderRecipes();
                    renderPaintCatalog();
                    updatePaintCount();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('data_cleared'), 'success');
                }
            );
        }

        // ---------- ДОПОМІЖНІ ФУНКЦІЇ ----------
        function populateCategoryFilters() {
            // Отримуємо унікальні категорії з поточного каталогу фарб
            const uniqueCategories = [...new Set(paintCatalog.map(p => p.category).filter(Boolean))].sort();
            
            const selects = [
                document.getElementById('recipeCategory'),
                document.getElementById('paintCategory'),
                document.getElementById('categoryFilter'),
                document.getElementById('recipeCategoryFilter')
            ];
            
            selects.forEach(sel => {
                if (!sel) return;
                const current = sel.value;
                // Зберігаємо перший порожній варіант
                sel.innerHTML = `<option value="" data-i18n="select_category">${SICOMIX.i18n.t('select_category')}</option>`;
                
                uniqueCategories.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = SICOMIX.i18n.translateCategory(c);
                    sel.appendChild(opt);
                });
                
                // Якщо поточне значення все ще існує в новому списку, відновлюємо його
                if (current && uniqueCategories.includes(current)) {
                    sel.value = current;
                }
            });
            
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
