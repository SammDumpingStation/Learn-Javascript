let yourMove = "";
let points = JSON.parse(localStorage.getItem("scoreTotal"));

console.log(points);

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
      result = "Tie";
    }
  }

  if (result === "You Win") {
    points.User++;
  } else if (result === "You lose") {
    points.Computer++;
  } else if (result === "Tie") {
    points.Tie++;
  }
  alert(
    `You picked ${userMove} while Computer picked ${computerPick}. ${result}.
  User: ${points.User} Computer: ${points.Computer} Tie: ${points.Tie}.`
  );
}
