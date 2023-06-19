import gameLoop from "../game/gameLoop";
import placeTempShipsDOM from "../dom/placeTempShipsDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import userClickGameDOM from "./userClickGameDOM";

export default function playGame() {
  let thisGame = gameLoop("James");
  thisGame.placeTempShips();
  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");
  placeTempShipsDOM();

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
  };

  // Pass the callback function to `userClickGameDOM`
  userClickGameDOM(userSquareCallback);
  return thisGame;
}
