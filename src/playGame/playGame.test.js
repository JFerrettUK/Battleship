import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";
import { fireEvent } from "@testing-library/dom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("Check temp ships are in place", async () => {
  await playGame();
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

test("clicking a square toggles its 'flash' class", async () => {
  await playGame();
  const square = document.getElementById("0-0-aiBoard");
  expect(square.classList.contains("flash")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("flash")).toBe(true);
});

test("clicking a ship square toggles its 'hitShip' class when needed", async () => {
  await playGame();
  const square = document.getElementById("2-2-aiBoard");
  expect(square.classList.contains("hitShip")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("hitShip")).toBe(true);
});

test("clicking a ship square toggles its 'missed' class when needed", async () => {
  await playGame();
  const square = document.getElementById("3-3-aiBoard");
  expect(square.classList.contains("missed")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("missed")).toBe(true);
});
