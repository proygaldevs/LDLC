var userAssistantCockie = getCookie("userAssistant");
var proyectos = getParameterByName("tipo");
var tipo = getParameterByName("tipo").replace(",",".");
if(tipo!="null") { 
	function pagarPiso() {
		function conversorEspacios (data) {
			if(data==1) {
				return "comedor";
			} else if(data==2) {
				return "escritorio";
			} else if(data==3) {
				return "dormitorio";
			} else if(data==4) {
				return "entrada";
			} else if(data==5) {
				return "infantil";
			} else if(data==6) {
				return "salon";
			} else if(data==7) {
				return "vestidor";
			} else if(data==8) {
				return "baño";
			} else if(data==9) {
				return "cocina";
			} else if(data==10) {
				return "otros";
			}
		} 
		var tipoEstancias=tipo;
		var arrayDeCadenas = $.trim(tipoEstancias.split("-"));
		var arrayDeCadenas = arrayDeCadenas.split(",");
		console.log(arrayDeCadenas);
		console.log(arrayDeCadenas.length); 
		$(".packTitulo").html("PACK DE "+arrayDeCadenas.length+" ESTANCIAS");
		for(var i=0;i<arrayDeCadenas.length;i++) {
			var dataFinal=conversorEspacios(arrayDeCadenas[i]); 
			if(i==0) { 
				$(".packTexto").append(dataFinal);
			} else {
				$(".packTexto").append(" · "+dataFinal);
			}
		} 
		
		contador=arrayDeCadenas.length;
		if(contador==1) {
			precio="179€";
			total=179;
			textoPrecio='';
		} else if(contador==2) {
			precio="299€";
			total=299;
			textoPrecio='<strike>179€</strike> 149.50€ POR ESTANCIA [59€ DE AHORRO]';
		}  else if(contador==3) {
			precio="420€";
			total=420;
			textoPrecio='<strike>179€</strike> 140€ POR ESTANCIA [117€ DE AHORRO]';
		}  else if(contador==4) {
			precio="525€";
			total=525;
			textoPrecio='<strike>179€</strike> 131.25€ POR ESTANCIA [191€ DE AHORRO]';
		}  else if(contador==5) {
			precio="600€";
			total=600;
			textoPrecio='<strike>179€</strike> 120€ POR ESTANCIA [295€ DE AHORRO]';
		} else if(contador==6) {
			precio="700€";
			total=700;
			textoPrecio='<strike>179€</strike> 116.67€ POR ESTANCIA [374€ DE AHORRO]';
		} else if(contador==7) {
			precio="800€";
			total=800;
			textoPrecio='<strike>179€</strike> 114.29€ POR ESTANCIA [453€ DE AHORRO]';
		}  else if(contador==8) {
			precio="900€";
			total=900;
			textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [532€ DE AHORRO]';
		}  else if(contador==9) {
			precio="1012.50€";
			total=1012.50;
			textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA [598€ DE AHORRO]';
		} else {
			precio=(contador*112.50)+"€";
			total=contador*112.50;
			textoPrecio='<strike>179€</strike> 112.50€ POR ESTANCIA ['+66.50*contador+'€ DE AHORRO]';
		}
			  

		$(".packPrecio").html(precio);
		$(".textPrecio").html(textoPrecio); 
		 
		
		
	}
	pagarPiso();
} else {
	
}

 

if(getCookie("userAssistant")!=""){  
	$('#cargando').modal('show');
} else {
	$('#login-modal').modal('show');
}

var pagado = getParameterByName("pagado");  
if(pagado=="ok"){
	setTimeout(function(){ 
		BootstrapDialog
		.alert('Se realizó el pago correctamente. Recibirá un email con los datos del pedido. Comenzamos a procesar su pedido.');
	}, 1000);  
} else if(pagado=="ko"){
	setTimeout(function(){ 
		BootstrapDialog
		.alert('El pago no se ha realizo, vuelva a intentarlo. Para cualquier duda, por favor contacte con un administrador en info@decotheco.com.');
	}, 1000);  
	
}

var valor=total; 
	
		
	    paypal.Button.render({
	    
	        env: 'production', // Specify 'sandbox' for the test environment
	        locale: 'es_ES',

	        style: {
                size: 'medium',
                color: 'silver',
                shape: 'rect'
            },
	        
	        client: {
	            sandbox:    'AdntKA-Oxb_wYBZ7eW9NNCIiBhDoBaXt98bkMKKpPvN78hfwGWpTeFk_krn6FQM1rkAdGmzDu310QURE',
	            production: 'AdvdzlXtq-hOAIfVo-lIlEMHSZdCdsxSAeMLeW8XgOfPeAyxxJqImSLHoLgyVcKJcaA7f9ajJrLIGejp'
	        },
			
	        payment: function() {
	        
	            var env    = this.props.env;
	            var client = this.props.client;
	        
	            return paypal.rest.payment.create(env, client, {
	            	payer: {
	            	    payment_method: 'paypal'
	            	  },
	                transactions: [{
	                        amount: { total: total, currency: 'EUR' },
	                        item_list: {
	                            items: [{
	                                "name": "DecoTheCo",
	                                "quantity": 1,
	                                "price": total,
	                                "currency": "EUR"
	                            }]
	                        }
	                    }
	                ]
	            });
	        },

	        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

	        onAuthorize: function(data, actions) {
	         //alert("onAutorize");
	            // Optional: display a confirmation page here
	        
	            return actions.payment.execute().then(function() {
	                // Show a success page to the buyer

	                pagar(data.returnUrl,1,total,proyectos);
	            	
	            });
	        }, onCancel: function(data, actions) {
	            // Show a cancel page or return to cart
	        	BootstrapDialog
				.alert('Algo no ha salido bien con el pago, por favor vuelve a intentarlo');
	        },onError: function(err) {
	        	BootstrapDialog
				.alert('Algo no ha salido bien con el pago, la causa más probable es que se haya perdido la sesión de paypal. Por favor, reinténtelo de nuevo. Si el error persiste, por favor, refresque la página y vuelva a intentarlo.');
	        }

	    }, '#paypal-button199');
	   
	     