export default function announceWinnerDOM(whowon) {
  const announceCont = document.getElementsByClassName("announceCont")[0];
  const announceText = announceCont.querySelector("#announceText");
  const buttonContainer = announceCont.querySelector(".buttonContainer");
  const button = buttonContainer.querySelector("button");

  announceText.innerHTML = ""; // Clear the existing text

  if (whowon === "user") {
    announceText.innerText =
      "You win! Congratulations. Click below to play again.";
  } else if (whowon === "ai") {
    announceText.innerText = "You lose! Better luck next time...";
  }

  announceCont.style.display = "grid"; // Make announceCont visible
  buttonContainer.style.display = "flex"; // Make buttonContainer visible
  button.style.display = "inline-block"; // Make button visible
  button.classList.add("playButton"); // Add a class to the button
}
