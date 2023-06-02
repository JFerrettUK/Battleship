import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

export default function finalGameDOMLoop() {
  let thisGame = gameLoop("James");

  const domFunctions = domFuncs();
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
  domFunctions.userClickDOM();
  domFunctions.placeTempDOMShips();
  thisGame.placeTempShips();
}
