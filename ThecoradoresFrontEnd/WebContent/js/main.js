var trabajo;
$(function() {
	var $formLogin = $('#loginform');
	var $formLost = $('#lost-form');
	var $divForms = $('#login');
	var $modalAnimateTime = 300; 
	$("form").submit(
			function() {
				switch (this.id) {
					case "lost-form":
						var $ls_email = $('#lost_email').val();
						
						recordar($ls_email);
						return false;
						break;
					default:
						return false;
					}
					return false;
	})
	$('#login_lost_btn').click(function() {
			modalAnimate($formLogin, $formLost);
	});
	$('#lost_login_btn').click(function() {
		modalAnimate($formLost, $formLogin);
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
			
})		

function setCookie(name, value, exdays, path, domain, secure){ 
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	
    document.cookie= name + "=" + escape(value) +
    ((exdays) ? "; expires=" + exdate.toUTCString() : "") +
    ((path) ? "; path=" + path : "") + 
	((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : ""); 
}

function recordar(lg_mail) {
	$(document.body).css({ 'cursor': 'wait' });

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
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

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
						user: "decorador"
						
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) { 
						if(data==true){
							
							BootstrapDialog.show({
					            title: '',
					            message: 'Contraseña enviada correctamente al email',
					            type: BootstrapDialog.TYPE_DEFAULT,
					            buttons: [{
					                label: 'Ok',
					                action: function(dialogRef){
					                		dialogRef.close();
					                }
					            }]
					        });
							$(document.body).css({ 'cursor': 'default' });
						}else{
							
							BootstrapDialog.show({
					            title: '',
					            message: 'El email no está registrado',
					            type: BootstrapDialog.TYPE_DEFAULT,
					            buttons: [{
					                label: 'Ok',
					                action: function(dialogRef){
					                		dialogRef.close();
					                }
					            }]
					        });	
							$(document.body).css({ 'cursor': 'default' });
						}

					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

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

function getCookie(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : "";
}
var u=null;
var c=null;
function login(donde){

	u = getParameterByName("u");
	c = getParameterByName("c");


	if(donde=="proyectos" && u!=null) {
 
		console.log("proyectos");
		localStorage.setItem('projectobject', "");
		localStorage.setItem('projectid', "");
		localStorage.setItem('decoradorobject', "");
		localStorage.setItem('decorador_individual', "");
		localStorage.setItem('__pp_session__', "");
		localStorage.setItem('portfolio_decoradores', "");
		localStorage.setItem('id_decorador', "");
		deleteCookie("userAssistantD");
		deleteCookie("passAssistantD"); 
		
		var userAssistant = u;
		var passAssistant = c; 
 

		setCookie("userAssistantD", u, 365, '/', urlbaseCookie, 0);
		setCookie("passAssistantD", c, 365, '/', urlbaseCookie, 0);
			
		if(userAssistant=="" || passAssistant==""){
			var href = urlbase;
			window.location = href;
		} else {
			 
			if(userAssistant=="" || passAssistant==""){
				var href = urlbase;
				window.location = href;
			} else {
				 
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
				  				token : userAssistant,
				  				action : "decoradores_login",
				  				user : userAssistant,
				  				pass : passAssistant,
				  				detail_level: 0,
				  				project_level: 0
				  				
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					BootstrapDialog.alert(data);
				  				} else {
				  					console.log(data);
				  					localStorage.removeItem('decoradorobject');
				  					localStorage.setItem('decoradorobject', JSON.stringify(data));
				  					decorador=data;   
				  					//localStorage.lastname = "Smith";
				  					loginContinuacion(donde);
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
	} else if(u!=null && donde!="proyectos") {


		console.log("paso");
		localStorage.setItem('projectobject', "");
		localStorage.setItem('projectid', "");
		localStorage.setItem('decoradorobject', "");
		localStorage.setItem('decorador_individual', "");
		localStorage.setItem('__pp_session__', "");
		localStorage.setItem('portfolio_decoradores', "");
		localStorage.setItem('id_decorador', "");
		deleteCookie("userAssistantD");
		deleteCookie("passAssistantD"); 
		localStorage.removeItem('decoradorobject');
		var userAssistant = u;
		var passAssistant = c; 
		
		if(userAssistant=="" || passAssistant==""){
			var href = urlbase;
			window.location = href;
		} else {
			 
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
			  				token : userAssistant,
			  				action : "decoradores_login",
			  				user : userAssistant,
			  				pass : passAssistant,
			  				detail_level: 0,
			  				project_level: 0
			  				
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data;
			  				if (isError(data)) {
			  					BootstrapDialog.alert(data); 
			  					var href = urlbase;
			  					setTimeout(function(){ window.location = href; }, 2000);
			  					
			  				} else {
			  					console.log(data);
			  					localStorage.removeItem('decoradorobject');
			  					localStorage.setItem('decoradorobject', JSON.stringify(data));
			  					decorador=data;    
			  					//localStorage.lastname = "Smith";
			  					loginContinuacion(donde);
			  					setTimeout(function(){ cerrarCargando(); }, 1500);
			  				 
			  				}
			
			  			}
			  		});
			
			  	} catch (e) {
			  		BootstrapDialog
			  				.alert('Se ha producido un error en la conexión con el servidor');
			  		// put any code you want to execute if there's an exception here
			  	} 
		       
		}
		
	} else {
		var userAssistant = getCookie("userAssistantD");
		var passAssistant = getCookie("passAssistantD"); 

			if(userAssistant=="" || passAssistant==""){
				var href = urlbase;
				window.location = href;
			} else {
				
				decorador = localStorage.getItem('decoradorobject');
				decorador=JSON.parse(decorador);  
				console.log(decorador);
				if(decorador==null) {
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
				  				token : userAssistant,
				  				action : "decoradores_login",
				  				user : userAssistant,
				  				pass : passAssistant,
				  				detail_level: 0,
				  				project_level: 0
				  				
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					BootstrapDialog.alert(data);
				  				} else {
				  					console.log(data);
				  					localStorage.removeItem('decoradorobject');
				  					localStorage.setItem('decoradorobject', JSON.stringify(data));
				  					decorador=data;   
				  					//localStorage.lastname = "Smith";
				  					loginContinuacion(donde);
				  				}
				
				  			}
				  		});
				
				  	} catch (e) {
				  		BootstrapDialog
				  				.alert('Se ha producido un error en la conexión con el servidor');
				  		// put any code you want to execute if there's an exception here
				  	} 
			      } else {   
			    	  loginContinuacion(donde); 
			      }
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
var proce=0;
function loginContinuacion(donde){
	if(decorador.activo==0 && donde=="bienvenida" || decorador.activo==0 && donde=="perfil" || decorador.activo==0 && donde=="paginaEspera" || decorador.activo==0 && donde=="trabajoCrear" || decorador.activo==0 && donde=="modificarProyecto" || decorador.activo==0 && donde=="vacio2"){
		// PARA CARGAR EL DECORADOR  
		if (donde=="perfil") {  
			// PARA PODER MANIPULAR LOS DATOS DEL DECORADOR EN EL PERFIL  
			actualizarStorage("pefilCarga");
		}  
		if(decorador=="") {
			
		} else { 
			$('#liforsustitution').remove();  
			var codeusername = '';
			codeusername += '<li id="liforsustitution" class="dropdown ">';
			codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
					+ decorador.nombre
					+ '<span class="caret"></span></a>';
			codeusername += '<ul class="dropdown-menu">';
			
			 
				codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="alaListaProyectos()">Lista de proyectos</li>';
			 
		
			var urlforhome = urlbase;
			codeusername += '<li role="separator" class="divider"></li>';
			codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
					+ urlforhome 
					+ '/perfil.html">Perfil</a></li>';
			codeusername += ' <li role="separator" class="divider"></li>';
		
			codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
					+ urlforhome
					+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';
		
			codeusername += '</ul>';
			codeusername += ' </li>'; 
			// Lo añadimos con jquery a la página
			$('#ulforsustitution').append(codeusername); 
			 
			if (donde=="vacio" || donde=="trabajoCrear" || donde=="vacio2"){
				cerrarCargando();
			} 
		}
		if(donde!="perfil") {
			if (donde=="modificarProyecto"){
				var retrievedObject = localStorage.getItem('trabajoformodificar');
				trabajo=JSON.parse(retrievedObject); 
				console.log(trabajo);
				getTagsList(); 
			}
			cerrarCargando();
		}
	} else if(decorador.activo==0 && donde!="bienvenida" || decorador.activo==0 && donde!="perfil" || decorador.activo==0 && donde!="paginaEspera"  || decorador.activo==0 && donde!="trabajoCrear" || decorador.activo==0 && donde!="modificarProyecto" || decorador.activo==0 && donde!="vacio2"){
		// FALTA RECIBIR ESTOS PARAMETROS PARA CONTRASTAR, SIEMPRE LLEVA A BIENVENIDA
		if(decorador!=null){
			if(decorador.texto_decorador!="" && decorador.urlBlog!="" && decorador.urlRss!="") {
				var href = urlbase + '/paginaEspera.html';
				window.location = href; 
			}else {
				var href = urlbase + '/bienvenida.html';
				window.location = href;
			}
		} else {
			var href = urlbase + '/bienvenida.html';
			window.location = href;
		} 
		
	} else {
		// PARA SABER QUE PROYECTO CARGAR
		if (donde==1 || donde==2 || donde==3 || donde==4){
			 
			proce=donde;
			proyecto_id = getParameterByName("id"); 
			if(proyecto_id==""){
				proyecto_id = getCookie("proyecto_id");
				deleteCookie("proyecto_id"); 
			} 
			console.log(proyecto_id);
			
				if(proyecto_id==null || proyecto_id==undefined || proyecto_id==""){
					var retrievedObject = localStorage.getItem('projectid');
					proyecto_id=retrievedObject;
				} else {
					localStorage.setItem('projectid', proyecto_id);
				}
			
			actualizarStorage("carga");
		}
	  
		// PARA CARGAR EL DECORADOR  
		if (donde=="perfil") {  
			// PARA PODER MANIPULAR LOS DATOS DEL DECORADOR EN EL PERFIL  
			actualizarStorage("pefilCarga");
		}  
		// SI ENTRAS EN LISTA DE PROYECTOS CARGA DE NUEVO DECORADORCONTROLLER
		if(donde=="proyectos"){ 
			actualizarStorageProyectos();  
			 
			var retrievedObject = localStorage.getItem('trabajoformodificar');
			trabajo=JSON.parse(retrievedObject); 
			getTagsListProyect(); 
		} 
	 
		
		
		if(decorador=="") {
			
		} else { 
			$('#liforsustitution').remove();  
			var codeusername = '';
			codeusername += '<li id="liforsustitution" class="dropdown ">';
			codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
					+ decorador.nombre
					+ '<span class="caret"></span></a>';
			codeusername += '<ul class="dropdown-menu">';
			
			 
				codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="alaListaProyectos()">Lista de proyectos</li>';
			 
		
			var urlforhome = urlbase;
			codeusername += '<li role="separator" class="divider"></li>';
			codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
					+ urlforhome 
					+ '/perfil.html">Perfil</a></li>';
			codeusername += ' <li role="separator" class="divider"></li>';
		
			codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
					+ urlforhome
					+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';
		
			codeusername += '</ul>';
			codeusername += ' </li>'; 
			// Lo añadimos con jquery a la página
			$('#ulforsustitution').append(codeusername); 
			if (donde=="facturas"){ 
				listaFacturas();
			}
			if (donde==1 || donde==2 || donde==3 || donde==4){
				getProjectbyID(donde); 
			}
			if (donde=="vacio" || donde=="trabajoCrear" || donde=="vacio2"){
				cerrarCargando();
			}
			if (donde=="modificarProyecto"){
				var retrievedObject = localStorage.getItem('trabajoformodificar');
				trabajo=JSON.parse(retrievedObject);  
				console.log(trabajo);
				getTagsList(); 
			}
		}
	}
}

