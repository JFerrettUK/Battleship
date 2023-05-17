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

test("place ship  in dom with vertical length", () => {
  editPlayerBoard("userBoard");
  squareList = document.querySelectorAll(".battleSquare");

  expect(squareList[2][1].classList.contains("shipSquare")).toBe(false);
  expect(squareList[5][8].classList.contains("shipSquare")).toBe(false);

  placePlayerDomShip(3, 2, 1, "vertical");
  squareList = document.querySelectorAll(".battleSquare");
  expect(squareList[2][1].classList.contains("shipSquare")).toBe(true);
  expect(squareList[2][2].classList.contains("shipSquare")).toBe(true);
  expect(squareList[2][3].classList.contains("shipSquare")).toBe(true);

  placePlayerDomShip(4, 5, 6, "vertical");
  squareList = document.querySelectorAll(".battleSquare");
  expect(squareList[5][6].classList.contains("shipSquare")).toBe(true);
  expect(squareList[5][7].classList.contains("shipSquare")).toBe(true);
  expect(squareList[5][8].classList.contains("shipSquare")).toBe(true);
  expect(squareList[5][9].classList.contains("shipSquare")).toBe(true);
});

test("place ship in dom with horizontal length", () => {
  placePlayerDomShip(3, 2, 1, "horizontal");
  expect(squareList[2][1].classList.contains("shipSquare")).toBe(true);
  expect(squareList[3][1].classList.contains("shipSquare")).toBe(true);
  expect(squareList[4][1].classList.contains("shipSquare")).toBe(true);

  placePlayerDomShip(4, 5, 6, "horizontal");
  expect(squareList[5][6].classList.contains("shipSquare")).toBe(true);
  expect(squareList[6][6].classList.contains("shipSquare")).toBe(true);
  expect(squareList[7][6].classList.contains("shipSquare")).toBe(true);
  expect(squareList[8][6].classList.contains("shipSquare")).toBe(true);
});
