// ========== ГОЛОВНИЙ МОДУЛЬ ЗАСТОСУНКУ ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const data = SICOMIX.data;
    const i18n = SICOMIX.i18n;
    const utils = SICOMIX.utils;

    // Стан застосунку
    let state = {
        paints: [],
        recipes: [],
        settings: { ...data.defaultSettings },
        currentRecipe: null, // для редагування
        ingredients: []      // поточний список інгредієнтів у формі
    };

    // DOM елементи
    const elements = {};

    function init() {
        console.log('SICOMIX.app.init()');
        cacheElements();
        loadState();
        setupEventListeners();
        setupNavigation();
        updatePaintCounts();
        renderCategories();
        renderCatalog();
        renderRecipes();
        applySettingsToUI();
        hidePreloader();
    }

    function cacheElements() {
        elements.preloader = document.getElementById('preloader');
        elements.sidebar = document.getElementById('sidebar');
        elements.menuToggle = document.getElementById('menuToggle');
        elements.desktopMenuToggle = document.getElementById('desktopMenuToggle');
        elements.closeSidebar = document.getElementById('closeSidebar');
        elements.mainContainer = document.getElementById('mainContainer');
        elements.totalPaints = document.getElementById('totalPaints');
        elements.headerPaintCount = document.getElementById('headerPaintCount');

        // Сторінки
        elements.pages = document.querySelectorAll('.page-content');
        elements.navLinks = document.querySelectorAll('[data-page]');

        // Новий рецепт
        elements.recipeName = document.getElementById('recipeName');
        elements.recipeCategory = document.getElementById('recipeCategory');
        elements.recipeColor = document.getElementById('recipeColor');
        elements.colorPreview = document.getElementById('colorPreview');
        elements.recipeDescription = document.getElementById('recipeDescription');
        elements.recipePhoto = document.getElementById('recipePhoto');
        elements.fileName = document.getElementById('fileName');
        elements.paintSearch = document.getElementById('paintSearch');
        elements.categoryFilter = document.getElementById('categoryFilter');
        elements.ingredientsList = document.getElementById('ingredientsList');
        elements.addIngredientBtn = document.getElementById('addIngredientBtn');
        elements.saveRecipeBtn = document.getElementById('saveRecipeBtn');
        elements.calculatePercentagesBtn = document.getElementById('calculatePercentagesBtn');
        elements.clearRecipeBtn = document.getElementById('clearRecipeBtn');

        // Рецепти
        elements.recipeSearch = document.getElementById('recipeSearch');
        elements.recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
        elements.importRecipesBtn = document.getElementById('importRecipesBtn');
        elements.exportRecipesBtn = document.getElementById('exportRecipesBtn');
        elements.printRecipesBtn = document.getElementById('printRecipesBtn');
        elements.deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
        elements.recipesContainer = document.getElementById('recipesContainer');

        // Каталог
        elements.catalogSearch = document.getElementById('catalogSearch');
        elements.addNewPaintBtn = document.getElementById('addNewPaintBtn');
        elements.paintCatalog = document.getElementById('paintCatalog');

        // Імпорт/Експорт
        elements.importFormat = document.getElementById('importFormat');
        elements.importFile = document.getElementById('importFile');
        elements.importFileName = document.getElementById('importFileName');
        elements.importRecipesCheckbox = document.getElementById('importRecipesCheckbox');
        elements.importPaintsCheckbox = document.getElementById('importPaintsCheckbox');
        elements.startImportBtn = document.getElementById('startImportBtn');
        elements.exportFormat = document.getElementById('exportFormat');
        elements.exportRecipesCheckbox = document.getElementById('exportRecipesCheckbox');
        elements.exportPaintsCheckbox = document.getElementById('exportPaintsCheckbox');
        elements.exportCalculationsCheckbox = document.getElementById('exportCalculationsCheckbox');
        elements.includePhotosCheckbox = document.getElementById('includePhotosCheckbox');
        elements.compressDataCheckbox = document.getElementById('compressDataCheckbox');
        elements.startExportBtn = document.getElementById('startExportBtn');

        // Налаштування
        elements.languageSelect = document.getElementById('languageSelect');
        elements.unitsSelect = document.getElementById('unitsSelect');
        elements.autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
        elements.backupCheckbox = document.getElementById('backupCheckbox');
        elements.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        elements.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        elements.clearAllDataBtn = document.getElementById('clearAllDataBtn');

        // Модальні вікна
        elements.addPaintModal = document.getElementById('addPaintModal');
        elements.closePaintModal = document.getElementById('closePaintModal');
        elements.paintName = document.getElementById('paintName');
        elements.paintCategory = document.getElementById('paintCategory');
        elements.paintColorCode = document.getElementById('paintColorCode');
        elements.paintDescription = document.getElementById('paintDescription');
        elements.paintManufacturer = document.getElementById('paintManufacturer');
        elements.paintArticle = document.getElementById('paintArticle');
        elements.savePaintBtn = document.getElementById('savePaintBtn');
        elements.cancelPaintBtn = document.getElementById('cancelPaintBtn');

        elements.confirmationModal = document.getElementById('confirmationModal');
        elements.closeConfirmationModal = document.getElementById('closeConfirmationModal');
        elements.confirmActionBtn = document.getElementById('confirmActionBtn');
        elements.cancelActionBtn = document.getElementById('cancelActionBtn');

        elements.paintSelectionModal = document.getElementById('paintSelectionModal');
        elements.paintSelectionList = document.getElementById('paintSelectionList');
        document.querySelectorAll('.close-paint-selection').forEach(btn => {
            btn.addEventListener('click', () => closeModal(elements.paintSelectionModal));
        });

        elements.seriesDetailsModal = document.getElementById('seriesDetailsModal');
        elements.seriesDetailsContent = document.getElementById('seriesDetailsContent');
        document.querySelectorAll('.close-series-details').forEach(btn => {
            btn.addEventListener('click', () => closeModal(elements.seriesDetailsModal));
        });

        // Колір
        if (elements.recipeColor) {
            elements.recipeColor.addEventListener('input', (e) => {
                if (elements.colorPreview) elements.colorPreview.style.backgroundColor = e.target.value;
            });
        }
    }

    function hidePreloader() {
        if (elements.preloader) {
            elements.preloader.style.opacity = '0';
            setTimeout(() => {
                elements.preloader.style.display = 'none';
            }, 500);
        }
    }

    function loadState() {
        // Завантажуємо фарби: стандартні + користувацькі
        const defaultPaints = data.paints || [];
        const userPaints = utils.loadFromLocalStorage('sico_userPaints', []);
        state.paints = [...defaultPaints, ...userPaints];

        // Завантажуємо рецепти
        state.recipes = utils.loadFromLocalStorage('sico_recipes', []);

        // Завантажуємо налаштування
        const savedSettings = utils.loadFromLocalStorage('sico_settings', {});
        state.settings = { ...data.defaultSettings, ...savedSettings };
    }

    function saveState() {
        // Зберігаємо тільки користувацькі фарби (без стандартних)
        const defaultIds = new Set(data.paints.map(p => p.id));
        const userPaints = state.paints.filter(p => !defaultIds.has(p.id));
        utils.saveToLocalStorage('sico_userPaints', userPaints);
        utils.saveToLocalStorage('sico_recipes', state.recipes);
        utils.saveToLocalStorage('sico_settings', state.settings);
    }

    function updatePaintCounts() {
        const count = state.paints.length;
        if (elements.totalPaints) elements.totalPaints.textContent = count;
        if (elements.headerPaintCount) elements.headerPaintCount.textContent = count;
    }

    function setupNavigation() {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.dataset.page;
                showPage(pageId);
                if (window.innerWidth <= 992) {
                    closeSidebar();
                }
            });
        });
    }

    function showPage(pageId) {
        elements.pages.forEach(page => page.classList.remove('active'));
        const target = document.getElementById(pageId + '-page');
        if (target) target.classList.add('active');

        elements.navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Оновлюємо вміст залежно від сторінки
        if (pageId === 'catalog') renderCatalog();
        if (pageId === 'recipes') renderRecipes();
    }

    function closeSidebar() {
        elements.sidebar.classList.remove('active');
        elements.mainContainer.classList.remove('sidebar-open');
    }

    function openSidebar() {
        elements.sidebar.classList.add('active');
        elements.mainContainer.classList.add('sidebar-open');
    }

    function setupEventListeners() {
        // Меню
        if (elements.menuToggle) elements.menuToggle.addEventListener('click', openSidebar);
        if (elements.desktopMenuToggle) elements.desktopMenuToggle.addEventListener('click', openSidebar);
        if (elements.closeSidebar) elements.closeSidebar.addEventListener('click', closeSidebar);

        // Новий рецепт
        if (elements.addIngredientBtn) elements.addIngredientBtn.addEventListener('click', openPaintSelection);
        if (elements.saveRecipeBtn) elements.saveRecipeBtn.addEventListener('click', saveRecipe);
        if (elements.calculatePercentagesBtn) elements.calculatePercentagesBtn.addEventListener('click', calculatePercentages);
        if (elements.clearRecipeBtn) elements.clearRecipeBtn.addEventListener('click', clearRecipeForm);
        if (elements.paintSearch) elements.paintSearch.addEventListener('input', utils.debounce(filterPaints, 300));
        if (elements.categoryFilter) elements.categoryFilter.addEventListener('change', filterPaints);

        // Каталог
        if (elements.addNewPaintBtn) elements.addNewPaintBtn.addEventListener('click', openAddPaintModal);
        if (elements.catalogSearch) elements.catalogSearch.addEventListener('input', utils.debounce(renderCatalog, 300));

        // Модалка додавання фарби
        if (elements.closePaintModal) elements.closePaintModal.addEventListener('click', () => closeModal(elements.addPaintModal));
        if (elements.cancelPaintBtn) elements.cancelPaintBtn.addEventListener('click', () => closeModal(elements.addPaintModal));
        if (elements.savePaintBtn) elements.savePaintBtn.addEventListener('click', addNewPaint);

        // Рецепти
        if (elements.recipeSearch) elements.recipeSearch.addEventListener('input', utils.debounce(renderRecipes, 300));
        if (elements.recipeCategoryFilter) elements.recipeCategoryFilter.addEventListener('change', renderRecipes);
        if (elements.importRecipesBtn) elements.importRecipesBtn.addEventListener('click', () => showPage('import'));
        if (elements.exportRecipesBtn) elements.exportRecipesBtn.addEventListener('click', exportRecipes);
        if (elements.printRecipesBtn) elements.printRecipesBtn.addEventListener('click', printRecipes);
        if (elements.deleteSelectedRecipesBtn) elements.deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);

        // Імпорт/Експорт
        if (elements.importFile) elements.importFile.addEventListener('change', handleImportFileSelect);
        if (elements.startImportBtn) elements.startImportBtn.addEventListener('click', startImport);
        if (elements.startExportBtn) elements.startExportBtn.addEventListener('click', startExport);

        // Налаштування
        if (elements.languageSelect) elements.languageSelect.addEventListener('change', changeLanguage);
        if (elements.saveSettingsBtn) elements.saveSettingsBtn.addEventListener('click', saveSettings);
        if (elements.resetSettingsBtn) elements.resetSettingsBtn.addEventListener('click', resetSettings);
        if (elements.clearAllDataBtn) elements.clearAllDataBtn.addEventListener('click', clearAllData);

        // Закриття модалок по кліку на фон
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
    }

    function renderCategories() {
        const cats = data.categories || [];
        const selects = [
            elements.recipeCategory,
            elements.categoryFilter,
            elements.recipeCategoryFilter,
            elements.paintCategory
        ];
        selects.forEach(select => {
            if (!select) return;
            const currentValue = select.value;
            select.innerHTML = '<option value="" data-i18n="select_category">Оберіть категорію</option>';
            cats.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = i18n.translateCategory(cat);
                select.appendChild(option);
            });
            if (currentValue) select.value = currentValue;
        });
        i18n.applyTranslations();
    }

    function renderCatalog() {
        if (!elements.paintCatalog) return;
        const search = elements.catalogSearch?.value.toLowerCase() || '';
        const filtered = state.paints.filter(p => 
            p.name.toLowerCase().includes(search) || 
            (p.displayName?.[i18n.getLanguage()] || '').toLowerCase().includes(search)
        );

        if (filtered.length === 0) {
            elements.paintCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('catalog_empty')}</p>`;
            return;
        }

        elements.paintCatalog.innerHTML = filtered.map(paint => {
            const isDefault = paint.isDefault === true;
            const lang = i18n.getLanguage();
            const displayName = paint.displayName?.[lang] || paint.name;
            const desc = paint.description?.[lang] || '';
            const color = paint.color || '#cccccc';
            const seriesId = paint.series || '';

            return `
                <div class="paint-card ${isDefault ? 'locked' : ''}" data-id="${paint.id}">
                    <div class="paint-color" style="background: ${color};"></div>
                    <div class="paint-info">
                        <div class="paint-name">${displayName}</div>
                        <span class="paint-series-badge">${seriesId}</span>
                        <div class="paint-article">${paint.article || ''}</div>
                        <div class="paint-actions">
                            <button class="btn-series-info" title="Інформація про серію" data-series="${seriesId}"><i class="fas fa-info-circle"></i></button>
                            ${!isDefault ? `<button class="btn-delete" title="Видалити" data-id="${paint.id}"><i class="fas fa-trash"></i></button>` : ''}
                        </div>
                    </div>
                    ${isDefault ? '<div class="default-badge"><i class="fas fa-lock"></i> ' + i18n.t('default_paint') + '</div>' : ''}
                </div>
            `;
        }).join('');

        // Додаємо слухачі для кнопок
        document.querySelectorAll('.btn-series-info').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const seriesId = btn.dataset.series;
                showSeriesDetails(seriesId);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                confirmDeletePaint(id);
            });
        });
    }

    function showSeriesDetails(seriesId) {
        const series = data.series.find(s => s.id === seriesId);
        if (!series) return;

        const lang = i18n.getLanguage();
        const props = series.properties || {};
        let html = `<div style="padding:10px;"><h3>${series.name[lang]}</h3>`;
        html += `<p>${series.description[lang]}</p>`;
        html += '<ul class="series-properties">';
        for (let key in props) {
            const val = props[key][lang];
            if (val) {
                html += `<li><strong>${key}:</strong> ${val}</li>`;
            }
        }
        html += '</ul></div>';
        elements.seriesDetailsContent.innerHTML = html;
        openModal(elements.seriesDetailsModal);
    }

    function confirmDeletePaint(id) {
        const paint = state.paints.find(p => p.id === id);
        if (!paint) return;
        utils.showConfirmation(
            i18n.t('delete_paint'),
            i18n.t('delete_paint_confirmation'),
            () => deletePaint(id)
        );
    }

    function deletePaint(id) {
        state.paints = state.paints.filter(p => p.id !== id);
        saveState();
        renderCatalog();
        updatePaintCounts();
        utils.showNotification(i18n.t('paint_deleted'), 'success');
    }

    function openAddPaintModal() {
        elements.paintName.value = '';
        elements.paintCategory.value = '';
        elements.paintColorCode.value = '#3a86ff';
        elements.paintDescription.value = '';
        elements.paintManufacturer.value = 'SICO';
        elements.paintArticle.value = '';
        openModal(elements.addPaintModal);
    }

    function addNewPaint() {
        const name = elements.paintName.value.trim();
        const category = elements.paintCategory.value;
        const colorCode = elements.paintColorCode.value.trim() || '#3a86ff';
        const description = elements.paintDescription.value.trim();
        const manufacturer = elements.paintManufacturer.value.trim() || 'SICO';
        const article = elements.paintArticle.value.trim();

        if (!name || !category) {
            utils.showNotification(i18n.t('fill_required_fields'), 'error');
            return;
        }

        const newPaint = {
            id: utils.generateId(),
            name: name,
            series: '',
            baseColorCode: '',
            category: category,
            color: colorCode,
            manufacturer: manufacturer,
            article: article,
            isDefault: false,
            displayName: { uk: name, en: name, pl: name },
            description: { uk: description, en: description, pl: description },
            fullInfo: { uk: name, en: name, pl: name },
            colorName: { uk: name, en: name, pl: name }
        };

        state.paints.push(newPaint);
        saveState();
        closeModal(elements.addPaintModal);
        renderCatalog();
        updatePaintCounts();
        utils.showNotification(i18n.t('paint_added'), 'success');
    }

    function openPaintSelection() {
        renderPaintSelectionList();
        openModal(elements.paintSelectionModal);
    }

    function renderPaintSelectionList() {
        const search = elements.paintSearch?.value.toLowerCase() || '';
        const category = elements.categoryFilter?.value || '';
        let filtered = state.paints.filter(p => 
            (p.name.toLowerCase().includes(search) || (p.displayName?.[i18n.getLanguage()] || '').toLowerCase().includes(search)) &&
            (category === '' || p.category === category)
        );

        if (filtered.length === 0) {
            elements.paintSelectionList.innerHTML = `<p style="padding:20px;">${i18n.t('paints_not_found')}</p>`;
            return;
        }

        elements.paintSelectionList.innerHTML = filtered.map(paint => {
            const lang = i18n.getLanguage();
            const displayName = paint.displayName?.[lang] || paint.name;
            return `
                <div class="paint-selection-card" data-id="${paint.id}">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:30px;height:30px;background:${paint.color};border-radius:6px;"></div>
                        <div><strong>${displayName}</strong> (${paint.article || ''})</div>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.paint-selection-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                addIngredientToRecipe(id);
                closeModal(elements.paintSelectionModal);
            });
        });
    }

    function addIngredientToRecipe(paintId) {
        const paint = state.paints.find(p => p.id === paintId);
        if (!paint) return;
        // Перевірка, чи вже є така фарба
        if (state.ingredients.some(ing => ing.paintId === paintId)) {
            utils.showNotification(i18n.t('paint_already_added'), 'warning');
            return;
        }
        state.ingredients.push({
            paintId: paintId,
            paintName: paint.displayName?.[i18n.getLanguage()] || paint.name,
            amount: 0,
            unit: 'г',
            percentage: 0
        });
        renderIngredientsTable();
    }

    function renderIngredientsTable() {
        if (!elements.ingredientsList) return;
        if (state.ingredients.length === 0) {
            elements.ingredientsList.innerHTML = '<tr><td colspan="5" style="text-align:center;">Немає інгредієнтів</td></tr>';
            return;
        }

        elements.ingredientsList.innerHTML = state.ingredients.map((ing, index) => {
            return `
                <tr>
                    <td>${ing.paintName}</td>
                    <td><input type="number" class="input-small" data-index="${index}" value="${ing.amount}" step="0.1" min="0"></td>
                    <td>
                        <select class="unit-select" data-index="${index}">
                            <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>г</option>
                            <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>кг</option>
                            <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>мл</option>
                            <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>л</option>
                            <option value="%" ${ing.unit === '%' ? 'selected' : ''}>%</option>
                        </select>
                    </td>
                    <td>${ing.percentage}%</td>
                    <td><button class="btn-icon remove-ingredient" data-index="${index}"><i class="fas fa-times"></i></button></td>
                </tr>
            `;
        }).join('');

        // Додаємо слухачі
        document.querySelectorAll('.input-small').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.dataset.index;
                state.ingredients[index].amount = parseFloat(e.target.value) || 0;
            });
        });

        document.querySelectorAll('.unit-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                state.ingredients[index].unit = e.target.value;
            });
        });

        document.querySelectorAll('.remove-ingredient').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                state.ingredients.splice(index, 1);
                renderIngredientsTable();
            });
        });
    }

    function calculatePercentages() {
        const total = state.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
        if (total === 0) {
            utils.showNotification('Сума кількостей дорівнює 0', 'error');
            return;
        }
        state.ingredients = state.ingredients.map(ing => ({
            ...ing,
            percentage: parseFloat(((ing.amount / total) * 100).toFixed(1))
        }));
        renderIngredientsTable();
    }

    function saveRecipe() {
        const name = elements.recipeName?.value.trim();
        const category = elements.recipeCategory?.value;
        const color = elements.recipeColor?.value || '#3a86ff';
        const description = elements.recipeDescription?.value.trim();
        const photo = elements.recipePhoto?.files[0]; // поки не обробляємо

        if (!name || !category || state.ingredients.length === 0) {
            utils.showNotification(i18n.t('fill_required_fields'), 'error');
            return;
        }

        const newRecipe = {
            id: utils.generateId(),
            name: name,
            category: category,
            color: color,
            description: description,
            ingredients: state.ingredients.map(ing => ({ ...ing })), // копія
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        state.recipes.push(newRecipe);
        saveState();
        clearRecipeForm();
        showPage('recipes');
        renderRecipes();
        utils.showNotification(i18n.t('recipe_saved'), 'success');
    }

    function clearRecipeForm() {
        elements.recipeName.value = '';
        elements.recipeCategory.value = '';
        elements.recipeColor.value = '#3a86ff';
        elements.colorPreview.style.backgroundColor = '#3a86ff';
        elements.recipeDescription.value = '';
        elements.recipePhoto.value = '';
        elements.fileName.textContent = i18n.t('upload_photo');
        state.ingredients = [];
        renderIngredientsTable();
    }

    // ========== ВИПРАВЛЕНО: додано перевірку на ingredients ==========
    function renderRecipes() {
        if (!elements.recipesContainer) return;
        const search = elements.recipeSearch?.value.toLowerCase() || '';
        const category = elements.recipeCategoryFilter?.value || '';
        const filtered = state.recipes.filter(r => 
            r.name.toLowerCase().includes(search) &&
            (category === '' || r.category === category)
        );

        if (filtered.length === 0) {
            elements.recipesContainer.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_recipes')}</p>`;
            return;
        }

        elements.recipesContainer.innerHTML = filtered.map(recipe => {
            // ✅ гарантуємо, що ingredients - масив
            const ingredients = recipe.ingredients || [];
            const total = ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
            return `
                <div class="recipe-card" data-id="${recipe.id}">
                    <div class="recipe-image" style="background: ${recipe.color};"></div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <h3 class="recipe-title">${recipe.name}</h3>
                            <span class="recipe-category">${i18n.translateCategory(recipe.category)}</span>
                        </div>
                        <p class="recipe-description">${recipe.description || i18n.t('no_description')}</p>
                        <div class="recipe-meta">
                            <span><i class="fas fa-flask"></i> ${ingredients.length} ${i18n.t('ingredients_count')}</span>
                            <span><i class="fas fa-weight-hanging"></i> ${total} г</span>
                            <span><i class="fas fa-calendar"></i> ${new Date(recipe.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn edit-recipe" data-id="${recipe.id}"><i class="fas fa-edit"></i> ${i18n.t('edit')}</button>
                            <button class="recipe-btn delete-recipe" data-id="${recipe.id}"><i class="fas fa-trash"></i> ${i18n.t('delete')}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.edit-recipe').forEach(btn => {
            btn.addEventListener('click', () => editRecipe(btn.dataset.id));
        });

        document.querySelectorAll('.delete-recipe').forEach(btn => {
            btn.addEventListener('click', () => confirmDeleteRecipe(btn.dataset.id));
        });
    }

    function editRecipe(id) {
        const recipe = state.recipes.find(r => r.id === id);
        if (!recipe) return;
        // Заповнити форму
        elements.recipeName.value = recipe.name;
        elements.recipeCategory.value = recipe.category;
        elements.recipeColor.value = recipe.color;
        elements.colorPreview.style.backgroundColor = recipe.color;
        elements.recipeDescription.value = recipe.description || '';
        state.ingredients = (recipe.ingredients || []).map(ing => ({ ...ing }));
        renderIngredientsTable();
        showPage('new-recipe');
    }

    function confirmDeleteRecipe(id) {
        utils.showConfirmation(
            i18n.t('delete_recipe'),
            i18n.t('delete_recipe_confirmation'),
            () => deleteRecipe(id)
        );
    }

    function deleteRecipe(id) {
        state.recipes = state.recipes.filter(r => r.id !== id);
        saveState();
        renderRecipes();
        utils.showNotification(i18n.t('recipe_deleted'), 'success');
    }

    function deleteSelectedRecipes() {
        // Спрощено: видаляємо всі (для демонстрації)
        if (state.recipes.length === 0) return;
        utils.showConfirmation(
            i18n.t('delete_recipes'),
            i18n.t('delete_recipes_confirmation') + ' ' + state.recipes.length + '?',
            () => {
                state.recipes = [];
                saveState();
                renderRecipes();
                utils.showNotification(i18n.t('deleted'), 'success');
            }
        );
    }

    function exportRecipes() {
        if (state.recipes.length === 0) {
            utils.showNotification(i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        const dataStr = JSON.stringify(state.recipes, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sico_recipes_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        utils.showNotification(i18n.t('recipe_exported'), 'success');
    }

    function printRecipes() {
        window.print(); // простий друк
    }

    function handleImportFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            elements.importFileName.textContent = file.name;
        }
    }

    function startImport() {
        const file = elements.importFile.files[0];
        if (!file) {
            utils.showNotification('Виберіть файл', 'error');
            return;
        }
        const format = elements.importFormat.value;
        if (format !== 'json') {
            utils.showNotification(i18n.t('feature_in_development'), 'warning');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (elements.importRecipesCheckbox.checked && Array.isArray(imported)) {
                    state.recipes = [...state.recipes, ...imported];
                }
                // імпорт фарб пропущено для простоти
                saveState();
                renderRecipes();
                utils.showNotification(i18n.t('imported'), 'success');
                closeModal(elements.importPage); // умовно
            } catch (err) {
                utils.showNotification(i18n.t('invalid_file_format'), 'error');
            }
        };
        reader.readAsText(file);
    }

    function startExport() {
        const format = elements.exportFormat.value;
        if (format !== 'json') {
            utils.showNotification(i18n.t('feature_in_development'), 'warning');
            return;
        }
        const dataToExport = {};
        if (elements.exportRecipesCheckbox.checked) dataToExport.recipes = state.recipes;
        if (elements.exportPaintsCheckbox.checked) dataToExport.paints = state.paints;
        if (elements.exportCalculationsCheckbox.checked) dataToExport.calculations = []; // заглушка

        const dataStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sico_export_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        utils.showNotification(i18n.t('exported'), 'success');
    }

    function changeLanguage() {
        const lang = elements.languageSelect.value;
        i18n.setLanguage(lang);
        state.settings.language = lang;
        saveSettings();
        renderCategories();
        renderCatalog();
        renderRecipes();
        if (state.ingredients.length) renderIngredientsTable();
    }

    function saveSettings() {
        state.settings.language = elements.languageSelect.value;
        state.settings.units = elements.unitsSelect.value;
        state.settings.autoSave = elements.autoSaveCheckbox.checked;
        state.settings.backup = elements.backupCheckbox.checked;
        saveState();
        utils.showNotification(i18n.t('settings_saved'), 'success');
    }

    function resetSettings() {
        state.settings = { ...data.defaultSettings };
        applySettingsToUI();
        saveState();
        i18n.setLanguage(state.settings.language);
        i18n.applyTranslations();
        renderCategories();
        utils.showNotification(i18n.t('reset_defaults'), 'success');
    }

    function applySettingsToUI() {
        if (elements.languageSelect) elements.languageSelect.value = state.settings.language;
        if (elements.unitsSelect) elements.unitsSelect.value = state.settings.units;
        if (elements.autoSaveCheckbox) elements.autoSaveCheckbox.checked = state.settings.autoSave;
        if (elements.backupCheckbox) elements.backupCheckbox.checked = state.settings.backup;
    }

    function clearAllData() {
        utils.showConfirmation(
            i18n.t('clear_all_data'),
            i18n.t('clear_all_data_confirmation'),
            () => {
                // Видаляємо всі рецепти та користувацькі фарби
                state.recipes = [];
                // Відновлюємо стандартні фарби
                state.paints = [...data.paints];
                saveState();
                renderCatalog();
                renderRecipes();
                updatePaintCounts();
                utils.showNotification(i18n.t('data_cleared'), 'success');
            }
        );
    }

    function filterPaints() {
        // використовується в модалці вибору фарби
        renderPaintSelectionList();
    }

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    // Експортуємо публічні методи
    SICOMIX.app = {
        init,
        showPage,
        openModal,
        closeModal
    };

})(window);
