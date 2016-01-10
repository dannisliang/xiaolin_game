window.core = (function($,base_url,root_url){
	var pagedata = ['game','room','one'];
	var def = {
		game_img: "/Public/assets/images/game.png",	
		
	}
	
	var ajax = function(opt){
		var progressBar = new ToProgress();
		progressBar.increase(20);
		var default_opt = {
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 1500,//毫秒
			ok: function(){},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log("网络异常"+textStatus);	
				if(textStatus=='timeout'){
					console.log("请求超时，正在重试");
					window.core.ajax(this);
				}
			},
			err: function(jso){	
				console.log("返回异常");
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
		$.ajax(opt);
	}
	
	
	var load_page = function(index){
		var str = "core.page."+pagedata[index]+".init()";
		eval(str);
	}
	
	/*
	*
	*
	*
	*/
	
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
	
	
	/*
	*
	*
	*
	*/
	var p_room = (function(){
		var init = function(){
			core.ajax({
				url: "Room/main",
				data: {game_id: core.data.room.game_id},
				ok: function(data){
					function w_pos(pos,room_users){
						var str = 'nouser'
						for (var i=0;i<room_users.length;i++)
						{
							if(room_users[i].pos==pos){
								str = '';
								if(room_users[i].ready==1){
									str += ' ready';	
								}
								break;
							}
						}
						return str;
					}
					
					data['game_name'] = core.data.room.name;
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
		return {
			init:init,
			}
	})();
	
	
	/*
	*
	*
	*
	*/
	var p_one = (function(){
		var init = function(){
			core.ajax({
				url: "One/into_room",
				data: {room_id: core.data.one.room_id,pos:core.data.one.pos},
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
					function isme(pos,room_users){
						
						var str = ''
						for (var i=0;i<room_users.length;i++)
						{
							if(room_users[i].pos==pos&&room_users[i].me){
								str = 'm';
								break;
							}
						}
						return str;
					}
					
					data['game_name'] = core.data.room.name;
					data['table_img'] = core.data.room.table_img;
					data['room_id'] = core.data.one.room_id;
					data['isleft'] = function(){
						return w_pos(0,this)
					}
					data['isright'] = function(){
						return w_pos(1,this)
					}
					data['istop'] = function(){
						return w_pos(2,this)
					}
					data['isbottom'] = function(){
						return w_pos(3,this)
					}
					
					//
					data['meleft'] = function(){
						return isme(0,this)
					}
					data['meright'] = function(){
						return isme(1,this)
					}
					data['metop'] = function(){
						return isme(2,this)
					}
					data['mebottom'] = function(){
						return isme(3,this)
					}
					
					$(".main .roomdetail").html(Mustache.render($.tem.one, data));
				}
			});				   
		}
		
		var out_room = function (){
			core.ajax({
				url: "One/out_room",
			});
			
		}
		
		return {
			init:init,
			out_room:out_room,
		}
	})();
	
	var page = {
		one:p_one,
		game:p_game,
		room:p_room,
	};
	return {
			data: {},
			load_page:load_page,
			page: page,
			ajax: ajax,
		};
})($,window.base_url,root_url);


