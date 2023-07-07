export default function dragAndDrop() {
  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");
  let occupiedSquares = [];

  shipPieces.forEach((shipPiece) => {
    shipPiece.addEventListener("dragstart", handleDragStart);
    shipPiece.addEventListener("dragend", handleDragEnd);
  });

  userSquares.forEach((userSquare) => {
    userSquare.addEventListener("dragover", dragOver);
    userSquare.addEventListener("drop", dragDrop);
  });

  let beingDragged;
  let shipPieceOrientation;

  function handleDragStart(e) {
    beingDragged = e.target;
    shipPieceOrientation = beingDragged.dataset.orientation;
    e.dataTransfer.setData("text/plain", "");
  }

  function handleDragEnd(e) {
    console.log(e.target);
    console.log("targetAbove");
  }

  function dragOver(e) {
    e.preventDefault();
  }
  function dragDrop(e) {
    e.preventDefault();

    const targetUserSquare = e.target.closest(".userSquare");

    if (targetUserSquare) {
      const offsetX = e.clientX - targetUserSquare.getBoundingClientRect().left;
      const offsetY = e.clientY - targetUserSquare.getBoundingClientRect().top;

      const row = Math.min(parseInt(targetUserSquare.dataset.row, 10), 9);
      const column = Math.min(parseInt(targetUserSquare.dataset.column, 10), 9);

      const shipSize = parseInt(beingDragged.getAttribute("alt"), 10);
      const shipOrientation = beingDragged.dataset.orientation;

      let targetRow, targetColumn;

      if (shipOrientation === "vertical") {
        targetRow = Math.min(
          row + Math.floor(offsetY / targetUserSquare.offsetHeight),
          9 - shipSize + 1
        );
        targetColumn = column;
      } else {
        targetRow = row;
        targetColumn = Math.min(
          column + Math.floor(offsetX / targetUserSquare.offsetWidth),
          9 - shipSize + 1
        );
      }

      const occupiedSquaresData = [];

      for (let i = 0; i < shipSize; i++) {
        let occupiedRow, occupiedColumn;

        if (shipOrientation === "vertical") {
          occupiedRow = targetRow + i;
          occupiedColumn = targetColumn;
        } else {
          occupiedRow = targetRow;
          occupiedColumn = targetColumn + i;
        }

        if (occupiedRow > 9 || occupiedColumn > 9) {
          console.log(
            "Invalid placement! Occupied squares extend beyond the boundary."
          );
          return;
        }

        occupiedSquaresData.push({ row: occupiedRow, column: occupiedColumn });
      }

      const isPlacementValid = validatePlacement(occupiedSquaresData);

      if (isPlacementValid) {
        console.log("Ship placed on User Squares:", occupiedSquaresData);

        if (shipOrientation === "vertical") {
          beingDragged.style.transform = "none";
          beingDragged.style.position = "absolute";
          beingDragged.style.left = `${
            targetColumn * targetUserSquare.offsetWidth
          }px`;
          beingDragged.style.top = `${
            targetRow * targetUserSquare.offsetHeight
          }px`;
        }

        occupiedSquares.push({
          size: shipSize,
          orientation: shipOrientation,
          occupiedSquares: occupiedSquaresData,
        });

        console.log("Occupied Squares:", occupiedSquares);

        const correspondingShip = document.getElementById(
          beingDragged.id.replace(/V$/, "")
        );

        correspondingShip.remove();

        if (!beingDragged.id.endsWith("V")) {
          const oppositeShip = document.getElementById(`${beingDragged.id}V`);
          oppositeShip.remove();
        }

        beingDragged.remove();
      } else {
        console.log("Invalid placement! Overlapping with existing ships.");
      }
    }
  }

  function validatePlacement(occupiedSquaresData) {
    for (const occupiedSquare of occupiedSquares) {
      for (const square of occupiedSquaresData) {
        if (
          occupiedSquare.occupiedSquares.some(
            (occupied) =>
              occupied.row === square.row && occupied.column === square.column
          )
        ) {
          return false; // Overlapping placement
        }
      }
    }
    return true; // Valid placement
  }
}
