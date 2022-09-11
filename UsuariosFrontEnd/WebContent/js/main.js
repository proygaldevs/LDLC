var imagen="";
var imagen2="";
/*var paracortar=$(location).attr('pathname');
var cosas=paracortar.split('/');
//alert(cosas.length);
var path='';
if(cosas.length<3){
	path='';
}else{
	path='/'+cosas[1];
}
var urlbase=$(location).attr('protocol')+'//'+$(location).attr('host')+path;
var urlbaseForAjax=urlbase;*/
 

//var urlbase = "http://192.168.1.100:8444/OnlineAssistance";
//var urlbase="http://decotheco.com";
var urlnombreproyecto = "OnlineAssistance";
// var urlbase="http://localhost:8444";
//var urlbaseForAjax="http://decotheco.com";
var pagorealizadoporprimeravezvar=getCookie("pagorealizadoporprimeravez");
var id_decorador_seleccionado=null;

var pageIndex = 1;
var id_userglobal = -1;
var nombreproyectoCTM;
var ctxForCTM;
var canvasctm;
var ratioforcanvasCTM;
// var urlbase="http://decotheco.com:8080/OnlineAssistance";


var anteriorclickado = false; 
var informacion_proyecto;
var idmoodboard = 0;
var checklogintosave = 0; 
var proyectos_ajax;
var proyectoObject;
var preferenciaObject;

//recibe una url de un producto y le añade el parametro "custom_param" para saber de que decorador procede la venta.
function processUrlAffiliates(urlProducto, listaAfiliados, idDecorador) {

	for (i = 0; i < listaAfiliados.length; i++) {
		var url_base = listaAfiliados[i].url_base;
		var url_add = listaAfiliados[i].url_add;
		var tipo_afiliacion = listaAfiliados[i].tipo_afiliacion;
		
		if (urlProducto != undefined) {
			// si es de tipo prestashop
			if (tipo_afiliacion == 1) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto + "&"
								+ listaAfiliados[i].custom_param + "="
								+ idDecorador;
						break;
					}
				}
			} else
			// si es de tipo clickdoubler
			if (tipo_afiliacion == 2) {
				if (urlProducto.indexOf(url_add) > -1
						&& urlProducto.indexOf(url_base) > -1) {
					if (urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
						// TODO habría que valorar si merece la pena hacer algo
						// en el else de este if
						urlProducto = urlProducto
								+ listaAfiliados[i].custom_param + "("
								+ idDecorador + ")";
						break;
					}
				}

			}
		}

	}
	return urlProducto;

}

function moodboardInyect() {
	var url = window.location.href;
	var captured = /idM=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our
												// case)
	var result = captured ? captured : 0;
	var imgmodbard = document.getElementById("imgMoodboard");
	var linkdownload = document.getElementById("download");
	var linkdownload2 = document.getElementById("download2");

	if (result == 0) {
		imgmodbard.src = urlbaseForMoodboards + "/moodboards/1464416155178.png";
		linkdownload.href = urlbaseForMoodboards + "/moodboards/1464416155178.png";
		linkdownload2.href = urlbaseForMoodboards + "/moodboards/1464416155178.png";
		idmoodboard = "1464416155178";
	} else {
		imgmodbard.src = urlbaseForMoodboards + "/moodboards/" + result + ".png";
		linkdownload.href = urlbaseForMoodboards + "/moodboards/" + result + ".png";
		linkdownload2.href = urlbaseForMoodboards + "/moodboards/" + result + ".png";
		idmoodboard = result;
	}
}

//REGISTRATE Y EMPIEZA 

function continuarBeforeMoodboard() {
	 
	
	// BootstrapDialog.alert("entro en compartir continuarAfterMoodboard:");
	if (idmoodboard == "") {
		   
		var u = urlbase + "/inspiracion.html?idM=" + idmoodboard;
		var imgofu = urlbaseForMoodboards + "/moodboards/" + idmoodboard + ".png";
		var userAssistantCockie = getCookie("userAssistant");
		if (userAssistantCockie == "") {
			checklogintosave = 1;
			$('#login-modal').modal('show');

		} else {
			
			
			saveAndInitProject();
			
			
		}
		/*
		 * FB.ui({ method: 'share', href: u, }, function(response){});
		 */
	}
}


// FINAL MOODBOARD
function continuarAfterMoodboard() {
	
	$(document.body).css({ 'cursor': 'wait' });
	    
	id_decorador_seleccionado= getCookie("id_decorador_seleccionado");
	var p_5 = getCookie("paso5"); 
	
	// BootstrapDialog.alert("entro en compartir continuarAfterMoodboard:");
	if (idmoodboard == 0) {
//alert(idmoodboard);
		saveImageServerCanvas(0);

	} else {
		//alert(idmoodboard);
		// BootstrapDialog.alert("entro en compartir por el lado donde hay
		// idmoodboard:"+idmoodboard);
		var p_1 = getCookie("paso1");
		var p_2 = getCookie("paso2");
		var p_3 = getCookie("paso3");
		var p_4 = getCookie("paso4"); 
		
		// Si venimos de creatuinspiracion sin el paso 5 hecho:
		if(cosas[cosas.length-1]=='creatuinspiracion.html'){
			//alert("es creatuinspiracion");
			if(p_5=="") {
				//alert("no hay paso 5");
				setCookie("idmoodboardcreatuinspiracion", idmoodboard, 365);
				setCookie("nuevo_Proyecto", "1", 365);
				alaAppDentro();
				
				return false;
			} else {
				
			}
		}
		
		

		var u = urlbase + "/inspiracion.html?idM=" + idmoodboard;
		var imgofu = urlbaseForMoodboards + "/moodboards/" + idmoodboard + ".png";
		var userAssistantCockie = getCookie("userAssistant");
		if (userAssistantCockie == "") {
			checklogintosave = 1;
			$('#login-modal').modal('show')

		} else {
			
				saveAndInitProject(); 
			
		}
		/*
		 * FB.ui({ method: 'share', href: u, }, function(response){});
		 */
	}
	 
	    
	    setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1000);
}

function compartirFacebookv(id_moodboard){ 
	var res = id_moodboard; 
	
	var u = urlbase + "/inspiracion.html?idM=" + res;
	var imgofu = urlbaseForMoodboards + "/moodboards/" + res + ".png";
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : 'Has creado tu tablero de inspiración',
	}, function(response) {
	});
}
function compartirTwitterV(id_moodboard){ 
	var res = id_moodboard;
	
	var u = urlbase + "/inspiracion.html?idM=" + res;
	var imgofu = urlbaseForMoodboards + "/moodboards/" + res + ".png";
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ document.title);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirpinterestV(id_moodboard) { 
	var res = id_moodboard;
	
	var u = urlbase + "/inspiracion.html?idM=" + res;
	var imgofu = urlbaseForMoodboards + "/moodboards/" + res + ".png";
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : 'Mi tablero de inspiración'
	});
}


function compartirFacebook() {
	// BootstrapDialog.alert("entro en compartir idmoodboard:"+idmoodboard);
	if (idmoodboard == 0) {

		saveImageServerCanvas(1);

	} else {

		// BootstrapDialog.alert("entro en compartir por el lado donde hay
		// idmoodboard:"+idmoodboard);

		var u = urlbase + "/inspiracion.html?idM=" + idmoodboard;
		var imgofu = urlbaseForMoodboards + "/moodboards/" + idmoodboard + ".png";
		FB.ui({
			method : 'feed',
			link : u,
			picture : imgofu,
			caption : 'Has creado tu tablero de inspiración',
		}, function(response) {
		});
		/*
		 * FB.ui({ method: 'share', href: u, }, function(response){});
		 */
	}
}
function compartirTwitter() {
	// BootstrapDialog.alert("entro en compartir idmoodboard:"+idmoodboard);

	if (idmoodboard == 0) {
		saveImageServerCanvas(2);
	} else {

		// BootstrapDialog.alert("entro en compartir por el lado donde hay
		// idmoodboard:"+idmoodboard);

		var u = urlbase + "/inspiracion.html?idM=" + idmoodboard;
		var imgofu = urlbaseForMoodboards + "/moodboards/" + idmoodboard + ".png";
		//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
		window.open("https://twitter.com/share?url=" + u + "&text="+ document.title);
		//  win.focus();
		return false;
		/*
		 * FB.ui({ method: 'share', href: u, }, function(response){});
		 */
	}
}
function compartirPinterest() {
	// BootstrapDialog.alert("entro en compartir idmoodboard:"+idmoodboard);

	if (idmoodboard == 0) {
		saveImageServerCanvas(3);
	} else {

		// BootstrapDialog.alert("entro en compartir por el lado donde hay
		// idmoodboard:"+idmoodboard);

		var u = urlbase + "/inspiracion.html?idM=" + idmoodboard;
		var imgofu = urlbaseForMoodboards + "/moodboards/" + idmoodboard + ".png";
		PinUtils.pinOne({
			url : u,
			media : imgofu,
			description : 'Mi tablero de inspiración'
		});

	}
}


function saveImageServerCanvas(redsocial) {

	$("body").css("cursor", "progress");
	
	var p_1 = getCookie("paso1");
	var p_2 = getCookie("paso2");
	var p_3 = getCookie("paso3");
	var p_4 = getCookie("paso4");
	var p_5 = getCookie("paso5");

	var canvasServer = document.getElementById("canvasformodboard");

	var imageDataURL = canvasServer.toDataURL('image/png');
	var ajax = new XMLHttpRequest();

	try {
		

		$.ajax({
			type : "POST",
			// dataType: "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/UploadServlet2',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : imageDataURL,
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/upload",
			success : function(data) {
				// BootstrapDialog.alert("devolvio algo:"+data);
				var res = data.replace(".png", "");
				idmoodboard = res;
				setCookie("id_moodboard", res, 365);
				// BootstrapDialog.alert("ajaxsalvar imagen:"+idmoodboard);
				$("body").css("cursor", "default");
				if (redsocial == 0) {
					continuarAfterMoodboard();
					return false;
				}
				if (redsocial == 01) {
					continuarBeforeMoodboard();
					return false;
				}
				if (redsocial == 1) {
					compartirFacebook();
					return false;
				}
				if (redsocial == 2) {
					compartirTwitter();
					return false;
				}
				if (redsocial == 3) {
					compartirPinterest();
					return false;
				}
				if(document.getElementById('imgMoodboard')!=null){

					$('#imgMoodboard').css('display','block');
					document.getElementById('imgMoodboard').src= urlbaseForMoodboards+"/moodboards/"+idmoodboard+".png";
					$('#imgMoodboard').css('border','1px solid black');
					document.getElementById('download').href= urlbaseForMoodboards+"/moodboards/"+idmoodboard+".png";
					document.getElementById('download2').href= urlbaseForMoodboards+"/moodboards/"+idmoodboard+".png";
				}
					
			},         
	        error : function(xhr, status) { 
	        	cerrarCargando();
	        },  
	        complete : function(xhr, status) { 
	        	cerrarCargando();
	        }
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}
}

function crearMoodboardCTM(){

	 
	setCookie("paso6_1_CTM", listOfImagenesCTM[0], 365);
	setCookie("paso6_2_CTM", listOfImagenesCTM[1], 365);
	setCookie("paso6_3_CTM", listOfImagenesCTM[2], 365);
	
	var color1ctm = $('#color1_CTM').data('colorpicker').color.toHex();
	var color2ctm = $('#color2_CTM').data('colorpicker').color.toHex();
	var color3ctm = $('#color3_CTM').data('colorpicker').color.toHex();
	
	//alert('el color'+color1ctm.value);
	setCookie("paso7_1_CTM", color1ctm, 365);
	setCookie("paso7_2_CTM", color2ctm, 365);
	setCookie("paso7_3_CTM", color3ctm, 365);
	
	setCookie("paso8_1_CTM", listOfSensacionesCTM[0], 365);
	setCookie("paso8_2_CTM", listOfSensacionesCTM[1], 365);
	
	if(listOfFrasesCTM.length>0){
		setCookie("paso8_3_CTM", listOfFrasesCTM[0], 365);
	}
	modboardConstructCTM();
	
	
}


function grabarFrase(){
	if(listOfImagenesCTM.length==3 && listOfSensacionesCTM.length==2){
		
		if(listOfFrasesCTM.length==1){

			$('#cargando').modal('show');
			crearMoodboardCTM();
		}else{

			$('#cargando').modal('show');
			canvas.deactivateAll().renderAll();
			var usernameforajax = "temporal";
			var nombreproyectoforajax = currentdate;
			var seccion = "frase";
			var urlForAjax = "UploadServletFrase?user="
				+ usernameforajax + "&proyecto="
				+ nombreproyectoforajax + "&seccion=" + seccion;
			
			var canvasServer = document.getElementById("c");
		
			var imageDataURL = canvasServer.toDataURL('image/png');
			var ajax = new XMLHttpRequest();
		
			try {
				
		
				$.ajax({
					type : "POST",
					// dataType: "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/'+urlForAjax,
					// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : imageDataURL,
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/upload",
					success : function(data) {
						// BootstrapDialog.alert("devolvio algo:"+data);
						//var res = data.replace(".png", "");
						setCookie("paso8_3_CTM", data, 365);
						crearMoodboardCTM();
					} 
				});
		
			} catch (e) {
				BootstrapDialog
						.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
				 
			}
		
		}
	}else{
		BootstrapDialog
		.alert('Faltan imágenes, han de ser 3 o faltan sensaciones, han de ser 2');
		cerrarCargando();
		return;
	} 
	
}
/**
 * This is the function that will take care of image extracting and setting
 * proper filename for the download. IMPORTANT: Call it from within a onclick
 * event.
 */
function downloadCanvas(link, canvasId, filename) {
	//alert(link);
	//alert(canvasId);
	//alert(filename);
	link.crossorigin=anonymous;
	
	
	link.href = document.getElementById(canvasId).toDataURL();
	//alert(link.href);
	link.download = filename;

}

function checkRadioButtons() {
	/*
	 * if(anteriorclickado==false){ anteriorclickado=true; }else{
	 * anteriorclickado=false;
	 */
	// hago la comprobación cada vez que se pulsa un radiobutton y genero una
	// cockie con su valor y activo el botón de siguiente.
	var valor = '';
	var ele = document.getElementsByName('emotion');
	var flag = 0;
	for (var i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			valor = ele[i].value;
			break;
		}

	}
	cerramosONo=true;
	
	setCookie("paso1Real", valor, 365);

	// BootstrapDialog.alert(valor);
	if (valor == "vestidor") {
		setCookie("paso1", "salon", 365);
		setCookie("paso1original", "vestidor", 365);
	} else if (valor == "questionmark") {
		setCookie("paso1", "salon", 365);
		setCookie("paso1original", "otros", 365);
	} else {
		setCookie("paso1", valor, 365);
		setCookie("paso1original", valor, 365);
	}
	// BootstrapDialog.alert(getCookie("paso1"));
	/*$('html, body').animate({
		scrollTop : $(document).height()
	}, 'slow');*/
	document.getElementById("botonSiguiente").className = document
			.getElementById("botonSiguiente").className.replace(
			/(?:^|\s)disabled(?!\S)/g, '');
	document.getElementById("botonSiguiente2").className = document.getElementById("botonSiguiente2").className.replace(/(?:^|\s)disabled(?!\S)/g, '');
	// }
	
	setcolorPre(); 
	setminimalismoPre();
	setEstiloPre();
	clickSiguientePaso1();
	$("#myCarousel").carousel("next");

}

function checkRadioButtonsPaso2() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		var valor = '';
		var ele = document.getElementsByName('radiostyles');
		var flag = 0;
		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				break;
			}

		}
		setCookie("paso2", valor, 365);
//		$('html, body').animate({
//			scrollTop : $(document).height()
//		}, 'slow');
		document.getElementById("botonSiguientePaso2").className = document
				.getElementById("botonSiguientePaso2").className.replace(
				/(?:^|\s)disabled(?!\S)/g, '');
		document.getElementById("botonSiguientePaso22").className = document
		.getElementById("botonSiguientePaso22").className.replace(
		/(?:^|\s)disabled(?!\S)/g, '');
		clickSiguientePaso2();
		$("#myCarousel").carousel("next");
	}
	
	
}

function checkRadioButtonsPaso3() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		// BootstrapDialog.alert("e");
		// BootstrapDialog.alert("paso3");
		var valor = '';
		var ele = document.getElementsByName('radiominimalismo');
		var flag = 0;
		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				break;
			}

		}
		setCookie("paso3", valor, 365);
//		$('html, body').animate({
//			scrollTop : $(document).height()
//		}, 'slow');
		document.getElementById("botonSiguientePaso3").className = document
				.getElementById("botonSiguientePaso3").className.replace(
				/(?:^|\s)disabled(?!\S)/g, '');
		document.getElementById("botonSiguientePaso32").className = document
		.getElementById("botonSiguientePaso32").className.replace(
		/(?:^|\s)disabled(?!\S)/g, '');
		
		clickSiguientePaso3();
		$("#myCarousel").carousel("next");
	}
	
}

function checkRadioButtonsPaso4() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;

		var valor = '';
		var ele = document.getElementsByName('radiocolores');
		var flag = 0;
		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				break;
			}

		}
		setCookie("paso4", valor, 365);
//		$('html, body').animate({
//			scrollTop : $(document).height()
//		}, 'slow');
		document.getElementById("botonSiguientePaso4").className = document
				.getElementById("botonSiguientePaso4").className.replace(
				/(?:^|\s)disabled(?!\S)/g, '');
		document.getElementById("botonSiguientePaso42").className = document
		.getElementById("botonSiguientePaso42").className.replace(
		/(?:^|\s)disabled(?!\S)/g, '');
		clickSiguientePaso4();
		$("#myCarousel").carousel("next");
	}
	
}

function checkRadioButtonsPaso5() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		var valor = '';
		var ele = document.getElementsByName('radiotiendas');
		var flag = 0;
		var tiendas = new Array();

		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				tiendas.push(valor);
			}
		}
		var json_str = JSON.stringify(tiendas);
		setCookie("paso5", json_str, 365);

		document.getElementById("botonSiguientePaso5").className = document
				.getElementById("botonSiguientePaso5").className.replace(
				/(?:^|\s)disabled(?!\S)/g, '');
		document.getElementById("botonSiguientePaso52").className = document
		.getElementById("botonSiguientePaso52").className.replace(
		/(?:^|\s)disabled(?!\S)/g, '');
		if(tiendas.length>=3){
			clickSiguientePaso5();
			//$("#myCarousel").carousel("next");
		}
		
		// var ooosss=getCookie("paso5");
		// BootstrapDialog.alert(ooosss);
	}
}

function checkRadioButtonsPaso6() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		var valor = '';
		var ele = document.getElementsByName('radioimagenes');
		var flag = 0;
		var imageneslist = new Array();
		// BootstrapDialog.alert("aaaiiiiooo666666666");
		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				imageneslist.push(valor);
			}

		}

		if (imageneslist.length == 3) {
			setCookie("paso6_1", imageneslist[0], 365);
			setCookie("paso6_2", imageneslist[1], 365);
			setCookie("paso6_3", imageneslist[2], 365);

//			$('html, body').animate({
//				scrollTop : $(document).height()
//			}, 'slow');

			document.getElementById("botonSiguientePaso6").className = document
					.getElementById("botonSiguientePaso6").className.replace(
					/(?:^|\s)disabled(?!\S)/g, '');
			clickSiguientePaso6();
			$("#myCarousel").carousel("next");
			
		} else {
			if (imageneslist.length > 3) {
				BootstrapDialog.alert("Ha seleccionado " + imageneslist.length
						+ ", por favor escoa solo 3");
			}
			document.getElementById("botonSiguientePaso6").className = document
					.getElementById("botonSiguientePaso6").className.replace(
					/(?:^|\s)separacionIzq_5(?!\S)/g,
					' separacionIzq_5 disabled ');
		}
	}
}

function checkRadioButtonsPaso7() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		var valor = '';
		var ele = document.getElementsByName('radioColorMod');
		var flag = 0;
		var coloresmodlist = new Array();

		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				coloresmodlist.push(valor);
			}

		}

		if (coloresmodlist.length == 3) {
			setCookie("paso7_1", coloresmodlist[0], 365);
			setCookie("paso7_2", coloresmodlist[1], 365);
			setCookie("paso7_3", coloresmodlist[2], 365);

//			$('html, body').animate({
//				scrollTop : $(document).height()
//			}, 'slow');

			document.getElementById("botonSiguientePaso7").className = document
					.getElementById("botonSiguientePaso7").className.replace(
					/(?:^|\s)disabled(?!\S)/g, '');
			clickSiguientePaso7();
			$("#myCarousel").carousel("next");
		} else {
			if (coloresmodlist.length > 3) {
				BootstrapDialog.alert("Ha seleccionado "
						+ coloresmodlist.length + ", por favor escoja solo 3");
			}
			document.getElementById("botonSiguientePaso7").className = document
					.getElementById("botonSiguientePaso7").className.replace(
					/(?:^|\s)separacionIzq_5(?!\S)/g,
					' separacionIzq_5 disabled ');
		}
	}

}

function checkRadioButtonsPaso8a() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		var valor = '';
		var ele = document.getElementsByName('radioSensacionesMod');
		var flag = 0;
		var sensacionesmodlist = new Array();

		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				sensacionesmodlist.push(valor);
			}

		}

		if (sensacionesmodlist.length == 2) {
			// BootstrapDialog.alert("'"+sensacionesmodlist[0]+"'");
			// BootstrapDialog.alert("'"+sensacionesmodlist[1]+"'");
			setCookie("paso8_1", sensacionesmodlist[0], 365);
			setCookie("paso8_2", sensacionesmodlist[1], 365);

//			$('html, body').animate({
//				scrollTop : $(document).height()
//			}, 'slow');

			document.getElementById("botonSiguientePaso8a").className = document
					.getElementById("botonSiguientePaso8a").className.replace(
					/(?:^|\s)disabled(?!\S)/g, '');
			clickSiguientePaso8a()
			$("#myCarousel").carousel("next");
		} else {
			if (sensacionesmodlist.length > 2) {
				BootstrapDialog.alert("Ha seleccionado "
						+ sensacionesmodlist.length
						+ ", por favor escojA solo 2");
			}
			document.getElementById("botonSiguientePaso8a").className = document
					.getElementById("botonSiguientePaso8a").className.replace(
					/(?:^|\s)separacionIzq_5(?!\S)/g,
					' separacionIzq_5 disabled ');
		}

	}
}

function checkRadioButtonsPaso8b() {
	if (anteriorclickado == false) {
		anteriorclickado = true;
	} else {
		anteriorclickado = false;
		// BootstrapDialog.alert("e");
		var valor = '';
		var ele = document.getElementsByName('radioSensacionesModb');
		var flag = 0;
		var sensacionesmodlist2 = new Array();

		for (var i = 0; i < ele.length; i++) {
			if (ele[i].checked) {
				valor = ele[i].value;
				sensacionesmodlist2.push(valor);
			}

		}

		if (sensacionesmodlist2.length == 1) {
			setCookie("paso8_3", sensacionesmodlist2[0], 365);
//			$('html, body').animate({
//				scrollTop : $(document).height()
//			}, 'slow');

			document.getElementById("botonSiguientePaso8b").className = document
					.getElementById("botonSiguientePaso8b").className.replace(
					/(?:^|\s)disabled(?!\S)/g, '');
			clickSiguientePaso8b();
			
			$("#myCarousel").carousel("next");

			$('#cargando').modal('show');
		} else {
			if (sensacionesmodlist2.length > 1) {
				BootstrapDialog.alert("Ha seleccionado "
						+ sensacionesmodlist2.length
						+ ", por favor escoja solo 1");
			}
			document.getElementById("botonSiguientePaso8b").className = document
					.getElementById("botonSiguientePaso8b").className.replace(
					/(?:^|\s)separacionIzq_5(?!\S)/g,
					' separacionIzq_5 disabled ');
		}

	}
}





// Comprobamos que ya tiene sesion iniciada
function checkCookie() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	if (userAssistantCockie != "") {

		$(document.body).css({ 'cursor': 'wait' });
		login(userAssistantCockie, passAssistantCockie);
	} else {
		cerrarCargando();
		setTimeout(function(){
	    	$(document.body).css({ 'cursor': 'default' });
	    }, 1500);
	}
}
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
   /* if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    
    can.style.width = w + "px";
    can.style.height = h + "px";
    var wn=w;
    //alert("can.width "+can.width);
   // alert("can.style.width "+can.style.width);
    while(can.width>w){
    	wn=wn-0.1;
    	hn=(h*wn)/w;
    	 can.width = wn * ratio;
    	 can.height = hn * ratio;
    }
    while(can.width<w){
    	wn=wn+0.1;
    	hn=(h*wn)/w;
    	 can.width = wn * ratio;
    	 can.height = hn * ratio;
    }
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;*/
	//alert("can.width "+can.width);
	if (!ratio) { ratio = PIXEL_RATIO; }
	ratioforcanvasCTM=ratio;
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    
    can.style.maxWidth  = w + "px";
    can.style.maxHeight = h + "px";
    
    can.style.width = "100%";
    can.style.height = "100%";
   // alert('canvas:'+can.width+' canvasstyle:'+can.style.maxWidth);
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}


