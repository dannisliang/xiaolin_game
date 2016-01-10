window.core = (function($,base_url,root_url){
	var pagedata = ['game','room'];
	var def = {
		game_img: "/Public/assets/images/game.png",	
		
	}
	var ajax = function(opt){
		var progressBar = new ToProgress();
		progressBar.increase(20);
		var default_opt = {
			dataType: 'json',
			cache: false,
			error: function(){
				alert("网络异常");	
			},
			err: function(jso){	
				console.log(jso);
			},
			success: function(jso){
				progressBar.finish();
				if(!jso||!jso.code||jso.code!=200){
					console.log("请求失败:"+jso);
					this.err(jso);
				}else{
					this.ok(jso.data);
				}
			}
		}
		
		opt = $.extend(default_opt,opt);
		opt.url = base_url+"/"+opt.url;
		console.log(opt);
		$.ajax(opt);
	}
	
	var load_page = function(index){
		var str = "core.page."+pagedata[index]+".init()";
		eval(str);
	}
	
	var p_game = (function(){
		var init = function(){
			core.ajax({
				url: "Index/main",
				ok: function(data){
					data['imgf'] = function(){
						if(this.img){
							return this.img;
						}else{
							return 	def.game_img;
						}
					}
					data['statusf'] = function(){
						if(this.status==0){
							return 'gameoff';	
						}
					}
					data['statusff'] = function(){
						if(this.status==0){
							return 'return false;';	
						}
					}
					$(".main .listgame").html(Mustache.render($.tem.game, data));
				}
			});				   
		}
		return {init:init}
	})();
	
	var p_room = (function(){
		var info = {};
		var init = function(){
			core.ajax({
				url: "Room/main",
				data: {game_id: info.game_id},
				ok: function(data){
					function w_pos(pos,room_users){
						var str = 'nouser'
						for (var i=0;i<room_users.length;i++)
						{
							if(room_users[i].pos==pos){
								str = '';
								if(room_users[i].ready){
									str += ' ready';	
								}
								break;
							}
						}
						return str;
					}
					data['game_name'] = info.name;
					data['isleft'] = function(){
						return w_pos(0,this.room_users)
					}
					data['isright'] = function(){
						return w_pos(1,this.room_users)
					}
					data['istop'] = function(){
						return w_pos(2,this.room_users)
					}
					data['isbottom'] = function(){
						return w_pos(3,this.room_users)
					}
					$(".main .gamedetail").html(Mustache.render($.tem.room, data));
				}
			});				   
		}
		var bind = function(obj){
			info = $.extend(info,obj);;
		}
		return {
			init:init,
			bind:bind
			}
	})();
	
	var page = {
		game:p_game,
		room:p_room,
	};
	return {
			load_page:load_page,
			page: page,
			ajax: ajax,
		};
})($,window.base_url,root_url);


