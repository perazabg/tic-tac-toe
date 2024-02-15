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

    const start = () => {
        players = [
            createPlayer(document.getElementById("player1").value, "X"),
            createPlayer(document.getElementById("player2").value, "O")
        ]
        
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };
    return {
        start,
    }
})();

startBtn.addEventListener("click", e => {
    Game.start();
});

restartBtn.addEventListener("click", e =>{
    Game.restart();
});