function checkCookiepasoCTM() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	
   
	
	
	if (userAssistantCockie != "") {
		loginForCTM(userAssistantCockie, passAssistantCockie);
	}else{
		cargarDropzonePlanos(true);
		cerrarCargando();
	}
	
}
function clearCanvasCTM(){
	
	ctxForCTM.clearRect(0, 0, canvasctm.width, canvasctm.height);
}
function pintarCanvasCTM(){
	/*clearCanvasCTM();*/
	for (var i = 1; i <= 3; i++) {
		var auxText='izq'+i+'_CTM';
		var izq = document.getElementById(auxText);
		auxText='texto_frase'+i+'_CTM';
		var frase = document.getElementById(auxText);
		auxText='der'+i+'_CTM';
		var alto = document.getElementById(auxText);
		auxText='rotacion'+i;
		var rotacion = document.getElementById(auxText);
		auxText='tamano_letra'+i;
		var tamano_letra = document.getElementById(auxText);
		auxText='#color_contorno'+i;
		var color_contorno = $(auxText).data('colorpicker').color.toHex();
		//var color_contorno = document.getElementById(auxText);
		auxText='#color_relleno'+i;
		var color_relleno = $(auxText).data('colorpicker').color.toHex();
		//var color_relleno = document.getElementById(auxText);
		auxText='letras_tipos'+i;
		var letras_tipos = document.getElementById(auxText);
		auxText='letras_uniones'+i;
		var letras_uniones = document.getElementById(auxText);
		auxText='color_contorno_boolean'+i;
		var color_contorno_boolean = document.getElementById(auxText);
		
		
		//alert(color_contorno.value);
		escribirEnCanvasCTM(izq.value, alto.value, frase.value, tamano_letra.value, letras_tipos.value, color_contorno, color_relleno, 'center', letras_uniones.value, rotacion.value,color_contorno_boolean.checked);
	}
	cerrarCargando();
	
}
function testEscribir(){
	escribirEnCanvasCTM(10, 10, 'PALOMA', 40, 'Arial', 'white', 'center', 'round',0);
	escribirEnCanvasCTM(0, 50, 'hola', 20, 'biloxi_scriptregular', 'black', 'white', 'center', 'round',0);

	
}
var getTextHeight = function(font) {

	  var text = $('<span>Hg</span>').css({ fontFamily: font });
	  var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

	  var div = $('<div></div>');
	  div.append(text, block);

	  var body = $('body');
	  body.append(div);

	  try {

	    var result = {};

	    block.css({ verticalAlign: 'baseline' });
	    result.ascent = block.offset().top - text.offset().top;

	    block.css({ verticalAlign: 'bottom' });
	    result.height = block.offset().top - text.offset().top;

	    result.descent = result.height - result.ascent;

	  } finally {
	    div.remove();
	  }

	  return result;
	};
function escribirEnCanvasCTM(izq,arriba, texto, tamanoLetra,tipoletra, colorLetra, colorRelleno, alineacion, unionLinea, rotacion,color_contorno_boolean){
	ctxForCTM.lineWidth  = 5;
	ctxForCTM.font = tamanoLetra+'pt '+tipoletra;
	ctxForCTM.strokeStyle = colorLetra;
	ctxForCTM.fillStyle = colorRelleno;
	ctxForCTM.textAlign = alineacion;
	ctxForCTM.lineJoin = unionLinea;
	
    // Draw the text
    var text = texto;
    //ctxForCTM = text.toUpperCase();
    //alert(canvasctm.style.width);
    //alert(ratioforcanvasCTM*arriba);
    x = (300/2)-(ratioforcanvasCTM*izq);
    y = (300)-(ratioforcanvasCTM*arriba);
    ctxForCTM.save();
    ctxForCTM.beginPath();
    //var h = getTextHeight(ctxForCTM.font);
   // alert(ctxForCTM.measureText(texto).width+'   '+h.height);
    //ctxForCTM.translate(x + ctxForCTM.measureText(texto).width / 2, y + h.height / 2);
    ctxForCTM.rotate((Math.PI / 180)*rotacion);
    if(color_contorno_boolean) ctxForCTM.strokeText(text, x, y);
    ctxForCTM.fillText(text, x, y);
    
    ctxForCTM.restore();
}

function checkCookiepaso1() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");
	
	

	if (userAssistantCockie != "") {
		loginForPAso1(userAssistantCockie, passAssistantCockie);
	} else { 
		var userAssistantCockie = getParameterByName("u");
		var passAssistantCockie = getParameterByName("c");
		if(userAssistantCockie!=null) {
			loginForPAso1(userAssistantCockie, passAssistantCockie);
		} else {
			var href = urlbase;
			window.location = href;  
		}
	}
}
function checkCookiepaso2() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	if (userAssistantCockie != "") {
		loginForPAso2(userAssistantCockie, passAssistantCockie);
	} else { 
		var userAssistantCockie = getParameterByName("u");
		var passAssistantCockie = getParameterByName("c");
		if(userAssistantCockie!=null) {
			loginForPAso2(userAssistantCockie, passAssistantCockie);
		} else {
			var href = urlbase;
			window.location = href;  
		}
	}
}
function checkCookiepaso3() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	if (userAssistantCockie != "") {
		loginForPAso3(userAssistantCockie, passAssistantCockie);
	} else { 
		var userAssistantCockie = getParameterByName("u");
		var passAssistantCockie = getParameterByName("c");
		if(userAssistantCockie!=null) {
			loginForPAso3(userAssistantCockie, passAssistantCockie);
		} else {
			var href = urlbase;
			window.location = href;  
		}
	}
}
function checkCookiepaso4() {
	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	if (userAssistantCockie != "") {
		loginForPAso4(userAssistantCockie, passAssistantCockie);
	} else { 
		var userAssistantCockie = getParameterByName("u");
		var passAssistantCockie = getParameterByName("c");
		if(userAssistantCockie!=null) {
			loginForPAso4(userAssistantCockie, passAssistantCockie);
		} else {
			var href = urlbase;
			window.location = href;  
		}
	}
}

function vamosAlCustomMoodboard(){
	cerramosONo=false;
	var href = urlbase + "/creatuinspiracion.html";
	window.location = href;
}

function cargarEnOnLoadBodyForIndex(){
	
}

/*function cargarRegalo(){
	
	
	var cronometroParaBotonMoodboard;
	var bgImg = new Image();
	bgImg.onload = function(){
		var myDiv=document.getElementById('sidebarmenubtnmoodboardimage'); 
		if(myDiv==null){}else {
		myDiv.src= bgImg.src;}
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
		bgImg.src = urlbase+"/img/other/boton-CREA-PROYECTO.png";
	}
	
}*/
function cargarBotonCrearProyecto(){
	

	
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
		bgImg.src = urlbase+"/img/other/boton-CREA-PROYECTO.png";
	}
	
}

function cargarEnOnLoadBody() {

	
	var substringToFind= QueryString.id;
	setCookie("id_decorador_seleccionado", substringToFind, 365);
	
	
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
		bgImg.src = "../img/other/botoncustommoodboard.png";
	}else{
		bgImg.src = urlbase+"/img/other/botoncustommoodboard.png";
	}
	
	//alert(bgImg.src);

	//Borramos todos los checks que estuviesen marcados
	$(':radio').prop('checked', false);
	
	deleteCookie("aplicacion_paso_1");
	deleteCookie("aplicacion_paso_2");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_4");
	// BootstrapDialog.alert("cargo");
	var c_s_s = getCookie("checked_keep_Session");
	var nuevo_Proyecto_al_iniciar = getCookie("nuevo_Proyecto");

	if (c_s_s != "1") {
		if (nuevo_Proyecto_al_iniciar == "") {
			deleteCookie("userAssistant");
			deleteCookie("passAssistant");
		}

	}
	checkCookie();
	clearPrefCookies();
	$("#myCarousel").swiperight(function() {
		// BootstrapDialog.alert(""+pageIndex);
		if (pageIndex != 1) {
			clearInterval(cronometro);
			$(this).carousel('prev');
			pageIndex = pageIndex - 1;
			
		}

		
	});
	$("#myCarousel").swipeleft(function() {
		var pasoActual = "paso" + pageIndex;
		var pasoActualValor = getCookie(pasoActual);
		// BootstrapDialog.alert(pasoActual+""+pasoActualValor);
		if (pasoActualValor != "") {
			$(this).carousel('next');
			pageIndex = pageIndex + 1;

		}
	});

	/**
	 * The event handler for the link's onclick event. We give THIS as a
	 * parameter (=the link element), ID of the canvas and a filename.
	 */
	var elementillo=document.getElementById('download');
	if(elementillo!=null){
		document.getElementById('download').addEventListener(
				'click',
				function() {
					downloadCanvas(this, 'canvasformodboard',
							'decoTheco_moodboard.png');
				}, false);
	}
	var elementillo=document.getElementById('download2');
	if(elementillo!=null){
		document.getElementById('download2').addEventListener(
				'click',
				function() {
					downloadCanvas(this, 'canvasformodboard',
							'decoTheco_moodboard.png');
				}, false);
	}
	

}


function cargarEnOnLoadBodyCTM() {
	
	

	
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_1");
	deleteCookie("aplicacion_paso_2");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_4");
	setCookie("aplicacion_CTM", 1, 365);
	
	 
	checkCookiepasoCTM();
	/**
	 * The event handler for the link's onclick event. We give THIS as a
	 * parameter (=the link element), ID of the canvas and a filename.
	 */
	var elementillo=document.getElementById('download');
	if(elementillo!=null){
		document.getElementById('download').addEventListener(
				'click',
				function() {
					downloadCanvas(this, 'canvasformodboard',
							'decoTheco_moodboard.png');
				}, false);
	}
	var elementillo=document.getElementById('download2');
	if(elementillo!=null){
		document.getElementById('download2').addEventListener(
				'click',
				function() {
					downloadCanvas(this, 'canvasformodboard',
							'decoTheco_moodboard.png');
				}, false);
	}
}
function cargarEnOnLoadBodyPaso5() {
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_2");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_4");
	setCookie("aplicacion_paso_5", 1, 365);

	// BootstrapDialog.alert("checkcookie");
	var userAssistantCockie = getCookie("userAssistant");
	var passAssistantCockie = getCookie("passAssistant");

	if (userAssistantCockie != "") {
		loginForPAso5(userAssistantCockie, passAssistantCockie);
	} else { 
			var href = urlbase;
			window.location = href;  
	}
} 
function loginForPAso5(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;
	var id_del_proyecto_a_cargar = getParameterByName("id"); 
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null || id_del_proyecto_a_cargar=="null"){
		id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	} 
 
	
	//alert(id_del_proyecto_a_cargar);
	// BootstrapDialog.alert('login');
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/

		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 1,
						id_proyecto: id_del_proyecto_a_cargar
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						user_ajax = data.userName;
						proyectos_ajax = data.proyectos;
						console.log(data);
						
						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");
							
						    OneSignal.sendTag("idUser", id_ajax);
							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							}  
							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
									proyectoObject = proyectos_ajax[i];
								}  
							}
							cargarProjectoPaso1(id_del_proyecto_a_cargar);
							
							 
							
							var array=[];
							array[0]=proyectoObject.nombreProyectDecorador;
							array[1]=proyectoObject.id;
							array[2]=data.userName;
							array[3]=data.id;
							array[4]=proyectoObject.idDecorador; 
							
							
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome 
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							
							
					
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);
							
							
							
						} 
						try {
							goChat(user_ajax,id_del_proyecto_a_cargar,150,array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						}  
						
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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
function cargarEnOnLoadBodyPaso1() {
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_2");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_4");
	setCookie("aplicacion_paso_1", 1, 365);

	checkCookiepaso1();
} 

function cargarEnOnLoadBodyPaso2() {
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_1");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_4");
	setCookie("aplicacion_paso_2", 1, 365);

	checkCookiepaso2();

}
function cargarEnOnLoadBodyPaso3() {
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_1");
	deleteCookie("aplicacion_paso_2");
	deleteCookie("aplicacion_paso_4");
	setCookie("aplicacion_paso_3", 1, 365);

	checkCookiepaso3();

}
function cargarEnOnLoadBodyPaso4() {
	// BootstrapDialog.alert("cargo");
	deleteCookie("aplicacion_paso_1");
	deleteCookie("aplicacion_paso_3");
	deleteCookie("aplicacion_paso_2");
	setCookie("aplicacion_paso_4", 1, 365);

	checkCookiepaso4();

}

function clearPrefCookies() {

	deleteCookie("paso1");
	deleteCookie("paso2");
	deleteCookie("paso3");
	deleteCookie("paso4");
	deleteCookie("paso5");
	deleteCookie("paso6_1");
	deleteCookie("paso6_2");
	deleteCookie("paso6_3");
	deleteCookie("paso7_1");
	deleteCookie("paso7_2");
	deleteCookie("paso7_3");
	deleteCookie("paso8_1");
	deleteCookie("paso8_2");
	deleteCookie("paso8_3");
	deleteCookie("id_moodboard");
	deleteCookie("id_proyectoglobal");
}

/*
 * ##################################################################### # #
 * Project : Modal Login with jQuery Effects # Author : Rodrigo Amarante
 * (rodrigockamarante) # Version : 1.0 # Created : 07/29/2015 # Last Change :
 * 08/04/2015 #
 * #####################################################################
 */



//AJAX
function recordar(lg_mail) {
	

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
						user: "user"
						
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						
						//alert(data);
						if(data==true){
							
								msgChange($('#div-lost-msg'), $('#icon-lost-msg'),
										$('#text-lost-msg'), "success", "glyphicon-ok",
										"Enviada!");
							
						}else{
							
								msgChange($('#div-lost-msg'), $('#icon-lost-msg'),
										$('#text-lost-msg'), "error",
										"glyphicon-remove", "El mail no está registrado");
							
						}

					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
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


// AJAX

 
function loginForCTM(lg_user, lg_pass) {
	//alert("loginCTM");
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;

	var id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");

	// BootstrapDialog.alert('login');
	try {
		
		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 0
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						var user_ajax = data.userName;
						proyectos_ajax = data.proyectos;

						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");

							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							codeusername += '<li class="dropdown-header" style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							 
							 
							cargarProjectoCTM(id_del_proyecto_a_cargar);
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome 
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							var checked = document
									.getElementById("check_login_recuerdame").checked;
							// BootstrapDialog.alert(checked);
							if (checked) {
								// BootstrapDialog.alert("aaa");
								setCookie("checked_keep_Session", "1", 365);
							}
							setCookie("userAssistant", mail_ajax, 365);
							setCookie("passAssistant", $lg_password, 365);
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);

						}

					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        },  
			        complete : function(xhr, status) { 
			        	cerrarCargando();
			        }
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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
 



