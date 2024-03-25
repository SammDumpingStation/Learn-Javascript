let yourMove = "";
let points = JSON.parse(localStorage.getItem("scoreTotal"));
const userArray = [];
const compArray = [];
const resultArray = [];

// For dark mode later -->
// const html = document.querySelector("html");
// html.style.backgroundColor = "black";

function scoreStorage() {
  localStorage.setItem("scoreTotal", JSON.stringify(points));
}

function fightResult(userMove) {
  let compMove = Math.random();
  let computerPick = "";
  let result = "";

  if (compMove >= 0 && compMove <= 1 / 3) {
    computerPick = "Rock";
  } else if (compMove > 1 / 3 && compMove <= 2 / 3) {
    computerPick = "Paper";
  } else if (compMove > 2 / 3 && compMove <= 1) {
    computerPick = "Scissors";
  }

  if (computerPick === "Rock") {
    if (userMove === "Rock") {
      result = "Tie";
    } else if (userMove === "Paper") {
      result = "You Win";
    } else if (userMove === "Scissors") {
      result = "You lose";
    }
  } else if (computerPick === "Paper") {
    if (userMove === "Rock") {
      result = "You lose";
    } else if (userMove === "Paper") {
      result = "Tie";
    } else if (userMove === "Scissors") {
      result = "You Win";
    }
  } else if (computerPick === "Scissors") {
    if (userMove === "Rock") {
      result = "You Win";
    } else if (userMove === "Paper") {
      result = "You lose";
    } else if (userMove === "Scissors") {
      result = "It's a tie";
    }
  }

  if (result === "You Win") {
    points.User++;
  } else if (result === "You lose") {
    points.Computer++;
  } else if (result === "Tie") {
    points.Tie++;
  }
  renderScore(userMove, computerPick, result);
  addingArray("Start");
  renderLog("Start");
}

function renderScore(user, comp, output) {
  let render = document.querySelector(".render-score");
  let message = "";
  if (user === "reset" || comp === "reset" || output === "reset") {
    render.innerHTML = `Scores have been reseted to 0! Start picking a move again!`;
    message = `<p class="rendered-log">Scores have been reseted to 0!</p>`;
    userArray.unshift(message);
  } else {
    render.innerHTML = `You picked ${user} while Computer picked ${comp}. ${output}. User: ${points.User} Computer: ${points.Computer} Tie: ${points.Tie}.`;
    message = `User: ${user}. Computer: ${comp}. Result: ${output}`;
    userArray.unshift(message);
  }
}

function addingArray(action) {
  if (action === "Reset") {
  } else {
  }
}

function renderLog(status) {
  let logHTML = "";
  for (let i = 0; i < userArray.length; i++) {
    const logString = userArray[i];
    const logElement = `<p class="rendered-log">${logString}</p>`;
    logHTML += logElement;
  }
  // document.querySelector(".history-logs-p").innerHTML = logHTML;
  console.log((document.querySelector(".log-div").innerHTML = logHTML));
}
