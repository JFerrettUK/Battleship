import domFuncs from "../dom/domFuncs";
import gameLoop from "../game/gameLoop";

let domFunctions = domFuncs();

domFunctions.playerBoardDOM("userBoard");
domFunctions.aiBoardDOM("aiBoard");
domFunctions.userClickDOM();

//Start by having the player attack
