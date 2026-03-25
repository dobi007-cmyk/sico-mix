// ========== CATALOG MODULE ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';
import * as app from './app-core.js';

let isLoadingMore = false;

function attachCatalogEventListeners() {
    const dom = app.dom;
    if (!dom.paintCatalogEl) return;

    dom.paintCatalogEl.removeEventListener('click', catalogClickHandler);
    dom.paintCatalogEl.addEventListener('click', catalogClickHandler);
}

function globalLoadMoreHandler(e) {
    const btn = e.target.closest('#loadMoreCatalogBtn');
    if (!btn) return;
    e.preventDefault();
    if (isLoadingMore) return;
    isLoadingMore = true;
    const newPage = app.getCatalogPage() + 1;
    app.setCatalogPage(newPage);
    renderPaintCatalog(true).finally(() => {
        isLoadingMore = false;
    });
}

function catalogClickHandler(e) {
    const btn = e.target.closest('.toggle-series, .series-info-btn, .glass-add-btn, .glass-remove-btn');
    if (!btn) return;
    e.stopPropagation();

    if (btn.classList.contains('toggle-series')) {
        const card = btn.closest('.series-card');
        if (!card) return;
        const paintsDiv = card.querySelector('.series-paints');
        const icon = btn.querySelector('i');

        if (paintsDiv.style.display === 'none' || !paintsDiv.style.display) {
            paintsDiv.style.display = 'grid';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            try {
                const expandedSeries = JSON.parse(localStorage.getItem('expandedSeries') || '[]');
                if (!expandedSeries.includes(card.dataset.series)) {
                    expandedSeries.push(card.dataset.series);
                    localStorage.setItem('expandedSeries', JSON.stringify(expandedSeries));
                }
            } catch (e) {}
        } else {
            paintsDiv.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            try {
                const expandedSeries = JSON.parse(localStorage.getItem('expandedSeries') || '[]');
                const index = expandedSeries.indexOf(card.dataset.series);
                if (index > -1) {
                    expandedSeries.splice(index, 1);
                    localStorage.setItem('expandedSeries', JSON.stringify(expandedSeries));
                }
            } catch (e) {}
        }
    } else if (btn.classList.contains('series-info-btn')) {
        const card = btn.closest('.series-card');
        const seriesId = card.dataset.series;
        const series = (window.SICOMIX.data?.series || []).find(s => s.id === seriesId);
        if (series) {
            openSeriesDetailsModal(series);
        }
    } else if (btn.classList.contains('glass-add-btn') || btn.classList.contains('glass-remove-btn')) {
        const paintId = btn.dataset.paintId;
        const paint = app.getPaintCatalog().find(p => String(p.id) === paintId);
        if (!paint) return;

        if (btn.classList.contains('glass-add-btn')) {
            const validation = app.validatePaintAddition(paint);
            if (validation.valid) {
                addPaintToRecipeFromCatalog(paint);
                if (window.SICOMIX?.app?.updatePaintButton) window.SICOMIX.app.updatePaintButton(paintId, true);
            } else {
                utils.showNotification(validation.message, 'error');
            }
        } else if (btn.classList.contains('glass-remove-btn')) {
            if (window.SICOMIX?.app?.removeIngredientByPaintId) {
                window.SICOMIX.app.removeIngredientByPaintId(paintId);
                if (window.SICOMIX?.app?.updatePaintButton) window.SICOMIX.app.updatePaintButton(paintId, false);
            }
        }
    }
}

