const SERIES = ["EC", "CF", "PLUV", "SX", "SPTN", "SN", "AS", "OTF"];

const BASE_COLORS = [
  { code: "10", name: "White", hex: "#fff" },
  { code: "20", name: "Yellow", hex: "#ffd400" },
  { code: "24", name: "Red", hex: "#d10000" },
  { code: "30", name: "Blue", hex: "#0033a0" },
  { code: "32", name: "Green", hex: "#007a3d" },
  { code: "40", name: "Black", hex: "#000" }
];

const COLORS = [];

SERIES.forEach(s => {
  BASE_COLORS.forEach(c => {
    COLORS.push({
      series: s,
      code: s + c.code,
      name: c.name,
      hex: c.hex
    });
  });
});});