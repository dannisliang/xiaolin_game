/*Websocket API
 * 
 * 
 * 
 */

window.Api = (function($,name,time,hash,id){
    var ws;
    
    var connect = function(){
        
        //ws = new WebSocket("ws://"+document.domain+":7272");
        ws = new WebSocket("ws://www.lvxiaolin.com:7272");
           // 当socket连接打开时，输入用户名
        ws.onopen = function(){
            ws.send('{"hash":"'+hash+'","time":"'+time+'","id":"'+id+'"}');
        };
        // 当有消息时根据消息类型显示不同信息
        ws.onmessage = function(e){
            console.log(e.data);
            var data = eval("("+e.data+")");
            switch(data['type']){
                // 服务端ping客户端
                case 'ping':
                    ws.send('{"type":"pong"}');
                    break;;
                // 登录 更新用户列表
                case 'game':
                    eval("Game."+data['fun']);
                    break;
                    

            }
        }; 
        ws.onclose = function() {
           console.log("连接关闭，正在重连...");
           Api.connect();
        };
        ws.onerror = function() {
           console.log("出现错误");
        };
    
    };
    
    var send = function (str){
        ws.send(str);
        
    };
    
    connect();
    return{
        connect:connect,
        send:send
    };
})($,window.MY_NAME,window.TIME,window.HASH,window.ID);
