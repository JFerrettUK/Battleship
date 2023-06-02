import path from "path";
import { JSDOM } from "jsdom";
import finalGameDOMLoop from "./finalGameDOMLoop";
import gameLoop from "../game/gameLoop";
import domFuncs from "../dom/domFuncs";

let dom;
beforeAll(async () => {
  const filePath = path.resolve(__dirname, "../../dist/index.html");
  dom = await JSDOM.fromFile(filePath);
  global.document = dom.window.document;
});

jest.mock("../dom/domFuncs");
test("should correctly set up the game DOM", () => {
  const mockDomFunctions = {
    playerBoardDOM: jest.fn(),
    aiBoardDOM: jest.fn(),
    userClickDOM: jest.fn(),
    placeTempDOMShips: jest.fn(),
  };
  domFuncs.mockReturnValue(mockDomFunctions);

  finalGameDOMLoop();

  expect(domFuncs).toHaveBeenCalledTimes(1);
  expect(domFuncs).toHaveBeenCalledWith();

  expect(mockDomFunctions.playerBoardDOM).toHaveBeenCalledTimes(1);
  expect(mockDomFunctions.playerBoardDOM).toHaveBeenCalledWith("userBoard");

  expect(mockDomFunctions.aiBoardDOM).toHaveBeenCalledTimes(1);
  expect(mockDomFunctions.aiBoardDOM).toHaveBeenCalledWith("aiBoard");

  expect(mockDomFunctions.userClickDOM).toHaveBeenCalledTimes(1);
  expect(mockDomFunctions.placeTempDOMShips).toHaveBeenCalledTimes(1);
});

test("test that placeTempShips and placeTempDOMShips do the same thing", () => {
  const game = gameLoop("playerName");
  const placeTempShipsSpy = jest.spyOn(game, "placeTempShips");
  const placeAIShipSpy = jest.spyOn(game, "placeAIShip");
  const placeUserShipSpy = jest.spyOn(game, "placeUserShip");

  finalGameDOMLoop();

  expect(placeTempShipsSpy).toHaveBeenCalledTimes(1);

  const placeAIShipArgs = placeAIShipSpy.mock.calls;
  const placeUserShipArgs = placeUserShipSpy.mock.calls;

  const mockDomFunctions = domFuncs();
  const placeTempDOMShipsArgs = [
    [2, 2, 1, "vertical"],
    [3, 4, 4, "horizontal"],
    [4, 6, 1, "horizontal"],
    [5, 4, 5, "vertical"],
    [2, 2, 1, "vertical"],
    [3, 4, 4, "horizontal"],
    [4, 6, 1, "horizontal"],
    [5, 4, 5, "vertical"],
  ];

  expect(placeAIShipArgs).toEqual(placeTempDOMShipsArgs.slice(0, 4));
  expect(placeUserShipArgs).toEqual(placeTempDOMShipsArgs.slice(4));
});
