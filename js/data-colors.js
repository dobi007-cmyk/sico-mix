console.log('[SICOMIX] Завантаження data-colors.js...');

window.SICOMIX = window.SICOMIX || {};
const SICOMIX = window.SICOMIX;

SICOMIX.data = (function() {
    try {
        // ---------- СЕРІЇ (на основі каталогу KATALOG.pdf) ----------
        const series = [
            // TWORZYWA SZTUCZNE
            {
                id: "EC",
                name: { pl: "EURECO EC", uk: "EURECO EC", en: "EURECO EC" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Uniwersalna farba rozpuszczalnikowa na materiały samoprzylepne, PCV miękkie i twarde, papier, karton, metale lakierowane. Po dodaniu 5% utwardzacza nadaje się również do polipropylenu, priplacku, ABS, forex, banerów.",
                    uk: "Універсальна розчинникова фарба для самоклейних матеріалів, м'якого та твердого ПВХ, паперу, картону, лакованих металів. З додаванням 5% затверджувача також підходить для поліпропілену, priplack, ABS, forex, банерів.",
                    en: "Universal solvent-based ink for self-adhesive materials, soft and rigid PVC, paper, cardboard, lacquered metals. With 5% hardener also suitable for polypropylene, priplack, ABS, forex, banners."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Wysoki połysk", uk: "Високий глянець", en: "High gloss" },
                    drying: { pl: "6 min na otwartym powietrzu, natychmiast w tunelu", uk: "6 хв на відкритому повітрі, миттєво в тунелі", en: "6 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-120 (fluoro: P90T)", uk: "P77-120 (флуо: P90T)", en: "P77-120 (fluo: P90T)" },
                    cleaning: { pl: "CT 1000 lub CT 1000/1", uk: "CT 1000 або CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", uk: "Дуже хороша стійкість до світла та атмосферних умов", en: "Very good light and weather resistance" },
                    thinning: { pl: "EC 1000 (szybki), EC 2000 (normalny), EC 3000/4000 (lekkie spowolnienie), EC 5000 (opóźniacz), EC 8000 (bardzo wolny). Dla fluo: EC 1300, EC 1301. +/-15%", uk: "EC 1000 (швидкий), EC 2000 (нормальний), EC 3000/4000 (легке сповільнення), EC 5000 (сповільнювач), EC 8000 (дуже повільний). Для флуо: EC 1300, EC 1301. +/-15%", en: "EC 1000 (fast), EC 2000 (normal), EC 3000/4000 (mild retarder), EC 5000 (retarder), EC 8000 (very slow). For fluo: EC 1300, EC 1301. +/-15%" },
                    additives: { pl: "EC 160 (pasta kryjąca), EC 150 (baza transparentna), EC 1501 HG (lakier), AS 1000 (antystatyk), EC 170/1702 (opóźniacz w żelu), MP 1000 (proszek matujący), EC 150/10 (pasta matująca), MP 3000 (zagęstnik), HEC (utwardzacz 3-5%)", uk: "EC 160 (криюча паста), EC 150 (прозора база), EC 1501 HG (лак), AS 1000 (антистатик), EC 170/1702 (сповільнювач у гелі), MP 1000 (матуючий порошок), EC 150/10 (матуюча паста), MP 3000 (загусник), HEC (затверджувач 3-5%)", en: "EC 160 (opaque paste), EC 150 (transparent base), EC 1501 HG (varnish), AS 1000 (antistatic), EC 170/1702 (gel retarder), MP 1000 (matting powder), EC 150/10 (matting paste), MP 3000 (thickener), HEC (hardener 3-5%)" }
                }
            },
            {
                id: "TPP",
                name: { pl: "POLYPRO TPP", uk: "POLYPRO TPP", en: "POLYPRO TPP" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Farba rozpuszczalnikowa do polietylenu, polipropylenu i poliwęglanu (priplack, akylux, duoprop). Do wstępnie aktywowanego polietylenu – dodać HTPP SLOW.",
                    uk: "Розчинникова фарба для поліетилену, поліпропілену та полікарбонату (priplack, akylux, duoprop). Для попередньо активованого поліетилену – додати HTPP SLOW.",
                    en: "Solvent-based ink for polyethylene, polypropylene and polycarbonate (priplack, akylux, duoprop). For pre-activated polyethylene – add HTPP SLOW."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "10 min na otwartym powietrzu, natychmiast w tunelu", uk: "10 хв на відкритому повітрі, миттєво в тунелі", en: "10 min open air, instantly in tunnel" },
                    mesh: { pl: "P90-120", uk: "P90-120", en: "P90-120" },
                    cleaning: { pl: "ST 1000", uk: "ST 1000", en: "ST 1000" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", uk: "Дуже хороша стійкість до світла та атмосферних умов", en: "Very good light and weather resistance" },
                    thinning: { pl: "TPP 1000 (szybki), TPP 2000 (normalny), TPP 3000/4000 (lekkie spowolnienie), TPP 5000 (wolny), TPP 8000 (bardzo wolny). +/-15%", uk: "TPP 1000 (швидкий), TPP 2000 (нормальний), TPP 3000/4000 (легке сповільнення), TPP 5000 (повільний), TPP 8000 (дуже повільний). +/-15%", en: "TPP 1000 (fast), TPP 2000 (normal), TPP 3000/4000 (mild retarder), TPP 5000 (slow), TPP 8000 (very slow). +/-15%" },
                    additives: { pl: "HTPP SLOW (utwardzacz), TPP 160 (wyostrzający), TPP 150 (baza transparentna), AS 1000 (antystatyk), TPP 1702 (opóźniacz w żelu)", uk: "HTPP SLOW (затверджувач), TPP 160 (викривлююча добавка), TPP 150 (прозора база), AS 1000 (антистатик), TPP 1702 (сповільнювач у гелі)", en: "HTPP SLOW (hardener), TPP 160 (sharp compound), TPP 150 (transparent base), AS 1000 (antistatic), TPP 1702 (gel retarder)" }
                }
            },
            {
                id: "QS",
                name: { pl: "QUICKSET QS", uk: "QUICKSET QS", en: "QUICKSET QS" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Szybkoschnąca farba rozpuszczalnikowa do twardego/elastycznego PCW, styropianu, plexi, naklejek.",
                    uk: "Швидковисихаюча розчинникова фарба для твердого/еластичного ПВХ, пінополістиролу, плексигласу, наклейок.",
                    en: "Quick-drying solvent-based ink for rigid/flexible PVC, styrofoam, plexiglass, stickers."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Błyszczący", uk: "Глянцевий", en: "Glossy" },
                    drying: { pl: "6 min na otwartym powietrzu, natychmiast w tunelu", uk: "6 хв на відкритому повітрі, миттєво в тунелі", en: "6 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-P120", uk: "P77-P120", en: "P77-P120" },
                    cleaning: { pl: "CT 1000 lub CT 1000/1", uk: "CT 1000 або CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "QS 1000 (szybki), QS 2000 (normalny), QS 3000/4000 (lekkie spowolnienie), QS 5000 (wolny), QS 8000 (bardzo wolny). +/-15%", uk: "QS 1000 (швидкий), QS 2000 (нормальний), QS 3000/4000 (легке сповільнення), QS 5000 (повільний), QS 8000 (дуже повільний). +/-15%", en: "QS 1000 (fast), QS 2000 (normal), QS 3000/4000 (mild retarder), QS 5000 (slow), QS 8000 (very slow). +/-15%" },
                    additives: { pl: "QS 160 (wyostrzający), QS 150 (baza transparentna), AS 1000 (antystatyk), QS 170/1702 (opóźniacz w żelu), HQS (utwardzacz 5%), Weekmaker nr 2000", uk: "QS 160 (викривлююча добавка), QS 150 (прозора база), AS 1000 (антистатик), QS 170/1702 (сповільнювач у гелі), HQS (затверджувач 5%), Weekmaker nr 2000", en: "QS 160 (sharp compound), QS 150 (transparent base), AS 1000 (antistatic), QS 170/1702 (gel retarder), HQS (hardener 5%), Weekmaker nr 2000" }
                }
            },
            {
                id: "SN",
                name: { pl: "SICONYL SN", uk: "SICONYL SN", en: "SICONYL SN" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Farba rozpuszczalnikowa do nylonu (parasole, torby sportowe). Odporna tylko na wodę, nie na pranie.",
                    uk: "Розчинникова фарба для нейлону (парасольки, спортивні сумки). Стійка тільки до води, не до прання.",
                    en: "Solvent-based ink for nylon (umbrellas, sports bags). Water resistant only, not wash resistant."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "4 min na otwartym powietrzu, natychmiast w tunelu", uk: "4 хв на відкритому повітрі, миттєво в тунелі", en: "4 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-P90", uk: "P77-P90", en: "P77-P90" },
                    cleaning: { pl: "CT 1000 lub CT 1000/1", uk: "CT 1000 або CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "SN 1000 (szybki), SN 2000 (normalny), SN 3000/4000 (lekkie spowolnienie), SN 5000 (wolny). +/-10%", uk: "SN 1000 (швидкий), SN 2000 (нормальний), SN 3000/4000 (легке сповільнення), SN 5000 (повільний). +/-10%", en: "SN 1000 (fast), SN 2000 (normal), SN 3000/4000 (mild retarder), SN 5000 (slow). +/-10%" },
                    additives: { pl: "SN 150 (baza transparentna), SN 160 (pasta skracająca), AS 1000 (antystatyk), SN 1702 (opóźniacz w żelu)", uk: "SN 150 (прозора база), SN 160 (паста, що вкорочує), AS 1000 (антистатик), SN 1702 (сповільнювач у гелі)", en: "SN 150 (transparent base), SN 160 (shortening paste), AS 1000 (antistatic), SN 1702 (gel retarder)" }
                }
            },
            {
                id: "EVS",
                name: { pl: "EVASTAR EVS", uk: "EVASTAR EVS", en: "EVASTAR EVS" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Farby rozpuszczalnikowe do pianek PU i EVA.",
                    uk: "Розчинникові фарби для пінополіуретану та EVA.",
                    en: "Solvent-based inks for PU and EVA foams."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "+/-15 min na powietrzu, 30 s 60% gorącym powietrzem", uk: "+/-15 хв на повітрі, 30 с гарячим повітрям 60%", en: "+/-15 min open air, 30 s hot air 60%" },
                    mesh: { pl: "P45-90", uk: "P45-90", en: "P45-90" },
                    cleaning: { pl: "ST 1000", uk: "ST 1000", en: "ST 1000" },
                    storage: { pl: "+/-2 lata", uk: "+/-2 роки", en: "+/-2 years" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "EVS 2000 (normalny), EVS 3000 (wolny), EVS 5000 (super wolny). +/-15%", uk: "EVS 2000 (нормальний), EVS 3000 (повільний), EVS 5000 (суперповільний). +/-15%", en: "EVS 2000 (normal), EVS 3000 (slow), EVS 5000 (super slow). +/-15%" },
                    additives: { pl: "HEVS SLOW (utwardzacz 5%)", uk: "HEVS SLOW (затверджувач 5%)", en: "HEVS SLOW (hardener 5%)" }
                }
            },
            {
                id: "IS",
                name: { pl: "ISOSTAR IS", uk: "ISOSTAR IS", en: "ISOSTAR IS" },
                category: "tworzywa sztuczne",
                description: {
                    pl: "Farba na bazie łagodnego rozpuszczalnika do druku na mokrym STYROFOAM (XPS).",
                    uk: "Фарба на основі м'якого розчинника для друку на вологому пінополістиролі (XPS).",
                    en: "Mild solvent-based ink for printing on wet STYROFOAM (XPS)."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Mat", uk: "Матовий", en: "Matte" },
                    drying: { pl: "+/-10 min na powietrzu, 40°C w piecu", uk: "+/-10 хв на повітрі, 40°C в печі", en: "+/-10 min open air, 40°C in oven" },
                    mesh: { pl: "P77-90", uk: "P77-90", en: "P77-90" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "1 rok", uk: "1 рік", en: "1 year" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "IS 2000/1 (5%)", uk: "IS 2000/1 (5%)", en: "IS 2000/1 (5%)" },
                    additives: {}
                }
            },

            // TEKSTYLIA
            {
                id: "SX",
                name: { pl: "SICOTEX SX", uk: "SICOTEX SX", en: "SICOTEX SX" },
                category: "tekstylia",
                description: {
                    pl: "Wodna farba do bawełny, większości tkanin syntetycznych i mieszanek. Ekologiczna, certyfikat Oekotex 100.",
                    uk: "Водна фарба для бавовни, більшості синтетичних тканин та сумішей. Екологічна, сертифікат Oekotex 100.",
                    en: "Water-based ink for cotton, most synthetic fabrics and blends. Eco-friendly, Oekotex 100 certified."
                },
                properties: {
                    type: { pl: "Farba wodna", uk: "Водна фарба", en: "Water-based ink" },
                    finish: { pl: "Transparentna", uk: "Прозора", en: "Transparent" },
                    drying: { pl: "3 min w 150°C (z 3% HSX – bez termofiksacji)", uk: "3 хв при 150°C (з 3% HSX – без термофіксації)", en: "3 min at 150°C (with 3% HSX – no heat fixation)" },
                    mesh: { pl: "P34-P90 (P90 do CMYK)", uk: "P34-P90 (P90 для CMYK)", en: "P34-P90 (P90 for CMYK)" },
                    cleaning: { pl: "Ciepła woda, detergent, pod wysokim ciśnieniem", uk: "Тепла вода, мийний засіб, під високим тиском", en: "Warm water, detergent, high pressure" },
                    storage: { pl: "1-2 lata (>0°C)", uk: "1-2 роки (>0°C)", en: "1-2 years (>0°C)" },
                    resistance: { pl: "Doskonała po 24h", uk: "Відмінна після 24 год", en: "Excellent after 24h" },
                    thinning: { pl: "Max 10% wody lub SX 5000", uk: "Макс 10% води або SX 5000", en: "Max 10% water or SX 5000" },
                    additives: { pl: "HSX (utwardzacz), SX 150 + 11 past pigmentowych", uk: "HSX (затверджувач), SX 150 + 11 паст", en: "HSX (hardener), SX 150 + 11 pigment pastes" }
                }
            },
            {
                id: "SPTN",
                name: { pl: "SICOPLAST SPTN", uk: "SICOPLAST SPTN", en: "SICOPLAST SPTN" },
                category: "tekstylia",
                description: {
                    pl: "Farba plastizolowa do wszystkich tkanin – naturalnych i syntetycznych. Do druku bezpośredniego i transferowego.",
                    uk: "Пластизолева фарба для всіх тканин – натуральних та синтетичних. Для прямого та трансферного друку.",
                    en: "Plastisol ink for all fabrics – natural and synthetic. For direct and transfer printing."
                },
                properties: {
                    type: { pl: "Farba plastizolowa", uk: "Пластизолева фарба", en: "Plastisol ink" },
                    finish: { pl: "Satyna, miękka, elastyczna", uk: "Сатиновий, м'який, еластичний", en: "Satin, soft, elastic" },
                    drying: { pl: "150-170°C ~2 min", uk: "150-170°C ~2 хв", en: "150-170°C ~2 min" },
                    mesh: { pl: "Standard: 34-90 n/cm, triada: 77-120, brokat: 15", uk: "Стандартні: 34-90 н/см, тріадні: 77-120, блискітки: 15", en: "Standard: 34-90 n/cm, process: 77-120, glitter: 15" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "5-20°C, do 5 lat", uk: "5-20°C, до 5 років", en: "5-20°C, up to 5 years" },
                    resistance: { pl: "Doskonała (oprócz fluo)", uk: "Відмінна (крім флуо)", en: "Excellent (except fluo)" },
                    thinning: { pl: "SPT nr 1/SPTN 1000 (5%), SPTNCR (bez ograniczeń)", uk: "SPT nr 1/SPTN 1000 (5%), SPTNCR (без обмежень)", en: "SPT nr 1/SPTN 1000 (5%), SPTNCR (unlimited)" },
                    additives: { pl: "SPTHNYL (10%), Nyloncoat (5%), baza pęczniejąca, klej transferowy SPT nr 2", uk: "SPTHNYL (10%), Nyloncoat (5%), база спучування, трансферний клей SPT nr 2", en: "SPTHNYL (10%), Nyloncoat (5%), puff base, transfer adhesive SPT nr 2" }
                }
            },
            {
                id: "NST",
                name: { pl: "NYLONSTAR NST", uk: "NYLONSTAR NST", en: "NYLONSTAR NST" },
                category: "tekstylia",
                description: {
                    pl: "Farba rozpuszczalnikowa do poliamidu (nylon) i toreb non-woven. Wysoka elastyczność, odporność na pranie (z katalizatorem).",
                    uk: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven. Висока еластичність, стійкість до прання (з каталізатором).",
                    en: "Solvent-based ink for polyamide (nylon) and non-woven bags. High elasticity, wash resistance (with catalyst)."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "5 min na powietrzu, natychmiast w tunelu", uk: "5 хв на повітрі, миттєво в тунелі", en: "5 min open air, instantly in tunnel" },
                    mesh: { pl: "P45-P90", uk: "P45-P90", en: "P45-P90" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Ponad 24 miesiące", uk: "Понад 24 місяці", en: "Over 24 months" },
                    resistance: { pl: "Dobra; z HNST SLOW – wysoka", uk: "Хороша; з HNST SLOW – висока", en: "Good; with HNST SLOW – high" },
                    thinning: { pl: "Do 15% NST 1702", uk: "До 15% NST 1702", en: "Up to 15% NST 1702" },
                    additives: { pl: "HNST SLOW (5%), NST 150 (baza transparentna), MP 3000", uk: "HNST SLOW (5%), NST 150 (прозора база), MP 3000", en: "HNST SLOW (5%), NST 150 (transparent base), MP 3000" }
                }
            },
            {
                id: "OTF",
                name: { pl: "OPATEX OTF", uk: "OPATEX OTF", en: "OPATEX OTF" },
                category: "tekstylia",
                description: {
                    pl: "Superkryjąca wodna farba do druku bezpośredniego i transferowego na ciemnych tkaninach.",
                    uk: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах.",
                    en: "Super opaque water-based ink for direct and transfer printing on dark fabrics."
                },
                properties: {
                    type: { pl: "Farba wodna", uk: "Водна фарба", en: "Water-based ink" },
                    finish: { pl: "Kryjący, miękki", uk: "Криючий, м'який", en: "Opaque, soft" },
                    drying: { pl: "3 min w 150°C; z 3% HOT – bez termofiksacji", uk: "3 хв при 150°C; з 3% HOT – без термофіксації", en: "3 min at 150°C; with 3% HOT – no heat fixation" },
                    mesh: { pl: "P34T-P77T", uk: "P34T-P77T", en: "P34T-P77T" },
                    cleaning: { pl: "Woda + Aquaclean, CT 1000/63 dla emulsji odpornej", uk: "Вода + Aquaclean, CT 1000/63 для стійкої емульсії", en: "Water + Aquaclean, CT 1000/63 for resistant emulsion" },
                    storage: { pl: "1-2 lata (10-25°C)", uk: "1-2 роки (10-25°C)", en: "1-2 years (10-25°C)" },
                    resistance: { pl: "Doskonała z HOT", uk: "Відмінна з HOT", en: "Excellent with HOT" },
                    thinning: { pl: "Max 10% wody, OTF 5000, OTF 7000", uk: "Макс 10% води, OTF 5000, OTF 7000", en: "Max 10% water, OTF 5000, OTF 7000" },
                    additives: { pl: "HOT (3%), OTF 150/14 (lakier), OTF 100/101 (bloker), baza pęczniejąca OTF", uk: "HOT (3%), OTF 150/14 (лак), OTF 100/101 (блокатор), база спучування OTF", en: "HOT (3%), OTF 150/14 (varnish), OTF 100/101 (blocker), OTF puff base" }
                }
            },
            {
                id: "SI",
                name: { pl: "SILICON SI", uk: "SILICON SI", en: "SILICON SI" },
                category: "tekstylia",
                description: {
                    pl: "Farba silikonowa do koszul poliestrowych i kurtek softshell. Doskonała odporność na migrację barwnika.",
                    uk: "Силіконова фарба для поліестерових сорочок і курток softshell. Чудова стійкість до міграції барвника.",
                    en: "Silicone ink for polyester shirts and softshell jackets. Excellent dye migration resistance."
                },
                properties: {
                    type: { pl: "Farba silikonowa", uk: "Силіконова фарба", en: "Silicone ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "2 min 150°C (bezpośredni); transfer: 120°C 120 s", uk: "2 хв 150°C (прямий); трансфер: 120°C 120 с", en: "2 min 150°C (direct); transfer: 120°C 120 s" },
                    mesh: { pl: "P62", uk: "P62", en: "P62" },
                    cleaning: { pl: "CT 1000/74", uk: "CT 1000/74", en: "CT 1000/74" },
                    storage: { pl: "12 miesięcy; po dodaniu katalizatora 1-2 dni", uk: "12 місяців; після додавання каталізатора 1-2 дні", en: "12 months; after adding catalyst 1-2 days" },
                    resistance: { pl: "Doskonała", uk: "Відмінна", en: "Excellent" },
                    thinning: { pl: "SI 2000 (reduktor), SI 5000 (opóźniacz max 1%)", uk: "SI 2000 (редуктор), SI 5000 (сповільнювач макс 1%)", en: "SI 2000 (reducer), SI 5000 (retarder max 1%)" },
                    additives: { pl: "CSI (katalizator 3-5%), Fixator SI (1%), proszek transferowy nr 16", uk: "CSI (каталізатор 3-5%), Fixator SI (1%), трансферний порошок nr 16", en: "CSI (catalyst 3-5%), Fixator SI (1%), transfer powder nr 16" }
                }
            },
            {
                id: "SPTR",
                name: { pl: "TRANSPLAST SPTR", uk: "TRANSPLAST SPTR", en: "TRANSPLAST SPTR" },
                category: "tekstylia",
                description: {
                    pl: "Farby plastizolowe do druku transferowego, bardzo dobre krycie, elastyczność. Ten sam kolor na białym i czarnym podłożu.",
                    uk: "Пластизолеві фарби для трансферного друку, дуже добре покриття, еластичність. Один колір на білій та чорній основі.",
                    en: "Plastisol inks for transfer printing, very good opacity, elasticity. Same color on white and black substrate."
                },
                properties: {
                    type: { pl: "Farba plastizolowa", uk: "Пластизолева фарба", en: "Plastisol ink" },
                    finish: { pl: "Satyna, miękka", uk: "Сатиновий, м'який", en: "Satin, soft" },
                    drying: { pl: "Suszyć w 120°C, transfer 150-180°C 15-20 s", uk: "Сушити при 120°C, трансфер 150-180°C 15-20 с", en: "Dry at 120°C, transfer 150-180°C 15-20 s" },
                    mesh: { pl: "Standard: P34-P90, triada: P77-P120, brokat: P15", uk: "Стандартні: P34-P90, тріадні: P77-P120, блискітки: P15", en: "Standard: P34-P90, process: P77-P120, glitter: P15" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "+/-5 lat", uk: "+/-5 років", en: "+/-5 years" },
                    resistance: { pl: "Doskonała (oprócz fluo)", uk: "Відмінна (крім флуо)", en: "Excellent (except fluo)" },
                    thinning: { pl: "Reducer nr 1/SPTN 1000 (5%), Curable reducer (bez ograniczeń)", uk: "Reducer nr 1/SPTN 1000 (5%), Curable reducer (без обмежень)", en: "Reducer nr 1/SPTN 1000 (5%), Curable reducer (unlimited)" },
                    additives: { pl: "Transferglue SPTN nr 4", uk: "Transferglue SPTN nr 4", en: "Transferglue SPTN nr 4" }
                }
            },
            {
                id: "ASV",
                name: { pl: "ASV SUBLIMACJA", uk: "ASV СУБЛІМАЦІЯ", en: "ASV SUBLIMATION" },
                category: "tekstylia",
                description: {
                    pl: "Farba wodna do druku sublimacyjnego na papierze, transfer na poliester, nylon, akryl.",
                    uk: "Водна фарба для сублімаційного друку на папері, перенесення на поліестер, нейлон, акрил.",
                    en: "Water-based ink for sublimation printing on paper, transfer to polyester, nylon, acrylic."
                },
                properties: {
                    type: { pl: "Farba wodna", uk: "Водна фарба", en: "Water-based ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "5 min na powietrzu", uk: "5 хв на повітрі", en: "5 min open air" },
                    mesh: { pl: "P90-P140", uk: "P90-P140", en: "P90-P140" },
                    cleaning: { pl: "Woda lub Aquaclean", uk: "Вода або Aquaclean", en: "Water or Aquaclean" },
                    storage: { pl: "Do 9 miesięcy", uk: "До 9 місяців", en: "Up to 9 months" },
                    resistance: { pl: "Wysoka", uk: "Висока", en: "High" },
                    thinning: { pl: "Woda", uk: "Вода", en: "Water" },
                    additives: { pl: "ASV 150/25 (lakier zwiększający przyczepność), środek przeciw pieniący", uk: "ASV 150/25 (лак для підвищення адгезії), піногасник", en: "ASV 150/25 (adhesion promoter varnish), anti-foam agent" }
                }
            },

            // FARBY UV
            {
                id: "PPUV",
                name: { pl: "POLYPRO PPUV", uk: "POLYPRO PPUV", en: "POLYPRO PPUV" },
                category: "UV",
                description: {
                    pl: "Farba i lakier UV do aktywowanego polipropylenu, polietylenu, materiałów samoprzylepnych, banerów, metali, poliwęglanu, papieru, PCW.",
                    uk: "УФ-фарба та лак для активованого поліпропілену, поліетилену, самоклейних матеріалів, банерів, металів, полікарбонату, паперу, ПВХ.",
                    en: "UV ink and varnish for activated polypropylene, polyethylene, self-adhesives, banners, metals, polycarbonate, paper, PVC."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "Tylko UV: 1-2 lampy 80-100W, 25-30 m/min", uk: "Тільки УФ: 1-2 лампи 80-100 Вт, 25-30 м/хв", en: "UV only: 1-2 lamps 80-100W, 25-30 m/min" },
                    mesh: { pl: "P140-185", uk: "P140-185", en: "P140-185" },
                    cleaning: { pl: "CT 1000/20, CT 1000, CT 1000/1", uk: "CT 1000/20, CT 1000, CT 1000/1", en: "CT 1000/20, CT 1000, CT 1000/1" },
                    storage: { pl: "1-2 lata (5-25°C, ciemne pojemniki)", uk: "1-2 роки (5-25°C, темні контейнери)", en: "1-2 years (5-25°C, dark containers)" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "PPUV 2000 (reduktor)", uk: "PPUV 2000 (редуктор)", en: "PPUV 2000 (reducer)" },
                    additives: { pl: "HPPUV SLOW (utwardzacz 5%)", uk: "HPPUV SLOW (затверджувач 5%)", en: "HPPUV SLOW (hardener 5%)" }
                }
            },
            {
                id: "UVILUX",
                name: { pl: "UVILUX UV", uk: "UVILUX UV", en: "UVILUX UV" },
                category: "UV",
                description: {
                    pl: "Farba i lakier UV do papieru i kartonu. Lakier UV 150 idealny do offsetu i sitodruku, elastyczny.",
                    uk: "УФ-фарба та лак для паперу та картону. Лак UV 150 ідеальний для офсету та трафаретного друку, еластичний.",
                    en: "UV ink and varnish for paper and cardboard. UV 150 varnish ideal for offset and screen printing, flexible."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Wysoki połysk", uk: "Високий глянець", en: "High gloss" },
                    drying: { pl: "Tylko UV: 1-2 lampy 80-100W, 25-30 m/min", uk: "Тільки УФ: 1-2 лампи 80-100 Вт, 25-30 м/хв", en: "UV only: 1-2 lamps 80-100W, 25-30 m/min" },
                    mesh: { pl: "P140-P185T (aluminium/złoto: P120, fluo: P90)", uk: "P140-P185T (алюміній/золото: P120, флуо: P90)", en: "P140-P185T (aluminum/gold: P120, fluo: P90)" },
                    cleaning: { pl: "CT 1000 lub CT 1000/1", uk: "CT 1000 або CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { pl: "1-2 lata (5-25°C, ciemne pojemniki)", uk: "1-2 роки (5-25°C, темні контейнери)", en: "1-2 years (5-25°C, dark containers)" },
                    resistance: { pl: "Bardzo dobra (możliwe żółknięcie lakieru po roku)", uk: "Дуже хороша (можливе пожовтіння лаку через рік)", en: "Very good (possible varnish yellowing after one year)" },
                    thinning: { pl: "UV 2000 (rozcieńczalnik)", uk: "UV 2000 (розчинник)", en: "UV 2000 (thinner)" },
                    additives: {}
                }
            },
            {
                id: "PLUV",
                name: { pl: "UVIPLAST PLUV", uk: "UVIPLAST PLUV", en: "UVIPLAST PLUV" },
                category: "UV",
                description: {
                    pl: "Farba i lakier UV do materiałów samoprzylepnych, banerów, metali lakierowanych, PP, styropianu, polietylenu, poliwęglanu, papieru, PCW. Lakier PLUV 150 wysoki połysk.",
                    uk: "УФ-фарба та лак для самоклейних матеріалів, банерів, лакованих металів, ПП, пінополістиролу, поліетилену, полікарбонату, паперу, ПВХ. Лак PLUV 150 високий глянець.",
                    en: "UV ink and varnish for self-adhesives, banners, lacquered metals, PP, styrofoam, polyethylene, polycarbonate, paper, PVC. PLUV 150 varnish high gloss."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Wysoki połysk", uk: "Високий глянець", en: "High gloss" },
                    drying: { pl: "Tylko UV: 1-2 lampy 80-100W, 25-30 m/min", uk: "Тільки УФ: 1-2 лампи 80-100 Вт, 25-30 м/хв", en: "UV only: 1-2 lamps 80-100W, 25-30 m/min" },
                    mesh: { pl: "P140-P185T (fluoro: P90, alu/złoto: P120)", uk: "P140-P185T (флуо: P90, алюміній/золото: P120)", en: "P140-P185T (fluo: P90, alu/gold: P120)" },
                    cleaning: { pl: "CT 1000/20, CT 1000, CT 1000/1", uk: "CT 1000/20, CT 1000, CT 1000/1", en: "CT 1000/20, CT 1000, CT 1000/1" },
                    storage: { pl: "1-2 lata (5-25°C, ciemne pojemniki)", uk: "1-2 роки (5-25°C, темні контейнери)", en: "1-2 years (5-25°C, dark containers)" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "PLUV 2000 (rozcieńczalnik)", uk: "PLUV 2000 (розчинник)", en: "PLUV 2000 (thinner)" },
                    additives: { pl: "HPLUV (utwardzacz 5%)", uk: "HPLUV (затверджувач 5%)", en: "HPLUV (hardener 5%)" }
                }
            },
            {
                id: "MFUV",
                name: { pl: "MULTIFLEX MFUV", uk: "MULTIFLEX MFUV", en: "MULTIFLEX MFUV" },
                category: "UV",
                description: {
                    pl: "Wysokoelastyczna farba UV do materiałów samoprzylepnych, banerów, polietylenu, polipropylenu, poliwęglanu, polistyrenu, PCW. Nadaje się do termoformowania.",
                    uk: "Високоеластична УФ-фарба для самоклейних матеріалів, банерів, поліетилену, поліпропілену, полікарбонату, полістиролу, ПВХ. Підходить для термоформування.",
                    en: "Highly flexible UV ink for self-adhesives, banners, polyethylene, polypropylene, polycarbonate, polystyrene, PVC. Suitable for thermoforming."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Błysk", uk: "Блиск", en: "Gloss" },
                    drying: { pl: "1-2 lampy 80-100W, 25-30 m/min", uk: "1-2 лампи 80-100 Вт, 25-30 м/хв", en: "1-2 lamps 80-100W, 25-30 m/min" },
                    mesh: { pl: "P150.34 (farba), P185 (lakier)", uk: "P150.34 (фарба), P185 (лак)", en: "P150.34 (ink), P185 (varnish)" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Do 2 lat (5-25°C)", uk: "До 2 років (5-25°C)", en: "Up to 2 years (5-25°C)" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "UVPT",
                name: { pl: "POLYTREAT UVPT", uk: "POLYTREAT UVPT", en: "POLYTREAT UVPT" },
                category: "UV",
                description: {
                    pl: "Farby z satynowym połyskiem do wstępnie aktywowanego polipropylenu, materiałów samoprzylepnych, banerów, metali, polietylenu, poliwęglanu, papieru, PCW. Lakier UVPT 150 satynowy do zastosowań zewnętrznych.",
                    uk: "Фарби з сатиновим блиском для попередньо активованого поліпропілену, самоклейних матеріалів, банерів, металів, поліетилену, полікарбонату, паперу, ПВХ. Лак UVPT 150 сатиновий для зовнішнього застосування.",
                    en: "Satin gloss inks for pre-activated polypropylene, self-adhesives, banners, metals, polyethylene, polycarbonate, paper, PVC. UVPT 150 satin varnish for outdoor use."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "Tylko UV: 1-2 lampy 80-100W, 25-30 m/min", uk: "Тільки УФ: 1-2 лампи 80-100 Вт, 25-30 м/хв", en: "UV only: 1-2 lamps 80-100W, 25-30 m/min" },
                    mesh: { pl: "P140-P185", uk: "P140-P185", en: "P140-P185" },
                    cleaning: { pl: "CT 1000/1 lub CT 1000", uk: "CT 1000/1 або CT 1000", en: "CT 1000/1 or CT 1000" },
                    storage: { pl: "Do 2 lat (5-30°C)", uk: "До 2 років (5-30°C)", en: "Up to 2 years (5-30°C)" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "UVPT 2000 (5%)", uk: "UVPT 2000 (5%)", en: "UVPT 2000 (5%)" },
                    additives: { pl: "HUVPT (utwardzacz 5%)", uk: "HUVPT (затверджувач 5%)", en: "HUVPT (hardener 5%)" }
                }
            },

            // PAPIER, KARTON
            {
                id: "SP",
                name: { pl: "SICOPRINT SP", uk: "SICOPRINT SP", en: "SICOPRINT SP" },
                category: "papier",
                description: {
                    pl: "Farby rozpuszczalnikowe do billboardów, papieru, kartonu. Badane pod kątem klejów.",
                    uk: "Розчинникові фарби для білбордів, паперу, картону. Перевірені на стійкість до клеїв.",
                    en: "Solvent-based inks for billboards, paper, cardboard. Tested for adhesive resistance."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "5-10 min na powietrzu, natychmiast w tunelu", uk: "5-10 хв на повітрі, миттєво в тунелі", en: "5-10 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-P120", uk: "P77-P120", en: "P77-P120" },
                    cleaning: { pl: "ST 1000", uk: "ST 1000", en: "ST 1000" },
                    storage: { pl: "Kilka lat", uk: "Кілька років", en: "Several years" },
                    resistance: { pl: "Bardzo dobra (oprócz fluo)", uk: "Дуже хороша (крім флуо)", en: "Very good (except fluo)" },
                    thinning: { pl: "SP 1000 (szybki), SP 2000 (normalny), SP 3000 (wolny). +/-15%", uk: "SP 1000 (швидкий), SP 2000 (нормальний), SP 3000 (повільний). +/-15%", en: "SP 1000 (fast), SP 2000 (normal), SP 3000 (slow). +/-15%" },
                    additives: { pl: "SP 160 (wyostrzający), SP 150 (baza transparentna), AS 1000 (antystatyk)", uk: "SP 160 (викривлююча добавка), SP 150 (прозора база), AS 1000 (антистатик)", en: "SP 160 (sharp compound), SP 150 (transparent base), AS 1000 (antistatic)" }
                }
            },
            {
                id: "CF",
                name: { pl: "CARTOFLEX CF", uk: "CARTOFLEX CF", en: "CARTOFLEX CF" },
                category: "papier",
                description: {
                    pl: "Farba rozpuszczalnikowa do kartonu, papieru, papierów samoprzylepnych, drewna, metali lakierowanych. Druk przemysłowy.",
                    uk: "Розчинникова фарба для картону, паперу, самоклейних паперів, дерева, лакованих металів. Промисловий друк.",
                    en: "Solvent-based ink for cardboard, paper, self-adhesive papers, wood, lacquered metals. Industrial printing."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Półmat", uk: "Напівмат", en: "Semi-matte" },
                    drying: { pl: "4 min na powietrzu, natychmiast w tunelu", uk: "4 хв на повітрі, миттєво в тунелі", en: "4 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-P120", uk: "P77-P120", en: "P77-P120" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Bardzo dobra", uk: "Дуже хороша", en: "Very good" },
                    thinning: { pl: "CF 1000 (szybki), CF 2000 (normalny), CF 3000/4000 (lekkie spowolnienie), CF 5000 (opóźniacz), CF 8000 (bardzo wolny). +/-20%", uk: "CF 1000 (швидкий), CF 2000 (нормальний), CF 3000/4000 (легке сповільнення), CF 5000 (сповільнювач), CF 8000 (дуже повільний). +/-20%", en: "CF 1000 (fast), CF 2000 (normal), CF 3000/4000 (mild retarder), CF 5000 (retarder), CF 8000 (very slow). +/-20%" },
                    additives: { pl: "CF 150 (baza transparentna), CF 1501 HG (lakier), CF 160 (wyostrzający), CF 1702 (opóźniacz), AS 1000, HCF (utwardzacz)", uk: "CF 150 (прозора база), CF 1501 HG (лак), CF 160 (викривлююча добавка), CF 1702 (сповільнювач), AS 1000, HCF (затверджувач)", en: "CF 150 (transparent base), CF 1501 HG (varnish), CF 160 (sharp compound), CF 1702 (retarder), AS 1000, HCF (hardener)" }
                }
            },
            {
                id: "AS",
                name: { pl: "AQUASET AS", uk: "AQUASET AS", en: "AQUASET AS" },
                category: "papier",
                description: {
                    pl: "Farba wodna do kartonu, grubego papieru, drewna, tektury falistej. Ekologiczna, do zabawek i opakowań spożywczych.",
                    uk: "Водна фарба для картону, товстого паперу, дерева, гофрокартону. Екологічна, для іграшок та харчової упаковки.",
                    en: "Water-based ink for cardboard, thick paper, wood, corrugated cardboard. Eco-friendly, for toys and food packaging."
                },
                properties: {
                    type: { pl: "Farba wodna", uk: "Водна фарба", en: "Water-based ink" },
                    finish: { pl: "Satyna (AG: błyszcząca)", uk: "Сатиновий (AG: глянцевий)", en: "Satin (AG: glossy)" },
                    drying: { pl: "1 godz. na powietrzu, po tunelu można układać", uk: "1 год на повітрі, після тунелю можна складати", en: "1 hour open air, after tunnel stackable" },
                    mesh: { pl: "P77-P140", uk: "P77-P140", en: "P77-P140" },
                    cleaning: { pl: "Woda, Aquaclean", uk: "Вода, Aquaclean", en: "Water, Aquaclean" },
                    storage: { pl: "4 lata (5-25°C)", uk: "4 роки (5-25°C)", en: "4 years (5-25°C)" },
                    resistance: { pl: "Ekologiczna; z utwardzaczem wodoodporna", uk: "Екологічна; з затверджувачем водостійка", en: "Eco-friendly; with hardener water resistant" },
                    thinning: { pl: "Woda lub AS 5000", uk: "Вода або AS 5000", en: "Water or AS 5000" },
                    additives: { pl: "Utwardzacz 1% (zużyć w 12h)", uk: "Затверджувач 1% (використати за 12 год)", en: "Hardener 1% (use within 12h)" }
                }
            },

            // TRUDNE MATERIAŁY
            {
                id: "SD",
                name: { pl: "SICODUR SD", uk: "SICODUR SD", en: "SICODUR SD" },
                category: "trudne materiały",
                description: {
                    pl: "Farby rozpuszczalnikowe do twardych materiałów: anodowane aluminium, inox, szkło. Do użytku zewnętrznego zalecane lakierowanie PX 150.",
                    uk: "Розчинникові фарби для твердих матеріалів: анодований алюміній, нержавіюча сталь, скло. Для зовнішнього використання рекомендується лакування PX 150.",
                    en: "Solvent-based inks for hard materials: anodized aluminum, stainless steel, glass. For outdoor use, varnishing with PX 150 recommended."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "4 min na powietrzu, natychmiast w tunelu", uk: "4 хв на повітрі, миттєво в тунелі", en: "4 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-150", uk: "P77-150", en: "P77-150" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "SD 1000 (szybki), SD 2000 (normalny), SD 3000/4000 (wolny), SD 5000 (super wolny max 5%)", uk: "SD 1000 (швидкий), SD 2000 (нормальний), SD 3000/4000 (повільний), SD 5000 (суперповільний макс 5%)", en: "SD 1000 (fast), SD 2000 (normal), SD 3000/4000 (slow), SD 5000 (super slow max 5%)" },
                    additives: { pl: "HSD (utwardzacz 5%)", uk: "HSD (затверджувач 5%)", en: "HSD (hardener 5%)" }
                }
            },
            {
                id: "PX",
                name: { pl: "SICEPOX PX", uk: "SICEPOX PX", en: "SICEPOX PX" },
                category: "trudne materiały",
                description: {
                    pl: "Farba chemoutwardzalna dwuskładnikowa do szkła, metalu, płytek ceramicznych. Wysoki połysk.",
                    uk: "Хімічно твердіюча двокомпонентна фарба для скла, металу, керамічної плитки. Високий глянець.",
                    en: "Two-component chemically curing ink for glass, metal, ceramic tiles. High gloss."
                },
                properties: {
                    type: { pl: "Farba chemoutwardzalna", uk: "Хімічно твердіюча фарба", en: "Chemically curing ink" },
                    finish: { pl: "Wysoki połysk", uk: "Високий глянець", en: "High gloss" },
                    drying: { pl: "Po dodaniu utwardzacza: kurzoodporna 60 min, układalna 3h, utwardzona 24-48h", uk: "Після додавання затверджувача: пилонепроникна 60 хв, можна складати 3 год, затверділа 24-48 год", en: "After adding hardener: dust-free 60 min, stackable 3h, cured 24-48h" },
                    mesh: { pl: "P77-P150", uk: "P77-P150", en: "P77-P150" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Bez utwardzacza: kilka lat; z utwardzaczem: 8h", uk: "Без затверджувача: кілька років; з затверджувачем: 8 год", en: "Without hardener: several years; with hardener: 8h" },
                    resistance: { pl: "Bardzo dobra", uk: "Дуже хороша", en: "Very good" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: { pl: "HPX (utwardzacz)", uk: "HPX (затверджувач)", en: "HPX (hardener)" }
                }
            },

            // KLEJE
            {
                id: "CONTACT",
                name: { pl: "CONTACT GLUE", uk: "CONTACT GLUE", en: "CONTACT GLUE" },
                category: "kleje",
                description: {
                    pl: "Klej na bazie wody do papieru i kartonu. Aktywuje się pod naciskiem.",
                    uk: "Клей на водній основі для паперу та картону. Активується під тиском.",
                    en: "Water-based adhesive for paper and cardboard. Activated under pressure."
                },
                properties: {
                    type: { pl: "Klej wodny", uk: "Водний клей", en: "Water-based adhesive" },
                    finish: { pl: "Przezroczysty po wyschnięciu", uk: "Прозорий після висихання", en: "Transparent when dry" },
                    drying: { pl: "Na powietrzu lub w tunelu 40°C", uk: "На повітрі або в тунелі 40°C", en: "Open air or tunnel 40°C" },
                    mesh: { pl: "P77-90", uk: "P77-90", en: "P77-90" },
                    cleaning: { pl: "Woda, QS 1000", uk: "Вода, QS 1000", en: "Water, QS 1000" },
                    storage: { pl: "6 miesięcy (nieotwarty)", uk: "6 місяців (не відкритий)", en: "6 months (unopened)" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Woda", uk: "Вода", en: "Water" },
                    additives: {}
                }
            },
            {
                id: "DECACOL",
                name: { pl: "DECACOL 150/17", uk: "DECACOL 150/17", en: "DECACOL 150/17" },
                category: "kleje",
                description: {
                    pl: "Mocny klej na bazie wody do papieru, tektury, PCW, PETG, poliwęglanu, polistyrenu, PP, PE.",
                    uk: "Міцний клей на водній основі для паперу, картону, ПВХ, ПЕТГ, полікарбонату, полістиролу, ПП, ПЕ.",
                    en: "Strong water-based adhesive for paper, cardboard, PVC, PETG, polycarbonate, polystyrene, PP, PE."
                },
                properties: {
                    type: { pl: "Klej wodny", uk: "Водний клей", en: "Water-based adhesive" },
                    finish: { pl: "Przezroczysty", uk: "Прозорий", en: "Transparent" },
                    drying: { pl: "Na powietrzu lub tunelu 50°C", uk: "На повітрі або в тунелі 50°C", en: "Open air or tunnel 50°C" },
                    mesh: { pl: "P33-P77", uk: "P33-P77", en: "P33-P77" },
                    cleaning: { pl: "Woda, ST 1000", uk: "Вода, ST 1000", en: "Water, ST 1000" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "Optymalna po 3 dniach", uk: "Оптимальна через 3 дні", en: "Optimal after 3 days" },
                    thinning: { pl: "Woda", uk: "Вода", en: "Water" },
                    additives: { pl: "Decawhite 150/19 (biała kryjąca wersja)", uk: "Decawhite 150/19 (біла криюча версія)", en: "Decawhite 150/19 (white opaque version)" }
                }
            },
            {
                id: "SICOL",
                name: { pl: "SICOL 150/31", uk: "SICOL 150/31", en: "SICOL 150/31" },
                category: "kleje",
                description: {
                    pl: "Delikatny klej na bazie wody do papieru, kartonu, PCW. Łatwo usuwalny, nie zostawia śladów.",
                    uk: "Делікатний клей на водній основі для паперу, картону, ПВХ. Легко видаляється, не залишає слідів.",
                    en: "Mild water-based adhesive for paper, cardboard, PVC. Easily removable, leaves no residue."
                },
                properties: {
                    type: { pl: "Klej wodny", uk: "Водний клей", en: "Water-based adhesive" },
                    finish: { pl: "Przezroczysty", uk: "Прозорий", en: "Transparent" },
                    drying: { pl: "Na powietrzu", uk: "На повітрі", en: "Open air" },
                    mesh: { pl: "P120-45", uk: "P120-45", en: "P120-45" },
                    cleaning: { pl: "Woda, Aquaclean, ST 1000", uk: "Вода, Aquaclean, ST 1000", en: "Water, Aquaclean, ST 1000" },
                    storage: { pl: "6 miesięcy", uk: "6 місяців", en: "6 months" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Woda", uk: "Вода", en: "Water" },
                    additives: {}
                }
            },
            {
                id: "STAMP",
                name: { pl: "STAMP GLUE", uk: "STAMP GLUE", en: "STAMP GLUE" },
                category: "kleje",
                description: {
                    pl: "Klej do znaczków, aktywuje się po zamoczeniu. Nieszkodliwy, jadalny.",
                    uk: "Клей для марок, активується при змочуванні. Нешкідливий, їстівний.",
                    en: "Stamp glue, activated by moistening. Harmless, edible."
                },
                properties: {
                    type: { pl: "Klej wodny", uk: "Водний клей", en: "Water-based adhesive" },
                    finish: { pl: "Przezroczysty", uk: "Прозорий", en: "Transparent" },
                    drying: { pl: "Na powietrzu lub w tunelu", uk: "На повітрі або в тунелі", en: "Open air or tunnel" },
                    mesh: { pl: "P45-P90", uk: "P45-P90", en: "P45-P90" },
                    cleaning: { pl: "Woda", uk: "Вода", en: "Water" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Woda", uk: "Вода", en: "Water" },
                    additives: {}
                }
            },
            {
                id: "THERMO",
                name: { pl: "THERMO GLUE BV 150", uk: "THERMO GLUE BV 150", en: "THERMO GLUE BV 150" },
                category: "kleje",
                description: {
                    pl: "Klej rozpuszczalnikowy do grubego papieru, kartonu i PCW (blister). Aktywacja cieplna.",
                    uk: "Розчинниковий клей для товстого паперу, картону та ПВХ (блістер). Термоактивація.",
                    en: "Solvent-based adhesive for thick paper, cardboard and PVC (blister). Heat activation."
                },
                properties: {
                    type: { pl: "Klej rozpuszczalnikowy", uk: "Розчинниковий клей", en: "Solvent-based adhesive" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Na powietrzu lub tunelu 40°C", uk: "На повітрі або в тунелі 40°C", en: "Open air or tunnel 40°C" },
                    mesh: { pl: "P45", uk: "P45", en: "P45" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "Optymalna w 120°C", uk: "Оптимальна при 120°C", en: "Optimal at 120°C" },
                    thinning: { pl: "BV 2000 (10%)", uk: "BV 2000 (10%)", en: "BV 2000 (10%)" },
                    additives: {}
                }
            },

            // EFEKTY SPECJALNE (skrótowo, wiele produktów)
            {
                id: "REFLECTIVE",
                name: { pl: "LAKIER ODBLASKOWY / FARBA 137/2", uk: "ВІДБИВАЮЧИЙ ЛАК / ФАРБА 137/2", en: "REFLECTIVE VARNISH / INK 137/2" },
                category: "efekty specjalne",
                description: {
                    pl: "Odbija światło odblaskowo. Do oznakowań bezpieczeństwa i odzieży ochronnej.",
                    uk: "Відбиває світло. Для знаків безпеки та захисного одягу.",
                    en: "Reflects light. For safety markings and protective clothing."
                },
                properties: {
                    type: { pl: "Lakier/farba", uk: "Лак/фарба", en: "Varnish/ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "–", uk: "–", en: "–" },
                    mesh: { pl: "P45", uk: "P45", en: "P45" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "ANTYPOŚLIZGOWY",
                name: { pl: "LAKIER ANTYPOŚLIZGOWY PLUV 150/33", uk: "ПРОТИКОВЗКИЙ ЛАК PLUV 150/33", en: "ANTI-SLIP VARNISH PLUV 150/33" },
                category: "efekty specjalne",
                description: {
                    pl: "Lakier UV antypoślizgowy do PCW i tworzyw, do naklejek podłogowych.",
                    uk: "УФ-лак протиковзкий для ПВХ та пластиків, для підлогових наклейок.",
                    en: "Anti-slip UV varnish for PVC and plastics, for floor stickers."
                },
                properties: {
                    type: { pl: "Lakier UV", uk: "УФ-лак", en: "UV varnish" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "UV: 1-2 lampy 80-100W, 15-20 m/min", uk: "УФ: 1-2 лампи 80-100 Вт, 15-20 м/хв", en: "UV: 1-2 lamps 80-100W, 15-20 m/min" },
                    mesh: { pl: "P77", uk: "P77", en: "P77" },
                    cleaning: { pl: "CT 1000/20", uk: "CT 1000/20", en: "CT 1000/20" },
                    storage: { pl: "1-2 lata", uk: "1-2 роки", en: "1-2 years" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "SCRATCH",
                name: { pl: "FARBA ZDRAPKOWA SB (SILVER, BLACK)", uk: "ФАРБА ДЛЯ СТИРАННЯ SB (СРІБЛО, ЧОРНИЙ)", en: "SCRATCH-OFF INK SB (SILVER, BLACK)" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba do zdrapek na kuponach, papierze, kartonie. Nakładać na lakier podkładowy.",
                    uk: "Фарба для стирання на купонах, папері, картоні. Наносити на ґрунтовий лак.",
                    en: "Scratch-off ink for lottery tickets, paper, cardboard. Apply over base varnish."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa/UV", uk: "Розчинникова/УФ фарба", en: "Solvent/UV ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "10 min na powietrzu, natychmiast w tunelu (rozpuszczalnikowa); UV: 10-15 m/min", uk: "10 хв на повітрі, миттєво в тунелі (розчинникова); УФ: 10-15 м/хв", en: "10 min open air, instantly in tunnel (solvent); UV: 10-15 m/min" },
                    mesh: { pl: "P45-77 (rozpuszczalnikowa), P90-120 (UV)", uk: "P45-77 (розчинникова), P90-120 (УФ)", en: "P45-77 (solvent), P90-120 (UV)" },
                    cleaning: { pl: "ST 1000, CT 1000/1", uk: "ST 1000, CT 1000/1", en: "ST 1000, CT 1000/1" },
                    storage: { pl: "1-4 lata", uk: "1-4 роки", en: "1-4 years" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Gotowa do użycia; SB 2000/1", uk: "Готова до використання; SB 2000/1", en: "Ready to use; SB 2000/1" },
                    additives: {}
                }
            },
            {
                id: "TABLICOWA",
                name: { pl: "FARBA TABLICOWA (EC 100/168, UVPT 100/21)", uk: "ГРИФЕЛЬНА ФАРБА (EC 100/168, UVPT 100/21)", en: "CHALKBOARD INK (EC 100/168, UVPT 100/21)" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba do tworzenia powierzchni do pisania kredą. Na PCW, poliwęglan, polistyren, dibond, papier, karton, PP.",
                    uk: "Фарба для створення поверхні для письма крейдою. На ПВХ, полікарбонат, полістирол, dibond, папір, картон, ПП.",
                    en: "Ink for creating chalkboard surfaces. On PVC, polycarbonate, polystyrene, dibond, paper, cardboard, PP."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa/UV", uk: "Розчинникова/УФ фарба", en: "Solvent/UV ink" },
                    finish: { pl: "Mat", uk: "Матовий", en: "Matte" },
                    drying: { pl: "EC: 6 min; UV: 2 lampy 120W, 25 m/min", uk: "EC: 6 хв; УФ: 2 лампи 120 Вт, 25 м/хв", en: "EC: 6 min; UV: 2 lamps 120W, 25 m/min" },
                    mesh: { pl: "P77", uk: "P77", en: "P77" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "EC: nieograniczony; UV: 1-2 lata", uk: "EC: необмежений; УФ: 1-2 роки", en: "EC: unlimited; UV: 1-2 years" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "EC: EC 1000-8000; UV: UVPT 2000", uk: "EC: EC 1000-8000; УФ: UVPT 2000", en: "EC: EC 1000-8000; UV: UVPT 2000" },
                    additives: { pl: "AS 1000 (antystatyk), HEC (utwardzacz)", uk: "AS 1000 (антистатик), HEC (затверджувач)", en: "AS 1000 (antistatic), HEC (hardener)" }
                }
            },
            {
                id: "UV-BRIGHT",
                name: { pl: "UV-BRIGHT", uk: "UV-BRIGHT", en: "UV-BRIGHT" },
                category: "efekty specjalne",
                description: {
                    pl: "Dodatek do lakieru, widoczny tylko w świetle UV. Do zabezpieczania biletów, dokumentów.",
                    uk: "Добавка до лаку, видима тільки в УФ-світлі. Для захисту квитків, документів.",
                    en: "Additive for varnish, visible only under UV light. For securing tickets, documents."
                },
                properties: {
                    type: { pl: "Dodatek", uk: "Добавка", en: "Additive" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "–", uk: "–", en: "–" },
                    mesh: { pl: "P120", uk: "P120", en: "P120" },
                    cleaning: { pl: "–", uk: "–", en: "–" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Dodawać 5-10% do lakieru", uk: "Додавати 5-10% до лаку", en: "Add 5-10% to varnish" },
                    additives: {}
                }
            },
            {
                id: "SAND",
                name: { pl: "SAND EFFECT UV 150/11", uk: "ПІСОЧНИЙ ЕФЕКТ UV 150/11", en: "SAND EFFECT UV 150/11" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba UV imitująca piasek. Na papier, karton, PCW, matowy PP.",
                    uk: "УФ-фарба, що імітує пісок. На папір, картон, ПВХ, матовий ПП.",
                    en: "UV ink imitating sand. On paper, cardboard, PVC, matte PP."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "UV", uk: "УФ", en: "UV" },
                    mesh: { pl: "P45 (grube), P150 (drobne)", uk: "P45 (грубе), P150 (дрібне)", en: "P45 (coarse), P150 (fine)" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "RELIEF",
                name: { pl: "UV 150/8 RELIEF INK", uk: "UV 150/8 РЕЛЬЄФНА ФАРБА", en: "UV 150/8 RELIEF INK" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba UV do druku wypukłego, np. Braille. Na PCW, PP, papier, tektura.",
                    uk: "УФ-фарба для рельєфного друку, напр. Брайль. На ПВХ, ПП, папір, картон.",
                    en: "UV ink for relief printing, e.g., Braille. On PVC, PP, paper, cardboard."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "UV", uk: "УФ", en: "UV" },
                    mesh: { pl: "P45-P77", uk: "P45-P77", en: "P45-P77" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "BROKAT",
                name: { pl: "FARBA BROKATOWA", uk: "БЛИСКІТКОВА ФАРБА", en: "GLITTER INK" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba z brokatem, do kartek okolicznościowych. Seria UVILUX na karton.",
                    uk: "Фарба з блискітками, для святкових листівок. Серія UVILUX на картоні.",
                    en: "Glitter ink for greeting cards. UVILUX series on cardboard."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "Połysk", uk: "Блиск", en: "Gloss" },
                    drying: { pl: "UV: 1 lampa 80-100W, 20 m/min", uk: "УФ: 1 лампа 80-100 Вт, 20 м/хв", en: "UV: 1 lamp 80-100W, 20 m/min" },
                    mesh: { pl: "P15", uk: "P15", en: "P15" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "FOSFORYZUJĄCA",
                name: { pl: "FARBA FOSFORYZUJĄCA 138", uk: "ФОСФОРЕСЦЕНТНА ФАРБА 138", en: "PHOSPHORESCENT INK 138" },
                category: "efekty specjalne",
                description: {
                    pl: "Absorbuje światło w ciągu dnia, świeci w ciemności. Na białe, niechłonne podłoże.",
                    uk: "Поглинає світло вдень, світиться в темряві. На білу, невбирну основу.",
                    en: "Absorbs light during the day, glows in the dark. On white, non-absorbent substrate."
                },
                properties: {
                    type: { pl: "Farba (wodna/rozpuszczalnikowa/UV)", uk: "Фарба (водна/розчинникова/УФ)", en: "Ink (water/solvent/UV)" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Zależnie od serii", uk: "Залежно від серії", en: "Depends on series" },
                    mesh: { pl: "P45-P77", uk: "P45-P77", en: "P45-P77" },
                    cleaning: { pl: "Zależnie od serii", uk: "Залежно від серії", en: "Depends on series" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "ZABEZPIECZAJĄCA",
                name: { pl: "FARBA ZABEZPIECZAJĄCA", uk: "ЗАХИСНА ФАРБА", en: "SECURITY INK" },
                category: "efekty specjalne",
                description: {
                    pl: "Farby niewidoczne w świetle dziennym, widoczne tylko pod UV.",
                    uk: "Фарби, невидимі при денному світлі, видимі тільки під УФ.",
                    en: "Inks invisible in daylight, visible only under UV."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa/UV", uk: "Розчинникова/УФ фарба", en: "Solvent/UV ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Zależnie", uk: "Залежно", en: "Depends" },
                    mesh: { pl: "P77-P150", uk: "P77-P150", en: "P77-P150" },
                    cleaning: { pl: "–", uk: "–", en: "–" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "FILTER",
                name: { pl: "Seria EURECO EC FILTER COLOUR", uk: "Серія EURECO EC ФІЛЬТРУЮЧІ КОЛЬОРИ", en: "EURECO EC FILTER COLOUR series" },
                category: "efekty specjalne",
                description: {
                    pl: "Farby filtrujące do produkcji okularów przeciwsłonecznych, plansz do gry.",
                    uk: "Фільтруючі фарби для виробництва сонцезахисних окулярів, ігрових дощок.",
                    en: "Filter inks for manufacturing sunglasses, game boards."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Bardzo błyszczący", uk: "Дуже глянцевий", en: "Very glossy" },
                    drying: { pl: "6 min na powietrzu, natychmiast w tunelu", uk: "6 хв на повітрі, миттєво в тунелі", en: "6 min open air, instantly in tunnel" },
                    mesh: { pl: "P77-120", uk: "P77-120", en: "P77-120" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Dobra", uk: "Хороша", en: "Good" },
                    thinning: { pl: "EC 1000-8000, EC 1300/1301 dla fluo", uk: "EC 1000-8000, EC 1300/1301 для флуо", en: "EC 1000-8000, EC 1300/1301 for fluo" },
                    additives: { pl: "HEC SLOW (5%)", uk: "HEC SLOW (5%)", en: "HEC SLOW (5%)" }
                }
            },
            {
                id: "WHITE FLUO",
                name: { pl: "WHITE FLUO", uk: "БІЛА ФЛУО", en: "WHITE FLUO" },
                category: "efekty specjalne",
                description: {
                    pl: "Po wystawieniu na UV nabiera niebieskiego połysku. Na białe podłoże.",
                    uk: "Під УФ набуває блакитного блиску. На білу основу.",
                    en: "Turns blue gloss under UV. On white substrate."
                },
                properties: {
                    type: { pl: "Farba", uk: "Фарба", en: "Ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Zależnie", uk: "Залежно", en: "Depends" },
                    mesh: { pl: "P90, P45", uk: "P90, P45", en: "P90, P45" },
                    cleaning: { pl: "–", uk: "–", en: "–" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "SUBLIMACJA",
                name: { pl: "FARBA DO SUBLIMACJI CYFROWEJ DSI", uk: "ФАРБА ДЛЯ ЦИФРОВОЇ СУБЛІМАЦІЇ DSI", en: "DIGITAL SUBLIMATION INK DSI" },
                category: "efekty specjalne",
                description: {
                    pl: "Pigmenty do drukarek piezo-elektrycznych. Druk bezpośredni lub transferowy na tkaniny.",
                    uk: "Пігменти для п'єзоелектричних принтерів. Прямий або трансферний друк на тканині.",
                    en: "Pigments for piezo-electric printers. Direct or transfer printing on fabric."
                },
                properties: {
                    type: { pl: "Pigmenty", uk: "Пігменти", en: "Pigments" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Utwardzanie 210°C 30s", uk: "Затвердіння 210°C 30 с", en: "Curing 210°C 30s" },
                    mesh: { pl: "–", uk: "–", en: "–" },
                    cleaning: { pl: "–", uk: "–", en: "–" },
                    storage: { pl: "6 miesięcy (15-20°C)", uk: "6 місяців (15-20°C)", en: "6 months (15-20°C)" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "METALIC",
                name: { pl: "EFEKT METALICZNY", uk: "МЕТАЛІЧНИЙ ЕФЕКТ", en: "METALLIC EFFECT" },
                category: "efekty specjalne",
                description: {
                    pl: "Nadaje metaliczny połysk jak w lakierach samochodowych. Na niechłonne podłoże.",
                    uk: "Надає металевий блиск, як в автомобільних лаках. На невбирну основу.",
                    en: "Gives metallic gloss like car paints. On non-absorbent substrate."
                },
                properties: {
                    type: { pl: "Farba", uk: "Фарба", en: "Ink" },
                    finish: { pl: "Metaliczny", uk: "Металевий", en: "Metallic" },
                    drying: { pl: "Zależnie", uk: "Залежно", en: "Depends" },
                    mesh: { pl: "P150", uk: "P150", en: "P150" },
                    cleaning: { pl: "–", uk: "–", en: "–" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "WPV",
                name: { pl: "WPV INKS", uk: "WPV ФАРБИ", en: "WPV INKS" },
                category: "efekty specjalne",
                description: {
                    pl: "Farba wodna do tworzenia krążków farbowych do kolorowanek dla dzieci. Na gruby papier wodoodporny.",
                    uk: "Водна фарба для створення фарбових кружечків для дитячих розмальовок. На товстий водостійкий папір.",
                    en: "Water-based ink for creating color circles in children's coloring books. On thick waterproof paper."
                },
                properties: {
                    type: { pl: "Farba wodna", uk: "Водна фарба", en: "Water-based ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "Na powietrzu lub tunelu", uk: "На повітрі або в тунелі", en: "Open air or tunnel" },
                    mesh: { pl: "P21", uk: "P21", en: "P21" },
                    cleaning: { pl: "Woda, Aquaclean", uk: "Вода, Aquaclean", en: "Water, Aquaclean" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "Do 10% wody", uk: "До 10% води", en: "Up to 10% water" },
                    additives: {}
                }
            },
            {
                id: "SOFT TOUCH",
                name: { pl: "LAKIER SOFT TOUCH SP 150/7", uk: "ЛАК М'ЯКИЙ НА ДОТИК SP 150/7", en: "SOFT TOUCH VARNISH SP 150/7" },
                category: "efekty specjalne",
                description: {
                    pl: "Lakier rozpuszczalnikowy do matowego papieru, nadaje miękkie uczucie.",
                    uk: "Розчинниковий лак для матового паперу, надає м'якого відчуття.",
                    en: "Solvent-based varnish for matte paper, gives soft feel."
                },
                properties: {
                    type: { pl: "Lakier", uk: "Лак", en: "Varnish" },
                    finish: { pl: "Miękki", uk: "М'який", en: "Soft" },
                    drying: { pl: "Na powietrzu lub tunelu", uk: "На повітрі або в тунелі", en: "Open air or tunnel" },
                    mesh: { pl: "P77", uk: "P77", en: "P77" },
                    cleaning: { pl: "CT 1000/1, ST 1000", uk: "CT 1000/1, ST 1000", en: "CT 1000/1, ST 1000" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },
            {
                id: "FRONT PANEL",
                name: { pl: "FRONT PANEL PRINT PLUV 150/8", uk: "ДРУК ПЕРЕДНЬОЇ ПАНЕЛІ PLUV 150/8", en: "FRONT PANEL PRINT PLUV 150/8" },
                category: "efekty specjalne",
                description: {
                    pl: "Do wyświetlaczy maszyn, daje strukturę jak priplack i poliwęglan.",
                    uk: "Для дисплеїв машин, дає структуру як priplack та полікарбонат.",
                    en: "For machine displays, gives structure like priplack and polycarbonate."
                },
                properties: {
                    type: { pl: "Farba UV", uk: "УФ-фарба", en: "UV ink" },
                    finish: { pl: "–", uk: "–", en: "–" },
                    drying: { pl: "UV", uk: "УФ", en: "UV" },
                    mesh: { pl: "P120", uk: "P120", en: "P120" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "–", uk: "–", en: "–" },
                    thinning: { pl: "–", uk: "–", en: "–" },
                    additives: {}
                }
            },

            // TAMPODRUK
            {
                id: "TA",
                name: { pl: "TAMPOPRINT TA", uk: "TAMPOPRINT TA", en: "TAMPOPRINT TA" },
                category: "tampodruk",
                description: {
                    pl: "Farba rozpuszczalnikowa do tampodruku na PCW, poliwęglanie, styropianie, papierze, tekturze, drewnie, ABS, plexi. Z utwardzaczem na PP, PE, metale.",
                    uk: "Розчинникова фарба для тамподруку на ПВХ, полікарбонаті, пінополістиролі, папері, картоні, дереві, ABS, оргсклі. З затверджувачем на ПП, ПЕ, метали.",
                    en: "Solvent-based ink for pad printing on PVC, polycarbonate, styrofoam, paper, cardboard, wood, ABS, plexiglass. With hardener on PP, PE, metals."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Satyna", uk: "Сатиновий", en: "Satin" },
                    drying: { pl: "1-2 min na powietrzu, 10s wygrzewanie", uk: "1-2 хв на повітрі, 10 с прогрів", en: "1-2 min open air, 10s heating" },
                    mesh: { pl: "–", uk: "–", en: "–" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "–", uk: "–", en: "–" },
                    resistance: { pl: "Dobra; z utwardzaczem wysoka", uk: "Хороша; з затверджувачем висока", en: "Good; with hardener high" },
                    thinning: { pl: "TA 1000 (szybki 10-20%), TA 3000 (wolny 5-10%), TA 5000 (super wolny max 10%)", uk: "TA 1000 (швидкий 10-20%), TA 3000 (повільний 5-10%), TA 5000 (суперповільний макс 10%)", en: "TA 1000 (fast 10-20%), TA 3000 (slow 5-10%), TA 5000 (super slow max 10%)" },
                    additives: { pl: "HTA, HTA EXTRA SLOW (utwardzacze 5%)", uk: "HTA, HTA EXTRA SLOW (затверджувачі 5%)", en: "HTA, HTA EXTRA SLOW (hardeners 5%)" }
                }
            },

            // FARBA DO NAKŁADANIA WAŁKIEM
            {
                id: "ECVF",
                name: { pl: "VEHICLE ECVF", uk: "VEHICLE ECVF", en: "VEHICLE ECVF" },
                category: "wałek",
                description: {
                    pl: "Elastyczna farba do PCW banerów, brezentów i plandek samochodowych. Do sitodruku i nakładania wałkiem.",
                    uk: "Еластична фарба для ПВХ банерів, брезенту та автомобільних тентів. Для трафаретного друку та нанесення валиком.",
                    en: "Flexible ink for PVC banners, tarpaulins and vehicle covers. For screen printing and roller coating."
                },
                properties: {
                    type: { pl: "Farba rozpuszczalnikowa", uk: "Розчинникова фарба", en: "Solvent-based ink" },
                    finish: { pl: "Błysk", uk: "Блиск", en: "Gloss" },
                    drying: { pl: "20°C: wałek 1-2h, sitodruk P45 15 min", uk: "20°C: валик 1-2 год, трафаретний друк P45 15 хв", en: "20°C: roller 1-2h, screen P45 15 min" },
                    mesh: { pl: "P45 (sitodruk)", uk: "P45 (трафарет)", en: "P45 (screen)" },
                    cleaning: { pl: "CT 1000/1", uk: "CT 1000/1", en: "CT 1000/1" },
                    storage: { pl: "Nieograniczony", uk: "Необмежений", en: "Unlimited" },
                    resistance: { pl: "Doskonała (oprócz fluo)", uk: "Відмінна (крім флуо)", en: "Excellent (except fluo)" },
                    thinning: { pl: "ECV 1000: 5% (sitodruk), 30% (wałek)", uk: "ECV 1000: 5% (трафарет), 30% (валик)", en: "ECV 1000: 5% (screen), 30% (roller)" },
                    additives: {}
                }
            },

            // DODATKI (bazy, proszki, itp.) – wiele z nich jest w osobnych plikach, ale ujęte w series powyżej jako produkty dodatkowe.
            // Dla uproszczenia nie tworzymy osobnych serii dla każdej bazy; będą one w paints jako osobne produkty z odpowiednim series (np. SPTN150/17 ma series SPTN).
        ];

        // ---------- BAZOWE KOLORY (do tłumaczeń) ----------
        const baseColors = [
            { code: "10", name: { uk: "Фіолетовий", pl: "Fioletowy", en: "Violet" }, color: "#800080" },
            { code: "15", name: { uk: "Прозорий фіолетовий", pl: "Transparent fioletowy", en: "Transparent Violet" }, color: "#E0B0FF" },
            { code: "20", name: { uk: "Синій", pl: "Niebieski", en: "Blue" }, color: "#0000FF" },
            { code: "20/B", name: { uk: "Reflex Blue", pl: "Reflex Blue", en: "Reflex Blue" }, color: "#1E90FF" },
            { code: "22", name: { uk: "Ультрамарин", pl: "Ultramaryna", en: "Ultramarine" }, color: "#4169E1" },
            { code: "23", name: { uk: "Ультрамарин база", pl: "Ultramaryna baza", en: "Ultramarine base" }, color: "#4B0082" },
            { code: "24", name: { uk: "Блакитний", pl: "Niebieski jasny", en: "Light Blue" }, color: "#87CEEB" },
            { code: "25", name: { uk: "Прозорий синій", pl: "Transparent niebieski", en: "Transparent Blue" }, color: "#A0C8F0" },
            { code: "26", name: { uk: "Світло-синій", pl: "Jasnoniebieski", en: "Light Blue" }, color: "#ADD8E6" },
            { code: "27", name: { uk: "Бірюзовий", pl: "Turkusowy", en: "Turquoise" }, color: "#40E0D0" },
            { code: "30", name: { uk: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" }, color: "#006400" },
            { code: "31", name: { uk: "Зелений", pl: "Zielony", en: "Green" }, color: "#008000" },
            { code: "32", name: { uk: "Яскраво-зелений", pl: "Jasnozielony", en: "Bright Green" }, color: "#00FF00" },
            { code: "33", name: { uk: "Зелений трава", pl: "Zielony trawa", en: "Grass Green" }, color: "#7CFC00" },
            { code: "35", name: { uk: "Прозорий зелений", pl: "Transparent zielony", en: "Transparent Green" }, color: "#A0D6B4" },
            { code: "40", name: { uk: "Жовтий", pl: "Żółty", en: "Yellow" }, color: "#FFFF00" },
            { code: "41", name: { uk: "Цитриновий", pl: "Cytrynowy", en: "Lemon Yellow" }, color: "#FFFACD" },
            { code: "42", name: { uk: "Темно-жовтий", pl: "Ciemnożółty", en: "Dark Yellow" }, color: "#F0E68C" },
            { code: "50", name: { uk: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" }, color: "#FFA500" },
            { code: "51", name: { uk: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange" }, color: "#FFB347" },
            { code: "55", name: { uk: "Прозорий оранжевий", pl: "Transparent pomarańczowy", en: "Transparent Orange" }, color: "#FFDAB9" },
            { code: "56", name: { uk: "Червоний", pl: "Czerwony", en: "Red" }, color: "#FF0000" },
            { code: "60", name: { uk: "Темно-червоний", pl: "Ciemnoczerwony", en: "Dark Red" }, color: "#8B0000" },
            { code: "61", name: { uk: "Малиновий", pl: "Karminowy", en: "Carmine" }, color: "#DC143C" },
            { code: "65", name: { uk: "Прозорий червоний", pl: "Transparent czerwony", en: "Transparent Red" }, color: "#FFB6C1" },
            { code: "70", name: { uk: "Магента", pl: "Magenta", en: "Magenta" }, color: "#FF00FF" },
            { code: "75", name: { uk: "Прозорий рожевий", pl: "Transparent różowy", en: "Transparent Pink" }, color: "#FFC0CB" },
            { code: "80", name: { uk: "Коричневий", pl: "Brązowy", en: "Brown" }, color: "#A52A2A" },
            { code: "81", name: { uk: "Темно-коричневий", pl: "Ciemnobrązowy", en: "Dark Brown" }, color: "#8B4513" },
            { code: "82", name: { uk: "Бежевий", pl: "Beżowy", en: "Beige" }, color: "#F5F5DC" },
            { code: "90", name: { uk: "Білий", pl: "Biały", en: "White" }, color: "#FFFFFF" },
            { code: "91", name: { uk: "Білий криючий", pl: "Biały kryjący", en: "Opaque White" }, color: "#F8F8FF" },
            { code: "100", name: { uk: "Чорний", pl: "Czarny", en: "Black" }, color: "#000000" },
            { code: "110", name: { uk: "Срібло", pl: "Srebro", en: "Silver" }, color: "#C0C0C0" },
            { code: "120", name: { uk: "Золото", pl: "Złoto", en: "Gold" }, color: "#FFD700" },
            { code: "130", name: { uk: "Флуо жовтий", pl: "Fluo żółty", en: "Fluo Yellow" }, color: "#FFFF00" },
            { code: "131", name: { uk: "Флуо оранж", pl: "Fluo pomarańcz", en: "Fluo Orange" }, color: "#FF8C00" },
            { code: "132", name: { uk: "Флуо червоний", pl: "Fluo czerwony", en: "Fluo Red" }, color: "#FF4500" },
            { code: "133", name: { uk: "Флуо рожевий", pl: "Fluo różowy", en: "Fluo Pink" }, color: "#FF69B4" },
            { code: "134", name: { uk: "Флуо зелений", pl: "Fluo zielony", en: "Fluo Green" }, color: "#00FF00" },
            { code: "135", name: { uk: "Флуо синій", pl: "Fluo niebieski", en: "Fluo Blue" }, color: "#0000FF" },
            { code: "136", name: { uk: "Флуо блакитний", pl: "Fluo jasnoniebieski", en: "Fluo Light Blue" }, color: "#87CEEB" },
            { code: "140", name: { uk: "Жовтий тріада", pl: "Żółta triada", en: "Process Yellow" }, color: "#FFFF00" },
            { code: "141", name: { uk: "Cyan тріада", pl: "Cyan triada", en: "Process Cyan" }, color: "#00FFFF" },
            { code: "142", name: { uk: "Magenta тріада", pl: "Magenta triada", en: "Process Magenta" }, color: "#FF00FF" },
            { code: "143", name: { uk: "Чорний тріада", pl: "Czarna triada", en: "Process Black" }, color: "#000000" },
            { code: "150", name: { uk: "Прозора база", pl: "Baza transparentna", en: "Transparent base" }, color: "#FFFFFF" },
            { code: "160", name: { uk: "Паста для растрового друку", pl: "Pasta do wydruków rastrowych", en: "Halftone paste" }, color: "#FFFFFF" },
            { code: "170", name: { uk: "Сповільнювач у гелі", pl: "Opóźniacz w żelu", en: "Gel retarder" }, color: "#FFFFFF" },
            { code: "1702", name: { uk: "Суперповільний сповільнювач", pl: "Opóźniacz superwolny", en: "Super slow retarder" }, color: "#FFFFFF" },
            // додаткові коди для спеціальних продуктів
        ];

        // ---------- ФАРБИ З EXCEL (рядки) ----------
        // Тут ми вручну перераховуємо всі продукти з наданого Excel-файлу.
        // Оскільки їх багато, для компактності створимо масив об'єктів з полями name (pl), code (KOD), fullCode (KOD) та series.
        // Потім згенеруємо paints, додаючи переклади.
        const excelRows = [
            { name: "SP23 FARBA SICO SICOPRINT ULTRAMARYNA", code: "SP23", fullCode: "SP23" },
            { name: "SXP COOL GRAY 11 FARBA SICO SICOTEX 1L", code: "SFWT/SXP-COOL-GRAY-11-SICOTEX/SIC/1", fullCode: "SFWT/SXP-COOL-GRAY-11-SICOTEX/SIC/1" },
            { name: "SX90 FARBA SICO SICOTEX BIAŁA 1L", code: "SFWT/SX90-SICOTEX/SIC/1", fullCode: "SFWT/SX90-SICOTEX/SIC/1" },
            { name: "SX82 FARBA SICO SICOTEX BEŻOWA 1L", code: "SFWT/SX82-SICOTEX/SIC/1", fullCode: "SFWT/SX82-SICOTEX/SIC/1" },
            { name: "SX81 FARBA SICO SICOTEX BRĄZOWA 1L", code: "SFWT/SX81-SICOTEX/SIC/1", fullCode: "SFWT/SX81-SICOTEX/SIC/1" },
            { name: "SX80 FARBA SICO SICOTEX JASNOBRĄZOWA 1L", code: "SFWT/SX80-SICOTEX/SIC/1", fullCode: "SFWT/SX80-SICOTEX/SIC/1" },
            { name: "SX75 FARBA SICO SICOTEX MAGENTA BAZA 1L", code: "SFWT/SX75-SICOTEX/SIC/1", fullCode: "SFWT/SX75-SICOTEX/SIC/1" },
            { name: "SX70 FARBA SICO SICOTEX MAGENTA 1L", code: "SFWT/SX70-SICOTEX/SIC/1", fullCode: "SFWT/SX70-SICOTEX/SIC/1" },
            { name: "SX70/21 FARBA SICO SICOTEX RUBINE RED 1L", code: "SFWT/SX70-21-SICOTEX/SIC/1", fullCode: "SFWT/SX70-21-SICOTEX/SIC/1" },
            { name: "SX65 FARBA SICO SICOTEX CZERWONA BAZA 1L", code: "SFWT/SX65-SICOTEX/SIC/1", fullCode: "SFWT/SX65-SICOTEX/SIC/1" },
            { name: "SX61 FARBA SICO SICOTEX CIEMNOCZERWONA 1L", code: "SFWT/SX61-SICOTEX/SIC/1", fullCode: "SFWT/SX61-SICOTEX/SIC/1" },
            { name: "SX60 FARBA SICO SICOTEX CZERWONA 1L", code: "SFWT/SX60-SICOTEX/SIC/1", fullCode: "SFWT/SX60-SICOTEX/SIC/1" },
            { name: "SX56 FARBA SICO SICOTEX JASNOCZERWONA 1L", code: "SFWT/SX56-SICOTEX/SIC/1", fullCode: "SFWT/SX56-SICOTEX/SIC/1" },
            { name: "SX56/2 FARBA SICO SICOTEX CZERWONA 1L", code: "SFWT/SX56-2-SICOTEX/SIC/1", fullCode: "SFWT/SX56-2-SICOTEX/SIC/1" },
            { name: "SX55 FARBA SICO SICOTEX POMARAŃCZOWA BAZA 1L", code: "SFWT/SX55-SICOTEX/SIC/1", fullCode: "SFWT/SX55-SICOTEX/SIC/1" },
            { name: "SX51 FARBA SICO SICOTEX POMARAŃCZOWA 1L", code: "SFWT/SX51-SICOTEX/SIC/1", fullCode: "SFWT/SX51-SICOTEX/SIC/1" },
            { name: "SX50 FARBA SICO SICOTEX JASNOPOMARAŃCZOWA 1L", code: "SFWT/SX50-SICOTEX/SIC/1", fullCode: "SFWT/SX50-SICOTEX/SIC/1" },
            { name: "SX42 FARBA SICO SICOTEX CIEMNOŻÓŁTA 1L", code: "SFWT/SX42-SICOTEX/SIC/1", fullCode: "SFWT/SX42-SICOTEX/SIC/1" },
            { name: "SX41 FARBA SICO SICOTEX ŻÓŁTA 1L", code: "SFWT/SX41-SICOTEX/SIC/1", fullCode: "SFWT/SX41-SICOTEX/SIC/1" },
            { name: "SX40 FARBA SICO SICOTEX CYTRYNOWA 1L", code: "SFWT/SX40-SICOTEX/SIC/1", fullCode: "SFWT/SX40-SICOTEX/SIC/1" },
            { name: "SX35 FARBA SICO SICOTEX ZIELONA BAZA 1L", code: "SFWT/SX35-SICOTEX/SIC/1", fullCode: "SFWT/SX35-SICOTEX/SIC/1" },
            { name: "SX33 FARBA SICO SICOTEX ZIELONA 1L", code: "SFWT/SX33-SICOTEX/SIC/1", fullCode: "SFWT/SX33-SICOTEX/SIC/1" },
            { name: "SX32 FARBA SICO SICOTEX JASNOZIELONA 1L", code: "SFWT/SX32-SICOTEX/SIC/1", fullCode: "SFWT/SX32-SICOTEX/SIC/1" },
            { name: "SX31 FARBA SICO SICOTEX ZIELONA 1L", code: "SFWT/SX31-SICOTEX/SIC/1", fullCode: "SFWT/SX31-SICOTEX/SIC/1" },
            { name: "SX30 FARBA SICO SICOTEX CIEMNOZIELONA 1L", code: "SFWT/SX30-SICOTEX/SIC/1", fullCode: "SFWT/SX30-SICOTEX/SIC/1" },
            { name: "SX27 FARBA SICO SICOTEX TURKUSOWA 1L", code: "SFWT/SX27-SICOTEX/SIC/1", fullCode: "SFWT/SX27-SICOTEX/SIC/1" },
            { name: "SX26 FARBA SICO SICOTEX JASNONIEBIESKA 1L", code: "SFWT/SX26-SICOTEX/SIC/1", fullCode: "SFWT/SX26-SICOTEX/SIC/1" },
            { name: "SX26/19 FARBA SICO SICOTEX PROCESS BLUE 1L", code: "SFWT/SX26-19-SICOTEX/SIC/1", fullCode: "SFWT/SX26-19-SICOTEX/SIC/1" },
            { name: "SX25 FARBA SICO SICOTEX NIEBIESKA BAZA 1L", code: "SFWT/SX25-SICOTEX/SIC/1", fullCode: "SFWT/SX25-SICOTEX/SIC/1" },
            { name: "SX24 FARBA SICO SICOTEX NIEBIESKA 1L", code: "SFWT/SX24-SICOTEX/SIC/1", fullCode: "SFWT/SX24-SICOTEX/SIC/1" },
            { name: "SX23 FARBA SICO SICOTEX ULTRAMARYNA BAZA 1L", code: "SFWT/SX23-SICOTEX/SIC/1", fullCode: "SFWT/SX23-SICOTEX/SIC/1" },
            { name: "SX22 FARBA SICO SICOTEX ULTRAMARYNA 1L", code: "SFWT/SX22-SICOTEX/SIC/1", fullCode: "SFWT/SX22-SICOTEX/SIC/1" },
            { name: "SX20 FARBA SICO SICOTEX GRANATOWA 1L", code: "SFWT/SX20-SICOTEX/SIC/1", fullCode: "SFWT/SX20-SICOTEX/SIC/1" },
            { name: "SX20/64 FARBA SICO SICOTEX GRANATOWA 072C 1L", code: "SFWT/SX20-64-SICOTEX/SIC/1", fullCode: "SFWT/SX20-64-SICOTEX/SIC/1" },
            { name: "SX20/14 FARBA SICO SICOTEX REFLEX BLUE 1L", code: "SFWT/SX20-14-SICOTEX/SIC/1", fullCode: "SFWT/SX20-14-SICOTEX/SIC/1" },
            { name: "SX15 FARBA SICO SICOTEX FIOLETOWA BAZA 1L", code: "SFWT/SX15-SICOTEX/SIC/1", fullCode: "SFWT/SX15-SICOTEX/SIC/1" },
            { name: "SX143 FARBA SICO SICOTEX CZARNA TRIADA 1L", code: "SFWT/SX143-SICOTEX/SIC/1", fullCode: "SFWT/SX143-SICOTEX/SIC/1" },
            { name: "SX142 FARBA SICO SICOTEX MAGENTA TRIADA 1L", code: "SFWT/SX142-SICOTEX/SIC/1", fullCode: "SFWT/SX142-SICOTEX/SIC/1" },
            { name: "SX141 FARBA SICO SICOTEX NIEBIESKA TRIADA 1L", code: "SFWT/SX141-SICOTEX/SIC/1", fullCode: "SFWT/SX141-SICOTEX/SIC/1" },
            { name: "SX140 FARBA SICO SICOTEX ŻÓŁTA TRIADA 1L", code: "SFWT/SX140-SICOTEX/SIC/1", fullCode: "SFWT/SX140-SICOTEX/SIC/1" },
            { name: "SX136 FARBA SICO SICOTEX NIEBIESKA FLUO 1L", code: "SFWT/SX136-SICOTEX/SIC/1", fullCode: "SFWT/SX136-SICOTEX/SIC/1" },
            { name: "SX135 FARBA SICO SICOTEX ZIELONA FLUO 1L", code: "SFWT/SX135-SICOTEX/SIC/1", fullCode: "SFWT/SX135-SICOTEX/SIC/1" },
            { name: "SX134 FARBA SICO SICOTEX MAGENTA FLUO 1L", code: "SFWT/SX134-SICOTEX/SIC/1", fullCode: "SFWT/SX134-SICOTEX/SIC/1" },
            { name: "SX133 FARBA SICO SICOTEX CZERWONA FLUO 1L", code: "SFWT/SX133-SICOTEX/SIC/1", fullCode: "SFWT/SX133-SICOTEX/SIC/1" },
            { name: "SX132 FARBA SICO SICOTEX CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFWT/SX132-SICOTEX/SIC/1", fullCode: "SFWT/SX132-SICOTEX/SIC/1" },
            { name: "SX131 FARBA SICO SICOTEX JASNOPOMARAŃCZOWA FLUO 1L", code: "SFWT/SX131-SICOTEX/SIC/1", fullCode: "SFWT/SX131-SICOTEX/SIC/1" },
            { name: "SX130 FARBA SICO SICOTEX ŻÓŁTA FLUO 1L", code: "SFWT/SX130-SICOTEX/SIC/1", fullCode: "SFWT/SX130-SICOTEX/SIC/1" },
            { name: "SX10 FARBA SICO SICOTEX FIOLETOWA 1L", code: "SFWT/SX10-SICOTEX/SIC/1", fullCode: "SFWT/SX10-SICOTEX/SIC/1" },
            { name: "SX100 FARBA SICO SICOTEX CZARNA 1L", code: "SFWT/SX100-SICOTEX/SIC/1", fullCode: "SFWT/SX100-SICOTEX/SIC/1" },
            { name: "SI91 FARBA SICO SILICONE WHITE OPAQUE 1L", code: "SFWT/SI91-SILICONE/SIC/1", fullCode: "SFWT/SI91-SILICONE/SIC/1" },
            { name: "SI82 FARBA SICO SILICONE BEŻOWA 1L", code: "SFWT/SI82-SILICONE/SIC/1", fullCode: "SFWT/SI82-SILICONE/SIC/1" },
            { name: "SI81 FARBA SICO SILICONE BRĄZOWA 1L", code: "SFWT/SI81-SILICONE/SIC/1", fullCode: "SFWT/SI81-SILICONE/SIC/1" },
            { name: "SI80 FARBA SICO SILICONE JASNOBRĄZOWA 1L", code: "SFWT/SI80-SILICONE/SIC/1", fullCode: "SFWT/SI80-SILICONE/SIC/1" },
            { name: "SI75 FARBA SICO SILICONE MAGENTA 1L", code: "SFWT/SI75-SILICONE/SIC/1", fullCode: "SFWT/SI75-SILICONE/SIC/1" },
            { name: "SI70 FARBA SICO SILICONE MAGENTA 1L", code: "SFWT/SI70-SILICONE/SIC/1", fullCode: "SFWT/SI70-SILICONE/SIC/1" },
            { name: "SI61 FARBA SICO SILICONE CIEMNOCZERWONA 1L", code: "SFWT/SI61-SILICONE/SIC/1", fullCode: "SFWT/SI61-SILICONE/SIC/1" },
            { name: "SI60 FARBA SICO SILICONE CZERWONA 1L", code: "SFWT/SI60-SILICONE/SIC/1", fullCode: "SFWT/SI60-SILICONE/SIC/1" },
            { name: "SI56 FARBA SICO SILICONE JASNOCZERWONA 1L", code: "SFWT/SI56-SILICONE/SIC/1", fullCode: "SFWT/SI56-SILICONE/SIC/1" },
            { name: "SI56/4 FARBA SICO SILICONE WARM RED 1L", code: "SFWT/SI56-4-SILICONE/SIC/1", fullCode: "SFWT/SI56-4-SILICONE/SIC/1" },
            { name: "SI51 FARBA SICO SILICONE POMARAŃCZOWA 1L", code: "SFWT/SI51-SILICONE/SIC/1", fullCode: "SFWT/SI51-SILICONE/SIC/1" },
            { name: "SI50 FARBA SICO SILICONE JASNOPOMARAŃCZOWA 1L", code: "SFWT/SI50-SILICONE/SIC/1", fullCode: "SFWT/SI50-SILICONE/SIC/1" },
            { name: "SI42 FARBA SICO SILICONE CIEMNOŻÓŁTA 1L", code: "SFWT/SI42-SILICONE/SIC/1", fullCode: "SFWT/SI42-SILICONE/SIC/1" },
            { name: "SI41 FARBA SICO SILICONE ŻÓŁTA 1L", code: "SFWT/SI41-SILICONE/SIC/1", fullCode: "SFWT/SI41-SILICONE/SIC/1" },
            { name: "SI40 FARBA SICO SILICONE CYTRYNOWA 1L", code: "SFWT/SI40-SILICONE/SIC/1", fullCode: "SFWT/SI40-SILICONE/SIC/1" },
            { name: "SI33 FARBA SICO SILICONE ZIELONA 1L", code: "SFWT/SI33-SILICONE/SIC/1", fullCode: "SFWT/SI33-SILICONE/SIC/1" },
            { name: "SI32 FARBA SICO SILICONE JASNOZIELONA 1L", code: "SFWT/SI32-SILICONE/SIC/1", fullCode: "SFWT/SI32-SILICONE/SIC/1" },
            { name: "SI31 FARBA SICO SILICONE ZIELONA 1L", code: "SFWT/SI31-SILICONE/SIC/1", fullCode: "SFWT/SI31-SILICONE/SIC/1" },
            { name: "SI30 FARBA SICO SILICONE CIEMNOZIELONA 1L", code: "SFWT/SI30-SILICONE/SIC/1", fullCode: "SFWT/SI30-SILICONE/SIC/1" },
            { name: "SI27 FARBA SICO SILICONE TURKUSOWA 1L", code: "SFWT/SI27-SILICONE/SIC/1", fullCode: "SFWT/SI27-SILICONE/SIC/1" },
            { name: "SI26 FARBA SICO SILICONE JASNONIEBIESKA 1L", code: "SFWT/SI26-SILICONE/SIC/1", fullCode: "SFWT/SI26-SILICONE/SIC/1" },
            { name: "SI24 FARBA SICO SILICONE NIEBIESKA 1L", code: "SFWT/SI24-SILICONE/SIC/1", fullCode: "SFWT/SI24-SILICONE/SIC/1" },
            { name: "SI22 FARBA SICO SILICONE ULTRAMARYNA 1L", code: "SFWT/SI22-SILICONE/SIC/1", fullCode: "SFWT/SI22-SILICONE/SIC/1" },
            { name: "SI20 FARBA SICO SILICONE GRANATOWA 1L", code: "SFWT/SI20-SILICONE/SIC/1", fullCode: "SFWT/SI20-SILICONE/SIC/1" },
            { name: "SI120 FARBA SICO SILICONE ZŁOTA 1L", code: "SFWT/SI120-SILICONE/SIC/1", fullCode: "SFWT/SI120-SILICONE/SIC/1" },
            { name: "SI10 FARBA SICO SILICONE FIOLETOWA 1L", code: "SFWT/SI10-SILICONE/SIC/1", fullCode: "SFWT/SI10-SILICONE/SIC/1" },
            { name: "SI100 FARBA SICO SILICONE CZARNA 1L", code: "SFWT/SI100-SILICONE/SIC/1", fullCode: "SFWT/SI100-SILICONE/SIC/1" },
            { name: "S20 WHITE FARBA BIAŁA WODNA 1KG", code: "SFWT/S20-WHITE/RAS/1", fullCode: "SFWT/S20-WHITE/RAS/1" },
            { name: "OTF91 FARBA SICO OPATEX BIAŁA KRYJĄCA 1L", code: "SFWT/OTF91-OPATEX/SIC/1", fullCode: "SFWT/OTF91-OPATEX/SIC/1" },
            { name: "OTF91/37 FARBA SICO OPATEX DIGITAL BACKING BIAŁA 1KG", code: "SFWT/OTF91-37-OPATEX/SIC/5", fullCode: "SFWT/OTF91-37-OPATEX/SIC/5" },
            { name: "OTF91/37 BIAŁY PODKŁAD CYFROWY 1L", code: "SFWT/OTF91-37-OPATEX/SIC/1", fullCode: "SFWT/OTF91-37-OPATEX/SIC/1" },
            { name: "OTF81 FARBA SICO OPATEX BRĄZOWA 1KG", code: "SFWT/OTF81-OPATEX/SIC/1", fullCode: "SFWT/OTF81-OPATEX/SIC/1" },
            { name: "OTF80 FARBA SICO OPATEX JASNOBRĄZOWA 1KG", code: "SFWT/OTF80-OPATEX/SIC/1", fullCode: "SFWT/OTF80-OPATEX/SIC/1" },
            { name: "OTF75 FARBA SICO OPATEX MAGENTA 1L", code: "SFWT/OTF75-OPATEX/SIC/1", fullCode: "SFWT/OTF75-OPATEX/SIC/1" },
            { name: "OTF70 FARBA SICO OPATEX MAGENTA 1KG", code: "SFWT/OTF70-OPATEX/SIC/1", fullCode: "SFWT/OTF70-OPATEX/SIC/1" },
            { name: "OTF70/56 FARBA SICO OPATEX RUBINE RED C OPAQUE 1KG", code: "SFWT/OTF70-56-OPATEX/SIC/1", fullCode: "SFWT/OTF70-56-OPATEX/SIC/1" },
            { name: "OTF65 FARBA SICO OPATEX CZERWONA 1KG", code: "SFWT/OTF65-OPATEX/SIC/1", fullCode: "SFWT/OTF65-OPATEX/SIC/1" },
            { name: "OTF61 FARBA SICO OPATEX CZERWONA 1L", code: "SFWT/OTF61-OPATEX/SIC/1", fullCode: "SFWT/OTF61-OPATEX/SIC/1" },
            { name: "OTF60 FARBA SICO OPATEX CZERWONA 1L", code: "SFWT/OTF60-OPATEX/SIC/1", fullCode: "SFWT/OTF60-OPATEX/SIC/1" },
            { name: "OTF56 FARBA SICO OPATEX JASNOCZERWONA 1KG", code: "SFWT/OTF56-OPATEX/SIC/1", fullCode: "SFWT/OTF56-OPATEX/SIC/1" },
            { name: "OTF56/7 FARBA SICO OPATEX 032C OPAQUE 1KG", code: "SFWT/OTF56-7-OPATEX/SIC/1", fullCode: "SFWT/OTF56-7-OPATEX/SIC/1" },
            { name: "OTF55 FARBA SICO OPATEX POMARAŃCZOWA 1KG", code: "SFWT/OTF55-OPATEX/SIC/1", fullCode: "SFWT/OTF55-OPATEX/SIC/1" },
            { name: "OTF51 FARBA SICO OPATEX POMARAŃCZOWA 1KG", code: "SFWT/OTF51-OPATEX/SIC/1", fullCode: "SFWT/OTF51-OPATEX/SIC/1" },
            { name: "OTF50 FARBA SICO OPATEX POMARAŃCZOWA 1KG", code: "SFWT/OTF50-OPATEX/SIC/1", fullCode: "SFWT/OTF50-OPATEX/SIC/1" },
            { name: "OTF42 FARBA SICO OPATEX CIEMNOŻÓŁTA 1KG", code: "SFWT/OTF42-OPATEX/SIC/1", fullCode: "SFWT/OTF42-OPATEX/SIC/1" },
            { name: "OTF41 FARBA SICO OPATEX ŻÓŁTA", code: "SFWT/OTF41-OPATEX/SIC/1", fullCode: "SFWT/OTF41-OPATEX/SIC/1" },
            { name: "OTF40 FARBA SICO OPATEX CYTRYNOWA 1L", code: "SFWT/OTF40-OPATEX/SIC/1", fullCode: "SFWT/OTF40-OPATEX/SIC/1" },
            { name: "OTF33 FARBA SICO OPATEX ZIELONA 1KG", code: "SFWT/OTF33-OPATEX/SIC/1", fullCode: "SFWT/OTF33-OPATEX/SIC/1" },
            { name: "OTF32 FARBA SICO OPATEX JASNOZIELONA", code: "SFWT/OTF32-OPATEX/SIC/1", fullCode: "SFWT/OTF32-OPATEX/SIC/1" },
            { name: "OTF31 FARBA SICO OPATEX ZIELONA", code: "SFWT/OTF31-OPATEX/SIC/1", fullCode: "SFWT/OTF31-OPATEX/SIC/1" },
            { name: "OTF30 FARBA SICO OPATEX CIEMNOZIELONA", code: "SFWT/OTF30-OPATEX/SIC/1", fullCode: "SFWT/OTF30-OPATEX/SIC/1" },
            { name: "OTF27 FARBA SICO OPATEX TURKUSOWA 1KG", code: "SFWT/OTF27-OPATEX/SIC/1", fullCode: "SFWT/OTF27-OPATEX/SIC/1" },
            { name: "OTF26 FARBA SICO OPATEX JASNONIEBIESKA", code: "SFWT/OTF26-OPATEX/SIC/1", fullCode: "SFWT/OTF26-OPATEX/SIC/1" },
            { name: "OTF25 FARBA SICO OPATEX NIEBIESKA BAZA 1KG", code: "SFWT/OTF25-OPATEX/SIC/1", fullCode: "SFWT/OTF25-OPATEX/SIC/1" },
            { name: "OTF24 FARBA SICO OPATEX NIEBIESKA", code: "SFWT/OTF24-OPATEX/SIC/1", fullCode: "SFWT/OTF24-OPATEX/SIC/1" },
            { name: "OTF22 FARBA SICO OPATEX ULTRAMARYNA 1KG", code: "SFWT/OTF22-OPATEX/SIC/1", fullCode: "SFWT/OTF22-OPATEX/SIC/1" },
            { name: "OTF20 FARBA SICO OPATEX GRANATOWA 1KG", code: "SFWT/OTF20-OPATEX/SIC/1", fullCode: "SFWT/OTF20-OPATEX/SIC/1" },
            { name: "OTF20B FARBA SICO OPATEX REFLEX BLUE 1KG", code: "SFWT/OTF20-B-OPATEX/SIC/1", fullCode: "SFWT/OTF20-B-OPATEX/SIC/1" },
            { name: "OTF20/11 FARBA SICO OPATEX REFELX BLUE 1KG", code: "SFWT/OTF20-11-OPATEX/SIC/1", fullCode: "SFWT/OTF20-11-OPATEX/SIC/1" },
            { name: "OTF15 FARBA SICO OPATEX FIOLETOWA 1KG", code: "SFWT/OTF15-OPATEX/SIC/1", fullCode: "SFWT/OTF15-OPATEX/SIC/1" },
            { name: "OTF150 BAZA TRANSPARENTNA SICO OPATEX 1KG", code: "SFWT/OTF150-OPATEX/SIC/1", fullCode: "SFWT/OTF150-OPATEX/SIC/1" },
            { name: "OTF150/15 BAZA BROKATOWA SICO OPATEX 1KG", code: "SFWT/OTF150-15-OPATEX/SIC/1", fullCode: "SFWT/OTF150-15-OPATEX/SIC/1" },
            { name: "OTF138 FARBA OPATEX FOTOLUMINESCENCYJNA", code: "SFWT/OTF138-OPATEX/SIC/1", fullCode: "SFWT/OTF138-OPATEX/SIC/1" },
            { name: "OTF135 FARBA SICO OPATEX ZIELONA FLUO 1KG", code: "SFWT/OTF135-OPATEX/SIC/1", fullCode: "SFWT/OTF135-OPATEX/SIC/1" },
            { name: "OTF134 FARBA SICO OPATEX RÓŻOWA FLUO 1KG", code: "SFWT/OTF134-OPATEX/SIC/1", fullCode: "SFWT/OTF134-OPATEX/SIC/1" },
            { name: "OTF132 FARBA OPATEX CIEMNOPOMARAŃCZOWA 1KG", code: "SFWT/OTF132-OPATEX/SIC/1", fullCode: "SFWT/OTF132-OPATEX/SIC/1" },
            { name: "OTF130 FARBA SICO OPATEX ŻÓŁTA FLUO 1KG", code: "SFWT/OTF130-OPATEX/SIC/1", fullCode: "SFWT/OTF130-OPATEX/SIC/1" },
            { name: "OTF120 FARBA SICO OPATEX ZŁOTA 1KG", code: "SFWT/OTF120-OPATEX/SIC/1", fullCode: "SFWT/OTF120-OPATEX/SIC/1" },
            { name: "OTF110 FARBA SICO OPATEX SREBRNA 1KG", code: "SFWT/OTF110-OPATEX/SIC/1", fullCode: "SFWT/OTF110-OPATEX/SIC/1" },
            { name: "OTF110/15 FARBA SICO OPATEX SILVER REFLEX 1KG", code: "SFWT/OTF110-15-OPATEX/SIC/1", fullCode: "SFWT/OTF110-15-OPATEX/SIC/1" },
            { name: "OTF110/14 ALUMINIUM OPATEX SREBRNA", code: "SFWT/OTF110-14-OPATEX/SIC/1", fullCode: "SFWT/OTF110-14-OPATEX/SIC/1" },
            { name: "OTF10 FARBA SICO OPATEX FIOLETOWA 1KG", code: "SFWT/OTF10-OPATEX/SIC/1", fullCode: "SFWT/OTF10-OPATEX/SIC/1" },
            { name: "OTF100 FARBA SICO OPATEX CZARNA 1L", code: "SFWT/OTF100-OPATEX/SIC/1", fullCode: "SFWT/OTF100-OPATEX/SIC/1" },
            { name: "FARBA BIAŁA HYDRA WHITE 120 CLZ 1KG", code: "SFWT/HYDRA-WHITE-120-CLZ/VIR/1", fullCode: "SFWT/HYDRA-WHITE-120-CLZ/VIR/1" },
            { name: "AS91 FARBA SICO AQUASET BIAŁA KRYJACA 1L", code: "SFWP/AS91-AQUASET/SIC/1", fullCode: "SFWP/AS91-AQUASET/SIC/1" },
            { name: "AS90 FARBA SICO AQUASET BIAŁA 1L", code: "SFWP/AS90-AQUASET/SIC/1", fullCode: "SFWP/AS90-AQUASET/SIC/1" },
            { name: "AS82 FARBA SICO AQUASET BEŻOWA 1L", code: "SFWP/AS82-AQUASET/SIC/1", fullCode: "SFWP/AS82-AQUASET/SIC/1" },
            { name: "AS81 FARBA SICO AQUASET BRĄZOWA 1L", code: "SFWP/AS81-AQUASET/SIC/1", fullCode: "SFWP/AS81-AQUASET/SIC/1" },
            { name: "AS70 FARBA SICO AQUASET MAGENTA 1L", code: "SFWP/AS70-AQUASET/SIC/1", fullCode: "SFWP/AS70-AQUASET/SIC/1" },
            { name: "AS61 FARBA SICO AQUASET CIEMONOCZERWONA 1L", code: "SFWP/AS61-AQUASET/SIC/1", fullCode: "SFWP/AS61-AQUASET/SIC/1" },
            { name: "AS61/63 FARBA SICO AQUASET 032C 1L", code: "SFWP/AS61-63-AQUASET/SIC/1", fullCode: "SFWP/AS61-63-AQUASET/SIC/1" },
            { name: "AS61/34 FARBA SICO AQUASET RUBINE RED C 1L", code: "SFWP/AS61-34-AQUASET/SIC/1", fullCode: "SFWP/AS61-34-AQUASET/SIC/1" },
            { name: "AS60 FARBA SICO AQUASET CZERWONA 1L", code: "SFWP/AS60-AQUASET/SIC/1", fullCode: "SFWP/AS60-AQUASET/SIC/1" },
            { name: "AS56 FARBA SICO AQUASET CYNOBER 1L", code: "SFWP/AS56-AQUASET/SIC/1", fullCode: "SFWP/AS56-AQUASET/SIC/1" },
            { name: "AS51 FARBA SICO AQUASET POMARAŃCZOWA 1L", code: "SFWP/AS51-AQUASET/SIC/1", fullCode: "SFWP/AS51-AQUASET/SIC/1" },
            { name: "AS50 FARBA SICO AQUASET JASNOPOMARAŃCZOWA 1L", code: "SFWP/AS50-AQUASET/SIC/1", fullCode: "SFWP/AS50-AQUASET/SIC/1" },
            { name: "AS42 FARBA SICO AQUASET CIEMNOŻÓŁTA 1L", code: "SFWP/AS42-AQUASET/SIC/1", fullCode: "SFWP/AS42-AQUASET/SIC/1" },
            { name: "AS41 FARBA SICO AQUASET ŻÓŁTA 1L", code: "SFWP/AS41-AQUASET/SIC/1", fullCode: "SFWP/AS41-AQUASET/SIC/1" },
            { name: "AS40 FARBA SICO AQUASET CYTRYNOWA 1L", code: "SFWP/AS40-AQUASET/SIC/1", fullCode: "SFWP/AS40-AQUASET/SIC/1" },
            { name: "AS33 FARBA SICO AQUASET ZIELONA 1L", code: "SFWP/AS33-AQUASET/SIC/1", fullCode: "SFWP/AS33-AQUASET/SIC/1" },
            { name: "AS32 FARBA SICO AQUASET ZIELONA 1L", code: "SFWP/AS32-AQUASET/SIC/1", fullCode: "SFWP/AS32-AQUASET/SIC/1" },
            { name: "AS31 FARBA SICO AQUASET ZIELONA 1L", code: "SFWP/AS31-AQUASET/SIC/1", fullCode: "SFWP/AS31-AQUASET/SIC/1" },
            { name: "AS30 FARBA SICO AQUASET CIEMNOZIELONA 1L", code: "SFWP/AS30-AQUASET/SIC/1", fullCode: "SFWP/AS30-AQUASET/SIC/1" },
            { name: "AS27 FARBA SICO AQUASET TURKUSOWA 1L", code: "SFWP/AS27-AQUASET/SIC/1", fullCode: "SFWP/AS27-AQUASET/SIC/1" },
            { name: "AS26 FARBA SICO AQUASET NIEBIESKA 1L", code: "SFWP/AS26-AQUASET/SIC/1", fullCode: "SFWP/AS26-AQUASET/SIC/1" },
            { name: "AS26/10 FARBA SICO AQUASET PROCESS BLUE 1L", code: "SFWP/AS26-10-AQUASET/SIC/1", fullCode: "SFWP/AS26-10-AQUASET/SIC/1" },
            { name: "AS24 FARBA SICO AQUASET NIEBIESKA 1L", code: "SFWP/AS24-AQUASET/SIC/1", fullCode: "SFWP/AS24-AQUASET/SIC/1" },
            { name: "AS22 FARBA SICO AQUASET NIEBIESKA 1L", code: "SFWP/AS22-AQUASET/SIC/1", fullCode: "SFWP/AS22-AQUASET/SIC/1" },
            { name: "AS20 FARBA SICO AQUASET GRANATOWA 1L", code: "SFWP/AS20-AQUASET/SIC/1", fullCode: "SFWP/AS20-AQUASET/SIC/1" },
            { name: "AS20/78 FARBA SICO AQUASET REFLEX BLUE 1L", code: "SFWP/AS20-78-AQUASET/SIC/1", fullCode: "SFWP/AS20-78-AQUASET/SIC/1" },
            { name: "AS20/53 FARBA SICO AQUASET 072 1L", code: "SFWP/AS20-53-AQUASET/SIC/1", fullCode: "SFWP/AS20-53-AQUASET/SIC/1" },
            { name: "AS143 FARBA SICO AQUASET CZARNA TRIADA 1L", code: "SFWP/AS143-AQUASET/SIC/1", fullCode: "SFWP/AS143-AQUASET/SIC/1" },
            { name: "AS142 FARBA SICO AQUASET MAGENTA TRIADA 1L", code: "SFWP/AS142-AQUASET/SIC/1", fullCode: "SFWP/AS142-AQUASET/SIC/1" },
            { name: "AS141 FARBA SICO AQUASET NIEBIESKA TRIADA 1L", code: "SFWP/AS141-AQUASET/SIC/1", fullCode: "SFWP/AS141-AQUASET/SIC/1" },
            { name: "AS140 FARBA SICO AQUASET ŻÓŁTA TRIADA 1L", code: "SFWP/AS140-AQUASET/SIC/1", fullCode: "SFWP/AS140-AQUASET/SIC/1" },
            { name: "AS138 FARBA SICO AQUASET PHOSPHOR 1L", code: "SFWP/AS138-AQUASET/SIC/1", fullCode: "SFWP/AS138-AQUASET/SIC/1" },
            { name: "AS136 FARBA SICO AQUASET NIEBIESKA FLUO 1L", code: "SFWP/AS136-AQUASET/SIC/1", fullCode: "SFWP/AS136-AQUASET/SIC/1" },
            { name: "AS135 FARBA SICO AQUASET ZIELONA FLUORESCENCYJNA 1L", code: "SFWP/AS135-AQUASET/SIC/1", fullCode: "SFWP/AS135-AQUASET/SIC/1" },
            { name: "AS134 FARBA SICO AQUASET RÓŻOWA FLUO 1L", code: "SFWP/AS134-AQUASET/SIC/1", fullCode: "SFWP/AS134-AQUASET/SIC/1" },
            { name: "AS133 FARBA SICO AQUASET CZERWONA FLUO 1L", code: "SFWP/AS133-AQUASET/SIC/1", fullCode: "SFWP/AS133-AQUASET/SIC/1" },
            { name: "AS132 FARBA SICO AQUASET CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFWP/AS132-AQUASET/SIC/1", fullCode: "SFWP/AS132-AQUASET/SIC/1" },
            { name: "AS131 FARBA SICO AQUASET JASNOPOMARAŃCZOWA FLUO 1L", code: "SFWP/AS131-AQUASET/SIC/1", fullCode: "SFWP/AS131-AQUASET/SIC/1" },
            { name: "AS130 FARBA SICO AQUASET ŻÓŁTA FLUO 1L", code: "SFWP/AS130-AQUASET/SIC/1", fullCode: "SFWP/AS130-AQUASET/SIC/1" },
            { name: "AS120 RG FARBA SICO AQUASET RICH GOLD 1L", code: "SFWP/AS120-RG-AQUASET/SIC/1", fullCode: "SFWP/AS120-RG-AQUASET/SIC/1" },
            { name: "AS110 FARBA SICO AQUASET SREBRNA 1L", code: "SFWP/AS110-AQUASET/SIC/1", fullCode: "SFWP/AS110-AQUASET/SIC/1" },
            { name: "AS10 FARBA SICO AQUASET FIOLETOWA 1L", code: "SFWP/AS10-AQUASET/SIC/1", fullCode: "SFWP/AS10-AQUASET/SIC/1" },
            { name: "AS100 FARBA SICO AQUASET CZARNA 1L", code: "SFWP/AS100-AQUASET/SIC/1", fullCode: "SFWP/AS100-AQUASET/SIC/1" },
            { name: "PPUV91/W1 FARBA SICO POLYPRO 1L", code: "SFUP/PPUV91-W1-POLYPRO/SIC/1", fullCode: "SFUP/PPUV91-W1-POLYPRO/SIC/1" },
            { name: "PLUV91 FARBA SICO UVIPLAST BIAŁA KRYJĄCA 1L", code: "SFUP/PLUV91-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV91-UVIPLAST/SIC/1" },
            { name: "PLUV91 LED FARBA SICO UVIPLAST BIAŁA 1L", code: "SFUP/PLUV91-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV91-LED-UVIPLAST/SIC/1" },
            { name: "PLUV91/53 FARBA SICO UVIPLAST BIAŁA 1L", code: "SFUP/PLUV91-53-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV91-53-UVIPLAST/SIC/1" },
            { name: "PLUV90 FARBA SICO UVIPLAST BIAŁA 1L", code: "SFUP/PLUV90-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV90-UVIPLAST/SIC/1" },
            { name: "PLUV90 LED FARBA SICO UVIPLAST BIAŁA 1L", code: "SFUP/PLUV90-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV90-LED-UVIPLAST/SIC/1" },
            { name: "PLUV82 FARBA SICO UVIPLAST OCHRA 1L", code: "SFUP/PLUV82-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV82-UVIPLAST/SIC/1" },
            { name: "PLUV82 LED FARBA SICO UVIPLAST OCHRA 1L", code: "SFUP/PLUV82-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV82-LED-UVIPLAST/SIC/1" },
            { name: "PLUV81 FARBA SICO UVIPLAST BRĄZOWA 1L", code: "SFUP/PLUV81-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV81-UVIPLAST/SIC/1" },
            { name: "PLUV81 LED FARBA SICO UVIPLAST BRĄZOWA 1L", code: "SFUP/PLUV81-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV81-LED-UVIPLAST/SIC/1" },
            { name: "PLUV80 FARBA SICO UVIPLAST BRĄZOWA 1L", code: "SFUP/PLUV80-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV80-UVIPLAST/SIC/1" },
            { name: "PLUV80 LED FARBA SICO UVIPLAST BRĄZOWA 1L", code: "SFUP/PLUV80-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV80-LED-UVIPLAST/SIC/1" },
            { name: "PLUV75 FARBA SICO UVIPLAST MAGENTA BAZA 1L", code: "SFUP/PLUV75-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV75-UVIPLAST/SIC/1" },
            { name: "PLUV75 LED FARBA SICO UVIPLAST MAGENTA 1L", code: "SFUP/PLUV75-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV75-LED-UVIPLAST/SIC/1" },
            { name: "PLUV70 FARBA SICO UVIPLAST MAGENTA 1L", code: "SFUP/PLUV70-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV70-UVIPLAST/SIC/1" },
            { name: "PLUV70 LED FARBA SICO UVIPLAST MAGENTA 1L", code: "SFUP/PLUV70-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV70-LED-UVIPLAST/SIC/1" },
            { name: "PLUV65 FARBA SICO UVIPLAST CZERWONA BAZA 1L", code: "SFUP/PLUV65-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV65-UVIPLAST/SIC/1" },
            { name: "PLUV65 LED FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV65-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV65-LED-UVIPLAST/SIC/1" },
            { name: "PLUV61 FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV61-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV61-UVIPLAST/SIC/1" },
            { name: "PLUV61 LED FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV61-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV61-LED-UVIPLAST/SIC/1" },
            { name: "PLUV61/15 FARBA SICO UVIPLAST RUBINE RED 1L", code: "SFUP/PLUV61-15-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV61-15-UVIPLAST/SIC/1" },
            { name: "PLUV61/15 LED FARBA SICO UVIPLAST CZERWONY 1L", code: "SFUP/PLUV61-15-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV61-15-LED-UVIPLAST/SIC/1" },
            { name: "PLUV60 FARBA SICO UV UVIPLAST CZERWONA 1L", code: "SFUP/PLUV60-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV60-UVIPLAST/SIC/1" },
            { name: "PLUV60 LED FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV60-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV60-LED-UVIPLAST/SIC/1" },
            { name: "PLUV60C FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV60C-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV60C-UVIPLAST/SIC/1" },
            { name: "PLUV60/6 FARBA SICO UVIPLAST CZERWONA PMS 032 RED 1L", code: "SFUP/PLUV60-6-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV60-6-UVIPLAST/SIC/1" },
            { name: "PLUV60/6 LED RED SICO UVIPLAST PANTONE 032 1L", code: "SFUP/PLUV60-6-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV60-6-LED-UVIPLAST/SIC/1" },
            { name: "PLUV56 FARBA SICO UVIPLAST CZERWONA 1L", code: "SFUP/PLUV56-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV56-UVIPLAST/SIC/1" },
            { name: "PLUV56 LED FARBA SICO UVIPLAST CYNOBER 1L", code: "SFUP/PLUV56-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV56-LED-UVIPLAST/SIC/1" },
            { name: "PLUV55 FARBA SICO UVIPLAST POMARAŃCZOWA 1L", code: "SFUP/PLUV55-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV55-UVIPLAST/SIC/1" },
            { name: "PLUV55 LED FARBA SICO UVIPLAST POMARAŃCZOWA 1L", code: "SFUP/PLUV55-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV55-LED-UVIPLAST/SIC/1" },
            { name: "PLUV51 FARBA SICO UVIPLAST POMARANCZOWA 1L", code: "SFUP/PLUV51-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV51-UVIPLAST/SIC/1" },
            { name: "PLUV51 LED FARBA SICO UVIPLAST POMARAŃCZOWA 1L", code: "SFUP/PLUV51-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV51-LED-UVIPLAST/SIC/1" },
            { name: "PLUV51/39 FARBA SICO UVIPLAST POMARAŃCZOWA (PMS 10147) 1L", code: "SFUP/PLUV51-39-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV51-39-UVIPLAST/SIC/1" },
            { name: "PLUV50 FARBA SICO UVIPLAST POMARAŃCZOWA 1L", code: "SFUP/PLUV50-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV50-UVIPLAST/SIC/1" },
            { name: "PLUV50 LED FARBA SICO UVIPLAST POMARAŃCZOWA 1L", code: "SFUP/PLUV50-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV50-LED-UVIPLAST/SIC/1" },
            { name: "PLUV42 FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV42-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-UVIPLAST/SIC/1" },
            { name: "PLUV42 LED CIEMNOŻÓŁTA SICO UVIPLAST 1L", code: "SFUP/PLUV42-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-LED-UVIPLAST/SIC/1" },
            { name: "PLUV42/42 FARBA SICO UVIPLAST ŻÓŁTA 137C 1L", code: "SFUP/PLUV42-42-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-42-UVIPLAST/SIC/1" },
            { name: "PLUV42/42 LED FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV42-42-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-42-LED-UVIPLAST/SIC/1" },
            { name: "PLUV42/40 FARBA SICO UVIPLAST ŻÓŁTA 130C 1L", code: "SFUP/PLUV42-40-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-40-UVIPLAST/SIC/1" },
            { name: "PLUV42/40 LED FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV42-40-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV42-40-LED-UVIPLAST/SIC/1" },
            { name: "PLUV41 FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV41-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV41-UVIPLAST/SIC/1" },
            { name: "PLUV41 LED FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV41-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV41-LED-UVIPLAST/SIC/1" },
            { name: "PLUV40 FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV40-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV40-UVIPLAST/SIC/1" },
            { name: "PLUV40 LED FARBA SICO UVIPLAST ŻÓŁTA 1L", code: "SFUP/PLUV40-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV40-LED-UVIPLAST/SIC/1" },
            { name: "PLUV35 FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV35-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV35-UVIPLAST/SIC/1" },
            { name: "PLUV35 LED FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV35-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV35-LED-UVIPLAST/SIC/1" },
            { name: "PLUV33 FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV33-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV33-UVIPLAST/SIC/1" },
            { name: "PLUV33 LED FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV33-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV33-LED-UVIPLAST/SIC/1" },
            { name: "PLUV32 FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV32-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV32-UVIPLAST/SIC/1" },
            { name: "PLUV32 LED FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV32-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV32-LED-UVIPLAST/SIC/1" },
            { name: "PLUV32/77 FARBA SICO UVIPLAST ZIELONA PANTONE 7738 C 1L", code: "SFUP/PLUV32-77-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV32-77-UVIPLAST/SIC/1" },
            { name: "PLUV31 FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV31-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV31-UVIPLAST/SIC/1" },
            { name: "PLUV31 LED FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV31-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV31-LED-UVIPLAST/SIC/1" },
            { name: "PLUV31/26 FARBA SICO UVIPLAST ZIELONA 1L", code: "SFUP/PLUV31-26-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV31-26-UVIPLAST/SIC/1" },
            { name: "PLUV30 FARBA SICO UVIPLAST CIEMNOZIELONA 1L", code: "SFUP/PLUV30-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV30-UVIPLAST/SIC/1" },
            { name: "PLUV30 LED FARBA SICO UVIPLAST CIEMNOZIELONA 1L", code: "SFUP/PLUV30-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV30-LED-UVIPLAST/SIC/1" },
            { name: "PLUV27 FARBA SICO UVIPLAST TURKUSOWA 1L", code: "SFUP/PLUV27-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV27-UVIPLAST/SIC/1" },
            { name: "PLUV27 LED FARBA SICO UVIPLAST TURKUSOWA 1L", code: "SFUP/PLUV27-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV27-LED-UVIPLAST/SIC/1" },
            { name: "PLUV26 FARBA SICO UVIPLAST JASNONIEBIESKA 1L", code: "SFUP/PLUV26-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV26-UVIPLAST/SIC/1" },
            { name: "PLUV26 LED FARBA SICO UVIPLAST JASNONIEBIESKA 1L", code: "SFUP/PLUV26-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV26-LED-UVIPLAST/SIC/1" },
            { name: "PLUV26/5 FARBA SICO UVIPLAST PROCESS BLUE 1L", code: "SFUP/PLUV26-5-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV26-5-UVIPLAST/SIC/1" },
            { name: "PLUV26/5 LED FARBA SICO UVIPLAST PROCESS BLUE 1L", code: "SFUP/PLUV26-5-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV26-5-LED-UVIPLAST/SIC/1" },
            { name: "PLUV2627 FARBA SICO UVIPLAST FIOLETOWA PANTONE 1L", code: "SFUP/PLUV2627-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV2627-UVIPLAST/SIC/1" },
            { name: "PLUV25 FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV25-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV25-UVIPLAST/SIC/1" },
            { name: "PLUV25 LED FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV25-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV25-LED-UVIPLAST/SIC/1" },
            { name: "PLUV24 FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV24-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV24-UVIPLAST/SIC/1" },
            { name: "PLUV24 LED FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV24-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV24-LED-UVIPLAST/SIC/1" },
            { name: "PLUV24/21 FARBA SICO UVIPLAST NIEBIESKA PANTONE 286C 1L", code: "SFUP/PLUV24-21-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV24-21-UVIPLAST/SIC/1" },
            { name: "PLUV24/10 FARBA SICO UVIPLAST NIEBIESKA PANTONE 285C 1L", code: "SFUP/PLUV24-10-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV24-10-UVIPLAST/SIC/1" },
            { name: "PLUV23 FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV23-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV23-UVIPLAST/SIC/1" },
            { name: "PLUV23 LED FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV23-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV23-LED-UVIPLAST/SIC/1" },
            { name: "PLUV22 FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV22-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV22-UVIPLAST/SIC/1" },
            { name: "PLUV22 LED FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV22-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV22-LED-UVIPLAST/SIC/1" },
            { name: "PLUV20 FARBA SICO UVIPLAST GRANATOWA 1L", code: "SFUP/PLUV20-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-UVIPLAST/SIC/1" },
            { name: "PLUV20 LED FARBA SICO UVIPLAST NIEBIESKA 1L", code: "SFUP/PLUV20-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-LED-UVIPLAST/SIC/1" },
            { name: "PLUV20B FARBA SICO UVIPLAST REFLEX BLUE 1L", code: "SFUP/PLUV20-B-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-B-UVIPLAST/SIC/1" },
            { name: "PLUV20/92 FARBA SICO UVIPLAST PANTONE 072C 1L", code: "SFUP/PLUV20-92-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-92-UVIPLAST/SIC/1" },
            { name: "PLUV20/77 FARBA SICO UVIPLAST PANTONE 541 1L", code: "SFUP/PLUV20-77-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-77-UVIPLAST/SIC/1" },
            { name: "PLUV20/5 FARBA SICO UVIPLAST REFLEX 1L", code: "SFUP/PLUV20-5-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-5-UVIPLAST/SIC/1" },
            { name: "PLUV20/5 LED FARBA SICO UVIPLAST PANTONE 072C 1L", code: "SFUP/PLUV20-5-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-5-LED-UVIPLAST/SIC/1" },
            { name: "PLUV20/10 FARBA SICO UVIPLAST PANTONE 072C 1L", code: "SFUP/PLUV20-10-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-10-UVIPLAST/SIC/1" },
            { name: "PLUV20/10 LED FARBA SICO UVIPLAST PANTONE 072C 1L", code: "SFUP/PLUV20-10-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV20-10-LED-UVIPLAST/SIC/1" },
            { name: "PLUV15 FARBA SICO UVIPLAST FIOLETOWA 1L", code: "SFUP/PLUV15-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV15-UVIPLAST/SIC/1" },
            { name: "PLUV15 LED FARBA SICO UVIPLAST FIOLETOWA 1L", code: "SFUP/PLUV15-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV15-LED-UVIPLAST/SIC/1" },
            { name: "PLUV150/56 FARBA SICO UVIPLAST UV BRIGHT 1L", code: "SFUP/PLUV150-56-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV150-56-UVIPLAST/SIC/1" },
            { name: "PLUV143 FARBA SICO UVIPLAST CZARNA TRIADA 1L", code: "SFUP/PLUV143-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV143-UVIPLAST/SIC/1" },
            { name: "PLUV142 FARBA SICO UVIPLAST MAGENTA TRIADA 1L", code: "SFUP/PLUV142-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV142-UVIPLAST/SIC/1" },
            { name: "PLUV141 FARBA SICO UVIPLAST NIEBIESKA TRIADA 1L", code: "SFUP/PLUV141-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV141-UVIPLAST/SIC/1" },
            { name: "PLUV140 FARBA SICO UVIPLAST ŻÓŁTA TRIADA 1L", code: "SFUP/PLUV140-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV140-UVIPLAST/SIC/1" },
            { name: "PLUV138 FARBA SICO UVIPLAST FOTOLUMINESCENCYJNA 1L", code: "SFUP/PLUV138-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV138-UVIPLAST/SIC/1" },
            { name: "PLUV136 FARBA SICO UVIPLAST NIEBIESKA FLUO 1L", code: "SFUP/PLUV136-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV136-UVIPLAST/SIC/1" },
            { name: "PLUV135 FARBA SICO UVIPLAST ZIELONA FLUO 1L", code: "SFUP/PLUV135-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV135-UVIPLAST/SIC/1" },
            { name: "PLUV134 FARBA SICO UVIPLAST RÓŻOWA FLUO 1L", code: "SFUP/PLUV134-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV134-UVIPLAST/SIC/1" },
            { name: "PLUV134/12 FARBA SICO UVIPLAST RÓŻOWA FLUO 814C 1L", code: "SFUP/PLUV134-12-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV134-12-UVIPLAST/SIC/1" },
            { name: "PLUV133 FARBA SICO UVIPLAST CZERWONA FLUO 1L", code: "SFUP/PLUV133-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV133-UVIPLAST/SIC/1" },
            { name: "PLUV132 FARBA SICO UVIPLAST POMARAŃCZOWA FLUO 1L", code: "SFUP/PLUV132-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV132-UVIPLAST/SIC/1" },
            { name: "PLUV131 FARBA SICO UVIPLAST JASNOPOMARAŃCZOWA FLUO 1L", code: "SFUP/PLUV131-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV131-UVIPLAST/SIC/1" },
            { name: "PLUV130 FARBA SICO UVIPLAST ŻÓŁTA FLUO 1L", code: "SFUP/PLUV130-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV130-UVIPLAST/SIC/1" },
            { name: "PLUV120 FARBA SICO UVIPLAST ZŁOTA 1L", code: "SFUP/PLUV120-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV120-UVIPLAST/SIC/1" },
            { name: "PLUV110 FARBA SICO UVIPLAST SREBRNA 1L", code: "SFUP/PLUV110-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV110-UVIPLAST/SIC/1" },
            { name: "PLUV110 LED FARBA SICO UVIPLAST ALUMINIUM 1L", code: "SFUP/PLUV110-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV110-LED-UVIPLAST/SIC/1" },
            { name: "PLUV10 FARBA SICO UVIPLAST FIOLETOWA 1L", code: "SFUP/PLUV10-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV10-UVIPLAST/SIC/1" },
            { name: "PLUV10 LED FARBA SICO UVIPLAST FIOLETOWA 1L", code: "SFUP/PLUV10-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV10-LED-UVIPLAST/SIC/1" },
            { name: "PLUV100 FARBA SICO UVIPLAST CZARNA 1L", code: "SFUP/PLUV100-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV100-UVIPLAST/SIC/1" },
            { name: "PLUV100 LED FARBA SICO UVIPLAST CZARNA 1L", code: "SFUP/PLUV100-LED-UVIPLAST/SIC/1", fullCode: "SFUP/PLUV100-LED-UVIPLAST/SIC/1" },
            { name: "MTR 65/HD FARBA CZARNA 1L", code: "SFUP/MTR-65-HD/SUN/1", fullCode: "SFUP/MTR-65-HD/SUN/1" },
            { name: "MTR 60/HD FARBA BIAŁA KRYJĄCA 1L", code: "SFUP/MTR-60-HD/SUN/1", fullCode: "SFUP/MTR-60-HD/SUN/1" },
            { name: "TRANSFERPOWDER NR 4 SOFT PROSZEK TRANSFEROWY 1KG", code: "SFTK/TRANSFERPOWDER-NR4/SIC/1", fullCode: "SFTK/TRANSFERPOWDER-NR4/SIC/1" },
            { name: "TRANSFERPOWDER NR 18 PROSZEK TRANSFEROWY 1KG", code: "SFTK/TRANSFERPOWDER-NR18/SIC/1", fullCode: "SFTK/TRANSFERPOWDER-NR18/SIC/1" },
            { name: "TRANSFERPOWDER NR 13 PROSZEK TRANSFEROWY 1KG", code: "SFTK/TRANSFERPOWDER-NR13/SIC/1", fullCode: "SFTK/TRANSFERPOWDER-NR13/SIC/1" },
            { name: "TRANSFERPOWDER NR 12 SPTNFX PROSZEK TRANSFEROWY 1KG", code: "SFTK/TRANSFERPOWDER-NR12-SPTNFX/SIC/1", fullCode: "SFTK/TRANSFERPOWDER-NR12-SPTNFX/SIC/1" },
            { name: "UV110/8 FARBA ZDRAPKA SICO UVILUX ALLUMINIUM 1L", code: "SFSZ/UV110-8-UVILUX/SIC/1", fullCode: "SFSZ/UV110-8-UVILUX/SIC/1" },
            { name: "SB91/2 FARBA SICO SCRATCH BIAŁA 1L", code: "SFSZ/SB91-2-SCRATCH/SIC/1", fullCode: "SFSZ/SB91-2-SCRATCH/SIC/1" },
            { name: "SB120/7 FARBA SICO SCRATCH ZDRAPKA ZŁOTA 1L", code: "SFSZ/SB120-7-SCRATCH/SIC/1", fullCode: "SFSZ/SB120-7-SCRATCH/SIC/1" },
            { name: "SB110/2 FARBA SICO SCRATCH ZDRAPKA SREBRNA 1L", code: "SFSZ/SB110-2-SCRATCH/SIC/1", fullCode: "SFSZ/SB110-2-SCRATCH/SIC/1" },
            { name: "SB100/7 FARBA SICO SCRATCH ZDRAPKA CZARNA 1L", code: "SFSZ/SB100-7-SCRATCH/SIC/1", fullCode: "SFSZ/SB100-7-SCRATCH/SIC/1" },
            { name: "UV150/122 LAKIER SICO UVILUX SATYNOWY 1L", code: "SFSS/UV150-122-UVILUX/SIC/1", fullCode: "SFSS/UV150-122-UVILUX/SIC/1" },
            { name: "UV150/62 LAKIER SICO UVILUX BRAILLE GĘSTSZY 1L", code: "SFSB/UV150-62-UVILUX/SIC/1", fullCode: "SFSB/UV150-62-UVILUX/SIC/1" },
            { name: "UV150/51 LAKIER SICO SPECIAL MAUVE UVILUX 1L", code: "SFSA/UV150-UVILUX/SIC/1", fullCode: "SFSA/UV150-UVILUX/SIC/1" },
            { name: "UV150/129 LAKIER SICO UVILUX ANTIDERAPANT ANTYPOŚLIZGOWY 1KG", code: "SFSA/UV150-129-UVILUX/SIC/1", fullCode: "SFSA/UV150-129-UVILUX/SIC/1" },
            { name: "TPP91 FARBA SICO POLYPRO BIAŁA KRYJĄCA 1L", code: "SFRG/TPP91-POLYPRO/SIC/1", fullCode: "SFRG/TPP91-POLYPRO/SIC/1" },
            { name: "TPP90 FARBA SICO POLYPRO BIAŁA 1L", code: "SFRG/TPP90-POLYPRO/SIC/1", fullCode: "SFRG/TPP90-POLYPRO/SIC/1" },
            { name: "TPP82 FARBA SICO POLYPRO BEŻOWA 1L", code: "SFRG/TPP82-POLYPRO/SIC/1", fullCode: "SFRG/TPP82-POLYPRO/SIC/1" },
            { name: "TPP81 FARBA SICO POLYPRO BRĄZOWA 1L", code: "SFRG/TPP81-POLYPRO/SIC/1", fullCode: "SFRG/TPP81-POLYPRO/SIC/1" },
            { name: "TPP80 FARBA SICO POLYPRO JASNOBRĄZOWA 1L", code: "SFRG/TPP80-POLYPRO/SIC/1", fullCode: "SFRG/TPP80-POLYPRO/SIC/1" },
            { name: "TPP75 FARBA SICO POLYPRO MAGENTA BAZA 1L", code: "SFRG/TPP75-POLYPRO/SIC/1", fullCode: "SFRG/TPP75-POLYPRO/SIC/1" },
            { name: "TPP65 FARBA SICO POLYPRO CZERWONA BAZA 1L", code: "SFRG/TPP65-POLYPRO/SIC/1", fullCode: "SFRG/TPP65-POLYPRO/SIC/1" },
            { name: "TPP61 FARBA SICO POLYPRO CIEMNOCZERWONA 1L", code: "SFRG/TPP61-POLYPRO/SIC/1", fullCode: "SFRG/TPP61-POLYPRO/SIC/1" },
            { name: "TPP61/58 FARBA SICO POLYPRO RUBINE RED C 1L", code: "SFRG/TPP61-58-POLYPRO/SIC/1", fullCode: "SFRG/TPP61-58-POLYPRO/SIC/1" },
            { name: "TPP60 FARBA SICO POLYPRO CZERWONA 1L", code: "SFRG/TPP60-POLYPRO/SIC/1", fullCode: "SFRG/TPP60-POLYPRO/SIC/1" },
            { name: "TPP56 FARBA SICO POLYPRO CZERWONA 1L", code: "SFRG/TPP56-POLYPRO/SIC/1", fullCode: "SFRG/TPP56-POLYPRO/SIC/1" },
            { name: "TPP51 FARBA SICO POLYPRO POMARAŃCZOWA 1L", code: "SFRG/TPP51-POLYPRO/SIC/1", fullCode: "SFRG/TPP51-POLYPRO/SIC/1" },
            { name: "TPP51/56 FARBA SICO POLYPRO POMARAŃCZOWA PANTONE 152 C 1L", code: "SFRG/TPP51-56-POLYPRO/SIC/1", fullCode: "SFRG/TPP51-56-POLYPRO/SIC/1" },
            { name: "TPP42 FARBA SICO POLYPRO CIEMNOŻÓŁTA 1L", code: "SFRG/TPP42-POLYPRO/SIC/1", fullCode: "SFRG/TPP42-POLYPRO/SIC/1" },
            { name: "TPP41 FARBA SICO POLYPRO ŻÓŁTA 1L", code: "SFRG/TPP41-POLYPRO/SIC/1", fullCode: "SFRG/TPP41-POLYPRO/SIC/1" },
            { name: "TPP40 FARBA SICO POLYPRO CYTRYNOWA 1L", code: "SFRG/TPP40-POLYPRO/SIC/1", fullCode: "SFRG/TPP40-POLYPRO/SIC/1" },
            { name: "TPP35 FARBA SICO POLYPRO ZIELONA BAZA 1L", code: "SFRG/TPP35-POLYPRO/SIC/1", fullCode: "SFRG/TPP35-POLYPRO/SIC/1" },
            { name: "TPP33 FARBA SICO POLYPRO ZIELONA 1L", code: "SFRG/TPP33-POLYPRO/SIC/1", fullCode: "SFRG/TPP33-POLYPRO/SIC/1" },
            { name: "TPP32 FARBA SICO POLYPRO ZIELONA 1L", code: "SFRG/TPP32-POLYPRO/SIC/1", fullCode: "SFRG/TPP32-POLYPRO/SIC/1" },
            { name: "TPP31 FARBA SICO POLYPRO ZIELONA 1L", code: "SFRG/TPP31-POLYPRO/SIC/1", fullCode: "SFRG/TPP31-POLYPRO/SIC/1" },
            { name: "TPP30 FARBA SICO POLYPRO CIEMNOZIELONA 1L", code: "SFRG/TPP30-POLYPRO/SIC/1", fullCode: "SFRG/TPP30-POLYPRO/SIC/1" },
            { name: "TPP26 FARBA SICO POLYPRO JASNONIEBIESKA 1L", code: "SFRG/TPP26-POLYPRO/SIC/1", fullCode: "SFRG/TPP26-POLYPRO/SIC/1" },
            { name: "TPP26/76 FARBA SICO POLYPRO PROCESS BLUE 1L", code: "SFRG/TPP26-76-POLYPRO/SIC/1", fullCode: "SFRG/TPP26-76-POLYPRO/SIC/1" },
            { name: "TPP25 FARBA SICO POLYPRO NIEBIESKA 1L", code: "SFRG/TPP25-POLYPRO/SIC/1", fullCode: "SFRG/TPP25-POLYPRO/SIC/1" },
            { name: "TPP24 FARBA SICO POLYPRO NIEBIESKA 1L", code: "SFRG/TPP24-POLYPRO/SIC/1", fullCode: "SFRG/TPP24-POLYPRO/SIC/1" },
            { name: "TPP23 FARBA SICO POLYPRO ULTRAMARYNA 1L", code: "SFRG/TPP23-POLYPRO/SIC/1", fullCode: "SFRG/TPP23-POLYPRO/SIC/1" },
            { name: "TPP20 FARBA SICO POLYPRO GRANATOWA 1L", code: "SFRG/TPP20-POLYPRO/SIC/1", fullCode: "SFRG/TPP20-POLYPRO/SIC/1" },
            { name: "TPP20/B FARBA SICO POLYPRO REFELX BLUE 1L", code: "SFRG/TPP20-B-POLYPRO/SIC/1", fullCode: "SFRG/TPP20-B-POLYPRO/SIC/1" },
            { name: "TPP20/16 FARBA SICO POLYPRO REFLEX BLUE 1L", code: "SFRG/TPP20-16-POLYPRO/SIC/1", fullCode: "SFRG/TPP20-16-POLYPRO/SIC/1" },
            { name: "TPP20/149 FARBA SICO POLYPRO NIEBIESKA PANTONE 072 C 1L", code: "SFRG/TPP20-149-POLYPRO/SIC/1", fullCode: "SFRG/TPP20-149-POLYPRO/SIC/1" },
            { name: "TPP1702 OPÓŹNIACZ W ŻELU SUPERPOWOLNY SICO POLYPRO 1L", code: "SFRG/TPP1702-POLYPRO/SIC/1", fullCode: "SFRG/TPP1702-POLYPRO/SIC/1" },
            { name: "TPP15 FARBA SICO POLYPRO FIOLETOWA BAZA 1L", code: "SFRG/TPP15-POLYPRO/SIC/1", fullCode: "SFRG/TPP15-POLYPRO/SIC/1" },
            { name: "TPP150 BAZA TRANSPARENTNA SICO POLYPRO 1L", code: "SFRG/TPP150-POLYPRO/SIC/1", fullCode: "SFRG/TPP150-POLYPRO/SIC/1" },
            { name: "TPP143 FARBA SICO POLYPRO CZARNA TRIADA 1L", code: "SFRG/TPP143-POLYPRO/SIC/1", fullCode: "SFRG/TPP143-POLYPRO/SIC/1" },
            { name: "TPP141 FARBA SICO POLYPRO NIEBIESKA TRIADA 1L", code: "SFRG/TPP141-POLYPRO/SIC/1", fullCode: "SFRG/TPP141-POLYPRO/SIC/1" },
            { name: "TPP140 FARBA SICO POLYPRO ŻÓŁTA TRIADA 1L", code: "SFRG/TPP140-POLYPRO/SIC/1", fullCode: "SFRG/TPP140-POLYPRO/SIC/1" },
            { name: "TPP120 FARBA SICO POLYPRO ZŁOTA 1L", code: "SFRG/TPP120-POLYPRO/SIC/1", fullCode: "SFRG/TPP120-POLYPRO/SIC/1" },
            { name: "TPP110 FARBA SICO POLYPRO SREBRNA 1L", code: "SFRG/TPP110-POLYPRO/SIC/1", fullCode: "SFRG/TPP110-POLYPRO/SIC/1" },
            { name: "TPP10 FARBA SICO POLYPRO FIOLETOWA 1L", code: "SFRG/TPP10-POLYPRO/SIC/1", fullCode: "SFRG/TPP10-POLYPRO/SIC/1" },
            { name: "TPP100 FARBA SICO POLYPRO CZARNA 1L", code: "SFRG/TPP100-POLYPRO/SIC/1", fullCode: "SFRG/TPP100-POLYPRO/SIC/1" },
            { name: "TA91 FARBA SICO TAMPOPRINT BIAŁA KRYJĄCA 1L", code: "SFRG/TA91-TAMPOPRINT/SIC/1", fullCode: "SFRG/TA91-TAMPOPRINT/SIC/1" },
            { name: "SPTNP61/15 FARBA SICO SICOPLAST  PANTONE RUBIN RED C 1L", code: "SFRG/SPTNP61-15-SICOPLAST/SIC/1", fullCode: "SFRG/SPTNP61-15-SICOPLAST/SIC/1" },
            { name: "SPTN91/F FARBA SICO SICOPLAST BIAŁA FLASH 1L", code: "SFRG/SPTN91-F-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN91-F-SICOPLAST/SIC/1" },
            { name: "SPTN91/61 FARBA SICO SICOPLAST AMAZING WHITE 1L", code: "SFRG/SPTN91-61-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN91-61-SICOPLAST/SIC/1" },
            { name: "SPTN91/1 FARBA SICO SICOPLAST BIAŁA KRYJĄCA 1L", code: "SFRG/SPTN91-1-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN91-1-SICOPLAST/SIC/1" },
            { name: "SPTN91/1 FARBA SICO SICOPLAST BIAŁA KRYJĄCA R 1L", code: "SFRG/SPTN91-1-R-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN91-1-R-SICOPLAST/SIC/1" },
            { name: "SPTN82 FARBA SICO SICOPLAST BEŻOWY 1L", code: "SFRG/SPTN82-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN82-SICOPLAST/SIC/1" },
            { name: "SPTN81 FARBA SICO SICOPLAST BRĄZOWA 1L", code: "SFRG/SPTN81-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN81-SICOPLAST/SIC/1" },
            { name: "SPTN80 FARBA SICO SICOPLAST BRĄZOWA 1L", code: "SFRG/SPTN80-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN80-SICOPLAST/SIC/1" },
            { name: "SPTN75 FARBA SICO SICOPLAST MAGENTA 1L", code: "SFRG/SPTN75-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN75-SICOPLAST/SIC/1" },
            { name: "SPTN75M FARBA SICO SICOPLAST MAGENTA BAZA 1L", code: "SFRG/SPTN75-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN75-M-SICOPLAST/SIC/1" },
            { name: "SPTN70 FARBA SICO SICOPLAST MAGENTA 1L", code: "SFRG/SPTN70-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN70-SICOPLAST/SIC/1" },
            { name: "SPTN70/36 FARBA SICO SICOPLAST RUBINE RED 1L", code: "SFRG/SPTN70-36-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN70-36-SICOPLAST/SIC/1" },
            { name: "SPTN65M FARBA SICO SICOPLAST CZERWONA 1L", code: "SFRG/SPTN65-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN65-M-SICOPLAST/SIC/1" },
            { name: "SPTN61 FARBA SICO SICOPLAST CZERWONA 1L", code: "SFRG/SPTN61-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN61-SICOPLAST/SIC/1" },
            { name: "SPTN60 FARBA SICO SICOPLAST CZERWONA 1L", code: "SFRG/SPTN60-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN60-SICOPLAST/SIC/1" },
            { name: "SPTN60/PV FARBA SICO SICOPLAST CZERWONA PHTALATE FREE PV 1L", code: "SFRG/SPTN60-PV-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN60-PV-SICOPLAST/SIC/1" },
            { name: "SPTN60/12 FARBA SICO SICOPLAST PANTONE 032C 1L", code: "SFRG/SPTN60-12-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN60-12-SICOPLAST/SIC/1" },
            { name: "SPTN56 FARBA SICO SICOPLAST CZERWONA 1L", code: "SFRG/SPTN56-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN56-SICOPLAST/SIC/1" },
            { name: "SPTN55 FARBA SICO SICOPLAST POMARAŃCZOWA BAZA 1L", code: "SFRG/SPTN55-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN55-SICOPLAST/SIC/1" },
            { name: "SPTN55M FARBA SICO SICOPLAST POMARAŃCZOWA BAZA 1L", code: "SFRG/SPTN55-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN55-M-SICOPLAST/SIC/1" },
            { name: "SPTN51 FARBA SICO SICOPLAST POMARAŃCZOWA 1L", code: "SFRG/SPTN51-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN51-SICOPLAST/SIC/1" },
            { name: "SPTN50 FARBA SICO SICOPLAST  POMARAŃCZOWA 1L", code: "SFRG/SPTN50-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN50-SICOPLAST/SIC/1" },
            { name: "SPTN42 FARBA SICO SICOPLAST ŻÓŁTA 1L", code: "SFRG/SPTN42-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN42-SICOPLAST/SIC/1" },
            { name: "SPTN41 FARBA SICO SICOPLAST ŻÓŁTA 1L", code: "SFRG/SPTN41-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN41-SICOPLAST/SIC/1" },
            { name: "SPTN40 FARBA SICO SICOPLAST CYTRYNOWA 1L", code: "SFRG/SPTN40-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN40-SICOPLAST/SIC/1" },
            { name: "SPTN35 FARBA SICO SICOPLAST ZIELONA BAZA 1L", code: "SFRG/SPTN35-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN35-SICOPLAST/SIC/1" },
            { name: "SPTN35M FARBA SICO SICOPLAST ZIELONA BAZA 1L", code: "SFRG/SPTN35-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN35-M-SICOPLAST/SIC/1" },
            { name: "SPTN33 FARBA SICO SICOPLAST ZIELONA 1L", code: "SFRG/SPTN33-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN33-SICOPLAST/SIC/1" },
            { name: "SPTN32 FARBA SICO SICOPLAST ZIELONA 1L", code: "SFRG/SPTN32-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN32-SICOPLAST/SIC/1" },
            { name: "SPTN31 FARBA SICO SICOPLAST ZIELONA 1L", code: "SFRG/SPTN31-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN31-SICOPLAST/SIC/1" },
            { name: "SPTN31/31 FARBA SICO SICOPLAST ZIELONA (7720C) 1L", code: "SFRG/SPTN31-31-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN31-31-SICOPLAST/SIC/1" },
            { name: "SPTN30 FARBA SICO SICOPLAST CIEMNOZIELONA 1L", code: "SFRG/SPTN30-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN30-SICOPLAST/SIC/1" },
            { name: "SPTN27 FARBA SICO SICOPLAST TURKUSOWA 1L", code: "SFRG/SPTN27-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN27-SICOPLAST/SIC/1" },
            { name: "SPTN26 FARBA SICO SICOPLAST BŁĘKITNA 1L", code: "SFRG/SPTN26-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN26-SICOPLAST/SIC/1" },
            { name: "SPTN26/20 FARBA SICO SICOPLAST PANTONE PROCESS BLUE 1L", code: "SFRG/SPTN26-20-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN26-20-SICOPLAST/SIC/1" },
            { name: "SPTN25M FARBA SICO SICOPLAST NIEBIESKA BAZA 1L", code: "SFRG/SPTN25-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN25-M-SICOPLAST/SIC/1" },
            { name: "SPTN24 FARBA SICO SICOPLAST NIEBIESKA 1L", code: "SFRG/SPTN24-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN24-SICOPLAST/SIC/1" },
            { name: "SPTN23M FARBA SICO SICOPLAST NIEBIESKA BAZA 1L", code: "SFRG/SPTN23-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN23-M-SICOPLAST/SIC/1" },
            { name: "SPTN22 FARBA SICO SICOPLAST ULTRAMARYNA 1L", code: "SFRG/SPTN22-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN22-SICOPLAST/SIC/1" },
            { name: "SPTN20 FARBA SICO SICOPLAST GRANATOWA 1L", code: "SFRG/SPTN20-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN20-SICOPLAST/SIC/1" },
            { name: "SPTN20B FARBA SICO SICOPLAST REFLEX BLUE 1L", code: "SFRG/SPTN20-B-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN20-B-SICOPLAST/SIC/1" },
            { name: "SPTN20/43 FARBA SICO SICOPLAST GRANATOWA 072C 1L", code: "SFRG/SPTN20-43-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN20-43-SICOPLAST/SIC/1" },
            { name: "SPTN15 FARBA SICO SICOPLAST FIOLET BAZA 1L", code: "SFRG/SPTN15-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN15-SICOPLAST/SIC/1" },
            { name: "SPTN15M FARBA SICO SICOPLAST FIOLETOWA BAZA 1L", code: "SFRG/SPTN15-M-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN15-M-SICOPLAST/SIC/1" },
            { name: "SPTN150/17 BAZA HIGH DENSITY SICO SICOPLAST 1L", code: "SFRG/SPTN150-17-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN150-17-SICOPLAST/SIC/1" },
            { name: "SPTN143 FARBA SICO SICOPLAST CZARNA TRIADA 1L", code: "SFRG/SPTN143-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN143-SICOPLAST/SIC/1" },
            { name: "SPTN142 FARBA SICO SICOPLAST  TRIADA MAGENTA 1L", code: "SFRG/SPTN142-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN142-SICOPLAST/SIC/1" },
            { name: "SPTN141 FARBA SICO SICOPLAST  TRIADA NIEBIESKA 1L", code: "SFRG/SPTN141-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN141-SICOPLAST/SIC/1" },
            { name: "SPTN140 FARBA SICO SICOPLAST ŻÓŁTA TRIADA 1L", code: "SFRG/SPTN140-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN140-SICOPLAST/SIC/1" },
            { name: "SPTN138 FARBA SICO SICOPLAST FOTOLUMINESCENCYJNA 1L", code: "SFRG/SPTN138-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN138-SICOPLAST/SIC/1" },
            { name: "SPTN138/2 FARBA SICO SICOPLAST 1L", code: "SFRG/SPTN138-2-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN138-2-SICOPLAST/SIC/1" },
            { name: "SPTN137 FARBA SICO SICOPLAST ODBLASKOWA 1L", code: "SFRG/SPTN137-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN137-SICOPLAST/SIC/1" },
            { name: "SPTN136 FARBA SICO SICOPLAST FLUO NIEBIESKA 1L", code: "SFRG/SPTN136-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN136-SICOPLAST/SIC/1" },
            { name: "SPTN135 FARBA SICO SICOPLAST FLUO ZIELONA 1L", code: "SFRG/SPTN135-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN135-SICOPLAST/SIC/1" },
            { name: "SPTN134 FARBA SICO SICOPLAST RÓŻOWA FLUO 1L", code: "SFRG/SPTN134-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN134-SICOPLAST/SIC/1" },
            { name: "SPTN133 FARBA SICO SICOPLAST CZERWONA FLUO 1L", code: "SFRG/SPTN133-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN133-SICOPLAST/SIC/1" },
            { name: "SPTN132 FARBA SICO SICOPLAST CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/SPTN132-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN132-SICOPLAST/SIC/1" },
            { name: "SPTN131 FARBA SICO SICOPLAST JASNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/SPTN131-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN131-SICOPLAST/SIC/1" },
            { name: "SPTN130 FARBA SICO SICOPLAST  FLUO ŻÓŁTA 1L", code: "SFRG/SPTN130-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN130-SICOPLAST/SIC/1" },
            { name: "SPTN120 FARBA SICO SICOPLAST ZŁOTA 1L", code: "SFRG/SPTN120-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN120-SICOPLAST/SIC/1" },
            { name: "SPTN120/33 FARBA SICO SICOPLAST ESG PATROL ZŁOTA 1L", code: "SFRG/SPTN120-33-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN120-33-SICOPLAST/SIC/1" },
            { name: "SPTN110 FARBA SICO SICOPLAST SREBRNA 1L", code: "SFRG/SPTN110-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN110-SICOPLAST/SIC/1" },
            { name: "SPTN110/13 FARBA SICO SICOPLAST SREBRNA REFLECTIVE 1L", code: "SFRG/SPTN110-13-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN110-13-SICOPLAST/SIC/1" },
            { name: "SPTN10 FARBA SICO SICOPLAST FIOLETOWA 1L", code: "SFRG/SPTN10-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN10-SICOPLAST/SIC/1" },
            { name: "SPTN100 FARBA SICO SICOPLAST CZARNA 1L", code: "SFRG/SPTN100-SICOPLAST/SIC/1", fullCode: "SFRG/SPTN100-SICOPLAST/SIC/1" },
            { name: "SP91 FARBA SICO SICOPRINT BIAŁA KRYJĄCA 1L", code: "SFRG/SP91-SICOPRINT/SIC/1", fullCode: "SFRG/SP91-SICOPRINT/SIC/1" },
            { name: "SP90 FARBA SICO SICOPRINT BIAŁA 1L", code: "SFRG/SP90-SICOPRINT/SIC/1", fullCode: "SFRG/SP90-SICOPRINT/SIC/1" },
            { name: "SP82 FARBA SICO SICOPRINT BEŻOWA 1L", code: "SFRG/SP82-SICOPRINT/SIC/1", fullCode: "SFRG/SP82-SICOPRINT/SIC/1" },
            { name: "SP81 FARBA SICO SICOPRINT BRĄZOWA 1L", code: "SFRG/SP81-SICOPRINT/SIC/1", fullCode: "SFRG/SP81-SICOPRINT/SIC/1" },
            { name: "SP80 FARBA SICO SICOPRINT JASNOBRĄZOWA 1L", code: "SFRG/SP80-SICOPRINT/SIC/1", fullCode: "SFRG/SP80-SICOPRINT/SIC/1" },
            { name: "SP75 FARBA SICO SICOPRINT MAGENTA 1L", code: "SFRG/SP75-SICOPRINT/SIC/1", fullCode: "SFRG/SP75-SICOPRINT/SIC/1" },
            { name: "SP75/13 FARBA SICO SICOPRINT RUBINE RED 1L", code: "SFRG/SP75-13-SICOPRINT/SIC/1", fullCode: "SFRG/SP75-13-SICOPRINT/SIC/1" },
            { name: "SP70 FARBA SICO SICOPRINT MAGENTA 1L", code: "SFRG/SP70-SICOPRINT/SIC/1", fullCode: "SFRG/SP70-SICOPRINT/SIC/1" },
            { name: "SP65 FARBA SICO SICOPRINT CZERWONA 1L", code: "SFRG/SP65-SICOPRINT/SIC/1", fullCode: "SFRG/SP65-SICOPRINT/SIC/1" },
            { name: "SP61 FARBA SICO SICOPRINT CZERWONA 1L", code: "SFRG/SP61-SICOPRINT/SIC/1", fullCode: "SFRG/SP61-SICOPRINT/SIC/1" },
            { name: "SP60 FARBA SICO SICOPRINT CZERWONA 1L", code: "SFRG/SP60-SICOPRINT/SIC/1", fullCode: "SFRG/SP60-SICOPRINT/SIC/1" },
            { name: "SP56 FARBA SICO SICOPRINT JASNOCZERWONA 1L", code: "SFRG/SP56-SICOPRINT/SIC/1", fullCode: "SFRG/SP56-SICOPRINT/SIC/1" },
            { name: "SP55 FARBA SICO SICOPRINT POMARAŃCZOWA 1L", code: "SFRG/SP55-SICOPRINT/SIC/1", fullCode: "SFRG/SP55-SICOPRINT/SIC/1" },
            { name: "SP51 FARBA SICO SICOPRINT POMARAŃCZOWA 1L", code: "SFRG/SP51-SICOPRINT/SIC/1", fullCode: "SFRG/SP51-SICOPRINT/SIC/1" },
            { name: "SP50 FARBA SICO SICOPRINT POMARAŃCZOWA 1L", code: "SFRG/SP50-SICOPRINT/SIC/1", fullCode: "SFRG/SP50-SICOPRINT/SIC/1" },
            { name: "SP42 FARBA SICO SICOPRINT CIEMNOŻÓŁTA 1L", code: "SFRG/SP42-SICOPRINT/SIC/1", fullCode: "SFRG/SP42-SICOPRINT/SIC/1" },
            { name: "SP41 FARBA SICO SICOPRINT ŻÓŁTA 1L", code: "SFRG/SP41-SICOPRINT/SIC/1", fullCode: "SFRG/SP41-SICOPRINT/SIC/1" },
            { name: "SP40 FARBA SICO SICOPRINT CYTRYNOWA 1L", code: "SFRG/SP40-SICOPRINT/SIC/1", fullCode: "SFRG/SP40-SICOPRINT/SIC/1" },
            { name: "SP35 FARBA SICO SICOPRINT ZIELONA 1L", code: "SFRG/SP35-SICOPRINT/SIC/1", fullCode: "SFRG/SP35-SICOPRINT/SIC/1" },
            { name: "SP33 FARBA SICO SICOPRINT ZIELONA 1L", code: "SFRG/SP33-SICOPRINT/SIC/1", fullCode: "SFRG/SP33-SICOPRINT/SIC/1" },
            { name: "SP32 FARBA SICO SICOPRINT JASNOZIELONA 1L", code: "SFRG/SP32-SICOPRINT/SIC/1", fullCode: "SFRG/SP32-SICOPRINT/SIC/1" },
            { name: "SP31 FARBA SICO SICOPRINT ZIELONA 1L", code: "SFRG/SP31-SICOPRINT/SIC/1", fullCode: "SFRG/SP31-SICOPRINT/SIC/1" },
            { name: "SP30 FARBA SICO SICOPRINT CIEMNOZIELONA 1L", code: "SFRG/SP30-SICOPRINT/SIC/1", fullCode: "SFRG/SP30-SICOPRINT/SIC/1" },
            { name: "SP27 FARBA SICO SICOPRINT TURKUSOWA 1L", code: "SFRG/SP27-SICOPRINT/SIC/1", fullCode: "SFRG/SP27-SICOPRINT/SIC/1" },
            { name: "SP26 FARBA SICO SICOPRINT JASNONIEBIESKA 1L", code: "SFRG/SP26-SICOPRINT/SIC/1", fullCode: "SFRG/SP26-SICOPRINT/SIC/1" },
            { name: "SP26/42 FARBA SICO SICOPRINT PROCESS BLUE 1L", code: "SFRG/SP26-42-SICOPRINT/SIC/1", fullCode: "SFRG/SP26-42-SICOPRINT/SIC/1" },
            { name: "SP25 FARBA SICO SICOPRINT NIEBIESKA 1L", code: "SFRG/SP25-SICOPRINT/SIC/1", fullCode: "SFRG/SP25-SICOPRINT/SIC/1" },
            { name: "SP24 FARBA SICO SICOPRINT NIEBIESKA 1L", code: "SFRG/SP24-SICOPRINT/SIC/1", fullCode: "SFRG/SP24-SICOPRINT/SIC/1" },
            { name: "SP22 FARBA SICO SICOPRINT ULTRAMARYNA 1L", code: "SFRG/SP22-SICOPRINT/SIC/1", fullCode: "SFRG/SP22-SICOPRINT/SIC/1" },
            { name: "SP20 FARBA SICO SICOPRINT GRANATOWA 1L", code: "SFRG/SP20-SICOPRINT/SIC/1", fullCode: "SFRG/SP20-SICOPRINT/SIC/1" },
            { name: "SP20B FARBA SICO SICOPRINT GRANATOWA REFLEX BLUE 1L", code: "SFRG/SP20-B-SICOPRINT/SIC/1", fullCode: "SFRG/SP20-B-SICOPRINT/SIC/1" },
            { name: "SP20/18 FARBA SICO SICOPRINT PANTONE 072C 1L", code: "SFRG/SP20-18-SICOPRINT/SIC/1", fullCode: "SFRG/SP20-18-SICOPRINT/SIC/1" },
            { name: "SP15 FARBA SICO SICOPRINT FIOLETOWA 1L", code: "SFRG/SP15-SICOPRINT/SIC/1", fullCode: "SFRG/SP15-SICOPRINT/SIC/1" },
            { name: "SP143 FARBA SICO SICOPRINT CZARNA 1L", code: "SFRG/SP143-SICOPRINT/SIC/1", fullCode: "SFRG/SP143-SICOPRINT/SIC/1" },
            { name: "SP142 FARBA SICO SICOPRINT MAGENTA 1L", code: "SFRG/SP142-SICOPRINT/SIC/1", fullCode: "SFRG/SP142-SICOPRINT/SIC/1" },
            { name: "SP141 FARBA SICO SICOPRINT NIEBIESKA TRIADA 1L", code: "SFRG/SP141-SICOPRINT/SIC/1", fullCode: "SFRG/SP141-SICOPRINT/SIC/1" },
            { name: "SP140 FARBA SICO SICOPRINT ŻÓŁTA 1L", code: "SFRG/SP140-SICOPRINT/SIC/1", fullCode: "SFRG/SP140-SICOPRINT/SIC/1" },
            { name: "SP136 FARBA SICO SICOPRINT NIEBIESKA FLUO 1L", code: "SFRG/SP136-SICOPRINT/SIC/1", fullCode: "SFRG/SP136-SICOPRINT/SIC/1" },
            { name: "SP135 FARBA SICO SICOPRINT ZIELONA FLUO 1L", code: "SFRG/SP135-SICOPRINT/SIC/1", fullCode: "SFRG/SP135-SICOPRINT/SIC/1" },
            { name: "SP134 FARBA SICO SICOPRINT RÓŻOWA FLUO 1L", code: "SFRG/SP134-SICOPRINT/SIC/1", fullCode: "SFRG/SP134-SICOPRINT/SIC/1" },
            { name: "SP133 FARBA SICO SICOPRINT CZERWONA FLUO 1L", code: "SFRG/SP133-SICOPRINT/SIC/1", fullCode: "SFRG/SP133-SICOPRINT/SIC/1" },
            { name: "SP132 FARBA SICO SICOPRINT CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/SP132-SICOPRINT/SIC/1", fullCode: "SFRG/SP132-SICOPRINT/SIC/1" },
            { name: "SP130 FARBA SICO SICOPRINT ŻÓŁTA FLUO 1L", code: "SFRG/SP130-SICOPRINT/SIC/1", fullCode: "SFRG/SP130-SICOPRINT/SIC/1" },
            { name: "SP120 FARBA SICO SICOPRINT ZŁOTA 1L", code: "SFRG/SP120-SICOPRINT/SIC/1", fullCode: "SFRG/SP120-SICOPRINT/SIC/1" },
            { name: "SP110 FARBA SICO SICOPRINT SREBRNA 1L", code: "SFRG/SP110-SICOPRINT/SIC/1", fullCode: "SFRG/SP110-SICOPRINT/SIC/1" },
            { name: "SP10 FARBA SICO SICOPRINT FIOLETOWA 1L", code: "SFRG/SP10-SICOPRINT/SIC/1", fullCode: "SFRG/SP10-SICOPRINT/SIC/1" },
            { name: "SP100 FARBA SICO SICOPRINT CZARNA 1L", code: "SFRG/SP100-SICOPRINT/SIC/1", fullCode: "SFRG/SP100-SICOPRINT/SIC/1" },
            { name: "SN91 FARBA SICO SICONYL BIAŁA KRYJĄCA 1L", code: "SFRG/SN91-SICONYL/SIC/1", fullCode: "SFRG/SN91-SICONYL/SIC/1" },
            { name: "SN90 FARBA SICO SICONYL BIAŁA 1L", code: "SFRG/SN90-SICONYL/SIC/1", fullCode: "SFRG/SN90-SICONYL/SIC/1" },
            { name: "SN82 FARBA SICO SICONYL BEŻOWA 1L", code: "SFRG/SN82-SICONYL/SIC/1", fullCode: "SFRG/SN82-SICONYL/SIC/1" },
            { name: "SN81 FARBA SICO SICONYL BRĄZOWA 1L", code: "SFRG/SN81-SICONYL/SIC/1", fullCode: "SFRG/SN81-SICONYL/SIC/1" },
            { name: "SN80 FARBA SICO SICONYL JASNOBRĄZOWA 1L", code: "SFRG/SN80-SICONYL/SIC/1", fullCode: "SFRG/SN80-SICONYL/SIC/1" },
            { name: "SN75 FARBA SICO SICONYL MAGENTA BAZA 1L", code: "SFRG/SN75-SICONYL/SIC/1", fullCode: "SFRG/SN75-SICONYL/SIC/1" },
            { name: "SN70 FARBA SICO SICONYL MAGENTA 1L", code: "SFRG/SN70-SICONYL/SIC/1", fullCode: "SFRG/SN70-SICONYL/SIC/1" },
            { name: "SN70/7 FARBA SICO SICONYL MAGENTA RUBINE RED C 1L", code: "SFRG/SN70-7-SICONYL/SIC/1", fullCode: "SFRG/SN70-7-SICONYL/SIC/1" },
            { name: "SN65 FARBA SICO SICONYL CZERWONA BAZA 1L", code: "SFRG/SN65-SICONYL/SIC/1", fullCode: "SFRG/SN65-SICONYL/SIC/1" },
            { name: "SN61 FARBA SICO SICONYL CIEMNOCZERWONA 1L", code: "SFRG/SN61-SICONYL/SIC/1", fullCode: "SFRG/SN61-SICONYL/SIC/1" },
            { name: "SN60 FARBA SICO SICONYL CZERWONA 1L", code: "SFRG/SN60-SICONYL/SIC/1", fullCode: "SFRG/SN60-SICONYL/SIC/1" },
            { name: "SN56 FARBA SICO SICONYL JASNOCZERWONA 1L", code: "SFRG/SN56-SICONYL/SIC/1", fullCode: "SFRG/SN56-SICONYL/SIC/1" },
            { name: "SN55 FARBA SICO SICONYL POMARAŃCZOWA BAZA 1L", code: "SFRG/SN55-SICONYL/SIC/1", fullCode: "SFRG/SN55-SICONYL/SIC/1" },
            { name: "SN51 FARBA SICO SICONYL POMARAŃCZOWA 1L", code: "SFRG/SN51-SICONYL/SIC/1", fullCode: "SFRG/SN51-SICONYL/SIC/1" },
            { name: "SN50 FARBA SICO SICONYL JASNOPOMARAŃCZOWA 1L", code: "SFRG/SN50-SICONYL/SIC/1", fullCode: "SFRG/SN50-SICONYL/SIC/1" },
            { name: "SN42 FARBA SICO SICONYL CIEMNOŻÓŁTA 1L", code: "SFRG/SN42-SICONYL/SIC/1", fullCode: "SFRG/SN42-SICONYL/SIC/1" },
            { name: "SN41 FARBA SICO SICONYL ŻÓŁTA 1L", code: "SFRG/SN41-SICONYL/SIC/1", fullCode: "SFRG/SN41-SICONYL/SIC/1" },
            { name: "SN40 FARBA SICO SICONYL CYTRYNOWA 1L", code: "SFRG/SN40-SICONYL/SIC/1", fullCode: "SFRG/SN40-SICONYL/SIC/1" },
            { name: "SN35 FARBA SICO SICONYL ZIELONA BAZA 1L", code: "SFRG/SN35-SICONYL/SIC/1", fullCode: "SFRG/SN35-SICONYL/SIC/1" },
            { name: "SN33 FARBA SICO SICONYL ZIELONA 1L", code: "SFRG/SN33-SICONYL/SIC/1", fullCode: "SFRG/SN33-SICONYL/SIC/1" },
            { name: "SN32 FARBA SICO SICONYL JASNOZIELONA 1L", code: "SFRG/SN32-SICONYL/SIC/1", fullCode: "SFRG/SN32-SICONYL/SIC/1" },
            { name: "SN31 FARBA SICO SICONYL ZIELONA 1L", code: "SFRG/SN31-SICONYL/SIC/1", fullCode: "SFRG/SN31-SICONYL/SIC/1" },
            { name: "SN30 FARBA SICO SICONYL CIEMNOZIELONA 1L", code: "SFRG/SN30-SICONYL/SIC/1", fullCode: "SFRG/SN30-SICONYL/SIC/1" },
            { name: "SN27 FARBA SICO SICONYL TURKUSOWA 1L", code: "SFRG/SN27-SICONYL/SIC/1", fullCode: "SFRG/SN27-SICONYL/SIC/1" },
            { name: "SN26 FARBA SICO SICONYL JASNONIEBIESKA 1L", code: "SFRG/SN26-SICONYL/SIC/1", fullCode: "SFRG/SN26-SICONYL/SIC/1" },
            { name: "SN26/7 FARBA SICO SICONYL PROCESS BLUE 1L", code: "SFRG/SN26-7-SICONYL/SIC/1", fullCode: "SFRG/SN26-7-SICONYL/SIC/1" },
            { name: "SN25 FARBA SICO SICONYL NIEBIESKA BAZA 1L", code: "SFRG/SN25-SICONYL/SIC/1", fullCode: "SFRG/SN25-SICONYL/SIC/1" },
            { name: "SN24 FARBA SICO SICONYL CIEMNONIEBIESKA 1L", code: "SFRG/SN24-SICONYL/SIC/1", fullCode: "SFRG/SN24-SICONYL/SIC/1" },
            { name: "SN22 FARBA SICO SICONYL ULTRAMARYNA 1L", code: "SFRG/SN22-SICONYL/SIC/1", fullCode: "SFRG/SN22-SICONYL/SIC/1" },
            { name: "SN20 FARBA SICO SICONYL GRANATOWA 1L", code: "SFRG/SN20-SICONYL/SIC/1", fullCode: "SFRG/SN20-SICONYL/SIC/1" },
            { name: "SN20/B FARBA SICO SICONYL REFLEX BLUE 1L", code: "SFRG/SN20-B-SICONYL/SIC/1", fullCode: "SFRG/SN20-B-SICONYL/SIC/1" },
            { name: "SN15 FARBA SICO SICONYL FIOLETOWA BAZA 1L", code: "SFRG/SN15-SICONYL/SIC/1", fullCode: "SFRG/SN15-SICONYL/SIC/1" },
            { name: "SN150 BAZA TRANSPARENTNA SICO SICONYL 1L", code: "SFRG/SN150-SICONYL/SIC/1", fullCode: "SFRG/SN150-SICONYL/SIC/1" },
            { name: "SN143 FARBA SICO SICONYL CZARNA TRIADA 1L", code: "SFRG/SN143-SICONYL/SIC/1", fullCode: "SFRG/SN143-SICONYL/SIC/1" },
            { name: "SN142 FARBA SICO SICONYL MAGENTA TRIADA 1L", code: "SFRG/SN142-SICONYL/SIC/1", fullCode: "SFRG/SN142-SICONYL/SIC/1" },
            { name: "SN141 FARBA SICO SICONYL NIEBIESKA TRIADA 1L", code: "SFRG/SN141-SICONYL/SIC/1", fullCode: "SFRG/SN141-SICONYL/SIC/1" },
            { name: "SN140 FARBA SICO SICONYL ŻÓŁTA TRIADA 1L", code: "SFRG/SN140-SICONYL/SIC/1", fullCode: "SFRG/SN140-SICONYL/SIC/1" },
            { name: "SN135 FARBA SICO SICONYL ZIELONA FLUO 1L", code: "SFRG/SN135-SICONYL/SIC/1", fullCode: "SFRG/SN135-SICONYL/SIC/1" },
            { name: "SN133 FARBA SICO SICONYL CZERWONA FLUO 1L", code: "SFRG/SN133-SICONYL/SIC/1", fullCode: "SFRG/SN133-SICONYL/SIC/1" },
            { name: "SN132 FARBA SICO SICONYL CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/SN132-SICONYL/SIC/1", fullCode: "SFRG/SN132-SICONYL/SIC/1" },
            { name: "SN131 FARBA SICO SICONYL JASNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/SN131-SICONYL/SIC/1", fullCode: "SFRG/SN131-SICONYL/SIC/1" },
            { name: "SN130 FARBA SICO SICONYL ŻÓŁTA FLUO 1L", code: "SFRG/SN130-SICONYL/SIC/1", fullCode: "SFRG/SN130-SICONYL/SIC/1" },
            { name: "SN120 FARBA SICO SICONYL ZŁOTA 1L", code: "SFRG/SN120-SICONYL/SIC/1", fullCode: "SFRG/SN120-SICONYL/SIC/1" },
            { name: "SN110 FARBA SICO SICONYL SREBRNA 1L", code: "SFRG/SN110-SICONYL/SIC/1", fullCode: "SFRG/SN110-SICONYL/SIC/1" },
            { name: "SN10 FARBA SICO SICONYL FIOLETOWA 1L", code: "SFRG/SN10-SICONYL/SIC/1", fullCode: "SFRG/SN10-SICONYL/SIC/1" },
            { name: "SN100 FARBA SICO SICONYL CZARNA 1L", code: "SFRG/SN100-SICONYL/SIC/1", fullCode: "SFRG/SN100-SICONYL/SIC/1" },
            { name: "QS91 FARBA SICO QUICKSET BIAŁA KRYJĄCA 1L", code: "SFRG/QS91-QUICKSET/SIC/1", fullCode: "SFRG/QS91-QUICKSET/SIC/1" },
            { name: "QS150 LAKIER SICO QUICKSET 1L", code: "SFRG/QS150-QUICKSET/SIC/1", fullCode: "SFRG/QS150-QUICKSET/SIC/1" },
            { name: "QS100 FARBA SICO QUICKSET CZARNA 1L", code: "SFRG/QS100-QUICKSET/SIC/1", fullCode: "SFRG/QS100-QUICKSET/SIC/1" },
            { name: "PX91 FARBA SICO SICEPOX BIAŁA KRYJĄCA 1L", code: "SFRG/PX91-SICEPOX/SIC/1", fullCode: "SFRG/PX91-SICEPOX/SIC/1" },
            { name: "PX90 FARBA SICO SICEPOX BIAŁA 1L", code: "SFRG/PX90-SICEPOX/SIC/1", fullCode: "SFRG/PX90-SICEPOX/SIC/1" },
            { name: "PX60 FARBA SICO SICEPOX CZERWONA 1L", code: "SFRG/PX60-SICEPOX/SIC/1", fullCode: "SFRG/PX60-SICEPOX/SIC/1" },
            { name: "PX42 FARBA SICO SICEPOX CIEMNOŻÓŁTA 1L", code: "SFRG/PX42-SICEPOX/SIC/1", fullCode: "SFRG/PX42-SICEPOX/SIC/1" },
            { name: "PX24 FARBA SICO SICEPOX NIEBIESKA 1L", code: "SFRG/PX24-SICEPOX/SIC/1", fullCode: "SFRG/PX24-SICEPOX/SIC/1" },
            { name: "PX22 FARBA SICO SICEPOX ULTRAMARYNA 1L", code: "SFRG/PX22-SICEPOX/SIC/1", fullCode: "SFRG/PX22-SICEPOX/SIC/1" },
            { name: "PX150 BAZA TRANSPARENTNA SICO SICEPOX 1L", code: "SFRG/PX150-SICEPOX/SIC/1", fullCode: "SFRG/PX150-SICEPOX/SIC/1" },
            { name: "PX143 FARBA SICO SICEPOX CZARNA 1L", code: "SFRG/PX143-SICEPOX/SIC/1", fullCode: "SFRG/PX143-SICEPOX/SIC/1" },
            { name: "PX142 FARBA SICO SICEPOX MAGENTA 1L", code: "SFRG/PX142-SICEPOX/SIC/1", fullCode: "SFRG/PX142-SICEPOX/SIC/1" },
            { name: "PX141 FARBA SICO SICEPOX NIEBIESKA 1L", code: "SFRG/PX141-SICEPOX/SIC/1", fullCode: "SFRG/PX141-SICEPOX/SIC/1" },
            { name: "PX140 FARBA SICO SICEPOX ŻÓŁTA 1L", code: "SFRG/PX140-SICEPOX/SIC/1", fullCode: "SFRG/PX140-SICEPOX/SIC/1" },
            { name: "PX110 FARBA SICO SICEPOX SREBRNA 1L", code: "SFRG/PX110-SICEPOX/SIC/1", fullCode: "SFRG/PX110-SICEPOX/SIC/1" },
            { name: "PX100 FARBA SICO SICEPOX CZARNA 1L", code: "SFRG/PX100-SICEPOX/SIC/1", fullCode: "SFRG/PX100-SICEPOX/SIC/1" },
            { name: "OTF26/74 FARBA SICO OPATEX NIEBIESKA PROCESS BLUE C 1L", code: "SFRG/OTF26-74-OPATEX/SIC/1", fullCode: "SFRG/OTF26-74-OPATEX/SIC/1" },
            { name: "OTF20/108 FARBA SICO OPATEX NIEBIESKA 288 C 1L", code: "SFRG/OTF20-108-OPATEX/SIC/1", fullCode: "SFRG/OTF20-108-OPATEX/SIC/1" },
            { name: "NST91 FARBA SICO NYLONSTAR BIAŁA KRYJĄCA 1L", code: "SFRG/NST91-NYLONSTAR/SIC/1", fullCode: "SFRG/NST91-NYLONSTAR/SIC/1" },
            { name: "NST61 FARBA SICO NYLONSTAR CZERWONA 1L", code: "SFRG/NST61-NYLONSTAR/SIC/1", fullCode: "SFRG/NST61-NYLONSTAR/SIC/1" },
            { name: "NST60 FARBA SICO NYLONSTAR CZERWONA 1L", code: "SFRG/NST60-NYLONSTAR/SIC/1", fullCode: "SFRG/NST60-NYLONSTAR/SIC/1" },
            { name: "NST51 FARBA SICO NYLONSTAR POMARAŃCZOWA 1L", code: "SFRG/NST51-NYLONSTAR/SIC/1", fullCode: "SFRG/NST51-NYLONSTAR/SIC/1" },
            { name: "NST42 FARBA SICO NYLONSTAR ŻÓŁTA 1L", code: "SFRG/NST42-NYLONSTAR/SIC/1", fullCode: "SFRG/NST42-NYLONSTAR/SIC/1" },
            { name: "NST41 FARBA SICO NYLONSTAR ŻÓŁTA 1L", code: "SFRG/NST41-NYLONSTAR/SIC/1", fullCode: "SFRG/NST41-NYLONSTAR/SIC/1" },
            { name: "NST40 FARBA SICO NYLONSTAR CYTRYNOWA 1L", code: "SFRG/NST40-NYLONSTAR/SIC/1", fullCode: "SFRG/NST40-NYLONSTAR/SIC/1" },
            { name: "NST35 FARBA SICO NYLONSTAR ZIELONA 1L", code: "SFRG/NST35-NYLONSTAR/SIC/1", fullCode: "SFRG/NST35-NYLONSTAR/SIC/1" },
            { name: "NST22 FARBA SICO NYLONSTAR ULTRAMARYNA 1L", code: "SFRG/NST22-NYLONSTAR/SIC/1", fullCode: "SFRG/NST22-NYLONSTAR/SIC/1" },
            { name: "NST20 FARBA SICO NYLONSTAR GRANATOWA 1L", code: "SFRG/NST20-NYLONSTAR/SIC/1", fullCode: "SFRG/NST20-NYLONSTAR/SIC/1" },
            { name: "NST160 BAZA SICO NYLONSTAR TRIADA 1L", code: "SFRG/NST160-NYLONSTAR/SIC/1", fullCode: "SFRG/NST160-NYLONSTAR/SIC/1" },
            { name: "NST15 FARBA SICO NYLONSTAR FIOLET BAZOWA 1L", code: "SFRG/NST15-NYLONSTAR/SIC/1", fullCode: "SFRG/NST15-NYLONSTAR/SIC/1" },
            { name: "NST143 FARBA SICO NYLONSTAR CZARNA TRIADA 1L", code: "SFRG/NST143-NYLONSTAR/SIC/1", fullCode: "SFRG/NST143-NYLONSTAR/SIC/1" },
            { name: "NST142 FARBA SICO NYLONSTAR MAGENTA TRIADA 1L", code: "SFRG/NST142-NYLONSTAR/SIC/1", fullCode: "SFRG/NST142-NYLONSTAR/SIC/1" },
            { name: "NST141 FARBA SICO NYLONSTAR NIEBIESKA TRIADA 1L", code: "SFRG/NST141-NYLONSTAR/SIC/1", fullCode: "SFRG/NST141-NYLONSTAR/SIC/1" },
            { name: "NST140 FARBA SICO NYLONSTAR ŻÓŁTA TRIADA 1L", code: "SFRG/NST140-NYLONSTAR/SIC/1", fullCode: "SFRG/NST140-NYLONSTAR/SIC/1" },
            { name: "NST120 FARBA SICO NYLONSTAR RICH GOLD 1L", code: "SFRG/NST120-NYLONSTAR/SIC/1", fullCode: "SFRG/NST120-NYLONSTAR/SIC/1" },
            { name: "NST110 REFLECTIVE FARBA SICO NYLONSTAR SREBRNA 1L", code: "SFRG/NST110-REF-NYLONSTAR/SIC/1", fullCode: "SFRG/NST110-REF-NYLONSTAR/SIC/1" },
            { name: "NST110 FARBA SICO NYLONSTAR ALUMINIUM 1L", code: "SFRG/NST110-NYLONSTAR/SIC/1", fullCode: "SFRG/NST110-NYLONSTAR/SIC/1" },
            { name: "EVS91 FARBA SICO EVASTAR BIAŁA 1L", code: "SFRG/EVS91-EVASTAR/SIC/1", fullCode: "SFRG/EVS91-EVASTAR/SIC/1" },
            { name: "ECVF91 FARBA SICO VEHICLE BIAŁA KRYJĄCA 1L", code: "SFRG/ECVF91-VEHICLE/SIC/1", fullCode: "SFRG/ECVF91-VEHICLE/SIC/1" },
            { name: "ECVF90 FARBA SICO VEHICLE BIAŁA 1L", code: "SFRG/ECVF90-VEHICLE/SIC/1", fullCode: "SFRG/ECVF90-VEHICLE/SIC/1" },
            { name: "ECVF60 FARBA SICO VEHICLE CZERWONA 1L", code: "SFRG/ECVF60-VEHICLE/SIC/1", fullCode: "SFRG/ECVF60-VEHICLE/SIC/1" },
            { name: "ECVF41 FARBA SICO VEHICLE ŻÓŁTA 1L", code: "SFRG/ECVF41-VEHICLE/SIC/1", fullCode: "SFRG/ECVF41-VEHICLE/SIC/1" },
            { name: "ECVF20 FARBA SICO VEHICLE GRANATOWA 1 L", code: "SFRG/ECVF20-VEHICLE/SIC/1", fullCode: "SFRG/ECVF20-VEHICLE/SIC/1" },
            { name: "ECVF120 FARBA SICO VEHICLE ZŁOTA 1L", code: "SFRG/ECVF120-VEHICLE/SIC/1", fullCode: "SFRG/ECVF120-VEHICLE/SIC/1" },
            { name: "ECVF110 FARBA SICO VEHICLE SREBRNA 1L", code: "SFRG/ECVF110-VEHICLE/SIC/1", fullCode: "SFRG/ECVF110-VEHICLE/SIC/1" },
            { name: "ECVF100 FARBA SICO VEHICLE CZARNA 1L", code: "SFRG/ECVF100-VEHICLE/SIC/1", fullCode: "SFRG/ECVF100-VEHICLE/SIC/1" },
            { name: "ECP COOL GRAY 8 MORE OPAQUE FARBA SICO EURECO 1L", code: "SFRG/ECP-COOL-GRAY-8-MO-EURECO/SIC/2", fullCode: "SFRG/ECP-COOL-GRAY-8-MO-EURECO/SIC/2" },
            { name: "ECP61/15 FARBA SICO EURECO PANTONE RUBIN RED C 1L", code: "SFRG/ECP61-15-EURECO/SIC/1", fullCode: "SFRG/ECP61-15-EURECO/SIC/1" },
            { name: "ECP60/38 FARBA SICO EURECO PANTONE 032C 1L", code: "SFRG/ECP60-38-EURECO/SIC/1", fullCode: "SFRG/ECP60-38-EURECO/SIC/1" },
            { name: "ECP56/7 FARBA SICO EURECO PANTONE WARM RED C 1L", code: "SFRG/ECP56-7-EURECO/SIC/1", fullCode: "SFRG/ECP56-7-EURECO/SIC/1" },
            { name: "ECP26/2 FARBA SICO EURECO PANTONE PROCESS BLUE 1L", code: "SFRG/ECP26-2-EURECO/SIC/1", fullCode: "SFRG/ECP26-2-EURECO/SIC/1" },
            { name: "ECP20/5 FARBA SICO EURECO PANTONE 072C 1L", code: "SFRG/ECP20-5-EURECO/SIC/1", fullCode: "SFRG/ECP20-5-EURECO/SIC/1" },
            { name: "ECG91 FARBA SICO EURECO BIAŁA KRYJĄCA 1L", code: "SFRG/ECG91-EURECO/SIC/1", fullCode: "SFRG/ECG91-EURECO/SIC/1" },
            { name: "ECG61 FARBA SICO EURECO CZERWONA 1L", code: "SFRG/ECG61-EURECO/SIC/1", fullCode: "SFRG/ECG61-EURECO/SIC/1" },
            { name: "ECG56 FARBA SICO EURECO CZERWONA 1L", code: "SFRG/ECG56-EURECO/SIC/1", fullCode: "SFRG/ECG56-EURECO/SIC/1" },
            { name: "ECG41 FARBA SICO EURECO ŻÓŁTA 1L", code: "SFRG/ECG41-EURECO/SIC/1", fullCode: "SFRG/ECG41-EURECO/SIC/1" },
            { name: "ECG40 FARBA SICO EURECO CYTRYNOWA 1L", code: "SFRG/ECG40-EURECO/SIC/1", fullCode: "SFRG/ECG40-EURECO/SIC/1" },
            { name: "ECG24 FARBA SICO EURECO NIEBIESKA 1L", code: "SFRG/ECG24-EURECO/SIC/1", fullCode: "SFRG/ECG24-EURECO/SIC/1" },
            { name: "EC91 TV FARBA SICO EURECO BIAŁA KRYJĄCA WERSJA GĘSTA 1L", code: "SFRG/EC91TV-EURECO/SIC/1", fullCode: "SFRG/EC91TV-EURECO/SIC/1" },
            { name: "EC91 MORE OPAQUE FARBA SICO EURECO BIAŁA SUPER KRYJĄCA 1L", code: "SFRG/EC91-MO-EURECO/SIC/1", fullCode: "SFRG/EC91-MO-EURECO/SIC/1" },
            { name: "EC91 FARBA SICO EURECO BIAŁA KRYJĄCA 1L", code: "SFRG/EC91-EURECO/SIC/1", fullCode: "SFRG/EC91-EURECO/SIC/1" },
            { name: "EC90 FARBA SICO EURECO BIAŁA 1L", code: "SFRG/EC90-EURECO/SIC/1", fullCode: "SFRG/EC90-EURECO/SIC/1" },
            { name: "EC82 FARBA SICO EURECO BEŻOWA 1L", code: "SFRG/EC82-EURECO/SIC/1", fullCode: "SFRG/EC82-EURECO/SIC/1" },
            { name: "EC81 FARBA SICO EURECO BRĄZOWA 1L", code: "SFRG/EC81-EURECO/SIC/1", fullCode: "SFRG/EC81-EURECO/SIC/1" },
            { name: "EC80 FARBA SICO EURECO JASNOBRĄZOWA 1L", code: "SFRG/EC80-EURECO/SIC/1", fullCode: "SFRG/EC80-EURECO/SIC/1" },
            { name: "EC75 FARBA SICO EURECO MAGENTA BAZOWA 1L", code: "SFRG/EC75-EURECO/SIC/1", fullCode: "SFRG/EC75-EURECO/SIC/1" },
            { name: "EC70 FABA SICO EURECO MAGENTA 1L", code: "SFRG/EC70-EURECO/SIC/1", fullCode: "SFRG/EC70-EURECO/SIC/1" },
            { name: "EC70/207 FARBA SICO EURECO MAGENTA PURPLE C 1L", code: "SFRG/EC70-207-EURECO/SIC/1", fullCode: "SFRG/EC70-207-EURECO/SIC/1" },
            { name: "EC65 FARBA SICO EURECO CZERWONA BAZOWA 1L", code: "SFRG/EC65-EURECO/SIC/1", fullCode: "SFRG/EC65-EURECO/SIC/1" },
            { name: "EC61 FARBA SICO EURECO CIEMNOCZERWONA 1L", code: "SFRG/EC61-EURECO/SIC/1", fullCode: "SFRG/EC61-EURECO/SIC/1" },
            { name: "EC61/196 FARBA SICO EURECO CZERWONA RAL 3000 1L", code: "SFRG/EC61-196-EURECO/SIC/1", fullCode: "SFRG/EC61-196-EURECO/SIC/1" },
            { name: "EC61/15 FARBA SICO EURECO PANTONE RUBIN RED C 1L", code: "SFRG/EC61-15-EURECO/SIC/1", fullCode: "SFRG/EC61-15-EURECO/SIC/1" },
            { name: "EC60 FARBA SICO EURECO CZERWONA 1L", code: "SFRG/EC60-EURECO/SIC/1", fullCode: "SFRG/EC60-EURECO/SIC/1" },
            { name: "EC60/87 FARBA SICO EURECO CZERWONA 185 1L", code: "SFRG/EC60-87-EURECO/SIC/1", fullCode: "SFRG/EC60-87-EURECO/SIC/1" },
            { name: "EC56 FARBA SICO EURECO JASNOCZERWONA 1L", code: "SFRG/EC56-EURECO/SIC/1", fullCode: "SFRG/EC56-EURECO/SIC/1" },
            { name: "EC55 FARBA SICO EURECO POMARAŃCZOWA BAZA 1L", code: "SFRG/EC55-EURECO/SIC/1", fullCode: "SFRG/EC55-EURECO/SIC/1" },
            { name: "EC51 FARBA SICO EURECO POMARAŃCZOWA 1L", code: "SFRG/EC51-EURECO/SIC/1", fullCode: "SFRG/EC51-EURECO/SIC/1" },
            { name: "EC50 FARBA SICO EURECO JASNOPOMARAŃCZOWA 1L", code: "SFRG/EC50-EURECO/SIC/1", fullCode: "SFRG/EC50-EURECO/SIC/1" },
            { name: "EC50/74 FARBA SICO EURECO POMARAŃCZOWA 1505 C 1L", code: "SFRG/EC50-74-EURECO/SIC/1", fullCode: "SFRG/EC50-74-EURECO/SIC/1" },
            { name: "EC42 FARBA SICO EURECO CIEMNOŻÓŁTA 1L", code: "SFRG/EC42-EURECO/SIC/1", fullCode: "SFRG/EC42-EURECO/SIC/1" },
            { name: "EC41 FARBA SICO EURECO ŻÓŁTA 1L", code: "SFRG/EC41-EURECO/SIC/1", fullCode: "SFRG/EC41-EURECO/SIC/1" },
            { name: "EC40 FARBA SICO EURECO CYTRYNOWA 1L", code: "SFRG/EC40-EURECO/SIC/1", fullCode: "SFRG/EC40-EURECO/SIC/1" },
            { name: "EC35 FARBA SICO EURECO ZIELONA BAZA 1L", code: "SFRG/EC35-EURECO/SIC/1", fullCode: "SFRG/EC35-EURECO/SIC/1" },
            { name: "EC33 FARBA SICO EURECO ZIELONA 1L", code: "SFRG/EC33-EURECO/SIC/1", fullCode: "SFRG/EC33-EURECO/SIC/1" },
            { name: "EC32 FARBA SICO EURECO JASNOZIELONA 1L", code: "SFRG/EC32-EURECO/SIC/1", fullCode: "SFRG/EC32-EURECO/SIC/1" },
            { name: "EC31 FARBA SICO EURECO ZIELONA 1L", code: "SFRG/EC31-EURECO/SIC/1", fullCode: "SFRG/EC31-EURECO/SIC/1" },
            { name: "EC30 FARBA SICO EURECO CIEMNOZIELONA 1L", code: "SFRG/EC30-EURECO/SIC/1", fullCode: "SFRG/EC30-EURECO/SIC/1" },
            { name: "EC27 FARBA SICO EURECO TURKUSOWA 1L", code: "SFRG/EC27-EURECO/SIC/1", fullCode: "SFRG/EC27-EURECO/SIC/1" },
            { name: "EC26 FARBA SICO EURECO JASNONIEBIESKA 1L", code: "SFRG/EC26-EURECO/SIC/1", fullCode: "SFRG/EC26-EURECO/SIC/1" },
            { name: "EC25 FARBA SICO EURECO NIEBIESKA BAZOWA 1L", code: "SFRG/EC25-EURECO/SIC/1", fullCode: "SFRG/EC25-EURECO/SIC/1" },
            { name: "EC24 FARBA SICO EURECO NIEBIESKA 1L", code: "SFRG/EC24-EURECO/SIC/1", fullCode: "SFRG/EC24-EURECO/SIC/1" },
            { name: "EC24/213 FARBA SICO EURECO NIEBIESKA 2935 C 1L", code: "SFRG/EC24-213-EURECO/SIC/1", fullCode: "SFRG/EC24-213-EURECO/SIC/1" },
            { name: "EC23 FARBA SICO EURECO NIEBIESKA BAZA 1L", code: "SFRG/EC23-EURECO/SIC/1", fullCode: "SFRG/EC23-EURECO/SIC/1" },
            { name: "EC22 FARBA SICO EURECO ULTRAMARYNA 1L", code: "SFRG/EC22-EURECO/SIC/1", fullCode: "SFRG/EC22-EURECO/SIC/1" },
            { name: "EC20 FARBA SICO EURECO GRANATOWA 1L", code: "SFRG/EC20-EURECO/SIC/1", fullCode: "SFRG/EC20-EURECO/SIC/1" },
            { name: "EC20/B FARBA SICO EURECO REFLEX BLUE 1L", code: "SFRG/EC20-B-EURECO/SIC/1", fullCode: "SFRG/EC20-B-EURECO/SIC/1" },
            { name: "EC15 FARBA SICO EURECO FIOLET BAZOWA 1L", code: "SFRG/EC15-EURECO/SIC/1", fullCode: "SFRG/EC15-EURECO/SIC/1" },
            { name: "EC143 FARBA SICO EURECO CZARNA TRIADA 1L", code: "SFRG/EC143-EURECO/SIC/1", fullCode: "SFRG/EC143-EURECO/SIC/1" },
            { name: "EC142/2 FARBA EURECO MAGENTA TRIADA INTENSIVE 1L", code: "SFRG/EC142-2-EURECO/SIC/1", fullCode: "SFRG/EC142-2-EURECO/SIC/1" },
            { name: "EC141 FARBA SICO EURECO NIEBIESKA TRIADA 1L", code: "SFRG/EC141-EURECO/SIC/1", fullCode: "SFRG/EC141-EURECO/SIC/1" },
            { name: "EC140 FARBA SICO EURECO ŻÓŁTA TRIADA 1L", code: "SFRG/EC140-EURECO/SIC/1", fullCode: "SFRG/EC140-EURECO/SIC/1" },
            { name: "EC138 FARBA EURECO FOTOLUMINESCENCYJNA 1L", code: "SFRG/EC138-EURECO/SIC/1", fullCode: "SFRG/EC138-EURECO/SIC/1" },
            { name: "EC137 FARBA SICO EURECO ODBLASKOWA 1L", code: "SFRG/EC137-EURECO/SIC/1", fullCode: "SFRG/EC137-EURECO/SIC/1" },
            { name: "EC137/3 FARBA SICO EURECO ODBLASKOWA 1L", code: "SFRG/EC137-3-EURECO/SIC/1", fullCode: "SFRG/EC137-3-EURECO/SIC/1" },
            { name: "EC136 FARBA SICO EURECO NIEBIESKA FLUO 1L", code: "SFRG/EC136-EURECO/SIC/1", fullCode: "SFRG/EC136-EURECO/SIC/1" },
            { name: "EC135 FARBA SICO EURECO FLUO ZIELONA 1L", code: "SFRG/EC135-EURECO/SIC/1", fullCode: "SFRG/EC135-EURECO/SIC/1" },
            { name: "EC134 FARBA SICO EURECO RÓŻOWA FLUO 1L", code: "SFRG/EC134-EURECO/SIC/1", fullCode: "SFRG/EC134-EURECO/SIC/1" },
            { name: "EC133 FARBA SICO EURECO CZERWONA FLUO 1L", code: "SFRG/EC133-EURECO/SIC/1", fullCode: "SFRG/EC133-EURECO/SIC/1" },
            { name: "EC132 FARBA SICO EURECO CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/EC132-EURECO/SIC/1", fullCode: "SFRG/EC132-EURECO/SIC/1" },
            { name: "EC131 FARBA SICO EURECO JASNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/EC131-EURECO/SIC/1", fullCode: "SFRG/EC131-EURECO/SIC/1" },
            { name: "EC130 FARBA SICO EURECO ŻÓŁTA FLUO 1L", code: "SFRG/EC130-EURECO/SIC/1", fullCode: "SFRG/EC130-EURECO/SIC/1" },
            { name: "EC120 FARBA SICO EURECO ZŁOTA 1L", code: "SFRG/EC120-EURECO/SIC/1", fullCode: "SFRG/EC120-EURECO/SIC/1" },
            { name: "EC120/48 FARBA SICO EURECO ZŁOTA PANTONE 871 C 1L", code: "SFRG/EC120-48-EURECO/SIC/1", fullCode: "SFRG/EC120-48-EURECO/SIC/1" },
            { name: "EC110 MORE OPAQUE FARBA SICO EURECO SREBRNA KRYJĄCA 1L", code: "SFRG/EC110-MO-EURECO/SIC/1", fullCode: "SFRG/EC110-MO-EURECO/SIC/1" },
            { name: "EC110 FARBA SICO EURECO SREBRNA 1L", code: "SFRG/EC110-EURECO/SIC/1", fullCode: "SFRG/EC110-EURECO/SIC/1" },
            { name: "EC110/2 FARBA SICO EURECO BIAŁA PERLISTA 1L", code: "SFRG/EC110-2-EURECO/SIC/1", fullCode: "SFRG/EC110-2-EURECO/SIC/1" },
            { name: "EC10 FARBA SICO EURECO FIOLETOWA 1L", code: "SFRG/EC10-EURECO/SIC/1", fullCode: "SFRG/EC10-EURECO/SIC/1" },
            { name: "EC10/154 FARBA SICO EURECO FIOLETOWA PANTONE 2116 C 1L", code: "SFRG/EC10-154-EURECO/SIC/1", fullCode: "SFRG/EC10-154-EURECO/SIC/1" },
            { name: "EC100 FARBA SICO EURECO CZARNA 1L", code: "SFRG/EC100-EURECO/SIC/1", fullCode: "SFRG/EC100-EURECO/SIC/1" },
            { name: "EC100/458 FARBA SICO EURECO SZARA COOL GREY 10 C 1L", code: "SFRG/EC100-458-EURECO/SIC/1", fullCode: "SFRG/EC100-458-EURECO/SIC/1" },
            { name: "CFP7031 FARBA SICO CARTOFLEX PANTON RUBINE RED C 1L", code: "SFRG/CFP7031-CARTOFLEX/SIC/1", fullCode: "SFRG/CFP7031-CARTOFLEX/SIC/1" },
            { name: "CFP56/18 FARBA SICO CARTOFLEX PANTONE 032C 1L", code: "SFRG/CFP56-18-CARTOFLEX/SIC/1", fullCode: "SFRG/CFP56-18-CARTOFLEX/SIC/1" },
            { name: "CFP56/12 FARBA SICO CARTOFLEX WARM RED 1L", code: "SFRG/CFP56-12-CARTOFLEX/SIC/1", fullCode: "SFRG/CFP56-12-CARTOFLEX/SIC/1" },
            { name: "CFP26/25 FARBA SICO CARTOFLEX PANTON PROCESS BLUE 1L", code: "SFRG/CFP26-25-CARTOFLEX/SIC/1", fullCode: "SFRG/CFP26-25-CARTOFLEX/SIC/1" },
            { name: "CFP2058  FABRA SICO CARTOFLEX PANTONE 072C 1L", code: "SFRG/CFP2058-CARTOFLEX/SIC/1", fullCode: "SFRG/CFP2058-CARTOFLEX/SIC/1" },
            { name: "CF91 FARBA SICO CARTOFLEX BIAŁA KRYJĄCA 1L", code: "SFRG/CF91-CARTOFLEX/SIC/1", fullCode: "SFRG/CF91-CARTOFLEX/SIC/1" },
            { name: "CF90 FARBA SICO CARTOFLEX BIAŁA 1L", code: "SFRG/CF90-CARTOFLEX/SIC/1", fullCode: "SFRG/CF90-CARTOFLEX/SIC/1" },
            { name: "CF82 FARBA SICO CARTOFLEX BEŻOWA 1L", code: "SFRG/CF82-CARTOFLEX/SIC/1", fullCode: "SFRG/CF82-CARTOFLEX/SIC/1" },
            { name: "CF81 FARBA SICO CARTOFLEX BRĄZOWA 1L", code: "SFRG/CF81-CARTOFLEX/SIC/1", fullCode: "SFRG/CF81-CARTOFLEX/SIC/1" },
            { name: "CF80 FARBY SICO CARTOFLEX JASNA BRĄZOWA 1L", code: "SFRG/CF80-CARTOFLEX/SIC/1", fullCode: "SFRG/CF80-CARTOFLEX/SIC/1" },
            { name: "CF75 FARBA SICO CARTOFLEX MAGENTA 1L", code: "SFRG/CF75-CARTOFLEX/SIC/1", fullCode: "SFRG/CF75-CARTOFLEX/SIC/1" },
            { name: "CF70 FARBA SICO CARTOFLEX MAGENTA 1L", code: "SFRG/CF70-CARTOFLEX/SIC/1", fullCode: "SFRG/CF70-CARTOFLEX/SIC/1" },
            { name: "CF70/151 FARBA SICO CARTOFLEX MAGENTA RAL 4004 1L", code: "SFRG/CF70-151-CARTOFLEX/SIC/1", fullCode: "SFRG/CF70-151-CARTOFLEX/SIC/1" },
            { name: "CF65 FARBA SICO CARTOFLEX CZERWONA BAZA 1L", code: "SFRG/CF65-CARTOFLEX/SIC/1", fullCode: "SFRG/CF65-CARTOFLEX/SIC/1" },
            { name: "CF61 FARBA SICO CARTOFLEX CIEMNOCZERWONA 1L", code: "SFRG/CF61-CARTOFLEX/SIC/1", fullCode: "SFRG/CF61-CARTOFLEX/SIC/1" },
            { name: "CF61/106 FARBA SICO CARTOFLEX CZERWONA PANTONE 1805 C 1L", code: "SFRG/CF61-106-CARTOFLEX/SIC/1", fullCode: "SFRG/CF61-106-CARTOFLEX/SIC/1" },
            { name: "CF61/105  FABRA SICO CARTOFLEX CZERWONA RAL 3003 1L", code: "SFRG/CF61-105-CARTOFLEX/SIC/1", fullCode: "SFRG/CF61-105-CARTOFLEX/SIC/1" },
            { name: "CF60 FARBA SICO CARTOFLEX CZERWONA 1L", code: "SFRG/CF60-CARTOFLEX/SIC/1", fullCode: "SFRG/CF60-CARTOFLEX/SIC/1" },
            { name: "CF56 FARBA SICO CARTOFLEX JASNOCZERWONA 1L", code: "SFRG/CF56-CARTOFLEX/SIC/1", fullCode: "SFRG/CF56-CARTOFLEX/SIC/1" },
            { name: "CF56/86 FARBA SICO CARTOFLEX CZERWONA 1L", code: "SFRG/CF56-86-CARTOFLEX/SIC/1", fullCode: "SFRG/CF56-86-CARTOFLEX/SIC/1" },
            { name: "CF55 FARBA SICO CARTOFLEX POMARAŃCZOWA BAZA 1L", code: "SFRG/CF55-CARTOFLEX/SIC/1", fullCode: "SFRG/CF55-CARTOFLEX/SIC/1" },
            { name: "CF51 FARBA SICO CARTOFLEX POMARAŃCZOWA 1L", code: "SFRG/CF51-CARTOFLEX/SIC/1", fullCode: "SFRG/CF51-CARTOFLEX/SIC/1" },
            { name: "CF50 FARBA SICO CARTOFLEX JASNOPOMARAŃCZOWA 1L", code: "SFRG/CF50-CARTOFLEX/SIC/1", fullCode: "SFRG/CF50-CARTOFLEX/SIC/1" },
            { name: "CF50/44 FARBA SICO CARTOFLEX POMARAŃCZOWA EXTRA OPAQUE 1L", code: "SFRG/CF50-44-CARTOFLEX/SIC/1", fullCode: "SFRG/CF50-44-CARTOFLEX/SIC/1" },
            { name: "CF42 FARBA SICO CARTOFLEX CIEMNOŻÓŁTA 1L", code: "SFRG/CF42-CARTOFLEX/SIC/1", fullCode: "SFRG/CF42-CARTOFLEX/SIC/1" },
            { name: "CF42/156  FABRA SICO CARTOFLEX BECZKOPOL ŻÓŁTA 1L", code: "SFRG/CF42-156-CARTOFLEX/SIC/1", fullCode: "SFRG/CF42-156-CARTOFLEX/SIC/1" },
            { name: "CF42/155  FABRA SICO CARTOFLEX ŻÓŁTA PANTONE 144C 1L (STATOIL)", code: "SFRG/CF42-155-CARTOFLEX/SIC/1", fullCode: "SFRG/CF42-155-CARTOFLEX/SIC/1" },
            { name: "CF41 FARBA SICO CARTOFLEX ŻÓŁTA 1L", code: "SFRG/CF41-CARTOFLEX/SIC/1", fullCode: "SFRG/CF41-CARTOFLEX/SIC/1" },
            { name: "CF40 FARBA SICO CARTOFLEX ŻÓŁTA 1L", code: "SFRG/CF40-CARTOFLEX/SIC/1", fullCode: "SFRG/CF40-CARTOFLEX/SIC/1" },
            { name: "CF40/48 FARBA SICO CARTOFLEX ŻÓŁTA 1L", code: "SFRG/CF40-48-CARTOFLEX/SIC/1", fullCode: "SFRG/CF40-48-CARTOFLEX/SIC/1" },
            { name: "CF35 FARBA SICO CARTOFLEX ZIELONA BAZA 1L", code: "SFRG/CF35-CARTOFLEX/SIC/1", fullCode: "SFRG/CF35-CARTOFLEX/SIC/1" },
            { name: "CF33 FARBA SICO CARTOFLEX ZIELONA 1L", code: "SFRG/CF33-CARTOFLEX/SIC/1", fullCode: "SFRG/CF33-CARTOFLEX/SIC/1" },
            { name: "CF32 FARBA SICO CARTOFLEX JASNA ZIELONA 1L", code: "SFRG/CF32-CARTOFLEX/SIC/1", fullCode: "SFRG/CF32-CARTOFLEX/SIC/1" },
            { name: "CF31 FARBA SICO CARTOFLEX ZIELONA 1L", code: "SFRG/CF31-CARTOFLEX/SIC/1", fullCode: "SFRG/CF31-CARTOFLEX/SIC/1" },
            { name: "CF31/92 FARBA SICO CARTOFLEX ZIELONA PANTONE 3288 C 1L", code: "SFRG/CF31-92-CARTOFLEX/SIC/1", fullCode: "SFRG/CF31-92-CARTOFLEX/SIC/1" },
            { name: "CF30 FARBA SICO CARTOFLEX CIEMNOZIELONA 1L", code: "SFRG/CF30-CARTOFLEX/SIC/1", fullCode: "SFRG/CF30-CARTOFLEX/SIC/1" },
            { name: "CF27 FARBA SICO CARTOFLEX TURKUSOWA 1L", code: "SFRG/CF27-CARTOFLEX/SIC/1", fullCode: "SFRG/CF27-CARTOFLEX/SIC/1" },
            { name: "CF27/103  FABRA SICO CARTOFLEX TURKUSOWA RAL 5018 1L", code: "SFRG/CF27-103-CARTOFLEX/SIC/1", fullCode: "SFRG/CF27-103-CARTOFLEX/SIC/1" },
            { name: "CF26 FARBA SICO CARTOFLEX JASNY NIEBIESKI 1L", code: "SFRG/CF26-CARTOFLEX/SIC/1", fullCode: "SFRG/CF26-CARTOFLEX/SIC/1" },
            { name: "CF25 FARBA SICO CARTOFLEX NIEBIESKA BAZA 1L", code: "SFRG/CF25-CARTOFLEX/SIC/1", fullCode: "SFRG/CF25-CARTOFLEX/SIC/1" },
            { name: "CF24 FARBA SICO CARTOFLEX NIEBIESKA 1L", code: "SFRG/CF24-CARTOFLEX/SIC/1", fullCode: "SFRG/CF24-CARTOFLEX/SIC/1" },
            { name: "CF24/116 FARBA SICO CARTOFLEX NIEBIESKA RAL 5010 1L", code: "SFRG/CF24-116-CARTOFLEX/SIC/1", fullCode: "SFRG/CF24-116-CARTOFLEX/SIC/1" },
            { name: "CF24/115  FABRA SICO CARTOFLEX NIEBIESKA PANTONE 293C 1L", code: "SFRG/CF24-115-CARTOFLEX/SIC/1", fullCode: "SFRG/CF24-115-CARTOFLEX/SIC/1" },
            { name: "CF23 FARBA SICO CARTOFLEX ULTRAMARYNA 1L", code: "SFRG/CF23-CARTOFLEX/SIC/1", fullCode: "SFRG/CF23-CARTOFLEX/SIC/1" },
            { name: "CF22 FARBA SICO CARTOFLEX ULTRAMARYNA 1L", code: "SFRG/CF22-CARTOFLEX/SIC/1", fullCode: "SFRG/CF22-CARTOFLEX/SIC/1" },
            { name: "CF20 FARBA SICO CARTOFLEX GRANATOWA 1L", code: "SFRG/CF20-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-CARTOFLEX/SIC/1" },
            { name: "CF20/B FARBA SICO CARTOFLEX REFLEX BLUE 1L", code: "SFRG/CF20-B-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-B-CARTOFLEX/SIC/1" },
            { name: "CF20/205 FARBA SICO CARTOFLEX NIEBIESKA PMS 2758 1L", code: "SFRG/CF20-205-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-205-CARTOFLEX/SIC/1" },
            { name: "CF20/204 FARBA SICO CARTOFLEX NIEBIESKA RAL 5011 1L", code: "SFRG/CF20-204-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-204-CARTOFLEX/SIC/1" },
            { name: "CF20/203 FABRA SICO CARTOFLEX BLUE METAL RAL 5026 1L", code: "SFRG/CF20-203-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-203-CARTOFLEX/SIC/1" },
            { name: "CF20/17 FARBA SICO CARTOFLEX GRANATOWA 1L", code: "SFRG/CF20-17-CARTOFLEX/SIC/1", fullCode: "SFRG/CF20-17-CARTOFLEX/SIC/1" },
            { name: "CF15 FARBA SICO CARTOFLEX FIOLET BAZOWA 1L", code: "SFRG/CF15-CARTOFLEX/SIC/1", fullCode: "SFRG/CF15-CARTOFLEX/SIC/1" },
            { name: "CF143 FARBA SICO CARTOFLEX CZARNA TRIADA 1L", code: "SFRG/CF143-CARTOFLEX/SIC/1", fullCode: "SFRG/CF143-CARTOFLEX/SIC/1" },
            { name: "CF142 FARBA SICO CARTOFLEX MAGENTA TRIADA 1L", code: "SFRG/CF142-CARTOFLEX/SIC/1", fullCode: "SFRG/CF142-CARTOFLEX/SIC/1" },
            { name: "CF141 FARBA SICO CARTOFLEX NIEBIESKA TRIADA 1L", code: "SFRG/CF141-CARTOFLEX/SIC/1", fullCode: "SFRG/CF141-CARTOFLEX/SIC/1" },
            { name: "CF140 FARBA SICO CARTOFLEX ŻÓŁTA TRIADA 1L", code: "SFRG/CF140-CARTOFLEX/SIC/1", fullCode: "SFRG/CF140-CARTOFLEX/SIC/1" },
            { name: "CF136 FARBA SICO CARTOFLEX NIEBIESKA FLUO 1L", code: "SFRG/CF136-CARTOFLEX/SIC/1", fullCode: "SFRG/CF136-CARTOFLEX/SIC/1" },
            { name: "CF135 FARBA SICO CARTOFELX ZIELONA FLUO 1L", code: "SFRG/CF135-CARTOFLEX/SIC/1", fullCode: "SFRG/CF135-CARTOFLEX/SIC/1" },
            { name: "CF134 FARBA SICO CARTOFLEX RÓŻOWA FLUO 1L", code: "SFRG/CF134-CARTOFLEX/SIC/1", fullCode: "SFRG/CF134-CARTOFLEX/SIC/1" },
            { name: "CF133 FARBA SICO CARTOFELX CZERWONA FLUO 1L", code: "SFRG/CF133-CARTOFLEX/SIC/1", fullCode: "SFRG/CF133-CARTOFLEX/SIC/1" },
            { name: "CF132 FARBA SICO CARTOFLEX CIEMNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/CF132-CARTOFLEX/SIC/1", fullCode: "SFRG/CF132-CARTOFLEX/SIC/1" },
            { name: "CF131 FARBA SICO CARTOFLEX JASNOPOMARAŃCZOWA FLUO 1L", code: "SFRG/CF131-CARTOFLEX/SIC/1", fullCode: "SFRG/CF131-CARTOFLEX/SIC/1" },
            { name: "CF130 FARBA SICO CATROFLEX ŻÓŁTA FLUO 1L", code: "SFRG/CF130-CARTOFLEX/SIC/1", fullCode: "SFRG/CF130-CARTOFLEX/SIC/1" },
            { name: "CF120 FARBA SICO CARTOFLEX ZŁOTA 1L", code: "SFRG/CF120-CARTOFLEX/SIC/1", fullCode: "SFRG/CF120-CARTOFLEX/SIC/1" },
            { name: "CF120/52 FABRA SICO CARTOFLEX ZŁOTA RAL 1036 1L", code: "SFRG/CF120-52-CARTOFLEX/SIC/1", fullCode: "SFRG/CF120-52-CARTOFLEX/SIC/1" },
            { name: "CF120/47 FARBA SICO CARTOFLEX ZŁOTA 1L", code: "SFRG/CF120-47-CARTOFLEX/SIC/1", fullCode: "SFRG/CF120-47-CARTOFLEX/SIC/1" },
            { name: "CF110 FARBA SICO CARTOFLEX SREBRNA 1L", code: "SFRG/CF110-CARTOFLEX/SIC/1", fullCode: "SFRG/CF110-CARTOFLEX/SIC/1" },
            { name: "CF10 FARBA SICO CARTOFLEX FIOLETOWA 1L", code: "SFRG/CF10-CARTOFLEX/SIC/1", fullCode: "SFRG/CF10-CARTOFLEX/SIC/1" },
            { name: "CF10/88 FARBA SICO CARTOFLEX FIOLETOWA PANTONE 7672 C 1L", code: "SFRG/CF10-88-CARTOFLEX/SIC/1", fullCode: "SFRG/CF10-88-CARTOFLEX/SIC/1" },
            { name: "CF100 FARBA SICO CARTOFLEX CZARNA 1L", code: "SFRG/CF100-CARTOFLEX/SIC/1", fullCode: "SFRG/CF100-CARTOFLEX/SIC/1" },
            { name: "ADHESIVE PROMOTOR FOR UV 150/129 SICO UVILUX 1L", code: "SFKY/ADHESIVE-PROMOTOR-UV150-129/SIC/1", fullCode: "SFKY/ADHESIVE-PROMOTOR-UV150-129/SIC/1" },
            { name: "SX81/22 FARBA SICO SICOTEX BRĄZOWA PANTONE 463C 1KG", code: "SFCY/SX81-22-463C-SICOTEX/SIC/1", fullCode: "SFCY/SX81-22-463C-SICOTEX/SIC/1" },
            { name: "SX150 MASA TRANSPARENTNA SICO SICOTEX 1L", code: "SFCY/SX150-SICOTEX/SIC/1", fullCode: "SFCY/SX150-SICOTEX/SIC/1" },
            { name: "SPTNPB PASTA PUCHNĄCA SICO SICOPLAST 1L", code: "SFCY/SPTPB-SICOPLAST/SIC/1", fullCode: "SFCY/SPTPB-SICOPLAST/SIC/1" },
            { name: "SPTNCR REDUKTOR UTWARDZALNY SICO SICOPLAST 1L", code: "SFCY/SPTNCR-SICOPLAST/SIC/1", fullCode: "SFCY/SPTNCR-SICOPLAST/SIC/1" },
            { name: "SPTN150 BAZA TRANSPARENTNA SICO SICOPLAST 1L", code: "SFCY/SPTN150-SICOPLAST/SIC/1", fullCode: "SFCY/SPTN150-SICOPLAST/SIC/1" },
            { name: "SPTN150/25 PASTA MATUJĄCA SICO SICOPLAST 1L", code: "SFCY/SPTN150-25-SICOPLAST/SIC/1", fullCode: "SFCY/SPTN150-25-SICOPLAST/SIC/1" },
            { name: "SP160 PASTA SKRACAJĄCA DO WYDRUKÓW RASTROWYCH SICO SICOPRINT 1L", code: "SFCY/SP160-SICOPRINT/SIC/1", fullCode: "SFCY/SP160-SICOPRINT/SIC/1" },
            { name: "SP150 BAZA TRANSPARENTNA SICO SICOPRINT 1L", code: "SFCY/SP150-SICOPRINT/SIC/1", fullCode: "SFCY/SP150-SICOPRINT/SIC/1" },
            { name: "SN170 OPÓŹNIACZ W ŻELU SICO SICONYL 1L", code: "SFCY/SN170-SICONYL/SIC/1", fullCode: "SFCY/SN170-SICONYL/SIC/1" },
            { name: "SN1702 OPÓŻNIACZ W ŻELU SUPERPOWOLNY SICO SICONYL 1L", code: "SFCY/SN1702-SICONYL/SIC/1", fullCode: "SFCY/SN1702-SICONYL/SIC/1" },
            { name: "SI150 LAKIER SICO VARNISH SILICONE 1KG", code: "SFCY/SI150-SILICONE/SIC/1", fullCode: "SFCY/SI150-SILICONE/SIC/1" },
            { name: "PXHPX UTWARDZACZ SICO SICEPOX 1L", code: "SFCY/PXHPX-SICEPOX/SIC/1", fullCode: "SFCY/PXHPX-SICEPOX/SIC/1" },
            { name: "PX160 PASTA DO WYDRUKÓW RASTROWYCH SICO SICEPOX 1L", code: "SFCY/PX160-SICEPOX/SIC/1", fullCode: "SFCY/PX160-SICEPOX/SIC/1" },
            { name: "PLUV160 PASTA SKRACAJĄCA SICO UVIPLAST 1L", code: "SFCY/PLUV160-UVIPLAST/SIC/1", fullCode: "SFCY/PLUV160-UVIPLAST/SIC/1" },
            { name: "PLUV150 BAZA TRANSPARENTNA SICO UVIPLAST 1L", code: "SFCY/PLUV150-UVIPLAST/SIC/1", fullCode: "SFCY/PLUV150-UVIPLAST/SIC/1" },
            { name: "PLUV150 LED BAZA TRANSPARENTNA SICO UVIPLAST 1L", code: "SFCY/PLUV150-LED-UVIPLAST/SIC/1", fullCode: "SFCY/PLUV150-LED-UVIPLAST/SIC/1" },
            { name: "PL5 VARNISH LAKIER SICO 1L", code: "SFCY/PL5-VARNISH/SIC/1", fullCode: "SFCY/PL5-VARNISH/SIC/1" },
            { name: "PIGMENT PROSZEK DO PLUV LED 110 SREBRNY SICO UVIPLAST 1KG ALUPASTA CHRX", code: "SFCY/PIGMENT-SILVER-UVIPLAST/SIC/1", fullCode: "SFCY/PIGMENT-SILVER-UVIPLAST/SIC/1" },
            { name: "PIGMENT PROSZEK DO PLUV LED 120 ZŁOTA SICO UVIPLAST GOUDPOEDER 1KG", code: "SFCY/PIGMENT-GOLD-UVIPLAST/SIC/1", fullCode: "SFCY/PIGMENT-GOLD-UVIPLAST/SIC/1" },
            { name: "OTF PUFFING BASE BAZA PUCHNĄCA SICO OPATEX 1L", code: "SFCY/OTFPB-OPATEX/SIC/1", fullCode: "SFCY/OTFPB-OPATEX/SIC/1" },
            { name: "NST150 BAZA TRANSPARENTNA SICO NYLONSTAR 1L", code: "SFCY/NST150-NYLONSTAR/SIC/1", fullCode: "SFCY/NST150-NYLONSTAR/SIC/1" },
            { name: "MP1000 PROSZEK DO MATOWANIA 1L", code: "SFCY/MP1000/SIC/1", fullCode: "SFCY/MP1000/SIC/1" },
            { name: "KULKI SZKLANE DO FARB GLASSBILLS 1KG", code: "SFCY/KULKI-GLASSBILLS/SIC/1", fullCode: "SFCY/KULKI-GLASSBILLS/SIC/1" },
            { name: "EC240 EMULSJA UNIWERSALNA SICO EURECO 1L", code: "SFCY/EC240-EURECO/SIC/1", fullCode: "SFCY/EC240-EURECO/SIC/1" },
            { name: "EC170 OPÓŹNIACZ W ŻELU SICO EURECO 1L", code: "SFCY/EC170-EURECO/SIC/1", fullCode: "SFCY/EC170-EURECO/SIC/1" },
            { name: "EC1702 OPÓŹNIACZ W ŻELU SUPERWOLNY SICO EURECO 1L", code: "SFCY/EC1702-EURECO/SIC/1", fullCode: "SFCY/EC1702-EURECO/SIC/1" },
            { name: "EC160 PASTA SKRACAJĄCA  SICO EURECO 1L", code: "SFCY/EC160-EURECO/SIC/1", fullCode: "SFCY/EC160-EURECO/SIC/1" },
            { name: "EC150 UV BLOCKER LAKIER EURECO 1L", code: "SFCY/EC150-UV-EURECO/SIC/1", fullCode: "SFCY/EC150-UV-EURECO/SIC/1" },
            { name: "EC150 BAZA TRANSPARENTNA SICO EURECO 1L", code: "SFCY/EC150-EURECO/SIC/1", fullCode: "SFCY/EC150-EURECO/SIC/1" },
            { name: "EC150/33 LAKIER ANTYPOŚLIZGOWY SICO EURECO 1L", code: "SFCY/EC150-33-EURECO/SIC/1", fullCode: "SFCY/EC150-33-EURECO/SIC/1" },
            { name: "EC1501 LAKIER WYKOŃCZENIOWY SICO EURECO 1L", code: "SFCY/EC1501-EURECO/SIC/1", fullCode: "SFCY/EC1501-EURECO/SIC/1" },
            { name: "CPV SOLVENTBASED SCREENFILLER FILLER DO FARB WODNYCH 1L", code: "SFCY/CPV-SOLVENTBASED/SIC/1", fullCode: "SFCY/CPV-SOLVENTBASED/SIC/1" },
            { name: "CF170 OPÓŹNIACZ W ŻELU SICO CARTOFLEX 1L", code: "SFCY/CF170-CARTOFLEX/SIC/1", fullCode: "SFCY/CF170-CARTOFLEX/SIC/1" },
            { name: "CF1702 OPÓŹNIACZ W ŻELU SUPERWOLNY SICO CARTOFLEX 1L", code: "SFCY/CF1702-CARTOFLEX/SIC/1", fullCode: "SFCY/CF1702-CARTOFLEX/SIC/1" },
            { name: "CF160 PASTA SKRACAJĄCA SICO CARTOFLEX 1L", code: "SFCY/CF160-CARTOFLEX/SIC/1", fullCode: "SFCY/CF160-CARTOFLEX/SIC/1" },
            { name: "CF150 BAZA TRANSPARENTNA SICO CARTOFLEX 1L", code: "SFCY/CF150-CARTOFLEX/SIC/1", fullCode: "SFCY/CF150-CARTOFLEX/SIC/1" },
            { name: "CF1501 LAKIER WYKOŃCZENIOWY SICO CARTOFLEX 1L", code: "SFCY/CF1501-CARTOFLEX/SIC/1", fullCode: "SFCY/CF1501-CARTOFLEX/SIC/1" },
            { name: "AS150 BAZA TRANSPARENTNA SICO AQUASET 1L", code: "SFCY/AS150-AQUASET/SIC/1", fullCode: "SFCY/AS150-AQUASET/SIC/1" },
            { name: "OTF110 REFLEX ALUMINIUM REFLEX op. 1 kg", code: "OTF110REFLEX", fullCode: "OTF110REFLEX" },
            { name: "AS22 FARBA SICO AQUASET ULTRAMARYNA", code: "AS22", fullCode: "AS22" },
            { name: "AS20 FARBA SICO AQUASET 072", code: "AS20/53", fullCode: "AS20/53" },
        ];

        // Функція для отримання ідентифікатора серії з коду
        function getSeriesFromCode(code) {
            if (code.startsWith("SP23")) return "SP";
            if (code.includes("SICOTEX")) return "SX";
            if (code.includes("SILICONE")) return "SI";
            if (code.includes("OPATEX")) return "OTF";
            if (code.includes("AQUASET")) return "AS";
            if (code.includes("UVIPLAST") || code.includes("PLUV")) return "PLUV";
            if (code.includes("POLYPRO") && !code.includes("UVIPLAST")) return "TPP";
            if (code.includes("QUICKSET")) return "QS";
            if (code.includes("SICEPOX")) return "PX";
            if (code.includes("NYLONSTAR")) return "NST";
            if (code.includes("EVASTAR")) return "EVS";
            if (code.includes("VEHICLE") || code.includes("ECVF")) return "ECVF";
            if (code.includes("EURECO") || code.includes("ECP") || code.includes("ECG") || code.includes("EC")) return "EC";
            if (code.includes("CARTOFLEX") || code.includes("CFP")) return "CF";
            if (code.includes("SICOPRINT")) return "SP";
            if (code.includes("SICONYL")) return "SN";
            if (code.includes("TAMPOPRINT")) return "TA";
            if (code.includes("SCRATCH")) return "SB";
            if (code.includes("UVILUX") || code.includes("UV150") || code.includes("UV110")) return "UVILUX";
            if (code.includes("TRANSFERPOWDER")) return "TRANSFER";
            if (code.includes("MTR")) return "MTR";
            if (code.includes("ADHESIVE")) return "CONTACT";
            if (code.includes("SPTNPB") || code.includes("SPTNCR") || code.includes("SPTN150") || code.includes("SPTN")) return "SPTN";
            if (code.includes("SN170") || code.includes("SN1702")) return "SN";
            if (code.includes("SI150")) return "SI";
            if (code.includes("PXHPX") || code.includes("PX160")) return "PX";
            if (code.includes("PLUV160") || code.includes("PLUV150")) return "PLUV";
            if (code.includes("MP1000")) return "MP";
            if (code.includes("KULKI")) return "GB";
            if (code.includes("EC240") || code.includes("EC170") || code.includes("EC160") || code.includes("EC150")) return "EC";
            if (code.includes("CF170") || code.includes("CF160") || code.includes("CF150")) return "CF";
            if (code.includes("AS150")) return "AS";
            if (code === "OTF110REFLEX") return "OTF";
            if (code === "AS22" || code === "AS20/53") return "AS";
            // за замовчуванням
            return "EC";
        }

        // Функція для отримання кольору з назви (для простих випадків)
        function getColorFromName(plName, code) {
            const lower = plName.toLowerCase();
            if (lower.includes("biały") || lower.includes("white") || code.includes("91") || code.includes("90")) return "#F8F8FF";
            if (lower.includes("czarny") || lower.includes("black") || code.includes("100")) return "#000000";
            if (lower.includes("czerwony") || lower.includes("red")) return "#FF0000";
            if (lower.includes("niebieski") || lower.includes("blue")) return "#0000FF";
            if (lower.includes("zielony") || lower.includes("green")) return "#008000";
            if (lower.includes("żółty") || lower.includes("yellow")) return "#FFFF00";
            if (lower.includes("pomarańczowy") || lower.includes("orange")) return "#FFA500";
            if (lower.includes("fioletowy") || lower.includes("violet")) return "#800080";
            if (lower.includes("brązowy") || lower.includes("brown")) return "#A52A2A";
            if (lower.includes("beżowy") || lower.includes("beige")) return "#F5F5DC";
            if (lower.includes("srebrny") || lower.includes("silver")) return "#C0C0C0";
            if (lower.includes("złoty") || lower.includes("gold")) return "#FFD700";
            if (lower.includes("fluo")) return "#FF00FF";
            return "#CCCCCC";
        }

        // Функція для отримання назви кольору трьома мовами (спрощено)
        function getColorNameFromCode(code) {
            // спробуємо знайти в baseColors
            const baseColor = baseColors.find(bc => code.includes(bc.code) || bc.code === code);
            if (baseColor) {
                return baseColor.name;
            }
            // якщо не знайшли, повертаємо пусті або на основі частини коду
            return { uk: "", pl: "", en: "" };
        }

        // Генерація масиву фарб
        const paints = [];
        const usedKeys = new Set();

        excelRows.forEach((row, index) => {
            const seriesId = getSeriesFromCode(row.code);
            const serie = series.find(s => s.id === seriesId) || series[0];
            const colorName = getColorNameFromCode(row.code);
            // Спроба витягти код кольору з назви (наприклад, "SX22" -> "22")
            let colorCode = "";
            const match = row.name.match(/[A-Z]+(\d+[\-\d]*)/);
            if (match) colorCode = match[1];
            else colorCode = row.code.split('/')[0];

            const displayNamePl = row.name;
            // Дуже спрощений переклад: замінюємо ключові слова
            let displayNameUk = displayNamePl
                .replace(/FARBA SICO /g, "Фарба SICO ")
                .replace(/ BIAŁA /g, " БІЛА ")
                .replace(/ CZARNA /g, " ЧОРНА ")
                .replace(/ CZERWONA /g, " ЧЕРВОНА ")
                .replace(/ NIEBIESKA /g, " СИНЯ ")
                .replace(/ ZIELONA /g, " ЗЕЛЕНА ")
                .replace(/ ŻÓŁTA /g, " ЖОВТА ")
                .replace(/ POMARAŃCZOWA /g, " ПОМАРАНЧЕВА ")
                .replace(/ FIOLETOWA /g, " ФІОЛЕТОВА ")
                .replace(/ BRĄZOWA /g, " КОРИЧНЕВА ")
                .replace(/ BEŻOWA /g, " БЕЖЕВА ")
                .replace(/ TURKUSOWA /g, " БІРЮЗОВА ")
                .replace(/ ULTRAMARYNA /g, " УЛЬТРАМАРИН ")
                .replace(/ GRANATOWA /g, " ГРАНАТОВА ")
                .replace(/ JASNO/g, " СВІТЛО-")
                .replace(/ CIEMNO/g, " ТЕМНО-")
                .replace(/ KRYJĄCA/g, " КРИЮЧА")
                .replace(/ BAZA/g, " БАЗА")
                .replace(/ LAKIER/g, " ЛАК")
                .replace(/ PROSZEK/g, " ПОРОШОК")
                .replace(/ PASTA/g, " ПАСТА")
                .replace(/ 1L/g, " 1л")
                .replace(/ 1KG/g, " 1кг");
            let displayNameEn = displayNamePl
                .replace(/FARBA SICO /g, "SICO ")
                .replace(/ BIAŁA /g, " WHITE ")
                .replace(/ CZARNA /g, " BLACK ")
                .replace(/ CZERWONA /g, " RED ")
                .replace(/ NIEBIESKA /g, " BLUE ")
                .replace(/ ZIELONA /g, " GREEN ")
                .replace(/ ŻÓŁTA /g, " YELLOW ")
                .replace(/ POMARAŃCZOWA /g, " ORANGE ")
                .replace(/ FIOLETOWA /g, " VIOLET ")
                .replace(/ BRĄZOWA /g, " BROWN ")
                .replace(/ BEŻOWA /g, " BEIGE ")
                .replace(/ TURKUSOWA /g, " TURQUOISE ")
                .replace(/ ULTRAMARYNA /g, " ULTRAMARINE ")
                .replace(/ GRANATOWA /g, " NAVY ")
                .replace(/ JASNO/g, " LIGHT ")
                .replace(/ CIEMNO/g, " DARK ")
                .replace(/ KRYJĄCA/g, " OPAQUE")
                .replace(/ BAZA/g, " BASE")
                .replace(/ LAKIER/g, " VARNISH")
                .replace(/ PROSZEK/g, " POWDER")
                .replace(/ PASTA/g, " PASTE")
                .replace(/ 1L/g, " 1L")
                .replace(/ 1KG/g, " 1KG");

            const paint = {
                id: `paint-${index + 1}`,
                name: row.name.split(' ')[0] + (row.name.includes('FARBA') ? '' : ' ' + row.name.split(' ')[0]), // умовно
                code: row.code.split('/')[0].split('-')[0], // спрощений код
                fullCode: row.fullCode,
                series: seriesId,
                category: serie.category,
                color: getColorFromName(displayNamePl, row.code),
                manufacturer: "SICO",
                article: row.fullCode,
                properties: serie.properties,
                colorCode: colorCode,
                isDefault: true,
                displayName: {
                    uk: displayNameUk,
                    pl: displayNamePl,
                    en: displayNameEn
                },
                description: {
                    uk: `Фарба серії ${serie.name.uk}. ${serie.description.uk}`,
                    pl: `Farba serii ${serie.name.pl}. ${serie.description.pl}`,
                    en: `Ink from ${serie.name.en} series. ${serie.description.en}`
                },
                fullInfo: {
                    uk: `Серія: ${serie.name.uk}, Код: ${row.code}`,
                    pl: `Seria: ${serie.name.pl}, Kod: ${row.code}`,
                    en: `Series: ${serie.name.en}, Code: ${row.code}`
                },
                colorName: {
                    uk: colorName.uk || (colorCode ? `Колір ${colorCode}` : ""),
                    pl: colorName.pl || (colorCode ? `Kolor ${colorCode}` : ""),
                    en: colorName.en || (colorCode ? `Color ${colorCode}` : "")
                }
            };
            const key = `${paint.series}_${paint.fullCode}`;
    if (!usedKeys.has(key)) {
        usedKeys.add(key);
        paints.push(paint);
    } else {
        console.log(`Дублікат пропущено: ${key}`);
    }
});
        
        // ---------- ДОДАТКИ (з попереднього файлу, якщо не увійшли до Excel) ----------
        // Тут можна додати additives, але вони вже є в paints, тому пропустимо.

        // ---------- КАТЕГОРІЇ ----------
        const categories = [
            "tworzywa sztuczne",
            "tekstylia",
            "UV",
            "papier",
            "trudne materiały",
            "kleje",
            "efekty specjalne",
            "tampodruk",
            "wałek",
            "dodatki"
        ];

        // ---------- ІНШІ ДАНІ ----------
        const units = [
            { value: "г", label: { uk: "Грами", pl: "Gramy", en: "Grams" } },
            { value: "кг", label: { uk: "Кілограми", pl: "Kilogramy", en: "Kilograms" } },
            { value: "мл", label: { uk: "Мілілітри", pl: "Mililitry", en: "Milliliters" } },
            { value: "л", label: { uk: "Літри", pl: "Litry", en: "Liters" } },
            { value: "шт", label: { uk: "Штуки", pl: "Sztuki", en: "Pieces" } },
            { value: "%", label: { uk: "Відсотки", pl: "Procenty", en: "Percent" } }
        ];
        const fileFormats = [
            { value: "json", label: "JSON", extension: ".json" },
            { value: "csv", label: "CSV", extension: ".csv" },
            { value: "excel", label: "Excel", extension: ".xlsx" },
            { value: "pdf", label: "PDF", extension: ".pdf" }
        ];
        const languages = [
            { code: "uk", name: "Українська", flag: "🇺🇦" },
            { code: "en", name: "English", flag: "🇬🇧" },
            { code: "pl", name: "Polski", flag: "🇵🇱" }
        ];
        const defaultSettings = {
            language: "uk",
            units: "grams",
            autoSave: true,
            backup: false,
            theme: "spectrum",
            catalogLayout: "classic",
            notifications: true,
            defaultCategory: "tworzywa sztuczne",
            defaultUnit: "г",
            calculationsPrecision: 2,
            defaultSeries: "EC"
        };

        console.log(`[SICOMIX] Згенеровано ${paints.length} унікальних фарб`);
        console.log(`[SICOMIX] Серій: ${series.length}`);

        return {
            paints,
            recipes: [],
            series,
            baseColors,
            additives: [], // можна додати пізніше, якщо потрібно
            categories,
            units,
            fileFormats,
            languages,
            defaultSettings
        };
    } catch (error) {
        console.error("[SICOMIX] КРИТИЧНА ПОМИЛКА в data-colors.js:", error);
        return {
            paints: [],
            recipes: [],
            series: [],
            baseColors: [],
            additives: [],
            categories: [],
            units: [],
            fileFormats: [],
            languages: [],
            defaultSettings: {}
        };
    }
})();

console.log('[SICOMIX] data-colors.js завантажено успішно, SICOMIX.data.paints.length =', SICOMIX.data?.paints?.length);
