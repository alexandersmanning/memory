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
		//get the available moves
		//call getInput with them;
		let availableMoves = this.gameDeck.availableMoves();
		let nextMove = this.currentPlayer.getInput(availableMoves);
		if (nextMove !== undefined) { 
			document.querySelector(`[id = '${nextMove}'] img`).click();
			// document.getElementById(`${nextMove}`).click()
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
				setTimeout(() => { this.playTurn() }, 500);
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
			//wait between turns as computer
			setTimeout(() => { this.nextTurn() }, 1000);
		} else {
			console.log(`hide ${cardOne.value}, hide ${cardTwo.value}`)
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