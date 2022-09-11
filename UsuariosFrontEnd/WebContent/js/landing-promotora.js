$(document).ready(function() { 

		<!-- COLOCA MISMA ALTURA A TODOS LOS ITEMS --> 	
	 setTimeout(function(){ 
			var altura=$(".altura").height(); 
		$(".contenedor, .contenedor2, .contenedor3").css("height", altura+13);
	 },1500);

	
	<!-- COLOCA ALTURA DE 80% A COMPARADOR SI ES SUPERIOR EL TAMAÑO A LA ALTURA DEL NAVEGADOR*0.85 SINO AL 100% --> 	
	setTimeout(function(){ 
	var ventana_alto = $(window).height(); 
	var width=$(window).width(); 
	var alturaImg=$(".imageFinal").height(); 
	alturaImgTop=ventana_alto*0.75;  
	if(alturaImg<alturaImgTop) {
		 $('.caja').css('height', "auto"); 
	} else {
		 $('.caja').css('height', alturaImgTop+"px");  
	} 

	alturaGo=$(".go").height();
	$(".go2").css("height" , alturaGo/2);
	$(".go2").css("margin-top" , 0);
	$(".go2").css("visibility" , "visible");
	
	setTimeout(function(){  
		$(".go2").fadeTo( "slow" , 1);
	},2000);
	
	
	},300);
})
$(window).resize(function(){
	<!-- AL REDIMENSIONAR COLOCA ALTURA DE 80% A COMPARADOR SI ES SUPERIOR EL TAMAÑO A LA ALTURA DEL NAVEGADOR*0.85 SINO AL 100% --> 
	var altura=$(".altura").height(); 
	$(".contenedor, .contenedor2, .contenedor3").css("height", altura+13);
	var ventana_alto = $(window).height(); 
	var width=$(window).width(); 
	var alturaImg=$(".imageFinal").height();  
	alturaImgTop=ventana_alto*0.75;  
	if(alturaImg<alturaImgTop) {
		 $('.caja').css('height', "auto"); 
	} else {
		 $('.caja').css('height', alturaImgTop+"px"); 
	}
});


<!-- RECOGE DATOS DE FORMULARIO Y ENVIA A SERVICIO QUE YA ESTABA CREADO --> 	
function sendFormularioPromotora() {
	var inputPiso=document.getElementById('inputPiso').value; 
	var inputMail=document.getElementById('inputMail').value;
	var inputNombre=document.getElementById('inputNombre').value;
	var inputTelefono=document.getElementById('inputTelefono').value;
	var inputCuentanos=document.getElementById('inputCuentanos').value; 

 
	
	 
	if(inputMail== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un mail válido');
		return;
	}
	if(inputNombre== ""){
		BootstrapDialog
		.alert('Por favor, introduzca un nombre válido');
		return;
	}
	if(inputCuentanos== ""){
		BootstrapDialog
		.alert('Por favor, cuentanos el motivo de consulta');
		return;
	}

		$('#cargando').modal('show');  
		var toMail = 'info@decotheco.com';
		
		 
		var fromMail = inputMail.value;
		var subject = ' Consulta de Formulario Promotora';
		
		var content = "Nos ha escrito " + inputNombre + "\n con mail : "+ inputMail+"<br/> Le interesa "+ inputPiso+"<br/> Consulta: "+ inputCuentanos + "<br/>";
		if(inputTelefono!=""){
			content+="<br/> Teléfono de contacto: "+inputTelefono+"<br/>";
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
				url : urlbaseForAjax + '/SendMail',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				data : {
					toMail : toMail,
					fromMail : inputMail,
					subject : subject,
					content : content
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					//alert("eliminado");
					
						$('#cargando').modal('hide'); 
						setTimeout(function(){ 
						BootstrapDialog
						.alert('Consulta enviada! En breve nos pondremos en contacto contigo.');
						 },700);
					
						
					
				}
			});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here

		} 

}