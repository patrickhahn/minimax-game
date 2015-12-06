var MinimaxAgent = function(depth) {
  this.depth = depth;
};

MinimaxAgent.prototype.chooseMove = function(board) {
  // returns cell where the CPU agent should move
  var node = new Node(board, own.CPU, Node.getEmptyCells(board));
  var move_utility = this.minimax(node, own.CPU, this.depth);
  return move_utility.move;
};

MinimaxAgent.prototype.minimax = function(node, turn, depth) {
  if (node.isTerminal()) {
    return new MoveUtilityPair(null, node.getUtility());
  }
  else if (depth <= 0) {
    return new MoveUtilityPair(null, node.estimateUtility());;
  }
  else if (turn == own.CPU) {
    var best_move = new MoveUtilityPair(null, Number.NEGATIVE_INFINITY);

    // Check all posssible moves and pick the best for the CPU agent
    var moves = node.getPossibleMoves();
    for (var i = 0; i < moves.length; i++) {
      var score = this.minimax(node.transition(moves[i]), own.PLAYER, depth-1).utility;
      if (score > best_move.utility) {
        best_move = new MoveUtilityPair(moves[i], score);
      }
    }
    return best_move;
  } else {
    var best_move = new MoveUtilityPair(null, Number.POSITIVE_INFINITY);

    // Check all posssible moves and pick the best for the human player
    var moves = node.getPossibleMoves();

    for (var i = 0; i < moves.length; i++) {
      var score = this.minimax(node.transition(moves[i]), own.CPU, depth-1).utility;
      if (score < best_move.utility) {
        best_move = new MoveUtilityPair(moves[i], score);
      }
    }
    return best_move;
  }
};

var MoveUtilityPair = function(move, utility) {
  // move is a Cell
  this.move = move;
  this.utility = utility;
};
