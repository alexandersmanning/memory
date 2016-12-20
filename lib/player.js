// The player class is a simple class for assigning points, previous guess, and player color. The majority of the functions of this class are used by the computer player, therefore leading to 'duck typing'

class Player {
	constructor(color) {
		this.points = 0;
		this.previousGuess = null;
		this.color = color;
	}

	setGuess(valueSet) {
		// A method used for setting the previous guess, to avoid other objects directly updating instance variables

		this.previousGuess = valueSet;
	}

	matchFound() {
		this.points++;
	}

	receiveRevealedCard(card, idx){
		//duck typing
	}

	getInput(availableMoves) {
		//duck typing
	}

	receiveMatch(value, locations){
		//duck typing
	}

}

export default Player;