"use strict";

const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
const labelScore0 = document.getElementById("score-0");
const labelScore1 = document.getElementById("score-1");
const labelCurrent0 = document.getElementById("current-0");
const labelCurrent1 = document.getElementById("current-1");
const imgDice = document.querySelector(".dice-img");
const btnNew = document.querySelector(".btn.btn--new");
const btnRoll = document.querySelector(".btn.btn--roll");
const btnHold = document.querySelector(".btn.btn--hold");

// resetting state

let currentScore, activePlayer, scores;

function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  imgDice.classList.add("hidden");
  updateCurrent(0);
  updateCurrent(1);
  updateScore(0);
  updateScore(1);
  sectionPlayer0.classList.add("active");
  sectionPlayer1.classList.remove("active");
  btnRoll.disabled = false;
  btnHold.disabled = false;
}
init();

function updateCurrent(user) {
  document.getElementById(`current-${user}`).textContent =
    currentScore;
}

function updateScore(user) {
  document.getElementById(`score-${user}`).textContent =
    scores[user];
}

function switchUser() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  sectionPlayer0.classList.toggle("active");
  sectionPlayer1.classList.toggle("active");
}

// User rolls the dice
btnRoll.addEventListener("click", function () {
  btnNew.disabled = true;
  imgDice.classList.remove("hidden");
  const dice = Math.trunc(Math.random() * 6) + 1;

  imgDice.src = `./imgs/dice-${dice}.png`;

  if (dice === 1) {
    currentScore = 0;
    updateCurrent(activePlayer);
    switchUser();
  } else {
    currentScore += dice;
    updateCurrent(activePlayer);
  }
});

// User hold scores
btnHold.addEventListener("click", function () {
  if (currentScore > 0) {
    scores[activePlayer] += currentScore;
    updateScore(activePlayer);
    currentScore = 0;
    updateCurrent(activePlayer);
    if (scores[activePlayer] >= 100) {
      // IF true player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      btnRoll.disabled = true;
      btnHold.disabled = true;
      btnNew.disabled = false;
    } else {
      switchUser();
    }
  }
});
// user resets the game
btnNew.addEventListener("click", function () {
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains("player--winner")
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }
  init();
});
