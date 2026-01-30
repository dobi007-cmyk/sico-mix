function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function loadColors() {
  const list = document.getElementById("colorList");
  list.innerHTML = "";
  COLORS.forEach(c => {
    const div = document.createElement("div");
    div.className = "color";
    div.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div>${c.code} – ${c.name}</div>
    `;
    list.appendChild(div);
  });
}

function saveRecipe() {
  const name = document.getElementById("recipeName").value;
  if (!name) return alert("Введи назву");
  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  recipes.push({ name });
  localStorage.setItem("recipes", JSON.stringify(recipes));
  alert("Збережено");
}

function importRecipe() {
  alert("Імпорт працює (далі розширимо)");
}

loadColors();
