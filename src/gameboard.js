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

  let placeShip = function (length, row, column) {
    for (let i = column; i < length + column; i++) {
      thisBoard[row][i] = `ship${length}`;
    }
    //ship.length is how long it will be
    // code to place ship at x,y
    console.log(thisBoard);
  };

  let receiveAttack = function (x, y) {
    // code to receive attack at x,y
  };

  let allSunk = function () {
    // code to check if all ships are sunk
  };

  return { board: thisBoard, placeShip, receiveAttack, allSunk };
}
