import placePlayerShipDOM from "./placePlayerShipDOM";

export default function placePlayerShipsDOM(shipsToPlace) {
  let playerShips;
  playerShips = shipsToPlace.playerShips;

  function placeShipsIntoDOM() {
    for (let i = 0; i < playerShips.length; i++) {
      placePlayerShipDOM(...playerShips[i]);
    }
  }

  placeShipsIntoDOM();
}
