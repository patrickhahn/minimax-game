$(document).ready(function() {
  var current_game = new Game($('#gameboard'));

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
  this.width = 6;
  this.height = 6;
  this.killed = false;

  this.board = new Array(this.height);
  this.new_board = new Array(this.height);

  this.player_turn = true;
  this.player_score = 0;
  this.cpu_score = 0;

  game_div.css({position: "relative",
                width: this.width * Cell.WIDTH,
                height: this.height * Cell.HEIGHT});

  for (var y = 0; y < this.height; y++) {
    this.board[y] = new Array(this.width);
    this.new_board[y] = new Array(this.width);
    for (var x = 0; x < this.width; x++) {
      var cell = new Cell(this, x, y);
      this.board[y][x] = cell;
      this.new_board[y][x] = 0;
      game_div.append(cell.getCellDiv());
    }
  }
};

Game.prototype.update = function (owner, x, y) {

};

Game.prototype.cpu_move = function () {

};

Game.prototype.kill = function () {
  if (!this.killed) {
    this.game_div.empty();
    this.killed = true;
  }
};


var Cell = function (game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.value = Math.floor((Math.random() * 99) + 1);
  this.owner = own.EMPTY;

  this.cell_div = $("<div><p>" + this.value + "</p></div>").css({position: "absolute",
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
    if (e.button == 0 && cell.game.player_turn && cell.owner == own.EMPTY) {
      cell.claim_for_player();
    }
  });
};

Cell.WIDTH = 50;
Cell.HEIGHT = 50;

// Enum for cell ownership status
var own = {
  EMPTY: 0,
  PLAYER: 1,
  CPU: 2
};

Cell.prototype.claim_for_player = function() {
  this.game.player_turn = false;
  this.set_owner(own.PLAYER);
  this.game.update(own.PLAYER, this.x, this.y);
  this.game.cpu_move();
};

Cell.prototype.set_owner = function(new_owner) {
  this.owner = new_owner;
  console.log("set owner");
  if (new_owner == own.PLAYER) {
    this.cell_div.toggleClass('player',true);
    this.cell_div.toggleClass('cpu', false);
  }
  else if (new_owner == own.CPU) {
    this.cell_div.toggleClass('player',false);
    this.cell_div.toggleClass('cpu', true);
  }
  else {
    this.cell_div.toggleClass('player',false);
    this.cell_div.toggleClass('cpu', false);
  }
};

Cell.prototype.getCellDiv = function() {
  return this.cell_div;
};
