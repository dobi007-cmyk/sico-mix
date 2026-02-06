// app.js
// Головний файл додатку

// Глобальні змінні
let selectedIngredients = [];
let selectedRecipes = [];

// DOM елементи
let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer, navLinks, pageContents;
let totalPaintsElement, headerPaintCount, colorPreview, recipeColor, ingredientsList;
let paintSearch, categoryFilter, addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
let paintCatalogElement, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
let actionCards;

// Ініціалізація додатку
function initApp() {
    loadData();
    setupDOMReferences();
    setupEventListeners();
    updatePaintCount();
    renderPaintCatalog();
    loadRecipes();
    renderIngredientsList();
}

// Отримання DOM елементів
function setupDOMReferences() {
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
    actionCards = document.querySelectorAll('.action-card');
}

// Налаштування обробників подій
function setupEventListeners() {
    setupNavigation();
    
    // Color picker
    recipeColor.addEventListener('input', function() {
        colorPreview.style.background = this.value;
    });
    
    // File upload
    const recipePhotoInput = document.getElementById('recipePhoto');
    if (recipePhotoInput) {
        recipePhotoInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'Завантажити фото';
            document.getElementById('fileName').textContent = fileName;
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
    if (closePaintModal) closePaintModal.addEventListener('click', () => {
        addPaintModal.classList.remove('active');
    });
    
    if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', () => {
        addPaintModal.classList.remove('active');
    });
    
    if (savePaintBtn) savePaintBtn.addEventListener('click', saveNewPaint);
    
    // Search functionality
    if (paintSearch) paintSearch.addEventListener('input', renderIngredientsList);
    if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);
}

// Навігація
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
            sidebar.classList.add('active');
            mainContainer.classList.add('sidebar-open');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            mainContainer.classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
        });
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
            sidebar.classList.remove('active');
            mainContainer.classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
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

// Новий рецепт
function renderIngredientsList() {
    if (!ingredientsList) return;
    
    ingredientsList.innerHTML = '';
    
    selectedIngredients.forEach((ingredient, index) => {
        const paint = getPaintById(ingredient.paintId);
        if (!paint) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 20px; height: 20px; background: ${paint.color}; border-radius: 4px;"></div>
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
                <button class="btn-icon delete-ingredient" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        ingredientsList.appendChild(row);
    });

    // Add event listeners
    ingredientsList.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', handleIngredientChange);
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
    
    selectedIngredients[index][field] = field === 'amount' ? parseFloat(value) : value;
    
    // If amount changed, recalculate percentages
    if (field === 'amount') {
        calculatePercentages();
    }
}

