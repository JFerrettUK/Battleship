import announceWinnerDOM from "./announceWinnerDOM";
import path from "path";
import { JSDOM } from "jsdom";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

describe("announceWinnerDOM", () => {
  let announceContMock;
  let announceTextMock;
  let buttonContainerMock;
  let buttonMock;

  beforeEach(() => {
    announceTextMock = { textContent: "" };
    buttonMock = {
      style: {},
      classList: { add: jest.fn() },
      addEventListener: jest.fn(),
    };
    buttonContainerMock = {
      style: {},
      querySelector: jest.fn(() => buttonMock),
    };
    announceContMock = {
      style: {},
      querySelector: jest.fn((selector) => {
        if (selector === "#announceText") {
          return announceTextMock;
        }
        if (selector === ".buttonContainer") {
          return buttonContainerMock;
        }
      }),
    };
    document.getElementsByClassName = jest.fn(() => [announceContMock]);
  });

  test("displays 'You win!' message when whowon is 'user'", () => {
    announceWinnerDOM("user");

    expect(announceTextMock.textContent).toBe(
      "You win! Congratulations. Click below to play again."
    );
    expect(announceContMock.style.display).toBe("grid");
    expect(buttonContainerMock.style.display).toBe("flex");
    expect(buttonMock.style.display).toBe("inline-block");
    expect(buttonMock.classList.add).toHaveBeenCalledWith("playButton");
    expect(buttonMock.addEventListener).toHaveBeenCalled();
  });

  test("displays 'You lose!' message when whowon is 'ai'", () => {
    announceWinnerDOM("ai");

    expect(announceTextMock.textContent).toBe(
      "You lose! Better luck next time..."
    );
    expect(announceContMock.style.display).toBe("grid");
    expect(buttonContainerMock.style.display).toBe("flex");
    expect(buttonMock.style.display).toBe("inline-block");
    expect(buttonMock.classList.add).toHaveBeenCalledWith("playButton");
    expect(buttonMock.addEventListener).toHaveBeenCalled();
  });

  test("No", () => {
    announceWinnerDOM("ai");

    expect(announceTextMock.textContent).toBe(
      "You lose! Better luck next time..."
    );
    expect(announceContMock.style.display).toBe("grid");
    expect(buttonContainerMock.style.display).toBe("flex");
    expect(buttonMock.style.display).toBe("inline-block");
    expect(buttonMock.classList.add).toHaveBeenCalledWith("playButton");
    expect(buttonMock.addEventListener).toHaveBeenCalled();
    expect(document.querySelector("#boardContainers").innerHTML).toBe("");
  });
});
