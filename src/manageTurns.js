export default function manageTurns() {
  let no = 0;

  let whoseTurn = function (player, ai) {
    if (ai.isTurn == false && player.isTurn == true) {
      return "playerTurn";
    } else if (player.isTurn == false && ai.isTurn == true) {
      return "aiTurn";
    }
  };

  let switchTurns = function (player, ai) {
    player.isTurn = !player.isTurn;
    ai.isTurn = !ai.isTurn;
    no += 1;
  };

  let getNo = function () {
    return no;
  };

  return {
    whoseTurn,
    switchTurns,
    getNo,
  };
}
