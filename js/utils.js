// ============================================
// SICO MIX Utilities
// ============================================

/**
 * Format number with thousands separator and decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {string} Formatted number
 */
export function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  
  const options = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true
  };
  
  return num.toLocaleString(undefined, options);
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Check if value is numeric
 * @param {*} value - Value to check
 * @returns {boolean} True if numeric
 */
export function isNumeric(value) {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {boolean} includeTime - Include time (default: false)
 * @returns {string} Formatted date
 */
export function formatDate(date, includeTime = false) {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }
  
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

/**
 * Calculate weights for recipe items
 * @param {Array} items - Recipe items with percentages
 * @param {number} totalWeight - Total weight in grams
 * @returns {Array} Items with calculated weights
 */
export function calculateWeights(items, totalWeight) {
  if (!Array.isArray(items) || typeof totalWeight !== 'number') {
    return items || [];
  }
  
  return items.map(item => ({
    ...item,
    weight: (item.percent * totalWeight) / 100
  }));
}

/**
 * Debounce function for limiting rapid calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function for limiting call frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
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

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
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

/**
 * Get color brightness (light or dark)
 * @param {string} hexColor - Hex color code
 * @returns {string} 'light' or 'dark'
 */
export function getColorBrightness(hexColor) {
  if (!hexColor) return 'dark';
  
  // Remove # if present
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return 'dark';
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? 'light' : 'dark';
}

/**
 * Generate color palette from base color
 * @param {string} hexColor - Base color
 * @param {number} count - Number of colors to generate
 * @returns {Array} Color palette
 */
export function generateColorPalette(hexColor, count = 5) {
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    // Simple tint/shade generation
    const factor = (i - (count - 1) / 2) / count;
    colors.push(adjustColorBrightness(hexColor, factor * 50));
  }
  
  return colors;
}

/**
 * Adjust color brightness
 * @param {string} hexColor - Base color
 * @param {number} percent - Percentage to adjust (-100 to 100)
 * @returns {string} Adjusted color
 */
export function adjustColorBrightness(hexColor, percent) {
  if (!hexColor) return '#000000';
  
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return hexColor;
  
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  
  const factor = 1 + (percent / 100);
  
  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (hex)
 * @param {string} color2 - Second color (hex)
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(color1, color2) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Calculate color luminance
 * @param {string} hexColor - Color in hex format
 * @returns {number} Luminance value
 */
function getLuminance(hexColor) {
  if (!hexColor) return 0;
  
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return 0;
  
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const srgb = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Create data URL from blob
 * @param {Blob} blob - Blob to convert
 * @returns {Promise<string>} Data URL
 */
export function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random number in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Generate random integer in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Get object value by path
 * @param {Object} obj - Object
 * @param {string} path - Path to value
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Value at path
 */
export function get(obj, path, defaultValue = undefined) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

/**
 * Set object value by path
 * @param {Object} obj - Object
 * @param {string} path - Path to set
 * @param {*} value - Value to set
 * @returns {Object} Updated object
 */
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

/**
 * Remove accents/diacritics from string
 * @param {string} str - String to process
 * @returns {string} String without accents
 */
export function removeAccents(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string
 */
export function truncate(str, length) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color
 * @returns {Object} RGB object
 */
export function hexToRgb(hex) {
  if (!hex) return null;
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color
 */
export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Validate hex color
 * @param {string} color - Color to validate
 * @returns {boolean} True if valid hex color
 */
export function isValidHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Convert percentage to color
 * @param {number} percent - Percentage (0-100)
 * @returns {string} Color from red to green
 */
export function percentToColor(percent) {
  const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
  const g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
  return rgbToHex(r, g, 0);
}

/**
 * Capitalize first letter
 * @param {string} string - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Generate random color
 * @returns {string} Random hex color
 */
export function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Export all functions
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
  isValidHexColor,
  percentToColor,
  capitalize,
  getRandomColor
};