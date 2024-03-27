let yourMove = "";
let points = JSON.parse(localStorage.getItem("scoreTotal")) || {
  Computer: 0,
  Tie: 0,
  User: 0,
};
const winLoseDisplay = [];
const historyLogArray = [];
let hasResetShown = false;

// For dark mode later -->
// const html = document.querySelector("html");
// html.style.backgroundColor = "black";

// Functions Section

// This will store the scores accumulated that is in the points variable and put it into local Storage (as permanent storage)
function scoreStorage() {
  localStorage.setItem("scoreTotal", JSON.stringify(points));
}

// Is the main function that compares what the computer picks and the user pick then shows the result
function fightResult(userMove) {
  if (userMove === "Reset") {
    renderHistoryLog();
    console.log(historyLogArray);
    hasResetShown = true;
  } else {
    hasResetShown = false;
    let compMove = Math.random();
    let computerPick = "";
    let result = "";

    // using Math.random, we will determine the move of the computer randomly
    if (compMove >= 0 && compMove <= 1 / 3) {
      computerPick = "Rock";
    } else if (compMove > 1 / 3 && compMove <= 2 / 3) {
      computerPick = "Paper";
    } else if (compMove > 2 / 3 && compMove <= 1) {
      computerPick = "Scissors";
    }

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

function renderScore(user, comp, output) {
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

function renderHistoryLog() {
  let logHTML = "";

  for (let i = 0; i < historyLogArray.length; i++) {
    const logString = historyLogArray[i];
    const logElement = logString;
    logHTML += logElement;
  }
  document.querySelector(".log-container").innerHTML = logHTML;
}
