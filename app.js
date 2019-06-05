const resetButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
let qwerty = document.getElementById("qwerty");
let phrase = document.getElementById("phrase");
let missed = 0;
const tries = document.querySelectorAll(".tries")
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li")
const phrases = [
  "piece of cake",
  "tough nut to crack",
  "crocodile tears",
  "the root of the problem",
  "on thin ice"
];
const phraseUl = document.getElementsByTagName("ul")[0];
const keyboardKeys = document.getElementsByTagName("button");


//************************************************
//***FUNCTIONS************************************
//************************************************

// getting random phrase from phrases and splitting it into an array of letters

function getRandomPhraseAsArray(arr) {
  const random = arr[(Math.floor(Math.random() * arr.length))];
  const splitPhraseArray = random.split("");
  return splitPhraseArray;
}

//adding phrase as a li

function addPhraseToDisplay(arr) {
 for (let i = 0; i < arr.length; i += 1) {
   let character = arr[i];
   const li = document.createElement("li");
   li.textContent = character;
 if (character !== " ") {
    li.className = "letter";
  }  else {
    li.className = "space";
  }
  ul.appendChild(li);
 }
}

//checking if selected letter is a part of the phrase

function checkLetter(selectedButton) {
  const letters = document.querySelectorAll(".letter");
  let letterMatch = false;
  for (let i = 0; i < letters.length; i += 1) {
    if(selectedButton === letters[i].textContent) {
      letterMatch = true;
      letters[i].classList.add("show");
      letters[i].style.transition = '2s';
     }
} if(letterMatch) {
    return selectedButton;
} else {
    return null;
  }
}


//checking if the player won or lost

function checkWin(){
  const showClass = document.querySelectorAll(".show");
  const letterClass = document.querySelectorAll(".letter");
  const h2 = document.querySelector("h2")
  if (showClass.length === letterClass.length) {
      overlay.style.display = "flex";
      overlay.className = "win";
      h2.textContent = "YOU WIN!"

  } else if (missed >= 5){
      overlay.style.display = "flex";
      overlay.className = "lose";
      h2.textContent = "YOU LOSE!";
  }

  resetButton.textContent = "Try again";

}

////////////////////////////////////////
//////EVENT LISTENERS///////////////////
////////////////////////////////////////

// pointer on hover

resetButton.addEventListener("mouseover", (e) => {
    resetButton.style.cursor = "pointer";
});

// clicking the button starts/resets the game

resetButton.addEventListener("click", (e) => {
  let phraseArray = getRandomPhraseAsArray(phrases);
  phraseUl.innerHTML = "";
  addPhraseToDisplay(phraseArray);
  missed = 0;
  //loops through all the hearts and displays them again
  for (let i = 0; i < tries.length; i += 1) {
    tries[i].style.display = "inline-block";
  };
  //loops through all the buttons and enables them again
  for (let i = 0; i <keyboardKeys.length; i += 1) {
    keyboardKeys[i].classList.remove("chosen");
    keyboardKeys[i].disabled = false;
  };
  overlay.style.display = "none";
});

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const chosen = e.target.textContent;
    e.target.classList.add("chosen");
    e.target.disabled = true;
    letterOutcome = checkLetter(chosen);
    if(letterOutcome === null) {
      tries[missed].style.display = "none";
      missed += 1;
    }
  } checkWin();
});
