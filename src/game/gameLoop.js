import manageTurns from "./manageTurns";
import player from "./player";
import aiPlayer from "./aiPlayer";

export default function gameLoop(playerName) {
  const ai = aiPlayer();
  const user = player(playerName);
  const attackPlayerFunc = user.playerBoard.receiveAIAttack.bind(
    user.playerBoard
  );
  const attackAIFunc = ai.playerBoard.receiveAttack.bind(ai.playerBoard);
  const turns = manageTurns();
  const placeAIShip = ai.playerBoard.placeShip.bind(ai.playerBoard);
  const placeUserShip = user.playerBoard.placeShip.bind(user.playerBoard);

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

  let placeTempShips = function () {
    placeAIShip(2, 2, 1, "vertical");
    placeAIShip(3, 4, 4, "horizontal");
    placeAIShip(4, 6, 1, "horizontal");
    placeAIShip(5, 4, 5, "vertical");
    placeUserShip(2, 2, 1, "vertical");
    placeUserShip(3, 4, 4, "horizontal");
    placeUserShip(4, 6, 1, "horizontal");
    placeUserShip(5, 4, 5, "vertical");
  };

  return {
    ai,
    user,
    turns,
    attackPlayer,
    attackAI,
    placeAIShip,
    placeUserShip,
    placeTempShips,
  };
}
