function abrirPagoTPV(parameters, signature) {
  var href = urlbase + "/PagarTPV.html?parameters=" + encodeURIComponent(parameters) + "&signature=" + encodeURIComponent(signature);
  // TODO Raul. Quitar la línea que viene a continuación
	//href = "./PagarTPV.html?parameters=" + encodeURIComponent(parameters) + "&signature=" + encodeURIComponent(signature);
	window.location = href;
  //window.open(href, '_blank');

} 

function pagarConTPV(id_tipo){ 
	  var id_proyecto = proyectoObject.id; 
		   
			try {
		
				$.ajax({
					// /type:"POST",
					dataType : "json",
					url : urlbaseForAjax + '/SetPagoConTPV',
		
					data : {
						id_tipo : id_tipo,
						id_proyecto : id_proyecto
					},
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						var jsonData = JSON.parse(data);
						if (jsonData.error.code === '0') {
							abrirPagoTPV(jsonData.parameters, jsonData.signature);
		
						}
						else {
							BootstrapDialog.alert('Error');
						}
					}
				});
		
			} catch (e) {
				BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
		
			} 
}

function pagarEspecialRegalo199(id_tipo, id_tipo2) {
	// PAGO AFILIADO REGALO
	var id_proyecto = 0;  
	  var valor=0;
	  var valor1=0;
	  var valor2=0;
	  if(id_tipo==4) {
		  valor=199.00;
		  id_proyecto = 4
	  } else {
		  valor=179.00;
		  id_proyecto = 3;
	  }
	  if(id_tipo2==9) {
	  if(descuentoUnitario!=0) {
		  valor1=parseFloat(descuentoUnitario);
	  } 
	  if(descuentoPorcentual!=0) {
		  valor2=((valor*parseFloat(descuentoPorcentual))/100);
	  }
	  valor=valor-(valor1+valor2);
	  console.log(valor);
	  var nombre=document.getElementById('inputNombre').value;
	  var direccion=document.getElementById('inputMail').value;
	  var cp=document.getElementById('inputCodigopostal').value;
	  var poblacion=document.getElementById('inputPoblacion').value;
	  var comentarios=document.getElementById('inputCuentanos').value;
	
	  var nombre_buyer=document.getElementById('inputNombreDatos').value;
	  var mail_buyer=document.getElementById('inputMailDatos').value;
	  var telefono_buyer=document.getElementById('inputMovilDatos').value;
	  var mensaje_personalizar=document.getElementById('inputCuentanosDatos').value;
	  var mail='';
	  var id_proyecto="0";
	  var concepto='DecoRegaloDeco-Box';
	  var mail=''; 
		try {
			$.ajaxSetup({
				scriptCharset : "utf-8",
				contentType : "application/json; charset=utf-8"
			});

			$.ajax({
				// /type:"POST",
				dataType : "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/SetPagoConTPV',
				
				data : {
					id_tipo : id_tipo2,
					id_tipo2 : id_tipo,
					valor : valor,
					concepto : concepto,
					nombre : nombre,
					direccion : direccion,
					cp : cp,
					telefono_buyer : telefono_buyer,
					poblacion : poblacion,
					comentarios : comentarios,
					nombre_buyer : nombre_buyer,
					mail_buyer : mail_buyer,
					mail : mail,
					mensaje_personalizar : mensaje_personalizar,
					total : valor,
					id_proyecto : id_proyecto
				},
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					//alert(data);
					var jsonData = JSON.parse(data);
					if (jsonData.error.code === '0') {
						abrirPagoTPV(jsonData.parameters, jsonData.signature);

					}
					else {
						BootstrapDialog.alert('Error');
					} 
				}
			});

		} catch (e) {
			BootstrapDialog
					.alert(e);
			// put any code you want to execute if there's an exception here
			$(document.body).css({'cursor' : 'default'}); 
		}
	  }
} 

