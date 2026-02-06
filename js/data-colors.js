const initialData = {
    paints: [
        { id: 1, name: "Czerwony metalik", category: "metalik", color: "#FF0000", manufacturer: "SICO", article: "MET-RED-001" },
        { id: 2, name: "Niebieski perłowy", category: "perl", color: "#0000FF", manufacturer: "SICO", article: "PER-BLU-002" },
        { id: 3, name: "Czarny mat", category: "mat", color: "#000000", manufacturer: "SICO", article: "MAT-BLK-003" },
        { id: 4, name: "Biały gloss", category: "gloss", color: "#FFFFFF", manufacturer: "SICO", article: "GLOSS-WHT-004" },
        { id: 5, name: "Zielony akryl", category: "akryl", color: "#00FF00", manufacturer: "SICO", article: "ACR-GRN-005" },
        { id: 6, name: "Żółty epoksyd", category: "epoxy", color: "#FFFF00", manufacturer: "SICO", article: "EPO-YLW-006" }
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
        }
    ]
};

let recipes = [];
let paintCatalog = [];

function loadData() {
    const savedRecipes = localStorage.getItem('sicoMixRecipes');
    const savedPaints = localStorage.getItem('sicoMixPaints');
    
    recipes = savedRecipes ? JSON.parse(savedRecipes) : initialData.recipes;
    paintCatalog = savedPaints ? JSON.parse(savedPaints) : initialData.paints;
}

function saveData() {
    localStorage.setItem('sicoMixRecipes', JSON.stringify(recipes));
    localStorage.setItem('sicoMixPaints', JSON.stringify(paintCatalog));
}

function updatePaintCount() {
    const totalPaintsElement = document.getElementById('totalPaints');
    const headerPaintCount = document.getElementById('headerPaintCount');
    const count = paintCatalog.length;
    if (totalPaintsElement) totalPaintsElement.textContent = count;
    if (headerPaintCount) headerPaintCount.textContent = count;
}

// Завантажуємо дані при імпорті
loadData();
