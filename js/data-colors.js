/* =========================
   SICO MIX – Paint Catalog Data
   ========================= */

export const SERIES = [
  { id: "EC",   name: { ua: "EC",   pl: "EC",   en: "EC"   } },
  { id: "CF",   name: { ua: "CF",   pl: "CF",   en: "CF"   } },
  { id: "PLUV", name: { ua: "PLUV", pl: "PLUV", en: "PLUV" } },
  { id: "SX",   name: { ua: "SX",   pl: "SX",   en: "SX"   } },
  { id: "SPTN", name: { ua: "SPTN", pl: "SPTN", en: "SPTN" } },
  { id: "SN",   name: { ua: "SN",   pl: "SN",   en: "SN"   } },
  { id: "AS",   name: { ua: "AS",   pl: "AS",   en: "AS"   } },
  { id: "OTF",  name: { ua: "OTF",  pl: "OTF",  en: "OTF"  } }
];

export const BASE_COLORS = [
  // Фіолетові / Violet
  { code: "10",     name: { ua: "Фіолетовий",          pl: "Fioletowy",         en: "Violet"          }, hex: "#4b3b8f" },

  // Синій / Blue
  { code: "20",     name: { ua: "Синій",               pl: "Niebieski",         en: "Blue"            }, hex: "#0033a0" },
  { code: "20/B",   name: { ua: "Синій Flex",          pl: "Niebieski Flex",    en: "Blue Flex"       }, hex: "#002f6c" },
  { code: "P20/5",  name: { ua: "Pantone Blue",        pl: "Pantone Blue",      en: "Pantone Blue"    }, hex: "#1f4aa8" },
  { code: "22",     name: { ua: "Ультрамарин",         pl: "Ultramaryna",       en: "Ultramarine"     }, hex: "#1c3faa" },
  { code: "24",     name: { ua: "Блакитний",           pl: "Niebieski jasny",   en: "Light Blue"      }, hex: "#2f6ecf" },
  { code: "26",     name: { ua: "Світло-блакитний",    pl: "Jasnoniebieski",    en: "Light Blue 2"    }, hex: "#5fa8ff" },
  { code: "P26/2",  name: { ua: "Pantone Blue 2",      pl: "Pantone Blue 2",    en: "Pantone Blue 2"  }, hex: "#3b6db3" },

  // Бірюзовий / Turquoise
  { code: "27",     name: { ua: "Бірюзовий",           pl: "Turkusowy",         en: "Turquoise"       }, hex: "#00a3a3" },

  // Зелені / Green
  { code: "30",     name: { ua: "Темно-зелений",       pl: "Ciemnozielony",     en: "Dark Green"      }, hex: "#004d2a" },
  { code: "31",     name: { ua: "Зелений",             pl: "Zielony",           en: "Green"           }, hex: "#007a3d" },
  { code: "32",     name: { ua: "Яскраво-зелений",     pl: "Jasnozielony",      en: "Bright Green"    }, hex: "#00a651" },
  { code: "33",     name: { ua: "Зелений трава",       pl: "Zielony trawa",     en: "Grass Green"     }, hex: "#4caf50" },

  // Жовті / Yellow
  { code: "40",     name: { ua: "Жовтий",              pl: "Żółty",             en: "Yellow"          }, hex: "#ffd400" },
  { code: "41",     name: { ua: "Цитриновий",          pl: "Cytrynowy",         en: "Lemon Yellow"    }, hex: "#fff176" },
  { code: "42",     name: { ua: "Медовий",             pl: "Miodowy",           en: "Honey Yellow"    }, hex: "#ffb300" },

  // Помаранчеві / Orange
  { code: "50",     name: { ua: "Помаранчевий",        pl: "Pomarańczowy",      en: "Orange"          }, hex: "#ff7a00" },
  { code: "51",     name: { ua: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange"    }, hex: "#ff9800" },

  // Червоні / Red
  { code: "56",     name: { ua: "Червоний",            pl: "Czerwony",          en: "Red"             }, hex: "#d10000" },
  { code: "60",     name: { ua: "Темно-червоний",      pl: "Ciemnoczerwony",    en: "Dark Red"        }, hex: "#8b0000" },
  { code: "P60/38", name: { ua: "Pantone Red",         pl: "Pantone Red",       en: "Pantone Red"     }, hex: "#b11226" },
  { code: "61",     name: { ua: "Малиновий",           pl: "Karminowy",         en: "Carmine"         }, hex: "#b00040" },
  { code: "P61/15", name: { ua: "Pantone Magenta",     pl: "Pantone Magenta",   en: "Pantone Magenta" }, hex: "#c2185b" },

  // Магента та інші
  { code: "70",     name: { ua: "Магента",             pl: "Magenta",           en: "Magenta"         }, hex: "#e91e63" },

  // Коричневі / Brown
  { code: "80",     name: { ua: "Коричневий",          pl: "Brązowy",           en: "Brown"           }, hex: "#6b3e26" },
  { code: "81",     name: { ua: "Темно-коричневий",    pl: "Ciemnobrązowy",     en: "Dark Brown"      }, hex: "#4e342e" },
  { code: "82",     name: { ua: "Бежевий",             pl: "Beżowy",            en: "Beige"           }, hex: "#d7b899" },

  // Базові / Base
  { code: "90",     name: { ua: "Білий",               pl: "Biały",             en: "White"           }, hex: "#ffffff" },
  { code: "91",     name: { ua: "Криючий білий",       pl: "Biały kryjący",     en: "Opaque White"    }, hex: "#f5f5f5" },
  { code: "100",    name: { ua: "Чорний",              pl: "Czarny",            en: "Black"           }, hex: "#000000" },

  // Металіки
  { code: "110",    name: { ua: "Срібло",              pl: "Srebro",            en: "Silver"          }, hex: "#b0b0b0" },
  { code: "120",    name: { ua: "Золото",              pl: "Złoto",             en: "Gold"            }, hex: "#c9a400" },

  // Флуоресцентні / Fluorescent
  { code: "130",    name: { ua: "Флуо жовтий",         pl: "Fluo żółty",        en: "Fluo Yellow"     }, hex: "#eaff00" },
  { code: "131",    name: { ua: "Флуо оранж",          pl: "Fluo pomarańcz",    en: "Fluo Orange"     }, hex: "#ff6f00" },
  { code: "132",    name: { ua: "Флуо червоний",       pl: "Fluo czerwony",     en: "Fluo Red"        }, hex: "#ff1744" },
  { code: "133",    name: { ua: "Флуо рожевий",        pl: "Fluo różowy",       en: "Fluo Pink"       }, hex: "#ff4081" },
  { code: "134",    name: { ua: "Флуо зелений",        pl: "Fluo zielony",      en: "Fluo Green"      }, hex: "#00e676" },
  { code: "135",    name: { ua: "Флуо синій",          pl: "Fluo niebieski",    en: "Fluo Blue"       }, hex: "#2979ff" },
  { code: "136",    name: { ua: "Флуо блакитний",      pl: "Fluo jasnoniebieski",en: "Fluo Light Blue" }, hex: "#40c4ff" },

  // CMYK базові
  { code: "140",    name: { ua: "CMYK Yellow",         pl: "CMYK Yellow",       en: "CMYK Yellow"     }, hex: "#ffeb3b" },
  { code: "141",    name: { ua: "CMYK Cyan",           pl: "CMYK Cyan",         en: "CMYK Cyan"       }, hex: "#00bcd4" },
  { code: "142",    name: { ua: "CMYK Magenta",        pl: "CMYK Magenta",      en: "CMYK Magenta"    }, hex: "#e91e63" },
  { code: "143",    name: { ua: "CMYK Black",          pl: "CMYK Black",        en: "CMYK Black"      }, hex: "#212121" }
];
// data-colors.js
const COLORS = [];

SERIES.forEach(series => {
  BASE_COLORS.forEach(base => {
    COLORS.push({
      series: series.id,
      code: `${series.id}${base.code}`,
      baseCode: base.code,
      name: base.name,
      hex: base.hex
    });
  });
});

COLORS.sort((a, b) => {
  const numA = parseInt(a.baseCode.match(/\d+/)?.[0] || "0", 10);
  const numB = parseInt(b.baseCode.match(/\d+/)?.[0] || "0", 10);
  return numA - numB;
});

// допоміжні функції — ГЛОБАЛЬНІ
function getColorByCode(code) {
  return COLORS.find(c => c.code === code);
}

function getColorsBySeries(series) {
  return COLORS.filter(c => c.series === series);
}