function pagarEspecialRegalo179(id_tipo, id_tipo2){ 
	// PAGO AFILIADO REGALO
	var id_proyecto = 0;  
	  var valor=0;
	  var valor1=0;
	  var valor2=0;
	  if(id_tipo==1) {
		  valor=179.00; 
		  id_proyecto = proyectoObject.id;
	  } else if(id_tipo==2) {
		  valor=79.00;
		  id_proyecto = proyectoObject.id;
	  } else if(id_tipo==4) {
		  valor=199.00;
		  id_proyecto = 4
	  } else {
		  valor=179.00;
		  id_proyecto = 3;
	  }
		  if(id_tipo2==9) {
			  if(descuentoUnitario!=0) {
				  valor1=parseFloat(descuentoUnitario);
			  } 
			  if(descuentoPorcentual!=0) {
				  valor2=((valor*parseFloat(descuentoPorcentual))/100);
			  }
			  valor=valor-(valor1+valor2);
			  console.log(valor);
			  
			var nombre=document.getElementById('inputNombreEtarjeta').value;
			var mail=document.getElementById('inputMailEtarjeta').value;
			var comentarios=document.getElementById('inputCuentanosEtarjeta').value;
			var nombre_buyer=document.getElementById('inputNombreDatosEtarjeta').value;
			var mail_buyer=document.getElementById('inputMailDatosEtarjeta').value;
			var telefono_buyer=document.getElementById('inputMovilDatosEtarjeta').value;
			var mensaje_personalizar=document.getElementById('inputCuentanosDatosEtarjeta').value;
		
			var id_proyecto="0";
			var concepto='DecoRegaloE-Tarjeta';
			var cp="";
			var direccion="";
			var poblacion=""; 
		  
				  
							  try {
									$.ajaxSetup({
										scriptCharset : "utf-8",
										contentType : "application/json; charset=utf-8"
									});
						
									$.ajax({
										// type:"POST",
										dataType : "json",
										url : urlbaseForAjax + '/SetPagoConTPV',
						
										data : {
											id_tipo : id_tipo2,
											id_tipo2 : id_tipo,
											valor : valor,
											concepto : concepto,
											nombre : nombre,
											direccion : direccion,
											cp : cp,
											telefono_buyer : telefono_buyer,
											poblacion : poblacion,
											comentarios : comentarios,
											nombre_buyer : nombre_buyer,
											mail_buyer : mail_buyer,
											mensaje_personalizar : mensaje_personalizar,
											mail : mail,
											total : valor,
											id_proyecto : id_proyecto
										},
										// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
										contentType : "application/json; charset=utf-8",
										success : function(data) {
											var jsonData = JSON.parse(data);
											if (jsonData.error.code === '0') {
												abrirPagoTPV(jsonData.parameters, jsonData.signature);
						
											}
											else {
												BootstrapDialog.alert('Error');
											}
										}
									});
						
								} catch (e) {
									BootstrapDialog
										.alert('Se ha producido un error en la conexión con el servidor');
									// put any code you want to execute if there's an exception here
						
								}
					  
			  }   
}
			
function pagarEspecial(id_tipo, id_tipo2){ 
	  // PAGO AFILIADO NORMAL
	  var id_proyecto = 0;  
	  var valor=0;
	  var valor1=0;
	  var valor2=0;
	  if(id_tipo==1) {
		  valor=179.00; 
		  id_proyecto = proyectoObject.id;
	  } else if(id_tipo==2) {
		  valor=79.00;
		  id_proyecto = proyectoObject.id;
	  } else if(id_tipo==4) {
		  valor=199.00;
		  id_proyecto = 4
	  } else {
		  valor=179.00;
		  id_proyecto = 3;
	  }
		  if(id_tipo2==9) {
			  if(descuentoUnitario!=0) {
				  valor1=parseFloat(descuentoUnitario);
			  } 
			  if(descuentoPorcentual!=0) {
				  valor2=((valor*parseFloat(descuentoPorcentual))/100);
			  }
			  valor=valor-(valor1+valor2);
			  var id_decorador = id_ajax;
			  console.log(id_decorador);
			  try {
					$.ajaxSetup({
						scriptCharset : "utf-8",
						contentType : "application/json; charset=utf-8"
					});
		
					$.ajax({
						// /type:"POST",
						dataType : "json",
						url : urlbaseForAjax + '/SetPagoConTPV',
						data : {
							id_tipo : id_tipo2,
							id_tipo2 : id_tipo,
							valor : valor,
							id_decorador: id_decorador,
							id_proyecto : id_proyecto
						},
						contentType : "application/json; charset=utf-8",
						success : function(data) {
							var jsonData = JSON.parse(data);
							if (jsonData.error.code === '0') {
								abrirPagoTPV(jsonData.parameters, jsonData.signature);
		
							}
							else {
								BootstrapDialog.alert('Error');
							}
						}
					});
		
				} catch (e) {
					BootstrapDialog
						.alert('Se ha producido un error en la conexión con el servidor');
					// put any code you want to execute if there's an exception here
		
				}
			  
			  
	  }
	}