function renderPaintCatalog(append = false) {
    const dom = app.dom;
    if (!dom.paintCatalogEl) {
        console.warn('⚠️ paintCatalogEl не знайдено!');
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        try {
            const search = document.getElementById('catalogSearch')?.value?.toLowerCase() || '';
            const allSeries = app.getUniqueSeries();
            
            if (!allSeries || !Array.isArray(allSeries)) {
                console.error('❌ getUniqueSeries повернув не масив:', allSeries);
                dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                    <i class="fas fa-exclamation-triangle"></i> Помилка завантаження серій
                </p>`;
                resolve();
                return;
            }

            const lang = i18n.getLanguage();
            const paintCatalog = app.getPaintCatalog();
            
            if (!paintCatalog || !Array.isArray(paintCatalog)) {
                console.error('❌ getPaintCatalog повернув не масив:', paintCatalog);
                dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                    <i class="fas fa-exclamation-triangle"></i> Помилка завантаження фарб
                </p>`;
                resolve();
                return;
            }

            let seriesWithPaints = allSeries.filter(series => {
                if (!series || !series.id) return false;
                let seriesPaints = paintCatalog.filter(p => p && p.series === series.id);
                if (search) {
                    seriesPaints = seriesPaints.filter(p => {
                        if (!p) return false;
                        const paintName = p.displayName?.[lang] || p.name || '';
                        return paintName.toLowerCase().includes(search) ||
                               (p.article && p.article.toLowerCase().includes(search));
                    });
                }
                return seriesPaints.length > 0;
            });

            const catalogPage = app.getCatalogPage();
            const pageSize = app.getCATALOG_PAGE_SIZE();
            const startIndex = 0;
            const endIndex = catalogPage * pageSize;
            const paginatedSeries = seriesWithPaints.slice(startIndex, endIndex);
            const hasMore = seriesWithPaints.length > endIndex;

            const loadMoreBtn = document.getElementById('loadMoreCatalogBtn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
            }

            if (paginatedSeries.length === 0 && !append) {
                dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('catalog_empty')}</p>`;
                i18n.applyTranslations();
                resolve();
                return;
            }

            const currentSettings = app.getCurrentSettings();
            app.applyCatalogLayout(currentSettings.catalogLayout || 'classic');

            let html = '';
            let totalFoundPaints = 0;

            let expandedSeries = [];
            try {
                expandedSeries = JSON.parse(localStorage.getItem('expandedSeries') || '[]');
            } catch (e) {}

            paginatedSeries.forEach(series => {
                if (!series || !series.id) return;
                
                let seriesPaints = paintCatalog.filter(p => p && p.series === series.id);
                if (search) {
                    seriesPaints = seriesPaints.filter(p => {
                        if (!p) return false;
                        const paintName = p.displayName?.[lang] || p.name || '';
                        return paintName.toLowerCase().includes(search) ||
                               (p.article && p.article.toLowerCase().includes(search));
                    });
                }
                totalFoundPaints += seriesPaints.length;

                const seriesName = (series.name && series.name[lang]) || series.id || 'Невідома серія';
                const category = series.category || '';
                const isExpanded = search.length > 0 || expandedSeries.includes(series.id);

                const paintsHtml = seriesPaints.map(p => {
                    if (!p) return '';
                    
                    const paintCode = p.name || '';
                    const paintName = p.displayName?.[lang] || p.name || '';
                    const selectedIngredients = app.getSelectedIngredients() || [];
                    const isInRecipe = selectedIngredients.some(ing => ing && String(ing.paintId) === String(p.id));
                    const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
                    const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
                    const buttonTitle = isInRecipe ? i18n.t('remove_from_recipe') : i18n.t('add_ingredient');
                    
                    const color = p.color || '#cccccc';
                    
                    return `
                    <div class="paint-card-glass" data-paint-id="${p.id}" data-paint-series="${p.series || ''}" style="color: ${color};">
                        <div class="glass-swatch" style="background: ${utils.escapeHtml(color)};"></div>
                        <div class="glass-name" title="${utils.escapeHtml(paintCode)}">${utils.escapeHtml(paintCode)}</div>
                        <div class="glass-article" title="${utils.escapeHtml(paintName)}">${utils.escapeHtml(paintName)}</div>
                        <button class="${buttonClass}" data-paint-id="${p.id}" title="${buttonTitle}" aria-label="${buttonTitle}">
                            <i class="fas ${buttonIcon}"></i>
                        </button>
                    </div>
                `}).join('');

                html += `
                    <div class="series-card" data-series="${series.id}">
                        <div class="series-header">
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <div>
                                    <h3>
                                        ${utils.escapeHtml(seriesName)}
                                        <span class="series-count">(${seriesPaints.length})</span>
                                    </h3>
                                    <span class="recipe-category">${i18n.translateCategoryName(category)}</span>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn-icon series-info-btn" title="${i18n.t('properties')}" aria-label="${i18n.t('properties')}">
                                        <i class="fas fa-info-circle"></i>
                                    </button>
                                    <button class="btn-icon toggle-series" title="${i18n.t('expand')}" aria-label="${i18n.t('expand')}">
                                        <i class="fas fa-chevron-${isExpanded ? 'up' : 'down'}"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="series-paints" style="display: ${isExpanded ? 'grid' : 'none'};">
                            ${paintsHtml}
                        </div>
                    </div>
                `;
            });

            if (search && !append) {
                const statsHtml = `<div class="search-stats"><i class="fas fa-search"></i> ${i18n.t('paints_found')}: ${totalFoundPaints} у ${paginatedSeries.length} ${i18n.t('series')}</div>`;
                html = statsHtml + html;
            }

            if (append) {
                const existingSeriesIds = new Set(Array.from(document.querySelectorAll('.series-card')).map(card => card.dataset.series));
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const newSeries = Array.from(tempDiv.children).filter(el => {
                    if (el.classList.contains('series-card')) {
                        const seriesId = el.dataset.series;
                        return !existingSeriesIds.has(seriesId);
                    }
                    return true;
                });
                if (newSeries.length > 0) {
                    dom.paintCatalogEl.insertAdjacentHTML('beforeend', newSeries.map(el => el.outerHTML).join(''));
                }
            } else {
                dom.paintCatalogEl.innerHTML = html;
            }

            attachCatalogEventListeners();
            i18n.applyTranslations();
            resolve();

        } catch (error) {
            console.error('❌ Помилка в renderPaintCatalog:', error, error.stack);
            if (dom.paintCatalogEl) {
                dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                    <i class="fas fa-exclamation-triangle"></i> ${i18n.t('catalog_render_error')}<br>${utils.escapeHtml(error.message || '')}
                </p>`;
            }
            resolve();
        }
    });
}

