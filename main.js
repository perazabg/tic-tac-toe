const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameStatus = document.getElementById("gameStatus");

const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""];

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

    const update = (index, value) =>{
        gameboard[index] = value;
        render();
    };

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
    }
})();

const createPlayer = (name, mark, score) => {
    return {
        name,
        mark,
        score
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = (e) => {
        players = [
            createPlayer(document.getElementById("player1").value, "X", 0),
            createPlayer(document.getElementById("player2").value, "O", 0)
        ]
        renderResults();
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        })
        document.getElementById("playerTurn").innerText = players[currentPlayerIndex].name + "'s Turn";
        document.getElementById("gameStatus").innerText = "Let's Play!";
        
    };

    const restart = () =>{
        currentPlayerIndex = 0;
        for(let i = 0; i < 9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render();
        document.getElementById("player1Score").innerText = 0;
        document.getElementById("player2Score").innerText = 0;
        gameOver = false;
    };

    const handleClick = (e) => {
        let index = parseInt(e.target.id.split("square")[1]);
        
        if(Gameboard.getGameboard()[index] !== ""){
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if(checkWin(Gameboard.getGameboard())){
            gameStatus.innerText = `${players[currentPlayerIndex].name} wins the round!`;
            gameOver = true;
            restart();
            if(currentPlayerIndex === 0){
                players[currentPlayerIndex].score++;
                renderResults();
            }else{
                players[currentPlayerIndex].score++;
                renderResults();
            }
            
        
            return;
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        document.getElementById("playerTurn").innerText = players[currentPlayerIndex].name + "'s Turn";
        renderResults();
    };

    const renderResults = () => {
        document.getElementById("player1Score").innerText = players[0].name + "'s Score: " + players[0].score;
        document.getElementById("player2Score").innerText = players[1].name + "'s Score: " + players[1].score;
    };

    return {
        start,
        restart,
        handleClick
    }
})();

function checkWin(board){
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

    if(board.every((square) => square !== "")){
        return gameStatus.innerText = "DRAW", Game.restart();
    }

    for(let i = 0; i < winCombos.length; i++){
        let [a, b, c] = winCombos[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false;
}

startBtn.addEventListener("click", () => {
    Game.start();
});

restartBtn.addEventListener("click", () =>{
    Game.restart();
});