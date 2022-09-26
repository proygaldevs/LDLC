var proyectoObject="";
var precio=true;
var orden="";
var visible2d="";
var idDecorador=0;
var listaAfiliados="";
var tipo=4;
var cambio=0;
function loginForPromocionPisos() { 
	var id_promocion = getParameterByName("id");   
	precio = getParameterByName("precio");   
	visible2d = getParameterByName("visible2d");   
	orden = getParameterByName("orden");   
	if(orden==null) { orden="360"; }
	// orden 360 --> arriba 3360
	// orden carrousel --> abajo 360
	// sin orden --> sin 360
	// precio false --> no se ve el precio
	// visible2d false --> no se vel el 2d
	var lg_username = getCookie("userAssistant");
	var userAssistantCockie = lg_username;
	var lg_password = getCookie("passAssistant");
	var passAssistantCockie = lg_password;
	var formLogin = $('#login-form');
	var formLost = $('#lost-form');
	var formRegister = $('#register-form');
	var divForms = $('#div-forms');
	var modalAnimateTime = 300;
	var msgAnimateTime = 150;
	var msgShowTime = 2000;
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/
		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews', 
					url : urlbaseForAjax + '/DecoradoresController',
					data : {  
		  				token : "token",
		  				action : "project_get_info_promocion",
		  				id_promocion: id_promocion
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id_user;
						var mail_ajax = userAssistantCockie;
						var user_ajax = data.nombreDecorador;
						proyectoObject = data; 
						try {
							$.ajaxSetup({
								scriptCharset : "utf-8",
								contentType : "application/json; charset=utf-8"
							}); 

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
												
											}
										},         
								        error : function(xhr, status) { 
								        	cerrarCargando();
								        } 
									});

						} catch (e) {
							BootstrapDialog
									.alert('Se ha producido un error en la conexión con el servidor');
							// put any code you want to execute if there's an exception here
							cerrarCargando();
						}
						idDecorador=data.idDecorador;
						insertaselementos();
						
						
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
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
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
 
 

function getTextoDeTitulo(arraydepares,titulo){
	var tituloConS=' '+ titulo;
	for(var i=0;i<arraydepares.length;i++){
		if(arraydepares[i].titulo==titulo || arraydepares[i].titulo==tituloConS){
			arraydepares[i].usado=1;
			return arraydepares[i].valor;
		}
	}
	//alert("en getTextoDeTitulo, no se encontro ningun titulo con el nombre "+titulo);
	return '';
}
function nuevoProyecto(id_para_lanzar) {
	// BootstrapDialog.alert("nuevo_proyecto");
	setCookie("nuevo_Proyecto", "1", 365);
	var href = urlbase + "/decoracion-online.html?id="+id_para_lanzar;
	window.location = href;
}
var lista="";
var arrayItems=""; 
var totalFinal2=0;
var totalFinal=0;
function compartirFacebookPage(){ 
	var res = getParameterByName("id");  
	var nombreLdlc = lista.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 3D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res;
	var imgofu = urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0];
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitterPage(){ 
	var res = getParameterByName("id");  
	var nombreLdlc = lista.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 3D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res;
	var imgofu = urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0];
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterestPage() {  
	var res = getParameterByName("id");  
	var nombreLdlc = lista.nombreLdlc; 
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 3D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res;
	var imgofu = urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0];
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}
/*function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}*/
var lista="";
var alturaImgTop=0;

