function getActiveStyle(styleName, object) {
  object = object || canvas.getActiveObject();
  if (!object) return '';

  return (object.getSelectionStyles && object.isEditing)
    ? (object.getSelectionStyles()[styleName] || '')
    : (object[styleName] || '');
};

function setActiveStyle(styleName, value, object) {
  object = object || canvas.getActiveObject();
  if (!object) return;

  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
    object.setCoords();
  }
  else {
    object.set(styleName, value);
  }

  object.setCoords();
  canvas.renderAll();
};

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';

  return object[name] || '';
}

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;
  object.set(name, value).setCoords();
  canvas.renderAll();
}

/*
function addAccessors($scope) {
  var consoleJSONValue = ('');
}
*/

function openLoadFileClick(elemId) {
	   var elem = document.getElementById(elemId);
	   
	   if(elem && document.createEvent ) {
	      //evt = document.createEvent("MouseEvents");
	      //evt.initEvent("click", true, false);
		   var event = new MouseEvent('click', {
			    'cancelable': true
			  });
	      
	      elem.dispatchEvent(event);
	   }
}

function rasterize (){
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
        window.open(canvas.toDataURL('png'));
    }
}


function openAddTextModal(){
	$('#modal-add-text').modal();
}

function insertText(){
	var text = document.getElementById('textarea-text').value;
	var fontFamily = document.getElementById('font-family').value;
	var textAlign = document.getElementById('text-align').value;
	var textBgColor = document.getElementById('text-lines-bg-color').value;
	var fontSize = document.getElementById('text-font-size').value;
	var lineHeight = document.getElementById('text-line-height').value;
	var charSpacing = document.getElementById('text-char-spacing').value;
	
	
	var thetext = new fabric.IText(text, {
	      left: 100,
	      top: 150,
	      fontFamily: fontFamily,
	      fill: '#333',
	      textBackgroundColor:textBgColor,
	      fontSize: fontSize,
	      lineHeight: lineHeight,
	      charSpacing: charSpacing

	    });
	
	canvas.add(thetext);
}

function exportImage(){
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      }
      else {
        fabric.Image.fromURL(output_canvas.toDataURL(), function(img) {
              canvas.add(img);
              img.bringToFront();
              canvas.renderAll();
              state.recompute = true;
          });
      }
}

function download(canvas) {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {

    	window.open(document.getElementById('output_canvas').toDataURL('png'));
    }
  };


function rasterizeJSON(){
    consoleJSONValue = value;
}

function confirmClear() {
    if (confirm('Are you sure?')) {
        canvas.clear();
    }
}

function removeSelected (){
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();

    if (activeGroup) {
        var objectsInGroup = activeGroup.getObjects();
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function(object) {
            canvas.remove(object);
        });
    }
    else if (activeObject) {
        canvas.remove(activeObject);
    }
    //actualizo precio y json hidden
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','id']));
    console.log(json);
    document.getElementById('json').value = json;
	canvas.renderAll();
}

function saveJSON() {
    //consoleJSONValue = document.canvas.value;
    canvas.loadFromJSON(json, function(){
        canvas.renderAll();
    });
}

function loadJSON() {
    //document.canvas.value = consoleJSONValue;
    //document.getElementById('canvas').value = consoleJSONValue;
    json = JSON.stringify(canvas);
    document.getElementById('json-console').value = json;
    canvas.renderAll();

}

function loadJSON(elementvalue) {
   
    canvas.clear();
    canvas.loadFromJSON(elementvalue);
    canvas.renderAll();

}



function zoomMore() {
    var factor=1.3;
    canvas.setZoom(factor);

    //¿scroll?
    //canvas.setWidth(originalWidth * canvas.getZoom());
    //canvas.setHeight(originalHeight * canvas.getZoom());
}

function zoomLess() {
    var factor=0.7;
    canvas.setZoom(factor);
}

function showRemoveTools(id){

    style = getComputedStyle(document.getElementById(id));
    if(style.display =='block'){
        document.getElementById(id).className = 'ocultar';
    }else{
        document.getElementById(id).className = 'mostrar toolscontainer-all';
    }
}

function flipv() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.getActiveObject().toggle('flipY');
        canvas.renderAll();
    }
}

function fliph() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.getActiveObject().toggle('flipX');
        canvas.renderAll();
    }
}

function clone() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5);
        canvas.add(object);
    }
    
    //actualizo precio y json hidden
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','id']));
    document.getElementById('json').value = json;
	canvas.renderAll();
}
/*
$scope.sendBackwards = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendBackwards(activeObject);
    }
};

$scope.sendToBack = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendToBack(activeObject);
    }
};
*/
function sendToFordward() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringForward(activeObject);
    }
}

function sendToBack() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendToBack(activeObject);
    }

}

function undo() {
	nextJSONState = JSON.stringify(canvas.toDatalessJSON(['title','tags','price']));
	console.log('undo'  );
	canvas.loadFromJSON(lastJSONState[1], function(){
		canvas.renderAll();
	});
}

