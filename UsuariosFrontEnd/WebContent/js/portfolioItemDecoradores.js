
	
var htmlForInsert='';
var RRSS_rrss;
var arrayDeParallax=[];
var item;
var arrayDeSeccionesPopUp = new Array(200);
var portfolio_decoradores;
var id_decorador;
var decoradorObject;
var posportfolio;
var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	  return query_string;
	}();

	
function getRRSS(cadena){
	RRSS_rrss = cadena.split("RRSS_rrss");
}

function nuevoProyecto(id_para_lanzar) {
	// BootstrapDialog.alert("nuevo_proyecto");
	setCookie("nuevo_Proyecto", "1", 365);
	var href = urlbase + "/decoracion-online.html?id="+id_para_lanzar;
	window.location = href;
}



function cargarProyecto(){
	
	//var oo=$.cookie("coockieposicion");
	//getPortfolioItemsFunction(oo);
	//var item=JSON.parse($.cookie("basket-data"));
	//alert(oo);
	/*var retrievedObjectdecorador = localStorage.getItem('portfolio_decoradores');
	portfolio_decoradores=JSON.parse(retrievedObjectdecorador);*/
 
	
	var substringToFind= QueryString.id; 
	//console.log(portfolio_decoradores[posportfolio]);
	
	getDecoradorById(substringToFind);
	

}
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
function getDecoradorById(id_ID) {
 
	//alert(urlbase + '/GetPortfolio');
	 try {  $.ajaxSetup({
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
	  				action : "decoradores_get_decorador_info",
	  				id : id_ID,
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
	  				} else { 
	  					//BootstrapDialog.alert("oeooeoeoe");
	  					decoradorObject=data;
	  					localStorage.removeItem('decorador_individual');
	  					localStorage.setItem('decorador_individual', JSON.stringify(data));
	  					insertaselementos();
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

function crearVistaDecorador(){
	
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
function addhttp(s) {
	var prefix = 'http://';
	var prefix2 = 'https://';
	if(s.substr(0, prefix2.length) !== prefix2) {
		if (s.substr(0, prefix.length) !== prefix)
		{
		    s = prefix + s;
		}
	}
	return s;
}
function insertaselementos(){
	
	var proyectoDecorador = getCookie("proyectoParaDecorador"); 
	var texto='';
	texto+='<div id="imagencabecera" style="z-index: 0;background: url('+urlbuckets3 + 'decoradores/'+decoradorObject.mail+'/perfiles/cabecera/'+decoradorObject.filesCabecera[0] +') center;background-size: cover; min-height:180px; height: 20vw; " class="">';
	texto+='</div><div id="imagencara" style="z-index: 1; margin-top: calc(-50px - 1.5vw); padding-top: 0px; z-index: 1; height:130px;width:130px; background-color:grey;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;overflow:hidden" class="center-block">';
	texto+='<img alt="cara" class="center-block" style="height:130px;width:auto" src="'+urlbuckets3 + 'decoradores/'+decoradorObject.mail+'/perfiles/cara/'+decoradorObject.filesCara[0] +'">';
	texto+='</div><div id="imagencara" style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-ml letra-negrita letra-mayusculas">';
	texto+= decoradorObject.nombre+'</div>';
	texto+='<div style="width:100%; text-align: center; max-width: 100%; margin-top:10px;   display: inline-block;"><div id="divparacompartircanvas" class="divforcompartirfacetwitfooter">';
	getRRSS(decoradorObject.urlRss);
	var urlRss=RRSS_rrss; 
	for(var i=0;i<urlRss.length;i++){
		if(urlRss[i].length>0){
			texto+='<a  href="'+ addhttp(urlRss[i]) +'" style="cursor: pointer; margin-left: 5px;margin-right: 5px;"	target="_blank"> ';
			
			
			if(i==0)
				texto+='<i class="fa fa-facebook facebook-icon" aria-hidden="true"> </i>';
			else if(i==1)
				texto+='<i class="fa fa-instagram facebook-icon" aria-hidden="true"> </i>';
			else if(i==2)
				texto+='<i	class="fa fa-twitter facebook-icon"> </i>';
			else if(i==3)
				texto+='<i	class="fa fa-pinterest facebook-icon"> </i>';
			else if(i==4)
				texto+='<i class="fa fa-behance-square facebook-icon" aria-hidden="true"></i>';
			else if(i==5)
				texto+='<i class="fa fa-linkedin-square facebook-icon" aria-hidden="true"></i>';
			else if(i==6)
					texto+='<i class="fa fa-youtube-square facebook-icon" aria-hidden="true"></i>';
			 
			
				
				
				
			texto+='</a> ';
		}
	}
	if(decoradorObject.urlBlog!=null && decoradorObject.urlBlog.length>0)
		texto+='<a  href="'+ decoradorObject.urlBlog +'" style="cursor: pointer; margin-left: 5px;margin-right: 5px;"	target="_blank"><i class="fa fa-wordpress" aria-hidden="true"></i></a>';
	texto+='</div></div><div id="imagencara" style="z-index: 1; margin-top: 25px; padding-top: 25px; text-align: center; " class="col-xs-12 letra-ms letra-mayusculas">';
	var etiquetasunidasdecorador="";
	for(var y=0;y<decoradorObject.etiquetas.length;y++){
		if(y==0) etiquetasunidasdecorador=decoradorObject.etiquetas[y].nombre;
		else
			etiquetasunidasdecorador+=" "+ decoradorObject.etiquetas[y].nombre;
			
	}
	texto+='<span class="letra-negrita">estilo </span><span >'+etiquetasunidasdecorador+'</span></div>';
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
	
	if(decoradorObject.activo==2) {
		if(decoradorObject.disponibilidad!=null && decoradorObject.disponibilidad!=""){
			fecha=invertir(decoradorObject.disponibilidad);
			if(validate_fechaMayorQue(fecha, hoy)==0) {
				texto+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos hasta el '+invertir(decoradorObject.disponibilidad);
				texto+='</div>';
			}else {
				texto+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos por el momento';
				texto+='</div>';	
			}
		} else {
			texto+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador no admite más proyectos por el momento';
			texto+='</div>';
		}
	} else if(decoradorObject.activo==0) {
		texto+='<div class="letra-s col-xs-12" style="padding-top:20px"> El decorador aún no está dado de alta';
		texto+='</div>';
	}
	else {
		texto+='<div id="contratarbutton"  style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center; " class="col-xs-12 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4 letra-s letra-mayusculas letra-negrita">';
	 
		if(proyectoDecorador!=""){
			// SI VIENE DE HOME.HTML
			texto+='<a class="buttonstandard  "onclick="volverHome('+decoradorObject.id+','+proyectoDecorador+')">contratar</a></div>';
		} else {
		texto+='<a class="buttonstandard  "onclick="nuevoProyecto('+decoradorObject.id+')">contratar</a></div>';
		}
	
	}
	
	texto+='<div class="col-xs-offset-1 col-xs-10  " style="margin-top: calc(20px + 1.2vw); padding-top: calc(20px + 1.2vw); ; padding-right: 0px !important; padding-left: 0px !important;" >';
	texto+='<div class="col-xs-12" style="padding-top: 1vw;"><label class="letra-s letra-mayusculas letra-menuda " style="line-height: 24px;border: black; border-top-style : solid; border-width: 1px; text-align: center;  width: 100%;  text-align: center ; "> PORTFOLIO</label></div></div>';
	texto+='<div style="margin-top: calc(20px + 1.2vw); padding-top: calc(20px + 1.2vw); max-width: 98%; width: 1200px;" class=" conefectossuaves modal-dialog">';
	texto+='<div class=" conefectossuaves popupforperfiles"><div class=" conefectossuaves modal-header" align="center"><button type="button" class=" conefectossuaves close" data-dismiss="modal" aria-label="Close">';
	texto+='<img style="display:none; max-height: 30px !important;" src="img/boton/x.png" alt="cerrar" class=" conefectossuaves " /></button></div>';
	texto+='<div id="myCarousel" class=" conefectossuaves container-fluid carousel slide" data-interval="false" style="height: 100%;"><div id="carouselinner" class=" conefectossuaves carousel-inner" role="listbox" style=" text-transform: uppercase;">';

	var bandera=false;
	for(var j=0;j<decoradorObject.trabajoses.length;j++){
		//alert("antes");
		if(decoradorObject.trabajoses[j].activo==1) {
		
		var imagenIzq="";
		var imagenDer="";
		var arrayotherimg=[]; 
		if(decoradorObject.trabajoses[j].Proyectos==null){
			for(var y=0;y<decoradorObject.trabajoses[j].imagenesTrabajos.length;y++){
					if(decoradorObject.trabajoses[j].imagenesTrabajos[y].indexOf('main_izq') !== -1) imagenIzq= urlbuckets3 + 'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[j].id+'/'+ decoradorObject.trabajoses[j].imagenesTrabajos[y];
					else if(decoradorObject.trabajoses[j].imagenesTrabajos[y].indexOf('main_der') !== -1) imagenDer= urlbuckets3 + 'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[j].id+'/'+ decoradorObject.trabajoses[j].imagenesTrabajos[y];
					else arrayotherimg.push(urlbuckets3 + 'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[j].id+'/'+ decoradorObject.trabajoses[j].imagenesTrabajos[y]);
				
			} 
		
		} else if(decoradorObject.trabajoses[j].Proyectos.propuestas[1].imagenes.length>0) { 
			imagenIzq= urlbuckets3 + 'usuarios/'+decoradorObject.trabajoses[j].Proyectos.userMail+'/'+decoradorObject.trabajoses[j].Proyectos.nombreProyecto+'/propuestas/'+ decoradorObject.trabajoses[j].Proyectos.propuestas[1].imagenes[0];
		} else {
			if(decoradorObject.trabajoses[j].Proyectos.ldlcs[0].Estado==4 || decoradorObject.trabajoses[j].Proyectos.ldlcs[0].Estado==5){
				imagenIzq= urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[j].Proyectos.ldlcs[0].imagen;
			} else {
				imagenIzq= urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[j].Proyectos.ldlcs[1].imagen;
			}
		}
			
		if(imagenIzq==""){
			continue;
			//alert("dentro");
		}
		//alert("despues");
		if(imagenIzq!=""){ 
			if(bandera==false){ 
				texto+='<div class=" conefectossuaves text-center item active">';
				bandera=true;
			} else {
				texto+='<div class=" conefectossuaves text-center item ">';
			}
		
			texto+='<div style="margin-right: 0px; margin-left: 0px;" id="cabeceraPerfiles" class=" conefectossuaves row"> <div style="text-align:left; margin-right: 0px; margin-left: 0px; padding-right: 0px; padding-left: 0px;" class=" conefectossuaves row col-md-6 col-sm-6 col-xs-12">';
			texto+='<div style="border-bottom: black; border-bottom-style: solid; border-bottom-width: 1px;" class=" conefectossuaves col-md-12 col-sm-12 col-xs-12"> <h4 class="letra-ms  letra-mayusculas"><span class=" letra-negrita ">TIPO </span>';
			texto+=decoradorObject.trabajoses[j].titulo+'</h4></div><hr>';
			texto+='<div class=" conefectossuaves col-md-12 col-sm-12 col-xs-12"><h4 class="letra-ms  letra-mayusculas"><span class=" letra-negrita ">PALABRAS CLAVE </span>';
			var etiquetasunidas="";
			for(var y=0;y<decoradorObject.trabajoses[j].etiquetas.length;y++){
				if(y==0) etiquetasunidas=decoradorObject.trabajoses[j].etiquetas[y].nombre;
				else
					etiquetasunidas+=", "+ decoradorObject.trabajoses[j].etiquetas[y].nombre;
					
			}
			
			texto+=etiquetasunidas+'</h4></div></div>';
			
			texto+='<div class=" conefectossuaves col-md-6 col-sm-6 col-xs-12"	style="border: black; border-style: solid; border-width: 1px;"><div	style="width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-top: -5px; height: 5px"></div>';
			texto+='<h6 style="text-align: center; line-height: 1.6;" class="letra-s  letra-mayusculas">';
			texto+=decoradorObject.trabajoses[j].texto+'';
			texto+='</h6><div style="width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-bottom: -5px; height: 5px"></div></div></div><br>';
			texto+='<div id="cuerpoPerfiles" class=" conefectossuaves row">';
			 
				texto+='<div class=" conefectossuaves  col-sm-offset-2 col-sm-8 col-xs-12"><img width="100%" style="width:100%;vertical-align:middle;display:inline" alt="moodboard"';
				
				texto+='src="'+ imagenIzq +'"></div>';
			 
			
			texto+='</div><hr>'; 
			if(decoradorObject.trabajoses[j].Proyectos==null){
				texto+='<div class=" conefectossuaves col-xs-12" style="padding-bottom:2%;"><div class="buttonstandard_invertido letra-xs"  onclick="lanzarPopUpImagenes('+ j +')" style="max-width:150px;cursor: pointer; margin-left: 5px;margin-right: 5px;"	target="_blank"><i class="fa fa-th-large" aria-hidden="true" style="color:grey;"></i> VER +</div></div></div>';
			} else {
				if(decoradorObject.trabajoses[j].Proyectos.propuestas[1].imagenes.length>0) {
					texto+='<div class=" conefectossuaves col-xs-12" style="padding-bottom:2%;"><div class="col-xs-6"><div class="buttonstandard_invertido letra-xs"  onclick="lanzarPopUpImagenes('+ j +')" style="max-width:150px;cursor: pointer; margin-left: 5px;margin-right: 5px;"	target="_blank"><i class="fa fa-th-large" aria-hidden="true" style="color:grey;"></i> VER +</div></div><div class="col-xs-6"><a class="buttonstandard_invertido letra-xs" style="max-width:200px;cursor: pointer; margin-left: 5px;margin-right: 5px;" href="proyecto-decoracion-online-3d.html?id='+decoradorObject.trabajoses[j].Proyectos.id+'" target="_blank"> VER PROYECTO</a></div></div></div>';
					
				} else {
					texto+='<div class=" conefectossuaves col-xs-12" style="padding-bottom:2%;"><div class="col-xs-6"><div class="buttonstandard_invertido letra-xs"  onclick="lanzarPopUpImagenes('+ j +')" style="max-width:150px;cursor: pointer; margin-left: 5px;margin-right: 5px;"	target="_blank"><i class="fa fa-th-large" aria-hidden="true" style="color:grey;"></i> VER +</div></div><div class="col-xs-6"><a class="buttonstandard_invertido letra-xs" style="max-width:200px;cursor: pointer; margin-left: 5px;margin-right: 5px;"  href="proyecto-decoracion-online-2d.html?id='+decoradorObject.trabajoses[j].Proyectos.id+'" target="_blank"> VER PROYECTO</a></div></div></div>';
					
				}
			}
		} 
		}
	}	
	texto+='</div>';
	texto+='<a style="width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 5px white;" class=" conefectossuaves carousel-control left" href="#myCarousel" data-slide="prev"><span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span></a>';
	texto+='<a style="width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 5px white;"  class=" conefectossuaves carousel-control right" href="#myCarousel" data-slide="next">';
	texto+='<span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
	texto+='</a></div></div></div>';
	
		
	texto+='	<div class="col-xs-12" style="margin-top: calc(20px + 1.2vw); padding-top: calc(20px + 1.2vw); ">';
	texto+='<label class="letra-s letra-mayusculas letra-menuda " style=";margin-bottom:3%;line-height: 24px;border: black; text-align: center;  width: 100%;  text-align: center ; "> "';
	texto+=decoradorObject.texto_decorador+'"</label>';
	texto+='</div>';
	
	$('#divforportfoliosections').html(texto);
	setTimeout(function() { carouselNormalization2(); }, 1500);

	$('#cargando2').modal('hide');

	
	
}

function volverHome(id, id_proyecto){
	var mail = getCookie("userAssistant");
	var pass = getCookie("passAssistant"); 
	$('#modalforchoosedecorator').modal('hide');
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
						  action : "decoradores_asociar_proyecto",
						  id_decorador : id,
						  id_proyecto : id_proyecto,
						  pass: pass,
						  mail: mail
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) { 
						//dedbería de devolver el id del decorador, sino devolverá algo que empieza por ERROR puedes controlarlo así:
						if (isError(data)) {
							  BootstrapDialog.alert(data); 
						} else {
						//BootstrapDialog.alert("añadido correctamente, en este caso no lances el mensaje en un un popup, es un ejemplo de una acción de correcto...");
							 
							var href = urlbase + "/Home.html";
							window.location = href;
						}
					},
					error: function (request, status, error) {
						$('#modalforchoosedecorator').modal('hide');
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		$('#modalforchoosedecorator').modal('hide');
		// put any code you want to execute if there<'s an exception here

	}
	
}
function dameNombreImagen(ruta){
//alert("hola");
	var res = ruta.split("/");
	var res = res[res.length-1].split("_");
	var res = res[res.length-1].split(".");
	return res[0];
	//alert(res[0]);
}

function quitarSaltosLinea(texto){
	//alert(texto);
	var res = texto.split("SALTOLINEA");
	//alert(res[0]);
	return res[0];
	
}

function SliderPantallaCompletaTextoCentralTextoSecundario(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-right: 0px !important; padding-left: 0px !important;">';
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+= pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+= '<div id="sliderForSection'+ seccion.orden +'" style=" margin-right: 0px !important; margin-left: 0px !important; padding-left: 0px; padding-right: 0px; min-height: 0px; " class="carousel slide row  col-xs-12 myCarousel">';
	htmlText+= '<div class="conefectos " style="z-index:2000; height: 100vh; min-height:300px; max-width: 100%; width: 100%; position: absolute;     left: 0px; top: 0px; display: inline-block; vertical-align: middle; padding-left: 12%; padding-right: 12%"> <div style=" top: 50%; left: 50%;  transform: translate(-50%,-50%); position: absolute;display: inline-block;">';
	htmlText+= '<span   style=" border: black; border-style: solid; border-width: 1px;  text-align:center; cursor: pointer; width:100%;max-width:100%;padding:20px; vertical-align: middle;" class="letrapequenabotones letraLato cartel"> '+getTextoDeTitulo(seccion.listaTextos, 'TEXTOCENTRAL')  +' </span> ';
	htmlText+= ' <span  style="" class="letrapequenaadornobotontienda">'+quitarSaltosLinea(getTextoDeTitulo(seccion.listaTextos, 'TEXTOSECUNDARIO'))  +' </span> </div></div><div style="padding-left: 0px; padding-right: 0px; margin-right: 0px !important; margin-left: 0px !important;"	class="carousel-inner row  col-xs-12">';
	//vamos con el bucle de imagenes
	for(var i=0;i<seccion.listaImagenes.length;i++){
		if(i==0){
			htmlText+= '<div class="item active">';
		}else{
			htmlText+= '<div class="item">';
		}
		
		htmlText+= '<div  class="col-xs-12" style="overflow:hidden;min-height:300px; height:100vh; background: url('+seccion.listaImagenes[i].imagen +') center;background-size: cover; padding-left: 0vw; padding-right: 0vw; margin-right: 0px !important; margin-left: 0px !important;"></div>	</div>';
		
	}
	
	htmlText+= '</div></div></div>';
	htmlForInsert+=	htmlText;	
}

function TextoConCuadroDerecha(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-left: 5vw; padding-right: 5vw; ">';
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+= pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	
	
	
	htmlText+= '<div class="col-xs-12 col-sm-4" style=" padding-right: 0px !important; padding-left: 0px !important;" >';
	htmlText+= '<div class="col-xs-12" style="padding-top: 1vw">';
	//vamos con el bucle de imagenes
	for(var i=0;i<seccion.listaTextos.length-1;i++){
		if(i!=seccion.listaTextos.length-2){
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%;text-align: left; margin-bottom: 2vw">'+ seccion.listaTextos[i].valor+'</label>';
			
		}else{
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%;text-align: left;  margin-bottom: 5vw;">'+ seccion.listaTextos[i].valor+'</label>';
			
		}
		
	}
	
	htmlText+= '</div></div>';
	
	htmlText+= '<div class="col-xs-12 col-sm-8" style=" padding-right: 0px !important; padding-left: 0px !important; border: black; border-style: solid; border-width: 1px; text-align: center; " > <div class="col-xs-12" style="padding:3vw; ">';
	
	var cadenaDescripcion=seccion.listaTextos[seccion.listaTextos.length-1].valor;
	
	var res = cadenaDescripcion.split("SALTOLINEA");
	
	for(var i=0;i<res.length;i++){
		if(i!=res.length-1){
			//alert(res[0]);
			if(res[i]!=null)
			if(res[i].length>0)
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" margin-bottom:1vw; width: 100%;  text-align: justify;     FONT-WEIGHT: 100;">'+ res[i]+'</label>';
			
		}else{
			if(res[i]!=null)
			if(res[i].length>0)
				htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: justify;     FONT-WEIGHT: 100;">'+ res[i]+'</label>';
			
		}
		
	}
	
	htmlText+= '</div></div></div>';
	
	htmlForInsert+=	htmlText;	
	
	
}





function SeccionDeImagenesConCartelIndividual1fila(seccion){
	
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-left: 5vw; padding-right: 5vw; ">';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+= pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	htmlText+= '<div class="col-xs-12 " style=" padding-right: 0px !important; padding-left: 0px !important; padding-top: 2vw; " >'
	 var classparaimagenes='col-xs-12';
		if(seccion.listaImagenes.length==1){
			classparaimagenes='col-xs-12 col-sm-12 col-md-12 col-lg-12';
		}else if(seccion.listaImagenes.length==2){
			classparaimagenes='col-xs-6 col-sm-6 col-md-6 col-lg-6';
		}else if(seccion.listaImagenes.length==3){
			classparaimagenes='col-xs-12 col-sm-4 col-md-4 col-lg-4';
		}else if(seccion.listaImagenes.length==4){
			classparaimagenes='col-xs-6 col-sm-3 col-md-3 col-lg-3';
		}else if(seccion.listaImagenes.length==5){
			classparaimagenes='col-xs-offset-0 col-xs-12  col-sm-offset-1  col-md-offset-1  col-lg-offset-1  col-sm-2 col-md-2 col-lg-2';
			classparaimagenesB='col-xs-12   col-sm-2 col-md-2 col-lg-2';
			
		}else{
			classparaimagenes='col-xs-12 col-sm-6 col-md-4 col-lg-3';
		}
		for(var i=0;i<seccion.listaImagenes.length;i++){
			
			if(seccion.listaImagenes.length==5){
				if(i==0){
					htmlText+= '<div class="'+ classparaimagenes+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
					
				}else{
					htmlText+= '<div class="'+ classparaimagenesB+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
					
				}
			}else{
				htmlText+= '<div class="'+ classparaimagenes+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
				
			}
			
			var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[i].imagen);
			
				htmlText+= '<img style="width: 100%" alt="'+nombreCartelImagen +'" src="'+seccion.listaImagenes[i].imagen+'">';
			
				htmlText+= '<div style="width:100%;    margin-top: -19px;">';
				htmlText+= '<div class="  " style="display:inline-block; padding:2vw; min-width: 150px; background-color: white;  padding-top: 10px; padding-bottom: 10px;  ">';
				htmlText+= '<div class="  " style="display:inline-block; margin-top:0px; min-width: 150px; background-color: white;  border: black; border-style: solid; border-width: 1px; padding-top: 10px; padding-bottom: 10px;  ">';
				htmlText+= '<div style=" background-color: white; margin-right: 3%; margin-left: 3%; margin-top: -13px; height: 10px"></div>';
				htmlText+= '<label id="labelverservicios" class="letraLato textoTituloItemPortfolio" style="FONT-WEIGHT: 100;margin-right:5%;margin-left:5%; text-align: center; line-height: 0;">'+ nombreCartelImagen +'</label>';
				htmlText+= '<div style="background-color: white; margin-right: 3%; margin-left: 3%; margin-bottom: -13px; height: 10px">';
				htmlText+= '</div></div></div></div>';
				
				htmlText+= '</div>';
				
		}
		
		htmlText+= '</div></div>';

		htmlForInsert+=	htmlText;	
}

function SeccionDeImagenesSinCartelIndividual1fila(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-left: 5vw; padding-right: 5vw; ">';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	htmlText+= '<div class="col-xs-12 " style=" padding-right: 0px !important; padding-left: 0px !important; padding-top: 2vw; " >';
	 var classparaimagenes='col-xs-12';
		if(seccion.listaImagenes.length==1){
			classparaimagenes='col-xs-12 col-sm-12 col-md-12 col-lg-12';
		}else if(seccion.listaImagenes.length==2){
			classparaimagenes='col-xs-6 col-sm-6 col-md-6 col-lg-6';
		}else if(seccion.listaImagenes.length==3){
			classparaimagenes='col-xs-12 col-sm-4 col-md-4 col-lg-4';
		}else if(seccion.listaImagenes.length==4){
			classparaimagenes='col-xs-6 col-sm-3 col-md-3 col-lg-3';
		}else if(seccion.listaImagenes.length==5){
			classparaimagenes='col-xs-offset-0 col-xs-12  col-sm-offset-1  col-md-offset-1  col-lg-offset-1  col-sm-2 col-md-2 col-lg-2';
			classparaimagenesB='col-xs-12   col-sm-2 col-md-2 col-lg-2';
			
		}else{
			classparaimagenes='col-xs-12 col-sm-6 col-md-4 col-lg-3';
		}
		
		for(var i=0;i<seccion.listaImagenes.length;i++){
			
			if(seccion.listaImagenes.length==5){
				if(i==0){
					htmlText+= '<div class="'+ classparaimagenes+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
					
				}else{
					htmlText+= '<div class="'+ classparaimagenesB+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
					
				}
			}else{
				htmlText+= '<div class="'+ classparaimagenes+'" style="padding-top: 1vw; padding-left: 2vw; padding-right: 2vw;">';
				
			}
			
			var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[i].imagen);
			
			htmlText+= '<img style="width: 100%" alt="'+nombreCartelImagen +'" src="'+seccion.listaImagenes[i].imagen+'">';
		
				
				htmlText+= '</div>';
				
		}
		
		htmlText+= '</div></div>';

		htmlForInsert+=	htmlText;	
}

function SeccionDeImageneUnicaSinCartelCentrada(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-left: 5vw; padding-right: 5vw; ">';
	var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[0].imagen);
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+= '<img style="margin: 0 auto; max-width: 100%" alt="'+nombreCartelImagen +'" src="'+seccion.listaImagenes[0].imagen+'">';

		htmlText+= '</div>';

		htmlForInsert+=	htmlText;	
}


function Seccion2Columnas1SolaImagen(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-right: 0px !important; padding-left: 0px !important;">';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+='<div class="col-xs-12" style="padding-top: 2vw;padding-left: 5vw; padding-right: 5vw;">';
	htmlText+='<div class="col-xs-12 col-sm-4" style=" padding-right: 2vw !important; padding-left: 0px !important; ">';
	htmlText+='<div class="col-xs-12" style="padding-top: 2vw; border: black; border-style: solid; border-width: 1px;">';
	for(var i=0;i<seccion.listaTextos.length;i++){
		if(i!=seccion.listaTextos.length-1){
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%;text-align: left; margin-bottom: 2vw">'+ seccion.listaTextos[i].valor+'</label>';
			
		}else{
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%;text-align: left;  margin-bottom: 5vw;">'+ seccion.listaTextos[i].valor+'</label>';
			
		}
		
	}
	htmlText+= '</div></div>';
	htmlText+='<div class="col-xs-12 col-sm-8" onclick="alaAppHome()" style="cursor:pointer; padding-right: 0px !important; padding-left: 0px !important; border: black; border-style: solid; border-width: 1px; text-align: center; " >';	
	htmlText+='<div class="col-xs-12" style="padding:1vw; ">';
	htmlText+='<img style="max-width: 100%;" alt="descanso" src="'+ seccion.listaImagenes[0].imagen +'">';
	htmlText+='</div></div></div></div>';
	
	
	htmlForInsert+=	htmlText;	
}

		


function Seccion1Frase(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-right: 0px !important; padding-left: 0px !important;">';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+= '<div class="col-lg-offset-2 col-lg-8  col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10  col-xs-offset-0 col-xs-12 " style=" margin-bottom: 5vw; padding-top: 3vw; padding-right: 0px !important; padding-left: 0px !important;" >';
	var cadenaDescripcion=seccion.listaTextos[0].valor;
	
	var res = cadenaDescripcion.split("SALTOLINEA");
	
	for(var i=0;i<res.length;i++){
		
			//alert(res[0]);
			if(res[i]!=null)
			if(res[i].length>0)
				
				htmlText+= '<label class="letrapequenaforfraseportfolio" style="text-align: center; ">'+ res[i]+'</label>';

	}
	htmlText+= '</div></div>';
	
	htmlForInsert+=	htmlText;	
}


function SeccionDentroTabletTextoDerecha(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row"  style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important; padding-right: 0px !important; padding-left: 0px !important;" >';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	
	htmlText+= '<div  class=" col-xs-12 row " 	style="margin-right: 0px !important; margin-left: 0px !important; background-color: #f5f5f5; padding-top: 3vw;" >';
	htmlText+= '<div id="idparatabletseccion'+ seccion.orden +'" class="col-xs-12 col-sm-12 col-md-6" style=" padding-right: 0px !important; padding-left: 0px !important;"> ';
	htmlText+= '<img style="opacity:0; z-index:10; left:0px; width: 100%;  " alt="" src="img/forPortfolio/ipad.png"></img>';
	htmlText+= '<div id="forCarousel'+ seccion.orden +'"  style=" position:absolute; top:0px; left:0px;   padding-right: 7%; padding-left: 19%; padding-top: 5%; padding-bottom: 23%; width: 100%;height: 100%">';
	htmlText+= '<div   style="z-index:2; width: 100%;  height: 100%" >';
	htmlText+= '<div  class="carousel slide row  col-xs-12 myCarousel" style="z-index:2; width: 100%;  height: 100%; margin-right: 0px !important; margin-left: 0px !important; padding-right: 0px !important; padding-left: 0px !important;" >';
	htmlText+= '<div 	style="z-index:2; height: 100%; padding-left: 0vw; padding-right: 0vw; margin-right: 0px !important; margin-left: 0px !important;" class="carousel-inner row  col-xs-12">';
	
	for(var i=0;i<seccion.listaImagenes.length;i++){
		if(i==0){
			htmlText+= '<div style="z-index:2; height: 100%; " class="item active">';
		}else{
			htmlText+= '<div style="z-index:2;height: 100%;" class="item">';
		}
		
		htmlText+= '<div class="col-xs-12" style="z-index:-2; overflow: hidden;  height: 100%; background: url('+seccion.listaImagenes[i].imagen +') center; background-size: cover; padding-left: 0vw; padding-right: 0vw; margin-right: 0px !important; margin-left: 0px !important;"></div></div>';
		

	}
	
	
	
	
	htmlText+= '</div></div></div></div>';
	htmlText+= ' <img  style="z-index: 5;position:absolute; top:0px; left:0px;width: 100%;" alt="" src="img/forPortfolio/ipad.png"></img></div>';
	htmlText+= '<div class="col-xs-12 col-sm-12 col-md-6" style=" padding-right: 2vw !important; padding-left: 0px !important; "><div class="col-xs-12" style="padding-top: 2vw; padding-left: 5vw;">';
	htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align:justify;  line-height: 1.6;">'+ seccion.listaTextos[0].titulo +'</label>';
	var cadenaDescripcion=seccion.listaTextos[0].valor;
	var res = cadenaDescripcion.split("SALTOLINEA");
		
		for(var i=0;i<res.length;i++){
			
				//alert(res[0]);
				if(res[i]!=null)
				if(res[i].length>0)
				htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%; text-align:justify; margin-bottom: 2vw">'+ res[i]+'</label>';	
		}
	
	htmlText+= '</div></div></div></div>';
	
	
	
	htmlForInsert+=	htmlText;	
}

function SeccionExpansibleConImagenesConBotonAmpliar(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="z-index:11;  margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;margin-top: -5vw" >';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+= '<div class=" col-xs-12 row " style="margin-right: 0px !important; margin-left: 0px !important; ">';
	htmlText+= '<div style="   margin-top: -25px; min-height: 0px; border-style: solid; border-color: black; border-width: 1px;" class="row distanciasservicios col-md-offset-1 col-md-10 col-xs-offset-0  col-xs-12">';
	htmlText+= '<div style="background-color: white; z-index:10; opacity:0.4; position: absolute;left: 0; top:0; width: 100%; height: 100%"></div>';
	htmlText+= '<div  id="contenedorsercicios'+ seccion.orden +'" style="height:0px; margin-right: 0px !important; margin-left: 0px !important;" class="contenedorEscondidohidden  row  col-xs-12">';
	
	var classparaimagenes='col-xs-12';
	if(seccion.listaImagenes.length==1){
		classparaimagenes='col-xs-12 col-sm-12 col-md-12 col-lg-12';
	}else if(seccion.listaImagenes.length==2){
		classparaimagenes='col-xs-6 col-sm-6 col-md-6 col-lg-6';
	}else if(seccion.listaImagenes.length==3){
		classparaimagenes='col-xs-12 col-sm-4 col-md-4 col-lg-4';
	}else if(seccion.listaImagenes.length==4){
		classparaimagenes='col-xs-6 col-sm-3 col-md-3 col-lg-3';
	}else if(seccion.listaImagenes.length==5){
		classparaimagenes='col-xs-offset-0 col-xs-12  col-sm-offset-1  col-md-offset-1  col-lg-offset-1  col-sm-2 col-md-2 col-lg-2';
		classparaimagenesB='col-xs-12   col-sm-2 col-md-2 col-lg-2';
		
	}else{
		classparaimagenes='col-xs-12 col-sm-6 col-md-4 col-lg-3';
	}
	
	for(var i=0;i<seccion.listaImagenes.length;i++){
		
		if(seccion.listaImagenes.length==5){
			if(i==0){
				htmlText+= '<div id="itemserviciosforheigth'+ seccion.orden +'" class="'+ classparaimagenes+'"  style="margin-top: 5px; z-index:12">';
				
			}else{
				htmlText+= '<div id="itemserviciosforheigth'+ seccion.orden +'" class="'+ classparaimagenesB+'"  style="margin-top: 5px; z-index:12">';
				
			}
		}else{
			htmlText+= '<div id="itemserviciosforheigth'+ seccion.orden +'" class="'+ classparaimagenes+'"  style="margin-top: 5px; z-index:12">';
			
		}
		var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[i].imagen);
		
		htmlText+= '<img  style=" max-width: 100%; width: 100%;" alt="'+nombreCartelImagen +'" src="'+seccion.listaImagenes[i].imagen+'">';
		htmlText+= '<div style="height: 100%;  max-width: 100%; width: 100%; position: absolute;     left: 0px; top: 0px; display: inline-block; vertical-align: middle; padding-left: 12%; padding-right: 12%">';
		htmlText+= '<span  onclick="verImagenesPopUp('+seccion.orden+','+ i +')"  style="text-align:center; cursor: pointer; width:100%;max-width:100%;padding:15px; top: 50%; left: 50%;  transform: translate(-50%,-50%); position: relative;display: inline-block; vertical-align: middle;" class="letrapequenabotones letraLato hvr-shutter-in-horizontal">';
		htmlText+= '+ </span></div></div>';
		htmlText+= '';
	
	}
	
	
	htmlText+= '</div></div>';
	htmlText+= '<div onclick="clickvermasseccion('+ seccion.orden +',\''+ seccion.listaTextos[0].valor +'\');" class=" col-lg-offset-5 col-lg-2 col-sm-offset-4 col-sm-4 col-xs-offset-1 col-xs-10 "	style="z-index:12; margin-top:-25px; min-width: 150px; background-color: white;  border: black; border-style: solid; border-width: 1px; padding-top: 10px; padding-bottom: 10px; cursor: pointer; ">';
	htmlText+= '<div style="cursor: pointer; width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-top: -13px; height: 10px"> </div>';
	htmlText+= '<label id="labelverservicios'+ seccion.orden +'" class="letraLato textoTituloItemPortfolio" style="FONT-WEIGHT: 100;width: 100%; cursor: pointer; text-align: center; line-height: 1.6;">'+ seccion.listaTextos[0].valor +'</label>';
	htmlText+= '<div style="cursor: pointer; width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-bottom: -13px; height: 10px">	</div>	</div>';
	htmlText+= '</div></div> ';
	
	
	
	htmlForInsert+=	htmlText;	
}
			
function SeccionAntesDespues2Columnas(seccion){
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row "style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;" >';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	htmlText+= '<div class=" col-xs-12 " style="padding-top: 3vw; padding-right: 5vw !important; padding-left:  5vw !important;" >';
	
	for(var i=1;i<seccion.listaImagenes.length;i++){
		
		for(var j=0;j<seccion.listaImagenes.length;j++){
			var nombreImg='';
			var nombreImgA='';
			if(seccion.listaImagenes[j].orden==i){
				nombreImg=seccion.listaImagenes[j].imagen;
				var res = nombreImg.split("_");
				
				res[res.length-2]=res[res.length-2]+'A';
				for(var p=0;p<res.length;p++){
					if(p==res.length-1){
						nombreImgA+=res[p]
					}else{
						nombreImgA+=res[p]+'_';
					}
					
				}
				htmlText+= '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style=" padding: 1vw;" >';
				htmlText+= '<div class="col-xs-12" style=" padding: 0px;" >';
				htmlText+= '<img style="width: 100%; " alt="ANTES" src="'+ nombreImg +'">';
				htmlText+= '<img style="position: absolute; left: 0; top: 0; width: 100%;" alt="imagen antes" src="'+ nombreImgA +'" class="cubreantesydespues conefectos">';
				htmlText+= '</div>	</div>';
			}
			
		}
		

	}
	
	

	htmlText+= '</div></div>';

	
	htmlForInsert+=	htmlText;	
}
	
function SeccionImagenAnchoCompleto(seccion){
	
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row "style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important; padding-left: 0px; padding-right: 0px;" >';
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	
	htmlText+= '<div  id="parallaxid'+ seccion.orden +'" class="col-xs-12  row parallax-window" data-parallax="scroll" data-image-src="'+seccion.listaImagenes[0].imagen+'"   style="background: transparent; margin-top:5vw; height:55vw; overflow:hidden; margin-right: 0px !important; margin-left: 0px !important; padding-left: 0px; padding-right: 0px;"></div>';
	htmlText+= '</div> 	';
	var objeto={};
	objeto.src=seccion.listaImagenes[0].imagen;
	objeto.nombre='#parallaxid'+ seccion.orden;
	
	arrayDeParallax.push(objeto);
	
	htmlForInsert+=	htmlText;	
}
		
function SeccionTextoConCabeceraAnchoCompleto(seccion){
	
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important; padding-left: 0px; padding-right: 0px;" >';
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	
	htmlText+= '<div  class=" col-xs-12 row " style="margin-right: 0px !important; margin-left: 0px !important; background-color: #f5f5f5; padding-top: 3vw;" >';
	htmlText+= '<div class="col-xs-12" style=" padding-left: 5vw; padding-right: 5vw;">';
	htmlText+= '<div class="col-xs-12" style="padding-top: 2vw; ">';
	htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align:justify;  line-height: 1.6;margin-bottom: 3vw">'+ seccion.listaTextos[0].titulo +'</label>';
	var cadenaDescripcion=seccion.listaTextos[0].valor;
	var res = cadenaDescripcion.split("SALTOLINEA");
		
		for(var i=0;i<res.length;i++){
			
				//alert(res[0]);
				if(res[i]!=null)
				if(res[i].length>0)
				htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="width: 100%; text-align:justify; margin-bottom: 2vw">'+ res[i]+'</label>';	
		}
	
	
	
	
	
	htmlText+= '</div></div></div></div>';
	
	htmlForInsert+=	htmlText;	
}

	
function SeccionImagenesConBotonAmpliarVariasFilas(seccion){
	
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important; padding-left: 0px; padding-right: 0px;" >';
	arrayDeSeccionesPopUp[seccion.orden]=seccion;
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	for(var i=0;i<seccion.listaImagenes.length;i++){
		var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[i].imagen);
		htmlText+= '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" style=" padding: 1vw;" >';
		htmlText+= '<div class="col-xs-12" style="cursor:pointer; padding: 0px;" onclick="verImagenesPopUp('+seccion.orden+','+ i +')">';
		htmlText+= '<img style="width: 100%; "   alt="'+nombreCartelImagen +'"  src="'+ seccion.listaImagenes[i].imagen+'">';
		htmlText+= '</div>	</div>';
	}
		
	
	htmlText+= '</div> ';
	htmlForInsert+=	htmlText;	
}
	
