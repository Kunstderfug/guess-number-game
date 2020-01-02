const input = document.querySelector('.numberInput'); //each const corresponds to the paragraph in the HTML file
const btnSearch = document.querySelector('button'); //there is no dot before the button because it is not a class, it is an element
const yourGuesses = document.querySelector('.guesses');
const gameoverText = document.querySelector('.gameover');
const startGame = document.querySelector('.startgame');
const theSameNumber = document.querySelector('.samenumber');

// setting the random number
let randomNumber = Number(Math.floor(Math.random() * Math.floor(100))); //sets the random number
input.focus(); //sets focus to input so you don't have to mouseclick on it before typing
input.setAttribute('placeholder', '⌨️ (from 0 to 100)'); //sets the text inside the input field

let easyLevel = document.getElementById('easy');
let medLevel = document.getElementById('med');
let hardLevel = document.getElementById('hard');
let impLevel = document.getElementById('imp');

// guessCount - number of guesses
let guessCount = 0;
let guesses = []; //empty for now array of guesses

let easyLevelSelected = false;
let medLevelSelected = false;
let hardLevelSelected = false;
let impLevelSelected = false;
console.log(easyLevelSelected);

easyLevel.onclick = function() {
  easyLevelSelected = true;
  medLevelSelected = false;
  hardLevelSelected = false;
  impLevelSelected = false;

  guessCount = 0;
  guesses = [];
  randomNumber = Number(Math.floor(Math.random() * Math.floor(100)));

  yourGuesses.textContent =
    'Your guesses ' + '(' + (10 - guessCount) + ' left): ' + guesses; //prints the number of remaining guesses
  input.value = '';

  easyLevel.setAttribute('class', 'active');
  medLevel.removeAttribute('class', 'active');
  hardLevel.removeAttribute('class', 'active');
  impLevel.removeAttribute('class', 'active');
};

medLevel.onclick = function() {
  easyLevelSelected = false;
  medLevelSelected = true;
  hardLevelSelected = false;
  impLevelSelected = false;

  guessCount = 2;
  guesses = [];
  gameoverText.textContent = '';
  randomNumber = Number(Math.floor(Math.random() * Math.floor(100)));

  yourGuesses.textContent =
    'Your guesses ' + '(' + (10 - guessCount) + ' left): ' + guesses; //prints the number of remaining guesses
  input.value = '';

  medLevel.setAttribute('class', 'active');
  easyLevel.removeAttribute('class', 'active');
  hardLevel.removeAttribute('class', 'active');
  impLevel.removeAttribute('class', 'active');
};

hardLevel.onclick = function() {
  easyLevelSelected = false;
  medLevelSelected = false;
  hardLevelSelected = true;
  impLevelSelected = false;

  guessCount = 4;
  guesses = [];
  gameoverText.textContent = '';
  randomNumber = Number(Math.floor(Math.random() * Math.floor(100)));
  yourGuesses.textContent =
    'Your guesses ' + '(' + (10 - guessCount) + ' left): ' + guesses; //prints the number of remaining guesses
  input.value = '';

  hardLevel.setAttribute('class', 'active');
  easyLevel.removeAttribute('class', 'active');
  medLevel.removeAttribute('class', 'active');
  impLevel.removeAttribute('class', 'active');
};

impLevel.onclick = function() {
  easyLevelSelected = false;
  medLevelSelected = false;
  hardLevelSelected = false;
  impLevelSelected = true;

  guessCount = 5;
  guesses = [];
  gameoverText.textContent = '';
  yourGuesses.textContent =
    'Your guesses ' + '(' + (10 - guessCount) + ' left): ' + guesses; //prints the number of remaining guesses
  input.value = '';

  impLevel.setAttribute('class', 'active');
  easyLevel.removeAttribute('class', 'active');
  medLevel.removeAttribute('class', 'active');
  hardLevel.removeAttribute('class', 'active');
};

btnSearch.onclick = function() {
  //this is what will happen when the button is clicked
  yourGuesses.classList.add('border');
  theSameNumber.textContent = '';
  startGame.textContent = ''; //empty paragraph for starting new game, the text will appear later

  if (
    (easyLevelSelected ||
      medLevelSelected ||
      hardLevelSelected ||
      impLevelSelected) === false
  ) {
    alert(
      'Select the level first, you are playing easy level as the default option'
    );
    guessCount = 0;
    // randomNumber = Number(Math.floor(Math.random() * Math.floor(100)));
  } else {
    gameoverText.textContent = '';
  }

  let myNumber = Number(input.value); //takes input number and stores it
  guessCount++; //number of guesses increases by 1
  guesses.push(' ' + myNumber);

  yourGuesses.textContent =
    'Your guesses ' + '(' + (10 - guessCount) + ' left): ' + guesses; //prints the number of remaining guesses
  input.value = ''; //resets input field

  for (let i = 0; i < guesses.length; i++) {
    let prevNumbers = guesses[i - 1];

    if (myNumber === randomNumber) {
      //I think the following should be clear
      gameoverText.textContent =
        " 🧠 You are too smart, I can't keep up. Congrats 💪 ";
      startGame.textContent =
        '👆 Just enter a number if you want to play again 👆';
      input.setAttribute('placeholder', 'YOU WON!');
      yourGuesses.classList.remove('border');
      gameOver(); //this is the new function which resets the game, see the bottom of the file
    } else if (myNumber == prevNumbers) {
      // console.log('the same number');
      theSameNumber.textContent =
        '🐸 Your memory is a bit short-term, you already entered this number 🐸';
      input.focus();
      input.setAttribute('placeholder', '');
    } else {
      if (guessCount === 10 && myNumber !== randomNumber) {
        // && means AND
        gameoverText.textContent = "😛 Man, it sucks but don't give up 🤛"; //just start again
        startGame.textContent = '👆 Enter a number if you want to try again 👆';
        input.focus(); //sets focus on input filed so you don't have to click on it before typing
        gameOver();
      } else if (myNumber < 0 || myNumber > 100) {
        gameoverText.textContent = '👀 Hey, from 0 to 100, remember? 👀'; //try something else, better higher
        input.focus();
        input.setAttribute('placeholder', '');
      } else {
        if (myNumber < randomNumber) {
          gameoverText.textContent = '🛴 Your number is too low 🛴'; //try something else, better higher
          input.focus();
          input.setAttribute('placeholder', ''); //this resets text in the placeholder, it was "(from 0 to 100)"
        } else if (myNumber > randomNumber) {
          gameoverText.textContent = '🚀 Your number is too high 🚀'; //try something else too
          input.focus();
          input.setAttribute('placeholder', '');
        }
      }
    }
  }
};

function gameOver() {
  input.value = ''; //reset input
  input.focus();
  guesses = []; //resets guesses array
  if (easyLevelSelected) {
    guessCount = 0;
  } else if (medLevelSelected) {
    guessCount = 2;
  } else if (hardLevelSelected) {
    guessCount = 4;
  } else if (impLevelSelected) {
    guessCount = 5;
  }

  //resets guess count
  yourGuesses.textContent = ''; //resets your guesses
  randomNumber = Number(Math.floor(Math.random() * Math.floor(100))); //sets new random number for the next game
  //   console.log(randomNumber);
}
