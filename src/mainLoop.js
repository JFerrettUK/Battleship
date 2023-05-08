import manageTurns from "./manageTurns";
import player from "./player";
import aiPlayer from "./aiPlayer";

export default function mainLoop(playerName) {
  const ai = aiPlayer();
  const user = player(playerName);
  const attackPlayerFunc = user.playerBoard.receiveAIAttack.bind(
    user.playerBoard
  );
  const attackAIFunc = ai.playerBoard.receiveAttack.bind(ai.playerBoard);
  const turns = manageTurns();
  const placeAIShip = ai.playerBoard.placeShip.bind(ai.playerBoard);
  const placePlayerShip = user.playerBoard.placeShip.bind(user.playerBoard);

  let attackPlayer = function (row, column) {
    attackPlayerFunc();
    turns.switchTurns(user, ai);
  };

  let attackAI = function (row, column) {
    if (attackAIFunc(row, column) == "hitBefore") {
      return "hitBefore";
    }
    turns.switchTurns(user, ai);
  };

  return {
    ai,
    user,
    turns,
    attackPlayer,
    attackAI,
    placeAIShip,
    placePlayerShip,
  };
}
