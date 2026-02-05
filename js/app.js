import { COLORS, SERIES, getColorByCode } from "./data-colors.js";
import { t, setLang, currentLang } from "./i18n.js";
import { formatNumber, clamp, generateId } from "./utils.js";

window.setLang = setLang;

const qs = id => document.getElementById(id);
const qsa = sel => document.querySelectorAll(sel);

let recipes = JSON.parse(localStorage.getItem("sico_recipes") || "[]");
let currentRecipe = { id: generateId(), items: [], status: 'draft', photo: null };
let currentSeries = null;
let mode = localStorage.getItem("sico_mode") || "percent";
let theme = localStorage.getItem("sico_theme") || "auto";

function applyTheme() {
  document.body.classList.toggle('dark', theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches));
  qs('themeToggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

window.toggleTheme = () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem("sico_theme", theme);
  applyTheme();
};

window.showTab = function (id) {
  qsa(".tab").forEach(t => t.classList.remove("active"));
  qs(id).classList.add("active");
  if (id === "recipes") renderRecipes();
  if (id === "new") loadDraft();
};

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

function renderColors() {
  const series = qs("seriesFilter").value;
  const search = qs("colorSearch").value.toLowerCase();
  let list = COLORS;
  if (series !== "ALL") list = list.filter(c => c.series === series);
  if (search) list = list.filter(c => c.code.toLowerCase().includes(search) || c.name[currentLang].toLowerCase().includes(search));

  qs("colorList").innerHTML = list.map(c => `
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        ${c.name[currentLang]}
      </div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>
  `).join("");
}

function renderAddColors() {
  const search = qs("recipeSearch").value.toLowerCase();
  let list = COLORS;
  if (currentSeries) list = list.filter(c => c.series === currentSeries);
  if (search) list = list.filter(c => c.code.toLowerCase().includes(search) || c.name[currentLang].toLowerCase().includes(search));

  qs("addColorList").innerHTML = list.map(c => `
    <div class="color">
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        ${c.name[currentLang]}
      </div>
      <button onclick="addColor('${c.code}')">+</button>
    </div>
  `).join("");
}

window.addColor = function (code) {
  const color = getColorByCode(code);
  if (!currentSeries) {
    currentSeries = color.series;
    qs("seriesBadge").textContent = currentSeries;
    qs("seriesBadge").style.display = "inline-block";
  }
  if (color.series !== currentSeries) {
    showNotification(t("errorSeries"), 'error');
    return;
  }
  if (currentRecipe.items.find(i => i.code === code)) return; // Не дублювати
  currentRecipe.items.push({ code, percent: 0 });
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
};

window.toggleMode = checkbox => {
  mode = checkbox.checked ? "gram" : "percent";
  localStorage.setItem("sico_mode", mode);
  renderCurrentRecipe();
};

window.renderCurrentRecipe = function () {
  const total = Number(qs("totalWeight").value);
  let sum = 0;

  qs("recipeItems").innerHTML = currentRecipe.items.map((i, idx) => {
    let val = mode === "percent"
      ? i.percent
      : (i.percent * total / 100);
    val = clamp(val, 0, Infinity);
    val = formatNumber(val, mode === "percent" ? 2 : 1);
    sum += i.percent;
    return `
      <div class="recipe-item">
        <span>${i.code}</span>
        <input type="number" value="${val}"
          onchange="updateItem(${idx}, this.value)">
        <span>${mode === "percent" ? "%" : "g"}</span>
        <button onclick="removeItem(${idx})">✕</button>
      </div>`;
  }).join("") + `<div class="sum-line ${sum > 105 || sum < 95 ? 'warning' : ''}">${t("sum")}: ${formatNumber(sum, 2)}%</div>`;
};

window.updateItem = (i, val) => {
  val = Number(val);
  const total = Number(qs("totalWeight").value);
  currentRecipe.items[i].percent =
    mode === "percent" ? clamp(val, 0, 100) : clamp((val / total) * 100, 0, 100);
  autoSaveDraft();
  renderCurrentRecipe();
};

window.removeItem = i => {
  currentRecipe.items.splice(i, 1);
  if (!currentRecipe.items.length) {
    currentSeries = null;
    qs("seriesBadge").style.display = "none";
  }
  autoSaveDraft();
  renderCurrentRecipe();
  renderAddColors();
};

function validateRecipe() {
  const sum = currentRecipe.items.reduce((s, i) => s + i.percent, 0);
  if (sum < 95 || sum > 105) {
    showNotification(t("sumWarning"), 'warning');
    return false;
  }
  if (!qs("recipeName").value.trim() || !currentRecipe.items.length) {
    showNotification(t("errorEmptyRecipe"), 'error');
    return false;
  }
  return true;
}

window.saveRecipe = function () {
  if (!validateRecipe()) return;

  currentRecipe.name = qs("recipeName").value.trim();
  currentRecipe.note = qs("recipeNote").value;
  currentRecipe.series = currentSeries;
  currentRecipe.status = qs("recipeStatus").value;

  const existingIdx = recipes.findIndex(r => r.id === currentRecipe.id);
  if (existingIdx > -1) {
    recipes[existingIdx] = currentRecipe;
  } else {
    recipes.push(currentRecipe);
  }

  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  showNotification(t("savedSuccess"), 'success');
  clearDraft();
  showTab("recipes");
};

