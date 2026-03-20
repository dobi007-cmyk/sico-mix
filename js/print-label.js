// ========== МОДУЛЬ ДРУКУ ЕТИКЕТКИ (фінальна версія) ==========
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
    }
};

// Функція для визначення піктограм небезпеки (стилізовані)
function getHazardPictograms(seriesId) {
    const pictograms = {
        EC: ['🔥', '⚠️'],
        CF: ['⚠️'],
        PLUV: ['🔥', '☠️', '⚠️', '🌊'],
        PLUV_LED: ['🔥', '☠️', '⚠️', '🌊'],
        TPP: ['🔥', '☠️', '⚠️', '🌊'],
        AS: ['✔️'],
        SX: ['✔️'],
        OTF: ['✔️'],
        SPTN: ['✔️'],
        NST: [],
        QS: [],
        SN: []
    };
    const pics = pictograms[seriesId] || [];
    return pics.map(p => `<span class="pictogram">${p}</span>`).join('');
}

// Повні тексти безпеки (скорочено для зменшення висоти)
const safetyTexts = {
    EC: {
        pl: {
            name: "EURECO EC",
            contains: "1-etoksypropan-2-ol",
            hazards: [
                "H226 - Łatwopalna ciecz i pary",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy"
            ],
            precautions: [
                "P271 - Stosować na zewnątrz lub w dobrze wentylowanym pomieszczeniu",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ: natychmiast zdjąć odzież, spłukać wodą",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić na świeże powietrze",
                "P312 - W przypadku złego samopoczucia skontaktować się z lekarzem",
                "P370+P378 - W przypadku pożaru: używać odpowiednich środków gaśniczych",
                "P405 - Przechowywać pod zamknięciem",
                "P501 - Zawartość/pojemnik usuwać do upoważnionego zakładu utylizacji"
            ]
        }
    },
    CF: {
        pl: {
            name: "CARTOFLEX CF",
            contains: "1-etoksypropan-2-ol",
            hazards: ["H336 - Może wywoływać uczucie senności lub zawroty głowy"],
            precautions: [
                "P261 - Unikać wdychania pyłu/dymu/gazu/mgły/par",
                "P271 - Stosować na zewnątrz lub w dobrze wentylowanym pomieszczeniu",
                "P312 - W przypadku złego samopoczucia skontaktować się z lekarzem",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić na świeże powietrze",
                "P405 - Przechowywać pod zamknięciem",
                "P501 - Zawartość/pojemnik usuwać zgodnie z przepisami"
            ]
        }
    },
    PLUV: {
        pl: {
            name: "UVIPLAST PLUV",
            contains: "Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)",
            hazards: [
                "H226 - Łatwopalna ciecz i pary",
                "H304 - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy",
                "H412 - Działa szkodliwie na organizmy wodne"
            ],
            precautions: [
                "P210 - Przechowywać z dala od źródeł ciepła, iskier, ognia. Nie palić",
                "P280 - Stosować rękawice ochronne/odzież ochronną/ochronę oczu",
                "P301+P310 - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z lekarzem",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ: natychmiast zdjąć odzież, spłukać wodą",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić na świeże powietrze",
                "P403+P233 - Przechowywać w dobrze wentylowanym miejscu. Pojemnik szczelnie zamknięty",
                "EUH066 - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry"
            ]
        }
    },
    TPP: {
        pl: {
            name: "POLYPRO TPP",
            contains: "Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)",
            hazards: [
                "H226 - Łatwopalna ciecz i pary",
                "H304 - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią",
                "H336 - Może wywoływać uczucie senności lub zawroty głowy",
                "H412 - Działa szkodliwie na organizmy wodne"
            ],
            precautions: [
                "P210 - Przechowywać z dala od źródeł ciepła, iskier, ognia. Nie palić",
                "P280 - Stosować rękawice ochronne/odzież ochronną/ochronę oczu",
                "P301+P310 - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z lekarzem",
                "P303+P361+P353 - W PRZYPADKU KONTAKTU ZE SKÓRĄ: natychmiast zdjąć odzież, spłukać wodą",
                "P304+P340 - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić na świeże powietrze",
                "P403+P233 - Przechowywać w dobrze wentylowanym miejscu. Pojemnik szczelnie zamknięty",
                "EUH066 - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry"
            ]
        }
    },
    AS: {
        pl: { name: "AQUASET AS", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    SX: {
        pl: { name: "SICOTEX SX", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    OTF: {
        pl: { name: "OPATEX OTF", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    },
    SPTN: {
        pl: { name: "SICOPLAST SPTN", nonHazardous: true, text: "Mieszanina nie jest klasyfikowana jako niebezpieczna." }
    }
};

// Допоміжна функція для генерації HTML безпеки
function generateSafetyHtml(seriesId) {
    const data = safetyTexts[seriesId];
    if (!data) return '';
    const langData = data.pl; // використовуємо польську, оскільки етикетка фіксована
    if (langData.nonHazardous) {
        return `
            <div class="safety-info">
                <div class="safety-header">
                    <strong>Nazwa handlowa:</strong> ${langData.name}
                    <div class="pictograms">${getHazardPictograms(seriesId)}</div>
                </div>
                <p>${langData.text}</p>
                <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
            </div>
        `;
    }
    let hazardsHtml = langData.hazards.map(h => `<p>${h}</p>`).join('');
    let precautionsHtml = langData.precautions.map(p => `<p>${p}</p>`).join('');
    return `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> ${langData.name}
                <div class="pictograms">${getHazardPictograms(seriesId)}</div>
            </div>
            <p><strong>Zawiera:</strong> ${langData.contains}</p>
            <div class="hazards">${hazardsHtml}</div>
            <div class="precautions">${precautionsHtml}</div>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
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
    
    const style = seriesStyles[seriesId] || seriesStyles.EC;
    
    let useText = '', aspectText = '', dryingText = '';
    if (series && series.properties) {
        const props = series.properties;
        useText = props.type?.[lang] || props.type?.uk || '';
        aspectText = props.finish?.[lang] || props.finish?.uk || '';
        dryingText = props.drying?.[lang] || props.drying?.uk || '';
    }
    
    const safetyHtml = generateSafetyHtml(seriesId);
    const hasSafety = safetyHtml !== '';
    
    // Компактний рядок дистриб'ютора
    const distributorText = `SICO Polska Sp. z o.o., ul. Annopol 3, 03-236 Warszawa | tel.: 00 48 22 660 48 50 (-9) | e-mail: sico@sico.pl | Producent: n.v. Sico s.a. - Belgia, n.v. SICO Screen Inks s.a. | www.sico-sko.com`;
    
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
                text-align: center;
            }
            .safety-aside {
                flex: 1;
                ${hasSafety ? '' : 'display: none;'}
                display: flex;
                flex-direction: column;
                min-height: 0;
            }
            .product-name {
                font-size: ${isSmall ? '4.5mm' : '5.2mm'};
                font-weight: 700;
                color: ${style.productNameColor};
                margin-bottom: 1mm;
                line-height: 1.2;
                text-align: center;
            }
            .product-meta {
                font-size: ${isSmall ? '2.2mm' : '2.8mm'};
                color: #000000;
                margin-bottom: 2mm;
                text-align: center;
            }
            .weight-box {
                background: white;
                border: 0.5mm solid ${style.weightBorder};
                border-radius: 5mm;
                padding: ${isSmall ? '1.5mm' : '2mm'};
                text-align: center;
                margin: 2mm auto;
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
                color: black;
                text-align: left;
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
                line-height: 1.2;
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
                font-size: ${isSmall ? '3.5mm' : '3mm'};
                white-space: nowrap;
                display: flex;
                gap: 1mm;
            }
            .pictogram {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: ${isSmall ? '4mm' : '3.8mm'};
                height: ${isSmall ? '4mm' : '3.8mm'};
                background: #e0e0e0;
                border-radius: 50%;
                font-size: ${isSmall ? '3.2mm' : '3mm'};
                text-align: center;
                line-height: 1;
                color: #333;
                font-weight: normal;
            }
            .safety-info p {
                margin: 0.3mm 0;
            }
            .safety-info strong {
                font-weight: 600;
            }
            .hazards, .precautions {
                margin-top: 0.8mm;
            }
            .distributor-info {
                background: ${style.headerBg}20;
                padding: ${isSmall ? '0.5mm' : '0.8mm'};
                font-size: ${isSmall ? '1.6mm' : '1.5mm'};
                color: black;
                text-align: center;
                border-top: 0.3mm solid #ccc;
                margin-top: 1mm;
                line-height: 1.2;
                white-space: normal;
                word-break: keep-all;
            }
            .distributor-info p {
                margin: 0;
                line-height: 1.2;
            }
            .note-section {
                margin-top: ${isSmall ? '1mm' : '1.2mm'};
                font-size: ${isSmall ? '1.8mm' : '2mm'};
                color: #e63946;
                text-align: center;
                font-weight: 500;
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 0.8mm;
            }
            @media (max-width: 110mm) {
                .product-name { font-size: 4mm; }
                .weight-box { font-size: 5mm; min-width: 30mm; }
                .tech-data { font-size: 2.2mm; }
                .safety-info { font-size: 1.7mm; }
                .distributor-info { font-size: 1.5mm; }
                .pictogram { width: 3.5mm; height: 3.5mm; font-size: 2.8mm; }
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
                    <div class="product-name">${utils.escapeHtml(recipe.name)}</div>
                    <div class="product-meta">Data: ${date}</div>
                    <div style="text-align: center;">
                        <div class="weight-box">
                            ${weightKg.toFixed(2).replace('.', ',')} <span>kg</span>
                        </div>
                    </div>
                    <div class="tech-data">
                        ${useText ? `<div class="tech-item"><strong>Zastosowanie:</strong> ${utils.escapeHtml(useText)}</div>` : ''}
                        ${aspectText ? `<div class="tech-item"><strong>Wygląd:</strong> ${utils.escapeHtml(aspectText)}</div>` : ''}
                        ${dryingText ? `<div class="tech-item"><strong>Suszenie:</strong> ${utils.escapeHtml(dryingText)}</div>` : ''}
                    </div>
                </div>
                ${hasSafety ? `<div class="safety-aside">${safetyHtml}</div>` : ''}
            </div>

            <div class="distributor-info">
                <p>${distributorText}</p>
            </div>

            <div class="note-section">
                PRZED DRUKIEM NAKŁADU ZALECAMY SPRAWDZENIE ZGODNOŚCI KOLORYSTYCZNEJ.
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
