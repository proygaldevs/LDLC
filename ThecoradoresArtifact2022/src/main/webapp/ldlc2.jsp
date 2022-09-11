<%@ page import="sarandon.assistance.servlet.more.Config"%>
<%@ page import="sarandon.decotheco.ldlc.Parser"%>
<%@ page import="sarandon.decotheco.ldlc.controller.ListaCompraController"%>
<%@ page import="sarandon.decotheco.ldlc.model.ListaCompra"%>
<%@ page import="sarandon.decotheco.ldlc.controller.ItemController"%>
<%@ page import="sarandon.decotheco.ldlc.model.ItemLDLC"%> 
<%@ page import="java.util.List"%>

<%
	ListaCompra lc = new ListaCompra();
	ListaCompraController lcc = new ListaCompraController();
	ItemController ic = new ItemController();
	
	String pathNuevosElementos=new String();
	String pathRenderedCanvas=new String();
	
	// recupero parámetros: id_ldlc, createldlc, cargar_elemento, 
	String ProyectoEstado="";
	String id_ldlc = request.getParameter("id_ldlc");
	String id_decorador = request.getParameter("id_decorador");
	String id_proyecto = request.getParameter("id_proyecto");
	String createldlc = request.getParameter("createldlc");
	String editldlc = request.getParameter("editldlc");
	String saveldlc = request.getParameter("saveldlc");
	String createitem = request.getParameter("createitem");
	String lugar = request.getParameter("lg");
	String nuevo_id_lista="";
	if(request.getParameter("listaVacia")!=null){
		nuevo_id_lista = request.getParameter("listaVacia");
		} else { nuevo_id_lista="0"; }
	String listaEmpty="";
	if(request.getParameter("listaEmpty")!=null){
		listaEmpty = request.getParameter("listaEmpty");
		} else { listaEmpty="0"; }
	int estadoIni=1;
	String JSONcanvas = request.getParameter("json");
	String urlcanvas = request.getParameter("urlcanvas");
	String pasoD="";
	if(request.getParameter("paso")!=null){
		pasoD = request.getParameter("paso"); 
	} else { pasoD="0"; } 
	String nombreImgLdlc="";
	if(request.getParameter("nombreImgLdlc")!=null){
		nombreImgLdlc=request.getParameter("nombreImgLdlc"); 
	} else { nombreImgLdlc=null; }
  
	
	//*****************QUITAR
	//todo: quitar esto
	//id_proyecto ="1";
	//id_decorador = "1";
	
	//todo: comprobar que los datos de sesion son correctos
	boolean sesion_OK = true;
	
	/* System.out.println("Cargando LDLC"); */
	
	//pathNuevosElementos="items/";
	//pathRenderedCanvas="ldlcs/";
	//*****************QUITAR

	boolean creando = false;
	boolean editando = false;
	boolean guardando = false;
	boolean creandoitem = false;
	List<ListaCompra> listaBorradores =null;
	List<ListaCompra> listaPublicados =null;
	List <ItemLDLC> listaItems = null;
	
	if(id_proyecto==null  ){
		/* System.out.println("Error en los parametros de entrada"); */
		id_proyecto="-3";
	}
	if(id_decorador==null) { 
		id_decorador="20";
	}
	
	//transformo aquí una vez en parámetros String en int para mejorar rendimiento
	int id_ldlci=-1;
	int id_decoradori = Integer.parseInt(id_decorador);
	int id_proyectoi = Integer.parseInt(id_proyecto);  
	int estadoProyecto=ic.getIdState(id_proyectoi);  

	int listaEmptyi = Integer.parseInt(listaEmpty);
	
	// SI VIENE DE NUEVO
		if(request.getParameterMap().containsKey("lg") && lugar!="" && lugar!=null){
			if(lugar.equals("1")){
				id_ldlci = Integer.parseInt(id_ldlc);
				int nuevo_idlista=lcc.createEquals(id_proyectoi,id_decoradori, id_ldlci);
				String redirectURL = "ldlc.jsp?id_ldlc="+id_ldlci+"&id_decorador="+id_decorador+"&id_proyecto="+id_proyecto+"&listaVacia="+nuevo_idlista;
				creando = true; 
			    response.sendRedirect(redirectURL);
			}
		}

	
	if (!sesion_OK){
		
		
	}else{
		
	
		//recupero items del decorador
		if ((request.getParameterMap().containsKey("createldlc") && createldlc!="" && createldlc!=null) || request.getParameter("id_ldlc")==null ){
			//creo una nueva lista de la compra y redirecciono a esta misma página con el id creado
			int nuevo_idlista=lcc.create(id_proyectoi,id_decoradori);
			String redirectURL = "ldlc.jsp?id_ldlc="+nuevo_idlista+"&id_decorador="+id_decorador+"&id_proyecto="+id_proyecto;
			creando = true;
			id_ldlci = nuevo_idlista;
		    response.sendRedirect(redirectURL);
			
		}else{
			id_ldlci = Integer.parseInt(id_ldlc);
		}
		if (request.getParameterMap().containsKey("id_ldlc") && id_ldlc!="" && id_ldlc!=null){
			//es un edit de la lista con este id, recupero de base de datos la ldlc y cargo contenido.
			id_ldlci = Integer.parseInt(id_ldlc);
			lc = lcc.getListaCompra(id_ldlci);
			editando = true;
			
		}
		if (request.getParameterMap().containsKey("saveldlc") && id_ldlc!="" && id_ldlc!=null){
			//es un save de la lista con este id, guardo contenido en base de datos ().
			int ldlcCargar=0;
			if(listaEmptyi!=0){
				lc.ListaCompra_id=Integer.parseInt(listaEmpty);
				ldlcCargar=Integer.parseInt(listaEmpty);
			}else{
				lc.ListaCompra_id=Integer.parseInt(id_ldlc);
				ldlcCargar=Integer.parseInt(id_ldlc);
			}
			if(id_proyectoi==-3){
				id_proyectoi=1;
			}
			lc.Canvas= JSONcanvas;
			lc.Proyecto_id = id_proyectoi;
			lc.Decorador_id = id_decoradori;

			lc.imagen=nombreImgLdlc; 
			lc.Estado=request.getParameter("save-estado"); 
			lc.URLCanvas=""; 
			lcc.saveLdlc(lc);
			
			// crear clase que meterle estos valores y ejecuten este metodo
			//setEtiquetasCanvas(etiquetas, id_decoradori);
			guardando = true;
			
			//recargo la lista con ese id
			String redirectURL="";
			if(pasoD.equals("")){
				 redirectURL = "ldlc.jsp?id_ldlc="+ldlcCargar+"&id_decorador="+id_decorador+"&id_proyecto="+id_proyecto;
			} else {
				 redirectURL = "ldlc.jsp?id_ldlc="+ldlcCargar+"&id_decorador="+id_decorador+"&id_proyecto="+id_proyecto+"&paso="+pasoD;
			}
		    response.sendRedirect(redirectURL);
			
		}
		if (request.getParameterMap().containsKey("createitem") && createitem!="" && createitem!=null){
			//es crear un nuevo item. Recojo los datos del formulario y guardo el item
			//se hace en un servlet
			creandoitem = true;
		}
		
		//comprobación para evitar errores en el caso de que la lista no exista. No deberá ocurrir pero las pruebas fallan si idldc no existe.
		if (lc.Canvas==null || lc.Canvas.length()<1){
			lc.Canvas = "{}";
		}
		
		
		//recupero borradores del decorador
		listaBorradores =lcc.getBorradores(id_decoradori);
		//recupero publicados del decorador
		listaPublicados =lcc.getPublicados(id_decoradori);
		 
		
	
	}

%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="pinterest" content="nohover" />
<title>DecoTheco - Lista de la Compra</title>
<script type="text/javascript" src="js/fabric.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/ldlctoimage.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/jquery.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/bootstrap.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/dat.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/slic-segmentation.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/underscore-min.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/jsfeat-min.js?versionCssJs=17"></script>
<script type="text/javascript" src="js/functions.js?versionCssJs=17"></script>
<script language="JavaScript" type="text/javascript">
		  
		     
		// var myEvent = window.attachEvent || window.addEventListener;
		// var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable
		window.addEventListener("beforeunload", function (e) {
			if(cerramosONo){
				
				var confirmationMessage = "\o/";
				
		
				  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
				  return confirmationMessage;              // Gecko, WebKit, Chrome <34
			}else return;
			
		  
		});
		 /* window.onunload = function(e) {
		   // alert("unload event detected!");
		    return ("unload event detected!");
		} 
		window.onbeforeunload = function(e) {
		    //alert("onbeforeunload event detected!");
		    return ("onbeforeunload event detected!");
		}
		 window.beforeunload = function(e) {
		   // alert("beforeunload event detected!");
		    return ("beforeunload event detected!");
		} */
		 
		       /*  myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
		            var confirmationMessage = 'Si sales de la página sin finalizar el proceso tendrás que empezar los pasos desde el principio. Seguro que quieres salir?';  // a space
		            (e || window.event).returnValue = confirmationMessage;
		            return confirmationMessage;
		        }); */ 
        function itemsExtension(){
			items("items-div","pager-container");  
		}

         var id_proyecto="<%=id_proyecto%>";  
         var id_decorador="<%=id_decorador%>"; 
         if (window.addEventListener) {
        	    window.addEventListener("message", onMessage, false);        
        	} 
        	else if (window.attachEvent) {
        	    window.attachEvent("onmessage", onMessage, false);
        	}

        	function onMessage(event) {
        	    // Check sender origin to be trusted
        	   // if (event.origin !== "http://example.com") return;

        	    var data = event.data;

        	    if (typeof(window[data.func]) == "function") {
        	        window[data.func].call(null, data.message);
        	    }
        	}
        	function parse_query_string(query) {
        	    var vars = query.split("&");
        	    var query_string = {};
        	    for (var i = 0; i < vars.length; i++) {
        	      var pair = vars[i].split("=");
        	      // If first entry with this name
        	      if (typeof query_string[pair[0]] === "undefined") {
        	        query_string[pair[0]] = decodeURIComponent(pair[1]);
        	        // If second entry with this name
        	      } else if (typeof query_string[pair[0]] === "string") {
        	        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        	        query_string[pair[0]] = arr;
        	        // If third or later entry with this name
        	      } else {
        	        query_string[pair[0]].push(decodeURIComponent(pair[1]));
        	      }
        	    }
        	    return query_string;
        	  }
        	// Function to be called from iframe
        	function parentFunc(message) {
        		//alert(message);
        		$('#cargando').modal('hide');
        		var pq=parse_query_string(message);
        		$('.modal').modal('hide'); 
        	   //	var valuesiframe=JSON.parse(message);
        	   if(pq.fondos=='si'){
        		   insertItemFondos(pq.id, pq.nombre, pq.url);
        	   }else{
        			insertItem(pq.id, pq.nombre, pq.url);
        	   }
        	   
        	   
        	}
        	
         </script>


<link rel="stylesheet" href="css/bootstrap.css?versionCssJs=17">
<link rel="stylesheet" href="css/estilo.css?versionCssJs=17" type="text/css">

<style>
body {
	overflow-y: scroll
} 
#items-div {
	padding-left:15px;
	padding-top:15px
}
#menumiselementos {
	min-height: 380px
}

.tools-fondos-container {
	position: fixed
}

#items-container2 {
	width: 80%;
	float: left
}

.image_wrapper2 {
	width: 10%;
	margin-bottom: 15px;
	float: left;
	border: 1px solid black;
	margin-right: 15px;
}

.image_background2 {
	background-image: url("img/base.jpg");
	background-repeat: repeat;
}

.clipper_image2 {
	cursor: pointer
}

#items-div-sinfondo {
	float: left;
	height: auto;
	overflow-y: hidden;
	width: 96%;
}

body {
	padding-left: 0 !important;
	padding-right: 0 !important;
}

.canvasMod #output_canvas {
	background-image: url("img/base.jpg");
	background-repeat: repeat;
}

#available_images div.clipper_image div.image_wrapper div.image_background
	{
	background-image: url("img/base.jpg");
	background-repeat: repeat;
	line-height: 89px !important;
	height: 90px !important;
}

#available_images2 div.clipper_image div.image_wrapper div.image_background
	{
	background-image: url("img/base.jpg");
	background-repeat: repeat;
	line-height: 89px !important;
	height: 90px !important;
}

.canvasMod #input_canvas {
	background-image: url("img/base.jpg");
	background-repeat: repeat;
}
.money, .money2 {
	position:absolute;
	top:2px;
	left:2px;
	width:18px;
	background-color:white;
	border-radius:50%
}
input:-webkit-autofill {
	-webkit-box-shadow: 0 0 0 30px white inset;
}

#output_canvas {
	margin-left: 0 !important;
}

.modal-header {
	border-bottom: 0
}

.modal-body {
	overflow: hidden;
	width: 92%;
	margin: 4%;
}

input[type="text"], input[type="password"] {
	width: 100%
}

.modal-footer {
	width: 93%;
	border: 0;
	background-color: white
}

.buttonstandard_invertido {
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
	padding-top: 5px;
	padding-bottom: 2px;
	padding-left: 5px;
	padding-right: 5px;
	text-transform: uppercase;
	letter-spacing: 5px;
	width: 93%;
	max-width: 100%;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	text-decoration: none;
	-moz-user-select: none;
	background-image: none;
	border: 1px solid rgba(0, 0, 0, 1);
	border-radius: 1px;
	transition: all 0.3s ease 0s;
	line-height: 1.75;
	color: white;
	background-color: black;
}

.nuevo-container {
	padding: 0;
	width: 49%;
	margin-right: 1%;
}

.nuevoguardar-container {
	overflow-x: hidden;
	margin-top: 5px
}

.buttonstandard_invertido:hover {
	text-decoration: none;
	background-color: white;
	color: black;
}

.menumiselementos {
	height: auto
}

.li_pager_number {
	color: black
}

.ancho2 {
	width: 32%;
	margin-top: 19px;
	margin-bottom: 9px;
}

.ancho {
	width: 100%;
	margin-top: 7px;
}

.ancho3 {
	width: 100%;
	margin-top: 12px;
	margin-bottom: 3px;
	color: red
}

.tool-fondos {
	margin-right: 0%;
}

.modal-fondos, .modal-perspectiva {
	width: 1200px;
	margin-left: -34%;
}

#available_images div.clipper_image {
	width: 15%;
	margin-top: 1%;
	margin-left: 1%;
	margin-right: 0%;
	margin-bottom: 1%;
	border: 1px solid black;
}

#available_images2 div.clipper_image {
	width: 15%;
	margin-top: 1%;
	margin-left: 1%;
	margin-right: 0%;
	margin-bottom: 1%;
	border: 1px solid black;
}

#available_images div.clipper_image div.image_wrapper div.image_background
	{
	text-align: center;
	background-color: #fff;
	line-height: 110px;
	height: 115px;
	width: 98%;
	padding: 1%;
	overflow: hidden
}

#available_images2 div.clipper_image div.image_wrapper div.image_background
	{
	text-align: center;
	background-color: #fff;
	line-height: 110px;
	height: 115px;
	width: 98%;
	padding: 1%;
	overflow: hidden
}

