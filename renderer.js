var ipc = require("electron").ipcRenderer;
var $ = require("jQuery");

$(document).ready(function() {

	var currentPlayer = 0;
	var currentPlayerScore = 0;
	var selected_x = 0;
	var selected_y = 0;
	var phase = "";

	ipc.on("GSO", function(event, data) {

		currentPlayer = data.player;
		phase = data.phase;
		currentPlayerScore = data.players[currentPlayer].score;

		var boardHtml = "";

		for(var y = 0; y < 9; y++) {
			for(var x = 0; x < 9; x++){
				boardHtml += `<div class="card" id="${x}-${y}">`;
				for(var i = 0; i < data.board.length; i++) {
					if(data.board[i].x == x && data.board[i].y == y) {
						boardHtml += data.board[i].type;
					}
				}
				boardHtml += `<div class='ship'>`;
				for(var j = 0; j < data.ships.length; j++) {
					if(data.ships[j].x == x && data.ships[j].y == y) {
						boardHtml += "^";					
					}
				}
				boardHtml += `</div></div>`;
			}
		}

		$("#board").html(boardHtml);
		$("#phase").html(`Phase: ${phase}, Player: ${currentPlayer}, Score ${currentPlayerScore}, X: ${selected_x}, Y: ${selected_y}`);
		$("#display").html(`<pre>${JSON.stringify(data, null, 4)}</pre>`);
	});

	$( "#board" ).on("click", ".card", function() {
		$( ".selected" ).removeClass( "selected" );
		$(this).addClass( "selected" );
		var pos = $(this).attr("id");
		var selected_x = parseInt(pos.substring(0, pos.indexOf("-")));
		var selected_y = parseInt(pos.substring(pos.indexOf("-") + 1));
		$("#phase").html(`Phase: ${phase}, Player: ${currentPlayer}, Score ${currentPlayerScore}, X: ${selected_x}, Y: ${selected_y}`);
	});

	$("#draw").click(function() {
		ipc.send("DRAW", currentPlayer);
	});

	$("#place").click(function() {
		ipc.send("PLACE", {"player": currentPlayer, "x" : selected_x, "y" : selected_y});
	});

	$("#lure").click(function() {
		ipc.send("LURE", {"player": currentPlayer, "x" : selected_x, "y" : selected_y});
	});
});