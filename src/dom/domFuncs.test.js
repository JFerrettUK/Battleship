import path from "path";
import { JSDOM } from "jsdom";
import domFuncs from "./domFuncs";
import editPlayerBoard from "./editPlayerBoard";
import editAIBoardDOM from "./editAIBoardDOM";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

const domFunctions = domFuncs();

test("Place temp ships", () => {
  editPlayerBoard("userBoard");
  editAIBoardDOM("aiBoard");
  domFunctions.placeTempDOMShips();
  expect(
    document.getElementById("2-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("4-3-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("6-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("4-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);
});
