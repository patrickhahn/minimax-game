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

  $.ajax(url_base + "session.php/ai/",
        {type: "GET",
               dataType: "json",
               success: function(ai, status, jqXHR) {
                 console.log(ai);
                 if (ai.type == 'alphabeta') {
                   startGame(new AlphaBetaAgent(ai.depth), ai.name);
                 } else if (ai.type == 'minimax') {
                   startGame(new MinimaxAgent(ai.depth), ai.name);
                 } else {
                   console.log("Invalid AI type.");
                 }
               },
               error: function(jqHXR, status, error) {
                 console.log(jqHXR);
                 console.log(status);
                 console.log(error);
               }
        });

  var startGame = function(agent, name) {
    var current_game = new Game($('#gameboard'), agent, name);
  }
});

var Game = function(game_div, agent, name) {
  this.game_div = game_div;
  this.width = 6;
  this.height = 6;
  this.killed = false;
  this.player_turn = true;
  this.agent = agent;
  this.playerName = $('#user').text();
  this.aiName = name;
  this.player_score = 0;
  this.cpu_scroe = 0;

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
  this.player_score = p_score;
  this.cpu_score = c_score;
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
    if (this.hasCellsRemaining()) {
      this.player_turn = true;
    }
    else {
      this.finish();
    }
  }
  else {
    console.log("CPU could not choose a move.");
  }
};

Game.prototype.choose_cpu_move = function () {
  var move = this.agent.chooseMove(this.board);
  if (move == null) {
    move = this.getRandomEmptyCell();
  }
  return move;
};

Game.prototype.getRandomEmptyCell = function () {
  var cell = null;

  while (cell == null) {
    // Get random int between 0 and 36
    var num = Math.min(36, Math.floor((Math.random() * 37)));
    var column = Math.min(5, Math.floor(num / 6));
    var row = num % 6;
    if (this.board[column][row].owner == own.EMPTY) {
      cell = this.board[column][row];
    }
  }
  return cell;
};

Game.prototype.hasCellsRemaining = function () {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      if (this.board[y][x].owner == own.EMPTY) {
        return true;
      }
    }
  }
  return false;
};

Game.prototype.finish = function () {
  console.log(this.playerName, this.aiName, this.player_score, this.cpu_score);
  $.ajax("../../server-side/gameAPI.php/game/" + this.playerName + "/" + this.aiName + "/" + this.player_score + "/" + this.cpu_score,
         {type: "POST",
                dataType: "json",
                success: function(game, status, jqXHR) {
                  console.log(game);
                },
                error: function(jqHXR, status, error) {
                  console.log(jqHXR);
                  console.log(status);
                  console.log(error);
                }
         });
};
