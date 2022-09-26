var selected = false; 
function selectImage(id){
	if (document.getElementById(id).className.includes("selected") && selected){
		document.getElementById(id).className = 'clipper_image _83';
		selected = false;
	}else{
		document.getElementById(id).className = 'clipper_image _83 selected';
		selected = true;
	}
}


function unSelectImage(id){
	document.getElementById(id).className = 'clipper_image _83';
	selected = false;
	
}
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}
var datos;
function addDecorator(url) { 
var part = extractHostname(url); 
if(part.indexOf("www.") > -1) {
	parte=part.split("."); 
	if(parte.length==3){
		part=part.split(".")[1]+"."+part.split(".")[2]; 
	}
	if(parte.length==4){
		part=part.split(".")[1]+"."+part.split(".")[2]+"."+part.split(".")[3]; 
	}
	
}

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
				action : "url_Affiliates",
				url: part,
				urlComplete: encodeURIComponent(url),
				
					
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				
				if (isError(data)) {
					console.log(0);
					datos=0;
				} else {
					console.log(data);
					datos=data;
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
function setURL(URLEXT){
	
	urlFinal=URLEXT;
	url=URLEXT; 
	
	datos=addDecorator(url);		
	function promiseAffi() {
		if(datos!=undefined) {
			data=datos;
			resultImageAf();
		} else {
			setTimeout(function(){ promiseAffi(); }, 500);
		}
	}
	promiseAffi();
  	function resultImageAf() {
		if (data==0) {
			BootstrapDialog.alert(data);
			$(document.body).css({'cursor' : 'default'});
			document.getElementById('itemurl').value = URLEXT;
			document.getElementById('itemurltipo').value = "-1";
		} else {
			if(data.url_add==undefined){
		  		console.log("entro");
				urlFinal=URLEXT;
				document.getElementById('itemurltipo').value = "-1";
			}else {
				if(data.ItemLDLC!="") {

			  		console.log(data.ItemLDLC.URLImage);
			  		console.log(data);
					urlFinal=data.ItemLDLC.URLImage;
					document.getElementById('itemurl').value = urlFinal;
					document.getElementById('item_tipo').value = "-4";
				} else { 
			  		console.log("3");
					if(data.tipo_afiliacion==2) {
						urlFinal="http://pdt.tradedoubler.com/click?"+data.url_add+"prod()ttid(5)url("+encodeURIComponent(url)+")";
					} else {
						parte=data.url_add.split("=")[0]; 
					
						if(urlFinal.indexOf(parte)> -1) {
							parte=urlFinal.split(parte)[0];
							urlFinal=parte+""+data.url_add;
						} else {
							if(urlFinal.indexOf("?")> -1) {
								urlFinal=urlFinal+"&"+data.url_add;
							}else {
								urlFinal=urlFinal+"?"+data.url_add;
							}
						}
					}
					document.getElementById('itemurltipo').value = "-4";
				}
			} 
			document.getElementById('itemurl').value = urlFinal;
			
		}
  	}
  	 
}
function setURLimage(URLimage){
	document.getElementById('itemurlimage').value = URLimage;
}

function inicializar(){
	document.getElementById("no_image_selected").style.display = 'none'; 
	document.getElementById("no_price").style.display = 'none'; 
	document.getElementById("no_title").style.display = 'none'; 
	document.getElementById("no_tags").style.display = 'none'; 
	document.getElementById("bad-price-format").style.display = 'none';
}

function ValidateCurrency(entry){
    var regex = /[0-9]*(\,\d{1,2})*€*/;
    if (!regex.test(entry) ){
        alert("You must enter numbers, decimals and commas only:"+entry+"|");
        return false;
    } else  {
        return true;
    }
}

//valida el formulario
function submitform(){
	var param_ok = true;
	
	document.getElementById("no_image_selected").style.display = 'none'; 
	document.getElementById("no_price").style.display = 'none'; 
	document.getElementById("no_title").style.display = 'none'; 
	document.getElementById("no_tags").style.display = 'none'; 
	document.getElementById("bad-price-format").style.display = 'none';
	
	if (!selected){
		document.getElementById("no_image_selected").style.display = 'block'; 
		param_ok=false;
	}
	
	if ((document.getElementById('itemprecio').value==null  || document.getElementById('itemprecio').value.length<1) && (document.getElementById('custom_price').value==null || document.getElementById('custom_price').value.length<1)){
		document.getElementById("no_price").style.display = 'block'; 
		param_ok=false;
	}
	
	/*
	if (!ValidateCurrency(document.getElementById('custom_price').value)){
		document.getElementById("bad-price-format").style.display = 'block'; 
		param_ok=false;
	}
	
	*/
	
	
	if (document.getElementById('itemtitulo').value==null || document.getElementById('itemtitulo').value.length<1){
		document.getElementById("no_title").style.display = 'block'; 
		param_ok=false;
	}
	
	if (document.getElementById('itemetiquetas').value==null || document.getElementById('itemetiquetas').value.length<1){
		document.getElementById("no_tags").style.display = 'block'; 
		param_ok=false;
	}
	
	
	if (param_ok){
		document.getElementById('import_form').submit();
		$('#cargando').modal('show');
		
	} else{
		BootstrapDialog.alert('El producto no se pudo enviar, faltan datos', function(){
        });
	}
}