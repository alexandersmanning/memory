import ComputerPlayer from "./computer_player";

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
		if (this.canInteract || this.game.currentPlayer instanceof ComputerPlayer) {
			try {
	      this.game.playMove(li.id);
	    } catch (e) {
	    	//display error
	      return;
	    }

	    this.displayCard(li);
			this.game.checkCards(this.hideCards.bind(this));

			//check if game over
			if (this.game.gameOver()) {
				this.board.removeEventListener("click", this.makeMove)
				alert("game over!")
			}
		}
	}

	displayCard(li) {
		let span = document.createElement("ul");
		let textNode = document.createTextNode(`${deck.cards[li.id].value} of ${deck.cards[li.id].suit}`);
		span.appendChild(textNode);
		li.appendChild(span)
	}

	hideCards(returnedCards) {
		this.canInteract = false;
		setTimeout(() => {
				returnedCards.forEach( idx => {
				document.getElementById(`${idx}`).innerHTML = '';
			});
	
			if (this.game.players.length > 1) {
				this.swapPlayers();
			} else { this.canInteract = true }
		}, 1500)
	}

	swapPlayers(){
		//swap players happens in the view (vs the game), so that controls can be put on the view to avoid current player interaction;
		let currentPlayer = this.game.currentPlayer;
		let players = this.game.players; 

		if (currentPlayer === players[0]) {
			this.game.currentPlayer = players[1];
		} else {
			this.game.currentPlayer = players[0];
		}

		this.setInteraction(this.game.currentPlayer);
		this.game.nextTurn();
	}

	setInteraction(player) {
		if (player instanceof ComputerPlayer) {
			this.canInteract = false;
			document.body.classList.add("disable-click")
		} else {
			this.canInteract = true;
			document.body.classList.remove("disable-click")
		}
	}
}

export default View