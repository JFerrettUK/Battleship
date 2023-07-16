export default function resetBoardContainers() {
  const boardContainersElement = document.getElementById("boardContainers");
  const boardCont1Element = document.querySelector(".boardCont1");
  const flipShipsElement = document.getElementById("flipShips");

  const aiTitle = document.getElementById("aiTitle");
  const aiBoard = document.getElementById("aiBoard");

  aiTitle.style.display = "flex";
  aiBoard.style.display = "grid";

  if (boardContainersElement && boardCont1Element) {
    boardContainersElement.style.display = "grid";
    boardContainersElement.style.justifyContent = "center";
    boardContainersElement.style.gridTemplateColumns = "1fr 1fr";
    boardContainersElement.style.top = "52px";
    boardContainersElement.style.minWidth = "800px";
    boardContainersElement.style.gridTemplateColumns = "1fr 1fr";

    boardCont1Element.style.position = "";
    boardCont1Element.style.marginTop = "";
    flipShipsElement.style.display = "none";
  }
}
