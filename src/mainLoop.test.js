import mainLoop from "./mainLoop";

//The game loop should set up a new game by creating Players and Gameboards.
//For now just populate each Gameboard with predetermined coordinates.
//You can implement a system for allowing players to place their ships later.

let thisGame = mainLoop("James");

test("mainLoop user and ai players should work with the manageTurn func", () => {
  let testGame = mainLoop("James");
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
  thisGame.placePlayerShip(3, 2, 1, "vertical");
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

test("playerAttack: Attacking the user should damage part of the user's board", () => {
  thisGame.attackPlayer();
  expect(thisGame.user.playerBoard.anyMissed()[0]).toBe(true);
});

test("playerAttack: The last attack should make it turn no 2", () => {
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.turns.getNo()).toBe(2);
});

test("attackAI: Don't change turns if the AI's square was hitBefore", () => {
  expect(thisGame.attackAI(1, 1)).toBe("hitBefore");
  expect(thisGame.ai.playerBoard.board[1][1]).toBe("missed");
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.turns.getNo()).toBe(2);
});
