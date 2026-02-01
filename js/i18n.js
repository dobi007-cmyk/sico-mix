const i18n = {
  ua:{
    paints:"Фарби",
    recipes:"Рецепти",
    newRecipe:"Новий рецепт",
    import:"Імпорт / Експорт",
    catalog:"Каталог фарб",
    mixed:"Змішані рецепти",
    recipeName:"Назва рецепта",
    recipeNote:"Нотатка",
    addRecipe:"Зберегти рецепт",
    weightCalc:"Калькулятор ваги",
    exportTxt:"Експорт TXT",
    importTxt:"Імпорт TXT",
    allSeries:"Усі серії"
  },
  pl:{
    paints:"Farby",
    recipes:"Receptury",
    newRecipe:"Nowy",
    import:"Import / Export",
    catalog:"Katalog farb",
    mixed:"Receptury",
    recipeName:"Nazwa",
    recipeNote:"Notatka",
    addRecipe:"Zapisz",
    weightCalc:"Kalkulator wagi",
    exportTxt:"Eksport TXT",
    importTxt:"Import TXT",
    allSeries:"Wszystkie serie"
  },
  en:{
    paints:"Paints",
    recipes:"Recipes",
    newRecipe:"New recipe",
    import:"Import / Export",
    catalog:"Paint catalog",
    mixed:"Mixed recipes",
    recipeName:"Recipe name",
    recipeNote:"Note",
    addRecipe:"Save recipe",
    weightCalc:"Weight calculator",
    exportTxt:"Export TXT",
    importTxt:"Import TXT",
    allSeries:"All series"
  }
};

let currentLang="ua";
function setLang(l){
  currentLang=l;
  document.querySelectorAll("[data-i18n]").forEach(e=>{
    e.textContent=i18n[l][e.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{
    e.placeholder=i18n[l][e.dataset.i18nPlaceholder];
  });
}
document.addEventListener("DOMContentLoaded",()=>setLang("ua"));