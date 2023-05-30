export default function changeShipClass(row, column, board) {
  let shipSquare;

  if (board == "user") {
    shipSquare = document.getElementById(row + "-" + column + "-userBoard");
  } else {
    shipSquare = document.getElementById(row + "-" + column + "-aiBoard");
  }

  if (
    shipSquare.classList.contains("blue") ||
    shipSquare.classList.contains("cyan")
  ) {
    shipSquare.classList.remove("blue");
    shipSquare.classList.remove("cyan");
  }

  if (shipSquare.classList.contains("grey")) {
    shipSquare.classList.remove("grey");
  }

  if (board == "user") {
    shipSquare.classList.add("shipSquare");
  } else {
    shipSquare.classList.add("aiShipSquare");
  }
}
