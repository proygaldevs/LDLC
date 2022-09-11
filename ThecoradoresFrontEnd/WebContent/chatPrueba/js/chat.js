function pushNotificacion (id_proyecto) { 
	$("."+id_proyecto).children("span").css("display", "block"); 
	var mensajes= $("."+id_proyecto).children("span").html(); 
	$("."+id_proyecto).children("span").html(parseInt(mensajes)+1); 
	var linea=$("."+id_proyecto).html(); 
	var html="";
	html+='<li class="letra-s proyecto '+id_proyecto+'" style="cursor:pointer;width:100%" onclick="cambioChat( \''+user_ajax+' \','+id_proyecto+')">'; 
	html+=linea; 
	html+='</li>'; 
	$("."+id_proyecto).parent().prepend(html);
	$("."+id_proyecto).nextAll("."+id_proyecto).remove();
}
function scrollDown(){ 
	 setTimeout(function(){ var elem = document.getElementById('message-list'); if(elem==null) { } else {elem.scrollTop = elem.scrollHeight;} }, 300);
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
function auto_grow(element) {

	$("#message-list").css("height",altoChat-140); 
	scrollDown(); 
	if(element.scrollHeight<120){
    element.style.height = "5px";
	var altoChat=$(".chat").height();
	altoChat=altoChat-90;
    $('#message-list').css('height',altoChat-element.scrollHeight);
    element.style.height = (element.scrollHeight)+"px";
	}
	 
}

function logoutFunction() {
	localStorage.removeItem('loginUserF');
	localStorage.removeItem('loginPF');
	localStorage.removeItem('id_proyectoglobalF'); 
	location.reload();
}
 
function checkCookiepaso1() {   
	loginUser = localStorage.getItem('loginUserD');
	loginUser=JSON.parse(loginUser); 
	loginP = localStorage.getItem('loginPD');
	loginP=JSON.parse(loginP);
	if(loginUser==null || loginUser.mail=="") {
		localStorage.removeItem('loginUserD');
		localStorage.removeItem('loginPD');
		cerrarCargando();
		setTimeout(function(){ $('#login-modal').modal('show'); }, 700);
	} else {
		loginForPAso1(loginUser.mail, loginP);
	}
}
var user_ajax=0;
var idPrincipal=0;
function cerrarCargando(){
	$('#cargando').modal('hide');
} 
function deleteNotification(id_project){
	 
	try { 
		var id_project=id_project; 
		var fromto=0;
		var type=0;
					$.ajax({
								// /type:"POST",
								dataType : "json",
								// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
								url : urlbaseForAjax + '/DecoradoresController',
								// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					
								data : {
									token : "token",
									action : "removeAlert",
									id_project : id_project,
									type: type,
									fromto : fromto
									
								},
								// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
								contentType : "application/json; charset=utf-8",
								success : function(data) {
								 
								},         
						        error : function(xhr, status) {
						        },  
						        complete : function(xhr, status) { 
						        	 
						        	
						        }
							});

				} catch (e) {
					BootstrapDialog
							.alert('Se ha producido un error en la conexión con el servidor');
					// put any code you want to execute if there's an exception here
					
				}
}
function getNotificaciones(id_usuario, fromto, id_proyectoglobal) { 
	try { 
		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/DecoradoresController',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			data : {
				token : "token",
				action : "getAlerts",
				id_usuario: id_usuario,
				fromto : fromto
				
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) { 
				$(".notificacion").html(0);
				$(".notificacion").css("display", "none");
				for (var i = 0; i < data.length; i++) {
					var id=data[i].id_proyecto;
					if(id_proyectoglobal!=id) { 
						$("."+id).children("span").html(data[i].numeroDeMensajes);
						$("."+id).children("span").css("display", "block");
						var linea=$("."+id).html(); 
						var html="";
						html+='<li class="letra-s proyecto '+id+'" style="cursor:pointer;width:100%" onclick="cambioChat( \''+user_ajax+' \','+id+')">'; 
						html+=linea; 
						html+='</li>';  
						$("."+id).parent().prepend(html);
						$("."+id).nextAll("."+id).remove();
					}
				}
			},         
	        error : function(xhr, status) {
	        },  
	        complete : function(xhr, status) { 
	        	 
	        	
	        }
		});
	
	} catch (e) {
	BootstrapDialog
			.alert('Se ha producido un error en la conexión con el servidor');
	// put any code you want to execute if there's an exception here
	
	}
}

