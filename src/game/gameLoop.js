import manageTurns from "./manageTurns";
import player from "./player";
import aiPlayer from "./aiPlayer";

export default function gameLoop(playerName) {
  // Create an AI player and a user player
  const ai = aiPlayer();
  const user = player(playerName);

  // Bind the attack functions to the respective player boards
  const attackPlayerFunc = user.playerBoard.receiveAIAttack.bind(
    user.playerBoard
  );
  const attackAIFunc = ai.playerBoard.receiveAttack.bind(ai.playerBoard);

  // Create an instance of the turn manager
  const turns = manageTurns();

  // Bind the ship placement functions to the respective player boards
  const placeAIShip = ai.playerBoard.placeShip.bind(ai.playerBoard);
  const placeUserShip = user.playerBoard.placeShip.bind(user.playerBoard);

  // Function to handle player attack
  let attackPlayer = function () {
    let attackResult = attackPlayerFunc()[1]; // Execute player attack
    turns.switchTurns(user, ai); // Switch turns between players
    return attackResult;
  };

  // Function to handle AI attack
  let attackAI = function (row, column) {
    if (attackAIFunc(row, column) == "hitBefore") {
      return [[row, column], "hitBefore"]; // If AI attack was invalid (already hit), return "hitBefore" flag
    }
    turns.switchTurns(user, ai); // Switch turns between players
    return row, column;
  };

  // Function to place temporary ships for testing purposes
  let placeTempShips = function () {
    // Place temporary ships on both AI and user player boards
    placeAIShip(2, 2, 1, "vertical");
    placeAIShip(3, 4, 4, "horizontal");
    placeAIShip(4, 6, 1, "horizontal");
    placeAIShip(5, 4, 5, "vertical");
    placeUserShip(2, 2, 1, "vertical");
    placeUserShip(3, 4, 4, "horizontal");
    placeUserShip(4, 6, 1, "horizontal");
    placeUserShip(5, 4, 5, "vertical");
  };

  // Return an object containing the relevant components of the game loop
  return {
    ai, // AI player object
    user, // User player object
    turns, // Turn manager object
    attackPlayer, // Function to handle player attack
    attackAI, // Function to handle AI attack
    placeAIShip, // Function to place AI ship
    placeUserShip, // Function to place user ship
    placeTempShips, // Function to place temporary ships for testing
  };
}
