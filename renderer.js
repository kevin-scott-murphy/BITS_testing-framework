var ipc = require("electron").ipcRenderer;
var $ = require("jQuery");

// globals...
var currentPlayer = 0;
var currentPlayerScore = 0;
var selected_x = 0;
var selected_y = 0;
var phase = "";

$(document).ready(function() {

	// game state received
	ipc.on("GSO", function(event, data) {

		// update globals
		currentPlayer = data.player;
		phase = data.phase;
		currentPlayerScore = data.players[currentPlayer].score;

		// draw the board, and update the status display
		drawBoard(data);
		updateStatusDisplay();
	});

	// on tile click
	$("#board").on("click", ".card", function() {

		// remove class from any previously selected tile
		$(".selected").removeClass("selected");

		// add the class
		$(this).addClass( "selected" );

		// get the tiles id and break it down for the x and y coordinates
		var pos = $(this).attr("id");
		selected_x = parseInt(pos.substring(0, pos.indexOf("-")));
		selected_y = parseInt(pos.substring(pos.indexOf("-") + 1));

		updateStatusDisplay();
	});

	// send the draw event
	$("#draw").click(function() {

		ipc.send("DRAW", currentPlayer);
	});

	// send the place event
	$("#place").click(function() {

		ipc.send("PLACE", {"player": currentPlayer, "x" : selected_x, "y" : selected_y});
	});

	// send the lure event
	$("#lure").click(function() {

		ipc.send("LURE", {"player": currentPlayer, "x" : selected_x, "y" : selected_y});
	});
});

function drawBoard(gameState) {

	var boardHtml = "";

	// iterate over tiles
	for(var y = 0; y < 9; y++) {

		for(var x = 0; x < 9; x++) {

			// draw the tiles
			boardHtml += `<div class="card" id="${x}-${y}">`;

			for(var i = 0; i < gameState.board.length; i++) {

				if(gameState.board[i].x == x && gameState.board[i].y == y) {

					boardHtml += gameState.board[i].type;
				}
			}

			// draw the ships
			boardHtml += `<div class='ship'>`;

			for(var j = 0; j < gameState.ships.length; j++) {

				if(gameState.ships[j].x == x && gameState.ships[j].y == y) {

					boardHtml += "^";					
				}
			}
			boardHtml += `</div></div>`;
		}
	}

	// update the html
	$("#board").html(boardHtml);
	
	// display the json
	$("#display").html(`<pre>${JSON.stringify(gameState, null, 4)}</pre>`);
}

function updateStatusDisplay() {

	// update the html
	$("#phase").html(`Phase: ${phase}, Player: ${currentPlayer}, Score ${currentPlayerScore}, X: ${selected_x}, Y: ${selected_y}`);
}