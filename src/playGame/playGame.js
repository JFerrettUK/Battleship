import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

export default async function playGame() {
  let thisGame = gameLoop("James");
  thisGame.placeTempShips();

  const domFunctions = domFuncs();
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
  domFunctions.userClickDOM();
  domFunctions.placeTempDOMShips();

  // // Function to handle player attack and update the DOM
  // const attackPlayerAndRender = () => {
  //   thisGame.attackPlayer();
  //   domFunctions.aiAttackDOM(row, column);
  //   // Example: domFunctions.explosionClickDOM();
  // };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return thisGame;
}

//Have the AI attack
//Make sure the turn is changed
