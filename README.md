# 52 Card Memory
This is a vanilla JS version of memory, using a 52 card deck. It contains 3 modes, single player, two players, and single player vs. computer player.

Play the live version here:
[Memory live][github]
[github]: http://www.alexandersmanning.com/memory/

## Features

### Card Matching

Cards are matched based on values, where suit is not considered. For each turn, a player may select two cards, which are displayed for 1 second after completing the turn. In the case where the cards are a match, they will stay displayed, and be highlighted with the player's color.

### Points

For each match, the player is given a point, with a max of 26 points per game.

### Computer Player

The computer player is quite hard, dare I say unbeatable. The computer "remembers" every single card it has seen, during their turn, and during the human player's turn. For each turn, they will first check if they know of two cards that have not been matched, and will reveal those. If that is not the case, they will reveal one card, and see if they know of a matching card. If not, they will pick a second random card.

## Future Changes

### Adding difficulty levels

To make the game more fair, I will add difficulty levels for the computer player. This can be implemented in two ways:
- Allowing the computer player to make more random moves based on difficulty. Something similar to the computer making the correct choice 25% of the time on easy, 50% of the time on medium, and 75% of the time on hard
- Implement a LRU cache, in which the computer can only "remember" a limited number of past moves. 

### Adding card flipping

For purely aesthetic reasons, use CSS transformation to have the card flip upon selecting it, displaying a more realistic interaction with the cards.

