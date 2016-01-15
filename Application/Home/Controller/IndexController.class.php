<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends CommController
{
    public function index(){
        
        $this->assign('id',UID);
        $this->assign('name',NAME);
        $this->assign('time',time());
        $this->assign('hash',  md5(UID.time().'xiaolin'));
        $this->display();
    }
    
    public function main()
    {
        $m = D("Game");
        $list = $m->game_list();
        $this->ok($list);
    }
}