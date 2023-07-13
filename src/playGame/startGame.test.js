import startGame from "./startGame";

jest.mock("./dragAndDrop", () => {
  const mockDragAndDrop = jest.fn((onShipsPlaced) => {
    // Simulate ships placed
    onShipsPlaced([
      /* occupied squares */
    ]);
  });

  return mockDragAndDrop;
});

jest.mock("../dom/flipShips", () => {
  const mockFlipShips = jest.fn();
  return mockFlipShips;
});

describe("startGame", () => {
  let getElementByIdMock;
  let aiTitleMock;
  let aiBoardMock;
  let boardContainersMock;
  let boardContainersElementMock;
  let boardCont1ElementMock;
  let flipShipsElementMock;

  beforeEach(() => {
    // Create mocks for DOM elements and their styles
    aiTitleMock = {
      style: {
        display: "",
      },
    };
    aiBoardMock = {
      style: {
        display: "",
      },
    };
    boardContainersMock = {
      style: {
        flexDirection: "",
      },
    };
    boardContainersElementMock = {
      style: {
        display: "",
        justifyContent: "",
        gridTemplateColumns: "",
        top: "",
        minWidth: "",
      },
    };
    boardCont1ElementMock = {
      style: {
        position: "",
        marginTop: "",
      },
    };
    flipShipsElementMock = {
      style: {
        display: "",
      },
    };

    // Mock getElementById to return the corresponding mocks
    getElementByIdMock = jest.fn((id) => {
      switch (id) {
        case "aiTitle":
          return aiTitleMock;
        case "aiBoard":
          return aiBoardMock;
        case "boardContainers":
          return boardContainersMock;
        case "boardContainersElement":
          return boardContainersElementMock;
        case "boardCont1Element":
          return boardCont1ElementMock;
        case "flipShipsElement":
          return flipShipsElementMock;
        default:
          return null;
      }
    });
  });

  test('resetBoardContainers should set the flex direction of boardContainers to "column"', () => {
    // Arrange
    boardContainersMock.style.flexDirection = "row";

    // Act
    startGame();
    const resetBoardContainers = require("./startGame").resetBoardContainers;
    resetBoardContainers();

    // Assert
    expect(aiTitleMock.style.display).toBe("flex");
    expect(aiBoardMock.style.display).toBe("grid");
    expect(boardContainersElementMock.style.display).toBe("grid");
    expect(boardContainersElementMock.style.justifyContent).toBe("center");
    expect(boardContainersElementMock.style.gridTemplateColumns).toBe(
      "1fr 1fr"
    );
    expect(boardContainersElementMock.style.top).toBe("52px");
    expect(boardContainersElementMock.style.minWidth).toBe("800px");
    expect(boardCont1ElementMock.style.position).toBe("");
    expect(boardCont1ElementMock.style.marginTop).toBe("");
    expect(flipShipsElementMock.style.display).toBe("none");
    expect(boardContainersMock.style.flexDirection).toBe("column");
  });

  test("startGame should call dragAndDrop with the correct callback function", () => {
    // Act
    startGame();

    // Assert
    const dragAndDropMock = require("./dragAndDrop").default;
    expect(dragAndDropMock).toHaveBeenCalledTimes(1);
    expect(dragAndDropMock.mock.calls[0][0]).toBeInstanceOf(Function);
  });

  test("dragAndDrop callback should call resetBoardContainers when occupied squares length is 4", () => {
    // Arrange
    const onShipsPlacedMock = jest.fn();
    const occupiedSquaresMock = [
      /* occupied squares */
    ];

    // Act
    startGame();
    const callback = require("./dragAndDrop").default.mock.calls[0][0];
    callback(occupiedSquaresMock);

    // Assert
    expect(onShipsPlacedMock).toHaveBeenCalledWith(occupiedSquaresMock);
    const resetBoardContainers = require("./startGame").resetBoardContainers;
    expect(resetBoardContainers).toHaveBeenCalled();
  });

  // Mock getElementById to use the custom mock implementation
  beforeEach(() => {
    document.getElementById = getElementByIdMock;
  });
});
