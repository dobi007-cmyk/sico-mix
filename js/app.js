// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

const getNumber = val => Number(val) || 0;

// Екранування HTML для безпеки
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Функція для показу сповіщень
function showNotification(message, type = 'info', duration = 3000) {
  const notification = qs('notification');
  if (!notification) return;
  
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');
  
  // Автоматичне приховування
  setTimeout(() => {
    notification.classList.add('hidden');
  }, duration);
}

// Модальне вікно
let pendingDeleteIndex = null;

function showModal() {
  const modal = qs('modalOverlay');
  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  const modal = qs('modalOverlay');
  if (modal) modal.classList.add('hidden');
  pendingDeleteIndex = null;
}

function confirmDelete() {
  if (pendingDeleteIndex !== null) {
    deleteRecipe(pendingDeleteIndex, false);
  }
  closeModal();
}

// ────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────
function getRecipesFromStorage() {
  try {
    const stored = localStorage.getItem("sico_recipes");
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Помилка завантаження рецептів:", error);
    showNotification(t("errorLoadRecipes") || "Помилка завантаження рецептів", "error");
    return [];
  }
}

let recipes = getRecipesFromStorage();
let currentRecipe = { items: [] };
let currentSeries = null;
let mode = "percent";           // "percent" | "gram"

// ────────────────────────────────────────────────
// Tab switching
// ────────────────────────────────────────────────
function showTab(tabId) {
  // Оновлюємо активні вкладки
  qsa(".tab").forEach(tab => {
    tab.classList.remove("active");
    tab.classList.add("hidden");
  });
  qs(tabId)?.classList.add("active");
  qs(tabId)?.classList.remove("hidden");
  
  // Оновлюємо активні кнопки навігації
  qsa("nav button").forEach(btn => {
    const controls = btn.getAttribute('aria-controls');
    btn.setAttribute('aria-selected', controls === tabId ? 'true' : 'false');
  });

  if (tabId === "recipes") {
    renderRecipes();
  }
}

// ────────────────────────────────────────────────
// Series filter
// ────────────────────────────────────────────────
function initSeriesFilter() {
  const select = qs("seriesFilter");
  if (!select) return;

  select.innerHTML = `<option value="ALL">${t("allSeries")}</option>`;

  SERIES.forEach(series => {
    if (series.id === "ALL") return;
    const option = document.createElement("option");
    option.value = series.id;
    option.textContent = series.id;
    select.appendChild(option);
  });

  select.addEventListener("change", applySeriesFilter);
}

function applySeriesFilter() {
  const value = qs("seriesFilter").value;
  const filtered = value === "ALL" ? COLORS : COLORS.filter(c => c.series === value);
  renderColors(filtered);
}

// ────────────────────────────────────────────────
// Color catalog
// ────────────────────────────────────────────────
function renderColors(colors = COLORS) {
  const container = qs("colorList");
  if (!container) return;

  container.innerHTML = colors.map(color => `
    <div class="color">
      <div class="swatch" style="background:${color.hex}"></div>
      <div>
        <strong>${escapeHtml(color.code)}</strong><br>
        ${escapeHtml(color.name[currentLang] || color.name.uk || color.code)}
      </div>
      <button type="button" onclick="addColor('${escapeHtml(color.code)}')" aria-label="${t('addColor')} ${escapeHtml(color.code)}">+</button>
    </div>
  `).join("");
}

// ────────────────────────────────────────────────
// Recipe management
// ────────────────────────────────────────────────
function addColor(code) {
  const color = COLORS.find(c => c.code === code);
  if (!color) return;

  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesFilter").value = color.series;
    qs("seriesBadge").textContent = color.series;
    qs("seriesBadge").style.display = "inline-block";
  }

  if (color.series !== currentSeries) {
    showNotification(t("errorSeries"), "warning");
    return;
  }

  currentRecipe.items.push({ code: color.code, percent: 0 });
  renderCurrentRecipe();
}

function updateItem(index, rawValue) {
  const totalWeight = getNumber(qs("totalWeight")?.value) || 1000;
  const value = getNumber(rawValue);

  if (mode === "percent") {
    currentRecipe.items[index].percent = Math.max(0, Math.min(100, value));
  } else {
    currentRecipe.items[index].percent = Math.max(0, (value / totalWeight) * 100);
  }

  renderCurrentRecipe();
}

function removeItem(index) {
  currentRecipe.items.splice(index, 1);

  if (currentRecipe.items.length === 0) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
  }

  renderCurrentRecipe();
}

