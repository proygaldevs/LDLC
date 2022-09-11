

var primeravez=0;

function bake_cookie(name, value) {
	//alert();
	  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
	  document.cookie = cookie;
	}

function lanzarportfolioindividual(posicion, imagenprincipal, titulo){
	//alert("si");
	
	
	$.cookie("coockieposicion", posicion);

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

function deleteCookie(cname) {
	setCookie(cname, '', 365);
}

//var urlbase="http://decotheco.com:8080/OnlineAssistance";
//var urlbase="http://decotheco.com";

var data;
var anchoMinimo= 350; //de las columnas, siempre cogerá todas las que quepan.

//alert(anchoMinimo);

var largoporcentualitemLargo = 1.75; //veces de largo el ancho de la columna
var largoporcentualitemCorto = 1.35; //veces de largo el ancho de la columna

var anchoimagenporcentual = 0.86; //ancho de la imagen respecto al ancho total;
var largoimagenporcentual = 0.73;//alto de la imagen del total de alto del item

var separacionporcentual=0.015;

var ultimoTipo='TODO';

function resizedw(){
    // Haven't resized in 100ms!
	ordenar(ultimoTipo);
	
}

var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};


var semaforo=0;
function clickBoton(tipo){
	if(semaforo==0){
		semaforo=1;
		clickBoton2(tipo);
		setTimeout(function() {
			  semaforo=0;
			}, 1500)
	}
}


function clickBoton2(tipo){
	
	
	if(tipo=='TODOS'){
		$('#spanTodos').css({ 'background-color': '#bfbfbf' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='INDUSTRIAL'){ 
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#bfbfbf' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='ECLEPTICO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#bfbfbf' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='CLASICO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#bfbfbf' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='CONTEMPORANEO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#bfbfbf' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='MODERNO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#bfbfbf' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' }); 
	}else
	if(tipo=='BOHEMIO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#bfbfbf' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#fff' }); 
	}else
	if(tipo=='RUSTICO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#bfbfbf' });
		$('#spanNordico').css({ 'background-color': '#fff' }); 
	}else
	if(tipo=='NORDICO'){
		$('#spanTodos').css({ 'background-color': '#fff' });
		$('#spanIndustrial').css({ 'background-color': '#fff' });
		$('#spanEcleptico').css({ 'background-color': '#fff' });
		$('#spanClasico').css({ 'background-color': '#fff' });
		$('#spanContemporaneo').css({ 'background-color': '#fff' });
		$('#spanModerno').css({ 'background-color': '#fff' });
		$('#spanBohemio').css({ 'background-color': '#fff' });
		$('#spanRustico').css({ 'background-color': '#fff' });
		$('#spanNordico').css({ 'background-color': '#bfbfbf' }); 
	}
	ordenar(tipo);
}

