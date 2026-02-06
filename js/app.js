import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId, calculateWeights } from "./utils.js";

window.SICO = {
  version: '2.0.1',
  colors: COLORS,
  series: SERIES
};

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = JSON.parse(localStorage.getItem("sico_draft") || "{}");
if (!currentRecipe.id) {
  currentRecipe = {
    id: generateId(),
    items: [],
    status: 'draft',
    photo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

let currentSeries = currentRecipe.series || null;
let mode = localStorage.getItem("sico_mode") || "percent";
let theme = localStorage.getItem("sico_theme") || "auto";

const elements = {
  themeToggle: qs('themeToggle'),
  seriesBadge: qs('seriesBadge'),
  totalColors: qs('totalColors'),
  totalPercent: qs('totalPercent'),
  totalWeightGrams: qs('totalWeightGrams'),
  colorList: qs('colorList'),
  addColorList: qs('addColorList'),
  recipeItems: qs('recipeItems'),
  recipeList: qs('recipeList'),
  recipeSearchList: qs('recipeSearchList'),
  customWeight: qs('customWeight'),
  photoPreview: qs('photoPreview'),
  modalOverlay: qs('modalOverlay'),
  modalTitle: qs('modalTitle'),
  modalBody: qs('modalBody'),
  modalConfirm: qs('modalConfirm'),
  toastContainer: qs('toastContainer')
};

window.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  applyTheme();
  setLang(currentLang);
  initSeriesFilter();
  renderColors();
  renderAddColors();
  renderCurrentRecipe();
  renderRecipes();
  updateStats();
  setupListeners();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
}

function setupListeners() {
  elements.themeToggle?.addEventListener('click', toggleTheme);

  qs('totalWeight')?.addEventListener('change', e => {
    elements.customWeight.style.display = e.target.value === 'custom' ? 'block' : 'none';
    if (e.target.value !== 'custom') renderCurrentRecipe();
  });

  elements.customWeight?.addEventListener('input', () => renderCurrentRecipe());

  qs('recipePhoto')?.addEventListener('change', handlePhotoUpload);

  elements.recipeSearchList?.addEventListener('input', () => renderRecipes());

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's': e.preventDefault(); saveRecipe(); break;
      }
    }
    if (e.key === 'Escape') closeModal();
  });
}

function applyTheme() {
  const isDark = theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  elements.themeToggle?.querySelector('.theme-icon')?.replaceWith(document.createTextNode(isDark ? '☀️' : '🌙'));
}

function toggleTheme() {
  theme = theme === 'dark' ? 'light' : (theme === 'light' ? 'auto' : 'dark');
  localStorage.setItem("sico_theme", theme);
  applyTheme();
}

function initSeriesFilter() {
  const sel = qs('seriesFilter');
  if (!sel) return;
  sel.innerHTML = `<option value="ALL">${t("allSeries")}</option>` +
    SERIES.map(s => `<option value="${s.id}">${s.id} — ${s.name[currentLang]}</option>`).join('');
  sel.onchange = renderColors;
}

function renderColors() {
  const series = qs('seriesFilter')?.value || 'ALL';
  const search = qs('colorSearch')?.value?.toLowerCase() || '';

  let filtered = COLORS;
  if (series !== 'ALL') filtered = filtered.filter(c => c.series === series);
  if (search) filtered = filtered.filter(c => 
    c.code.toLowerCase().includes(search) || c.name[currentLang].toLowerCase().includes(search)
  );

  elements.colorList.innerHTML = filtered.map(c => `
    <div class="color-card" onclick="addColor('${c.code}')">
      <div class="color-swatch" style="background:${c.hex}"></div>
      <div class="color-info">
        <div class="color-code">${c.code}</div>
        <div class="color-name">${c.name[currentLang]}</div>
      </div>
      <button onclick="event.stopPropagation();addColor('${c.code}')">+</button>
    </div>
  `).join('');
}

function renderAddColors() {
  let list = currentSeries ? COLORS.filter(c => c.series === currentSeries) : COLORS;
  const search = qs('recipeSearch')?.value?.toLowerCase() || '';
  if (search) list = list.filter(c => 
    c.code.toLowerCase().includes(search) || c.name[currentLang].toLowerCase().includes(search)
  );

  elements.addColorList.innerHTML = list.map(c => `
    <div onclick="addColor('${c.code}')">
      <div style="background:${c.hex}"></div>
      <div>${c.code}</div>
      <div>${c.name[currentLang]}</div>
    </div>
  `).join('');
}

