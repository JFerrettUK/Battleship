import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";
import { fireEvent } from "@testing-library/dom";
import gameLoop from "../game/gameLoop";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("clicking a square toggles its 'flash' class", async () => {
  await playGame();
  const square = document.getElementById("0-0-aiBoard");
  expect(square.classList.contains("flash")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("flash")).toBe(true);
});
