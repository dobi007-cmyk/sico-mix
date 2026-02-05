import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId } from "./utils.js";

window.setLang = setLang;

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

// Ініціалізація даних
let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = {
  id: generateId(),
  name: "",
  note: "",
  series: null,
  status: "draft",
  items: [],
  photo: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
let currentSeries = null;
let mode = "percent";
let autoSaveTimer = null;
let deleteRecipeId = null;

// Ініціалізація теми
function initTheme() {
  const savedTheme = localStorage.getItem("sico_theme") || "system";
  setTheme(savedTheme);
}

function setTheme(theme) {
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'system') {
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    html.setAttribute('data-theme', theme);
  }
  
  localStorage.setItem("sico_theme", theme);
  
  // Оновити активну кнопку теми
  qsa('.theme-switcher button').forEach(btn => {
    const themeType = btn.textContent.includes('☀️') ? 'light' :
                     btn.textContent.includes('🌙') ? 'dark' : 'system';
    btn.style.background = theme === themeType ? 'var(--accent)' : '';
    btn.style.color = theme === themeType ? 'white' : '';
  });
}

window.setTheme = setTheme;

// Ініціалізація фільтрів серій
function initSeriesFilter() {
  const select = qs("seriesFilter");
  select.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;
  SERIES.forEach(s => {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.id;
    select.appendChild(o);
  });
  select.onchange = () => renderColors();
}

// Пошук кольорів
function searchColors(query) {
  query = query.toLowerCase();
  return COLORS.filter(c => 
    c.code.toLowerCase().includes(query) ||
    c.name[currentLang]?.toLowerCase().includes(query)
  );
}

// Рендер кольорів з пошуком
function renderColors() {
  const series = qs("seriesFilter").value;
  const searchQuery = qs("colorSearch").value;
  
  let list = series === "ALL" ? COLORS : COLORS.filter(c => c.series === series);
  
  if (searchQuery) {
    list = searchColors(searchQuery);
  }
  
  qs("colorList").innerHTML = list.map(c => `
    <div class="color">
      <div class="swatch" style="background:${c.hex}" title="${c.code}"></div>
      <div>
        <strong>${c.code}</strong><br>
        ${c.name[currentLang]}
      </div>
      <button onclick="addColor('${c.code}')" title="${t('add')}">+</button>
    </div>
  `).join("");
}

