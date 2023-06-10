export default function userClickGameDOM(userSquareCallback) {
  const aiSquares = document.querySelectorAll(".aiSquare");
  aiSquares.forEach((square) => {
    square.addEventListener("click", () => {
      const row = parseInt(square.dataset.row);
      const column = parseInt(square.dataset.column);

      // Rest of the code for updating the square's class
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

      const userSquares = document.querySelectorAll(".userSquare");
      const totalUserSquares = userSquares.length;

      const randomIndex = Math.floor(Math.random() * totalUserSquares);
      const selectedUserSquare = userSquares[randomIndex];

      if (selectedUserSquare.classList.contains("shipSquare")) {
        selectedUserSquare.classList.add("hitShip");
      } else {
        selectedUserSquare.classList.add("missed");
        if (
          (row % 2 === 0 && column % 2 === 0) ||
          (row % 2 !== 0 && column % 2 !== 0)
        ) {
          selectedUserSquare.classList.add("blue");
        } else {
          selectedUserSquare.classList.add("cyan");
        }
      }

      selectedUserSquare.classList.add("flash");
      setTimeout(() => {
        selectedUserSquare.classList.remove("flash");
      }, 500);
    });
  });
}
