import gameboard from "./gameboard";

export default function player(name, playerNo) {
  let newPlayer = function () {
    return {
      name: name,
      playerNo: playerNo,
      playerBoard: gameboard(),
      //attack the enemy gameboard

      computerAttack: function () {},
    };
  };
  return newPlayer(name);
}
