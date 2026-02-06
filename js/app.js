import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId, calculateWeights } from "./utils.js";

// Глобальні змінні
window.SICO = {
  version: '2.0.0',
  colors: COLORS,
  series: SERIES
};

// Елементи DOM
const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

const elements = {
  themeToggle: qs('themeToggle'),
  seriesBadge: qs('seriesBadge'),
  recipeStats: qs('recipeStats'),
  totalColors: qs('totalColors'),
  totalPercent: qs('totalPercent'),
  totalWeightGrams: qs('totalWeightGrams'),
  colorList: qs('colorList'),
  addColorList: qs('addColorList'),
  recipeItems: qs('recipeItems'),
  recipeList: qs('recipeList'),
  recipeSearchList: qs('recipeSearchList'),
  customWeight: qs('customWeight'),
  modeToggle: qs('modeToggle'),
  photoPreview: qs('photoPreview'),
  modalOverlay: qs('modalOverlay'),
  modalTitle: qs('modalTitle'),
  modalBody: qs('modalBody'),
  modalConfirm: qs('modalConfirm'),
  toastContainer: qs('toastContainer'),
  loadingOverlay: qs('loadingOverlay')
};

// Стан додатку
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { 
  id: generateId(), 
  items: [], 
  status: 'draft', 
  photo: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
let currentSeries = null;
let mode = localStorage.getItem("sico_mode") || "percent";
let theme = localStorage.getItem("sico_theme") || "auto";
let recipeFilter = 'all';

// Ініціалізація
window.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  console.log('SICO MIX v2.0.0 ініціалізовано');
  
  applyTheme();
  setLang(currentLang);
  initSeriesFilter();
  loadDraft();
  renderColors();
  renderAddColors();
  renderCurrentRecipe();
  renderRecipes();
  updateStats();
  setupEventListeners();
  
  // Авто-таб з хеша
  const hash = window.location.hash.substring(1) || 'colors';
  if (['colors', 'new', 'recipes', 'settings'].includes(hash)) {
    showTab(hash);
  }
}

function setupEventListeners() {
  // Обробка власного введення ваги
  qs('totalWeight').addEventListener('change', function() {
    if (this.value === 'custom') {
      qs('customWeight').style.display = 'block';
      qs('customWeight').focus();
    } else {
      qs('customWeight').style.display = 'none';
      renderCurrentRecipe();
    }
  });
  
  qs('customWeight').addEventListener('input', debounce(function() {
    if (this.value) {
      renderCurrentRecipe();
    }
  }, 300));
  
  // Завантаження фото
  qs('recipePhoto').addEventListener('change', handlePhotoUpload);
  
  // Глобальні комбінації клавіш
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Збереження при покиданні сторінки
  window.addEventListener('beforeunload', autoSaveDraft);
}

// Теми
function applyTheme() {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
  
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.toggle('dark', isDark);
  
  const icon = qs('themeToggle').querySelector('.theme-icon');
  icon.textContent = isDark ? '☀️' : '🌙';
  
  document.querySelector('meta[name="theme-color"]').setAttribute('content', 
    isDark ? '#0f172a' : '#f8fafc'
  );
}

window.toggleTheme = () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem("sico_theme", theme);
  applyTheme();
  showToast(t('themeChanged'), 'success');
};

window.setTheme = (newTheme) => {
  theme = newTheme;
  localStorage.setItem("sico_theme", theme);
  applyTheme();
  showToast(t('themeChanged'), 'success');
};

// Навігація
window.showTab = function (id) {
  qsa(".tab").forEach(t => {
    t.classList.remove("active");
    t.setAttribute('hidden', '');
  });
  
  qsa(".nav-btn").forEach(btn => btn.classList.remove("active"));
  
  const tab = qs(id);
  tab.classList.add("active");
  tab.removeAttribute('hidden');
  
  const navBtn = document.querySelector(`.nav-btn[onclick*="${id}"]`);
  if (navBtn) navBtn.classList.add("active");
  
  if (id === "recipes") renderRecipes();
  if (id === "colors") renderColors();
  if (id === "new") updateStats();
  
  window.history.pushState(null, null, `#${id}`);
};

