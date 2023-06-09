import explosionClickDOM from "./explosionClickDOM";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import path from "path";
import { fireEvent } from "@testing-library/dom";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("clicking a square toggles its 'boom' class", () => {
  editPlayerBoardDOM("userBoard");
  explosionClickDOM();
  const square = document.getElementById("0-0-userBoard");
  expect(square.classList.contains("boom")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("boom")).toBe(true);
});
