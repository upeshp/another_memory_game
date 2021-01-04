/* code for memory game https://marina-ferreira.github.io/tutorials/js/memory-game/ */
/* code for additional features like styling, points, modal etc: https://www.youtube.com/watch?v=WXv51-Lk438 */

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

/* SOUND EFFECTS */

/* code for adding sound effects taken from https://www.youtube.com/watch?v=QHBOOouI1tY */

var fxCorrect = new Audio("assets/sounds/my_reflexes.mp3");
var fxWrong = new Audio("assets/sounds/i_don't_learn.mp3");
var fxWon = new Audio("assets/sounds/oh_yeah.mp3");

/* code for adding mute button from https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_av_prop_muted */
/* code for having a single mute/unmute button from https://stackoverflow.com/questions/28998076/one-click-to-mute-another-click-to-unmute?noredirect=1&lq=1 */






/* http://jsfiddle.net/K9553/ */
   function toggleSound(img) {
   img.src= img.src=="images/volume_up.png" ? "images/no_sound.png" : "images/volume_up.png";
    fxCorrect.muted = !fxCorrect.muted;
    fxWrong.muted = !fxWrong.muted;
    fxWon.muted = !fxWon.muted; 
}


function toggleImage() {
   var img1 = "images/volume_up.png";
   var img2 = "images/no_sound.png";
   
   var imgElement = document.getElementById('toggleImage');

   imgElement.src = (imgElement.src === img1)? img2 : img1;
}

/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

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
  win += 2;
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


function shipMove() {
  ship.classList.add = "animate__slideOutRight";
}
button.addEventListener("click", shipMove);
