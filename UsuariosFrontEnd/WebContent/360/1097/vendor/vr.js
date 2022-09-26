$(document).ready(function() { 
	$("#vrToggle, #vrToggle .icon").click(function() { 
		var idVr=$(".scenes .current").attr("data-id");
		var pathname = window.location.pathname;
		var href = pathname + 'tiles/'+idVr+'/vr';
		window.parent.location.href = href;
	});
	$("#fullscreenToggle3, #fullscreenToggle3 .icon").click(function() {   
		var pathname = window.location.pathname;
		var res = pathname.split("&house");
		var href = res[0];
		window.parent.location.href = href;
	});
	
	
	
});