if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    // ------------------------------------------------------------
    // 1. СЕРІЇ ФАРБ (повні технічні карти, без змін)
    // ------------------------------------------------------------
    const series = [
        {
            id: 'EC',
            name: { pl: 'EC', en: 'EC', uk: 'EC' },
            fullName: { pl: 'EcoColor', en: 'EcoColor', uk: 'EcoColor' },
            type: { pl: 'rozpuszczalnikowa', en: 'solvent-based', uk: 'розчинникова' },
            finish: { pl: 'wysoki połysk', en: 'high gloss', uk: 'високий глянець' },
            mesh: { pl: 'P77–P120', en: 'P77–P120', uk: 'P77–P120' },
            substrates: [ /* ... залишаємо оригінал ... */ ],
            curingDrop: 1.0,
            dilutionRate: 15,
            curingRate: 5,
            thinners: [ /* ... */ ],
            additives: [ /* ... */ ],
            hardeners: [ /* ... */ ],
            specialColors: [
                { code: '60/146', name: { pl: 'Ognisty czerwony', en: 'Fire red', uk: 'Вогняний червоний' }, description: { pl: 'ekstremalnie długa odporność na światło', en: 'extremely long lightfastness', uk: 'екстремально довга світлостійкість' } },
                { code: '61/163', name: { pl: 'Ciemna ognista czerwień', en: 'Dark fire red', uk: 'Темний вогняний червоний' }, description: { pl: 'ekstremalnie długa odporność na światło', en: 'extremely long lightfastness', uk: 'екстремально довга світлостійкість' } },
                { code: '91 Q', name: { pl: 'Biała półmatowa', en: 'Semi-gloss white', uk: 'Білий напівматовий' }, description: { pl: 'wyższa lepkość, do chłonnych papierów', en: 'higher viscosity, for absorbent papers', uk: 'вища в\'язкість, для вбирного паперу' } }
            ],
            storage: { pl: 'nieograniczone', en: 'unlimited', uk: 'необмежений' },
            yield: { pl: '~40 m²/l', en: '~40 m²/l', uk: '~40 м²/л' },
            cleaning: { pl: 'CT 1000 / CT 1000/1', en: 'CT 1000 / CT 1000/1', uk: 'CT 1000 / CT 1000/1' }
        },
        {
            id: 'SPTN',
            fullName: { pl: 'Sicoplast', en: 'Sicoplast', uk: 'Sicoplast' },
            // ... інші серії (скорочено для прикладу, в реальному коді залиште повні дані)
        },
        {
            id: 'OTF',
            fullName: { pl: 'Opatex', en: 'Opatex', uk: 'Opatex' },
        },
        {
            id: 'PLUV',
            fullName: { pl: 'Uviplast', en: 'Uviplast', uk: 'Uviplast' },
        },
        {
            id: 'SX',
            fullName: { pl: 'Sicotex', en: 'Sicotex', uk: 'Sicotex' },
        },
        {
            id: 'TPP',
            fullName: { pl: 'Polypro', en: 'Polypro', uk: 'Polypro' },
        },
        {
            id: 'UV',
            fullName: { pl: 'Uvilux', en: 'Uvilux', uk: 'Uvilux' },
        },
        {
            id: 'AS',
            fullName: { pl: 'Aquaset', en: 'Aquaset', uk: 'Aquaset' },
        },
        {
            id: 'CF',
            fullName: { pl: 'Cartoflex', en: 'Cartoflex', uk: 'Cartoflex' },
        },
        {
            id: 'NST',
            fullName: { pl: 'Nylonstar', en: 'Nylonstar', uk: 'Nylonstar' },
            specialColors: [ /* ... */ ],
            seriesSpecific: { /* ... */ }
        }
    ];

    // ------------------------------------------------------------
    // 2. ГЕНЕРАЦІЯ КАТАЛОГУ ФАРБ (з усіма необхідними полями)
    // ------------------------------------------------------------
    const paints = [];

    // Допоміжна функція – генерує колір на основі коду
    function getColorFromCode(code) {
        const hash = String(code).split('').reduce((a,b) => a + b.charCodeAt(0), 0);
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 55%)`;
    }

    // Додаємо базову фарбу для кожної серії
    series.forEach(s => {
        paints.push({
            id: `${s.id}-base`,
            code: s.id,
            name: s.fullName, // об'єкт {pl, en, uk}
            color: getColorFromCode(s.id),
            category: s.id,
            manufacturer: 'SICO',
            article: `${s.id}-001`,
            description: {
                pl: `Farba ${s.fullName.pl} – ${s.type?.pl || ''}`,
                en: `Paint ${s.fullName.en} – ${s.type?.en || ''}`,
                uk: `Фарба ${s.fullName.uk} – ${s.type?.uk || ''}`
            },
            cmyk: null
        });

        // Спеціальні кольори серії (якщо є)
        if (s.specialColors) {
            s.specialColors.forEach(sc => {
                paints.push({
                    id: `${s.id}-${sc.code}`,
                    code: sc.code,
                    name: sc.name,
                    color: getColorFromCode(sc.code),
                    category: s.id,
                    manufacturer: 'SICO',
                    article: `${s.id}-${String(sc.code).replace(/\D/g,'')}`,
                    description: sc.description || {
                        pl: `Kolor specjalny serii ${s.fullName.pl}`,
                        en: `Special color of ${s.fullName.en} series`,
                        uk: `Спеціальний колір серії ${s.fullName.uk}`
                    },
                    cmyk: null
                });
            });
        }
    });

    // Стандартні кольори (CMYK + базові)
    const standardColors = [
        { code: '10', name: {pl:'Czerwony', en:'Red', uk:'Червоний'}, color: '#e63946' },
        { code: '20', name: {pl:'Zielony', en:'Green', uk:'Зелений'}, color: '#2a9d8f' },
        { code: '30', name: {pl:'Niebieski', en:'Blue', uk:'Синій'}, color: '#3a86ff' },
        { code: '31', name: {pl:'Cyan', en:'Cyan', uk:'Блакитний'}, color: '#4cc9f0' },
        { code: '32', name: {pl:'Magenta', en:'Magenta', uk:'Магента'}, color: '#f72585' },
        { code: '33', name: {pl:'Żółty', en:'Yellow', uk:'Жовтий'}, color: '#ffe45c' },
        { code: '40', name: {pl:'Czarny', en:'Black', uk:'Чорний'}, color: '#1e1e2a' },
        { code: '41', name: {pl:'Cyan', en:'Cyan', uk:'Блакитний'}, color: '#4cc9f0' },
        { code: '42', name: {pl:'Magenta', en:'Magenta', uk:'Магента'}, color: '#f72585' },
        { code: '43', name: {pl:'Żółty', en:'Yellow', uk:'Жовтий'}, color: '#ffe45c' },
        { code: '50', name: {pl:'Cyan', en:'Cyan', uk:'Блакитний'}, color: '#4cc9f0' },
        { code: '51', name: {pl:'Magenta', en:'Magenta', uk:'Магента'}, color: '#f72585' },
        { code: '52', name: {pl:'Żółty', en:'Yellow', uk:'Жовтий'}, color: '#ffe45c' }
    ];

    standardColors.forEach(c => {
        paints.push({
            id: c.code,
            code: c.code,
            name: c.name,
            color: c.color,
            category: 'Standard',
            manufacturer: 'SICO',
            article: `STD-${c.code}`,
            description: {
                pl: `Standardowy kolor bazowy`,
                en: `Standard base color`,
                uk: `Стандартний базовий колір`
            },
            cmyk: null
        });
    });

    // Циклічне додавання кольорів 60–258 (для повноти)
    const colorNames = [
        {pl:'Cyan', en:'Cyan', uk:'Блакитний'},
        {pl:'Magenta', en:'Magenta', uk:'Магента'},
        {pl:'Żółty', en:'Yellow', uk:'Жовтий'}
    ];
    for (let i = 60; i <= 258; i++) {
        const base = (i - 60) % 3;
        paints.push({
            id: i,
            code: i.toString(),
            name: colorNames[base],
            color: standardColors[base+1]?.color || '#3a86ff',
            category: 'Standard',
            manufacturer: 'SICO',
            article: `STD-${i}`,
            description: {
                pl: `Kolor standardowy`,
                en: `Standard color`,
                uk: `Стандартний колір`
            },
            cmyk: null
        });
    }

    // ------------------------------------------------------------
    // 3. ПІДКЛАДКИ, КАТЕГОРІЇ, ОДИНИЦІ, НАЛАШТУВАННЯ
    // ------------------------------------------------------------
    const substrates = [ /* залиште ваш оригінальний масив */ ];
    const categories = ['EC','SPTN','OTF','PLUV','SX','TPP','UV','AS','CF','NST','Standard','EC Special'];
    const units = [
        { value: "г", label: { pl: "Gramy", en: "Grams", uk: "Грами" } },
        { value: "кг", label: { pl: "Kilogramy", en: "Kilograms", uk: "Кілограми" } },
        { value: "мл", label: { pl: "Mililitry", en: "Milliliters", uk: "Мілілітри" } },
        { value: "л", label: { pl: "Litry", en: "Liters", uk: "Літри" } },
        { value: "%", label: { pl: "Procenty", en: "Percent", uk: "Відсотки" } }
    ];
    const defaultSettings = {
        language: "pl",
        units: "grams",
        autoSave: true,
        backup: false,
        theme: "dark",
        notifications: true,
        defaultCategory: "EC",
        defaultUnit: "г",
        calculationsPrecision: 2,
        defaultSubstrate: { pl: "papier", en: "paper", uk: "папір" }
    };
    const recipes = [];

    return {
        series,
        paints,
        substrates,
        categories,
        units,
        defaultSettings,
        recipes
    };
})();

window.SICOMIX = SICOMIX;