// Фільтр серій
function initSeriesFilter() {
  const select = qs("seriesFilter");
  select.innerHTML = `
    <option value="ALL">${t("allSeries")}</option>
    ${SERIES.map(s => `
      <option value="${s.id}">${s.id} - ${s.name[currentLang]}</option>
    `).join('')}
  `;
  select.onchange = () => renderColors();
}

// Рендер фарб
function renderColors() {
  const series = qs("seriesFilter").value;
  const search = qs("colorSearch").value.toLowerCase();
  
  let filteredColors = COLORS;
  
  if (series !== "ALL") filteredColors = filteredColors.filter(c => c.series === series);
  if (search) filteredColors = filteredColors.filter(c => 
    c.code.toLowerCase().includes(search) || 
    c.name[currentLang].toLowerCase().includes(search)
  );
  
  qs('colorCount').textContent = `${filteredColors.length} ${t('colors')}`;
  
  elements.colorList.innerHTML = filteredColors.map(color => `
    <div class="color-card" role="listitem" onclick="addColor('${color.code}')">
      <div class="color-swatch" style="background:${color.hex}"></div>
      <div class="color-info">
        <div class="color-code">${color.code}</div>
        <div class="color-name">${color.name[currentLang]}</div>
        <div class="color-meta">
          <span class="color-series">${color.series}</span>
          <span class="color-hex">${color.hex}</span>
        </div>
      </div>
      <div class="color-actions">
        <button class="color-btn" onclick="event.stopPropagation(); addColor('${color.code}')" aria-label="Додати ${color.code}">
          +
        </button>
      </div>
    </div>
  `).join("");
}

function renderAddColors() {
  const search = qs("recipeSearch").value.toLowerCase();
  let filteredColors = COLORS;
  
  if (currentSeries) filteredColors = filteredColors.filter(c => c.series === currentSeries);
  if (search) filteredColors = filteredColors.filter(c => 
    c.code.toLowerCase().includes(search) || 
    c.name[currentLang].toLowerCase().includes(search)
  );
  
  elements.addColorList.innerHTML = filteredColors.map(color => `
    <div class="color-card compact" role="listitem" onclick="addColor('${color.code}')">
      <div class="color-swatch" style="background:${color.hex}"></div>
      <div class="color-info">
        <div class="color-code">${color.code}</div>
        <div class="color-name">${color.name[currentLang]}</div>
      </div>
    </div>
  `).join("");
}

// Операції з рецептом
window.addColor = function (code) {
  const color = getColorByCode(code);
  
  if (!currentSeries) {
    currentSeries = color.series;
    elements.seriesBadge.textContent = currentSeries;
    elements.seriesBadge.style.display = "inline-flex";
    showToast(`${t('seriesSet')}: ${currentSeries}`, 'info');
  }
  
  if (color.series !== currentSeries) {
    showToast(t("errorSeries"), 'error');
    return;
  }
  
  if (currentRecipe.items.find(i => i.code === code)) {
    showToast(t("colorAlreadyAdded"), 'warning');
    return;
  }
  
  const initialPercent = currentRecipe.items.length === 0 ? 100 : 0;
  
  currentRecipe.items.push({ 
    code, 
    percent: initialPercent,
    name: color.name[currentLang],
    hex: color.hex
  });
  
  if (currentRecipe.items.length > 1) redistributePercentages();
  
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
};

function redistributePercentages() {
  const totalItems = currentRecipe.items.length;
  const equalPercent = 100 / totalItems;
  
  currentRecipe.items.forEach(item => {
    item.percent = parseFloat(equalPercent.toFixed(2));
  });
}

window.updateItem = (index, value) => {
  const numValue = parseFloat(value) || 0;
  const total = getTotalWeight();
  
  if (mode === "percent") {
    currentRecipe.items[index].percent = clamp(numValue, 0, 100);
  } else {
    const percent = (numValue / total) * 100;
    currentRecipe.items[index].percent = clamp(percent, 0, 100);
  }
  
  autoSaveDraft();
  renderCurrentRecipe();
  updateStats();
};

window.removeItem = index => {
  currentRecipe.items.splice(index, 1);
  
  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    elements.seriesBadge.style.display = "none";
  }
  
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
};

