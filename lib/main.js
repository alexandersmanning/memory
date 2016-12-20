import Deck from "./deck";
import Game from "./game";
import View from "./view";
import Player from "./player";
import ComputerPlayer from "./computer_player";
	
document.addEventListener("DOMContentLoaded", () => {
	let game = newGame([new Player("green"), new ComputerPlayer("yellow")]);

	document.getElementById("1p").addEventListener("click", (e) => {
		game = newGame([new Player("green")]);
	});

	document.getElementById("1pv1p").addEventListener("click", (e) => {
		game = newGame([new Player("green"), new Player("yellow")]);
	});

	document.getElementById("1pv1c").addEventListener("click", (e) => {
		game = newGame([new Player("green"), new ComputerPlayer("yellow")]);
	});
	
});



const newGame = (players) => {
	// debugger
	let board = document.querySelector('#board');
	board.innerHTML = "";
	let game = new Game(players);
	// window.deck = game.gameDeck;
	let view = new View(game, board)
}