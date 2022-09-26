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

//PRE
/*
var entorno="pre";
 var urlbaseForAjax="http://services.decotheco.com";
var urlbaseForDropzoneJs="http://services.decotheco.com/";

var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/decotheco-thecoradores/";
*/

/*//DESA
var entorno="desa";
var urlbaseForAjax="http://desa.services.decotheco.com";
var urlbaseForDropzoneJs="http://desa.services.decotheco.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";*/

/*//TEMPORAL
var urlbaseForAjax="http://decothecodesa.eu-west-1.elasticbeanstalk.com";
var urlbaseForDropzoneJs="http://decothecodesa.eu-west-1.elasticbeanstalk.com/";
var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";
var entorno="desa";*/

//LOCAL
var urlbaseForAjax="http://localhost:8080";
var urlbaseForDropzoneJs="http://localhost:8080/";

var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/desa.decotheco-thecoradores/";
var entorno="desa";

//PRO
/*var urlbaseForAjax="https://services.decotheco.com";
var urlbaseForDropzoneJs="https://services.decotheco.com/";

var urlbaseForMoodboards="https://s3-eu-west-1.amazonaws.com/pro.decotheco-thecoradores";
var urlbuckets3="https://s3-eu-west-1.amazonaws.com/pro.decotheco-thecoradores/";
var entorno="pro";*/

function alahomeCom(){
	var href = urlbase;
	window.location = href;
}
function iratodosDecoradores(){
	var href = urlbase + '/decoradores-online.html';
	window.location = href;
}
function iratodosDecoradoresOut(){
	var href = urlbase + '/decoradores-online.html';
	window.open(href, '_blank');
}

function alBlog(){
	
	var href = "/blog";
	window.open(href, '_blank');
}
function iraappfunction(){
	window.location.href=urlbase ;
}
function alaAppHome(){
	
	var href = urlbase ;
	window.open(href, '_blank');
}
function alaAppHomeIn(){
	
	var href = urlbase ;
	window.location = href;
}
function aHomeUsuarios(){
	
	var href = urlbase + "/Home.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/decoracion-online.html";
	window.location = href;
}
function alaAppDentro(){

	if(getCookie("userAssistant")!=""){
		nuevoProyecto();
	}
	var href = urlbase + "/decoracion-online.html";
	//var href = "http://192.168.1.100:8444/OnlineAssistance/decoracion-online.html";
	window.location = href;
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
function alaappfunction(){
	if(getCookie("userAssistant")!=""){
		nuevoProyecto();
	}
	var href = urlbase + "/decoracion-online.html";
	window.location = href;
	
}
function botonGratis(){
	if(getCookie("userAssistant")!=""){
		var href = urlbase + "/Home.html";
		window.location = href;
	} else {
		var href = urlbase + "/decoracion-online.html";
		window.location = href;
	}
}
function aSuscribirse(){
	var href = "http://eepurl.com/b_oll9";
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
	var href = urlbase + "/Legal.html";
	window.open(href, '_blank');
	
}

function comprar(modalidad){
	var href = urlbase + "/Pagar.html";
	window.location = href; 
	if(modalidad==1){
		setCookie("pagar",79, 365);
		setCookie("levantar",1, 365);
	} else if(modalidad==2) {
		setCookie("pagar", 179, 365);
		setCookie("levantar",1, 365);
	}
}
function alDecorador(id, nombre){
	var href = urlbase + "/decorador-online.html?decorador="+nombre+"&id="+id;
	window.location = href;
}


