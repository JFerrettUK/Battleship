import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});
