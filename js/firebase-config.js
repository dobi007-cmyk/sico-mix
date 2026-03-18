// ========== КОНФІГУРАЦІЯ FIREBASE (МОДУЛЬ) ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
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

// Іменовані експорти для використання в інших модулях
export { auth, db, serverTimestamp };

// Обгортка для auth (сумісна зі старим API)
const authWrapper = {
    signInAnonymously: () => signInAnonymously(auth),
    signOut: () => signOut(auth),
    signInWithEmailAndPassword: (email, password) => signInWithEmailAndPassword(auth, email, password),
    createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signInWithPopup: (provider) => signInWithPopup(auth, provider),
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

// Глобальний об'єкт SICOMIX.firebase (для зворотної сумісності)
window.SICOMIX = window.SICOMIX || {};
window.SICOMIX.firebase = {
    auth: authWrapper,
    db: dbWrapper,
    firestore: { FieldValue }
};

console.log('🔥 Firebase ініціалізовано (модульна версія)');
