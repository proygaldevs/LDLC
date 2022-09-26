var decorador;  
var proyect_id;
var trabajoJ;

function getNotificaciones(id_usuario, fromto) { 
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
				$(".notificacionChat").html(0);
				//$(".notificacion").css("display", "none");
				for (var i = 0; i < data.length; i++) {
					var id=data[i].id_proyecto;
						$("#notificacion"+id).html(data[i].numeroDeMensajes);
						$("#notificacion"+id).css("display", "block");
						var linea=$("#proyect"+id).html();
						$("#proyect"+id).parent().prepend('<div class="col-md-5 letra-m informacion letra-negrita" style="text-align:center;margin-top:2%;">PROYECTO</div><div class="col-md-7 letra-m informacion letra-negrita"  style="text-align:center;margin-top:2%">ESTADO Y PRÓXIMA ENTREGA</div><div id="proyect'+id+'" style="border:1px solid black;" class="col-xs-12 caja">'+linea+'</div>');
						$("#proyect"+id).nextAll("#proyect"+id).remove();
						$(".informacion"+id).remove();
				}
				
				$("input").change(function(){
			    	try{
			    		valor=$(this).val(); 
			    		id=$(this).attr("id");
			    		id=id.split("-")[1];
			    		addNombre(valor, id); 
					} catch (e) {
				  	}
			    });
				
				  
				function PulsarTecla(event){
				    tecla = event.keyCode;
				    if(tecla==13){
				    	$("input").blur();
				    }
				}

				window.onkeydown=PulsarTecla;
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

function construirListado(){ 
	var html="";
	
	var proyectos_ajax=decorador.proyectos;
	var proyectoFinal = []; 
	for (var i = proyectos_ajax.length-1; i>=0 ; i--) {   
		if ((proyectos_ajax[i].preferencias.length == 0) || (proyectos_ajax[i].preferencias === '') || (proyectos_ajax[i].preferencias === null)) {	 
			 
		} else {
			if(proyectos_ajax[i].estado==200){
				proyectoFinal.push(proyectos_ajax[i]);
			} else {
				proyectoFinal.unshift(proyectos_ajax[i]);
			}
		}
	}
	decorador.proyectos=proyectoFinal; 
	if(decorador.proyectos.length==0){
		html+='<p style=" padding: 0px; margin-top: 2%;"   class="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-sm-offset-4 col-md-offset-6 letra-s"';
		html+='id="" > PRÓXIMAMENTE TUS PROYECTOS</p> ';
		html+='	<div class="col-md-4 col-sm-4 col-xs-8 col-xs-offset-2 col-sm-offset-4 col-md-offset-6 letra-s ">';
		html+='		<hr class="v"/>';
		html+='	</div>';
		html+='</div>';
		
		html+='<div class="col-xs-12 col-xs-offset-0 parte1" style="margin-bottom:7%">';
		html+=' <img src="img/paginaEspera/informacion.jpg" onclick="dudasfunction();" style="width:100%" alt="Listado de proyectos"/>';
		html+='</div>';
		
		html+='<div class="col-xs-10 col-xs-offset-1 partes">';
		html+=' <img src="img/paginaEspera/informacion-parte2.jpg" style="width:100%" alt="Listado de proyectos"/>';
		html+='</div>';
		html+='<div class="col-xs-10 col-xs-offset-1 partes1" style="margin-bottom:10%;">';
		html+=' <img src="img/paginaEspera/informacion-parte1.jpg" onclick="dudasfunction();" style="width:100%" alt="Listado de proyectos"/>';
		html+='</div>';
			
	} else { 
		for(var i=0;i<decorador.proyectos.length;i++){
		var proyectoEnCuestion= decorador.proyectos[i];
		
		if(proyectoEnCuestion.pagado==0){}
		else { 
		
		html+='<div class=" informacion'+proyectoEnCuestion.id+'"><div class="col-md-5 letra-m informacion letra-negrita" style="text-align:center;margin-top:2%;">PROYECTO</div><div class="col-md-7 letra-m informacion letra-negrita"  style="text-align:center;margin-top:2%">ESTADO Y PRÓXIMA ENTREGA</div></div>';
		
		html+='<div id="proyect'+proyectoEnCuestion.id+'" style="border:1px solid black;" class="col-xs-12 caja">';
		html+='';
		html+='<div class="col-sm-5 col-md-2 mb">'; 
		html += '<div id="myCarousel2'+i+'" class=" conefectossuaves container-fluid carousel slide" data-ride="carousel">';
		html+='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="font-family: basic_title_font; text-transform: uppercase;width:100%;margin-left:0%;">';
			var tipoHabi="";
			var k="";
			for(var l = 0; l < proyectoEnCuestion.preferencias.length; l++) {
				if(proyectoEnCuestion.preferencias[l].id_moodboard!=""  || proyectoEnCuestion.preferencias[l].id_moodboard!=0) {
					k="existe"; 
				}
			}	
			var f="";
			var bandera=true;
			items=0;
			for(var j = 0; j < proyectoEnCuestion.preferencias.length; j++) {
					var id_moodboard = proyectoEnCuestion.preferencias[j].id_moodboard;  
					 
					if (k=="existe"){ 
						  
						// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
						if (id_moodboard=="" || id_moodboard==0) { 
							tipoHabi="noColocar";
						} else { tipoHabi="colocar"; f++;}
						
					} else {
						// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
						if (id_moodboard=="" || id_moodboard==0) { 
							tipoHabi = proyectoEnCuestion.preferencias[j].habitacion; 
							if(tipoHabi=="dormitorio-infantil") {
								tipoHabi="infantil";
							}
							if(tipoHabi=="escritorio") {
								tipoHabi="despacho";
							}
							if(tipoHabi=="recibidor") {
								tipoHabi="entrada";
							}
						}  else { }
					} 
				
				if (j==0 || f==1){
					// EL PRIMER ITEM (ACTIVO)
					if (tipoHabi!="noColocar"){
						if (id_moodboard=="" || id_moodboard==0) {
							items++;
							html += '<div class="conefectossuaves text-center item active" style="text-align:center"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="display:inline;border:1px solid grey;" alt="'+tipoHabi+'"/></a></div>';
						} else {
							items++;
							html += '<div class="conefectossuaves text-center item active" style="text-align:center"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;" alt="Moodboard"/></a></div>';
						}
					} else { }
				}
				else {
					// SIGUIENTES ITEMS
					if (tipoHabi!="noColocar"){
						if (id_moodboard=="" || id_moodboard==0) {
							items++;
							html += '<div class="conefectossuaves text-center item" style="text-align:center"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="display:inline;border:1px solid grey;" alt="'+tipoHabi+'"/></a></div>';
						} else {
							items++;
							html += '<div class="conefectossuaves text-center item" style="text-align:center"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;" alt="Moodboard"/></a></div>';
						}
					} else { } 	 
				}
			}
			html += '</div>';
			if(items>1){
			html += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 4px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2'+i+'" data-slide="prev">';
			html += '<span class=" conefectossuaves glyphicon glyphicon-chevron-left" style="font-size:20px"></span>';
			html += '</a>';
			html += '<a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 4px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2'+i+'" data-slide="next">';
			html += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-right" style="font-size:20px"></span>';
			html += '</a>';
			}  
			html += '</div>';
			 
		html+='</div>'; 
		html+='<div class="col-sm-7 col-md-3 lineaProyecto">';
		html+='<input class="col-xs-12 col-sm-12 col-md-10 input-p4 letra-mayusculas letra-s nombre" id="p-'+proyectoEnCuestion.id+'" value="'
			+ proyectoEnCuestion.tituloProyecto   +'">';
		html+='<input class="col-xs-12 col-sm-12 col-md-10 input-p4 letra-mayusculas letra-s" style="letter-spacing: 1pt!important" value="'
			+ proyectoEnCuestion.user_sin.username   +'" title="'
			+ proyectoEnCuestion.user_sin.mail   +'" readonly><div id="notificacion'+proyectoEnCuestion.id+'" class="notificacionChat letra-s" title="Mensajes pendientes"></div>';
		html+='<input class="col-xs-12 col-sm-12 col-md-10 input-p3 letra-mayusculas letra-s tipoProyecto" value="';
		 
		html+= proyectoEnCuestion.projectsTypes.nombreProyecto+' - '+proyectoEnCuestion.projectsTypes.precio+'€" readonly>';
		html+='<div class="col-xs-12 col-sm-12 buttonstandard_invertido letra-xs infoP" style=" padding-left:0;padding-right:0" onclick="lanzarInfo(';
		html+=decorador.proyectos[i].id;
		html+=')"> INFORMACIÓN</div> ';
		html+='</div>';
			
			
		html+='<div class="col-xs-12 col-sm-7 col-md-7 estado2">'; 	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-1 col-md-offset-1 letra-xxxlp"><img src="img/home/info-256.png" class="imagen" alt="Estado"></div>';	
		if(proyectoEnCuestion.estado==100 && proyectoEnCuestion.finalizado!=1){
			html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1 input-p2 letra-mayusculas letra-s espacio"  value="PARA FINALIZAR SUBE LA FACTURA" title="PARA FINALIZAR SUBE LA FACTURA" readonly>';
			html+='</div>';
		}else {
			html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1 input-p2 letra-mayusculas letra-s espacio letra-interespaciado-p"  value="'
				+ proyectoEnCuestion.projectsStates.texto_decoradores   +'" title="'
				+ proyectoEnCuestion.projectsStates.texto_decoradores   +'" readonly>';
			html+='</div>';
		}
		
		
		
		var Fecha = new Date(proyectoEnCuestion.fechaestado); 
		var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		var FechaEstado = "HASTA EL "+Fecha.toLocaleDateString("es-ES", options);
		if(proyectoEnCuestion.projectsStates.turnoDe=="usuario"){
			FechaEstado = "SIN PLAZO";
		} 
		html+='<div class="col-xs-12 col-sm-7 col-md-7 estado3">';  	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-1 col-md-offset-1 letra-xxxlp"><img src="img/home/3.png" class="imagen" alt="Fecha de entrega"></div>';	
		html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1 input-p2 letra-mayusculas letra-s espacio2" style="letter-spacing: 1pt!important" value="'
			+ FechaEstado   +'" title="'
			+ FechaEstado   +'" readonly>';
		html+='</div>';
		if(proyectoEnCuestion.estado==100 && proyectoEnCuestion.finalizado==0){
		html+='<div class="col-xs-12 col-sm-7 col-md-7 botones  proyecto'+proyectoEnCuestion.id+'">';
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-1 col-md-offset-1 letra-xxxlp espacioBlanco">&nbsp;</div>';
			html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1" style="padding:0"> <div class="buttonstandard_invertido letra-xs botonEnFin" style=" padding-left:0;padding-right:0" onclick="lanzarProyecto(';
			html+=decorador.proyectos[i].id;
			html+=')"> ENTRAR</div> ';
			html+='<div class="buttonstandard_invertido letra-xs botonEnFin2" style=" padding-left:0;padding-right:0" onclick="facturar('+proyectoEnCuestion.id+')';
			html+='"> FINALIZAR</div></div>';
		} else {
			html+='<div class="col-xs-12 col-sm-7 col-md-7 botones">';
			html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-1 col-md-offset-1 letra-xxxlp espacioBlanco">&nbsp;</div>';
			html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1 buttonstandard_invertido letra-xs " style=" padding-left:0;padding-right:0" onclick="lanzarProyecto(';
			html+=decorador.proyectos[i].id;
			html+=')"> ENTRAR</div> ';
		}

		html+='</div>'; 
		html+='</div>';
		
		 
		
		
		}	 
			
		}
	}
	$('#divforproyectos').html(html);
	getNotificaciones(decorador.id, 0);
	  
	
	cerrarCargando();
}

function addNombre(nombre, id){ 
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
	  				id: id,
	  				action : "nombre_espacio_decorador",
					nombre: nombre
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data); 
	  				} else {
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
var factura="";
function facturar(id){
	proyect_id = id; 
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
  				token : "cargarPromocion",
  				action : "getPagoInfo",
  				id_decorador: decorador.id,
  				id_proyecto: id
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				if (isError(data)) {
  					BootstrapDialog.alert(data); 
  				} else {
  					factura=data;
  					if(data.proyecto.etiquetas.length>0){
  						$('.etiquetasLdlc').css('display','none');
  					} else {
  						$('.imagenLdlc').html('<img style="max-width:300px;width:100%" src="'+urlbuckets3+'ldlc/imagenes/'+data.proyecto.ldlcs[0].imagen+'">');
  						var html="";
  						if(data.proyecto.ldlcs[0].Habitacion==undefined){
  	  						html+='<div class="habitacion">';
  							html+='<select name="habitacion">';
  							html+='  <option value="questionmark" selected="selected">Tipo de estancia</option> ';
  							html+='  <option value="dormitorio">Dormitorio</option>';
  							html+='	  <option value="despacho">Despacho</option>';
  							html+='<option value="vestidor">Vestidor</option>';
  							html+=' <option value="salon">Salon</option>';
  						    html+='<option value="comedor">Comedor</option>';
  						    html+=' <option value="dormitorio-infantil">Dormitorio infantil</option>';
  							html+='<option value="entrada">Entrada</option>';
  							html+='<option value="despacho">Otros</option>';
  							html+='</select>';
  						    html+='</div>';
  	  						$('.habitacion').css('display', 'block');
  	  					}else { 
  	  						$('.habitacion').css('display', 'none');
  	  					}
  						
  						html+='<div class="etiq"><ul>';
						html+='<li><input type="checkbox" class="checkbox" id="cb1"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb1"';
						html+='	style="float: left">&nbsp;Nórdico</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb2"';
						html+='value="1" style="float: left" /><label class="letraEt" for="cb2"';
						html+='style="float: left">&nbsp;Industrial</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb3"';
						html+='value="1" style="float: left" /><label class="letraEt" for="cb3"';
						html+='style="float: left">&nbsp;Vintage</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb4"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb4"';
						html+='	style="float: left">&nbsp;Moderno</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb5"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb5"';
						html+='	style="float: left">&nbsp;Minimalista</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb7"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb7"';
						html+='	style="float: left">&nbsp;Ecléctico</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb8"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb8"';
						html+='	style="float: left">&nbsp;Retro</label></li>';
						html+='<li><input type="checkbox" class="checkbox" id="cb9"';
						html+='	value="1" style="float: left" /><label class="letraEt" for="cb9"';
						html+='	style="float: left">&nbsp;Rústico</label></li>';
						html+='<li class="especial"><input type="checkbox" class="checkbox"';
						html+='	id="cb6" value="1" style="float: left" /><label class="letraEt"';
						html+='	for="cb6" style="float: left">&nbsp;Contemporáneo</label></li>';
						html+='</ul></div>';
  						$('.estilosLdlc').html(html);
  						$('.etiquetasLdlc').css('display','block');
  						if(data.proyecto.ldlcs[0].Habitacion==undefined){ 
  	  						$('.habitacion').css('display', 'block');
  	  					}else {
  	  						$('.habitacion').css('display', 'none');
  	  					}
  					}  
  					var baseImponible=data.proyecto.projectsTypes.baseImponible;
  					var tantoPorCien=data.proyecto.projectsTypes.fee;
  					var precioProyecto=data.proyecto.projectsTypes.precio; 
  					if(data.promocion==null || data.promocion==undefined || data.promocion.descripcion=="" || data.promocion.descripcion==undefined || data.promocion.descripcion==null || data.promocion.numero_proyectos==0 || data.promocion.numero_proyectos==undefined || data.promocion.numero_proyectos==null) {
  						base=baseImponible*tantoPorCien/100;
  						baseImponible=baseImponible-base;
  						$("#promocion").html('El proyecto es de '+precioProyecto+'€, con una comisión del '+tantoPorCien+'%.<br/><br/> En la factura debe figurar una base imponible de '+baseImponible.toFixed(2)+'€.');
   					} else {
   	  					var promocionado=data.promocion.tanto_por_ciento_promocionado;
   						baseImponible=baseImponible*promocionado/100; 
   						$("#promocion").html('Quedan '+data.promocion.numero_proyectos+' proyectos donde se aplicará la siguiente oferta: '+data.promocion.descripcion+' (Obtienes el '+promocionado+'% del valor del proyecto). <br/><br/> En la factura debe figurar una base imponible de '+baseImponible.toFixed(2)+'€');
   					}
  					$('#facturacion').modal('show');
  					$("#enviarFactura").attr("onclick","saveFactura("+id+")"); 
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here

  	}
}
function lanzarPopUpImagenes(proyecto,pos){
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
	var proyectoEnCuestion=decorador.proyectos[proyecto]; 

		var altoNavegador = $(window).height();
		var anchoNavegador = $(window).width();
		alto=altoNavegador-150+"px";
		var tipoHabi2="";
		var k="";
		for(var l = 0; l < proyectoEnCuestion.preferencias.length; l++) {
			if(proyectoEnCuestion.preferencias[l].id_moodboard!=""  || proyectoEnCuestion.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}
		var f="";
		var bandera=true;
		items=0;
		for(var j = 0; j < proyectoEnCuestion.preferencias.length; j++) {
				var id_moodboard = proyectoEnCuestion.preferencias[j].id_moodboard;  
				 
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi2="noColocar";
					} else { tipoHabi2="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoEnCuestion.preferencias[j].habitacion; 
						if(tipoHabi2=="dormitorio-infantil") {
							tipoHabi2="infantil";
						}
						if(tipoHabi2=="escritorio") {
							tipoHabi2="despacho";
						}
						if(tipoHabi2=="recibidor") {
							tipoHabi2="entrada";
						}
					}  else { }
				} 
			if (j==0 || f==1){
				// EL PRIMER ITEM (ACTIVO)
				if (tipoHabi2!="noColocar"){
					if (id_moodboard=="" || id_moodboard==0) {
						items++;
						htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;height:'+alto+'" alt="'+tipoHabi2+'"/></div>';
					} else {
						items++;
						htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto+'" alt="Moodboard"/></div>';
					}
				} else { }
			}
			else {
				// SIGUIENTES ITEMS
				if (tipoHabi2!="noColocar"){
					if (id_moodboard=="" || id_moodboard==0) {
						items++;
						htmlText += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;height:'+alto+'" alt="'+tipoHabi2+'"/></div>';
					} else {
						items++;
						htmlText += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto+'" alt="Moodboard"/></div>';
					}
				} else { } 	 
			}
			if(items>1){
				htmlText +='</div>';
				htmlText +='<a class=" conefectossuaves carousel-control left" style="width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href="#myCarousel2" data-slide="prev">';
				htmlText += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
				htmlText +=' </a>';
				htmlText +=' <a class=" conefectossuaves carousel-control right" style="width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px"   href="#myCarousel2" data-slide="next">';
				htmlText +='      <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
				htmlText +='  </a>';
			}
		}
    if(k=="existe"){
		$('#myCarousel2').html(htmlText);
		$('#modalforperfiles').modal('show');
		if(anchoNavegador>altoNavegador){
			$('#carouselinnerForImages3').css("height",alto); 
			$('#carouselinnerForImages3').css("width","auto"); 
		} else { 
			$('#carouselinnerForImages3 .conefectossuaves img').css("height","auto"); 
			$('#carouselinnerForImages3').css("height","auto"); 
			$('#carouselinnerForImages3').css("width","95%"); 
		} 
    }

}

function otracosafunction(){
   window.location.href= urlbase + "/perfil.html";
}

function diasToMili(dias){
	var mili=1000*60*60*24*dias;
	return mili;
}

function miliToDias(mili){
	var dias=mili/(1000*60*60*24);
	return dias;
}

function saveFactura(id){ 
	//VER
	var galeriaLdlc=false;
	var galeriaLdlc2=false;
	var arrayDeEtiquetas=[];
	if(factura.proyecto.etiquetas.length>0){ 
		 arrayDeEtiquetas.push(1);
		 galeriaLdlc=true;
		 galeriaLdlc2=true;
	} else {
		 if(document.getElementById('cb1').checked){
			 arrayDeEtiquetas.push(1);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb2').checked){
			 arrayDeEtiquetas.push(2);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb3').checked){
			 arrayDeEtiquetas.push(3);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb4').checked){
			 arrayDeEtiquetas.push(4);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb5').checked){
			 arrayDeEtiquetas.push(5);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb6').checked){
			 arrayDeEtiquetas.push(6);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb7').checked){
			 arrayDeEtiquetas.push(7);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb8').checked){
			 arrayDeEtiquetas.push(8);
			 galeriaLdlc=true;
		 }
		 if(document.getElementById('cb9').checked){
			 arrayDeEtiquetas.push(9);
			 galeriaLdlc=true;
		 } 
	} 
	if(factura.proyecto.ldlcs[0].Habitacion==undefined){ 
		var habitacion=$('select[name=habitacion]').val();
	}else {
		var habitacion=factura.proyecto.ldlcs[0].Habitacion;
	} 
	if(habitacion==null || habitacion=="null"){
		habitacion=="questionmark";
	}
	
	if(galeriaLdlc) {
		ldlcId=factura.proyecto.ldlcs[0].ListaCompra_id; 
		if(galeriaLdlc2) {
			var etiquetasJSON=  null; 
		} else {
			var etiquetasJSON=  JSON.stringify(arrayDeEtiquetas); 
		}
	} else {
		ldlcId=0; 
		etiquetasJSON=  null; 
	} 
	if(factura.proyecto.ldlcs[0].nombreLdlc==undefined){
		nombreLdlc=$('#input_titulo').val();
	} else {
		nombreLdlc="false";
	} 
	var userAssistant = getCookie("userAssistantD");
	trabajoJ= new Object();
	trabajoJ.id=null;
	trabajoJ.imgPrincipal=null;
	trabajoJ.titulo=$('#input_titulo').val();
	trabajoJ.texto=$('#input_texto').val();
	trabajoJ.activo=1;  
	trabajoJ.fechaingreso=null;
	trabajoJ.imagenesTrabajos=null;
	trabajoJ.id_decorador=decorador.id;
	valor=$('.dz-filename').html();
	
	var tokens=$('#tokenfield-typeahead').tokenfield('getTokens');  
	var etiq=0;
	trabajoJ.etiquetas=[];
	for(var i=0;i<tokens.length;i++){
		var encontrado=false;
		for(var j=0;j<etiquetasparafiltrar.length;j++){
			if(tokens[i].value.toUpperCase() == etiquetasparafiltrar[j].nombre.toUpperCase()){
				trabajoJ.etiquetas.push(etiquetasparafiltrar[j]);
				encontrado=true;
				etiq++;
				break;
			}
			
		}
		if(encontrado==false) {
			var o= new Object();
			o.grupo=null;
			o.nombre=tokens[i].value;
			o.id=null;
			etiq++;
			trabajoJ.etiquetas.push(o);
		}
	}
	var trabajoJsn=  JSON.stringify(trabajoJ); 

	if(cerramosONo) {
		$(document.body).css({ 'cursor': 'default' });
		$('#error').html('Por favor, espere a que termine de subir el pdf.');
		return;
	}
	
	if(trabajoJ.input_titulo=="") {
		$('#error').html("Por favor, coloca un título para este proyecto");
	} else if(etiq==0){
		$('#error').html("Por favor, coloca etiquetas que describan este proyecto");
	} else if(trabajoJ.input_texto==""){
		$('#error').html("Por favor, coloca una descripción de tu proyecto");
	} else if(valor==undefined){
		$('#error').html("Por favor, sube una factura");
	} else {
	
	
	 $('#facturacion').modal('hide');
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
	  				token : "enviarFactura",
	  				action : "decoradorSetFacturacion",
	  				id_decorador: decorador.id,
	  				id_proyecto: id,
	  				pass: decorador.pass,
	  				etiquetas: etiquetasJSON,
  					trabajo: trabajoJsn,
  					mail: userAssistant,
  					nombreLdlc: nombreLdlc,
  					ldlcId: ldlcId,
  					habitacion:habitacion
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$('#facturacion').modal('show');
	  					$('#error').html("Error al enviar los datos. Contacta con administración.");
	  				} else {
	  					BootstrapDialog.show({
				            title: '',
				            message: 'Factura enviada',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){
				                	  dialogRef.close(); 
				                	
				                }
				            }]
				        });
	  					html="";
	  					html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-1 col-md-offset-1 letra-xxxlp espacioBlanco">&nbsp;</div>';
	  					html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-1 buttonstandard_invertido letra-xs " style=" padding-left:0;padding-right:0" onclick="lanzarProyecto(';
	  					html+=id;
	  					html+=')"> ENTRAR</div>';

	  					$('.proyecto'+id).html(html); 
	  					 
	  					
	  					 
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here

	  	}
	}
}
function lanzarProyecto(id_proyecto){ 
			
	        localStorage.removeItem('projectid');
			localStorage.setItem('projectid', id_proyecto); 
	        for(var i=0;i<decorador.proyectos.length;i++){
	        	if(decorador.proyectos[i].id==id_proyecto){
	        		proyectObject=decorador.proyectos[i];
	        	}
	        } 
			if (proyectObject.projectsStates.page=="paso4.html") {
				var href = urlbase + "/paso4.html";
				window.location = href;
			}else
			if (proyectObject.projectsStates.page=="paso3.html") {
				var href = urlbase + "/paso3.html";
				window.location = href;
			}else
			if (proyectObject.projectsStates.page=="paso2.html") {
				if(proyectObject.estado<=21) {
					var href = urlbase + "/paso1.html";
					window.location = href;
				} else {
					var href = urlbase + "/paso2.html";
					window.location = href;
				}
			}else{
				var href = urlbase + "/paso1.html";
				window.location = href;
			}
			 
	
}
function lanzarInfo(id_proyecto){ 
 
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
	for(i=0;i<decorador.proyectos.length;i++) {
		if(decorador.proyectos[i].id==id_proyecto){
			var proyectoEnCuestion=decorador.proyectos[i]; 
		}
	} 
 
	var tipoHabi2="";
	var k="";
	for(var l = 0; l < proyectoEnCuestion.preferencias.length; l++) {
		if(proyectoEnCuestion.preferencias[l].minimalismo!="") {
			k="existe"; 
			tipoHabi2=l;
		}
	}
	var f="";
	var bandera=true;
	items=0;
	for(var j = 0; j < proyectoEnCuestion.preferencias.length; j++) {

			  
		if (j==tipoHabi2 && k=="existe" && proyectoEnCuestion.preferencias[j].minimalismo!=""){
			items++;
			htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center">';
			tiendas=decodeURI(proyectoEnCuestion.preferencias[j].tiendas);
			if(tiendas!=""){
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ","); 
			tiendas = tiendas.replace("\"]", ""); 
			tiendas = tiendas.replace("[\"", "");
			tiendas = tiendas.replace(/-/g, "");  
			tiendas = tiendas.replace(/['"]+/g, '')
			tiendas = tiendas.split(",");
			var estilo="";
			if(proyectoEnCuestion.preferencias[j].estilo=="inbetween"){
				estilo="Nórdico";
			} else {
				estilo=proyectoEnCuestion.preferencias[j].estilo;
			}  
			htmlText+="<div class='col-xs-12 letra-s' style='text-align:center'>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].habitacion.replace(/_/g, "&nbsp;");
			htmlText+=" title='Estancia' readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=estilo;
			htmlText+=" title='Estilo' readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].minimalismo.replace(/_/g, "&nbsp;");
			htmlText+=" title='Espacio'  readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].color.replace(/_/g, "&nbsp;");
			htmlText+=" title='Intensidad de color'  readonly><br/>";
			htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
			htmlText+=tiendas[0].toLowerCase();
			htmlText+="'></p>"; 
			if(tiendas[1]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[1].toLowerCase();
				htmlText+="'></p>";
			}
			if(tiendas[2]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[2].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[3]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[3].toLowerCase();;
				htmlText+="'></p>";
			} 
			if(tiendas[4]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[5]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[6]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[7]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[8]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[9]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			htmlText+="</div></div>"; 
				
		}
		} else if(j<proyectoEnCuestion.preferencias.length && k=="existe" && proyectoEnCuestion.preferencias[j].minimalismo!="") {
			items++;
			htmlText += '<div class="conefectossuaves text-center item" style="text-align:center">';
			tiendas=decodeURI(proyectoEnCuestion.preferencias[j].tiendas);
			if(tiendas!=""){
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"%2C\"", ",");
			tiendas = tiendas.replace("\"]", "");
			tiendas = tiendas.replace("[\"", "");
			tiendas = tiendas.replace(/-/g, ""); 
			tiendas = tiendas.split(",");
			var estilo="";
			if(proyectoEnCuestion.preferencias[j].estilo=="inbetween"){
				estilo="Nórdico";
			} else {
				estilo=proyectoEnCuestion.preferencias[j].estilo;
			}  
			htmlText+="<div class='col-xs-12 letra-s' style='text-align:center'>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].habitacion.replace(/_/g, "&nbsp;");
			htmlText+=" title='Estancia' readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=estilo;
			htmlText+=" title='Estilo' readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].minimalismo.replace(/_/g, "&nbsp;");
			htmlText+=" title='Espacio'  readonly>";
			htmlText+="<input class='col-xs-12 col-sm-12 col-sm-offset-0 col-md-8 col-md-offset-2 input-p5 letra-mayusculas letra-s' value=";
			htmlText+=proyectoEnCuestion.preferencias[j].color.replace(/_/g, "&nbsp;");
			htmlText+=" title='Intensidad de color'  readonly><br/>";
			htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
			htmlText+=tiendas[0].toLowerCase();
			htmlText+="'></p>"; 
			if(tiendas[1]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[1].toLowerCase();
				htmlText+="'></p>";
			}
			if(tiendas[2]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[2].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[3]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[3].toLowerCase();;
				htmlText+="'></p>";
			} 
			if(tiendas[4]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[5]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[6]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[7]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[8]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			if(tiendas[9]!=undefined){
				htmlText+="<p  class='col-xs-6 col-sm-4' style='margin-top:15px'><img alt='tienda' style='width:100%;border:1px solid black' src='img/shops/";
				htmlText+=tiendas[4].toLowerCase();;
				htmlText+="'></p>";
			}
			htmlText+="</div></div>"; 
		}

		}
		if(items>1){
			htmlText +='</div>';
			htmlText +='<a class=" conefectossuaves carousel-control left" style="width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href="#myCarousel3" data-slide="prev">';
			htmlText += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
			htmlText +=' </a>';
			htmlText +=' <a class=" conefectossuaves carousel-control right" style="width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px"   href="#myCarousel3" data-slide="next">';
			htmlText +='      <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
			htmlText +='  </a>';
		}

 
	} 
	htmlText+="</div>"; 
	if(k!="existe"){
		htmlText="";
		htmlText+="<div class='col-xs-12 letra-s' style='text-align:center'>";
		htmlText+="El usuario no añadió información de este proyecto.";
		htmlText+="</div>";
	}
	$('.informacionPopup').html(htmlText);
	$('#modalforInfo').modal('show'); 
}



  function regetDecorador(){
  	
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
  				token : mail,
  				action : "decoradores_login",
  				user : mail,
  				pass : pass
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				if (isError(data)) {
  					BootstrapDialog.alert(data);
  				} else {
  					BootstrapDialog.alert("login correcto");
  					
  					localStorage.setItem('decoradorobject', JSON.stringify(data));
  					alaappfunction();
  					//localStorage.lastname = "Smith";
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here

  	}
  }
  
 