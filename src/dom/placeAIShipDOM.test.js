import placeAIShipDOM from "./placeAIShipDOM";
import editAIBoardDOM from "./editAIBoardDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("no ships at start of test", () => {
  editAIBoardDOM("aiBoard");

  expect(
    document.getElementById("5-8-aiBoard").classList.contains("aiShipSquare")
  ).toBe(false);
  expect(
    document.getElementById("2-1-aiBoard").classList.contains("aiShipSquare")
  ).toBe(false);
});

test("place ship  in dom with vertical length", () => {
  editAIBoardDOM("aiBoard");

  placeAIShipDOM(3, 2, 1, "vertical");
  expect(
    document.getElementById("2-1-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-2-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("2-3-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);

  placeAIShipDOM(4, 5, 6, "vertical");

  expect(
    document.getElementById("5-6-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-7-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-8-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-9-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
});

test("place ship in dom with horizontal length", () => {
  editAIBoardDOM("aiBoard");

  placeAIShipDOM(3, 3, 1, "horizontal");

  expect(
    document.getElementById("3-1-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("4-1-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("5-1-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);

  placeAIShipDOM(4, 6, 6, "horizontal");

  expect(
    document.getElementById("6-6-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("7-6-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("8-6-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("9-6-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
});

test("If a ship is placed in a spot that extend off the board, return offBoard", () => {
  editAIBoardDOM("aiBoard");

  expect(placeAIShipDOM(7, 11, 1, "horizontal")).toBe("offBoard");
});
