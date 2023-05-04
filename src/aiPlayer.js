import gameboard from "./gameboard";

export default function player() {
  let computer = function () {
    return {
      name: "Hal",
      playerBoard: gameboard(),

      //attack the enemy gameboard
      attackComp: function (row, column) {},
    };
  };
  return computer();
}
