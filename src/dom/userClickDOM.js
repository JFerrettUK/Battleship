export default function userClickDOM() {
  const squares = document.querySelectorAll(".aiSquare");
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const row = parseInt(square.dataset.row);
      const column = parseInt(square.dataset.column);

      if (square.classList.contains("aiShipSquare")) {
        square.classList.add("hitShip");
      } else {
        square.classList.add("missed");
        if (
          (row % 2 === 0 && column % 2 === 0) ||
          (row % 2 !== 0 && column % 2 !== 0)
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
