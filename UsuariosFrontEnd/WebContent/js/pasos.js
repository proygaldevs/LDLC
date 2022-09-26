function aceptarPaso32D (tipo) {
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var tipo=tipo;
	var id = proyectoObject.id;
	var contra = getCookie("passAssistant");
	var email = getCookie("userAssistant");
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "aceptarPaso3_2D",
  				pass : contra,
  				mail : email,
  				id_proyecto: id,
  				numero_propuesta: tipo,
  				mailDecorador: proyectoObject.uniqueDecorador
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data; 
  				if (isError(data)) {
  					$(document.body).css({ 'cursor': 'default' });
  					BootstrapDialog.alert(data, function(){ 
  						cerrarCargando();
  			        }); 
  				} else {
  					cambioEstadoChat("Aceptar2d");
  					if(tipo==2){
						$('.aceptarPropuesta').html("PROPUESTA ACEPTADA");
						$('.aceptarPropuesta2').html("PROPUESTA NO ACEPTADA");
						$(".aceptarPropuesta").attr('onclick', '');
						$(".aceptarPropuesta2").attr('onclick', '');
					} else {
						$('.aceptarPropuesta').html("PROPUESTA NO ACEPTADA");
						$('.aceptarPropuesta2').html("PROPUESTA ACEPTADA");
						$(".aceptarPropuesta").attr('onclick', '');
						$(".aceptarPropuesta2").attr('onclick', '');
					}
  					cambiarEstado("paso3");
  					
  				}

  			}
  		});

  	} catch (e) {
  		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
			cerrarCargando();
        }); 
  	}
  	 
}
function messagesMail() {
	$('#modalChat').modal('hide');
	var toMail = proyectoObject.uniqueDecorador;
	 
	var fromMail="info@decotheco.com";
	var nombre;
	nombre = $("li[id=liforsustitution] > a").text();
		
	var consulta=document.getElementById('dudas_consultaCon').value;
	var subject = "Mensajes de chat pendientes - Decotheco";
	
	
	var content = "¡Hola!<br/> El usuario del proyecto "+proyectoObject.nombreProyecto+" parece que te dejó mensajes en el chat, intenta conectarte lo antes posible.";
	
	//alert(dateInputforCita.value);
	//alert(timeInputforCita.value);
	//alert(datocontactoInputforCita.value);
	//alert(content);
	
	 
	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SendMail',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			
			data : {
				toMail : toMail,
				fromMail : fromMail,
				subject : subject,
				content : content,
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				//alert("data:" +data);
				if(data != '-1'){
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.show({
				            title: '',
				            message: 'Ya avisamos al decorador, en breve se conectará y leerá tus mensajes.',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){
				                	$('.aviso').html('Decorador avisado');
				                	$('.aviso').attr('onclick','').unbind('click');
				                	setTimeout(function() {
				                		$('#modalChat').modal('show'); 
				                	}, 500);
				                    dialogRef.close();
				                }
				            }]
				        });
					 
				}else{
					$(document.body).css({ 'cursor': 'default' });
					
  					BootstrapDialog.alert('No se ha podido enviar el mensaje.', function(){ 
  						cerrarCargando();
  						
  			        });  
				}
				
			}
		});

	} catch (e) {
		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
			cerrarCargando();
        });  
	}
}

function aceptarPaso33D () { 
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var id = proyectoObject.id;
	var tipo = proyectoObject.paso3Propuestas;
	var contra = getCookie("passAssistant");
	var email = getCookie("userAssistant");
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "aceptarPaso3_3D",
  				pass : contra,
  				mail : email,
  				id_proyecto: id,
  				mailDecorador: proyectoObject.uniqueDecorador
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data; 
  				if (isError(data)) {
  					$(document.body).css({ 'cursor': 'default' });
  					BootstrapDialog.alert(data, function(){ 
  						cerrarCargando();
  			        }); 
  				} else {
  					cambioEstadoChat("Aceptar3d");
  					if(tipo==1){
						$('.aceptarPropuesta3d1').html("PROPUESTA 3D ACEPTADA");
						$('.aceptarPropuesta3d2').html("PROPUESTA 2D NO ACEPTADA");
						$(".aceptarPropuesta3d1").attr('onclick', '');
						$(".aceptarPropuesta3d2").attr('onclick', '');
					} else {
						$('.aceptarPropuesta3d1').html("PROPUESTA 2D NO ACEPTADA");
						$('.aceptarPropuesta3d2').html("PROPUESTA 3D ACEPTADA");
						$(".aceptarPropuesta3d1").attr('onclick', '');
						$(".aceptarPropuesta3d2").attr('onclick', '');
					}
  					cambiarEstado("paso33D"); 
  					
  				}

  			}
  		});

  	} catch (e) {
  		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
			cerrarCargando();
        }); 
  	} 
}
function aceptarPaso4 () {
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var id = proyectoObject.id;
	var contra = getCookie("passAssistant");
	var email = getCookie("userAssistant");
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "aceptarPaso4",
  				pass : contra,
  				mail : email,
  				id_proyecto: id,
  				mailDecorador: proyectoObject.uniqueDecorador
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data; 
  				if (isError(data)) {
  					$(document.body).css({ 'cursor': 'default' });
  					BootstrapDialog.alert(data, function(){ 
  						cerrarCargando();
  			        }); 
  				} else { 

  						cambioEstadoChat("Finalizar");
						$('.aceptarPaso4').html("PROYECTO FINALIZADO"); 
						$(".aceptarPaso4").attr('onclick', '');  
						if(proyectoObject.estado==91) {
							cambiarEstado("paso4");  
						}
  					
  				}

  			}
  		});

  	} catch (e) {
  		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
			cerrarCargando();
        }); 
  	}
  	 
}


$(".subscribe").click(function() {
	setTimeout(function(){ location.reload(); }, 1000);
});