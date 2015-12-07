var AlphaBetaAgent = function(depth) {
  this.depth = depth;
};

AlphaBetaAgent.prototype.chooseMove = function(board) {
  // returns cell where the CPU agent should move
  var node = new Node(board, own.CPU, Node.getEmptyCells(board));
  var move_utility = this.alphabeta(node, own.CPU, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, this.depth);
  return move_utility.move;
};

AlphaBetaAgent.prototype.alphabeta = function(node, turn, a, b, depth) {
  var alpha = a;
  var beta = b;
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
      var score = this.alphabeta(node.transition(moves[i]), own.PLAYER, alpha, beta, depth-1).utility;
      if (score > best_move.utility) {
        best_move = new MoveUtilityPair(moves[i], score);
      }

      // update alpha
      alpha = Math.max(alpha, score);

      // prune siblings when beta <= alpha
      if (beta <= alpha) {
        break;
      }
    }
    return best_move;
  } else {
    var best_move = new MoveUtilityPair(null, Number.POSITIVE_INFINITY);

    // Check all posssible moves and pick the best for the human player
    var moves = node.getPossibleMoves();

    for (var i = 0; i < moves.length; i++) {
      var score = this.alphabeta(node.transition(moves[i]), own.CPU, alpha, beta, depth-1).utility;
      if (score < best_move.utility) {
        best_move = new MoveUtilityPair(moves[i], score);
      }

      // update beta
      beta = Math.min(beta, score);

      // prune siblings when beta <= alpha
      if (beta <= alpha) {
        break;
      }
    }
    return best_move;
  }
};