function lanzarPopUpImagenes(pos){
	var htmlText='';  
	var pasar=false;
	var altoNavegador = $(window).height();
	alto=altoNavegador-250+"px";
	var moodboard="false";
	altoTotal=0;
	
	if(decoradorObject.trabajoses[pos].Proyectos==null){
		var seccion=decoradorObject.trabajoses[pos].imagenesTrabajos;
		pasar=true; 
	} else { 
		if(decoradorObject.trabajoses[pos].Proyectos.propuestas[1].imagenes.length==0){
			pasar=false;
			if(decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard!="") {  
				moodboard="true"; 
			}
		}
		else {
			var seccion=decoradorObject.trabajoses[pos].Proyectos.propuestas[1].imagenes;
			pasar=true;
			if(decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard!="") { 
				htmlText+= '<div class=" conefectos text-center item active">';
				htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.preferencias[0].habitacion +'" src="'+urlbuckets3 + 'moodboards/'+ decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard+'.png" style="width:100%;vertical-align:middle;display:inline">';
				htmlText+= '</div> ';
				moodboard="true"; 
			}
		}
	}
	
	if(pasar){
		
		for(var i=0;i<seccion.length;i++){
			if(i==0){
				if(moodboard=="true"){
					htmlText+= '<div class=" conefectos text-center item">';
					moodboard="false"; 
				} else {
					htmlText+= '<div class=" conefectos text-center item active">';
					moodboard="true"; 
				}
			}else{
				htmlText+= '<div class=" conefectos text-center item">';
			}
			var nombreCartelImagen=dameNombreImagen(seccion[i]);
			fotografia=new Image();
	
			if(decoradorObject.trabajoses[pos].Proyectos==null){
				fotografia.src=urlbuckets3+'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[pos].id+'/'+seccion[i];
			} else { 
				fotografia.src=urlbuckets3+'usuarios/'+decoradorObject.trabajoses[pos].Proyectos.userMail+'/'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto+'/propuestas/'+seccion[i];
			}
			
			anchoFoto=fotografia.width;
			altoFoto=fotografia.height;
			if(altoFoto>altoTotal){
				altoTotal=altoTotal+altoFoto;
			}
			if(anchoFoto>altoFoto){ 
				if(decoradorObject.trabajoses[pos].Proyectos==null){
					htmlText+= '<img alt="'+nombreCartelImagen +'" src="'+urlbuckets3+'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[pos].id+'/'+seccion[i]+'" style="width:100%;vertical-align:middle;display:inline">';
				} else {
					htmlText+= '<img alt="'+nombreCartelImagen +'" src="'+urlbuckets3+'usuarios/'+decoradorObject.trabajoses[pos].Proyectos.userMail+'/'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto+'/propuestas/'+seccion[i]+'" style="width:100%;vertical-align:middle;display:inline">';
				}
				
			} else {
				if(decoradorObject.trabajoses[pos].Proyectos==null){
					htmlText+= '<img alt="'+nombreCartelImagen +'" src="'+urlbuckets3+'decoradores/'+decoradorObject.mail+'/trabajos/'+decoradorObject.trabajoses[pos].id+'/'+seccion[i]+'" style="width:100%;vertical-align:middle;display:inline;height:auto">';
				} else {
					htmlText+= '<img alt="'+nombreCartelImagen +'" src="'+urlbuckets3+'usuarios/'+decoradorObject.trabajoses[pos].Proyectos.userMail+'/'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto+'/propuestas/'+seccion[i]+'" style="width:100%;vertical-align:middle;display:inline">';
				}
			}
			htmlText+= '</div> ';
		}
	} else { 
			fotografia=new Image();
			fotografia.src=urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[pos].Proyectos.ldlcs[0].imagen;
			
			anchoFoto=fotografia.width;
			altoFoto=fotografia.height;
			if(altoFoto>altoTotal){
				altoTotal=altoTotal+altoFoto;
			}
			 
			if(decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard==undefined) {
				htmlText+= '<div class=" conefectos text-center item active">'; 
				htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto +'" src="'+urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[pos].Proyectos.ldlcs[0].imagen+'" style="width:100%;vertical-align:middle;display:inline">';
				htmlText+= '</div> '
			} else {
				if(decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard!="") { 
					htmlText+= '<div class=" conefectos text-center item active">';
					htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.preferencias[0].habitacion +'" src="'+urlbuckets3 + 'moodboards/'+ decoradorObject.trabajoses[pos].Proyectos.preferencias[0].id_moodboard+'.png" style="width:100%;vertical-align:middle;display:inline">';
					htmlText+= '</div> '; 
					htmlText+= '<div class=" conefectos text-center item">'; 
					htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto +'" src="'+urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[pos].Proyectos.ldlcs[0].imagen+'" style="width:100%;vertical-align:middle;display:inline">';
					htmlText+= '</div> ';
				} else {
					htmlText+= '<div class=" conefectos text-center item active">'; 
					htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto +'" src="'+urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[pos].Proyectos.ldlcs[0].imagen+'" style="width:100%;vertical-align:middle;display:inline">';
					htmlText+= '</div> ';
				}
			}
				htmlText+= '<div class=" conefectos text-center item">';
				htmlText+= '<img alt="'+decoradorObject.trabajoses[pos].Proyectos.nombreProyecto +'" src="'+urlbuckets3 + 'ldlc/imagenes/'+ decoradorObject.trabajoses[pos].Proyectos.ldlcs[1].imagen+'" style="width:100%;vertical-align:middle;display:inline">';
				htmlText+= '</div> ';
				 
	}
	if(altoTotal>alto) { 
		$('#myCarousel2').css("height",alto);
		$('#myCarousel2').css("width","auto");
	} else { 
		$('#myCarousel2').css("width","750px");
	}
	$('#carouselinnerForImages2').html(htmlText);
	$('#modalforperfiles').modal('show');
	setTimeout(function() { carouselNormalization3(); }, 500);
}
	