// Пошук і додавання кольору в рецепт
window.searchAndAddColor = function() {
  const query = qs("recipeColorSearch").value;
  if (!query) return;
  
  const results = searchColors(query);
  const resultsContainer = qs("colorSearchResults");
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="color-search-item">${t('noResults')}</div>`;
    return;
  }
  
  resultsContainer.innerHTML = results.slice(0, 10).map(c => `
    <div class="color-search-item" onclick="addColorFromSearch('${c.code}')">
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong>
        <div>${c.name[currentLang]}</div>
      </div>
    </div>
  `).join("");
};

window.addColorFromSearch = function(code) {
  addColor(code);
  qs("recipeColorSearch").value = "";
  qs("colorSearchResults").innerHTML = "";
};

// Додавання кольору
window.addColor = function(code) {
  const color = getColorByCode(code);
  if (!color) return;
  
  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesBadge").textContent = currentSeries;
    qs("seriesBadge").style.display = "inline-block";
    currentRecipe.series = currentSeries;
  }
  
  if (color.series !== currentSeries) {
    alert(t("errorSeries"));
    return;
  }
  
  // Перевірка чи колір вже доданий
  const existing = currentRecipe.items.find(item => item.code === code);
  if (existing) {
    existing.percent += 0.1; // Додати трохи відсотків
  } else {
    currentRecipe.items.push({ 
      code, 
      percent: 10, // Початкові 10%
      baseCode: color.baseCode,
      hex: color.hex 
    });
  }
  
  renderCurrentRecipe();
  autoSave();
};

// Перемикач режиму
window.toggleMode = function(checkbox) {
  mode = checkbox.checked ? "gram" : "percent";
  renderCurrentRecipe();
};

// Оновлення загальної ваги
window.updateTotalWeight = function() {
  const select = qs("totalWeight");
  const customWeight = qs("customWeight");
  
  if (select.value === "custom") {
    customWeight.style.display = "block";
    customWeight.focus();
  } else {
    customWeight.style.display = "none";
    renderCurrentRecipe();
  }
};

// Рендер поточного рецепту
window.renderCurrentRecipe = function() {
  const total = getTotalWeight();
  let sum = 0;
  
  const itemsHtml = currentRecipe.items.map((i, idx) => {
    const val = mode === "percent"
      ? i.percent.toFixed(2)
      : (i.percent * total / 100).toFixed(1);
    sum += i.percent;
    
    const color = getColorByCode(i.code);
    return `
      <div class="recipe-item">
        <div class="color-indicator">
          <div class="swatch" style="background:${i.hex || '#ccc'}"></div>
          <span class="code">${i.code}</span>
        </div>
        <input type="number" 
               value="${val}" 
               step="${mode === 'percent' ? '0.1' : '0.5'}"
               min="0"
               onchange="updateItem(${idx}, this.value)"
               oninput="updateItem(${idx}, this.value)">
        <span class="unit">${mode === "percent" ? "%" : t("grams")}</span>
        <button onclick="removeItem(${idx})" class="remove-btn" title="${t('delete')}">✕</button>
      </div>`;
  }).join("");
  
  qs("recipeItems").innerHTML = itemsHtml + 
    `<div class="sum-line">${t("sum")}: <strong>${sum.toFixed(2)}%</strong></div>`;
  
  updateAutoSaveStatus();
};

// Оновлення елемента
window.updateItem = function(i, val) {
  const total = getTotalWeight();
  const numVal = parseFloat(val) || 0;
  
  currentRecipe.items[i].percent = mode === "percent" 
    ? numVal 
    : (numVal / total) * 100;
  
  renderCurrentRecipe();
  autoSave();
};

// Видалення елемента
window.removeItem = function(i) {
  currentRecipe.items.splice(i, 1);
  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
    currentRecipe.series = null;
  }
  renderCurrentRecipe();
  autoSave();
};

// Оновлення статусу рецепту
window.updateRecipeStatus = function() {
  currentRecipe.status = qs("recipeStatus").value;
  autoSave();
};

// Автозбереження
function autoSave() {
  const statusEl = qs("autoSaveStatus");
  statusEl.textContent = t("saving");
  statusEl.className = "save-status saving pulse";
  
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    currentRecipe.updatedAt = new Date().toISOString();
    localStorage.setItem("sico_current_recipe", JSON.stringify(currentRecipe));
    
    statusEl.textContent = t("saved");
    statusEl.className = "save-status saved";
    
    setTimeout(() => {
      statusEl.textContent = "";
      statusEl.className = "save-status";
    }, 2000);
  }, 1000);
}

function updateAutoSaveStatus() {
  const statusEl = qs("autoSaveStatus");
  if (currentRecipe.items.length > 0 || currentRecipe.name.trim()) {
    statusEl.textContent = t("autoSave");
  } else {
    statusEl.textContent = "";
  }
}

// Завантаження збереженого рецепту
function loadSavedRecipe() {
  const saved = localStorage.getItem("sico_current_recipe");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      currentRecipe = { ...currentRecipe, ...parsed };
      currentSeries = currentRecipe.series;
      
      if (currentSeries) {
        qs("seriesBadge").textContent = currentSeries;
        qs("seriesBadge").style.display = "inline-block";
      }
      
      qs("recipeName").value = currentRecipe.name || "";
      qs("recipeNote").value = currentRecipe.note || "";
      qs("recipeStatus").value = currentRecipe.status || "draft";
      
      if (currentRecipe.photo) {
        qs("recipePhoto").src = currentRecipe.photo;
        qs("recipePhoto").style.display = "block";
        qs("photoPlaceholder").style.display = "none";
      }
      
      renderCurrentRecipe();
    } catch (e) {
      console.error("Помилка завантаження рецепту:", e);
    }
  }
}

// Збереження рецепту
window.saveRecipe = function() {
  const name = qs("recipeName").value.trim();
  if (!name || !currentRecipe.items.length) {
    alert(t("errorEmptyRecipe"));
    return;
  }
  
  currentRecipe.name = name;
  currentRecipe.note = qs("recipeNote").value;
  currentRecipe.status = qs("recipeStatus").value;
  currentRecipe.series = currentSeries;
  currentRecipe.updatedAt = new Date().toISOString();
  
  // Перевірка на дублікати
  const existingIndex = recipes.findIndex(r => r.id === currentRecipe.id);
  if (existingIndex >= 0) {
    recipes[existingIndex] = { ...currentRecipe };
  } else {
    recipes.push({ ...currentRecipe });
  }
  
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  
  // Очистити поточний рецепт
  clearCurrentRecipe();
  showNotification(t("recipeSaved"), "success");
  showTab("recipes");
};

function clearCurrentRecipe() {
  currentRecipe = {
    id: generateId(),
    name: "",
    note: "",
    series: null,
    status: "draft",
    items: [],
    photo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  currentSeries = null;
  
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeStatus").value = "draft";
  qs("recipePhoto").style.display = "none";
  qs("photoPlaceholder").style.display = "flex";
  qs("colorSearchResults").innerHTML = "";
  qs("recipeColorSearch").value = "";
  
  localStorage.removeItem("sico_current_recipe");
  renderCurrentRecipe();
}

window.clearRecipe = clearCurrentRecipe;

// Рендер списку рецептів
function renderRecipes() {
  const searchQuery = qs("recipeSearch").value.toLowerCase();
  const statusFilter = qs("recipeStatusFilter").value;
  
  let filteredRecipes = recipes;
  
  if (searchQuery) {
    filteredRecipes = recipes.filter(r => 
      r.name.toLowerCase().includes(searchQuery) ||
      r.note.toLowerCase().includes(searchQuery) ||
      r.items.some(i => i.code.toLowerCase().includes(searchQuery))
    );
  }
  
  if (statusFilter !== "all") {
    filteredRecipes = filteredRecipes.filter(r => r.status === statusFilter);
  }
  
  if (filteredRecipes.length === 0) {
    qs("recipeList").innerHTML = `
      <div class="empty-state">
        <div>${t("noRecipes")}</div>
      </div>
    `;
    return;
  }
  
  qs("recipeList").innerHTML = filteredRecipes.map(recipe => `
    <div class="recipe-card">
      <div class="recipe-card-header">
        <div class="recipe-card-title">${recipe.name}</div>
        <span class="recipe-card-status ${recipe.status}">
          ${t(recipe.status)}
        </span>
      </div>
      
      ${recipe.note ? `<div class="recipe-card-note">${recipe.note}</div>` : ''}
      
      <div class="recipe-card-content">
        <div>
          <div class="recipe-colors">
            ${recipe.items.slice(0, 6).map(item => `
              <span class="color-badge" title="${item.code}">
                <div class="swatch" style="background:${item.hex || '#ccc'}"></div>
                ${item.code}
              </span>
            `).join('')}
            ${recipe.items.length > 6 ? `<span>+${recipe.items.length - 6}</span>` : ''}
          </div>
          <div class="recipe-meta">
            <small>${new Date(recipe.updatedAt).toLocaleDateString()}</small>
            <small>${recipe.series || ''}</small>
          </div>
        </div>
        
        ${recipe.photo ? `
          <div class="recipe-photo-thumb">
            <img src="${recipe.photo}" alt="${recipe.name}" 
                 style="width:80px;height:80px;border-radius:8px;object-fit:cover;">
          </div>
        ` : ''}
      </div>
      
      <div class="recipe-card-actions">
        <button onclick="editRecipe('${recipe.id}')" class="btn-small">${t("edit")}</button>
        <button onclick="exportRecipe('${recipe.id}', 'txt')" class="btn-small">TXT</button>
        <button onclick="exportRecipe('${recipe.id}', 'pdf')" class="btn-small">PDF</button>
        <button onclick="deleteRecipePrompt('${recipe.id}')" class="btn-small btn-danger">${t("delete")}</button>
      </div>
    </div>
  `).join("");
}

// Редагування рецепту
window.editRecipe = function(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  currentRecipe = { ...recipe };
  currentSeries = recipe.series;
  
  if (currentSeries) {
    qs("seriesBadge").textContent = currentSeries;
    qs("seriesBadge").style.display = "inline-block";
  }
  
  qs("recipeName").value = currentRecipe.name || "";
  qs("recipeNote").value = currentRecipe.note || "";
  qs("recipeStatus").value = currentRecipe.status || "draft";
  
  if (currentRecipe.photo) {
    qs("recipePhoto").src = currentRecipe.photo;
    qs("recipePhoto").style.display = "block";
    qs("photoPlaceholder").style.display = "none";
  }
  
  renderCurrentRecipe();
  showTab("new");
};

// Експорт рецепту
window.exportRecipe = function(id, format) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  
  if (format === 'txt') {
    exportAsTxt(recipe);
  } else if (format === 'pdf') {
    exportAsPdf(recipe);
  }
};

function exportAsTxt(recipe) {
  const lines = [
    `SICO MIX Recipe: ${recipe.name}`,
    `Status: ${t(recipe.status)}`,
    `Series: ${recipe.series || 'N/A'}`,
    `Created: ${new Date(recipe.createdAt).toLocaleString()}`,
    `Updated: ${new Date(recipe.updatedAt).toLocaleString()}`,
    `Note: ${recipe.note || ''}`,
    '',
    'Ingredients:',
    ...recipe.items.map((item, i) => 
      `${i + 1}. ${item.code} - ${item.percent.toFixed(2)}%`
    ),
    '',
    `Total: ${recipe.items.reduce((sum, item) => sum + item.percent, 0).toFixed(2)}%`
  ];
  
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sico-recipe-${recipe.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportAsPdf(recipe) {
  // Проста PDF генерація (можна замінити на бібліотеку)
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(`SICO MIX Recipe: ${recipe.name}`, 10, 10);
  
  doc.setFontSize(12);
  doc.text(`Status: ${t(recipe.status)}`, 10, 25);
  doc.text(`Series: ${recipe.series || 'N/A'}`, 10, 35);
  doc.text(`Created: ${new Date(recipe.createdAt).toLocaleDateString()}`, 10, 45);
  
  if (recipe.note) {
    doc.text(`Note: ${recipe.note}`, 10, 55);
  }
  
  doc.text('Ingredients:', 10, 70);
  
  recipe.items.forEach((item, i) => {
    const y = 80 + (i * 10);
    doc.text(`${i + 1}. ${item.code} - ${item.percent.toFixed(2)}%`, 20, y);
  });
  
  const totalY = 80 + (recipe.items.length * 10) + 10;
  doc.text(`Total: ${recipe.items.reduce((sum, item) => sum + item.percent, 0).toFixed(2)}%`, 10, totalY);
  
  doc.save(`sico-recipe-${recipe.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);
}

