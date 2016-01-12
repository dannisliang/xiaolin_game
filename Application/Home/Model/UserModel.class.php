<?php
namespace Home\Model;
use Think\Model;

class UserModel extends CommModel {
	
	public function user_add(){
		$map['gtime'] = getnow();
		return $this->add($map);
	}
        
        public function getuser($id){
           return $this->find($id);
        }

}