let userMove = "";
let result = "";
let points = {
  Computer: 0,
  User: 0,
  Tie: 0,
};

function computerMove() {
  let compMove = Math.random();
  let pick = "";
  if (compMove >= 0 && compMove <= 1 / 3) {
    pick = "Rock";
  } else if (compMove > 1 / 3 && compMove <= 2 / 3) {
    pick = "Paper";
  } else if (compMove > 2 / 3 && compMove <= 1) {
    pick = "Scissors";
  }
  return pick;
}

function fightResult(userMove) {
  let computerPick = computerMove();
  if (computerPick === "Rock") {
    if (userMove === "Rock") {
      result = "Tie";
    } else if (userMove === "Paper") {
      result = "You Win";
    } else if (userMove === "Scissors") {
      result = "You Lose";
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
