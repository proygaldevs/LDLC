  var PARAM_TOKEN="token";
  var PARAM_DISPATCHER="action";

  var $loginform = $('#loginform');
  $loginform.on('submit', function(ev){
	$(document.body).css({'cursor' : 'wait'});	
    ev.preventDefault();
      
      
      
    var mail = $('#username').val();
  	var pass =  $('#password').val();
	//alert(pass);
  	var keeplogin =  $('#loginkeeping').prop('checked'); 
  	
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
  				token : mail,
  				action : "decoradores_login",
  				user : mail,
  				pass : pass,
  				detail_level: 0,
  				project_level: 0
  				
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				if (isError(data)) {
  					BootstrapDialog.alert(data);
  					$(document.body).css({'cursor' : 'default'});
  				} else {  
  					if(keeplogin){  
  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
  					} else { 
  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
  					}
  					localStorage.removeItem('decoradorobject');
  					localStorage.setItem('decoradorobject', JSON.stringify(data));
  					var decorador = localStorage.getItem('decoradorobject');
  					decorador=JSON.parse(decorador);  
  					alaappfunction(decorador);
  					$(document.body).css({'cursor' : 'default'});
  					//localStorage.lastname = "Smith";
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here
  		$(document.body).css({'cursor' : 'default'});
  	}
  });
  
  
  
  var $registroform = $('#registroform');

  $registroform.on('submit', function(ev){
  	
      ev.preventDefault();
      
      
      
      var nombre = $('#usernamesignup').val();
  	var mail = $('#emailsignup').val();
  	var pass =  $('#passwordsignup').val();
  
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
  				token : mail,
  				action : "decoradores_crear",
  				nombre : nombre,
  				mail : mail,
  				pass : pass,
  				identificadorUnico : mail,
  				detail_level: 0,
  				project_level: 0
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				if (isError(data)) {
  					BootstrapDialog.show({
			            title: '',
			            message: data,
			            type: BootstrapDialog.TYPE_DEFAULT,
			            buttons: [{
			                label: 'Ok',
			                action: function(dialogRef){
			                	logueo();
			                }
			            }]
			        });
  				} else {
  					BootstrapDialog.show({
			            title: '',
			            message: 'Registrado correctamente',
			            type: BootstrapDialog.TYPE_DEFAULT,
			            buttons: [{
			                label: 'Ok',
			                action: function(dialogRef){
			                	logueo();
			                }
			            }]
			        });
  					
  				}

  			}
  		});
  		

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here

  	}
  });
 
 function logueo(){
	 var mail = $('#emailsignup').val();
	 var pass =  $('#passwordsignup').val();
	 var keeplogin=false;
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
	  				token : mail,
	  				action : "decoradores_login",
	  				user : mail,
	  				pass : pass
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data;
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  				} else {
	  					if(keeplogin){  
	  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
	  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
	  					} else { 
	  						setCookie("userAssistantD", mail, 0, '/', urlbaseCookie, 0); 
	  						setCookie("passAssistantD", pass, 0, '/', urlbaseCookie, 0);
	  					}
	  					localStorage.removeItem('decoradorobject');
	  					localStorage.setItem('decoradorobject', JSON.stringify(data));
	  					var decorador = localStorage.getItem('decoradorobject');
	  					decorador=JSON.parse(decorador);  
	  					alaappfunction(decorador);
	  					$(document.body).css({'cursor' : 'default'});
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