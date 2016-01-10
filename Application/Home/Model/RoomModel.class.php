<?php
namespace Home\Model;
use Think\Model;

class RoomModel extends CommModel {
	
	public function room_list($game_id,$join = false){
		$list = $this->where("game_id='{$game_id}'")->select();
		$join&&$list = $this->getjoin($this,$list);
		return $list;
	}
	
	public function getjoind($low){
		$low['play_count'] = $this->play_count($low['id']);
		$low['room_users'] = D("UserRoom")->room_users($low['id']);
		return $low;
	}
	
	public function play_count($room_id){
		return M("UserRoom")->where("room_id = '{$room_id}'")->count();
	}

}