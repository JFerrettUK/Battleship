import getAdjacentSquares from "./getAdjacentSquares";

export default function userClickGameDOM(userSquareCallback, thisGame) {
  // Get all the squares with the class "aiSquare"
  const aiSquares = document.querySelectorAll(".aiSquare");

  // Iterate through each AI square
  aiSquares.forEach((square) => {
    // Add a click event listener to each AI square
    square.addEventListener("click", () => {
      // Get the row and column values from the data attributes of the clicked square
      const aiSquareRow = parseInt(square.dataset.row);
      const aiSquareCol = parseInt(square.dataset.column);

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

      square.classList.add("flash");

      setTimeout(() => {
        square.classList.remove("flash");
      }, 500);

      let playerSquareRow;
      let playerSquareCol;
      let adjacentNotHit = [];

      const listHit = thisGame.user.playerBoard.listHit;
      const validAttacks = thisGame.user.playerBoard.generatePotentialTargets();

      //above is a list of valid attacks.
      //Look through this list -- are any hit Ships?
      //If so, look at the adjacent squares. Are any of them not hit?
      for (const hit of listHit) {
        const [row, column] = hit;
        const adjacentSquares = getAdjacentSquares(row, column);

        for (const square of adjacentSquares) {
          const [adjRow, adjColumn] = square;
          if (!thisGame.user.playerBoard.isAttacked(adjRow, adjColumn)) {
            adjacentNotHit.push(square);
          }
        }
      }

      let randomTarget;

      if (adjacentNotHit.length > 0) {
        const firstAdjacentSquare = adjacentNotHit[0];
        randomTarget = [firstAdjacentSquare[0], firstAdjacentSquare[1]];
      } else {
        const randomNo = Math.floor(Math.random() * validAttacks.length);
        randomTarget = validAttacks[randomNo];
      }

      const randomTargetIndex = randomTarget[0] * 10 + randomTarget[1];

      // Determine the player square's row and column values based on the random target
      playerSquareRow = randomTarget[0];
      playerSquareCol = randomTarget[1];

      // Get all the user squares
      const userSquares = document.querySelectorAll(".userSquare");
      const selectedUserSquare = userSquares[randomTargetIndex];

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
