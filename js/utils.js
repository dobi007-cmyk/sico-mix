// ============================================
// SICO MIX Utilities (Production-ready)
// ============================================

/* =====================
   NUMBERS & DATES
===================== */

export function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || !isFinite(num)) return '0';

  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true
  });
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function isNumeric(value) {
  if (typeof value === 'number') return isFinite(value);
  if (typeof value !== 'string') return false;
  return value.trim() !== '' && !isNaN(value);
}

export function formatDate(date, includeTime = false) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return d.toLocaleDateString(undefined, options);
}

/* =====================
   IDS & RANDOM
===================== */

export function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 11)
  );
}

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function randomIntInRange(min, max) {
  return Math.floor(randomInRange(min, max + 1));
}

/* =====================
   ARRAYS & OBJECTS
===================== */

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  return Object.keys(obj).reduce((clone, key) => {
    clone[key] = deepClone(obj[key]);
    return clone;
  }, {});
}

export function isEmptyObject(obj) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    obj.constructor === Object &&
    Object.keys(obj).length === 0
  );
}

export function get(obj, path, defaultValue = undefined) {
  if (!obj || !path) return defaultValue;

  const keys = path.toString().match(/[^.[\]]+/g) || [];
  let result = obj;

  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

export function set(obj, path, value) {
  if (Object(obj) !== obj) return obj;

  const keys = path.toString().match(/[^.[\]]+/g) || [];
  let cur = obj;

  keys.slice(0, -1).forEach((key, i) => {
    if (Object(cur[key]) !== cur[key]) {
      cur[key] = isNaN(keys[i + 1]) ? {} : [];
    }
    cur = cur[key];
  });

  cur[keys[keys.length - 1]] = value;
  return obj;
}

/* =====================
   STRINGS
===================== */

export function removeAccents(str = '') {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function truncate(str = '', length = 0) {
  const s = str.toString();
  return s.length <= length ? s : s.slice(0, length) + '...';
}

/* =====================
   COLORS
===================== */

function isValidHex(hex) {
  return /^#?[0-9a-f]{6}$/i.test(hex);
}

export function hexToRgb(hex) {
  if (!isValidHex(hex)) return null;
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}

export function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function getColorBrightness(hexColor) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return 'dark';

  const brightness =
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  return brightness > 128 ? 'light' : 'dark';
}

export function adjustColorBrightness(hexColor, percent = 0) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;

  const factor = 1 + percent / 100;

  return rgbToHex(
    Math.round(rgb.r * factor),
    Math.round(rgb.g * factor),
    Math.round(rgb.b * factor)
  );
}

export function generateColorPalette(hexColor, count = 5) {
  if (!isValidHex(hexColor) || count < 1) return [];

  const mid = (count - 1) / 2;
  return Array.from({ length: count }, (_, i) =>
    adjustColorBrightness(hexColor, ((i - mid) / count) * 60)
  );
}

export function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);

  return (bright + 0.05) / (dark + 0.05);
}

function getLuminance(hexColor) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return 0;

  const toLinear = c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const r = toLinear(rgb.r / 255);
  const g = toLinear(rgb.g / 255);
  const b = toLinear(rgb.b / 255);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/* =====================
   RECIPE HELPERS
===================== */

export function calculateWeights(items, totalWeight) {
  if (!Array.isArray(items) || !isFinite(totalWeight)) return [];

  return items.map(item => ({
    ...item,
    weight: isFinite(item.percent)
      ? (item.percent * totalWeight) / 100
      : 0
  }));
}

/* =====================
   ASYNC & FILES
===================== */

export function debounce(func, wait = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle(func, limit = 300) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function formatFileSize(bytes = 0) {
  if (!bytes) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =====================
   DEFAULT EXPORT
===================== */

export default {
  formatNumber,
  clamp,
  generateId,
  isNumeric,
  formatDate,
  calculateWeights,
  debounce,
  throttle,
  deepClone,
  getColorBrightness,
  generateColorPalette,
  adjustColorBrightness,
  getContrastRatio,
  isValidEmail,
  formatFileSize,
  blobToDataURL,
  sleep,
  randomInRange,
  randomIntInRange,
  isEmptyObject,
  get,
  set,
  removeAccents,
  truncate,
  hexToRgb,
  rgbToHex
};
