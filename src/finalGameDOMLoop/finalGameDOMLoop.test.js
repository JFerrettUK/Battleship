import path from "path";
import { JSDOM } from "jsdom";
import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

const domFunctions = domFuncs();

test("gameLoop user and ai players should work with the manageTurn func", () => {
  let thisGame = gameLoop("James");
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
  domFunctions.userClickDOM();

  domFunctions.placeTempDOMShips();
  thisGame.placeTempShips();
});
