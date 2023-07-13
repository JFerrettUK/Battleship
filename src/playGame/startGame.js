import dragAndDrop from "./dragAndDrop";
import flipShips from "../dom/flipShips";

export default function startGame() {
  const aiTitle = document.getElementById("aiTitle");
  const aiBoard = document.getElementById("aiBoard");
  const boardContainers = document.getElementById("boardContainers");

  aiTitle.style.display = "none";
  aiBoard.style.display = "none";
  boardContainers.style.flexDirection = "row";
  function resetBoardContainers() {
    const boardContainersElement = document.getElementById("boardContainers");
    const boardCont1Element = document.querySelector(".boardCont1");
    const flipShipsElement = document.getElementById("flipShips");
    aiTitle.style.display = "flex";
    aiBoard.style.display = "grid";

    if (boardContainersElement && boardCont1Element) {
      boardContainersElement.style.display = "grid";
      boardContainersElement.style.justifyContent = "center";
      boardContainersElement.style.gridTemplateColumns = "1fr 1fr";
      boardContainersElement.style.top = "52px";
      boardContainersElement.style.minWidth = "800px";

      boardCont1Element.style.position = "";
      boardCont1Element.style.marginTop = "";
      flipShipsElement.style.display = "none";
      boardContainers.style.flexDirection = "column";
    }
  }

  flipShips();

  const onShipsPlaced = (occupiedSquares) => {
    console.log(occupiedSquares);
    if (occupiedSquares.length === 4) {
      resetBoardContainers();
    }
    return occupiedSquares;
  };
  dragAndDrop(onShipsPlaced);
}
