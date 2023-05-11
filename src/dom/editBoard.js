export default function editBoard() {
  function makeRow(row, colour) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      battleSquare.classList.add("battleSquare");

      if (colour == "blue") {
        if (i % 2 == 0) battleSquare.classList.add("blue");
        else battleSquare.classList.add("cyan");
      } else {
        if (i % 2 == 0) battleSquare.classList.add("cyan");
        else battleSquare.classList.add("blue");
      }

      battleSquare.id = `${row}-${i}`;
      document.getElementById("battleBoard").appendChild(battleSquare);
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
