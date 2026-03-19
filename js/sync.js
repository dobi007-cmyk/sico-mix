// ========== МОДУЛЬ СИНХРОНІЗАЦІЇ ==========
// Використовуємо глобальний SICOMIX для i18n та utils
const { i18n, utils } = window.SICOMIX;

let currentUser = null;

function updateSyncStatus(message, isError = false) {
    const el = document.getElementById('syncStatus');
    if (!el) return;
    const icon = el.querySelector('i');
    const text = el.querySelector('span');
    if (icon) icon.className = isError ? 'fas fa-exclamation-triangle' : 'fas fa-cloud';
    if (text) text.textContent = message;
}

// Анонімний вхід
async function signInAnonymously() {
    try {
        updateSyncStatus(i18n.t('syncing'));
        const result = await window.SICOMIX.firebase.auth.signInAnonymously();
        currentUser = result.user;
        updateSyncStatus(i18n.t('sync_complete'));
        return currentUser;
    } catch (error) {
        console.error('Помилка входу:', error);
        updateSyncStatus(i18n.t('sync_error'), true);
        throw error;
    }
}

// Вихід
async function signOut() {
    try {
        await window.SICOMIX.firebase.auth.signOut();
        currentUser = null;
        updateSyncStatus(i18n.t('offline'));
    } catch (error) {
        console.error('Помилка виходу:', error);
    }
}

// Отримати поточного користувача
function getCurrentUser() {
    return currentUser || window.SICOMIX.firebase?.auth?.currentUser;
}

// Завантажити всі дані користувача з Firestore
async function loadUserData(userId) {
    if (!userId) return null;
    try {
        const docRef = window.SICOMIX.firebase.db.collection('users').doc(userId);
        const doc = await docRef.get();
        if (doc.exists) {
            return doc.data();
        } else {
            return { recipes: [], userPaints: [], settings: {} };
        }
    } catch (error) {
        console.error('Помилка завантаження з Firestore:', error);
        return null;
    }
}

// Зберегти всі дані користувача в Firestore
async function saveUserData(userId, data) {
    if (!userId) return false;
    try {
        const docRef = window.SICOMIX.firebase.db.collection('users').doc(userId);
        await docRef.set({
            ...data,
            updatedAt: window.SICOMIX.firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        updateSyncStatus(i18n.t('sync_complete'));
        return true;
    } catch (error) {
        console.error('Помилка збереження в Firestore:', error);
        updateSyncStatus(i18n.t('sync_error'), true);
        return false;
    }
}

// Експортуємо публічні методи
export { signInAnonymously, signOut, getCurrentUser, loadUserData, saveUserData };
