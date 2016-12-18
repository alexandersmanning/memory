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

	playMove(id) {
		let idx = parseInt(id)
		if (this.validMove(idx)) {
			this.selectedCards.push(idx);
			this.gameDeck.setVisible(idx);
		} else {
				throw new Error('Is not valid card!');
		}
	}

	checkCards(hideCards) {
		if (this.selectedCards.length == 2 ){
				this.verifyMatch(hideCards);
			}
	}

	verifyMatch(hideCards) {
		let cardOne = this.gameDeck.cards[this.selectedCards[0]];
		let cardTwo = this.gameDeck.cards[this.selectedCards[1]];

		if (cardOne.value == cardTwo.value) { 
			this.currentPlayer.receiveMatch(this.selectedCards[0], this.selectedCards[1]) 
		} else {
			cardOne.hideCard();
			cardTwo.hideCard();
			hideCards(this.selectedCards);
		}

		this.selectedCards = [];
	}

	validMove(idx) {
		return !this.gameDeck.isVisible(idx);
	}

	swapPlayers() {
		if (this.currentPlayer === this.players[0]) {
			this.currentPlayer = this.players[1];
		}	else {
			this.currentPlayer = this.players[0];
		}
	}
}

export default Game;