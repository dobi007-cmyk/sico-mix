// data-colors.js – дані про фарби, серії, початкові рецепти
export const initialData = {
  paints: [
    { id: "1", name: "SICO White 90", category: "Standard", color: "#FFFFFF", manufacturer: "SICO", article: "STD-90" },
    { id: "2", name: "SICO Black 100", category: "Standard", color: "#000000", manufacturer: "SICO", article: "STD-100" },
    { id: "3", name: "SICO Red 60", category: "Standard", color: "#B11226", manufacturer: "SICO", article: "STD-60" },
    { id: "4", name: "SICO Blue 23", category: "Standard", color: "#0033A0", manufacturer: "SICO", article: "STD-23" },
    { id: "5", name: "SICO Green 35", category: "Standard", color: "#007A3D", manufacturer: "SICO", article: "STD-35" },
    { id: "6", name: "SICO Yellow 40", category: "Standard", color: "#FFD100", manufacturer: "SICO", article: "STD-40" },
    { id: "7", name: "SICO Orange 55", category: "Standard", color: "#F05A28", manufacturer: "SICO", article: "STD-55" },
    { id: "8", name: "Pantone Red P60/38", category: "Pantone", color: "#C8102E", manufacturer: "SICO", article: "P60/38" },
    { id: "9", name: "Pantone Magenta P61/15", category: "Pantone", color: "#9C2A70", manufacturer: "SICO", article: "P61/15" },
    { id: "10", name: "Pantone Blue P26/2", category: "Pantone", color: "#005EB8", manufacturer: "SICO", article: "P26/2" },
    { id: "11", name: "Pantone Yellow P20/5", category: "Pantone", color: "#FEDD00", manufacturer: "SICO", article: "P20/5" },
    { id: "12", name: "CMYK Cyan 141", category: "CMYK", color: "#009DDC", manufacturer: "SICO", article: "CMYK-141" },
    { id: "13", name: "CMYK Magenta 142", category: "CMYK", color: "#D5006D", manufacturer: "SICO", article: "CMYK-142" },
    { id: "14", name: "CMYK Yellow 140", category: "CMYK", color: "#FFDD00", manufacturer: "SICO", article: "CMYK-140" },
    { id: "15", name: "CMYK Black 143", category: "CMYK", color: "#1A1A1A", manufacturer: "SICO", article: "CMYK-143" },
    { id: "16", name: "Metal Silver 110", category: "Metalized", color: "#BFC1C2", manufacturer: "SICO", article: "MET-110" },
    { id: "17", name: "Metal Gold 120", category: "Metalized", color: "#8B6F2D", manufacturer: "SICO", article: "MET-120" },
    { id: "18", name: "Fluo Yellow 130", category: "Fluorescent", color: "#E6FF00", manufacturer: "SICO", article: "FLUO-130" },
    { id: "19", name: "Fluo Orange 131", category: "Fluorescent", color: "#FF7A00", manufacturer: "SICO", article: "FLUO-131" },
    { id: "20", name: "Fluo Red 133", category: "Fluorescent", color: "#FF0038", manufacturer: "SICO", article: "FLUO-133" },
    { id: "21", name: "Fluo Pink 134", category: "Fluorescent", color: "#FF1493", manufacturer: "SICO", article: "FLUO-134" },
    { id: "22", name: "Fluo Green 135", category: "Fluorescent", color: "#00E676", manufacturer: "SICO", article: "FLUO-135" },
    { id: "23", name: "Fluo Blue 136", category: "Fluorescent", color: "#2979FF", manufacturer: "SICO", article: "FLUO-136" }
  ],
  recipes: [
    {
      id: "1",
      name: "Автомобільний червоний",
      category: "Металік",
      color: "#FF0000",
      description: "Яскраво-червоний металік",
      ingredients: [
        { paintId: "1", amount: 500, unit: "г", percentage: 50 },
        { paintId: "3", amount: 300, unit: "г", percentage: 30 },
        { paintId: "4", amount: 200, unit: "г", percentage: 20 }
      ],
      date: "15.03.2023",
      photo: null
    },
    {
      id: "2",
      name: "Ніжний перламутровий",
      category: "Перламутр",
      color: "#FFC0CB",
      description: "Ніжний рожевий перламутр",
      ingredients: [
        { paintId: "2", amount: 400, unit: "г", percentage: 40 },
        { paintId: "4", amount: 600, unit: "г", percentage: 60 }
      ],
      date: "10.03.2023",
      photo: null
    },
    {
      id: "3",
      name: "Елегантний сірий металік",
      category: "Металік",
      color: "#808080",
      description: "Сучасний сірий металік",
      ingredients: [
        { paintId: "7", amount: 700, unit: "г", percentage: 70 },
        { paintId: "3", amount: 200, unit: "г", percentage: 20 },
        { paintId: "10", amount: 100, unit: "г", percentage: 10 }
      ],
      date: "20.03.2023",
      photo: null
    }
  ]
};

// Серії фарб (з PDF)
export const paintSeries = {
  OTF: { id: "OTF", name: "OPATEX OTF", type: "Текстильна", category: "Текстиль" },
  SPTN: { id: "SPTN", name: "SICOPLAST SPTN", type: "Текстильна", category: "Текстиль" },
  SX: { id: "SX", name: "SICOTEX SX", type: "Текстильна", category: "Текстиль" },
  NST: { id: "NST", name: "NYLONSTAR NST", type: "Текстильна", category: "Текстиль" },
  PLUV: { id: "PLUV", name: "UVIPLAST PLUV", type: "УФ-фарба", category: "УФ друк" },
  UV: { id: "UV", name: "UVILUX UV 150", type: "УФ-фарба", category: "УФ друк" },
  TPP: { id: "TPP", name: "POLYPRO TPP", type: "Для пластику", category: "Пластик" },
  AS: { id: "AS", name: "AQUASET AS", type: "Для паперу", category: "Папір/картон" },
  CF: { id: "CF", name: "CARTOFLEX CF", type: "Для паперу", category: "Папір/картон" },
  EC: { id: "EC", name: "Універсальна розчинникова", type: "Універсальна", category: "Універсальна" }
};

export const categories = [
  "Текстиль", "УФ друк", "Пластик", "Папір/картон", "Універсальна",
  "Металік", "Перламутр", "Матові", "Глянцеві", "Акрилові",
  "Епоксидні", "Грунтовка", "Лак", "Розчинник"
];

export function generateColorFromCategory(category, name) {
  // Проста генерація кольору (без динамічного прев'ю)
  const hash = [...(category + name)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return `hsl(${hash % 360}, 70%, 60%)`;
}
