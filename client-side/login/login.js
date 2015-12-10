$(document).ready(function() {
  var url_base = "../server-side/";

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

  // Sign Up
  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();

    $.ajax(url_base + "gameAPI.php/login/" + username + "/" + password,
	         {type: "POST",
                  dataType: "json",
		              success: function(player, status, jqXHR) {
		                console.log(player);
                    if (player.id > -1) {
                      loginPlayer(url_base, player.id, player.username, player.password);
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

  // Log In
  $("#submituser").click(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log(username,password);

    $.ajax(url_base + "gameAPI.php/login/" + username + "/" + password,
	         {type: "GET",
                  dataType: "json",
		              success: function(player, status, jqXHR) {
		                console.log(player != false);
                    if (player) {
                      loginPlayer(url_base, player.id, player.username, player.password);
                    } else {
                      console.log("Player did not exist");
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

var loginPlayer = function (url_base, id, username, password) {

  $.ajax(url_base + "session.php/login/" + id + "/" + username + "/" + password,
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
  window.location.href="./newgame/newgame.html";
};
