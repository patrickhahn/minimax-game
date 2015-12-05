<?php
class Game
{
            private $id;
            private $player;
            private $ai;
            private $playerScore;
            private $aiScore;

            public static function create($player,$ai,$playerScore,$aiScore)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result= $mysqli->query("insert into Game values (0,". $player.",". $ai .",". $playerScore .",". $aiScore .")");

                  if ($result)
                  {
                        $new_id = $mysqli->insert_id;
                        return new Game($new_id,$player,$ai,$playerScore,$aiScore);
                  }
                  return null;
            }

            public static function find_byID ($id)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result = $mysqli->query(mysqli_real_escape_string("select * from Game where id = " . $id));
                  if($result)
                  {
                        if ($result->num_rows == 0)
                        {
				return null;
			      }
			$game_info = $result->fetch_array();
			return new Game($game_info['id'],
					      $game_info['player'],
					      $game_info['ai'],
					      $game_info['playerScore'],
                                    $game_info['aiScore']);
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
		$result = $mysqli->query(mysqli_real_escape_string("select id from Games order by id " . $direction));
		$games = array();

		if ($result) {
			for ($i=1; $i<$start; $i++) {
				$result->fetch_row();
			}
			for ($i=$start; $i<=$end; $i++) {
				$next_row = $result->fetch_row();
				if ($next_row) {
					$games[] = Game::findByID($next_row[0]);
				}
			}
		}
		return $games;
	}
            public static function findByUserID($userId)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result = $mysqli->query(mysqli_real_escape_string("select * from Game where playerId = " . $userId));
                  $games = array();
                  do{
      			$next_row = $result->fetch_row();
      				if ($next_row) {
      					$games[] = Game::findByID($next_row[0]);
      				}
      		}while($next_row);

      		return $games;
            }

            public static function findByAiID($aiId)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result = $mysqli->query(mysqli_real_escape_string("select * from Game where aiId = " . $aiId));
                  $games = array();
                  do{
      			$next_row = $result->fetch_row();
      				if ($next_row) {
      					$games[] = Game::findByID($next_row[0]);
      				}
      		}while($next_row);

      		return $games;
            }

            private function __construct($id, $player, $ai, $playerScore, $aiScore)
            {
                  $this->id = $id;
                  $this->player = $player;
                  $this->ai = $ai;
                  $this->playerScore = $playerScore;
                  $this->aiScore = $aiScore;
            }

            public function getID()
            {
		return $this->id;
	      }

            public function getPlayer()
            {
		return $this->player;
	      }

            public function getAi()
            {
		return $this->ai;
	      }

            public function getPlayerScore()
            {
		return $this->playerScore;
	      }

            public function getAiScore()
            {
		return $this->aiScore;
	      }
}
?>
