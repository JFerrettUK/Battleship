export default function dragAndDrop() {
  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");

  shipPieces.forEach((shipPiece) => {
    shipPiece.addEventListener("dragstart", handleDragStart);
    shipPiece.addEventListener("dragend", handleDragEnd);
  });

  userSquares.forEach((userSquare) => {
    userSquare.addEventListener("dragover", dragOver);
    userSquare.addEventListener("drop", dragDrop);
  });

  let beingDragged;

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
      const occupiedSquares = [];
      for (let i = 0; i < size; i++) {
        const occupiedRow = targetRow;
        const occupiedColumn = targetColumn + i;
        occupiedSquares.push({ row: occupiedRow, column: occupiedColumn });
      }

      // Display the occupied squares in the console
      console.log("Ship placed on User Squares:", occupiedSquares);

      // Append the dragged image to the target user square
      targetUserSquare.appendChild(beingDragged);
    }
  }
}
