$(document).ready(function() {
  var current_game = new Game($('#gameboard'));

  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();
  });

  var reset_game = function() {
    if (current_game != null) {
      current_game.kill();
    }

    current_game = new Game($('#gameboard'));
  };

});
