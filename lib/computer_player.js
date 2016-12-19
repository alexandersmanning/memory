import Player from './player';

class ComputerPlayer extends Player {
	constructor() {
		super();
		this.seenCards = {};
	}

	receiveRevealedCard(card, idx) {
		let baseSet = (this.seenCards[card.value] || []);
		if (baseSet.indexOf(idx) < 0) {
			this.seenCards[card.value] = baseSet.concat(idx);
		}

		// if (!this.previousGuess) { this.previousGuess = [card.value, idx] }
	}

	receiveMatch(value, locations){
		let foundIdx;
		this.points++;

		locations.forEach(idx => {
			foundIdx = this.seenCards[value].indexOf(idx);
			if (foundIdx >= 0) { this.seenCards[value].splice(foundIdx, 1)}
		});
	}

	getInput(availableMoves) {
		this.availableMoves = availableMoves;

		if (this.previousGuess) { return this.makeSecondGuess() }
			else { return this.makeFirstGuess() }
	}

	makeFirstGuess() {
		//check if any two are revealed
		return this.checkUnmatchedPositions() || this.randomPosition();
	};

	makeSecondGuess() {
		return this.checkPreviousMatch() || this.randomPosition();
	};

	checkUnmatchedPositions(){
		//check all values of seen cards to find cases where there is more than one idx and both are available moves
		let count = [];
		let seenValues = Object.keys(this.seenCards);
		let cardValue;

		for (let i in seenValues) {
			cardValue = seenValues[i];
			if(this.seenCards[cardValue].length >= 2) {
				//check count of cards in available moves 
				this.seenCards[cardValue].forEach( idx => {
					if(this.availableMoves.indexOf(idx) >= 0) {
						count.push(idx);
					}
				});
				if (count.length > 1){ return count[0] };
			}
		}
	}

	checkPreviousMatch(){
		// find if the seen cards contain the value, and if that value is a valid guess
		let value, idx, seenMoves;

		if (this.previousGuess) {
			value = this.previousGuess[0].value;
			idx = this.previousGuess[1];
			seenMoves = this.seenCards[value] || [];

			for (let i = 0; i < seenMoves.length; i++){
				if(seenMoves[i] !== idx && this.availableMoves.indexOf(seenMoves[i]) >= 0) {
					return seenMoves[i];
				}
			}
		}
	}

	randomPosition() {
		let randomIdx = parseInt(Math.random() * this.availableMoves.length)
		return this.availableMoves[randomIdx];
	}
};

export default ComputerPlayer;