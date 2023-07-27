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

test("place ship in dom with vertical length 2 at (5, 5)", () => {
  // Clear the board before the test
  editAIBoardDOM("aiBoard");

  // Place a vertical ship of length 2 at coordinates (5, 5)
  expect(placeAIShipDOM(2, 5, 5, "vertical")).toBeUndefined();

  // Check if the ship squares have the correct class after placement
  expect(
    document.getElementById("5-5-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);
  expect(
    document.getElementById("6-5-aiBoard").classList.contains("aiShipSquare")
  ).toBe(true);

  // Check if there are no other occupied squares
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i !== 5 && (i !== 6 || j !== 5)) {
        expect(
          document
            .getElementById(i + "-" + j + "-aiBoard")
            .classList.contains("aiShipSquare")
        ).toBe(false);
      }
    }
  }
});
