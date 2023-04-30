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
  battleshipBoard.placeShip(3, 2, 1);
  expect(battleshipBoard.board[2][1]).toBe("ship3");
  expect(battleshipBoard.board[2][2]).toBe("ship3");
  expect(battleshipBoard.board[2][3]).toBe("ship3");
  //I don't need to actually place the ship on each square! Just store an object in the gameboard
  //Then add a hit counter whenever something "hits" that square.
  //Keep the gameboard list and ship objects totally seperate!
});
