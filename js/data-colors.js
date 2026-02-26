console.log('[SICOMIX] Завантаження data-colors.js...');

window.SICOMIX = window.SICOMIX || {};
const SICOMIX = window.SICOMIX;

SICOMIX.data = (function() {
    try {
        // ---------- БАЗОВІ ВЛАСТИВОСТІ ДЛЯ СЕРІЙ ----------
        const EC_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Високий глянець", pl: "Bardzo błyszczący", en: "Very glossy" },
            drying: { uk: "6 хв на повітрі, миттєво в тунелі", pl: "6 minut na powietrzu, natychmiastowo w tunelu", en: "6 min open air, instantly in tunnel" },
            mesh: { uk: "P77-120", pl: "P77-120", en: "P77-120" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна стійкість до світла та атмосферних умов для всіх кольорів", pl: "Doskonała odporność na światło i warunki atmosferyczne dla wszystkich kolorów", en: "Excellent light and weather resistance for all colors" },
            thinning: { uk: "EC 1000 (швидкий), EC 2000 (нормальний), EC 3000/4000 (легке сповільнення), EC 5000 (сповільнювач), EC 8000 (дуже повільний). Для флуо: EC 1300, EC 1301. Середнє розрідження: +/-15%", pl: "EC 1000 (szybki), EC 2000 (normalny), EC 3000/4000 (lekkie spowolnienie), EC 5000 (opóźniacz), EC 8000 (bardzo wolny). Dla fluo: EC 1300, EC 1301. Średnie rozrzedzenie: +/-15%", en: "EC 1000 (fast), EC 2000 (normal), EC 3000/4000 (mild retarder), EC 5000 (retarder), EC 8000 (very slow). For fluo: EC 1300, EC 1301. Average thinning: +/-15%" },
            additives: { uk: "EC 160 – криюча паста (20-50%); EC 150 – прозора база; EC 1501 HG – захисний лак; AS 1000 – антистатик до 5%; EC 170/1702 – сповільнювач у гелі; MP 1000 – матуючий порошок; EC 150/10 – матуюча паста; MP 3000 – загусник; HEC – затверджувач 3-5% для проблемних поверхонь", pl: "EC 160 – pasta kryjąca (20-50%); EC 150 – baza przezroczysta; EC 1501 HG – lakier ochronny; AS 1000 – antystatyk do 5%; EC 170/1702 – opóźniacz w żelu; MP 1000 – proszek matujący; EC 150/10 – pasta matująca; MP 3000 – zagęstnik; HEC – utwardzacz 3-5% do problematycznych powierzchni", en: "EC 160 – opaque paste (20-50%); EC 150 – transparent base; EC 1501 HG – protective varnish; AS 1000 – antistatic up to 5%; EC 170/1702 – gel retarder; MP 1000 – matting powder; EC 150/10 – matting paste; MP 3000 – thickener; HEC – hardener 3-5% for problem surfaces" },
            special: { uk: "EC 91 Q – напівматова біла з вищою в'язкістю для паперу та картону; EC 60/146, EC 61/163 – вогненно-червоні з екстремальною світлостійкістю; ECRG 120 – золота фарба готового використання", pl: "EC 91 Q – biała półmatowa o wyższej lepkości do papieru i tektury; EC 60/146, EC 61/163 – ogniste czerwienie z ekstremalną odpornością na światło; ECRG 120 – złota farba gotowa do użycia", en: "EC 91 Q – semi-matte white with higher viscosity for paper and cardboard; EC 60/146, EC 61/163 – fire reds with extreme lightfastness; ECRG 120 – gold ink ready to use" }
        };

        const CF_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Напівмат", pl: "Półmat", en: "Semi-matte" },
            drying: { uk: "4 хв на повітрі, миттєво в тунелі", pl: "4 min na powietrzu, natychmiastowo w tunelu", en: "4 min open air, instantly in tunnel" },
            mesh: { uk: "P77-P120", pl: "P77-P120", en: "P77-P120" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна стійкість до світла та атмосферних умов", pl: "Doskonała odporność na światło i warunki atmosferyczne", en: "Excellent light and weather resistance" },
            thinning: { uk: "CF 1000 (швидкий), CF 2000 (нормальний), CF 3000/4000 (легке сповільнення), CF 5000 (сповільнювач), CF 8000 (дуже повільний). +-20%", pl: "CF 1000 (szybki), CF 2000 (normalny), CF 3000/4000 (lekkie spowolnienie), CF 5000 (opóźniacz), CF 8000 (bardzo wolny). +-20%", en: "CF 1000 (fast), CF 2000 (normal), CF 3000/4000 (mild retarder), CF 5000 (retarder), CF 8000 (very slow). +-20%" },
            additives: { uk: "CF 150 – прозора база; CF 1501 HG – фінішний лак (високий глянець, стійкість до стирання); CF 160 – викривлююча добавка для деталей (до 10%); CF 1702 – сильний сповільнювач у гелі (до 10%); AS 1000 – антистатик до 5%; HCF – повільний затверджувач 5% для покращення адгезії", pl: "CF 150 – baza przezroczysta; CF 1501 HG – lakier wykończeniowy (wysoki połysk, odporność na ścieranie); CF 160 – dodatek wykrzywiający do detali (do 10%); CF 1702 – silny opóźniacz w żelu (do 10%); AS 1000 – antystatyk do 5%; HCF – wolny utwardzacz 5% dla poprawy przyczepności", en: "CF 150 – transparent base; CF 1501 HG – finishing varnish (high gloss, abrasion resistance); CF 160 – distorting additive for details (up to 10%); CF 1702 – strong gel retarder (up to 10%); AS 1000 – antistatic up to 5%; HCF – slow hardener 5% for improved adhesion" }
        };

        const PLUV_PROPERTIES = {
            type: { uk: "УФ-фарба", pl: "Farba UV", en: "UV ink" },
            finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
            drying: { uk: "УФ-промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
            mesh: { uk: "P140-P185T (флуо: P90, алюміній/золото: P120)", pl: "P140-P185T (fluoro: P90, aluminium/złoto: P120)", en: "P140-P185T (fluo: P90, aluminum/gold: P120)" },
            cleaning: { uk: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", pl: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", en: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1" },
            storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
            resistance: { uk: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік", pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku", en: "Very good for all colors, possible slight yellowing of varnish after one year" },
            thinning: { uk: "PLUV 2000 – стандартний розчинник", pl: "PLUV 2000 – standardowy rozcieńczalnik", en: "PLUV 2000 – standard thinner" },
            additives: { uk: "HPLUV – каталізатор до 5% для складних поверхонь; не додавати більше 20% PLUV 91 до кольору – знижує адгезію", pl: "HPLUV – katalizator do 5% dla trudnych powierzchni; nie dodawać więcej niż 20% PLUV 91 do koloru – zmniejsza przyczepność", en: "HPLUV – catalyst up to 5% for difficult surfaces; do not add more than 20% PLUV 91 to color – reduces adhesion" },
            special: { uk: "Відмінна еластичність, можливість бігування. Завжди тестувати перед виробництвом.", pl: "Doskonała elastyczność, możliwość bigowania. Zawsze testować przed produkcją.", en: "Excellent elasticity, possibility of creasing. Always test before production." }
        };

        const PLUV_LED_PROPERTIES = {
            type: { uk: "УФ-LED фарба", pl: "Farba UV-LED", en: "UV-LED ink" },
            finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
            drying: { uk: "LED UV: 395 нм, потужність 70%, швидкість стрічки 10 м/хв", pl: "LED UV: 395 nm, moc 70%, prędkość taśmy 10 m/min", en: "LED UV: 395 nm, power 70%, belt speed 10 m/min" },
            mesh: { uk: "Алюміній: P120; золото: P120; флуо: P90; інші кольори: 140-185", pl: "Aluminium: P120; złoto: P120; fluo: P90; inne kolory: 140-185", en: "Aluminum: P120; gold: P120; fluo: P90; other colors: 140-185" },
            cleaning: { uk: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", pl: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1", en: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1" },
            storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
            resistance: { uk: "Дуже хороша для всіх кольорів, крім флуо", pl: "Bardzo dobra dla wszystkich kolorów, z wyjątkiem fluo", en: "Very good for all colors, except fluo" },
            thinning: { uk: "PLUV 2000 – стандартний розчинник, 5-10%", pl: "PLUV 2000 – standardowy rozcieńczalnik, 5-10%", en: "PLUV 2000 – standard thinner, 5-10%" },
            additives: { uk: "HPLUV – каталізатор до 5% для складних поверхонь", pl: "HPLUV – katalizator do 5% dla trudnych powierzchni", en: "HPLUV – catalyst up to 5% for difficult surfaces" },
            special: { uk: "Не додавати більше 20% PLUV 91 до кольору – знижує адгезію.", pl: "Nie dodawać więcej niż 20% PLUV 91 do koloru – zmniejsza przyczepność.", en: "Do not add more than 20% PLUV 91 to color – reduces adhesion." }
        };

        const SX_PROPERTIES = {
            type: { uk: "Водна фарба", pl: "Farba wodna", en: "Water-based ink" },
            finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
            drying: { uk: "3 хв при 150°C (з 3% HSX – затверджувача – термофіксація не потрібна)", pl: "3 min w 150°C (z 3% HSX – utwardzacza – nie wymaga termofiksacji)", en: "3 min at 150°C (with 3% HSX hardener – no heat fixation needed)" },
            mesh: { uk: "P34-P90, P90 для CMYK", pl: "P34-P90, P90 dla CMYK", en: "P34-P90, P90 for CMYK" },
            cleaning: { uk: "Тепла вода або мийний засіб, можна під високим тиском", pl: "Ciepła woda lub środek czyszczący, można pod wysokim ciśnieniem", en: "Warm water or cleaning agent, can be high pressure" },
            storage: { uk: "1-2 роки при температурі вище нуля", pl: "1-2 lata w temperaturze powyżej zera", en: "1-2 years at above zero temperature" },
            resistance: { uk: "Відмінна стійкість до прання та світла після 24 год фіксації", pl: "Doskonała odporność na pranie i światło po 24 h utrwalania", en: "Excellent wash and light resistance after 24 h fixation" },
            thinning: { uk: "Max 10% води або сповільнювач SX 5000", pl: "Max 10% wody lub opóźniacz SX 5000", en: "Max 10% water or retarder SX 5000" },
            additives: { uk: "HSX – затверджувач (3%, після додавання використати за 24 год); SX 150 + 11 паст – самостійне приготування кольорів", pl: "HSX – utwardzacz (3%, po dodaniu zużyć w ciągu 24 h); SX 150 + 11 past – samodzielne przygotowanie kolorów", en: "HSX – hardener (3%, use within 24 h after addition); SX 150 + 11 pastes – self-mixing of colors" },
            special: { uk: "Концентровані, прозорі, живі кольори. Доступні CMYK та флуо. Дуже еластична, не тріскається.", pl: "Skoncentrowane, przezroczyste, żywe kolory. Dostępne CMYK i fluo. Bardzo elastyczna, nie pęka.", en: "Concentrated, transparent, vivid colors. CMYK and fluo available. Very elastic, does not crack." }
        };

        const SPTN_PROPERTIES = {
            type: { uk: "Пластизолева фарба", pl: "Farba plastizolowa", en: "Plastisol ink" },
            finish: { uk: "Сатиновий, м'який, дуже еластичний", pl: "Satyna, miękki, bardzo elastyczny", en: "Satin, soft, very elastic" },
            drying: { uk: "150-170°C ~2 хв", pl: "150-170°C ~2 min", en: "150-170°C ~2 min" },
            mesh: { uk: "Стандартні: 34-90 н/см; тріадні: 77-120; блискучі: 15", pl: "Standardowe: 34-90 n/cm; triadowe: 77-120; błyszczące: 15", en: "Standard: 34-90 n/cm; process: 77-120; glitter: 15" },
            cleaning: { uk: "CT 1000/1", pl: "CT 1000/1", en: "CT 1000/1" },
            storage: { uk: "5-20°C, до 5 років", pl: "5-20°C, do 5 lat", en: "5-20°C, up to 5 years" },
            resistance: { uk: "Відмінна стійкість до прання при дотриманні технології. Світлостійкість 2-3 роки (крім флуо).", pl: "Doskonała odporność na pranie przy przestrzeganiu technologii. Odporność na światło 2-3 lata (oprócz fluo).", en: "Excellent wash resistance when technology is followed. Lightfastness 2-3 years (except fluo)." },
            thinning: { uk: "SPT nr 1/SPTN 1000 – до 5%; SPTNCR – без обмежень", pl: "SPT nr 1/SPTN 1000 – do 5%; SPTNCR – bez ograniczeń", en: "SPT nr 1/SPTN 1000 – up to 5%; SPTNCR – unlimited" },
            additives: { uk: "SPTHNYL – до 10% для адгезії (суміш придатна 24 год); Nyloncoat – 5% для нейлону (суміш 24 год); база пучення; клей трансферний SPT nr 2", pl: "SPTHNYL – do 10% dla przyczepności (mieszanka ważna 24 h); Nyloncoat – 5% do nylonu (mieszanka 24 h); baza pęczniejąca; klej transferowy SPT nr 2", en: "SPTHNYL – up to 10% for adhesion (mix usable 24 h); Nyloncoat – 5% for nylon (mix 24 h); puff base; transfer adhesive SPT nr 2" },
            special: { uk: "Flash white SPTN91 – швидковисихаюча біла для бази; Opaque white SPTN91/l – дуже криюча та еластична", pl: "Flash white SPTN91 – szybkoschnąca biała do bazy; Opaque white SPTN91/l – bardzo kryjąca i elastyczna", en: "Flash white SPTN91 – fast drying white for base; Opaque white SPTN91/l – very opaque and elastic" }
        };

        const AS_PROPERTIES = {
            type: { uk: "Водна фарба", pl: "Farba wodna", en: "Water-based ink" },
            finish: { uk: "Сатиновий (блискуча версія AQUAGLOSS AG)", pl: "Satyna (błyszcząca wersja AQUAGLOSS AG)", en: "Satin (glossy version AQUAGLOSS AG)" },
            drying: { uk: "~1 год на відкритому повітрі, після тунелю можна складати в стоси", pl: "~1 godz. na otwartym powietrzu, po tunelu można układać w stosy", en: "~1 hour open air, after tunnel can be stacked" },
            mesh: { uk: "P77-P140", pl: "P77-P140", en: "P77-P140" },
            cleaning: { uk: "Вода (краще під високим тиском) або Aquaclean", pl: "Woda (lepiej pod wysokim ciśnieniem) lub Aquaclean", en: "Water (preferably high pressure) or Aquaclean" },
            storage: { uk: "4 роки при 5-25°C у добре закритій тарі", pl: "4 lata w temp. 5-25°C w szczelnie zamkniętym pojemniku", en: "4 years at 5-25°C in tightly closed container" },
            resistance: { uk: "Екологічна, без важких металів. Для зовнішнього застосування – додати 1% затверджувача (використати за 12 год)", pl: "Ekologiczna, bez metali ciężkich. Do zastosowań zewnętrznych – dodać 1% utwardzacza (zużyć w ciągu 12 h)", en: "Eco-friendly, heavy metal free. For outdoor use – add 1% hardener (use within 12 h)" },
            thinning: { uk: "Вода або сповільнювач AS 5000", pl: "Woda lub opóźniacz AS 5000", en: "Water or retarder AS 5000" },
            additives: { uk: "Затверджувач для водостійкості", pl: "Utwardzacz do wodoodporności", en: "Hardener for water resistance" }
        };

        const OTF_PROPERTIES = {
            type: { uk: "Суперкриюча водна фарба", pl: "Superkryjąca farba wodna", en: "Super opaque water-based ink" },
            finish: { uk: "Криючий, м'який, без гумового ефекту", pl: "Kryjący, miękki, bez efektu gumy", en: "Opaque, soft, no rubber effect" },
            drying: { uk: "3 хв при 150°C без затверджувача; з 3% HOT – термофіксація не потрібна", pl: "3 min w 150°C bez utwardzacza; z 3% HOT – nie wymaga termofiksacji", en: "3 min at 150°C without hardener; with 3% HOT – no heat fixation needed" },
            mesh: { uk: "P34T до P77T", pl: "P34T do P77T", en: "P34T to P77T" },
            cleaning: { uk: "Холодна вода + мийний засіб (Aquaclean), під високим тиском; для емульсій водостійких – CT 1000/63", pl: "Zimna woda + środek czyszczący (Aquaclean), pod wysokim ciśnieniem; dla emulsji wodoodpornych – CT 1000/63", en: "Cold water + cleaning agent (Aquaclean), high pressure; for water-resistant emulsions – CT 1000/63" },
            storage: { uk: "1-2 роки при 10-25°C, берегти від морозу", pl: "1-2 lata w temp. 10-25°C, chronić przed mrozem", en: "1-2 years at 10-25°C, protect from frost" },
            resistance: { uk: "Відмінна після додавання HOT. Для нейлону – HOT обов'язково.", pl: "Doskonała po dodaniu HOT. Do nylonu – HOT obowiązkowo.", en: "Excellent after adding HOT. For nylon – HOT mandatory." },
            thinning: { uk: "Max 10% води, або OTF 5000 (повільний), або OTF 7000 (еластичний). Сумарно не більше 10%.", pl: "Max 10% wody, lub OTF 5000 (wolny), lub OTF 7000 (elastyczny). Łącznie nie więcej niż 10%.", en: "Max 10% water, or OTF 5000 (slow), or OTF 7000 (elastic). Total not more than 10%." },
            additives: { uk: "HOT – затверджувач 3%; OTF 150/14 – лак для трансферу (стійкість до прання, еластичність); OTF 150/18 – повільна версія; OTF 100/101 – чорний блокатор міграції для поліестеру; База пучення OTF – змішувати з пастами PPT (100г бази + 5г пасти)", pl: "HOT – utwardzacz 3%; OTF 150/14 – lakier do transferu (odporność na pranie, elastyczność); OTF 150/18 – wolna wersja; OTF 100/101 – czarny blokator migracji do poliestru; Baza pęczniejąca OTF – mieszać z pastami PPT (100g bazy + 5g pasty)", en: "HOT – hardener 3%; OTF 150/14 – transfer varnish (wash resistance, elasticity); OTF 150/18 – slow version; OTF 100/101 – black migration blocker for polyester; OTF puff base – mix with PPT pastes (100g base + 5g paste)" },
            special: { uk: "Дуже криюча, еластична, незважаючи на високі криючі властивості. Трансфер: протокол для 1-кольорових та багатокольорових; Transferglue OTF nr 2 – клей із порошком усередині; порошки Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", pl: "Bardzo kryjąca, elastyczna, pomimo wysokich właściwości kryjących. Transfer: protokół dla 1-kolorowych i wielokolorowych; Transferglue OTF nr 2 – klej z proszkiem w środku; proszki Soft nr 3, nr 12, nr 4, nr 13; Cold peel.", en: "Very opaque, elastic, despite high opacity. Transfer: protocol for 1-color and multicolor; Transferglue OTF nr 2 – adhesive with powder inside; Soft powders nr 3, nr 12, nr 4, nr 13; Cold peel." }
        };

        const TPP_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
            drying: { uk: "10 хв на повітрі, миттєво в тунелі", pl: "10 min na powietrzu, natychmiastowo w tunelu", en: "10 min open air, instantly in tunnel" },
            mesh: { uk: "P90-120", pl: "P90-120", en: "P90-120" },
            cleaning: { uk: "ST 1000", pl: "ST 1000", en: "ST 1000" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна стійкість до світла та атмосферних умов", pl: "Doskonała odporność na światło i warunki atmosferyczne", en: "Excellent light and weather resistance" },
            thinning: { uk: "TPP 1000 (швидкий), TPP 2000 (нормальний), TPP 3000/4000 (легке сповільнення), TPP 5000 (повільний), TPP 8000 (дуже повільний). Середнє: +/-15%", pl: "TPP 1000 (szybki), TPP 2000 (normalny), TPP 3000/4000 (lekkie spowolnienie), TPP 5000 (wolny), TPP 8000 (bardzo wolny). Średnio: +/-15%", en: "TPP 1000 (fast), TPP 2000 (normal), TPP 3000/4000 (mild retarder), TPP 5000 (slow), TPP 8000 (very slow). Average: +/-15%" },
            additives: { uk: "HTPP SLOW – затверджувач для стійкості до подряпин та адгезії (придатність 1 день); TPP 160 – високотиксотропна викривлююча добавка (10%); TPP 150 – прозора база / лак; AS 1000 – антистатик 5%; TPP 1702 – сповільнювач у гелі проти засихання", pl: "HTPP SLOW – utwardzacz do odporności na zarysowania i przyczepności (ważność 1 dzień); TPP 160 – dodatek wysokotiksotropowy wykrzywiający (10%); TPP 150 – baza przezroczysta / lakier; AS 1000 – antystatyk 5%; TPP 1702 – opóźniacz w żelu przeciw zasychaniu", en: "HTPP SLOW – hardener for scratch resistance and adhesion (usable 1 day); TPP 160 – highly thixotropic distorting additive (10%); TPP 150 – transparent base / varnish; AS 1000 – antistatic 5%; TPP 1702 – gel retarder against drying" },
            special: { uk: "Не додавати матуючий порошок – знижує адгезію. Для проблемних поверхонь – матеріал має бути активований.", pl: "Nie dodawać proszku matującego – zmniejsza przyczepność. Do problematycznych powierzchni – materiał musi być aktywowany.", en: "Do not add matting powder – reduces adhesion. For problem surfaces – material must be activated." }
        };

        const UV_PROPERTIES = {
            type: { uk: "УФ-фарба", pl: "Farba UV", en: "UV ink" },
            finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
            drying: { uk: "УФ-промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв", pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min", en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min" },
            mesh: { uk: "P140-P185T (алюміній/золото: P120, флуо: P90)", pl: "P140-P185T (aluminium/złoto: P120, fluo: P90)", en: "P140-P185T (aluminum/gold: P120, fluo: P90)" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "1-2 роки у темних контейнерах при 5-25°C", pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C", en: "1-2 years in dark containers at 5-25°C" },
            resistance: { uk: "Для внутрішнього застосування", pl: "Do zastosowań wewnętrznych", en: "For indoor use" },
            thinning: { uk: "UV 2000 – стандартний розчинник, 5-10%", pl: "UV 2000 – standardowy rozcieńczalnik, 5-10%", en: "UV 2000 – standard thinner, 5-10%" },
            additives: { uk: "—", pl: "—", en: "—" },
            special: { uk: "Висока еластичність – можна згинати/складати (важливо для POS-матеріалів).", pl: "Wysoka elastyczność – można zginać/składać (ważne dla materiałów POS).", en: "High elasticity – can be bent/folded (important for POS materials)." }
        };

        const NST_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
            drying: { uk: "5 хв на повітрі, миттєво в тунелі", pl: "5 min na powietrzu, natychmiastowo w tunelu", en: "5 min open air, instantly in tunnel" },
            mesh: { uk: "P45-P90", pl: "P45-P90", en: "P45-P90" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Понад 24 місяці", pl: "Ponad 24 miesiące", en: "Over 24 months" },
            resistance: { uk: "Висока стійкість до прання (з HNST SLOW) та атмосферних умов", pl: "Wysoka odporność na pranie (z HNST SLOW) i warunki atmosferyczne", en: "High wash (with HNST SLOW) and weather resistance" },
            thinning: { uk: "До 15% сповільнювача NST 1702", pl: "Do 15% opóźniacza NST 1702", en: "Up to 15% retarder NST 1702" },
            additives: { uk: "HNST SLOW – каталізатор до 5%; NST 150 – прозора база (знижує криття та світлостійкість); MP 3000 – загусник 1-2%", pl: "HNST SLOW – katalizator do 5%; NST 150 – baza przezroczysta (zmniejsza krycie i odporność na światło); MP 3000 – zagęstnik 1-2%", en: "HNST SLOW – catalyst up to 5%; NST 150 – transparent base (reduces opacity and lightfastness); MP 3000 – thickener 1-2%" },
            special: { uk: "Ультракриючі кольори: 40, 42, 56. Прозорі кольори: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Флуо – нижча світлостійкість. Всі кольори змішуються.", pl: "Ultrakryjące kolory: 40, 42, 56. Przezroczyste kolory: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – niższa odporność na światło. Wszystkie kolory mieszają się.", en: "Ultra-opaque colors: 40, 42, 56. Transparent colors: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – lower lightfastness. All colors are mixable." }
        };

        const SP_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Матовий", pl: "Matowy", en: "Matte" },
            drying: { uk: "6 хв на повітрі, миттєво в тунелі", pl: "6 min na powietrzu, natychmiastowo w tunelu", en: "6 min open air, instantly in tunnel" },
            mesh: { uk: "P77-120", pl: "P77-120", en: "P77-120" },
            cleaning: { uk: "ST 1000", pl: "ST 1000", en: "ST 1000" },
            storage: { uk: "Кілька років", pl: "Kilka lat", en: "Several years" },
            resistance: { uk: "Відмінна для всіх кольорів", pl: "Doskonała dla wszystkich kolorów", en: "Excellent for all colors" },
            thinning: { uk: "SP 1000 (швидкий), SP 2000 (нормальний), SP 3000 (повільний). Середнє: +/-15%", pl: "SP 1000 (szybki), SP 2000 (normalny), SP 3000 (wolny). Średnio: +/-15%", en: "SP 1000 (fast), SP 2000 (normal), SP 3000 (slow). Average: +/-15%" },
            additives: { uk: "SP 160 – викривлююча паста (10%); SP 150 – прозора база; AS 1000 – антистатик 5%", pl: "SP 160 – pasta wykrzywiająca (10%); SP 150 – baza przezroczysta; AS 1000 – antystatyk 5%", en: "SP 160 – distorting paste (10%); SP 150 – transparent base; AS 1000 – antistatic 5%" },
            special: { uk: "Серія стійка до адгезивів.", pl: "Seria odporna na kleje.", en: "Series resistant to adhesives." }
        };

        const SI_PROPERTIES = {
            type: { uk: "Силіконова фарба", pl: "Farba silikonowa", en: "Silicone ink" },
            finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
            drying: { uk: "Прямий друк: 150°C, 2 хв; трансфер: 125-140°C, 60-90 сек", pl: "Druk bezpośredni: 150°C, 2 min; transfer: 125-140°C, 60-90 sek", en: "Direct: 150°C, 2 min; transfer: 125-140°C, 60-90 sec" },
            mesh: { uk: "P62", pl: "P62", en: "P62" },
            cleaning: { uk: "CT 1000/78", pl: "CT 1000/78", en: "CT 1000/78" },
            storage: { uk: "Мінімум 12 місяців", pl: "Minimum 12 miesięcy", en: "Minimum 12 months" },
            resistance: { uk: "Відмінна стійкість до прання", pl: "Doskonała odporność na pranie", en: "Excellent wash resistance" },
            thinning: { uk: "SI 2000 (нормальний) до 5%; SI 5000/4 (сповільнювач) 1-5%", pl: "SI 2000 (normalny) do 5%; SI 5000/4 (opóźniacz) 1-5%", en: "SI 2000 (normal) up to 5%; SI 5000/4 (retarder) 1-5%" },
            additives: { uk: "CSI – каталізатор 3-5%; Fixator SI – 1% (обмежений час життя)", pl: "CSI – katalizator 3-5%; Fixator SI – 1% (ograniczona przydatność)", en: "CSI – catalyst 3-5%; Fixator SI – 1% (limited pot life)" },
            special: { uk: "Не потребує додаткового шару проти міграції. Трансферний порошок nr 18. Сертифіковано Oekotex 100.", pl: "Nie wymaga dodatkowej warstwy przeciw migracji. Proszek transferowy nr 18. Certyfikat Oekotex 100.", en: "No extra anti-bleeding layer needed. Transfer powder nr 18. Oekotex 100 certified." }
        };

        const SN_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Сатиновий", pl: "Satyna", en: "Satin" },
            drying: { uk: "4 хв на повітрі, миттєво в тунелі", pl: "4 min na powietrzu, natychmiastowo w tunelu", en: "4 min open air, instantly in tunnel" },
            mesh: { uk: "P77-120", pl: "P77-120", en: "P77-120" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна стійкість до світла, але не до прання", pl: "Doskonała odporność na światło, ale nie na pranie", en: "Excellent light resistance, but not wash resistant" },
            thinning: { uk: "SN 1000 (швидкий), SN 2000 (нормальний), SN 3000/4000 (повільний), SN 5000 (повільний). Середнє: +/-10%", pl: "SN 1000 (szybki), SN 2000 (normalny), SN 3000/4000 (wolny), SN 5000 (wolny). Średnio: +/-10%", en: "SN 1000 (fast), SN 2000 (normal), SN 3000/4000 (slow), SN 5000 (slow). Average: +/-10%" },
            additives: { uk: "SN 150 – прозора база; SN 160 – викривлююча паста (10%); AS 1000 – антистатик 5%; SN 1702 – сповільнювач у гелі (+/-10%)", pl: "SN 150 – baza przezroczysta; SN 160 – pasta wykrzywiająca (10%); AS 1000 – antystatyk 5%; SN 1702 – opóźniacz w żelu (+/-10%)", en: "SN 150 – transparent base; SN 160 – distorting paste (10%); AS 1000 – antistatic 5%; SN 1702 – gel retarder (+/-10%)" },
            special: { uk: "Тільки водостійкість, не для прання.", pl: "Tylko odporność na wodę, nie na pranie.", en: "Water resistance only, not wash resistant." }
        };

        const QS_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Глянцевий", pl: "Błyszczący", en: "Glossy" },
            drying: { uk: "6 хв на повітрі, миттєво в тунелі", pl: "6 min na powietrzu, natychmiastowo w tunelu", en: "6 min open air, instantly in tunnel" },
            mesh: { uk: "P77-120", pl: "P77-120", en: "P77-120" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна для всіх кольорів", pl: "Doskonała dla wszystkich kolorów", en: "Excellent for all colors" },
            thinning: { uk: "QS 1000 (швидкий), QS 2000 (нормальний), QS 3000/4000 (повільний), QS 5000 (повільний), QS 8000 (дуже повільний). Середнє: +/-15%", pl: "QS 1000 (szybki), QS 2000 (normalny), QS 3000/4000 (wolny), QS 5000 (wolny), QS 8000 (bardzo wolny). Średnio: +/-15%", en: "QS 1000 (fast), QS 2000 (normal), QS 3000/4000 (slow), QS 5000 (slow), QS 8000 (very slow). Average: +/-15%" },
            additives: { uk: "QS 160 – викривлююча паста (10-20%); QS 150 – прозора база; AS 1000 – антистатик 5%; QS 170/1702 – сповільнювач у гелі; HQS – затверджувач 5% для адгезії; Weekmaker nr 2000 – 3% для PETG", pl: "QS 160 – pasta wykrzywiająca (10-20%); QS 150 – baza przezroczysta; AS 1000 – antystatyk 5%; QS 170/1702 – opóźniacz w żelu; HQS – utwardzacz 5% dla przyczepności; Weekmaker nr 2000 – 3% dla PETG", en: "QS 160 – distorting paste (10-20%); QS 150 – transparent base; AS 1000 – antistatic 5%; QS 170/1702 – gel retarder; HQS – hardener 5% for adhesion; Weekmaker nr 2000 – 3% for PETG" },
            special: { uk: "Для PETG додавати Weekmaker nr 2000, щоб уникнути тріщин.", pl: "Do PETG dodawać Weekmaker nr 2000, aby uniknąć pęknięć.", en: "For PETG add Weekmaker nr 2000 to avoid cracks." }
        };

        const PX_PROPERTIES = {
            type: { uk: "Епоксидна фарба", pl: "Farba epoksydowa", en: "Epoxy ink" },
            finish: { uk: "Високий глянець", pl: "Wysoki połysk", en: "High gloss" },
            drying: { uk: "Пилонепроникний: 60 хв, складання: 3 год, повне твердіння: 24-48 год", pl: "Pyłosuchość: 60 min, układanie: 3 h, pełne utwardzenie: 24-48 h", en: "Dust-free: 60 min, stackable: 3 h, full cure: 24-48 h" },
            mesh: { uk: "P77-120", pl: "P77-120", en: "P77-120" },
            cleaning: { uk: "CT 1000/1 або CT 1000", pl: "CT 1000/1 lub CT 1000", en: "CT 1000/1 or CT 1000" },
            storage: { uk: "Без затверджувача: кілька років; із затверджувачем: 8 год", pl: "Bez utwardzacza: kilka lat; z utwardzaczem: 8 h", en: "Without hardener: several years; with hardener: 8 h" },
            resistance: { uk: "Відмінна для стандартних кольорів", pl: "Doskonała dla standardowych kolorów", en: "Excellent for standard colors" },
            thinning: { uk: "Не потребує розрідження", pl: "Nie wymaga rozcieńczania", en: "No dilution needed" },
            additives: { uk: "PXHPX – затверджувач (15-17% в залежності від кольору)", pl: "PXHPX – utwardzacz (15-17% w zależności od koloru)", en: "PXHPX – hardener (15-17% depending on color)" },
            special: { uk: "Поверхні повинні бути знежирені. Після затвердіння фарбу неможливо видалити з сітки.", pl: "Powierzchnie muszą być odtłuszczone. Po utwardzeniu farby nie można usunąć z sita.", en: "Surfaces must be degreased. After curing, ink cannot be removed from screen." }
        };

        const ECVF_PROPERTIES = {
            type: { uk: "Розчинникова фарба", pl: "Farba rozpuszczalnikowa", en: "Solvent-based ink" },
            finish: { uk: "Глянцевий", pl: "Błyszczący", en: "Glossy" },
            drying: { uk: "При 20°C: валкове нанесення 1-2 год, трафаретний друк P45: 15 хв", pl: "W 20°C: nakładanie walcowe 1-2 h, sitodruk P45: 15 min", en: "At 20°C: roller coating 1-2 h, screen printing P45: 15 min" },
            mesh: { uk: "P45 для трафаретного друку", pl: "P45 dla sitodruku", en: "P45 for screen printing" },
            cleaning: { uk: "CT 1000 або CT 1000/1", pl: "CT 1000 lub CT 1000/1", en: "CT 1000 or CT 1000/1" },
            storage: { uk: "Необмежений", pl: "Nieograniczona", en: "Unlimited" },
            resistance: { uk: "Відмінна для всіх кольорів, крім флуо", pl: "Doskonała dla wszystkich kolorów, z wyjątkiem fluo", en: "Excellent for all colors, except fluo" },
            thinning: { uk: "ECVF 1000 – швидкий розчинник: 5% для P45, 30% для валкового нанесення", pl: "ECVF 1000 – szybki reduktor: 5% dla P45, 30% dla nakładania walcowego", en: "ECVF 1000 – quick reducer: 5% for P45, 30% for roller coating" },
            additives: { uk: "—", pl: "—", en: "—" },
            special: { uk: "Можна наносити валками або трафаретним друком. Іноді потрібне знежирення IPA.", pl: "Można nakładać walcami lub sitodrukiem. Czasami wymagane odtłuszczenie IPA.", en: "Can be applied by roller or screen printing. Sometimes degreasing with IPA needed." }
        };

        // ---------- ОСНОВНІ СЕРІЇ ----------
        const series = {
            EC: {
                id: "EC",
                name: { uk: "EC", pl: "EC", en: "EC" },
                category: "Універсальні",
                description: {
                    uk: "Універсальна розчинникова фарба для наклейок, гнучкого та твердого ПВХ, АБС, Forex, паперу, картону, попередньо лакованих металів, банерів, полотна. При додаванні 5% затверджувача також підходить для поліпропілену, Priplack, Biprint.",
                    pl: "Uniwersalna farba rozpuszczalnikowa do naklejek, elastycznego i twardego PVC, ABS, forexu, papieru, tektury, metali wstępnie lakierowanych, banerów, płótna. Po dodaniu 5% utwardzacza przylega również do polipropylenu, priplacku, biprintu.",
                    en: "Universal solvent-based ink for stickers, flexible and rigid PVC, ABS, Forex, paper, cardboard, pre-lacquered metals, banners, canvas. With 5% hardener also adheres to polypropylene, Priplack, Biprint."
                },
                properties: EC_PROPERTIES
            },
            CF: {
                id: "CF",
                name: { uk: "CARTOFLEX CF", pl: "CARTOFLEX CF", en: "CARTOFLEX CF" },
                category: "Папір/картон",
                description: {
                    uk: "Розчинникова фарба для паперу, картону, самоклейного паперу, лакованих металів, промислового друку (сталеві бочки, вогнегасники, пробки). Для плівок Penstick з поліестеровим покриттям, поліестеру, PET, поліуретану – серія CF A&S.",
                    pl: "Farba rozpuszczalnikowa do papieru, tektury, papierów samoprzylepnych, metali lakierowanych, druku przemysłowego (beczki stalowe, gaśnice, korki). Do folii Penstick z powłoką poliestrową, poliestru, PET, poliuretanu – seria CF A&S.",
                    en: "Solvent-based ink for paper, cardboard, self-adhesive paper, lacquered metals, industrial printing (steel drums, fire extinguishers, caps). For Penstick films with polyester coating, polyester, PET, polyurethane – CF A&S series."
                },
                properties: CF_PROPERTIES
            },
            PLUV: {
                id: "PLUV",
                name: { uk: "UVIPLAST PLUV", pl: "UVIPLAST PLUV", en: "UVIPLAST PLUV" },
                category: "UV фарби",
                description: {
                    uk: "УФ-фарба для самоклейних матеріалів, банерів, лакованого металу, ПП, пінопласту, попередньо активованого поліетилену, полікарбонату, паперу, ПВХ. Лак PLUV 150 – високоглянцевий для офсету та трафаретного друку.",
                    pl: "Farba UV do materiałów samoprzylepnych, banerów, metalu lakierowanego, PP, styropianu, wstępnie aktywowanego polietylenu, poliwęglanu, papieru, PCV. Lakier PLUV 150 – wysoki połysk do offsetu i druku sitowego.",
                    en: "UV ink for self-adhesive materials, banners, lacquered metal, PP, styrofoam, pre-activated polyethylene, polycarbonate, paper, PVC. PLUV 150 varnish – high gloss for offset and screen printing."
                },
                properties: PLUV_PROPERTIES
            },
            PLUV_LED: {
                id: "PLUV_LED",
                name: { uk: "UVIPLAST PLUV LED", pl: "UVIPLAST PLUV LED", en: "UVIPLAST PLUV LED" },
                category: "UV фарби (LED)",
                description: {
                    uk: "УФ-LED фарба для самоклейних матеріалів, банерів, лакованого металу, корона-обробленого поліпропілену, попередньо активованого поліетилену, полікарбонату, паперу, ПВХ.",
                    pl: "Farba UV-LED do materiałów samoprzylepnych, banerów, metalu lakierowanego, polipropylenu poddanego obróbce koronowej, wstępnie aktywowanego polietylenu, poliwęglanu, papieru, PCV.",
                    en: "UV-LED ink for self-adhesive materials, banners, lacquered metal, corona-treated polypropylene, pre-activated polyethylene, polycarbonate, paper, PVC."
                },
                properties: PLUV_LED_PROPERTIES
            },
            SX: {
                id: "SX",
                name: { uk: "SICOTEX SX", pl: "SICOTEX SX", en: "SICOTEX SX" },
                category: "Текстиль",
                description: {
                    uk: "Водна фарба для бавовни, синтетичних тканин та їх сумішей. Екологічна, сертифікат Oeko-Tex 100 клас I-IV. Без розчинників, важких металів, шкідливих пігментів, PVC.",
                    pl: "Farba wodna do bawełny, tkanin syntetycznych i ich mieszanek. Ekologiczna, certyfikat Oeko-Tex 100 klasa I-IV. Bez rozpuszczalników, metali ciężkich, szkodliwych pigmentów, PVC.",
                    en: "Water-based ink for cotton, synthetic fabrics and their blends. Eco-friendly, Oeko-Tex 100 class I-IV certified. Free from solvents, heavy metals, harmful pigments, PVC."
                },
                properties: SX_PROPERTIES
            },
            SPTN: {
                id: "SPTN",
                name: { uk: "SICOPLAST SPTN", pl: "SICOPLAST SPTN", en: "SICOPLAST SPTN" },
                category: "Текстиль",
                description: {
                    uk: "Пластизолева фарба для всіх тканинних матеріалів – натуральних та синтетичних. Прямий та трансферний друк.",
                    pl: "Farba plastizolowa do wszystkich materiałów tekstylnych – naturalnych i syntetycznych. Druk bezpośredni i transferowy.",
                    en: "Plastisol ink for all textile materials – natural and synthetic. Direct and transfer printing."
                },
                properties: SPTN_PROPERTIES
            },
            AS: {
                id: "AS",
                name: { uk: "AQUASET AS", pl: "AQUASET AS", en: "AQUASET AS" },
                category: "Папір/картон",
                description: {
                    uk: "Водна фарба для картону, товстого паперу (мін. 130 г/м²), дерева, гофрокартону. Екологічна, без важких металів, підходить для дитячих іграшок та харчової упаковки.",
                    pl: "Farba wodna do tektury, grubego papieru (min. 130 g/m²), drewna, tektury falistej. Ekologiczna, bez metali ciężkich, odpowiednia do zabawek dla dzieci i opakowań spożywczych.",
                    en: "Water-based ink for cardboard, thick paper (min. 130 g/m²), wood, corrugated cardboard. Eco-friendly, heavy metal free, suitable for children's toys and food packaging."
                },
                properties: AS_PROPERTIES
            },
            OTF: {
                id: "OTF",
                name: { uk: "OPATEX OTF", pl: "OPATEX OTF", en: "OPATEX OTF" },
                category: "Текстиль",
                description: {
                    uk: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах (натуральних та більшості синтетичних).",
                    pl: "Superkryjąca farba wodna do druku bezpośredniego i transferowego na ciemnych tkaninach (naturalnych i większości syntetycznych).",
                    en: "Super opaque water-based ink for direct and transfer printing on dark fabrics (natural and most synthetic)."
                },
                properties: OTF_PROPERTIES
            },
            TPP: {
                id: "TPP",
                name: { uk: "POLYPRO TPP", pl: "POLYPRO TPP", en: "POLYPRO TPP" },
                category: "Пластики",
                description: {
                    uk: "Розчинникова фарба для попередньо обробленого поліпропілену (priplack, akylux, duoprop). Для попередньо активованого поліетилену – додати 5% HTPP SLOW.",
                    pl: "Farba rozpuszczalnikowa do wstępnie obrobionego polipropylenu (priplack, akylux, duoprop). Do wstępnie aktywowanego polietylenu – dodać 5% HTPP SLOW.",
                    en: "Solvent-based ink for pre-treated polypropylene (priplack, akylux, duoprop). For pre-activated polyethylene – add 5% HTPP SLOW."
                },
                properties: TPP_PROPERTIES
            },
            UV: {
                id: "UV",
                name: { uk: "UVILUX UV", pl: "UVILUX UV", en: "UVILUX UV" },
                category: "UV фарби",
                description: {
                    uk: "УФ-фарба для паперу та картону. Високий глянець, відмінна еластичність, можливість згинання. Лак UV 150 – для офсету та трафаретного друку.",
                    pl: "Farba UV do papieru i tektury. Wysoki połysk, doskonała elastyczność, możliwość składania. Lakier UV 150 – do offsetu i druku sitowego.",
                    en: "UV ink for paper and cardboard. High gloss, excellent flexibility, can be folded. UV 150 varnish – for offset and screen printing."
                },
                properties: UV_PROPERTIES
            },
            NST: {
                id: "NST",
                name: { uk: "NYLONSTAR NST", pl: "NYLONSTAR NST", en: "NYLONSTAR NST" },
                category: "Текстиль",
                description: {
                    uk: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven. Висока еластичність, стійкість до стирання, атмосферних впливів та прання (з додаванням HNST SLOW).",
                    pl: "Farba rozpuszczalnikowa do poliamidu (nylon) i toreb non-woven. Wysoka elastyczność, odporność na ścieranie, warunki atmosferyczne i pranie (z dodatkiem HNST SLOW).",
                    en: "Solvent-based ink for polyamide (nylon) and non-woven bags. High elasticity, abrasion resistance, weather and wash resistance (with HNST SLOW addition)."
                },
                properties: NST_PROPERTIES
            },
            SP: {
                id: "SP",
                name: { uk: "SICOPRINT SP", pl: "SICOPRINT SP", en: "SICOPRINT SP" },
                category: "Універсальні",
                description: {
                    uk: "Розчинникова фарба для паперу, картону, самоклейного паперу, лакованих металів, milmar, syntape. Матовий аспект, швидке висихання.",
                    pl: "Farba rozpuszczalnikowa do papieru, tektury, papieru samoprzylepnego, metali lakierowanych, milmar, syntape. Aspekt matowy, szybkie schnięcie.",
                    en: "Solvent-based ink for paper, cardboard, self-adhesive paper, lacquered metals, milmar, syntape. Matte aspect, fast drying."
                },
                properties: SP_PROPERTIES
            },
            SI: {
                id: "SI",
                name: { uk: "SILICONE SI", pl: "SILICONE SI", en: "SILICONE SI" },
                category: "Спеціальні",
                description: {
                    uk: "Силіконова фарба для поліестерових футболок та курток softshell. Висока криюча здатність, відмінна стійкість до міграції барвника. Для прямого та трансферного друку.",
                    pl: "Farba silikonowa do koszulek poliestrowych i kurtek softshell. Wysoka kryjącość, doskonała odporność na migrację barwnika. Do druku bezpośredniego i transferowego.",
                    en: "Silicone ink for polyester shirts and softshell jackets. High opacity, excellent dye migration resistance. For direct and transfer printing."
                },
                properties: SI_PROPERTIES
            },
            SN: {
                id: "SN",
                name: { uk: "SICONYL SN", pl: "SICONYL SN", en: "SICONYL SN" },
                category: "Текстиль",
                description: {
                    uk: "Розчинникова фарба для нейлону (парасольки, спортивні сумки). Гарна адгезія, еластичність, стійкість до води (не до прання).",
                    pl: "Farba rozpuszczalnikowa do nylonu (parasole, torby sportowe). Dobra przyczepność, elastyczność, odporność na wodę (nie na pranie).",
                    en: "Solvent-based ink for nylon (umbrellas, sports bags). Good adhesion, flexibility, water resistance (not wash resistant)."
                },
                properties: SN_PROPERTIES
            },
            QS: {
                id: "QS",
                name: { uk: "QUICKSET QS", pl: "QUICKSET QS", en: "QUICKSET QS" },
                category: "Швидковисихаючі",
                description: {
                    uk: "Швидковисихаюча розчинникова фарба для твердого ПВХ, полістиролу, plexi, гнучкого ПВХ, наклейок. Миттєве висихання в тунелі.",
                    pl: "Szybkoschnąca farba rozpuszczalnikowa do twardego PVC, polistyrenu, plexi, elastycznego PVC, naklejek. Natychmiastowe schnięcie w tunelu.",
                    en: "Quick-drying solvent-based ink for hard PVC, polystyrene, plexi, flexible PVC, stickers. Instant drying in tunnel."
                },
                properties: QS_PROPERTIES
            },
            PX: {
                id: "PX",
                name: { uk: "SICEPOX PX", pl: "SICEPOX PX", en: "SICEPOX PX" },
                category: "Епоксидні",
                description: {
                    uk: "Двокомпонентна епоксидна фарба для скла, плитки, металів. Високий глянець, відмінна адгезія до твердих поверхонь.",
                    pl: "Dwuskładnikowa farba epoksydowa do szkła, płytek, metali. Wysoki połysk, doskonała przyczepność do twardych powierzchni.",
                    en: "Two-component epoxy ink for glass, tiles, metals. High gloss, excellent adhesion to tough surfaces."
                },
                properties: PX_PROPERTIES
            },
            ECVF: {
                id: "ECVF",
                name: { uk: "BANNERINK ECVF", pl: "BANNERINK ECVF", en: "BANNERINK ECVF" },
                category: "Універсальні",
                description: {
                    uk: "Гнучка фарба для ПВХ-банерів та полотна. Для трафаретного друку та валкового нанесення. Відмінна стійкість до атмосферних впливів.",
                    pl: "Elastyczna farba do banerów PVC i płótna. Do sitodruku i nakładania walcowego. Doskonała odporność na warunki atmosferyczne.",
                    en: "Flexible ink for PVC banners and canvas. For screen printing and roller coating. Excellent weather resistance."
                },
                properties: ECVF_PROPERTIES
            },
            EVS: {
                id: "EVS",
                name: { uk: "EVASTAR EVS", pl: "EVASTAR EVS", en: "EVASTAR EVS" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для EVA-матеріалів, відмінна адгезія.",
                    pl: "Farba do materiałów EVA, doskonała przyczepność.",
                    en: "Ink for EVA materials, excellent adhesion."
                },
                properties: JSON.parse(JSON.stringify(SX_PROPERTIES))
            },
            TA: {
                id: "TA",
                name: { uk: "TAMPOPRINT TA", pl: "TAMPOPRINT TA", en: "TAMPOPRINT TA" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для тамподруку, висока криюча здатність.",
                    pl: "Farba do tampodruku, wysoka kryjącość.",
                    en: "Ink for tampon printing, high opacity."
                },
                properties: JSON.parse(JSON.stringify(EC_PROPERTIES))
            },
            MTR: {
                id: "MTR",
                name: { uk: "MTR", pl: "MTR", en: "MTR" },
                category: "Інші",
                description: {
                    uk: "Спеціальна фарба для промислового застосування.",
                    pl: "Specjalna farba do zastosowań przemysłowych.",
                    en: "Special ink for industrial applications."
                },
                properties: JSON.parse(JSON.stringify(EC_PROPERTIES))
            },
            SB: {
                id: "SB",
                name: { uk: "SCRATCH SB", pl: "SCRATCH SB", en: "SCRATCH SB" },
                category: "Спеціальні",
                description: {
                    uk: "Фарба для дряпок (scratch-off), використовується в лотерейних квитках тощо.",
                    pl: "Farba zdrapka (scratch-off), stosowana w losach itp.",
                    en: "Scratch-off ink used in lottery tickets, etc."
                },
                properties: JSON.parse(JSON.stringify(EC_PROPERTIES))
            },
            OTHER: {
                id: "OTHER",
                name: { uk: "Інші", pl: "Inne", en: "Other" },
                category: "Інші",
                description: {
                    uk: "Інші фарби, що не належать до стандартних категорій.",
                    pl: "Inne farby, nie należące do standardowych kategorii.",
                    en: "Other inks not belonging to standard categories."
                },
                properties: JSON.parse(JSON.stringify(EC_PROPERTIES))
            }
        };

        // ---------- КАТЕГОРІЇ З ОПИСАМИ ----------
        const categoryDescriptions = {
            "Універсальні": {
                uk: "Фарби для широкого спектру матеріалів: ПВХ, полістирол, папір, картон, метали тощо. Підходять для більшості завдань трафаретного друку.",
                pl: "Farby do szerokiego spektrum materiałów: PVC, polistyren, papier, tektura, metale itp. Nadają się do większości zadań sitodruku.",
                en: "Inks for a wide range of materials: PVC, polystyrene, paper, cardboard, metals, etc. Suitable for most screen printing tasks."
            },
            "Папір/картон": {
                uk: "Фарби, призначені для паперу, картону, гофрокартону та інших целюлозних матеріалів. Часто використовуються для упаковки.",
                pl: "Farby przeznaczone do papieru, tektury, tektury falistej i innych materiałów celulozowych. Często stosowane do opakowań.",
                en: "Inks designed for paper, cardboard, corrugated board and other cellulosic materials. Often used for packaging."
            },
            "UV фарби": {
                uk: "Фарби, які твердіють під дією ультрафіолетового випромінювання. Забезпечують високий глянець, стійкість до подряпин, миттєве висихання.",
                pl: "Farby utwardzane promieniowaniem ultrafioletowym. Zapewniają wysoki połysk, odporność na zarysowania, natychmiastowe schnięcie.",
                en: "Inks that cure under ultraviolet light. Provide high gloss, scratch resistance, instant drying."
            },
            "UV фарби (LED)": {
                uk: "УФ-фарби, що твердіють під LED-лампами (395 нм). Енергоефективні, не містять розчинників, підходять для термочутливих матеріалів.",
                pl: "Farby UV utwardzane lampami LED (395 nm). Energooszczędne, bezrozpuszczalnikowe, nadają się do materiałów wrażliwych na ciepło.",
                en: "UV inks curing with LED lamps (395 nm). Energy-efficient, solvent-free, suitable for heat-sensitive materials."
            },
            "Текстиль": {
                uk: "Фарби для друку на тканинах: бавовна, поліестер, синтетика, суміші. Водні, пластизолеві, силіконові. Стійкі до прання (залежно від типу).",
                pl: "Farby do druku na tkaninach: bawełna, poliester, syntetyki, mieszanki. Wodne, plastizolowe, silikonowe. Odporne na pranie (w zależności od typu).",
                en: "Inks for printing on fabrics: cotton, polyester, synthetics, blends. Water-based, plastisol, silicone. Wash resistant (depending on type)."
            },
            "Пластики": {
                uk: "Фарби для важких пластиків: поліпропілен, поліетилен, полікарбонат, АБС. Часто вимагають попередньої обробки поверхні.",
                pl: "Farby do trudnych tworzyw sztucznych: polipropylen, polietylen, poliwęglan, ABS. Często wymagają wstępnej obróbki powierzchni.",
                en: "Inks for difficult plastics: polypropylene, polyethylene, polycarbonate, ABS. Often require surface pretreatment."
            },
            "Спеціальні": {
                uk: "Фарби для особливих застосувань: епоксидні, силіконові, для EVA, дряпок, тамподруку тощо.",
                pl: "Farby do specjalnych zastosowań: epoksydowe, silikonowe, do EVA, zdrapek, tampodruku itp.",
                en: "Inks for special applications: epoxy, silicone, for EVA, scratch-off, tampon printing, etc."
            },
            "Швидковисихаючі": {
                uk: "Фарби з прискореним висиханням, ідеальні для швидкісного друку на непористих поверхнях.",
                pl: "Farby z przyspieszonym schnięciem, idealne do szybkiego druku na powierzchniach nieporowatych.",
                en: "Inks with accelerated drying, ideal for high-speed printing on non-porous surfaces."
            },
            "Епоксидні": {
                uk: "Двокомпонентні епоксидні фарби для скла, кераміки, металу. Висока хімічна стійкість та адгезія.",
                pl: "Dwuskładnikowe farby epoksydowe do szkła, ceramiki, metalu. Wysoka odporność chemiczna i przyczepność.",
                en: "Two-component epoxy inks for glass, ceramics, metal. High chemical resistance and adhesion."
            },
            "Інші": {
                uk: "Інші фарби, що не належать до стандартних категорій.",
                pl: "Inne farby, nie należące do standardowych kategorii.",
                en: "Other inks not belonging to standard categories."
            },
            "Additives": {
                uk: "Додатки для фарб: розчинники, сповільнювачі, затверджувачі, пасти, порошки, лаки тощо.",
                pl: "Dodatki do farb: rozcieńczalniki, opóźniacze, utwardzacze, pasty, proszki, lakiery itp.",
                en: "Ink additives: thinners, retarders, hardeners, pastes, powders, varnishes, etc."
            }
        };

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

        // ---------- СПЕЦІАЛЬНІ КОЛЬОРИ ----------
        const specialColors = {
            "60/146": { uk: "Вогненно-червоний", pl: "Ognista czerwień", en: "Fire red", color: "#E34234" },
            "61/163": { uk: "Темно-вогненно-червоний", pl: "Ciemna ognista czerwień", en: "Dark fire red", color: "#C41E3A" },
            "91Q": { uk: "Напівматова біла", pl: "Biała półmatowa", en: "Semi-matte white", color: "#F8F8FF" },
            "RG120": { uk: "Золото", pl: "Złoto", en: "Gold", color: "#FFD700" },
            "COOL GRAY 8": { uk: "Холодний сірий 8", pl: "Cool Gray 8", en: "Cool Gray 8", color: "#808080" },
            "COOL GRAY 11": { uk: "Холодний сірий 11", pl: "Cool Gray 11", en: "Cool Gray 11", color: "#A9A9A9" },
            "61/15": { uk: "Рубіновий червоний C", pl: "Rubin Red C", en: "Rubin Red C", color: "#E31B23" },
            "60/38": { uk: "Pantone 032C", pl: "Pantone 032C", en: "Pantone 032C", color: "#E31B23" },
            "56/7": { uk: "Теплий червоний C", pl: "Warm Red C", en: "Warm Red C", color: "#F93E3E" },
            "26/2": { uk: "Process Blue", pl: "Process Blue", en: "Process Blue", color: "#00BFFF" },
            "20/5": { uk: "Pantone 072C", pl: "Pantone 072C", en: "Pantone 072C", color: "#000080" },
            "7031": { uk: "Рубіновий червоний C", pl: "Rubin Red C", en: "Rubin Red C", color: "#E31B23" },
            "56/18": { uk: "Pantone 032C", pl: "Pantone 032C", en: "Pantone 032C", color: "#E31B23" },
            "56/12": { uk: "Теплий червоний", pl: "Warm Red", en: "Warm Red", color: "#F93E3E" },
            "26/25": { uk: "Process Blue", pl: "Process Blue", en: "Process Blue", color: "#00BFFF" },
            "2058": { uk: "Pantone 072C", pl: "Pantone 072C", en: "Pantone 072C", color: "#000080" },
            "91/W1": { uk: "Білий криючий", pl: "Biały kryjący", en: "Opaque White", color: "#F8F8FF" },
            "91 LED": { uk: "Білий криючий LED", pl: "Biały kryjący LED", en: "Opaque White LED", color: "#F8F8FF" },
            "90 LED": { uk: "Білий LED", pl: "Biały LED", en: "White LED", color: "#FFFFFF" },
            "110 LED": { uk: "Срібло LED", pl: "Srebro LED", en: "Silver LED", color: "#C0C0C0" },
            "150/56": { uk: "UV Bright", pl: "UV Bright", en: "UV Bright", color: "#FFFFFF" },
            "91 TV": { uk: "Білий густий", pl: "Biały gęsty", en: "Thick White", color: "#F8F8FF" },
            "91 MO": { uk: "Білий суперкриючий", pl: "Biały super kryjący", en: "Super opaque White", color: "#F8F8FF" },
            "110 MO": { uk: "Срібло криюче", pl: "Srebro kryjące", en: "Opaque Silver", color: "#C0C0C0" },
            "110/2": { uk: "Перламутрова біла", pl: "Biała perlista", en: "Pearlescent White", color: "#FFFFFF" },
            "120/48": { uk: "Золото Pantone 871 C", pl: "Złoto Pantone 871 C", en: "Gold Pantone 871 C", color: "#FFD700" },
            // Додаткові спеціальні коди можна додавати за потреби
        };

        // ---------- МАСИВ КОДІВ ФАРБ З EXCEL ----------
        const excelPaintCodes = [
            // SP
            { code: "SP23", seriesId: "SP", colorCode: "23" },
            { code: "SP91", seriesId: "SP", colorCode: "91" },
            { code: "SP90", seriesId: "SP", colorCode: "90" },
            { code: "SP82", seriesId: "SP", colorCode: "82" },
            { code: "SP81", seriesId: "SP", colorCode: "81" },
            { code: "SP80", seriesId: "SP", colorCode: "80" },
            { code: "SP75", seriesId: "SP", colorCode: "75" },
            { code: "SP75/13", seriesId: "SP", colorCode: "75/13" },
            { code: "SP70", seriesId: "SP", colorCode: "70" },
            { code: "SP65", seriesId: "SP", colorCode: "65" },
            { code: "SP61", seriesId: "SP", colorCode: "61" },
            { code: "SP60", seriesId: "SP", colorCode: "60" },
            { code: "SP56", seriesId: "SP", colorCode: "56" },
            { code: "SP55", seriesId: "SP", colorCode: "55" },
            { code: "SP51", seriesId: "SP", colorCode: "51" },
            { code: "SP50", seriesId: "SP", colorCode: "50" },
            { code: "SP42", seriesId: "SP", colorCode: "42" },
            { code: "SP41", seriesId: "SP", colorCode: "41" },
            { code: "SP40", seriesId: "SP", colorCode: "40" },
            { code: "SP35", seriesId: "SP", colorCode: "35" },
            { code: "SP33", seriesId: "SP", colorCode: "33" },
            { code: "SP32", seriesId: "SP", colorCode: "32" },
            { code: "SP31", seriesId: "SP", colorCode: "31" },
            { code: "SP30", seriesId: "SP", colorCode: "30" },
            { code: "SP27", seriesId: "SP", colorCode: "27" },
            { code: "SP26", seriesId: "SP", colorCode: "26" },
            { code: "SP26/42", seriesId: "SP", colorCode: "26/42" },
            { code: "SP25", seriesId: "SP", colorCode: "25" },
            { code: "SP24", seriesId: "SP", colorCode: "24" },
            { code: "SP22", seriesId: "SP", colorCode: "22" },
            { code: "SP20", seriesId: "SP", colorCode: "20" },
            { code: "SP20B", seriesId: "SP", colorCode: "20B" },
            { code: "SP20/18", seriesId: "SP", colorCode: "20/18" },
            { code: "SP15", seriesId: "SP", colorCode: "15" },
            { code: "SP143", seriesId: "SP", colorCode: "143" },
            { code: "SP142", seriesId: "SP", colorCode: "142" },
            { code: "SP141", seriesId: "SP", colorCode: "141" },
            { code: "SP140", seriesId: "SP", colorCode: "140" },
            { code: "SP136", seriesId: "SP", colorCode: "136" },
            { code: "SP135", seriesId: "SP", colorCode: "135" },
            { code: "SP134", seriesId: "SP", colorCode: "134" },
            { code: "SP133", seriesId: "SP", colorCode: "133" },
            { code: "SP132", seriesId: "SP", colorCode: "132" },
            { code: "SP130", seriesId: "SP", colorCode: "130" },
            { code: "SP120", seriesId: "SP", colorCode: "120" },
            { code: "SP110", seriesId: "SP", colorCode: "110" },
            { code: "SP10", seriesId: "SP", colorCode: "10" },
            { code: "SP100", seriesId: "SP", colorCode: "100" },
            // SX
            { code: "SX90", seriesId: "SX", colorCode: "90" },
            { code: "SX82", seriesId: "SX", colorCode: "82" },
            { code: "SX81", seriesId: "SX", colorCode: "81" },
            { code: "SX80", seriesId: "SX", colorCode: "80" },
            { code: "SX75", seriesId: "SX", colorCode: "75" },
            { code: "SX70", seriesId: "SX", colorCode: "70" },
            { code: "SX70/21", seriesId: "SX", colorCode: "70/21" },
            { code: "SX65", seriesId: "SX", colorCode: "65" },
            { code: "SX61", seriesId: "SX", colorCode: "61" },
            { code: "SX60", seriesId: "SX", colorCode: "60" },
            { code: "SX56", seriesId: "SX", colorCode: "56" },
            { code: "SX56/2", seriesId: "SX", colorCode: "56/2" },
            { code: "SX55", seriesId: "SX", colorCode: "55" },
            { code: "SX51", seriesId: "SX", colorCode: "51" },
            { code: "SX50", seriesId: "SX", colorCode: "50" },
            { code: "SX42", seriesId: "SX", colorCode: "42" },
            { code: "SX41", seriesId: "SX", colorCode: "41" },
            { code: "SX40", seriesId: "SX", colorCode: "40" },
            { code: "SX35", seriesId: "SX", colorCode: "35" },
            { code: "SX33", seriesId: "SX", colorCode: "33" },
            { code: "SX32", seriesId: "SX", colorCode: "32" },
            { code: "SX31", seriesId: "SX", colorCode: "31" },
            { code: "SX30", seriesId: "SX", colorCode: "30" },
            { code: "SX27", seriesId: "SX", colorCode: "27" },
            { code: "SX26", seriesId: "SX", colorCode: "26" },
            { code: "SX26/19", seriesId: "SX", colorCode: "26/19" },
            { code: "SX25", seriesId: "SX", colorCode: "25" },
            { code: "SX24", seriesId: "SX", colorCode: "24" },
            { code: "SX23", seriesId: "SX", colorCode: "23" },
            { code: "SX22", seriesId: "SX", colorCode: "22" },
            { code: "SX20", seriesId: "SX", colorCode: "20" },
            { code: "SX20/64", seriesId: "SX", colorCode: "20/64" },
            { code: "SX20/14", seriesId: "SX", colorCode: "20/14" },
            { code: "SX15", seriesId: "SX", colorCode: "15" },
            { code: "SX143", seriesId: "SX", colorCode: "143" },
            { code: "SX142", seriesId: "SX", colorCode: "142" },
            { code: "SX141", seriesId: "SX", colorCode: "141" },
            { code: "SX140", seriesId: "SX", colorCode: "140" },
            { code: "SX136", seriesId: "SX", colorCode: "136" },
            { code: "SX135", seriesId: "SX", colorCode: "135" },
            { code: "SX134", seriesId: "SX", colorCode: "134" },
            { code: "SX133", seriesId: "SX", colorCode: "133" },
            { code: "SX132", seriesId: "SX", colorCode: "132" },
            { code: "SX131", seriesId: "SX", colorCode: "131" },
            { code: "SX130", seriesId: "SX", colorCode: "130" },
            { code: "SX10", seriesId: "SX", colorCode: "10" },
            { code: "SX100", seriesId: "SX", colorCode: "100" },
            { code: "SX81/22", seriesId: "SX", colorCode: "81/22" },
            { code: "SX150", seriesId: "SX", colorCode: "150" },
            { code: "SXP COOL GRAY 11", seriesId: "SX", colorCode: "COOL GRAY 11" },
            // SI
            { code: "SI91", seriesId: "SI", colorCode: "91" },
            { code: "SI82", seriesId: "SI", colorCode: "82" },
            { code: "SI81", seriesId: "SI", colorCode: "81" },
            { code: "SI80", seriesId: "SI", colorCode: "80" },
            { code: "SI75", seriesId: "SI", colorCode: "75" },
            { code: "SI70", seriesId: "SI", colorCode: "70" },
            { code: "SI61", seriesId: "SI", colorCode: "61" },
            { code: "SI60", seriesId: "SI", colorCode: "60" },
            { code: "SI56", seriesId: "SI", colorCode: "56" },
            { code: "SI56/4", seriesId: "SI", colorCode: "56/4" },
            { code: "SI51", seriesId: "SI", colorCode: "51" },
            { code: "SI50", seriesId: "SI", colorCode: "50" },
            { code: "SI42", seriesId: "SI", colorCode: "42" },
            { code: "SI41", seriesId: "SI", colorCode: "41" },
            { code: "SI40", seriesId: "SI", colorCode: "40" },
            { code: "SI33", seriesId: "SI", colorCode: "33" },
            { code: "SI32", seriesId: "SI", colorCode: "32" },
            { code: "SI31", seriesId: "SI", colorCode: "31" },
            { code: "SI30", seriesId: "SI", colorCode: "30" },
            { code: "SI27", seriesId: "SI", colorCode: "27" },
            { code: "SI26", seriesId: "SI", colorCode: "26" },
            { code: "SI24", seriesId: "SI", colorCode: "24" },
            { code: "SI22", seriesId: "SI", colorCode: "22" },
            { code: "SI20", seriesId: "SI", colorCode: "20" },
            { code: "SI120", seriesId: "SI", colorCode: "120" },
            { code: "SI10", seriesId: "SI", colorCode: "10" },
            { code: "SI100", seriesId: "SI", colorCode: "100" },
            // OTF
            { code: "OTF91", seriesId: "OTF", colorCode: "91" },
            { code: "OTF91/37", seriesId: "OTF", colorCode: "91/37" },
            { code: "OTF81", seriesId: "OTF", colorCode: "81" },
            { code: "OTF80", seriesId: "OTF", colorCode: "80" },
            { code: "OTF75", seriesId: "OTF", colorCode: "75" },
            { code: "OTF70", seriesId: "OTF", colorCode: "70" },
            { code: "OTF70/56", seriesId: "OTF", colorCode: "70/56" },
            { code: "OTF65", seriesId: "OTF", colorCode: "65" },
            { code: "OTF61", seriesId: "OTF", colorCode: "61" },
            { code: "OTF60", seriesId: "OTF", colorCode: "60" },
            { code: "OTF56", seriesId: "OTF", colorCode: "56" },
            { code: "OTF56/7", seriesId: "OTF", colorCode: "56/7" },
            { code: "OTF55", seriesId: "OTF", colorCode: "55" },
            { code: "OTF51", seriesId: "OTF", colorCode: "51" },
            { code: "OTF50", seriesId: "OTF", colorCode: "50" },
            { code: "OTF42", seriesId: "OTF", colorCode: "42" },
            { code: "OTF41", seriesId: "OTF", colorCode: "41" },
            { code: "OTF40", seriesId: "OTF", colorCode: "40" },
            { code: "OTF33", seriesId: "OTF", colorCode: "33" },
            { code: "OTF32", seriesId: "OTF", colorCode: "32" },
            { code: "OTF31", seriesId: "OTF", colorCode: "31" },
            { code: "OTF30", seriesId: "OTF", colorCode: "30" },
            { code: "OTF27", seriesId: "OTF", colorCode: "27" },
            { code: "OTF26", seriesId: "OTF", colorCode: "26" },
            { code: "OTF25", seriesId: "OTF", colorCode: "25" },
            { code: "OTF24", seriesId: "OTF", colorCode: "24" },
            { code: "OTF22", seriesId: "OTF", colorCode: "22" },
            { code: "OTF20", seriesId: "OTF", colorCode: "20" },
            { code: "OTF20B", seriesId: "OTF", colorCode: "20B" },
            { code: "OTF20/11", seriesId: "OTF", colorCode: "20/11" },
            { code: "OTF15", seriesId: "OTF", colorCode: "15" },
            { code: "OTF150", seriesId: "OTF", colorCode: "150" },
            { code: "OTF150/15", seriesId: "OTF", colorCode: "150/15" },
            { code: "OTF138", seriesId: "OTF", colorCode: "138" },
            { code: "OTF135", seriesId: "OTF", colorCode: "135" },
            { code: "OTF134", seriesId: "OTF", colorCode: "134" },
            { code: "OTF132", seriesId: "OTF", colorCode: "132" },
            { code: "OTF130", seriesId: "OTF", colorCode: "130" },
            { code: "OTF120", seriesId: "OTF", colorCode: "120" },
            { code: "OTF110", seriesId: "OTF", colorCode: "110" },
            { code: "OTF110/15", seriesId: "OTF", colorCode: "110/15" },
            { code: "OTF110/14", seriesId: "OTF", colorCode: "110/14" },
            { code: "OTF10", seriesId: "OTF", colorCode: "10" },
            { code: "OTF100", seriesId: "OTF", colorCode: "100" },
            { code: "OTF26/74", seriesId: "OTF", colorCode: "26/74" },
            { code: "OTF20/108", seriesId: "OTF", colorCode: "20/108" },
            // AS
            { code: "AS91", seriesId: "AS", colorCode: "91" },
            { code: "AS90", seriesId: "AS", colorCode: "90" },
            { code: "AS82", seriesId: "AS", colorCode: "82" },
            { code: "AS81", seriesId: "AS", colorCode: "81" },
            { code: "AS70", seriesId: "AS", colorCode: "70" },
            { code: "AS61", seriesId: "AS", colorCode: "61" },
            { code: "AS61/63", seriesId: "AS", colorCode: "61/63" },
            { code: "AS61/34", seriesId: "AS", colorCode: "61/34" },
            { code: "AS60", seriesId: "AS", colorCode: "60" },
            { code: "AS56", seriesId: "AS", colorCode: "56" },
            { code: "AS51", seriesId: "AS", colorCode: "51" },
            { code: "AS50", seriesId: "AS", colorCode: "50" },
            { code: "AS42", seriesId: "AS", colorCode: "42" },
            { code: "AS41", seriesId: "AS", colorCode: "41" },
            { code: "AS40", seriesId: "AS", colorCode: "40" },
            { code: "AS33", seriesId: "AS", colorCode: "33" },
            { code: "AS32", seriesId: "AS", colorCode: "32" },
            { code: "AS31", seriesId: "AS", colorCode: "31" },
            { code: "AS30", seriesId: "AS", colorCode: "30" },
            { code: "AS27", seriesId: "AS", colorCode: "27" },
            { code: "AS26", seriesId: "AS", colorCode: "26" },
            { code: "AS26/10", seriesId: "AS", colorCode: "26/10" },
            { code: "AS24", seriesId: "AS", colorCode: "24" },
            { code: "AS22", seriesId: "AS", colorCode: "22" },
            { code: "AS20", seriesId: "AS", colorCode: "20" },
            { code: "AS20/78", seriesId: "AS", colorCode: "20/78" },
            { code: "AS20/53", seriesId: "AS", colorCode: "20/53" },
            { code: "AS143", seriesId: "AS", colorCode: "143" },
            { code: "AS142", seriesId: "AS", colorCode: "142" },
            { code: "AS141", seriesId: "AS", colorCode: "141" },
            { code: "AS140", seriesId: "AS", colorCode: "140" },
            { code: "AS138", seriesId: "AS", colorCode: "138" },
            { code: "AS136", seriesId: "AS", colorCode: "136" },
            { code: "AS135", seriesId: "AS", colorCode: "135" },
            { code: "AS134", seriesId: "AS", colorCode: "134" },
            { code: "AS133", seriesId: "AS", colorCode: "133" },
            { code: "AS132", seriesId: "AS", colorCode: "132" },
            { code: "AS131", seriesId: "AS", colorCode: "131" },
            { code: "AS130", seriesId: "AS", colorCode: "130" },
            { code: "AS120 RG", seriesId: "AS", colorCode: "120 RG" },
            { code: "AS110", seriesId: "AS", colorCode: "110" },
            { code: "AS10", seriesId: "AS", colorCode: "10" },
            { code: "AS100", seriesId: "AS", colorCode: "100" },
            // PLUV
            { code: "PPUV91/W1", seriesId: "PLUV", colorCode: "91/W1" },
            { code: "PLUV91", seriesId: "PLUV", colorCode: "91" },
            { code: "PLUV91/53", seriesId: "PLUV", colorCode: "91/53" },
            { code: "PLUV90", seriesId: "PLUV", colorCode: "90" },
            { code: "PLUV82", seriesId: "PLUV", colorCode: "82" },
            { code: "PLUV81", seriesId: "PLUV", colorCode: "81" },
            { code: "PLUV80", seriesId: "PLUV", colorCode: "80" },
            { code: "PLUV75", seriesId: "PLUV", colorCode: "75" },
            { code: "PLUV70", seriesId: "PLUV", colorCode: "70" },
            { code: "PLUV65", seriesId: "PLUV", colorCode: "65" },
            { code: "PLUV61", seriesId: "PLUV", colorCode: "61" },
            { code: "PLUV61/15", seriesId: "PLUV", colorCode: "61/15" },
            { code: "PLUV60", seriesId: "PLUV", colorCode: "60" },
            { code: "PLUV60C", seriesId: "PLUV", colorCode: "60C" },
            { code: "PLUV60/6", seriesId: "PLUV", colorCode: "60/6" },
            { code: "PLUV56", seriesId: "PLUV", colorCode: "56" },
            { code: "PLUV55", seriesId: "PLUV", colorCode: "55" },
            { code: "PLUV51", seriesId: "PLUV", colorCode: "51" },
            { code: "PLUV51/39", seriesId: "PLUV", colorCode: "51/39" },
            { code: "PLUV50", seriesId: "PLUV", colorCode: "50" },
            { code: "PLUV42", seriesId: "PLUV", colorCode: "42" },
            { code: "PLUV42/42", seriesId: "PLUV", colorCode: "42/42" },
            { code: "PLUV42/40", seriesId: "PLUV", colorCode: "42/40" },
            { code: "PLUV41", seriesId: "PLUV", colorCode: "41" },
            { code: "PLUV40", seriesId: "PLUV", colorCode: "40" },
            { code: "PLUV35", seriesId: "PLUV", colorCode: "35" },
            { code: "PLUV33", seriesId: "PLUV", colorCode: "33" },
            { code: "PLUV32", seriesId: "PLUV", colorCode: "32" },
            { code: "PLUV32/77", seriesId: "PLUV", colorCode: "32/77" },
            { code: "PLUV31", seriesId: "PLUV", colorCode: "31" },
            { code: "PLUV31/26", seriesId: "PLUV", colorCode: "31/26" },
            { code: "PLUV30", seriesId: "PLUV", colorCode: "30" },
            { code: "PLUV27", seriesId: "PLUV", colorCode: "27" },
            { code: "PLUV26", seriesId: "PLUV", colorCode: "26" },
            { code: "PLUV26/5", seriesId: "PLUV", colorCode: "26/5" },
            { code: "PLUV2627", seriesId: "PLUV", colorCode: "2627" },
            { code: "PLUV25", seriesId: "PLUV", colorCode: "25" },
            { code: "PLUV24", seriesId: "PLUV", colorCode: "24" },
            { code: "PLUV24/21", seriesId: "PLUV", colorCode: "24/21" },
            { code: "PLUV24/10", seriesId: "PLUV", colorCode: "24/10" },
            { code: "PLUV23", seriesId: "PLUV", colorCode: "23" },
            { code: "PLUV22", seriesId: "PLUV", colorCode: "22" },
            { code: "PLUV20", seriesId: "PLUV", colorCode: "20" },
            { code: "PLUV20B", seriesId: "PLUV", colorCode: "20B" },
            { code: "PLUV20/92", seriesId: "PLUV", colorCode: "20/92" },
            { code: "PLUV20/77", seriesId: "PLUV", colorCode: "20/77" },
            { code: "PLUV20/5", seriesId: "PLUV", colorCode: "20/5" },
            { code: "PLUV20/10", seriesId: "PLUV", colorCode: "20/10" },
            { code: "PLUV15", seriesId: "PLUV", colorCode: "15" },
            { code: "PLUV150/56", seriesId: "PLUV", colorCode: "150/56" },
            { code: "PLUV143", seriesId: "PLUV", colorCode: "143" },
            { code: "PLUV142", seriesId: "PLUV", colorCode: "142" },
            { code: "PLUV141", seriesId: "PLUV", colorCode: "141" },
            { code: "PLUV140", seriesId: "PLUV", colorCode: "140" },
            { code: "PLUV138", seriesId: "PLUV", colorCode: "138" },
            { code: "PLUV136", seriesId: "PLUV", colorCode: "136" },
            { code: "PLUV135", seriesId: "PLUV", colorCode: "135" },
            { code: "PLUV134", seriesId: "PLUV", colorCode: "134" },
            { code: "PLUV134/12", seriesId: "PLUV", colorCode: "134/12" },
            { code: "PLUV133", seriesId: "PLUV", colorCode: "133" },
            { code: "PLUV132", seriesId: "PLUV", colorCode: "132" },
            { code: "PLUV131", seriesId: "PLUV", colorCode: "131" },
            { code: "PLUV130", seriesId: "PLUV", colorCode: "130" },
            { code: "PLUV120", seriesId: "PLUV", colorCode: "120" },
            { code: "PLUV110", seriesId: "PLUV", colorCode: "110" },
            { code: "PLUV10", seriesId: "PLUV", colorCode: "10" },
            { code: "PLUV100", seriesId: "PLUV", colorCode: "100" },
            // PLUV LED
            { code: "PLUV91 LED", seriesId: "PLUV_LED", colorCode: "91 LED" },
            { code: "PLUV90 LED", seriesId: "PLUV_LED", colorCode: "90 LED" },
            { code: "PLUV82 LED", seriesId: "PLUV_LED", colorCode: "82 LED" },
            { code: "PLUV81 LED", seriesId: "PLUV_LED", colorCode: "81 LED" },
            { code: "PLUV80 LED", seriesId: "PLUV_LED", colorCode: "80 LED" },
            { code: "PLUV75 LED", seriesId: "PLUV_LED", colorCode: "75 LED" },
            { code: "PLUV70 LED", seriesId: "PLUV_LED", colorCode: "70 LED" },
            { code: "PLUV65 LED", seriesId: "PLUV_LED", colorCode: "65 LED" },
            { code: "PLUV61 LED", seriesId: "PLUV_LED", colorCode: "61 LED" },
            { code: "PLUV61/15 LED", seriesId: "PLUV_LED", colorCode: "61/15 LED" },
            { code: "PLUV60 LED", seriesId: "PLUV_LED", colorCode: "60 LED" },
            { code: "PLUV60/6 LED", seriesId: "PLUV_LED", colorCode: "60/6 LED" },
            { code: "PLUV56 LED", seriesId: "PLUV_LED", colorCode: "56 LED" },
            { code: "PLUV55 LED", seriesId: "PLUV_LED", colorCode: "55 LED" },
            { code: "PLUV51 LED", seriesId: "PLUV_LED", colorCode: "51 LED" },
            { code: "PLUV50 LED", seriesId: "PLUV_LED", colorCode: "50 LED" },
            { code: "PLUV42 LED", seriesId: "PLUV_LED", colorCode: "42 LED" },
            { code: "PLUV42/42 LED", seriesId: "PLUV_LED", colorCode: "42/42 LED" },
            { code: "PLUV42/40 LED", seriesId: "PLUV_LED", colorCode: "42/40 LED" },
            { code: "PLUV41 LED", seriesId: "PLUV_LED", colorCode: "41 LED" },
            { code: "PLUV40 LED", seriesId: "PLUV_LED", colorCode: "40 LED" },
            { code: "PLUV35 LED", seriesId: "PLUV_LED", colorCode: "35 LED" },
            { code: "PLUV33 LED", seriesId: "PLUV_LED", colorCode: "33 LED" },
            { code: "PLUV32 LED", seriesId: "PLUV_LED", colorCode: "32 LED" },
            { code: "PLUV31 LED", seriesId: "PLUV_LED", colorCode: "31 LED" },
            { code: "PLUV30 LED", seriesId: "PLUV_LED", colorCode: "30 LED" },
            { code: "PLUV27 LED", seriesId: "PLUV_LED", colorCode: "27 LED" },
            { code: "PLUV26 LED", seriesId: "PLUV_LED", colorCode: "26 LED" },
            { code: "PLUV26/5 LED", seriesId: "PLUV_LED", colorCode: "26/5 LED" },
            { code: "PLUV25 LED", seriesId: "PLUV_LED", colorCode: "25 LED" },
            { code: "PLUV24 LED", seriesId: "PLUV_LED", colorCode: "24 LED" },
            { code: "PLUV23 LED", seriesId: "PLUV_LED", colorCode: "23 LED" },
            { code: "PLUV22 LED", seriesId: "PLUV_LED", colorCode: "22 LED" },
            { code: "PLUV20 LED", seriesId: "PLUV_LED", colorCode: "20 LED" },
            { code: "PLUV20/5 LED", seriesId: "PLUV_LED", colorCode: "20/5 LED" },
            { code: "PLUV20/10 LED", seriesId: "PLUV_LED", colorCode: "20/10 LED" },
            { code: "PLUV15 LED", seriesId: "PLUV_LED", colorCode: "15 LED" },
            { code: "PLUV110 LED", seriesId: "PLUV_LED", colorCode: "110 LED" },
            { code: "PLUV10 LED", seriesId: "PLUV_LED", colorCode: "10 LED" },
            { code: "PLUV100 LED", seriesId: "PLUV_LED", colorCode: "100 LED" },
            // UV
            { code: "UV110/8", seriesId: "UV", colorCode: "110/8" },
            { code: "UV150/122", seriesId: "UV", colorCode: "150/122" },
            { code: "UV150/62", seriesId: "UV", colorCode: "150/62" },
            { code: "UV150/51", seriesId: "UV", colorCode: "150/51" },
            { code: "UV150/129", seriesId: "UV", colorCode: "150/129" },
            // SB
            { code: "SB91/2", seriesId: "SB", colorCode: "91/2" },
            { code: "SB120/7", seriesId: "SB", colorCode: "120/7" },
            { code: "SB110/2", seriesId: "SB", colorCode: "110/2" },
            { code: "SB100/7", seriesId: "SB", colorCode: "100/7" },
            // TPP
            { code: "TPP91", seriesId: "TPP", colorCode: "91" },
            { code: "TPP90", seriesId: "TPP", colorCode: "90" },
            { code: "TPP82", seriesId: "TPP", colorCode: "82" },
            { code: "TPP81", seriesId: "TPP", colorCode: "81" },
            { code: "TPP80", seriesId: "TPP", colorCode: "80" },
            { code: "TPP75", seriesId: "TPP", colorCode: "75" },
            { code: "TPP65", seriesId: "TPP", colorCode: "65" },
            { code: "TPP61", seriesId: "TPP", colorCode: "61" },
            { code: "TPP61/58", seriesId: "TPP", colorCode: "61/58" },
            { code: "TPP60", seriesId: "TPP", colorCode: "60" },
            { code: "TPP56", seriesId: "TPP", colorCode: "56" },
            { code: "TPP51", seriesId: "TPP", colorCode: "51" },
            { code: "TPP51/56", seriesId: "TPP", colorCode: "51/56" },
            { code: "TPP42", seriesId: "TPP", colorCode: "42" },
            { code: "TPP41", seriesId: "TPP", colorCode: "41" },
            { code: "TPP40", seriesId: "TPP", colorCode: "40" },
            { code: "TPP35", seriesId: "TPP", colorCode: "35" },
            { code: "TPP33", seriesId: "TPP", colorCode: "33" },
            { code: "TPP32", seriesId: "TPP", colorCode: "32" },
            { code: "TPP31", seriesId: "TPP", colorCode: "31" },
            { code: "TPP30", seriesId: "TPP", colorCode: "30" },
            { code: "TPP26", seriesId: "TPP", colorCode: "26" },
            { code: "TPP26/76", seriesId: "TPP", colorCode: "26/76" },
            { code: "TPP25", seriesId: "TPP", colorCode: "25" },
            { code: "TPP24", seriesId: "TPP", colorCode: "24" },
            { code: "TPP23", seriesId: "TPP", colorCode: "23" },
            { code: "TPP20", seriesId: "TPP", colorCode: "20" },
            { code: "TPP20/B", seriesId: "TPP", colorCode: "20/B" },
            { code: "TPP20/16", seriesId: "TPP", colorCode: "20/16" },
            { code: "TPP20/149", seriesId: "TPP", colorCode: "20/149" },
            { code: "TPP15", seriesId: "TPP", colorCode: "15" },
            { code: "TPP150", seriesId: "TPP", colorCode: "150" },
            { code: "TPP143", seriesId: "TPP", colorCode: "143" },
            { code: "TPP141", seriesId: "TPP", colorCode: "141" },
            { code: "TPP140", seriesId: "TPP", colorCode: "140" },
            { code: "TPP120", seriesId: "TPP", colorCode: "120" },
            { code: "TPP110", seriesId: "TPP", colorCode: "110" },
            { code: "TPP10", seriesId: "TPP", colorCode: "10" },
            { code: "TPP100", seriesId: "TPP", colorCode: "100" },
            // SPTN
            { code: "SPTNP61/15", seriesId: "SPTN", colorCode: "P61/15" },
            { code: "SPTN91/F", seriesId: "SPTN", colorCode: "91/F" },
            { code: "SPTN91/61", seriesId: "SPTN", colorCode: "91/61" },
            { code: "SPTN91/1", seriesId: "SPTN", colorCode: "91/1" },
            { code: "SPTN82", seriesId: "SPTN", colorCode: "82" },
            { code: "SPTN81", seriesId: "SPTN", colorCode: "81" },
            { code: "SPTN80", seriesId: "SPTN", colorCode: "80" },
            { code: "SPTN75", seriesId: "SPTN", colorCode: "75" },
            { code: "SPTN75M", seriesId: "SPTN", colorCode: "75M" },
            { code: "SPTN70", seriesId: "SPTN", colorCode: "70" },
            { code: "SPTN70/36", seriesId: "SPTN", colorCode: "70/36" },
            { code: "SPTN65M", seriesId: "SPTN", colorCode: "65M" },
            { code: "SPTN61", seriesId: "SPTN", colorCode: "61" },
            { code: "SPTN60", seriesId: "SPTN", colorCode: "60" },
            { code: "SPTN60/PV", seriesId: "SPTN", colorCode: "60/PV" },
            { code: "SPTN60/12", seriesId: "SPTN", colorCode: "60/12" },
            { code: "SPTN56", seriesId: "SPTN", colorCode: "56" },
            { code: "SPTN55", seriesId: "SPTN", colorCode: "55" },
            { code: "SPTN55M", seriesId: "SPTN", colorCode: "55M" },
            { code: "SPTN51", seriesId: "SPTN", colorCode: "51" },
            { code: "SPTN50", seriesId: "SPTN", colorCode: "50" },
            { code: "SPTN42", seriesId: "SPTN", colorCode: "42" },
            { code: "SPTN41", seriesId: "SPTN", colorCode: "41" },
            { code: "SPTN40", seriesId: "SPTN", colorCode: "40" },
            { code: "SPTN35", seriesId: "SPTN", colorCode: "35" },
            { code: "SPTN35M", seriesId: "SPTN", colorCode: "35M" },
            { code: "SPTN33", seriesId: "SPTN", colorCode: "33" },
            { code: "SPTN32", seriesId: "SPTN", colorCode: "32" },
            { code: "SPTN31", seriesId: "SPTN", colorCode: "31" },
            { code: "SPTN31/31", seriesId: "SPTN", colorCode: "31/31" },
            { code: "SPTN30", seriesId: "SPTN", colorCode: "30" },
            { code: "SPTN27", seriesId: "SPTN", colorCode: "27" },
            { code: "SPTN26", seriesId: "SPTN", colorCode: "26" },
            { code: "SPTN26/20", seriesId: "SPTN", colorCode: "26/20" },
            { code: "SPTN25M", seriesId: "SPTN", colorCode: "25M" },
            { code: "SPTN24", seriesId: "SPTN", colorCode: "24" },
            { code: "SPTN23M", seriesId: "SPTN", colorCode: "23M" },
            { code: "SPTN22", seriesId: "SPTN", colorCode: "22" },
            { code: "SPTN20", seriesId: "SPTN", colorCode: "20" },
            { code: "SPTN20B", seriesId: "SPTN", colorCode: "20B" },
            { code: "SPTN20/43", seriesId: "SPTN", colorCode: "20/43" },
            { code: "SPTN15", seriesId: "SPTN", colorCode: "15" },
            { code: "SPTN15M", seriesId: "SPTN", colorCode: "15M" },
            { code: "SPTN150/17", seriesId: "SPTN", colorCode: "150/17" },
            { code: "SPTN143", seriesId: "SPTN", colorCode: "143" },
            { code: "SPTN142", seriesId: "SPTN", colorCode: "142" },
            { code: "SPTN141", seriesId: "SPTN", colorCode: "141" },
            { code: "SPTN140", seriesId: "SPTN", colorCode: "140" },
            { code: "SPTN138", seriesId: "SPTN", colorCode: "138" },
            { code: "SPTN138/2", seriesId: "SPTN", colorCode: "138/2" },
            { code: "SPTN137", seriesId: "SPTN", colorCode: "137" },
            { code: "SPTN136", seriesId: "SPTN", colorCode: "136" },
            { code: "SPTN135", seriesId: "SPTN", colorCode: "135" },
            { code: "SPTN134", seriesId: "SPTN", colorCode: "134" },
            { code: "SPTN133", seriesId: "SPTN", colorCode: "133" },
            { code: "SPTN132", seriesId: "SPTN", colorCode: "132" },
            { code: "SPTN131", seriesId: "SPTN", colorCode: "131" },
            { code: "SPTN130", seriesId: "SPTN", colorCode: "130" },
            { code: "SPTN120", seriesId: "SPTN", colorCode: "120" },
            { code: "SPTN120/33", seriesId: "SPTN", colorCode: "120/33" },
            { code: "SPTN110", seriesId: "SPTN", colorCode: "110" },
            { code: "SPTN110/13", seriesId: "SPTN", colorCode: "110/13" },
            { code: "SPTN10", seriesId: "SPTN", colorCode: "10" },
            { code: "SPTN100", seriesId: "SPTN", colorCode: "100" },
            // SN
            { code: "SN91", seriesId: "SN", colorCode: "91" },
            { code: "SN90", seriesId: "SN", colorCode: "90" },
            { code: "SN82", seriesId: "SN", colorCode: "82" },
            { code: "SN81", seriesId: "SN", colorCode: "81" },
            { code: "SN80", seriesId: "SN", colorCode: "80" },
            { code: "SN75", seriesId: "SN", colorCode: "75" },
            { code: "SN70", seriesId: "SN", colorCode: "70" },
            { code: "SN70/7", seriesId: "SN", colorCode: "70/7" },
            { code: "SN65", seriesId: "SN", colorCode: "65" },
            { code: "SN61", seriesId: "SN", colorCode: "61" },
            { code: "SN60", seriesId: "SN", colorCode: "60" },
            { code: "SN56", seriesId: "SN", colorCode: "56" },
            { code: "SN55", seriesId: "SN", colorCode: "55" },
            { code: "SN51", seriesId: "SN", colorCode: "51" },
            { code: "SN50", seriesId: "SN", colorCode: "50" },
            { code: "SN42", seriesId: "SN", colorCode: "42" },
            { code: "SN41", seriesId: "SN", colorCode: "41" },
            { code: "SN40", seriesId: "SN", colorCode: "40" },
            { code: "SN35", seriesId: "SN", colorCode: "35" },
            { code: "SN33", seriesId: "SN", colorCode: "33" },
            { code: "SN32", seriesId: "SN", colorCode: "32" },
            { code: "SN31", seriesId: "SN", colorCode: "31" },
            { code: "SN30", seriesId: "SN", colorCode: "30" },
            { code: "SN27", seriesId: "SN", colorCode: "27" },
            { code: "SN26", seriesId: "SN", colorCode: "26" },
            { code: "SN26/7", seriesId: "SN", colorCode: "26/7" },
            { code: "SN25", seriesId: "SN", colorCode: "25" },
            { code: "SN24", seriesId: "SN", colorCode: "24" },
            { code: "SN22", seriesId: "SN", colorCode: "22" },
            { code: "SN20", seriesId: "SN", colorCode: "20" },
            { code: "SN20/B", seriesId: "SN", colorCode: "20/B" },
            { code: "SN15", seriesId: "SN", colorCode: "15" },
            { code: "SN150", seriesId: "SN", colorCode: "150" },
            { code: "SN143", seriesId: "SN", colorCode: "143" },
            { code: "SN142", seriesId: "SN", colorCode: "142" },
            { code: "SN141", seriesId: "SN", colorCode: "141" },
            { code: "SN140", seriesId: "SN", colorCode: "140" },
            { code: "SN135", seriesId: "SN", colorCode: "135" },
            { code: "SN133", seriesId: "SN", colorCode: "133" },
            { code: "SN132", seriesId: "SN", colorCode: "132" },
            { code: "SN131", seriesId: "SN", colorCode: "131" },
            { code: "SN130", seriesId: "SN", colorCode: "130" },
            { code: "SN120", seriesId: "SN", colorCode: "120" },
            { code: "SN110", seriesId: "SN", colorCode: "110" },
            { code: "SN10", seriesId: "SN", colorCode: "10" },
            { code: "SN100", seriesId: "SN", colorCode: "100" },
            // QS
            { code: "QS91", seriesId: "QS", colorCode: "91" },
            { code: "QS150", seriesId: "QS", colorCode: "150" },
            { code: "QS100", seriesId: "QS", colorCode: "100" },
            // PX
            { code: "PX91", seriesId: "PX", colorCode: "91" },
            { code: "PX90", seriesId: "PX", colorCode: "90" },
            { code: "PX60", seriesId: "PX", colorCode: "60" },
            { code: "PX42", seriesId: "PX", colorCode: "42" },
            { code: "PX24", seriesId: "PX", colorCode: "24" },
            { code: "PX22", seriesId: "PX", colorCode: "22" },
            { code: "PX150", seriesId: "PX", colorCode: "150" },
            { code: "PX143", seriesId: "PX", colorCode: "143" },
            { code: "PX142", seriesId: "PX", colorCode: "142" },
            { code: "PX141", seriesId: "PX", colorCode: "141" },
            { code: "PX140", seriesId: "PX", colorCode: "140" },
            { code: "PX110", seriesId: "PX", colorCode: "110" },
            { code: "PX100", seriesId: "PX", colorCode: "100" },
            // NST
            { code: "NST91", seriesId: "NST", colorCode: "91" },
            { code: "NST61", seriesId: "NST", colorCode: "61" },
            { code: "NST60", seriesId: "NST", colorCode: "60" },
            { code: "NST51", seriesId: "NST", colorCode: "51" },
            { code: "NST42", seriesId: "NST", colorCode: "42" },
            { code: "NST41", seriesId: "NST", colorCode: "41" },
            { code: "NST40", seriesId: "NST", colorCode: "40" },
            { code: "NST35", seriesId: "NST", colorCode: "35" },
            { code: "NST22", seriesId: "NST", colorCode: "22" },
            { code: "NST20", seriesId: "NST", colorCode: "20" },
            { code: "NST160", seriesId: "NST", colorCode: "160" },
            { code: "NST15", seriesId: "NST", colorCode: "15" },
            { code: "NST143", seriesId: "NST", colorCode: "143" },
            { code: "NST142", seriesId: "NST", colorCode: "142" },
            { code: "NST141", seriesId: "NST", colorCode: "141" },
            { code: "NST140", seriesId: "NST", colorCode: "140" },
            { code: "NST120", seriesId: "NST", colorCode: "120" },
            { code: "NST110 REFLECTIVE", seriesId: "NST", colorCode: "110 REF" },
            { code: "NST110", seriesId: "NST", colorCode: "110" },
            // ECVF
            { code: "ECVF91", seriesId: "ECVF", colorCode: "91" },
            { code: "ECVF90", seriesId: "ECVF", colorCode: "90" },
            { code: "ECVF60", seriesId: "ECVF", colorCode: "60" },
            { code: "ECVF41", seriesId: "ECVF", colorCode: "41" },
            { code: "ECVF20", seriesId: "ECVF", colorCode: "20" },
            { code: "ECVF120", seriesId: "ECVF", colorCode: "120" },
            { code: "ECVF110", seriesId: "ECVF", colorCode: "110" },
            { code: "ECVF100", seriesId: "ECVF", colorCode: "100" },
            // EC (включно з ECP, ECG)
            { code: "ECP COOL GRAY 8", seriesId: "EC", colorCode: "COOL GRAY 8" },
            { code: "ECP61/15", seriesId: "EC", colorCode: "61/15" },
            { code: "ECP60/38", seriesId: "EC", colorCode: "60/38" },
            { code: "ECP56/7", seriesId: "EC", colorCode: "56/7" },
            { code: "ECP26/2", seriesId: "EC", colorCode: "26/2" },
            { code: "ECP20/5", seriesId: "EC", colorCode: "20/5" },
            { code: "ECG91", seriesId: "EC", colorCode: "91" },
            { code: "ECG61", seriesId: "EC", colorCode: "61" },
            { code: "ECG56", seriesId: "EC", colorCode: "56" },
            { code: "ECG41", seriesId: "EC", colorCode: "41" },
            { code: "ECG40", seriesId: "EC", colorCode: "40" },
            { code: "ECG24", seriesId: "EC", colorCode: "24" },
            { code: "EC91 TV", seriesId: "EC", colorCode: "91 TV" },
            { code: "EC91 MORE OPAQUE", seriesId: "EC", colorCode: "91 MO" },
            { code: "EC91", seriesId: "EC", colorCode: "91" },
            { code: "EC90", seriesId: "EC", colorCode: "90" },
            { code: "EC82", seriesId: "EC", colorCode: "82" },
            { code: "EC81", seriesId: "EC", colorCode: "81" },
            { code: "EC80", seriesId: "EC", colorCode: "80" },
            { code: "EC75", seriesId: "EC", colorCode: "75" },
            { code: "EC70", seriesId: "EC", colorCode: "70" },
            { code: "EC70/207", seriesId: "EC", colorCode: "70/207" },
            { code: "EC65", seriesId: "EC", colorCode: "65" },
            { code: "EC61", seriesId: "EC", colorCode: "61" },
            { code: "EC61/196", seriesId: "EC", colorCode: "61/196" },
            { code: "EC61/15", seriesId: "EC", colorCode: "61/15" },
            { code: "EC60", seriesId: "EC", colorCode: "60" },
            { code: "EC60/87", seriesId: "EC", colorCode: "60/87" },
            { code: "EC56", seriesId: "EC", colorCode: "56" },
            { code: "EC55", seriesId: "EC", colorCode: "55" },
            { code: "EC51", seriesId: "EC", colorCode: "51" },
            { code: "EC50", seriesId: "EC", colorCode: "50" },
            { code: "EC50/74", seriesId: "EC", colorCode: "50/74" },
            { code: "EC42", seriesId: "EC", colorCode: "42" },
            { code: "EC41", seriesId: "EC", colorCode: "41" },
            { code: "EC40", seriesId: "EC", colorCode: "40" },
            { code: "EC35", seriesId: "EC", colorCode: "35" },
            { code: "EC33", seriesId: "EC", colorCode: "33" },
            { code: "EC32", seriesId: "EC", colorCode: "32" },
            { code: "EC31", seriesId: "EC", colorCode: "31" },
            { code: "EC30", seriesId: "EC", colorCode: "30" },
            { code: "EC27", seriesId: "EC", colorCode: "27" },
            { code: "EC26", seriesId: "EC", colorCode: "26" },
            { code: "EC25", seriesId: "EC", colorCode: "25" },
            { code: "EC24", seriesId: "EC", colorCode: "24" },
            { code: "EC24/213", seriesId: "EC", colorCode: "24/213" },
            { code: "EC23", seriesId: "EC", colorCode: "23" },
            { code: "EC22", seriesId: "EC", colorCode: "22" },
            { code: "EC20", seriesId: "EC", colorCode: "20" },
            { code: "EC20/B", seriesId: "EC", colorCode: "20/B" },
            { code: "EC15", seriesId: "EC", colorCode: "15" },
            { code: "EC143", seriesId: "EC", colorCode: "143" },
            { code: "EC142/2", seriesId: "EC", colorCode: "142/2" },
            { code: "EC141", seriesId: "EC", colorCode: "141" },
            { code: "EC140", seriesId: "EC", colorCode: "140" },
            { code: "EC138", seriesId: "EC", colorCode: "138" },
            { code: "EC137", seriesId: "EC", colorCode: "137" },
            { code: "EC137/3", seriesId: "EC", colorCode: "137/3" },
            { code: "EC136", seriesId: "EC", colorCode: "136" },
            { code: "EC135", seriesId: "EC", colorCode: "135" },
            { code: "EC134", seriesId: "EC", colorCode: "134" },
            { code: "EC133", seriesId: "EC", colorCode: "133" },
            { code: "EC132", seriesId: "EC", colorCode: "132" },
            { code: "EC131", seriesId: "EC", colorCode: "131" },
            { code: "EC130", seriesId: "EC", colorCode: "130" },
            { code: "EC120", seriesId: "EC", colorCode: "120" },
            { code: "EC120/48", seriesId: "EC", colorCode: "120/48" },
            { code: "EC110 MORE OPAQUE", seriesId: "EC", colorCode: "110 MO" },
            { code: "EC110", seriesId: "EC", colorCode: "110" },
            { code: "EC110/2", seriesId: "EC", colorCode: "110/2" },
            { code: "EC10", seriesId: "EC", colorCode: "10" },
            { code: "EC10/154", seriesId: "EC", colorCode: "10/154" },
            { code: "EC100", seriesId: "EC", colorCode: "100" },
            { code: "EC100/458", seriesId: "EC", colorCode: "100/458" },
            // CF (включно з CFP)
            { code: "CFP7031", seriesId: "CF", colorCode: "7031" },
            { code: "CFP56/18", seriesId: "CF", colorCode: "56/18" },
            { code: "CFP56/12", seriesId: "CF", colorCode: "56/12" },
            { code: "CFP26/25", seriesId: "CF", colorCode: "26/25" },
            { code: "CFP2058", seriesId: "CF", colorCode: "2058" },
            { code: "CF91", seriesId: "CF", colorCode: "91" },
            { code: "CF90", seriesId: "CF", colorCode: "90" },
            { code: "CF82", seriesId: "CF", colorCode: "82" },
            { code: "CF81", seriesId: "CF", colorCode: "81" },
            { code: "CF80", seriesId: "CF", colorCode: "80" },
            { code: "CF75", seriesId: "CF", colorCode: "75" },
            { code: "CF70", seriesId: "CF", colorCode: "70" },
            { code: "CF70/151", seriesId: "CF", colorCode: "70/151" },
            { code: "CF65", seriesId: "CF", colorCode: "65" },
            { code: "CF61", seriesId: "CF", colorCode: "61" },
            { code: "CF61/106", seriesId: "CF", colorCode: "61/106" },
            { code: "CF61/105", seriesId: "CF", colorCode: "61/105" },
            { code: "CF60", seriesId: "CF", colorCode: "60" },
            { code: "CF56", seriesId: "CF", colorCode: "56" },
            { code: "CF56/86", seriesId: "CF", colorCode: "56/86" },
            { code: "CF55", seriesId: "CF", colorCode: "55" },
            { code: "CF51", seriesId: "CF", colorCode: "51" },
            { code: "CF50", seriesId: "CF", colorCode: "50" },
            { code: "CF50/44", seriesId: "CF", colorCode: "50/44" },
            { code: "CF42", seriesId: "CF", colorCode: "42" },
            { code: "CF42/156", seriesId: "CF", colorCode: "42/156" },
            { code: "CF42/155", seriesId: "CF", colorCode: "42/155" },
            { code: "CF41", seriesId: "CF", colorCode: "41" },
            { code: "CF40", seriesId: "CF", colorCode: "40" },
            { code: "CF40/48", seriesId: "CF", colorCode: "40/48" },
            { code: "CF35", seriesId: "CF", colorCode: "35" },
            { code: "CF33", seriesId: "CF", colorCode: "33" },
            { code: "CF32", seriesId: "CF", colorCode: "32" },
            { code: "CF31", seriesId: "CF", colorCode: "31" },
            { code: "CF31/92", seriesId: "CF", colorCode: "31/92" },
            { code: "CF30", seriesId: "CF", colorCode: "30" },
            { code: "CF27", seriesId: "CF", colorCode: "27" },
            { code: "CF27/103", seriesId: "CF", colorCode: "27/103" },
            { code: "CF26", seriesId: "CF", colorCode: "26" },
            { code: "CF25", seriesId: "CF", colorCode: "25" },
            { code: "CF24", seriesId: "CF", colorCode: "24" },
            { code: "CF24/116", seriesId: "CF", colorCode: "24/116" },
            { code: "CF24/115", seriesId: "CF", colorCode: "24/115" },
            { code: "CF23", seriesId: "CF", colorCode: "23" },
            { code: "CF22", seriesId: "CF", colorCode: "22" },
            { code: "CF20", seriesId: "CF", colorCode: "20" },
            { code: "CF20/B", seriesId: "CF", colorCode: "20/B" },
            { code: "CF20/205", seriesId: "CF", colorCode: "20/205" },
            { code: "CF20/204", seriesId: "CF", colorCode: "20/204" },
            { code: "CF20/203", seriesId: "CF", colorCode: "20/203" },
            { code: "CF20/17", seriesId: "CF", colorCode: "20/17" },
            { code: "CF15", seriesId: "CF", colorCode: "15" },
            { code: "CF143", seriesId: "CF", colorCode: "143" },
            { code: "CF142", seriesId: "CF", colorCode: "142" },
            { code: "CF141", seriesId: "CF", colorCode: "141" },
            { code: "CF140", seriesId: "CF", colorCode: "140" },
            { code: "CF136", seriesId: "CF", colorCode: "136" },
            { code: "CF135", seriesId: "CF", colorCode: "135" },
            { code: "CF134", seriesId: "CF", colorCode: "134" },
            { code: "CF133", seriesId: "CF", colorCode: "133" },
            { code: "CF132", seriesId: "CF", colorCode: "132" },
            { code: "CF131", seriesId: "CF", colorCode: "131" },
            { code: "CF130", seriesId: "CF", colorCode: "130" },
            { code: "CF120", seriesId: "CF", colorCode: "120" },
            { code: "CF120/52", seriesId: "CF", colorCode: "120/52" },
            { code: "CF120/47", seriesId: "CF", colorCode: "120/47" },
            { code: "CF110", seriesId: "CF", colorCode: "110" },
            { code: "CF10", seriesId: "CF", colorCode: "10" },
            { code: "CF10/88", seriesId: "CF", colorCode: "10/88" },
            { code: "CF100", seriesId: "CF", colorCode: "100" },
            // Інші фарби (категорія "Інші")
            { code: "S20 WHITE", seriesId: "OTHER", colorCode: "WHITE", seriesName: { uk: "S20", pl: "S20", en: "S20" }, category: "Інші" },
            { code: "MTR 65/HD", seriesId: "MTR", colorCode: "65/HD", seriesName: { uk: "MTR", pl: "MTR", en: "MTR" }, category: "Інші" },
            { code: "MTR 60/HD", seriesId: "MTR", colorCode: "60/HD", seriesName: { uk: "MTR", pl: "MTR", en: "MTR" }, category: "Інші" },
            { code: "EVS91", seriesId: "EVS", colorCode: "91", seriesName: { uk: "EVASTAR EVS", pl: "EVASTAR EVS", en: "EVASTAR EVS" }, category: "Інші" },
            { code: "TA91", seriesId: "TA", colorCode: "91", seriesName: { uk: "TAMPOPRINT TA", pl: "TAMPOPRINT TA", en: "TAMPOPRINT TA" }, category: "Інші" },
            { code: "PL5 VARNISH", seriesId: "OTHER", colorCode: "VARNISH", seriesName: { uk: "PL5 Лак", pl: "PL5 Lakier", en: "PL5 Varnish" }, category: "Інші" },
            { code: "FARBA BIAŁA HYDRA WHITE 120 CLZ", seriesId: "OTHER", colorCode: "HYDRA", seriesName: { uk: "Hydra White", pl: "Hydra White", en: "Hydra White" }, category: "Інші" },
        ];

        // Функція генерації фарб
        function generatePaints() {
            const paints = [];
            let idCounter = 1;

            excelPaintCodes.forEach(item => {
                let serie = series[item.seriesId];
                if (!serie) {
                    // Якщо серія не знайдена, використовуємо OTHER
                    serie = series.OTHER;
                }

                let colorName = { uk: item.colorCode, pl: item.colorCode, en: item.colorCode };
                let colorHex = "#000000";

                // Спочатку шукаємо в базових кольорах
                const baseColor = baseColors.find(bc => bc.code === item.colorCode);
                if (baseColor) {
                    colorName = baseColor.name;
                    colorHex = baseColor.color;
                } else {
                    // Шукаємо в спеціальних кольорах
                    const special = specialColors[item.colorCode];
                    if (special) {
                        colorName = { uk: special.uk, pl: special.pl, en: special.en };
                        colorHex = special.color;
                    }
                }

                paints.push({
                    id: `paint-${idCounter++}`,
                    name: item.code,
                    series: item.seriesId,
                    baseColorCode: item.colorCode,
                    category: serie.category,
                    color: colorHex,
                    manufacturer: "SICO",
                    article: `${item.seriesId}-${item.colorCode}`,
                    properties: serie.properties,
                    colorCode: item.colorCode,
                    isDefault: true,
                    displayName: {
                        uk: `${serie.name.uk} ${colorName.uk}`,
                        pl: `${serie.name.pl} ${colorName.pl}`,
                        en: `${serie.name.en} ${colorName.en}`
                    },
                    description: {
                        uk: `${serie.description.uk} Колір: ${colorName.uk}.`,
                        pl: `${serie.description.pl} Kolor: ${colorName.pl}.`,
                        en: `${serie.description.en} Color: ${colorName.en}.`
                    },
                    fullInfo: {
                        uk: `Серія: ${serie.name.uk}, Колір: ${item.code} - ${colorName.uk}, Категорія: ${serie.category}`,
                        pl: `Seria: ${serie.name.pl}, Kolor: ${item.code} - ${colorName.pl}, Kategoria: ${serie.category}`,
                        en: `Series: ${serie.name.en}, Color: ${item.code} - ${colorName.en}, Category: ${serie.category}`
                    },
                    colorName: colorName
                });
            });

            return paints;
        }

        const paints = generatePaints();

        // ---------- ДОДАТКИ ----------
        const additives = [
            // Трансферні порошки
            {
                id: "add-transfer-4",
                name: "TRANSFERPOWDER NR 4 SOFT",
                series: "TRANSFER",
                category: "Additives",
                article: "TRANSFER-4",
                displayName: {
                    uk: "Трансферний порошок NR 4 Soft",
                    pl: "Proszek transferowy NR 4 Soft",
                    en: "Transfer powder NR 4 Soft"
                },
                description: {
                    uk: "М'який трансферний порошок для холодного відриву.",
                    pl: "Miękki proszek transferowy do cold peel.",
                    en: "Soft transfer powder for cold peel."
                }
            },
            {
                id: "add-transfer-18",
                name: "TRANSFERPOWDER NR 18",
                series: "TRANSFER",
                category: "Additives",
                article: "TRANSFER-18",
                displayName: {
                    uk: "Трансферний порошок NR 18",
                    pl: "Proszek transferowy NR 18",
                    en: "Transfer powder NR 18"
                },
                description: {
                    uk: "Стандартний трансферний порошок.",
                    pl: "Standardowy proszek transferowy.",
                    en: "Standard transfer powder."
                }
            },
            {
                id: "add-transfer-13",
                name: "TRANSFERPOWDER NR 13",
                series: "TRANSFER",
                category: "Additives",
                article: "TRANSFER-13",
                displayName: {
                    uk: "Трансферний порошок NR 13",
                    pl: "Proszek transferowy NR 13",
                    en: "Transfer powder NR 13"
                },
                description: {
                    uk: "Трансферний порошок для спеціальних застосувань.",
                    pl: "Proszek transferowy do specjalnych zastosowań.",
                    en: "Transfer powder for special applications."
                }
            },
            {
                id: "add-transfer-12",
                name: "TRANSFERPOWDER NR 12 SPTNFX",
                series: "TRANSFER",
                category: "Additives",
                article: "TRANSFER-12",
                displayName: {
                    uk: "Трансферний порошок NR 12 SPTNFX",
                    pl: "Proszek transferowy NR 12 SPTNFX",
                    en: "Transfer powder NR 12 SPTNFX"
                },
                description: {
                    uk: "Трансферний порошок для ефектів.",
                    pl: "Proszek transferowy do efektów.",
                    en: "Transfer powder for effects."
                }
            },
            // Пігменти
            {
                id: "add-pigment-silver",
                name: "PIGMENT PROSZEK DO PLUV LED 110 SREBRNY",
                series: "PLUV_LED",
                category: "Additives",
                article: "PIGMENT-SILVER-LED",
                displayName: {
                    uk: "Срібний пігмент для PLUV LED",
                    pl: "Srebrny pigment do PLUV LED",
                    en: "Silver pigment for PLUV LED"
                },
                description: {
                    uk: "Срібний порошок для приготування срібної фарби UV-LED.",
                    pl: "Srebrny proszek do przygotowania srebrnej farby UV-LED.",
                    en: "Silver powder for making UV-LED silver ink."
                }
            },
            {
                id: "add-pigment-gold",
                name: "PIGMENT PROSZEK DO PLUV LED 120 ZŁOTA",
                series: "PLUV_LED",
                category: "Additives",
                article: "PIGMENT-GOLD-LED",
                displayName: {
                    uk: "Золотий пігмент для PLUV LED",
                    pl: "Złoty pigment do PLUV LED",
                    en: "Gold pigment for PLUV LED"
                },
                description: {
                    uk: "Золотий порошок для приготування золотої фарби UV-LED.",
                    pl: "Złoty proszek do przygotowania złotej farby UV-LED.",
                    en: "Gold powder for making UV-LED gold ink."
                }
            },
            // Інші додатки
            {
                id: "add-mp1000",
                name: "MP1000",
                series: "GENERAL",
                category: "Additives",
                article: "MP1000",
                displayName: {
                    uk: "MP1000 Матуючий порошок",
                    pl: "MP1000 Proszek matujący",
                    en: "MP1000 Matting powder"
                },
                description: {
                    uk: "Порошок для матування фарб. Додавати 5-10%.",
                    pl: "Proszek do matowania farb. Dodawać 5-10%.",
                    en: "Powder for matting inks. Add 5-10%."
                }
            },
            {
                id: "add-glassballs",
                name: "KULKI SZKLANE DO FARB GLASSBILLS",
                series: "GENERAL",
                category: "Additives",
                article: "GLASSBILLS",
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
                id: "add-cpv",
                name: "CPV SOLVENTBASED SCREENFILLER",
                series: "GENERAL",
                category: "Additives",
                article: "CPV",
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
                id: "add-adhesive-promotor",
                name: "ADHESIVE PROMOTOR FOR UV 150/129",
                series: "UV",
                category: "Additives",
                article: "ADHESIVE-UV",
                displayName: {
                    uk: "Адгезійний промотор для UV",
                    pl: "Promotor adhezji do UV",
                    en: "Adhesion promoter for UV"
                },
                description: {
                    uk: "Покращує адгезію УФ-фарб до складних поверхонь.",
                    pl: "Poprawia przyczepność farb UV do trudnych powierzchni.",
                    en: "Improves adhesion of UV inks to difficult surfaces."
                }
            },
            // Додатки для конкретних серій (з PDF)
            {
                id: "add-sp160",
                name: "SP160",
                series: "SP",
                category: "Additives",
                article: "SP160",
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
                id: "add-sp150",
                name: "SP150",
                series: "SP",
                category: "Additives",
                article: "SP150",
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
                id: "add-sn170",
                name: "SN170",
                series: "SN",
                category: "Additives",
                article: "SN170",
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
                id: "add-sn1702",
                name: "SN1702",
                series: "SN",
                category: "Additives",
                article: "SN1702",
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
                id: "add-si150",
                name: "SI150",
                series: "SI",
                category: "Additives",
                article: "SI150",
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
                id: "add-px-hpx",
                name: "PXHPX",
                series: "PX",
                category: "Additives",
                article: "PXHPX",
                displayName: {
                    uk: "PXHPX Затверджувач епоксидний",
                    pl: "PXHPX Utwardzacz epoksydowy",
                    en: "PXHPX Epoxy hardener"
                },
                description: {
                    uk: "Затверджувач для епоксидних фарб. Додавати 15-17%.",
                    pl: "Utwardzacz do farb epoksydowych. Dodawać 15-17%.",
                    en: "Hardener for epoxy inks. Add 15-17%."
                }
            },
            {
                id: "add-px160",
                name: "PX160",
                series: "PX",
                category: "Additives",
                article: "PX160",
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
                id: "add-pluv160",
                name: "PLUV160",
                series: "PLUV",
                category: "Additives",
                article: "PLUV160",
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
                id: "add-pluv150",
                name: "PLUV150",
                series: "PLUV",
                category: "Additives",
                article: "PLUV150",
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
                id: "add-pluv150-led",
                name: "PLUV150 LED",
                series: "PLUV_LED",
                category: "Additives",
                article: "PLUV150-LED",
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
                id: "add-otf-puffing",
                name: "OTF PUFFING BASE",
                series: "OTF",
                category: "Additives",
                article: "OTFPB",
                displayName: {
                    uk: "OTF База пучення",
                    pl: "OTF Baza pęczniejąca",
                    en: "OTF Puff base"
                },
                description: {
                    uk: "База для 3D-ефекту (пучення) на тканині. Змішувати з пастами PPT.",
                    pl: "Baza do efektu 3D (pęcznienia) na tkaninie. Mieszać z pastami PPT.",
                    en: "Base for 3D puff effect on fabric. Mix with PPT pastes."
                }
            },
            {
                id: "add-nst150",
                name: "NST150",
                series: "NST",
                category: "Additives",
                article: "NST150",
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
                id: "add-ec240",
                name: "EC240",
                series: "EC",
                category: "Additives",
                article: "EC240",
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
                id: "add-ec170",
                name: "EC170",
                series: "EC",
                category: "Additives",
                article: "EC170",
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
                id: "add-ec1702",
                name: "EC1702",
                series: "EC",
                category: "Additives",
                article: "EC1702",
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
                id: "add-ec160",
                name: "EC160",
                series: "EC",
                category: "Additives",
                article: "EC160",
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
                id: "add-ec150-uv",
                name: "EC150 UV BLOCKER",
                series: "EC",
                category: "Additives",
                article: "EC150-UV",
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
                id: "add-ec150",
                name: "EC150",
                series: "EC",
                category: "Additives",
                article: "EC150",
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
                id: "add-ec150-33",
                name: "EC150/33",
                series: "EC",
                category: "Additives",
                article: "EC150-33",
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
                id: "add-ec1501",
                name: "EC1501",
                series: "EC",
                category: "Additives",
                article: "EC1501",
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
                id: "add-cf170",
                name: "CF170",
                series: "CF",
                category: "Additives",
                article: "CF170",
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
                id: "add-cf1702",
                name: "CF1702",
                series: "CF",
                category: "Additives",
                article: "CF1702",
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
                id: "add-cf160",
                name: "CF160",
                series: "CF",
                category: "Additives",
                article: "CF160",
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
                id: "add-cf150",
                name: "CF150",
                series: "CF",
                category: "Additives",
                article: "CF150",
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
                id: "add-cf1501",
                name: "CF1501",
                series: "CF",
                category: "Additives",
                article: "CF1501",
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
                id: "add-as150",
                name: "AS150",
                series: "AS",
                category: "Additives",
                article: "AS150",
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
                id: "add-otf110-reflex",
                name: "OTF110 REFLEX",
                series: "OTF",
                category: "Additives",
                article: "OTF110-REFLEX",
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
            },
            {
                id: "add-sptnpb",
                name: "SPTNPB",
                series: "SPTN",
                category: "Additives",
                article: "SPTNPB",
                displayName: {
                    uk: "SPTNPB Паста пучення",
                    pl: "SPTNPB Pasta pęczniejąca",
                    en: "SPTNPB Puff paste"
                },
                description: {
                    uk: "Паста для 3D-ефекту (пучення). Додавати 10-15%.",
                    pl: "Pasta do efektu 3D (pęcznienia). Dodawać 10-15%.",
                    en: "Paste for 3D puff effect. Add 10-15%."
                }
            },
            {
                id: "add-sptncr",
                name: "SPTNCR",
                series: "SPTN",
                category: "Additives",
                article: "SPTNCR",
                displayName: {
                    uk: "SPTNCR Редуктор",
                    pl: "SPTNCR Reduktor",
                    en: "SPTNCR Reducer"
                },
                description: {
                    uk: "Редуктор для пластизолевих фарб, що твердіє.",
                    pl: "Reduktor utwardzalny do farb plastizolowych.",
                    en: "Curable reducer for plastisol inks."
                }
            },
            {
                id: "add-sptn150",
                name: "SPTN150",
                series: "SPTN",
                category: "Additives",
                article: "SPTN150",
                displayName: {
                    uk: "SPTN150 Прозора база",
                    pl: "SPTN150 Baza transparentna",
                    en: "SPTN150 Transparent base"
                },
                description: {
                    uk: "Прозора база для пластизолевих фарб.",
                    pl: "Baza przezroczysta do farb plastizolowych.",
                    en: "Transparent base for plastisol inks."
                }
            },
            {
                id: "add-sptn150-25",
                name: "SPTN150/25",
                series: "SPTN",
                category: "Additives",
                article: "SPTN150-25",
                displayName: {
                    uk: "SPTN150/25 Матуюча паста",
                    pl: "SPTN150/25 Pasta matująca",
                    en: "SPTN150/25 Matting paste"
                },
                description: {
                    uk: "Матуюча паста для пластизолевих фарб.",
                    pl: "Pasta matująca do farb plastizolowych.",
                    en: "Matting paste for plastisol inks."
                }
            },
            {
                id: "add-tpp1702",
                name: "TPP1702",
                series: "TPP",
                category: "Additives",
                article: "TPP1702",
                displayName: {
                    uk: "TPP1702 Сповільнювач у гелі суперповільний",
                    pl: "TPP1702 Opóźniacz w żelu superwolny",
                    en: "TPP1702 Super slow gel retarder"
                },
                description: {
                    uk: "Суперповільний сповільнювач у гелі для фарб Polypro.",
                    pl: "Superwolny opóźniacz w żelu do farb Polypro.",
                    en: "Super slow gel retarder for Polypro inks."
                }
            }
        ];

        // ---------- КАТЕГОРІЇ (список) ----------
        const categories = Object.keys(categoryDescriptions);

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

        console.log(`[SICOMIX] Згенеровано ${paints.length} унікальних фарб з Excel`);
        console.log(`[SICOMIX] Додано ${additives.length} додатків`);

        return {
            paints,
            recipes: [],
            series: Object.values(series),
            baseColors,
            additives,
            categories,
            categoryDescriptions,
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
