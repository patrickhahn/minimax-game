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

	$.ajax(url_base + "gameAPI.php/leaderboard/all/1/50/",
         {type: "GET",
                dataType: "json",
                success: function(games, status, jqXHR) {
                  console.log(games);
									$("#games").append('<tr><td>Player</td><td>Player Score</td><td>Professor</td><td>Professor Score</td></tr>');
									for (var i=0; i<games.length; i++) {
			   						loadGameResult(games[i]);
		       				}
                },
                error: function(jqHXR, status, error) {
                  console.log(jqHXR);
                  console.log(status);
                  console.log(error);
                }
         });


});

var loadGameResult = function(game) {
	console.log(game);
	var result = JSON.parse(game)
	console.log(result);
	$("#games").append('<tr><td>' + result.player + '</td><td>' + result.playerScore + '</td><td>' + result.ai + '</td><td>' + result.aiScore + '</td></tr>');
};
