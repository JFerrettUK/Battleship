export default function userClick() {
  const squares = document.querySelectorAll(`.aiSquare`);
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.classList.contains("aiShipSquare")) {
        square.classList.add("hitShip");
      } else {
        square.classList.add("missed");
        if (
          (parseInt(square.dataset.row) % 2 === 0 &&
            parseInt(square.dataset.column) % 2 === 0) ||
          (parseInt(square.dataset.row) % 2 !== 0 &&
            parseInt(square.dataset.column) % 2 !== 0)
        ) {
          square.classList.add("blue");
        } else {
          square.classList.add("cyan");
        }
      }
      square.classList.add("flash");
      setTimeout(() => {
        square.classList.remove("flash");
      }, 500);
    });
  });
}
