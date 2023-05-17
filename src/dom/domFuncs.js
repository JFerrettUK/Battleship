import changeName from "./changeName";
import editAIBoard from "./editAIBoard";
import editPlayerBoard from "./editPlayerBoard";
import placePlayerDomShip from "./placePlayerDomShip";
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

  let squareHMDOM = function (missedSquare, type) {
    squareHitMissed(missedSquare, type);
  };

  let userClickDOM = function () {
    userClick();
  };

  return {
    changeNameDOM,
    aiBoardDOM,
    explosionClickDOM,
    playerBoardDOM,
    placePlayerShipDOM,
    squareHMDOM,
    userClickDOM,
  };
}
