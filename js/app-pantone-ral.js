// ========== PANTONE & RAL MODULE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const app = SICOMIX.app;
    const dom = app.dom;

    function attachPantoneEventListeners() {
        if (dom.pantoneCatalog) {
            dom.pantoneCatalog.addEventListener('click', function(e) {
                const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
                if (!btn) return;
                e.stopPropagation();

                if (btn.classList.contains('glass-remove-btn')) {
                    const pantoneNumber = btn.dataset.pantoneNumber;
                    if (pantoneNumber && SICOMIX.app.removeIngredientByArticle) {
                        SICOMIX.app.removeIngredientByArticle(pantoneNumber);
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

    function attachRalEventListeners() {
        if (dom.ralCatalog) {
            dom.ralCatalog.addEventListener('click', function(e) {
                const btn = e.target.closest('.glass-add-btn, .glass-remove-btn');
                if (!btn) return;
                e.stopPropagation();

                if (btn.classList.contains('glass-remove-btn')) {
                    const code = btn.dataset.ralCode;
                    if (code && SICOMIX.app.removeIngredientByArticle) {
                        SICOMIX.app.removeIngredientByArticle(code);
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

    function renderPantoneCatalog() {
        if (!dom.pantoneCatalog) {
            console.warn('pantoneCatalog element not found');
            return;
        }

        if (!SICOMIX.pantone || !SICOMIX.pantone.colors) {
            dom.pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_pantone')}</p>`;
            SICOMIX.i18n.applyTranslations();
            return;
        }

        const search = dom.pantoneSearch?.value.toLowerCase() || '';
        const category = dom.pantoneCategoryFilter?.value || 'all';

        let filtered = SICOMIX.pantone.colors;

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
            dom.pantoneCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_pantone')}</p>`;
            SICOMIX.i18n.applyTranslations();
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
            const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
            
            return `
            <div class="paint-card-glass pantone-card" style="color: #000;">
                <div class="glass-swatch" style="background: ${hex};"></div>
                <div class="glass-name">${SICOMIX.utils.escapeHtml(p.number)}</div>
                <div class="glass-article">${SICOMIX.utils.escapeHtml(p.name || '')}</div>
                <div style="font-size: 11px; margin-top: 5px; color: var(--text-tertiary);">${firstIngredient} ${firstAmount}</div>
                <button class="${buttonClass}" data-pantone-number="${p.number}" title="${buttonTitle}" aria-label="${buttonTitle}">
                    <i class="fas ${buttonIcon}"></i>
                </button>
            </div>
        `}).join('');

        dom.pantoneCatalog.innerHTML = html;
        SICOMIX.i18n.applyTranslations();
        attachPantoneEventListeners();
    }

    function showPantoneRecipeModal(pantoneNumber) {
        if (!SICOMIX.pantone) return;
        
        const modal = document.getElementById('pantoneRecipeModal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalContent = document.getElementById('pantoneRecipeContent');
        const addBtn = document.getElementById('addPantoneFromRecipeBtn');
        
        if (!modal || !modalContent) return;
        
        const html = SICOMIX.pantone.getRecipeHTML(pantoneNumber);
        
        if (modalTitle) {
            modalTitle.textContent = `${SICOMIX.i18n.t('pantone_recipe')}: ${pantoneNumber}`;
        }
        modalContent.innerHTML = html;
        
        if (addBtn) {
            addBtn.dataset.pantoneNumber = pantoneNumber;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function addPantoneToRecipe(pantoneNumber) {
        const pantone = SICOMIX.pantone.findByNumber(pantoneNumber);
        if (!pantone) return;

        const seriesSelect = document.getElementById('recipeSeries');
        const lockedSeries = app.getLockedSeries();
        const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
        
        if (!currentSeries) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
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
            SICOMIX.utils.showNotification(validation.message, 'error');
            return;
        }

        const selectedIngredients = app.getSelectedIngredients();
        const existing = selectedIngredients.find(ing => ing.article === pantone.number);
        if (existing) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
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

        if (SICOMIX.app.calculatePercentages) SICOMIX.app.calculatePercentages();
        if (SICOMIX.app.renderIngredientsList) SICOMIX.app.renderIngredientsList();
        app.updateSeriesLockUI();
        app.autoSaveRecipeDraft();

        renderPantoneCatalog();
        
        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
    }

    function renderRalCatalog() {
        if (!dom.ralCatalog) {
            console.warn('ralCatalog element not found');
            return;
        }

        if (!window.ralColors || !Array.isArray(window.ralColors)) {
            dom.ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_ral')}</p>`;
            SICOMIX.i18n.applyTranslations();
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
            dom.ralCatalog.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_ral')}</p>`;
            SICOMIX.i18n.applyTranslations();
            return;
        }

        const html = filtered.map(c => {
            const isInRecipe = selectedIngredients.some(ing => ing.article === c.code);
            const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
            const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
            const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
            
            return `
            <div class="paint-card-glass ral-card" style="color: #000;">
                <div class="glass-swatch" style="background: ${c.hex};"></div>
                <div class="glass-name">${SICOMIX.utils.escapeHtml(c.code)}</div>
                <div class="glass-article">${SICOMIX.utils.escapeHtml(c.name)}</div>
                <button class="${buttonClass}" data-ral-code="${c.code}" data-ral-hex="${c.hex}" title="${buttonTitle}" aria-label="${buttonTitle}">
                    <i class="fas ${buttonIcon}"></i>
                </button>
            </div>
        `}).join('');

        dom.ralCatalog.innerHTML = html;
        SICOMIX.i18n.applyTranslations();
        attachRalEventListeners();
    }

    function addRalToRecipe(code, hex) {
        const seriesSelect = document.getElementById('recipeSeries');
        const lockedSeries = app.getLockedSeries();
        const currentSeries = lockedSeries || (seriesSelect ? seriesSelect.value : null);
        
        if (!currentSeries) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
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
            SICOMIX.utils.showNotification(validation.message, 'error');
            return;
        }

        const selectedIngredients = app.getSelectedIngredients();
        const existing = selectedIngredients.find(ing => ing.article === code);
        if (existing) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
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

        if (SICOMIX.app.calculatePercentages) SICOMIX.app.calculatePercentages();
        if (SICOMIX.app.renderIngredientsList) SICOMIX.app.renderIngredientsList();
        app.updateSeriesLockUI();
        app.autoSaveRecipeDraft();

        renderRalCatalog();
        
        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
    }

    function setupPdfButtons() {
        const openRalPdf = document.getElementById('openRalPdf');
        if (openRalPdf) {
            openRalPdf.addEventListener('click', () => {
                window.open('./files/Wzornik RAL.PDF', '_blank');
            });
        }

        const openPantonePdf = document.getElementById('openPantonePdf');
        if (openPantonePdf) {
            openPantonePdf.addEventListener('click', () => {
                window.open('./files/60-vzornik-pantone.pdf', '_blank');
            });
        }
    }

    // ---------- ЕКСПОРТ МЕТОДІВ ----------
    Object.assign(SICOMIX.app, {
        renderPantoneCatalog,
        showPantoneRecipeModal,
        addPantoneToRecipe,
        renderRalCatalog,
        addRalToRecipe,
        attachPantoneEventListeners,
        attachRalEventListeners,
        setupPdfButtons
    });

})(window);
