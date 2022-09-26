var nextPaso=0; 
var nombreImgAntigua = "";

function getObjectFromCanvasByVis() {
    const canvasObject = canvas.getObjects().filter((item) => {
        return item.left < parseInt(80000) && item.visible === true
    })
    return canvasObject
}

function saveImageServerCanvas() {
	
	// DESACTIVAMOS TODOS LOS ITEMS (LOS DESCOLOCA SI HAY ALGUNO SELECCIONADO)
	canvas.deactivateAll().renderAll();
	
	// OBTENEMOS LOS ITEMS VISIBLES Y ESTÁN EN POSICIÓN LEFT < 80000 Y QUE HAY QUE PINTAR EN EL NUEVO CANVAS
	var items=getObjectFromCanvasByVis();
	
	// SELECCIONAMOS EL GRUPO DE ARTÍCULOS QUE SON 
	var group = new fabric.Group(items, {
		originX:'center',
		originY:'center'
	})
	canvas._activeObject = null;
	canvas.setActiveGroup(group.setCoords()).renderAll();  
	
	// DESDE CONTROLER CUANDO SELECCIONAMOS UN GRUPO SE AÑADE EN ACTIVEOBJ
	var acoord=activeObj.aCoords; 
	var bl= acoord.bl.x + acoord.bl.y;
	var br= acoord.br.x + acoord.br.y;
	var tl= acoord.tl.x + acoord.tl.y;
	var tr= acoord.tr.x + acoord.tr.y;
	comparador=0;
	if(bl>comparador) {
		comparador=bl;
	}
	if(br>comparador){
		comparador=br;
	}
	if(tl>comparador){
		comparador=tl;
	}
	if(tr>comparador){
		comparador=tr;
	}
	if(comparador==bl){
		var x=acoord.bl.x+20;
		var y=acoord.bl.y+20;
	} else if(comparador==br){
		var x=acoord.br.x+20;
		var y=acoord.br.y+20;
	} else if(comparador==tl){
		var x=acoord.tl.x+20;
		var y=acoord.tl.y+20;
	} else if(comparador==tr){
		var x=acoord.tr.x+20;
		var y=acoord.tr.y+20;
	}
	

	
	comparador2=100000;
	if(bl<comparador2) {
		comparador2=bl;
	}
	if(br<comparador2){
		comparador2=br;
	}
	if(tl<comparador2){
		comparador2=tl;
	}
	if(tr<comparador2){
		comparador2=tr;
	}
	if(comparador2==bl){
		var minLeftFinal1=acoord.bl.x;
		var minTopFinal1=acoord.bl.y;
	} else if(comparador2==br){
		var minLeftFinal1=acoord.br.x;
		var minTopFinal1=acoord.br.y;
	} else if(comparador2==tl){
		var minLeftFinal1=acoord.tl.x;
		var minTopFinal1=acoord.tl.y;
	} else if(comparador2==tr){
		var minLeftFinal1=acoord.tr.x;
		var minTopFinal1=acoord.tr.y;
	}
	 
	
	// lista de items del canvas
	arrayDeObjcts=canvas.toDatalessJSON(['title','tags','price','url','id']);
	var json = JSON.stringify(arrayDeObjcts); 

	canvas.deactivateAll().renderAll();
	// declaro variables que utilizo
	anchoCanvasFinal=0;
	altoCanvasFinal=0;
	var left=0;
	var width=0;
	
 
	
	// Ancho y alto más pequeños menos 50, el 50 es para tener en cuenta que pasaria si los items no tienen ese minimo de borde
	restar11=minTopFinal1-20;
	restar111=minLeftFinal1-20;
	
	// Si el minimo alto es mayor que cero el altoDelCanvas será
    if(restar11>0){
		altoCanvasFinal=y-restar11;
	} else if(restar11>-20){
		altoCanvasFinal=y+(-1*restar11);
	} else { 
		altoCanvasFinal=y+(-1*restar11);
	}
    // Si el minimo ancho es mayor que cero no se le suma nada
	if(restar111>0){
		anchoCanvasFinal=x-restar111;
	} else if(restar111>-20){
		anchoCanvasFinal=x+(-1*restar111);
	} else {
		anchoCanvasFinal=x+(-1*restar111);
	}
	
	// Calculamos ancho del canvas (el canvas se tiene que ajustar en un div con ancho fijo y height auto)
	anchoPantalla="1500";
	
	// Calculamos el valor que se necesita aplicar a zoomit, a partir del ancho del html y el ancho real del canvas
    var valor=anchoPantalla/anchoCanvasFinal;
    altoCanvasFinalImg=(altoCanvasFinal*valor);
     
    // Recorremos todos los objetos y los desplazamos hasta que quede un margen de 50 a la izquierda y margen de 50 arriba
	for(i=0;i<arrayDeObjcts.objects.length;i++){ 
		topObj=arrayDeObjcts.objects[i].top;
		leftObj=arrayDeObjcts.objects[i].left;
		
		arrayDeObjcts.objects[i].left=leftObj-restar111;
		arrayDeObjcts.objects[i].top=topObj-restar11;
	}
	// añadimos este array de objetos en un json
	canvas111.renderAll();  
	json = JSON.stringify(arrayDeObjcts);
	// aplicamos el valor de json un zoomIt
	function loadJSON(callback){
		if (json!=null){
		    canvas111.loadFromJSON(json, function(){
		    
		    	zoomIt(canvas111,valor);
		    	canvas111.renderAll();
				callback();
		    });
		}
		
		// le añado el -15 porque el canvas con respecto al contenedor tiene esa diferencia
	    $('#canvas111').attr("width", anchoPantalla);
		$('#canvas111').attr("height", altoCanvasFinalImg);  
		
	    $('#canvas111').css("height", "auto");
	    $('#canvas111').css("width", "1500"); 
	    
	  	var ctx111=canvas111.getContext("2d");
	  	
	  	//canvas111.scale(0.01, 0.01);
	    
	  	canvas111.calcOffset();
		
		
		canvas111.forEachObject(function(o){ o.hasBorders = o.hasControls = false; });
		canvas111.renderAll();
		  
		canvas111.backgroundColor="white";
		canvas111.renderAll();
	}
	 
	
	loadJSON(cargarImagen);
	function cargarImagen() {
		var canvasServer = document.getElementById("canvas111");
		var imageDataURL = canvasServer.toDataURL({format:'image/png',quality: 1.0});
		if(nuevo_id_lista=="0"){
			nombreImgAntigua = $("#nombreImgLdlc").val();
		} else {
			nombreImgAntigua = nuevo_id_lista;
		}
		var ajax = new XMLHttpRequest();
		try {
			
			$.ajaxSetup({
				scriptCharset : "utf-8",
				contentType : "application/upload"
			});
	
			$.ajax({
				type : "POST",
				// dataType: "json",
				// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
				url : urlbaseForAjax + '/UploadServletLdlcImg',
				// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',
				data : imageDataURL,
				// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
				contentType : "application/upload",
				success : function(data) {  
					if(nuevo_id_lista=="0"){
						$("#nombreImgLdlc").val(data); 
					} else {
						$("#nombreImgLdlc").val(data); 
						nombreImgAntigua = nuevo_id_lista;
					}
					
										
					// SI SUBÍO LA NUEVA, ELIMINAMOS LA ANTIGUA 

					if(nombreImgAntigua=="null"){
						nextPaso=1;
					}else {
						delImg();
					}
				},         
		        error : function(xhr, status) {  
					nextPaso=2;
		        },  
		        complete : function(xhr, status) {  
		        }
			});
	
		} catch (e) {
			nextPaso=2;
			console.log('Se ha producido un error en la conexión con el servidor');
			// put any code you want to execute if there's an exception here 
		}
	
	} 

	  
	 
}
function delImg(){ 
	var user = getCookie("userAssistantD"); 
	var ruta = "ldlc/imagenes/"+nombreImgAntigua;
 

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
				ruta :ruta,
				fichero : nombreImgAntigua
			},
			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
			contentType : "application/json; charset=utf-8",
			success : function(data) {
				nextPaso=1;
			}
		});

	} catch (e) {
		BootstrapDialog
				.alert('Se ha producido un error en la conexión con el servidor');
		// put any code you want to execute if there's an exception here
		nextPaso=1;

	}
  	 
}
