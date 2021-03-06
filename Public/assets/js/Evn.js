/*事件监听，统一调度
 * 
 * 
 */
 $(function(){
     "use strict";
     var joining = false;
     
     //显示输入框
    $('.js-inputroom').on("touchstart  click",function(){
        $(this).animate({width: '0',opacity:'0'}, "slow");
        $('.inputr').animate({right: '15%'}, "slow");
        $('.arrow').animate({right: '-22%'}, "slow");
    })
    
    
    //创建房间
    $('.new').bind("touchstart click",function(){
        Api.send('{"type":"login","method":"new","client_name":"'+window.MY_NAME+'"}');
    })
    
    $('.quick').bind("touchstart click",function(){
        Api.send('{"type":"login","method":"quick","client_name":"'+window.MY_NAME+'"}');
    })
    
    //加入房间
    $('.arrow').on("touchstart click",function(){
        var val = $(".inputr").val();
        if(!val||val=='')return;
        Api.send('{"type":"login","method":"join","client_name":"'+window.MY_NAME+'","room_id":"'+val+'"}');
    })
    
    //准备好了
    $('.pk').bind("touchstart click",function(){
        Game.ready();
    })
    
    //触碰事件
    $(".mygame").on('touchstart click','.hidemyblock',function(){
        var $this = $(this);
        if($this.hasClass("myblock"))return;
        Game.touch($this.attr("index"));
    })
    
    $(".back").on('touchstart click',function(){
        
        Game.out();
    });

})
