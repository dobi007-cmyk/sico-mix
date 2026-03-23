// ========== МОДУЛЬ ДРУКУ ЕТИКЕТКИ ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';

// Налаштування дизайну для різних серій (кольори, логотипи)
const seriesStyles = {
    EC: {
        headerBg: '#10b981',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#10b981',
        weightBorder: '#10b981',
        weightColor: '#10b981',
        noteColor: '#e63946',
        logoBg: '#fbbf24',
        logoText: '#10b981',
        seriesDisplay: 'EURECO EC'
    },
    CF: {
        headerBg: '#dc2626',
        headerBorder: '#fcd34d',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#dc2626',
        weightBorder: '#dc2626',
        weightColor: '#dc2626',
        noteColor: '#b91c1c',
        logoBg: '#fcd34d',
        logoText: '#dc2626',
        seriesDisplay: 'CARTOFLEX CF'
    },
    PLUV: {
        headerBg: '#2563eb',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#2563eb',
        weightBorder: '#2563eb',
        weightColor: '#2563eb',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#2563eb',
        seriesDisplay: 'UVIPLAST PLUV'
    },
    PLUV_LED: {
        headerBg: '#2563eb',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#2563eb',
        weightBorder: '#2563eb',
        weightColor: '#2563eb',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#2563eb',
        seriesDisplay: 'UVIPLAST PLUV LED'
    },
    SX: {
        headerBg: '#fbbf24',
        headerBorder: '#000000',
        titleColor: '#1e1e1e',
        subColor: '#1e1e1e',
        productNameColor: '#b45309',
        weightBorder: '#b45309',
        weightColor: '#b45309',
        noteColor: '#b91c1c',
        logoBg: '#000000',
        logoText: '#fbbf24',
        seriesDisplay: 'SICOTEX SX'
    },
    SPTN: {
        headerBg: '#7e22ce',
        headerBorder: '#fcd34d',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#7e22ce',
        weightBorder: '#7e22ce',
        weightColor: '#7e22ce',
        noteColor: '#fbbf24',
        logoBg: '#fcd34d',
        logoText: '#7e22ce',
        seriesDisplay: 'SICOPLAST SPTN'
    },
    TPP: {
        headerBg: '#a78bfa',
        headerBorder: '#fbbf24',
        titleColor: '#1e1e1e',
        subColor: '#1e1e1e',
        productNameColor: '#6d28d9',
        weightBorder: '#6d28d9',
        weightColor: '#6d28d9',
        noteColor: '#b91c1c',
        logoBg: '#fbbf24',
        logoText: '#6d28d9',
        seriesDisplay: 'POLYPRO TPP'
    },
    AS: {
        headerBg: '#0e7a7a',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#0e7a7a',
        weightBorder: '#0e7a7a',
        weightColor: '#0e7a7a',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#0e7a7a',
        seriesDisplay: 'AQUASET AS'
    },
    OTF: {
        headerBg: '#2563eb',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#2563eb',
        weightBorder: '#2563eb',
        weightColor: '#2563eb',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#2563eb',
        seriesDisplay: 'OPATEX OTF'
    },
    NST: {
        headerBg: '#1e293b',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#1e293b',
        weightBorder: '#1e293b',
        weightColor: '#1e293b',
        noteColor: '#e63946',
        logoBg: '#fbbf24',
        logoText: '#e63946',
        seriesDisplay: 'SICONYL NST'
    },
    QS: {
        headerBg: '#f97316',
        headerBorder: '#fcd34d',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#f97316',
        weightBorder: '#f97316',
        weightColor: '#f97316',
        noteColor: '#fcd34d',
        logoBg: '#fcd34d',
        logoText: '#f97316',
        seriesDisplay: 'QUICKSET QS'
    },
    SN: {
        headerBg: '#6b7280',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#6b7280',
        weightBorder: '#6b7280',
        weightColor: '#6b7280',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#6b7280',
        seriesDisplay: 'SICONYL SN'
    },
    default: {
        headerBg: '#6b7280',
        headerBorder: '#fbbf24',
        titleColor: '#ffffff',
        subColor: '#ffffff',
        productNameColor: '#6b7280',
        weightBorder: '#6b7280',
        weightColor: '#6b7280',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#6b7280',
        seriesDisplay: 'SICO'
    }
};

