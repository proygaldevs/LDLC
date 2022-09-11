
id_decorador = getParameterByName("id_decorador");
var id_proyecto = getParameterByName("id_proyecto");
var id_ldlc = getParameterByName("id_ldlc");
if(id_ldlc==null) {
	id_ldlc=-1;
}
if(id_proyecto==null) {
	id_proyecto=-1;
}
if(id_decorador==null){
	id_decorador="sinLista";
}
function login(donde) {
	$(document.body).css({'cursor' : 'wait'});	 
	var userAssistant = getCookie("userAssistantD");
	var passAssistant = getCookie("passAssistantD");
	if(userAssistant=="" || passAssistant==""){
		$('#login-modal').modal('show');  
		$(document.body).css({'cursor' : 'default'}); 
	} else {
		if(donde=="ldlc"){
			try {
		  		$.ajaxSetup({
		  			scriptCharset : "utf-8",
		  			contentType : "application/json; charset=utf-8"
		  		});
		
		  		$.ajax({
		  			// /type:"POST",
		  			dataType : "json",
		  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
		  			url : urlbaseForAjax + '/DecoradoresController',
		  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
		
		  			data : {
		  				token : passAssistant,
		  				action : "checkLdlc",
		  				pass : passAssistant,
		  				id_decorador : id_decorador,
		  				id_proyecto : id_proyecto,
		  				id_ldlc : id_ldlc,
		  				mail : userAssistant
		  				
		  			},
		  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
		  			contentType : "application/json; charset=utf-8",
		  			success : function(data) {
		  				// BootstrapDialog.alert("DATA: "+data);
		  				// $usuarioGlobal=data;
		  				if (isError(data)) {
		  					$(document.body).css({'cursor' : 'default'}); 
		  					var href = urlbase;
		  					window.open(href);  
		  				} else {
		  					$(document.body).css({'cursor' : 'default'});
		  					$(".errorAt").html("");
		  					
		  					
		  					/*var install = getCookie("intall-modal");
		  					var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		  					if(es_chrome && install==""){
		  						$('#intall-modal').modal('show'); 	
		  					}*/
		  				}
		
		  			}
		  		});
		
		  	} catch (e) {
		  		console.log("Se ha producido un error en la conexión con el servidor");
				$(document.body).css({'cursor' : 'default'}); 
		  	}

		} else if(donde=="form"){
			try {
		  		$.ajaxSetup({
		  			scriptCharset : "utf-8",
		  			contentType : "application/json; charset=utf-8"
		  		});
		
		  		$.ajax({
		  			// /type:"POST",
		  			dataType : "json",
		  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
		  			url : urlbaseForAjax + '/DecoradoresController',
		  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
		
		  			data : {
		  				token : passAssistant,
		  				action : "checkLdlcExtension",
		  				pass : passAssistant,
		  				mail : userAssistant
		  				
		  			},
		  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
		  			contentType : "application/json; charset=utf-8",
		  			success : function(data) {
		  				// BootstrapDialog.alert("DATA: "+data);
		  				// $usuarioGlobal=data;
		  				if (isError(data)) {
		  					$(document.body).css({'cursor' : 'default'}); 
		  					var href = urlbase;
		  					window.open(href, '_blank'); 
		  					$(".errorAt").html("Los datos son incorrectos. Vuelva a intentarlo o dir&iacute;jase a <a href='"+href+"' style='color:black' target='_blank'>DecoTheco</a> para registrarse en la plataforma."); 
		  					
		  				} else {
		  					id_decorador=data;
		  					$("#decorador_id").val(id_decorador);  
		  					$(document.body).css({'cursor' : 'default'});
		  					$(".errorAt").html("");
		  				}
		
		  			}
		  		});
		
		  	} catch (e) {
		  		console.log("Se ha producido un error en la conexión con el servidor");
				$(document.body).css({'cursor' : 'default'}); 
		  	}

		}
	}	  
} 
 
function getCookie(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : "";
}
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
function setCookie(name, value, exdays, path, domain, secure){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	
    document.cookie= name + "=" + escape(value) +
    ((exdays) ? "; expires=" + exdate.toUTCString() : "") +
    ((path) ? "; path=" + path : "") + 
	((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : ""); 
}

function loguear(donde){
	$(document.body).css({'cursor' : 'wait'});	 
	var mail = $('#login_username').val();
	var pass =  $('#login_password').val(); 
	var keeplogin =  $('#check_login_recuerdame').prop('checked');
	if (donde=="ldlc") { 
		try { 
	
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : pass,
	  				action : "checkLdlc",
	  				pass : pass,
	  				mail : mail,
	  				id_decorador : id_decorador,
	  				id_ldlc : id_ldlc,
	  				id_proyecto : id_proyecto
	  				
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// $usuarioGlobal=data;
	  				if (isError(data)) {
	  					$(document.body).css({'cursor' : 'default'}); 
	  					var href = urlbase;
	  					window.open(href, '_blank'); 
	  					$(".errorAt").html("Los datos son incorrectos. Vuelva a intentarlo o dir&iacute;jase a <a href='"+href+"' style='color:black' target='_blank'>DecoTheco</a> para registrarse en la plataforma."); 
	  					
	  				} else {
	  					if(keeplogin){ 
	  						
	  						setCookie("userAssistantD", mail, 365, '/', urlbaseCookie, 0);
	  						setCookie("passAssistantD", pass, 365, '/', urlbaseCookie, 0);
	  					} else {
	  						
	  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
	  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
	  					}
	  					$(document.body).css({'cursor' : 'default'});
	  					$('#login-modal').modal('hide'); 	  				}
	  					$(".errorAt").html("");
	  					
	  					
	  					/*var install = getCookie("intall-modal");
	  					var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	  					if(es_chrome && install==""){
	  						$('#intall-modal').modal('show'); 	
	  					}*/
	  			}
	  		});
	
	  	} catch (e) {
	  		alert("Se ha producido un error en la conexión con el servidor");
			$(document.body).css({'cursor' : 'default'}); 
	  	}
	} else if(donde=="form"){
		try {
	  		$.ajaxSetup({
	  			scriptCharset : "utf-8",
	  			contentType : "application/json; charset=utf-8"
	  		});
	
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : pass,
	  				action : "checkLdlcExtension",
	  				pass : pass,
	  				mail : mail
	  				
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				if (isError(data)) {
	  					$(document.body).css({'cursor' : 'default'}); 
	  					var href = urlbase;
	  					window.open(href, '_blank'); 
	  					$(".errorAt").html("Los datos son incorrectos. Vuelva a intentarlo o dir&iacute;jase a <a href='"+href+"' style='color:black' target='_blank'>DecoTheco</a> para registrarse en la plataforma."); 
	  					
	  				} else {
	  					id_decorador=data; 
	  					$("#decorador_id").val(id_decorador); 
	  					if(keeplogin){ 
	  						// CAMBIAR POR localhost por urlbaseCookie sin comillas
	  						setCookie("userAssistantD", mail, 365, '/', urlbaseCookie, 0);
	  						setCookie("passAssistantD", pass, 365, '/', urlbaseCookie, 0);
	  					} else {
	  						// CAMBIAR POR localhost por urlbaseCookie sin comillas
	  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
	  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
	  					}
	  					$(document.body).css({'cursor' : 'default'});
	  					$('#login-modal').modal('hide');
	  					$(".errorAt").html("");
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		console.log("Se ha producido un error en la conexión con el servidor");
			$(document.body).css({'cursor' : 'default'}); 
	  	}
	}
}
function getParameterByName(name, url) {
	
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

