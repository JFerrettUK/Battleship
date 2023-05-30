import changeShipClass from "./changeShipClass";

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

      let aiShipSquare = document.getElementById(row + "-" + i + "-aiBoard");
      if (aiShipSquare.classList.contains("aiShipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = column; i < length + column; i++) {
      changeShipClass(row, i, "ai");
    }
  } else {
    //check if these squares are already occupied
    for (let i = row; i < length + row; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let aiShipSquare = document.getElementById(i + "-" + column + "-aiBoard");
      if (aiShipSquare.classList.contains("aiShipSquare")) {
        return "occupiedSquare";
      }
    }
    //change the board if not
    for (let i = row; i < length + row; i++) {
      changeShipClass(i, column, "ai");
    }
  }
}
