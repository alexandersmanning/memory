class Player {
	constructor(color) {
		this.points = 0;
		this.previousGuess = null;
		this.color = color;
	}

	receiveRevealedCard(card, idx){
		//duck typing
	}

	getInput(availableMoves) {
		//duck typing
	}

	receiveMatch(value, locations){
		this.points++;
	}
}

export default Player;