// Рендер поточного рецепта
window.renderCurrentRecipe = function () {
  const totalWeight = getTotalWeight();
  
  if (currentRecipe.items.length === 0) {
    elements.recipeItems.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎨</div>
        <p>${t("noColorsAdded")}</p>
        <button class="btn-secondary" onclick="showTab('colors')">
          ${t("browseColors")}
        </button>
      </div>
    `;
    return;
  }
  
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  
  elements.recipeItems.innerHTML = currentRecipe.items.map((item, index) => {
    const color = getColorByCode(item.code);
    const value = mode === "percent" 
      ? item.percent 
      : (item.percent * totalWeight / 100);
    const formattedValue = formatNumber(value, mode === "percent" ? 2 : 1);
    
    return `
      <div class="recipe-item" role="listitem">
        <div class="recipe-color">
          <div class="color-chip" style="background: ${color.hex}" aria-hidden="true"></div>
          <div>
            <div class="color-code">${item.code}</div>
            <div class="color-name">${color.name[currentLang]}</div>
          </div>
        </div>
        <div class="recipe-input-group">
          <input 
            type="number" 
            class="recipe-input" 
            value="${formattedValue}"
            step="${mode === 'percent' ? '0.1' : '0.1'}"
            min="0"
            onchange="updateItem(${index}, this.value)"
            aria-label="Вага для ${item.code}"
          >
          <span class="recipe-unit">${mode === "percent" ? "%" : "г"}</span>
        </div>
        <button class="recipe-remove" onclick="removeItem(${index})" aria-label="Видалити ${item.code}">
          ✕
        </button>
      </div>
    `;
  }).join("");
  
  updateRecipeSummary(totalPercent, totalWeight);
};

function updateRecipeSummary(totalPercent, totalWeight) {
  const percentClass = totalPercent < 95 || totalPercent > 105 ? 'warning' : '';
  
  elements.totalColors.textContent = currentRecipe.items.length;
  elements.totalPercent.innerHTML = `
    <span class="${percentClass}">${formatNumber(totalPercent, 2)}%</span>
  `;
  elements.totalWeightGrams.textContent = `${formatNumber(totalWeight, 1)} г`;
  
  if (totalPercent < 95 || totalPercent > 105) {
    showToast(t("sumWarning"), 'warning', 5000);
  }
}

function getTotalWeight() {
  const weightSelect = qs('totalWeight');
  if (weightSelect.value === 'custom') {
    return parseFloat(qs('customWeight').value) || 1000;
  }
  return parseFloat(weightSelect.value) || 1000;
}

// Перемикач режиму
window.toggleMode = checkbox => {
  mode = checkbox.checked ? "gram" : "percent";
  localStorage.setItem("sico_mode", mode);
  renderCurrentRecipe();
  showToast(`${t('modeChanged')}: ${mode === 'percent' ? '%' : 'г'}`, 'info');
};

// Валідація рецепта
function validateRecipe() {
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  const recipeName = qs("recipeName").value.trim();
  
  if (totalPercent < 95 || totalPercent > 105) {
    showModal(
      t("warning"),
      `${t("sumWarning")} (${formatNumber(totalPercent, 2)}%)`,
      () => {}
    );
    return false;
  }
  
  if (!recipeName) {
    showToast(t("errorEmptyName"), 'error');
    qs("recipeName").focus();
    return false;
  }
  
  if (!currentRecipe.items.length) {
    showToast(t("errorEmptyRecipe"), 'error');
    return false;
  }
  
  return true;
}

// Збереження рецепта
window.saveRecipe = function () {
  if (!validateRecipe()) return;
  
  showLoading();
  
  try {
    currentRecipe.name = qs("recipeName").value.trim();
    currentRecipe.note = qs("recipeNote").value;
    currentRecipe.series = currentSeries;
    currentRecipe.status = qs("recipeStatus").value;
    currentRecipe.updatedAt = new Date().toISOString();
    currentRecipe.totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
    currentRecipe.totalWeight = getTotalWeight();
    
    currentRecipe.items = calculateWeights(currentRecipe.items, currentRecipe.totalWeight);
    
    const existingIndex = recipes.findIndex(r => r.id === currentRecipe.id);
    
    if (existingIndex > -1) {
      recipes[existingIndex] = { ...currentRecipe };
    } else {
      recipes.push({ ...currentRecipe });
    }
    
    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    showToast(t("savedSuccess"), 'success');
    
    setTimeout(() => {
      clearDraft();
      showTab("recipes");
      hideLoading();
    }, 1000);
    
  } catch (error) {
    hideLoading();
    showToast(t("saveError"), 'error');
    console.error('Помилка збереження:', error);
  }
};

// Чернетки
function autoSaveDraft() {
  currentRecipe.name = qs("recipeName").value.trim();
  currentRecipe.note = qs("recipeNote").value;
  currentRecipe.status = qs("recipeStatus").value;
  currentRecipe.updatedAt = new Date().toISOString();
  localStorage.setItem("sico_draft", JSON.stringify(currentRecipe));
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem("sico_draft"));
  
  if (draft) {
    currentRecipe = draft;
    currentSeries = draft.series || null;
    
    elements.seriesBadge.textContent = currentSeries || '';
    elements.seriesBadge.style.display = currentSeries ? "inline-flex" : "none";
    qs("recipeName").value = draft.name || '';
    qs("recipeNote").value = draft.note || '';
    qs("recipeStatus").value = draft.status || 'draft';
    
    if (draft.photo) {
      elements.photoPreview.querySelector('img').src = draft.photo;
      elements.photoPreview.querySelector('img').style.display = 'block';
      elements.photoPreview.style.display = 'block';
    }
    
    renderCurrentRecipe();
    renderAddColors();
    updateStats();
  }
}

window.clearDraft = function () {
  currentRecipe = { 
    id: generateId(), 
    items: [], 
    status: 'draft', 
    photo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  currentSeries = null;
  
  elements.seriesBadge.style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeStatus").value = "draft";
  elements.photoPreview.querySelector('img').src = "";
  elements.photoPreview.querySelector('img').style.display = 'none';
  elements.photoPreview.style.display = 'none';
  
  localStorage.removeItem("sico_draft");
  
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
  
  showToast(t("draftCleared"), 'success');
};

// Список рецептів
window.renderRecipes = function () {
  if (recipes.length === 0) {
    elements.recipeList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>${t("noRecipes")}</h3>
        <p>${t("createFirstRecipe")}</p>
        <button class="btn-primary" onclick="showTab('new')">
          ${t("createRecipe")}
        </button>
      </div>
    `;
    return;
  }
  
  let filteredRecipes = recipes;
  
  if (recipeFilter !== 'all') {
    filteredRecipes = filteredRecipes.filter(r => r.status === recipeFilter);
  }
  
  const searchTerm = qs('recipeSearchList').value.toLowerCase();
  if (searchTerm) {
    filteredRecipes = filteredRecipes.filter(r => 
      r.name.toLowerCase().includes(searchTerm) ||
      r.note.toLowerCase().includes(searchTerm) ||
      r.series.toLowerCase().includes(searchTerm)
    );
  }
  
  elements.recipeList.innerHTML = filteredRecipes.map(recipe => {
    const date = new Date(recipe.updatedAt).toLocaleDateString(currentLang);
    const colorDots = recipe.items.slice(0, 12).map(item => 
      `<div class="color-dot" style="background: ${getColorByCode(item.code)?.hex || '#ccc'}" aria-hidden="true"></div>`
    ).join('');
    
    return `
      <div class="recipe-card" role="listitem" onclick="editRecipe('${recipe.id}')">
        <div class="recipe-card-header">
          <div>
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-meta">
              <span>${recipe.series}</span>
              <span aria-hidden="true">•</span>
              <span>${recipe.items.length} ${t('colors')}</span>
              <span aria-hidden="true">•</span>
              <span>${date}</span>
            </div>
          </div>
          <span class="recipe-status ${recipe.status}">${t(recipe.status)}</span>
        </div>
        
        ${recipe.note ? `<div class="recipe-note">${recipe.note}</div>` : ''}
        
        ${recipe.items.length > 0 ? `
          <div class="recipe-colors" aria-label="Кольори рецепта">
            ${colorDots}
            ${recipe.items.length > 12 ? `<span class="more-colors">+${recipe.items.length - 12}</span>` : ''}
          </div>
        ` : ''}
        
        <div class="recipe-actions">
          <button class="btn-secondary" onclick="event.stopPropagation(); exportRecipeJson('${recipe.id}')" aria-label="Експорт JSON">
            JSON
          </button>
          <button class="btn-secondary" onclick="event.stopPropagation(); exportRecipePdf('${recipe.id}')" aria-label="Експорт PDF">
            PDF
          </button>
          <button class="btn-danger" onclick="event.stopPropagation(); confirmDelete('${recipe.id}')" aria-label="Видалити рецепт">
            ${t('delete')}
          </button>
        </div>
      </div>
    `;
  }).join("");
};

