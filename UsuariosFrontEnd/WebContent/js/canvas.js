//var can = document.getElementById('canvasformodboard');
//var ctx = can.getContext('2d');

var textShutter= "(IMÁGENES VÍA WWW.SHUTTERSTOCK.COM)";

var color1;
var color2;
var color3;

var arrayanchos=[];
var arrayaltos=[];
var imagenes_canvas=[];
var ancho_img;
var alto_img;

var alto_canvas;
var anchos_tantos_por_cien=[30,50,20,20,20,45,45,55,25];
var altos_tantos_por_cien=[45,45,15,15,15,35,20,55,25];
var anchos_tantos_por_cien_2=[30,50,20,20,20,45,45,55,25];
var altos_tantos_por_cien_2=[45,45,15,15,15,35,20,55,25];
var x_tantos_por_cien=[0,30,80,80,80,0,0,45,25];
var y_tantos_por_cien=[0,0,0,15,30,45,80,45,32];

var anchoImg=[];
var altoImg=[];
var xpositionImg=[];
var ypositionImg=[];


var addtofonts=100;

////BootstrapDialog.alert("eyyyy2"+can.height);

var lineasblancas= 10;
var lineasblancasefectivas;
var anchobordeultimaimagen;
var margenbordeultimaimagen;


function modboardConstruct(){
	idmoodboard=0;
	 arrayanchos=[];
	 arrayaltos=[];
	 imagenes_canvas=[];
	 anchoImg=[];
	 altoImg=[];
	 xpositionImg=[];
	 ypositionImg=[];
	
	
	var ancho_img;
	var alto_img;
	 

	var medida=1000;

	var canvasMOOD;
	
		canvasMOOD = createHiDPICanvas(medida, (medida)+addtofonts);
		
		 canvasMOOD = document.createElement("canvas");
		    
		 canvasMOOD.width = medida;
		 canvasMOOD.height = (medida)+addtofonts;
	

	/*var canvasMOOD;
	if(window.innerWidth>window.innerHeight){
		//var tantopocientoalto=window.innerHeight*80/100;
		canvasMOOD = createHiDPICanvas(window.innerHeight*80/100, (window.innerHeight*80/100)+addtofonts);
		
		 canvasMOOD = document.createElement("canvas");
		    
		 canvasMOOD.width = window.innerHeight*80/100;
		 canvasMOOD.height = (window.innerHeight*80/100)+addtofonts;
		
	}else{
		//canvasMOOD = createHiDPICanvas(window.innerWidth*80/100, (window.innerWidth*80/100)+addtofonts);
		 canvasMOOD = document.createElement("canvas");
		 canvasMOOD.width = window.innerWidth*80/100;
		 canvasMOOD.height =(window.innerWidth*80/100)+addtofonts;
	}*/
	
	canvasMOOD.id="canvasformodboard";
	can = document.getElementById('canvasformodboard');	
	
 
	
	if(can==null) {
		$('#div_pre_moodboard_canvas').after(canvasMOOD);
		can = document.getElementById('canvasformodboard');
	}else{
		
	}
	
	
	
		
	ctx = can.getContext('2d');
	
	can.style.borderWidth = "1px";
	can.style.borderStyle = "solid";
	can.style.backgroundColor = "#ffffff";
	can.style.padding = "10px";
	can.classList.add("canvasformodboard");
	
	var divparacompartirvar = document.getElementById('divparacompartircanvas');
	var divparacompartirvar2 = document.getElementById('divparacompartircanvas2');
	var anchovardiv="width:"+can.width+"px";
/*	divparacompartirvar.setAttribute("style",anchovardiv);
	divparacompartirvar2.setAttribute("style",anchovardiv);*/
	
	dibujar_cuadro(0, 0, can.width, can.height);
	
	var image1= getCookie("paso6_1");
	var image2= getCookie("paso6_2");
	var image3= getCookie("paso6_3");
	 color1= '#'+getCookie("paso7_1");
	 color2= '#'+getCookie("paso7_2");
	 color3= '#'+getCookie("paso7_3");
	// alert(color1);
	var sensation1= getCookie("paso8_1");
	var sensation2= getCookie("paso8_2");
	var sensation3= getCookie("paso8_3");
	//BootstrapDialog.alert("'"+sensation1+"'");
	//BootstrapDialog.alert("'"+sensation2+"'");
	
	if(sensation1.indexOf("frase_") > -1){
		var auxsensationX=sensation3;
		sensation3=sensation1;
		sensation1=auxsensationX;
	}
	if(sensation2.indexOf("frase_") > -1){
		var auxsensationX=sensation3;
		sensation3=sensation2;
		sensation2=auxsensationX;
	}
	
	cargarImagen("img/imagenes/"+image1,0);
	cargarImagen("img/imagenes/"+image2,1);
	cargarImagen("img/imagenes/"+image2,2);
	cargarImagen("img/imagenes/"+image2,3);
	cargarImagen("img/imagenes/"+image2,4);
	cargarImagen("img/imagenes/"+sensation1,5);
	cargarImagen("img/imagenes/"+sensation2,6);
	cargarImagen("img/imagenes/"+image3,7);
	cargarImagen("img/imagenes/"+sensation3,8);
	
	//goMoodBoard();
	
	
	lineasblancasefectivas= (lineasblancas*100)/can.height;
	
}

