// app.js – головний модуль додатку (без динамічного прев'ю кольору)
import * as Storage from './utils.js';
import { initialData, generateColorFromCategory } from './data-colors.js';
import { t, initI18n, applyTranslations } from './i18n.js';

// ------------------- Глобальний стан (Proxy + автосейв) -------------------
const STORE_KEYS = {
  recipes: 'recipes',
  paints: 'paints',
  settings: 'settings'
};

let state = {
  recipes: [],
  paints: [],
  settings: {
    language: 'uk',
    units: 'grams',
    autoSave: true,
    backup: false,
    theme: 'system',
    defaultCategory: 'Текстиль',
    defaultUnit: 'г',
    calculationsPrecision: 2
  },
  ui: {
    sidebarOpen: window.innerWidth > 992,
    currentPage: 'home',
    selectedIngredients: [],
    editingRecipeId: null,
    selectedRecipes: []
  }
};

const handler = {
  set(target, prop, value) {
    target[prop] = value;
    if (prop !== 'ui' && state.settings.autoSave) {
      Storage.saveToIndexedDB(STORE_KEYS[prop], value).catch(console.error);
    }
    return true;
  }
};

export const appState = new Proxy(state, handler);

// ------------------- DOM елементи -------------------
let sidebar, menuToggle, closeSidebar, mainContainer, navLinks, pageContents;
let totalPaintsElement, headerPaintCount, ingredientsList, paintSearch, categoryFilter;
let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
let paintCatalogElement, addNewPaintBtn;
let addPaintDialog, savePaintBtn, cancelPaintBtn;
let confirmationDialog, confirmActionBtn, cancelActionBtn, confirmationTitle, confirmationMessage;
let languageSelect, unitsSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;

// ------------------- Ініціалізація -------------------
export async function initApp() {
  await initI18n();
  await loadInitialData();
  cacheDOMElements();
  setupEventListeners();
  renderCurrentPage();
  updatePaintCount();
  renderPaintCatalog();
  registerServiceWorker();
}

async function loadInitialData() {
  const savedRecipes = await Storage.loadFromIndexedDB(STORE_KEYS.recipes);
  appState.recipes = savedRecipes.length ? savedRecipes : initialData.recipes;
  const savedPaints = await Storage.loadFromIndexedDB(STORE_KEYS.paints);
  appState.paints = savedPaints.length ? savedPaints : initialData.paints;
  const savedSettings = await Storage.loadFromIndexedDB(STORE_KEYS.settings);
  if (savedSettings) appState.settings = { ...appState.settings, ...savedSettings };
  appState.ui.selectedIngredients = [];
}

function cacheDOMElements() {
  sidebar = document.getElementById('sidebar');
  menuToggle = document.getElementById('menuToggle');
  closeSidebar = document.getElementById('closeSidebar');
  mainContainer = document.getElementById('mainContainer');
  navLinks = document.querySelectorAll('.nav-link');
  pageContents = document.querySelectorAll('.page-content');
  totalPaintsElement = document.getElementById('totalPaints');
  headerPaintCount = document.getElementById('headerPaintCount');
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
  addPaintDialog = document.getElementById('addPaintDialog');
  savePaintBtn = document.getElementById('savePaintBtn');
  cancelPaintBtn = document.getElementById('cancelPaintBtn');
  confirmationDialog = document.getElementById('confirmationDialog');
  confirmActionBtn = document.getElementById('confirmActionBtn');
  cancelActionBtn = document.getElementById('cancelActionBtn');
  confirmationTitle = document.getElementById('confirmationTitle');
  confirmationMessage = document.getElementById('confirmationMessage');
  languageSelect = document.getElementById('languageSelect');
  unitsSelect = document.getElementById('unitsSelect');
  autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
  backupCheckbox = document.getElementById('backupCheckbox');
  saveSettingsBtn = document.getElementById('saveSettingsBtn');
  resetSettingsBtn = document.getElementById('resetSettingsBtn');
  clearAllDataBtn = document.getElementById('clearAllDataBtn');
}

