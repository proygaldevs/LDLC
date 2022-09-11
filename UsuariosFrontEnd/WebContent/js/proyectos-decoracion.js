var lista="";
function ldlc(tipo) {

	/*var tipo = getParameterByName("tipo"); */
	$(document.body).css({ 'cursor': 'wait' });
	$('#cargando').modal('show');  
		try { 
			$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
	
	  			data : {
	  				token : "token",
	  				action : "get_Ldlc_3d",
	  				orden : "1",
	  				tipo : tipo,
	  				estado : "200"
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				// BootstrapDialog.alert("DATA: "+data);
	  				// $usuarioGlobal=data; 
	  				if (isError(data)) {
	  					$(document.body).css({ 'cursor': 'default' });
	  					BootstrapDialog.alert(data, function(){ 
	  						cerrarCargando();
	  			        });
	  				} else {
	  					console.log(data);
  					lista=data;
  					var html = '';  
  					var html2=""; 
  					var html3=""; 
  	  				var b = data;
  					var max_size=b.length;
  					var sta = 0;
  					var elementosPagina = 3;
  					var limite = elementosPagina;
  					var filt=0;
  					var filtro=0;   

	  					
	  					for (var i =sta ; i < limite; i++) {
	  						if(data[i]==undefined) {
	  							$('#mas').html("");
	  						} else {  
	  						html2 += '<div class="item opacar ';
										 if(data[i].pagado==2) { html2 += '2d '; } else { html2 += '3d '; }
										 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
											 if(data[i].preferencias[0].habitacion=="questionmark" || data[i].preferencias[0].habitacion=="proyecto"){
												 	html2 += "otros";
												} else if(data[i].preferencias[0].habitacion=="infantil") {
													html2 += "dormitorio-infantil";
												} else if(data[i].preferencias[0].habitacion=="escritorio") {
													html2 += "despacho";
												} else if(data[i].preferencias[0].habitacion=="recibidor") {
													html2 += "entrada";
												} else {
													 html2 += data[i].preferencias[0].habitacion;
												}  
											 if(data[i].preferencias[0].habitacion=="questionmark"){
													habitacion="otros";
												} else if(data[i].preferencias[0].habitacion=="dormitorio-infantil") {
													habitacion="dormitorio infantil";
												} else if(data[i].preferencias[0].habitacion=="escritorio") {
													habitacion="despacho";
												} else {
													habitacion=data[i].preferencias[0].habitacion;
												}
										 } else {
											if(data[i].ldlcs[0].Habitacion!="") { 
												if(data[i].ldlcs[0].Habitacion=="infantil") {
													html2 += "dormitorio-infantil";
												} else {
													html2 += data[i].ldlcs[0].Habitacion;
												} 
												var habitacion="";
												if(data[i].ldlcs[0].Habitacion=="questionmark"){
													habitacion="otros";
												} else if(data[i].ldlcs[0].Habitacion=="dormitorio-infantil") {
													habitacion="dormitorio infantil";
												} else {
													habitacion=data[i].ldlcs[0].Habitacion;
												}
											} else { 
												if(data[i].ldlcs[1].Habitacion=="infantil") {
													html2 += "dormitorio-infantil";
												} else {
													html2 += data[i].ldlcs[1].Habitacion;
												} 
												var habitacion="";
												if(data[i].ldlcs[1].Habitacion=="questionmark"){
													habitacion="otros";
												} else if(data[i].ldlcs[1].Habitacion=="dormitorio-infantil") {
													habitacion="dormitorio infantil";
												} else {
													habitacion=data[i].ldlcs[1].Habitacion;
												}
											}
											
										 }
		
									if(data[i].pagado==2) {
										if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null) { } else {
											if(data[i].ldlcs[0].Estado==4 || data[i].ldlcs[0].Estado==5) {
												html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[0].imagen+'" alt="Composición 2D">';
											} else {
												html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[1].imagen+'" alt="Composición 2D">';
											}
											if(tipo==4){
												html2 += '<a href="piso-decoracion-online.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
											} else {
												html2 += '<a href="proyecto-decoracion-online-2d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
											}
										}
									} else {
										html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3 + 'usuarios/'+data[i].userMail+'/'+data[i].nombreProyecto+'/propuestas/'+data[i].propuestas[1].imagenes[0]+'" alt="Composición 3D">';
										if(tipo==4){
											html2 += '<a href="piso-decoracion-online.html?id='+data[i].idPiso+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
										} else {
											html2 += '<a href="proyecto-decoracion-online-3d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
										}
									}
									
									
									if(data[i].nombreProyectoDecorador=="null" || data[i].nombreProyectoDecorador==undefined){ 
										var res = data[i].nombreProyecto.split("-");
										console.log(res[0]);
										html2 += '<div class="nldlc letra-s" style="position:absolute;top:15%;width:100%">'+res[0]+'<br>';
									} else {
										var res = data[i].nombreProyectoDecorador.split("-");
										console.log(res[0]);
										if(tipo==4){
											html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+data[i].tituloProyecto+'<br>';
										} else {
											html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+res[0]+'<br>';
										}
									}
									 
									if(data[i].pagado==1) { 
										if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
											
											if(data[i].preferencias[0].habitacion=="escritorio") { imagen="despacho"; } else { imagen=data[i].preferencias[0].habitacion; }
											if(tipo==4){ } else {
												html2 += '<img src="img/'+imagen+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
												html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
											} 
											
										} else {
											
											if(tipo==4){ } else {
												html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
												html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
											}
										}
									 } else {
										 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
											 if(tipo==4){ } else {
												 html2 += '<img src="img/'+data[i].preferencias[0].habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
												 html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
											 }
										 }
									     else {
									    	if(data[i].ldlcs[0].Habitacion!="") { 
									    		if(tipo==4){ } else {
									    			html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									    			html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
									    		}
											} else { 
												if(tipo==4){ } else {
													html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
													html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
												}
											}
										 }
									 }
		
									
									if(data[i].textoTrabajo=="null" || data[i].textoTrabajo==undefined){ 
										
									} else {
										html2 += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
									 
									html2 += data[i].textoTrabajo+'</div>';
									}	
									html2 += '</div></div></a>';
									html2 += '</div>';  
								
						
						}
					  }

	  				    var $items = $(html2); 
	  				    $container.append($items) 
						$container.imagesLoaded(function() {
							$('.item').show();
							$container.masonry({ 
								itemSelector : '.item',
								columnWidth: '.grid-sizer'
							});
							hover();
						})
					  
	  					function goFun(sta,limite) {

	  	  					html2="";
	  					  for (var i =sta ; i < limite; i++) {
	  						if(data[i]==undefined) {
	  							$('#mas').html("");
	  						} else {
	  						html2 += '<div class="item opacar ';
	  						if(data[i].pagado==2) { html2 += '2d '; } else { html2 += '3d '; }
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(data[i].preferencias[0].habitacion=="questionmark" || data[i].preferencias[0].habitacion=="proyecto"){
									 	html2 += "otros";
									} else if(data[i].preferencias[0].habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										html2 += "despacho";
									} else if(data[i].preferencias[0].habitacion=="recibidor") {
										html2 += "entrada";
									} else {
										 html2 += data[i].preferencias[0].habitacion;
									}  
								 if(data[i].preferencias[0].habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].preferencias[0].habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else if(data[i].preferencias[0].habitacion=="escritorio") {
										habitacion="despacho";
									} else {
										habitacion=data[i].preferencias[0].habitacion;
									}
							 } else {
								if(data[i].ldlcs[0].Habitacion!="") { 
									if(data[i].ldlcs[0].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[0].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[0].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[0].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[0].Habitacion;
									}
								} else { 
									if(data[i].ldlcs[1].Habitacion=="infantil") {
										html2 += "dormitorio-infantil";
									} else {
										html2 += data[i].ldlcs[1].Habitacion;
									} 
									var habitacion="";
									if(data[i].ldlcs[1].Habitacion=="questionmark"){
										habitacion="otros";
									} else if(data[i].ldlcs[1].Habitacion=="dormitorio-infantil") {
										habitacion="dormitorio infantil";
									} else {
										habitacion=data[i].ldlcs[1].Habitacion;
									}
								}
								
							 }

						if(data[i].pagado==2) {
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null) { } else {
								if(data[i].ldlcs[0].Estado==4 || data[i].ldlcs[0].Estado==5) {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[0].imagen+'" alt="Composición 2D">';
								} else {
									html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].ldlcs[1].imagen+'" alt="Composición 2D">';
								}
								if(tipo==4){
									html2 += '<a href="piso-decoracion-online.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								} else {
									html2 += '<a href="proyecto-decoracion-online-2d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								}
							}
						} else {
							html2 += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3 + 'usuarios/'+data[i].userMail+'/'+data[i].nombreProyecto+'/propuestas/'+data[i].propuestas[1].imagenes[0]+'" alt="Composición 3D">';
							if(tipo==4){
								html2 += '<a href="piso-decoracion-online.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							} else {
								html2 += '<a href="proyecto-decoracion-online-3d.html?id='+data[i].id+'" style="color:white"><div class=" opacar2" style="left: 0;top:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
							}
						}
						
						
						if(data[i].nombreProyectoDecorador=="null" || data[i].nombreProyectoDecorador==undefined){ 
							var res = data[i].nombreProyecto.split("-");
							console.log(res[0]);
							html2 += '<div class="nldlc letra-s" style="position:absolute;top:15%;width:100%">'+res[0]+'<br>';
						} else {
							var res = data[i].nombreProyectoDecorador.split("-");
							console.log(res[0]);
							if(tipo==4){
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+data[i].tituloProyecto+'<br>';
							} else {
								html2 += '<div class="nldlc letra-s" style="position:absolute;top:25%;width:100%">'+res[0]+'<br>';
							}
						}
						 
						if(data[i].pagado==1) { 
							if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								
								if(data[i].preferencias[0].habitacion=="escritorio") { imagen="despacho"; } else { imagen=data[i].preferencias[0].habitacion; }
								if(tipo==4){ } else {
									html2 += '<img src="img/'+imagen+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								} 
								
							} else {
								
								if(tipo==4){ } else {
									html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								}
							}
						 } else {
							 if(data[i].ldlcs[0]==null || data[i].ldlcs[1]==null || data[i].ldlcs[0].Habitacion==null || data[i].ldlcs[1].Habitacion==null || data[i].ldlcs[0].Habitacion=="" || data[i].ldlcs[1].Habitacion=="") {
								 if(tipo==4){ } else {
									 html2 += '<img src="img/'+data[i].preferencias[0].habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
									 html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								 }
							 }
						     else {
						    	if(data[i].ldlcs[0].Habitacion!="") { 
						    		if(tipo==4){ } else {
						    			html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
						    			html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
						    		}
								} else { 
									if(tipo==4){ } else {
										html2 += '<img src="img/'+data[i].ldlcs[0].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
										html2 += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
									}
								}
							 }
						 }

						
						if(data[i].textoTrabajo=="null" || data[i].textoTrabajo==undefined){ 
							
						} else {
							html2 += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
						 
						html2 += data[i].textoTrabajo+'</div>';
						}	
						html2 += '</div></div></a>';
						html2 += '</div>';  
								
						
  						}
  					  }

		  				    var $items = $(html2); 
		  				    $container.append($items) 
							$container.imagesLoaded(function() {
								$('.item').show();
								$container.masonry('appended', $items);
								hover(); 
								$('.item').show();
		  				    	$('#nextValue').html("Ver más");
							})
  					  }

  					  intervalo=setInterval(function(){
						$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
  						var next = limite;
  						if(max_size>=next) {
  						limite = limite+elementosPagina;
  						goFun(next,limite);
  						} else {
  							$('#nextValue').html("");
  						}
					  }
					  ,1500); 	

  					  $('#nextValue').click(function(){ 
				    	$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
  						var next = limite;
  						if(max_size>=next) {
  						limite = limite+elementosPagina;
  						goFun(next,limite);
  						} else {
  							$('#nextValue').html("");
  						}
  						
  					  });
					 
				 
					
				
					cerrarCargando();
						setTimeout(function(){ $("html, body").animate({ scrollTop:750 }, 2000);  }, 500);
						  
	  					$(document.body).css({ 'cursor': 'default' });
	  				}
	
	  			}
	  		});
	
	  	} catch (e) {
	  		$(document.body).css({ 'cursor': 'default' });
			BootstrapDialog.alert('Se ha producido un error en la conexión con el servidor.', function(){ 
				cerrarCargando();
	        }); 
	  	} 
}
function hover() {
	$(".opacar").mouseover(function() {  
		  var nombre=$(this).find(".nldlc").height();
		  var imagen=$(this).find(".opacar2").height();
		  var total=(imagen-nombre)/2;

		  var imagen=$(this).find(".nldlc").css("top",total);
		  $(this).find(".opacar2").fadeTo( 500, 0.8 );
	});					
	$(".opacar").mouseleave(function() {  
		$(this).find(".opacar2" ).hide();
	}); 
	$('.opacar').on('touchstart', function (e) {
	    'use strict'; //satisfy code inspectors
	    var link = $(this); //preselect the link
	    if (link.hasClass('hover')) {
			  var nombre=$(this).find(".nldlc").height();
			  var imagen=$(this).find(".opacar2").height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).find(".nldlc").css("top",total);
	        return true;
	    } else {
	        link.addClass('hover');
			  var nombre=$(this).find(".nldlc").height();
			  var imagen=$(this).find(".opacar2").height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).find(".nldlc").css("top",total);
	        $('.opacar').not(this).removeClass('hover');
	        e.preventDefault();
	        return false; //extra, and to make sure the function has consistent return points
	    }
	});
	$('.nldlc').on('touchstart', function (e) {
	    'use strict'; //satisfy code inspectors
	    var link = $(this); //preselect the link
	    if (link.hasClass('hover')) {
			  var nombre=$(this).height();
			  var imagen=$(this).parent().height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).css("top",total);
	        return true;
	    } else {
	        link.addClass('hover');
			  var nombre=$(this).height();
			  var imagen=$(this).parent().height();
			  if(imagen>nombre){
				  var total=(imagen-nombre)/2;
			  } else if(nombre>imagen){ 
				  var total=(nombre-imagen)/2;
			  }
			  $(this).css("top",total);
	        $('.opacar').not(this).removeClass('hover');
	        e.preventDefault();
	        return false; //extra, and to make sure the function has consistent return points
	    }
	}); 
}
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
}
var filtro1="TODO2";
var filtro2="TODO";
var pasa=false;
var semaforo=0; 
function clickBoton(tipo){ 
	
	$('.borderImg').css("outline","rgb(0, 0, 0) solid 0");
	$("#"+tipo+" img").css("outline", "rgb(0, 0, 0) solid 1px");
	a=1;
	
	
	var textoFiltro = tipo;
    filtro1=textoFiltro;
    if(textoFiltro=='TODO2')
    {
        
        if(filtro2=="TODO") { 
        	$('.filtros .item').slideDown(0, function() {
	          	   $('.filtros .item').css('visibility', 'visible'); 
	          	   $('.filtros .item').fadeIn(500); 
	          	})  
            setTimeout(function(){ 
            	$container.masonry({ 
					itemSelector : '.item',
					columnWidth: '.grid-sizer'
				});
            }, 10);
        } else {
        $('.filtros .item').each(function()
                {
		        	if(!$(this).hasClass(filtro2)) 
			        {
		        		$(this).fadeOut(500, function() {
			            	   $(this).css('visibility', 'hidden'); 
			            	   $(this).css('display', "none"); 
			            	})
			        }
                })
                setTimeout(function(){ 
                	$container.masonry({ 
    					itemSelector : '.item',
    					columnWidth: '.grid-sizer'
    				});
                }, 800);
        }
    }
    else if(filtro2!="" && filtro2!="TODO")
    {
        $('.filtros .item').each(function()
        {
        	if(!$(this).hasClass(textoFiltro) || !$(this).hasClass(filtro2))
            {
        		$(this).fadeOut(500, function() {
	            	   $(this).css('visibility', 'hidden'); 
	            	   $(this).css('display', "none"); 
	            	})
	                setTimeout(function(){ 
	                	$container.masonry({ 
	        				itemSelector : '.item',
	        				columnWidth: '.grid-sizer'
	        			});
	                }, 800);
            }
            else
            {  
            		$(this).slideDown(0, function() {
     	          	   $(this).css('visibility', 'visible'); 
     	          	   $(this).fadeIn(500); 
     	          	}) 
     	           setTimeout(function(){ 
     	          	$container.masonry({ 
     	  				itemSelector : '.item',
     	  				columnWidth: '.grid-sizer'
     	  			});
     	          }, 400);
            }
        });
    } else
    {
        $('.filtros .item').each(function()
        {
        	if(!$(this).hasClass(textoFiltro))
            {
        		$(this).fadeOut(500, function() {
	            	   $(this).css('visibility', 'hidden'); 
	            	   $(this).css('display', "none"); 
	            	})
	                setTimeout(function(){ 
	                	$container.masonry({ 
	        				itemSelector : '.item',
	        				columnWidth: '.grid-sizer'
	        			});
	                }, 800);
            }
            else
            { 
            	$(this).slideDown(0, function() {
  	          	   $(this).css('visibility', 'visible'); 
  	          	   $(this).fadeIn(500); 
  	          	}) 
  	          setTimeout(function(){ 
  	        	$container.masonry({ 
  					itemSelector : '.item',
  					columnWidth: '.grid-sizer'
  				});
  	        }, 400);
            }
        });
    }
    return false;
}

