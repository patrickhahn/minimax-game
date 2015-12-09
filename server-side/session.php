<?php

session_start();

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // return session state

  if ((count($path_components) >= 2) && ($path_components[1] == "login")) {

    $json_obj = array('id' => $_SESSION['userId'],
		      'username' => $_SESSION['username'],
		      'password' => $_SESSION['password']);

    // $json_obj = array('sessionid' => _SESSIONid());

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
  else if ((count($path_components) >= 2) && ($path_components[1] == "ai")) {

    $json_obj = array('id' => $_SESSION['aiId'],
		      'depth' => $_SESSION['depth'],
		      'type' => $_SESSION['type'],
          'name' => $_SESSION['aiName']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // update session state

  if ((count($path_components) >= 5) && ($path_components[1] == "login")) {

    $_SESSION['userId'] = intval($path_components[2]);
    $_SESSION['username'] = $path_components[3];
    $_SESSION['password'] = $path_components[4];

    $json_obj = array('id' => $_SESSION['userId'],
		      'username' => $_SESSION['username'],
		      'password' => $_SESSION['password']);

    // $json_obj = array('sessionid' => _SESSIONid());

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
  else if ((count($path_components) >= 6) && ($path_components[1] == "ai")) {
    $_SESSION['aiId'] = intval($path_components[2]);
    $_SESSION['aiName'] = $path_components[3];
    $_SESSION['type'] = intval($path_components[4]);
    $_SESSION['depth'] = intval($path_components[5]);

    $json_obj = array('id' => $_SESSION['aiId'],
          'depth' => $_SESSION['depth'],
          'type' => $_SESSION['type'],
          'name' => $_SESSION['aiName']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
}

?>
