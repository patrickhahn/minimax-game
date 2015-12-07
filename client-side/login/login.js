$(document).ready(function() {
  var url_base = "../server-side/gameAPI.php";

  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();

    $.ajax(url_base + "/login/" + username + "/" + password,
	         {type: "POST",
                  dataType: "json",
		              success: function(player, status, jqXHR) {
		                console.log(player);
		              },
                  error: function(jqHXR, status, error) {
                    console.log(jqHXR);
                    console.log(status);
                    console.log(error);
                  }
	         });
  });

});
