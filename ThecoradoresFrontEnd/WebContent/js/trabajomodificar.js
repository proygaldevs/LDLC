var trabajo;
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



function setFormularioPerfil() {
 

	cargarDropzonePlanos(false);


}


function deleteFile(fichero) {
	

	 
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

var etiquetasparafiltrar;
function getTagsList() {

	
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
	  					insertaselementos();
	  					cargarDropzonePlanos(false);
	  					
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here

	  	}

}

function saveTrabajo() { 
	console.log(trabajo);
	idProyecto=trabajo.id;
	trabajo = {};
	trabajo.id=idProyecto;
	trabajo.fechaingreso=null;

	trabajo.titulo=document.getElementById('input_titulo').value;
	trabajo.texto=document.getElementById('input_texto').value;
	if (document.getElementById('cb1').checked) {
		trabajo.activo=1;
	}
	
	else trabajo.activo=0;
	
	var tokens=$('#tokenfield-typeahead').tokenfield('getTokens');  
	trabajo.etiquetas=[];
		for(var i=0;i<tokens.length;i++){
			var encontrado=false;
			for(var j=0;j<etiquetasparafiltrar.length;j++){
				if(tokens[i].value.toUpperCase() == etiquetasparafiltrar[j].nombre.toUpperCase()){
					trabajo.etiquetas.push(etiquetasparafiltrar[j]);
					encontrado=true;
					break; 
				}
				
			}
			if(encontrado==false) {
				var o= new Object();
				o.grupo=null;
				o.nombre=tokens[i].value;
				o.id=null;
				trabajo.etiquetas.push(o); 
			}
		}
		var trabajoJson=  JSON.stringify(trabajo); 
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
	  				id_decorador: decorador.id,
	  				action : "decoradores_trabajo",
	  				pass : decorador.pass,
	  					trabajo: trabajoJson
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
	  						if(decorador.activo>=1){ 
	  							window.location.href=urlbaseForThecoradores+ "perfil.html";

	  						} else {
	  							BootstrapDialog.show({
						            title: '',
						            message: 'Cuantos más trabajos añadas, más posibilidades de ser aceptado en la plataforma.',
						            type: BootstrapDialog.TYPE_DEFAULT,
						            buttons: [{
						                label: 'Ok',
						                action: function(dialogRef){ 
						                	window.location.href=urlbaseForThecoradores+ "perfil.html"; 
						                	
						                }
						            }]
						        });
	  						} 
	  					
	  					
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here

	  	}

}

function getRRSS(cadena){
	return cadena.split("RRSS_rrss");
}

function insertaselementos(){
	
	
	document.getElementById('input_titulo').value=trabajo.titulo;
	document.getElementById('input_texto').value=trabajo.texto;
	document.getElementById('cb1').checked=trabajo.activo;
	
	 for(var i=0;i<trabajo.etiquetas.length;i++){
		 $('#tokenfield-typeahead').tokenfield('createToken', trabajo.etiquetas[i].nombre);
	 }

	cerrarCargando();
}


function lanzarTrabajo(trabajoid){
	
		
}