function autoSaveDraft() {
  currentRecipe.name = qs("recipeName").value.trim();
  currentRecipe.note = qs("recipeNote").value;
  currentRecipe.status = qs("recipeStatus").value;
  localStorage.setItem("sico_draft", JSON.stringify(currentRecipe));
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem("sico_draft"));
  if (draft) {
    currentRecipe = draft;
    currentSeries = draft.series || null;
    qs("seriesBadge").textContent = currentSeries || '';
    qs("seriesBadge").style.display = currentSeries ? "inline-block" : "none";
    qs("recipeName").value = draft.name || '';
    qs("recipeNote").value = draft.note || '';
    qs("recipeStatus").value = draft.status;
    qs("photoPreview").src = draft.photo || '';
    qs("photoPreview").style.display = draft.photo ? "block" : "none";
    renderCurrentRecipe();
    renderAddColors();
  }
}

function clearDraft() {
  currentRecipe = { id: generateId(), items: [], status: 'draft', photo: null };
  currentSeries = null;
  qs("seriesBadge").style.display = "none";
  qs("recipeName").value = "";
  qs("recipeNote").value = "";
  qs("recipeStatus").value = "draft";
  qs("photoPreview").src = "";
  qs("photoPreview").style.display = "none";
  localStorage.removeItem("sico_draft");
  renderCurrentRecipe();
  renderAddColors();
}

function renderRecipes() {
  qs("recipeList").innerHTML = recipes.length
    ? recipes.map(r => `
      <div class="recipe-preview" onclick="editRecipe('${r.id}')">
        <strong>${r.name}</strong>
        <span class="meta">${r.series} | ${r.items.length} ${t('paints')} | ${t(r.status)}</span>
        <small>${r.note.slice(0, 100)}...</small>
        ${r.photo ? '<img src="' + r.photo + '" style="max-height:50px;">' : ''}
        <div class="recipe-actions">
          <button onclick="exportRecipeJson('${r.id}')" data-i18n="exportText"></button>
          <button onclick="exportRecipePdf('${r.id}')" data-i18n="exportPdf"></button>
          <button class="btn-danger" onclick="confirmDelete('${r.id}')" data-i18n="delete"></button>
        </div>
      </div>`).join("")
    : `<p class="empty-state">${t("noRecipes")}</p>`;
  setLang(currentLang); // Оновити тексти кнопок
}

window.editRecipe = id => {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    currentRecipe = { ...recipe };
    loadDraft(); // Використовуємо load для заповнення форми
    showTab('new');
  }
};

window.confirmDelete = id => {
  showModal(t('confirmDelete'), t('confirmDeleteMsg'), () => deleteRecipe(id));
};

function deleteRecipe(id) {
  recipes = recipes.filter(r => r.id !== id);
  localStorage.setItem("sico_recipes", JSON.stringify(recipes));
  renderRecipes();
}

window.importRecipes = () => {
  qs('importFile').click();
  qs('importFile').onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        recipes = recipes.concat(Array.isArray(imported) ? imported : [imported]);
        localStorage.setItem("sico_recipes", JSON.stringify(recipes));
        renderRecipes();
        showNotification(t('importSuccess'), 'success');
      } catch (err) {
        showNotification(t('error'), 'error');
      }
    };
    reader.readAsText(file);
  };
};

window.exportRecipeJson = id => {
  const recipe = recipes.find(r => r.id === id);
  const blob = new Blob([JSON.stringify(recipe, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${recipe.name}.json`;
  a.click();
};

window.exportRecipePdf = id => {
  const recipe = recipes.find(r => r.id === id);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(`${t('recipeName')}: ${recipe.name}`, 10, 10);
  doc.text(`${t('note')}: ${recipe.note}`, 10, 20);
  doc.text(`${t('series')}: ${recipe.series}`, 10, 30);
  doc.text(`${t('status')}: ${t(recipe.status)}`, 10, 40);

  doc.autoTable({
    head: [[t('code'), t('percent')]],
    body: recipe.items.map(i => [i.code, formatNumber(i.percent, 2) + '%']),
    startY: 50
  });

  doc.save(`${recipe.name}.pdf`);
};

qs('recipePhoto').onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = ev => {
    currentRecipe.photo = ev.target.result;
    qs('photoPreview').src = currentRecipe.photo;
    qs('photoPreview').style.display = 'block';
    autoSaveDraft();
  };
  reader.readAsDataURL(file);
};

function showNotification(msg, type = 'info') {
  const notif = qs('notification');
  notif.textContent = msg;
  notif.className = `notification ${type}`;
  notif.classList.remove('hidden');
  setTimeout(() => notif.classList.add('hidden'), 3000);
}

function showModal(title, body, onConfirm) {
  qs('modalTitle').textContent = title;
  qs('modalBody').innerHTML = body;
  qs('modalConfirm').onclick = () => { onConfirm(); closeModal(); };
  qs('modalOverlay').classList.remove('hidden');
}

window.closeModal = () => qs('modalOverlay').classList.add('hidden');

function renderAll() {
  renderColors();
  renderAddColors();
  renderCurrentRecipe();
  renderRecipes();
}

document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  initSeriesFilter();
  applyTheme();
  qs('totalWeight').setAttribute('data-i18n', 'weightCalc'); // Для перекладу, але оскільки опції фіксовані, лишаємо як є
  renderColors();
  loadDraft();
});
