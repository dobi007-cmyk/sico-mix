// ========== КОНФІГУРАЦІЯ FIREBASE (МОДУЛЬ) ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, signInAnonymously, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUlS9Xe3tO2BW3l8HKsKqmicPFe9W3Swk",
    authDomain: "sico-mix.firebaseapp.com",
    projectId: "sico-mix",
    storageBucket: "sico-mix.firebasestorage.app",
    messagingSenderId: "575736040671",
    appId: "1:575736040671:web:7045aa32fe98c5b7906d6a",
    measurementId: "G-HGZ0DT3V09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Обгортка для auth (сумісна зі старим API)
const authWrapper = {
    signInAnonymously: () => signInAnonymously(auth),
    signOut: () => signOut(auth),
    get currentUser() { return auth.currentUser; },
    onAuthStateChanged: (callback) => auth.onAuthStateChanged(callback),
    GoogleAuthProvider: GoogleAuthProvider
};

// Обгортка для Firestore
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

// Експортуємо для використання в інших модулях
export { authWrapper as auth, dbWrapper as db, serverTimestamp };

// Також створюємо глобальний об'єкт для зворотної сумісності
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.firebase = {
    auth: authWrapper,
    db: dbWrapper,
    firestore: { FieldValue: { serverTimestamp } }
};

console.log('🔥 Firebase ініціалізовано (модуль)');