function loginForPAso1(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;
	var id_del_proyecto_a_cargar = getParameterByName("id"); 
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null || id_del_proyecto_a_cargar=="null"){
		id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	} 
 
	
	//alert(id_del_proyecto_a_cargar);
	// BootstrapDialog.alert('login');
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/ 
		

		console.log(id_del_proyecto_a_cargar);
		console.log($lg_username);
		console.log($lg_password);
		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 1,
						id_proyecto: id_del_proyecto_a_cargar
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						user_ajax = data.userName;
						proyectos_ajax = data.proyectos;
						console.log(data);
						
						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");
							
						    //OneSignal.sendTag("idUser", id_ajax);
							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							}  
							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
									proyectoObject = proyectos_ajax[i];
								}  
							}
							cargarProjectoPaso1(id_del_proyecto_a_cargar);
							
							 
							
							var array=[];
							array[0]=proyectoObject.nombreProyectDecorador;
							array[1]=proyectoObject.id;
							array[2]=data.userName;
							array[3]=data.id;
							array[4]=proyectoObject.idDecorador; 
							
							
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome 
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							
							
					
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);
							
							
							
						} 
						try {
							goChat(user_ajax,id_del_proyecto_a_cargar,150,array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						}  
						
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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
 
function loginForPAso2(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;

	var id_del_proyecto_a_cargar = getParameterByName("id"); 
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null || id_del_proyecto_a_cargar=="null"){
		id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	}

	// BootstrapDialog.alert('login');
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 2,
						id_proyecto: id_del_proyecto_a_cargar
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						var user_ajax = data.userName;
						proyectos_ajax = data.proyectos;

						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");

							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							} 
							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
									proyectoObject = proyectos_ajax[i]; 
								}  
							}
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							 
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							var array=[];
							array[0]=proyectoObject.nombreProyectDecorador;
							array[1]=proyectoObject.id;
							array[2]=data.userName;
							array[3]=data.id;
							array[4]=proyectoObject.idDecorador; 
							
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);
							

							cargarProjectoPaso2(id_del_proyecto_a_cargar);

						} 
						
						try {
							goChat(user_ajax,id_del_proyecto_a_cargar,150, array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						} 
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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
function lanzarportfolioindividual(posicion, pos, imagenprincipal, titulo, id){ 

	setCookie("proyectoParaDecorador", id, 365);

	//$.cookie("coockieposicion", posicion);

	var arrimagenprincipal=imagenprincipal.split("/");
	var arrtitulo=titulo.split(" ");
	var totaltit=arrtitulo[0]
	for(var i = 1; i<arrtitulo.length; i++){
		totaltit=totaltit+"_"+arrtitulo[i];
	}
	/*deleteCookie('portfolioitemcoockie');
	var cook=JSON.stringify(data[posicion]);
	setCookie('portfolioitemcoockie', 'jpaaaaa', 365);*/

	localStorage.removeItem('id_decorador');
	localStorage.setItem('id_decorador', JSON.stringify(posicion));
	
	localStorage.removeItem('posicion_portfolio');
	localStorage.setItem('posicion_portfolio', JSON.stringify(pos));
	
	var href = urlbase + "/decorador-online.html?decorador="+totaltit+"&id="+posicion;
	window.open(href, '_blank');
	
	
}

function getRRSS(cadena){
	if(cadena=="" || cadena==null){
		
	}else {
		return cadena.split("RRSS_rrss");
	}
}
//QUITAR BLACK
function elegirDecoradorBlack(id){ 
	setCookie("proyectoParaDecorador", id, 365);
	var href = urlbase + "/decoradores-online.html?val=2x1";
	window.location = href; 
}

// función para colocar decoradores pasandole id proyecto
function colocarItemsDecoradoresDentroHome(datos, id, pago, tipo){
	// tipo 1 es piso y 0 normal
	console.log(proyectoBlack.proyectos);
	for (var i = 0; i < proyectoBlack.proyectos.length; i++) {
		// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
		if (id == proyectoBlack.proyectos[i].id) {
			proyectoObject = proyectoBlack.proyectos[i];
		}  
	}
	data=datos;
	id_proyecto=id;
	var alto=[];
	var ancho=[];
	var htmltxt=""; 
	if(tipo==0) {

		console.log(data);
		var maxitems=5; 
		if(data.length<5) maxitems=data.length;
			for (var i = 0; i < maxitems; i++) {  
				if(data[i].activo==2) { if(data.length>5){ maxitems++; } } else {
				htmltxt=htmltxt+'<div id="itemchoosedecorator1" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: black; background-color: white; padding-bottom:4%; padding-top:4%; height:auto" class="row-eq-height col-xs-12" >';
				if(i==0){
					htmltxt+='<a   style="position: absolute;right: 3px; top: 0px; color: black; cursor: pointer;" data-dismiss="modal"	> ';
					htmltxt+='<i class="fa fa-times" aria-hidden="true"></i>';
					htmltxt+='</a> ';
				}
				
				if(alto[i]<=ancho[i]){
					htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="    width:80px;height:80px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center">';
					htmltxt=htmltxt+'<img alt="cara" style=" margin-left: -15px;width:100%;height:auto;" src="'+data[i].imagenCara+'">';
					htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-sm-9" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
				}else {
					htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="   width:80px;height:80px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center">';
					htmltxt=htmltxt+'<img alt="cara" style=" margin-left: -15px; width:auto;height:100%; " src="'+data[i].imagenCara+'">';
					htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-sm-9" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
				}
				
				htmltxt=htmltxt+'<div class="col-xs-12" style="display:table; height: 100%; text-align: left;"><span style=" display: table-cell; vertical-align: middle;">'+ data[i].tipo+'</span></div>';
				htmltxt=htmltxt+'</div><div id="rrss_choose" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;"><div id="rrss_encuadre" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;">';
				
		
				var urlRss=getRRSS(data[i].rrss);
				//console.log(urlRss);
				if(urlRss=="" || urlRss==null){ 
				}else {
				for(var ij=0;ij<urlRss.length;ij++){ 
					if(urlRss[ij].length>0){
						htmltxt+='<a  href="'+ urlRss[ij] +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> ';
						
						
						if(ij==0)
							htmltxt+='<i class="fa fa-facebook facebook-icon" aria-hidden="true"> </i>';
						else if(ij==1)
							htmltxt+='<i class="fa fa-instagram facebook-icon" aria-hidden="true"> </i>';
						else if(ij==2)
							htmltxt+='<i	class="fa fa-twitter facebook-icon"> </i>';
						else if(ij==3)
							htmltxt+='<i	class="fa fa-pinterest facebook-icon"> </i>';
						else if(ij==4)
							htmltxt+='<i class="fa fa-behance-square facebook-icon" aria-hidden="true"></i>';
						else if(ij==5)
							htmltxt+='<i class="fa fa-linkedin-square facebook-icon" aria-hidden="true"></i>';
			
						htmltxt+='</a> ';
					}
				}
				}
				if(data[i].blog!=null && data[i].blog.length>0)
					htmltxt+='<a  href="'+ data[i].blog +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> <i class="fa fa-wordpress" aria-hidden="true"></i></a>';
				htmltxt+='</div></div><div class="col-xs-12">';
				 
				htmltxt+='<div id="conocememas" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-sm-6 col-xs-12 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard  " onclick="lanzarportfolioindividual('+ data[i].id +','+ i +',\''+ data[i].imagenPrincipal +'\',\''+ data[i].tipo +'\',\''+ id_proyecto +'\')">conóceme más</a></div>';
				htmltxt+='<div id="contratar" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-sm-6 col-xs-12 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard_invertido  " onclick="seleccionarDecoradorHome('+ data[i].id +','+id_proyecto+','+pago+')" >contratar</a></div>';
				htmltxt+='</div></div></div></div>';
				}
		 	
			} 
			//QUITAR BLACK
			if(proyectoObject.pagado==2) { 
				htmltxt+='<div id="todos-diseñadores" style="z-index: 1; text-align: center; padding:0px!important;" class="col-xs-12 letra-s letra-mayusculas "><a class="buttonstandard  " style="border:0;border-top:1px solid black;" onclick="elegirDecoradorBlack('+id_proyecto+')" href="#">todos los diseñadores</a></div>';
			} else {
				htmltxt+='<div id="todos-diseñadores" style="z-index: 1; text-align: center; padding:0px!important;" class="col-xs-12 letra-s letra-mayusculas "><a class="buttonstandard  " style="border:0;border-top:1px solid black;" onclick="elegirDecorador('+id_proyecto+')" href="#">todos los diseñadores</a></div>';
			}
	} else { 
		var maxitems=data.length;
		console.log(maxitems);
		for (var i = 0; i < maxitems; i++) { 
		if(data[i].btb==1) {
			if(data[i].activo==2) {   } else {
			htmltxt=htmltxt+'<div id="itemchoosedecorator1" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: black; background-color: white; padding-bottom:4%; padding-top:4%; height:auto" class="row-eq-height col-xs-12" >';
			if(i==0){
				htmltxt+='<a   style="position: absolute;right: 3px; top: 0px; color: black; cursor: pointer;" data-dismiss="modal"	> ';
				htmltxt+='<i class="fa fa-times" aria-hidden="true"></i>';
				htmltxt+='</a> ';
			}
			
			if(alto[i]<=ancho[i]){
				htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="    width:80px;height:80px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center">';
				htmltxt=htmltxt+'<img alt="cara" style=" margin-left: -15px;width:100%;height:auto;" src="'+data[i].imagenCara+'">';
				htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-sm-9" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
			}else {
				htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="   width:80px;height:80px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center">';
				htmltxt=htmltxt+'<img alt="cara" style=" margin-left: -15px; width:auto;height:100%; " src="'+data[i].imagenCara+'">';
				htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-sm-9" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
			}
			
			htmltxt=htmltxt+'<div class="col-xs-12" style="display:table; height: 100%; text-align: left;"><span style=" display: table-cell; vertical-align: middle;">'+ data[i].tipo+'</span></div>';
			htmltxt=htmltxt+'</div><div id="rrss_choose" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;"><div id="rrss_encuadre" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;">';
			
	
			var urlRss=getRRSS(data[i].rrss);
			//console.log(urlRss);
			if(urlRss=="" || urlRss==null){ 
			}else {
			for(var ij=0;ij<urlRss.length;ij++){ 
				if(urlRss[ij].length>0){
					htmltxt+='<a  href="'+ urlRss[ij] +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> ';
					
					
					if(ij==0)
						htmltxt+='<i class="fa fa-facebook facebook-icon" aria-hidden="true"> </i>';
					else if(ij==1)
						htmltxt+='<i class="fa fa-instagram facebook-icon" aria-hidden="true"> </i>';
					else if(ij==2)
						htmltxt+='<i	class="fa fa-twitter facebook-icon"> </i>';
					else if(ij==3)
						htmltxt+='<i	class="fa fa-pinterest facebook-icon"> </i>';
					else if(ij==4)
						htmltxt+='<i class="fa fa-behance-square facebook-icon" aria-hidden="true"></i>';
					else if(ij==5)
						htmltxt+='<i class="fa fa-linkedin-square facebook-icon" aria-hidden="true"></i>';
		
					htmltxt+='</a> ';
				}
			}
			}
			if(data[i].blog!=null && data[i].blog.length>0)
				htmltxt+='<a  href="'+ data[i].blog +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> <i class="fa fa-wordpress" aria-hidden="true"></i></a>';
			htmltxt+='</div></div><div class="col-xs-12">';
			 
			htmltxt+='<div id="conocememas" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-sm-6 col-xs-12 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard  " onclick="lanzarportfolioindividual('+ data[i].id +','+ i +',\''+ data[i].imagenPrincipal +'\',\''+ data[i].tipo +'\',\''+ id_proyecto +'\')">conóceme más</a></div>';
			htmltxt+='<div id="contratar" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-sm-6 col-xs-12 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard_invertido  " onclick="seleccionarDecoradorHome('+ data[i].id +','+id_proyecto+','+pago+')" >contratar</a></div>';
			htmltxt+='</div></div></div></div>';
			}
		}
		} 
		
	}
	//console.log(htmltxt);
	$('#divforescogerdecoradordentro').html(htmltxt);

	

	
}

function elegirDecorador(id){ 
	setCookie("proyectoParaDecorador", id, 365);
	var href = urlbase + "/decoradores-online.html";
	window.location = href; 
}

function colocarItemsDecoradoresDentroSeleccionar(datos){
	data=datos;
	 
	var htmltxt="";
var maxitems=5;
if(data.length<5) maxitems=data.length;
	for (var i = 0; i < maxitems; i++) {
			
		htmltxt=htmltxt+'<div id="itemchoosedecorator1" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: black; background-color: white; padding-bottom:4%; padding-top:4%; " class="row-eq-height " >';
		if(i==0){
			htmltxt+='<a   style="position: absolute;right: 3px; top: 0px; color: black; cursor: pointer;" data-dismiss="modal"	> ';
			htmltxt+='<i class="fa fa-times" aria-hidden="true"></i>';
			htmltxt+='</a> ';
		}
		htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="">';
		htmltxt=htmltxt+'<img alt="cara" style="padding: 5%; min-width: 75px; width:90%; border-radius: 50%; border-style: solid; border-color: white; border-width: medium;" src="'+data[i].imagenCara+'">';
		htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-bordered" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
		htmltxt=htmltxt+'<div class="col-xs-12" style="display:table; height: 100%; text-align: left;"><span style=" display: table-cell; vertical-align: middle;">'+ data[i].tipo+'</span></div>';
		htmltxt=htmltxt+'</div><div id="rrss_choose" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;"><div id="rrss_encuadre" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;">';
		
		
		var urlRss=getRRSS(data[i].rrss);
		//console.log(urlRss);
		for(var ij=0;ij<urlRss.length;ij++){
			if(urlRss[ij].length>0){
				htmltxt+='<a  href="'+ urlRss[ij] +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> ';
				
				
				if(ij==0)
					htmltxt+='<i class="fa fa-facebook facebook-icon" aria-hidden="true"> </i>';
				else if(ij==1)
					htmltxt+='<i class="fa fa-instagram facebook-icon" aria-hidden="true"> </i>';
				else if(ij==2)
					htmltxt+='<i	class="fa fa-twitter facebook-icon"> </i>';
				else if(ij==3)
					htmltxt+='<i	class="fa fa-pinterest facebook-icon"> </i>';
				else if(ij==4)
					htmltxt+='<i class="fa fa-behance-square facebook-icon" aria-hidden="true"></i>';
				else if(ij==5)
					htmltxt+='<i class="fa fa-linkedin-square facebook-icon" aria-hidden="true"></i>';
	
				htmltxt+='</a> ';
			}
		}
		if(data[i].blog!=null && data[i].blog.length>0)
			htmltxt+='<a  href="'+ data[i].blog +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> <i class="fa fa-wordpress" aria-hidden="true"></i></a>';
		htmltxt+='</div></div><div class="col-xs-12">';
		
		
		htmltxt=htmltxt+'<div id="conocememas" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-xs-6 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard  " onclick="lanzarportfolioindividual('+ data[i].id +','+ i +',\''+ data[i].imagenPrincipal +'\',\''+ data[i].tipo +'\')">conóceme más</a></div>';
		htmltxt=htmltxt+'<div id="contratar" style="z-index: 1; text-align: center; padding-left: .5vw;" class="col-xs-6 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard_invertido  " onclick="seleccionarDecoradorDentro('+ data[i].id +')" >contratar</a></div>';
		htmltxt=htmltxt+'</div></div></div></div>';

		
	}
	htmltxt=htmltxt+'<div id="todos-diseñadores" style="z-index: 1; text-align: center; padding:0px!important;" class="col-xs-12 letra-s letra-mayusculas "><a class="buttonstandard"  style="border:0;border-top:1px solid black;" href="#">todos los diseñadores</a></div>';
	
	//console.log(htmltxt);
	$('#divforescogerdecoradordentro').html(htmltxt);
	

	
}

// MISMA FUNCION QUE LA ANTERIOR PERO PARA BEFORE
function colocarItemsDecoradoresDentroSeleccionarBefore(datos){
	data=datos;
	 
	var htmltxt="";
var maxitems=5;
if(data.length<5) maxitems=data.length;
	for (var i = 0; i < maxitems; i++) {
			
		htmltxt=htmltxt+'<div id="itemchoosedecorator1" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: black; background-color: white; padding-bottom:4%; padding-top:4%; " class="row-eq-height " >';
		if(i==0){
			htmltxt+='<a   style="position: absolute;right: 3px; top: 0px; color: black; cursor: pointer;" data-dismiss="modal"	> ';
			htmltxt+='<i class="fa fa-times" aria-hidden="true"></i>';
			htmltxt+='</a> ';
		}
		htmltxt=htmltxt+'<div id="foto" class="col-xs-3" style="">';
		htmltxt=htmltxt+'<img alt="cara" style="padding: 5%; min-width: 75px; width:90%; border-radius: 50%; border-style: solid; border-color: white; border-width: medium;" src="'+data[i].imagenCara+'">';
		htmltxt=htmltxt+'</div><div id="componentes" class="col-xs-8 col-sm-9 col-bordered" style="padding-right: 0px"><div id="nombre_choose" class="col-xs-12  letra-xs letra-mayusculas letra-negrita">';
		htmltxt=htmltxt+'<div class="col-xs-12" style="display:table; height: 100%; text-align: left;"><span style=" display: table-cell; vertical-align: middle;">'+ data[i].tipo+'</span></div>';
		htmltxt=htmltxt+'</div><div id="rrss_choose" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;"><div id="rrss_encuadre" class="col-xs-12 letra-xs letra-mayusculas letra-negrita" style="text-align: left;">';
		
		
		var urlRss=getRRSS(data[i].rrss);
		//console.log(urlRss);
		for(var ij=0;ij<urlRss.length;ij++){
			if(urlRss[ij].length>0){
				htmltxt+='<a  href="'+ urlRss[ij] +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> ';
				
				
				if(ij==0)
					htmltxt+='<i class="fa fa-facebook facebook-icon" aria-hidden="true"> </i>';
				else if(ij==1)
					htmltxt+='<i class="fa fa-instagram facebook-icon" aria-hidden="true"> </i>';
				else if(ij==2)
					htmltxt+='<i	class="fa fa-twitter facebook-icon"> </i>';
				else if(ij==3)
					htmltxt+='<i	class="fa fa-pinterest facebook-icon"> </i>';
				else if(ij==4)
					htmltxt+='<i class="fa fa-behance-square facebook-icon" aria-hidden="true"></i>';
				else if(ij==5)
					htmltxt+='<i class="fa fa-linkedin-square facebook-icon" aria-hidden="true"></i>';
	
				htmltxt+='</a> ';
			}
		}
		if(data[i].blog!=null && data[i].blog.length>0)
			htmltxt+='<a  href="'+ data[i].blog +'" style="cursor: pointer; margin-left: 1px;margin-right: 1px;"	target="_blank"> <i class="fa fa-wordpress" aria-hidden="true"></i></a>';
		htmltxt+='</div></div><div class="col-xs-12">';
		
		
		htmltxt=htmltxt+'<div id="conocememas" style="z-index: 1; text-align: center; padding-right: .5vw;" class="col-xs-6 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard  " onclick="lanzarportfolioindividual('+ data[i].id +','+ i +',\''+ data[i].imagenPrincipal +'\',\''+ data[i].tipo +',\''+ id_proyecto +'\')">conóceme más</a></div>';
		htmltxt=htmltxt+'<div id="contratar" style="z-index: 1; text-align: center; padding-left: .5vw;" class="col-xs-6 letra-xxs letra-mayusculas letra-negrita"><a class="buttonstandard_invertido  " onclick="seleccionarDecoradorDentroBefore('+ data[i].id +')" >contratar</a></div>';
		htmltxt=htmltxt+'</div></div></div></div>';

		
	}
	htmltxt=htmltxt+'<div id="todos-diseñadores" style="z-index: 1; text-align: center; padding:0px!important;" class="col-xs-12 letra-s letra-mayusculas "><a class="buttonstandard  " style="border:0;border-top:1px solid black;" href="'+urlbase + '/decoradores-online.html">todos los diseñadores</a></div>';
	
	//console.log(htmltxt);
	$('#divforescogerdecoradordentro').html(htmltxt);
	

	
}

// metodo para añadir decorador pasando id de proyecto
function seleccionarDecorador(id, pago){
	var id_proyecto= id;
	
	$('#divforescogerdecoradordentro').html('<div id="loading" class="col-xs-12" style=" height:200px; background: url(img/forHomeApp/default.svg) center center no-repeat;">');
	$('#modalforchoosedecorator').modal('show');
	
	try {
		

						$.ajax({
				  			// /type:"POST",
				  			dataType : "json",
				  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				  			url : urlbaseForAjax + '/DecoradoresController',
				  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

				  			data : {
				  				token : "token",
				  				action : "getPisos",
				  				id_proyecto : id_proyecto
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) { 
				  				console.log(data);
				  				piso=data;
				  				if(piso==0) {

				  						$.ajax({
				  							// /type:"POST",
				  							dataType : "json",
				  							// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				  							url : urlbaseForAjax + '/GetPortfolio',
				  							
				  							// url:
				  							// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				  							data : {tipo :'Decoradores', lista:'proyectos'},
				  							// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  							contentType : "application/json; charset=utf-8",
				  							success : function(data) {  
				  								var decoradores=data;
				  								//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
				  								localStorage.removeItem('portfolio_decoradores');
				  								localStorage.setItem('portfolio_decoradores', JSON.stringify(data));
			  									colocarItemsDecoradoresDentroHome(decoradores, id_proyecto, pago, piso); 

				  							},
				  							error: function (request, status, error) {
				  								$('#modalforchoosedecorator').modal('hide');
				  							}
				  						});
				  						
				  				} else {
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
			  								var decoradores=data;
			  								//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
			  								localStorage.removeItem('portfolio_decoradores');
			  								localStorage.setItem('portfolio_decoradores', JSON.stringify(data));
		  									colocarItemsDecoradoresDentroHome(decoradores, id_proyecto, pago, piso); 

			  							},
			  							error: function (request, status, error) {
			  								$('#modalforchoosedecorator').modal('hide');
			  							}
			  						});
				  				}
							},
					        error : function(xhr, status) { 
					        	cerrarCargando();
					        },  
					        complete : function(xhr, status) { 
					        	cerrarCargando();
					        }
						});	
						

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		$('#modalforchoosedecorator').modal('hide');
		// put any code you want to execute if there<'s an exception here

	}
	
	
	
}
function seleccionadecorador(){
	$('#modalforchoosedecorator').modal('show');
	
	try {
		

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

						console.log(data);
						//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
						localStorage.removeItem('portfolio_decoradores');
						localStorage.setItem('portfolio_decoradores', JSON.stringify(data));
						colocarItemsDecoradoresDentroSeleccionar(data);
						
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
// MISMA QUE LA ANTERIOR PERO PARA BEFORE

function seleccionadecoradorBefore(){
	$('#modalforchoosedecorator').modal('show');
	
	try {
		
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

						console.log(data);
						//alert(data[0].imagenPrincipal+ '  '+ data[0].tipo);
						localStorage.removeItem('portfolio_decoradores');
						localStorage.setItem('portfolio_decoradores', JSON.stringify(data));
						colocarItemsDecoradoresDentroSeleccionarBefore(data);
						
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
// funcion para añadir decorador a base de datos con id_proyecto


function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
	
function seleccionarDecoradorDentro(id){
	$('#modalforchoosedecorator').modal('hide');
	setCookie("id_decorador_seleccionado", id, 365);
	setTimeout(function() {
		continuarAfterMoodboard();
	}, 1000);
	
}
function seleccionarDecoradorDentroBefore(id){
	$('#modalforchoosedecorator').modal('hide');
	setCookie("id_decorador_seleccionado", id, 365);
	setTimeout(function() {
		continuarBeforeMoodboard();
	}, 1000);
	
}
function loginForPAso3(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;

	var id_del_proyecto_a_cargar = getParameterByName("id"); 
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null || id_del_proyecto_a_cargar=="null"){
		id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	}

	// BootstrapDialog.alert('login');
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/

		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 3,
						id_proyecto: id_del_proyecto_a_cargar
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						var user_ajax = data.userName;
						proyectos_ajax = data.proyectos;
						
						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");

							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							}  
							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
									proyectoObject = proyectos_ajax[i]; 
								}  
							}
							cargarProjectoPaso3(id_del_proyecto_a_cargar);
							
							var array=[];
							array[0]=proyectoObject.nombreProyectDecorador;
							array[1]=proyectoObject.id;
							array[2]=data.userName;
							array[3]=data.id;
							array[4]=proyectoObject.idDecorador; 
							
							
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							 
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							
							 
							
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);

						} 
						try {
							goChat(user_ajax,id_del_proyecto_a_cargar,150, array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						} 
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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

function loginForPAso4(lg_user, lg_pass) {
	var $lg_username = lg_user;
	var $lg_password = lg_pass;
	var $formLogin = $('#login-form');
	var $formLost = $('#lost-form');
	var $formRegister = $('#register-form');
	var $divForms = $('#div-forms');
	var $modalAnimateTime = 300;
	var $msgAnimateTime = 150;
	var $msgShowTime = 2000;

	var id_del_proyecto_a_cargar = getParameterByName("id"); 
	if(id_del_proyecto_a_cargar=="" || id_del_proyecto_a_cargar==null || id_del_proyecto_a_cargar=="null"){
		id_del_proyecto_a_cargar = getCookie("id_proyectoglobal");
	}

	// BootstrapDialog.alert('login');
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/GetUser',
					url : urlbaseForAjax + '/GetUser',
					data : {
						mail : $lg_username,
						pass : $lg_password,
						detail_level: 4,
						id_proyecto: id_del_proyecto_a_cargar
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						var id_ajax = data.id;
						var mail_ajax = data.mail;
						var user_ajax = data.userName;
						proyectos_ajax = data.proyectos;

						if (id_ajax < 0) {
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"error", "glyphicon-remove",
									"Algun dato es incorrecto");
							clearAllCookies();
						} else {
							console.log(data);
							
							// BootstrapDialog.alert(proyectos_ajax[0].id+"");
							msgChange($('#div-login-msg'),
									$('#icon-login-msg'), $('#text-login-msg'),
									"success", "glyphicon-ok",
									"Datos Correctos");

							// var codeusername='<ul class="nav navbar-nav
							// navbar-right">';
							var codeusername = '';
							codeusername += '<li id="liforsustitution" class="dropdown ">';
							codeusername += '<a href="#" class="dropdown-toggle  colornegro letraAriallogin  interspaciado_2" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i style="margin-right:5px;" class="fa fa-user" aria-hidden="true"></i>'
									+ user_ajax
									+ '<span class="caret"></span></a>';
							codeusername += '<ul class="dropdown-menu">';
							if(proyectos_ajax.length<=1){ 
								codeusername += '<li class="dropdown-header" style="color:grey;padding-top:8px" onclick="">Lista de proyectos</li>';
							}else {
								codeusername += '<li class="dropdown-header colornegro " style="cursor:pointer;padding-top:8px" onclick="aHomeUsuarios()">Lista de proyectos</li>';
							}  
							for (var i = 0; i < proyectos_ajax.length; i++) {
								// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
								if (id_del_proyecto_a_cargar == proyectos_ajax[i].id) {
									proyectoObject = proyectos_ajax[i];
								}  
							}
							idDecorador=proyectoObject.idDecorador;
							cargarProjectoPaso4(id_del_proyecto_a_cargar);
							var urlforhome = urlbase;
							codeusername += '<li role="separator" class="divider"></li>';
							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '/decoracion-online.html" onclick="nuevoProyecto()">Iniciar nuevo proyecto</a></li>';
							codeusername += ' <li role="separator" class="divider"></li>';

							codeusername += '<li><a class=" colornegro letraAriallogin  interspaciado_2" href="'
									+ urlforhome
									+ '" onclick="logoutFunction()">Cerrar sesión</a></li>';

							codeusername += '</ul>';
							codeusername += ' </li>';
							// codeusername+='</ul>';
							// BootstrapDialog.alert(codeusername);
							// var item =
							// document.getElementById("ulforsustitution").lastChild;

							// Replace the first child node of <ul> with the
							// newly created text node
							// item.re2placeChild(codeusername, item);
							$('#liforsustitution').remove();
							$('#ulforsustitution').append(codeusername);
							// $('#check_login_recuerdame').html(codeusername);
							
							// BootstrapDialog.alert(proyectos_ajax[0].preferencia.habitacion);
							/*
							 * var paso1coockie= getCookie("paso1"); try{
							 * if(proyectos_ajax[0].preferencia.habitacion!="" ){
							 * if(paso1coockie=="" ){
							 * cargarProjecto(proyectos_ajax[0].id); } } } catch
							 * (e) {
							 *  }
							 */
							var array=[];
							array[0]=proyectoObject.nombreProyectDecorador;
							array[1]=proyectoObject.id;
							array[2]=data.userName;
							array[3]=data.id;
							array[4]=proyectoObject.idDecorador; 
							
							if (checklogintosave == 1) {
								saveAndInitProject();
								checklogintosave = 0;
							}

							setTimeout(function() {
								$('#login-modal').modal('hide');
							}, 1500);

						} 
						try {
							goChat(user_ajax,id_del_proyecto_a_cargar,150, array); 
						} catch (e) {
							console.log("no cargó el chat, conexión lenta")
						} 
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        } 
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		cerrarCargando();
	}

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
// AJAX


