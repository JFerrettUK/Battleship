export default function convertShipArray(arr) {
  const convertedArr = [];

  for (let i = 0; i < arr.length; i++) {
    const ship = arr[i];
    const size = ship.size;
    const orientation = ship.orientation;
    const occupiedSquares = ship.occupiedSquares;

    let minRow = Infinity;
    let minCol = Infinity;

    for (let j = 0; j < occupiedSquares.length; j++) {
      console.log("Value of occupiedSquares[j]:", occupiedSquares[j]);
      const { row, column } = occupiedSquares[j];
      minRow = Math.min(minRow, row);
      minCol = Math.min(minCol, column);
    }

    convertedArr.push([size, minRow, minCol, orientation]);
  }

  console.log("convertedArr in func");
  console.log(convertedArr);

  return convertedArr;
}
