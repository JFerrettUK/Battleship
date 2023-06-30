import gameLoop from "./gameLoop";

let thisGame = gameLoop("James");

test("gameLoop user and ai players should work with the manageTurn func", () => {
  let testGame = gameLoop("James");
  expect(testGame.user.isTurn).toBe(true);
  expect(testGame.ai.isTurn).toBe(false);
  expect(testGame.turns.whoseTurn(testGame.user, testGame.ai)).toBe(
    "playerTurn"
  );
  testGame.turns.switchTurns(testGame.user, testGame.ai);
  expect(testGame.ai.isTurn).toBe(true);
  expect(testGame.user.isTurn).toBe(false);
  expect(testGame.turns.whoseTurn(testGame.user, testGame.ai)).toBe("aiTurn");
  testGame.turns.switchTurns(testGame.user, testGame.ai);
  expect(testGame.turns.getNo()).toBe(2);
});

test("Place ships in various locations", () => {
  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(thisGame.user.playerBoard.board[2][1]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][2]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][3]).toBe("ship3");

  thisGame.placeAIShip(4, 5, 6, "vertical");
  expect(thisGame.ai.playerBoard.board[5][6]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][7]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][8]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][9]).toBe("ship4");
});

test("attackAI: Attacking the AI should damage part of the AI's board", () => {
  thisGame.attackAI(1, 1);
  expect(thisGame.ai.playerBoard.board[1][1]).toBe("missed");
});

test("attackAI: The last attack should make it turn no 1", () => {
  expect(thisGame.ai.isTurn).toBe(true);
  expect(thisGame.user.isTurn).toBe(false);
  expect(thisGame.turns.getNo()).toBe(1);
});

test("attackPlayerRandom: Attacking the user should damage part of the user's board", () => {
  thisGame.attackPlayerRandom();
  expect(thisGame.user.playerBoard.anyMissed()[0]).toBe(true);
});

test("attackPlayerRandom: The last attack should make it turn no 2", () => {
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.turns.getNo()).toBe(2);
});

test("attackAI: Don't change turns if the AI's square was hitBefore", () => {
  expect(thisGame.attackAI(1, 1)[1]).toBe("hitBefore");
  expect(thisGame.ai.playerBoard.board[1][1]).toBe("missed");
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.turns.getNo()).toBe(2);
});

describe("Hit ships: attack function works", () => {
  test("check receiveAttack function changes a null board square", () => {
    thisGame = gameLoop("James");
    thisGame.user.playerBoard.placeShip(4, 5, 6, "horizontal");
    thisGame.user.playerBoard.receiveAttack(4, 5);
    expect(thisGame.user.playerBoard.board[4][5]).toBe("missed");
  });

  test("check receiveAttack function changes a ship board square", () => {
    thisGame = gameLoop("James");
    thisGame.user.playerBoard.placeShip(4, 5, 6, "horizontal");
    thisGame.user.playerBoard.receiveAttack(5, 6);
    expect(thisGame.user.playerBoard.board[5][6]).toBe("hitShip");
  });

  test("check receiveAttack function changes a ship object", () => {
    thisGame = gameLoop("James");
    thisGame.user.playerBoard.placeShip(4, 5, 6, "horizontal");
    thisGame.user.playerBoard.receiveAttack(5, 6);
    thisGame.user.playerBoard.receiveAttack(6, 6);
    expect(thisGame.user.playerBoard.ships.ship4.hits).toBe(2);
  });
});

test("placeGameShips: Manually add ships to user/ai boards", () => {
  thisGame = gameLoop("James");
  thisGame.placeGameShips();
  expect(thisGame.ai.playerBoard.board[2][1]).toBe("ship2");
  expect(thisGame.ai.playerBoard.board[4][4]).toBe("ship3");
  expect(thisGame.ai.playerBoard.board[6][1]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[4][5]).toBe("ship5");

  expect(thisGame.user.playerBoard.board[2][1]).toBe("ship2");
  expect(thisGame.user.playerBoard.board[4][3]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[6][1]).toBe("ship4");
  expect(thisGame.user.playerBoard.board[4][5]).toBe("ship5");
});
