// ========== RECIPE MODULE ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';
import * as app from './app-core.js';

// ---------- ДОПОМІЖНІ ФУНКЦІЇ ----------
function renderIngredientsList() {
    const dom = app.dom;
    if (!dom.ingredientsList) return;
    const selectedIngredients = app.getSelectedIngredients();
    const paintCatalog = app.getPaintCatalog();

    if (selectedIngredients.length === 0) {
        dom.ingredientsList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px;">
            <i class="fas fa-palette" style="font-size:32px; opacity:0.5;"></i><br>
            <span>${i18n.t('paints_not_found')}</span>
        </td></tr>`;
        i18n.applyTranslations();
        return;
    }

    let html = '';
    selectedIngredients.forEach((ing, idx) => {
        const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing;
        const paintCode = paint.name || '';
        const paintLocalizedName = paint.displayName?.[i18n.getLanguage()] || '';
        html += `<tr>
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:24px; height:24px; background:${utils.escapeHtml(paint.color)}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                    <div>
                        <div style="font-weight:600;">${utils.escapeHtml(paintCode)}</div>
                        <div style="font-size:12px; color:var(--text-secondary);">
                            ${paintLocalizedName ? utils.escapeHtml(paintLocalizedName) + ' • ' : ''}
                            ${i18n.translateCategoryName(paint.category)} 
                            <span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:12px; margin-left:6px;">${utils.escapeHtml(paint.series)}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td><input type="number" class="input-small" value="${ing.amount}" data-index="${idx}" data-field="amount" min="0.01" step="0.01"></td>
            <td>
                <select class="unit-select" data-index="${idx}" data-field="unit">
                    <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>${i18n.localizeUnitSymbol('г')}</option>
                    <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>${i18n.localizeUnitSymbol('кг')}</option>
                    <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>${i18n.localizeUnitSymbol('мл')}</option>
                    <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>${i18n.localizeUnitSymbol('л')}</option>
                </select>
            </td>
            <td><input type="number" class="input-small" value="${ing.percentage || 0}" readonly> %</td>
            <td><button class="btn-icon delete-ingredient" data-index="${idx}"><i class="fas fa-trash"></i></button></td>
        </tr>`;
    });
    dom.ingredientsList.innerHTML = html;
    i18n.applyTranslations();

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
        utils.showNotification(i18n.t('select_series_first'), 'warning');
        return;
    }
    const lockedSeries = app.getLockedSeries();
    let targetSeries = lockedSeries || seriesSelect.value;
    if (lockedSeries && targetSeries !== lockedSeries) {
        targetSeries = lockedSeries;
    }

    const term = app.dom.paintSearch?.value.toLowerCase() || '';
    const cat = app.dom.categoryFilter?.value || '';
    const paintCatalog = app.getPaintCatalog();
    
    let filtered = paintCatalog.filter(p => p.series === targetSeries);
    
    if (term) filtered = filtered.filter(p => p && p.name && p.name.toLowerCase().includes(term));
    if (cat) filtered = filtered.filter(p => p && p.category === cat);
    
    if (filtered.length === 0) {
        utils.showNotification(i18n.t('paints_not_found_in_series'), 'error');
        return;
    }
    showPaintSelectionModal(filtered);
}

function showPaintSelectionModal(paints) {
    const modal = document.getElementById('paintSelectionModal');
    const list = document.getElementById('paintSelectionList');
    list.innerHTML = paints.map(p => {
        const paintCode = p.name;
        const paintName = p.displayName?.[i18n.getLanguage()] || p.name;
        return `
        <div class="paint-selection-card" data-id="${p.id}">
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:32px; height:32px; background:${utils.escapeHtml(p.color)}; border-radius:8px;"></div>
                <div>
                    <strong>${utils.escapeHtml(paintCode)}</strong>
                    <br><span style="font-size:12px;">${utils.escapeHtml(paintName)} • ${i18n.translateCategoryName(p.category)} (${utils.escapeHtml(p.series)})</span>
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
            utils.showNotification(validation.message, 'error');
            modal.classList.remove('active');
            list.removeEventListener('click', clickHandler);
            closeBtn?.removeEventListener('click', closeHandler);
            return;
        }
        
        const selectedIngredients = app.getSelectedIngredients();
        if (selectedIngredients.some(ing => String(ing.paintId) === pid)) {
            utils.showNotification(i18n.t('paint_already_added'), 'warning');
        } else {
            const defaultUnit = app.getDefaultUnitSymbol();
            selectedIngredients.push({ paintId: pid, amount: 100, unit: defaultUnit, percentage: 0 });
            app.setSelectedIngredients(selectedIngredients);
            calculatePercentages();
            renderIngredientsList();
            app.updateSeriesLockUI();
            app.autoSaveRecipeDraft();
            utils.showNotification(i18n.t('paint_added_to_recipe'), 'success');
            
            if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
            if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
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
        
        if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
        if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
        
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
        utils.showNotification(i18n.t('paint_removed_from_recipe'), 'success');
    }
}

