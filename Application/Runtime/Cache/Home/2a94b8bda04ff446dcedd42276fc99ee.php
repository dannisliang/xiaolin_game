<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>小林游戏</title>
<link href="/xl/Public/assets/css/index.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="/xl/Public/assets/js/jquery.min.js"></script>
<script>
window.base_url = "/xl/index.php/";
</script>
</head>

<body>
<canvas width="100%" height="100%" class="snow"></canvas>
<div class="main" id="fsvs-body">
	<div style="display:none;" class="slide">
    	<div class="logo">
        	<img src="/xl/Public/assets/images/logo.png"/>
        </div>
        <div  class="listgame"> 
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="display:none;" class="gamedetail slide">       
    </div>
    <div style="clear:both"></div>
    <div class="roomdetail slide">     
    	<div class="roomname">房间1</div>
    	<div class="back">
        	<a href="javascript:(1)">退出房间</a>
        </div>
        <div class="roomdet_con">
        	<div class="con_table">
            	<div class="table_inner"></div>
            </div>
            <div class="roomplayer playerleft">
            </div>
            <div class="roomplayer playerright">
            </div>
            <div class="roomplayer playertop">
            </div>
            <div class="roomplayer playerbottom">
            </div>
        </div>
    </div>

    
</div>
<script src="/xl/Public/assets/js/ToProgress.min.js"></script>
<script type="text/javascript" src="/xl/Public/assets/js/jquery.let_it_snow.js"></script>
<script src="/xl/Public/assets/js/fsvs.js"></script>
<script src="/xl/Public/assets/js/mustache.min.js"></script>
<script src="/xl/Public/assets/js/tem.js"></script>
<script src="/xl/Public/assets/js/core.js"></script>
<script type="text/javascript">
$(document).ready( function() {
	if( $.fn.fsvs ) {
		var slider = $.fn.fsvs({
			speed : 1000,
			bodyID : 'fsvs-body',
			selector : '> .slide',
			beforeSlide : function(data){core.load_page(data)},
			arrowKeyEvents: false,
			mouseWheelEvents: false,
			mouseDragEvents : false,
			touchEvents: false,
			pagination: false,
		});
	}
	window.fsvs = slider;
	slider.init();
	$("canvas.snow").let_it_snow();	
	core.page.game.init();
});
</script>
</body>
</html>