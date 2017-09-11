function GameState() {
	this.deck = [
		//All 53 cards in the game shuffled during game setup. 
		//When cards are moved to the board or player's hand, 
		//they are taken off the top of this array and removed from the array.
		"space", "gate1", "gate2", "gate3", "pub", "cruiser", "lair",
		"gate2", "gate2", "space", "pub", "gate1", "lair"
		// ... other cards
	];
	this.board = [
		//All cards that are currently on the board with their coordinates.
		{type: "space", x:1, y:2},
		{type: "gate1", x:3, y:3},
		{type: "gate3", x:3, y:4},
		{type: "lair", x:1, y:4},
		{type: "space", x:2, y:2}
	];
	this.ships = [
		//All ships that are currently on the board.
		{x:1, y:2},
		{x:2, y:2},
		{x:3, y:6}
	];
	this.players = [
	//Array of current player's data. Players are counted from 0.
		{
			//current coordinates of player's lure, if placed.
			//if the lure is not placed, it can be replaced by null 
			//or coordinates can be nulled
			lure: {x:1, y:1}, 
			//current card to be placed in player's hand.
			//null if player doesn't hold a card.
			currentCard: "space",
			//player's current score. Starts from 0.
			score: 3
		},
		{
			//second player's details similar to the above.
			lure: null,
			currentCard: null,
			score: 2
		}
	];
	this.phase = "PLACE"; //current phase of the game
	this.player = 0; //the index of player that is playing this turn
}

module.exports = GameState;