#available_images div.clipper_image div.image_wrapper div.image_background img
	{
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle;
}

#available_images2 div.clipper_image div.image_wrapper div.image_background img
	{
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle;
}

#available_images {
	height: auto !important;
}

#available_images2 {
	height: auto !important;
}

#available_images div.clipper_image div.image_wrapper {
	padding: 1%;
	height: auto;
	width: 96%;
}

#available_images2 div.clipper_image div.image_wrapper {
	padding: 1%;
	height: auto;
	width: 96%;
}

#available_images div.clipper_image div.image_wrapper img.clipper_image
	{
	max-height: auto;
	max-width: auto;
}

#available_images2 div.clipper_image div.image_wrapper img.clipper_image
	{
	max-height: auto;
	max-width: auto;
}

.resultset .bd {
	clear: both;
	height: auto;
}

.controls {
	width: 34%;
	min-width: 400px;
	height: auto;
	position: absolute;
	right: 0;
	z-index: 200;
	margin-right: 5px;
	padding-bottom: 4%;
	float: none;
}

a.boton:hover, a.boton:active, button.boton:hover {
	width: 99%;
	border: 1px solid #222222;
}

.modal-body-borradores {
	width: 88% !important;
	overflow-y: scroll !important;
}

.boton {
	background-color: #ffffff;
	border: 1px solid #222222;
	width: 99%;
	color: #010101;
	letter-spacing: 2px;
	padding: 3px 0px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	margin-bottom: 2%;
	font-size: 12px;
	cursor: pointer;
}

.boton2 {
	background-color: #ffffff;
	border: 1px solid #222222;
	width: 100%;
	color: #010101;
	letter-spacing: 2px;
	padding: 3px 0px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 12px;
	cursor: pointer;
	margin-top: 35px;
}

.canvas-container {
	padding: 5px;
	margin-bottom: 4px
}

.borradorAuto {
	float: left;
	border: 1px solid black;
	margin-left: 25px;
	margin-bottom: 15px;
}

.guardarFond, .guardarFond2 {
	float: right;
	border: 1px solid black;
	margin-right: 0px;
	margin-bottom: 15px;
	width: 75%;
}

.errorAt {
	color: red;
	margin-top: 15px;
	margin-bottom: 15px
}

.listaItems {
	width: 100%;
	float: left;
	height:auto!important;
	border: 1px solid black;
	margin-left: 5px;
	margin-bottom: 10px;
	min-height: 150px;
	padding-left: 35px;
	padding-top: 35px;
	padding-bottom: 35px;
	position: absolute;
	z-index: 250;
	background-color: #dbe5e0
}

#buscarinput::placeholder {
	color: black;
}

#buscarinput:-ms-input-placeholder {
	color: black;
}

#buscarinput::-webkit-input-placeholder {
	color: black;
}

#buscarinput::-moz-placeholder {
	color: black;
}

#buscartodosinput::placeholder {
	color: black;
}

#buscartodosinput:-ms-input-placeholder {
	color: black;
}

#buscartodosinput::-webkit-input-placeholder {
	color: black;
}

#buscartodosinput::-moz-placeholder {
	color: black;
}

#totalItem::placeholder {
	color: black;
}

#totalItem:-ms-input-placeholder {
	color: black;
}

#totalItem::-webkit-input-placeholder {
	color: black;
}

#totalItem::-moz-placeholder {
	color: black;
}

#canvas-div {
	width: 650px;
	height: 459px
}

.canvas-container {
	width: 650px;
	height: 459px
}

#canvas {
	width: 650px;
	height: 459px
}

.upper-canvas {
	width: 650px;
	height: 459px
}

.imagenPopUp {
	height: 125px;
	width: 20%;
	margin-right: 3%;
	float: left;
}

.altoLista {
	height: 125px;
	margin-bottom: 5%;
}

.imagenPopUp2 {
	height: 125px;
	width: 47%;
	margin-right: 3%;
	float: left
}

.imagenPopUp3 {
	height: 125px;
	width: 20%;
	float: left
}

.imagenPopUp4 {
	border-top: 1px solid black;
	height: auto;
	width: 98%;
	float: left
}

.imagenPopUp5 {
	border-bottom: 1px solid black;
	height: auto;
	width: 98%;
	float: left;
	margin-bottom: 5%
}

.text-center {
	text-align: center;
}

.herrFondo {
	float: left;
	border: 1px solid black;
	margin-left: 25px;
	margin-bottom: 15px;
	width: 100px
}

#cuadroitems {
	height: auto !important
}

.recargarQF {
	height: 90px;
	padding-left: 15px;
}

#ListaEtiquetas {
	z-index: 150;
	position: absolute;
	margin-top: 0;
	margin-left: 67px;
	width: 60%;
	height: auto;
	display: inline;
	background-color: #dbe5e0;
	border-bottom: 1px solid black;
	border-top: 1px solid black;
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	filter: alpha(opacity = 100);
	opacity: 1;
	padding: 5px;
	padding-left: 27px
}

#subirEti {
	position: absolute;
	width: 58%;
	margin-left: 59px;
	top: 156px;
	padding: 30px;
	padding-top: 0;
	padding-left: 0;
	z-index: 151;
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
	filter: alpha(opacity = 0);
	opacity: 0;
	text-align: center;
}

#bajarEti {
	position: absolute;
	margin-left: 31%;
	top: 31px;
	padding: 30px;
	padding-top: 0;
	padding-bottom: 0;
	z-index: 1002;
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	filter: alpha(opacity = 100);
	opacity: 1;
	padding-left: 11px;
	text-align: center;
}

#ListaEtiquetas li {
	width: auto;
	float: left;
	height: 19px;
	margin-right: 3%;
	margin-top: 1px;
	list-style: none
}

#ListaEspacios {
	z-index: 152;
	margin-top: 15px;
	width: auto;
	margin-left: 16%;
	height: auto;
	display: inline;
	background-color: #dbe5e0;
	float: left;
	padding-left: 5px
}

#subirEti img {
	display: inline;
	cursor: pointer;
	width: 20px;
	opacity: 1;
	margin: 30px;
	margin-top: 0;
}

#bajarEti img {
	display: none;
	cursor: pointer;
	width: 20px;
	opacity: 1;
	position: absolute
}

.espacioInd {
	float: left;
	width: 66px;
	margin-right: 20px;
	margin-bottom: 8px;
}

.checkbox {
	-ms-transform: scale(0.7) !important; /* IE */
	-moz-transform: scale(0.7) !important; /* FF */
	-webkit-transform: scale(0.7) !important; /* Safari and Chrome */
	-o-transform: scale(0.7) !important;
	min-height: 5px !important;
}

.letraEt {
	font-size: 8px;
	text-transform: uppercase;
	margin-top: 1px;
}

.etiq {
	float: left;
	margin: 0 auto;
	width: 748px;
	text-align: center;
	margin-left: 15%;
}

.img_border {
	cursor: pointer
}

#completo {
	height: 175px;
	position: absolute;
	width: 100%;
	margin-top: -1px
}

#completo2 {
	height: 180px;
	position: absolute;
	width: 100%;
	margin-top: 1px
}

#nombreProyecto {
	position: absolute;
	margin-top: 0;
	margin-left: 67px;
	width: 38%;
	top: 122px;
	z-index: 151;
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
	filter: alpha(opacity = 100);
	opacity: 1;
}

.transpar {
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'
		!important;
	filter: alpha(opacity = 100) !important;
	opacity: 1 !important;
}

.letra-xxxs {
	font-size: 8px !important;
	text-transform: uppercase
}

@media ( max-width : 1850px) {
	#nombreProyecto {
		margin-left: 0px;
		width: 45%;
	}
}

@media ( max-width : 1750px) {
	#ListaEspacios {
		margin-left: 11%;
	}
	.etiq {
		margin-left: 10%
	}
	#nombreProyecto {
		width: 44%;
	}
}

@media ( max-width : 1700px) {
	#nombreProyecto {
		width: 43%;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -36%;
	}
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 80px !important;
		height: 82px !important;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 80px !important;
		height: 82px !important;
	}
}

@media ( max-width : 1635px) {
}

@media ( max-width : 1600px) {
	#nombreProyecto {
		width: 42%;
	}
	#available_images div.clipper_image div.image_wrapper {
		width: 95%;
	}
	#available_images2 div.clipper_image div.image_wrapper {
		width: 95%;
	}
}

@media ( max-width : 1580px) {
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -39%;
	}
	#available_images div.clipper_image {
		width: 18%;
		margin-top: 1%;
		margin-left: 1%;
		margin-right: 0%;
		margin-bottom: 1%;
		border: 1px solid black;
	}
	#available_images2 div.clipper_image {
		width: 18%;
		margin-top: 1%;
		margin-left: 1%;
		margin-right: 0%;
		margin-bottom: 1%;
		border: 1px solid black;
	}
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 84px !important;
		height: 89px !important;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 84px !important;
		height: 89px !important;
	}
	#ListaEspacios {
		margin-left: 12%;
	}
	.espacioInd {
		float: left;
		width: 66px;
		margin-right: 5px;
		margin-bottom: 8px;
	}
	.etiq {
		margin-left: 6%
	}
	#subirEti {
		width: 56%;
	}
	#bajarEti {
		width: 56%;
	}
	#nombreProyecto {
		width: 40%;
	}
}

@media ( max-width : 1450px) {
	#nombreProyecto {
		width: 39%;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -42%;
	}
	#available_images div.clipper_image div.image_wrapper {
		width: 95%;
	}
	#available_images2 div.clipper_image div.image_wrapper {
		width: 95%;
	}
	#ListaEspacios {
		margin-left: 10%;
	}
	.etiq {
		margin-left: 2%
	}
}

@media ( max-width : 1400px) {
	#nombreProyecto {
		width: 38%;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -43%;
	}
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 78px !important;
		height: 80px !important;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 78px !important;
		height: 80px !important;
	}
	#ListaEspacios {
		margin-left: 9%;
	}
	.etiq {
		margin-left: 1%
	}
}

@media ( max-width : 1350px) {
	#nombreProyecto {
		width: 37%;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -45%;
	}
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 75px !important;
		height: 76px !important;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 75px !important;
		height: 76px !important;
	}
	#ListaEspacios {
		margin-left: 7%;
	}
	.etiq {
		margin-left: 7%
	}
	#ListaEtiquetas li {
		margin-right: 1%;
	}
}

@media ( max-width : 1300px) {
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 113px;
		height: 127px;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 113px;
		height: 127px;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -47%;
	}
	#ListaEspacios {
		margin-left: 6%;
	}
	.etiq {
		margin-left: 7%
	}
}

@media ( max-width : 1250px) {
	#bajarEti {
		margin-left: 32%;
	}
	#nombreProyecto {
		width: 36%;
	}
	.modal-fondos, .modal-perspectiva {
		width: 1200px;
		margin-left: -49%;
	}
	#ListaEspacios {
		margin-left: 4%;
	}
	.etiq {
		margin-left: 5%
	}
	#subirEti {
		margin-left: 50px;
	}
}

@media ( max-width : 1200px) {
	#ListaEspacios {
		margin-left: 3%;
	}
	.etiq {
		margin-left: 4%
	}
	.recargarQF {
		height: 50px;
		padding-left: 8px;
	}
	#items-container2 {
		width: 76%;
		float: left
	}
	.modal-fondos, .modal-perspectiva {
		width: 700px;
		min-width: 700px;
		margin-left: 20%;
		left: 20px
	}
	.borradorAuto {
		margin-left: 15px;
		margin-bottom: 15px;
		width: 18%;
	}
	.guardarFond, .guardarFond2 {
		margin-left: 8px;
		margin-bottom: 15px;
		width: 25%;
	}
	.ancho3 {
		margin-bottom: 21px;
	}
	.tools-fondos-container {
		position: absolute
	}
	#output_canvas {
		margin-left: 150px !important;
	}
}

@media ( max-width : 1180px) {
	#ListaEspacios {
		margin-left: 0%;
	}
	.etiq {
		margin-left: 1%
	}/* 
	#available_images div.clipper_image {
		width: 23%;
		margin-top: 1%;
		margin-left: 1%;
		margin-right: 0%;
		margin-bottom: 1%;
		border: 1px solid black;
	}
	#available_images2 div.clipper_image {
		width: 23%;
		margin-top: 1%;
		margin-left: 1%;
		margin-right: 0%;
		margin-bottom: 1%;
		border: 1px solid black;
	}
	#available_images div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 84px !important;
		height: 89px !important;
	}
	#available_images2 div.clipper_image div.image_wrapper div.image_background
		{
		line-height: 84px !important;
		height: 89px !important;
	} */
	#nombreProyecto {
		width: 38%;
	}
	#subirEti {
		left: 0;
		width: 59%;
	}
	#bajarEti {
		margin-left: 33%;
	}
}

@media ( max-width : 1150px) {
	#ListaEspacios {
		margin-left: 0;
	}
	#ListaEtiquetas {
		width: 55%;
		padding-left: 17px;
	}
	.etiq {
		margin-left: 0
	}
	.modal-fondos, .modal-perspectiva {
		margin-left: 18%;
	}
	.borradorAuto {
		margin-left: 16px;
		width: 15%;
	}
	.guardarFond, .guardarFond2 {
		margin-left: -3px;
		width: 13%;
	}
}

@media ( max-width : 1130px) {
	#ListaEtiquetas li {
		margin-right: 2px;
	}
	#ListaEtiquetas {
		width: 56%;
		padding-left: 20px;
	}
	.espacioInd {
		width: 62px;
	}
	#nombreProyecto {
		top: 118px;
		width: 364px;
	}
	#subirEti {
		width: 596px;
		top: 152px
	}
	#bajarEti {
		margin-left: 342px;
	}
}

@media ( max-width : 1080px) {
	#ListaEtiquetas li {
		margin-right: 2px;
	}
	#ListaEtiquetas {
		width: 56%;
		padding-left: 0px;
	}
	.espacioInd {
		width: 62px;
	}
}

@media ( max-width : 1050px) {
	.controls {
		position: inherit;
		float: right;
		right: 0;
	}
	#ListaEtiquetas li {
		margin-right: 2px;
	}
	#ListaEtiquetas {
		width: 551px;
		padding-left: 0px;
	}
	.espacioInd {
		width: 62px;
	}
}

@media ( max-width : 1030px) {
	.controls {
		width: 33%;
		float: right;
		margin-right: 5px
	}
	.modal-fondos, .modal-perspectiva {
		margin-left: 14%;
	}
}

@media ( max-width : 957px) {
	.modal-fondos, .modal-perspectiva {
		margin-left: 10%;
	}
}

@media ( max-width : 857px) {
	.modal-fondos, .modal-perspectiva {
		margin-left: 4%;
	}
}

@media ( max-width : 767px) {
	.modal-fondos, .modal-perspectiva {
		margin-left: 0%;
	}
}

@media ( max-width : 700px) {
}

@media ( max-width : 670px) {
}

@media ( max-width : 650px) {
	.modal-fondos, .modal-perspectiva {
		width: 98%;
		margin-left: 0%;
		left: 10px
	}
}

