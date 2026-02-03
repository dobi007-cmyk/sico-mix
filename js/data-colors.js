const SERIES = [
  { id:"A" },
  { id:"B" },
  { id:"C" }
];

const BASE_COLORS = [
  { code:"130", name:{ua:"Флуо жовтий",pl:"Fluo żółty",en:"Fluo Yellow"}, hex:"#eaff00" },
  { code:"131", name:{ua:"Флуо оранж",pl:"Fluo pomarańcz",en:"Fluo Orange"}, hex:"#ff6f00" },
  { code:"132", name:{ua:"Флуо червоний",pl:"Fluo czerwony",en:"Fluo Red"}, hex:"#ff1744" },
  { code:"133", name:{ua:"Флуо рожевий",pl:"Fluo różowy",en:"Fluo Pink"}, hex:"#ff4081" },
  { code:"134", name:{ua:"Флуо зелений",pl:"Fluo zielony",en:"Fluo Green"}, hex:"#00e676" },
  { code:"135", name:{ua:"Флуо синій",pl:"Fluo niebieski",en:"Fluo Blue"}, hex:"#2979ff" }
];

const COLORS = [];

SERIES.forEach(s=>{
  BASE_COLORS.forEach(c=>{
    COLORS.push({
      series:s.id,
      code:s.id + c.code,
      name:c.name,
      hex:c.hex
    });
  });
});