function pagarConTPV2(id_tipo){
  if(pagoEspecial==undefined || pagoEspecial == null || pagoEspecial == "") { BootstrapDialog.alert('Necesita estar logueado.'); }else {
  
	  if(id_tipo==8) { 
		  // PAGO AFILIADO REGALO Y NORMAL
		  var id_proyecto = pagoEspecial.id; 
		  var id_decorador = pagoEspecial.id;
		  if(id_decorador==undefined){ 
			  id_decorador=pagoIdDecorador;
		  } 
		  try {
				$.ajaxSetup({
					scriptCharset : "utf-8",
					contentType : "application/json; charset=utf-8"
				});
	
				$.ajax({
					// /type:"POST",
					dataType : "json",
					url : urlbaseForAjax + '/SetPagoConTPV',
	
					data : {
						id_tipo : id_tipo,
						valor : valor,
						id_decorador: id_decorador,
						id_proyecto : id_proyecto
					},
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						var jsonData = JSON.parse(data);
						if (jsonData.error.code === '0') {
							abrirPagoTPV(jsonData.parameters, jsonData.signature);
	
						}
						else { 
							BootstrapDialog.alert('Error');
						}
					}
				});
	
			} catch (e) {
				BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
	
			}
	  } else if(id_tipo==9) { 
		  // PAGO AFILIADO REGALO Y NORMAL
		  var id_proyecto = pagoEspecial.id; 
		  var id_decorador = pagoEspecial.id;
		  if(id_decorador==undefined){ 
			  id_decorador=pagoIdDecorador;
		  } 
		  try {
				$.ajaxSetup({
					scriptCharset : "utf-8",
					contentType : "application/json; charset=utf-8"
				});
	
				$.ajax({
					// /type:"POST",
					dataType : "json",
					url : urlbaseForAjax + '/SetPagoConTPV',
	
					data : {
						id_tipo : id_tipo,
						valor : valor,
						id_decorador: id_decorador,
						id_proyecto : id_proyecto
					},
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						var jsonData = JSON.parse(data);
						if (jsonData.error.code === '0') {
							abrirPagoTPV(jsonData.parameters, jsonData.signature);
	
						}
						else { 
							BootstrapDialog.alert('Error');
						}
					}
				});
	
			} catch (e) {
				BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
	
			}
	  } else if(id_tipo==10) { 
		  // PAGO CONFIGURADOR PISOS
		  var id_proyecto = pagoEspecial.id; 
		  var id_decorador = pagoEspecial.id;
		  if(id_decorador==undefined){ 
			  id_decorador=pagoIdDecorador;
		  } 
		  try {
				$.ajaxSetup({
					scriptCharset : "utf-8",
					contentType : "application/json; charset=utf-8"
				});
	
				$.ajax({
					// /type:"POST",
					dataType : "json",
					url : urlbaseForAjax + '/SetPagoConTPV',
	
					data : {
						id_tipo : id_tipo,
						valor : valor,
						id_decorador: id_decorador,
						id_proyecto : tipo
					},
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						console.log(data);
						var jsonData = JSON.parse(data);
						if (jsonData.error.code === '0') {
							abrirPagoTPV(jsonData.parameters, jsonData.signature);
	
						}
						else { 
							BootstrapDialog.alert('Error');
						}
					}
				});
	
			} catch (e) {
				BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
				// put any code you want to execute if there's an exception here
	
			}
	  } else {
		 // PAGO NORMAL / REGALO
	    var id_proyecto = pagoEspecial.id; 
	    console.log(id_proyecto);
	    console.log(id_tipo);
		try {
			$.ajaxSetup({
				scriptCharset : "utf-8",
				contentType : "application/json; charset=utf-8"
			});
	
			$.ajax({
				// /type:"POST",
				dataType : "json",
				url : urlbaseForAjax + '/SetPagoConTPV',
	
				data : {
					id_tipo : id_tipo,
					id_proyecto : id_proyecto
				},
				contentType : "application/json; charset=utf-8",
				success : function(data) {
					var jsonData = JSON.parse(data);
					if (jsonData.error.code === '0') {
						abrirPagoTPV(jsonData.parameters, jsonData.signature);
	
	    		}
					else {
						BootstrapDialog.alert('Error');
					}
				}
			});
	
		} catch (e) {
			BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here
	
		}
	  }
  }
}

