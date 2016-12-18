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
	
	var _player = __webpack_require__(5);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
		var board = document.querySelector('#board');
		var game = new _game2.default([new _player2.default()]);
		window.deck = game.gameDeck;
		new _view2.default(game, board);
		//I have a game screen in which the user chooses the type of game and number of players
	
		//I have a main screen in which cards are dealt face down (dom elements created). Each one will have an id going to the index of the card. Each card with have a visible/back/complete status
		// Add state to disable play
	});

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
			key: "validMoves",
			value: function validMoves() {
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
			key: 'playMove',
			value: function playMove(id) {
				var idx = parseInt(id);
				if (this.validMove(idx)) {
					this.selectedCards.push(idx);
					this.gameDeck.setVisible(idx);
				} else {
					throw new Error('Is not valid card!');
				}
			}
		}, {
			key: 'checkCards',
			value: function checkCards(hideCards) {
				if (this.selectedCards.length == 2) {
					this.verifyMatch(hideCards);
				}
			}
		}, {
			key: 'verifyMatch',
			value: function verifyMatch(hideCards) {
				var cardOne = this.gameDeck.cards[this.selectedCards[0]];
				var cardTwo = this.gameDeck.cards[this.selectedCards[1]];
	
				if (cardOne.value == cardTwo.value) {
					this.currentPlayer.receiveMatch(this.selectedCards[0], this.selectedCards[1]);
				} else {
					cardOne.hideCard();
					cardTwo.hideCard();
					hideCards(this.selectedCards);
				}
	
				this.selectedCards = [];
			}
		}, {
			key: 'validMove',
			value: function validMove(idx) {
				return !this.gameDeck.isVisible(idx);
			}
		}, {
			key: 'swapPlayers',
			value: function swapPlayers() {
				if (this.currentPlayer === this.players[0]) {
					this.currentPlayer = this.players[1];
				} else {
					this.currentPlayer = this.players[0];
				}
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
				if (this.canInteract) {
					try {
						this.game.playMove(li.id);
					} catch (e) {
						alert("Invalid move! Try again.");
						return;
					}
	
					var span = document.createElement("ul");
					var textNode = document.createTextNode(deck.cards[li.id].value + " of " + deck.cards[li.id].suit);
					span.appendChild(textNode);
					li.appendChild(span);
	
					this.game.checkCards(this.hideCards.bind(this));
				}
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
					_this2.canInteract = true;
				}, 1000);
			}
		}]);
	
		return View;
	}();
	
	exports.default = View;

/***/ },
/* 5 */
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
		}
	
		_createClass(Player, [{
			key: "receiveRevealedCard",
			value: function receiveRevealedCard(card) {
				//this is for the computer
			}
		}, {
			key: "receiveMatch",
			value: function receiveMatch() {
				this.points++;
			}
		}]);
	
		return Player;
	}();
	
	exports.default = Player;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map