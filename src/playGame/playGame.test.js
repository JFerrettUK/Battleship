import path from "path";
import { JSDOM } from "jsdom";
import playGame from "./playGame";
import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

jest.mock("../dom/domFuncs");

describe("playGame", () => {
  let mockDomFunctions;

  beforeEach(() => {
    mockDomFunctions = {
      playerBoardDOM: jest.fn(),
      aiBoardDOM: jest.fn(),
      userClickDOM: jest.fn(),
      placeTempDOMShips: jest.fn(),
    };
    domFuncs.mockReturnValue(mockDomFunctions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should set up the game DOM correctly", () => {
    playGame();

    expect(domFuncs).toHaveBeenCalledTimes(1);
    expect(domFuncs).toHaveBeenCalledWith();

    expect(mockDomFunctions.playerBoardDOM).toHaveBeenCalledTimes(1);
    expect(mockDomFunctions.playerBoardDOM).toHaveBeenCalledWith("userBoard");

    expect(mockDomFunctions.aiBoardDOM).toHaveBeenCalledTimes(1);
    expect(mockDomFunctions.aiBoardDOM).toHaveBeenCalledWith("aiBoard");

    expect(mockDomFunctions.userClickDOM).toHaveBeenCalledTimes(1);
    expect(mockDomFunctions.placeTempDOMShips).toHaveBeenCalledTimes(1);
  });
});

test("gameLoop user and ai players should work with the manageTurn func", async () => {
  let thisGame = await playGame();

  expect(thisGame.user.isTurn).toBe(true);
  expect(thisGame.ai.isTurn).toBe(false);
  expect(thisGame.turns.whoseTurn(thisGame.user, thisGame.ai)).toBe(
    "playerTurn"
  );
  thisGame.turns.switchTurns(thisGame.user, thisGame.ai);
  expect(thisGame.ai.isTurn).toBe(true);
  expect(thisGame.user.isTurn).toBe(false);
  expect(thisGame.turns.whoseTurn(thisGame.user, thisGame.ai)).toBe("aiTurn");
  thisGame.turns.switchTurns(thisGame.user, thisGame.ai);
  expect(thisGame.turns.getNo()).toBe(2);
});
