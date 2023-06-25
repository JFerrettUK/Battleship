import announceWinnerDOM from "./announceWinnerDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

test("toggle class 'turnOn' on announceCont element", () => {
  // Simulate the initial state of the DOM
  const announceCont = document.createElement("div");
  announceCont.classList.add("announceCont");
  document.body.appendChild(announceCont);

  // Call the function to toggle the class
  announceWinnerDOM("user");

  // Expect the class 'turnOn' to be added to the announceCont element
  expect(announceCont.classList.contains("turnOn")).toBe(true);

  // Call the function again to toggle the class
  announceWinnerDOM("user");

  // Expect the class 'turnOn' to be removed from the announceCont element
  expect(announceCont.classList.contains("turnOn")).toBe(false);
});

test("toggle class 'turnOn' on selects a winner", () => {
  // Create a container element for announcement
  const announceCont = document.createElement("div");
  announceCont.classList.add("announceCont");
  document.body.appendChild(announceCont);

  // Call announceWinnerDOM with user winning
  announceWinnerDOM("user");

  // Expect the class 'turnOn' to be added to the announceCont element
  expect(announceCont.classList.contains("turnOn")).toBe(true);

  // Expect the inner text of announceCont to be "You lose! Congratulations. Click below to play again."
  expect(announceCont.innerText).toContain(
    "You lose! Congratulations. Click below to play again."
  );

  // Call announceWinnerDOM with AI winning
  announceWinnerDOM("ai");

  // Expect the class 'turnOn' to be added to the announceCont element
  expect(announceCont.classList.contains("turnOn")).toBe(true);

  // Expect the inner text of announceCont to be "You lose! Better luck next time..."
  expect(announceCont.innerText).toContain(
    "You lose! Better luck next time..."
  );
});
