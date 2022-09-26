var urlnombreproyecto = "OnlineAssistance";
function cargarBotonCrearProyectoHomecom(){
	

	
	var cronometroParaBotonMoodboard;
	var bgImg = new Image();
	bgImg.onload = function(){
		var myDiv=document.getElementById('sidebarmenubtnmoodboardimage');
		myDiv.src= bgImg.src;
		cronometroParaBotonMoodboard= setInterval(
			   function(){
				  // alert("aaaa");
				   clearInterval(cronometroParaBotonMoodboard);
				   $('.sidebarmenubtnmoodboard').animate({
					   right: '0px'
			        },500)
			   }
			   , 1);
	};
	if(cosas.length<3){
		bgImg.src = "../img/other/boton-CREA-PROYECTO.png";
	}else{
		bgImg.src = "../"+urlnombreproyecto+"/img/other/boton-CREA-PROYECTO.png";
	}
	
}

 
function addNombre(nombre, id){ 
	 try {

	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

	  			data : {
	  				token : "token",
	  				id: id,
	  				action : "nombre_espacio",
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


function getPorfolioItems() {

	var p_1 = getCookie("paso1");
	var p_2 = getCookie("paso2");
	var p_3 = getCookie("paso3");
	var p_4 = getCookie("paso4");
	var p_5 = getCookie("paso5");

	try {
		

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/GetImages',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {
						paso1 : p_1,
						paso2 : p_2,
						paso3 : p_3,
						paso4 : p_4,
						paso5 : p_5
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// BootstrapDialog.alert("register:);
						// $usuarioGlobal=data;
						var html = '';
						html += '<div style="width: 100%; text-align: center;">';
						html += '<img style="max-width: 100%; width: 450px;" alt="Selecciona imágenes" src="img/other/seleccionaimagenes.png"/></div><br/>';
						
						html += '<div id="divforimages" class="masonry container-fluid  text-center">';
						for (var i = 0; i < data.length; i++) {
							html += '<div style="position: relative;" class="cc-selector" onclick="checkRadioButtonsPaso6()">';
							html += '<input type="checkbox" name="radioimagenes" id="'
									+ data[i].nombre
									+ '" style="display: none;" value="'
									+ data[i].nombre + '" />';
							html += '<label  class="drinkcard-cc separacionBottom_20" for="'
									+ data[i].nombre + '">';
							html += '<img style="box-shadow: 0 0 0px 0px #e9d12f; width: 100%;"  src="img/imagenes/'
									+ data[i].nombre
									+ '" alt="'
									+ data[i].nombre
									+ '"/><img src="img/other/whitepixel.png"   class="seleccionadaimagenover"/><img  src="img/other/okimage.svg"  class="seleccionadaimagen"/>';
							html += '</label>';
							html += '</div>';

						}
						html += '</div>';
						html += '<div class="row   text-center separacionSuperior_botonera"> <button type="button" href="#myCarousel" data-slide="prev" onclick="clickAnterior()" class="boton-anterior  separacionDerecha_5"></button>';
						html += '<button type="button" id="botonSiguientePaso6" href="#myCarousel" data-slide="next" class="boton-siguiente  separacionIzq_5 disabled" onclick="clickSiguientePaso6()"></button></div>';
						html += '<br/>';
						html += '<br/>';
						// BootstrapDialog.alert(html);
						$('#divforimages').html(html);
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}













$('#myCarousel').carousel({
  interval: 10000
})

$('#myCarouselBlog').carousel({
  interval: 6000
})


/*  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);*/





function clickverservicios(){
	
	var texto=document.getElementById('labelverservicios').innerHTML;
	var textoCerrar='CERRAR X';
	var compara=texto.localeCompare(textoCerrar);
	var contenedorsercicios = document.getElementById("contenedorsercicios");
	var itemserviciosforheigth = document.getElementById("itemserviciosforheigth");

	var anchoitem= itemserviciosforheigth.offsetWidth;
	var altoitem = itemserviciosforheigth.offsetHeight;
	
	var anchoContenedor= contenedorsercicios.offsetWidth;
	
	//alert(anchoContenedor);
	//alert(altoitem);
	
	var anchoporcuatro=anchoitem*3;
	var anchopordos=anchoitem*2;
	
	var altoausar= altoitem+10;
	if(anchoporcuatro<anchoContenedor){
		 altoausar= altoitem+10;
	}else {
		altoausar= altoausar*3;
	}
	//alert(altoausar);
	if(compara!=1){
		contenedorsercicios.setAttribute("class", "contenedorEscondidohidden row  col-xs-12");
		document.getElementById('labelverservicios').innerHTML = "VER SERVICIOS +";
		contenedorsercicios.style.height='0px';
	}else{
		contenedorsercicios.setAttribute("class", "contenedorEscondidoshowing row  col-xs-12");
		document.getElementById('labelverservicios').innerHTML = textoCerrar;
		contenedorsercicios.style.height=altoausar+'px';
	}
	var crono= setInterval(function(){clearInterval(crono);jQuery(window).trigger('resize').trigger('scroll');}, 805);
}
function clickverdecomini(){
	
	var texto=document.getElementById('labelverdecomini').innerHTML;
	var textoCerrar='cerrar!';
	var compara=texto.localeCompare(textoCerrar);
	//alert(compara);
	//alert(texto +'-'+ textoCerrar);
	var contenedorsercicios = document.getElementById("contenedordecomini");
	var itemserviciosforheigth = document.getElementById("itemdecominiforheigth");

	var anchoitem= itemserviciosforheigth.offsetWidth;
	var altoitem = itemserviciosforheigth.offsetHeight;
	
	var anchoContenedor= contenedorsercicios.offsetWidth;
	
	//alert(anchoContenedor);
	//alert(altoitem);
	
	var anchoporcuatro=anchoitem*4;
	var anchopordos=anchoitem*2;
	
	var altoausar= altoitem+10;
	/*if(anchoporcuatro<anchoContenedor){
		 altoausar= altoitem+10;
	}else if(anchopordos<anchoContenedor){
		 altoausar= altoausar*2;
	}else {
		altoausar= altoausar*4;
	}*/
	//alert(altoausar);
	if(compara==0){
		contenedorsercicios.setAttribute("class", "contenedorEscondidohidden row  col-xs-12");
		document.getElementById('labelverdecomini').innerHTML = "saber más!";
		contenedorsercicios.style.height='0px';
	}else{
		contenedorsercicios.setAttribute("class", "contenedorEscondidoshowing row  col-xs-12");
		document.getElementById('labelverdecomini').innerHTML = textoCerrar;
		contenedorsercicios.style.height=altoausar+'px';
	}
	
}



function cerrarServicios(){
	
	var texto=document.getElementById('labelverservicios').innerHTML;
	var textoCerrar='CERRAR X';
	var compara=texto.localeCompare(textoCerrar);
	var contenedorsercicios = document.getElementById("contenedorsercicios");
	var itemserviciosforheigth = document.getElementById("itemserviciosforheigth");
	var anchoitem= itemserviciosforheigth.getAttribute("width");
	var altoitem= itemserviciosforheigth.getAttribute("height");
	
	var anchoContenedor= contenedorsercicios.getAttribute("width");
	
	var anchoporcuatro=anchoitem*4;
	var anchopordos=anchoitem*4;
	
		contenedorsercicios.setAttribute("class", "contenedorEscondidohidden row  col-xs-12");
		document.getElementById('labelverservicios').innerHTML = "VER SERVICIOS +";
		contenedorsercicios.style.height='0px';

}





//for video
var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

jQuery(function() { // runs after DOM has loaded
    
	//vid_w_orig = parseInt(jQuery('video-background').attr('width'));
    //vid_h_orig = parseInt(jQuery('video-background').attr('height'));
    vid_w_orig = 1494;
    vid_h_orig = 770;
    //alert(vid_w_orig);
    //alert(vid_h_orig);
   //alert("domcargado");
    
    jQuery(window).resize(function () { resizeToCover(); });
    jQuery(window).trigger('resize');
});

function resizeToCover() {
	
    // set the video viewport to the window size
    jQuery('#eldivquecontienealvideo').width(jQuery(window).width());
    jQuery('#eldivquecontienealvideo').height(jQuery(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery('#eldivquecontienealvideo').width() / vid_w_orig;
    var scale_v = jQuery('#eldivquecontienealvideo').height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;
    
    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    jQuery('video').width(scale * vid_w_orig);
    jQuery('video').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    jQuery('#eldivquecontienealvideo').scrollLeft((jQuery('video').width() - jQuery('#eldivquecontienealvideo').width()) / 2);
    jQuery('#eldivquecontienealvideo').scrollTop((jQuery('video').height() - jQuery('#eldivquecontienealvideo').height()) / 2);
   // alert("hola2");
   // cerrarServicios();//cierro el desplegable de los servicios porque al resizear no quedaría bien.
 };

/* var video = document.getElementById("video-background");
 var divvideo = document.getElementById("divforcovervideo");
 
 document.addEventListener("DOMContentLoaded", init, false);

 var flagforvideo=false;
 function init() {
	 //alert("ooo");
	 // REVISAR
	 video.addEventListener("progress", progressfunct, false);
	 video.addEventListener("playing", play_clicked, false);
	
 }*/

 function play_clicked() {
     //alert("play was clicked");
     if(flagforvideo){
    	 divvideo.setAttribute("class", "invisible articletitle row minimoAlto");
     }else{
    	 flagforvideo=true;
     }
     video.removeEventListener("playing", play_clicked);
 }
 
 function progressfunct() {
    // alert("progress");
     if(flagforvideo){
    	// alert("progressExito");
    	 divvideo.setAttribute("class", "invisible articletitle row minimoAlto");
     }else{
    	// alert("flag");
    	 flagforvideo=true;
     }
     video.removeEventListener("progress", progressfunct);
 }
 
 
 

//use the whole window and a *named function*
	window.addEventListener('touchstart', function videoStart() {
		
		video.play();
		// remove from the window and call the function we are removing
		this.removeEventListener('touchstart', videoStart);
	});


	function unhoverForTienda(element) {
	    element.setAttribute('src', 'img/forHome/tiendaboton.png');
	}
	function hoverForTienda(element) {
		 element.setAttribute('src', 'img/forHome/tiendabotonhover.png');
	}
	function unhoverForDeco(element) {
	    element.setAttribute('src', 'img/forHome/decoboton.png');
	}
	function hoverForDeco(element) {
		 element.setAttribute('src', 'img/forHome/decobotonhover.png');
	}
	function unhoverForBlog(element) {
	    element.setAttribute('src', 'img/forHome/blogboton.png');
	}
	function hoverForBlog(element) {
		 element.setAttribute('src', 'img/forHome/blogbotonhover.png');
	}


function unhoverForCoraliaHome(element) {
    element.setAttribute('src', 'img/forHome/coralia1home.png');
}

function hoverForCoraliaHome(element) {
	 element.setAttribute('src', 'img/forHome/coralia2home.png');
}

function lanzarPopUpImagenes(proyecto,pos){
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
	var proyectoEnCuestion=proyectos_ajax[proyecto];; 

		var altoNavegador = $(window).height();
		var anchoNavegador = $(window).width();
		alto=altoNavegador-200+"px";
		var tipoHabi2="";
		var k="";
		for(var l = 0; l < proyectoEnCuestion.preferencias.length; l++) {
			if(proyectoEnCuestion.preferencias[l].id_moodboard!=""  || proyectoEnCuestion.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}
		var f="";
		var bandera=true;
		var items=0;
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
					items++;
					if (id_moodboard=="" || id_moodboard==0) {
						htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;height:'+alto+';width:auto" alt="'+tipoHabi2+'"/></div>';
					} else {
						htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto+';width:auto" alt="Moodboard"/></div>';
					}
				} else { }
			}
			else {
				// SIGUIENTES ITEMS
				if (tipoHabi2!="noColocar"){
					items++;
					if (id_moodboard=="" || id_moodboard==0) {
						htmlText += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbase+'/img/'+tipoHabi2+'.png";" style="display:inline;border:1px solid grey;height:'+alto+';width:auto" alt="'+tipoHabi2+'"/></div>';
					} else {
						htmlText += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto+';width:auto" alt="Moodboard"/></div>';
					}
				} else { } 	 
			}
		}
		if(items>1){
			htmlText +='</div>';
			htmlText +='<a class=" conefectossuaves carousel-control left" style="width: 2%; text-shadow: none; background-image: none;  color:black;   -webkit-text-stroke: 3px white;left:-5px"  href="#myCarousel4" data-slide="prev">';
			htmlText += '    <span class=" conefectossuaves glyphicon glyphicon-chevron-left"></span>';
			htmlText +=' </a>';
			htmlText +=' <a class=" conefectossuaves carousel-control right" style="width: 2%; text-shadow: none; background-image: none; color:black;  -webkit-text-stroke: 3px white;right:-5px"   href="#myCarousel4" data-slide="next">';
			htmlText +='      <span class=" conefectossuaves glyphicon glyphicon-chevron-right"></span>';
			htmlText +='  </a>';
		}

	$('#myCarousel4').html(htmlText);
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
