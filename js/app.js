// ========== ГЛОБАЛЬНИЙ ОБ'ЄКТ ДОДАТКУ ==========
const SicoMixApp = {
    // Конфігурація
    config: {
        APP_NAME: 'SICO MIX',
        VERSION: '2.3',
        STORAGE_KEYS: {
            RECIPES: 'sicoMixRecipes_v3',
            PAINTS: 'sicoMixPaints_v3',
            SETTINGS: 'sicoMixSettings_v3',
            BACKUP: 'sicoMixBackup_v3'
        },
        MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
        DEFAULT_COLOR: '#4361ee',
        DEFAULT_PAINT_COLOR: '#000000'
    },
    
    // Стан додатку
    state: {
        recipes: [],
        paints: [],
        settings: {
            theme: 'auto',
            language: 'uk',
            units: 'grams',
            autoSave: true,
            backup: false
        },
        selectedIngredients: [],
        selectedRecipes: [],
        selectedPaints: [],
        currentPage: 'home',
        isLoading: false
    },
    
    // DOM елементи
    elements: {},
    
    // ========== ІНІЦІАЛІЗАЦІЯ ==========
    init() {
        console.log('🚀 SICO MIX v' + this.config.VERSION + ' запускається...');
        
        this.loadData();
        this.cacheElements();
        this.setupEventListeners();
        this.applySettings();
        this.renderHomePage();
        this.setupKeyboardShortcuts();
        
        // Показуємо завантажувач при першому завантаженні
        this.showLoader();
        setTimeout(() => {
            this.hideLoader();
            this.showNotification('Ласкаво просимо до SICO MIX!', 'success');
        }, 1000);
    },
    
    // ========== РОБОТА З ДАНИМИ ==========
    loadData() {
        try {
            // Завантаження налаштувань
            const savedSettings = localStorage.getItem(this.config.STORAGE_KEYS.SETTINGS);
            if (savedSettings) {
                this.state.settings = { ...this.state.settings, ...JSON.parse(savedSettings) };
            }
            
            // Завантаження рецептів
            const savedRecipes = localStorage.getItem(this.config.STORAGE_KEYS.RECIPES);
            this.state.recipes = savedRecipes ? JSON.parse(savedRecipes) : DataColors.initialRecipes;
            
            // Завантаження фарб
            const savedPaints = localStorage.getItem(this.config.STORAGE_KEYS.PAINTS);
            this.state.paints = savedPaints ? JSON.parse(savedPaints) : DataColors.initialPaints;
            
            console.log('📊 Дані завантажено:', {
                recipes: this.state.recipes.length,
                paints: this.state.paints.length
            });
        } catch (error) {
            console.error('❌ Помилка завантаження даних:', error);
            this.showNotification('Помилка завантаження даних', 'error');
            
            // Використовуємо початкові дані
            this.state.recipes = DataColors.initialRecipes;
            this.state.paints = DataColors.initialPaints;
        }
    },
    
    saveData() {
        try {
            if (this.state.settings.autoSave) {
                localStorage.setItem(this.config.STORAGE_KEYS.RECIPES, JSON.stringify(this.state.recipes));
                localStorage.setItem(this.config.STORAGE_KEYS.PAINTS, JSON.stringify(this.state.paints));
                localStorage.setItem(this.config.STORAGE_KEYS.SETTINGS, JSON.stringify(this.state.settings));
                console.log('💾 Дані збережено');
            }
        } catch (error) {
            console.error('❌ Помилка збереження даних:', error);
            this.showNotification('Помилка збереження даних', 'error');
        }
    },
    
    createBackup() {
        try {
            const backupData = {
                timestamp: new Date().toISOString(),
                version: this.config.VERSION,
                recipes: this.state.recipes,
                paints: this.state.paints,
                settings: this.state.settings
            };
            
            localStorage.setItem(this.config.STORAGE_KEYS.BACKUP, JSON.stringify(backupData));
            return backupData;
        } catch (error) {
            console.error('❌ Помилка створення резервної копії:', error);
            return null;
        }
    },
    
    restoreBackup(backupData) {
        try {
            if (backupData.version !== this.config.VERSION) {
                console.warn('⚠️ Версія резервної копії відрізняється:', backupData.version);
            }
            
            this.state.recipes = backupData.recipes || [];
            this.state.paints = backupData.paints || [];
            this.state.settings = { ...this.state.settings, ...backupData.settings };
            
            this.saveData();
            return true;
        } catch (error) {
            console.error('❌ Помилка відновлення з резервної копії:', error);
            return false;
        }
    },
    
    // ========== DOM МАНІПУЛЯЦІЇ ==========
    cacheElements() {
        this.elements = {
            // Навігація
            sidebar: document.getElementById('sidebar'),
            menuToggle: document.getElementById('menuToggle'),
            desktopMenuToggle: document.getElementById('desktopMenuToggle'),
            closeSidebar: document.getElementById('closeSidebar'),
            mainContainer: document.getElementById('mainContainer'),
            navLinks: document.querySelectorAll('.nav-link'),
            pageContents: document.querySelectorAll('.page-content'),
            
            // Загальні елементи
            themeToggle: document.getElementById('themeToggle'),
            totalPaints: document.getElementById('totalPaints'),
            headerPaintCount: document.getElementById('headerPaintCount'),
            totalRecipes: document.getElementById('totalRecipes'),
            totalPaintsHome: document.getElementById('totalPaintsHome'),
            totalIngredients: document.getElementById('totalIngredients'),
            
            // Новий рецепт
            colorPreview: document.getElementById('colorPreview'),
            recipeColor: document.getElementById('recipeColor'),
            colorHex: document.getElementById('colorHex'),
            ingredientsList: document.getElementById('ingredientsList'),
            paintSearch: document.getElementById('paintSearch'),
            categoryFilter: document.getElementById('categoryFilter'),
            addIngredientBtn: document.getElementById('addIngredientBtn'),
            saveRecipeBtn: document.getElementById('saveRecipeBtn'),
            clearRecipeBtn: document.getElementById('clearRecipeBtn'),
            calculatePercentagesBtn: document.getElementById('calculatePercentagesBtn'),
            
            // Рецепти
            recipesContainer: document.getElementById('recipesContainer'),
            recipeSearch: document.getElementById('recipeSearch'),
            recipeCategoryFilter: document.getElementById('recipeCategoryFilter'),
            exportRecipesBtn: document.getElementById('exportRecipesBtn'),
            importRecipesBtn: document.getElementById('importRecipesBtn'),
            printRecipesBtn: document.getElementById('printRecipesBtn'),
            deleteSelectedRecipesBtn: document.getElementById('deleteSelectedRecipesBtn'),
            
            // Каталог
            paintCatalog: document.getElementById('paintCatalog'),
            catalogSearch: document.getElementById('catalogSearch'),
            addNewPaintBtn: document.getElementById('addNewPaintBtn'),
            deleteSelectedPaintsBtn: document.getElementById('deleteSelectedPaintsBtn'),
            
            // Модальні вікна
            addPaintModal: document.getElementById('addPaintModal'),
            closePaintModal: document.getElementById('closePaintModal'),
            savePaintBtn: document.getElementById('savePaintBtn'),
            cancelPaintBtn: document.getElementById('cancelPaintBtn'),
            confirmationModal: document.getElementById('confirmationModal'),
            confirmActionBtn: document.getElementById('confirmActionBtn'),
            cancelActionBtn: document.getElementById('cancelActionBtn'),
            closeConfirmationModal: document.getElementById('closeConfirmationModal'),
            paintSelectionModal: document.getElementById('paintSelectionModal'),
            paintSelectionContent: document.getElementById('paintSelectionContent'),
            closePaintSelectionModal: document.getElementById('closePaintSelectionModal'),
            
            // Налаштування
            saveSettingsBtn: document.getElementById('saveSettingsBtn'),
            resetSettingsBtn: document.getElementById('resetSettingsBtn'),
            clearAllDataBtn: document.getElementById('clearAllDataBtn'),
            backupDataBtn: document.getElementById('backupDataBtn'),
            restoreDataBtn: document.getElementById('restoreDataBtn'),
            statsRecipes: document.getElementById('statsRecipes'),
            statsPaints: document.getElementById('statsPaints'),
            statsSize: document.getElementById('statsSize'),
            
            // Імпорт/Експорт
            startImportBtn: document.getElementById('startImportBtn'),
            startExportBtn: document.getElementById('startExportBtn'),
            
            // Контейнери
            notificationContainer: document.getElementById('notificationContainer')
        };
    },
    
    setupEventListeners() {
        console.log('🔧 Налаштування обробників подій...');
        
        // Навігація
        this.elements.menuToggle?.addEventListener('click', () => this.toggleSidebar());
        this.elements.desktopMenuToggle?.addEventListener('click', () => this.toggleSidebar());
        this.elements.closeSidebar?.addEventListener('click', () => this.closeSidebar());
        
        // Навігаційні посилання
        this.elements.navLinks?.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.switchPage(page);
            });
        });
        
        // Кнопки на головній сторінці
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const page = card.getAttribute('data-page');
                this.switchPage(page);
            });
        });
        
        // Тема
        this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Кольоровий пікер
        this.elements.recipeColor?.addEventListener('input', (e) => {
            const color = e.target.value;
            this.elements.colorPreview.style.background = color;
            this.elements.colorHex.value = color;
        });
        
        this.elements.colorHex?.addEventListener('input', (e) => {
            const color = e.target.value;
            if (Utils.isValidColor(color)) {
                this.elements.recipeColor.value = color;
                this.elements.colorPreview.style.background = color;
            }
        });
        
        this.elements.colorPreview?.addEventListener('click', () => {
            this.elements.recipeColor.click();
        });
        
        // Новий рецепт
        this.elements.addIngredientBtn?.addEventListener('click', () => this.showPaintSelection());
        this.elements.saveRecipeBtn?.addEventListener('click', () => this.saveRecipe());
        this.elements.clearRecipeBtn?.addEventListener('click', () => this.clearRecipeForm());
        this.elements.calculatePercentagesBtn?.addEventListener('click', () => this.calculatePercentages());
        
        // Пошук та фільтрація
        this.elements.paintSearch?.addEventListener('input', 
            Utils.debounce(() => this.renderIngredientsList(), 300));
        this.elements.categoryFilter?.addEventListener('change', 
            () => this.renderIngredientsList());
        this.elements.recipeSearch?.addEventListener('input', 
            Utils.debounce(() => this.renderRecipesPage(), 300));
        this.elements.recipeCategoryFilter?.addEventListener('change', 
            () => this.renderRecipesPage());
        this.elements.catalogSearch?.addEventListener('input', 
            Utils.debounce(() => this.renderCatalogPage(), 300));
        
        // Рецепти
        this.elements.exportRecipesBtn?.addEventListener('click', () => this.exportRecipes());
        this.elements.importRecipesBtn?.addEventListener('click', () => this.importRecipes());
        this.elements.printRecipesBtn?.addEventListener('click', () => this.printRecipes());
        this.elements.deleteSelectedRecipesBtn?.addEventListener('click', () => this.deleteSelectedRecipes());
        
        // Каталог
        this.elements.addNewPaintBtn?.addEventListener('click', () => this.showAddPaintModal());
        this.elements.deleteSelectedPaintsBtn?.addEventListener('click', () => this.deleteSelectedPaints());
        
        // Модальні вікна
        this.elements.closePaintModal?.addEventListener('click', () => this.hideModal(this.elements.addPaintModal));
        this.elements.cancelPaintBtn?.addEventListener('click', () => this.hideModal(this.elements.addPaintModal));
        this.elements.savePaintBtn?.addEventListener('click', () => this.savePaint());
        this.elements.closeConfirmationModal?.addEventListener('click', () => this.hideModal(this.elements.confirmationModal));
        this.elements.cancelActionBtn?.addEventListener('click', () => this.hideModal(this.elements.confirmationModal));
        this.elements.closePaintSelectionModal?.addEventListener('click', () => this.hideModal(this.elements.paintSelectionModal));
        
        // Налаштування
        this.elements.saveSettingsBtn?.addEventListener('click', () => this.saveSettings());
        this.elements.resetSettingsBtn?.addEventListener('click', () => this.resetSettings());
        this.elements.clearAllDataBtn?.addEventListener('click', () => this.clearAllData());
        this.elements.backupDataBtn?.addEventListener('click', () => this.createDataBackup());
        this.elements.restoreDataBtn?.addEventListener('click', () => this.restoreDataFromBackup());
        
        // Тема (радіо кнопки)
        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.state.settings.theme = e.target.value;
                this.applyTheme();
                this.saveData();
            });
        });
        
        // Імпорт/Експорт
        this.elements.startImportBtn?.addEventListener('click', () => this.startImport());
        this.elements.startExportBtn?.addEventListener('click', () => this.startExport());
        
        // Файлові інпути
        document.getElementById('recipePhoto')?.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'Завантажити фото';
            document.getElementById('fileName').textContent = fileName;
        });
        
        document.getElementById('importFile')?.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'Оберіть файл для імпорту';
            document.getElementById('importFileName').textContent = fileName;
        });
        
        // Посилання в футері
        document.querySelectorAll('.footer-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.switchPage(page);
            });
        });
        
        console.log('✅ Обробники подій налаштовано');
    },
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S для збереження
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (this.state.currentPage === 'new-recipe') {
                    this.saveRecipe();
                } else if (this.state.currentPage === 'settings') {
                    this.saveSettings();
                }
            }
            
            // Escape для закриття модальних вікон
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.hideModal(activeModal);
                } else if (this.elements.sidebar?.classList.contains('active')) {
                    this.closeSidebar();
                }
            }
            
            // Ctrl+D для видалення вибраного
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                if (this.state.currentPage === 'recipes' && this.state.selectedRecipes.length > 0) {
                    this.deleteSelectedRecipes();
                } else if (this.state.currentPage === 'catalog' && this.state.selectedPaints.length > 0) {
                    this.deleteSelectedPaints();
                }
            }
        });
    },
    
    // ========== НАВІГАЦІЯ ==========
    toggleSidebar() {
        if (window.innerWidth <= 768) {
            this.elements.sidebar.classList.toggle('active');
            document.body.style.overflow = this.elements.sidebar.classList.contains('active') ? 'hidden' : 'auto';
        }
    },
    
    closeSidebar() {
        this.elements.sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    switchPage(pageId) {
        console.log('📄 Перехід на сторінку:', pageId);
        
        // Оновлюємо поточну сторінку
        this.state.currentPage = pageId;
        
        // Приховуємо всі сторінки
        this.elements.pageContents?.forEach(page => {
            page.classList.remove('active');
        });
        
        // Показуємо обрану сторінку
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Оновлюємо контент сторінки
            switch(pageId) {
                case 'home':
                    this.renderHomePage();
                    break;
                case 'new-recipe':
                    this.renderNewRecipePage();
                    break;
                case 'recipes':
                    this.renderRecipesPage();
                    break;
                case 'catalog':
                    this.renderCatalogPage();
                    break;
                case 'settings':
                    this.renderSettingsPage();
                    break;
            }
        }
        
        // Оновлюємо активне посилання в навігації
        this.elements.navLinks?.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Закриваємо сайдбар на мобільних пристроях
        if (window.innerWidth <= 768) {
            this.closeSidebar();
        }
        
        // Прокручуємо до верху
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    // ========== ТЕМИ ==========
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.state.settings.theme = newTheme;
        this.applyTheme();
        this.saveData();
        
        // Оновлюємо радіо кнопку
        document.querySelector(`input[name="theme"][value="${newTheme}"]`).checked = true;
        
        this.showNotification(`Тема змінена на ${newTheme === 'dark' ? 'темну' : 'світлу'}`, 'success');
    },
    
    applyTheme() {
        const theme = this.state.settings.theme;
        
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        this.updateThemeIcon();
    },
    
    updateThemeIcon() {
        if (!this.elements.themeToggle) return;
        
        const theme = document.documentElement.getAttribute('data-theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const icon = this.elements.themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            this.elements.themeToggle.setAttribute('aria-label', 'Перемкнути на світлу тему');
        } else {
            icon.className = 'fas fa-moon';
            this.elements.themeToggle.setAttribute('aria-label', 'Перемкнути на темну тему');
        }
    },
    
    applySettings() {
        this.applyTheme();
        
        // Оновлюємо вибрані значення в налаштуваннях
        if (document.getElementById('languageSelect')) {
            document.getElementById('languageSelect').value = this.state.settings.language;
        }
        
        if (document.getElementById('unitsSelect')) {
            document.getElementById('unitsSelect').value = this.state.settings.units;
        }
        
        if (document.getElementById('autoSaveCheckbox')) {
            document.getElementById('autoSaveCheckbox').checked = this.state.settings.autoSave;
        }
        
        if (document.getElementById('backupCheckbox')) {
            document.getElementById('backupCheckbox').checked = this.state.settings.backup;
        }
        
        // Оновлюємо тему в радіо кнопках
        const themeRadio = document.querySelector(`input[name="theme"][value="${this.state.settings.theme}"]`);
        if (themeRadio) {
            themeRadio.checked = true;
        }
    },
    
    // ========== ГОЛОВНА СТОРІНКА ==========
    renderHomePage() {
        this.updateStats();
        this.updatePaintCount();
    },
    
    updateStats() {
        // Загальна кількість рецептів
        if (this.elements.totalRecipes) {
            this.elements.totalRecipes.textContent = this.state.recipes.length;
        }
        
        // Загальна кількість фарб
        if (this.elements.totalPaintsHome) {
            this.elements.totalPaintsHome.textContent = this.state.paints.length;
        }
        
        // Загальна кількість унікальних інгредієнтів
        if (this.elements.totalIngredients) {
            const uniqueIngredients = new Set();
            this.state.recipes.forEach(recipe => {
                recipe.ingredients?.forEach(ing => uniqueIngredients.add(ing.paintId));
            });
            this.elements.totalIngredients.textContent = uniqueIngredients.size;
        }
        
        // Статистика в налаштуваннях
        if (this.elements.statsRecipes) {
            this.elements.statsRecipes.textContent = this.state.recipes.length;
        }
        
        if (this.elements.statsPaints) {
            this.elements.statsPaints.textContent = this.state.paints.length;
        }
        
        if (this.elements.statsSize) {
            const recipesSize = JSON.stringify(this.state.recipes).length;
            const paintsSize = JSON.stringify(this.state.paints).length;
            const totalSize = (recipesSize + paintsSize) / 1024; // KB
            this.elements.statsSize.textContent = totalSize.toFixed(2) + ' KB';
        }
    },
    
    updatePaintCount() {
        const count = this.state.paints.length;
        if (this.elements.totalPaints) {
            this.elements.totalPaints.textContent = count;
        }
        if (this.elements.headerPaintCount) {
            this.elements.headerPaintCount.textContent = count;
        }
    },
    
    // ========== НОВИЙ РЕЦЕПТ ==========
    renderNewRecipePage() {
        // Скидаємо форму
        this.clearRecipeForm();
        
        // Оновлюємо список інгредієнтів
        this.renderIngredientsList();
    },
    
    renderIngredientsList() {
        if (!this.elements.ingredientsList) return;
        
        const container = this.elements.ingredientsList;
        container.innerHTML = '';
        
        if (this.state.selectedIngredients.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="5" class="empty-table-message">
                    <i class="fas fa-flask"></i>
                    <div>Немає доданих інгредієнтів</div>
                    <small>Натисніть "Додати інгредієнт" щоб почати</small>
                </td>
            `;
            container.appendChild(emptyRow);
            return;
        }
        
        this.state.selectedIngredients.forEach((ingredient, index) => {
            const paint = this.state.paints.find(p => p.id === ingredient.paintId);
            if (!paint) return;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="paint-info">
                        <div class="paint-color-circle" style="background: ${paint.color};"></div>
                        <div class="paint-details">
                            <div class="paint-name">${Utils.escapeHTML(paint.name)}</div>
                            <div class="paint-category">${Utils.escapeHTML(paint.category)}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" 
                           class="input-small" 
                           value="${ingredient.amount}" 
                           data-index="${index}"
                           data-field="amount"
                           min="0" 
                           step="0.1"
                           aria-label="Кількість">
                </td>
                <td>
                    <select class="unit-select" 
                            data-index="${index}"
                            data-field="unit"
                            aria-label="Одиниці виміру">
                        <option value="г" ${ingredient.unit === 'г' ? 'selected' : ''}>г</option>
                        <option value="кг" ${ingredient.unit === 'кг' ? 'selected' : ''}>кг</option>
                        <option value="мл" ${ingredient.unit === 'мл' ? 'selected' : ''}>мл</option>
                        <option value="л" ${ingredient.unit === 'л' ? 'selected' : ''}>л</option>
                    </select>
                </td>
                <td>
                    <div class="percentage-display">
                        <input type="text" 
                               class="input-small percentage-input" 
                               value="${ingredient.percentage || 0}" 
                               data-index="${index}"
                               data-field="percentage"
                               readonly
                               aria-label="Відсоток">
                        <span class="percentage-symbol">%</span>
                    </div>
                </td>
                <td>
                    <button class="btn-icon delete-ingredient" 
                            data-index="${index}"
                            aria-label="Видалити">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            container.appendChild(row);
        });
        
        // Додаємо обробники подій
        this.attachIngredientEventListeners();
    },
    
    attachIngredientEventListeners() {
        // Зміна кількості
        this.elements.ingredientsList.querySelectorAll('input[data-field="amount"]').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const value = parseFloat(e.target.value) || 0;
                this.state.selectedIngredients[index].amount = value;
                this.calculatePercentages();
            });
        });
        
        // Зміна одиниць виміру
        this.elements.ingredientsList.querySelectorAll('select[data-field="unit"]').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.state.selectedIngredients[index].unit = e.target.value;
            });
        });
        
        // Видалення інгредієнта
        this.elements.ingredientsList.querySelectorAll('.delete-ingredient').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                this.deleteIngredient(index);
            });
        });
    },
    
    deleteIngredient(index) {
        this.state.selectedIngredients.splice(index, 1);
        this.renderIngredientsList();
        this.showNotification('Інгредієнт видалено', 'success');
    },
    
    calculatePercentages() {
        const totalAmount = this.state.selectedIngredients.reduce((sum, ing) => sum + ing.amount, 0);
        
        if (totalAmount === 0) {
            this.state.selectedIngredients.forEach(ing => ing.percentage = 0);
        } else {
            this.state.selectedIngredients.forEach(ing => {
                ing.percentage = ((ing.amount / totalAmount) * 100).toFixed(1);
            });
        }
        
        this.renderIngredientsList();
    },
    
    showPaintSelection() {
        const searchTerm = this.elements.paintSearch?.value.toLowerCase() || '';
        const category = this.elements.categoryFilter?.value || '';
        
        // Фільтрація фарб
        let filteredPaints = this.state.paints;
        
        if (searchTerm) {
            filteredPaints = filteredPaints.filter(paint => 
                paint.name.toLowerCase().includes(searchTerm) ||
                paint.category.toLowerCase().includes(searchTerm) ||
                (paint.description?.toLowerCase() || '').includes(searchTerm)
            );
        }
        
        if (category) {
            filteredPaints = filteredPaints.filter(paint => paint.category === category);
        }
        
        if (filteredPaints.length === 0) {
            this.showNotification('Фарб не знайдено', 'warning');
            return;
        }
        
        // Рендер списку фарб
        const content = this.elements.paintSelectionContent;
        content.innerHTML = '';
        
        filteredPaints.forEach(paint => {
            const card = document.createElement('div');
            card.className = 'paint-selection-card';
            card.setAttribute('data-id', paint.id);
            card.innerHTML = `
                <div class="paint-selection-card-color" style="background: ${paint.color};"></div>
                <div class="paint-selection-card-name">${Utils.escapeHTML(paint.name)}</div>
                <div class="paint-selection-card-category">${Utils.escapeHTML(paint.category)}</div>
                ${paint.manufacturer ? `<div class="paint-selection-card-manufacturer">${Utils.escapeHTML(paint.manufacturer)}</div>` : ''}
            `;
            
            card.addEventListener('click', () => this.addIngredient(paint.id));
            content.appendChild(card);
        });
        
        this.showModal(this.elements.paintSelectionModal);
    },
    
    addIngredient(paintId) {
        // Перевірка, чи фарба вже додана
        if (this.state.selectedIngredients.some(ing => ing.paintId === paintId)) {
            this.showNotification('Ця фарба вже додана до рецепту', 'warning');
            return;
        }
        
        this.state.selectedIngredients.push({
            paintId: paintId,
            amount: 100,
            unit: 'г',
            percentage: 0
        });
        
        this.calculatePercentages();
        this.hideModal(this.elements.paintSelectionModal);
        this.showNotification('Фарбу додано до рецепту', 'success');
    },
    
    saveRecipe() {
        // Валідація форми
        const name = document.getElementById('recipeName')?.value.trim();
        const category = document.getElementById('recipeCategory')?.value;
        const color = document.getElementById('recipeColor')?.value;
        const description = document.getElementById('recipeDescription')?.value.trim();
        
        // Перевірка обов'язкових полів
        const errors = [];
        
        if (!name) errors.push('Назва рецепту');
        if (!category) errors.push('Категорія');
        if (this.state.selectedIngredients.length === 0) errors.push('Інгредієнти');
        
        if (errors.length > 0) {
            this.showNotification(`Заповніть обов'язкові поля: ${errors.join(', ')}`, 'error');
            return;
        }
        
        // Створення нового рецепту
        const newRecipe = {
            id: Date.now(),
            name: Utils.escapeHTML(name),
            category: Utils.escapeHTML(category),
            color: color,
            description: Utils.escapeHTML(description || ''),
            ingredients: [...this.state.selectedIngredients],
            date: new Date().toLocaleDateString('uk-UA'),
            photo: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Додавання до списку
        this.state.recipes.unshift(newRecipe);
        this.saveData();
        
        // Оновлення інтерфейсу
        this.showNotification(`Рецепт "${name}" успішно збережено!`, 'success');
        this.clearRecipeForm();
        this.switchPage('recipes');
    },
    
    clearRecipeForm() {
        // Скидання полів форми
        document.getElementById('recipeName').value = '';
        document.getElementById('recipeCategory').value = '';
        document.getElementById('recipeColor').value = this.config.DEFAULT_COLOR;
        document.getElementById('colorHex').value = this.config.DEFAULT_COLOR;
        document.getElementById('colorPreview').style.background = this.config.DEFAULT_COLOR;
        document.getElementById('recipeDescription').value = '';
        document.getElementById('fileName').textContent = 'Завантажити фото';
        
        // Скидання списку інгредієнтів
        this.state.selectedIngredients = [];
        this.renderIngredientsList();
        
        // Скидання помилок валідації
        this.hideValidationErrors();
    },
    
    hideValidationErrors() {
        const errorElements = document.querySelectorAll('.validation-error');
        errorElements.forEach(el => el.style.display = 'none');
        
        const inputErrors = document.querySelectorAll('.input-error');
        inputErrors.forEach(el => el.classList.remove('input-error'));
    },
    
    // ========== СТОРІНКА РЕЦЕПТІВ ==========
    renderRecipesPage() {
        const searchTerm = this.elements.recipeSearch?.value.toLowerCase() || '';
        const category = this.elements.recipeCategoryFilter?.value || '';
        
        // Фільтрація рецептів
        let filteredRecipes = [...this.state.recipes];
        
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) ||
                (recipe.description?.toLowerCase() || '').includes(searchTerm)
            );
        }
        
        if (category) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
        }
        
        // Сортування за датою (нові спочатку)
        filteredRecipes.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        
        // Рендер карток
        this.renderRecipeCards(filteredRecipes);
        
        // Оновлення інформації
        this.updateRecipeSelectionInfo();
    },
    
    renderRecipeCards(recipes) {
        const container = this.elements.recipesContainer;
        if (!container) return;
        
        container.innerHTML = '';
        
        if (recipes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h3>Рецептів не знайдено</h3>
                    <p>${this.elements.recipeSearch?.value ? 'Спробуйте змінити пошуковий запит' : 'Створіть ваш перший рецепт!'}</p>
                    <button class="btn btn-primary" onclick="SicoMixApp.switchPage('new-recipe')">
                        <i class="fas fa-plus"></i> Створити рецепт
                    </button>
                </div>
            `;
            return;
        }
        
        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe);
            container.appendChild(card);
        });
    },
    
    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.setAttribute('data-id', recipe.id);
        
        // Розрахунок загальної ваги
        const totalWeight = recipe.ingredients?.reduce((sum, ing) => sum + ing.amount, 0) || 0;
        
        // Отримання кольорів для градієнта
        const colors = recipe.ingredients?.map(ing => {
            const paint = this.state.paints.find(p => p.id === ing.paintId);
            return paint?.color || '#cccccc';
        }) || [recipe.color || this.config.DEFAULT_COLOR];
        
        card.innerHTML = `
            <div class="recipe-image" style="background: linear-gradient(135deg, ${colors[0]}40, ${colors[colors.length - 1]}80);">
                <i class="fas fa-palette" style="color: ${recipe.color || this.config.DEFAULT_COLOR};"></i>
            </div>
            <div class="recipe-content">
                <div class="recipe-header">
                    <div>
                        <h3 class="recipe-title">${Utils.escapeHTML(recipe.name)}</h3>
                        <span class="recipe-category">${Utils.escapeHTML(recipe.category)}</span>
                    </div>
                    <label class="recipe-select-label">
                        <input type="checkbox" class="recipe-select" value="${recipe.id}">
                        <span class="checkmark"></span>
                    </label>
                </div>
                <p class="recipe-description">${Utils.escapeHTML(recipe.description || 'Опис відсутній')}</p>
                <div class="recipe-meta">
                    <div>
                        <div class="meta-label">Інгредієнтів</div>
                        <div class="meta-value">${recipe.ingredients?.length || 0}</div>
                    </div>
                    <div>
                        <div class="meta-label">Вага</div>
                        <div class="meta-value">${totalWeight} г</div>
                    </div>
                    <div>
                        <div class="meta-label">Дата</div>
                        <div class="meta-value">${recipe.date}</div>
                    </div>
                </div>
                <div class="recipe-actions">
                    <button class="recipe-btn edit-recipe" data-id="${recipe.id}">
                        <i class="fas fa-edit"></i> Редагувати
                    </button>
                    <button class="recipe-btn delete-recipe" data-id="${recipe.id}">
                        <i class="fas fa-trash"></i> Видалити
                    </button>
                    <button class="recipe-btn export-recipe" data-id="${recipe.id}">
                        <i class="fas fa-download"></i> Експорт
                    </button>
                </div>
            </div>
        `;
        
        // Додавання обробників подій
        this.attachRecipeCardEventListeners(card, recipe.id);
        
        return card;
    },
    
    attachRecipeCardEventListeners(card, recipeId) {
        // Вибір рецепту
        const checkbox = card.querySelector('.recipe-select');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.state.selectedRecipes.push(recipeId);
            } else {
                this.state.selectedRecipes = this.state.selectedRecipes.filter(id => id !== recipeId);
            }
            this.updateRecipeSelectionInfo();
        });
        
        // Редагування
        card.querySelector('.edit-recipe').addEventListener('click', () => {
            this.editRecipe(recipeId);
        });
        
        // Видалення
        card.querySelector('.delete-recipe').addEventListener('click', () => {
            this.deleteRecipe(recipeId);
        });
        
        // Експорт
        card.querySelector('.export-recipe').addEventListener('click', () => {
            this.exportSingleRecipe(recipeId);
        });
    },
    
    updateRecipeSelectionInfo() {
        const infoElement = document.getElementById('recipesInfo');
        const infoText = document.getElementById('recipesInfoText');
        
        if (!infoElement || !infoText) return;
        
        if (this.state.selectedRecipes.length > 0) {
            infoText.textContent = `Обрано рецептів: ${this.state.selectedRecipes.length}`;
            infoElement.style.display = 'flex';
        } else {
            infoElement.style.display = 'none';
        }
    },
    
    editRecipe(recipeId) {
        const recipe = this.state.recipes.find(r => r.id === recipeId);
        if (!recipe) return;
        
        // Заповнення форми редагування
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeColor').value = recipe.color || this.config.DEFAULT_COLOR;
        document.getElementById('colorHex').value = recipe.color || this.config.DEFAULT_COLOR;
        document.getElementById('colorPreview').style.background = recipe.color || this.config.DEFAULT_COLOR;
        document.getElementById('recipeDescription').value = recipe.description || '';
        
        // Заповнення інгредієнтів
        this.state.selectedIngredients = [...recipe.ingredients];
        this.calculatePercentages();
        
        // Перехід на сторінку нового рецепту
        this.switchPage('new-recipe');
        
        // Зміна заголовка форми
        const pageTitle = document.querySelector('#new-recipe-page .page-title');
        if (pageTitle) {
            pageTitle.textContent = 'Редагування рецепту';
        }
        
        // Зміна дії кнопки збереження
        const saveBtn = this.elements.saveRecipeBtn;
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Оновити рецепт';
        saveBtn.onclick = () => this.updateRecipe(recipeId);
        
        // Зберігаємо оригінальний стан для відновлення
        saveBtn.dataset.original = originalText;
        saveBtn.dataset.recipeId = recipeId;
        
        this.showNotification('Рецепт завантажено для редагування', 'info');
    },
    
    updateRecipe(recipeId) {
        const recipeIndex = this.state.recipes.findIndex(r => r.id === recipeId);
        if (recipeIndex === -1) return;
        
        // Оновлення даних рецепту
        const name = document.getElementById('recipeName')?.value.trim();
        const category = document.getElementById('recipeCategory')?.value;
        const color = document.getElementById('recipeColor')?.value;
        const description = document.getElementById('recipeDescription')?.value.trim();
        
        this.state.recipes[recipeIndex] = {
            ...this.state.recipes[recipeIndex],
            name: Utils.escapeHTML(name),
            category: Utils.escapeHTML(category),
            color: color,
            description: Utils.escapeHTML(description || ''),
            ingredients: [...this.state.selectedIngredients],
            updatedAt: new Date().toISOString()
        };
        
        this.saveData();
        
        // Відновлення початкового стану форми
        this.resetRecipeForm();
        
        this.showNotification('Рецепт успішно оновлено!', 'success');
        this.switchPage('recipes');
    },
    
    resetRecipeForm() {
        // Відновлення кнопки збереження
        const saveBtn = this.elements.saveRecipeBtn;
        if (saveBtn.dataset.original) {
            saveBtn.innerHTML = saveBtn.dataset.original;
            delete saveBtn.dataset.original;
            delete saveBtn.dataset.recipeId;
            saveBtn.onclick = () => this.saveRecipe();
        }
        
        // Відновлення заголовка
        const pageTitle = document.querySelector('#new-recipe-page .page-title');
        if (pageTitle) {
            pageTitle.textContent = 'Новий рецепт';
        }
        
        // Скидання форми
        this.clearRecipeForm();
    },
    
    deleteRecipe(recipeId) {
        this.showConfirmation(
            'Видалення рецепту',
            'Ви впевнені, що хочете видалити цей рецепт? Цю дію неможливо скасувати.',
            () => {
                this.state.recipes = this.state.recipes.filter(r => r.id !== recipeId);
                this.saveData();
                this.renderRecipesPage();
                this.showNotification('Рецепт видалено', 'success');
            }
        );
    },
    
    deleteSelectedRecipes() {
        if (this.state.selectedRecipes.length === 0) {
            this.showNotification('Оберіть рецепти для видалення', 'warning');
            return;
        }
        
        this.showConfirmation(
            'Видалення рецептів',
            `Ви впевнені, що хочете видалити ${this.state.selectedRecipes.length} рецептів? Цю дію неможливо скасувати.`,
            () => {
                this.state.recipes = this.state.recipes.filter(r => !this.state.selectedRecipes.includes(r.id));
                this.state.selectedRecipes = [];
                this.saveData();
                this.renderRecipesPage();
                this.showNotification(`Видалено ${this.state.selectedRecipes.length} рецептів`, 'success');
            }
        );
    },
    
    exportSingleRecipe(recipeId) {
        const recipe = this.state.recipes.find(r => r.id === recipeId);
        if (!recipe) return;
        
        const dataStr = JSON.stringify(recipe, null, 2);
        const fileName = `${recipe.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        
        Utils.downloadFile(dataStr, fileName, 'application/json');
        this.showNotification(`Рецепт "${recipe.name}" експортовано`, 'success');
    },
    
    exportRecipes() {
        if (this.state.recipes.length === 0) {
            this.showNotification('Немає рецептів для експорту', 'warning');
            return;
        }
        
        const format = document.getElementById('exportFormat')?.value || 'json';
        const exportRecipes = document.getElementById('exportRecipesCheckbox')?.checked;
        const exportPaints = document.getElementById('exportPaintsCheckbox')?.checked;
        
        let data = {};
        let fileName = `sico_mix_export_${new Date().toISOString().slice(0, 10)}`;
        
        if (exportRecipes) {
            data.recipes = this.state.recipes;
        }
        
        if (exportPaints) {
            data.paints = this.state.paints;
        }
        
        if (format === 'json') {
            const dataStr = JSON.stringify(data, null, 2);
            Utils.downloadFile(dataStr, `${fileName}.json`, 'application/json');
        } else if (format === 'csv') {
            // Конвертація в CSV
            let csvData = '';
            
            if (exportRecipes) {
                csvData += 'Рецепти\n';
                csvData += 'Назва,Категорія,Колір,Опис,Дата,Інгредієнти\n';
                this.state.recipes.forEach(recipe => {
                    const ingredients = recipe.ingredients?.map(ing => {
                        const paint = this.state.paints.find(p => p.id === ing.paintId);
                        return `${paint?.name || 'Невідома фарба'}: ${ing.amount}${ing.unit} (${ing.percentage}%)`;
                    }).join('; ') || '';
                    
                    csvData += `"${recipe.name}","${recipe.category}","${recipe.color}","${recipe.description || ''}","${recipe.date}","${ingredients}"\n`;
                });
            }
            
            if (exportPaints) {
                csvData += '\nФарби\n';
                csvData += 'Назва,Категорія,Колір,Виробник,Артикул,Опис\n';
                this.state.paints.forEach(paint => {
                    csvData += `"${paint.name}","${paint.category}","${paint.color}","${paint.manufacturer || ''}","${paint.article || ''}","${paint.description || ''}"\n`;
                });
            }
            
            Utils.downloadFile(csvData, `${fileName}.csv`, 'text/csv');
        }
        
        this.showNotification('Дані успішно експортовано', 'success');
    },
    
    importRecipes() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json,.csv';
        
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Перевірка розміру файлу
            if (file.size > this.config.MAX_FILE_SIZE) {
                this.showNotification('Файл занадто великий. Максимальний розмір: 10MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target.result;
                    const isCSV = file.name.toLowerCase().endsWith('.csv');
                    
                    let importedData;
                    
                    if (isCSV) {
                        importedData = Utils.parseCSV(content);
                    } else {
                        importedData = JSON.parse(content);
                    }
                    
                    this.processImportedData(importedData, isCSV);
                } catch (error) {
                    console.error('Помилка читання файлу:', error);
                    this.showNotification('Помилка читання файлу. Перевірте формат.', 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        fileInput.click();
    },
    
    processImportedData(data, isCSV) {
        if (isCSV) {
            // Обробка CSV даних
            this.showNotification('Імпорт CSV в розробці', 'info');
            return;
        }
        
        // Обробка JSON даних
        const importRecipes = document.getElementById('importRecipesCheckbox')?.checked;
        const importPaints = document.getElementById('importPaintsCheckbox')?.checked;
        
        let importedCount = 0;
        
        if (importRecipes && data.recipes && Array.isArray(data.recipes)) {
            data.recipes.forEach(recipe => {
                // Генерація нового ID для уникнення конфліктів
                recipe.id = Date.now() + Math.random();
                recipe.createdAt = recipe.createdAt || new Date().toISOString();
                recipe.updatedAt = new Date().toISOString();
                this.state.recipes.push(recipe);
                importedCount++;
            });
        }
        
        if (importPaints && data.paints && Array.isArray(data.paints)) {
            data.paints.forEach(paint => {
                paint.id = Date.now() + Math.random();
                this.state.paints.push(paint);
                importedCount++;
            });
        }
        
        if (importedCount > 0) {
            this.saveData();
            this.showNotification(`Успішно імпортовано ${importedCount} елементів`, 'success');
            
            // Оновлення інтерфейсу
            if (importRecipes) this.renderRecipesPage();
            if (importPaints) this.renderCatalogPage();
        } else {
            this.showNotification('Не знайдено даних для імпорту', 'warning');
        }
    },
    
    printRecipes() {
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Друк рецептів - SICO MIX</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #4361ee; }
                    .recipe { margin-bottom: 30px; padding: 15px; border: 1px solid #ddd; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f5f5f5; }
                    .print-date { margin-bottom: 20px; color: #666; }
                </style>
            </head>
            <body>
                <h1>Рецепти SICO MIX</h1>
                <div class="print-date">Дата друку: ${new Date().toLocaleDateString('uk-UA')}</div>
                ${this.state.recipes.map(recipe => {
                    const totalWeight = recipe.ingredients?.reduce((sum, ing) => sum + ing.amount, 0) || 0;
                    return `
                        <div class="recipe">
                            <h2>${Utils.escapeHTML(recipe.name)}</h2>
                            <p><strong>Категорія:</strong> ${Utils.escapeHTML(recipe.category)}</p>
                            <p><strong>Дата створення:</strong> ${recipe.date}</p>
                            <p><strong>Опис:</strong> ${Utils.escapeHTML(recipe.description || '—')}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Фарба</th>
                                        <th>Кількість</th>
                                        <th>Одиниці</th>
                                        <th>Відсоток</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${recipe.ingredients?.map(ing => {
                                        const paint = this.state.paints.find(p => p.id === ing.paintId);
                                        return `
                                            <tr>
                                                <td>${paint ? Utils.escapeHTML(paint.name) : 'Невідома фарба'}</td>
                                                <td>${ing.amount}</td>
                                                <td>${ing.unit}</td>
                                                <td>${ing.percentage || 0}%</td>
                                            </tr>
                                        `;
                                    }).join('') || ''}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4"><strong>Загальна вага:</strong> ${totalWeight} г</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    `;
                }).join('')}
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    },
    
    // ========== КАТАЛОГ ФАРБ ==========
    renderCatalogPage() {
        const searchTerm = this.elements.catalogSearch?.value.toLowerCase() || '';
        
        // Фільтрація фарб
        let filteredPaints = [...this.state.paints];
        
        if (searchTerm) {
            filteredPaints = filteredPaints.filter(paint => 
                paint.name.toLowerCase().includes(searchTerm) ||
                paint.category.toLowerCase().includes(searchTerm) ||
                (paint.description?.toLowerCase() || '').includes(searchTerm) ||
                (paint.manufacturer?.toLowerCase() || '').includes(searchTerm) ||
                (paint.article?.toLowerCase() || '').includes(searchTerm)
            );
        }
        
        // Рендер карток
        this.renderPaintCards(filteredPaints);
        
        // Оновлення інформації про вибір
        this.updatePaintSelectionInfo();
    },
    
    renderPaintCards(paints) {
        const container = this.elements.paintCatalog;
        if (!container) return;
        
        container.innerHTML = '';
        
        if (paints.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-paint-brush"></i>
                    <h3>Фарб не знайдено</h3>
                    <p>${this.elements.catalogSearch?.value ? 'Спробуйте змінити пошуковий запит' : 'Додайте першу фарбу до каталогу!'}</p>
                    <button class="btn btn-primary" onclick="SicoMixApp.showAddPaintModal()">
                        <i class="fas fa-plus"></i> Додати фарбу
                    </button>
                </div>
            `;
            return;
        }
        
        paints.forEach(paint => {
            const card = this.createPaintCard(paint);
            container.appendChild(card);
        });
    },
    
    createPaintCard(paint) {
        const card = document.createElement('div');
        card.className = 'paint-card';
        card.setAttribute('data-id', paint.id);
        
        card.innerHTML = `
            <div class="paint-color" style="background: ${paint.color || this.config.DEFAULT_PAINT_COLOR};"></div>
            <div class="paint-content">
                <div class="paint-header">
                    <div>
                        <h3 class="paint-title">${Utils.escapeHTML(paint.name)}</h3>
                        <span class="paint-category">${Utils.escapeHTML(paint.category)}</span>
                    </div>
                    <label class="paint-select-label">
                        <input type="checkbox" class="paint-select" value="${paint.id}">
                        <span class="checkmark"></span>
                    </label>
                </div>
                ${paint.description ? `<p class="paint-description">${Utils.escapeHTML(paint.description)}</p>` : ''}
                <div class="paint-meta">
                    <div>
                        <div class="meta-label">Виробник</div>
                        <div class="meta-value">${Utils.escapeHTML(paint.manufacturer || '—')}</div>
                    </div>
                    <div>
                        <div class="meta-label">Артикул</div>
                        <div class="meta-value">${Utils.escapeHTML(paint.article || '—')}</div>
                    </div>
                    <div>
                        <div class="meta-label">Колір</div>
                        <div class="meta-value color-value" style="color: ${paint.color}">${paint.color}</div>
                    </div>
                </div>
                <div class="paint-actions">
                    <button class="paint-btn edit-paint" data-id="${paint.id}">
                        <i class="fas fa-edit"></i> Редагувати
                    </button>
                    <button class="paint-btn delete-paint" data-id="${paint.id}">
                        <i class="fas fa-trash"></i> Видалити
                    </button>
                </div>
            </div>
        `;
        
        // Додавання обробників подій
        this.attachPaintCardEventListeners(card, paint.id);
        
        return card;
    },
    
    attachPaintCardEventListeners(card, paintId) {
        // Вибір фарби
        const checkbox = card.querySelector('.paint-select');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.state.selectedPaints.push(paintId);
            } else {
                this.state.selectedPaints = this.state.selectedPaints.filter(id => id !== paintId);
            }
            this.updatePaintSelectionInfo();
        });
        
        // Редагування
        card.querySelector('.edit-paint').addEventListener('click', () => {
            this.editPaint(paintId);
        });
        
        // Видалення
        card.querySelector('.delete-paint').addEventListener('click', () => {
            this.deletePaint(paintId);
        });
    },
    
    updatePaintSelectionInfo() {
        const infoElement = document.getElementById('paintInfo');
        const infoText = document.getElementById('paintInfoText');
        const deleteBtn = this.elements.deleteSelectedPaintsBtn;
        
        if (!infoElement || !infoText || !deleteBtn) return;
        
        if (this.state.selectedPaints.length > 0) {
            infoText.textContent = `Обрано фарб: ${this.state.selectedPaints.length}`;
            infoElement.style.display = 'flex';
            deleteBtn.style.display = 'flex';
        } else {
            infoElement.style.display = 'none';
            deleteBtn.style.display = 'none';
        }
    },
    
    showAddPaintModal(paintId = null) {
        const modal = this.elements.addPaintModal;
        const title = modal.querySelector('.modal-title');
        const form = document.getElementById('addPaintForm');
        const paintIdInput = form.querySelector('#paintId');
        const paint