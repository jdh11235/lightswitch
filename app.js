/* Copyright (c) 2014 Jonathan Herman - MIT License */
/* http://github.com/jdh11235/lightswitch */

//data

//TODO: put board in localStorage with getter and setter methods?
var Board = [];

var Defaults = {

	//TODO
//	click_radius: 1,

	board_width: 30,
	board_height: 30,

	scramble_iterations: 30

};

var $;
function Elements () {
	$ = {

		board: document.getElementById('board')

	};
}

//classes

var Game = {

	newGame: function () {

	},

	pressTile: function (x, y) {
		Game.toggleTiles([ [x-1, y], [x+1, y], [x, y], [x, y-1], [x, y+1] ]);
	},

	resetBoard: function (width, height) {
		Board = [];
		for (var x = 0; x < width; x++) {
			Board[x] = [];
			for (var y = 0; y < height; y++) {
				Board[x][y] = 'off';
			}
		}
	},

	toggleTiles: function (tiles) {
		//tiles === [[1, 1], ... [3, 4]]
		var x, y;
		for (tile in tiles) {
			x = tiles[tile][0];
			y = tiles[tile][1];
			if (Board[x]) {
				if (Board[x][y]) {
					if (Board[x][y] === 'off') {
						Board[x][y] = 'on';
					} else if (Board[x][y] === 'on') {
						Board[x][y] = 'off';
					}
				}
			}
		}
		UI.renderBoard();
	}

};

var UI = {

	renderBoard: function () {
		//TODO: update board on document from Board
		console.log(Board);
	}

};

var Util = {

	init: function () {
		Util.setupDefaults();
		Elements();
	},

	setupDefaults: function () {
		for (key in Defaults) {
			if (!localStorage[key]) {
				localStorage[key] = Defaults[key];
			}
		}
	}

};

//init hook

window.onload = Util.init;