function clickBotonF(tipo){ 
	
	$('.borderImg2').css("outline","rgb(0, 0, 0) solid 0");
	$("#"+tipo+" img").css("outline", "rgb(0, 0, 0) solid 1px");
	a=1;
	
	
    var textoFiltro2 = tipo;
    filtro2=textoFiltro2;
	    if(textoFiltro2=='TODO')
	    {
	        
	        if(filtro1=="TODO2") { 
	        	$('.filtros .item').slideDown(0, function() {
	          	   $('.filtros .item').css('visibility', 'visible'); 
	          	 $('.filtros .item').fadeIn(500);
	          	})  
		        setTimeout(function(){ 
	            	$container.masonry({ 
						itemSelector : '.item',
						columnWidth: '.grid-sizer'
					});
	            }, 10);
	        } else {
	        $('.filtros .item').each(function()
	                {
			        	if(!$(this).hasClass(filtro1)) 
				        {
			        		$(this).fadeOut(500, function() {
				            	   $(this).css('visibility', 'hidden'); 
				            	   $(this).css('display', "none");
				            	})
				        }
	                })
			        setTimeout(function(){ 
		            	$container.masonry({ 
							itemSelector : '.item',
							columnWidth: '.grid-sizer'
						});
		            }, 800);
	        }
	    }
	    else if(filtro1!="" && filtro1!="TODO2")
	    {
	        $('.filtros .item').each(function()
	        {
	        	if(!$(this).hasClass(textoFiltro2) || !$(this).hasClass(filtro1))
	            {
	        		$(this).fadeOut(500, function() {
		            	   $(this).css('visibility', 'hidden'); 
		            	   $(this).css('display', "none");
		            	})
		                setTimeout(function(){ 
		                	$container.masonry({ 
		        				itemSelector : '.item',
		        				columnWidth: '.grid-sizer'
		        			});
		                }, 800);
	            }
	            else
	            { 
	            	$(this).slideDown(0, function() {
	     	          	   $(this).css('visibility', 'visible'); 
	     	          	   $(this).fadeIn(500);
	     	          	}) 
	     	           setTimeout(function(){ 
	     	          	$container.masonry({ 
	     	  				itemSelector : '.item',
	     	  				columnWidth: '.grid-sizer'
	     	  			});
	     	          }, 400);
	            }
	        });
	    } else
	    {
	        $('.filtros .item').each(function()
	        {
	        	if(!$(this).hasClass(textoFiltro2))
	            {
	        		$(this).fadeOut(500, function() {
		            	   $(this).css('visibility', 'hidden'); 
		            	   $(this).css('display', "none");
		            	})
		                setTimeout(function(){ 
		                	$container.masonry({ 
		        				itemSelector : '.item',
		        				columnWidth: '.grid-sizer'
		        			});
		                }, 800);
	            }
	            else
	            { 
	            	$(this).slideDown(0, function() {
	     	          	   $(this).css('visibility', 'visible'); 
	     	          	   $(this).fadeIn(500);
	     	          	}) 
	     	           setTimeout(function(){ 
	     	          	$container.masonry({ 
	     	  				itemSelector : '.item',
	     	  				columnWidth: '.grid-sizer'
	     	  			});
	     	          }, 400);
	            }
	        });
	    }


	    
	    return false;
}

function getCookie(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : "";
}

$(document).ready(function() {
	 
});
