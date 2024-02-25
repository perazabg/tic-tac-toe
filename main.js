const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""]

    const render = () =>{
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square${index}">${square}</div>`
        })
        document.getElementById("gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        })
    };

    

    return {
        render,
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = (e) => {
        players = [
            createPlayer(document.getElementById("player1").value, "X"),
            createPlayer(document.getElementById("player2").value, "O")
        ]
        
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };

    const handleClick = (e) => {
        console.log(e.target.id);
    }
    return {
        start,
        handleClick
    }
})();

startBtn.addEventListener("click", () => {
    Game.start();
});

restartBtn.addEventListener("click", () =>{
    Game.restart();
});