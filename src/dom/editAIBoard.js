export default function editAIBoard(targetParent) {
  function makeRow(row, colour) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      battleSquare.classList.add("battleSquare");
      battleSquare.classList.add("aiSquare");
      battleSquare.classList.add("grey");

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
