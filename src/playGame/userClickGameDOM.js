export default function userClickGameDOM(userSquareCallback) {
  const aiSquares = document.querySelectorAll(".aiSquare");
  aiSquares.forEach((square) => {
    square.addEventListener("click", () => {
      const playerRow = parseInt(square.dataset.row);
      const playerCol = parseInt(square.dataset.column);

      // Rest of the code for updating the square's class
      if (square.classList.contains("aiShipSquare")) {
        square.classList.add("hitShip");
      } else {
        square.classList.add("missed");
        if (
          (playerRow % 2 === 0 && playerCol % 2 === 0) ||
          (playerRow % 2 !== 0 && playerCol % 2 !== 0)
        ) {
          square.classList.add("blue");
        } else {
          square.classList.add("cyan");
        }
      }
      console.log(playerRow, playerCol);
      console.log("^should be playerRow/playerCol");

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
          (playerRow % 2 === 0 && playerCol % 2 === 0) ||
          (playerRow % 2 !== 0 && playerCol % 2 !== 0)
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

      let aiRow;
      let aiCol;

      if (randomIndex < 10) {
        aiRow = 0;
        aiCol = randomIndex;
      } else {
        aiRow = parseInt(randomIndex.toString()[0]);
        aiCol = parseInt(randomIndex.toString()[1]);
      }

      console.log(aiRow, aiCol);
      console.log("^should be aiRow/aiCol");

      // Pass the game board coordinates to the callback function
      userSquareCallback(aiRow, aiCol);
    });
  });
}
