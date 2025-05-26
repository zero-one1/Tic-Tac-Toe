# 🎮 Tic Tac Toe Game (PvP & CPU Modes)

A responsive, browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript. It allows you to play against a friend (PvP) or against a simple computer AI (CPU). Includes a dark mode toggle, score tracking, and animated win/draw reactions.

---

## ✨ Features

🎮 Player vs Player mode
🤖 Player vs Computer mode
🌗 Dark/Light Mode toggle with localStorage support
📝 Player name input with validation
🧠 Smart turn-based logic
🏆 Scoreboard tracking
🔊 Win/Lose sound effects
🎉 Reaction modal with GIFs
🔁 Reset game button
📱 Responsive design

---

## 📁 Project Structure

tic-tac-toe/
├── index.html # Game layout and structure
├── style.css # Styling for layout, modal, dark mode, etc.
├── script.js # Game logic, mode handling, and interactivity
|── sound/
└── README.md # Project documentation

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript**

---

## 🧩 How to Play

1. Clone the repository or download the ZIP.
2. Open `index.html` in your browser.
3. Enter both player names (or choose CPU mode).
4. Click "Start Game".
5. Click on the grid to play turns.
6. The first player to align 3 marks wins.
7. Reset the board to play again.

---

## 🧠 AI Logic

In CPU mode, the AI plays randomly from the available cells. It does **not** use Minimax (yet).

---

## 🙌 Acknowledgments
Thanks to open-source media providers for sounds and GIFs used for reactions.

---

## 📦 Installation

No setup required! Just:

```bash
git clone https://github.com/your-username/tic-tac-toe.git
cd tic-tac-toe
open index.html
