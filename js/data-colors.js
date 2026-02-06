// Дані фарб SICO - приклад, замініть на свої дані
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

export const COLORS = [
  // Фіолетові / Violet
  { code: "10",     name: { ua: "Фіолетовий",          pl: "Fioletowy",         en: "Violet"          }, 

  // Синій / Blue
  { code: "20",     name: { ua: "Синій",               pl: "Niebieski",         en: "Blue"            }, 
  { code: "20/B",   name: { ua: "Синій Flex",          pl: "Niebieski Flex",    en: "Blue Flex"       }, 
  { code: "P20/5",  name: { ua: "Pantone Blue",        pl: "Pantone Blue",      en: "Pantone Blue"    }, 
  { code: "22",     name: { ua: "Ультрамарин",         pl: "Ultramaryna",       en: "Ultramarine"     }, 
  { code: "24",     name: { ua: "Блакитний",           pl: "Niebieski jasny",   en: "Light Blue"      }, 
  { code: "26",     name: { ua: "Світло-блакитний",    pl: "Jasnoniebieski",    en: "Light Blue 2"    }, 
  { code: "P26/2",  name: { ua: "Pantone Blue 2",      pl: "Pantone Blue 2",    en: "Pantone Blue 2"  }, 

  // Бірюзовий / Turquoise
  { code: "27",     name: { ua: "Бірюзовий",           pl: "Turkusowy",         en: "Turquoise"       }, 

  // Зелені / Green
  { code: "30",     name: { ua: "Темно-зелений",       pl: "Ciemnozielony",     en: "Dark Green"      }, 
  { code: "31",     name: { ua: "Зелений",             pl: "Zielony",           en: "Green"           }, 
  { code: "32",     name: { ua: "Яскраво-зелений",     pl: "Jasnozielony",      en: "Bright Green"    }, 
  { code: "33",     name: { ua: "Зелений трава",       pl: "Zielony trawa",     en: "Grass Green"     }, 
  // Жовті / Yellow
  { code: "40",     name: { ua: "Жовтий",              pl: "Żółty",             en: "Yellow"          },
  { code: "41",     name: { ua: "Цитриновий",          pl: "Cytrynowy",         en: "Lemon Yellow"    }, 
  { code: "42",     name: { ua: "Медовий",             pl: "Miodowy",           en: "Honey Yellow"    },

  // Помаранчеві / Orange
  { code: "50",     name: { ua: "Помаранчевий",        pl: "Pomarańczowy",      en: "Orange"          },
  { code: "51",     name: { ua: "Світло-помаранчевий", pl: "Jasnopomarańczowy", en: "Light Orange"    },
  // Червоні / Red
  { code: "56",     name: { ua: "Червоний",            pl: "Czerwony",          en: "Red"             },
  { code: "60",     name: { ua: "Темно-червоний",      pl: "Ciemnoczerwony",    en: "Dark Red"        },
  { code: "P60/38", name: { ua: "Pantone Red",         pl: "Pantone Red",       en: "Pantone Red"     },
  { code: "61",     name: { ua: "Малиновий",           pl: "Karminowy",         en: "Carmine"         },
  { code: "P61/15", name: { ua: "Pantone Magenta",     pl: "Pantone Magenta",   en: "Pantone Magenta" },

  // Магента та інші
  { code: "70",     name: { ua: "Магента",             pl: "Magenta",           en: "Magenta"         }, 

  // Коричневі / Brown
  { code: "80",     name: { ua: "Коричневий",          pl: "Brązowy",           en: "Brown"           },
  { code: "81",     name: { ua: "Темно-коричневий",    pl: "Ciemnobrązowy",     en: "Dark Brown"      },
  { code: "82",     name: { ua: "Бежевий",             pl: "Beżowy",            en: "Beige"           },

  // Базові / Base
  { code: "90",     name: { ua: "Білий",               pl: "Biały",             en: "White"           },
  { code: "91",     name: { ua: "Криючий білий",       pl: "Biały kryjący",     en: "Opaque White"    },
  { code: "100",    name: { ua: "Чорний",              pl: "Czarny",            en: "Black"           },

  // Металіки
  { code: "110",    name: { ua: "Срібло",              pl: "Srebro",            en: "Silver"          },
  { code: "120",    name: { ua: "Золото",              pl: "Złoto",             en: "Gold"            },

  // Флуоресцентні / Fluorescent
  { code: "130",    name: { ua: "Флуо жовтий",         pl: "Fluo żółty",        en: "Fluo Yellow"     },
  { code: "131",    name: { ua: "Флуо оранж",          pl: "Fluo pomarańcz",    en: "Fluo Orange"     },
  { code: "132",    name: { ua: "Флуо червоний",       pl: "Fluo czerwony",     en: "Fluo Red"        },
  { code: "133",    name: { ua: "Флуо рожевий",        pl: "Fluo różowy",       en: "Fluo Pink"       },
  { code: "134",    name: { ua: "Флуо зелений",        pl: "Fluo zielony",      en: "Fluo Green"      },
  { code: "135",    name: { ua: "Флуо синій",          pl: "Fluo niebieski",    en: "Fluo Blue"       },
  { code: "136",    name: { ua: "Флуо блакитний",      pl: "Fluo jasnoniebieski",en: "Fluo Light Blue" },

  // CMYK базові
  { code: "140",    name: { ua: "CMYK Yellow",         pl: "CMYK Yellow",       en: "CMYK Yellow"     },
  { code: "141",    name: { ua: "CMYK Cyan",           pl: "CMYK Cyan",         en: "CMYK Cyan"       },
  { code: "142",    name: { ua: "CMYK Magenta",        pl: "CMYK Magenta",      en: "CMYK Magenta"    },
  { code: "143",    name: { ua: "CMYK Black",          pl: "CMYK Black",        en: "CMYK Black"      },
];

export function getColorByCode(code) {
  return COLORS.find(color => color.code === code);
}

export function getColorsBySeries(series) {
  return COLORS.filter(color => color.series === series);
}

export function searchColors(query, lang = 'ua') {
  const q = query.toLowerCase();
  return COLORS.filter(color => 
    color.code.toLowerCase().includes(q) || 
    color.name[lang].toLowerCase().includes(q)
  );
}

export function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default {
  SERIES,
  COLORS,
  getColorByCode,
  getColorsBySeries,
  searchColors,
  getRandomColor
};
