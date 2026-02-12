if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.app = (function() {
    // Стан
    let recipes = [];
    let paintCatalog = [];
    let selectedIngredients = [];
    let selectedRecipes = [];
    let currentSettings = {};
    let isEditingRecipe = false;
    let editingRecipeId = null;

    // DOM елементи
    let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
    let navLinks, pageContents, totalPaintsEl, headerPaintCount;
    let colorPreview, recipeColor, ingredientsList, paintSearch, categoryFilter;
    let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
    let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
    let paintCatalogEl, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
    let languageSelect, unitsSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;
    let actionCards;

    function cacheDOMElements() {
        sidebar = document.getElementById('sidebar');
        menuToggle = document.getElementById('menuToggle');
        desktopMenuToggle = document.getElementById('desktopMenuToggle');
        closeSidebar = document.getElementById('closeSidebar');
        mainContainer = document.getElementById('mainContainer');
        navLinks = document.querySelectorAll('.nav-link');
        pageContents = document.querySelectorAll('.page-content');
        totalPaintsEl = document.getElementById('totalPaints');
        headerPaintCount = document.getElementById('headerPaintCount');
        colorPreview = document.getElementById('colorPreview');
        recipeColor = document.getElementById('recipeColor');
        ingredientsList = document.getElementById('ingredientsList');
        paintSearch = document.getElementById('paintSearch');
        categoryFilter = document.getElementById('categoryFilter');
        addIngredientBtn = document.getElementById('addIngredientBtn');
        saveRecipeBtn = document.getElementById('saveRecipeBtn');
        clearRecipeBtn = document.getElementById('clearRecipeBtn');
        calculatePercentagesBtn = document.getElementById('calculatePercentagesBtn');
        recipesContainer = document.getElementById('recipesContainer');
        exportRecipesBtn = document.getElementById('exportRecipesBtn');
        importRecipesBtn = document.getElementById('importRecipesBtn');
        printRecipesBtn = document.getElementById('printRecipesBtn');
        deleteSelectedRecipesBtn = document.getElementById('deleteSelectedRecipesBtn');
        paintCatalogEl = document.getElementById('paintCatalog');
        addNewPaintBtn = document.getElementById('addNewPaintBtn');
        addPaintModal = document.getElementById('addPaintModal');
        closePaintModal = document.getElementById('closePaintModal');
        savePaintBtn = document.getElementById('savePaintBtn');
        cancelPaintBtn = document.getElementById('cancelPaintBtn');
        actionCards = document.querySelectorAll('.action-card');
        languageSelect = document.getElementById('languageSelect');
        unitsSelect = document.getElementById('unitsSelect');
        autoSaveCheckbox = document.getElementById('autoSaveCheckbox');
        backupCheckbox = document.getElementById('backupCheckbox');
        saveSettingsBtn = document.getElementById('saveSettingsBtn');
        resetSettingsBtn = document.getElementById('resetSettingsBtn');
        clearAllDataBtn = document.getElementById('clearAllDataBtn');
    }

    function loadData() {
        recipes = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipes', SICOMIX.data.recipes);
        paintCatalog = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumPaints', SICOMIX.data.paints);
        currentSettings = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumSettings', SICOMIX.data.defaultSettings);
    }

    function saveData() {
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumPaints', paintCatalog);
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
    }

    function initSettings() {
        if (unitsSelect) unitsSelect.value = currentSettings.units || 'grams';
        if (autoSaveCheckbox) autoSaveCheckbox.checked = currentSettings.autoSave !== false;
        if (backupCheckbox) backupCheckbox.checked = currentSettings.backup === true;
        if (languageSelect) languageSelect.value = SICOMIX.i18n.getLanguage();
    }

   function setupEventListeners() {
    // Навігація
    if (menuToggle) menuToggle.addEventListener('click', () => { sidebar.classList.add('active'); document.body.style.overflow = 'hidden'; });
    if (desktopMenuToggle) desktopMenuToggle.addEventListener('click', () => {
        if (window.innerWidth <= 992) { sidebar.classList.add('active'); document.body.style.overflow = 'hidden'; }
        else { sidebar.classList.add('active'); mainContainer.classList.add('sidebar-open'); }
    });
    if (closeSidebar) closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active'); mainContainer.classList.remove('sidebar-open'); document.body.style.overflow = 'auto';
    });
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(link.getAttribute('data-page'));
        if (window.innerWidth <= 992) { sidebar.classList.remove('active'); document.body.style.overflow = 'auto'; }
    }));
    actionCards.forEach(card => card.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(card.getAttribute('data-page'));
    }));

    // Колір пікер
    if (recipeColor && colorPreview) {
        recipeColor.addEventListener('input', () => colorPreview.style.background = recipeColor.value);
    }

    // Фото
    const recipePhoto = document.getElementById('recipePhoto');
    if (recipePhoto) {
        recipePhoto.addEventListener('change', function() {
            const fileName = this.files[0]?.name || SICOMIX.i18n.t('upload_photo');
            document.getElementById('fileName').textContent = fileName;
        });
    }

    // Новий рецепт
    if (addIngredientBtn) addIngredientBtn.addEventListener('click', addIngredient);
    if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', saveRecipe);
    if (clearRecipeBtn) clearRecipeBtn.addEventListener('click', clearRecipeForm);
    if (calculatePercentagesBtn) calculatePercentagesBtn.addEventListener('click', calculatePercentages);

    // Рецепти
    if (exportRecipesBtn) exportRecipesBtn.addEventListener('click', exportAllRecipes);
    if (importRecipesBtn) importRecipesBtn.addEventListener('click', importRecipes);
    if (printRecipesBtn) printRecipesBtn.addEventListener('click', printRecipes);
    if (deleteSelectedRecipesBtn) deleteSelectedRecipesBtn.addEventListener('click', deleteSelectedRecipes);

    // Каталог
    if (addNewPaintBtn) addNewPaintBtn.addEventListener('click', addNewPaint);
    if (closePaintModal) closePaintModal.addEventListener('click', () => { addPaintModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
    if (cancelPaintBtn) cancelPaintBtn.addEventListener('click', () => { addPaintModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
    if (savePaintBtn) savePaintBtn.addEventListener('click', saveNewPaint);

    // Пошук (debounce)
    if (paintSearch) paintSearch.addEventListener('input', SICOMIX.utils.debounce(renderIngredientsList, 300));
    if (categoryFilter) categoryFilter.addEventListener('change', renderIngredientsList);

    // Налаштування
    if (languageSelect) languageSelect.addEventListener('change', function() { currentSettings.language = this.value; saveData(); });
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
    if (resetSettingsBtn) resetSettingsBtn.addEventListener('click', resetSettings);
    if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);

    // Клавіатура
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveRecipeBtn?.click(); }
        if (e.key === 'Escape') {
            if (sidebar.classList.contains('active') && window.innerWidth <= 992) sidebar.classList.remove('active');
            if (addPaintModal?.classList.contains('active')) addPaintModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ========== ЗАКРИТТЯ САЙДБАРУ ТІЛЬКИ НА МОБІЛЬНОМУ ==========
    window.addEventListener('click', function(e) {
        // Працює тільки коли ширина екрана <= 992px (мобільні/планшети)
        if (window.innerWidth > 992) return;
        
        const isSidebarActive = sidebar?.classList.contains('active');
        if (!isSidebarActive) return;

        // Елементи, клік на які НЕ закриває сайдбар
        const isClickOnSidebar = sidebar.contains(e.target);
        const isClickOnMenuToggle = menuToggle?.contains(e.target) || desktopMenuToggle?.contains(e.target);
        const isClickOnCloseBtn = closeSidebar?.contains(e.target);

        if (!isClickOnSidebar && !isClickOnMenuToggle && !isClickOnCloseBtn) {
            sidebar.classList.remove('active');
            mainContainer?.classList.remove('sidebar-open');
            document.body.style.overflow = 'auto';
        }
    });
}

    // ========== НАВІГАЦІЯ ==========
    function switchPage(pageId) {
        if (isEditingRecipe && pageId !== 'new-recipe') resetEditMode();
        pageContents.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(`${pageId}-page`);
        if (target) {
            target.classList.add('active');
            if (pageId === 'recipes') renderRecipes();
            if (pageId === 'catalog') renderPaintCatalog();
            if (pageId === 'new-recipe' && !isEditingRecipe) clearRecipeForm();
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) link.classList.add('active');
        });
    }

    // ========== НОВИЙ РЕЦЕПТ ==========
    function renderIngredientsList() {
        if (!ingredientsList) return;
        if (selectedIngredients.length === 0) {
            ingredientsList.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px;">
                <i class="fas fa-palette" style="font-size:32px; opacity:0.5;"></i><br>
                <span>${SICOMIX.i18n.t('paints_not_found')}</span>
            </td></tr>`;
            return;
        }

        let html = '';
        selectedIngredients.forEach((ing, idx) => {
            const paint = paintCatalog.find(p => p.id === ing.paintId);
            if (!paint) return;
            html += `<tr>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:24px; height:24px; background:${paint.color}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                        <div>
                            <div style="font-weight:600;">${paint.name}</div>
                            <div style="font-size:12px; color:var(--text-secondary);">${paint.category}</div>
                        </div>
                    </div>
                </td>
                <td><input type="number" class="input-small" value="${ing.amount}" data-index="${idx}" data-field="amount" min="0" step="0.1"></td>
                <td>
                    <select class="unit-select" data-index="${idx}" data-field="unit">
                        <option value="г" ${ing.unit === 'г' ? 'selected' : ''}>г</option>
                        <option value="кг" ${ing.unit === 'кг' ? 'selected' : ''}>кг</option>
                        <option value="мл" ${ing.unit === 'мл' ? 'selected' : ''}>мл</option>
                        <option value="л" ${ing.unit === 'л' ? 'selected' : ''}>л</option>
                    </select>
                </td>
                <td><input type="number" class="input-small" value="${ing.percentage || 0}" readonly> %</td>
                <td><button class="btn-icon delete-ingredient" data-index="${idx}"><i class="fas fa-trash"></i></button></td>
            </tr>`;
        });
        ingredientsList.innerHTML = html;

        ingredientsList.querySelectorAll('input, select').forEach(el => el.addEventListener('change', handleIngredientChange));
        ingredientsList.querySelectorAll('.delete-ingredient').forEach(btn => btn.addEventListener('click', function() {
            deleteIngredient(parseInt(this.dataset.index));
        }));
    }

    function handleIngredientChange(e) {
        const idx = parseInt(e.target.dataset.index);
        const field = e.target.dataset.field;
        if (idx >= 0 && idx < selectedIngredients.length) {
            selectedIngredients[idx][field] = field === 'amount' ? parseFloat(e.target.value) || 0 : e.target.value;
            if (field === 'amount') calculatePercentages();
        }
    }

    function addIngredient() {
        const term = paintSearch?.value.toLowerCase() || '';
        const cat = categoryFilter?.value || '';
        let filtered = paintCatalog;
        if (term) filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
        if (cat) filtered = filtered.filter(p => p.category === cat);
        if (filtered.length === 0) {
            showNotification(SICOMIX.i18n.t('paints_not_found'), 'error');
            return;
        }
        showPaintSelectionModal(filtered);
    }

    function showPaintSelectionModal(paints) {
        const modal = document.getElementById('paintSelectionModal');
        const list = document.getElementById('paintSelectionList');
        list.innerHTML = paints.map(p => `
            <div class="paint-selection-card" data-id="${p.id}">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:32px; height:32px; background:${p.color}; border-radius:8px;"></div>
                    <div><strong>${p.name}</strong><br><span style="font-size:12px;">${p.category}</span></div>
                </div>
            </div>
        `).join('');
        modal.classList.add('active');
        list.querySelectorAll('.paint-selection-card').forEach(card => {
            card.addEventListener('click', function() {
                const pid = parseInt(this.dataset.id);
                if (selectedIngredients.some(ing => ing.paintId === pid)) {
                    showNotification(SICOMIX.i18n.t('paint_already_added'), 'warning');
                } else {
                    selectedIngredients.push({ paintId: pid, amount: 100, unit: 'г', percentage: 0 });
                    calculatePercentages();
                    renderIngredientsList();
                    showNotification(SICOMIX.i18n.t('paint_added_to_recipe'), 'success');
                }
                modal.classList.remove('active');
            });
        });
        modal.querySelector('.close-paint-selection')?.addEventListener('click', () => modal.classList.remove('active'));
    }

    function deleteIngredient(index) {
        if (index >= 0) {
            selectedIngredients.splice(index, 1);
            calculatePercentages();
            renderIngredientsList();
        }
    }

    function calculatePercentages() {
        selectedIngredients = SICOMIX.utils.calculateIngredientPercentages(selectedIngredients);
        renderIngredientsList();
    }

    function saveRecipe() {
        const name = document.getElementById('recipeName')?.value.trim();
        const cat = document.getElementById('recipeCategory')?.value;
        const color = document.getElementById('recipeColor')?.value;
        const desc = document.getElementById('recipeDescription')?.value.trim();

        if (!name || !cat || selectedIngredients.length === 0) {
            showNotification(SICOMIX.i18n.t('fill_required_fields'), 'error');
            return;
        }

        if (isEditingRecipe && editingRecipeId) {
            const idx = recipes.findIndex(r => r.id === editingRecipeId);
            if (idx !== -1) {
                recipes[idx] = { ...recipes[idx], name, category: cat, color, description: desc, ingredients: [...selectedIngredients], date: new Date().toLocaleDateString('uk-UA') };
                saveData();
                showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`, 'success');
                resetEditMode();
            }
        } else {
            const newRecipe = {
                id: SICOMIX.utils.generateId(),
                name, category: cat, color, description: desc,
                ingredients: [...selectedIngredients],
                date: new Date().toLocaleDateString('uk-UA'),
                photo: null
            };
            recipes.push(newRecipe);
            saveData();
            showNotification(`${SICOMIX.i18n.t('recipe_saved')} "${name}"`, 'success');
        }
        clearRecipeForm();
        switchPage('recipes');
    }

    function clearRecipeForm() {
        document.getElementById('recipeName').value = '';
        document.getElementById('recipeCategory').value = '';
        if (recipeColor) recipeColor.value = '#3a86ff';
        if (colorPreview) colorPreview.style.background = '#3a86ff';
        document.getElementById('recipeDescription').value = '';
        selectedIngredients = [];
        renderIngredientsList();
        resetEditMode();
    }

    function resetEditMode() {
        isEditingRecipe = false;
        editingRecipeId = null;
        if (saveRecipeBtn) {
            saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="save_recipe"></span>`;
            SICOMIX.i18n.applyTranslations();
        }
    }

    // ========== РЕЦЕПТИ ==========
    function renderRecipes() {
        if (!recipesContainer) return;
        const search = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
        const cat = document.getElementById('recipeCategoryFilter')?.value || '';
        let filtered = recipes;
        if (search) filtered = filtered.filter(r => r.name.toLowerCase().includes(search) || (r.description && r.description.toLowerCase().includes(search)));
        if (cat) filtered = filtered.filter(r => r.category === cat);

        if (filtered.length === 0) {
            recipesContainer.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('no_recipes')}</p>`;
            return;
        }

        recipesContainer.innerHTML = filtered.map(r => {
            const total = r.ingredients.reduce((s, i) => s + (i.amount || 0), 0);
            return `<div class="recipe-card" data-id="${r.id}">
                <div class="recipe-image" style="background: linear-gradient(145deg, ${r.color}80, ${r.color});">
                    <i class="fas fa-palette"></i>
                </div>
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div><h3 class="recipe-title">${r.name}</h3><span class="recipe-category">${r.category}</span></div>
                        <div class="recipe-select-container">
                            <input type="checkbox" class="recipe-select" value="${r.id}" ${selectedRecipes.includes(r.id) ? 'checked' : ''}>
                            <span>${SICOMIX.i18n.t('select')}</span>
                        </div>
                    </div>
                    <p class="recipe-description">${r.description || SICOMIX.i18n.t('no_description')}</p>
                    <div class="recipe-meta">
                        <div><span style="font-size:12px;">${SICOMIX.i18n.t('ingredients_count')}</span><br><strong>${r.ingredients.length}</strong></div>
                        <div><span style="font-size:12px;">${SICOMIX.i18n.t('total_weight')}</span><br><strong>${total} г</strong></div>
                        <div><span style="font-size:12px;">${SICOMIX.i18n.t('date')}</span><br><strong>${r.date}</strong></div>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn edit-recipe"><i class="fas fa-edit"></i> ${SICOMIX.i18n.t('edit')}</button>
                        <button class="recipe-btn delete-recipe"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>
                        <button class="recipe-btn export-recipe"><i class="fas fa-download"></i> ${SICOMIX.i18n.t('export')}</button>
                    </div>
                </div>
            </div>`;
        }).join('');

        // Event listeners
        recipesContainer.querySelectorAll('.edit-recipe').forEach(btn => btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.recipe-card').dataset.id);
            editRecipe(id);
        }));
        recipesContainer.querySelectorAll('.delete-recipe').forEach(btn => btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.recipe-card').dataset.id);
            deleteRecipe(id);
        }));
        recipesContainer.querySelectorAll('.export-recipe').forEach(btn => btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.recipe-card').dataset.id);
            exportRecipe(id);
        }));
        recipesContainer.querySelectorAll('.recipe-select').forEach(cb => cb.addEventListener('change', function() {
            const id = parseInt(this.value);
            if (this.checked) { if (!selectedRecipes.includes(id)) selectedRecipes.push(id); }
            else { selectedRecipes = selectedRecipes.filter(v => v !== id); }
        }));
    }

    function deleteRecipe(id) {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_recipe'),
            SICOMIX.i18n.t('delete_recipe_confirmation'),
            () => {
                recipes = recipes.filter(r => r.id !== id);
                selectedRecipes = selectedRecipes.filter(rid => rid !== id);
                saveData();
                renderRecipes();
                showNotification(SICOMIX.i18n.t('recipe_deleted'), 'success');
            }
        );
    }

    function deleteSelectedRecipes() {
        if (selectedRecipes.length === 0) {
            showNotification(SICOMIX.i18n.t('select_recipes_to_delete'), 'warning');
            return;
        }
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_recipes'),
            `${SICOMIX.i18n.t('delete_recipes_confirmation')} ${selectedRecipes.length} ${SICOMIX.i18n.t('recipes')}?`,
            () => {
                recipes = recipes.filter(r => !selectedRecipes.includes(r.id));
                selectedRecipes = [];
                saveData();
                renderRecipes();
                showNotification(`${SICOMIX.i18n.t('deleted')} ${selectedRecipes.length}`, 'success');
            }
        );
    }

    function exportRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (recipe) {
            SICOMIX.utils.exportToFile(recipe, `${recipe.name.replace(/\s+/g, '_')}.json`);
            showNotification(`${SICOMIX.i18n.t('recipe_exported')}`, 'success');
        }
    }

    function exportAllRecipes() {
        if (recipes.length === 0) {
            showNotification(SICOMIX.i18n.t('no_recipes_to_export'), 'warning');
            return;
        }
        SICOMIX.utils.exportToFile(recipes, `sico_spectrum_recipes_${new Date().toISOString().split('T')[0]}.json`);
        showNotification(`${SICOMIX.i18n.t('exported')} ${recipes.length} ${SICOMIX.i18n.t('recipes')}`, 'success');
    }

    function importRecipes() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
                try {
                    const imported = JSON.parse(ev.target.result);
                    const arr = Array.isArray(imported) ? imported : [imported];
                    SICOMIX.utils.showConfirmation(
                        SICOMIX.i18n.t('import_recipes'),
                        `${SICOMIX.i18n.t('found_recipes')} ${arr.length}. ${SICOMIX.i18n.t('import_confirm')}`,
                        () => {
                            arr.forEach(r => { r.id = SICOMIX.utils.generateId(); recipes.push(r); });
                            saveData();
                            renderRecipes();
                            showNotification(`${SICOMIX.i18n.t('imported')} ${arr.length}`, 'success');
                        }
                    );
                } catch (err) {
                    showNotification(SICOMIX.i18n.t('invalid_file_format'), 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function printRecipes() {
        const win = window.open('', '_blank');
        win.document.write(`<html><head><title>${SICOMIX.i18n.t('print_recipes')}</title><style>body{font-family:Inter,sans-serif;padding:20px;background:#0a0c0f;color:#f0f4f8;}</style></head><body><h1>SICO Spectrum</h1><p>${SICOMIX.i18n.t('print_date')}: ${new Date().toLocaleDateString()}</p>${recipes.map(r => `<div style="margin-bottom:30px;"><h2>${r.name}</h2><p>${r.description || ''}</p></div>`).join('')}</body></html>`);
        win.document.close();
        win.print();
    }

    // ========== КАТАЛОГ ==========
    function renderPaintCatalog() {
        if (!paintCatalogEl) return;
        const search = document.getElementById('catalogSearch')?.value.toLowerCase() || '';
        let filtered = paintCatalog;
        if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || (p.category && p.category.toLowerCase().includes(search)));

        if (filtered.length === 0) {
            paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px;">${SICOMIX.i18n.t('catalog_empty')}</p>`;
            return;
        }

        paintCatalogEl.innerHTML = filtered.map(p => `
            <div class="recipe-card">
                <div class="recipe-image" style="background:${p.color};"></div>
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div><h3 class="recipe-title">${p.name}</h3><span class="recipe-category">${p.category}</span></div>
                    </div>
                    <div style="margin-bottom:15px;">
                        <div style="display:flex; gap:15px;">
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('manufacturer')}</span><br><strong>${p.manufacturer || 'SICO'}</strong></div>
                            <div><span style="font-size:12px;">${SICOMIX.i18n.t('article')}</span><br><strong>${p.article || '—'}</strong></div>
                        </div>
                        <p style="color:var(--text-secondary);">${p.description || SICOMIX.i18n.t('no_description')}</p>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn delete-paint" data-id="${p.id}"><i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}</button>
                    </div>
                </div>
            </div>
        `).join('');

        paintCatalogEl.querySelectorAll('.delete-paint').forEach(btn => btn.addEventListener('click', () => {
            deletePaint(parseInt(btn.dataset.id));
        }));
        updatePaintCount();
    }

    function addNewPaint() {
        document.getElementById('paintName').value = '';
        document.getElementById('paintCategory').value = '';
        document.getElementById('paintColorCode').value = '#3a86ff';
        document.getElementById('paintDescription').value = '';
        document.getElementById('paintManufacturer').value = 'SICO';
        document.getElementById('paintArticle').value = '';
        addPaintModal.classList.add('active');
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
            showNotification('Будь ласка, заповніть обов\'язкові поля', 'error');
            return;
        }

        const newPaint = {
            id: SICOMIX.utils.generateId(),
            name, category: cat, color, description: desc, manufacturer: mfr, article: art
        };
        paintCatalog.push(newPaint);
        saveData();
        addPaintModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        renderPaintCatalog();
        showNotification(`${SICOMIX.i18n.t('paint_added')} "${name}"`, 'success');
    }

    function deletePaint(id) {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_paint'),
            SICOMIX.i18n.t('delete_paint_confirmation'),
            () => {
                paintCatalog = paintCatalog.filter(p => p.id !== id);
                saveData();
                renderPaintCatalog();
                showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
            }
        );
    }

    function updatePaintCount() {
        const count = paintCatalog.length;
        if (totalPaintsEl) totalPaintsEl.textContent = count;
        if (headerPaintCount) headerPaintCount.textContent = count;
    }

    // ========== РЕДАГУВАННЯ ==========
    function editRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) return;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('recipeColor').value = recipe.color;
        colorPreview.style.background = recipe.color;
        document.getElementById('recipeDescription').value = recipe.description || '';
        selectedIngredients = [...recipe.ingredients];
        renderIngredientsList();
        isEditingRecipe = true;
        editingRecipeId = id;
        saveRecipeBtn.innerHTML = `<i class="fas fa-save"></i> <span data-i18n="update_recipe"></span>`;
        SICOMIX.i18n.applyTranslations();
        switchPage('new-recipe');
        showNotification(`"${recipe.name}" ${SICOMIX.i18n.t('edit')}`, 'info');
    }

    // ========== НАЛАШТУВАННЯ ==========
    function saveSettings() {
        currentSettings = {
            language: languageSelect.value,
            units: unitsSelect.value,
            autoSave: autoSaveCheckbox.checked,
            backup: backupCheckbox.checked,
            theme: 'dark',
            notifications: true,
            defaultCategory: 'Standard',
            defaultUnit: 'г',
            calculationsPrecision: 2
        };
        saveData();
        showNotification(SICOMIX.i18n.t('save_settings'), 'success');
        if (SICOMIX.i18n.getLanguage() !== languageSelect.value) {
            SICOMIX.i18n.setLanguage(languageSelect.value);
            location.reload();
        }
    }

    function resetSettings() {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('reset_defaults'),
            SICOMIX.i18n.t('confirmation_message'),
            () => {
                currentSettings = SICOMIX.data.defaultSettings;
                saveData();
                initSettings();
                showNotification(SICOMIX.i18n.t('reset_defaults'), 'success');
            }
        );
    }

    function clearAllData() {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('clear_all_data'),
            'УВАГА! Це видалить всі рецепти та фарби. Дія незворотна.',
            () => {
                recipes = [];
                paintCatalog = [...SICOMIX.data.paints];
                selectedIngredients = [];
                selectedRecipes = [];
                saveData();
                renderRecipes();
                renderPaintCatalog();
                showNotification(SICOMIX.i18n.t('clear_all_data'), 'success');
            }
        );
    }

    // ========== ІНІЦІАЛІЗАЦІЯ ==========
    function initApp() {
        cacheDOMElements();
        loadData();
        initSettings();
        setupEventListeners();
        updatePaintCount();
        renderPaintCatalog();
        renderRecipes();
        renderIngredientsList();
        populateCategoryFilters();
        if (window.innerWidth > 992) { sidebar.classList.add('active'); mainContainer.classList.add('sidebar-open'); }
        document.getElementById('preloader')?.style.setProperty('opacity', '0');
        setTimeout(() => document.getElementById('preloader')?.remove(), 500);
        showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
    }

    function populateCategoryFilters() {
        const cats = SICOMIX.data.categories;
        const selects = [document.getElementById('recipeCategory'), document.getElementById('paintCategory'), document.getElementById('categoryFilter'), document.getElementById('recipeCategoryFilter')];
        selects.forEach(sel => {
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = `<option value="" data-i18n="select_category">${SICOMIX.i18n.t('select_category')}</option>`;
            cats.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                sel.appendChild(opt);
            });
            if (current && cats.includes(current)) sel.value = current;
        });
        SICOMIX.i18n.applyTranslations();
    }

    function showNotification(msg, type, dur) {
        SICOMIX.utils.showNotification(msg, type, dur);
    }

    return {
        init: initApp,
        deleteRecipe,
        exportRecipe,
        editRecipe,
        deletePaint,
        showNotification
    };
})();

window.SICOMIX = SICOMIX;
