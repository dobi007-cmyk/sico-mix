// ========== МОДУЛЬ СИНХРОНІЗАЦІЇ З FIREBASE ==========
window.SICOMIX = window.SICOMIX || {};

(function(global) {
    const SICOMIX = global.SICOMIX;

    SICOMIX.sync = (function() {
        let currentUser = null;
        let syncStatusListeners = [];

        function updateSyncStatus(message, isError = false) {
            const el = document.getElementById('syncStatus');
            if (!el) return;
            const icon = el.querySelector('i');
            const text = el.querySelector('span');
            if (icon) icon.className = isError ? 'fas fa-exclamation-triangle' : 'fas fa-cloud';
            if (text) text.textContent = message;
        }

        function onAuthStateChanged(callback) {
            if (!SICOMIX.firebase) return;
            SICOMIX.firebase.auth.onAuthStateChanged(callback);
        }

        // Анонімний вхід (без реєстрації)
        async function signInAnonymously() {
            try {
                updateSyncStatus('Вхід...');
                const result = await SICOMIX.firebase.auth.signInAnonymously();
                currentUser = result.user;
                updateSyncStatus('Синхронізовано');
                return currentUser;
            } catch (error) {
                console.error('Помилка входу:', error);
                updateSyncStatus('Помилка синхронізації', true);
                throw error;
            }
        }

        // Вихід
        async function signOut() {
            try {
                await SICOMIX.firebase.auth.signOut();
                currentUser = null;
                updateSyncStatus('Офлайн');
            } catch (error) {
                console.error('Помилка виходу:', error);
            }
        }

        // Завантажити рецепти з Firestore
        async function loadRecipesFromFirestore() {
            if (!currentUser) return [];
            try {
                const snapshot = await SICOMIX.firebase.db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('recipes')
                    .get();
                const recipes = [];
                snapshot.forEach(doc => {
                    recipes.push({ id: doc.id, ...doc.data() });
                });
                return recipes;
            } catch (error) {
                console.error('Помилка завантаження рецептів:', error);
                updateSyncStatus('Помилка завантаження', true);
                return [];
            }
        }

        // Зберегти рецепти у Firestore (замінити всі)
        async function saveRecipesToFirestore(recipes) {
            if (!currentUser) return;
            try {
                const batch = SICOMIX.firebase.db.batch();
                const userRecipesRef = SICOMIX.firebase.db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('recipes');

                // Спочатку видалимо всі старі (або можна оновлювати по одному)
                const snapshot = await userRecipesRef.get();
                snapshot.forEach(doc => batch.delete(doc.ref));

                // Додаємо нові
                recipes.forEach(recipe => {
                    const docRef = userRecipesRef.doc(recipe.id);
                    batch.set(docRef, recipe);
                });

                await batch.commit();
                updateSyncStatus('Синхронізовано');
            } catch (error) {
                console.error('Помилка збереження рецептів:', error);
                updateSyncStatus('Помилка синхронізації', true);
            }
        }

        // Завантажити створені фарби з Firestore
        async function loadUserPaintsFromFirestore() {
            if (!currentUser) return [];
            try {
                const snapshot = await SICOMIX.firebase.db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('paints')
                    .get();
                const paints = [];
                snapshot.forEach(doc => {
                    paints.push({ id: doc.id, ...doc.data() });
                });
                return paints;
            } catch (error) {
                console.error('Помилка завантаження фарб:', error);
                return [];
            }
        }

        // Зберегти створені фарби у Firestore
        async function saveUserPaintsToFirestore(paints) {
            if (!currentUser) return;
            try {
                const batch = SICOMIX.firebase.db.batch();
                const userPaintsRef = SICOMIX.firebase.db
                    .collection('users')
                    .doc(currentUser.uid)
                    .collection('paints');

                const snapshot = await userPaintsRef.get();
                snapshot.forEach(doc => batch.delete(doc.ref));

                paints.forEach(paint => {
                    const docRef = userPaintsRef.doc(paint.id);
                    batch.set(docRef, paint);
                });

                await batch.commit();
            } catch (error) {
                console.error('Помилка збереження фарб:', error);
            }
        }

        // Ініціалізація: слухач автентифікації
        function initSync() {
            onAuthStateChanged(async (user) => {
                currentUser = user;
                if (user) {
                    updateSyncStatus('Синхронізація...');
                    // Завантажуємо дані з Firestore і об'єднуємо з локальними
                    const firestoreRecipes = await loadRecipesFromFirestore();
                    const firestorePaints = await loadUserPaintsFromFirestore();

                    // Локальні дані (які можуть бути з попередніх сесій)
                    const localRecipes = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumRecipes', []);
                    const localUserPaints = SICOMIX.utils.loadFromLocalStorage('sicoSpectrumUserPaints', []);

                    // Об'єднуємо (якщо є конфлікти, використовуємо Firestore як головний)
                    // Або можна зробити розумне об'єднання за датою зміни. Для простоти беремо Firestore.
                    let mergedRecipes = firestoreRecipes.length ? firestoreRecipes : localRecipes;
                    let mergedPaints = firestorePaints.length ? firestorePaints : localUserPaints;

                    // Зберігаємо локально
                    SICOMIX.utils.saveToLocalStorage('sicoSpectrumRecipes', mergedRecipes);
                    SICOMIX.utils.saveToLocalStorage('sicoSpectrumUserPaints', mergedPaints);

                    // Оновлюємо стан в app.js (викликаємо callback)
                    if (window.SICOMIX.app && window.SICOMIX.app.onSyncLoaded) {
                        window.SICOMIX.app.onSyncLoaded(mergedRecipes, mergedPaints);
                    }

                    updateSyncStatus('Синхронізовано');
                } else {
                    updateSyncStatus('Офлайн');
                }
            });
        }

        // Функція для примусового збереження всього
        async function saveAll() {
            if (!currentUser) return;
            // Використовуємо getRecords, який тепер є в app
            const data = window.SICOMIX.app?.getRecords?.() || { recipes: [], userPaints: [] };
            await saveRecipesToFirestore(data.recipes);
            await saveUserPaintsToFirestore(data.userPaints);
        }

        return {
            initSync,
            signInAnonymously,
            signOut,
            saveAll,
            getCurrentUser: () => currentUser
        };
    })();

})(window);