function colocarItems(datos){
	data=datos;
	
	/*data= new Array(21);
	//alert('voyainsertert');
	data[0]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"GRAN REFORMA COMPLETA DE UN DORMITORIO CON SU CAMITA CON SU BAÑO Y UN GRAN VESTIDOR COMO UN ESPACIO CONTINUO"};
	data[1]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[2]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[3]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[4]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[5]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[6]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[7]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[8]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[9]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[10]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[11]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[12]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[13]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[14]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[15]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[16]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[17]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[18]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	data[19]={titulo:"COCINA BLANCA CON TOQUE", imagenPrincipal:"img/forPortfolio/fondoPortfolioGaleriaCabecera.png", tipo: "deco mini", descripcionCorta:"SUPERMEGAESPACIO CON MOBILIARIO CONTRACHAPADO EN DULCURA Y AMOR"};
	data[20]={titulo:"DORMITORIO + BAÑO + VESTIDOR", imagenPrincipal:"img/imagenes/rincones-decoracion-ideas367198856.jpg", tipo: "reformas", descripcionCorta:"UNA ESPACIO BLANCO AMPLIO CON HABITACIÓN Y ESPACIO CONTIGUO CON VESTIDOR"};
	*/
	//var numeroDeItems=data.length;
	var numeroDeItems=data.length;
	
	var anchodisponible = document.getElementById('divforportfolioitems').offsetWidth;
	//alert(anchodisponible);
	
	//vamos a decidir el numero de columnas
	
	var numeroColumnas=0;
	for(var i = 2; i<50; i++){
		var auxancho= i * anchoMinimo;
		//alert(auxancho);
		if( anchodisponible < auxancho ){
			numeroColumnas= i-1;
			break;
		}
	}
	if(numeroColumnas > 4) numeroColumnas=4;
	//alert(numeroColumnas);
	
	var numeroFilas = ((numeroDeItems / numeroColumnas) >> 0);
	var extra=numeroDeItems % numeroColumnas;
	//alert(extra);
	if(extra>0){
		numeroFilas=numeroFilas+1;
	}
	//alert(numeroFilas);	
	
	/*var representacion = new Array(numeroColumnas);
	for (var i = 0; i < numeroColumnas; i++) {
		representacion[i] = new Array(numeroFilas);
	}
	representacion[5][12] = 0;*/
	
	
	
	var anchoColumna=anchodisponible/numeroColumnas;
	//alert(anchoColumna);
	var itemLargo={};
	var itemCorto={};
	var separacion=anchodisponible*separacionporcentual;
	
	itemLargo.ancho=anchoColumna-(2*separacion);
	itemLargo.alto= largoporcentualitemLargo*itemLargo.ancho;
	itemLargo.altoImagen=largoimagenporcentual*itemLargo.alto;
	itemLargo.anchoImagen=anchoimagenporcentual*itemLargo.ancho;
	itemLargo.paddingSeparacionImagen=(itemLargo.ancho-itemLargo.anchoImagen)/2;
	itemLargo.altoTexto=itemLargo.alto-itemLargo.altoImagen;
	
	itemCorto.ancho=itemLargo.ancho;
	itemCorto.alto= largoporcentualitemCorto*itemCorto.ancho;
	itemCorto.altoTexto=itemLargo.altoTexto;
	itemCorto.altoImagen=itemCorto.alto - itemCorto.altoTexto;
	itemCorto.anchoImagen=itemLargo.anchoImagen;
	itemCorto.paddingSeparacionImagen=itemLargo.paddingSeparacionImagen;
	
	//insertemos los componentes
	var columna=0;
	var x=0;
	var tipoItemAnteriorColumna = new Array(numeroColumnas);
	//inicializo el array
	for (var auxi = 0; auxi < numeroColumnas; auxi++) {
		if(auxi%2==0){
			tipoItemAnteriorColumna[auxi] =0;//corto
		}else{
			tipoItemAnteriorColumna[auxi] =1;//largo
		}
		
	}
	
	var yporcolumna = new Array(numeroColumnas);
	//inicializo el array
	for (var auxi = 0; auxi < numeroColumnas; auxi++) {
		yporcolumna[auxi] =0;
	}
	var htmltxt='';
	for (var i = 0; i < numeroDeItems; i++) {
		x=x+separacion;
		var itemParaUsar;
		if(tipoItemAnteriorColumna[columna]==0){
			itemParaUsar=itemLargo;
			tipoItemAnteriorColumna[columna]=1;
			//itemParaUsar.imagenPrincipal='img/forPortfolio/fondoPortfolioGaleriaCabecera.png';
		}else{
			itemParaUsar=itemCorto;
			tipoItemAnteriorColumna[columna]=0;
			//itemParaUsar.imagenPrincipal='img/imagenes/rincones-decoracion-ideas367198856.jpg';
		}
		htmltxt=htmltxt+'<div onclick="lanzarportfolioindividual('+ data[i].id +',\''+ data[i].imagenPrincipal +'\',\''+ data[i].titulo +'\');" id="itemPortfolio'+ i +'"  style="cursor: pointer;';
		htmltxt = htmltxt + 'top:'+yporcolumna[columna]+'px; left:'+x;
		
		x=x+itemParaUsar.ancho + separacion;
		
		htmltxt = htmltxt +'px; width:'+itemParaUsar.ancho+'px; opacity:0;  display:block; position: absolute;"  class="conefectos ">';
		htmltxt = htmltxt +'<div id="divImagenPortfolio'+ i +'"  class="conefectos" style="width: 100%; height:'+itemParaUsar.altoImagen+'px; position: relative;'; 
		
		yporcolumna[columna]=yporcolumna[columna]+itemParaUsar.alto+5;

		htmltxt = htmltxt +'padding-right:' +itemParaUsar.paddingSeparacionImagen+'px; padding-left: '+itemParaUsar.paddingSeparacionImagen+'px;"  >';
		
		htmltxt = htmltxt +'<div  id="divImagenPortfolioB'+ i +'"  class="conefectos" style="width: 100%; height:'+itemParaUsar.altoImagen+'px; background: url('+data[i].imagenPrincipal+') center;background-size: cover;" >';
		//htmltxt = htmltxt +'<div  id="divImagenPortfolioB'+ i +'"  class="conefectos" style="width: 100%; height:'+itemParaUsar.altoImagen+'px; background: url('+itemParaUsar.imagenPrincipal+') center;background-size: cover;" >';
		 
		htmltxt = htmltxt +'</div></div>';
		htmltxt = htmltxt +'<div  id="divImagenTextofolio'+ i +'"   class="conefectos" style="position: relative;width: 100%; height:'+itemParaUsar.altoTexto+'px; ">';
	
		
		
		var paddingTopTexto=26;
		var altodelacaja=((itemParaUsar.altoTexto-paddingTopTexto)/2)-2;
		var posiciondeltextoprincipal=(((itemParaUsar.altoTexto-paddingTopTexto)/2)/2)-10;
		htmltxt = htmltxt +'<div id="div1texto'+i+'" class="conefectos " style="padding-top:'+paddingTopTexto+'px; width: 100%; height: 100%; margin-right: 0px !important; margin-left: 0px !important;">';
		htmltxt = htmltxt +'<div id="div2texto'+i+'" style=" height:'+altodelacaja+'px; border-style: solid; border-color: black; border-width: 1px;" class="conefectos altomodificado">';
		
		paddingTopTexto=paddingTopTexto+posiciondeltextoprincipal+20+posiciondeltextoprincipal;//marging top, label con esa letra y marging bottom
		
		htmltxt = htmltxt +'<label id="label1texto'+i+'" class="letraLato textoTituloItemPortfolio " style="margin-top: '+posiciondeltextoprincipal +'px; height:20px; margin-bottom:'+ posiciondeltextoprincipal+'px; width: 100%; cursor: pointer; text-align: center; line-height: 1.6;">';
		htmltxt = htmltxt + data[i].titulo+'</label> <label  id="label2texto'+i+'" class="letraLato textodescripcioncortaportfoliogaleria"';
		
		
		//var cincoporcien=(itemParaUsar.altoTexto-paddingTopTexto)*0.10;
		
		var separacionTextoInferior= (((itemParaUsar.altoTexto-paddingTopTexto))-38)/2;
		
		var alturaTextoInferior=itemParaUsar.altoTexto-paddingTopTexto-separacionTextoInferior;
		//htmltxt = htmltxt +'style="left: 0; width: 100%; min-width: 100%; text-align: center; height:'+alturaTextoInferior+'px; position: relative; display: table-cell;  padding-left: 10px; padding-right: 10px;">';
		htmltxt = htmltxt +'style="font-size: 7pt;font-weight: lighter;letter-spacing: 3px;left: 0; width: 100%; min-width: 100%; text-align: center; height:'+alturaTextoInferior+'px; position: relative;   padding-left: 10px; padding-right: 10px;">';
		htmltxt = htmltxt + data[i].descripcionCorta+'</label>';
		htmltxt = htmltxt +'<div  class="  " style="position: absolute; width: 100%;  left: 50%; top: 0; /* display: inline-block; */ padding-left: 10px; padding-right: 10px; transform: translate(-50%, 0); min-width: 150px;  "> <label class="letraflanela " style="display:inline-block;background-color: white; padding-right: 10px;    padding-left: 10px; margin-top:6px;    height: 30px; text-align: center; line-height: 1.6;">'+ data[i].tipo+'</label></div></div></div>';
		
					
		
		
		
		htmltxt = htmltxt +'</div></div>';
		  
		columna++;
		if(columna>=numeroColumnas){
			x=0;
			columna=0;
		}
		
	}
	$('#divforportfolioitems').html(htmltxt);
	
	ordenar('TODO');
	
}

