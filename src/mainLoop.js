import manageTurns from "./manageTurns";
import player from "./player";
import aiPlayer from "./aiPlayer";

export default function mainLoop(playerName) {
  let ai = aiPlayer();
  let user = player(playerName);

  expect(ai.isTurn).toBe(false);
  expect(user.isTurn).toBe(true);

  const turns = manageTurns();
  expect(turns.whoseTurn(user, ai)).toBe("playerTurn");

  return {
    ai,
    user,
    turns,
  };
}
