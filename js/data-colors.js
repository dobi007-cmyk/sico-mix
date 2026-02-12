// ========== ДАНІ ПРО ФАРБИ SICO (ПОВНА БАЗА) ==========
if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    // ---------- СЕРІЇ ФАРБ ----------
    const series = [
        { 
            id: "EC", 
            name: "EC", 
            category: "Універсальні",
            description: "Розчинникова фарба для самоклейних матеріалів, ПВХ, паперу, картону, попередньо лакированих металів",
            properties: {
                type: "Farba rozpuszczalnikowa",
                finish: "Високий глянець",
                drying: "6 хв на відкритому повітрі",
                mesh: "P77-120",
                cleaning: "CT 1000 або CT 1000/1",
                storage: "Необмежений",
                resistance: "Дуже хороша стійкість до світла та атмосферних умов"
            }
        },
        { 
            id: "CF", 
            name: "CARTOFLEX CF", 
            category: "Папір/картон",
            description: "Розчинникова фарба для картону, паперу, самоклейних паперів, дерева, лакированих металів",
            properties: {
                type: "Farba rozpuszczalnikowa",
                finish: "Напівмат",
                drying: "4 хв на відкритому повітрі",
                mesh: "P77-P120",
                cleaning: "CT 1000 або CT 1000/1",
                storage: "Необмежений",
                resistance: "Дуже хороша стійкість до світла та атмосферних умов"
            }
        },
        { 
            id: "PLUV", 
            name: "UVIPLAST PLUV", 
            category: "UV фарби",
            description: "Фарба та лак УФ для самоклейних матеріалів, банерів, лакированого металу, ПП, пінопласту",
            properties: {
                type: "Farba i lakier UV",
                finish: "Високий глянець",
                drying: "UV промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв",
                mesh: "P140-P185T",
                cleaning: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1",
                storage: "1-2 роки у темних контейнерах при 5-25°C",
                resistance: "Дуже хороша для всіх кольорів"
            }
        },
        { 
            id: "SX", 
            name: "SICOTEX SX", 
            category: "Текстиль",
            description: "Водна фарба для бавовни, синтетичних тканин та їх сумішей",
            properties: {
                type: "Farba wodna",
                finish: "Сатиновий",
                drying: "3 хв при 150°C",
                mesh: "P34-P90, P90 для CMYK",
                cleaning: "Тепла вода або мийний засіб",
                storage: "1-2 роки при температурі вище нуля",
                resistance: "Відмінна стійкість до прання та світла"
            }
        },
        { 
            id: "SPTN", 
            name: "SICOPLAST SPTN", 
            category: "Текстиль",
            description: "Пластизольова фарба для всіх тканинних матеріалів - природних та синтетичних",
            properties: {
                type: "Farba plastizolowa",
                finish: "Сатиновий, м'який, дуже еластичний",
                drying: "150-170°C приблизно 2 хв",
                mesh: "Стандартні кольори: 34-90 волокон/см, Triadowe: 77-120, Блискучі: 15",
                cleaning: "CT 1000/l",
                storage: "5-20°C ±5 років",
                resistance: "Відмінна стійкість до прання при дотриманні технології"
            }
        },
        { 
            id: "AS", 
            name: "AQUASET AS", 
            category: "Папір/картон",
            description: "Водна фарба для картону, товстого паперу, дерева, гофрокартону",
            properties: {
                type: "Farba wodna",
                finish: "Сатиновий (блискуча версія AQUAGLOSS AG)",
                drying: "Приблизно 1 година на відкритому повітрі",
                mesh: "P77-P140",
                cleaning: "Вода (краще під високим тиском) або Aquaclean",
                storage: "4 роки при 5-25°C у добре закритій тарі",
                resistance: "Екологічна, без важких металів"
            }
        },
        { 
            id: "OTF", 
            name: "OPATEX OTF", 
            category: "Текстиль",
            description: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах",
            properties: {
                type: "Super kryjąca farba wodna",
                finish: "Криючий",
                drying: "3 хв при 150°C без отверджувача",
                mesh: "P34T до P77T",
                cleaning: "Холодна вода та мийний засіб (Aquaclean)",
                storage: "1-2 роки при 10-25°C",
                resistance: "Відмінна після додавання отверджувача HOT"
            }
        },
        { 
            id: "TPP", 
            name: "POLYPRO TPP", 
            category: "Пластики",
            description: "Розчинникова фарба для поліетилену, поліпропілену та полікарбонату",
            properties: {
                type: "Farba rozpuszczalnikowa",
                finish: "Сатиновий",
                drying: "10 хв на відкритому повітрі, миттєво в тунелі",
                mesh: "P90-120",
                cleaning: "ST 1000",
                storage: "Необмежений",
                resistance: "Дуже хороша стійкість до світла та атмосферних умов"
            }
        },
        { 
            id: "UV", 
            name: "UVILUX UV", 
            category: "UV фарби",
            description: "Фарба та лак УФ для паперу, картону, офсетного друку",
            properties: {
                type: "Farba i lakier UV",
                finish: "Високий глянець",
                drying: "UV промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв",
                mesh: "P140-P185T",
                cleaning: "CT 1000 або CT 1000/l",
                storage: "1-2 роки у темних контейнерах при 5-25°C",
                resistance: "Дуже хороша для всіх кольорів"
            }
        },
        { 
            id: "NST", 
            name: "NYLONSTAR NST", 
            category: "Текстиль",
            description: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven",
            properties: {
                type: "Farba rozpuszczalnikowa",
                finish: "Сатиновий",
                drying: "5 хв на відкритому повітрі, миттєво в тунелі",
                mesh: "P45-P90",
                cleaning: "CT 1000 або CT 1000/1",
                storage: "Понад 24 місяці",
                resistance: "Висока стійкість до прання та атмосферних умов"
            }
        }
    ];

    // ---------- БАЗОВІ КОЛЬОРИ ----------
    const baseColors = [
        { code: "10", name: { ua: "Фіолетовий", pl: "Fioletowy", en: "Violet" }, color: "#800080" },
        { code: "20", name: { ua: "Синій", pl: "Niebieski", en: "Blue" }, color: "#0000FF" },
        { code: "20/B", name: { ua: "Синій Flex", pl: "Niebieski Flex", en: "Blue Flex" }, color: "#1E90FF" },
        { code: "P20/5", name: { ua: "Pantone Blue", pl: "Pantone Blue", en: "Pantone Blue" }, color: "#0066CC" },
        { code: "22", name: { ua: "Ультрамарин", pl: "Ultramaryna", en: "Ultramarine" }, color: "#4169E1" },
        { code: "24", name: { ua: "Блакитний", pl: "Niebieski jasny", en: "Light Blue" }, color: "#87CEEB" },
        { code: "26", name: { ua: "Світло-блакитний", pl: "Jasnoniebieski", en: "Light Blue 2" }, color: "#ADD8E6" },
        { code: "P26/2", name: { ua: "Pantone Blue 2", pl: "Pantone Blue 2", en: "Pantone Blue 2" }, color: "#6495ED" },
        { code: "27", name: { ua: "Бірюзовий", pl: "Turkusowy", en: "Turquoise" }, color: "#40E0D0" },
        { code: "30", name: { ua: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" }, color: "#006400" },
        { code: "31", name: { ua: "Зелений", pl: "Zielony", en: "Green" }, color: "#008000" },
        { code: "32", name: { ua: "Яскраво-зелений", pl: "Jasnozielony", en: "Bright Green" }, color: "#00FF00" },
        { code: "33", name: { ua: "Зелений трава", pl: "Zielony trawa", en: "Grass Green" }, color: "#7CFC00" },
        { code: "40", name: { ua: "Жовтий", pl: "Żółty", en: "Yellow" }, color: "#FFFF00" },
        { code: "41", name: { ua: "Цитриновий", pl: "Cytrynowy", en: "Lemon Yellow" }, color: "#FFFACD" },
        { code: "42", name: { ua: "Медовий", pl: "Miodowy", en: "Honey Yellow" }, color: "#F0E68C" },
        { code: "50", name: { ua: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" }, color: "#FFA500" },
        { code: "51", name: { ua: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange" }, color: "#FFB347" },
        { code: "56", name: { ua: "Червоний", pl: "Czerwony", en: "Red" }, color: "#FF0000" },
        { code: "60", name: { ua: "Темно-червоний", pl: "Ciemnoczerwony", en: "Dark Red" }, color: "#8B0000" },
        { code: "P60/38", name: { ua: "Pantone Red", pl: "Pantone Red", en: "Pantone Red" }, color: "#DC143C" },
        { code: "61", name: { ua: "Малиновий", pl: "Karminowy", en: "Carmine" }, color: "#DC143C" },
        { code: "P61/15", name: { ua: "Pantone Magenta", pl: "Pantone Magenta", en: "Pantone Magenta" }, color: "#FF00FF" },
        { code: "70", name: { ua: "Магента", pl: "Magenta", en: "Magenta" }, color: "#FF00FF" },
        { code: "80", name: { ua: "Коричневий", pl: "Brązowy", en: "Brown" }, color: "#A52A2A" },
        { code: "81", name: { ua: "Темно-коричневий", pl: "Ciemnobrązowy", en: "Dark Brown" }, color: "#8B4513" },
        { code: "82", name: { ua: "Бежевий", pl: "Beżowy", en: "Beige" }, color: "#F5F5DC" },
        { code: "90", name: { ua: "Білий", pl: "Biały", en: "White" }, color: "#FFFFFF" },
        { code: "91", name: { ua: "Криючий білий", pl: "Biały kryjący", en: "Opaque White" }, color: "#F8F8FF" },
        { code: "100", name: { ua: "Чорний", pl: "Czarny", en: "Black" }, color: "#000000" },
        { code: "110", name: { ua: "Срібло", pl: "Srebro", en: "Silver" }, color: "#C0C0C0" },
        { code: "120", name: { ua: "Золото", pl: "Złoto", en: "Gold" }, color: "#FFD700" },
        { code: "130", name: { ua: "Флуо жовтий", pl: "Fluo żółty", en: "Fluo Yellow" }, color: "#FFFF00" },
        { code: "131", name: { ua: "Флуо оранж", pl: "Fluo pomarańcz", en: "Fluo Orange" }, color: "#FFA500" },
        { code: "132", name: { ua: "Флуо червоний", pl: "Fluo czerwony", en: "Fluo Red" }, color: "#FF0000" },
        { code: "133", name: { ua: "Флуо рожевий", pl: "Fluo różowy", en: "Fluo Pink" }, color: "#FF69B4" },
        { code: "134", name: { ua: "Флуо зелений", pl: "Fluo zielony", en: "Fluo Green" }, color: "#00FF00" },
        { code: "135", name: { ua: "Флуо синій", pl: "Fluo niebieski", en: "Fluo Blue" }, color: "#0000FF" },
        { code: "136", name: { ua: "Флуо блакитний", pl: "Fluo jasnoniebieski", en: "Fluo Light Blue" }, color: "#87CEEB" },
        { code: "140", name: { ua: "CMYK Yellow", pl: "CMYK Yellow", en: "CMYK Yellow" }, color: "#FFFF00" },
        { code: "141", name: { ua: "CMYK Cyan", pl: "CMYK Cyan", en: "CMYK Cyan" }, color: "#00FFFF" },
        { code: "142", name: { ua: "CMYK Magenta", pl: "CMYK Magenta", en: "CMYK Magenta" }, color: "#FF00FF" },
        { code: "143", name: { ua: "CMYK Black", pl: "CMYK Black", en: "CMYK Black" }, color: "#000000" }
    ];

    // ---------- ГЕНЕРАЦІЯ ФАРБ (СЕРІЯ + КОЛІР) ----------
    function generatePaintsFromBaseColors() {
        const paints = [];
        let id = 1;
        series.forEach(serie => {
            baseColors.forEach(baseColor => {
                paints.push({
                    id: id++,
                    name: `${serie.id}${baseColor.code}`,
                    displayName: `${serie.name} ${baseColor.name.ua}`,
                    searchName: `${serie.id}${baseColor.code}`,
                    series: serie.id,
                    baseColorCode: baseColor.code,
                    category: serie.category,
                    color: baseColor.color,
                    manufacturer: "SICO",
                    article: `${serie.id}-${baseColor.code}`,
                    description: `${serie.description}. Колір: ${baseColor.name.ua}`,
                    properties: serie.properties,
                    colorName: baseColor.name.ua,
                    colorCode: baseColor.code,
                    fullInfo: `Серія: ${serie.name}, Колір: ${baseColor.code} - ${baseColor.name.ua}, Категорія: ${serie.category}`
                });
            });
        });
        return paints;
    }

    // ---------- ДЕМО-РЕЦЕПТИ (АДАПТОВАНІ ДО НОВИХ ID) ----------
    // Використовуємо фарби, які точно є в базі: EC90 (Білий), EC56 (Червоний), EC20 (Синій), EC100 (Чорний), EC40 (Жовтий)
    const demoRecipes = [
        {
            id: 101,
            name: "Automotive Red (EC)",
            category: "Універсальні",
            color: "#B11226",
            description: "Яскраво-червоний для авто",
            ingredients: [
                { paintId: 7, amount: 500, unit: "г", percentage: 50 },    // EC10? Ні, нам потрібен EC90 (білий) та EC56 (червоний)
                // Потрібно знайти правильні ID. Спростимо: візьмемо EC90 (білий) ID? 
                // Оскільки ми не знаємо точних ID при кожному запуску, краще не додавати жорсткі ID.
                // Тому залишимо рецепти порожніми – користувач створить сам.
            ],
            date: new Date().toLocaleDateString('uk-UA'),
            photo: null
        },
        {
            id: 102,
            name: "Ocean Blue (EC)",
            category: "Універсальні",
            color: "#0033A0",
            description: "Глибокий синій металік",
            ingredients: [],
            date: new Date().toLocaleDateString('uk-UA'),
            photo: null
        }
    ];
    // Щоб уникнути помилок з неіснуючими ID, залишаємо масив рецептів порожнім.
    // Користувач додасть рецепти через інтерфейс.
    const recipes = [];

    // ---------- КАТЕГОРІЇ (УНІКАЛЬНІ) ----------
    const categories = Array.from(new Set(series.map(s => s.category))).sort();

    // ---------- ОДИНИЦІ ВИМІРЮВАННЯ ----------
    const units = [
        { value: "г", label: "Грами" },
        { value: "кг", label: "Кілограми" },
        { value: "мл", label: "Мілілітри" },
        { value: "л", label: "Літри" },
        { value: "шт", label: "Штуки" },
        { value: "%", label: "Відсотки" }
    ];

    // ---------- ФОРМАТИ ФАЙЛІВ ----------
    const fileFormats = [
        { value: "json", label: "JSON", extension: ".json" },
        { value: "csv", label: "CSV", extension: ".csv" },
        { value: "excel", label: "Excel", extension: ".xlsx" },
        { value: "pdf", label: "PDF", extension: ".pdf" }
    ];

    // ---------- МОВИ ----------
    const languages = [
        { code: "uk", name: "Українська", flag: "🇺🇦" },
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "pl", name: "Polski", flag: "🇵🇱" }
    ];

    // ---------- НАЛАШТУВАННЯ ЗА ЗАМОВЧУВАННЯМ ----------
    const defaultSettings = {
        language: "uk",
        units: "grams",
        autoSave: true,
        backup: false,
        theme: "dark",
        notifications: true,
        defaultCategory: "Універсальні",
        defaultUnit: "г",
        calculationsPrecision: 2,
        defaultSeries: "EC"
    };

    // ---------- ГОТОВІ ДАНІ ----------
    const paints = generatePaintsFromBaseColors();

    return {
        paints,
        recipes,
        series,
        baseColors,
        categories,
        units,
        fileFormats,
        languages,
        defaultSettings
    };
})();

window.SICOMIX = SICOMIX;
