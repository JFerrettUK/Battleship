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

test("clicking a ship square registers that square as 'hit'", async () => {
  const game = await playGame(); // Store the returned game object
  const square = document.getElementById("2-2-aiBoard");
  expect(square.classList.contains("hitShip")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("hitShip")).toBe(true);
  // Access and test the contents of `thisGame`
  expect(game.ai.playerBoard.board[2][2]).toBe("hitShip");
});

test("clicking a ship square toggles its 'missed' class when needed", async () => {
  await playGame();
  const square = document.getElementById("3-3-aiBoard");
  expect(square.classList.contains("missed")).toBe(false);
  fireEvent.click(square);
  expect(square.classList.contains("missed")).toBe(true);
});

test("clicking a ship square registers a hit on AI", async () => {
  const game = await playGame(); // Store the returned game object
  const square = document.getElementById("3-3-aiBoard");
  const aiSquareRow = 3;
  const aiSquareCol = 3;

  // Verify that the clicked square initially doesn't have the 'missed' class
  expect(square.classList.contains("missed")).toBe(false);

  // Simulate a user click on the square
  fireEvent.click(square);

  // Verify that the clicked square now has the 'missed' class
  expect(square.classList.contains("missed")).toBe(true);

  // Verify that the game state reflects the missed attack
  expect(game.ai.playerBoard.board[aiSquareRow][aiSquareCol]).toBe("missed");
});

test("clicking an AI ship square registers a hit on the player", async () => {
  const game = await playGame(); // Store the returned game object

  expect(game.user.playerBoard.anyMissed()[0]).toBe(false);

  const square = document.getElementById("2-0-aiBoard");
  fireEvent.click(square);

  expect(game.ai.playerBoard.board[2][0]).toBe("missed");

  // Verify that a player was hit
  expect(game.user.playerBoard.anyAttacks()[0]).toBe(true);
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

test("gameOver function works with playGame", async () => {
  const game = await playGame(); // Store the returned game object

  // Verify that a player was hit
  expect(gameOver(game)[0]).toBe(false);

  for (let index = 0; index < 100; index++) {
    game.attackPlayerRandom();
  }
  expect(game.user.playerBoard.allSunk()).toBe(true);
  expect(gameOver(game)[0]).toBe(true);
});
