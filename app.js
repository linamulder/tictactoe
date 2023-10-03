let didIWin = false;

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

gameBoard();

let eraseBoard = () => {
  didIWin = false;
  let board = document.querySelectorAll(".gridCell > h1");
  let winner = document.querySelectorAll(".winner > h1");
  board.forEach((one) => one.remove());
  winner.forEach((msg) => msg.remove());
};
