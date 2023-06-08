import placePlayerDomShip from "./placePlayerDomShip";
import placeAIDomShip from "./placeAIDomShip";

export default function domFuncs() {
  let placeTempDOMShips = function () {
    placeAIDomShip(2, 2, 1, "vertical");
    placeAIDomShip(3, 4, 4, "horizontal");
    placeAIDomShip(4, 6, 1, "horizontal");
    placeAIDomShip(5, 4, 5, "vertical");
    placePlayerDomShip(2, 2, 1, "vertical");
    placePlayerDomShip(3, 4, 3, "horizontal");
    placePlayerDomShip(4, 6, 1, "horizontal");
    placePlayerDomShip(5, 4, 5, "vertical");
  };

  return {
    placeTempDOMShips,
  };
}