@media ( max-width : 500px) {
	.imagenPopUp {
		height: 125px;
		width: 25%;
		margin-right: 3%;
		float: left;
	}
	.altoLista {
		height: 125px;
		margin-bottom: 5%;
	}
	.imagenPopUp2 {
		height: 125px;
		width: 42%;
		margin-right: 3%;
		float: left
	}
	.imagenPopUp3 {
		height: 125px;
		width: 18%;
		float: left
	}
}

@media ( max-width : 500px) {
	.imagenPopUp2 {
		height: 125px;
		width: 40%;
		margin-right: 7%;
	}
	.imagenPopUp3 {
		height: 125px;
		width: 15%;
	}
} 






.wrapper {
    top: 80px;
    width: 400px;
    height: 350px;
    overflow:auto;    
}
.content {
    position: relative;    
    margin-top: 105px;
    margin-left: 150px;
} 
.picture {
    position: absolute;
}
.button {
    padding: 4px;
    margin: 4px;
    border: 1px solid black;
    float: left;
}
.button:hover {
    background-color: blue;
    color: white;
    cursor: pointer
}
#threshold {
    width: 95px;
    float: left;
}
#resultCanvas {
    top: 0px;
    left: 0;
} 
#container {
    position: relative; 
}

#container * {
    position: absolute;
}

.errorMessage {
    border: 1px solid #dFb5b4;
    background: #fcf2f2;
    color: #c7254e;
    padding: 0.5em;
    border-radius: 5px;
}

circle.control-point {
    fill: #dbe5e0;
}

circle.control-point:hover {
    stroke: yellow;
    stroke-width: 2px;
}
#guardar, #cancelar {
	display:none;
	cursor:pointer;
	padding:7px;
	padding-left:10px;
	padding-right:10px;
	background-color: #dbe5e0; 
	z-index:2001;
	border-radius:5px
}  
</style>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async
	src="js/tag-manager.js"></script>
<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		
		  gtag('config', 'UA-108225209-1');
		</script>
<script>
		
			var window_height = $(window).height(); 
			var window_width = $(window).width();
			if(window_width<900) {
				$('#movil-modal').modal('show'); 	
			}

			var canvas_width = Math.round((62*window_width)/100); 
			if(window_height<=768 && window_width<=1024){ 
				var canvas_height = Math.round((98*window_height)/100);
			} else if(window_height<=600 && window_width<=1024){
				var canvas_height = Math.round((100*window_height)/100);
			} else if(window_height<=768){
				var canvas_height = Math.round((97*window_height)/100);
			} else{
				var canvas_height = Math.round((93*window_height)/100);
			} 

			if(window_width>1050){	 
				var canvas_width = Math.round((62*window_width)/100);  
				$('.listaItems').css("width", window_width-48);
				$(".canvas-container").css("width", canvas_width);   
				
				
		    } else {

				var canvas_width = 582;  
		    	$('#canvas-div').css("width", canvas_width);
				$('.listaItems').css("width", 1003);
				$(".canvas-container").css("width", canvas_width);   
		    } 
			
			 
				var json_canvas = JSON.stringify(<%= lc.Canvas%>); 
				var json_original = <%= lc.Canvas%>;
				
				
				try{
					document.getElementById('json').value=json_canvas;
				}catch (e) {
					// TODO: handle exception
					console.log(e);
				}
				
				var objetoParaInsertar;
				var obj = []; 
			
			</script>

