// ========== ОСНОВНА ЛОГІКА ДОДАТКУ ==========
(function() {
    'use strict';
    
    if (!window.SICOMIX) window.SICOMIX = {};

    // ========== КОНФІГУРАЦІЯ ТА КОНСТАНТИ ==========
    const CONFIG = {
        APP_NAME: 'SICO MIX',
        VERSION: '2.2.0',
        STORAGE_KEYS: {
            RECIPES: 'sicoMixRecipes',
            PAINTS: 'sicoMixPaints',
            SETTINGS: 'sicoMixSettings',
            LANGUAGE: 'sicoMixLanguage'
        },
        DEFAULT_SETTINGS: {
            language: 'uk',
            units: 'grams',
            theme: 'light',
            autoSave: true,
            backup: false,
            dateFormat: 'uk',
            numberFormat: 'comma'
        },
        VALIDATION: {
            RECIPE_NAME_MIN: 2,
            RECIPE_NAME_MAX: 100,
            INGREDIENTS_MIN: 1,
            INGREDIENTS_MAX: 50
        }
    };

    // ========== ГОЛОВНИЙ КЛАС ДОДАТКУ ==========
    class SICOApp {
        constructor() {
            this.recipes = [];
            this.paintCatalog = [];
            this.selectedIngredients = [];
            this.selectedRecipes = [];
            this.currentSettings = {};
            this.isEditingRecipe = false;
            this.editingRecipeId = null;
            this.currentLanguage = 'uk';
            this.debounceTimers = {};
            
            this.init();
        }

        // ========== ІНІЦІАЛІЗАЦІЯ ==========
        init() {
            try {
                this.cacheDOMElements();
                this.loadData();
                this.initLanguage();
                this.setupEventListeners();
                this.initSettings();
                this.updatePaintCount();
                this.initCatalogFilters();
                this.renderPaintCatalog();
                this.loadRecipes();
                this.renderIngredientsList();
                
                // Автоматичне відкриття бокової панелі на десктопах
                if (window.innerWidth > 992) {
                    this.sidebar.classList.add('active');
                    this.mainContainer.classList.add('sidebar-open');
                }
                
                this.showNotification('SICO MIX завантажено! Готовий до роботи.', 'success', 2000);
                
                // Ініціалізація темної теми
                this.initTheme();
                
                console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} ініціалізовано`);
            } catch (error) {
                console.error('Помилка ініціалізації додатку:', error);
                this.showNotification('Помилка завантаження додатку', 'error');
            }
        }

        cacheDOMElements() {
            this.elements = {
                sidebar: document.getElementById('sidebar'),
                menuToggle: document.getElementById('menuToggle'),
                desktopMenuToggle: document.getElementById('desktopMenuToggle'),
                closeSidebar: document.getElementById('closeSidebar'),
                mainContainer: document.getElementById('mainContainer'),
                navLinks: document.querySelectorAll('.nav-link'),
                pageContents: document.querySelectorAll('.page-content'),
                totalPaintsElement: document.getElementById('totalPaints'),
                headerPaintCount: document.getElementById('headerPaintCount'),
                colorPreview: document.getElementById('colorPreview'),
                recipeColor: document.getElementById('recipeColor'),
                ingredientsList: document.getElementById('ingredientsList'),
                paintSearch: document.getElementById('paintSearch'),
                categoryFilter: document.getElementById('categoryFilter'),
                addIngredientBtn: document.getElementById('addIngredientBtn'),
                saveRecipeBtn: document.getElementById('saveRecipeBtn'),
                clearRecipeBtn: document.getElementById('clearRecipeBtn'),
                calculatePercentagesBtn: document.getElementById('calculatePercentagesBtn'),
                recipesContainer: document.getElementById('recipesContainer'),
                exportRecipesBtn: document.getElementById('exportRecipesBtn'),
                importRecipesBtn: document.getElementById('importRecipesBtn'),
                printRecipesBtn: document.getElementById('printRecipesBtn'),
                deleteSelectedRecipesBtn: document.getElementById('deleteSelectedRecipesBtn'),
                paintCatalogElement: document.getElementById('paintCatalog'),
                addNewPaintBtn: document.getElementById('addNewPaintBtn'),
                addPaintModal: document.getElementById('addPaintModal'),
                closePaintModal: document.getElementById('closePaintModal'),
                savePaintBtn: document.getElementById('savePaintBtn'),
                cancelPaintBtn: document.getElementById('cancelPaintBtn'),
                confirmationModal: document.getElementById('confirmationModal'),
                confirmationTitle: document.getElementById('confirmationTitle'),
                confirmationMessage: document.getElementById('confirmationMessage'),
                confirmActionBtn: document.getElementById('confirmActionBtn'),
                cancelActionBtn: document.getElementById('cancelActionBtn'),
                closeConfirmationModal: document.getElementById('closeConfirmationModal'),
                actionCards: document.querySelectorAll('.action-card'),
                languageSelect: document.getElementById('languageSelect'),
                unitsSelect: document.getElementById('unitsSelect'),
                autoSaveCheckbox: document.getElementById('autoSaveCheckbox'),
                backupCheckbox: document.getElementById('backupCheckbox'),
                saveSettingsBtn: document.getElementById('saveSettingsBtn'),
                resetSettingsBtn: document.getElementById('resetSettingsBtn'),
                clearAllDataBtn: document.getElementById('clearAllDataBtn'),
                themeToggle: document.getElementById('themeToggle'),
                recipeSearch: document.getElementById('recipeSearch'),
                recipeCategoryFilter: document.getElementById('recipeCategoryFilter'),
                catalogSearch: document.getElementById('catalogSearch'),
                catalogCategoryFilter: document.getElementById('catalogCategoryFilter')
            };
            
            // Створюємо скорочення для частого використання
            this.sidebar = this.elements.sidebar;
            this.menuToggle = this.elements.menuToggle;
            this.mainContainer = this.elements.mainContainer;
        }

        loadData() {
            try {
                this.recipes = SICOMIX.utils.loadFromLocalStorage(
                    CONFIG.STORAGE_KEYS.RECIPES, 
                    SICOMIX.data?.initialData?.recipes || []
                );
                this.paintCatalog = SICOMIX.utils.loadFromLocalStorage(
                    CONFIG.STORAGE_KEYS.PAINTS, 
                    SICOMIX.data?.initialData?.paints || []
                );
                this.currentSettings = SICOMIX.utils.loadFromLocalStorage(
                    CONFIG.STORAGE_KEYS.SETTINGS, 
                    CONFIG.DEFAULT_SETTINGS
                );
                
                // Якщо каталог порожній, завантажуємо згенеровані дані
                if (this.paintCatalog.length === 0 && SICOMIX.data?.generatePaintsFromBaseColors) {
                    this.paintCatalog = SICOMIX.data.initialData.paints;
                    this.saveData();
                }
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
                this.recipes = [];
                this.paintCatalog = SICOMIX.data?.initialData?.paints || [];
                this.currentSettings = CONFIG.DEFAULT_SETTINGS;
            }
        }

        saveData() {
            try {
                SICOMIX.utils.saveToLocalStorage(CONFIG.STORAGE_KEYS.RECIPES, this.recipes);
                SICOMIX.utils.saveToLocalStorage(CONFIG.STORAGE_KEYS.PAINTS, this.paintCatalog);
                SICOMIX.utils.saveToLocalStorage(CONFIG.STORAGE_KEYS.SETTINGS, this.currentSettings);
            } catch (error) {
                console.error('Помилка збереження даних:', error);
                this.showNotification('Помилка збереження даних', 'error');
            }
        }

        initLanguage() {
            try {
                const savedLang = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || 'uk';
                this.currentLanguage = savedLang;
                
                if (this.elements.languageSelect) {
                    this.elements.languageSelect.value = savedLang;
                }
                
                if (SICOMIX.i18n?.setLanguage) {
                    SICOMIX.i18n.setLanguage(savedLang);
                }
            } catch (error) {
                console.error('Помилка ініціалізації мови:', error);
            }
        }

        initSettings() {
            try {
                if (this.elements.unitsSelect) {
                    this.elements.unitsSelect.value = this.currentSettings.units || 'grams';
                }
                if (this.elements.autoSaveCheckbox) {
                    this.elements.autoSaveCheckbox.checked = this.currentSettings.autoSave !== false;
                }
                if (this.elements.backupCheckbox) {
                    this.elements.backupCheckbox.checked = this.currentSettings.backup === true;
                }
                
                // Застосування теми
                if (this.currentSettings.theme === 'dark') {
                    document.body.classList.add('dark-theme');
                }
            } catch (error) {
                console.error('Помилка ініціалізації налаштувань:', error);
            }
        }

        initCatalogFilters() {
            try {
                // Отримуємо унікальні категорії з каталогу фарб
                const categories = [...new Set(this.paintCatalog.map(paint => paint.category))].sort();
                
                // Заповнюємо фільтр категорій для рецептів
                const recipeCategoryFilter = this.elements.recipeCategoryFilter;
                if (recipeCategoryFilter) {
                    const baseHtml = '<option value="" data-i18n="all_categories">Всі категорії</option>';
                    recipeCategoryFilter.innerHTML = baseHtml + categories.map(cat => 
                        `<option value="${cat}">${cat}</option>`
                    ).join('');
                }
                
                // Заповнюємо фільтр категорій для фарб
                const paintCategoryFilter = this.elements.categoryFilter;
                if (paintCategoryFilter) {
                    const baseHtml = '<option value="" data-i18n="all_categories">Всі категорії</option>';
                    paintCategoryFilter.innerHTML = baseHtml + categories.map(cat => 
                        `<option value="${cat}">${cat}</option>`
                    ).join('');
                }
                
                // Оновлюємо переклади
                if (SICOMIX.i18n?.applyTranslations) {
                    SICOMIX.i18n.applyTranslations();
                }
            } catch (error) {
                console.error('Помилка ініціалізації фільтрів:', error);
            }
        }

        initTheme() {
            try {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const savedTheme = this.currentSettings.theme;
                
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.body.classList.add('dark-theme');
                    this.currentSettings.theme = 'dark';
                } else {
                    document.body.classList.remove('dark-theme');
                    this.currentSettings.theme = 'light';
                }
                
                this.saveData();
            } catch (error) {
                console.error('Помилка ініціалізації теми:', error);
            }
        }

        // ========== НАВІГАЦІЯ ==========
        setupNavigation() {
            // Mobile menu toggle
            if (this.menuToggle) {
                this.menuToggle.addEventListener('click', () => this.toggleSidebar());
            }

            if (this.elements.desktopMenuToggle) {
                this.elements.desktopMenuToggle.addEventListener('click', () => this.toggleSidebar());
            }

            if (this.elements.closeSidebar) {
                this.elements.closeSidebar.addEventListener('click', () => this.closeSidebar());
            }

            // Закривати бокову панель при кліку поза нею (тільки на мобільних)
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 992 && this.sidebar.classList.contains('active')) {
                    if (!this.sidebar.contains(e.target) && e.target !== this.menuToggle && !this.menuToggle.contains(e.target)) {
                        this.closeSidebar();
                    }
                }
            });

            // Navigation links
            this.elements.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('data-page');
                    this.switchPage(pageId);
                    
                    // На мобільних закриваємо бокову панель після вибору пункту меню
                    if (window.innerWidth <= 992) {
                        this.closeSidebar();
                    }
                });
            });

            // Action cards
            this.elements.actionCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = card.getAttribute('data-page');
                    this.switchPage(pageId);
                });
            });
        }

        toggleSidebar() {
            if (window.innerWidth <= 992) {
                this.sidebar.classList.toggle('active');
                document.body.style.overflow = this.sidebar.classList.contains('active') ? 'hidden' : 'auto';
            } else {
                this.sidebar.classList.toggle('active');
                this.mainContainer.classList.toggle('sidebar-open');
            }
        }

        closeSidebar() {
            this.sidebar.classList.remove('active');
            this.mainContainer.classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
        }

        switchPage(pageId) {
            try {
                // Скинути режим редагування при зміні сторінки
                if (this.isEditingRecipe && pageId !== 'new-recipe') {
                    this.resetEditMode();
                }
                
                // Hide all pages
                this.elements.pageContents.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show selected page
                const selectedPage = document.getElementById(`${pageId}-page`);
                if (selectedPage) {
                    selectedPage.classList.add('active');
                    
                    // Update page specific data
                    if (pageId === 'recipes') {
                        this.renderRecipes();
                    } else if (pageId === 'catalog') {
                        this.renderPaintCatalog();
                    } else if (pageId === 'new-recipe' && !this.isEditingRecipe) {
                        this.clearRecipeForm();
                    }
                }
                
                // Update active navigation link
                this.elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });
                
                // Оновлюємо title сторінки
                document.title = `${this.getPageTitle(pageId)} - ${CONFIG.APP_NAME}`;
            } catch (error) {
                console.error('Помилка перемикання сторінки:', error);
            }
        }

        getPageTitle(pageId) {
            const titles = {
                'home': 'Головна',
                'new-recipe': 'Новий рецепт',
                'recipes': 'Мої рецепти',
                'catalog': 'Каталог фарб',
                'import': 'Імпорт',
                'export': 'Експорт',
                'settings': 'Налаштування',
                'about': 'Про додаток'
            };
            return titles[pageId] || 'SICO MIX';
        }

        // ========== НОВИЙ РЕЦЕПТ ==========
        renderIngredientsList() {
            try {
                if (!this.elements.ingredientsList) return;
                
                this.elements.ingredientsList.innerHTML = '';
                
                if (this.selectedIngredients.length === 0) {
                    const emptyRow = document.createElement('tr');
                    emptyRow.className = 'empty-ingredients';
                    emptyRow.innerHTML = `
                        <td colspan="5" class="text-center">
                            <i class="fas fa-paint-brush fa-2x"></i>
                            <p>${SICOMIX.i18n?.t?.('no_ingredients') || 'Ще немає інгредієнтів'}</p>
                        </td>
                    `;
                    this.elements.ingredientsList.appendChild(emptyRow);
                    return;
                }
                
                this.selectedIngredients.forEach((ingredient, index) => {
                    const paint = this.paintCatalog.find(p => p.id === ingredient.paintId);
                    if (!paint) return;

                    const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
                    const row = document.createElement('tr');
                    row.className = 'ingredient-row';
                    row.setAttribute('data-index', index);
                    
                    row.innerHTML = `
                        <td>
                            <div class="ingredient-info">
                                <div class="color-preview-small" style="background: ${paint.color}"></div>
                                <div>
                                    <div class="ingredient-name">${paint.searchName || paint.name} ${colorName ? `- ${colorName}` : ''}</div>
                                    <div class="ingredient-category">${paint.category}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm ingredient-amount" 
                                   value="${ingredient.amount}" data-index="${index}" min="0" step="0.1">
                        </td>
                        <td>
                            <select class="form-control form-control-sm ingredient-unit" data-index="${index}">
                                <option value="г" ${ingredient.unit === 'г' ? 'selected' : ''}>г</option>
                                <option value="кг" ${ingredient.unit === 'кг' ? 'selected' : ''}>кг</option>
                                <option value="мл" ${ingredient.unit === 'мл' ? 'selected' : ''}>мл</option>
                                <option value="л" ${ingredient.unit === 'л' ? 'selected' : ''}>л</option>
                            </select>
                        </td>
                        <td>
                            <div class="percentage-display">
                                <input type="number" class="form-control form-control-sm ingredient-percentage" 
                                       value="${ingredient.percentage || 0}" data-index="${index}" readonly>
                                <span class="percentage-symbol">%</span>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-ingredient" 
                                    data-index="${index}" 
                                    title="${SICOMIX.i18n?.t?.('delete') || 'Видалити'}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
                    this.elements.ingredientsList.appendChild(row);
                });

                // Add event listeners
                this.elements.ingredientsList.querySelectorAll('.ingredient-amount').forEach(input => {
                    input.addEventListener('input', (e) => this.handleIngredientChange(e, 'amount'));
                });

                this.elements.ingredientsList.querySelectorAll('.ingredient-unit').forEach(select => {
                    select.addEventListener('change', (e) => this.handleIngredientChange(e, 'unit'));
                });

                this.elements.ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = parseInt(e.currentTarget.getAttribute('data-index'));
                        this.deleteIngredient(index);
                    });
                });
                
                this.updateIngredientsSummary();
            } catch (error) {
                console.error('Помилка рендерингу списку інгредієнтів:', error);
            }
        }

        handleIngredientChange(event, field) {
            try {
                const index = parseInt(event.target.getAttribute('data-index'));
                const value = event.target.value;
                
                if (index >= 0 && index < this.selectedIngredients.length) {
                    if (field === 'amount') {
                        this.selectedIngredients[index][field] = parseFloat(value) || 0;
                        this.calculatePercentages();
                    } else {
                        this.selectedIngredients[index][field] = value;
                    }
                }
            } catch (error) {
                console.error('Помилка зміни інгредієнта:', error);
            }
        }

        updateIngredientsSummary() {
            const totalAmount = this.selectedIngredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            const totalPercentage = this.selectedIngredients.reduce((sum, ing) => sum + (ing.percentage || 0), 0);
            
            const countElement = document.getElementById('ingredientsCount');
            const totalAmountElement = document.getElementById('totalAmount');
            const totalPercentageElement = document.getElementById('totalPercentage');
            
            if (countElement) {
                countElement.textContent = this.selectedIngredients.length;
            }
            if (totalAmountElement) {
                totalAmountElement.textContent = totalAmount.toFixed(1);
            }
            if (totalPercentageElement) {
                totalPercentageElement.textContent = `${totalPercentage.toFixed(1)}%`;
            }
        }

        addIngredient() {
            try {
                const searchTerm = this.elements.paintSearch?.value.trim().toUpperCase() || '';
                const category = this.elements.categoryFilter?.value || '';
                
                let filteredPaints = this.paintCatalog;
                
                if (searchTerm) {
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
                    this.showNotification('Фарби не знайдено', 'error');
                    return;
                }
                
                // Show paint selection modal
                this.showPaintSelection(filteredPaints);
            } catch (error) {
                console.error('Помилка додавання інгредієнта:', error);
                this.showNotification('Помилка додавання інгредієнта', 'error');
            }
        }

        showPaintSelection(paints) {
            try {
                const modal = document.createElement('div');
                modal.className = 'modal active';
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');
                
                modal.innerHTML = `
                    <div class="modal-content" style="max-width: 800px;">
                        <div class="modal-header">
                            <h3 class="modal-title">Оберіть фарбу</h3>
                            <button class="modal-close close-paint-selection" aria-label="Закрити">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="paint-selection-info">
                                <span class="badge badge-info">Знайдено: ${paints.length} фарб</span>
                            </div>
                            <div class="paint-selection-grid">
                                ${paints.map(paint => {
                                    const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
                                    const isSelected = this.selectedIngredients.some(ing => ing.paintId === paint.id);
                                    
                                    return `
                                    <div class="paint-selection-card ${isSelected ? 'selected' : ''}" 
                                         data-id="${paint.id}" 
                                         role="button" 
                                         tabindex="0"
                                         aria-label="Обрати фарбу ${paint.searchName || paint.name}">
                                        <div class="paint-card-header">
                                            <div class="paint-color" style="background: ${paint.color}"></div>
                                            <div>
                                                <div class="paint-name">${paint.searchName || paint.name}</div>
                                                <div class="paint-color-name">${colorName}</div>
                                            </div>
                                        </div>
                                        <div class="paint-card-details">
                                            <div><strong>Серія:</strong> ${paint.series || '—'}</div>
                                            <div><strong>Категорія:</strong> ${paint.category}</div>
                                            <div><strong>Артикул:</strong> ${paint.article || '—'}</div>
                                        </div>
                                        ${isSelected ? '<div class="already-added">Вже додано</div>' : ''}
                                    </div>
                                `}).join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Event listeners
                const closeBtn = modal.querySelector('.close-paint-selection');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                const paintCards = modal.querySelectorAll('.paint-selection-card:not(.selected)');
                paintCards.forEach(card => {
                    card.addEventListener('click', (e) => {
                        if (e.target.closest('.already-added')) return;
                        
                        const paintId = parseInt(card.getAttribute('data-id'));
                        
                        // Check if paint already added
                        if (this.selectedIngredients.some(ing => ing.paintId === paintId)) {
                            this.showNotification('Ця фарба вже додана до рецепту', 'warning');
                            return;
                        }
                        
                        this.selectedIngredients.push({
                            paintId: paintId,
                            amount: 100,
                            unit: 'г',
                            percentage: 0
                        });
                        
                        this.calculatePercentages();
                        this.renderIngredientsList();
                        document.body.removeChild(modal);
                        this.showNotification('Фарбу додано до рецепту');
                    });
                    
                    // Додаємо обробку клавіш
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            card.click();
                        }
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
                
                // Focus trap
                const focusableElements = modal.querySelectorAll('button, .paint-selection-card');
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                firstFocusable.focus();
                
                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusable) {
                                lastFocusable.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusable) {
                                firstFocusable.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Помилка відображення вибору фарб:', error);
            }
        }

        deleteIngredient(index) {
            if (index >= 0 && index < this.selectedIngredients.length) {
                this.selectedIngredients.splice(index, 1);
                this.calculatePercentages();
                this.renderIngredientsList();
                this.showNotification('Інгредієнт видалено');
            }
        }

        calculatePercentages() {
            try {
                this.selectedIngredients = SICOMIX.utils?.calculateIngredientPercentages(this.selectedIngredients) || this.selectedIngredients;
                this.renderIngredientsList();
            } catch (error) {
                console.error('Помилка розрахунку відсотків:', error);
            }
        }

        validateRecipe() {
            const name = document.getElementById('recipeName')?.value.trim() || '';
            const category = document.getElementById('recipeCategory')?.value || '';
            
            const errors = [];
            
            if (!name) {
                errors.push('Введіть назву рецепту');
            } else if (name.length < CONFIG.VALIDATION.RECIPE_NAME_MIN) {
                errors.push(`Назва рецепту має містити щонайменше ${CONFIG.VALIDATION.RECIPE_NAME_MIN} символи`);
            }
            
            if (!category) {
                errors.push('Оберіть категорію рецепту');
            }
            
            if (this.selectedIngredients.length === 0) {
                errors.push('Додайте хоча б один інгредієнт');
            } else if (this.selectedIngredients.length > CONFIG.VALIDATION.INGREDIENTS_MAX) {
                errors.push(`Максимальна кількість інгредієнтів: ${CONFIG.VALIDATION.INGREDIENTS_MAX}`);
            }
            
            return errors;
        }

        saveRecipe() {
            try {
                const errors = this.validateRecipe();
                if (errors.length > 0) {
                    errors.forEach(error => this.showNotification(error, 'error'));
                    return;
                }
                
                const name = document.getElementById('recipeName').value.trim();
                const category = document.getElementById('recipeCategory').value;
                const color = document.getElementById('recipeColor').value;
                const description = document.getElementById('recipeDescription').value.trim();
                
                if (this.isEditingRecipe && this.editingRecipeId) {
                    // Оновити існуючий рецепт
                    const index = this.recipes.findIndex(r => r.id === this.editingRecipeId);
                    if (index !== -1) {
                        this.recipes[index] = {
                            ...this.recipes[index],
                            name,
                            category,
                            color,
                            description,
                            ingredients: [...this.selectedIngredients],
                            updatedAt: new Date().toISOString(),
                            date: new Date().toLocaleDateString('uk-UA')
                        };
                        
                        this.saveData();
                        this.showNotification(`Рецепт "${name}" оновлено`, 'success');
                        this.resetEditMode();
                    }
                } else {
                    // Створити новий рецепт
                    const newRecipe = {
                        id: SICOMIX.utils?.generateId?.() || Date.now(),
                        name,
                        category,
                        color,
                        description,
                        ingredients: [...this.selectedIngredients],
                        createdAt: new Date().toISOString(),
                        date: new Date().toLocaleDateString('uk-UA'),
                        photo: null,
                        version: CONFIG.VERSION
                    };
                    
                    this.recipes.push(newRecipe);
                    this.saveData();
                    this.showNotification(`Рецепт "${name}" збережено`, 'success');
                }
                
                this.clearRecipeForm();
                this.switchPage('recipes');
            } catch (error) {
                console.error('Помилка збереження рецепту:', error);
                this.showNotification('Помилка збереження рецепту', 'error');
            }
        }

        clearRecipeForm() {
            try {
                if (document.getElementById('recipeName')) {
                    document.getElementById('recipeName').value = '';
                }
                if (document.getElementById('recipeCategory')) {
                    document.getElementById('recipeCategory').value = '';
                }
                if (this.elements.recipeColor && this.elements.colorPreview) {
                    this.elements.recipeColor.value = '#4361ee';
                    this.elements.colorPreview.style.background = '#4361ee';
                }
                if (document.getElementById('recipeDescription')) {
                    document.getElementById('recipeDescription').value = '';
                }
                if (this.elements.paintSearch) this.elements.paintSearch.value = '';
                this.selectedIngredients = [];
                this.renderIngredientsList();
                this.resetEditMode();
            } catch (error) {
                console.error('Помилка очищення форми:', error);
            }
        }

        resetEditMode() {
            this.isEditingRecipe = false;
            this.editingRecipeId = null;
            if (this.elements.saveRecipeBtn) {
                this.elements.saveRecipeBtn.innerHTML = `
                    <i class="fas fa-save"></i> 
                    <span data-i18n="save_recipe">Зберегти рецепт</span>
                `;
                if (SICOMIX.i18n?.applyTranslations) {
                    SICOMIX.i18n.applyTranslations();
                }
            }
        }

        // ========== РЕЦЕПТИ ==========
        loadRecipes() {
            try {
                this.renderRecipes();
            } catch (error) {
                console.error('Помилка завантаження рецептів:', error);
            }
        }

        renderRecipes() {
            try {
                if (!this.elements.recipesContainer) return;
                
                const searchTerm = this.elements.recipeSearch?.value.toLowerCase() || '';
                const category = this.elements.recipeCategoryFilter?.value || '';
                
                let filteredRecipes = this.recipes;
                
                if (searchTerm) {
                    filteredRecipes = filteredRecipes.filter(recipe => 
                        recipe.name.toLowerCase().includes(searchTerm) ||
                        (recipe.description && recipe.description.toLowerCase().includes(searchTerm)) ||
                        recipe.category.toLowerCase().includes(searchTerm)
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
                
                if (filteredRecipes.length === 0) {
                    this.elements.recipesContainer.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-book-open fa-4x"></i>
                            <h3>${SICOMIX.i18n?.t?.('no_recipes') || 'Немає рецептів'}</h3>
                            <p>${SICOMIX.i18n?.t?.('no_recipes_desc') || 'Створіть свій перший рецепт'}</p>
                            <button class="btn btn-primary" onclick="SICOMIX.app.switchPage('new-recipe')">
                                <i class="fas fa-plus"></i>
                                Створити рецепт
                            </button>
                        </div>
                    `;
                    return;
                }
                
                this.elements.recipesContainer.innerHTML = filteredRecipes.map((recipe, index) => {
                    const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
                    const isSelected = this.selectedRecipes.includes(recipe.id);
                    
                    return `
                        <div class="recipe-card ${isSelected ? 'selected' : ''}" data-id="${recipe.id}">
                            <div class="recipe-image-container">
                                ${recipe.photo ? 
                                    `<img src="${recipe.photo}" class="recipe-image" alt="${recipe.name}" loading="lazy">` :
                                    `<div class="recipe-image-placeholder" style="background: ${recipe.color}">
                                        <i class="fas fa-palette"></i>
                                    </div>`
                                }
                            </div>
                            <div class="recipe-content">
                                <div class="recipe-header">
                                    <div>
                                        <h3 class="recipe-title">${recipe.name}</h3>
                                        <span class="recipe-category">${recipe.category}</span>
                                    </div>
                                    <div class="recipe-actions-top">
                                        <input type="checkbox" class="recipe-select" 
                                               value="${recipe.id}" 
                                               ${isSelected ? 'checked' : ''}
                                               aria-label="Обрати рецепт ${recipe.name}">
                                    </div>
                                </div>
                                <p class="recipe-description">${recipe.description || 'Без опису'}</p>
                                <div class="recipe-meta">
                                    <div class="meta-item">
                                        <i class="fas fa-flask"></i>
                                        <span>${recipe.ingredients.length} інгред.</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="fas fa-weight-hanging"></i>
                                        <span>${totalAmount.toFixed(1)} г</span>
                                    </div>
                                    <div class="meta-item">
                                        <i class="fas fa-calendar"></i>
                                        <span>${recipe.date}</span>
                                    </div>
                                </div>
                                <div class="recipe-actions">
                                    <button class="btn btn-primary btn-sm" onclick="SICOMIX.app.editRecipe(${recipe.id})">
                                        <i class="fas fa-edit"></i> Редагувати
                                    </button>
                                    <button class="btn btn-success btn-sm" onclick="SICOMIX.app.exportRecipe(${recipe.id})">
                                        <i class="fas fa-download"></i> Експорт
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="SICOMIX.app.deleteRecipe(${recipe.id})">
                                        <i class="fas fa-trash"></i> Видалити
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                this.updateRecipeSelection();
                this.updateRecipeStats();
            } catch (error) {
                console.error('Помилка рендерингу рецептів:', error);
                this.elements.recipesContainer.innerHTML = `
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle fa-4x"></i>
                        <h3>Помилка завантаження рецептів</h3>
                        <p>Спробуйте оновити сторінку</p>
                    </div>
                `;
            }
        }

        updateRecipeSelection() {
            const checkboxes = this.elements.recipesContainer.querySelectorAll('.recipe-select');
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const recipeId = parseInt(e.target.value);
                    
                    if (e.target.checked) {
                        if (!this.selectedRecipes.includes(recipeId)) {
                            this.selectedRecipes.push(recipeId);
                        }
                    } else {
                        this.selectedRecipes = this.selectedRecipes.filter(id => id !== recipeId);
                    }
                    
                    // Оновлюємо вигляд картки
                    const card = e.target.closest('.recipe-card');
                    if (card) {
                        card.classList.toggle('selected', e.target.checked);
                    }
                });
            });
        }

        updateRecipeStats() {
            const totalRecipesElement = document.getElementById('totalRecipes');
            const totalPaintsCatalogElement = document.getElementById('totalPaintsCatalog');
            const totalCalculationsElement = document.getElementById('totalCalculations');
            
            if (totalRecipesElement) {
                totalRecipesElement.textContent = this.recipes.length;
            }
            if (totalPaintsCatalogElement) {
                totalPaintsCatalogElement.textContent = this.paintCatalog.length;
            }
            if (totalCalculationsElement) {
                // Підраховуємо загальну кількість інгредієнтів у всіх рецептах
                const totalCalculations = this.recipes.reduce((sum, recipe) => 
                    sum + (recipe.ingredients?.length || 0), 0
                );
                totalCalculationsElement.textContent = totalCalculations;
            }
        }

        deleteRecipe(id) {
            this.showConfirmation(
                'Видалення рецепту',
                'Ви впевнені, що хочете видалити цей рецепт?',
                () => {
                    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
                    this.selectedRecipes = this.selectedRecipes.filter(recipeId => recipeId !== id);
                    this.saveData();
                    this.renderRecipes();
                    this.showNotification('Рецепт видалено', 'success');
                }
            );
        }

        deleteSelectedRecipes() {
            if (this.selectedRecipes.length === 0) {
                this.showNotification('Оберіть рецепти для видалення', 'warning');
                return;
            }
            
            this.showConfirmation(
                'Видалення рецептів',
                `Видалити ${this.selectedRecipes.length} обраних рецептів?`,
                () => {
                    const countBefore = this.recipes.length;
                    this.recipes = this.recipes.filter(recipe => !this.selectedRecipes.includes(recipe.id));
                    const deletedCount = countBefore - this.recipes.length;
                    
                    this.selectedRecipes = [];
                    this.saveData();
                    this.renderRecipes();
                    this.showNotification(`Видалено ${deletedCount} рецептів`, 'success');
                }
            );
        }

        exportRecipe(id) {
            try {
                const recipe = this.recipes.find(r => r.id === id);
                if (!recipe) {
                    this.showNotification('Рецепт не знайдено', 'error');
                    return;
                }
                
                // Додаємо інформацію про фарби до експорту
                const recipeWithPaintDetails = {
                    ...recipe,
                    exportDate: new Date().toISOString(),
                    exportedFrom: CONFIG.APP_NAME,
                    version: CONFIG.VERSION,
                    ingredientsWithDetails: recipe.ingredients.map(ing => {
                        const paint = this.paintCatalog.find(p => p.id === ing.paintId);
                        return {
                            ...ing,
                            paintName: paint ? paint.searchName || paint.name : 'Невідомо',
                            paintColor: paint ? paint.color : '#000000',
                            paintCategory: paint ? paint.category : 'Невідомо',
                            paintArticle: paint ? paint.article : '—'
                        };
                    })
                };
                
                const filename = `SICO_MIX_${recipe.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
                SICOMIX.utils?.exportToFile?.(recipeWithPaintDetails, filename);
                this.showNotification(`Рецепт "${recipe.name}" експортовано`, 'success');
            } catch (error) {
                console.error('Помилка експорту рецепту:', error);
                this.showNotification('Помилка експорту рецепту', 'error');
            }
        }

        exportAllRecipes() {
            try {
                if (this.recipes.length === 0) {
                    this.showNotification('Немає рецептів для експорту', 'warning');
                    return;
                }
                
                const exportData = {
                    metadata: {
                        exportDate: new Date().toISOString(),
                        app: CONFIG.APP_NAME,
                        version: CONFIG.VERSION,
                        totalRecipes: this.recipes.length
                    },
                    recipes: this.recipes.map(recipe => ({
                        ...recipe,
                        ingredientsWithDetails: recipe.ingredients.map(ing => {
                            const paint = this.paintCatalog.find(p => p.id === ing.paintId);
                            return {
                                ...ing,
                                paintName: paint ? paint.searchName || paint.name : 'Невідомо',
                                paintColor: paint ? paint.color : '#000000',
                                paintCategory: paint ? paint.category : 'Невідомо'
                            };
                        })
                    }))
                };
                
                const filename = `SICO_MIX_Recipes_${new Date().toISOString().slice(0, 10)}.json`;
                SICOMIX.utils?.exportToFile?.(exportData, filename);
                this.showNotification(`Експортовано ${this.recipes.length} рецептів`, 'success');
            } catch (error) {
                console.error('Помилка експорту всіх рецептів:', error);
                this.showNotification('Помилка експорту рецептів', 'error');
            }
        }

        importRecipes() {
            try {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.json,.csv';
                fileInput.style.display = 'none';
                
                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            let importedRecipes;
                            
                            if (file.name.endsWith('.csv')) {
                                // Обробка CSV
                                const csvText = event.target.result;
                                importedRecipes = this.parseCSV(csvText);
                            } else {
                                // Обробка JSON
                                const data = JSON.parse(event.target.result);
                                importedRecipes = data.recipes || data;
                            }
                            
                            if (!Array.isArray(importedRecipes)) {
                                this.showNotification('Невірний формат файлу', 'error');
                                return;
                            }
                            
                            this.showConfirmation(
                                'Імпорт рецептів',
                                `Знайдено ${importedRecipes.length} рецептів. Імпортувати?`,
                                () => {
                                    let importedCount = 0;
                                    importedRecipes.forEach(recipe => {
                                        // Перевіряємо чи рецепт вже існує
                                        const exists = this.recipes.some(r => 
                                            r.name === recipe.name && 
                                            JSON.stringify(r.ingredients) === JSON.stringify(recipe.ingredients)
                                        );
                                        
                                        if (!exists) {
                                            const newRecipe = {
                                                ...recipe,
                                                id: SICOMIX.utils?.generateId?.() || Date.now() + Math.random(),
                                                createdAt: new Date().toISOString(),
                                                date: new Date().toLocaleDateString('uk-UA'),
                                                version: CONFIG.VERSION
                                            };
                                            
                                            // Видаляємо деталі фарб, якщо вони є
                                            delete newRecipe.ingredientsWithDetails;
                                            delete newRecipe.exportDate;
                                            delete newRecipe.exportedFrom;
                                            
                                            this.recipes.push(newRecipe);
                                            importedCount++;
                                        }
                                    });
                                    
                                    this.saveData();
                                    this.renderRecipes();
                                    this.showNotification(`Імпортовано ${importedCount} нових рецептів`, 'success');
                                }
                            );
                        } catch (error) {
                            console.error('Помилка імпорту:', error);
                            this.showNotification('Помилка читання файлу', 'error');
                        }
                    };
                    reader.readAsText(file);
                };
                
                document.body.appendChild(fileInput);
                fileInput.click();
                document.body.removeChild(fileInput);
            } catch (error) {
                console.error('Помилка імпорту рецептів:', error);
                this.showNotification('Помилка імпорту', 'error');
            }
        }

        parseCSV(csvText) {
            const lines = csvText.split('\n').filter(line => line.trim());
            if (lines.length < 2) return [];
            
            const headers = lines[0].split(',').map(h => h.trim());
            const recipes = [];
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                if (values.length !== headers.length) continue;
                
                const recipe = {};
                headers.forEach((header, index) => {
                    recipe[header] = values[index];
                });
                
                // Парсимо інгредієнти, якщо вони є
                if (recipe.ingredients) {
                    try {
                        recipe.ingredients = JSON.parse(recipe.ingredients);
                    } catch {
                        recipe.ingredients = [];
                    }
                }
                
                recipes.push(recipe);
            }
            
            return recipes;
        }

        printRecipes() {
            try {
                if (this.recipes.length === 0) {
                    this.showNotification('Немає рецептів для друку', 'warning');
                    return;
                }
                
                const printWindow = window.open('', '_blank');
                const today = new Date().toLocaleDateString('uk-UA');
                
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="uk">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Рецепти SICO MIX</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333; }
                            h1 { color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 10px; }
                            .recipe { margin-bottom: 40px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid; }
                            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                            th { background: #f5f5f5; font-weight: bold; }
                            .recipe-header { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px; }
                            .recipe-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
                            .info-item { padding: 8px; background: #e9ecef; border-radius: 4px; }
                            .no-print { display: none; }
                            @media print {
                                body { font-size: 12pt; }
                                .recipe { break-inside: avoid; }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Рецепти SICO MIX</h1>
                        <p><strong>Дата друку:</strong> ${today}</p>
                        <p><strong>Всього рецептів:</strong> ${this.recipes.length}</p>
                        <hr>
                        ${this.recipes.map((recipe, index) => {
                            const ingredientsHTML = recipe.ingredients.map(ing => {
                                const paint = this.paintCatalog.find(p => p.id === ing.paintId);
                                const paintName = paint ? paint.searchName || paint.name : 'Невідомо';
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
                                        <div class="info-item"><strong>Інгредієнтів:</strong> ${recipe.ingredients.length}</div>
                                        <div class="info-item"><strong>Загальна вага:</strong> ${totalAmount.toFixed(1)} г</div>
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
                
                // Додаємо затримку перед друком для завантаження стилів
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            } catch (error) {
                console.error('Помилка друку рецептів:', error);
                this.showNotification('Помилка друку', 'error');
            }
        }

        // ========== КАТАЛОГ ФАРБ ==========
        renderPaintCatalog() {
            try {
                if (!this.elements.paintCatalogElement) return;
                
                const searchTerm = this.elements.catalogSearch?.value.trim().toUpperCase() || '';
                const categoryFilter = this.elements.catalogCategoryFilter?.value || '';
                
                let filteredPaints = this.paintCatalog;
                
                if (searchTerm) {
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
                
                if (filteredPaints.length === 0) {
                    this.elements.paintCatalogElement.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-layer-group fa-4x"></i>
                            <h3>Каталог порожній</h3>
                            <p>Використовуйте імпорт для додавання фарб</p>
                        </div>
                    `;
                    return;
                }
                
                this.elements.paintCatalogElement.innerHTML = filteredPaints.map(paint => {
                    const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
                    const displayName = paint.searchName || paint.name;
                    
                    return `
                        <div class="recipe-card paint-card">
                            <div class="recipe-image-container">
                                <div class="paint-color-large" style="background: ${paint.color}"></div>
                            </div>
                            <div class="recipe-content">
                                <div class="recipe-header">
                                    <div>
                                        <h3 class="recipe-title">${displayName}</h3>
                                        ${colorName ? `<div class="paint-color-name">${colorName}</div>` : ''}
                                        <span class="recipe-category">${paint.category}</span>
                                    </div>
                                </div>
                                <div class="paint-details">
                                    <div class="detail-row">
                                        <div class="detail-item">
                                            <span class="detail-label">Серія:</span>
                                            <span class="detail-value">${paint.series || '—'}</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="detail-label">Код кольору:</span>
                                            <span class="detail-value">${paint.colorCode || '—'}</span>
                                        </div>
                                        <div class="detail-item">
                                            <span class="detail-label">Артикул:</span>
                                            <span class="detail-value">${paint.article || '—'}</span>
                                        </div>
                                    </div>
                                    ${paint.description ? `
                                        <div class="paint-description">
                                            ${paint.description}
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="recipe-actions">
                                    <button class="btn btn-info btn-sm" onclick="SICOMIX.app.showPaintDetails(${paint.id})">
                                        <i class="fas fa-info-circle"></i> Деталі
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="SICOMIX.app.deletePaint(${paint.id})">
                                        <i class="fas fa-trash"></i> Видалити
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                this.updatePaintCount();
            } catch (error) {
                console.error('Помилка рендерингу каталогу фарб:', error);
                this.elements.paintCatalogElement.innerHTML = `
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle fa-4x"></i>
                        <h3>Помилка завантаження каталогу</h3>
                    </div>
                `;
            }
        }

        showPaintDetails(id) {
            try {
                const paint = this.paintCatalog.find(p => p.id === id);
                if (!paint) return;
                
                const modal = document.createElement('div');
                modal.className = 'modal active';
                modal.setAttribute('role', 'dialog');
                modal.setAttribute('aria-modal', 'true');
                modal.setAttribute('aria-labelledby', 'paintDetailsTitle');
                
                const colorName = paint.colorName || paint.name.split(' - ')[1] || '';
                
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="paintDetailsTitle">${paint.searchName || paint.name}</h3>
                            <button class="modal-close close-paint-details" aria-label="Закрити">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="paint-details-header">
                                <div class="paint-color-detail" style="background: ${paint.color}"></div>
                                <div>
                                    <h4>${colorName}</h4>
                                    <p class="paint-category">${paint.category}</p>
                                </div>
                            </div>
                            
                            <div class="details-grid">
                                <div class="detail-card">
                                    <div class="detail-label">Серія</div>
                                    <div class="detail-value">${paint.series || '—'}</div>
                                </div>
                                <div class="detail-card">
                                    <div class="detail-label">Код кольору</div>
                                    <div class="detail-value">${paint.colorCode || '—'}</div>
                                </div>
                                <div class="detail-card">
                                    <div class="detail-label">Артикул</div>
                                    <div class="detail-value">${paint.article || '—'}</div>
                                </div>
                                <div class="detail-card">
                                    <div class="detail-label">Виробник</div>
                                    <div class="detail-value">${paint.manufacturer || 'SICO'}</div>
                                </div>
                            </div>
                            
                            ${paint.description ? `
                                <div class="detail-section">
                                    <h5>Опис</h5>
                                    <p>${paint.description}</p>
                                </div>
                            ` : ''}
                            
                            ${paint.properties && Object.keys(paint.properties).length > 0 ? `
                                <div class="detail-section">
                                    <h5>Характеристики</h5>
                                    <div class="properties-grid">
                                        ${Object.entries(paint.properties).map(([key, value]) => `
                                            <div class="property-item">
                                                <span class="property-key">${key}:</span>
                                                <span class="property-value">${value}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary close-paint-details">Закрити</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                const closeButtons = modal.querySelectorAll('.close-paint-details');
                closeButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.body.removeChild(modal);
                    });
                });
                
                // Focus trap
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                firstFocusable.focus();
                
                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                    }
                    
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusable) {
                                lastFocusable.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusable) {
                                firstFocusable.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Помилка відображення деталей фарби:', error);
            }
        }

        deletePaint(id) {
            this.showConfirmation(
                'Видалення фарби',
                'Ви впевнені, що хочете видалити цю фарбу з каталогу?',
                () => {
                    this.paintCatalog = this.paintCatalog.filter(paint => paint.id !== id);
                    this.saveData();
                    this.renderPaintCatalog();
                    this.initCatalogFilters();
                    this.showNotification('Фарбу видалено з каталогу', 'success');
                }
            );
        }

        updatePaintCount() {
            const count = this.paintCatalog.length;
            if (this.elements.totalPaintsElement) {
                this.elements.totalPaintsElement.textContent = count;
            }
            if (this.elements.headerPaintCount) {
                this.elements.headerPaintCount.textContent = count;
            }
        }

        // ========== НАЛАШТУВАННЯ ==========
        saveSettings() {
            try {
                this.currentSettings = {
                    ...this.currentSettings,
                    language: this.elements.languageSelect?.value || 'uk',
                    units: this.elements.unitsSelect?.value || 'grams',
                    autoSave: this.elements.autoSaveCheckbox?.checked || true,
                    backup: this.elements.backupCheckbox?.checked || false,
                    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light'
                };
                
                this.saveData();
                this.showNotification('Налаштування збережено', 'success');
                
                // Apply language change if needed
                if (this.elements.languageSelect && this.currentLanguage !== this.elements.languageSelect.value) {
                    this.currentLanguage = this.elements.languageSelect.value;
                    localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, this.currentLanguage);
                    
                    if (SICOMIX.i18n?.setLanguage) {
                        SICOMIX.i18n.setLanguage(this.currentLanguage);
                    }
                    
                    // Перезавантажуємо сторінку для застосування нової мови
                    setTimeout(() => location.reload(), 500);
                }
            } catch (error) {
                console.error('Помилка збереження налаштувань:', error);
                this.showNotification('Помилка збереження налаштувань', 'error');
            }
        }

        resetSettings() {
            this.showConfirmation(
                'Скидання налаштувань',
                'Ви впевнені, що хочете скинути всі налаштування до стандартних?',
                () => {
                    this.currentSettings = { ...CONFIG.DEFAULT_SETTINGS };
                    this.saveData();
                    this.initSettings();
                    this.initLanguage();
                    this.showNotification('Налаштування скинуті до стандартних', 'success');
                }
            );
        }

        clearAllData() {
            this.showConfirmation(
                'Очищення всіх даних',
                'УВАГА! Ця дія видалить всі рецепти та фарби. Дія незворотна. Продовжити?',
                () => {
                    this.recipes = [];
                    this.paintCatalog = SICOMIX.data?.initialData?.paints || [];
                    this.selectedIngredients = [];
                    this.selectedRecipes = [];
                    this.saveData();
                    this.renderRecipes();
                    this.renderPaintCatalog();
                    this.initCatalogFilters();
                    this.showNotification('Всі дані видалено, каталог відновлено', 'success');
                }
            );
        }

        toggleTheme() {
            const isDark = document.body.classList.contains('dark-theme');
            document.body.classList.toggle('dark-theme', !isDark);
            this.currentSettings.theme = !isDark ? 'dark' : 'light';
            this.saveData();
            this.showNotification(`Тема змінена на ${!isDark ? 'темну' : 'світлу'}`, 'info');
        }

        // ========== УТІЛІТИ ==========
        showNotification(message, type = 'success', duration = 3000) {
            if (SICOMIX.utils?.showNotification) {
                SICOMIX.utils.showNotification(message, type, duration);
            } else {
                // Fallback notification
                console.log(`${type.toUpperCase()}: ${message}`);
                alert(`${type}: ${message}`);
            }
        }

        showConfirmation(title, message, onConfirm, onCancel = null) {
            if (SICOMIX.utils?.showConfirmation) {
                SICOMIX.utils.showConfirmation(title, message, onConfirm, onCancel);
            } else {
                // Fallback confirmation
                if (confirm(`${title}\n\n${message}`)) {
                    onConfirm();
                } else if (onCancel) {
                    onCancel();
                }
            }
        }

        // ========== РЕДАГУВАННЯ РЕЦЕПТІВ ==========
        editRecipe(id) {
            try {
                const recipe = this.recipes.find(r => r.id === id);
                if (!recipe) {
                    this.showNotification('Рецепт не знайдено', 'error');
                    return;
                }
                
                // Заповнити форму редагування
                document.getElementById('recipeName').value = recipe.name;
                document.getElementById('recipeCategory').value = recipe.category;
                document.getElementById('recipeColor').value = recipe.color;
                document.getElementById('colorPreview').style.background = recipe.color;
                document.getElementById('recipeDescription').value = recipe.description || '';
                
                // Завантажити інгредієнти
                this.selectedIngredients = [...recipe.ingredients];
                this.renderIngredientsList();
                
                // Встановити режим редагування
                this.isEditingRecipe = true;
                this.editingRecipeId = id;
                
                // Оновити кнопку збереження
                if (this.elements.saveRecipeBtn) {
                    this.elements.saveRecipeBtn.innerHTML = `
                        <i class="fas fa-save"></i> 
                        <span data-i18n="update_recipe">Оновити рецепт</span>
                    `;
                    if (SICOMIX.i18n?.applyTranslations) {
                        SICOMIX.i18n.applyTranslations();
                    }
                }
                
                // Перейти на сторінку створення рецепту
                this.switchPage('new-recipe');
                
                this.showNotification(`Рецепт "${recipe.name}" завантажено для редагування`, 'info');
            } catch (error) {
                console.error('Помилка редагування рецепту:', error);
                this.showNotification('Помилка завантаження рецепту', 'error');
            }
        }

        // ========== ОБРОБКА ПОДІЙ ==========
        setupEventListeners() {
            this.setupNavigation();
            
            // Color picker
            if (this.elements.recipeColor && this.elements.colorPreview) {
                this.elements.recipeColor.addEventListener('input', () => {
                    this.elements.colorPreview.style.background = this.elements.recipeColor.value;
                });
            }
            
            // New recipe buttons
            if (this.elements.addIngredientBtn) {
                this.elements.addIngredientBtn.addEventListener('click', () => this.addIngredient());
            }
            if (this.elements.saveRecipeBtn) {
                this.elements.saveRecipeBtn.addEventListener('click', () => this.saveRecipe());
            }
            if (this.elements.clearRecipeBtn) {
                this.elements.clearRecipeBtn.addEventListener('click', () => this.clearRecipeForm());
            }
            if (this.elements.calculatePercentagesBtn) {
                this.elements.calculatePercentagesBtn.addEventListener('click', () => this.calculatePercentages());
            }
            
            // Recipes page buttons
            if (this.elements.exportRecipesBtn) {
                this.elements.exportRecipesBtn.addEventListener('click', () => this.exportAllRecipes());
            }
            if (this.elements.importRecipesBtn) {
                this.elements.importRecipesBtn.addEventListener('click', () => this.importRecipes());
            }
            if (this.elements.printRecipesBtn) {
                this.elements.printRecipesBtn.addEventListener('click', () => this.printRecipes());
            }
            if (this.elements.deleteSelectedRecipesBtn) {
                this.elements.deleteSelectedRecipesBtn.addEventListener('click', () => this.deleteSelectedRecipes());
            }
            
            // Catalog page buttons
            if (this.elements.addNewPaintBtn) {
                this.elements.addNewPaintBtn.addEventListener('click', () => {
                    this.showNotification('Використовуйте імпорт для додавання нових фарб', 'info');
                });
            }
            
            // Search functionality
            if (this.elements.paintSearch) {
                this.elements.paintSearch.addEventListener('input', SICOMIX.utils?.debounce?.(() => {
                    const searchTerm = this.elements.paintSearch.value.trim().toUpperCase();
                    if (searchTerm) {
                        const filtered = this.paintCatalog.filter(paint => 
                            (paint.searchName || paint.name).includes(searchTerm) ||
                            (paint.colorName || '').toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        if (filtered.length > 0) {
                            this.showNotification(`Знайдено ${filtered.length} фарб`, 'info', 1500);
                        }
                    }
                }, 500) || (() => {}));
            }
            
            if (this.elements.categoryFilter) {
                this.elements.categoryFilter.addEventListener('change', () => {
                    this.showNotification('Фільтр застосовано', 'info', 1000);
                });
            }
            
            // Language selector
            if (this.elements.languageSelect) {
                this.elements.languageSelect.addEventListener('change', () => {
                    this.currentSettings.language = this.elements.languageSelect.value;
                    this.saveData();
                });
            }
            
            // Settings buttons
            if (this.elements.saveSettingsBtn) {
                this.elements.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
            }
            if (this.elements.resetSettingsBtn) {
                this.elements.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
            }
            if (this.elements.clearAllDataBtn) {
                this.elements.clearAllDataBtn.addEventListener('click', () => this.clearAllData());
            }
            
            // Theme toggle
            if (this.elements.themeToggle) {
                this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            // Catalog search
            if (this.elements.catalogSearch) {
                this.elements.catalogSearch.addEventListener('input', 
                    SICOMIX.utils?.debounce?.(() => this.renderPaintCatalog(), 300) || 
                    (() => this.renderPaintCatalog())
                );
            }
            
            if (this.elements.catalogCategoryFilter) {
                this.elements.catalogCategoryFilter.addEventListener('change', () => this.renderPaintCatalog());
            }
            
            // Recipe search
            if (this.elements.recipeSearch) {
                this.elements.recipeSearch.addEventListener('input', 
                    SICOMIX.utils?.debounce?.(() => this.renderRecipes(), 300) || 
                    (() => this.renderRecipes())
                );
            }
            
            if (this.elements.recipeCategoryFilter) {
                this.elements.recipeCategoryFilter.addEventListener('change', () => this.renderRecipes());
            }
            
            // Resize handler for sidebar
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    // На десктопах закриваємо мобільне меню
                    if (this.sidebar.classList.contains('active')) {
                        this.closeSidebar();
                    }
                }
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ctrl+S - Save
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    if (this.elements.saveRecipeBtn) this.elements.saveRecipeBtn.click();
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
                    if (this.sidebar && this.sidebar.classList.contains('active') && window.innerWidth <= 992) {
                        this.closeSidebar();
                    }
                    const modals = document.querySelectorAll('.modal.active');
                    modals.forEach(modal => {
                        document.body.removeChild(modal);
                    });
                }
            });
            
            // Online/offline detection
            window.addEventListener('online', () => {
                this.showNotification('З\'єднання відновлено', 'success');
            });
            
            window.addEventListener('offline', () => {
                this.showNotification('Втрачено з\'єднання. Працюємо в офлайн режимі', 'warning');
            });
            
            // Before unload warning
            window.addEventListener('beforeunload', (e) => {
                if (this.isEditingRecipe || this.selectedIngredients.length > 0) {
                    e.preventDefault();
                    e.returnValue = 'У вас є незбережені зміни. Ви впевнені, що хочете покинути сторінку?';
                }
            });
        }
    }

    // ========== ЕКСПОРТ ТА ІНІЦІАЛІЗАЦІЯ ==========
    SICOMIX.app = new SICOApp();
    
    // Додаємо глобальні функції для доступу з HTML
    window.SICOMIX = SICOMIX;
    
    // Глобальні методи для HTML onclick подій
    window.editRecipe = (id) => SICOMIX.app.editRecipe(id);
    window.deleteRecipe = (id) => SICOMIX.app.deleteRecipe(id);
    window.exportRecipe = (id) => SICOMIX.app.exportRecipe(id);
    window.deletePaint = (id) => SICOMIX.app.deletePaint(id);
    window.showPaintDetails = (id) => SICOMIX.app.showPaintDetails(id);
    
    console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} завантажено`);
})();

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Затримка для ініціалізації всіх залежностей
    setTimeout(() => {
        if (window.SICOMIX?.app?.init) {
            SICOMIX.app.init();
        }
        
        // Ініціалізація i18n якщо вона є
        if (window.SICOMIX?.i18n?.init) {
            SICOMIX.i18n.init();
        }
    }, 100);
});
