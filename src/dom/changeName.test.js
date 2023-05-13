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

test("Assign the user/AI board titles", () => {
  editBoard("userBoard");
  let userTitle = document.getElementById("userTitle");
  userTitle = changeName("John", userTitle);
  let aiTitle = document.getElementById("aiTitle");
  aiTitle = changeName("Hal", aiTitle);
  expect(userTitle.innerText).toBe("John");
  expect(aiTitle.innerText).toBe("Hal");
});