function addIngredient() {
    const searchTerm = paintSearch ? paintSearch.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    
    let filteredPaints = searchPaints(searchTerm, category);
    
    if (filteredPaints.length === 0) {
        showNotification('Фарб не знайдено', 'error');
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
                <h3 class="modal-title">Оберіть фарбу</h3>
                <button class="modal-close close-paint-selection">&times;</button>
            </div>
            <div style="max-height: 400px; overflow-y: auto;">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; padding: 10px;">
                    ${paints.map(paint => `
                        <div class="paint-selection-card" data-id="${paint.id}" 
                             style="padding: 15px; border: 2px solid var(--light-gray); border-radius: var(--border-radius); cursor: pointer; transition: all 0.3s ease;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <div style="width: 30px; height: 30px; background: ${paint.color}; border-radius: 6px;"></div>
                                <div style="font-weight: 600;">${paint.name}</div>
                            </div>
                            <div style="font-size: 12px; color: var(--gray);">
                                ${paint.category} • ${paint.manufacturer}
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
                showNotification('Ця фарба вже додана до рецепту', 'warning');
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
            showNotification('Фарбу додано до рецепту');
        });
    });
}

function deleteIngredient(index) {
    selectedIngredients.splice(index, 1);
    calculatePercentages();
    renderIngredientsList();
}

function calculatePercentages() {
    const totalAmount = selectedIngredients.reduce((sum, ing) => sum + ing.amount, 0);
    
    if (totalAmount === 0) return;
    
    selectedIngredients.forEach((ingredient, index) => {
        ingredient.percentage = ((ingredient.amount / totalAmount) * 100).toFixed(1);
    });
    
    renderIngredientsList();
}

function saveRecipe() {
    const name = document.getElementById('recipeName').value;
    const category = document.getElementById('recipeCategory').value;
    const color = document.getElementById('recipeColor').value;
    const description = document.getElementById('recipeDescription').value;
    
    if (!name || !category || selectedIngredients.length === 0) {
        showNotification('Будь ласка, заповніть всі обов\'язкові поля та додайте хоча б один інгредієнт', 'error');
        return;
    }
    
    const newRecipe = {
        id: Date.now(),
        name,
        category,
        color,
        description,
        ingredients: [...selectedIngredients],
        date: new Date().toLocaleDateString('uk-UA'),
        photo: null
    };
    
    addRecipe(newRecipe);
    
    showNotification(`Рецепт "${name}" успішно збережено!`);
    clearRecipeForm();
    switchPage('recipes');
}

function clearRecipeForm() {
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeCategory').value = '';
    document.getElementById('recipeColor').value = '#4361ee';
    document.getElementById('recipeDescription').value = '';
    colorPreview.style.background = '#4361ee';
    selectedIngredients = [];
    renderIngredientsList();
}

// Рецепти
function renderRecipes() {
    if (!recipesContainer) return;
    
    const searchTerm = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('recipeCategoryFilter')?.value || '';
    
    let filteredRecipes = searchRecipes(searchTerm, category);
    
    recipesContainer.innerHTML = filteredRecipes.map(recipe => {
        const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + ing.amount, 0);
        
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
                        <label style="display: flex; align-items: center;">
                            <input type="checkbox" class="recipe-select" value="${recipe.id}" style="margin-right: 5px;">
                            Обрати
                        </label>
                    </div>
                    <p class="recipe-description">${recipe.description || 'Опис відсутній'}</p>
                    <div class="recipe-meta">
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">Інгредієнтів</div>
                            <div style="font-weight: 600;">${recipe.ingredients.length}</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">Загальна вага</div>
                            <div style="font-weight: 600;">${totalAmount} г</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">Дата</div>
                            <div style="font-weight: 600;">${recipe.date}</div>
                        </div>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="app.editRecipe(${recipe.id})">
                            <i class="fas fa-edit"></i> Редагувати
                        </button>
                        <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="app.deleteRecipe(${recipe.id})">
                            <i class="fas fa-trash"></i> Видалити
                        </button>
                        <button class="recipe-btn" style="background: var(--success); color: white;" onclick="app.exportRecipe(${recipe.id})">
                            <i class="fas fa-download"></i> Експорт
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('') || '<p style="text-align: center; color: var(--gray); padding: 40px;">Рецептів не знайдено</p>';
    
    // Update recipe selection
    updateRecipeSelection();
}

function updateRecipeSelection() {
    const checkboxes = recipesContainer.querySelectorAll('.recipe-select');
    selectedRecipes = [];
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const recipeId = parseInt(this.value);
            
            if (this.checked) {
                selectedRecipes.push(recipeId);
            } else {
                selectedRecipes = selectedRecipes.filter(id => id !== recipeId);
            }
        });
    });
}

function deleteSelectedRecipes() {
    if (selectedRecipes.length === 0) {
        showNotification('Оберіть рецепти для видалення', 'warning');
        return;
    }
    
    showConfirmation(
        'Видалення рецептів',
        `Ви впевнені, що хочете видалити ${selectedRecipes.length} рецептів?`,
        () => {
            selectedRecipes.forEach(id => deleteRecipeById(id));
            selectedRecipes = [];
            renderRecipes();
            showNotification(`Видалено ${selectedRecipes.length} рецептів`);
        }
    );
}

function exportAllRecipes() {
    if (recipes.length === 0) {
        showNotification('Немає рецептів для експорту', 'warning');
        return;
    }
    
    const dataStr = exportData(true, false);
    const exportFileDefaultName = `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`;
    
    exportToFile(dataStr, exportFileDefaultName);
    showNotification(`Експортовано ${recipes.length} рецептів`);
}

function importRecipes() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        readFile(file).then(content => {
            try {
                const importedData = JSON.parse(content);
                
                if (!Array.isArray(importedData.recipes)) {
                    showNotification('Невірний формат файлу', 'error');
                    return;
                }
                
                showConfirmation(
                    'Імпорт рецептів',
                    `Виявлено ${importedData.recipes.length} рецептів. Імпортувати?`,
                    () => {
                        importedData.recipes.forEach(recipe => {
                            recipe.id = Date.now() + Math.random();
                            recipes.push(recipe);
                        });
                        
                        saveData();
                        renderRecipes();
                        showNotification(`Імпортовано ${importedData.recipes.length} рецептів`);
                    }
                );
            } catch (error) {
                showNotification('Помилка читання файлу', 'error');
            }
        }).catch(error => {
            showNotification('Помилка читання файлу', 'error');
        });
    };
    
    fileInput.click();
}

function printRecipes() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Друк рецептів SICO MIX</title>
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
            <h1>Рецепти SICO MIX</h1>
            <p>Дата друку: ${new Date().toLocaleDateString('uk-UA')}</p>
            <hr>
            ${recipes.map(recipe => `
                <div class="recipe">
                    <h2>${recipe.name}</h2>
                    <p><strong>Категорія:</strong> ${recipe.category}</p>
                    <p><strong>Дата створення:</strong> ${recipe.date}</p>
                    <p><strong>Опис:</strong> ${recipe.description || '—'}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Фарба</th>
                                <th>Кількість</th>
                                <th>Відсоток</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recipe.ingredients.map(ing => {
                                const paint = getPaintById(ing.paintId);
                                return `
                                    <tr>
                                        <td>${paint ? paint.name : 'Невідомо'}</td>
                                        <td>${ing.amount} ${ing.unit}</td>
                                        <td>${ing.percentage || 0}%</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `).join('')}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Каталог фарб
function renderPaintCatalog() {
    if (!paintCatalogElement) return;
    
    paintCatalogElement.innerHTML = paintCatalog.map(paint => `
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
                            <div style="font-size: 12px; color: var(--gray);">Виробник</div>
                            <div style="font-weight: 600;">${paint.manufacturer}</div>
                        </div>
                        <div>
                            <div style="font-size: 12px; color: var(--gray);">Артикул</div>
                            <div style="font-weight: 600;">${paint.article}</div>
                        </div>
                    </div>
                    <div style="font-size: 14px; color: var(--gray); line-height: 1.5;">
                        ${paint.description || 'Опис відсутній'}
                    </div>
                </div>
                <div class="recipe-actions">
                    <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="app.editPaint(${paint.id})">
                        <i class="fas fa-edit"></i> Редагувати
                    </button>
                    <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="app.deletePaint(${paint.id})">
                        <i class="fas fa-trash"></i> Видалити
                    </button>
                </div>
            </div>
        </div>
    `).join('') || '<p style="text-align: center; color: var(--gray); padding: 40px;">Каталог порожній</p>';
    
    updatePaintCount();
}

function addNewPaint() {
    // Reset form
    document.getElementById('paintName').value = '';
    document.getElementById('paintCategory').value = '';
    document.getElementById('paintColorCode').value = '';
    document.getElementById('paintDescription').value = '';
    document.getElementById('paintManufacturer').value = '';
    document.getElementById('paintArticle').value = '';
    
    addPaintModal.classList.add('active');
}

function saveNewPaint() {
    const name = document.getElementById('paintName').value;
    const category = document.getElementById('paintCategory').value;
    const color = document.getElementById('paintColorCode').value;
    const description = document.getElementById('paintDescription').value;
    const manufacturer = document.getElementById('paintManufacturer').value;
    const article = document.getElementById('paintArticle').value;
    
    if (!name || !category) {
        showNotification('Будь ласка, заповніть обов\'язкові поля', 'error');
        return;
    }
    
    const newPaint = {
        id: Date.now(),
        name,
        category,
        color: color || '#000000',
        description,
        manufacturer: manufacturer || 'SICO',
        article: article || ''
    };
    
    addPaint(newPaint);
    
    addPaintModal.classList.remove('active');
    renderPaintCatalog();
    showNotification(`Фарбу "${name}" додано до каталогу`);
}

function updatePaintCount() {
    const count = paintCatalog.length;
    if (totalPaintsElement) totalPaintsElement.textContent = count;
    if (headerPaintCount) headerPaintCount.textContent = count;
}

// Глобальні функції для виклику з HTML
window.app = {
    editRecipe: function(id) {
        const recipe = getRecipeById(id);
        if (!recipe) return;
        
        showNotification('Функція редагування в розробці', 'info');
    },
    
    deleteRecipe: function(id) {
        showConfirmation(
            'Видалення рецепту',
            'Ви впевнені, що хочете видалити цей рецепт?',
            () => {
                deleteRecipeById(id);
                renderRecipes();
                showNotification('Рецепт видалено');
            }
        );
    },
    
    exportRecipe: function(id) {
        const recipe = getRecipeById(id);
        if (!recipe) return;
        
        const dataStr = JSON.stringify(recipe, null, 2);
        const exportFileDefaultName = `${recipe.name.replace(/\s+/g, '_')}.json`;
        
        exportToFile(dataStr, exportFileDefaultName);
        showNotification(`Рецепт "${recipe.name}" експортовано`);
    },
    
    editPaint: function(id) {
        showNotification('Функція редагування фарб в розробці', 'info');
    },
    
    deletePaint: function(id) {
        showConfirmation(
            'Видалення фарби',
            'Ви впевнені, що хочете видалити цю фарбу з каталогу?',
            () => {
                deletePaintById(id);
                renderPaintCatalog();
                showNotification('Фарбу видалено з каталогу');
            }
        );
    }
};

// Запуск додатку при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initApp);