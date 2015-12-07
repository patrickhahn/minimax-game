
<?php
require_once 'API.class.php';
require_once 'Ai.php';
require_once 'Player.php';
require_once 'Game.php';
class gameAPI extends API
{


    public function __construct($request, $origin) {
        parent::__construct($request);

    }

     protected function ai($name) {
        if ($this->method == 'GET') {
             if (Ai::findByName($name)!=null)
                  return Ai::findByName($name);
            }
            return null;

     }
     protected function login($username,$password) {
        if ($this->method == 'GET') {
             if (Player::login($username,$passowrd)!=null)
                  return Player::login($username,$passowrd);
            }
      else if ($this->method == 'POST')
      {
            if (Player::signUp($username,$passowrd)!=null)
                 return Player::signUp($username,$passowrd);
      }
            return null;

     }

     protected function leaderBoard() {
        if ($this->method == 'GET') {
             if (Game::getRange(1,50)!=null)
                  return Game::signUp(1,50);
            }
            return null;

     }
 }
//Guide at: http://coreymaynard.com/blog/creating-a-restful-api-with-php/
