export default function editPlayerBoard(targetParent) {
  // Clear the target parent element
  document.getElementById(targetParent).innerHTML = "";

  function makeRow(row, colour) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      battleSquare.classList.add("battleSquare");
      battleSquare.classList.add("userSquare");

      if (colour == "blue") {
        if (i % 2 == 0) battleSquare.classList.add("blue");
        else battleSquare.classList.add("cyan");
      } else {
        if (i % 2 == 0) battleSquare.classList.add("cyan");
        else battleSquare.classList.add("blue");
      }

      if (battleSquare.classList.contains("shipSquare")) {
        battleSquare.classList.remove("shipSquare");
      }

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
