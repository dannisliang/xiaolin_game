<?php

function getnow($time=true){
	if($time){
		return date("Y-m-d H:i:s");
	}else{
		return date("Y-m-d");
	}

}