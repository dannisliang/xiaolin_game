/*游戏核心
 * 
 * 
 * 
 */
$(function(){
window.Game = (function($,name){
    var win = 0,//我赢了几局
        opp_win = 0,//对手赢了几局
        level = 1,//当前关卡
        opp_name = false,//对手名
        room_id = '',//房间id
        pro_int = false,
        ready = false,
        opp_ready = false;//定时器id;//房间id
        
    var see_time = 3000,//看的时长
        touch_time = 10000,//选择时长
        down_time = 3000,//游戏开始倒计时时长
        tran_time = 1000,
        end_time = 1000;//页面切换时长
        
    var in_touch = false;//是否是touch 时间
        
    var pro = new ToProgress();
    
    
    var touch_num = 1;//此时应该touch的数字
    
    
    /*
     * 
     * @param {int} t 进度条时长  毫秒 
     */
    var pro_loop = function(opt){
        clearInterval(pro_int);
        pro.setProgress(0);
        var i = 0;
        var def = {
            t:1000,
            callback:function(){}
        };
        opt = $.extend(def,opt);
        pro_int = window.setInterval(function(){
            i++;
            if(i>=40){
                i=0;
                pro_end();
                opt.callback();
            }else{ 
                pro.increase(2.6);
            }
        },opt.t/40);
    };
    /*
     * 结束进度条
     */
    var pro_end = function(){
        clearInterval(pro_int);
        pro.finish();
    };
    
    
   
    /*
     * 描绘左侧
     */
    var draw_left = function(){
        if(opp_name==''){
            $("#opp_name").html('');
        }else{
            $("#opp_name").html(opp_name+':'+opp_win);
        }
        $("#my_name").html(name+':'+win);
        if(opp_ready){
            $(".you").show();
        }else{
            $(".you").hide();
        }
        $(".room_id span").html(room_id);
        if(ready){
            $(".my").show();
        }else{
            $(".my").hide();
        }
    };
    /*
     * 默认表格
     */
    var default_table = function(){
        for(var i =1; i<=level+2;i++){
            $(".block_"+i).addClass("hidemyblock");
        }
    }
    /*
     * 创建基于level数目的表格
     */
    var creat_table = function(arr){
        hide_table();
        for(var i in arr){
            var b = parseInt(i)+1;
            $(".block_"+b).addClass("hidemyblock").children(".gamenum").data("num",arr[i]);
            $(".block_"+b).attr("index",b);
        }
    };
    /*
     *展示数字 
     */
    var show_table = function(){
        $(".hidemyblock").each(function(){
            var $this = $(this);
            $this.addClass("myblock");
            var num = $this.children(".gamenum").data("num");
            $this.children(".gamenum").html(num);
        })
    };
    
    /*
     * 隐藏数字
     */
    var hide_table = function(){
        $(".hidemyblock").each(function(){
            var $this = $(this);
            $this.removeClass("myblock");
            $this.removeClass("error");
            $this.removeClass("hidemyblock");
            $this.children(".gamenum").html("");
        })
        
    };
    
    
    /*
     * 展示数字 开始记忆
     */
    var show_num = function(arr){
        console.log("展示数字");
        pro_loop({t:see_time+1000*level});
        
        creat_table(arr);
        show_table();
        toastr.success("记忆时间！");
        window.setTimeout(function(){
            pro_end();
            hide_num();
        },see_time+1000*level);
    };
    /*
     * 隐藏数字 开始touch
     */
    var hide_num = function(){
        console.log("隐藏数字");
        in_touch = true;
        
        $(".hidemyblock").each(function(){
            var $this = $(this);
            $this.removeClass("myblock");
            $this.removeClass("error");
            $this.children(".gamenum").html("");
        })
        toastr.success("作答时间！");
        pro_loop({t:touch_time,callback:function(){
                Api.send('{"type":"timeout","right":false,"finish":true,"level":'+level+'}');
        }});
    };
    
   
    var draw_all = function(){
        draw_left();
        hide_table();
        
    };
    /*
     * 3 2 1 倒计时 用于游戏开始
     */
    var count_down = function(){
        window.setTimeout(function(){toastr.info("3...");},800);
        window.setTimeout(function(){toastr.info("2...");},1600);
        window.setTimeout(function(){toastr.info("1...");},2400);
        pro_loop({t:down_time});
    };
    /*
     * 关卡 过度
     */
    var tran_level = function(){
        toastr.info("关卡:"+level);
        
    };
    
    return {
        /*
         * 初始化
         */
        init:function(opt){
            var display = $('.room').css("display");
            if(display=='none'){
                $('.room').show();
                $('.index').hide();
            }
            console.log("初始化...");
            pro_end();
            win = 0,//我赢了几局
            opp_win = 0,//对手赢了几局
            level = 1,//当前关卡
            opp_name = opt.opp_name,//对手名
            room_id = opt.room_id,//房间id
            pro_int = false,
            ready = false,
            opp_ready =  opt.opp_ready;
            Api.send('{"type":"init"}');
            draw_all();
            default_table();
            
        },
        /*
         * 关卡开始 i 可取 
         */
        level_start:function(i,jso){
            var arr = eval('('+jso+')');
            touch_num = 1;
            level = i;
            $(".checkpoint .level").html(level);
            console.log("开始关卡："+level);
            tran_level();
            Api.send('{"type":"level_start"}');
            window.setTimeout(function(){
                show_num(arr);     
            },tran_time);
        },
        /*
         * 关卡结束
         */
        level_end:function(){
            console.log("结束关卡："+level);
            in_touch = false;
            pro_end();//进度条结束
            
        },
        /*
         * 开始一局
         */
        start:function(){
            $(".back").hide();
            count_down();
            ready = false;
            opp_ready = false;
            draw_left();
            console.log("开始游戏...");
            Api.send('{"type":"start"}');
        },
        /*
         * 游戏结束 (bool) win
         */
        end:function(w){
            $(".back").show();
            console.log("游戏结束");
            if(w){
                toastr.success("游戏结束,你获胜了！");
                win++;
            }else{
                toastr.warning("游戏结束,你失败了！");
                opp_win++;
            }
            Api.send('{"type":"init"}');
            pro_end();
            level = 1,//当前关卡
            ready = false,
            opp_ready = false;
            window.setTimeout(function(){
                draw_all();
                default_table();
            },end_time);
        },
        /*
         * 我的触碰事件
         */
        touch:function(i){
            if(!in_touch)return false;
            console.log("触碰事件："+i);
            var $touch = $(".mygame .block_"+i);
            var right = "true";
            var finish = "false";
            $touch.addClass("myblock");
            var num = $touch.children(".gamenum").data("num");
            $touch.children(".gamenum").html(num);
            if(parseInt(num)!=touch_num){
                window.Game.level_end();
                $touch.addClass("error");
                toastr.warning("你记错啦！");
                right = "false";
                finish = "true";
            }else {
                if(touch_num==level+2){
                    finish = "true";
                }
                touch_num++;
            }
            
            Api.send('{"type":"touch","i":'+i+',"right":'+right+',"level":'+level+',"finish":'+finish+'}');
            
        },
        /*
         * 对手的触碰事件
         */
        opp_touch:function(i,right){
            console.log("对手触碰事件："+i);
            var $touch = $(".enemy .block_"+i);
            $touch.addClass("myblock");
            if(!right){
                $touch.addClass("error");
                toastr.success("对手失误啦...");
            }
            
            $touch.children(".gamenum").html("?");
        },
        
        out: function(){
            $('.room').hide();
            $('.index').show();
            Api.send('{"type":"out"}');
            pro_end();
        },
        /*
         * 对手加入房间
         */
        add_opp:function(name){
            console.log("对手加入房间："+name);
            opp_name = name;
            draw_left();
        },
        /*
         * 对手离开房间
         */
        rm_opp:function(){
            console.log("对手离开房间...");
            toastr.success("对手离开房间...");
            if(level>1){
                Game.end(true);
            }else{
                
                clearInterval(pro_int);
                $(".back").show();
            }
            Game.init({opp_name:'',room_id:room_id,opp_ready:false});
            draw_left();
        },
        /*
         * 我准备
         */
        ready:function(){
            if(ready)return;
            console.log("准备...");
            ready = true;
            Api.send('{"type":"ready"}');
            $('.my').show();
            $('.my').animate({fontSize: '70px',right:'5%',top:'65%'}, 100);
            $('.my').animate({fontSize: '70px',right:'5%',top:'65%'}, 400);
            $('.my').animate({fontSize: '12px'}, 300);
        },
        /*
         * 对手准备
         */
        opp_ready:function(){
            toastr.success("对手准备...");
            console.log("对手准备...");
            opp_ready = true;
            $('.you').show();
        }

    };
        
})($,window.MY_NAME);
});

