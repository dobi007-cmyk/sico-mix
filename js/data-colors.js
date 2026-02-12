if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    // Базові фарби – тільки основні категорії та номери
    const paints = [
        { id: 1, name: "SICO White 90", category: "Standard", color: "#FFFFFF", manufacturer: "SICO", article: "STD-90" },
        { id: 2, name: "SICO Black 100", category: "Standard", color: "#000000", manufacturer: "SICO", article: "STD-100" },
        { id: 3, name: "SICO Red 60", category: "Standard", color: "#B11226", manufacturer: "SICO", article: "STD-60" },
        { id: 4, name: "SICO Blue 23", category: "Standard", color: "#0033A0", manufacturer: "SICO", article: "STD-23" },
        { id: 5, name: "SICO Green 35", category: "Standard", color: "#007A3D", manufacturer: "SICO", article: "STD-35" },
        { id: 6, name: "SICO Yellow 40", category: "Standard", color: "#FFD100", manufacturer: "SICO", article: "STD-40" },
        { id: 7, name: "SICO Orange 55", category: "Standard", color: "#F05A28", manufacturer: "SICO", article: "STD-55" }
    ];

    // Початкові рецепти (спрощені)
    const recipes = [
        {
            id: 101,
            name: "Automotive Red",
            category: "Standard",
            color: "#B11226",
            description: "Bright red for automotive",
            ingredients: [
                { paintId: 1, amount: 500, unit: "г", percentage: 50 },
                { paintId: 3, amount: 300, unit: "г", percentage: 30 },
                { paintId: 4, amount: 200, unit: "г", percentage: 20 }
            ],
            date: new Date().toLocaleDateString('uk-UA'),
            photo: null
        },
        {
            id: 102,
            name: "Ocean Blue",
            category: "Standard",
            color: "#0033A0",
            description: "Deep blue metallic effect",
            ingredients: [
                { paintId: 4, amount: 700, unit: "г", percentage: 70 },
                { paintId: 2, amount: 200, unit: "г", percentage: 20 },
                { paintId: 6, amount: 100, unit: "г", percentage: 10 }
            ],
            date: new Date().toLocaleDateString('uk-UA'),
            photo: null
        }
    ];

    // Категорії (лише Standard для простоти)
    const categories = ["Standard"];

    // Одиниці вимірювання
    const units = [
        { value: "г", label: "Грами" },
        { value: "кг", label: "Кілограми" },
        { value: "мл", label: "Мілілітри" },
        { value: "л", label: "Літри" },
        { value: "%", label: "Відсотки" }
    ];

    // Налаштування за замовчуванням
    const defaultSettings = {
        language: "uk",
        units: "grams",
        autoSave: true,
        backup: false,
        theme: "dark",
        notifications: true,
        defaultCategory: "Standard",
        defaultUnit: "г",
        calculationsPrecision: 2
    };

    return {
        paints,
        recipes,
        categories,
        units,
        defaultSettings
    };
})();

window.SICOMIX = SICOMIX;