function redo() {
	console.log('redo:');
	canvas.loadFromJSON(lastJSONState[0], function(){
		canvas.renderAll();
	});
}

function totalFromCanvas() {
    json =  canvas.toJSON(['price']);
    
    total_lista = 0;
	var imgSrcArray = json.objects.map(function(objects){ return objects['price'] });
	
	var error = false;
	for(var i=0; i < imgSrcArray.length; i++){
		if (imgSrcArray[i]!=null && imgSrcArray[i] >0){//si tenemos ese dato, sino error
	    	   var price = imgSrcArray[i];
			   total_lista = total_lista + parseInt(price);
	    	   //console.log("price: ", price);  
	    	   //console.log("total_lista: ", total_lista); 
		}else{
			error=true;
		}
	}
	
	document.getElementById("total_lista_precio").innerHTML = total_lista;
	
	if (error){
		console.log("totalFromCanvas(): No se ha podido calcular el precio total. Alguno de los items no tiene precio definido");
	}

}


function addImage(imageName, imageTitle, imageTags, imagePrice,item_id, minScale, maxScale) {
    //var coord = getRandomLeftTop();
    
    var title = imageTitle;
    var tags = imageTags;
    var price = imagePrice;
    var id = item_id;
    fabric.Image.fromURL( imageName, function(image) {
        image.set({
	    	id:id,
        	title: title,
            tags: tags,
            price: price,
            left: 200,
            top: 200,
            angle: 1
        })
        .scale(1)
        .setCoords();

       
        canvas.add(image);
    });
    
    total_lista=total_lista+imagePrice;
    document.getElementById("total_lista_precio").innerHTML = total_lista.toFixed(2);



};


function showItemInfo(image_path, image_title, image_tags, image_price,image_id){

	if (image_tags.substr(image_tags.length - 1)==","){
			image_tags = image_tags.substring(0, image_tags.length - 1);
	}
	
	document.getElementById('show-item-imageid').src= image_path;
	document.getElementById('show-item-titulo').innerHTML = image_title;
	document.getElementById('show-item-etiquetas').innerHTML = image_tags;
	document.getElementById('show-item-precio').innerHTML = image_price + " &euro;";
	document.getElementById('show-item-add-button').onclick = function() { 
        addImage(image_path, image_title, image_tags, image_price, image_id,1,1);
    };
	
	$('#modal-info-item').modal();
	
}


//pager
function genPager(element_id,items_container,obj){ 
	//console.log('genPager: '+ element_id+" "+items_container);
	document.getElementsByClassName("ul_pager").remove();
	var max= calcularMaxItems();
	var numero_paginas=Math.ceil((obj.length/max));
	

	var max_numbers=3;
	
    var row = document.createElement("ul"); 
    row.className="ul_pager";
    
    var back = document.createElement("img");
    back.src='img/back.png';
    var next = document.createElement("img");
    next.src='img/next.png';
    
    var puntos = document.createElement("div");
    puntos.innerHTML="...";

    
    if (numero_paginas>1){
    	//flecha atrás
    	var row_b = document.createElement("li"); 
    	back.id="back_arrow";
    	row_b.appendChild(back);
        row.appendChild(row_b);
        
        if(numero_paginas<=max_numbers){
        	document.getElementsByClassName("li_pager_number").remove();
            //números de página
            for (c = 1; c <= numero_paginas; c++){
            	
    	        var row2 = document.createElement("li"); 
    	        row2.className="li_pager_number";
    	        row.appendChild(row2);
    	        
    	        var row3 = document.createElement("a"); 
    	        row3.id = "page_"+c;
    	        var linkText = document.createTextNode(c);
    	        row3.appendChild(linkText);
    	        row2.appendChild(row3);

    	        document.getElementById(element_id).appendChild(row);

    	        (function(element_id,id,obj,value){
    	        	document.getElementById(row3.id).addEventListener("click", function() {
    	        		//console.log("element_id: "+element_id+", id: "+id+", obj: "+obj+", value: "+value);
    	        		mostrarItemsPagina(id,obj,value);
    	        		genPager(element_id,id,obj);
    	            }, false);})(element_id,items_container,obj,c);
            }
        	
        }else{
        	document.getElementsByClassName("li_pager_number").remove();
        	if(active_page<=max_numbers){ //1 2 3 4 5 ...
                for (c = 1; c <= max_numbers; c++){
                	
        	        var row2 = document.createElement("li"); 
        	        row2.className="li_pager_number";
        	        row.appendChild(row2);
        	        
        	        var row3 = document.createElement("a"); 
        	        row3.id = "page_"+c;
        	        var linkText = document.createTextNode(c);
        	        row3.appendChild(linkText);
        	        row2.appendChild(row3);

        	        document.getElementById(element_id).appendChild(row);

        	        (function(element_id,id,obj,value){
        	        	document.getElementById(row3.id).addEventListener("click", function() {
        	        		mostrarItemsPagina(id,obj,value);
        	        		genPager(element_id,id,obj);
        	            }, false);})(element_id,items_container,obj,c);
        	        
                }
    	        //...
    	    	var row_n = document.createElement("li"); 
    	    	row_n.appendChild(puntos);
    	    	row_n.id = "p_a_2";
    	        row.appendChild(row_n);
    	        
        	}else{//..3 4 5 6 7 ... (active_page = 7)
    	    	var row_n = document.createElement("li"); 
    	    	row_n.appendChild(puntos);
    	    	row_n.id = "p_b_3";
    	        row.appendChild(row_n);
    	        
    	        
                for (c = active_page-max_numbers+1; c <= active_page; c++){
                	
        	        var row2 = document.createElement("li"); 
        	        row2.className="li_pager_number";
        	        row.appendChild(row2);
        	        
        	        var row3 = document.createElement("a"); 
        	        row3.id = "page_"+c;
        	        var linkText = document.createTextNode(c);
        	        row3.appendChild(linkText);
        	        row2.appendChild(row3);

        	        document.getElementById(element_id).appendChild(row);

        	        (function(element_id,id,obj,value){
        	        	document.getElementById(row3.id).addEventListener("click", function() {
        	        		mostrarItemsPagina(id,obj,value);
        	        		genPager(element_id,id,obj);
        	            }, false);})(element_id,items_container,obj,c);
                }
    	        //...
    	    	var row_n = document.createElement("li"); 
    	    	row_n.appendChild(puntos);
    	    	row_n.id = "p_a_3";
    	        row.appendChild(row_n);
        	}

        }
        

        
        //flecha adelante
    	var row_n = document.createElement("li"); 
    	next.id="next_arrow";
    	row_n.appendChild(next);
        row.appendChild(row_n);
        
        (function(element_id,items_container,obj){
        	document.getElementById('back_arrow').addEventListener("click", function() {
        		backPage(items_container,obj);
        		genPager(element_id,items_container,obj);
            }, false);})(element_id,items_container,obj);
        
        (function(element_id,items_container,obj){
        	document.getElementById('next_arrow').addEventListener("click", function() {
        		nextPage(items_container,obj);
        		genPager(element_id,items_container,obj);
            }, false);})(element_id,items_container,obj);
        

    }
    
}

	
	
