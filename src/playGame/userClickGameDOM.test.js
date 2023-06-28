import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";
import userClickGameDOM from "./userClickGameDOM";

import { fireEvent } from "@testing-library/dom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("clicking an ai square toggles the 'flash' class of any player square", async () => {
  await playGame();
  const aiSquare = document.getElementById("0-0-aiBoard");
  const userSquares = document.querySelectorAll(".userSquare");

  expect(
    Array.from(userSquares).some((square) => square.classList.contains("flash"))
  ).toBe(false);
  fireEvent.click(aiSquare);
  expect(
    Array.from(userSquares).some((square) => square.classList.contains("flash"))
  ).toBe(true);
});
