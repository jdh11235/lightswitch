/* Copyright (c) 2014 Jonathan Herman - MIT License */
/* http://github.com/jdh11235/lightswitch */

//data

var Board = [];

var Defaults = {

	click_radius: 1,

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

	resetBoard: function (width, height) {
		Board = [];
		for (var x = 0; x < width; x++) {
			Board[x] = [];
			for (var y = 0; y < height; y++) {
				Board[x][y] = 'off';
			}
		}
	},

	newGame: function () {

	},

	pressTile: function (x, y) {

	},

	toggleTile: function (x, y) {

	}

};

var UI = {

	renderBoard: function () {

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