function genDivItem(element_id,image_id, image_path, image_title, image_tags, image_price){ 
	//console.log("genDivItem:"+ element_id+" "+image_id+" "+ image_path+" "+ image_title+" "+ image_tags+" "+ image_price);
    var row = document.createElement("div"); 
    row.id = 'picker-img-'+image_id;
    row.className = "clipper_image _83"; 
    
    var row2 = document.createElement("div"); 
    row2.className = "image_wrapper"; 
    row.appendChild(row2);
    
    var row3 = document.createElement("div"); 
    row3.className = "image_background"; 
    row2.appendChild(row3);
    
    var row4 = document.createElement("img"); 
    row4.className = "clipper_image"; 
    row4.id='img'+image_id;
    row4.src=image_path;
    row4.setAttribute('draggable', true);
    row3.appendChild(row4);

    document.getElementById(element_id).appendChild(row);
    
  
    document.getElementById('img'+image_id).onclick = function() { 
									        showItemInfo(image_path, image_title, image_tags, image_price, image_id);
								        };
					        
    document.getElementById('img'+image_id).onmousedown = function(){
    	updateVars(image_path, image_title, image_tags, image_price, image_id);
    };
   
    document.getElementById('img'+image_id).addEventListener('dragstart', handleDragStart, false);
    document.getElementById('img'+image_id).addEventListener('dragend', handleDragEnd, false);
	}


