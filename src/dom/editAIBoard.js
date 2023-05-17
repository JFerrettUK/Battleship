export default function editAIBoard(targetParent) {
  function makeRow(row) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      battleSquare.classList.add("battleSquare");
      battleSquare.classList.add("grey");

      battleSquare.id = `${row}-${i}-${targetParent}`;
      document.getElementById(targetParent).appendChild(battleSquare);
    }
  }

  function makeRows() {
    for (let i = 0; i < 10; i++) {
      makeRow(i, "blue");
      i++;
      makeRow(i, "cyan");
    }
  }

  makeRows();
}
