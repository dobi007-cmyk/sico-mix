import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId, calculateWeights, debounce } from "./utils.js";

// Global variables
window.SICO = {
  version: '2.0.0',
  colors: COLORS,
  series: SERIES
};

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

// App state
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

// DOM Elements
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

// Debounced functions
const debouncedRenderColors = debounce(renderColors, 300);
const debouncedRenderAddColors = debounce(renderAddColors, 300);
const debouncedFilterRecipes = debounce(filterRecipes, 300);

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupEventListeners();
});

function initApp() {
  console.log('SICO MIX v2.0.0 initialized');
  
  // Set theme
  applyTheme();
  
  // Set language
  setLang(currentLang);
  
  // Initialize series filter
  initSeriesFilter();
  
  // Set mode toggle state
  if (elements.modeToggle) {
    elements.modeToggle.checked = mode === "gram";
  }
  
  // Load draft recipe
  loadDraft();
  
  // Render initial views
  renderColors();
  renderAddColors();
  renderCurrentRecipe();
  renderRecipes();
  
  // Update stats
  updateStats();
  
  // Check URL hash for tab
  const hash = window.location.hash.substring(1);
  if (hash && ['colors', 'new', 'recipes', 'settings'].includes(hash)) {
    showTab(hash);
  }
}

function setupEventListeners() {
  // Search inputs
  qs('colorSearch').addEventListener('input', () => debouncedRenderColors());
  qs('recipeSearch').addEventListener('input', () => debouncedRenderAddColors());
  qs('recipeSearchList').addEventListener('input', () => debouncedFilterRecipes());
  
  // Custom weight handling
  qs('totalWeight').addEventListener('change', handleWeightChange);
  qs('customWeight').addEventListener('input', () => {
    if (qs('customWeight').value) {
      renderCurrentRecipe();
    }
  });
  
  // Photo upload
  qs('recipePhoto').addEventListener('change', handlePhotoUpload);
  
  // Global keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Save draft on input
  qs('recipeName').addEventListener('input', autoSaveDraft);
  qs('recipeNote').addEventListener('input', autoSaveDraft);
  qs('recipeStatus').addEventListener('change', autoSaveDraft);
}

