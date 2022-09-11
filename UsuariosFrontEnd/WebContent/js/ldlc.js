var lista="";

var max_size=0; 
var sta = 0;
var elementosPagina = 3;
var limite = elementosPagina;
var filt=0;
var filtro=0; 
var b="";

function ldlc() {
	try {
		tipo = getParameterByName("tipo");    
	}  catch (e) { 
		tipo="normal";
	}
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
  				action : "get_Ldlc",
  				tipo: tipo
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
  					lista=data;
  					console.log(data);
  					var html = '';  
  					var html2=""; 
  					var html3=""; 
  	  				b = data;

  	  				 max_size=b.length;
  					 
  					
  					for (var i =sta ; i < limite; i++) {
  						if(data[i]==undefined) {
  							$('#mas').html("");
  						} else {  
								html += '<div class="item opacar ';
									for (var f = 0; f < data[i].etiquetas.length; f++) {
		
										if(f<=2){
										html += data[i].etiquetas[f].id+" ";
										}
									} 
										html += data[i].Habitacion; 
								html += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].imagen+'" alt="Composición 2D">';
								html += '<a class="taphover" href="decoracion-espacios.html?idLdlc='+data[i].ListaCompra_id+'" style="color:white"><div class=" opacar2" style="top:0;left:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								
								html += '<div class="nldlc letra-s" style="position:absolute;top:0px;width:100%">'+data[i].nombreLdlc+'<br>';
								html += '<img src="img/'+data[i].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
								var habitacion="";
								if(data[i].Habitacion=="questionmark"){
									habitacion="otros";
								} else if(data[i].Habitacion=="dormitorio-infantil") {
									habitacion="dormitorio infantil";
								} else {
									habitacion=data[i].Habitacion;
								}
								html += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								
								html += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
								var etiq="";
								for (var j = 0; j < data[i].etiquetas.length; j++) {
									if(j<=2){
										if(data[i].etiquetas[j].id==1){
											etiq="nórdico";
										} else if(data[i].etiquetas[j].id==2) {
											etiq="industrial";
										}else if(data[i].etiquetas[j].id==3) {
											etiq="vintage";
										}else if(data[i].etiquetas[j].id==4) {
											etiq="moderno";
										}else if(data[i].etiquetas[j].id==5) {
											etiq="minimalista";
										}else if(data[i].etiquetas[j].id==6) {
											etiq="contemporáneo";
										}else if(data[i].etiquetas[j].id==7) {
											etiq="ecléctico";
										}else if(data[i].etiquetas[j].id==8) {
											etiq="retro";
										}else if(data[i].etiquetas[j].id==9) {
											etiq="rústico";
										} 
										if(j==2){
											html += etiq; 
										} else {
											if(data[i].etiquetas.length==1 && j==0 || data[i].etiquetas.length==2 && j==1){
												html += etiq;
											} else { 
											html += etiq+", ";
											}
										}
										 
									}
								} 	 
								
								
									
								html += '</div></div></div></a>';
								html += '</div>';  
							  
  						}
					 }
  					
  					
  					
  					
  					var $items = $(html); 
  				    $container.append($items) 
					$container.imagesLoaded(function() {
						$('.item').show();
						$container.masonry({ 
							itemSelector : '.item',
							columnWidth: '.grid-sizer'
						});
						hover();
						cerrarCargando();
						setTimeout(function(){ $("html, body").animate({ scrollTop:750 }, 2000);  }, 500);
	  					$(document.body).css({ 'cursor': 'default' });
					})	 
					
					function goFun(sta,limite) {
  				    	html="";
  					    for (var i =sta ; i < limite; i++) {
  				    	if(data[i]==undefined) {
  							$('#mas').html("");
  						} else {  
								html += '<div class="item opacar ';
									for (var f = 0; f < data[i].etiquetas.length; f++) {
		
										if(f<=2){
										html += data[i].etiquetas[f].id+" ";
										}
									} 
										html += data[i].Habitacion; 
								html += '"><img style="width:100%;border:1px solid black" src="'+urlbuckets3+'ldlc/imagenes/'+data[i].imagen+'" alt="Composición 2D">';
								html += '<a class="taphover" href="decoracion-espacios.html?idLdlc='+data[i].ListaCompra_id+'" style="color:white"><div class=" opacar2" style="top:0;left:0;position:absolute;background-color:black;height:100%;width:100%;text-align:center;color:white">';
								
								html += '<div class="nldlc letra-s" style="position:absolute;top:0px;width:100%">'+data[i].nombreLdlc+'<br>';
								html += '<img src="img/'+data[i].Habitacion+'-sin.png" alt="Tipo de habitación" class="img_border" style=";margin-top:-5px;opacity:1!important;outline:1px solid black;width:70px;"/>'; 
								var habitacion="";
								if(data[i].Habitacion=="questionmark"){
									habitacion="otros";
								} else if(data[i].Habitacion=="dormitorio-infantil") {
									habitacion="dormitorio infantil";
								} else {
									habitacion=data[i].Habitacion;
								}
								html += '<div class="letra-xxxs" style="position:absolute;margin-top:-5px;width:100%">'+habitacion+'<br></div>';
								
								html += '<div class="etiquetas  letra-xxs" style="margin-top: 25px;">';
								var etiq="";
								for (var j = 0; j < data[i].etiquetas.length; j++) {
									if(j<=2){
										if(data[i].etiquetas[j].id==1){
											etiq="nórdico";
										} else if(data[i].etiquetas[j].id==2) {
											etiq="industrial";
										}else if(data[i].etiquetas[j].id==3) {
											etiq="vintage";
										}else if(data[i].etiquetas[j].id==4) {
											etiq="moderno";
										}else if(data[i].etiquetas[j].id==5) {
											etiq="minimalista";
										}else if(data[i].etiquetas[j].id==6) {
											etiq="contemporáneo";
										}else if(data[i].etiquetas[j].id==7) {
											etiq="ecléctico";
										}else if(data[i].etiquetas[j].id==8) {
											etiq="retro";
										}else if(data[i].etiquetas[j].id==9) {
											etiq="rústico";
										} 
										if(j==2){
											html += etiq; 
										} else {
											if(data[i].etiquetas.length==1 && j==0 || data[i].etiquetas.length==2 && j==1){
												html += etiq;
											} else { 
											html += etiq+", ";
											}
										}
										 
									}
								} 	 
								
								
									
								html += '</div></div></div></a>';
								html += '</div>';  
							   
  						 }
  					    }
  					    var $items = $(html); 
	  				    $container.append($items);
						$container.imagesLoaded(function() { 
							$('.item').show();
								$container.masonry('appended', $items);
								hover();

								$('.item').show();
		  				    	$('#nextValue').html("Ver más");
						})
	  				}
  				    
  				    $('#nextValue').click(function(){ 
  				    	$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
						var next = limite;
						if(max_size>=next) {
						limite = limite+elementosPagina; 
						goFun(next,limite);
						} else {
							$('#mas').html("");
						}
						
				    });
  				    
  				  function verMas() { 
  				  	$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
  					var next = limite;
  					if(max_size>=next) {
  					limite = limite+elementosPagina; 
  					goFun(next,limite);
  					} else {
  						$('#mas').html("");
  					}
  				}
  				$(function(){
  					$(window).scroll(function(){
  						if($(window).scrollTop() + $(window).height() == $(document).height()) {
  						      verMas();
  						   }
  					});
  				});
					
  				  intervalo=setInterval(function(){
						verMas()
					}
					,1500); 
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
function verMas() { 
  	$('#nextValue').html("<img style='width:50px' src='img/puntos-suspensivos.svg' title='cargando' alt='cargando'>");
	var next = limite;
	if(max_size>=next) {
	limite = limite+elementosPagina;
	console.log(next);
	console.log(elementosPagina);
	goFun(next,limite);
	} else {
		$('#mas').html("");
	}
}
function isError(cualquierCadena){
	var errorstring="ERROR";
	if(cualquierCadena.toString().substring(0,5) == errorstring){
		return true;
	}
	return false;
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
var filtro1="TODO";
var filtro2="TODO";
var pasa=false;
var semaforo=0; 
function clickBoton(tipo){ 
	
	var textoFiltro = tipo;
    filtro1=textoFiltro;
    if(textoFiltro=='TODO')
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
    if(semaforo==0){
		semaforo=1;
		clickBoton2(tipo);
		setTimeout(function() {
			  semaforo=0;
			}, 1000)
	}
    return false;
}

function clickBotonF(tipo){ 
	
	$('.img_border').css("outline","rgb(0, 0, 0) solid 0");
	$("#"+tipo+" img").css("outline", "rgb(0, 0, 0) solid 1px");
	a=1;
	
	
    var textoFiltro2 = tipo;
    filtro2=textoFiltro2;
	    if(textoFiltro2=='TODO')
	    {
	        
	        if(filtro1=="TODO") { 
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
	    else if(filtro1!="" && filtro1!="TODO")
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
function clickBoton2(tipo){
	
	
	if(tipo=='TODO'){
		$('#spanforTodo').css({ 'background-color': '#bfbfbf' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='1'){ 
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#bfbfbf' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
		
	}else
	if(tipo=='2'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#bfbfbf' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='4'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#bfbfbf' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='5'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#bfbfbf' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='3'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#bfbfbf' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' }); 
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='6'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#bfbfbf' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='8'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#bfbfbf' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	}else
	if(tipo=='7'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#bfbfbf' });
		$('#spanforrustico').css({ 'background-color': '#fff' });
	} else
	if(tipo=='9'){
		$('#spanforTodo').css({ 'background-color': '#fff' });
		$('#spanfornordico').css({ 'background-color': '#fff' });
		$('#spanforindustrial').css({ 'background-color': '#fff' });
		$('#spanformoderno').css({ 'background-color': '#fff' });
		$('#spanforminimalista').css({ 'background-color': '#fff' });
		$('#spanforvintage').css({ 'background-color': '#fff' });
		$('#spanforcontemporaneo').css({ 'background-color': '#fff' });
		$('#spanforretro').css({ 'background-color': '#fff' });
		$('#spanforeclectico').css({ 'background-color': '#fff' });
		$('#spanforrustico').css({ 'background-color': '#bfbfbf' });
	} 
}

function getCookie(cookie_name) {
	var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : "";
}

$(document).ready(function() { 
});
