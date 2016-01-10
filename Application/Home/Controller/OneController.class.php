<?php
namespace Home\Controller;

use Think\Controller;

class OneController extends CommController
{
    public function into_room()
    {
		$room_id = I("post.room_id",0);
		$pos = I("post.pos",false);
		$urM = D("UserRoom");
		if($pos!==false){
			$rs = $urM->into_room(UID, $room_id, $pos);
		}
		$list = $urM->room_users($room_id, true);
		$this->ok($list);
    }
	
	 public function out_room()
    {
		$urM = D("UserRoom");
		$rs = $urM->out_room(UID);
		$this->ok($rs);
    }
}