var subir=true;
var bandera=false;
var contador=0;
// FUNCIÓN PARA GENERAR URL DE PAGO Y REDIRECCIONARTE
function pagarPiso() {
	// FUNCIÓN QUE NOS DEVUELVE UN NÚMERO EN FUNCIÓN DE LA ESTANCIA QUE SEA (PARA GENERAR LA CADENA DE ESTANCIAS EJ.: 1-2-3-5)
	function conversorEspacios (data) {
		if(data=="comedor") {
			return 1;
		} else if(data=="despacho") {
			return 2;
		} else if(data=="dormitorio") {
			return 3;
		} else if(data=="entrada") {
			return 4;
		} else if(data=="infantil") {
			return 5;
		} else if(data=="salón") {
			return 6;
		} else if(data=="vestidor") {
			return 7;
		} else if(data=="baño") {
			return 8;
		} else if(data=="cocina") {
			return 9;
		} else if(data=="otros") {
			return 10;
		} else {
			return 11;
		}
	} //3-8-6-3-5  dormitorio baño salon dormitorio infantil
	// OBTENEMOS LA CADENA DE TEXTO CON LAS ESTANCIAS
	var tipoEstancias=$(".packTexto").html();
	// CREAMOS UN ARRAY A PARTIR DE LA CADENA ANTERIOR
	var arrayDeCadenas = $.trim(tipoEstancias.split(" · "));
	var arrayDeCadenas = arrayDeCadenas.split(",");
	cadena="";
	// RECORREMOS EL ARRAY Y OBTENEMOS LA CADENA DE NUMEROS (ESTANCIAS) QUE IRÁ EN EL GET DE PAGO
	for(var i=0;i<arrayDeCadenas.length;i++) {
		if(i==0 || i==1 && conversorEspacios($.trim(arrayDeCadenas[0]))==11){
			if(conversorEspacios($.trim(arrayDeCadenas[i]))==11) {
				
			} else {
				var numero=conversorEspacios($.trim(arrayDeCadenas[i]));
				if(numero<11) {
					cadena=numero; 
				}
			}
		} else { 
			var numero=conversorEspacios($.trim(arrayDeCadenas[i]));
			if(numero<11) {
				cadena+="-"+numero;
			}
		}
	}
	// SI EL NUMERO DE ESTANCIAS ES 1, LO ENVIARÁ A PAGO NORMAL
	if(contador==1) {
		var href = urlbase + '/Pagar.html';
		window.location = href; 
	// SI EL NÚMERO DE ESTANCIAS ES SUPERIOR IRÁ A PAGOPISO
	} else {
		var href = urlbase + '/PagoPiso.html?tipo='+cadena;
		window.location = href; 
	}
	
	
}

