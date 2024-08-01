const gameBoard = {
  lettersArray: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
  arrayOfOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  chosenSpots: {
    X: [],
    O: [],
  },
  winner: false,
  winningPlayer: "",
};

const gameBoardController = {
  checkTakenSpots: (input) => {
    if (!gameBoard.arrayOfOptions.includes(+input)) {
      console.log("please try again");
    } else {
      // push chosen spots into array
      let nextInStack = gameBoard.lettersArray.pop();
      gameBoard["chosenSpots"][`${nextInStack}`].push(+input);
      console.log(gameBoard.chosenSpots);
    }
  },

  chooseSpot: function (spot) {
    let input = spot;
    // input = prompt("What is your player's move?");
    gameBoardController.checkTakenSpots(input);
    for (key in gameBoard.arrayOfOptions) {
      if (input == gameBoard.arrayOfOptions[key]) {
        let index = gameBoard.arrayOfOptions.indexOf(+input);
        gameBoard.arrayOfOptions.splice(index, 1);
        console.log(input + " has been taken!");
      }
    }
    gameBoardController.checkForWinner();
  },

  functionThatChecksCombo: function (value1, value2, value3, arr, player) {
    if (arr.includes(value1) && arr.includes(value2) & arr.includes(value3)) {
      console.log(player + " has won");
      gameBoard.winner = true;
      gameBoard.winningPlayer = player;
    }
  },

  checkForWinner: function () {
    let arrX = gameBoard.chosenSpots.X;
    let arrO = gameBoard.chosenSpots.O;

    gameBoardController.functionThatChecksCombo(0, 1, 2, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(0, 3, 6, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(0, 4, 8, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(1, 4, 7, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(2, 5, 8, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(2, 4, 6, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(3, 4, 5, arrX, "player 1");
    gameBoardController.functionThatChecksCombo(6, 7, 8, arrX, "player 1");

    gameBoardController.functionThatChecksCombo(0, 1, 2, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(0, 3, 6, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(0, 4, 8, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(1, 4, 7, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(2, 5, 8, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(2, 4, 6, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(3, 4, 5, arrO, "player 2");
    gameBoardController.functionThatChecksCombo(6, 7, 8, arrO, "player 2");
  },
  restartGame: function () {
    gameBoard.lettersArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    gameBoard.arrayOfOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    gameBoard.chosenSpots.X = [];
    gameBoard.chosenSpots.O = [];
    gameBoard.winner = false;
    gameBoard.winningPlayer = "";
  },
};

const display = {
  letters: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
  h1: function () {
    let letter = document.createElement("h1");
    letter.textContent = this.letters.pop();
    return { letter };
  },
  lettersOnCell: function () {
    document.querySelectorAll(".gridCell").forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!cell.hasChildNodes() && gameBoard.winner == false) {
          let { letter } = display.h1();
          e.target.appendChild(letter);
        }
      });
    });
  },
  start2PersonGame: function () {
    document.querySelectorAll(".gridCell").forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!gameBoard.winner) {
          let cellNum = "";
          cellNum = e.target.getAttribute("data-cell");
          // this initiates the game
          gameBoardController.chooseSpot(+cellNum);
          this.ifNoOneWins();
          this.ifSomeoneWins();
        }
      });
    });
  },
  restartGameDisplay: function () {
    this.letters = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    gameBoardController.restartGame();
    document.querySelectorAll(".gridCell").forEach((cell) => {
      while (cell.firstChild) {
        cell.firstChild.remove();
      }
    });
    document.querySelector(".winner").firstChild.remove();
  },
  ifNoOneWins: function () {
    let text = document.createElement("h1");
    text.textContent = "Tie!";
    if (gameBoard.arrayOfOptions.length == 0 && gameBoard.winner == false) {
      document.querySelector(".winner").appendChild(text);
    }
  },
  ifSomeoneWins: function () {
    let text = document.createElement("h1");
    text.textContent = `${gameBoard.winningPlayer} wins!`;
    if (gameBoard.winner) {
      document.querySelector(".winner").appendChild(text);
    }
  },
};

const displayGame = function () {
  document.querySelector(".restart").addEventListener("click", () => {
    display.restartGameDisplay();
  });

  document.querySelector(".twoPlayers").addEventListener("click", () => {
    display.lettersOnCell();
    display.start2PersonGame();
  });
};

displayGame();
