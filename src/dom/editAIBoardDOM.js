export default function editAIBoardDOM(targetParent) {
  document.getElementById(targetParent).innerHTML = "";

  function makeRow(row, colour) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      battleSquare.classList.add("battleSquare");
      battleSquare.classList.add("aiSquare");
      battleSquare.classList.add("grey");

      // Set the data-row and data-column attributes
      battleSquare.dataset.row = row.toString();
      battleSquare.dataset.column = i.toString();

      if (battleSquare.classList.contains("aiShipSquare")) {
        battleSquare.classList.remove("aiShipSquare");
      }

      battleSquare.id = `${row}-${i}-${targetParent}`;
      document.getElementById(targetParent).appendChild(battleSquare);
    }
  }

  function makeRows() {
    for (let i = 0; i < 10; i++) {
      makeRow(i);
    }
  }

  makeRows();
}
