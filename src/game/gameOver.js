export default function gameOver(game) {
  const userBoard = game.user.playerBoard;
  const aiBoard = game.ai.playerBoard;

  if (!userBoard.allSunk() || !aiBoard.allSunk()) {
    return [false];
  }

  if (userBoard.allSunk()) {
    return [true, "aiWins"];
  } else if (aiBoard.allSunk()) {
    return [true, "userWins"];
  }
}
