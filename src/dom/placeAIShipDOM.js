import changeShipClassDOM from "./changeShipClassDOM";

// Function to clear the board by removing the "shipSquare" class from all squares
function clearBoardDOM() {
  const allSquares = document.querySelectorAll(".aiShipSquare");
  allSquares.forEach((square) => {
    square.classList.remove("shipSquare");
  });
}

export default function placeAIShipDOM(length, row, column, align) {
  // Clear the board before placing AI ships
  clearBoardDOM();
  if (row > 9 || column > 9) {
    return "offBoard";
  }

  if (align === "vertical") {
    // Check if these squares are already occupied
    for (let i = row; i < length + row; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let aiShipSquare = document.getElementById(i + "-" + column + "-aiBoard");
      if (aiShipSquare.classList.contains("aiShipSquare")) {
        return "occupiedSquare";
      }
    }
    // Change the board if not
    for (let i = row; i < length + row; i++) {
      changeShipClassDOM(i, column, "ai");
    }
  } else {
    // Check if these squares are already occupied
    for (let i = column; i < length + column; i++) {
      if (i > 9) {
        return "offBoard";
      }

      let aiShipSquare = document.getElementById(row + "-" + i + "-aiBoard");
      if (aiShipSquare.classList.contains("aiShipSquare")) {
        return "occupiedSquare";
      }
    }
    // Change the board if not
    for (let i = column; i < length + column; i++) {
      changeShipClassDOM(row, i, "ai");
    }
  }
}
