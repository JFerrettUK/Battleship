import dragAndDrop from "./dragAndDrop";
import flipShips from "../dom/flipShips";
import resetBoardContainers from "../dom/resetBoardContainers";

export function hideElements() {
  const aiTitle = document.getElementById("aiTitle");
  const aiBoard = document.getElementById("aiBoard");

  aiTitle.style.display = "none";
  aiBoard.style.display = "none";
}

export function adjustStyles() {
  const boardContainers = document.getElementById("boardContainers");

  boardContainers.style.flexDirection = "row";
}

export default function startGame(onOccupiedSquares) {
  hideElements();
  adjustStyles();
  flipShips();

  let occupiedSquaresCount = 0;
  let hasTriggered = false;

  const onShipsPlaced = (occupiedSquares) => {
    occupiedSquaresCount = occupiedSquares.length;
    if (occupiedSquaresCount === 4 && !hasTriggered) {
      hasTriggered = true;
      onOccupiedSquares(occupiedSquares); // Pass occupiedSquares as an argument to the callback function
    }
    return occupiedSquares;
  };

  dragAndDrop(onShipsPlaced);

  // Check the number of occupied squares at regular intervals
  setInterval(() => {
    if (occupiedSquaresCount > 3 && typeof onOccupiedSquares === "function") {
      resetBoardContainers();
      onOccupiedSquares(occupiedSquares);
    }
  }, 1000); // Adjust the interval as needed
}
