$('body').on('hidden.bs.modal', '.modal', function () {
$('#video-comofunciona').trigger('pause');
});

function cargarProyecto(){
	
	//var oo=$.cookie("coockieposicion");
	//getPortfolioItemsFunction(oo);
	//var item=JSON.parse($.cookie("basket-data"));
	//alert(oo);
	$('.myCarousel').carousel({
		  interval: 6000,
		  pause: "false"
		})
	

}


function cargarGifPaso1(){
	
	 document.getElementById('divdelpaso1').style.background =  'url(img/forHomeApp/default.svg)  no-repeat center center';
	 
	var hth= $('#imgdelpaso1').height();
	$('#imgdelpaso1').height(hth);
	
	 var element = document.getElementById('imgdelpaso1');
	 
	 element.style.opacity = "1";
	 element.style.filter  = 'alpha(opacity=100)'; // IE fallback
	 element.src = "img/forHomeApp/1grande.gif";
	 
	 
}
function cargarGifPaso2(){
	
	 document.getElementById('divdelpaso2').style.background =  'url(img/forHomeApp/default.svg)  no-repeat center center';
	 
		var hth= $('#imgdelpaso2').height();
		$('#imgdelpaso2').height(hth);
		
	 var element = document.getElementById('imgdelpaso2');
	 element.style.opacity = "1";
	 element.style.filter  = 'alpha(opacity=100)'; // IE fallback
	 element.src = "img/forHomeApp/2grande.gif";
	 
	 
}
function cargarGifPaso3(){
	
	 document.getElementById('divdelpaso3').style.background =  'url(img/forHomeApp/default.svg)  no-repeat center center';
	 
		var hth= $('#imgdelpaso3').height();
		$('#imgdelpaso3').height(hth);
		
	 var element = document.getElementById('imgdelpaso3');
	 element.style.opacity = "1";
	 element.style.filter  = 'alpha(opacity=100)'; // IE fallback
	 element.src = "img/forHomeApp/3grande.gif";
	 
	 
}
function cargarGifPaso4(){
	
	 document.getElementById('divdelpaso4').style.background =  'url(img/forHomeApp/default.svg)  no-repeat center center';
	 
		var hth= $('#imgdelpaso4').height();
		$('#imgdelpaso4').height(hth);
		
	 var element = document.getElementById('imgdelpaso4');
	 element.style.opacity = "1";
	 element.style.filter  = 'alpha(opacity=100)'; // IE fallback
	 element.src = "img/forHomeApp/4grande.gif";
	 
	 
}

function functionIrAConocenos(){
	
	$('html, body, #elcontainerfluid').animate({
		scrollTop : ($("#section5").offset().top)-50
	}, 'slow');
}
function functionIrAComoFunciona(){

	$('html, body, #elcontainerfluid').animate({
		scrollTop : ($("#divforvideoasifunciona").offset().top)-50
	}, 'slow');
}


function click180(){
	$("#boton199").attr("src", 'img/forRegalo/botonformulario199Sin.png');
	$("#boton180").attr("src", 'img/forRegalo/botonformulario180.png');
	$("#idBox").hide();
	$("#idETarjeta").show();
	
}

function click199(){
	$("#boton180").attr("src", 'img/forRegalo/botonformulario180Sin.png');
	$("#boton199").attr("src", 'img/forRegalo/botonformulario199.png');
	$("#idBox").show();
	$("#idETarjeta").hide();
	
}
function functionIrABotoneraRegalo(){
	$('html, body, #elcontainerfluid').animate({
		scrollTop : ($("#idforbotoneraregalos").offset().top)-50
	}, 'slow');
}

function BotoneraRegalo(){
	$('#regalo').css('background-color','white');
	$('#regalo').css('color','black');
	$('#regalo2').css('background-color','black');
	$('#regalo2').css('color','white');
}

function BotoneraRegalo2(){
	$('#regalo2').css('background-color','white');
	$('#regalo2').css('color','black');
	$('#regalo').css('background-color','black');
	$('#regalo').css('color','white'); 
}


function vervideocomofunciona(){
	 
	//$('#divforvideo').html(cadenacodigo);
	$('#modalforvideo').modal('show');
	$('#video-comofunciona').get(0).play()
}


