var decorador;  
 
function listaFacturas(){ 
	decorador = localStorage.getItem('decoradorobject');
	decorador=JSON.parse(decorador);   
	 try {
	
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : "listaFacturas",
	  				action : "getFacturacion",
	  				mail : decorador.mail,
	  				pass : decorador.pass,
	  				id_decorador : decorador.id
	  				
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;  
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					decoradorFacturas=data; 
	  					trabajo2=data;
	  					listaFac();
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  	} 
}
function deleteFile(fichero) {
	

	if(subido){ 
		if(trabajo.factura==""){
			trabajo.factura="factura.pdf"; 
		} else {
			trabajo.factura="";  
		}
		subido=false;
	}
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
				ruta : fichero
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
var trabajo2;
var trabajo;
var proyect_id=0;
function facturaDropzone(id){ 
	//mydropzonePropuesta1.removeAllFiles(true);

	proyect_id = id;
	$('#factura').modal('show'); 
	 for (var i = 0; i < trabajo2.length; i++) {
		 if(trabajo2[i].id_proyecto==proyect_id){
			 trabajo=trabajo2[i];
			 nombreFactura=trabajo.factura;

			 

				if(nombreFactura!=null && nombreFactura!="" ){

					$('#mydropzonePropuesta1').html('');
	

						//alert("planos"+projectObject.informations[0].filesPlanos[i]);
						 
						
						var urlforimage = urlbuckets3 + "decoradores/" + decorador.mail + "/facturas/"+proyect_id+"/"
								+ nombreFactura; 
						var fileforremove;
						var file = {
							name : nombreFactura,
							size : 1000000,
							status : Dropzone.ADDED,
							accepted : true
						};
						

						mydropzonePropuesta1.emit("addedfile", file);
						//alert("la imagen que cargo de planos es: "+urlforimage);
						mydropzonePropuesta1.createThumbnailFromUrl(file, urlforimage, function() {
							mydropzonePropuesta1.emit("complete", file);
						}, "anonymous");
						mydropzonePropuesta1.emit("complete", file);
						/* mydropzonePropuesta1.createThumbnailFromUrl(file, urlforimage);
						//this.emit("thumbnail", file, "http://192.168.1.100:8444/OnlineAssistance/img/1464802792570.png");
						mydropzonePropuesta1.emit("complete", file);*/
						mydropzonePropuesta1.files.push(file); 
						 var _this = mydropzonePropuesta1;
						var removeButton = Dropzone.createElement("<button data-dz-remove " +
						              "class='del_thumbnail btn btn-default' style='-webkit-appearance: none;outline: none;border: 0;background: transparent; position: absolute;top: -12px;left: -14px; z-index: 2000;'><span class='glyphicon glyphicon-remove glyph-background'></span></button>");

						removeButton.addEventListener("click", function (e) {
						 e.preventDefault();
						 e.stopPropagation();
						 var imageId = $(this).parent().find(".dz-filename > span").text();
						 // Do a post request and pass this path and use server-side language to delete the file
						 //          $.post(server_file,{'X-CSRFToken': $cookies.csrftoken}, 'json');
						 deleteFile("decoradores/" + decorador.mail + "/facturas/"+proyect_id+"/"+ imageId);
						  
						 
						  for (var j = 0; j < mydropzonePropuesta1.files.length; j++) {
								if(mydropzonePropuesta1.files[j].name == imageId) fileforremove=mydropzonePropuesta1.files[j];
						  } 
						  mydropzonePropuesta1.removeFile(fileforremove);
						});
						//alert("inserto: "+i );
						file.previewElement.appendChild(removeButton); 
						var downloadbutton = Dropzone
						.createElement("<button data-dz-download " +
			"class='del_thumbnail btn btn-default' style='-webkit-appearance: none;outline: none;border: 0;background: transparent; position: absolute;left: -14px;    z-index: 2000; '><span class='glyphicon glyphicon-chevron-down glyph-background'></span></button>");

						downloadbutton.addEventListener("click",
						function(e) { 
							e.preventDefault();
							e.stopPropagation();
							var useron = "temp"; 
							  
							  var urlforimage = urlbuckets3 + "decoradores/" + decorador.mail + "/facturas/"+proyect_id+"/"
							  + nombreFactura; 
								var href = urlforimage;
								window.open(href, '_blank');
							
						});
				file.previewElement
						.appendChild(downloadbutton); 
				
						trabajo.factura=nombreFactura;
					} else {
						$('#mydropzonePropuesta1').html('<div class="dz-default dz-message" style="display:block!important"><span>ARRASTRA AQUÍ TU PDF O HAZ CLICK PARA SELECCIONARLO</span></div>');
	
					}
				
				
		 }
	 }  
	 subido=true;
	 
	
}
function listaFac(){ 
	var html="";
	var proyectosFinalizados=0;
	for(var j=0;j<decoradorFacturas.length;j++){
		proyectosFinalizados++;
	}
	if(decoradorFacturas.length==0 || proyectosFinalizados==0){
		html+='<div class="col-sm-6 col-md-4 letra-m letra-negrita informacion" style="text-align:center;margin-top:2%">PROYECTO</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">FACTURA</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">IMPORTE</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">ESTADO</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">FECHA DE PAGO</div>';
		html+='<div style="border:1px solid black;" class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-12 col-md-offset-0 caja">';
		html+='<div class="col-sm-8 col-md-2">'; 
		html += '<div id="myCarousel2" class=" conefectossuaves container-fluid carousel slide" data-ride="carousel">';
		html+='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="font-family: basic_title_font; text-transform: uppercase;width:100%;margin-left:0%;">';
		  
		html += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/moodboards/1502799209704.png" style="display:inline;border:1px solid grey;" alt=""/></div>';
	 
		html += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center" src="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/moodboards/1502809632088.png" style="display:inline;border:1px solid grey;" alt=""/></div>';
					 
		html += '</div>';
		html += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 4px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2" data-slide="prev">';
		html += '<span class=" conefectossuaves glyphicon glyphicon-chevron-left" style="font-size:20px"></span>';
		html += '</a>';
		html += '<a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 4px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2" data-slide="next">';
		html += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-right" style="font-size:20px"></span>';
		html += '</a>';
		html += '</div>';
		
 
		html+='</div>'; 
		html+='<div class="col-sm-4 col-md-2 lineaProyecto">';
		html+='<input class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-12 col-md-10 input-p2 letra-mayusculas letra-s estado4" value="NOMBRE" readonly>';
		html+='<input class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-12 col-md-10 input-p2 letra-mayusculas letra-s " value="ID" readonly>';
		 
		html+='</div>';
			
			
		html+='<div class="col-xs-5 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 letra-xxxlp estado3 "><img src="img/facturacion/1600.png" style="width:30%;margin-bottom:10px"></div>';
		html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" style="cursor:pointer" value="CLICK" title="CLICK" readonly>';
		html+='</div>';	
	
		html+='<div class="col-xs-5 col-xs-offset-0 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 letra-xxxlp estado3"><img src="img/facturacion/EURO.png" style="width:30%;margin-bottom:10px"/></div>';	
		html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="79€" title="79€" readonly>';
		html+='</div>';		
	
		html+='<div class="col-xs-5 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 letra-xxxlp estado3"><img src="img/facturacion/info-256.png" style="width:30%;margin-bottom:10px"/></div>';	
		html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="PENDIENTE" title="PENDIENTE" readonly>';
		html+='</div>';		
		 
			FechaEstado = "1 -01/10/16"; 
		html+='<div class="col-xs-5 col-xs-offset-0 col-sm-offset-0 col-sm-4 col-md-2 ultimo">'; 	
		html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 letra-xxxlp estado3"><img src="img/facturacion/3.png" style="width:30%;margin-bottom:10px"/></div>';	
		html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-10 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="'
			+ FechaEstado   +'" title="'
			+ FechaEstado   +'" readonly>';
		html+='</div>';
		
		 
			
		html+='	</div>';
		html+='</div>';

		$('.tusFacturas').html('TUS FACTURAS SE VERÁN ASÍ <img onclick="facturacion()" style="margin-top:-5px;width:25px;cursor:pointer" src="img/facturacion/info-256.png" alt="Donde facturar" title="Donde facturar"/>');
	} else {
		for(var i=0;i<decoradorFacturas.length;i++){
			var proyectoEnCuestion= decoradorFacturas[i];
			if(proyectoEnCuestion.id_proyecto>0){
				html+='<div class="col-sm-6 col-md-4 letra-m letra-negrita informacion" style="text-align:center;margin-top:2%">PROYECTO</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">FACTURA</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">IMPORTE</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">ESTADO</div><div class="col-md-2 letra-m letra-negrita informacion"  style="text-align:center;margin-top:2%">FECHA DE PAGO</div>';
				html+='<div style="border:1px solid black;" class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-12 col-md-offset-0 caja paddingCarrousel2">';
				html+='<div class="col-sm-8 col-md-2 paddingCarrousel">'; 
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
									html += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="display:inline;border:1px solid grey;" alt="'+tipoHabi+'"/></div>';
								} else {
									items++;
									html += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;" alt="Moodboard"/></div>';
								}
							} else { }
						}
						else {
							// SIGUIENTES ITEMS
							if (tipoHabi!="noColocar"){
								if (id_moodboard=="" || id_moodboard==0) {
									items++;
									html += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="display:inline;border:1px solid grey;" alt="'+tipoHabi+'"/></div>';
								} else {
									items++;
									html += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;" alt="Moodboard"/></div>';
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
				html+='<div class="col-sm-4 col-md-2 lineaProyecto">'; 
				html+='<input class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-12 col-md-11 col-md-offset-0 col-lg-offset-0 input-p2 letra-mayusculas letra-s estado4"  value="'
					+ proyectoEnCuestion.nombreProyecto   +'" title="'
					+ proyectoEnCuestion.nombreProyecto   +'"readonly>';
				html+='<input class="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-12 col-md-11 col-md-offset-0 col-lg-offset-0 input-p2 letra-mayusculas letra-s estado6" value="'
					+ proyectoEnCuestion.id_proyecto   +'" readonly>';
				 
				html+='</div>';
					
					
				html+='<div class="col-xs-5 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
				html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 letra-xxxlp estado3"><img class="widthImg" src="img/facturacion/1600.png"  alt="Factura"></div>';
				/*<a style="color:black" href="'+urlbuckets3+'decoradores/'+decorador.mail+'/facturas/'+proyectoEnCuestion.id_proyecto+'/'+proyectoEnCuestion.factura+'" "Ver factura" target="_blank">*/

				if(proyectoEnCuestion.token==undefined){
					html+='<input onclick="facturaDropzone('+proyectoEnCuestion.id_proyecto+')" class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="CLICK" title="CLICK" style="cursor:pointer" readonly>';
				} else {
					html+='<a style="color:black" href="'+urlbuckets3 + 'decoradores/' + decorador.mail + '/facturas/'+proyectoEnCuestion.id_proyecto+'/factura.pdf" target="_blank"><input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="CLICK" title="CLICK" style="cursor:pointer" readonly></a>';
				}
				html+='</div>';	
			
				html+='<div class="col-xs-5 col-xs-offset-0 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
				html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 letra-xxxlp estado3"><img class="widthImg" src="img/facturacion/EURO.png"  alt="tipo de proyecto" /></div>';	
				html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="'
					+ proyectoEnCuestion.concepto   +'" readonly>';
				html+='</div>';	
				html+='<div class="col-xs-5 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-2 lineaProyecto">'; 	
				html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 letra-xxxlp estado3"><img class="widthImg" src="img/facturacion/info-256.png"  alt="Estado"/></div>';	
				if(proyectoEnCuestion.token==undefined){
					html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="PENDIENTE" title="PENDIENTE" readonly>';
					html+='</div>';		
				} else {
					html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="PAGADO" title="PAGADO" readonly>';
					html+='</div>';	
				}  
				if(proyectoEnCuestion.token==undefined){
					var f=new Date(proyectoEnCuestion.fecha_entrada); 
					dia=f.getDate();
					mes=f.getMonth()+2;
					ano=f.getFullYear(); 
					if(mes==13){ 
						mes=1;
						ano=ano+1;
					}
					fechaEntrada="1-15/"+mes+"/"+ano;
				} else { 
					f=new Date(proyectoEnCuestion.fecha_pago);
					dia=f.getDate();
					mes=f.getMonth()+1;
					ano=f.getFullYear(); 
					fechaEntrada=dia+"/"+mes+"/"+ano; 
				} 
				html+='<div class="col-xs-5 col-xs-offset-0 col-sm-offset-0 col-sm-4 col-md-2 ultimo">'; 	
				html+='<div class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 letra-xxxlp estado3"><img class="widthImg" src="img/facturacion/3.png" alt="Fecha de pago"/></div>';	
				html+='<input class="col-xs-12 col-sm-12 col-sm-offset-0 col-md-11 col-md-offset-1 input-p2 letra-mayusculas letra-s text-center" value="'
					+ fechaEntrada   +'" title="'
					+ fechaEntrada   +'" readonly>';
				html+='</div>';
				
				 
					
				html+='	</div>';
				html+='</div>';
			}
		}
	}
	
 
	
	  
		  
$('.facturas').html(html);
cerrarCargando();
}
function facturacion(){
	$('#facturacion').modal('show');
}