window.filterRecipes = debounce(function () {
  renderRecipes();
}, 300);

window.setRecipeFilter = function (filter) {
  recipeFilter = filter;
  
  qsa('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  renderRecipes();
};

// Операції з рецептами
window.editRecipe = function (id) {
  const recipe = recipes.find(r => r.id === id);
  
  if (recipe) {
    currentRecipe = JSON.parse(JSON.stringify(recipe));
    loadDraft();
    showTab('new');
    showToast(t('recipeLoaded'), 'success');
  }
};

window.confirmDelete = function (id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  showModal(
    t('confirmDelete'),
    `${t('confirmDeleteMsg')} "${recipe.name}"?`,
    () => deleteRecipe(id)
  );
};

function deleteRecipe(id) {
  recipes = recipes.filter(r => r.id !== id);
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  renderRecipes();
  showToast(t('recipeDeleted'), 'success');
}

// Імпорт/Експорт
window.importRecipes = function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = event => {
      try {
        const imported = JSON.parse(event.target.result);
        const newRecipes = Array.isArray(imported) ? imported : [imported];
        
        const validRecipes = newRecipes.filter(r => 
          r && r.id && r.name && Array.isArray(r.items)
        );
        
        const existingIds = new Set(recipes.map(r => r.id));
        const uniqueNewRecipes = validRecipes.filter(r => !existingIds.has(r.id));
        
        recipes = [...recipes, ...uniqueNewRecipes];
        localStorage.setItem("sico_recipes", JSON.stringify(recipes));
        
        renderRecipes();
        showToast(`${t('importSuccess')}: ${uniqueNewRecipes.length}`, 'success');
        
      } catch (error) {
        showToast(t('importError'), 'error');
        console.error('Помилка імпорту:', error);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
};

window.exportRecipeJson = function (id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  const dataStr = JSON.stringify(recipe, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = `sico-recipe-${recipe.name.replace(/\s+/g, '-')}.json`;
  link.click();
  
  showToast(t('exportSuccess'), 'success');
};

window.exportRecipePdf = function (id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text('SICO MIX', 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Рецепт змішування фарб', 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(recipe.name, 20, 45);
    
    doc.setFontSize(10);
    doc.text(`Серія: ${recipe.series}`, 20, 55);
    doc.text(`Статус: ${t(recipe.status)}`, 20, 60);
    doc.text(`Створено: ${new Date(recipe.createdAt).toLocaleDateString()}`, 20, 65);
    
    if (recipe.note) {
      doc.text(`Нотатка: ${recipe.note}`, 20, 75);
    }
    
    const tableData = recipe.items.map((item, index) => [
      index + 1,
      item.code,
      item.name,
      `${formatNumber(item.percent, 2)}%`,
      `${formatNumber(item.weight || 0, 1)}г`
    ]);
    
    doc.autoTable({
      head: [['№', 'Код', 'Назва', 'Відсоток', 'Вага']],
      body: tableData,
      startY: 85,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20 }
    });
    
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Сторінка ${i} з ${pageCount} • SICO MIX`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`sico-recipe-${recipe.name.replace(/\s+/g, '-')}.pdf`);
    showToast(t('pdfExported'), 'success');
    
  } catch (error) {
    showToast(t('exportError'), 'error');
    console.error('Помилка PDF експорту:', error);
  }
};

window.exportAllData = function () {
  const data = {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    recipes: recipes,
    settings: {
      mode: mode,
      theme: theme,
      language: currentLang
    }
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = `sico-mix-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showToast(t('backupCreated'), 'success');
};

window.backupData = exportAllData;

window.confirmReset = function () {
  showModal(
    t('confirmReset'),
    t('confirmResetMsg'),
    resetAllData
  );
};

function resetAllData() {
  recipes = [];
  localStorage.removeItem("sico_recipes");
  localStorage.removeItem("sico_draft");
  localStorage.removeItem("sico_mode");
  localStorage.removeItem("sico_theme");
  localStorage.removeItem("sico_lang");
  
  clearDraft();
  mode = "percent";
  theme = "auto";
  currentLang = "ua";
  
  setLang(currentLang);
  applyTheme();
  renderRecipes();
  
  showToast(t('dataReset'), 'success');
};

// Фото
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  if (file.size > 5 * 1024 * 1024) {
    showToast(t('fileTooLarge'), 'error');
    return;
  }
  
  if (!file.type.startsWith('image/')) {
    showToast(t('invalidImage'), 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = event => {
    currentRecipe.photo = event.target.result;
    
    const img = elements.photoPreview.querySelector('img');
    img.src = currentRecipe.photo;
    img.style.display = 'block';
    elements.photoPreview.style.display = 'block';
    
    autoSaveDraft();
    showToast(t('photoAdded'), 'success');
  };
  
  reader.readAsDataURL(file);
}

function removePhoto() {
  currentRecipe.photo = null;
  
  const img = elements.photoPreview.querySelector('img');
  img.src = '';
  img.style.display = 'none';
  elements.photoPreview.style.display = 'none';
  
  autoSaveDraft();
  showToast(t('photoRemoved'), 'success');
}

// Статистика
function updateStats() {
  const totalColors = currentRecipe.items.length;
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  
  elements.recipeStats.textContent = `${totalColors} ${t('colors')}`;
  elements.totalColors.textContent = totalColors;
  elements.totalPercent.textContent = `${formatNumber(totalPercent, 2)}%`;
}

// Модальні вікна
window.showModal = function (title, message, onConfirm) {
  elements.modalTitle.textContent = title;
  elements.modalBody.textContent = message;
  
  elements.modalConfirm.onclick = () => {
    if (typeof onConfirm === 'function') onConfirm();
    closeModal();
  };
  
  elements.modalOverlay.classList.remove('hidden');
  elements.modalOverlay.setAttribute('aria-hidden', 'false');
};

window.closeModal = function () {
  elements.modalOverlay.classList.add('hidden');
  elements.modalOverlay.setAttribute('aria-hidden', 'true');
};

// Сповіщення
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${getToastIcon(type)}</span>
    <span class="toast-message">${message}</span>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
  
  toast.onclick = () => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  };
}

function getToastIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  return icons[type] || icons.info;
}

// Завантаження
function showLoading(message = t('loading')) {
  elements.loadingOverlay.querySelector('.loading-text').textContent = message;
  elements.loadingOverlay.classList.remove('hidden');
  elements.loadingOverlay.setAttribute('aria-busy', 'true');
}

function hideLoading() {
  elements.loadingOverlay.classList.add('hidden');
  elements.loadingOverlay.setAttribute('aria-busy', 'false');
}

// Комбінації клавіш
function handleKeyboardShortcuts(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  switch (e.key) {
    case '1':
      if (e.ctrlKey || e.metaKey) showTab('colors');
      break;
    case '2':
      if (e.ctrlKey || e.metaKey) showTab('new');
      break;
    case '3':
      if (e.ctrlKey || e.metaKey) showTab('recipes');
      break;
    case '4':
      if (e.ctrlKey || e.metaKey) showTab('settings');
      break;
    case 's':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        saveRecipe();
      }
      break;
    case 'Escape':
      closeModal();
      break;
    case 't':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        toggleTheme();
      }
      break;
  }
}

// Debounce для оптимізації
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Глобальний експорт для налагодження
window.SICO_DEBUG = {
  getState: () => ({
    recipes,
    currentRecipe,
    currentSeries,
    mode,
    theme,
    currentLang
  }),
  clearAll: resetAllData,
  exportData: exportAllData
};

console.log('SICO MIX оптимізований завантажений');
