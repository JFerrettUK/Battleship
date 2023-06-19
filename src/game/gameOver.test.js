import gameOver from "./gameOver";
import gameLoop from "./gameLoop";

test("Check if ai ships have all been hit. If they haven't, return false", () => {
  let thisGame = gameLoop("James");

  thisGame.placeAIShip(4, 5, 6, "vertical");
  expect(gameOver(thisGame)).toBe(false);
});

test("Check if user ships have all been hit. If they haven't, return false", () => {
  let thisGame = gameLoop("James");

  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(gameOver(thisGame)).toBe(false);
});

test("Check if ai ships have all been hit. If they have, return aiWins", () => {
  let thisGame = gameLoop("James");
  thisGame.placeAIShip(4, 5, 6, "vertical");
  expect(gameOver(thisGame)).toBe(false);

  thisGame.attackAI(5, 6);
  thisGame.attackAI(5, 7);
  thisGame.attackAI(5, 8);
  thisGame.attackAI(5, 9);
  expect(gameOver(thisGame)).toBe(true);
});

test("Check if user ships have all been hit. If they have, return userWins", () => {
  let thisGame = gameLoop("James");
  thisGame.placeUserShip(3, 2, 1, "vertical");
  expect(gameOver(thisGame)).toBe(false);

  for (let index = 0; index < 100; index++) {
    thisGame.attackPlayerRandom();
  }
  expect(gameOver(thisGame)).toBe(true);
});
