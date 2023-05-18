export default function placePlayerDomShip(length, row, column, align) {
  //changeBoard alters the dom
  let changeDOMBoard = function (row, column) {
    let shipSquare = document.getElementById(row + "-" + column + "-userBoard");
    shipSquare.classList.remove("blue");
    shipSquare.classList.remove("cyan");
    shipSquare.classList.add("shipSquare");
  };

  if (row > 9 || column > 9) {
    return "offBoard";
  }

  if (align == "vertical") {
    //check if these squares are already occupied
    for (let i = column; i < length + column; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(row + "-" + i + "-userBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = column; i < length + column; i++) {
      changeDOMBoard(row, i);
    }
  } else {
    //check if these squares are already occupied
    for (let i = row; i < length + row; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(i + "-" + column + "-userBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = row; i < length + row; i++) {
      changeDOMBoard(i, column);
    }
  }
}
