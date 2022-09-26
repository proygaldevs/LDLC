var decorador;
var proyecto_id;
var projectObject;





function carouselNormalization() {
	var items = $('#carouselinner .item '), //grab all slides
	    heights = [], //create empty array to store height values
	    tallest; //create variable to make note of the tallest slide

	if (items.length) {
	    function normalizeHeights() {
	    	//alert("normalice");
	        items.each(function() { //add heights to array
	            heights.push($(this).height()); 
	        });
	        tallest = Math.max.apply(null, heights); //cache largest value
	        items.each(function() {
	            $(this).css('min-height',tallest + 'px');
	        });
	       if(tallest==0) {
	    	   //alert(tallest);
	    	   setTimeout(function() { normalizeHeights(); }, 200);
	    	  
	       }
	    };
	    normalizeHeights();

	    $(window).on('resize orientationchange', function () {
	        tallest = 0, heights.length = 0; //reset vars
	        items.each(function() {
	            $(this).css('min-height','0'); //reset min-height
	        }); 
	        normalizeHeights(); //run it again 
	    });
	}
}


function crearbotones_grandes_pasos_decorador() {
	var html = '';
	html = botones_grandes_pasos_btn_paso1();
	html += botones_grandes_pasos_btn_paso2();
	html += botones_grandes_pasos_btn_paso3();
	html += botones_grandes_pasos_btn_paso4(); 
    $('#botones').html(html); 
}

