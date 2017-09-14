// includes
var electron = require("electron");
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var ipc = electron.ipcMain;
var GameState = require("./GameState.js");

app.on("ready", function() {

	var gso = new GameState(2);
	var appWindow = new BrowserWindow({

		width: 1024,
		height: 768,
		show: false
	});

	appWindow.loadURL("file://" + __dirname + "/index.html");

	appWindow.once("ready-to-show", function() {

		appWindow.maximize();
		appWindow.show();
		appWindow.webContents.send("GSO", gso);
	});

	ipc.on('DRAW', function(event, data) {

		if(gso.drawCard(data)) {

			gso.nextPhase();
		}
		event.sender.send("GSO", gso);
	});

	ipc.on('PLACE', function(event, data) {

		if(gso.placeCard(data.player, data.x, data.y)) {
			
			gso.nextPhase();
		}
		event.sender.send("GSO", gso);
	});

	ipc.on('LURE', function(event, data) {

		if(gso.placeLure(data.player, data.x, data.y)) {

			gso.nextPhase();
		}
		event.sender.send("GSO", gso);

		if(gso.phase == "SHIPSFLY") {
			
			gso.nextPhase();
			event.sender.send("GSO", gso);
			gso.nextPhase();
			event.sender.send("GSO", gso);
			gso.nextPhase();
			event.sender.send("GSO", gso);
		}
		
	});

});