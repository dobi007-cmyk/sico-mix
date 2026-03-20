// ========== МОДУЛЬ ДРУКУ ЕТИКЕТКИ ==========
import * as utils from './utils.js';
import * as i18n from './i18n.js';

// Налаштування дизайну для різних серій (кольори, логотипи)
const seriesStyles = {
    EC: {
        headerBg: '#10b981', // зелений
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
        headerBg: '#dc2626', // червоний
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
        headerBg: '#2563eb', // синій
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
        headerBg: '#2563eb', // синій
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
        headerBg: '#fbbf24', // жовтий
        headerBorder: '#000000',
        titleColor: '#1e1e1e', // темний текст
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
        headerBg: '#7e22ce', // фіолетовий
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
        headerBg: '#a78bfa', // світло-фіолетовий
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
        headerBg: '#0e7a7a', // бірюзовий
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
        headerBg: '#2563eb', // синій
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
        headerBg: '#1e293b', // темно-синій
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
        headerBg: '#f97316', // оранжевий
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
        headerBg: '#6b7280', // сірий
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

// Функція для визначення піктограм небезпеки на основі H-фраз (повертає HTML з картинками)
function getHazardPictograms(seriesId) {
    const pictograms = {
        EC: ['🔥', '⚠️'],      // GHS02 + GHS07
        CF: ['⚠️'],             // GHS07
        PLUV: ['🔥', '☠️', '⚠️', '🌊'],  // GHS02, GHS08?, GHS07, GHS09
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
    // Тут можна замінити текстові символи на реальні зображення (base64 або SVG), якщо потрібно
    return pics.map(p => `<span class="pictogram">${p}</span>`).join('');
}

// Інформація про безпеку для кожної серії (скорочена версія для правої колонки)
const safetyInfo = {
    EC: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> EURECO EC
                <div class="pictograms">${getHazardPictograms('EC')}</div>
            </div>
            <p><strong>H226</strong> Łatwopalna ciecz i pary</p>
            <p><strong>H336</strong> Może wywoływać senność</p>
            <p><strong>P271</strong> Stosować na zewnątrz</p>
            <p><strong>P303+P361+P353</strong> Zanieczyszczoną odzież natychmiast zdjąć. Spłukać skórę wodą</p>
            <p><strong>P304+P340</strong> W przypadku dostania się do dróg oddechowych: wyprowadzić na świeże powietrze</p>
            <p><strong>P312</strong> W przypadku złego samopoczucia skontaktować się z lekarzem</p>
            <p><strong>P405</strong> Przechowywać pod zamknięciem</p>
            <p><strong>P501</strong> Usuwać do upoważnionego zakładu utylizacji</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    CF: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> CARTOFLEX CF
                <div class="pictograms">${getHazardPictograms('CF')}</div>
            </div>
            <p><strong>H336</strong> Może wywoływać senność</p>
            <p><strong>P261</strong> Unikać wdychania pyłu/dymu/mgły</p>
            <p><strong>P271</strong> Stosować na zewnątrz</p>
            <p><strong>P312</strong> W przypadku złego samopoczucia skontaktować się z lekarzem</p>
            <p><strong>P304+P340</strong> Wyprowadzić na świeże powietrze</p>
            <p><strong>P405</strong> Przechowywać pod zamknięciem</p>
            <p><strong>P501</strong> Usuwać zgodnie z przepisami</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    PLUV: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> UVIPLAST PLUV
                <div class="pictograms">${getHazardPictograms('PLUV')}</div>
            </div>
            <p><strong>H226</strong> Łatwopalna ciecz i pary</p>
            <p><strong>H304</strong> Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią</p>
            <p><strong>H336</strong> Może wywoływać senność</p>
            <p><strong>H412</strong> Działa szkodliwie na organizmy wodne</p>
            <p><strong>P210</strong> Przechowywać z dala od źródeł ciepła</p>
            <p><strong>P280</strong> Stosować rękawice ochronne</p>
            <p><strong>P301+P310</strong> W przypadku połknięcia: natychmiast skontaktować się z lekarzem</p>
            <p><strong>P303+P361+P353</strong> Zanieczyszczoną odzież zdjąć, spłukać skórę wodą</p>
            <p><strong>P304+P340</strong> Wyprowadzić na świeże powietrze</p>
            <p><strong>P403+P233</strong> Przechowywać w dobrze wentylowanym miejscu, pojemnik szczelnie zamknięty</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    PLUV_LED: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> UVIPLAST PLUV LED
                <div class="pictograms">${getHazardPictograms('PLUV_LED')}</div>
            </div>
            <p><strong>H226</strong> Łatwopalna ciecz i pary</p>
            <p><strong>H304</strong> Połknięcie grozi śmiercią</p>
            <p><strong>H336</strong> Może wywoływać senność</p>
            <p><strong>H412</strong> Działa szkodliwie na organizmy wodne</p>
            <p><strong>P210</strong> Przechowywać z dala od źródeł ciepła</p>
            <p><strong>P280</strong> Stosować rękawice ochronne</p>
            <p><strong>P301+P310</strong> W przypadku połknięcia: natychmiast skontaktować się z lekarzem</p>
            <p><strong>P303+P361+P353</strong> Zanieczyszczoną odzież zdjąć, spłukać skórę</p>
            <p><strong>P304+P340</strong> Wyprowadzić na świeże powietrze</p>
            <p><strong>P403+P233</strong> Przechowywać w wentylowanym miejscu, szczelnie zamknięte</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    TPP: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> POLYPRO TPP
                <div class="pictograms">${getHazardPictograms('TPP')}</div>
            </div>
            <p><strong>H226</strong> Łatwopalna ciecz i pary</p>
            <p><strong>H304</strong> Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią</p>
            <p><strong>H336</strong> Może wywoływać senność</p>
            <p><strong>H412</strong> Działa szkodliwie na organizmy wodne</p>
            <p><strong>P210</strong> Przechowywać z dala od źródeł ciepła</p>
            <p><strong>P280</strong> Stosować rękawice ochronne</p>
            <p><strong>P301+P310</strong> W przypadku połknięcia: natychmiast skontaktować się z lekarzem</p>
            <p><strong>P303+P361+P353</strong> Zanieczyszczoną odzież zdjąć, spłukać skórę</p>
            <p><strong>P304+P340</strong> Wyprowadzić na świeże powietrze</p>
            <p><strong>P403+P233</strong> Przechowywać w wentylowanym miejscu, szczelnie zamknięte</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    AS: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> AQUASET AS
                <div class="pictograms">${getHazardPictograms('AS')}</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    SX: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> SICOTEX SX
                <div class="pictograms">${getHazardPictograms('SX')}</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    OTF: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> OPATEX OTF
                <div class="pictograms">${getHazardPictograms('OTF')}</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    SPTN: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> SICOPLAST SPTN
                <div class="pictograms">${getHazardPictograms('SPTN')}</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    NST: '',
    QS: '',
    SN: ''
};

// Основна функція друку етикетки
export function printLabelWithWeight(recipe, weightKg) {
    const lang = i18n.getLanguage();
    const date = new Date().toLocaleDateString(lang);
    
    // Визначаємо розмір етикетки залежно від ваги
    const isSmall = weightKg <= 2;
    const labelWidth = isSmall ? '104mm' : '147mm';
    const labelHeight = isSmall ? '100mm' : '105mm';
    
    // Отримуємо дані серії
    const seriesId = recipe.series;
    const allSeries = window.SICOMIX?.data?.series || [];
    const series = allSeries.find(s => s.id === seriesId);
    
    // Вибираємо стиль для серії, якщо немає – використовуємо EC
    const style = seriesStyles[seriesId] || seriesStyles.EC;
    
    // Базові технічні дані – тільки основні
    let useText = '', aspectText = '', dryingText = '';
    
    if (series && series.properties) {
        const props = series.properties;
        useText = props.type?.[lang] || props.type?.uk || '';
        aspectText = props.finish?.[lang] || props.finish?.uk || '';
        dryingText = props.drying?.[lang] || props.drying?.uk || '';
    }
    
    // Отримуємо HTML безпеки (або пустий рядок)
    const safetyHtml = safetyInfo[seriesId] || '';
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
            /* Примусовий друк фонових кольорів */
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
                margin: -1.5mm -2mm 0 -2mm; /* розтягуємо на всю ширину */
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
            }
            .product-details {
                flex: ${hasSafety ? '1.5' : '2'};
            }
            .safety-aside {
                flex: 1;
                ${hasSafety ? '' : 'display: none;'}
            }
            .product-name {
                font-size: ${isSmall ? '4.5mm' : '5.5mm'};
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
                font-size: ${isSmall ? '5.5mm' : '6.5mm'};
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
                font-size: ${isSmall ? '2.5mm' : '3mm'};
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 1.5mm;
                color: #e63946; /* червоний колір для значень */
            }
            .tech-item {
                margin-bottom: 0.8mm;
                line-height: 1.3;
            }
            .tech-item strong {
                color: black; /* мітки чорні */
                font-weight: 600;
                display: inline-block;
                min-width: ${isSmall ? '14mm' : '18mm'};
            }
            .safety-info {
                background: #f8f8f8;
                border: 0.3mm solid #ccc;
                border-radius: 2mm;
                padding: ${isSmall ? '1mm' : '1.5mm'};
                font-size: ${isSmall ? '2mm' : '2.3mm'};
                line-height: 1.25;
                height: 100%;
                display: flex;
                flex-direction: column;
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
                font-size: ${isSmall ? '2.2mm' : '2.8mm'};
                white-space: nowrap;
            }
            .pictogram {
                margin-left: 1mm;
                display: inline-block;
            }
            .safety-info p {
                margin: 0.5mm 0;
            }
            .safety-info strong {
                font-weight: 600;
            }
            .safety-info em {
                font-style: italic;
            }
            .distributor-info {
                background: ${style.headerBg}20;
                padding: ${isSmall ? '1mm' : '1.5mm'};
                font-size: ${isSmall ? '1.8mm' : '2.2mm'};
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
                /* Для маленьких етикеток трохи зменшуємо шрифти */
                .product-name { font-size: 4mm; }
                .weight-box { font-size: 5mm; min-width: 30mm; }
                .tech-data { font-size: 2.2mm; }
                .safety-info { font-size: 1.9mm; }
                .distributor-info { font-size: 1.7mm; }
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
                    <div class="product-meta">Data: ${date}</div>
                    <div style="text-align: center;">
                        <div class="weight-box">
                            ${weightKg.toFixed(2).replace('.', ',')} <span>kg</span>
                        </div>
                    </div>
                    <div class="tech-data">
                        ${useText ? `<div class="tech-item"><strong>Use:</strong> ${utils.escapeHtml(useText)}</div>` : ''}
                        ${aspectText ? `<div class="tech-item"><strong>Aspect:</strong> ${utils.escapeHtml(aspectText)}</div>` : ''}
                        ${dryingText ? `<div class="tech-item"><strong>Drying:</strong> ${utils.escapeHtml(dryingText)}</div>` : ''}
                    </div>
                </div>
                <div class="safety-aside">
                    ${safetyHtml}
                </div>
            </div>

            <div class="distributor-info">
                <p><strong>Wyłączny dystrybutor w Polsce</strong> SICO Polska Sp. z o.o., ul. Annopol 3, 03-236 Warszawa, tel. 22 660 48 50, e-mail: sico@sico.pl</p>
                <p>Producent: n.v. Sico s.a. - Belgia / n.v. SICO Screen Inks s.a. | www.sico-sko.com</p>
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