function sendFormularioServiciosetarjeta(dedonde, grupo, seccion) {
	var inputNombre=document.getElementById('inputNombreEtarjeta');
	var inputMail=document.getElementById('inputMailEtarjeta');
	var inputCuentanos=document.getElementById('inputCuentanosEtarjeta');
	var inputNombreDatosEtarjeta=document.getElementById('inputNombreDatosEtarjeta');
	var inputMailDatosEtarjeta=document.getElementById('inputMailDatosEtarjeta');
	var inputMovilDatosEtarjeta=document.getElementById('inputMovilDatosEtarjeta');
	var inputCuentanosDatosEtarjeta=document.getElementById('inputCuentanosDatosEtarjeta');
	
	
	if(inputNombre.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca el nombre la que va dirigido el regalo');
		return;
	}
	if(inputMail.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un mail válido');
		return;
	}
	if(inputNombreDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce tu nombre');
		return;
	}
	if(inputMailDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce tu mail');
		return;
	}
	if(inputMailDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce un número de teléfono para contactarte si hay algún problema');
		return;
	}
	
	
		$('#modalopcionesdepago180').modal('show');
	

}

var toMail = 'info@decotheco.com, pcageao@gmail.com ';


function  sendMailServiciosetarjeta(dedonde, grupo, seccion) {
	   
	try {
		 

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}

}

function sendFormularioServiciosidBox(dedonde, grupo, seccion) {
	var inputNombre=document.getElementById('inputNombre');
	var inputMail=document.getElementById('inputMail');
	var inputCodigopostal=document.getElementById('inputCodigopostal');
	var inputPoblacion=document.getElementById('inputPoblacion');
	var inputCuentanos=document.getElementById('inputCuentanos');
	
	var inputNombreDatosEtarjeta=document.getElementById('inputNombreDatos');
	var inputMailDatosEtarjeta=document.getElementById('inputMailDatos');
	var inputMovilDatosEtarjeta=document.getElementById('inputMovilDatos');
	var inputCuentanosDatosEtarjeta=document.getElementById('inputCuentanosDatos');
	
	
	if(inputNombre.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca el nombre la que va dirigido el regalo');
		return;
	}
	if(inputMail.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca una dirección válida');
		return;
	}
	if(inputCodigopostal.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un código postal');
		return;
	}
	if(inputPoblacion.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca una población válida');
		return;
	}
	if(inputNombreDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce tu nombre');
		return;
	}
	if(inputMailDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce tu mail');
		return;
	}
	if(inputMailDatosEtarjeta.value== ""){
		BootstrapDialog
		.alert('Por favor, introduce un número de teléfono para contactarte si hay algún problema');
		return;
	}
	
	$('#modalopcionesdepago199').modal('show');
	//sendMailServiciosbox(dedonde, grupo, seccion);

}



