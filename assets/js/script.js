const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const play = document.getElementById("playAgain");
const button = document.getElementsByClassName("btn-handle");
const ship = document.getElementById("ship");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var finalPoint = 0;
var win = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/* sound effects */

var fxCorrect = new Audio("assets/sounds/my_reflexes.mp3");
var fxWrong = new Audio("assets/sounds/i_don't_learn.mp3");
var fxWon = new Audio("assets/sounds/oh_yeah.mp3");

function enableMute() { 
  fxCorrect.muted = true;
  fxWrong.muted = true;
  fxWon.muted = true;
} 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkCards();
}

function checkCards() {
  let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

  isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {

  fxCorrect.play();   


  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
    
   
    
  points += 4;
  finalPoint = points;
  win += 2;
  finalScore.innerHTML = finalPoint;
  score.innerHTML = points;

  if (win === 12) {
    fxWon.play();  
    won.style.visibility = "visible";
    
  }

  
  resetBoard();
  
}

function cardsDontMatch() {
  fxWrong.play();  
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 2000);

  

  points -= 1;
  finalPoint = points;
  score.innerHTML = points;

  

}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function playAgain() {
  location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})(); //IIFE

cards.forEach((card) => card.addEventListener("click", flipCard));


function shipMove() {
  ship.classList.add = "animate__slideOutRight";
}
button.addEventListener("click", shipMove);
