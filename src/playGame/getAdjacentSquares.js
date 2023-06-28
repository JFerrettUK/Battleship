export default function getAdjacentSquares(row, column) {
  const adjacentSquares = [];

  // Check left square
  if (column > 0) {
    adjacentSquares.push([row, column - 1]);
  }

  // Check right square
  if (column < 8) {
    adjacentSquares.push([row, column + 1]);
  }

  // Check top square
  if (row > 0) {
    adjacentSquares.push([row - 1, column]);
  }

  // Check bottom square
  if (row < 8) {
    adjacentSquares.push([row + 1, column]);
  }

  return adjacentSquares;
}
