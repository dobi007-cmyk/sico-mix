// ========== ДАНІ ПРО ФАРБИ ТА ПОЧАТКОВІ РЕЦЕПТИ ==========

if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    const initialData = {
        paints: [
    // ===== STANDARD COLOUR INKS =====
    { id: 1, name: "SICO White 90", category: "Standard", color: "#FFFFFF", manufacturer: "SICO", article: "STD-90" },
    { id: 2, name: "SICO Black 100", category: "Standard", color: "#000000", manufacturer: "SICO", article: "STD-100" },
    { id: 3, name: "SICO Red 60", category: "Standard", color: "#B11226", manufacturer: "SICO", article: "STD-60" },
    { id: 4, name: "SICO Blue 23", category: "Standard", color: "#0033A0", manufacturer: "SICO", article: "STD-23" },
    { id: 5, name: "SICO Green 35", category: "Standard", color: "#007A3D", manufacturer: "SICO", article: "STD-35" },
    { id: 6, name: "SICO Yellow 40", category: "Standard", color: "#FFD100", manufacturer: "SICO", article: "STD-40" },
    { id: 7, name: "SICO Orange 55", category: "Standard", color: "#F05A28", manufacturer: "SICO", article: "STD-55" },

    // ===== PANTONE / P SERIES =====
    { id: 8, name: "Pantone Red P60/38", category: "Pantone", color: "#C8102E", manufacturer: "SICO", article: "P60/38" },
    { id: 9, name: "Pantone Magenta P61/15", category: "Pantone", color: "#9C2A70", manufacturer: "SICO", article: "P61/15" },
    { id: 10, name: "Pantone Blue P26/2", category: "Pantone", color: "#005EB8", manufacturer: "SICO", article: "P26/2" },
    { id: 11, name: "Pantone Yellow P20/5", category: "Pantone", color: "#FEDD00", manufacturer: "SICO", article: "P20/5" },

    // ===== CMYK INKS =====
    { id: 12, name: "CMYK Cyan 141", category: "CMYK", color: "#009DDC", manufacturer: "SICO", article: "CMYK-141" },
    { id: 13, name: "CMYK Magenta 142", category: "CMYK", color: "#D5006D", manufacturer: "SICO", article: "CMYK-142" },
    { id: 14, name: "CMYK Yellow 140", category: "CMYK", color: "#FFDD00", manufacturer: "SICO", article: "CMYK-140" },
    { id: 15, name: "CMYK Black 143", category: "CMYK", color: "#1A1A1A", manufacturer: "SICO", article: "CMYK-143" },

    // ===== METALIZED INKS =====
    { id: 16, name: "Metal Silver 110", category: "Metalized", color: "#BFC1C2", manufacturer: "SICO", article: "MET-110" },
    { id: 17, name: "Metal Gold 120", category: "Metalized", color: "#8B6F2D", manufacturer: "SICO", article: "MET-120" },

    // ===== FLUORESCENT INKS =====
    { id: 18, name: "Fluo Yellow 130", category: "Fluorescent", color: "#E6FF00", manufacturer: "SICO", article: "FLUO-130" },
    { id: 19, name: "Fluo Orange 131", category: "Fluorescent", color: "#FF7A00", manufacturer: "SICO", article: "FLUO-131" },
    { id: 20, name: "Fluo Red 133", category: "Fluorescent", color: "#FF0038", manufacturer: "SICO", article: "FLUO-133" },
    { id: 21, name: "Fluo Pink 134", category: "Fluorescent", color: "#FF1493", manufacturer: "SICO", article: "FLUO-134" },
    { id: 22, name: "Fluo Green 135", category: "Fluorescent", color: "#00E676", manufacturer: "SICO", article: "FLUO-135" },
    { id: 23, name: "Fluo Blue 136", category: "Fluorescent", color: "#2979FF", manufacturer: "SICO", article: "FLUO-136" }
],
        recipes: [
            { 
                id: 1, 
                name: "Автомобільний червоний", 
                category: "Металік", 
                color: "#FF0000",
                description: "Яскраво-червоний металік для автомобілів",
                ingredients: [
                    { paintId: 1, amount: 500, unit: "г", percentage: 50 },
                    { paintId: 3, amount: 300, unit: "г", percentage: 30 },
                    { paintId: 4, amount: 200, unit: "г", percentage: 20 }
                ],
                date: "15.03.2023",
                photo: null
            },
            { 
                id: 2, 
                name: "Ніжний перламутровий", 
                category: "Перламутр", 
                color: "#FFC0CB",
                description: "Ніжний рожевий перламутр з ефектом перламутру",
                ingredients: [
                    { paintId: 2, amount: 400, unit: "г", percentage: 40 },
                    { paintId: 4, amount: 600, unit: "г", percentage: 60 }
                ],
                date: "10.03.2023",
                photo: null
            },
            { 
                id: 3, 
                name: "Елегантний сірий металік", 
                category: "Металік", 
                color: "#808080",
                description: "Сучасний сірий металік для преміум авто",
                ingredients: [
                    { paintId: 7, amount: 700, unit: "г", percentage: 70 },
                    { paintId: 3, amount: 200, unit: "г", percentage: 20 },
                    { paintId: 10, amount: 100, unit: "г", percentage: 10 }
                ],
                date: "20.03.2023",
                photo: null
            }
        ]
    };

    // Категорії фарб
    const categories = [
        "Металік",
        "Перламутр", 
        "Матові",
        "Глянцеві",
        "Акрилові",
        "Епоксидні",
        "Грунтовка",
        "Лак",
        "Розчинник"
    ];

    // Одиниці вимірювання
    const units = [
        { value: "г", label: "Грами" },
        { value: "кг", label: "Кілограми" },
        { value: "мл", label: "Мілілітри" },
        { value: "л", label: "Літри" },
        { value: "шт", label: "Штуки" },
        { value: "%", label: "Відсотки" }
    ];

    // Формати файлів для імпорту/експорту
    const fileFormats = [
        { value: "json", label: "JSON", extension: ".json" },
        { value: "csv", label: "CSV", extension: ".csv" },
        { value: "excel", label: "Excel", extension: ".xlsx" },
        { value: "pdf", label: "PDF", extension: ".pdf" }
    ];

    // Мови інтерфейсу
    const languages = [
        { code: "uk", name: "Українська", flag: "🇺🇦" },
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "pl", name: "Polski", flag: "🇵🇱" }
    ];

    // Налаштування за замовчуванням
    const defaultSettings = {
        language: "uk",
        units: "grams",
        autoSave: true,
        backup: false,
        theme: "light",
        notifications: true,
        defaultCategory: "Металік",
        defaultUnit: "г",
        calculationsPrecision: 2
    };

    // Кольори за замовчуванням для палітри
    const defaultColors = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
        "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080",
        "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DDA0DD"
    ];

    // Генерація випадкових даних для тестування
    function generateMockData(count) {
        const mockPaints = [];
        const mockRecipes = [];
        
        for (let i = 1; i <= count; i++) {
            // Генеруємо фарби
            const category = categories[Math.floor(Math.random() * categories.length)];
            const color = defaultColors[Math.floor(Math.random() * defaultColors.length)];
            
            mockPaints.push({
                id: i,
                name: `Фарба ${i} ${category}`,
                category: category,
                color: color,
                manufacturer: ["SICO", "DUPONT", "PPG", "BASF", "AKZO"][Math.floor(Math.random() * 5)],
                article: `ART-${category.substring(0, 3).toUpperCase()}-${String(i).padStart(3, '0')}`,
                description: `Високоякісна ${category.toLowerCase()} фарба для професійного використання`
            });

            // Генеруємо рецепти (кожен 3-й)
            if (i % 3 === 0) {
                const numIngredients = Math.floor(Math.random() * 5) + 2;
                const ingredients = [];
                let totalAmount = 0;
                
                for (let j = 0; j < numIngredients; j++) {
                    const amount = Math.floor(Math.random() * 500) + 100;
                    totalAmount += amount;
                    ingredients.push({
                        paintId: Math.floor(Math.random() * count) + 1,
                        amount: amount,
                        unit: "г",
                        percentage: 0
                    });
                }
                
                // Розраховуємо відсотки
                ingredients.forEach(ing => {
                    ing.percentage = parseFloat(((ing.amount / totalAmount) * 100).toFixed(1));
                });
                
                mockRecipes.push({
                    id: i,
                    name: `Рецепт ${i} ${category}`,
                    category: category,
                    color: color,
                    description: `Унікальний рецепт ${category.toLowerCase()} фарби з ${numIngredients} інгредієнтами`,
                    ingredients: ingredients,
                    date: new Date().toLocaleDateString('uk-UA'),
                    photo: null
                });
            }
        }
        
        return {
            paints: mockPaints,
            recipes: mockRecipes
        };
    }

    return {
        initialData,
        categories,
        units,
        fileFormats,
        languages,
        defaultSettings,
        defaultColors,
        generateMockData
    };
})();

window.SICOMIX = SICOMIX;
