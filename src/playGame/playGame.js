import gameLoop from "../game/gameLoop";
import placeShipsDOM from "../dom/placeShipsDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import userClickGameDOM from "./userClickGameDOM";
import announceWinnerDOM from "../dom/announceWinnerDOM";

export default function playGame() {
  let thisGame = gameLoop("James");
  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");

  let tempShipsToPlace = {
    aiShips: [
      [2, 2, 1, "vertical"],
      [2, 4, 3, "horizontal"],
      [2, 6, 1, "horizontal"],
      [2, 4, 5, "vertical"],
    ],
    playerShips: [
      [2, 2, 1, "vertical"],
      [2, 4, 3, "horizontal"],
      [2, 6, 1, "horizontal"],
      [2, 4, 5, "vertical"],
    ],
  };

  thisGame.placeGameShips();
  placeShipsDOM(tempShipsToPlace);

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
