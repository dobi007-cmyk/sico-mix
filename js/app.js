// Глобальні змінні
let selectedIngredients = [];
let selectedRecipes = [];

// Ініціалізація додатка
function initApp() {
    loadData();
    initLanguage();
    setupEventListeners();
    updatePaintCount();
    renderPaintCatalog();
    renderRecipes();
    renderIngredientsList();
    
    // Перевірка типу пристрою
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
}

// Перевірка типу пристрою для адаптивності
function checkDeviceType() {
    const isMobile = window.innerWidth <= 992;
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('mainContainer');
    
    if (isMobile) {
        mainContainer.classList.remove('sidebar-open');
        sidebar.classList.remove('active');
    }
}

// Налаштування обробників подій
function setupEventListeners() {
    // Мобільне меню
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Десктоп меню
    document.getElementById('desktopMenuToggle')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.getElementById('mainContainer');
        
        if (window.innerWidth > 992) {
            sidebar.classList.toggle('active');
            mainContainer.classList.toggle('sidebar-open');
        } else {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Закриття бокової панелі
    document.getElementById('closeSidebar')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('mainContainer').classList.remove('sidebar-open');
        document.body.style.overflow = 'auto';
    });
    
    // Навігаційні посилання
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
            
            // На мобільних пристроях закриваємо меню
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Картки дій
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Колір пікер
    document.getElementById('recipeColor')?.addEventListener('input', function() {
        document.getElementById('colorPreview').style.background = this.value;
    });
    
    // Завантаження фото
    document.getElementById('recipePhoto')?.addEventListener('change', function() {
        const fileName = this.files[0]?.name || getTranslation('uploadPhoto');
        document.getElementById('fileName').textContent = fileName;
    });
    
    // Кнопки нового рецепту
    document.getElementById('addIngredientBtn')?.addEventListener('click', addIngredient);
    document.getElementById('saveRecipeBtn')?.addEventListener('click', saveRecipe);
    document.getElementById('clearRecipeBtn')?.addEventListener('click', clearRecipeForm);
    document.getElementById('calculatePercentagesBtn')?.addEventListener('click', calculatePercentages);
    
    // Кнопки сторінки рецептів
    document.getElementById('exportRecipesBtn')?.addEventListener('click', exportAllRecipes);
    document.getElementById('importRecipesBtn')?.addEventListener('click', importRecipes);
    document.getElementById('printRecipesBtn')?.addEventListener('click', printRecipes);
    document.getElementById('deleteSelectedRecipesBtn')?.addEventListener('click', deleteSelectedRecipes);
    
    // Кнопки каталогу
    document.getElementById('addNewPaintBtn')?.addEventListener('click', () => {
        document.getElementById('addPaintModal').classList.add('active');
    });
    
    // Кнопки модального вікна додавання фарби
    document.getElementById('closePaintModal')?.addEventListener('click', () => {
        document.getElementById('addPaintModal').classList.remove('active');
    });
    
    document.getElementById('cancelPaintBtn')?.addEventListener('click', () => {
        document.getElementById('addPaintModal').classList.remove('active');
    });
    
    document.getElementById('savePaintBtn')?.addEventListener('click', saveNewPaint);
    
    // Обробка кліку поза меню (для закриття на мобільних)
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        const desktopMenuToggle = document.getElementById('desktopMenuToggle');
        
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Пошук та фільтрація
    document.getElementById('paintSearch')?.addEventListener('input', renderIngredientsList);
    document.getElementById('categoryFilter')?.addEventListener('change', renderIngredientsList);
    document.getElementById('recipeSearch')?.addEventListener('input', renderRecipes);
    document.getElementById('recipeCategoryFilter')?.addEventListener('change', renderRecipes);
    document.getElementById('catalogSearch')?.addEventListener('input', renderPaintCatalog);
}

