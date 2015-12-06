$(document).ready(function(){

	$(".professor").click(function(e){
		// $.ajax(url_base + "session.php",
	  //        {type: "PUT",
		//               dataType: "json",
    //               data: $(this).serialize(),
		//               success: function(todo_ids, status, jqXHR) {
		//                 for (var i=0; i<todo_ids.length; i++) {
		// 	                oad_todo_item(todo_ids[i]);
		//                 }
		//               }
	  //        });
		window.location.href="../currentgame/currentgame.html";
	});

});
