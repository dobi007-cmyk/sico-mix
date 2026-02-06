export function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) return '0.00';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value)));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

export function calculateWeights(items, totalWeight = 100) {
  if (!Array.isArray(items) || items.length === 0) return [];
  const totalPercent = items.reduce((sum, item) => sum + (item.percent || 0), 0);
  if (totalPercent <= 0) return items.map(i => ({ ...i, weight: 0 }));
  return items.map(item => ({
    ...item,
    weight: (item.percent / totalPercent) * totalWeight
  }));
}

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function getColorByCode(code) {
  return window.SICO?.colors?.find(c => c.code === code) || null;
}

export function deepClone(obj) {
  try {
    return structuredClone(obj);
  } catch (e) {
    return JSON.parse(JSON.stringify(obj));
  }
}

// Додаткові корисні функції
export function isDarkColor(hex) {
  if (!hex || hex.length < 4) return true;
  const c = hex.replace('#', '');
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
}

export function throttle(fn, limit = 200) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
