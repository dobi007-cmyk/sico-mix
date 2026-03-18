// ========== КОНФІГУРАЦІЯ FIREBASE (МОДУЛЬНА) ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, signInAnonymously, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Ваші дані з Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBUlS9Xe3tO2BW3l8HKsKqmicPFe9W3Swk",
    authDomain: "sico-mix.firebaseapp.com",
    projectId: "sico-mix",
    storageBucket: "sico-mix.firebasestorage.app",
    messagingSenderId: "575736040671",
    appId: "1:575736040671:web:7045aa32fe98c5b7906d6a",
    measurementId: "G-HGZ0DT3V09"
};

// Ініціалізація
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Обгортка для auth (імітує старий firebase.auth())
const authWrapper = {
    signInAnonymously: () => signInAnonymously(auth),
    signOut: () => signOut(auth),
    get currentUser() { return auth.currentUser; },
    onAuthStateChanged: (callback) => auth.onAuthStateChanged(callback),
    GoogleAuthProvider: GoogleAuthProvider
};

// Обгортка для Firestore (імітує старий firebase.firestore())
const dbWrapper = {
    collection: (path) => {
        const colRef = collection(db, path);
        return {
            doc: (id) => {
                const docRef = doc(colRef, id);
                return {
                    get: async () => {
                        const snap = await getDoc(docRef);
                        return {
                            exists: snap.exists(),
                            data: () => snap.data()
                        };
                    },
                    set: async (data, options) => {
                        await setDoc(docRef, data, options);
                    }
                };
            }
        };
    }
};

// FieldValue для serverTimestamp
const FieldValue = {
    serverTimestamp: serverTimestamp
};

// Глобальний об'єкт SICOMIX.firebase
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.firebase = {
    auth: authWrapper,
    db: dbWrapper,
    firestore: { FieldValue }
};

console.log('🔥 Firebase ініціалізовано (модульна версія)');// ========== КОНФІГУРАЦІЯ FIREBASE ==========
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
