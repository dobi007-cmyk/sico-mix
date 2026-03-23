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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
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
        productNameColor: '#000000',
        weightBorder: '#000000',
        weightColor: '#000000',
        noteColor: '#fbbf24',
        logoBg: '#fbbf24',
        logoText: '#6b7280',
        seriesDisplay: 'SICO'
    }
};

// Функція для отримання SVG-піктограм GHS (вбудовані)
function getHazardPictogramsSvg(seriesId) {
    const pictogramsMap = {
        EC: ['ghs02'],
        CF: ['ghs02'],
        PLUV: ['ghs02', 'ghs08', 'ghs09'],
        PLUV_LED: ['ghs02', 'ghs08', 'ghs09'],
        TPP: ['ghs02', 'ghs08', 'ghs09'],
        AS: [],
        SX: [],
        OTF: [],
        SPTN: [],
        NST: ['ghs02'],
        QS: ['ghs02'],
        SN: ['ghs02']
    };

    const symbols = pictogramsMap[seriesId] || [];
    if (symbols.length === 0) return '';

    const svgIcons = symbols.map(symbol => {
        if (symbol === 'ghs02') {
            // GHS02 – Flammable (red square with black flame)
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" class="pictogram-svg">
                <rect width="100" height="100" fill="#FF4D00" stroke="black" stroke-width="2" />
                <polygon points="50,20 70,40 70,60 50,80 30,60 30,40" fill="white" stroke="black" stroke-width="1.5" />
                <path d="M50,25 L60,40 L55,40 L65,55 L55,55 L50,70 L45,55 L35,55 L45,40 L40,40 Z" fill="black" />
            </svg>`;
        }
        if (symbol === 'ghs07') {
            // GHS07 – Exclamation mark (orange-red square with exclamation)
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" class="pictogram-svg">
                <rect width="100" height="100" fill="#FF7F2A" stroke="black" stroke-width="2" />
                <rect x="47" y="20" width="6" height="40" fill="black" />
                <circle cx="50" cy="75" r="6" fill="black" />
            </svg>`;
        }
        if (symbol === 'ghs08') {
            // GHS08 – Health hazard (red square with silhouette)
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" class="pictogram-svg">
                <rect width="100" height="100" fill="#FF4D00" stroke="black" stroke-width="2" />
                <path d="M50,25 L70,40 L70,60 L50,75 L30,60 L30,40 Z" fill="white" stroke="black" stroke-width="1.5" />
                <circle cx="50" cy="45" r="8" fill="black" />
                <path d="M35,65 L65,65 L60,55 L40,55 Z" fill="black" />
            </svg>`;
        }
        if (symbol === 'ghs09') {
            // GHS09 – Environment (green diamond with dead fish and tree)
            return `<svg viewBox="0 0 100 100" width="12mm" height="12mm" class="pictogram-svg">
                <rect width="100" height="100" fill="#00A651" stroke="black" stroke-width="2" />
                <path d="M30,70 L50,30 L70,70 Z" fill="white" stroke="black" stroke-width="1.5" />
                <circle cx="50" cy="55" r="4" fill="black" />
                <path d="M40,75 L60,75" stroke="black" stroke-width="2" />
                <text x="50" y="92" text-anchor="middle" font-size="14" fill="black">🐟</text>
            </svg>`;
        }
        return '';
    }).join('');

    return `<div class="pictograms">${svgIcons}</div>`;
}

// Повні тексти безпеки для кожної серії (залишаються без змін)
const safetyTexts = {
    EC: { /* ... ваші дані ... */ },
    CF: { /* ... */ },
    PLUV: { /* ... */ },
    TPP: { /* ... */ },
    AS: { /* ... */ },
    SX: { /* ... */ },
    OTF: { /* ... */ },
    SPTN: { /* ... */ }
    // інші за необхідності
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
                color: #000000;
            }
            .tech-item {
                margin-bottom: 0.8mm;
                line-height: 1.3;
            }
            .tech-item strong {
                color: #000000;
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
            .pictogram-svg {
                width: 8mm;
                height: 8mm;
                margin-left: 2mm;
                display: inline-block;
                vertical-align: middle;
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
                color: #e63946;
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
                .pictogram-svg { width: 7mm; height: 7mm; }
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
