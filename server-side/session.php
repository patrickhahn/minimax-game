<?php

session_start();

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // return session state

  if ((count($path_components) >= 2) && ($path_components[1] == "login")) {

    $json_obj = array('id' => $SESSION_['userId'],
		      'username' => $SESSION_['username'],
		      'password' => $SESSION_['password']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
  else if ((count($path_components) >= 2) && ($path_components[1] == "ai")) {

    $json_obj = array('id' => $SESSION_['aiId'],
		      'depth' => $SESSION_['depth'],
		      'type' => $SESSION_['type'],
          'name' => $SESSION_['aiName']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  // update session state

  if ((count($path_components) >= 5) && ($path_components[1] == "login")) {

    $SESSION_['userId'] = intval($path_components[2]);
    $SESSION_['username'] = $path_components[3];
    $SESSION_['password'] = $path_components[4];

    $json_obj = array('id' => $SESSION_['userId'],
		      'username' => $SESSION_['username'],
		      'password' => $SESSION_['password']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
  else if ((count($path_components) >= 6) && ($path_components[1] == "ai")) {
    $SESSION_['aiId'] = intval($path_components[2]);
    $SESSION_['aiName'] = $path_components[3];
    $SESSION_['type'] = intval($path_components[4]);
    $SESSION_['depth'] = intval($path_components[5]);

    $json_obj = array('id' => $SESSION_['aiId'],
          'depth' => $SESSION_['depth'],
          'type' => $SESSION_['type'],
          'name' => $SESSION_['aiName']);

    header("Content-type: application/json");
    print(json_encode($json_obj));
    exit();
  }
}

?>
