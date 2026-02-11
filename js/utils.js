// utils.js – безпечні утиліти, IndexedDB, експорт, генерація ID

// ------------------- Санітайзинг -------------------
export function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeRecipe(recipe) {
  return {
    ...recipe,
    name: escapeHTML(recipe.name),
    description: escapeHTML(recipe.description),
    category: escapeHTML(recipe.category)
  };
}

// ------------------- IndexedDB -------------------
const DB_NAME = 'SICOMIX_DB';
const DB_VERSION = 2;
const STORE_RECIPES = 'recipes';
const STORE_PAINTS = 'paints';
const STORE_SETTINGS = 'settings';

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_RECIPES)) {
          db.createObjectStore(STORE_RECIPES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_PAINTS)) {
          db.createObjectStore(STORE_PAINTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
          db.createObjectStore(STORE_SETTINGS, { keyPath: 'key' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

export async function saveToIndexedDB(storeName, data) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  if (Array.isArray(data)) {
    data.forEach(item => store.put(item));
  } else {
    store.put(data);
  }
  return tx.done;
}

export async function loadFromIndexedDB(storeName, key = null) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  if (key) return store.get(key);
  return store.getAll();
}

export async function deleteFromIndexedDB(storeName, key) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.delete(key);
  return tx.done;
}

export async function clearStore(storeName) {
  const db = await getDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.clear();
  return tx.done;
}

// ------------------- Інші утиліти -------------------
export function generateId() {
  return `${Date.now()}-${crypto.randomUUID().slice(0,8)}`;
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function downloadFile(content, fileName, mimeType = 'application/json') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatDate(date, locale = 'uk-UA') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(date));
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function calculateIngredientPercentages(ingredients) {
  const total = ingredients.reduce((sum, ing) => sum + (parseFloat(ing.amount) || 0), 0);
  if (total === 0) return ingredients;
  return ingredients.map(ing => ({
    ...ing,
    percentage: parseFloat(((ing.amount / total) * 100).toFixed(1))
  }));
}

export function formatNumber(num, decimals = 2) {
  return parseFloat(num).toFixed(decimals);
}
