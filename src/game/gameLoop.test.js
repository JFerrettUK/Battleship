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
