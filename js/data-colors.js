/* =========================
   SICO MIX – Paint Catalog
   ========================= */

const SERIES = ["EC","CF","PLUV","SX","SPTN","SN","AS","OTF"];

const BASE_COLORS = [
  { code:"10", name:{ua:"Білий",pl:"Biały",en:"White"}, hex:"#ffffff" },
  { code:"20", name:{ua:"Жовтий",pl:"Żółty",en:"Yellow"}, hex:"#ffd400" },
  { code:"22", name:{ua:"Помаранчевий",pl:"Pomarańczowy",en:"Orange"}, hex:"#ff7a00" },
  { code:"24", name:{ua:"Червоний",pl:"Czerwony",en:"Red"}, hex:"#d10000" },
  { code:"26", name:{ua:"Бордовий",pl:"Bordowy",en:"Bordeaux"}, hex:"#7a0019" },
  { code:"27", name:{ua:"Фіолетовий",pl:"Fioletowy",en:"Violet"}, hex:"#5a2a82" },
  { code:"30", name:{ua:"Синій",pl:"Niebieski",en:"Blue"}, hex:"#0033a0" },
  { code:"32", name:{ua:"Зелений",pl:"Zielony",en:"Green"}, hex:"#007a3d" },
  { code:"40", name:{ua:"Чорний",pl:"Czarny",en:"Black"}, hex:"#000000" }
];

const COLORS = [];

SERIES.forEach(series=>{
  BASE_COLORS.forEach(c=>{
    COLORS.push({
      series,
      code: series + c.code,
      name: c.name,
      hex: c.hex
    });
  });
});