function pagarRegaloConTPV(id_tipo){
	// PAGAR REGALO NORMAL
	$('.modal').modal('hide');
	 
	
	if(id_tipo==3) { 
		var nombre=document.getElementById('inputNombreEtarjeta').value;
		var comentarios=document.getElementById('inputCuentanosEtarjeta').value;
		
		var nombre_buyer=document.getElementById('inputNombreDatosEtarjeta').value;
		var mail_buyer=document.getElementById('inputMailDatosEtarjeta').value;
		var telefono_buyer=document.getElementById('inputMovilDatosEtarjeta').value;
		var mensaje_personalizar=document.getElementById('inputCuentanosDatosEtarjeta').value;
		var mail=document.getElementById('inputMailEtarjeta').value;;
		var id_proyecto="0";
		var concepto='DecoRegaloE-Tarjeta';
		var total=179;
	} else {
		var nombre=document.getElementById('inputNombre').value;
		var direccion=document.getElementById('inputMail').value;
		var cp=document.getElementById('inputCodigopostal').value;
		var poblacion=document.getElementById('inputPoblacion').value;
		var comentarios=document.getElementById('inputCuentanos').value;
		
		var nombre_buyer=document.getElementById('inputNombreDatos').value;
		var mail_buyer=document.getElementById('inputMailDatos').value;
		var telefono_buyer=document.getElementById('inputMovilDatos').value;
		var mensaje_personalizar=document.getElementById('inputCuentanosDatos').value;
		var mail='';
		var id_proyecto="0";
		var concepto='DecoRegaloDeco-Box';
		var total=199;
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
				url : urlbaseForAjax + '/SetPagoConTPV',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				
				data : {
					concepto : concepto,
					nombre : nombre,
					direccion : direccion,
					cp : cp,
					telefono_buyer : telefono_buyer,
					poblacion : poblacion,
					comentarios : comentarios,
					nombre_buyer : nombre_buyer,
					mail_buyer : mail_buyer,
					mail : mail,
					mensaje_personalizar : mensaje_personalizar,
					total : total,
					id_proyecto : id_proyecto,
					id_tipo : id_tipo
				},
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/json; charset=utf-8",
				success : function(data) { 
						var jsonData = JSON.parse(data);
						if (jsonData.error.code === '0') {
							abrirPagoTPV(jsonData.parameters, jsonData.signature); 
						}
						else {
							// TODO RAUL Poner mensaje de error correcto ¿jsonData.error.message? ==> Habría que
							// ponerlo bonito
							BootstrapDialog
							.alert('Algo no ha salido bien con el pago, por favor contacte con un administrador en info@decotheco.com');
						}
					}  
			});

		} catch (e) {
			BootstrapDialog
					.alert('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here

		}
}