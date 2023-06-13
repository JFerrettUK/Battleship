export default function userClickGameDOM(userSquareCallback) {
  const aiSquares = document.querySelectorAll(".aiSquare");
  aiSquares.forEach((square) => {
    square.addEventListener("click", () => {
      const aiSquareRow = parseInt(square.dataset.row);
      const aiSquareCol = parseInt(square.dataset.column);

      // Rest of the code for updating the square's class
      if (square.classList.contains("aiShipSquare")) {
        square.classList.add("hitShip");
      } else {
        square.classList.add("missed");
        if (
          (aiSquareRow % 2 === 0 && aiSquareCol % 2 === 0) ||
          (aiSquareRow % 2 !== 0 && aiSquareCol % 2 !== 0)
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
          (aiSquareRow % 2 === 0 && aiSquareCol % 2 === 0) ||
          (aiSquareRow % 2 !== 0 && aiSquareCol % 2 !== 0)
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

      // Map the DOM coordinates to game board coordinates (adjust as needed)

      let playerSquareRow;
      let playerSquareCol;

      if (randomIndex < 10) {
        playerSquareRow = 0;
        playerSquareCol = randomIndex;
      } else {
        playerSquareRow = parseInt(randomIndex.toString()[0]);
        playerSquareCol = parseInt(randomIndex.toString()[1]);
      }

      // Pass the game board coordinates to the callback function
      userSquareCallback(
        aiSquareRow,
        aiSquareCol,
        playerSquareRow,
        playerSquareCol
      );
    });
  });
}
