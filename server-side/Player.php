<?php
class Player
{
            private $id;
            private $username;
            private $password;

            private static function create($username,$password)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");

                 $mysqli->real_escape_string($username);
                 $mysqli->real_escape_string($password);
                  $result= $mysqli->query("insert into Player values (0,'". $username."','". $password ."')");
                  if ($result)
                  {
                        $new_id = $mysqli->insert_id;
                        return new Player($new_id,$username,$password);
                  }
                  return null;
            }

            public static function find_byID ($id)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $id=$mysqli->real_escape_string($id);
                  $result = $mysqli->query("select * from Player where id = " . $id);
                  if($result)
                  {
                        if ($result->num_rows == 0)
                        {
				return null;
			      }
			$player_info = $result->fetch_array();
			return new Player($player_info['id'],
					      $player_info['username'],
					      $player_info['password']);
                  }
                  return null;
            }

            public static function findByUsername ($username)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $username=$mysqli->real_escape_string($username);
                  $result = $mysqli->query("select * from Player where username = " . $username);
                  if($result)
                  {
                        if ($result->num_rows == 0)
                        {
				return null;
			      }
			$player_info = $result->fetch_array();
			return new Player($player_info['id'],
					      $player_info['username'],
					      $player_info['password']);
                  }
                  return null;
            }

            public static function getRange($start, $end) {
		if ($start < 0) {
			if ($end > $start) {
				return null;
			}
			$direction = "DESC";
			$start *= -1;
			$end *= -1;
		} else {
			if ($end < $start) {
				return null;
			}
			$direction = "ASC";
		}
            $mysqli = new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
		$result = $mysqli->query("select id from Player order by id " . $direction);
		$players = array();

		if ($result) {
			for ($i=1; $i<$start; $i++) {
				$result->fetch_row();
			}
			for ($i=$start; $i<=$end; $i++) {
				$next_row = $result->fetch_row();
				if ($next_row) {
					$players[] = Player::findByID($next_row[0]);
				}
			}
		}
		return $players;
	}

            public static function login($username,$password)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $mysqli->real_escape_string($username);
                 $mysqli->real_escape_string($password);
                  $result = $mysqli->query("select * from Player where username = " . $username . " and password = " . $password);
                  if($result->num_rows==0)
                  {
                        return null;
                  }
                  return Player::findByID($next_row[0]);
            }

            public static function signUp($username,$password)
            {

                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $mysqli->real_escape_string($username);
                 $mysqli->real_escape_string($password);
                  $result = $mysqli->query("select * from Player where username = " . $username);
                  if($result->num_rows===0)
                  {
                        return Player::create($username,$password);
                  }
                  return null;
            }

            private function __construct($id, $username, $passowrd)
            {
                  $this->id = $id;
                  $this->username = $username;
                  $this->password = $password;
                  }

            public function getID()
            {
		return $this->id;
	      }

            public function getUsername()
            {
		return $this->username;
	      }

            public function authenticate($password)
            {
		return $this->password==$password;
	      }


            private function getPassword()
            {
                  return $this->password;
            }

            public function updatePassword($oldPassword,$newPassword)
            {
                  if ($this->authenticate($oldPassword))
                  {
                              $this->password=$newPassword;
                              $result = $mysqli->query("update Player set password = " . $this->password . " where id = " . $this->id);
                              return $result;
                  }
                  else
                  return false;
            }

}
?>
