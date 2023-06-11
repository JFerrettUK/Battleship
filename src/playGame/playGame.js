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
  const userSquareCallback = (playerRow, playerCol) => {
    // Perform any necessary game logic based on the user's attack
    // Update `thisGame` accordingly
    // Example:
    const attackResult = thisGame.attackPlayer(playerRow, playerCol);
    console.log("Attack result:", attackResult);
  };

  // Pass the callback function to `userClickGameDOM`
  userClickGameDOM(userSquareCallback);

  return thisGame;
}
