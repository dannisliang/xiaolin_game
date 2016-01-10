<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends CommController
{
    public function main()
    {
		$m = D("Game");
		$list = $m->game_list();
		$this->ok($list);
    }
}