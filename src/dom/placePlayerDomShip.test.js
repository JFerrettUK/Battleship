import placePlayerDomShip from "./placePlayerDomShip";
import editPlayerBoard from "./editPlayerBoard";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("no ships at start of test", () => {
  editPlayerBoard("userBoard");

  expect(
    document.getElementById("5-8-userBoard").classList.contains("shipSquare")
  ).toBe(false);
  expect(
    document.getElementById("2-1-userBoard").classList.contains("shipSquare")
  ).toBe(false);
});

test("place ship  in dom with vertical length", () => {
  editPlayerBoard("userBoard");

  placePlayerDomShip(3, 2, 1, "vertical");
  expect(
    document.getElementById("2-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-2-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-3-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerDomShip(4, 5, 6, "vertical");

  expect(
    document.getElementById("5-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-7-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-8-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-9-userBoard").classList.contains("shipSquare")
  ).toBe(true);
});

test("place ship in dom with horizontal length", () => {
  editPlayerBoard("userBoard");

  placePlayerDomShip(3, 3, 1, "horizontal");

  expect(
    document.getElementById("3-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("4-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerDomShip(4, 6, 6, "horizontal");

  expect(
    document.getElementById("6-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("7-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("8-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("9-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
});

test("If a ship is placed in a spot that extend off the board, return offBoard", () => {
  editPlayerBoard("userBoard");

  expect(placePlayerDomShip(7, 11, 1, "horizontal")).toBe("offBoard");
});
