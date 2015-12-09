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

		window.location.href="../currentgame/currentgame.html";
	});

});
