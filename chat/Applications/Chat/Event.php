<?php
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 聊天主逻辑 
 * 主要是处理 onMessage onClose 
 */
use \GatewayWorker\Lib\Gateway;
use \GatewayWorker\Lib\Store;

class Event
{
   
   /*
    * 随机创建房间
    */
   public static function rand_room_id() {
       $room_id = rand(21, 100);
       $count = Gateway::getClientCountByGroup($room_id);
       if($count){
           $room_id = self::rand_room_id();
       }
       return $room_id;
   } 
   
   /*
    * 获得随机数组
    */
   public static function rand_arr($level) {
       $count = $level+2;
       for($i=0;$i<$count;$i++){
           $list[] = $i+1;
       }
       shuffle($list);
       return $list;
   }
   
   

      /**
    * 有消息时
    * @param int $client_id
    * @param string $message
    */
   public static function onMessage($client_id, $message)
   {
        // debug
        echo "client:{$_SERVER['REMOTE_ADDR']}:{$_SERVER['REMOTE_PORT']} gateway:{$_SERVER['GATEWAY_ADDR']}:{$_SERVER['GATEWAY_PORT']}  client_id:$client_id session:".json_encode($_SESSION)." onMessage:".$message."\n";
        
        // 客户端传递的是json数据
        $message_data = json_decode($message, true);
        if(!$message_data)
        {
            return ;
        }
        
        // 根据类型执行不同的业务
        switch($message_data['type'])
        {
            // 客户端回应服务端的心跳
            case 'pong':
                return;
            case 'login':
                $method = $message_data['method'];
                switch ($method) {
                    case 'new':
                        $room_id = self::rand_room_id();
                        break;
                    case 'join':
                        $room_id = $message_data['room_id'];
                        $count = Gateway::getClientCountByGroup($room_id);
                        if($count != 1){
                            $msg = $count?'房间已满':'房间是空的';
                            $new_message = array('type'=>'for_login','status'=>false,'msg'=>$msg);
                            Gateway::sendToClient($client_id, $new_message);
                            return;
                        }
                        break;
                    case 'quick':
                        for($i=1;$i++;$i<=20){
                            $count = Gateway::getClientCountByGroup($i);
                            if($count==1){
                                $room_id = $i;
                            }
                        }
                        if($room_id){
                            for($i=1;$i++;$i<=20){
                                $count = Gateway::getClientCountByGroup($i);
                                if($count==0){
                                    $room_id = $i;
                                }
                            }
                        }
                        if($room_id){
                            $new_message = array('type'=>'for_login','status'=>false,'msg'=>'房间已满');
                            Gateway::sendToClient($client_id, $new_message);
                            return;
                        }
                        break;

                }
                // 把房间号昵称放到session中
                $room_id = $message_data['room_id'];
                $client_name = $message_data['client_name'];
                $_SESSION['room_id'] = $room_id;
                $_SESSION['client_name'] = $client_name;
                $_SESSION['ready'] = 'false';
              
                // 获取房间内所有用户列表 
                $clients_list = Gateway::getClientInfoByGroup($room_id);
                
                if(count($clients_list)){
                    $opp_name = $clients_list[0]['client_name'];
                    $opp_ready = $clients_list[0]['ready'];
                    $new_message = array('type'=>'game','fun'=>"add_opp('$client_name')");
                    Gateway::sendToGroup($room_id, json_encode($new_message));
                }else{
                    $opp_name = '';
                    $opp_ready = 'false';
                }
                
                Gateway::joinGroup($client_id, $room_id);
                
                $new_message = array('type'=>'game','fun'=>"init( {room_id:'{$room_id}',opp_name:'{$opp_name}',opp_ready:{$opp_ready} })");
                Gateway::sendToCurrentClient(json_encode($new_message));
                return;
                break;
            case 'ready':
                $room_id = $_SESSION['room_id'];
                $_SESSION['ready'] = 'true';
                $clients_list = Gateway::getClientInfoByGroup($room_id);               
                if(count($clients_list)){
                    foreach ($clients_list as $key => $value) {
                        if($key!=$client_id){
                            if($value['ready']=='true'){
                                $new_message = array('type'=>'game','fun'=>"start()");
                                Gateway::sendToGroup($room_id, json_encode($new_message));
                                sleep(3);
                                $arr = self::rand_arr(3);
                                $jso = json_encode($arr);
                                $new_message = array('type'=>'game','fun'=>"level_start(0,'{$jso}')");
                                Gateway::sendToGroup($room_id, json_encode($new_message));
                            }else{
                                $new_message = array('type'=>'game','fun'=>"opp_ready()");
                                Gateway::sendToClient($key, json_encode($new_message));
                            }
                        }
                    }
                }
                return;
                break;
            case 'start':
                $_SESSION['ready'] = 'false';
                return;
                break;
            case 'touch':
                $finish = $message['finish'];
                $clients_list = Gateway::getClientInfoByGroup($room_id);
                foreach ($clients_list as $key => $value) {
                    if($finish&&$key!=$client_id&&$value['finish']){//双方完成
                        if($message['right']==$value['right']){
                            //下一关
                            $arr = self::rand_arr(3);
                            $jso = json_encode($arr);
                            $up = $message['right']?1:-1;
                            $new_message = array('type'=>'game','fun'=>"level_start(0,'{$jso}')");
                            Gateway::sendToGroup($room_id, json_encode($new_message));
                        }  else {
                            //游戏结束
                            $win = $message['right']?'true':'false';
                            $new_message = array('type'=>'game','fun'=>"end({$win})");
                            Gateway::sendToClient($client_id, json_encode($new_message));
                            $win = $value['right']?'true':'false';
                            $new_message = array('type'=>'game','fun'=>"end({$win})");
                            Gateway::sendToClient($key, json_encode($new_message));
                        }
                    }  else if($key!=$client_id){
                        $_SESSION['finish'] = $message['finish'];
                        $_SESSION['right'] = $message['right'];
                        $new_message = array('type'=>'game','fun'=>"opp_touch({$message['i']},{$message['right']})");
                        Gateway::sendToClient($key, json_encode($new_message));
                    }
                }
                break;
            case 'level_start':
                $_SESSION['finish'] = FALSE;
                $_SESSION['right'] = TRUE;
                return;
                break;
        }
   }
   
   /**
    * 当客户端断开连接时
    * @param integer $client_id 客户端id
    */
   public static function onClose($client_id)
   {
       // debug
       echo "client:{$_SERVER['REMOTE_ADDR']}:{$_SERVER['REMOTE_PORT']} gateway:{$_SERVER['GATEWAY_ADDR']}:{$_SERVER['GATEWAY_PORT']}  client_id:$client_id onClose:''\n";
       
       // 从房间的客户端列表中删除
       if(isset($_SESSION['room_id']))
       {
           $room_id = $_SESSION['room_id'];
           $new_message = array('type'=>'game', 'fun'=>'rm_opp()');
           Gateway::sendToGroup($room_id, json_encode($new_message));
       }
   }
  
}