function recolocarHacervisibles(datos){
	//alert('entro en recolocarHacervisibles');
	var numeroDeItems=datos.length;
	for (var i = 0; i < datos.length; i++) {
		var itemToVisible='#'+'itemPortfolio'+datos[i];
		$(itemToVisible).css({ display: 'block' });
		

	}
	for (var i = 0; i < numeroDeItems; i++) {
		var itemToVisible='#'+'itemPortfolio'+datos[i];
		
		$(itemToVisible).css({ opacity: '1' });

	}
	recolocarItems(datos);
	
}
function recolocarOpacitar(datosvisibles, datosinvisibles){
	//alert('recolocarOpacitar');
	var numeroDeItems=datosinvisibles.length;
	for (var i = 0; i < numeroDeItems; i++) {
		var itemToVisible='#'+'itemPortfolio'+datosinvisibles[i];
		
		$(itemToVisible).css({ opacity: '0' });

	}
	
	setTimeout(function () {
		recolocarHAcerInvisibles(datosinvisibles);
    }, 1000);
}

function recolocarHAcerInvisibles(datos){
	//alert('entro en recolocarHAcerInvisibles');
	var numeroDeItems=datos.length;
	for (var i = 0; i < numeroDeItems; i++) {
		var itemToVisible='#'+'itemPortfolio'+datos[i];
		
		$(itemToVisible).css({ display: 'none' });

	}
	
}

