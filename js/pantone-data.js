// ========== ДАНІ ПАНТОН ==========
// Зібрано зі сканів та фотографій
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // Базова база кольорів Pantone (ваші зібрані дані)
    const basePantoneColors = [
        // 7521 U – 7526 U (без назв інгредієнтів)
        { number: "7521 U", name: "7521 U", ingredients: [
            { name: "Ingredient1", amount: 6.60 },
            { name: "Ingredient2", amount: 5.70 },
            { name: "Ingredient3", amount: 1.70 },
            { name: "Ingredient4", amount: 86.00 }
        ]},
        { number: "7522 U", name: "7522 U", ingredients: [
            { name: "Ingredient1", amount: 12.80 },
            { name: "Ingredient2", amount: 11.90 },
            { name: "Ingredient3", amount: 2.90 },
            { name: "Ingredient4", amount: 72.40 }
        ]},
        { number: "7523 U", name: "7523 U", ingredients: [
            { name: "Ingredient1", amount: 20.00 },
            { name: "Ingredient2", amount: 5.00 },
            { name: "Ingredient3", amount: 5.00 },
            { name: "Ingredient4", amount: 70.00 }
        ]},
        { number: "7524 U", name: "7524 U", ingredients: [
            { name: "Ingredient1", amount: 32.50 },
            { name: "Ingredient2", amount: 10.00 },
            { name: "Ingredient3", amount: 7.50 },
            { name: "Ingredient4", amount: 50.00 }
        ]},
        { number: "7525 U", name: "7525 U", ingredients: [
            { name: "Ingredient1", amount: 20.00 },
            { name: "Ingredient2", amount: 15.00 },
            { name: "Ingredient3", amount: 5.00 },
            { name: "Ingredient4", amount: 60.00 }
        ]},
        { number: "7526 U", name: "7526 U", ingredients: [
            { name: "Ingredient1", amount: 39.50 },
            { name: "Ingredient2", amount: 23.70 },
            { name: "Ingredient3", amount: 11.80 },
            { name: "Ingredient4", amount: 25.00 }
        ]},
        // 7633 U – 7638 U
        { number: "7633 U", name: "7633 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 3.60 },
            { name: "PANTONE Yellow 012", amount: 1.21 },
            { name: "PANTONE Black", amount: 2.13 },
            { name: "PANTONE Trans. Wt.", amount: 93.06 }
        ]},
        { number: "7634 U", name: "7634 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 17.42 },
            { name: "PANTONE Yellow 012", amount: 3.85 },
            { name: "PANTONE Black", amount: 1.91 },
            { name: "PANTONE Trans. Wt.", amount: 76.82 }
        ]},
        { number: "7635 U", name: "7635 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 40.76 },
            { name: "PANTONE Yellow 012", amount: 7.58 },
            { name: "PANTONE Black", amount: 1.23 },
            { name: "PANTONE Trans. Wt.", amount: 50.43 }
        ]},
        { number: "7636 U", name: "7636 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 59.36 },
            { name: "PANTONE Yellow 012", amount: 12.50 },
            { name: "PANTONE Black", amount: 1.75 },
            { name: "PANTONE Trans. Wt.", amount: 26.39 }
        ]},
        { number: "7637 U", name: "7637 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 53.94 },
            { name: "PANTONE Yellow 012", amount: 13.39 },
            { name: "PANTONE Black", amount: 8.56 },
            { name: "PANTONE Trans. Wt.", amount: 24.11 }
        ]},
        { number: "7638 U", name: "7638 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 49.94 },
            { name: "PANTONE Yellow 012", amount: 11.73 },
            { name: "PANTONE Black", amount: 12.89 },
            { name: "PANTONE Trans. Wt.", amount: 25.44 }
        ]},
        // 2044 U – 2049 U (без назв)
        { number: "2044 U", name: "2044 U", ingredients: [
            { name: "Ingredient1", amount: 6.56 },
            { name: "Ingredient2", amount: 3.28 },
            { name: "Ingredient3", amount: 0.51 },
            { name: "Ingredient4", amount: 89.65 }
        ]},
        { number: "2045 U", name: "2045 U", ingredients: [
            { name: "Ingredient1", amount: 12.24 },
            { name: "Ingredient2", amount: 6.11 },
            { name: "Ingredient3", amount: 0.94 },
            { name: "Ingredient4", amount: 80.71 }
        ]},
        { number: "2046 U", name: "2046 U", ingredients: [
            { name: "Ingredient1", amount: 20.52 },
            { name: "Ingredient2", amount: 10.25 },
            { name: "Ingredient3", amount: 1.58 },
            { name: "Ingredient4", amount: 67.65 }
        ]},
        { number: "2047 U", name: "2047 U", ingredients: [
            { name: "Ingredient1", amount: 29.55 },
            { name: "Ingredient2", amount: 6.30 },
            { name: "Ingredient3", amount: 64.15 }
        ]},
        { number: "2048 U", name: "2048 U", ingredients: [
            { name: "Ingredient1", amount: 41.00 },
            { name: "Ingredient2", amount: 8.75 },
            { name: "Ingredient3", amount: 50.25 }
        ]},
        { number: "2049 U", name: "2049 U", ingredients: [
            { name: "Ingredient1", amount: 57.55 },
            { name: "Ingredient2", amount: 12.28 },
            { name: "Ingredient3", amount: 30.17 }
        ]},
        // 2365 U – 2425 U
        { number: "2365 U", name: "2365 U", ingredients: [
            { name: "PANTONE Purple", amount: 1.20 },
            { name: "PANTONE Trans. Wt.", amount: 96.90 }
        ]},
        { number: "2375 U", name: "2375 U", ingredients: [
            { name: "PANTONE Purple", amount: 9.40 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "2385 U", name: "2385 U", ingredients: [
            { name: "PANTONE Purple", amount: 18.70 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "2395 U", name: "2395 U", ingredients: [
            { name: "PANTONE Purple", amount: 37.50 }
        ]},
        { number: "2405 U", name: "2405 U", ingredients: [
            { name: "PANTONE Purple", amount: 36.40 },
            { name: "PANTONE Black", amount: 3.00 }
        ]},
        { number: "2415 U", name: "2415 U", ingredients: [
            { name: "PANTONE Purple", amount: 35.30 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "2425 U", name: "2425 U", ingredients: [
            { name: "PANTONE Purple", amount: 33.30 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        // 5165 U – 5125 U
        { number: "5165 U", name: "5165 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 1.80 },
            { name: "PANTONE Pro. Blue", amount: 0.40 },
            { name: "PANTONE Black", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "5155 U", name: "5155 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 3.70 },
            { name: "PANTONE Pro. Blue", amount: 0.80 },
            { name: "PANTONE Black", amount: 1.70 },
            { name: "PANTONE Trans. Wt.", amount: 93.80 }
        ]},
        { number: "5145 U", name: "5145 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 7.40 },
            { name: "PANTONE Pro. Blue", amount: 1.70 },
            { name: "PANTONE Black", amount: 3.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "5135 U", name: "5135 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 14.80 },
            { name: "PANTONE Pro. Blue", amount: 3.40 },
            { name: "PANTONE Black", amount: 6.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "5125 U", name: "5125 U", ingredients: [
            { name: "PANTONE Rub. Red", amount: 29.60 },
            { name: "PANTONE Pro. Blue", amount: 6.80 },
            { name: "PANTONE Black", amount: 13.60 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        // 264 U – 269 U
        { number: "264 U", name: "264 U", ingredients: [
            { name: "PANTONE Purple", amount: 9.40 },
            { name: "PANTONE Ref. Blue", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "265 U", name: "265 U", ingredients: [
            { name: "PANTONE Purple", amount: 37.50 },
            { name: "PANTONE Ref. Blue", amount: 12.50 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "266 U", name: "266 U", ingredients: [
            { name: "PANTONE Purple", amount: 75.00 },
            { name: "PANTONE Ref. Blue", amount: 25.00 }
        ]},
        { number: "267 U", name: "267 U", ingredients: [
            { name: "PANTONE Purple", amount: 72.70 },
            { name: "PANTONE Ref. Blue", amount: 24.30 },
            { name: "PANTONE Black", amount: 3.00 }
        ]},
        { number: "268 U", name: "268 U", ingredients: [
            { name: "PANTONE Purple", amount: 66.70 },
            { name: "PANTONE Ref. Blue", amount: 22.20 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        { number: "269 U", name: "269 U", ingredients: [
            { name: "PANTONE Purple", amount: 60.00 },
            { name: "PANTONE Ref. Blue", amount: 20.00 },
            { name: "PANTONE Black", amount: 20.00 }
        ]},
        // 5305 U – 5255 U (без назв)
        { number: "5305 U", name: "5305 U", ingredients: [
            { name: "Ingredient1", amount: 1.70 },
            { name: "Ingredient2", amount: 0.60 },
            { name: "Ingredient3", amount: 0.80 },
            { name: "Ingredient4", amount: 96.90 }
        ]},
        { number: "5295 U", name: "5295 U", ingredients: [
            { name: "Ingredient1", amount: 3.40 },
            { name: "Ingredient2", amount: 1.10 },
            { name: "Ingredient3", amount: 1.70 },
            { name: "Ingredient4", amount: 93.80 }
        ]},
        { number: "5285 U", name: "5285 U", ingredients: [
            { name: "Ingredient1", amount: 6.80 },
            { name: "Ingredient2", amount: 2.30 },
            { name: "Ingredient3", amount: 3.40 },
            { name: "Ingredient4", amount: 87.50 }
        ]},
        { number: "5275 U", name: "5275 U", ingredients: [
            { name: "Ingredient1", amount: 13.60 },
            { name: "Ingredient2", amount: 4.60 },
            { name: "Ingredient3", amount: 6.80 },
            { name: "Ingredient4", amount: 75.00 }
        ]},
        { number: "5265 U", name: "5265 U", ingredients: [
            { name: "Ingredient1", amount: 27.30 },
            { name: "Ingredient2", amount: 9.10 },
            { name: "Ingredient3", amount: 13.60 },
            { name: "Ingredient4", amount: 50.00 }
        ]},
        { number: "5255 U", name: "5255 U", ingredients: [
            { name: "Ingredient1", amount: 54.50 },
            { name: "Ingredient2", amount: 18.20 },
            { name: "Ingredient3", amount: 27.30 }
        ]},
        // 7451 U – 7456 U
        { number: "7451 U", name: "7451 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 4.20 },
            { name: "PANTONE Violet", amount: 1.40 },
            { name: "PANTONE Trans. Wt.", amount: 94.40 }
        ]},
        { number: "7452 U", name: "7452 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 6.80 },
            { name: "PANTONE Violet", amount: 6.20 },
            { name: "PANTONE Trans. Wt.", amount: 87.00 }
        ]},
        { number: "7453 U", name: "7453 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 10.00 },
            { name: "PANTONE Black", amount: 0.50 },
            { name: "PANTONE Trans. Wt.", amount: 89.50 }
        ]},
        { number: "7454 U", name: "7454 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 12.00 },
            { name: "PANTONE Yellow", amount: 2.50 },
            { name: "PANTONE Rub. Red", amount: 2.20 },
            { name: "PANTONE Trans. Wt.", amount: 83.30 }
        ]},
        { number: "7455 U", name: "7455 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 17.50 },
            { name: "PANTONE Violet", amount: 10.50 },
            { name: "PANTONE Black", amount: 2.00 },
            { name: "PANTONE Trans. Wt.", amount: 70.00 }
        ]},
        { number: "7456 U", name: "7456 U", ingredients: [
            { name: "PANTONE Violet", amount: 7.90 },
            { name: "PANTONE Ref. Blue", amount: 6.70 },
            { name: "PANTONE Black", amount: 1.40 },
            { name: "PANTONE Trans. Wt.", amount: 84.00 }
        ]},
        // 291 U – 296 U
        { number: "291 U", name: "291 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 6.30 },
            { name: "PANTONE Pro. Blue", amount: 6.30 },
            { name: "PANTONE Trans. Wt.", amount: 87.40 }
        ]},
        { number: "292 U", name: "292 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 12.50 },
            { name: "PANTONE Pro. Blue", amount: 12.50 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "293 U", name: "293 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 50.00 },
            { name: "PANTONE Pro. Blue", amount: 50.00 }
        ]},
        { number: "294 U", name: "294 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 47.10 },
            { name: "PANTONE Pro. Blue", amount: 47.10 },
            { name: "PANTONE Black", amount: 5.80 }
        ]},
        { number: "295 U", name: "295 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 44.40 },
            { name: "PANTONE Pro. Blue", amount: 44.40 },
            { name: "PANTONE Black", amount: 11.20 }
        ]},
        { number: "296 U", name: "296 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 36.40 },
            { name: "PANTONE Pro. Blue", amount: 36.40 },
            { name: "PANTONE Black", amount: 27.20 }
        ]},
        // 7458 U – 7463 U
        { number: "7458 U", name: "7458 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 9.00 },
            { name: "PANTONE Ref. Blue", amount: 2.10 },
            { name: "PANTONE Black", amount: 1.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "7459 U", name: "7459 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 18.00 },
            { name: "PANTONE Ref. Blue", amount: 4.20 },
            { name: "PANTONE Black", amount: 2.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "7460 U", name: "7460 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 90.60 },
            { name: "PANTONE Green", amount: 9.40 }
        ]},
        { number: "7461 U", name: "7461 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 16.50 },
            { name: "PANTONE Ref. Blue", amount: 8.50 },
            { name: "PANTONE Black", amount: 1.00 },
            { name: "PANTONE Trans. Wt.", amount: 74.00 }
        ]},
        { number: "7462 U", name: "7462 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 35.50 },
            { name: "PANTONE Yellow", amount: 6.20 },
            { name: "PANTONE Rub. Red", amount: 4.20 },
            { name: "PANTONE Trans. Wt.", amount: 54.10 }
        ]},
        { number: "7463 U", name: "7463 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 58.00 },
            { name: "PANTONE Yellow", amount: 5.00 },
            { name: "PANTONE Black", amount: 17.00 },
            { name: "PANTONE Trans. Wt.", amount: 20.00 }
        ]},
        // 629 U – 634 U
        { number: "629 U", name: "629 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 2.90 },
            { name: "PANTONE Black", amount: 0.20 },
            { name: "PANTONE Trans. Wt.", amount: 96.90 }
        ]},
        { number: "630 U", name: "630 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 5.90 },
            { name: "PANTONE Black", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "631 U", name: "631 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 11.80 },
            { name: "PANTONE Black", amount: 0.70 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "632 U", name: "632 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 23.50 },
            { name: "PANTONE Black", amount: 1.50 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "633 U", name: "633 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 47.10 },
            { name: "PANTONE Black", amount: 2.90 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "634 U", name: "634 U", ingredients: [
            { name: "PANTONE Pro. Blue", amount: 70.60 },
            { name: "PANTONE Black", amount: 4.40 },
            { name: "PANTONE Trans. Wt.", amount: 25.00 }
        ]},
        // 5517 U – 5467 U
        { number: "5517 U", name: "5517 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 1.90 },
            { name: "PANTONE Yellow", amount: 1.20 },
            { name: "PANTONE Black", amount: 1.20 },
            { name: "PANTONE Trans. Wt.", amount: 95.70 }
        ]},
        { number: "5507 U", name: "5507 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 3.90 },
            { name: "PANTONE Yellow", amount: 2.30 },
            { name: "PANTONE Black", amount: 2.30 },
            { name: "PANTONE Trans. Wt.", amount: 91.50 }
        ]},
        { number: "5497 U", name: "5497 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 5.70 },
            { name: "PANTONE Yellow", amount: 3.40 },
            { name: "PANTONE Black", amount: 3.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "5487 U", name: "5487 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 11.40 },
            { name: "PANTONE Yellow", amount: 6.80 },
            { name: "PANTONE Black", amount: 6.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "5477 U", name: "5477 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 22.80 },
            { name: "PANTONE Yellow", amount: 13.60 },
            { name: "PANTONE Black", amount: 13.60 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "5467 U", name: "5467 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 45.40 },
            { name: "PANTONE Yellow", amount: 27.30 },
            { name: "PANTONE Black", amount: 27.30 }
        ]},
        // 5797 U – 5747 U
        { number: "5797 U", name: "5797 U", ingredients: [
            { name: "PANTONE Yellow", amount: 1.70 },
            { name: "PANTONE Green", amount: 0.60 },
            { name: "PANTONE Black", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 96.90 }
        ]},
        { number: "5787 U", name: "5787 U", ingredients: [
            { name: "PANTONE Yellow", amount: 3.40 },
            { name: "PANTONE Green", amount: 1.10 },
            { name: "PANTONE Black", amount: 1.70 },
            { name: "PANTONE Trans. Wt.", amount: 93.80 }
        ]},
        { number: "5777 U", name: "5777 U", ingredients: [
            { name: "PANTONE Yellow", amount: 6.80 },
            { name: "PANTONE Green", amount: 2.30 },
            { name: "PANTONE Black", amount: 3.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "5767 U", name: "5767 U", ingredients: [
            { name: "PANTONE Yellow", amount: 13.60 },
            { name: "PANTONE Green", amount: 4.60 },
            { name: "PANTONE Black", amount: 6.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "5757 U", name: "5757 U", ingredients: [
            { name: "PANTONE Yellow", amount: 27.30 },
            { name: "PANTONE Green", amount: 9.10 },
            { name: "PANTONE Black", amount: 13.60 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "5747 U", name: "5747 U", ingredients: [
            { name: "PANTONE Yellow", amount: 54.50 },
            { name: "PANTONE Green", amount: 18.20 },
            { name: "PANTONE Black", amount: 27.30 }
        ]},
        // 601 U – 606 U
        { number: "601 U", name: "601 U", ingredients: [
            { name: "PANTONE Yellow", amount: 3.08 },
            { name: "PANTONE Black", amount: 0.05 },
            { name: "PANTONE Trans. Wt.", amount: 96.87 }
        ]},
        { number: "602 U", name: "602 U", ingredients: [
            { name: "PANTONE Yellow", amount: 6.20 },
            { name: "PANTONE Black", amount: 0.10 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "603 U", name: "603 U", ingredients: [
            { name: "PANTONE Yellow", amount: 12.30 },
            { name: "PANTONE Black", amount: 0.20 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "604 U", name: "604 U", ingredients: [
            { name: "PANTONE Yellow", amount: 24.60 },
            { name: "PANTONE Black", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "605 U", name: "605 U", ingredients: [
            { name: "PANTONE Yellow", amount: 49.20 },
            { name: "PANTONE Black", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "606 U", name: "606 U", ingredients: [
            { name: "PANTONE Yellow", amount: 73.80 },
            { name: "PANTONE Black", amount: 1.20 },
            { name: "PANTONE Trans. Wt.", amount: 25.00 }
        ]},
        // 2324 U – 2329 U
        { number: "2324 U", name: "2324 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 3.85 },
            { name: "PANTONE Green", amount: 2.91 },
            { name: "PANTONE Black", amount: 2.90 },
            { name: "PANTONE Trans. Wt.", amount: 90.34 }
        ]},
        { number: "2325 U", name: "2325 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 4.62 },
            { name: "PANTONE Pro. Blue", amount: 3.08 },
            { name: "PANTONE Black", amount: 3.30 },
            { name: "PANTONE Trans. Wt.", amount: 89.00 }
        ]},
        { number: "2326 U", name: "2326 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 6.72 },
            { name: "PANTONE Pro. Blue", amount: 4.48 },
            { name: "PANTONE Black", amount: 4.80 },
            { name: "PANTONE Trans. Wt.", amount: 84.00 }
        ]},
        { number: "2327 U", name: "2327 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 4.68 },
            { name: "PANTONE Black", amount: 8.69 },
            { name: "PANTONE Trans. Wt.", amount: 86.63 }
        ]},
        { number: "2328 U", name: "2328 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 9.06 },
            { name: "PANTONE Pro. Blue", amount: 6.03 },
            { name: "PANTONE Black", amount: 6.47 },
            { name: "PANTONE Trans. Wt.", amount: 78.44 }
        ]},
        { number: "2329 U", name: "2329 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 11.89 },
            { name: "PANTONE Pro. Blue", amount: 7.92 },
            { name: "PANTONE Black", amount: 8.50 },
            { name: "PANTONE Trans. Wt.", amount: 71.69 }
        ]},
        // 7500 U – 7505 U
        { number: "7500 U", name: "7500 U", ingredients: [
            { name: "PANTONE Yellow", amount: 2.10 },
            { name: "PANTONE Warm Red", amount: 0.30 },
            { name: "PANTONE Black", amount: 0.60 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "7501 U", name: "7501 U", ingredients: [
            { name: "PANTONE Yellow", amount: 1.90 },
            { name: "PANTONE Warm Red", amount: 0.40 },
            { name: "PANTONE Black", amount: 0.70 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "7502 U", name: "7502 U", ingredients: [
            { name: "PANTONE Yellow", amount: 3.90 },
            { name: "PANTONE Warm Red", amount: 0.90 },
            { name: "PANTONE Black", amount: 1.50 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "7503 U", name: "7503 U", ingredients: [
            { name: "PANTONE Yellow", amount: 14.60 },
            { name: "PANTONE Rub. Red", amount: 7.30 },
            { name: "PANTONE Pro. Blue", amount: 5.80 },
            { name: "PANTONE Trans. Wt.", amount: 72.30 }
        ]},
        { number: "7504 U", name: "7504 U", ingredients: [
            { name: "PANTONE Yellow", amount: 11.00 },
            { name: "PANTONE Rub. Red", amount: 6.10 },
            { name: "PANTONE Black", amount: 10.10 },
            { name: "PANTONE Trans. Wt.", amount: 72.20 }
        ]},
        { number: "7505 U", name: "7505 U", ingredients: [
            { name: "PANTONE Yellow", amount: 10.20 },
            { name: "PANTONE Warm Red", amount: 5.60 },
            { name: "PANTONE Black", amount: 12.00 },
            { name: "PANTONE Trans. Wt.", amount: 72.20 }
        ]},
        // 2310 U – 2315 U
        { number: "2310 U", name: "2310 U", ingredients: [
            { name: "PANTONE Dark Blue", amount: 1.09 },
            { name: "PANTONE Trans. Wt.", amount: 96.50 }
        ]},
        { number: "2311 U", name: "2311 U", ingredients: [
            { name: "PANTONE Dark Blue", amount: 2.21 },
            { name: "PANTONE Trans. Wt.", amount: 91.50 }
        ]},
        { number: "2312 U", name: "2312 U", ingredients: [
            { name: "PANTONE Dark Blue", amount: 3.07 },
            { name: "PANTONE Trans. Wt.", amount: 91.50 }
        ]},
        { number: "2313 U", name: "2313 U", ingredients: [
            { name: "PANTONE Black", amount: 3.31 },
            { name: "PANTONE Trans. Wt.", amount: 88.95 }
        ]},
        { number: "2314 U", name: "2314 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 13.03 },
            { name: "PANTONE Black", amount: 5.58 },
            { name: "PANTONE Trans. Wt.", amount: 81.39 }
        ]},
        { number: "2315 U", name: "2315 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 63.05 },
            { name: "PANTONE Black", amount: 9.95 },
            { name: "PANTONE Trans. Wt.", amount: 27.00 }
        ]},
        // 4745 U – 4695 U
        { number: "4745 U", name: "4745 U", ingredients: [
            { name: "PANTONE Yellow", amount: 1.30 },
            { name: "PANTONE Rub. Red", amount: 1.30 },
            { name: "PANTONE Black", amount: 1.00 },
            { name: "PANTONE Trans. Wt.", amount: 96.40 }
        ]},
        { number: "4735 U", name: "4735 U", ingredients: [
            { name: "PANTONE Yellow", amount: 2.30 },
            { name: "PANTONE Rub. Red", amount: 2.30 },
            { name: "PANTONE Black", amount: 1.70 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "4725 U", name: "4725 U", ingredients: [
            { name: "PANTONE Yellow", amount: 4.50 },
            { name: "PANTONE Rub. Red", amount: 4.50 },
            { name: "PANTONE Black", amount: 3.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.60 }
        ]},
        { number: "4715 U", name: "4715 U", ingredients: [
            { name: "PANTONE Yellow", amount: 9.10 },
            { name: "PANTONE Rub. Red", amount: 9.10 },
            { name: "PANTONE Black", amount: 6.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "4705 U", name: "4705 U", ingredients: [
            { name: "PANTONE Yellow", amount: 18.20 },
            { name: "PANTONE Rub. Red", amount: 18.20 },
            { name: "PANTONE Black", amount: 13.60 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "4695 U", name: "4695 U", ingredients: [
            { name: "PANTONE Yellow", amount: 36.40 },
            { name: "PANTONE Rub. Red", amount: 36.40 },
            { name: "PANTONE Black", amount: 27.20 }
        ]},
        // 7528 U – 7533 U
        { number: "7528 U", name: "7528 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 0.70 },
            { name: "PANTONE Black", amount: 2.30 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "7529 U", name: "7529 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 1.40 },
            { name: "PANTONE Black", amount: 4.90 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "7530 U", name: "7530 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 2.80 },
            { name: "PANTONE Black", amount: 9.70 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "7531 U", name: "7531 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 5.60 },
            { name: "PANTONE Black", amount: 19.40 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "7532 U", name: "7532 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 11.20 },
            { name: "PANTONE Black", amount: 38.80 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "7533 U", name: "7533 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 16.90 },
            { name: "PANTONE Black", amount: 58.10 },
            { name: "PANTONE Trans. Wt.", amount: 25.00 }
        ]},
        // 428 U – 433 U
        { number: "428 U", name: "428 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 1.10 },
            { name: "PANTONE Black", amount: 1.90 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "429 U", name: "429 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 2.30 },
            { name: "PANTONE Black", amount: 3.90 },
            { name: "PANTONE Trans. Wt.", amount: 93.80 }
        ]},
        { number: "430 U", name: "430 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 4.70 },
            { name: "PANTONE Black", amount: 7.80 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "431 U", name: "431 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 9.40 },
            { name: "PANTONE Black", amount: 15.60 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "432 U", name: "432 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 18.80 },
            { name: "PANTONE Black", amount: 31.20 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "433 U", name: "433 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 37.50 },
            { name: "PANTONE Black", amount: 62.50 }
        ]},
        // 421 U – 426 U
        { number: "421 U", name: "421 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 0.70 },
            { name: "PANTONE Black", amount: 2.30 },
            { name: "PANTONE Trans. Wt.", amount: 97.00 }
        ]},
        { number: "422 U", name: "422 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 1.60 },
            { name: "PANTONE Black", amount: 4.70 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "423 U", name: "423 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 3.10 },
            { name: "PANTONE Black", amount: 9.40 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "424 U", name: "424 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 6.20 },
            { name: "PANTONE Black", amount: 18.80 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "425 U", name: "425 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 12.50 },
            { name: "PANTONE Black", amount: 37.50 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "426 U", name: "426 U", ingredients: [
            { name: "PANTONE Ref. Blue", amount: 25.00 },
            { name: "PANTONE Black", amount: 75.00 }
        ]},
        // Cool Gray 7 U – 11 U
        { number: "Cool Gray 7 U", name: "Cool Gray 7 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 2.40 },
            { name: "PANTONE Black", amount: 5.60 },
            { name: "PANTONE Trans. Wt.", amount: 92.00 }
        ]},
        { number: "Cool Gray 8 U", name: "Cool Gray 8 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 3.30 },
            { name: "PANTONE Black", amount: 7.70 },
            { name: "PANTONE Trans. Wt.", amount: 89.00 }
        ]},
        { number: "Cool Gray 9 U", name: "Cool Gray 9 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 4.50 },
            { name: "PANTONE Black", amount: 10.50 },
            { name: "PANTONE Trans. Wt.", amount: 85.00 }
        ]},
        { number: "Cool Gray 10 U", name: "Cool Gray 10 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 5.40 },
            { name: "PANTONE Black", amount: 12.60 },
            { name: "PANTONE Trans. Wt.", amount: 82.00 }
        ]},
        { number: "Cool Gray 11 U", name: "Cool Gray 11 U", ingredients: [
            { name: "PANTONE Blue 072", amount: 6.60 },
            { name: "PANTONE Black", amount: 15.40 },
            { name: "PANTONE Trans. Wt.", amount: 78.00 }
        ]},
        // 2022 U – 2028 U
        { number: "2022 U", name: "2022 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 4.45 },
            { name: "PANTONE Rub. Red", amount: 1.55 },
            { name: "PANTONE Trans. Wt.", amount: 94.00 }
        ]},
        { number: "2023 U", name: "2023 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 7.57 },
            { name: "PANTONE Rub. Red", amount: 2.63 },
            { name: "PANTONE Trans. Wt.", amount: 89.80 }
        ]},
        { number: "2024 U", name: "2024 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 12.21 },
            { name: "PANTONE Rub. Red", amount: 4.25 },
            { name: "PANTONE Trans. Wt.", amount: 83.54 }
        ]},
        { number: "2025 U", name: "2025 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 14.86 },
            { name: "PANTONE Bright Red", amount: 3.90 },
            { name: "PANTONE Trans. Wt.", amount: 81.24 }
        ]},
        { number: "2026 U", name: "2026 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 19.02 },
            { name: "PANTONE Rub. Red", amount: 6.62 },
            { name: "PANTONE Trans. Wt.", amount: 74.36 }
        ]},
        { number: "2027 U", name: "2027 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 16.46 },
            { name: "PANTONE Rub. Red", amount: 10.18 },
            { name: "PANTONE Trans. Wt.", amount: 73.36 }
        ]},
        { number: "2028 U", name: "2028 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 16.46 },
            { name: "PANTONE Rub. Red", amount: 13.78 }
        ]},
        // 106 U – 112 U
        { number: "106 U", name: "106 U", ingredients: [
            { name: "PANTONE Yellow", amount: 12.50 },
            { name: "PANTONE Warm Red", amount: 0.20 },
            { name: "PANTONE Trans. Wt.", amount: 87.30 }
        ]},
        { number: "107 U", name: "107 U", ingredients: [
            { name: "PANTONE Yellow", amount: 24.90 },
            { name: "PANTONE Warm Red", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 74.70 }
        ]},
        { number: "108 U", name: "108 U", ingredients: [
            { name: "PANTONE Yellow", amount: 49.60 },
            { name: "PANTONE Warm Red", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 49.60 }
        ]},
        { number: "109 U", name: "109 U", ingredients: [
            { name: "PANTONE Yellow", amount: 98.50 },
            { name: "PANTONE Warm Red", amount: 1.50 }
        ]},
        { number: "110 U", name: "110 U", ingredients: [
            { name: "PANTONE Yellow", amount: 97.00 },
            { name: "PANTONE Warm Red", amount: 1.50 },
            { name: "PANTONE Black", amount: 1.50 }
        ]},
        { number: "111 U", name: "111 U", ingredients: [
            { name: "PANTONE Yellow", amount: 92.80 },
            { name: "PANTONE Warm Red", amount: 1.40 },
            { name: "PANTONE Black", amount: 5.80 }
        ]},
        { number: "112 U", name: "112 U", ingredients: [
            { name: "PANTONE Yellow", amount: 87.60 },
            { name: "PANTONE Warm Red", amount: 1.40 },
            { name: "PANTONE Black", amount: 11.00 }
        ]},
        // 127 U – 133 U
        { number: "127 U", name: "127 U", ingredients: [
            { name: "PANTONE Yellow", amount: 5.90 },
            { name: "PANTONE Rub. Red", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "128 U", name: "128 U", ingredients: [
            { name: "PANTONE Yellow", amount: 11.70 },
            { name: "PANTONE Rub. Red", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "129 U", name: "129 U", ingredients: [
            { name: "PANTONE Yellow", amount: 46.90 },
            { name: "PANTONE Rub. Red", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "130 U", name: "130 U", ingredients: [
            { name: "PANTONE Yellow", amount: 93.80 },
            { name: "PANTONE Rub. Red", amount: 6.20 }
        ]},
        { number: "131 U", name: "131 U", ingredients: [
            { name: "PANTONE Yellow", amount: 92.30 },
            { name: "PANTONE Rub. Red", amount: 6.20 },
            { name: "PANTONE Black", amount: 1.50 }
        ]},
        { number: "132 U", name: "132 U", ingredients: [
            { name: "PANTONE Yellow", amount: 88.20 },
            { name: "PANTONE Rub. Red", amount: 5.90 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "133 U", name: "133 U", ingredients: [
            { name: "PANTONE Yellow", amount: 75.00 },
            { name: "PANTONE Rub. Red", amount: 5.00 },
            { name: "PANTONE Black", amount: 20.00 }
        ]},
        // 113 U – 119 U
        { number: "113 U", name: "113 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 12.40 },
            { name: "PANTONE Trans. Wt.", amount: 0.40 },
            { name: "PANTONE Black", amount: 87.20 }
        ]},
        { number: "114 U", name: "114 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 24.80 },
            { name: "PANTONE Trans. Wt.", amount: 0.80 },
            { name: "PANTONE Black", amount: 74.40 }
        ]},
        { number: "115 U", name: "115 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 49.20 },
            { name: "PANTONE Trans. Wt.", amount: 1.60 },
            { name: "PANTONE Black", amount: 49.20 }
        ]},
        { number: "116 U", name: "116 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 97.00 },
            { name: "PANTONE Trans. Wt.", amount: 3.00 }
        ]},
        { number: "117 U", name: "117 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 94.20 },
            { name: "PANTONE Black", amount: 2.90 },
            { name: "PANTONE Black", amount: 2.90 }
        ]},
        { number: "118 U", name: "118 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 91.40 },
            { name: "PANTONE Black", amount: 2.90 },
            { name: "PANTONE Black", amount: 5.70 }
        ]},
        { number: "119 U", name: "119 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 78.10 },
            { name: "PANTONE Black", amount: 2.40 },
            { name: "PANTONE Black", amount: 19.50 }
        ]},
        // 1205 U – 1265 U
        { number: "1205 U", name: "1205 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 5.70 },
            { name: "PANTONE Warm Red", amount: 0.60 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "1215 U", name: "1215 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 7.60 },
            { name: "PANTONE Warm Red", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 91.60 }
        ]},
        { number: "1225 U", name: "1225 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 45.30 },
            { name: "PANTONE Warm Red", amount: 4.70 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "1235 U", name: "1235 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 90.60 },
            { name: "PANTONE Warm Red", amount: 9.40 }
        ]},
        { number: "1245 U", name: "1245 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 85.30 },
            { name: "PANTONE Warm Red", amount: 8.80 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "1255 U", name: "1255 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 80.60 },
            { name: "PANTONE Warm Red", amount: 8.30 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        { number: "1265 U", name: "1265 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 72.50 },
            { name: "PANTONE Warm Red", amount: 7.50 },
            { name: "PANTONE Black", amount: 20.00 }
        ]},
        // 120 U – 126 U
        { number: "120 U", name: "120 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 11.70 },
            { name: "PANTONE Warm Red", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "121 U", name: "121 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 23.40 },
            { name: "PANTONE Warm Red", amount: 1.60 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "122 U", name: "122 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 46.90 },
            { name: "PANTONE Warm Red", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "123 U", name: "123 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 93.80 },
            { name: "PANTONE Warm Red", amount: 6.20 }
        ]},
        { number: "124 U", name: "124 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 92.30 },
            { name: "PANTONE Warm Red", amount: 6.20 },
            { name: "PANTONE Black", amount: 1.50 }
        ]},
        { number: "125 U", name: "125 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 88.20 },
            { name: "PANTONE Warm Red", amount: 5.90 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "126 U", name: "126 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 83.30 },
            { name: "PANTONE Warm Red", amount: 5.60 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        // 7548 U – 7554 U
        { number: "7548 U", name: "7548 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 96.71 },
            { name: "PANTONE Orange 021", amount: 3.29 }
        ]},
        { number: "7549 U", name: "7549 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 52.53 },
            { name: "PANTONE Orange 021", amount: 8.17 },
            { name: "PANTONE Black", amount: 0.21 },
            { name: "PANTONE Trans. Wt.", amount: 39.09 }
        ]},
        { number: "7550 U", name: "7550 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 84.14 },
            { name: "PANTONE Orange 021", amount: 13.06 },
            { name: "PANTONE Black", amount: 2.80 }
        ]},
        { number: "7551 U", name: "7551 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 78.48 },
            { name: "PANTONE Orange 021", amount: 15.30 },
            { name: "PANTONE Black", amount: 6.22 }
        ]},
        { number: "7552 U", name: "7552 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 63.14 },
            { name: "PANTONE Orange 021", amount: 17.19 },
            { name: "PANTONE Black", amount: 19.67 }
        ]},
        { number: "7553 U", name: "7553 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 51.53 },
            { name: "PANTONE Orange 021", amount: 16.43 },
            { name: "PANTONE Black", amount: 32.04 }
        ]},
        { number: "7554 U", name: "7554 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 8.60 },
            { name: "PANTONE Orange 021", amount: 8.40 },
            { name: "PANTONE Black", amount: 38.60 },
            { name: "PANTONE Trans. Wt.", amount: 44.40 }
        ]},
        // 7555 U – 7561 U
        { number: "7555 U", name: "7555 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 25.97 },
            { name: "PANTONE Orange 021", amount: 7.67 },
            { name: "PANTONE Black", amount: 2.28 },
            { name: "PANTONE Trans. Wt.", amount: 64.08 }
        ]},
        { number: "7556 U", name: "7556 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 22.75 },
            { name: "PANTONE Orange 021", amount: 7.84 },
            { name: "PANTONE Black", amount: 4.38 },
            { name: "PANTONE Trans. Wt.", amount: 65.03 }
        ]},
        { number: "7557 U", name: "7557 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 20.97 },
            { name: "PANTONE Orange 021", amount: 7.36 },
            { name: "PANTONE Black", amount: 7.33 },
            { name: "PANTONE Trans. Wt.", amount: 64.34 }
        ]},
        { number: "7558 U", name: "7558 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 16.64 },
            { name: "PANTONE Orange 021", amount: 9.76 },
            { name: "PANTONE Black", amount: 8.78 },
            { name: "PANTONE Trans. Wt.", amount: 64.82 }
        ]},
        { number: "7559 U", name: "7559 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 13.90 },
            { name: "PANTONE Orange 021", amount: 12.64 },
            { name: "PANTONE Black", amount: 10.85 },
            { name: "PANTONE Trans. Wt.", amount: 62.61 }
        ]},
        { number: "7560 U", name: "7560 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 12.81 },
            { name: "PANTONE Orange 021", amount: 8.46 },
            { name: "PANTONE Black", amount: 13.75 },
            { name: "PANTONE Trans. Wt.", amount: 64.98 }
        ]},
        { number: "7561 U", name: "7561 U", ingredients: [
            { name: "PANTONE Yellow 012", amount: 12.32 },
            { name: "PANTONE Orange 021", amount: 3.25 },
            { name: "PANTONE Black", amount: 18.14 },
            { name: "PANTONE Trans. Wt.", amount: 66.29 }
        ]},
        // 134 U – 140 U
        { number: "134 U", name: "134 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 5.50 },
            { name: "PANTONE Warm Red", amount: 0.80 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "135 U", name: "135 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 21.90 },
            { name: "PANTONE Warm Red", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "136 U", name: "136 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 43.80 },
            { name: "PANTONE Warm Red", amount: 6.20 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "137 U", name: "137 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 87.50 },
            { name: "PANTONE Warm Red", amount: 12.50 }
        ]},
        { number: "138 U", name: "138 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 86.20 },
            { name: "PANTONE Warm Red", amount: 12.30 },
            { name: "PANTONE Black", amount: 1.50 }
        ]},
        { number: "139 U", name: "139 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 82.30 },
            { name: "PANTONE Warm Red", amount: 11.80 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "140 U", name: "140 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 70.00 },
            { name: "PANTONE Warm Red", amount: 10.00 },
            { name: "PANTONE Black", amount: 20.00 }
        ]},
        // 13 U (декілька формул) – залишаємо як є
        { number: "13 U", name: "13 U (1)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 9.34 },
            { name: "PANTONE Red", amount: 2.05 },
            { name: "PANTONE Trans. Wt.", amount: 88.61 }
        ]},
        { number: "13 U", name: "13 U (2)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 16.27 },
            { name: "PANTONE Red", amount: 3.58 },
            { name: "PANTONE Trans. Wt.", amount: 80.15 }
        ]},
        { number: "13 U", name: "13 U (3)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 92.38 },
            { name: "PANTONE Orange 021", amount: 7.62 }
        ]},
        { number: "13 U", name: "13 U (4)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 26.37 },
            { name: "PANTONE Red", amount: 5.81 },
            { name: "PANTONE Trans. Wt.", amount: 67.82 }
        ]},
        { number: "13 U", name: "13 U (5)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 54.68 },
            { name: "PANTONE Red", amount: 6.55 },
            { name: "PANTONE Trans. Wt.", amount: 38.77 }
        ]},
        { number: "13 U", name: "13 U (6)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 82.57 },
            { name: "PANTONE Orange 021", amount: 17.43 }
        ]},
        { number: "13 U", name: "13 U (7)", ingredients: [
            { name: "PANTONE Yellow 012", amount: 49.46 },
            { name: "PANTONE Orange 021", amount: 21.48 },
            { name: "PANTONE Black", amount: 4.06 },
            { name: "PANTONE Trans. Wt.", amount: 25.00 }
        ]},
        // 1345 U – 1405 U
        { number: "1345 U", name: "1345 U", ingredients: [
            { name: "PANTONE Yellow", amount: 7.40 },
            { name: "PANTONE Warm Red", amount: 1.70 },
            { name: "PANTONE Trans. Wt.", amount: 90.90 }
        ]},
        { number: "1355 U", name: "1355 U", ingredients: [
            { name: "PANTONE Yellow", amount: 14.80 },
            { name: "PANTONE Warm Red", amount: 3.40 },
            { name: "PANTONE Trans. Wt.", amount: 81.80 }
        ]},
        { number: "1365 U", name: "1365 U", ingredients: [
            { name: "PANTONE Yellow", amount: 32.50 },
            { name: "PANTONE Warm Red", amount: 7.50 },
            { name: "PANTONE Trans. Wt.", amount: 60.00 }
        ]},
        { number: "1375 U", name: "1375 U", ingredients: [
            { name: "PANTONE Yellow", amount: 81.30 },
            { name: "PANTONE Warm Red", amount: 18.70 }
        ]},
        { number: "1385 U", name: "1385 U", ingredients: [
            { name: "PANTONE Yellow", amount: 78.80 },
            { name: "PANTONE Warm Red", amount: 18.20 },
            { name: "PANTONE Black", amount: 3.00 }
        ]},
        { number: "1395 U", name: "1395 U", ingredients: [
            { name: "PANTONE Yellow", amount: 72.20 },
            { name: "PANTONE Warm Red", amount: 16.70 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        { number: "1405 U", name: "1405 U", ingredients: [
            { name: "PANTONE Yellow", amount: 61.90 },
            { name: "PANTONE Warm Red", amount: 14.30 },
            { name: "PANTONE Black", amount: 23.80 }
        ]},
        // 7408 U – 7414 U
        { number: "7408 U", name: "7408 U", ingredients: [
            { name: "PANTONE Yellow", amount: 93.50 },
            { name: "PANTONE Warm Red", amount: 5.80 },
            { name: "PANTONE Black", amount: 0.70 }
        ]},
        { number: "7409 U", name: "7409 U", ingredients: [
            { name: "PANTONE Yellow", amount: 39.00 },
            { name: "PANTONE Rub. Red", amount: 4.40 },
            { name: "PANTONE Trans. Wt.", amount: 56.60 }
        ]},
        { number: "7410 U", name: "7410 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 12.00 },
            { name: "PANTONE Warm Red", amount: 1.50 },
            { name: "PANTONE Black", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 86.10 }
        ]},
        { number: "7411 U", name: "7411 U", ingredients: [
            { name: "PANTONE Yellow", amount: 18.50 },
            { name: "PANTONE Rub. Red", amount: 6.10 },
            { name: "PANTONE Black", amount: 0.40 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "7412 U", name: "7412 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 21.00 },
            { name: "PANTONE Black", amount: 2.50 },
            { name: "PANTONE Trans. Wt.", amount: 76.50 }
        ]},
        { number: "7413 U", name: "7413 U", ingredients: [
            { name: "PANTONE Yellow", amount: 37.00 },
            { name: "PANTONE Rub. Red", amount: 12.30 },
            { name: "PANTONE Black", amount: 0.70 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "7414 U", name: "7414 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 49.30 },
            { name: "PANTONE Black", amount: 6.20 },
            { name: "PANTONE Trans. Wt.", amount: 44.50 }
        ]},
        // 141 U – 147 U
        { number: "141 U", name: "141 U", ingredients: [
            { name: "PANTONE Yellow", amount: 10.90 },
            { name: "PANTONE Rub. Red", amount: 1.60 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "142 U", name: "142 U", ingredients: [
            { name: "PANTONE Yellow", amount: 21.90 },
            { name: "PANTONE Rub. Red", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "143 U", name: "143 U", ingredients: [
            { name: "PANTONE Yellow", amount: 43.80 },
            { name: "PANTONE Rub. Red", amount: 6.20 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "144 U", name: "144 U", ingredients: [
            { name: "PANTONE Yellow", amount: 87.50 },
            { name: "PANTONE Rub. Red", amount: 12.50 }
        ]},
        { number: "145 U", name: "145 U", ingredients: [
            { name: "PANTONE Yellow", amount: 86.20 },
            { name: "PANTONE Rub. Red", amount: 12.30 },
            { name: "PANTONE Black", amount: 1.50 }
        ]},
        { number: "146 U", name: "146 U", ingredients: [
            { name: "PANTONE Yellow", amount: 82.30 },
            { name: "PANTONE Rub. Red", amount: 11.80 },
            { name: "PANTONE Black", amount: 5.90 }
        ]},
        { number: "147 U", name: "147 U", ingredients: [
            { name: "PANTONE Yellow", amount: 63.60 },
            { name: "PANTONE Rub. Red", amount: 9.10 },
            { name: "PANTONE Black", amount: 27.30 }
        ]},
        // 2015 U – 2021 U
        { number: "2015 U", name: "2015 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 1.90 },
            { name: "PANTONE Black", amount: 0.10 },
            { name: "PANTONE Trans. Wt.", amount: 98.00 }
        ]},
        { number: "2016 U", name: "2016 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 6.37 },
            { name: "PANTONE Trans. Wt.", amount: 93.63 }
        ]},
        { number: "2017 U", name: "2017 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 8.64 },
            { name: "PANTONE Black", amount: 0.45 },
            { name: "PANTONE Trans. Wt.", amount: 90.91 }
        ]},
        { number: "2018 U", name: "2018 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 44.26 },
            { name: "PANTONE Trans. Wt.", amount: 55.74 }
        ]},
        { number: "2019 U", name: "2019 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 45.24 },
            { name: "PANTONE Black", amount: 2.35 },
            { name: "PANTONE Trans. Wt.", amount: 52.41 }
        ]},
        { number: "2020 U", name: "2020 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 71.30 },
            { name: "PANTONE Black", amount: 3.70 },
            { name: "PANTONE Trans. Wt.", amount: 25.00 }
        ]},
        { number: "2021 U", name: "2021 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 93.03 },
            { name: "PANTONE Black", amount: 6.97 }
        ]},
        // 712 U – 718 U
        { number: "712 U", name: "712 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 1.94 },
            { name: "PANTONE Orange 021", amount: 0.06 },
            { name: "PANTONE Orange 021", amount: 98.00 }
        ]},
        { number: "713 U", name: "713 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 3.00 },
            { name: "PANTONE Orange 021", amount: 0.10 },
            { name: "PANTONE Orange 021", amount: 96.90 }
        ]},
        { number: "714 U", name: "714 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 6.10 },
            { name: "PANTONE Orange 021", amount: 0.20 },
            { name: "PANTONE Orange 021", amount: 93.70 }
        ]},
        { number: "715 U", name: "715 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 12.10 },
            { name: "PANTONE Orange 021", amount: 0.40 },
            { name: "PANTONE Orange 021", amount: 87.50 }
        ]},
        { number: "716 U", name: "716 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 24.20 },
            { name: "PANTONE Orange 021", amount: 0.80 },
            { name: "PANTONE Orange 021", amount: 75.00 }
        ]},
        { number: "717 U", name: "717 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 48.50 },
            { name: "PANTONE Orange 021", amount: 1.50 },
            { name: "PANTONE Orange 021", amount: 50.00 }
        ]},
        { number: "718 U", name: "718 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 72.70 },
            { name: "PANTONE Orange 021", amount: 2.30 },
            { name: "PANTONE Orange 021", amount: 25.00 }
        ]},
        // 148 U – 154 U
        { number: "148 U", name: "148 U", ingredients: [
            { name: "PANTONE Yellow", amount: 4.70 },
            { name: "PANTONE Warm Red", amount: 1.60 },
            { name: "PANTONE Trans. Wt.", amount: 93.70 }
        ]},
        { number: "149 U", name: "149 U", ingredients: [
            { name: "PANTONE Yellow", amount: 9.40 },
            { name: "PANTONE Warm Red", amount: 3.10 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "150 U", name: "150 U", ingredients: [
            { name: "PANTONE Yellow", amount: 37.50 },
            { name: "PANTONE Warm Red", amount: 12.50 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "151 U", name: "151 U", ingredients: [
            { name: "PANTONE Yellow", amount: 75.00 },
            { name: "PANTONE Warm Red", amount: 25.00 }
        ]},
        { number: "152 U", name: "152 U", ingredients: [
            { name: "PANTONE Yellow", amount: 73.90 },
            { name: "PANTONE Warm Red", amount: 24.60 },
            { name: "PANTONE Trans. Wt.", amount: 1.50 }
        ]},
        { number: "153 U", name: "153 U", ingredients: [
            { name: "PANTONE Yellow", amount: 70.60 },
            { name: "PANTONE Warm Red", amount: 23.50 },
            { name: "PANTONE Trans. Wt.", amount: 5.90 }
        ]},
        { number: "154 U", name: "154 U", ingredients: [
            { name: "PANTONE Yellow", amount: 66.70 },
            { name: "PANTONE Warm Red", amount: 22.20 },
            { name: "PANTONE Trans. Wt.", amount: 11.10 }
        ]},
        // 1485 U – 1545 U
        { number: "1485 U", name: "1485 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 12.50 },
            { name: "PANTONE Trans. Wt.", amount: 87.50 }
        ]},
        { number: "1495 U", name: "1495 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 25.00 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "1505 U", name: "1505 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 50.00 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "1525 U", name: "1525 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 97.00 },
            { name: "PANTONE Black", amount: 3.00 }
        ]},
        { number: "1535 U", name: "1535 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 88.90 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        { number: "1545 U", name: "1545 U", ingredients: [
            { name: "PANTONE Orange 021", amount: 72.70 },
            { name: "PANTONE Black", amount: 27.30 }
        ]},
        // 1555 U – 1615 U
        { number: "1555 U", name: "1555 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 7.00 },
            { name: "PANTONE Trans. Wt.", amount: 5.50 },
            { name: "PANTONE Black", amount: 87.50 }
        ]},
        { number: "1565 U", name: "1565 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 14.10 },
            { name: "PANTONE Warm Red", amount: 19.90 },
            { name: "PANTONE Trans. Wt.", amount: 75.00 }
        ]},
        { number: "1575 U", name: "1575 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 28.10 },
            { name: "PANTONE Warm Red", amount: 21.90 },
            { name: "PANTONE Trans. Wt.", amount: 50.00 }
        ]},
        { number: "1585 U", name: "1585 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 56.20 },
            { name: "PANTONE Warm Red", amount: 43.80 }
        ]},
        { number: "1595 U", name: "1595 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 54.50 },
            { name: "PANTONE Warm Red", amount: 42.50 },
            { name: "PANTONE Black", amount: 3.00 }
        ]},
        { number: "1605 U", name: "1605 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 50.00 },
            { name: "PANTONE Warm Red", amount: 38.90 },
            { name: "PANTONE Black", amount: 11.10 }
        ]},
        { number: "1615 U", name: "1615 U", ingredients: [
            { name: "PANTONE Yellow Warm Red", amount: 47.40 },
            { name: "PANTONE Warm Red", amount: 36.80 },
            { name: "PANTONE Black", amount: 15.80 }
        ]}
    ];

    // Функція для визначення категорії за номером
    function getCategoryFromNumber(number) {
        const num = String(number).toUpperCase();
        if (num.includes('U')) return 'uncoated';
        if (num.includes('C')) return 'coated';
        // За замовчуванням – uncoated, оскільки більшість ваших мають U
        return 'uncoated';
    }

    // Доповнюємо кольори категорією та базовим кольором
    const colors = basePantoneColors.map(color => {
        return {
            ...color,
            category: getCategoryFromNumber(color.number),
            hex: '#CCCCCC', // Тимчасово, доки не додамо зовнішні дані
            rgb: '',
            cmyk: ''
        };
    });

    SICOMIX.pantone = {
        colors: colors,

        // Допоміжна функція для нормалізації номера
        normalizeNumber: function(number) {
            if (!number) return '';
            return String(number).trim().replace(/\s+/g, ' ').toUpperCase();
        },

        // Допоміжна функція для пошуку кольору за номером
        findByNumber: function(number) {
            const normalized = this.normalizeNumber(number);
            return this.colors.find(c => this.normalizeNumber(c.number) === normalized);
        },

        // Функція для отримання всіх номерів (для списків)
        getAllNumbers: function() {
            return this.colors.map(c => c.number);
        },

        // Функція для отримання рецепту (інгредієнтів) для показу в модальному вікні
        getRecipeHTML: function(pantoneNumber) {
            const color = this.findByNumber(pantoneNumber);
            if (!color) return `<p>${SICOMIX.i18n ? SICOMIX.i18n.t('no_pantone') : 'No Pantone color found'}</p>`;
            
            let html = `<h3>${color.number}</h3>`;
            if (color.name && color.name !== color.number) {
                html += `<p><em>${SICOMIX.utils ? SICOMIX.utils.escapeHtml(color.name) : color.name}</em></p>`;
            }
            html += '<table style="width:100%; border-collapse:collapse; margin-top:15px;">';
            html += `<tr><th style="text-align:left; padding:8px; background:rgba(58,134,255,0.2);">${SICOMIX.i18n ? SICOMIX.i18n.t('ingredient') : 'Ingredient'}</th><th style="text-align:right; padding:8px; background:rgba(58,134,255,0.2);">${SICOMIX.i18n ? SICOMIX.i18n.t('amount') : 'Amount'}</th></tr>`;
            
            if (color.ingredients && color.ingredients.length > 0) {
                color.ingredients.forEach(ing => {
                    const name = SICOMIX.utils ? SICOMIX.utils.escapeHtml(ing.name) : ing.name;
                    html += `<tr><td style="padding:8px; border-bottom:1px solid rgba(255,255,255,0.1);">${name}</td><td style="padding:8px; border-bottom:1px solid rgba(255,255,255,0.1); text-align:right;">${ing.amount}%</td></tr>`;
                });
            } else {
                html += `<tr><td colspan="2" style="padding:20px; text-align:center;">${SICOMIX.i18n ? SICOMIX.i18n.t('no_recipe_data') : 'No ingredient data'}</td></tr>`;
            }
            
            html += '</table>';
            
            if (color.hex && color.hex !== '#CCCCCC') {
                html += `<div style="margin-top:15px; display:flex; align-items:center; gap:10px;">
                    <div style="width:30px; height:30px; background:${color.hex}; border-radius:6px; border:1px solid rgba(255,255,255,0.2);"></div>
                    <span>HEX: ${color.hex}</span>
                </div>`;
            }
            if (color.rgb) {
                html += `<div style="margin-top:5px;">RGB: ${color.rgb}</div>`;
            }
            if (color.cmyk) {
                html += `<div style="margin-top:5px;">CMYK: ${color.cmyk}</div>`;
            }
            
            return html;
        }
    };

    console.log(`[SICOMIX] pantone-data.js завантажено, ${colors.length} кольорів`);

})(window);
