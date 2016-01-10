<?php
namespace Home\Model;
use Think\Model;

class GameModel extends CommModel {
	
	public function game_list($join = true){
		$list = $this->select();
		$join&&$list = $this->getjoin($this,$list);
		return $list;
	}
	

	public function getjoind($low){
		$low['play_count'] = $this->play_count();
		return $low;
	}
	
	public function play_count($game_id){
		$count = 0;
		$roomM = D("Room");
		$room_list = $roomM->room_list($low['id'],false);
		foreach($room_list as &$low){
			$count += $roomM->play_count($low['id']);
		}
		return $count;
	}

}