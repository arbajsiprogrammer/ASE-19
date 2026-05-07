function generateTable() {
  const table = document.createElement("table");
  const tBody = document.createElement("tbody");

  for (let i = 0; i < 2; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 2; j++) {
      // creating cell
      const cell = document.createElement("td");
      const text = document.createTextNode(`${i}th row and ${j}th column `);
      cell.appendChild(text);
      row.appendChild(cell);
    }

    tBody.appendChild(row);
  }
  table.setAttribute("border", 2);
  table.appendChild(tBody);
  document.body.appendChild(table);
}
const ele_btn = document.querySelector("button");
ele_btn.addEventListener("click", () => {
  generateTable();
});

// <!-- change the background color of the paragraph -->
const ele_ip = document.querySelector("input");
const ele_para = document.querySelectorAll("p");

ele_ip.addEventListener("change", () => {
  const bg_color = ele_ip.value;
  console.log(ele_para);
  ele_para.forEach((para) => {
    para.style.background = bg_color;
  });
});

//
