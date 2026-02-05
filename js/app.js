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
  if
