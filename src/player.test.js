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

// test("Create two players who can attack each other", () => {
//   //make a player 1 with a ship on 5/6
//   let player1 = player("player1");
//   player1.playerBoard.placeShip(1, 5, 6, "vertical");

//   //make a player 2 with a ship on 5/6
//   let player2 = player("player2");
//   player2.playerBoard.placeShip(1, 5, 6, "vertical");

//   expect(player2.playerBoard.board[5][6]).toBe("ship1");
// });
