import userClickDOM from "./userClickDOM";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import path from "path";
import { fireEvent } from "@testing-library/dom";
import { JSDOM } from "jsdom";
import editAIBoardDOM from "./editAIBoardDOM";
import placeTempShipsDOM from "./placeTempShipsDOM";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("clicking a square toggles its 'flash' class", () => {
  editAIBoardDOM("aiBoard");
  editPlayerBoardDOM("userBoard");
  placeTempShipsDOM();
  userClickDOM();
  const square = document.getElementById("0-0-aiBoard");
  expect(square.classList.contains("flash")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("flash")).toBe(true);
});

test("clicking a ship square toggles its 'flash' class", () => {
  editAIBoardDOM("aiBoard");
  editPlayerBoardDOM("userBoard");
  placeTempShipsDOM();
  userClickDOM();
  const square = document.getElementById("2-2-aiBoard");
  expect(square.classList.contains("hitShip")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("hitShip")).toBe(true);
});

test("clicking a ship square toggles its 'flash' class", () => {
  editAIBoardDOM("aiBoard");
  editPlayerBoardDOM("userBoard");
  placeTempShipsDOM();
  userClickDOM();
  const square = document.getElementById("3-3-aiBoard");
  expect(square.classList.contains("missed")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("missed")).toBe(true);
});
