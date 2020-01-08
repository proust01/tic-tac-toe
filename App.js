const winCombo = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

var cell = Array.from(document.querySelectorAll(".cell")); 
var youPlayer = 'X';
var aiPlayer = 'O';
var numBoard;

const startGame = () => {    
    numBoard = Array.from(Array(9).keys());
    console.log(cell);
    document.querySelector('.endgame').style.display = 'none';
    cell.forEach(e => e.innerText = "");
    cell.forEach(e => e.addEventListener("click", turnClick));
};

const turnClick = (e) => {
    console.log("clicked");
    
    if (typeof numBoard[e.target.id] == 'number') {
        turn(e.target.id, youPlayer)
        if (!checkWinner(numBoard, youPlayer) && !checkTie()) {
            return setTimeout(() => turn(bestSpot(), aiPlayer), 1000);
        }
    }
};

function turn(id, player) {
    numBoard[id] = player;
	document.getElementById(id).innerText = player;
    let gameWon = checkWinner(numBoard, player);
    if (gameWon) gameOver(gameWon)
}

const checkWinner = (board, player) => {
    let log = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    
    for (let [index, elem] of winCombo.entries()) {
		if (elem.every(e => log.indexOf(e) > -1)) {
            gameWon = {index: index, player: player};
			break;
		}
	}
	
    return gameWon;
};

function gameOver(gameWon) {
	declareWinner(gameWon.player == youPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

var gameWon = () => {
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.text').innerHTML = "You've won!!";
}

const endGame = () => {
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.text').innerHTML = 'Tie';
}

function emptySquares() {
	return numBoard.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cell.length; i++) {
            cell[i].style.backgroundColor = "green";
			cell[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}


// AI ALGORITHM

function bestSpot() {
    return minimax(numBoard, aiPlayer).index;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWinner(newBoard, youPlayer)) {
		return {score: -10};
	} else if (checkWinner(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, youPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}


startGame();
