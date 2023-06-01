import changeName from "./changeName";
import aiAttack from "./aiAttack";
import editAIBoard from "./editAIBoard";
import editPlayerBoard from "./editPlayerBoard";
import placePlayerDomShip from "./placePlayerDomShip";
import placeAIDomShip from "./placeAIDomShip";
import squareHitMissed from "./squareHitMissed";
import explosionClick from "./explosionClick";
import userClick from "./userClick";

export default function domFuncs() {
  let aiAttackDOM = function (row, column) {
    aiAttack(row, column);
  };

  let changeNameDOM = function (name, userTitle) {
    return changeName(name, userTitle);
  };

  let aiBoardDOM = function (targetParent) {
    editAIBoard(targetParent);
  };

  let playerBoardDOM = function (targetParent) {
    editPlayerBoard(targetParent);
  };

  let explosionClickDOM = function () {
    explosionClick();
  };

  let placePlayerShipDOM = function (length, row, column, align) {
    placePlayerDomShip(length, row, column, align);
  };

  let placeAIShipDOM = function (length, row, column, align) {
    placeAIDomShip(length, row, column, align);
  };

  let squareHMDOM = function (missedSquare, type) {
    squareHitMissed(missedSquare, type);
  };

  let userClickDOM = function () {
    userClick();
  };

  let placeTempDOMShips = function () {
    placeAIShipDOM(2, 2, 1, "vertical");
    placeAIShipDOM(3, 4, 4, "horizontal");
    placeAIShipDOM(4, 6, 1, "horizontal");
    placeAIShipDOM(5, 4, 5, "vertical");
    placePlayerShipDOM(2, 2, 1, "vertical");
    placePlayerShipDOM(3, 4, 3, "horizontal");
    placePlayerShipDOM(4, 6, 1, "horizontal");
    placePlayerShipDOM(5, 4, 5, "vertical");
  };

  return {
    aiAttackDOM,
    changeNameDOM,
    aiBoardDOM,
    playerBoardDOM,
    explosionClickDOM,
    placeTempDOMShips,
    placeAIShipDOM,
    placePlayerShipDOM,
    squareHMDOM,
    userClickDOM,
  };
}
