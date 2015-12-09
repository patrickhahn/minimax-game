$(document).ready(function(){
	// relative path to the project directory
	var url_base = "../../"
	var player = getSessionUser(url_base);
	console.log(player);

	$(".professor").click(function(e){

		window.location.href="../currentgame/currentgame.html";
	});

});
