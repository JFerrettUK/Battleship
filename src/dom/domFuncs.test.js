import path from "path";
import { JSDOM } from "jsdom";
import domFuncs from "./domFuncs";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

const domFunctions = domFuncs();

test("Check that there are one-hundred squares in the DOM", () => {
  domFunctions.playerBoardDOM("userBoard");
  const squareList = document.querySelectorAll(".battleSquare");
  expect(squareList.length).toBe(100);
});

test("Check that there are one-hundred squares in the DOM", () => {
  domFunctions.aiBoardDOM("aiBoard");
  const squareList = document.querySelectorAll(".battleSquare");
  expect(squareList.length).toBe(200);
});

test("Assign the user/AI board titles", () => {
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
  let userTitle = document.getElementById("userTitle");
  userTitle = domFunctions.changeNameDOM("John", userTitle);
  let aiTitle = document.getElementById("aiTitle");
  aiTitle = domFunctions.changeNameDOM("Hal", aiTitle);
  expect(userTitle.innerText).toBe("John");
  expect(aiTitle.innerText).toBe("Hal");
});

test("Place temp ships", () => {
  domFunctions.playerBoardDOM("userBoard");
  domFunctions.aiBoardDOM("aiBoard");
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
