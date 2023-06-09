import receiveAIAttackDOM from "./receiveAIAttackDOM";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

beforeEach(() => {
  // Reset the state before each test case
  editPlayerBoardDOM("userBoard");
});

test("attacking a square triggers the 'flash' animation", () => {
  const square = document.getElementById(`0-0-userBoard`);
  expect(square.classList.contains("flash")).toBe(false);
  receiveAIAttackDOM(0, 0);
  expect(square.classList.contains("flash")).toBe(true);
});

test("attacking a missed square triggers the 'flash' animation", () => {
  const square = document.getElementById(`0-0-userBoard`);
  expect(square.classList.contains("missed")).toBe(false);
  receiveAIAttackDOM(0, 0);
  expect(square.classList.contains("missed")).toBe(true);
});
