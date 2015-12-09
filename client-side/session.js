function getSessionUser(url_base) {
  $.ajax(url_base + "server-side/session.php/login/",
         {type: "GET",
                dataType: "json",
                success: function(player, status, jqXHR) {
                  console.log(player);
                  return player;
                },
                error: function(jqHXR, status, error) {
                  console.log(jqHXR);
                  console.log(status);
                  console.log(error);
                }
         });
}
