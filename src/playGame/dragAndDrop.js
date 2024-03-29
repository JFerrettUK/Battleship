import convertShipArray from "./convertShipArray";

export default function dragAndDrop(onOccupiedSquares) {
  var titleElement = document.getElementById("aiTitle");
  var boardElement = document.getElementById("aiBoard");

  titleElement.style.display = "none";
  boardElement.style.display = "none";

  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");
  let occupiedSquares = [];
  let shipsPlaced = 0;
  let isPlacementValid = false; // Declare isPlacementValid variable

  // Store the initial state of each ship's position and orientation
  const initialShipState = {};

  shipPieces.forEach((shipPiece) => {
    shipPiece.addEventListener("dragstart", handleDragStart);
    shipPiece.addEventListener("dragend", handleDragEnd);
    initialShipState[shipPiece.id] = {
      top: shipPiece.style.top,
      left: shipPiece.style.left,
      orientation: shipPiece.dataset.orientation,
    };
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
      beingDragged.style.transform = "none";
      beingDragged.style.position = "absolute";
      beingDragged.style.left = initialShipState[beingDragged.id].left;
      beingDragged.style.top = initialShipState[beingDragged.id].top;
      beingDragged.dataset.orientation =
        initialShipState[beingDragged.id].orientation;
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
          if (beingDragged.id.endsWith("V")) {
            // Remove the corresponding horizontal ship
            const correspondingShip = document.getElementById(
              beingDragged.id.replace(/V$/, "")
            );
            if (correspondingShip && correspondingShip.parentElement) {
              correspondingShip.parentElement.removeChild(correspondingShip);
            }
          } else {
            // Remove the corresponding vertical ship
            const oppositeShip = document.getElementById(`${beingDragged.id}V`);
            if (oppositeShip && oppositeShip.parentElement) {
              oppositeShip.parentElement.removeChild(oppositeShip);
            }
          }

          // Now, remove the placed ship (both horizontal and vertical versions)
          beingDragged.parentElement.removeChild(beingDragged);
        }

        if (shipsPlaced <= 4) {
          if (typeof onOccupiedSquares === "function") {
            const shipLocations = convertShipArray(occupiedSquares);

            onOccupiedSquares(shipLocations, isPlacementValid); // Pass isPlacementValid as an argument
          }
        }
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
