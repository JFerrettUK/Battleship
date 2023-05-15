import path from "path";
import { JSDOM } from "jsdom";
import editPlayerBoard from "./editPlayerBoard";

// Declare a variable to hold the JSDOM instance
let dom;
// Use the beforeAll function to run setup code before all tests
beforeAll(async () => {
  // Resolve the file path of the index.html file in the /dist folder
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  // Load the contents of the index.html file using JSDOM.fromFile
  dom = await JSDOM.fromFile(filePath);
  // Set the global document object to the document object provided by JSDOM
  global.document = dom.window.document;
});

test("Check that there are one-hundred squares in the DOM", () => {
  editPlayerBoard("userBoard");
  const squareList = document.querySelectorAll(".battleSquare");
  expect(squareList.length).toBe(100);
});

test("Check that the initial class of the first square is blue, second cyan, last blue", () => {
  editPlayerBoard("userBoard");
  const squareList = document.querySelectorAll(".battleSquare");
  expect(squareList[0].classList.contains("blue")).toBe(true);
  expect(squareList[1].classList.contains("cyan")).toBe(true);
  expect(squareList[99].classList.contains("blue")).toBe(true);
});
