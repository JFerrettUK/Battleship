import gameController from "./gameController.js";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("gameController makes players and shows their names in the DOM", () => {
  // gameController.makePlayers("James, Hal");
  // expect(testGame.turns.getNo()).toBe(2);
});
