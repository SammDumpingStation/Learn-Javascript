let yourMove = ""; //Variable for moves picked by the user

//gets the score of the user and computer that is integrated inside the local Storage as permanent
let points = JSON.parse(localStorage.getItem("scoreTotal")) || {
  Computer: 0,
  Tie: 0,
  User: 0,
};

//gets the div stored in the array and store it into the local Storage as permanent
const historyLogArray =
  JSON.parse(localStorage.getItem("logHistoryStorage")) || [];

const winLoseDisplay = [];
let autoPlayID;

//boolean to check if the reset button has been clicked before or not to not make it repeat itself over and over again
let isAutoplaying = false;
let hasResetShown = false;

//calling this function so that when the local storage has something in it, it will display it to the history log even if the page is refreshed
renderHistoryLog();

// Making the buttons and/or images to function when cicked using event listener
document
  .querySelector(".rockMove")
  .addEventListener("click", () => checkAndRenderMoves("Rock"));
document
  .querySelector(".paperMove")
  .addEventListener("click", () => checkAndRenderMoves("Paper"));
document
  .querySelector(".scissorMove")
  .addEventListener("click", () => checkAndRenderMoves("Scissors"));
document
  .querySelector(".reset-button")
  .addEventListener("click", () => resetButton());
document
  .querySelector(".clear-history-button")
  .addEventListener("click", () => clearHistoryButton());
document
  .querySelector(".auto-play-button")
  .addEventListener("click", () => autoPlayButton());

// For dark mode later -->
// const html = document.querySelector("html");
// html.style.backgroundColor = "black";

// Functions Section

//function to store the values put into the array and put it into local storage
function historyLogStorage() {
  localStorage.setItem("logHistoryStorage", JSON.stringify(historyLogArray));
}
// This will store the scores accumulated that is in the points variable and put it into local Storage (as permanent storage)
function scoreStorage() {
  localStorage.setItem("scoreTotal", JSON.stringify(points));
}

//function specifically for addEventListener to make the buttons work and do things they are supposed to do

//for the Rock, Paper, Scissor images to take a pick and display into history log
function checkAndRenderMoves(moves) {
  fightResult(moves);
  scoreStorage();
}

//for the Reset Button functionality
function resetButton() {
  points.Computer = 0;
  points.Tie = 0;
  points.User = 0;
  localStorage.removeItem("scoreTotal");
  renderScore();
  fightResult();
  scoreStorage();
}

//for the Clear History functionality
function clearHistoryButton() {
  renderHistoryLog("Reset");
  historyLogArray.length = 0;
  localStorage.removeItem("logHistoryStorage");
  historyLogStorage();
}

