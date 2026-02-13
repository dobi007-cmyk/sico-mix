// ========== ДАНІ ПРО ФАРБИ SICO (БАГАТОМОВНА ВЕРСІЯ) ==========
window.SICOMIX = window.SICOMIX || {};
const SICOMIX = window.SICOMIX;

SICOMIX.data = (function() {
    try {
        // ---------- СЕРІЇ ФАРБ (категорії тепер рядки) ----------
        const series = [
            { 
                id: "EC",
                name: { ua: "EC", pl: "EC", en: "EC" },
                category: "Універсальні",   // було об'єктом, тепер рядок
                description: {
                    ua: "Універсальна розчинникова фарба. Легка в друці, високий глянець. Підходить для самоклейних матеріалів, ПВХ, паперу, картону, лакированих металів. З додаванням 5% HEC – для поліпропілену, priplack, ABS, forex, банерів.",
                    pl: "Uniwersalna farba rozpuszczalnikowa. Łatwa w druku, wysoki połysk. Nadaje się do materiałów samoprzylepnych, PCV, papieru, tektury, metali lakierowanych. Z dodatkiem 5% HEC – do polipropylenu, priplack, ABS, forex, banerów.",
                    en: "Universal solvent-based ink. Easy to print, high gloss. Suitable for self-adhesive materials, PVC, paper, cardboard, lacquered metals. With 5% HEC additive – for polypropylene, priplack, ABS, forex, banners."
                },
                properties: {
                    type: {
                        ua: "Farba rozpuszczalnikowa",
                        pl: "Farba rozpuszczalnikowa",
                        en: "Solvent-based ink"
                    },
                    finish: {
                        ua: "Високий глянець",
                        pl: "Wysoki połysk",
                        en: "High gloss"
                    },
                    drying: {
                        ua: "6 хв на відкритому повітрі, миттєво в тунелі",
                        pl: "6 min na otwartym powietrzu, natychmiastowo w tunelu",
                        en: "6 min open air, instantly in tunnel"
                    },
                    mesh: {
                        ua: "P77-120 (флуо: P90T, триадні: високої щільності)",
                        pl: "P77-120 (fluoro: P90T, triadowe: wysokiej gęstości)",
                        en: "P77-120 (fluo: P90T, process: high density)"
                    },
                    cleaning: {
                        ua: "CT 1000 або CT 1000/1",
                        pl: "CT 1000 lub CT 1000/1",
                        en: "CT 1000 or CT 1000/1"
                    },
                    storage: {
                        ua: "Необмежений",
                        pl: "Nieograniczony",
                        en: "Unlimited"
                    },
                    resistance: {
                        ua: "Дуже хороша стійкість до світла та атмосферних умов",
                        pl: "Bardzo dobra odporność na światło i warunki atmosferyczne",
                        en: "Very good light and weather resistance"
                    },
                    thinning: {
                        ua: "EC 1000 (швидкий), EC 2000 (нормальний), EC 3000/4000 (легке сповільнення), EC 5000 (сповільнювач), EC 8000 (дуже повільний). Для флуо: EC 1300, EC 1301. Середнє розрідження: +/-15%",
                        pl: "EC 1000 (szybki), EC 2000 (normalny), EC 3000/4000 (lekkie spowolnienie), EC 5000 (opóźniacz), EC 8000 (bardzo wolny). Dla fluo: EC 1300, EC 1301. Średnie rozrzedzenie: +/-15%",
                        en: "EC 1000 (fast), EC 2000 (normal), EC 3000/4000 (mild retarder), EC 5000 (retarder), EC 8000 (very slow). For fluo: EC 1300, EC 1301. Average thinning: +/-15%"
                    },
                    additives: {
                        ua: "EC 160 – криюча паста (20-50%); EC 150 – прозора база; EC 1501 HG – захисний лак; AS 1000 – антистатик до 5%; EC 170/1702 – сповільнювач у гелі; MP 1000 – матуючий порошок; EC 150/10 – матуюча паста; MP 3000 – загусник; HEC – затверджувач 3-5% для проблемних поверхонь",
                        pl: "EC 160 – pasta kryjąca (20-50%); EC 150 – baza przezroczysta; EC 1501 HG – lakier ochronny; AS 1000 – antystatyk do 5%; EC 170/1702 – opóźniacz w żelu; MP 1000 – proszek matujący; EC 150/10 – pasta matująca; MP 3000 – zagęstnik; HEC – utwardzacz 3-5% do problematycznych powierzchni",
                        en: "EC 160 – opaque paste (20-50%); EC 150 – transparent base; EC 1501 HG – protective varnish; AS 1000 – antistatic up to 5%; EC 170/1702 – gel retarder; MP 1000 – matting powder; EC 150/10 – matting paste; MP 3000 – thickener; HEC – hardener 3-5% for problem surfaces"
                    },
                    special: {
                        ua: "EC 91 Q – напівматова біла з вищою в'язкістю для паперу та картону; EC 60/146, EC 61/163 – вогненно-червоні з екстремальною світлостійкістю; ECRG 120 – золота фарба готового використання",
                        pl: "EC 91 Q – biała półmatowa o wyższej lepkości do papieru i tektury; EC 60/146, EC 61/163 – ogniste czerwienie z ekstremalną odpornością na światło; ECRG 120 – złota farba gotowa do użycia",
                        en: "EC 91 Q – semi-matte white with higher viscosity for paper and cardboard; EC 60/146, EC 61/163 – fire reds with extreme lightfastness; ECRG 120 – gold ink ready to use"
                    }
                }
            },
            { 
                id: "CF",
                name: { ua: "CARTOFLEX CF", pl: "CARTOFLEX CF", en: "CARTOFLEX CF" },
                category: "Папір/картон",
                description: {
                    ua: "Розчинникова фарба для картону, паперу, самоклейних паперів, дерева, лакированих металів. Промисловий друк: сталеві бочки, вогнегасники, пробки для оливи, суха пінопласт EPS. Для плівок Penstick з поліестеровим покриттям, поліестеру, PET, поліуретану – серія CF A&S.",
                    pl: "Farba rozpuszczalnikowa do tektury, papieru, papierów samoprzylepnych, drewna, metali lakierowanych. Druk przemysłowy: beczki stalowe, gaśnice, korki olejowe, suchy styropian EPS. Do folii Penstick z powłoką poliestrową, poliestru, PET, poliuretanu – seria CF A&S.",
                    en: "Solvent-based ink for cardboard, paper, self-adhesive papers, wood, lacquered metals. Industrial printing: steel drums, fire extinguishers, oil caps, dry EPS foam. For Penstick films with polyester coating, polyester, PET, polyurethane – CF A&S series."
                },
                properties: {
                    type: {
                        ua: "Farba rozpuszczalnikowa",
                        pl: "Farba rozpuszczalnikowa",
                        en: "Solvent-based ink"
                    },
                    finish: {
                        ua: "Напівмат",
                        pl: "Półmat",
                        en: "Semi-matte"
                    },
                    drying: {
                        ua: "4 хв на відкритому повітрі, миттєво в тунелі",
                        pl: "4 min na otwartym powietrzu, natychmiastowo w tunelu",
                        en: "4 min open air, instantly in tunnel"
                    },
                    mesh: {
                        ua: "P77-P120",
                        pl: "P77-P120",
                        en: "P77-P120"
                    },
                    cleaning: {
                        ua: "CT 1000 або CT 1000/1",
                        pl: "CT 1000 lub CT 1000/1",
                        en: "CT 1000 or CT 1000/1"
                    },
                    storage: {
                        ua: "Необмежений",
                        pl: "Nieograniczony",
                        en: "Unlimited"
                    },
                    resistance: {
                        ua: "Дуже хороша стійкість до світла та атмосферних умов",
                        pl: "Bardzo dobra odporność na światło i warunki atmosferyczne",
                        en: "Very good light and weather resistance"
                    },
                    thinning: {
                        ua: "CF 1000 (швидкий), CF 2000 (нормальний), CF 3000/4000 (легке сповільнення), CF 5000 (сповільнювач), CF 8000 (дуже повільний). +-20%",
                        pl: "CF 1000 (szybki), CF 2000 (normalny), CF 3000/4000 (lekkie spowolnienie), CF 5000 (opóźniacz), CF 8000 (bardzo wolny). +-20%",
                        en: "CF 1000 (fast), CF 2000 (normal), CF 3000/4000 (mild retarder), CF 5000 (retarder), CF 8000 (very slow). +-20%"
                    },
                    additives: {
                        ua: "CF 150 – прозора база; CF 1501 HG – фінішний лак (високий глянець, стійкість до стирання); CF 160 – викривлююча добавка для деталей (до 10%); CF 1702 – сильний сповільнювач у гелі (до 10%); AS 1000 – антистатик до 5%; HCF – повільний затверджувач 5% для покращення адгезії",
                        pl: "CF 150 – baza przezroczysta; CF 1501 HG – lakier wykończeniowy (wysoki połysk, odporność na ścieranie); CF 160 – dodatek wykrzywiający do detali (do 10%); CF 1702 – silny opóźniacz w żelu (do 10%); AS 1000 – antystatyk do 5%; HCF – wolny utwardzacz 5% dla poprawy przyczepności",
                        en: "CF 150 – transparent base; CF 1501 HG – finishing varnish (high gloss, abrasion resistance); CF 160 – distorting additive for details (up to 10%); CF 1702 – strong gel retarder (up to 10%); AS 1000 – antistatic up to 5%; HCF – slow hardener 5% for improved adhesion"
                    }
                }
            },
            { 
                id: "PLUV",
                name: { ua: "UVIPLAST PLUV", pl: "UVIPLAST PLUV", en: "UVIPLAST PLUV" },
                category: "UV фарби",
                description: {
                    ua: "Фарба та лак УФ. Для самоклейних матеріалів, банерів, лакированого металу, ПП, пінопласту, попередньо активованого поліетилену, полікарбонату, паперу, ПВХ. Лак PLUV 150 – високоглянцевий для офсету та трафаретного друку.",
                    pl: "Farba i lakier UV. Do materiałów samoprzylepnych, banerów, metalu lakierowanego, PP, styropianu, wstępnie aktywowanego polietylenu, poliwęglanu, papieru, PCV. Lakier PLUV 150 – wysoki połysk do offsetu i druku sitowego.",
                    en: "UV ink and varnish. For self-adhesive materials, banners, lacquered metal, PP, styrofoam, pre-activated polyethylene, polycarbonate, paper, PVC. PLUV 150 varnish – high gloss for offset and screen printing."
                },
                properties: {
                    type: {
                        ua: "Farba i lakier UV",
                        pl: "Farba i lakier UV",
                        en: "UV ink and varnish"
                    },
                    finish: {
                        ua: "Високий глянець",
                        pl: "Wysoki połysk",
                        en: "High gloss"
                    },
                    drying: {
                        ua: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв",
                        pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min",
                        en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min"
                    },
                    mesh: {
                        ua: "P140-P185T (флуо: P90, алюміній/золото: P120)",
                        pl: "P140-P185T (fluoro: P90, aluminium/złoto: P120)",
                        en: "P140-P185T (fluo: P90, aluminum/gold: P120)"
                    },
                    cleaning: {
                        ua: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1",
                        pl: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1",
                        en: "CT 1000/20 (UV cleaner), CT 1000, CT 1000/1"
                    },
                    storage: {
                        ua: "1-2 роки у темних контейнерах при 5-25°C",
                        pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C",
                        en: "1-2 years in dark containers at 5-25°C"
                    },
                    resistance: {
                        ua: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік",
                        pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku",
                        en: "Very good for all colors, possible slight yellowing of varnish after one year"
                    },
                    thinning: {
                        ua: "PLUV 2000 – стандартний розчинник",
                        pl: "PLUV 2000 – standardowy rozcieńczalnik",
                        en: "PLUV 2000 – standard thinner"
                    },
                    additives: {
                        ua: "HPLUV – каталізатор до 5% для складних поверхонь; не додавати більше 20% PLUV 91 до кольору – знижує адгезію",
                        pl: "HPLUV – katalizator do 5% dla trudnych powierzchni; nie dodawać więcej niż 20% PLUV 91 do koloru – zmniejsza przyczepność",
                        en: "HPLUV – catalyst up to 5% for difficult surfaces; do not add more than 20% PLUV 91 to color – reduces adhesion"
                    },
                    special: {
                        ua: "Відмінна еластичність, можливість бігування. Завжди тестувати перед виробництвом.",
                        pl: "Doskonała elastyczność, możliwość bigowania. Zawsze testować przed produkcją.",
                        en: "Excellent elasticity, possibility of creasing. Always test before production."
                    }
                }
            },
            { 
                id: "SX",
                name: { ua: "SICOTEX SX", pl: "SICOTEX SX", en: "SICOTEX SX" },
                category: "Текстиль",
                description: {
                    ua: "Водна фарба для бавовни, синтетичних тканин та їх сумішей. Екологічна, сертифікат Oeko-Tex 100 клас I-IV. Без розчинників, важких металів, шкідливих пігментів, PVC.",
                    pl: "Farba wodna do bawełny, tkanin syntetycznych i ich mieszanek. Ekologiczna, certyfikat Oeko-Tex 100 klasa I-IV. Bez rozpuszczalników, metali ciężkich, szkodliwych pigmentów, PVC.",
                    en: "Water-based ink for cotton, synthetic fabrics and their blends. Eco-friendly, Oeko-Tex 100 class I-IV certified. Free from solvents, heavy metals, harmful pigments, PVC."
                },
                properties: {
                    type: {
                        ua: "Farba wodna",
                        pl: "Farba wodna",
                        en: "Water-based ink"
                    },
                    finish: {
                        ua: "Сатиновий",
                        pl: "Satyna",
                        en: "Satin"
                    },
                    drying: {
                        ua: "3 хв при 150°C (з 3% HSX – затверджувача – термофіксація не потрібна)",
                        pl: "3 min w 150°C (z 3% HSX – utwardzacza – nie wymaga termofiksacji)",
                        en: "3 min at 150°C (with 3% HSX hardener – no heat fixation needed)"
                    },
                    mesh: {
                        ua: "P34-P90, P90 для CMYK",
                        pl: "P34-P90, P90 dla CMYK",
                        en: "P34-P90, P90 for CMYK"
                    },
                    cleaning: {
                        ua: "Тепла вода або мийний засіб, можна під високим тиском",
                        pl: "Ciepła woda lub środek czyszczący, można pod wysokim ciśnieniem",
                        en: "Warm water or cleaning agent, can be high pressure"
                    },
                    storage: {
                        ua: "1-2 роки при температурі вище нуля",
                        pl: "1-2 lata w temperaturze powyżej zera",
                        en: "1-2 years at above zero temperature"
                    },
                    resistance: {
                        ua: "Відмінна стійкість до прання та світла після 24 год фіксації",
                        pl: "Doskonała odporność na pranie i światło po 24 h utrwalania",
                        en: "Excellent wash and light resistance after 24 h fixation"
                    },
                    thinning: {
                        ua: "Max 10% води або сповільнювач SX 5000",
                        pl: "Max 10% wody lub opóźniacz SX 5000",
                        en: "Max 10% water or retarder SX 5000"
                    },
                    additives: {
                        ua: "HSX – затверджувач (3%, після додавання використати за 24 год); SX 150 + 11 паст – самостійне приготування кольорів",
                        pl: "HSX – utwardzacz (3%, po dodaniu zużyć w ciągu 24 h); SX 150 + 11 past – samodzielne przygotowanie kolorów",
                        en: "HSX – hardener (3%, use within 24 h after addition); SX 150 + 11 pastes – self-mixing of colors"
                    },
                    special: {
                        ua: "Концентровані, прозорі, живі кольори. Доступні CMYK та флуо. Дуже еластична, не тріскається.",
                        pl: "Skoncentrowane, przezroczyste, żywe kolory. Dostępne CMYK i fluo. Bardzo elastyczna, nie pęka.",
                        en: "Concentrated, transparent, vivid colors. CMYK and fluo available. Very elastic, does not crack."
                    }
                }
            },
            { 
                id: "SPTN",
                name: { ua: "SICOPLAST SPTN", pl: "SICOPLAST SPTN", en: "SICOPLAST SPTN" },
                category: "Текстиль",
                description: {
                    ua: "Пластизольова фарба для всіх тканинних матеріалів – натуральних та синтетичних. Прямий та трансферний друк.",
                    pl: "Farba plastizolowa do wszystkich materiałów tekstylnych – naturalnych i syntetycznych. Druk bezpośredni i transferowy.",
                    en: "Plastisol ink for all textile materials – natural and synthetic. Direct and transfer printing."
                },
                properties: {
                    type: {
                        ua: "Farba plastizolowa",
                        pl: "Farba plastizolowa",
                        en: "Plastisol ink"
                    },
                    finish: {
                        ua: "Сатиновий, м'який, дуже еластичний",
                        pl: "Satyna, miękki, bardzo elastyczny",
                        en: "Satin, soft, very elastic"
                    },
                    drying: {
                        ua: "150-170°C ~2 хв",
                        pl: "150-170°C ~2 min",
                        en: "150-170°C ~2 min"
                    },
                    mesh: {
                        ua: "Стандартні: 34-90 н/см; тріадні: 77-120; блискучі: 15",
                        pl: "Standardowe: 34-90 n/cm; triadowe: 77-120; błyszczące: 15",
                        en: "Standard: 34-90 n/cm; process: 77-120; glitter: 15"
                    },
                    cleaning: {
                        ua: "CT 1000/l",
                        pl: "CT 1000/l",
                        en: "CT 1000/l"
                    },
                    storage: {
                        ua: "5-20°C, до 5 років",
                        pl: "5-20°C, do 5 lat",
                        en: "5-20°C, up to 5 years"
                    },
                    resistance: {
                        ua: "Відмінна стійкість до прання при дотриманні технології. Світлостійкість 2-3 роки (крім флуо).",
                        pl: "Doskonała odporność na pranie przy przestrzeganiu technologii. Odporność na światło 2-3 lata (oprócz fluo).",
                        en: "Excellent wash resistance when technology is followed. Lightfastness 2-3 years (except fluo)."
                    },
                    thinning: {
                        ua: "SPT nr 1/SPTN 1000 – до 5%; SPTNCR – без обмежень",
                        pl: "SPT nr 1/SPTN 1000 – do 5%; SPTNCR – bez ograniczeń",
                        en: "SPT nr 1/SPTN 1000 – up to 5%; SPTNCR – unlimited"
                    },
                    additives: {
                        ua: "SPTHNYL – до 10% для адгезії (суміш придатна 24 год); Nyloncoat – 5% для нейлону (суміш 24 год); база пучення; клей трансферний SPT nr 2",
                        pl: "SPTHNYL – do 10% dla przyczepności (mieszanka ważna 24 h); Nyloncoat – 5% do nylonu (mieszanka 24 h); baza pęczniejąca; klej transferowy SPT nr 2",
                        en: "SPTHNYL – up to 10% for adhesion (mix usable 24 h); Nyloncoat – 5% for nylon (mix 24 h); puff base; transfer adhesive SPT nr 2"
                    },
                    special: {
                        ua: "Flash white SPTN91 – швидковисихаюча біла для бази; Opaque white SPTN91/l – дуже криюча та еластична",
                        pl: "Flash white SPTN91 – szybkoschnąca biała do bazy; Opaque white SPTN91/l – bardzo kryjąca i elastyczna",
                        en: "Flash white SPTN91 – fast drying white for base; Opaque white SPTN91/l – very opaque and elastic"
                    }
                }
            },
            { 
                id: "AS",
                name: { ua: "AQUASET AS", pl: "AQUASET AS", en: "AQUASET AS" },
                category: "Папір/картон",
                description: {
                    ua: "Водна фарба для картону, товстого паперу (мін. 130 г/м²), дерева, гофрокартону. Екологічна, без важких металів, підходить для дитячих іграшок та харчової упаковки.",
                    pl: "Farba wodna do tektury, grubego papieru (min. 130 g/m²), drewna, tektury falistej. Ekologiczna, bez metali ciężkich, odpowiednia do zabawek dla dzieci i opakowań spożywczych.",
                    en: "Water-based ink for cardboard, thick paper (min. 130 g/m²), wood, corrugated cardboard. Eco-friendly, heavy metal free, suitable for children's toys and food packaging."
                },
                properties: {
                    type: {
                        ua: "Farba wodna",
                        pl: "Farba wodna",
                        en: "Water-based ink"
                    },
                    finish: {
                        ua: "Сатиновий (блискуча версія AQUAGLOSS AG)",
                        pl: "Satyna (błyszcząca wersja AQUAGLOSS AG)",
                        en: "Satin (glossy version AQUAGLOSS AG)"
                    },
                    drying: {
                        ua: "~1 год на відкритому повітрі, після тунелю можна складати в стоси",
                        pl: "~1 godz. na otwartym powietrzu, po tunelu można układać w stosy",
                        en: "~1 hour open air, after tunnel can be stacked"
                    },
                    mesh: {
                        ua: "P77-P140",
                        pl: "P77-P140",
                        en: "P77-P140"
                    },
                    cleaning: {
                        ua: "Вода (краще під високим тиском) або Aquaclean",
                        pl: "Woda (lepiej pod wysokim ciśnieniem) lub Aquaclean",
                        en: "Water (preferably high pressure) or Aquaclean"
                    },
                    storage: {
                        ua: "4 роки при 5-25°C у добре закритій тарі",
                        pl: "4 lata w temp. 5-25°C w szczelnie zamkniętym pojemniku",
                        en: "4 years at 5-25°C in tightly closed container"
                    },
                    resistance: {
                        ua: "Екологічна, без важких металів. Для зовнішнього застосування – додати 1% затверджувача (використати за 12 год)",
                        pl: "Ekologiczna, bez metali ciężkich. Do zastosowań zewnętrznych – dodać 1% utwardzacza (zużyć w ciągu 12 h)",
                        en: "Eco-friendly, heavy metal free. For outdoor use – add 1% hardener (use within 12 h)"
                    },
                    thinning: {
                        ua: "Вода або сповільнювач AS 5000",
                        pl: "Woda lub opóźniacz AS 5000",
                        en: "Water or retarder AS 5000"
                    },
                    additives: {
                        ua: "Затверджувач для водостійкості",
                        pl: "Utwardzacz do wodoodporności",
                        en: "Hardener for water resistance"
                    }
                }
            },
            { 
                id: "OTF",
                name: { ua: "OPATEX OTF", pl: "OPATEX OTF", en: "OPATEX OTF" },
                category: "Текстиль",
                description: {
                    ua: "Суперкриюча водна фарба для прямого та трансферного друку на темних тканинах (натуральних та більшості синтетичних).",
                    pl: "Superkryjąca farba wodna do druku bezpośredniego i transferowego na ciemnych tkaninach (naturalnych i większości syntetycznych).",
                    en: "Super opaque water-based ink for direct and transfer printing on dark fabrics (natural and most synthetic)."
                },
                properties: {
                    type: {
                        ua: "Super kryjąca farba wodna",
                        pl: "Superkryjąca farba wodna",
                        en: "Super opaque water-based ink"
                    },
                    finish: {
                        ua: "Криючий, м'який, без гумового ефекту",
                        pl: "Kryjący, miękki, bez efektu gumy",
                        en: "Opaque, soft, no rubber effect"
                    },
                    drying: {
                        ua: "3 хв при 150°C без затверджувача; з 3% HOT – термофіксація не потрібна",
                        pl: "3 min w 150°C bez utwardzacza; z 3% HOT – nie wymaga termofiksacji",
                        en: "3 min at 150°C without hardener; with 3% HOT – no heat fixation needed"
                    },
                    mesh: {
                        ua: "P34T до P77T",
                        pl: "P34T do P77T",
                        en: "P34T to P77T"
                    },
                    cleaning: {
                        ua: "Холодна вода + мийний засіб (Aquaclean), під високим тиском; для емульсій водостійких – CT 1000/63",
                        pl: "Zimna woda + środek czyszczący (Aquaclean), pod wysokim ciśnieniem; dla emulsji wodoodpornych – CT 1000/63",
                        en: "Cold water + cleaning agent (Aquaclean), high pressure; for water-resistant emulsions – CT 1000/63"
                    },
                    storage: {
                        ua: "1-2 роки при 10-25°C, берегти від морозу",
                        pl: "1-2 lata w temp. 10-25°C, chronić przed mrozem",
                        en: "1-2 years at 10-25°C, protect from frost"
                    },
                    resistance: {
                        ua: "Відмінна після додавання HOT. Для нейлону – HOT обов'язково.",
                        pl: "Doskonała po dodaniu HOT. Do nylonu – HOT obowiązkowo.",
                        en: "Excellent after adding HOT. For nylon – HOT mandatory."
                    },
                    thinning: {
                        ua: "Max 10% води, або OTF 5000 (повільний), або OTF 7000 (еластичний). Сумарно не більше 10%.",
                        pl: "Max 10% wody, lub OTF 5000 (wolny), lub OTF 7000 (elastyczny). Łącznie nie więcej niż 10%.",
                        en: "Max 10% water, or OTF 5000 (slow), or OTF 7000 (elastic). Total not more than 10%."
                    },
                    additives: {
                        ua: "HOT – затверджувач 3%; OTF 150/14 – лак для трансферу (стійкість до прання, еластичність); OTF 150/18 – повільна версія; OTF 100/101 – чорний блокатор міграції для поліестеру; База пучення OTF – змішувати з пастами PPT (100г бази + 5г пасти)",
                        pl: "HOT – utwardzacz 3%; OTF 150/14 – lakier do transferu (odporność na pranie, elastyczność); OTF 150/18 – wolna wersja; OTF 100/101 – czarny blokator migracji do poliestru; Baza pęczniejąca OTF – mieszać z pastami PPT (100g bazy + 5g pasty)",
                        en: "HOT – hardener 3%; OTF 150/14 – transfer varnish (wash resistance, elasticity); OTF 150/18 – slow version; OTF 100/101 – black migration blocker for polyester; OTF puff base – mix with PPT pastes (100g base + 5g paste)"
                    },
                    special: {
                        ua: "Дуже криюча, еластична, незважаючи на високі криючі властивості. Трансфер: протокол для 1-кольорових та багатокольорових; Transferglue OTF nr 2 – клей із порошком усередині; порошки Soft nr 3, nr 12, nr 4, nr 13; Cold peel.",
                        pl: "Bardzo kryjąca, elastyczna, pomimo wysokich właściwości kryjących. Transfer: protokół dla 1-kolorowych i wielokolorowych; Transferglue OTF nr 2 – klej z proszkiem w środku; proszki Soft nr 3, nr 12, nr 4, nr 13; Cold peel.",
                        en: "Very opaque, elastic, despite high opacity. Transfer: protocol for 1-color and multicolor; Transferglue OTF nr 2 – adhesive with powder inside; Soft powders nr 3, nr 12, nr 4, nr 13; Cold peel."
                    }
                }
            },
            { 
                id: "TPP",
                name: { ua: "POLYPRO TPP", pl: "POLYPRO TPP", en: "POLYPRO TPP" },
                category: "Пластики",
                description: {
                    ua: "Розчинникова фарба для поліетилену, поліпропілену та полікарбонату (priplack, akylux, duoprop). Для попередньо активованого поліетилену – додати HTPP SLOW.",
                    pl: "Farba rozpuszczalnikowa do polietylenu, polipropylenu i poliwęglanu (priplack, akylux, duoprop). Do wstępnie aktywowanego polietylenu – dodać HTPP SLOW.",
                    en: "Solvent-based ink for polyethylene, polypropylene and polycarbonate (priplack, akylux, duoprop). For pre-activated polyethylene – add HTPP SLOW."
                },
                properties: {
                    type: {
                        ua: "Farba rozpuszczalnikowa",
                        pl: "Farba rozpuszczalnikowa",
                        en: "Solvent-based ink"
                    },
                    finish: {
                        ua: "Сатиновий",
                        pl: "Satyna",
                        en: "Satin"
                    },
                    drying: {
                        ua: "10 хв на відкритому повітрі, миттєво в тунелі",
                        pl: "10 min na otwartym powietrzu, natychmiastowo w tunelu",
                        en: "10 min open air, instantly in tunnel"
                    },
                    mesh: {
                        ua: "P90-120",
                        pl: "P90-120",
                        en: "P90-120"
                    },
                    cleaning: {
                        ua: "ST 1000",
                        pl: "ST 1000",
                        en: "ST 1000"
                    },
                    storage: {
                        ua: "Необмежений",
                        pl: "Nieograniczony",
                        en: "Unlimited"
                    },
                    resistance: {
                        ua: "Дуже хороша стійкість до світла та атмосферних умов",
                        pl: "Bardzo dobra odporność na światło i warunki atmosferyczne",
                        en: "Very good light and weather resistance"
                    },
                    thinning: {
                        ua: "TPP 1000 (швидкий), TPP 2000 (нормальний), TPP 3000/4000 (легке сповільнення), TPP 5000 (повільний), TPP 8000 (дуже повільний). Середнє: +/-15%",
                        pl: "TPP 1000 (szybki), TPP 2000 (normalny), TPP 3000/4000 (lekkie spowolnienie), TPP 5000 (wolny), TPP 8000 (bardzo wolny). Średnio: +/-15%",
                        en: "TPP 1000 (fast), TPP 2000 (normal), TPP 3000/4000 (mild retarder), TPP 5000 (slow), TPP 8000 (very slow). Average: +/-15%"
                    },
                    additives: {
                        ua: "HTPP SLOW – затверджувач для стійкості до подряпин та адгезії (придатність 1 день); TPP 160 – високотиксотропна викривлююча добавка (10%); TPP 150 – прозора база / лак; AS 1000 – антистатик 5%; TPP 1702 – сповільнювач у гелі проти засихання",
                        pl: "HTPP SLOW – utwardzacz do odporności na zarysowania i przyczepności (ważność 1 dzień); TPP 160 – dodatek wysokotiksotropowy wykrzywiający (10%); TPP 150 – baza przezroczysta / lakier; AS 1000 – antystatyk 5%; TPP 1702 – opóźniacz w żelu przeciw zasychaniu",
                        en: "HTPP SLOW – hardener for scratch resistance and adhesion (usable 1 day); TPP 160 – highly thixotropic distorting additive (10%); TPP 150 – transparent base / varnish; AS 1000 – antistatic 5%; TPP 1702 – gel retarder against drying"
                    },
                    special: {
                        ua: "Не додавати матуючий порошок – знижує адгезію. Для проблемних поверхонь – матеріал має бути активований.",
                        pl: "Nie dodawać proszku matującego – zmniejsza przyczepność. Do problematycznych powierzchni – materiał musi być aktywowany.",
                        en: "Do not add matting powder – reduces adhesion. For problem surfaces – material must be activated."
                    }
                }
            },
            { 
                id: "UV",
                name: { ua: "UVILUX UV", pl: "UVILUX UV", en: "UVILUX UV" },
                category: "UV фарби",
                description: {
                    ua: "Фарба та лак УФ для паперу, картону, офсетного друку. Лак UV 150 – ідеальний для офсету та трафаретного друку, особливо для чорних відбитків, проблемних при згинанні.",
                    pl: "Farba i lakier UV do papieru, tektury, druku offsetowego. Lakier UV 150 – idealny do offsetu i druku sitowego, zwłaszcza do czarnych nadruków, problematycznych przy zginaniu.",
                    en: "UV ink and varnish for paper, cardboard, offset printing. UV 150 varnish – ideal for offset and screen printing, especially for black prints problematic when folding."
                },
                properties: {
                    type: {
                        ua: "Farba i lakier UV",
                        pl: "Farba i lakier UV",
                        en: "UV ink and varnish"
                    },
                    finish: {
                        ua: "Високий глянець",
                        pl: "Wysoki połysk",
                        en: "High gloss"
                    },
                    drying: {
                        ua: "УФ промені: 1-2 лампи 80-100 Вт, швидкість 25-30 м/хв",
                        pl: "Promienie UV: 1-2 lampy 80-100 W, prędkość 25-30 m/min",
                        en: "UV rays: 1-2 lamps 80-100 W, speed 25-30 m/min"
                    },
                    mesh: {
                        ua: "P140-P185T (алюміній/золото: P120, флуо: P90, стандарт: P150)",
                        pl: "P140-P185T (aluminium/złoto: P120, fluo: P90, standard: P150)",
                        en: "P140-P185T (aluminum/gold: P120, fluo: P90, standard: P150)"
                    },
                    cleaning: {
                        ua: "CT 1000 або CT 1000/l",
                        pl: "CT 1000 lub CT 1000/l",
                        en: "CT 1000 or CT 1000/l"
                    },
                    storage: {
                        ua: "1-2 роки у темних контейнерах при 5-25°C",
                        pl: "1-2 lata w ciemnych pojemnikach w temp. 5-25°C",
                        en: "1-2 years in dark containers at 5-25°C"
                    },
                    resistance: {
                        ua: "Дуже хороша для всіх кольорів, можливе легке пожовтіння лаку через рік",
                        pl: "Bardzo dobra dla wszystkich kolorów, możliwe lekkie żółknięcie lakieru po roku",
                        en: "Very good for all colors, possible slight yellowing of varnish after one year"
                    },
                    thinning: {
                        ua: "UV 2000 – стандартний розчинник",
                        pl: "UV 2000 – standardowy rozcieńczalnik",
                        en: "UV 2000 – standard thinner"
                    },
                    additives: {
                        ua: "—",
                        pl: "—",
                        en: "—"
                    },
                    special: {
                        ua: "Висока еластичність – можна згинати/складати (важливо для POS-матеріалів). Продукти UV не містять розчинників.",
                        pl: "Wysoka elastyczność – można zginać/składać (ważne dla materiałów POS). Produkty UV nie zawierają rozpuszczalników.",
                        en: "High elasticity – can be bent/folded (important for POS materials). UV products are solvent-free."
                    }
                }
            },
            { 
                id: "NST",
                name: { ua: "NYLONSTAR NST", pl: "NYLONSTAR NST", en: "NYLONSTAR NST" },
                category: "Текстиль",
                description: {
                    ua: "Розчинникова фарба для поліаміду (нейлон) та сумок non-woven. Висока еластичність, стійкість до стирання, атмосферних впливів та прання.",
                    pl: "Farba rozpuszczalnikowa do poliamidu (nylon) i toreb non-woven. Wysoka elastyczność, odporność na ścieranie, warunki atmosferyczne i pranie.",
                    en: "Solvent-based ink for polyamide (nylon) and non-woven bags. High elasticity, abrasion resistance, weather and wash resistance."
                },
                properties: {
                    type: {
                        ua: "Farba rozpuszczalnikowa",
                        pl: "Farba rozpuszczalnikowa",
                        en: "Solvent-based ink"
                    },
                    finish: {
                        ua: "Сатиновий",
                        pl: "Satyna",
                        en: "Satin"
                    },
                    drying: {
                        ua: "5 хв на відкритому повітрі, миттєво в тунелі",
                        pl: "5 min na otwartym powietrzu, natychmiastowo w tunelu",
                        en: "5 min open air, instantly in tunnel"
                    },
                    mesh: {
                        ua: "P45-P90",
                        pl: "P45-P90",
                        en: "P45-P90"
                    },
                    cleaning: {
                        ua: "CT 1000 або CT 1000/1",
                        pl: "CT 1000 lub CT 1000/1",
                        en: "CT 1000 or CT 1000/1"
                    },
                    storage: {
                        ua: "Понад 24 місяці",
                        pl: "Ponad 24 miesiące",
                        en: "Over 24 months"
                    },
                    resistance: {
                        ua: "Висока стійкість до прання та атмосферних умов; для покращення – 5% HNST SLOW",
                        pl: "Wysoka odporność na pranie i warunki atmosferyczne; dla poprawy – 5% HNST SLOW",
                        en: "High wash and weather resistance; for improvement – 5% HNST SLOW"
                    },
                    thinning: {
                        ua: "До 15% сповільнювача NST 1702",
                        pl: "Do 15% opóźniacza NST 1702",
                        en: "Up to 15% retarder NST 1702"
                    },
                    additives: {
                        ua: "HNST SLOW – каталізатор до 5%; NST 150 – прозора база (знижує криття та світлостійкість); MP 3000 – загусник 1-2%",
                        pl: "HNST SLOW – katalizator do 5%; NST 150 – baza przezroczysta (zmniejsza krycie i odporność na światło); MP 3000 – zagęstnik 1-2%",
                        en: "HNST SLOW – catalyst up to 5%; NST 150 – transparent base (reduces opacity and lightfastness); MP 3000 – thickener 1-2%"
                    },
                    special: {
                        ua: "Ультракриючі кольори: 40, 42, 56. Прозорі кольори: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Флуо – нижча світлостійкість. Всі кольори змішуються.",
                        pl: "Ultrakryjące kolory: 40, 42, 56. Przezroczyste kolory: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – niższa odporność na światło. Wszystkie kolory mieszają się.",
                        en: "Ultra-opaque colors: 40, 42, 56. Transparent colors: 15, 25, 35, 55, 65, 75, 130-136, 140-143. Fluo – lower lightfastness. All colors are mixable."
                    }
                }
            }
        ];

        // ---------- БАЗОВІ КОЛЬОРИ (вже багатомовні) ----------
        const baseColors = [
            { code: "10", name: { ua: "Фіолетовий", pl: "Fioletowy", en: "Violet" }, color: "#800080" },
            { code: "20", name: { ua: "Синій", pl: "Niebieski", en: "Blue" }, color: "#0000FF" },
            { code: "20/B", name: { ua: "Синій Flex", pl: "Niebieski Flex", en: "Blue Flex" }, color: "#1E90FF" },
            { code: "P20/5", name: { ua: "Pantone Blue", pl: "Pantone Blue", en: "Pantone Blue" }, color: "#0066CC" },
            { code: "22", name: { ua: "Ультрамарин", pl: "Ultramaryna", en: "Ultramarine" }, color: "#4169E1" },
            { code: "24", name: { ua: "Блакитний", pl: "Niebieski jasny", en: "Light Blue" }, color: "#87CEEB" },
            { code: "26", name: { ua: "Світло-блакитний", pl: "Jasnoniebieski", en: "Light Blue 2" }, color: "#ADD8E6" },
            { code: "P26/2", name: { ua: "Pantone Blue 2", pl: "Pantone Blue 2", en: "Pantone Blue 2" }, color: "#6495ED" },
            { code: "27", name: { ua: "Бірюзовий", pl: "Turkusowy", en: "Turquoise" }, color: "#40E0D0" },
            { code: "30", name: { ua: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" }, color: "#006400" },
            { code: "31", name: { ua: "Зелений", pl: "Zielony", en: "Green" }, color: "#008000" },
            { code: "32", name: { ua: "Яскраво-зелений", pl: "Jasnozielony", en: "Bright Green" }, color: "#00FF00" },
            { code: "33", name: { ua: "Зелений трава", pl: "Zielony trawa", en: "Grass Green" }, color: "#7CFC00" },
            { code: "40", name: { ua: "Жовтий", pl: "Żółty", en: "Yellow" }, color: "#FFFF00" },
            { code: "41", name: { ua: "Цитриновий", pl: "Cytrynowy", en: "Lemon Yellow" }, color: "#FFFACD" },
            { code: "42", name: { ua: "Медовий", pl: "Miodowy", en: "Honey Yellow" }, color: "#F0E68C" },
            { code: "50", name: { ua: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" }, color: "#FFA500" },
            { code: "51", name: { ua: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange" }, color: "#FFB347" },
            { code: "56", name: { ua: "Червоний", pl: "Czerwony", en: "Red" }, color: "#FF0000" },
            { code: "60", name: { ua: "Темно-червоний", pl: "Ciemnoczerwony", en: "Dark Red" }, color: "#8B0000" },
            { code: "P60/38", name: { ua: "Pantone Red", pl: "Pantone Red", en: "Pantone Red" }, color: "#DC143C" },
            { code: "61", name: { ua: "Малиновий", pl: "Karminowy", en: "Carmine" }, color: "#DC143C" },
            { code: "P61/15", name: { ua: "Pantone Magenta", pl: "Pantone Magenta", en: "Pantone Magenta" }, color: "#FF00FF" },
            { code: "70", name: { ua: "Магента", pl: "Magenta", en: "Magenta" }, color: "#FF00FF" },
            { code: "80", name: { ua: "Коричневий", pl: "Brązowy", en: "Brown" }, color: "#A52A2A" },
            { code: "81", name: { ua: "Темно-коричневий", pl: "Ciemnobrązowy", en: "Dark Brown" }, color: "#8B4513" },
            { code: "82", name: { ua: "Бежевий", pl: "Beżowy", en: "Beige" }, color: "#F5F5DC" },
            { code: "90", name: { ua: "Білий", pl: "Biały", en: "White" }, color: "#FFFFFF" },
            { code: "91", name: { ua: "Криючий білий", pl: "Biały kryjący", en: "Opaque White" }, color: "#F8F8FF" },
            { code: "100", name: { ua: "Чорний", pl: "Czarny", en: "Black" }, color: "#000000" },
            { code: "110", name: { ua: "Срібло", pl: "Srebro", en: "Silver" }, color: "#C0C0C0" },
            { code: "120", name: { ua: "Золото", pl: "Złoto", en: "Gold" }, color: "#FFD700" },
            { code: "130", name: { ua: "Флуо жовтий", pl: "Fluo żółty", en: "Fluo Yellow" }, color: "#FFFF00" },
            { code: "131", name: { ua: "Флуо оранж", pl: "Fluo pomarańcz", en: "Fluo Orange" }, color: "#FFA500" },
            { code: "132", name: { ua: "Флуо червоний", pl: "Fluo czerwony", en: "Fluo Red" }, color: "#FF0000" },
            { code: "133", name: { ua: "Флуо рожевий", pl: "Fluo różowy", en: "Fluo Pink" }, color: "#FF69B4" },
            { code: "134", name: { ua: "Флуо зелений", pl: "Fluo zielony", en: "Fluo Green" }, color: "#00FF00" },
            { code: "135", name: { ua: "Флуо синій", pl: "Fluo niebieski", en: "Fluo Blue" }, color: "#0000FF" },
            { code: "136", name: { ua: "Флуо блакитний", pl: "Fluo jasnoniebieski", en: "Fluo Light Blue" }, color: "#87CEEB" },
            { code: "140", name: { ua: "CMYK Yellow", pl: "CMYK Yellow", en: "CMYK Yellow" }, color: "#FFFF00" },
            { code: "141", name: { ua: "CMYK Cyan", pl: "CMYK Cyan", en: "CMYK Cyan" }, color: "#00FFFF" },
            { code: "142", name: { ua: "CMYK Magenta", pl: "CMYK Magenta", en: "CMYK Magenta" }, color: "#FF00FF" },
            { code: "143", name: { ua: "CMYK Black", pl: "CMYK Black", en: "CMYK Black" }, color: "#000000" },
            { code: "15", name: { ua: "Прозорий фіолетовий", pl: "Transparent fioletowy", en: "Transparent Violet" }, color: "#E0B0FF" },
            { code: "25", name: { ua: "Прозорий синій", pl: "Transparent niebieski", en: "Transparent Blue" }, color: "#A0C8F0" },
            { code: "35", name: { ua: "Прозорий зелений", pl: "Transparent zielony", en: "Transparent Green" }, color: "#A0D6B4" },
            { code: "55", name: { ua: "Прозорий оранжевий", pl: "Transparent pomarańczowy", en: "Transparent Orange" }, color: "#FFDAB9" },
            { code: "65", name: { ua: "Прозорий червоний", pl: "Transparent czerwony", en: "Transparent Red" }, color: "#FFB6C1" },
            { code: "75", name: { ua: "Прозорий рожевий", pl: "Transparent różowy", en: "Transparent Pink" }, color: "#FFC0CB" }
        ];

        // ---------- ГЕНЕРАЦІЯ ФАРБ ІЗ БАГАТОМОВНИМИ ПОЛЯМИ ----------
        function generatePaintsFromBaseColors() {
            const paints = [];
            let counter = 1;
            
            series.forEach(serie => {
                baseColors.forEach(baseColor => {
                    // Для кожного кольору створюємо об'єкт з окремими мовними версіями
                    const paint = {
                        id: `paint-${counter++}`,
                        name: `${serie.id}${baseColor.code}`,
                        series: serie.id,
                        baseColorCode: baseColor.code,
                        category: serie.category, // тепер рядок
                        color: baseColor.color,
                        manufacturer: "SICO",
                        article: `${serie.id}-${baseColor.code}`,
                        properties: serie.properties, // залишаємо багатомовний об'єкт
                        colorCode: baseColor.code,
                        isDefault: true,
                        // Багатомовні поля
                        displayName: {
                            ua: `${serie.name.ua} ${baseColor.name.ua}`,
                            pl: `${serie.name.pl} ${baseColor.name.pl}`,
                            en: `${serie.name.en} ${baseColor.name.en}`
                        },
                        description: {
                            ua: `${serie.description.ua} Колір: ${baseColor.name.ua}`,
                            pl: `${serie.description.pl} Kolor: ${baseColor.name.pl}`,
                            en: `${serie.description.en} Color: ${baseColor.name.en}`
                        },
                        fullInfo: {
                            ua: `Серія: ${serie.name.ua}, Колір: ${baseColor.code} - ${baseColor.name.ua}, Категорія: ${serie.category}`,
                            pl: `Seria: ${serie.name.pl}, Kolor: ${baseColor.code} - ${baseColor.name.pl}, Kategoria: ${serie.category}`,
                            en: `Series: ${serie.name.en}, Color: ${baseColor.code} - ${baseColor.name.en}, Category: ${serie.category}`
                        },
                        colorName: {
                            ua: baseColor.name.ua,
                            pl: baseColor.name.pl,
                            en: baseColor.name.en
                        }
                    };
                    paints.push(paint);
                });
            });

            // ---------- СПЕЦІАЛЬНІ ФАРБИ EC (з перевіркою наявності) ----------
            const ecSeries = series.find(s => s.id === "EC");
            if (ecSeries) {
                // EC60/146
                paints.push({
                    id: `paint-${counter++}`,
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
                        ua: "EC Вогненно-червоний 60/146",
                        pl: "EC Ognista czerwień 60/146",
                        en: "EC Fire red 60/146"
                    },
                    description: {
                        ua: "Вогненно-червоний колір з екстремально довгою світлостійкістю. Відтінок як №60.",
                        pl: "Ognista czerwień o ekstremalnie długiej odporności na światło. Odcień jak nr 60.",
                        en: "Fire red color with extremely long lightfastness. Shade like No. 60."
                    },
                    fullInfo: {
                        ua: `Серія: EC, Спеціальний колір: EC 60/146 - Вогненно-червоний`,
                        pl: `Seria: EC, Kolor specjalny: EC 60/146 - Ognista czerwień`,
                        en: `Series: EC, Special color: EC 60/146 - Fire red`
                    },
                    colorName: {
                        ua: "Вогненно-червоний",
                        pl: "Ognista czerwień",
                        en: "Fire red"
                    }
                });
                // EC61/163
                paints.push({
                    id: `paint-${counter++}`,
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
                        ua: "EC Темно-вогненно-червоний 61/163",
                        pl: "EC Ciemna ognista czerwień 61/163",
                        en: "EC Dark fire red 61/163"
                    },
                    description: {
                        ua: "Темно-вогненно-червоний колір з екстремально довгою світлостійкістю. Відтінок як №61.",
                        pl: "Ciemna ognista czerwień o ekstremalnie długiej odporności na światło. Odcień jak nr 61.",
                        en: "Dark fire red color with extremely long lightfastness. Shade like No. 61."
                    },
                    fullInfo: {
                        ua: `Серія: EC, Спеціальний колір: EC 61/163 - Темно-вогненно-червоний`,
                        pl: `Seria: EC, Kolor specjalny: EC 61/163 - Ciemna ognista czerwień`,
                        en: `Series: EC, Special color: EC 61/163 - Dark fire red`
                    },
                    colorName: {
                        ua: "Темно-вогненно-червоний",
                        pl: "Ciemna ognista czerwień",
                        en: "Dark fire red"
                    }
                });
                // EC91Q
                paints.push({
                    id: `paint-${counter++}`,
                    name: "EC91Q",
                    series: "EC",
                    baseColorCode: "91Q",
                    category: ecSeries.category,
                    color: "#F8F8FF",
                    manufacturer: "SICO",
                    article: "EC-91Q",
                    properties: (() => {
                        // копіюємо властивості, але змінюємо finish на напівмат
                        let props = JSON.parse(JSON.stringify(ecSeries.properties));
                        props.finish = {
                            ua: "Напівмат",
                            pl: "Półmat",
                            en: "Semi-matte"
                        };
                        return props;
                    })(),
                    colorCode: "91Q",
                    isDefault: true,
                    displayName: {
                        ua: "EC Напівматова біла 91 Q",
                        pl: "EC Biała półmatowa 91 Q",
                        en: "EC Semi-matte white 91 Q"
                    },
                    description: {
                        ua: "Напівматова біла фарба з вищою в'язкістю для вбирних паперів та картону. Також підходить для ПВХ, наклейок, ABS, Forex.",
                        pl: "Biała farba półmatowa o wyższej lepkości do chłonnych papierów i tektury. Nadaje się również do PCV, naklejek, ABS, Forex.",
                        en: "Semi-matte white ink with higher viscosity for absorbent papers and cardboard. Also suitable for PVC, stickers, ABS, Forex."
                    },
                    fullInfo: {
                        ua: `Серія: EC, Спеціальний колір: EC 91 Q - Напівматова біла`,
                        pl: `Seria: EC, Kolor specjalny: EC 91 Q - Biała półmatowa`,
                        en: `Series: EC, Special color: EC 91 Q - Semi-matte white`
                    },
                    colorName: {
                        ua: "Напівматова біла",
                        pl: "Biała półmatowa",
                        en: "Semi-matte white"
                    }
                });
                // ECRG120
                paints.push({
                    id: `paint-${counter++}`,
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
                        ua: "EC Золота RG 120",
                        pl: "EC Złota RG 120",
                        en: "EC Gold RG 120"
                    },
                    description: {
                        ua: "Золота фарба, готова до використання. Без необхідності змішування.",
                        pl: "Złota farba gotowa do użycia. Bez konieczności mieszania.",
                        en: "Gold ink, ready to use. No mixing required."
                    },
                    fullInfo: {
                        ua: `Серія: EC, Спеціальний колір: EC RG 120 - Золото`,
                        pl: `Seria: EC, Kolor specjalny: EC RG 120 - Złoto`,
                        en: `Series: EC, Special color: EC RG 120 - Gold`
                    },
                    colorName: {
                        ua: "Золото",
                        pl: "Złoto",
                        en: "Gold"
                    }
                });
            }

            return paints;
        }

        // ---------- ІНШІ СТРУКТУРИ ДАНИХ ----------
        const paints = generatePaintsFromBaseColors();
        const recipes = []; // початково порожньо
        const categories = Array.from(new Set(series.map(s => s.category))).sort();
        
        const units = [
            { value: "г", label: { ua: "Грами", pl: "Gramy", en: "Grams" } },
            { value: "кг", label: { ua: "Кілограми", pl: "Kilogramy", en: "Kilograms" } },
            { value: "мл", label: { ua: "Мілілітри", pl: "Mililitry", en: "Milliliters" } },
            { value: "л", label: { ua: "Літри", pl: "Litry", en: "Liters" } },
            { value: "шт", label: { ua: "Штуки", pl: "Sztuki", en: "Pieces" } },
            { value: "%", label: { ua: "Відсотки", pl: "Procenty", en: "Percent" } }
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
            theme: "dark",
            notifications: true,
            defaultCategory: "Універсальні",
            defaultUnit: "г",
            calculationsPrecision: 2,
            defaultSeries: "EC"
        };

        console.log(`[SICOMIX] Згенеровано ${paints.length} фарб (багатомовна версія)`);
        console.log(`[SICOMIX] Базових кольорів: ${baseColors.length}, серій: ${series.length}`);

        return {
            paints,
            recipes,
            series,
            baseColors,
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
            categories: [],
            units: [],
            fileFormats: [],
            languages: [],
            defaultSettings: {}
        };
    }
})();
