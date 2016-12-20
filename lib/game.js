import Deck from './deck';

//The game class controls all of the game logic, and is used by the view to verify and make updates based on user input

class Game {
	constructor(players) {
		this.gameDeck = new Deck();
		this.players = players;
		this.currentPlayer = players[0];
		this.selectedCards = [];
	}

	gameOver() {
		return this.gameDeck.allRevealed();
	}

	playTurn() {
		// This function is used by the computer player, and always returns undefined by a human player, in which a click action from the view directly calls playMove.

		//Actual click actions are performed by the computer to avoid having to put the view as part of the game. This decision has a number of positives and negatives, something I would love to discuss during an interview 

		let availableMoves = this.gameDeck.availableMoves();
		let nextMove = this.currentPlayer.getInput(availableMoves);
		if (nextMove !== undefined) { 
			setTimeout(() => {
				document.querySelector(`[id = '${nextMove}'] img`).click();
			}, 500);
		};
	}

	playMove(id) {
		//called by the view. This function verifies if a move is legal, and provide both players the revealed card if it is 

		let idx = parseInt(id)
		let guessSet;

		if (this.validMove(idx)) {
			this.selectedCards.push(idx);
			this.gameDeck.setVisible(idx);

			guessSet = [this.gameDeck.getCard(idx), idx]

			this.players.forEach(player => {
				player.receiveRevealedCard(...guessSet) 
			});

			if (!this.currentPlayer.previousGuess) {
				this.currentPlayer.setGuess(guessSet);
			}
		} else {
				throw new Error('Not a valid card');
		}
	}

	checkCards(hideCards) {
		// called by the view to check which move this is for the current player, and to verify the cards match if it is the second move 

		if (this.selectedCards.length === 2 ){
				this.verifyMatch(hideCards);
			} else {
				this.playTurn()
			}
	}

	verifyMatch(hideCards) {
		//When two cards have been selected, the system verifies if they match. If so, the match is sent to both players, if not the cards are hidden

		let cardOne = this.gameDeck.getCard(this.selectedCards[0]);
		let cardTwo = this.gameDeck.getCard(this.selectedCards[1]);

		if (cardOne.value == cardTwo.value) { 
			this.players.forEach(player => {
				player.receiveMatch(cardOne.value, this.selectedCards) 
			});

			this.setFound(this.currentPlayer.color);
			this.updateScore(this.currentPlayer);
			this.nextTurn();
		} else {
			cardOne.hideCard();
			cardTwo.hideCard();
			hideCards(this.selectedCards);
		}	
	}

	setFound(color) {
		//Marks the cards with the founding player's color 

		this.selectedCards.forEach( idx => {
			document.getElementById(`${idx}`).classList.add(`selected-${color}`);
		})
	}

	updateScore(player) {
		//Updates the views score element for each player

		player.matchFound();

		let scoreElement = document.getElementById(`player-${player.color}-score`)
		scoreElement.innerHTML = player.points;
	};

	nextTurn(){
		//this sets the next turn, clearing out the selected cards and guesses. 

		this.currentPlayer.setGuess(null);
		this.selectedCards = [];
		this.playTurn();
	}

	validMove(idx) {
		//for human players, this verifies that the clicked card is valid, by checking if it is revealed 

		return !this.gameDeck.isVisible(idx);
	}

}

export default Game;