import gameLoop from "../game/gameLoop";
import placeShipsDOM from "../dom/placeShipsDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import userClickGameDOM from "./userClickGameDOM";
import announceWinnerDOM from "../dom/announceWinnerDOM";
import startGame from "./startGame";
export default function playGame() {
  let thisGame = gameLoop("James");
  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");

  function handleShipsPlaced(shipLocations) {
    console.log("shipLocations in playGame");
    console.log(shipLocations);

    console.log("then PlaceShipsDOM");

    const shipsToPlace = {
      aiShips: shipLocations,
      playerShips: shipLocations,
    };

    placeShipsDOM(shipsToPlace);

    console.log("then placeGameShips");

    const modifiedShipsToPlace = {
      aiShips: modifyShipArray(shipsToPlace.aiShips),
      playerShips: modifyShipArray(shipsToPlace.playerShips),
    };

    console.log("then modifiedShipsToPlace");
    console.log(modifiedShipsToPlace);

    // Call placeGameShips as a method of thisGame
    console.log("shipsToPlace");
    console.log(shipsToPlace.playerShips);

    thisGame.placeGameShips(shipsToPlace);
    console.log(thisGame.user.playerBoard.board);
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
