import gameboard from "./gameboard";
import ship from "./ship";

test("testGameboard has the correct number of rows (10)", () => {
  let battleshipBoard = gameboard();
  expect(battleshipBoard.board.length).toBe(10);
});

test("testGameboard row arrays are all the correct length (10)", () => {
  let battleshipBoard = gameboard();
  for (let i = 0; i < 10; i++) {
    expect(battleshipBoard.board[i].length).toBe(10);
  }
});

// Gameboards should be able to place ships at specific
// coordinates by calling the ship factory function.

test("place ship with vertical length at specific coordinates", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "vertical");
  expect(battleshipBoard.board[2][1]).toBe("ship3");
  expect(battleshipBoard.board[2][2]).toBe("ship3");
  expect(battleshipBoard.board[2][3]).toBe("ship3");

  battleshipBoard.placeShip(4, 5, 6, "vertical");
  expect(battleshipBoard.board[5][6]).toBe("ship4");
  expect(battleshipBoard.board[5][7]).toBe("ship4");
  expect(battleshipBoard.board[5][8]).toBe("ship4");
  expect(battleshipBoard.board[5][9]).toBe("ship4");

  //I don't need to actually place the ship on each square! Just store an object in the gameboard
  //Then add a hit counter whenever something "hits" that square.
  //Keep the gameboard list and ship objects totally seperate!
});

test("place ship with horizontal length at specific coordinates", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "horizontal");
  expect(battleshipBoard.board[2][1]).toBe("ship3");
  expect(battleshipBoard.board[3][1]).toBe("ship3");
  expect(battleshipBoard.board[4][1]).toBe("ship3");

  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  expect(battleshipBoard.board[5][6]).toBe("ship4");
  expect(battleshipBoard.board[6][6]).toBe("ship4");
  expect(battleshipBoard.board[7][6]).toBe("ship4");
  expect(battleshipBoard.board[8][6]).toBe("ship4");
});

test("after placeShip, a ship is added to an object list", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  expect(battleshipBoard.ships).toHaveProperty("ship4");
});

//Gameboards should have a receiveAttack function that takes a pair of coordinates

test("check receiveAttack function changes a null board square", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  expect(battleshipBoard.board[4][5]).toBe("attacked");
});

test("check receiveAttack function changes a ship board square", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  expect(battleshipBoard.board[4][5]).toBe("hitShip");
});
