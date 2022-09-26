var cantidad=0;
function cargarGanancias() {
	
	try { 
		
		$.ajax({ 
			dataType : "json", 
			url : urlbaseForAjax + '/DecoradoresController', 
			data : {
				token : "token",
				action : "getAfiliadosInfo",
				idAfiliado: idAfiliado
				
			}, 
			contentType : "application/json; charset=utf-8",
			success : function(data) { 
				console.log(data);
				var cadenaforimg=urlbaseForMoodboards+"/afiliados/"+data.img;
				$(".imgPerfil").attr('src',cadenaforimg);
				$(".nombre").html(data.surname);
				
				var table2= $('#example2').DataTable( { 
				    "responsive" :true,
				    "columns": [
				        { "data": "fecha_pago" },
				        { "data": "cantidad" },
				        { "data": "concepto" }
				    ],
 
				      // NUMERO DE REGISTROS PREDETERMINADO
				      'iDisplayLength': 10,
				      // CAMBIAR EL LENGUAJE DE LA TABLA 
				      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
					    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },

				      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
				    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>"
				}); 
				
				
				for (var i = 0; i < data.pagos_afiliado.length; i++) { 
					cantidad=cantidad+data.pagos_afiliado[i].cantidad;
					table2.row.add( {
				        "fecha_pago":    data.pagos_afiliado[i].fecha_pago,
				        "cantidad":  data.pagos_afiliado[i].cantidad+'€',
				        "concepto":     data.pagos_afiliado[i].concepto
				    } ).draw();
				}
				

				$(".totalPagado").append(cantidad.toFixed(2)+"€");
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
				action : "getAfiliados",
				idAfiliado: idAfiliado
				
			}, 
			contentType : "application/json; charset=utf-8",
			success : function(data) {  
				
				
				var table= $('#example').DataTable( {
				    "responsive" :true, 
				    "columns": [
				        { "data": "id_user" },
				        { "data": "nombreUsuario" },
				        { "data": "registro" },
				        { "data": "oferta" },
				        { "data": "veces" },
				        { "data": "money" }
				    ],
				        initComplete: function () {

				            this.api().columns().every( function () {
				                var column = this;
				                var select = $('<select><option value="">Todo</option></select>')
				                    .appendTo( $(column.footer()).empty() )
				                    .on( 'change', function () {
				                        var val = $.fn.dataTable.util.escapeRegex(
				                            $(this).val()
				                        );
				 
				                        column
				                            .search( val ? '^'+val+'$' : '', true, false )
				                            .draw();
				                    } );
				 
				                column.data().unique().sort().each( function ( d, j ) {
				                    select.append( '<option value="'+d+'">'+d+'</option>' )
				                } );
				            } );
				        },
 
				      // NUMERO DE REGISTROS PREDETERMINADO
				      'iDisplayLength': 10,
				      // CAMBIAR EL LENGUAJE DE LA TABLA 
				      "language":{"url":urlbase+"/datatables/ajax/LangBasque"},
					    "language": { "info": "Mostrando _START_ a _END_ de _TOTAL_ registros" },

				      // DISTRIBUCIÓN DE LOS BOTONES (Y AÑADIR NUEVOS)    
				    dom : "<'row'<'form-inline'<'col-sm-6'l><'col-sm-6'f>>><rt><'row'<'form-inline'<'col-sm-6'i><'col-sm-6'p>>>",
				    "buttons": [  
				    ],
				    "columnDefs": [
			            {
			                "targets": [ 0 ],
			                "visible": false,
			                "searchable": false
			            }
			        ] 

				});   
   
		        var total=0;
				for (var i = 0; i < data.length; i++) {
					total=total+data[i].money;
					table.row.add( {
				        "id_user":    data[i].id_user,
				        "oferta":   data[i].oferta,
				        "nombreUsuario":     data[i].nombreUsuario,
				        "registro":     data[i].registro,
				        "veces": data[i].veces,
				        "money":     data[i].money+"€"
				    } ).draw();
				}

				$(".totalGenerado").append(total.toFixed(2)+"€");
				pendiente=total-cantidad;
				$(".totalPendiente").append(pendiente.toFixed(2)+"€");
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