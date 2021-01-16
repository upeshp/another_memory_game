/* code for memory game https://marina-ferreira.github.io/tutorials/js/memory-game/ */
/* code for additional features like styling, points, modal etc: https://www.youtube.com/watch?v=WXv51-Lk438 */

/* GENERAL */

const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const play = document.getElementById("playAgain");
const body = document.getElementsByTagName("body")[0];

var points = 0;
var finalPoint = 0;
var win = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/* SOUND EFFECTS */

/* code for adding sound effects taken from https://www.youtube.com/watch?v=QHBOOouI1tY */

var fxCorrect = new Audio("assets/sounds/nothing_goes_new.mp3");
var fxWrong = new Audio("assets/sounds/one_of_my_issues_new.mp3");
var fxWon = new Audio("assets/sounds/oh_yeah.mp3");

/* http://www.developphp.com/video/JavaScript/Change-CSS-Class-Style-className-Toggle-Tutorial */
function toggleClass(el){
	if(el.className == "soundon"){
        el.className = "soundoff";
        fxCorrect.muted = true;
        fxWrong.muted = true;
        fxWon.muted = true; 
	} else {
        el.className = "soundon";
        fxCorrect.muted = false;
        fxWrong.muted = false;
        fxWon.muted = false;
	}
}

/* MODAL */

/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("HelpBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/* GAME */

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

    

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
 
  
  points += 4; /*was4*/
  finalPoint = points;  
  win += 2; /*NEED TO CHANGE IF ADD MORE CARDS */
  finalScore.innerHTML = finalPoint;
  score.innerHTML = points;

  if (win != 12) {
    
    fxCorrect.play();   
        
  }  

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

  points -= 1; /*was1*/
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


