import gameLoop from "../game/gameLoop";
import placePlayerShipsDOM from "../dom/placePlayerShipsDOM";
import placeAIShipsDOM from "../dom/placeAIShipsDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import userClickGameDOM from "./userClickGameDOM";
import announceWinnerDOM from "../dom/announceWinnerDOM";
import startGame from "./startGame";
import makeAICoords from "./makeAICoords";

export default function playGame() {
  let thisGame = gameLoop("James");
  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");

  let runTime = 0;

  function handleShipsPlaced(shipLocations) {
    let aiCoords = makeAICoords();

    const shipsToPlace = {
      aiShips: aiCoords,
      playerShips: shipLocations,
    };

    runTime++;
    placePlayerShipsDOM(shipsToPlace);

    if (runTime >= 4) {
      // Call placeGameShips as a method of thisGame
      placeAIShipsDOM(shipsToPlace);
      thisGame.placeGameShips(shipsToPlace);
    }
  }

  startGame(handleShipsPlaced);

  // Define a callback function that updates `thisGame` based on the user's attack
  const userSquareCallback = (
    aiSquareRow,
    aiSquareCol,
    playerSquareRow,
    playerSquareCol
  ) => {
    // AI attacked on user click in both DOM and Game loop
    const attackAIResult = thisGame.attackAI(aiSquareRow, aiSquareCol);
    const attackPlayerResult = thisGame.attackPlayer(
      playerSquareRow,
      playerSquareCol
    );

    if (thisGame.user.playerBoard.allSunk()) {
      announceWinnerDOM("ai");
    } else if (thisGame.ai.playerBoard.allSunk()) {
      announceWinnerDOM("user");
    }
  };

  // Pass the callback function to `userClickGameDOM`
  userClickGameDOM(userSquareCallback, thisGame);

  return thisGame;
}

function modifyShipArray(ships) {
  const modifiedShips = ships.map((ship) => {
    const [size, row, col, orientation] = ship;

    const modifiedOrientation =
      orientation === "vertical" ? "horizontal" : "vertical";
    const modifiedRow = col;
    const modifiedCol = row;

    return [size, modifiedRow, modifiedCol, modifiedOrientation];
  });

  return modifiedShips;
}
