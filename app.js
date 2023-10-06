let didIWin = false;
let AIarray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const gameBoard = () => {
  let gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
  let cells = document.querySelectorAll(".gridCell");
  let winner = document.querySelector(".winner");
  let message = document.createElement("h1");
  let isFilled = (cell1, cell2, cell3) => {
    if (
      cells[cell1].hasChildNodes() &&
      cells[cell2].hasChildNodes() &&
      cells[cell3].hasChildNodes()
    ) {
      if (
        cells[cell1].childNodes[0].textContent ==
          cells[cell2].childNodes[0].textContent &&
        cells[cell2].childNodes[0].textContent ==
          cells[cell3].childNodes[0].textContent
      ) {
        message.textContent =
          cells[cell3].childNodes[0].textContent + " player wins!";
        winner.appendChild(message);
        didIWin = true;
        console.log("you win!!");
        gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
      }
    }
  };

  let popOne = cells.forEach((cell) => {
    cell.addEventListener("click", function () {
      let letter = document.createElement("h1");
      if (!cell.hasChildNodes()) {
        letter.textContent = gameBoardArray.pop();
        cell.appendChild(letter);
        isFilled(0, 1, 2);
        isFilled(0, 3, 6);
        isFilled(0, 4, 8);
        isFilled(1, 4, 7);
        isFilled(2, 5, 8);
        isFilled(3, 4, 5);
        isFilled(6, 7, 8);
        isFilled(2, 4, 6);
        winOrTie();
      }
    });
  });

  let winOrTie = () => {
    if (gameBoardArray.length === 0 && didIWin == false) {
      message.textContent = "Tie!";
      winner.appendChild(message);
      gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
    }
  };
  return { cells, popOne };
};

let AI = () => {
  let gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
  let cells = document.querySelectorAll(".gridCell");
  let winner = document.querySelector(".winner");
  let message = document.createElement("h1");
  let isFilled = (cell1, cell2, cell3) => {
    if (
      cells[cell1].hasChildNodes() &&
      cells[cell2].hasChildNodes() &&
      cells[cell3].hasChildNodes()
    ) {
      if (
        cells[cell1].childNodes[0].textContent ==
          cells[cell2].childNodes[0].textContent &&
        cells[cell2].childNodes[0].textContent ==
          cells[cell3].childNodes[0].textContent
      ) {
        message.textContent =
          cells[cell3].childNodes[0].textContent + " player wins!";
        winner.appendChild(message);
        didIWin = true;
        console.log("you win!!");
        gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
      }
    }
  };

  // error is u dont want to slice from index of array, u want to slice the actually number in the array!!!
  let removeFromAI = (cell) => {
    let cellData = cell.getAttribute("data-cell");
    let parsedData = parseInt(cellData);
    let theCellData = AIarray.indexOf(parsedData);

    AIarray.splice(theCellData, 1);

    // console.log(cellData);
    // console.log(theCellData);
    // console.log(parsedData);
  };

  let popOne = cells.forEach((cell) => {
    cell.addEventListener("click", AIversion);

    function AIversion() {
      let letter = document.createElement("h1");
      let AIletter = document.createElement("h1");
      if (!cell.hasChildNodes()) {
        letter.textContent = gameBoardArray.pop();
        AIletter.textContent = gameBoardArray.pop();
        removeFromAI(cell);
        let aiChoice = Math.floor(Math.random() * AIarray.length);
        let choice = AIarray[aiChoice];
        console.log(aiChoice);
        console.log(choice);

        cell.appendChild(letter);
        if (AIarray.length === 0) {
          AIarray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        } else if (cells[choice] !== cell) {
          cells[choice].appendChild(AIletter);
          AIarray.splice(AIarray.indexOf(choice), 1);
          console.log(AIarray);
        }

        isFilled(0, 1, 2);
        isFilled(0, 3, 6);
        isFilled(0, 4, 8);
        isFilled(1, 4, 7);
        isFilled(2, 5, 8);
        isFilled(3, 4, 5);
        isFilled(6, 7, 8);
        isFilled(2, 4, 6);
        winOrTie();
      }
    }
  });

  let winOrTie = () => {
    if (gameBoardArray.length === 0 && didIWin == false) {
      message.textContent = "Tie!";
      winner.appendChild(message);
      gameBoardArray = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
    }
  };
  return { cells, popOne, AIversion };
};

let eraseBoard = () => {
  //   let { AIversion } = AI();
  //   let cells = document.querySelectorAll(".gridCell");

  didIWin = false;
  let board = document.querySelectorAll(".gridCell > h1");
  let winner = document.querySelectorAll(".winner > h1");
  board.forEach((one) => one.remove());
  winner.forEach((msg) => msg.remove());
  AIarray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  //   cells.forEach((cell) => {
  //     cell.removeEventListener("click", AIversion);
  //   });
};

document.querySelector(".AI").addEventListener("click", AI);
document.querySelector(".twoPlayers").addEventListener("click", gameBoard);
document.querySelector(".restart").addEventListener("click", eraseBoard);
