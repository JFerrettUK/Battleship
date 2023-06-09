import changeShipClassDOM from "./changeShipClassDOM";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("changeShipClassDOM updates ship class correctly", () => {
  editPlayerBoardDOM("userBoard");
  const square = document.getElementById("5-8-userBoard");

  expect(square.classList.contains("cyan")).toBe(true);

  changeShipClassDOM(5, 8, "user");

  expect(square.classList.contains("shipSquare")).toBe(true);
  expect(square.classList.contains("cyan")).toBe(false);
});