function calcularMaxItems(){
	var salida = 0;
	
	var w_height = $(window).height(); 
	var w_width = $(window).width();
	var container_height = Math.round((78*w_height)/100); 
	var container_width = w_width * 0.35;
	var pager_height = 55;
	
	//console.log("Dimensines container: " + container_width+"x"+container_height);
	
	var items_horizontal=1;
	if(container_width >300){ items_horizontal=2; }
	if(container_width >450){ items_horizontal=3; }
	if(container_width >600){ items_horizontal=4; }
	if(container_width >750){ items_horizontal=5; }
	if(container_width >900){ items_horizontal=6; }
	if(container_width >1050){ items_horizontal=7; }
	
	
	var items_vertical=1;
	if(container_height >(300 + pager_height)){ items_vertical=2; document.getElementById("available_images").setAttribute("style","height:"+(338)+"px");}
	if(container_height >(450 + pager_height)){ items_vertical=3; document.getElementById("available_images").setAttribute("style","height:"+(488)+"px");}
	if(container_height >(600 + pager_height)){ items_vertical=4; document.getElementById("available_images").setAttribute("style","height:"+(638)+"px");}
	if(container_height >(750 + pager_height)){ items_vertical=5; document.getElementById("available_images").setAttribute("style","height:"+(788)+"px");}
	if(container_height >(900 + pager_height)){ items_vertical=6; document.getElementById("available_images").setAttribute("style","height:"+(938)+"px");}
	if(container_height >(1050 + pager_height)){ items_vertical=7; document.getElementById("available_images").setAttribute("style","height:"+(1088)+"px");}
	
	
	if(container_height >(300 + pager_height)){ items_vertical=2; document.getElementById("available_images2").setAttribute("style","height:"+(338)+"px");}
	if(container_height >(450 + pager_height)){ items_vertical=3; document.getElementById("available_images2").setAttribute("style","height:"+(488)+"px");}
	if(container_height >(600 + pager_height)){ items_vertical=4; document.getElementById("available_images2").setAttribute("style","height:"+(638)+"px");}
	if(container_height >(750 + pager_height)){ items_vertical=5; document.getElementById("available_images2").setAttribute("style","height:"+(788)+"px");}
	if(container_height >(900 + pager_height)){ items_vertical=6; document.getElementById("available_images2").setAttribute("style","height:"+(938)+"px");}
	if(container_height >(1050 + pager_height)){ items_vertical=7; document.getElementById("available_images2").setAttribute("style","height:"+(1088)+"px");}
	
	
	
	salida = items_horizontal*items_vertical;
	//console.log("N Items: " + salida);
	
	return salida;
}


function mostrarItemsPagina(element_id,obj,active_page){
	document.getElementsByClassName("clipper_image").remove();
	var max= calcularMaxItems();
	
	var start = 1;
	var end = obj.length;
	
	start = (active_page * max)-max;
	end = (active_page * max) -1;
	
	if (end>obj.length){
		end = obj.length-1;
	}
	
	//console.log("active page: "+active_page+", start: "+start+", end:"+end);
	
	for (i = start; i <= end; i++){
		genDivItem(element_id,obj[i]['id'],obj[i]['path'], obj[i]['titulo'], obj[i]['etiquetas'], obj[i]['precio']);
	}
	
}


function backPage(element_id,obj){
	active_page=active_page-1;
	if (active_page<1){
		active_page =1;
	}
	//console.log('back, active_page: '+ active_page);
	mostrarItemsPagina(element_id,obj,active_page);
}

function nextPage(element_id,obj){
	var max= calcularMaxItems();
	var numero_paginas=Math.ceil((obj.length/max));
	active_page=active_page+1;
	if (active_page>numero_paginas){
		active_page =numero_paginas;
	}
	//console.log('next, active_page: '+ active_page);
	mostrarItemsPagina(element_id,obj,active_page);
}

function cargarItems(page){
	var max = calcularMaxItems();
	
}


//end pager
function mostrarFlechasTodos(){
	if (mobiliario.length<=max_iconos){
		document.getElementById('mobiliario-left-arrow-container').className = 'ocultar';
		document.getElementById('mobiliario-right-arrow-container').className = 'ocultar';
		document.getElementById('mobiliario-container').setAttribute("style","margin-left: 5%");
	}
	if (complementos.length<=max_iconos){
		document.getElementById('complementos-left-arrow-container').className = 'ocultar';
		document.getElementById('complementos-right-arrow-container').className = 'ocultar';
		document.getElementById('complementos-container').setAttribute("style","margin-left: 5%");
	}
	if (extras.length<=max_iconos){
		document.getElementById('extras-left-arrow-container').className = 'ocultar';
		document.getElementById('extras-right-arrow-container').className = 'ocultar';
		document.getElementById('extras-container').setAttribute("style","margin-left: 5%");
	}
}

function anteriorMobiliario(){
	if (primer_elemento_mobiliario>0){
		document.getElementById('icono-mobiliario'+(primer_elemento_mobiliario+4)).className = 'cuadro-icono ocultar';
		document.getElementById('icono-mobiliario'+(primer_elemento_mobiliario-1)).className = ' cuadro-icono';
		primer_elemento_mobiliario = primer_elemento_mobiliario-1;
	}
}

function siguienteMobiliario(){
	if ((primer_elemento_mobiliario+5)<mobiliario.length){
		document.getElementById('icono-mobiliario'+primer_elemento_mobiliario).className = 'cuadro-icono ocultar';
		document.getElementById('icono-mobiliario'+(primer_elemento_mobiliario+5)).className = ' cuadro-icono';
		primer_elemento_mobiliario = primer_elemento_mobiliario+1;
	}
}

function anteriorComplementos(){
	if (primer_elemento_complementos>0){
		document.getElementById('icono-complementos'+(primer_elemento_complementos+4)).className = 'cuadro-icono ocultar';
		document.getElementById('icono-complementos'+(primer_elemento_complementos-1)).className = ' cuadro-icono';
		primer_elemento_complementos = primer_elemento_complementos-1;
	}
}

