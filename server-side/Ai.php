<?php
class Ai
{
            private $id;
            private $depth;
            private $type;
            private $name;

            /*public static function create($depth,$type,$name)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result= $mysqli->query("insert into Ai values (0,". $depth.",". $type . ",". $name .")");

                  if ($result)
                  {
                        $new_id = $mysqli->insert_id;
                        return new Ai($new_id,$depth,$type,$name);
                  }
                  return null;
            }*/

            public static function find_byID ($id)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $result = $mysqli->query("select * from Ai where id = " . $id);
                  if($result)
                  {
                        if ($result->num_rows == 0)
                        {
				return null;
			      }
			$ai_info = $result->fetch_array();
			return new Ai($ai_info['id'],
					      $ai_info['depth'],
                                    $ai_info['type'],
					      $ai_info['name']);
                  }
                  return null;
            }

            public static function findByName ($name)
            {
                  $mysqli= new mysqli("classroom.cs.unc.edu", "zrkaplan", "KMP4president", "zrkaplandb");
                  $name=$mysqli->real_escape_string($name);
                  $result = $mysqli->query("select * from Ai where name = '" . $name."'");
                  if($result)
                  {
                        if ($result->num_rows == 0)
                        {
				return null;
			      }
			$ai_info = $result->fetch_array();
			return new Ai($ai_info['id'],
					  $ai_info['depth'],
                                $ai_info['type'],
					  $ai_info['name']);
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
		$result = $mysqli->query("select id from Ai order by id " . $direction);
		$ais = array();

		if ($result) {
			for ($i=1; $i<$start; $i++) {
				$result->fetch_row();
			}
			for ($i=$start; $i<=$end; $i++) {
				$next_row = $result->fetch_row();
				if ($next_row) {
					$ais[] = Ai::findByID($next_row[0]);
				}
			}
		}
		return $ais;
	}

            private function __construct($id, $depth, $type, $name)
            {
                  $this->id = $id;
                  $this->depth = $depth;
                  $this->type = $type;
                  $this->name = $name;
                  }

            public function getID()
            {
		return $this->id;
	      }

            public function getDepth()
            {
		return $this->depth;
	      }

            public function getType()
            {
		return $this->type;
	      }

            public function getName()
            {
		return $this->name;
	      }



}
?>
