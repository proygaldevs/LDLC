var proyectoObject="";
var data="";
var idDecorador=0;
function loginForProjects(tipo) { 
	var id_del_proyecto_a_cargar = getParameterByName("id");   
	
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
						detail_level: 1,
						id_proyecto: id_del_proyecto_a_cargar
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
								  				action : "project_get_info",
												id_proyecto: id_del_proyecto_a_cargar,
												tipo : tipo
											},
											// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
											contentType : "application/json; charset=utf-8",
											success : function(data) {
												// $usuarioGlobal=data;
												var id_ajax = data.id_user;
												var mail_ajax = userAssistantCockie;
												var user_ajax = data.nombreDecorador;
												idDecorador=data.idDecorador;
												proyectoObject = data; 
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
								  				action : "project_get_info",
												id_proyecto: id_del_proyecto_a_cargar,
												tipo : tipo
											},
											// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
											contentType : "application/json; charset=utf-8",
											success : function(data) {
												// $usuarioGlobal=data;
												var id_ajax = data.id_user;
												var mail_ajax = userAssistantCockie;
												var user_ajax = data.nombreDecorador;
												idDecorador=data.idDecorador;
												proyectoObject = data; 
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
var arrayDeObjcts="";
var arrayDeObjcts2="";

function compartirFacebookPage2(){ 
	var res = getParameterByName("id"); 
	var imagen = lista.imagen; 
	var nombreLdlc = lista.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitterPage2(){ 
	var res = getParameterByName("id"); 
	var imagen = lista.imagen; 
	var nombreLdlc = lista.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterestPage2() {  
	var res = getParameterByName("id"); 
	var imagen = lista.imagen; 
	var nombreLdlc = lista.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}
function compartirFacebookPage(){ 
	var res = getParameterByName("id"); 
	var imagen = lista2.imagen; 
	var nombreLdlc = lista2.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
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
	var imagen = lista2.imagen; 
	var nombreLdlc = lista2.nombreLdlc;  
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
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
	var imagen = lista2.imagen; 
	var nombreLdlc = lista2.nombreLdlc; 
	if(nombreLdlc==undefined) {
		nombreLdlc="Proyecto decoración 2D";
	}
	
	var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+imagen;
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}
var listaAfiliados="";
function insertaselementos(){
	var id = getParameterByName("id");  
	$(document.body).css({ 'cursor': 'wait' });
	arrayDeObjcts=JSON.parse(proyectoObject.ldlcs[0].Canvas);
	arrayDeObjcts2=JSON.parse(proyectoObject.ldlcs[1].Canvas);
	arrayItems=arrayDeObjcts.objects;
	arrayItems2=arrayDeObjcts2.objects;
	lista=proyectoObject.ldlcs[0];
	lista2=proyectoObject.ldlcs[1];  
	
	
	var html = ''; 

	html += '<div id="myCarousel5" class="myCarousel5 carousel slide" data-ride="carousel"  data-interval="false">';
	html += '<div class="carousel-inner" role="listbox">';
	html += '<div  class="activo2 item active">';
	 
	j=1; 
		
	
			html += '<div style="position:relative" class="opacar ';
			if(lista.etiquetas.length==0){ } else {
				for (var f = 0; f < lista.etiquetas.length; f++) {
		
					if(f<=2){
					html += lista.etiquetas[f].id+" ";
					}
				} 
			} 
			html += lista.Habitacion;  
			html += '"><img class="center-block" style="margin-top:75px;width:100%;max-width:1000px" src="'+urlbuckets3+'ldlc/imagenes/'+lista.imagen+'" alt="Composición 2D">';
			html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
			
			
			html += '<div class="col-xs-12" style="margin-left:5px;margin-top:-30px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';
			 html += '<a  onclick="compartirFacebookPage2();" style="cursor: pointer;"'; 
			 html += 'target="_blank"> <i class="fa  facebook-icon fa-facebook"> </i>'; 
			 html += '</a> '; 
			 html += '<a onclick="compartirTwitterPage2();" style="cursor: pointer;" target="_blank">'; 
			 html += '	 <i class="fa fa-twitter facebook-icon"> </i>'; 
			 html += '</a> '; 
			 html += '<a onclick="compartirPinterestPage2();" style="cursor: pointer;" target="_blank">'; 
			 html += ' <i class="fa fa-pinterest facebook-icon"> </i>'; 
			 html += '</a> ';  
			 html += '</div> ';
			 html += '</div> ';
			 
			nombre=proyectoObject.nombreDecorador;
			try {
				nombre = nombre.replace(/\s/g,"_"); 
			} catch (e) { 
				nombre=proyectoObject.nombreDecorador;
			}
			html += '<div class="decoradorEnlace">';
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
					html+='</div>';
				} else {
					html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos por el momento';
					html+='</div>';
					html+='</div>';
				}
			} else if(proyectoObject.decoradorActivo==0) {
				html+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador aún no está dado de alta';
				html+='</div>';
			}
			else {
			html+='<div id="contratarbutton"  style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center; " class="col-xs-12 col-md-offset-4 col-md-4 col-lg-offset-5 col-lg-2 letra-s letra-mayusculas letra-negrita">';
			 
			html+='<a class="buttonstandard  "onclick="nuevoProyecto('+proyectoObject.idDecorador+')">contratar</a></div>'; 
			
			html += '</div>'; 
			}
			html += '<br><br><br><br>';
			
			
			
			
			if(lista.nombreLdlc==undefined){} else {
			html += '<div class="nldlc col-xs-12 letra-m letra-negrita" style="margin-top:10px">'+lista.nombreLdlc+'</div>';
			}
	
			if(lista.Habitacion==undefined){} else {
			html += '<div class="center-block"><img src="img/'+lista.Habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
			var habitacion=lista.Habitacion;
			if(habitacion=="questionmark"){
				habitacion="otros";
			} else if(habitacion=="dormitorio-infantil") {
				habitacion="dormitorio infantil";
			} else if(habitacion=="infantil") {
				habitacion="dormitorio infantil";
			}
			html += '<div class="letra-xs" style="margin-top:-10px;width:100%;text-transform:uppercase">'+habitacion+'</div><br> ';
			}
			
			if(lista.etiquetas.length==0){  } else {
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
			}
 

			html += '<br><br>';	
				
				

			html += '</div>';
			html += '<div class="activo3 item">';
				
				  
		  
				j=1; 
				html += '<div style="position:relative" class="opacar ';
				if(lista2.etiquetas.length==0){ } else {
					for (var f = 0; f < lista2.etiquetas.length; f++) {
			
						if(f<=2){
						html += lista2.etiquetas[f].id+" ";
						}
					} 
				} 
				html += lista2.Habitacion;  
				html += '"><img class="center-block" style="margin-top:75px;width:100%;max-width:1000px" src="'+urlbuckets3+'ldlc/imagenes/'+lista2.imagen+'" alt="Composición 2D">';

				html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
				
				
				html += '<div class="col-xs-12" style="margin-left:5px;margin-top:-30px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';
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
				
				 
				nombre=proyectoObject.nombreDecorador;
				nombre = nombre.replace(/\s/g,"_"); 
				html += '<div class="decoradorEnlace">';
				html += '<div class="center-block" style="width:150px;height:150px;border-radius:50%;overflow:hidden;margin-bottom: 20px;"><img style="text-align:center;width:auto;height:100%" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'"></div>';
				html += '<a href="decorador-online.html?decorador='+nombre+'&id='+proyectoObject.idDecorador+'" class="letra-m" style="color:black;text-transform:uppercase">'+proyectoObject.nombreDecorador+'</a>';
				html += '</div>';
				html+='<div id="contratarbutton"  style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center; " class="col-xs-12 col-md-offset-4 col-md-4 col-lg-offset-5 col-lg-2 letra-s letra-mayusculas letra-negrita">';
				 
				html+='<a class="buttonstandard  "onclick="nuevoProyecto('+proyectoObject.idDecorador+')">contratar</a></div>'; 
				
				html += '</div>';  
				html += '<br><br><br><br>';		
				
				 
				
				if(lista2.nombreLdlc==undefined){} else {
				html += '<div class="nldlc col-xs-12 letra-m" style="margin-top:10px">'+lista2.nombreLdlc+'</div>';
				}
			
				if(lista2.Habitacion==undefined){} else {
				html += '<div class="center-block"><img src="img/'+lista2.Habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
				var habitacion=lista2.Habitacion;
				if(habitacion=="questionmark"){
					habitacion="otros";
				} else if(habitacion=="dormitorio-infantil") {
					habitacion="dormitorio infantil";
				}
				html += '<div class="letra-xs" style="margin-top:-10px;width:100%;text-transform:uppercase">'+habitacion+'</div><br> ';
				}
				
				if(lista2.etiquetas.length==0){  } else {
				html += '<div class="etiquetas letra-s" style="margin-top:-10px">';
				var etiq="";
				for (var j = 0; j < lista2.etiquetas.length; j++) { 
						if(lista2.etiquetas[j].id==1){
							etiq="nórdico";
						} else if(lista2.etiquetas[j].id==2) {
							etiq="industrial";
						}else if(lista2.etiquetas[j].id==3) {
							etiq="vintage";
						}else if(lista2.etiquetas[j].id==4) {
							etiq="moderno";
						}else if(lista2.etiquetas[j].id==5) {
							etiq="minimalista";
						}else if(lista2.etiquetas[j].id==6) {
							etiq="contemporáneo";
						}else if(lista2.etiquetas[j].id==7) {
							etiq="ecléctico";
						}else if(lista2.etiquetas[j].id==8) {
							etiq="retro";
						}else if(lista2.etiquetas[j].id==9) {
							etiq="rústico";
						} 
						if(j==lista2.etiquetas.length-1){
							html += etiq; 
						} else { 
							html += etiq+", "; 
						} 
				} 	
				html += '</div>';
				}
			

				
								
									
						

				html += '</div>';

				html += '<br><br>';	

	html +='<a class="  carousel-control left " style="cursor:pointer;width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href=".myCarousel5" data-slide="prev">';
	html += '    <span class="  glyphicon glyphicon-chevron-left" style="top:320px;" ></span>';
	html +=' </a>';
	html +=' <a class="  carousel-control right " style="cursor:pointer;width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px" href=".myCarousel5" data-slide="next">';
	html +='      <span class="  glyphicon glyphicon-chevron-right" style="top:320px;" ></span>';
	html +='  </a>';
	
	html += '</div>';
	html +='</div>';
	html +='</div>';  
				 	
	if(proyectoObject.preferencias==undefined || proyectoObject.preferencias.length==0 || proyectoObject.preferencias[0].id_moodboard==undefined || proyectoObject.preferencias[0].id_moodboard==""){} else {
	html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
	html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
	html += '</div>';
	html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center;margin-bottom:40px">LA INSPIRACIÓN</div>';

	html += '<div class="col-xs-12 col-md-8 col-md-offset-2 col-xs-offset-0 carr">';
	html += '<div id="myCarousel4" class="  container-fluid carousel slide" style="margin:0" data-interval="false">';
	html += '<div id="carouselinnerForImages3 " class="carousel-inner" role="listbox">';
	
	
	 
	var tipoHabi2="";
	var k="";
	for(var l = 0; l < proyectoObject.preferencias.length; l++) {
		if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
			k="existe"; 
		}
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
		html +='      <span class="glyphicon glyphicon-chevron-right"></span>';
		html +='  </a>';
	}

 
	html +='</div>'; 
	html += '</div>';		 
	html += '</div>';		 
	html += '</div>';			
	
	}
				

	
	
	
	

	html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
	html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
	html += '</div>';
	html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center">LISTA DE LA COMPRA</div>';
	
	html += '<div id="myCarousel5" class="col-xs-12 myCarousel5 carousel slide" data-ride="carousel"  data-interval="false" style="float: left">';
	html += '<div class="carousel-inner" role="listbox">';
	html += '<div  class="item active">';			
				

			html += '<div class="precio1 letra-xs" style="margin-top:10px">';
			html += '</div>';
	
			html += '<div class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-top:70px">';
			arrayItems=arrayItems.reduce(function(result, current) {
		        result[current.id] = result[current.id] || [];
		        result[current.id].push(current);
		        return result;
		    }, {});

			
			listaAfiliados=proyectoObject.listAfiliados; 
			listaDeItems="";
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
			html +='<h2 class="col-xs-12" style="margin-top: 2%;margin-bottom:30px"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems(1)"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>';
			
			 
				 
					 		 
 
			html += '</div>';
	html += '<div class="item">';		
			
			

			html += '<div class="precio2 letra-xs" style="margin-top:10px">';
			html += '</div>';
				 
			html += '<div class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-top:40px">';
			arrayItems2=arrayItems2.reduce(function(result, current) {
		        result[current.id] = result[current.id] || [];
		        result[current.id].push(current);
		        return result;
		    }, {});
			totalFinal2=0;
			listaDeItems=""; 
			$.each(arrayItems2, function(i, item) {
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
				totalFinal2=parseFloat(totalFinal2)+parseFloat(total);
				totalFinal2=totalFinal2.toFixed(2);
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
			    	};
				}
			})  
			html += '</div>'; 
			html +='<h2 class="col-xs-12" style="margin-top: 2%;"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems(2)"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>';

			html += '</div>';
		 
	
	html +='</div>';
	html +='</div>';
	
	
	
	
	
	
	
	
	
	

	if(proyectoObject.planos==undefined || proyectoObject.planos[0].imagenes.length==0){} else {
		html += '<div class="col-xs-12 col-xs-offset-0 col-lg-8 col-lg-offset-2">';
		html += '<hr style="width:100%;border-top:1px solid black;margin-top:70px">';
		html += '</div>';
		html += '<div class="col-xs-12 letra-s letra-negrita" style="text-align:center">PLANO DE DISTRIBUCIÓN</div>';
		html += '<div class="col-xs-12 letra-negrita" style="text-align:center;margin-top:50px"><img style="width:100%;max-width:700px;border:1px solid black;margin-bottom:6%" src="'+urlbuckets3 + 'usuarios/'+proyectoObject.userMail+'/'+proyectoObject.nombreProyecto+'/planos/'+proyectoObject.planos[0].imagenes[0]+'"/></div>';
	
		html += '</div>';
	}

	
	
	

	$('#divforportfoliosections').html(html);  
	$('.precio1').html("Coste total: "+ totalFinal+"€"); 
	$('.precio2').html("Coste total: "+ totalFinal2+"€"); 
  

	$(document.body).css({ 'cursor': 'default' }); 

	cerrarCargando();
	 
}

function resumenItems(id){ 
	if(id==1){
		var arrayItemsFinal=arrayDeObjcts.objects;
	} else {
		var arrayItemsFinal=arrayDeObjcts2.objects;
	}
	
	arrayItemsFinal=arrayItemsFinal.reduce(function(result, current) {
        result[current.id] = result[current.id] || [];
        result[current.id].push(current);
        return result;
    }, {});
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
	$.each(arrayItemsFinal, function(i, item) {
		if(item[0].price==undefined){}else{
		style=""; 
		j++;
		 	
		var img = new Image();
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