function siguienteComplementos(){
	if ((primer_elemento_complementos+5)<complementos.length){
		document.getElementById('icono-complementos'+primer_elemento_complementos).className = 'cuadro-icono ocultar';
		document.getElementById('icono-complementos'+(primer_elemento_complementos+5)).className = ' cuadro-icono';
		primer_elemento_complementos = primer_elemento_complementos+1;
	}
}

function anteriorExtras(){
	if (primer_elemento_extras>0){
		document.getElementById('icono-extras'+(primer_elemento_extras+4)).className = 'cuadro-icono ocultar';
		document.getElementById('icono-extras'+(primer_elemento_extras-1)).className = ' cuadro-icono';
		primer_elemento_extras = primer_elemento_extras-1;
	}
}

function siguienteExtras(){
	if ((primer_elemento_extras+5)<extras.length){
		document.getElementById('icono-extras'+primer_elemento_extras).className = 'cuadro-icono ocultar';
		document.getElementById('icono-extras'+(primer_elemento_extras+5)).className = ' cuadro-icono';
		primer_elemento_extras = primer_elemento_extras+1;
	}
}

function addImageToCustomCanvas(custom_canvas,imageName, imagePrice, minScale, maxScale) {
    var price = imagePrice;
    fabric.Image.fromURL( imageName, function(image) {
        image.set({
            price: price,
            left: 0,
            top: 0,
            angle: 1
        })
        .scale(1)
        .setCoords();

        image.scaleToHeight(custom_canvas.getHeight());
        image.setAttribute('crossOrigin', '');
        custom_canvas.add(image);
    });
    
    //total_lista=total_lista+imagePrice;
    //document.getElementById("total_lista_precio").innerHTML = total_lista;
};


//fondos
var imagen_sin_fondo={
		'titulo':null,
		'etiquetas':null,
		'precio':null,
		'url':null
}



function removeBackground(){
	console.log("removeBackground");
	input_canvas.clear();
	output_canvas.clear();
	canvas.renderAll();
	var activeObject = canvas.getActiveObject();
	
	//activeObject.crossOrigin = "Anonymous";
	//console.log("url: "+activeObject.get("src"));
	
	
	var url_image = activeObject.get("src");
	
	//console.log("url en removeBackground: "+url_image);
	addImageToCustomCanvas(input_canvas,url_image,1,1);
	//var input_activeObject = input_canvas.getActiveObject();
	//input_activeObject.hasBorders = false;
	//input_activeObject.hasControls = false;
	
	input_canvas.getObjects().map(function(o) {
		  o.hasBorders = false;
		  o.hasControls = false;
	});
	
	
	imagen_sin_fondo.titulo=activeObject.get("title");
	imagen_sin_fondo.etiquetas=activeObject.get("tags");
	imagen_sin_fondo.precio=activeObject.get("price");
	imagen_sin_fondo.url=activeObject.get("src");

}


function guardarSinFondo(){

	document.getElementById('imageData_Fondos').value = document.getElementById('output_canvas').toDataURL('image/png');
	document.getElementById('itemtitulo_Fondos').value = imagen_sin_fondo.titulo;
	document.getElementById('itemetiquetas_Fondos').value = imagen_sin_fondo.etiquetas;
	document.getElementById('itemprecio_Fondos').value = imagen_sin_fondo.precio;
	document.getElementById('itemurl_Fondos').value = imagen_sin_fondo.url;

	
	console.log(document.getElementById('imageData_Fondos').value);
	console.log(document.getElementById('itemtitulo_Fondos').value);
	console.log(document.getElementById('itemetiquetas_Fondos').value);
	console.log(document.getElementById('itemprecio_Fondos').value);
	console.log(document.getElementById('itemurl_Fondos').value);
	console.log(document.getElementById('item_decorador_id_Fondos').value);
	console.log(document.getElementById('item_id_proyecto_Fondos').value);
	console.log(document.getElementById('item_id_ldlc_Fondos').value);
	
	
	document.getElementById('senditemfromfondos').submit();
}



var delta_top = 0;
var delta_left = 0;

mover_cursor = function(options) {yax.css({'top': options.e.y + delta_top,'left': options.e.x + delta_left});};

function setFreeDrawingMode(value,mode){
	input_canvas.isDrawingMode = !!value;
	input_canvas.freeDrawingBrush.color = mode == 1 ? 'green': 'red';
	yax = $('#yaxis');
    if (value && mode == 1){
        console.log ("Drawing foreground, click segment to update results.");
    }else if(value){
    	console.log ( "Drawing background, click segment to update results.");
    }
    if(input_canvas.isDrawingMode){
        yax.show();
        input_canvas.on('mouse:move',mover_cursor);
    }
   else{
        yax.hide();
        input_canvas.off('mouse:move',mover_cursor);
    }
    input_canvas.freeDrawingBrush.width = 5;
    current_mode = mode;
    input_canvas.deactivateAll().renderAll();

}

function getFreeDrawingMode(mode) {
    if (mode){
      return input_canvas.isDrawingMode == false || mode != current_mode ? false : true;
    }
    else{
        return input_canvas.isDrawingMode
    }

}

