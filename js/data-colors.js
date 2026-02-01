/* =========================
   SICO MIX – Paint Catalog
   ========================= */

const SERIES = [
  { id: "EC", name: "EC" },
  { id: "CF", name: "CF" },
  { id: "PLUV", name: "PLUV" },
  { id: "SX", name: "SX" },
  { id: "SPTN", name: "SPTN" },
  { id: "SN", name: "SN" },
  { id: "AS", name: "AS" },
  { id: "OTF", name: "OTF" }
];

const BASE_COLORS = [
  { code: "10", name: { ua: "Білий", pl: "Biały", en: "White" }, hex: "#ffffff" },
  { code: "20", name: { ua: "Жовтий", pl: "Żółty", en: "Yellow" }, hex: "#ffd400" },
  { code: "20/B", name: { ua: "Жовтий B", pl: "Żółty B", en: "Yellow B" }, hex: "#ffcc00" },
  { code: "22", name: { ua: "Помаранчевий", pl: "Pomarańczowy", en: "Orange" }, hex: "#ff7a00" },
  { code: "24", name: { ua: "Червоний", pl: "Czerwony", en: "Red" }, hex: "#d10000" },
  { code: "26", name: { ua: "Бордовий", pl: "Bordowy", en: "Bordeaux" }, hex: "#7a0019" },
  { code: "27", name: { ua: "Фіолетовий", pl: "Fioletowy", en: "Violet" }, hex: "#5a2a82" },
  { code: "30", name: { ua: "Синій", pl: "Niebieski", en: "Blue" }, hex: "#0033a0" },
  { code: "31", name: { ua: "Темно-синій", pl: "Granatowy", en: "Dark Blue" }, hex: "#001f5b" },
  { code: "32", name: { ua: "Зелений", pl: "Zielony", en: "Green" }, hex: "#007a3d" },
  { code: "33", name: { ua: "Темно-зелений", pl: "Ciemnozielony", en: "Dark Green" }, hex: "#004d2a" },
  { code: "40", name: { ua: "Чорний", pl: "Czarny", en: "Black" }, hex: "#000000" },
  { code: "41", name: { ua: "Сірий", pl: "Szary", en: "Grey" }, hex: "#7a7a7a" },
  { code: "50", name: { ua: "Коричневий", pl: "Brązowy", en: "Brown" }, hex: "#6b3e26" },
  { code: "60", name: { ua: "Прозорий", pl: "Transparentny", en: "Transparent" }, hex: "#f2f2f2" }
];

const COLORS = [];

SERIES.forEach(series => {
  BASE_COLORS.forEach(color => {
    COLORS.push({
      series: series.id,
      code: `${series.id}${color.code}`,
      baseCode: color.code,
      name: color.name,
      hex: color.hex
    });
  });
});