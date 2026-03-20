// ========== МОДУЛЬ СИНХРОНІЗАЦІЇ ==========
const i18n = window.SICOMIX?.i18n || { t: key => key };
const utils = window.SICOMIX?.utils || {
    showNotification: (msg, type) => console.log(msg, type),
    debounce: (fn, delay) => fn,
    generateId: () => Date.now()
};

let currentUser = null;

function updateSyncStatus(message, isError = false) {
    const el = document.getElementById('syncStatus');
    if (!el) return;
    const icon = el.querySelector('i');
    const text = el.querySelector('span');
    if (icon) icon.className = isError ? 'fas fa-exclamation-triangle' : 'fas fa-cloud';
    if (text) text.textContent = message;
}

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

async function signOut() {
    try {
        await window.SICOMIX.firebase.auth.signOut();
        currentUser = null;
        updateSyncStatus(i18n.t('offline'));
    } catch (error) {
        console.error('Помилка виходу:', error);
    }
}

function getCurrentUser() {
    return currentUser || window.SICOMIX.firebase?.auth?.currentUser;
}

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

export { signInAnonymously, signOut, getCurrentUser, loadUserData, saveUserData };