function loginForPAso1(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;
	id_proyectoglobal = localStorage.getItem('id_proyectoglobalD'); 
	id_del_proyecto_a_cargar=id_proyectoglobal;
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null){
		id_del_proyecto_a_cargar = getParameterByName("id"); 
		if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null){
			id_del_proyecto_a_cargar=0;
		}
	} 

	loginUser = localStorage.getItem('loginUserD');
	loginUser=JSON.parse(loginUser); 
	loginP = localStorage.getItem('loginPD');
	loginP=JSON.parse(loginP);
	if(loginUser==null || loginUser.mail=="") {
		localStorage.removeItem('loginUserD');
		localStorage.removeItem('loginPD');
		cerrarCargando();
		setTimeout(function(){ $('#login-modal').modal('show'); }, 700);
	} else {
	try {  
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : loginUser.mail,
  				action : "decoradores_login",
  				user : loginUser.mail,
  				pass : loginP,
  				detail_level: 4,
  				project_level: -1
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				//BootstrapDialog.alert('aaaaa'+data);
  				if (isError(data)) {
  					BootstrapDialog.alert(data);
  				} else {
  					//BootstrapDialog.alert("login correcto");  
  					
 
					var id_ajax = data.id;
					var mail_ajax = data.mail;
					user_ajax = data.nombre;
					proyectos_ajax = data.proyectos;
  					

					var html=""; 
					html+='<ul style="list-style: none;padding-left: 0">';
					if(id_del_proyecto_a_cargar==0){
						for (var i = 0; i < proyectos_ajax.length; i++) {  
							proyectoObject = proyectos_ajax[i];   
								if(proyectoObject.pagado>0 && proyectoObject.idDecorador>1){
									html+='<li class="letra-s proyecto '+proyectoObject.id+'" style="cursor:pointer;width:100%" onclick="cambioChat( \''+user_ajax+' \','+proyectoObject.id+')">'; 
									html+=proyectoObject.tituloProyecto; 
									html+='<span class="notificacion"></span></li>'; 
								} 
						}
					} else {
						for (var i = 0; i < proyectos_ajax.length; i++) {  
								proyectoObject = proyectos_ajax[i];  
								if(proyectoObject.id==id_del_proyecto_a_cargar){   
									if(proyectoObject.pagado>0 && proyectoObject.idDecorador>1){
										html+='<li class="activo letra-s proyecto '+proyectoObject.id+'" style="cursor:pointer;width:100%" onclick="cambioChat( \''+user_ajax+' \','+proyectoObject.id+')">'; 
										html+=proyectoObject.tituloProyecto; 
										html+='<span class="notificacion"></span></li>'; 
									}
								} else {  
									if(proyectoObject.pagado>0 && proyectoObject.idDecorador>1){
										html+='<li class="letra-s proyecto '+proyectoObject.id+'" style="cursor:pointer;" onclick="cambioChat( \''+user_ajax+' \','+proyectoObject.id+')">'; 
										html+=proyectoObject.tituloProyecto; 
										html+='<span class="notificacion"></span></li>'; 
									}
								} 
						} 
					}
					html+='</ul>';
					$('.chatLista, .chatListaMovil').html(html);  
					getNotificaciones(id_ajax, 0, id_proyectoglobal);
					deleteNotification(id_proyectoglobal);
					
					var html4="";
					html4+='<div id="col-xs-12" style="width:100%;height:80px;position:relative;right:0;background-color:#c4c1c1">';
					html4+='	<div style="border-bottom:0;margin-left:0;width:100%;padding-left: 15px;padding-top: 15px"><p class="tituloIzq">'+user_ajax+'</p></div><div id="cerrarSesion" onclick="logoutFunction();" style="float:left"><img src="img/cerrar-sesion.svg" title="Cerrar sesión" alt="Cerrar sesión"></div>'; 
				  
					html4+='</div>';
					$('.chatLista, .chatListaMovil').prepend(html4);
					
					
					for (var i = 0; i < proyectos_ajax.length; i++) { 
						// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
						if(id_del_proyecto_a_cargar==0){
							proyectoObject = proyectos_ajax[0]; 
						} else if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {  
							proyectoObject = proyectos_ajax[i];
							if(proyectoObject.pagado>0 && proyectoObject.idDecorador>1){
								proyectoObject = proyectos_ajax[i];
							} else {
								proyectoObject = proyectos_ajax[0];
							}
						}  
					} 
					var html2="";
					html2+='<div class="no-margin">';
					html2+='<div class="no-margin message-info-row" style="">';
					html2+='  <div class="bocadillo"><p data-content="body" class="letra-s message-body"></p><span data-content="date" class="message-date letra-xxs" style="color:#848484;margin-left:0px;"></span></div>';
					html2+='</div> ';
					html2+='</div>';
					html2+='</script>';
					html2+='<script type="text/html" id="channel-template">';
					html2+='<div class="col-md-12">';
					html2+=' <p class="channel-element" data-content="channelName"></p>';
					html2+=' </div>';
					html2+=' </script>';
					html2+='<script type="text/html" id="member-notification-template">';
					html2+='  <p class="member-status" data-content="status"></p>';

					$('#message-template').html(html2);
					
					if (checklogintosave == 1) {
						saveAndInitProject();
						checklogintosave = 0;
					}

					setTimeout(function() {
						$('#login-modal').modal('hide');
					}, 1500);
					
					if(id_del_proyecto_a_cargar==0){
						cerrarCargando();
					} else {
					var html3="";
					html3+='<div id="Chat" style="background-color:#c4c1c1;height:100%;margin-left:0;width:100%;margin-bottom:30px">'; 
					html3+='<div id="barra" style="height:80px;right:0;background-color:#c4c1c1;transform: translateZ(0);  -moz-transform: translatez(0); -ms-transform: translatez(0); -o-transform: translatez(0);-webkit-transform: translateZ(0);-webkit-font-smoothing: antialiased;">';
					html3+='	<div style="float:left;border-bottom:0;margin-left:0;width:60%;padding-left: 15px;padding-top: 15px"><p class="titulo" style="margin-bottom:0px">'+proyectoObject.user_sin.username+'</p><p class="tituloProyecto"><a href="'+urlbase+'/paso1.html?id='+proyectoObject.id+'" style="color:black;font-weight:normal">'+proyectoObject.tituloProyecto+'</a></p></div><div id="listaProyectos" class="navbar-toggle" data-toggle="modal" data-target="#proyectosLista"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div>'; 
				 
					html3+='</div>'; 
					
					
					html3+='<div id="chat-window">';
					html3+='	<div id="message-list" class=" disconnected"></div>';
					html3+='		<div id="typing-row" class=" disconnected">';
					html3+='			<p id="typing-placeholder"></p>';
					html3+='		</div> ';
					html3+='</div> '; 
					html3+='<div id="input-div col-xs-12" style="width:100%;position:absolute;right:0;">';
					html3+='	<textarea id="input-text" onkeyup="auto_grow(this)" class="textarea-p4 letra-s" placeholder="Escribe un mensaje aquí" style="border-bottom:0;margin-left:0;resize: none;"></textarea>';
					html3+='	<div id="input-text" class="enviar letra-s" placeholder="Escribe un mensaje aquí" style="line-height: 43px;float:left;border-bottom:0;margin-left:0;width:10%;"><img style="height:44px;position: absolute;right: 10px;bottom: 8px;border:1px solid black;border-radius:50%"src="img/enviar.svg" alt="enviar"></div>';
					html3+='</div>';
					html3+='</div>';
					$('.chat').html(html3);

					$(".enviar").click(function() {
						var mensage = $('textarea').val();
						$('textarea').val("");
						enviandoMensaje(mensage);
					});
					}
					
					
					$("#cerrarSesion").click(function() {
						clearAllCookies();
						location.reload();
					});
					var altoChat=$(".chatLista").height(); 
					$("#message-list").css("height",altoChat-140);
					
					if(id_del_proyecto_a_cargar==0){
						cerrarCargando();
						var ventana_ancho = $(window).width();
						if(ventana_ancho<991) {
							$("#proyectosLista").modal('show');
						}
					} else { 
						var array=[];
						array[0]=proyectoObject.nombreProyectDecorador;
						array[1]=proyectoObject.id;
						array[2]=data.nombre;
						array[3]=data.id;
						array[4]=proyectoObject.idDecorador; 
						
						goChat(user_ajax,id_del_proyecto_a_cargar,150, array)
					}
					function cerrarLoad() {
						if ($(".own-message").length > 0 || $(".other-message").length > 0) {
							cerrarCargando();
						} else {
							setTimeout(function(){ cerrarLoad(); }, 1500);
						}
					}
					cerrarLoad(); 
					
					
  					//localStorage.lastname = "Smith";
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here
  		cerrarCargando();
  	}
  	
					  	  

	function modalAnimate($oldForm, $newForm) {
		var $oldH = $oldForm.height();
		var $newH = $newForm.height();
		$divForms.css("height", $oldH);
		$oldForm.fadeToggle($modalAnimateTime, function() {
			$divForms.animate({
				height : $newH
			}, $modalAnimateTime, function() {
				$newForm.fadeToggle($modalAnimateTime);
			});
		});
	}

	function msgFade($msgId, $msgText) {
		$msgId.fadeOut($msgAnimateTime, function() {
			$(this).text($msgText).fadeIn($msgAnimateTime);
		});
	}

	function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass,
			$msgText) {
		var $msgOld = $divTag.text();
		msgFade($textTag, $msgText);
		$divTag.addClass($divClass);
		$iconTag.removeClass("glyphicon-chevron-right");
		$iconTag.addClass($iconClass + " " + $divClass);
		setTimeout(function() {
			msgFade($textTag, $msgOld);
			$divTag.removeClass($divClass);
			$iconTag.addClass("glyphicon-chevron-right");
			$iconTag.removeClass($iconClass + " " + $divClass);
		}, $msgShowTime);
	}
	}
}
function cambioChat(user_ajax, id_del_proyecto_a_cargar) { 
	dejarCanal();
	deleteNotification(id_del_proyecto_a_cargar);
	$("#proyectosLista").modal('hide');
	localStorage.setItem('id_proyectoglobalD', JSON.stringify(id_del_proyecto_a_cargar)); 
	//location.reload(); 
	var id=$('.activo').attr('id');
	if(id!=id_del_proyecto_a_cargar) { 

		fore=0;
		foreach=0;
		$('.chat').html('');
		$('#message-template').html('');
		$('#message-list').html('');
		$('.chatLista ul li').removeClass("activo");
		$('#'+id_del_proyecto_a_cargar).addClass("activo");
		$('#cargando').modal('show');
		
		

		loginUser = localStorage.getItem('loginUserD');
		loginUser=JSON.parse(loginUser); 
		loginP = localStorage.getItem('loginPD');
		loginP=JSON.parse(loginP);
		if (loginUser.mail != "") {
			 loginForPAso1(loginUser.mail, loginP);
			
		} else { 
				var href = urlbase;
				window.location = href;  
		}
		
		var altoChat=$(".chatLista").height(); 
		$("#message-list").css("height",altoChat-80);
	}
} 