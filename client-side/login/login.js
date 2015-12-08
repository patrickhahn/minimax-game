$(document).ready(function() {
  var url_base = "../server-side/";

  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();

    $.ajax(url_base + "login/" + username + "/" + password,
	         {type: "POST",
		              success: function(player, status, jqXHR) {
		                console.log(player);
                    if (player.id > -1) {
                      loginPlayer(player.username, player.password);
                    }
		              },
                  error: function(jqHXR, status, error) {
                    console.log(jqHXR);
                    console.log(status);
                    console.log(error);
                  }
	         });
    });

    loginPlayer(url_base, username, password);
});

var loginPlayer = function (url_base, username, password) {

  $.ajax(url_base + "session.php/login",
         {type: "GET",
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