<script>
			var stateJson=-1;
			var banderaCanvas=false;
			var nuevo_id_lista;
			function insertItemFondos(id, name, url){
 
				 var pathcompleto='<%=new Config().URL_items%>'+name;
				 <%-- obj.unshift({"id":imagen_sin_fondo.id,"precio": imagen_sin_fondo.precio, "url": url, "path": imagen_sin_fondo.urlP,"titulo": imagen_sin_fondo.titulo,"etiquetas": imagen_sin_fondo.etiquetas});
				active_page=1;
				max_iconos=5;
				//$('#items-div').html('');
				mostrarItemsPagina('items-div',obj, active_page);
			    genPager('pager-container','items-div',obj);
			    //genPager('pager-container-borradores','items-div-borradores',obj);
			    mostrarFlechasTodos(); --%>
			    var activeObject = canvas.getActiveObject();
			    var height = activeObject.getHeight();
			    var width = activeObject.getWidth();
			    
/* 			    console.log("alto y ancho de activeobject");
			    console.log(height);
			    console.log(width);
			    activeObject.setHeight(activeObject.getHeight());
			    activeObject.setWidth(activeObject.getWidth());
			    var multiplier = height/activeObject.getHeight(); 
			    
			    console.log("multiplier");
				console.log(multiplier);

				var ancho_original= activeObject.width;
				var alto_original= activeObject.height; */

				var scale = canvas.getActiveObject().getObjectScaling();
				var H = canvas.getActiveObject().getHeight() / scale.scaleY;
				var W = canvas.getActiveObject().getWidth() / scale.scaleX;
				
				activeObject.set("src", pathcompleto); 
				activeObject.setSrc(pathcompleto  , function(img) {
					      
					canvas.getActiveObject().set({height:H});
					canvas.getActiveObject().set({width:W});
    				var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','bloqueo'])); 
					stateJson++;lastJSONState[stateJson]=json; 
					document.getElementById('json').value = json;
					canvas.renderAll();
				    
				    });	    

				
			    /* var img3=new Image();
			    img3.onload=function(){
			    	this.width = width;
			        this.height = height;

			    	

			    }
			    
			    img3.src=pathcompleto;
			    activeObject.setElement(img3);
		    	activeObject.id=id;
		    	activeObject.setHeight(height);
		    	console.log("dentro después de cargar la imagen lo que se le mete");
			    console.log(height);
			    console.log(width);
		    	activeObject.setWidth(width);
			    canvas.renderAll();
				items('items-div','pager-container'); */
			    
				cerramosONo=true;
			   }
			function insertItem(id, name, url)
			{            
				var pathcompleto='<%=new Config().URL_items%>'+name;
				 
				obj.unshift({"id":id,"precio": objetoParaInsertar.precio,"url": url, "path": pathcompleto,"titulo": objetoParaInsertar.titulo,"etiquetas": objetoParaInsertar.etiquetas });
				 
				active_page=1;
				max_iconos=5;
				//$('#items-div').html('');
				mostrarItemsPagina('items-div',obj, active_page);
			    genPager('pager-container','items-div',obj);
			    //genPager('pager-container-borradores','items-div-borradores',obj);
			    mostrarFlechasTodos();

				items('items-div','pager-container'); 
			}
			function cargarMisElementos(){
				active_page=1;
				max_iconos=5;  
				//$('#items-div').html('');
				mostrarItemsPagina('items-div',obj, active_page);
			    genPager('pager-container','items-div',obj);
			    //genPager('pager-container-borradores','items-div-borradores',obj);
			    mostrarFlechasTodos();
			}
			
			function repaintItems(){ 
				obj = [];
				<% 
				listaItems =ic.getItems(id_decoradori);
				for (ItemLDLC item: listaItems) {	
					String etiquetas_obj="";
					for (String etiqueta: item.ListaEtiquetas) {
						etiquetas_obj = etiquetas_obj + etiqueta + ",";
					}
				%>
					obj.push({"id":<%=item.itemLDC_id%>,"precio": <%=item.Price%>,"url": '<%=item.URLImage%>', "path": '<%=new Config().URL_items+ item.PathImage%>',"titulo": '<%=item.ImageTitle%>',"etiquetas": '<%=etiquetas_obj.toLowerCase()%>'});
				
				<%
				}
				%>

				active_page=1;
				max_iconos=5;
				//$('#items-div').html('');
				mostrarItemsPagina('items-div',obj, active_page);
			    genPager('pager-container','items-div',obj);
			    //genPager('pager-container-borradores','items-div-borradores',obj);
			    mostrarFlechasTodos();
			}
			function setCookie(name, value, exdays, path, domain, secure){ 
	     		var exdate = new Date();
	     		exdate.setDate(exdate.getDate() + exdays);
	     		
	     	    document.cookie= name + "=" + escape(value) +
	     	    ((exdays) ? "; expires=" + exdate.toUTCString() : "") +
	     	    ((path) ? "; path=" + path : "") + 
	     		((domain) ? "; domain=" + domain : "") +
	     	    ((secure) ? "; secure" : ""); 
	     	}
			function volver(pasoD){ 
		     	setCookie("proyecto_id", id_proyecto, 1);
		     	var href = '<%=new Config().decoradores%>/paso'+pasoD+'.html?id='+id_proyecto;
		    	window.location = href;
			}
			var paso="<%=pasoD%>"; 
			nuevo_id_lista="<%=nuevo_id_lista%>";
	         if(paso=="0"){  }else{
	      	 	volver(paso);
	         }
	         function activar(){
					$('.guardarFondo').css("display", "block");
					$('.guardarFondo').css("border", "1px solid black");
					$('.guardarFondo').css("background-color", "black");
					$('.guardarFondo').css("color", "white");
					$('.guardarFondo').css("cursor", "pointer");
					$('.guardarFondo').attr('onClick', 'guardarSinFondo();'); 
					
				}
	         function desactivar(){
					$('.guardarFondo').css("display", "none");
					$('.guardarFondo').attr('onClick', ''); 
				}
	         function noEnter(texto, e)	{
	        	 if (navigator.appName == "Netscape") tecla = e.which;
	        	 else tecla = e.keyCode;
	        	 tecla = (document.all) ? e.keyCode : e.which;
	        	    patron =/[\x5C'"]/;
	        	    te = String.fromCharCode(tecla); 
	        	 if (tecla == 13) val= false;
	        	 else	val= true;
	        	 if(!patron.test(te)) { val2= true;
	        	 } else { val2= false; }
	         	 if(val==false) {
	         		 return false;
	         	 } else if(val2==false){ 
	         		 return false; }
	         	 else {
	         		 true;
	         	 }
	         }
			</script>

</head>

<body onload="inicializar();login('ldlc')" style="min-width: 1050px">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="0"
		width="0">
	  <defs>
	     <filter id="blur" x="0" y="0">
	       <feGaussianBlur stdDeviation="6" />
	     </filter>
	  </defs>
	</svg>
	<div id="elcontainerfluid"
		class=" conefectos supreme-container container-fluid"
		style="padding-right: 0px; padding-left: 0px; margin-top: -15px;">

		
		<script type="text/javascript" src="js/d3.v3.min.js"></script>
		<script type="text/javascript" src="http://www.numericjs.com/lib/numeric-1.2.6.min.js"></script>
		<script type="text/javascript" src="js/magic-wand.js"></script>  
		<script type="text/javascript" src="js/controller2.js"></script> 


		<div id="canvas-div" class="borde-canvas"
			style="width: 63%; height: 100%; position: absolute; -moz-user-select: none; border-top: 1px solid black; margin-left: 40px;"> 
			<canvas id="canvas" class="" width=800px height=600px
				style="width: 100%; height: 100%;">
	          </canvas> 
	                    
         
		</div>

	    <div id="container">
	    	<div id="guardar">Guardar</div>
	    	<div id="cancelar">Cancelar</div>
	    	<canvas id="background" style="top:150px;left:150px"></canvas>
		    <img id="screen" src="">
		    <canvas width="500" height="507" id="screenCanvas"></canvas>
		    <svg width="500" height="507" id="controlHandles"></svg>
		</div>
		<div id="leftbuttons" class="leftbuttons">
			<div id="toolscontainer-min" class="toolscontainer-min">
				<div id="hacer-deshacer-container" class="hacer-deshacer-container">
					<div id="deshacer" class="deshacer">
						<img src="img/deshacer.png" alt="Deshacer" title="Deshacer (Ctrol+z)"
							onclick="undo()">
					</div>
					<div id="hacer" class="hacer">
						<img src="img/hacer.png" alt="Rehacer" title="Rehacer (Ctrol+y  |  Shift+Ctrol+y)"
							onclick="redo()">
					</div>
				</div>
				<div id="lupas-container" class="lupas-container">
					<div id="lupa" class="lupa">
						<img src="img/lupa+.png" alt="Zoom +" title="Zoom +"
							onclick="zoomMore()">
					</div>
					<div id="lupa-" class="lupa-">
						<img src="img/lupa-.png" alt="Zoom -" title="Zoom -"
							onclick="zoomLess()">
					</div>
				</div>
				
				<div id="herramientas-container" class="herramientas-container">
					<!-- <div id="herramientas" class="herramientas">
	                        <img src="img/herramientas.png" alt="Mostrar/Ocultar Herramientas" title="Mostrar/Ocultar Herramientas" onclick="showRemoveTools('toolscontainer-all')">
	                    </div> -->
				</div>
			</div>
			<div id="toolscontainer-all" class="toolscontainer-all">
				<div id="dragmode" class="tool" title="Desplazar"
					onclick="dragmode()" style="margin-top: -7px;">
					<img src="img/mano.svg" alt="Desplazar" style="width:20px">
					<p>DESPLAZAR</p>
				</div> 
				<div id="texto" class="tool" title="Texto"
					onclick="openAddTextModal()" style="margin-top:4px">
					<img src="img/texto.png" alt="Texto">
					<p>TEXTO</p>
				</div>
				<div id="flipv" class="tool" title="Voltear Vertical"
					onclick="flipv()">
					<img src="img/flipvertical.png" alt="Voltear Vertical">
					<p>ESPEJO</p>
				</div>
				<div id="fliph" class="tool" title="Voltear Horizontal"
					onclick="fliph()">
					<img src="img/fliphorizontal.png" alt="Voltear Horizontal">
					<p>ESPEJO</p>
				</div>
				<div id="clonar" class="tool" title="Clonar" onclick="clone()">
					<img src="img/clonar.png" alt="Clonar">
					<p>CLONAR</p>
				</div>
				<div id="atras" class="tool" title="Enviar Detr&aacute;s"
					onclick="sendToBack()">
					<img src="img/atras.png" alt="Enviar Detr&aacute;s">
					<p>ATR&Aacute;S</p>
				</div>
				<div id="adelante" class="tool" title="Enviar Adelante"
					onclick="sendToFordward()">
					<img src="img/adelante.png" alt="Enviar Adelante">
					<p>ADELANTE</p>
				</div>
				<div id="perspectiva" class="tool" title="Cambiar perspectiva"
					onclick="perspective()">
					<img src="img/distorsionar.png" alt="Enviar Adelante">
					<p>PERSPECTIVA</p>
				</div> 
				<div id="enviarAtras" class="tool" title="Enviar Detr&aacute;s de todo"
					onclick="sendToBack()">
					<img src="img/enviar-atras.svg" alt="Enviar Detr&aacute;s de todo">
					<p style="padding-top: 5px;line-height: 8px">ENVIAR DETR&Aacute;S</p>
				</div>
				<div id="enviarAdelante" class="tool" title="Enviar Adelante de todo"
					onclick="sendToFordward()">
					<img src="img/enviar-delante.svg" alt="Enviar  Adelante de todo">
					<p style="padding-top: 5px;line-height: 8px">TRAER AL FRENTE</p>
				</div>
				<div id="fondo" class="tool" title="Fondo"
					onclick="desactivar();removeBackground();">
					<img src="img/fondo.png" alt="Fondo">
					<p>FONDO</p>
				</div>
				<div id="eliminar" class="tool" title="Eliminar (Supr || Delete)"
					onclick="removeSelected()" onkeydown="funcionEnter(event);">
					<img src="img/eliminar.png" alt="Eliminar">
					<p>ELIMINAR</p>
				</div>
				
				<div id="totalItems" class="tool"
					title="Items totales para el producto seleccionado (Solo ser&aacute;n visibles las imagenes que arrastres a la composici&oacute;n)"
					style="margin-top: -3px;">
					<input type="number" id="totalItem" name="items" placeholder="0"
						min="1" max="30"
						style="padding-bottom: 0; margin-bottom: 0; border: 0; background-color: transparent; width: 38px; padding-left: 16px; text-align: center"
						onBlur="putZero()">
					<p>ITEMS</p>
				</div>
				<!-- <div class="tool"  id="descargar" onclick="exportImage()">Descargar</div> -->
			</div>

		</div>
		<div id="completo2" style="overflow: hidden">
			<div id="completo">
				<div id="ListaEtiquetas">
					<div class="etiq">
						<li><input type="checkbox" class="checkbox" id="cb1"
							value="1" style="float: left" /><label class="letraEt" for="cb1"
							style="float: left">&nbsp;Nórdico</label></li>
						<li><input type="checkbox" class="checkbox" id="cb2"
							value="1" style="float: left" /><label class="letraEt" for="cb2"
							style="float: left">&nbsp;Industrial</label></li>
						<li><input type="checkbox" class="checkbox" id="cb3"
							value="1" style="float: left" /><label class="letraEt" for="cb3"
							style="float: left">&nbsp;Vintage</label></li>
						<li><input type="checkbox" class="checkbox" id="cb4"
							value="1" style="float: left" /><label class="letraEt" for="cb4"
							style="float: left">&nbsp;Moderno</label></li>
						<li><input type="checkbox" class="checkbox" id="cb5"
							value="1" style="float: left" /><label class="letraEt" for="cb5"
							style="float: left">&nbsp;Minimalista</label></li>
						<li><input type="checkbox" class="checkbox" id="cb7"
							value="1" style="float: left" /><label class="letraEt" for="cb7"
							style="float: left">&nbsp;Ecléctico</label></li>
						<li><input type="checkbox" class="checkbox" id="cb8"
							value="1" style="float: left" /><label class="letraEt" for="cb8"
							style="float: left">&nbsp;Retro</label></li>
						<li><input type="checkbox" class="checkbox" id="cb9"
							value="1" style="float: left" /><label class="letraEt" for="cb9"
							style="float: left">&nbsp;Rústico</label></li>
						<li class="especial"><input type="checkbox" class="checkbox"
							id="cb6" value="1" style="float: left" /><label class="letraEt"
							for="cb6" style="float: left">&nbsp;Contemporáneo</label></li>
					</div>
					<div id="ListaEspacios">
						<div class="espacioInd">
							<div class="cc-selector separacionBottom_20">
								<div style="display: inline-block;" id="dormitorio"
									onclick="checkRadioButtons('dormitorio')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="dormitorio">
										<img src="img/espacio/dormitorio.png" alt="dormitorio"
										class="img_border" />

									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector  separacionBottom_20">
								<div style="display: inline-block;" id="despacho"
									onclick="checkRadioButtons('despacho')">

									<img src="img/espacio/despacho.png" alt="despacho"
										class="img_border" />
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector separacionBottom_20">
								<div style="display: inline-block;" id="vestidor"
									onclick="checkRadioButtons('vestidor')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="vestidor">
										<img src="img/espacio/vestidor.png" alt="vestidor"
										class="img_border" />
									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector separacionBottom_20">
								<div style="display: inline-block;" id="salon"
									onclick="checkRadioButtons('salon')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="salon">
										<img src="img/espacio/salon.png" alt="salon"
										class="img_border" />
									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector separacionBottom_20">
								<div style="display: inline-block;" id="comedor"
									onclick="checkRadioButtons('comedor')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="comedor">
										<img src="img/espacio/comedor.png" alt="comedor"
										class="img_border" />

									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector separacionBottom_20">
								<div style="display: inline-block;" id="dormitorio-infantil"
									onclick="checkRadioButtons('dormitorio-infantil')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20"
										for="dormitorio-infantil"> <img
										src="img/espacio/dormitorio-infantil.png"
										alt="dormitorio-infantil" class="img_border" />
									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector  separacionBottom_20">
								<div style="display: inline-block;" id="entrada"
									onclick="checkRadioButtons('entrada')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="entrada">
										<img src="img/espacio/entrada.png" alt="entrada"
										class="img_border" />
									</label>
								</div>
							</div>
						</div>

						<div class="espacioInd">
							<div class="cc-selector  separacionBottom_20">
								<div style="display: inline-block;" id="questionmark"
									onclick="checkRadioButtons('questionmark')">
									<label style="margin-bottom: 0px !important;"
										class="drinkcard-cc separacionBottom_20" for="questionmark">
										<img src="img/espacio/questionmark.png" alt="questionmark"
										class="img_border" style="outline: 1px solid black" />
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="nombreProyecto">
					<div style="text-align: center !important; width: 100%">
						<input type="text" class="letra-xxxs precio"
							style="padding-bottom: 8px; padding-top: 8px; border-right: 1px solid black; border-left: 1px solid black; background-color: #dbe5e0; text-align: center; width: auto !important; min-width: 350px; position: absolute; margin-left: auto; margin-right: auto"
							placeholder="ASÍGNALE UN NOMBRE A ESTA LISTA DE LA COMPRA" />
					</div>
				</div>
				<div id="subirEti" style="">
					<img style="margin-left: auto; margin-right: auto;"
						src="img/subir.svg" onclick="subir()" />
				</div>
				<div id="bajarEti" style="">
					<img style="margin-left: auto; margin-right: auto;"
						src="img/bajar.svg" onclick="bajar()" />
				</div>
			</div>
		</div>
		<form id="senditemfromfondos" enctype="multipart/form-data"
			action="CreateItemFromFondos" method="post" target="upload_target">
			<input type="hidden" id="imageData_Fondos" value=''
				name="imageDataFondos"> <input type="hidden"
				id="itemtitulo_Fondos" name="itemtitulo"> <input
				type="hidden" id="itemetiquetas_Fondos" name="itemetiquetas">
			<input type="hidden" id="itemprecio_Fondos" name="itemprecio">
			<input type="hidden" id="itemurl_Fondos" name="itemurl"> <input
				type="hidden" id="itemsrc_Fondos" name="itemsrc"> <input
				type="hidden" id="item_decorador_id_Fondos" name="decorador_id"
				value="<%=id_decorador%>"> <input type="hidden"
				id="item_id_proyecto_Fondos" name="id_proyecto"
				value="<%=id_proyecto%>"> <input type="hidden"
				id="item_id_ldlc_Fondos" name="id_ldlc"> <input
				type="hidden" id="item_id_ldlc_tipo" name="tipo">
		</form>


		<div class="modal fade modal-pop-up-subir modal-fondos"
			style="top: 5vh; max-height: 90%; overflow-y: scroll;"
			id="modal-fondo" role="dialog">
			<div class="modal-dialog ">
				<!-- Modal content-->
				<div class="modal-content">
					<button type="button" data-dismiss="modal" aria-label="Close"
						style="z-index: 1000; position: absolute; top: 10px; right: 10px; background-color: transparent; border: none">
						x</button>
					<div class="modal-body"
						style="width: 100%; padding: 0; margin: 2%; margin-left: 0; margin-right: 0; min-height: 510px !important; max-height: 90% !important">
						<div class="tools-fondos-container" style="width: 150px">
							<div class="herrFondo">
								<div id="fondo" class="tool tool-fondos ancho"
									title="Utiliza MARCAR FONDO para señalar que parte de la imagen que quieres borrar"
									onclick="drawBackground()" style="height: auto">
									<img src="img/marcar-fondo.svg" style="width: 50px" alt="Fondo">
									<p
										style="line-height: 13px; letter-spacing: 1px; font-size: 8px; margin-bottom: 5px; padding-left: 2px">MARCAR
										FONDO</p>
								</div>
								<div id="fondo" class="tool tool-fondos ancho"
									title="Utiliza MARCAR OBJETO para señalar que parte de la imagen no quieres que se borre"
									onclick="drawForeground()" style="height: auto">
									<img src="img/iconos-borrar.svg" style="width: 50px"
										alt="Fondo">
									<p
										style="line-height: 13px; letter-spacing: 1px; margin-bottom: 5px; font-size: 8px">MARCAR
										OBJETO</p>
								</div>
								<div id="fondo" class="tool tool-fondos ancho"
									title="Utiliza MARCAR FONDO para señalar lo que deseas borrar y MARCAR OBJETO para señalar que deseas conservar, una vez marcada la imagen pulsa BORRAR CON MARCAS"
									onclick="segment();activar()" style="height: auto">
									<img src="img/borrar-fondo.svg" style="width: 50px" alt="Fondo">
									<p
										style="line-height: 13px; font-size: 8px; letter-spacing: 1px; margin-bottom: 5px;">BORRAR
										CON MARCAS</p>
								</div>
							</div>
							<div class="herrFondo">
								<div id="fondo" class="tool tool-fondos ancho"
									title="Realiza un borrado del fondo (tonalidades claras)"
									style="margin-top: 4px; height: auto"
									onclick="quitarFondo();activar()">
									<img src="img/borrar-fondo-automatico.svg" style="width: 55px"
										alt="Fondo">
									<p
										style="line-height: 13px; letter-spacing: 1px; font-size: 8px; padding-top: 4px">BORRADOR
										AUTOM&Aacute;TICO</p>
								</div>
							</div>
							<div class="herrFondo">
								<div style="overflow: auto"> 
    								<div class="button" onclick="uploadClick()">Varita mágica</div>
								    <div class="button" onclick="trace()">Borrar</div> 
								</div>
								<!-- <div style="overflow: auto">
								    <div style="float: left; margin-right: 10px;">Radio: </div>
								    <input id="blurRadius" type="text" onchange="onRadiusChange.apply(this, arguments)" style="float: left; width: 20px; margin-right: 10px;"/>
								    <div id="threshold"></div>
								</div>  -->
							</div>
							<div class="herrFondo">
								<a
									href="https://www.youtube.com/watch?v=BqE76KGfaDA"
									target="_blank" style="color: black"><div id="fondo"
										class="tool tool-fondos ancho" title="Ver tutorial"
										style="margin-top: 8px;; height: auto">
										<img src="img/tutorial.svg" style="width: 55px" alt="Fondo">
										<p
											style="line-height: 13px; letter-spacing: 1px; font-size: 8px; padding-top: 2px">TUTORIAL</p>
									</div></a>
							</div>
							<div class="herrFondo" style="border: 0">
								<div id="fondo"
									class="tool tool-fondos ancho guardarFondo guardarFondoFinal"
									title="Guardar y añadir al proyecto"
									style="margin: 0; padding-top: 0; height: auto" onclick="">
									<img src="img/guardar.svg"
										style="width: 50px; margin-top: -10px;" alt="Fondo">
									<p
										style="line-height: 13px; letter-spacing: 1px; font-size: 8px; padding-top: 0; margin-top: -10px;">COLOCAR</p>
								</div>
							</div>

							<!-- <div id="fondo" class="tool tool-fondos ancho"  title="Fondo" onclick="download('output_canvas')">
									<img src="img/fondo.png" alt="Fondo">
				                    <p style="line-height: 13px;letter-spacing: 1px;font-size:8px">DESCARGAR</p>
				                </div> -->
						</div>
						<div class="" style="width: 150px; float: left; min-height: 510px">&nbsp;</div>
						<div id="items-container2" class="items-container">
							<div id="items-div-sinfondo" class=" bd"
								style="padding-top: 15px"></div>
						</div>
						<div class="canvasMod"></div>
						 

						<script>  
							anchoModal=500;  
							
							 $('.canvasMod').html('<canvas id="input_canvas" class="canvas-fondos" width='+anchoModal+'px height='+anchoModal+'px style="width:100%; height:100%; "></canvas><canvas id="output_canvas" class="canvas-fondos" width='+anchoModal+'px height='+anchoModal+'px style="width:100%; height:100%; "></canvas>')
							
							</script>
					</div>
				</div>
			</div>
		</div>
		
		<div class="modal fade modal-pop-up-subir modal-perspectiva"
			style="top: 5vh; max-height: 90%; overflow-y: scroll;"
			id="modal-perspectiva" role="dialog">
			<div class="modal-dialog ">
				<!-- Modal content-->
				<div class="modal-content">
					<button type="button" data-dismiss="modal" aria-label="Close"
						style="z-index: 1000; position: absolute; top: 10px; right: 10px; background-color: transparent; border: none">
						x</button>
					<div class="modal-body"
						style="width: 100%; padding: 0; margin: 2%; margin-left: 0; margin-right: 0; min-height: 510px !important; max-height: 90% !important">  
				</div>
			</div>
		</div>
	</div>

		<!-- Modal add text-->
		<div class="modal fade modal-pop-up-text" id="modal-add-text"
			role="dialog">
			<div class="modal-dialog ">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-body modal-body-add-text"
						style="width: 93%; padding: 0; max-height: 560px !important">
						<div id="text-controls">
							<textarea id="textarea-text"
								class="text-controls-textarea nopadding" name="textarea-text"
								onkeyPress="return noEnter(this.value, event)" rows="3"
								style="text-align: center; vertical-align: center"
								placeholder="INTRODUCE EL TEXTO"></textarea>
							<br> <label for="font-family"
								style="display: inline-block; margin-top: 2%">Tipo de
								letra:</label> <select id="font-family"
								class="btn-object-action nopadding">
								<option value="Arial">Arial</option>
								<option value="helvetica">Helvetica</option>
								<option value="myriad pro">Myriad Pro</option>
								<option value="delicious">Delicious</option>
								<option value="verdana">Verdana</option>
								<option value="georgia">Georgia</option>
								<option value="courier">Courier</option>
								<option value="comic sans ms">Comic Sans MS</option>
								<option value="impact">Impact</option>
								<option value="monaco">Monaco</option>
								<option value="optima">Optima</option>
								<option value="hoefler text">Hoefler Text</option>
								<option value="plaster">Plaster</option>
								<option value="engagement">Engagement</option>
							</select> <br> <label for="text-align"
								style="display: inline-block; margin-top: 2%">Alineac&oacute;n
								del texto:</label> <select id="text-align"
								class="btn-object-action nopadding">
								<option value="Left">Left</option>
								<option value="Center">Center</option>
								<option value="Right">Right</option>
								<option value="Justify">Justify</option>
							</select>
							<div>
								<label for="text-lines-bg-color" style="margin-top: 1%">Color
									de fondo:</label> <input value="" id="text-lines-bg-color" size="3"
									class="btn-object-action nopadding" type="color"
									style="width: 50%; float: left; border: 0">
								<div class="checkbox"
									style="float: left; width: 40%; padding-top: 4px">
									<label class="mantenersesioniniciada"> <input
										type="checkbox" id="checkSinFondo" name="checkSinFondo"
										style="margin-left: 25%; margin-right: 4%"> Sin fondo
									</label>
								</div>
							</div>
							<br> <br>
							<div>
								<label for="text-lines-bg-color" style="margin-top: 0%">Color
									de letra:</label> <input value="" id="text-lines-color" size="3"
									class="btn-object-action nopadding" type="color"
									style="border: 0">

							</div>
							<div>
								<label for="text-font-size" style="margin-top: 1%">Tama&ntilde;o
									de letra:</label> <input value="" min="1" max="120" step="1"
									id="text-font-size" class="btn-object-action nopadding"
									type="range">
							</div>
							<div>
								<label for="text-line-height" style="margin-top: 1%">Altura
									de la letra:</label> <input value="" min="0" max="10" step="0.1"
									id="text-line-height" class="btn-object-action nopadding"
									type="range">
							</div>
							<div>
								<label for="text-char-spacing" style="margin-top: 1%">Espacio
									entre car&aacute;cteres:</label> <input value="" min="-200" max="800"
									step="10" id="text-char-spacing"
									class="btn-object-action nopadding" type="range">
							</div>

						</div>

						<button id="insert-text" type="button" class="boton"
							onclick="insertText()" data-dismiss="modal"
							style="margin-top: 4%; margin-bottom: 1%; float: left">A&Ntilde;ADIR</button>
					</div>

				</div>

			</div>
		</div>
		<script>
		    	
				var active_page=1;
			    var c = document.getElementById("canvas");  
			    var d = document.getElementById("leftbuttons");  
			    
 
			    c.width = canvas_width;
			    c.height = canvas_height;
			    d.height = canvas_height;
		    
	        	var canvas = new fabric.Canvas('canvas');
		    	var total_lista=0; //precio total de la lista
				var lastJSONState=[];
				var nextJSONState="";
				var div_focus='items-div';
				var busqueda = false;
		    	var busqueda2=false;
		    	var tag=false;
				var pager_container='pager-container-todos';
				var input_id='buscartodosinput';
				var longitud=0;
				
				canvas.on("object:added", function (e) {
					//console.log('object:added');
    				var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','bloqueo'])); 
    				if(banderaCanvas) {
    					
    				} else {
						stateJson++;lastJSONState[stateJson]=json;
    				}
					document.getElementById('json').value = json;
					canvas.renderAll();
					canvas.calcOffset();
					//console.log(lastJSONState);
					//console.log('json:'+json);
					listaItemsCargar();

	                dragMode = true;
	                dragmode();
				});
	
				canvas.on("object:modified", function (e) {
					//console.log('object:modified');
    				var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','bloqueo'])); 
					stateJson++;lastJSONState[stateJson]=json; 
					document.getElementById('json').value = json;
					canvas.renderAll();
					cerramosONo=true;
					//console.log(lastJSONState);

	                dragMode = true;
	                dragmode();
				});

			
				var image_path, image_title, image_tags, image_url, image_price, item_id;
				function updateVars(image_path, image_title, image_tags, image_url, image_price, item_id) {
					this.image_path =image_path;
					this.image_title = image_title;
					this.image_url = image_url;
					this.image_tags = image_tags;
					this.image_price = image_price;
					this.item_id=item_id;
					//console.log(image_path, image_title, image_tags, image_price, item_id);
				}
				
				function handleDragStart(e) {
				    [].forEach.call(images, function (img) {
				        img.classList.remove('img_dragging');
				    });
				    this.classList.add('img_dragging');
				}
	
				function handleDragOver(e) {
				    if (e.preventDefault) {
				        e.preventDefault(); // Necessary. Allows us to drop.
				    }
	
	
				    e.dataTransfer.dropEffect = 'copy';
	
				    return false;
				}
	
				function handleDragEnter(e) {
				    // this / e.target is the current hover target.
				    this.classList.add('over');
				}
	
				function handleDragLeave(e) {
				    this.classList.remove('over'); // this / e.target is previous target element.
				}
	
				function handleDrop(e) {
					//alert("handlerDrop");
				    if (e.stopPropagation) {
				        e.stopPropagation(); // stops the browser from redirecting.
				    }
				    e.preventDefault();  
	
				    var img = document.querySelector('img.img_dragging');
	
				    //console.log('event: ', e); 
	                var title = image_title;
	                var tags = image_tags;
	                var price = image_price;
	                var url = image_url;
	                var id = item_id;
	                pointer = canvas.getPointer(event); 
	                var newImage = null;
				    newImage = new fabric.Image(img, {
				    	id:id,
				    	title: title,
		                tags: tags,
		                url: url,
		                price: price,
		                src: img.getAttribute('src'),
				        left: pointer.x,
				        top: pointer.y,
				        crossOrigin: 'Anonymous'
				    });
				    canvas.add(newImage);
				    cerramosONo=true;
		
	                total_lista=parseFloat(total_lista)+parseFloat(image_price);
	                //console.log(total_lista);
	                document.getElementById("total_lista_precio").innerHTML = parseFloat(total_lista).toFixed(2);
	                
	                //recargo items para evitar repeticiones al añadir
	                //console.log('active_page:'+active_page);
	                
	                if (busqueda){
						if(tag){
							showItemsByTagTodos(div_focus,pager_container,document.getElementById(input_id).value);
	                	}else {
	                		showItemsByTag(div_focus,pager_container,document.getElementById(input_id).value);
	                	}
	                	
	                }else{
						if(tag){
							mostrarItemsPagina(div_focus,obj2,active_page);
	                	}else {
	                		mostrarItemsPagina(div_focus,obj,active_page);
	                	}
	                	
	                }  
	                return false;
	                
				}
	
				function handleDragEnd(e) {
				    // this/e.target is the source node.
				    [].forEach.call(images, function (img) {
				        img.classList.remove('img_dragging');
				    });
				}
				
				
				function showItemsSinFondo(container_items,container_pager, id){ 
					$("#items-div-sinfondo").html("");
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
								token : "cargarPromocion",
								action : "get_items_sinfondo",
								id : id
							},
							// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
							contentType : "application/json; charset=utf-8",
							success : function(data) {
								// BootstrapDialog.alert("DATA: "+data);
								// $usuarioGlobal=data;
								if (isError(data)) {  
								} else {
									objSinFondo = [];
									var path;
									for(var i=0;i<data.length;i++){
										 path='<%=new Config().URL_items%>';
										 objSinFondo.push({"id":data[i].id, "precio":data[i].price, "url":data[i].url, "path": path+''+data[i].src,"titulo": data[i].title, "etiquetas": data[i].tags});
									 	
									} 
									active_page=1;
									max_iconos=5;
									if(objSinFondo.length==0){
										$("#items-div-sinfondo").css({"padding-top":"0", "display":"block"});
										$("#items-div-sinfondo").html("No se encontraron imágenes sin fondo.");
									} else {
				  					$("#items-div-sinfondo").html('<div class="image_wrapper2"><div class="image_background2" onclick="resetQuitarFondo();"><img class="clipper_image2 recargarQF" src="img/recargar.svg"></div></div>');
				  					$("#items-div-sinfondo").css({"padding-top":"0"});
				  					mostrarItemsPagina2(container_items,objSinFondo, active_page); 
								    
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
				
				var images = document.querySelectorAll('#items-div img');
	
				// Bind the event listeners for the canvas
			    var canvasContainer = document.getElementById('canvas-div');
			    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
			    canvasContainer.addEventListener('dragover', handleDragOver, false);
			    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
			    canvasContainer.addEventListener('drop', handleDrop, false);
			    
			    var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; 
				var hasExtension = false; 
				chrome.runtime.sendMessage('ilpaccaeklnjpiocfiohejfbpclgmmbn', { message: "version" },
					    function (reply) {
					        if (reply) {
					            if (reply.version) {
					                //log the response received from the chrome application
					                //console.log(reply.version);
					                hasExtension=true;
					            }
					        }
					    }
					 );
				
	    	</script>

		<div class="container controls">

			<ul class="nav nav-tabs  tab">
				<li id="miselementos" class="active"><a data-toggle="tab"
					onclick="showItemsByTag('items-div','pager-container','');"
					href="#menumiselementos">MIS ELEMENTOS</a></li>
				<li id="todos"><a data-toggle="tab" href="#menutodos">TODOS</a></li>
			</ul>




			<div class="tab-content">
				<div id="menumiselementos" class="tab-pane fade in active">
					<div id="cuadroitems" class="cuadroitems">
						<div id="cuadroitemshead" class="cuadroitemshead">

							<div id="buscar-container" class="buscar-container">
								<input type="text" class="input-box"
									placeholder="BUSCAR MÁXIMO 2 ETIQUETAS" id="buscarinput"
									style="background-color: transparent; padding-left: 12px">
							</div>
							<div id="lupa-container" class="lupa-container"
								onclick="active_page=1;div_focus='items-div'; busqueda=true;tag=false;pager_container='pager-container';input_id='buscarinput'; showItemsByTag('items-div','pager-container',document.getElementById('buscarinput').value); ">
								<img width="auto" height="21px" src="img/buscar.png">
							</div>
							<div id="lupatodos-container" class="lupa-container"
								onclick="items('items-div','pager-container')">
								<img width="20" height="20" src="img/refresh.png">
							</div>



							<div id="subir-container" class="subir-container">
								<button type="button" class="close" data-toggle="modal"
									data-target="#modal-subir" onclick="borrarSubirImagen()">
									<img width="auto" height="20px" alt="Subir Elemento"
										title="Subir Elemento" src="img/subir.png">
								</button>


							</div>
						</div>
						<div id="items-container" class="items-container">
							<div id="available_images" style="height: auto !important">
								<div class="resultset">
									<script>
										 	<%-- 
											<% 
											for (ItemLDLC item: listaItems) {	
												String etiquetas_obj="";
												for (String etiqueta: item.ListaEtiquetas) {	
													etiquetas_obj = etiquetas_obj + etiqueta + ",";
												}
											%>
												obj.push({"id":<%=item.itemLDC_id%>,"precio": <%=item.Price%>,"url": '<%=item.URLImage%>', "path": '<%=new Config().URL_items+ item.PathImage%>',"titulo": '<%=item.ImageTitle%>',"etiquetas": '<%=etiquetas_obj%>'});
											<% 	
											}
											%>	 --%>	

										</script>
									<div id="items-div" class=" bd" style="padding-top: 15px!important">

									</div>
								</div>

							</div>
							<div id="inicial_image"></div>
							<div id="pager-container" class="pager-container"></div>

							<script>		
								    /* Element.prototype.remove = function() {
								        this.parentElement.removeChild(this);
								    } */
								    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
								        for(var i = this.length - 1; i >= 0; i--) {
								            if(this[i] && this[i].parentElement) {
								                this[i].parentElement.removeChild(this[i]);
								            }
								        }
								    }
								    
								    //console.log("páginas: "+ numero_paginas +", length:"+ obj.length);
									

									function showItemsByTag(container_items,container_pager,tag){
										//console.log("showItemsByTag: "+tag +" objlength:"+ obj.length+" "+container_items+" "+container_pager);
										
										//div_focus='items-div2';
										tag=$.trim(tag); 
										tag = tag.toLowerCase();
										tag=tag.split('-').join(','); 
										tag=tag.split(' ').join(',');  
										var array_tags=tag.split(","); 
										var obj_buscar=[];
										var array=[];
										var bandera=false;
										for (z=0;z<=array_tags.length-1; z++){
											//console.log("Parte etiqueta: "+ array_tags[z]);
											for (x = 0; x <= obj.length; x++){
												//console.log("tamaño: "+obj.length+" buscando: "+array_tags[z]);
												 
												if (obj[x]!=null && obj[x]['etiquetas'].includes(array_tags[z])){
													
													bandera=false;
													genDivItem(container_items,obj[x]['id'],obj[x]['path'],obj[x]['url'], obj[x]['precio'],0);
													//console.log("Etiquetas: "+obj[x]['etiquetas']+" "+obj[x]['path']+" contains "+array_tags[z]);
 
													if(obj_buscar.length>0) {
														for (j = 0; j < obj_buscar.length; j++){ 
															 
															
															if(obj_buscar[j].id==obj[x].id) {
																bandera=true;
															} 
														}
													}
													if(bandera!=true){
														obj_buscar.push(obj[x]);
													}
													
													 													 
												}
											}
										}
										
										//console.log("showItemsByTag: Elementos encontrados: "+obj_buscar.length);
										document.getElementById('preetiquetas').className = 'ocultar';
										
										if(obj_buscar.length==0){
											objetoRueda=obj_buscar;
				      						$("#items-div").css({"padding-left":"15px","padding-top":"40px", "display":"block"});
				      						$("#items-div").html("No se encontraron resultados. Busca otras etiquetas o pulsa MIS ELEMENTOS para ver todos tus productos.");
				      					} else {

											objetoRueda=obj_buscar;
					      					$("#items-div").html("");
					      					$("#items-div").css({"padding-left":"15px","padding-top":"15px"}); 
					      					
											mostrarItemsPagina(container_items,obj_buscar, active_page);
										    genPager2(container_pager,container_items,obj_buscar);
										    
				      					}
										

										
									}
									
									
								function showItemsByTagTodos(container_items,container_pager,tag){
									if(tag==""){
										document.getElementById('preetiquetas').className = '';
								    	document.getElementsByClassName("clipper_image").remove();
								    	document.getElementsByClassName("ul_pager").remove();
								    	div_focus='items-div2';
								    	document.getElementById('buscarinput').value='';
								    	document.getElementById('buscartodosinput').value='';
									}else {
							    		tag=$.trim(tag);
							    		tag = tag.toLowerCase();
										tag=tag.split('-').join(','); 
										tag=tag.split(' ').join(',');  
										var array_tags=tag.split(","); 
										var content= new Object();
										content.tipos=[];
										
										for (i=0;i<array_tags.length; i++){
											content.tipos.push(array_tags[i]);
										}
										var content = JSON.stringify(content); 
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
								      				token : "cargarPromocion",
								      				action : "get_items_by_etiquetas",
								      				etiquetas: content
								      			},
								      			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
								      			contentType : "application/json; charset=utf-8",
								      			success : function(data) {
								      				// BootstrapDialog.alert("DATA: "+data);
								      				// $usuarioGlobal=data;
								      				if (isError(data)) {  
								      				} else { 
								      					obj2 = [];   
	  													var path;
	  													for(var i=0;i<data.length;i++){
	  														console.log(data[i]);
	 														 path='<%=new Config().URL_items%>';
								      						 obj2.push({"id":data[i].id, "precio":data[i].price,"url":data[i].url, "path": path+''+data[i].src,"titulo": data[i].title, "etiquetas": data[i].tags, "tipo": data[i].tipo});
								      					 	
								      					} 
								      					active_page=1;
								      					max_iconos=5;
								      					if(obj2.length==0){
								      						$("#items-div2").css({"margin-left":"15px","padding-top":"40px", "display":"block"});
								      						$("#items-div2").html("No se encontraron resultados. Busca otras etiquetas o pulsa TODOS para buscar por categorias.");
								      						objetoRueda=obj2;
								      					} else {
	 
									      					$("#items-div2").html("");
									      					$("#items-div2").css({"margin-left":"15px","padding-top":"15px"});
									      					objetoRueda=obj2;
									      					mostrarItemsPagina(container_items,obj2, active_page);
														    genPager2(container_pager,container_items,obj2);
														    
								      					}
								      					//genPager('pager-container-borradores','items-div-borradores',obj);
								      				    mostrarFlechasTodos();
								      				 	document.getElementById('preetiquetas').className = 'ocultar';
	 
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
								
								
								function items(container_items,container_pager){ 
											$("#items-div").html("");
											$("#items-div2").html("");
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
								      				token : "cargarPromocion",
								      				action : "get_items",
								      				idDecorador : id_decorador
								      			},
								      			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
								      			contentType : "application/json; charset=utf-8",
								      			success : function(data) {
								      				// BootstrapDialog.alert("DATA: "+data);
								      				// $usuarioGlobal=data;
								      				if (isError(data)) {  
								      				} else {
								      					obj = [];
	  													var path;
	  													for(var i=0;i<data.length;i++){
	 														 path='<%=new Config().URL_items%>';
								      						 obj.push({"id":data[i].id, "precio":data[i].price, "url":data[i].url, "path": path+''+data[i].src,"titulo": data[i].title, "etiquetas": data[i].tags});
								      					 	
								      					} 
								      					active_page=1;
								      					max_iconos=5;
								      					if(obj.length==0){
								      						$("#items-div2").css({"margin-left":"15px","padding-top":"40px", "display":"block"});
								      						$("#items-div2").html("No se encontraron resultados. Busca otras etiquetas o pulsa TODOS para buscar por categorias.");
								      					} else {

									      					$("#items-div").html("");
									      					$("#items-div2").html("");
									      					$("#items-div2").css({"margin-left":"15px","padding-top":"15px"});
									      					mostrarItemsPagina(container_items,obj, active_page);
														    genPager(container_pager,container_items,obj);
														    
								      					}
								      					//genPager('pager-container-borradores','items-div-borradores',obj);
								      				    mostrarFlechasTodos();
								      				 	document.getElementById('preetiquetas').className = 'ocultar';
	 
								      				}
	
								      			}
								      		
								      		});
	
									      	} catch (e) {
									      		BootstrapDialog
									      				.alert('Se ha producido un error en la conexión con el servidor');
									      		// put any code you want to execute if there's an exception here
		
									      	}
	
										
									
								}
								</script>

						</div>
					</div>

				</div>
				<div id="menutodos" class="tab-pane fade">

					<div id="cuadroitemstodos" class="cuadroitems">
						<div id="cuadroitemstodoshead" class="cuadroitemshead">
							<div id="buscartodos-container" class="buscar-container">
								<input type="text" class="input-box"
									placeholder="BUSCAR MÁXIMO 2 ETIQUETAS" id="buscartodosinput"
									style="background-color: transparent; padding-left: 12px">
							</div>
							<div id="lupatodos-container" class="lupa-container"
								onclick="active_page=1;div_focus='items-div2';busqueda=true;tag=true;pager_container='pager-container-todos';input_id='buscartodosinput';showItemsByTagTodos('items-div2','pager-container-todos',document.getElementById('buscartodosinput').value);">
								<img width="20" height="20" src="img/buscar.png">
							</div>
							<div id="lupatodos-container" class="lupa-container"
								onclick="active_page=1;div_focus='items-div2';busqueda=true;tag=true;pager_container='pager-container-todos';input_id='buscartodosinput';showItemsByTagTodos('items-div2','pager-container-todos','')">
								<img width="20" height="20" src="img/refresh.png">
							</div>

						</div>
						<script>
										var mobiliario = [];
										var complementos =[];
										var extras =[];

										<% 
										String webRootPath = application.getRealPath("/credentials").replace('\\', '/');
										List<String> lista_mobiliario = lcc.getListMobiliario(webRootPath);
										for (String item_mobiliario: lista_mobiliario) {	
										%>
											mobiliario.push("<%=item_mobiliario%>");
										<% 	
										}
										
										List<String> lista_complementos = lcc.getListComplementos(webRootPath);
										for (String item_complemento: lista_complementos) {	
										%>
											complementos.push("<%=item_complemento%>");
										<% 	
										}
										
										List<String> lista_extras = lcc.getListExtras(webRootPath);
										for (String item_extra: lista_extras) {	
										%>
											extras.push("<%=item_extra%>");
										<% 	
										}
										%>		

										
										var primer_elemento_mobiliario=0;
										var primer_elemento_complementos=0;
										var primer_elemento_extras=0;
	                                
	                                </script>

						<div id="preetiquetas">
							<div id="texto-grupo" class="texto-grupo">
								<p>[MOBILIARIO]</p>
							</div>
							<div id="mobiliario" class="mobiliario-container">
								<div id="mobiliario-left-arrow-container"
									class="left-arrow-container  pointer">
									<img src="img/flechaizq.png" onclick="anteriorMobiliario();" />
								</div>
								<div id="mobiliario-container" class="mobiliario-icons">

									<div>
										<div class="icons-container">
											<% 
													int i=0;
													for (String item_mobiliario: lista_mobiliario) {	
														String etiqueta = item_mobiliario.replace(".png", "").replace(".jpg", "").replace(".jpeg", "");
														String class_hidden = i>=5? "ocultar" : "";
													%>
											<div id="icono-mobiliario<%=i%>"
												class="cuadro-icono <%=class_hidden%>">
												<img alt="<%=etiqueta%>"
													src="<%=Config.URL_base_mobiliario+item_mobiliario%>"
													onclick="active_page=1;div_focus='items-div2';busqueda=true;tag=true;pager_container='pager-container-todos';showItemsByTagTodos('items-div2','pager-container-todos','<%=etiqueta%>');document.getElementById('buscartodosinput').value='<%=etiqueta%>';" />
											</div>

											<% 	
														i = i+1;
													}
													%>
										</div>
									</div>

								</div>
								<div id="mobiliario-right-arrow-container"
									class="left-arrow-container  pointer">
									<img src="img/flechader.png" onclick="siguienteMobiliario();">
								</div>
							</div>
							<div class="texto-grupo">
								<p>[COMPLEMENTOS]</p>
							</div>
							<div id="complementos" class="complementos-container">
								<div id="complementos-left-arrow-container"
									class="left-arrow-container  pointer">
									<img src="img/flechaizq.png" onclick="anteriorComplementos();" />
								</div>
								<div id="complementos-container" class="mobiliario-icons">

									<div>
										<div class="icons-container">
											<%  
													int j=0;
													for (String item_complemento: lista_complementos) {	
														String etiqueta = item_complemento.replace(".png", "").replace(".jpg", "").replace(".jpeg", "");
														String class_hidden = j>=5? "ocultar" : "";
													%>
											<div id="icono-complementos<%=j%>"
												class="cuadro-icono <%=class_hidden%>">
												<img alt="<%=etiqueta%>"
													src="<%=Config.URL_base_complementos+item_complemento%>"
													onclick="active_page=1;div_focus='items-div2'; busqueda=true;tag=true;pager_container='pager-container-todos';showItemsByTagTodos('items-div2','pager-container-todos','<%=etiqueta%>');document.getElementById('buscartodosinput').value='<%=etiqueta%>';" />
											</div>
											<% 	
														j=j+1;
													}
													%>
										</div>
									</div>

								</div>
								<div id="complementos-right-arrow-container"
									class="left-arrow-container  pointer">
									<img src="img/flechader.png" onclick="siguienteComplementos();">
								</div>

							</div>
							<div class="texto-grupo">
								<p>[EXTRAS]</p>
							</div>
							<div class="extras-container">
								<div id="extras-left-arrow-container"
									class="left-arrow-container  pointer">
									<img src="img/flechaizq.png" onclick="anteriorExtras();" />
								</div>
								<div id="extras-container" class="mobiliario-icons">

									<div>
										<div class="icons-container">
											<% 
													int k=0;
													for (String item_extras: lista_extras) {	
														String etiqueta = item_extras.replace(".png", "").replace(".jpg", "").replace(".jpeg", "");
														String class_hidden = k>=5? "ocultar" : "";
													%>
											<div id="icono-extras<%=k%>"
												class="cuadro-icono <%=class_hidden%>">
												<img alt="<%=etiqueta%>"
													src="<%=Config.URL_base_extras+item_extras%>"
													onclick="active_page=1;div_focus='items-div2'; busqueda=true;tag=true;pager_container='pager-container-todos';showItemsByTagTodos('items-div2','pager-container-todos','<%=etiqueta%>');document.getElementById('buscartodosinput').value='<%=etiqueta%>';" />
											</div>
											<% 	
														k=k+1;
													}
													%>
										</div>
									</div>
									<script>
												$('#buscarinput').keypress(function (e) {
												  if (e.which == 13) {
													  active_page=1;div_focus='items-div'; busqueda=true;tag=false;pager_container='pager-container';input_id='buscarinput'; showItemsByTag('items-div','pager-container',document.getElementById('buscarinput').value);
												    return false;
												  }
												});
												$('#buscartodosinput').keypress(function (e) {
													  if (e.which == 13) {
														  active_page=1;div_focus='items-div2';busqueda=true;tag=true;pager_container='pager-container-todos';input_id='buscartodosinput';showItemsByTagTodos('items-div2','pager-container-todos',document.getElementById('buscartodosinput').value);
													    return false;
													  }
													});
												</script>
								</div>
								<div id="extras-right-arrow-container"
									class="left-arrow-container pointer">
									<img src="img/flechader.png" onclick="siguienteExtras();">
								</div>

							</div>

						</div>
						<div class="items-container">
							<div id="available_images2">
								<div class="resulset">
									<div id="items-div2" class=" bd" style="clear: both;"></div>
								</div>
							</div>

							<div id="pager-container-todos" class="pager-container"></div>
						</div>
					</div>
				</div>
				<div id="precio-container" class="precio-container">
					<div class="total_lista">TOTAL LISTA : &nbsp;</div>
					<div class="total_lista_precio" id="total_lista_precio">0</div>
					<div class="euro">&euro;</div>
				</div>

				<div id="nuevoguardar-container" class="nuevoguardar-container">

					<div id="nuevo-container" class="nuevo-container">

						<%
							try{
								estadoIni=Integer.parseInt(lc.Estado);
							}catch(Exception e){
								estadoIni=1;
							}
							if(estadoIni<4 || Integer.parseInt(nuevo_id_lista)>0) {
						%>
						<!-- Trigger the modal with a button -->
						<a class=" boton " data-toggle="modal" data-target="#modal-nuevo"
							onclick="cerramosONo=false;">NUEVO</a>
						<%
							} else {
						%>
						<!-- Trigger the modal with a button -->
						<a class=" boton ">NUEVO (NO DISPONIBLE)</a>
						<%
							}
						%>


					</div>

					<form id="formsave" name="formsave" method="post"
						action="ldlc.jsp?id_ldlc=<%=id_ldlc%>&id_decorador=<%=id_decorador%>&id_proyecto=<%=id_proyecto%>&listaEmpty=<%=nuevo_id_lista%>">
						<input type="hidden" id="saveldlc" name="saveldlc"
							value="saveldlc"> <input type="hidden" id="id_ldlc"
							name="id_ldlc" value="<%=id_ldlc%>"> <input type="hidden"
							id="id_proyecto" name="id_proyecto" value="<%=id_proyecto%>">
						<input type="hidden" id="save-estado" name="save-estado" value="">
						<input type="hidden" id="paso" name="paso" value=""> <input
							type="hidden" id="id_decorador" name="id_decorador"
							value="<%=id_decorador%>"> <input type="hidden"
							id="nombreImgLdlc" name="nombreImgLdlc" value="<%=lc.imagen%>">
						<input type="hidden" id="json" name="json" value="">
					</form>
					<div id="guardar-container" class="nuevo-container">
						<%
					int estado=1;
					
					try{
						estado=Integer.parseInt(lc.Estado);
					}catch(Exception e){
						estado=1;
					}
					if(estado==2 && nuevo_id_lista.equals("0")) {
						
					%>
						<a class=" boton cargarEligiendoBorradores"
							onclick="document.getElementById('save-estado').value='2';cerramosONo=false;saveImageServerCanvas(); ">GUARDAR</a>
						<%
					}else if(estado==3 && nuevo_id_lista.equals("0")) {
					%>
						<a class=" boton cargarEligiendoBorradores"
							onclick="document.getElementById('save-estado').value='3';cerramosONo=false;saveImageServerCanvas();">GUARDAR</a>
						<%
					}else if(estado==4 && nuevo_id_lista.equals("0")) {
					%>
						<a class=" boton cargarEligiendoBorradores"
							onclick="document.getElementById('save-estado').value='4';cerramosONo=false;saveImageServerCanvas();">GUARDAR</a>
						<%
					}else if(estado==5 && nuevo_id_lista.equals("0")) {
					%>
						<a class=" boton cargarEligiendoBorradores"
							onclick="document.getElementById('save-estado').value='5';cerramosONo=false;saveImageServerCanvas();">GUARDAR</a>
						<%
					} else {
					%>
						<a class=" boton " data-toggle="modal"
							data-target="#modal-guardar"
							onclick="cerramosONo=false;saveImageServerCanvas();">GUARDAR</a>
						<%
					}  
					%>

					</div>


					<div id="guardar-container" class="nuevo-container"
						<% if(estado==1){ %> style="width: 99%" <% } %>>
						<a class="boton" href="<%=new Config().proyectos%>"
							title="Volver al listado de proyectos">LISTA
							DE PROYECTOS</a>

					</div>
					<% if(estado==2  && nuevo_id_lista.equals("0") || estado==3  && nuevo_id_lista.equals("0")){ %>
					<div id="guardar-container" class="nuevo-container">
						<a class="boton" onclick="volver(3);"
							title="Volver al Paso 3">VOLVER AL PASO 3</a>

					</div>

					<% } else if(estado==4 && nuevo_id_lista.equals("0") || estado==5 && nuevo_id_lista.equals("0")){ 
						if(estadoProyecto>=80) {%>
						<div id="guardar-container" class="nuevo-container">
							<a class="boton" onclick="volver(4);"
								title="Volver al Paso 4">VOLVER AL PASO 4</a>
	
						</div>
					<% } else { %>
						<div id="guardar-container" class="nuevo-container">
							<a class="boton" onclick="volver(3);"
								title="Volver al Paso 3">VOLVER AL PASO 3</a>
	
						</div>
					<% } } else if(nuevo_id_lista.equals("0")) { %>
					<!-- <div id="guardar-container" class="nuevo-container">
						<a class="boton"  onclick="volver(3);cerramosONo=true" title="Volver al Paso 3" >VOLVER AL PASO 3</a>
						
						</div> -->
					<% } %>
				</div>
				<div id="borradores-container" class="nuevo-container"></div>
				<div id="publicados-container" class="nuevo-container"></div>
			</div>



			<script>
					document.getElementById("cuadroitems").setAttribute("style","height:"+Math.round((70*window_height)/100)+"px");
					document.getElementById("cuadroitemstodos").setAttribute("style","height:"+Math.round((70*window_height)/100)+"px");
					
					function inicializar(){
						/* active_page=1;
						max_iconos=5;
						mostrarItemsPagina('items-div',obj, active_page);
					    genPager('pager-container','items-div',obj);
					    //genPager('pager-container-borradores','items-div-borradores',obj);
					    mostrarFlechasTodos(); */
						repaintItems();
					}
					
					$(document).ready(function(){
					    $(".nav-tabs a").click(function(){
					        $(this).tab('show');
					    });
					    
					    $('.nav-tabs a[href="#menumiselementos"]').click(function(){
	      					$("#items-div").css({"padding-left":"15px","padding-top":"15px"});
	      					$("#items-div").html(""); 
	      					showItemsByTag('items-div','pager-container','');
					        cargarMisElementos(); 
	      					
					        div_focus='items-div';
					    	busqueda=false;
					    	busqueda2=false;
					    	tag=false;
					    	document.getElementById('buscarinput').value='';
					    	document.getElementById('buscartodosinput').value='';
					    });
					    
					    $('.nav-tabs a[href="#menutodos"]').click(function(){
					    	document.getElementById('preetiquetas').className = '';
					    	document.getElementsByClassName("clipper_image").remove();
					    	document.getElementsByClassName("ul_pager").remove();
					    	div_focus='items-div2';
					    	document.getElementById('buscarinput').value='';
					    	document.getElementById('buscartodosinput').value='';
					    	$("#items-div2").html("")
					    });
					    
					    //oculto modals
					    hideAllModals();
					    
					    loadJSON(json_canvas);
					    
			    		var error = false;
					    if (json_original.objects!==undefined){ 
					    	var imgSrcArray = json_original.objects.map(function(objects){ return objects['price'] });
					    	var idArray = json_original.objects.map(function(objects){ return objects['id'] });
					    	 
					    	for(var i=0; i < imgSrcArray.length; i++){
					    		if (imgSrcArray[i]!=null && imgSrcArray[i] >0){//si tenemos ese dato, sino error
							    	   var price = imgSrcArray[i];
					    			   total_lista = total_lista + parseFloat(price);
							    	   //console.log("price: ", price);  
							    	   //console.log("total_lista: ", total_lista); 
					    		}else{
					    			error=true;
					    		}
					    		
					    		document.getElementById("total_lista_precio").innerHTML = total_lista.toFixed(2);
					    	}
					    }
					    
			    		if (error){
			    			console.log("No se ha podido calcular el precio total. Alguno de los items no tiene precio definido");
			    		}
				

					    
					});
		        	
			    	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			    		  var target = $(e.target).attr("href") // activated tab
			    	});
			    	
				
			    	//Borrador de fondos		
			    	
			    /* 	var input_canvas = new fabric.Canvas('input_canvas');
			    	var output_canvas = new fabric.StaticCanvas('output_canvas');
			    	//var input_canvas = this.__canvas = new fabric.StaticCanvas('input_canvas');
			    	
		        	
					var width = input_canvas.getWidth();
					var height = input_canvas.getHeight();
		        	
					var canvas_data = input_canvas.getContext('2d').getImageData(0, 0, height, width);
					var mask_data = input_canvas.getContext('2d').getImageData(0, 0, height, width);
					
					var jsfeat_gui = new dat.GUI({ autoPlace: false });
					var pf_opt, slic_opt;

					
		            slic_opt = function () {
					    this.regionSize = 30;
					    this.minSize = 20;
				    };
					state.options.slic = new slic_opt();
				    
				    input_canvas.renderAll();
				    
				    var slic_gui = jsfeat_gui.addFolder('Superpixel Segmentation');

				    
					var ctx = input_canvas.getContext('2d');
					
				    slic_gui.add(state.options.slic, "regionSize", 20, 400);
				    slic_gui.add(state.options.slic, "minSize", 2, 100);
				    jqwindow = $(window);
			        delta_left = $('#output_canvas').offset().left - $('#input_canvas').offset().left + jqwindow.scrollLeft();
			        delta_top = $('#output_canvas').offset().top - $('#input_canvas').offset().top + jqwindow.scrollTop();
 */
			       

				</script>
		</div>
		<div class="listaItems">
			<div
				class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8  col-lg-offset-2"
				style="margin-bottom: 5%"></div>
		</div>
		<canvas id="canvas111" class="lower-canvas" width=1500 height=1500
			style="width: 100%; height: auto; display: block; display: none; margin-top: 50px; margin-left: 90px; border: 1px solid black;"></canvas>
		<!-- PARA QUE FUNCIONE MODAL LOGIN	 -->
		<script type="text/javascript" src="js/links.js?versionCssJs=17"></script>
		<script type="text/javascript" src="js/login.js?versionCssJs=17"></script>
	</div>
	<script>  

		var window_height = $(window).height(); 
		var div_alto = Math.round((90*window_height)/100);
		window_width = $(window).width();

	    if(window_width>1050){	 
		$('.listaItems').css("width", window_width-47);
		$(".listaItems").css("margin-top", div_alto);
		$(".leftbuttons").css("height", div_alto);
		$(".canvas-container").css("width", canvas_width);   
		
		
	    } else {
	    	var canvas_width = 582;  
	    	$('#canvas-div').css("width", canvas_width);
			$('.listaItems').css("width", 1004);
			$(".listaItems").css("margin-top", div_alto);
			$(".leftbuttons").css("height", div_alto);
			$(".canvas-container").css("width", canvas_width);
	    }
	    cargar=0;
