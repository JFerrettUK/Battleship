export default function makeBoard() {
  function makeWhiteRow(no) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      if (i % 2 == 0) battleSquare.className = "battleSquareWhite";
      else battleSquare.className = "battleSquareBlack";
      battleSquare.id = i + no;
      document.getElementById("battleBoard").appendChild(battleSquare);
    }
  }
  function makeBlackRow(no) {
    for (let i = 0; i < 10; i++) {
      const battleSquare = document.createElement("div");
      if (i % 2 == 0) battleSquare.className = "battleSquareBlack";
      else battleSquare.className = "battleSquareWhite";
      battleSquare.id = i + no;
      document.getElementById("battleBoard").appendChild(battleSquare);
    }
  }

  function makeRows() {
    for (let i = 10; i > 0; i--) {
      makeWhiteRow(i);
      i--;
      makeBlackRow(i);
    }
  }

  makeRows();
}
