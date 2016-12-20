import ComputerPlayer from "./computer_player";


//this is the main class the interacts and updates the DOM. It translates user interactions into game actions

class View {
	constructor(game, board) {
		this.game = game;
		this.board = board;
		this.gameStatus = document.getElementById("game-status");
		this.canInteract = true;
	
		this.setupBoard();
		this.addListener();
	}

	setupBoard() {
		//sets up the DOM to contain an item for each card;

		let li;
		let textNode;
		let deck = this.game.gameDeck;

		for (let i = 0; i < deck.cards.length; i++){
			li = document.createElement("li");
			li.className = "card";
			li.id = i;

			this.faceDown(li);
			this.board.appendChild(li);
		}
	}

	addListener() {
		// Adds a simple even listener on the board, check a click on a card bubbles up to the list item, which is then acted upon using the make move function

		this.board.addEventListener("click", (event) =>{
			this.makeMove(event.target.parentElement);
		})
	}

	makeMove(li) {	
		if (this.canInteract) {
			this.gameStatus.innerHTML = "";
			try {
	      this.game.playMove(li.id);
	    } catch (e) {
	    	this.gameStatus.innerHTML = "Not a valid card";
	      return;
	    }

	    this.displayCard(li);
			this.game.checkCards(this.hideCards.bind(this));

			if (this.game.gameOver()) {
				this.canInteract = false;
				this.gameStatus.innerHTML = "Game Over"
				document.body.classList.remove("disable-click");
			}
		}
	}

	displayCard(li) {
		//Adds a span for the displayed card, including suit and value 

		let deck = this.game.gameDeck;
		li.innerHTML = '';
		let span = document.createElement("span");
		span.className = "card-info"

		let suit = document.createElement("img");
		suit.src = `assets/images/card_${deck.cards[li.id].suit}.png`;
		suit.className = "suit"

		let value = document.createElement("h2");
		value.innerHTML = `${deck.cards[li.id].value}`
		
		span.appendChild(suit);
		span.appendChild(value);

		li.appendChild(span);
	}

	faceDown(li) {
		li.innerHTML = '';
		let span = document.createElement("span");
		span.className = "card-back";

		let back = document.createElement("img");
		back.src = `assets/images/card_back.jpg`;
		back.className = "card-back";

		li.appendChild(back);
	}

	hideCards(returnedCards) {
		//disables the users ability to click white awaiting for the cards to flip back over 

		this.canInteract = false;
		setTimeout(() => {
				returnedCards.forEach( idx => {
				this.faceDown(document.getElementById(`${idx}`));
			});
	
			if (this.game.players.length > 1) {
				this.swapPlayers();
			} else { this.canInteract = true }

			this.game.nextTurn();

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

		document.getElementById("current-player-id").innerHTML = this.game.currentPlayer.color; 

		this.setInteraction(this.game.currentPlayer);
	}

	setInteraction(player) {
		//disables clicking until it is the players turn 
		if (player instanceof ComputerPlayer) {
			document.body.classList.add("disable-click");
		} else {
			document.body.classList.remove("disable-click");
		}

		this.canInteract = true;
	}
}

export default View