export default function userClick() {
  const squares = document.querySelectorAll(".battleSquare");
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      square.classList.add("flash");
      setTimeout(() => {
        square.classList.remove("flash");
      }, 100);
    });
  });
}
