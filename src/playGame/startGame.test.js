import { JSDOM } from "jsdom";
import path from "path";
import startGame, { hideElements, adjustStyles } from "./startGame";

test("startGame function should execute without errors", async () => {
  // Resolve the path to the HTML file
  const htmlFilePath = path.resolve(__dirname, "../../dist/index.html");

  // Create the JSDOM instance from the HTML file
  const dom = await JSDOM.fromFile(htmlFilePath);
  global.document = dom.window.document;

  // Execute the startGame function
  expect(() => {
    startGame();
  }).not.toThrow();
});

test("hideElements should set styles to 'none'", () => {
  // Create a virtual DOM using JSDOM
  const dom = new JSDOM("<html><body></body></html>");
  global.document = dom.window.document;

  // Add the necessary elements to the DOM
  const aiTitle = document.createElement("div");
  aiTitle.id = "aiTitle";
  document.body.appendChild(aiTitle);

  const aiBoard = document.createElement("div");
  aiBoard.id = "aiBoard";
  document.body.appendChild(aiBoard);

  // Call the hideElements function
  hideElements();

  // Verify that the styles are set correctly
  expect(aiTitle.style.display).toBe("none");
  expect(aiBoard.style.display).toBe("none");
});

test("adjustStyles should set flex-direction to 'row'", () => {
  // Create a virtual DOM using JSDOM
  const dom = new JSDOM("<html><body></body></html>");
  global.document = dom.window.document;

  // Add the necessary elements to the DOM
  const boardContainers = document.createElement("div");
  boardContainers.id = "boardContainers";
  document.body.appendChild(boardContainers);

  // Call the adjustStyles function
  adjustStyles();

  // Verify that the styles are set correctly
  expect(boardContainers.style.flexDirection).toBe("row");
});
