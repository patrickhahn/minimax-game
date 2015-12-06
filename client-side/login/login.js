$(document).ready(function() {
  var url_base = "../../server-side/";

  $("#submitnew").click(function(e) {
    e.preventDefault();
    var username = $("#newUsername").val();
    var password = $("#newPassword").val();

    $.ajax(url_base + "session.php",
	         {type: "POST",
		              dataType: "json",
                  data: $(this).serialize(),
		              success: function(todo_ids, status, jqXHR) {
		                for (var i=0; i<todo_ids.length; i++) {
			                oad_todo_item(todo_ids[i]);
		                }
		              }
	         });
  });

  };

});
