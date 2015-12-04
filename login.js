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
