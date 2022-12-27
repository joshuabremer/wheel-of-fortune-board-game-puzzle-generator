/* Main functionality to generate the puzzle print out */

function fillInEverything(originalString) {
  const puzzleInput = generatePuzzleInput(originalString);
  fillInPuzzle(puzzleInput);
  fillInLetterGuide(puzzleInput);
}

function generatePuzzleInput(originalString) {
  const input = originalString.toUpperCase();
  let puzzleBoard = "";
  const words = input.split(" ");

  let iterator = 1;
  words.forEach((word) => {
    if (word.length > 10) {
      alert("Generator only works with words 1-10 letters long.");
      throw "Generator only works with words 1-10 letters long";
    }

    // Add spaces if the word doesn't fit in the rest of the word
    const spacesLeftInRow = 11 - (iterator % 10 === 0 ? 10 : iterator % 10);
    if (word.length > spacesLeftInRow) {
      iterator = iterator + spacesLeftInRow;
      puzzleBoard = puzzleBoard.padEnd(
        puzzleBoard.length + spacesLeftInRow,
        " "
      );
    }

    for (let i = 0; i < word.length; i++) {
      const inputLetter = word[i];
      puzzleBoard += inputLetter;
      iterator++;
    }
    if (iterator % 10 !== 1) {
      // Only add space if the word doesn't go all the way to end
      iterator++;
      puzzleBoard += " ";
    }
  });
  const finalPuzzleOutput = puzzleBoard.padEnd(30, " ");
  if (finalPuzzleOutput.length > 30) {
    alert(
      "Generator cannot fit the input into three rows of 10 letters. Use less words or smaller words."
    );
    throw "Generator cannot fit the input into three rows of 10 letters. Use less words or smaller words.";
  }
  return finalPuzzleOutput;
}

function fillInPuzzle(puzzleInput) {
  const cells = document.querySelectorAll("td");

  for (let i = 0; i < puzzleInput.length; i++) {
    const inputLetter = puzzleInput[i];
    const cell = cells[i];
    if (inputLetter !== " ") {
      cell.innerHTML = inputLetter;
      cell.classList.remove("unused");
    } else {
      cell.innerHTML = randomLetter();
      cell.classList.add("unused");
    }
  }
}

function fillInLetterGuide(originalString) {
  const letterGuide = {};
  const letterGuideElement = document.querySelector(".letter-guide");
  letterGuideElement.innerHTML = "";
  for (let i = 0; i < originalString.length; i++) {
    const inputLetter = originalString[i];
    if (inputLetter == " ") continue;

    letterGuide[inputLetter] = letterGuide[inputLetter] || [];
    letterGuide[inputLetter].push(i + 1);
  }
  const keys = Object.keys(letterGuide).sort();
  keys.forEach(function (key) {
    letterGuideElement.innerHTML += `<span class="letter-guide__letter">${key}: ${letterGuide[
      key
    ].join(",")}</span>`;
  });
}

/* Utilities */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
}

/* Do it */

function init() {
  const formElement = document.querySelector("form");
  const inputElement = document.querySelector("input[name=puzzle-input]");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    fillInEverything(inputElement.value);
  });

  fillInEverything(inputElement.value || "Wheel of Fortune Generator");
}
