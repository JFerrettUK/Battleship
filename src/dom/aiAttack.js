export default function aiAttack(row, column) {
  let square = document.getElementById(`${row}-${column}-userBoard`);

  if (square) {
    if (square.classList.contains("shipSquare")) {
      square.classList.add("hitShip");
    } else {
      square.classList.add("missed");
    }
    square.classList.add("flash");
    setTimeout(() => {
      square.classList.remove("flash");
    }, 500);
  }
}
