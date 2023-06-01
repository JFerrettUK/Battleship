export default function gameOver(game) {
  const userBoard = game.user.playerBoard;
  const aiBoard = game.ai.playerBoard;

  if (!userBoard.allSunk() || !aiBoard.allSunk()) {
    return false;
  }

  if (userBoard.allSunk() == true || aiBoard.allSunk() == true) {
    return true;
  }
}
