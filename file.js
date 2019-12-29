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

// console.log(randomNumber);

// guessCount - number of guesses
let guessCount = 0;
let guesses = []; //empty for now array of guesses

btnSearch.onclick = function() {
  //this is what will happen when the button is clicked
  theSameNumber.textContent = '';
  startGame.textContent = ''; //empty paragraph for starting new game, the text will appear later

  let myNumber = Number(input.value); //takes input number and stores it
  guessCount++; //number of guesses increases by 1
  guesses.push(myNumber);
  //   console.log(myNumber); //the guess number has been added to the array

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
      gameOver(); //this is the new function which resets the game, see the bottom of the file
    } else if (myNumber == prevNumbers) {
      console.log('the same number');
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
  guessCount = 0; //resets guess count
  yourGuesses.textContent = ''; //resets your guesses
  randomNumber = Number(Math.floor(Math.random() * Math.floor(100))); //sets new random number for the next game
  //   console.log(randomNumber);
}
