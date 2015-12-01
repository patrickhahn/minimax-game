$(document).ready(function() {
  var current_game = new Game($('#gameboard'));

  var update = function() {
    current_game.update();
  }

  $("#reset").click(function(e) {
    e.preventDefault();
    reset_game();
  });

  var reset_game = function() {
    if (current_game != null) {
      current_game.kill();
    }

    current_game = new Game($('#gameboard'));
  };

});

var Game = function(game_div) {
  this.game_div = game_div;
  this.width = width;
  this.height = height;
  this.killed = false;
  this.board = new Array(height);
  this.new_board = new Array(height);

  game_div.css({position: "relative",
                width: this.width * Cell.WIDTH,
                height: this.height * Cell.HEIGHT});

  for (var y = 0; y < this.height; y++) {
    this.board[y] = new Array(width);
    this.new_board[y] = new Array(width);
    for (var x = 0; x < this.width; x++) {
      var cell = new Cell(this, x, y);
      this.board[y][x] = cell;
      this.new_board[y][x] = 0;
      game_div.append(cell.getCellDiv());
    }
  }
};

Game.prototype.update = function () {

}

Game.prototype.start = function() {
  this.running = true;
}

Game.prototype.stop = function() {
  this.running = false;
}

Game.prototype.kill = function () {
  if (!this.killed) {
    this.game_div.empty();
    this.killed = true;
  }
}

var Cell = function (game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.value = 0;
  this.owner = false;

  this.cell_div = $("<div></div>").css({position: "absolute",
                 width: Cell.WIDTH,
                 height: Cell.HEIGHT,
                 top: y * Cell.HEIGHT,
                 left: x * Cell.WIDTH});
  this.cell_div.addClass("cell");

  var cell = this;

  this.cell_div.on('mousedown', function(e) {
    e.preventDefault();
  });

  this.cell_div.click(function (e) {
    e.preventDefault();
    if (e.button == 0) {
  });
};

Cell.WIDTH = 25;
Cell.HEIGHT = 25;

Cell.prototype.flip = function() {

}

Cell.prototype.getCellDiv = function() {
  return this.cell_div;
}