function openSeriesDetailsModal(series) {
    const dom = app.dom;
    if (!dom.seriesDetailsModal || !dom.seriesDetailsTitle || !dom.seriesDetailsContent) return;
    const lang = i18n.getLanguage();
    dom.seriesDetailsTitle.textContent = series.name[lang] || series.id;
    
    let html = `<p><strong>${i18n.t('category')}:</strong> ${i18n.translateCategoryName(series.category)}</p>`;
    if (series.description && series.description[lang]) {
        html += `<p><strong>${i18n.t('series_description')}:</strong> ${series.description[lang]}</p>`;
    }
    if (series.properties && Object.keys(series.properties).length > 0) {
        html += `<h4 style="margin:15px 0 10px;">${i18n.t('properties')}</h4>`;
        html += `<div class="properties-grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px;">`;
        Object.entries(series.properties).forEach(([key, val]) => {
            const value = val[lang] || val.uk;
            if (value) {
                html += `<div class="property-item"><strong>${i18n.t(key)}:</strong> <span>${utils.escapeHtml(value)}</span></div>`;
            }
        });
        html += `</div>`;
    }
    dom.seriesDetailsContent.innerHTML = html;
    dom.seriesDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function addPaintToRecipeFromCatalog(paint) {
    const validation = app.validatePaintAddition(paint);
    if (!validation.valid) {
        utils.showNotification(validation.message, 'error');
        return;
    }

    const selectedIngredients = app.getSelectedIngredients();
    const existing = selectedIngredients.find(ing => String(ing.paintId) === String(paint.id));
    if (existing) {
        utils.showNotification(i18n.t('paint_already_added'), 'warning');
        return;
    }

    const defaultUnit = app.getDefaultUnitSymbol();
    selectedIngredients.push({
        paintId: paint.id,
        article: paint.article,
        name: paint.name,
        category: paint.category,
        series: paint.series,
        color: paint.color,
        amount: 100,
        unit: defaultUnit,
        percentage: 0
    });
    app.setSelectedIngredients(selectedIngredients);

    if (window.SICOMIX?.app?.calculatePercentages) window.SICOMIX.app.calculatePercentages();
    if (window.SICOMIX?.app?.renderIngredientsList) window.SICOMIX.app.renderIngredientsList();
    app.updateSeriesLockUI();
    app.autoSaveRecipeDraft();

    if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
    if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();

    utils.showNotification(i18n.t('paint_added_to_recipe'), 'success');
}

function showPaintDetails(paint) {
    const modal = document.getElementById('paintSelectionModal');
    const list = document.getElementById('paintSelectionList');
    const lang = i18n.getLanguage();
    const paintCode = paint.name;
    const paintName = paint.displayName?.[lang] || paint.name;
    
    const modalTitle = modal.querySelector('.modal-title');
    if (modalTitle) modalTitle.textContent = paintCode;
    
    list.innerHTML = `
        <div style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: ${utils.escapeHtml(paint.color)}; border-radius: 12px; border: 2px solid rgba(255,255,255,0.2);"></div>
                <div>
                    <h2 style="font-size: 24px; margin-bottom: 5px;">${utils.escapeHtml(paintCode)}</h2>
                    <p style="color: var(--text-secondary);">${utils.escapeHtml(paintName)}</p>
                </div>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><th style="text-align: left; padding: 8px;">${i18n.t('category')}</th>  <td>${i18n.translateCategoryName(paint.category)}</td> </tr>
                <tr><th style="text-align: left; padding: 8px;">${i18n.t('series')}</th>  <td>${utils.escapeHtml(paint.series)}</td> </tr>
                <tr><th style="text-align: left; padding: 8px;">${i18n.t('manufacturer')}</th>  <td>${utils.escapeHtml(paint.manufacturer || 'SICO')}</td> </tr>
                <tr><th style="text-align: left; padding: 8px;">${i18n.t('color_code')}</th>  <td>${utils.escapeHtml(paint.color)}</td> </tr>
                <tr><th style="text-align: left; padding: 8px;">${i18n.t('article')}</th>  <td>${utils.escapeHtml(paint.article || '-')}</td> </tr>
             </table>
            <p style="margin-top: 20px;">${utils.escapeHtml(paint.description || '')}</p>
        </div>
    `;
    
    modal.classList.add('active');
    
    const closeBtn = modal.querySelector('.close-paint-selection');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'), { once: true });
    }
}

