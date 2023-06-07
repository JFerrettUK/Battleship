export default function aiAttack(row, column) {
  // Retrieve the square element using row and column
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
