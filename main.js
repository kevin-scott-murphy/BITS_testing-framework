// includes
var electron = require("electron");
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var ipc = electron.ipcMain;
var GameState = require("./GameState.js");

app.on("ready", function() {

	var appWindow = new BrowserWindow({
		show: false
	});

	appWindow.loadURL("file://" + __dirname + "/index.html");

	appWindow.once("ready-to-show", function() {
		appWindow.show();
		appWindow.maximize();
		var gso = new GameState();
		appWindow.webContents.send("GSO", gso);
	});

	ipc.on('DRAW', function(event, arg) {
		// Handle DRAW event
		//event.sender.send("DRAW", gso);
	});

	ipc.on('PLACE', function(event, arg) {
		// Handle PLACE event
	});

	ipc.on('LURE', function(event, arg) {
		// Handle LURE event
	});

});