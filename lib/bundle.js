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
	
	var _deck = __webpack_require__(1);
	
	var _deck2 = _interopRequireDefault(_deck);
	
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
		newGame();
		//I have a game screen in which the user chooses the type of game and number of players
	
		//I have a main screen in which cards are dealt face down (dom elements created). Each one will have an id going to the index of the card. Each card with have a visible/back/complete status
	});
	
	var newGame = function newGame() {
		var board = document.querySelector('#board');
		board.innerHTML = "";
		// This is where players are created. Need a way to get the  user to choose
		var game = new _game2.default([new _player2.default(), new _computer_player2.default()]);
		window.deck = game.gameDeck;
		new _view2.default(game, board);
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
	
	var VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var SUITS = ["Clubs", "Spades", "Diamonds", "Hearts"];
	
	var Deck = function () {
		function Deck() {
			_classCallCheck(this, Deck);
	
			this.cards = this.setDeck();
		}
	
		_createClass(Deck, [{
			key: "setDeck",
			value: function setDeck() {
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
				return this.cards[idx].revealed;
			}
		}, {
			key: "setVisible",
			value: function setVisible(idx) {
				this.cards[idx].revealCard();
			}
		}, {
			key: "allRevealed",
			value: function allRevealed() {
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
				//get the available moves
				//call getInput with them;
				var availableMoves = this.gameDeck.availableMoves();
				var nextMove = this.currentPlayer.getInput(availableMoves);
				if (nextMove !== undefined) {
					document.getElementById('' + nextMove).click();
				};
			}
		}, {
			key: 'playMove',
			value: function playMove(id) {
				var idx = parseInt(id);
				var guessSet = void 0;
	
				if (this.validMove(idx)) {
					this.selectedCards.push(idx);
					this.gameDeck.setVisible(idx);
					guessSet = [this.gameDeck.cards[idx], idx];
	
					this.players.forEach(function (player) {
						player.receiveRevealedCard.apply(player, _toConsumableArray(guessSet));
					});
	
					if (!this.currentPlayer.previousGuess) {
						this.currentPlayer.previousGuess = guessSet;
					}
				} else {
					throw new Error('Not a valid card!');
				}
			}
		}, {
			key: 'checkCards',
			value: function checkCards(hideCards) {
				var _this = this;
	
				if (this.selectedCards.length == 2) {
					this.verifyMatch(hideCards);
				} else {
	
					setTimeout(function () {
						_this.playTurn();
					}, 500);
				}
			}
		}, {
			key: 'verifyMatch',
			value: function verifyMatch(hideCards) {
				var _this2 = this;
	
				var cardOne = this.gameDeck.cards[this.selectedCards[0]];
				var cardTwo = this.gameDeck.cards[this.selectedCards[1]];
	
				if (cardOne.value == cardTwo.value) {
					this.players.forEach(function (player) {
						player.receiveMatch(cardOne.value, _this2.selectedCards);
					});
					setTimeout(function () {
						_this2.nextTurn();
					}, 1000);
				} else {
					cardOne.hideCard();
					cardTwo.hideCard();
					hideCards(this.selectedCards);
				}
			}
		}, {
			key: 'nextTurn',
			value: function nextTurn() {
				this.currentPlayer.previousGuess = null;
				this.selectedCards = [];
				this.playTurn();
			}
		}, {
			key: 'validMove',
			value: function validMove(idx) {
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
	
	var View = function () {
		function View(game, board) {
			_classCallCheck(this, View);
	
			this.game = game;
			this.board = board;
			this.canInteract = true;
	
			this.setupBoard();
			this.addListener();
		}
	
		_createClass(View, [{
			key: "setupBoard",
			value: function setupBoard() {
				var li = void 0;
				var textNode = void 0;
				var deck = this.game.gameDeck;
	
				for (var i = 0; i < deck.cards.length; i++) {
					li = document.createElement("li");
					li.className = "card unrevealed";
					li.id = i;
	
					this.board.appendChild(li);
				}
			}
		}, {
			key: "addListener",
			value: function addListener() {
				var _this = this;
	
				this.board.addEventListener("click", function (event) {
					_this.makeMove(event.target);
				});
			}
		}, {
			key: "makeMove",
			value: function makeMove(li) {
				if (this.canInteract || this.game.currentPlayer instanceof _computer_player2.default) {
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
						this.board.removeEventListener("click", this.makeMove);
						alert("game over!");
					}
				}
			}
		}, {
			key: "displayCard",
			value: function displayCard(li) {
				var span = document.createElement("ul");
				var textNode = document.createTextNode(deck.cards[li.id].value + " of " + deck.cards[li.id].suit);
				span.appendChild(textNode);
				li.appendChild(span);
			}
		}, {
			key: "hideCards",
			value: function hideCards(returnedCards) {
				var _this2 = this;
	
				this.canInteract = false;
				setTimeout(function () {
					returnedCards.forEach(function (idx) {
						document.getElementById("" + idx).innerHTML = '';
					});
	
					if (_this2.game.players.length > 1) {
						_this2.swapPlayers();
					} else {
						_this2.canInteract = true;
					}
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
	
				this.setInteraction(this.game.currentPlayer);
				this.game.nextTurn();
			}
		}, {
			key: "setInteraction",
			value: function setInteraction(player) {
				if (player instanceof _computer_player2.default) {
					this.canInteract = false;
					document.body.classList.add("disable-click");
				} else {
					this.canInteract = true;
					document.body.classList.remove("disable-click");
				}
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
	
		function ComputerPlayer() {
			_classCallCheck(this, ComputerPlayer);
	
			var _this = _possibleConstructorReturn(this, (ComputerPlayer.__proto__ || Object.getPrototypeOf(ComputerPlayer)).call(this));
	
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
	
				var foundIdx = void 0;
				this.points++;
	
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
						//check count of cards in available moves 
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
	
	var Player = function () {
		function Player() {
			_classCallCheck(this, Player);
	
			this.points = 0;
			this.previousGuess = null;
		}
	
		_createClass(Player, [{
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
				this.points++;
			}
		}]);
	
		return Player;
	}();
	
	exports.default = Player;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map