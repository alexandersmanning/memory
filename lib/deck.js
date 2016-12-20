import Card from './card';

//The deck class uses the below two constants to make a deck of 52 unique cards.

const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS = ["club","spade","diamond","heart"];

class Deck {
	constructor(){
		this.cards = this.setDeck();
	}

	setDeck(){
		// cycles through each suit, and then each value, creating 13 cards for each suit to be pushed into an array. This function then calls the shuffle deck function to create a randomized output

		let cardSet = [];
		SUITS.forEach(suit => {
			VALUES.forEach(value => {
				cardSet.push(new Card(suit, value))
			})
		})

		return this.shuffleDeck(cardSet);
	}

	shuffleDeck(cardSet){
		//This method takes a sorted deck, and randomly removes entries, which it pushes into a new array, until the original sorted deck is empty. This is currently O(n) time, and O(n) space. 

		let shuffled = [];
		let removedCard; 

		for (let i = cardSet.length; i > 0; i--) {
			removedCard = cardSet.splice(parseInt(Math.random() * i), 1)[0];
			shuffled.push(removedCard)
		}

		return shuffled;
	}

	isVisible(idx) {
		//Simple method to directly look at a card from a deck. This is to meet Demeter's law, in which an object is only talking to its closest neighbors 

		return this.cards[idx].revealed;
	}

	setVisible(idx) {
		//Same as is visible, this function is just to ensure that objects are only talking to their closest neighbors

		this.cards[idx].revealCard();
	}

	getCard(idx) {
		return this.cards[idx];
	}

	allRevealed() {
		//Simple method for telling the game if all cards are revealed, and therefore the game is over 
		
		for (let i = 0; i < this.cards.length; i++) {
			if (!this.cards[i].revealed) { return false }
		}
		return true;
	}

	availableMoves() {
		//creates a list of available moves, which is used by the computer class.

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