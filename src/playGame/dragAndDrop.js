export default function dragAndDrop() {
  const shipPieces = document.querySelectorAll(".shipPiece");
  const userSquares = document.querySelectorAll(".userSquare");

  shipPieces.forEach((shipPiece) => {
    shipPiece.addEventListener("dragstart", handleDragStart);
    shipPiece.addEventListener("dragend", handleDragEnd);
  });

  userSquares.forEach((userSquare) => {
    userSquare.addEventListener("dragover", dragOver);
    userSquare.addEventListener("drop", dragDrop);
  });

  let beingDragged;

  function handleDragStart(e) {
    beingDragged = e.target;
  }

  function handleDragEnd(e) {
    console.log(e.target);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragDrop(e) {
    console.log(e.target);
    e.target.append(beingDragged);
  }
}