// Функція для отримання SVG знаків небезпеки (ADR)
function getHazardPictogramsSvg(seriesId) {
    const pictograms = {
        EC: ['flammable'],           // клас 3
        CF: ['flammable'],
        PLUV: ['flammable', 'environment'], // легкозаймиста + небезпечна для довкілля
        PLUV_LED: ['flammable', 'environment'],
        TPP: ['flammable', 'environment'],
        AS: ['non-hazardous'],       // зелений знак безпеки
        SX: ['non-hazardous'],
        OTF: ['non-hazardous'],
        SPTN: ['non-hazardous'],
        NST: ['flammable'],          // якщо потрібно
        QS: ['flammable'],
        SN: ['flammable']
    };

    const symbols = pictograms[seriesId] || [];
    if (symbols.length === 0) return '';

    const svgIcons = symbols.map(symbol => {
        if (symbol === 'flammable') {
            // Знак класу 3: червоний ромб з полум'ям
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" style="display:inline-block; vertical-align:middle;">
                <rect width="100" height="100" fill="#FF4D00" stroke="black" stroke-width="2" />
                <polygon points="50,20 70,40 70,60 50,80 30,60 30,40" fill="white" stroke="black" stroke-width="1.5" />
                <path d="M50,25 L60,40 L55,40 L65,55 L55,55 L50,70 L45,55 L35,55 L45,40 L40,40 Z" fill="black" />
            </svg>`;
        }
        if (symbol === 'environment') {
            // Знак небезпеки для довкілля: мертва риба та дерево
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" style="display:inline-block; vertical-align:middle;">
                <rect width="100" height="100" fill="white" stroke="black" stroke-width="2" />
                <path d="M30,70 L50,25 L70,70 L30,70" fill="white" stroke="black" stroke-width="1.5" />
                <path d="M45,55 L55,55 L50,70 L45,55 Z" fill="white" stroke="black" />
                <circle cx="50" cy="48" r="3" fill="black" />
                <path d="M40,85 L60,85" stroke="black" stroke-width="2" />
                <path d="M35,30 L45,35 L55,30 L65,35" stroke="black" fill="none" />
                <path d="M20,45 L30,40 L40,45 L50,40 L60,45 L70,40 L80,45" stroke="black" fill="none" />
                <path d="M30,70 L50,30 L70,70" stroke="black" fill="none" />
                <path d="M45,75 L55,75" stroke="black" stroke-width="1.5" />
                <text x="50" y="92" text-anchor="middle" font-size="12" fill="black">🐟</text>
            </svg>`;
        }
        if (symbol === 'non-hazardous') {
            // Зелена галочка
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" style="display:inline-block; vertical-align:middle;">
                <circle cx="50" cy="50" r="45" fill="#10b981" stroke="none" />
                <path d="M30,55 L45,70 L70,35" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" />
            </svg>`;
        }
        return '';
    }).join('');
    return `<div class="pictograms">${svgIcons}</div>`;
}

// Повні тексти безпеки для кожної серії (залишаються без змін)
const safetyTexts = {
    EC: {
        uk: {
            name: "EURECO EC",
            contains: "1-етоксипропан-2-ол",
            hazards: [
                "H226 - Легкозаймиста рідина і пари",
                "H336 - Може викликати сонливість або запаморочення"
            ],
            precautions: [
                "P271 - Використовувати тільки на відкритому повітрі або в добре вентильованому приміщенні",
                "P303+P361+P353 - ПРИ ПОТРАПЛЯННІ НА ШКІРУ (або волосся): негайно зняти весь забруднений одяг. Промити шкіру водою/прийняти душ",
                "P304+P340 - ПРИ ВДИХАННІ: вивести людину на свіже повітря і забезпечити їй спокій у положенні, зручному для дихання",
                "P312 - При поганому самопочутті звернутися до лікаря",
                "P370+P378 - У разі пожежі: використовувати відповідні засоби гасіння",
                "P405 - Зберігати під замком",
                "P501 - Утилізувати вміст/контейнер на спеціалізованому підприємстві"
            ]
        },
        en: {
            name: "EURECO EC",
            contains: "1-ethoxypropan-2-ol",
            hazards: [
                "H226 - Flammable liquid and vapour",
                "H336 - May cause drowsiness or dizziness"
            ],
            precautions: [
                "P271 - Use only outdoors or in a well-ventilated area",
                "P303+P361+P353 - IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water/shower",
                "P304+P340 - IF INHALED: Remove person to fresh air and keep comfortable for breathing",
                "P312 - Call a POISON CENTER/doctor if you feel unwell",
                "P370+P378 - In case of fire: Use appropriate extinguishing media",
                "P405 - Store locked up",
                "P501 - Dispose of contents/container to an authorized waste disposal facility"
            ]
        },
        pl: {
            name: "EURECO EC",
            contains: "1-etoksypropan-2-ol",
            hazards: [
                "H226 - Łatwopalna ciecz i pary",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy"
            ],
            precautions: [
                "P271 - Stosować wyłącznie na zewnątrz lub w dobrze wentylowanym pomieszczeniu",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić warunki do odpoczynku w pozycji umożliwiającej swobodne oddychanie",
                "P312 - W przypadku złego samopoczucia skontaktować się z OŚRODKIEM ZATRUĆ lub lekarzem",
                "P370+P378 - W przypadku pożaru: używać odpowiednich środków gaśniczych",
                "P405 - Przechowywać pod zamknięciem",
                "P501 - Zawartość/pojemnik usuwać do upoważnionego zakładu utylizacji odpadów"
            ]
        }
    },
    CF: {
        uk: {
            name: "CARTOFLEX CF",
            contains: "1-етоксипропан-2-ол",
            hazards: ["H336 - Може викликати сонливість або запаморочення"],
            precautions: [
                "P261 - Уникати вдихання пилу/диму/газу/туману/парів/аерозолю",
                "P271 - Використовувати тільки на відкритому повітрі або в добре вентильованому приміщенні",
                "P312 - При поганому самопочутті звернутися до лікаря",
                "P304+P340 - ПРИ ВДИХАННІ: вивести людину на свіже повітря і забезпечити спокій",
                "P405 - Зберігати під замком",
                "P501 - Утилізувати вміст/контейнер відповідно до чинних правил"
            ]
        },
        en: {
            name: "CARTOFLEX CF",
            contains: "1-ethoxypropan-2-ol",
            hazards: ["H336 - May cause drowsiness or dizziness"],
            precautions: [
                "P261 - Avoid breathing dust/fume/gas/mist/vapours/spray",
                "P271 - Use only outdoors or in a well-ventilated area",
                "P312 - Call a POISON CENTER/doctor if you feel unwell",
                "P304+P340 - IF INHALED: Remove person to fresh air and keep comfortable for breathing",
                "P405 - Store locked up",
                "P501 - Dispose of contents/container in accordance with local regulations"
            ]
        },
        pl: {
            name: "CARTOFLEX CF",
            contains: "1-etoksypropan-2-ol",
            hazards: ["H336 - Może wywoływać uczucie senności lub zawroty głowy."],
            precautions: [
                "P261 - Unikać wdychania pyłu/dymu/gazu/mgły/par/rozpylonej cieczy.",
                "P271 - Stosować wyłącznie na zewnątrz lub w dobrze wentylowanym pomieszczeniu.",
                "P312 - W przypadku złego samopoczucia skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem.",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.",
                "P405 - Przechowywać pod zamknięciem.",
                "P501 - Zawartość/pojemnik usuwać zgodnie z obowiązującymi przepisami."
            ]
        }
    },
    PLUV: {
        uk: {
            name: "UVIPLAST PLUV",
            contains: "Ацетат 2-етокси-1-метилетилу та вуглеводні, C9, ароматичні (бензол < 0,1% мас.)",
            hazards: [
                "H226 - Легкозаймиста рідина і пари",
                "H304 - Може бути смертельним при ковтанні та потраплянні в дихальні шляхи",
                "H336 - Може викликати сонливість або запаморочення",
                "H412 - Шкідливо для водних організмів, спричиняє довготривалі наслідки"
            ],
            precautions: [
                "P210 - Тримати подалі від джерел тепла, іскр, відкритого вогню. Не палити",
                "P280 - Використовувати захисні рукавиці/захисний одяг/захист очей/захист обличчя",
                "P301+P310 - ПРИ ПРОКОВТУВАННІ: негайно звернутися до лікаря",
                "P303+P361+P353 - ПРИ ПОТРАПЛЯННІ НА ШКІРУ (або волосся): негайно зняти весь забруднений одяг. Промити шкіру водою/душем",
                "P304+P340 - ПРИ ВДИХАННІ: вивести людину на свіже повітря і забезпечити спокій у положенні, зручному для дихання",
                "P403+P233 - Зберігати в добре вентильованому місці. Тримати контейнер щільно закритим",
                "EUH066 - Повторюване впливання може викликати сухість або тріщини шкіри"
            ]
        },
        en: {
            name: "UVIPLAST PLUV",
            contains: "2-ethoxy-1-methylethyl acetate and hydrocarbons, C9, aromatics (benzene < 0.1% w/w)",
            hazards: [
                "H226 - Flammable liquid and vapour",
                "H304 - May be fatal if swallowed and enters airways",
                "H336 - May cause drowsiness or dizziness",
                "H412 - Harmful to aquatic life with long lasting effects"
            ],
            precautions: [
                "P210 - Keep away from heat, sparks, open flames. No smoking",
                "P280 - Wear protective gloves/protective clothing/eye protection/face protection",
                "P301+P310 - IF SWALLOWED: Immediately call a POISON CENTER/doctor",
                "P303+P361+P353 - IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water/shower",
                "P304+P340 - IF INHALED: Remove person to fresh air and keep comfortable for breathing",
                "P403+P233 - Store in a well-ventilated place. Keep container tightly closed",
                "EUH066 - Repeated exposure may cause skin dryness or cracking"
            ]
        },
        pl: {
            name: "UVIPLAST PLUV",
            contains: "Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)",
            hazards: [
                "H226 - Łatwopalna ciecz i pary.",
                "H304 - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią.",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy.",
                "H412 - Działa szkodliwie na organizmy wodne, powodując długotrwałe skutki."
            ],
            precautions: [
                "P210 - Przechowywać z dala od źródeł ciepła, gorących powierzchni, źródeł skażenia, otwartego ognia i innych źródeł zapłonu. Nie palić.",
                "P280 - Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy.",
                "P301+P310 - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem/...",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem.",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.",
                "P403+P233 - Przechowywać w dobrze wentylowanym miejscu. Przechowywać pojemnik szczelnie zamknięty.",
                "EUH066 - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry."
            ]
        }
    },
    TPP: {
        uk: {
            name: "POLYPRO TPP",
            contains: "Ацетат 2-етокси-1-метилетилу та вуглеводні, C9, ароматичні (бензол < 0,1% мас.)",
            hazards: [
                "H226 - Легкозаймиста рідина і пари",
                "H304 - Може бути смертельним при ковтанні та потраплянні в дихальні шляхи",
                "H336 - Може викликати сонливість або запаморочення",
                "H412 - Шкідливо для водних організмів, спричиняє довготривалі наслідки"
            ],
            precautions: [
                "P210 - Тримати подалі від джерел тепла, іскр, відкритого вогню. Не палити",
                "P280 - Використовувати захисні рукавиці/захисний одяг/захист очей/захист обличчя",
                "P301+P310 - ПРИ ПРОКОВТУВАННІ: негайно звернутися до лікаря",
                "P303+P361+P353 - ПРИ ПОТРАПЛЯННІ НА ШКІРУ (або волосся): негайно зняти весь забруднений одяг. Промити шкіру водою/душем",
                "P304+P340 - ПРИ ВДИХАННІ: вивести людину на свіже повітря і забезпечити спокій у положенні, зручному для дихання",
                "P403+P233 - Зберігати в добре вентильованому місці. Тримати контейнер щільно закритим",
                "EUH066 - Повторюване впливання може викликати сухість або тріщини шкіри"
            ]
        },
        en: {
            name: "POLYPRO TPP",
            contains: "2-ethoxy-1-methylethyl acetate and hydrocarbons, C9, aromatics (benzene < 0.1% w/w)",
            hazards: [
                "H226 - Flammable liquid and vapour",
                "H304 - May be fatal if swallowed and enters airways",
                "H336 - May cause drowsiness or dizziness",
                "H412 - Harmful to aquatic life with long lasting effects"
            ],
            precautions: [
                "P210 - Keep away from heat, sparks, open flames. No smoking",
                "P280 - Wear protective gloves/protective clothing/eye protection/face protection",
                "P301+P310 - IF SWALLOWED: Immediately call a POISON CENTER/doctor",
                "P303+P361+P353 - IF ON SKIN (or hair): Take off immediately all contaminated clothing. Rinse skin with water/shower",
                "P304+P340 - IF INHALED: Remove person to fresh air and keep comfortable for breathing",
                "P403+P233 - Store in a well-ventilated place. Keep container tightly closed",
                "EUH066 - Repeated exposure may cause skin dryness or cracking"
            ]
        },
        pl: {
            name: "POLYPRO TPP",
            contains: "Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)",
            hazards: [
                "H226 - Łatwopalna ciecz i pary.",
                "H304 - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią.",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy.",
                "H412 - Działa szkodliwie na organizmy wodne, powodując długotrwałe skutki."
            ],
            precautions: [
                "P210 - Przechowywać z dala od źródeł ciepła, gorących powierzchni, źródeł skażenia, otwartego ognia i innych źródeł zapłonu. Nie palić.",
                "P280 - Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy.",
                "P301+P310 - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem/...",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem.",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.",
                "P403+P233 - Przechowywać w dobrze wentylowanym miejscu. Przechowywać pojemnik szczelnie zamknięty.",
                "EUH066 - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry."
            ]
        }
    },
    AS: {
        uk: { name: "AQUASET AS", nonHazardous: true, text: "Суміш не класифікується як небезпечна." },
        en: { name: "AQUASET AS", nonHazardous: true, text: "The mixture is not classified as hazardous." },
        pl: { name: "AQUASET AS", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    SX: {
        uk: { name: "SICOTEX SX", nonHazardous: true, text: "Суміш не класифікується як небезпечна." },
        en: { name: "SICOTEX SX", nonHazardous: true, text: "The mixture is not classified as hazardous." },
        pl: { name: "SICOTEX SX", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    OTF: {
        uk: { name: "OPATEX OTF", nonHazardous: true, text: "Суміш не класифікується як небезпечна." },
        en: { name: "OPATEX OTF", nonHazardous: true, text: "The mixture is not classified as hazardous." },
        pl: { name: "OPATEX OTF", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    SPTN: {
        uk: { name: "SICOPLAST SPTN", nonHazardous: true, text: "Суміш не класифікується як небезпечна." },
        en: { name: "SICOPLAST SPTN", nonHazardous: true, text: "The mixture is not classified as hazardous." },
        pl: { name: "SICOPLAST SPTN", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    }
};

// Допоміжна функція для генерації HTML безпеки на основі даних
function generateSafetyHtml(seriesId, lang) {
    const data = safetyTexts[seriesId];
    if (!data) return '';
    const langData = data[lang] || data.pl;
    if (langData.nonHazardous) {
        return `
            <div class="safety-info">
                <div class="safety-header">
                    <strong>${i18n.t('safety_trade_name')}:</strong> ${langData.name}
                    ${getHazardPictogramsSvg(seriesId)}
                </div>
                <p>${langData.text}</p>
                <p><em>${i18n.t('safety_professional_use')}</em></p>
            </div>
        `;
    }
    // Небезпечна суміш
    let hazardsHtml = langData.hazards.map(h => `<p><strong>${h.split(' - ')[0]}</strong> ${h.split(' - ')[1]}</p>`).join('');
    let precautionsHtml = langData.precautions.map(p => `<p><strong>${p.split(' - ')[0]}</strong> ${p.split(' - ')[1]}</p>`).join('');
    return `
        <div class="safety-info">
            <div class="safety-header">
                <strong>${i18n.t('safety_trade_name')}:</strong> ${langData.name}
                ${getHazardPictogramsSvg(seriesId)}
            </div>
            <p><strong>${i18n.t('safety_contains')}:</strong> ${langData.contains}</p>
            <div class="hazards"><strong>${i18n.t('safety_hazards')}</strong> ${hazardsHtml}</div>
            <div class="precautions"><strong>${i18n.t('safety_precautions')}</strong> ${precautionsHtml}</div>
            <p><em>${i18n.t('safety_professional_use')}</em></p>
        </div>
    `;
}

// Основна функція друку етикетки
export function printLabelWithWeight(recipe, weightKg) {
    const lang = i18n.getLanguage();
    const date = new Date().toLocaleDateString(lang);
    
    const isSmall = weightKg <= 2;
    const labelWidth = isSmall ? '104mm' : '147mm';
    const labelHeight = isSmall ? '100mm' : '105mm';
    
    const seriesId = recipe.series;
    const allSeries = window.SICOMIX?.data?.series || [];
    const series = allSeries.find(s => s.id === seriesId);
    const style = seriesStyles[seriesId] || seriesStyles.default;
    
    let useText = '', aspectText = '', dryingText = '';
    if (series && series.properties) {
        const props = series.properties;
        useText = props.type?.[lang] || props.type?.uk || '';
        aspectText = props.finish?.[lang] || props.finish?.uk || '';
        dryingText = props.drying?.[lang] || props.drying?.uk || '';
    }
    
    const safetyHtml = generateSafetyHtml(seriesId, lang);
    const hasSafety = safetyHtml !== '';
    
    const labelHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Etykieta - ${utils.escapeHtml(recipe.name)}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
                width: ${labelWidth};
                height: ${labelHeight};
                margin: 0;
                padding: 0;
                background: #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', sans-serif;
            }
            @page {
                size: ${labelWidth} ${labelHeight};
                margin: 0;
            }
            @media print {
                .label, .header, .distributor-info, .safety-info {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
            .label {
                width: ${labelWidth};
                height: ${labelHeight};
                background: white;
                border-radius: 3mm;
                overflow: hidden;
                box-shadow: 0 2mm 5mm rgba(0,0,0,0.1);
                border: 0.3mm solid #ccc;
                display: flex;
                flex-direction: column;
                font-size: ${isSmall ? '3mm' : '3.3mm'};
                padding: ${isSmall ? '1.5mm' : '2mm'} ${isSmall ? '2mm' : '3mm'};
            }
            .header {
                background: ${style.headerBg};
                color: white;
                padding: ${isSmall ? '2mm' : '2.5mm'};
                text-align: center;
                border-bottom: 0.5mm solid ${style.headerBorder};
                margin: -1.5mm -2mm 0 -2mm;
            }
            .header .top-logo {
                font-size: ${isSmall ? '2.8mm' : '3.2mm'};
                font-weight: 500;
                letter-spacing: 1px;
                margin-bottom: 1mm;
                color: rgba(255,255,255,0.9);
            }
            .header h1 {
                font-size: ${isSmall ? '4mm' : '5mm'};
                font-weight: 800;
                text-transform: uppercase;
                margin-bottom: 0.5mm;
                color: ${style.titleColor};
                line-height: 1.2;
            }
            .header .sub {
                font-size: ${isSmall ? '2.2mm' : '2.7mm'};
                font-weight: 500;
                color: ${style.subColor};
            }
            .product-info {
                margin-top: ${isSmall ? '2mm' : '2.5mm'};
                flex: 1;
                display: flex;
                gap: ${isSmall ? '2mm' : '3mm'};
                min-height: 0;
            }
            .product-details {
                flex: ${hasSafety ? '1.5' : '2'};
                display: flex;
                flex-direction: column;
            }
            .safety-aside {
                flex: 1;
                ${hasSafety ? '' : 'display: none;'}
                display: flex;
                flex-direction: column;
            }
            .product-name {
                font-size: ${isSmall ? '4.5mm' : '5.2mm'};
                font-weight: 700;
                color: ${style.productNameColor};
                margin-bottom: 1mm;
                line-height: 1.2;
            }
            .product-meta {
                font-size: ${isSmall ? '2.2mm' : '2.8mm'};
                color: #000000;
                margin-bottom: 2mm;
            }
            .weight-box {
                background: white;
                border: 0.5mm solid ${style.weightBorder};
                border-radius: 5mm;
                padding: ${isSmall ? '1.5mm' : '2mm'};
                text-align: center;
                margin: 2mm 0;
                font-size: ${isSmall ? '5.5mm' : '6mm'};
                font-weight: 800;
                color: ${style.weightColor};
                display: inline-block;
                min-width: ${isSmall ? '35mm' : '45mm'};
            }
            .weight-box span {
                font-size: ${isSmall ? '2.8mm' : '3.5mm'};
                font-weight: 500;
                color: ${style.weightColor};
            }
            .tech-data {
                margin-top: 2mm;
                font-size: ${isSmall ? '2.5mm' : '2.6mm'};
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 1.5mm;
                color: #e63946;
            }
            .tech-item {
                margin-bottom: 0.8mm;
                line-height: 1.3;
            }
            .tech-item strong {
                color: black;
                font-weight: 600;
                display: inline-block;
                min-width: ${isSmall ? '14mm' : '18mm'};
            }
            .safety-info {
                background: #f8f8f8;
                border: 0.3mm solid #ccc;
                border-radius: 2mm;
                padding: ${isSmall ? '1mm' : '1.5mm'};
                font-size: ${isSmall ? '1.8mm' : '1.7mm'};
                line-height: 1.25;
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
            }
            .safety-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 1mm;
                font-weight: bold;
                flex-wrap: wrap;
            }
            .pictograms {
                white-space: nowrap;
            }
            .pictograms svg {
                margin-left: 2mm;
                width: 8mm;
                height: 8mm;
            }
            .safety-info p {
                margin: 0.5mm 0;
            }
            .safety-info strong {
                font-weight: 600;
            }
            .hazards, .precautions {
                margin-top: 1mm;
            }
            .distributor-info {
                background: ${style.headerBg}20;
                padding: ${isSmall ? '1mm' : '1.5mm'};
                font-size: ${isSmall ? '1.8mm' : '1.6mm'};
                color: black;
                text-align: center;
                border-top: 0.3mm solid #ccc;
                margin-top: 1mm;
                line-height: 1.3;
            }
            .distributor-info p {
                margin: 0.2mm 0;
            }
            .note-section {
                margin-top: ${isSmall ? '1.5mm' : '2mm'};
                font-size: ${isSmall ? '1.8mm' : '2.2mm'};
                color: #000000;
                text-align: center;
                font-weight: 500;
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 1mm;
            }
            @media (max-width: 110mm) {
                .product-name { font-size: 4mm; }
                .weight-box { font-size: 5mm; min-width: 30mm; }
                .tech-data { font-size: 2.2mm; }
                .safety-info { font-size: 1.8mm; }
                .distributor-info { font-size: 1.7mm; }
                .pictograms svg { width: 7mm; height: 7mm; }
            }
        </style>
    </head>
    <body>
        <div class="label">
            <div class="header">
                <div class="top-logo">SICO Screen Inks</div>
                <h1>${style.seriesDisplay}</h1>
                <div class="sub">${utils.escapeHtml(recipe.series)} / ${i18n.translateCategoryName(recipe.category)}</div>
            </div>

            <div class="product-info">
                <div class="product-details">
                    <div class="product-name">${utils.escapeHtml(recipe.name)} - ${weightKg}kg</div>
                    <div class="product-meta">${i18n.t('label_date')}: ${date}</div>
                    <div style="text-align: center;">
                        <div class="weight-box">
                            ${weightKg.toFixed(2).replace('.', ',')} <span>kg</span>
                        </div>
                    </div>
                    <div class="tech-data">
                        ${useText ? `<div class="tech-item"><strong>${i18n.t('use')}:</strong> ${utils.escapeHtml(useText)}</div>` : ''}
                        ${aspectText ? `<div class="tech-item"><strong>${i18n.t('aspect')}:</strong> ${utils.escapeHtml(aspectText)}</div>` : ''}
                        ${dryingText ? `<div class="tech-item"><strong>${i18n.t('drying')}:</strong> ${utils.escapeHtml(dryingText)}</div>` : ''}
                    </div>
                </div>
                <div class="safety-aside">
                    ${safetyHtml}
                </div>
            </div>

            <div class="distributor-info">
                <p><strong>${i18n.t('distributor_title')}</strong> ${i18n.t('distributor_info')}</p>
                <p>${i18n.t('producer_info')}</p>
            </div>

            <div class="note-section">
                ${i18n.t('label_note')}
            </div>
        </div>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(labelHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
