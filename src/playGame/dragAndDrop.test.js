import dragAndDrop from "./dragAndDrop";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

// Helper function to create a custom event
function createCustomEvent(eventName, options = {}) {
  const event = document.createEvent("CustomEvent");
  event.initCustomEvent(
    eventName,
    options.bubbles,
    options.cancelable,
    options.detail
  );
  return event;
}

test("drag and drop image onto target square", () => {
  // Create necessary DOM elements for testing
  const shipPiece = document.createElement("img");
  shipPiece.classList.add("shipPiece");
  shipPiece.setAttribute("draggable", true);

  const targetSquare = document.createElement("div");
  targetSquare.classList.add("userSquare");

  // Append elements to the document
  document.body.appendChild(shipPiece);
  document.body.appendChild(targetSquare);

  // Call the dragAndDrop function to set up event listeners
  dragAndDrop();

  // Mock the necessary methods and properties of dataTransfer
  const dataTransferMock = {
    setData: jest.fn(),
  };

  const dragStartEvent = createCustomEvent("dragstart", {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(dragStartEvent, "dataTransfer", {
    value: dataTransferMock,
  });
  const dragEndEvent = createCustomEvent("dragend", {
    bubbles: true,
    cancelable: true,
  });
  const dragOverEvent = createCustomEvent("dragover", {
    bubbles: true,
    cancelable: true,
  });
  const dropEvent = createCustomEvent("drop", {
    bubbles: true,
    cancelable: true,
  });

  shipPiece.dispatchEvent(dragStartEvent);
  targetSquare.dispatchEvent(dragOverEvent);
  targetSquare.dispatchEvent(dropEvent);
  shipPiece.dispatchEvent(dragEndEvent);

  // Assert expected outcome
});
