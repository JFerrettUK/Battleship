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
  let listAttacked = [];
  let listHit = [];

  let addShip = function (length) {
    ships[`ship${length}`] = ship(length);
  };

  let changeBoard = function (row, column, newText) {
    thisBoard[row][column] = newText;
  };

  let placeShip = function (length, row, column, align) {
    addShip(length);
    if (row > 9 || column > 9) {
      return "offBoard";
    }

    if (align == "vertical") {
      //check if these squares are already occupied or off board
      for (let i = column; i < length + column; i++) {
        if (i > 9) {
          return "offBoard";
        }
        if (thisBoard[row][i] !== null) {
          return "occupiedSquare";
        }
      }
      //change the board if not
      for (let i = column; i < length + column; i++) {
        changeBoard(row, i, `ship${length}`);
      }
    } else {
      //check if these squares are already occupied or off board
      for (let i = row; i < length + row; i++) {
        if (i > 9) {
          return "offBoard";
        }
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

  let saveAttacked = function (missedRow, missedColumn) {
    listAttacked.push([missedRow, missedColumn]);
  };

  let saveHit = function (missedRow, missedColumn) {
    listHit.push([missedRow, missedColumn]);
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

  let isAttacked = function (row, column) {
    if (
      listAttacked.some(function (element) {
        return element[0] === row && element[1] === column;
      })
    ) {
      return true;
    }
    return false;
  };

  let isHit = function (row, column) {
    if (
      listHit.some(function (element) {
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
      saveAttacked(row, column);
    } else if (thisBoard[row][column] == "missed") {
      return "hitBefore";
    } else if (thisBoard[row][column] == "hitShip") {
      return "hitBefore";
    } else {
      let shipNo = thisBoard[row][column].toString();
      hitShip(shipNo);
      changeBoard(row, column, "hitShip");
      saveHit(row, column);
      saveAttacked(row, column);
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
    return [false, []];
  };

  let anyAttacks = function () {
    for (let i = 0; i < 10; i++) {
      for (let n = 0; n < 10; n++) {
        if (thisBoard[i][n] === "missed" || thisBoard[i][n] === "hitShip") {
          return [true, [i, n]];
        }
      }
    }
    return [false, []];
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

  let receiveAIAttack = function (row, column) {
    if (listMissed.length >= 99) {
      return ["board full", [row, column]];
    }

    if (thisBoard[row][column] == null) {
      changeBoard(row, column, "missed");
      saveMissed(row, column);
      saveAttacked(row, column);
    } else if (thisBoard[row][column] == "missed") {
      return "missed";
    } else if (thisBoard[row][column] == "hitShip") {
      return "hitBefore";
    } else {
      let shipNo = thisBoard[row][column].toString();
      hitShip(shipNo);
      changeBoard(row, column, "hitShip");
      saveAttacked(row, column);
      saveHit(row, column);
    }
  };

  let receiveRandomAIAttack = function () {
    if (listMissed.length >= 99) {
      return ["board full", [row, column]];
    }

    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    if (
      thisBoard[row][column] == "missed" ||
      thisBoard[row][column] == "hitShip"
    ) {
      return receiveRandomAIAttack();
    }

    if (thisBoard[row][column] == null) {
      changeBoard(row, column, "missed");
      saveMissed(row, column);
      saveAttacked(row, column);
    } else {
      let shipNo = thisBoard[row][column].toString();
      hitShip(shipNo);
      changeBoard(row, column, "hitShip");
      saveAttacked(row, column);
    }

    return ["hitBefore", [row, column]];
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

  let generatePotentialTargets = function () {
    const potentialTargets = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (!this.isAttacked(row, col)) {
          potentialTargets.push([row, col]);
        }
      }
    }

    return potentialTargets;
  };

  return {
    board: thisBoard,
    ships,
    listMissed,
    isMissed,
    placeShip,
    receiveAttack,
    receiveAIAttack,
    receiveRandomAIAttack,
    allSunk,
    anyMissed,
    anyAttacks,
    missedInARow,
    saveAttacked,
    isHit,
    isAttacked,
    listAttacked,
    generatePotentialTargets,
    listHit,
  };
}
