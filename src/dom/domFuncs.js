import changeName from "./changeName";
import editPlayerBoard from "./editPlayerBoard";
import placeDomShip from "./placeDomShip";
import squareHitMissed from "./squareHitMissed";
import userClick from "./userClick";

export default function domFuncs() {
  let changeDOMName = function (name, userTitle) {
    changeName(name, userTitle);
  };

  let domBoard = function (targetParent) {
    editPlayerBoard(targetParent);
  };

  let placeDOMShips = function (missedSquare, type) {
    placeDomShip(missedSquare, type);
  };

  let squareDOMHitMissed = function (missedSquare, type) {
    squareHitMissed(missedSquare, type);
  };

  let userDOMClick = function () {
    userClick();
  };

  return {
    changeDOMName,
    domBoard,
    placeDOMShips,
    squareDOMHitMissed,
    userDOMClick,
  };
}
