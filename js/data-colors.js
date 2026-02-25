console.log('[SICOMIX] Завантаження data-colors.js...');

window.SICOMIX = window.SICOMIX || {};
const SICOMIX = window.SICOMIX;

SICOMIX.data = (function() {
    try {
        // ---------- БАЗОВІ СЕРІЇ (унікальні) ----------
        const baseSeries = [
            { 
                id: "EC",
                name: { uk: "EC", pl: "EC", en: "EC" },
                category: "Універсальні",
                description: {
                    uk: "Універсальна розчинникова фарба. Легка в друці, високий глянець. Підходить для самоклейних матеріалів, ПВХ, паперу, картону, лакированих металів. З додаванням 5% HEC – для поліпропілену, priplack, ABS, forex, банерів.",
                    pl: "Uniwersalna farba rozpuszczalnikowa. Łatwa w druku, wysoki połysk. Nadaje się do materiałów samoprzylepnych, PCV, papieru, tektury, metali lakierowanych. Z dodatkiem 5% HEC – do polipropylenu, priplack, ABS, forex, banerów.",
                    en: "Universal solvent-based ink. Easy to print, high gloss. Suitable for self-adhesive materials, PVC, paper, cardboard, lacquered metals. With 5% HEC additive – for polypropylene, priplack, ABS, forex, banners."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "6 хв на відкритому повітрі, миттєво в тунелі", pl: "6 min na otwartym powietrzu, natychmiastowo w tunelu", en: "6 min open air, instantly in tunnel" },
                    mesh: { uk: "P77-120 (флуо: P90T, триадні: високої щільності)", pl: "P77-120 (fluoro: P90T, triadowe: wysokiej gęstości)", en: "P77-120 (fluo: P90T, process: high density)" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "EC 1000 (швидкий), EC 2000 (нормальний), EC 3000/4000 (легке сповільнення), EC 5000 (сповільнювач), EC 8000 (дуже повільний). Для флуо: EC 1300, EC 1301. Середнє розрідження: +/-15%", pl: "EC 1000 (szybki), EC 2000 (normalny), EC 3000/4000 (lekkie spowolnienie), EC 5000 (opóźniacz), EC 8000 (bardzo wolny). Dla fluo: EC 1300, EC 1301. Średnie rozrzedzenie: +/-15%", en: "EC 1000 (fast), EC 2000 (normal), EC 3000/4000 (mild retarder), EC 5000 (retarder), EC 8000 (very slow). For fluo: EC 1300, EC 1301. Average thinning: +/-15%" },
                    additives: { uk: "EC 160 – криюча паста (20-50%); EC 150 – прозора база; EC 1501 HG – захисний лак; AS 1000 – антистатик до 5%; EC 170/1702 – сповільнювач у гелі; MP 1000 – матуючий порошок; EC 150/10 – матуюча паста; MP 3000 – загусник; HEC – затверджувач 3-5% для проблемних поверхонь", pl: "EC 160 – pasta kryjąca (20-50%); EC 150 – baza przezroczysta; EC 1501 HG – lakier ochronny; AS 1000 – antystatyk do 5%; EC 170/1702 – opóźniacz w żelu; MP 1000 – proszek matujący; EC 150/10 – pasta matująca; MP 3000 – zagęstnik; HEC – utwardzacz 3-5% do problematycznych powierzchni", en: "EC 160 – opaque paste (20-50%); EC 150 – transparent base; EC 1501 HG – protective varnish; AS 1000 – antistatic up to 5%; EC 170/1702 – gel retarder; MP 1000 – matting powder; EC 150/10 – matting paste; MP 3000 – thickener; HEC – hardener 3-5% for problem surfaces" },
                    special: { uk: "EC 91 Q – напівматова біла з вищою в'язкістю для паперу та картону; EC 60/146, EC 61/163 – вогненно-червоні з екстремальною світлостійкістю; ECRG 120 – золота фарба готового використання", pl: "EC 91 Q – biała półmatowa o wyższej lepkości do papieru i tektury; EC 60/146, EC 61/163 – ogniste czerwienie z ekstremalną odpornością na światło; ECRG 120 – złota farba gotowa do użycia", en: "EC 91 Q – semi-matte white with higher viscosity for paper and cardboard; EC 60/146, EC 61/163 – fire reds with extreme lightfastness; ECRG 120 – gold ink ready to use" }
                }
            },
            { 
                id: "CF",
                name: { uk: "CARTOFLEX CF", pl: "CARTOFLEX CF", en: "CARTOFLEX CF" },
                category: "Папір/картон",
                description: {
                    uk: "Розчинникова фарба для картону, паперу, самоклейних паперів, дерева, лакированих металів. Промисловий друк: сталеві бочки, вогнегасники, пробки для оливи, суха пінопласт EPS. Для плівок Penstick з поліестеровим покриттям, поліестеру, PET, поліуретану – серія CF A&S.",
                    pl: "Farba rozpuszczalnikowa do tektury, papieru, papierów samoprzylepnych, drewna, metali lakierowanych. Druk przemysłowy: beczki stalowe, gaśnice, korki olejowe, suchy styropian EPS. Do folii Penstick z powłoką poliestrową, poliestru, PET, poliuretanu – seria CF A&S.",
                    en: "Solvent-based ink for cardboard, paper, self-adhesive papers, wood, lacquered metals. Industrial printing: steel drums, fire extinguishers, oil caps, dry EPS foam. For Penstick films with polyester coating, polyester, PET, polyurethane – CF A&S series."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Напівмат", pl: "Półmat", en: "Semi-matte" },
                    drying: { uk: "4 хв на відкритому повітрі, миттєво в тунелі", pl: "4 min na otwartym powietrzu, natychmiastowo w tunelu", en: "4 min open air, instantly in tunnel" },
                    mesh: { uk: "P77-P120", pl: "P77-P120", en: "P77-P120" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "CF 1000 (швидкий), CF 2000 (нормальний), CF 3000/4000 (легке сповільнення), CF 5000 (сповільнювач), CF 8000 (дуже повільний). +-20%", pl: "CF 1000 (szybki), CF 2000 (normalny), CF 3000/4000 (lekkie spowolnienie), CF 5000 (opóźniacz), CF 8000 (bardzo wolny). +-20%", en: "CF 1000 (fast), CF 2000 (normal), CF 3000/4000 (mild retarder), CF 5000 (retarder), CF 8000 (very slow). +-20%" },
                    additives: { uk: "CF 150 – прозора база; CF 1501 HG – фінішний лак (високий глянець, стійкість до стирання); CF 160 – викривлююча добавка для деталей (до 10%); CF 1702 – сильний сповільнювач у гелі (до 10%); AS 1000 – антистатик до 5%; HCF – повільний затверджувач 5% для покращення адгезії", pl: "CF 150 – baza przezroczysta; CF 1501 HG – lakier wykończeniowy (wysoki połysk, odporność na ścieranie); CF 160 – dodatek wykrzywiający do detali (do 10%); CF 1702 – silny opóźniacz w żelu (do 10%); AS 1000 – antystatyk do 5%; HCF – wolny utwardzacz 5% dla poprawy przyczepności", en: "CF 150 – transparent base; CF 1501 HG – finishing varnish (high gloss, abrasion resistance); CF 160 – distorting additive for details (up to 10%); CF 1702 – strong gel retarder (up to 10%); AS 1000 – antistatic up to 5%; HCF – slow hardener 5% for improved adhesion" }
                }
            },
            { 
                id: "PLUV",
                name: { uk: "UVIPLAST PLUV", pl: "UVIPLAST PLUV", en: "UVIPLAST PLUV" },
                category: "UV фарби",
                description: {
                    uk: "Фарба та лак УФ. Для самоклейних матеріалів, банерів, лакированого металу, ПП, пінопласту, попередньо активованого поліетилену, полікарбонату, паперу, ПВХ. Лак PLUV 150 – високоглянцевий для офсету та трафаретного друку.",
                    pl: "Farba i lakier UV. Do materiałów samoprzylepnych, banerów, metalu lakierowanego, PP, styropianu, wstępnie aktywowanego polietylenu, poliwęglanu, papieru, PCV. Lakier PLUV 150 – wysoki połysk do offsetu i druku sitowego.",
                    en: "UV ink and varnish. For self-adhesive materials, banners, lacquered metal, PP, styrofoam, pre-activated polyethylene, polycarbonate, paper, PVC. PLUV 150 varnish – high gloss for offset and screen printing."
                },
                properties: {
                    type: { uk: "Farba i lakier UV", pl: "Farba i lakier UV", en: "UV ink and varnish" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
                    mesh: { uk: "P140-P185T (флуо: P90, алюміній/золото: P120)", pl: "P140-P185T (fluoro: P90, aluminium/złoto: P120)", en: "P140-P185T (fluo: P90, aluminum/gold: P120)" },
                    cleaning: { uk: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", pl: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", en: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1" },
                    storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
                    resistance: { uk: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік", pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku", en: "Very good for all colors, possible slight yellowing of varnish after one year" },
                    thinning: { uk: "PLUV 2000 – стандартний розчинник", pl: "PLUV 2000 – standardowy rozcieńczalnik", en: "PLUV 2000 – standard thinner" },
                    additives: { uk: "HPLUV – каталізатор до 5% для складних поверхонь; не додавати більше 20% PLUV 91 до кольору – знижує адгезію", pl: "HPLUV – katalizator do 5% dla trudnych powierzchni; nie dodawać więcej niż 20% PLUV 91 do koloru – zmniejsza przyczepność", en: "HPLUV – catalyst up to 5% for difficult surfaces; do not add more than 20% PLUV 91 to color – reduces adhesion" },
                    special: { uk: "Відмінна еластичність, можливість бігування. Завжди тестувати перед виробництвом.", pl: "Doskonała elastyczność, możliwość bigowania. Zawsze testować przed produkcją.", en: "Excellent elasticity, possibility of creasing. Always test before production." }
                }
            },
            { 
                id: "SX",
                name: { uk: "SICOTEX SX", pl: "SICOTEX SX", en: "SICOTEX SX" },
                category: "Текстиль",
                description: {
                    uk: "Водна фарба для бавовни, синтетичних тканин та їх сумішей. Екологічна, сертифікат Oeko-Tex 100 клас I-IV. Без розчинників, важких металів, шкідливих пігментів, PVC.",
                    pl: "Farba wodna do bawełny, tkanin syntetycznych i ich mieszanek. Ekologiczna, certyfikat Oeko-Tex 100 klasa I-IV. Bez rozpuszczalników, metali ciężkich, szkodliwych pigmentów, PVC.",
                    en: "Water-based ink for cotton, synthetic fabrics and their blends. Eco-friendly, Oeko-Tex 100 class I-IV certified. Free from solvents, heavy metals, harmful pigments, PVC."
                },
                properties: {
                    type: { uk: "Farba wodna", pl: "Farba wodna", en: "Water-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "3 хв при 150°C (з 3% HSX – затверджувача – термофіксація не потрібна)", pl: "3 min w 150°C (z 3% HSX – utwardzacza – nie wymaga termofiksacji)", en: "3 min at 150°C (with 3% HSX hardener – no heat fixation needed)" },
                    mesh: { uk: "P34-P90, P90 для CMYK", pl: "P34-P90, P90 dla CMYK", en: "P34-P90, P90 for CMYK" },
                    cleaning: { uk: "Тепла вода або мийний засіб, можна під високим тиском", pl: "Ciepła woda lub środek czyszczący, można pod wysokim ciśnieniem", en: "Warm water or cleaning agent, can be high pressure" },
                    storage: { uk: "1-2 роки при температурі вище нуля", pl: "1-2 lata w temperaturze powyżej zera", en: "1-2 years at above zero temperature" },
                    resistance: { uk: "Відмінна стійкість до прання та світла після 24 год фіксації", pl: "Doskonała odporność na pranie i światło po 24 h utrwalania", en: "Excellent wash and light resistance after 24 h fixation" },
                    thinning: { uk: "Max 10% води або сповільнювач SX 5000", pl: "Max 10% wody lub opóźniacz SX 5000", en: "Max 10% water or retarder SX 5000" },
                    additives: { uk: "HSX – затверджувач (3%, після додавання використати за 24 год); SX 150 + 11 паст – самостійне приготування кольорів", pl: "HSX – utwardzacz (3%, po dodaniu zużyć w ciągu 24 h); SX 150 + 11 past – samodzielne przygotowanie kolorów", en: "HSX – hardener (3%, use within 24 h after addition); SX 150 + 11 pastes – self-mixing of colors" },
                    special: { uk: "Концентровані, прозорі, живі кольори. Доступні CMYK та флуо. Дуже еластична, не тріскається.", pl: "Skoncentrowane, przezroczyste, żywe kolory. Dostępne CMYK i fluo. Bardzo elastyczna, nie pęka.", en: "Concentrated, transparent, vivid colors. CMYK and fluo available. Very elastic, does not crack." }
                }
            },
            { 
                id: "SPTN",
                name: { uk: "SICOPLAST SPTN", pl: "SICOPLAST SPTN", en: "SICOPLAST SPTN" },
                category: "Текстиль",
                description: {
                    uk: "Пластизольова фарба для всіх тканинних матеріалів – натуральних та синтетичних. Прямий та трансферний друк.",
                    pl: "Farba plastizolowa do wszystkich materiałów tekstylnych – naturalnych i syntetycznych. Druk bezpośredni i transferowy.",
                    en: "Plastisol ink for all textile materials – natural and synthetic. Direct and transfer printing."
                },
                properties: {
                    type: { uk: "Farba plastizolowa", pl: "Farba plastizolowa", en: "Plastisol ink" },
                    finish: { uk: "Сатиновий, м'який, дуже еластичний", pl: "Satyna, miękki, bardzo elastyczny", en: "Satin, soft, very elastic" },
                    drying: { uk: "150-170°C ~2 хв", pl: "150-170°C ~2 min", en: "150-170°C ~2 min" },
                    mesh: { uk: "Стандартні: 34-90 н/см; тріадні: 77-120; блискучі: 15", pl: "Standardowe: 34-90 n/cm; triadowe: 77-120; błyszczące: 15", en: "Standard: 34-90 n/cm; process: 77-120; glitter: 15" },
                    cleaning: { uk: "CT 1000/l", pl: "CT 1000/l", en: "CT 1000/l" },
                    storage: { uk: "5-20°C, до 5 років", pl: "5-20°C, do 5 lat", en: "5-20°C, up to 5 years" },
                    resistance: { uk: "Відмінна стійкість до прання при дотриманні технології. Світлостійкість 2-3 роки (крім флуо).", pl: "Doskonała odporność na pranie przy przestrzeganiu technologii. Odporność na światło 2-3 lata (oprócz fluo).", en: "Excellent wash resistance when technology is followed. Lightfastness 2-3 years (except fluo)." },
                    thinning: { uk: "SPT nr 1/SPTN 1000 – до 5%; SPTNCR – без обмежень", pl: "SPT nr 1/SPTN 1000 – do 5%; SPTNCR – bez ograniczeń", en: "SPT nr 1/SPTN 1000 – up to 5%; SPTNCR – unlimited" },
                    additives: { uk: "SPTHNYL – до 10% для адгезії (суміш придатна 24 год); Nyloncoat – 5% для нейлону (суміш 24 год); база пучення; клей трансферний SPT nr 2", pl: "SPTHNYL – do 10% dla przyczepności (mieszanka ważna 24 h); Nyloncoat – 5% do nylonu (mieszanka 24 h); baza pęczniejąca; klej transferowy SPT nr 2", en: "SPTHNYL – up to 10% for adhesion (mix usable 24 h); Nyloncoat – 5% for nylon (mix 24 h); puff base; transfer adhesive SPT nr 2" },
                    special: { uk: "Flash white SPTN91 – швидковисихаюча біла для бази; Opaque white SPTN91/l – дуже криюча та еластична", pl: "Flash white SPTN91 – szybkoschnąca biała do bazy; Opaque white SPTN91/l – bardzo kryjąca i elastyczna", en: "Flash white SPTN91 – fast drying white for base; Opaque white SPTN91/l – very opaque and elastic" }
                }
            },
            { 
                id: "AS",
                name: { uk: "AQUASET AS", pl: "AQUASET AS", en: "AQUASET AS" },
                category: "Папір/картон",
                description: {
                    uk: "Водна фарба для картону, товстого паперу (мін. 130 г/м²), дерева, гофрокартону. Екологічна, без важких металів, підходить для дитячих іграшок та харчової упаковки.",
                    pl: "Farba wodna do tektury, grubego papieru (min. 130 g/m²), drewna, tektury falistej. Ekologiczna, bez metali ciężkich, odpowiednia do zabawek dla dzieci i opakowań spożywczych.",
                    en: "Water-based ink for cardboard, thick paper (min. 130 g/m²), wood, corrugated cardboard. Eco-friendly, heavy metal free, suitable for children's toys and food packaging."
                },
                properties: {
                    type: { uk: "Farba wodna", pl: "Farba wodna", en: "Water-based ink" },
                    finish: { uk: "Сатиновий (блискуча версія AQUAGLOSS AG)", pl: "Satyna (błyszcząca wersja AQUAGLOSS AG)", en: "Satin (glossy version AQUAGLOSS AG)" },
                    drying: { uk: "~1 год на відкритому повітрі, після тунелю можна складати в стоси", pl: "~1 godz. na otwartym powietrzu, po tunelu można układać w stosy", en: "~1 hour open air, after tunnel can be stacked" },
                    mesh: { uk: "P77-P140", pl: "P77-P140", en: "P77-P140" },
                    cleaning: { uk: "Вода (краще під високим тиском) або Aquaclean", pl: "Woda (lepiej pod wysokim ciśnieniem) lub Aquaclean", en: "Water (preferably high pressure) or Aquaclean" },
                    storage: { uk: "4 роки при 5-25°C у добре закритій тарі", pl: "4 lata w temp. 5-25°C w szczelnie zamkniętym pojemniku", en: "4 years at 5-25°C in tightly closed container" },
                    resistance: { uk: "Екологічна, без важких металів. Для зовнішнього застосування – додати 1% затверджувача (використати за 12 год)", pl: "Ekologiczna, bez metali ciężkich. Do zastosowań zewnętrznych – dodać 1% utwardzacza (zużyć w ciągu 12 h)", en: "Eco-friendly, heavy metal free. For outdoor use – add 1% hardener (use within 12 h)" },
                    thinning: { uk: "Вода або сповільнювач AS 5000", pl: "Woda lub opóźniacz AS 5000", en: "Water or retarder AS 5000" },
                    additives: { uk: "Затверджувач для водостійкості", pl: "Utwardzacz do wodoodporności", en: "Hardener for water resistance" }
                }
            },
            { 
                id: "OTF",
                name: { uk: "OPATEX OTF", pl: "OPATEX OTF", en: "OPATEX OTF" },
                category: "Текстиль",
                description: {
                    uk: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах (натуральних та більшості синтетичних).",
                    pl: "Superkryjąca farba wodna do druku bezpośredniego i transferowego na ciemnych tkaninach (naturalnych i większości syntetycznych).",
                    en: "Super opaque water-based ink for direct and transfer printing on dark fabrics (natural and most synthetic)."
                },
                properties: {
                    type: { uk: "Super kryjąca farba wodna", pl: "Superkryjąca farba wodna", en: "Super opaque water-based ink" },
                    finish: { uk: "Криючий, м'який, без гумового ефекту", pl: "Kryjący, miękki, bez efektu gumy", en: "Opaque, soft, no rubber effect" },
                    drying: { uk: "3 хв при 150°C без затверджувача; з 3% HOT – термофіксація не потрібна", pl: "3 min w 150°C bez utwardzacza; z 3% HOT – nie wymaga termofiksacji", en: "3 min at 150°C without hardener; with 3% HOT – no heat fixation needed" },
                    mesh: { uk: "P34T до P77T", pl: "P34T do P77T", en: "P34T to P77T" },
                    cleaning: { uk: "Холодна вода + мийний засіб (Aquaclean), під високим тиском; для емульсій водостійких – CT 1000/63", pl: "Zimna woda + środek czyszczący (Aquaclean), pod wysokim ciśnieniem; dla emulsji wodoodpornych – CT 1000/63", en: "Cold water + cleaning agent (Aquaclean), high pressure; for water-resistant emulsions – CT 1000/63" },
                    storage: { uk: "1-2 роки при 10-25°C, берегти від морозу", pl: "1-2 lata w temp. 10-25°C, chronić przed mrozem", en: "1-2 years at 10-25°C, protect from frost" },
                    resistance: { uk: "Відмінна після додавання HOT. Для нейлону – HOT обов'язково.", pl: "Doskonała po dodaniu HOT. Do nylonu – HOT obowiązkowo.", en: "Excellent after adding HOT. For nylon – HOT mandatory." },
                    thinning: { uk: "Max 10% води, або OTF 5000 (повільний), або OTF 7000 (еластичний). Сумарно не більше 10%.", pl: "Max 10% wody, lub OTF 5000 (wolny), lub OTF 7000 (elastyczny). Łącznie nie więcej niż 10%.", en: "Max 10% water, or OTF 5000 (slow), or OTF 7000 (elastic). Total not more than 10%." },
                    additives: { uk: "HOT – затверджувач 3%; OTF 150/14 – лак для трансферу (стійкість до прання, еластичність); OTF 150/18 – повільна версія; OTF 100/101 – чорний блокатор міграції для поліестеру; База пучення OTF – змішувати з пастами PPT (100г бази + 5г пасти)", pl: "HOT – utwardzacz 3%; OTF 150/14 – lakier do transferu (odporność na pranie, elastyczność); OTF 150/18 – wolna wersja; OTF 100/101 – czarny blokator migracji do poliestru; Baza pęczniejąca OTF – mieszać z pastami PPT (100g bazy + 5g pasty)", en: "HOT – hardener 3%; OTF 150/14 – transfer varnish (wash resistance, elasticity); OTF 150/18 – slow version; OTF 100/101 – black migration blocker for polyester; OTF puff base – mix with PPT pastes (100g base + 5g paste)" },
                    special: { uk: "Дуже криюча, еластична, незважаючи на високі криючі властивості. Трансфер: протокол для 1-кольорових та багатокольорових; Transferglue OTF nr 2 – клей із порошком усередині; порошки Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", pl: "Bardzo kryjąca, elastyczna, pomimo wysokich właściwości kryjących. Transfer: protokół dla 1-kolorowych i wielokolorowych; Transferglue OTF nr 2 – klej z proszkiem w środku; proszki Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", en: "Very opaque, elastic, despite high opacity. Transfer: protocol for 1-color and multicolor; Transferglue OTF nr 2 – adhesive with powder inside; Soft powders nr 3, nr 12, nr 4, nr 13; Cold peel." }
                }
            },
            { 
                id: "TPP",
                name: { uk: "POLYPRO TPP", pl: "POLYPRO TPP", en: "POLYPRO TPP" },
                category: "Пластики",
                description: {
                    uk: "Розчинникова фарба для поліетилену, поліпропілену та полікарбонату (priplack, akylux, duoprop). Для попередньо активованого поліетилену – додати HTPP SLOW.",
                    pl: "Farba rozpuszczalnikowa do polietylenu, polipropylenu i poliwęglanu (priplack, akylux, duoprop). Do wstępnie aktywowanego polietylenu – dodać HTPP SLOW.",
                    en: "Solvent-based ink for polyethylene, polypropylene and polycarbonate (priplack, akylux, duoprop). For pre-activated polyethylene – add HTPP SLOW."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "10 хв на відкритому повітрі, миттєво в тунелі", pl: "10 min na otwartym powietrzu, natychmiastowo w tunelu", en: "10 min open air, instantly in tunnel" },
                    mesh: { uk: "P90-120", pl: "P90-120", en: "P90-120" },
                    cleaning: { uk: "ST 1000", pl: "ST 1000", en: "ST 1000" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "TPP 1000 (швидкий), TPP 2000 (нормальний), TPP 3000/4000 (легке сповільнення), TPP 5000 (повільний), TPP 8000 (дуже повільний). Середнє: +/-15%", pl: "TPP 1000 (szybki), TPP 2000 (normalny), TPP 3000/4000 (lekkie spowolnienie), TPP 5000 (wolny), TPP 8000 (bardzo wolny). Średnio: +/-15%", en: "TPP 1000 (fast), TPP 2000 (normal), TPP 3000/4000 (mild retarder), TPP 5000 (slow), TPP 8000 (very slow). Average: +/-15%" },
                    additives: { uk: "HTPP SLOW – затверджувач для стійкості до подряпин та адгезії (придатність 1 день); TPP 160 – високотиксотропна викривлююча добавка (10%); TPP 150 – прозора база / лак; AS 1000 – антистатик 5%; TPP 1702 – сповільнювач у гелі проти засихання", pl: "HTPP SLOW – utwardzacz do odporności na zarysowania i przyczepności (ważność 1 dzień); TPP 160 – dodatek wysokotiksotropowy wykrzywiający (10%); TPP 150 – baza przezroczysta / lakier; AS 1000 – antystatyk 5%; TPP 1702 – opóźniacz w żelu przeciw zasychaniu", en: "HTPP SLOW – hardener for scratch resistance and adhesion (usable 1 day); TPP 160 – highly thixotropic distorting additive (10%); TPP 150 – transparent base / varnish; AS 1000 – antistatic 5%; TPP 1702 – gel retarder against drying" },
                    special: { uk: "Не додавати матуючий порошок – знижує адгезію. Для проблемних поверхонь – матеріал має бути активований.", pl: "Nie dodawać proszku matującego – zmniejsza przyczepność. Do problematycznych powierzchni – materiał musi być aktywowany.", en: "Do not add matting powder – reduces adhesion. For problem surfaces – material must be activated." }
                }
            },
            { 
                id: "UV",
                name: { uk: "UVILUX UV", pl: "UVILUX UV", en: "UVILUX UV" },
                category: "UV фарби",
                description: {
                    uk: "Фарба та лак УФ для паперу, картону, офсетного друку. Лак UV 150 – ідеальний для офсету та трафаретного друку, особливо для чорних відбитків, проблемних при згинанні.",
                    pl: "Farba i lakier UV do papieru, tektury, druku offsetowego. Lakier UV 150 – idealny do offsetu i druku sitowego, zwłaszcza do czarnych nadruków, problematycznych przy zginaniu.",
                    en: "UV ink and varnish for paper, cardboard, offset printing. UV 150 varnish – ideal for offset and screen printing, especially for black prints problematic when folding."
                },
                properties: {
                    type: { uk: "Farba i lakier UV", pl: "Farba i lakier UV", en: "UV ink and varnish" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
                    mesh: { uk: "P140-P185T (алюміній/золото: P120, флуо: P90, стандарт: P150)", pl: "P140-P185T (aluminium/złoto: P120, fluo: P90, standard: P150)", en: "P140-P185T (aluminum/gold: P120, fluo: P90, standard: P150)" },
                    cleaning: { uk: "CT 1000 або CT 1000/l", pl: "CT 1000 lub CT 1000/l", en: "CT 1000 or CT 1000/l" },
                    storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
                    resistance: { uk: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік", pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku", en: "Very good for all colors, possible slight yellowing of varnish after one year" },
                    thinning: { uk: "UV 2000 – стандартний розчинник", pl: "UV 2000 – standardowy rozcieńczalnik", en: "UV 2000 – standard thinner" },
                    additives: { uk: "—", pl: "—", en: "—" },
                    special: { uk: "Висока еластичність – можна згинати/складати (важливо для POS-матеріалів). Продукти UV не містять розчинників.", pl: "Wysoka elastyczność – można zginać/składać (ważne dla materiałów POS). Produkty UV nie zawierają rozpuszczalników.", en: "High elasticity – can be bent/folded (important for POS materials). UV products are solvent-free." }
                }
            },
            { 
                id: "NST",
                name: { uk: "NYLONSTAR NST", pl: "NYLONSTAR NST", en: "NYLONSTAR NST" },
                category: "Текстиль",
                description: {
                    uk: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven. Висока еластичність, стійкість до стирання, атмосферних впливів та прання.",
                    pl: "Farba rozpuszczalnikowa do poliamidu (nylon) i toreb non-woven. Wysoka elastyczność, odporność na ścieranie, warunki atmosferyczne i pranie.",
                    en: "Solvent-based ink for polyamide (nylon) and non-woven bags. High elasticity, abrasion resistance, weather and wash resistance."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "5 хв на відкритому повітрі, миттєво в тунелі", pl: "5 min na otwartym powietrzu, natychmiastowo w tunelu", en: "5 min open air, instantly in tunnel" },
                    mesh: { uk: "P45-P90", pl: "P45-P90", en: "P45-P90" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Понад 24 місяці", pl: "Ponad 24 miesiące", en: "Over 24 months" },
                    resistance: { uk: "Висока стійкість до прання та атмосферних умов; для покращення – 5% HNST SLOW", pl: "Wysoka odporność na pranie i warunki atmosferyczne; dla poprawy – 5% HNST SLOW", en: "High wash and weather resistance; for improvement – 5% HNST SLOW" },
                    thinning: { uk: "До 15% сповільнювача NST 1702", pl: "Do 15% opóźniacza NST 1702", en: "Up to 15% retarder NST 1702" },
                    additives: { uk: "HNST SLOW – каталізатор до 5%; NST 150 – прозора база (знижує криття та світлостійкість); MP 3000 – загусник 1-2%", pl: "HNST SLOW – katalizator do 5%; NST 150 – baza przezroczysta (zmniejsza krycie i odporność na światło); MP 3000 – zagęstnik 1-2%", en: "HNST SLOW – catalyst up to 5%; NST 150 – transparent base (reduces opacity and lightfastness); MP 3000 – thickener 1-2%" },
                    special: { uk: "Ультракриючі кольори: 40, 42, 56. Прозорі кольори: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Флуо – нижча світлостійкість. Всі кольори змішуються.", pl: "Ultrakryjące kolory: 40, 42, 56. Przezroczyste kolory: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – niższa odporność na światło. Wszystkie kolory mieszają się.", en: "Ultra-opaque colors: 40, 42, 56. Transparent colors: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – lower lightfastness. All colors are mixable." }
                }
            }
        ];

        // ---------- ДОДАТКОВІ СЕРІЇ (унікальні ID) ----------
        const extraSeries = [
            { 
                id: "SP",
                name: { uk: "SICOPRINT SP", pl: "SICOPRINT SP", en: "SICOPRINT SP" },
                category: "Універсальні",
                description: {
                    uk: "Універсальна розчинникова фарба для широкого спектру матеріалів.",
                    pl: "Uniwersalna farba rozpuszczalnikowa do szerokiej gamy materiałów.",
                    en: "Universal solvent-based ink for a wide range of materials."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SI",
                name: { uk: "SILICONE SI", pl: "SILICONE SI", en: "SILICONE SI" },
                category: "Спеціальні",
                description: {
                    uk: "Силіконова фарба для складних поверхонь, стійка до високих температур.",
                    pl: "Farba silikonowa do trudnych powierzchni, odporna na wysokie temperatury.",
                    en: "Silicone ink for difficult surfaces, resistant to high temperatures."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SN",
                name: { uk: "SICONYL SN", pl: "SICONYL SN", en: "SICONYL SN" },
                category: "Текстиль",
                description: {
                    uk: "Фарба для нейлону та синтетичних тканин, висока еластичність.",
                    pl: "Farba do nylonu i tkanin syntetycznych, wysoka elastyczność.",
                    en: "Ink for nylon and synthetic fabrics, high elasticity."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "NST").properties))
            },
            { 
                id: "QS",
                name: { uk: "QUICKSET QS", pl: "QUICKSET QS", en: "QUICKSET QS" },
                category: "Швидковисихаючі",
                description: {
                    uk: "Швидковисихаюча фарба для паперу та картону.",
                    pl: "Szybkoschnąca farba do papieru i tektury.",
                    en: "Quick-drying ink for paper and cardboard."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "CF").properties))
            },
            { 
                id: "PX",
                name: { uk: "SICEPOX PX", pl: "SICEPOX PX", en: "SICEPOX PX" },
                category: "Епоксидні",
                description: {
                    uk: "Епоксидна фарба для металів, скла, кераміки.",
                    pl: "Farba epoksydowa do metali, szkła, ceramiki.",
                    en: "Epoxy ink for metals, glass, ceramics."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "TPP").properties))
            },
            { 
                id: "EVS",
                name: { uk: "EVASTAR EVS", pl: "EVASTAR EVS", en: "EVASTAR EVS" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для EVA-матеріалів, відмінна адгезія.",
                    pl: "Farba do materiałów EVA, doskonała przyczepność.",
                    en: "Ink for EVA materials, excellent adhesion."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "SX").properties))
            },
            { 
                id: "ECVF",
                name: { uk: "VEHICLE ECVF", pl: "VEHICLE ECVF", en: "VEHICLE ECVF" },
                category: "Автомобільні",
                description: {
                    uk: "Фарба для автомобільних деталей, стійка до бензину та оливи.",
                    pl: "Farba do części samochodowych, odporna na benzynę i olej.",
                    en: "Ink for automotive parts, resistant to petrol and oil."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SB",
                name: { uk: "SCRATCH SB", pl: "SCRATCH SB", en: "SCRATCH SB" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для дряпок (scratch-off), використовується в лотерейних квитках тощо.",
                    pl: "Farba zdrapka (scratch-off), stosowana w losach itp.",
                    en: "Scratch-off ink used in lottery tickets, etc."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            }
        ];

        // ---------- ОБ'ЄДНАННЯ СЕРІЙ З ДЕДУПЛІКАЦІЄЮ ----------
        const allSeries = [...baseSeries, ...extraSeries];
        const seriesMap = new Map();
        allSeries.forEach(s => seriesMap.set(s.id, s)); // останній запис з однаковим id перетирає попередній
        const series = Array.from(seriesMap.values());

        // ---------- БАЗОВІ КОЛЬОРИ ----------
        const baseColors = [ /* (залишається без змін, скорочено для економії місця) */ ];

        // ---------- ДОДАТКИ ----------
        const additives = [ /* (залишається без змін) */ ];

        // ---------- СПЕЦІАЛЬНІ ФАРБИ ----------
        const specialPaints = [ /* (повний масив, як у попередній версії) */ ];

        // ---------- ГЕНЕРАЦІЯ ФАРБ ----------
        function generateBasePaints() {
            // ... (той самий код, що й раніше)
        }

        function generateSpecialPaints() {
            // ... (той самий код, що й раніше)
        }

        const basePaints = generateBasePaints();
        const specialPaintsArray = generateSpecialPaints();
        const allPaints = [...basePaints, ...specialPaintsArray];

        // Дедуплікація фарб за ключем series + baseColorCode
        const uniquePaintsMap = new Map();
        allPaints.forEach(paint => {
            const key = `${paint.series}_${paint.baseColorCode}`;
            if (!uniquePaintsMap.has(key) || paint.id.startsWith('special-')) {
                uniquePaintsMap.set(key, paint);
            }
        });
        const paints = Array.from(uniquePaintsMap.values());

        // Категорії (унікальні)
        const categories = Array.from(new Set(series.map(s => s.category))).sort();

        // Інші дані
        const units = [ /* ... */ ];
        const fileFormats = [ /* ... */ ];
        const languages = [ /* ... */ ];
        const defaultSettings = { /* ... */ };

        console.log(`[SICOMIX] Згенеровано ${paints.length} унікальних фарб, ${series.length} серій`);

        return {
            paints,
            recipes: [],
            series,
            baseColors,
            additives,
            categories,
            units,
            fileFormats,
            languages,
            defaultSettings
        };
    } catch (error) {
        console.error("[SICOMIX] КРИТИЧНА ПОМИЛКА:", error);
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

console.log('[SICOMIX] data-colors.js завантажено, SICOMIX.data.paints.length =', SICOMIX.data?.paints?.length);console.log('[SICOMIX] Завантаження data-colors.js...');

window.SICOMIX = window.SICOMIX || {};
const SICOMIX = window.SICOMIX;

SICOMIX.data = (function() {
    try {
        // ---------- БАЗОВІ СЕРІЇ ----------
        const baseSeries = [
            { 
                id: "EC",
                name: { uk: "EC", pl: "EC", en: "EC" },
                category: "Універсальні",
                description: {
                    uk: "Універсальна розчинникова фарба. Легка в друці, високий глянець. Підходить для самоклейних матеріалів, ПВХ, паперу, картону, лакированих металів. З додаванням 5% HEC – для поліпропілену, priplack, ABS, forex, банерів.",
                    pl: "Uniwersalna farba rozpuszczalnikowa. Łatwa w druku, wysoki połysk. Nadaje się do materiałów samoprzylepnych, PCV, papieru, tektury, metali lakierowanych. Z dodatkiem 5% HEC – do polipropylenu, priplack, ABS, forex, banerów.",
                    en: "Universal solvent-based ink. Easy to print, high gloss. Suitable for self-adhesive materials, PVC, paper, cardboard, lacquered metals. With 5% HEC additive – for polypropylene, priplack, ABS, forex, banners."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "6 хв на відкритому повітрі, миттєво в тунелі", pl: "6 min na otwartym powietrzu, natychmiastowo w tunelu", en: "6 min open air, instantly in tunnel" },
                    mesh: { uk: "P77-120 (флуо: P90T, триадні: високої щільності)", pl: "P77-120 (fluoro: P90T, triadowe: wysokiej gęstości)", en: "P77-120 (fluo: P90T, process: high density)" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "EC 1000 (швидкий), EC 2000 (нормальний), EC 3000/4000 (легке сповільнення), EC 5000 (сповільнювач), EC 8000 (дуже повільний). Для флуо: EC 1300, EC 1301. Середнє розрідження: +/-15%", pl: "EC 1000 (szybki), EC 2000 (normalny), EC 3000/4000 (lekkie spowolnienie), EC 5000 (opóźniacz), EC 8000 (bardzo wolny). Dla fluo: EC 1300, EC 1301. Średnie rozrzedzenie: +/-15%", en: "EC 1000 (fast), EC 2000 (normal), EC 3000/4000 (mild retarder), EC 5000 (retarder), EC 8000 (very slow). For fluo: EC 1300, EC 1301. Average thinning: +/-15%" },
                    additives: { uk: "EC 160 – криюча паста (20-50%); EC 150 – прозора база; EC 1501 HG – захисний лак; AS 1000 – антистатик до 5%; EC 170/1702 – сповільнювач у гелі; MP 1000 – матуючий порошок; EC 150/10 – матуюча паста; MP 3000 – загусник; HEC – затверджувач 3-5% для проблемних поверхонь", pl: "EC 160 – pasta kryjąca (20-50%); EC 150 – baza przezroczysta; EC 1501 HG – lakier ochronny; AS 1000 – antystatyk do 5%; EC 170/1702 – opóźniacz w żelu; MP 1000 – proszek matujący; EC 150/10 – pasta matująca; MP 3000 – zagęstnik; HEC – utwardzacz 3-5% do problematycznych powierzchni", en: "EC 160 – opaque paste (20-50%); EC 150 – transparent base; EC 1501 HG – protective varnish; AS 1000 – antistatic up to 5%; EC 170/1702 – gel retarder; MP 1000 – matting powder; EC 150/10 – matting paste; MP 3000 – thickener; HEC – hardener 3-5% for problem surfaces" },
                    special: { uk: "EC 91 Q – напівматова біла з вищою в'язкістю для паперу та картону; EC 60/146, EC 61/163 – вогненно-червоні з екстремальною світлостійкістю; ECRG 120 – золота фарба готового використання", pl: "EC 91 Q – biała półmatowa o wyższej lepkości do papieru i tektury; EC 60/146, EC 61/163 – ogniste czerwienie z ekstremalną odpornością na światło; ECRG 120 – złota farba gotowa do użycia", en: "EC 91 Q – semi-matte white with higher viscosity for paper and cardboard; EC 60/146, EC 61/163 – fire reds with extreme lightfastness; ECRG 120 – gold ink ready to use" }
                }
            },
            { 
                id: "CF",
                name: { uk: "CARTOFLEX CF", pl: "CARTOFLEX CF", en: "CARTOFLEX CF" },
                category: "Папір/картон",
                description: {
                    uk: "Розчинникова фарба для картону, паперу, самоклейних паперів, дерева, лакированих металів. Промисловий друк: сталеві бочки, вогнегасники, пробки для оливи, суха пінопласт EPS. Для плівок Penstick з поліестеровим покриттям, поліестеру, PET, поліуретану – серія CF A&S.",
                    pl: "Farba rozpuszczalnikowa do tektury, papieru, papierów samoprzylepnych, drewna, metali lakierowanych. Druk przemysłowy: beczki stalowe, gaśnice, korki olejowe, suchy styropian EPS. Do folii Penstick z powłoką poliestrową, poliestru, PET, poliuretanu – seria CF A&S.",
                    en: "Solvent-based ink for cardboard, paper, self-adhesive papers, wood, lacquered metals. Industrial printing: steel drums, fire extinguishers, oil caps, dry EPS foam. For Penstick films with polyester coating, polyester, PET, polyurethane – CF A&S series."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Напівмат", pl: "Półmat", en: "Semi-matte" },
                    drying: { uk: "4 хв на відкритому повітрі, миттєво в тунелі", pl: "4 min na otwartym powietrzu, natychmiastowo w tunelu", en: "4 min open air, instantly in tunnel" },
                    mesh: { uk: "P77-P120", pl: "P77-P120", en: "P77-P120" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "CF 1000 (швидкий), CF 2000 (нормальний), CF 3000/4000 (легке сповільнення), CF 5000 (сповільнювач), CF 8000 (дуже повільний). +-20%", pl: "CF 1000 (szybki), CF 2000 (normalny), CF 3000/4000 (lekkie spowolnienie), CF 5000 (opóźniacz), CF 8000 (bardzo wolny). +-20%", en: "CF 1000 (fast), CF 2000 (normal), CF 3000/4000 (mild retarder), CF 5000 (retarder), CF 8000 (very slow). +-20%" },
                    additives: { uk: "CF 150 – прозора база; CF 1501 HG – фінішний лак (високий глянець, стійкість до стирання); CF 160 – викривлююча добавка для деталей (до 10%); CF 1702 – сильний сповільнювач у гелі (до 10%); AS 1000 – антистатик до 5%; HCF – повільний затверджувач 5% для покращення адгезії", pl: "CF 150 – baza przezroczysta; CF 1501 HG – lakier wykończeniowy (wysoki połysk, odporność na ścieranie); CF 160 – dodatek wykrzywiający do detali (do 10%); CF 1702 – silny opóźniacz w żelu (do 10%); AS 1000 – antystatyk do 5%; HCF – wolny utwardzacz 5% dla poprawy przyczepności", en: "CF 150 – transparent base; CF 1501 HG – finishing varnish (high gloss, abrasion resistance); CF 160 – distorting additive for details (up to 10%); CF 1702 – strong gel retarder (up to 10%); AS 1000 – antistatic up to 5%; HCF – slow hardener 5% for improved adhesion" }
                }
            },
            { 
                id: "PLUV",
                name: { uk: "UVIPLAST PLUV", pl: "UVIPLAST PLUV", en: "UVIPLAST PLUV" },
                category: "UV фарби",
                description: {
                    uk: "Фарба та лак УФ. Для самоклейних матеріалів, банерів, лакированого металу, ПП, пінопласту, попередньо активованого поліетилену, полікарбонату, паперу, ПВХ. Лак PLUV 150 – високоглянцевий для офсету та трафаретного друку.",
                    pl: "Farba i lakier UV. Do materiałów samoprzylepnych, banerów, metalu lakierowanego, PP, styropianu, wstępnie aktywowanego polietylenu, poliwęglanu, papieru, PCV. Lakier PLUV 150 – wysoki połysk do offsetu i druku sitowego.",
                    en: "UV ink and varnish. For self-adhesive materials, banners, lacquered metal, PP, styrofoam, pre-activated polyethylene, polycarbonate, paper, PVC. PLUV 150 varnish – high gloss for offset and screen printing."
                },
                properties: {
                    type: { uk: "Farba i lakier UV", pl: "Farba i lakier UV", en: "UV ink and varnish" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
                    mesh: { uk: "P140-P185T (флуо: P90, алюміній/золото: P120)", pl: "P140-P185T (fluoro: P90, aluminium/złoto: P120)", en: "P140-P185T (fluo: P90, aluminum/gold: P120)" },
                    cleaning: { uk: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", pl: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", en: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1" },
                    storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
                    resistance: { uk: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік", pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku", en: "Very good for all colors, possible slight yellowing of varnish after one year" },
                    thinning: { uk: "PLUV 2000 – стандартний розчинник", pl: "PLUV 2000 – standardowy rozcieńczalnik", en: "PLUV 2000 – standard thinner" },
                    additives: { uk: "HPLUV – каталізатор до 5% для складних поверхонь; не додавати більше 20% PLUV 91 до кольору – знижує адгезію", pl: "HPLUV – katalizator do 5% dla trudnych powierzchni; nie dodawać więcej niż 20% PLUV 91 do koloru – zmniejsza przyczepność", en: "HPLUV – catalyst up to 5% for difficult surfaces; do not add more than 20% PLUV 91 to color – reduces adhesion" },
                    special: { uk: "Відмінна еластичність, можливість бігування. Завжди тестувати перед виробництвом.", pl: "Doskonała elastyczność, możliwość bigowania. Zawsze testować przed produkcją.", en: "Excellent elasticity, possibility of creasing. Always test before production." }
                }
            },
            { 
                id: "SX",
                name: { uk: "SICOTEX SX", pl: "SICOTEX SX", en: "SICOTEX SX" },
                category: "Текстиль",
                description: {
                    uk: "Водна фарба для бавовни, синтетичних тканин та їх сумішей. Екологічна, сертифікат Oeko-Tex 100 клас I-IV. Без розчинників, важких металів, шкідливих пігментів, PVC.",
                    pl: "Farba wodna do bawełny, tkanin syntetycznych i ich mieszanek. Ekologiczna, certyfikat Oeko-Tex 100 klasa I-IV. Bez rozpuszczalników, metali ciężkich, szkodliwych pigmentów, PVC.",
                    en: "Water-based ink for cotton, synthetic fabrics and their blends. Eco-friendly, Oeko-Tex 100 class I-IV certified. Free from solvents, heavy metals, harmful pigments, PVC."
                },
                properties: {
                    type: { uk: "Farba wodna", pl: "Farba wodna", en: "Water-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "3 хв при 150°C (з 3% HSX – затверджувача – термофіксація не потрібна)", pl: "3 min w 150°C (z 3% HSX – utwardzacza – nie wymaga termofiksacji)", en: "3 min at 150°C (with 3% HSX hardener – no heat fixation needed)" },
                    mesh: { uk: "P34-P90, P90 для CMYK", pl: "P34-P90, P90 dla CMYK", en: "P34-P90, P90 for CMYK" },
                    cleaning: { uk: "Тепла вода або мийний засіб, можна під високим тиском", pl: "Ciepła woda lub środek czyszczący, można pod wysokim ciśnieniem", en: "Warm water or cleaning agent, can be high pressure" },
                    storage: { uk: "1-2 роки при температурі вище нуля", pl: "1-2 lata w temperaturze powyżej zera", en: "1-2 years at above zero temperature" },
                    resistance: { uk: "Відмінна стійкість до прання та світла після 24 год фіксації", pl: "Doskonała odporność na pranie i światło po 24 h utrwalania", en: "Excellent wash and light resistance after 24 h fixation" },
                    thinning: { uk: "Max 10% води або сповільнювач SX 5000", pl: "Max 10% wody lub opóźniacz SX 5000", en: "Max 10% water or retarder SX 5000" },
                    additives: { uk: "HSX – затверджувач (3%, після додавання використати за 24 год); SX 150 + 11 паст – самостійне приготування кольорів", pl: "HSX – utwardzacz (3%, po dodaniu zużyć w ciągu 24 h); SX 150 + 11 past – samodzielne przygotowanie kolorów", en: "HSX – hardener (3%, use within 24 h after addition); SX 150 + 11 pastes – self-mixing of colors" },
                    special: { uk: "Концентровані, прозорі, живі кольори. Доступні CMYK та флуо. Дуже еластична, не тріскається.", pl: "Skoncentrowane, przezroczyste, żywe kolory. Dostępne CMYK i fluo. Bardzo elastyczna, nie pęka.", en: "Concentrated, transparent, vivid colors. CMYK and fluo available. Very elastic, does not crack." }
                }
            },
            { 
                id: "SPTN",
                name: { uk: "SICOPLAST SPTN", pl: "SICOPLAST SPTN", en: "SICOPLAST SPTN" },
                category: "Текстиль",
                description: {
                    uk: "Пластизольова фарба для всіх тканинних матеріалів – натуральних та синтетичних. Прямий та трансферний друк.",
                    pl: "Farba plastizolowa do wszystkich materiałów tekstylnych – naturalnych i syntetycznych. Druk bezpośredni i transferowy.",
                    en: "Plastisol ink for all textile materials – natural and synthetic. Direct and transfer printing."
                },
                properties: {
                    type: { uk: "Farba plastizolowa", pl: "Farba plastizolowa", en: "Plastisol ink" },
                    finish: { uk: "Сатиновий, м'який, дуже еластичний", pl: "Satyna, miękki, bardzo elastyczny", en: "Satin, soft, very elastic" },
                    drying: { uk: "150-170°C ~2 хв", pl: "150-170°C ~2 min", en: "150-170°C ~2 min" },
                    mesh: { uk: "Стандартні: 34-90 н/см; тріадні: 77-120; блискучі: 15", pl: "Standardowe: 34-90 n/cm; triadowe: 77-120; błyszczące: 15", en: "Standard: 34-90 n/cm; process: 77-120; glitter: 15" },
                    cleaning: { uk: "CT 1000/l", pl: "CT 1000/l", en: "CT 1000/l" },
                    storage: { uk: "5-20°C, до 5 років", pl: "5-20°C, do 5 lat", en: "5-20°C, up to 5 years" },
                    resistance: { uk: "Відмінна стійкість до прання при дотриманні технології. Світлостійкість 2-3 роки (крім флуо).", pl: "Doskonała odporność na pranie przy przestrzeganiu technologii. Odporność na światło 2-3 lata (oprócz fluo).", en: "Excellent wash resistance when technology is followed. Lightfastness 2-3 years (except fluo)." },
                    thinning: { uk: "SPT nr 1/SPTN 1000 – до 5%; SPTNCR – без обмежень", pl: "SPT nr 1/SPTN 1000 – do 5%; SPTNCR – bez ograniczeń", en: "SPT nr 1/SPTN 1000 – up to 5%; SPTNCR – unlimited" },
                    additives: { uk: "SPTHNYL – до 10% для адгезії (суміш придатна 24 год); Nyloncoat – 5% для нейлону (суміш 24 год); база пучення; клей трансферний SPT nr 2", pl: "SPTHNYL – do 10% dla przyczepności (mieszanka ważna 24 h); Nyloncoat – 5% do nylonu (mieszanka 24 h); baza pęczniejąca; klej transferowy SPT nr 2", en: "SPTHNYL – up to 10% for adhesion (mix usable 24 h); Nyloncoat – 5% for nylon (mix 24 h); puff base; transfer adhesive SPT nr 2" },
                    special: { uk: "Flash white SPTN91 – швидковисихаюча біла для бази; Opaque white SPTN91/l – дуже криюча та еластична", pl: "Flash white SPTN91 – szybkoschnąca biała do bazy; Opaque white SPTN91/l – bardzo kryjąca i elastyczna", en: "Flash white SPTN91 – fast drying white for base; Opaque white SPTN91/l – very opaque and elastic" }
                }
            },
            { 
                id: "AS",
                name: { uk: "AQUASET AS", pl: "AQUASET AS", en: "AQUASET AS" },
                category: "Папір/картон",
                description: {
                    uk: "Водна фарба для картону, товстого паперу (мін. 130 г/м²), дерева, гофрокартону. Екологічна, без важких металів, підходить для дитячих іграшок та харчової упаковки.",
                    pl: "Farba wodna do tektury, grubego papieru (min. 130 g/m²), drewna, tektury falistej. Ekologiczna, bez metali ciężkich, odpowiednia do zabawek dla dzieci i opakowań spożywczych.",
                    en: "Water-based ink for cardboard, thick paper (min. 130 g/m²), wood, corrugated cardboard. Eco-friendly, heavy metal free, suitable for children's toys and food packaging."
                },
                properties: {
                    type: { uk: "Farba wodna", pl: "Farba wodna", en: "Water-based ink" },
                    finish: { uk: "Сатиновий (блискуча версія AQUAGLOSS AG)", pl: "Satyna (błyszcząca wersja AQUAGLOSS AG)", en: "Satin (glossy version AQUAGLOSS AG)" },
                    drying: { uk: "~1 год на відкритому повітрі, після тунелю можна складати в стоси", pl: "~1 godz. na otwartym powietrzu, po tunelu można układać w stosy", en: "~1 hour open air, after tunnel can be stacked" },
                    mesh: { uk: "P77-P140", pl: "P77-P140", en: "P77-P140" },
                    cleaning: { uk: "Вода (краще під високим тиском) або Aquaclean", pl: "Woda (lepiej pod wysokim ciśnieniem) lub Aquaclean", en: "Water (preferably high pressure) or Aquaclean" },
                    storage: { uk: "4 роки при 5-25°C у добре закритій тарі", pl: "4 lata w temp. 5-25°C w szczelnie zamkniętym pojemniku", en: "4 years at 5-25°C in tightly closed container" },
                    resistance: { uk: "Екологічна, без важких металів. Для зовнішнього застосування – додати 1% затверджувача (використати за 12 год)", pl: "Ekologiczna, bez metali ciężkich. Do zastosowań zewnętrznych – dodać 1% utwardzacza (zużyć w ciągu 12 h)", en: "Eco-friendly, heavy metal free. For outdoor use – add 1% hardener (use within 12 h)" },
                    thinning: { uk: "Вода або сповільнювач AS 5000", pl: "Woda lub opóźniacz AS 5000", en: "Water or retarder AS 5000" },
                    additives: { uk: "Затверджувач для водостійкості", pl: "Utwardzacz do wodoodporności", en: "Hardener for water resistance" }
                }
            },
            { 
                id: "OTF",
                name: { uk: "OPATEX OTF", pl: "OPATEX OTF", en: "OPATEX OTF" },
                category: "Текстиль",
                description: {
                    uk: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах (натуральних та більшості синтетичних).",
                    pl: "Superkryjąca farba wodna do druku bezpośredniego i transferowego na ciemnych tkaninach (naturalnych i większości syntetycznych).",
                    en: "Super opaque water-based ink for direct and transfer printing on dark fabrics (natural and most synthetic)."
                },
                properties: {
                    type: { uk: "Super kryjąca farba wodna", pl: "Superkryjąca farba wodna", en: "Super opaque water-based ink" },
                    finish: { uk: "Криючий, м'який, без гумового ефекту", pl: "Kryjący, miękki, bez efektu gumy", en: "Opaque, soft, no rubber effect" },
                    drying: { uk: "3 хв при 150°C без затверджувача; з 3% HOT – термофіксація не потрібна", pl: "3 min w 150°C bez utwardzacza; z 3% HOT – nie wymaga termofiksacji", en: "3 min at 150°C without hardener; with 3% HOT – no heat fixation needed" },
                    mesh: { uk: "P34T до P77T", pl: "P34T do P77T", en: "P34T to P77T" },
                    cleaning: { uk: "Холодна вода + мийний засіб (Aquaclean), під високим тиском; для емульсій водостійких – CT 1000/63", pl: "Zimna woda + środek czyszczący (Aquaclean), pod wysokim ciśnieniem; dla emulsji wodoodpornych – CT 1000/63", en: "Cold water + cleaning agent (Aquaclean), high pressure; for water-resistant emulsions – CT 1000/63" },
                    storage: { uk: "1-2 роки при 10-25°C, берегти від морозу", pl: "1-2 lata w temp. 10-25°C, chronić przed mrozem", en: "1-2 years at 10-25°C, protect from frost" },
                    resistance: { uk: "Відмінна після додавання HOT. Для нейлону – HOT обов'язково.", pl: "Doskonała po dodaniu HOT. Do nylonu – HOT obowiązkowo.", en: "Excellent after adding HOT. For nylon – HOT mandatory." },
                    thinning: { uk: "Max 10% води, або OTF 5000 (повільний), або OTF 7000 (еластичний). Сумарно не більше 10%.", pl: "Max 10% wody, lub OTF 5000 (wolny), lub OTF 7000 (elastyczny). Łącznie nie więcej niż 10%.", en: "Max 10% water, or OTF 5000 (slow), or OTF 7000 (elastic). Total not more than 10%." },
                    additives: { uk: "HOT – затверджувач 3%; OTF 150/14 – лак для трансферу (стійкість до прання, еластичність); OTF 150/18 – повільна версія; OTF 100/101 – чорний блокатор міграції для поліестеру; База пучення OTF – змішувати з пастами PPT (100г бази + 5г пасти)", pl: "HOT – utwardzacz 3%; OTF 150/14 – lakier do transferu (odporność na pranie, elastyczność); OTF 150/18 – wolna wersja; OTF 100/101 – czarny blokator migracji do poliestru; Baza pęczniejąca OTF – mieszać z pastami PPT (100g bazy + 5g pasty)", en: "HOT – hardener 3%; OTF 150/14 – transfer varnish (wash resistance, elasticity); OTF 150/18 – slow version; OTF 100/101 – black migration blocker for polyester; OTF puff base – mix with PPT pastes (100g base + 5g paste)" },
                    special: { uk: "Дуже криюча, еластична, незважаючи на високі криючі властивості. Трансфер: протокол для 1-кольорових та багатокольорових; Transferglue OTF nr 2 – клей із порошком усередині; порошки Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", pl: "Bardzo kryjąca, elastyczna, pomimo wysokich właściwości kryjących. Transfer: protokół dla 1-kolorowych i wielokolorowych; Transferglue OTF nr 2 – klej z proszkiem w środku; proszki Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", en: "Very opaque, elastic, despite high opacity. Transfer: protocol for 1-color and multicolor; Transferglue OTF nr 2 – adhesive with powder inside; Soft powders nr 3, nr 12, nr 4, nr 13; Cold peel." }
                }
            },
            { 
                id: "TPP",
                name: { uk: "POLYPRO TPP", pl: "POLYPRO TPP", en: "POLYPRO TPP" },
                category: "Пластики",
                description: {
                    uk: "Розчинникова фарба для поліетилену, поліпропілену та полікарбонату (priplack, akylux, duoprop). Для попередньо активованого поліетилену – додати HTPP SLOW.",
                    pl: "Farba rozpuszczalnikowa do polietylenu, polipropylenu i poliwęglanu (priplack, akylux, duoprop). Do wstępnie aktywowanego polietylenu – dodać HTPP SLOW.",
                    en: "Solvent-based ink for polyethylene, polypropylene and polycarbonate (priplack, akylux, duoprop). For pre-activated polyethylene – add HTPP SLOW."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "10 хв на відкритому повітрі, миттєво в тунелі", pl: "10 min na otwartym powietrzu, natychmiastowo w tunelu", en: "10 min open air, instantly in tunnel" },
                    mesh: { uk: "P90-120", pl: "P90-120", en: "P90-120" },
                    cleaning: { uk: "ST 1000", pl: "ST 1000", en: "ST 1000" },
                    storage: { uk: "Необмежений", pl: "Nieograniczony", en: "Unlimited" },
                    resistance: { uk: "Дуже хороша стійкість до світла та атмосферних умов", pl: "Bardzo dobra odporność na światło i warunki atmosferyczne", en: "Very good light and weather resistance" },
                    thinning: { uk: "TPP 1000 (швидкий), TPP 2000 (нормальний), TPP 3000/4000 (легке сповільнення), TPP 5000 (повільний), TPP 8000 (дуже повільний). Середнє: +/-15%", pl: "TPP 1000 (szybki), TPP 2000 (normalny), TPP 3000/4000 (lekkie spowolnienie), TPP 5000 (wolny), TPP 8000 (bardzo wolny). Średnio: +/-15%", en: "TPP 1000 (fast), TPP 2000 (normal), TPP 3000/4000 (mild retarder), TPP 5000 (slow), TPP 8000 (very slow). Average: +/-15%" },
                    additives: { uk: "HTPP SLOW – затверджувач для стійкості до подряпин та адгезії (придатність 1 день); TPP 160 – високотиксотропна викривлююча добавка (10%); TPP 150 – прозора база / лак; AS 1000 – антистатик 5%; TPP 1702 – сповільнювач у гелі проти засихання", pl: "HTPP SLOW – utwardzacz do odporności na zarysowania i przyczepności (ważność 1 dzień); TPP 160 – dodatek wysokotiksotropowy wykrzywiający (10%); TPP 150 – baza przezroczysta / lakier; AS 1000 – antystatyk 5%; TPP 1702 – opóźniacz w żelu przeciw zasychaniu", en: "HTPP SLOW – hardener for scratch resistance and adhesion (usable 1 day); TPP 160 – highly thixotropic distorting additive (10%); TPP 150 – transparent base / varnish; AS 1000 – antistatic 5%; TPP 1702 – gel retarder against drying" },
                    special: { uk: "Не додавати матуючий порошок – знижує адгезію. Для проблемних поверхонь – матеріал має бути активований.", pl: "Nie dodawać proszku matującego – zmniejsza przyczepność. Do problematycznych powierzchni – materiał musi być aktywowany.", en: "Do not add matting powder – reduces adhesion. For problem surfaces – material must be activated." }
                }
            },
            { 
                id: "UV",
                name: { uk: "UVILUX UV", pl: "UVILUX UV", en: "UVILUX UV" },
                category: "UV фарби",
                description: {
                    uk: "Фарба та лак УФ для паперу, картону, офсетного друку. Лак UV 150 – ідеальний для офсету та трафаретного друку, особливо для чорних відбитків, проблемних при згинанні.",
                    pl: "Farba i lakier UV do papieru, tektury, druku offsetowego. Lakier UV 150 – idealny do offsetu i druku sitowego, zwłaszcza do czarnych nadruków, problematycznych przy zginaniu.",
                    en: "UV ink and varnish for paper, cardboard, offset printing. UV 150 varnish – ideal for offset and screen printing, especially for black prints problematic when folding."
                },
                properties: {
                    type: { uk: "Farba i lakier UV", pl: "Farba i lakier UV", en: "UV ink and varnish" },
                    finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
                    drying: { uk: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
                    mesh: { uk: "P140-P185T (алюміній/золото: P120, флуо: P90, стандарт: P150)", pl: "P140-P185T (aluminium/złoto: P120, fluo: P90, standard: P150)", en: "P140-P185T (aluminum/gold: P120, fluo: P90, standard: P150)" },
                    cleaning: { uk: "CT 1000 або CT 1000/l", pl: "CT 1000 lub CT 1000/l", en: "CT 1000 or CT 1000/l" },
                    storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
                    resistance: { uk: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік", pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku", en: "Very good for all colors, possible slight yellowing of varnish after one year" },
                    thinning: { uk: "UV 2000 – стандартний розчинник", pl: "UV 2000 – standardowy rozcieńczalnik", en: "UV 2000 – standard thinner" },
                    additives: { uk: "—", pl: "—", en: "—" },
                    special: { uk: "Висока еластичність – можна згинати/складати (важливо для POS-матеріалів). Продукти UV не містять розчинників.", pl: "Wysoka elastyczność – można zginać/składać (ważne dla materiałów POS). Produkty UV nie zawierają rozpuszczalników.", en: "High elasticity – can be bent/folded (important for POS materials). UV products are solvent-free." }
                }
            },
            { 
                id: "NST",
                name: { uk: "NYLONSTAR NST", pl: "NYLONSTAR NST", en: "NYLONSTAR NST" },
                category: "Текстиль",
                description: {
                    uk: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven. Висока еластичність, стійкість до стирання, атмосферних впливів та прання.",
                    pl: "Farba rozpuszczalnikowa do poliamidu (nylon) i toreb non-woven. Wysoka elastyczność, odporność na ścieranie, warunki atmosferyczne i pranie.",
                    en: "Solvent-based ink for polyamide (nylon) and non-woven bags. High elasticity, abrasion resistance, weather and wash resistance."
                },
                properties: {
                    type: { uk: "Farba rozpuszczalnikowa", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
                    finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
                    drying: { uk: "5 хв на відкритому повітрі, миттєво в тунелі", pl: "5 min na otwartym powietrzu, natychmiastowo w tunelu", en: "5 min open air, instantly in tunnel" },
                    mesh: { uk: "P45-P90", pl: "P45-P90", en: "P45-P90" },
                    cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
                    storage: { uk: "Понад 24 місяці", pl: "Ponad 24 miesiące", en: "Over 24 months" },
                    resistance: { uk: "Висока стійкість до прання та атмосферних умов; для покращення – 5% HNST SLOW", pl: "Wysoka odporność na pranie i warunki atmosferyczne; dla poprawy – 5% HNST SLOW", en: "High wash and weather resistance; for improvement – 5% HNST SLOW" },
                    thinning: { uk: "До 15% сповільнювача NST 1702", pl: "Do 15% opóźniacza NST 1702", en: "Up to 15% retarder NST 1702" },
                    additives: { uk: "HNST SLOW – каталізатор до 5%; NST 150 – прозора база (знижує криття та світлостійкість); MP 3000 – загусник 1-2%", pl: "HNST SLOW – katalizator do 5%; NST 150 – baza przezroczysta (zmniejsza krycie i odporność na światło); MP 3000 – zagęstnik 1-2%", en: "HNST SLOW – catalyst up to 5%; NST 150 – transparent base (reduces opacity and lightfastness); MP 3000 – thickener 1-2%" },
                    special: { uk: "Ультракриючі кольори: 40, 42, 56. Прозорі кольори: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Флуо – нижча світлостійкість. Всі кольори змішуються.", pl: "Ultrakryjące kolory: 40, 42, 56. Przezroczyste kolory: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – niższa odporność na światło. Wszystkie kolory mieszają się.", en: "Ultra-opaque colors: 40, 42, 56. Transparent colors: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – lower lightfastness. All colors are mixable." }
                }
            }
        ];

        // ---------- ДОДАТКОВІ СЕРІЇ ----------
        const extraSeries = [
            { 
                id: "SP",
                name: { uk: "SICOPRINT SP", pl: "SICOPRINT SP", en: "SICOPRINT SP" },
                category: "Універсальні",
                description: {
                    uk: "Універсальна розчинникова фарба для широкого спектру матеріалів.",
                    pl: "Uniwersalna farba rozpuszczalnikowa do szerokiej gamy materiałów.",
                    en: "Universal solvent-based ink for a wide range of materials."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SI",
                name: { uk: "SILICONE SI", pl: "SILICONE SI", en: "SILICONE SI" },
                category: "Спеціальні",
                description: {
                    uk: "Силіконова фарба для складних поверхонь, стійка до високих температур.",
                    pl: "Farba silikonowa do trudnych powierzchni, odporna na wysokie temperatury.",
                    en: "Silicone ink for difficult surfaces, resistant to high temperatures."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SN",
                name: { uk: "SICONYL SN", pl: "SICONYL SN", en: "SICONYL SN" },
                category: "Текстиль",
                description: {
                    uk: "Фарба для нейлону та синтетичних тканин, висока еластичність.",
                    pl: "Farba do nylonu i tkanin syntetycznych, wysoka elastyczność.",
                    en: "Ink for nylon and synthetic fabrics, high elasticity."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "NST").properties))
            },
            { 
                id: "QS",
                name: { uk: "QUICKSET QS", pl: "QUICKSET QS", en: "QUICKSET QS" },
                category: "Швидковисихаючі",
                description: {
                    uk: "Швидковисихаюча фарба для паперу та картону.",
                    pl: "Szybkoschnąca farba do papieru i tektury.",
                    en: "Quick-drying ink for paper and cardboard."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "CF").properties))
            },
            { 
                id: "PX",
                name: { uk: "SICEPOX PX", pl: "SICEPOX PX", en: "SICEPOX PX" },
                category: "Епоксидні",
                description: {
                    uk: "Епоксидна фарба для металів, скла, кераміки.",
                    pl: "Farba epoksydowa do metali, szkła, ceramiki.",
                    en: "Epoxy ink for metals, glass, ceramics."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "TPP").properties))
            },
            { 
                id: "EVS",
                name: { uk: "EVASTAR EVS", pl: "EVASTAR EVS", en: "EVASTAR EVS" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для EVA-матеріалів, відмінна адгезія.",
                    pl: "Farba do materiałów EVA, doskonała przyczepność.",
                    en: "Ink for EVA materials, excellent adhesion."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "SX").properties))
            },
            { 
                id: "ECVF",
                name: { uk: "VEHICLE ECVF", pl: "VEHICLE ECVF", en: "VEHICLE ECVF" },
                category: "Автомобільні",
                description: {
                    uk: "Фарба для автомобільних деталей, стійка до бензину та оливи.",
                    pl: "Farba do części samochodowych, odporna na benzynę i olej.",
                    en: "Ink for automotive parts, resistant to petrol and oil."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            },
            { 
                id: "SB",
                name: { uk: "SCRATCH SB", pl: "SCRATCH SB", en: "SCRATCH SB" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для дряпок (scratch-off), використовується в лотерейних квитках тощо.",
                    pl: "Farba zdrapka (scratch-off), stosowana w losach itp.",
                    en: "Scratch-off ink used in lottery tickets, etc."
                },
                properties: JSON.parse(JSON.stringify(baseSeries.find(s => s.id === "EC").properties))
            }
        ];

        // ---------- ОБ'ЄДНАННЯ СЕРІЙ З ДЕДУПЛІКАЦІЄЮ ----------
        const allSeries = [...baseSeries, ...extraSeries];
        const seriesMap = new Map();
        allSeries.forEach(s => seriesMap.set(s.id, s));
        const series = Array.from(seriesMap.values());

        // ---------- БАЗОВІ КОЛЬОРИ ----------
        const baseColors = [
            { code: "10", name: { uk: "Фіолетовий", pl: "Fioletowy", en: "Violet" }, color: "#800080" },
            { code: "20", name: { uk: "Синій", pl: "Niebieski", en: "Blue" }, color: "#0000FF" },
            { code: "20/B", name: { uk: "Синій Flex", pl: "Niebieski Flex", en: "Blue Flex" }, color: "#1E90FF" },
            { code: "P20/5", name: { uk: "Pantone Blue", pl: "Pantone Blue", en: "Pantone Blue" }, color: "#0066CC" },
            { code: "22", name: { uk: "Ультрамарин", pl: "Ultramaryna", en: "Ultramarine" }, color: "#4169E1" },
            { code: "24", name: { uk: "Блакитний", pl: "Niebieski jasny", en: "Light Blue" }, color: "#87CEEB" },
            { code: "26", name: { uk: "Світло-блакитний", pl: "Jasnoniebieski", en: "Light Blue 2" }, color: "#ADD8E6" },
            { code: "P26/2", name: { uk: "Pantone Blue 2", pl: "Pantone Blue 2", en: "Pantone Blue 2" }, color: "#6495ED" },
            { code: "27", name: { uk: "Бірюзовий", pl: "Turkusowy", en: "Turquoise" }, color: "#40E0D0" },
            { code: "30", name: { uk: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" }, color: "#006400" },
            { code: "31", name: { uk: "Зелений", pl: "Zielony", en: "Green" }, color: "#008000" },
            { code: "32", name: { uk: "Яскраво-зелений", pl: "Jasnozielony", en: "Bright Green" }, color: "#00FF00" },
            { code: "33", name: { uk: "Зелений трава", pl: "Zielony trawa", en: "Grass Green" }, color: "#7CFC00" },
            { code: "40", name: { uk: "Жовтий", pl: "Żółty", en: "Yellow" }, color: "#FFFF00" },
            { code: "41", name: { uk: "Цитриновий", pl: "Cytrynowy", en: "Lemon Yellow" }, color: "#FFFACD" },
            { code: "42", name: { uk: "Медовий", pl: "Miodowy", en: "Honey Yellow" }, color: "#F0E68C" },
            { code: "50", name: { uk: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" }, color: "#FFA500" },
            { code: "51", name: { uk: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange" }, color: "#FFB347" },
            { code: "56", name: { uk: "Червоний", pl: "Czerwony", en: "Red" }, color: "#FF0000" },
            { code: "60", name: { uk: "Темно-червоний", pl: "Ciemnoczerwony", en: "Dark Red" }, color: "#8B0000" },
            { code: "P60/38", name: { uk: "Pantone Red", pl: "Pantone Red", en: "Pantone Red" }, color: "#DC143C" },
            { code: "61", name: { uk: "Малиновий", pl: "Karminowy", en: "Carmine" }, color: "#DC143C" },
            { code: "P61/15", name: { uk: "Pantone Magenta", pl: "Pantone Magenta", en: "Pantone Magenta" }, color: "#FF00FF" },
            { code: "70", name: { uk: "Магента", pl: "Magenta", en: "Magenta" }, color: "#FF00FF" },
            { code: "80", name: { uk: "Коричневий", pl: "Brązowy", en: "Brown" }, color: "#A52A2A" },
            { code: "81", name: { uk: "Темно-коричневий", pl: "Ciemnobrązowy", en: "Dark Brown" }, color: "#8B4513" },
            { code: "82", name: { uk: "Бежевий", pl: "Beżowy", en: "Beige" }, color: "#F5F5DC" },
            { code: "90", name: { uk: "Білий", pl: "Biały", en: "White" }, color: "#FFFFFF" },
            { code: "91", name: { uk: "Криючий білий", pl: "Biały kryjący", en: "Opaque White" }, color: "#F8F8FF" },
            { code: "100", name: { uk: "Чорний", pl: "Czarny", en: "Black" }, color: "#000000" },
            { code: "110", name: { uk: "Срібло", pl: "Srebro", en: "Silver" }, color: "#C0C0C0" },
            { code: "120", name: { uk: "Золото", pl: "Złoto", en: "Gold" }, color: "#FFD700" },
            { code: "130", name: { uk: "Флуо жовтий", pl: "Fluo żółty", en: "Fluo Yellow" }, color: "#FFFF00" },
            { code: "131", name: { uk: "Флуо оранж", pl: "Fluo pomarańcz", en: "Fluo Orange" }, color: "#FFA500" },
            { code: "132", name: { uk: "Флуо червоний", pl: "Fluo czerwony", en: "Fluo Red" }, color: "#FF0000" },
            { code: "133", name: { uk: "Флуо рожевий", pl: "Fluo różowy", en: "Fluo Pink" }, color: "#FF69B4" },
            { code: "134", name: { uk: "Флуо зелений", pl: "Fluo zielony", en: "Fluo Green" }, color: "#00FF00" },
            { code: "135", name: { uk: "Флуо синій", pl: "Fluo niebieski", en: "Fluo Blue" }, color: "#0000FF" },
            { code: "136", name: { uk: "Флуо блакитний", pl: "Fluo jasnoniebieski", en: "Fluo Light Blue" }, color: "#87CEEB" },
            { code: "140", name: { uk: "CMYK Yellow", pl: "CMYK Yellow", en: "CMYK Yellow" }, color: "#FFFF00" },
            { code: "141", name: { uk: "CMYK Cyan", pl: "CMYK Cyan", en: "CMYK Cyan" }, color: "#00FFFF" },
            { code: "142", name: { uk: "CMYK Magenta", pl: "CMYK Magenta", en: "CMYK Magenta" }, color: "#FF00FF" },
            { code: "143", name: { uk: "CMYK Black", pl: "CMYK Black", en: "CMYK Black" }, color: "#000000" },
            { code: "15", name: { uk: "Прозорий фіолетовий", pl: "Transparent fioletowy", en: "Transparent Violet" }, color: "#E0B0FF" },
            { code: "25", name: { uk: "Прозорий синій", pl: "Transparent niebieski", en: "Transparent Blue" }, color: "#A0C8F0" },
            { code: "35", name: { uk: "Прозорий зелений", pl: "Transparent zielony", en: "Transparent Green" }, color: "#A0D6B4" },
            { code: "55", name: { uk: "Прозорий оранжевий", pl: "Transparent pomarańczowy", en: "Transparent Orange" }, color: "#FFDAB9" },
            { code: "65", name: { uk: "Прозорий червоний", pl: "Transparent czerwony", en: "Transparent Red" }, color: "#FFB6C1" },
            { code: "75", name: { uk: "Прозорий рожевий", pl: "Transparent różowy", en: "Transparent Pink" }, color: "#FFC0CB" }
        ];

        // ---------- ДОДАТКИ ----------
        const additives = [
            {
                id: "add-1",
                name: "SP160",
                series: "SP",
                category: "Additives",
                article: "SP160-SICOPRINT",
                displayName: {
                    uk: "SP160 Паста для растрового друку",
                    pl: "SP160 Pasta do wydruków rastrowych",
                    en: "SP160 Paste for halftone printing"
                },
                description: {
                    uk: "Паста для покращення растрового друку, зменшує крапкове збільшення.",
                    pl: "Pasta poprawiająca wydruki rastrowe, zmniejsza przyrost punktu.",
                    en: "Paste for improving halftone printing, reduces dot gain."
                }
            },
            {
                id: "add-2",
                name: "SP150",
                series: "SP",
                category: "Additives",
                article: "SP150-SICOPRINT",
                displayName: {
                    uk: "SP150 Прозора база",
                    pl: "SP150 Baza transparentna",
                    en: "SP150 Transparent base"
                },
                description: {
                    uk: "Прозора база для створення власних кольорів.",
                    pl: "Baza przezroczysta do tworzenia własnych kolorów.",
                    en: "Transparent base for creating custom colors."
                }
            },
            {
                id: "add-3",
                name: "SN170",
                series: "SN",
                category: "Additives",
                article: "SN170-SICONYL",
                displayName: {
                    uk: "SN170 Сповільнювач у гелі",
                    pl: "SN170 Opóźniacz w żelu",
                    en: "SN170 Gel retarder"
                },
                description: {
                    uk: "Сповільнювач у гелі для запобігання засиханню на сітці.",
                    pl: "Opóźniacz w żelu zapobiegający zasychaniu na sicie.",
                    en: "Gel retarder to prevent drying on the screen."
                }
            },
            {
                id: "add-4",
                name: "SN1702",
                series: "SN",
                category: "Additives",
                article: "SN1702-SICONYL",
                displayName: {
                    uk: "SN1702 Суперповільний сповільнювач у гелі",
                    pl: "SN1702 Opóźniacz w żelu superwolny",
                    en: "SN1702 Super slow gel retarder"
                },
                description: {
                    uk: "Надповільний сповільнювач для дуже детальних робіт.",
                    pl: "Bardzo wolny opóźniacz do bardzo szczegółowych prac.",
                    en: "Very slow retarder for highly detailed work."
                }
            },
            {
                id: "add-5",
                name: "SI150",
                series: "SI",
                category: "Additives",
                article: "SI150-SILICONE",
                displayName: {
                    uk: "SI150 Лак силіконовий",
                    pl: "SI150 Lakier silikonowy",
                    en: "SI150 Silicone varnish"
                },
                description: {
                    uk: "Силіконовий лак для захисту від вологи.",
                    pl: "Lakier silikonowy do ochrony przed wilgocią.",
                    en: "Silicone varnish for moisture protection."
                }
            },
            {
                id: "add-6",
                name: "PXHPX",
                series: "PX",
                category: "Additives",
                article: "PXHPX-SICEPOX",
                displayName: {
                    uk: "PXHPX Затверджувач епоксидний",
                    pl: "PXHPX Utwardzacz epoksydowy",
                    en: "PXHPX Epoxy hardener"
                },
                description: {
                    uk: "Затверджувач для епоксидних фарб.",
                    pl: "Utwardzacz do farb epoksydowych.",
                    en: "Hardener for epoxy inks."
                }
            },
            {
                id: "add-7",
                name: "PX160",
                series: "PX",
                category: "Additives",
                article: "PX160-SICEPOX",
                displayName: {
                    uk: "PX160 Паста для растрового друку",
                    pl: "PX160 Pasta do wydruków rastrowych",
                    en: "PX160 Paste for halftone printing"
                },
                description: {
                    uk: "Паста для покращення растрового друку в епоксидних фарбах.",
                    pl: "Pasta poprawiająca wydruki rastrowe w farbach epoksydowych.",
                    en: "Paste for improving halftone printing in epoxy inks."
                }
            },
            {
                id: "add-8",
                name: "PLUV160",
                series: "PLUV",
                category: "Additives",
                article: "PLUV160-UVIPLAST",
                displayName: {
                    uk: "PLUV160 Паста для растрового друку",
                    pl: "PLUV160 Pasta skracająca",
                    en: "PLUV160 Shortening paste"
                },
                description: {
                    uk: "Паста для зменшення текучості УФ-фарб.",
                    pl: "Pasta zmniejszająca płynność farb UV.",
                    en: "Paste for reducing flow of UV inks."
                }
            },
            {
                id: "add-9",
                name: "PLUV150",
                series: "PLUV",
                category: "Additives",
                article: "PLUV150-UVIPLAST",
                displayName: {
                    uk: "PLUV150 Прозора база UV",
                    pl: "PLUV150 Baza transparentna UV",
                    en: "PLUV150 Transparent UV base"
                },
                description: {
                    uk: "Прозора база для УФ-фарб.",
                    pl: "Baza przezroczysta do farb UV.",
                    en: "Transparent base for UV inks."
                }
            },
            {
                id: "add-10",
                name: "PLUV150 LED",
                series: "PLUV",
                category: "Additives",
                article: "PLUV150-LED-UVIPLAST",
                displayName: {
                    uk: "PLUV150 LED Прозора база UV-LED",
                    pl: "PLUV150 LED Baza transparentna UV-LED",
                    en: "PLUV150 LED Transparent UV-LED base"
                },
                description: {
                    uk: "Прозора база для УФ-LED фарб.",
                    pl: "Baza przezroczysta do farb UV-LED.",
                    en: "Transparent base for UV-LED inks."
                }
            },
            {
                id: "add-11",
                name: "PL5 VARNISH",
                series: "PL",
                category: "Additives",
                article: "PL5-VARNISH",
                displayName: {
                    uk: "PL5 Лак",
                    pl: "PL5 Lakier",
                    en: "PL5 Varnish"
                },
                description: {
                    uk: "Універсальний лак для захисту друку.",
                    pl: "Uniwersalny lakier do ochrony druku.",
                    en: "Universal varnish for print protection."
                }
            },
            {
                id: "add-12",
                name: "PIGMENT SILVER",
                series: "PLUV",
                category: "Additives",
                article: "PIGMENT-SILVER-UVIPLAST",
                displayName: {
                    uk: "Срібний пігмент для UV-LED",
                    pl: "Pigment srebrny do UV-LED",
                    en: "Silver pigment for UV-LED"
                },
                description: {
                    uk: "Срібний порошок для приготування срібної фарби UV-LED.",
                    pl: "Srebrny proszek do przygotowania srebrnej farby UV-LED.",
                    en: "Silver powder for making UV-LED silver ink."
                }
            },
            {
                id: "add-13",
                name: "PIGMENT GOLD",
                series: "PLUV",
                category: "Additives",
                article: "PIGMENT-GOLD-UVIPLAST",
                displayName: {
                    uk: "Золотий пігмент для UV-LED",
                    pl: "Pigment złoty do UV-LED",
                    en: "Gold pigment for UV-LED"
                },
                description: {
                    uk: "Золотий порошок для приготування золотої фарби UV-LED.",
                    pl: "Złoty proszek do przygotowania złotej farby UV-LED.",
                    en: "Gold powder for making UV-LED gold ink."
                }
            },
            {
                id: "add-14",
                name: "OTF PUFFING BASE",
                series: "OTF",
                category: "Additives",
                article: "OTFPB-OPATEX",
                displayName: {
                    uk: "OTF База пучення",
                    pl: "OTF Baza pęczniejąca",
                    en: "OTF Puff base"
                },
                description: {
                    uk: "База для 3D-ефекту (пучення) на тканині.",
                    pl: "Baza do efektu 3D (pęcznienia) na tkaninie.",
                    en: "Base for 3D puff effect on fabric."
                }
            },
            {
                id: "add-15",
                name: "NST150",
                series: "NST",
                category: "Additives",
                article: "NST150-NYLONSTAR",
                displayName: {
                    uk: "NST150 Прозора база",
                    pl: "NST150 Baza transparentna",
                    en: "NST150 Transparent base"
                },
                description: {
                    uk: "Прозора база для фарб Nylonstar.",
                    pl: "Baza przezroczysta do farb Nylonstar.",
                    en: "Transparent base for Nylonstar inks."
                }
            },
            {
                id: "add-16",
                name: "MP1000",
                series: "MP",
                category: "Additives",
                article: "MP1000",
                displayName: {
                    uk: "MP1000 Матуючий порошок",
                    pl: "MP1000 Proszek matujący",
                    en: "MP1000 Matting powder"
                },
                description: {
                    uk: "Порошок для матування фарб.",
                    pl: "Proszek do matowania farb.",
                    en: "Powder for matting inks."
                }
            },
            {
                id: "add-17",
                name: "GLASSBILLS",
                series: "GB",
                category: "Additives",
                article: "KULKI-GLASSBILLS",
                displayName: {
                    uk: "Скляні кульки для фарб",
                    pl: "Kulki szklane do farb",
                    en: "Glass beads for inks"
                },
                description: {
                    uk: "Скляні кульки для полегшення змішування фарб у банках.",
                    pl: "Kulki szklane ułatwiające mieszanie farb w puszkach.",
                    en: "Glass beads to facilitate mixing inks in cans."
                }
            },
            {
                id: "add-18",
                name: "EC240",
                series: "EC",
                category: "Additives",
                article: "EC240-EURECO",
                displayName: {
                    uk: "EC240 Універсальна емульсія",
                    pl: "EC240 Emulsja uniwersalna",
                    en: "EC240 Universal emulsion"
                },
                description: {
                    uk: "Емульсія для підготовки сіток.",
                    pl: "Emulsja do przygotowania sit.",
                    en: "Emulsion for screen preparation."
                }
            },
            {
                id: "add-19",
                name: "EC170",
                series: "EC",
                category: "Additives",
                article: "EC170-EURECO",
                displayName: {
                    uk: "EC170 Сповільнювач у гелі",
                    pl: "EC170 Opóźniacz w żelu",
                    en: "EC170 Gel retarder"
                },
                description: {
                    uk: "Сповільнювач у гелі для фарб EC.",
                    pl: "Opóźniacz w żelu do farb EC.",
                    en: "Gel retarder for EC inks."
                }
            },
            {
                id: "add-20",
                name: "EC1702",
                series: "EC",
                category: "Additives",
                article: "EC1702-EURECO",
                displayName: {
                    uk: "EC1702 Суперповільний сповільнювач у гелі",
                    pl: "EC1702 Opóźniacz w żelu superwolny",
                    en: "EC1702 Super slow gel retarder"
                },
                description: {
                    uk: "Надповільний сповільнювач для фарб EC.",
                    pl: "Bardzo wolny opóźniacz do farb EC.",
                    en: "Very slow retarder for EC inks."
                }
            },
            {
                id: "add-21",
                name: "EC160",
                series: "EC",
                category: "Additives",
                article: "EC160-EURECO",
                displayName: {
                    uk: "EC160 Паста для растрового друку",
                    pl: "EC160 Pasta skracająca",
                    en: "EC160 Shortening paste"
                },
                description: {
                    uk: "Паста для зменшення текучості фарб EC.",
                    pl: "Pasta zmniejszająca płynność farb EC.",
                    en: "Paste for reducing flow of EC inks."
                }
            },
            {
                id: "add-22",
                name: "EC150 UV BLOCKER",
                series: "EC",
                category: "Additives",
                article: "EC150-UV-EURECO",
                displayName: {
                    uk: "EC150 UV-блокатор",
                    pl: "EC150 UV Blocker",
                    en: "EC150 UV blocker"
                },
                description: {
                    uk: "Добавка для захисту від УФ-променів.",
                    pl: "Dodatek do ochrony przed promieniami UV.",
                    en: "Additive for UV protection."
                }
            },
            {
                id: "add-23",
                name: "EC150",
                series: "EC",
                category: "Additives",
                article: "EC150-EURECO",
                displayName: {
                    uk: "EC150 Прозора база",
                    pl: "EC150 Baza transparentna",
                    en: "EC150 Transparent base"
                },
                description: {
                    uk: "Прозора база для фарб EC.",
                    pl: "Baza przezroczysta do farb EC.",
                    en: "Transparent base for EC inks."
                }
            },
            {
                id: "add-24",
                name: "EC150/33",
                series: "EC",
                category: "Additives",
                article: "EC150-33-EURECO",
                displayName: {
                    uk: "EC150/33 Протиковзкий лак",
                    pl: "EC150/33 Lakier antypoślizgowy",
                    en: "EC150/33 Anti-slip varnish"
                },
                description: {
                    uk: "Лак з ефектом протиковзання.",
                    pl: "Lakier o działaniu antypoślizgowym.",
                    en: "Varnish with anti-slip effect."
                }
            },
            {
                id: "add-25",
                name: "EC1501",
                series: "EC",
                category: "Additives",
                article: "EC1501-EURECO",
                displayName: {
                    uk: "EC1501 Фінішний лак",
                    pl: "EC1501 Lakier wykończeniowy",
                    en: "EC1501 Finishing varnish"
                },
                description: {
                    uk: "Лак для захисту та надання глянцю.",
                    pl: "Lakier do ochrony i nadania połysku.",
                    en: "Varnish for protection and gloss."
                }
            },
            {
                id: "add-26",
                name: "CPV",
                series: "CPV",
                category: "Additives",
                article: "CPV-SOLVENTBASED",
                displayName: {
                    uk: "CPV Заповнювач для водних фарб",
                    pl: "CPV Filler do farb wodnych",
                    en: "CPV Filler for water-based inks"
                },
                description: {
                    uk: "Заповнювач для регулювання консистенції водних фарб.",
                    pl: "Wypełniacz do regulacji konsystencji farb wodnych.",
                    en: "Filler for adjusting consistency of water-based inks."
                }
            },
            {
                id: "add-27",
                name: "CF170",
                series: "CF",
                category: "Additives",
                article: "CF170-CARTOFLEX",
                displayName: {
                    uk: "CF170 Сповільнювач у гелі",
                    pl: "CF170 Opóźniacz w żelu",
                    en: "CF170 Gel retarder"
                },
                description: {
                    uk: "Сповільнювач у гелі для фарб Cartoflex.",
                    pl: "Opóźniacz w żelu do farb Cartoflex.",
                    en: "Gel retarder for Cartoflex inks."
                }
            },
            {
                id: "add-28",
                name: "CF1702",
                series: "CF",
                category: "Additives",
                article: "CF1702-CARTOFLEX",
                displayName: {
                    uk: "CF1702 Суперповільний сповільнювач у гелі",
                    pl: "CF1702 Opóźniacz w żelu superwolny",
                    en: "CF1702 Super slow gel retarder"
                },
                description: {
                    uk: "Надповільний сповільнювач для фарб Cartoflex.",
                    pl: "Bardzo wolny opóźniacz do farb Cartoflex.",
                    en: "Very slow retarder for Cartoflex inks."
                }
            },
            {
                id: "add-29",
                name: "CF160",
                series: "CF",
                category: "Additives",
                article: "CF160-CARTOFLEX",
                displayName: {
                    uk: "CF160 Паста для растрового друку",
                    pl: "CF160 Pasta skracająca",
                    en: "CF160 Shortening paste"
                },
                description: {
                    uk: "Паста для зменшення текучості фарб Cartoflex.",
                    pl: "Pasta zmniejszająca płynność farb Cartoflex.",
                    en: "Paste for reducing flow of Cartoflex inks."
                }
            },
            {
                id: "add-30",
                name: "CF150",
                series: "CF",
                category: "Additives",
                article: "CF150-CARTOFLEX",
                displayName: {
                    uk: "CF150 Прозора база",
                    pl: "CF150 Baza transparentna",
                    en: "CF150 Transparent base"
                },
                description: {
                    uk: "Прозора база для фарб Cartoflex.",
                    pl: "Baza przezroczysta do farb Cartoflex.",
                    en: "Transparent base for Cartoflex inks."
                }
            },
            {
                id: "add-31",
                name: "CF1501",
                series: "CF",
                category: "Additives",
                article: "CF1501-CARTOFLEX",
                displayName: {
                    uk: "CF1501 Фінішний лак",
                    pl: "CF1501 Lakier wykończeniowy",
                    en: "CF1501 Finishing varnish"
                },
                description: {
                    uk: "Лак для захисту та надання глянцю.",
                    pl: "Lakier do ochrony i nadania połysku.",
                    en: "Varnish for protection and gloss."
                }
            },
            {
                id: "add-32",
                name: "AS150",
                series: "AS",
                category: "Additives",
                article: "AS150-AQUASET",
                displayName: {
                    uk: "AS150 Прозора база",
                    pl: "AS150 Baza transparentna",
                    en: "AS150 Transparent base"
                },
                description: {
                    uk: "Прозора база для водних фарб Aquaset.",
                    pl: "Baza przezroczysta do farb wodnych Aquaset.",
                    en: "Transparent base for Aquaset water-based inks."
                }
            },
            {
                id: "add-33",
                name: "OTF110 REFLEX",
                series: "OTF",
                category: "Additives",
                article: "OTF110REFLEX",
                displayName: {
                    uk: "OTF110 Reflex Aluminium",
                    pl: "OTF110 Reflex Aluminium",
                    en: "OTF110 Reflex Aluminum"
                },
                description: {
                    uk: "Срібна паста з високою відбивною здатністю.",
                    pl: "Srebrna pasta o wysokiej zdolności odbijania.",
                    en: "Silver paste with high reflectivity."
                }
            }
        ];

        // ---------- СПЕЦІАЛЬНІ ФАРБИ ----------
        const specialPaints = [
            { name: "SP23", series: "SP", baseColorCode: "23", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SX90", series: "SX", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "SX82", series: "SX", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "SX81", series: "SX", baseColorCode: "81", color: "#8B4513", colorNameUk: "Темно-коричневий", colorNamePl: "Ciemnobrązowy", colorNameEn: "Dark Brown" },
            { name: "SX80", series: "SX", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SX75", series: "SX", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Прозорий рожевий", colorNamePl: "Transparent różowy", colorNameEn: "Transparent Pink" },
            { name: "SX70", series: "SX", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SX70/21", series: "SX", baseColorCode: "70/21", color: "#E31B23", colorNameUk: "Rubine Red", colorNamePl: "Rubine Red", colorNameEn: "Rubine Red" },
            { name: "SX65", series: "SX", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Прозорий червоний", colorNamePl: "Transparent czerwony", colorNameEn: "Transparent Red" },
            { name: "SX61", series: "SX", baseColorCode: "61", color: "#DC143C", colorNameUk: "Малиновий", colorNamePl: "Karminowy", colorNameEn: "Carmine" },
            { name: "SX60", series: "SX", baseColorCode: "60", color: "#8B0000", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "SX56", series: "SX", baseColorCode: "56", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SX56/2", series: "SX", baseColorCode: "56/2", color: "#FF4444", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SX55", series: "SX", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Прозорий оранжевий", colorNamePl: "Transparent pomarańczowy", colorNameEn: "Transparent Orange" },
            { name: "SX51", series: "SX", baseColorCode: "51", color: "#FFB347", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "SX50", series: "SX", baseColorCode: "50", color: "#FFA500", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SX42", series: "SX", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Медовий", colorNamePl: "Miodowy", colorNameEn: "Honey Yellow" },
            { name: "SX41", series: "SX", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "SX40", series: "SX", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SX35", series: "SX", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Прозорий зелений", colorNamePl: "Transparent zielony", colorNameEn: "Transparent Green" },
            { name: "SX33", series: "SX", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений трава", colorNamePl: "Zielony trawa", colorNameEn: "Grass Green" },
            { name: "SX32", series: "SX", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "SX31", series: "SX", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SX30", series: "SX", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "SX27", series: "SX", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "SX26", series: "SX", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-блакитний", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue 2" },
            { name: "SX26/19", series: "SX", baseColorCode: "26/19", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "SX25", series: "SX", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Прозорий синій", colorNamePl: "Transparent niebieski", colorNameEn: "Transparent Blue" },
            { name: "SX24", series: "SX", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Блакитний", colorNamePl: "Niebieski jasny", colorNameEn: "Light Blue" },
            { name: "SX23", series: "SX", baseColorCode: "23", color: "#4B0082", colorNameUk: "Ультрамарин база", colorNamePl: "Ultramaryna baza", colorNameEn: "Ultramarine base" },
            { name: "SX22", series: "SX", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SX20", series: "SX", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "SX20/64", series: "SX", baseColorCode: "20/64", color: "#000080", colorNameUk: "Granatowa 072C", colorNamePl: "Granatowa 072C", colorNameEn: "Navy blue 072C" },
            { name: "SX20/14", series: "SX", baseColorCode: "20/14", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "SX15", series: "SX", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Прозорий фіолетовий", colorNamePl: "Transparent fioletowy", colorNameEn: "Transparent Violet" },
            { name: "SX143", series: "SX", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "SX142", series: "SX", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "SX141", series: "SX", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "SX140", series: "SX", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "SX136", series: "SX", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "SX135", series: "SX", baseColorCode: "135", color: "#0000FF", colorNameUk: "Флуо синій", colorNamePl: "Fluo niebieski", colorNameEn: "Fluo Blue" },
            { name: "SX134", series: "SX", baseColorCode: "134", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "SX133", series: "SX", baseColorCode: "133", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "SX132", series: "SX", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "SX131", series: "SX", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо оранж", colorNamePl: "Fluo pomarańcz", colorNameEn: "Fluo Orange" },
            { name: "SX130", series: "SX", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "SX10", series: "SX", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SX100", series: "SX", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "SI91", series: "SI", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "SI82", series: "SI", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "SI81", series: "SI", baseColorCode: "81", color: "#8B4513", colorNameUk: "Темно-коричневий", colorNamePl: "Ciemnobrązowy", colorNameEn: "Dark Brown" },
            { name: "SI80", series: "SI", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SI75", series: "SI", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "SI70", series: "SI", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SI61", series: "SI", baseColorCode: "61", color: "#DC143C", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "SI60", series: "SI", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SI56", series: "SI", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "SI56/4", series: "SI", baseColorCode: "56/4", color: "#F93E3E", colorNameUk: "Warm Red", colorNamePl: "Warm Red", colorNameEn: "Warm Red" },
            { name: "SI51", series: "SI", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SI50", series: "SI", baseColorCode: "50", color: "#FFA500", colorNameUk: "Яскраво-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "SI42", series: "SI", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "SI41", series: "SI", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SI40", series: "SI", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "SI33", series: "SI", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SI32", series: "SI", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "SI31", series: "SI", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SI30", series: "SI", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "SI27", series: "SI", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "SI26", series: "SI", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "SI24", series: "SI", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "SI22", series: "SI", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SI20", series: "SI", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "SI120", series: "SI", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "SI10", series: "SI", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SI100", series: "SI", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "OTF91", series: "OTF", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "OTF91/37", series: "OTF", baseColorCode: "91/37", color: "#F8F8FF", colorNameUk: "Білий цифровий підклад", colorNamePl: "Biały podkład cyfrowy", colorNameEn: "Digital backing white" },
            { name: "OTF81", series: "OTF", baseColorCode: "81", color: "#8B4513", colorNameUk: "Темно-коричневий", colorNamePl: "Ciemnobrązowy", colorNameEn: "Dark Brown" },
            { name: "OTF80", series: "OTF", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "OTF75", series: "OTF", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "OTF70", series: "OTF", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "OTF70/56", series: "OTF", baseColorCode: "70/56", color: "#E31B23", colorNameUk: "Rubine Red Opaque", colorNamePl: "Rubine Red Opaque", colorNameEn: "Rubine Red Opaque" },
            { name: "OTF65", series: "OTF", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "OTF61", series: "OTF", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "OTF60", series: "OTF", baseColorCode: "60", color: "#8B0000", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "OTF56", series: "OTF", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "OTF56/7", series: "OTF", baseColorCode: "56/7", color: "#F93E3E", colorNameUk: "Warm Red Opaque", colorNamePl: "Warm Red Opaque", colorNameEn: "Warm Red Opaque" },
            { name: "OTF55", series: "OTF", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "OTF51", series: "OTF", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "OTF50", series: "OTF", baseColorCode: "50", color: "#FFA500", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "OTF42", series: "OTF", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "OTF41", series: "OTF", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "OTF40", series: "OTF", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "OTF33", series: "OTF", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "OTF32", series: "OTF", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "OTF31", series: "OTF", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "OTF30", series: "OTF", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "OTF27", series: "OTF", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "OTF26", series: "OTF", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "OTF25", series: "OTF", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "OTF24", series: "OTF", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "OTF22", series: "OTF", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "OTF20", series: "OTF", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "OTF20B", series: "OTF", baseColorCode: "20B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "OTF20/11", series: "OTF", baseColorCode: "20/11", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "OTF15", series: "OTF", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "OTF150", series: "OTF", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора база", colorNamePl: "Baza transparentna", colorNameEn: "Transparent base" },
            { name: "OTF150/15", series: "OTF", baseColorCode: "150/15", color: "#FFD700", colorNameUk: "Брокатова база", colorNamePl: "Baza brokatowa", colorNameEn: "Glitter base" },
            { name: "OTF138", series: "OTF", baseColorCode: "138", color: "#FFFFE0", colorNameUk: "Фотолюмінесцентна", colorNamePl: "Fotoluminescencyjna", colorNameEn: "Photoluminescent" },
            { name: "OTF135", series: "OTF", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "OTF134", series: "OTF", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "OTF132", series: "OTF", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "OTF130", series: "OTF", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "OTF120", series: "OTF", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "OTF110", series: "OTF", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "OTF110/15", series: "OTF", baseColorCode: "110/15", color: "#C0C0C0", colorNameUk: "Silver Reflex", colorNamePl: "Silver Reflex", colorNameEn: "Silver Reflex" },
            { name: "OTF110/14", series: "OTF", baseColorCode: "110/14", color: "#C0C0C0", colorNameUk: "Алюміній", colorNamePl: "Aluminium", colorNameEn: "Aluminum" },
            { name: "OTF10", series: "OTF", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "OTF100", series: "OTF", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "AS91", series: "AS", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "AS90", series: "AS", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "AS82", series: "AS", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "AS81", series: "AS", baseColorCode: "81", color: "#8B4513", colorNameUk: "Темно-коричневий", colorNamePl: "Ciemnobrązowy", colorNameEn: "Dark Brown" },
            { name: "AS70", series: "AS", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "AS61", series: "AS", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "AS61/63", series: "AS", baseColorCode: "61/63", color: "#E31B23", colorNameUk: "032C", colorNamePl: "032C", colorNameEn: "032C" },
            { name: "AS61/34", series: "AS", baseColorCode: "61/34", color: "#E31B23", colorNameUk: "Rubine Red C", colorNamePl: "Rubine Red C", colorNameEn: "Rubine Red C" },
            { name: "AS60", series: "AS", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "AS56", series: "AS", baseColorCode: "56", color: "#FF0000", colorNameUk: "Цинобр", colorNamePl: "Cynober", colorNameEn: "Vermilion" },
            { name: "AS51", series: "AS", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "AS50", series: "AS", baseColorCode: "50", color: "#FFA500", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "AS42", series: "AS", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "AS41", series: "AS", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "AS40", series: "AS", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "AS33", series: "AS", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "AS32", series: "AS", baseColorCode: "32", color: "#00FF00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "AS31", series: "AS", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "AS30", series: "AS", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "AS27", series: "AS", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "AS26", series: "AS", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "AS26/10", series: "AS", baseColorCode: "26/10", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "AS24", series: "AS", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "AS22", series: "AS", baseColorCode: "22", color: "#4169E1", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "AS20", series: "AS", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "AS20/78", series: "AS", baseColorCode: "20/78", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "AS20/53", series: "AS", baseColorCode: "20/53", color: "#000080", colorNameUk: "072", colorNamePl: "072", colorNameEn: "072" },
            { name: "AS143", series: "AS", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "AS142", series: "AS", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "AS141", series: "AS", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "AS140", series: "AS", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "AS138", series: "AS", baseColorCode: "138", color: "#FFFFE0", colorNameUk: "Фосфорна", colorNamePl: "Fosforyzująca", colorNameEn: "Phosphorescent" },
            { name: "AS136", series: "AS", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "AS135", series: "AS", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "AS134", series: "AS", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "AS133", series: "AS", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "AS132", series: "AS", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "AS131", series: "AS", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "AS130", series: "AS", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "AS120 RG", series: "AS", baseColorCode: "120 RG", color: "#FFD700", colorNameUk: "Rich Gold", colorNamePl: "Rich Gold", colorNameEn: "Rich Gold" },
            { name: "AS110", series: "AS", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "AS10", series: "AS", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "AS100", series: "AS", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "PPUV91/W1", series: "PLUV", baseColorCode: "91/W1", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "PLUV91", series: "PLUV", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "PLUV91 LED", series: "PLUV", baseColorCode: "91 LED", color: "#F8F8FF", colorNameUk: "Білий криючий LED", colorNamePl: "Biały kryjący LED", colorNameEn: "Opaque White LED" },
            { name: "PLUV91/53", series: "PLUV", baseColorCode: "91/53", color: "#F8F8FF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "PLUV90", series: "PLUV", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "PLUV90 LED", series: "PLUV", baseColorCode: "90 LED", color: "#FFFFFF", colorNameUk: "Білий LED", colorNamePl: "Biały LED", colorNameEn: "White LED" },
            { name: "PLUV82", series: "PLUV", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Вохра", colorNamePl: "Ochra", colorNameEn: "Ochre" },
            { name: "PLUV82 LED", series: "PLUV", baseColorCode: "82 LED", color: "#F5F5DC", colorNameUk: "Вохра LED", colorNamePl: "Ochra LED", colorNameEn: "Ochre LED" },
            { name: "PLUV81", series: "PLUV", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "PLUV81 LED", series: "PLUV", baseColorCode: "81 LED", color: "#8B4513", colorNameUk: "Коричневий LED", colorNamePl: "Brązowy LED", colorNameEn: "Brown LED" },
            { name: "PLUV80", series: "PLUV", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "PLUV80 LED", series: "PLUV", baseColorCode: "80 LED", color: "#A52A2A", colorNameUk: "Коричневий LED", colorNamePl: "Brązowy LED", colorNameEn: "Brown LED" },
            { name: "PLUV75", series: "PLUV", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "PLUV75 LED", series: "PLUV", baseColorCode: "75 LED", color: "#FFC0CB", colorNameUk: "Magenta база LED", colorNamePl: "Magenta baza LED", colorNameEn: "Magenta base LED" },
            { name: "PLUV70", series: "PLUV", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "PLUV70 LED", series: "PLUV", baseColorCode: "70 LED", color: "#FF00FF", colorNameUk: "Магента LED", colorNamePl: "Magenta LED", colorNameEn: "Magenta LED" },
            { name: "PLUV65", series: "PLUV", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "PLUV65 LED", series: "PLUV", baseColorCode: "65 LED", color: "#FFB6C1", colorNameUk: "Червона база LED", colorNamePl: "Czerwona baza LED", colorNameEn: "Red base LED" },
            { name: "PLUV61", series: "PLUV", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "PLUV61 LED", series: "PLUV", baseColorCode: "61 LED", color: "#DC143C", colorNameUk: "Червоний LED", colorNamePl: "Czerwony LED", colorNameEn: "Red LED" },
            { name: "PLUV61/15", series: "PLUV", baseColorCode: "61/15", color: "#E31B23", colorNameUk: "Rubine Red", colorNamePl: "Rubine Red", colorNameEn: "Rubine Red" },
            { name: "PLUV61/15 LED", series: "PLUV", baseColorCode: "61/15 LED", color: "#E31B23", colorNameUk: "Rubine Red LED", colorNamePl: "Rubine Red LED", colorNameEn: "Rubine Red LED" },
            { name: "PLUV60", series: "PLUV", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "PLUV60 LED", series: "PLUV", baseColorCode: "60 LED", color: "#8B0000", colorNameUk: "Червоний LED", colorNamePl: "Czerwony LED", colorNameEn: "Red LED" },
            { name: "PLUV60C", series: "PLUV", baseColorCode: "60C", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "PLUV60/6", series: "PLUV", baseColorCode: "60/6", color: "#E31B23", colorNameUk: "PMS 032 Red", colorNamePl: "PMS 032 Red", colorNameEn: "PMS 032 Red" },
            { name: "PLUV60/6 LED", series: "PLUV", baseColorCode: "60/6 LED", color: "#E31B23", colorNameUk: "Pantone 032 LED", colorNamePl: "Pantone 032 LED", colorNameEn: "Pantone 032 LED" },
            { name: "PLUV56", series: "PLUV", baseColorCode: "56", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "PLUV56 LED", series: "PLUV", baseColorCode: "56 LED", color: "#FF0000", colorNameUk: "Цинобр LED", colorNamePl: "Cynober LED", colorNameEn: "Vermilion LED" },
            { name: "PLUV55", series: "PLUV", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "PLUV55 LED", series: "PLUV", baseColorCode: "55 LED", color: "#FFDAB9", colorNameUk: "Помаранчевий LED", colorNamePl: "Pomarańczowy LED", colorNameEn: "Orange LED" },
            { name: "PLUV51", series: "PLUV", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "PLUV51 LED", series: "PLUV", baseColorCode: "51 LED", color: "#FFB347", colorNameUk: "Помаранчевий LED", colorNamePl: "Pomarańczowy LED", colorNameEn: "Orange LED" },
            { name: "PLUV51/39", series: "PLUV", baseColorCode: "51/39", color: "#FF8C00", colorNameUk: "PMS 10147", colorNamePl: "PMS 10147", colorNameEn: "PMS 10147" },
            { name: "PLUV50", series: "PLUV", baseColorCode: "50", color: "#FFA500", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "PLUV50 LED", series: "PLUV", baseColorCode: "50 LED", color: "#FFA500", colorNameUk: "Помаранчевий LED", colorNamePl: "Pomarańczowy LED", colorNameEn: "Orange LED" },
            { name: "PLUV42", series: "PLUV", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "PLUV42 LED", series: "PLUV", baseColorCode: "42 LED", color: "#F0E68C", colorNameUk: "Жовтий LED", colorNamePl: "Żółty LED", colorNameEn: "Yellow LED" },
            { name: "PLUV42/42", series: "PLUV", baseColorCode: "42/42", color: "#FFD700", colorNameUk: "Жовтий 137C", colorNamePl: "Żółty 137C", colorNameEn: "Yellow 137C" },
            { name: "PLUV42/42 LED", series: "PLUV", baseColorCode: "42/42 LED", color: "#FFD700", colorNameUk: "Жовтий 137C LED", colorNamePl: "Żółty 137C LED", colorNameEn: "Yellow 137C LED" },
            { name: "PLUV42/40", series: "PLUV", baseColorCode: "42/40", color: "#FFD700", colorNameUk: "Жовтий 130C", colorNamePl: "Żółty 130C", colorNameEn: "Yellow 130C" },
            { name: "PLUV42/40 LED", series: "PLUV", baseColorCode: "42/40 LED", color: "#FFD700", colorNameUk: "Жовтий 130C LED", colorNamePl: "Żółty 130C LED", colorNameEn: "Yellow 130C LED" },
            { name: "PLUV41", series: "PLUV", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "PLUV41 LED", series: "PLUV", baseColorCode: "41 LED", color: "#FFFACD", colorNameUk: "Жовтий LED", colorNamePl: "Żółty LED", colorNameEn: "Yellow LED" },
            { name: "PLUV40", series: "PLUV", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "PLUV40 LED", series: "PLUV", baseColorCode: "40 LED", color: "#FFFF00", colorNameUk: "Жовтий LED", colorNamePl: "Żółty LED", colorNameEn: "Yellow LED" },
            { name: "PLUV35", series: "PLUV", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "PLUV35 LED", series: "PLUV", baseColorCode: "35 LED", color: "#A0D6B4", colorNameUk: "Зелена база LED", colorNamePl: "Zielona baza LED", colorNameEn: "Green base LED" },
            { name: "PLUV33", series: "PLUV", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "PLUV33 LED", series: "PLUV", baseColorCode: "33 LED", color: "#7CFC00", colorNameUk: "Зелений LED", colorNamePl: "Zielony LED", colorNameEn: "Green LED" },
            { name: "PLUV32", series: "PLUV", baseColorCode: "32", color: "#00FF00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "PLUV32 LED", series: "PLUV", baseColorCode: "32 LED", color: "#00FF00", colorNameUk: "Зелений LED", colorNamePl: "Zielony LED", colorNameEn: "Green LED" },
            { name: "PLUV32/77", series: "PLUV", baseColorCode: "32/77", color: "#228B22", colorNameUk: "Pantone 7738 C", colorNamePl: "Pantone 7738 C", colorNameEn: "Pantone 7738 C" },
            { name: "PLUV31", series: "PLUV", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "PLUV31 LED", series: "PLUV", baseColorCode: "31 LED", color: "#008000", colorNameUk: "Зелений LED", colorNamePl: "Zielony LED", colorNameEn: "Green LED" },
            { name: "PLUV31/26", series: "PLUV", baseColorCode: "31/26", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "PLUV30", series: "PLUV", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "PLUV30 LED", series: "PLUV", baseColorCode: "30 LED", color: "#006400", colorNameUk: "Темно-зелений LED", colorNamePl: "Ciemnozielony LED", colorNameEn: "Dark Green LED" },
            { name: "PLUV27", series: "PLUV", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "PLUV27 LED", series: "PLUV", baseColorCode: "27 LED", color: "#40E0D0", colorNameUk: "Бірюзовий LED", colorNamePl: "Turkusowy LED", colorNameEn: "Turquoise LED" },
            { name: "PLUV26", series: "PLUV", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "PLUV26 LED", series: "PLUV", baseColorCode: "26 LED", color: "#ADD8E6", colorNameUk: "Світло-синій LED", colorNamePl: "Jasnoniebieski LED", colorNameEn: "Light Blue LED" },
            { name: "PLUV26/5", series: "PLUV", baseColorCode: "26/5", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "PLUV26/5 LED", series: "PLUV", baseColorCode: "26/5 LED", color: "#00BFFF", colorNameUk: "Process Blue LED", colorNamePl: "Process Blue LED", colorNameEn: "Process Blue LED" },
            { name: "PLUV2627", series: "PLUV", baseColorCode: "2627", color: "#4B0082", colorNameUk: "Фіолетовий Pantone", colorNamePl: "Fioletowy Pantone", colorNameEn: "Violet Pantone" },
            { name: "PLUV25", series: "PLUV", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "PLUV25 LED", series: "PLUV", baseColorCode: "25 LED", color: "#A0C8F0", colorNameUk: "Синя база LED", colorNamePl: "Niebieska baza LED", colorNameEn: "Blue base LED" },
            { name: "PLUV24", series: "PLUV", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "PLUV24 LED", series: "PLUV", baseColorCode: "24 LED", color: "#87CEEB", colorNameUk: "Синій LED", colorNamePl: "Niebieski LED", colorNameEn: "Blue LED" },
            { name: "PLUV24/21", series: "PLUV", baseColorCode: "24/21", color: "#4169E1", colorNameUk: "Pantone 286C", colorNamePl: "Pantone 286C", colorNameEn: "Pantone 286C" },
            { name: "PLUV24/10", series: "PLUV", baseColorCode: "24/10", color: "#4169E1", colorNameUk: "Pantone 285C", colorNamePl: "Pantone 285C", colorNameEn: "Pantone 285C" },
            { name: "PLUV23", series: "PLUV", baseColorCode: "23", color: "#4169E1", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "PLUV23 LED", series: "PLUV", baseColorCode: "23 LED", color: "#4169E1", colorNameUk: "Синій LED", colorNamePl: "Niebieski LED", colorNameEn: "Blue LED" },
            { name: "PLUV22", series: "PLUV", baseColorCode: "22", color: "#4169E1", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "PLUV22 LED", series: "PLUV", baseColorCode: "22 LED", color: "#4169E1", colorNameUk: "Синій LED", colorNamePl: "Niebieski LED", colorNameEn: "Blue LED" },
            { name: "PLUV20", series: "PLUV", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "PLUV20 LED", series: "PLUV", baseColorCode: "20 LED", color: "#00008B", colorNameUk: "Синій LED", colorNamePl: "Niebieski LED", colorNameEn: "Blue LED" },
            { name: "PLUV20B", series: "PLUV", baseColorCode: "20B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "PLUV20/92", series: "PLUV", baseColorCode: "20/92", color: "#000080", colorNameUk: "Pantone 072C", colorNamePl: "Pantone 072C", colorNameEn: "Pantone 072C" },
            { name: "PLUV20/77", series: "PLUV", baseColorCode: "20/77", color: "#0018A8", colorNameUk: "Pantone 541", colorNamePl: "Pantone 541", colorNameEn: "Pantone 541" },
            { name: "PLUV20/5", series: "PLUV", baseColorCode: "20/5", color: "#0018A8", colorNameUk: "Reflex", colorNamePl: "Reflex", colorNameEn: "Reflex" },
            { name: "PLUV20/5 LED", series: "PLUV", baseColorCode: "20/5 LED", color: "#0018A8", colorNameUk: "Pantone 072C LED", colorNamePl: "Pantone 072C LED", colorNameEn: "Pantone 072C LED" },
            { name: "PLUV20/10", series: "PLUV", baseColorCode: "20/10", color: "#000080", colorNameUk: "Pantone 072C", colorNamePl: "Pantone 072C", colorNameEn: "Pantone 072C" },
            { name: "PLUV20/10 LED", series: "PLUV", baseColorCode: "20/10 LED", color: "#000080", colorNameUk: "Pantone 072C LED", colorNamePl: "Pantone 072C LED", colorNameEn: "Pantone 072C LED" },
            { name: "PLUV15", series: "PLUV", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "PLUV15 LED", series: "PLUV", baseColorCode: "15 LED", color: "#E0B0FF", colorNameUk: "Фіолетова база LED", colorNamePl: "Fioletowa baza LED", colorNameEn: "Violet base LED" },
            { name: "PLUV150/56", series: "PLUV", baseColorCode: "150/56", color: "#FFFFFF", colorNameUk: "UV Bright", colorNamePl: "UV Bright", colorNameEn: "UV Bright" },
            { name: "PLUV143", series: "PLUV", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "PLUV142", series: "PLUV", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "PLUV141", series: "PLUV", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "PLUV140", series: "PLUV", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "PLUV138", series: "PLUV", baseColorCode: "138", color: "#FFFFE0", colorNameUk: "Фотолюмінесцентна", colorNamePl: "Fotoluminescencyjna", colorNameEn: "Photoluminescent" },
            { name: "PLUV136", series: "PLUV", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "PLUV135", series: "PLUV", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "PLUV134", series: "PLUV", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "PLUV134/12", series: "PLUV", baseColorCode: "134/12", color: "#FF69B4", colorNameUk: "Флуо рожевий 814C", colorNamePl: "Fluo różowy 814C", colorNameEn: "Fluo Pink 814C" },
            { name: "PLUV133", series: "PLUV", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "PLUV132", series: "PLUV", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "PLUV131", series: "PLUV", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "PLUV130", series: "PLUV", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "PLUV120", series: "PLUV", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "PLUV110", series: "PLUV", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "PLUV110 LED", series: "PLUV", baseColorCode: "110 LED", color: "#C0C0C0", colorNameUk: "Алюміній LED", colorNamePl: "Aluminium LED", colorNameEn: "Aluminum LED" },
            { name: "PLUV10", series: "PLUV", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "PLUV10 LED", series: "PLUV", baseColorCode: "10 LED", color: "#800080", colorNameUk: "Фіолетовий LED", colorNamePl: "Fioletowy LED", colorNameEn: "Violet LED" },
            { name: "PLUV100", series: "PLUV", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "PLUV100 LED", series: "PLUV", baseColorCode: "100 LED", color: "#000000", colorNameUk: "Чорний LED", colorNamePl: "Czarny LED", colorNameEn: "Black LED" },
            { name: "TPP91", series: "TPP", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "TPP90", series: "TPP", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "TPP82", series: "TPP", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "TPP81", series: "TPP", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "TPP80", series: "TPP", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Світло-коричневий", colorNamePl: "Jasnobrązowy", colorNameEn: "Light Brown" },
            { name: "TPP75", series: "TPP", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "TPP65", series: "TPP", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "TPP61", series: "TPP", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "TPP61/58", series: "TPP", baseColorCode: "61/58", color: "#E31B23", colorNameUk: "Rubine Red C", colorNamePl: "Rubine Red C", colorNameEn: "Rubine Red C" },
            { name: "TPP60", series: "TPP", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "TPP56", series: "TPP", baseColorCode: "56", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "TPP51", series: "TPP", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "TPP51/56", series: "TPP", baseColorCode: "51/56", color: "#FF8C00", colorNameUk: "Pantone 152 C", colorNamePl: "Pantone 152 C", colorNameEn: "Pantone 152 C" },
            { name: "TPP42", series: "TPP", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "TPP41", series: "TPP", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "TPP40", series: "TPP", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "TPP35", series: "TPP", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "TPP33", series: "TPP", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "TPP32", series: "TPP", baseColorCode: "32", color: "#00FF00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "TPP31", series: "TPP", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "TPP30", series: "TPP", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "TPP26", series: "TPP", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "TPP26/76", series: "TPP", baseColorCode: "26/76", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "TPP25", series: "TPP", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "TPP24", series: "TPP", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "TPP23", series: "TPP", baseColorCode: "23", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "TPP20", series: "TPP", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "TPP20/B", series: "TPP", baseColorCode: "20/B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "TPP20/16", series: "TPP", baseColorCode: "20/16", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "TPP20/149", series: "TPP", baseColorCode: "20/149", color: "#000080", colorNameUk: "Pantone 072 C", colorNamePl: "Pantone 072 C", colorNameEn: "Pantone 072 C" },
            { name: "TPP15", series: "TPP", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "TPP150", series: "TPP", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора база", colorNamePl: "Baza transparentna", colorNameEn: "Transparent base" },
            { name: "TPP143", series: "TPP", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "TPP141", series: "TPP", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "TPP140", series: "TPP", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "TPP120", series: "TPP", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "TPP110", series: "TPP", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "TPP10", series: "TPP", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "TPP100", series: "TPP", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "SPTNP61/15", series: "SPTN", baseColorCode: "P61/15", color: "#E31B23", colorNameUk: "Rubin Red C", colorNamePl: "Rubin Red C", colorNameEn: "Rubin Red C" },
            { name: "SPTN91/F", series: "SPTN", baseColorCode: "91/F", color: "#F8F8FF", colorNameUk: "Білий Flash", colorNamePl: "Biały Flash", colorNameEn: "Flash White" },
            { name: "SPTN91/61", series: "SPTN", baseColorCode: "91/61", color: "#F8F8FF", colorNameUk: "Amazing White", colorNamePl: "Amazing White", colorNameEn: "Amazing White" },
            { name: "SPTN91/1", series: "SPTN", baseColorCode: "91/1", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "SPTN91/1 R", series: "SPTN", baseColorCode: "91/1 R", color: "#F8F8FF", colorNameUk: "Білий криючий R", colorNamePl: "Biały kryjący R", colorNameEn: "Opaque White R" },
            { name: "SPTN82", series: "SPTN", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "SPTN81", series: "SPTN", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SPTN80", series: "SPTN", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SPTN75", series: "SPTN", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SPTN75M", series: "SPTN", baseColorCode: "75M", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "SPTN70", series: "SPTN", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SPTN70/36", series: "SPTN", baseColorCode: "70/36", color: "#E31B23", colorNameUk: "Rubine Red", colorNamePl: "Rubine Red", colorNameEn: "Rubine Red" },
            { name: "SPTN65M", series: "SPTN", baseColorCode: "65M", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "SPTN61", series: "SPTN", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SPTN60", series: "SPTN", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SPTN60/PV", series: "SPTN", baseColorCode: "60/PV", color: "#8B0000", colorNameUk: "Червоний Phthalate Free", colorNamePl: "Czerwony Phthalate Free", colorNameEn: "Red Phthalate Free" },
            { name: "SPTN60/12", series: "SPTN", baseColorCode: "60/12", color: "#E31B23", colorNameUk: "Pantone 032C", colorNamePl: "Pantone 032C", colorNameEn: "Pantone 032C" },
            { name: "SPTN56", series: "SPTN", baseColorCode: "56", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SPTN55", series: "SPTN", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "SPTN55M", series: "SPTN", baseColorCode: "55M", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "SPTN51", series: "SPTN", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SPTN50", series: "SPTN", baseColorCode: "50", color: "#FFA500", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SPTN42", series: "SPTN", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SPTN41", series: "SPTN", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SPTN40", series: "SPTN", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "SPTN35", series: "SPTN", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "SPTN35M", series: "SPTN", baseColorCode: "35M", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "SPTN33", series: "SPTN", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SPTN32", series: "SPTN", baseColorCode: "32", color: "#00FF00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SPTN31", series: "SPTN", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SPTN31/31", series: "SPTN", baseColorCode: "31/31", color: "#008000", colorNameUk: "Зелений 7720C", colorNamePl: "Zielony 7720C", colorNameEn: "Green 7720C" },
            { name: "SPTN30", series: "SPTN", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "SPTN27", series: "SPTN", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "SPTN26", series: "SPTN", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Блакитний", colorNamePl: "Błękitny", colorNameEn: "Light Blue" },
            { name: "SPTN26/20", series: "SPTN", baseColorCode: "26/20", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "SPTN25M", series: "SPTN", baseColorCode: "25M", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "SPTN24", series: "SPTN", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "SPTN23M", series: "SPTN", baseColorCode: "23M", color: "#4169E1", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "SPTN22", series: "SPTN", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SPTN20", series: "SPTN", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "SPTN20B", series: "SPTN", baseColorCode: "20B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "SPTN20/43", series: "SPTN", baseColorCode: "20/43", color: "#000080", colorNameUk: "Granatowa 072C", colorNamePl: "Granatowa 072C", colorNameEn: "Navy blue 072C" },
            { name: "SPTN15", series: "SPTN", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "SPTN15M", series: "SPTN", baseColorCode: "15M", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "SPTN150/17", series: "SPTN", baseColorCode: "150/17", color: "#FFFFFF", colorNameUk: "High Density база", colorNamePl: "High Density baza", colorNameEn: "High Density base" },
            { name: "SPTN143", series: "SPTN", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "SPTN142", series: "SPTN", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "SPTN141", series: "SPTN", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "SPTN140", series: "SPTN", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "SPTN138", series: "SPTN", baseColorCode: "138", color: "#FFFFE0", colorNameUk: "Фотолюмінесцентна", colorNamePl: "Fotoluminescencyjna", colorNameEn: "Photoluminescent" },
            { name: "SPTN138/2", series: "SPTN", baseColorCode: "138/2", color: "#FFFFE0", colorNameUk: "Фотолюмінесцентна", colorNamePl: "Fotoluminescencyjna", colorNameEn: "Photoluminescent" },
            { name: "SPTN137", series: "SPTN", baseColorCode: "137", color: "#FFFFFF", colorNameUk: "Відблискова", colorNamePl: "Odblaskowa", colorNameEn: "Reflective" },
            { name: "SPTN136", series: "SPTN", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "SPTN135", series: "SPTN", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "SPTN134", series: "SPTN", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "SPTN133", series: "SPTN", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "SPTN132", series: "SPTN", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "SPTN131", series: "SPTN", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "SPTN130", series: "SPTN", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "SPTN120", series: "SPTN", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "SPTN120/33", series: "SPTN", baseColorCode: "120/33", color: "#FFD700", colorNameUk: "ESG Patrol Gold", colorNamePl: "ESG Patrol Gold", colorNameEn: "ESG Patrol Gold" },
            { name: "SPTN110", series: "SPTN", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "SPTN110/13", series: "SPTN", baseColorCode: "110/13", color: "#C0C0C0", colorNameUk: "Reflective Silver", colorNamePl: "Reflective Silver", colorNameEn: "Reflective Silver" },
            { name: "SPTN10", series: "SPTN", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SPTN100", series: "SPTN", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "SP91", series: "SP", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "SP90", series: "SP", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "SP82", series: "SP", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "SP81", series: "SP", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SP80", series: "SP", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Світло-коричневий", colorNamePl: "Jasnobrązowy", colorNameEn: "Light Brown" },
            { name: "SP75", series: "SP", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SP75/13", series: "SP", baseColorCode: "75/13", color: "#E31B23", colorNameUk: "Rubine Red", colorNamePl: "Rubine Red", colorNameEn: "Rubine Red" },
            { name: "SP70", series: "SP", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SP65", series: "SP", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "SP61", series: "SP", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SP60", series: "SP", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SP56", series: "SP", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "SP55", series: "SP", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SP51", series: "SP", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SP50", series: "SP", baseColorCode: "50", color: "#FFA500", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SP42", series: "SP", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "SP41", series: "SP", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SP40", series: "SP", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "SP35", series: "SP", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SP33", series: "SP", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SP32", series: "SP", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "SP31", series: "SP", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SP30", series: "SP", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "SP27", series: "SP", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "SP26", series: "SP", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "SP26/42", series: "SP", baseColorCode: "26/42", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "SP25", series: "SP", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "SP24", series: "SP", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "SP22", series: "SP", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SP20", series: "SP", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "SP20B", series: "SP", baseColorCode: "20B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "SP20/18", series: "SP", baseColorCode: "20/18", color: "#000080", colorNameUk: "Pantone 072C", colorNamePl: "Pantone 072C", colorNameEn: "Pantone 072C" },
            { name: "SP15", series: "SP", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SP143", series: "SP", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "SP142", series: "SP", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SP141", series: "SP", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "SP140", series: "SP", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SP136", series: "SP", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "SP135", series: "SP", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "SP134", series: "SP", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "SP133", series: "SP", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "SP132", series: "SP", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "SP130", series: "SP", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "SP120", series: "SP", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "SP110", series: "SP", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "SP10", series: "SP", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SP100", series: "SP", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "SN91", series: "SN", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "SN90", series: "SN", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "SN82", series: "SN", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "SN81", series: "SN", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "SN80", series: "SN", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Світло-коричневий", colorNamePl: "Jasnobrązowy", colorNameEn: "Light Brown" },
            { name: "SN75", series: "SN", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "SN70", series: "SN", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "SN70/7", series: "SN", baseColorCode: "70/7", color: "#E31B23", colorNameUk: "Rubine Red C", colorNamePl: "Rubine Red C", colorNameEn: "Rubine Red C" },
            { name: "SN65", series: "SN", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "SN61", series: "SN", baseColorCode: "61", color: "#DC143C", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "SN60", series: "SN", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "SN56", series: "SN", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "SN55", series: "SN", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "SN51", series: "SN", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "SN50", series: "SN", baseColorCode: "50", color: "#FFA500", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "SN42", series: "SN", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "SN41", series: "SN", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "SN40", series: "SN", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "SN35", series: "SN", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "SN33", series: "SN", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SN32", series: "SN", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "SN31", series: "SN", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "SN30", series: "SN", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "SN27", series: "SN", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "SN26", series: "SN", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "SN26/7", series: "SN", baseColorCode: "26/7", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "SN25", series: "SN", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "SN24", series: "SN", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Темно-синій", colorNamePl: "Ciemnoniebieski", colorNameEn: "Dark Blue" },
            { name: "SN22", series: "SN", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "SN20", series: "SN", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "SN20/B", series: "SN", baseColorCode: "20/B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "SN15", series: "SN", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолетова база", colorNamePl: "Fioletowa baza", colorNameEn: "Violet base" },
            { name: "SN150", series: "SN", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора база", colorNamePl: "Baza transparentna", colorNameEn: "Transparent base" },
            { name: "SN143", series: "SN", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "SN142", series: "SN", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "SN141", series: "SN", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "SN140", series: "SN", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "SN135", series: "SN", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "SN133", series: "SN", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "SN132", series: "SN", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "SN131", series: "SN", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "SN130", series: "SN", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "SN120", series: "SN", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "SN110", series: "SN", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "SN10", series: "SN", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "SN100", series: "SN", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "QS91", series: "QS", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "QS150", series: "QS", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Лак", colorNamePl: "Lakier", colorNameEn: "Varnish" },
            { name: "QS100", series: "QS", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "PX91", series: "PX", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "PX90", series: "PX", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "PX60", series: "PX", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "PX42", series: "PX", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "PX24", series: "PX", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "PX22", series: "PX", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "PX150", series: "PX", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора база", colorNamePl: "Baza transparentna", colorNameEn: "Transparent base" },
            { name: "PX143", series: "PX", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "PX142", series: "PX", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "PX141", series: "PX", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "PX140", series: "PX", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "PX110", series: "PX", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "PX100", series: "PX", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "OTF26/74", series: "OTF", baseColorCode: "26/74", color: "#00BFFF", colorNameUk: "Process Blue C", colorNamePl: "Process Blue C", colorNameEn: "Process Blue C" },
            { name: "OTF20/108", series: "OTF", baseColorCode: "20/108", color: "#00008B", colorNameUk: "288 C", colorNamePl: "288 C", colorNameEn: "288 C" },
            { name: "NST91", series: "NST", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "NST61", series: "NST", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "NST60", series: "NST", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "NST51", series: "NST", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "NST42", series: "NST", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "NST41", series: "NST", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "NST40", series: "NST", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "NST35", series: "NST", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "NST22", series: "NST", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "NST20", series: "NST", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "NST160", series: "NST", baseColorCode: "160", color: "#FFFFFF", colorNameUk: "Тріада база", colorNamePl: "Triada baza", colorNameEn: "Process base" },
            { name: "NST15", series: "NST", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолет база", colorNamePl: "Fiolet baza", colorNameEn: "Violet base" },
            { name: "NST143", series: "NST", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "NST142", series: "NST", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "NST141", series: "NST", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "NST140", series: "NST", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "NST120", series: "NST", baseColorCode: "120", color: "#FFD700", colorNameUk: "Rich Gold", colorNamePl: "Rich Gold", colorNameEn: "Rich Gold" },
            { name: "NST110 REFLECTIVE", series: "NST", baseColorCode: "110 REF", color: "#C0C0C0", colorNameUk: "Срібло рефлективне", colorNamePl: "Srebro refleksyjne", colorNameEn: "Reflective Silver" },
            { name: "NST110", series: "NST", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Алюміній", colorNamePl: "Aluminium", colorNameEn: "Aluminum" },
            { name: "EVS91", series: "EVS", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "ECVF91", series: "ECVF", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "ECVF90", series: "ECVF", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "ECVF60", series: "ECVF", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "ECVF41", series: "ECVF", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "ECVF20", series: "ECVF", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "ECVF120", series: "ECVF", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "ECVF110", series: "ECVF", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "ECVF100", series: "ECVF", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "ECP COOL GRAY 8", series: "EC", baseColorCode: "COOL GRAY 8", color: "#808080", colorNameUk: "Cool Gray 8", colorNamePl: "Cool Gray 8", colorNameEn: "Cool Gray 8" },
            { name: "ECP61/15", series: "EC", baseColorCode: "61/15", color: "#E31B23", colorNameUk: "Rubin Red C", colorNamePl: "Rubin Red C", colorNameEn: "Rubin Red C" },
            { name: "ECP60/38", series: "EC", baseColorCode: "60/38", color: "#E31B23", colorNameUk: "032C", colorNamePl: "032C", colorNameEn: "032C" },
            { name: "ECP56/7", series: "EC", baseColorCode: "56/7", color: "#F93E3E", colorNameUk: "Warm Red C", colorNamePl: "Warm Red C", colorNameEn: "Warm Red C" },
            { name: "ECP26/2", series: "EC", baseColorCode: "26/2", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "ECP20/5", series: "EC", baseColorCode: "20/5", color: "#000080", colorNameUk: "072C", colorNamePl: "072C", colorNameEn: "072C" },
            { name: "ECG91", series: "EC", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "ECG61", series: "EC", baseColorCode: "61", color: "#DC143C", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "ECG56", series: "EC", baseColorCode: "56", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "ECG41", series: "EC", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "ECG40", series: "EC", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "ECG24", series: "EC", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "EC91 TV", series: "EC", baseColorCode: "91 TV", color: "#F8F8FF", colorNameUk: "Білий густий", colorNamePl: "Biały gęsty", colorNameEn: "Thick White" },
            { name: "EC91 MORE OPAQUE", series: "EC", baseColorCode: "91 MO", color: "#F8F8FF", colorNameUk: "Білий суперкриючий", colorNamePl: "Biały super kryjący", colorNameEn: "Super opaque White" },
            { name: "EC91", series: "EC", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "EC90", series: "EC", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "EC82", series: "EC", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "EC81", series: "EC", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "EC80", series: "EC", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Світло-коричневий", colorNamePl: "Jasnobrązowy", colorNameEn: "Light Brown" },
            { name: "EC75", series: "EC", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta база", colorNamePl: "Magenta baza", colorNameEn: "Magenta base" },
            { name: "EC70", series: "EC", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "EC70/207", series: "EC", baseColorCode: "70/207", color: "#800080", colorNameUk: "Magenta Purple C", colorNamePl: "Magenta Purple C", colorNameEn: "Magenta Purple C" },
            { name: "EC65", series: "EC", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "EC61", series: "EC", baseColorCode: "61", color: "#DC143C", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "EC61/196", series: "EC", baseColorCode: "61/196", color: "#DC143C", colorNameUk: "RAL 3000", colorNamePl: "RAL 3000", colorNameEn: "RAL 3000" },
            { name: "EC61/15", series: "EC", baseColorCode: "61/15", color: "#E31B23", colorNameUk: "Rubin Red C", colorNamePl: "Rubin Red C", colorNameEn: "Rubin Red C" },
            { name: "EC60", series: "EC", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "EC60/87", series: "EC", baseColorCode: "60/87", color: "#E31B23", colorNameUk: "185", colorNamePl: "185", colorNameEn: "185" },
            { name: "EC56", series: "EC", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "EC55", series: "EC", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "EC51", series: "EC", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "EC50", series: "EC", baseColorCode: "50", color: "#FFA500", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "EC50/74", series: "EC", baseColorCode: "50/74", color: "#FF8C00", colorNameUk: "1505 C", colorNamePl: "1505 C", colorNameEn: "1505 C" },
            { name: "EC42", series: "EC", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "EC41", series: "EC", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "EC40", series: "EC", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Цитриновий", colorNamePl: "Cytrynowy", colorNameEn: "Lemon Yellow" },
            { name: "EC35", series: "EC", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "EC33", series: "EC", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "EC32", series: "EC", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "EC31", series: "EC", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "EC30", series: "EC", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "EC27", series: "EC", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "EC26", series: "EC", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "EC25", series: "EC", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "EC24", series: "EC", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "EC24/213", series: "EC", baseColorCode: "24/213", color: "#4169E1", colorNameUk: "2935 C", colorNamePl: "2935 C", colorNameEn: "2935 C" },
            { name: "EC23", series: "EC", baseColorCode: "23", color: "#4169E1", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "EC22", series: "EC", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "EC20", series: "EC", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "EC20/B", series: "EC", baseColorCode: "20/B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "EC15", series: "EC", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолет база", colorNamePl: "Fiolet baza", colorNameEn: "Violet base" },
            { name: "EC143", series: "EC", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "EC142/2", series: "EC", baseColorCode: "142/2", color: "#FF00FF", colorNameUk: "Magenta тріада інтенсивна", colorNamePl: "Magenta triada intensywna", colorNameEn: "Intensive Process Magenta" },
            { name: "EC141", series: "EC", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "EC140", series: "EC", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "EC138", series: "EC", baseColorCode: "138", color: "#FFFFE0", colorNameUk: "Фотолюмінесцентна", colorNamePl: "Fotoluminescencyjna", colorNameEn: "Photoluminescent" },
            { name: "EC137", series: "EC", baseColorCode: "137", color: "#FFFFFF", colorNameUk: "Відблискова", colorNamePl: "Odblaskowa", colorNameEn: "Reflective" },
            { name: "EC137/3", series: "EC", baseColorCode: "137/3", color: "#FFFFFF", colorNameUk: "Відблискова", colorNamePl: "Odblaskowa", colorNameEn: "Reflective" },
            { name: "EC136", series: "EC", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "EC135", series: "EC", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "EC134", series: "EC", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "EC133", series: "EC", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "EC132", series: "EC", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "EC131", series: "EC", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "EC130", series: "EC", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "EC120", series: "EC", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "EC120/48", series: "EC", baseColorCode: "120/48", color: "#FFD700", colorNameUk: "Pantone 871 C", colorNamePl: "Pantone 871 C", colorNameEn: "Pantone 871 C" },
            { name: "EC110 MORE OPAQUE", series: "EC", baseColorCode: "110 MO", color: "#C0C0C0", colorNameUk: "Срібло криюче", colorNamePl: "Srebro kryjące", colorNameEn: "Opaque Silver" },
            { name: "EC110", series: "EC", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "EC110/2", series: "EC", baseColorCode: "110/2", color: "#FFFFFF", colorNameUk: "Перламутрова біла", colorNamePl: "Biała perlista", colorNameEn: "Pearlescent White" },
            { name: "EC10", series: "EC", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "EC10/154", series: "EC", baseColorCode: "10/154", color: "#800080", colorNameUk: "Pantone 2116 C", colorNamePl: "Pantone 2116 C", colorNameEn: "Pantone 2116 C" },
            { name: "EC100", series: "EC", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "EC100/458", series: "EC", baseColorCode: "100/458", color: "#808080", colorNameUk: "Cool Grey 10 C", colorNamePl: "Cool Grey 10 C", colorNameEn: "Cool Grey 10 C" },
            { name: "CFP7031", series: "CF", baseColorCode: "P7031", color: "#E31B23", colorNameUk: "Rubine Red C", colorNamePl: "Rubine Red C", colorNameEn: "Rubine Red C" },
            { name: "CFP56/18", series: "CF", baseColorCode: "56/18", color: "#E31B23", colorNameUk: "032C", colorNamePl: "032C", colorNameEn: "032C" },
            { name: "CFP56/12", series: "CF", baseColorCode: "56/12", color: "#F93E3E", colorNameUk: "Warm Red", colorNamePl: "Warm Red", colorNameEn: "Warm Red" },
            { name: "CFP26/25", series: "CF", baseColorCode: "26/25", color: "#00BFFF", colorNameUk: "Process Blue", colorNamePl: "Process Blue", colorNameEn: "Process Blue" },
            { name: "CFP2058", series: "CF", baseColorCode: "P2058", color: "#000080", colorNameUk: "072C", colorNamePl: "072C", colorNameEn: "072C" },
            { name: "CF91", series: "CF", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "CF90", series: "CF", baseColorCode: "90", color: "#FFFFFF", colorNameUk: "Білий", colorNamePl: "Biały", colorNameEn: "White" },
            { name: "CF82", series: "CF", baseColorCode: "82", color: "#F5F5DC", colorNameUk: "Бежевий", colorNamePl: "Beżowy", colorNameEn: "Beige" },
            { name: "CF81", series: "CF", baseColorCode: "81", color: "#8B4513", colorNameUk: "Коричневий", colorNamePl: "Brązowy", colorNameEn: "Brown" },
            { name: "CF80", series: "CF", baseColorCode: "80", color: "#A52A2A", colorNameUk: "Світло-коричневий", colorNamePl: "Jasnobrązowy", colorNameEn: "Light Brown" },
            { name: "CF75", series: "CF", baseColorCode: "75", color: "#FFC0CB", colorNameUk: "Magenta", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "CF70", series: "CF", baseColorCode: "70", color: "#FF00FF", colorNameUk: "Магента", colorNamePl: "Magenta", colorNameEn: "Magenta" },
            { name: "CF70/151", series: "CF", baseColorCode: "70/151", color: "#800080", colorNameUk: "RAL 4004", colorNamePl: "RAL 4004", colorNameEn: "RAL 4004" },
            { name: "CF65", series: "CF", baseColorCode: "65", color: "#FFB6C1", colorNameUk: "Червона база", colorNamePl: "Czerwona baza", colorNameEn: "Red base" },
            { name: "CF61", series: "CF", baseColorCode: "61", color: "#DC143C", colorNameUk: "Темно-червоний", colorNamePl: "Ciemnoczerwony", colorNameEn: "Dark Red" },
            { name: "CF61/106", series: "CF", baseColorCode: "61/106", color: "#DC143C", colorNameUk: "Pantone 1805 C", colorNamePl: "Pantone 1805 C", colorNameEn: "Pantone 1805 C" },
            { name: "CF61/105", series: "CF", baseColorCode: "61/105", color: "#DC143C", colorNameUk: "RAL 3003", colorNamePl: "RAL 3003", colorNameEn: "RAL 3003" },
            { name: "CF60", series: "CF", baseColorCode: "60", color: "#8B0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "CF56", series: "CF", baseColorCode: "56", color: "#FF0000", colorNameUk: "Яскраво-червоний", colorNamePl: "Jasnoczerwony", colorNameEn: "Bright Red" },
            { name: "CF56/86", series: "CF", baseColorCode: "56/86", color: "#FF0000", colorNameUk: "Червоний", colorNamePl: "Czerwony", colorNameEn: "Red" },
            { name: "CF55", series: "CF", baseColorCode: "55", color: "#FFDAB9", colorNameUk: "Помаранчева база", colorNamePl: "Pomarańczowa baza", colorNameEn: "Orange base" },
            { name: "CF51", series: "CF", baseColorCode: "51", color: "#FFB347", colorNameUk: "Помаранчевий", colorNamePl: "Pomarańczowy", colorNameEn: "Orange" },
            { name: "CF50", series: "CF", baseColorCode: "50", color: "#FFA500", colorNameUk: "Світло-помаранчевий", colorNamePl: "Jasnopomarańczowy", colorNameEn: "Light Orange" },
            { name: "CF50/44", series: "CF", baseColorCode: "50/44", color: "#FFA500", colorNameUk: "Помаранчевий Extra Opaque", colorNamePl: "Pomarańczowy Extra Opaque", colorNameEn: "Extra Opaque Orange" },
            { name: "CF42", series: "CF", baseColorCode: "42", color: "#F0E68C", colorNameUk: "Темно-жовтий", colorNamePl: "Ciemnożółty", colorNameEn: "Dark Yellow" },
            { name: "CF42/156", series: "CF", baseColorCode: "42/156", color: "#F0E68C", colorNameUk: "Beczkopol Yellow", colorNamePl: "Beczkopol Żółty", colorNameEn: "Beczkopol Yellow" },
            { name: "CF42/155", series: "CF", baseColorCode: "42/155", color: "#F0E68C", colorNameUk: "Pantone 144C", colorNamePl: "Pantone 144C", colorNameEn: "Pantone 144C" },
            { name: "CF41", series: "CF", baseColorCode: "41", color: "#FFFACD", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "CF40", series: "CF", baseColorCode: "40", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "CF40/48", series: "CF", baseColorCode: "40/48", color: "#FFFF00", colorNameUk: "Жовтий", colorNamePl: "Żółty", colorNameEn: "Yellow" },
            { name: "CF35", series: "CF", baseColorCode: "35", color: "#A0D6B4", colorNameUk: "Зелена база", colorNamePl: "Zielona baza", colorNameEn: "Green base" },
            { name: "CF33", series: "CF", baseColorCode: "33", color: "#7CFC00", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "CF32", series: "CF", baseColorCode: "32", color: "#00FF00", colorNameUk: "Яскраво-зелений", colorNamePl: "Jasnozielony", colorNameEn: "Bright Green" },
            { name: "CF31", series: "CF", baseColorCode: "31", color: "#008000", colorNameUk: "Зелений", colorNamePl: "Zielony", colorNameEn: "Green" },
            { name: "CF31/92", series: "CF", baseColorCode: "31/92", color: "#008000", colorNameUk: "Pantone 3288 C", colorNamePl: "Pantone 3288 C", colorNameEn: "Pantone 3288 C" },
            { name: "CF30", series: "CF", baseColorCode: "30", color: "#006400", colorNameUk: "Темно-зелений", colorNamePl: "Ciemnozielony", colorNameEn: "Dark Green" },
            { name: "CF27", series: "CF", baseColorCode: "27", color: "#40E0D0", colorNameUk: "Бірюзовий", colorNamePl: "Turkusowy", colorNameEn: "Turquoise" },
            { name: "CF27/103", series: "CF", baseColorCode: "27/103", color: "#40E0D0", colorNameUk: "RAL 5018", colorNamePl: "RAL 5018", colorNameEn: "RAL 5018" },
            { name: "CF26", series: "CF", baseColorCode: "26", color: "#ADD8E6", colorNameUk: "Світло-синій", colorNamePl: "Jasnoniebieski", colorNameEn: "Light Blue" },
            { name: "CF25", series: "CF", baseColorCode: "25", color: "#A0C8F0", colorNameUk: "Синя база", colorNamePl: "Niebieska baza", colorNameEn: "Blue base" },
            { name: "CF24", series: "CF", baseColorCode: "24", color: "#87CEEB", colorNameUk: "Синій", colorNamePl: "Niebieski", colorNameEn: "Blue" },
            { name: "CF24/116", series: "CF", baseColorCode: "24/116", color: "#4169E1", colorNameUk: "RAL 5010", colorNamePl: "RAL 5010", colorNameEn: "RAL 5010" },
            { name: "CF24/115", series: "CF", baseColorCode: "24/115", color: "#4169E1", colorNameUk: "Pantone 293C", colorNamePl: "Pantone 293C", colorNameEn: "Pantone 293C" },
            { name: "CF23", series: "CF", baseColorCode: "23", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "CF22", series: "CF", baseColorCode: "22", color: "#4169E1", colorNameUk: "Ультрамарин", colorNamePl: "Ultramaryna", colorNameEn: "Ultramarine" },
            { name: "CF20", series: "CF", baseColorCode: "20", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "CF20/B", series: "CF", baseColorCode: "20/B", color: "#0018A8", colorNameUk: "Reflex Blue", colorNamePl: "Reflex Blue", colorNameEn: "Reflex Blue" },
            { name: "CF20/205", series: "CF", baseColorCode: "20/205", color: "#00008B", colorNameUk: "PMS 2758", colorNamePl: "PMS 2758", colorNameEn: "PMS 2758" },
            { name: "CF20/204", series: "CF", baseColorCode: "20/204", color: "#00008B", colorNameUk: "RAL 5011", colorNamePl: "RAL 5011", colorNameEn: "RAL 5011" },
            { name: "CF20/203", series: "CF", baseColorCode: "20/203", color: "#00008B", colorNameUk: "RAL 5026", colorNamePl: "RAL 5026", colorNameEn: "RAL 5026" },
            { name: "CF20/17", series: "CF", baseColorCode: "20/17", color: "#00008B", colorNameUk: "Гранатова", colorNamePl: "Granatowa", colorNameEn: "Navy blue" },
            { name: "CF15", series: "CF", baseColorCode: "15", color: "#E0B0FF", colorNameUk: "Фіолет база", colorNamePl: "Fiolet baza", colorNameEn: "Violet base" },
            { name: "CF143", series: "CF", baseColorCode: "143", color: "#000000", colorNameUk: "Чорний тріада", colorNamePl: "Czarna triada", colorNameEn: "Process Black" },
            { name: "CF142", series: "CF", baseColorCode: "142", color: "#FF00FF", colorNameUk: "Magenta тріада", colorNamePl: "Magenta triada", colorNameEn: "Process Magenta" },
            { name: "CF141", series: "CF", baseColorCode: "141", color: "#00FFFF", colorNameUk: "Cyan тріада", colorNamePl: "Cyan triada", colorNameEn: "Process Cyan" },
            { name: "CF140", series: "CF", baseColorCode: "140", color: "#FFFF00", colorNameUk: "Жовтий тріада", colorNamePl: "Żółta triada", colorNameEn: "Process Yellow" },
            { name: "CF136", series: "CF", baseColorCode: "136", color: "#87CEEB", colorNameUk: "Флуо блакитний", colorNamePl: "Fluo jasnoniebieski", colorNameEn: "Fluo Light Blue" },
            { name: "CF135", series: "CF", baseColorCode: "135", color: "#00FF00", colorNameUk: "Флуо зелений", colorNamePl: "Fluo zielony", colorNameEn: "Fluo Green" },
            { name: "CF134", series: "CF", baseColorCode: "134", color: "#FF69B4", colorNameUk: "Флуо рожевий", colorNamePl: "Fluo różowy", colorNameEn: "Fluo Pink" },
            { name: "CF133", series: "CF", baseColorCode: "133", color: "#FF0000", colorNameUk: "Флуо червоний", colorNamePl: "Fluo czerwony", colorNameEn: "Fluo Red" },
            { name: "CF132", series: "CF", baseColorCode: "132", color: "#FF4500", colorNameUk: "Флуо помаранчевий", colorNamePl: "Fluo pomarańczowy", colorNameEn: "Fluo Orange" },
            { name: "CF131", series: "CF", baseColorCode: "131", color: "#FF8C00", colorNameUk: "Флуо світло-помаранчевий", colorNamePl: "Fluo jasnopomarańczowy", colorNameEn: "Fluo Light Orange" },
            { name: "CF130", series: "CF", baseColorCode: "130", color: "#FFFF00", colorNameUk: "Флуо жовтий", colorNamePl: "Fluo żółty", colorNameEn: "Fluo Yellow" },
            { name: "CF120", series: "CF", baseColorCode: "120", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "CF120/52", series: "CF", baseColorCode: "120/52", color: "#FFD700", colorNameUk: "RAL 1036", colorNamePl: "RAL 1036", colorNameEn: "RAL 1036" },
            { name: "CF120/47", series: "CF", baseColorCode: "120/47", color: "#FFD700", colorNameUk: "Золото", colorNamePl: "Złoto", colorNameEn: "Gold" },
            { name: "CF110", series: "CF", baseColorCode: "110", color: "#C0C0C0", colorNameUk: "Срібло", colorNamePl: "Srebro", colorNameEn: "Silver" },
            { name: "CF10", series: "CF", baseColorCode: "10", color: "#800080", colorNameUk: "Фіолетовий", colorNamePl: "Fioletowy", colorNameEn: "Violet" },
            { name: "CF10/88", series: "CF", baseColorCode: "10/88", color: "#800080", colorNameUk: "Pantone 7672 C", colorNamePl: "Pantone 7672 C", colorNameEn: "Pantone 7672 C" },
            { name: "CF100", series: "CF", baseColorCode: "100", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "ADHESIVE PROMOTOR", series: "UV", baseColorCode: "ADHESIVE", color: "#FFFFFF", colorNameUk: "Адгезійний промотор", colorNamePl: "Promotor adhezji", colorNameEn: "Adhesion promoter" },
            { name: "SX81/22", series: "SX", baseColorCode: "81/22", color: "#8B4513", colorNameUk: "Pantone 463C", colorNamePl: "Pantone 463C", colorNameEn: "Pantone 463C" },
            { name: "SX150", series: "SX", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора маса", colorNamePl: "Masa transparentna", colorNameEn: "Transparent mass" },
            { name: "SPTNPB", series: "SPTN", baseColorCode: "PB", color: "#FFFFFF", colorNameUk: "Паста пучення", colorNamePl: "Pasta pęczniejąca", colorNameEn: "Puff paste" },
            { name: "SPTNCR", series: "SPTN", baseColorCode: "CR", color: "#FFFFFF", colorNameUk: "Редуктор", colorNamePl: "Reduktor", colorNameEn: "Reducer" },
            { name: "SPTN150", series: "SPTN", baseColorCode: "150", color: "#FFFFFF", colorNameUk: "Прозора база", colorNamePl: "Baza transparentna", colorNameEn: "Transparent base" },
            { name: "SPTN150/25", series: "SPTN", baseColorCode: "150/25", color: "#FFFFFF", colorNameUk: "Матуюча паста", colorNamePl: "Pasta matująca", colorNameEn: "Matting paste" },
            { name: "MTR 65/HD", series: "MTR", baseColorCode: "65/HD", color: "#000000", colorNameUk: "Чорний", colorNamePl: "Czarny", colorNameEn: "Black" },
            { name: "MTR 60/HD", series: "MTR", baseColorCode: "60/HD", color: "#F8F8FF", colorNameUk: "Білий криючий", colorNamePl: "Biały kryjący", colorNameEn: "Opaque White" },
            { name: "TRANSFERPOWDER NR 4", series: "TRANSFER", baseColorCode: "NR4", color: "#FFFFFF", colorNameUk: "Порошок трансферний Soft", colorNamePl: "Proszek transferowy Soft", colorNameEn: "Transfer powder Soft" },
            { name: "TRANSFERPOWDER NR 18", series: "TRANSFER", baseColorCode: "NR18", color: "#FFFFFF", colorNameUk: "Порошок трансферний", colorNamePl: "Proszek transferowy", colorNameEn: "Transfer powder" },
            { name: "TRANSFERPOWDER NR 13", series: "TRANSFER", baseColorCode: "NR13", color: "#FFFFFF", colorNameUk: "Порошок трансферний", colorNamePl: "Proszek transferowy", colorNameEn: "Transfer powder" },
            { name: "TRANSFERPOWDER NR 12", series: "TRANSFER", baseColorCode: "NR12", color: "#FFFFFF", colorNameUk: "Порошок трансферний SPTNFX", colorNamePl: "Proszek transferowy SPTNFX", colorNameEn: "Transfer powder SPTNFX" },
            { name: "UV110/8", series: "UV", baseColorCode: "110/8", color: "#C0C0C0", colorNameUk: "Алюміній дряпка", colorNamePl: "Aluminium zdrapka", colorNameEn: "Scratch-off Aluminum" },
            { name: "SB91/2", series: "SB", baseColorCode: "91/2", color: "#F8F8FF", colorNameUk: "Scratch білий", colorNamePl: "Scratch biały", colorNameEn: "Scratch white" },
            { name: "SB120/7", series: "SB", baseColorCode: "120/7", color: "#FFD700", colorNameUk: "Scratch золото", colorNamePl: "Scratch złoto", colorNameEn: "Scratch gold" },
            { name: "SB110/2", series: "SB", baseColorCode: "110/2", color: "#C0C0C0", colorNameUk: "Scratch срібло", colorNamePl: "Scratch srebro", colorNameEn: "Scratch silver" },
            { name: "SB100/7", series: "SB", baseColorCode: "100/7", color: "#000000", colorNameUk: "Scratch чорний", colorNamePl: "Scratch czarny", colorNameEn: "Scratch black" },
            { name: "UV150/122", series: "UV", baseColorCode: "150/122", color: "#FFFFFF", colorNameUk: "Лак сатиновий", colorNamePl: "Lakier satynowy", colorNameEn: "Satin varnish" },
            { name: "UV150/62", series: "UV", baseColorCode: "150/62", color: "#FFFFFF", colorNameUk: "Лак Braille густий", colorNamePl: "Lakier Braille gęsty", colorNameEn: "Braille thick varnish" },
            { name: "UV150/51", series: "UV", baseColorCode: "150/51", color: "#800080", colorNameUk: "Лак Mauve", colorNamePl: "Lakier Mauve", colorNameEn: "Mauve varnish" },
            { name: "UV150/129", series: "UV", baseColorCode: "150/129", color: "#FFFFFF", colorNameUk: "Лак протиковзкий", colorNamePl: "Lakier antypoślizgowy", colorNameEn: "Anti-slip varnish" },
            { name: "TA91", series: "TA", baseColorCode: "91", color: "#F8F8FF", colorNameUk: "Tampoprint білий", colorNamePl: "Tampoprint biały", colorNameEn: "Tampoprint white" }
        ];

        // ---------- ГЕНЕРАЦІЯ ФАРБ ІЗ БАЗОВИХ КОЛЬОРІВ ----------
        function generateBasePaints() {
            const paints = [];
            let counter = 1;
            
            series.forEach(serie => {
                baseColors.forEach(baseColor => {
                    const paint = {
                        id: `paint-${counter++}`,
                        name: `${serie.id}${baseColor.code}`,
                        series: serie.id,
                        baseColorCode: baseColor.code,
                        category: serie.category,
                        color: baseColor.color,
                        manufacturer: "SICO",
                        article: `${serie.id}-${baseColor.code}`,
                        properties: serie.properties,
                        colorCode: baseColor.code,
                        isDefault: true,
                        displayName: {
                            uk: `${serie.name.uk} ${baseColor.name.uk}`,
                            pl: `${serie.name.pl} ${baseColor.name.pl}`,
                            en: `${serie.name.en} ${baseColor.name.en}`
                        },
                        description: {
                            uk: `${serie.description.uk} Колір: ${baseColor.name.uk}`,
                            pl: `${serie.description.pl} Kolor: ${baseColor.name.pl}`,
                            en: `${serie.description.en} Color: ${baseColor.name.en}`
                        },
                        fullInfo: {
                            uk: `Серія: ${serie.name.uk}, Колір: ${baseColor.code} - ${baseColor.name.uk}, Категорія: ${serie.category}`,
                            pl: `Seria: ${serie.name.pl}, Kolor: ${baseColor.code} - ${baseColor.name.pl}, Kategoria: ${serie.category}`,
                            en: `Series: ${serie.name.en}, Color: ${baseColor.code} - ${baseColor.name.en}, Category: ${serie.category}`
                        },
                        colorName: {
                            uk: baseColor.name.uk,
                            pl: baseColor.name.pl,
                            en: baseColor.name.en
                        }
                    };
                    paints.push(paint);
                });
            });
            return paints;
        }

        // ---------- ДОДАТКОВІ СПЕЦІАЛЬНІ ФАРБИ ----------
        function generateSpecialPaints() {
            const paints = [];
            let counter = 10000; // великий зсув, щоб не конфліктувати з базовими id

            // ---------- СПЕЦІАЛЬНІ ФАРБИ EC ----------
            const ecSeries = series.find(s => s.id === "EC");
            if (ecSeries) {
                // EC60/146
                paints.push({
                    id: `special-${counter++}`,
                    name: "EC60/146",
                    series: "EC",
                    baseColorCode: "60/146",
                    category: ecSeries.category,
                    color: "#E34234",
                    manufacturer: "SICO",
                    article: "EC-60/146",
                    properties: ecSeries.properties,
                    colorCode: "60/146",
                    isDefault: true,
                    displayName: {
                        uk: "EC Вогненно-червоний 60/146",
                        pl: "EC Ognista czerwień 60/146",
                        en: "EC Fire red 60/146"
                    },
                    description: {
                        uk: "Вогненно-червоний колір з екстремально довгою світлостійкістю. Відтінок як №60.",
                        pl: "Ognista czerwień o ekstremalnie długiej odporności na światło. Odcień jak nr 60.",
                        en: "Fire red color with extremely long lightfastness. Shade like No. 60."
                    },
                    fullInfo: {
                        uk: `Серія: EC, Спеціальний колір: EC 60/146 - Вогненно-червоний`,
                        pl: `Seria: EC, Kolor specjalny: EC 60/146 - Ognista czerwień`,
                        en: `Series: EC, Special color: EC 60/146 - Fire red`
                    },
                    colorName: {
                        uk: "Вогненно-червоний",
                        pl: "Ognista czerwień",
                        en: "Fire red"
                    }
                });
                // EC61/163
                paints.push({
                    id: `special-${counter++}`,
                    name: "EC61/163",
                    series: "EC",
                    baseColorCode: "61/163",
                    category: ecSeries.category,
                    color: "#C41E3A",
                    manufacturer: "SICO",
                    article: "EC-61/163",
                    properties: ecSeries.properties,
                    colorCode: "61/163",
                    isDefault: true,
                    displayName: {
                        uk: "EC Темно-вогненно-червоний 61/163",
                        pl: "EC Ciemna ognista czerwień 61/163",
                        en: "EC Dark fire red 61/163"
                    },
                    description: {
                        uk: "Темно-вогненно-червоний колір з екстремально довгою світлостійкістю. Відтінок як №61.",
                        pl: "Ciemna ognista czerwień o ekstremalnie długiej odporności na światło. Odcień jak nr 61.",
                        en: "Dark fire red color with extremely long lightfastness. Shade like No. 61."
                    },
                    fullInfo: {
                        uk: `Серія: EC, Спеціальний колір: EC 61/163 - Темно-вогненно-червоний`,
                        pl: `Seria: EC, Kolor specjalny: EC 61/163 - Ciemna ognista czerwień`,
                        en: `Series: EC, Special color: EC 61/163 - Dark fire red`
                    },
                    colorName: {
                        uk: "Темно-вогненно-червоний",
                        pl: "Ciemna ognista czerwień",
                        en: "Dark fire red"
                    }
                });
                // EC91Q
                paints.push({
                    id: `special-${counter++}`,
                    name: "EC91Q",
                    series: "EC",
                    baseColorCode: "91Q",
                    category: ecSeries.category,
                    color: "#F8F8FF",
                    manufacturer: "SICO",
                    article: "EC-91Q",
                    properties: (() => {
                        let props = JSON.parse(JSON.stringify(ecSeries.properties));
                        props.finish = {
                            uk: "Напівмат",
                            pl: "Półmat",
                            en: "Semi-matte"
                        };
                        return props;
                    })(),
                    colorCode: "91Q",
                    isDefault: true,
                    displayName: {
                        uk: "EC Напівматова біла 91 Q",
                        pl: "EC Biała półmatowa 91 Q",
                        en: "EC Semi-matte white 91 Q"
                    },
                    description: {
                        uk: "Напівматова біла фарба з вищою в'язкістю для вбирних паперів та картону. Також підходить для ПВХ, наклейок, ABS, Forex.",
                        pl: "Biała farba półmatowa o wyższej lepkości do chłonnych papierów i tektury. Nadaje się również do PCV, naklejek, ABS, Forex.",
                        en: "Semi-matte white ink with higher viscosity for absorbent papers and cardboard. Also suitable for PVC, stickers, ABS, Forex."
                    },
                    fullInfo: {
                        uk: `Серія: EC, Спеціальний колір: EC 91 Q - Напівматова біла`,
                        pl: `Seria: EC, Kolor specjalny: EC 91 Q - Biała półmatowa`,
                        en: `Series: EC, Special color: EC 91 Q - Semi-matte white`
                    },
                    colorName: {
                        uk: "Напівматова біла",
                        pl: "Biała półmatowa",
                        en: "Semi-matte white"
                    }
                });
                // ECRG120
                paints.push({
                    id: `special-${counter++}`,
                    name: "ECRG120",
                    series: "EC",
                    baseColorCode: "RG120",
                    category: ecSeries.category,
                    color: "#FFD700",
                    manufacturer: "SICO",
                    article: "EC-RG120",
                    properties: ecSeries.properties,
                    colorCode: "RG120",
                    isDefault: true,
                    displayName: {
                        uk: "EC Золота RG 120",
                        pl: "EC Złota RG 120",
                        en: "EC Gold RG 120"
                    },
                    description: {
                        uk: "Золота фарба, готова до використання. Без необхідності змішування.",
                        pl: "Złota farba gotowa do użycia. Bez konieczności mieszania.",
                        en: "Gold ink, ready to use. No mixing required."
                    },
                    fullInfo: {
                        uk: `Серія: EC, Спеціальний колір: EC RG 120 - Золото`,
                        pl: `Seria: EC, Kolor specjalny: EC RG 120 - Złoto`,
                        en: `Series: EC, Special color: EC RG 120 - Gold`
                    },
                    colorName: {
                        uk: "Золото",
                        pl: "Złoto",
                        en: "Gold"
                    }
                });
            }
            
            // Інші спеціальні фарби з масиву specialPaints
            specialPaints.forEach(sp => {
                const serie = series.find(s => s.id === sp.series) || series[0];
                paints.push({
                    id: `special-${counter++}`,
                    name: sp.name,
                    series: sp.series,
                    baseColorCode: sp.baseColorCode,
                    category: serie.category,
                    color: sp.color,
                    manufacturer: "SICO",
                    article: `${sp.series}-${sp.baseColorCode}`,
                    properties: serie.properties,
                    colorCode: sp.baseColorCode,
                    isDefault: true,
                    displayName: {
                        uk: `${serie.name.uk} ${sp.colorNameUk}`,
                        pl: `${serie.name.pl} ${sp.colorNamePl}`,
                        en: `${serie.name.en} ${sp.colorNameEn}`
                    },
                    description: {
                        uk: `Фарба серії ${serie.name.uk}. Колір: ${sp.colorNameUk}.`,
                        pl: `Farba serii ${serie.name.pl}. Kolor: ${sp.colorNamePl}.`,
                        en: `Ink from ${serie.name.en} series. Color: ${sp.colorNameEn}.`
                    },
                    fullInfo: {
                        uk: `Серія: ${serie.name.uk}, Колір: ${sp.name} - ${sp.colorNameUk}`,
                        pl: `Seria: ${serie.name.pl}, Kolor: ${sp.name} - ${sp.colorNamePl}`,
                        en: `Series: ${serie.name.en}, Color: ${sp.name} - ${sp.colorNameEn}`
                    },
                    colorName: {
                        uk: sp.colorNameUk,
                        pl: sp.colorNamePl,
                        en: sp.colorNameEn
                    }
                });
            });

            return paints;
        }

        // ---------- ОБ'ЄДНАННЯ ТА ДЕДУПЛІКАЦІЯ ----------
        const basePaints = generateBasePaints();
        const specialPaintsArray = generateSpecialPaints();
        const allPaints = [...basePaints, ...specialPaintsArray];

        // Видаляємо дублікати за ключем "series + baseColorCode"
        const uniquePaintsMap = new Map();
        allPaints.forEach(paint => {
            const key = `${paint.series}_${paint.baseColorCode}`;
            // Якщо такий ключ уже є, залишаємо той, що має пріоритет (special)
            if (!uniquePaintsMap.has(key)) {
                uniquePaintsMap.set(key, paint);
            } else {
                // Якщо поточний paint має id, що починається з "special-", замінюємо
                if (paint.id.startsWith('special-')) {
                    uniquePaintsMap.set(key, paint);
                }
                // Інакше залишаємо існуючий
            }
        });

        const paints = Array.from(uniquePaintsMap.values());

        // ---------- КАТЕГОРІЇ (унікальні) ----------
        const categories = Array.from(new Set(series.map(s => s.category))).sort();

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
            defaultCategory: "Універсальні",
            defaultUnit: "г",
            calculationsPrecision: 2,
            defaultSeries: "EC"
        };

        console.log(`[SICOMIX] Згенеровано ${paints.length} унікальних фарб (було всього ${allPaints.length})`);
        console.log(`[SICOMIX] Додано ${additives.length} додатків`);
        console.log(`[SICOMIX] Базових кольорів: ${baseColors.length}, серій: ${series.length}`);

        return {
            paints,
            recipes: [],
            series,
            baseColors,
            additives,
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
