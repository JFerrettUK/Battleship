import path from "path";
import { JSDOM } from "jsdom";
import editBoard from "./editBoard";
import changeName from "./changeName";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("Change the user board's title to their name.", () => {
  editBoard();
  const userTitle = document.querySelector(".userTitle");
  userTitle = changeName("John");
  expect(userTitle.innerText).toBe("John");
});
