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
      //check if these squares are already occupied
      for (let i = column; i < length + column; i++) {
        if (thisBoard[row][i] !== null) {
          return "occupiedSquare";
        }
      }
      //change the board if not
      for (let i = column; i < length + column; i++) {
        changeBoard(row, i, `ship${length}`);
      }
    } else {
      //check if these squares are already occupied
      for (let i = row; i < length + row; i++) {
        if (thisBoard[i][column] !== null) {
          return "occupiedSquare";
        }
      }
      //change the board if not
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

  let isMissed = function (row, column) {
    if (
      listMissed.some(function (element) {
        return element[0] === row && element[1] === column;
      })
    ) {
      return true;
    }
    return false;
  };

  let receiveAttack = function (row, column) {
    if (thisBoard[row][column] == null) {
      changeBoard(row, column, "missed");
      saveMissed(row, column);
    } else if (thisBoard[row][column] == "missed") {
      return "hitBefore";
    } else if (thisBoard[row][column] == "hitShip") {
      return "hitBefore";
    } else {
      let shipNo = thisBoard[row][column].toString();
      hitShip(shipNo);
      changeBoard(row, column, "hitShip");
    }
  };

  let anyMissed = function () {
    for (let i = 0; i < 10; i++) {
      for (let n = 0; n < 10; n++) {
        if (thisBoard[i][n] === "missed") {
          return [true, [i, n]];
        }
      }
    }
    return false;
  };

  let missedInARow = function (row) {
    for (let row = 0; row < 10; row++) {
      for (let n = 0; n < 10; n++) {
        if (thisBoard[i][n] === "missed") {
          return [true, [i, n]];
        }
      }
    }
    return false;
  };

  let receiveAIAttack = function () {
    if (listMissed.length == 99) {
      return "board full";
    }

    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    if (
      thisBoard[row][column] == "missed" ||
      thisBoard[row][column] == "hitShip"
    ) {
      receiveAIAttack();
      return "hitBefore";
    }

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
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  return {
    board: thisBoard,
    ships,
    listMissed,
    isMissed,
    placeShip,
    receiveAttack,
    receiveAIAttack,
    allSunk,
    anyMissed,
    missedInARow,
  };
}
