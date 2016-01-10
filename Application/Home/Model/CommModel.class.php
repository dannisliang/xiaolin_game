<?php
namespace Home\Model;
use Think\Model;

class CommModel extends Model {
	
	protected function getjoin($obj, $list){
		foreach($list as &$low){
			$low = $obj->getjoind($low);
		}
		return $list;
	}

}