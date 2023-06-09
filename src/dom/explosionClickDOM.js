export default function userClickDOM() {
  const squares = document.querySelectorAll(".battleSquare");
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      square.classList.add("boom");
      setTimeout(() => {
        square.classList.remove("boom");
      }, 500);
    });
  });
}
