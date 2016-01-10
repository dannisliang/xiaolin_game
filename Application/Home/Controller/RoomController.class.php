<?php
namespace Home\Controller;

use Think\Controller;

class RoomController extends CommController
{
    public function main()
    {
		$game_id = I("get.game_id");
		$roomM = D("Room");
		$list = $roomM->room_list($game_id,true);
		$this->ok($list);
    }
}