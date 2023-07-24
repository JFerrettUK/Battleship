import changeShipClassDOM from "./changeShipClassDOM";

export default function placePlayerShipDOM(length, row, column, align) {
  if (row > 9 || column > 9) {
    return "offBoard";
  }

  if (align === "vertical") {
    // Check if these squares are already occupied
    for (let i = row; i < length + row; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(i + "-" + column + "-userBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    // Change the board if not
    for (let i = row; i < length + row; i++) {
      changeShipClassDOM(i, column, "user");
    }
  } else {
    // Check if these squares are already occupied
    for (let i = column; i < length + column; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let shipSquare = document.getElementById(row + "-" + i + "-userBoard");
      if (shipSquare.classList.contains("shipSquare")) {
        return "occupiedSquare";
      }
    }
    // Change the board if not
    for (let i = column; i < length + column; i++) {
      changeShipClassDOM(row, i, "user");
    }
  }
}