function drawBackground(){
	setFreeDrawingMode(2,2);
}

function drawForeground(){
	setFreeDrawingMode(1,1);
}

function labelUnknown(){
    var segments = state.results.segments;
    if(!state.results.background.length||!state.results.background.length ) {
        console.log("Please mark both Background and Foreground");
        _.each(state.results.unknown,function(k){segments[k].foreground = true});
        return
    }
    for(var index = 0; index < state.results.unknown.length; index++) {

        seg = segments[state.results.unknown[index]];
        seg.foreground = true;
        var fgList = _.map(state.results.foreground,function(e){
            return seg.edges[e] * (Math.abs(segments[e].mp[0] - seg.mp[0])
                + Math.abs(segments[e].mp[1] - seg.mp[1])
                + Math.abs(segments[e].mp[2] - seg.mp[2]))});
        var bgList = _.map(state.results.background,function(e){
            return seg.edges[e] * (Math.abs(segments[e].mp[0] - seg.mp[0])
                + Math.abs(segments[e].mp[1] - seg.mp[1])
                + Math.abs(segments[e].mp[2] - seg.mp[2]))});
        var fgDist = Math.min.apply(null, fgList); // _.reduce(fgList, function(memo, num){ return memo + num; }, 0) / fgList.length;
        var bgDist = Math.min.apply(null, bgList); //_.reduce(bgList, function(memo, num){ return memo + num; }, 0) / bgList.length;
        if (fgDist > bgDist){
            seg.foreground = false;
            seg.background = true
        }
        //console.log([state.results.unknown[index],seg.foreground,bgDist,fgDist,bgList.length,fgList.length].join())
    }
}


var callbackSegmentation  = function(results){
    results.segments = {};

    var w = width,
        h = height;
        l = results.indexMap.length;
    for (var i = 0; i < l; ++i) {
        var current = results.indexMap[i];
        if (!results.segments.hasOwnProperty(current))
        {
            results.segments[current] = {
                'min_pixel':i,
                'max_pixel':i,
                'min_x':w+1,
                'min_y':h+1,
                'max_x':-1,
                'max_y':-1,
                'mask':{'b':0,'f':0},
                'count':0,
                'mp':[0,0,0],
                'hred': new Uint32Array(256),
                'hgreen':new Uint32Array(256),
                'hblue':new Uint32Array(256)
                }
        }
        var y = Math.floor(i/w), x = (i % w);
        if (i != x + y*w)
        {
            console.log(["Error?",i,x + y*w])
        }
        results.segments[current].count += 1;
        results.segments[current].mp[0] += results.rgbData[4 * i];
        results.segments[current].mp[1] += results.rgbData[4 * i + 1];
        results.segments[current].mp[2] += results.rgbData[4 * i + 2];
        results.segments[current].hred[results.rgbData[4 * i]] += 1;
        results.segments[current].hgreen[results.rgbData[4 * i + 1]] += 1;
        results.segments[current].hblue[results.rgbData[4 * i + 2]] += 1;
        results.segments[current].max_pixel = i;
        if (x > results.segments[current].max_x){
            results.segments[current].max_x = x
        }
        if (x < results.segments[current].min_x){
            results.segments[current].min_x = x
        }
        if (y > results.segments[current].max_y){
            results.segments[current].max_y = y
        }
        if (y < results.segments[current].min_y){
            results.segments[current].min_y = y
        }
    }
    for(var s in results.segments){
        results.segments[s].mp[0] =  results.segments[s].mp[0] /results.segments[s].count;
        results.segments[s].mp[1] =  results.segments[s].mp[1] /results.segments[s].count;
        results.segments[s].mp[2] =  results.segments[s].mp[2] /results.segments[s].count;
        results.segments[s].edges = {};
        for(var k in results.segments){
            if (s != k){
                results.segments[s].edges[k] = 1.0;
                //    0.5 * (Math.abs(results.segments[s].min_x - results.segments[k].min_x) +
                //Math.abs(results.segments[s].min_y - results.segments[k].min_y) +
                //Math.abs(results.segments[s].max_x - results.segments[k].max_x) +
                //Math.abs(results.segments[s].max_y - results.segments[k].max_y))
            }
        }
    }
    state.results = results;
};

state = {
        'images':[],
        'masks_present':false,
        'recompute':true,
        'results':{},
        canvas_data:null,
        mask_data:null,
        'options':{
            'pf':null,
            'slic':null
        }
    }


