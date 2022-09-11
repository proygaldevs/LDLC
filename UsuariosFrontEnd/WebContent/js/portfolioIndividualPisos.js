var proyectoObject="";
var precio=true;
var orden="";
var visible2d="";
var idDecorador=0;
var listaAfiliados="";
var tipo=0;
var cambio=0;
var name="";
var idProyecto=0;
function loginForProjects(data) { 
	tipo=data;
	var idPiso = getParameterByName("id");   
	idProyecto = getParameterByName("idProyecto");   
	if(idProyecto<0) {
		idProyecto=idProyecto*-1;
	}
	name = getParameterByName("name");
	if(idProyecto==null) { idProyecto=0; }
	precio = getParameterByName("precio");   
	visible2d = getParameterByName("visible2d");   
	orden = getParameterByName("orden");   
	if(orden==null) { orden="360"; }
	// nombre true --> muestra nombre promotora
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
								  				action : "project_get_info_pisos",
												tipo : tipo,
												id_piso : idPiso,
												id_proyecto : idProyecto
											},
											// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
											contentType : "application/json; charset=utf-8",
											success : function(data) {
												// $usuarioGlobal=data; 
												var id_ajax = data.id_user;
												var mail_ajax = userAssistantCockie;
												var user_ajax = data.nombreDecorador;
												proyectoObject = data; 
												idProyecto=data.id;
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
								  				action : "project_get_info_pisos",
												tipo : tipo,
												id_piso : idPiso,
												id_proyecto : idProyecto
											},
											// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
											contentType : "application/json; charset=utf-8",
											success : function(data) {
												// $usuarioGlobal=data; 
												var id_ajax = data.id_user;
												var mail_ajax = userAssistantCockie;
												var user_ajax = data.nombreDecorador;
												proyectoObject = data; 
												idProyecto=data.id;
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
					

							
							setTimeout(function() {
			  					$(document.body).css({ 'cursor': 'default' });
								$('#login-modal').modal('hide');
							}, 1500);
							
						}
					},         
			        error : function(xhr, status) { 
	  					$(document.body).css({ 'cursor': 'default' });
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
		$(document.body).css({ 'cursor': 'default' });
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
	
				 
		$(document.body).css({ 'cursor': 'wait' });
		var arrayDeObjcts=""; 
		if(proyectoObject.ldlcs[0].Estado==4) {
			lista=proyectoObject.ldlcs[0];
			arrayDeObjcts=JSON.parse(proyectoObject.ldlcs[0].Canvas);
		} else if (proyectoObject.ldlcs[0].Estado==5) {
			lista=proyectoObject.ldlcs[0];
			arrayDeObjcts=JSON.parse(proyectoObject.ldlcs[0].Canvas);
		} else if (proyectoObject.ldlcs[1].Estado==4) {
			lista=proyectoObject.ldlcs[1];
			arrayDeObjcts=JSON.parse(proyectoObject.ldlcs[1].Canvas);
		} else if (proyectoObject.ldlcs[1].Estado==5) {
			lista=proyectoObject.ldlcs[1];
			arrayDeObjcts=JSON.parse(proyectoObject.ldlcs[1].Canvas);
		} 
		arrayItems=arrayDeObjcts.objects; 
				

		
		var html = ''; 
		
		var ventana_alto = $(window).height(); 
		alturaImgTop=ventana_alto*0.85;
		alturaImgTop2=ventana_alto*0.75;
		if(orden=="360") { 
			if(proyectoObject.data360!=undefined) {
				html += '<div class="iframe360" class="col-xs-12 letra-negrita" style="min-height:300px;height:'+alturaImgTop2+'px;text-align:center;margin-top:50px;margin-bottom:50px;padding:0">'; 
				html += '<iframe id="iframe360" style="width:100%;min-height:300px;height:'+alturaImgTop2+'px;max-width:100%;border-bottom:3px solid #4d5461" src="'+urlbase+'/realidad_virtual/?idvr=';
				html += proyectoObject.id;
				if(tipo==4) {
					html += '&house='+proyectoObject.piso[0].idPiso+'" scrolling="yes" allowfullscreen></iframe>';
				} else {
					html += '" scrolling="yes" allowfullscreen></iframe>';
				}
				html += '</div>';
				html += '</div><br/>';

			} else {
				if(proyectoObject.propuestas[1].imagenes.length>=2) {
					html += '<div id="myCarousel5" class="myCarousel5 carousel slide" data-ride="carousel"  data-interval="true" style="padding-top:40px;">';
					html += '<div id="carouselinnerForImages3D" class="carousel-inner " role="listbox" style="margin-top:8px">';
					html += '<div  class="item active">';
					} else {
						html += '<div  class="col-xs-12">';
					}
	
					if(proyectoObject.propuestas[1].imagenes.length>=2) {
						html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
						for(var i=1; proyectoObject.propuestas[1].imagenes.length-1>=i;i++){
	
							html += '</div>';
							html += '<div class="item">';
							html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[i]+'"/>';
							
						}	 
					} else {
						html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle;max-width:1000px;margin-top:100px;margin-bottom:90px" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
					} 
					html += '</div>';
					
	
					if(proyectoObject.propuestas[1].imagenes.length>=2) {
					html +='<a class="  carousel-control left " style="cursor:pointer;width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href=".myCarousel5" data-slide="prev">';
					html += '    <span class="rightGallery  glyphicon glyphicon-chevron-left"></span>';
					html +=' </a>';
					html +=' <a class="  carousel-control right " style="cursor:pointer;width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px" href=".myCarousel5" data-slide="next">';
					html +='      <span class="rightGallery  glyphicon glyphicon-chevron-right"></span>';
					html +='  </a>';
					
					html += '</div>';
					
					html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
					html += '<div class="col-xs-12" style="margin-left:5px;margin-top:7px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';
	
					 html += '<a  onclick="compartirFacebookPage();" style="cursor: pointer;"'; 
					 html += 'target="_blank"> <i class="fa  facebook-icon fa-facebook"> </i>'; 
					 html += '</a> '; 
					 html += '<a onclick="compartirTwitterPage();" style="cursor: pointer;" target="_blank">'; 
					 html += '	 <i class="fa fa-twitter facebook-icon"> </i>'; 
					 html += '</a> '; 
					 html += '<a onclick="compartirPinterestPage();" style="cursor: pointer;" target="_blank">'; 
					 html += ' <i class="fa fa-pinterest facebook-icon"> </i>'; 
					 html += '</a> ';  
					 html += '</div> ';
					 html += '</div> ';
					} else { html += '</div>'; }
			}
			if(tipo=="4"){  
				idPiso=proyectoObject.piso[0].idPiso;
				html +='<div class="col-xs-12" style="margin-bottom:50px"><div class="col-xs-12 col-xs-offset-0 col-md-6 col-md-offset-3 mapa"><img usemap="#mapa1" style="width:100%;position:relative" src="'+urlbuckets3+'pisos/'+idPiso+'.jpg"></div></div>';
				html +='<map name="mapa1">';
				
				for(j=0;j<proyectoObject.piso.length;j++) {
					if(proyectoObject.piso[j].idProject==idProyecto) {
						area="Select";
						html +='<area data-state="'+area+'" idproyect="'+proyectoObject.piso[j].idProject+'" class="d'+proyectoObject.piso[j].idProject+'" style="cursor:default!important" href="#" alt="'+proyectoObject.piso[j].nombre+'" title="'+proyectoObject.piso[j].nombre+'" coords="'+proyectoObject.piso[j].coordenadas+'" shape="poly">';
						
					}else {
						area="noSelect"+j;
						html +='<area data-state="'+area+'" idproyect="'+proyectoObject.piso[j].idProject+'" class="d'+proyectoObject.piso[j].idProject+'" style="cursor:pointer" href="#" alt="'+proyectoObject.piso[j].nombre+'" title="'+proyectoObject.piso[j].nombre+'" coords="'+proyectoObject.piso[j].coordenadas+'" shape="poly">';
						
					}
				}
				html +='</map>'; 
 
				var promotora=proyectoObject.pisosPromocion.nombre; 
				html+='<div class="col-xs-12">'; 
				if(name=="true"){
				html += '<div class="letra-m" style="color:black;text-transform:uppercase">'+promotora+'</div>';
				}
				html += '<div class="center-block" style="width:auto;border-radius:50%;overflow:hidden;margin-bottom: 23px;text-align:center"><img style="text-align:center;width:auto;height:100%" src="'+urlbuckets3+'promocion-pisos/'+proyectoObject.pisosPromocion.idPromotora+"/"+proyectoObject.pisosPromocion.logo+'" alt="'+promotora+'"></div>';
				html += '<div class="letra-s" style="color:black;text-transform:uppercase;margin-top: 5px;">'+proyectoObject.nombrePiso+'</div>';
				html += '</div>';
				html+='</div>';
			}
		
		} else { 
				if(proyectoObject.propuestas[1].imagenes.length>=2) {
					html += '<div id="myCarousel5" class="myCarousel5 carousel slide" data-ride="carousel"  data-interval="true" style="padding-top:40px;">';
					html += '<div id="carouselinnerForImages3D" class="carousel-inner " role="listbox" style="margin-top:8px;">';
					html += '<div  class="item active">';
					} else {
						html += '<div  class="col-xs-12">';
					}

					if(proyectoObject.propuestas[1].imagenes.length>=2) {
						html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
						html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[0]+'\')"><img src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
						for(var i=1; proyectoObject.propuestas[1].imagenes.length-1>=i;i++){

							html += '</div>';
							html += '<div class="item">';
							html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[i]+'"/>';
							
							html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[i]+'\')"><img src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
						}	 
					} else {
						html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle;max-width:1000px;margin-top:100px;margin-bottom:90px" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
						html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[0]+'\')"><img  src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
					} 
					html += '</div>';
					

					if(proyectoObject.propuestas[1].imagenes.length>=2) {
					html +='<a class="  carousel-control left " style="cursor:pointer;width: 15px; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href=".myCarousel5" data-slide="prev">';
					html += '    <span class="rightGallery  glyphicon glyphicon-chevron-left"></span>';
					html +=' </a>';
					html +=' <a class="  carousel-control right " style="cursor:pointer;width: 15px; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px" href=".myCarousel5" data-slide="next">';
					html +='      <span class="rightGallery  glyphicon glyphicon-chevron-right"></span>';
					html +='  </a>';
					
					html += '</div>';
					
					html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
					html += '<div class="col-xs-12" style="margin-left:5px;margin-top:8px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';

					 html += '<a  onclick="compartirFacebookPage();" style="cursor: pointer;"'; 
					 html += 'target="_blank"> <i class="fa  facebook-icon fa-facebook"> </i>'; 
					 html += '</a> '; 
					 html += '<a onclick="compartirTwitterPage();" style="cursor: pointer;" target="_blank">'; 
					 html += '	 <i class="fa fa-twitter facebook-icon"> </i>'; 
					 html += '</a> '; 
					 html += '<a onclick="compartirPinterestPage();" style="cursor: pointer;" target="_blank">'; 
					 html += ' <i class="fa fa-pinterest facebook-icon"> </i>'; 
					 html += '</a> ';  
					 html += '</div> ';
					 html += '</div> ';
					 
					} 
		}
		if(cambio==0) {
			$('#divforportfoliosectionsPrev').html(html);	
		}
		var html="";
		if(tipo!=4) {
				nombre=proyectoObject.nombreDecorador;
				try {
				nombre = nombre.replace(/\s/g,"_"); 
				} catch (e) { 
					nombre=proyectoObject.nombreDecorador;
				}
				html += '<div class="decoradorEnlace" style="margin-top:2%">';
				html += '<div class="center-block" style="width:150px;height:150px;border-radius:50%;overflow:hidden;margin-bottom: 20px;"><img style="text-align:center;width:auto;height:100%" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'"></div>';
				html += '<a href="decorador-online.html?decorador='+nombre+'&id='+proyectoObject.idDecorador+'" class="letra-m" style="color:black;text-transform:uppercase">'+proyectoObject.nombreDecorador+'</a>';
				html += '</div>';
				function invertir(fecha) { 
					var fecha2 = "";
					fecha2 += fecha.substring(8) + "-"
					fecha2 += fecha.substring(5,7) + "-"
					fecha2 += fecha.substring(0,4)
					return fecha2
				} 
				var hoy = new Date();
				var dd = hoy.getDate();
				var mm = hoy.getMonth()+1;
				var yyyy = hoy.getFullYear();
				if(dd<10) {
				    dd='0'+dd
				}
				if(mm<10) {
				    mm='0'+mm
				}
				hoy = dd+'-'+mm+'-'+yyyy;
				function validate_fechaMayorQue(fechaInicial,fechaFinal) {
			        valuesStart=fechaInicial.split("-");
			        valuesEnd=fechaFinal.split("-");
			        var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
			        var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
			        if(dateStart>=dateEnd)
			        {
			            return 0;
			        }
			        return 1;
			    }
				
				if(proyectoObject.decoradorActivo==2) {
					if(proyectoObject.decoradorDisponibilidad!=null && proyectoObject.decoradorDisponibilidad!=""){
						fecha=invertir(proyectoObject.decoradorDisponibilidad);
						if(validate_fechaMayorQue(fecha, hoy)==0) {
							html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos hasta el '+fecha;
							html+='</div>';
						}else {
							html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos por el momento';
							html+='</div>';	
						}
					} else {
						html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos por el momento';
						html+='</div>';
					}
				} else if(proyectoObject.decoradorActivo==0) {
					html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador aún no está dado de alta';
					html+='</div>';
				}
				else {
				html+='<div id="contratarbutton"  style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center; " class="col-xs-12 col-md-offset-4 col-md-4 col-lg-offset-5 col-lg-2 letra-s letra-mayusculas letra-negrita">';
				i=0;
				if(i==0) {
				html+='<a class="buttonstandard  "onclick="nuevoProyecto('+proyectoObject.idDecorador+')">contratar</a></div>'; 
				} else {
					
				}
				
				html += '</div>';
				}
				html += '<br><br><br><br>';
		}
				
				
				html += '<div class="col-xs-12 infoProject" style="margin-top:0px;padding:20px">';
				
				 
				if(lista.nombreLdlc==undefined){} else {
				html += '<div class="nldlc col-xs-12 letra-xs" style="margin-top:4px">'+lista.nombreLdlc+'</div>';
				}
		
				if(lista.Habitacion==undefined){} else {
				var habitacion=lista.Habitacion;
				if(habitacion=="questionmark"){
					title=lista.nombreLdlc;
					if(title.indexOf("vestidor") > -1 || title.indexOf("Vestidor") > -1) {
						habitacion="dormitorio";
					} 
					if(title.indexOf("entrada") > -1 || title.indexOf("Entrada") > -1) {
						habitacion="salon";
					}
					if(title.indexOf("despacho") > -1 || title.indexOf("Despacho") > -1) {
						habitacion="salon";
					}
					if(title.indexOf("comedor") > -1 || title.indexOf("Comedor") > -1) {
						habitacion="salon";
					}
					if(title.indexOf("dormitorio") > -1 || title.indexOf("Dormitorio") > -1) {
						habitacion="salon";
					}
					if(title.indexOf("salon") > -1 || title.indexOf("Salon") > -1 || title.indexOf("Salón") > -1 || title.indexOf("salón") > -1) {
						habitacion="salon";
					} 
					if(habitacion!="questionmark") {
						html += '<div class="center-block"><img src="img/'+habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
					}
				} else if(habitacion=="dormitorio-infantil") {
					html += '<div class="center-block"><img src="img/'+habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
					habitacion="dormitorio infantil";
				} else {
					html += '<div class="center-block"><img src="img/'+habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
				}
				 
				}
				
				if(lista.etiquetas.length==0){} else {
				html += '<div class="etiquetas letra-s" style="margin-top:-10px">';
				var etiq="";
				for (var j = 0; j < lista.etiquetas.length; j++) { 
						if(lista.etiquetas[j].id==1){
							etiq="nórdico";
						} else if(lista.etiquetas[j].id==2) {
							etiq="industrial";
						}else if(lista.etiquetas[j].id==3) {
							etiq="vintage";
						}else if(lista.etiquetas[j].id==4) {
							etiq="moderno";
						}else if(lista.etiquetas[j].id==5) {
							etiq="minimalista";
						}else if(lista.etiquetas[j].id==6) {
							etiq="contemporáneo";
						}else if(lista.etiquetas[j].id==7) {
							etiq="ecléctico";
						}else if(lista.etiquetas[j].id==8) {
							etiq="retro";
						}else if(lista.etiquetas[j].id==9) {
							etiq="rústico";
						} 
						if(j==lista.etiquetas.length-1){
							html += etiq; 
						} else { 
							html += etiq+", "; 
						} 
				} 	
	
				html += '</div>';
				html += '</div>';
				}
	
				
			
	
				html += '<br><br>';	
					
							
							
							 
				if(proyectoObject.preferencias==undefined || proyectoObject.preferencias.length==0 || proyectoObject.preferencias[0].id_moodboard==undefined){} else {
				html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
				html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
				html += '</div>';
				
				
				
				 
				var tipoHabi2="";
				var k="";
				for(var l = 0; l < proyectoObject.preferencias.length; l++) {
					if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
						k="existe"; 
					}
				}
				if(k=="existe") {
					html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center;margin-bottom:40px">LA INSPIRACIÓN</div>';
					
					html += '<div class="col-xs-12 col-md-8 col-md-offset-2 col-xs-offset-0 carr">';
					html += '<div id="myCarousel4" class="  container-fluid carousel slide" style="margin:0" data-interval="false">';
					html += '<div id="carouselinnerForImages3 " class="carousel-inner" role="listbox">';
				}
				var f="";
				var bandera=true;
				items=0;
				for(var j = 0; j < proyectoObject.preferencias.length; j++) {
						var id_moodboard = proyectoObject.preferencias[j].id_moodboard;  
						 
						if (k=="existe"){ 
							  
							// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
							if (id_moodboard=="" || id_moodboard==0) { 
								tipoHabi2="noColocar";
							} else { tipoHabi2="colocar"; f++;}
							
						} else {
							// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
							if (id_moodboard=="" || id_moodboard==0) { 
								tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
								html += '<div class="activo  text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;width:450px" alt="'+tipoHabi2+'"/></div>';
							} else {
								items++;
								html += '<div  class="activo  text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;width:450px" alt="Moodboard"/>';
								 
								html += ' </div>';
							}
						} else { }
					}
					else if(items<2){
						// SIGUIENTES ITEMS
						if (tipoHabi2!="noColocar"){
							if (id_moodboard=="" || id_moodboard==0) {
								items++;
								html += '<div class="activo4  text-center item" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;width:450px" alt="'+tipoHabi2+'"/></div>';
							} else {
								items++;
								html += '<div class="activo4  text-center item" style="text-align:center"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;width:450px" alt="Moodboard"/>';
								 
								html += ' </div>';
							}
						} else { } 	 
					}
					
				}

				if(items>1){ 
			
					html +='</div>';
					html +='<a class="  carousel-control left" style="cursor:pointer;width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px" href="#myCarousel4" data-slide="prev">';
					html += '    <span class=" glyphicon glyphicon-chevron-left"></span>';
					html +=' </a>';
					html +=' <a class="  carousel-control right" style="cursor:pointer;width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px" href="#myCarousel4" data-slide="next">';
					html +='      <span class=" glyphicon glyphicon-chevron-right"></span>';
					html +='  </a>';
				}
				
			 
				html +='</div>'; 
				html += '</div>';		 
				html += '</div>';	 
				html += '</div>';			
				
				}
							
			
				
				
				
				
			    if(lista.imagen==undefined || lista.imagen=="" || visible2d=="false") {} else {
				html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
				html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
				html += '</div>';
				html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center">PROPUESTA 2D</div>';
				 
			 		
			    html += '<div class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-top:15px">';

				html += '<img class="center-block" style="margin-bottom:80px;width:100%;max-width:1000px" src="'+urlbuckets3+'ldlc/imagenes/'+lista.imagen+'" alt="Composición 2D">';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			    }
				
				
				html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2 listaCompra">';
				html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
				html += '</div>';
				html += '<div class="col-xs-12 letra-s letra-negrita listaCompra" style="text-align:center;margin-bottom:10px">LISTA DE LA COMPRA</div>';
				if(precio!="false"){
					html += '<div class="col-xs-12 precio1 letra-xs listaCompra" >';
					html += '</div>';
				}
				
				html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2 listaCompra" style="margin-top:30px">';
				
				
				arrayItems=arrayItems.reduce(function(result, current) {
					        result[current.id] = result[current.id] || [];
					        result[current.id].push(current);
					        return result;
					    }, {});
						  
				

				listaAfiliados=proyectoObject.listAfiliados; 
				listaDeItems="";
				totalFinal=0;
				$.each(arrayItems, function(i, item) {
					if(item[0].price==undefined){}else{
					style="";
					k++;
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
						var img = new Image();
						img.src = item[0].src;
						if(img.width>img.height){
							style="height:100%;width:auto;";
						} else {
							style="width:100%;height:auto;";
						}
						if(item[0].imagenOriginal!=undefined) {imgSRC=item[0].imagenOriginal} else {imgSRC=item[0].src}
						if(item[0].price>0){
							html+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros2"><div class="imagenItems"><img style="'+style+'" src="'+imgSRC+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;letter-spacing: 2pt!important ">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+urlProducto+'">VER +</a></div></div>';
							l++;
				    	}
					}
				})
				
			html += '</div>';
			if(l>1) {
				html +='<h2 class="col-xs-12" style="margin-top: 2%;margin-bottom:30px"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems(1)"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>';
			}
							 
								 		 
			 
				 html += '</div>';
				 	
				 if(proyectoObject.planos==undefined || proyectoObject.planos[0].imagenes.length==0){} else {
						html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
						html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
						html += '</div>';
						html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center">PLANO DE DISTRIBUCIÓN</div>';
						
						html += '<div class="col-xs-12 letra-negrita" style="text-align:center;margin-top:50px"><img style="width:100%;max-width:700px;border:1px solid black;margin-bottom:6%" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/planos/'+proyectoObject.planos[0].imagenes[0]+'"/></div>';
					
						html += '</div>';
					}

				if(proyectoObject.data360!=undefined) { 
					 
					if(orden=="360") {
					if(proyectoObject.propuestas[1].imagenes.length>=2) {
						html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
						html += '<hr style="width:100%;border-top:1px solid black;margin-top:40px;">';
						html += '</div>';
						html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center;padding-bottom:50px">RESULTADO FINAL</div>';
						if(proyectoObject.propuestas[1].imagenes.length>=2) {
							html += '<div id="myCarousel5" class="myCarousel5 carousel slide col-xs-12" data-ride="carousel"  data-interval="true" style="padding-top:40px;padding-left:0;padding-right:0">';
							html += '<div id="carouselinnerForImages3D" class="carousel-inner " role="listbox" style="margin-top:80px;">';
							html += '<div  class="item active">';
							} else {
								html += '<div  class="col-xs-12">';
							}

							if(proyectoObject.propuestas[1].imagenes.length>=2) {
								html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
								html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[0]+'\')"><img src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
								for(var i=1; proyectoObject.propuestas[1].imagenes.length-1>=i;i++){

									html += '</div>';
									html += '<div class="item">';
									html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[i]+'"/>';
									
									html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[i]+'\')"><img src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
								}	 
							} else {
								html += '<img class="imagenCarrousel2" style="margin:auto auto;vertical-align:middle;max-width:1000px;margin-top:100px;margin-bottom:90px" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/propuestas/'+proyectoObject.propuestas[1].imagenes[0]+'"/>';
								html += '<div class="ampliarBoton" onclick="ampliar(\''+proyectoObject.propuestas[1].imagenes[0]+'\')"><img  src="img/pasos/ampliar.png" style="width:30px;margin-left:10px;background-color:white;border-radius:50%;cursor:pointer;padding:0!important" alt="Ampliar imagen" title="Ampliar imagen"></div>';
							} 
							html += '</div>';
							

							if(proyectoObject.propuestas[1].imagenes.length>=2) {
							html +='<a class="  carousel-control left " style="cursor:pointer;width: 15px; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href=".myCarousel5" data-slide="prev">';
							html += '    <span class="rightGallery  glyphicon glyphicon-chevron-left"></span>';
							html +=' </a>';
							html +=' <a class="  carousel-control right " style="cursor:pointer;width: 15px; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px" href=".myCarousel5" data-slide="next">';
							html +='      <span class="rightGallery  glyphicon glyphicon-chevron-right"></span>';
							html +='  </a>';
							
							html += '</div>';
							
							html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
							html += '<div class="col-xs-12" style="margin-left:5px;margin-top:8px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';

							 html += '<a  onclick="compartirFacebookPage();" style="cursor: pointer;"'; 
							 html += 'target="_blank"> <i class="fa  facebook-icon fa-facebook"> </i>'; 
							 html += '</a> '; 
							 html += '<a onclick="compartirTwitterPage();" style="cursor: pointer;" target="_blank">'; 
							 html += '	 <i class="fa fa-twitter facebook-icon"> </i>'; 
							 html += '</a> '; 
							 html += '<a onclick="compartirPinterestPage();" style="cursor: pointer;" target="_blank">'; 
							 html += ' <i class="fa fa-pinterest facebook-icon"> </i>'; 
							 html += '</a> ';  
							 html += '</div> ';
							 html += '</div> ';
							 
							}
						}
					} else if(orden=="carrousel"){
						if(proyectoObject.data360!=undefined) { 

							html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
							html += '<hr style="width:100%;border-top:1px solid black;margin-top:40px;">';
							html += '</div>';
							html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center;padding-bottom:50px">RESULTADO FINAL</div>';
							html += '<div class="col-xs-12 letra-negrita" style="text-align:center;margin-top:50px;margin-bottom:50px;padding:0">'; 
							html += '<iframe id="iframe360" style="width:100%;min-height:300px;height:'+alturaImgTop+'px;max-width:100%;border-bottom:3px solid #4d5461" src="'+urlbase+'/realidad_virtual/?idvr=';
							html += proyectoObject.id;
							html += '" scrolling="yes" allowfullscreen></iframe>';
							html += '</div>';
							html += '</div><br/><br/><br/>';
							 html += '</div> ';
							 html += '</div> ';
						} 
					}
				} 
						  
			
				$('#divforportfoliosections').html(html);  
				$('.precio1').html("Coste total: "+totalFinal+" €");
				if(totalFinal<0.05) {

					$('.listaCompra').css("display", "none");
				}
				$('.carousel').carousel({
					  interval: 1000 * 4
					});
				if(tipo=="4"){
					  
					$('img')
					.mapster({
						mapKey: 'data-state',
						areas: [{
					        key: 'Select',
					        fillColor: 'bec4c1',
							fillOpacity: 0.9, staticState: null, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 3, fade:true, isSelectable:false
					    },
				        {
				            key: 'noSelect0',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect1',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect2',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect3',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect4',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect5',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect6',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect7',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect8',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect9',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        },
				        {
				            key: 'noSelect10',
				            fillColor: 'eeeeee',
							fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
				        }
					    ],
					    onClick: function() {
					        idProyecto=this.getAttribute('class'); 
					    	for(j=0;j<proyectoObject.piso.length;j++) {

					    		$('area:eq('+j+')').css('cursor','pointer');
								$('area:eq('+j+')').attr('data-state','noSelect'+j);  
							}
							idProyecto=idProyecto.substr(1);
							$('.d'+idProyecto).attr('data-state','Select');
				    		$('.d'+idProyecto).css('cursor','default');
							$('img').mapster({
								mapKey: 'data-state',
								areas: [{
							        key: 'Select',
							        fillColor: 'bec4c1',
									fillOpacity: 0.9, staticState: null, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 3, fade:true, isSelectable:false
							    },
						        {
						            key: 'noSelect0',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect1',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect2',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect3',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect4',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect5',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect6',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect7',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect8',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect9',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        },
						        {
						            key: 'noSelect10',
						            fillColor: 'eeeeee',
									fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
						        }
							    ],
							});
					        id=idProyecto;
					        ChangeUrl('Page1', urlbase+"/piso-decoracion-online.html?id="+idPiso+"&idProyecto="+id); 
							html=urlbase+"/realidad_virtual/?idvr="+id+"&house="+proyectoObject.piso[0].idPiso;
							$('#iframe360').attr("src",html);
					        $('.infoProject').html('<div id="loading" class="col-xs-12" style=" height:300px;margin-top:100px;;margin-bottom:400px; background: url(img/forHomeApp/default.svg) center center no-repeat;"></div>');
					        cambio=1;
					        $('html, body').animate({scrollTop:0}, 'slow');
					        loadProject(id);
					    }
					});
					
					 

				}
				
				$(window).resize(function(){
					var ventana_alto = $(window).height(); 
					alturaImgTop=ventana_alto*0.85;
					alturaImgTop2=ventana_alto*0.75;
					 $('.iframe360').css('height', alturaImgTop2);
					 $('#iframe360').css('height', alturaImgTop2);
				       
					
					if(tipo=="4"){
						
						$('img')
						.mapster({
							mapKey: 'data-state',
							areas: [{
						        key: 'Select',
						        fillColor: 'bec4c1',
								fillOpacity: 0.9, staticState: null, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 3, fade:true, isSelectable:false
						    },
					        {
					            key: 'noSelect0',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect1',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect2',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect3',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect4',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect5',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect6',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect7',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect8',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect9',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        },
					        {
					            key: 'noSelect10',
					            fillColor: 'eeeeee',
								fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
					        }
						    ],
						    onClick: function() { 
						    	idProyecto=this.getAttribute('class');
						    	for(j=0;j<proyectoObject.piso.length;j++) { 
						    		$('area:eq('+j+')').css('cursor','pointer');
									$('area:eq('+j+')').attr('data-state','noSelect'+j);  
								}
						        idProyecto=idProyecto.substr(1);
								$('.d'+idProyecto).attr('data-state','Select');
					    		$('.d'+idProyecto).css('cursor','default');
								$('img').mapster({
									mapKey: 'data-state',
									areas: [{
								        key: 'Select',
								        fillColor: 'bec4c1',
										fillOpacity: 0.9, staticState: null, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 3, fade:true, isSelectable:false
								    },
							        {
							            key: 'noSelect0',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect1',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect2',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect3',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect4',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect5',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect6',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect7',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect8',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect9',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        },
							        {
							            key: 'noSelect10',
							            fillColor: 'eeeeee',
										fillOpacity: 0.9,staticState: false, fadeDuration: 10, singleSelect:true, selected:true,stroke: true, strokeColor: '191a1b', strokeOpacity: 1,strokeWidth: 1,
							        }
								    ]
								});
						        ChangeUrl('Page1', urlbase+"/piso-decoracion-online.html?id="+idPiso+"&idProyecto="+idProyecto); 
								html=urlbase+"/realidad_virtual/?idvr="+idProyecto+"&house="+proyectoObject.piso[0].idPiso;
								$('#iframe360').attr("src",html);
						        $('.infoProject').html('<div id="loading" class="col-xs-12" style=" height:300px;margin-top:100px;margin-bottom:400px; background: url(img/forHomeApp/default.svg) center center no-repeat;"></div>');
						        cambio=1;
						        $('html, body').animate({scrollTop:0}, 'slow');
						        loadProject(idProyecto);
						        
						    }
						});
						  
					}
				});  	
	
	
	!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
	var $container = $('.myCarousel5'); 
	$container.imagesLoaded(function() {
		carouselNormalization3D();
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
		  				action : "project_get_info_pisos",
						tipo : tipo,
						id_piso : idPiso,
						id_proyecto : idProject
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

	  					$(document.body).css({ 'cursor': 'default' });
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
	  					$(document.body).css({ 'cursor': 'default' });
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
		$(document.body).css({ 'cursor': 'default' });
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