function renderCurrentRecipe() {
  let total = parseFloat(qs('totalWeight')?.value || 100);
  if (qs('totalWeight')?.value === 'custom') {
    total = parseFloat(elements.customWeight?.value) || 100;
  }

  const weighted = calculateWeights(currentRecipe.items, total);

  elements.recipeItems.innerHTML = weighted.map((item, i) => {
    const col = getColorByCode(item.code);
    return `
      <div class="recipe-item">
        <div style="background:${col?.hex || '#ccc'}"></div>
        <div>
          <div>${item.code}</div>
          <div>${col?.name[currentLang] || ''}</div>
        </div>
        <input type="number" value="${formatNumber(mode === 'percent' ? item.percent : item.weight, 2)}" 
               onchange="updateItem(${i}, this.value)">
        <button onclick="removeItem(${i})">×</button>
      </div>
    `;
  }).join('');

  updateStats();
}

function renderRecipes() {
  const term = elements.recipeSearchList?.value?.toLowerCase() || '';
  let list = recipes.filter(r => 
    !term || r.name.toLowerCase().includes(term) || (r.note||'').toLowerCase().includes(term)
  );

  elements.recipeList.innerHTML = list.map(r => `
    <div class="recipe-card">
      ${r.photo ? `<img src="${r.photo}" alt="">` : ''}
      <div>
        <h3>${r.name || 'Без назви'}</h3>
        <div>${r.series || ''} • ${t(r.status)}</div>
        <div class="actions">
          <button onclick="editRecipe('${r.id}')">Редагувати</button>
          <button onclick="deleteRecipe('${r.id}')">Видалити</button>
        </div>
      </div>
    </div>
  `).join('') || '<div>Рецептів не знайдено</div>';
}

window.addColor = code => {
  if (currentRecipe.items.some(i => i.code === code)) return;
  const color = getColorByCode(code);
  if (!color) return;

  if (currentSeries && color.series !== currentSeries) return;

  if (!currentSeries) {
    currentSeries = color.series;
    currentRecipe.series = color.series;
    elements.seriesBadge.textContent = color.series;
  }

  currentRecipe.items.push({ code, percent: 0, weight: 0 });
  saveDraft();
  renderCurrentRecipe();
  renderAddColors();
};

window.updateItem = (index, val) => {
  const v = parseFloat(val);
  if (isNaN(v)) return;

  if (mode === 'percent') {
    currentRecipe.items[index].percent = clamp(v, 0, 100);
  } else {
    currentRecipe.items[index].weight = Math.max(0, v);
  }

  saveDraft();
  renderCurrentRecipe();
};

window.removeItem = index => {
  currentRecipe.items.splice(index, 1);
  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    currentRecipe.series = null;
    elements.seriesBadge.textContent = '';
  }
  saveDraft();
  renderCurrentRecipe();
  renderAddColors();
};

window.saveRecipe = () => {
  const name = qs('recipeName')?.value.trim();
  if (!name || currentRecipe.items.length === 0) return;

  currentRecipe.name = name;
  currentRecipe.note = qs('recipeNote')?.value.trim() || '';
  currentRecipe.status = 'ready';
  currentRecipe.updatedAt = new Date().toISOString();

  const idx = recipes.findIndex(r => r.id === currentRecipe.id);
  if (idx >= 0) recipes[idx] = currentRecipe;
  else recipes.push(currentRecipe);

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  localStorage.removeItem("sico_draft");

  currentRecipe = { id: generateId(), items: [], status: 'draft', photo: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  currentSeries = null;
  renderAll();
};

function saveDraft() {
  currentRecipe.updatedAt = new Date().toISOString();
  localStorage.setItem("sico_draft", JSON.stringify(currentRecipe));
}

function updateStats() {
  const count = currentRecipe.items.length;
  const sum = currentRecipe.items.reduce((a, b) => a + b.percent, 0);
  elements.totalColors.textContent = count;
  elements.totalPercent.textContent = formatNumber(sum, 1) + '%';
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file || file.size > 5*1024*1024 || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = ev => {
    currentRecipe.photo = ev.target.result;
    const img = elements.photoPreview.querySelector('img');
    img.src = currentRecipe.photo;
    elements.photoPreview.style.display = 'block';
    saveDraft();
  };
  reader.readAsDataURL(file);
}

function closeModal() {
  elements.modalOverlay?.classList.add('hidden');
}

function showToast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  elements.toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}
