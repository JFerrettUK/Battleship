import placePlayerShipDOM from "./placePlayerShipDOM";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("place ship in dom with vertical length", () => {
  editPlayerBoardDOM("userBoard");

  placePlayerShipDOM(3, 1, 2, "vertical"); // Adjusted row and column values

  expect(
    document.getElementById("1-2-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-2-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("3-2-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerShipDOM(4, 6, 5, "vertical"); // Adjusted row and column values

  expect(
    document.getElementById("6-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("7-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("8-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("9-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);
});

test("place ship in dom with horizontal length", () => {
  editPlayerBoardDOM("userBoard");

  placePlayerShipDOM(3, 1, 3, "horizontal"); // Adjusted row and column values

  expect(
    document.getElementById("1-3-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("1-4-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("1-5-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerShipDOM(4, 6, 6, "horizontal"); // Adjusted row and column values

  expect(
    document.getElementById("6-6-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("6-7-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("6-8-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("6-9-userBoard").classList.contains("shipSquare")
  ).toBe(true);
});

test("If a ship is placed in a spot that extends off the board, return offBoard", () => {
  editPlayerBoardDOM("userBoard");

  expect(placePlayerShipDOM(7, 1, 11, "horizontal")).toBe("offBoard"); // Adjusted row and column values
});