function updateClusters(){
    var mask = state.mask_data.data,
        segments = state.results.segments,
        indexMap = state.results.indexMap;
    state.results.unknown = [];
    state.results.mixed = [];
    state.results.foreground = [];
    state.results.background = [];
    for(var s in segments) {
        seg = segments[s];
        seg.mask = { 'f':0,'b':0};
        seg.foreground = false;
        seg.background = false;
        seg.unknown = false;
        seg.mixed = false;
    }

    for (var i = 0; i < indexMap.length; ++i) {
        var value = indexMap[i];
            if (mask[4 * i + 0] == 0 && mask[4 * i + 1] == 128)
            {
                segments[value].mask.f++;
            }
            if (mask[4 * i + 0] > 0 && mask[4 * i + 1] == 0)
            {
                segments[value].mask.b++;
            }
    }
    for(var s in segments){
        seg = segments[s];
        if (seg.mask.f > 0 && seg.mask.b == 0){
            seg.foreground = true;
            seg.background = false;
            seg.unknown = false;
            seg.mixed = false;
            state.results.foreground.push(s)
        }
        else if (seg.mask.b > 0 && seg.mask.f == 0){
            seg.foreground = false;
            seg.background = true;
            seg.unknown = false;
            seg.mixed = false;
            state.results.background.push(s)
        }
        else if (seg.mask.b > 0 && seg.mask.f > 0){
            seg.foreground = false;
            seg.background = false;
            seg.unknown = false;
            seg.mixed = true;
            state.results.mixed.push(s)
        }
        else{
            seg.unknown = true;
            state.results.unknown.push(s)
        }
    }
    labelUnknown();
}



function renderResults(){
    var results = state.results;
    var context = output_canvas.getContext('2d');
    var imageData = context.createImageData(300, 400);//= context.createImageData(output_canvas.getWidth(), output_canvas.getHeight());
    var data = imageData.data;
    for (var i = 0; i < results.indexMap.length; ++i) {
        if (results.segments[results.indexMap[i]].foreground)
        {
            data[4 * i + 0] = results.rgbData[4 * i + 0];
            data[4 * i + 1] = results.rgbData[4 * i + 1];
            data[4 * i + 2] = results.rgbData[4 * i + 2];
            data[4 * i + 3] = 255;
        }
        else{
            data[4 * i + 3] = 0;
        }
    }
    context.putImageData(imageData, 0, 0);
}


function refreshData(){
    if (state.recompute){
    	input_canvas.deactivateAll().renderAll();
    	input_canvas.forEachObject(function(obj){
            if (!obj.isType('image')){
                obj.opacity = 0;
            }
        });
    	input_canvas.renderAll();
        state.canvas_data = input_canvas.getContext('2d').getImageData(0, 0, input_canvas.height, input_canvas.width);
    }
    else{
        console.log("did not recompute")
    }
    input_canvas.forEachObject(function(obj){
        if (!obj.isType('image')){
            obj.opacity = 1.0;
        }
        else{
            obj.opacity = 0;
        }
    });
    input_canvas.renderAll();
    state.mask_data = input_canvas.getContext('2d').getImageData(0, 0, input_canvas.height, input_canvas.width);
    input_canvas.forEachObject(function(obj){
        if (obj.isType('image'))
        {
            obj.opacity = 1.0;
        }
        else{
            obj.opacity = 0.6;
        }
    });
    input_canvas.renderAll();
}

function check_movement(){
    // set image positions or check them

    state.recompute = true;

    input_canvas.forEachObject(function(obj){
        if (!obj.isType('image')){
            state.masks_present = true;
        }
    });
    old_positions_joined = state.images.join();
    state.images = [];
    input_canvas.forEachObject(function(obj){
        if (obj.isType('image')){
            state.images.push([obj.scaleX,obj.scaleY,obj.top,obj.left,obj.opacity])
        }
    });
    if(!state.recompute) // if recompute is true let it remain true.
    {
        state.recompute = state.images.join() != old_positions_joined;
    }
}

function segment(){
	//console.log( "segment()");
	
	/*
    slic_opt = function () {
        this.regionSize = 30;
        this.minSize = 20;
        };
	*/
	//console.log(ctx.getImageData(50, 50, 100, 100));
    setFreeDrawingMode(false,1);
    check_movement();
    
    if (state.masks_present) {
    	console.log( "Starting segementation");
        if(input_canvas.isDrawingMode){
        	input_canvas.isDrawingMode = false;
        	input_canvas.deactivateAll().renderAll();
        }
        //$scope.$$phase || $scope.$digest();
        refreshData();
        if (state.recompute)
        {
        	state.options.slic.callback = callbackSegmentation;
            SLICSegmentation(state.canvas_data, state.mask_data, state.options.slic);
            console.log("recomputing segmentation ");
            console.log(state.canvas_data);
            console.log(state.mask_data);
            console.log(state.options.slic);
        }
        else{
            console.log("Did not recompute, using previously computed superpixels.")
        }
        updateClusters();
        renderResults();
        console.log( "Segmentation completed");
        state.recompute = false;
    }else {
    	console.log("Please mark background and foreground !! ");
    }
}

function export_segment(){
	
}

