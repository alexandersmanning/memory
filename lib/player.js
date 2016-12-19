class Player {
	constructor() {
		this.points = 0;
		this.previousGuess = null;
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