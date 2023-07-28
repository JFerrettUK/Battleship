import placePlayerShipDOM from "./placePlayerShipDOM";
import placeAIShipDOM from "./placeAIShipDOM";
export default function placeShipsDOM(shipsToPlace) {
  let aiShips, playerShips;
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
