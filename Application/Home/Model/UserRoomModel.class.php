<?php
namespace Home\Model;
use Think\Model;

class UserRoomModel extends CommModel {
	
	public function room_users($room_id){
		$list = $this->where("room_id = '{$room_id}'")->select();
		return $list;
	}

}