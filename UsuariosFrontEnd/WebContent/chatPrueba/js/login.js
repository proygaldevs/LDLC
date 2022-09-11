var checklogintosave = 0;
var proyectoInfo="";
var proyectoObject=0;
var pagoEspecial="";
// Si tipo es 1 es que accede desde fuera de indexapp.
// Si el tipo es 2 es que accede desde indexapp.
// Si el tipo es 3 es que accede desde Menu.html (menu de usuarios)

function getParameterByName(name, url) {
	
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function cerrarCargando(){
	$('#cargando').modal('hide');
} 

function clearAllCookies() {
	deleteCookie("userAssistant");
	deleteCookie("passAssistant");
	deleteCookie("paso1");
	deleteCookie("paso2");
	deleteCookie("paso3");
	deleteCookie("paso4");
	deleteCookie("paso5");
	deleteCookie("paso6_1");
	deleteCookie("paso6_2");
	deleteCookie("paso6_3");
	deleteCookie("paso7_1");
	deleteCookie("paso7_2");
	deleteCookie("paso7_3");
	deleteCookie("paso8_1");
	deleteCookie("paso8_2");
	deleteCookie("paso8_3");
	deleteCookie("id_moodboard");
	deleteCookie("id_proyectoglobal");
	deleteCookie("proyectoParaDecorador");
	deleteCookie("wellcome");

} 
function logoutFunction() {
	clearAllCookies();
	deleteCookie("checked_keep_Session"); 
}

function deleteCookie(cname) {
	setCookie(cname, '', 365);
}
function setCookie(cname, value, exdays) {
	/*
	 * var d = new Date(); d.setTime(d.getTime() + (exdays*24*60*60*1000)); var
	 * expires = "expires="+d.toUTCString(); document.cookie = cname + "=" +
	 * cvalue + "; " + expires; //document.cookie = cname + "=" + cvalue + "; ";
	 */
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value)
			+ ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = cname + "=" + c_value;
}

function getCookie(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : "";
}
function saveAndInitProject() {
	$(document.body).css({ 'cursor': 'wait' });
	//alert("saveandinitproject");
	var p_1 = getCookie("paso1Real");
	var p_2 = getCookie("paso2");
	var p_3 = getCookie("paso3");
	var p_4 = getCookie("paso4");
	var p_5 = getCookie("paso5");
	var id_proyectoglobal = getCookie("id_proyectoglobal");
	id_decorador_seleccionado = getCookie("id_decorador_seleccionado");
	deleteCookie(id_decorador_seleccionado);
	// BootstrapDialog.alert(id_proyectoglobal);

	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SetProject',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			data : {
				paso1 : p_1,
				paso2 : p_2,
				paso3 : p_3,
				paso4 : p_4,
				paso5 : p_5,
				id_moodboard : idmoodboard,
				id_proyecto : id_proyectoglobal,
				id_decorador_seleccionado: id_decorador_seleccionado
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				// BootstrapDialog.alert("DATA: "+data);
				// $usuarioGlobal=data;
				if (data != 0) {
					 
				} else {
					clearPrefCookies();
					checkCookie();
				}

			},         
	        error : function(xhr, status) { 
	        	cerrarCargando();
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1500);
	        },  
	        complete : function(xhr, status) { 
	        	cerrarCargando();
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1500);
	        }
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1500);
	} 
}