function removeIngredientByArticle(article) {
    const selectedIngredients = app.getSelectedIngredients();
    const index = selectedIngredients.findIndex(ing => ing.article === article);
    if (index !== -1) {
        deleteIngredient(index);
        utils.showNotification(i18n.t('paint_removed_from_recipe'), 'success');
    }
}

function calculatePercentages() {
    let selectedIngredients = app.getSelectedIngredients();
    selectedIngredients = utils.calculateIngredientPercentages(selectedIngredients);
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
        utils.showNotification(i18n.t('fill_required_fields'), 'error');
        return;
    }

    const recipes = app.getRecipes();
    const isEditingRecipe = app.getIsEditingRecipe();
    const editingRecipeId = app.getEditingRecipeId();

    const existingRecipe = recipes.find(r => 
        r.name.toLowerCase() === name.toLowerCase() && 
        (!isEditingRecipe || String(r.id) !== String(editingRecipeId))
    );

    if (existingRecipe) {
        utils.showConfirmation(
            i18n.t('recipe_exists_title'),
            i18n.t('recipe_exists_message'),
            () => {
                performSave(existingRecipe.id, name, cat, series, desc, selectedIngredients, isEditingRecipe, editingRecipeId);
            },
            () => {}
        );
        return;
    }

    performSave(null, name, cat, series, desc, selectedIngredients, isEditingRecipe, editingRecipeId);
}

function performSave(existingId, name, cat, series, desc, selectedIngredients, isEditingRecipe, editingRecipeId) {
    const recipeData = {
        name,
        category: cat,
        series,
        description: desc,
        ingredients: [...selectedIngredients],
        photo: app.getRecipePhotoDataUrl() || null
    };

    const recipes = app.getRecipes();

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
            utils.showNotification(`${i18n.t('recipe_saved')} "${utils.escapeHtml(name)}"`, 'success');
            resetEditMode();
        }
    } else if (existingId) {
        const idx = recipes.findIndex(r => String(r.id) === String(existingId));
        if (idx !== -1) {
            recipes[idx] = {
                ...recipes[idx],
                ...recipeData,
                date: new Date().toLocaleDateString('uk-UA')
            };
            app.setRecipes(recipes);
            app.saveData();
            utils.showNotification(`${i18n.t('recipe_saved')} "${utils.escapeHtml(name)}"`, 'success');
        }
    } else {
        const newRecipe = {
            id: utils.generateId(),
            ...recipeData,
            date: new Date().toLocaleDateString('uk-UA')
        };
        recipes.push(newRecipe);
        app.setRecipes(recipes);
        app.saveData();
        utils.showNotification(`${i18n.t('recipe_saved')} "${utils.escapeHtml(name)}"`, 'success');
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
    if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
    if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
    resetEditMode();
}

function resetEditMode() {
    app.setIsEditingRecipe(false);
    app.setEditingRecipeId(null);
    if (app.dom.saveRecipeBtn) {
        app.dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
        i18n.applyTranslations();
    }
}

