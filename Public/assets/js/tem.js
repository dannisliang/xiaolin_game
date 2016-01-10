(function(root_url){
var tem = {};
tem.game = '{{#.}}<div class="game {{statusf}}" va="{{id}}" onclick="{{statusff}};core.data.room =  {  game_id:\'{{id}}\',name:\'{{name}}\',img:\'{{img}}\',table_img:\'{{table_img}}\'  };fsvs.slideDown();">'+
               ' <div class="gamename">'+
'                    <div class="title">'+
 '                   <img src="'+root_url+'{{imgf}}">'+
  '                  <a>{{name}}</a>'+
   '                 </div>'+
    '            </div>'+
     '           <div style="clear:both"></div>'+
      '          <div class="gameifo">'+
       '             <a>适用人数<span>{{usercount}}</span>人</a>'+
        '            <a>当前玩家<span>{{play_count}}</span>人</a>'+
         '       </div>'+
          '      <div class="gamefoot">'+
           '         <a class="redu" style="left: {{hot}}0%">热度</a>'+
            '        <div class="gamelike" style="width:{{hot}}0%">'+
             '       </div>'+
              '  </div>'+
            '</div>{{/.}}';

tem.room = '<div class="gameroomname">{{game_name}}游戏大厅</div>'+
'    	<div class="back">'+
 '       	<a href="javascript:fsvs.slideUp()">返回主页</a>'+
  '      </div>'+
  '	 	<div style="clear:both"></div>'+
   '     <div class="roomlist">'+
    '    	{{#.}}<div class="gameroom">'+
     '       	<div class="roomtable">'+
      '          	<div class="innertable"><a>房间{{id}}</a></div>'+
       '         </div>'+
        '        <div class="playleft play {{isleft}}" onclick="if(\'{{isleft}}\'!=\'nouser\')return false;core.data.one= {  game_id:\'{{id}}\',name:\'{{game_name}}\',room_id:\'{{id}}\'  };fsvs.slideDown();">'+
         '       </div>'+
          '      <div class="playright play {{isright}}" onclick="if(\'{{isright}}\'!=\'nouser\')return false;core.data.one= {  game_id:\'{{id}}\',name:\'{{game_name}}\',room_id:\'{{id}}\'  };fsvs.slideDown();">'+
		  '     </div>'+
            '    <div class="playtop play {{istop}}"  onclick="if(\'{{istop}}\'!=\'nouser\')return false;core.data.one= {  game_id:\'{{id}}\',name:\'{{game_name}}\',room_id:\'{{id}}\'  };fsvs.slideDown();">'+
             '   </div>'+
    '            <div class="playbottom play {{isbottom}}"  onclick="if(\'{{isbottom}}\'!=\'nouser\')return false;core.data.one= {  game_id:\'{{id}}\',name:\'{{game_name}}\',room_id:\'{{id}}\'  };fsvs.slideDown();">'+
     '           </div>'+
      '      </div>{{/.}}';
	  
tem.one = '<div class="roomname"><span>{{game_name}}</span>---房间{{room_id}}</div>'+
'				<div class="back">'+
'					<a href="javascript:fsvs.slideUp()">退出房间</a>'+
'				</div>'+
'				<div class="gamebtn">'+
'					<button class="gameready">准&nbsp;&nbsp;备</button>'+
'				</div>'+
'				<div style="clear:both"></div>'+
'				<div class="roomdet_con">'+
'					<div class="con_table">'+
'						<div class="table_inner">'+
'							<img src="'+root_url+'{{table_img}}"/>'+
'						</div>'+
'					</div>'+
'					<div class="roomplayer playerleft {{isleft}}left">'+
'					</div>'+
'					<div class="roomplayer playerright {{isright}}right">'+
'					</div>'+
'					<div class="roomplayer playertop {{istop}}">'+
'					</div>'+
'					<div class="roomplayer playerbottom {{isbottom}}">'+
'					</div>'+
'				</div>';

$.tem = tem;
})(root_url);