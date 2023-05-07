import gameboard from "./gameboard";

export default function player(name) {
  let newPlayer = function () {
    return {
      name: name,
      isTurn: true,
      playerBoard: gameboard(),
    };
  };

  return newPlayer(name);
}
