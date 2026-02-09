// ========== ДАНІ ПРО ФАРБИ ТА ПОЧАТКОВІ РЕЦЕПТИ ==========

if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    const initialData = {
        paints: [
            { id: 1, name: "Червоний металік", category: "Металік", color: "#FF0000", manufacturer: "SICO", article: "MET-RED-001" },
            { id: 2, name: "Синій перламутр", category: "Перламутр", color: "#0000FF", manufacturer: "SICO", article: "PER-BLU-002" },
            { id: 3, name: "Чорний мат", category: "Матові", color: "#000000", manufacturer: "SICO", article: "MAT-BLK-003" },
            { id: 4, name: "Білий глянець", category: "Глянцеві", color: "#FFFFFF", manufacturer: "SICO", article: "GLOSS-WHT-004" },
            { id: 5, name: "Зелений акрил", category: "Акрилові", color: "#00FF00", manufacturer: "SICO", article: "ACR-GRN-005" },
            { id: 6, name: "Жовтий епоксид", category: "Епоксидні", color: "#FFFF00", manufacturer: "SICO", article: "EPO-YLW-006" },
            { id: 7, name: "Сріблястий металік", category: "Металік", color: "#C0C0C0", manufacturer: "SICO", article: "MET-SIL-007" },
            { id: 8, name: "Золотий перламутр", category: "Перламутр", color: "#FFD700", manufacturer: "SICO", article: "PER-GLD-008" },
            { id: 9, name: "Сірий мат", category: "Матові", color: "#808080", manufacturer: "SICO", article: "MAT-GRY-009" },
            { id: 10, name: "Червоний глянець", category: "Глянцеві", color: "#DC143C", manufacturer: "SICO", article: "GLOSS-RED-010" }
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