// MÉTODO CUANDO PULSA EN AÑADIR ITEM
function mas(data) {
	paso=0;
	valor=$("."+data).html();
	valor=parseInt(valor)+1;
	if(valor>0) {
			var ventana_ancho = $(window).width();  
			contador=parseInt(contador)+1; 
			// EFECTO QUE BAJA Y SUBE CUANDO AÑADES EL PRIMER ITEM
			if(contador==1 && bandera==false){
				bandera=true; 
				// COLOCA MENÚ DEBAJO DE LA SELECCIÓN DE ITEMS
				$(".display").css("display","block"); 
				$('html,body').animate({
				    scrollTop: $(".display").offset().top
				}, 1500);
				setTimeout(function(){ 
					$('html,body').animate({
				    scrollTop: $(".seleccion").offset().top
					}, 700); 
				},1700);
				paso=1;
				$(".enlaceMovil").attr("href", "/proyecto-decoracion-online-3d.html?id=966&orden=3d"); 
				$(".text360").html("");
				$(".gif").css("display", "none"); 
				$(".jpg").css("display", "block");  
				  
			} else if(contador<=2) {
				$(".text360").html(""); 
				$(".enlaceMovil").attr("href", "/proyecto-decoracion-online-3d.html?id=966&orden=3d"); 
				
				$(".gif").css("display", "none"); 
				$(".jpg").css("display", "block");  
			} else {
				$(".enlaceMovil").attr("href", "/proyecto-decoracion-online-3d.html?id=966"); 
				$(".text360").html("INCLUYE EL 360º DE 1 ESTANCIA DEL PACK"); 
				$(".jpg").css("display", "none"); 
				$(".gif").css("display", "block");  
			}
			
			// AÑADIMOS LOS DATOS EN EL MENÚ CON LAS OPCIONES ESCOGIDAS
			$(".packTitulo").html("PACK DE "+contador+" ESTANCIAS");
			$(".estancias").append('<div class="imagenApp3" style="position:relative"><img src="img/'+data+'.svg" alt="Decorar Comedor" style="width:100%"><p style="position:absolute;top:-19px;right:-3px;font-size:0.9em;cursor:pointer" onclick="menos(\''+data+'\')">x</p></div>');
			var dataFinal=data;
			if(dataFinal=="bano") {
				dataFinal="baño";
			} else if(dataFinal=="proyecto") {
				dataFinal="otros";
			} else if(dataFinal=="salon") {
				dataFinal="salón";
			}
			// SI ES LA PRIMERA ESTANCIA SE AÑADE SOLO EL NOMBRE SINO LE PRECEDE UN · DE SEPARACIÓN ENTRE ESTANCIAS
			if(contador==1) { 
				$(".packTexto").append(dataFinal);
			} else {
				$(".packTexto").append(" · "+dataFinal);
			}
			// COLOCAMOS PRECIO DE ESTANCIA CON SUS
			if(contador==1) {
				precio="179€";
				textoPrecio='';
			} else if(contador==2) {
				precio="299€";
				textoPrecio='<strike>179€</strike> 149.50€ POR ESTANCIA [59€ DE AHORRO]';
			}  else if(contador==3) {
				precio="420€";
				textoPrecio='<strike>179€</strike> 140€ POR ESTANCIA [117€ DE AHORRO]';
			}  else if(contador==4) {
				precio="525€";
				textoPrecio='<strike>179€</strike> 131.25€ POR ESTANCIA [191€ DE AHORRO]';
			}  else if(contador==5) {
				precio="600€";
				textoPrecio='<strike>179€</strike> 120€ POR ESTANCIA [295€ DE AHORRO]';
			} else if(contador==6) {
				precio="700€";
				textoPrecio='<strike>179€</strike> 116.67€ POR ESTANCIA [374€ DE AHORRO]';
			} else if(contador==7) {
				precio="800€";
				textoPrecio='<strike>179€</strike> 114.29€ POR ESTANCIA [453€ DE AHORRO]';
			}  else if(contador==8) {
				precio="900€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [532€ DE AHORRO]';
			}  else if(contador==9) {
				precio="1012.50€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [598€ DE AHORRO]';
			} else {
				precio=(contador*112.50)+"€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA ['+66.50*contador+'€ DE AHORRO]';
			}
			
			$(".precioEst").html(precio);
			$(".textoPrecios").html(textoPrecio); 
			 
	}
	$("."+data).html(valor);
	// COMPRUEBA SI HAY QUE COLOCAR LAS FLECHAS DE SUBIR Y BAJAR
	flechas();
}
function desplazar(data) {
	if(data==1) {
		$('html,body').animate({
	    scrollTop: $(".seleccion").offset().top
		}, 700);   
	} else {

		$('html,body').animate({
		    scrollTop: $(".display").offset().top
		}, 1500); 
	}
}
function menos(data) {
	valor=$("."+data).html();
	if(parseInt(contador)-1<0) {
		// SI EL NUMERO DE ESTANCIAS ES MENOR QUE 0 ESTABLECEMOS EL CONTADOR EN 0 Y BANDERA TRUE PARA ACTIVAR EL EFECTO OTRA VEZ
		contador=0; 
		bandera=true;
	} else {
		// SI EL NÚMERO DE ESTANCIAS ES CERO, OCULTAMOS EL DIV QUE LAS CONTIENE
		if(parseInt(contador)-1<=0) {
			$(".display").css("display","none"); 
			$(".imagenSubir").css("display","none");
			$(".imagenBajar").css("display","none");
			bandera=false;
		}
		
		if(valor>0) { 
			contador=parseInt(contador)-1;
			// TEXTO A AÑADIR EN FUNCIÓN DE SI ES 1, 2 O MÁS PROYECTOS
			if(contador<=2) { 
				$(".enlaceMovil").attr("href", "/proyecto-decoracion-online-3d.html?id=966&orden=3d"); 
				$(".text360").html(""); 
				$(".gif").css("display", "none"); 
				$(".jpg").css("display", "block");  
			} else {
				$(".enlaceMovil").attr("href", "/proyecto-decoracion-online-3d.html?id=966"); 
				$(".text360").html("INCLUYE EL 360º DE 1 ESTANCIA DEL PACK"); 
				$(".jpg").css("display", "none"); 
				$(".gif").css("display", "block");  
			}

			
			// AÑADIMOS INFORMACIÓN DE LA SELECCIÓN
			$(".packTitulo").html("PACK DE "+contador+" ESTANCIAS");
			var estancias=$(".estancias").html(); 
			console.log(estancias);
			estancias = estancias.replace('<div class="imagenApp3" style="position:relative"><img src="img/'+data+'.svg" alt="Decorar Comedor" style="width:100%"><p style="position:absolute;top:-19px;right:-3px;font-size:0.9em;cursor:pointer" onclick="menos(\''+data+'\')">x</p></div>', ""); 
			console.log('<div class="imagenApp3" style="position:relative"><img src="img/'+data+'.svg" alt="Decorar Comedor" style="width:100%"><p style="position:absolute;top:-19px;right:-3px;font-size: 1.3em" onclick="menos(\''+data+'\')">x</p></div>');
			
			$(".estancias").html(estancias);
			var dataFinal=data;
			if(dataFinal=="bano") {
				dataFinal="baño";
			} else if(dataFinal=="proyecto") {
				dataFinal="otros";
			} else if(dataFinal=="salon") {
				dataFinal="salón";
			}
			var packTexto=$(".packTexto").html(); 
			if(packTexto.indexOf("· "+dataFinal) > -1) {
				tipo="· "+dataFinal;
			} else if(packTexto.indexOf(dataFinal +" ·") > -1){
				tipo=dataFinal +" ·";
			} else {
				tipo=dataFinal;
			}
			packTexto = packTexto.replace(tipo, ""); 
			$(".packTexto").html(packTexto);
			
			if(contador==1) {
				precio="179€";
				textoPrecio='';
			} else if(contador==2) {
				precio="299€";
				textoPrecio='<strike>179€</strike> 149.50€ POR ESTANCIA [59€ DE AHORRO]';
			}  else if(contador==3) {
				precio="420€";
				textoPrecio='<strike>179€</strike> 140€ POR ESTANCIA [117€ DE AHORRO]';
			}  else if(contador==4) {
				precio="525€";
				textoPrecio='<strike>179€</strike> 131.25€ POR ESTANCIA [191€ DE AHORRO]';
			}  else if(contador==5) {
				precio="600€";
				textoPrecio='<strike>179€</strike> 120€ POR ESTANCIA [295€ DE AHORRO]';
			} else if(contador==6) {
				precio="700€";
				textoPrecio='<strike>179€</strike> 116.67€ POR ESTANCIA [374€ DE AHORRO]';
			} else if(contador==7) {
				precio="800€";
				textoPrecio='<strike>179€</strike> 114.29€ POR ESTANCIA [453€ DE AHORRO]';
			}  else if(contador==8) {
				precio="900€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [532€ DE AHORRO]';
			}  else if(contador==9) {
				precio="1012.50€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [598€ DE AHORRO]';
			}  else {
				precio=(contador*112.50)+"€";
				textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA ['+66.50*contador+'€ DE AHORRO]';
			}
			 
			// COLOCAMOS PRECIO TOTAL
			$(".precioEst").html(precio);
			$(".textoPrecios").html(textoPrecio); 
		}
		valor=parseInt(valor)-1;
		if(valor<0) {
			valor=0;
			$(".imagenSubir").css("display","none");
			$(".imagenBajar").css("display","none");
		}
		$("."+data).html(valor); 
 
		} 
		flechas();
	}  

	// FUNCIÓN QUE COMPRUEBA SI LOS BOTONES ESTÁN COLOCADOS EN FUNCIÓN DEL ANCHO DE PANTALLA Y LOS CENTRA
	function flechas() { 
	var ventana_ancho = $(window).width(); 
	ventana_ancho=(ventana_ancho/2)-30;
	$(".imagenSubir").css("left",ventana_ancho);
	$(".imagenBajar").css("left",ventana_ancho); 
	if(ventana_ancho<768 && contador>0) {  
		$(window).scroll(function(){
			var windowHeight = $(window).scrollTop();
			var ventana_alto = $(window).height();  
			var contenido2 = $(".seleccion").offset();
			contenido2 = (contenido2.top +ventana_alto); 
			contenido2 = contenido2-100; 
			    if(windowHeight >= contenido2){ 
					if(ventana_ancho<768  && contador>0) {
						$(".imagenSubir").css("display","block");
						$(".imagenBajar").css("display","none");
					} else {
						$(".imagenSubir").css("display","none"); 
						$(".imagenBajar").css("display","none");
					}
			    } else{
			    	if(ventana_ancho<768  && contador>0) {
						$(".imagenBajar").css("display","block");
						$(".imagenSubir").css("display","none");
					}else {
						$(".imagenSubir").css("display","none"); 
						$(".imagenBajar").css("display","none");
					}
				} 
	      }); 
		
	} else { 
		$(".imagenSubir").css("display","none"); 
		$(".imagenBajar").css("display","none");
	}
}

$(window).resize(function() { 
	// HACEMOS RESIZE PARA COLOCAR LOS BOTONES DE SUBIR Y BAJAR
	var ventana_ancho = $(window).width();  
	if(ventana_ancho<768) { 
		flechas();
	} else {
		$(window).scroll(function(){
			var windowHeight = $(window).scrollTop();
			var ventana_alto = $(window).height();  
			var contenido2 = $(".seleccion").offset();
			contenido2 = (contenido2.top +ventana_alto); 
			contenido2 = contenido2-100; 
			    if(windowHeight >= contenido2){  
						$(".imagenSubir").css("display","none"); 
						$(".imagenBajar").css("display","none"); 
			    } else{ 
						$(".imagenSubir").css("display","none"); 
						$(".imagenBajar").css("display","none"); 
				} 
	      }); 			
		$(".imagenSubir").css("display","none"); 
		$(".imagenBajar").css("display","none");
	}
})

	