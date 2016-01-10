<?php
namespace Home\Controller;

use Think\Controller;

class CommController extends Controller
{
public $user_id = 0;
	public function _initialize(){
    	if(!session("user_id")){
			if(!cookie("user_id")){
				$user_id = D("User")->user_add();
				cookie("user_id", $user_id, 36000000);
				cookie("token", md5(C("cookie_key").$user_id), 36000000);
				session("user_id", $user_id);
			}else{
				$user_id = cookie("user_id");
				$token = cookie("token");
				if(md5(C("cookie_key").$user_id)==$token){
					session("user_id", $user_id);
					cookie("user_id", $user_id, 36000000);
					cookie("token", md5(C("cookie_key").$user_id), 36000000);
				}else{
					$user_id = D("User")->user_add();
					cookie("user_id", $user_id, 36000000);
					cookie("token", md5(C("cookie_key").$user_id), 36000000);
					session("user_id", $user_id);
				}
			}
		}else{
			$user_id = session("user_id");
		}
		$this->user_id = $user_id;
 	}
    
	protected function ok($data = '',$code = 200){
		
		$this->respond($data, $code, '请求成功');
	}
	protected function err($msg = '请求异常',$code = 500){
		
		$this->respond(false, $code, $msg);
	}
	
	protected function respond($data, $code, $msg){
	
		$this->ajaxreturn(array(
			'data'=>$data,
			'code'=>$code,
			'msg' =>$msg,
		));
	}
}