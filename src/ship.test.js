import ship from "./ship";

test("testShip has correct length", () => {
  let testShip = ship(3);
  expect(testShip.length).toBe(3);
});

test("testShip hit method increases hits", () => {
  let testShip = ship(3);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test("hit testShip two times and it should live", () => {
  let testShip = ship(3);
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(false);
});

test("hit testShip three times to sink", () => {
  let testShip = ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