function recolocarItems(datos){
	//alert('entro en recolocarItems');
	//var numeroDeItems=data.length;
	
	
	
	
	var numeroDeItems=datos.length;
	
	var anchodisponible = document.getElementById('divforportfolioitems').offsetWidth;
	//alert('anchodisponible'+anchodisponible);
	
	//vamos a decidir el numero de columnas
	
	var numeroColumnas=0;
	for(var i = 2; i<50; i++){
		var auxancho= i * anchoMinimo;
		//alert(auxancho);
		if( anchodisponible < auxancho ){
			numeroColumnas= i-1;
			break;
		}
	}
	if(numeroColumnas > 4) numeroColumnas=4;
	//alert(numeroColumnas);
	
	var numeroFilas = ((numeroDeItems / numeroColumnas) >> 0);
	var extra=numeroDeItems % numeroColumnas;
	//alert(extra);
	if(extra>0){
		numeroFilas=numeroFilas+1;
	}
	//alert(numeroFilas);	
	
	/*var representacion = new Array(numeroColumnas);
	for (var i = 0; i < numeroColumnas; i++) {
		representacion[i] = new Array(numeroFilas);
	}
	representacion[5][12] = 0;*/
	
	
	
	var anchoColumna=anchodisponible/numeroColumnas;
	
	var itemLargo={};
	var itemCorto={};
	var separacion=anchodisponible*separacionporcentual;
	
	itemLargo.ancho=anchoColumna-(2*separacion);
	itemLargo.alto= largoporcentualitemLargo*itemLargo.ancho;
	itemLargo.altoImagen=largoimagenporcentual*itemLargo.alto;
	itemLargo.anchoImagen=anchoimagenporcentual*itemLargo.ancho;
	itemLargo.paddingSeparacionImagen=(itemLargo.ancho-itemLargo.anchoImagen)/2;
	itemLargo.altoTexto=itemLargo.alto-itemLargo.altoImagen;
	
	itemCorto.ancho=itemLargo.ancho;
	itemCorto.alto= largoporcentualitemCorto*itemCorto.ancho;
	itemCorto.altoTexto=itemLargo.altoTexto;
	itemCorto.altoImagen=itemCorto.alto - itemCorto.altoTexto;
	itemCorto.anchoImagen=itemLargo.anchoImagen;
	itemCorto.paddingSeparacionImagen=itemLargo.paddingSeparacionImagen;
	
	//insertemos los componentes
	var columna=0;
	var x=0;
	var tipoItemAnteriorColumna = new Array(numeroColumnas);
	//inicializo el array
	for (var auxi = 0; auxi < numeroColumnas; auxi++) {
		if(auxi%2==0){
			tipoItemAnteriorColumna[auxi] =0;//corto
		}else{
			tipoItemAnteriorColumna[auxi] =1;//largo
		}
		
	}
	
	var yporcolumna = new Array(numeroColumnas);
	//inicializo el array
	for (var auxi = 0; auxi < numeroColumnas; auxi++) {
		yporcolumna[auxi] =0;
	}
	var htmltxt='';
	for (var i = 0; i < numeroDeItems; i++) {
		x=x+separacion;
		var itemParaUsar;
		if(tipoItemAnteriorColumna[columna]==0){
			itemParaUsar=itemLargo;
			tipoItemAnteriorColumna[columna]=1;
			//itemParaUsar.imagenPrincipal='img/forPortfolio/fondoPortfolioGaleriaCabecera.png';
		}else{
			itemParaUsar=itemCorto;
			tipoItemAnteriorColumna[columna]=0;
			//itemParaUsar.imagenPrincipal='img/imagenes/rincones-decoracion-ideas367198856.jpg';
		}
		
		var itemToMove='#'+'itemPortfolio'+datos[i];
		var topVar=yporcolumna[columna]+'px';
		
		
		$(itemToMove).css({ top: topVar });
		
		var leftVar=x+'px';
		
		$(itemToMove).css({ left: leftVar });

		x=x+itemParaUsar.ancho + separacion;
		
		
		var witdthVar=itemParaUsar.ancho+'px';
		
		$(itemToMove).css({ width: witdthVar });

		var itemToMove2='#'+'divImagenPortfolio'+datos[i];
		var heightsubvar= itemParaUsar.altoImagen+"px";
		
		$(itemToMove2).css({ height: heightsubvar });

		yporcolumna[columna]=yporcolumna[columna]+itemParaUsar.alto+5;

		
		
		var paddingRsubvar= itemParaUsar.paddingSeparacionImagen+"px";
		
		$(itemToMove2).css({ paddingRight: paddingRsubvar });
		$(itemToMove2).css({ paddingLeft: paddingRsubvar });
		
		var itemToMovePortf='#'+'divImagenPortfolioB'+datos[i];
		
		var heightportfoliosubvar= itemParaUsar.altoImagen+"px";
		
		$(itemToMovePortf).css({ height: heightportfoliosubvar });
		
		
		
		var itemTextotomove='#'+'divImagenTextofolio'+datos[i];
		var heighttextotomove= itemParaUsar.altoTexto+"px";
		
		$(itemTextotomove).css({ height: heighttextotomove });
		
		var paddingTopTexto=26;
		var altodelacaja=((itemParaUsar.altoTexto-paddingTopTexto)/2)-2;
		var posiciondeltextoprincipal=(((itemParaUsar.altoTexto-paddingTopTexto)/2)/2)-10;
		
		var itemTexto1='#'+'div1texto'+datos[i];
		var itemTexto2='#'+'div2texto'+datos[i];
		var itemLabel1='#'+'label1texto'+datos[i];
		var itemLabel2='#'+'label2texto'+datos[i];
		
		
		var paddintopgitemtexto1= paddingTopTexto+"px";
		var heigthitemtexto1= altodelacaja+"px";
		
		
		$(itemTexto1).css({ paddingTop: paddintopgitemtexto1 });
		
		
		$(itemTexto2).css({ height: heigthitemtexto1 });

		
		paddingTopTexto=paddingTopTexto+posiciondeltextoprincipal+20+posiciondeltextoprincipal;//marging top, label con esa letra y marging bottom
		
		var margintoplabel1= posiciondeltextoprincipal+"px";
		var marginbottomlabel1= posiciondeltextoprincipal+"px";
		
		
		$(itemLabel1).css({ marginTop: margintoplabel1 });
		$(itemLabel1).css({ marginBottom: marginbottomlabel1 });
		
		
		var separacionTextoInferior= (((itemParaUsar.altoTexto-paddingTopTexto))-38)/2;
		
		var alturaTextoInferior=itemParaUsar.altoTexto-paddingTopTexto-separacionTextoInferior;		
		var heigthlabel2= alturaTextoInferior+"px";
		$(itemLabel2).css({ height: heigthlabel2 });
		

		
		  
		columna++;
		if(columna>=numeroColumnas){
			x=0;
			columna=0;
		}
		
	}
	
//	setTimeout(function () {
//		recolocarHacervisibles(datos);
//		
//    }, 800);
	
	if(primeravez==0){
		//alert("si");
		$('html, body').animate({
			scrollTop : $(window).height()/1.50
		}, 'slow');
		primeravez++;
	}
	
}


function ordenar(tipoelegido ){
	
	//alert(tipoelegido);
	ultimoTipo=tipoelegido;
	
	var visibles = new Array(0);
	var noVisibles = new Array(0);
	
	
	if(tipoelegido=='TODO'){
		for (var i = 0; i < data.length; i++) {
			visibles[i]=i;
			
		}
	}else{
		var arraydesaparecen= new Array();
		var posicionvisible=0;
		var posicionnovisible=0;
		for (var i = 0; i < data.length; i++) {
			if(data[i].tipo == tipoelegido){
				visibles[posicionvisible++]=i;
			}else{
				noVisibles[posicionnovisible++]=i;
			}
			
		}
	}
	//alert('visibles:' +visibles.length);
	//alert('NOvisibles:' +noVisibles.length);
	recolocarOpacitar(visibles, noVisibles);
	recolocarHacervisibles(visibles);
}


function getPortfolioItemsFunction() {

	
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
					url : urlbaseForAjax + '/GetPortfolio',
					
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {tipo :'Decoradores', lista:'todo'},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
						colocarItems(data);
						
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}