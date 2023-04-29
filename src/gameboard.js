export default function gameboard(length) {
  let newGameboard = function (length) {
    let board = [];

    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  };

  return newGameboard();
}
