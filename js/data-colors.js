// ========== ДАНІ ПРО ФАРБИ ТА ПОЧАТКОВІ РЕЦЕПТИ ==========

if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    // Серії фарб з детальними характеристиками
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

    // Базові кольори
    const baseColors = [
        { code: "10", name: { ua: "Фіолетовий", pl: "Fioletowy", en: "Violet" } },
        { code: "20", name: { ua: "Синій", pl: "Niebieski", en: "Blue" } },
        { code: "20/B", name: { ua: "Синій Flex", pl: "Niebieski Flex", en: "Blue Flex" } },
        { code: "P20/5", name: { ua: "Pantone Blue", pl: "Pantone Blue", en: "Pantone Blue" } },
        { code: "22", name: { ua: "Ультрамарин", pl: "Ultramaryna", en: "Ultramarine" } },
        { code: "24", name: { ua: "Блакитний", pl: "Niebieski jasny", en: "Light Blue" } },
        { code: "26", name: { ua: "Світло-блакитний", pl: "Jasnoniebieski", en: "Light Blue 2" } },
        { code: "P26/2", name: { ua: "Pantone Blue 2", pl: "Pantone Blue 2", en: "Pantone Blue 2" } },
        { code: "27", name: { ua: "Бірюзовий", pl: "Turkusowy", en: "Turquoise" } },
        { code: "30", name: { ua: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" } },
        { code: "31", name: { ua: "Зелений", pl: "Zielony", en: "Green" } },
        { code: "32", name: { ua: "Яскраво-зелений", pl: "Jasnozielony", en: "Bright Green" } },
        { code: "33", name: { ua: "Зелений трава", pl: "Zielony trawa", en: "Grass Green" } },
        { code: "40", name: { ua: "Жовтий", pl: "Żółty", en: "Yellow" } },
        { code: "41", name: { ua: "Цитриновий", pl: "Cytrynowy", en: "Lemon Yellow" } },
        { code: "42", name: { ua: "Медовий", pl: "Miodowy", en: "Honey Yellow" } },
        { code: "50", name: { ua: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" } },
        { code: "51", name: { ua: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange" } },
        { code: "56", name: { ua: "Червоний", pl: "Czerwony", en: "Red" } },
        { code: "60", name: { ua: "Темно-червоний", pl: "Ciemnoczerwony", en: "Dark Red" } },
        { code: "P60/38", name: { ua: "Pantone Red", pl: "Pantone Red", en: "Pantone Red" } },
        { code: "61", name: { ua: "Малиновий", pl: "Karminowy", en: "Carmine" } },
        { code: "P61/15", name: { ua: "Pantone Magenta", pl: "Pantone Magenta", en: "Pantone Magenta" } },
        { code: "70", name: { ua: "Магента", pl: "Magenta", en: "Magenta" } },
        { code: "80", name: { ua: "Коричневий", pl: "Brązowy", en: "Brown" } },
        { code: "81", name: { ua: "Темно-коричневий", pl: "Ciemnobrązowy", en: "Dark Brown" } },
        { code: "82", name: { ua: "Бежевий", pl: "Beżowy", en: "Beige" } },
        { code: "90", name: { ua: "Білий", pl: "Biały", en: "White" } },
        { code: "91", name: { ua: "Криючий білий", pl: "Biały kryjący", en: "Opaque White" } },
        { code: "100", name: { ua: "Чорний", pl: "Czarny", en: "Black" } },
        { code: "110", name: { ua: "Срібло", pl: "Srebro", en: "Silver" } },
        { code: "120", name: { ua: "Золото", pl: "Złoto", en: "Gold" } },
        { code: "130", name: { ua: "Флуо жовтий", pl: "Fluo żółty", en: "Fluo Yellow" } },
        { code: "131", name: { ua: "Флуо оранж", pl: "Fluo pomarańcz", en: "Fluo Orange" } },
        { code: "132", name: { ua: "Флуо червоний", pl: "Fluo czerwony", en: "Fluo Red" } },
        { code: "133", name: { ua: "Флуо рожевий", pl: "Fluo różowy", en: "Fluo Pink" } },
        { code: "134", name: { ua: "Флуо зелений", pl: "Fluo zielony", en: "Fluo Green" } },
        { code: "135", name: { ua: "Флуо синій", pl: "Fluo niebieski", en: "Fluo Blue" } },
        { code: "136", name: { ua: "Флуо блакитний", pl: "Fluo jasnoniebieski", en: "Fluo Light Blue" } },
        { code: "140", name: { ua: "CMYK Yellow", pl: "CMYK Yellow", en: "CMYK Yellow" } },
        { code: "141", name: { ua: "CMYK Cyan", pl: "CMYK Cyan", en: "CMYK Cyan" } },
        { code: "142", name: { ua: "CMYK Magenta", pl: "CMYK Magenta", en: "CMYK Magenta" } },
        { code: "143", name: { ua: "CMYK Black", pl: "CMYK Black", en: "CMYK Black" } }
    ];

    // Генерація фарб з урахуванням серій та базових кольорів
    function generatePaintsFromBaseColors() {
        const paints = [];
        let id = 1;
        
        baseColors.forEach(baseColor => {
            series.forEach(serie => {
                // Визначаємо колір на основі коду
                const colorMap = {
                    "10": "#800080", "20": "#0000FF", "20/B": "#1E90FF", "P20/5": "#0066CC",
                    "22": "#4169E1", "24": "#87CEEB", "26": "#ADD8E6", "P26/2": "#6495ED",
                    "27": "#40E0D0", "30": "#006400", "31": "#008000", "32": "#00FF00", "33": "#7CFC00",
                    "40": "#FFFF00", "41": "#FFFACD", "42": "#F0E68C", "50": "#FFA500", "51": "#FFB347",
                    "56": "#FF0000", "60": "#8B0000", "P60/38": "#DC143C", "61": "#DC143C", "P61/15": "#FF00FF",
                    "70": "#FF00FF", "80": "#A52A2A", "81": "#8B4513", "82": "#F5F5DC", "90": "#FFFFFF",
                    "91": "#F8F8FF", "100": "#000000", "110": "#C0C0C0", "120": "#FFD700",
                    "130": "#FFFF00", "131": "#FFA500", "132": "#FF0000", "133": "#FF69B4", "134": "#00FF00",
                    "135": "#0000FF", "136": "#87CEEB", "140": "#FFFF00", "141": "#00FFFF", "142": "#FF00FF",
                    "143": "#000000"
                };
                
                const hexColor = colorMap[baseColor.code] || "#CCCCCC";
                
                paints.push({
                    id: id++,
                    name: `${serie.name} ${baseColor.code}`,
                    fullName: `${serie.name} ${baseColor.code} - ${baseColor.name.ua}`,
                    series: serie.id,
                    baseColorCode: baseColor.code,
                    category: serie.category,
                    color: hexColor,
                    manufacturer: "SICO",
                    article: `${serie.id}-${baseColor.code}`,
                    properties: serie.properties,
                    names: baseColor.name
                });
            });
        });
        
        return paints;
    }

    // Початкові дані
    const initialData = {
        paints: generatePaintsFromBaseColors(),
        series: series,
        baseColors: baseColors,
        recipes: []
    };

    // Категорії
    const categories = [
        "Універсальні",
        "Текстиль", 
        "Папір/картон",
        "Пластики",
        "UV фарби",
        "Металік",
        "Перламутр",
        "Флуоресцентні",
        "CMYK"
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

    // Формати файлів
    const fileFormats = [
        { value: "json", label: "JSON", extension: ".json" },
        { value: "csv", label: "CSV", extension: ".csv" },
        { value: "excel", label: "Excel", extension: ".xlsx" },
        { value: "pdf", label: "PDF", extension: ".pdf" }
    ];

    // Мови
    const languages = [
        { code: "uk", name: "Українська", flag: "🇺🇦" },
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "pl", name: "Polski", flag: "🇵🇱" }
    ];

    // Налаштування
    const defaultSettings = {
        language: "uk",
        units: "grams",
        autoSave: true,
        backup: false,
        theme: "light",
        notifications: true,
        defaultCategory: "Універсальні",
        defaultUnit: "г",
        calculationsPrecision: 2,
        defaultSeries: "EC"
    };

    // Кольори за замовчуванням
    const defaultColors = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
        "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080",
        "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DDA0DD"
    ];

    // Додаткові продукти для кожної серії
    const additionalProducts = {
        "EC": [
            "EC 160 - паста криюча для растрових відбитків",
            "EC 150 - прозора база для яскравіших кольорів",
            "EC 1501 HG - захисний лак високого блиску",
            "AS 1000 - антистатик (до 5%)",
            "EC 170 - гелевий сповільнювач"
        ],
        "CF": [
            "CF 150 - прозора база",
            "CF 1501 HG - завершальний лак",
            "CF 160 - високо тиксотропна добавка для деталей",
            "CF 1702 - сильний гелевий сповільнювач",
            "HCF - повільний отверджувач (до 5%)"
        ],
        "SPTN": [
            "SPTN9l - Flash white (швидкосохнучий)",
            "SPTN 91/l - Opaque white (криючий)",
            "Nyloncoat - отверджувач для нейлону (до 5%)",
            "SPT №2 - трансферний клей",
            "SPTNCR - розріджувач"
        ]
    };

    return {
        initialData,
        series,
        baseColors,
        categories,
        units,
        fileFormats,
        languages,
        defaultSettings,
        defaultColors,
        additionalProducts,
        generateMockData: function(count) {
            const mockPaints = [];
            const mockRecipes = [];
            
            for (let i = 1; i <= count; i++) {
                const randomBase = baseColors[Math.floor(Math.random() * baseColors.length)];
                const randomSerie = series[Math.floor(Math.random() * series.length)];
                
                mockPaints.push({
                    id: i,
                    name: `${randomSerie.name} ${randomBase.code}`,
                    series: randomSerie.id,
                    baseColorCode: randomBase.code,
                    category: randomSerie.category,
                    color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    manufacturer: "SICO",
                    article: `${randomSerie.id}-${randomBase.code}-MOCK-${i}`,
                    names: randomBase.name,
                    properties: randomSerie.properties
                });
            }
            
            return {
                paints: mockPaints,
                recipes: mockRecipes
            };
        }
    };
})();

window.SICOMIX = SICOMIX;
