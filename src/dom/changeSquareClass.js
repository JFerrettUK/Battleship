export default function changeSquareClass(row, column) {
  let shipSquare = document.getElementById(row + "-" + column + "-userBoard");
  shipSquare.classList.remove("blue");
  shipSquare.classList.remove("cyan");
  shipSquare.classList.add("shipSquare");
}
