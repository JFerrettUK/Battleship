import path from "path";
import { JSDOM } from "jsdom";
import domFuncs from "./domFuncs";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("Check that there are one-hundred squares in the DOM", () => {
  const domFunctions = domFuncs();
  domFunctions.domBoard("userBoard");
  domFunctions.domBoard("aiBoard");
  const squareList = document.querySelectorAll(".battleSquare");
  expect(squareList.length).toBe(200);
});
