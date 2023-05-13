export default function changeName(name, userTitle) {
  const newTitle = userTitle;
  newTitle.innerText = name;

  return newTitle;
}
