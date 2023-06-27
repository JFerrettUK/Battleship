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

      console.log(thisGame.user.playerBoard.listAttacked);

      let playerSquareRow;
      let playerSquareCol;

      const validAttacks = [];

      for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
          const isAlreadyMissed = thisGame.user.playerBoard.listAttacked.some(
            ([missedRow, missedColumn]) =>
              missedRow === row && missedColumn === column
          );

          if (!isAlreadyMissed) {
            validAttacks.push([row, column]);
          }
        }
      }

      console.log(validAttacks);
      let foundMatch = false;

      validAttacks.forEach((validAttack) => {
        const validAttackRow = validAttack[0];
        const validAttackCol = validAttack[1];

        if (
          playerSquareRow === validAttackRow &&
          playerSquareCol === validAttackCol
        ) {
          foundMatch = true;
        }
      });

      if (!foundMatch) {
        setValidTargets();
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
