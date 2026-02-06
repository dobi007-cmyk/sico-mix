// Глобальні змінні
let selectedIngredients = [];
let selectedRecipes = [];

// Ініціалізація додатка
function initApp() {
    console.log('Inicjalizacja aplikacji...');
    
    // Załaduj dane
    loadData();
    
    // Inicjalizuj język
    initLanguage();
    
    // Ustaw event listeners
    setupEventListeners();
    
    // Zaktualizuj licznik farb
    updatePaintCount();
    
    // Renderuj katalog farb
    renderPaintCatalog();
    
    // Renderuj przepisy
    renderRecipes();
    
    // Renderuj listę składników
    renderIngredientsList();
    
    console.log('Aplikacja zainicjalizowana');
}

// Ustaw event listeners
function setupEventListeners() {
    console.log('Ustawianie event listeners...');
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const desktopMenuToggle = document.getElementById('desktopMenuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (desktopMenuToggle) {
        desktopMenuToggle.addEventListener('click', () => {
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
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('active');
            document.getElementById('mainContainer').classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
            
            // On mobile, close sidebar
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // Color picker
    const recipeColor = document.getElementById('recipeColor');
    const colorPreview = document.getElementById('colorPreview');
    
    if (recipeColor && colorPreview) {
        recipeColor.addEventListener('input', function() {
            colorPreview.style.background = this.value;
        });
    }
    
    // File upload
    const recipePhoto = document.getElementById('recipePhoto');
    const fileName = document.getElementById('fileName');
    
    if (recipePhoto && fileName) {
        recipePhoto.addEventListener('change', function() {
            const name = this.files[0]?.name || getTranslation('uploadPhoto');
            fileName.textContent = name;
        });
    }
    
    // New recipe buttons
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');
    const clearRecipeBtn = document.getElementById('clearRecipeBtn');
    const calculatePercentagesBtn = document.getElementById('calculatePercentagesBtn');
    
    if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
    if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
    if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
    if (calculatePercentagesBtn) calculatePercentagesBtn.addEventListener('click', calculatePercentages);
    
    // Recipes page buttons
    const exportRecipesBtn = document.getElementById('exportRecipesBtn');
    const importRecipesBtn = document.getElementById('importRecipesBtn');
    const printRecipesBtn = document.getElementById('printRecipesBtn');
    const deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
    
    if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
    if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
    if (printRecipesBtn) printRecipesBtn.addEventListener('click', printRecipes);
    if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);
    
    // Catalog page buttons
    const addNewPaintBtn = document.getElementById('addNewPaintBtn');
    if (addNewPaintBtn) {
        addNewPaintBtn.addEventListener('click', () => {
            document.getElementById('addPaintModal').classList.add('active');
        });
    }
    
    // Paint modal buttons
    const closePaintModal = document.getElementById('closePaintModal');
    const cancelPaintBtn = document.getElementById('cancelPaintBtn');
    const savePaintBtn = document.getElementById('savePaintBtn');
    
    if (closePaintModal) {
        closePaintModal.addEventListener('click', () => {
            document.getElementById('addPaintModal').classList.remove('active');
        });
    }
    
    if (cancelPaintBtn) {
        cancelPaintBtn.addEventListener('click', () => {
            document.getElementById('addPaintModal').classList.remove('active');
        });
    }
    
    if (savePaintBtn) {
        savePaintBtn.addEventListener('click', saveNewPaint);
    }
    
    // Search and filter
    const paintSearch = document.getElementById('paintSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const recipeSearch = document.getElementById('recipeSearch');
    const recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
    const catalogSearch = document.getElementById('catalogSearch');
    
    if (paintSearch) paintSearch.addEventListener('input', renderIngredientsList);
    if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);
    if (recipeSearch) recipeSearch.addEventListener('input', renderRecipes);
    if (recipeCategoryFilter) recipeCategoryFilter.addEventListener('change', renderRecipes);
    if (catalogSearch) catalogSearch.addEventListener('input', renderPaintCatalog);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            e.target !== menuToggle &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('Event listeners ustawione');
}

// Przełączanie stron
function switchPage(pageId) {
    console.log('Przełączanie na stronę:', pageId);
    
    // Ukryj wszystkie strony
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Pokaż wybraną stronę
    const selectedPage = document.getElementById(`${pageId}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Update page specific data
        if (pageId === 'recipes') {
            renderRecipes();
        } else if (pageId === 'catalog') {
            renderPaintCatalog();
        } else if (pageId === 'new-recipe') {
            renderIngredientsList();
        }
    }
    
    // Update active navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Renderuj listę składników
function renderIngredientsList() {
    const ingredientsList = document.getElementById('ingredientsList');
    if (!ingredientsList) return;
    
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
                    <option value="g" ${ingredient.unit === 'g' ? 'selected' : ''}>g</option>
                    <option value="kg" ${ingredient.unit === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="ml" ${ingredient.unit === 'ml' ? 'selected' : ''}>ml</option>
                    <option value="l" ${ingredient.unit === 'l' ? 'selected' : ''}>l</option>
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
    const searchTerm = document.getElementById('paintSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    
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
    
    if (filterenedPaints.length === 0) {
        showNotification(getTranslation('noPaintsFound'), 'warning');
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
                <h3 class="modal-title">${getTranslation('selectPaint')}</h3>
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
                showNotification(getTranslation('paintAlreadyAdded'), 'warning');
                return;
            }
            
            selectedIngredients.push({
                paintId: paintId,
                amount: 100,
                unit: 'g',
                percentage: 0
            });
            
            calculatePercentages();
            renderIngredientsList();
            document.body.removeChild(modal);
            showNotification(getTranslation('paintAddedToRecipe'));
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
    const name = document.getElementById('recipeName')?.value || '';
    const category = document.getElementById('recipeCategory')?.value || '';
    const color = document.getElementById('recipeColor')?.value || '#4361ee';
    const description = document.getElementById('recipeDescription')?.value || '';
    
    if (!name || !category || selectedIngredients.length === 0) {
        showNotification(getTranslation('fillRequiredFields'), 'error');
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
    
    showNotification(getTranslation('recipeSaved'));
    clearRecipeForm();
    switchPage('recipes');
}

function clearRecipeForm() {
    const recipeName = document.getElementById('recipeName');
    const recipeCategory = document.getElementById('recipeCategory');
    const recipeColor = document.getElementById('recipeColor');
    const recipeDescription = document.getElementById('recipeDescription');
    const colorPreview = document.getElementById('colorPreview');
    const fileName = document.getElementById('fileName');
    const recipePhoto = document.getElementById('recipePhoto');
    
    if (recipeName) recipeName.value = '';
    if (recipeCategory) recipeCategory.value = '';
    if (recipeColor) recipeColor.value = '#4361ee';
    if (recipeDescription) recipeDescription.value = '';
    if (colorPreview) colorPreview.style.background = '#4361ee';
    if (fileName) fileName.textContent = getTranslation('uploadPhoto');
    if (recipePhoto) recipePhoto.value = '';
    
    selectedIngredients = [];
    renderIngredientsList();
}

// Renderuj przepisy
function renderRecipes() {
    const recipesContainer = document.getElementById('recipesContainer');
    if (!recipesContainer) return;
    
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

function updateRecipeSelection() {
    const checkboxes = document.querySelectorAll('.recipe-select');
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
        getTranslation('confirmationAction'),
        getTranslation('confirmationMessage'),
        () => {
            recipes = recipes.filter(recipe => recipe.id !== id);
            saveData();
            renderRecipes();
            showNotification(getTranslation('recipeDeleted'));
        }
    );
}

function deleteSelectedRecipes() {
    if (selectedRecipes.length === 0) {
        showNotification(getTranslation('selectForDelete'), 'warning');
        return;
    }
    
    showConfirmation(
        getTranslation('confirmationAction'),
        `Czy na pewno chcesz usunąć ${selectedRecipes.length} przepisów?`,
        () => {
            recipes = recipes.filter(recipe => !selectedRecipes.includes(recipe.id));
            selectedRecipes = [];
            saveData();
            renderRecipes();
            showNotification(`Usunięto ${selectedRecipes.length} przepisów`);
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
    
    showNotification(`${getTranslation('recipe')} "${recipe.name}" ${getTranslation('exported')}`);
}

function exportAllRecipes() {
    if (recipes.length === 0) {
        showNotification(getTranslation('noRecipesToExport'), 'warning');
        return;
    }
    
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification(`${getTranslation('exported')} ${recipes.length} ${getTranslation('recipes')}`);
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
                    showNotification(getTranslation('invalidFileFormat'), 'error');
                    return;
                }
                
                showConfirmation(
                    getTranslation('importRecipes'),
                    `Znaleziono ${importedRecipes.length} przepisów. Importować?`,
                    () => {
                        importedRecipes.forEach(recipe => {
                            recipe.id = Date.now() + Math.random();
                            recipes.push(recipe);
                        });
                        
                        saveData();
                        renderRecipes();
                        showNotification(`${getTranslation('imported')} ${importedRecipes.length} ${getTranslation('recipes')}`);
                    }
                );
            } catch (error) {
                showNotification(getTranslation('fileReadError'), 'error');
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
            <title>${getTranslation('printRecipes')} SICO MIX</title>
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
            <h1>${getTranslation('recipes')} SICO MIX</h1>
            <p>${getTranslation('printDate')}: ${new Date().toLocaleDateString(currentLanguage === 'pl' ? 'pl-PL' : 
                                                                                currentLanguage === 'uk' ? 'uk-UA' : 'en-US')}</p>
            <hr>
            ${recipes.map(recipe => `
                <div class="recipe">
                    <h2>${recipe.name}</h2>
                    <p><strong>${getTranslation('category')}:</strong> ${recipe.category}</p>
                    <p><strong>${getTranslation('creationDate')}:</strong> ${recipe.date}</p>
                    <p><strong>${getTranslation('description')}:</strong> ${recipe.description || '—'}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>${getTranslation('paint')}</th>
                                <th>${getTranslation('amount')}</th>
                                <th>${getTranslation('percentage')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recipe.ingredients.map(ing => {
                                const paint = paintCatalog.find(p => p.id === ing.paintId);
                                return `
                                    <tr>
                                        <td>${paint ? paint.name : '${getTranslation('unknown')}'}</td>
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

// Renderuj katalog farb
function renderPaintCatalog() {
    const paintCatalogElement = document.getElementById('paintCatalog');
    if (!paintCatalogElement) return;
    
    const searchTerm = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
    
    let filteredPaints = paintCatalog.filter(paint => 
        paint.name.toLowerCase().includes(searchTerm) ||
        paint.category.toLowerCase().includes(searchTerm) ||
        paint.manufacturer?.toLowerCase().includes(searchTerm) ||
        paint.article?.toLowerCase().includes(searchTerm)
    );
    
    paintCatalogElement.innerHTML = filteredPaints.map(paint => `
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

function saveNewPaint() {
    const name = document.getElementById('paintName')?.value || '';
    const category = document.getElementById('paintCategory')?.value || '';
    const color = document.getElementById('paintColorCode')?.value || '#000000';
    const description = document.getElementById('paintDescription')?.value || '';
    const manufacturer = document.getElementById('paintManufacturer')?.value || 'SICO';
    const article = document.getElementById('paintArticle')?.value || '';
    
    if (!name || !category) {
        showNotification(getTranslation('fillRequiredFields'), 'error');
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
    
    document.getElementById('addPaintModal').classList.remove('active');
    renderPaintCatalog();
    showNotification(getTranslation('paintAdded'));
}

function deletePaint(id) {
    showConfirmation(
        getTranslation('confirmationAction'),
        getTranslation('confirmationMessage'),
        () => {
            paintCatalog = paintCatalog.filter(paint => paint.id !== id);
            saveData();
            renderPaintCatalog();
            showNotification(getTranslation('paintDeleted'));
        }
    );
}

// Global functions for HTML onclick events
window.editRecipe = function(id) {
    showNotification(getTranslation('featureInDevelopment'), 'info');
};

window.deleteRecipe = function(id) {
    deleteRecipe(id);
};

window.exportRecipe = function(id) {
    exportRecipe(id);
};

window.editPaint = function(id) {
    showNotification(getTranslation('featureInDevelopment'), 'info');
};

window.deletePaint = function(id) {
    deletePaint(id);
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
