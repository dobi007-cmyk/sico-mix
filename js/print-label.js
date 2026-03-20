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

// Функція для визначення піктограм небезпеки на основі H-фраз
function getHazardPictograms(hazardText) {
    const pictograms = [];
    if (hazardText.includes('H226')) pictograms.push('🔥');  // Flamme (GHS02)
    if (hazardText.includes('H304')) pictograms.push('☠️'); // Aspiration hazard
    if (hazardText.includes('H336')) pictograms.push('⚠️'); // Exclamation mark
    if (hazardText.includes('H410') || hazardText.includes('H412')) pictograms.push('🌊'); // Environment
    // Якщо є інші небезпеки – можна додати
    return pictograms;
}

// Інформація про безпеку для кожної серії
const safetyInfo = {
    EC: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> EURECO EC
                <div class="pictograms">${getHazardPictograms('H226 H336').join(' ')}</div>
            </div>
            <p><strong>Zawiera:</strong> 1-etoksypropan-2-ol</p>
            <p><strong>H226</strong> - Łatwopalna ciecz i pary</p>
            <p><strong>H336</strong> - Może wywoływać uczucie senności lub zawroty głowy</p>
            <p><strong>P271</strong> - Stosować wyłącznie na zewnątrz lub w dobrze wentylowanym pomieszczeniu</p>
            <p><strong>P303+P361+P353</strong> - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem</p>
            <p><strong>P304+P340</strong> - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić warunki do odpoczynku w pozycji umożliwiającej swobodne oddychanie</p>
            <p><strong>P312</strong> - W przypadku złego samopoczucia skontaktować się z OŚRODKIEM ZATRUĆ lub lekarzem</p>
            <p><strong>P370+P378</strong> - W przypadku pożaru: używać odpowiednich środków gaśniczych</p>
            <p><strong>P405</strong> - Przechowywać pod zamknięciem</p>
            <p><strong>P501</strong> - Zawartość/pojemnik usuwać do upoważnionego zakładu utylizacji odpadów</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    CF: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> CARTOFLEX CF
                <div class="pictograms">${getHazardPictograms('H336').join(' ')}</div>
            </div>
            <p><strong>Zawiera:</strong> 1-etoksypropan-2-ol</p>
            <p><strong>H336</strong> - Może wywoływać uczucie senności lub zawroty głowy.</p>
            <p><strong>P261</strong> - Unikać wdychania pyłu/dymu/gazu/mgły/par/rozpylonej cieczy.</p>
            <p><strong>P271</strong> - Stosować wyłącznie na zewnątrz lub w dobrze wentylowanym pomieszczeniu.</p>
            <p><strong>P312</strong> - W przypadku złego samopoczucia skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem.</p>
            <p><strong>P304+P340</strong> - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.</p>
            <p><strong>P405</strong> - Przechowywać pod zamknięciem.</p>
            <p><strong>P501</strong> - Zawartość/pojemnik usuwać zgodnie z obowiązującymi przepisami.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    PLUV: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> UVIPLAST PLUV
                <div class="pictograms">${getHazardPictograms('H226 H304 H336 H412').join(' ')}</div>
            </div>
            <p><strong>Zawiera:</strong> Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)</p>
            <p><strong>H226</strong> - Łatwopalna ciecz i pary.</p>
            <p><strong>H304</strong> - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią.</p>
            <p><strong>H336</strong> - Może wywoływać uczucie senności lub zawroty głowy.</p>
            <p><strong>H412</strong> - Działa szkodliwie na organizmy wodne, powodując długotrwałe skutki.</p>
            <p><strong>P210</strong> - Przechowywać z dala od źródeł ciepła, gorących powierzchni, źródeł skażenia, otwartego ognia i innych źródeł zapłonu. Nie palić.</p>
            <p><strong>P280</strong> - Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy.</p>
            <p><strong>P301+P310</strong> - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem/...</p>
            <p><strong>P303+P361+P353</strong> - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem.</p>
            <p><strong>P304+P340</strong> - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.</p>
            <p><strong>P403+P233</strong> - Przechowywać w dobrze wentylowanym miejscu. Przechowywać pojemnik szczelnie zamknięty.</p>
            <p><strong>EUH066</strong> - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    PLUV_LED: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> UVIPLAST PLUV LED
                <div class="pictograms">${getHazardPictograms('H226 H304 H336 H412').join(' ')}</div>
            </div>
            <p><strong>Zawiera:</strong> Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)</p>
            <p><strong>H226</strong> - Łatwopalna ciecz i pary.</p>
            <p><strong>H304</strong> - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią.</p>
            <p><strong>H336</strong> - Może wywoływać uczucie senności lub zawroty głowy.</p>
            <p><strong>H412</strong> - Działa szkodliwie na organizmy wodne, powodując długotrwałe skutki.</p>
            <p><strong>P210</strong> - Przechowywać z dala od źródeł ciepła, gorących powierzchni, źródeł skażenia, otwartego ognia i innych źródeł zapłonu. Nie palić.</p>
            <p><strong>P280</strong> - Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy.</p>
            <p><strong>P301+P310</strong> - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem/...</p>
            <p><strong>P303+P361+P353</strong> - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem.</p>
            <p><strong>P304+P340</strong> - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.</p>
            <p><strong>P403+P233</strong> - Przechowywać w dobrze wentylowanym miejscu. Przechowywać pojemnik szczelnie zamknięty.</p>
            <p><strong>EUH066</strong> - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    TPP: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> POLYPRO TPP
                <div class="pictograms">${getHazardPictograms('H226 H304 H336 H412').join(' ')}</div>
            </div>
            <p><strong>Zawiera:</strong> Octan 2-etoksy-1-metyleotytu oraz węglowodory, C9, aromaty (benzen < 0,1% w/w)</p>
            <p><strong>H226</strong> - Łatwopalna ciecz i pary.</p>
            <p><strong>H304</strong> - Połknięcie i dostanie się przez drogi oddechowe może grozić śmiercią.</p>
            <p><strong>H336</strong> - Może wywoływać uczucie senności lub zawroty głowy.</p>
            <p><strong>H412</strong> - Działa szkodliwie na organizmy wodne, powodując długotrwałe skutki.</p>
            <p><strong>P210</strong> - Przechowywać z dala od źródeł ciepła, gorących powierzchni, źródeł skażenia, otwartego ognia i innych źródeł zapłonu. Nie palić.</p>
            <p><strong>P280</strong> - Stosować rękawice ochronne/odzież ochronną/ochronę oczu/ochronę twarzy.</p>
            <p><strong>P301+P310</strong> - W PRZYPADKU POŁKNIĘCIA: natychmiast skontaktować się z OŚRODKIEM ZATRUĆ/lekarzem/...</p>
            <p><strong>P303+P361+P353</strong> - W PRZYPADKU KONTAKTU ZE SKÓRĄ (lub z włosami): Natychmiast zdjąć całą zanieczyszczoną odzież. Spłukać skórę pod strumieniem wody/prysznicem.</p>
            <p><strong>P304+P340</strong> - W PRZYPADKU DOSTANIA SIĘ DO DRÓG ODDECHOWYCH: wyprowadzić lub wynieść poszkodowanego na świeże powietrze i zapewnić mu warunki do swobodnego oddychania.</p>
            <p><strong>P403+P233</strong> - Przechowywać w dobrze wentylowanym miejscu. Przechowywać pojemnik szczelnie zamknięty.</p>
            <p><strong>EUH066</strong> - Powtarzające się narażenie może powodować wysuszanie lub pękanie skóry.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    AS: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> AQUASET AS
                <div class="pictograms">✔️</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    SX: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> SICOTEX SX
                <div class="pictograms">✔️</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    OTF: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> OPATEX OTF
                <div class="pictograms">✔️</div>
            </div>
            <p>Mieszanina nie jest klasyfikowana jako niebezpieczna.</p>
            <p><em>Produkt przeznaczony wyłącznie do użytku zawodowego.</em></p>
        </div>
    `,
    SPTN: `
        <div class="safety-info">
            <div class="safety-header">
                <strong>Nazwa handlowa:</strong> SICOPLAST SPTN
                <div class="pictograms">✔️</div>
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
    
    // Визначаємо, чи є інформація про безпеку
    const safetyHtml = safetyInfo[seriesId] || '';
    
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
                font-size: ${isSmall ? '3.2mm' : '3.5mm'};
                padding: ${isSmall ? '1.5mm' : '2mm'};
            }
            .header {
                background: ${style.headerBg};
                color: white;
                padding: ${isSmall ? '2mm' : '3mm'};
                text-align: center;
                border-bottom: 0.5mm solid ${style.headerBorder};
                margin: -1.5mm -2mm 0 -2mm; /* розтягуємо на всю ширину */
            }
            .header .top-logo {
                font-size: ${isSmall ? '3mm' : '3.5mm'};
                font-weight: 500;
                letter-spacing: 1px;
                margin-bottom: 1mm;
                color: rgba(255,255,255,0.9);
            }
            .header h1 {
                font-size: ${isSmall ? '4.5mm' : '5.5mm'};
                font-weight: 800;
                text-transform: uppercase;
                margin-bottom: 1mm;
                color: ${style.titleColor};
                line-height: 1.2;
            }
            .header .sub {
                font-size: ${isSmall ? '2.5mm' : '3mm'};
                font-weight: 500;
                color: ${style.subColor};
            }
            .product-info {
                margin-top: ${isSmall ? '2mm' : '3mm'};
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow-y: auto;
            }
            .product-name {
                font-size: ${isSmall ? '5mm' : '6mm'};
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
                padding: ${isSmall ? '2mm' : '3mm'};
                text-align: center;
                margin: 3mm 0;
                font-size: ${isSmall ? '6mm' : '7mm'};
                font-weight: 800;
                color: ${style.weightColor};
                display: inline-block;
                min-width: ${isSmall ? '40mm' : '50mm'};
                align-self: center;
            }
            .weight-box span {
                font-size: ${isSmall ? '3mm' : '4mm'};
                font-weight: 500;
                color: ${style.weightColor};
            }
            .tech-data {
                margin-top: 2mm;
                font-size: ${isSmall ? '2.5mm' : '3mm'};
                border-top: 0.3mm dashed #9ca3af;
                padding-top: 2mm;
                color: #e63946; /* червоний колір для значень */
            }
            .tech-item {
                margin-bottom: 1mm;
                line-height: 1.4;
            }
            .tech-item strong {
                color: black; /* мітки чорні */
                font-weight: 600;
                display: inline-block;
                min-width: ${isSmall ? '15mm' : '20mm'};
            }
            .safety-info {
                margin-top: 2mm;
                padding: ${isSmall ? '1mm' : '1.5mm'};
                background: #f8f8f8;
                border: 0.3mm solid #ccc;
                border-radius: 2mm;
                font-size: ${isSmall ? '2mm' : '2.3mm'};
                line-height: 1.3;
                max-height: ${isSmall ? '35mm' : '40mm'};
                overflow-y: auto;
            }
            .safety-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 1mm;
                font-weight: bold;
            }
            .pictograms {
                font-size: ${isSmall ? '2.5mm' : '3mm'};
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
                background: ${style.headerBg}20; /* 12% прозорості */
                padding: ${isSmall ? '1.5mm' : '2mm'};
                font-size: ${isSmall ? '2mm' : '2.3mm'};
                color: black;
                text-align: center;
                border-top: 0.3mm solid #ccc;
                margin-top: 1mm;
            }
            .distributor-info p {
                margin: 0.5mm 0;
            }
            .note-section {
                margin-top: ${isSmall ? '2mm' : '3mm'};
                font-size: ${isSmall ? '2mm' : '2.5mm'};
                color: #000000;
                text-align: center;
                font-weight: 500;
                border-top: 0.3mm dashed #9ca3af;
                padding-top: ${isSmall ? '1.5mm' : '2mm'};
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
                <div class="product-name">${utils.escapeHtml(recipe.name)} - ${weightKg}kg</div>
                <div class="product-meta">
                    Data: ${date}
                </div>

                <div style="text-align: center;">
                    <div class="weight-box">
                        ${weightKg.toFixed(2).replace('.', ',')} <span>kg</span>
                    </div>
                </div>
                
                <!-- Технічні дані серії: мітки чорні, значення червоні -->
                <div class="tech-data">
                    ${useText ? `<div class="tech-item"><strong>Use:</strong> ${utils.escapeHtml(useText)}</div>` : ''}
                    ${aspectText ? `<div class="tech-item"><strong>Aspect:</strong> ${utils.escapeHtml(aspectText)}</div>` : ''}
                    ${dryingText ? `<div class="tech-item"><strong>Drying:</strong> ${utils.escapeHtml(dryingText)}</div>` : ''}
                </div>

                <!-- Інформація про безпеку (залежить від серії) -->
                ${safetyHtml}
            </div>

            <!-- Інформація про дистриб'ютора (на кольоровому фоні серії) -->
            <div class="distributor-info">
                <p><strong>Wyłączny dystrybutor w Polsce</strong></p>
                <p>SICO Polska Sp. z o. o.</p>
                <p>ul. Annopol 3, 03-236 Warszawa</p>
                <p>tel.: 00 48 22 660 48 50 (-9)</p>
                <p>e-mail: sico@sico.pl</p>
                <p>Producent n.v. Sico s.a. - Belgia</p>
                <p>n.v. SICO Screen Inks s.a.</p>
                <p>www.sico-sko.com</p>
            </div>

            <!-- Примітка перед друком -->
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