</script>
	<!-- APLICACION DESDE MOVIL MODAL-->
	<div class="modal fade" id="movil-modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static" data-keyboard="false"
		style="display: none; background-image: url('img/fondo-popup.jpg');">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" align="center">
					<a
						style="position: absolute; right: 10px; top: 5px; color: black; cursor: pointer; font-size: 18px"
						data-dismiss="modal">x</a> <br />
					<h4 class="letra-xxl letra-mayusculas">¡HEY!</h4>
					<div
						style="width: 100%; text-align: center; padding-top: 3px; padding-bottom: 15px; padding-left: 1.5vw; padding-right: 1.5vw;">

					</div>
				</div>

				<!-- Begin # DIV Form -->
				<div id="div-forms">
					<p
						style="margin: 40px; margin-top: 15px; margin-bottom: 20px; text-align: center; letter-spacing: 3px">
						Parece que quieres hacer una composición 2D.<br /> Para ello te
						recomendamos utilizar tu ordenador <br /> Será mucho más
						sencillo y cómodo <br />
						<br /> ¡Es necesario instalar la extensión para su utilización! <br />
						<br />
						<br />
						<br />

					</p>
				</div>
				<!-- End # DIV Form -->

			</div>
		</div>
	</div>
	<!-- INSTALAR APLICACION MODAL-->
	<div class="modal fade" id="intall-modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static" data-keyboard="false"
		style="display: none; background-image: url('img/fondo-popup.jpg');">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" align="center">
					<a
						style="position: absolute; right: 10px; top: 5px; color: black; cursor: pointer; font-size: 18px"
						data-dismiss="modal">x</a> <br />
					<h4 class="letra-xxl letra-mayusculas">¡HEY!</h4>
					<div
						style="width: 100%; text-align: center; padding-top: 3px; padding-bottom: 15px; padding-left: 1.5vw; padding-right: 1.5vw;">

					</div>
				</div>

				<!-- Begin # DIV Form -->
				<div id="div-forms">
					<p
						style="margin: 40px; margin-top: 15px; margin-bottom: 20px; text-align: center; letter-spacing: 3px">
						Para que la aplicación funcione,<br /> tendrás que
						descargarte la extensión de <b>Deco The Co.</b> <br />
						<br /> Pulsa <a
							href="https://chrome.google.com/webstore/detail/decotheco/ilpaccaeklnjpiocfiohejfbpclgmmbn?hl=es"
							target="_blank" style="color: black"><b>aquí</b></a> y añade la
						extensión a tu navegador <br />
						<br />
						<br />
						<br />

					</p>
				</div>
				<!-- End # DIV Form -->

			</div>
		</div>
	</div>
	<!-- MODAL LOGIN -->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static" data-keyboard="false" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" align="center">
					<a
						style="position: absolute; right: 3px; top: 0px; color: black; cursor: pointer;"
						data-dismiss="modal"> <i class="fa fa-times"
						aria-hidden="true"></i></a>

					<h4 class="letra-xxl letra-mayusculas">Accede!</h4>
					<div
						style="width: 100%; text-align: center; padding-top: 3px; padding-bottom: 15px; padding-left: 1.5vw; padding-right: 1.5vw;">
						<div
							style="width: 90%; text-align: center; border-bottom-style: solid; border-bottom-width: thin;"></div>
					</div>
				</div>

				<!-- Begin # DIV Form -->
				<div id="div-forms">

					<!-- Begin # Login Form -->
					<form id="login-form">
						<div class="modal-body">
							<div id="div-login-msg">
								<div id="icon-login-msg"
									class="glyphicon glyphicon-chevron-right"></div>
								<span id="text-login-msg"></span>
							</div>
							<input id="login_username" class="form-control" type="text"
								placeholder="EMAIL*" required
								style="background-color: white; width: 93%"> <input
								id="login_password" class="form-control" type="password"
								placeholder="CONTRASE&Ntilde;A*" required
								style="background-color: white; width: 93%"> <br />
							<div class="checkbox">
								<label class="mantenersesioniniciada"> <input
									type="checkbox" id="check_login_recuerdame" checked>Mantener
									sesion iniciada
								</label>
							</div>
						</div>
						<br />
						<div class="modal-footer" style="padding: 0; padding-bottom: 15px">
							<div>
								<button type="button" onclick="loguear('ldlc')"
									class="buttonstandard_invertido ">ENTRAR</button>
							</div>
							<div style="margin-top: 3%">
								<button id="login_lost_btn" onclick="Registrar()" type="button"
									class="btn btn-link letra-mayusculas" style="color: black">&iquest;Olvidaste
									tu contrase&ntilde;a?</button>
								<button id="login_register_btn" onclick="Registrar()"
									type="button" class="btn btn-link letra-mayusculas"
									style="color: black">Registrar</button>
							</div>
							<div class="errorAt"
								style="text-align: left; margin: 7%; margin-right: 0; color: red"></div>
						</div>
					</form>
					<!-- End # Login Form -->





				</div>
				<!-- End # DIV Form -->

			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade modal-pop-up" id="modal-nuevo" role="dialog">
		<div class="modal-dialog ">
			<form id="createldlc" action="/ldlc.jsp?createldlc=createldlc"></form>

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body" style="width: 92%; padding: 0"
					style="z-index:100">
					<a id="btncreateldlc" class="boton"
						href="ldlc.jsp?createldlc=createldlc&id_decorador=<%=id_decorador%>&id_proyecto=<%=id_proyecto%>"
						onclick="cerramosONo=false;" style="border: 1px solid black">NUEVO</a>
					<a class="boton" data-toggle="modal"
						onclick="borradores();cerramosONo=false;"
						data-target="#modal-borradores">BORRADORES</a> <a class="boton"
						data-toggle="modal" onclick="borradores();cerramosONo=false;"
						data-target="#modal-publicados">PUBLICADOS</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal lista de la compra -->
	<div class="modal fade modal-pop-up" id="modal-lista" role="dialog">
		<div class="modal-dialog ">

			<!-- Modal content-->
			<div class="modal-content ">
				<div class="modal-body listaCompra"
					style="width: 92%; "></div>
			</div>
		</div>
	</div>
	<!-- Modal -->
	<div class="modal fade modal-pop-up-subir" id="modal-subir"
		role="dialog">
		<div class="modal-dialog ">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body modal-body-subir"
					style="width: 92%; padding: 0">

					<div class="subir-pop-container">

						SUBE AQU&Iacute; NUEVOS PRODUCTOS

						<form id="senditem" enctype="multipart/form-data"
							action="CreateItem" method="post" target="upload_target">

							<div id="file-container" class="file-container"
								onclick="openLoadFileClick('itemimagefile')">
								<img id="imgSubir" src="img/subirgrande.png"> <input
									type="file" id="itemimagefile" name="itemimagefile"
									style="display: none;" />
							</div>
							<input type="text" id="nombre_archivo"
								style="margin-bottom: 3%; margin-top: -1%; border: 0" readonly>
							<input type="text" class="input-box" placeholder="NOMBRE"
								id="itemtitulo" name="itemtitulo"> <input type="text"
								class="input-box" placeholder="ETIQUETAS" id="itemetiquetas"
								name="itemetiquetas"> <input type="number" step="0.01"
								class="input-box" placeholder="PRECIO" id="itemprecio"
								name="itemprecio"> <input type="text" class="input-box"
								placeholder="URL DEL PRODUCTO" id="itemurl" name="itemurl">
							<input type="hidden" id="item_tipo" name="item_tipo"
								value="-2">
							<input type="hidden" id="item_decorador_id" name="decorador_id"
								value="<%=id_decorador%>"> <input type="hidden"
								id="item_id_proyecto" name="id_proyecto"
								value="<%=id_proyecto%>"> <input type="hidden"
								id="item_id_ldlc" name="id_ldlc" value="<%=id_ldlc%>"> <a
								type="button" class="boton"
								onclick="validateFormSendItem('<%=id_decorador%>');var cerramosONo=false;"
								style="margin-top: 5%;">SUBIR</a>
							<div id="errors_container">
								<div id="revise-datos">Por favor revise los datos.</div>
							</div>
						</form>
						<iframe id="upload_target" name="upload_target"
							src="loadItems.html"
							style="width: 0; height: 0; border: 0px solid #fff;" onload="">
						</iframe>
					</div>
				</div>

			</div>

		</div>
	</div>
	<!-- Modal -->
	<div class="modal fade" id="modal-publicados" role="dialog">
		<div class="modal-dialog ">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body modal-body-borradores">
					<div id="items-container-publicados"
						class="items-container-borradores">
						<div id="available_images-publicados"
							class="available_images-borradores">
							<div class="resultset">
								<div id="items-div-publicados" class="bd">
								  <% 
								for (ListaCompra b : listaPublicados) {
									if(b.imagen.equals("")) {} else { 
								%>
									<div id="ldlc-imagep<%=b.ListaCompra_id%>" class="">
										<div id="ldlc-image<%=b.ListaCompra_id%>" class="">
										<div class="image_wrapper">
											<div class="image_background borde" style="height:120px;width:120px;margin:15px;float:left;overflow:hidden">
												<a href="ldlc.jsp?id_ldlc=<%=b.ListaCompra_id%>&id_decorador=<%=id_decorador%>&id_proyecto=<%=id_proyecto%>&lg=1" class="cargarBorradores">
													<img src="<%=new Config().decoradores_url+"ldlc/imagenes/"+b.imagen %>" class="lower-canvas  " width=120px height=120px style="width: 120px; height: auto; ">  
												</a>
											</div>
										</div>
									</div>
									</div>


									<% 	
								}}
								%> 
								</div>


							</div>
						</div>

					</div>
					<div id="pager-container-publicados"
						class="pager-container-borradores"></div>
				</div>

			</div>
		</div>

	</div>
	<!-- Modal -->
	<div class="modal fade" id="modal-borradores" role="dialog">
		<div class="modal-dialog ">
			<form id="cargarldlc" action="/ldlc.jsp?id_ldlc=id_ldlc">
				<input type="hidden" id="id_ldlc_cargar_ldlc_form" name="id_ldlc"
					value=""> <input type="hidden"
					id="id_proyecto_cargar_ldlc_form" name="id_proyecto"
					value="<%=id_proyecto%>"> <input type="hidden"
					id="id_decorador_cargar_ldlc_form" name="id_decorador"
					value="<%=id_decorador%>">
			</form>
			<%--  <script>
		console.log("elementos listaBorradores"+<%=listaBorradores.size()%>);
	</script> --%>
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body modal-body-borradores">
					<div id="items-container-borradores"
						class="items-container-borradores">
						<div id="available_images-borradores"
							class="available_images-borradores">
							<div class="resultset">
								<div id="items-div-borradores" class="bd">
									<% 
								for (ListaCompra b : listaBorradores) {

									if(b.imagen.equals("")) {} else { 
								%>
									<div id="ldlc-image<%=b.ListaCompra_id%>" class="">
										<div class="image_wrapper">
											<div class="image_background  borde" style="height:120px;width:120px;margin:15px;float:left;overflow:hidden">
												<a href="ldlc.jsp?id_ldlc=<%=b.ListaCompra_id%>&id_decorador=<%=id_decorador%>&id_proyecto=<%=id_proyecto%>&lg=1" class="cargarBorradores">
													<img src="<%=new Config().decoradores_url+"ldlc/imagenes/"+b.imagen%>" class="lower-canvas " width=120px height=120px style="width: 120px; height: auto">  
												</a>
											</div>
										</div>
									</div>


									<% 	
								} }
								%>
								</div>


							</div>
						</div>

					</div>
					<div id="pager-container-borradores"
						class="pager-container-borradores"></div>
				</div>

			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade modal-pop-up" id="modal-guardar" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body" style="width: 92%; padding: 0">

					<% if(id_proyecto.equals("-3")){ %>
					<button type="button" class="boton cargarBorradores"
						onclick="document.getElementById('save-estado').value='1'; verify(); ">Guardar
						como Borrador</button>
					<% }
							//si es un borrador muestro las opciones de asociar a paso 3;
				estado=1;
				
				try{
					estado=Integer.parseInt(lc.Estado);
				}catch(Exception e){
					estado=1;
				} 
				if(Integer.parseInt(id_proyecto)==-3) { 
				}
				else {
					if(Integer.parseInt(nuevo_id_lista)>0) {
						%>
					<button type="button" class="boton cargarEligiendoPropuesta"
						onclick="document.getElementById('save-estado').value='2'; verify();cerramosONo=false;$('.modal').modal('hide');">Asociar
						a Paso 3 (Propuesta 1)</button>
					<button type="button" class="boton cargarEligiendoPropuesta"
						onclick="document.getElementById('save-estado').value='3'; verify();cerramosONo=false;$('.modal').modal('hide');">Asociar
						a Paso 3 (Propuesta 2)</button>
					<%
					} else if(estado==1 && id_proyecto!="-3" || estado==2 && id_proyecto!="-3" || estado==3 && id_proyecto!="-3"){
								 
							%>

					<button type="button" class="boton cargarEligiendoPropuesta"
						onclick="document.getElementById('save-estado').value='2';verify();cerramosONo=false;$('.modal').modal('hide'); ">Asociar
						a Paso 3 (Propuesta 1)</button>
					<button type="button" class="boton cargarEligiendoPropuesta"
						onclick="document.getElementById('save-estado').value='3';verify();cerramosONo=false;$('.modal').modal('hide'); ">Asociar
						a Paso 3 (Propuesta 2)</button>

					<% 
							}
							else{

							//si es un borrador muestro las opciones de asociar a paso 3;
				if(estado==4 && id_proyecto!="-3"){
								 
							%>
					<button type="button" class="boton cargarEligiendoBorradores"
						onclick="document.getElementById('save-estado').value='4';  ">Asociar
						a Paso 4</button>

					<% 
							}
							else {
				if(estado==5 && id_proyecto!="-3"){ 
							%>

					<button type="button" class="boton cargarEligiendoBorradores"
						onclick="document.getElementById('save-estado').value='5';  ">Asociar
						a Paso 4</button>


					<% 
				} 
							}

							}
				}
							
								
				%>

				</div>

			</div>

		</div>
	</div>
	<!-- Modal info item-->
	<div class="modal fade modal-pop-up" id="modal-info-item" role="dialog">
		<div class="modal-dialog ">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body" style="width: 93%; padding: 0">
					<div id='show-item-image'>
						 <img class="money2" style="display:none" src="img/euro.svg" title="Item afiliado, obtén ganancias si compran este artículo"> 
						<div id='show-item-image' class="show-item-image">
							<img id="show-item-imageid" src="" alt="Art&iacute;culo"
								style="border: 1px solid black">
						</div>
					</div>
					<div id="show-item-atts" class="show-item-atts">
						<div id='show-item-titulo' class='div_underline'></div>
						<div id='show-item-etiquetas' class='div_underline'></div>
						<div id='show-item-precio' class='div_underline'></div>
						<input type="hidden" name="url" id="show-item-url" />
						<button id="show-item-add-button" type="button" class="boton2"
							data-dismiss="modal">A&Ntilde;ADIR</button>

					</div>

				</div>

			</div>

		</div>
	</div>
	<div class="modal fade" id="cargando" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		style="display: none; background-color: transparent; border: 0px solid #999; -webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0; -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0); -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0); box-shadow: 0 0 0 rgba(0, 0, 0, 0); -webkit-background-clip: padding-box;">
		<div style="max-width: 95%; width: 100%;" class="modal-dialog">
			<div id="loading" class="col-xs-12"
				style="height: 300px; max-height: 100%; background: url(img/default.svg) center center no-repeat;">
			</div>
		</div>
	</div>
	<div class="modal fade modal-hacer" id="modal-hacer" role="dialog">
		<div class="modal-dialog ">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-body" style="width: 92%; padding: 0">
					<% 	   if(estado==2 && nuevo_id_lista.equals("0") || estado==3 && nuevo_id_lista.equals("0")){ %>
					<a class="boton cargarBorradores"
						onclick="document.getElementById('paso').value='3';cerramosONo=false; verify();"
						title="Volver al Paso 3">VOLVER AL PASO 3</a> <a
						class="boton cargarBorradores"
						onclick="verify();cerramosONo=false;">SEGUIR AQUÍ</a>
					<% } else if(estado==4 && nuevo_id_lista.equals("0") || estado==5 && nuevo_id_lista.equals("0")){ 
							if(estadoProyecto>=80) {%>
							<a class="boton cargarBorradores"
								onclick="document.getElementById('paso').value='4';cerramosONo=false; verify();"
								title="Volver al Paso 4">VOLVER AL PASO 4</a> <a
								class="boton cargarBorradores"
								onclick="verify();cerramosONo=false;">SEGUIR AQUÍ</a>
							<% } else {%>
							<a class="boton cargarBorradores"
								onclick="document.getElementById('paso').value='3';cerramosONo=false; verify();"
								title="Volver al Paso 3">VOLVER AL PASO 3</a> <a
								class="boton cargarBorradores"
								onclick="verify();cerramosONo=false;">SEGUIR AQUÍ</a>
					<% } } else {%>
					<a class="boton cargarBorradores"
						onclick="verify();cerramosONo=false;">SEGUIR AQUÍ</a>
					<% } %>
				</div>
			</div>
		</div>
	</div>
	<script>
	var window_width = $(window).width();
	if(window_width<900) {
		$('#movil-modal').modal('show');
	} else {
		if(es_chrome && hasExtension==false){
			$('#intall-modal').modal('show');
		} else { $('#cargando').modal('show'); }
	} 
	var habitacion="";
	var nombreLdlc=""; 
	<%if (lc.Canvas!="{}"){%>
	function cargarEtiquetas() {
		var id_ldlc=document.getElementById('item_id_ldlc').value;
		 try {  
		  		$.ajax({
		  			// /type:"POST",
		  			dataType : "json",
		  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
		  			url : urlbaseForAjax + '/DecoradoresController',
		  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

		  			data : {
		  				token : "mail",
		  				action : "get_ldlc_etiquetas",
		  				id : id_ldlc
		  			},
		  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
		  			contentType : "application/json; charset=utf-8",
		  			success : function(data) {
		  				// BootstrapDialog.alert("DATA: "+data);
		  				// $usuarioGlobal=data;
		  				//BootstrapDialog.alert('aaaaa'+data);
		  				if (isError(data)) {
		  					$(document.body).css({'cursor' : 'default'});
		  				} else {
		  					for(var i=0;i<data.etiquetas.length;i++){
		  						 if(data.etiquetas[i].id==1){
		  							 document.getElementById('cb1').checked=true;
		  						 } else if(data.etiquetas[i].id==2){
		  							 document.getElementById('cb2').checked=true;
		  						 } else if(data.etiquetas[i].id==3){
		  							 document.getElementById('cb3').checked=true;
		  						 } else if(data.etiquetas[i].id==4){
		  							 document.getElementById('cb4').checked=true;
		  						 } else if(data.etiquetas[i].id==5){
		  							 document.getElementById('cb5').checked=true;
		  						 } else if(data.etiquetas[i].id==6){
		  							 document.getElementById('cb6').checked=true;
		  						 } else if(data.etiquetas[i].id==7){
		  							 document.getElementById('cb7').checked=true;
		  						 } else if(data.etiquetas[i].id==8){
		  							 document.getElementById('cb8').checked=true;
		  						 } else if(data.etiquetas[i].id==9){
		  							 document.getElementById('cb9').checked=true;
		  						 }
		  					 }
		  				}

		  			}
		  		});

		  	} catch (e) {
		  		console.log(e);
		  		// put any code you want to execute if there's an exception here
		  		$(document.body).css({'cursor' : 'default'});
		  	} 
	}
	<%if(nuevo_id_lista.equals("0")){ %>
	<%if(lc.Habitacion!="null" || lc.Habitacion.length()>1){%>
			 habitacion = "<%= lc.Habitacion %>";
			<%}
	 if(lc.nombreLdlc!="null" || lc.nombreLdlc.length()>1){%>
			var nombreLdlc = "<%= lc.nombreLdlc %>";
			<%}%>  
	cargarEtiquetas();
			
	<%} }%>  
	if(nuevo_id_lista=="0"){
		if(habitacion=="null") {
		} else {
			if(habitacion!="") {
				$('.img_border').css("outline","rgb(0, 0, 0) solid 0");
				$("#"+habitacion+" img").css("outline", "rgb(0, 0, 0) solid 1px");
			}
		}
		if(nombreLdlc=="null") {
		}else { 
			$('.letra-xxxs').val(nombreLdlc); 
		}
	}
	function subir() { 

		$('#ListaEtiquetas').animate({marginTop:"-=122px"},100); 
		$('.letra-xxxs').css('padding-bottom', "5px");
		$('.letra-xxxs').css('padding-top', "5px");
		$('#subirEti').css("display","none"); 
		if(window_width<=1130){
			$('#nombreProyecto').animate({top:"0"},100); 
			}else {
			$('#nombreProyecto').animate({top:"0"},100); 
			}

		$('#nombreProyecto').fadeTo("fast",0.3);
		$('#bajarEti img').fadeTo(100,0.3);

		$('#ListaEtiquetas').animate({marginTop:"-122px"},100); 
	}
	function bajar() {  
		$( ".letra-xxxs" ).removeClass( "transpar" );
		$("#completo").css("height","175px");
		$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$("#ListaEtiquetas").css("opacity", "1");
		$('#ListaEtiquetas').css("display","inline"); 
		$('#ListaEtiquetas').animate({marginTop:"0"},100); 
		$('.letra-xxxs').css('padding-bottom', "7px");
		$('.letra-xxxs').css('padding-top', "7px");
		$('#bajarEti img').fadeTo(0,0);
		$('#subirEti').css("display","inline");
		$('#subirEti img').css("display","inline");
		$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'!important");
		$("#ListaEtiquetas").css("filter", "alpha(opacity=100)");
		$('#bajarEti').css("filter", "alpha(opacity=100)");
		$('#subirEti').css("filter", "alpha(opacity=100)");
		$('#nombreProyecto').css("filter", "alpha(opacity=100)!important");
		$("#ListaEtiquetas").css("opacity", "1");
		$('#bajarEti').css("opacity", "1");
		$('#subirEti').css("opacity", "1");
		$('#nombreProyecto').css("opacity", "1!important");
		if(window_width<=1130){
		$('#nombreProyecto').animate({top:"118px"},100); 
		}else {
		$('#nombreProyecto').animate({top:"122px"},100); 
		}
	}
	$("#ListaEtiquetas,#bajarEti img,#subirEti img,#bajarEti,.letra-xxxs").mouseover(function() {
		$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
		$("#ListaEtiquetas").css("filter", "alpha(opacity=100)");
		$('#bajarEti').css("filter", "alpha(opacity=100)");
		$('#subirEti').css("filter", "alpha(opacity=100)");
		$('#nombreProyecto').css("filter", "alpha(opacity=100)");
		$("#ListaEtiquetas").css("opacity", "1");
		$('#bajarEti').css("opacity", "1");
		$('#subirEti').css("opacity", "1");
		$('#nombreProyecto').css("opacity", "1");
	});
	$("#ListaEtiquetas,#bajarEti img,#subirEti img,#bajarEti,.letra-xxxs").mouseleave(function() {

		if($('#ListaEtiquetas').css('display')=="none") {

			$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
			$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
			$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
			$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
			$("#ListaEtiquetas").css("filter", "alpha(opacity=30)");
			$('#bajarEti').css("filter", "alpha(opacity=30)");
			$('#subirEti').css("filter", "alpha(opacity=30)");
			$('#nombreProyecto').css("filter", "alpha(opacity=30)");
			$("#ListaEtiquetas").css("opacity", "0.3");
			$('#bajarEti').css("opacity", "0.3");
			$('#subirEti').css("opacity", "0.3");
			$('#nombreProyecto').css("opacity", "0.3");
		}
	}); 
	
	var a=0;
	$(".img_border").mouseover(function() { 
		if($(this).css('outline')=="rgb(0, 0, 0) solid 1px") {
			a=1;
		}
		$(this).css('outline', "rgb(0, 0, 0) solid 1px");
	});
	$(".img_border").mouseleave(function() {
		if(a==0) {
			$(this).css('outline', "rgb(0, 0, 0) solid 0");
		} else {
			a=0;
		}
	}); 
	</script>
	<script>
	canvas111 = new fabric.StaticCanvas('canvas111');  
	canvas.backgroundColor="white";
	canvas.renderAll();
	</script>
</body>
</html>