// Перемикання сторінок
function switchPage(pageId) {
    // Приховуємо всі сторінки
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показуємо обрану сторінку
    const selectedPage = document.getElementById(`${pageId}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Оновлюємо дані для конкретної сторінки
        if (pageId === 'recipes') {
            renderRecipes();
        } else if (pageId === 'catalog') {
            renderPaintCatalog();
        } else if (pageId === 'new-recipe') {
            renderIngredientsList();
        }
    }
    
    // Оновлюємо активне посилання в навігації
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Функція для показу сповіщень з підтримкою перекладу
function showTranslatedNotification(messageKey, type = 'success') {
    const message = getTranslation(messageKey);
    showNotification(message, type);
}

// Решта функції залишаються аналогічними, але додаємо переклад ключів сповіщень:

function saveRecipe() {
    const name = document.getElementById('recipeName').value;
    const category = document.getElementById('recipeCategory').value;
    const color = document.getElementById('recipeColor').value;
    const description = document.getElementById('recipeDescription').value;
    
    if (!name || !category || selectedIngredients.length === 0) {
        showTranslatedNotification('fillRequiredFields', 'error');
        return;
    }
    
    const newRecipe = {
        id: Date.now(),
        name,
        category,
        color,
        description,
        ingredients: [...selectedIngredients],
        date: new Date().toLocaleDateString(currentLanguage === 'pl' ? 'pl-PL' : 
                                            currentLanguage === 'uk' ? 'uk-UA' : 'en-US'),
        photo: null
    };
    
    recipes.push(newRecipe);
    saveData();
    
    showTranslatedNotification('recipeSaved');
    clearRecipeForm();
    switchPage('recipes');
}

function deleteRecipe(id) {
    showConfirmation(
        getTranslation('confirmationAction'),
        getTranslation('confirmationMessage'),
        () => {
            recipes = recipes.filter(recipe => recipe.id !== id);
            saveData();
            renderRecipes();
            showTranslatedNotification('recipeDeleted');
        }
    );
}

// Додаємо переклад для категорій у функції renderPaintCatalog
function renderPaintCatalog() {
    const searchTerm = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
    
    let filteredPaints = paintCatalog.filter(paint => 
        paint.name.toLowerCase().includes(searchTerm) ||
        paint.category.toLowerCase().includes(searchTerm) ||
        paint.manufacturer?.toLowerCase().includes(searchTerm) ||
        paint.article?.toLowerCase().includes(searchTerm)
    );
    
    const catalogElement = document.getElementById('paintCatalog');
    if (!catalogElement) return;
    
    catalogElement.innerHTML = filteredPaints.map(paint => `
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
                            <div style="font-size: 12px; color: var(--gray);">${getTranslation('manufacturer')}</div>
                            <div style="font-weight: 600;">${paint.manufacturer}</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">${getTranslation('article')}</div>
                            <div style="font-weight: 600;">${paint.article}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; color: var(--gray); line-height: 1.5;">
                        ${paint.description || getTranslation('noDescription')}
                    </div>
                </div>
                <div class="recipe-actions">
                    <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="editPaint(${paint.id})">
                        <i class="fas fa-edit"></i> ${getTranslation('edit')}
                    </button>
                    <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="deletePaint(${paint.id})">
                        <i class="fas fa-trash"></i> ${getTranslation('delete')}
                    </button>
                </div>
            </div>
        </div>
    `).join('') || `<p style="text-align: center; color: var(--gray); padding: 40px;">${getTranslation('catalogEmpty')}</p>`;
    
    updatePaintCount();
}

// Додаємо в data-colors.js переклад категорій
const categoryTranslations = {
    pl: {
        'metalik': 'Metalik',
        'perl': 'Perłowy',
        'mat': 'Matowy',
        'gloss': 'Gloss',
        'akryl': 'Akrylowy',
        'epoxy': 'Epoksydowy'
    },
    uk: {
        'metalik': 'Металік',
        'perl': 'Перламутр',
        'mat': 'Матові',
        'gloss': 'Глянцеві',
        'akryl': 'Акрилові',
        'epoxy': 'Епоксидні'
    },
    en: {
        'metalik': 'Metallic',
        'perl': 'Pearl',
        'mat': 'Matte',
        'gloss': 'Gloss',
        'akryl': 'Acrylic',
        'epoxy': 'Epoxy'
    }
};

function getCategoryTranslation(categoryKey) {
    return categoryTranslations[currentLanguage][categoryKey] || categoryKey;
}

// Оновлюємо функцію renderRecipes для перекладу категорій
function renderRecipes() {
    const searchTerm = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('recipeCategoryFilter')?.value || '';
    
    let filteredRecipes = recipes;
    
    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description?.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }
    
    const container = document.getElementById('recipesContainer');
    if (!container) return;
    
    container.innerHTML = filteredRecipes.map(recipe => {
        const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + ing.amount, 0);
        const translatedCategory = getCategoryTranslation(recipe.category);
        
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
                            <span class="recipe-category">${translatedCategory}</span>
                        </div>
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" class="recipe-select" value="${recipe.id}" style="margin-right: 5px;">
                            ${getTranslation('select')}
                        </label>
                    </div>
                    <p class="recipe-description">${recipe.description || getTranslation('noDescription')}</p>
                    <div class="recipe-meta">
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">${getTranslation('ingredientsCount')}</div>
                            <div style="font-weight: 600;">${recipe.ingredients.length}</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">${getTranslation('totalWeight')}</div>
                            <div style="font-weight: 600;">${totalAmount} g</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">${getTranslation('date')}</div>
                            <div style="font-weight: 600;">${recipe.date}</div>
                        </div>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="editRecipe(${recipe.id})">
                            <i class="fas fa-edit"></i> ${getTranslation('edit')}
                        </button>
                        <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="deleteRecipe(${recipe.id})">
                            <i class="fas fa-trash"></i> ${getTranslation('delete')}
                        </button>
                        <button class="recipe-btn" style="background: var(--success); color: white;" onclick="exportRecipe(${recipe.id})">
                            <i class="fas fa-download"></i> ${getTranslation('export')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('') || `<p style="text-align: center; color: var(--gray); padding: 40px;">${getTranslation('noRecipesFound')}</p>`;
    
    updateRecipeSelection();
}

// Глобальні функції
window.editRecipe = function(id) {
    showTranslatedNotification('featureInDevelopment', 'info');
};

window.deleteRecipe = function(id) {
    deleteRecipe(id);
};

window.exportRecipe = function(id) {
    exportRecipe(id);
};

window.editPaint = function(id) {
    showTranslatedNotification('featureInDevelopment', 'info');
};

window.deletePaint = function(id) {
    deletePaint(id);
};

// Ініціалізація під час завантаження сторінки
document.addEventListener('DOMContentLoaded', initApp);
