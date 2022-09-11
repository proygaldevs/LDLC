
var idTabla=0;
var contador=0;
var urlbaseDeco="http://decoradores.decotheco.com";
function loguear(mail, pass, tipo) {
	BootstrapDialog.alert("Vas a <b>LOGUEARTE</b> con este cliente, <b> PODRÁS ACCEDER A CUALQUIER PÁGINA DE ESTE CLIENTE</b>; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
		if(tipo=="usuario") {
			clearAllCookies();
			deleteCookie("checked_keep_Session"); 
			var href = "Home.html?u="+mail+"&p="+pass;
			window.open(href, '_blank');
		} else { 
			
			var href = urlbaseDeco+"/home.html?u="+mail+"&c="+pass;
			window.open(href, '_blank');
		}
    }); 
}
var cantidad=0;

function cargarInfo() { 

    $('#modalContra').modal("show");
	
}	
function verificar() {
    $('#modalContra').modal("hide");
    var textoCodigo=$('.textoCodigo').val(); 
    $.ajax({ 
		dataType : "json", 
		url : urlbaseForAjax + '/DecoradoresController', 
		data : {
			token : "token",
			action : "getInfoUserDecorador",
			textoCodigo: textoCodigo
			
		}, 
		contentType : "application/json; charset=utf-8",
		success : function(data) { 
			console.log(data);
			comprobar=data;
			if(comprobar==1) { 
				console.log(1);
				$('#cargando').modal('show');
				cargarListas();
			} else { 
				console.log(0);
			    $('#modalContra').modal("show");
			}
			
		},
	    error : function(xhr, status) {
	    },  
	    complete : function(xhr, status) { 
	    }
	});
} 
function cargarListas() {
	
	try { 
		
				 
				
							
						
						$.ajax({ 
							dataType : "json", 
							url : urlbaseForAjax + '/DecoradoresController', 
							data : {
								token : "token",
								action : "getUsuariosInfo",
								tipo: "decoradores"
								
							}, 
							contentType : "application/json; charset=utf-8",
							success : function(data) { 
								console.log(data); 
								
								var table2= $('#example2').DataTable( { 
								    "responsive" :true,
								    "columns": [
								        { "data": "id" },
								        { "data": "nombre" },
								        { "data": "mail" },
								        { "data": "pass" },
								        {
								            "data":null,
								            "searchable":false,
								            "orderable":false,
								            "sortable":false, 
								            "render": function ( nTd, sData, oData, iRow, iCol ) {
								              return '<div class="text-center" style="min-width:110px"> <button type="button" class="imagenes btn btn-warning btn-xs" onclick="loguear(\''+oData.mail+'\',\''+oData.pass+'\', \'decorador\');"  title="Loguear"> <i class="glyphicon glyphicon-user"></i> </button>  <button type="button" class="btn btn-primary btn-xs"  onclick="proyectos2(\''+oData.id+'\',\''+oData.mail+'\',\''+oData.pass+'\', \'decorador\');" title="Proyectos"> Proyectos </button> </div>';
								               } 
								        }
								    ],
				 
								      // NUMERO DE REGISTROS PREDETERMINADO
								      'iDisplayLength': 10,
								      // CAMBIAR EL LENGUAJE DE LA TABLA 
								      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
									    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },
				
								      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
								    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>"
								}); 
								
								
								for (var i = 0; i < data.length; i++) {  
									table2.row.add( {
								        "id":    data[i].id,
								        "nombre":    data[i].userName,
								        "mail":     data[i].mail,
								        "pass":     data[i].pass 
								    } ).draw();
								}
								
								
							},
					        error : function(xhr, status) {
					        },  
					        complete : function(xhr, status) { 
					        }
						});
						
						$.ajax({ 
							dataType : "json", 
							url : urlbaseForAjax + '/DecoradoresController', 
							data : {
								token : "token",
								action : "getUsuariosInfo",
								tipo: "usuarios"
								
							}, 
							contentType : "application/json; charset=utf-8",
							success : function(data) {  
								console.log(data);
								
								var table= $('#example').DataTable( {
								    "responsive" :true, 
								    "columns": [
								        { "data": "id" },
								        { "data": "nombre" },
								        { "data": "mail" },
								        { "data": "pass" },
								        {
								            "data":null,
								            "searchable":false,
								            "orderable":false,
								            "sortable":false, 
								            "render": function ( nTd, sData, oData, iRow, iCol ) {
								              return '<div class="text-center" style="min-width:110px"> <button type="button" class="imagenes btn btn-warning btn-xs" onclick="loguear(\''+oData.mail+'\',\''+oData.pass+'\', \'usuario\')"  title="Loguear"> <i class="glyphicon glyphicon-user"></i> </button>  <button type="button" class="btn btn-primary btn-xs"  onclick="proyectos(\''+oData.id+'\',\''+oData.mail+'\',\''+oData.pass+'\', \'usuario\');" title="Lista de proyectos"> Proyectos </button> </div>';
								               } 
								        }
								    ],
				 
								      // NUMERO DE REGISTROS PREDETERMINADO
								      'iDisplayLength': 10,
								      // CAMBIAR EL LENGUAJE DE LA TABLA 
								      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
									    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },
				
								      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
								    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>",
								    "buttons": [  
								    ] 
				
								});   
				   
								for (var i = 0; i < data.length; i++) { 
									table.row.add( {
								        "id":    data[i].id,
								        "nombre":    data[i].userName,
								        "mail":     data[i].mail,
								        "pass":     data[i].pass 
								    } ).draw();
								}
								
								cerrarCargando();
								
								
							},
					        error : function(xhr, status) {
					        },  
					        complete : function(xhr, status) { 
					        }
						});
		
		
	
	} catch (e) {
	BootstrapDialog
			.alert('Se ha producido un error en la conexión con el servidor');
	// put any code you want to execute if there's an exception here
	
	}
	
	
} 
idUrl=0;
mailUrl="";
passUrl="";
tipoUrl=0;
var table3="";
function proyectos(id, mail, pass, tipo) {
 
 
	mailUrl=mail;
	passUrl=pass;
	tipoUrl="usuario";
    idTabla= id; 
    $.ajax({ 
		dataType : "json", 
		url : urlbaseForAjax + '/DecoradoresController', 
		data : {
			token : "token",
			action : "getProjectsInfo",
			tipo: "usuarios",
			id: idTabla
			
		}, 
		contentType : "application/json; charset=utf-8",
		success : function(data) {  
			console.log(data);
			if(contador==0) {
			 table3= $('#example3').DataTable( { 
				    "responsive" :true,
				    "columns": [
				        { "data": "id" },
				        { "data": "nombreProyecto" },
				        { "data": "pagado" },
				        { "data": "estado" },
				        { "data": "idDecorador" },
				        {
				            "data":null,
				            "searchable":false,
				            "orderable":false,
				            "sortable":false, 
				            "render": function ( nTd, sData, oData, iRow, iCol ) {
				              return '<div class="text-center" style="min-width:110px"> <button type="button" class=" btn btn-warning btn-xs paso1" title="Paso 1"> 1 </button>  <button type="button" class="  btn btn-primary btn-xs paso3" title="Paso 3"> 3 </button>  <button type="button" class=" btn btn-danger btn-xs paso4" title="Paso 4"> 4 </button> </div>';
				               } 
				        }
				    ],

				      // NUMERO DE REGISTROS PREDETERMINADO
				      'iDisplayLength': 10,
				      // CAMBIAR EL LENGUAJE DE LA TABLA 
				      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
					    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },

				      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
				    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>"
			});  
			 $('#example3 tbody').on('click','.paso1', function () { 
					console.log(tipoUrl);
					btn = $(this);
				    tr = btn.closest('tr');
				    fila = table3.row(tr).index();
				    colus= table3.columns().header().count()-1; 
				    idUrl=table3.cell(fila,0).data();
				    var estado=table3.cell(fila,3).data();
				    console.log(estado);
				    BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
					    if(estado>=11) {
					    	logoutFunction();
							if(tipoUrl=="usuario") { 
								var href = "/paso1.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							} else {
								var href = urlbaseDeco+"/paso1.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							}
					    } else {
					    	$('.mensaje').html(" ******* Este proyecto aún no ha sido pagado "); 
					    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
					    }
				    }); 
					
					
				})
				$('#example3 tbody').on('click','.paso3', function () { 
				 
					btn = $(this);
				    tr = btn.closest('tr');
				    fila = table3.row(tr).index();
				    colus= table3.columns().header().count()-1; 
				    idUrl=table3.cell(fila,0).data();
				    var estado=table3.cell(fila,3).data();
				    if(estado>=40) {
				    	BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
					    		
					    	logoutFunction();
							if(tipoUrl=="usuario") { 
								var href = "/paso3.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							} else {
								var href = urlbaseDeco+"/paso3.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							}
					    }); 
				    } else { 
				    	$('.mensaje').html(" ******* Este proyecto aún no está en el paso 3 ");
				    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
				    }
					
					
				})
				 
				$('#example3 tbody').on('click','.paso4', function () { 
				 
					btn = $(this);
				    tr = btn.closest('tr');
				    fila = table3.row(tr).index();
				    colus= table3.columns().header().count()-1; 
				    idUrl=table3.cell(fila,0).data();
				    var estado=table3.cell(fila,3).data();
				    if(estado>=80) {
				    	BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
				    		   
				    		logoutFunction();
							if(tipoUrl=="usuario") { 
								var href = "/paso4.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							} else {
								var href = urlbaseDeco+"paso4.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
								window.open(href, '_blank');
							}
				        });  
				    } else { 
				    	$('.mensaje').html(" ******* Este proyecto aún no está en el paso 4 ");
				    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
				    }
				})
			contador++;
			}
  			table3.clear();
  			
	  	    
 
		  	    $(".idUser").html("Id decorador");

	  			table3.clear();
	  			if(data.length>0) {
  		  	    $('#modalProyectos').modal({show:true, keyboard: true});
	  			for (var i = 0; i < data.length; i++) {  
	  				table3.row.add( {
	  			        "id":    data[i].id,
	  			        "nombreProyecto":    data[i].nombreProyecto,
	  			        "pagado":     data[i].pagado,
	  			        "estado":     data[i].estado,
	  			        "idDecorador":     data[i].idDecorador
	  			    } ).draw();
	  			}
	  			} else { 
	  				
	  				console.log("clear");
		  			table3.clear();
		  	  		BootstrapDialog.show({
			            title: '',
			            message: 'Este usuario no tiene proyectos.',
			            type: BootstrapDialog.TYPE_DEFAULT,
			            buttons: [{
			                label: 'Ok',
			                action: function(dialogRef){ 
			                    dialogRef.close();
			                }
			            }]
			        });
	  			}
	  			 
		},
        error : function(xhr, status) {
	  			table3.clear();
        },  
        complete : function(xhr, status) { 
        }
	});
    
}  
function proyectos2(id, mail, pass, tipo) { 
	
	mailUrl=mail;
	passUrl=pass;
	tipoUrl="decorador";
    idTabla= id;

      console.log("entro");
      
      $.ajax({ 
  		dataType : "json", 
  		url : urlbaseForAjax + '/DecoradoresController', 
  		data : {
  			token : "token",
  			action : "getProjectsInfo",
  			tipo: "decoradores",
			id: idTabla
  			
  		}, 
  		contentType : "application/json; charset=utf-8",
  		success : function(data) { 
  			console.log(data); 
  			if(contador==0) {
  			 table3= $('#example3').DataTable( { 
  				    "responsive" :true,
  				    "columns": [
  				        { "data": "id" },
  				        { "data": "nombreProyecto" },
  				        { "data": "pagado" },
  				        { "data": "estado" },
  				        { "data": "idDecorador" },
  				        {
  				            "data":null,
  				            "searchable":false,
  				            "orderable":false,
  				            "sortable":false, 
  				            "render": function ( nTd, sData, oData, iRow, iCol ) {
  				              return '<div class="text-center" style="min-width:110px"> <button type="button" class=" btn btn-warning btn-xs paso1" title="Paso 1"> 1 </button>  <button type="button" class="  btn btn-primary btn-xs paso3" title="Paso 3"> 3 </button>  <button type="button" class=" btn btn-danger btn-xs paso4" title="Paso 4"> 4 </button> </div>';
  				               } 
  				        }
  				    ],

  				      // NUMERO DE REGISTROS PREDETERMINADO
  				      'iDisplayLength': 10,
  				      // CAMBIAR EL LENGUAJE DE LA TABLA 
  				      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
  					    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },

  				      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
  				    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>"
  			});  
  			$('#example3 tbody').on('click','.paso1', function () { 
  				console.log(tipoUrl);
  				btn = $(this);
  			    tr = btn.closest('tr');
  			    fila = table3.row(tr).index();
  			    colus= table3.columns().header().count()-1; 
  			    idUrl=table3.cell(fila,0).data();
  			    var estado=table3.cell(fila,3).data();
  			    console.log(estado);
  			    BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
  				    if(estado>=11) {
  				    	logoutFunction();
  						if(tipoUrl=="usuario") { 
  							var href = "/paso1.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						} else {
  							var href = urlbaseDeco+"/paso1.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						}
  				    } else {
  				    	$('.mensaje').html(" ******* Este proyecto aún no ha sido pagado "); 
  				    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
  				    }
  			    }); 
  				
  				
  			})
  			$('#example3 tbody').on('click','.paso3', function () { 
  			 
  				btn = $(this);
  			    tr = btn.closest('tr');
  			    fila = table3.row(tr).index();
  			    colus= table3.columns().header().count()-1; 
  			    idUrl=table3.cell(fila,0).data();
  			    var estado=table3.cell(fila,3).data();
  			    if(estado>=40) {
  			    	BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
  				    		
  				    	logoutFunction();
  						if(tipoUrl=="usuario") { 
  							var href = "/paso3.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						} else {
  							var href = urlbaseDeco+"/paso3.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						}
  				    }); 
  			    } else { 
  			    	$('.mensaje').html(" ******* Este proyecto aún no está en el paso 3 ");
  			    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
  			    }
  				
  				
  			})
  			 
  			$('#example3 tbody').on('click','.paso4', function () { 
  			 
  				btn = $(this);
  			    tr = btn.closest('tr');
  			    fila = table3.row(tr).index();
  			    colus= table3.columns().header().count()-1; 
  			    idUrl=table3.cell(fila,0).data();
  			    var estado=table3.cell(fila,3).data();
  			    if(estado>=80) {
  			    	BootstrapDialog.alert("Vas a acceder <b>SOLO</b> a la información de este paso, si accedes a otra parte se cerrará la sesión; <br/> <font style='color:red'>IMPORTANTE: cierra todas las pestañas personales que tengas abiertas para evitar errores</font>", function(){  
  			    		   
  			    		logoutFunction();
  						if(tipoUrl=="usuario") { 
  							var href = "/paso4.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						} else {
  							var href = urlbaseDeco+"/paso4.html?id="+idUrl+"&u="+mailUrl+"&c="+passUrl;
  							window.open(href, '_blank');
  						}
  			        });  
  			    } else { 
  			    	$('.mensaje').html(" ******* Este proyecto aún no está en el paso 4 ");
  			    	setTimeout(function(){ $('.mensaje').html(" <font style='color:#d44c48'>*Si accedes a un paso no te estás logueando, solo visualizando la información.</font>");  }, 3000);
  			    }
  			})
  			contador++;
  			}
  			table3.clear();
	  	    $(".idUser").html("Id usuario");

  			table3.clear();
  			if(data.length>0) {
  		  	    $('#modalProyectos').modal({show:true, keyboard: false});
	  			for (var i = 0; i < data.length; i++) {  
	  				table3.row.add( {
	  			        "id":    data[i].id,
	  			        "nombreProyecto":    data[i].nombreProyecto,
	  			        "pagado":     data[i].pagado,
	  			        "estado":     data[i].estado,
	  			        "idDecorador":     data[i].idDecorador
	  			    } ).draw();
	  			} 
  			} else {
  				console.log("clear");
  	  			table3.clear();
	  	  		BootstrapDialog.show({
		            title: '',
		            message: 'Este usuario no tiene proyectos.',
		            type: BootstrapDialog.TYPE_DEFAULT,
		            buttons: [{
		                label: 'Ok',
		                action: function(dialogRef){ 
		                    dialogRef.close();
		                }
		            }]
		        });
  			}
  		},
          error : function(xhr, status) {
	  			table3.clear();
          },  
          complete : function(xhr, status) { 
          }
  	});

       
} 