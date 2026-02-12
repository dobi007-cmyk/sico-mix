if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.app = (function() {
    'use strict';

    // ========== STAN APLIKACJI ==========
    let recipes = [];
    let paintCatalog = [];
    let selectedIngredients = [];
    let selectedRecipes = [];
    let currentSettings = {};
    let isEditingRecipe = false;
    let editingRecipeId = null;

    // ========== REFERENCJE DOM ==========
    let sidebar, menuToggle, desktopMenuToggle, closeSidebar, mainContainer;
    let navLinks, pageContents, totalPaintsEl, headerPaintCount;
    let colorPreview, recipeColor, ingredientsList, paintSearch, categoryFilter;
    let addIngredientBtn, saveRecipeBtn, clearRecipeBtn, calculatePercentagesBtn;
    let recipesContainer, exportRecipesBtn, importRecipesBtn, printRecipesBtn, deleteSelectedRecipesBtn;
    let paintCatalogEl, addNewPaintBtn, addPaintModal, closePaintModal, savePaintBtn, cancelPaintBtn;
    let languageSelect, unitsSelect, autoSaveCheckbox, backupCheckbox, saveSettingsBtn, resetSettingsBtn, clearAllDataBtn;
    let actionCards, catalogSearch;

    // ========== POMOCNICZE ==========
    function log(...args) {
        console.log('[SICOMIX]', ...args);
    }
    function error(...args) {
        console.error('[SICOMIX ERROR]', ...args);
    }

    // ========== POBRANIE ELEMENTÓW DOM ==========
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
        catalogSearch = document.getElementById('catalogSearch');
    }

    // ========== AWARYJNE ŁADOWANIE DANYCH ==========
    function loadData() {
        log('loadData() – start');

        // 1. Receptury
        recipes = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipes', []);
        log('Załadowano recipes:', recipes.length);

        // 2. Ustawienia
        currentSettings = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumSettings', {});
        if (!currentSettings || Object.keys(currentSettings).length === 0) {
            currentSettings = SICOMIX.data?.defaultSettings || { language: 'uk', units: 'grams', autoSave: true };
            log('Ustawienia domyślne');
        }

        // 3. Katalog farb – NAJWAŻNIEJSZE
        const storedPaints = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumPaints', null);
        
        // Sprawdź, czy SICOMIX.data.paints istnieje i jest tablicą
        let defaultPaints = [];
        if (SICOMIX.data && Array.isArray(SICOMIX.data.paints)) {
            defaultPaints = SICOMIX.data.paints;
            log(`SICOMIX.data.paints: ${defaultPaints.length} farb`);
        } else {
            error('SICOMIX.data.paints jest undefined lub nie jest tablicą!');
            // Fallback – tymczasowa pusta tablica
            defaultPaints = [];
        }

        if (storedPaints && Array.isArray(storedPaints)) {
            log(`Odczytano z localStorage: ${storedPaints.length} farb (okrojonych)`);
            // Przywróć pełne dane z SICOMIX.data.paints
            const fullPaintsMap = new Map(defaultPaints.map(p => [p.id, p]));
            paintCatalog = storedPaints.map(sp => {
                const full = fullPaintsMap.get(sp.id);
                return full ? { ...full, ...sp } : sp;
            });
            log(`Po scaleniu: paintCatalog = ${paintCatalog.length} farb`);
        } else {
            // Brak zapisanych danych – użyj domyślnych
            paintCatalog = [...defaultPaints];
            log(`Brak danych w localStorage – użyto SICOMIX.data.paints (${paintCatalog.length} farb)`);
        }

        // Jeśli paintCatalog NADAL jest pusty – utwórz przynajmniej jedną testową farbę
        if (paintCatalog.length === 0) {
            error('paintCatalog PUSTY – tworzę awaryjną farbę testową!');
            paintCatalog.push({
                id: SICOMIX.utils.generateId(),
                name: 'EC90 (test)',
                category: 'Універсальні',
                color: '#3a86ff',
                description: 'Awaryjna farba – sprawdź konsolę',
                manufacturer: 'SICO',
                article: 'TEST-001'
            });
        }

        log('loadData() – zakończono, paintCatalog:', paintCatalog.length);
    }

    // ========== ZAPIS DANYCH (optymalizacja) ==========
    function saveData() {
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', recipes);
        const paintsForStorage = paintCatalog.map(p => SICOMIX.utils.sanitizePaintForStorage(p));
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumPaints', paintsForStorage);
        SICOMIX.utils.saveToLocalStorage('sicoSpectrumSettings', currentSettings);
        log('Dane zapisane');
    }

    // ========== RENDEROWANIE KATALOGU – POPRAWIONE ==========
    function renderPaintCatalog() {
        if (!paintCatalogEl) {
            error('Element #paintCatalog nie istnieje w DOM!');
            return;
        }

        log(`renderPaintCatalog() – paintCatalog.length = ${paintCatalog.length}`);

        // Jeśli katalog pusty – pokaż komunikat
        if (!Array.isArray(paintCatalog) || paintCatalog.length === 0) {
            paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color: var(--text-secondary);">
                <i class="fas fa-palette" style="font-size: 48px; opacity: 0.5; display: block; margin-bottom: 16px;"></i>
                ${SICOMIX.i18n.t('catalog_empty')}
            </p>`;
            return;
        }

        const searchInput = catalogSearch;
        const search = searchInput ? searchInput.value.toLowerCase() : '';

        let filtered = paintCatalog;
        if (search) {
            filtered = filtered.filter(p => 
                p.name?.toLowerCase().includes(search) || 
                p.category?.toLowerCase().includes(search) ||
                p.manufacturer?.toLowerCase().includes(search)
            );
        }

        if (filtered.length === 0) {
            paintCatalogEl.innerHTML = `<p style="text-align:center; padding:40px; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; opacity: 0.5; display: block; margin-bottom: 16px;"></i>
                ${SICOMIX.i18n.t('paints_not_found')}
            </p>`;
            return;
        }

        let html = '';
        filtered.forEach(p => {
            html += `
            <div class="recipe-card" data-id="${p.id}">
                <div class="recipe-image" style="background: ${p.color || '#3a86ff'};"></div>
                <div class="recipe-content">
                    <div class="recipe-header">
                        <div>
                            <h3 class="recipe-title">${p.name || 'Bez nazwy'}</h3>
                            <span class="recipe-category">${p.category || 'Brak kategorii'}</span>
                        </div>
                    </div>
                    <div style="margin-bottom:15px;">
                        <div style="display:flex; gap:15px; margin-bottom: 10px;">
                            <div>
                                <span style="font-size:12px;">${SICOMIX.i18n.t('manufacturer')}</span><br>
                                <strong>${p.manufacturer && p.manufacturer.trim() !== '' ? p.manufacturer : 'SICO'}</strong>
                            </div>
                            <div>
                                <span style="font-size:12px;">${SICOMIX.i18n.t('article')}</span><br>
                                <strong>${p.article || '—'}</strong>
                            </div>
                        </div>
                        <p style="color:var(--text-secondary); font-size: 14px;">
                            ${p.description ? p.description.substring(0, 100) + (p.description.length > 100 ? '…' : '') : SICOMIX.i18n.t('no_description')}
                        </p>
                    </div>
                    <div class="recipe-actions">
                        <button class="recipe-btn delete-paint" data-id="${p.id}">
                            <i class="fas fa-trash"></i> ${SICOMIX.i18n.t('delete')}
                        </button>
                    </div>
                </div>
            </div>`;
        });

        paintCatalogEl.innerHTML = html;

        // Podpięcie zdarzeń usuwania
        paintCatalogEl.querySelectorAll('.delete-paint').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.dataset.id;
                deletePaint(id);
            });
        });

        updatePaintCount();
        log('renderPaintCatalog() – wyrenderowano', filtered.length, 'farb');
    }

    // ========== POZOSTAŁE FUNKCJE (bez zmian, ale upewnij się, że istnieją) ==========
    // ... (wszystkie inne funkcje: switchPage, addIngredient, saveRecipe, deletePaint, itd.)
    // Dla oszczędności miejsca – w rzeczywistym pliku pozostają bez zmian, 
    // ale MUSZĄ być skopiowane z poprzedniej wersji app.js.
    // UWAGA: Poniżej tylko najważniejsze funkcje, resztę uzupełnij z wcześniejszego kodu.

    function updatePaintCount() {
        const count = paintCatalog.length;
        if (totalPaintsEl) totalPaintsEl.textContent = count;
        if (headerPaintCount) headerPaintCount.textContent = count;
    }

    function deletePaint(id) {
        SICOMIX.utils.showConfirmation(
            SICOMIX.i18n.t('delete_paint'),
            SICOMIX.i18n.t('delete_paint_confirmation'),
            () => {
                paintCatalog = paintCatalog.filter(p => String(p.id) !== String(id));
                saveData();
                renderPaintCatalog();
                showNotification(SICOMIX.i18n.t('paint_deleted'), 'success');
            }
        );
    }

    // ========== INICJALIZACJA ==========
    function initApp() {
        log('initApp() – start');

        // 1. Zainicjuj i18n (jeśli nie zostało zrobione)
        if (SICOMIX.i18n && typeof SICOMIX.i18n.init === 'function') {
            SICOMIX.i18n.init();
        }

        // 2. Pobierz elementy DOM
        cacheDOMElements();

        // 3. Załaduj dane (tu farby są wypełniane)
        loadData();

        // 4. Ustawienia
        initSettings();

        // 5. Nasłuchiwacze
        setupEventListeners();

        // 6. Wstępne renderowanie
        updatePaintCount();
        renderPaintCatalog();   // <-- WYMUSZONE RENDEROWANIE KATALOGU
        renderRecipes();
        renderIngredientsList();
        populateCategoryFilters();

        // 7. Sidebar na desktopie
        if (window.innerWidth > 992) {
            sidebar.classList.add('active');
            mainContainer.classList.add('sidebar-open');
        }

        // 8. Ukryj preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }

        showNotification(SICOMIX.i18n.t('welcome_title'), 'success', 2000);
        log('initApp() – zakończono');
    }

    // ========== PUBLICZNE API ==========
    return {
        init: initApp,
        deleteRecipe,
        exportRecipe,
        editRecipe,
        deletePaint,
        showNotification,
        renderPaintCatalog,   // <-- EKSPORTUJEMY, MOŻNA RĘCZNIE WYWOŁAĆ W KONSOLI
    };
})();

window.SICOMIX = SICOMIX;
