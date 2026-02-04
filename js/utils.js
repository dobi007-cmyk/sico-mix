// utils.js - Допоміжні функції

// Форматування чисел з роздільниками
function formatNumber(num, decimals = 2) {
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join(',');
}

// Обмеження числа в діапазон
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Генерація унікального ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Перевірка, чи є значення числом
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Експорт
export { formatNumber, clamp, generateId, isNumeric };