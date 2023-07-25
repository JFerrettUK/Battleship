import gameboard from "./gameboard";

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

test("place ship with vertical length at specific coordinates", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "vertical");
  expect(battleshipBoard.board[2][1]).toBe("ship3");
  expect(battleshipBoard.board[3][1]).toBe("ship3");
  expect(battleshipBoard.board[4][1]).toBe("ship3");
});

test("place ship with horizontal length at specific coordinates", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "horizontal");
  expect(battleshipBoard.board[2][1]).toBe("ship3");
  expect(battleshipBoard.board[2][2]).toBe("ship3");
  expect(battleshipBoard.board[2][3]).toBe("ship3");
});

test("after placeShip, a ship is added to the ships object", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  expect(battleshipBoard.ships).toHaveProperty("ship4");
});

test("check receiveAttack function changes a null board square", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  expect(battleshipBoard.board[4][5]).toBe("missed");
});

test("check receiveAttack function changes a ship board square", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(5, 6);
  expect(battleshipBoard.board[5][6]).toBe("hitShip");
});

test("check receiveAttack function changes a ship object", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(5, 6);
  battleshipBoard.receiveAttack(6, 6);
  expect(battleshipBoard.ships.ship4.hits).toBe(2);
});

test("record coordinates of a missed shot", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(1, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  expect(battleshipBoard.listMissed[0]).toStrictEqual([4, 5]);
});

test("check whether or not all ships have been sunk (true)", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "vertical");
  battleshipBoard.receiveAttack(2, 1);
  battleshipBoard.receiveAttack(2, 2);
  battleshipBoard.receiveAttack(2, 3);

  battleshipBoard.placeShip(4, 5, 6, "vertical");
  battleshipBoard.receiveAttack(5, 6);
  battleshipBoard.receiveAttack(5, 7);
  battleshipBoard.receiveAttack(5, 8);
  battleshipBoard.receiveAttack(5, 9);
  expect(battleshipBoard.allSunk()).toBe(true);
});

test("check whether or not all ships have been sunk (false)", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(3, 2, 1, "horizontal");
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(5, 9);
  battleshipBoard.receiveAttack(4, 1);
  battleshipBoard.receiveAttack(5, 6);
  battleshipBoard.receiveAttack(6, 6);
  battleshipBoard.receiveAttack(7, 6);
  battleshipBoard.receiveAttack(9, 6);
  expect(battleshipBoard.allSunk()).toBe(false);
});

test("check anyMissed doesn't always work", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  expect(battleshipBoard.anyMissed()[0]).toBe(false);
});

test("check receiveRandomAIAttack changes a null board square", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveRandomAIAttack();
  expect(battleshipBoard.anyAttacks()[0]).toBe(true);
});

test("check receiveAttack can't hit a missed square twice", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  expect(battleshipBoard.isMissed(4, 4)).toBe(false);
  expect(battleshipBoard.isMissed(4, 5)).toBe(true);
  expect(battleshipBoard.receiveAttack(4, 5)).toBe("hitBefore");
});

test("check receiveAttack can't hit a hit ship twice", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(5, 6);
  expect(battleshipBoard.board[5][6]).toBe("hitShip");
  expect(battleshipBoard.receiveAttack(5, 6)).toBe("hitBefore");
});

test("check receiveRandomAIAttack can't hit a missed square twice", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.receiveRandomAIAttack();
  const theMissed = battleshipBoard.anyMissed();
  expect(theMissed[0]).toBe(true);
  expect(battleshipBoard.receiveAttack(theMissed[1][0], theMissed[1][1])).toBe(
    "hitBefore"
  );
});
test("run receiveRandomAIAttack 500 times. It should at some point return 'hit before'", () => {
  let battleshipBoard = gameboard();
  let hitBefore = false;
  for (let i = 0; i < 500; i++) {
    let result = battleshipBoard.receiveRandomAIAttack();
    if (result[0] === "hitBefore") {
      hitBefore = true;
      break;
    }
  }
  expect(hitBefore).toBe(true);
});
test("if receiveRandomAIAttack hits an already touched square, it runs again", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.placeShip(4, 5, 6, "horizontal");
  battleshipBoard.receiveAttack(4, 5);
  battleshipBoard.receiveRandomAIAttack();
  const theAttacked = battleshipBoard.anyAttacks();
  expect(theAttacked[0]).toBe(true);
  expect(
    battleshipBoard.receiveAttack(theAttacked[1][0], theAttacked[1][1])
  ).toBe("hitBefore");
});
test("generate a list of all coordinates not attacked", () => {
  let battleshipBoard = gameboard();
  battleshipBoard.receiveAttack(4, 5);
  let allPotentials = battleshipBoard.generatePotentialTargets();
  expect(allPotentials.length).toBe(99);
});
