import gameboard from "./gameboard";

test("testGameboard is correct size", () => {
  let testGameboard = gameboard();
  expect(testGameboard.size).toBe(100);
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
