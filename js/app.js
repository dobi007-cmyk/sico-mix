// ========== ОСНОВНА ЛОГІКА ДОДАТКУ ==========

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
    let currentLanguage = 'uk';

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
        initCatalogFilters();
        renderPaintCatalog();
        loadRecipes();
        renderIngredientsList();
        
        // Автоматичне відкриття бокової панелі на десктопах
        if (window.innerWidth > 992) {
            sidebar.classList.add('active');
            mainContainer.classList.add('sidebar-open');
        }
        
        showNotification('SICO MIX завантажено! Готовий до роботи.', 'success', 2000);
        
        // Ініціалізація темної теми
        initTheme();
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
        
        // Якщо каталог порожній, завантажуємо згенеровані дані
        if (paintCatalog.length === 0 && SICOMIX.data.generatePaintsFromBaseColors) {
            paintCatalog = SICOMIX.data.initialData.paints;
            SICOMIX.utils.saveToLocalStorage('sicoMixPaints', paintCatalog);
        }
    }

    function saveData() {
        SICOMIX.utils.saveToLocalStorage('sicoMixRecipes', recipes);
        SICOMIX.utils.saveToLocalStorage('sicoMixPaints', paintCatalog);
        SICOMIX.utils.saveToLocalStorage('sicoMixSettings', currentSettings);
    }

    function initLanguage() {
        const savedLang = localStorage.getItem('sicoMixLanguage') || 'uk';
        currentLanguage = savedLang;
        if (languageSelect) {
            languageSelect.value = savedLang;
        }
        SICOMIX.i18n.setLanguage(savedLang);
    }

    function initSettings() {
        if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
        if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
        if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
        
        // Застосування теми
        if (currentSettings.theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    function initCatalogFilters() {
        // Отримуємо унікальні категорії з каталогу фарб
        const categories = [...new Set(paintCatalog.map(paint => paint.category))].sort();
        
        // Заповнюємо фільтр категорій для рецептів
        const recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
        if (recipeCategoryFilter) {
            const baseHtml = '<option value="" data-i18n="all_categories">Всі категорії</option>';
            recipeCategoryFilter.innerHTML = baseHtml + categories.map(cat => 
                `<option value="${cat}">${cat}</option>`
            ).join('');
        }
        
        // Заповнюємо фільтр категорій для фарб
        const paintCategoryFilter = document.getElementById('categoryFilter');
        if (paintCategoryFilter) {
            const baseHtml = '<option value="" data-i18n="all_categories">Всі категорії</option>';
            paintCategoryFilter.innerHTML = baseHtml + categories.map(cat => 
                `<option value="${cat}">${cat}</option>`
            ).join('');
        }
        
        // Оновлюємо переклади
        SICOMIX.i18n.applyTranslations();
    }

    function initTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = currentSettings.theme;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-theme');
            currentSettings.theme = 'dark';
        } else {
            document.body.classList.remove('dark-theme');
            currentSettings.theme = 'light';
        }
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

            const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: ${paint.color}; border-radius: 4px; border: 1px solid var(--light-gray);"></div>
                        <div>
                            <div style="font-weight: 600;">${paint.searchName || paint.name} ${colorName ? `- ${colorName}` : ''}</div>
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
        const searchTerm = paintSearch.value.trim().toUpperCase();
        const category = categoryFilter.value;
        
        let filteredPaints = paintCatalog;
        
        if (searchTerm) {
            // Пошук за серією та номером (EC91), назвою кольору, серією, кодом кольору
            filteredPaints = filteredPaints.filter(paint => {
                const searchName = paint.searchName || paint.name;
                const colorName = paint.colorName || '';
                const series = paint.series || '';
                const colorCode = paint.colorCode || '';
                
                return searchName.includes(searchTerm) ||
                       colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       series.includes(searchTerm) ||
                       colorCode.includes(searchTerm) ||
                       paint.article.includes(searchTerm);
            });
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
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title">${SICOMIX.i18n.t('select_paint')}</h3>
                    <button class="modal-close close-paint-selection">&times;</button>
                </div>
                <div style="padding: 10px;">
                    <div style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;">
                        <div style="font-weight: 600; color: var(--primary);">Знайдено: ${paints.length} фарб</div>
                    </div>
                    <div style="max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                        ${paints.map(paint => {
                            const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
                            return `
                            <div class="paint-selection-card" data-id="${paint.id}" 
                                 style="padding: 15px; border: 2px solid var(--light-gray); border-radius: var(--border-radius); cursor: pointer; transition: all 0.3s ease; background: white;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <div style="width: 30px; height: 30px; background: ${paint.color}; border-radius: 6px; border: 1px solid var(--light-gray);"></div>
                                    <div>
                                        <div style="font-weight: 600; font-size: 16px;">${paint.searchName || paint.name}</div>
                                        <div style="font-size: 12px; color: var(--gray);">${colorName}</div>
                                    </div>
                                </div>
                                <div style="font-size: 12px; color: var(--gray);">
                                    <div><strong>Серія:</strong> ${paint.series || ''}</div>
                                    <div><strong>Категорія:</strong> ${paint.category}</div>
                                    <div><strong>Артикул:</strong> ${paint.article || ''}</div>
                                </div>
                            </div>
                        `}).join('')}
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
                    updatedAt: new Date().toISOString(),
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
                createdAt: new Date().toISOString(),
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
        if (paintSearch) paintSearch.value = '';
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
        
        // Сортування за датою (нові спочатку)
        filteredRecipes.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date);
            const dateB = new Date(b.createdAt || b.date);
            return dateB - dateA;
        });
        
        recipesContainer.innerHTML = filteredRecipes.length > 0 ? filteredRecipes.map(recipe => {
            const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            const totalPercentage = recipe.ingredients.reduce((sum, ing) => sum + (ing.percentage || 0), 0);
            
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
                                <div style="font-weight: 600;">${totalAmount.toFixed(1)} г</div>
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
        
        // Додаємо інформацію про фарби до експорту
        const recipeWithPaintDetails = {
            ...recipe,
            ingredientsWithDetails: recipe.ingredients.map(ing => {
                const paint = paintCatalog.find(p => p.id === ing.paintId);
                return {
                    ...ing,
                    paintName: paint ? paint.searchName || paint.name : 'Невідомо',
                    paintColor: paint ? paint.color : '#000000',
                    paintCategory: paint ? paint.category : 'Невідомо'
                };
            })
        };
        
        SICOMIX.utils.exportToFile(recipeWithPaintDetails, `${recipe.name.replace(/\s+/g, '_')}_recipe.json`);
        showNotification(`${SICOMIX.i18n.t('recipe_exported')} "${recipe.name}"`);
    }

    function exportAllRecipes() {
        if (recipes.length === 0) {
            showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        
        const exportData = {
            metadata: {
                exportDate: new Date().toISOString(),
                app: "SICO MIX",
                version: "2.2",
                totalRecipes: recipes.length
            },
            recipes: recipes.map(recipe => ({
                ...recipe,
                ingredientsWithDetails: recipe.ingredients.map(ing => {
                    const paint = paintCatalog.find(p => p.id === ing.paintId);
                    return {
                        ...ing,
                        paintName: paint ? paint.searchName || paint.name : 'Невідомо',
                        paintColor: paint ? paint.color : '#000000',
                        paintCategory: paint ? paint.category : 'Невідомо'
                    };
                })
            }))
        };
        
        SICOMIX.utils.exportToFile(exportData, `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`);
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
                        const data = JSON.parse(event.target.result);
                        importedRecipes = data.recipes || data;
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
                                // Генеруємо новий ID та дату
                                const newRecipe = {
                                    ...recipe,
                                    id: SICOMIX.utils.generateId(),
                                    createdAt: new Date().toISOString(),
                                    date: new Date().toLocaleDateString('uk-UA')
                                };
                                
                                // Видаляємо деталі фарб, якщо вони є
                                delete newRecipe.ingredientsWithDetails;
                                
                                recipes.push(newRecipe);
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
        if (recipes.length === 0) {
            showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        const today = new Date().toLocaleDateString('uk-UA');
        
        printWindow.document.write(`
            <html>
            <head>
                <title>${SICOMIX.i18n.t('print_recipes')} SICO MIX</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                    h1 { color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 30px; }
                    .recipe { margin-bottom: 40px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background: #f5f5f5; font-weight: bold; }
                    .recipe-header { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px; }
                    .recipe-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
                    .info-item { padding: 8px; background: #e9ecef; border-radius: 4px; }
                    @media print {
                        body { font-size: 12pt; }
                        .recipe { break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <h1>${SICOMIX.i18n.t('recipes')} SICO MIX</h1>
                <p><strong>${SICOMIX.i18n.t('print_date')}:</strong> ${today}</p>
                <p><strong>Всього рецептів:</strong> ${recipes.length}</p>
                <hr>
                ${recipes.map((recipe, index) => {
                    const ingredientsHTML = recipe.ingredients.map(ing => {
                        const paint = paintCatalog.find(p => p.id === ing.paintId);
                        const paintName = paint ? paint.searchName || paint.name : SICOMIX.i18n.t('unknown');
                        return `
                            <tr>
                                <td>${paintName}</td>
                                <td>${ing.amount} ${ing.unit}</td>
                                <td>${ing.percentage || 0}%</td>
                            </tr>
                        `;
                    }).join('');
                    
                    const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
                    
                    return `
                        <div class="recipe">
                            <div class="recipe-header">
                                <h2>${index + 1}. ${recipe.name}</h2>
                            </div>
                            <div class="recipe-info">
                                <div class="info-item"><strong>Категорія:</strong> ${recipe.category}</div>
                                <div class="info-item"><strong>Дата створення:</strong> ${recipe.date}</div>
                                <div class="info-item"><strong>Всього інгредієнтів:</strong> ${recipe.ingredients.length}</div>
                                <div class="info-item"><strong>Загальна вага:</strong> ${totalAmount} г</div>
                            </div>
                            <p><strong>Опис:</strong> ${recipe.description || '—'}</p>
                            <h3>Інгредієнти:</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Фарба</th>
                                        <th>Кількість</th>
                                        <th>Відсоток</th>
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
        printWindow.focus();
        printWindow.print();
    }

    // ========== КАТАЛОГ ФАРБ ==========
    function renderPaintCatalog() {
        if (!paintCatalogElement) return;
        
        const searchTerm = document.getElementById('catalogSearch')?.value.trim().toUpperCase() || '';
        const categoryFilter = document.getElementById('catalogCategoryFilter')?.value || '';
        
        let filteredPaints = paintCatalog;
        
        if (searchTerm) {
            // Розширений пошук по всіх полях
            filteredPaints = filteredPaints.filter(paint => {
                const searchName = paint.searchName || paint.name;
                const colorName = paint.colorName || '';
                const series = paint.series || '';
                const colorCode = paint.colorCode || '';
                const description = paint.description || '';
                
                return searchName.includes(searchTerm) ||
                       colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       series.includes(searchTerm) ||
                       colorCode.includes(searchTerm) ||
                       paint.article.includes(searchTerm) ||
                       description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       paint.category.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }
        
        if (categoryFilter) {
            filteredPaints = filteredPaints.filter(paint => paint.category === categoryFilter);
        }
        
        // Сортування за серією та кодом кольору
        filteredPaints.sort((a, b) => {
            const aSeries = a.series || '';
            const bSeries = b.series || '';
            const aCode = a.colorCode || '';
            const bCode = b.colorCode || '';
            
            if (aSeries !== bSeries) return aSeries.localeCompare(bSeries);
            return aCode.localeCompare(bCode);
        });
        
        paintCatalogElement.innerHTML = filteredPaints.length > 0 ? filteredPaints.map(paint => {
            const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
            const displayName = paint.searchName || paint.name;
            
            return `
                <div class="recipe-card">
                    <div class="recipe-image" style="background: ${paint.color};"></div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <div>
                                <h3 class="recipe-title">${displayName} ${colorName ? `- ${colorName}` : ''}</h3>
                                <span class="recipe-category">${paint.category}</span>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <div style="display: flex; gap: 15px; margin-bottom: 10px; flex-wrap: wrap;">
                                <div>
                                    <div style="font-size: 12px; color: var(--gray);">Серія</div>
                                    <div style="font-weight: 600;">${paint.series || ''}</div>
                                </div>
                                <div>
                                    <div style="font-size: 12px; color: var(--gray);">Код кольору</div>
                                    <div style="font-weight: 600;">${paint.colorCode || ''}</div>
                                </div>
                                <div>
                                    <div style="font-size: 12px; color: var(--gray);">Артикул</div>
                                    <div style="font-weight: 600;">${paint.article || ''}</div>
                                </div>
                            </div>
                            ${paint.description ? `
                                <div style="font-size: 14px; color: var(--gray); line-height: 1.5; margin-top: 10px; padding: 10px; background: var(--light); border-radius: var(--border-radius);">
                                    ${paint.description}
                                </div>
                            ` : ''}
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="SICOMIX.app.showPaintDetails(${paint.id})">
                                <i class="fas fa-info-circle"></i> Деталі
                            </button>
                            <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="SICOMIX.app.deletePaint(${paint.id})">
                                <i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('') : `<p style="text-align: center; color: var(--gray); padding: 40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
        
        updatePaintCount();
    }

    function showPaintDetails(id) {
        const paint = paintCatalog.find(p => p.id === id);
        if (!paint) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">${paint.searchName || paint.name}</h3>
                    <button class="modal-close close-paint-details">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                        <div style="width: 80px; height: 80px; background: ${paint.color}; border-radius: 8px; border: 2px solid var(--light-gray);"></div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--dark);">${paint.colorName || ''}</h4>
                            <p style="margin: 0; color: var(--gray);">${paint.category}</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                        <div style="padding: 10px; background: var(--light); border-radius: 6px;">
                            <div style="font-size: 12px; color: var(--gray);">Серія</div>
                            <div style="font-weight: 600;">${paint.series || ''}</div>
                        </div>
                        <div style="padding: 10px; background: var(--light); border-radius: 6px;">
                            <div style="font-size: 12px; color: var(--gray);">Код кольору</div>
                            <div style="font-weight: 600;">${paint.colorCode || ''}</div>
                        </div>
                        <div style="padding: 10px; background: var(--light); border-radius: 6px;">
                            <div style="font-size: 12px; color: var(--gray);">Артикул</div>
                            <div style="font-weight: 600;">${paint.article || ''}</div>
                        </div>
                        <div style="padding: 10px; background: var(--light); border-radius: 6px;">
                            <div style="font-size: 12px; color: var(--gray);">Виробник</div>
                            <div style="font-weight: 600;">${paint.manufacturer || 'SICO'}</div>
                        </div>
                    </div>
                    
                    ${paint.description ? `
                        <div style="margin-bottom: 20px;">
                            <h4 style="margin-bottom: 10px; color: var(--dark);">Опис</h4>
                            <p style="color: var(--gray); line-height: 1.6;">${paint.description}</p>
                        </div>
                    ` : ''}
                    
                    ${paint.properties ? `
                        <div>
                            <h4 style="margin-bottom: 10px; color: var(--dark);">Характеристики</h4>
                            <div style="background: var(--light); border-radius: 6px; padding: 15px;">
                                ${Object.entries(paint.properties).map(([key, value]) => `
                                    <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                                        <span style="font-weight: 500; color: var(--dark);">${key}:</span>
                                        <span style="color: var(--gray);">${value}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-paint-details').addEventListener('click', () => {
            document.body.removeChild(modal);
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

    function deletePaint(id) {
        showConfirmation(
            SICOMIX.i18n.t('delete_paint'),
            SICOMIX.i18n.t('delete_paint_confirmation'),
            () => {
                paintCatalog = paintCatalog.filter(paint => paint.id !== id);
                saveData();
                renderPaintCatalog();
                initCatalogFilters();
                showNotification(SICOMIX.i18n.t('paint_deleted'));
            }
        );
    }

    function updatePaintCount() {
        const count = paintCatalog.length;
        if (totalPaintsElement) totalPaintsElement.textContent = count;
        if (headerPaintCount) headerPaintCount.textContent = count;
    }

    // ========== НАЛАШТУВАННЯ ==========
    function saveSettings() {
        currentSettings = {
            ...currentSettings,
            language: languageSelect ? languageSelect.value : 'uk',
            units: unitsSelect ? unitsSelect.value : 'grams',
            autoSave: autoSaveCheckbox ? autoSaveCheckbox.checked : true,
            backup: backupCheckbox ? backupCheckbox.checked : false,
            theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        };
        
        saveData();
        showNotification('Налаштування збережено', 'success');
        
        // Apply language change if needed
        if (languageSelect && currentLanguage !== languageSelect.value) {
            currentLanguage = languageSelect.value;
            SICOMIX.i18n.setLanguage(currentLanguage);
            location.reload();
        }
    }

    function resetSettings() {
        showConfirmation(
            'Скидання налаштувань',
            'Ви впевнені, що хочете скинути всі налаштування до стандартних?',
            () => {
                currentSettings = SICOMIX.data.defaultSettings;
                saveData();
                initSettings();
                initLanguage();
                showNotification('Налаштування скинуті до стандартних', 'success');
            }
        );
    }

    function clearAllData() {
        showConfirmation(
            'Очищення всіх даних',
            'УВАГА! Ця дія видалить всі рецепти та фарби. Дія незворотна. Продовжити?',
            () => {
                recipes = [];
                paintCatalog = SICOMIX.data.initialData.paints; // Завантажуємо початкові дані
                selectedIngredients = [];
                selectedRecipes = [];
                saveData();
                renderRecipes();
                renderPaintCatalog();
                initCatalogFilters();
                showNotification('Всі дані видалено, каталог відновлено', 'success');
            }
        );
    }

    // ========== УТІЛІТИ ==========
    function showNotification(message, type = 'success', duration = 3000) {
        SICOMIX.utils.showNotification(message, type, duration);
    }

    function showConfirmation(title, message, onConfirm, onCancel = null) {
        SICOMIX.utils.showConfirmation(title, message, onConfirm, onCancel);
    }

    // ========== РЕДАГУВАННЯ РЕЦЕПТІВ ==========
    function editRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        
        // Заповнити форму редагування
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeColor').value = recipe.color;
        document.getElementById('colorPreview').style.background = recipe.color;
        document.getElementById('recipeDescription').value = recipe.description || '';
        
        // Завантажити інгредієнти
        selectedIngredients = [...recipe.ingredients];
        renderIngredientsList();
        
        // Встановити режим редагування
        isEditingRecipe = true;
        editingRecipeId = id;
        
        // Оновити кнопку збереження
        if (saveRecipeBtn) {
            saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe">Оновити рецепт</span>`;
            SICOMIX.i18n.applyTranslations();
        }
        
        // Перейти на сторінку створення рецепту
        switchPage('new-recipe');
        
        showNotification(`Рецепт "${recipe.name}" завантажено для редагування`, 'info');
    }

    // ========== НАЛАШТУВАННЯ ПОДІЙ ==========
    function setupEventListeners() {
        setupNavigation();
        
        // Color picker
        if (recipeColor && colorPreview) {
            recipeColor.addEventListener('input', function() {
                colorPreview.style.background = this.value;
            });
        }
        
        // File upload
        const recipePhotoInput = document.getElementById('recipePhoto');
        if (recipePhotoInput) {
            recipePhotoInput.addEventListener('change', function() {
                const fileName = this.files[0]?.name || SICOMIX.i18n.t('upload_photo');
                const fileNameElement = document.getElementById('fileName');
                if (fileNameElement) {
                    fileNameElement.textContent = fileName;
                }
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
        if (addNewPaintBtn) addNewPaintBtn.addEventListener('click', () => {
            showNotification('Використовуйте імпорт для додавання нових фарб', 'info');
        });
        
        // Paint modal buttons
        if (closePaintModal) {
            closePaintModal.addEventListener('click', () => {
                if (addPaintModal) {
                    addPaintModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        if (cancelPaintBtn) {
            cancelPaintBtn.addEventListener('click', () => {
                if (addPaintModal) {
                    addPaintModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Search functionality
        if (paintSearch) {
            paintSearch.addEventListener('input', SICOMIX.utils.debounce(() => {
                const searchTerm = paintSearch.value.trim().toUpperCase();
                if (searchTerm) {
                    // Показуємо кількість результатів
                    const filtered = paintCatalog.filter(paint => 
                        (paint.searchName || paint.name).includes(searchTerm) ||
                        (paint.colorName || '').toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    if (filtered.length > 0) {
                        showNotification(`Знайдено ${filtered.length} фарб`, 'info', 1500);
                    }
                }
            }, 500));
        }
        
        if (categoryFilter) categoryFilter.addEventListener('change', () => {
            showNotification('Фільтр застосовано', 'info', 1000);
        });
        
        // Language selector
        if (languageSelect) {
            languageSelect.addEventListener('change', function() {
                const lang = this.value;
                currentSettings.language = lang;
                saveData();
            });
        }
        
        // Settings buttons
        if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
        if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
        if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);
        
        // Catalog search
        const catalogSearch = document.getElementById('catalogSearch');
        if (catalogSearch) {
            catalogSearch.addEventListener('input', SICOMIX.utils.debounce(renderPaintCatalog, 300));
        }
        
        const catalogCategoryFilter = document.getElementById('catalogCategoryFilter');
        if (catalogCategoryFilter) {
            catalogCategoryFilter.addEventListener('change', renderPaintCatalog);
        }
        
        // Resize handler for sidebar
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                // На десктопах закриваємо мобільне меню
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+S - Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (saveRecipeBtn) saveRecipeBtn.click();
            }
            // Ctrl+F - Search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                const activePage = document.querySelector('.page-content.active');
                if (activePage) {
                    const searchInput = activePage.querySelector('input[type="text"]');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            }
            // Escape - Close modals/sidebar
            if (e.key === 'Escape') {
                if (sidebar && sidebar.classList.contains('active') && window.innerWidth <= 992) {
                    sidebar.classList.remove('active');
                    mainContainer.classList.remove('sidebar-open');
                    document.body.style.overflow = 'auto';
                }
                const modals = document.querySelectorAll('.modal.active');
                modals.forEach(modal => {
                    document.body.removeChild(modal);
                });
            }
        });
    }

    // ========== ПУБЛІЧНІ МЕТОДИ ==========
     return {
        init: initApp,
        deleteRecipe: deleteRecipe,
        exportRecipe: exportRecipe,
        editRecipe: editRecipe,
        deletePaint: deletePaint,
        editPaint: editPaint,
        showPaintDetails: showPaintDetails,
        showNotification: showNotification,
        showConfirmation: showConfirmation
    };
})();


// Ініціалізація додатку при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація i18n
    SICOMIX.i18n.init();
    
    // Ініціалізація додатку
    SICOMIX.app.init();
    
    // Додаємо глобальні функції
    window.exportRecipe = SICOMIX.app.exportRecipe;
    window.editRecipe = SICOMIX.app.editRecipe;
    window.deleteRecipe = SICOMIX.app.deleteRecipe;
    window.deletePaint = SICOMIX.app.deletePaint;
    window.showPaintDetails = SICOMIX.app.showPaintDetails;
});

window.SICOMIX = SICOMIX;
