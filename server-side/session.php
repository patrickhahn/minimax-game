<?php

session_start();

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // return session state

} else if ($_SERVER['REQUEST_METHOD'] == "PUT") {
  header("HTTP/1.0 404 Not Found");
  print("path components, 1: " . $path_components[1] . " 2: " . $path_components[2] . " 3: " . $path_components[3]);
  exit();

  // update session state
  if ((count($path_components) >= 2) && ($path_components[1] == "login")) {

  }
}

// $_SESSION['k1'] = "Here is some information saved in \$_SESSION";

?>
