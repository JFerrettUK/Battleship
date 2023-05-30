import domFuncs from "./dom/domFuncs";

const domFunctions = domFuncs();

domFunctions.playerBoardDOM("userBoard");
domFunctions.aiBoardDOM("aiBoard");
domFunctions.userClickDOM();
domFunctions.placeTempDOMShips();
domFunctions.aiAttackDOM(2, 1);
