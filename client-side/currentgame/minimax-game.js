// Enum for cell ownership status
var own = {
  EMPTY: 0,
  PLAYER: 1,
  CPU: 2
};

$(document).ready(function() {
  // relative path to the project directory
	var url_base = "../../server-side/"
	$.ajax(url_base + "session.php/login/",
         {type: "GET",
                dataType: "json",
                success: function(player, status, jqXHR) {
                  $('#user').html(player.username);
                },
                error: function(jqHXR, status, error) {
                  console.log(jqHXR);
                  console.log(status);
                  console.log(error);
                }
         });

  var current_game = new Game($('#gameboard'), new AlphaBetaAgent(2));

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

var Game = function(game_div, agent) {
  this.game_div = game_div;
  this.width = 6;
  this.height = 6;
  this.killed = false;
  this.player_turn = true;
  this.agent = agent;

  this.board = new Array(this.height);

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

  $("#playerscore").html("You: " + 0);
  $("#cpuscore").html("CPU: " + 0);
};

Game.prototype.getCell = function (x, y) {
  return this.board[y][x];
};

Game.prototype.update = function (cell) {
  // check neighboring cells for tile w/ same owner
  var flip = false;
  var neighbors = cell.getNeighbors();
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

  $("#playerscore").html("You: " + p_score);
  $("#cpuscore").html("CPU: " + c_score);
};

Game.prototype.cpu_move = function () {
  var move = this.choose_cpu_move();
  cell = this.board[move.y][move.x];

  if (cell != null) {
    cell.cell_div.toggleClass('claimed', true);
    cell.set_owner(own.CPU);
    this.update(cell);
    this.player_turn = true;
  } else {
    this.finish();
  }
};

Game.prototype.choose_cpu_move = function () {
  var move = this.agent.chooseMove(this.board);
  return move;
};

Game.prototype.finish = function () {

};

Game.prototype.kill = function () {
  if (!this.killed) {
    this.game_div.empty();
    this.killed = true;
  }
};
