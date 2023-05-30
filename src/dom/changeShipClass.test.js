import changeShipClass from "./changeShipClass";
import editPlayerBoard from "./editPlayerBoard";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("changeShipClass updates ship class correctly", () => {
  editPlayerBoard("userBoard");
  const square = document.getElementById("5-8-userBoard");

  expect(square.classList.contains("cyan")).toBe(true);

  changeShipClass(5, 8, "user");

  expect(square.classList.contains("shipSquare")).toBe(true);
  expect(square.classList.contains("cyan")).toBe(false);
});
