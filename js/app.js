/* ==========================================
   SICO MIX — CORE APPLICATION ENGINE
========================================== */

window.SICOMIX = window.SICOMIX || {};

SICOMIX.app = (() => {

    /* ================= STATE ================= */

    const STORAGE = {
        RECIPES: 'sicomix_recipes',
        PAINTS: 'sicomix_paints',
        SETTINGS: 'sicomix_settings'
    };

    let state = {
        recipes: [],
        paints: [],
        settings: {}
    };

    /* ================= INIT ================= */

    function init() {

        loadState();

        bindNavigation();
        bindRecipeActions();
        bindPaintActions();
        bindExportImport();

        refreshUI();

        console.log("SICO MIX APP INIT ✔");
    }

    /* ================= STATE ================= */

    function loadState() {
        state.recipes = SICOMIX.utils.storage.load(STORAGE.RECIPES) || [];
        state.paints = SICOMIX.utils.storage.load(STORAGE.PAINTS) || [];
        state.settings = SICOMIX.utils.storage.load(STORAGE.SETTINGS) || {};
    }

    function saveState() {
        SICOMIX.utils.storage.save(STORAGE.RECIPES, state.recipes);
        SICOMIX.utils.storage.save(STORAGE.PAINTS, state.paints);
        SICOMIX.utils.storage.save(STORAGE.SETTINGS, state.settings);
    }

    /* ================= NAVIGATION ================= */

    function bindNavigation() {

        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                showPage(link.dataset.page);
            });
        });
    }

    function showPage(page) {

        document.querySelectorAll('.page-content')
            .forEach(p => p.classList.remove('active'));

        const el = document.getElementById(`${page}-page`);
        if (el) el.classList.add('active');
    }

    /* ================= RECIPES ================= */

    function bindRecipeActions() {

        const saveBtn = document.getElementById('saveRecipeBtn');
        if (!saveBtn) return;

        saveBtn.addEventListener('click', saveRecipe);
    }

    function saveRecipe() {

        const name = document.getElementById('recipeName').value;

        if (!name) {
            SICOMIX.utils.showNotification("Вкажіть назву", "error");
            return;
        }

        const recipe = {
            id: SICOMIX.utils.generateId(),
            name,
            date: Date.now()
        };

        state.recipes.push(recipe);
        saveState();
        renderRecipes();

        SICOMIX.utils.showNotification("Рецепт збережено ✔");
    }

    function renderRecipes() {

        const container = document.getElementById('recipesContainer');
        if (!container) return;

        container.innerHTML = '';

        state.recipes.forEach(r => {

            const card = document.createElement('div');
            card.className = 'recipe-card';

            card.innerHTML = `
                <h3>${r.name}</h3>
                <small>${SICOMIX.utils.formatDate(r.date)}</small>
            `;

            container.appendChild(card);
        });
    }

    /* ================= PAINT CATALOG ================= */

    function bindPaintActions() {

        const savePaint = document.getElementById('savePaintBtn');
        if (!savePaint) return;

        savePaint.addEventListener('click', addPaint);
    }

    function addPaint() {

        const name = document.getElementById('paintName').value;
        if (!name) return;

        const paint = {
            id: SICOMIX.utils.generateId(),
            name
        };

        state.paints.push(paint);
        saveState();
        renderPaints();

        SICOMIX.utils.closeModal('addPaintModal');
        SICOMIX.utils.showNotification("Фарбу додано ✔");
    }

    function renderPaints() {

        const catalog = document.getElementById('paintCatalog');
        if (!catalog) return;

        catalog.innerHTML = '';

        state.paints.forEach(p => {

            const card = document.createElement('div');
            card.className = 'recipe-card';

            card.innerHTML = `<h3>${p.name}</h3>`;

            catalog.appendChild(card);
        });

        updatePaintCounters();
    }

    function updatePaintCounters() {
        const total = state.paints.length;

        const a = document.getElementById('totalPaints');
        const b = document.getElementById('headerPaintCount');

        if (a) a.textContent = total;
        if (b) b.textContent = total;
    }

    /* ================= IMPORT / EXPORT ================= */

    function bindExportImport() {

        const exportBtn = document.getElementById('startExportBtn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {

                const data = {
                    recipes: state.recipes,
                    paints: state.paints
                };

                SICOMIX.utils.exportToFile(
                    data,
                    'sicomix-export.json'
                );

                SICOMIX.utils.showNotification("Експортовано ✔");
            });
        }
    }

    /* ================= UI REFRESH ================= */

    function refreshUI() {
        renderRecipes();
        renderPaints();
    }

    /* ================= PUBLIC ================= */

    return {
        init
    };

})();