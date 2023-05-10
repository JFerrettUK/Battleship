import player from "./player";

test("Set the names of player objects", () => {
  let newPlayer = player("John");
  expect(newPlayer.name).toBe("John");
});

test("check that the gameboard of players are working)", () => {
  let newPlayer = player("John");
  newPlayer.playerBoard.placeShip(3, 2, 1, "vertical");
  newPlayer.playerBoard.receiveAttack(2, 1);

  newPlayer.playerBoard.placeShip(4, 5, 6, "vertical");
  newPlayer.playerBoard.receiveAttack(5, 2);
  newPlayer.playerBoard.receiveAttack(5, 9);
  expect(newPlayer.playerBoard.allSunk()).toBe(false);
});

test("isTurn starts as True", () => {
  let newPlayer = player("Human");
  expect(newPlayer.isTurn).toBe(true);
});