function quitarFondo(){
	//var input_canvas = document.getElementById("input_canvas"),
	input_canvas.setActiveObject(canvas.item(0));
	var obja = input_canvas.getActiveObject();
	obja.hasBorders = false;
	obja.hasControls = false;
	input_canvas.deactivateAll().renderAll();
	
    var ctx1 = input_canvas.getContext("2d");

	var imgd = ctx1.getImageData(0, 0, input_canvas.getWidth(), input_canvas.getHeight()),
	    pix = imgd.data,
	    newColor = {r:255,g:255,b:255, a:1};
	
	for (var i = 0, n = pix.length; i <n; i += 4) {
	    var r = pix[i],
	            g = pix[i+1],
	            b = pix[i+2];
	
	        if(r >= 230 && g >= 230 && b >= 230){ 
	            // Change the white to the new color.
	            pix[i] = newColor.r;
	            pix[i+1] = newColor.g;
	            pix[i+2] = newColor.b;
	            pix[i+3] = newColor.a;
	        }
	}
	
	var ctx2 = output_canvas.getContext("2d");
	ctx2.putImageData(imgd, 0, 0);
}




function renderSuperpixels(){
    var results = state.results;
    var context = output_canvas.getContext('2d');
    var imageData = context.createImageData(output_canvas.getWidth(), output_canvas.getHeight());
    var data = imageData.data;
    var seg;
    for (var i = 0; i < results.indexMap.length; ++i) {
            seg = results.segments[results.indexMap[i]];
            data[4 * i + 3] = 255;
            if (results.indexMap[i]== results.indexMap[i+1]){  // Extremely naive pixel bondary
                data[4 * i + 0] = seg.mp[0];
                data[4 * i + 1] = seg.mp[1];
                data[4 * i + 2] = seg.mp[2];
            }
            else{
                data[4 * i + 0] = 0;
                data[4 * i + 1] = 0;
                data[4 * i + 2] = 0;
            }
    }
    context.putImageData(imageData, 0, 0);
}

function renderVieportBorders() {
    var ctx = input_canvas.getContext();
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(
      input_canvas.viewportTransform[4],
      input_canvas.viewportTransform[5],
      input_canvas.getWidth() * input_canvas.getZoom(),
      input_canvas.getHeight() * input_canvas.getZoom());
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
    		input_canvas.viewportTransform[4],
    		input_canvas.viewportTransform[5],
    		input_canvas.getWidth() * input_canvas.getZoom(),
    		input_canvas.getHeight() * input_canvas.getZoom());
    ctx.restore();
  }

function toCanvas(){
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      }
      else {
        fabric.Image.fromURL(output_canvas.toDataURL(), function(img) {
              canvas.add(img);
              img.bringToFront();
              canvas.renderAll();
              state.recompute = true;
          });
      }
}

function hideAllModals(){
	document.getElementById("modal-subir").style.display = 'none'; 
	document.getElementById("modal-nuevo").style.display = 'none'; 
	document.getElementById("modal-fondo").style.display = 'none'; 
	document.getElementById("modal-borradores").style.display = 'none'; 
	document.getElementById("modal-publicados").style.display = 'none'; 
	document.getElementById("modal-info-item").style.display = 'none'; 
	document.getElementById("modal-add-text").style.display = 'none'; 
	
	document.getElementById("revise-datos").style.display = 'none'; 
	
}

function show(modal_id){
	document.getElementById(modal_id).style.display = 'block';
}


function zoomIt(canvas_component, factor) {
	if (canvas_component.backgroundImage) {
	    // Need to scale background images as well
	    var bi = canvas_component.backgroundImage;
	    bi.width = bi.width * factor; bi.height = bi.height * factor;
	}
	var objects = canvas_component.getObjects();
	for (var i in objects) {
		objects[i].hasControls = false;
		objects[i].hasBorders = false;
	    var scaleX = objects[i].scaleX;
	    var scaleY = objects[i].scaleY;
	    var left = objects[i].left;
	    var top = objects[i].top;

	    var tempScaleX = scaleX * factor;
	    var tempScaleY = scaleY * factor;
	    var tempLeft = left * factor;
	    var tempTop = top * factor;

	    objects[i].scaleX = tempScaleX;
	    objects[i].scaleY = tempScaleY;
	    objects[i].left = tempLeft;
	    objects[i].top = tempTop;

	    objects[i].setCoords();
	}
	canvas_component.renderAll();
	canvas_component.calcOffset();
	canvas_component.hoverCursor = 'pointer'
}

$('#btncreateldlc').click(function() {
    $('form').submit();
});




 



//valida el formulario de subir items
function validateFormSendItem(){
	console.log("validateFormSendItem");
	var param_ok = true;
	
	document.getElementById("revise-datos").style.display = 'none'; 
	
	//nombre
	if (document.getElementById('itemtitulo').value.length<1 ){
		param_ok=false;
	}
	//etiquetas
	if (document.getElementById('itemetiquetas').value.length<1){
		param_ok=false;
	}
	//Precio
	if (document.getElementById('itemprecio').value.length<1 ){
		param_ok=false;
	}


	
	if (param_ok){
		document.getElementById('senditem').submit();
	}else{
		document.getElementById("revise-datos").style.display = 'block'; 
	}
}


function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() == blank.toDataURL();
}


