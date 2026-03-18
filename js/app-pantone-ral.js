// ========== PANTONE & RAL MODULE ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';
import * as app from './app-core.js';

// ---------- PANTONE ----------
function attachPantoneEventListeners() {
    const dom = app.dom;
    if (dom.pantoneCatalog) {
        dom.pantoneCatalog.addEventListener('click', function(e) {
            const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
            if (!btn) return;
            e.stopPropagation();

            if (btn.classList.contains('glass-remove-btn')) {
                const pantoneNumber = btn.dataset.pantoneNumber;
                if (pantoneNumber && window.SICOMIX?.app?.removeIngredientByArticle) {
                    window.SICOMIX.app.removeIngredientByArticle(pantoneNumber);
                }
            } else if (btn.classList.contains('glass-add-btn')) {
                const pantoneNumber = btn.dataset.pantoneNumber;
                if (pantoneNumber) {
                    addPantoneToRecipe(pantoneNumber);
                }
            }
        });
    }
}

function renderPantoneCatalog() {
    const dom = app.dom;
    if (!dom.pantoneCatalog) {
        console.warn('pantoneCatalog element not found');
        return;
    }

    if (!window.SICOMIX?.pantone || !window.SICOMIX.pantone.colors) {
        dom.pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_pantone')}</p>`;
        i18n.applyTranslations();
        return;
    }

    const search = dom.pantoneSearch?.value.toLowerCase() || '';
    const category = dom.pantoneCategoryFilter?.value || 'all';

    let filtered = window.SICOMIX.pantone.colors;

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        filtered = filtered.filter(p => 
            p.number.toLowerCase().includes(search) || 
            (p.name && p.name.toLowerCase().includes(search))
        );
    }

    if (filtered.length === 0) {
        dom.pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_pantone')}</p>`;
        i18n.applyTranslations();
        return;
    }

    const selectedIngredients = app.getSelectedIngredients();

    const html = filtered.map(p => {
        const firstIngredient = p.ingredients && p.ingredients.length > 0 ? p.ingredients[0].name : '';
        const firstAmount = p.ingredients && p.ingredients.length > 0 ? p.ingredients[0].amount : '';
        const hex = p.hex && p.hex !== '#CCCCCC' ? p.hex : '#CCCCCC';
        
        const isInRecipe = selectedIngredients.some(ing => ing.article === p.number);
        const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
        const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
        const buttonTitle = isInRecipe ? i18n.t('remove_from_recipe') : i18n.t('add_ingredient');
        
        return `
        <div class="paint-card-glass pantone-card" style="color: #000;">
            <div class="glass-swatch" style="background: ${hex};"></div>
            <div class="glass-name">${utils.escapeHtml(p.number)}</div>
            <div class="glass-article">${utils.escapeHtml(p.name || '')}</div>
            <div style="font-size: 11px; margin-top: 5px; color: var(--text-tertiary);">${firstIngredient} ${firstAmount}</div>
            <button class="${buttonClass}" data-pantone-number="${p.number}" title="${buttonTitle}" aria-label="${buttonTitle}">
                <i class="fas ${buttonIcon}"></i>
            </button>
        </div>
    `}).join('');

    dom.pantoneCatalog.innerHTML = html;
    i18n.applyTranslations();
    attachPantoneEventListeners();
}