function getColorsModBoardFilter() {
	// BootstrapDialog.alert("aaaaaaaadddd");
	var p_4 = getCookie("paso4");
	// BootstrapDialog.alert(p_4);
	try {
		
		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/GetColorsModBoard',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {
						paso4 : p_4
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// BootstrapDialog.alert("register:);
						// $usuarioGlobal=data;

						var html = '';

						html += '<div style="width: 100%; text-align: center;">'; 
						html += '<h4 class="titulo_pantalla">COLORES</h4> <h4 class="subtitulo_pantalla" style="margin-bottom:3%"> ';
						html += '<p class="letra-s">Selecciona 3 colores de las siguientes paletas que encajen con tu idea</p> </h4> '; 
						html += '<div  class=" container-fluid  text-center">'

						for (var i = 0; i < data.length; i++) {
							html += '<div class="col-md-4 col-sm-6 col-xs-12" >'
							html += '<div><img style="width: 100%;" src="img/colores_modboard/'
									+ data[i].nombreImagen
									+ '" alt="'
									+ data[i].nombreImagen + '" /></div>'
							html += '<div><div class="row row_without_padding" >'
							for (var j = 1; j <= 6; j++) {
								var object_use = data[i];
								var nombre_color = 'color' + j;

								html += '<div class="cc_modboard_padding cc-selector-2 col-xs-2 " onclick="checkRadioButtonsPaso7()" >'
								html += '<input type="checkbox" name="radioColorMod" id="'
										+ object_use[nombre_color]
										+ '" style="display: none;" value="'
										+ object_use[nombre_color] + '" />';
								html += '<label style="background-color: #'
										+ object_use[nombre_color]
										+ '; width: 100%; height: 100px;"  class="drinkcard-cc_mod separacionBottom_20" for="'
										+ object_use[nombre_color] + '"> ';
								html += '<img style="background-color: #'
										+ object_use[nombre_color]
										+ '; width: 100%; height: 100%;"  /></label></div>';

							}

							html += '</div></div></div>';

						}
						html += '</div>';
						html += '<div class="row   text-center separacionSuperior_botonera"> <button type="button" href="#myCarousel" data-slide="prev" onclick="clickAnterior()" class="boton-anterior  separacionDerecha_5"></button>';
						html += '<button type="button" id="botonSiguientePaso7" href="#myCarousel" data-slide="next" class="boton-siguiente  separacionIzq_5 disabled" onclick="clickSiguientePaso7()"></button></div>';
						html += '<br/>'
						html += '<br/>'
						// BootstrapDialog.alert(html);
						$('#divforcolorss').html(html);
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}
function getImagesFilter() {

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
					crossOrigin: true,
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
						//VerifyInput(dato);
						//alert(data);
						/*var dato=JSON.stringify(data);
						alert(dato);
						data=JSON.parse(dato);*/
						var html = '';
						html += '<div style="width: 100%; text-align: center;">'; 
						html += '<h4 class="titulo_pantalla">IMÁGENES</h4> <h4 class="subtitulo_pantalla" style="margin-bottom:3%"> ';
						html += '<p class="letra-s">Selecciona 3 fotografías que te inspiren.</p> </h4> ';
						html += '<div id="divforimages" class="masonry container-fluid  text-center" >';
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
						html += '<br/>'
						html += '<br/>'
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
/*function VerifyInput(input){
    for(var x=0; x<input.length; ++x){
        let c = input.charCodeAt(x);
        if(c >= 0 && c <= 31){
            throw 'problematic character found at position ' + x;
            alert(x);
        }
    }
}*/
function getSensacionesFilter() {

	var p_1 = getCookie("paso1");

	var p_4 = getCookie("paso4");

	try {
		

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/GetSensaciones',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {
						paso1 : p_1,
						paso4 : p_4
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// BootstrapDialog.alert("register:");
						// $usuarioGlobal=data;
						var html = '';
						html += '<div style="width: 100%; text-align: center;">';
						html += '<h4 class="titulo_pantalla">SENSACIONES</h4> <h4 class="subtitulo_pantalla" style="margin-bottom:3%"> ';
						html += '<p class="letra-s">La vida para ti son estas 2 cosas (entre muchas otras claro...)</p> </h4> '; 
						
						html += '<div  class="masonry container-fluid  text-center">'
						for (var i = 0; i < data.length; i++) {

							html += '<div style="position: relative;"  class="cc-selector" onclick="checkRadioButtonsPaso8a()">';
							html += '<input type="checkbox" name="radioSensacionesMod" id="sensations_'
									+ data[i].nombre
									+ '" style="display: none;" value="'
									+ data[i].nombre + '" />';
							html += '<label  class="drinkcard-cc separacionBottom_20" for="sensations_'
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
						html += '<div class="row   text-center separacionSuperior_botonera"> <button type="button" href="#myCarousel" data-slide="prev" onclick="clickAnterior()" class="boton-anterior  separacionDerecha_5 "></button>';
						html += '<button type="button" id="botonSiguientePaso8a" href="#myCarousel" data-slide="next" class="boton-siguiente  separacionIzq_5 disabled" onclick="clickSiguientePaso8a()"></button></div>';
						html += '<br/>'
						html += '<br/>'
						// BootstrapDialog.alert(html);
						$('#divforsensaciones').html(html);
					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}

function getFrasesFilter() {

	var p_1 = getCookie("paso1");

	var p_4 = getCookie("paso4");

	try {
		

		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/GetFrases',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {
						paso1 : p_1,
						paso4 : p_4
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// BootstrapDialog.alert("register:");
						// $usuarioGlobal=data;
						//alert(data.length);
						var html = '';
						html += '<div style="width: 100%; text-align: center;">'; 
						html += '<h4 class="titulo_pantalla">FRASES</h4> <h4 class="subtitulo_pantalla" style="margin-bottom:3%"> ';
						html += '<p class="letra-s">Unas palabras que te inspiren...</p> </h4> '; 
						
						html += '<div  class="masonry container-fluid  text-center">'
						for (var i = 0; i < data.length; i++) {

							html += '<div style="position: relative;"  class="cc-selector" onclick="checkRadioButtonsPaso8b()">';
							html += '<input type="checkbox" name="radioSensacionesModb" id="sensations_'
									+ data[i].nombre
									+ '" style="display: none;" value="'
									+ data[i].nombre + '" />';
							html += '<label  class="drinkcard-cc separacionBottom_20" for="sensations_'
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
						html += '<div class="row   text-center separacionSuperior_botonera"> <button type="button" href="#myCarousel" data-slide="prev" onclick="clickAnterior()" class="boton-anterior  separacionDerecha_5 "></button>';
						html += '<button type="button" id="botonSiguientePaso8b" href="#myCarousel" data-slide="next" class="boton-siguiente  separacionIzq_5 disabled" onclick="clickSiguientePaso8b()"></button></div>';
						html += '<br/>'
						html += '<br/>'
						// BootstrapDialog.alert(html);
						$('#divforfrases').html(html);
					},         
			        error : function(xhr, status) { 
			        	cerrarCargando();
			        },  
			        complete : function(xhr, status) { 
			        	cerrarCargando();
			        }
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}

function deleteProjecto(id){
	
	BootstrapDialog
	.confirm({
		title : '.ADVERTENCIA.',
		message : '¡Cuidado! Si eliminas este proyecto perderás todos los datos y no se podrán recuperar',
		type : BootstrapDialog.TYPE_PRIMARY, // <--
												// Default
												// value
												// is
												// BootstrapDialog.TYPE_PRIMARY
		closable : true, // <-- Default value
							// is false
		draggable : true, // <-- Default value
							// is false
		btnCancelLabel : 'MEJOR NO', // <--
										// Default
										// value
										// is
										// 'Cancel',
		btnOKLabel : '¡ELIMÍNALO!', // <--
									// Default
									// value is
									// 'OK',
		btnOKClass : 'btn-warning', // <-- If
									// you
									// didn't
									// specify
									// it,
									// dialog
									// type will
									// be used,
		callback : function(result) {
			// result will be true if button was
			// click, while it will be false if
			// users close the dialog directly.
			if (result) {
				try {
					
					$.ajax({
								// /type:"POST",
								dataType : "json",
								// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
								url : urlbaseForAjax + '/DeleteProject',
								// url:
								// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
								data : {
									id_proyecto : id
								},
								// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
								contentType : "application/json; charset=utf-8",
								success : function(data) {
									// BootstrapDialog.alert("register:");
									// $usuarioGlobal=data;
									if (data != 0) {
										BootstrapDialog.alert("error");
									} else {
										var href = urlbase + "/Home.html";
										window.location = href;

									}

								}
							});

				} catch (e) {
					BootstrapDialog
							.alert('Se ha producido un error en la conexión con el servidor');
					// put any code you want to execute if there's an exception here

				}
				
			} else {

			}
		}
	});
	
	
	
}
function deleteProject() {
	// BootstrapDialog.alert(id_proyectoglobal);
	var id_proyectoglobal = getCookie("id_proyectoglobal");
	try {
		
		$
				.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
					url : urlbaseForAjax + '/DeleteProject',
					// url:
					// 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
					data : {
						id_proyecto : id_proyectoglobal
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// BootstrapDialog.alert("register:");
						// $usuarioGlobal=data;
						if (data != 0) {
							BootstrapDialog.alert("error");
						} else {
							BootstrapDialog
									.confirm({
										title : '.ADVERTENCIA.',
										message : '¡Cuidado! Si eliminas este proyecto perderás todos los datos y no se podrán recuperar',
										type : BootstrapDialog.TYPE_PRIMARY, // <--
																				// Default
																				// value
																				// is
																				// BootstrapDialog.TYPE_PRIMARY
										closable : true, // <-- Default value
															// is false
										draggable : true, // <-- Default value
															// is false
										btnCancelLabel : 'MEJOR NO', // <--
																		// Default
																		// value
																		// is
																		// 'Cancel',
										btnOKLabel : '¡ELIMÍNALO!', // <--
																	// Default
																	// value is
																	// 'OK',
										btnOKClass : 'btn-warning', // <-- If
																	// you
																	// didn't
																	// specify
																	// it,
																	// dialog
																	// type will
																	// be used,
										callback : function(result) {
											// result will be true if button was
											// click, while it will be false if
											// users close the dialog directly.
											if (result) {
												setCookie("nuevo_Proyecto",
														"1", 365);
												var href = urlbase + "/decoracion-online.html";
												window.location = href;
											} else {

											}
										}
									});

						}

					}
				});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidora');
		// put any code you want to execute if there's an exception here

	}
}
 

 
function cargarProjectoCTM(id) {

	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365);
	cargarDropzonePlanos(true);

}
function cargarProjectoPaso1(id) {

	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365);
	 
	console.log(proyectoObject);
	if(proyectoObject.pagado<=0){
		var href = urlbase + '/Home.html';
		window.location = href; 
	} else {
		 
		
		
		
		
		var listmoodboard="";
		listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
		
		var tipoHabi="";
		var k="";
		for(var l = 0; l < proyectoObject.preferencias.length; l++) {
			if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}	
		var f="";
		var items=0; 
		for(var j = 0; j < proyectoObject.preferencias.length; j++) {
				var id_moodboard = proyectoObject.preferencias[j].id_moodboard;   
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
						tipoHabi="noColocar";
					} else { tipoHabi="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
						listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
						listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
		var FechaEstado = new Date(proyectoObject.fechaestado);
		var Hoy = new Date();
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
				  total ='( Responderá en menos de '+total+' días )'; 
				  if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ) {total=""; }
			  } else if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ total=""; } else {
				  total= '( El decorador no cumplió el plazo, estamos tratando de solucionarlo )'; } 
	    var alto=[];
		var ancho=[];
		var mi_imagen = new Image();
		mi_imagen.src=' '+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador;  
		mi_imagen.onload = function () {
		  ancho=this.width;
		  alto=this.height;
		}  
		var nombreProyecto="";
		var title="";
		 
		
		if (proyectoObject.projectsStates.turnoDe=="usuario") {
			if (decoradorDias<0) {  
				  var dias = decoradorDias / 86400000;  
				  dias=Math.ceil(dias);
				  if (dias==0) {
					  dias="( Estás en este paso desde hoy )";
				  } else {
					  if (dias==-1){
						  dias="( Estás en este paso desde hace "+dias*-1+" día )";
					  } else { dias="( Estás en este paso desde hace "+dias*-1+" días )"; }
				  }
			} else { dias=""; }
			if (proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ 
				title = "";
			} else {
				title = dias;
			}
		} else {
			title = total;
		}
		
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
		if(alto<=ancho){
			chat+='<div id="imagencara" style="padding:0;text-align:center; border-radius: 50%; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
			chat+='<img alt="cara" style="width:auto;height:100%;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}else {
			chat+='<div id="imagencara" style="padding-left:0;margin-left:15px; margin-top: 15px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center" class="col-xs-12">';
			chat+='<img alt="cara" id="cara" style="width:100%;height:auto;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}
		if(proyectoObject.nombreDecorador.length>15){
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
		} else {
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
		}
		chat+= proyectoObject.nombreDecorador +'</div>';
		chat+='</div>';
		if(proyectoObject.estado<200){
			chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()" style="margin-bottom:10px; float: left">¿No he leído tus mensajes? ¡Avísame!</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
			chat += '</div>';
		} else {
			chat += '<div class="letra-s buttonstandard_invertido aviso"  style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no puedes escribír a este decorador" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
			chat += '</div>';
		}  

		$('.chat').html(chat); 
		$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'">');
		 
		$('#nombreProyecto').append(proyectoObject.tituloProyecto);
		$('#estadoProyecto').append(proyectoObject.projectsStates.texto_usuarios);
		if(title!=""){
			$('#estadoProyecto').prop('title', title);
		}
		crearbotones_grandes_pasos(); 
		setFormularioPaso1(); 
	}
}
function cargarProjectoPaso2(id) {

	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365);  
	
	  

	if(proyectoObject.estado<21){
		var href = urlbase + '/Home.html';
		window.location = href; 
	} else {
		
	  
		var listmoodboard="";
		listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
		
		var tipoHabi="";
		var k="";
		for(var l = 0; l < proyectoObject.preferencias.length; l++) {
			if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}	
		var f="";
		var items=0; 
		for(var j = 0; j < proyectoObject.preferencias.length; j++) {
				var id_moodboard = proyectoObject.preferencias[j].id_moodboard;   
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
						tipoHabi="noColocar";
					} else { tipoHabi="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
						listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
						listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
		var FechaEstado = new Date(proyectoObject.fechaestado);
		var Hoy = new Date();
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
				  total ='( Responderá en menos de '+total+' días )'; 
				  if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ) {total=""; }
			  } else if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ total=""; } else {
				  total= '( El decorador no cumplió el plazo, estamos tratando de solucionarlo )'; } 
	    var alto=[];
		var ancho=[];
		var mi_imagen = new Image();
		mi_imagen.src=' '+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador;  
		mi_imagen.onload = function () {
		  ancho=this.width;
		  alto=this.height;
		}  
		var nombreProyecto="";
		var title="";
		 
		
		if (proyectoObject.projectsStates.turnoDe=="usuario") {
			if (decoradorDias<0) {  
				  var dias = decoradorDias / 86400000;  
				  dias=Math.ceil(dias);
				  if (dias==0) {
					  dias="( Estás en este paso desde hoy )";
				  } else {
					  if (dias==-1){
						  dias="( Estás en este paso desde hace "+dias*-1+" día )";
					  } else { dias="( Estás en este paso desde hace "+dias*-1+" días )"; }
				  }
			} else { dias=""; }
			if (proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ 
				title = "";
			} else {
				title = dias;
			}
		} else {
			title = total;
		}
		
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
		if(alto<=ancho){
			chat+='<div id="imagencara" style="padding:0;text-align:center; border-radius: 50%; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
			chat+='<img alt="cara" style="width:auto;height:100%;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}else {
			chat+='<div id="imagencara" style="padding-left:0;margin-left:15px; margin-top: 15px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center" class="col-xs-12">';
			chat+='<img alt="cara" id="cara" style="width:100%;height:auto;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}
		if(proyectoObject.nombreDecorador.length>15){
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
		} else {
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
		}
		chat+= proyectoObject.nombreDecorador +'</div>';
		chat+='</div>';
		if(proyectoObject.estado<200){
			chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()"  style="margin-bottom:10px; float: left">¿No he leído tus mensajes? ¡Avísame!</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
			chat += '</div>';
		} else {
			chat += '<div class="letra-s buttonstandard_invertido aviso"  style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no puedes escribír a este decorador" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
			chat += '</div>';
		}

		$('.chat').html(chat); 
		$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'">');
		$('#nombreProyecto').append(proyectoObject.tituloProyecto);
		$('#estadoProyecto').append(proyectoObject.projectsStates.texto_usuarios);
		if(title!=""){
			$('#estadoProyecto').prop('title', title);
		}
		crearbotones_grandes_pasos(); 
		setFormularioPaso2();
	} 
}
function visualizarCanvas(propuesta){
	if(propuesta==1) { 
		if(proyectoObject.ldlcs[0].Estado==2 || proyectoObject.ldlcs[0].Estado==4) { 
				var href = urlbase + '/decoracion-espacios.html?idLdlc='+proyectoObject.ldlcs[0].ListaCompra_id;
				window.open(href, '_blank'); 
		} else if(proyectoObject.ldlcs[1].Estado==2 || proyectoObject.ldlcs[2].Estado==4) {
				var href = urlbase + '/decoracion-espacios.html?idLdlc='+proyectoObject.ldlcs[1].ListaCompra_id;
				window.open(href, '_blank'); 
		}
	}
	if(propuesta==2) { 
		if(proyectoObject.ldlcs[0].Estado==3 || proyectoObject.ldlcs[0].Estado==5) { 
				var href = urlbase + '/decoracion-espacios.html?idLdlc='+proyectoObject.ldlcs[0].ListaCompra_id;
				window.open(href, '_blank'); 
		} else if(proyectoObject.ldlcs[1].Estado==3 || proyectoObject.ldlcs[1].Estado==5) {
				var href = urlbase + '/decoracion-espacios.html?idLdlc='+proyectoObject.ldlcs[1].ListaCompra_id;
				window.open(href, '_blank'); 
		}
	}
}
function cargarProjectoPaso3(id) {

	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365);
	if(proyectoObject.estado<40){
		var href = urlbase + '/Home.html';
		window.location = href; 
	} else {
		
	 
		var listmoodboard="";
		listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
		
		var tipoHabi="";
		var k="";
		for(var l = 0; l < proyectoObject.preferencias.length; l++) {
			if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}	
		var f="";
		var items=0; 
		for(var j = 0; j < proyectoObject.preferencias.length; j++) {
				var id_moodboard = proyectoObject.preferencias[j].id_moodboard;   
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
						tipoHabi="noColocar";
					} else { tipoHabi="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
						listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
						listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
		var FechaEstado = new Date(proyectoObject.fechaestado);
		var Hoy = new Date();
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
				  total ='( Responderá en menos de '+total+' días )'; 
				  if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ) {total=""; }
			  } else if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ total=""; } else {
				  total= '( El decorador no cumplió el plazo, estamos tratando de solucionarlo )'; } 
	    var alto=[];
		var ancho=[];
		var mi_imagen = new Image();
		mi_imagen.src=' '+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador;  
		mi_imagen.onload = function () {
		  ancho=this.width;
		  alto=this.height;
		}  
		var nombreProyecto="";
		var title="";
		 
		
		if (proyectoObject.projectsStates.turnoDe=="usuario") {
			if (decoradorDias<0) {  
				  var dias = decoradorDias / 86400000;  
				  dias=Math.ceil(dias);
				  if (dias==0) {
					  dias="( Estás en este paso desde hoy )";
				  } else {
					  if (dias==-1){
						  dias="( Estás en este paso desde hace "+dias*-1+" día )";
					  } else { dias="( Estás en este paso desde hace "+dias*-1+" días )"; }
				  }
			} else { dias=""; }
			if (proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ 
				title = "";
			} else {
				title = dias;
			}
		} else {
			title = total;
		}
		
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
		if(alto<=ancho){
			chat+='<div id="imagencara" style="padding:0;text-align:center; border-radius: 50%; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
			chat+='<img alt="cara" style="width:auto;height:100%;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}else {
			chat+='<div id="imagencara" style="padding-left:0;margin-left:15px; margin-top: 15px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center" class="col-xs-12">';
			chat+='<img alt="cara" id="cara" style="width:100%;height:auto;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}
		if(proyectoObject.nombreDecorador.length>15){
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
		} else {
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
		}
		chat+= proyectoObject.nombreDecorador +'</div>';
		chat+='</div>';
		if(proyectoObject.estado<200){
			chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()"  style="margin-bottom:10px; float: left">¿No he leído tus mensajes? ¡Avísame!</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
			chat += '</div>';
		}   else {
			chat += '<div class="letra-s buttonstandard_invertido aviso"  style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no puedes escribír a este decorador" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
			chat += '</div>';
		}

		$('.chat').html(chat);
		$('#caraDecorador').append('<img  src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'">');
		$('#nombreProyecto').append(proyectoObject.tituloProyecto);
		$('#estadoProyecto').append(proyectoObject.projectsStates.texto_usuarios);
		if(title!=""){
			$('#estadoProyecto').prop('title', title);
		}
		crearbotones_grandes_pasos(); 
		setPropuestas();
	} 
	
}
function cargarProjectoPaso4(id) {

	deleteCookie("nuevo_Proyecto");
	setCookie("id_proyectoglobal", id, 365);
	
	
	  

	if(proyectoObject.estado<80){
		var href = urlbase + '/Home.html';
		window.location = href; 
	} else {
		
	 
		var listmoodboard="";
		listmoodboard='<div id="carouselinnerForImages2" class=" conefectos carousel-inner" role="listbox" style="text-transform: uppercase;width:90%;margin-left:5%;">';
		var tipoHabi="";
		var k="";
		for(var l = 0; l < proyectoObject.preferencias.length; l++) {
			if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}	
		var f="";
		var items=0; 
		for(var j = 0; j < proyectoObject.preferencias.length; j++) {
				var id_moodboard = proyectoObject.preferencias[j].id_moodboard;   
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0 || id_moodboard=="proyecto.png") { 
						tipoHabi="noColocar";
					} else { tipoHabi="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
						listmoodboard += '<div class="conefectossuaves text-center item active"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
						listmoodboard += '<div class="conefectossuaves text-center item"><a  onclick="lanzarPopUpImagenesPasos('+id+','+j+')" style="cursor: pointer"	target="_blank"><img id="imgMoodboard" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="border:1px solid grey;" alt="Moodboard"/></a>';
						listmoodboard += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px">';
						 
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
		var FechaEstado = new Date(proyectoObject.fechaestado);
		var Hoy = new Date();
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
				  total ='( Responderá en menos de '+total+' días )'; 
				  if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ) {total=""; }
			  } else if(proyectoObject.projectsStates.nombre=="Finalizado"  || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ total=""; } else {
				  total= '( El decorador no cumplió el plazo, estamos tratando de solucionarlo )'; } 
	    var alto=[];
		var ancho=[];
		var mi_imagen = new Image();
		mi_imagen.src=' '+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador;  
		mi_imagen.onload = function () {
		  ancho=this.width;
		  alto=this.height;
		}  
		var nombreProyecto="";
		var title="";
		 
		
		if (proyectoObject.projectsStates.turnoDe=="usuario") {
			if (decoradorDias<0) {  
				  var dias = decoradorDias / 86400000;  
				  dias=Math.ceil(dias);
				  if (dias==0) {
					  dias="( Estás en este paso desde hoy )";
				  } else {
					  if (dias==-1){
						  dias="( Estás en este paso desde hace "+dias*-1+" día )";
					  } else { dias="( Estás en este paso desde hace "+dias*-1+" días )"; }
				  }
			} else { dias=""; }
			if (proyectoObject.projectsStates.nombre=="Finalizado" || proyectoObject.projectsStates.nombre=="Finalizado con Factura" ){ 
				title = "";
			} else {
				title = dias;
			}
		} else {
			title = total;
		}
		
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
		if(alto<=ancho){
			chat+='<div id="imagencara" style="padding:0;text-align:center; border-radius: 50%; margin-top: 15px;border-style: solid; border-color: white; border-width: medium;text-align:center;overflow:hidden" class="col-xs-12">';
			chat+='<img alt="cara" style="width:auto;height:100%;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}else {
			chat+='<div id="imagencara" style="padding-left:0;margin-left:15px; margin-top: 15px;overflow:hidden;border-radius: 50%; border-style: solid; border-color: white; border-width: medium;text-align:center" class="col-xs-12">';
			chat+='<img alt="cara" id="cara" style="width:100%;height:auto;" src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'">';
		}
		if(proyectoObject.nombreDecorador.length>15){
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas largoPasos">';
		} else {
			chat+='</div><div style="z-index: 1; margin-top: 10px; padding-top: 10px; text-align: center;   " class="col-xs-12 letra-xs letra-mayusculas">';
		}
		chat+= proyectoObject.nombreDecorador +'</div>';
		chat+='</div>';
		if(proyectoObject.estado<200){
			chat += '<div class="letra-s buttonstandard_invertido aviso" onclick="messagesMail()"  style="margin-bottom:10px; float: left">¿No he leído tus mensajes? ¡Avísame!</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="ESCRÍBEME" style="resize: none;overflow-x:hidden;overflow:auto"></textarea>';
			chat += '</div>';
		}  else {
			chat += '<div class="letra-s buttonstandard_invertido aviso"  style="margin-bottom:10px; float: left">PROYECTO FINALIZADO</div>';
			chat += '<div id="input-div">';
			chat += '	<textarea id="input-text" class="textarea-p3 letra-s" placeholder="Ya no puedes escribír a este decorador" style="resize: none;overflow-x:hidden;overflow:auto" readonly="readonly"></textarea>';
			chat += '</div>';
		}

		$('.chat').html(chat); 
		$('#caraDecorador').append('<img src="'+urlbuckets3 + 'decoradores/'+proyectoObject.uniqueDecorador+'/perfiles/cara/'+proyectoObject.caraDecorador+'" alt="'+proyectoObject.nombreDecorador+'">');
		$('#nombreProyecto').append(proyectoObject.tituloProyecto);
		$('#estadoProyecto').append(proyectoObject.projectsStates.texto_usuarios);
		if(title!=""){
			$('#estadoProyecto').prop('title', title);
		}
		crearbotones_grandes_pasos(); 
		setTrabajos();
	} 
}


function clickAnteriorPaso() {
	clearInterval(cronometro);
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex = pageIndex - 1;

}

function clickSiguientePaso1() {
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=2;
	 $('.sidebarmenubtnmoodboard').animate({
		   right: '-50px'
      },500)
}

function clickSiguientePaso2() {
	deleteCookie("anadirMoodboard");
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=3;

}
function clickSiguientePaso3() {
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=4;

}
function clickSiguientePaso4() {
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=5;

}
var cronometro;
function clickSiguientePaso5() {
	
	var idmoodboardforcookie=0;
	idmoodboardforcookie= getCookie("idmoodboardcreatuinspiracion");
	deleteCookie("idmoodboardcreatuinspiracion");

	deleteCookie("anadirMoodboard");
	idmoodboard=idmoodboardforcookie;
	setCookie("id_moodboard", idmoodboard, 365);
	$(".fondoApp").css("background-size", "0"); 
	if(idmoodboardforcookie!=0){
		continuarAfterMoodboard();
		return false;
	}else{
		$("#myCarousel").carousel("next");
		var passcookiepaso6 = getCookie("paso6_1");
		// BootstrapDialog.alert(passcookiepaso6);
		getImagesFilter();
		getColorsModBoardFilter();
		getSensacionesFilter();
		getFrasesFilter();
		if (passcookiepaso6 != "") {
			// BootstrapDialog.alert("no");
			$('html, body').animate({
				scrollTop : 0
			}, 'slow');
			pageIndex=6;
			// pageIndex=pageIndex+2;
		} else {
			// BootstrapDialog.alert("si");
			$('html, body').animate({
				scrollTop : 0
			}, 'slow');
			pageIndex=6;
		}
		setTimeout(function(){  
		$('.sidebarmenubtnmoodboard').animate({
			   right: '0px'
	      },500)
		}, 500);
	}


}
function pasarAlSiguienteItemCarousel(){
	$("#myCarousel").carousel("next");
}
function clickSiguientePaso5b() { 
	// getImagesFilter();
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=7;
	$("#myCarousel").carousel("next"); 
	$(".fondoApp").css("background-size", "auto"); 

	$('#sidebarmenubtnmoodboard').css("display", "inline"); 
	$('#sidebarmenubtnmoodboard').css("right", "0"); 
	$('#sidebarmenubtnmoodboard').unbind('click');

	document.getElementById('sidebarmenubtnmoodboard').onclick = function () {alaAppCustomSin()};

	document.getElementById("botonSiguientePaso5b").className = document.getElementById("botonSiguientePaso5b").className.replace(/(?:^|\s)disabled(?!\S)/g, '');

	$('.sidebarmenubtnmoodboard').animate({
		   right: '-50px'
   },500)
}
function clickSiguientePaso6() {

	
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=8;

}

function clickSiguientePaso7() {
	// BootstrapDialog.alert("oeoeeo paso 7");
	
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=9;

}
function clickSiguientePaso8a() {
	// BootstrapDialog.alert("oeoeeo paso 7");
	
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=10;

}

function clickSiguientePaso8b() {
	// BootstrapDialog.alert("oeoeeo paso 7");
	
	modboardConstruct();
	$('html, body').animate({
		scrollTop : 0
	}, 'slow');
	pageIndex=11;
}

function constructPopUp(pagado, accesible, paso, cabecera) {
	$('#titulo_for_advice').text(cabecera);
	if (accesible == 0) {
		$('#smallforadvice')
				.text(
						"EL EQUIPO DE DECOTHECO ESTÁ A TODA MÁQUINA GENERANDO TUS CONTENIDOS PARA QUE PUEDAS ACCEDER A ESTA SECCIÓN. PRONTO LLEGAREMOS A ESTE PASO");
	}
	if (pagado == 0) {
		$('#smallforadvice')
				.text(
						"PARA PODER ACCEDER A ESTE PASO, ANTES DEBES DE COMPRAR EL PROYECTO");
	}

	var srcforadviceobject = document.getElementById("img_logo_for_advice");
	var srcforadvice = 'img/other/paso' + paso + 'cabecera.png';
	srcforadviceobject.src = srcforadvice;

	var srcforadviceprincipalobject = document
			.getElementById("img_logo_principal_for_advice");
	var srcforadviceprincipal = 'img/other/paso-' + paso + '.gif';
	srcforadviceprincipalobject.src = srcforadviceprincipal;

	$('#modalforpopups').modal('show');

}

