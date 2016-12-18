class View {
	constructor(game, board) {
		this.game = game;
		this.board = board;
		this.canInteract = true;
	
		this.setupBoard();
		this.addListener();
	}

	setupBoard() {
		let li;
		let textNode;
		let deck = this.game.gameDeck;

		for (let i = 0; i < deck.cards.length; i++){
			li = document.createElement("li");
			li.className = "card unrevealed";
			li.id = i;

			this.board.appendChild(li);
		}
	}

	addListener() {
		this.board.addEventListener("click", (event) =>{
			this.makeMove(event.target);
		})
	}

	makeMove(li) {	
		if (this.canInteract) {
			try {
	      this.game.playMove(li.id);
	    } catch (e) {
	      alert("Invalid move! Try again.");
	      return;
	    }

	    let span = document.createElement("ul");
			let textNode = document.createTextNode(`${deck.cards[li.id].value} of ${deck.cards[li.id].suit}`);
			span.appendChild(textNode);
			li.appendChild(span)

			this.game.checkCards(this.hideCards.bind(this));
		}
	}

	hideCards(returnedCards) {
		this.canInteract = false;
		setTimeout(() => {
				returnedCards.forEach( idx => {
				document.getElementById(`${idx}`).innerHTML = '';
			});
			this.canInteract = true;
		}, 1000)
		
	}
}

export default View