// ------------------- Навігація -------------------
function setupNavigation() {
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
      sidebar.classList.remove('active');
      mainContainer.classList.remove('sidebar-open');
      document.body.style.overflow = 'auto';
    });
  }
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle?.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('data-page');
      switchPage(pageId);
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
}

function switchPage(pageId) {
  if (appState.ui.editingRecipeId && pageId !== 'new-recipe') {
    resetEditMode();
  }
  pageContents.forEach(page => page.classList.remove('active'));
  const selectedPage = document.getElementById(`${pageId}-page`);
  if (selectedPage) {
    selectedPage.classList.add('active');
    appState.ui.currentPage = pageId;
    if (pageId === 'recipes') renderRecipes();
    else if (pageId === 'catalog') renderPaintCatalog();
    else if (pageId === 'new-recipe' && !appState.ui.editingRecipeId) clearRecipeForm();
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) link.classList.add('active');
  });
}

// ------------------- Робота з рецептами -------------------
function renderIngredientsList() {
  if (!ingredientsList) return;
  ingredientsList.innerHTML = '';
  if (appState.ui.selectedIngredients.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="5" style="text-align:center;padding:40px;color:var(--gray);">
      <i class="fas fa-paint-brush" style="font-size:24px;margin-bottom:10px;display:block;"></i>
      <span>${t('paints_not_found')}</span>
    </td>`;
    ingredientsList.appendChild(tr);
    return;
  }

  appState.ui.selectedIngredients.forEach((ing, index) => {
    const paint = appState.paints.find(p => p.id === ing.paintId);
    if (!paint) return;
    const row = document.createElement('tr');

    // Фарба
    const tdPaint = document.createElement('td');
    tdPaint.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:20px;height:20px;background:${Storage.escapeHTML(paint.color)};border-radius:6px;"></div>
        <div>
          <div style="font-weight:600;">${Storage.escapeHTML(paint.name)}</div>
          <div style="font-size:12px;color:var(--gray);">${Storage.escapeHTML(paint.category)}</div>
        </div>
      </div>
    `;
    row.appendChild(tdPaint);

    // Кількість
    const tdAmount = document.createElement('td');
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.className = 'input-small';
    amountInput.value = ing.amount;
    amountInput.dataset.index = index;
    amountInput.dataset.field = 'amount';
    amountInput.min = 0;
    amountInput.step = 0.1;
    amountInput.addEventListener('change', handleIngredientChange);
    amountInput.addEventListener('input', handleIngredientChange);
    tdAmount.appendChild(amountInput);
    row.appendChild(tdAmount);

    // Одиниці
    const tdUnit = document.createElement('td');
    const unitSelect = document.createElement('select');
    unitSelect.className = 'unit-select';
    unitSelect.dataset.index = index;
    unitSelect.dataset.field = 'unit';
    ['г','кг','мл','л'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u;
      opt.textContent = u;
      if (ing.unit === u) opt.selected = true;
      unitSelect.appendChild(opt);
    });
    unitSelect.addEventListener('change', handleIngredientChange);
    tdUnit.appendChild(unitSelect);
    row.appendChild(tdUnit);

    // Відсоток
    const tdPercent = document.createElement('td');
    const percentInput = document.createElement('input');
    percentInput.type = 'number';
    percentInput.className = 'input-small';
    percentInput.value = ing.percentage || 0;
    percentInput.dataset.index = index;
    percentInput.dataset.field = 'percentage';
    percentInput.min = 0;
    percentInput.max = 100;
    percentInput.step = 0.1;
    percentInput.readOnly = true;
    tdPercent.appendChild(percentInput);
    tdPercent.appendChild(document.createTextNode(' %'));
    row.appendChild(tdPercent);

    // Дії
    const tdActions = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon delete-ingredient';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.dataset.index = index;
    deleteBtn.addEventListener('click', () => deleteIngredient(index));
    tdActions.appendChild(deleteBtn);
    row.appendChild(tdActions);

    ingredientsList.appendChild(row);
  });
}

