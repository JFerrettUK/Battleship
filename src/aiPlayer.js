import gameboard from "./gameboard";

export default function player() {
  let computer = function () {
    return {
      name: "Hal",
      isTurn: false,
      playerBoard: gameboard(),
    };
  };
  return computer();
}