function renderRecipes() {
    const dom = app.dom;
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
        dom.recipesContainer.innerHTML = `<p style="text-align:center; padding:40px;">${i18n.t('no_recipes')}</p>`;
        i18n.applyTranslations();
        return;
    }

    const paintCatalog = app.getPaintCatalog();

    dom.recipesContainer.innerHTML = filtered.map(r => {
        const total = r.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
        const photoHtml = r.photo
            ? `<img src="${utils.escapeHtml(r.photo)}" style="width:100%; height:100%; object-fit:cover;">`
            : `<i class="fas fa-palette"></i>`;

        return `
        <div class="recipe-card" data-id="${r.id}" style="background: var(--bg-card); border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="width: 70px; height: 70px; border-radius: 12px; background: linear-gradient(145deg, #3a86ff80, #7b2cbf80); display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; overflow: hidden; flex-shrink: 0;">
                    ${photoHtml}
                </div>
                
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
                        <h3 style="font-size: 28px; font-weight: 700; color: #ffffff; margin: 0; line-height: 1.2; cursor: pointer;" onclick="window.SICOMIX.app.editRecipe('${r.id}')">
                            ${utils.escapeHtml(r.name)}
                        </h3>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" class="recipe-select" value="${r.id}" ${selectedRecipes.includes(r.id) ? 'checked' : ''} style="width: 20px; height: 20px;">
                            <span style="font-size: 16px;">${i18n.t('select')}</span>
                        </div>
                    </div>
                    
                    <div style="margin: 8px 0;">
                        <span style="background: rgba(255,255,255,0.1); padding: 4px 14px; border-radius: 30px; font-size: 14px; display: inline-block;">
                            ${i18n.translateCategoryName(r.category)} / ${utils.escapeHtml(r.series)}
                        </span>
                    </div>
                    
                    <div style="display: flex; gap: 20px; margin: 12px 0; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-box" style="color: #3a86ff;"></i>
                            <span><strong>${r.ingredients.length}</strong> ${i18n.t('ingredients_count')}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-weight-hanging" style="color: #f4a261;"></i>
                            <span><strong>${total} ${i18n.localizeUnitSymbol('г')}</strong></span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-calendar-alt" style="color: #6d28d9;"></i>
                            <span><strong>${utils.escapeHtml(r.date)}</strong></span>
                        </div>
                    </div>
                    
                    ${r.description ? `<p style="color: var(--text-secondary); font-size: 14px; margin: 5px 0 10px;">${utils.escapeHtml(r.description)}</p>` : ''}
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                        <button class="recipe-btn edit-recipe" data-id="${r.id}" style="background: #3a86ff; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                            <i class="fas fa-edit"></i> ${i18n.t('edit')}
                        </button>
                        <button class="recipe-btn delete-recipe" data-id="${r.id}" style="background: #e63946; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                            <i class="fas fa-trash"></i> ${i18n.t('delete')}
                        </button>
                        <button class="recipe-btn export-recipe" data-id="${r.id}" style="background: #f4a261; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                            <i class="fas fa-download"></i> ${i18n.t('export')}
                        </button>
                        <button class="recipe-btn print-label" data-recipe-id="${r.id}" style="background: #6d28d9; border: none; color: white; padding: 8px 16px; border-radius: 30px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-size: 14px;">
                            <i class="fas fa-tag"></i> ${i18n.t('print_label')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    i18n.applyTranslations();

    dom.recipesContainer.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        const card = btn.closest('.recipe-card');
        if (!card) return;
        const recipeId = card.dataset.id;

        if (btn.classList.contains('edit-recipe')) {
            e.preventDefault();
            if (typeof window.SICOMIX?.app?.editRecipe === 'function') {
                window.SICOMIX.app.editRecipe(recipeId);
            }
        }
        else if (btn.classList.contains('delete-recipe')) {
            e.preventDefault();
            if (typeof window.SICOMIX?.app?.deleteRecipe === 'function') {
                window.SICOMIX.app.deleteRecipe(recipeId);
            }
        }
        else if (btn.classList.contains('export-recipe')) {
            e.preventDefault();
            if (typeof window.SICOMIX?.app?.exportRecipe === 'function') {
                window.SICOMIX.app.exportRecipe(recipeId);
            }
        }
        else if (btn.classList.contains('print-label')) {
            e.preventDefault();
            if (typeof window.SICOMIX?.app?.showWeightInput === 'function') {
                window.SICOMIX.app.showWeightInput(recipeId);
            }
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
    utils.showConfirmation(
        i18n.t('delete_recipe'),
        i18n.t('delete_recipe_confirmation'),
        () => {
            const recipes = app.getRecipes();
            const filtered = recipes.filter(r => String(r.id) !== String(id));
            app.setRecipes(filtered);
            const selectedRecipes = app.getSelectedRecipes();
            app.setSelectedRecipes(selectedRecipes.filter(rid => String(rid) !== String(id)));
            app.saveData();
            renderRecipes();
            utils.showNotification(i18n.t('recipe_deleted'), 'success');
        }
    );
}

function deleteSelectedRecipes() {
    const selectedRecipes = app.getSelectedRecipes();
    if (selectedRecipes.length === 0) {
        utils.showNotification(i18n.t('select_recipes_to_delete'), 'warning');
        return;
    }
    utils.showConfirmation(
        i18n.t('delete_recipes'),
        `${i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${i18n.t('recipes')}?`,
        () => {
            const recipes = app.getRecipes();
            const filtered = recipes.filter(r => !selectedRecipes.includes(String(r.id)));
            app.setRecipes(filtered);
            app.setSelectedRecipes([]);
            app.saveData();
            renderRecipes();
            utils.showNotification(`${i18n.t('deleted')} ${selectedRecipes.length}`, 'success');
        }
    );
}

function exportRecipe(id) {
    const recipes = app.getRecipes();
    const recipe = recipes.find(r => String(r.id) === String(id));
    if (recipe) {
        utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
        utils.showNotification(`${i18n.t('recipe_exported')}`, 'success');
    }
}

function exportAllRecipes() {
    const recipes = app.getRecipes();
    if (recipes.length === 0) {
        utils.showNotification(i18n.t('no_recipes_to_export'), 'warning');
        return;
    }
    const format = app.dom.exportFormat?.value || 'json';
    const filename = `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.${format}`;
    const mime = format === 'json' ? 'application/json' : 'text/csv';
    utils.exportToFile(recipes, filename, mime);
    utils.showNotification(`${i18n.t('exported')} ${recipes.length} ${i18n.t('recipes')}`, 'success');
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
                    imported = utils.parseCSV(ev.target.result);
                } else {
                    utils.showNotification(i18n.t('invalid_file_format'), 'error');
                    return;
                }
                const arr = Array.isArray(imported) ? imported : [imported];
                utils.showConfirmation(
                    i18n.t('import_recipes'),
                    `${i18n.t('found_recipes')} ${arr.length}. ${i18n.t('import_confirm')}`,
                    () => {
                        const recipes = app.getRecipes();
                        arr.forEach(r => {
                            r.id = utils.generateId();
                            if (r.ingredients) {
                                r.ingredients = r.ingredients.map(ing => ({ ...ing, paintId: String(ing.paintId) }));
                            }
                            recipes.push(r);
                        });
                        app.setRecipes(recipes);
                        app.saveData();
                        renderRecipes();
                        utils.showNotification(`${i18n.t('imported')} ${arr.length}`, 'success');
                    }
                );
            } catch (err) {
                console.error(err);
                utils.showNotification(i18n.t('invalid_file_format'), 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function printRecipes() {
    const selectedRecipes = app.getSelectedRecipes();
    if (selectedRecipes.length === 0) {
        utils.showNotification(i18n.t('select_recipes_to_print'), 'warning');
        return;
    }

    const recipes = app.getRecipes();
    const recipesToPrint = recipes.filter(r => selectedRecipes.includes(String(r.id)));
    const lang = i18n.getLanguage();
    let html = `
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
        <meta charset="UTF-8">
        <title>${i18n.t('print_recipes')}</title>
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
            <h2 class="recipe-title">${utils.escapeHtml(recipe.name)}</h2>
            <div class="recipe-meta">
                <span><strong>${i18n.t('category')}:</strong> ${i18n.translateCategoryName(recipe.category)} / ${utils.escapeHtml(recipe.series)}</span>
                <span><strong>${i18n.t('date')}:</strong> ${utils.escapeHtml(recipe.date || i18n.t('unknown'))}</span>
                <span><strong>${i18n.t('total_weight')}:</strong> ${total} г</span>
            </div>
            ${recipe.photo ? `<img src="${utils.escapeHtml(recipe.photo)}" alt="Color sample" class="recipe-photo">` : ''}
            <p>${utils.escapeHtml(recipe.description || i18n.t('no_description'))}</p>
            <h3>${i18n.t('recipe_ingredients')}</h3>
            <table>
                <thead>
                    <tr>
                        <th>${i18n.t('paint')}</th>
                        <th>${i18n.t('quantity')}</th>
                        <th>${i18n.t('percentage')}</th>
                    </tr>
                </thead>
                <tbody>
        `;
        recipe.ingredients.forEach(ing => {
            const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId)) || ing;
            const paintName = paint.displayName?.[lang] || paint.name;
            html += `
                <tr>
                    <td>${utils.escapeHtml(paintName)}</td>
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
            <p>SICO Spectrum • ${i18n.t('version')} 1.0 • © ${new Date().getFullYear()}</p>
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
    app.dom.weightInput.value = (totalWeight / 1000).toFixed(2);

    app.dom.weightInputModal.classList.add('active');

    const onConfirm = () => {
        let weight = parseFloat(app.dom.weightInput.value.replace(',', '.'));
        if (isNaN(weight) || weight <= 0) weight = totalWeight / 1000;
        app.dom.weightInputModal.classList.remove('active');
        printLabelWithWeight(recipe, weight);
        cleanup();
    };

    const onCancel = () => {
        app.dom.weightInputModal.classList.remove('active');
        cleanup();
    };

    const cleanup = () => {
        app.dom.weightConfirmBtn.removeEventListener('click', onConfirm);
        app.dom.weightCancelBtn.removeEventListener('click', onCancel);
        app.dom.closeWeightModal.removeEventListener('click', onCancel);
    };

    app.dom.weightConfirmBtn.addEventListener('click', onConfirm, { once: true });
    app.dom.weightCancelBtn.addEventListener('click', onCancel, { once: true });
    app.dom.closeWeightModal.addEventListener('click', onCancel, { once: true });
}

// Оновлена функція друку етикетки з кольорами серій та червоними технічними даними
function printLabelWithWeight(recipe, weightKg) {
    const lang = i18n.getLanguage();
    const date = new Date().toLocaleDateString(lang);
    
    // Визначаємо розмір етикетки залежно від ваги
    const isSmall = weightKg <= 2;
    const labelWidth = isSmall ? '104mm' : '147mm';
    const labelHeight = isSmall ? '100mm' : '105mm';
    
    // Отримуємо дані серії
    const seriesId = recipe.series;
    const allSeries = window.SICOMIX?.data?.series || [];
    const series = allSeries.find(s => s.id === seriesId);
    
    // Налаштування дизайну для різних серій (кольори, логотипи)
    const seriesStyles = {
        EC: {
            headerBg: '#10b981', // зелений
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#10b981',
            weightBorder: '#10b981',
            weightColor: '#10b981',
            noteColor: '#e63946',
            logoBg: '#fbbf24',
            logoText: '#10b981',
            seriesDisplay: 'EURECO EC'
        },
        CF: {
            headerBg: '#dc2626', // червоний
            headerBorder: '#fcd34d',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#dc2626',
            weightBorder: '#dc2626',
            weightColor: '#dc2626',
            noteColor: '#b91c1c',
            logoBg: '#fcd34d',
            logoText: '#dc2626',
            seriesDisplay: 'CARTOFLEX CF'
        },
        PLUV: {
            headerBg: '#2563eb', // синій
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#2563eb',
            weightBorder: '#2563eb',
            weightColor: '#2563eb',
            noteColor: '#fbbf24',
            logoBg: '#fbbf24',
            logoText: '#2563eb',
            seriesDisplay: 'UVIPLAST PLUV'
        },
        PLUV_LED: {
            headerBg: '#2563eb', // синій
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#2563eb',
            weightBorder: '#2563eb',
            weightColor: '#2563eb',
            noteColor: '#fbbf24',
            logoBg: '#fbbf24',
            logoText: '#2563eb',
            seriesDisplay: 'UVIPLAST PLUV LED'
        },
        SX: {
            headerBg: '#fbbf24', // жовтий
            headerBorder: '#000000',
            titleColor: '#1e1e1e', // темний текст
            subColor: '#1e1e1e',
            productNameColor: '#b45309',
            weightBorder: '#b45309',
            weightColor: '#b45309',
            noteColor: '#b91c1c',
            logoBg: '#000000',
            logoText: '#fbbf24',
            seriesDisplay: 'SICOTEX SX'
        },
        SPTN: {
            headerBg: '#7e22ce', // фіолетовий
            headerBorder: '#fcd34d',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#7e22ce',
            weightBorder: '#7e22ce',
            weightColor: '#7e22ce',
            noteColor: '#fbbf24',
            logoBg: '#fcd34d',
            logoText: '#7e22ce',
            seriesDisplay: 'SICOPLAST SPTN'
        },
        TPP: {
            headerBg: '#a78bfa', // світло-фіолетовий
            headerBorder: '#fbbf24',
            titleColor: '#1e1e1e',
            subColor: '#1e1e1e',
            productNameColor: '#6d28d9',
            weightBorder: '#6d28d9',
            weightColor: '#6d28d9',
            noteColor: '#b91c1c',
            logoBg: '#fbbf24',
            logoText: '#6d28d9',
            seriesDisplay: 'POLYPRO TPP'
        },
        AS: {
            headerBg: '#0e7a7a', // бірюзовий
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#0e7a7a',
            weightBorder: '#0e7a7a',
            weightColor: '#0e7a7a',
            noteColor: '#fbbf24',
            logoBg: '#fbbf24',
            logoText: '#0e7a7a',
            seriesDisplay: 'AQUASET AS'
        },
        NST: {
            headerBg: '#1e293b', // темно-синій
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#1e293b',
            weightBorder: '#1e293b',
            weightColor: '#1e293b',
            noteColor: '#e63946',
            logoBg: '#fbbf24',
            logoText: '#e63946',
            seriesDisplay: 'SICONYL NST'
        },
        QS: {
            headerBg: '#f97316', // оранжевий
            headerBorder: '#fcd34d',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#f97316',
            weightBorder: '#f97316',
            weightColor: '#f97316',
            noteColor: '#fcd34d',
            logoBg: '#fcd34d',
            logoText: '#f97316',
            seriesDisplay: 'QUICKSET QS'
        },
        SN: {
            headerBg: '#6b7280', // сірий
            headerBorder: '#fbbf24',
            titleColor: '#ffffff',
            subColor: '#ffffff',
            productNameColor: '#6b7280',
            weightBorder: '#6b7280',
            weightColor: '#6b7280',
            noteColor: '#fbbf24',
            logoBg: '#fbbf24',
            logoText: '#6b7280',
            seriesDisplay: 'SICONYL SN'
        }
    };
    
    // Вибираємо стиль для серії, якщо немає – використовуємо EC
    const style = seriesStyles[seriesId] || seriesStyles.EC;
    
    // Базові технічні дані
    let useText = '', aspectText = '', dryingText = '', remarkText = '', typeText = '';
    
    if (series && series.properties) {
        const props = series.properties;
        useText = props.type?.[lang] || props.type?.uk || '';
        aspectText = props.finish?.[lang] || props.finish?.uk || '';
        dryingText = props.drying?.[lang] || props.drying?.uk || '';
        
        // Спеціальні примітки
        if (seriesId === 'NST') {
            remarkText = 'Not wash resistant!';
        } else if (seriesId === 'SX') {
            typeText = props.type?.[lang] || props.type?.uk || '';
        } else if (props.special) {
            remarkText = props.special?.[lang] || props.special?.uk || '';
        }
    }
    
    // Формуємо HTML з динамічними стилями, але без зайвих блоків
    const labelHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Etykieta - ${utils.escapeHtml(recipe.name)}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
                width: ${labelWidth};
                height: ${labelHeight};
                margin: 0;
                padding: 0;
                background: #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', sans-serif;
            }
            @page {
                size: ${labelWidth} ${labelHeight};
                margin: 0;
            }
            .label {
                width: ${labelWidth};
                height: ${labelHeight};
                background: white;
                border-radius: 3mm;
                overflow: hidden;
                box-shadow: 0 2mm 5mm rgba(0,0,0,0.1);
                border: 0.3mm solid #ccc;
                display: flex;
                flex-direction: column;
                font-size: ${isSmall ? '3.2mm' : '3.5mm'};
            }
            .header {
                background: ${style.headerBg};
                color: white;
                padding: ${isSmall ? '2mm' : '3mm'};
                text-align: center;
                border-bottom: 0.5mm solid ${style.headerBorder};
            }
            .header .top-logo {
                font-size: ${isSmall ? '3mm' : '3.5mm'};
                font-weight: 500;
                letter-spacing: 1px;
                margin-bottom: 1mm;
                color: rgba(255,255,255,0.9);
            }
            .header h1 {
                font-size: ${isSmall ? '4.5mm' : '5.5mm'};
                font-weight: 800;
                text-transform: uppercase;
                margin-bottom: 1mm;
                color: ${style.titleColor};
                line-height: 1.2;
            }
            .header .sub {
                font-size: ${isSmall ? '2.5mm' : '3mm'};
                font-weight: 500;
                color: ${style.subColor};
            }
            .product-info {
                padding: ${isSmall ? '2mm' : '3mm'};
                background: #f9fafb;
                flex: 1;
            }
            .product-name {
                font-size: ${isSmall ? '5mm' : '6mm'};
                font-weight: 700;
                color: ${style.productNameColor};
                margin-bottom: 1mm;
                line-height: 1.2;
            }
            .product-meta {
                display: flex;
                justify-content: space-between;
                font-size: ${isSmall ? '2.2mm' : '2.8mm'};
                color: #000000;
                margin-bottom: 2mm;
            }
            .weight-box {
                background: white;
                border: 0.5mm solid ${style.weightBorder};
                border-radius: 5mm;
                padding: ${isSmall ? '2mm' : '3mm'};
                text-align: center;
                margin: 3mm 0;
                font-size: ${isSmall ? '6mm' : '7mm'};
                font-weight: 800;
                color: ${style.weightColor};
                display: inline-block;
                min-width: ${isSmall ? '40mm' : '50mm'};
            }
            .weight-box span {
                font-size: ${isSmall ? '3mm' : '4mm'};
                font-weight: 500;
                color: ${style.weightColor};
            }
            .tech-data {
                margin-top: 2mm;
                font-size: ${isSmall ? '2.5mm' : '3mm'};
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 2mm;
                color: #e63946; /* червоний колір для технічних даних */
            }
            .tech-item {
                margin-bottom: 1mm;
                line-height: 1.4;
            }
            .tech-item strong {
                color: ${style.productNameColor};
                font-weight: 600;
                display: inline-block;
                min-width: ${isSmall ? '15mm' : '20mm'};
            }
            .remark {
                color: ${style.noteColor};
                font-weight: 600;
                margin-top: 1mm;
                font-style: italic;
            }
            .note-section {
                margin: ${isSmall ? '2mm' : '3mm'};
                font-size: ${isSmall ? '2.2mm' : '2.8mm'};
                color: #000000;
                text-align: center;
                font-weight: 500;
                border-top: 0.3mm dashed #9ca3af;
                padding-top: ${isSmall ? '2mm' : '3mm'};
            }
        </style>
    </head>
    <body>
        <div class="label">
            <div class="header">
                <div class="top-logo">SICO Screen Inks</div>
                <h1>${style.seriesDisplay}</h1>
                <div class="sub">${utils.escapeHtml(recipe.series)} / ${i18n.translateCategoryName(recipe.category)}</div>
            </div>

            <div class="product-info">
                <div class="product-name">${utils.escapeHtml(recipe.name)}</div>
                <div class="product-meta">
                    <span>Data: ${date}</span>
                    <span>Nr partii: ${recipe.id.substring(0,8).toUpperCase()}</span>
                </div>

                <div style="text-align: center;">
                    <div class="weight-box">
                        ${weightKg.toFixed(2).replace('.', ',')} <span>kg</span>
                    </div>
                </div>
                
                <!-- Технічні дані серії (червоним) -->
                <div class="tech-data">
                    ${useText ? `<div class="tech-item"><strong>Use:</strong> ${utils.escapeHtml(useText)}</div>` : ''}
                    ${typeText ? `<div class="tech-item"><strong>Type:</strong> ${utils.escapeHtml(typeText)}</div>` : ''}
                    ${aspectText ? `<div class="tech-item"><strong>Aspect:</strong> ${utils.escapeHtml(aspectText)}</div>` : ''}
                    ${dryingText ? `<div class="tech-item"><strong>Drying:</strong> ${utils.escapeHtml(dryingText)}</div>` : ''}
                    ${remarkText ? `<div class="remark">${utils.escapeHtml(remarkText)}</div>` : ''}
                </div>
            </div>

            <!-- Примітка перед друком (окремий блок після технічних даних) -->
            <div class="note-section">
                PRZED DRUKIEM NAKŁADU ZALECAMY SPRAWDZENIE ZGODNOŚCI KOLORYSTYCZNEJ.
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
    if (app.dom.saveRecipeBtn) {
        app.dom.saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe"></span>`;
        i18n.applyTranslations();
    }
    app.switchPage('new-recipe');
    utils.showNotification(`"${utils.escapeHtml(recipe.name)}" ${i18n.t('edit')}`, 'info');
}

async function scanRecipeFromPhoto() {
    const seriesSelect = document.getElementById('recipeSeries');
    if (!seriesSelect || !seriesSelect.value) {
        utils.showNotification(i18n.t('select_series_first'), 'warning');
        return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';

    input.onchange = async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        utils.showNotification(i18n.t('scanning_recipe'), 'info', 0);

        try {
            const { data: { text } } = await Tesseract.recognize(
                file,
                'ukr+eng',
                { 
                    logger: m => console.log(m),
                    tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеєжзиіїйклмнопрстуфхцчшщьюя -+.,'
                }
            );

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

            utils.hideNotification();

            if (foundIngredients.length === 0) {
                utils.showNotification(i18n.t('scan_no_paints'), 'warning');
                return;
            }

            let message = '';
            foundIngredients.forEach(ing => {
                const paint = paintCatalog.find(p => String(p.id) === String(ing.paintId));
                if (paint) {
                    message += `\n• ${paint.name} – ${ing.amount} ${ing.unit}`;
                }
            });

            utils.showConfirmation(
                i18n.t('scan_success', { count: foundIngredients.length }),
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
                    
                    if (window.SICOMIX?.app?.renderPantoneCatalog) window.SICOMIX.app.renderPantoneCatalog();
                    if (window.SICOMIX?.app?.renderRalCatalog) window.SICOMIX.app.renderRalCatalog();
                    
                    utils.showNotification(i18n.t('paint_added_to_recipe'), 'success');
                },
                () => {}
            );

        } catch (error) {
            console.error('Помилка сканування:', error);
            utils.hideNotification();
            utils.showNotification(i18n.t('scan_error'), 'error');
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

function attachRecipeEventListeners() {
    const dom = app.dom;
    if (dom.addIngredientBtn) {
        dom.addIngredientBtn.addEventListener('click', addIngredient);
    }
    if (dom.scanRecipeBtn) {
        dom.scanRecipeBtn.addEventListener('click', scanRecipeFromPhoto);
    }
    if (dom.saveRecipeBtn) {
        dom.saveRecipeBtn.addEventListener('click', saveRecipe);
    }
    if (dom.clearRecipeBtn) {
        dom.clearRecipeBtn.addEventListener('click', clearRecipeForm);
    }
    if (dom.importRecipesBtn) {
        dom.importRecipesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            importRecipes();
        });
    }
    if (dom.exportRecipesBtn) {
        dom.exportRecipesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportAllRecipes();
        });
    }
    if (dom.printRecipesBtn) {
        dom.printRecipesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            printRecipes();
        });
    }
    if (dom.deleteSelectedRecipesBtn) {
        dom.deleteSelectedRecipesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteSelectedRecipes();
        });
    }
}

// Експорт функцій
export {
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
};

// Для зворотної сумісності додаємо до глобального SICOMIX.app
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.app = window.SICOMIX.app || {};
Object.assign(window.SICOMIX.app, {
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
