/* =========================
   SICO MIX – Languages
   ========================= */

let LANG = localStorage.getItem("sico_lang") || "ua";

const I18N = {
  ua: {
    paints: "Фарби",
    recipes: "Рецепти",
    newRecipe: "Новий",
    import: "Імпорт",
    catalog: "Каталог фарб",
    mixed: "Змішані рецепти",
    addRecipe: "Зберегти рецепт",
    recipeName: "Назва рецепта",
    recipeNote: "Примітка",
    noRecipes: "Немає рецептів",
    importText: "Встав текст рецепта тут"
  },
  pl: {
    paints: "Farby",
    recipes: "Receptury",
    newRecipe: "Nowy",
    import: "Import",
    catalog: "Katalog farb",
    mixed: "Receptury mieszane",
    addRecipe: "Zapisz recepturę",
    recipeName: "Nazwa receptury",
    recipeNote: "Notatka",
    noRecipes: "Brak receptur",
    importText: "Wklej tekst receptury tutaj"
  },
  en: {
    paints: "Paints",
    recipes: "Recipes",
    newRecipe: "New",
    import: "Import",
    catalog: "Paint catalog",
    mixed: "Mixed recipes",
    addRecipe: "Save recipe",
    recipeName: "Recipe name",
    recipeNote: "Note",
    noRecipes: "No recipes",
    importText: "Paste recipe text here"
  }
};

function t(key) {
  return I18N[LANG][key] || key;
}

function setLang(l) {
  LANG = l;
  localStorage.setItem("sico_lang", l);
  applyLang();
}

function applyLang() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerText = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });
}

document.addEventListener("DOMContentLoaded", applyLang);
