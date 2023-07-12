import flipShips from "./flipShips";
import jsdom from "jsdom-global";

jsdom();

test("flipShips toggles ship display correctly", () => {
  // Set up the HTML elements
  const flipShipsElement = document.createElement("div");
  flipShipsElement.id = "flipShips";
  const verShips = document.createElement("div");
  verShips.id = "verShips";
  verShips.style.display = "grid";
  const horShips = document.createElement("div");
  horShips.id = "horShips";
  horShips.style.display = "none";
  document.body.appendChild(flipShipsElement);
  document.body.appendChild(verShips);
  document.body.appendChild(horShips);

  // Call the function to add event listener
  flipShips();

  // Initial state: verShips is displayed, horShips is hidden
  expect(getComputedStyle(verShips).display).toBe("grid");
  expect(getComputedStyle(horShips).display).toBe("none");

  // Simulate a click on flipShips
  flipShipsElement.click();

  // After the click: verShips should be hidden, horShips should be displayed
  expect(getComputedStyle(verShips).display).toBe("none");
  expect(getComputedStyle(horShips).display).toBe("grid");

  // Simulate another click on flipShips
  flipShipsElement.click();

  // After the second click: verShips should be displayed, horShips should be hidden
  expect(getComputedStyle(verShips).display).toBe("grid");
  expect(getComputedStyle(horShips).display).toBe("none");
});
