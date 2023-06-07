import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

export default async function playGame() {
  // Function to handle ship placement (for testing purposes)
  const handleShipPlacement = function () {
    game.placeTempShips();
    // Update the DOM to reflect the ship placement
    // You can use the provided DOM functions such as `placeAIShipDOM` and `placePlayerShipDOM` to place the ships on the AI and player boards.
  };

  let thisGame = gameLoop("James");
  thisGame.placeTempShips();

  const domFunctions = domFuncs();
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
  domFunctions.userClickDOM();
  domFunctions.placeTempDOMShips();

  const handleAttack = function (playerAttackRow, playerAttackColumn) {
    // Player attacks AI
    let attackedAISquare = thisGame.attackAI(
      playerAttackRow,
      playerAttackColumn
    );

    // AI attacks player
    let attackedPlayerSquare = thisGame.attackPlayer();
    domFunctions.aiAttackDOM(attackedPlayerSquare[0], attackedPlayerSquare[1]);
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { thisGame, handleAttack };
}
