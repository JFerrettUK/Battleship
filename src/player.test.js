import player from "./player";

test("Set the names of player objects", () => {
  let newPlayer = player("John");
  expect(newPlayer.name).toBe("John");
});

test("Set the player's number in the turn order", () => {
  let newPlayer = player("John", 0);
  expect(newPlayer.playerNo).toBe(0);
});

test("newPlayer has the correct number of rows (10)", () => {
  let newPlayer = player("John", 0);
  expect(newPlayer.playerBoard.board.length).toBe(10);
});

test("check whether or not all ships have been sunk (false)", () => {
  let newPlayer = player("John", 0);
  newPlayer.playerBoard.placeShip(3, 2, 1, "vertical");
  newPlayer.playerBoard.receiveAttack(2, 1);
  newPlayer.playerBoard.receiveAttack(2, 2);
  newPlayer.playerBoard.receiveAttack(2, 3);

  newPlayer.playerBoard.placeShip(4, 5, 6, "vertical");
  newPlayer.playerBoard.receiveAttack(5, 2);
  newPlayer.playerBoard.receiveAttack(5, 7);
  newPlayer.playerBoard.receiveAttack(5, 8);
  newPlayer.playerBoard.receiveAttack(5, 9);
  expect(newPlayer.playerBoard.allSunk()).toBe(false);
  console.log(newPlayer);
});
