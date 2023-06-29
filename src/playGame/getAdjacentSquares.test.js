import getAdjacentSquares from "./getAdjacentSquares";

test("list adjacent squares for relevant square", () => {
  const selectedSquare = [2, 2];
  const [selectedRow, selectedColumn] = selectedSquare;
  const adjacentSquares = getAdjacentSquares(selectedRow, selectedColumn);

  // Assert the expected adjacent squares
  expect(adjacentSquares).toEqual(
    expect.arrayContaining([
      [1, 2],
      [2, 1],
      [2, 3],
      [3, 2],
    ])
  );
});

test("list adjacent squares for a square on the side of the board", () => {
  const selectedSquare = [0, 0];
  const [selectedRow, selectedColumn] = selectedSquare;
  const adjacentSquares = getAdjacentSquares(selectedRow, selectedColumn);

  // Assert the expected adjacent squares
  expect(adjacentSquares).toEqual(
    expect.arrayContaining([
      [0, 1],
      [1, 0],
    ])
  );
});
