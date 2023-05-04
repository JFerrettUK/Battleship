import gameboard from "./gameboard";

export default function player(name) {
  let newPlayer = function () {
    return {
      name: name,
      playerBoard: gameboard(),
    };
  };
  return newPlayer(name);
}
