import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";
import { fireEvent } from "@testing-library/dom";
import gameOver from "../game/gameOver";
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

test("Check if user ships have all been hit. If they have, gameOver works", () => {
  let thisGame = gameLoop("James");
  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(gameOver(thisGame)[0]).toBe(false);

  for (let index = 0; index < 100; index++) {
    thisGame.attackPlayerRandom();
  }
  expect(gameOver(thisGame)[0]).toBe(true);
});
