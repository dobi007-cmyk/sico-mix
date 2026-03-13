// ========== RECIPE MODULE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;
    const app = SICOMIX.app;
    const dom = app.dom;

    function renderIngredientsList() {
        if (!dom.ingredientsList) return;
        const selectedIngredients = app.getSelectedIngredients();
        const paintCatalog = app.getPaintCatalog();

        if (selectedIngredients.length === 0) {
            dom.ingredientsList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px;">
                <i class="fas fa-palette" style="font-size:32px; opacity:0.5;"></i><br>
                <span>${SICOMIX.i18n.t('paints_not_found')}</span>
            </td></tr>`;
            SICOMIX.i18n.applyTranslations();
            return;
        }

        let html = '';
        selectedIngredients.forEach((ing, idx) => {
            const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing;
            const paintCode = paint.name || '';
            const paintLocalizedName = paint.displayName?.[SICOMIX.i18n.getLanguage()] || '';
            html += `<tr>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:24px; height:24px; background:${SICOMIX.utils.escapeHtml(paint.color)}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                        <div>
                            <div style="font-weight:600;">${SICOMIX.utils.escapeHtml(paintCode)}</div>
                            <div style="font-size:12px; color:var(--text-secondary);">
                                ${paintLocalizedName ? SICOMIX.utils.escapeHtml(paintLocalizedName) + ' • ' : ''}
                                ${SICOMIX.i18n.translateCategoryName(paint.category)} 
                                <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:12px; margin-left:6px;">${SICOMIX.utils.escapeHtml(paint.series)}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td><input type="number" class="input-small" value="${ing.amount}" data-index="${idx}" data-field="amount" min="0.01" step="0.01"></td>
                <td>
                    <select class="unit-select" data-index="${idx}" data-field="unit">
                        <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('г')}</option>
                        <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('кг')}</option>
                        <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('мл')}</option>
                        <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>${SICOMIX.i18n.localizeUnitSymbol('л')}</option>
                    </select>
                </td>
                <td><input type="number" class="input-small" value="${ing.percentage || 0}" readonly> %</td>
                <td><button class="btn-icon delete-ingredient" data-index="${idx}"><i class="fas fa-trash"></i></button></td>
            </tr>`;
        });
        dom.ingredientsList.innerHTML = html;
        SICOMIX.i18n.applyTranslations();

        dom.ingredientsList.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('change', function(e) {
                handleIngredientChange(e);
                calculatePercentages();
                app.debouncedAutoSave();
            });
        });
        dom.ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteIngredient(parseInt(this.dataset.index));
                calculatePercentages();
                app.debouncedAutoSave();
            });
        });
    }

    function handleIngredientChange(e) {
        const idx = parseInt(e.target.dataset.index);
        const field = e.target.dataset.field;
        const selectedIngredients = app.getSelectedIngredients();
        if (idx >= 0 && idx < selectedIngredients.length) {
            selectedIngredients[idx][field] = field === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value;
            app.setSelectedIngredients(selectedIngredients);
        }
    }

    function addIngredient() {
        const seriesSelect = document.getElementById('recipeSeries');
        if (!seriesSelect || !seriesSelect.value) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
            return;
        }
        const lockedSeries = app.getLockedSeries();
        let targetSeries = lockedSeries || seriesSelect.value;
        if (lockedSeries && targetSeries !== lockedSeries) {
            targetSeries = lockedSeries;
        }

        const term = dom.paintSearch?.value.toLowerCase() || '';
        const cat = dom.categoryFilter?.value || '';
        const paintCatalog = app.getPaintCatalog();
        
        let filtered = paintCatalog.filter(p => p.series === targetSeries);
        
        if (term) filtered = filtered.filter(p => p && p.name && p.name.toLowerCase().includes(term));
        if (cat) filtered = filtered.filter(p => p && p.category === cat);
        
        if (filtered.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paints_not_found_in_series'), 'error');
            return;
        }
        showPaintSelectionModal(filtered);
    }

    function showPaintSelectionModal(paints) {
        const modal = document.getElementById('paintSelectionModal');
        const list = document.getElementById('paintSelectionList');
        list.innerHTML = paints.map(p => {
            const paintCode = p.name;
            const paintName = p.displayName?.[SICOMIX.i18n.getLanguage()] || p.name;
            return `
            <div class="paint-selection-card" data-id="${p.id}">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:32px; height:32px; background:${SICOMIX.utils.escapeHtml(p.color)}; border-radius:8px;"></div>
                    <div>
                        <strong>${SICOMIX.utils.escapeHtml(paintCode)}</strong>
                        <br><span style="font-size:12px;">${SICOMIX.utils.escapeHtml(paintName)} • ${SICOMIX.i18n.translateCategoryName(p.category)} (${SICOMIX.utils.escapeHtml(p.series)})</span>
                    </div>
                </div>
            </div>
        `}).join('');
        modal.classList.add('active');

        const clickHandler = (e) => {
            const card = e.target.closest('.paint-selection-card');
            if (!card) return;
            const pid = card.dataset.id;
            const paint = paints.find(p => String(p.id) === pid);
            if (!paint) return;
            
            const validation = app.validatePaintAddition(paint);
            if (!validation.valid) {
                SICOMIX.utils.showNotification(validation.message, 'error');
                modal.classList.remove('active');
                list.removeEventListener('click', clickHandler);
                closeBtn?.removeEventListener('click', closeHandler);
                return;
            }
            
            const selectedIngredients = app.getSelectedIngredients();
            if (selectedIngredients.some(ing => String(ing.paintId) === pid)) {
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
            } else {
                const defaultUnit = app.getDefaultUnitSymbol();
                selectedIngredients.push({ paintId: pid, amount: 100, unit: defaultUnit, percentage: 0 });
                app.setSelectedIngredients(selectedIngredients);
                calculatePercentages();
                renderIngredientsList();
                app.updateSeriesLockUI();
                app.autoSaveRecipeDraft();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
                
                if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
                if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
            }
            modal.classList.remove('active');
            list.removeEventListener('click', clickHandler);
            closeBtn?.removeEventListener('click', closeHandler);
        };
        const closeHandler = () => {
            modal.classList.remove('active');
            list.removeEventListener('click', clickHandler);
            closeBtn?.removeEventListener('click', closeHandler);
        };
        list.addEventListener('click', clickHandler);
        const closeBtn = modal.querySelector('.close-paint-selection');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeHandler, { once: true });
        }
    }

    function deleteIngredient(index) {
        const selectedIngredients = app.getSelectedIngredients();
        if (index >= 0) {
            const removed = selectedIngredients[index];
            selectedIngredients.splice(index, 1);
            app.setSelectedIngredients(selectedIngredients);
            if (selectedIngredients.length === 0) {
                app.setLockedSeries(null);
                app.setLockedCategory(null);
            }
            renderIngredientsList();
            app.updateSeriesLockUI();
            app.autoSaveRecipeDraft();
            
            if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
            if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
            
            const paintCatalog = app.getPaintCatalog();
            if (removed && paintCatalog.some(p => String(p.id) === removed.paintId)) {
                updatePaintButton(removed.paintId, false);
            }
        }
    }

    function removeIngredientByPaintId(paintId) {
        const selectedIngredients = app.getSelectedIngredients();
        const index = selectedIngredients.findIndex(ing => String(ing.paintId) === String(paintId));
        if (index !== -1) {
            deleteIngredient(index);
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_removed_from_recipe'), 'success');
        }
    }

    function removeIngredientByArticle(article) {
        const selectedIngredients = app.getSelectedIngredients();
        const index = selectedIngredients.findIndex(ing => ing.article === article);
        if (index !== -1) {
            deleteIngredient(index);
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_removed_from_recipe'), 'success');
        }
    }

    function calculatePercentages() {
        let selectedIngredients = app.getSelectedIngredients();
        selectedIngredients = SICOMIX.utils.calculateIngredientPercentages(selectedIngredients);
        app.setSelectedIngredients(selectedIngredients);
        renderIngredientsList();
    }

    function saveRecipe() {
        const name = document.getElementById('recipeName')?.value.trim();
        const cat = document.getElementById('recipeCategory')?.value;
        const series = document.getElementById('recipeSeries')?.value;
        const desc = document.getElementById('recipeDescription')?.value.trim();
        const selectedIngredients = app.getSelectedIngredients();

        if (!name || !cat || !series || selectedIngredients.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
            return;
        }

        const recipeData = {
            name,
            category: cat,
            series,
            description: desc,
            ingredients: [...selectedIngredients],
            photo: app.getRecipePhotoDataUrl() || null
        };

        const recipes = app.getRecipes();
        const isEditingRecipe = app.getIsEditingRecipe();
        const editingRecipeId = app.getEditingRecipeId();

        if (isEditingRecipe && editingRecipeId) {
            const idx = recipes.findIndex(r => String(r.id) === String(editingRecipeId));
            if (idx !== -1) {
                recipes[idx] = {
                    ...recipes[idx],
                    ...recipeData,
                    date: new Date().toLocaleDateString('uk-UA')
                };
                app.setRecipes(recipes);
                app.saveData();
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
                resetEditMode();
            }
        } else {
            const newRecipe = {
                id: SICOMIX.utils.generateId(),
                ...recipeData,
                date: new Date().toLocaleDateString('uk-UA')
            };
            recipes.push(newRecipe);
            app.setRecipes(recipes);
            app.saveData();
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${SICOMIX.utils.escapeHtml(name)}"`, 'success');
        }
        clearRecipeForm();
        app.clearRecipeDraft();
        app.switchPage('recipes');
    }

    function clearRecipeForm() {
        document.getElementById('recipeName').value = '';
        document.getElementById('recipeCategory').value = '';
        document.getElementById('recipeSeries').value = '';
        app.setSelectedSeries('');
        document.getElementById('recipeDescription').value = '';
        app.setSelectedIngredients([]);
        app.setRecipePhotoDataUrl(null);
        app.resetPhotoPreview();
        app.setLockedSeries(null);
        app.setLockedCategory(null);
        app.updateSeriesLockUI();
        renderIngredientsList();
        if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
        if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
        resetEditMode();
    }

    function resetEditMode() {
        app.setIsEditingRecipe(false);
        app.setEditingRecipeId(null);
        if (dom.saveRecipeBtn) {
            dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
            SICOMIX.i18n.applyTranslations();
        }
    }

    function renderRecipes() {
        if (!dom.recipesContainer) return;

        const search = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
        const cat = document.getElementById('recipeCategoryFilter')?.value || '';

        const recipes = app.getRecipes();
        const selectedRecipes = app.getSelectedRecipes();

        let filtered = recipes;
        if (search) {
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(search) ||
                (r.description && r.description.toLowerCase().includes(search))
            );
        }
        if (cat) filtered = filtered.filter(r => r.category === cat);

        if (filtered.length === 0) {
            dom.recipesContainer.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_recipes')}</p>`;
            SICOMIX.i18n.applyTranslations();
            return;
        }

        const paintCatalog = app.getPaintCatalog();

        dom.recipesContainer.innerHTML = filtered.map(r => {
            const total = r.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
            const photoHtml = r.photo
                ? `<img src="${SICOMIX.utils.escapeHtml(r.photo)}" style="width:100%; height:100%; object-fit:cover;">`
                : `<i class="fas fa-palette"></i>`;

            return `
            <div class="recipe-card" data-id="${r.id}" style="background: var(--bg-card); border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="width: 70px; height: 70px; border-radius: 12px; background: linear-gradient(145deg, #3a86ff80, #7b2cbf80); display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; overflow: hidden; flex-shrink: 0;">
                        ${photoHtml}
                    </div>
                    
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
                            <h3 style="font-size: 28px; font-weight: 700; color: #ffffff; margin: 0; line-height: 1.2; cursor: pointer;" onclick="SICOMIX.app.editRecipe('${r.id}')">
                                ${SICOMIX.utils.escapeHtml(r.name)}
                            </h3>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" class="recipe-select" value="${r.id}" ${selectedRecipes.includes(r.id) ? 'checked' : ''} style="width: 20px; height: 20px;">
                                <span style="font-size: 16px;">${SICOMIX.i18n.t('select')}</span>
                            </div>
                        </div>
                        
                        <div style="margin: 8px 0;">
                            <span style="background: rgba(255,255,255,0.1); padding: 4px 14px; border-radius: 30px; font-size: 14px; display: inline-block;">
                                ${SICOMIX.i18n.translateCategoryName(r.category)} / ${SICOMIX.utils.escapeHtml(r.series)}
                            </span>
                        </div>
                        
                        <div style="display: flex; gap: 20px; margin: 12px 0; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-box" style="color: #3a86ff;"></i>
                                <span><strong>${r.ingredients.length}</strong> ${SICOMIX.i18n.t('ingredients_count')}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-weight-hanging" style="color: #f4a261;"></i>
                                <span><strong>${total} ${SICOMIX.i18n.localizeUnitSymbol('г')}</strong></span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-calendar-alt" style="color: #6d28d9;"></i>
                                <span><strong>${SICOMIX.utils.escapeHtml(r.date)}</strong></span>
                            </div>
                        </div>
                        
                        ${r.description ? `<p style="color: var(--text-secondary); font-size: 14px; margin: 5px 0 10px;">${SICOMIX.utils.escapeHtml(r.description)}</p>` : ''}
                        
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                            <button class="recipe-btn edit-recipe" data-id="${r.id}" style="background: #3a86ff; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                                <i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}
                            </button>
                            <button class="recipe-btn delete-recipe" data-id="${r.id}" style="background: #e63946; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                                <i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}
                            </button>
                            <button class="recipe-btn export-recipe" data-id="${r.id}" style="background: #f4a261; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                                <i class="fas fa-download"></i> ${SICOMIX.i18n.t('export')}
                            </button>
                            <button class="recipe-btn print-label" data-recipe-id="${r.id}" style="background: #6d28d9; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                                <i class="fas fa-tag"></i> ${SICOMIX.i18n.t('print_label')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        SICOMIX.i18n.applyTranslations();

        dom.recipesContainer.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const card = btn.closest('.recipe-card');
            if (!card) return;
            const recipeId = card.dataset.id;

            if (btn.classList.contains('edit-recipe')) {
                e.preventDefault();
                editRecipe(recipeId);
            }
            else if (btn.classList.contains('delete-recipe')) {
                e.preventDefault();
                deleteRecipe(recipeId);
            }
            else if (btn.classList.contains('export-recipe')) {
                e.preventDefault();
                exportRecipe(recipeId);
            }
            else if (btn.classList.contains('print-label')) {
                e.preventDefault();
                showWeightInput(recipeId);
            }
        });

        dom.recipesContainer.querySelectorAll('.recipe-select').forEach(cb => {
            cb.removeEventListener('change', handleRecipeSelectChange);
            cb.addEventListener('change', handleRecipeSelectChange);
        });
    }

    function handleRecipeSelectChange(e) {
        const id = e.target.value;
        const selectedRecipes = app.getSelectedRecipes();
        if (e.target.checked) {
            if (!selectedRecipes.includes(id)) selectedRecipes.push(id);
        } else {
            app.setSelectedRecipes(selectedRecipes.filter(v => v !== id));
        }
    }

    function deleteRecipe(id) {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_recipe'),
            SICOMIX.i18n.t('delete_recipe_confirmation'),
            () => {
                const recipes = app.getRecipes();
                const filtered = recipes.filter(r => String(r.id) !== String(id));
                app.setRecipes(filtered);
                const selectedRecipes = app.getSelectedRecipes();
                app.setSelectedRecipes(selectedRecipes.filter(rid => String(rid) !== String(id)));
                app.saveData();
                renderRecipes();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('recipe_deleted'), 'success');
            }
        );
    }

    function deleteSelectedRecipes() {
        const selectedRecipes = app.getSelectedRecipes();
        if (selectedRecipes.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_recipes_to_delete'), 'warning');
            return;
        }
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_recipes'),
            `${SICOMIX.i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}?`,
            () => {
                const recipes = app.getRecipes();
                const filtered = recipes.filter(r => !selectedRecipes.includes(String(r.id)));
                app.setRecipes(filtered);
                app.setSelectedRecipes([]);
                app.saveData();
                renderRecipes();
                SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('deleted')} ${selectedRecipes.length}`, 'success');
            }
        );
    }

    function exportRecipe(id) {
        const recipes = app.getRecipes();
        const recipe = recipes.find(r => String(r.id) === String(id));
        if (recipe) {
            SICOMIX.utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('recipe_exported')}`, 'success');
        }
    }

    function exportAllRecipes() {
        const recipes = app.getRecipes();
        if (recipes.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        const format = dom.exportFormat?.value || 'json';
        const filename = `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.${format}`;
        const mime = format === 'json' ? 'application/json' : 'text/csv';
        SICOMIX.utils.exportToFile(recipes, filename, mime);
        SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
    }

    function importRecipes() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,.csv';
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try {
                    let imported;
                    if (file.name.endsWith('.json')) {
                        imported = JSON.parse(ev.target.result);
                    } else if (file.name.endsWith('.csv')) {
                        imported = SICOMIX.utils.parseCSV(ev.target.result);
                    } else {
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                        return;
                    }
                    const arr = Array.isArray(imported) ? imported : [imported];
                    SICOMIX.utils.showConfirmation(
                        SICOMIX.i18n.t('import_recipes'),
                        `${SICOMIX.i18n.t('found_recipes')} ${arr.length}. ${SICOMIX.i18n.t('import_confirm')}`,
                        () => {
                            const recipes = app.getRecipes();
                            arr.forEach(r => {
                                r.id = SICOMIX.utils.generateId();
                                if (r.ingredients) {
                                    r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                                }
                                recipes.push(r);
                            });
                            app.setRecipes(recipes);
                            app.saveData();
                            renderRecipes();
                            SICOMIX.utils.showNotification(`${SICOMIX.i18n.t('imported')} ${arr.length}`, 'success');
                        }
                    );
                } catch (err) {
                    console.error(err);
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function printRecipes() {
        const selectedRecipes = app.getSelectedRecipes();
        if (selectedRecipes.length === 0) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_recipes_to_print'), 'warning');
            return;
        }

        const recipes = app.getRecipes();
        const recipesToPrint = recipes.filter(r => selectedRecipes.includes(String(r.id)));
        const lang = SICOMIX.i18n.getLanguage();
        let html = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
            <meta charset="UTF-8">
            <title>${SICOMIX.i18n.t('print_recipes')}</title>
            <style>
                body { font-family: 'Inter', sans-serif; background: #0a0c0f; color: #f0f4f8; padding: 30px; margin: 0; }
                .print-header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; border-bottom: 2px solid #3a86ff; padding-bottom: 20px; }
                .logo { font-size: 48px; color: #3a86ff; background: linear-gradient(145deg, #3a86ff, #7b2cbf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .company-name { font-size: 32px; font-weight: 700; background: linear-gradient(145deg, white, #4cc9f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .print-date { margin-left: auto; color: #b0c0ce; }
                .recipe-card { background: rgba(20, 24, 28, 0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 25px; margin-bottom: 30px; page-break-inside: avoid; }
                .recipe-title { font-size: 28px; font-weight: 700; color: white; margin-bottom: 10px; }
                .recipe-meta { display: flex; gap: 20px; margin-bottom: 20px; color: #b0c0ce; }
                .recipe-photo { max-width: 200px; border-radius: 12px; margin: 15px 0; border: 2px solid rgba(255,255,255,0.1); }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th { background: rgba(58, 134, 255, 0.2); padding: 12px; text-align: left; color: white; }
                td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .footer { text-align: center; margin-top: 50px; color: #b0c0ce; font-size: 12px; }
                @media print { 
                    body { background: white; color: black; } 
                    .recipe-card { background: #f5f5f5; border: 1px solid #ccc; } 
                    th { background: #ddd; color: black; } 
                    .company-name { -webkit-text-fill-color: #333; } 
                    .print-date { color: #666; } 
                    .recipe-photo { border: 1px solid #ccc; }
                }
            </style>
        </head>
        <body>
            <div class="print-header">
                <div class="logo"><i class="fas fa-prism"></i></div>
                <div class="company-name">SICO Spectrum</div>
                <div class="print-date">${new Date().toLocaleDateString(lang)}</div>
            </div>
        `;

        const paintCatalog = app.getPaintCatalog();

        recipesToPrint.forEach(recipe => {
            const total = recipe.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
            html += `
            <div class="recipe-card">
                <h2 class="recipe-title">${SICOMIX.utils.escapeHtml(recipe.name)}</h2>
                <div class="recipe-meta">
                    <span><strong>${SICOMIX.i18n.t('category')}:</strong> ${SICOMIX.i18n.translateCategoryName(recipe.category)} / ${SICOMIX.utils.escapeHtml(recipe.series)}</span>
                    <span><strong>${SICOMIX.i18n.t('date')}:</strong> ${SICOMIX.utils.escapeHtml(recipe.date || SICOMIX.i18n.t('unknown'))}</span>
                    <span><strong>${SICOMIX.i18n.t('total_weight')}:</strong> ${total} г</span>
                </div>
                ${recipe.photo ? `<img src="${SICOMIX.utils.escapeHtml(recipe.photo)}" alt="Color sample" class="recipe-photo">` : ''}
                <p>${SICOMIX.utils.escapeHtml(recipe.description || SICOMIX.i18n.t('no_description'))}</p>
                <h3>${SICOMIX.i18n.t('recipe_ingredients')}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>${SICOMIX.i18n.t('paint')}</th>
                            <th>${SICOMIX.i18n.t('quantity')}</th>
                            <th>${SICOMIX.i18n.t('percentage')}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            recipe.ingredients.forEach(ing => {
                const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing;
                const paintName = paint.displayName?.[lang] || paint.name;
                html += `
                    <tr>
                        <td>${SICOMIX.utils.escapeHtml(paintName)}</td>
                        <td>${ing.amount} ${ing.unit}</td>
                        <td>${ing.percentage || 0}%</td>
                    </tr>
                `;
            });
            html += `
                    </tbody>
                </table>
            </div>
            `;
        });

        html += `
            <div class="footer">
                <p>SICO Spectrum • ${SICOMIX.i18n.t('version')} 1.0 • © ${new Date().getFullYear()}</p>
            </div>
        </body>
        </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    function showWeightInput(recipeId) {
        const recipes = app.getRecipes();
        const recipe = recipes.find(r => String(r.id) === String(recipeId));
        if (!recipe) return;

        const totalWeight = recipe.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0);
        dom.weightInput.value = (totalWeight / 1000).toFixed(2);

        dom.weightInputModal.classList.add('active');

        const onConfirm = () => {
            let weight = parseFloat(dom.weightInput.value.replace(',', '.'));
            if (isNaN(weight) || weight <= 0) weight = totalWeight / 1000;
            dom.weightInputModal.classList.remove('active');
            printLabelWithWeight(recipe, weight);
            cleanup();
        };

        const onCancel = () => {
            dom.weightInputModal.classList.remove('active');
            cleanup();
        };

        const cleanup = () => {
            dom.weightConfirmBtn.removeEventListener('click', onConfirm);
            dom.weightCancelBtn.removeEventListener('click', onCancel);
            dom.closeWeightModal.removeEventListener('click', onCancel);
        };

        dom.weightConfirmBtn.addEventListener('click', onConfirm, { once: true });
        dom.weightCancelBtn.addEventListener('click', onCancel, { once: true });
        dom.closeWeightModal.addEventListener('click', onCancel, { once: true });
    }

    function printLabelWithWeight(recipe, weightKg) {
        const lang = SICOMIX.i18n.getLanguage();
        const date = new Date().toLocaleDateString(lang);

        const labelHtml = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
            <meta charset="UTF-8">
            <title>Etykieta - ${SICOMIX.utils.escapeHtml(recipe.name)}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Inter', sans-serif;
                    background: #e5e7eb;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .label {
                    width: 420px;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border: 1px solid #ccc;
                }
                .header {
                    background: #1e3a8a;
                    color: white;
                    padding: 16px 20px;
                    text-align: center;
                    border-bottom: 3px solid #fbbf24;
                }
                .header h1 {
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                    color: #e63946;
                }
                .header .sub {
                    font-size: 14px;
                    font-weight: 500;
                    opacity: 0.9;
                    color: #000000;
                }
                .product-info {
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                    background: #f9fafb;
                }
                .product-name {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1e3a8a;
                    margin-bottom: 5px;
                    line-height: 1.2;
                }
                .product-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #000000;
                    margin-bottom: 10px;
                }
                .weight-box {
                    background: white;
                    border: 2px solid #1e3a8a;
                    border-radius: 40px;
                    padding: 12px 20px;
                    text-align: center;
                    margin: 15px 0;
                    font-size: 32px;
                    font-weight: 800;
                    color: #1e3a8a;
                    display: inline-block;
                    min-width: 200px;
                }
                .weight-box span {
                    font-size: 18px;
                    font-weight: 500;
                    color: #6b7280;
                }
                .footer {
                    background: #f3f4f6;
                    padding: 20px;
                    font-size: 12px;
                    color: #000000;
                    border-top: 1px solid #d1d5db;
                }
                .footer .distributor {
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #000000;
                }
                .footer .address {
                    line-height: 1.5;
                    margin-bottom: 5px;
                    color: #000000;
                }
                .footer .contact {
                    margin-bottom: 10px;
                    color: #000000;
                }
                .footer .producer {
                    font-style: italic;
                    border-top: 1px solid #9ca3af;
                    padding-top: 8px;
                    margin-top: 8px;
                    color: #000000;
                }
                .footer .note {
                    margin-top: 15px;
                    font-size: 10px;
                    text-transform: uppercase;
                    font-weight: 600;
                    color: #e63946;
                    text-align: center;
                    border-top: 1px dashed #9ca3af;
                    padding-top: 10px;
                }
                .logo-area {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .logo-text {
                    font-size: 20px;
                    font-weight: 800;
                    color: #e63946;
                    background: #fbbf24;
                    padding: 5px 15px;
                    border-radius: 40px;
                    letter-spacing: 1px;
                }
            </style>
        </head>
        <body>
            <div class="label">
                <div class="header">
                    <div class="logo-area">
                        <span class="logo-text">SICO</span>
                    </div>
                    <h1>SICO POLSKA - FARBA MIESZANA</h1>
                    <div class="sub">${SICOMIX.utils.escapeHtml(recipe.series)} / ${SICOMIX.i18n.translateCategoryName(recipe.category)}</div>
                </div>

                <div class="product-info">
                    <div class="product-name">${SICOMIX.utils.escapeHtml(recipe.name)}</div>
                    <div class="product-meta">
                        <span>Data: ${date}</span>
                        <span>Nr partii: ${recipe.id.substring(0,8).toUpperCase()}</span>
                    </div>

                    <div style="text-align: center;">
                        <div class="weight-box">
                            ${weightKg.toFixed(2)} <span>kg</span>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <div class="distributor">Wyłączny dystrybutor w Polsce</div>
                    <div class="address">
                        SICO Polska Sp. z o. o.<br>
                        ul. Annopol 3, 03-236 Warszawa
                    </div>
                    <div class="contact">
                        tel.: 00 48 22 660 48 50 (-9)<br>
                        e-mail: sico@sico.pl
                    </div>
                    <div class="producer">
                        Producent n.v. Sico s.a. - Belgia<br>
                        n.v. SICO Screen Inks s.a.
                    </div>
                    <div class="note">
                        PRZED DRUKIEM NAKŁADU ZALECAMY SPRAWDZENIE ZGODNOŚCI KOLORYSTYCZNEJ
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(labelHtml);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    function editRecipe(id) {
        const recipes = app.getRecipes();
        const recipe = recipes.find(r => String(r.id) === String(id));
        if (!recipe) return;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeSeries').value = recipe.series || '';
        app.setSelectedSeries(recipe.series || '');
        document.getElementById('recipeDescription').value = recipe.description || '';
        app.setSelectedIngredients(recipe.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) })));
        app.setRecipePhotoDataUrl(recipe.photo || null);
        if (app.getRecipePhotoDataUrl()) {
            app.showPhotoPreview(app.getRecipePhotoDataUrl());
        } else {
            app.resetPhotoPreview();
        }
        const selectedIngredients = app.getSelectedIngredients();
        if (selectedIngredients.length > 0) {
            const paintCatalog = app.getPaintCatalog();
            const firstPaint = paintCatalog.find(p => String(p.id) === String(selectedIngredients[0].paintId));
            if (firstPaint) {
                app.setLockedSeries(firstPaint.series);
                app.setLockedCategory(firstPaint.category);
            }
        } else {
            app.setLockedSeries(null);
            app.setLockedCategory(null);
        }
        renderIngredientsList();
        calculatePercentages();
        app.updateSeriesLockUI();
        app.setIsEditingRecipe(true);
        app.setEditingRecipeId(id);
        if (dom.saveRecipeBtn) {
            dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe"></span>`;
            SICOMIX.i18n.applyTranslations();
        }
        app.switchPage('new-recipe');
        SICOMIX.utils.showNotification(`"${SICOMIX.utils.escapeHtml(recipe.name)}" ${SICOMIX.i18n.t('edit')}`, 'info');
    }

    async function scanRecipeFromPhoto() {
        const seriesSelect = document.getElementById('recipeSeries');
        if (!seriesSelect || !seriesSelect.value) {
            SICOMIX.utils.showNotification(SICOMIX.i18n.t('select_series_first'), 'warning');
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        input.onchange = async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            SICOMIX.utils.showNotification(SICOMIX.i18n.t('scanning_recipe'), 'info', 0);

            try {
                const { data: { text } } = await Tesseract.recognize(
                    file,
                    'ukr+eng',
                    { 
                        logger: m => console.log(m),
                        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя -+.,'
                    }
                );

                console.log('Розпізнаний текст:', text);

                const lines = text.split('\n').filter(line => line.trim().length > 0);
                const targetSeries = app.getLockedSeries() || seriesSelect.value;
                const paintCatalog = app.getPaintCatalog();
                const seriesPaints = paintCatalog.filter(p => p.series === targetSeries);

                let seriesPrefix = '';
                for (let line of lines) {
                    const match = line.toUpperCase().match(/\b([A-Z]{2})[A-Z0-9]*\b/);
                    if (match) {
                        seriesPrefix = match[1];
                        break;
                    }
                }

                const ingredientSums = {};

                function normalizePaintIdentifier(identifier, prefix) {
                    if (prefix && /^\d+$/.test(identifier)) {
                        return prefix + identifier;
                    }
                    return identifier;
                }

                function normalizeUnit(unitStr) {
                    const unit = unitStr.toLowerCase();
                    if (unit === 'g' || unit === 'г' || unit === '') return 'г';
                    if (unit === 'kg' || unit === 'кг') return 'кг';
                    if (unit === 'ml' || unit === 'мл') return 'мл';
                    if (unit === 'l' || unit === 'л') return 'л';
                    return 'г';
                }

                function findPaint(identifier, paints, prefix) {
                    let paint = paints.find(p => p.article && p.article === identifier);
                    if (paint) return paint;

                    const normalized = normalizePaintIdentifier(identifier, prefix);
                    paint = paints.find(p => p.name.toUpperCase() === normalized.toUpperCase());
                    if (paint) return paint;

                    paint = paints.find(p => p.name.toUpperCase().includes(identifier.toUpperCase()));
                    if (paint) return paint;

                    paint = paints.find(p => p.article && p.article.toUpperCase().includes(identifier.toUpperCase()));
                    if (paint) return paint;

                    if (prefix && /^\d+$/.test(identifier)) {
                        paint = paints.find(p => p.name.toUpperCase().includes(identifier));
                        if (paint) return paint;
                    }

                    return null;
                }

                lines.forEach(line => {
                    const dashMatch = line.match(/([A-Za-z0-9]+)\s*[-–]\s*(.+)/);
                    if (dashMatch) {
                        const identifier = dashMatch[1].trim();
                        const rightPart = dashMatch[2].trim();

                        const amountParts = rightPart.split('+').map(p => p.trim()).filter(p => p.length > 0);

                        amountParts.forEach(part => {
                            const amountMatch = part.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Zа-яА-Я]*)/);
                            if (amountMatch) {
                                const amount = parseFloat(amountMatch[1].replace(',', '.'));
                                if (isNaN(amount) || amount <= 0) return;

                                const unit = normalizeUnit(amountMatch[2] || 'г');

                                const paint = findPaint(identifier, seriesPaints, seriesPrefix);
                                if (paint) {
                                    const key = paint.id + '_' + unit;
                                    if (!ingredientSums[key]) {
                                        ingredientSums[key] = {
                                            paintId: paint.id,
                                            unit: unit,
                                            amount: 0
                                        };
                                    }
                                    ingredientSums[key].amount += amount;
                                } else {
                                    console.log('Не вдалося знайти фарбу для ідентифікатора:', identifier);
                                }
                            }
                        });
                    } else {
                        const amountMatch = line.match(/(\d+(?:[.,]\d+)?)\s*([a-zA-Zа-яА-Я]*)/);
                        if (amountMatch) {
                            const amount = parseFloat(amountMatch[1].replace(',', '.'));
                            if (isNaN(amount) || amount <= 0) return;
                            const unit = normalizeUnit(amountMatch[2] || 'г');

                            for (let paint of seriesPaints) {
                                if (line.toUpperCase().includes(paint.name.toUpperCase())) {
                                    const key = paint.id + '_' + unit;
                                    if (!ingredientSums[key]) {
                                        ingredientSums[key] = {
                                            paintId: paint.id,
                                            unit: unit,
                                            amount: 0
                                        };
                                    }
                                    ingredientSums[key].amount += amount;
                                    break;
                                }
                            }
                        }
                    }
                });

                const foundIngredients = Object.values(ingredientSums).map(item => ({
                    paintId: item.paintId,
                    amount: item.amount,
                    unit: item.unit,
                    percentage: 0
                }));

                SICOMIX.utils.hideNotification();

                if (foundIngredients.length === 0) {
                    SICOMIX.utils.showNotification(SICOMIX.i18n.t('scan_no_paints'), 'warning');
                    return;
                }

                let message = '';
                foundIngredients.forEach(ing => {
                    const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId));
                    if (paint) {
                        message += `\n• ${paint.name} – ${ing.amount} ${ing.unit}`;
                    }
                });

                SICOMIX.utils.showConfirmation(
                    SICOMIX.i18n.t('scan_success', { count: foundIngredients.length }),
                    message,
                    () => {
                        const selectedIngredients = app.getSelectedIngredients();
                        foundIngredients.forEach(ing => {
                            const existing = selectedIngredients.find(
                                ex => String(ex.paintId) === String(ing.paintId) && ex.unit === ing.unit
                            );
                            if (existing) {
                                existing.amount += ing.amount;
                            } else {
                                selectedIngredients.push(ing);
                            }
                        });
                        app.setSelectedIngredients(selectedIngredients);
                        calculatePercentages();
                        renderIngredientsList();
                        app.updateSeriesLockUI();
                        app.autoSaveRecipeDraft();
                        
                        if (SICOMIX.app.renderPantoneCatalog) SICOMIX.app.renderPantoneCatalog();
                        if (SICOMIX.app.renderRalCatalog) SICOMIX.app.renderRalCatalog();
                        
                        SICOMIX.utils.showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
                    },
                    () => {}
                );

            } catch (error) {
                console.error('Помилка сканування:', error);
                SICOMIX.utils.hideNotification();
                SICOMIX.utils.showNotification(SICOMIX.i18n.t('scan_error'), 'error');
            }
        };

        input.click();
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

    function attachRecipeEventListeners() {
        console.log('🍳 attachRecipeEventListeners викликано');
        if (dom.addIngredientBtn) {
            dom.addIngredientBtn.addEventListener('click', addIngredient);
            console.log('✅ addIngredientBtn обробник додано');
        }
        if (dom.scanRecipeBtn) {
            dom.scanRecipeBtn.addEventListener('click', scanRecipeFromPhoto);
            console.log('✅ scanRecipeBtn обробник додано');
        }
        if (dom.saveRecipeBtn) {
            dom.saveRecipeBtn.addEventListener('click', saveRecipe);
            console.log('✅ saveRecipeBtn обробник додано');
        }
        if (dom.clearRecipeBtn) {
            dom.clearRecipeBtn.addEventListener('click', clearRecipeForm);
            console.log('✅ clearRecipeBtn обробник додано');
        }
        if (dom.importRecipesBtn) {
            dom.importRecipesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                importRecipes();
            });
            console.log('✅ importRecipesBtn обробник додано');
        }
        if (dom.exportRecipesBtn) {
            dom.exportRecipesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                exportAllRecipes();
            });
            console.log('✅ exportRecipesBtn обробник додано');
        }
        if (dom.printRecipesBtn) {
            dom.printRecipesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                printRecipes();
            });
            console.log('✅ printRecipesBtn обробник додано');
        }
        if (dom.deleteSelectedRecipesBtn) {
            dom.deleteSelectedRecipesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                deleteSelectedRecipes();
            });
            console.log('✅ deleteSelectedRecipesBtn обробник додано');
        }
    }

    Object.assign(SICOMIX.app, {
        renderIngredientsList,
        handleIngredientChange,
        addIngredient,
        showPaintSelectionModal,
        deleteIngredient,
        removeIngredientByPaintId,
        removeIngredientByArticle,
        calculatePercentages,
        saveRecipe,
        clearRecipeForm,
        resetEditMode,
        renderRecipes,
        handleRecipeSelectChange,
        deleteRecipe,
        deleteSelectedRecipes,
        exportRecipe,
        exportAllRecipes,
        importRecipes,
        printRecipes,
        showWeightInput,
        printLabelWithWeight,
        editRecipe,
        scanRecipeFromPhoto,
        updatePaintButton,
        attachRecipeEventListeners
    });

    console.log('📦 app-recipe.js завантажено');

})(window);
