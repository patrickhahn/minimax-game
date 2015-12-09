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
                  $result=Player::login($username,$passowrd);
                  if ($result!=null) {
                    header("Content-type: application/json");
                    print($result->getJSON());
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
                  $result=Ai::findByName($name);
                  if ($result!=null){
                       header("Content-type: application/json");
                       print($result->getJSON());
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
                  if ($path_components[2] =="all")
                  {
                        $start=$path_components[3];
                        $end=$path_components[4];
                        $result=Game::getRange($start,$end);
                        if ($result!=null){
                             header("Content-type: application/json");
                            print($result->getJSON());
                            exit();
                      }
                        else{
                              header("HTTP/1.0 404 Not Found");
                              print("Leaderboard not found.");
                              exit();
                        }
                  }
                        else if ($path_components[2] =="name")
                        {
                              $name=$path_components[3];
                              $start=$path_components[4];
                              $end=$path_components[5];
                              $id=Player::findByUsername($name)->getID();
                              $result=Game::findByUserID($start,$end,$id);
                              if ($result!=null){
                                   header("Content-type: application/json");
                                  print($result->getJSON());
                                  exit();
                            }
                              else{
                                    header("HTTP/1.0 404 Not Found");
                                    print("Leaderboard not found.");
                                    exit();
                              }
                        }
                        else if ($path_components[2] =="ai")
                              {
                                    $name=$path_components[3];
                                    $start=$path_components[4];
                                    $end=$path_components[5];
                                    $id=Ai::findByName($name)->getID();
                                    $result=Game::findByAiID($start,$end,$id);
                                  if($result!=null){
                                         header("Content-type: application/json");
                                        print($result->getJSON());
                                        exit();
                                  }
                                    else{
                                          header("HTTP/1.0 404 Not Found");
                                          print("Leaderboard not found.");
                                          exit();
                                    }
                        }

            }
  }
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {

      if ((count($path_components) >= 2) &&
          ($path_components[1] != "")) {

        if ($path_components[1] == "login")
        {
              $username=$path_components[2];
              $password=$path_components[3];
              $result=Player::signUp($username,$password);
              if ($result!=null) {
                header("Content-type: application/json");
                print($result->getJSON());
                exit();
              }
              else {
              header("HTTP/1.0 400 Bad Request");
             	print("Username is already taken");
             	exit();
              }
        }
        if ($path_components[1] == "game")
        {
                $name=$path_components[2];
                $aiName=$path_components[3];
                $playerScore=$path_components[4];
                $aiScore=$path_components[5];
                $playerId=Player::findByUserName($name)->getID();
                $aiId=Ai::findByName($aiName)->getID();
                $result=Game::create($playerId,$aiId,$playerScore,$aiScore);
                if ($result!=null) {
                  header("Content-type: application/json");
                  print($result->getJSON());
                  exit();
                }
                else {
                header("HTTP/1.0 404 Bad Request");
               	print("Something went wrong");
               	exit();
                }

        }
      }
}
?>