function compare(a,b) {
	  if (a.pos < b.pos)
	    return -1;
	  if (a.pos > b.pos)
	    return 1;
	  return 0;
	}

function modboardConstructCTM(){
	textShutter="";
	
	idmoodboard=0;
	 arrayanchos=[];
	 arrayaltos=[];
	 imagenes_canvas=[];
	 anchoImg=[];
	 altoImg=[];
	 xpositionImg=[];
	 ypositionImg=[];
	
	
	var ancho_img;
	var alto_img;
	
	var medida=1000;

	var canvasMOOD;
	
		canvasMOOD = createHiDPICanvas(medida, (medida)+addtofonts);
		
		 canvasMOOD = document.createElement("canvas");
		    
		 canvasMOOD.width = medida;
		 canvasMOOD.height = (medida)+addtofonts;

	/*var canvasMOOD;
	if(window.innerWidth>window.innerHeight){
		//var tantopocientoalto=window.innerHeight*80/100;
		canvasMOOD = createHiDPICanvas(window.innerHeight*80/100, (window.innerHeight*80/100)+addtofonts);
		
		 canvasMOOD = document.createElement("canvas");
		    
		 canvasMOOD.width = window.innerHeight*80/100;
		 canvasMOOD.height = (window.innerHeight*80/100)+addtofonts;
		
	}else{
		//canvasMOOD = createHiDPICanvas(window.innerWidth*80/100, (window.innerWidth*80/100)+addtofonts);
		 canvasMOOD = document.createElement("canvas");
		 canvasMOOD.width = window.innerWidth*80/100;
		 canvasMOOD.height =(window.innerWidth*80/100)+addtofonts;
	}*/
	
	canvasMOOD.id="canvasformodboard";
	can = document.getElementById('canvasformodboard');	
	
 
	
	if(can==null) {
		var pre_moodboarddiv= document.getElementById('divformodboard');
		pre_moodboarddiv.style.display="block";
		$('#div_pre_moodboard_canvas').after(canvasMOOD);
		can = document.getElementById('canvasformodboard');
	}else{
		
	}
	
	
	
		
	ctx = can.getContext('2d');
	
	can.style.borderWidth = "1px";
	can.style.borderStyle = "solid";
	can.style.padding = "10px";
	can.classList.add("canvasformodboard");
	can.style.backgroundColor = "#ffffff";
	
	var divparacompartirvar = document.getElementById('divparacompartircanvas');
	var divparacompartirvar2 = document.getElementById('divparacompartircanvas2');
	var anchovardiv="width:"+can.width+"px";
/*	divparacompartirvar.setAttribute("style",anchovardiv);
	divparacompartirvar2.setAttribute("style",anchovardiv);*/
	
	dibujar_cuadro(0, 0, can.width, can.height);
	
	var image1= getCookie("paso6_1_CTM");
	var image2= getCookie("paso6_2_CTM");
	var image3= getCookie("paso6_3_CTM");
	
	 color1= getCookie("paso7_1_CTM");
	 color2= getCookie("paso7_2_CTM");
	 color3= getCookie("paso7_3_CTM");
	 color1 = color1.replace("%23", "#");
	 color2 = color2.replace("%23", "#");
	 color3 = color3.replace("%23", "#");
	// alert(color1);
	var sensation1= getCookie("paso8_1_CTM");
	var sensation2= getCookie("paso8_2_CTM");
	var sensation3= getCookie("paso8_3_CTM");
	//BootstrapDialog.alert("'"+sensation1+"'");
	//BootstrapDialog.alert("'"+sensation2+"'");
	
	/*if(sensation1.indexOf("frase_") > -1){
		var auxsensationX=sensation3;
		sensation3=sensation1;
		sensation1=auxsensationX;
	}
	if(sensation2.indexOf("frase_") > -1){
		var auxsensationX=sensation3;
		sensation3=sensation2;
		sensation2=auxsensationX;
	}*/
	//alert(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image1);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image1,0);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image2,1);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image2,2);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image2,3);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image2,4);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/sensaciones/"+sensation1,5);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/sensaciones/"+sensation2,6);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/imagenes/"+image3,7);
	cargarImagen(urlbuckets3+"usuarios/temporal/"+currentdate+"/frase/"+sensation3,8);
	
	//goMoodBoard();
	
	
	lineasblancasefectivas= (lineasblancas*100)/can.height;
	$('html, body').animate({
		scrollTop : ($("#divformodboard").offset().top)-50
	}, 'slow');
	 
    	
    

}




