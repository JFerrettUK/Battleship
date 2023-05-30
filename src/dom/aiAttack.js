export default function aiAttack(row, column) {
  let square = document.getElementById(`${row}-${column}-userBoard`);

  if (square) {
    square.classList.add("flash");
    setTimeout(() => {
      square.classList.remove("flash");
      setTimeout(() => {
        square.classList.add("hitSquare");
      }, 0);
    }, 500);
  }
}
