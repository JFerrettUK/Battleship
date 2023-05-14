export default function placeDomShip(missedSquare, type) {
  if (type == "missed") {
    missedSquare.classList.add("missed");
    return missedSquare;
  } else if (type == "hitShip") {
    missedSquare.classList.add("hitShip");
    return missedSquare;
  } else {
    return missedSquare;
  }
}
