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

test("no ships at start of test", () => {
  editPlayerBoardDOM("userBoard");

  expect(
    document.getElementById("5-8-userBoard").classList.contains("shipSquare")
  ).toBe(false);
  expect(
    document.getElementById("2-1-userBoard").classList.contains("shipSquare")
  ).toBe(false);
});

test("place ship  in dom with vertical length", () => {
  editPlayerBoardDOM("userBoard");

  placePlayerShipDOM(3, 2, 1, "vertical");
  expect(
    document.getElementById("2-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-2-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-3-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerShipDOM(4, 5, 6, "vertical");

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
  editPlayerBoardDOM("userBoard");

  placePlayerShipDOM(3, 3, 1, "horizontal");

  expect(
    document.getElementById("3-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("4-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-1-userBoard").classList.contains("shipSquare")
  ).toBe(true);

  placePlayerShipDOM(4, 6, 6, "horizontal");

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
  editPlayerBoardDOM("userBoard");

  expect(placePlayerShipDOM(7, 11, 1, "horizontal")).toBe("offBoard");
});
