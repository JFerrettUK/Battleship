import placeAIShipDOM from "./placeAIShipDOM";

export default function placeAIShipsDOM(shipsToPlace) {
  let aiShips;
  aiShips = shipsToPlace.aiShips;

  function placeShipsIntoDOM() {
    for (let i = 0; i < aiShips.length; i++) {
      placeAIShipDOM(...aiShips[i]);
    }
  }

  placeShipsIntoDOM();
}
