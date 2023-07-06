export default function dragAndDrop() {
  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");
  const occupiedSquares = [];

  shipPieces.forEach((shipPiece) => {
    shipPiece.addEventListener("dragstart", handleDragStart);
    shipPiece.addEventListener("dragend", handleDragEnd);
    shipPiece.addEventListener("click", handleShipClick);
  });

  userSquares.forEach((userSquare) => {
    userSquare.addEventListener("dragover", dragOver);
    userSquare.addEventListener("drop", dragDrop);
  });

  let beingDragged;

  function handleShipClick(e) {
    const shipPiece = e.target;
    const currentOrientation = shipPiece.dataset.orientation;

    const newOrientation =
      currentOrientation === "horizontal" ? "vertical" : "horizontal";

    shipPiece.dataset.orientation = newOrientation;

    if (newOrientation === "vertical") {
      shipPiece.style.transform = "rotate(90deg)";
    } else {
      shipPiece.style.transform = "none";
    }
  }

  function handleDragStart(e) {
    beingDragged = e.target;
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

      const isValidPlacement = true; // You can add your own logic for validating the placement

      if (isValidPlacement) {
        console.log("Ship placed on User Squares:", occupiedSquaresData);

        if (shipOrientation === "vertical") {
          beingDragged.style.transform = "none";
          beingDragged.style.position = "absolute";
          beingDragged.style.left = "0";
          beingDragged.style.top = "0";

          const squareSize = targetUserSquare.offsetWidth;
          const shipPieceSize = beingDragged.offsetWidth;

          const adjustmentX = 0;
          const adjustmentY = 0;

          beingDragged.style.left =
            targetUserSquare.offsetLeft + adjustmentX + "px";
          beingDragged.style.top =
            targetUserSquare.offsetTop + adjustmentY + "px";
        }

        targetUserSquare.appendChild(beingDragged);

        occupiedSquares.push({
          size: shipSize,
          orientation: shipOrientation,
          occupiedSquares: occupiedSquaresData,
        });

        console.log("Occupied Squares:", occupiedSquares);
      }
    }
  }
}
