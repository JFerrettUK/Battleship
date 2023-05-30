import aiAttack from "./aiAttack";
import editPlayerBoard from "./editPlayerBoard";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("attacking a square triggers the 'flash' animation", () => {
  editPlayerBoard("userBoard");
  let row = 0;
  let column = 0;
  const square = document.getElementById(`${row}-${column}-userBoard`);
  expect(square.classList.contains("flash")).toBe(false);
  aiAttack(row, column);
  expect(square.classList.contains("flash")).toBe(true);
});