var etiquetasparafiltrar;
function getTagsListProyect() {

	
	//alert(urlbase + '/GetPortfolio');
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
	  				action : "decoradores_get_etiquetas"
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				//BootstrapDialog.alert('aaaaa'+data);
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					etiquetasparafiltrar=data; 
	  					
	  					var engine = new Bloodhound({
	  					  local: etiquetasparafiltrar,
	  					  datumTokenizer: function(d) {
	  					    return Bloodhound.tokenizers.whitespace(d.nombre);
	  					  },
	  					  queryTokenizer: Bloodhound.tokenizers.whitespace
	  					});

	  					engine.initialize();

	  					$('#tokenfield-typeahead').tokenfield({
	  					  typeahead: [null, {  display: 'nombre', source: engine.ttAdapter() }]
	  					}); 
	  					
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here

	  	}

}

var idDecorador=0;
var listaAfiliados="";

function getProjectbyID(donde){

	if(donde==1){
		try { 
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : decorador.mail,
	  				action : "decoradores_get_project",
	  				user : decorador.mail,
	  				pass : decorador.pass,
	  				id_proyecto: proyecto_id,
	  				detail_level: 1
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data; 
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					//BootstrapDialog.alert(" correcto");
	  					projectObject=data;   
	  					localStorage.setItem('projectobject', JSON.stringify(data)); 
	  					//localStorage.lastname = "Smith"; 
	  						
	  						 
							

							var listmoodboard="";
							listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
							
							var tipoHabi="";
							var k="";
							for(var l = 0; l < projectObject.preferencias.length; l++) {
								if(projectObject.preferencias[l].id_moodboard!=""  || projectObject.preferencias[l].id_moodboard!=0) {
									k="existe"; 
								}
							}	
							var f="";
							var items=0;
							var imgMb="";
							for(var j = 0; j < projectObject.preferencias.length; j++) {
									var id_moodboard = projectObject.preferencias[j].id_moodboard;   
									if (k=="existe"){ 
										  
										// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
										if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
											tipoHabi="noColocar";
										} else { tipoHabi="colocar"; f++;}
										
									} else {
										// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
										if (id_moodboard=="" || id_moodboard==0) { 
											tipoHabi = projectObject.preferencias[j].habitacion; 
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
											listmoodboard += '<div class="conefectossuaves text-center item active"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
											listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
											 
											listmoodboard += '</div></div>'; 
										} else {
											items++;
											listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
											listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
											imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
											listmoodboard += '</div></div>'; 
											$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
										}
									} else { } 	 
								}
								else {
									// SIGUIENTES ITEMS
									if (tipoHabi!="noColocar"){
										if (id_moodboard=="" || id_moodboard==0) {
											items++;
											listmoodboard += '<div class="conefectossuaves text-center item"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
											listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
											 
											listmoodboard += '</div></div>';  
										} else {
											items++;
											listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
											listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
											imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
											listmoodboard += '</div></div>'; 
											$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
										}
									} else { } 	 
								}
							 
							
							}
							listmoodboard += '</div>';
							if(items>1){
							listmoodboard += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2" data-slide="prev">';
							listmoodboard += '       <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
							listmoodboard += '      </a>';
							listmoodboard += '       <a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2" data-slide="next">';
					        listmoodboard += '            <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
					        listmoodboard += '        </a>';
							}
							
							 
							
							var FechaEstado = new Date(projectObject.fechaestado); 
							var Hoy = new Date();
							var title="";
							
							var decoradorDias = FechaEstado - Hoy;   
								  var dias = decoradorDias / 86400000; 
								  // SI SE QUIERE PONER HORAS: 
								  //if (Math.floor(dias)>=1) {
									// var hrs = diff /3600000; 
									// hrs= hrs - (Math.floor(dias)*24);
								  //} 
								  var total="";
								  total=Math.ceil(dias);
								  if (total>=1) {
									  total ='( Te quedan '+total+' días para entregarlo )'; 
									  if(projectObject.projectsStates.nombre=="Finalizado con Factura") {total=""; }
								  } else if(projectObject.projectsStates.nombre=="Finalizado con Factura"){ total=""; } else {
									  total= '( Se pasó el plazo, date prisa en completar el paso )'; }
								  if (projectObject.projectsStates.turnoDe=="usuario"){
									  total="";
								  }
						    
						    title=total;
						  
							
							var info="";
							info+='<img src="img/pasos/informacion.svg" alt="Ver información de este Proyecto" title="Ver información de este Proyecto" onclick="lanzarInfo2(';
							info+=proyecto_id;
							info+=')"> '; 
							$('#infoPj').prepend(info);  
							
							
							var chat="";
							chat += '<div id="Chat" class="textarea-p2" style="margin-left:0;width:100%;height:290px;border:1px solid black;margin-bottom:30px">';
							chat += '<div id="chat-window" >';
							chat += '	<div id="message-list" class="row disconnected"></div>';
							chat += '		<div id="typing-row" class="row disconnected">';
							chat += '			<p id="typing-placeholder"></p>';
							chat += '		</div>';
							chat += '</div>';
							chat += '</div>';
							chat+='<div class="decorador">';
							chat+='<div id="imagencara" style="padding:0;text-align:center; height: 90px;; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
							if(imgMb!=""){
								chat+='<img alt="cara" style="width:auto;height:100%;" src="'+imgMb+'">';	
							} else {
								chat+='<img alt="cara" style="width:auto;height:100%;background-color: #BEC4C1;" src="img/pasos/moodboard.svg">';
							}
							if(projectObject.user_sin.username.length>15){
								chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
							} else {
								chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
							}
							chat+= projectObject.user_sin.username +'</div>';
							chat+='</div>';
							
							
							if(projectObject.estado<200){
								chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">AVISA AL CLIENTE PARA QUE LEA TUS MENSAJES</div>';
								chat += '<div id="input-div">';
								chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
								chat += '</div>';
							}   else {
								chat += '<div class="letra-s buttonstandard_invertido aviso" style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
								chat += '<div id="input-div">';
								chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no se puede escribir al usuario" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
								chat += '</div>';
								
							}
							$('.chat').html(chat);
							$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+projectObject.uniqueDecorador+'/perfiles/cara/cara.jpg" alt="'+projectObject.nombreDecorador+'">');
							$('#nombreProyecto').append(projectObject.nombreProyectDecorador);
							$('#estadoProyecto').append(projectObject.projectsStates.texto_decoradores);
							if(title!=""){
								$('#estadoProyecto').prop('title', title);
							}
							var array=[];
							array[0]=projectObject.nombreProyectDecorador;
							array[1]=projectObject.id;
							array[2]=projectObject.user_sin.username;
							array[3]=projectObject.id_user;
							array[4]=projectObject.idDecorador;  
							try {
								goChat(decorador.nombre,proyecto_id,150, array); 
							} catch (e) {
								console.log("no cargó el chat, conexión lenta")
							}
							crearbotones_grandes_pasos_decorador(); 
							setFormularioPaso();
							
							
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		cerrarCargando();
	  	}
	} else if(donde==2){
		try { 
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : decorador.mail,
	  				action : "decoradores_get_project",
	  				user : decorador.mail,
	  				pass : decorador.pass,
	  				id_proyecto: proyecto_id,
	  				detail_level: 2
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data; 
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					//BootstrapDialog.alert(" correcto");
	  					projectObject=data;   
	  					localStorage.setItem('projectobject', JSON.stringify(data)); 
	  					//localStorage.lastname = "Smith"; 
	  						
	  					var listmoodboard="";
						listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
						
						var tipoHabi="";
						var k="";
						for(var l = 0; l < projectObject.preferencias.length; l++) {
							if(projectObject.preferencias[l].id_moodboard!=""  || projectObject.preferencias[l].id_moodboard!=0) {
								k="existe"; 
							}
						}	
						var f="";
						var items=0;
						var imgMb="";
						for(var j = 0; j < projectObject.preferencias.length; j++) {
								var id_moodboard = projectObject.preferencias[j].id_moodboard;   
								if (k=="existe"){ 
									  
									// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
									if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
										tipoHabi="noColocar";
									} else { tipoHabi="colocar"; f++;}
									
								} else {
									// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
									if (id_moodboard=="" || id_moodboard==0) { 
										tipoHabi = projectObject.preferencias[j].habitacion; 
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
										listmoodboard += '<div class="conefectossuaves text-center item active"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>'; 
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
							else {
								// SIGUIENTES ITEMS
								if (tipoHabi!="noColocar"){
									if (id_moodboard=="" || id_moodboard==0) {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>';  
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
						 
						
						}
						listmoodboard += '</div>';
						if(items>1){
						listmoodboard += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2" data-slide="prev">';
						listmoodboard += '       <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
						listmoodboard += '      </a>';
						listmoodboard += '       <a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2" data-slide="next">';
				        listmoodboard += '            <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
				        listmoodboard += '        </a>';
						}
						
						 
						
						var FechaEstado = new Date(projectObject.fechaestado); 
						var Hoy = new Date();
						var title="";
						
						var decoradorDias = FechaEstado - Hoy;   
							  var dias = decoradorDias / 86400000; 
							  // SI SE QUIERE PONER HORAS: 
							  //if (Math.floor(dias)>=1) {
								// var hrs = diff /3600000; 
								// hrs= hrs - (Math.floor(dias)*24);
							  //} 
							  var total="";
							  total=Math.ceil(dias);
							  if (total>=1) {
								  total ='( Te quedan '+total+' días para entregarlo )'; 
								  if(projectObject.projectsStates.nombre=="Finalizado con Factura") {total=""; }
							  } else if(projectObject.projectsStates.nombre=="Finalizado con Factura"){ total=""; } else {
								  total= '( Se pasó el plazo, date prisa en completar el paso )'; }
							  if (projectObject.projectsStates.turnoDe=="usuario"){
								  total="";
							  }
					    
					    title=total;
					  
						
						var info="";
						info+='<img src="img/pasos/informacion.svg" alt="Ver información de este Proyecto" title="Ver información de este Proyecto" onclick="lanzarInfo2(';
						info+=proyecto_id;
						info+=')"> '; 
						$('#infoPj').prepend(info);  
						
						
						var chat="";
						chat += '<div id="Chat" class="textarea-p2" style="margin-left:0;width:100%;height:290px;border:1px solid black;margin-bottom:30px">';
						chat += '<div id="chat-window" >';
						chat += '	<div id="message-list" class="row disconnected"></div>';
						chat += '		<div id="typing-row" class="row disconnected">';
						chat += '			<p id="typing-placeholder"></p>';
						chat += '		</div>';
						chat += '</div>';
						chat += '</div>';
						chat+='<div class="decorador">';
						chat+='<div id="imagencara" style="padding:0;text-align:center; height: 90px;; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
						if(imgMb!=""){
							chat+='<img alt="cara" style="width:auto;height:100%;" src="'+imgMb+'">';	
						} else {
							chat+='<img alt="cara" style="width:auto;height:100%;background-color: #BEC4C1;" src="img/pasos/moodboard.svg">';
						}
						if(projectObject.user_sin.username.length>15){
							chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
						} else {
							chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
						}
						chat+= projectObject.user_sin.username +'</div>';
						chat+='</div>';
						
						
						if(projectObject.estado<200){
							chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">AVISA AL CLIENTE PARA QUE LEA TUS MENSAJES</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
							chat += '</div>';
						}   else {
							chat += '<div class="letra-s buttonstandard_invertido aviso" style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no se puede escribir al usuario" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
							chat += '</div>';
							
						}
						$('.chat').html(chat);
						$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+projectObject.uniqueDecorador+'/perfiles/cara/cara.jpg" alt="'+projectObject.nombreDecorador+'">');
						$('#nombreProyecto').append(projectObject.nombreProyectDecorador);
						$('#estadoProyecto').append(projectObject.projectsStates.texto_decoradores);
						if(title!=""){
							$('#estadoProyecto').prop('title', title);
						}
						var array=[];
						array[0]=projectObject.nombreProyectDecorador;
						array[1]=projectObject.id;
						array[2]=projectObject.user_sin.username;
						array[3]=projectObject.id_user;
						array[4]=projectObject.idDecorador;  
						try {
							goChat(decorador.nombre,proyecto_id,150, array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						}
						crearbotones_grandes_pasos_decorador(); 
							 
								setFormularioPaso2();
							 
							
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		cerrarCargando();
	  	}
	} else if(donde==3){ 
		try { 
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : decorador.mail,
	  				action : "decoradores_get_project",
	  				user : decorador.mail,
	  				pass : decorador.pass,
	  				id_proyecto: proyecto_id,
	  				detail_level: 3
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data; 
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else { 
	  					//BootstrapDialog.alert(" correcto");
	  					projectObject=data;   
	  					localStorage.setItem('projectobject', JSON.stringify(data)); 
	  					//localStorage.lastname = "Smith"; 
	  						
	  					var listmoodboard="";
						listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
						
						var tipoHabi="";
						var k="";
						for(var l = 0; l < projectObject.preferencias.length; l++) {
							if(projectObject.preferencias[l].id_moodboard!=""  || projectObject.preferencias[l].id_moodboard!=0) {
								k="existe"; 
							}
						}	
						var f="";
						var items=0;
						var imgMb="";
						for(var j = 0; j < projectObject.preferencias.length; j++) {
								var id_moodboard = projectObject.preferencias[j].id_moodboard;   
								if (k=="existe"){ 
									  
									// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
									if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
										tipoHabi="noColocar";
									} else { tipoHabi="colocar"; f++;}
									
								} else {
									// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
									if (id_moodboard=="" || id_moodboard==0) { 
										tipoHabi = projectObject.preferencias[j].habitacion; 
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
										listmoodboard += '<div class="conefectossuaves text-center item active"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>'; 
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
							else {
								// SIGUIENTES ITEMS
								if (tipoHabi!="noColocar"){
									if (id_moodboard=="" || id_moodboard==0) {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>';  
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
						 
						
						}
						listmoodboard += '</div>';
						if(items>1){
						listmoodboard += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2" data-slide="prev">';
						listmoodboard += '       <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
						listmoodboard += '      </a>';
						listmoodboard += '       <a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2" data-slide="next">';
				        listmoodboard += '            <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
				        listmoodboard += '        </a>';
						}
						
						 
						
						var FechaEstado = new Date(projectObject.fechaestado); 
						var Hoy = new Date();
						var title="";
						
						var decoradorDias = FechaEstado - Hoy;   
							  var dias = decoradorDias / 86400000; 
							  // SI SE QUIERE PONER HORAS: 
							  //if (Math.floor(dias)>=1) {
								// var hrs = diff /3600000; 
								// hrs= hrs - (Math.floor(dias)*24);
							  //} 
							  var total="";
							  total=Math.ceil(dias);
							  if (total>=1) {
								  total ='( Te quedan '+total+' días para entregarlo )'; 
								  if(projectObject.projectsStates.nombre=="Finalizado con Factura") {total=""; }
							  } else if(projectObject.projectsStates.nombre=="Finalizado con Factura"){ total=""; } else {
								  total= '( Se pasó el plazo, date prisa en completar el paso )'; }
							  if (projectObject.projectsStates.turnoDe=="usuario"){
								  total="";
							  }
					    
					    title=total;
					  
						
						var info="";
						info+='<img src="img/pasos/informacion.svg" alt="Ver información de este Proyecto" title="Ver información de este Proyecto" onclick="lanzarInfo2(';
						info+=proyecto_id;
						info+=')"> '; 
						$('#infoPj').prepend(info);  
						
						
						var chat="";
						chat += '<div id="Chat" class="textarea-p2" style="margin-left:0;width:100%;height:290px;border:1px solid black;margin-bottom:30px">';
						chat += '<div id="chat-window" >';
						chat += '	<div id="message-list" class="row disconnected"></div>';
						chat += '		<div id="typing-row" class="row disconnected">';
						chat += '			<p id="typing-placeholder"></p>';
						chat += '		</div>';
						chat += '</div>';
						chat += '</div>';
						chat+='<div class="decorador">';
						chat+='<div id="imagencara" style="padding:0;text-align:center; height: 90px;; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
						if(imgMb!=""){
							chat+='<img alt="cara" style="width:auto;height:100%;" src="'+imgMb+'">';	
						} else {
							chat+='<img alt="cara" style="width:auto;height:100%;background-color: #BEC4C1;" src="img/pasos/moodboard.svg">';
						}
						if(projectObject.user_sin.username.length>15){
							chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
						} else {
							chat+='</div><div style="z-index: 1; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
						}
						chat+= projectObject.user_sin.username +'</div>';
						chat+='</div>';
						
						
						if(projectObject.estado<200){
							chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">AVISA AL CLIENTE PARA QUE LEA TUS MENSAJES</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
							chat += '</div>';
						}   else {
							chat += '<div class="letra-s buttonstandard_invertido aviso" style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no se puede escribir al usuario" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
							chat += '</div>';
							
						}
						$('.chat').html(chat);
						$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+projectObject.uniqueDecorador+'/perfiles/cara/cara.jpg" alt="'+projectObject.nombreDecorador+'">');
						$('#nombreProyecto').append(projectObject.nombreProyectDecorador);
						$('#estadoProyecto').append(projectObject.projectsStates.texto_decoradores);
						if(title!=""){
							$('#estadoProyecto').prop('title', title);
						}
						var array=[];
						array[0]=projectObject.nombreProyectDecorador;
						array[1]=projectObject.id;
						array[2]=projectObject.user_sin.username;
						array[3]=projectObject.id_user;
						array[4]=projectObject.idDecorador;  
						try {
							goChat(decorador.nombre,proyecto_id,150, array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						} 
						crearbotones_grandes_pasos_decorador(); 
							 
								setFormularioPaso3();
								
							
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		cerrarCargando();
	  	}
	} else if(donde==4){ 
		try { 
	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : decorador.mail,
	  				action : "decoradores_get_project",
	  				user : decorador.mail,
	  				pass : decorador.pass,
	  				id_proyecto: proyecto_id,
	  				detail_level: 4 
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data; 
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					//BootstrapDialog.alert(" correcto");
	  					projectObject=data;   
	  					console.log(data);
	  					localStorage.setItem('projectobject', JSON.stringify(data)); 
	  					//localStorage.lastname = "Smith"; 
						idDecorador=data.idDecorador;
						listaAfiliados=data.listAfiliados;  
	  						
	  					var listmoodboard="";
						listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
						
						var tipoHabi="";
						var k="";
						for(var l = 0; l < projectObject.preferencias.length; l++) {
							if(projectObject.preferencias[l].id_moodboard!=""  || projectObject.preferencias[l].id_moodboard!=0) {
								k="existe"; 
							}
						}	
						var f="";
						var items=0;
						var imgMb="";
						for(var j = 0; j < projectObject.preferencias.length; j++) {
								var id_moodboard = projectObject.preferencias[j].id_moodboard;   
								if (k=="existe"){ 
									  
									// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
									if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
										tipoHabi="noColocar";
									} else { tipoHabi="colocar"; f++;}
									
								} else {
									// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
									if (id_moodboard=="" || id_moodboard==0) { 
										tipoHabi = projectObject.preferencias[j].habitacion; 
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
										listmoodboard += '<div class="conefectossuaves text-center item active"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>'; 
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
							else {
								// SIGUIENTES ITEMS
								if (tipoHabi!="noColocar"){
									if (id_moodboard=="" || id_moodboard==0) {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><img id="imgMoodboard" src="'+urlbase+'/img/'+tipoHabi+'.png";" style="border:1px solid grey;" alt="'+tipoHabi+'"/>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										 
										listmoodboard += '</div></div>';  
									} else {
										items++;
										listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+proyecto_id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
										listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
										imgMb=urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png';
										listmoodboard += '</div></div>'; 
										$("#imgMoodboard").attr("src",urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png');$("#imgMoodboard").attr("onclick","lanzarPopUpImagenesPasos(0,0);");
									}
								} else { } 	 
							}
						 
						
						}
						listmoodboard += '</div>';
						if(items>1){
						listmoodboard += '<a  style="width: 2%; text-align:left;text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel2" data-slide="prev">';
						listmoodboard += '       <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
						listmoodboard += '      </a>';
						listmoodboard += '       <a  style="width: 2%; text-align:right; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel2" data-slide="next">';
				        listmoodboard += '            <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
				        listmoodboard += '        </a>';
						}
						
						 
						
						var FechaEstado = new Date(projectObject.fechaestado); 
						var Hoy = new Date();
						var title="";
						
						var decoradorDias = FechaEstado - Hoy;   
							  var dias = decoradorDias / 86400000; 
							  // SI SE QUIERE PONER HORAS: 
							  //if (Math.floor(dias)>=1) {
								// var hrs = diff /3600000; 
								// hrs= hrs - (Math.floor(dias)*24);
							  //} 
							  var total="";
							  total=Math.ceil(dias);
							  if (total>=1) {
								  total ='( Te quedan '+total+' días para entregarlo )'; 
								  if(projectObject.projectsStates.nombre=="Finalizado con Factura") {total=""; }
							  } else if(projectObject.projectsStates.nombre=="Finalizado con Factura"){ total=""; } else {
								  total= '( Se pasó el plazo, date prisa en completar el paso )'; }
							  if (projectObject.projectsStates.turnoDe=="usuario"){
								  total="";
							  }
					    
					    title=total;
					  
						
						var info="";
						info+='<img src="img/pasos/informacion.svg" alt="Ver información de este Proyecto" title="Ver información de este Proyecto" onclick="lanzarInfo2(';
						info+=proyecto_id;
						info+=')"> '; 
						$('#infoPj').prepend(info);  
						
						
						var chat="";
						chat += '<div id="Chat" class="textarea-p2" style="margin-left:0;width:100%;height:290px;border:1px solid black;margin-bottom:30px">';
						chat += '<div id="chat-window" >';
						chat += '	<div id="message-list" class="row disconnected"></div>';
						chat += '		<div id="typing-row" class="row disconnected">';
						chat += '			<p id="typing-placeholder"></p>';
						chat += '		</div>';
						chat += '</div>';
						chat += '</div>';
						chat+='<div class="decorador">';
						chat+='<div id="imagencara" style="padding:0;text-align:center; height: 90px;; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
						if(imgMb!=""){
							chat+='<img alt="cara" style="width:auto;height:100%;" src="'+imgMb+'">';	
						} else {
							chat+='<img alt="cara" style="width:auto;height:100%;background-color: #BEC4C1;" src="img/pasos/moodboard.svg">';
						}
						if(projectObject.user_sin.username.length>15){
							chat+='</div><div style="z-index: 1;  padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
						} else {
							chat+='</div><div style="z-index: 1;  padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
						}
						chat+= projectObject.user_sin.username +'</div>';
						chat+='</div>';
						
						
						if(projectObject.estado<200){
							chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">AVISA AL CLIENTE PARA QUE LEA TUS MENSAJES</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
							chat += '</div>';
						}   else {
							chat += '<div class="letra-s buttonstandard_invertido aviso" style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
							chat += '<div id="input-div">';
							chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no se puede escribir al usuario" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
							chat += '</div>';
							
						}
						$('.chat').html(chat);
						$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+projectObject.uniqueDecorador+'/perfiles/cara/cara.jpg" alt="'+projectObject.nombreDecorador+'">');
						
						$('#nombreProyecto').append(projectObject.nombreProyectDecorador);
						$('#estadoProyecto').append(projectObject.projectsStates.texto_decoradores);
						if(title!=""){
							$('#estadoProyecto').prop('title', title);
						} 
						var array=[];
						array[0]=projectObject.nombreProyectDecorador;
						array[1]=projectObject.id;
						array[2]=projectObject.user_sin.username;
						array[3]=projectObject.id_user;
						array[4]=projectObject.idDecorador;  
						try {
							goChat(decorador.nombre,proyecto_id,150, array);
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						} 
						crearbotones_grandes_pasos_decorador(); 
							 
								setFormularioPaso4();
								  
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		cerrarCargando();
	  	}
	}
}
function rellenarCanvas(posicion){
	if(projectObject.ldlcs.length==0){
		var href = urlbaseForAjax + '/ldlc.jsp?id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
	} else if(posicion==1) {
		if(projectObject.ldlcs.length==1){
			if(projectObject.ldlcs[0].Estado==2 || projectObject.ldlcs[0].Estado==4) {
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[0].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}else {
				var href = urlbaseForAjax + '/ldlc.jsp?id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}
		} else {
			if(projectObject.ldlcs[0].Estado==2 || projectObject.ldlcs[0].Estado==4) {
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[0].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			} else if(projectObject.ldlcs[1].Estado==2 || projectObject.ldlcs[1].Estado==4){
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[1].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}
		}
	} else if(posicion==2) {
		if(projectObject.ldlcs.length==1){
			if(projectObject.ldlcs[0].Estado==3 || projectObject.ldlcs[0].Estado==5) {
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[0].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}else {
				var href = urlbaseForAjax + '/ldlc.jsp?id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}
		} else {
			if(projectObject.ldlcs[0].Estado==3 || projectObject.ldlcs[0].Estado==5) {
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[0].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			} else if(projectObject.ldlcs[1].Estado==3 || projectObject.ldlcs[1].Estado==5){
				var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[1].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
			}
		}
	} else if(posicion==3){
		if(projectObject.ldlcs[0].Estado==4 || projectObject.ldlcs[0].Estado==5) {
			var href = urlbaseForAjax + '/ldlc.jsp?id_ldlc='+projectObject.ldlcs[0].ListaCompra_id+'&id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
		}else {
			var href = urlbaseForAjax + '/ldlc.jsp?id_decorador='+projectObject.idDecorador+'&id_proyecto='+projectObject.id;
		}
	}
	window.location = href;
	
}
function actualizarStorage(procedencia) {   
	var mail=decorador.mail;
	 var pass=decorador.pass;
	 console.log(mail);
	 console.log(pass);
	 try {  
		 	
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
	  				pass : pass,
	  				detail_level: 8,
	  				project_level: 0
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				//BootstrapDialog.alert('aaaaa'+data);
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$(document.body).css({'cursor' : 'default'});

	  					console.log(proce);
	  					console.log(u);
	  					if(proce==1 && u!=null || proce==2 && u!=null || proce==3 && u!=null || proce==4 && u!=null) { 
	  						deleteCookie("userAssistantD");
	  						deleteCookie("passAssistantD"); 
	  						localStorage.removeItem('loginUserF');
	  						localStorage.removeItem('loginPF');
	  						localStorage.removeItem('id_proyectoglobalF'); 
		  					localStorage.removeItem('decoradorobject');
	  					}
	  				} else {
	  					//BootstrapDialog.alert("login correcto"); 


	  					console.log(proce);
	  					console.log(u);
	  					localStorage.setItem('decoradorobject', JSON.stringify(data));
	  					var decorador = localStorage.getItem('decoradorobject');
	  					decorador=JSON.parse(decorador);   
	  					if(procedencia=="pefilCarga"){ 
	  						insertaselementos(); 
	  					} 
	  					
	  					if(procedencia=="guardarPerfil"){ 
	  						if(decorador.activo>=1){ 
	  						BootstrapDialog.show({
					            title: '',
					            message: 'Guardado correctamente',
					            type: BootstrapDialog.TYPE_DEFAULT,
					            buttons: [{
					                label: 'Ok',
					                action: function(dialogRef){
					                	  dialogRef.close(); 
		                	
					                }
					            }]
					        });

	  						} else {
	  							BootstrapDialog.show({
						            title: '',
						            message: 'Gracias por rellenar tu perfil, nuestro equipo revisará tus datos y si resultas seleccionado nos pondremos en contacto contigo. Puedes volver en cualquier momento para editar tus datos.',
						            type: BootstrapDialog.TYPE_DEFAULT,
						            buttons: [{
						                label: 'Ok',
						                action: function(dialogRef){ 
						  						var href = urlbase + '/paginaEspera.html';
						  						window.location = href; 
						                	
						                }
						            }]
						        });
	  						} 
		  					$(document.body).css({'cursor' : 'default'});
		  					
	  					}
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

function actualizarStorageProyectos() {  
	 var mail=decorador.mail;
	 var pass=decorador.pass;
	 try {  
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
	  				pass : pass,
	  				detail_level: 4,
	  				project_level: -1
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				//BootstrapDialog.alert('aaaaa'+data);
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					//BootstrapDialog.alert("login correcto");  
	  					
	  					
	  					localStorage.setItem('decoradorobject', JSON.stringify(data));
	  					decorador=data;
	  					construirListado(); 
	  					//localStorage.lastname = "Smith";
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		cerrarCargando();
	  	}

}

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
function cerrarCargando(){
	$('#cargando').modal('hide');
}
function dudasfunction(){
	$('.modal').modal('hide');
	
	setTimeout(function(){elrestodedudas();}, 500);
	
} 
function logoutFunction() {
	localStorage.setItem('projectobject', "");
	localStorage.setItem('projectid', "");
	localStorage.setItem('decoradorobject', "");
	localStorage.setItem('decorador_individual', "");
	localStorage.setItem('__pp_session__', "");
	localStorage.setItem('portfolio_decoradores', "");
	localStorage.setItem('id_decorador', "");
	deleteCookie("userAssistantD");
	deleteCookie("passAssistantD"); 
}
function elrestodedudas(){ 
	$('#modalforDudasCon').modal('show');
}
function  sendDudas() { 
	$('.modal').modal('hide'); 
	var toMail = 'info@decotheco.com';
	
	var recojoMail=decorador.mail;
	var fromMail;
	var nombre; 
	fromMail=recojoMail;
	nombre = $("li[id=liforsustitution] > a").text() + " (registrado) ";
		
	var consulta=document.getElementById('dudas_consultaCon').value;
	var subject = "Mensaje de dudas de decoradores";
	
	
	var content = "Nos han escrito desde: " + paracortar+ "\n" +
			"El nombre es: "+ nombre + " y dice esto: "+ consulta;
	
	content+="\n:)";
	
	//alert(dateInputforCita.value);
	//alert(timeInputforCita.value);
	//alert(datocontactoInputforCita.value);
	//alert(content);
	
	
	setTimeout(function() {
		$('#cargando').modal('show'); 
	}, 500);
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
				            message: 'Mensaje enviado correctamente, en breve nos pondremos en contacto contigo :)',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){
				                		cerrarCargando();
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
function deleteCookie(cname) { 
	setCookie(cname, '', { expires: -1 }, '/', urlbaseCookie, 0);
	setCookie(cname, '', { expires: -1 }, '/', urlbaseCookie, 0);
}

function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
function irPaso1() {
	var href = urlbase + "/paso1.html";
	window.location = href;
}
function irPaso2() {
	var href = urlbase + "/paso2.html";
	window.location = href;
}
function irPaso3() {
	var href = urlbase + "/paso3.html";
	window.location = href;
}
function irPaso4() {
	var href = urlbase + "/paso4.html";
	window.location = href;
}
function otracosafunction(){
   window.location.href= urlbase + "/perfil.html";
}

function lanzarPopUpImagenesPasos(proyecto,pos){
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
	
		 

		var altoNavegador = $(window).height();
		var anchoNavegador = $(window).width();
		alto=altoNavegador-200+"px";
		var tipoHabi2="";
		var k="";
		for(var l = 0; l < projectObject.preferencias.length; l++) {
			if(projectObject.preferencias[l].id_moodboard!=""  || projectObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}
		var f="";
		var bandera=true;
		items=0;
		for(var j = 0; j < projectObject.preferencias.length; j++) {
				var id_moodboard = projectObject.preferencias[j].id_moodboard;  
				 
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi2="noColocar";
					} else { tipoHabi2="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = projectObject.preferencias[j].habitacion; 
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
				htmlText +='<a class=" conefectossuaves carousel-control left" style="width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href="#myCarousel21" data-slide="prev">';
				htmlText += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
				htmlText +=' </a>';
				htmlText +=' <a class=" conefectossuaves carousel-control right" style="width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px"   href="#myCarousel21" data-slide="next">';
				htmlText +='      <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
				htmlText +='  </a>';
			}
		}

	$('#myCarousel21').html(htmlText);
	$('#modalforperfiles').modal('show');
	if(anchoNavegador>=altoNavegador){
		$('#carouselinnerForImages3').css("height",alto); 
		$('#carouselinnerForImages3').css("width","auto"); 
	} else { 
		$('#carouselinnerForImages3 .conefectossuaves img').css("height","auto"); 
		$('#carouselinnerForImages3').css("height","auto"); 
		$('#carouselinnerForImages3').css("width","98%"); 
	}
	

}
function lanzarInfo2(id_proyecto){  
	var proyectoEnCuestion=projectObject; 
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
 
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
function messagesMail() {
	$('#modalChat').modal('hide');
	var toMail = projectObject.user_sin.mail;
	 
	var fromMail="info@decotheco.com";
	var nombre;
	nombre = $("li[id=liforsustitution] > a").text();
		 
	var subject = "Mensajes de chat pendientes - Decotheco";
	
	
	var content = "¡Hola!<br/> El decorador del proyecto "+projectObject.nombreProyecto+" parece que te dejó mensajes en el chat.";
	
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
				            message: 'Ya avisamos al usuario, en breve se conectará y leerá tus mensajes.',
				            type: BootstrapDialog.TYPE_DEFAULT,
				            buttons: [{
				                label: 'Ok',
				                action: function(dialogRef){
				                	$('.aviso').html('Usuario avisado');
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