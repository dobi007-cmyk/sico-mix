const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    import:"Імпорт / Експорт",

    catalog:"Каталог фарб",

    recipeName:"Назва рецепта",
    addRecipe:"Зберегти рецепт",

    weightCalc:"Калькулятор ваги",
    sum:"Сума",

    grams:"г",
    kilograms:"кг",

    filterSeries:"Серія фарб",
    allSeries:"Всі серії",

    status:"Статус",
    draft:"Чернетка",
    test:"Тест",
    approved:"Підтверджений",

    clone:"Клонувати",
    noRecipes:"Немає рецептів"
  },

  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowa receptura",
    import:"Import / Export",

    catalog:"Katalog farb",

    recipeName:"Nazwa receptury",
    addRecipe:"Zapisz",

    weightCalc:"Kalkulator wagi",
    sum:"Suma",

    grams:"g",
    kilograms:"kg",

    filterSeries:"Seria farb",
    allSeries:"Wszystkie serie",

    status:"Status",
    draft:"Szkic",
    test:"Test",
    approved:"Zatwierdzony",

    clone:"Klonuj",
    noRecipes:"Brak receptur"
  },

  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    import:"Import / Export",

    catalog:"Paint catalog",

    recipeName:"Recipe name",
    addRecipe:"Save",

    weightCalc:"Weight calculator",
    sum:"Total",

    grams:"g",
    kilograms:"kg",

    filterSeries:"Paint series",
    allSeries:"All series",

    status:"Status",
    draft:"Draft",
    test:"Test",
    approved:"Approved",

    clone:"Clone",
    noRecipes:"No recipes"
  }
};

let currentLang = localStorage.getItem("sico_lang") || "ua";
const t = k => i18n[currentLang][k] || k;

function setLang(lang){
  currentLang = lang;
  localStorage.setItem("sico_lang",lang);

  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent = t(e.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{
    e.placeholder = t(e.dataset.i18nPlaceholder);
  });

  if(window.renderColors) renderColors();
  if(window.renderRecipes) renderRecipes();
}
