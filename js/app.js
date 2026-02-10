// Основна логіка додатку
const app = {
    currentLanguage: 'uk',
    currentTheme: 'light',
    recipes: [],
    settings: {},

    // Ініціалізація додатку
    init: function() {
        this.loadSettings();
        this.loadRecipes();
        this.renderSeries();
        this.renderColors();
        this.setupEventListeners();
        this.updateStats();
        
        // Показати головну секцію
        this.showSection('home');
        
        // Ініціалізація Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('js/service-worker.js')
                .then(() => console.log('Service Worker зареєстровано'))
                .catch(err => console.error('Помилка Service Worker:', err));
        }
    },

    // Завантаження налаштувань
    loadSettings: function() {
        const savedSettings = localStorage.getItem('sicomix_settings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
            this.currentLanguage = this.settings.language || 'uk';
            this.currentTheme = this.settings.theme || 'light';
            this.applySettings();
        } else {
            this.settings = SICOMIX.data.defaultSettings;
            this.saveSettings();
        }
    },

    // Застосування налаштувань
    applySettings: function() {
        // Мова
        document.getElementById('languageSelect').value = this.currentLanguage;
        document.getElementById('languageSetting').value = this.currentLanguage;
        
        // Тема
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(this.currentTheme + '-theme');
        document.getElementById('themeSetting').value = this.currentTheme;
        
        // Інші налаштування
        if (document.getElementById('unitsSetting')) {
            document.getElementById('unitsSetting').value = this.settings.units || 'grams';
        }
        if (document.getElementById('autoSaveSetting')) {
            document.getElementById('autoSaveSetting').checked = this.settings.autoSave || true;
        }
        if (document.getElementById('precisionSetting')) {
            document.getElementById('precisionSetting').value = this.settings.calculationsPrecision || 2;
        }
    },

    // Збереження налаштувань
    saveSettings: function() {
        this.settings.language = document.getElementById('languageSetting').value;
        this.settings.theme = document.getElementById('themeSetting').value;
        this.settings.units = document.getElementById('unitsSetting').value;
        this.settings.autoSave = document.getElementById('autoSaveSetting').checked;
        this.settings.calculationsPrecision = parseInt(document.getElementById('precisionSetting').value) || 2;
        
        localStorage.setItem('sicomix_settings', JSON.stringify(this.settings));
        this.applySettings();
        this.showMessage('Налаштування збережено!', 'success');
    },

    // Скидання налаштувань
    resetSettings: function() {
        if (confirm('Скинути налаштування до стандартних?')) {
            localStorage.removeItem('sicomix_settings');
            this.settings = SICOMIX.data.defaultSettings;
            this.saveSettings();
            location.reload();
        }
    },

    // Завантаження рецептів
    loadRecipes: function() {
        const savedRecipes = localStorage.getItem('sicomix_recipes');
        if (savedRecipes) {
            this.recipes = JSON.parse(savedRecipes);
        }
    },

    // Збереження рецептів
    saveRecipes: function() {
        localStorage.setItem('sicomix_recipes', JSON.stringify(this.recipes));
    },

    // Відображення серій
    renderSeries: function() {
        const seriesGrid = document.getElementById('seriesGrid');
        const series = SICOMIX.data.series;
        
        let html = '';
        series.forEach(serie => {
            html += `
                <div class="series-card" onclick="app.showSeriesDetail('${serie.id}')">
                    <div class="series-card-header">
                        <h3>${serie.name}</h3>
                        <span class="series-category">${serie.category}</span>
                    </div>
                    <div class="series-card-body">
                        <p>${serie.description}</p>
                        <div class="series-properties">
                            <div><strong>Тип:</strong> ${serie.properties.type}</div>
                            <div><strong>Сушіння:</strong> ${serie.properties.drying}</div>
                            <div><strong>Сито:</strong> ${serie.properties.mesh}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        seriesGrid.innerHTML = html;
        
        // Заповнення фільтра категорій
        const categoryFilter = document.getElementById('categoryFilter');
        const categories = [...new Set(series.map(s => s.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    },

    // Відображення кольорів
    renderColors: function(filterSeries = '', filterCategory = '') {
        const colorsGrid = document.getElementById('colorsGrid');
        const paints = SICOMIX.data.initialData.paints;
        
        let filteredPaints = paints;
        if (filterSeries) {
            filteredPaints = filteredPaints.filter(p => p.series === filterSeries);
        }
        
        let html = '';
        filteredPaints.forEach(paint => {
            html += `
                <div class="color-card" onclick="app.showColorDetail(${paint.id})">
                    <div class="color-card-header" style="background-color: ${paint.color}">
                        <h3>${paint.fullName}</h3>
                        <p>${paint.article}</p>
                    </div>
                    <div class="color-card-body">
                        <div class="color-preview" style="background-color: ${paint.color}"></div>
                        <div class="color-info">
                            <p><strong>Серія:</strong> ${paint.series}</p>
                            <p><strong>Код:</strong> ${paint.baseColorCode}</p>
                            <p><strong>Категорія:</strong> ${paint.category}</p>
                            <p><strong>Виробник:</strong> ${paint.manufacturer}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        colorsGrid.innerHTML = html || '<p class="empty-state">Кольорів не знайдено</p>';
        
        // Заповнення фільтрів
        const seriesFilter = document.getElementById('seriesFilter');
        seriesFilter.innerHTML = '<option value="">Всі серії</option>';
        SICOMIX.data.series.forEach(serie => {
            const option = document.createElement('option');
            option.value = serie.id;
            option.textContent = `${serie.name} (${serie.category})`;
            seriesFilter.appendChild(option);
        });
    },

    // Показати деталі кольору
    showColorDetail: function(colorId) {
        const paint = SICOMIX.data.initialData.paints.find(p => p.id === colorId);
        if (!paint) return;
        
        const modal = document.getElementById('colorModal');
        const modalBody = document.getElementById('modalBody');
        const modalTitle = document.getElementById('modalTitle');
        
        modalTitle.textContent = paint.fullName;
        
        modalBody.innerHTML = `
            <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
                <div class="color-preview-large" style="width: 100px; height: 100px; background-color: ${paint.color}; border-radius: 10px;"></div>
                <div>
                    <h4>Інформація про фарбу</h4>
                    <p><strong>Артикул:</strong> ${paint.article}</p>
                    <p><strong>Серія:</strong> ${paint.series}</p>
                    <p><strong>Код кольору:</strong> ${paint.baseColorCode}</p>
                    <p><strong>HEX колір:</strong> ${paint.color}</p>
                    <p><strong>Виробник:</strong> ${paint.manufacturer}</p>
                </div>
            </div>
            
            <div class="color-properties">
                <h4>Властивості серії</h4>
                ${Object.entries(paint.properties).map(([key, value]) => `
                    <div class="property-item">
                        <strong>${this.translateProperty(key)}:</strong> ${value}
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-actions" style="margin-top: 2rem;">
                <button class="btn-primary" onclick="app.addToRecipe(${colorId})">➕ Додати до рецепту</button>
                <button class="btn-secondary" onclick="app.closeModal()">Закрити</button>
            </div>
        `;
        
        modal.style.display = 'block';
    },

    // Показати деталі серії
    showSeriesDetail: function(seriesId) {
        const serie = SICOMIX.data.series.find(s => s.id === seriesId);
        if (!serie) return;
        
        const modal = document.getElementById('colorModal');
        const modalBody = document.getElementById('modalBody');
        const modalTitle = document.getElementById('modalTitle');
        
        modalTitle.textContent = `Серія ${serie.name}`;
        
        modalBody.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h4>${serie.description}</h4>
                <div class="series-detail-properties">
                    ${Object.entries(serie.properties).map(([key, value]) => `
                        <div class="property-item">
                            <strong>${this.translateProperty(key)}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="additional-products">
                <h4>Додаткові продукти</h4>
                ${SICOMIX.data.additionalProducts[seriesId] ? 
                    `<ul>${SICOMIX.data.additionalProducts[seriesId].map(p => `<li>${p}</li>`).join('')}</ul>` :
                    '<p>Додаткові продукти не вказані</p>'
                }
            </div>
            
            <div class="modal-actions" style="margin-top: 2rem;">
                <button class="btn-primary" onclick="app.renderColors('${seriesId}'); app.showSection('colors'); app.closeModal()">
                    🎨 Переглянути кольори цієї серії
                </button>
                <button class="btn-secondary" onclick="app.closeModal()">Закрити</button>
            </div>
        `;
        
        modal.style.display = 'block';
    },

    // Переклад властивостей
    translateProperty: function(property) {
        const translations = {
            'type': 'Тип',
            'finish': 'Фініш',
            'drying': 'Сушіння',
            'mesh': 'Сито',
            'cleaning': 'Чищення',
            'storage': 'Зберігання',
            'resistance': 'Стійкість'
        };
        return translations[property] || property;
    },

    // Показати секцію
    showSection: function(sectionId) {
        // Приховати всі секції
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Показати обрану секцію
        document.getElementById(sectionId).classList.add('active');
        
        // Оновити навігацію
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('nav-active');
            }
        });
        
        // Оновити фільтри при показі кольорів
        if (sectionId === 'colors') {
            this.renderColors();
        }
    },

    // Оновлення статистики
    updateStats: function() {
        document.getElementById('seriesCount').textContent = SICOMIX.data.series.length;
        document.getElementById('colorsCount').textContent = SICOMIX.data.baseColors.length;
        document.getElementById('paintsCount').textContent = SICOMIX.data.initialData.paints.length;
    },

    // Калькулятор фарби
    calculatePaint: function() {
        const area = parseFloat(document.getElementById('printArea').value) || 1;
        const consumption = parseFloat(document.getElementById('paintConsumption').value) || 40;
        const colorCount = parseInt(document.getElementById('colorCount').value) || 1;
        
        const totalPaint = area / consumption;
        const paintPerColor = totalPaint / colorCount;
        const paintInGrams = paintPerColor * 1000; // 1 літр ≈ 1000 грам
        
        const precision = this.settings.calculationsPrecision || 2;
        
        document.getElementById('totalPaint').textContent = totalPaint.toFixed(precision) + ' л';
        document.getElementById('paintPerColor').textContent = paintPerColor.toFixed(precision) + ' л';
        document.getElementById('paintInGrams').textContent = paintInGrams.toFixed(precision) + ' г';
    },

    // Створення нового рецепту
    createNewRecipe: function() {
        const modal = document.getElementById('recipeModal');
        const modalBody = document.getElementById('recipeModalBody');
        const modalTitle = document.getElementById('recipeModalTitle');
        
        modalTitle.textContent = 'Новий рецепт';
        
        modalBody.innerHTML = `
            <div class="recipe-form">
                <div class="input-group">
                    <label>Назва рецепту:</label>
                    <input type="text" id="recipeName" placeholder="Наприклад: Автомобільний червоний металік" class="search-input">
                </div>
                
                <div class="input-group">
                    <label>Категорія:</label>
                    <select id="recipeCategory" class="filter-select">
                        <option value="Металік">Металік</option>
                        <option value="Перламутр">Перламутр</option>
                        <option value="Матові">Матові</option>
                        <option value="Глянцеві">Глянцеві</option>
                        <option value="Флуо">Флуоресцентні</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label>Опис:</label>
                    <textarea id="recipeDescription" rows="3" class="search-input" placeholder="Опис рецепту..."></textarea>
                </div>
                
                <div class="ingredients-section">
                    <h4>Інгредієнти</h4>
                    <div id="ingredientsList"></div>
                    <button type="button" class="btn-secondary" onclick="app.addIngredient()">➕ Додати інгредієнт</button>
                </div>
                
                <div class="modal-actions" style="margin-top: 2rem;">
                    <button class="btn-success" onclick="app.saveRecipe()">💾 Зберегти рецепт</button>
                    <button class="btn-secondary" onclick="app.closeModal()">Скасувати</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        this.addIngredient();
    },

    // Додавання інгредієнта
    addIngredient: function() {
        const ingredientsList = document.getElementById('ingredientsList');
        const ingredientId = Date.now();
        
        const ingredientHtml = `
            <div class="ingredient-item" id="ingredient-${ingredientId}">
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 1rem; margin-bottom: 1rem;">
                    <select class="filter-select" onchange="app.updateIngredientColor(this, ${ingredientId})">
                        <option value="">Виберіть фарбу</option>
                        ${SICOMIX.data.initialData.paints.map(p => `
                            <option value="${p.id}">${p.fullName}</option>
                        `).join('')}
                    </select>
                    <input type="number" placeholder="Кількість" min="0" step="0.1" class="search-input" onchange="app.calculatePercentages()">
                    <select class="filter-select">
                        ${SICOMIX.data.units.map(u => `
                            <option value="${u.value}">${u.label}</option>
                        `).join('')}
                    </select>
                    <input type="text" placeholder="%" readonly class="search-input">
                    <button type="button" class="btn-danger" onclick="document.getElementById('ingredient-${ingredientId}').remove(); app.calculatePercentages()">🗑️</button>
                </div>
                <div class="color-preview-small" style="width: 100%; height: 20px; border-radius: 3px; margin-top: 0.5rem;"></div>
            </div>
        `;
        
        ingredientsList.insertAdjacentHTML('beforeend', ingredientHtml);
    },

    // Оновлення кольору інгредієнта
    updateIngredientColor: function(select, ingredientId) {
        const paintId = select.value;
        if (!paintId) return;
        
        const paint = SICOMIX.data.initialData.paints.find(p => p.id == paintId);
        if (paint) {
            const colorPreview = document.querySelector(`#ingredient-${ingredientId} .color-preview-small`);
            colorPreview.style.backgroundColor = paint.color;
        }
    },

    // Розрахунок відсотків
    calculatePercentages: function() {
        // Логіка розрахунку відсотків
    },

    // Збереження рецепту
    saveRecipe: function() {
        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            category: document.getElementById('recipeCategory').value,
            description: document.getElementById('recipeDescription').value,
            date: new Date().toLocaleDateString('uk-UA'),
            ingredients: []
        };
        
        this.recipes.push(recipe);
        this.saveRecipes();
        this.closeModal();
        this.showMessage('Рецепт збережено!', 'success');
        this.renderRecipes();
    },

    // Відображення рецептів
    renderRecipes: function() {
        const recipesList = document.getElementById('recipesList');
        
        if (this.recipes.length === 0) {
            recipesList.innerHTML = '<p class="empty-state">Рецептів ще немає. Створіть перший!</p>';
            return;
        }
        
        let html = '';
        this.recipes.forEach(recipe => {
            html += `
                <div class="recipe-card">
                    <h4>${recipe.name}</h4>
                    <p><strong>Категорія:</strong> ${recipe.category}</p>
                    <p><strong>Дата:</strong> ${recipe.date}</p>
                    <p>${recipe.description}</p>
                    <div class="recipe-actions">
                        <button class="btn-secondary" onclick="app.editRecipe(${recipe.id})">✏️ Редагувати</button>
                        <button class="btn-danger" onclick="app.deleteRecipe(${recipe.id})">🗑️ Видалити</button>
                    </div>
                </div>
            `;
        });
        
        recipesList.innerHTML = html;
    },

    // Редагування рецепту
    editRecipe: function(recipeId) {
        // Логіка редагування рецепту
    },

    // Видалення рецепту
    deleteRecipe: function(recipeId) {
        if (confirm('Видалити цей рецепт?')) {
            this.recipes = this.recipes.filter(r => r.id !== recipeId);
            this.saveRecipes();
            this.renderRecipes();
            this.showMessage('Рецепт видалено', 'success');
        }
    },

    // Додавання до рецепту
    addToRecipe: function(colorId) {
        this.closeModal();
        this.showMessage('Фарбу додано до рецепту', 'success');
        // Додаткова логіка
    },

    // Експорт даних
    exportData: function() {
        const data = {
            settings: this.settings,
            recipes: this.recipes,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `sicomix-backup-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showMessage('Дані експортовано!', 'success');
    },

    // Очищення даних
    clearData: function() {
        if (confirm('Ця дія видалить всі ваші рецепти та налаштування. Продовжити?')) {
            localStorage.clear();
            location.reload();
        }
    },

    // Показати повідомлення
    showMessage: function(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        document.querySelector('.main-content').prepend(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    },

    // Закрити модальне вікно
    closeModal: function() {
        document.getElementById('colorModal').style.display = 'none';
        document.getElementById('recipeModal').style.display = 'none';
    },

    // Налаштування обробників подій
    setupEventListeners: function() {
        // Пошук серій
        document.getElementById('seriesSearch').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.series-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
        
        // Фільтр категорій серій
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            const category = e.target.value;
            document.querySelectorAll('.series-card').forEach(card => {
                const cardCategory = card.querySelector('.series-category').textContent;
                card.style.display = (!category || cardCategory === category) ? 'block' : 'none';
            });
        });
        
        // Пошук кольорів
        document.getElementById('colorSearch').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.color-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
        
        // Фільтр серій кольорів
        document.getElementById('seriesFilter').addEventListener('change', (e) => {
            this.renderColors(e.target.value);
        });
        
        // Зміна мови
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.settings.language = this.currentLanguage;
            this.saveSettings();
            this.showMessage('Мову змінено. Оновіть сторінку для застосування.', 'warning');
        });
        
        // Навігація по хешу
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.showSection(hash);
            }
        });
    }
};
