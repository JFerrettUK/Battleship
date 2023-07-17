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
  boardContainers.style.gridTemplateColumns = "1fr 0.1fr";
  boardContainers.style.flexDirection = "row";
}

export default function startGame(convertShipArray, onShipsPlaced) {
  hideElements();
  adjustStyles();
  flipShips();

  let occupiedSquaresCount = 0;
  let hasTriggered = false;

  function handleShipsPlaced(occupiedSquares) {
    occupiedSquaresCount = occupiedSquares.length;

    if (occupiedSquaresCount > 3 && !hasTriggered) {
      hasTriggered = true;
      resetBoardContainers();
      console.log("board containers reset");
      const shipLocations = convertShipArray(occupiedSquares || []);
      console.log("array converted");
      onShipsPlaced(shipLocations);
    }
  }

  dragAndDrop(handleShipsPlaced);
}
