// ========== КОНФІГУРАЦІЯ FIREBASE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    // 🔧 ЗАМІНІТЬ ЦІ ДАНІ НА СВОЇ З FIREBASE CONSOLE
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Ініціалізація Firebase
    firebase.initializeApp(firebaseConfig);

    SICOMIX.firebase = {
        auth: firebase.auth(),
        db: firebase.firestore()
    };

    // Додаємо провайдер Google
    SICOMIX.firebase.auth.GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

    // Налаштування Firestore з {merge: true} – це запобігає перезапису інших налаштувань
    SICOMIX.firebase.db.settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    }, { merge: true });

    // Увімкнення persistence (якщо можливо)
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
