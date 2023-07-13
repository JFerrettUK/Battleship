export default function dragAndDrop(onShipsPlaced) {
  var titleElement = document.getElementById("aiTitle");
  var boardElement = document.getElementById("aiBoard");

  titleElement.style.display = "none";
  boardElement.style.display = "none";

  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");
  let occupiedSquares = [];
  let shipsPlaced = 0;
  let isPlacementValid = false; // Declare isPlacementValid variable

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

  function handleDragEnd() {
    if (beingDragged && beingDragged.parentNode) {
      if (isPlacementValid) {
        beingDragged.parentNode.removeChild(beingDragged);
      }
    }
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
          return;
        }

        occupiedSquaresData.push({ row: occupiedRow, column: occupiedColumn });
      }

      isPlacementValid = validatePlacement(occupiedSquaresData); // Update isPlacementValid

      if (isPlacementValid) {
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

        shipsPlaced++;

        if (beingDragged.parentElement) {
          const correspondingShip = document.getElementById(
            beingDragged.id.replace(/V$/, "")
          );
          if (correspondingShip && correspondingShip.parentElement) {
            correspondingShip.parentElement.removeChild(correspondingShip);
          }

          if (!beingDragged.id.endsWith("V")) {
            const oppositeShip = document.getElementById(`${beingDragged.id}V`);
            if (oppositeShip && oppositeShip.parentElement) {
              oppositeShip.parentElement.removeChild(oppositeShip);
            }
          }
        }

        if (shipsPlaced > 3) {
          if (typeof onShipsPlaced === "function") {
            onShipsPlaced(occupiedSquares); // Pass occupiedSquares as an argument to the callback function
          }
        }
      } else {
        console.log(
          "Invalid placement! Overlapping with existing ships or occupied squares."
        );
      }
    }
  }

  function validatePlacement(occupiedSquaresData) {
    for (const square of occupiedSquaresData) {
      for (const occupiedSquare of occupiedSquares) {
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
