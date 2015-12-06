var Node = function (board, turn, empty) {
  this.board = Node.copyBoard(board);
  this.turn = turn;
  this.empty_cells = empty;
};

Node.prototype.getScore = function (owner) {
  var score = 0;
  for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[0].length; j++) {
          if (board[i][j].owner == owner) {
              score += board[i][j].value;
          }
      }
  }
  return score;
};

// Positive for CPU, negative for Player. Empty spaces are a tie (0 utility)
Node.prototype.getUtility = function () {
  var utility = 0;
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[0].length; j++) {
      if (this.board[i][j].owner == own.CPU) {
        utility += this.board[i][j].value;
      }
      else if (this.board[i][j].owner == own.PLAYER) {
        utility -= this.board[i][j].value;
      }
    }
  }
  return utility;
};

Node.prototype.estimateUtility = function () {
  var estimate = 0;

  // Sum the estimate of the utility of each cell
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[0].length; j++) {
      estimate += this.estimateUtilityOfPoint(new Point(j, i));
    }
  }
  return estimate;
};

Node.prototype.estimateUtilityOfPoint = function (point) {
  var cell = this.board[point.y][point.x];
  var owner = cell.owner

  // Empty cells get estimate of 0
  if (owner == own.EMPTY) {
    return 0;
  }
  else {
    var current_utility = cell.value;
    var enemy = (owner == own.CPU ? own.PLAYER : own.CPU);

    // Check if the piece is surrounded on all 4 sides by pieces
    var surrounded = true;
    var neighbors = this.getCompassNeighbors(point);
    for (var i = 0; i < neighbors.length; i++) {
      if (this.board[neighbors[i].y][neighbors[i].x].owner == own.EMPTY) {
        surrounded = false;
      }
    }

    // If so, then the piece is permanently safe from capture.
    // In that case, the estimated utility of this square is exactly
    // its current utility
    if (surrounded) {
      return (owner == own.CPU ? current_utility : -current_utility);
    }

    // Check if a piece could be captured by an enemy move
    // on the enemy's next turn.
    var threatened = false;
    var distance2neighbors = this.getDistance2Neighbors(point);

    for (var i = 0; i < distance2neighbors.length; i++) {

      // If a distance 2 piece is an enemy piece
      if (this.board[distance2neighbors[i].y][distance2neighbors[i].x].owner == enemy) {
        neighbors = this.getCompassNeighbors(point);
        for (var j = 0; j < neighbors.length; j++) {
          // And if a piece adjacent to the distance 2 candy and the current
          // square is empty
          if (Point.getManhattanDistance(neighbors[j], distance2neighbors[i]) == 1 &&
              this.board[neighbors[j].y][neighbors[j].x].owner == own.EMPTY) {

              // Then the enemy can capture the current piece on their next turn
              threatened = true;
          }
        }
      }
    }

    // If so, then the piece is susceptible to capture right now
    // In that case, the estimated utility of this square is 1/4 of
    // its current utility, because it probably won't stay as our piece
    if (threatened) {
      return 0.25*(owner == own.CPU ? current_utility : -current_utility);
    }
    // Otherwise, the piece is not currently susceptible to capture,
    // but also not permanently safe.  It could be taken by the enemy
    // int the future, so we half its utility in our estimate
    else {
      return 0.5*(owner == own.CPU ? current_utility : -current_utility);
    }
  }
};

Node.prototype.getCompassNeighbors = function (point) {
  var x = point.x;
  var y = point.y;
  var neighbors = [];

  if (x > 0) {
    neighbors.push(new Point(x-1, y));
  }
  if (x + 1 < this.board[0].length) {
    neighbors.push(new Point(x+1, y));
  }
  if (y > 0) {
    neighbors.push(new Point(x, y-1));
  }
  if (y + 1 < this.board.length) {
    neighbors.push(new Point(x, y+1));
  }
  return neighbors;
}

Node.prototype.getDistance2Neighbors = function (point) {
  var x = point.x;
  var y = point.y;
  var distance2neighbors = [];

  if (x > 0 && y > 0) {
    distance2neighbors.push(new Point(x - 1, y - 1));
  }
  if (x > 0 && y + 1 < this.board.length) {
    distance2neighbors.push(new Point(x - 1, y + 1));
  }
  if (x + 1 < this.board[0].length && y > 0) {
    distance2neighbors.push(new Point(x + 1, y - 1));
  }
  if (x + 1 < this.board[0].length && y + 1 < this.board.length) {
    distance2neighbors.push(new Point(x + 1, y + 1));
  }
  if (x - 2 >= 0) {
    distance2neighbors.push(new Point(x - 2, y));
  }
  if (x + 2 < this.board[0].length) {
    distance2neighbors.push(new Point(x + 2, y));
  }
  if (y - 2 >= 0) {
    distance2neighbors.push(new Point(x, y - 2));
  }
  if (y + 2 < this.board.length) {
    distance2neighbors.push(new Point(x, y + 2));
  }
  return distance2neighbors;
};

// Returns true if the state is a terminal state
Node.prototype.isTerminal = function () {
    return this.empty_cells == 0;
};

Node.prototype.getPossibleMoves = function () {
  var moves = [];

  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[0].length; j++) {
      if (this.board[i][j].owner == own.EMPTY) {
        var move = new Cell(this.board[i][j].game, this.board[i][j].x, this.board[i][j].y);
        moves.push(move);
      }
    }
  }
  return moves;
};

Node.prototype.transition = function (move) {
  var next_turn = (this.turn == own.CPU ? own.PLAYER : own.CPU);
  var new_board = Node.copyBoard(this.board);

  new_board[move.y][move.x] = move;

  var new_node = new Node(new_board, next_turn, this.empty_cells - 1);
  new_node.update(move);

  return new_node;
};

Node.prototype.update = function (move) {
  var mover = move.owner;
  var has_adjacent_friendly = false;
  var neighbors = this.getCompassNeighbors(new Point(move.x, move.y));

  // Check if the point had an adjacent friendly piece
  for (var i = 0; i < neighbors.length; i++) {
    if (this.board[neighbors[i].y][neighbors[i].x].owner == mover) {
      has_adjacent_friendly = true;
    }
  }

  // If so, convert the adjacent enemy pieces
  if (has_adjacent_friendly) {
    for (var i = 0; i < neighbors.length; i++) {
      if (this.board[neighbors[i].y][neighbors[i].x].owner != own.EMPTY) {
        this.board[neighbors[i].y][neighbors[i].x].owner = mover;
      }
    }
  }
};

Node.getEmptyCells = function (board) {
  var width = board.length;
  var height = board[0].length;
  var empty = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      if (board[y][x].owner == own.EMPTY) {
        empty++;
      }
    }
  }
  return empty;
};

Node.copyBoard = function (board) {
  var copy = new Array(board.length);

  for (var y = 0; y < board.length; y++) {
    copy[y] = new Array(board[0].length);
    for (var x = 0; x < board[0].length; x++) {
      var cell = new Cell(null, x, y);
      cell.owner = board[y][x].owner;
      copy[y][x] = cell;
    }
  }
  return copy;
}

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};

Point.getManhattanDistance = function (p1, p2) {
  return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
};
