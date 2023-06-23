import gameOver from "../game/gameOver";

export default function userClickGameDOM(userSquareCallback) {
  // Get all the squares with the class "aiSquare"
  const aiSquares = document.querySelectorAll(".aiSquare");

  // Iterate through each AI square
  aiSquares.forEach((square) => {
    // Add a click event listener to each AI square
    square.addEventListener("click", () => {
      // Get the row and column values from the data attributes of the clicked square
      const aiSquareRow = parseInt(square.dataset.row);
      const aiSquareCol = parseInt(square.dataset.column);

      // Rest of the code for updating the square's class

      // If the AI square contains the class "aiShipSquare", add the class "hitShip"
      if (square.classList.contains("aiShipSquare")) {
        square.classList.add("hitShip");
      } else {
        // If the AI square doesn't contain "aiShipSquare", add the class "missed"
        square.classList.add("missed");

        // Determine the color of the square based on its row and column values
        if (
          (aiSquareRow % 2 === 0 && aiSquareCol % 2 === 0) ||
          (aiSquareRow % 2 !== 0 && aiSquareCol % 2 !== 0)
        ) {
          square.classList.add("blue");
        } else {
          square.classList.add("cyan");
        }
      }

      // Add the class "flash" to animate the square
      square.classList.add("flash");

      // Remove the "flash" class after a timeout of 500 milliseconds
      setTimeout(() => {
        square.classList.remove("flash");
      }, 500);

      // Get all the user squares
      const userSquares = document.querySelectorAll(".userSquare");
      const totalUserSquares = userSquares.length;

      // Generate a random index to select a random user square
      const randomIndex = Math.floor(Math.random() * totalUserSquares);
      const selectedUserSquare = userSquares[randomIndex];

      // Check if the selected user square contains the class "shipSquare" and update its class accordingly
      if (selectedUserSquare.classList.contains("shipSquare")) {
        selectedUserSquare.classList.add("hitShip");
      } else {
        selectedUserSquare.classList.add("missed");

        // Determine the color of the square based on the AI square's row and column values
        if (
          (aiSquareRow % 2 === 0 && aiSquareCol % 2 === 0) ||
          (aiSquareRow % 2 !== 0 && aiSquareCol % 2 !== 0)
        ) {
          selectedUserSquare.classList.add("blue");
        } else {
          selectedUserSquare.classList.add("cyan");
        }
      }

      // Add the class "flash" to animate the selected user square
      selectedUserSquare.classList.add("flash");

      // Remove the "flash" class after a timeout of 500 milliseconds
      setTimeout(() => {
        selectedUserSquare.classList.remove("flash");
      }, 500);

      // Map the DOM coordinates to game board coordinates (adjust as needed)

      let playerSquareRow;
      let playerSquareCol;

      // Determine the player square's row and column values based on the random index
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

  if (gameOver(thisGame)[0] == true) {
    console.log("gameOver");
  }
}
