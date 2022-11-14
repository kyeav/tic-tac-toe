const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBIS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElems = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMsgElem = document.getElementById("winningMsg");
const winningMsgTextElem = document.querySelector("[data-winning-msg-text]");
const restartButton = document.getElementById('restartButton')
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false;
  cellElems.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();

  winningMsgElem.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currClass = circleTurn ? O_CLASS : X_CLASS;
  console.log("clicked");
  // placeMark
  placeMark(cell, currClass);

  // check for win
  if (checkWin(currClass)) {
    console.log("winner");
    endGame(false);
  } else if (isDraw()) {
    // check for draw
    endGame(true);
  } else {
    // switch turns
    switchTurns();

    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgTextElem.innerText = "Draw!";
  } else {
    winningMsgTextElem.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winningMsgElem.classList.add("show");
}

function isDraw() {
  return [...cellElems].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currClass) {
  cell.classList.add(currClass);
}

function switchTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currClass) {
  return WINNING_COMBIS.some((combi) => {
    return combi.every((index) => {
      return cellElems[index].classList.contains(currClass);
    });
  });
}
