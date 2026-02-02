function renderColors() {
  const list = qs("colorList");
  list.innerHTML = "";

  COLORS.forEach(c => {
    const div = document.createElement("div");
    div.className = "color";
    div.innerHTML = `
      <div class="swatch" style="background:${c.hex}"></div>
      <div>
        <strong>${c.code}</strong><br>
        <small>${c.name[currentLang]}</small>
      </div>
      <button type="button" onclick="addColorToRecipe('${c.code}')">+</button>
    `;
    list.appendChild(div);
  });
}
