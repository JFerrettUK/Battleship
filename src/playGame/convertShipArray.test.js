import convertShipArray from "./convertShipArray";

describe("convertShipArray", () => {
  test("should convert array format correctly", () => {
    // Input array
    const originalArray = [
      {
        size: 2,
        orientation: "horizontal",
        occupiedSquares: [
          { row: 2, column: 2 },
          { row: 2, column: 3 },
        ],
      },
      {
        size: 3,
        orientation: "horizontal",
        occupiedSquares: [
          { row: 4, column: 3 },
          { row: 4, column: 4 },
          { row: 4, column: 5 },
        ],
      },
      {
        size: 4,
        orientation: "vertical",
        occupiedSquares: [
          { row: 6, column: 1 },
          { row: 7, column: 1 },
          { row: 8, column: 1 },
          { row: 9, column: 1 },
        ],
      },
      {
        size: 5,
        orientation: "vertical",
        occupiedSquares: [
          { row: 4, column: 5 },
          { row: 5, column: 5 },
          { row: 6, column: 5 },
          { row: 7, column: 5 },
          { row: 8, column: 5 },
        ],
      },
    ];

    // Expected output
    const expectedArray = [
      [2, 2, 2, "horizontal"],
      [3, 4, 3, "horizontal"],
      [4, 6, 1, "vertical"],
      [5, 4, 5, "vertical"],
    ];

    // Call the function
    const convertedArray = convertShipArray(originalArray);

    // Assert the result
    expect(convertedArray).toEqual(expectedArray);
  });
});
