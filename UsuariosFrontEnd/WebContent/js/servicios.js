var currentdate;

function lanzarportfolioindividual(posicion){
	
	
	$.cookie("coockieposicion", posicion);
	
	
	/*deleteCookie('portfolioitemcoockie');
	var cook=JSON.stringify(data[posicion]);
	setCookie('portfolioitemcoockie', 'jpaaaaa', 365);*/
	var href = urlbase + "/PortfolioIndividual.html";
	window.location = href;
	
}


function sendFormularioServicios(dedonde, grupo, seccion) {
	var inputNombre=document.getElementById('inputNombre');
	var inputMail=document.getElementById('inputMail');
	var inputAsunto=document.getElementById('inputAsunto');
	var inputCuentanos=document.getElementById('inputCuentanos');
	var inputRelacionados=document.getElementById('inputRelacionados');
	if(inputNombre.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un Nombre');
		cerrarCargando();
		return;
	}
	if(inputMail.value== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un mail válido');
		return;
	}
	if(inputCuentanos.value== ""){
		BootstrapDialog
		.alert('Por favor, cuentanos el motivo de consulta');
		return;
	}
	
	sendMailServicios(dedonde, grupo, seccion);

}



function  sendConsulta() {
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');
	var toMail = 'info@decotheco.com';
	var inputNombre=document.getElementById('textConsulta');
	if(inputNombre.value== ""){
		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Por favor, introduzca el texto de la consulta.', function(){ 
			cerrarCargando();
        });  
		return;
	}
	if(cerramosONo) {
		$(document.body).css({ 'cursor': 'default' });
		BootstrapDialog.alert('Por favor, espere a que terminen de subirse las imagenes de la consulta.', function(){ 
			cerrarCargando();
        });  
		return;
		
	}
	var userAssistantCockie = getCookie("userAssistant");
	
	
	var inputMail=userAssistantCockie;
	var inputAsunto="Mail de consulta de Home Usuarios";
	var inputCuentanos=document.getElementById('inputCuentanos');
	var inputRelacionados=document.getElementById('inputRelacionados');
	var fromMail = userAssistantCockie;
	var subject = inputAsunto;
	
	var content = "Nos ha escrito " + userAssistantCockie + "\n con mail : "+ userAssistantCockie+"\n "+
			" "+ inputNombre.value + "\n  ";
	content+="\nLas Imagenes:\n";
	
	for(var i=0;i<listOfImagesServicios.length;i++){
		 content+=urlbaseForMoodboards+"/usuarios/"+userAssistantCockie+"/"+currentdate+"/reformas/"+listOfImagesServicios[i];
		 content+="\n";
	}
	content+="\n:)";
	
	//alert(dateInputforCita.value);
	//alert(timeInputforCita.value);
	//alert(datocontactoInputforCita.value);
	//alert(content);
	


	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

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
				content : content
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
					$(document.body).css({ 'cursor': 'default' });
					BootstrapDialog.alert('Consulta enviada! En breve nos pondremos en contacto contigo :).', function(){ 
						cerrarCargando();
			        }); 
				 
					myDropzone.removeAllFiles();
					inputNombre.value="";


				
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}

}


function  sendMailServicios(dedonde, grupo, seccion) {
	var toMail = 'info@decotheco.com';
	
	
	var inputNombre=document.getElementById('inputNombre');
	var inputMail=document.getElementById('inputMail');
	var inputAsunto=document.getElementById('inputAsunto');
	var inputCuentanos=document.getElementById('inputCuentanos');
	var inputRelacionados=document.getElementById('inputRelacionados');
	var fromMail = inputMail.value;
	var subject = ' Consulta de '+ dedonde+ ' ' +inputAsunto.value;
	
	var content = "Nos ha escrito " + inputNombre.value + "\n con mail : "+ inputMail.value+"<br/><br/>"+
			" "+ inputCuentanos.value + "<br/>  "+ inputRelacionados.value;
	content+="<br/><br/>Las Imagenes:<br/>";
	
	for(var i=0;i<listOfImagesServicios.length;i++){
		 content+=urlbase+"/usuarios/"+grupo+"/"+currentdate+"/"+seccion+"/"+listOfImagesServicios[i];
		 content+="\n";
	}
	content+="\n:)";
	
	//alert(dateInputforCita.value);
	//alert(timeInputforCita.value);
	//alert(datocontactoInputforCita.value);
	//alert(content);
	


	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

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
				content : content
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				//alert("eliminado");
				
					BootstrapDialog
					.alert('Consulta enviada! En breve nos pondremos en contacto contigo :).');
				
					
				
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here

	}

}


function deleteFileServicios(user, nombreproyecto, seccionvar, fichero) {
	var user = user;
	var proyecto = nombreproyecto;
	var seccion = seccionvar;
	var fichero = fichero;

	

	try {
		$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});

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