// Theme Management
function applyTheme() {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
  
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.toggle('dark', isDark);
  
  // Update theme icon
  const icon = qs('themeToggle').querySelector('.theme-icon');
  icon.textContent = isDark ? '☀️' : '🌙';
  
  // Update meta theme-color
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

// Tab Navigation
window.showTab = function (id) {
  // Hide all tabs with animation
  qsa(".tab").forEach(t => {
    if (t.classList.contains("active")) {
      t.style.animation = "fadeOut 0.2s ease";
      setTimeout(() => {
        t.classList.remove("active");
        t.style.animation = "";
      }, 200);
    }
  });
  
  // Show selected tab with animation
  setTimeout(() => {
    const tab = qs(id);
    if (tab) {
      tab.classList.add("active");
      tab.style.animation = "fadeIn 0.3s ease";
      
      // Update navigation
      qsa(".nav-btn").forEach(btn => btn.classList.remove("active"));
      const navBtn = document.querySelector(`.nav-btn[onclick*="${id}"]`);
      if (navBtn) {
        navBtn.classList.add("active");
      }
      
      // Focus on first input for "new" tab
      if (id === "new") {
        setTimeout(() => qs("recipeName")?.focus(), 100);
      }
      
      // Update URL hash
      window.history.pushState(null, null, `#${id}`);
    }
  }, 200);
};

// Series Filter
function initSeriesFilter() {
  const select = qs("seriesFilter");
  if (!select) return;
  
  select.innerHTML = `
    <option value="ALL">${t("allSeries")}</option>
    ${SERIES.map(s => `
      <option value="${s.id}">${s.id} - ${s.name[currentLang]}</option>
    `).join('')}
  `;
  select.onchange = () => renderColors();
}

// Color Rendering
function renderColors() {
  const series = qs("seriesFilter").value;
  const search = qs("colorSearch").value.toLowerCase();
  
  let filteredColors = COLORS;
  
  // Filter by series
  if (series !== "ALL") {
    filteredColors = filteredColors.filter(c => c.series === series);
  }
  
  // Filter by search
  if (search) {
    filteredColors = filteredColors.filter(c => 
      c.code.toLowerCase().includes(search) || 
      c.name[currentLang].toLowerCase().includes(search)
    );
  }
  
  // Update count
  const countElement = qs('colorCount');
  if (countElement) {
    countElement.textContent = `${filteredColors.length} ${t('colors')}`;
  }
  
  // Render colors
  const colorList = elements.colorList;
  if (colorList) {
    colorList.innerHTML = filteredColors.map(color => `
      <div class="color-card" onclick="addColor('${color.code}')">
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
          <button class="color-btn" onclick="event.stopPropagation(); addColor('${color.code}')">
            +
          </button>
        </div>
      </div>
    `).join("");
  }
}

function renderAddColors() {
  const search = qs("recipeSearch").value.toLowerCase();
  let filteredColors = COLORS;
  
  // Filter by current series
  if (currentSeries) {
    filteredColors = filteredColors.filter(c => c.series === currentSeries);
  }
  
  // Filter by search
  if (search) {
    filteredColors = filteredColors.filter(c => 
      c.code.toLowerCase().includes(search) || 
      c.name[currentLang].toLowerCase().includes(search)
    );
  }
  
  const addColorList = elements.addColorList;
  if (addColorList) {
    addColorList.innerHTML = filteredColors.map(color => `
      <div class="color-card compact" onclick="addColor('${color.code}')">
        <div class="color-swatch" style="background:${color.hex}"></div>
        <div class="color-info">
          <div class="color-code">${color.code}</div>
          <div class="color-name">${color.name[currentLang]}</div>
        </div>
      </div>
    `).join("");
  }
}

// Recipe Operations
window.addColor = function (code) {
  const color = getColorByCode(code);
  if (!color) {
    showToast(t('colorNotFound'), 'error');
    return;
  }
  
  // Check if we can add this color
  if (!currentSeries) {
    currentSeries = color.series;
    const badge = elements.seriesBadge;
    if (badge) {
      badge.textContent = currentSeries;
      badge.style.display = "inline-flex";
    }
    showToast(`${t('seriesSet')}: ${currentSeries}`, 'info');
  }
  
  if (color.series !== currentSeries) {
    showToast(t("errorSeries"), 'error');
    return;
  }
  
  // Check for duplicates
  if (currentRecipe.items.find(i => i.code === code)) {
    showToast(t("colorAlreadyAdded"), 'warning');
    return;
  }
  
  // Add color with initial percentage
  const totalItems = currentRecipe.items.length;
  const initialPercent = totalItems === 0 ? 100 : Math.max(0, (100 / (totalItems + 1)));
  
  currentRecipe.items.push({ 
    code, 
    percent: parseFloat(initialPercent.toFixed(2)),
    name: color.name[currentLang],
    hex: color.hex
  });
  
  // Recalculate percentages
  if (currentRecipe.items.length > 1) {
    redistributePercentages();
  }
  
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
  
  showToast(`${color.code} ${t('added')}`, 'success');
};

function redistributePercentages() {
  const totalItems = currentRecipe.items.length;
  const equalPercent = 100 / totalItems;
  
  currentRecipe.items.forEach(item => {
    item.percent = parseFloat(equalPercent.toFixed(2));
  });
}

window.updateItem = (index, value) => {
  if (index < 0 || index >= currentRecipe.items.length) return;
  
  const numValue = parseFloat(value) || 0;
  const total = getTotalWeight();
  
  if (mode === "percent") {
    currentRecipe.items[index].percent = clamp(numValue, 0, 100);
  } else {
    const percent = total > 0 ? (numValue / total) * 100 : 0;
    currentRecipe.items[index].percent = clamp(percent, 0, 100);
  }
  
  autoSaveDraft();
  renderCurrentRecipe();
  updateStats();
};

window.removeItem = index => {
  if (index < 0 || index >= currentRecipe.items.length) return;
  
  currentRecipe.items.splice(index, 1);
  
  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    const badge = elements.seriesBadge;
    if (badge) {
      badge.style.display = "none";
    }
  }
  
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
};

