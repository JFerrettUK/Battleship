import changeName from "./changeName";
import editAIBoard from "./editAIBoard";
import editPlayerBoard from "./editPlayerBoard";
import placePlayerDomShip from "./placePlayerDomShip";
import placeAIDomShip from "./placeAIDomShip";
import squareHitMissed from "./squareHitMissed";
import explosionClick from "./explosionClick";
import userClick from "./userClick";

export default function domFuncs() {
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

  let placeTempShips = function () {
    placeAIShip(2, 2, 1, "vertical");
    placeAIShip(3, 4, 4, "horizontal");
    placeAIShip(4, 6, 1, "horizontal");
    placeAIShip(5, 4, 5, "vertical");
    placePlayerDomShip(2, 2, 1, "vertical");
    placePlayerDomShip(3, 4, 4, "horizontal");
    placePlayerDomShip(4, 6, 1, "horizontal");
    placePlayerDomShip(5, 4, 5, "vertical");
  };

  return {
    changeNameDOM,
    aiBoardDOM,
    explosionClickDOM,
    playerBoardDOM,
    placePlayerShipDOM,
    placeAIShipDOM,
    squareHMDOM,
    userClickDOM,
  };
}
