import changeSquareClass from "./changeSquareClass";

export default function placeAIDomShip(length, row, column, align) {
  if (row > 9 || column > 9) {
    return "offBoard";
  }

  if (align == "vertical") {
    //check if these squares are already occupied
    for (let i = column; i < length + column; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(row + "-" + i + "-aiBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = column; i < length + column; i++) {
      changeSquareClass(row, i);
    }
  } else {
    //check if these squares are already occupied
    for (let i = row; i < length + row; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(i + "-" + column + "-aiBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = row; i < length + row; i++) {
      changeSquareClass(i, column);
    }
  }
}
