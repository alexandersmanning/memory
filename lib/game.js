import Deck from './deck';

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
		let availableMoves = this.gameDeck.availableMoves();
		let nextMove = this.currentPlayer.getInput(availableMoves);
		if (nextMove !== undefined) { 
			setTimeout(() => {
				document.querySelector(`[id = '${nextMove}'] img`).click();
			}, 500);
		};
	}

	playMove(id) {
		let idx = parseInt(id)
		let guessSet;

		if (this.validMove(idx)) {
			this.selectedCards.push(idx);
			this.gameDeck.setVisible(idx);
			guessSet = [this.gameDeck.cards[idx], idx]

			this.players.forEach(player => {
				player.receiveRevealedCard(...guessSet) 
			});

			if (!this.currentPlayer.previousGuess) {
				this.currentPlayer.previousGuess = guessSet;
			}
		} else {
				throw new Error('Not a valid card!');
		}
	}

	checkCards(hideCards) {
		if (this.selectedCards.length == 2 ){
				this.verifyMatch(hideCards);
			} else {
				this.playTurn()
			}
	}

	verifyMatch(hideCards) {
		let cardOne = this.gameDeck.cards[this.selectedCards[0]];
		let cardTwo = this.gameDeck.cards[this.selectedCards[1]];

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
		this.selectedCards.forEach( idx => {
			document.getElementById(`${idx}`).classList.add(`selected-${color}`);
		})
	}

	updateScore(player) {
		player.points++;
		let scoreElement = document.getElementById(`player-${player.color}-score`)
		scoreElement.innerHTML = player.points;
	};

	nextTurn(){
		this.currentPlayer.previousGuess = null;
		this.selectedCards = [];
		this.playTurn();
	}

	validMove(idx) {
		return !this.gameDeck.isVisible(idx);
	}

}

export default Game;