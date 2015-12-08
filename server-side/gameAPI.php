<?php
require_once('Ai.php');
require_once('Player.php');
require_once('Game.php');

$path_components = explode('/', $_SERVER['PATH_INFO']);

// Note that since extra path info starts with '/'
// First element of path_components is always defined and always empty.

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  // GET means either instance look up, index generation, or deletion

  // Following matches instance URL in form
  // /todo.php/<id>

  if ((count($path_components) >= 2) &&
      ($path_components[1] != "")) {

            if ($path_components[1] == "login")
            {
                  $username=$path_components[2];
                  $password=$path_components[3];
                  if ($result=Player::login($username,$passowrd)!=null) {
                    header("Content-type: application/json");
                    print(json_encode($result));
                    exit();
                  }
                  else {
                    header("Content-type: application/json");
                    print(json_encode(new Player(-1, null, null)));
                    exit();
                  }
            }
            if ($path_components[1] == "ai")
            {
                  $name=$path_components[2];
                  if ($result=Ai::findByName($name)!=null){
                       header("Content-type: application/json");
                       print(json_encode($result));
                       exit();
                 }
                 else {
                       header("HTTP/1.0 404 Not Found");
                       print("Ai name: " . $name . " not found.");
                       exit();
                 }
            }
            if ($path_components[1] =="leaderBoard")
            {
                  if (Game::getRange(1,50)!=null)
                       header("Content-type: application/json");
                       print(json_encode(Game::signUp(1,50)));
                       exit();
                 }
                  else{
                        header("HTTP/1.0 404 Not Found");
                        print("Leaderboard not found.");
                        exit();
                  }
            }

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

      if ((count($path_components) >= 2) &&
          ($path_components[1] != "")) {

      if ($path_components[1] == "login")
      {
            $username=$path_components[2];
            $password=$path_components[3];
            if ($reult=Player::signUp($username,$password)!=null) {
              header("Content-type: application/json");
              print(json_encode($result));
              exit();
            }
            else {
            header("HTTP/1.0 400 Bad Request");
           	print("Username is already taken");
           	exit();
            }
      }
      /*if ($path_components[1] == "game")
      {
            $path_components[2]=$username;
            $path_components[3]=$password;
            if (Player::login($username,$passowrd)!=null) {
              header("Content-type: application/json");
              print(json_encode(Player::login($username,$passowrd)));
              exit();
            }
            else {
              header("Content-type: application/json");
              print(json_encode(new Player(-1, null, null)));
              exit();
            }
      }*/
?>
