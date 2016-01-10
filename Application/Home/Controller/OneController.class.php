<?php
namespace Home\Controller;

use Think\Controller;

class OneController extends CommController
{
    public function main()
    {
		$room_id = I("post.room_id",0);
		$urM = D("UserRoom");
		$list = $urM->room_users($room_id);
		$this->ok($list);
    }
}