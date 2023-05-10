import player from "./player";
import aiPlayer from "./aiPlayer";
import manageTurns from "./manageTurns";

test("it starts as player turn first", () => {
  let ai = aiPlayer();
  let john = player();

  expect(ai.isTurn).toBe(false);
  expect(john.isTurn).toBe(true);

  const turns = manageTurns();
  expect(turns.whoseTurn(john, ai)).toBe("playerTurn");
});

test("use the manageTurns function to move one turn on", () => {
  let ai = aiPlayer();
  let user = player();

  const turns = manageTurns();
  turns.switchTurns(user, ai);

  expect(ai.isTurn).toBe(true);
  expect(user.isTurn).toBe(false);
});

test("use the manageTurns function to move one turn on", () => {
  let ai = aiPlayer();
  let user = player();

  const turns = manageTurns();
  turns.switchTurns(user, ai);
  expect(turns.getNo()).toBe(1);
});
