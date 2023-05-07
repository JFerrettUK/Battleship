import mainLoop from "./mainLoop";

//The game loop should set up a new game by creating Players and Gameboards.
//For now just populate each Gameboard with predetermined coordinates.
//You can implement a system for allowing players to place their ships later.
let thisGame = mainLoop();

test("mainLoop user and ai players should work with the manageTurn func", () => {
  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.turns.whoseTurn(thisGame.user, thisGame.ai)).toBe(
    "playerTurn"
  );
  thisGame.turns.switchTurns(thisGame.user, thisGame.ai);
  expect(thisGame.ai.isTurn).toBe(true);
  expect(thisGame.user.isTurn).toBe(false);
  expect(thisGame.turns.whoseTurn(thisGame.user, thisGame.ai)).toBe("aiTurn");
  thisGame.turns.switchTurns(thisGame.user, thisGame.ai);
  expect(thisGame.turns.getNo()).toBe(2);
});
