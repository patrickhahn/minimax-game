$(document).ready(function() {
  var url_base = "../server-side/gameAPI.php/";

  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();

    $.ajax(url_base + "login/" + username + "/" + password,
	         {type: "POST",
                  dataType: "json",
		              success: function(player, status, jqXHR) {
		                console.log(player.id);
                    if (player.id > -1) {
                      loginPlayer(player.username, player.password);
                    } else {
                      console.log("Player id <= -1 or did not exist");
                    }
		              },
                  error: function(jqHXR, status, error) {
                    console.log(jqHXR);
                    console.log(status);
                    console.log(error);
                  }
	         });
    });
});

var loginPlayer = function (url_base, username, password) {

  $.ajax(url_base + "session.php/login",
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
};
