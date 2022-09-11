var checklogintosave = 0;
var pasa=false;

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
				case "register-form":		
					$('.registroDes').css("display","none");
					var $rg_username = $('#register_username').val();
					var $rg_email = $('#register_email').val();
					var $rg_password = $('#register_password').val();
					var passwordsignup_confirm = $('#passwordsignup_confirm').val();
					
					if(passwordsignup_confirm==$rg_password){
						if($('#check_condiciones_recuerdame').is(':checked') ){
							register($rg_username, $rg_email, $rg_password);
						} else {
							$('.registroDes').css("display","block");
						}
					} else {
						BootstrapDialog.show({
				            title: '',
				            message: 'Las contraseñas no coinciden',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){
				                	  dialogRef.close(); 
				                	
				                }
				            }]
				        }); 
						$('.registroDes').css("display","block");
					}
					return false;
					break;
				default:
					return false;
				}
				return false;
			});
 
 
}); 
 
function register(rg_user, rg_mail, rg_pass) {

	$(document.body).css({ 'cursor': 'wait' });
	var $rg_username = rg_user;
	var $rg_mail = rg_mail;
	var $rg_password = rg_pass;

	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms'); 

	try {
 
	if(pasa) { 
		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/CreateUser',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				username : $rg_username,
				mail : $rg_mail,
				pass : $rg_password
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				// BootstrapDialog.alert("register:);

				$('.registroDes').css("display","block");
				console.log(data);  
				// $usuarioGlobal=data;
				var resultRegister = data; 
				// BootstrapDialog.alert("register:"+resultRegister);
				if (resultRegister == 1) {
	    	    	$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.show({
			            title: '',
			            message: 'El mail ya esta registrado',
			            type: BootstrapDialog.TYPE_DEFAULT,
			            buttons: [{
			                label: 'Ok',
			                action: function(dialogRef){
			                	  dialogRef.close(); 
			                	
			                }
			            }]
			        }); 
				} else if (resultRegister > 2) {
	    	    	$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.show({
			            title: '',
			            message: 'Ha ocurrido algún error',
			            type: BootstrapDialog.TYPE_DEFAULT,
			            buttons: [{
			                label: 'Ok',
			                action: function(dialogRef){
			                	  dialogRef.close(); 
			                	
			                }
			            }]
			        }); 
				} else {

						try { 
								$.ajax({  
						  			dataType : "json", 
						  			url : urlbaseForAjax + '/DecoradoresController',
						  			data : {
						  				token : affiliates,
						  				action : "addDiscount",
						  				rg_mail : rg_mail,
						  				id_affiliate : affiliates,
						  				id_offer : id_offer
						  			},
						  			contentType : "application/json; charset=utf-8",
						  			success : function(data) {
 
						                	login(rg_mail,rg_pass); 
									},
							        error : function(xhr, status) {   
							        	setTimeout(function(){
							    	    	$(document.body).css({ 'cursor': 'default' });
							    	    }, 1000);
							        },  
							        complete : function(xhr, status) {   
							        	setTimeout(function(){
							    	    	$(document.body).css({ 'cursor': 'default' });
							    	    }, 1000);
							        }
								}); 
						} catch (e) {
							BootstrapDialog
									.alert('Se ha producido un error en la conexión con el servidor'); 
						}
					}
	    	    	$(document.body).css({ 'cursor': 'default' });

			},
	        error : function(xhr, status) {  
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1000);
	        },  
	        complete : function(xhr, status) {  
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1000);
	        }
	        
		});
	}

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1000);
	}
 
}
function cerrarCargando(){
	$('#cargando').modal('hide');
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
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
function discount(tipo) { 
	try {
		if(affiliates!="" && id_offer!=""){
			$.ajax({  
	  			dataType : "json", 
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			data : {
	  				token : affiliates,
	  				action : "checkDiscount",
	  				affiliates : affiliates,
	  				id_offer : id_offer
	  				
	  			},
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {

	  				if (isError(data)) {
	  					console.log(data);
	  				} else {
						var afiliado=data[0];
						var oferta=data[1];
						console.log(afiliado);
						console.log(oferta);
						var descuento="€";
						if(oferta.descuento_unitario!=0 || oferta.descuento_porcentual!=0){ 
							descuento=oferta.descuento_unitario+"€";
							descuento1=parseFloat(oferta.descuento_unitario);
							descuento2=parseFloat(oferta.descuento_unitario);
							descuento3=parseFloat(oferta.descuento_unitario);
							if(oferta.descuento_unitario!=0 && oferta.descuento_porcentual!=0){
								descuento=oferta.descuento_unitario+"€ Y UN "+oferta.descuento_porcentual+"%";
							} else if(oferta.descuento_unitario!=0) {
								descuento=oferta.descuento_unitario+"€";
							} else if(oferta.descuento_porcentual!=0) {
								descuento="UN "+oferta.descuento_porcentual+"%";
							}

							descuento11=(79.00*parseFloat(oferta.descuento_porcentual))/100;
							descuento22=(179.00*parseFloat(oferta.descuento_porcentual))/100;
							descuento33=(199.00*parseFloat(oferta.descuento_porcentual))/100;

							total1=descuento1+descuento11;
							total2=descuento2+descuento22;
							total3=descuento3+descuento33;
							$(".descuento1").html(79.00-parseFloat(total1));
							$(".descuento2, .descuento4").html(179.00-parseFloat(total2));
							$(".descuento3").html(199.00-parseFloat(total3)); 
						}
						if(tipo==1) {	
							var cadenaforimg=urlbaseForMoodboards+"/afiliados/"+afiliado.img;
							$(".imgCara").html('<img style="width:100%" src="'+cadenaforimg+'" alt="Decotheco.com">');
							$(".textoAfiliado").html('¡'+afiliado.name.toUpperCase()+' TE HA REGALADO '+descuento+' PARA QUE DECORES TU CASA!');	
						} else {
							 var cadenaforimg=urlbaseForMoodboards+"/afiliados/"+afiliado.img;
							 $(".imgCara").html('<img style="width:100%" src="'+cadenaforimg+'" alt="Decotheco.com">');
							 $(".textoAfiliado").html('¡'+afiliado.name.toUpperCase()+' TE REGALA '+descuento+' PARA CONTRATARLA COMO DECORADORA!');	
						 }
						
						
						pasa=true;
						console.log(pasa);
	  				}
					
					
	  				cerrarCargando();
				},
		        error : function(xhr, status) {  
		        	setTimeout(function(){
		    	    	$(document.body).css({ 'cursor': 'default' });
		    	    }, 1000);
		        },  
		        complete : function(xhr, status) {  
		        	setTimeout(function(){
		    	    	$(document.body).css({ 'cursor': 'default' });
		    	    }, 1000);
		        }
			});
		}

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor'); 
	}
}
function login(lg_user, lg_pass) {
	 
	$(document.body).css({ 'cursor': 'wait' });
	//alert("loginPotatoso");
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms'); 
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
							clearAllCookies();
						} else {

							 
							
							 
							setCookie("checked_keep_Session", "1", 365); 
							setCookie("userAssistant", mail_ajax, 365);
							setCookie("passAssistant", $lg_password, 365);


							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							BootstrapDialog.show({
					            title: '',
					            message: 'Registro Correcto',
					            type: BootstrapDialog.TYPE_DEFAULT,
					            buttons: [{
					                label: 'Ok',
					                action: function(dialogRef){ 
					                	aHomeUsuarios();
					                }
					            }]
					        });  
								
						}
						

					},         
			        error : function(xhr, status) {  
			        	setTimeout(function(){
			    	    	$(document.body).css({ 'cursor': 'default' });
			    	    }, 500);
			        },  
			        complete : function(xhr, status) {  
			        	setTimeout(function(){
			    	    	$(document.body).css({ 'cursor': 'default' });
			    	    }, 500);
			        }
				});

	} catch (e) {
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here 
		setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1000);
	}
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