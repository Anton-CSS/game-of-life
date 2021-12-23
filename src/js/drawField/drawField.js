const drawField = (el, field, onCellClick) => {
  el.innerHTML = "";
  const table = document.createElement("table");
  table.className = "field";
  field.forEach((array, y) => {
    const tr = document.createElement("tr");
    table.insertAdjacentElement("afterbegin", tr);
    array.forEach((item, x) => {
      const td = document.createElement("td");
      td.className = "cell";
      td.classList.add(`${item ? "cell__alive" : "cell__death"}`);
      td.dataset.y = `${y}`;
      td.dataset.x = `${x}`;
      td.addEventListener("click", () => {
        onCellClick(x, y, Boolean(item));
      });
      tr.insertAdjacentElement("afterbegin", td);
    });
  });
  el.insertAdjacentElement("afterbegin", table);
};

export default drawField;
