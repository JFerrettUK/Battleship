import placePlayerShipDOM from "./placePlayerShipDOM";
import placeAIShipDOM from "./placeAIShipDOM";
export default function placeShipsDOM(shipsToPlace) {
  let aiShips, playerShips;

  // replace with parameter
  if (!shipsToPlace) {
    shipsToPlace = {
      aiShips: [
        [2, 2, 1, "vertical"],
        [3, 4, 4, "horizontal"],
        [4, 6, 1, "horizontal"],
        [5, 4, 5, "vertical"],
      ],
      playerShips: [
        [2, 2, 1, "vertical"],
        [3, 4, 3, "horizontal"],
        [4, 6, 1, "horizontal"],
        [5, 4, 5, "vertical"],
      ],
    };
  }

  aiShips = shipsToPlace.aiShips;
  playerShips = shipsToPlace.playerShips;

  function placeShipsIntoDOM() {
    for (let i = 0; i < aiShips.length; i++) {
      placeAIShipDOM(...aiShips[i]);
      placePlayerShipDOM(...playerShips[i]);
    }
  }

  placeShipsIntoDOM();
}
