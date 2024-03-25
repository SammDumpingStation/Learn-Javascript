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
  renderLog();
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

  if (user === 'Rock') {
    document.querySelector(".user").innerHTML =`<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    }
    else if (user === 'Paper') {
    document.querySelector(".user").innerHTML =`<img src="Images-Folder/paperFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    }
    else if (user === 'Scissor') {
    document.querySelector(".user").innerHTML =`<img src="Images-Folder/scissorFrame.png" alt="rock" class="log-img user-img" /> <p class="user-description">${user}</p>`;
    }
    checksComputerMove(comp);
    checksResult(output);
  }

function checksComputerMove(comp) {
  if (comp === "Rock") {
    document.querySelector(
      ".computer"
    ).innerHTML = `<img src="Images-Folder/rockFrame.png" alt="rock" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  } else if (comp === "Paper") {
    document.querySelector(
      ".computer"
    ).innerHTML = `<img src="Images-Folder/paperFrame.png" alt="paper" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  } else if (comp === "Scissors") {
    document.querySelector(
      ".computer"
    ).innerHTML = `<img src="Images-Folder/scissorFrame.png" alt="scissor" class="log-img computer-img" /> <p class="computer-description">${comp}</p>`;
  }
}

function checksResult(output) {
  if (output === 'You Win') {
    document.querySelector(".result").innerHTML = `<img src="Images-Folder/win.png" alt="" class="log-img win-img" /> <p class="result-description">${output}</p>`;    
  }
  else if (output === 'You lose') {
    document.querySelector(
      ".result"
    ).innerHTML = `<img src="Images-Folder/lose.png" alt="" class="log-img lose-img" /> <p class="result-description">${output}</p>`;    
  }
  else if (output === 'Tie') {
    document.querySelector(".result").innerHTML = `<img src="Images-Folder/tie.png" alt="" class="log-img tie-img" /> <p class="result-description">${output}</p>`;    
  }
}

function renderLog() {
  let logHTML = "";
  for (let i = 0; i < userArray.length; i++) {
    const logString = userArray[i];
    const logElement = `<p class="rendered-log">${logString}</p>`;
    logHTML += logElement;
  }
  // document.querySelector(".history-logs-p").innerHTML = logHTML;
  console.log((document.querySelector(".log-div").innerHTML = logHTML));
}
