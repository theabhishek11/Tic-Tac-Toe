# 🎮 Tic Tac Toe Game

A simple, interactive, and responsive Tic Tac Toe game built using **HTML, CSS, and JavaScript**. Play with a friend in two-player mode or challenge the computer in single-player mode.

## 🚀 Live Demo

[https://tictactoe-bd9e65.tiiny.site]


## ✨ Features

* 🎯 **Two Player Mode** – Play with your friends.
* 🤖 **Computer Mode** – Challenge the computer.
* 🏆 **Winner Detection** – Automatically detects the winner.
* 📊 **Scoreboard** – Tracks Player X, Player O, and draw scores.
* 🎉 **Winner Popup** – Displays a popup when someone wins or the game ends in a draw.
* 🔄 **Restart Game** – Restart the current match.
* ♻️ **Reset Scores** – Reset all scoreboard values.
* 📱 **Responsive Design** – Works on desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

* **HTML5** – Structure of the game.
* **CSS3** – Styling, animations, and responsive design.
* **JavaScript** – Game logic, player turns, computer moves, and winner detection.

## 📂 Project Structure

tic-tac-toe/
│
├── index.html
├── style.css
├── script.js
└── README.md

## 🎮 How to Play

1. Open the game in your browser.
2. Select **Two Player** or **Play vs Computer** mode.
3. Player X starts the game.
4. Click on any empty box to make your move.
5. The first player to get three marks in a row, column, or diagonal wins.
6. If all nine boxes are filled and nobody wins, the game ends in a draw.
7. Click **Play Again** to start a new round.

## 🤖 Computer Mode

The computer uses a basic move-selection strategy:

* First, it checks whether it can win.
* If it cannot win, it tries to block the player's winning move.
* It prefers the center position.
* It then tries available corners.
* Finally, it selects a random empty cell.

## 💻 How to Run Locally

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_LINK
   ```

2. Open the project folder:

   ```bash
   cd tic-tac-toe
   ```

3. Open `index.html` in your browser.

   Alternatively, use the **Live Server** extension in VS Code.

## 📚 What I Learned

While building this project, I practiced:

* HTML page structure.
* CSS styling and responsive layouts.
* JavaScript DOM manipulation.
* Event listeners and functions.
* Arrays and conditional statements.
* Game logic and winning combinations.
* Basic problem-solving and debugging.

## 🔮 Future Improvements

* Add difficulty levels for the computer.
* Implement an unbeatable AI using the Minimax algorithm.
* Add sound effects.
* Add player names.
* Save scores using Local Storage.

## 👨‍💻 Author

**Abhishek Kumar**

A student passionate about web development and programming Also in AIML .