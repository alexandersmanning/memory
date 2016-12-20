/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(3);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _view = __webpack_require__(4);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _player = __webpack_require__(6);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _computer_player = __webpack_require__(5);
	
	var _computer_player2 = _interopRequireDefault(_computer_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	
		document.getElementById("new-game").addEventListener("click", function (e) {
			window.location.reload();
		});
	
		document.getElementById("1p").addEventListener("click", function (e) {
			newGame([new _player2.default("green")]);
		});
	
		document.getElementById("1pv1p").addEventListener("click", function (e) {
			newGame([new _player2.default("green"), new _player2.default("yellow")]);
		});
	
		document.getElementById("1pv1c").addEventListener("click", function (e) {
			newGame([new _player2.default("green"), new _computer_player2.default("yellow")]);
		});
	});
	
	var newGame = function newGame(players) {
		document.getElementById("button-modal").classList.toggle("hidden");
		var board = document.getElementById('board');
		board.innerHTML = "";
	
		var game = new _game2.default(players);
	
		document.getElementById("score-box").classList.toggle("hidden");
		setUpScoreBoard(players);
	
		new _view2.default(game, board);
	};
	
	var setUpScoreBoard = function setUpScoreBoard(players) {
		var labelText = void 0,
		    text = void 0,
		    playerContainer = void 0,
		    scoreText = void 0;
		var playerScores = document.getElementById("scores-by-player");
	
		players.forEach(function (player) {
			playerContainer = document.createElement("div");
			labelText = document.createElement("h4");
			labelText.innerHTML = player.color + ": ";
			playerContainer.appendChild(labelText);
	
			scoreText = document.createElement("h4");
			scoreText.id = "player-" + player.color + "-score";
			scoreText.innerHTML = "0";
			playerContainer.appendChild(scoreText);
	
			playerScores.appendChild(playerContainer);
		});
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _card = __webpack_require__(2);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//The deck class uses the below two constants to make a deck of 52 unique cards.
	
	var VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var SUITS = ["club", "spade", "diamond", "heart"];
	
	var Deck = function () {
		function Deck() {
			_classCallCheck(this, Deck);
	
			this.cards = this.setDeck();
		}
	
		_createClass(Deck, [{
			key: "setDeck",
			value: function setDeck() {
				// cycles through each suit, and then each value, creating 13 cards for each suit to be pushed into an array. This function then calls the shuffle deck function to create a randomized output
	
				var cardSet = [];
				SUITS.forEach(function (suit) {
					VALUES.forEach(function (value) {
						cardSet.push(new _card2.default(suit, value));
					});
				});
	
				return this.shuffleDeck(cardSet);
			}
		}, {
			key: "shuffleDeck",
			value: function shuffleDeck(cardSet) {
				//This method takes a sorted deck, and randomly removes entries, which it pushes into a new array, until the original sorted deck is empty. This is currently O(n) time, and O(n) space. 
	
				var shuffled = [];
				var removedCard = void 0;
	
				for (var i = cardSet.length; i > 0; i--) {
					removedCard = cardSet.splice(parseInt(Math.random() * i), 1)[0];
					shuffled.push(removedCard);
				}
	
				return shuffled;
			}
		}, {
			key: "isVisible",
			value: function isVisible(idx) {
				//Simple method to directly look at a card from a deck. This is to meet Demeter's law, in which an object is only talking to its closest neighbors 
	
				return this.cards[idx].revealed;
			}
		}, {
			key: "setVisible",
			value: function setVisible(idx) {
				//Same as is visible, this function is just to ensure that objects are only talking to their closest neighbors
	
				this.cards[idx].revealCard();
			}
		}, {
			key: "getCard",
			value: function getCard(idx) {
				return this.cards[idx];
			}
		}, {
			key: "allRevealed",
			value: function allRevealed() {
				//Simple method for telling the game if all cards are revealed, and therefore the game is over 
	
				for (var i = 0; i < this.cards.length; i++) {
					if (!this.cards[i].revealed) {
						return false;
					}
				}
				return true;
			}
		}, {
			key: "availableMoves",
			value: function availableMoves() {
				//creates a list of available moves, which is used by the computer class.
	
				var validList = [];
	
				for (var i = 0; i < this.cards.length; i++) {
					if (!this.cards[i].revealed) {
						validList.push(i);
					}
				}
				return validList;
			}
		}]);
	
		return Deck;
	}();
	
	exports.default = Deck;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// The card class sets up attributes for each card, to be used by the deck
	
	var Card = function () {
		function Card(suit, value) {
			_classCallCheck(this, Card);
	
			this.suit = suit;
			this.value = value;
			this.revealed = false;
		}
	
		_createClass(Card, [{
			key: "revealCard",
			value: function revealCard() {
				this.revealed = true;
			}
		}, {
			key: "hideCard",
			value: function hideCard() {
				this.revealed = false;
			}
		}, {
			key: "getValue",
			value: function getValue() {
				if (this.revealed) {
					return this.value;
				}
			}
		}]);
	
		return Card;
	}();
	
	exports.default = Card;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _deck = __webpack_require__(1);
	
	var _deck2 = _interopRequireDefault(_deck);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//The game class controls all of the game logic, and is used by the view to verify and make updates based on user input
	
	var Game = function () {
		function Game(players) {
			_classCallCheck(this, Game);
	
			this.gameDeck = new _deck2.default();
			this.players = players;
			this.currentPlayer = players[0];
			this.selectedCards = [];
		}
	
		_createClass(Game, [{
			key: 'gameOver',
			value: function gameOver() {
				return this.gameDeck.allRevealed();
			}
		}, {
			key: 'playTurn',
			value: function playTurn() {
				// This function is used by the computer player, and always returns undefined by a human player, in which a click action from the view directly calls playMove.
	
				//Actual click actions are performed by the computer to avoid having to put the view as part of the game. This decision has a number of positives and negatives, something I would love to discuss during an interview 
	
				var availableMoves = this.gameDeck.availableMoves();
				var nextMove = this.currentPlayer.getInput(availableMoves);
				if (nextMove !== undefined) {
					setTimeout(function () {
						document.querySelector('[id = \'' + nextMove + '\'] img').click();
					}, 500);
				};
			}
		}, {
			key: 'playMove',
			value: function playMove(id) {
				//called by the view. This function verifies if a move is legal, and provide both players the revealed card if it is 
	
				var idx = parseInt(id);
				var guessSet = void 0;
	
				if (this.validMove(idx)) {
					this.selectedCards.push(idx);
					this.gameDeck.setVisible(idx);
	
					guessSet = [this.gameDeck.getCard(idx), idx];
	
					this.players.forEach(function (player) {
						player.receiveRevealedCard.apply(player, _toConsumableArray(guessSet));
					});
	
					if (!this.currentPlayer.previousGuess) {
						this.currentPlayer.setGuess(guessSet);
					}
				} else {
					throw new Error('Not a valid card');
				}
			}
		}, {
			key: 'checkCards',
			value: function checkCards(hideCards) {
				// called by the view to check which move this is for the current player, and to verify the cards match if it is the second move 
	
				if (this.selectedCards.length === 2) {
					this.verifyMatch(hideCards);
				} else {
					this.playTurn();
				}
			}
		}, {
			key: 'verifyMatch',
			value: function verifyMatch(hideCards) {
				var _this = this;
	
				//When two cards have been selected, the system verifies if they match. If so, the match is sent to both players, if not the cards are hidden
	
				var cardOne = this.gameDeck.getCard(this.selectedCards[0]);
				var cardTwo = this.gameDeck.getCard(this.selectedCards[1]);
	
				if (cardOne.value == cardTwo.value) {
					this.players.forEach(function (player) {
						player.receiveMatch(cardOne.value, _this.selectedCards);
					});
	
					this.setFound(this.currentPlayer.color);
					this.updateScore(this.currentPlayer);
					this.nextTurn();
				} else {
					cardOne.hideCard();
					cardTwo.hideCard();
					hideCards(this.selectedCards);
				}
			}
		}, {
			key: 'setFound',
			value: function setFound(color) {
				//Marks the cards with the founding player's color 
	
				this.selectedCards.forEach(function (idx) {
					document.getElementById('' + idx).classList.add('selected-' + color);
				});
			}
		}, {
			key: 'updateScore',
			value: function updateScore(player) {
				//Updates the views score element for each player
	
				player.matchFound();
	
				var scoreElement = document.getElementById('player-' + player.color + '-score');
				scoreElement.innerHTML = player.points;
			}
		}, {
			key: 'nextTurn',
			value: function nextTurn() {
				//this sets the next turn, clearing out the selected cards and guesses. 
	
				this.currentPlayer.setGuess(null);
				this.selectedCards = [];
				this.playTurn();
			}
		}, {
			key: 'validMove',
			value: function validMove(idx) {
				//for human players, this verifies that the clicked card is valid, by checking if it is revealed 
	
				return !this.gameDeck.isVisible(idx);
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _computer_player = __webpack_require__(5);
	
	var _computer_player2 = _interopRequireDefault(_computer_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//this is the main class the interacts and updates the DOM. It translates user interactions into game actions
	
	var View = function () {
		function View(game, board) {
			_classCallCheck(this, View);
	
			this.game = game;
			this.board = board;
			this.gameStatus = document.getElementById("game-status");
			this.canInteract = true;
	
			this.setupBoard();
			this.addListener();
		}
	
		_createClass(View, [{
			key: "setupBoard",
			value: function setupBoard() {
				//sets up the DOM to contain an item for each card;
	
				var li = void 0;
				var textNode = void 0;
				var deck = this.game.gameDeck;
	
				for (var i = 0; i < deck.cards.length; i++) {
					li = document.createElement("li");
					li.className = "card";
					li.id = i;
	
					this.faceDown(li);
					this.board.appendChild(li);
				}
			}
		}, {
			key: "addListener",
			value: function addListener() {
				var _this = this;
	
				// Adds a simple even listener on the board, check a click on a card bubbles up to the list item, which is then acted upon using the make move function
	
				this.board.addEventListener("click", function (event) {
					_this.makeMove(event.target.parentElement);
				});
			}
		}, {
			key: "makeMove",
			value: function makeMove(li) {
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
						this.gameStatus.innerHTML = "Game Over";
						document.body.classList.remove("disable-click");
					}
				}
			}
		}, {
			key: "displayCard",
			value: function displayCard(li) {
				//Adds a span for the displayed card, including suit and value 
	
				var deck = this.game.gameDeck;
				li.innerHTML = '';
				var span = document.createElement("span");
				span.className = "card-info";
	
				var suit = document.createElement("img");
				suit.src = "assets/images/card_" + deck.cards[li.id].suit + ".png";
				suit.className = "suit";
	
				var value = document.createElement("h2");
				value.innerHTML = "" + deck.cards[li.id].value;
	
				span.appendChild(suit);
				span.appendChild(value);
	
				li.appendChild(span);
			}
		}, {
			key: "faceDown",
			value: function faceDown(li) {
				li.innerHTML = '';
				var span = document.createElement("span");
				span.className = "card-back";
	
				var back = document.createElement("img");
				back.src = "assets/images/card_back.jpg";
				back.className = "card-back";
	
				li.appendChild(back);
			}
		}, {
			key: "hideCards",
			value: function hideCards(returnedCards) {
				var _this2 = this;
	
				//disables the users ability to click white awaiting for the cards to flip back over 
	
				this.canInteract = false;
				setTimeout(function () {
					returnedCards.forEach(function (idx) {
						_this2.faceDown(document.getElementById("" + idx));
					});
	
					if (_this2.game.players.length > 1) {
						_this2.swapPlayers();
					} else {
						_this2.canInteract = true;
					}
	
					_this2.game.nextTurn();
				}, 1500);
			}
		}, {
			key: "swapPlayers",
			value: function swapPlayers() {
				//swap players happens in the view (vs the game), so that controls can be put on the view to avoid current player interaction;
	
				var currentPlayer = this.game.currentPlayer;
				var players = this.game.players;
	
				if (currentPlayer === players[0]) {
					this.game.currentPlayer = players[1];
				} else {
					this.game.currentPlayer = players[0];
				}
	
				document.getElementById("current-player-id").innerHTML = this.game.currentPlayer.color;
	
				this.setInteraction(this.game.currentPlayer);
			}
		}, {
			key: "setInteraction",
			value: function setInteraction(player) {
				//disables clicking until it is the players turn 
				if (player instanceof _computer_player2.default) {
					document.body.classList.add("disable-click");
				} else {
					document.body.classList.remove("disable-click");
				}
	
				this.canInteract = true;
			}
		}]);
	
		return View;
	}();
	
	exports.default = View;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _player = __webpack_require__(6);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ComputerPlayer = function (_Player) {
		_inherits(ComputerPlayer, _Player);
	
		function ComputerPlayer(color) {
			_classCallCheck(this, ComputerPlayer);
	
			var _this = _possibleConstructorReturn(this, (ComputerPlayer.__proto__ || Object.getPrototypeOf(ComputerPlayer)).call(this, color));
	
			_this.seenCards = {};
			return _this;
		}
	
		_createClass(ComputerPlayer, [{
			key: 'receiveRevealedCard',
			value: function receiveRevealedCard(card, idx) {
				var baseSet = this.seenCards[card.value] || [];
				if (baseSet.indexOf(idx) < 0) {
					this.seenCards[card.value] = baseSet.concat(idx);
				}
			}
		}, {
			key: 'receiveMatch',
			value: function receiveMatch(value, locations) {
				var _this2 = this;
	
				//removes found cards from set of seen cards
	
				var foundIdx = void 0;
				locations.forEach(function (idx) {
					foundIdx = _this2.seenCards[value].indexOf(idx);
					if (foundIdx >= 0) {
						_this2.seenCards[value].splice(foundIdx, 1);
					}
				});
			}
		}, {
			key: 'getInput',
			value: function getInput(availableMoves) {
				this.availableMoves = availableMoves;
				if (this.previousGuess) {
					return this.makeSecondGuess();
				} else {
					return this.makeFirstGuess();
				}
			}
		}, {
			key: 'makeFirstGuess',
			value: function makeFirstGuess() {
				//check if any two are revealed
				var firstGuess = this.checkUnmatchedPositions();
				return firstGuess !== undefined ? firstGuess : this.randomPosition();
			}
		}, {
			key: 'makeSecondGuess',
			value: function makeSecondGuess() {
				var secondGuess = this.checkPreviousMatch();
				return secondGuess !== undefined ? secondGuess : this.randomPosition();
			}
		}, {
			key: 'checkUnmatchedPositions',
			value: function checkUnmatchedPositions() {
				var _this3 = this;
	
				//check all values of seen cards to find cases where there is more than one idx and both are available moves
	
				var count = [];
				var seenValues = Object.keys(this.seenCards);
				var cardValue = void 0;
	
				for (var i in seenValues) {
					cardValue = seenValues[i];
					if (this.seenCards[cardValue].length >= 2) {
						this.seenCards[cardValue].forEach(function (idx) {
							if (_this3.availableMoves.indexOf(idx) >= 0) {
								count.push(idx);
							}
						});
						if (count.length > 1) {
							return count[0];
						};
					}
				}
			}
		}, {
			key: 'checkPreviousMatch',
			value: function checkPreviousMatch() {
				// find if the seen cards contain the value, and if that value is a valid guess
	
				var value = void 0,
				    idx = void 0,
				    seenMoves = void 0;
	
				if (this.previousGuess) {
					value = this.previousGuess[0].value;
					idx = this.previousGuess[1];
					seenMoves = this.seenCards[value] || [];
	
					for (var i = 0; i < seenMoves.length; i++) {
						if (seenMoves[i] !== idx && this.availableMoves.indexOf(seenMoves[i]) >= 0) {
							return seenMoves[i];
						}
					}
				}
			}
		}, {
			key: 'randomPosition',
			value: function randomPosition() {
				var randomIdx = parseInt(Math.random() * this.availableMoves.length);
				return this.availableMoves[randomIdx];
			}
		}]);
	
		return ComputerPlayer;
	}(_player2.default);
	
	;
	
	exports.default = ComputerPlayer;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// The player class is a simple class for assigning points, previous guess, and player color. The majority of the functions of this class are used by the computer player, therefore leading to 'duck typing'
	
	var Player = function () {
		function Player(color) {
			_classCallCheck(this, Player);
	
			this.points = 0;
			this.previousGuess = null;
			this.color = color;
		}
	
		_createClass(Player, [{
			key: "setGuess",
			value: function setGuess(valueSet) {
				// A method used for setting the previous guess, to avoid other objects directly updating instance variables
	
				this.previousGuess = valueSet;
			}
		}, {
			key: "matchFound",
			value: function matchFound() {
				this.points++;
			}
		}, {
			key: "receiveRevealedCard",
			value: function receiveRevealedCard(card, idx) {
				//duck typing
			}
		}, {
			key: "getInput",
			value: function getInput(availableMoves) {
				//duck typing
			}
		}, {
			key: "receiveMatch",
			value: function receiveMatch(value, locations) {
				//duck typing
			}
		}]);
	
		return Player;
	}();
	
	exports.default = Player;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map