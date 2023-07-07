import flipShips from "./flipShips";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  dom = await JSDOM.fromFile("./dist/index.html");
  global.document = dom.window.document;
});

test("flipShips toggles ship display correctly", () => {
  // Set up the HTML elements
  const flipShipsElement = document.createElement("div");
  flipShipsElement.id = "flipShips";
  const verShips = document.createElement("div");
  verShips.id = "verShips";
  const horShips = document.createElement("div");
  horShips.id = "horShips";
  document.body.appendChild(flipShipsElement);
  document.body.appendChild(verShips);
  document.body.appendChild(horShips);

  // Call the function to add event listener
  flipShips();

  // Initial state: verShips is displayed, horShips is hidden
  expect(verShips.classList.contains("hidden")).toBe(false);
  expect(horShips.classList.contains("hidden")).toBe(true);

  // Simulate a click on flipShips
  flipShipsElement.click();

  // After the click: verShips should be hidden, horShips should be displayed
  expect(verShips.classList.contains("hidden")).toBe(true);
  expect(horShips.classList.contains("hidden")).toBe(false);

  // Simulate another click on flipShips
  flipShipsElement.click();

  // After the second click: verShips should be displayed, horShips should be hidden
  expect(verShips.classList.contains("hidden")).toBe(false);
  expect(horShips.classList.contains("hidden")).toBe(true);
});
