export default function dragAndDrop() {
  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");
  const occupiedSquares = []; // Array to store occupied squares data

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

    // Toggle the orientation between "horizontal" and "vertical"
    const newOrientation =
      currentOrientation === "horizontal" ? "vertical" : "horizontal";

    // Update the data-orientation attribute
    shipPiece.dataset.orientation = newOrientation;

    // Rotate the ship image
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

    // Get the target user square element
    const targetUserSquare = e.target.closest(".userSquare");

    if (targetUserSquare) {
      // Calculate the offset between the ship piece's corner position and the user square's corner position
      const offsetX = e.clientX - targetUserSquare.getBoundingClientRect().left;
      const offsetY = e.clientY - targetUserSquare.getBoundingClientRect().top;

      // Calculate the relative position of the ship piece within the user square
      const relativeX = offsetX / targetUserSquare.offsetWidth;
      const relativeY = offsetY / targetUserSquare.offsetHeight;

      // Calculate the row and column of the user square based on the relative position
      const row = Math.min(parseInt(targetUserSquare.dataset.row, 10), 9);
      const column = Math.min(parseInt(targetUserSquare.dataset.column, 10), 9);
      const targetRow = Math.min(row + Math.floor(relativeY), 9);
      const targetColumn = Math.min(column + Math.floor(relativeX), 9);

      // Calculate the range of squares covered by the ship based on its size
      const size = parseInt(beingDragged.getAttribute("alt"), 10);

      // Flag to track placement validity
      let isValidPlacement = true;

      const occupiedSquaresData = [];
      for (let i = 0; i < size; i++) {
        let occupiedRow, occupiedColumn;
        if (relativeX < 0.5) {
          // Placed vertically
          occupiedRow = targetRow + i;
          occupiedColumn = targetColumn;
        } else {
          // Placed horizontally
          occupiedRow = targetRow;
          occupiedColumn = targetColumn + i;
        }

        if (occupiedRow > 9 || occupiedColumn > 9) {
          console.log(
            "Invalid placement! Occupied squares extend beyond the boundary."
          );
          isValidPlacement = false;
          break;
        }
        occupiedSquaresData.push({ row: occupiedRow, column: occupiedColumn });
      }

      if (isValidPlacement) {
        const orientation = relativeX < 0.5 ? "vertical" : "horizontal";

        // Display the occupied squares in the console
        console.log("Ship placed on User Squares:", occupiedSquaresData);

        // Append the dragged image to the target user square
        targetUserSquare.appendChild(beingDragged);

        // Add ship data to the occupiedSquares array
        occupiedSquares.push({
          size,
          orientation,
          occupiedSquares: occupiedSquaresData,
        });

        // Print the occupied squares and ship sizes
        console.log("Occupied Squares:", occupiedSquares);
      }
    }
  }
}
