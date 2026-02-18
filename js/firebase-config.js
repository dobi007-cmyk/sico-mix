// ========== КОНФІГУРАЦІЯ FIREBASE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // Замініть на свій конфіг (отримаєте у Firebase Console -> Project settings)
    const firebaseConfig = {
        apiKey: "AIzaSyBp8jK...",            // <-- ВСТАВТЕ СВІЙ API KEY
        authDomain: "sico-spectrum.firebaseapp.com",
        projectId: "sico-spectrum",
        storageBucket: "sico-spectrum.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:1234567890:web:abcdef..."
    };

    // Ініціалізація Firebase
    firebase.initializeApp(firebaseConfig);

    SICOMIX.firebase = {
        auth: firebase.auth(),
        db: firebase.firestore()
    };

    // Налаштування Firestore (можна ввімкнути persistence)
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
