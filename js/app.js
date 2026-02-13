// ========== ГОЛОВНИЙ МОДУЛЬ ЗАСТОСУНКУ ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const utils = SICOMIX.utils;
    const i18n = SICOMIX.i18n;
    const data = SICOMIX.data;

    // Стан застосунку
    let state = {
        paints: [],
        recipes: [],
        currentRecipeIngredients: [],
        editingRecipeId: null,
        settings: {}
    };

    // Завантаження даних з localStorage або використання дефолтних
    function loadData() {
        // Завантажуємо фарби: спочатку з localStorage, якщо немає – беремо з data.paints
        let savedPaints = utils.loadFromLocalStorage('sico_paints', null);
        if (savedPaints && Array.isArray(savedPaints) && savedPaints.length > 0) {
            state.paints = savedPaints;
        } else {
            state.paints = data.paints || [];
            utils.saveToLocalStorage('sico_paints', state.paints);
        }

        // Завантажуємо рецепти
        let savedRecipes = utils.loadFromLocalStorage('sico_recipes', []);
        state.recipes = savedRecipes;

        // Завантажуємо налаштування
        let savedSettings = utils.loadFromLocalStorage('sico_settings', data.defaultSettings || {});
        state.settings = savedSettings;

        // Встановлюємо мову з налаштувань
        if (state.settings.language) {
            i18n.setLanguage(state.settings.language);
        }

        console.log('📦 Дані завантажено:', state.paints.length, 'фарб,', state.recipes.length, 'рецептів');
    }

    // Оновлення лічильників фарб
    function updatePaintCounts() {
        const count = state.paints.length;
        document.getElementById('totalPaints').textContent = count;
        document.getElementById('headerPaintCount').textContent = count;
    }

    // Рендер каталогу фарб
    function renderCatalog(filterText = '', categoryFilter = '') {
        const container = document.getElementById('paintCatalog');
        if (!container) return;

        let paints = state.paints;

        // Фільтрація
        if (filterText) {
            const lower = filterText.toLowerCase();
            paints = paints.filter(p => 
                (p.name && p.name.toLowerCase().includes(lower)) ||
                (p.article && p.article.toLowerCase().includes(lower)) ||
                (p.displayName && i18n.getLanguage() === 'uk' && p.displayName.uk.toLowerCase().includes(lower)) ||
                (p.displayName && i18n.getLanguage() === 'en' && p.displayName.en.toLowerCase().includes(lower)) ||
                (p.displayName && i18n.getLanguage() === 'pl' && p.displayName.pl.toLowerCase().includes(lower))
            );
        }

        if (categoryFilter) {
            paints = paints.filter(p => p.category === categoryFilter);
        }

        if (paints.length === 0) {
            container.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:40px;">${i18n.t('catalog_empty')}</p>`;
            return;
        }

        let html = '';
        const lang = i18n.getLanguage();
        paints.forEach(paint => {
            const name = paint.displayName ? paint.displayName[lang] : paint.name;
            const series = paint.series || '';
            const category = paint.category || '';
            const article = paint.article || '';
            const color = paint.color || '#cccccc';
            const isDefault = paint.isDefault ? true : false;

            html += `
                <div class="paint-card ${isDefault ? 'default' : ''}" data-id="${paint.id}">
                    <div class="paint-color" style="background-color: ${color};"></div>
                    <div class="paint-info">
                        <div class="paint-name">${name}</div>
                        <div class="paint-series-badge">${series}</div>
                        <div class="paint-article">${article}</div>
                        <div class="paint-actions">
                            <button class="btn-icon btn-edit-paint" title="${i18n.t('edit')}"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-delete-paint" title="${i18n.t('delete')}" ${isDefault ? 'disabled' : ''}><i class="fas fa-trash"></i></button>
                            <button class="btn-icon btn-series-info" title="Інфо про серію"><i class="fas fa-info-circle"></i></button>
                        </div>
                        ${isDefault ? '<span class="default-badge">' + i18n.t('default_paint') + '</span>' : ''}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;

        // Додаємо обробники подій для кнопок у картках
        container.querySelectorAll('.btn-delete-paint').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.paint-card');
                const id = card.dataset.id;
                deletePaint(id);
            });
        });

        container.querySelectorAll('.btn-edit-paint').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.closest('.paint-card').dataset.id;
                editPaint(id);
            });
        });

        container.querySelectorAll('.btn-series-info').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.paint-card');
                const seriesId = card.querySelector('.paint-series-badge')?.textContent;
                if (seriesId) showSeriesDetails(seriesId);
            });
        });
    }

    // Видалення фарби
    function deletePaint(id) {
        const paint = state.paints.find(p => p.id === id);
        if (!paint) return;
        if (paint.isDefault) {
            utils.showNotification(i18n.t('cannot_delete_default_paint'), 'warning');
            return;
        }

        utils.showConfirmation(
            i18n.t('delete_paint'),
            i18n.t('delete_paint_confirmation'),
            () => {
                state.paints = state.paints.filter(p => p.id !== id);
                utils.saveToLocalStorage('sico_paints', state.paints);
                renderCatalog();
                updatePaintCounts();
                utils.showNotification(i18n.t('paint_deleted'), 'success');
            }
        );
    }

    // Редагування фарби (заглушка)
    function editPaint(id) {
        utils.showNotification('Редагування фарби буде реалізовано', 'info');
    }

    // Показати деталі серії
    function showSeriesDetails(seriesId) {
        const series = data.series.find(s => s.id === seriesId);
        if (!series) return;

        const modal = document.getElementById('seriesDetailsModal');
        const content = document.getElementById('seriesDetailsContent');
        const lang = i18n.getLanguage();

        let html = `<h4>${series.name[lang] || series.id}</h4>`;
        html += `<p><strong>Категорія:</strong> ${series.category}</p>`;
        html += `<p><strong>Опис:</strong> ${series.description[lang]}</p>`;
        html += `<h5>Властивості:</h5><ul class="series-properties">`;
        for (let [key, val] of Object.entries(series.properties)) {
            html += `<li><strong>${key}:</strong> ${val[lang] || val}</li>`;
        }
        html += `</ul>`;

        content.innerHTML = html;
        modal.classList.add('active');
    }

    // Рендер рецептів
    function renderRecipes(filterText = '', categoryFilter = '') {
        const container = document.getElementById('recipesContainer');
        if (!container) return;

        let recipes = state.recipes;

        // Фільтрація (спрощено)
        if (filterText) {
            const lower = filterText.toLowerCase();
            recipes = recipes.filter(r => r.name && r.name.toLowerCase().includes(lower));
        }
        if (categoryFilter) {
            recipes = recipes.filter(r => r.category === categoryFilter);
        }

        if (recipes.length === 0) {
            container.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:40px;">${i18n.t('no_recipes')}</p>`;
            return;
        }

        let html = '';
        recipes.forEach(recipe => {
            const ingredientsCount = recipe.ingredients ? recipe.ingredients.length : 0;
            const totalWeight = recipe.ingredients ? recipe.ingredients.reduce((sum, ing) => sum + (parseFloat(ing.amount) || 0), 0) : 0;
            const unit = recipe.unit || 'г';

            html += `
                <div class="recipe-card" data-id="${recipe.id}">
                    <div class="recipe-image" style="background: linear-gradient(145deg, ${recipe.color || '#3a86ff'}, #7b2cbf);">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div class="recipe-content">
                        <div class="recipe-header">
                            <h3 class="recipe-title">${recipe.name}</h3>
                            <span class="recipe-category">${recipe.category}</span>
                        </div>
                        <p class="recipe-description">${recipe.description || i18n.t('no_description')}</p>
                        <div class="recipe-meta">
                            <span><i class="fas fa-flask"></i> ${ingredientsCount} ${i18n.t('ingredients_count')}</span>
                            <span><i class="fas fa-weight-hanging"></i> ${totalWeight} ${unit}</span>
                        </div>
                        <div class="recipe-actions">
                            <button class="recipe-btn btn-edit-recipe"><i class="fas fa-edit"></i> ${i18n.t('edit')}</button>
                            <button class="recipe-btn btn-delete-recipe"><i class="fas fa-trash"></i> ${i18n.t('delete')}</button>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // Навігація між сторінками
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page-content');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.dataset.page;

                // Знімаємо активний клас з усіх лінків і сторінок
                navLinks.forEach(l => l.classList.remove('active'));
                pages.forEach(p => p.classList.remove('active'));

                // Активуємо поточний лінк і сторінку
                link.classList.add('active');
                const targetPage = document.getElementById(pageId + '-page');
                if (targetPage) targetPage.classList.add('active');

                // Закриваємо сайдбар на мобільних
                document.getElementById('sidebar').classList.remove('active');
            });
        });
    }

    // Налаштування модальних вікон
    function setupModals() {
        // Додати фарбу
        const addPaintBtn = document.getElementById('addNewPaintBtn');
        const addPaintModal = document.getElementById('addPaintModal');
        const closePaintModal = document.getElementById('closePaintModal');
        const cancelPaintBtn = document.getElementById('cancelPaintBtn');
        const savePaintBtn = document.getElementById('savePaintBtn');

        if (addPaintBtn) {
            addPaintBtn.addEventListener('click', () => {
                addPaintModal.classList.add('active');
            });
        }

        const closeModal = () => addPaintModal.classList.remove('active');
        if (closePaintModal) closePaintModal.addEventListener('click', closeModal);
        if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', closeModal);

        if (savePaintBtn) {
            savePaintBtn.addEventListener('click', () => {
                // Тут логіка збереження нової фарби
                utils.showNotification('Функція додавання фарби в розробці', 'info');
                closeModal();
            });
        }

        // Модаль підтвердження
        const confirmModal = document.getElementById('confirmationModal');
        const closeConfirm = document.getElementById('closeConfirmationModal');
        const cancelAction = document.getElementById('cancelActionBtn');
        if (closeConfirm) closeConfirm.addEventListener('click', () => confirmModal.classList.remove('active'));
        if (cancelAction) cancelAction.addEventListener('click', () => confirmModal.classList.remove('active'));

        // Модаль деталей серії
        const seriesModal = document.getElementById('seriesDetailsModal');
        document.querySelectorAll('.close-series-details').forEach(btn => {
            btn.addEventListener('click', () => seriesModal.classList.remove('active'));
        });

        // Paint selection modal
        const paintSelectionModal = document.getElementById('paintSelectionModal');
        document.querySelectorAll('.close-paint-selection').forEach(btn => {
            btn.addEventListener('click', () => paintSelectionModal.classList.remove('active'));
        });
    }

    // Меню (мобільне)
    function setupMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const desktopMenuToggle = document.getElementById('desktopMenuToggle');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const container = document.getElementById('mainContainer');

        function toggleSidebar() {
            sidebar.classList.toggle('active');
            container.classList.toggle('sidebar-open');
        }

        if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
        if (desktopMenuToggle) desktopMenuToggle.addEventListener('click', toggleSidebar);
        if (closeSidebar) closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            container.classList.remove('sidebar-open');
        });
    }

    // Ініціалізація випадаючих списків категорій
    function populateCategorySelects() {
        const categories = data.categories || [];
        const selects = [
            document.getElementById('recipeCategory'),
            document.getElementById('categoryFilter'),
            document.getElementById('recipeCategoryFilter'),
            document.getElementById('paintCategory')
        ];

        selects.forEach(select => {
            if (!select) return;
            const currentValue = select.value;
            select.innerHTML = '<option value="">' + i18n.t('all_categories') + '</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat; // Можна додати переклад через translateCategory
                select.appendChild(option);
            });
            if (currentValue) select.value = currentValue;
        });
    }

    // Пошук у каталозі
    function setupSearch() {
        const catalogSearch = document.getElementById('catalogSearch');
        if (catalogSearch) {
            catalogSearch.addEventListener('input', utils.debounce((e) => {
                renderCatalog(e.target.value);
            }, 300));
        }
    }

    // Ініціалізація
    function init() {
        console.log('🔄 Ініціалізація SICOMIX.app');
        loadData();
        updatePaintCounts();
        populateCategorySelects();
        renderCatalog();
        renderRecipes();
        setupNavigation();
        setupModals();
        setupMenu();
        setupSearch();

        // Приховати прелоадер
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    }

    // Публічний API
    SICOMIX.app = {
        init,
        renderCatalog,
        renderRecipes,
        state: () => state
    };

})(window);