// Recipe Rendering
window.renderCurrentRecipe = function () {
  const recipeItems = elements.recipeItems;
  if (!recipeItems) return;
  
  if (currentRecipe.items.length === 0) {
    recipeItems.innerHTML = `
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
  
  const totalWeight = getTotalWeight();
  
  recipeItems.innerHTML = currentRecipe.items.map((item, index) => {
    const color = getColorByCode(item.code);
    const value = mode === "percent" 
      ? item.percent 
      : (item.percent * totalWeight / 100);
    const formattedValue = formatNumber(value, mode === "percent" ? 2 : 1);
    
    return `
      <div class="recipe-item">
        <div class="recipe-color">
          <div class="color-chip" style="background: ${color?.hex || '#ccc'}"></div>
          <div>
            <div class="color-code">${item.code}</div>
            <div class="color-name">${color?.name[currentLang] || item.name}</div>
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
            oninput="updateItem(${index}, this.value)"
          >
          <span class="recipe-unit">${mode === "percent" ? "%" : "g"}</span>
        </div>
        <button class="recipe-remove" onclick="removeItem(${index})" title="${t('remove')}">
          ✕
        </button>
      </div>
    `;
  }).join("");
  
  // Update summary
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  updateRecipeSummary(totalPercent, totalWeight);
};

function updateRecipeSummary(totalPercent, totalWeight) {
  const percentClass = totalPercent < 95 || totalPercent > 105 ? 'warning' : '';
  
  if (elements.totalColors) {
    elements.totalColors.textContent = currentRecipe.items.length;
  }
  
  if (elements.totalPercent) {
    elements.totalPercent.innerHTML = `
      <span class="${percentClass}">${formatNumber(totalPercent, 2)}%</span>
    `;
  }
  
  if (elements.totalWeightGrams) {
    elements.totalWeightGrams.textContent = `${formatNumber(totalWeight, 1)} g`;
  }
  
  // Update warning if needed
  if (totalPercent < 95 || totalPercent > 105) {
    showToast(t("sumWarning"), 'warning', 5000);
  }
}

function getTotalWeight() {
  const weightSelect = qs('totalWeight');
  if (!weightSelect) return 1000;
  
  if (weightSelect.value === 'custom') {
    const customWeight = parseFloat(qs('customWeight').value) || 0;
    return customWeight > 0 ? customWeight : 1000;
  }
  return parseFloat(weightSelect.value) || 1000;
}

// Weight change handler
window.handleWeightChange = function() {
  const weightSelect = qs('totalWeight');
  const customWeight = qs('customWeight');
  
  if (weightSelect.value === 'custom') {
    customWeight.style.display = 'block';
    customWeight.focus();
  } else {
    customWeight.style.display = 'none';
    renderCurrentRecipe();
  }
};

// Mode Toggle
window.toggleMode = checkbox => {
  mode = checkbox.checked ? "gram" : "percent";
  localStorage.setItem("sico_mode", mode);
  renderCurrentRecipe();
  showToast(`${t('modeChanged')}: ${mode === 'percent' ? '%' : 'g'}`, 'info');
};

// Recipe Validation
function validateRecipe() {
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  const recipeName = qs("recipeName").value.trim();
  
  // Check percentage sum
  if (totalPercent < 95 || totalPercent > 105) {
    showModal(
      t("warning"),
      `${t("sumWarning")} (${formatNumber(totalPercent, 2)}%)`,
      () => {}
    );
    return false;
  }
  
  // Check required fields
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

// Save Recipe
window.saveRecipe = function () {
  if (!validateRecipe()) return;
  
  showLoading(t('saving'));
  
  try {
    // Update recipe data
    currentRecipe.name = qs("recipeName").value.trim();
    currentRecipe.note = qs("recipeNote").value;
    currentRecipe.series = currentSeries;
    currentRecipe.status = qs("recipeStatus").value;
    currentRecipe.updatedAt = new Date().toISOString();
    currentRecipe.totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
    currentRecipe.totalWeight = getTotalWeight();
    
    // Calculate weights for each item
    currentRecipe.items = calculateWeights(currentRecipe.items, currentRecipe.totalWeight);
    
    // Check if updating existing or creating new
    const existingIndex = recipes.findIndex(r => r.id === currentRecipe.id);
    
    if (existingIndex > -1) {
      recipes[existingIndex] = { ...currentRecipe };
    } else {
      recipes.push({ ...currentRecipe });
    }
    
    // Save to localStorage
    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    localStorage.removeItem("sico_draft");
    
    // Show success
    showToast(t("savedSuccess"), 'success');
    
    // Clear draft and show recipes
    setTimeout(() => {
      clearDraft();
      showTab("recipes");
      hideLoading();
    }, 1000);
    
  } catch (error) {
    hideLoading();
    showToast(t("saveError"), 'error');
    console.error('Save error:', error);
  }
};

// Draft Management
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
    
    // Update UI
    const badge = elements.seriesBadge;
    if (badge) {
      badge.textContent = currentSeries || '';
      badge.style.display = currentSeries ? "inline-flex" : "none";
    }
    
    qs("recipeName").value = draft.name || '';
    qs("recipeNote").value = draft.note || '';
    qs("recipeStatus").value = draft.status || 'draft';
    
    // Handle photo
    if (draft.photo) {
      const img = elements.photoPreview.querySelector('img');
      const preview = elements.photoPreview;
      if (img && preview) {
        img.src = draft.photo;
        img.style.display = 'block';
        preview.style.display = 'block';
      }
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
  
  // Reset UI
  const badge = elements.seriesBadge;
  if (badge) {
    badge.style.display = "none";
  }
  
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeStatus").value = "draft";
  
  const img = elements.photoPreview?.querySelector('img');
  const preview = elements.photoPreview;
  if (img && preview) {
    img.src = "";
    img.style.display = 'none';
    preview.style.display = 'none';
  }
  
  // Clear localStorage
  localStorage.removeItem("sico_draft");
  
  // Re-render
  renderCurrentRecipe();
  renderAddColors();
  updateStats();
  
  showToast(t("draftCleared"), 'success');
};

// Recipes List
window.renderRecipes = function () {
  const recipeList = elements.recipeList;
  if (!recipeList) return;
  
  if (recipes.length === 0) {
    recipeList.innerHTML = `
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
  
  // Apply filters
  let filteredRecipes = recipes;
  
  if (recipeFilter !== 'all') {
    filteredRecipes = filteredRecipes.filter(r => r.status === recipeFilter);
  }
  
  const searchTerm = qs('recipeSearchList').value.toLowerCase();
  if (searchTerm) {
    filteredRecipes = filteredRecipes.filter(r => 
      (r.name?.toLowerCase() || '').includes(searchTerm) ||
      (r.note?.toLowerCase() || '').includes(searchTerm) ||
      (r.series?.toLowerCase() || '').includes(searchTerm)
    );
  }
  
  // Render recipes
  recipeList.innerHTML = filteredRecipes.map(recipe => {
    const date = new Date(recipe.updatedAt).toLocaleDateString(currentLang);
    const colorDots = (recipe.items || []).slice(0, 12).map(item => 
      `<div class="color-dot" style="background: ${getColorByCode(item.code)?.hex || '#ccc'}"></div>`
    ).join('');
    
    return `
      <div class="recipe-card" onclick="editRecipe('${recipe.id}')">
        <div class="recipe-card-header">
          <div>
            <div class="recipe-name">${recipe.name || t('unnamed')}</div>
            <div class="recipe-meta">
              <span>${recipe.series || ''}</span>
              <span>•</span>
              <span>${(recipe.items || []).length} ${t('colors')}</span>
              <span>•</span>
              <span>${date}</span>
            </div>
          </div>
          <span class="recipe-status ${recipe.status || 'draft'}">${t(recipe.status || 'draft')}</span>
        </div>
        
        ${recipe.note ? `<div class="recipe-note">${recipe.note}</div>` : ''}
        
        ${(recipe.items || []).length > 0 ? `
          <div class="recipe-colors">
            ${colorDots}
            ${(recipe.items || []).length > 12 ? `<span class="more-colors">+${(recipe.items || []).length - 12}</span>` : ''}
          </div>
        ` : ''}
        
        <div class="recipe-actions">
          <button class="btn-secondary" onclick="event.stopPropagation(); exportRecipeJson('${recipe.id}')">
            JSON
          </button>
          <button class="btn-secondary" onclick="event.stopPropagation(); exportRecipePdf('${recipe.id}')">
            PDF
          </button>
          <button class="btn-danger" onclick="event.stopPropagation(); confirmDelete('${recipe.id}')">
            ${t('delete')}
          </button>
        </div>
      </div>
    `;
  }).join("");
};

window.filterRecipes = function () {
  renderRecipes();
};

window.setRecipeFilter = function (filter) {
  recipeFilter = filter;
  
  // Update filter buttons
  qsa('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  
  renderRecipes();
};

// Recipe Operations
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

// Import/Export
window.importRecipes = function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = event => {
      try {
        const imported = JSON.parse(event.target.result);
        const newRecipes = Array.isArray(imported) ? imported : [imported];
        
        // Validate recipes
        const validRecipes = newRecipes.filter(r => 
          r && r.id && (r.name || r.items?.length > 0)
        );
        
        // Merge with existing (avoid duplicates by ID)
        const existingIds = new Set(recipes.map(r => r.id));
        const uniqueNewRecipes = validRecipes.filter(r => !existingIds.has(r.id));
        
        recipes = [...recipes, ...uniqueNewRecipes];
        localStorage.setItem("sico_recipes", JSON.stringify(recipes));
        
        renderRecipes();
        showToast(`${t('importSuccess')}: ${uniqueNewRecipes.length}`, 'success');
        
      } catch (error) {
        showToast(t('importError'), 'error');
        console.error('Import error:', error);
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
  link.download = `sico-recipe-${(recipe.name || 'unnamed').replace(/\s+/g, '-')}.json`;
  link.click();
  
  showToast(t('exportSuccess'), 'success');
};

window.exportRecipePdf = function (id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add logo/title
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text('SICO MIX', 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Paint Mixing Recipe', 20, 30);
    
    // Recipe info
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(recipe.name || t('unnamed'), 20, 45);
    
    doc.setFontSize(10);
    doc.text(`Series: ${recipe.series || 'N/A'}`, 20, 55);
    doc.text(`Status: ${t(recipe.status || 'draft')}`, 20, 60);
    doc.text(`Created: ${new Date(recipe.createdAt).toLocaleDateString()}`, 20, 65);
    
    if (recipe.note) {
      const splitNote = doc.splitTextToSize(`Note: ${recipe.note}`, 170);
      doc.text(splitNote, 20, 75);
    }
    
    // Table data
    const startY = recipe.note ? 85 + (splitNote?.length || 0) * 5 : 85;
    const tableData = (recipe.items || []).map((item, index) => [
      index + 1,
      item.code,
      item.name || '',
      `${formatNumber(item.percent || 0, 2)}%`,
      `${formatNumber(item.weight || 0, 1)}g`
    ]);
    
    // Create table
    if (tableData.length > 0) {
      doc.autoTable({
        head: [['#', 'Code', 'Name', 'Percentage', 'Weight']],
        body: tableData,
        startY: startY,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20 }
      });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount} • Generated by SICO MIX`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    // Save PDF
    doc.save(`sico-recipe-${(recipe.name || 'unnamed').replace(/\s+/g, '-')}.pdf`);
    showToast(t('pdfExported'), 'success');
    
  } catch (error) {
    showToast(t('exportError'), 'error');
    console.error('PDF export error:', error);
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

window.backupData = function () {
  exportAllData();
};

window.confirmReset = function () {
  showModal(
    t('confirmReset'),
    t('confirmResetMsg'),
    resetAllData
  );
};

function resetAllData() {
  // Clear all data
  recipes = [];
  localStorage.removeItem("sico_recipes");
  localStorage.removeItem("sico_draft");
  localStorage.removeItem("sico_mode");
  localStorage.removeItem("sico_theme");
  localStorage.removeItem("sico_lang");
  
  // Reset state
  clearDraft();
  mode = "percent";
  theme = "auto";
  currentLang = "ua";
  
  // Reinitialize
  setLang(currentLang);
  applyTheme();
  renderRecipes();
  
  showToast(t('dataReset'), 'success');
};

// Photo Handling
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showToast(t('fileTooLarge'), 'error');
    return;
  }
  
  // Check file type
  if (!file.type.startsWith('image/')) {
    showToast(t('invalidImage'), 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = event => {
    currentRecipe.photo = event.target.result;
    
    // Update preview
    const img = elements.photoPreview?.querySelector('img');
    const preview = elements.photoPreview;
    if (img && preview) {
      img.src = currentRecipe.photo;
      img.style.display = 'block';
      preview.style.display = 'block';
    }
    
    autoSaveDraft();
    showToast(t('photoAdded'), 'success');
  };
  
  reader.readAsDataURL(file);
}

window.removePhoto = function() {
  currentRecipe.photo = null;
  
  const img = elements.photoPreview?.querySelector('img');
  const preview = elements.photoPreview;
  if (img && preview) {
    img.src = '';
    img.style.display = 'none';
    preview.style.display = 'none';
  }
  
  autoSaveDraft();
  showToast(t('photoRemoved'), 'success');
};

// Stats & Updates
function updateStats() {
  const totalColors = currentRecipe.items.length;
  const totalPercent = currentRecipe.items.reduce((sum, item) => sum + item.percent, 0);
  
  if (elements.recipeStats) {
    elements.recipeStats.textContent = `${totalColors} ${t('colors')}`;
  }
  if (elements.totalColors) {
    elements.totalColors.textContent = totalColors;
  }
  if (elements.totalPercent) {
    elements.totalPercent.textContent = `${formatNumber(totalPercent, 2)}%`;
  }
}

// Modal System
window.showModal = function (title, message, onConfirm) {
  if (elements.modalTitle) elements.modalTitle.textContent = title;
  if (elements.modalBody) elements.modalBody.textContent = message;
  
  if (elements.modalConfirm) {
    elements.modalConfirm.onclick = () => {
      if (typeof onConfirm === 'function') {
        onConfirm();
      }
      closeModal();
    };
  }
  
  if (elements.modalOverlay) {
    elements.modalOverlay.classList.remove('hidden');
  }
};

window.closeModal = function () {
  if (elements.modalOverlay) {
    elements.modalOverlay.classList.add('hidden');
  }
};

// Toast System
function showToast(message, type = 'info', duration = 3000) {
  const container = elements.toastContainer;
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${getToastIcon(type)}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after duration
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
  }, duration);
  
  // Click to dismiss
  toast.onclick = () => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
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

// Loading Overlay
function showLoading(message = t('loading')) {
  const overlay = elements.loadingOverlay;
  const text = overlay?.querySelector('.loading-text');
  if (overlay && text) {
    text.textContent = message;
    overlay.classList.remove('hidden');
  }
}

function hideLoading() {
  const overlay = elements.loadingOverlay;
  if (overlay) {
    overlay.classList.add('hidden');
  }
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
  // Don't trigger shortcuts when typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  
  switch (e.key) {
    case '1':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        showTab('colors');
      }
      break;
    case '2':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        showTab('new');
      }
      break;
    case '3':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        showTab('recipes');
      }
      break;
    case '4':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        showTab('settings');
      }
      break;
    case 's':
    case 'S':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        saveRecipe();
      }
      break;
    case 'Escape':
      closeModal();
      break;
    case 't':
    case 'T':
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        toggleTheme();
      }
      break;
  }
}

// Export utility functions to window for debugging
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
  exportData: exportAllData,
  addTestRecipe: () => {
    const testRecipe = {
      id: generateId(),
      name: "Test Recipe",
      series: "MIX",
      status: "draft",
      items: [
        { code: "MIX-001", percent: 50, name: "Red", hex: "#ff0000" },
        { code: "MIX-002", percent: 50, name: "Blue", hex: "#0000ff" }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    recipes.push(testRecipe);
    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    renderRecipes();
    showToast("Test recipe added", 'success');
  }
};

// Quick calculate function
window.calculateWeights = function() {
  if (currentRecipe.items.length === 0) {
    showToast(t('noColorsAdded'), 'warning');
    return;
  }
  
  const totalWeight = getTotalWeight();
  currentRecipe.items = calculateWeights(currentRecipe.items, totalWeight);
  renderCurrentRecipe();
  showToast(t('calculated'), 'success');
};

// Export all colors
window.exportAllColors = function() {
  const data = {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    colors: COLORS,
    series: SERIES
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = `sico-colors-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showToast('Colors exported', 'success');
};

// Export all recipes
window.exportAllRecipes = function() {
  exportAllData();
};

// Initialize
console.log('SICO MIX initialized successfully');