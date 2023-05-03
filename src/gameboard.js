import ship from "./ship";

export default function gameboard() {
  let thisBoard = [];

  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let i = 0; i < 10; i++) {
      row.push(null);
    }
    thisBoard.push(row);
  }

  let ships = {};
  let listMissed = [];

  let addShip = function (length) {
    ships[`ship${length}`] = ship(length);
  };

  let changeBoard = function (row, column, newText) {
    thisBoard[row][column] = newText;
  };

  let placeShip = function (length, row, column, align) {
    addShip(length);
    if (align == "vertical") {
      for (let i = column; i < length + column; i++) {
        changeBoard(row, i, `ship${length}`);
      }
    } else {
      for (let i = row; i < length + row; i++) {
        changeBoard(i, column, `ship${length}`);
      }
    }
  };

  let hitShip = function (shipNo) {
    ships[shipNo].hit();
  };

  let saveMissed = function (missedRow, missedColumn) {
    listMissed.push([missedRow, missedColumn]);
  };

  let receiveAttack = function (row, column) {
    if (thisBoard[row][column] == null) {
      changeBoard(row, column, "missed");
      saveMissed(row, column);
    } else {
      let shipNo = thisBoard[row][column].toString();
      hitShip(shipNo);
      changeBoard(row, column, "hitShip");
    }
  };

  let allSunk = function () {
    for (let ship in ships) {
      if (ships[ship].isSunk() == true) {
        ("One ship was suunk");
        continue;
      } else {
        ("One ship wasn't suunk");
        return false;
      }
    }
    return true;
  };

  return {
    board: thisBoard,
    ships,
    listMissed,
    placeShip,
    receiveAttack,
    allSunk,
  };
}
