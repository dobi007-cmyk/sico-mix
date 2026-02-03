const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    catalog:"Каталог фарб",
    recipeName:"Назва рецепта",
    addRecipe:"Зберегти рецепт",
    weightCalc:"Калькулятор ваги",
    grams:"г",
    kilograms:"кг",
    sum:"Сума",
    filterSeries:"Серія фарб",
    allSeries:"Всі серії",
    addColor:"Додати фарбу",
    errorSeries:"Можна змішувати тільки в межах однієї серії",
    currentSeries:"Поточна серія",
    exportTxt:"Експорт TXT",
    exportPdf:"Експорт PDF",
    importTxt:"Імпорт TXT",
    noRecipes:"Немає рецептів"
  },
  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowa receptura",
    catalog:"Katalog farb",
    recipeName:"Nazwa receptury",
    addRecipe:"Zapisz recepturę",
    weightCalc:"Kalkulator wagi",
    grams:"g",
    kilograms:"kg",
    sum:"Suma",
    filterSeries:"Seria farb",
    allSeries:"Wszystkie serie",
    addColor:"Dodaj farbę",
    errorSeries:"Można mieszać tylko w jednej serii",
    currentSeries:"Aktualna seria",
    exportTxt:"Eksport TXT",
    exportPdf:"Eksport PDF",
    importTxt:"Import TXT",
    noRecipes:"Brak receptur"
  },
  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    catalog:"Paint catalog",
    recipeName:"Recipe name",
    addRecipe:"Save recipe",
    weightCalc:"Weight calculator",
    grams:"g",
    kilograms:"kg",
    sum:"Total",
    filterSeries:"Paint series",
    allSeries:"All series",
    addColor:"Add color",
    errorSeries:"You can mix only within one series",
    currentSeries:"Current series",
    exportTxt:"Export TXT",
    exportPdf:"Export PDF",
    importTxt:"Import TXT",
    noRecipes:"No recipes"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";

function t(k){ return i18n[currentLang][k] || k; }

function setLang(lang){
  currentLang = lang;
  localStorage.setItem("sico_lang",lang);

  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent = t(e.dataset.i18n);
  });

  renderColors();
  renderWeight();
  renderRecipes();
}