// ========== ГЛОБАЛЬНІ ЗМІННІ ==========
let recipes = [];
let paintCatalog = [];
let selectedIngredients = [];
let selectedRecipes = [];

// ========== DOM ЕЛЕМЕНТИ ==========
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const desktopMenuToggle = document.getElementById('desktopMenuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const mainContainer = document.getElementById('mainContainer');
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');
const totalPaintsElement = document.getElementById('totalPaints');
const headerPaintCount = document.getElementById('headerPaintCount');
const colorPreview = document.getElementById('colorPreview');
const recipeColor = document.getElementById('recipeColor');
const ingredientsList = document.getElementById('ingredientsList');
const paintSearch = document.getElementById('paintSearch');
const categoryFilter = document.getElementById('categoryFilter');
const addIngredientBtn = document.getElementById('addIngredientBtn');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const clearRecipeBtn = document.getElementById('clearRecipeBtn');
const calculatePercentagesBtn = document.getElementById('calculatePercentagesBtn');
const recipesContainer = document.getElementById('recipesContainer');
const exportRecipesBtn = document.getElementById('exportRecipesBtn');
const importRecipesBtn = document.getElementById('importRecipesBtn');
const printRecipesBtn = document.getElementById('printRecipesBtn');
const deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
const paintCatalogElement = document.getElementById('paintCatalog');
const addNewPaintBtn = document.getElementById('addNewPaintBtn');
const addPaintModal = document.getElementById('addPaintModal');
const closePaintModal = document.getElementById('closePaintModal');
const savePaintBtn = document.getElementById('savePaintBtn');
const cancelPaintBtn = document.getElementById('cancelPaintBtn');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationTitle = document.getElementById('confirmationTitle');
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmActionBtn = document.getElementById('confirmActionBtn');
const cancelActionBtn = document.getElementById('cancelActionBtn');
const closeConfirmationModal = document.getElementById('closeConfirmationModal');
const actionCards = document.querySelectorAll('.action-card');

// ========== ФУНКЦІЇ ІНІЦІАЛІЗАЦІЇ ==========
function initApp() {
    loadData();
    setupEventListeners();
    updatePaintCount();
    renderPaintCatalog();
    loadRecipes();
    renderIngredientsList();
    
    // Ініціалізація міжнародного перекладу
    initializeI18n();
}

function loadData() {
    const savedRecipes = localStorage.getItem('sicoMixRecipes');
    const savedPaints = localStorage.getItem('sicoMixPaints');
    
    recipes = savedRecipes ? JSON.parse(savedRecipes) : getInitialData().recipes;
    paintCatalog = savedPaints ? JSON.parse(savedPaints) : getInitialData().paints;
}

function saveData() {
    localStorage.setItem('sicoMixRecipes', JSON.stringify(recipes));
    localStorage.setItem('sicoMixPaints', JSON.stringify(paintCatalog));
}

// ========== НАВІГАЦІЯ ==========
function setupNavigation() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    desktopMenuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        mainContainer.classList.add('sidebar-open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        mainContainer.classList.remove('sidebar-open');
        document.body.style.overflow = 'auto';
    });

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

// ========== НОВИЙ РЕЦЕПТ ==========
function renderIngredientsList() {
    ingredientsList.innerHTML = '';
    
    selectedIngredients.forEach((ingredient, index) => {
        const paint = paintCatalog.find(p => p.id === ingredient.paintId);
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
    const searchTerm = paintSearch.value.toLowerCase();
    const category = categoryFilter.value;
    
    let filteredPaints = paintCatalog;
    
    if (searchTerm) {
        filteredPaints = filteredPaints.filter(paint => 
            paint.name.toLowerCase().includes(searchTerm) ||
            paint.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        filteredPaints = filteredPaints.filter(paint => paint.category === category);
    }
    
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
    
    recipes.push(newRecipe);
    saveData();
    
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

// ========== РЕЦЕПТИ ==========
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
                        <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="editRecipe(${recipe.id})">
                            <i class="fas fa-edit"></i> Редагувати
                        </button>
                        <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="deleteRecipe(${recipe.id})">
                            <i class="fas fa-trash"></i> Видалити
                        </button>
                        <button class="recipe-btn" style="background: var(--success); color: white;" onclick="exportRecipe(${recipe.id})">
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

function deleteRecipe(id) {
    showConfirmation(
        'Видалення рецепту',
        'Ви впевнені, що хочете видалити цей рецепт?',
        () => {
            recipes = recipes.filter(recipe => recipe.id !== id);
            saveData();
            renderRecipes();
            showNotification('Рецепт видалено');
        }
    );
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
            recipes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id));
            selectedRecipes = [];
            saveData();
            renderRecipes();
            showNotification(`Видалено ${selectedRecipes.length} рецептів`);
        }
    );
}

function exportRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    const dataStr = JSON.stringify(recipe, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${recipe.name.replace(/\s+/g, '_')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification(`Рецепт "${recipe.name}" експортовано`);
}

function exportAllRecipes() {
    if (recipes.length === 0) {
        showNotification('Немає рецептів для експорту', 'warning');
        return;
    }
    
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification(`Експортовано ${recipes.length} рецептів`);
}

function importRecipes() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const importedRecipes = JSON.parse(event.target.result);
                
                if (!Array.isArray(importedRecipes)) {
                    showNotification('Невірний формат файлу', 'error');
                    return;
                }
                
                showConfirmation(
                    'Імпорт рецептів',
                    `Виявлено ${importedRecipes.length} рецептів. Імпортувати?`,
                    () => {
                        importedRecipes.forEach(recipe => {
                            recipe.id = Date.now() + Math.random();
                            recipes.push(recipe);
                        });
                        
                        saveData();
                        renderRecipes();
                        showNotification(`Імпортовано ${importedRecipes.length} рецептів`);
                    }
                );
            } catch (error) {
                showNotification('Помилка читання файлу', 'error');
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
                                const paint = paintCatalog.find(p => p.id === ing.paintId);
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

// ========== КАТАЛОГ ФАРБ ==========
function renderPaintCatalog() {
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
                    <button class="recipe-btn" style="background: var(--primary); color: white;" onclick="editPaint(${paint.id})">
                        <i class="fas fa-edit"></i> Редагувати
                    </button>
                    <button class="recipe-btn" style="background: var(--danger); color: white;" onclick="deletePaint(${paint.id})">
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
    
    paintCatalog.push(newPaint);
    saveData();
    
    addPaintModal.classList.remove('active');
    renderPaintCatalog();
    showNotification(`Фарбу "${name}" додано до каталогу`);
}

function deletePaint(id) {
    showConfirmation(
        'Видалення фарби',
        'Ви впевнені, що хочете видалити цю фарбу з каталогу?',
        () => {
            paintCatalog = paintCatalog.filter(paint => paint.id !== id);
            saveData();
            renderPaintCatalog();
            showNotification('Фарбу видалено з каталогу');
        }
    );
}

function updatePaintCount() {
    const count = paintCatalog.length;
    totalPaintsElement.textContent = count;
    headerPaintCount.textContent = count;
}

// ========== УТІЛІТИ ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--primary)' : 
                   type === 'error' ? 'var(--danger)' : 
                   type === 'warning' ? 'var(--warning)' : 'var(--gray)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        z-index: 1001;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' :
                type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showConfirmation(title, message, onConfirm) {
    confirmationTitle.textContent = title;
    confirmationMessage.textContent = message;
    confirmationModal.classList.add('active');
    
    const handleConfirm = () => {
        onConfirm();
        confirmationModal.classList.remove('active');
    };
    
    const handleCancel = () => {
        confirmationModal.classList.remove('active');
    };
    
    confirmActionBtn.onclick = handleConfirm;
    cancelActionBtn.onclick = handleCancel;
    closeConfirmationModal.onclick = handleCancel;
}

// ========== НАЛАШТУВАННЯ ПОДІЙ ==========
function setupEventListeners() {
    setupNavigation();
    
    // Color picker
    recipeColor.addEventListener('input', function() {
        colorPreview.style.background = this.value;
    });
    
    // File upload
    const recipePhotoInput = document.getElementById('recipePhoto');
    recipePhotoInput.addEventListener('change', function() {
        const fileName = this.files[0]?.name || 'Завантажити фото';
        document.getElementById('fileName').textContent = fileName;
    });
    
    // New recipe buttons
    addIngredientBtn.addEventListener('click', addIngredient);
    saveRecipeBtn.addEventListener('click', saveRecipe);
    clearRecipeBtn.addEventListener('click', clearRecipeForm);
    calculatePercentagesBtn.addEventListener('click', calculatePercentages);
    
    // Recipes page buttons
    exportRecipesBtn.addEventListener('click', exportAllRecipes);
    importRecipesBtn.addEventListener('click', importRecipes);
    printRecipesBtn.addEventListener('click', printRecipes);
    deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);
    
    // Catalog page buttons
    addNewPaintBtn.addEventListener('click', addNewPaint);
    
    // Paint modal buttons
    closePaintModal.addEventListener('click', () => {
        addPaintModal.classList.remove('active');
    });
    
    cancelPaintBtn.addEventListener('click', () => {
        addPaintModal.classList.remove('active');
    });
    
    savePaintBtn.addEventListener('click', saveNewPaint);
    
    // Search functionality
    paintSearch?.addEventListener('input', renderIngredientsList);
    categoryFilter?.addEventListener('change', renderIngredientsList);
}

// ========== ГЛОБАЛЬНІ ФУНКЦІЇ ==========
window.editRecipe = function(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    showNotification('Функція редагування в розробці', 'info');
};

window.deleteRecipe = function(id) {
    deleteRecipe(id);
};

window.exportRecipe = function(id) {
    exportRecipe(id);
};

window.editPaint = function(id) {
    showNotification('Функція редагування фарб в розробці', 'info');
};

window.deletePaint = function(id) {
    deletePaint(id);
};

// ========== ЗАПУСК ДОДАТКУ ==========
document.addEventListener('DOMContentLoaded', initApp);
