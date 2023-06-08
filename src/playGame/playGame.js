import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";
import changeNameDOM from "../dom/changeNameDOM";
import receiveAIAttackDOM from "../dom/receiveAIAttackDOM";
import editAIBoardDOM from "../dom/editAIBoardDOM";
import editPlayerBoard from "../dom/editPlayerBoard";
import placePlayerDomShip from "../dom/placePlayerDomShip";
import placeAIDomShip from "../dom/placeAIDomShip";
import squareHitMissed from "../dom/squareHitMissed";
import explosionClick from "../dom/explosionClick";
import userClick from "../dom/userClick";

export default async function playGame() {
  let thisGame = gameLoop("James");
  thisGame.placeTempShips();

  const handleAttack = function (
    playerAttackRow,
    playerAttackColumn,
    thisGame
  ) {
    // Player attacks AI
    let attackedAISquare = thisGame.attackAI(
      playerAttackRow,
      playerAttackColumn
    );

    // AI attacks player
    let attackedPlayerSquare = thisGame.attackPlayer();
    thisGame = receiveAIAttackDOM(
      attackedPlayerSquare[0],
      attackedPlayerSquare[1],
      thisGame
    );

    return thisGame;
  };

  const domFunctions = domFuncs();
  editPlayerBoard("userBoard");
  editAIBoardDOM("aiBoard");
  thisGame = userClick();
  domFunctions.placeTempDOMShips();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { thisGame, handleAttack };
}
