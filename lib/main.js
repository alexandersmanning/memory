import Deck from "./deck";
import Game from "./game";
import View from "./view";
import Player from "./player";
import ComputerPlayer from "./computer_player";
	
document.addEventListener("DOMContentLoaded", () => {
	let board = document.querySelector('#board');
	// This is where players are created. Need a way to get the  user to choose
	let game = new Game([new Player(), new ComputerPlayer()]);
	window.deck = game.gameDeck;
	new View(game, board)
	//I have a game screen in which the user chooses the type of game and number of players

	//I have a main screen in which cards are dealt face down (dom elements created). Each one will have an id going to the index of the card. Each card with have a visible/back/complete status

});