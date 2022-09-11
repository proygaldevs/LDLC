 
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
var idDecorador=0;
var listaAfiliados="";
function getDecoradorById(id_ID) {

	
	//alert(urlbase + '/GetPortfolio');
	 try {

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
	  				detail_level: 2
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
	  					var html="";
	  					var nombre=data.nombre;
	  					nombre = nombre.replace(/\s/g,"_");
	  					html += '<div class="center-block" style="width:150px;height:150px;border-radius:50%;overflow:hidden;margin-bottom: 20px;"><img style="text-align:center;width:auto;height:100%" src="'+urlbuckets3 + 'decoradores/'+data.identificadorUnico+'/perfiles/cara/'+data.filesCara[0]+'" alt="'+data.nombre+'"></div>';
	  					html += '<a href="decorador-online.html?decorador='+nombre+'&id='+id_ID+'" style="color:black;text-transform:uppercase">'+data.nombre+'</a>';
	  					$('.decoradorEnlace').html(html);
	  				}
	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  	}

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
var lista="";
var arrayItems="";
function insertaselementos(){ 
	var idLdlc = getParameterByName("idLdlc"); 
	$(document.body).css({ 'cursor': 'wait' });
	try { 
  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "getLdlc",
  				id_ldlc : idLdlc
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data; 
  				if (isError(data)) {
  					$(document.body).css({ 'cursor': 'default' });
  					BootstrapDialog.alert(data, function(){ 
  						cerrarCargando();
  			        }); 
  				} else {  
  					listaAfiliados=data.listAfiliados; 
  					var arrayDeObjcts=JSON.parse(data.Canvas);
  					arrayItems=arrayDeObjcts.objects;
  					lista=data;
  					ldlc();
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
function compartirFacebookPage(id){ 
	var res = id; 
	
	var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+lista.imagen;
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : lista.nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitterPage(id){ 
	var res = id;
	
	var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+lista.imagen;
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ lista.nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterestPage(id) { 
	var res = id;
	
	var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res;
	var imgofu = urlbuckets3+'ldlc/imagenes/'+lista.imagen;
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : lista.nombreLdlc
	});
}
var habitacion="";
function ldlc(){

	var idLdlc = getParameterByName("idLdlc"); 
	
	var html = ''; 
	html += '<div class="opacar3" style="width: 100%; text-align: center;">'; 
	j=1;
	html += '<div style="list-style:none;padding-left:15px;padding-right:15px" class="filtros">';
		html += '<div style="position:relative" class="opacar ';
			for (var f = 0; f < lista.etiquetas.length; f++) {
	
				if(f<=2){
				html += lista.etiquetas[f].id+" ";
				}
			} 
				html += lista.Habitacion; 
		html += '"><img class="center-block" style="margin-top:75px;width:100%;max-width:1000px" src="'+urlbuckets3+'ldlc/imagenes/'+lista.imagen+'" alt="Composición 2D">';
		html += '<div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-4" style="margin-top:0px;padding:20px">';
		html += '<div class="col-xs-12" style="margin-left:5px;margin-top:-10px;margin-bottom: 12px;"> ¡comparte!</div><div class="col-xs-12 letra-m" style="margin-bottom:50px;margin-top:-15px">';

		html += '<a  onclick="compartirFacebookPage('+idLdlc+');" style="cursor: pointer;"'; 
		 html += 'target="_blank"> <i class="fa  facebook-icon fa-facebook"> </i>'; 
		 html += '</a> '; 
		 html += '<a onclick="compartirTwitterPage('+idLdlc+');" style="cursor: pointer;" target="_blank">'; 
		 html += '	 <i class="fa fa-twitter facebook-icon"> </i>'; 
		 html += '</a> '; 
		 html += '<a onclick="compartirPinterestPage('+idLdlc+');" style="cursor: pointer;" target="_blank">'; 
		 html += ' <i class="fa fa-pinterest facebook-icon"> </i>'; 
		 html += '</a> ';  
		 html += '</div> ';
		 html += '</div> ';
 
		 

		if(lista.nombreLdlc=="null"){} else {
		html += '<div class="nldlc col-xs-12 letra-m" style="margin-top:10px">'+lista.nombreLdlc+'</div>';
		}

		if(lista.Habitacion==undefined){} else {
		html += '<div class="center-block"><img src="img/'+lista.Habitacion+'-sin-b.png" alt="Tipo de habitación" style="width:100px;"/></div>';
		}
		habitacion=lista.Habitacion;
		if(habitacion=="questionmark"){
			habitacion="otros";
		} else if(habitacion=="dormitorio-infantil") {
			habitacion="dormitorio infantil";
		} else {
			habitacion="";
		}
		html += '<div class="letra-xs" style="margin-top:-10px;width:100%;text-transform:uppercase">'+habitacion+'</div><br> ';
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
		html += '<div class="col-xs-12 precio1 letra-xs" style="margin-top:10px">';
		html += '</div>';
		html += '<br><br><br>';	
		html += '</div>'; 
		idDecorador=lista.Decorador_id;
		if(lista.galeria_ldlc=="2"){
			html += '<div class="decoradorEnlace"></div>';
			getDecoradorById(lista.Decorador_id);
		} else if(lista.galeria_ldlc=="3"){
			html += '<div class="decoradorEnlace"></div>';
			getDecoradorById(lista.Decorador_id); 
			html += '<div class="center-block" style="width:184px;height:150px;margin-top:35px;overflow:hidden;margin-bottom: 20px;"> ';
			html += '<a href="proyecto-decoracion-online-2d.html?id='+lista.Proyecto_id+'" style="color:black;text-transform:uppercase">Ver proyecto</a>';
			html += '</div>';  
		}
		
		html += '</div>';  
		html += '<br><br><br><br>';		
			 

		html += '<div class="col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">';
		arrayItems=arrayItems.reduce(function(result, current) {
	        result[current.id] = result[current.id] || [];
	        result[current.id].push(current);
	        return result;
	    }, {});
		 
		listaDeItems="";
		$.each(arrayItems, function(i, item) {
			if(item[0].price==undefined){}else{
			style=""; 
			k++;

			urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
				var img = new Image(); 
				img.src = item[0].src; 
				if(img.width>img.height){
					style="height:100%;width:auto;";
				} else { 
					style="width:100%;height:auto;";
				} 
				if(item[0].imagenOriginal!=undefined) {imgSRC=item[0].imagenOriginal} else {imgSRC=item[0].src}
				if(item[0].price>0 ){
					html+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros2"><div class="imagenItems"><img style="'+style+'" src="'+imgSRC+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;letter-spacing: 2pt!important ">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+urlProducto+'">VER +</a></div></div>';

					l++;
		    	}
			}
		}) 
		html += '</div>';
		
		html += '</div>';
		html += '</div>';
		html += '<br/>';
		html += '<br/>';
		html +='<h2 class="col-xs-12" style="margin-top: 2%; margin-bottom: 6%"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems()"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>';
		$('#divforportfoliosections').html(html);
	 
		resumenItems2();
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

	    urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
		for(var k=0;k<item.length;k++){
			total2=item[k].price;
			if(total2!=0){
				b++;
			} 
		}
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
var totalFinal=0;
function resumenItems2(){ 
	 
	 
	$.each(arrayItems, function(i, item) { 
		if(item[0].price==undefined){}else{
		    total2=0;
		    total=0;
		    b=0;
			for(var k=0;k<item.length;k++){
				total2=item[k].price;
				if(total2!=0){
					b++;
				} 
			}
			total=item[0].price*b;
			total=total.toFixed(2);
			totalFinal=parseFloat(totalFinal)+parseFloat(total);
			totalFinal=	totalFinal.toFixed(2);
		}
	})

	$('.precio1').html("Coste total: "+totalFinal+" €");
}
