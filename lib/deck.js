import Card from './card';

const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS = ["Clubs","Spades","Diamonds","Hearts"];

class Deck {
	constructor(){
		this.cards = this.setDeck();
	}

	setDeck(){
		let cardSet = [];
		SUITS.forEach(suit => {
			VALUES.forEach(value => {
				cardSet.push(new Card(suit, value))
			})
		})

		return this.shuffleDeck(cardSet);
	}

	shuffleDeck(cardSet){
		let shuffled = [];
		let removedCard; 

		for (let i = cardSet.length; i > 0; i--) {
			removedCard = cardSet.splice(parseInt(Math.random() * i), 1)[0];
			shuffled.push(removedCard)
		}

		return shuffled;
	}

	isVisible(idx) {
		return this.cards[idx].revealed;
	}

	setVisible(idx) {
		this.cards[idx].revealCard();
	}

	allRevealed() {
		for (let i = 0; i < this.cards.length; i++) {
			if (!this.cards[i].revealed) { return false }
		}
		return true;
	}

	availableMoves() {
		let validList = [];

		for (let i = 0; i < this.cards.length; i++) {
			if(!this.cards[i].revealed) { 
				validList.push(i);
			}
		}
		return validList;
	}
}


export default Deck;