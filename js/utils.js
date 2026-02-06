// Утиліти SICO MIX
export function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  
  const options = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true
  };
  
  return num.toLocaleString(undefined, options);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function isNumeric(value) {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
}

export function formatDate(date, includeTime = false) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return d.toLocaleDateString(undefined, options);
}

export function calculateWeights(items, totalWeight) {
  if (!Array.isArray(items) || typeof totalWeight !== 'number') return [];
  
  return items.map(item => ({
    ...item,
    weight: (item.percent * totalWeight) / 100
  }));
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  
  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepClone(item);
      return arr;
    }, []);
  }
  
  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = deepClone(obj[key]);
      return newObj;
    }, {});
  }
}

export function getColorBrightness(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'light' : 'dark';
}

export function generateColorPalette(hexColor, count = 5) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const factor = (i - (count - 1) / 2) / count;
    colors.push(adjustColorBrightness(hexColor, factor * 50));
  }
  return colors;
}

export function adjustColorBrightness(hexColor, percent) {
  const hex = hexColor.replace('#', '');
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  const factor = 1 + (percent / 100);
  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function getContrastRatio(color1, color2) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  const srgb = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function get(obj, path, defaultValue = undefined) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

export function set(obj, path, value) {
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  
  path.slice(0, -1).reduce((a, c, i) =>
    Object(a[c]) === a[c]
      ? a[c]
      : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
    obj
  )[path[path.length - 1]] = value;
  
  return obj;
}

export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function truncate(str, length) {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Нові функції для SICO MIX
export function validatePercentageSum(items, tolerance = 5) {
  const total = items.reduce((sum, item) => sum + item.percent, 0);
  return Math.abs(100 - total) <= tolerance;
}

export function normalizePercentages(items) {
  const total = items.reduce((sum, item) => sum + item.percent, 0);
  if (total === 0) return items;
  
  return items.map(item => ({
    ...item,
    percent: parseFloat(((item.percent / total) * 100).toFixed(2))
  }));
}

export function calculateTotalWeight(items, targetTotal = 1000) {
  const totalPercent = items.reduce((sum, item) => sum + item.percent, 0);
  return items.map(item => ({
    ...item,
    weight: parseFloat(((item.percent / totalPercent) * targetTotal).toFixed(2))
  }));
}

export function generateRecipeCode(name) {
  const timestamp = Date.now().toString(36);
  const nameCode = name.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SICO-${nameCode}-${timestamp}-${random}`;
}

export function exportToCSV(items, filename = 'recipe.csv') {
  const headers = ['Код', 'Назва', 'Відсоток', 'Вага (г)'];
  const rows = items.map(item => [
    item.code,
    item.name,
    `${item.percent}%`,
    item.weight || 0
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function calculatePaintCost(items, pricePerKg = 100) {
  return items.reduce((total, item) => {
    const weight = item.weight || 0;
    return total + (weight / 1000) * pricePerKg;
  }, 0);
}

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
  rgbToHex,
  validatePercentageSum,
  normalizePercentages,
  calculateTotalWeight,
  generateRecipeCode,
  exportToCSV,
  calculatePaintCost
};
