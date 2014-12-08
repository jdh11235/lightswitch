/* Copyright (c) 2014 Jonathan Herman - MIT License */
/* http://github.com/jdh11235/lightswitch */

//data

//TODO: put board in localStorage with getter and setter methods?
var Board = [];
var Tiles = [];

var Defaults = {

	//TODO
//	click_radius: 1,

	board_width: 10,
	board_height: 10,

	scramble_iterations: 10

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
		Game.resetBoard(localStorage.board_width, localStorage.board_height);
		UI.resetBoard(localStorage.board_width, localStorage.board_height);
		Game.scramble(localStorage.scramble_iterations);
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

	scramble: function (iterations) {
		var x, y;
		for (var i = 0; i < iterations; i++) {
			x = Board.randomPos();
			y = Board[x].randomPos();
			Game.pressTile(x, y);
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
						UI.tileOn(x, y);
					} else if (Board[x][y] === 'on') {
						Board[x][y] = 'off';
						UI.tileOff(x, y);
					}
				}
			}
		}
	}

};

var UI = {

	//TODO: add buttons and newGame dialog

	resetBoard: function (width, height) {
		$.board.innerHTML = '';
		var $column, $tile;
		for (var x = 0; x < width; x++) {
			Tiles[x] = [];
			for (var y = 0; y < height; y++) {
				$tile = document.createElement('div');
				$tile.classList.add('tile');
				$tile.style.width = 100/width + '%';
				$tile.style.height = 100/height + '%';
				//TODO: attach onClick handlers (also onTouchStart or use fastclick.js)
				$.board.appendChild($tile);
				Tiles[x][y] = $tile;
			}
		}
	},

	tileOff: function (x, y) {
		//make this update an individual element; called from Game.toggleTiles
		Tiles[x][y].classList.remove('on');
	},

	tileOn: function (x, y) {
		//make this update an individual element; called from Game.toggleTiles
		Tiles[x][y].classList.add('on');
	}

};

var Util = {

	attachPrototypes: function () {
		Array.prototype.randomPos = function () {
			return Math.floor(Math.random()*this.length);
		};
	},

	init: function () {
		Util.attachPrototypes();
		Util.setupDefaults();
		Elements();
		//TODO: start new game (or load old one when implemented)
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
