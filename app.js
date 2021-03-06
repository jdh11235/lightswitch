/* Copyright (c) 2014 Jonathan Herman - MIT License */
/* http://github.com/jdh11235/lightswitch */

//data

var Board = [];
var Tiles = [];

var Defaults = {

	board_height: 5,
	board_width: 5,
	moves: 0,
	scramble_iterations: 3

};

var $;
function Elements () {
	$ = {

		board: document.getElementById('board'),
		heightBox: document.getElementById('heightBox'),
		movesBox: document.getElementById('movesBox'),
		scrambleBox: document.getElementById('scrambleBox'),
		widthBox: document.getElementById('widthBox')

	};
}

//classes

var Game = {

	checkWin: function () {
		if ( !Board.toString().match(/on/gi) ) {
			setTimeout(UI.win, 1);
		}
	},

	incrementMoves: function (amount) {
		localStorage.moves = Number(localStorage.moves) + amount;
		UI.updateMoves();
	},

	newGame: function () {
		Game.generating = true;
		localStorage.moves = 0;
		Game.resetBoard(localStorage.board_width, localStorage.board_height);
		UI.resetBoard(localStorage.board_width, localStorage.board_height);
		//TODO: replace this with a manual scramble button?
		Game.scramble(localStorage.scramble_iterations);
		Util.saveBoard();
		UI.loadBoxes();
		Game.generating = false;
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

	resumeGame: function () {
		Game.generating = true;
		Util.loadBoard();
		UI.resetBoard(Board.length, Board[0].length, true);
		Game.generating = false;
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
		Util.saveBoard();
		if (!Game.generating) {
			Game.incrementMoves(1);
			Game.checkWin();
		}
	}

};

var UI = {

	//TODO: add "moves" counter?

	inputHeight: function () {
		var val = Number($.heightBox.value),
			min = $.heightBox.min,
			max = $.heightBox.max;
		if (val >= min && val <= max) {
			localStorage.board_height = val;
		}
	},

	inputScramble: function () {
		var val = Number($.scrambleBox.value),
			min = $.scrambleBox.min,
			max = $.scrambleBox.max;
		if (val >= min && val <= max) {
			localStorage.scramble_iterations = val;
		}
	},

	inputWidth: function () {
		var val = Number($.widthBox.value),
			min = $.widthBox.min,
			max = $.widthBox.max;
		if (val >= min && val <= max) {
			localStorage.board_width = val;
		}
	},

	loadBoxes: function () {
		$.heightBox.value = localStorage.board_height;
		$.scrambleBox.value = localStorage.scramble_iterations;
		$.widthBox.value = localStorage.board_width;
		UI.updateMoves();
	},

	resetBoard: function (width, height, load) {
		//"load" parameter is optional
		$.board.innerHTML = '';
		var $column, $tile, press, touchPress;
		for (var x = 0; x < width; x++) {
			Tiles[x] = [];
			$column = document.createElement('div');
			$column.style.width = 100/width + '%';
			$column.classList.add('column');
			$.board.appendChild($column);
			for (var y = 0; y < height; y++) {
				$tile = document.createElement('div');
				$tile.classList.add('tile');
				$tile.style.height = 100/height + '%';
				press = Function('Game.pressTile(' + x + ',' + y + ');');
				$tile.onclick = press;
				$tile.id = x + '-' + y;
				$column.appendChild($tile);
				Tiles[x][y] = $tile;
				if (load) {
					if (Board[x][y] === 'on') {
						UI.tileOn(x, y);
					}
				}
			}
		}
	},

	resize: function () {
		var top_height = 15,
			bottom_height = 15,
			board_ratio = {x:Board.length, y:Board[0].length},
			screen_ratio = {x:window.innerWidth, y:window.innerHeight},
			board_width = $.board.style.width,
			board_height = $.board.style.height;
		console.log(board_ratio.x + ':' + board_ratio.y);
		console.log(screen_ratio.x + ':' + screen_ratio.y);
	},

	tileOff: function (x, y) {
		Tiles[x][y].classList.remove('on');
	},

	tileOn: function (x, y) {
		Tiles[x][y].classList.add('on');
	},

	updateMoves: function () {
		$.movesBox.innerHTML = localStorage.moves;
	},

	win: function () {
		alert("YOU WIN!!!" + "\nMoves: " + localStorage.moves);
	}

};

var Util = {

	attachPrototypes: function () {
		Array.prototype.randomPos = function () {
			return Math.floor(Math.random()*this.length);
		};
	},

	init: function () {
		FastClick.attach(document.body);
		Util.preventScrolling(window);
		Util.attachPrototypes();
		Util.setupDefaults();
		Elements();
		Util.loadGame();
		UI.loadBoxes();
	},

	loadBoard: function () {
		Board = JSON.parse(localStorage.Board);
	},

	loadGame: function () {
		if (localStorage.Board) {
			Util.loadBoard();
			Game.resumeGame();
		} else {
			Game.newGame();
		}
	},

	limitNumberLength: function ($box, maxlength) {
		if ($box.value.length > maxlength) {
			$box.value = $box.value.substring(0, maxlength);
		}
	},

	preventScrolling: function ($elm) {
		$elm.addEventListener('touchmove', function(event){
			event.preventDefault();
		});
	},

	saveBoard: function () {
		localStorage.Board = JSON.stringify(Board);
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