// Експорт всіх рецептів
window.exportRecipes = function(format) {
  if (format === 'txt') {
    const data = JSON.stringify(recipes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sico-recipes-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === 'pdf') {
    recipes.forEach((recipe, index) => {
      setTimeout(() => exportAsPdf(recipe), index * 100);
    });
  }
};

// Імпорт рецептів
window.importRecipes = function() {
  qs("importFile").click();
};

qs("importFile").onchange = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        recipes.push(...imported);
        localStorage.setItem("sico_recipes", JSON.stringify(recipes));
        renderRecipes();
        showNotification(t("recipesImported"), "success");
      }
    } catch (error) {
      showNotification(t("importError"), "error");
    }
    qs("importFile").value = "";
  };
  reader.readAsText(file);
};

// Фото
window.takePhoto = function() {
  qs("cameraModal").classList.remove("hidden");
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = qs("cameraView");
      video.srcObject = stream;
    })
    .catch(err => {
      console.error("Помилка камери:", err);
      alert("Не вдалося отримати доступ до камери");
    });
};

window.capturePhoto = function() {
  const video = qs("cameraView");
  const canvas = qs("cameraCanvas");
  const context = canvas.getContext('2d');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
  setRecipePhoto(dataUrl);
  
  closeCamera();
};

window.addPhoto = function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setRecipePhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};