function autoPlayButton() {
  if (!isAutoplaying) {
    autoPlayID = setInterval(() => {
      const userMove = computerMove();
      fightResult(userMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(autoPlayID);
    isAutoplaying = false;
  }
}
//until here

// Is the main function that compares what the computer picks and the user pick then shows the result
function fightResult(userMove = "Reset") {
  if (userMove === "Reset") {
    renderHistoryLog();
    hasResetShown = true;
  } else {
    hasResetShown = false;
    let computerPick = computerMove();
    let result = "";
    result = winOrLose(computerPick, userMove);

    if (result === "You Win") {
      points.User++;
    } else if (result === "You Lose") {
      points.Computer++;
    } else if (result === "Tie") {
      points.Tie++;
    }
    renderScore(userMove, computerPick, result);
    renderHistoryLog();
  }
}

function computerMove() {
  let compMove = Math.random();
  // this if statement will expect a value from Math.random and we will determine the move of the computer randomly
  if (compMove >= 0 && compMove <= 1 / 3) {
    computerPick = "Rock";
  } else if (compMove > 1 / 3 && compMove <= 2 / 3) {
    computerPick = "Paper";
  } else if (compMove > 2 / 3 && compMove <= 1) {
    computerPick = "Scissors";
  }
  return computerPick;
}

// This function will compare what the user picks to what the computer picks in the game and returns the result as a string
function winOrLose(computerPick, userMove) {
  let result = "";
  // First if statement that will compare computerPick (Rock) with what the user will pick
  if (computerPick === "Rock" && userMove === "Rock") {
    result = "Tie";
  } else if (computerPick === "Rock" && userMove === "Paper") {
    result = "You Win";
  } else if (computerPick === "Rock" && userMove === "Scissors") {
    result = "You Lose";
  }
  // Second if statement that will compare computerPick (Paper) with what the user will pick
  else if (computerPick === "Paper" && userMove === "Rock") {
    result = "You Lose";
  } else if (computerPick === "Paper" && userMove === "Paper") {
    result = "Tie";
  } else if (computerPick === "Paper" && userMove === "Scissors") {
    result = "You Win";
  }
  // Third if statement that will compare computerPick (Scissors) with what the user will pick
  else if (computerPick === "Scissors" && userMove === "Rock") {
    result = "You Win";
  } else if (computerPick === "Scissors" && userMove === "Paper") {
    result = "You Lose";
  } else if (computerPick === "Scissors" && userMove === "Scissors") {
    result = "Tie";
  }
  // The return statement will return a string You win, You lose and Tie
  return result;
}

function renderScore(user = "reset", comp = "reset", output = "reset") {
  let render = document.querySelector(".render-score");
  let message = "";
  let checkedUserMove = "";
  let checkedComputerMove = "";
  let checkedResult = "";
  let divInsideHistoryLog = "";
  if (user === "reset" && comp === "reset" && output === "reset") {
    if (!hasResetShown) {
      render.innerHTML = `Scores have been reseted to 0! Start picking a move again!`;
      message = `<p class="rendered-log">Scores have been reseted to 0!</p>`;
      divInsideHistoryLog = `<div class="log-div display-reset">${message}</div>`;
      winLoseDisplay.unshift(message);
      historyLogArray.unshift(divInsideHistoryLog);
      historyLogStorage();
    } else {
      return;
    }
  } else {
    render.innerHTML = `You picked ${user} while Computer picked ${comp}. ${output}. User: ${points.User} Computer: ${points.Computer} Tie: ${points.Tie}.`;
    message = `User: ${user}. Computer: ${comp}. Result: ${output}`;
    winLoseDisplay.unshift(message);
    checkedUserMove = checkUserMove(user);
    checkedResult = checksResult(output);
    checkedComputerMove = checksComputerMove(comp);
    divInsideHistoryLog = `<div class="log-div display-result"> <div class="log-img-container user">${checkedUserMove}</div><div class="log-img-container result">${checkedResult}</div><div class="log-img-container computer">${checkedComputerMove}</div></div>`;
    historyLogArray.unshift(divInsideHistoryLog);
    historyLogStorage();
  }
}

function checkUserMove(user) {
  let checkedUserMove = "";
  if (user === "Rock") {
    checkedUserMove = `<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img user-img" /> <p class="description">${user}</p>`;
  } else if (user === "Paper") {
    checkedUserMove = `<img src="Images-Folder/paperFrame.png" alt="rock" class="log-img user-img" /> <p class="description">${user}</p>`;
  } else if (user === "Scissors") {
    checkedUserMove = `<img src="Images-Folder/scissorFrame.png" alt="rock" class="log-img user-img" /> <p class="description">${user}</p>`;
  }
  return checkedUserMove;
}

function checksComputerMove(comp) {
  let checkedComputerMove = "";

  if (comp === "Rock") {
    checkedComputerMove = `<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img computer-img" /> <p class="description">${comp}</p>`;
  } else if (comp === "Paper") {
    checkedComputerMove = `<img src="Images-Folder/paperFrame.png" alt="paper" class="log-img computer-img" /> <p class="description">${comp}</p>`;
  } else if (comp === "Scissors") {
    checkedComputerMove = `<img src="Images-Folder/scissorFrame.png" alt="scissor" class="log-img computer-img" /> <p class="description">${comp}</p>`;
  }
  return checkedComputerMove;
}

function checksResult(output) {
  let checkedResult = "";
  if (output === "You Win") {
    checkedResult = `<img src="Images-Folder/win.png" alt="" class="log-img win-img" /> <p class="description">${output}</p>`;
  } else if (output === "You Lose") {
    checkedResult = `<img src="Images-Folder/lose.png" alt="" class="log-img lose-img" /> <p class="description">${output}</p>`;
  } else if (output === "Tie") {
    checkedResult = `<img src="Images-Folder/tie.png" alt="" class="log-img tie-img" /> <p class="description">${output}</p>`;
  }
  return checkedResult;
}

function renderHistoryLog(action = "Start") {
  let logHTML = "";
  if (action === "Reset") {
    document.querySelector(
      ".log-container"
    ).innerHTML = `<div class="history-reset"><p>The History has been Reseted!</p><div>`;
  } else if (!historyLogArray.length) {
    document.querySelector(
      ".log-container"
    ).innerHTML = `<div class="history-reset"><p>No Existing History, please pick a move</p><div>`;
  } else {
    historyLogArray.forEach(function (historyLogArray) {
      const logString = historyLogArray;
      const logElement = logString;
      logHTML += logElement;
    });
    document.querySelector(".log-container").innerHTML = logHTML;
  }
}