$(function() {

	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister2 = $('#register-form2');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;
	var $loginResutl;
	$("form").submit(
			
			function() {
				//alert("submit "+ this.id);
				switch (this.id) {
				case "dudas-form":
					// BootstrapDialog.alert(""+$usuarioGlobal.id);
					sendDudas();

					return false;
					break; 
				case "login-form":
					// BootstrapDialog.alert(""+$usuarioGlobal.id); 
					var $lg_username = $('#login_username').val();
					var $lg_password = $('#login_password').val();
					$(document.body).css({ 'cursor': 'wait' });
					login($lg_username, $lg_password);

					return false;
					break;  
				case "lost-form":
					var $ls_email = $('#lost_email').val();
					
					recordar($ls_email);
					return false;
					break;
				case "register-form":
					 
					var $rg_username = $('#register_username').val();
					var $rg_email = $('#register_email').val();
					var $rg_password = $('#register_password').val();
					var passwordsignup_confirm = $('#passwordsignup_confirm').val();
					
					if(passwordsignup_confirm==$rg_password){
						if($('#check_condiciones_recuerdame').is(':checked') ){
							register($rg_username, $rg_email, $rg_password);
						}else{
							msgChange($('#div-register-msg'), $('#icon-register-msg'),
									$('#text-register-msg'), "error",
									"glyphicon-remove", "Acepta las condiciones");
							
						}
					} else {
						msgChange($('#div-register-msg'), $('#icon-register-msg'),
								$('#text-register-msg'), "error",
								"glyphicon-remove", "No coinciden las contraseñas");
					}
					
					

					return false;
					break;
				case "register-form2":
					 
					var $rg_username = $('#register_username2').val();
					var $rg_email = $('#register_email2').val();
					var $rg_password = $('#register_password2').val();
					var passwordsignup_confirm = $('#passwordsignup_confirm2').val();
					
					if(passwordsignup_confirm==$rg_password){
						if($('#check_condiciones_recuerdame2').is(':checked') ){
							register($rg_username, $rg_email, $rg_password);
						}else{
							msgChange($('#div-register-msg2'), $('#icon-register-msg2'),
									$('#text-register-msg2'), "error",
									"glyphicon-remove", "Acepta las condiciones");
							
						}
					} else {
						msgChange($('#div-register-msg2'), $('#icon-register-msg2'),
								$('#text-register-msg2'), "error",
								"glyphicon-remove", "No coinciden las contraseñas");
					}
					
					

					return false;
					break;
				default:
					return false;
				}
				return false;
			});

	$('#login_register_btn').click(function() {
		modalAnimate($formLogin, $formRegister)
	}); 
	$('#login_lost_btn').click(function() {
		modalAnimate($formLogin, $formLost);
	});
	$('#register').click(function() {
		$('.formRegistrar').css("display","inline");
		$('.fondoRegistrar').css("display","none");
		$('.formLogin').css("display","none");
		$('.fondoLogin').css("display","inline");
	}); 
	$('#registerMin').click(function() {
		modalAnimate($formLogin, $formRegister2);
	}); 
	$('#loguin').click(function() {
		$('.formRegistrar').css("display","none");
		$('.fondoRegistrar').css("display","inline");
		$('.formLogin').css("display","inline");
		$('.fondoLogin').css("display","none");
	});
	$('#lost_login_btn').click(function() {
		modalAnimate($formLost, $formLogin);
	}); 
	$('#register_login_btn').click(function() {
		modalAnimate($formRegister2, $formLogin);
	});  
	$('#lost_register_btn').click(function() {
		modalAnimate($formLost, $formRegister);
	});
	$('#register_lost_btn').click(function() {
		modalAnimate($formRegister, $formLost);
	});

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
});
function login(lg_user, lg_pass) {
	 
	$(document.body).css({ 'cursor': 'wait' });
	//alert("loginPotatoso");
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;
	//alert(urlbase + '/GetUser');
	// BootstrapDialog.alert('login');
	try {
		

		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 0
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
							  
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						var user_ajax = data.userName;
						proyectos_ajax = data.proyectos;

						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");

							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">'; 
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							} 


							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {
									
									 
								} else {
									proyectoObject=proyectos_ajax[i];
									var paso1value = getCookie("paso1");
									var esproyectonuevo = getCookie("nuevo_Proyecto");
									var anadirMoodboard = getCookie("anadirMoodboard");
									deleteCookie("anadirMoodboard");
									var idProyecto ="";
									if(anadirMoodboard!=""){
										idProyecto=anadirMoodboard;
									}
									else {
										idProyecto=proyectos_ajax[0].id;
									} 
									if (paso1value == "") {
										// como es el último proyecto y no esta
										// haciendo uno nuevo, al logarse carga
										// el último, si existe

										if (i != 0) {
											if (esproyectonuevo != "") {
												perfilUsuario(
														idProyecto,
														false)

											} else {
												perfilUsuario(
														idProyecto,
														true);
											}

										} else {
											perfilUsuario(
													idProyecto, false);
										}
									} else {
										perfilUsuario(idProyecto,
												false);
									}
								}
							}
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'+urlbase+'/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';
							var urlforhome = urlbase;
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							/*var checked = document
									.getElementById("check_login_recuerdame").checked;
							// BootstrapDialog.alert(checked);
							if (checked) {
								// BootstrapDialog.alert("aaa");
								
								setCookie("checked_keep_Session", "1", 365);
							}*/
							localStorage.removeItem('loginUser');
		  					localStorage.setItem('loginUser', JSON.stringify(data));
		  					localStorage.setItem('loginP', JSON.stringify(lg_pass));
		  					var loginUser = localStorage.getItem('loginUser');
		  					loginUser=JSON.parse(loginUser);
							/*setCookie("userAssistant", mail_ajax, 365);
							setCookie("passAssistant", $lg_password, 365);*/
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							 
							 
							$('#login-modal').modal('hide');
							setTimeout(function() { 
								var tipoPago = getCookie("pagar"); 
								deleteCookie("pagar"); 
								if(tipoPago==79) {
									$('#modalopcionesdepago79').modal('show');
								}
								if (tipoPago==179){
									$('#modalopcionesdepago179').modal('show');
								}
							}, 1000);
								
						}
						

					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        	setTimeout(function(){
			    	    	$(document.body).css({ 'cursor': 'default' });
			    	    }, 500);
			        },  
			        complete : function(xhr, status) { 
			        	cerrarCargando();
			        	setTimeout(function(){
			    	    	$(document.body).css({ 'cursor': 'default' });
			    	    }, 500);
			        }
				});

	} catch (e) {
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
		setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1000);
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
function perfilUsuario(id, existente) {
	deleteCookie("nuevo_Proyecto");  
	cerramosONo=false;
	location.reload();
}