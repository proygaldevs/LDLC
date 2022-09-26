var checklogintosave = 0;
var proyectoInfo="";
var proyectoObject=0;
var pagoEspecial="";
var noHome="";
// Si tipo es 1 es que accede desde fuera de indexapp.
// Si el tipo es 2 es que accede desde indexapp.
// Si el tipo es 3 es que accede desde Menu.html (menu de usuarios)
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
						var linea='<li style="border:1px solid black;padding:1%;margin-top:0;list-style:none">'+$("#notificacion"+id).parent().html()+'</li>';
						 
						$("#notificacion"+id).parent().parent().prepend(linea);
						$("#proyect"+id).remove(); 
						$("#notificacion"+id).parent().find(".listaProyectos2").addClass("marginPendientes");
						
						
						$("input").dblclick(function(){
							$(this).val("");
						});
				}

				$("input").change(function(){
			    	valor=$(this).val(); 
			    	id=$(this).attr("id");
			    	id=id.split("-")[1];
			    	if(valor==""){}else {
			    		addNombre(valor, id);
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
var proyectos_ajax="";
var estancias="";
//quitar
var proyectoBlack="";
function cargarPerfil(tipo){ 
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");  
	
	var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	var checked_keep_Session = getCookie("checked_keep_Session");
	var entra="no";
	// Verificamos si entra a Home o IndexApp (que entra siempre)
	// Tipo 2 es para tener siempre la sesión activa aunque no marque checked_keep_session
	if (tipo==1 || tipo==2 || tipo==3 || tipo==4 || tipo=="decoradores" || tipo=="pisos" || tipo=="pagoEspecial"){ 
			var entra="si";
	} else {
		// Si accede desde tipo 1 y tiene sesión mantenida si puedes navegar por el resto
		if (checked_keep_Session==1){
			var entra="si";
		}
	}
	if (userAssistantCockie != "" && entra=="si") {
		if (tipo==1) {
			 
			var lg_username = userAssistantCockie;
			var lg_password = passAssistantCockie;
			var formLogin = $('#login-form');
			var formLost = $('#lost-form');
			var formRegister = $('#register-form');
			var divForms = $('#div-forms');
			var modalAnimateTime = 300;
			var msgAnimateTime = 150;
			var msgShowTime = 2000;
		 
			try {
				

				$.ajax({
							// /type:"POST",
							dataType : "json",
							// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
							// url:
							// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
							url : urlbaseForAjax + '/GetUser',
							data : {
								mail : lg_username,
								pass : lg_password
							},
							// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
							contentType : "application/json; charset=utf-8",
							success : function(data) { 
								// $usuarioGlobal=data;
								id_ajax = data.id;
								var mail_ajax = data.mail;
								var user_ajax = data.userName;
								proyectos_ajax = data.proyectos;
								
								if (id_ajax < 0) {
									clearAllCookies();
								} else { 
									//quitar
									proyectoBlack=data;	 
									$('#liforsustitution').remove(); 
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

									var urlforhome = urlbase;
									codeusername += '<li role="separator" class="divider"></li>';
									codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
											+ urlforhome 
											+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
									codeusername += ' <li role="separator" class="divider"></li>';

									codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
											+ urlforhome
											+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

									codeusername += '</ul>';
									codeusername += ' </li>'; 
									// Lo añadimos con jquery a la página
									$('#ulforsustitution').append(codeusername); 
									 

									setTimeout(function() {
										$('#login-modal').modal('hide');
									}, 1500);

									$('.homeAnchos').css('visibility', "visible");
									
									var proyectoFinal = [];
									for (var i = proyectos_ajax.length-1; i>=0 ; i--) {   
										if ((proyectos_ajax[i].preferencias.length == 0) || (proyectos_ajax[i].preferencias === '') || (proyectos_ajax[i].preferencias === null)) {	 
											 
										} else {
											if(proyectos_ajax[i].estado==100 || proyectos_ajax[i].estado==200){
												proyectoFinal.unshift(proyectos_ajax[i]);
											} else {
												proyectoFinal.push(proyectos_ajax[i]);
											}
										}
									}
									proyectos_ajax=proyectoFinal;
									
									
										deleteCookie("proyectoParaDecorador");
										var listproyecto = '';
										var nombreDecorador="";	
										listproyecto += '<ul style="padding:0;margin:0;list-style:none">';
										for (var i = proyectos_ajax.length-1; i>=0 ; i--) {  
											proyectoObject = proyectos_ajax[i];   
											if ((proyectoObject.preferencias === undefined) || (proyectoObject.preferencias === '') || (proyectoObject.preferencias === null)) {	 
												continue;
											}  
											if ((proyectos_ajax[i].idDecorador === undefined) || (proyectos_ajax[i].idDecorador === 0) || (proyectos_ajax[i].idDecorador === '') || (proyectos_ajax[i].idDecorador === null) || proyectos_ajax[i].idDecorador==-1 || proyectos_ajax[i].idDecorador==undefined) {	 
												nombreDecorador="DISEÑADOR";
											}
											else {
												nombreDecorador=proyectos_ajax[i].nombreDecorador;
											} 
											if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {
												listproyecto += '<li id="proyect'+proyectos_ajax[i].id+'" style="border:1px solid black;padding:1%;margin-top:0;list-style:none"><div id="notificacion'+proyectos_ajax[i].id+'" class="notificacionChat" title="Mensajes pendientes"></div><div class="listaProyectos">';
												listproyecto += '<div id="myCarousel3'+i+'" class="  container-fluid carousel slide" data-ride="carousel" style="height: auto!important;">';
												listproyecto += '<div id="carouselinnerForImages" class=" conefectos carousel-inner" role="listbox" style="font-family: basic_title_font; text-transform: uppercase;width:90%;margin-left:5%;border:1px solid grey;">';
												
												var tipoHabi="";
												var k="";
												for(var l = 0; l < proyectoObject.preferencias.length; l++) {
													if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
														k="existe"; 
													}
												}
												var f="";
												var bandera=true;
												var items=0;
												for(var j = 0; j < proyectoObject.preferencias.length; j++) {
														var id_moodboard = proyectoObject.preferencias[j].id_moodboard;  
														 
														if (k=="existe"){ 
															  
															// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
															if (id_moodboard=="" || id_moodboard==0) {
																tipoHabi="noColocar";
															} else { tipoHabi="colocar"; f++;}
															
														} else {
															// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
															if (id_moodboard=="" || id_moodboard==0) { 
																tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
															items++;
															if (id_moodboard=="" || id_moodboard==0) {
																listproyecto += '<div class="conefectossuaves text-center item active"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";"  alt="'+tipoHabi+'"/></div>';
															} else {
																listproyecto += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" alt="Moodboard"/></a></div>';
															}
														} else { }
													}
													else {
														// SIGUIENTES ITEMS
														if (tipoHabi!="noColocar"){
															items++;
															if (id_moodboard=="" || id_moodboard==0) {
																listproyecto += '<div class="conefectossuaves text-center item"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";"  alt="'+tipoHabi+'"/></div>';
															} else {
																listproyecto += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenes('+i+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" alt="Moodboard"/></a></div>';
															}
														} else { } 	 
													}
												}
												listproyecto += '</div>';
												if(items>1){
												listproyecto += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel3'+i+'" data-slide="prev">';
												listproyecto += '<span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
												listproyecto += '</a>';
												listproyecto += '<a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel3'+i+'" data-slide="next">';
												listproyecto += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
												listproyecto += '</a>';
												} 
												 
												listproyecto += '</div>';
												listproyecto += '<div class="buttonstandard mas" onclick="anadirMoodboard('
													+		proyectos_ajax[i].id+')"><span title="Añadir Moodboard">+</span></div>';
												if (proyectos_ajax[i].idDecorador>=0 && proyectos_ajax[i].pagado>=1 && proyectos_ajax[i].estado>11){
													listproyecto += '<a href="decorador-online.html?decorador='
														+		proyectos_ajax[i].nombreDecorador +'&id='+proyectos_ajax[i].idDecorador+'">';
													if(nombreDecorador.length>15){
														listproyecto += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;border:1px solid grey;" id="decorador"><div class="tresPuntos largo" title="';
													} else if(nombreDecorador.length>8) {
														listproyecto += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;border:1px solid grey;" id="decorador"><div class="tresPuntos medio" title="';
													} else {
														listproyecto += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;border:1px solid grey;" id="decorador"><div class="tresPuntos" title="';
													}
													listproyecto +=		nombreDecorador
														+		'">'
														+		nombreDecorador
														+		'</div></div></a>';
												} else {
													listproyecto += '<a onclick="seleccionarDecorador('
														+		proyectos_ajax[i].id+','+proyectos_ajax[i].pagado+')" id="contratarDecorador'
														+		proyectos_ajax[i].id+'">';
													listproyecto += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;margin-bottom:3%;border:1px solid grey;" id="decorador';
												 
													try {
													if(nombreDecorador.length>15){
															listproyecto +=		proyectos_ajax[i].id+'"> <div class="tresPuntos largo" title="';
														} else if(nombreDecorador.length>8){
															listproyecto +=		proyectos_ajax[i].id+'"> <div class="tresPuntos medio" title="';
														} else {
															listproyecto +=		proyectos_ajax[i].id+'"> <div class="tresPuntos" title="';
														}
													} catch (e) { 
													}
														listproyecto +=		nombreDecorador
														+		'">'
														+		nombreDecorador
														+		'</div></div></a>';
												} 
												listproyecto += '</div>';
												listproyecto += '<div class="col-sm-0 col-md-0"></div>';
												listproyecto += '<div class="listaProyectos2" style="padding-bottom:1%">';
												listproyecto += '<input style="width:90%;margin-left:5%;letter-spacing: 2px!important;" class="input-p letra-xs nombreProyect" id="p-'+proyectos_ajax[i].id+'" type="text" name="fname" value="'
													+		proyectos_ajax[i].tituloProyecto+'" placeholder="'
													+		proyectos_ajax[i].tituloProyecto
													+		'"><br/>';
												if(proyectoObject.projectsStates.texto_usuarios.length>33 && proyectos_ajax[i].pagado>=1 || proyectos_ajax[i].projectsStates.turnoDe=="usuario" && proyectos_ajax[i].pagado>=1) {
													listproyecto += '<input  style="width:90%;margin-left:5%;letter-spacing: 1px!important;" readonly class="input-p estado'+proyectos_ajax[i].id+' estadoLargo" type="text" name="fname2" value="';
												} else {
													listproyecto += '<input  style="width:90%;margin-left:5%;letter-spacing: 2px!important;" readonly class="input-p estado'+proyectos_ajax[i].id+' estadoCorto" type="text" name="fname2" value="';
												}
												
												
												 
												var FechaEstado = new Date(proyectoObject.fechaestado);
												var Hoy = new Date(); 
												var decoradorDias = FechaEstado - Hoy; 
												var dias = decoradorDias / 86400000; 
												// SI SE QUIERE PONER HORAS: 
												  //if (Math.floor(dias)>=1) {
													// var hrs = diff /3600000; 
													// hrs= hrs - (Math.floor(dias)*24);
												  //} 
												  total=Math.ceil(dias);
												  if (total>=1) {
													  total ='( Responderá en menos de '+total+' días )'; 
													  if(proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura") {total=""; }
												  } else if(proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura"){ total=""; } else {
													  total= '( El decorador no cumplió el plazo, estamos tratando de solucionarlo )'; } 
												 
												if(proyectos_ajax[i].idDecorador==0 && proyectos_ajax[i].pagado==0){
													listproyecto += proyectoObject.projectsStates.texto_usuarios;
												} else if (proyectos_ajax[i].idDecorador>=1 && proyectos_ajax[i].pagado==0){ 
													listproyecto += proyectoObject.projectsStates.texto_usuarios;
												} else if (proyectos_ajax[i].idDecorador>=1 && proyectos_ajax[i].pagado>=1){ 
													if (proyectos_ajax[i].projectsStates.turnoDe=="usuario") {
														if (decoradorDias<0) {  
															  var dias = decoradorDias / 86400000;  
															  dias=Math.ceil(dias);
															  if (dias==0) {
																  dias="( Estás en este paso desde hoy )";
															  } else {
																  if (dias==-1){
																	  dias="( Estás en este paso desde hace "+dias*-1+" día )";
																  } else { dias="( Estás en este paso desde hace "+dias*-1+" días )"; }
															  }
														} else { dias=""; }
														if (proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura"){ 
															listproyecto += proyectoObject.projectsStates.texto_usuarios+'" readonly';
														} else {
															listproyecto += proyectoObject.projectsStates.texto_usuarios+' '+dias+'" readonly';
														}
													} else { 
														  
														listproyecto += proyectos_ajax[i].projectsStates.texto_usuarios +' '+total; 
														
													}
													
													// CUANDO AÑADA PROYECT STATES PARA LOS ESTADOS
													// console.log(proyectos_ajax[i]);
													// if(proyectos_ajax[i].projectsStates.id>1){
													// 	listproyecto += proyectos_ajax[i].projectsStates.nombre; 
													// }
												} else {
													listproyecto += 'Escoge un decorador y comienza a subir información'; 
												} 


												//console.log(proyectos_ajax[i]);
												
												
												listproyecto += '"><br/><br/>'; 
												if (proyectos_ajax[i].pagado!=0 && proyectos_ajax[i].idDecorador<=0){
													// CODIGO QUE ABRE DECORADOR Y REDIRECCIONA
													listproyecto += '<a class=" colornegro letraAriallogin  interspaciado_2 comprarPasosDecorador'+proyectos_ajax[i].id+'"><div onclick="cargarProjectoDecorador('
														+ proyectos_ajax[i].id
														+ ',true)" style="width:90%;margin-left:5%;" class="buttonstandard_invertido letra-xs comprarPasos">ENTRAR AL PROYECTO</div></a>';
													listproyecto += '</div></li>';
												} else if(proyectos_ajax[i].pagado!=0 && proyectos_ajax[i].idDecorador!=0) {
													// CODIGO QUE ABRE A PASOS
													listproyecto += '<a class=" colornegro letraAriallogin  interspaciado_2 comprarPasosDecorador"><div onclick="cargarProjecto('
														+ proyectos_ajax[i].id
														+ ',true)" style="width:90%;margin-left:5%;" class="buttonstandard_invertido letra-xs comprarPasos">ENTRAR AL PROYECTO</div></a>';
													listproyecto += '</div></li>';
												} else {
													listproyecto += '<a class=" colornegro letraAriallogin  interspaciado_2" onclick="deleteProjecto('
														+ proyectos_ajax[i].id+')">';
													listproyecto += '<div  style="width:10%;margin-left:5%;" class="buttonstandard letra-xs comprarPasos" style="text-align:center"><i class="glyphicon glyphicon-trash" style="letter-spacing: 0px;"></i></div></a>'; 
													listproyecto += '<a class=" colornegro letraAriallogin  interspaciado_2" onclick="">'; 
													listproyecto += '<div onclick="comprarProyecto('
														+ proyectos_ajax[i].id+')" style="width:78%;margin-left:2%;" class="buttonstandard_invertido letra-xs comprarPasos">COMPRAR</div></a>';
													listproyecto += '</div></li>';
												}
												
												
												
												
											} else {

											}
										}
										listproyecto += '</ul>';

										var crearpoyecto="";	
										crearpoyecto += '<a class=" colornegro letraAriallogin  interspaciado_2" href="'
											+ urlforhome 
											+ '/decoracion-online.html" onclick="nuevoProyecto()"><div class="buttonstandard letra-xs" style="margin-bottom:85px;">CREAR UN PROYECTO NUEVO</div></a>';
										

											
										$('.proyectos').append(listproyecto); 
										getNotificaciones(id_ajax, 1);
										$('.crearProyecto').append(crearpoyecto); 

										 /*
										for (var i = 1; i>0 ; i--) {var chat="";
											proyectoObject = proyectos_ajax[i];
											chat += '<div id="Chat" class="textarea-p2" style="margin-left:0;width:100%;height:290px;border:1px solid black;margin-bottom:30px">';
											chat += '<div id="chat-window" >';
											chat += '	<div id="message-list" class="row disconnected"></div>';
											chat += '		<div id="typing-row" class="row disconnected">';
											chat += '			<p id="typing-placeholder"></p>';
											chat += '		</div>';
												
											chat += '</div>';
											chat += '</div>';
											
											
											chat+='<div class="decorador">';
												chat+='<div id="imagencara" style="padding-left:0;margin-left:15px; margin-top: 15px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center" class="col-xs-12">';
												chat+='<img alt="cara" id="cara" style="width:100%;height:auto;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
											if(proyectoObject.nombreDecorador.length>15){
												chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
											} else {
												chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
											}
											chat+= proyectoObject.nombreDecorador +'</div>';
											chat+='</div>';
											if(proyectoObject.estado<100){
												chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">¿No he leído tus mensajes? ¡Avísame!</div>';
												chat += '<div id="input-div">';
												chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
												chat += '</div>';
											} else {
												chat += '<div class="letra-s buttonstandard_invertido aviso"  style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
												chat += '<div id="input-div">';
												chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no puedes escribír a este decorador" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
												chat += '</div>';
											}  
	
											$('.chat').html(chat);  
											setTimeout(function(){ 
												console.log(user_ajax);
												console.log(proyectos_ajax[i].id);
												notificaciones(user_ajax,proyectos_ajax[i].id,150);
											}, 3000);
										}*/
										
										
										
								}  
							},         
					        error : function(xhr, status) { 
					        	cerrarCargando();
					        },  
					        complete : function(xhr, status) { 
					        	cerrarCargando();
					        	var id=0;
					        	var pagado = getParameterByName("pagado"); 
					        	var precio = getParameterByName("precio");  
					        	var id = getParameterByName("id");
					        	var precio2=0;
								if(pagado=="ok"){
									if(precio=="179" || precio==179 || precio=="179.00" || precio==179){
										precio2=179.00;
									} else if(precio=="79" || precio==79 || precio=="79.00" ) { 
										precio2=79.00;
									}
									id=1;
									fbq('track', 'Purchase', {value: precio2, currency: 'EUR'});
									deleteCookie("id_proyectoglobal");
									gtag_report_conversion(urlbase+"/Home.html?precio="+precio+"&id="+id);
								} else if(pagado=="ko"){
									setTimeout(function(){ 
										BootstrapDialog
										.alert('El pago no se ha realizo, vuelva a intentarlo. Para cualquier duda, por favor contacte con un administrador en info@decotheco.com.');
									}, 1000);  
									
								} else if(id>0) { 
									setTimeout(function(){  
										BootstrapDialog
										.alert('Se ha realizado el pago correctamente.');
									}, 1000);
								}
								

								
								
								 
					        }
						});

			} catch (e) {
				BootstrapDialog
						.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
				cerrarCargando();
			}

			

	} else if (tipo==4 || tipo=="pagoEspecial") {
		 
		var lg_username = userAssistantCockie;
		var lg_password = passAssistantCockie;
		var formLogin = $('#login-form');
		var formLost = $('#lost-form');
		var formRegister = $('#register-form');
		var divForms = $('#div-forms');
		var modalAnimateTime = 300;
		var msgAnimateTime = 150;
		var msgShowTime = 2000;

	 
		try {
			

			$.ajax({
						// /type:"POST",
						dataType : "json",
						// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						// url:
						// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
						url : urlbaseForAjax + '/GetUser',
						data : {
							mail : lg_username,
							pass : lg_password,
							detail_level : 0
						},
						// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
						contentType : "application/json; charset=utf-8",
						success : function(data) { 
							// $usuarioGlobal=data;
							pagoEspecial=data;
							var id_ajax = data.id;
							var mail_ajax = data.mail;
							var user_ajax = data.userName;
							proyectos_ajax = data.proyectos;
							if (id_ajax < 0) {
								clearAllCookies();
							} else {

								$('#liforsustitution').remove(); 

								console.log(pagoEspecial);
								 
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

								var urlforhome = urlbase;
								codeusername += '<li role="separator" class="divider"></li>';
								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome 
										+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
								codeusername += ' <li role="separator" class="divider"></li>';

								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome
										+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

								codeusername += '</ul>';
								codeusername += ' </li>'; 
								// Lo añadimos con jquery a la página
								$('#ulforsustitution').append(codeusername); 
								 

								setTimeout(function() {
									$('#login-modal').modal('hide');
								}, 1500);

									for (var i = 0; i < proyectos_ajax.length; i++) {
										// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
										if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {

											 
										} else { 
												idProyecto=proyectos_ajax[i].id;
												setCookie("id_proyectoglobal", idProyecto, 365);
										}
									}

							}  
						},         
				        error : function(xhr, status) { 
				        	cerrarCargando();
				        },  
				        complete : function(xhr, status) { 
				        	cerrarCargando();
				        }
					});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			cerrarCargando();
		}

		

	} else if (tipo==3) {

		var lg_username = userAssistantCockie;
		var lg_password = passAssistantCockie;
		var formLogin = $('#login-form');
		var formLost = $('#lost-form');
		var formRegister = $('#register-form');
		var divForms = $('#div-forms');
		var modalAnimateTime = 300;
		var msgAnimateTime = 150;
		var msgShowTime = 2000;

	 
		try {
			

			$.ajax({
						// /type:"POST",
						dataType : "json",
						// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						// url:
						// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
						url : urlbaseForAjax + '/GetUser',
						data : {
							mail : lg_username,
							pass : lg_password,
							detail_level : 0
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

								$('#liforsustitution').remove(); 
								
								 
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

								var urlforhome = urlbase;
								codeusername += '<li role="separator" class="divider"></li>';
								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome 
										+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
								codeusername += ' <li role="separator" class="divider"></li>';

								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome
										+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

								codeusername += '</ul>';
								codeusername += ' </li>'; 
								// Lo añadimos con jquery a la página
								$('#ulforsustitution').append(codeusername); 
								 

								setTimeout(function() {
									$('#login-modal').modal('hide');
								}, 1500);
								

									
									var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
									if(id_del_proyecto_a_cargar=="") {
										for (var i = 0; i < proyectos_ajax.length; i++) {
											// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
											if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {

												 
											} else { 
													idProyecto=proyectos_ajax[i].id;
													setCookie("id_proyectoglobal", idProyecto, 365);
													var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
													for (var i = 0; i < proyectos_ajax.length; i++) {
														// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
														if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
															proyectoObject = proyectos_ajax[i];
														}  
													}
											}
										}
									} else {
										for (var i = 0; i < proyectos_ajax.length; i++) {
											// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
											if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
												proyectoObject = proyectos_ajax[i];
											}  
										}
									}
 
									 
							}  
						},         
				        error : function(xhr, status) { 
				        	cerrarCargando();
				        },  
				        complete : function(xhr, status) { 
				        	cerrarCargando();
				        }
					});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			cerrarCargando();
		}

		

	} else if (tipo=="pagar") {

		var lg_username = userAssistantCockie;
		var lg_password = passAssistantCockie;
		var formLogin = $('#login-form');
		var formLost = $('#lost-form');
		var formRegister = $('#register-form');
		var divForms = $('#div-forms');
		var modalAnimateTime = 300;
		var msgAnimateTime = 150;
		var msgShowTime = 2000;

	 
		try {
			

			$.ajax({
						// /type:"POST",
						dataType : "json",
						// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						// url:
						// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
						url : urlbaseForAjax + '/GetUser',
						data : {
							mail : lg_username,
							pass : lg_password,
							detail_level : 0
						},
						// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
						contentType : "application/json; charset=utf-8",
						success : function(data) { 
							// $usuarioGlobal=data;
							id_ajax = data.id;
							var mail_ajax = data.mail;
							var user_ajax = data.userName;
							proyectos_ajax = data.proyectos;
							if (id_ajax < 0) {
								clearAllCookies();
							} else {
								
								$('#liforsustitution').remove(); 
								
								 
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

								var urlforhome = urlbase;
								codeusername += '<li role="separator" class="divider"></li>';
								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome 
										+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
								codeusername += ' <li role="separator" class="divider"></li>';

								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome
										+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

								codeusername += '</ul>';
								codeusername += ' </li>'; 
								// Lo añadimos con jquery a la página
								$('#ulforsustitution').append(codeusername); 
								 

								setTimeout(function() {
									$('#login-modal').modal('hide');
								}, 1500);
								

									
								var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
								if(id_del_proyecto_a_cargar=="") {
									for (var i = 0; i < proyectos_ajax.length; i++) {
										// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
										if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {

											 
										} else { 
												idProyecto=proyectos_ajax[i].id;
												setCookie("id_proyectoglobal", idProyecto, 365);
												var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
												for (var i = 0; i < proyectos_ajax.length; i++) {
													// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
													if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
														proyectoObject = proyectos_ajax[i];
													}  
												}
										}
									}
								} else {
									for (var i = 0; i < proyectos_ajax.length; i++) {
										// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
										if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
											proyectoObject = proyectos_ajax[i];
										}  
									}
								}
								discount=data.proyectos[0].promocion;
								descuentoUnitario=discount.descuento_unitario;
								descuentoPorcentual=discount.descuento_porcentual;
								// SI ES UN PAGO CON DESCUENTO EN PROYECTOS PONE USER-idUsuario
								 
								if(discount.veces>0){
								if(descuentoUnitario!=0 || descuentoPorcentual!=0) {
									total79=(parseFloat(descuentoUnitario));
									total179=(parseFloat(descuentoUnitario));
									total792=((79.00*parseFloat(descuentoPorcentual))/100);
									total1792=((179.00*parseFloat(descuentoPorcentual))/100);
									total=79.00-(total79+total792);
									total2=179.00-(total179+total1792);
									$('.precio3').html("<strike>179€</strike> - DESCUENTO("+(total179+total1792)+"€) = "+total2+"€");
									$('.precio2').html("<strike>79€</strike> - DESCUENTO("+(total79+total792)+"€) = "+total+"€"); 
									
									$('.precio79').html("<strike>79€</strike> - "+total+"€");
									$('.precio179').html("<strike>179€</strike> - "+total2+"€");
									$('.pagarEspecial179').attr("onclick","pagarEspecial(1,9)");
									$('.pagarEspecial79').attr("onclick","pagarEspecial(2,9)"); 
									total79=total;
									total179=total2;
								}}
								
								
								
								function getParameterByName(name, url) {
									
								    if (!url) url = window.location.href;
								    name = name.replace(/[\[\]]/g, "\\$&");
								    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
								        results = regex.exec(url);
								    if (!results) return null;
								    if (!results[2]) return '';
								    return decodeURIComponent(results[2].replace(/\+/g, " "));
								}
								var pagado = getParameterByName("pagado"); 
								if(pagado=="ko"){
									BootstrapDialog.alert('El pago no se ha realizo, vuelva a intentarlo. Para cualquier duda, por favor contacte con un administrador en info@decotheco.com');
									
								}
								cerrarCargando();
								if(userAssistantCockie!=""){
									var tipoPago = getCookie("pagar"); 
									deleteCookie("pagar"); 
									if(tipoPago==79) {
										setTimeout(function(){ $('#modalopcionesdepago79').modal('show'); }, 1000);
									}
									if (tipoPago==179){
										setTimeout(function(){ $('#modalopcionesdepago179').modal('show'); }, 1000);
									}
								} else {  
									setTimeout(function(){  $('#login-modal').modal('show'); }, 1000); 
								}
							}  
						},         
				        error : function(xhr, status) { 
				        	cerrarCargando();
				        },  
				        complete : function(xhr, status) { 
				        	cerrarCargando();
				        }
					});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			cerrarCargando();
		}

		

	} else if (tipo==0 || tipo==2 || tipo=="decoradores" || tipo=="pisos" || tipo=="ldlc" || tipo=="afiliado" || tipo=="decorador-info") {
		 
		var lg_username = userAssistantCockie;
		var lg_password = passAssistantCockie;
		var formLogin = $('#login-form');
		var formLost = $('#lost-form');
		var formRegister = $('#register-form');
		var divForms = $('#div-forms');
		var modalAnimateTime = 300;
		var msgAnimateTime = 150;
		var msgShowTime = 2000; 

		//QUITAR BLACK
		var v2x1=getParameterByName('val'); 
		if(tipo=="decoradores") {
			if(v2x1=="2x1") { 
				$("#divforcovervideo").css('background', 'url(img/2x1.jpg) center bottom');
				$("#divforcovervideo").css('height', '75vh');
				$(".fondoCompletoHomeCasiCom").css('height', '75vh'); 

				$(".todoDeco").html('<div class="col-xs-offset-2 col-xs-8  col-md-offset-4 col-md-4 letra-s letra-mayusculas letra-negrita" style="padding: 3px;text-align: center;background-color:white; position: absolute; margin-top: 65vh; z-index: 100;"> <a class="buttonstandard_invertido  center-block" style="max-width:300px;color:black" href="/decoradores-online.html">TODOS LOS DECORADORES</a>  </div>');
			}
		}
		
		
		try {
			

			$.ajax({
						// /type:"POST",
						dataType : "json",
						// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						// url:
						// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
						url : urlbaseForAjax + '/GetUser',
						data : {
							mail : lg_username,
							pass : lg_password,
							detail_level : 0
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
								
								$('#liforsustitution').remove(); 
								
								 
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

								var urlforhome = urlbase;
								codeusername += '<li role="separator" class="divider"></li>';
								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome 
										+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
								codeusername += ' <li role="separator" class="divider"></li>';

								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome
										+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

								codeusername += '</ul>';
								codeusername += ' </li>'; 
								// Lo añadimos con jquery a la página
								$('#ulforsustitution').append(codeusername); 
								 

								setTimeout(function() {
									$('#login-modal').modal('hide');
								}, 1500); 
								if(tipo!="decoradores" && tipo!="ldlc" && tipo!="pisos"){

									var proyectoParaDecorador = getCookie("proyectoParaDecorador");
									cerrarCargando();
								}
								if(tipo=="ldlc"){
									proyectoInfo=data;
									  
									insertaselementos();
								}
								if(tipo=="pisos"){
									ldlc("4")
								}
								
								
							}  
						},         
				        error : function(xhr, status) { 
				        	cerrarCargando();
				        },  
				        complete : function(xhr, status) { 
				        	
				        	
				        }
					});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			cerrarCargando();
		}

		

	}  else if (tipo=="regalo") {
		 
		var lg_username = userAssistantCockie;
		var lg_password = passAssistantCockie;
		var formLogin = $('#login-form');
		var formLost = $('#lost-form');
		var formRegister = $('#register-form');
		var divForms = $('#div-forms');
		var modalAnimateTime = 300;
		var msgAnimateTime = 150;
		var msgShowTime = 2000; 
	 
		try {
			

			$.ajax({
						// /type:"POST",
						dataType : "json",
						// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						// url:
						// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
						url : urlbaseForAjax + '/GetUser',
						data : {
							mail : lg_username,
							pass : lg_password,
							detail_level : 0
						},
						// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
						contentType : "application/json; charset=utf-8",
						success : function(data) { 
							// $usuarioGlobal=data;
							id_ajax = data.id;
							var mail_ajax = data.mail;
							var user_ajax = data.userName;
							proyectos_ajax = data.proyectos;

							if (id_ajax < 0) {
								clearAllCookies();
								
							} else {
								
								$('#liforsustitution').remove(); 
								
								 
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

								var urlforhome = urlbase;
								codeusername += '<li role="separator" class="divider"></li>';
								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome 
										+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
								codeusername += ' <li role="separator" class="divider"></li>';

								codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
										+ urlforhome
										+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

								codeusername += '</ul>';
								codeusername += ' </li>'; 
								// Lo añadimos con jquery a la página
								$('#ulforsustitution').append(codeusername); 
								 

								setTimeout(function() {
									$('#login-modal').modal('hide');
						        	cerrarCargando();
								}, 1500);  
								
								var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
								if(id_del_proyecto_a_cargar=="") {
									for (var i = 0; i < proyectos_ajax.length; i++) {
										// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
										if (typeof proyectos_ajax[i].nombreProyecto != "undefined") {

											 
										} else { 
												idProyecto=proyectos_ajax[i].id;
												setCookie("id_proyectoglobal", idProyecto, 365);
												var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
												for (var i = 0; i < proyectos_ajax.length; i++) {
													// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
													if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
														proyectoObject = proyectos_ajax[i];
													}  
												}
										}
									}
								} else {
									for (var i = 0; i < proyectos_ajax.length; i++) {
										// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
										if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
											proyectoObject = proyectos_ajax[i];
										}  
									}
								} 
								
								if(pagado=="ok"){ 
									setTimeout(function(){ 
										BootstrapDialog
										.alert('Se realizó el pago correctamente. Recibirá un email con los datos del pedido. Comenzamos a procesar su pedido.');
									}, 1000);  
								}
								if(especial=="ok"){
									// Llamada que añade si el usuario gastó uno de los descuentos
									var tipoPro = getParameterByName("tipo");
									$.ajax({ 
										dataType : "json", 
							  			url : urlbaseForAjax + '/DecoradoresController',
							  			data : {
							  				token : id_ajax,
							  				action : "subtractDiscount",
							  				id_user : id_ajax,
							  				tipoPago : tipoPro
							  				
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
								}

								discount=data.proyectos[0].promocion;
								descuentoUnitario=discount.descuento_unitario;
								descuentoPorcentual=discount.descuento_porcentual;
								// SI ES UN PAGO CON DESCUENTO EN REGALOS PONE USER-3 o USER-4 
								if(discount.veces>0){
								if(descuentoUnitario!=0 || descuentoPorcentual!=0) {
									descuentoUnitario=(parseFloat(descuentoUnitario)); 
									descuento199=((199.00*parseFloat(descuentoPorcentual))/100);
									descuento179=((179.00*parseFloat(descuentoPorcentual))/100);
									total199=199.00-(descuentoUnitario+descuento199);
									total179=179.00-(descuentoUnitario+descuento179);
							 
									$('.buttonstandardpack179').html("<strike>179€</strike> - "+total179+"€");
									$('.buttonstandardpack199').html("<strike>199€</strike> - "+total199+"€"); 
									$('#regalo').html("CAJA-DECO (<strike>199€</strike>) "+total199+"€");
									$('#regalo2').html("E-TARJETA (<strike>179€</strike>) "+(total179)+"€"); 
									$('.pagarEspecial179').attr("onclick","pagarEspecialRegalo179(3,9)");
									$('.pagarEspecial199').attr("onclick","pagarEspecialRegalo199(4,9)");
								}
								}
								
								
							}  
						},         
				        error : function(xhr, status) { 
				        	cerrarCargando();
				        },  
				        complete : function(xhr, status) { 
				        	
				        	
				        }
					});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
			cerrarCargando();
		}

		

	}
	
	
			

	} else {
		// Si no está logueado con sesión mantenida, si sale de indexapp, custom moodboard o Home, se cerrará sesión.
		logoutFunction();
		// DECORADORES CIERRA CARGANDO EN PORTFOLIODECORADORES
		if(tipo!="decoradores"){ 
			cerrarCargando();
		}
		if (tipo==1) {  
			 
			var u = getParameterByName("u");
			var p = getParameterByName("p");
			console.log(u);
			if(u!=null) {
				setCookie("userAssistant", u, 365);
				setCookie("passAssistant", p, 365);
				$('#cargando').modal('show'); 
				cargarPerfil(1)
			} else { 
				$('#login-modal').modal('show');
			}
		}
		if(tipo=="ldlc"){ 
			  
			insertaselementos();
		}
		if(tipo=="pisos"){
			ldlc("4");
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
function cerrarCargando(){
	$('#cargando').modal('hide');
}
function buscarProyetoPorId(id_del_proyecto) {
	for (var i = 0; i < proyectos_ajax.length; i++) {
		// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
		if (id_del_proyecto == proyectos_ajax[i].id) {
			proyectoObject = proyectos_ajax[i];
		}
	}
}
function cargarProjectoDecorador(id, existente){
	seleccionarDecorador(id,3); 
}
function cargarProjecto(id, existente) {
	// BootstrapDialog.alert(id+" entramos en cargarProyecto "+existente);
	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365); 
	if (existente) {
		//liberamos el flag para que no pida confirmación si nos queremos ir de la página.
		cerramosONo=false;
		
		buscarProyetoPorId(id);
		var href = urlbase + "/"+proyectoObject.projectsStates.page;
		window.location = href;
	 
		/*if (proyectoObject.finalizado == 0) {
			var href = urlbase + "/paso1.html";
			window.location = href;
		}
		if (proyectoObject.finalizado == 1) {
			var href = urlbase + "/paso2.html";
			window.location = href;
		}
		if (proyectoObject.finalizado == 2) {
			var href = urlbase + "/paso3.html";
			window.location = href;
		}
		if (proyectoObject.finalizado == 3) {
			var href = urlbase + "/paso4.html";
			window.location = href;
		}*/
		// BootstrapDialog.alert("cargariamos la vista del proyecto:"+ id);
	}

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

function nuevoProyecto() {
	// BootstrapDialog.alert("nuevo_proyecto");
	setCookie("nuevo_Proyecto", "1", 365);
	deleteCookie("proyectoParaDecorador");
	
}
function anadirMoodboard(idProyect) {
	// BootstrapDialog.alert("nuevo_proyecto");
	setCookie("nuevo_Proyecto", "1", 365);
	setCookie("anadirMoodboard", idProyect, 365); 
	var href = urlbase + "/decoracion-online.html";
	window.location = href;
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
function recordar(lg_mail) {
	

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
		

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/RememberPass',
					data : {
						mail : lg_mail,
						user: "user"
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						
						//alert(data);
						if(data==true){
							
								msgChange($('#div-lost-msg'), $('#icon-lost-msg'),
										$('#text-lost-msg'), "success", "glyphicon-ok",
										"Enviada!");
							
						}else{
							
								msgChange($('#div-lost-msg'), $('#icon-lost-msg'),
										$('#text-lost-msg'), "error",
										"glyphicon-remove", "El mail no está registrado");
							
						}

					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

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
var pagoIdDecorador;
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
							 
						console.log(data);
						pagoIdDecorador= data.id;
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
									var idProyecto ="";
									if(anadirMoodboard!=""){
										idProyecto=anadirMoodboard;
									}
									else {
										idProyecto=proyectos_ajax[i].id;
									} 
									if (paso1value == "" && noHome=="") {
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
										// Si está en pagoPiso debe entrar por aquí para no ir a lista de proyectos
										pagoEspecial="pasa";
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
							var checked = document
									.getElementById("check_login_recuerdame").checked;
							// BootstrapDialog.alert(checked);
							if (checked) {
								// BootstrapDialog.alert("aaa");
								setCookie("checked_keep_Session", "1", 365);
							}
							setCookie("userAssistant", mail_ajax, 365);
							setCookie("passAssistant", $lg_password, 365);
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							console.log(checklogintosave);
							if (checklogintosave == 1) {

								console.log(checklogintosave);
								
								saveAndInitProject();
								checklogintosave = 0;
							}
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
	setCookie("id_proyectoglobal", id, 365);
	cerramosONo=false;
	if(existente) {
		var href = urlbase + "/Home.html";
		window.location = href;
	}
}
function register(rg_user, rg_mail, rg_pass) {
	 
	var $rg_username = rg_user;
	var $rg_mail = rg_mail;
	var $rg_password = rg_pass;

	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;

	try {
		
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
				   
				// $usuarioGlobal=data;
				var resultRegister = data; 
				// BootstrapDialog.alert("register:"+resultRegister);
				if (resultRegister == 1) {
					msgChange($('#div-register-msg'), $('#icon-register-msg'),
							$('#text-register-msg'), "error",
							"glyphicon-remove", "El mail ya esta registrado");
				} else if (resultRegister > 2) {
					msgChange($('#div-register-msg'), $('#icon-register-msg'),
							$('#text-register-msg'), "error",
							"glyphicon-remove", "Ha ocurrido algún error");
				} else {
					msgChange($('#div-register-msg'), $('#icon-register-msg'),
							$('#text-register-msg'), "success", "glyphicon-ok",
							"Registro Correcto");

					setTimeout(function() { 
						login($rg_mail, $rg_password);
					}, 1000);
				}

			},
	        error : function(xhr, status) { 
	        	cerrarCargando();
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1000);
	        },  
	        complete : function(xhr, status) { 
	        	cerrarCargando();
	        	setTimeout(function(){
	    	    	$(document.body).css({ 'cursor': 'default' });
	    	    }, 1000);
	        }
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
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
function setFooterStyle() {
    var docHeight = $(window).height();
    var footerHeight = $('#footer').outerHeight();
    var footerTop = $('#footer').position() + footerHeight;
    if (footerTop < docHeight) {
        $('#footer').css('margin-top', (docHeight - footerTop) + 'px');
    } else {
        $('#footer').css('margin-top', '');
    }
    $('#footer').removeClass('invisible');
}
$(document).ready(function() {
    setFooterStyle();
    window.onresize = setFooterStyle;
     
});