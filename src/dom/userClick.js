export default function userClick() {
  const squares = document.querySelectorAll(`.aiSquare`);
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      square.classList.add("hitSquare");
      square.classList.add("flash");
      setTimeout(() => {
        square.classList.remove("flash");
      }, 500);
    });
  });
}
