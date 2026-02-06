// data-colors.js
// Зберігаємо дані про фарби та рецепти, а також функції для роботи з ними

let recipes = [];
let paintCatalog = [];

const initialData = {
    paints: [
        { id: 1, name: "Червоний металік", category: "Металік", color: "#FF0000", manufacturer: "SICO", article: "MET-RED-001" },
        { id: 2, name: "Синій перламутр", category: "Перламутр", color: "#0000FF", manufacturer: "SICO", article: "PER-BLU-002" },
        { id: 3, name: "Чорний мат", category: "Матові", color: "#000000", manufacturer: "SICO", article: "MAT-BLK-003" },
        { id: 4, name: "Білий глянець", category: "Глянцеві", color: "#FFFFFF", manufacturer: "SICO", article: "GLOSS-WHT-004" },
        { id: 5, name: "Зелений акрил", category: "Акрилові", color: "#00FF00", manufacturer: "SICO", article: "ACR-GRN-005" },
        { id: 6, name: "Жовтий епоксид", category: "Епоксидні", color: "#FFFF00", manufacturer: "SICO", article: "EPO-YLW-006" }
    ],
    recipes: [
        { 
            id: 1, 
            name: "Автомобільний червоний", 
            category: "Металік", 
            color: "#FF0000",
            description: "Яскраво-червоний металік для автомобілів",
            ingredients: [
                { paintId: 1, amount: 500, unit: "г", percentage: 50 },
                { paintId: 3, amount: 300, unit: "г", percentage: 30 },
                { paintId: 4, amount: 200, unit: "г", percentage: 20 }
            ],
            date: "15.03.2023",
            photo: null
        },
        { 
            id: 2, 
            name: "Ніжний перламутровий", 
            category: "Перламутр", 
            color: "#FFC0CB",
            description: "Ніжний рожевий перламутр з ефектом перламутру",
            ingredients: [
                { paintId: 2, amount: 400, unit: "г", percentage: 40 },
                { paintId: 4, amount: 600, unit: "г", percentage: 60 }
            ],
            date: "10.03.2023",
            photo: null
        }
    ]
};

// Завантаження даних з localStorage
function loadData() {
    const savedRecipes = localStorage.getItem('sicoMixRecipes');
    const savedPaints = localStorage.getItem('sicoMixPaints');
    
    recipes = savedRecipes ? JSON.parse(savedRecipes) : initialData.recipes;
    paintCatalog = savedPaints ? JSON.parse(savedPaints) : initialData.paints;
}

// Збереження даних в localStorage
function saveData() {
    localStorage.setItem('sicoMixRecipes', JSON.stringify(recipes));
    localStorage.setItem('sicoMixPaints', JSON.stringify(paintCatalog));
}

// Отримати фарбу за ID
function getPaintById(id) {
    return paintCatalog.find(paint => paint.id === id);
}

// Отримати рецепт за ID
function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id);
}

// Додати нову фарбу
function addPaint(paint) {
    paint.id = Date.now();
    paintCatalog.push(paint);
    saveData();
    return paint;
}

// Додати новий рецепт
function addRecipe(recipe) {
    recipe.id = Date.now();
    recipe.date = new Date().toLocaleDateString('uk-UA');
    recipes.push(recipe);
    saveData();
    return recipe;
}

// Видалити фарбу за ID
function deletePaintById(id) {
    paintCatalog = paintCatalog.filter(paint => paint.id !== id);
    saveData();
}

// Видалити рецепт за ID
function deleteRecipeById(id) {
    recipes = recipes.filter(recipe => recipe.id !== id);
    saveData();
}

// Оновити фарбу
function updatePaint(updatedPaint) {
    const index = paintCatalog.findIndex(paint => paint.id === updatedPaint.id);
    if (index !== -1) {
        paintCatalog[index] = updatedPaint;
        saveData();
    }
}

// Оновити рецепт
function updateRecipe(updatedRecipe) {
    const index = recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index !== -1) {
        recipes[index] = updatedRecipe;
        saveData();
    }
}

// Пошук фарб
function searchPaints(searchTerm, category) {
    let filtered = paintCatalog;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(paint => 
            paint.name.toLowerCase().includes(term) ||
            paint.category.toLowerCase().includes(term) ||
            (paint.manufacturer && paint.manufacturer.toLowerCase().includes(term)) ||
            (paint.article && paint.article.toLowerCase().includes(term))
        );
    }
    if (category) {
        filtered = filtered.filter(paint => paint.category === category);
    }
    return filtered;
}

// Пошук рецептів
function searchRecipes(searchTerm, category) {
    let filtered = recipes;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(recipe => 
            recipe.name.toLowerCase().includes(term) ||
            (recipe.description && recipe.description.toLowerCase().includes(term))
        );
    }
    if (category) {
        filtered = filtered.filter(recipe => recipe.category === category);
    }
    return filtered;
}

// Отримати всі категорії фарб
function getPaintCategories() {
    const categories = new Set();
    paintCatalog.forEach(paint => categories.add(paint.category));
    return Array.from(categories);
}

// Отримати всі категорії рецептів
function getRecipeCategories() {
    const categories = new Set();
    recipes.forEach(recipe => categories.add(recipe.category));
    return Array.from(categories);
}

// Експорт даних у форматі JSON
function exportData(includeRecipes = true, includePaints = true) {
    const data = {};
    if (includeRecipes) data.recipes = recipes;
    if (includePaints) data.paints = paintCatalog;
    return JSON.stringify(data, null, 2);
}

// Імпорт даних з JSON
function importData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        if (data.recipes && Array.isArray(data.recipes)) {
            data.recipes.forEach(recipe => {
                // Генеруємо нові ID, щоб уникнути конфліктів
                recipe.id = Date.now() + Math.random();
                recipes.push(recipe);
            });
        }
        if (data.paints && Array.isArray(data.paints)) {
            data.paints.forEach(paint => {
                paint.id = Date.now() + Math.random();
                paintCatalog.push(paint);
            });
        }
        saveData();
        return true;
    } catch (error) {
        console.error('Помилка імпорту даних:', error);
        return false;
    }
}