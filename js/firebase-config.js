// ========== КОНФІГУРАЦІЯ FIREBASE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // 🔧 ЗАМІНІТЬ ЦІ ДАНІ НА СВОЇ З FIREBASE CONSOLE
    const firebaseConfig = {
        apiKey: "AIzaSyBp8jK...",            // <-- ВСТАВТЕ СВІЙ API KEY
        authDomain: "sico-spectrum.firebaseapp.com",
        projectId: "sico-spectrum",           // <-- ВСТАВТЕ СВІЙ PROJECT ID
        storageBucket: "sico-spectrum.appspot.com",
        messagingSenderId: "1234567890",      // <-- ВСТАВТЕ СВІЙ SENDER ID
        appId: "1:1234567890:web:abcdef..."   // <-- ВСТАВТЕ СВІЙ APP ID
    };

    // Ініціалізація Firebase
    firebase.initializeApp(firebaseConfig);

    SICOMIX.firebase = {
        auth: firebase.auth(),
        db: firebase.firestore()
    };

    // Додаємо провайдер Google
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