function handleIngredientChange(e) {
  const index = parseInt(e.target.dataset.index);
  const field = e.target.dataset.field;
  const value = e.target.value;
  if (index >= 0 && index < appState.ui.selectedIngredients.length) {
    appState.ui.selectedIngredients[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    if (field === 'amount') calculatePercentages();
  }
}

function addIngredient() {
  const searchTerm = paintSearch?.value.toLowerCase() || '';
  const category = categoryFilter?.value || '';
  let filtered = appState.paints;
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  if (category) filtered = filtered.filter(p => p.category === category);
  if (filtered.length === 0) {
    Storage.showNotification(t('paints_not_found'), 'error');
    return;
  }
  showPaintSelection(filtered);
}

function showPaintSelection(paints) {
  const dialog = document.createElement('dialog');
  dialog.className = 'glass-card';
  dialog.innerHTML = `
    <form method="dialog">
      <div class="modal-header">
        <h3>${t('select_paint')}</h3>
        <button type="button" class="modal-close" onclick="this.closest('dialog').close()">&times;</button>
      </div>
      <div style="max-height:400px;overflow-y:auto;padding:20px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:15px;">
          ${paints.map(p => `
            <div class="paint-selection-card" data-id="${p.id}">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                <div style="width:30px;height:30px;background:${p.color};border-radius:8px;"></div>
                <div style="font-weight:600;">${Storage.escapeHTML(p.name)}</div>
              </div>
              <div style="font-size:12px;color:var(--gray);">${Storage.escapeHTML(p.category)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('.paint-selection-card').forEach(card => {
    card.addEventListener('click', function() {
      const paintId = this.dataset.id;
      if (appState.ui.selectedIngredients.some(ing => ing.paintId === paintId)) {
        Storage.showNotification(t('paint_already_added'), 'warning');
        return;
      }
      appState.ui.selectedIngredients.push({ paintId, amount: 100, unit: 'г', percentage: 0 });
      calculatePercentages();
      renderIngredientsList();
      dialog.close();
      Storage.showNotification(t('paint_added_to_recipe'));
    });
  });
  dialog.addEventListener('close', () => document.body.removeChild(dialog));
}

function deleteIngredient(index) {
  if (index >= 0 && index < appState.ui.selectedIngredients.length) {
    appState.ui.selectedIngredients.splice(index, 1);
    calculatePercentages();
    renderIngredientsList();
  }
}

function calculatePercentages() {
  appState.ui.selectedIngredients = Storage.calculateIngredientPercentages(appState.ui.selectedIngredients);
  renderIngredientsList();
}

function saveRecipe() {
  const name = document.getElementById('recipeName')?.value.trim();
  const category = document.getElementById('recipeCategory')?.value;
  const description = document.getElementById('recipeDescription')?.value.trim();
  if (!name || !category || appState.ui.selectedIngredients.length === 0) {
    Storage.showNotification(t('fill_required_fields'), 'error');
    return;
  }
  const firstPaint = appState.paints.find(p => p.id === appState.ui.selectedIngredients[0]?.paintId);
  const color = firstPaint ? firstPaint.color : '#4361ee';

  if (appState.ui.editingRecipeId) {
    const index = appState.recipes.findIndex(r => r.id === appState.ui.editingRecipeId);
    if (index !== -1) {
      appState.recipes[index] = {
        ...appState.recipes[index],
        name, category, color, description,
        ingredients: [...appState.ui.selectedIngredients],
        date: new Date().toLocaleDateString('uk-UA')
      };
      Storage.saveToIndexedDB(STORE_KEYS.recipes, appState.recipes);
      Storage.showNotification(`${t('recipe_saved')} "${name}"`);
      resetEditMode();
    }
  } else {
    const newRecipe = {
      id: Storage.generateId(),
      name, category, color, description,
      ingredients: [...appState.ui.selectedIngredients],
      date: new Date().toLocaleDateString('uk-UA'),
      photo: null
    };
    appState.recipes = [...appState.recipes, newRecipe];
    Storage.showNotification(`${t('recipe_saved')} "${name}"`);
  }
  clearRecipeForm();
  switchPage('recipes');
}

function clearRecipeForm() {
  document.getElementById('recipeName').value = '';
  document.getElementById('recipeCategory').value = '';
  document.getElementById('recipeDescription').value = '';
  appState.ui.selectedIngredients = [];
  renderIngredientsList();
  resetEditMode();
}

function resetEditMode() {
  appState.ui.editingRecipeId = null;
  if (saveRecipeBtn) {
    saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe">${t('save_recipe')}</span>`;
  }
}

function editRecipe(id) {
  const recipe = appState.recipes.find(r => r.id === id);
  if (!recipe) return;
  document.getElementById('recipeName').value = recipe.name;
  document.getElementById('recipeCategory').value = recipe.category;
  document.getElementById('recipeDescription').value = recipe.description || '';
  appState.ui.selectedIngredients = [...recipe.ingredients];
  renderIngredientsList();
  appState.ui.editingRecipeId = id;
  if (saveRecipeBtn) {
    saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe">${t('update_recipe')}</span>`;
  }
  switchPage('new-recipe');
}

function deleteRecipe(id) {
  showConfirmation(t('delete_recipe'), t('delete_recipe_confirmation'), () => {
    appState.recipes = appState.recipes.filter(r => r.id !== id);
    appState.ui.selectedRecipes = appState.ui.selectedRecipes.filter(rid => rid !== id);
    Storage.saveToIndexedDB(STORE_KEYS.recipes, appState.recipes);
    renderRecipes();
    Storage.showNotification(t('recipe_deleted'));
  });
}

function deleteSelectedRecipes() {
  if (appState.ui.selectedRecipes.length === 0) {
    Storage.showNotification(t('select_recipes_to_delete'), 'warning');
    return;
  }
  showConfirmation(t('delete_recipes'), `${t('delete_recipes_confirmation')} ${appState.ui.selectedRecipes.length} ${t('recipes')}?`, () => {
    appState.recipes = appState.recipes.filter(r => !appState.ui.selectedRecipes.includes(r.id));
    appState.ui.selectedRecipes = [];
    Storage.saveToIndexedDB(STORE_KEYS.recipes, appState.recipes);
    renderRecipes();
    Storage.showNotification(`${t('deleted')} ${appState.ui.selectedRecipes.length} ${t('recipes')}`);
  });
}

function renderRecipes() {
  if (!recipesContainer) return;
  const searchTerm = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
  const category = document.getElementById('recipeCategoryFilter')?.value || '';
  let filtered = appState.recipes;
  if (searchTerm) filtered = filtered.filter(r => r.name.toLowerCase().includes(searchTerm) || r.description?.toLowerCase().includes(searchTerm));
  if (category) filtered = filtered.filter(r => r.category === category);
  
  if (filtered.length === 0) {
    recipesContainer.innerHTML = `<p style="text-align:center;color:var(--gray);padding:40px;">${t('no_recipes')}</p>`;
    return;
  }
  recipesContainer.innerHTML = filtered.map(recipe => {
    const totalAmount = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
    return `
      <div class="recipe-card glass-card" data-id="${recipe.id}">
        ${recipe.photo ? `<img src="${recipe.photo}" class="recipe-image" alt="${Storage.escapeHTML(recipe.name)}">` :
          `<div class="recipe-image" style="background:linear-gradient(145deg, ${recipe.color}30, ${recipe.color}70); display:flex; align-items:center; justify-content:center;">
            <i class="fas fa-palette" style="font-size:60px; color:${recipe.color};"></i>
          </div>`}
        <div class="recipe-content">
          <div class="recipe-header">
            <div>
              <h3 class="recipe-title">${Storage.escapeHTML(recipe.name)}</h3>
              <span class="recipe-category">${Storage.escapeHTML(recipe.category)}</span>
            </div>
            <div class="recipe-select-container">
              <input type="checkbox" class="recipe-select" value="${recipe.id}" ${appState.ui.selectedRecipes.includes(recipe.id) ? 'checked' : ''}>
              <span>${t('select')}</span>
            </div>
          </div>
          <p class="recipe-description">${Storage.escapeHTML(recipe.description || t('no_description'))}</p>
          <div class="recipe-meta">
            <div><span style="font-size:12px;color:var(--gray);">${t('ingredients_count')}</span><br><strong>${recipe.ingredients.length}</strong></div>
            <div><span style="font-size:12px;color:var(--gray);">${t('total_weight')}</span><br><strong>${totalAmount} г</strong></div>
            <div><span style="font-size:12px;color:var(--gray);">${t('date')}</span><br><strong>${recipe.date}</strong></div>
          </div>
          <div class="recipe-actions">
            <button class="recipe-btn" style="background:var(--primary);color:white;" onclick="window.editRecipe('${recipe.id}')"><i class="fas fa-edit"></i> ${t('edit')}</button>
            <button class="recipe-btn" style="background:var(--danger);color:white;" onclick="window.deleteRecipe('${recipe.id}')"><i class="fas fa-trash"></i> ${t('delete')}</button>
            <button class="recipe-btn" style="background:var(--success);color:white;" onclick="window.exportRecipe('${recipe.id}')"><i class="fas fa-download"></i> ${t('export')}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  attachRecipeCheckboxListeners();
}

function attachRecipeCheckboxListeners() {
  recipesContainer.querySelectorAll('.recipe-select').forEach(cb => {
    cb.addEventListener('change', function() {
      if (this.checked) {
        if (!appState.ui.selectedRecipes.includes(this.value)) {
          appState.ui.selectedRecipes.push(this.value);
        }
      } else {
        appState.ui.selectedRecipes = appState.ui.selectedRecipes.filter(id => id !== this.value);
      }
    });
  });
}

function exportRecipe(id) {
  const recipe = appState.recipes.find(r => r.id === id);
  if (!recipe) return;
  Storage.downloadFile(JSON.stringify(recipe, null, 2), `${recipe.name.replace(/\s+/g, '_')}.json`);
  Storage.showNotification(`${t('recipe_exported')} "${recipe.name}"`);
}

function exportAllRecipes() {
  if (appState.recipes.length === 0) {
    Storage.showNotification(t('no_recipes_to_export'), 'warning');
    return;
  }
  Storage.downloadFile(JSON.stringify(appState.recipes, null, 2), `sico_mix_recipes_${new Date().toISOString().split('T')[0]}.json`);
  Storage.showNotification(`${t('exported')} ${appState.recipes.length} ${t('recipes')}`);
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
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) {
          Storage.showNotification(t('invalid_file_format'), 'error');
          return;
        }
        showConfirmation(t('import_recipes'), `${t('found_recipes')} ${imported.length}. ${t('import_confirm')}`, () => {
          imported.forEach(r => { r.id = Storage.generateId(); });
          appState.recipes = [...appState.recipes, ...imported];
          Storage.saveToIndexedDB(STORE_KEYS.recipes, appState.recipes);
          renderRecipes();
          Storage.showNotification(`${t('imported')} ${imported.length} ${t('recipes')}`);
        });
      } catch (error) {
        Storage.showNotification(t('file_read_error'), 'error');
      }
    };
    reader.readAsText(file);
  };
  fileInput.click();
}

// ------------------- Каталог фарб -------------------
function renderPaintCatalog() {
  if (!paintCatalogElement) return;
  const searchTerm = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
  let filtered = appState.paints;
  if (searchTerm) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm));
  
  if (filtered.length === 0) {
    paintCatalogElement.innerHTML = `<p style="text-align:center;color:var(--gray);padding:40px;">${t('catalog_empty')}</p>`;
    return;
  }
  paintCatalogElement.innerHTML = filtered.map(paint => `
    <div class="recipe-card glass-card">
      <div class="recipe-image" style="background:${paint.color};"></div>
      <div class="recipe-content">
        <div class="recipe-header">
          <div><h3 class="recipe-title">${Storage.escapeHTML(paint.name)}</h3><span class="recipe-category">${Storage.escapeHTML(paint.category)}</span></div>
        </div>
        <div style="margin-bottom:15px;">
          <div style="display:flex;gap:15px;margin-bottom:10px;">
            <div><span style="font-size:12px;color:var(--gray);">${t('manufacturer')}</span><br><strong>${Storage.escapeHTML(paint.manufacturer || 'SICO')}</strong></div>
            <div><span style="font-size:12px;color:var(--gray);">${t('article')}</span><br><strong>${Storage.escapeHTML(paint.article || '—')}</strong></div>
          </div>
          <div style="font-size:14px;color:var(--gray);">${Storage.escapeHTML(paint.description || t('no_description'))}</div>
        </div>
        <div class="recipe-actions">
          <button class="recipe-btn" style="background:var(--primary);color:white;" onclick="window.editPaint('${paint.id}')"><i class="fas fa-edit"></i> ${t('edit')}</button>
          <button class="recipe-btn" style="background:var(--danger);color:white;" onclick="window.deletePaint('${paint.id}')"><i class="fas fa-trash"></i> ${t('delete')}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addNewPaint() {
  document.getElementById('paintName').value = '';
  document.getElementById('paintCategory').value = '';
  document.getElementById('paintDescription').value = '';
  document.getElementById('paintManufacturer').value = 'SICO';
  document.getElementById('paintArticle').value = '';
  addPaintDialog.showModal();
}

function saveNewPaint() {
  const name = document.getElementById('paintName').value.trim();
  const category = document.getElementById('paintCategory').value;
  const description = document.getElementById('paintDescription').value.trim();
  const manufacturer = document.getElementById('paintManufacturer').value.trim() || 'SICO';
  const article = document.getElementById('paintArticle').value.trim();
  if (!name || !category) {
    Storage.showNotification('Заповніть обов\'язкові поля', 'error');
    return;
  }
  const color = generateColorFromCategory(category, name);
  const newPaint = {
    id: Storage.generateId(),
    name, category, color, description,
    manufacturer, article: article || ''
  };
  appState.paints = [...appState.paints, newPaint];
  Storage.saveToIndexedDB(STORE_KEYS.paints, appState.paints);
  addPaintDialog.close();
  renderPaintCatalog();
  updatePaintCount();
  Storage.showNotification(`${t('paint_added')} "${name}"`);
}

function deletePaint(id) {
  showConfirmation(t('delete_paint'), t('delete_paint_confirmation'), () => {
    appState.paints = appState.paints.filter(p => p.id !== id);
    Storage.saveToIndexedDB(STORE_KEYS.paints, appState.paints);
    renderPaintCatalog();
    updatePaintCount();
    Storage.showNotification(t('paint_deleted'));
  });
}

function updatePaintCount() {
  const count = appState.paints.length;
  if (totalPaintsElement) totalPaintsElement.textContent = count;
  if (headerPaintCount) headerPaintCount.textContent = count;
}

// ------------------- Налаштування -------------------
function saveSettings() {
  appState.settings = {
    language: languageSelect?.value || 'uk',
    units: unitsSelect?.value || 'grams',
    autoSave: autoSaveCheckbox?.checked || false,
    backup: backupCheckbox?.checked || false,
    theme: appState.settings.theme,
    notifications: appState.settings.notifications,
    defaultCategory: appState.settings.defaultCategory,
    defaultUnit: appState.settings.defaultUnit,
    calculationsPrecision: appState.settings.calculationsPrecision
  };
  Storage.saveToIndexedDB(STORE_KEYS.settings, { key: 'settings', ...appState.settings });
  Storage.showNotification(t('save_settings'), 'success');
  if (languageSelect && appState.settings.language !== languageSelect.value) {
    setLanguage(languageSelect.value);
    location.reload();
  }
}

function resetSettings() {
  showConfirmation(t('reset_defaults'), 'Скинути всі налаштування до стандартних?', async () => {
    appState.settings = {
      language: 'uk',
      units: 'grams',
      autoSave: true,
      backup: false,
      theme: 'system',
      notifications: true,
      defaultCategory: 'Текстиль',
      defaultUnit: 'г',
      calculationsPrecision: 2
    };
    await Storage.saveToIndexedDB(STORE_KEYS.settings, { key: 'settings', ...appState.settings });
    if (languageSelect) languageSelect.value = 'uk';
    if (unitsSelect) unitsSelect.value = 'grams';
    if (autoSaveCheckbox) autoSaveCheckbox.checked = true;
    if (backupCheckbox) backupCheckbox.checked = false;
    Storage.showNotification(t('reset_defaults'), 'success');
  });
}

function clearAllData() {
  showConfirmation(t('clear_all_data'), 'УВАГА! Всі рецепти та фарби будуть видалені. Продовжити?', async () => {
    appState.recipes = [];
    appState.paints = initialData.paints;
    appState.ui.selectedIngredients = [];
    appState.ui.selectedRecipes = [];
    await Storage.saveToIndexedDB(STORE_KEYS.recipes, appState.recipes);
    await Storage.saveToIndexedDB(STORE_KEYS.paints, appState.paints);
    renderRecipes();
    renderPaintCatalog();
    updatePaintCount();
    Storage.showNotification('Дані очищено', 'success');
  });
}

// ------------------- Сповіщення та підтвердження -------------------
function showNotification(message, type = 'success', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; background: var(--primary); color: white;
    padding: 15px 25px; border-radius: var(--radius); box-shadow: var(--shadow-hover);
    z-index: 1001; font-weight: 500; display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.3s ease;
  `;
  notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

function showConfirmation(title, message, onConfirm) {
  if (!confirmationDialog) return;
  confirmationTitle.textContent = title;
  confirmationMessage.innerHTML = `<span>${message}</span>`;
  confirmationDialog.showModal();
  const handleConfirm = () => {
    onConfirm();
    confirmationDialog.close();
    confirmActionBtn.removeEventListener('click', handleConfirm);
    cancelActionBtn.removeEventListener('click', handleCancel);
  };
  const handleCancel = () => {
    confirmationDialog.close();
    confirmActionBtn.removeEventListener('click', handleConfirm);
    cancelActionBtn.removeEventListener('click', handleCancel);
  };
  confirmActionBtn.addEventListener('click', handleConfirm);
  cancelActionBtn.addEventListener('click', handleCancel);
}

// ------------------- Події -------------------
function setupEventListeners() {
  setupNavigation();
  
  if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
  if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
  if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
  if (calculatePercentagesBtn) calculatePercentagesBtn.addEventListener('click', calculatePercentages);
  
  if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
  if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
  if (printRecipesBtn) printRecipesBtn.addEventListener('click', () => window.print());
  if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);
  
  if (addNewPaintBtn) addNewPaintBtn.addEventListener('click', addNewPaint);
  if (savePaintBtn) savePaintBtn.addEventListener('click', saveNewPaint);
  if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', () => addPaintDialog.close());
  
  if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
  if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
  if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);
  
  const recipeSearch = document.getElementById('recipeSearch');
  if (recipeSearch) recipeSearch.addEventListener('input', Storage.debounce(renderRecipes, 300));
  const recipeCategoryFilter = document.getElementById('recipeCategoryFilter');
  if (recipeCategoryFilter) recipeCategoryFilter.addEventListener('change', renderRecipes);
  const catalogSearch = document.getElementById('catalogSearch');
  if (catalogSearch) catalogSearch.addEventListener('input', Storage.debounce(renderPaintCatalog, 300));
  
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (saveRecipeBtn && appState.ui.currentPage === 'new-recipe') saveRecipeBtn.click();
    }
    if (e.key === 'Escape') {
      if (sidebar?.classList.contains('active') && window.innerWidth <= 992) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(console.error);
  }
}

function renderCurrentPage() {
  const page = appState.ui.currentPage;
  if (page === 'recipes') renderRecipes();
  else if (page === 'catalog') renderPaintCatalog();
}

// ------------------- Експорт глобальних функцій для inline-обробників -------------------
window.editRecipe = editRecipe;
window.deleteRecipe = deleteRecipe;
window.exportRecipe = exportRecipe;
window.deletePaint = deletePaint;
window.editPaint = (id) => Storage.showNotification(t('feature_in_development'), 'info');

// ------------------- Експорт публічного API -------------------
export default {
  initApp,
  editRecipe,
  deleteRecipe,
  exportRecipe,
  deletePaint,
  editPaint: window.editPaint,
  showNotification,
  showConfirmation
};
