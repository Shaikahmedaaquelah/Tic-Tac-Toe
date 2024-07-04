// DOM elements
const cells = document.querySelectorAll('.board__cell');
const newGameButton = document.querySelector('.game-restart-btn');
const messageElement = document.getElementById('message');
const restartButton = document.querySelector('.popup__restart-btn');
const winPopup = document.getElementById('winPopup');

// Game variables
let count = 0;
let currentPlayer = 'X';
const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Function to disable all cells
const disableCells = () => {
  cells.forEach(cell => cell.disabled = true);
};

// Function to enable all cells
const enableCells = () => {
  cells.forEach(cell => {
    cell.disabled = false;
    cell.innerText = ''; // Clear cell text
  });
  messageElement.innerText = 'Sample Message';
};

// Function executed when a player wins
const winFunction = (player) => {
  disableCells();
  const winMessage = document.getElementById('winMessage');
  winMessage.innerText = `Player ${player} Wins!`;
  winPopup.classList.remove('hide');
};

// Function for draw
const drawFunction = () => {
  disableCells();
  messageElement.innerHTML = `<span>&#x1F60E;</span> <br> It's a Draw`;
};

// Check for win or draw
const checkWin = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const cellsValues = [cells[a].innerText, cells[b].innerText, cells[c].innerText];
    if (cellsValues.every(cell => cell === 'X') || cellsValues.every(cell => cell === 'O')) {
      winFunction(cellsValues[0]);
      return;
    }
  }
  if (count === 9) {
    drawFunction();
  }
};

// Event listeners for each cell
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.innerText === '') { // Check if cell is empty
      cell.innerText = currentPlayer;
      count++; // Increment move count
      checkWin(); // Check for win or draw
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
  });
});

// Event listener for New Game button
newGameButton.addEventListener('click', () => {
  count = 0; // Reset move count
  currentPlayer = 'X'; // Reset player
  enableCells(); // Enable all cells
  winPopup.classList.add('hide'); // Hide win pop-up
});

// Event listener for Restart Game button
restartButton.addEventListener('click', () => {
  count = 0; // Reset move count
  currentPlayer = 'X'; // Reset player
  enableCells(); // Enable all cells
  winPopup.classList.add('hide'); // Hide win pop-up
});
