export default function gameOver(game) {
  const userBoard = game.user.playerBoard;
  const aiBoard = game.ai.playerBoard;

  if (!userBoard.allSunk() && !aiBoard.allSunk()) {
    return false;
  }

  return true;
}
