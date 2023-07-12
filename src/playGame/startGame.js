import dragAndDrop from "./dragAndDrop";
import flipShips from "../dom/flipShips";

export default function startGame() {
  flipShips();
  const onShipsPlaced = (occupiedSquares) => {
    console.log("occupied squares");
    console.log(occupiedSquares);
    return occupiedSquares;
  };
  dragAndDrop(onShipsPlaced);
}