function pagar199Regalo(data, total){
	

	$(document.body).css({ 'cursor': 'wait' });
	
	 
	
	var nombre=document.getElementById('inputNombre').value;
	var direccion=document.getElementById('inputMail').value;
	var cp=document.getElementById('inputCodigopostal').value;
	var poblacion=document.getElementById('inputPoblacion').value;
	var comentarios=document.getElementById('inputCuentanos').value;
	
	var nombre_buyer=document.getElementById('inputNombreDatos').value;
	var mail_buyer=document.getElementById('inputMailDatos').value;
	var telefono_buyer=document.getElementById('inputMovilDatos').value;
	var mensaje_personalizar=document.getElementById('inputCuentanosDatos').value;
	var mail='';
	var id_proyecto="0";
	var concepto='DecoRegaloDeco-Box';
	var mail='';
	
		try {
			$.ajaxSetup({
				scriptCharset : "utf-8",
				contentType : "application/json; charset=utf-8"
			});

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/SetPagoRegalo',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				
				data : {
					concepto : concepto,
					nombre : nombre,
					direccion : direccion,
					cp : cp,
					telefono_buyer : telefono_buyer,
					poblacion : poblacion,
					comentarios : comentarios,
					nombre_buyer : nombre_buyer,
					mail_buyer : mail_buyer,
					mensaje_personalizar : mensaje_personalizar,
					mail : mail,
					total : total,
					id_proyecto : id_proyecto,
					codigo: data
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					//alert(data);
					if(data != '0'){
						// Llamada que añade si el usuario gastó uno de los descuentos
						$.ajax({ 
							dataType : "json", 
				  			url : urlbaseForAjax + '/DecoradoresController',
				  			data : {
				  				token : id_ajax,
				  				action : "subtractDiscount",
				  				id_user : id_ajax,
				  				tipoPago : 4
				  				
				  			},
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
								
							 
							}
						});
						$('.modal').modal('hide');
						setTimeout(function(){
							$(document.body).css({'cursor' : 'default'}); 
							BootstrapDialog
							.alert('El pago se ha realizado correctamente, el proceso ya está en marcha. En breves recibirás un correo con toda la información :)');
						}, 1000); 
						
					}else{
							$('.modal').modal('hide');
							setTimeout(function(){ 
							$(document.body).css({'cursor' : 'default'}); 
							BootstrapDialog
							.alert('Algo no ha salido bien con el pago, por favor contacte con un administrador en info@decotheco.com');
							}, 1000);
					}
				}
			});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			$(document.body).css({'cursor' : 'default'}); 
		}
}
function pagar180Regalo(data, total){

	$(document.body).css({ 'cursor': 'wait' });
	
 
	
	var nombre=document.getElementById('inputNombreEtarjeta').value;
	var mail=document.getElementById('inputMailEtarjeta').value;
	var comentarios=document.getElementById('inputCuentanosEtarjeta').value;
	var nombre_buyer=document.getElementById('inputNombreDatosEtarjeta').value;
	var mail_buyer=document.getElementById('inputMailDatosEtarjeta').value;
	var telefono_buyer=document.getElementById('inputMovilDatosEtarjeta').value;
	var mensaje_personalizar=document.getElementById('inputCuentanosDatosEtarjeta').value;
	
	var id_proyecto="0";
	var concepto='DecoRegaloE-Tarjeta';
	var cp="";
	var direccion="";
	var poblacion="";


	
		try {
			$.ajaxSetup({
				scriptCharset : "utf-8",
				contentType : "application/json; charset=utf-8"
			});

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/SetPagoRegalo',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				
				data : {
					concepto : concepto,
					nombre : nombre,
					direccion : direccion,
					cp : cp,
					telefono_buyer : telefono_buyer,
					poblacion : poblacion,
					comentarios : comentarios,
					nombre_buyer : nombre_buyer,
					mail_buyer : mail_buyer,
					mensaje_personalizar : mensaje_personalizar,
					mail : mail,
					total : total,
					id_proyecto : id_proyecto,
					codigo: data
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					//alert(data);
					if(data != '0'){
						
						// Llamada que añade si el usuario gastó uno de los descuentos
						$.ajax({ 
							dataType : "json", 
				  			url : urlbaseForAjax + '/DecoradoresController',
				  			data : {
				  				token : id_ajax,
				  				action : "subtractDiscount",
				  				id_user : id_ajax,
				  				tipoPago : 3
				  				
				  			},
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
								
							 
							}
						});
						$('.modal').modal('hide');
						setTimeout(function(){
							$(document.body).css({'cursor' : 'default'}); 
							BootstrapDialog
							.alert('El pago se ha realizado correctamente, el proceso ya está en marcha. En breves recibirás un correo con toda la información :)');
						}, 1000);
						  
					}else{

						$('.modal').modal('hide');
						setTimeout(function(){ 
						$(document.body).css({'cursor' : 'default'}); 
						BootstrapDialog
						.alert('Algo no ha salido bien con el pago, por favor contacte con un administrador en info@decotheco.com');
						}, 1000);
					}
				}
			});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			$(document.body).css({'cursor' : 'default'}); 
		}
}

function  sendMailServiciosbox(dedonde, grupo, seccion) {
	var inputNombre=document.getElementById('inputNombre');
	var inputMail=document.getElementById('inputMail');
	var inputCodigopostal=document.getElementById('inputCodigopostal');
	var inputPoblacion=document.getElementById('inputPoblacion');
	var inputCuentanos=document.getElementById('inputCuentanos');
	
	var inputNombreDatosEtarjeta=document.getElementById('inputNombreDatos');
	var inputMailDatosEtarjeta=document.getElementById('inputMailDatos');
	var inputMovilDatosEtarjeta=document.getElementById('inputMovilDatos');
	var inputCuentanosDatosEtarjeta=document.getElementById('inputCuentanosDatos');
	
	
	var fromMail = inputMailDatosEtarjeta.value;
	var subject = ' Regalo de E-tarjeta de:'+ inputNombreDatosEtarjeta.value;
	
	var content = ' Regalo de '+ inputNombreDatosEtarjeta.value + '\ncon mail:' + inputMailDatosEtarjeta.value+ ',\n con movil:' + inputMovilDatosEtarjeta.value ;
	
	var content = ' \nPara: '+ inputNombre.value + '\ncon dirección:' +  inputMail.value + '\n:'+ inputCodigopostal.value + '\n:'+ inputPoblacion.value;
	
	var content = ' \nFecha y comentarios: '+ inputCuentanos.value;
	var content = ' \nMensaje personalizado: '+ inputCuentanosDatosEtarjeta.value  ;
	
	
	content+="\n:)";
	
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
				fromMail : 'info@decotheco.com',
				subject : subject,
				content : content
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				//alert("eliminado");
				
					//BootstrapDialog.alert('Consulta enviada! En breve nos pondremos en contacto contigo :).');
				
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}

}



