export default function gameOver(game) {
  if (!game.user.playerBoard.allSunk() || !game.ai.playerBoard.allSunk()) {
    return [false];
  }

  if (game.user.playerBoard.allSunk()) {
    return [true, "aiWins"];
  } else if (game.ai.playerBoard.allSunk()) {
    return [true, "userWins"];
  }
}
