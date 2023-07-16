import gameLoop from "../game/gameLoop";
import placeShipsDOM from "../dom/placeShipsDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import userClickGameDOM from "./userClickGameDOM";
import announceWinnerDOM from "../dom/announceWinnerDOM";
import startGame from "./startGame";
import convertShipArray from "./convertShipArray";

export default function playGame() {
  let thisGame = gameLoop("James");
  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");

  function handleShipsPlaced(shipLocations) {
    console.log(shipLocations);
    placeShipsDOM(shipLocations); // Call placeShipsDOM with the shipLocations array
    thisGame.placeGameShips(shipLocations);
  }

  startGame(convertShipArray, handleShipsPlaced);

  // Define a callback function that updates `thisGame` based on the user's attack
  const userSquareCallback = (
    aiSquareRow,
    aiSquareCol,
    playerSquareRow,
    playerSquareCol
  ) => {
    //ai attacked on user click in both DOM and Gameloop
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
