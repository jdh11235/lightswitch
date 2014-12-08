/* Copyright (c) 2014 Jonathan Herman - MIT License */
/* http://github.com/jdh11235/lightswitch */

//defaults:

var Defaults = {

	click_radius: 1,

	board_width: 30,
	board_height: 30,

	scramble_iterations: 30

};

//classes, organized alphabetically:

var Game = {

	createBoard: function (width, height) {

	},

	newGame: function () {

	},

	switchTile: function (x, y) {

	}

};

var UI = {

	renderGameboard: function () {

	}

};

var Util = {

	checkLocalStorage: function () {

	},

	init: function () {
		Util.checkLocalStorage();
	}

};

//init hook:

window.onload = Util.init;
