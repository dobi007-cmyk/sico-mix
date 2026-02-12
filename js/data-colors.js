if (!window.SICOMIX) window.SICOMIX = {};

SICOMIX.data = (function() {
    // -------------------------------------------------
    // 1. SERIE FARB – pełne karty techniczne (wielojęzyczne)
    // -------------------------------------------------
    const series = [
        {
            id: 'EC',
            name: { pl: 'EC', en: 'EC', uk: 'EC' },
            fullName: { pl: 'EcoColor', en: 'EcoColor', uk: 'EcoColor' },
            type: { pl: 'rozpuszczalnikowa', en: 'solvent-based', uk: 'розчинникова' },
            finish: { pl: 'wysoki połysk', en: 'high gloss', uk: 'високий глянець' },
            mesh: { pl: 'P77–P120', en: 'P77–P120', uk: 'P77–P120' },
            substrates: [
                { pl: 'papier', en: 'paper', uk: 'папір' },
                { pl: 'karton', en: 'cardboard', uk: 'картон' },
                { pl: 'PCV miękkie', en: 'soft PVC', uk: 'м\'який ПВХ' },
                { pl: 'PCV twarde', en: 'hard PVC', uk: 'твердий ПВХ' },
                { pl: 'materiały samoprzylepne', en: 'self-adhesive materials', uk: 'самоклейні матеріали' },
                { pl: 'metale lakierowane', en: 'lacquered metals', uk: 'лаковані метали' },
                { pl: 'polipropylen*', en: 'polypropylene*', uk: 'поліпропілен*' },
                { pl: 'priplack*', en: 'priplack*', uk: 'priplack*' },
                { pl: 'biprint*', en: 'biprint*', uk: 'biprint*' },
                { pl: 'ABS*', en: 'ABS*', uk: 'ABS*' },
                { pl: 'forex*', en: 'forex*', uk: 'forex*' },
                { pl: 'banery*', en: 'banners*', uk: 'банери*' },
                { pl: 'canvas*', en: 'canvas*', uk: 'canvas*' }
            ],
            // Parametry z tabeli ogólnej (Przewodnik po farbach)
            curingDrop: 1.0,      // spadek utrwalania %
            dilutionRate: 15,     // stopień rozcieńczenia %
            curingRate: 5,       // stopień utwardzenia %
            thinners: [
                { code: 'EC 1000', name: { pl: 'szybki rozcieńczalnik', en: 'fast thinner', uk: 'швидкий розчинник' } },
                { code: 'EC 2000', name: { pl: 'normalny rozcieńczalnik', en: 'normal thinner', uk: 'звичайний розчинник' } },
                { code: 'EC 3000', name: { pl: 'lekko opóźniający', en: 'slightly retarding', uk: 'злегка сповільнюючий' } },
                { code: 'EC 4000', name: { pl: 'lekko opóźniający', en: 'slightly retarding', uk: 'злегка сповільнюючий' } },
                { code: 'EC 5000', name: { pl: 'powolny / opóźniacz standardowy', en: 'slow / standard retarder', uk: 'повільний / стандартний сповільнювач' } },
                { code: 'EC 8000', name: { pl: 'bardzo powolny', en: 'very slow', uk: 'дуже повільний' } },
                { code: 'EC 1300', name: { pl: 'normalny do farb Fluo', en: 'normal for Fluo inks', uk: 'звичайний для флуо фарб' } },
                { code: 'EC 1301', name: { pl: 'wolny do farb Fluo', en: 'slow for Fluo inks', uk: 'повільний для флуо фарб' } }
            ],
            additives: [
                { code: 'EC 160', name: { pl: 'pasta kryjąca', en: 'opaque paste', uk: 'криюча паста' }, usage: { pl: '20–50% dla wydruków rastrowych', en: '20–50% for raster prints', uk: '20–50% для растрового друку' } },
                { code: 'EC 150', name: { pl: 'baza transparentna', en: 'transparent base', uk: 'прозора база' }, usage: { pl: 'żywiość kolorów, zmniejsza krycie i odporność na światło', en: 'color vividness, reduces opacity and lightfastness', uk: 'яскравість кольорів, зменшує криття та світлостійкість' } },
                { code: 'EC 1501 HG', name: { pl: 'lakier zabezpieczający', en: 'protective varnish', uk: 'захисний лак' }, usage: { pl: 'wysoki połysk', en: 'high gloss', uk: 'високий глянець' } },
                { code: 'AS 1000', name: { pl: 'antystatyk', en: 'antistatic agent', uk: 'антистатик' }, usage: { pl: 'do 5%', en: 'up to 5%', uk: 'до 5%' } },
                { code: 'EC 170', name: { pl: 'opóźniacz w żelu', en: 'gel retarder', uk: 'гелевий сповільнювач' }, usage: { pl: '15–20%', en: '15–20%', uk: '15–20%' } },
                { code: 'EC 1702', name: { pl: 'opóźniacz w żelu (wolniejszy)', en: 'gel retarder (slower)', uk: 'гелевий сповільнювач (повільніший)' }, usage: { pl: '15–20%', en: '15–20%', uk: '15–20%' } },
                { code: 'MP 1000', name: { pl: 'proszek matujący', en: 'matting powder', uk: 'матувальний порошок' }, usage: { pl: '5–10%', en: '5–10%', uk: '5–10%' } },
                { code: 'EC 150/10', name: { pl: 'pasta matująca', en: 'matting paste', uk: 'матувальна паста' }, usage: { pl: 'bez ograniczeń', en: 'unlimited', uk: 'без обмежень' } },
                { code: 'MP 3000', name: { pl: 'zagęszczacz', en: 'thickener', uk: 'загусник' }, usage: { pl: '1–3%', en: '1–3%', uk: '1–3%' } }
            ],
            hardeners: [
                { code: 'HEC', name: { pl: 'utwardzacz', en: 'hardener', uk: 'затверджувач' }, usage: { pl: '3–5% – do polipropylenu, priplacku, biprint, ABS, forex, banery, canvas', en: '3–5% – for polypropylene, priplack, biprint, ABS, forex, banners, canvas', uk: '3–5% – для поліпропілену, priplack, biprint, ABS, forex, банерів, canvas' } }
            ],
            specialColors: [
                { code: '60/146', name: { pl: 'Ognisty czerwony', en: 'Fire red', uk: 'Вогняний червоний' }, description: { pl: 'ekstremalnie długa odporność na światło, odcień jak nr 60', en: 'extremely long lightfastness, shade like No. 60', uk: 'екстремально довга світлостійкість, відтінок як №60' } },
                { code: '61/163', name: { pl: 'Ciemna ognista czerwień', en: 'Dark fire red', uk: 'Темний вогняний червоний' }, description: { pl: 'ekstremalnie długa odporność na światło, odcień jak nr 61', en: 'extremely long lightfastness, shade like No. 61', uk: 'екстремально довга світлостійкість, відтінок як №61' } },
                { code: '91 Q', name: { pl: 'Biała półmatowa', en: 'Semi-gloss white', uk: 'Білий напівматовий' }, description: { pl: 'wyższa lepkość, do chłonnych papierów i tektury, PCV, naklejek, ABS, Forex', en: 'higher viscosity, for absorbent papers and cardboard, PVC, stickers, ABS, Forex', uk: 'вища в\'язкість, для вбирного паперу та картону, ПВХ, наклейок, ABS, Forex' } }
            ],
            storage: { pl: 'nieograniczone', en: 'unlimited', uk: 'необмежений' },
            yield: { pl: '~40 m²/l (zależne od sita)', en: '~40 m²/l (depends on mesh)', uk: '~40 м²/л (залежить від сітки)' },
            cleaning: { pl: 'CT 1000 / CT 1000/1', en: 'CT 1000 / CT 1000/1', uk: 'CT 1000 / CT 1000/1' }
        },
        {
            id: 'SPTN',
            name: { pl: 'SPTN', en: 'SPTN', uk: 'SPTN' },
            fullName: { pl: 'Sicoplast', en: 'Sicoplast', uk: 'Sicoplast' },
            type: { pl: 'plastizol (rozpuszczalnikowa)', en: 'plastisol (solvent-based)', uk: 'пластизоль (розчинникова)' },
            finish: { pl: 'satynowe, miękkie, bardzo elastyczne', en: 'satin, soft, very flexible', uk: 'сатинове, м\'яке, дуже еластичне' },
            mesh: { pl: '34–90 wł./cm (standard), 77–120 (triada), 15 (błyszczące)', en: '34–90 threads/cm (standard), 77–120 (process), 15 (glossy)', uk: '34–90 ниток/см (стандарт), 77–120 (тріада), 15 (блискучі)' },
            substrates: [
                { pl: 'tkaniny naturalne', en: 'natural fabrics', uk: 'натуральні тканини' },
                { pl: 'tkaniny syntetyczne', en: 'synthetic fabrics', uk: 'синтетичні тканини' },
                { pl: 'nylon*', en: 'nylon*', uk: 'нейлон*' }
            ],
            curingDrop: 4.0,
            dilutionRate: 30,
            curingRate: 5,
            thinners: [
                { code: 'SPT nr 1 / SPTN 1000', name: { pl: 'rozcieńczalnik', en: 'thinner', uk: 'розчинник' }, usage: { pl: 'do 5%', en: 'up to 5%', uk: 'до 5%' } }
            ],
            additives: [
                { code: 'SPTN 91/l', name: { pl: 'opaque white', en: 'opaque white', uk: 'криючий білий' }, usage: { pl: 'bardzo kryjąca, elastyczna', en: 'very opaque, flexible', uk: 'дуже криючий, еластичний' } },
                { code: 'SPTHNYL', name: { pl: 'dodatek do nylonu', en: 'nylon additive', uk: 'додаток для нейлону' }, usage: { pl: 'do 10%, przyczepność – farba ważna 24h', en: 'up to 10%, adhesion – ink usable 24h', uk: 'до 10%, адгезія – фарба придатна 24 год' } },
                { code: 'Baza puchnąca', name: { pl: 'baza puchnąca', en: 'puff base', uk: 'пухка база' }, usage: { pl: 'do druku bezpośredniego', en: 'for direct printing', uk: 'для прямого друку' } },
                { code: 'Klej transferowy SPT nr 2', name: { pl: 'klej z proszkiem', en: 'adhesive with powder', uk: 'клей з порошком' }, usage: { pl: 'transfer, ważny 48h', en: 'transfer, usable 48h', uk: 'трансфер, придатний 48 год' } }
            ],
            hardeners: [
                { code: 'Nyloncoat', name: { pl: 'utwardzacz do nylonu', en: 'nylon hardener', uk: 'затверджувач для нейлону' }, usage: { pl: '±5%, farba ważna 24h', en: '±5%, ink usable 24h', uk: '±5%, фарба придатна 24 год' } }
            ],
            transfer: { pl: 'proszki Soft nr 3, nr 12 (150°C/20s) lub nr 4 (175°C/20s)', en: 'Soft powders No. 3, No. 12 (150°C/20s) or No. 4 (175°C/20s)', uk: 'порошки Soft №3, №12 (150°C/20с) або №4 (175°C/20с)' },
            storage: { pl: '±5 lat (5–20°C)', en: '±5 years (5–20°C)', uk: '±5 років (5–20°C)' },
            curing: { pl: '150–170°C / ~2 min', en: '150–170°C / ~2 min', uk: '150–170°C / ~2 хв' },
            cleaning: { pl: 'CT 1000/l', en: 'CT 1000/l', uk: 'CT 1000/l' }
        },
        {
            id: 'OTF',
            name: { pl: 'OTF', en: 'OTF', uk: 'OTF' },
            fullName: { pl: 'Opatex', en: 'Opatex', uk: 'Opatex' },
            type: { pl: 'wodna, super kryjąca', en: 'water-based, super opaque', uk: 'водна, суперкриюча' },
            finish: { pl: 'kryjąca', en: 'opaque', uk: 'криюча' },
            mesh: { pl: 'P34T–P77T', en: 'P34T–P77T', uk: 'P34T–P77T' },
            substrates: [
                { pl: 'ciemne tkaniny', en: 'dark fabrics', uk: 'темні тканини' },
                { pl: 'tkaniny naturalne', en: 'natural fabrics', uk: 'натуральні тканини' },
                { pl: 'większość syntetycznych', en: 'most synthetic fabrics', uk: 'більшість синтетичних тканин' },
                { pl: 'nylon*', en: 'nylon*', uk: 'нейлон*' }
            ],
            curingDrop: 8.0,
            dilutionRate: 50,
            curingRate: 5,
            thinners: [
                { code: 'woda', name: { pl: 'woda', en: 'water', uk: 'вода' }, usage: { pl: 'max 10%', en: 'max 10%', uk: 'макс 10%' } },
                { code: 'OTF 5000', name: { pl: 'powolny reduktor', en: 'slow reducer', uk: 'повільний редуктор' }, usage: { pl: 'max 10% (łącznie z wodą)', en: 'max 10% (together with water)', uk: 'макс 10% (разом з водою)' } },
                { code: 'OTF 7000', name: { pl: 'elastyczny reduktor', en: 'flexible reducer', uk: 'еластичний редуктор' }, usage: { pl: 'max 10%', en: 'max 10%', uk: 'макс 10%' } }
            ],
            additives: [
                { code: 'OTF 150/14', name: { pl: 'lakier do transferu', en: 'transfer varnish', uk: 'лак для трансферу' }, usage: { pl: 'wysoka odporność, elastyczność', en: 'high resistance, flexibility', uk: 'висока стійкість, еластичність' } },
                { code: 'OTF 150/18', name: { pl: 'lakier powolny', en: 'slow varnish', uk: 'повільний лак' } },
                { code: 'OTF 100/101', name: { pl: 'czarny bloker', en: 'black blocker', uk: 'чорний блокатор' }, usage: { pl: 'przeciw migracji, poliester, soft shell', en: 'anti-migration, polyester, soft shell', uk: 'проти міграції, поліестер, soft shell' } },
                { code: 'Baza puchnąca OTF', name: { pl: 'baza puchnąca', en: 'puff base', uk: 'пухка база' }, usage: { pl: '100g + 5g pigmentu PPT, tylko direct', en: '100g + 5g PPT pigment, direct only', uk: '100г + 5г пігменту PPT, тільки прямий друк' } },
                { code: 'PPT', name: { pl: 'pasty pigmentowe', en: 'pigment pastes', uk: 'пігментні пасти' }, usage: { pl: 'max 5% dla nasycenia', en: 'max 5% for saturation', uk: 'макс 5% для насиченості' } }
            ],
            hardeners: [
                { code: 'HOT', name: { pl: 'utwardzacz', en: 'hardener', uk: 'затверджувач' }, usage: { pl: '3% – przyczepność do nylonu, pranie bez utrwalania cieplnego', en: '3% – adhesion to nylon, wash resistance without heat fixation', uk: '3% – адгезія до нейлону, прання без термозакріплення' } }
            ],
            transfer: { pl: 'proszki nr 3,4,12,13; Transferglue OTF nr 2; Cold Peel 150–180°C/20s', en: 'powders No. 3,4,12,13; Transferglue OTF No. 2; Cold Peel 150–180°C/20s', uk: 'порошки №3,4,12,13; Transferglue OTF №2; Cold Peel 150–180°C/20с' },
            storage: { pl: '1–2 lata (10–25°C)', en: '1–2 years (10–25°C)', uk: '1–2 роки (10–25°C)' },
            curing: { pl: '150°C / 3 min (bez HOT); z HOT – 24h utrwalanie na powietrzu', en: '150°C / 3 min (without HOT); with HOT – 24h air curing', uk: '150°C / 3 хв (без HOT); з HOT – 24 год витримка на повітрі' },
            cleaning: { pl: 'zimna woda + detergent / Aquaclean / CT 1000/63 (przy emulsji rozpuszczalnikowej)', en: 'cold water + detergent / Aquaclean / CT 1000/63 (for solvent-resistant emulsion)', uk: 'холодна вода + миючий засіб / Aquaclean / CT 1000/63 (для емульсії стійкої до розчинників)' }
        },
        {
            id: 'PLUV',
            name: { pl: 'PLUV', en: 'PLUV', uk: 'PLUV' },
            fullName: { pl: 'Uviplast', en: 'Uviplast', uk: 'Uviplast' },
            type: { pl: 'UV', en: 'UV', uk: 'УФ' },
            finish: { pl: 'wysoki połysk', en: 'high gloss', uk: 'високий глянець' },
            mesh: { pl: 'P140–P185T (fluo P90, metaliczne P120)', en: 'P140–P185T (fluo P90, metallic P120)', uk: 'P140–P185T (флуо P90, металеві P120)' },
            substrates: [
                { pl: 'materiały samoprzylepne', en: 'self-adhesive materials', uk: 'самоклейні матеріали' },
                { pl: 'banery', en: 'banners', uk: 'банери' },
                { pl: 'metal lakierowany', en: 'lacquered metal', uk: 'лакований метал' },
                { pl: 'PP', en: 'PP', uk: 'PP' },
                { pl: 'styropian', en: 'styrofoam', uk: 'пінопласт' },
                { pl: 'polietylen (wstępnie aktyw.)', en: 'polyethylene (pre-treated)', uk: 'поліетилен (попередньо активований)' },
                { pl: 'poliwęglan', en: 'polycarbonate', uk: 'полікарбонат' },
                { pl: 'papier', en: 'paper', uk: 'папір' },
                { pl: 'PCW', en: 'PVC', uk: 'ПВХ' }
            ],
            curingDrop: 13.0,
            dilutionRate: 75,
            curingRate: null,
            thinners: [
                { code: 'PLUV 2000', name: { pl: 'standardowy rozcieńczalnik', en: 'standard thinner', uk: 'стандартний розчинник' } }
            ],
            additives: [
                { code: 'PLUV 91', name: { pl: 'modyfikator', en: 'modifier', uk: 'модифікатор' }, usage: { pl: 'max 20% w mieszankach, inaczej spadek przyczepności', en: 'max 20% in mixtures, otherwise adhesion drop', uk: 'макс 20% у сумішах, інакше зниження адгезії' } },
                { code: 'PLUV 150', name: { pl: 'lakier wysokopołyskowy', en: 'high gloss varnish', uk: 'високоглянцевий лак' }, usage: { pl: 'offset i sitodruk', en: 'offset and screen printing', uk: 'офсет і трафаретний друк' } }
            ],
            hardeners: [
                { code: 'HPLUV', name: { pl: 'katalizator', en: 'catalyst', uk: 'каталізатор' }, usage: { pl: 'do 5% przy trudnych podłożach', en: 'up to 5% for difficult substrates', uk: 'до 5% для складних підкладок' } }
            ],
            storage: { pl: '1–2 lata (5–25°C, czarne pojemniki)', en: '1–2 years (5–25°C, black containers)', uk: '1–2 роки (5–25°C, чорні контейнери)' },
            curing: { pl: 'UV: 1–2 lampy 80–100W, 25–30 m/min', en: 'UV: 1–2 lamps 80–100W, 25–30 m/min', uk: 'УФ: 1–2 лампи 80–100W, 25–30 м/хв' },
            yield: { pl: '60–90 m²/l (sito 140–185T)', en: '60–90 m²/l (mesh 140–185T)', uk: '60–90 м²/л (сітка 140–185T)' },
            cleaning: { pl: 'CT 1000/20 (UV cleaner), CT 1000, CT 1000/1', en: 'CT 1000/20 (UV cleaner), CT 1000, CT 1000/1', uk: 'CT 1000/20 (УФ очищувач), CT 1000, CT 1000/1' }
        },
        {
            id: 'SX',
            name: { pl: 'SX', en: 'SX', uk: 'SX' },
            fullName: { pl: 'Sicotex', en: 'Sicotex', uk: 'Sicotex' },
            type: { pl: 'wodna', en: 'water-based', uk: 'водна' },
            finish: { pl: 'transparentne, żywe kolory', en: 'transparent, vivid colors', uk: 'прозорі, яскраві кольори' },
            mesh: { pl: 'P34–P90 (P90 do CMYK)', en: 'P34–P90 (P90 for CMYK)', uk: 'P34–P90 (P90 для CMYK)' },
            substrates: [
                { pl: 'bawełna', en: 'cotton', uk: 'бавовна' },
                { pl: 'tkaniny syntetyczne', en: 'synthetic fabrics', uk: 'синтетичні тканини' },
                { pl: 'mieszanki', en: 'blends', uk: 'суміші' }
            ],
            // Brak danych w tabeli ogólnej, zostawiamy null
            curingDrop: null,
            dilutionRate: null,
            curingRate: null,
            thinners: [
                { code: 'woda', name: { pl: 'woda', en: 'water', uk: 'вода' }, usage: { pl: 'max 10%', en: 'max 10%', uk: 'макс 10%' } },
                { code: 'SX 5000', name: { pl: 'wolny rozcieńczalnik', en: 'slow thinner', uk: 'повільний розчинник' }, usage: { pl: 'max 10%', en: 'max 10%', uk: 'макс 10%' } }
            ],
            additives: [
                { code: 'SX 150', name: { pl: 'baza transparentna', en: 'transparent base', uk: 'прозора база' }, usage: { pl: 'do samodzielnego przygotowania kolorów', en: 'for custom color mixing', uk: 'для самостійного приготування кольорів' } },
                { code: '11 past pigmentowych', name: { pl: 'pigmenty do baz', en: 'pigment pastes for bases', uk: 'пігментні пасти для баз' }, usage: { pl: 'receptury dostępne', en: 'recipes available', uk: 'рецептури доступні' } }
            ],
            hardeners: [
                { code: 'HSX', name: { pl: 'utwardzacz', en: 'hardener', uk: 'затверджувач' }, usage: { pl: '3% – utwardzanie niekonieczne, farba ważna 24h', en: '3% – curing not necessary, ink usable 24h', uk: '3% – затвердіння не обов\'язкове, фарба придатна 24 год' } }
            ],
            certifications: [
                { pl: 'Oekotex 100 klasa I–IV', en: 'Oekotex 100 class I–IV', uk: 'Oekotex 100 клас I–IV' },
                { pl: 'bez rozpuszczalników', en: 'solvent-free', uk: 'без розчинників' },
                { pl: 'bez metali ciężkich', en: 'heavy metal-free', uk: 'без важких металів' },
                { pl: 'bez PVC', en: 'PVC-free', uk: 'без ПВХ' }
            ],
            storage: { pl: '1–2 lata (temp. dodatnia)', en: '1–2 years (above zero)', uk: '1–2 роки (плюсова температура)' },
            curing: { pl: '150°C / 3 min', en: '150°C / 3 min', uk: '150°C / 3 хв' },
            cleaning: { pl: 'ciepła woda / detergent / myjka ciśnieniowa', en: 'warm water / detergent / pressure washer', uk: 'тепла вода / миючий засіб / мийка високого тиску' }
        },
        {
            id: 'TPP',
            name: { pl: 'TPP', en: 'TPP', uk: 'TPP' },
            fullName: { pl: 'Polypro', en: 'Polypro', uk: 'Polypro' },
            type: { pl: 'rozpuszczalnikowa', en: 'solvent-based', uk: 'розчинникова' },
            finish: { pl: 'satynowe', en: 'satin', uk: 'сатинове' },
            mesh: { pl: 'P90–120', en: 'P90–120', uk: 'P90–120' },
            substrates: [
                { pl: 'polietylen', en: 'polyethylene', uk: 'поліетилен' },
                { pl: 'polipropylen', en: 'polypropylene', uk: 'поліпропілен' },
                { pl: 'poliwęglan', en: 'polycarbonate', uk: 'полікарбонат' },
                { pl: 'priplack', en: 'priplack', uk: 'priplack' },
                { pl: 'akylux', en: 'akylux', uk: 'akylux' },
                { pl: 'duoprop', en: 'duoprop', uk: 'duoprop' }
            ],
            curingDrop: null,
            dilutionRate: null,
            curingRate: null,
            thinners: [
                { code: 'TPP 1000', name: { pl: 'szybki rozcieńczalnik', en: 'fast thinner', uk: 'швидкий розчинник' } },
                { code: 'TPP 2000', name: { pl: 'normalny', en: 'normal', uk: 'звичайний' } },
                { code: 'TPP 3000', name: { pl: 'lekko opóźniający', en: 'slightly retarding', uk: 'злегка сповільнюючий' } },
                { code: 'TPP 4000', name: { pl: 'wolny', en: 'slow', uk: 'повільний' } },
                { code: 'TPP 5000', name: { pl: 'wolny', en: 'slow', uk: 'повільний' } },
                { code: 'TPP 8000', name: { pl: 'bardzo wolny', en: 'very slow', uk: 'дуже повільний' } }
            ],
            additives: [
                { code: 'TPP 160', name: { pl: 'związek tiksotropowy', en: 'thixotropic agent', uk: 'тіксотропна сполука' }, usage: { pl: 'do 10% – wyostrzanie detali', en: 'up to 10% – detail sharpening', uk: 'до 10% – загострення деталей' } },
                { code: 'TPP 150', name: { pl: 'baza transparentna', en: 'transparent base', uk: 'прозора база' }, usage: { pl: 'żywiość kolorów, zmniejsza krycie i odporność na światło', en: 'color vividness, reduces opacity and lightfastness', uk: 'яскравість кольорів, зменшує криття та світлостійкість' } },
                { code: 'AS 1000', name: { pl: 'antystatyk', en: 'antistatic agent', uk: 'антистатик' }, usage: { pl: '5%', en: '5%', uk: '5%' } },
                { code: 'TPP 1702', name: { pl: 'opóźniacz w żelu', en: 'gel retarder', uk: 'гелевий сповільнювач' }, usage: { pl: 'przeciw zatykaniu sita', en: 'prevents screen clogging', uk: 'запобігає забиванню сітки' } }
            ],
            hardeners: [
                { code: 'HTPP SLOW', name: { pl: 'utwardzacz', en: 'hardener', uk: 'затверджувач' }, usage: { pl: 'do trudnych/starych materiałów, farba ważna 1 dzień', en: 'for difficult/old materials, ink usable 1 day', uk: 'для складних/старих матеріалів, фарба придатна 1 день' } }
            ],
            storage: { pl: 'nieograniczone', en: 'unlimited', uk: 'необмежений' },
            curing: { pl: 'powietrze: 10 min; tunel: natychmiast', en: 'air: 10 min; tunnel: immediately', uk: 'повітря: 10 хв; тунель: негайно' },
            yield: { pl: '~40 m²/l', en: '~40 m²/l', uk: '~40 м²/л' },
            cleaning: { pl: 'ST 1000', en: 'ST 1000', uk: 'ST 1000' }
        },
        {
            id: 'UV',
            name: { pl: 'UV', en: 'UV', uk: 'УФ' },
            fullName: { pl: 'Uvilux', en: 'Uvilux', uk: 'Uvilux' },
            type: { pl: 'UV', en: 'UV', uk: 'УФ' },
            finish: { pl: 'wysoki połysk', en: 'high gloss', uk: 'високий глянець' },
            mesh: { pl: 'P140–P185T (fluo P90, metaliczne P120)', en: 'P140–P185T (fluo P90, metallic P120)', uk: 'P140–P185T (флуо P90, металеві P120)' },
            substrates: [
                { pl: 'papier', en: 'paper', uk: 'папір' },
                { pl: 'karton', en: 'cardboard', uk: 'картон' }
            ],
            curingDrop: 12.0,
            dilutionRate: 70,
            curingRate: null,
            thinners: [
                { code: 'UV 2000', name: { pl: 'standardowy rozcieńczalnik', en: 'standard thinner', uk: 'стандартний розчинник' } }
            ],
            additives: [
                { code: 'UV 150', name: { pl: 'lakier', en: 'varnish', uk: 'лак' }, usage: { pl: 'do offsetu i sitodruku, elastyczny', en: 'for offset and screen printing, flexible', uk: 'для офсету і трафаретного друку, еластичний' } }
            ],
            storage: { pl: '1–2 lata (5–25°C, czarne pojemniki)', en: '1–2 years (5–25°C, black containers)', uk: '1–2 роки (5–25°C, чорні контейнери)' },
            curing: { pl: 'UV: 1–2 lampy 80–100W, 25–30 m/min', en: 'UV: 1–2 lamps 80–100W, 25–30 m/min', uk: 'УФ: 1–2 лампи 80–100W, 25–30 м/хв' },
            yield: { pl: '60–90 m²/l', en: '60–90 m²/l', uk: '60–90 м²/л' },
            cleaning: { pl: 'CT 1000 / CT 1000/l', en: 'CT 1000 / CT 1000/l', uk: 'CT 1000 / CT 1000/l' }
        },
        {
            id: 'AS',
            name: { pl: 'AS', en: 'AS', uk: 'AS' },
            fullName: { pl: 'Aquaset', en: 'Aquaset', uk: 'Aquaset' },
            type: { pl: 'wodna', en: 'water-based', uk: 'водна' },
            finish: { pl: 'satynowe (wersja błyszcząca: AQUAGLOSS AG)', en: 'satin (glossy version: AQUAGLOSS AG)', uk: 'сатинове (глянцева версія: AQUAGLOSS AG)' },
            mesh: { pl: 'P77–P140', en: 'P77–P140', uk: 'P77–P140' },
            substrates: [
                { pl: 'karton', en: 'cardboard', uk: 'картон' },
                { pl: 'gruby papier (min.130g/m²)', en: 'thick paper (min. 130g/m²)', uk: 'товстий папір (мін. 130 г/м²)' },
                { pl: 'drewno', en: 'wood', uk: 'дерево' },
                { pl: 'tektura falista', en: 'corrugated cardboard', uk: 'гофрокартон' }
            ],
            curingDrop: 9.0,
            dilutionRate: 55,
            curingRate: null,
            thinners: [
                { code: 'woda', name: { pl: 'woda', en: 'water', uk: 'вода' }, usage: { pl: 'tak', en: 'yes', uk: 'так' } },
                { code: 'AS 5000', name: { pl: 'wolny rozcieńczalnik', en: 'slow thinner', uk: 'повільний розчинник' }, usage: { pl: 'tak', en: 'yes', uk: 'так' } }
            ],
            hardeners: [
                { code: 'utwardzacz AS', name: { pl: 'utwardzacz', en: 'hardener', uk: 'затверджувач' }, usage: { pl: '1% – odporność na wodę, zewnętrze, farba ważna 12h', en: '1% – water resistance, outdoor, ink usable 12h', uk: '1% – водостійкість, зовнішнє застосування, фарба придатна 12 год' } }
            ],
            certifications: [
                { pl: 'ekologiczna', en: 'eco-friendly', uk: 'екологічна' },
                { pl: 'bez metali ciężkich', en: 'heavy metal-free', uk: 'без важких металів' },
                { pl: 'zabawki dziecięce', en: 'children\'s toys', uk: 'дитячі іграшки' },
                { pl: 'opakowania spożywcze', en: 'food packaging', uk: 'харчова упаковка' }
            ],
            storage: { pl: '4 lata (5–25°C)', en: '4 years (5–25°C)', uk: '4 роки (5–25°C)' },
            curing: { pl: 'powietrze: 1h; tunel: natychmiast', en: 'air: 1h; tunnel: immediately', uk: 'повітря: 1 год; тунель: негайно' },
            yield: { pl: 'do 40 m²/l', en: 'up to 40 m²/l', uk: 'до 40 м²/л' },
            cleaning: { pl: 'woda (myjka ciśnieniowa) / Aquaclean', en: 'water (pressure washer) / Aquaclean', uk: 'вода (мийка високого тиску) / Aquaclean' }
        },
        {
            id: 'CF',
            name: { pl: 'CF', en: 'CF', uk: 'CF' },
            fullName: { pl: 'Cartoflex', en: 'Cartoflex', uk: 'Cartoflex' },
            type: { pl: 'rozpuszczalnikowa', en: 'solvent-based', uk: 'розчинникова' },
            finish: { pl: 'półmat', en: 'semi-matt', uk: 'напівматовий' },
            mesh: { pl: 'P77–P120', en: 'P77–P120', uk: 'P77–P120' },
            substrates: [
                { pl: 'karton', en: 'cardboard', uk: 'картон' },
                { pl: 'papier', en: 'paper', uk: 'папір' },
                { pl: 'papiery samoprzylepne', en: 'self-adhesive papers', uk: 'самоклейний папір' },
                { pl: 'drewno', en: 'wood', uk: 'дерево' },
                { pl: 'metale lakierowane', en: 'lacquered metals', uk: 'лаковані метали' },
                { pl: 'syntape', en: 'syntape', uk: 'syntape' },
                { pl: 'laminaty UV', en: 'UV laminates', uk: 'УФ-ламінати' },
                { pl: 'stalowe beczki', en: 'steel drums', uk: 'сталеві бочки' },
                { pl: 'gaśnice', en: 'fire extinguishers', uk: 'вогнегасники' },
                { pl: 'EPS', en: 'EPS', uk: 'EPS' },
                { pl: 'folie Penstick (poliestrowa)', en: 'Penstick films (polyester)', uk: 'плівки Penstick (поліестер)' },
                { pl: 'PET', en: 'PET', uk: 'PET' },
                { pl: 'poliuretan', en: 'polyurethane', uk: 'поліуретан' }
            ],
            curingDrop: 3.0,
            dilutionRate: 25,
            curingRate: null,
            thinners: [
                { code: 'CF 1000', name: { pl: 'szybki', en: 'fast', uk: 'швидкий' } },
                { code: 'CF 2000', name: { pl: 'normalny', en: 'normal', uk: 'звичайний' } },
                { code: 'CF 3000', name: { pl: 'lekko opóźniający', en: 'slightly retarding', uk: 'злегка сповільнюючий' } },
                { code: 'CF 4000', name: { pl: 'lekko opóźniający', en: 'slightly retarding', uk: 'злегка сповільнюючий' } },
                { code: 'CF 5000', name: { pl: 'wolny / opóźniacz standardowy', en: 'slow / standard retarder', uk: 'повільний / стандартний сповільнювач' } },
                { code: 'CF 8000', name: { pl: 'bardzo opóźniający', en: 'very slow', uk: 'дуже повільний' } }
            ],
            additives: [
                { code: 'CF 150', name: { pl: 'baza transparentna', en: 'transparent base', uk: 'прозора база' }, usage: { pl: 'żywiość, mniejsze krycie i odporność na światło', en: 'vividness, lower opacity and lightfastness', uk: 'яскравість, менше криття та світлостійкість' } },
                { code: 'CF 1501 HG', name: { pl: 'lakier wykończeniowy', en: 'finishing varnish', uk: 'фінішний лак' }, usage: { pl: 'wysoki połysk, odporność na ścieranie', en: 'high gloss, abrasion resistance', uk: 'високий глянець, стійкість до стирання' } },
                { code: 'CF 160', name: { pl: 'związek tiksotropowy', en: 'thixotropic agent', uk: 'тіксотропна сполука' }, usage: { pl: 'do 10% – wyostrzanie detali', en: 'up to 10% – detail sharpening', uk: 'до 10% – загострення деталей' } },
                { code: 'CF 1702', name: { pl: 'opóźniacz w żelu', en: 'gel retarder', uk: 'гелевий сповільнювач' }, usage: { pl: 'do 10% – przeciw zasychaniu', en: 'up to 10% – against drying', uk: 'до 10% – проти висихання' } },
                { code: 'AS 1000', name: { pl: 'antystatyk', en: 'antistatic agent', uk: 'антистатик' }, usage: { pl: 'max 5%', en: 'max 5%', uk: 'макс 5%' } }
            ],
            hardeners: [
                { code: 'HCF', name: { pl: 'wolny utwardzacz', en: 'slow hardener', uk: 'повільний затверджувач' }, usage: { pl: '5% – przyczepność do podłoża', en: '5% – adhesion to substrate', uk: '5% – адгезія до підкладки' } }
            ],
            storage: { pl: 'nieograniczone', en: 'unlimited', uk: 'необмежений' },
            curing: { pl: 'powietrze: 4 min; tunel: natychmiast', en: 'air: 4 min; tunnel: immediately', uk: 'повітря: 4 хв; тунель: негайно' },
            yield: { pl: 'do 40 m²/l', en: 'up to 40 m²/l', uk: 'до 40 м²/л' },
            cleaning: { pl: 'CT 1000 / CT 1000/1', en: 'CT 1000 / CT 1000/1', uk: 'CT 1000 / CT 1000/1' }
        },
        {
            id: 'NST',
            name: { pl: 'NST', en: 'NST', uk: 'NST' },
            fullName: { pl: 'Nylonstar', en: 'Nylonstar', uk: 'Nylonstar' },
            type: { pl: 'rozpuszczalnikowa', en: 'solvent-based', uk: 'розчинникова' },
            finish: { pl: 'satynowe, wyjątkowo wysokie krycie', en: 'satin, exceptionally high opacity', uk: 'сатинове, винятково високе криття' },
            mesh: { pl: 'P45–P90', en: 'P45–P90', uk: 'P45–P90' },
            substrates: [
                { pl: 'poliamid (nylon)', en: 'polyamide (nylon)', uk: 'поліамід (нейлон)' },
                { pl: 'non-woven', en: 'non-woven', uk: 'нетканий матеріал' },
                { pl: 'torby sportowe', en: 'sport bags', uk: 'спортивні сумки' },
                { pl: 'parasole', en: 'umbrellas', uk: 'парасолі' }
            ],
            curingDrop: 16.0,
            dilutionRate: 90,
            curingRate: null,
            thinners: [
                { code: 'NST 1702', name: { pl: 'opóźniacz', en: 'retarder', uk: 'сповільнювач' }, usage: { pl: 'do 15%', en: 'up to 15%', uk: 'до 15%' } }
            ],
            additives: [
                { code: 'NST 150', name: { pl: 'baza transparentna', en: 'transparent base', uk: 'прозора база' }, usage: { pl: 'żywiość, zmniejsza krycie i odporność na światło', en: 'vividness, reduces opacity and lightfastness', uk: 'яскравість, зменшує криття та світлостійкість' } },
                { code: 'MP 3000', name: { pl: 'proszek zagęszczający', en: 'thickening powder', uk: 'загущувальний порошок' }, usage: { pl: '1–2%', en: '1–2%', uk: '1–2%' } }
            ],
            hardeners: [
                { code: 'HNST SLOW', name: { pl: 'katalizator', en: 'catalyst', uk: 'каталізатор' }, usage: { pl: 'do 5% – odporność na pranie, przyczepność', en: 'up to 5% – wash resistance, adhesion', uk: 'до 5% – стійкість до прання, адгезія' } }
            ],
            // Specyficzne listy kolorów dla NST (wg dokumentu)
            seriesSpecific: {
                highCoverage: { pl: 'ultra kryjące', en: 'ultra covering', uk: 'ультракриючі' },
                colorsHighCoverage: ['40', '42', '56'],
                fluorescent: { pl: 'fluorescencyjne', en: 'fluorescent', uk: 'флуоресцентні' },
                colorsFluorescent: ['130', '131', '132', '133', '134', '135'],
                transparent: { pl: 'transparentne', en: 'transparent', uk: 'прозорі' },
                colorsTransparent: ['15', '25', '35', '55', '65', '75', '130', '131', '132', '133', '134', '135', '140', '141', '142', '143']
            },
            highLightfast: ['10','20','22','24','26','27','30','31','32','33','40','42','50','51','56','60','61','70','80','81','82','91','100','110','120'],
            storage: { pl: '>24 miesiące', en: '>24 months', uk: '>24 місяці' },
            curing: { pl: 'powietrze: 5 min; tunel: natychmiast', en: 'air: 5 min; tunnel: immediately', uk: 'повітря: 5 хв; тунель: негайно' },
            yield: { pl: 'P45 ~16 m²/L, P90 ~45 m²/L', en: 'P45 ~16 m²/L, P90 ~45 m²/L', uk: 'P45 ~16 м²/л, P90 ~45 м²/л' },
            cleaning: { pl: 'CT 1000 / CT 1000/1', en: 'CT 1000 / CT 1000/1', uk: 'CT 1000 / CT 1000/1' }
        }
    ];

    // -------------------------------------------------
    // 2. FARBY STANDARDOWE – wg photo_2026-02-09_15-03-37.jpg
    // -------------------------------------------------
    const paints = [];

    // Funkcja pomocnicza do tworzenia nazw wielojęzycznych
    function createName(pl, en, uk) {
        return { pl, en, uk };
    }

    // Najpierw kolory podstawowe z określonymi CMYK (zgodnie z tabelą)
    paints.push({ id: 10, code: '10', name: createName('Czerwony', 'Red', 'Червоний'), cmyk: '0,0,100', category: 'Standard' });
    paints.push({ id: 20, code: '20', name: createName('Zielony', 'Green', 'Зелений'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 30, code: '30', name: createName('Niebieski', 'Blue', 'Синій'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 31, code: '31', name: createName('Cyan', 'Cyan', 'Cyan'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 32, code: '32', name: createName('Magenta', 'Magenta', 'Magenta'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 33, code: '33', name: createName('Żółty', 'Yellow', 'Жовтий'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 40, code: '40', name: createName('Czarny', 'Black', 'Чорний'), cmyk: '0,100,100', category: 'Standard' });

    // Kolory 41–43
    paints.push({ id: 41, code: '41', name: createName('Cyan', 'Cyan', 'Cyan'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 42, code: '42', name: createName('Magenta', 'Magenta', 'Magenta'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 43, code: '43', name: createName('Żółty', 'Yellow', 'Жовтий'), cmyk: '0,100,100', category: 'Standard' });

    // Kolory 50–52
    paints.push({ id: 50, code: '50', name: createName('Cyan', 'Cyan', 'Cyan'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 51, code: '51', name: createName('Magenta', 'Magenta', 'Magenta'), cmyk: '0,100,100', category: 'Standard' });
    paints.push({ id: 52, code: '52', name: createName('Żółty', 'Yellow', 'Жовтий'), cmyk: '0,100,100', category: 'Standard' });

    // Automatyczne generowanie od 60 do 258 (cyklicznie Cyan, Magenta, Yellow) – wg foto
    const colorNames = [
        createName('Cyan', 'Cyan', 'Cyan'),
        createName('Magenta', 'Magenta', 'Magenta'),
        createName('Żółty', 'Yellow', 'Жовтий')
    ];
    for (let i = 60; i <= 258; i++) {
        let base = (i - 60) % 3;
        paints.push({
            id: i,
            code: i.toString(),
            name: colorNames[base],
            cmyk: '0,100,100',
            category: 'Standard'
        });
    }

    // Kolory specjalne z kart technicznych (nieobecne w liście standardowej)
    paints.push({ id: '60/146', code: '60/146', name: createName('Ognisty czerwony', 'Fire red', 'Вогняний червоний'), cmyk: null, category: 'EC Special' });
    paints.push({ id: '61/163', code: '61/163', name: createName('Ciemna ognista czerwień', 'Dark fire red', 'Темний вогняний червоний'), cmyk: null, category: 'EC Special' });
    paints.push({ id: '91 Q', code: '91 Q', name: createName('Biały półmatowy', 'Semi-gloss white', 'Білий напівматовий'), cmyk: null, category: 'EC Special' });

    // -------------------------------------------------
    // 3. PODŁOŻA DRUKOWE – z pierwszego zdjęcia i kart technicznych
    // -------------------------------------------------
    const substrates = [
        { name: createName('Papier', 'Paper', 'Папір'), category: createName('chłonne', 'absorbent', 'вбирні'), series: ['EC', 'CF', 'UV', 'AS'] },
        { name: createName('Karton', 'Cardboard', 'Картон'), category: createName('chłonne', 'absorbent', 'вбирні'), series: ['EC', 'CF', 'UV', 'AS'] },
        { name: createName('Tektura falista', 'Corrugated cardboard', 'Гофрокартон'), category: createName('chłonne', 'absorbent', 'вбирні'), series: ['AS'] },
        { name: createName('Drewno', 'Wood', 'Дерево'), category: createName('chłonne', 'absorbent', 'вбирні'), series: ['AS', 'CF'] },
        { name: createName('PCV miękkie', 'Soft PVC', 'М\'який ПВХ'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['EC'] },
        { name: createName('PCV twarde', 'Hard PVC', 'Твердий ПВХ'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['EC', 'PLUV'] },
        { name: createName('Materiały samoprzylepne', 'Self-adhesive materials', 'Самоклейні матеріали'), category: createName('specjalne', 'special', 'спеціальні'), series: ['EC', 'PLUV', 'CF'] },
        { name: createName('Polipropylen (PP)', 'Polypropylene (PP)', 'Поліпропілен (PP)'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['EC*', 'TPP', 'PLUV'] },
        { name: createName('Polietylen (PE)', 'Polyethylene (PE)', 'Поліетилен (PE)'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['TPP', 'PLUV'] },
        { name: createName('Poliwęglan', 'Polycarbonate', 'Полікарбонат'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['TPP', 'PLUV'] },
        { name: createName('ABS', 'ABS', 'ABS'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['EC*'] },
        { name: createName('Forex', 'Forex', 'Forex'), category: createName('tworzywa', 'plastics', 'пластики'), series: ['EC*'] },
        { name: createName('Banery', 'Banners', 'Банери'), category: createName('elastyczne', 'flexible', 'еластичні'), series: ['EC*', 'PLUV'] },
        { name: createName('Canvas', 'Canvas', 'Canvas'), category: createName('tekstylia', 'textiles', 'текстиль'), series: ['EC*'] },
        { name: createName('Tkaniny bawełniane', 'Cotton fabrics', 'Бавовняні тканини'), category: createName('tekstylia', 'textiles', 'текстиль'), series: ['OTF', 'SX', 'SPTN'] },
        { name: createName('Tkaniny syntetyczne', 'Synthetic fabrics', 'Синтетичні тканини'), category: createName('tekstylia', 'textiles', 'текстиль'), series: ['OTF', 'SX', 'SPTN'] },
        { name: createName('Poliamid (nylon)', 'Polyamide (nylon)', 'Поліамід (нейлон)'), category: createName('tekstylia', 'textiles', 'текстиль'), series: ['NST', 'OTF*', 'SPTN*'] },
        { name: createName('Non-woven', 'Non-woven', 'Нетканий матеріал'), category: createName('tekstylia', 'textiles', 'текстиль'), series: ['NST'] },
        { name: createName('Metal lakierowany', 'Lacquered metal', 'Лакований метал'), category: createName('twarde', 'hard', 'тверді'), series: ['EC', 'CF'] },
        { name: createName('Styropian', 'Styrofoam', 'Пінопласт'), category: createName('lekkie', 'light', 'легкі'), series: ['PLUV'] },
        { name: createName('EPS (sucha pianka)', 'EPS (dry foam)', 'EPS (суха піна)'), category: createName('lekkie', 'light', 'легкі'), series: ['CF'] },
        { name: createName('Folie poliestrowe', 'Polyester films', 'Поліестерні плівки'), category: createName('folie', 'films', 'плівки'), series: ['CF'] }
    ];

    // -------------------------------------------------
    // 4. KATEGORIE SERII – z tabeli ogólnej
    // -------------------------------------------------
    const categories = [
        'EC', 'ECVF', 'CF', 'SPTN', 'SP', 'TPX', 'ST', 'OTF',
        'AS', 'SN', 'PV', 'UV', 'PLUV/UPVT', 'UVPT', 'ASV', 'NST', 'SI'
    ];

    // -------------------------------------------------
    // 5. JEDNOSTKI – pozostawiamy z oryginału (są uniwersalne)
    // -------------------------------------------------
    const units = [
        { value: "г", label: { pl: "Gramy", en: "Grams", uk: "Грами" } },
        { value: "кг", label: { pl: "Kilogramy", en: "Kilograms", uk: "Кілограми" } },
        { value: "мл", label: { pl: "Mililitry", en: "Milliliters", uk: "Мілілітри" } },
        { value: "л", label: { pl: "Litry", en: "Liters", uk: "Літри" } },
        { value: "%", label: { pl: "Procenty", en: "Percent", uk: "Відсотки" } }
    ];

    // -------------------------------------------------
    // 6. USTAWIENIA DOMYŚLNE (wielojęzyczne)
    // -------------------------------------------------
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

    // -------------------------------------------------
    // 7. RECEPTURY – brak w dokumentach
    // -------------------------------------------------
    const recipes = [];

    // -------------------------------------------------
    // 8. EKSPORT
    // -------------------------------------------------
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
