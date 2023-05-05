import aiPlayer from "./aiPlayer";

test("Set the names of player objects", () => {
  let AI = aiPlayer("John");
  expect(AI.name).toBe("Hal");
});

test("Check that the gameboard of the computer is working)", () => {
  let AI = aiPlayer("John", 0);
  AI.playerBoard.placeShip(3, 2, 1, "vertical");
  AI.playerBoard.receiveAttack(2, 1);

  AI.playerBoard.placeShip(4, 5, 6, "vertical");
  AI.playerBoard.receiveAttack(5, 2);
  AI.playerBoard.receiveAttack(5, 9);
  expect(AI.playerBoard.allSunk()).toBe(false);
});

test("isTurn starts as False", () => {
  let AI = aiPlayer("AI");
  expect(AI.isTurn).toBe(false);
});
