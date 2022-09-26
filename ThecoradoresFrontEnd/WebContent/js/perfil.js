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
 


function deleteFile(fichero) {
	

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



function getRRSS(cadena){
	if(cadena=="" || cadena==null){
		
	}else {
		return cadena.split("RRSS_rrss");
	}
}

function insertaselementos(){ 
	var retrievedObjectdecorador = localStorage.getItem('decoradorobject');
	decorador=JSON.parse(retrievedObjectdecorador);  
	cargarDropzonePlanos(false); 
	var cara="";  
	if (decorador.filesCara[0]!=undefined) {
		// IMAGEN CIRCULAR SIN IMPORTAR TAMAÑO
		cara +='<div class="col-xs-12"><div id="centrarImg" style="z-index: 1; margin-top: calc(-50px - 1.5vw); height:calc(100px + 3vw);width:calc(100px + 3vw); background-color:grey;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;padding-bottom: 2%;overflow:hidden ">';
		cara +='<img alt="cara"  style="height:calc(100px + 3vw);width:auto" src="'+urlbuckets3+'decoradores/'+decorador.mail+'/perfiles/cara/'+decorador.filesCara[0]+'">';
		cara +='</div></div>';
		
		/*cara +='<div id="imagencara" style="z-index: 1; margin-top: calc(-50px - 1.5vw); padding-bottom: 2%; " class="col-xs-12">';
		cara +='<img alt="cara"  style="height:calc(100px + 3vw); background-color:grey;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;" src="'+urlbuckets3+'decoradores/'+decorador.mail+'/perfiles/cara/cara.jpg">';
		cara +='</div>';*/
	}
	cara +='<h1 class="letra-xl col-xs-12 letra-negrita">TU PERFIL</h1>'; 
	cara +='	<p class="col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 letra-s" style="margin-top:1%">Es muy importante ';
	cara +='	crear un perfil lo más actualizado posible';
	cara +='	¡Los usuarios lo valorarán!</p>';
	
	$('.cara').html(cara);
 
	 document.getElementById('input_nombre').value=decorador.nombre;
	 document.getElementById('input_texto_decorador').value= decorador.texto_decorador; 
	 var arryderrss=getRRSS(decorador.urlRss);
	 if(decorador.disponibilidad=="" || decorador.disponibilidad==null){
			
	 } else { 
		 document.getElementById('dateInputforDisponibilidad').value= decorador.disponibilidad; 
	 } 
	 if(decorador.activo=="1"){
		 document.getElementById('disponibilidad').checked = false;
	 } else if(decorador.activo=="0") { 
		 $('.disponible').css("display", "none");
	 }else {  
		 document.getElementById('disponibilidad').checked = true;
		 var c = document.getElementById('disponibilidad').checked; 
            $(".fechaInput").show(); 
	 }
	 if(decorador.urlRss=="" || decorador.urlRss==null){
			
	 }else {
	 document.getElementById('input_facebook').value=arryderrss[0];
	 document.getElementById('input_instagram').value=arryderrss[1];
	 document.getElementById('input_twitter').value=arryderrss[2];
	 document.getElementById('input_pinterest').value=arryderrss[3];
	 document.getElementById('input_be').value=arryderrss[4];
	 document.getElementById('input_linkedlink').value=arryderrss[5];
	 document.getElementById('input_youtube').value=arryderrss[6];
	 document.getElementById('input_blog').value=decorador.urlBlog;
	}
	 for(var i=0;i<decorador.etiquetas.length;i++){
		 if(decorador.etiquetas[i].id==1){
			 document.getElementById('cb1').checked=true;
		 } 
		 if(decorador.etiquetas[i].id==2){
			 document.getElementById('cb2').checked=true;
		 }
		 if(decorador.etiquetas[i].id==3){
			 document.getElementById('cb3').checked=true;
		 }
		 if(decorador.etiquetas[i].id==4){
			 document.getElementById('cb4').checked=true;
		 }
		 if(decorador.etiquetas[i].id==5){
			 document.getElementById('cb5').checked=true;
		 }
		 if(decorador.etiquetas[i].id==6){
			 document.getElementById('cb6').checked=true;
		 }
		 if(decorador.etiquetas[i].id==7){
			 document.getElementById('cb7').checked=true;
		 }
		 if(decorador.etiquetas[i].id==8){
			 document.getElementById('cb8').checked=true;
		 }
		 if(decorador.etiquetas[i].id==9){
			 document.getElementById('cb9').checked=true;
		 }
	 }
	 
	 
	 console.log(decorador);
	 
	 
	 
	 var htmlfortrabajos="";
	 for(var i=0;i<decorador.trabajoses.length;i++){
		 htmlfortrabajos+='<div class="col-xs-12" style="border:none;border-bottom:1px solid black; margin-top:2%;padding-left:5px;padding-right:5px">';
		 htmlfortrabajos+='<label class="col-xs-7 col-sm-9 letra-mayusculas letra-s letra-menuda" style="text-align:left;padding-left:0;padding-right:0">'+decorador.trabajoses[i].titulo+'</label>';
		 htmlfortrabajos+='<button class="col-xs-5 col-sm-3 letra-s" style="background-color:transparent;margin-bottom:5px;padding-left: 5px;padding-right: 5px;letter-spacing:1pt!important" onclick="lanzarTrabajo('+i+')">MODIFICAR</button>';
		  
		 htmlfortrabajos+='</div>';
		 
	 }

	 $('#divfortrabajos').html(htmlfortrabajos);
	 var enlacePerfil="";
	 nombre=decorador.nombre; 
	 nombre = nombre.replace(/\s/g,"_"); 
	 if(decorador.etiquetas.length==0 || decorador.filesCara.length==0 || decorador.filesComposicion.length==0 || decorador.filesTrabajo.length==0 || decorador.trabajoses.length==0 || decorador.texto_decorador==null || decorador.urlRss==null || decorador.texto_decorador=="" || decorador.urlRss=="" || decorador.urlRss=="RRSS_rrssRRSS_rrssRRSS_rrssRRSS_rrssRRSS_rrss") {
		 enlacePerfil+='<div class="col-xs-12 col-xs-offset-0 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"><a class="buttonstandard_invertido letra-s" style="cursor:pointer" target="_blank" onclick="rellenarPerfil()"> PREVISUALIZAR TU PERFIL</a></div>'; 	 
	 } else {
		 enlacePerfil+='<div class="col-xs-12 col-xs-offset-0 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"><a class="buttonstandard_invertido letra-s" target="_blank" href="'+urlbaseForUsuarios+'decorador-online.html?decorador='+nombre+'&id='+decorador.id+'"> PREVISUALIZAR TU PERFIL</a></div>';
	 }
	 $('.enlaceDecorador').html(enlacePerfil);
	 cerrarCargando();
}
function rellenarPerfil() {
	 var html="";
	 if(decorador.etiquetas.length==0) { 
		 html +="- Elegir los estilos que te caracterizan.<br/>";
	 }
	 if(decorador.urlRss==null || decorador.urlRss=="" || decorador.urlRss=="RRSS_rrssRRSS_rrssRRSS_rrssRRSS_rrssRRSS_rrss") { 
		 html +="- Añade enlaces de tus redes sociales.<br/>";
	 } 	
	 if(decorador.texto_decorador==null || decorador.texto_decorador=="") { 
		 html +="- Escribe una breve descripción sobre ti.<br/>";
	 }
	 if(decorador.filesComposicion.length==0) { 
		 html +="- Subir una imagen de la cabecera de tu portfolio.<br/>";
	 }
	 if(decorador.filesTrabajo.length==0) { 
		 html +="- Subir una imagen del trabajo que quieras mostrar como principal.<br/>";
	 }
	 if(decorador.filesCara.length==0) { 
		 html +="- Subir una foto de perfil.<br/>";
	 }
	 if(decorador.trabajoses.length==0) {  
		 html +="- Añadir al menos un proyecto.<br/>";
	 }
	 $('#modalRellenar').modal('show');
	 $('.rellenarPerfil').html(html);
}
function lanzarTrabajo(trabajoid){
		
		localStorage.removeItem('trabajoformodificar');
		if(trabajoid >= 0){ 
			console.log(JSON.stringify(decorador.trabajoses[trabajoid]).length);
			localStorage.setItem('trabajoformodificar', JSON.stringify(decorador.trabajoses[trabajoid]));
			setTimeout(function(){ window.location.href=urlbaseForThecoradores+ "trabajomodificar.html"; }, 500);
		}else {
			saveDecorador("trabajo");
		}
}


function saveDecorador(datos) {
	 $(document.body).css({'cursor' : 'wait'}); 
	 var pass=decorador.pass;
	 var nombre = document.getElementById('input_nombre').value;
	 var texto_decorador = document.getElementById('input_texto_decorador').value;
	 var texto_decorador = document.getElementById('input_texto_decorador').value;
	 
	 var urlRss = document.getElementById('input_facebook').value + "RRSS_rrss" 
		+ document.getElementById('input_instagram').value + "RRSS_rrss" 
			+ document.getElementById('input_twitter').value + "RRSS_rrss"
				+ document.getElementById('input_pinterest').value + "RRSS_rrss"
					+ document.getElementById('input_be').value + "RRSS_rrss" 
	 					+ document.getElementById('input_linkedlink').value + "RRSS_rrss" 
	 						+ document.getElementById('input_youtube').value  ;

	 var urlBlog= document.getElementById('input_blog').value;
	 
	 var dateInputforDisponibilidad=document.getElementById('dateInputforDisponibilidad').value;
	 if(dateInputforDisponibilidad!=""){
		 var vregexNaix =/^\d{4}\-\d{2}\-\d{2}$/;
		 let partes = vregexNaix.test(dateInputforDisponibilidad);
		 if(!partes){
				BootstrapDialog.alert('Por favor introduzca la fecha con el formato aaaa-mm-dd', function(){ 
					cerrarCargando();$(document.body).css({ 'cursor': 'default' });
		        }); 
				return;
		 } 
	 }
	 
	 if(decorador.activo==0) {
		 var activo=0;
	 } else if(document.getElementById('disponibilidad').checked){
		 var activo=2;
	 } else {
		 var activo=1;
	 }
	 
	 var arrayDeEtiquetas=[];
	 
	 if(document.getElementById('cb1').checked){
		 arrayDeEtiquetas.push(1);
	 }
	 if(document.getElementById('cb2').checked){
		 arrayDeEtiquetas.push(2);
	 }
	 if(document.getElementById('cb3').checked){
		 arrayDeEtiquetas.push(3);
	 }
	 if(document.getElementById('cb4').checked){
		 arrayDeEtiquetas.push(4);
	 }
	 if(document.getElementById('cb5').checked){
		 arrayDeEtiquetas.push(5);
	 }
	 if(document.getElementById('cb6').checked){
		 arrayDeEtiquetas.push(6);
	 }
	 if(document.getElementById('cb7').checked){
		 arrayDeEtiquetas.push(7);
	 }
	 if(document.getElementById('cb8').checked){
		 arrayDeEtiquetas.push(8);
	 }
	 if(document.getElementById('cb9').checked){
		 arrayDeEtiquetas.push(9);
	 } 
	 var etiquetasJSON=  JSON.stringify(arrayDeEtiquetas);
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
	  				id: decorador.id,
	  				action : "decoradores_modificar",
  					nombre: nombre,
  					pass: pass,
  					activo: activo,
  					texto_decorador: texto_decorador,
  					disponibilidad : dateInputforDisponibilidad,
  					urlRss: urlRss,
  					urlBlog: urlBlog,
  					etiquetasJSON: etiquetasJSON,
	  					
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$(document.body).css({'cursor' : 'default'});
	  				} else {
	  					if(datos=="perfil"){
	  						actualizarStorage("guardarPerfil");
	  					} else { 
	  						$(document.body).css({'cursor' : 'default'}); 
	  						window.location.href=urlbaseForThecoradores+ "trabajocrear.html";
	  						cerrarCargando();
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
