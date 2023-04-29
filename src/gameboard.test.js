import gameboard from "./gameboard";

test("testGameboard has the correct number of rows (10)", () => {
  let testGameboard = gameboard();
  expect(testGameboard.length).toBe(10);
});

test("testGameboard row arrays are all the correct length (10)", () => {
  let testGameboard = gameboard();
  for (let i = 0; i < 10; i++) {
    expect(testGameboard[i].length).toBe(10);
  }
});

// Gameboards should be able to place ships at specific
// coordinates by calling the ship factory function.

// Gameboards should have a receiveAttack function
// that takes a pair of coordinates, determines whether
// or not the attack hit a ship and then sends the ‘hit’
// function to the correct ship, or records the coordinates
// of the missed shot.

// Gameboards should keep track of missed attacks so they
// can display them properly.

// Gameboards should be able to report whether or not all
// of their ships have been sunk.
