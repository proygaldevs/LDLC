
	
var htmlForInsert='';

var arrayDeParallax=[];
var item;
var arrayDeSeccionesPopUp = new Array(200);

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


function cargarProyecto(){
	
	//var oo=$.cookie("coockieposicion");
	//getPortfolioItemsFunction(oo);
	//var item=JSON.parse($.cookie("basket-data"));
	//alert(oo);
	var substringToFind= "/"+QueryString.tipo+"/"+QueryString.id+"/";
	getPortfolioItemsFunction(substringToFind);
	

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
function pintatitulo(tituloparapintar){
	
	
	var texto='';
	texto+='<div class="col-xs-12 " style=" padding-right: 0px !important; padding-left: 0px !important;" >';
	texto+='<div class="col-xs-12" style="padding-top: 1vw;">';
	texto+='<label class="letraLato textoTituloItemPortfolio " style="line-height: 24px;border: black; border-top-style : solid; border-width: 1px; text-align: center;  width: 100%;  text-align: center ; FONT-WEIGHT: 100;">'+ tituloparapintar +'</label>';
	texto+='</div></div>';
	
	return texto;
	
	
	
	
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
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%;text-align: left; margin-bottom: 2vw">'+ seccion.listaTextos[i].valor+'</label>';
			
		}else{
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%;text-align: left;  margin-bottom: 5vw;">'+ seccion.listaTextos[i].valor+'</label>';
			
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
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%;text-align: left; margin-bottom: 2vw">'+ seccion.listaTextos[i].valor+'</label>';
			
		}else{
			htmlText+= '<label class="letraLato textoTituloItemPortfolio " style=" width: 100%;  text-align: left; line-height: 1.6;">'+ seccion.listaTextos[i].titulo+'</label>';
			htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%;text-align: left;  margin-bottom: 5vw;">'+ seccion.listaTextos[i].valor+'</label>';
			
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
				htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%; text-align:justify; margin-bottom: 2vw">'+ res[i]+'</label>';	
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
				htmlText+= '<label class="letraLato textodescripcioncortaportfoliogaleria" style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;width: 100%; text-align:justify; margin-bottom: 2vw">'+ res[i]+'</label>';	
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
