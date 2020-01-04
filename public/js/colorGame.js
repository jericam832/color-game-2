let numSquares = 3;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let stripe2 = document.getElementById("#stripe2");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  //Mode buttons listeners
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      // modeButtons[3].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 3;
      }
      if (this.textContent === "Tough") {
        numSquares = 6;
      }
      if (this.textContent === "Tricky") {
        numSquares = 9;
      }
      if (this.textContent === "Impossible!") {
        numSquares = 12;
      }
      reset();
    });
  }

}
function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.background = colors[i];
    //add click listeners to squares
    squares[i].addEventListener("click", function () {
      //grab color of clicked square
      let clickedColor = this.style.background;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.style.color = "green";
        messageDisplay.textContent = "CORRECT!!!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;


      } else {
        this.style.background = "none";
        messageDisplay.style.color = "red";
        messageDisplay.textContent = "Try Again!";
        this.style.boxShadow = "none";

      }
    });

  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match pickedColor
  messageDisplay.textContent = " ";
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";

    }
  }
  //change background back
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

//function to change all square colors when correct
function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.background = color;
  }

}

//pick random colors for the squares
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
//Return random colors for each square
function generateRandomColors(num) {
  //make an array for colors
  let arr = [];
  //repear num times
  for (let i = 0; i < num; i++) {
    //get random color and push to arr
    arr.push(randomColor())
  }
  //return that array
  return arr;
}

//generate random colors
function randomColor() {
  //pick a "red" from 0 - 255
  let r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 - 255
  let g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 - 255
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//modal 
let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);