function showPopupPaso1() {
	constructPopUp(1, 1, 1, "Cuéntanos");
}
function showPopupPaso2() {
	constructPopUp(1, 1, 2, "¿Hablamos?");
}
function showPopupPaso3() {
	constructPopUp(1, 1, 3, "Propuestas");
}
function showPopupPaso4() {
	constructPopUp(1, 1, 4, "Documentación");
}
function showPopupPaso2SinPagar() {
	constructPopUp(0, 0, 2, "¿Hablamos?");
}
function showPopupPaso2Pagado() {
	constructPopUp(1, 0, 2, "¿Hablamos?");
}
function showPopupPaso3SinPagar() {
	constructPopUp(0, 0, 3, "Propuestas");
}
function showPopupPaso3Pagado() {
	constructPopUp(1, 0, 3, "Propuestas");
}
function showPopupPaso4SinPagar() {
	constructPopUp(0, 0, 4, "Documentación");
}
function showPopupPaso4Pagado() {
	constructPopUp(1, 0, 4, "Documentación");
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
function crearbotones_grandes_pasos() {
	var html = '';
	html = botones_grandes_pasos_btn_paso1();
	html += botones_grandes_pasos_btn_paso2();
	html += botones_grandes_pasos_btn_paso3();
	html += botones_grandes_pasos_btn_paso4();

	 
    $('#botones_grandes_').html(html); 
}

 function aux(){
	 alert("prueba");
 }

function botones_grandes_pasos_btn_paso1() {
	var urlactual = window.location.href;
	//alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (urlactual.indexOf("paso1") > -1) { 
		// P1 ESTAMOS
		cadena += '<a style="text-align:center"  href="javascript:irPaso1()" >'; 
		cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
		cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
		cadena += '1. CUÉNTANOS <br/>';
		cadena += '<hr class="h3 barra"/>';
		cadena += '</div>';
	}	else {
				// P1 NO ESTAMOS
				cadena += '<a style="text-align:center"  href="javascript:irPaso1()" >'; 
				cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
				cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
				cadena += '1. CUÉNTANOS <br/>';
				cadena += '<hr class="h3 barra" style="display:none"/>';
				cadena += '</div>';
		}
	 
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function botones_grandes_pasos_btn_paso2() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (proyectoObject.estado>11) {
		if (urlactual.indexOf("paso2") > -1) {
			// P2 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso2()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += ' 2. HABLEMOS<br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P2 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso2()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += ' 2. HABLEMOS<br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}		
	} else {
		 
			// P2 NO
			cadena += '<a class="hablemos" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div class="pasos letra-ml colorHablemos" style="color:grey" id="div_pre_moodboard_canvas" >';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '2. HABLEMOS <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function botones_grandes_pasos_btn_paso3() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (proyectoObject.estado>30) {
		if (urlactual.indexOf("paso3") > -1) {
			// P3 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso3()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P3 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso3()" >';
			cadena += '<div style="color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}
	} else {
		 
			// P3 NO
			cadena += '<a class="propuestas" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div class="pasos letra-ml colorPropuestas" style=" color:grey" id="div_pre_moodboard_canvas">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '3. PROPUESTAS <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
function botones_grandes_pasos_btn_paso4() {
	var urlactual = window.location.href;
	// alert(urlactual+" esta es la url actual");

	var cadena = '';
	cadena += '<div id="botones_pasos_grandes_1" class="boton_grande_pasos">';
	if (proyectoObject.estado>71) {
		if (urlactual.indexOf("paso4") > -1) {
			// P4 ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso4()" >';
			cadena += '<div style=" color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra"/>';
			cadena += '</div>';
		} else {
			// P4 NO ESTAMOS
			cadena += '<a style="text-align:center"  href="javascript:irPaso4()" >';
			cadena += '<div style=" color:black" id="div_pre_moodboard_canvas" class="pasos letra-ml">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		}
	} else {
		 
			// P4 NO
			cadena += '<a class="documentacion" style="text-align:center"  href="javascript:completarPaso()" >';
			cadena += '<div <div class="pasos letra-ml colorDocumentacion" style=" color:grey" id="div_pre_moodboard_canvas">';
			cadena += '<div class="notificacionMenu" style="visibility:hidden"><img src="img/boton/notificacion.png" alt="Notificación"/></div><br/>';	
			cadena += '4. DOCUMENTACIÓN <br/>';
			cadena += '<hr class="h3 barra" style="display:none"/>';
			cadena += '</div>';
		 
	}
	cadena += '</a>';
	cadena += '</div>';
	return cadena;
}
var estadoProyecto=11;
function savePaso1(tipo) {
	if(tipo==0){
		$(document.body).css({ 'cursor': 'wait' });
		$('#cargando').modal('show');
	}
    if (tipo==0) { estado="true"; } else { estado="false"; }
	var id_proyecto = proyectoObject.id;
	var habitacion = document.getElementById('habitacion_input').value;
	var en_mente = document.getElementById('en_mente_input').value;
	var prioridad_1 = 0;
	if (document.getElementById('cb1').checked) {
		prioridad_1 = 1;
	}
	var prioridad_2 = 0;
	if (document.getElementById('cb2').checked) {
		prioridad_2 = 1;
	}
	var prioridad_3 = 0;
	if (document.getElementById('cb3').checked) {
		prioridad_3 = 1;
	}
	var prioridad_4 = 0;
	if (document.getElementById('cb4').checked) {
		prioridad_4 = 1;
	}
	var prioridad_5 = 0;
	if (document.getElementById('cb5').checked) {
		prioridad_5 = 1;
	}
	var prioridad_6 = 0;
	if (document.getElementById('cb6').checked) {
		prioridad_6 = 1;
	}

	var inspiracion_1 = document.getElementById('inspiracion1_input').value;
	var inspiracion_2 = document.getElementById('inspiracion2_input').value;
	var inspiracion_3 = document.getElementById('inspiracion3_input').value;
	var usos_1 = 0;
	if (document.getElementById('usos1').checked) {
		usos_1 = 1;
	}
	var usos_2 = 0;
	if (document.getElementById('usos2').checked) {
		usos_2 = 1;
	}
	var usos_3 = 0;
	if (document.getElementById('usos3').checked) {
		usos_3 = 1;
	}
	var usos_4 = 0;
	if (document.getElementById('usos4').checked) {
		usos_4 = 1;
	}
	var usos_5 = 0;
	if (document.getElementById('usos5').checked) {
		usos_5 = 1;
	}
	var usos_6 = 0;
	if (document.getElementById('usos6').checked) {
		usos_6 = 1;
	}
	var asientos_1 = 0;
	if (document.getElementById('asientos1').checked) {
		asientos_1 = 1;
	}
	var asientos_2 = 0;
	if (document.getElementById('asientos2').checked) {
		asientos_2 = 1;
	}
	var asientos_3 = 0;
	if (document.getElementById('asientos3').checked) {
		asientos_3 = 1;
	}
	var asientos_4 = 0;
	if (document.getElementById('asientos4').checked) {
		asientos_4 = 1;
	}
	var asientos_5 = 0;
	if (document.getElementById('asientos5').checked) {
		asientos_5 = 1;
	}
	var asientos_6 = 0;
	if (document.getElementById('asientos6').checked) {
		asientos_6 = 1;
	}

	var auxiliares_1 = 0;
	if (document.getElementById('auxiliares1').checked) {
		auxiliares_1 = 1;
	}
	var auxiliares_2 = 0;
	if (document.getElementById('auxiliares2').checked) {
		auxiliares_2 = 1;
	}
	var auxiliares_3 = 0;
	if (document.getElementById('auxiliares3').checked) {
		auxiliares_3 = 1;
	}
	var auxiliares_4 = 0;
	if (document.getElementById('auxiliares4').checked) {
		auxiliares_4 = 1;
	}
	var auxiliares_5 = 0;
	if (document.getElementById('auxiliares5').checked) {
		auxiliares_5 = 1;
	}

	var almacenaje_1 = 0;
	if (document.getElementById('almacenaje1').checked) {
		almacenaje_1 = 1;
	}
	var almacenaje_2 = 0;
	if (document.getElementById('almacenaje2').checked) {
		almacenaje_2 = 1;
	}
	var almacenaje_3 = 0;
	if (document.getElementById('almacenaje3').checked) {
		almacenaje_3 = 1;
	}
	var almacenaje_4 = 0;
	if (document.getElementById('almacenaje4').checked) {
		almacenaje_4 = 1;
	}
	var almacenaje_5 = 0;
	if (document.getElementById('almacenaje5').checked) {
		almacenaje_5 = 1;
	}
	var deco_1 = 0;
	if (document.getElementById('deco1').checked) {
		deco_1 = 1;
	}
	var deco_2 = 0;
	if (document.getElementById('deco2').checked) {
		deco_2 = 1;
	}
	var deco_3 = 0;
	if (document.getElementById('deco3').checked) {
		deco_3 = 1;
	}
	var deco_4 = 0;
	if (document.getElementById('deco4').checked) {
		deco_4 = 1;
	}
	var deco_5 = 0;
	if (document.getElementById('deco5').checked) {
		deco_5 = 1;
	}

	var elementos_extra = document.getElementById('alguno_extra_input').value;

	var imprescindibles_url_1 = document.getElementById('producto1_input').value;
	var imprescindibles_url_2 = document.getElementById('producto2_input').value;
	var imprescindibles_url_3 = document.getElementById('producto3_input').value;
	var otra_necesidad = document.getElementById('otra_necesidad_input').value;
	var diy_1 = document.getElementById('diy1_input').value;
	var diy_2 = document.getElementById('diy2_input').value;
	var diy_3 = document.getElementById('diy3_input').value;
	 
	var suelo = 0;
	if (document.getElementById('suelo_input').checked) {
		suelo = 1;
	}
	var pintura = 0;
	if (document.getElementById('pintura_input').checked) {
		pintura = 1;
	}

	var no_quiero = document.getElementById('no_quieras_input').value;
	var medidas_ancho = document.getElementById('medidas_ancho_input').value;
	var medidas_alto = document.getElementById('medidas_alto_input').value;
	var presupuesto = document.getElementById('presupuesto_input').value; 

	var id_moodboard = proyectoObject.preferencias[0].id_moodboard;
	 
	if(proyectoObject.estado==11 && estadoProyecto==11){
		estadoProyecto=11;
	} else if(proyectoObject.estado==11 && estadoProyecto==21) {
		estadoProyecto=21;
	} else {
		estadoProyecto=proyectoObject.estado;
	}
	
	var extra_otras_cosas=0;
	var ventanas_1=0;
	var ventanas_2=0;
	var ventanas_3=0;
	
	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SetInformacion',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				id_proyecto : id_proyecto,
				habitacion : habitacion,
				en_mente : en_mente,
				prioridad_1 : prioridad_1,
				prioridad_2 : prioridad_2,
				prioridad_3 : prioridad_3,
				prioridad_4 : prioridad_4,
				prioridad_5 : prioridad_5,
				prioridad_6 : prioridad_6,
				inspiracion_1 : inspiracion_1,
				inspiracion_2 : inspiracion_2,
				inspiracion_3 : inspiracion_3,
				usos_1 : usos_1,
				usos_2 : usos_2,
				usos_3 : usos_3,
				usos_4 : usos_4,
				usos_5 : usos_5,
				usos_6 : usos_6,
				asientos_1 : asientos_1,
				asientos_2 : asientos_2,
				asientos_3 : asientos_3,
				asientos_4 : asientos_4,
				asientos_5 : asientos_5,
				asientos_6 : asientos_6,
				auxiliares_1 : auxiliares_1,
				auxiliares_2 : auxiliares_2,
				auxiliares_3 : auxiliares_3,
				auxiliares_4 : auxiliares_4,
				auxiliares_5 : auxiliares_5,
				almacenaje_1 : almacenaje_1,
				almacenaje_2 : almacenaje_2,
				almacenaje_3 : almacenaje_3,
				almacenaje_4 : almacenaje_4,
				almacenaje_5 : almacenaje_5,
				deco_1 : deco_1,
				deco_2 : deco_2,
				deco_3 : deco_3,
				deco_4 : deco_4,
				deco_5 : deco_5,
				elementos_extra : elementos_extra,
				imprescindibles_url_1 : imprescindibles_url_1,
				imprescindibles_url_2 : imprescindibles_url_2,
				imprescindibles_url_3 : imprescindibles_url_3,
				otra_necesidad : otra_necesidad,
				diy_1 : diy_1,
				diy_2 : diy_2,
				diy_3 : diy_3,
				suelo : suelo,
				pintura : pintura,
				no_quiero : no_quiero,
				medidas_ancho : medidas_ancho,
				medidas_alto : medidas_alto,
				presupuesto : presupuesto,
				extra_otras_cosas : extra_otras_cosas,
				ventanas_1 : ventanas_1,
				ventanas_2 : ventanas_2,
				ventanas_3 : ventanas_3,
				cambio_estado: estado,
				mailDecorador :  proyectoObject.uniqueDecorador,
				estado : estadoProyecto
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				if (data != 0) {
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.alert('Hubo un problema al enviar los datos.', function(){ 
						cerrarCargando(); 
			        }); 
				} else { 
					console.log(proyectoObject.estado);
					$(document.body).css({ 'cursor': 'default' });
						if(tipo==0 && proyectoObject.estado==11){ 
							$(document.body).css({ 'cursor': 'default' });
							cambiarEstado(0);
							estadoProyecto=21;
							
						} 
						if(tipo==0 && proyectoObject.estado!=11){
							$(document.body).css({ 'cursor': 'default' });
							BootstrapDialog.alert('Datos actualizados correctamente.', function(){
								cerrarCargando(); 
								subir();
					        }); 
							
						}  
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

function cambiarEstado(tipo){
	var id_proyecto = proyectoObject.id; 
	if(tipo==0 && proyectoObject.estado==11){
		try {
			

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/DecoradoresController',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				data : {
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {  
	  					$(document.body).css({ 'cursor': 'default' });
	  						cambioEstadoChat("RellenadoPaso1");
							BootstrapDialog
							.confirm({
								title : '.ADVERTENCIA.',
								message : 'Paso completado correctamente, puedes seguir añadiendo información en este paso o ir al paso siguiente para concertar cita con el decorador.',
								type : BootstrapDialog.TYPE_PRIMARY, // <--
																		// Default
																		// value
																		// is
																		// BootstrapDialog.TYPE_PRIMARY
								closable : true, // <-- Default value
													// is false
								draggable : true, // <-- Default value
													// is false
								btnCancelLabel : 'Ir al paso siguiente', // <--
																// Default
																// value
																// is
																// 'Cancel',
								btnOKLabel : 'Seguir en este paso!', 
								callback : function(result) {
									// result will be true if button was
									// click, while it will be false if
									// users close the dialog directly.
									if (result) { 
										var cadena="";
										if(data.turnoDe=="usuario"){ 
											cadena+=data.texto_usuarios;
										} else { 
											cadena+=data.texto_usuarios;
										}
											$('.estado').attr('placeholder',cadena);
											$(".hablemos").attr("href", "javascript:irPaso2()");
											$(".colorHablemos").css("color", "black");
											cerrarCargando(); 
											proyectoObject.uniqueDecorador=22;
											subir();
									        
											/* $('html, body').animate({
												scrollTop : 0
											}, 'slow');*/
									} else {

										var href = urlbase + '/paso2.html';
										window.location = href;
									}
								}
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
	if(tipo=="paso4" && proyectoObject.estado==91){
		try {
			

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/DecoradoresController',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				data : {
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {  

	  					$(document.body).css({ 'cursor': 'default' });
	  						BootstrapDialog
							.confirm({
								title : '.ADVERTENCIA.',
								message : 'Proyecto finalizado, puede volver y revisar este proyecto cuando quiera.',
								type : BootstrapDialog.TYPE_PRIMARY, // <--
																		// Default
																		// value
																		// is
																		// BootstrapDialog.TYPE_PRIMARY
								closable : true, // <-- Default value
													// is false
								draggable : true, // <-- Default value
													// is false
								btnCancelLabel : 'Ir a lista de proyectos', // <--
																// Default
																// value
																// is
																// 'Cancel',
								btnOKLabel : 'Seguir en este paso!', 
								callback : function(result) {
									// result will be true if button was
									// click, while it will be false if
									// users close the dialog directly.
									if (result) {  
											$('.estado').attr('placeholder',data.texto_usuarios);
											cerrarCargando();
											/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
									} else {

										var href = urlbase + '/Home.html';
										window.location = href;
									}
								}
							});  
				} }
			});

		} catch (e) { 
			$(document.body).css({ 'cursor': 'default' });
			BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
				cerrarCargando();
	        }); 
		}
	}
	if (proyectoObject.estado==51 || proyectoObject.estado==71){ 
		try {
			

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/DecoradoresController',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				data : {
					token : "token",
					action: "getState",
					id_proyecto : id_proyecto
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					if (isError(data)) {
						$(document.body).css({ 'cursor': 'default' });
						BootstrapDialog.alert(data, function(){ 
							cerrarCargando();
				        }); 
	  				} else {  
	  					
	  					
	  					if(tipo=="paso33D" && proyectoObject.estado==71){ 
	  						$(document.body).css({ 'cursor': 'default' });
	  						 
	  						BootstrapDialog
							.confirm({
								title : '.ADVERTENCIA.',
								message : 'Propuesta 3D aceptada. El decorador realizará los planos para esta propuesta.',
								type : BootstrapDialog.TYPE_PRIMARY, // <--
																		// Default
																		// value
																		// is
																		// BootstrapDialog.TYPE_PRIMARY
								closable : true, // <-- Default value
													// is false
								draggable : true, // <-- Default value
													// is false
								btnCancelLabel : 'Ir a lista de proyectos', // <--
																// Default
																// value
																// is
																// 'Cancel',
								btnOKLabel : 'Seguir en este paso!', 
								callback : function(result) {
									// result will be true if button was
									// click, while it will be false if
									// users close the dialog directly.
									if (result) { 
										var cadena="";
										if(data.turnoDe=="usuario"){ 
											cadena+=data.texto_usuarios;
										} else { 
											cadena+=data.texto_usuarios;
										}
											$('.estado').attr('placeholder',cadena);
											$(".documentacion").attr("href", "javascript:irPaso4()");
											$(".colorDocumentacion").css("color", "black");
											cerrarCargando();
											/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
									} else {

										var href = urlbase + '/Home.html';
										window.location = href;
									}
								}
							}); 
	  					}
	  					if(tipo="paso3" && proyectoObject.estado==51){  
	  						var pack="";
	  						if(proyectoObject.pagado==1){
	  							pack="Propuesta aceptada. El decorador trabajará en unas propuestas 3D acordes a esta propuesta.";
	  						} else {
	  							pack="Propuesta aceptada. El decorador trabajará en los planos y lista de compra para esta propuesta.";
	  						}
	  						$(document.body).css({ 'cursor': 'default' });
	  						 
	  						BootstrapDialog
							.confirm({
								title : '.ADVERTENCIA.',
								message : pack,
								type : BootstrapDialog.TYPE_PRIMARY, // <--
																		// Default
																		// value
																		// is
																		// BootstrapDialog.TYPE_PRIMARY
								closable : true, // <-- Default value
													// is false
								draggable : true, // <-- Default value
													// is false
								btnCancelLabel : 'Ir a lista de proyectos', // <--
																// Default
																// value
																// is
																// 'Cancel',
								btnOKLabel : 'Seguir en este paso!', 
								callback : function(result) {
									// result will be true if button was
									// click, while it will be false if
									// users close the dialog directly.
									if (result) { 
										var cadena="";
										if(data.turnoDe=="usuario"){ 
											cadena+=data.texto_usuarios;
										} else { 
											cadena+=data.texto_usuarios;
										}
											$('.estado').attr('placeholder',cadena);
											if(proyectoObject.pagado==2){
												$(".documentacion").attr("href", "javascript:irPaso4()");
												$(".colorDocumentacion").css("color", "black");
											}
											cerrarCargando();
											/* $('html, body').animate({
											scrollTop : 0
										}, 'slow');*/
									} else {

										var href = urlbase + '/Home.html';
										window.location = href;
									}
								}
							}); 
	  					} 
						 
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
	
}
function completarPaso(){
	BootstrapDialog.alert("Cuando finalice el paso actual se podrá acceder al siguiente paso"); 
}
function setFormularioPaso2() {
	
	if(proyectoObject.estado>30){  
		var cadena="";
		cadena+='<div style="height:100%;padding:2%;background-color:rgba(255,255,255,0.7)">';
		cadena+='<h4 class="subtitulo_pantalla" style="margin-top:2%;margin-bottom:2%;">';
		cadena+='	<p class="letra-s">YA SE HA CONCERTADO UNA CITA, REVISA TU CORREO ELECTRÓNICO.<BR/>SI NECESITAS CONTACTAR CON EL DECORADOR, UTILIZA EL CHAT DE ARRIBA</p>';
		cadena+='</h4>';
		cadena+='</div>';
		$(".paginaCita").html(cadena);
		$(".guardarCita").css("display","none"); 
		
	
	} else {
		var informacion_var=proyectoObject.cita;
		if(typeof informacion_var != "undefined"){
			document.getElementById('dateInputforCita').value=informacion_var.fecha;
			document.getElementById('timeInputforCita').value=informacion_var.hora;
			if(informacion_var.skype==1){
				document.getElementById('skypeInputforCita').checked=true;
			}else
			document.getElementById('telefonoInputforCita').checked=true;
			document.getElementById('contenidoInputforCita').value=informacion_var.contenido;
		}
	}
	
	
}

function setFormularioPaso1() {

	 
	var informacion_var=proyectoObject.informacion;
	console.log(informacion_var);
	console.log(proyectoObject);
	if (typeof informacion_var != "undefined") {
		cargarDropzonePlanos(false);
	
	
	 document.getElementById('habitacion_input').value=informacion_var.habitacion;
	 document.getElementById('en_mente_input').value=informacion_var.en_mente;
	document.getElementById('cb1').checked=informacion_var.prioridad_1;
		
	
	document.getElementById('cb2').checked=informacion_var.prioridad_2; 
	
	
	document.getElementById('cb3').checked=informacion_var.prioridad_3; 
	
	
	document.getElementById('cb4').checked=informacion_var.prioridad_4; 
	
	
	document.getElementById('cb5').checked=informacion_var.prioridad_5; 
	
	
	document.getElementById('cb6').checked=informacion_var.prioridad_6; 
	

	document.getElementById('inspiracion1_input').value=informacion_var.inspiracion_1; 
	 document.getElementById('inspiracion2_input').value=informacion_var.inspiracion_2;
	 document.getElementById('inspiracion3_input').value=informacion_var.inspiracion_3;
	
	document.getElementById('usos1').checked=informacion_var.usos_1; 
		
	document.getElementById('usos2').checked=informacion_var.usos_2; 
	
	
	document.getElementById('usos3').checked=informacion_var.usos_3; 
	
	
	document.getElementById('usos4').checked=informacion_var.usos_4; 
	
	
	document.getElementById('usos5').checked=informacion_var.usos_5; 
	
	
	document.getElementById('usos6').checked=informacion_var.usos_6; 
	
	
	document.getElementById('asientos1').checked=informacion_var.asientos_1; 

	document.getElementById('asientos2').checked=informacion_var.asientos_2; 
	
	
	document.getElementById('asientos3').checked=informacion_var.asientos_3; 
	
	
	document.getElementById('asientos4').checked=informacion_var.asientos_4; 
	
	
	document.getElementById('asientos5').checked=informacion_var.asientos_5; 
	
	
	document.getElementById('asientos6').checked=informacion_var.asientos_6; 
	

	document.getElementById('auxiliares1').checked=informacion_var.auxiliares_1; 
	
	
	
	document.getElementById('auxiliares2').checked=informacion_var.auxiliares_2; 
	
	
	document.getElementById('auxiliares3').checked=informacion_var.auxiliares_3; 
	
	
	document.getElementById('auxiliares4').checked=informacion_var.auxiliares_4; 
	
	
	document.getElementById('auxiliares5').checked=informacion_var.auxiliares_5; 
	

	
	document.getElementById('almacenaje1').checked=informacion_var.almacenaje_1; 
	
	
	document.getElementById('almacenaje2').checked=informacion_var.almacenaje_2; 
	
	
	document.getElementById('almacenaje3').checked=informacion_var.almacenaje_3; 
	
	
	document.getElementById('almacenaje4').checked=informacion_var.almacenaje_4; 
	
	
	document.getElementById('almacenaje5').checked=informacion_var.almacenaje_5; 
	
	
	document.getElementById('deco1').checked=informacion_var.deco_1; 
	
	
	document.getElementById('deco2').checked=informacion_var.deco_2; 
	
	document.getElementById('deco3').checked=informacion_var.deco_3; 
	
	
	document.getElementById('deco4').checked=informacion_var.deco_4; 
	
	 
	document.getElementById('deco5').checked=informacion_var.deco_5;
	

 document.getElementById('alguno_extra_input').value=	informacion_var.elementos_extra;

	 document.getElementById('producto1_input').value=informacion_var.imprescindibles_url_1;
	 document.getElementById('producto2_input').value=informacion_var.imprescindibles_url_2;
	document.getElementById('producto3_input').value=informacion_var.imprescindibles_url_3; 
	 document.getElementById('otra_necesidad_input').value=informacion_var.otra_necesidad;
	 document.getElementById('diy1_input').value=informacion_var.diy_1;
	
	document.getElementById('diy2_input').value=informacion_var.diy_2; 
	 document.getElementById('diy3_input').value=informacion_var.diy_3;
	
	
	
	document.getElementById('suelo_input').checked=informacion_var.suelo; 
	
	
	document.getElementById('pintura_input').checked=informacion_var.pintura; 
	

	 document.getElementById('no_quieras_input').value=informacion_var.no_quiero;
	 document.getElementById('medidas_ancho_input').value=informacion_var.medidas_ancho;
	 document.getElementById('medidas_alto_input').value=	informacion_var.medidas_alto;
	 document.getElementById('presupuesto_input').value=informacion_var.presupuesto; 

	}else{
		cargarDropzonePlanos(false);
	}
	
	
	
	
}
function closemodalpasos(){
	$('#modalforpopups').modal('hide');
	//alert("so");
	
	setTimeout(function(){pagarfunction();}, 500);
	
}

function deleteFile(seccionvar, fichero) {
	var user = getCookie("userAssistant");
	var proyecto = proyectoObject.nombreProyecto;
	var seccion = seccionvar;
	var fichero = fichero;

	//alert("user:"+user+" proyecto"+proyecto+" seccion:"+ seccion +"fichero: "+fichero);
	//var id_moodboard = proyectoObject.preferencia.id_moodboard;

	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/RemoveFile',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				user : user,
				proyecto : proyecto,
				seccion : seccion,
				fichero : fichero
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

function deleteFile2(seccionvar, proyecto, fichero) {
	var user = getCookie("userAssistant");
	
	var seccion = seccionvar;
	var fichero = fichero;

	//alert("user:"+user+" proyecto"+proyecto+" seccion:"+ seccion +"fichero: "+fichero);
	//var id_moodboard = proyectoObject.preferencia.id_moodboard;

	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/RemoveFile',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				user : user,
				proyecto : proyecto,
				seccion : seccion,
				fichero : fichero
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

function deleteFileCTM(user, nombreproyecto, seccionvar, fichero) {
	var user = user;
	var proyecto = nombreproyecto;
	var seccion = seccionvar;
	var fichero = fichero;

	

	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/RemoveFile',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				user : user,
				proyecto : proyecto,
				seccion : seccion,
				fichero : fichero
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
function getToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	
	
}
function dudasfunction(){
	$('.modal').modal('hide');
	
	setTimeout(function(){elrestodedudas();}, 500);
	
}
function elrestodedudas(){
	var recojoMail=getCookie("userAssistant");
	if(recojoMail=="")
		$('#modalforDudasSin').modal('show');
	else
	$('#modalforDudasCon').modal('show');
}
function pagarfunction(){
	$('#modalforpagar').modal('show');
	
}

function closemodaltoopcionespagar(){
	$('.modal').modal('hide');
	//alert("so");
	
	setTimeout(function(){opcionespagarfunction();}, 500);
	
}
function opcionespagarfunction(){
	$('#modalopcionesdepago').modal('show');
}
function opcionespagar(data){

	var userAssistantCockie = getCookie("userAssistant");
	if (userAssistantCockie == "") {
		setCookie("nuevo_Proyecto", "1", 365);
		$('#login-modal').modal('show'); 
		setCookie("pagar", data, 365);

	} else {
		if(data==79) {
			$('#modalopcionesdepago79').modal('show');
		}
		if (data==179){
			$('#modalopcionesdepago179').modal('show');
		}
		
	} 
}


function pagar(codigo, tipoPago, precio){
	$(document.body).css({'cursor' : 'wait'}); 
	id_proyecto = proyectoObject.id;  
	var mail=getCookie("userAssistant"); 
	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SetPago',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			
			data : { 
				codigo : codigo,
				tipo : tipoPago,
				id_proyecto : id_proyecto, 
				mail: mail,
				total: precio
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				
				if(data == '0'){
					 
					// Llamada que añade si el usuario gastó uno de los descuentos
					$.ajax({ 
						dataType : "json", 
			  			url : urlbaseForAjax + '/DecoradoresController',
			  			data : {
			  				token : id_ajax,
			  				action : "subtractDiscount",
			  				id_user : id_ajax,
			  				tipoPago : tipoPago
			  				
			  			},
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
							
						 
						}
					});
					
					
					
					
					
					$('#modalopcionesdepago79').modal('hide');
					$('#modalopcionesdepago179').modal('hide');  
					setTimeout(function(){
						$(document.body).css({'cursor' : 'default'}); 
						BootstrapDialog.alert('Muchas gracias, PAGO COMPLETADO CORRECTAMENTE', function(){
							var href = urlbase + '/Home.html';
							window.location = href;
				        });
					}, 1500); 
					
					
				}else{

					$('#modalopcionesdepago79').modal('hide');
					$('#modalopcionesdepago179').modal('hide'); 
					setTimeout(function(){
						$(document.body).css({'cursor' : 'default'}); 
						BootstrapDialog.alert('Algo no ha salido bien con el pago, por favor contacte con un administrador en info@decotheco.com', function(){
							setTimeout(function(){
								$('#modalopcionesdepago79').modal('show'); 
								$('#modalopcionesdepago179').modal('show'); 
							}, 1000); 
				        });
					}, 1500);  
				}
			}
		});

	} catch (e) {

		$(document.body).css({'cursor' : 'default'}); 
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}
function pagar(codigo, tipoPago, precio, tipo){
	$(document.body).css({'cursor' : 'wait'}); 
	id_proyecto = proyectoObject.id;  
	var mail=getCookie("userAssistant"); 
	var id_decorador = pagoEspecial.id; 
	if(tipo==1) { 
		tipoProyecto=tipoPago;
		tipo = proyectoObject.id; 
	} else {
		tipoProyecto=99;
	}
	console.log(precio);
	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SetPago',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			
			data : { 
				codigo : codigo,
				tipo : tipoProyecto,
				id_proyecto : tipo, 
				mail: mail,
				total: precio,
				decorador: id_decorador
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				
				if(data == '0'){
					setTimeout(function(){
						$(document.body).css({'cursor' : 'default'}); 
						BootstrapDialog.alert('Muchas gracias, PAGO COMPLETADO CORRECTAMENTE', function(){
							var href = urlbase + '/Home.html';
							window.location = href;
				        });
					}, 1500); 
					
					
				}else{
					setTimeout(function(){
						$(document.body).css({'cursor' : 'default'}); 
						BootstrapDialog.alert('Algo no ha salido bien con el pago, por favor contacte con un administrador en info@decotheco.com', function(){
							
				        });
					}, 1500);  
				}
			}
		});

	} catch (e) {

		$(document.body).css({'cursor' : 'default'}); 
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
}
function comprarProyecto(id){ 
	setCookie("id_proyectoglobal", id, 365);
	var href = urlbase + "/Pagar.html";
	window.location = href; 
}
function pagarConCodigo(){

	$(document.body).css({ 'cursor': 'wait' }); 
	var id_proyecto = proyectoObject.id;
	var recojoMail=getCookie("userAssistant");
	//console.log(id_proyecto);
	var codigo2=document.getElementById('codigo_pago_input2').value;
	if(codigo2==""){ 
		$('.error').html('Por favor, introduce un codigo valido '+codigo);
		return;
	} else {
		try {
			

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/SetPagoConCodigo',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				
				data : {
					codigo : codigo2,
					id_proyecto : id_proyecto,
					mail : recojoMail
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					//alert(data);
					if(data == '0'){ 
						$('#modalopcionesdepago179').modal('hide');
						$(document.body).css({ 'cursor': 'default' }); 
						BootstrapDialog.alert('Muchas gracias, PAGO COMPLETADO CORRECTAMENTE', function(){
							var href = urlbase + '/Home.html';
							window.location = href;
				        });
						
					}else{
						$('.error').html('El código ya se utilizó, si continúas teniendo problemas ponte en contacto a través del formulario de dudas.');

						$(document.body).css({ 'cursor': 'default' }); 
					}
				}
			});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			$(document.body).css({ 'cursor': 'default' }); 
			// put any code you want to execute if there's an exception here

		}
	}
	
}

function  sendMail() { 
	var toMail = proyectoObject.uniqueDecorador; 
	var dateInputforCita=document.getElementById('dateInputforCita');
	var timeInputforCita=document.getElementById('timeInputforCita');
	var skypeInputforCita=document.getElementById('skypeInputforCita');
	var datocontactoInputforCita=document.getElementById('contenidoInputforCita');
	var content = "Este mensaje ha sido generado de forma automática por decoración-online.decotheco.com.\n" +
			"Por favor, recuerde que nos pondremos en contacto con usted el día "+ dateInputforCita.value + " a las "+ timeInputforCita.value;
	var skypeando;
	if(skypeInputforCita.checked){
		skypeando=1;
		content+=", por skype ("+datocontactoInputforCita.value+").";
	}else{
		skypeando=0;
		content+=", por teléfono ("+datocontactoInputforCita.value+").";
	}
	content+="\n:)";
	//alert(dateInputforCita.value);
	//alert(timeInputforCita.value);
	//alert(datocontactoInputforCita.value);
	//alert(content);
	var id_proyecto = proyectoObject.id;


	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/SendCita',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			
			data : {
				toMail : toMail, 
				content : content,
				contenido: document.getElementById('contenidoInputforCita').value,
				fecha: dateInputforCita.value,
				hora: timeInputforCita.value,
				skype: skypeando,
				id_proyecto : id_proyecto
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				//alert("eliminado");
				if(data==0){
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.alert('Se ha concertado una cita correctamente. Te enviaremos un email cuando el decorador acepte o rechace la cita. En caso de ser rechazada se concertará una nueva cita mediante el chat de arriba.', function(){ 
						var href = urlbase + '/Home.html';cerrarCargando();
						window.location = href;
					});
					cambioEstadoChat("citaUsuario");
					
				}else{
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.alert('No se pudo concertar la cita.', function(){ 
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
function  sendDudas() {
	$('.modal').modal('hide');
	
	$(document.body).css({ 'cursor': 'wait' });
	var toMail = 'info@decotheco.com';
	var recojoMail=getCookie("userAssistant");
	var fromMail;
	var nombre;
	if(recojoMail!=""){
		fromMail=recojoMail;
		nombre = $("li[id=liforsustitution] > a").text() + " (registrado) ";
		
		//alert(nombre);
	}else{
		fromMail=document.getElementById('dudas_mail').value;
		nombre=document.getElementById('dudas_nombre').value;
		//alert(fromMail);
	}
	
	var consulta=document.getElementById('dudas_consultaCon').value + document.getElementById('dudas_consulta').value;
	var subject = "Mensaje de dudas de decoracion-online";
	
	
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
  					BootstrapDialog.alert('Mensaje enviado correctamente, en breve nos pondremos en contacto contigo :)', function(){ 
  						cerrarCargando(); 
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
function savePaso2() { 
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var dateInputforCita=document.getElementById('dateInputforCita');
	var vregexNaix =/^\d{4}\-\d{2}\-\d{2}$/;
		let partes = vregexNaix.test(dateInputforCita.value);
	var timeInputforCita=document.getElementById('timeInputforCita');
	var skypeInputforCita=document.getElementById('skypeInputforCita');
	var telefonoInputforCita=document.getElementById('telefonoInputforCita');
	var datocontactoInputforCita=document.getElementById('contenidoInputforCita');
	if(dateInputforCita.value== ""){
		BootstrapDialog.alert('Por favor introduzca una fecha correcta', function(){ 
			cerrarCargando();$(document.body).css({ 'cursor': 'default' });
        }); 
		return;
	}
	if(!partes){
		BootstrapDialog.alert('Por favor introduzca la fecha con el formato aaaa-mm-dd', function(){ 
			cerrarCargando();$(document.body).css({ 'cursor': 'default' });
        }); 
		return;
	}
	if(timeInputforCita.value== ""){
		BootstrapDialog.alert('Por favor introduzca una hora', function(){ 
			cerrarCargando();$(document.body).css({ 'cursor': 'default' });
        }); 
		return;
	} 
	console.log(dateInputforCita.value);
	console.log(hoyCompare);
	
	if(dateInputforCita.value<hoyCompare) {
		BootstrapDialog.alert('Por favor introduzca una fecha a partir de mañana', function(){ 
			cerrarCargando();$(document.body).css({ 'cursor': 'default' });
        }); 
		return;
	}
	if (skypeInputforCita.checked ||telefonoInputforCita.checked) {
		if(datocontactoInputforCita.value!= ""){
			sendMail();
			
			
		}
		else {
			BootstrapDialog.alert('Por favor introduzca un dato de contacto.', function(){ 
				cerrarCargando();$(document.body).css({ 'cursor': 'default' });
	        }); 
		}
	}else {
		BootstrapDialog.alert('Por favor seleccione la forma de contacto.', function(){ 
			cerrarCargando();$(document.body).css({ 'cursor': 'default' });
        }); 
	}
}
var canvas111="";
var canvas222="";

function setPropuestas(){
	 
	
	var bandera=false;
	//console.log(proyectoObject);
	// alert(urlactual+" esta es la url actual");
	var userNameforpropuesta = getCookie("userAssistant");
	var proyectoNameforpropuesta = proyectoObject.nombreProyecto;
	var Propuestas=proyectoObject.propuestas; 
	var cadenaforimg=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/propuestas/";
	 
	
	
	
	if(proyectoObject.estado<=40) {
		var cadena="";
		cadena+='<div style="height:100%;padding:2%;background-color:rgba(255,255,255,0.7)">';
		cadena+='<h4 class="subtitulo_pantalla" style="margin-top:2%;margin-bottom:2%;">';
		cadena+='	<p class="letra-s">UNA VEZ QUE HEMOS HABLADO Y ESTABLECIDO LAS BASES DEL DISEÑO, NOS TOCA PONERNOS A TRABAJAR. TENDREMOS UN MÁXIMO DE 10 DÍAS PARA <br/>';
		cadena+='	HACERTE LLEGAR LA PRIMERA PROPUESTA. COMO YA SABES, SERÁN UN TOTAL DE 2 DISEÑOS, PARA QUE PUEDAS <br/>';
		cadena+='	HACERTE UNA IDEA MUY COMPLETA DE LO QUE TE PROPONEMOS</p>';
		cadena+='</h4>';
		cadena+='</div>';
		$('.propuesta1').html(cadena);
		$('.propuesta2').html(cadena);
	} else { 
			 
				 
			
		
		if (proyectoObject.estado>51 && proyectoObject.paso3Propuestas!="0") {
				if(proyectoObject.paso3Propuestas=="2"){
					$(".propuesta1").css("display","inline");
			        $(".propuesta2").css("display","none");
			        $(".barra4").css("display","none"); 
			        $(".barra3").css("display","block"); 
			        $(".pag1a").css("display","none"); 
			        $(".pag2d").css("display","inline"); 
					$('.aceptarPropuesta').html("PROPUESTA ACEPTADA");
					$('.aceptarPropuesta2').html("PROPUESTA NO ACEPTADA");
					$(".aceptarPropuesta").attr('onclick', '');
					$(".aceptarPropuesta2").attr('onclick', '');
				} else {
					$(".propuesta1").css("display","none");
			        $(".propuesta2").css("display","inline"); 
			        $(".barra4").css("display","block"); 
			        $(".barra3").css("display","none"); 
			        $(".pag1a").css("display","inline"); 
			        $(".pag2d").css("display","none"); 
					$('.aceptarPropuesta2').html("PROPUESTA ACEPTADA");
					$('.aceptarPropuesta').html("PROPUESTA NO ACEPTADA");
					$(".aceptarPropuesta").attr('onclick', '');
					$(".aceptarPropuesta2").attr('onclick', '');
				} 
		} else if (proyectoObject.estado>71) {
			$('.aceptarPropuesta').css("display", "none");
			$('.aceptarPropuesta2').css("display", "none");
			$('.aceptarPropuesta3d1').css("display", "none");
			$('.aceptarPropuesta3d2').css("display", "none");
			$('.propTit').css("display", "none");
			$('.propTit2').css("display", "none");  ;
		}
		

		// PROPUESTAS 2D 
		if(proyectoObject.ldlcs.length==0){
			
		} else if(proyectoObject.ldlcs.length==1){
				if(proyectoObject.ldlcs[0].Estado==2 || proyectoObject.ldlcs[0].Estado==4) {
					// INSERTAR PROPUESTA1
					$('#imagen1').css("display", "none");
					var id_ldlc = proyectoObject.ldlcs[0].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
						 
										html=""; 
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(1)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(1)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										 $('#anchoCanvas').append(html);  
										}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				} else if(proyectoObject.ldlcs[0].Estado==3 || proyectoObject.ldlcs[0].Estado==5) {
					// INSERTAR PROPUESTA2
					$('#imagen2').css("display", "none");
					var id_ldlc2 = proyectoObject.ldlcs[0].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc2
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen2=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen2+'" alt="Composición 2D">');
										html=""; 
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(2)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(2)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										 $('#anchoCanvas2').append(html);  
									
				  				}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				}
		} else if(proyectoObject.ldlcs.length==2){
				if(proyectoObject.ldlcs[0].Estado==2 || proyectoObject.ldlcs[0].Estado==4) {
					// INSERTAR PROPUESTA1
					$('#imagen1').css("display", "none");
					var id_ldlc = proyectoObject.ldlcs[0].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
				  					
										// bueno
										html="";
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(1)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(1)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										$('#anchoCanvas').append(html);  
				  				}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				} 
				if(proyectoObject.ldlcs[0].Estado==3 || proyectoObject.ldlcs[0].Estado==5) {
					// INSERTAR PROPUESTA2
					$('#imagen2').css("display", "none");
					var id_ldlc2 = proyectoObject.ldlcs[0].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc2
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen2=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen2+'" alt="Composición 2D">');
								 
										
										html=""; 
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(2)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(2)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										$('#anchoCanvas2').append(html);  
				  				}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				} 
				if(proyectoObject.ldlcs[1].Estado==2 || proyectoObject.ldlcs[1].Estado==4) {
					// INSERTAR PROPUESTA1
					$('#imagen1').css("display", "none");
					var id_ldlc = proyectoObject.ldlcs[1].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
										 
										
										html=""; 
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(1)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(1)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(1)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										 $('#anchoCanvas').append(html);  
				  				}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				} 
				if(proyectoObject.ldlcs[1].Estado==3 || proyectoObject.ldlcs[1].Estado==5){
					// INSERTAR PROPUESTA2
					$('#imagen2').css("display", "none");
					var id_ldlc2 = proyectoObject.ldlcs[1].ListaCompra_id;
					var b;
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
				  				id_ldlc : id_ldlc2
				  			},
				  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				  			contentType : "application/json; charset=utf-8",
				  			success : function(data) {
				  				// BootstrapDialog.alert("DATA: "+data);
				  				// $usuarioGlobal=data;
				  				if (isError(data)) {
				  					$(document.body).css({'cursor' : 'default'}); 
				  					var href = urlbase;
				  					window.location = href;
				  				} else {
				  					$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;

				  					imagen2=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
				  					$("#anchoCanvas2").html('<img style="width:100%" src="'+imagen2+'" alt="Composición 2D">');
								 
										
										html=""; 
										html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookLdlc(2)"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div> <div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(2)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(2)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
										$('#anchoCanvas2').append(html);  
				  				}

				  			}
				  		});

				  	} catch (e) {
				  		console.log("Se ha producido un error en la conexión con el servidor");
						$(document.body).css({'cursor' : 'default'}); 
				  	}
				}
		} 
		
		// PROPUESTA 1 3D
		var P3D13="";
		 
		if(Propuestas[0].imagenes.length>=1 && Propuestas[1].imagenes.length==0){
			$(".3DV11").css({ 'display': 'block' });
			P3D13+='<div style="display: block; margin: 0 auto;padding-bottom:4%;" class="col-xs-12 CS1">';
			P3D13+='	<h3 style="margin-top: 0%; margin-bottom: 1%">';
			P3D13+='<span  class="texto_letra_Arial_paso1 letra-xs">';
			P3D13+='	CAJÓN DE SASTRE';
			P3D13+='	</span>';
			P3D13+='</h3> ';
			P3D13+='<div class="col-xs-12 col-md-8 col-md-offset-2 ">';
			P3D13+='<form action="FileUploadHandler" id="mydropzonePropuesta1"';
			P3D13+='		class="dropzone estilo_bordes_completos letrainputformularios CS2"';
			P3D13+='		method="post" enctype="multipart/form-data" style="border:1px solid black;">';
			P3D13+='			<div class="letrainputformularios" id="dropzonePreview"></div>';
			P3D13+='</form>';
			P3D13+='</div>';
			P3D13+='</div>';
			$('.dropZoneF').html(P3D13); 
			bandera=true;
		}
		
		if(Propuestas.length>1 && proyectoObject.paso3Propuestas=="2" && proyectoObject.estado>60){
			$('.aceptarPropuesta').css("display", "none");
			$('.aceptarPropuesta2').css("display", "none");
			$('.aceptarPropuesta3d1').css("display", "inline"); 
			// PROPUESTAS 3D
			P3D13+='<div style="display: block; margin: 0 auto;" class="col-xs-12">'; 
			P3D13+='<h2 style="margin-top: 5%; margin-bottom: 2%">';
			P3D13+='	<span  class="texto_letra_Arial_paso1 letra-s">';
			P3D13+='		3D';
			P3D13+='	</span>';
			P3D13+='</h2>';
			P3D13+='</div>';
			for(var j = 0; j < Propuestas[1].imagenes.length; j++){
				P3D13+='<div style="display: block; margin: 0 auto;" class="col-xs-12">';
				P3D13+='	<h3 style="margin-top: 2%; margin-bottom: 2%">';
				P3D13+='	<span  class="texto_letra_Arial_paso1 letra-xs">';
				P3D13+='		VISTA '+(j+1);
				P3D13+='	</span>';
				P3D13+='</h3> ';
				P3D13+='<div class="col-xs-12 col-md-8 col-md-offset-2 3D3">';
				P3D13+='<div style="width: 100%; text-align: center;"><img id="imgMoodboard" style="width: 100%; border: 1px 1px 1px 1px black; border: 1px; border-style: solid; padding: 10px;" alt="Propuesta Decoración" src="';
				P3D13+=cadenaforimg+Propuestas[1].imagenes[j];
				P3D13+='"/></div></div></div>'; 
			}
			if(Propuestas[0].imagenes.length>=1){ 
				P3D13+='<div style="display: block; margin: 0 auto;" class="col-xs-12 CS1">';
				P3D13+='	<h3 style="margin-top: 5%; margin-bottom: 1%">';
				P3D13+='<span  class="texto_letra_Arial_paso1 letra-xs">';
				P3D13+='	CAJÓN DE SASTRE';
				P3D13+='	</span>';
				P3D13+='</h3> ';
				P3D13+='<div class="col-xs-12 col-md-8 col-md-offset-2 ">';
				P3D13+='<form action="FileUploadHandler" id="mydropzonePropuesta1"';
				P3D13+='		class="dropzone estilo_bordes_completos letrainputformularios CS2"';
				P3D13+='		method="post" enctype="multipart/form-data" style="border:1px solid black;">';
				P3D13+='			<div class="letrainputformularios" id="dropzonePreview"></div>';
				P3D13+='</form>';
				P3D13+='</div>';
				P3D13+='</div>'; 
				bandera=true;
			}
			$('.3DV11').html(P3D13);
			
			/*<div style="display: block; margin: 0 auto;" class="col-xs-12 CS1">
				<h3 style="margin-top: 5%; margin-bottom: 1%">
					<span  class="texto_letra_Arial_paso1 letra-xs">
						CAJÓN DE SASTRE
					</span>
				</h3> 
				<div class="col-xs-12 col-md-8 col-md-offset-2 ">
				</div> 
			</div> */
		
		
		
			 
			
			
			
			
		} else {
			// SI ES PROYECTO 79 
			$(".3DV13").css({ 'display': 'none' }); 
	        $(".aceptarPropuesta3d1").css({ 'display': 'inline' });
			$(".aceptarPropuesta3d1").html("PROPUESTA 2D NO ACEPTADA");
	        $(".aceptarPropuesta3d1").attr('onclick', '');
	        if(proyectoObject.estado<=60){ 
		        $(".aceptarPropuesta3d1").css({ 'display': 'none' });
			} 
			if(proyectoObject.estado>=80){ 
		        $(".aceptarPropuesta3d1").css({ 'display': 'none' });
			}
			
		} 
		
		// PROPUESTA 2 3D
		 
		var P3D12="";
		 
		
		if(Propuestas.length==2  && proyectoObject.paso3Propuestas=="3" && proyectoObject.estado>60){
			$('.aceptarPropuesta').css("display", "none");
			$('.aceptarPropuesta2').css("display", "none");
			$('.aceptarPropuesta3d2').css("display", "inline");  
			//  PROPUESTAS 3D

			P3D12+='<div style="display: block; margin: 0 auto;" class="col-xs-12">';
			P3D12+='<h2 style="margin-top: 5%; margin-bottom: 2%">';
			P3D12+='	<span  class="texto_letra_Arial_paso1 letra-s">';
			P3D12+='		3D';
			P3D12+='	</span>';
			P3D12+='</h2>';
			P3D12+='</div>';
			for(var j = 0; j < Propuestas[1].imagenes.length; j++){
				P3D12+='<div style="display: block; margin: 0 auto;" class="col-xs-12">';
				P3D12+='	<h3 style="margin-top: 2%; margin-bottom: 2%">';
				P3D12+='	<span  class="texto_letra_Arial_paso1 letra-xs">';
				P3D12+='		VISTA '+(j+1);
				P3D12+='	</span>';
				P3D12+='</h3> ';
				P3D12+='<div class="col-xs-12 col-md-8 col-md-offset-2 3D3">';
				P3D12+='<div style="width: 100%; text-align: center;"><img id="imgMoodboard" style="width: 100%; border: 1px 1px 1px 1px black; border: 1px; border-style: solid; padding: 10px;" alt="Propuesta Decoración" src="';
				P3D12+=cadenaforimg+Propuestas[1].imagenes[j];
				P3D12+='"/>';
				P3D12+='<div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterest3d('+j+')"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:60px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitter3d('+j+')"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:20px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebook3d('+j+')"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div>';
				P3D12+='</div></div></div>';
			} 
			if(Propuestas[0].imagenes.length>=1 && Propuestas[1].imagenes.length>=1){
				P3D12+='<div style="display: block; margin: 0 auto;" class="col-xs-12 ">';
				P3D12+='	<h3 style="margin-top: 5%; margin-bottom: 1%">';
				P3D12+='<span  class="texto_letra_Arial_paso1 letra-xs">';
				P3D12+='	CAJÓN DE SASTRE';
				P3D12+='	</span>';
				P3D12+='</h3> ';
				P3D12+='<div class="col-xs-12 col-md-8 col-md-offset-2 ">';
				P3D12+='<form action="FileUploadHandler" id="mydropzonePropuesta1"';
				P3D12+='		class="dropzone estilo_bordes_completos letrainputformularios CS2"';
				P3D12+='		method="post" enctype="multipart/form-data" style="border:1px solid black;">';
				P3D12+='			<div class="letrainputformularios" id="dropzonePreview"></div>';
				P3D12+='</form>';
				P3D12+='</div>';   
				bandera=true;
			}
			$('.3DV12').html(P3D12);
				
			
			
		
		
			 
		} else {
			// SI ES PROYECTO 79 
			$(".3DV1").css({ 'display': 'block' });
			$(".3DV2").css({ 'display': 'none' });
			$(".3DV3").css({ 'display': 'none' });  
	        $(".aceptarPropuesta3d2").css({ 'display': 'inline' });
			$(".aceptarPropuesta3d2").html("PROPUESTA 2D NO ACEPTADA");
			if(proyectoObject.estado<=60){ 
		        $(".aceptarPropuesta3d2").css({ 'display': 'none' });
			}
			if(proyectoObject.estado>=80){ 
		        $(".aceptarPropuesta3d2").css({ 'display': 'none' });
			}
		} 
		 
		if (proyectoObject.estado>71) {
			$('.aceptarPropuesta').css("display", "none");
			$('.aceptarPropuesta2').css("display", "none");
			$('.aceptarPropuesta3d1').css("display", "inline");
			$('.aceptarPropuesta3d2').css("display", "inline"); 
			if(proyectoObject.paso3Propuestas=="3"){
				$(".aceptarPropuesta3d2").html("PROPUESTA ACEPTADA");
				$(".aceptarPropuesta3d1").html("PROPUESTA NO ACEPTADA"); 
			} else {
				$(".aceptarPropuesta3d1").html("PROPUESTA ACEPTADA");
				$(".aceptarPropuesta3d2").html("PROPUESTA NO ACEPTADA");  
			}
	        $(".aceptarPropuesta3d1").attr('onclick', '');
	        $(".aceptarPropuesta3d2").attr('onclick', '');
		}
		
	}
	if (bandera==false) { 
		cargarDropzonePlanos(true);
	} else { 
		cargarDropzonePlanos(false); 
	}
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function descargar(tipo) { 
	if(tipo==1) {  
		var imagen=$("#anchoCanvas img").attr("src");
		var a = $("<a>")
	    .attr("href", imagen)
	    .attr("download", "canvas.png")
	    .appendTo("body"); 
		a[0].click(); 
		a.remove();
	} else {
		var imagen2=$("#anchoCanvas2 img").attr("src");
		var a = $("<a>")
	    .attr("href", imagen2)
	    .attr("download", "canvas.png")
	    .appendTo("body"); 
		a[0].click(); 
		a.remove();  
	}
}
function rotatedTopLeft(x,y,width,height,rotationAngle){

  // get the center of the rectangle (==rotation point)
  var cx=x+width/2;
  var cy=y+height/2;

  // calc the angle of the unrotated TL corner vs the center point
  var dx=x-cx;
  var dy=y-cy;
  var originalTopLeftAngle=Math.atan2(dy,dx);

  // Add the unrotatedTL + rotationAngle to get total rotation
  var rotatedTopLeftAngle=originalTopLeftAngle+rotationAngle;

  // calc the radius of the rectangle (==diagonalLength/2)
  var radius=Math.sqrt(width*width+height*height)/2;

  // calc the rotated top & left corner
  var rx=cx+radius*Math.cos(rotatedTopLeftAngle);
  var ry=cy+radius*Math.sin(rotatedTopLeftAngle);

  // return the results
  return({left:rx,top:ry});
}

function compartirFacebookLdlc(numero){  
	var nombreLdlc = "Lista de la compra y 2D";
	if(numero==1) { 
		var imgofu = imagen; 
		if(proyectoObject.ldlcs[0].Estado==4 || proyectoObject.ldlcs[0].Estado==2) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	} else {  
		var imgofu = imagen2;
		if(proyectoObject.ldlcs[0].Estado==5 || proyectoObject.ldlcs[0].Estado==3) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	}
	
	 
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitterLdlc(numero){ 
	var nombreLdlc = "Lista de la compra y 2D";
	if(numero==1) { 
		var imgofu = imagen; 
		if(proyectoObject.ldlcs[0].Estado==4 || proyectoObject.ldlcs[0].Estado==2) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	} else {  
		var imgofu = imagen2;
		if(proyectoObject.ldlcs[0].Estado==5 || proyectoObject.ldlcs[0].Estado==3) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	}
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterestLdlc(numero) {  
	var nombreLdlc = "Lista de la compra y 2D";
	if(numero==1) { 
		var imgofu = imagen; 
		if(proyectoObject.ldlcs[0].Estado==4 || proyectoObject.ldlcs[0].Estado==2) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	} else {  
		var imgofu = imagen2;
		if(proyectoObject.ldlcs[0].Estado==5 || proyectoObject.ldlcs[0].Estado==3) {
			var res = proyectoObject.ldlcs[0].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		} else {
			var res = proyectoObject.ldlcs[1].ListaCompra_id;   
			var u = urlbase + "/decoracion-espacios.html?idLdlc=" + res; 
		}
	}
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}

function compartirFacebook3d(numero){ 

	var userNameforpropuesta = getCookie("userAssistant");
	var proyectoNameforpropuesta = proyectoObject.nombreProyecto;
	var cadenaforimg=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/propuestas/";
	
	var res = proyectoObject.id;
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
	var nombreLdlc = "Proyecto decoración 3D"; 

	var imgofu = cadenaforimg+proyectoObject.propuestas[1].imagenes[numero];
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitter3d(numero){ 

	var userNameforpropuesta = getCookie("userAssistant");
	var proyectoNameforpropuesta = proyectoObject.nombreProyecto;
	var cadenaforimg=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/propuestas/";
	
	var res = proyectoObject.id;
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
	var nombreLdlc = "Proyecto decoración 3D"; 

	var imgofu = cadenaforimg+proyectoObject.propuestas[1].imagenes[numero];
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterest3d(numero) {
	
	var userNameforpropuesta = getCookie("userAssistant");
	var proyectoNameforpropuesta = proyectoObject.nombreProyecto;
	var cadenaforimg=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/propuestas/";
	
	var res = proyectoObject.id;
	var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
	var nombreLdlc = "Proyecto decoración 3D"; 
	
	var imgofu = cadenaforimg+proyectoObject.propuestas[1].imagenes[numero];
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}
function compartirFacebookProyect(){ 
	var res = proyectoObject.id;  
	if(proyectoObject.projectsTypes.precio==179){
		var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 3D"; 
	} else { 
		var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 2D"; 
	}
	 
	var imgofu = imagen;
	FB.ui({
		method : 'feed',
		link : u,
		picture : imgofu,
		caption : nombreLdlc,
	}, function(response) {
	});
}
function compartirTwitterProyect(){ 
	var res = proyectoObject.id;  
	if(proyectoObject.projectsTypes.precio==179){
		var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 3D"; 
	} else { 
		var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 2D"; 
	}
	 
	var imgofu = imagen;
	//window.open.href = "https://twitter.com/share?url=" + u + "&text="+ document.title;
	window.open("https://twitter.com/share?url=" + u + "&text="+ nombreLdlc);
	//  win.focus();
	return false;
	/*
	 * FB.ui({ method: 'share', href: u, }, function(response){});
	 */
}
function compartirPinterestProyect() {  
	var res = proyectoObject.id;  
	if(proyectoObject.projectsTypes.precio==179){
		var u = urlbase + "/proyecto-decoracion-online-3d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 3D"; 
	} else { 
		var u = urlbase + "/proyecto-decoracion-online-2d.html?id=" + res; 
		var nombreLdlc = "Proyecto decoración 2D"; 
	}
	
	var imgofu = imagen;
	PinUtils.pinOne({
		url : u,
		media : imgofu,
		description : nombreLdlc
	});
}

var arrayItems="";
var k=0;
var l=0; 
var imagenPdf=[];
var compartir="";
var data="";
var idDecorador=0;
var listaAfiliados="";

function toDataUrl(src, callback, outputFormat) {
	  // Create an Image object
	  var img = new Image();
	  // Add CORS approval to prevent a tainted canvas
	  img.crossOrigin = 'Anonymous';
	  img.onload = function() {
	    // Create an html canvas element
	    var canvas = document.createElement('CANVAS');
	    // Create a 2d context
	    var ctx = canvas.getContext('2d');
	    var dataURL;
	    // Resize the canavas to the image dimensions
	    canvas.height = this.height;
	    canvas.width = this.width;
	    // Draw the image to a canvas
	    ctx.drawImage(this, 0, 0);
	    // Convert the canvas to a data url
	    dataURL = canvas.toDataURL(outputFormat);
	    dataURL.crossOrigin = 'Anonymous';
	    // Return the data url via callback
	    callback(dataURL);
	    // Mark the canvas to be ready for garbage 
	    // collection
	    canvas = null;
	  };
	  // Load the image
	  img.crossOrigin = 'Anonymous';
	  img.src = src;
	}   
function setTrabajos(){
	// alert(urlactual+" esta es la url actual");
	var userNameforpropuesta = getCookie("userAssistant");
	var proyectoNameforpropuesta = proyectoObject.nombreProyecto;
	var arrayDePropuestas=proyectoObject.planos;
	var cadenaforimg=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/planos/";
	console.log(proyectoObject);
	if(proyectoObject.estado>80) {
		var cadena = '';
		for (var i = 0; i < arrayDePropuestas.length; i++) {
			 
			cadena +='<div style="display: block;background-color:transparent; margin: 0 auto;  padding-top: 25px; padding-bottom: 25px;" class="padding-formulario">';
			for (var j = 0; j < arrayDePropuestas[i].imagenes.length; j++) {
				if(arrayDePropuestas[i].imagenes.length==0){}else {
					cadena +='<div style="width: 100%; text-align: center;"><img id="imgMoodboard" style="max-width: 100%; border-style: solid; padding: 5px;" alt="Proyecto Decoración" src="';
					cadena+=cadenaforimg+arrayDePropuestas[i].imagenes[j];
					cadena+='"/> </div><br /><br />';
				}
			} 
			
			 
			var ficheroNameforpropuesta = arrayDePropuestas[i].pdf;
			var cadenaforpdf=urlbaseForMoodboards+"/usuarios/"+userNameforpropuesta+"/"+proyectoNameforpropuesta+"/planos/"+ficheroNameforpropuesta;
			if(i==0){
				cadena +='<a target="_blank" href="'+cadenaforpdf +'"	 id="download"><h1 class="letra-s" style="padding-top:1%;text-decoration:bold;color:black">DESCARGAR PDF PLANOS<i class="glyphicon glyphicon-cloud-download"></i></h1></a><h3><span class="texto_letra_Arial_paso1">LOS PLANOS DE DISTRIBUCIÓN TE AYUDARÁN A TENER CLARO DÓNDE VA CADA COSA Y A SITUARLAS EN EL LUGAR CORRECTO</span>	</h3>';
				
			} 
			cadena +='</div>';
		}
		 
		cadena+='<h2 class="titulo_pantalla col-xs-12" style="margin-top: 5%;">LISTA DE LA COMPRA</h2>';
		cadena+='<h2 class="col-xs-12" style="margin-top: 4%; margin-bottom: 2%"> <span  class="texto_letra_Arial_paso1 letra-ms">2D</span></h2>';
		cadena+='<div class="fondoAmpliar">';
		cadena+='<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" id="anchoCanvas" style="background-color:white">'; 
		cadena+='</div>'; 
		cadena+='</div>'; 
		cadena+='<br/><br/>';
		cadena+='<h2 class="col-xs-12" style="margin-top: 4%; margin-bottom: 2%"> <span  class="texto_letra_Arial_paso1 letra-ms">PRODUCTOS</span></h2>';
		cadena+='<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8  col-lg-offset-2 listaDeItems" style="margin-bottom:5%">';
		 
		cadena+='</div>';  
		cadena+='<h2 class="col-xs-12" style="margin-top: 2%; margin-bottom: 6%"> <span  class="texto_letra_Arial_paso1 letra-ms aStyle"><a style="cursor:pointer" onclick="resumenItems()"> VER TODOS LOS PRODUCTOS <i class="glyphicon glyphicon-th-list"></i></a></span></h2>'; 
		
		
		for (var i = 0; i < arrayDePropuestas.length; i++) {

			if(i==1){  
				cadena +='<div style="float: left;background-color:transparent; margin: 0 auto;  padding-top: 25px; padding-bottom: 25px;" class="padding-formulario">';
			  
				cadena +=' <h1 class="letra-s DPDF"  onclick="descargarPdf()" style="cursor:pointer;padding-top:1%;text-decoration:bold;color:black">DESCARGAR PDF LISTA DE LA COMPRA <i class="glyphicon glyphicon-cloud-download"></i></a></h1><h3><span class="texto_letra_Arial_paso1">EN ESTE PDF INTERACTIVO ENCONTRARÁS UNA SELECCIÓN COMPLETA DE TODOS LOS PRODUCTOS QUE HEMOS INCORPORADO AL DISEÑO. TODOS ELLOS CON LINKS DIRECTOS A SHOPS ONLINE DONDE PODRÁS ADQUIRIRLOS COMODAMENTE DESDE CASA, O BIEN CON LA MARCA PARA QUE PUEDAS LOCALIZARLOS DE MANERA SENCILLA.\nSI TIENES ALGUNA DUDA, COMO SIEMPRE, LLÁMANOS O ESCRÍBENOS Y LO HABLAMOS.</span>	</h3>';

				cadena +='</div>';
			}

		}
		if(proyectoObject.estado>=100){
			cadena+='<div><br/><br/><br/><br/><button class="botonesloginreglost btn btn-primary btn-l btn-block letra-s aceptarPaso4" style="display: block;margin: 0 auto; max-width: 400px;" >PROYECTO FINALIZADO</button><br/><br/></div>';
			
		} else {
			cadena+='<div><br/><br/><br/><br/><button class="botonesloginreglost btn btn-primary btn-l btn-block letra-s aceptarPaso4" style="display: block;margin: 0 auto; max-width: 450px;" onclick="aceptarPaso4()" >ACEPTAR Y FINALIZAR PROYECTO</button><br/><br/></div>';
		}
	} else {
		var cadena="";
		cadena+='<div style="height:100%;padding:2%;background-color:rgba(255,255,255,0.7)">';
		cadena+='<h4 class="subtitulo_pantalla" style="margin-top:2%;margin-bottom:2%;">';
		cadena+='	<p class="letra-s">EL DECORADOR ESTÁ TRABAJANDO EN LOS PLANOS DE DISTRIBUCIÓN</p>';
		cadena+='</h4>';
		cadena+='</div>'; 
	}
	
	$('#divForPropuestas').html(cadena);
	if(proyectoObject.ldlcs.length==0){
		
	} else if(proyectoObject.ldlcs.length==1){
			if(proyectoObject.ldlcs[0].Estado==4 || proyectoObject.ldlcs[0].Estado==5) {
				$('#imagen1').css("display", "none");
				var id_ldlc = proyectoObject.ldlcs[0].ListaCompra_id;
				var b;
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
			  				id_ldlc : id_ldlc
			  			},
			  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			  			contentType : "application/json; charset=utf-8",
			  			success : function(data) {
			  				// BootstrapDialog.alert("DATA: "+data);
			  				// $usuarioGlobal=data;
			  				if (isError(data)) {
			  					$(document.body).css({'cursor' : 'default'}); 
			  					var href = urlbase;
			  					window.location = href;
			  				} else { 
			  						$(document.body).css({'cursor' : 'default'});
				  					 var lc=data;
				  					 console.log(lc);
				  						var arrayDeObjcts=JSON.parse(lc.Canvas);
				  						
				  						// lista de items del canvas
				  						arrayItems=arrayDeObjcts.objects;
				  						

					  					imagen=urlbuckets3+'ldlc/imagenes/'+lc.imagen; 
					  					imagen.crossOrigin = 'Anonymous';
					  					$("#anchoCanvas").html('<img style="width:100%" src="'+imagen+'" alt="Composición 2D">');
									
									html="";
									html+='<div style="position:absolute;bottom:15px;right:180px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirPinterestProyect()"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-pinterest facebook-icon"> </i></div>  <div style="position:absolute;bottom:15px;right:140px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirTwitterProyect()"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa fa-twitter facebook-icon"> </i></div>    <div style="position:absolute;bottom:15px;right:100px;cursor:pointer;width:30px;margin-right:10px" onclick="compartirFacebookProyect()"><i style="text-align:center;font-size:15px;width:30px;background-color:white;border-radius:50%;padding: 7px;;height:30px;border:1px solid black" class="fa  facebook-icon fa-facebook"> </i></div><div style="position:absolute;bottom:15px;right:30px;cursor:pointer" style="text-align: center; display: inline;"><img class="ampliar" src="img/pasos/ampliar.png"  onclick="ampliar(1)" style="width:30px;margin-right:10px;background-color:white;border-radius:50%" alt="Ampliar imagen" title="Ampliar imagen"><img class="descargar" src="img/pasos/descargar.png"  onclick="descargar(1)" style="width:30px;background-color:white;border-radius:5px;" alt="Descargar imagen" title="Descargar imagen"></div>';
									 $('#anchoCanvas').append(html);
									 
									 
									 
									arrayItems=arrayItems.reduce(function(result, current) {
								        result[current.id] = result[current.id] || [];
								        result[current.id].push(current);
								        return result;
								    }, {});
									idDecorador=data.Decorador_id;
									listaAfiliados=data.listAfiliados;  
									listaDeItems="";
									l=0;
									$.each(arrayItems, function(i, item) {
										style=""; 
										k++;									
										urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
										/*for(i=0;i<listaAfiliados.length;i++){
											url_base=listaAfiliados[i].url_base;
											url_add=listaAfiliados[i].url_add; 
											if(urlProducto==undefined){ } else {
												if(urlProducto.indexOf(url_add) > -1 && urlProducto.indexOf(url_base) > -1) {
													if(urlProducto.indexOf(listaAfiliados[i].custom_param) <= -1) {
														urlProducto=urlProducto+"&"+listaAfiliados[i].custom_param+"="+idDecorador;
													}
												}
											}
										} */ 
											var img = new Image(); 
											img.src = item[0].src;  
											img.crossOrigin = 'Anonymous';
											if(img.width>img.height){
												style="height:100%;width:auto;";
											} else { 
												style="width:100%;height:auto;";
											} 

											if(item[0].imagenOriginal!=undefined) {imgSRC=item[0].imagenOriginal} else {imgSRC=item[0].src}
											if(item[0].price>0){
												listaDeItems+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros"><div class="imagenItems"><img style="'+style+'" src="'+imgSRC+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+urlProducto+'">VER +</a></div></div>';

													toDataUrl(img.src, function(base64Img){  
														imagenPdf[i]=base64Img; 
														imagenPdf[i].crossOrigin = 'Anonymous';
														l++;
 
												    }) 
									    	}
										
									})  
									
									$.each(arrayItems, function(i, item) {
										if(item[0].price>0){
											 	toDataUrl(item[0].src, function(base64Img){  
													imagenPdf[i]=base64Img; 
													imagenPdf[i].crossOrigin = 'Anonymous';
													l++;

											    }) 
								    	}
									})  
									/*$.each(arrayItems, function(i, item) {
										style=""; 
										k++;
										 
											var img = new Image(); 
											img.src = item[0].src; 
											img.crossOrigin = 'Anonymous';
											if(img.width>img.height){
												style="height:100%;width:auto;";
											} else { 
												style="width:100%;height:auto;";
											} 
											if(item[0].price>0){
												listaDeItems+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros"><div class="imagenItems"><img style="'+style+'" src="'+item[0].src+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+item[0].url+'">VER +</a></div></div>';

												l++;
													toDataUrl(img.src, function(base64Img){ 
														imagenPdf[i]=base64Img; 
														imagenPdf[i].crossOrigin = 'Anonymous';
 
												    }) 
									    	}
										
									}) */
								    $('.listaDeItems').html(listaDeItems); 

			  				}

			  			}
			  		});

			  	} catch (e) {
			  		console.log("Se ha producido un error en la conexión con el servidor");
					$(document.body).css({'cursor' : 'default'}); 
			  	}
			} 
	}
}
var logo="";
toDataUrl('img/forHome/logoDeco.jpg', function(base64Img){
    logo=base64Img;
})   
function descargarPdf() {
	$(document.body).css({ 'cursor': 'wait' });
	$('#ModalPdf').modal('show');
	$('#ModalPdf').on('shown.bs.modal', function (e) { 
		generarPdf();
	}) 
	try {
		function generarPdf(){
			totalItems=l;
			var doc = new jsPDF();
			doc.addImage(logo, 'JPEG', 50, 80, 100, 35); 
	
			doc.setDrawColor(0);
			doc.setFillColor(187,199,195);
			doc.rect(0, 268, 1500, 30, 'F'); 
	
			doc.setTextColor(255, 255, 255);
			doc.text(120, 285, 'LISTA DE LA COMPRA');
	
			doc.addPage('a4','');
			doc.setFontSize(9);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("bold");
			doc.text(105, 20, 'LISTA DE LA COMPRA', null, null, 'center');
	
	
			doc.setFontType("normal");
			doc.setDrawColor(0);
			doc.setFillColor(187,199,195);
			doc.rect(18, 30, 118, 7, 'F');
			doc.setTextColor(255, 255, 255);
			doc.text(65, 35, 'PRODUCTOS');
	
			doc.setDrawColor(0);
			doc.setFillColor(187,199,195);
			doc.rect(140, 30, 55, 7, 'F');
	
			doc.setTextColor(255, 255, 255);
			doc.text(146, 35, 'CANTIDAD Y PRECIO');
			doc.setLineWidth(0.1);
			linea=totalItems*56;
			registros=5;
			if(totalItems>=registros) {
				doc.line(139, 50, 139, 280);
				linea=linea-280;
				registros=registros+5;
			} else {
				if(totalItems<=3){
					linea=linea+18;
				} else if(totalItems==4) {
					linea=linea; 
				}
				doc.line(139, 50, 139, linea);
			}
			j=0;
			b=0;
			var totalFinal=0;  
			i=0;  
			d=0;
			$.each(arrayItems, function(i, item) { 
				if(item[0].price==undefined){}else{
			    if(item[0].price>0){
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
			    c=0;
				for(var k=0;k<item.length;k++){
					total2=item[k].price;
					if(total2!=0){
						c++;
					} 
				}
				total=item[0].price*c;
				total=total.toFixed(2);
				totalFinal=parseFloat(totalFinal)+parseFloat(total);
				totalFinal=	totalFinal.toFixed(2);
				
				urlProducto=item[0].url;
				console.log(urlProducto);
				console.log(listaAfiliados.length);
				for(s=0;s<listaAfiliados.length;s++){
					url_base=listaAfiliados[s].url_base;
					url_add=listaAfiliados[s].url_add; 

					if(urlProducto==undefined){ } else {
						if(urlProducto.indexOf(url_add) > -1 && urlProducto.indexOf(url_base) > -1) {
							if(urlProducto.indexOf(listaAfiliados[s].custom_param) <= -1) {
								urlProducto=urlProducto+"&"+listaAfiliados[s].custom_param+"="+idDecorador;
							}
						}
					}
					console.log(urlProducto);
				} 
				if(b==5 || b==10 || b==15 || b==20 || b==25 || b==30 || b==35 || b==40 || b==45 || b==50 || b==55 || b==60 || b==65 || b==70 || b==75) {
					doc.addPage('a4','');
					doc.setTextColor(0, 0, 0);
					doc.setFontType("bold");
					doc.text(105, 20, 'LISTA DE LA COMPRA', null, null, 'center');
	
		 
					doc.setFontType("normal");
					doc.setDrawColor(0);
					doc.setFillColor(187,199,195);
					doc.rect(18, 30, 118, 7, 'F');
					doc.setFontSize(9);
					doc.setTextColor(255, 255, 255);
					doc.text(65, 35, 'PRODUCTOS');
	
					doc.setDrawColor(0);
					doc.setFillColor(187,199,195);
					doc.rect(140, 30, 55, 7, 'F');
	
					doc.setTextColor(255, 255, 255);
					doc.text(146, 35, 'CANTIDAD Y PRECIO');
					doc.setLineWidth(0.1);
					if(totalItems>=registros) {
						doc.line(139, 50, 139, 280);
						linea=linea-280;
						registros=registros+5;
					} else {
						if(totalItems<=b+2){
							linea=linea+18;
						} else if(totalItems>=b+3) {
							linea=linea+14; 
						}
						doc.line(139, 50, 139, linea);
					}
					j=0;
				}
				j=j+50;
			    doc.setTextColor(0, 0, 0); 
				doc.addImage(imagenPdf[i], 'JPEG', 18, j, 30, 30);
				d++;
			    doc.setFontSize(9);
			    
			    if(item[0].title.length>45){
			    	title=item[0].title.substr(0, 45)+"...";
			    } else {
			    	title=item[0].title;
			    }
			    doc.text(60, j+5, title);
			    doc.line(60, j+7, 130, j+7);
			    
			    doc.text(60, j+15, url[0]);
			    doc.line(60, j+17, 130, j+17);
			    
			    doc.text(60, j+25, item[0].price+'€');
			    doc.line(60, j+27, 130, j+27);
			    if(item.length>1){
			    	doc.text(160, j+5, item.length+" UNIDADES");
			    } else {
			    	doc.text(162, j+5, item.length+" UNIDAD");
			    }
			    doc.line(190, j+7, 150, j+7);
			    doc.text(164, j+15, total+'€');
			    doc.line(190, j+17, 150, j+17);
			    
			    doc.setDrawColor(0);
				doc.setFillColor(0);
				doc.rect(150, j+22, 40, 7, 'F');
			    doc.setTextColor(255, 255, 255);
				doc.textWithLink('COMPRAR', 162, j+27, { url: urlProducto });
			    b++;
			    }
				}
			})
			linea=linea+10;
	
			doc.line(18, linea, 190, linea);
			doc.setTextColor(0, 0, 0);
			doc.setFontType("bold");
			doc.setFontSize(12);
			doc.text(105, linea+10, 'TOTAL: '+totalFinal+'€', null, null, 'center');
			
			doc.save('Lista de la compra - '+proyectoObject.nombreProyecto);
		    doc = new jsPDF(); 
			$('#ModalPdf').modal('hide');
			$(".DPDF").attr("onclick","generarPdf2()");
			
		}
		$(document.body).css({ 'cursor': 'default' });
	}
	catch(err) {
		$('#ModalPdf').modal('hide');
		BootstrapDialog.alert(err.message); 
		$(document.body).css({ 'cursor': 'default' });
		
	}
} 

function generarPdf2(){
	$(document.body).css({ 'cursor': 'wait' });
	$('#ModalPdf').modal('show');
	$('#ModalPdf').on('shown.bs.modal', function (e) {
		generarPdf3();
	}) 
	try {
		function generarPdf3(){
			totalItems=l;
			var doc = new jsPDF();
			
			$('#ModalPdf').modal('hide'); 
		} 
		$(document.body).css({ 'cursor': 'default' });
	}
	catch(err) {
		$('#ModalPdf').modal('hide');
		BootstrapDialog.alert(err.message); 
		$(document.body).css({ 'cursor': 'default' });
		
	}
}



function resumenItems(){
	
 
	
	
	$('#resumenItems').modal('show');
	var cadena="";
	cadena+='<div class="col-xs-12" style="padding-left:0">';
	cadena+='<div class="col-xs-6 col-sm-8" style="padding-top: 15px;text-align:left;padding-left:5%">'; 
	cadena+='	<p class="letra-xs">PRODUCTOS</p>'; 
	cadena+='</div>'; 
	cadena+='<div class="col-xs-6 col-sm-4">'; 
	cadena+='	<p class="letra-xs cantidadPrecio" style="padding-top: 15px;text-align:center">CANTIDAD Y PRECIO</p>';  
	cadena+='</div>';
	cadena+='<hr width="100%"/>';
	var totalFinal=0;
	var j=0;
	listaAfiliados=proyectoObject.listAfiliados;  

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
   
function setEstiloPre(){
	var habitacionelegida=getCookie("paso1");
	var a = document.getElementById("imagen_clasico");
	var b = document.getElementById("imagen_inbetween");
	var c = document.getElementById("imagen_modern");
	
	if(habitacionelegida=='salon'){
		a.src="img/categorias/salon/estilo-clasico.png"
		b.src="img/categorias/salon/estilo-nordico.png"
		c.src="img/categorias/salon/estilo-moderno.png"
	}
	if (habitacionelegida == "comedor") {
		a.src="img/categorias/comedor/estilo-clasico.png"
		b.src="img/categorias/comedor/estilo-nordico.png"
		c.src="img/categorias/comedor/estilo-moderno.png"	
	}
	if (habitacionelegida == "dormitorio") {
		a.src="img/categorias/dormitorio/estilo-clasico.png"
		b.src="img/categorias/dormitorio/estilo-nordico.png"
		c.src="img/categorias/dormitorio/estilo-moderno.png"
	}
	if (habitacionelegida == "dormitorio-infantil") {
		a.src="img/categorias/dormitorio-infantil/estilo-clasico.png"
		b.src="img/categorias/dormitorio-infantil/estilo-nordico.png"
		c.src="img/categorias/dormitorio-infantil/estilo-moderno.png"
	}
	if (habitacionelegida == "escritorio") {
		a.src="img/categorias/escritorio/estilo-clasico.png"
		b.src="img/categorias/escritorio/estilo-nordico.png"
		c.src="img/categorias/escritorio/estilo-moderno.png"
	}
	if (habitacionelegida == "recibidor") {
		a.src="img/categorias/recibidor/estilo-clasico.png"
		b.src="img/categorias/recibidor/estilo-nordico.png"
		c.src="img/categorias/recibidor/estilo-moderno.png"
	}


}

function setminimalismoPre(){
	var habitacionelegida=getCookie("paso1");
	var a = document.getElementById("imagen_menos_es_mas");
	var b = document.getElementById("imagen_ni_mucho_ni_poco");
	var c = document.getElementById("imagen_mas_es_mas");
	
	if(habitacionelegida=='salon'){
		a.src="img/categorias/salon/minimalismo-menosesmas.png"
		b.src="img/categorias/salon/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/salon/minimalismo-masesmas.png"
	}
	if (habitacionelegida == "comedor") {
		a.src="img/categorias/comedor/minimalismo-menosesmas.png"
		b.src="img/categorias/comedor/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/comedor/minimalismo-masesmas.png"	
	}
	if (habitacionelegida == "dormitorio") {
		a.src="img/categorias/dormitorio/minimalismo-menosesmas.png"
		b.src="img/categorias/dormitorio/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/dormitorio/minimalismo-masesmas.png"
	}
	if (habitacionelegida == "dormitorio-infantil") {
		a.src="img/categorias/dormitorio-infantil/minimalismo-menosesmas.png"
		b.src="img/categorias/dormitorio-infantil/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/dormitorio-infantil/minimalismo-masesmas.png"
	}
	if (habitacionelegida == "escritorio") {
		a.src="img/categorias/escritorio/minimalismo-menosesmas.png"
		b.src="img/categorias/escritorio/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/escritorio/minimalismo-masesmas.png"
	}
	if (habitacionelegida == "recibidor") {
		a.src="img/categorias/recibidor/minimalismo-menosesmas.png"
		b.src="img/categorias/recibidor/minimalismo-nimuchonipoco.png"
		c.src="img/categorias/recibidor/minimalismo-masesmas.png"
	}


}
function setcolorPre(){
	var habitacionelegida=getCookie("paso1");
	var a = document.getElementById("imagen_neutro");
	var b = document.getElementById("imagen_algo_de_color");
	var c = document.getElementById("imagen_con_contraste");
	
	if(habitacionelegida=='salon'){
		a.src="img/categorias/salon/color-neutro.png"
		b.src="img/categorias/salon/color-pincelada.png"
		c.src="img/categorias/salon/color-atope.png"
	}
	if (habitacionelegida == "comedor") {
		a.src="img/categorias/comedor/color-neutro.png"
		b.src="img/categorias/comedor/color-pincelada.png"
		c.src="img/categorias/comedor/color-atope.png"	
	}
	if (habitacionelegida == "dormitorio") {
		a.src="img/categorias/dormitorio/color-neutro.png"
		b.src="img/categorias/dormitorio/color-pincelada.png"
		c.src="img/categorias/dormitorio/color-atope.png"
	}
	if (habitacionelegida == "dormitorio-infantil") {
		a.src="img/categorias/dormitorio-infantil/color-neutro.png"
		b.src="img/categorias/dormitorio-infantil/color-pincelada.png"
		c.src="img/categorias/dormitorio-infantil/color-atope.png"
	}
	if (habitacionelegida == "escritorio") {
		a.src="img/categorias/escritorio/color-neutro.png"
		b.src="img/categorias/escritorio/color-pincelada.png"
		c.src="img/categorias/escritorio/color-atope.png"
	}
	if (habitacionelegida == "recibidor") {
		a.src="img/categorias/recibidor/color-neutro.png"
		b.src="img/categorias/recibidor/color-pincelada.png"
		c.src="img/categorias/recibidor/color-atope.png"
	}


}


function alahomefunction(){
	var href = urlbase;
	window.location = href;
}
function insertarparaPerfiles(cadena){
	
}
function portfolios(quienEs){
	
	
	
	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/GetPerfiles',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				carpeta : "perfiles",
				subcarpeta : quienEs,
				
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				
				var cadenacodigo="";
				
				//alert("eliminado");
				if(data.perfil.length > 0){
					
					var perfiles = data.perfil;
					
					for (var i = 0; i < perfiles.length; i++) {
						// BootstrapDialog.alert(proyectos_ajax[i].nombreProyecto);
						var titulo='';
						var palabrasClave='';
						var textoLargo='';
						//alert(perfiles[i].subcarpeta);
						if(quienEs=='Coralia'){
							
						
						if(perfiles[i].subcarpeta=='1'){
							titulo='dormitorio colonial	';
							palabrasClave='azul, madera, chic';
							textoLargo='Porque el colonial también puede tener un toque chic. Para ello podemos jugar con los complementos DECO y un papel pintado de estilo vintage ';
						}
						if(perfiles[i].subcarpeta=='2'){
							titulo='Salón industrial';
							palabrasClave='metal, gris, funcional';
							textoLargo='El estilo industrial también admite una pincelada de color. El amarillo combina perfecto con los tonos grises y los muebles metálicos restándoles frialdad';
						}
						if(perfiles[i].subcarpeta=='3'){
							titulo='Recibidor natural';
							palabrasClave='madera, naturaleza, green';
							textoLargo='La entrada puede ser un espacio más informal y sencillo que amueblemos con varios elementos versátiles, como troncos, bancos, sillas…';
						}
						if(perfiles[i].subcarpeta=='4'){
							titulo='Salón moderno';
							palabrasClave='moderno, sencillo, confortable, masculino';
							textoLargo='La idea era crear una zona de estar confortable, con una decoración sencilla, en líneas rectas, pero a la vez acogedora. Los colores predominantes debían ser los grises, y beiges con un toque importante de azulón.';
						}
						if(perfiles[i].subcarpeta=='5'){
							titulo='Habitación de bebé';
							palabrasClave='infantil, mint, nórdico, luminoso';
							textoLargo='Un espacio para un bebé con base de tonos neutros y toques de mint para darle vida al conjunto. DECO nórdica sencilla y acogedora';
						}
						if(perfiles[i].subcarpeta=='6'){
							titulo='Dormitorio industrial';
							palabrasClave='madera, gris, calidez, espacio';
							textoLargo='El detalle de los pájaros crea la ilusión de encontrarnos en un dormitorio con más aire y una mayor sensación de espacio';
						}
						if(perfiles[i].subcarpeta=='7'){
							titulo='Comedor rústico';
							palabrasClave='madera, vintage, acogedor';
							textoLargo='un comedor con aire vintage, muy acogedor, para el uso diario y con un extra de encanto gracias a la alacena';
						}
						if(perfiles[i].subcarpeta=='8'){
							titulo='Espacio de trabajo';
							palabrasClave='industrial, nórdico, sencillo';
							textoLargo='Piezas insdustriales mezcladas con otras en madera y con complementos de aire atemporal. Un espacio de trabajo que bien podría estar integrado en una habitación, un salón…';
						}
						if(perfiles[i].subcarpeta=='9'){
							titulo='Salón acogedor';
							palabrasClave='femenino, cálido, shabby, chic';
							textoLargo='Un salón con aire femenino, piezas con historia, colores neutros y toques de lila que favorecen la sensación de atmósfera delicada';
						}
						if(perfiles[i].subcarpeta=='10'){
							titulo='Espacio sofisticado';
							palabrasClave='atemporal, con personalidad, aire retro';
							textoLargo='Para crear una buena galería en las paredes, lo mejor es ir poniendo cuadros, láminas y objetos especiales y de diferentes formas, materiales y acabados';
						}
						if(perfiles[i].subcarpeta=='11'){
							titulo='comedor en cocina';
							palabrasClave='moderna, acogedora, blanco y negro';
							textoLargo='Los platos y el MIX en las paredes es tendencia. Nada mejor que decorar el rincón de la zona de comer con esta idea';
						}
						if(perfiles[i].subcarpeta=='12'){
							titulo='Dormitorio romántico';
							palabrasClave='rosa, azul, forja, acogedor';
							textoLargo='A veces, uno de los muebles -como puede ser esta gran cama de forja- se convierte en la protagonista de un dormitorio. Más si queremos potenciar el aire femenino del cuarto';
						}
						}else{
							
							if(perfiles[i].subcarpeta=='1'){
								titulo='Dormitorio juvenil nórdico';
								palabrasClave='nórdico	iluminación, natural,elegante';
								textoLargo='Si queréis conseguir un dormitorio infantil unisex que pueda servir tanto para niños como para niñas con una decoración sencilla, en líneas rectas, pero a la vez acogedora. Los colores predominantes son los grises, las pinceladas de color vivas como el amarillo crean dinámicos contrastes perfectos para estos espacios infantiles';
								
							}
							if(perfiles[i].subcarpeta=='2'){
								titulo='Salón nórdico';
								palabrasClave='azul, madera, moderno';
								textoLargo='Este salón de estilo nórdico, con luz natural matizada por una iluminación cálida. Tonos claros y mobiliario con materiales nobles';
								}
							if(perfiles[i].subcarpeta=='3'){
								titulo='Ambientes minimalista';
								palabrasClave='blanco, negro, metal';
								textoLargo='Espacio minimalista donde priman los colores blanco y negro y el uso de tonalidades metálicas';
								}
							if(perfiles[i].subcarpeta=='4'){
								titulo='Escritorio retro';
								palabrasClave='madera,decorativo,funcional';
								textoLargo='Es la alternativa al estilo vintage, para los amantes de décadas pasadas que no encuentran un estilo actual que se ajuste a sus gustos';
								}
							if(perfiles[i].subcarpeta=='5'){
								titulo='Comedor moderno';
								palabrasClave='abierto,simplicidad y elegancia';
								textoLargo='En este caso nos encontramos con un comedor abierto, los colores principales en este estilo son los neutrales, negro y blanco con un tono fuerte y brillante.  algo que le da un toque sofisticado y elegante';
								}
							if(perfiles[i].subcarpeta=='6'){
								titulo='Recibidor natural';
								palabrasClave='femenino,papel pintado, colores pastel';
								textoLargo='Este espacio luminoso y confortable reúne todos los sentidos soñados y aventureros, formas geométricas y mucha vegetación';
								}
							if(perfiles[i].subcarpeta=='7'){
								titulo='Recibidor Contemporáneo';
								palabrasClave='mobiliario moderno, cómodo, atractivo';
								textoLargo='Creamos un ambiente relajado con iluminación indirecta, capaz de aplicarse tanto en oficinas y comercios, como a loft y hogares';
								}
							if(perfiles[i].subcarpeta=='8'){
								titulo='Dormitorio actual';
								palabrasClave='luminoso,tonos claros';
								textoLargo='Este dormitorio actual, que resalta por su sencillez. La decoración de estilo escandinavo, con detalles que aportan vida y calidez a cada estancia';
								}
							if(perfiles[i].subcarpeta=='9'){
								titulo='Salón industrial';
								palabrasClave='industrial,chic, metal';
								textoLargo='Espacio inspirador donde la madera y las fibras naturales pondrán el acento cálido a los ambientes';
								}
							if(perfiles[i].subcarpeta=='10'){
								titulo='Dormitorio clásico';
								palabrasClave='colores naturales, luz, armonía';
								textoLargo='La gama de los tonos tostados es una apuesta segura para crear ambientes ... introducir muebles de madera que aportan aún más calidez al dormitorio';
								}
							
						}	
						
						
						if(i==0){
							cadenacodigo=cadenacodigo+'<div class="text-center item  active">';
						}else{
							cadenacodigo=cadenacodigo+'<div class="text-center item">';
							
						}
						cadenacodigo=cadenacodigo+'<div style="margin-right: 0px; margin-left: 0px;" id="cabeceraPerfiles" class="row cabeceraPerfiles"><div style="text-align:left; margin-right: 0px; margin-left: 0px; padding-right: 0px; padding-left: 0px;"';
						cadenacodigo=cadenacodigo+'class="row col-md-6 col-sm-6 col-xs-12"><div	style="border-bottom: black; border-bottom-style: solid; border-bottom-width: 1px;"	class="col-md-12 col-sm-12 col-xs-12"> 	<h4>TIPO:'+titulo +'</h4>';
						cadenacodigo=cadenacodigo+'</div><hr><div class="col-md-12 col-sm-12 col-xs-12"><h5>PALABRAS CLAVE:'+palabrasClave+'</h5></div></div><div class="col-md-6 col-sm-6 col-xs-12" style="border: black; border-style: solid; border-width: 1px;"><div style="width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-top: -5px; height: 5px"></div>	<h6 style="text-align: center; line-height: 1.6;">'+textoLargo+'</h6>';
						cadenacodigo=cadenacodigo+'<div	style="width: 96%; background-color: white; margin-right: 2%; margin-left: 2%; margin-bottom: -5px; height: 5px"></div>	</div></div><br><div id="cuerpoPerfiles" class="row">	<div class="col-md-6 col-sm-6 col-xs-12">	<img width="100%" alt="moodboard" src="perfiles/'+ perfiles[i].perfil+'/'+perfiles[i].subcarpeta +'/'+perfiles[i].fileJpg+'">';
						cadenacodigo=cadenacodigo+'</div><div class="col-md-6 col-sm-6 col-xs-12"><img width="100%" alt="composicion"  src="perfiles/'+ perfiles[i].perfil+'/'+perfiles[i].subcarpeta +'/'+perfiles[i].filePng+'"></div></div><hr></div>';
						
					}
					//alert(cadenacodigo);
					$('#carouselinner').html(cadenacodigo);
					
					$('#modalforperfiles').modal('show');
					setTimeout(function() { carouselNormalization(); }, 500);
				}
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
	
}
 
function carouselNormalization() {
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
	            $(this).css('height',tallest + 'px');
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

function irablogfunction(){
	window.location.href="http://decotheco.com/blog/";
}
function iratiendafunction(){
	BootstrapDialog
	.alert('Estamos últimando detalles, pronto tendrás noticias de la tienda :)');
	//window.location.href="http://tienda.decotheco.com";
}
function seleccionarDecoradorHome(id, id_proyecto, pago){
	var mail = getCookie("userAssistant");
	var pass = getCookie("passAssistant"); 
	$('#modalforchoosedecorator').modal('hide');
	try {
		

		$.ajax({
			// /type:"POST",
			dataType : "json",
			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
			url : urlbaseForAjax + '/DecoradoresController',
			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
			data : {
				token : "token",
				action: "getState",
				id_proyecto : id_proyecto
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				if (isError(data)) {
  					BootstrapDialog.alert(data);
  				} else {   
						 estado=data;
						
					 
				}
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}
	try {
		

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
							var nombreDecorador="";
							if(data.indexOf('$$') != -1)	 {

								var res = data.split("$$"); 
						    	$.ajax({
						  			// /type:"POST",
						  			dataType : "json",
						  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
						  			url : urlbaseForAjax + '/DecoradoresController',
						  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

						  			data : {
						  				token : "token",
						  				action : "getProyectosPisos",
						  				id_piso : res[0]
						  			},
						  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
						  			contentType : "application/json; charset=utf-8",
						  			success : function(data) {
						  				nombre=res[1]; 
						  				for(i=0;i<data.length;i++) {
						  					nombreDecorador="";
						  					id=data[i].id;
						  					if (pago==0){
												nombreDecorador += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;margin-bottom:3%;border:1px solid grey;" id="decorador'
												+		id+'"> <div class="tresPuntos" title="'
												+		nombre
												+		'">'
												+		nombre
												+		'</div></div>';
											} else {
												 
												var botonSinDecorador="";
												botonSinDecorador+= '<a class=" colornegro letraAriallogin  interspaciado_2 comprarPasosDecorador'+id+'"><div onclick="cargarProjecto('
													+ id
													+ ',true)" style="width:90%;margin-left:5%;" class="buttonstandard_invertido letra-xs comprarPasos">ENTRAR AL PROYECTO</div></a>';
												
												$('.comprarPasosDecorador'+id).html(botonSinDecorador); 
												
												
												nombreDecorador += '<a href="decorador-online.html?decorador='
												+		nombre +'&id='+id+'">';
												nombreDecorador += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;border:1px solid grey;" id="decorador"><div class="tresPuntos" title="'
												+		nombre
												+		'">'
												+		nombre
												+		'</div></div></a>'; 
												var donde=$('.estado'+id).val();
												if(pago==3) { 
													cargarProjecto(id_proyecto, true);
												}
												//console.log(proyectos_ajax[id_proyecto]);
												//console.log(estado);
												$('.estado'+id).val(estado.texto_usuarios+' ( ESTÁS EN ESTE PASO DESDE HOY )');
												 
											}	
												  
											$('#contratarDecorador'+id).html(nombreDecorador);  
						  				}
						  				
										
									},         
							        error : function(xhr, status) { 
							        	cerrarCargando();
							        },  
							        complete : function(xhr, status) { 
							        	cerrarCargando();
							        }
								});	
						    	
						    } else {
						    	if (pago==0){
									nombreDecorador += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;margin-bottom:3%;border:1px solid grey;" id="decorador'
									+		id_proyecto+'"> <div class="tresPuntos" title="'
									+		data
									+		'">'
									+		data
									+		'</div></div>';
								} else {
									 
									var botonSinDecorador="";
									botonSinDecorador+= '<a class=" colornegro letraAriallogin  interspaciado_2 comprarPasosDecorador'+id_proyecto+'"><div onclick="cargarProjecto('
										+ id_proyecto
										+ ',true)" style="width:90%;margin-left:5%;" class="buttonstandard_invertido letra-xs comprarPasos">ENTRAR AL PROYECTO</div></a>';
									
									$('.comprarPasosDecorador'+id_proyecto).html(botonSinDecorador); 
									
									
									nombreDecorador += '<a href="decorador-online.html?decorador='
									+		data +'&id='+id+'">';
									nombreDecorador += '<div class="buttonstandard letra-xs" style="width:90%;margin-left:5%;border:1px solid grey;" id="decorador"><div class="tresPuntos" title="'
									+		data
									+		'">'
									+		data
									+		'</div></div></a>'; 
									var donde=$('.estado'+id_proyecto).val();
									if(pago==3) { 
										cargarProjecto(id_proyecto, true);
									}
									//console.log(proyectos_ajax[id_proyecto]);
									//console.log(estado);
									$('.estado'+id_proyecto).val(estado.texto_usuarios+' ( ESTÁS EN ESTE PASO DESDE HOY )');
									 
								}	
									  
								$('#contratarDecorador'+id_proyecto).html(nombreDecorador);  

						    }
						//localStorage.lastname = "Smith";
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
//function for custommoodboard to load src img when hover
function hover(element) {
	if(element.getAttribute('src')!='img/other/CUTOM-MOODBOARD-.gif')
		
    element.setAttribute('src', 'img/other/CUTOM-MOODBOARD-.gif');
}
/*function unhover(element) {
    element.setAttribute('src', 'http://dummyimage.com/100x100/000/fff');
}*/
function lanzarPopUpImagenesPasos(proyecto,pos){
	var htmlText='';
	htmlText += '<div id="carouselinnerForImages3" class=" conefectos carousel-inner" role="listbox">';
	
		 

		var altoNavegador = $(window).height();
		alto=altoNavegador-200+"px";
		alto2=altoNavegador-230+"px";
		var tipoHabi2="";
		var k="";
		for(var l = 0; l < proyectoObject.preferencias.length; l++) {
			if(proyectoObject.preferencias[l].id_moodboard!=""  || proyectoObject.preferencias[l].id_moodboard!=0) {
				k="existe"; 
			}
		}
		var f="";
		var bandera=true;
		items=0;
		for(var j = 0; j < proyectoObject.preferencias.length; j++) {
				var id_moodboard = proyectoObject.preferencias[j].id_moodboard;  
				 
				if (k=="existe"){ 
					  
					// SI EXISTE UN MOODBOARD NO SE COLOCA ITEM SI ESTÁ VACÍO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi2="noColocar";
					} else { tipoHabi2="colocar"; f++;}
					
				} else {
					// SI NO EXISTE VERIFICAMOS SI EXISTE ALGUNO VACIO
					if (id_moodboard=="" || id_moodboard==0) { 
						tipoHabi = proyectoObject.preferencias[j].habitacion; 
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
						htmlText += '<div class="conefectossuaves text-center item active" style="text-align:center"><img id="imgMoodboard" align="center" src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto2+'" alt="Moodboard"/>';
						htmlText += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px;z-index:1500">'; 
						htmlText += '	<a  onclick="compartirFacebookv('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;"	target="_blank"> ';
						htmlText += '		<i class="fa  facebook-icon fa-facebook"> </i>';
						htmlText += '	</a> ';
						htmlText += '	<a onclick="compartirTwitterV('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;" target="_blank"> ';
						htmlText += '		<i	class="fa fa-twitter facebook-icon"> </i>';
						htmlText += '	</a>';
						htmlText += '	<a onclick="compartirpinterestV('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;" target="_blank"> ';
						htmlText += '		<i	class="fa fa-pinterest facebook-icon"> </i>';
						htmlText += ' 	</a> ';
						htmlText += '</div></div>';
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
						htmlText += '<div class="conefectossuaves text-center item" style="text-align:center"><img id="imgMoodboard" align="center"  src="'+urlbaseForMoodboards+'/moodboards/'+id_moodboard+'.png" style="display:inline;border:1px solid grey;height:'+alto2+'" alt="Moodboard"/>';
						htmlText += '<div id="divparacompartircanvas" class="divforcompartirfacetwitfooter" style="margin-bottom:2%;margin-top:10px;z-index:1500">'; 
						htmlText += '	<a  onclick="compartirFacebookv('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;"	target="_blank"> ';
						htmlText += '		<i class="fa  facebook-icon fa-facebook"> </i>';
						htmlText += '	</a> ';
						htmlText += '	<a onclick="compartirTwitterV('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;" target="_blank"> ';
						htmlText += '		<i	class="fa fa-twitter facebook-icon"> </i>';
						htmlText += '	</a>';
						htmlText += '	<a onclick="compartirpinterestV('+id_moodboard+');" style="cursor: pointer; margin-left: 4px;margin-right: 4px;" target="_blank"> ';
						htmlText += '		<i	class="fa fa-pinterest facebook-icon"> </i>';
						htmlText += ' 	</a> ';
						htmlText += '</div></div>';
					}
				} else { } 	 
			}
			
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
	$('#myCarousel21').html(htmlText);
	$('#modalforperfiles').modal('show');
	$('#carouselinnerForImages3').css("height",alto); 

}