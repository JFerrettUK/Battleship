import editBoard from "./editBoard";
import squareHitMissed from "./squareHitMissed";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("check that a new ship has been placed in the dom", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
  editBoard("userBoard");
});
