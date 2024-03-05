class Gameboard {
    constructor() {
        this.gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    render() {
        let boardHTML = "";
        this.gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square${index}">${square}</div>`;
        });
        document.getElementById("gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", this.handleSquareClick.bind(this));
        });
    }

    update(index, value) {
        this.gameboard[index] = value;
        this.render();
    }

    getGameboard() {
        return this.gameboard;
    }

    handleSquareClick(e) {
        let index = parseInt(e.target.id.split("square")[1]);

        if (this.gameboard[index] !== "") {
            return;
        }

        game.handleClick(index);
    }
}

class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
        this.score = 0;
    }
}

class Game {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.gameboard = new Gameboard();
    }

    start() {
        this.players = [
            new Player(document.getElementById("player1").value, "X"),
            new Player(document.getElementById("player2").value, "O")
        ];
        this.renderResults();
        this.currentPlayerIndex = 0;
        this.gameOver = false;
        this.gameboard.render();
        document.getElementById("gameStatus").innerText = "Let's Play!";
    }

    restart() {
        this.currentPlayerIndex = 0;
        for (let i = 0; i < 9; i++) {
            this.gameboard.update(i, "");
        }
        document.getElementById("gameStatus").innerText = "Let's Play!";
        this.renderResults();
        this.gameOver = false;
    }

    handleClick(index) {
        this.gameboard.update(index, this.players[this.currentPlayerIndex].mark);

        if (this.checkWin(this.gameboard.getGameboard())) {
            document.getElementById("gameStatus").innerText = `${this.players[this.currentPlayerIndex].name} wins the round!`;
            this.gameOver = true;
            this.restart();
            if (this.currentPlayerIndex === 0) {
                this.players[this.currentPlayerIndex].score++;
                this.renderResults();
            } else {
                this.players[this.currentPlayerIndex].score++;
                this.renderResults();
            }
            return;
        }

        if (this.gameboard.getGameboard().every((square) => square !== "")) {
            document.getElementById("gameStatus").innerText = "DRAW";
            this.restart();
            return;
        }

        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        document.getElementById("gameStatus").innerText = `${this.players[this.currentPlayerIndex].name}'s Turn`;
    }

    checkWin(board) {
        let winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winCombos.length; i++) {
            let [a, b, c] = winCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    renderResults() {
        document.getElementById("player1Score").innerText = `${this.players[0].name}'s Score: ${this.players[0].score}`;
        document.getElementById("player2Score").innerText = `${this.players[1].name}'s Score: ${this.players[1].score}`;
    }
}

const game = new Game();

document.getElementById("startBtn").addEventListener("click", () => {
    game.start();
});

document.getElementById("restartBtn").addEventListener("click", () => {
    game.restart();
});