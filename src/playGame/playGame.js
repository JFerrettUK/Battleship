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
  userClickGameDOM();

  return thisGame;
}
