 
function listaItems(arrayItems) {
	listaDeItems="";
	$.each(arrayItems, function(i, item) {
		style=""; 
		k++;
		 
			var img = new Image(); 
			img.src = item[0].src; 
			img.crossOrigin = 'Anonymous';
			if(img.width>img.height){
				style="height:100%;width:auto;";
			} else { 
				style="width:100%;height:auto;";
			} 

			urlProducto = processUrlAffiliates(item[0].url, listaAfiliados, idDecorador);
			if(item[0].imagenOriginal!=undefined) {imgSRC=item[0].imagenOriginal} else {imgSRC=item[0].src}
			if(item[0].price>0){
				listaDeItems+='<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" ><div class="cuadros"><div class="imagenItems"><img style="'+style+'" src="'+imgSRC+'" alt="item'+item.length+'"/> </div><div class="letra-xs letra-mayusculas nombreItem" style="margin-bottom:5%;width:90%;margin-left:5%;border-bottom:1px solid #ccc">'+item[0].title+'</div><a class="buttonstandard_invertido letra-xs" style="width:70%;margin-bottom:5%;padding:0;letter-spacing:1px" target="_blank" href="'+urlProducto+'">VER +</a></div></div>';
 
	    	}
		
	})  
	return listaDeItems;
}