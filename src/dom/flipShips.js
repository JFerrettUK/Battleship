export default function flipShips() {
  const flipShipsElement = document.getElementById("flipShips");
  const verShips = document.getElementById("verShips");
  const horShips = document.getElementById("horShips");

  flipShipsElement.addEventListener("click", () => {
    if (verShips.style.display === "none") {
      verShips.style.display = "grid";
      horShips.style.display = "none";
    } else {
      verShips.style.display = "none";
      horShips.style.display = "grid";
    }
  });
}