window.removePhoto = function() {
  currentRecipe.photo = null;
  qs("recipePhoto").style.display = "none";
  qs("photoPlaceholder").style.display = "flex";
  autoSave();
};

function setRecipePhoto(dataUrl) {
  currentRecipe.photo = dataUrl;
  qs("recipePhoto").src = dataUrl;
  qs("recipePhoto").style.display = "block";
  qs("photoPlaceholder").style.display = "none";
  autoSave();
}

function closeCamera() {
  qs("cameraModal").classList.add("hidden");
  const video = qs("cameraView");
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }
}

// Видалення рецепту
window.deleteRecipePrompt = function(id) {
  deleteRecipeId = id;
  qs("confirmModal").classList.remove("hidden");
};

window.confirmDelete = function() {
  if (deleteRecipeId) {
    recipes = recipes.filter(r => r.id !== deleteRecipeId);
    localStorage.setItem("sico_recipes", JSON.stringify(recipes));
    renderRecipes();
    deleteRecipeId = null;
  }
  closeConfirm();
};

window.closeConfirm = function() {
  qs("confirmModal").classList.add("hidden");
  deleteRecipeId = null;
};

// Допоміжні функції
function getTotalWeight() {
  const select = qs("totalWeight");
  if (select.value === "custom") {
    return parseFloat(qs("customWeight").value) || 1000;
  }
  return parseFloat(select.value) || 1000;
}

function showNotification(message, type = "info") {
  // Реалізація сповіщень
  console.log(`${type}: ${message}`);
}

// Ініціалізація
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  initTheme();
  initSeriesFilter();
  renderColors();
  loadSavedRecipe();
  renderRecipes();
  
  // Обробники подій
  qs("colorSearch").addEventListener("input", renderColors);
  qs("recipeSearch").addEventListener("input", renderRecipes);
  qs("recipeStatusFilter").addEventListener("change", renderRecipes);
  qs("recipeColorSearch").addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchAndAddColor();
  });
  
  // Відслідковування змін для автозбереження
  qs("recipeName").addEventListener("input", autoSave);
  qs("recipeNote").addEventListener("input", autoSave);
  qs("customWeight").addEventListener("input", () => {
    renderCurrentRecipe();
    autoSave();
  });
});

// Глобальні функції
window.showTab = function (id) {
  qsa(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  
  if (id === "recipes") {
    renderRecipes();
  } else if (id === "new") {
    updateAutoSaveStatus();
  }
};
