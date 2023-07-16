import convertShipArray from "./convertShipArray";

describe("convertShipArray", () => {
  test("should convert array format correctly", () => {
    // Input array
    const originalArray = [
      {
        size: 2,
        orientation: "horizontal",
        occupiedSquares: [
          [2, 2],
          [2, 3],
        ],
      },
      {
        size: 3,
        orientation: "horizontal",
        occupiedSquares: [
          [4, 3],
          [4, 4],
          [4, 5],
        ],
      },
      {
        size: 4,
        orientation: "vertical",
        occupiedSquares: [
          [6, 1],
          [7, 1],
          [8, 1],
          [9, 1],
        ],
      },
      {
        size: 5,
        orientation: "vertical",
        occupiedSquares: [
          [4, 5],
          [5, 5],
          [6, 5],
          [7, 5],
          [8, 5],
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