//ctx.fillRect(50,50,50,50); // something in the background




////BootstrapDialog.alert(color3);

/*ctx.fillStyle=color1;//color de relleno 
ctx.fillRect(0,0,110,80); //dibujamos un rectangulo
ctx.fillStyle=color2;//color de relleno 
ctx.fillRect(0,80,110,80); //dibujamos un rectangulo
ctx.fillStyle=color3;//color de relleno 
ctx.fillRect(110,80,110,80); //dibujamos un rectangulo
*/


////BootstrapDialog.alert("este paso3"+color3);
function getOriginalWidthOfImg(img_element) {
    var t = new Image();
    t.src = (img_element.getAttribute ? img_element.getAttribute("src") : false) || img_element.src;
    ancho_img= t.width;
    alto_img= t.height;
}

function recorreryver(){
	
	for(var i=0;i<arrayaltos.length;i++)
	{
		//BootstrapDialog.alert(arrayaltos[i]+'x'+arrayanchos[i]);
	}

}

function cargarImagen(src_param,pos){
	//BootstrapDialog.alert(src_param);
	var img = new Image();
	img.crossOrigin="anonymous";
	img.pos=pos;
	
	  img.src = src_param; 
	  
	  img.onload = function() {
		  //BootstrapDialog.alert(pos);
		  getOriginalWidthOfImg(img);
		  
		  arrayaltos.push(alto_img);
		  arrayanchos.push(ancho_img);
		  ////BootstrapDialog.alert(arrayaltos[0]);
		  imagenes_canvas.splice(img.pos, 0, img);
		 // alert(imagenes_canvas.toString());
		 // alert(img.pos);
		 
		  //ctx.drawImage(imagenes_canvas[0],0,0);
		  if(imagenes_canvas.length>=9){
			  imagenes_canvas.sort(compare);
			 /* var testoauxiliarfor;
			  for(var i=0;i<imagenes_canvas.length;i++){
				  var imauxroro=imagenes_canvas[i];
				  
				  var testetetet=i+' '+imauxroro.pos
				  alert('aa'+testetetet);
				  testoauxiliarfor+= testetetet ;
			  }
			  
			  
			  alert(testoauxiliarfor);*/
			 // BootstrapDialog.alert("antesanchotantoporcien"+anchos_tantos_por_cien[0]);
			 // BootstrapDialog.alert("antesanchotantoporcien2"+anchos_tantos_por_cien_2[0]);
			  anchos_tantos_por_cien=[];
			  anchos_tantos_por_cien.push.apply(anchos_tantos_por_cien, anchos_tantos_por_cien_2);
			  //anchos_tantos_por_cien=anchos_tantos_por_cien_2;
			  
			  altos_tantos_por_cien=[];
			  altos_tantos_por_cien.push.apply(altos_tantos_por_cien, altos_tantos_por_cien_2);
			  //altos_tantos_por_cien=altos_tantos_por_cien_2;
			  //BootstrapDialog.alert("despuesanchotantoporcien"+anchos_tantos_por_cien[0]);
			  sizesAndPositions();
		  }
		}
}

function goMoodBoard(){
	cargarImagen("img/imagenes/3-fingerprint-authenticated.png",0);
	cargarImagen("img/imagenes/002.jpg",1);
	cargarImagen("img/imagenes/01.jpg",2);
	cargarImagen("img/imagenes/02.jpg",3);
	cargarImagen("img/imagenes/2-detail.png",4);
	cargarImagen("img/imagenes/2-text.png",5);
	cargarImagen("img/imagenes/3-fingerprint-authenticated.png",6);
	cargarImagen("img/imagenes/2-text.png",7);
	
	//cargarImagen("img/imagenes/3-fingerprint-authenticated.png",7);
}


