import gameOver from "./gameOver";
import gameLoop from "./gameLoop";

let thisGame;

beforeEach(() => {
  thisGame = gameLoop("James");
});

test("Check if ai ships have all been hit. If they haven't, return false", () => {
  thisGame.placeAIShip(4, 5, 6, "vertical");
  expect(thisGame.ai.playerBoard.board[5][6]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][7]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][8]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][9]).toBe("ship4");

  expect(gameOver(thisGame)).toBe(false);
});

test("Check if user ships have all been hit. If they haven't, return false", () => {
  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(thisGame.user.playerBoard.board[2][1]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][2]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][3]).toBe("ship3");

  expect(gameOver(thisGame)).toBe(false);
});

test("Check if ai ships have all been hit. If they have, return true", () => {
  thisGame.placeAIShip(4, 5, 6, "vertical");
  expect(thisGame.ai.playerBoard.board[5][6]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][7]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][8]).toBe("ship4");
  expect(thisGame.ai.playerBoard.board[5][9]).toBe("ship4");

  thisGame.attackAI(2, 1);
  thisGame.attackAI(2, 2);
  thisGame.attackAI(2, 3);

  expect(gameOver(thisGame)).toBe(true);
});

test("Check if user ships have all been hit. If they have, return true", () => {
  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(thisGame.user.playerBoard.board[2][1]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][2]).toBe("ship3");
  expect(thisGame.user.playerBoard.board[2][3]).toBe("ship3");

  for (let index = 0; index < 100; index++) {
    thisGame.attackPlayer();
  }

  expect(gameOver(thisGame)).toBe(true);
});
