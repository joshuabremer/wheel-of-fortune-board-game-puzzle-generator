const inputElement = document.querySelector("input[name=puzzle-input]");
const rows = document.querySelectorAll("tr.row--letters");
const cells = document.querySelectorAll("td");

inputElement.addEventListener("keyup", (event) => {
  showInputValue();
});

function showInputValue() {
  const input = inputElement.value.toUpperCase();
  cells.forEach((cell) => {
    cell.classList.add("unused");
    cell.innerHTML = randomLetter();
  });
  const words = input.split(" ");
  let iterator = 1;
  words.forEach((word) => {
    if (word.length > 10 - iterator) iterator = 11;

    for (let i = 0; i < word.length; i++) {
      const inputLetter = word[i];
      const cell = cells[iterator - 1];
      if (inputLetter !== " ") {
        cell.innerHTML = inputLetter;
        cell.classList.remove("unused");
      }
      iterator++;
    }
  });
}

showInputValue();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomLetter() {
  return shuffleArray([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ])
    .slice(0, 1)
    .toString();
}
