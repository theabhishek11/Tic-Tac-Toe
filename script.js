const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const computerBtn = document.getElementById("computerBtn");

const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");

const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const popupDescription = document.getElementById("popupDescription");
const playAgainBtn = document.getElementById("playAgainBtn");

const winningCombinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let computerMode = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

let computerTimer = null;

cells.forEach(function(cell) {
cell.addEventListener("click", function() {
const index = Number(cell.dataset.index);
handleMove(index);
});
});

function handleMove(index) {
if (gameOver || board[index] !== "") {
return;
}

if (computerMode && currentPlayer === "O") {
    return;
}

makeMove(index, currentPlayer);

if (gameOver) {
    return;
}

if (computerMode) {
    currentPlayer = "O";
    statusText.textContent = "Computer is thinking...";

    cells.forEach(function(cell) {
        cell.disabled = true;
    });

    computerTimer = setTimeout(function() {
        computerTimer = null;

        if (gameOver) {
            return;
        }

        computerMove();

        if (!gameOver) {
            currentPlayer = "X";
            statusText.textContent = "Your turn (X)";

            cells.forEach(function(cell) {
                cell.disabled =
                    board[Number(cell.dataset.index)] !== "";
            });
        }
    }, 400);
} else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";
}

}

function makeMove(index, player) {
board[index] = player;

cells[index].textContent = player;
cells[index].classList.add(player.toLowerCase());
cells[index].disabled = true;

checkGameResult();

}

function checkGameResult() {
const winningCombination = winningCombinations.find(
function(combination) {
return combination.every(function(index) {
return board[index] !== "" &&
board[index] === board[combination[0]];
});
}
);

if (winningCombination) {
    gameOver = true;

    const winner = board[winningCombination[0]];

    winningCombination.forEach(function(index) {
        cells[index].classList.add("winning-cell");
    });

    if (winner === "X") {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }

    cells.forEach(function(cell) {
        cell.disabled = true;
    });

    showWinnerPopup(winner);

    return;
}

if (board.every(function(value) {
    return value !== "";
})) {
    gameOver = true;

    scoreDraw++;
    scoreDrawElement.textContent = scoreDraw;

    statusText.textContent = "It's a draw!";

    cells.forEach(function(cell) {
        cell.disabled = true;
    });

    showDrawPopup();
}

}

function showWinnerPopup(winner) {
if (computerMode) {
winnerMessage.textContent =
winner === "X" ? "🎉 You Win!" : "🤖 Computer Wins!";

    popupDescription.textContent =
        winner === "X"
            ? "Amazing! You defeated the computer."
            : "Good game! Try again to win.";
} else {
    winnerMessage.textContent =
        "🏆 Player " + winner + " Wins!";

    popupDescription.textContent =
        "Congratulations, Player " + winner + "!";
}

statusText.textContent =
    computerMode
        ? (winner === "X" ? "You won!" : "Computer won!")
        : "Player " + winner + " won!";

winnerPopup.classList.add("show");
playAgainBtn.focus();

}

function showDrawPopup() {
winnerMessage.textContent = "🤝 It's a Draw!";
popupDescription.textContent =
"Nobody won this round. Try again!";

winnerPopup.classList.add("show");
playAgainBtn.focus();

}

function computerMove() {
if (gameOver) {
return;
}

const emptyCells = board
    .map(function(value, index) {
        return value === "" ? index : -1;
    })
    .filter(function(index) {
        return index !== -1;
    });

if (emptyCells.length === 0) {
    return;
}

let move = findWinningMove("O");

if (move === -1) {
    move = findWinningMove("X");
}

if (move === -1 && board[4] === "") {
    move = 4;
}

if (move === -1) {
    const corners = [0, 2, 6, 8].filter(function(index) {
        return board[index] === "";
    });

    if (corners.length > 0) {
        move = corners[
            Math.floor(Math.random() * corners.length)
        ];
    }
}

if (move === -1) {
    move = emptyCells[
        Math.floor(Math.random() * emptyCells.length)
    ];
}

makeMove(move, "O");

}

function findWinningMove(player) {
for (const combination of winningCombinations) {
const values = combination.map(function(index) {
return board[index];
});

    const playerCount = values.filter(function(value) {
        return value === player;
    }).length;

    const emptyCount = values.filter(function(value) {
        return value === "";
    }).length;

    if (playerCount === 2 && emptyCount === 1) {
        return combination[values.indexOf("")];
    }
}

return -1;

}

function restartGame() {
if (computerTimer !== null) {
clearTimeout(computerTimer);
computerTimer = null;
}

board = Array(9).fill("");
currentPlayer = "X";
gameOver = false;

winnerPopup.classList.remove("show");

cells.forEach(function(cell) {
    cell.textContent = "";
    cell.disabled = false;

    cell.classList.remove(
        "x",
        "o",
        "winning-cell"
    );
});

statusText.textContent = computerMode
    ? "Your turn (X)"
    : "Player X's turn";

}

function resetScores() {
scoreX = 0;
scoreO = 0;
scoreDraw = 0;

scoreXElement.textContent = "0";
scoreOElement.textContent = "0";
scoreDrawElement.textContent = "0";

restartGame();

}

twoPlayerBtn.addEventListener("click", function() {
computerMode = false;

twoPlayerBtn.classList.add("active");
computerBtn.classList.remove("active");

restartGame();

});

computerBtn.addEventListener("click", function() {
computerMode = true;

computerBtn.classList.add("active");
twoPlayerBtn.classList.remove("active");

restartGame();

});

restartBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", resetScores);
playAgainBtn.addEventListener("click", restartGame);