function renderCurrentRecipe() {
  const container = qs("recipeItems");
  const totalWeight = getNumber(qs("totalWeight")?.value) || 1000;
  let sumPercent = 0;

  if (!container) return;

  container.innerHTML = currentRecipe.items.map((item, idx) => {
    const displayValue = mode === "percent"
      ? item.percent.toFixed(2)
      : (item.percent * totalWeight / 100).toFixed(1);

    sumPercent += item.percent;

    return `
      <div class="recipe-item">
        <span class="code">${escapeHtml(item.code)}</span>
        <input type="number" 
               step="${mode === 'percent' ? '0.1' : '1'}" 
               min="0" 
               value="${displayValue}" 
               onchange="updateItem(${idx}, this.value)"
               aria-label="${t('amount')} ${escapeHtml(item.code)}">
        <span class="unit">${mode === "percent" ? "%" : "g"}</span>
        <button type="button" onclick="removeItem(${idx})" aria-label="${t('remove')}">✕</button>
      </div>
    `;
  }).join("");

  container.innerHTML += `
    <div class="sum-line">
      <strong>${t("sum")}: ${sumPercent.toFixed(2)}%</strong>
    </div>
  `;
}

function toggleMode(checkbox) {
  mode = checkbox.checked ? "gram" : "percent";
  renderCurrentRecipe();
}

function saveRecipe() {
  const name = qs("recipeName")?.value.trim();
  if (!name || currentRecipe.items.length === 0) {
    showNotification(t("errorEmptyRecipe"), "error");
    return;
  }

  const recipeToSave = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name,
    note: qs("recipeNote")?.value.trim() || "",
    items: currentRecipe.items.map(i => ({ ...i })),
    series: currentSeries,
    created: new Date().toISOString()
  };

  recipes.push(recipeToSave);
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));

  // Reset
  currentRecipe = { items: [] };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";

  renderCurrentRecipe();
  showTab("recipes");
  showNotification(t("recipeSaved"), "success");
}

function loadRecipe(index) {
  const recipe = recipes[index];
  if (!recipe) return;
  
  currentRecipe = { items: recipe.items.map(i => ({ ...i })) };
  currentSeries = recipe.series;
  qs("recipeName").value = recipe.name || "";
  qs("recipeNote").value = recipe.note || "";
  qs("seriesBadge").textContent = currentSeries || "";
  qs("seriesBadge").style.display = currentSeries ? "inline-block" : "none";
  
  renderCurrentRecipe();
  showTab("new");
  showNotification(t("recipeLoaded"), "info");
}

function deleteRecipe(index, confirm = true) {
  if (confirm) {
    pendingDeleteIndex = index;
    showModal();
    return;
  }
  
  recipes.splice(index, 1);
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  renderRecipes();
  showNotification(t("recipeDeleted"), "success");
}

function resetCurrentRecipe() {
  if (currentRecipe.items.length === 0) return;
  
  if (confirm(t("confirmReset") || "Скинути поточний рецепт?")) {
    currentRecipe = { items: [] };
    currentSeries = null;
    qs("recipeName").value = "";
    qs("recipeNote").value = "";
    qs("seriesBadge").style.display = "none";
    qs("seriesFilter").value = "ALL";
    applySeriesFilter();
    renderCurrentRecipe();
  }
}

// ────────────────────────────────────────────────
// Saved recipes list
// ────────────────────────────────────────────────
function renderRecipes() {
  const container = qs("recipeList");
  if (!container) return;

  if (recipes.length === 0) {
    container.innerHTML = `<p class="empty-state" data-i18n="noRecipes">—</p>`;
    return;
  }

  container.innerHTML = recipes.map((recipe, index) => `
    <div class="recipe-preview" onclick="loadRecipe(${index})">
      <strong>${escapeHtml(recipe.name)}</strong>
      <div class="meta">${escapeHtml(recipe.series || "?")} • ${recipe.items.length} ${t('colors')}</div>
      ${recipe.note ? `<small>${escapeHtml(recipe.note)}</small>` : ""}
      <div class="recipe-actions">
        <button onclick="event.stopPropagation(); loadRecipe(${index})" data-i18n="load"></button>
        <button onclick="event.stopPropagation(); deleteRecipe(${index})" data-i18n="delete"></button>
      </div>
    </div>
  `).join("");
}

// ────────────────────────────────────────────────
// Init
// ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initSeriesFilter();
  renderColors();
  
  // Ініціалізація модального вікна
  const modalOverlay = qs('modalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  
  // Ініціалізація клавіатурних скорочень
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveRecipe();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Встановлюємо початковий стан для серійного бейджа
  qs("seriesBadge").style.display = "none";
});