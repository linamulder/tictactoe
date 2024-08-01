//first I need to create a Gameboard object to store the gameboard as an array
const gameBoard = {
  lettersArray: ["X", "O", "X", "O", "X", "O", "X", "O", "X"],
  playerOne: [],
  playerTwo: [],
  arrayOfOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  chosenSpots: {
    X: [],
    O: [],
  },
  winner: false,
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
    input = prompt("What is your player's move?");
    gameBoardController.checkTakenSpots(input);
    for (key in gameBoard.arrayOfOptions) {
      if (input == gameBoard.arrayOfOptions[key]) {
        let index = gameBoard.arrayOfOptions.indexOf(+input);
        gameBoard.arrayOfOptions.splice(index, 1);
        // console.log(gameBoard.arrayOfOptions);
        console.log(input + " has been taken!");
      }
    }
    gameBoardController.checkForWinner();
    // return { input };
  },

  functionThatChecksCombo: function (value1, value2, value3, arr, player) {
    if (arr.includes(value1) && arr.includes(value2) & arr.includes(value3)) {
      console.log(player + " has won");
      gameBoard.winner = true;
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
};

let consoleGame = function () {
  // the goal is to go back and forth until one player gets three in a row OR they tie.
  // in order to win, one player must score the combinations {0, 1, 2}, {0,3,6}, {0,4,8}, {1,4,7}, {2, 5, 8}, {2, 4, 6}, {3, 4, 5}, {6, 7 ,8}

  if (gameBoard.winner) {
    return;
  }

  if (gameBoard.arrayOfOptions.length === 0) {
    console.log("There is a tie!");
    return;
  }

  // chooseSpot();
  gameBoardController.chooseSpot();
  consoleGame();
};

// let checkTakenSpots = (input) => {
//   if (!gameBoard.arrayOfOptions.includes(+input)) {
//     console.log("please try again");
//   } else {
//     // push chosen spots into array
//     let nextInStack = gameBoard.lettersArray.pop();
//     gameBoard["chosenSpots"][`${nextInStack}`].push(+input);
//     console.log(gameBoard.chosenSpots);
//   }
// };

// let chooseSpot = function (spot) {
//   let input = spot;
//   input = prompt("What is your player's move?");
//   checkTakenSpots(input);
//   for (key in gameBoard.arrayOfOptions) {
//     if (input == gameBoard.arrayOfOptions[key]) {
//       let index = gameBoard.arrayOfOptions.indexOf(+input);
//       gameBoard.arrayOfOptions.splice(index, 1);
//       // console.log(gameBoard.arrayOfOptions);
//       console.log(input + " has been taken!");
//     }
//   }
//   checkForWinner();
//   return { input };
// };

// let checkForWinner = function () {
//   let arrX = gameBoard.chosenSpots.X;
//   let arrO = gameBoard.chosenSpots.O;

//   functionThatChecksCombo(0, 1, 2, arrX, "player 1");
//   functionThatChecksCombo(0, 3, 6, arrX, "player 1");
//   functionThatChecksCombo(0, 4, 8, arrX, "player 1");
//   functionThatChecksCombo(1, 4, 7, arrX, "player 1");
//   functionThatChecksCombo(2, 5, 8, arrX, "player 1");
//   functionThatChecksCombo(2, 4, 6, arrX, "player 1");
//   functionThatChecksCombo(3, 4, 5, arrX, "player 1");
//   functionThatChecksCombo(6, 7, 8, arrX, "player 1");

//   functionThatChecksCombo(0, 1, 2, arrO, "player 2");
//   functionThatChecksCombo(0, 3, 6, arrO, "player 2");
//   functionThatChecksCombo(0, 4, 8, arrO, "player 2");
//   functionThatChecksCombo(1, 4, 7, arrO, "player 2");
//   functionThatChecksCombo(2, 5, 8, arrO, "player 2");
//   functionThatChecksCombo(2, 4, 6, arrO, "player 2");
//   functionThatChecksCombo(3, 4, 5, arrO, "player 2");
//   functionThatChecksCombo(6, 7, 8, arrO, "player 2");
// };

// let functionThatChecksCombo = function (value1, value2, value3, arr, player) {
//   if (arr.includes(value1) && arr.includes(value2) & arr.includes(value3)) {
//     console.log(player + " has won");
//     gameBoard.winner = true;
//   }
// };

consoleGame();
