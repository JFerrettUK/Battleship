import domFuncs from "./dom/domFuncs";

const domFunctions = domFuncs();

domFunctions.playerBoardDOM("userBoard");
domFunctions.aiBoardDOM("aiBoard");
domFunctions.userClickDOM();

domFunctions.placePlayerShipDOM(3, 2, 1, "vertical");
domFunctions.placePlayerShipDOM(4, 5, 6, "vertical");
domFunctions.placePlayerShipDOM(2, 4, 1, "horizontal");
domFunctions.placePlayerShipDOM(3, 7, 6, "horizontal");