function botones_grandes_pasos_btn_paso1() {
	var urlactual = window.location.href;
	//alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (urlactual.indexOf("paso1") > -1) { 
		// P1 ESTAMOS
		cadena += '<a style="text-align:center"  href="javascript:irPaso1()" >'; 
		cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
		cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
		cadena += '1. INFO PROYECTO <br/>';
		cadena += '<hr class="h3 barra"/>';
		cadena += '</div>';
	}	else {
				// P1 NO ESTAMOS
				cadena += '<a style="text-align:center"  href="javascript:irPaso1()" >'; 
				cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
				cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
				cadena += '1. INFO PROYECTO <br/>';
				cadena += '<hr class="h3 barra" style="display:none"/>';
				cadena += '</div>';
		}
	 
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function botones_grandes_pasos_btn_paso2() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (projectObject.estado>21) {
		if (urlactual.indexOf("paso2") > -1) {
			// P2 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso2()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += ' 2. LA LLAMADA<br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P2 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso2()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += ' 2. LA LLAMADA<br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}		
	} else {
		 
			// P2 NO
			cadena += '<a class="hablemos" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div class="pasos letra-ml colorHablemos" style="color:grey" id="div_pre_moodboard_canvas" >';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '2. LA LLAMADA <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function botones_grandes_pasos_btn_paso3() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (projectObject.estado>30) {
		if (urlactual.indexOf("paso3") > -1) {
			// P3 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso3()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P3 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso3()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}
	} else {
		 
			// P3 NO
			cadena += '<a class="propuestas" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div class="pasos letra-ml colorPropuestas" style=" color:grey" id="div_pre_moodboard_canvas">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
//recibe una url de un producto y le añade el parametro "custom_param" para saber de que decorador procede la venta.

function botones_grandes_pasos_btn_paso4() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (projectObject.estado>71) {
		if (urlactual.indexOf("paso4") > -1) {
			// P4 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso4()" >';
			cadena += '<div style=" color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P4 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso4()" >';
			cadena += '<div style=" color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}
	} else {
		 
			// P4 NO
			cadena += '<a class="documentacion" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div <div class="pasos letra-ml colorDocumentacion" style=" color:grey" id="div_pre_moodboard_canvas">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/pasos/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function completarPaso(){
	BootstrapDialog.alert("Cuando finalice el paso actual se podrá acceder al siguiente paso"); 
}
function savePaso1(tipo) {
	if(tipo==0){
		$(document.body).css({ 'cursor': 'wait' });
		$('#cargando').modal('show');
	}
    if (tipo==0) { estado="true"; } else { estado="false"; }
	var id_proyecto = projectObject.id;
	var habitacion = document.getElementById('habitacion_input').value;
	var en_mente = document.getElementById('en_mente_input').value;
	var prioridad_1 = 0;
	if (document.getElementById('cb1').checked) {
		prioridad_1 = 1;
	}
	var prioridad_2 = 0;
	if (document.getElementById('cb2').checked) {
		prioridad_2 = 1;
	}
	var prioridad_3 = 0;
	if (document.getElementById('cb3').checked) {
		prioridad_3 = 1;
	}
	var prioridad_4 = 0;
	if (document.getElementById('cb4').checked) {
		prioridad_4 = 1;
	}
	var prioridad_5 = 0;
	if (document.getElementById('cb5').checked) {
		prioridad_5 = 1;
	}
	var prioridad_6 = 0;
	if (document.getElementById('cb6').checked) {
		prioridad_6 = 1;
	}

	var inspiracion_1 = document.getElementById('inspiracion1_input').value;
	var inspiracion_2 = document.getElementById('inspiracion2_input').value;
	var inspiracion_3 = document.getElementById('inspiracion3_input').value;
	var usos_1 = 0;
	if (document.getElementById('usos1').checked) {
		usos_1 = 1;
	}
	var usos_2 = 0;
	if (document.getElementById('usos2').checked) {
		usos_2 = 1;
	}
	var usos_3 = 0;
	if (document.getElementById('usos3').checked) {
		usos_3 = 1;
	}
	var usos_4 = 0;
	if (document.getElementById('usos4').checked) {
		usos_4 = 1;
	}
	var usos_5 = 0;
	if (document.getElementById('usos5').checked) {
		usos_5 = 1;
	}
	var usos_6 = 0;
	if (document.getElementById('usos6').checked) {
		usos_6 = 1;
	}
	var asientos_1 = 0;
	if (document.getElementById('asientos1').checked) {
		asientos_1 = 1;
	}
	var asientos_2 = 0;
	if (document.getElementById('asientos2').checked) {
		asientos_2 = 1;
	}
	var asientos_3 = 0;
	if (document.getElementById('asientos3').checked) {
		asientos_3 = 1;
	}
	var asientos_4 = 0;
	if (document.getElementById('asientos4').checked) {
		asientos_4 = 1;
	}
	var asientos_5 = 0;
	if (document.getElementById('asientos5').checked) {
		asientos_5 = 1;
	}
	var asientos_6 = 0;
	if (document.getElementById('asientos6').checked) {
		asientos_6 = 1;
	}

	var auxiliares_1 = 0;
	if (document.getElementById('auxiliares1').checked) {
		auxiliares_1 = 1;
	}
	var auxiliares_2 = 0;
	if (document.getElementById('auxiliares2').checked) {
		auxiliares_2 = 1;
	}
	var auxiliares_3 = 0;
	if (document.getElementById('auxiliares3').checked) {
		auxiliares_3 = 1;
	}
	var auxiliares_4 = 0;
	if (document.getElementById('auxiliares4').checked) {
		auxiliares_4 = 1;
	}
	var auxiliares_5 = 0;
	if (document.getElementById('auxiliares5').checked) {
		auxiliares_5 = 1;
	}

	var almacenaje_1 = 0;
	if (document.getElementById('almacenaje1').checked) {
		almacenaje_1 = 1;
	}
	var almacenaje_2 = 0;
	if (document.getElementById('almacenaje2').checked) {
		almacenaje_2 = 1;
	}
	var almacenaje_3 = 0;
	if (document.getElementById('almacenaje3').checked) {
		almacenaje_3 = 1;
	}
	var almacenaje_4 = 0;
	if (document.getElementById('almacenaje4').checked) {
		almacenaje_4 = 1;
	}
	var almacenaje_5 = 0;
	if (document.getElementById('almacenaje5').checked) {
		almacenaje_5 = 1;
	}
	var deco_1 = 0;
	if (document.getElementById('deco1').checked) {
		deco_1 = 1;
	}
	var deco_2 = 0;
	if (document.getElementById('deco2').checked) {
		deco_2 = 1;
	}
	var deco_3 = 0;
	if (document.getElementById('deco3').checked) {
		deco_3 = 1;
	}
	var deco_4 = 0;
	if (document.getElementById('deco4').checked) {
		deco_4 = 1;
	}
	var deco_5 = 0;
	if (document.getElementById('deco5').checked) {
		deco_5 = 1;
	}

	var elementos_extra = document.getElementById('alguno_extra_input').value;

	var imprescindibles_url_1 = document.getElementById('producto1_input').value;
	var imprescindibles_url_2 = document.getElementById('producto2_input').value;
	var imprescindibles_url_3 = document.getElementById('producto3_input').value;
	var otra_necesidad = document.getElementById('otra_necesidad_input').value;
	var diy_1 = document.getElementById('diy1_input').value;
	var diy_2 = document.getElementById('diy2_input').value;
	var diy_3 = document.getElementById('diy3_input').value;
	 
	var suelo = 0;
	if (document.getElementById('suelo_input').checked) {
		suelo = 1;
	}
	var pintura = 0;
	if (document.getElementById('pintura_input').checked) {
		pintura = 1;
	}

	var no_quiero = document.getElementById('no_quieras_input').value;
	var medidas_ancho = document.getElementById('medidas_ancho_input').value;
	var medidas_alto = document.getElementById('medidas_alto_input').value;
	var presupuesto = document.getElementById('presupuesto_input').value; 

	var id_moodboard = projectObject.preferencias[0].id_moodboard;
	 
 
	
	var extra_otras_cosas=0;
	var ventanas_1=0;
	var ventanas_2=0;
	var ventanas_3=0;
	
	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SetInformacion',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				id_proyecto : id_proyecto,
				habitacion : habitacion,
				en_mente : en_mente,
				prioridad_1 : prioridad_1,
				prioridad_2 : prioridad_2,
				prioridad_3 : prioridad_3,
				prioridad_4 : prioridad_4,
				prioridad_5 : prioridad_5,
				prioridad_6 : prioridad_6,
				inspiracion_1 : inspiracion_1,
				inspiracion_2 : inspiracion_2,
				inspiracion_3 : inspiracion_3,
				usos_1 : usos_1,
				usos_2 : usos_2,
				usos_3 : usos_3,
				usos_4 : usos_4,
				usos_5 : usos_5,
				usos_6 : usos_6,
				asientos_1 : asientos_1,
				asientos_2 : asientos_2,
				asientos_3 : asientos_3,
				asientos_4 : asientos_4,
				asientos_5 : asientos_5,
				asientos_6 : asientos_6,
				auxiliares_1 : auxiliares_1,
				auxiliares_2 : auxiliares_2,
				auxiliares_3 : auxiliares_3,
				auxiliares_4 : auxiliares_4,
				auxiliares_5 : auxiliares_5,
				almacenaje_1 : almacenaje_1,
				almacenaje_2 : almacenaje_2,
				almacenaje_3 : almacenaje_3,
				almacenaje_4 : almacenaje_4,
				almacenaje_5 : almacenaje_5,
				deco_1 : deco_1,
				deco_2 : deco_2,
				deco_3 : deco_3,
				deco_4 : deco_4,
				deco_5 : deco_5,
				elementos_extra : elementos_extra,
				imprescindibles_url_1 : imprescindibles_url_1,
				imprescindibles_url_2 : imprescindibles_url_2,
				imprescindibles_url_3 : imprescindibles_url_3,
				otra_necesidad : otra_necesidad,
				diy_1 : diy_1,
				diy_2 : diy_2,
				diy_3 : diy_3,
				suelo : suelo,
				pintura : pintura,
				no_quiero : no_quiero,
				medidas_ancho : medidas_ancho,
				medidas_alto : medidas_alto,
				presupuesto : presupuesto,
				extra_otras_cosas : extra_otras_cosas,
				ventanas_1 : ventanas_1,
				ventanas_2 : ventanas_2,
				ventanas_3 : ventanas_3,
				cambio_estado: estado,
				mailDecorador :  projectObject.uniqueDecorador,
				estado : projectObject.estado
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				if (data != 0) {
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.alert('Hubo un problema al enviar los datos.', function(){ 
						cerrarCargando(); 
			        }); 
				} else { 
					$(document.body).css({ 'cursor': 'default' });
						console.log(projectObject.estado);
						if(tipo==0 && projectObject.estado==11){ 
							$(document.body).css({ 'cursor': 'default' });
							BootstrapDialog.alert('Datos actualizados correctamente.', function(){ 
								cerrarCargando(); 
								subir();
								projectObject.estado=22;
								console.log(projectObject.estado);
					        }); 
						} 
						if(tipo==0 && projectObject.estado!=11){
							$(document.body).css({ 'cursor': 'default' });
							BootstrapDialog.alert('Datos actualizados correctamente.', function(){ 
								cerrarCargando(); 
								subir();
					        }); 
							
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
function setFormularioPaso() { 
	var informacion_var=projectObject.informacion; 
	if (informacion_var==null || typeof informacion_var==undefined) { 
		cargarDropzonePlanos(true); 
	} else {
		
		cargarDropzonePlanos(false); 
		document.getElementById('habitacion_input').value=informacion_var.habitacion;
		document.getElementById('en_mente_input').value=informacion_var.en_mente;
		document.getElementById('cb1').checked=informacion_var.prioridad_1;
			
		
		document.getElementById('cb2').checked=informacion_var.prioridad_2; 
		
		
		document.getElementById('cb3').checked=informacion_var.prioridad_3; 
		
		
		document.getElementById('cb4').checked=informacion_var.prioridad_4; 
		
		
		document.getElementById('cb5').checked=informacion_var.prioridad_5; 
		
		
		document.getElementById('cb6').checked=informacion_var.prioridad_6; 
		
	
		document.getElementById('inspiracion1_input').value=informacion_var.inspiracion_1; 
		 document.getElementById('inspiracion2_input').value=informacion_var.inspiracion_2;
		 document.getElementById('inspiracion3_input').value=informacion_var.inspiracion_3;
		
		document.getElementById('usos1').checked=informacion_var.usos_1; 
			
		document.getElementById('usos2').checked=informacion_var.usos_2; 
		
		
		document.getElementById('usos3').checked=informacion_var.usos_3; 
		
		
		document.getElementById('usos4').checked=informacion_var.usos_4; 
		
		
		document.getElementById('usos5').checked=informacion_var.usos_5; 
		
		
		document.getElementById('usos6').checked=informacion_var.usos_6; 
		
		
		document.getElementById('asientos1').checked=informacion_var.asientos_1; 
	
		document.getElementById('asientos2').checked=informacion_var.asientos_2; 
		
		
		document.getElementById('asientos3').checked=informacion_var.asientos_3; 
		
		
		document.getElementById('asientos4').checked=informacion_var.asientos_4; 
		
		
		document.getElementById('asientos5').checked=informacion_var.asientos_5; 
		
		
		document.getElementById('asientos6').checked=informacion_var.asientos_6; 
		
	
		document.getElementById('auxiliares1').checked=informacion_var.auxiliares_1; 
		
		
		
		document.getElementById('auxiliares2').checked=informacion_var.auxiliares_2; 
		
		
		document.getElementById('auxiliares3').checked=informacion_var.auxiliares_3; 
		
		
		document.getElementById('auxiliares4').checked=informacion_var.auxiliares_4; 
		
		
		document.getElementById('auxiliares5').checked=informacion_var.auxiliares_5; 
		
	
		
		document.getElementById('almacenaje1').checked=informacion_var.almacenaje_1; 
		
		
		document.getElementById('almacenaje2').checked=informacion_var.almacenaje_2; 
		
		
		document.getElementById('almacenaje3').checked=informacion_var.almacenaje_3; 
		
		
		document.getElementById('almacenaje4').checked=informacion_var.almacenaje_4; 
		
		
		document.getElementById('almacenaje5').checked=informacion_var.almacenaje_5; 
		
		
		document.getElementById('deco1').checked=informacion_var.deco_1; 
		
		
		document.getElementById('deco2').checked=informacion_var.deco_2; 
		
		document.getElementById('deco3').checked=informacion_var.deco_3; 
		
		
		document.getElementById('deco4').checked=informacion_var.deco_4; 
		
		 
		document.getElementById('deco5').checked=informacion_var.deco_5;
		
	
	 document.getElementById('alguno_extra_input').value=	informacion_var.elementos_extra;
	
		 document.getElementById('producto1_input').value=informacion_var.imprescindibles_url_1;
		 document.getElementById('producto2_input').value=informacion_var.imprescindibles_url_2;
		document.getElementById('producto3_input').value=informacion_var.imprescindibles_url_3; 
		 document.getElementById('otra_necesidad_input').value=informacion_var.otra_necesidad;
		 document.getElementById('diy1_input').value=informacion_var.diy_1;
		
		document.getElementById('diy2_input').value=informacion_var.diy_2; 
		 document.getElementById('diy3_input').value=informacion_var.diy_3;
		 
		
		
		document.getElementById('suelo_input').checked=informacion_var.suelo; 
		
		
		document.getElementById('pintura_input').checked=informacion_var.pintura; 
		
	
		 document.getElementById('no_quieras_input').value=informacion_var.no_quiero;
		 document.getElementById('medidas_ancho_input').value=informacion_var.medidas_ancho;
		 document.getElementById('medidas_alto_input').value=	informacion_var.medidas_alto;
		 document.getElementById('presupuesto_input').value=informacion_var.presupuesto; 
	 
	}

	
}

function setFormularioPaso2() {
	
	var informacion_var=projectObject.cita;
	if(typeof informacion_var != "undefined"){
		document.getElementById('dateInputforCita').value=informacion_var.fecha;
		document.getElementById('timeInputforCita').value=informacion_var.hora;
		if(informacion_var.skype==1){
			document.getElementById('skypeInputforCita').checked=true;
		}else
		document.getElementById('telefonoInputforCita').checked=true;
		document.getElementById('contenidoInputforCita').value=informacion_var.contenido;
	}
	if (projectObject.estado>=40) {
		$('.aceptarCita').css("display", "none");
		$('.rechazarCita').css("display", "none");
	}
	
 
	
}
 
function setFormularioPaso3() {
	var cs="";
	cs+='<h3 style="margin-top: 1%; margin-bottom: 2%" class="CS1">';
	cs+='	<span  class="texto_letra_Arial_paso1 letra-m letra-negrita">';
	cs+='		CAJÓN DE SASTRE';
	cs+='	</span>';
	cs+='</h3> ';
	cs+='<form action="FileUploadHandler" id="mydropzonePropuesta1"';
	cs+='		class="dropzone estilo_bordes_completos letrainputformularios CS2"';
	cs+='		method="post" enctype="multipart/form-data" style="border:1px solid black;">';
	cs+='			<div class="letrainputformularios" id="dropzonePreview"></div>';
	cs+='</form>';
	
	
	
	
	
	
	
	if(projectObject.ldlcs.length==0){
		$('.BP2D').css("display","none");
	} else if(projectObject.ldlcs.length==1){
			$('.BP2D').css("display","none");
			if(projectObject.ldlcs[0].Estado==2 || projectObject.ldlcs[0].Estado==4) {
				// INSERTAR PROPUESTA1
				$('#imagen1').css("display", "none");
				var id_ldlc = projectObject.ldlcs[0].ListaCompra_id;
				var b;
				try { 
					 
			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data;
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data; 
			  					var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
			  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
									
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} else if(projectObject.ldlcs[0].Estado==3 || projectObject.ldlcs[0].Estado==5) {
				// INSERTAR PROPUESTA2
				$('#imagen2').css("display", "none");
				var id_ldlc2 = projectObject.ldlcs[0].ListaCompra_id;
				var b;
				try {  
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc2
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;
			  					var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
			  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
									
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			}
	} else if(projectObject.ldlcs.length==2){
			if(projectObject.ldlcs[0].Estado==2 || projectObject.ldlcs[0].Estado==4) {
				// INSERTAR PROPUESTA1 
				$('#imagen1').css("display", "none");
				var id_ldlc = projectObject.ldlcs[0].ListaCompra_id;
				var b;
				try { 
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;

									 var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} 
			if(projectObject.ldlcs[0].Estado==3 || projectObject.ldlcs[0].Estado==5) {
				// INSERTAR PROPUESTA2 
				$('#imagen2').css("display", "none");
				var id_ldlc2 = projectObject.ldlcs[0].ListaCompra_id;
				var b;
				try {  
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc2
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;

			  					var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
			  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} 
			if(projectObject.ldlcs[1].Estado==2 || projectObject.ldlcs[1].Estado==4) {
				// INSERTAR PROPUESTA1 
				$('#imagen1').css("display", "none");
				var id_ldlc = projectObject.ldlcs[1].ListaCompra_id;
				var b;
				try { 
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;
			  					var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
			  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} 
			if(projectObject.ldlcs[1].Estado==3 || projectObject.ldlcs[1].Estado==5){
				// INSERTAR PROPUESTA2 
				$('#imagen2').css("display", "none");
				var id_ldlc2 = projectObject.ldlcs[1].ListaCompra_id;
				var b;
				try {  
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc2
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;

			  					var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
			  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
								
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			}
	} 
	
	if(projectObject.estado<40) {
		var cadena="";
		cadena+='<div style="height:100%;padding:2%;background-color:#fdfdfd;opacity: 0.8;filter:  alpha(opacity=80);">';
		cadena+='<h4 class="subtitulo_pantalla" style="margin-top:2%;margin-bottom:2%;">';
		cadena+='	<p class="letra-s">ESTE PASO NO SE PUEDE REALIZAR SIN COMPLETAR LOS ANTERIORES</p>';
		cadena+='</h4>';
		cadena+='</div>';

		$('.P2D1').css("display", "none");
		$('.P2D2').css("display", "none");
		$('.BP2D').css("display", "none");
		$('.CS').css("display", "none");
		$('.BP3D').css("display", "none");
		$('.P3D').html(cadena);
	} else if (projectObject.estado==40) {
		$('.BP3D').css("display", "none");
		$('.P3D').css("display", "none");
		$('.CS').css("display", "none");
		$(".CS1").html(cs);
	} else if(projectObject.estado>51 && projectObject.pagado==1) {
		if(projectObject.paso3Propuestas==3 || projectObject.paso3Propuestas==5){var propuesta=2;}else{ var propuesta=1;}
		$(".BP2D").html("PROPUESTA "+propuesta+" ACEPTADA");
		$('.BP2D').css("max-width", "380px");
		$(".BP2D").attr('onclick', '');  
		$('.CS').css("display", "block");
		$(".CS2").html(cs);
		$('.P3D').css("display", "block");
		if(projectObject.estado==71) {
 
			$(".BP3D").html("PROPUESTAS 3D ENVIADAS");
			$('.BP3D').css("max-width", "380px");
			$(".BP3D").attr('onclick', '');
		}
		if(projectObject.estado>71) {
			$('.edit2').css("display", "none");
			$('.edit1').css("display", "none");
			$(".BP3D").html("PROPUESTA 3D ACEPTADA");
			$('.BP3D').css("max-width", "380px");
			$(".BP3D").attr('onclick', '');
		}
	} else {
		if(projectObject.estado>=80){
			if(projectObject.paso3Propuestas==3 || projectObject.paso3Propuestas==5){var propuesta=2;}else{ var propuesta=1;}
			$('.edit2').css("display", "none");
			$('.edit1').css("display", "none");
			$(".BP2D").html("PROPUESTA "+propuesta+" ACEPTADA");
			$('.BP2D').css("max-width", "380px");
			$(".BP2D").attr('onclick', '');
			$('.P3D').css("display", "none");
			$(".CS1").html(cs);
		}else {

			$(".CS1").html(cs); 
			$('.BP2D').css("display", "none");
			$('.P3D').css("display", "none"); 
		}
 
		$('.CS').css("display", "block");
		$('.BP3D').css("display", "none");
	} 
	cargarDropzonePlanos(false); 
		
}
//recibe una url de un producto y le añade el parametro "custom_param" para saber de que decorador procede la venta.
function processUrlAffiliates(urlProducto, listaAfiliados, idDecorador) {

	for (i = 0; i < listaAfiliados.length; i++) {
		var url_base = listaAfiliados[i].url_base;
		var url_add = listaAfiliados[i].url_add;
		var tipo_afiliacion = listaAfiliados[i].tipo_afiliacion;
		
		if (urlProducto != undefined) {
			// si es de tipo prestashop
			if (tipo_afiliacion == 1) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto + "&"
								+ listaAfiliados[i].custom_param + "="
								+ idDecorador;
						break;
					}
				}
			} else
			// si es de tipo clickdoubler
			if (tipo_afiliacion == 2) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto
								+ listaAfiliados[i].custom_param + "("
								+ idDecorador + ")";
						break;
					}
				}

			}
		}

	}
	return urlProducto;

}
var arrayItems="";
function setFormularioPaso4() {   
	var lista='';
	  
	lista+='<h2 class="col-xs-12" style="margin-top: 2%; margin-bottom: 2%"> <span  class="texto_letra_Arial_paso1 letra-ms">IMAGENES Y 1 PDF CON PLANOS</span></h2>';
	lista+='<div class="col-xs-12 col-sm-10 col-sm-offset-1">';
	lista+='<form action="FileUploadHandler" id="mydropzonePropuesta1" class="dropzone estilo_bordes_completos letrainputformularios" method="post" enctype="multipart/form-data">';
	lista+='	<div class="letrainputformularios" id="dropzonePreview"></div>';
	lista+='</form>';
	lista+='</div>';
	lista+='<h2 class="titulo_pantalla col-xs-12" style="margin-top: 5%;">LISTA DE LA COMPRA</h2>';
	lista+='<h2 class="col-xs-12" style="margin-top: 4%; margin-bottom: 2%"> <span  class="texto_letra_Arial_paso1 letra-ms">2D</span></h2>';
	lista+='<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" id="anchoCanvas" style="background-color:white;padding:0">'; 
	lista+='</div>';
	lista+='<div class="botonesloginreglost btn btn-primary col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 edit3" onclick="rellenarCanvas(3)" style="margin-bottom:8%;text-align:center;">EDITAR LISTA DE LA COMPRA</div> ';
	lista+='<br/><br/>';
	lista+='<h3 class="col-xs-12" style="margin-top: 2%; margin-bottom: 2%"> <span  class="texto_letra_Arial_paso1 letra-ms">PRODUCTOS</span></h3>';
	lista+='<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8  col-lg-offset-2 listaDeItems" style="margin-bottom:5%">';
	
	lista+='</div>';  
	lista+='<h2 class="col-xs-12" style="margin-top: 2%; margin-bottom: 6%"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems()"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>'; 
	
	$('#listadelacompra').html(lista); 
	
	if(projectObject.estado>80){
		$('.botonFinalizado').html("Plano y Lista enviados");
		$('.botonFinalizado').css("max-width", "380px");
		$(".botonFinalizado").attr('onclick', '');
	}
	if(projectObject.estado>91){
		$('.botonFinalizado').html("Proyecto finalizado");
		$('.edit3').css("display", "none");
		$(".botonFinalizado").attr('onclick', '');
	}
	if(projectObject.ldlcs.length==0){
		
	} else if(projectObject.ldlcs.length==1){
			if(projectObject.ldlcs[0].Estado==4 || projectObject.ldlcs[0].Estado==5) {
				$('#imagen1').css("display", "none");
				var id_ldlc = projectObject.ldlcs[0].ListaCompra_id;
				var b;
				try { 
					
			  		

			  		$.ajax({
			  			// /type:"POST",
			  			dataType : "json",
			  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

			  			data : {
			  				token : "token",
			  				action : "getLdlc",
			  				id_ldlc : id_ldlc
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data; 
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else {
			  					$(document.body).css({'cursor' : 'default'});
			  					 var lc=data;

			  						var arrayDeObjcts=JSON.parse(lc.Canvas); 
			  						arrayItems=arrayDeObjcts.objects;
			  						var imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
									
									
									// CAMBIAR
				  					
									arrayItems=arrayItems.reduce(function(result, current) {
								        result[current.id] = result[current.id] || [];
								        result[current.id].push(current);
								        return result;
								    }, {});
									
									 
									listaDeItems="";
									var j=0;
									console.log(listaAfiliados);
									$.each(arrayItems, function(i, item) {
										style=""; 
										j++;
										 urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
											var img = new Image(); 
											img.src = item[0].src; 
											if(img.width>img.height){
												style="height:100%;width:auto;";
											} else { 
												style="width:100%;height:auto;";
											} 
											if(item[0].imagenOriginal!=undefined) {imgSRC=item[0].imagenOriginal} else {imgSRC=item[0].src}
											if(item[0].price>0){
												listaDeItems+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros"><div class="imagenItems"><img style="'+style+'" src="'+imgSRC+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+urlProducto+'">VER +</a></div></div>';
											} 
										
										
									}) 
								    $('.listaDeItems').html(listaDeItems);
									
								
			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} 
	} 
  	cargarDropzonePlanos(false); 
}
function resumenItems(){
	
 
	
	
	$('#resumenItems').modal('show');
	var cadena="";
	cadena+='<div class="col-xs-12" style="padding-left:0">';
	cadena+='<div class="col-xs-6 col-sm-8" style="padding-top: 15px;text-align:left;padding-left:5%">'; 
	cadena+='	<p class="letra-xs">PRODUCTOS</p>'; 
	cadena+='</div>'; 
	cadena+='<div class="col-xs-6 col-sm-4">'; 
	cadena+='	<p class="letra-xs cantidadPrecio" style="padding-top: 15px;text-align:center">CANTIDAD Y PRECIO</p>';  
	cadena+='</div>';
	cadena+='<hr width="100%"/>';
	var totalFinal=0;
	var j=0;
	$.each(arrayItems, function(i, item) {
		if(item[0].price==undefined){}else{
		style=""; 
		j++;
		 	
		var img = new Image();
		img.src = item[0].src; 
		if(img.width>img.height){
			style="height:100%;width:auto;";
		} else {
			style="width:100%;height:auto;";
		}
		tiendaEnlace=item[0].url;
		array = ['http://', 'https://', 'http://www.', 'https://www.', 'www.'];
		array2 = ['.com', '.net', '.info', '.es', '.org', '.biz'];
		protocolos = new RegExp( array.join( '|' ), 'g' );
		terminaciones = new RegExp( array2.join( '|' ), 'g' );
	    url = tiendaEnlace.replace(protocolos, '');
	    url = url.replace(terminaciones, 'FIN'); 
	    url = url.split('FIN');
	    total2=0;
	    total=0;
	    b=0;
		for(var k=0;k<item.length;k++){
			total2=item[k].price;
			if(total2!=0){
				b++;
			} 
		}
		total=item[0].price*b;
		total=total.toFixed(2);
		totalFinal=parseFloat(totalFinal)+parseFloat(total);
		totalFinal=	totalFinal.toFixed(2);
		
		if(total>0){
			cadena+='<div class="col-xs-12 col-sm-8" style="margin-bottom:2%">';
			cadena+='	<div class="col-xs-4 col-sm-4 imagenPopUp">';
			cadena+='		<img style="width:95%;margin:2%;margin-left:0;margin-right:5%" src="'+item[0].src+'" alt="item'+item.length+'"/> '; 
			cadena+='	</div>'; 
			cadena+='	<div class="col-xs-8 col-sm-8">'; 
			cadena+='		<input  style="width:100%;margin-left:0;" readonly class="input-p letra-xs puntos" type="text" name="fname2" value="'+item[0].title+'"/>'; 
			cadena+='		<input  style="width:100%;margin-left:0;" readonly class="input-p letra-xs puntos" type="text" name="fname2" value="'+url[0]+'"/>'; 
			cadena+='		<input  style="width:100%;margin-left:0;" readonly class="input-p letra-xs puntos" type="text" name="fname2" value="'+item[0].price+'€"/>'; 
			cadena+='	</div>'; 
			cadena+='</div>';
			cadena+='<div class="col-xs-3 col-xs-offset-0 col-sm-offset-0 col-sm-2">'; 
			cadena+='		<input  style="width:100%;margin-bottom:6%" readonly class="input-p  letra-xs text-center desplazar" type="text" name="fname2" value="'+item.length+'"/>'; 
			cadena+='</div>';
			cadena+='<div class="col-xs-8 col-sm-2">'; 
			cadena+='		<div class="col-xs-11 col-xs-offset-1 col-sm-offset-0 col-sm-12" style="padding:0"><input  style="width:100%;" readonly class="input-p  letra-xs text-center desplazar2" type="text" name="fname2" value="'+total+'€"/></div>';  
			cadena+='</div>';
		}
		}
	})  
	cadena+='<hr width="100%" style="margin-bottom: 0;"/>';
	cadena+='<div class="col-xs-6 col-sm-10" style="text-align:left;padding-left:5%">'; 
	cadena+='	<p class="letra-xs">TOTAL</p>'; 
	cadena+='</div>'; 
	cadena+='<div class="col-xs-6 col-sm-2">'; 
	cadena+='	<p class="letra-xs" style="text-align:center">'+totalFinal+'€</p>'; 
	cadena+='</div>';
	cadena+='</div>';
	
	$('#itemsLista').html(cadena);
}
function removeFileToPropuestas(order, filename){
	for(var i=0;i<projectObject.propuestas[order].imagenes.length;i++){
		
		  if(projectObject.propuestas[order].imagenes[i] === filename) {
			  projectObject.propuestas[order].imagenes.splice(i, 1);
		   }
	
	}
}


function addFileToPropuestas(order, filename){
	projectObject.propuestas[order].imagenes.push(filename);
}


function addPdfToPropuestas(order, filename){
	projectObject.propuestas[order].pdf=filename;
}

function removePdfToPropuestas(order, filename){
	 if(projectObject.propuestas[order].pdf === filename) {
		 projectObject.propuestas[order].pdf='';
	 }
}




function deleteFile(seccionvar, fichero) {
	var user = projectObject.user_sin.mail
	var proyecto = projectObject.nombreProyecto;
	var seccion = seccionvar;
	var fichero = fichero;

	//alert("user:"+user+" proyecto"+proyecto+" seccion:"+ seccion +"fichero: "+fichero);
	//var id_moodboard = proyectoObject.preferencia.id_moodboard;

	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/RemoveFile',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				user : user,
				proyecto : proyecto,
				seccion : seccion,
				fichero : fichero
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				//alert("eliminado");
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}

}
function enviarPaso3_2D(){
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var proyecto = localStorage.getItem('projectobject');
	proyect=JSON.parse(proyecto); 
	 
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "enviarPaso3_2D",
  				id_decorador : decorador.id,
  				pass : decorador.pass,
  				id_proyecto: proyecto_id,
  				mailUser : proyect.user_sin.mail
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
  					cambiarEstado("32D");
  					
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
function enviarPaso3_3D(){
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var proyecto = localStorage.getItem('projectobject');
	proyect=JSON.parse(proyecto);
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "enviarPaso3_3D",
  				id_decorador : decorador.id,
  				pass : decorador.pass,
  				id_proyecto: proyecto_id,
  				mailUser : proyect.user_sin.mail
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
  				  
						cambiarEstado("33D");
  					
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
function aceptar(tipo){  
	$('#cargando').modal('show');
	$(document.body).css({ 'cursor': 'wait' });
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "aceptar_cita",
  				id_decorador : decorador.id,
  				pass : decorador.pass,
  				id_proyecto: proyecto_id,
  				aceptada: tipo
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
  					if(tipo==1){  
  						cambiarEstado(1);
  					} else {  
  						cambioEstadoChat("CitaCancelada");
  						$(document.body).css({ 'cursor': 'default' });
  						BootstrapDialog.show({
				            title: '',
				            message: 'Cita cancelada. Utiliza el chat de arriba para hablar con el cliente y acordar otra cita.',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){ 
					                cerrarCargando();
				                    dialogRef.close();
				                }
				            }]
				        }); 
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
 

function cambiarEstado(tipo){
	var id_proyecto = projectObject.id; 
	if(tipo==1 && projectObject.estado==30){
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
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' }); 
						cerrarCargando();
	  					BootstrapDialog.alert(data);
	  				} else {   
	  					cambioEstadoChat("CitaAceptada");
						$(document.body).css({ 'cursor': 'default' }); 
	  					BootstrapDialog
						.confirm({
							title : '',
							message : 'Cita aceptada. Después de hablar con el cliente deberás diseñar las propuestas.',
							type : BootstrapDialog.TYPE_PRIMARY, // <--
																	// Default
																	// value
																	// is
																	// BootstrapDialog.TYPE_PRIMARY
							closable : true, // <-- Default value
												// is false
							draggable : true, // <-- Default value
												// is false
							btnCancelLabel : 'Ir a lista de proyectos', // <--
															// Default
															// value
															// is
															// 'Cancel',
							btnOKLabel : 'Seguir en este paso!', 
							callback : function(result) {
								// result will be true if button was
								// click, while it will be false if
								// users close the dialog directly.
								if (result) {   
						                cerrarCargando();
										$('.estado').attr('placeholder',data.texto_decoradores);
										$(".propuestas").attr("href", "javascript:irPaso3()");
										$(".colorPropuestas").css("color", "black");
										/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
								} else {
									var href = urlbase + '/home.html';
									window.location = href;
								}
							}
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
	 
	if(tipo=="32D" && projectObject.estado==40){
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
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {
	  					cambioEstadoChat("EnviarPropuestas");
	  					$(document.body).css({ 'cursor': 'default' }); 
	  					BootstrapDialog
						.confirm({
							title : '',
							message : 'Propuesta 2D enviadas. El cliente debe aceptar una de las propuestas para poder continuar.',
							type : BootstrapDialog.TYPE_PRIMARY, // <--
																	// Default
																	// value
																	// is
																	// BootstrapDialog.TYPE_PRIMARY
							closable : true, // <-- Default value
												// is false
							draggable : true, // <-- Default value
												// is false
							btnCancelLabel : 'Ir a lista de proyectos', // <--
															// Default
															// value
															// is
															// 'Cancel',
							btnOKLabel : 'Seguir en este paso!', 
							callback : function(result) {
								// result will be true if button was
								// click, while it will be false if
								// users close the dialog directly.
								if (result) {
										cerrarCargando();
							        
										$('.estado').attr('placeholder',data.texto_decoradores);
										$('.BP2D').html("PROPUESTAS 2D ENVIADAS"); 
										$(".BP2D").attr('onclick', '');
										$('.BP2D').css("max-width", "330px");
										/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
								} else {

									var href = urlbase + '/home.html';
									window.location = href;
								}
							}
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
	
	if(tipo=="33D" && projectObject.estado==60){
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
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {
	  					
	  					cambioEstadoChat("Enviar3d");
	  					$(document.body).css({ 'cursor': 'default' }); 
	  					BootstrapDialog
						.confirm({
							title : '',
							message : 'Propuesta 3D enviadas. El cliente debe aceptar estas propuestas para continuar al siguiente paso.',
							type : BootstrapDialog.TYPE_PRIMARY, // <--
																	// Default
																	// value
																	// is
																	// BootstrapDialog.TYPE_PRIMARY
							closable : true, // <-- Default value
												// is false
							draggable : true, // <-- Default value
												// is false
							btnCancelLabel : 'Ir a lista de proyectos', // <--
															// Default
															// value
															// is
															// 'Cancel',
							btnOKLabel : 'Seguir en este paso!', 
							callback : function(result) {
								// result will be true if button was
								// click, while it will be false if
								// users close the dialog directly.
								if (result) {  
										cerrarCargando();
										$('.estado').attr('placeholder',data.texto_decoradores);
										$('.BP3D').html("PROPUESTAS 3D ENVIADAS");
										$(".BP3D").attr('onclick', '');
										$('.BP3D').css("max-width", "330px");
										/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
								} else {

									var href = urlbase + '/home.html';
									window.location = href;
								}
							}
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
	
	if(tipo=="paso4" && projectObject.estado==80){
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
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {
	  					cambioEstadoChat("Planos");
	  					$(document.body).css({ 'cursor': 'default' }); 
	  					BootstrapDialog
						.confirm({
							title : '',
							message : 'Planos y Lista de la compra enviadas. El cliente debe aceptar para finalizar el proyecto.',
							type : BootstrapDialog.TYPE_PRIMARY, // <--
																	// Default
																	// value
																	// is
																	// BootstrapDialog.TYPE_PRIMARY
							closable : true, // <-- Default value
												// is false
							draggable : true, // <-- Default value
												// is false
							btnCancelLabel : 'Ir a lista de proyectos', // <--
															// Default
															// value
															// is
															// 'Cancel',
							btnOKLabel : 'Seguir en este paso!', 
							callback : function(result) {
								// result will be true if button was
								// click, while it will be false if
								// users close the dialog directly.
								if (result) {  
										cerrarCargando();
										$('.estado').attr('placeholder',data.texto_decoradores); 
										$('.botonFinalizado').html("Plano y Lista enviados");
										$('.botonFinalizado').css("max-width", "380px");
										$(".botonFinalizado").attr('onclick', '');
										/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
								} else {

									var href = urlbase + '/home.html';
									window.location = href;
								}
							}
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
}
function enviarPaso4(){ 
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var proyecto = localStorage.getItem('projectobject');
	proyect=JSON.parse(proyecto);
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "enviarPaso4",
  				id_decorador : decorador.id,
  				pass : decorador.pass,
  				id_proyecto: proyecto_id,
  				mailUser : proyect.user_sin.mail
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
  				 
  					cambiarEstado("paso4");
  					
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