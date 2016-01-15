<?php
namespace Home\Model;
use Think\Model;

class UserModel extends CommModel {
	
	public function user_add($map){
                $map['name']||$map['name'] = 'U'.rand(111, 999);
		$map['gtime'] = getnow();
		return $this->add($map);
	}
        
        public function getuser($id){
           return $this->find($id);
        }

}