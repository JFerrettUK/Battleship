export default function makeAICoords() {
  // Function to generate a random number between min and max (inclusive)
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate random coordinates for a ship of a given length and alignment
  function generateRandomShipCoordinates(length, alignment) {
    const coordinates = [];
    let row, column;

    if (alignment === "vertical") {
      row = getRandomNumber(0, 9 - length + 1);
      column = getRandomNumber(0, 9);
    } else {
      row = getRandomNumber(0, 9);
      column = getRandomNumber(0, 9 - length + 1);
    }

    for (let i = 0; i < length; i++) {
      if (alignment === "vertical") {
        coordinates.push({ row: row + i, column });
      } else {
        coordinates.push({ row, column: column + i });
      }
    }

    return coordinates;
  }

  function generateRandomShips() {
    const ships = [
      { length: 2, alignment: "horizontal" },
      { length: 3, alignment: "vertical" },
      { length: 4, alignment: "horizontal" },
      { length: 5, alignment: "vertical" },
    ];

    const shipData = []; // Array to hold ship data

    for (const ship of ships) {
      let coordinates;
      let isValidPlacement = false;

      while (!isValidPlacement) {
        coordinates = generateRandomShipCoordinates(
          ship.length,
          ship.alignment
        );

        // Check if the generated coordinates overlap with any existing ship coordinates
        isValidPlacement = shipData.every((existingShip) => {
          return coordinates.every(
            (coordinate) =>
              !existingShip.some(
                (existingCoordinate) =>
                  existingCoordinate.row === coordinate.row &&
                  existingCoordinate.column === coordinate.column
              )
          );
        });
      }

      // Add the generated coordinates to the shipData array
      shipData.push([
        ship.length,
        coordinates[0].row,
        coordinates[0].column,
        ship.alignment,
      ]);
    }

    return shipData;
  }

  // Call the function to generate 4 random ships with different lengths and alignments
  const randomShips = generateRandomShips();
  console.log(randomShips); // The object containing the ship data

  return randomShips;
}
