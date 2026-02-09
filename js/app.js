// ========== ОСНОВНА ЛОГІКА ДОДАТКУ ==========

const SICOMIX = window.SICOMIX || {};

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
    let colorPreview, recipeColor, ingredientsList, paintSearch, categoryFilter;
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
        
        // Автоматичне відкриття бокової панелі на десктопах
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
        if (languageSelect) {
            languageSelect.value = savedLang;
        }
        SICOMIX.i18n.setLanguage(savedLang);
    }

    function initSettings() {
        if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
        if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
        if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
    }

    // ========== НАВІГАЦІЯ ==========
    function setupNavigation() {
        // Mobile menu toggle
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

        // Закривати бокову панель при кліку поза нею (тільки на мобільних)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
                
                // На мобільних закриваємо бокову панель після вибору пункту меню
                if (window.innerWidth <= 992) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Action cards
        actionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
            });
        });
    }

    function switchPage(pageId) {
        // Скинути режим редагування при зміні сторінки
        if (isEditingRecipe && pageId !== 'new-recipe') {
            resetEditMode();
        }
        
        // Hide all pages
        pageContents.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.classList.add('active');
            
            // Update page specific data
            if (pageId === 'recipes') {
                renderRecipes();
            } else if (pageId === 'catalog') {
                renderPaintCatalog();
            } else if (pageId === 'new-recipe' && !isEditingRecipe) {
                clearRecipeForm();
            }
        }
        
        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }

    // ========== НОВИЙ РЕЦЕПТ ==========
    function renderIngredientsList() {
        if (!ingredientsList) return;
        
        ingredientsList.innerHTML = '';
        
        if (selectedIngredients.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--gray);">
                    <i class="fas fa-paint-brush" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
                    <span>${SICOMIX.i18n.t('paints_not_found')}</span>
                </td>
            `;
            ingredientsList.appendChild(emptyRow);
            return;
        }
        
        selectedIngredients.forEach((ingredient, index) => {
            const paint = paintCatalog.find(p => p.id === ingredient.paintId);
            if (!paint) return;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: ${paint.color}; border-radius: 4px; border: 1px solid var(--light-gray);"></div>
                        <div>
                            <div style="font-weight: 600;">${paint.name}</div>
                            <div style="font-size: 12px; color: var(--gray);">${paint.category}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" class="input-small" value="${ingredient.amount}" 
                           data-index="${index}" data-field="amount" min="0" step="0.1">
                </td>
                <td>
                    <select class="unit-select" data-index="${index}" data-field="unit">
                        <option value="г" ${ingredient.unit === 'г' ? 'selected' : ''}>г</option>
                        <option value="кг" ${ingredient.unit === 'кг' ? 'selected' : ''}>кг</option>
                        <option value="мл" ${ingredient.unit === 'мл' ? 'selected' : ''}>мл</option>
                        <option value="л" ${ingredient.unit === 'л' ? 'selected' : ''}>л</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="input-small" value="${ingredient.percentage || 0}" 
                           data-index="${index}" data-field="percentage" min="0" max="100" step="0.1" readonly>
                    <span style="margin-left: 5px;">%</span>
                </td>
                <td>
                    <button class="btn-icon delete-ingredient" data-index="${index}" title="${SICOMIX.i18n.t('delete')}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            ingredientsList.appendChild(row);
        });

        // Add event listeners
        ingredientsList.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', handleIngredientChange);
            input.addEventListener('input', handleIngredientChange);
        });

        ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteIngredient(index);
            });
        });
    }

    function handleIngredientChange(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        const field = e.target.getAttribute('data-field');
        const value = e.target.value;
        
        if (index >= 0 && index < selectedIngredients.length) {
            selectedIngredients[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
            
            // If amount changed, recalculate percentages
            if (field === 'amount') {
                calculatePercentages();
            }
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
        
        if (category) {
            filteredPaints = filteredPaints.filter(paint => paint.category === category);
        }
        
        if (filteredPaints.length === 0) {
            showNotification(SICOMIX.i18n.t('paints_not_found'), 'error');
            return;
        }
        
        // Show paint selection modal
        showPaintSelection(filteredPaints);
    }

    function showPaintSelection(paints) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">${SICOMIX.i18n.t('select_paint')}</h3>
                    <button class="modal-close close-paint-selection">&times;</button>
                </div>
                <div style="max-height: 400px; overflow-y: auto;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; padding: 10px;">
                        ${paints.map(paint => `
                            <div class="paint-selection-card" data-id="${paint.id}" 
                                 style="padding: 15px; border: 2px solid var(--light-gray); border-radius: var(--border-radius); cursor: pointer; transition: all 0.3s ease;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="width: 30px; height: 30px; background: ${paint.color}; border-radius: 6px; border: 1px solid var(--light-gray);"></div>
                                    <div style="font-weight: 600;">${paint.name}</div>
                                </div>
                                <div style="font-size: 12px; color: var(--gray);">
                                    ${paint.category} • ${paint.manufacturer || 'SICO'}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.close-paint-selection').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelectorAll('.paint-selection-card').forEach(card => {
            card.addEventListener('click', function() {
                const paintId = parseInt(this.getAttribute('data-id'));
                
                // Check if paint already added
                if (selectedIngredients.some(ing => ing.paintId === paintId)) {
                    showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                    return;
                }
                
                selectedIngredients.push({
                    paintId: paintId,
                    amount: 100,
                    unit: 'г',
                    percentage: 0
                });
                
                calculatePercentages();
                renderIngredientsList();
                document.body.removeChild(modal);
                showNotification(SICOMIX.i18n.t('paint_added_to_recipe'));
            });
        });
        
        // Закривати по Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
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
        const color = document.getElementById('recipeColor').value;
        const description = document.getElementById('recipeDescription').value.trim();
        
        if (!name || !category || selectedIngredients.length === 0) {
            showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
            return;
        }
        
        if (isEditingRecipe && editingRecipeId) {
            // Оновити існуючий рецепт
            const index = recipes.findIndex(r => r.id === editingRecipeId);
            if (index !== -1) {
                recipes[index] = {
                    ...recipes[index],
                    name,
                    category,
                    color,
                    description,
                    ingredients: [...selectedIngredients],
                    date: new Date().toLocaleDateString('uk-UA')
                };
                
                saveData();
                showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`);
                resetEditMode();
            }
        } else {
            // Створити новий рецепт
            const newRecipe = {
                id: SICOMIX.utils.generateId(),
                name,
                category,
                color,
                description,
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
        if (document.getElementById('recipeName')) {
            document.getElementById('recipeName').value = '';
        }
        if (document.getElementById('recipeCategory')) {
            document.getElementById('recipeCategory').value = '';
        }
        if (recipeColor && colorPreview) {
            recipeColor.value = '#4361ee';
            colorPreview.style.background = '#4361ee';
        }
        if (document.getElementById('recipeDescription')) {
            document.getElementById('recipeDescription').value = '';
        }
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
        
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) ||
                (recipe.description && recipe.description.toLowerCase().includes(searchTerm))
            );
        }
        
        if (category) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
        }
        
        recipesContainer.innerHTML = filteredRecipes.length > 0 ? filteredRecipes.map(recipe => {
            const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            
            return `
                <div class="recipe-card" data-id="${recipe.id}">
                    ${recipe.photo ? 
                        `<img src="${recipe.photo}" class="recipe-image" alt="${recipe.name}">` :
                        `<div class="recipe-image" style="background: linear-gradient(135deg, ${recipe.color}30, ${recipe.color}60); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-palette" style="font-size: 60px; color: ${recipe.color};"></i>
                        </div>`
                    }
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div>
                                <h3 class="recipe-title">${recipe.name}</h3>
                                <span class="recipe-category">${recipe.category}</span>
                            </div>
                            <div class="recipe-select-container">
                                <input type="checkbox" class="recipe-select" value="${recipe.id}" 
                                       ${selectedRecipes.includes(recipe.id) ? 'checked' : ''}>
                                <span>${SICOMIX.i18n.t('select')}</span>
                            </div>
                        </div>
                        <p class="recipe-description">${recipe.description || SICOMIX.i18n.t('no_description')}</p>
                        <div class="recipe-meta">
                            <div>
                                <div style="font-size: 12px; color: var(--gray);">${SICOMIX.i18n.t('ingredients_count')}</div>
                                <div style="font-weight: 600;">${recipe.ingredients.length}</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--gray);">${SICOMIX.i18n.t('total_weight')}</div>
                                <div style="font-weight: 600;">${totalAmount} г</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--gray);">${SICOMIX.i18n.t('date')}</div>
                                <div style="font-weight: 600;">${recipe.date}</div>
                            </div>
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn" style="background: var(--primary); color: white;" 
                                    onclick="SICOMIX.app.editRecipe(${recipe.id})">
                                <i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}
                            </button>
                            <button class="recipe-btn" style="background: var(--danger); color: white;" 
                                    onclick="SICOMIX.app.deleteRecipe(${recipe.id})">
                                <i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}
                            </button>
                            <button class="recipe-btn" style="background: var(--success); color: white;" 
                                    onclick="SICOMIX.app.exportRecipe(${recipe.id})">
                                <i class="fas fa-download"></i> ${SICOMIX.i18n.t('export')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('') : `<p style="text-align: center; color: var(--gray); padding: 40px;">${SICOMIX.i18n.t('no_recipes')}</p>`;
        
        // Update recipe selection
        updateRecipeSelection();
        
        // Додати обробники подій для пошуку
        const recipeSearchInput = document.getElementById('recipeSearch');
        const recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
        
        if (recipeSearchInput) {
            recipeSearchInput.addEventListener('input', SICOMIX.utils.debounce(renderRecipes, 300));
        }
        
        if (recipeCategoryFilter) {
            recipeCategoryFilter.addEventListener('change', renderRecipes);
        }
    }

    function updateRecipeSelection() {
        const checkboxes = recipesContainer.querySelectorAll('.recipe-select');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const recipeId = parseInt(this.value);
                
                if (this.checked) {
                    if (!selectedRecipes.includes(recipeId)) {
                        selectedRecipes.push(recipeId);
                    }
                } else {
                    selectedRecipes = selectedRecipes.filter(id => id !== recipeId);
                }
            });
        });
    }

    function deleteRecipe(id) {
        showConfirmation(
            SICOMIX.i18n.t('delete_recipe'),
            SICOMIX.i18n.t('delete_recipe_confirmation'),
            () => {
                recipes = recipes.filter(recipe => recipe.id !== id);
                selectedRecipes = selectedRecipes.filter(recipeId => recipeId !== id);
                saveData();
                renderRecipes();
                showNotification(SICOMIX.i18n.t('recipe_deleted'));
            }
        );
    }

    function deleteSelectedRecipes() {
        if (selectedRecipes.length === 0) {
            showNotification(SICOMIX.i18n.t('select_recipes_to_delete'), 'warning');
            return;
        }
        
        showConfirmation(
            SICOMIX.i18n.t('delete_recipes'),
            `${SICOMIX.i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}?`,
            () => {
                recipes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id));
                selectedRecipes = [];
                saveData();
                renderRecipes();
                showNotification(`${SICOMIX.i18n.t('deleted')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}`);
            }
        );
    }

    function exportRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        
        SICOMIX.utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
        showNotification(`${SICOMIX.i18n.t('recipe_exported')} "${recipe.name}"`);
    }

    function exportAllRecipes() {
        if (recipes.length === 0) {
            showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        
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
                        // Обробка CSV (спрощено)
                        const csvText = event.target.result;
                        const lines = csvText.split('\n');
                        const headers = lines[0].split(',');
                        
                        importedRecipes = lines.slice(1).map(line => {
                            const values = line.split(',');
                            const recipe = {};
                            headers.forEach((header, index) => {
                                recipe[header.trim()] = values[index] ? values[index].trim() : '';
                            });
                            return recipe;
                        }).filter(recipe => recipe.name);
                    } else {
                        // Обробка JSON
                        importedRecipes = JSON.parse(event.target.result);
                    }
                    
                    if (!Array.isArray(importedRecipes)) {
                        showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                        return;
                    }
                    
                    showConfirmation(
                        SICOMIX.i18n.t('import_recipes'),
                        `${SICOMIX.i18n.t('found_recipes')} ${importedRecipes.length}. ${SICOMIX.i18n.t('import_confirm')}`,
                        () => {
                            importedRecipes.forEach(recipe => {
                                recipe.id = SICOMIX.utils.generateId();
                                recipes.push(recipe);
                            });
                            
                            saveData();
                            renderRecipes();
                            showNotification(`${SICOMIX.i18n.t('imported')} ${importedRecipes.length} ${SICOMIX.i18n.t('recipes')}`);
                        }
                    );
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
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${SICOMIX.i18n.t('print_recipes')} SICO MIX</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #4361ee; }
                    .recipe { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f5f5f5; }
                </style>
            </head>
            <body>
                <h1>${SICOMIX.i18n.t('recipes')} SICO MIX</h1>
                <p>${SICOMIX.i18n.t('print_date')}: ${new Date().toLocaleDateString('uk-UA')}</p>
                <hr>
                ${recipes.map(recipe => {
                    const ingredientsHTML = recipe.ingredients.map(ing => {
                        const paint = paintCatalog.find(p => p.id === ing.paintId);
                        return `
                            <tr>
                                <td>${paint ? paint.name : SICOMIX.i18n.t('unknown')}</td>
                                <td>${ing.amount} ${ing.unit}</td>
                                <td>${ing.percentage || 0}%</td>
                            </tr>
                        `;
                    }).join('');
                    
                    return `
                        <div class="recipe">
                            <h2>${recipe.name}</h2>
                            <p><strong>${SICOMIX.i18n.t('category')}:</strong> ${recipe.category}</p>
                            <p><strong>${SICOMIX.i18n.t('creation_date')}:</strong> ${recipe.date}</p>
                            <p><strong>${SICOMIX.i18n.t('description')}:</strong> ${recipe.description || '—'}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>${SICOMIX.i18n.t('paint')}</th>
                                        <th>${SICOMIX.i18n.t('quantity')}</th>
                                        <th>${SICOMIX.i18n.t('percentage')}</th>
                                    </tr>
                                </thead>
                                <tbody>${ingredientsHTML}</tbody>
                            </table>
                        </div>
                    `;
                }).join('')}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    // ========== КАТАЛОГ ФАРБ ==========
    function renderPaintCatalog() {
        if (!paintCatalogElement) return;
        
        paintCatalogElement.innerHTML = paintCatalog.length > 0 ? paintCatalog.map(paint => `
            <div class="recipe-card">
                <div class="recipe-image" style="background: ${paint.color};"></div>
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div>
                            <h3 class="recipe-title">${paint.name}</h3>
                            <span class="recipe-category">${paint.category}</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                            <div>
                                <div style="font-size: 12px; color: var(--gray);">${SICOMIX.i18n.t('manufacturer')}</div>
                                <div style="font-weight: 600;">${paint.manufacturer || 'SICO'}</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: var(--gray);">${SICOMIX.i18n.t('article')}</div>
                                <div style="font-weight: 600;">${paint.article || '—'}</div>
                            </div>
                        </div>
                        <div style="font-size: 14px; color: var(--gray); line-height: 1.5;">
                            ${paint.description || SICOMIX.i18n.t('no_description')}
                        </div>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="SICOM
