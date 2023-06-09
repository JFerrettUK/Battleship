import placePlayerShipDOM from "./placePlayerShipDOM";
import placeAIShipDOM from "./placeAIShipDOM";

export default function placeTempShipsDOM() {
  placeAIShipDOM(2, 2, 1, "vertical");
  placeAIShipDOM(3, 4, 4, "horizontal");
  placeAIShipDOM(4, 6, 1, "horizontal");
  placeAIShipDOM(5, 4, 5, "vertical");
  placePlayerShipDOM(2, 2, 1, "vertical");
  placePlayerShipDOM(3, 4, 3, "horizontal");
  placePlayerShipDOM(4, 6, 1, "horizontal");
  placePlayerShipDOM(5, 4, 5, "vertical");
}
