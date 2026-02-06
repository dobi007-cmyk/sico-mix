// Глобальні змінні даних
let recipes = [];
let paintCatalog = [];
let selectedIngredients = [];
let selectedRecipes = [];

// Початкові дані
const initialData = {
    paints: [
        { 
            id: 1, 
            name: "Czerwony metalik", 
            category: "metalik", 
            color: "#FF0000", 
            manufacturer: "SICO", 
            article: "MET-RED-001",
            description: "Jaskrawoczerwony metalik do samochodów"
        },
        { 
            id: 2, 
            name: "Niebieski perłowy", 
            category: "perłowy", 
            color: "#0000FF", 
            manufacturer: "SICO", 
            article: "PER-BLU-002",
            description: "Niebieski perłowy z efektem połysku"
        },
        { 
            id: 3, 
            name: "Czarny matowy", 
            category: "matowy", 
            color: "#000000", 
            manufacturer: "SICO", 
            article: "MAT-BLK-003",
            description: "Głęboki czarny mat"
        },
        { 
            id: 4, 
            name: "Biały gloss", 
            category: "gloss", 
            color: "#FFFFFF", 
            manufacturer: "SICO", 
            article: "GLOSS-WHT-004",
            description: "Czysty biały gloss"
        },
        { 
            id: 5, 
            name: "Zielony akrylowy", 
            category: "akrylowy", 
            color: "#00FF00", 
            manufacturer: "SICO", 
            article: "ACR-GRN-005",
            description: "Jasnozielony akrylowy"
        },
        { 
            id: 6, 
            name: "Żółty epoksydowy", 
            category: "epoksydowy", 
            color: "#FFFF00", 
            manufacturer: "SICO", 
            article: "EPO-YLW-006",
            description: "Żółty epoksydowy odporny na chemikalia"
        }
    ],
    recipes: [
        { 
            id: 1, 
            name: "Czerwony samochodowy", 
            category: "metalik", 
            color: "#FF0000",
            description: "Jaskrawoczerwony metalik do samochodów",
            ingredients: [
                { paintId: 1, amount: 500, unit: "g", percentage: 50 },
                { paintId: 3, amount: 300, unit: "g", percentage: 30 },
                { paintId: 4, amount: 200, unit: "g", percentage: 20 }
            ],
            date: "15.03.2023",
            photo: null
        },
        { 
            id: 2, 
            name: "Niebieski perłowy efekt", 
            category: "perłowy", 
            color: "#0000FF",
            description: "Niebieski perłowy z efektem głębi",
            ingredients: [
                { paintId: 2, amount: 400, unit: "g", percentage: 40 },
                { paintId: 4, amount: 600, unit: "g", percentage: 60 }
            ],
            date: "10.03.2023",
            photo: null
        }
    ]
};

// Завантаження даних з localStorage
function loadData() {
    try {
        const savedRecipes = localStorage.getItem('sicoMixRecipes');
        const savedPaints = localStorage.getItem('sicoMixPaints');
        
        recipes = savedRecipes ? JSON.parse(savedRecipes) : initialData.recipes;
        paintCatalog = savedPaints ? JSON.parse(savedPaints) : initialData.paints;
        
        console.log('Dane załadowane:', { recipes, paintCatalog });
    } catch (error) {
        console.error('Błąd ładowania danych:', error);
        recipes = initialData.recipes;
        paintCatalog = initialData.paints;
    }
}

// Zapis danych do localStorage
function saveData() {
    try {
        localStorage.setItem('sicoMixRecipes', JSON.stringify(recipes));
        localStorage.setItem('sicoMixPaints', JSON.stringify(paintCatalog));
        console.log('Dane zapisane');
    } catch (error) {
        console.error('Błąd zapisywania danych:', error);
    }
}

// Aktualizacja licznika farb
function updatePaintCount() {
    try {
        const totalPaintsElement = document.getElementById('totalPaints');
        const headerPaintCount = document.getElementById('headerPaintCount');
        const count = paintCatalog.length;
        
        if (totalPaintsElement) {
            totalPaintsElement.textContent = count;
        }
        if (headerPaintCount) {
            headerPaintCount.textContent = count;
        }
    } catch (error) {
        console.error('Błąd aktualizacji licznika farb:', error);
    }
}

// Inicjalizacja danych
loadData();
