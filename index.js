const winCombos = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[3, 4, 5],
	[6, 4, 2],
	[6, 7, 8]
]


const cells = document.querySelectorAll('.cell');
const xCount = document.querySelector('.x-count');
const yCount = document.querySelector('.y-count');
const table = document.querySelector('table');
xCount.innerHTML = 0;
yCount.innerHTML = 0;
var numBoard;
const youPlayer = 'O';
const aiPlayer = 'X';

startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	table.classList.add('animated');
	table.classList.add('jackInTheBox');
	numBoard = Array.from(Array(9).keys());
	cells.forEach(e => e.innerText = "");
    cells.forEach(e => e.addEventListener("click", turnClick, false));
}

function turnClick(event) {
	console.log("clicked");
	if (typeof numBoard[event.target.id] == 'number') {
        turn(event.target.id, youPlayer)
		if (!checkWin(numBoard, youPlayer) && !checkTie()) {
			return setTimeout(() => turn(bestSpot(), aiPlayer), 1000); 
			console.log(bestSpot);
    }
}
}

function turn(id, player) {
	numBoard[id] = player;

	document.getElementById(id).innerText = player;
	let winner = checkWin(numBoard, player);
	if (winner) gameOver(winner)
}

function checkWin(board, player) {
	let winner = null;

	let myArr = board.reduce((acc, cur, i) =>  
		(cur === player) ? acc.concat(i) : acc
		,[]);


	for (let elem of winCombos) {
		if (elem.every(e => myArr.indexOf(e) > -1)) {
			winner = {player: player};
			
		}
	}
	return winner;
}

function gameOver(winner) {
    var winCount = winner.player == youPlayer ? xCount.innerHTML++ : yCount.innerHTML++
    declareWinner(winner.player == youPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
	table.classList.remove('animated');
	table.classList.remove('jackInTheBox');
}

function bestSpot() {
	return minimax(numBoard, aiPlayer).index;
}

function emptySquares() {
	return numBoard.filter(s => typeof s == 'number');
}

function checkTie() {
	if (emptySquares().length == 0) {
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
var count = 0;
// function minimax(newBoard, player) {
// 	var availSpots = emptySquares();
// 	var move = {
// 		score: 0
// 	};
// 	count++;
// 	console.log(count);

// 	if (checkWin(newBoard, youPlayer)) {
// 		return move.score -= 10;
// 	} else if (checkWin(newBoard, aiPlayer)) {
// 		return move.score += 10;
// 	} else if (availSpots.length === 0) {
// 		return move.score;
// 	}
// 	var moves = [];
// 	for (var i = 0; i < availSpots.length; i++) {
// 		move.index = newBoard[availSpots[i]];
// 		newBoard[availSpots[i]] = player;

// 		if(!checkWin(newBoard, aiPlayer) && availSpots.length !== 0) {
// 			var nextPlayer = player === aiPlayer ? youPlayer : aiPlayer ;
		
// 			minimax(newBoard, nextPlayer);
		
// 		}

// 		newBoard[availSpots[i]] = move.index;
		
// 		moves.push(move);
// 	}

// 	var bestMove;
// 	if(player === aiPlayer) {
// 		var bestScore = -10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score > bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = i;
// 			}
// 		}
// 	} else {
// 		var bestScore = 10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score < bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = i;
// 			}
// 		}
// 	}

// 	return moves[bestMove];
// }


function minimax(newBoard, player) {
	var availSpots = emptySquares();


	if (checkWin(newBoard, youPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
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