function showPantoneRecipeModal(pantoneNumber) {
    if (!window.SICOMIX?.pantone) return;
    
    const modal = document.getElementById('pantoneRecipeModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalContent = document.getElementById('pantoneRecipeContent');
    const addBtn = document.getElementById('addPantoneFromRecipeBtn');
    
    if (!modal || !modalContent) return;
    
    const html = window.SICOMIX.pantone.getRecipeHTML(pantoneNumber);
    
    if (modalTitle) {
        modalTitle.textContent = `${i18n.t('pantone_recipe')}: ${pantoneNumber}`;
    }
    modalContent.innerHTML = html;
    
    if (addBtn) {
        addBtn.dataset.pantoneNumber = pantoneNumber;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function addPantoneToRecipe(pantoneNumber) {
    const pantone = window.SICOMIX.pantone.findByNumber(pantoneNumber);
    if (!pantone) return;

    const seriesSelect = document.getElementById('recipeSeries');
    const lockedSeries = app.getLockedSeries();
    const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
    
    if (!currentSeries) {
        utils.showNotification(i18n.t('select_series_first'), 'warning');
        return;
    }

    const tempPaintId = 'pantone-' + pantone.number.replace(/\s+/g, '_');
    const tempPaint = {
        id: tempPaintId,
        name: pantone.number,
        category: 'Pantone',
        series: currentSeries,
        color: pantone.hex && pantone.hex !== '#CCCCCC' ? pantone.hex : '#CCCCCC',
        description: pantone.name || '',
        manufacturer: 'Pantone',
        article: pantone.number,
        isDefault: false,
        displayName: { uk: pantone.number, en: pantone.number, pl: pantone.number }
    };

    const validation = app.validatePaintAddition(tempPaint);
    if (!validation.valid) {
        utils.showNotification(validation.message, 'error');
        return;
    }

    const selectedIngredients = app.getSelectedIngredients();
    const existing = selectedIngredients.find(ing => ing.article === pantone.number);
    if (existing) {
        utils.showNotification(i18n.t('paint_already_added'), 'warning');
        return;
    }

    const defaultUnit = app.getDefaultUnitSymbol();
    selectedIngredients.push({
        paintId: tempPaintId,
        article: pantone.number,
        name: pantone.number,
        category: 'Pantone',
        series: currentSeries,
        color: tempPaint.color,
        amount: 100,
        unit: defaultUnit,
        percentage: 0
    });
    app.setSelectedIngredients(selectedIngredients);

    if (window.SICOMIX?.app?.calculatePercentages) window.SICOMIX.app.calculatePercentages();
    if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    app.updateSeriesLockUI();
    app.autoSaveRecipeDraft();

    renderPantoneCatalog();
    
    utils.showNotification(i18n.t('paint_added_to_recipe'), 'success');
}

// ---------- RAL ----------
function attachRalEventListeners() {
    const dom = app.dom;
    if (dom.ralCatalog) {
        dom.ralCatalog.addEventListener('click', function(e) {
            const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
            if (!btn) return;
            e.stopPropagation();

            if (btn.classList.contains('glass-remove-btn')) {
                const code = btn.dataset.ralCode;
                if (code && window.SICOMIX?.app?.removeIngredientByArticle) {
                    window.SICOMIX.app.removeIngredientByArticle(code);
                }
            } else if (btn.classList.contains('glass-add-btn')) {
                const code = btn.dataset.ralCode;
                const hex = btn.dataset.ralHex;
                if (code) {
                    addRalToRecipe(code, hex);
                }
            }
        });
    }
}

function renderRalCatalog() {
    const dom = app.dom;
    if (!dom.ralCatalog) {
        console.warn('ralCatalog element not found');
        return;
    }

    if (!window.ralColors || !Array.isArray(window.ralColors)) {
        dom.ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_ral')}</p>`;
        i18n.applyTranslations();
        return;
    }

    const search = dom.ralSearch?.value.toLowerCase() || '';
    const selectedIngredients = app.getSelectedIngredients();

    let filtered = window.ralColors;

    if (search) {
        filtered = filtered.filter(c => 
            c.code.toLowerCase().includes(search) || 
            c.name.toLowerCase().includes(search)
        );
    }

    if (filtered.length === 0) {
        dom.ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_ral')}</p>`;
        i18n.applyTranslations();
        return;
    }

    const html = filtered.map(c => {
        const isInRecipe = selectedIngredients.some(ing => ing.article === c.code);
        const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
        const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
        const buttonTitle = isInRecipe ? i18n.t('remove_from_recipe') : i18n.t('add_ingredient');
        
        return `
        <div class="paint-card-glass ral-card" style="color: #000;">
            <div class="glass-swatch" style="background: ${c.hex};"></div>
            <div class="glass-name">${utils.escapeHtml(c.code)}</div>
            <div class="glass-article">${utils.escapeHtml(c.name)}</div>
            <button class="${buttonClass}" data-ral-code="${c.code}" data-ral-hex="${c.hex}" title="${buttonTitle}" aria-label="${buttonTitle}">
                <i class="fas ${buttonIcon}"></i>
            </button>
        </div>
    `}).join('');

    dom.ralCatalog.innerHTML = html;
    i18n.applyTranslations();
    attachRalEventListeners();
}

function addRalToRecipe(code, hex) {
    const seriesSelect = document.getElementById('recipeSeries');
    const lockedSeries = app.getLockedSeries();
    const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
    
    if (!currentSeries) {
        utils.showNotification(i18n.t('select_series_first'), 'warning');
        return;
    }

    const tempPaintId = 'ral-' + code.replace(/\s+/g, '_');
    const tempPaint = {
        id: tempPaintId,
        name: code,
        category: 'RAL',
        series: currentSeries,
        color: hex || '#CCCCCC',
        description: '',
        manufacturer: 'RAL',
        article: code,
        isDefault: false,
        displayName: { uk: code, en: code, pl: code }
    };

    const validation = app.validatePaintAddition(tempPaint);
    if (!validation.valid) {
        utils.showNotification(validation.message, 'error');
        return;
    }

    const selectedIngredients = app.getSelectedIngredients();
    const existing = selectedIngredients.find(ing => ing.article === code);
    if (existing) {
        utils.showNotification(i18n.t('paint_already_added'), 'warning');
        return;
    }

    const defaultUnit = app.getDefaultUnitSymbol();
    selectedIngredients.push({
        paintId: tempPaintId,
        article: code,
        name: code,
        category: 'RAL',
        series: currentSeries,
        color: tempPaint.color,
        amount: 100,
        unit: defaultUnit,
        percentage: 0
    });
    app.setSelectedIngredients(selectedIngredients);

    if (window.SICOMIX?.app?.calculatePercentages) window.SICOMIX.app.calculatePercentages();
    if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    app.updateSeriesLockUI();
    app.autoSaveRecipeDraft();

    renderRalCatalog();
    
    utils.showNotification(i18n.t('paint_added_to_recipe'), 'success');
}

// ---------- PDF BUTTONS ----------
function setupPdfButtons() {
    const openRalPdf = document.getElementById('openRalPdf');
    if (openRalPdf) {
        openRalPdf.removeEventListener('click', openRalPdfHandler);
        openRalPdf.addEventListener('click', openRalPdfHandler);
    }

    const openPantonePdf = document.getElementById('openPantonePdf');
    if (openPantonePdf) {
        openPantonePdf.removeEventListener('click', openPantonePdfHandler);
        openPantonePdf.addEventListener('click', openPantonePdfHandler);
    }
}

function openRalPdfHandler(e) {
    e.preventDefault();
    const pdfPath = './files/Wzornik RAL.PDF';
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.open(pdfPath, '_blank');
            } else {
                utils.showNotification(i18n.t('pdf_not_found'), 'error');
            }
        })
        .catch(() => {
            utils.showNotification(i18n.t('pdf_not_found'), 'error');
        });
}

function openPantonePdfHandler(e) {
    e.preventDefault();
    const pdfPath = './files/60-vzornik-pantone.pdf';
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.open(pdfPath, '_blank');
            } else {
                utils.showNotification(i18n.t('pdf_not_found'), 'error');
            }
        })
        .catch(() => {
            utils.showNotification(i18n.t('pdf_not_found'), 'error');
        });
}

// Експорт функцій
export {
    renderPantoneCatalog,
    showPantoneRecipeModal,
    addPantoneToRecipe,
    renderRalCatalog,
    addRalToRecipe,
    attachPantoneEventListeners,
    attachRalEventListeners,
    setupPdfButtons
};

// Для зворотної сумісності додаємо до глобального SICOMIX.app
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.app = window.SICOMIX.app || {};
Object.assign(window.SICOMIX.app, {
    renderPantoneCatalog,
    showPantoneRecipeModal,
    addPantoneToRecipe,
    renderRalCatalog,
    addRalToRecipe,
    attachPantoneEventListeners,
    attachRalEventListeners,
    setupPdfButtons
});
