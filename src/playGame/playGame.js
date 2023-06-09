import gameLoop from "../game/gameLoop";
import placeTempShipsDOM from "../dom/placeTempShipsDOM";
import changeNameDOM from "../dom/changeNameDOM";
import receiveAIAttackDOM from "../dom/receiveAIAttackDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoardDOM from "../dom/editPlayerBoardDOM";
import placePlayerShipDOM from "../dom/placePlayerShipDOM";
import placeAIShipDOM from "../dom/placeAIShipDOM";
import squareHitMissedDOM from "../dom/squareHitMissedDOM";
import explosionClickDOM from "../dom/explosionClickDOM";
import userClickDOM from "../dom/userClickDOM";

//Get the DOM working, then add the game to relevant parts

export default async function playGame() {
  let thisGame = gameLoop("James");
  thisGame.placeTempShips();

  const handleAttack = function (
    playerAttackRow,
    playerAttackColumn,
    thisGame
  ) {
    // Player attacks AI
    let attackedAIS = thisGame.attackAI(playerAttackRow, playerAttackColumn);

    // AI attacks player
    let attackedPS = thisGame.attackPlayer();
    thisGame = receiveAIAttackDOM(attackedPS[0], attackedPS[1], thisGame);

    return thisGame;
  };

  editPlayerBoardDOM("userBoard");
  editAIBoardDOM("aiBoard");
  thisGame = userClickDOM();
  placeTempShipsDOM();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { thisGame, handleAttack };
}
