class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
		this.revealed = false;
	}

	revealCard(){
		this.revealed = true;
	}

	hideCard(){
		this.revealed = false;
	}

	getValue(){
		if (this.revealed) { return this.value }
	}
}

export default Card;