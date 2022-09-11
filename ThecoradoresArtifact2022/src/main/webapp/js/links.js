var paracortar=$(location).attr('pathname');
var cosas=paracortar.split('/'); 
var path='';
if(cosas.length<3){
	path='';
}else{
	path='/'+cosas[1];
} 
var urlbaseForAjax=$(location).attr('protocol')+'//'+$(location).attr('host')+path; 

/*
//DECOTHECO
var urlbaseCookie=".decotheco.com";
var urlbase="http://decoradores.decotheco.com";
 */

//LOCALHOST
var urlbaseCookie="localhost";  
var urlbase="/ThecoradoresFrontEnd";
 
 
function Registrar(){
	var href = urlbase;
	window.location = href;
}