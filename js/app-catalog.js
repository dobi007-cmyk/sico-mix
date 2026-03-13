// ========== CATALOG MODULE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const app = SICOMIX.app;
    const dom = app.dom;

    function attachCatalogEventListeners() {
        console.log('📚 attachCatalogEventListeners викликано');
        if (!dom.paintCatalogEl) return;

        // Видаляємо попередні обробники, щоб уникнути дублювання
        dom.paintCatalogEl.removeEventListener('click', catalogClickHandler);
        dom.paintCatalogEl.addEventListener('click', catalogClickHandler);

        // Обробники для заголовків серій (клік для розгортання)
        dom.paintCatalogEl.querySelectorAll('.series-header').forEach(header => {
            header.removeEventListener('click', headerClickHandler);
            header.addEventListener('click', headerClickHandler);
        });
    }

    function catalogClickHandler(e) {
        const btn = e.target.closest('.glass-add-btn, .glass-remove-btn, .delete-paint, .series-info-btn, .toggle-series');
        if (!btn) return;
        e.stopPropagation();

        if (btn.classList.contains('glass-add-btn') || btn.classList.contains('glass-remove-btn')) {
            const paintId = btn.dataset.paintId;
            const paint = app.getPaintCatalog().find(p => String(p.id) === paintId);
            if (!paint) return;

            if (btn.classList.contains('glass-add-btn')) {
                const validation = app.validatePaintAddition(paint);
                if (validation.valid) {
                    addPaintToRecipeFromCatalog(paint);
                    if (SICOMIX.app.updatePaintButton) SICOMIX.app.updatePaintButton(paintId, true);
                } else {
                    SICOMIX.utils.showNotification(validation.message, 'error');
                }
            } else if (btn.classList.contains('glass-remove-btn')) {
                if (SICOMIX.app.removeIngredientByPaintId) {
                    SICOMIX.app.removeIngredientByPaintId(paintId);
                    if (SICOMIX.app.updatePaintButton) SICOMIX.app.updatePaintButton(paintId, false);
                }
            }
        } else if (btn.classList.contains('delete-paint')) {
            const paintId = btn.dataset.paintId;
            if (paintId) deletePaint(paintId);
        } else if (btn.classList.contains('series-info-btn')) {
            const card = btn.closest('.series-card');
            const seriesId = card.dataset.series;
            const series = SICOMIX.data.series.find(s => s.id === seriesId);
            if (series) {
                openSeriesDetailsModal(series);
            }
        } else if (btn.classList.contains('toggle-series')) {
            const card = btn.closest('.series-card');
            const paintsDiv = card.querySelector('.series-paints');
            const icon = btn.querySelector('i');

            if (paintsDiv.style.display === 'none' || !paintsDiv.style.display) {
                paintsDiv.style.display = 'grid';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                // Зберігаємо стан у localStorage
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
                // Видаляємо з localStorage
                try {
                    const expandedSeries = JSON.parse(localStorage.getItem('expandedSeries') || '[]');
                    const index = expandedSeries.indexOf(card.dataset.series);
                    if (index > -1) {
                        expandedSeries.splice(index, 1);
                        localStorage.setItem('expandedSeries', JSON.stringify(expandedSeries));
                    }
                } catch (e) {}
            }
        }
    }

    function headerClickHandler(e) {
        if (!e.target.closest('.toggle-series') && !e.target.closest('.series-info-btn') && !e.target.closest('button')) {
            const btn = this.querySelector('.toggle-series');
            if (btn) btn.click();
        }
    }

    function renderPaintCatalog(append = false) {
        if (!dom.paintCatalogEl) {
            console.warn('⚠️ paintCatalogEl не знайдено!');
            return;
        }

        try {
            const search = document.getElementById('catalogSearch')?.value?.toLowerCase() || '';
            const allSeries = app.getUniqueSeries();
            const lang = SICOMIX.i18n.getLanguage();
            const paintCatalog = app.getPaintCatalog();

            let seriesWithPaints = allSeries.filter(series => {
                let seriesPaints = paintCatalog.filter(p => p.series === series.id);
                if (search) {
                    seriesPaints = seriesPaints.filter(p => {
                        const paintName = p.displayName?.[lang] || p.name;
                        return paintName.toLowerCase().includes(search) ||
                               (p.article && p.article.toLowerCase().includes(search));
                    });
                }
                return seriesPaints.length > 0;
            });

            const startIndex = 0;
            const endIndex = app.getCatalogPage() * app.getCATALOG_PAGE_SIZE();
            const paginatedSeries = seriesWithPaints.slice(startIndex, endIndex);
            const hasMore = seriesWithPaints.length > endIndex;

            if (dom.loadMoreCatalogBtn) {
                dom.loadMoreCatalogBtn.style.display = hasMore ? 'inline-block' : 'none';
            }

            if (paginatedSeries.length === 0 && !append) {
                dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
                SICOMIX.i18n.applyTranslations();
                return;
            }

            const currentSettings = app.getCurrentSettings();
            app.applyCatalogLayout(currentSettings.catalogLayout || 'classic');

            let html = '';
            let totalFoundPaints = 0;

            // Отримуємо збережений стан розгорнутих серій
            let expandedSeries = [];
            try {
                expandedSeries = JSON.parse(localStorage.getItem('expandedSeries') || '[]');
            } catch (e) {}

            paginatedSeries.forEach(series => {
                let seriesPaints = paintCatalog.filter(p => p.series === series.id);
                if (search) {
                    seriesPaints = seriesPaints.filter(p => {
                        const paintName = p.displayName?.[lang] || p.name;
                        return paintName.toLowerCase().includes(search) ||
                               (p.article && p.article.toLowerCase().includes(search));
                    });
                }
                totalFoundPaints += seriesPaints.length;

                const seriesName = series.name[lang] || series.id;
                const category = series.category || '';
                const isExpanded = expandedSeries.includes(series.id) || search.length > 0;

                const paintsHtml = seriesPaints.map(p => {
                    const paintCode = p.name;
                    const paintName = p.displayName?.[lang] || p.name;
                    const selectedIngredients = app.getSelectedIngredients();
                    const isInRecipe = selectedIngredients.some(ing => String(ing.paintId) === String(p.id));
                    const buttonClass = isInRecipe ? 'glass-remove-btn' : 'glass-add-btn';
                    const buttonIcon = isInRecipe ? 'fa-trash' : 'fa-plus';
                    const buttonTitle = isInRecipe ? SICOMIX.i18n.t('remove_from_recipe') : SICOMIX.i18n.t('add_ingredient');
                    
                    return `
                    <div class="paint-card-glass" data-paint-id="${p.id}" data-paint-series="${p.series}" style="color: ${p.color};">
                        <div class="glass-swatch" style="background: ${SICOMIX.utils.escapeHtml(p.color)};"></div>
                        <div class="glass-name">${SICOMIX.utils.escapeHtml(paintCode)}</div>
                        <div class="glass-article">${SICOMIX.utils.escapeHtml(paintName)}</div>
                        <button class="${buttonClass}" data-paint-id="${p.id}" title="${buttonTitle}" aria-label="${buttonTitle}">
                            <i class="fas ${buttonIcon}"></i>
                        </button>
                        ${!p.isDefault ? `
                            <button class="delete-paint" data-paint-id="${p.id}" title="${SICOMIX.i18n.t('delete')}" aria-label="${SICOMIX.i18n.t('delete')}">
                                <i class="fas fa-trash"></i>
                            </button>` : ''}
                    </div>
                `}).join('');

                html += `
                    <div class="series-card" data-series="${series.id}">
                        <div class="series-header">
                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                <div>
                                    <h3>
                                        ${SICOMIX.utils.escapeHtml(seriesName)}
                                        <span class="series-count">(${seriesPaints.length})</span>
                                    </h3>
                                    <span class="recipe-category">${SICOMIX.i18n.translateCategoryName(category)}</span>
                                </div>
                                <div style="display: flex; gap: 8px;">
                                    <button class="btn-icon series-info-btn" title="${SICOMIX.i18n.t('properties')}" aria-label="${SICOMIX.i18n.t('properties')}">
                                        <i class="fas fa-info-circle"></i>
                                    </button>
                                    <button class="btn-icon toggle-series" title="${SICOMIX.i18n.t('expand')}" aria-label="${SICOMIX.i18n.t('expand')}">
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
                const statsHtml = `<div class="search-stats"><i class="fas fa-search"></i> ${SICOMIX.i18n.t('paints_found')}: ${totalFoundPaints} у ${paginatedSeries.length} ${SICOMIX.i18n.t('series')}</div>`;
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

            if (search) {
                document.querySelectorAll('.series-card').forEach(card => {
                    const paintsDiv = card.querySelector('.series-paints');
                    const icon = card.querySelector('.toggle-series i');
                    if (paintsDiv) {
                        paintsDiv.style.display = 'grid';
                        if (icon) {
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        }
                    }
                });
            }

            // Навішуємо обробники подій
            attachCatalogEventListeners();

            SICOMIX.i18n.applyTranslations();

        } catch (error) {
            console.error('❌ Помилка в renderPaintCatalog:', error);
            dom.paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color:#e63946;">
                <i class="fas fa-exclamation-triangle"></i> ${SICOMIX.i18n.t('catalog_render_error')}<br>${SICOMIX.utils.escapeHtml(error.message)}
            </p>`;
        }
    }

    function applyCatalogLayout(layout) {
        if (dom.paintCatalogEl) {
            dom.paintCatalogEl.classList.remove('catalog-layout-classic', 'catalog-layout-compact', 'catalog-layout-list');
            dom.paintCatalogEl.classList.add(`catalog-layout-${layout}`);
        }
    }

    function openSeriesDetailsModal(series) {
        if (!dom.seriesDetailsModal || !dom.seriesDetailsTitle || !dom.seriesDetailsContent) return;
        const lang = SICOMIX.i18n.getLanguage();
        dom.seriesDetailsTitle.textContent = series.name[lang] || series.id;
        
        let html = `<p><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategoryName(series.category)}</p>`;
        if (series.description && series.description[lang]) {
            html += `<p><strong>${SICOMIX.i18n.t('series_description')}:</strong> ${series.description[lang]}</p>`;
        }
        if (series.properties && Object.keys(series.properties).length > 0) {
            html += `<h4 style="margin:15px 0 10px;">${SICOMIX.i18n.t('properties')}</h4>`;
            html += `<div class="properties-grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px;">`;
            Object.entries(series.properties).forEach(([key, val]) => {
                const value = val[lang] || val.uk;
                if (value) {
                    html += `<div class="property-item"><strong>${SICOMIX.i18n.t(key)}:</strong> <span>${SICOMIX.utils.escapeHtml(value)}</span></div>`;
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
            SICOMIX.utils.showNotification(validation.message, 'error');
            return;
        }

        const selectedIngredients = app.getSelectedIngredients();
        const existing = selectedIngredients.find(ing => String(ing.paintId) === String(paint.id));
        if (existing) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
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

        if (SICOMIX.app.calculatePercentages) SICOMIX.app.calculatePercentages();
        if (SICOMIX.app.renderIngredientsList) SICOMIX.app.renderIngredientsList();
        app.updateSeriesLockUI();
        app.autoSaveRecipeDraft();

        if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
        if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();

        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
    }

    function showPaintDetails(paint) {
        const modal = document.getElementById('paintSelectionModal');
        const list = document.getElementById('paintSelectionList');
        const lang = SICOMIX.i18n.getLanguage();
        const paintCode = paint.name;
        const paintName = paint.displayName?.[lang] || paint.name;
        
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) modalTitle.textContent = paintCode;
        
        list.innerHTML = `
            <div style="padding: 20px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div style="width: 80px; height: 80px; background: ${SICOMIX.utils.escapeHtml(paint.color)}; border-radius: 12px; border: 2px solid rgba(255,255,255,0.2);"></div>
                    <div>
                        <h2 style="font-size: 24px; margin-bottom: 5px;">${SICOMIX.utils.escapeHtml(paintCode)}</h2>
                        <p style="color: var(--text-secondary);">${SICOMIX.utils.escapeHtml(paintName)}</p>
                    </div>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('category')}</th><td>${SICOMIX.i18n.translateCategoryName(paint.category)}</td></tr>
                    <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('series')}</th><td>${SICOMIX.utils.escapeHtml(paint.series)}</td></tr>
                    <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('manufacturer')}</th><td>${SICOMIX.utils.escapeHtml(paint.manufacturer || 'SICO')}</td></tr>
                    <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('color_code')}</th><td>${SICOMIX.utils.escapeHtml(paint.color)}</td></tr>
                    <tr><th style="text-align: left; padding: 8px;">${SICOMIX.i18n.t('article')}</th><td>${SICOMIX.utils.escapeHtml(paint.article || '-')}</td></tr>
                </table>
                <p style="margin-top: 20px;">${SICOMIX.utils.escapeHtml(paint.description || '')}</p>
            </div>
        `;
        
        modal.classList.add('active');
        
        const closeBtn = modal.querySelector('.close-paint-selection');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('active'), { once: true });
        }
    }

    function addNewPaint() {
        document.getElementById('paintName').value = '';
        app.populateStandardCategorySelect(document.getElementById('paintCategory'));
        document.getElementById('paintColorCode').value = '#3a86ff';
        document.getElementById('paintDescription').value = '';
        document.getElementById('paintManufacturer').value = 'SICO';
        document.getElementById('paintArticle').value = '';
        dom.addPaintModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function saveNewPaint() {
        const name = document.getElementById('paintName').value.trim();
        const cat = document.getElementById('paintCategory').value;
        const color = document.getElementById('paintColorCode').value || '#3a86ff';
        const desc = document.getElementById('paintDescription').value.trim();
        const mfr = document.getElementById('paintManufacturer').value.trim() || 'SICO';
        const art = document.getElementById('paintArticle').value.trim();

        if (!name || !cat) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
            return;
        }

        const newPaint = {
            id: SICOMIX.utils.generateId(),
            name,
            category: cat,
            color,
            description: desc,
            manufacturer: mfr,
            article: art,
            isDefault: false,
            displayName: { uk: name, en: name, pl: name }
        };
        const userPaints = app.getUserPaints();
        userPaints.push(newPaint);
        app.setUserPaints(userPaints);
        const paintCatalog = [...app.getPaintCatalog().filter(p => p.isDefault), ...userPaints];
        app.setPaintCatalog(paintCatalog);
        app.invalidateSeriesCache();
        app.saveData();
        dom.addPaintModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        app.populateCategoryFilters();
        renderPaintCatalog();
        SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('paint_added')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
    }

    function deletePaint(id) {
        const paintCatalog = app.getPaintCatalog();
        const paint = paintCatalog.find(p => String(p.id) === String(id));
        if (!paint) return;
        
        if (paint.isDefault) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('cannot_delete_default_paint'), 'warning');
            return;
        }

        const recipes = app.getRecipes();
        const usedInRecipes = recipes.filter(r => 
            r.ingredients.some(ing => String(ing.paintId) === String(id))
        );
        const count = usedInRecipes.length;

        if (count > 0) {
            SICOMIX.utils.showConfirmation(
                SICOMIX.i18n.t('paint_in_use_title'),
                SICOMIX.i18n.t('paint_in_use_message', { count }),
                () => {
                    usedInRecipes.forEach(r => {
                        r.ingredients = r.ingredients.filter(ing => String(ing.paintId) !== String(id));
                    });
                    const userPaints = app.getUserPaints();
                    const newUserPaints = userPaints.filter(p => String(p.id) !== String(id));
                    app.setUserPaints(newUserPaints);
                    app.setPaintCatalog([...app.getPaintCatalog().filter(p => p.isDefault), ...newUserPaints]);
                    app.invalidateSeriesCache();
                    app.saveData();
                    renderPaintCatalog();
                    if (SICOMIX.app.renderRecipes) SICOMIX.app.renderRecipes();
                    if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
                    if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
                }
            );
        } else {
            const userPaints = app.getUserPaints();
            const newUserPaints = userPaints.filter(p => String(p.id) !== String(id));
            app.setUserPaints(newUserPaints);
            app.setPaintCatalog([...app.getPaintCatalog().filter(p => p.isDefault), ...newUserPaints]);
            app.invalidateSeriesCache();
            app.saveData();
            renderPaintCatalog();
            if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
            if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
        }
    }

    function updatePaintButton(paintId, isInRecipe) {
        const card = document.querySelector(`.paint-card-glass[data-paint-id="${paintId}"]`);
        if (!card) return;
        const btn = card.querySelector('.glass-add-btn, .glass-remove-btn');
        if (btn) {
            if (isInRecipe) {
                btn.classList.remove('glass-add-btn');
                btn.classList.add('glass-remove-btn');
                btn.innerHTML = '<i class="fas fa-trash"></i>';
                btn.title = SICOMIX.i18n.t('remove_from_recipe');
                btn.setAttribute('aria-label', SICOMIX.i18n.t('remove_from_recipe'));
            } else {
                btn.classList.remove('glass-remove-btn');
                btn.classList.add('glass-add-btn');
                btn.innerHTML = '<i class="fas fa-plus"></i>';
                btn.title = SICOMIX.i18n.t('add_ingredient');
                btn.setAttribute('aria-label', SICOMIX.i18n.t('add_ingredient'));
            }
        }
    }

    Object.assign(SICOMIX.app, {
        renderPaintCatalog,
        openSeriesDetailsModal,
        addPaintToRecipeFromCatalog,
        showPaintDetails,
        addNewPaint,
        saveNewPaint,
        deletePaint,
        attachCatalogEventListeners,
        applyCatalogLayout
    });

    console.log('📦 app-catalog.js завантажено');

})(window);