// Функція оновлення кнопки додавання/видалення в каталозі
function updatePaintButton(paintId, isInRecipe) {
    const card = document.querySelector(`.paint-card-glass[data-paint-id="${paintId}"]`);
    if (!card) return;
    const btn = card.querySelector('.glass-add-btn, .glass-remove-btn');
    if (btn) {
        if (isInRecipe) {
            btn.classList.remove('glass-add-btn');
            btn.classList.add('glass-remove-btn');
            btn.innerHTML = '<i class="fas fa-trash"></i>';
            btn.title = i18n.t('remove_from_recipe');
            btn.setAttribute('aria-label', i18n.t('remove_from_recipe'));
        } else {
            btn.classList.remove('glass-remove-btn');
            btn.classList.add('glass-add-btn');
            btn.innerHTML = '<i class="fas fa-plus"></i>';
            btn.title = i18n.t('add_ingredient');
            btn.setAttribute('aria-label', i18n.t('add_ingredient'));
        }
    }
}

export {
    renderPaintCatalog,
    openSeriesDetailsModal,
    addPaintToRecipeFromCatalog,
    showPaintDetails,
    attachCatalogEventListeners,
    updatePaintButton
};

// Глобальний обробник для кнопки "Завантажити ще"
document.addEventListener('click', globalLoadMoreHandler);

window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.app = window.SICOMIX.app || {};
Object.assign(window.SICOMIX.app, {
    renderPaintCatalog,
    openSeriesDetailsModal,
    addPaintToRecipeFromCatalog,
    showPaintDetails,
    attachCatalogEventListeners,
    updatePaintButton
});