function carouselNormalization2() { 
	var items = $('#myCarousel #carouselinner .item'), //grab all slides
	items2 = $('#myCarousel #carouselinner .item #cuerpoPerfiles .conefectossuaves'), //grab all slides
	    heights = [], //create empty array to store height values
	    tallest; //create variable to make note of the tallest slide

	if (items.length) {
	    function normalizeHeights() {
	    	//alert("normalice");
	        items2.each(function() { //add heights to array
	            heights.push($(this).height()); 
	        });
	        tallest = Math.max.apply(null, heights); //cache largest value
	        items.each(function() {
	            $(this).css('height',tallest + 'px'); 
	            $(this).css('margin','0px auto');
	            $(this).css('text-align','center');
	        });
	        items2.each(function() { 
	            $(this).css('line-height',tallest + 'px');  
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
	            $(this).css('height','0'); //reset min-height
	        }); 
	        normalizeHeights(); //run it again 
	    });
	}
}
function carouselNormalization3() {
	var items = $('#carouselinnerForImages2 .item '), //grab all slides
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
	            $(this).css('line-height',tallest + 'px'); 
	            $(this).css('margin','0px auto');
	            $(this).css('text-align','center');
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
function xxxxx(seccion){
	
	var htmlText='<div id="section'+ seccion.orden +'" class=" col-xs-12 row " style="margin-bottom:5vw; margin-right: 0px !important; margin-left: 0px !important;padding-right: 0px !important; padding-left: 0px !important;">';
	
	var titulo=getTextoDeTitulo(seccion.listaTextos, 'TITULO');
	
	if(titulo.length>0){
		htmlText+=pintatitulo(titulo);
		seccion.listaTextos.shift();
	}
	
	
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlText+= '';
	htmlForInsert+=	htmlText;	
}


function tratarSeccion(seccion){
	
	if(seccion.tipoSeccion=='SliderPantallaCompletaTextoCentralTextoSecundario'){
		SliderPantallaCompletaTextoCentralTextoSecundario(seccion);
	}else if(seccion.tipoSeccion=='TextoConCuadroDerecha'){
		TextoConCuadroDerecha(seccion);
	}else if(seccion.tipoSeccion=='SeccionDeImagenesConCartelIndividual1fila'){
		SeccionDeImagenesConCartelIndividual1fila(seccion);
	}else if(seccion.tipoSeccion=='SeccionDeImagenesSinCartelIndividual1fila'){
		SeccionDeImagenesSinCartelIndividual1fila(seccion);
	}else if(seccion.tipoSeccion=='Seccion2Columnas1SolaImagen'){
		Seccion2Columnas1SolaImagen(seccion);
	}else if(seccion.tipoSeccion=='Seccion1Frase'){
		Seccion1Frase(seccion);
	}else if(seccion.tipoSeccion=='SeccionDentroTabletTextoDerecha'){
		SeccionDentroTabletTextoDerecha(seccion);
	}else if(seccion.tipoSeccion=='SeccionExpansibleConImagenesConBotonAmpliar'){
		SeccionExpansibleConImagenesConBotonAmpliar(seccion);
	}else if(seccion.tipoSeccion=='SeccionAntesDespues2Columnas'){
		SeccionAntesDespues2Columnas(seccion);
	}else if(seccion.tipoSeccion=='SeccionImagenAnchoCompleto'){
		SeccionImagenAnchoCompleto(seccion);
	}else if(seccion.tipoSeccion=='SeccionTextoConCabeceraAnchoCompleto'){
		SeccionTextoConCabeceraAnchoCompleto(seccion);
	}else if(seccion.tipoSeccion=='SeccionImagenesConBotonAmpliarVariasFilas'){
		SeccionImagenesConBotonAmpliarVariasFilas(seccion);
	}else if(seccion.tipoSeccion=='SeccionDeImageneUnicaSinCartelCentrada'){
		SeccionDeImageneUnicaSinCartelCentrada(seccion);
	}
	
}

var portfolios;
function getPortfolioItemsFunction(posicion) {

	
	//alert(urlbaseForAjax + '/GetPortfolio');
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
					url : urlbaseForAjax + '/GetPortfolio',
					
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {tipo :'Decoradores', lista:'todo'},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
						
						/*for(var i=0;i<data.length;i++){//este lo usabamos cuando utilizabamos una posicion en vez de la url
							if(data[i].id==posicion){
								item=data[i];
								break;
							}
						}*/
						portfolios=data;
						for(var i=0;i<data.length;i++){
							if(data[i].imagenPrincipal.indexOf(posicion) !== -1){
								item=data[i];
								break;
							}
						}
						//alert(item.imagenPrincipal);
						//tratar secciones
						for(var i=0;i<item.listaSecciones.length;i++){
							tratarSeccion(item.listaSecciones[i]);
							
						}
						$('#divforportfoliosections').html(htmlForInsert);
						$('.myCarousel').carousel({
							  interval: 4000,
							  pause: "false"
							})
							
							for(var i=0;i<arrayDeParallax.length;i++){
								
								$(arrayDeParallax[i].nombre).parallax({imageSrc: arrayDeParallax[i].src});
							}
						
						$("img").one("load", function() {
							jQuery(window).trigger('resize').trigger('scroll');
							//alert('cargo cargo');
							}).each(function() {
							  if(this.complete) $(this).load();
							});
						
						
						
						
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}



function verImagenesPopUp(numeroSeccion, posicion){
	var htmlText='';
	var seccion=arrayDeSeccionesPopUp[numeroSeccion];
	for(var i=0;i<seccion.listaImagenes.length;i++){
		if(i==posicion){
			htmlText+= '<div class=" conefectos text-center item active">';
		}else{
			htmlText+= '<div class=" conefectos text-center item">';
		}
		var nombreCartelImagen=dameNombreImagen(seccion.listaImagenes[i].imagen);
		htmlText+= '<img style="margin: 0 auto; max-width: 100%" alt="'+nombreCartelImagen +'" src="'+seccion.listaImagenes[i].imagen+'">';
		htmlText+= '</div> ';
	}
	
	$('#carouselinnerForImages').html(htmlText);
	$('#modalforperfiles').modal('show');
}

function clickvermasseccion(itemNumber, textoforlabel){
	var iddelelemento='labelverservicios'+itemNumber+'';
	var iddelelementoforheigth='itemserviciosforheigth'+itemNumber+'';
	var iddelelementoforheigthcontenedor='contenedorsercicios'+itemNumber+'';
	var texto=document.getElementById(iddelelemento).innerHTML;
	var textoCerrar='CERRAR X';
	var compara=texto.localeCompare(textoCerrar);
	var contenedorsercicios = document.getElementById(iddelelementoforheigthcontenedor);
	var itemserviciosforheigth = document.getElementById(iddelelementoforheigth);

	var anchoitem= itemserviciosforheigth.offsetWidth;
	var altoitem = itemserviciosforheigth.offsetHeight;
	
	var anchoContenedor= contenedorsercicios.offsetWidth;
	
	//alert(anchoContenedor);
	//alert(altoitem);
	
	var anchoporcuatro=anchoitem*4;
	var anchopordos=anchoitem*2;
	
	var altoausar= altoitem+10;
	if(anchoporcuatro<anchoContenedor){
		 altoausar= altoitem+10;
	}else if(anchopordos<anchoContenedor){
		 altoausar= altoausar*2;
	}else {
		altoausar= altoausar*4;
	}
	//alert(altoausar);
	if(compara!=1){
		contenedorsercicios.setAttribute("class", "contenedorEscondidohidden row  col-xs-12");
		document.getElementById(iddelelemento).innerHTML = textoforlabel;
		contenedorsercicios.style.height='0px';
	}else{
		contenedorsercicios.setAttribute("class", "contenedorEscondidoshowing row  col-xs-12");
		document.getElementById(iddelelemento).innerHTML = textoCerrar;
		contenedorsercicios.style.height=altoausar+'px';
	}
	
	
	var crono= setInterval(function(){clearInterval(crono);jQuery(window).trigger('resize').trigger('scroll');}, 805);
	
	
}

function lanzarportfolioindividualotros( imagenprincipal, titulo){
	//alert(imagenprincipal);
	//alert(titulo);
	
	


	var arrimagenprincipal=imagenprincipal.split("/");
	var arrtitulo=titulo.split(" ");
	var totaltit=arrtitulo[0]
	for(var i = 1; i<arrtitulo.length; i++){
		totaltit=totaltit+"_"+arrtitulo[i];
	}
	/*deleteCookie('portfolioitemcoockie');
	var cook=JSON.stringify(data[posicion]);
	setCookie('portfolioitemcoockie', 'jpaaaaa', 365);*/
	
	
	var href = urlbase + "/PortfolioIndividual.html?titulo="+totaltit+"&tipo="+arrimagenprincipal[1]+"&id="+arrimagenprincipal[2];
	window.location = href;
	
}


function irasiguiente(){
	var idint= parseInt(QueryString.id);
	//alert(idint);
	idint++;
	var portfoliobuscado=null;
	for(var j=0;j<25;j++){
		var substringToFind= "/"+QueryString.tipo+"/"+idint+"/";
		for(var i=0;i<portfolios.length;i++){
			if(portfolios[i].imagenPrincipal.indexOf(substringToFind) !== -1){
				portfoliobuscado=portfolios[i];
				break;
			}
		}
		if(portfoliobuscado==null){
			if(idint>=22){
				idint=0;
			}else{
				idint++;
			}
		}else{
			lanzarportfolioindividualotros(portfoliobuscado.imagenPrincipal, portfoliobuscado.titulo)
			break;
		}
	}
	
}
function iraanterior(){
	var idint= parseInt(QueryString.id);
	//alert(idint);
	idint--;
	if(idint==0) idint=23;
	var portfoliobuscado=null;
	for(var j=0;j<25;j++){
		var substringToFind= "/"+QueryString.tipo+"/"+idint+"/";
		for(var i=0;i<portfolios.length;i++){
			if(portfolios[i].imagenPrincipal.indexOf(substringToFind) !== -1){
				portfoliobuscado=portfolios[i];
				break;
			}
		}
		if(portfoliobuscado==null){
			if(idint<=0){
				idint=22;
			}else{
				idint--;
			}
		}else{
			lanzarportfolioindividualotros(portfoliobuscado.imagenPrincipal, portfoliobuscado.titulo)
			break;
		}
	}
}
function iragaleria(){
	var href = urlbase + "/Portfolio.html";
	window.location = href;
}
