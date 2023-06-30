import manageTurns from "./manageTurns";
import player from "./player";
import aiPlayer from "./aiPlayer";

export default function gameLoop(playerName) {
  // Create an AI player and a user player
  const ai = aiPlayer();
  const user = player(playerName);

  // Bind the attack functions to the respective player boards
  const attackPlayerRandomFunc = user.playerBoard.receiveRandomAIAttack.bind(
    user.playerBoard
  );
  const attackPlayerFunc = user.playerBoard.receiveAIAttack.bind(
    user.playerBoard
  );
  const attackAIFunc = ai.playerBoard.receiveAttack.bind(ai.playerBoard);

  // Create an instance of the turn manager
  const turns = manageTurns();

  // Bind the ship placement functions to the respective player boards
  const placeAIShip = ai.playerBoard.placeShip.bind(ai.playerBoard);
  const placeUserShip = user.playerBoard.placeShip.bind(user.playerBoard);

  // Function to handle an attack on the user i.e. AI attacking the user
  let attackPlayerRandom = function () {
    let attackResult = attackPlayerRandomFunc()[1]; // Execute player attack
    turns.switchTurns(user, ai); // Switch turns between players
    return attackResult;
  };

  // Function to handle an attack on the AI i.e. user attacking the AI
  let attackAI = function (row, column) {
    if (attackAIFunc(row, column) == "hitBefore") {
      return [[row, column], "hitBefore"]; // If AI attack was invalid (already hit), return "hitBefore" flag
    }
    turns.switchTurns(user, ai); // Switch turns between players
    return [row, column];
  };

  // Function to handle an attack on the player i.e. ai attacking the player
  let attackPlayer = function (row, column) {
    if (attackPlayerFunc(row, column) == "hitBefore") {
      return [[row, column], "hitBefore"]; // If player attack was invalid (already hit), return "hitBefore" flag
    }
    turns.switchTurns(user, ai); // Switch turns between players
    return [row, column];
  };

  // Function to place temporary ships for testing purposes
  let placeGameShips = function (shipsToPlace) {
    let aiShips, playerShips;

    // replace with parameter
    if (!shipsToPlace) {
      shipsToPlace = {
        aiShips: [
          [2, 2, 1, "vertical"],
          [3, 4, 4, "horizontal"],
          [4, 6, 1, "horizontal"],
          [5, 4, 5, "vertical"],
        ],
        playerShips: [
          [2, 2, 1, "vertical"],
          [3, 4, 3, "horizontal"],
          [4, 6, 1, "horizontal"],
          [5, 4, 5, "vertical"],
        ],
      };
    }

    aiShips = shipsToPlace.aiShips;
    playerShips = shipsToPlace.playerShips;

    function placeShips() {
      for (let i = 0; i < aiShips.length; i++) {
        placeAIShip(...aiShips[i]);
        placeUserShip(...playerShips[i]);
      }
    }

    placeShips();
  };

  // Return an object containing the relevant components of the game loop
  return {
    ai, // AI player object
    user, // User player object
    turns, // Turn manager object
    attackPlayer,
    attackPlayerRandom, // Function to handle player attack
    attackAI, // Function to handle AI attack
    placeAIShip, // Function to place AI ship
    placeUserShip, // Function to place user ship
    placeGameShips, // Function to place temporary ships for testing
  };
}
