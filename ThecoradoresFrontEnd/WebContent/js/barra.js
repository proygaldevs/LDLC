
$(document).ready(function(){
	$("#togglemenu").click(function() {
		$(".bit-wrapper").toggleClass("open");
		$("#ulforsustitution").toggleClass("notdisplay");
		$(".navbar-collapse").toggleClass("invisibility");
		$(".navbar-fixed-top").toggleClass("fondovisible");
		$(".navbar-fixed-top").toggleClass("bordeInferior");
		
		
	});

});


