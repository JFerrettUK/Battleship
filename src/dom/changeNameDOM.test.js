import path from "path";
import { JSDOM } from "jsdom";
import editPlayerBoardDOM from "./editPlayerBoardDOM";
import changeNameDOM from "./changeNameDOM";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("Assign the user/AI board titles", () => {
  editPlayerBoardDOM("userBoard");
  let userTitle = document.getElementById("userTitle");
  userTitle = changeNameDOM("John", userTitle);
  let aiTitle = document.getElementById("aiTitle");
  aiTitle = changeNameDOM("Hal", aiTitle);
  expect(userTitle.innerText).toBe("John");
  expect(aiTitle.innerText).toBe("Hal");
});
