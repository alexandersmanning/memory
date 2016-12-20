import Deck from "./deck";
import Game from "./game";
import View from "./view";
import Player from "./player";
import ComputerPlayer from "./computer_player";
	
document.addEventListener("DOMContentLoaded", () => {

	document.getElementById("new-game").addEventListener("click", (e) => {
		window.location.reload();
	})

	document.getElementById("1p").addEventListener("click", (e) => {
		newGame([new Player("green")]);
	});

	document.getElementById("1pv1p").addEventListener("click", (e) => {
		newGame([new Player("green"), new Player("yellow")]);
	});

	document.getElementById("1pv1c").addEventListener("click", (e) => {
		newGame([new Player("green"), new ComputerPlayer("yellow")]);
	});
	
});

const newGame = (players) => {
	document.getElementById("button-modal").classList.toggle("hidden")
	let board = document.getElementById('board');
	board.innerHTML = "";
	
	let game = new Game(players);

	document.getElementById("score-box").classList.toggle("hidden");
	setUpScoreBoard(players);
	
	new View(game, board)
}

const setUpScoreBoard = (players) => {
	let labelText, text, playerContainer, scoreText; 
	let playerScores = document.getElementById("scores-by-player");

	players.forEach( player => {
		playerContainer = document.createElement("div");
		labelText = document.createElement("h4");
		labelText.innerHTML = `${player.color}: `
		playerContainer.appendChild(labelText);

		scoreText = document.createElement("h4");
		scoreText.id = `player-${player.color}-score`;
		scoreText.innerHTML = "0";
		playerContainer.appendChild(scoreText);

		playerScores.appendChild(playerContainer)
	})
}