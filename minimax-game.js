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

  this.player_turn = true;
  this.player_score = 0;
  this.cpu_score = 0;

  game_div.css({position: "relative",
                width: this.width * Cell.WIDTH,
                height: this.height * Cell.HEIGHT});

  for (var y = 0; y < this.height; y++) {
    this.board[y] = new Array(this.width);
    for (var x = 0; x < this.width; x++) {
      var cell = new Cell(this, x, y);
      this.board[y][x] = cell;
      game_div.append(cell.getCellDiv());
    }
  }
};

Game.prototype.getCell = function (x, y) {
  return this.board[y][x];
}

Game.prototype.update = function (cell) {
  // check neighboring cells for tile w/ same owner
  var flip = false;
  var neighbors = cell.getNeighbors();
  console.log(neighbors);
  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].owner == cell.owner) {
      flip = true;
      break;
    }
  }

  if (flip) {
    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i].owner != cell.owner) {
        neighbors[i].flip();
      }
    }
  }

  this.update_score();
};

Game.prototype.update_score = function () {
  var p_score = 0;
  var c_score = 0;

  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.board[y][x].owner == own.PLAYER) {
        p_score += this.board[y][x].value;
      } else if (this.board[y][x].owner == own.CPU) {
        c_score += this.board[y][x].value;
      }
    }
  }

  this.player_score = p_score;
  this.cpu_score = c_score;
};

Game.prototype.cpu_move = function () {

  var cell = this.choose_cpu_move();

  if (cell != null) {
    cell.cell_div.toggleClass('claimed', true);
    cell.set_owner(own.CPU);
    this.update(cell);
    this.player_turn = true;
  } else {
    game.finish();
  }
};

Game.prototype.choose_cpu_move = function () {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.board[y][x].owner == own.EMPTY) {
        return this.board[y][x];
      }
    }
  }
  // if there are no empty cells:
  return null;
};

Game.prototype.finish = function () {

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
  this.cell_div.toggleClass('claimed', true);
  this.set_owner(own.PLAYER);
  this.game.update(this);
  this.game.cpu_move();
};

Cell.prototype.set_owner = function(new_owner) {
  this.owner = new_owner;
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

Cell.prototype.flip = function() {
  if (this.owner == own.PLAYER) {
    this.set_owner(own.CPU);
  }
  else if (this.owner == own.CPU) {
    this.set_owner(own.PLAYER);
  }
}

Cell.prototype.getNeighbors = function() {
  var neighbors = [];

  if (this.x > 0) {
    neighbors.push(this.game.getCell(this.x - 1, this.y));
  }
  if (this.x < this.game.width - 1) {
    neighbors.push(this.game.getCell(this.x + 1, this.y));
  }
  if (this.y > 0) {
    neighbors.push(this.game.getCell(this.x, this.y - 1));
  }
  if (this.y < this.game.height - 1) {
    neighbors.push(this.game.getCell(this.x, this.y + 1));
  }
  return neighbors;
};

Cell.prototype.getCellDiv = function() {
  return this.cell_div;
};
