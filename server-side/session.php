<?php

session_start();

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // return session state

} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
  // update session state

}

$_SESSION['k1'] = "Here is some information saved in \$_SESSION";

?>
