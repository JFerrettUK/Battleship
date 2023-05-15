import editPlayerBoard from "./editPlayerBoard";
import squareHitMissed from "./squareHitMissed";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("check that a missed square has the class 'missed'", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
  editPlayerBoard("userBoard");
  let zeroZero = document.getElementById("0-0-userBoard");
  expect(zeroZero.classList.contains("missed")).toBe(false);
  zeroZero = squareHitMissed(zeroZero, "missed");
  expect(zeroZero.classList.contains("missed")).toBe(true);
});

test("check that a hitShip square has the class 'hitShip'", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
  editPlayerBoard("userBoard");
  let zeroZero = document.getElementById("0-0-userBoard");
  expect(zeroZero.classList.contains("hitShip")).toBe(false);
  zeroZero = squareHitMissed(zeroZero, "hitShip");
  expect(zeroZero.classList.contains("hitShip")).toBe(true);
});
