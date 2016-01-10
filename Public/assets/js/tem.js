(function(root_url){
var tem = {};
tem.game = '{{#.}}<div class="game {{statusf}}" va="{{id}}" onclick="{{statusff}};core.page.room.bind( {  game_id:\'{{id}}\',name:\'{{name}}\'  });fsvs.slideDown();">'+
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
        '        <div class="playleft play {{isleft}}">'+
         '       </div>'+
          '      <div class="playright play {{isright}}">'+
           '     </div>'+
            '    <div class="playtop play {{istop}}">'+
             '   </div>'+
    '            <div class="playbottom play {{isbottom}}">'+
     '           </div>'+
      '      </div>{{/.}}';

$.tem = tem;
})(root_url);