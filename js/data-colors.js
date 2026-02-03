/* =========================
   SICO MIX – Paint Catalog
   ========================= */

const SERIES = [
  { id: "ALL", name: "ALL" },
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
  { code: "10", name: { ua:"Фіолетовий", pl:"Fioletowy", en:"Violet" }, hex:"#4b3b8f" },
  { code: "20", name: { ua:"Синій", pl:"Niebieski", en:"Blue" }, hex:"#0033a0" },
  { code: "20/B", name: { ua:"Синій Flex", pl:"Niebieski Flex", en:"Blue Flex" }, hex:"#002f6c" },
  { code: "P20/5", name: { ua:"Pantone Blue", pl:"Pantone Blue", en:"Pantone Blue" }, hex:"#1f4aa8" },

  { code: "22", name: { ua:"Ультрамарин", pl:"Ultramaryna", en:"Ultramarine" }, hex:"#1c3faa" },
  { code: "24", name: { ua:"Блакитний", pl:"Jasnoniebieski", en:"Light Blue" }, hex:"#2f6ecf" },
  { code: "26", name: { ua:"Світло-блакитний", pl:"Jasny niebieski", en:"Light Blue 2" }, hex:"#5fa8ff" },

  { code: "30", name: { ua:"Темно-зелений", pl:"Ciemnozielony", en:"Dark Green" }, hex:"#004d2a" },
  { code: "31", name: { ua:"Зелений", pl:"Zielony", en:"Green" }, hex:"#007a3d" },

  { code: "40", name: { ua:"Жовтий", pl:"Żółty", en:"Yellow" }, hex:"#ffd400" },
  { code: "50", name: { ua:"Помаранчевий", pl:"Pomarańczowy", en:"Orange" }, hex:"#ff7a00" },
  { code: "56", name: { ua:"Червоний", pl:"Czerwony", en:"Red" }, hex:"#d10000" },

  { code: "70", name: { ua:"Магента", pl:"Magenta", en:"Magenta" }, hex:"#e91e63" },
  { code: "90", name: { ua:"Білий", pl:"Biały", en:"White" }, hex:"#ffffff" },
  { code: "100", name: { ua:"Чорний", pl:"Czarny", en:"Black" }, hex:"#000000" }
];

const COLORS = [];

SERIES.filter(s=>s.id!=="ALL").forEach(series=>{
  BASE_COLORS.forEach(color=>{
    COLORS.push({
      series: series.id,
      code: `${series.id}${color.code}`,
      baseCode: color.code,
      name: color.name,
      hex: color.hex
    });
  });
});