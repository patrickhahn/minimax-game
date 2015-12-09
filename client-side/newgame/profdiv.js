$(document).ready(function(){
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

	$(".professor").click(function(e){
		var aiName = $(this).children().first().attr('id');

		$.ajax(url_base + "gameAPI.php/ai/" + username + "/" + password,
	         {type: "GET",
                  dataType: "json",
		              success: function(ai, status, jqXHR) {
		                console.log(ai);
                    registerAI(url_base, ai.id, ai.name, ai.type, ai.depth);
		              },
                  error: function(jqHXR, status, error) {
                    console.log(jqHXR);
                    console.log(status);
                    console.log(error);
                  }
	         });
	});

});

var registerAI = function (url_base, id, name, type, depth) {

  $.ajax(url_base + "session.php/ai/" + id + "/" + name + "/" + type + "/" + depth,
         {type: "POST",
                success: function(result, status, jqXHR) {
                  console.log(result);
                },
                error: function(jqHXR, status, error) {
                  console.log(jqHXR);
                  console.log(status);
                  console.log(error);
                }
         });
  window.location.href="../currentgame/currentgame.html";
};
