// ========== app.js - ОНОВЛЕНИЙ (без пігментного вибору) ==========
if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.app = (function() {
    // ========== ГЛОБАЛЬНІ ЗМІННІ ==========
    let recipes = [];
    let paintCatalog = [];
    let selectedIngredients = [];
    let selectedRecipes = [];
    let currentSettings = {};
    let isEditingRecipe = false;
    let editingRecipeId = null;

    // ========== DOM ЕЛЕМЕНТИ ==========
    let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
    let navLinks, pageContents, totalPaintsElement, headerPaintCount;
    let ingredientsList, paintSearch, categoryFilter;
    let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
    let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn;
    let deleteSelectedRecipesBtn, paintCatalogElement, addNewPaintBtn;
    let addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
    let confirmationModal, confirmationTitle, confirmationMessage;
    let confirmActionBtn, cancelActionBtn, closeConfirmationModal, actionCards;
    let languageSelect, unitsSelect, autoSaveCheckbox, backupCheckbox;
    let saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;

    // ========== ФУНКЦІЇ ІНІЦІАЛІЗАЦІЇ ==========
    function initApp() {
        cacheDOMElements();
        loadData();
        initLanguage();
        setupEventListeners();
        initSettings();
        updatePaintCount();
        renderPaintCatalog();
        loadRecipes();
        renderIngredientsList();
        
        if (window.innerWidth > 992) {
            sidebar.classList.add('active');
            mainContainer.classList.add('sidebar-open');
        }
        
        showNotification('SICO MIX завантажено! Готовий до роботи.', 'success', 2000);
    }

    function cacheDOMElements() {
        sidebar = document.getElementById('sidebar');
        menuToggle = document.getElementById('menuToggle');
        desktopMenuToggle = document.getElementById('desktopMenuToggle');
        closeSidebar = document.getElementById('closeSidebar');
        mainContainer = document.getElementById('mainContainer');
        navLinks = document.querySelectorAll('.nav-link');
        pageContents = document.querySelectorAll('.page-content');
        totalPaintsElement = document.getElementById('totalPaints');
        headerPaintCount = document.getElementById('headerPaintCount');
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
        paintCatalogElement = document.getElementById('paintCatalog');
        addNewPaintBtn = document.getElementById('addNewPaintBtn');
        addPaintModal = document.getElementById('addPaintModal');
        closePaintModal = document.getElementById('closePaintModal');
        savePaintBtn = document.getElementById('savePaintBtn');
        cancelPaintBtn = document.getElementById('cancelPaintBtn');
        confirmationModal = document.getElementById('confirmationModal');
        confirmationTitle = document.getElementById('confirmationTitle');
        confirmationMessage = document.getElementById('confirmationMessage');
        confirmActionBtn = document.getElementById('confirmActionBtn');
        cancelActionBtn = document.getElementById('cancelActionBtn');
        closeConfirmationModal = document.getElementById('closeConfirmationModal');
        actionCards = document.querySelectorAll('.action-card');
        languageSelect = document.getElementById('languageSelect');
        unitsSelect = document.getElementById('unitsSelect');
        autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
        backupCheckbox = document.getElementById('backupCheckbox');
        saveSettingsBtn = document.getElementById('saveSettingsBtn');
        resetSettingsBtn = document.getElementById('resetSettingsBtn');
        clearAllDataBtn = document.getElementById('clearAllDataBtn');
    }

    function loadData() {
        recipes = SICOMIX.utils.loadFromLocalStorage('sicoMixRecipes', SICOMIX.data.initialData.recipes);
        paintCatalog = SICOMIX.utils.loadFromLocalStorage('sicoMixPaints', SICOMIX.data.initialData.paints);
        currentSettings = SICOMIX.utils.loadFromLocalStorage('sicoMixSettings', SICOMIX.data.defaultSettings);
    }

    function saveData() {
        SICOMIX.utils.saveToLocalStorage('sicoMixRecipes', recipes);
        SICOMIX.utils.saveToLocalStorage('sicoMixPaints', paintCatalog);
        SICOMIX.utils.saveToLocalStorage('sicoMixSettings', currentSettings);
    }

    function initLanguage() {
        const savedLang = localStorage.getItem('sicoMixLanguage') || 'uk';
        if (languageSelect) languageSelect.value = savedLang;
        SICOMIX.i18n.setLanguage(savedLang);
    }

    function initSettings() {
        if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
        if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
        if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
    }

    // ========== НАВІГАЦІЯ ==========
    function setupNavigation() {
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
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });
        actionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
            });
        });
    }

    function switchPage(pageId) {
        if (isEditingRecipe && pageId !== 'new-recipe') {
            resetEditMode();
        }
        pageContents.forEach(page => page.classList.remove('active'));
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.classList.add('active');
            if (pageId === 'recipes') renderRecipes();
            else if (pageId === 'catalog') renderPaintCatalog();
            else if (pageId === 'new-recipe' && !isEditingRecipe) clearRecipeForm();
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) link.classList.add('active');
        });
    }

    // ========== НОВИЙ РЕЦЕПТ (БЕЗ КОЛЬОРУ) ==========
    function renderIngredientsList() {
        if (!ingredientsList) return;
        ingredientsList.innerHTML = '';
        if (selectedIngredients.length === 0) {
            ingredientsList.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--gray);">
                <i class="fas fa-paint-brush" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                <span>${SICOMIX.i18n.t('paints_not_found')}</span>
            </td></tr>`;
            return;
        }
        selectedIngredients.forEach((ingredient, index) => {
            const paint = paintCatalog.find(p => p.id === ingredient.paintId);
            if (!paint) return;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: ${paint.color}; border-radius: 6px;"></div>
                        <div>
                            <div style="font-weight: 600;">${paint.name}</div>
                            <div style="font-size: 12px; color: var(--gray);">${paint.category}</div>
                        </div>
                    </div>
                </td>
                <td><input type="number" class="input-small" value="${ingredient.amount}" data-index="${index}" data-field="amount" min="0" step="0.1"></td>
                <td>
                    <select class="unit-select" data-index="${index}" data-field="unit">
                        <option value="г" ${ingredient.unit === 'г' ? 'selected' : ''}>г</option>
                        <option value="кг" ${ingredient.unit === 'кг' ? 'selected' : ''}>кг</option>
                        <option value="мл" ${ingredient.unit === 'мл' ? 'selected' : ''}>мл</option>
                        <option value="л" ${ingredient.unit === 'л' ? 'selected' : ''}>л</option>
                    </select>
                </td>
                <td><input type="number" class="input-small" value="${ingredient.percentage || 0}" data-index="${index}" data-field="percentage" min="0" max="100" step="0.1" readonly> <span>%</span></td>
                <td><button class="btn-icon delete-ingredient" data-index="${index}" title="${SICOMIX.i18n.t('delete')}"><i class="fas fa-trash"></i></button></td>
            `;
            ingredientsList.appendChild(row);
        });
        ingredientsList.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', handleIngredientChange);
            input.addEventListener('input', handleIngredientChange);
        });
        ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteIngredient(parseInt(this.getAttribute('data-index')));
            });
        });
    }

    function handleIngredientChange(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        const field = e.target.getAttribute('data-field');
        const value = e.target.value;
        if (index >= 0 && index < selectedIngredients.length) {
            selectedIngredients[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
            if (field === 'amount') calculatePercentages();
        }
    }

    function addIngredient() {
        const searchTerm = paintSearch.value.toLowerCase();
        const category = categoryFilter.value;
        let filteredPaints = paintCatalog;
        if (searchTerm) {
            filteredPaints = filteredPaints.filter(paint => 
                paint.name.toLowerCase().includes(searchTerm) ||
                (paint.category && paint.category.toLowerCase().includes(searchTerm))
            );
        }
        if (category) filteredPaints = filteredPaints.filter(paint => paint.category === category);
        if (filteredPaints.length === 0) {
            showNotification(SICOMIX.i18n.t('paints_not_found'), 'error');
            return;
        }
        showPaintSelection(filteredPaints);
    }

    function showPaintSelection(paints) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content glass-card" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">${SICOMIX.i18n.t('select_paint')}</h3>
                    <button class="modal-close close-paint-selection">&times;</button>
                </div>
                <div style="max-height: 400px; overflow-y: auto;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; padding: 10px;">
                        ${paints.map(paint => `
                            <div class="paint-selection-card" data-id="${paint.id}">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="width: 30px; height: 30px; background: ${paint.color}; border-radius: 8px;"></div>
                                    <div style="font-weight: 600;">${paint.name}</div>
                                </div>
                                <div style="font-size: 12px; color: var(--gray);">${paint.category} • ${paint.manufacturer || 'SICO'}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-paint-selection').addEventListener('click', () => document.body.removeChild(modal));
        modal.querySelectorAll('.paint-selection-card').forEach(card => {
            card.addEventListener('click', function() {
                const paintId = this.getAttribute('data-id');
                if (selectedIngredients.some(ing => ing.paintId === paintId)) {
                    showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                    return;
                }
                selectedIngredients.push({ paintId, amount: 100, unit: 'г', percentage: 0 });
                calculatePercentages();
                renderIngredientsList();
                document.body.removeChild(modal);
                showNotification(SICOMIX.i18n.t('paint_added_to_recipe'));
            });
        });
        const handleEscape = (e) => { if (e.key === 'Escape') { document.body.removeChild(modal); document.removeEventListener('keydown', handleEscape); } };
        document.addEventListener('keydown', handleEscape);
    }

    function deleteIngredient(index) {
        if (index >= 0 && index < selectedIngredients.length) {
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
        const name = document.getElementById('recipeName').value.trim();
        const category = document.getElementById('recipeCategory').value;
        const description = document.getElementById('recipeDescription').value.trim();
        if (!name || !category || selectedIngredients.length === 0) {
            showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
            return;
        }
        // Автоматичне визначення кольору – з першого інгредієнта або стандартний
        const firstPaint = selectedIngredients.length > 0 ? paintCatalog.find(p => p.id === selectedIngredients[0].paintId) : null;
        const color = firstPaint ? firstPaint.color : '#4361ee';

        if (isEditingRecipe && editingRecipeId) {
            const index = recipes.findIndex(r => r.id === editingRecipeId);
            if (index !== -1) {
                recipes[index] = {
                    ...recipes[index],
                    name, category, color, description,
                    ingredients: [...selectedIngredients],
                    date: new Date().toLocaleDateString('uk-UA')
                };
                saveData();
                showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`);
                resetEditMode();
            }
        } else {
            const newRecipe = {
                id: SICOMIX.utils.generateId(),
                name, category, color, description,
                ingredients: [...selectedIngredients],
                date: new Date().toLocaleDateString('uk-UA'),
                photo: null
            };
            recipes.push(newRecipe);
            saveData();
            showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`);
        }
        clearRecipeForm();
        switchPage('recipes');
    }

    function clearRecipeForm() {
        document.getElementById('recipeName').value = '';
        document.getElementById('recipeCategory').value = '';
        document.getElementById('recipeDescription').value = '';
        selectedIngredients = [];
        renderIngredientsList();
        resetEditMode();
    }

    function resetEditMode() {
        isEditingRecipe = false;
        editingRecipeId = null;
        if (saveRecipeBtn) {
            saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe">Зберегти рецепт</span>`;
            SICOMIX.i18n.applyTranslations();
        }
    }

    // ========== РЕЦЕПТИ ==========
    function renderRecipes() {
        if (!recipesContainer) return;
        const searchTerm = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
        const category = document.getElementById('recipeCategoryFilter')?.value || '';
        let filteredRecipes = recipes;
        if (searchTerm) filteredRecipes = filteredRecipes.filter(r => r.name.toLowerCase().includes(searchTerm) || (r.description && r.description.toLowerCase().includes(searchTerm)));
        if (category) filteredRecipes = filteredRecipes.filter(r => r.category === category);
        recipesContainer.innerHTML = filteredRecipes.length ? filteredRecipes.map(recipe => {
            const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            return `
                <div class="recipe-card" data-id="${recipe.id}">
                    ${recipe.photo ? `<img src="${recipe.photo}" class="recipe-image" alt="${recipe.name}">` :
                        `<div class="recipe-image" style="background: linear-gradient(145deg, ${recipe.color}30, ${recipe.color}70); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-palette" style="font-size: 60px; color: ${recipe.color};"></i>
                        </div>`}
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div>
                                <h3 class="recipe-title">${recipe.name}</h3>
                                <span class="recipe-category">${recipe.category}</span>
                            </div>
                            <div class="recipe-select-container">
                                <input type="checkbox" class="recipe-select" value="${recipe.id}" ${selectedRecipes.includes(recipe.id) ? 'checked' : ''}>
                                <span>${SICOMIX.i18n.t('select')}</span>
                            </div>
                        </div>
                        <p class="recipe-description">${recipe.description || SICOMIX.i18n.t('no_description')}</p>
                        <div class="recipe-meta">
                            <div><span style="font-size:12px;color:var(--gray);">${SICOMIX.i18n.t('ingredients_count')}</span><br><strong>${recipe.ingredients.length}</strong></div>
                            <div><span style="font-size:12px;color:var(--gray);">${SICOMIX.i18n.t('total_weight')}</span><br><strong>${totalAmount} г</strong></div>
                            <div><span style="font-size:12px;color:var(--gray);">${SICOMIX.i18n.t('date')}</span><br><strong>${recipe.date}</strong></div>
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="SICOMIX.app.editRecipe('${recipe.id}')"><i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}</button>
                            <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="SICOMIX.app.deleteRecipe('${recipe.id}')"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>
                            <button class="recipe-btn" style="background: var(--success); color: white;" onclick="SICOMIX.app.exportRecipe('${recipe.id}')"><i class="fas fa-download"></i> ${SICOMIX.i18n.t('export')}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('') : `<p style="text-align: center; color: var(--gray); padding: 40px;">${SICOMIX.i18n.t('no_recipes')}</p>`;
        updateRecipeSelection();
        const recipeSearchInput = document.getElementById('recipeSearch');
        const recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
        if (recipeSearchInput) recipeSearchInput.addEventListener('input', SICOMIX.utils.debounce(renderRecipes, 300));
        if (recipeCategoryFilter) recipeCategoryFilter.addEventListener('change', renderRecipes);
    }

    function updateRecipeSelection() {
        const checkboxes = recipesContainer.querySelectorAll('.recipe-select');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const recipeId = this.value;
                if (this.checked) { if (!selectedRecipes.includes(recipeId)) selectedRecipes.push(recipeId); }
                else selectedRecipes = selectedRecipes.filter(id => id !== recipeId);
            });
        });
    }

    function deleteRecipe(id) {
        showConfirmation(SICOMIX.i18n.t('delete_recipe'), SICOMIX.i18n.t('delete_recipe_confirmation'), () => {
            recipes = recipes.filter(recipe => recipe.id !== id);
            selectedRecipes = selectedRecipes.filter(rid => rid !== id);
            saveData();
            renderRecipes();
            showNotification(SICOMIX.i18n.t('recipe_deleted'));
        });
    }

    function deleteSelectedRecipes() {
        if (selectedRecipes.length === 0) { showNotification(SICOMIX.i18n.t('select_recipes_to_delete'), 'warning'); return; }
        showConfirmation(SICOMIX.i18n.t('delete_recipes'), `${SICOMIX.i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}?`, () => {
            recipes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id));
            selectedRecipes = [];
            saveData();
            renderRecipes();
            showNotification(`${SICOMIX.i18n.t('deleted')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}`);
        });
    }

    function exportRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        SICOMIX.utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
        showNotification(`${SICOMIX.i18n.t('recipe_exported')} "${recipe.name}"`);
    }

    function exportAllRecipes() {
        if (recipes.length === 0) { showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning'); return; }
        SICOMIX.utils.exportToFile(recipes, `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`);
        showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`);
    }

    function importRecipes() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json,.csv';
        fileInput.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = event => {
                try {
                    let importedRecipes;
                    if (file.name.endsWith('.csv')) {
                        const csvText = event.target.result;
                        const lines = csvText.split('\n');
                        const headers = lines[0].split(',');
                        importedRecipes = lines.slice(1).map(line => {
                            const values = line.split(',');
                            const recipe = {};
                            headers.forEach((header, index) => recipe[header.trim()] = values[index] ? values[index].trim() : '');
                            return recipe;
                        }).filter(r => r.name);
                    } else {
                        importedRecipes = JSON.parse(event.target.result);
                    }
                    if (!Array.isArray(importedRecipes)) { showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error'); return; }
                    showConfirmation(SICOMIX.i18n.t('import_recipes'), `${SICOMIX.i18n.t('found_recipes')} ${importedRecipes.length}. ${SICOMIX.i18n.t('import_confirm')}`, () => {
                        importedRecipes.forEach(recipe => { recipe.id = SICOMIX.utils.generateId(); recipes.push(recipe); });
                        saveData();
                        renderRecipes();
                        showNotification(`${SICOMIX.i18n.t('imported')} ${importedRecipes.length} ${SICOMIX.i18n.t('recipes')}`);
                    });
                } catch (error) {
                    console.error('Import error:', error);
                    showNotification(SICOMIX.i18n.t('file_read_error'), 'error');
                }
            };
            reader.readAsText(file);
        };
        fileInput.click();
    }

    function printRecipes() {
        // залишається без змін (див. оригінал)
    }

    // ========== КАТАЛОГ ФАРБ ==========
    function renderPaintCatalog() {
        if (!paintCatalogElement) return;
        const searchTerm = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
        let filtered = paintCatalog;
        if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || (p.category && p.category.toLowerCase().includes(searchTerm)));
        paintCatalogElement.innerHTML = filtered.length ? filtered.map(paint => `
            <div class="recipe-card">
                <div class="recipe-image" style="background: ${paint.color};"></div>
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div><h3 class="recipe-title">${paint.name}</h3><span class="recipe-category">${paint.category}</span></div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                            <div><span style="font-size:12px;color:var(--gray);">${SICOMIX.i18n.t('manufacturer')}</span><br><strong>${paint.manufacturer || 'SICO'}</strong></div>
                            <div><span style="font-size:12px;color:var(--gray);">${SICOMIX.i18n.t('article')}</span><br><strong>${paint.article || '—'}</strong></div>
                        </div>
                        <div style="font-size: 14px; color: var(--gray);">${paint.description || SICOMIX.i18n.t('no_description')}</div>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="SICOMIX.app.editPaint('${paint.id}')"><i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}</button>
                        <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="SICOMIX.app.deletePaint('${paint.id}')"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>
                    </div>
                </div>
            </div>
        `).join('') : `<p style="text-align: center; color: var(--gray); padding: 40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
        updatePaintCount();
        const catalogSearchInput = document.getElementById('catalogSearch');
        if (catalogSearchInput) catalogSearchInput.addEventListener('input', SICOMIX.utils.debounce(renderPaintCatalog, 300));
    }

    function addNewPaint() {
        document.getElementById('paintName').value = '';
        document.getElementById('paintCategory').value = '';
        document.getElementById('paintDescription').value = '';
        document.getElementById('paintManufacturer').value = 'SICO';
        document.getElementById('paintArticle').value = '';
        if (addPaintModal) {
            addPaintModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function saveNewPaint() {
        const name = document.getElementById('paintName').value.trim();
        const category = document.getElementById('paintCategory').value;
        const description = document.getElementById('paintDescription').value.trim();
        const manufacturer = document.getElementById('paintManufacturer').value.trim() || 'SICO';
        const article = document.getElementById('paintArticle').value.trim();
        if (!name || !category) {
            showNotification('Будь ласка, заповніть обов\'язкові поля', 'error');
            return;
        }
        // Автоматична генерація кольору на основі категорії
        const color = SICOMIX.utils.generateColorFromCategory(category, name);
        const newPaint = {
            id: SICOMIX.utils.generateId(),
            name, category, color, description,
            manufacturer, article: article || ''
        };
        paintCatalog.push(newPaint);
        saveData();
        if (addPaintModal) {
            addPaintModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        renderPaintCatalog();
        showNotification(`${SICOMIX.i18n.t('paint_added')} "${name}"`);
    }

    function deletePaint(id) {
        showConfirmation(SICOMIX.i18n.t('delete_paint'), SICOMIX.i18n.t('delete_paint_confirmation'), () => {
            paintCatalog = paintCatalog.filter(paint => paint.id !== id);
            saveData();
            renderPaintCatalog();
            showNotification(SICOMIX.i18n.t('paint_deleted'));
        });
    }

    function updatePaintCount() {
        const count = paintCatalog.length;
        if (totalPaintsElement) totalPaintsElement.textContent = count;
        if (headerPaintCount) headerPaintCount.textContent = count;
    }

    // ========== НАЛАШТУВАННЯ ==========
    function saveSettings() {
        currentSettings = {
            language: languageSelect ? languageSelect.value : 'uk',
            units: unitsSelect ? unitsSelect.value : 'grams',
            autoSave: autoSaveCheckbox ? autoSaveCheckbox.checked : true,
            backup: backupCheckbox ? backupCheckbox.checked : false,
            theme: currentSettings.theme || 'light',
            notifications: currentSettings.notifications !== false,
            defaultCategory: currentSettings.defaultCategory || 'Металік',
            defaultUnit: currentSettings.defaultUnit || 'г',
            calculationsPrecision: currentSettings.calculationsPrecision || 2
        };
        saveData();
        showNotification('Налаштування збережено', 'success');
        if (languageSelect && SICOMIX.i18n.getLanguage() !== languageSelect.value) {
            SICOMIX.i18n.setLanguage(languageSelect.value);
            location.reload();
        }
    }

    function resetSettings() {
        showConfirmation('Скидання налаштувань', 'Ви впевнені, що хочете скинути всі налаштування до стандартних?', () => {
            currentSettings = SICOMIX.data.defaultSettings;
            saveData();
            initSettings();
            showNotification('Налаштування скинуті до стандартних', 'success');
        });
    }

    function clearAllData() {
        showConfirmation('Очищення всіх даних', 'УВАГА! Ця дія видалить всі рецепти та фарби. Дія незворотна. Продовжити?', () => {
            recipes = [];
            paintCatalog = [];
            selectedIngredients = [];
            selectedRecipes = [];
            saveData();
            renderRecipes();
            renderPaintCatalog();
            showNotification('Всі дані видалено', 'success');
        });
    }

    // ========== РЕДАГУВАННЯ РЕЦЕПТІВ ==========
    function editRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeDescription').value = recipe.description || '';
        selectedIngredients = [...recipe.ingredients];
        renderIngredientsList();
        isEditingRecipe = true;
        editingRecipeId = id;
        if (saveRecipeBtn) {
            saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe">Оновити рецепт</span>`;
            SICOMIX.i18n.applyTranslations();
        }
        switchPage('new-recipe');
        showNotification(`Рецепт "${recipe.name}" завантажено для редагування`, 'info');
    }

    function editPaint(id) {
        showNotification(SICOMIX.i18n.t('feature_in_development'), 'info');
    }

    // ========== УТІЛІТИ ==========
    function showNotification(message, type = 'success', duration = 3000) {
        SICOMIX.utils.showNotification(message, type, duration);
    }
    function showConfirmation(title, message, onConfirm, onCancel = null) {
        SICOMIX.utils.showConfirmation(title, message, onConfirm, onCancel);
    }

    // ========== НАЛАШТУВАННЯ ПОДІЙ ==========
    function setupEventListeners() {
        setupNavigation();
        // File upload
        const recipePhotoInput = document.getElementById('recipePhoto');
        if (recipePhotoInput) {
            recipePhotoInput.addEventListener('change', function() {
                const fileName = this.files[0]?.name || SICOMIX.i18n.t('upload_photo');
                const fileNameElement = document.getElementById('fileName');
                if (fileNameElement) fileNameElement.textContent = fileName;
            });
        }
        // New recipe buttons
        if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
        if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
        if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
        if (calculatePercentagesBtn) calculatePercentagesBtn.addEventListener('click', calculatePercentages);
        // Recipes page buttons
        if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
        if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
        if (printRecipesBtn) printRecipesBtn.addEventListener('click', printRecipes);
        if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);
        // Catalog page buttons
        if (addNewPaintBtn) addNewPaintBtn.addEventListener('click', addNewPaint);
        // Paint modal buttons
        if (closePaintModal) closePaintModal.addEventListener('click', () => { addPaintModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
        if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', () => { addPaintModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
        if (savePaintBtn) savePaintBtn.addEventListener('click', saveNewPaint);
        // Search functionality
        if (paintSearch) paintSearch.addEventListener('input', SICOMIX.utils.debounce(renderIngredientsList, 300));
        if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);
        // Language selector
        if (languageSelect) languageSelect.addEventListener('change', function() { currentSettings.language = this.value; saveData(); });
        // Settings buttons
        if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
        if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
        if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);
        // Resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); if (saveRecipeBtn) saveRecipeBtn.click(); }
            if (e.key === 'Escape') {
                if (sidebar && sidebar.classList.contains('active') && window.innerWidth <= 992) { sidebar.classList.remove('active'); mainContainer.classList.remove('sidebar-open'); document.body.style.overflow = 'auto'; }
                if (addPaintModal && addPaintModal.classList.contains('active')) { addPaintModal.classList.remove('active'); document.body.style.overflow = 'auto'; }
                if (confirmationModal && confirmationModal.classList.contains('active')) confirmationModal.classList.remove('active');
            }
        });
    }

    function loadRecipes() { console.log(`Завантажено ${recipes.length} рецептів`); }

    return {
        init: initApp,
        deleteRecipe, exportRecipe, editRecipe,
        deletePaint, editPaint,
        showNotification, showConfirmation
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    SICOMIX.i18n.init();
    SICOMIX.app.init();
    window.exportRecipe = SICOMIX.app.exportRecipe;
    window.editPaint = SICOMIX.app.editPaint;
    window.deletePaint = SICOMIX.app.deletePaint;
});
window.SICOMIX = SICOMIX;
