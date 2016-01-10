<?php
namespace Home\Model;
use Think\Model;

class UserRoomModel extends CommModel {
	
	public function room_users($room_id, $me = false){
		$list = $this->where("room_id = '{$room_id}'")->select();
		if($me){
			foreach($list as &$low){
				$low['me'] = false;
				if($low['user_id']==UID){
					$low['me'] = true;
				}
			}
		}
		return $list;
	}
	
	public function into_room($user_id, $room_id ,$pos=0){
		$this->out_room($user_id);
		$map['pos'] = $pos;
		$map['ready'] = 0;
		$map['user_id'] = $user_id;
		$map['room_id'] = $room_id;
		return $this->add($map);
	}
	
	
	public function user_room($user_id){
		$rs = $this->where(" user_id = '{$user_id}'")->find();
		return $rs;
	}
	
	public function out_room($user_id){
		return $this->where(" user_id = '{$user_id}'")->delete();
	}
	
	public function ready($user_id, $room_id){
		$rs = $this->where(" user_id = '{$user_id}' and  room_id = '{$room_id}' ")->save(array('ready'=>1));
		if($this->is_all_ready($room_id)){
			//D("Action")->begin();
			return 5;
		}
		return $rs;
	}
	
	public function noready($user_id, $room_id){
		$rs = $this->where(" user_id = '{$user_id}' and  room_id = '{$room_id}' ")->save(array('ready'=>0));
		return $rs;
	}
	
	public function is_all_ready($room_id){
		$list = $this->where(" room_id = '{$room_id}' ")->select();
		if(count($list)<2){
			return false;
		}
		foreach($list as $low){
			if($low['ready']==0){
				return false;
			}
		}
		return true;
	}
	
	
}