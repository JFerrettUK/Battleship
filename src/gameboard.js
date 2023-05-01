import ship from "./ship";

export default function gameboard(length) {
  let thisBoard = [];

  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let i = 0; i < 10; i++) {
      row.push(null);
    }
    thisBoard.push(row);
  }

  let ships = {};

  let addShip = function (length) {
    ships[`ship${length}`] = ship(length);
  };

  let placeShip = function (length, row, column, align) {
    addShip(length);
    if (align == "vertical") {
      for (let i = column; i < length + column; i++) {
        thisBoard[row][i] = `ship${length}`;
      }
    } else {
      for (let i = row; i < length + row; i++) {
        thisBoard[i][column] = `ship${length}`;
      }
    }
  };

  let startsWithShip = function (str) {
    let firstFourLetters = str.substring(0, 4);
    return firstFourLetters === "ship";
  };

  let receiveAttack = function (row, column) {
    if (thisBoard[row][column] == null) {
      thisBoard[row][column] = "attacked";
    }
    if (startsWithShip(thisBoard[row][column])) {
      thisBoard[row][column] = "hitShip";
    }
  };

  let allSunk = function () {
    // code to check if all ships are sunk
  };

  return { board: thisBoard, ships, placeShip, receiveAttack, allSunk };
}
