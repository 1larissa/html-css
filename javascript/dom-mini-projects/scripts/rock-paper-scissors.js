let score = JSON.parse(localStorage.getItem("score"));

if (score === null /* ou !score */) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

/* ou ao inves da instrução acima:
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
*/


let isAutoPlaying = false;
let intervalId;

updateScoreElement();

function autoPlay() {

  // para PARAR um interval é necessário salvar o intervalId q é 
  // retornado a cada execução dele e mandar dentro de um clear interval
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      let playerMove = pickComputerMove();
      playGame(playerMove);
      isAutoPlaying = true;
      document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }, 1000);
  } else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('rock') });
document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('paper') });
document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('scissors') });
document.querySelector('.js-reset-score-button').addEventListener('click', () => { showResetConfirmation() });
document.querySelector('.js-auto-play-button').addEventListener('click', () => { autoPlay() });

// ao iniciar a página podemos jogar apertando 'r', 'p' ou 's'
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === ' ') {
    resetScore();
  }
});

function playGame(playerMove) {
  computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `
  You: <img class="move-icon" src="./${playerMove}-emoji.png"> vs. Computador: <img  class="move-icon"  src="./${computerMove}-emoji.png">`;
  updateScoreElement();

}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let computerMove = "";

function pickComputerMove() {
  let randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= randomNumber / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function showResetConfirmation() {
  let message = document.querySelector('.js-message-reset');
  message.innerHTML = `Are you sure you want to reset the score?
  <button class="confirm-reset-button js-confirm-yes-reset-button">Yes</button>
  <button class="confirm-reset-button js-confirm-no-reset-button">No</button>`
  document.querySelector('.js-confirm-yes-reset-button').addEventListener('click', () => { resetScore(); hideResetConfirmation()});
  document.querySelector('.js-confirm-no-reset-button').addEventListener('click', () => hideResetConfirmation());
}

function hideResetConfirmation() {
  document.querySelector('.js-message-reset').innerHTML= '';
}