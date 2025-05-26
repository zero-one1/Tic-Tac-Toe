const toggle = document.getElementById('modeToggle');
toggle.checked = localStorage.getItem('dark') === 'true';
document.body.classList.toggle('dark-mode', toggle.checked);

toggle.addEventListener('change', function () {
  startSound.play();
  document.body.classList.toggle('dark-mode', this.checked);
  localStorage.setItem('dark', this.checked);
});
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const nameModal = document.getElementById('nameModal');
const player1Input = document.getElementById('player1Input');
const player2Input = document.getElementById('player2Input');
const startGameBtn = document.getElementById('startGameBtn');
const modeRadios = document.getElementsByName('mode');
const scoreX = document.getElementById('scoreX');
const scoreY = document.getElementById('scoreY');
const reactionModal = document.getElementById('reactionModal');
const reactionImage = document.getElementById('reactionImage');
const reactionText = document.getElementById('reactionText');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "pvp";
let player1Name = "Player 1";
let player2Name = "Player 2";
let scores = { X: 0, O: 0 };
function togglePlayer2Input() {
  const selectedMode = [...modeRadios].find(r => r.checked).value;
  if (selectedMode === 'cpu') {
    player2Input.value = "Computer";       
    player2Input.placeholder = "";        
    player2Input.disabled = true;          
  } else {
    player2Input.value = "";                
    player2Input.placeholder = "😺 Player 2 Name";  
    player2Input.disabled = false;         
  }
}

togglePlayer2Input();
[...modeRadios].forEach(radio => {
  radio.addEventListener('change', togglePlayer2Input);
});

nameModal.style.display = "flex";

startGameBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const selectedMode = [...modeRadios].find(r => r.checked).value;
  let p2 = "";

  if (!p1) {
    alert("Please enter Player 1 name!");
    player1Input.focus();
    return;  
  }

  if (selectedMode === "cpu") {
    p2 = "Computer";
  } else {
    p2 = player2Input.value.trim();
    if (!p2) {
      alert("Please enter Player 2 name!");
      player2Input.focus();
      return; 
    }
  }
  player1Name = p1;
  player2Name = p2;
  mode = selectedMode;

  document.querySelectorAll('.score-card')[0].querySelector('.score-label').textContent = player1Name;
  document.querySelectorAll('.score-card')[1].querySelector('.score-label').textContent = player2Name;

  resetBoard();
   mouseSound.play();
  nameModal.style.display = "none";
  gameActive = true;
  updateStatus();
});

function updateStatus() {
  if (!gameActive) return;
  if (mode === "pvp") {
    status.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn (${currentPlayer})`;
  } else {
    status.textContent = currentPlayer === "X" ? `${player1Name}'s turn (X)` : `Computer's turn (O)`;
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  if (mode === "cpu" && currentPlayer === "O") return; // Disable clicking during computer's turn

  makeMove(index, currentPlayer);
  if (mode === "cpu" && gameActive && currentPlayer === "O") {
    setTimeout(() => computerMove(), 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  if (checkWinner(player)) {
    endGame(`${player === "X" ? player1Name : player2Name} wins! 🎉`, player);
  } else if (board.every(cell => cell !== "")) {
    endGame("It's a draw! 😐");
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    updateStatus();
  }
   clickSound.play()
}

function computerMove() {
  let emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => board[i] === player));
}

function endGame(message, winner = null) {
  gameActive = false;
  status.textContent = message;
  showReaction(message);

  if (winner) {
    scores[winner]++;
    scoreX.textContent = scores.X;
    scoreY.textContent = scores.O;
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
   mouseSound.play();
  updateStatus();
}

function showReaction(message) {
  reactionText.textContent = message;
  reactionImage.src = message.includes("wins") ? 
    "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" :
    message.includes("draw") ? 
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" : 
    "";

  // === Play sound using JavaScript ===
  if (message.includes("wins")) {
    const winSound = new Audio("sounds/win-sound.mp3");
    winSound.play();
  } else {
    const tieSound = new Audio("sounds/game-over-39-199830.mp3");
    tieSound.play()
  }

  reactionModal.style.display = "flex";
  setTimeout(() => {
    reactionModal.style.display = "none";
  }, 2500);
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetBoard);

// === Sound Effects ===
const clickSound = new Audio("sounds/button-click(chosic.com).mp3");
const winSound = new Audio("sounds/win-sound.mp3");
const startSound = new Audio("sounds/ui-button-click-5-327756.mp3");
const mouseSound = new Audio("sounds/old-radio-button-click-97549.mp3");
const tieSound = new Audio("sounds/game-over-39-199830.mp3");