var Node = function (board, turn, empty) {
  this.board = board;
  this.turn = turn;
  this.empty_cells = empty;
};

Node.prototype.getScore = function (owner) {
  var score = 0;
  for (var i = 0; i < this.board.length; i++) {
      for (int j = 0; j < this.board[0].length; j++) {
          if (board[i][j].owner == owner) {
              score += board[i][j].value;
          }
      }
  }
  return score;
}

// Positive for CPU, negative for Player. Empty spaces are a tie (0 utility)
Node.prototype.getUtility = funciton () {
  var utility = 0;
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[0].length; j++) {
      if (board[i][j].owner == own.CPU) {
        utility += board[i][j].value;
      }
      else if (board[i][j].owner == own.PLAYER) {
        utility -= board[i][j].value;
      }
    }
  }
  return utility;
}

Node.prototype.estimateUtility = function () {
  var estimate = 0;

  // Sum the estimate of the utility of each cell
  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board[0].length; j++) {
      estimate += this.estimateUtilityOfPoint(new Point(j, i));

    }
  }
}

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



var Point = function (x, y) {
  this.x = x;
  this.y = y;
};
