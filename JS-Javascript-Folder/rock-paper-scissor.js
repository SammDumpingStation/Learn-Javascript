let yourMove = "";
let points = JSON.parse(localStorage.getItem("scoreTotal"));
const winLoseDisplay = [];
const historyLogArray = [];
const resultArray = [];

// For dark mode later -->
// const html = document.querySelector("html");
// html.style.backgroundColor = "black";

// functions section

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

  result = winOrLose(computerPick, userMove);

  if (result === "You Win") {
    points.User++;
  } else if (result === "You lose") {
    points.Computer++;
  } else if (result === "Tie") {
    points.Tie++;
  }
  renderScore(userMove, computerPick, result);
  renderLog(userMove);
}

function winOrLose(computerPick, userMove) {
  let result = '';
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
      result = "Tie";
    }
  }
  return result;
}

function renderScore(user, comp, output) {
  let render = document.querySelector(".render-score");
  let message = "";
  let checkedUserMove = '';
  let checkedComputerMove = '';
  let checkedResult  = '';
  let divInsideHistoryLog = '';
  if (user === "reset" || comp === "reset" || output === "reset") {
    render.innerHTML = `Scores have been reseted to 0! Start picking a move again!`;
    message = `<p class="rendered-log">Scores have been reseted to 0!</p>`;
    winLoseDisplay.unshift(message);
  } else {
    render.innerHTML = `You picked ${user} while Computer picked ${comp}. ${output}. User: ${points.User} Computer: ${points.Computer} Tie: ${points.Tie}.`;
    message = `User: ${user}. Computer: ${comp}. Result: ${output}`;
    winLoseDisplay.unshift(message);

    checkedUserMove = checkUserMove(user);
    checkedResult = checksResult(output);
    checkedComputerMove = checksComputerMove(comp);

    divInsideHistoryLog = `<div class="log-div"> <div class="log-img-container user">${checkedUserMove}</div><div class="log-img-container result">${checkedResult}</div><div class="log-img-container computer">${checkedComputerMove}</div></div>`;
    historyLogArray.unshift(divInsideHistoryLog);
  }
}

function checkUserMove(user) {
  let checkedUserMove = "";
    if (user === "Rock") {
      checkedUserMove = `<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    } else if (user === "Paper") {
      checkedUserMove = `<img src="Images-Folder/paperFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    } else if (user === "Scissors") {
      checkedUserMove = `<img src="Images-Folder/scissorFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    }
  return checkedUserMove;
}

function checksComputerMove(comp) {
  let checkedComputerMove = '';

  if (comp === "Rock") {
    checkedComputerMove =  `<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  } else if (comp === "Paper") {
    checkedComputerMove = `<img src="Images-Folder/paperFrame.png" alt="paper" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  } else if (comp === "Scissors") {
    checkedComputerMove= `<img src="Images-Folder/scissorFrame.png" alt="scissor" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  }
  return checkedComputerMove;
}

function checksResult(output) {
  let checkedResult = '';
  if (output === "You Win") {
    checkedResult = `<img src="Images-Folder/win.png" alt="" class="log-img win-img" /> <p class="result-description">${output}</p>`;
  } else if (output === "You lose") {
    checkedResult = `<img src="Images-Folder/lose.png" alt="" class="log-img lose-img" /> <p class="result-description">${output}</p>`;
  } else if (output === "Tie") {
    checkedResult = `<img src="Images-Folder/tie.png" alt="" class="log-img tie-img" /> <p class="result-description">${output}</p>`;
  }
  return checkedResult;
}

function renderLog(user) {
  let logHTML = "";

  for (let i = 0; i < historyLogArray.length; i++) {
    const logString = historyLogArray[i];
    const logElement = logString;
    logHTML += logElement;
  }
  document.querySelector(".log-container").innerHTML = logHTML;
}

