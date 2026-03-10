// ========== КОНФІГУРАЦІЯ FIREBASE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // 🔧 ЗАМІНІТЬ ЦІ ДАНІ НА СВОЇ З FIREBASE CONSOLE
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",                // <-- ВСТАВТЕ СВІЙ API KEY
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",           // <-- ВСТАВТЕ СВІЙ PROJECT ID
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",    // <-- ВСТАВТЕ СВІЙ SENDER ID
        appId: "YOUR_APP_ID"                    // <-- ВСТАВТЕ СВІЙ APP ID
    };

    // Ініціалізація Firebase
    firebase.initializeApp(firebaseConfig);

    SICOMIX.firebase = {
        auth: firebase.auth(),
        db: firebase.firestore()
    };

    // Додаємо провайдер Google (для майбутнього використання)
    SICOMIX.firebase.auth.GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

    // Налаштування Firestore (persistence)
    SICOMIX.firebase.db.settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    });
    firebase.firestore().enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('⚠️ Persistence failed: multiple tabs open');
            } else if (err.code == 'unimplemented') {
                console.warn('⚠️ Persistence not supported');
            }
        });

    console.log('🔥 Firebase ініціалізовано');
})(window);
