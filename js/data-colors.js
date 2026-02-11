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
]
    };

    // ===== КАТАЛОГ СЕРІЙ ФАРБ З PDF =====
    const paintSeries = {
        // ТЕКСТИЛЬНІ ФАРБИ
        OTF: {
            id: "OTF",
            name: "OPATEX OTF",
            type: "Текстильна фарба",
            category: "Текстиль",
            application: "Водна фарба для прямого та трансферного друку на темних тканинах",
            base: "Водна основа",
            dilution: "Макс. 10% води, 10% OTF 5000, 10% OTF 7000",
            drying: "3 хв при 150°C",
            mesh: "P34T - P77T",
            colors: "Високопокривні, OTF 150, PPT пасти",
            additionalProducts: [
                "HOT відновник (3%)",
                "OTF 150/14 лак",
                "OTF 100/101 чорний блокер",
                "OTF база для об'ємного ефекту"
            ],
            storage: "1-2 роки при 10-25°C",
            notes: "Додавання 3% HOT відновника дає стійкість до прання без термофіксації"
        },
        SPTN: {
            id: "SPTN",
            name: "SICOPLAST SPTN",
            type: "Текстильна фарба",
            category: "Текстиль",
            application: "Розчинникова фарба для прямого та трансферного друку на всіх тканинах",
            base: "Розчинникова основа",
            dilution: "До 5% SPTN 1000",
            drying: "2 хв при 150-170°C",
            mesh: "34-120 ниток/см",
            colors: "Стандартні, тріадні, флуо, білі",
            additionalProducts: [
                "Nyloncoat відновник (5%)",
                "SPTN база для об'ємного ефекту",
                "SPTN 2 трансферний клей"
            ],
            storage: "5 років при 5-20°C",
            notes: "Дуже еластична, сатинове покриття"
        },
        SX: {
            id: "SX",
            name: "SICOTEX SX",
            type: "Текстильна фарба",
            category: "Текстиль",
            application: "Водна фарба для бавовни, синтетики та сумішей",
            base: "Водна основа",
            dilution: "Макс. 10% води або SX 5000",
            drying: "3 хв при 150°C",
            mesh: "P34-P90",
            colors: "CMYK, флуо, PPT пасти",
            additionalProducts: [
                "HSX відновник (3%)"
            ],
            storage: "1-2 роки вище 0°C",
            notes: "Екологічна, без розчинників, Oeko-Tex 100 сертифікат"
        },
        NST: {
            id: "NST",
            name: "NYLONSTAR NST",
            type: "Текстильна фарба",
            category: "Текстиль",
            application: "Розчинникова фарба для поліаміду (нейлон) та non-woven тканин",
            base: "Розчинникова основа",
            dilution: "До 15% NST 1702 уповільнювача",
            drying: "5 хв на повітрі, миттєво в тунелі",
            mesh: "P45-P90",
            colors: "Високопокривні (40,42,56), флуо, прозорі",
            additionalProducts: [
                "HNST SLOW каталізатор (5%)",
                "NST 150 прозора основа",
                "MP 3000 загущувач"
            ],
            storage: "24+ місяці",
            notes: "Висока еластичність та стійкість до стирання"
        },
        
        // УФ-ФАРБИ
        PLUV: {
            id: "PLUV",
            name: "UVIPLAST PLUV",
            type: "УФ-фарба",
            category: "УФ друк",
            application: "УФ-фарба та лак для самоклейок, банерів, металу, PP, PCV",
            base: "УФ-полімери",
            drying: "УФ-лампи 80-100 Вт, швидкість 25-30 м/хв",
            mesh: "P140-P185T",
            colors: "Стандартні, флуо, металіки",
            additionalProducts: [
                "HPLUV відновник"
            ],
            storage: "1-2 роки в чорних контейнерах при 5-25°C",
            notes: "Не містить розчинників, можливе жовтіння лаку через рік"
        },
        UV: {
            id: "UV",
            name: "UVILUX UV 150",
            type: "УФ-фарба",
            category: "УФ друк",
            application: "УФ-фарба та лак для паперу, картону, офсетного друку",
            base: "УФ-полімери",
            drying: "УФ-лампи 80-100 Вт, швидкість 25-30 м/хв",
            mesh: "P140-P185T",
            colors: "Стандартні, флуо, металіки",
            additionalProducts: [],
            storage: "1-2 роки в чорних контейнерах при 5-25°C",
            notes: "Висока еластичність, придатна для згинання"
        },
        
        // ФАРБИ ДЛЯ ПЛАСТИКУ
        TPP: {
            id: "TPP",
            name: "POLYPRO TPP",
            type: "Фарба для пластику",
            category: "Пластик",
            application: "Поліетилен, поліпропілен, полікарбонат",
            base: "Розчинникова основа",
            dilution: "TPP 1000-8000 (різні швидкості)",
            drying: "10 хв на повітрі, миттєво в тунелі",
            mesh: "P90-P120",
            colors: "Стандартні",
            additionalProducts: [
                "HTPP SLOW відновник",
                "TPP 160 деталізатор",
                "TPP 150 прозора основа",
                "AS 1000 антистатик"
            ],
            storage: "Необмежено",
            notes: "Для проблемних основ, необхідна активація матеріалу"
        },
        
        // ФАРБИ ДЛЯ ПАПЕРУ, КАРТОНУ
        AS: {
            id: "AS",
            name: "AQUASET AS",
            type: "Фарба для паперу",
            category: "Папір/картон",
            application: "Картон, папір (>130 г/м²), дерево, гофрокартон",
            base: "Водна основа",
            dilution: "Вода або AS 5000",
            drying: "1 година на повітрі",
            mesh: "P77-P140",
            colors: "Сатинові, блискучі (AQUAGLOSS AG)",
            additionalProducts: [
                "Утворювач (1%) для водостійкості"
            ],
            storage: "4 роки при 5-25°C",
            notes: "Екологічна, для дитячих іграшок та харчових упаковок"
        },
        CF: {
            id: "CF",
            name: "CARTOFLEX CF",
            type: "Фарба для паперу",
            category: "Папір/картон",
            application: "Картон, папір, самоклейки, дерево, метал",
            base: "Розчинникова основа",
            dilution: "CF 1000-8000 (різні швидкості)",
            drying: "4 хв на повітрі, миттєво в тунелі",
            mesh: "P77-P120",
            colors: "Стандартні",
            additionalProducts: [
                "CF 150 прозора основа",
                "CF 1501 HG лак",
                "CF 160 деталізатор",
                "CF 1702 уповільнювач",
                "AS 1000 антистатик",
                "HCF уповільнений утворювач (5%)"
            ],
            storage: "Необмежено",
            notes: "Півматова поверхня, дуже хороша стійкість до світла"
        },
        
        // УНІВЕРСАЛЬНА РОЗЧИННИКОВА
        EC: {
            id: "EC",
            name: "Універсальна розчинникова",
            type: "Універсальна фарба",
            category: "Універсальна",
            application: "Самоклейки, PCV, папір, картон, метал, пластики",
            base: "Розчинникова основа",
            dilution: "EC 1000-8000 (різні швидкості)",
            drying: "6 хв на повітрі, миттєво в тунелі",
            mesh: "P77-P120",
            colors: "Стандартні, флуо, тріадні",
            additionalProducts: [
                "EC 160 паста для покриття",
                "EC 150 прозора основа",
                "EC 1501 HG лак",
                "EC 170/1702 уповільнювач",
                "MP 1000 матовий порошок",
                "HEC утворювач (3-5%)"
            ],
            storage: "Необмежено",
            notes: "Високий блиск, спеціальні кольори з екстремальною світлотривалістю"
        }
    };

    // ===== КОЛЬОРОВА ПАЛІТРА ДЛЯ КОЖНОЇ СЕРІЇ =====
    const seriesColors = {
        // Базові кольори з вашого списку
        baseColors: [
            { code: "10", name: "Фіолетовий", hex: "#4b3b8f" },
            { code: "20", name: "Синій", hex: "#0033a0" },
            { code: "20/B", name: "Синій Flex", hex: "#002f6c" },
            { code: "P20/5", name: "Pantone Blue", hex: "#1f4aa8" },
            { code: "22", name: "Ультрамарин", hex: "#1c3faa" },
            { code: "24", name: "Блакитний", hex: "#2f6ecf" },
            { code: "26", name: "Світло-блакитний", hex: "#5fa8ff" },
            { code: "P26/2", name: "Pantone Blue 2", hex: "#3b6db3" },
            { code: "27", name: "Бірюзовий", hex: "#00a3a3" },
            { code: "30", name: "Темно-зелений", hex: "#004d2a" },
            { code: "31", name: "Зелений", hex: "#007a3d" },
            { code: "32", name: "Яскраво-зелений", hex: "#00a651" },
            { code: "33", name: "Зелений трава", hex: "#4caf50" },
            { code: "40", name: "Жовтий", hex: "#ffd400" },
            { code: "41", name: "Цитриновий", hex: "#fff176" },
            { code: "42", name: "Медовий", hex: "#ffb300" },
            { code: "50", name: "Помаранчевий", hex: "#ff7a00" },
            { code: "51", name: "Світло-помаранчевий", hex: "#ff9800" },
            { code: "56", name: "Червоний", hex: "#d10000" },
            { code: "60", name: "Темно-червоний", hex: "#8b0000" },
            { code: "P60/38", name: "Pantone Red", hex: "#b11226" },
            { code: "61", name: "Малиновий", hex: "#b00040" },
            { code: "P61/15", name: "Pantone Magenta", hex: "#c2185b" },
            { code: "70", name: "Магента", hex: "#e91e63" },
            { code: "80", name: "Коричневий", hex: "#6b3e26" },
            { code: "81", name: "Темно-коричневий", hex: "#4e342e" },
            { code: "82", name: "Бежевий", hex: "#d7b899" },
            { code: "90", name: "Білий", hex: "#ffffff" },
            { code: "91", name: "Криючий білий", hex: "#f5f5f5" },
            { code: "100", name: "Чорний", hex: "#000000" },
            { code: "110", name: "Срібло", hex: "#b0b0b0" },
            { code: "120", name: "Золото", hex: "#c9a400" },
            { code: "130", name: "Флуо жовтий", hex: "#eaff00" },
            { code: "131", name: "Флуо оранж", hex: "#ff6f00" },
            { code: "132", name: "Флуо червоний", hex: "#ff1744" },
            { code: "133", name: "Флуо рожевий", hex: "#ff4081" },
            { code: "134", name: "Флуо зелений", hex: "#00e676" },
            { code: "135", name: "Флуо синій", hex: "#2979ff" },
            { code: "136", name: "Флуо блакитний", hex: "#40c4ff" },
            { code: "140", name: "CMYK Yellow", hex: "#ffeb3b" },
            { code: "141", name: "CMYK Cyan", hex: "#00bcd4" },
            { code: "142", name: "CMYK Magenta", hex: "#e91e63" },
            { code: "143", name: "CMYK Black", hex: "#212121" }
        ],
        
        // Специфічні кольори для серій
        seriesSpecific: {
            NST: {
                highCoverage: ["40", "42", "56"],
                fluorescent: ["130", "131", "132", "133", "134", "135"],
                transparent: ["15", "25", "35", "55", "65", "75", "140", "141", "142", "143"]
            },
            EC: {
                specialColors: [
                    { code: "60/146", name: "Вогняний червоний", hex: "#b11226" },
                    { code: "61/163", name: "Темний вогняний червоний", hex: "#8b0000" },
                    { code: "91 Q", name: "Білий напівматовий", hex: "#f5f5f5" }
                ]
            }
        }
    };

    // Категорії фарб (оновлено з PDF)
    const categories = [
        "Текстиль",
        "УФ друк", 
        "Пластик",
        "Папір/картон",
        "Універсальна",
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

    // Серії фарб для фільтрації
    const seriesList = [
        "OTF",
        "SPTN", 
        "SX",
        "NST",
        "PLUV",
        "UV",
        "TPP",
        "AS",
        "CF",
        "EC"
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
        defaultCategory: "Текстиль",
        defaultUnit: "г",
        calculationsPrecision: 2
    };

    // Функція для отримання серій за категорією
    function getSeriesByCategory(category) {
        const result = [];
        for (const key in paintSeries) {
            if (paintSeries[key].category === category) {
                result.push(paintSeries[key]);
            }
        }
        return result;
    }

    // Функція для отримання кольорів серії
    function getColorsBySeries(seriesId) {
        if (seriesColors.seriesSpecific[seriesId]) {
            return {
                base: seriesColors.baseColors,
                specific: seriesColors.seriesSpecific[seriesId]
            };
        }
        return {
            base: seriesColors.baseColors,
            specific: null
        };
    }

    return {
        initialData,
        paintSeries,
        seriesColors,
        categories,
        seriesList,
        units,
        fileFormats,
        languages,
        defaultSettings,
        getSeriesByCategory,
        getColorsBySeries
    };
})();

window.SICOMIX = SICOMIX;
