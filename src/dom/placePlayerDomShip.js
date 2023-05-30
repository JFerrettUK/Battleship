import changeShipClass from "./changeShipClass";

export default function placePlayerDomShip(length, row, column, align) {
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
      changeShipClass(row, i, "user");
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
      changeShipClass(i, column, "user");
    }
  }
}
