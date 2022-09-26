//alert($(location).attr('pathname'));
      
//alert($(location).attr('hostname'));    
var paracortar=$(location).attr('pathname');
var cosas=paracortar.split('/');
//alert(cosas.length);
var path='';
if(cosas.length<3){
	path='';
}else{
	path='/'+cosas[1];
}
//alert(cosas[cosas.length-1]);
var urlbase=$(location).attr('protocol')+'//'+$(location).attr('host')+path;
var urlbaseForAjax=urlbase;
var urlbaseLdlc=$(location).attr('protocol')+'//'+$(location).attr('host');
var urlbaseForThecoradores=urlbase+"/";
var urlbaseForUsuarios="http://decotheco.com/";
  

//PRE
/*
var urlbaseForAjax="http://services.decotheco.com";
var urlbaseForDropzoneJs="http://services.decotheco.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/decotheco-thecoradores/";
var entorno="pre";
*/

/*//DESA
var urlbaseForAjax="http://desa.services.decotheco.com";
var urlbaseForDropzoneJs="http://desa.services.decotheco.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";
var entorno="desa";*/


/*//TEMPORAL
var urlbaseForAjax="http://decothecodesa.eu-west-1.elasticbeanstalk.com";
var urlbaseForDropzoneJs="http://decothecodesa.eu-west-1.elasticbeanstalk.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";
var entorno="desa";*/


/*//PRO
var urlbaseForAjax="https://services.decotheco.com";
var urlbaseForDropzoneJs="https://services.decotheco.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/pro.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/pro.decotheco-thecoradores/";
var entorno="pro";
var urlbaseCookie=".decotheco.com";*/

//LOCAL
//var urlbaseForAjax="http://localhost:8080";
var urlbaseForAjax="http://localhost:8080/ThecoradoresArtifact2022";
var urlbaseForDropzoneJs="http://localhost:8080/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";
var entorno="desa";
var urlbaseCookie="localhost";

function alahomeCom(){
		var href = urlbase + "/";
		window.location = href;
}

function alBlog(){
	
	var href = "http://decotheco.com/blog/";
	window.open(href, '_blank');
}
function iraappfunction(){
	window.location.href=urlbase;
}
function alaAppHome(){
	
	var href = urlbase;
	window.open(href, '_blank');
}

function alaListaProyectos(){
	
	var href = urlbase + "/home.html";
	window.location = href;
}
function otracosafunction(){
	   window.location.href= urlbase + "/perfil.html";
	}
function alaAppHomeIn(){
	
	var href = urlbase;
	window.location = href;
}
function alaAppDentro(){
	
	var href = urlbase + "/decoracion-online.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/decoracion-online.html";
	window.open(href, '_blank');
}
function alaAppCustom(){
	
	var href = urlbase + "/creatuinspiracion.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/creatuinspiracion.html";
	window.open(href, '_blank');
}
function alaAppCustomSin(){
	cerramosONo=false;
	var href = urlbase + "/creatuinspiracion.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/creatuinspiracion.html";
	window.location = href;
}
 
function alresto(nombre){
	
	var href = urlbase +nombre;
	//var href = "http://192.168.1.100:8444/OnlineAssistance/"+nombre;
	window.location = href;

}
function alresto2(nombre){
	
	var href = urlbaseForUsuarios +nombre;
	//var href = "http://192.168.1.100:8444/OnlineAssistance/"+nombre;
	window.open(href, '_blank');

}
function lista(){
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var href = urlbaseForAjax + "/ldlc.jsp?id_decorador="+decorador.id; 
	window.location = href;

}
function alotrofuera(nombre){
	
	var href = nombre;
	//var href = "http://192.168.1.100:8444/OnlineAssistance/"+nombre;
	window.open(href, '_blank');

}

function irafacebook(){
	var href = "https://www.facebook.com/Decotheco-2001543400069192/";
	window.open(href, '_blank');
	
}
function iratwitter(){
	var href = "https://twitter.com/decotheco";
	window.open(href, '_blank');
	
}
function irainstagram(){
	var href = "https://www.instagram.com/decotheco/";
	window.open(href, '_blank');
	
}
function irapinterest(){
	var href = "https://es.pinterest.com/decotheco/";
	window.open(href, '_blank');
	
}
function alaappfunction(datos){
	console.log(datos);
	if(datos.activo>=1){
		var href = urlbase + "/home.html";
		window.location = href;	
	}
	else if(datos.texto_decorador==null ||  datos.urlRss==null ||  datos.urlRss=="" || datos.texto_decorador==""){ 
		var href = urlbase + "/bienvenida.html";
		window.location = href;	 
	} else {
		var href = urlbase + "/paginaEspera.html";
		window.location = href;	
	}
}
function aSuscribirse(){
	var href = "http://eepurl.com/cWMbtD";
	window.open(href, '_blank');
	
}
function alRegaloFunction(){
	var href = urlbase + "/regalo-decoracion.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/regalo-decoracion.html";
	window.open(href, '_blank');
	
}
function alTiendaFunction(){
	var href = urlbase + "/Tienda.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/Tienda.html";
	window.open(href, '_blank');
	
}
function aCondicionesFunction(){
	var href = urlbaseForUsuarios + "Legal.html";
	window.open(href, '_blank');
	
}