/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
function drawImageProp(number,ctx, img, x, y, w, h, offsetX, offsetY) {
	
	if(x==0) x=10;
	if(y==0) y=10;
	
	 
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    /// default offset is center
    offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
    offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

    /// keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   /// new prop. width
        nh = ih * r,   /// new prop. height
        cx, cy, cw, ch, ar = 1;

    /// decide which gap to fill    
    if (nw < w) ar = w / nw;
    if (nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    /// calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    /// make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
    
   
    if(number==8){
    	dibujar_cuadro(x,y,anchobordeultimaimagen,anchobordeultimaimagen);
    	//BootstrapDialog.alert(" anchobordeultimaimagen: "+anchobordeultimaimagen+" anchobordeultimaimagen: "+anchobordeultimaimagen+" x: "+x+ " y: "+y)
    	//BootstrapDialog.alert(margenbordeultimaimagen);
    	x=x+margenbordeultimaimagen;
    	y=y+margenbordeultimaimagen;
    	//BootstrapDialog.alert(x+"x"+y);
    	//BootstrapDialog.alert(cw+"x"+ch);
    	//ctx.beginPath();
		// ctx.arc(cw,cw, 50, 0, Math.PI*2,true); // you can use any shape
		//ctx.closePath();
		// ctx.clip();
    	dibujar_linea_horizontal(can.width/2, 1, can.width/4, can.height-65 );
    	escribir_texto(can.width/2, can.height-45, "D E C O T H E C O . C O M" , 12);
    	escribir_texto(can.width/2, can.height-30, textShutter, 7);
    	
	 }
    /// fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function dibujar_cuadro(an,al,xa,ya)
{
	ctx.fillStyle="#fff";
	ctx.fillRect(an,al,xa,ya);
}
function dibujar_linea_horizontal(an,al,xa,ya){
	ctx.fillStyle="#000";
	ctx.lineWidth = al;
	ctx.moveTo(xa, ya+0.5);
	var auxanancho=xa+an;
	ctx.lineTo(auxanancho,ya+0.5);
	ctx.stroke();
}

function escribir_texto(an,al,txtpie, tamanoletra)
{
	//BootstrapDialog.alert("oao");
	ctx.fillStyle="#808080";
	var tamanoytipo=tamanoletra+"px 'Lato', sans-serif, Arial";
	ctx.font=tamanoytipo;
	ctx.textAlign="center"; 
	ctx.fillText(txtpie,an,al); 
}


function sizesAndPositions(){
	////BootstrapDialog.alert("eyyyy2"+can.height);
	var altocanvas=can.width;
	////BootstrapDialog.alert("altocanvas "+altocanvas);
	for(var i=0;i<anchos_tantos_por_cien.length;i++)
	{
		if(i==8){
			anchobordeultimaimagen=(anchos_tantos_por_cien[i]*altocanvas/100)+10;
			margenbordeultimaimagen=lineasblancasefectivas*altocanvas/100;;
		}
		if(x_tantos_por_cien[i]==0){
			anchos_tantos_por_cien[i]=anchos_tantos_por_cien[i]-lineasblancasefectivas-lineasblancasefectivas;
		}else{
			anchos_tantos_por_cien[i]=anchos_tantos_por_cien[i]-lineasblancasefectivas;
		}
		
		if(y_tantos_por_cien[i]==0){
			altos_tantos_por_cien[i]=altos_tantos_por_cien[i]-lineasblancasefectivas-lineasblancasefectivas;
		}else{
			altos_tantos_por_cien[i]=altos_tantos_por_cien[i]-lineasblancasefectivas;
		}
		
		
		var anchoTotal= anchos_tantos_por_cien[i]*altocanvas/100;//espacio para el ancho de la imagen
		var altoTotal= altos_tantos_por_cien[i]*altocanvas/100;//espacio para el alto de la imagen
		//BootstrapDialog.alert("anchoTotal"+anchoTotal);
		//BootstrapDialog.alert("altoTotal"+altoTotal);
		//BootstrapDialog.alert(" el espacio que hay es: ancho: "+anchoTotal + " altoTotal "+altoTotal);
		
		//BootstrapDialog.alert("el tamaño de la imagen:" + arrayanchos[i]+"x"+ arrayaltos[i]);
		
		var  altoAux= ((arrayaltos[i]*anchoTotal)/arrayanchos[i]);//ancho cuando el alto es el anterior
		////BootstrapDialog.alert("anchoAux"+anchoAux);
		var anchoAux  = ((arrayanchos[i]*altoTotal)/arrayaltos[i]);//alto cuando el ancho es el anterior
		//BootstrapDialog.alert("El ancho para cuando es "+altoTotal+" ha de ser: " +  anchoAux);
		//BootstrapDialog.alert("El alto para cuando escogemos "+anchoTotal+" ha de ser: " +  altoAux);
		
		
		var auxxpos=x_tantos_por_cien[i]*altocanvas/100;
		var auxypos=y_tantos_por_cien[i]*altocanvas/100;
		var almediox=0;
		var almedioy=0;
		
		
		
		
		if(i==2){
			ctx.fillStyle=color1;//color de relleno 
			ctx.fillRect(auxxpos,auxypos+10,anchoTotal,altoTotal); //dibujamos un rectangulo
		}else if(i==3){
			ctx.fillStyle=color2;//color de relleno 
			ctx.fillRect(auxxpos,auxypos,anchoTotal,altoTotal); //dibujamos un rectangulo
		}else if(i==4){
			ctx.fillStyle=color3;//color de relleno 
			ctx.fillRect(auxxpos,auxypos,anchoTotal,altoTotal); //dibujamos un rectangulo
		}else{
			if(altoAux > altoTotal){
				//imprimirimagen(auxxpos, auxypos, anchoTotal, altoAux, imagenes_canvas[i]);
				
				//BootstrapDialog.alert("como "+altoAux+ " es mayor que :" + altoTotal + "\r\n entonces uso las siguientes medidias \r\n anchoTotal "+anchoTotal +" anchoAux "+altoAux +" auxxpos "+auxxpos +" auxypos "+auxypos +" anchoTotal "+anchoTotal +" altoTotal "+altoTotal);
				almediox=(anchoAux-anchoTotal)/2;
				//ctx.drawImage(imagenes_canvas[i], 0,0,  anchoTotal, altoTotal,auxxpos,auxypos, anchoTotal, altoTotal);
				almedioy=(altoAux-altoTotal)/2;
				drawImageProp(i,ctx, imagenes_canvas[i], auxxpos, auxypos, anchoTotal, altoTotal,i);
				//ctx.drawImage(imagenes_canvas[i], almediox,almedioy,  anchoTotal, altoTotal ,auxxpos,auxypos, anchoTotal, altoTotal);
			}else{
				//BootstrapDialog.alert("como "+altoAux+ " es menor que :" + altoTotal + "\r\n entonces uso las siguientes medidias \r\n altoTotal "+altoTotal + "\r\n entonces uso las siguientes medidias \r\n altoTotal "+altoTotal  +" anchoAux "+anchoAux +" auxxpos "+auxxpos +" auxypos "+auxypos +" anchoTotal "+anchoTotal +" altoTotal "+altoTotal);
				//imprimirimagen(auxxpos, auxypos, anchoAux, altoTotal, imagenes_canvas[i]);
				almediox=(anchoAux-anchoTotal)/2;
				almedioy=(altoAux-altoTotal)/2;
				
				drawImageProp(i,ctx, imagenes_canvas[i], auxxpos, auxypos, anchoTotal, altoTotal, i);
				
				/*ctx.drawImage(imagenes_canvas[i], almediox,almedioy,  anchoTotal, altoTotal ,
						auxxpos,auxypos, anchoTotal, altoTotal);*/
			}
			
			//drawImageScaled(auxxpos, auxypos, anchoTotal, altoTotal, imagenes_canvas[i], ctx)
			
		}
		
	}
	saveImageServerCanvas(8);
}

function drawImageScaled(xpos,ypos, anchoimg, altoimg, img, ctx) {
	  
	//BootstrapDialog.alert("xposition: "+ xpos+" yposition: "+ypos+ " \r\n anchoimagen: "+anchoimg+ " altoimg: "+altoimg);
	
	   var hRatio = anchoimg  / img.width    ;
	   var vRatio =  altoimg / img.height  ;
	   var ratio  = Math.min ( hRatio, vRatio );
	   var centerShift_x = ( anchoimg - img.width*ratio ) / 2;
	   var centerShift_y = ( altoimg - img.height*ratio ) / 2;  
	   
	   //ctx.clearRect(0,0,anchoimg, altoimg);
	   
	   ctx.drawImage(img, centerShift_x,centerShift_y,  img.width, img.height,
			   xpos,ypos, img.width*ratio, img.height*ratio);
	   
}

function imprimirimagen(xpos, ypos, anchopos,  altopos, img){
	//BootstrapDialog.alert("xpos "+xpos);
	//BootstrapDialog.alert("ypos "+ypos);
	//BootstrapDialog.alert("anchopos "+anchopos);
	//BootstrapDialog.alert("altopos "+altopos);
	
	//ctx.drawImage(imagenes_canvas[0],0,0);
	ctx.drawImage(img, xpos, ypos, anchopos, altopos);
	//BootstrapDialog.alert("imagen");
}