var data="";
var idDecorador=0;
var listaAfiliados="";
function insertaselementos(){
	console.log(proyectoObject);
		$(document.body).css({ 'cursor': 'wait' });
		var html = ''; 
		
		var ventana_alto = $(window).height(); 
		alturaImgTop=ventana_alto*0.85;
		alturaImgTop2=ventana_alto*0.75;
		if(proyectoObject.video!=undefined && proyectoObject.video!=""){
			  html+='<iframe width="100%" height="500px" src="https://www.youtube.com/embed/'+proyectoObject.video+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if(orden=="360") { 
			if(proyectoObject.data!=undefined && proyectoObject.data!="") {
				html += '<div class="iframe360 col-xs-12 letra-negrita" style="min-height:300px;height:'+alturaImgTop2+'px;text-align:center;margin-top:50px;margin-bottom:50px;padding:0">'; 
				/*html += '<iframe id="iframe360" style="width:100%;min-height:300px;height:'+alturaImgTop2+'px;max-width:100%;border-bottom:3px solid #4d5461" src="'+urlbase+'/realidad_virtual/?idvr=';
				html += proyectoObject.idPromotora;
				html += '&house='+proyectoObject.pisos[0].idPiso+'" scrolling="yes" allowfullscreen></iframe>';*/
				
				html += '</div>';
				html += '</div><br/>';
			} 
		} 
		
		if(proyectoObject.files.length>0) {
			for(i=0;i<proyectoObject.files.length;i++){
				html += '<img class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 letra-negrita"><img src="'+urlbuckets3+'promocion-pisos/'+proyectoObject.idPromotora+'/'+proyectoObject.files[i]+'">';
			}
			
		}
		

		$('#divforportfoliosectionsPrev').html(html);	 
		
		var html=""; 
		nombre=proyectoObject.promotor.nombre; 
		html += '<div class="decoradorEnlace" style="margin-bottom:2%">';
		html += '<div class="center-block" style="width:150px;height:150px;border-radius:50%;overflow:hidden;margin-bottom: 20px;"><img style="text-align:center;width:auto;height:100%" src="'+urlbuckets3 + 'promotoras/'+proyectoObject.idPromotora+'.jpg"></div>';
		html += '<a href="'+proyectoObject.promotor.url+'" class="letra-m" style="color:black;text-transform:uppercase">'+proyectoObject.promotor.nombre+'</a>';
		html += '</div>';   
		  	  
		$('#divforportfoliosections').html(html);
		
		console.log(proyectoObject.pisos.length);
		try {
					var lista = [];
	  				for(i=0;i<proyectoObject.pisos.length;i++){
	  					idProyecto=proyectoObject.pisos[i].idProject;
	  					for(j=0;j<proyectoObject.proyecto.length;j++) {
	  						if(proyectoObject.proyecto[j].id==idProyecto) {
	  							lista.push(proyectoObject.proyecto[j]);
	  							continue;
	  						}
	  					}
	  				} 
	  				data=lista;
  					var html = '';  
  					var html2=""; 
  					var html3=""; 
  	  				var b = lista;
  					var max_size=b.length;
  					var sta = 0;
  					var elementosPagina = 50;
  					var limite = elementosPagina;
  					var filt=0;
  					var filtro=0;   

	  					
	  					for (var i =sta ; i < limite; i++) {
	  						if(data[i]==undefined) {
	  							$('#mas').html("");
	  						} else {  
	  						html2 += '<div class="item opacar ';
										 
	  						if(data[i].pagado==2) { html2 += '2d '; } else { html2 += '3d '; }
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(data[i].preferencias[0].habitacion=="questionmark" || data[i].preferencias[0].habitacion=="proyecto"){
									 	html2 += "otros";
									} else if(data[i].preferencias[0].habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										html2 += "despacho";
									} else if(data[i].preferencias[0].habitacion=="recibidor") {
										html2 += "entrada";
									} else {
										 html2 += data[i].preferencias[0].habitacion;
									}  
								 if(data[i].preferencias[0].habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].preferencias[0].habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										habitacion="despacho";
									} else {
										habitacion=data[i].preferencias[0].habitacion;
									}
							 } else {
								if(data[i].ldlcs[0].Habitacion!="") { 
									if(data[i].ldlcs[0].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[0].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[0].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[0].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[0].Habitacion;
									}
								} else { 
									if(data[i].ldlcs[1].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[1].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[1].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[1].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[1].Habitacion;
									}
								}
								
							 }

						if(data[i].pagado==2) {
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null) { } else {
								if(data[i].ldlcs[0].Estado==4 || data[i].ldlcs[0].Estado==5) {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[0].imagen+'" alt="Composición 2D">';
								} else {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[1].imagen+'" alt="Composición 2D">';
								}
								if(tipo==4){
									html2 += '<a href="piso-decoracion-online.html?id='+data[i].idPiso+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								} else {
									html2 += '<a href="proyecto-decoracion-online-2d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								}
							}
						} else {
							html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3 + 'usuarios/'+data[i].userMail+'/'+data[i].nombreProyecto+'/propuestas/'+data[i].propuestas[1].imagenes[0]+'" alt="Composición 3D">';
							if(tipo==4){
								html2 += '<a href="piso-decoracion-online.html?id='+data[i].idPiso+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							} else {
								html2 += '<a href="proyecto-decoracion-online-3d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							}
						}
						
						
						if(data[i].nombreProyectoDecorador=="null" || data[i].nombreProyectoDecorador==undefined){ 
							var res = data[i].nombreProyecto.split("-");
							console.log(res[0]);
							html2 += '<div class="nldlc letra-s" style="position:absolute;top:15%;width:100%">'+res[0]+'<br>';
						} else {
							var res = data[i].nombreProyectoDecorador.split("-");
							console.log(res[0]);
							if(tipo==4){
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+data[i].tituloProyecto+'<br>';
							} else {
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+res[0]+'<br>';
							}
						}
						 
						if(data[i].pagado==1) { 
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								
								if(data[i].preferencias[0].habitacion=="escritorio") { imagen="despacho"; } else { imagen=data[i].preferencias[0].habitacion; }
								if(tipo==4){ } else {
									html2 += '<img src="img/'+imagen+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								} 
								
							} else {
								
								if(tipo==4){ } else {
									html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								}
							}
						 } else {
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(tipo==4){ } else {
									 html2 += '<img src="img/'+data[i].preferencias[0].habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									 html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								 }
							 }
						     else {
						    	if(data[i].ldlcs[0].Habitacion!="") { 
						    		if(tipo==4){ } else {
						    			html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
						    			html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
						    		}
								} else { 
									if(tipo==4){ } else {
										html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
										html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
									}
								}
							 }
						 }

						
						if(data[i].textoTrabajo=="null" || data[i].textoTrabajo==undefined){ 
							
						} else {
							html2 += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
						 
						html2 += data[i].textoTrabajo+'</div>';
						}	
						html2 += '</div></div></a>';
						html2 += '</div>';  
						
						}
					  }
	  				    var $items = $(html2); 
	  				    $container.append($items) 
						$container.imagesLoaded(function() {
							$('.item').show();
							$container.masonry({ 
								itemSelector : '.item',
								columnWidth: '.grid-sizer'
							});
							hover();
						})
					  
	  					function goFun(sta,limite) {

	  	  					html2="";
	  					  for (var i =sta ; i < limite; i++) {
	  						if(data[i]==undefined) {
	  							$('#mas').html("");
	  						} else {
	  						html2 += '<div class="item opacar ';
	  						if(data[i].pagado==2) { html2 += '2d '; } else { html2 += '3d '; }
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(data[i].preferencias[0].habitacion=="questionmark" || data[i].preferencias[0].habitacion=="proyecto"){
									 	html2 += "otros";
									} else if(data[i].preferencias[0].habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										html2 += "despacho";
									} else if(data[i].preferencias[0].habitacion=="recibidor") {
										html2 += "entrada";
									} else {
										 html2 += data[i].preferencias[0].habitacion;
									}  
								 if(data[i].preferencias[0].habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].preferencias[0].habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										habitacion="despacho";
									} else {
										habitacion=data[i].preferencias[0].habitacion;
									}
							 } else {
								if(data[i].ldlcs[0].Habitacion!="") { 
									if(data[i].ldlcs[0].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[0].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[0].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[0].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[0].Habitacion;
									}
								} else { 
									if(data[i].ldlcs[1].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[1].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[1].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[1].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[1].Habitacion;
									}
								}
								
							 }

						if(data[i].pagado==2) {
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null) { } else {
								if(data[i].ldlcs[0].Estado==4 || data[i].ldlcs[0].Estado==5) {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[0].imagen+'" alt="Composición 2D">';
								} else {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[1].imagen+'" alt="Composición 2D">';
								}
								if(tipo==4){
									html2 += '<a href="piso-decoracion-online.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								} else {
									html2 += '<a href="proyecto-decoracion-online-2d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								}
							}
						} else {
							html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3 + 'usuarios/'+data[i].userMail+'/'+data[i].nombreProyecto+'/propuestas/'+data[i].propuestas[1].imagenes[0]+'" alt="Composición 3D">';
							if(tipo==4){
								html2 += '<a href="piso-decoracion-online.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							} else {
								html2 += '<a href="proyecto-decoracion-online-3d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							}
						}
						
						
						if(data[i].nombreProyectoDecorador=="null" || data[i].nombreProyectoDecorador==undefined){ 
							var res = data[i].nombreProyecto.split("-");
							console.log(res[0]);
							html2 += '<div class="nldlc letra-s" style="position:absolute;top:15%;width:100%">'+res[0]+'<br>';
						} else {
							var res = data[i].nombreProyectoDecorador.split("-");
							console.log(res[0]);
							if(tipo==4){
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+data[i].tituloProyecto+'<br>';
							} else {
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+res[0]+'<br>';
							}
						}
						 
						if(data[i].pagado==1) { 
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								
								if(data[i].preferencias[0].habitacion=="escritorio") { imagen="despacho"; } else { imagen=data[i].preferencias[0].habitacion; }
								if(tipo==4){ } else {
									html2 += '<img src="img/'+imagen+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								} 
								
							} else {
								
								if(tipo==4){ } else {
									html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								}
							}
						 } else {
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(tipo==4){ } else {
									 html2 += '<img src="img/'+data[i].preferencias[0].habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									 html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								 }
							 }
						     else {
						    	if(data[i].ldlcs[0].Habitacion!="") { 
						    		if(tipo==4){ } else {
						    			html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
						    			html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
						    		}
								} else { 
									if(tipo==4){ } else {
										html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
										html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
									}
								}
							 }
						 }

						
						if(data[i].textoTrabajo=="null" || data[i].textoTrabajo==undefined){ 
							
						} else {
							html2 += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
						 
						html2 += data[i].textoTrabajo+'</div>';
						}	
						html2 += '</div></div></a>';
						html2 += '</div>';  
  						}
  					  }

		  				    var $items = $(html2); 
		  				    $container.append($items) 
							$container.imagesLoaded(function() {
								$('.item').show();
								$container.masonry('appended', $items);
								hover(); 
								$('.item').show();
		  				    	$('#nextValue').html("Ver más");
							})
  					  }
  					  $('#nextValue').click(function(){ 
				    	$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
  						var next = limite;
  						if(max_size>=next) {
  						limite = limite+elementosPagina;
  						goFun(next,limite);
  						} else {
  							$('#nextValue').html("");
  						}
  						
  					  });
					 
				 
					
				 
	
	  			 
	
	  	} catch (e) {
	  		$(document.body).css({ 'cursor': 'default' });
			BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.'+e, function(){ 
				cerrarCargando();
	        }); 
	  	} 
	  	
	  	
	  	
		cerrarCargando();
		$(document.body).css({ 'cursor': 'default' });
	
	 
}
function hover() {
	$(".opacar").mouseover(function() {  
		  var nombre=$(this).find(".nldlc").height();
		  var imagen=$(this).find(".opacar2").height();
		  var total=(imagen-nombre)/2;

		  var imagen=$(this).find(".nldlc").css("top",total);
		  $(this).find(".opacar2").fadeTo( 500, 0.8 );
	});					
	$(".opacar").mouseleave(function() {  
		$(this).find(".opacar2" ).hide();
	}); 
	$('.opacar').on('touchstart', function (e) {
	    'use strict'; //satisfy code inspectors
	    var link = $(this); //preselect the link
	    if (link.hasClass('hover')) {
			  var nombre=$(this).find(".nldlc").height();
			  var imagen=$(this).find(".opacar2").height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).find(".nldlc").css("top",total);
	        return true;
	    } else {
	        link.addClass('hover');
			  var nombre=$(this).find(".nldlc").height();
			  var imagen=$(this).find(".opacar2").height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).find(".nldlc").css("top",total);
	        $('.opacar').not(this).removeClass('hover');
	        e.preventDefault();
	        return false; //extra, and to make sure the function has consistent return points
	    }
	});
	$('.nldlc').on('touchstart', function (e) {
	    'use strict'; //satisfy code inspectors
	    var link = $(this); //preselect the link
	    if (link.hasClass('hover')) {
			  var nombre=$(this).height();
			  var imagen=$(this).parent().height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).css("top",total);
	        return true;
	    } else {
	        link.addClass('hover');
			  var nombre=$(this).height();
			  var imagen=$(this).parent().height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).css("top",total);
	        $('.opacar').not(this).removeClass('hover');
	        e.preventDefault();
	        return false; //extra, and to make sure the function has consistent return points
	    }
	}); 
}
function ChangeUrl(page, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = {Page: page, Url: url};
        history.pushState(obj, obj.Page, obj.Url);
    } else {
        window.location.href = "homePage";
        // alert("Browser does not support HTML5.");
    }
}
function loadProject(idProject) { 
	try { 

		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews', 
					url : urlbaseForAjax + '/DecoradoresController',
					data : {  
		  				token : "token",
		  				action : "project_get_info",
						id_proyecto: idProject,
						tipo : tipo
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data; 
						var id_ajax = data.id_user;
						var mail_ajax = userAssistantCockie;
						var user_ajax = data.nombreDecorador;
						proyectoObject = data; 

						idDecorador=data.idDecorador;
						insertaselementos();
						
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	} 
	
}
function ampliar(img) {
	$('#modalAmpliar').modal('show');
	$('#imagenAmpliar img').attr('src',urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+img);
	
}
var tallest=0; 
function carouselNormalization3D() { 
	$('#carouselinnerForImages3D .item').css("height", "auto");
	var items2 = $('#carouselinnerForImages3D .item .imagenCarrousel2'); //imagenes
	var items = $('#carouselinnerForImages3D .item'), //items
		heights = [];

	if (items.length) {
	    function normalizeHeights() { 
	        items.each(function() { //de cada imagen
	            heights.push($(this).height()); 
	        });
	        tallest = Math.min.apply(null, heights); 
		        items.each(function() {  
		        		$(this).css('height',tallest+'px');  
	        });  
	    };
	    normalizeHeights();
 
	} 
	$(document.body).css({ 'cursor': 'default' });
	cerrarCargando();
	
	
}

function resumenItems(){ 
	
	$('#resumenItems').modal('show');
	var cadena="";
	cadena+='<div class="col-xs-12" style="padding-left:0">';
	cadena+='<div class="col-xs-6 col-sm-8" style="text-align:left;padding-left:5%">'; 
	cadena+='	<p class="letra-xs">PRODUCTOS</p>'; 
	cadena+='</div>'; 
	cadena+='<div class="col-xs-6 col-sm-4">'; 
	cadena+='	<p class="letra-xs cantidadPrecio" style="text-align:center">CANTIDAD Y PRECIO</p>';  
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

		urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
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
			cadena+='		<div class="col-xs-11 col-xs-offset-0 col-sm-offset-0 col-sm-12" style="padding:0"><input readonly class="input-p  letra-xs text-center desplazar2" type="text" name="fname2" value="'+total+'€"/></div>';
			
			cadena+='</div>';
			cadena+='<div class="col-xs-12 col-sm-4">'; 
			cadena+='		<a class="col-xs-12 col-xs-offset-0 col-sm-12 buttonstandard_invertido botonComprar2 " style="widht:auto;" target="_blank" href="'+urlProducto+'">comprar</a>'; 
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

