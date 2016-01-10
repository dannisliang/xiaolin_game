<?php
namespace Home\Controller;

use Think\Controller;

class UserRoomController extends CommController
{
    public function main()
    {
		$m = D("Game");
		$a = $m->game_list();
		$this->ok($a);
    }
}