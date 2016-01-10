window.core = (function($,base_url,root_url){
	var pagedata = ['game','room','one'];
	var def = {
		game_img: "/Public/assets/images/game.png",	
		
	}
	var loopid;
	
	var nowpage = 'game';
	
	var ajax = function(opt){
		var progressBar = new ToProgress();
		progressBar.increase(20);
		var default_opt = {
			type: 'POST',
			dataType: 'json',
			cache: false,
			timeout: 5000,//毫秒
			ok: function(){},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log("网络异常"+textStatus);	
				if(textStatus=='timeout'){
					console.log("请求超时，正在重试");
					$.ajax(this);
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
		nowpage = pagedata[index];
	}
	
	var loop = function(){
		var str = "core.page."+nowpage+".ref()";	
		eval(str);
		//console.log(str);
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
		return {
			ref: function(){},
			init:init
		}
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
			ref:init,
			init:init,
			}
	})();
	
	
	/*
	*
	*
	*
	*/
	var p_one = (function(){
		
		var isready = false;
		var init_f = function(into){
			var opt = {room_id: core.data.one.room_id};
			if(into){
				opt.pos = core.data.one.pos;
			}
			core.ajax({
				url: "One/into_room",
				data: opt,
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
					
					data['ready'] = function(){
						if(!isready){
							return "准  备";	
						}else{
							return "取 消 准 备";	
						}
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
		var init = function(){init_f(true)};
		var ref = function(){init_f(false)};
		
		var ready = function(){
			function drawready(){
				isready = false;
				$(".gameready").html("准&nbsp;&nbsp;备");
				$(".myselfleft").removeClass("ready");
				$(".myselfright").removeClass("ready");
				$(".myself").removeClass("ready");
			}
			function drawnoready(){
				isready = true;
				$(".gameready").html("取&nbsp;消&nbsp;准&nbsp;备");
				$(".myselfleft").addClass("ready");
				$(".myselfright").addClass("ready");
				$(".myself").addClass("ready");
			}
			if(isready){
				core.ajax({
					url: "One/noready",
					data: {room_id:core.data.one.room_id},
					ok: function(data){
						if(data==1){
							drawready();
						}else{
							drawnoready();	
						}
					},
				});
			}else{
				core.ajax({
					url: "One/ready",
					data: {room_id:core.data.one.room_id},
					ok: function(data){
						if(data==1){
							drawnoready();	
						}else{
							drawready();	
						}
					},
				});
			}
		}
		
		var out_room = function (){
			core.ajax({
				url: "One/out_room",
				success: core.page.room.init,
			});
			
		}
		
		return {
			init:init,
			ref:ref,
			ready:ready,
			out_room:out_room,
		}
	})();
	
	var page = {
		one:p_one,
		game:p_game,
		room:p_room,
	};
	
	var init = function(){
		this.page.game.init();
		loopid = setInterval(core.loop,900);
	}
	return {
		data: {},
		load_page:load_page,
		page: page,
		ajax: ajax,
		loop: loop,
		init: init,
		};
})($,window.base_url,root_url);


