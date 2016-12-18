import Deck from "./deck";
import Game from "./game";
import View from "./view";
import Player from "./player";

document.addEventListener("DOMContentLoaded", () => {
	let board = document.querySelector('#board');
	let game = new Game([new Player()]);
	window.deck = game.gameDeck;
	new View(game, board)
	//I have a game screen in which the user chooses the type of game and number of players

	//I have a main screen in which cards are dealt face down (dom elements created). Each one will have an id going to the index of the card. Each card with have a visible/back/complete status
	// Add state to disable play

});