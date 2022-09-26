var cerramosONo=false;
var ObjetoAplicar="";
var anchoForCustomCanvasFinalImage=0;
var altoForCustomCanvasFinalImage=0;
var moveDrag=0;
var input_canvas;
var output_canvas;

var width;
var height;
var jqwindow;
var delta_left;
var delta_top;
var yax;
var state;

var pf_opt, slic_opt;

slic_opt = function () {
    this.regionSize = 30;
    this.minSize = 20;
    };

const STATE_IDLE = 'idle';
const STATE_PANNING = 'panning';

let lastClientX;
let lastClientY; 
let deltaX = 0;
let deltaY = 0;
var pointer="";

fabric.Canvas.prototype.toggleDragMode = function(dragMode) { 
	let state = STATE_IDLE; 
  if (dragMode) {
    // Desactivar todo
    this.discardActiveObject();
    // cambiar tipo de cursor

    this.defaultCursor = 'move';
    // evitar seleccionar los items mientras estas en modo dragMode
    this.forEachObject(function(object) {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });

    // evitar que puedan seleccionar
    this.selection = false; 
    this.on('mouse:up', function(e) {
      state = STATE_IDLE;
    }); 
    this.on('mouse:down', (e) => {
      state = STATE_PANNING;
      lastClientX = e.e.clientX;
      lastClientY = e.e.clientY; 
    });

    // Detectar movimiento, calcular posición y desplazamiento
    this.on('mouse:move', (e) => {
      if (state === STATE_PANNING && e && e.e) { 
  		deltaX = 0;
        deltaY = 0;
	    if (lastClientX) {
          deltaX = e.e.clientX - lastClientX;
        }
        if (lastClientY) {
          deltaY = e.e.clientY - lastClientY;
        }
    	pointer = canvas.getPointer(event);
    	if(pointer.x>1000){
    		if(deltaX>0) {  
    		        lastClientX = e.e.clientX;
    		        lastClientY = e.e.clientY;
    		        let delta = new fabric.Point(deltaX, deltaY);
    		        this.relativePan(delta);
    		        this.trigger('moved');
    		}   
    	} else if(pointer.x<-300) {
    		if(deltaX<0) {  
		        lastClientX = e.e.clientX;
		        lastClientY = e.e.clientY;
		        let delta = new fabric.Point(deltaX, deltaY);
		        this.relativePan(delta);
		        this.trigger('moved');
    		}
    	} else if(pointer.y>1000){
    		if(deltaY>0) {  
		        lastClientX = e.e.clientX;
		        lastClientY = e.e.clientY;
		        let delta = new fabric.Point(deltaX, deltaY);
		        this.relativePan(delta);
		        this.trigger('moved');
			}   
		} else if(pointer.y<-300) {
			if(deltaY<0) {  
		        lastClientX = e.e.clientX;
		        lastClientY = e.e.clientY;
		        let delta = new fabric.Point(deltaX, deltaY);
		        this.relativePan(delta);
		        this.trigger('moved');
			}
		} else { 
	        lastClientX = e.e.clientX;
	        lastClientY = e.e.clientY; 
	        let delta = new fabric.Point(deltaX, deltaY);
	        this.relativePan(delta);
	        this.trigger('moved'); 
    	}
      }
    });
  } else {
    // When we exit dragmode, we restore the previous values on all objects
    this.forEachObject(function(object) {
      object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
      object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
    });
    // Reset the cursor
    this.defaultCursor = 'default';
    // Remove the event listeners
    this.off('mouse:up');
    this.off('mouse:down');
    this.off('mouse:move');
    // Restore selection ability on the canvas
    this.selection = true;
  }
};

var activeObject="";

function perspective() {   
    
	// PARA EJECUTAR EL SCRIPT ES NECESARIO TENER ELEGIDO UN OBJETO (PARA EVITAR POSIBLES BUGS)
	if(canvas.getActiveObject()==null || canvas.getActiveObject()=="" || canvas.getActiveObject()==undefined){ 
	} else {
		
		
	// CAPAMOS EL BOTÃ“N PERSPECTIVA PARA EVITAR POSIBLES BUGS AL EJECUTARLO 2 VECES
	$("#perspectiva").attr("onclick", ""); 
	
	
	// RECOGEMOS EL OBJETO SELECCIONADO LO HACEMOS INVISIBLE
    activeObject = canvas.getActiveObject(); 
    activeObject.set("visible", false);  
    canvas.deactivateAll().renderAll();
    canvas.renderAll(); 
    
    // OBTENEMOS LA ANCHURA / ALTURA DEL CANVAS PARA CREAR LA MÃSCARA DONDE DEFORMAREMOS LA IMAGEN
    var altura=$("#canvas").width(); 
    var w=$("#canvas").width();
    var h=$("#canvas").height(); 
     
    // OBTENEMOS LAS PROPIEDADES QUE NOS INTERESAN DEL OBJETO Y SU IMAGEN
    var url_image = activeObject.get("src");
    var scaleX = activeObject.get("scaleX");
    var scaleY = activeObject.get("scaleY");
    var widthA = activeObject.get("width")*canvasZoom;
    var heightA = activeObject.get("height")*canvasZoom;
    var topA = activeObject.get("top")*canvasZoom;
    var leftA = activeObject.get("left")*canvasZoom;
    var angle = activeObject.get("angle");
    
    // AÃ‘ADIMOS LA IMAGEN
    $("#screen").attr("src", url_image);
    
    // SITUAMOS ENCIMA EL NUEVO CANVAS QUE CONTIENE LA NUEVA IMAGEN
    $("#screenCanvas").css("z-index", "40");
     

    // TENEMOS EN CUENTA LA ESCALA DE LA IMAGEN
    widthI=(parseInt(activeObject.width)*scaleX);
    heightI=(parseInt(activeObject.height)*scaleX);
    
    // AÃ‘ADIMOS NUEVOS TAMAÃ‘OS AL CANVAS NUEVO    
    $("#screenCanvas").css({"width": altura , "height":altura, "left":40});
    $("#screenCanvas").attr({"width": altura , "height":altura});

    // AÃ‘ADIMOS LA ALTURA Y ANCHURA DE LOS CONTROLES (EL DIV QUE LO ENVUELVE, NO LOS PUNTOS)
    $("#controlHandles").css({"width": altura , "height":altura, "left":40});
    $("#controlHandles").attr({"width": altura , "height":altura});
    
    // INICIALIZAMOS MEDIDAS QUE UTILIZAREMOS PARA SITUAR EL OBJETO AL GUARDAR CUANDO SE DESPLAZÃ“ EL CANVAS
    var xFinal=0;
    var yFinal=0;
    
    
    // SI NO SE DESPLAZO:
    if(lastClientX==undefined) {
    	
    	// OBTENEMOS COORDENADAS DEL ITEM
        x0=activeObject.aCoords.bl.x*canvasZoom; 
        x1=activeObject.aCoords.br.x*canvasZoom;
        x2=activeObject.aCoords.tl.x*canvasZoom;
        x3=activeObject.aCoords.tr.x*canvasZoom;
        y0=activeObject.aCoords.bl.y*canvasZoom; 
        y1=activeObject.aCoords.br.y*canvasZoom;
        y2=activeObject.aCoords.tl.y*canvasZoom;
        y3=activeObject.aCoords.tr.y*canvasZoom;
        
        // EN FUNCIÃ“N DE SI SE VOLTEÃ“ LA IMAGEN SE SITUAN LOS PUNTOS QUE NECESITA EL SCRIPT PARA DEFORMAR LA IMAGEN
        if(activeObject.get("flipX") && activeObject.get("flipY")) {
	        var controlPoints = [
	        	{ x: x1, y: y1 },
	            { x: x0, y: y0 },
	            { x: x3, y: y3 },
	            { x: x2, y: y2 }
	        ];  
	        
        } else if(activeObject.get("flipX")) {
	        var controlPoints = [
	        	{ x: x3, y: y3 },
	            { x: x2, y: y2 },
	            { x: x1, y: y1 },
	            { x: x0, y: y0 }
	        ];   
        } else if(activeObject.get("flipY")) {
	        var controlPoints = [
	        	{ x: x0, y: y0 },
	            { x: x1, y: y1 },
	            { x: x2, y: y2 },
	            { x: x3, y: y3 }
	        ];  
        } else {
	        var controlPoints = [
	        	{ x: x2, y: y2 },
	            { x: x3, y: y3 },
	            { x: x0, y: y0 },
	            { x: x1, y: y1 }
	        ];  
        }
        
        // SITUAMOS EL BOTÃ“N GUARDAR Y CANCELAR
        var guardar=y2-100;
        if(guardar<100) {
        	guardar=y2+heightI+60;
        } 
        $("#guardar").css({"display": "block", "left":x2+75, "top":guardar});
        $("#cancelar").css({"display": "block", "left":x2+150, "top":guardar});
    	
        
        

    // SI SE DESPLAZA EL CANVAS
    } else {
    	 

        // EN FUNCIÃ“N DE SI SE VOLTEÃ“ LA IMAGEN SE SITUAN LOS PUNTOS QUE NECESITA EL SCRIPT PARA DEFORMAR LA IMAGEN
        if(activeObject.get("flipX") && activeObject.get("flipY")) {
	        var controlPoints = [
	        	{ x:(activeObject.oCoords.br.x), y: (activeObject.oCoords.br.y) },
	            { x:(activeObject.oCoords.bl.x), y: (activeObject.oCoords.bl.y) },
	            { x: (activeObject.oCoords.tr.x), y: (activeObject.oCoords.tr.y)},
	            { x: (activeObject.oCoords.tl.x), y: (activeObject.oCoords.tl.y) }
	        ];  
	         
	         
        } else if(activeObject.get("flipX")) {
	        var controlPoints = [
	        	{ x: (activeObject.oCoords.tr.x), y: (activeObject.oCoords.tr.y) },
	            { x: (activeObject.oCoords.tl.x), y: (activeObject.oCoords.tl.y) },
	            { x: (activeObject.oCoords.br.x), y: (activeObject.oCoords.br.y) },
	            { x: (activeObject.oCoords.bl.x), y: (activeObject.oCoords.bl.y) }
	        ];  
        } else if(activeObject.get("flipY")) {
        	var controlPoints = [
	        	{ x: (activeObject.oCoords.bl.x), y: (activeObject.oCoords.bl.y) },
	            { x: (activeObject.oCoords.br.x), y: (activeObject.oCoords.br.y) },
	            { x: (activeObject.oCoords.tl.x), y: (activeObject.oCoords.tl.y) },
	            { x: (activeObject.oCoords.tr.x), y: (activeObject.oCoords.tr.y) }
	        ];  
        } else {
	        var controlPoints = [
	        	{ x: (activeObject.oCoords.tl.x), y: (activeObject.oCoords.tl.y) },
	    	     { x: (activeObject.oCoords.tr.x), y: (activeObject.oCoords.tr.y) },
	    	     { x: (activeObject.oCoords.bl.x), y: (activeObject.oCoords.bl.y) },
	    	     { x: (activeObject.oCoords.br.x), y: (activeObject.oCoords.br.y) } 
	        ]; 
        }
        

        // SITUAMOS EL BOTÃ“N GUARDAR Y CANCELAR
    	var guardar=(topA-activeObject.canvas.vptCoords.tr.y)-150;
        if(guardar<150) {
        	guardar=(topA-activeObject.canvas.vptCoords.tr.y)+heightI+60;
        } 
        $("#guardar").css({"display": "block", "left":(leftA-activeObject.canvas.vptCoords.bl.x)+75, "top":guardar});
        $("#cancelar").css({"display": "block", "left":(leftA-activeObject.canvas.vptCoords.bl.x)+150, "top":guardar});
    } 
    
    
    // AÃ‘ADIMOS EVENTO GUARDAR AL BOTON GUARDAR
    $('#guardar').click(function(){
    	saveResult(); 
    	$("#perspectiva").attr("onclick", "perspective();");
    })
    
    
    // AÃ‘ADIMOS EVENTO CANCELAR AL BOTON CANCELAR
    $('#cancelar').click(function(){
    	$("#container").html('<div id="guardar">Guardar</div><div id="cancelar">Cancelar</div> <canvas id="background"></canvas>  <img id="screen" src=""> <canvas width="500" height="507" id="screenCanvas"></canvas> <svg width="500" height="507" id="controlHandles"></svg>');
    	 activeObject.set("visible", true);
        canvas.deactivateAll().renderAll();
        canvas.setActiveObject(activeObject); 
        canvas.renderAll();
    	$("#perspectiva").attr("onclick", "perspective();");
    })
    
     

    //The normalised texture co-ordinates of the quad in the screen image.
    var srcPoints;

    //UI for controlling quality
    var anisotropicFilteringElement = document.getElementById('anisotropicFiltering');
    var mipMappingFilteringElement = document.getElementById('mipMapping');
    var linearFilteringElement = document.getElementById('linearFiltering');

    //Options for controlling quality.
    var qualityOptions = { };
    syncQualityOptions();
 
 

    //Wire in the control handles to dragging. Call 'redrawImg' when they change.
    var controlHandlesElement = document.getElementById('controlHandles');
    setupControlHandles(controlHandlesElement, redrawImg);

    //Wire up the control handle toggle
    var drawControlPointsElement = document.getElementById('drawControlPoints');
     
     controlHandlesElement.style.visibility =  'visible' ;   
     controlHandlesElement.style.zIndex  =  '2000' ;

    //Create a WegGL context from the canvas which will have the screen image
    //rendered to it. NB: preserveDrawingBuffer is needed for rendering the
    //image for download. (Otherwise, the canvas appears to have nothing in
    //it.)
     
     var supportsWebGL = ( function () {
            try {
                return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
            } catch( e ) {
                return false;
            }
        } )();
 


    var screenCanvasElement = document.getElementById('screenCanvas'); 
    var glOpts = { antialias: true, depth: false, preserveDrawingBuffer: true };
    var gl =
        screenCanvasElement.getContext('webgl', glOpts) ||
        screenCanvasElement.getContext('experimental-webgl', glOpts);
    if(!gl) {
     addError("Your browser doesn't seem to support WebGL.");
    }

    //See if we have the anisotropic filtering extension by trying to get
    //if from the WebGL implementation.
    var anisoExt =
     gl.getExtension('EXT_texture_filter_anisotropic') ||
     gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
     gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');

    //If we failed, tell the user that their image will look like poo on a
    //stick.
    if(!anisoExt) {
     anisotropicFilteringElement.checked = true;
     anisotropicFilteringElement.disabled = false;
     addError("Your browser doesn't support anisotropic filtering. "+
              "Ordinary MIP mapping will be used.");
    }

    //Setup the GL context compiling the shader programs and returning the
    //attribute and uniform locations.
    var glResources = setupGlContext();

    //This object will store the width and height of the screen image in
    //normalised texture co-ordinates in its 'w' and 'h' fields.
    var screenTextureSize;

    //The only readon this element exists in the DOM is too (potentially)
    //cache the image for us before this script is run and to specity
    //the screen image URL in a more obvious place.
    var imgElement = document.getElementById('screen');
    imgElement.style.display = 'none';

    //Create an element to hold the screen image and arracnge for loadScreenTexture
    //to be called when the image is loaded.
    var screenImgElement = new Image();
    imgElement.style.width= activeObject.width*canvasZoom;
    imgElement.style.height= activeObject.height*canvasZoom;
    imgElement.style.top = 0;
    imgElement.style.left = 0+40;
    imgElement.style.backgroundColor = "transparent";
    screenImgElement.crossOrigin = '';
    screenImgElement.onload = loadScreenTexture;
    screenImgElement.src = imgElement.src;
    screenImgElement.style.backgroundColor = "transparent";
    function setupGlContext() {
        // Store return values here
        var rv = {};
        
        // Vertex shader:
        var vertShaderSource = [
            'attribute vec2 aVertCoord;',
            'uniform mat4 uTransformMatrix;',
            'varying vec2 vTextureCoord;',
            'void main(void) {',
            '    vTextureCoord = aVertCoord;',
            '    gl_Position = uTransformMatrix * vec4(aVertCoord, 0.0, 1.0);',
            '}'
        ].join('\n');

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertShaderSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            addError('Failed to compile vertex shader:' +
                  gl.getShaderInfoLog(vertexShader));
        }
           
        // Fragment shader:
        var fragShaderSource = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'uniform sampler2D uSampler;',
            'void main(void)  {',
            '    gl_FragColor = texture2D(uSampler, vTextureCoord);',
            '}'
        ].join('\n');

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragShaderSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            addError('Failed to compile fragment shader:' +
                  gl.getShaderInfoLog(fragmentShader));
        }
        
        // Compile the program
        rv.shaderProgram = gl.createProgram();
        gl.attachShader(rv.shaderProgram, vertexShader);
        gl.attachShader(rv.shaderProgram, fragmentShader);
        gl.linkProgram(rv.shaderProgram);

        if (!gl.getProgramParameter(rv.shaderProgram, gl.LINK_STATUS)) {
            addError('Shader linking failed.');
        }
            
        // Create a buffer to hold the vertices
        rv.vertexBuffer = gl.createBuffer();

        // Find and set up the uniforms and attributes        
        gl.useProgram(rv.shaderProgram);
        rv.vertAttrib = gl.getAttribLocation(rv.shaderProgram, 'aVertCoord');
            
        rv.transMatUniform = gl.getUniformLocation(rv.shaderProgram, 'uTransformMatrix');
        rv.samplerUniform = gl.getUniformLocation(rv.shaderProgram, 'uSampler');
            
        // Create a texture to use for the screen image
        rv.screenTexture = gl.createTexture();
        
        return rv;
    }

    function loadScreenTexture() {
        if(!gl || !glResources) { return; }
        
        var image = screenImgElement;
        var extent = { w: image.naturalWidth, h: image.naturalHeight };
        
        gl.bindTexture(gl.TEXTURE_2D, glResources.screenTexture);
        
        // Scale up the texture to the next highest power of two dimensions.
        var canvas3 = document.createElement("canvas");
        canvas3.width = nextHighestPowerOfTwo(extent.w);
        canvas3.height = nextHighestPowerOfTwo(extent.h);
        canvas3.fillStyle = "rgba(0, 0, 0, 0)";
        
        var ctx = canvas3.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas3);
        
        if(qualityOptions.linearFiltering) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                             qualityOptions.mipMapping
                                 ? gl.LINEAR_MIPMAP_LINEAR
                                 : gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                             qualityOptions.mipMapping
                                 ? gl.NEAREST_MIPMAP_NEAREST
                                 : gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
        
        if(anisoExt) {
            // turn the anisotropy knob all the way to 11 (or down to 1 if it is
            // switched off).
            var maxAniso = qualityOptions.anisotropicFiltering ?
                gl.getParameter(anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;
            gl.texParameterf(gl.TEXTURE_2D, anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, maxAniso);
        }
        
        if(qualityOptions.mipMapping) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        
        gl.bindTexture(gl.TEXTURE_2D, null);
        
        // Record normalised height and width.
        var w = extent.w / canvas3.width, h = extent.h / canvas3.height;
        
        
        
        srcPoints = [
            { x: 0, y: 0 }, // top-left
            { x: w, y: 0 }, // top-right
            { x: 0, y: h }, // bottom-left
            { x: w, y: h }  // bottom-right
        ];
            
        // setup the vertex buffer with the source points
        var vertices = [];
        for(var i=0; i<srcPoints.length; i++) {
            vertices.push(srcPoints[i].x);
            vertices.push(srcPoints[i].y);
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER, glResources.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        
        // Redraw the image
        redrawImg();
    }

    function isPowerOfTwo(x) { return (x & (x - 1)) == 0; }
         function nextHighestPowerOfTwo(x) {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }

    function redrawImg() {
        if(!gl || !glResources || !srcPoints) { return; }
        
        var vpW = screenCanvasElement.width;
        var vpH = screenCanvasElement.height;
        
        // Find where the control points are in 'window coordinates'. I.e.
        // where thecanvas covers [-1,1] x [-1,1]. Note that we have to flip
        // the y-coord.
        var dstPoints = [];
        for(var i=0; i<controlPoints.length; i++) {
            dstPoints.push({
                x: (2 * controlPoints[i].x / vpW) - 1,
                y: -(2 * controlPoints[i].y / vpH) + 1
            });
        }
        
        // Get the transform
        var v = transformationFromQuadCorners(srcPoints, dstPoints); 
        // set background to full transparency
        gl.clearColor(0,0,0,0);
        gl.viewport(0, 0, vpW, vpH);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(glResources.shaderProgram);

        // draw the triangles
        gl.bindBuffer(gl.ARRAY_BUFFER, glResources.vertexBuffer);
        gl.enableVertexAttribArray(glResources.vertAttrib);
        gl.vertexAttribPointer(glResources.vertAttrib, 2, gl.FLOAT, false, 0, 0);
        
        /*  If 'v' is the vector of transform coefficients, we want to use
            the following matrix:
        
            [v[0], v[3],   0, v[6]],
            [v[1], v[4],   0, v[7]],
            [   0,    0,   1,    0],
            [v[2], v[5],   0,    1]
        
            which must be unravelled and sent to uniformMatrix4fv() in *column-major*
            order. Hence the mystical ordering of the array below.
        */
        gl.uniformMatrix4fv(
            glResources.transMatUniform,
            false, [
                v[0], v[1],    0, v[2],
                v[3], v[4],    0, v[5],
                   0,    0,    0,    0,
                v[6], v[7],    0,    1
            ]);
            
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, glResources.screenTexture);
        gl.uniform1i(glResources.samplerUniform, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);    
    }

    function transformationFromQuadCorners(before, after)
    {
        /*
         Return the 8 elements of the transformation matrix which maps
         the points in *before* to corresponding ones in *after*. The
         points should be specified as
         [{x:x1,y:y1}, {x:x2,y:y2}, {x:x3,y:y2}, {x:x4,y:y4}].
         
         Note: There are 8 elements because the bottom-right element is
         assumed to be '1'.
        */
     
        var b = numeric.transpose([[
            after[0].x, after[0].y,
            after[1].x, after[1].y,
            after[2].x, after[2].y,
            after[3].x, after[3].y ]]);
        
        var A = [];
        for(var i=0; i<before.length; i++) {
            A.push([
                before[i].x, 0, -after[i].x*before[i].x,
                before[i].y, 0, -after[i].x*before[i].y, 1, 0]);
            A.push([
                0, before[i].x, -after[i].y*before[i].x,
                0, before[i].y, -after[i].y*before[i].y, 0, 1]);
        }
        
        // Solve for T and return the elements as a single array
        return numeric.transpose(numeric.dot(numeric.inv(A), b))[0];
    }

    function syncQualityOptions() {
        qualityOptions.anisotropicFiltering = true;
        qualityOptions.mipMapping = true;
        qualityOptions.linearFiltering = true;
        
        // re-load the texture if possible
        loadScreenTexture();
    }

    function setupControlHandles(controlHandlesElement, onChangeCallback)
    {
        // Use d3.js to provide user-draggable control points
        var rectDragBehav = d3.behavior.drag()
            .on('drag', function(d,i) {
                    d.x += d3.event.dx; d.y += d3.event.dy;
                    d3.select(this).attr('cx',d.x).attr('cy',d.y);
                    onChangeCallback();
                });
        
        var dragT = d3.select(controlHandlesElement).selectAll('circle')
                .data(controlPoints)
            .enter().append('circle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', 10)
                .attr('class', 'control-point')
                .call(rectDragBehav);
    }

    function addError(message)
    {
        var container = document.getElementById('errors');
        var errMessage = document.createElement('div');
        errMessage.textContent = message;
        errMessage.className = 'errorMessage';
        container.appendChild(errMessage);
    }

    function saveResult() { 
    	
    	
    	 // CUANDO PULSAN GUARDAR SE ABRE EL POPUP DE CARGAR
         $('#cargando').modal('show');  
         
         /*// OBTENEMOS LAS PROPIEDADES DEL OBJETO QUE INSERTAREMOS AL NUEVO OBJETO
    	 imagen_sin_fondo.objeto=activeObject;
         imagen_sin_fondo.titulo=activeObject.get("title");
         imagen_sin_fondo.etiquetas=activeObject.get("tags");
         imagen_sin_fondo.precio=activeObject.get("price");
         imagen_sin_fondo.url=activeObject.get("src");
         imagen_sin_fondo.urlP=activeObject.get("url");
         imagen_sin_fondo.id=activeObject.get("id");
         imagen_sin_fondo.tipo=1;*/
    	
         // OBTENEMOS LA NUEVA IMAGEN DEL CANVAS GENERADO ANTERIOREMENTE
        var resultCanvas = document.getElementById('screenCanvas');
        var value  = resultCanvas.toDataURL("image/png");

        // RECOGEMOS LOS PUNTOS FINALES CON LOS QUE SE DEFORMÃ“ LA IMAGEN Y CALCULAMOS LA DISTANCIA MÃS PEQUEÃ‘A Y GRANDE DE X E Y
        x0=document.getElementsByClassName("control-point")[0].getAttribute('cx');
        x1=document.getElementsByClassName("control-point")[1].getAttribute('cx'); 
        x2=document.getElementsByClassName("control-point")[2].getAttribute('cx'); 
        x3=document.getElementsByClassName("control-point")[3].getAttribute('cx');  
        y0=parseInt(document.getElementsByClassName("control-point")[0].getAttribute('cy')); 
        y1=parseInt(document.getElementsByClassName("control-point")[1].getAttribute('cy'));  
        y2=parseInt(document.getElementsByClassName("control-point")[2].getAttribute('cy'));  
        y3=parseInt(document.getElementsByClassName("control-point")[3].getAttribute('cy'));   

        y=0;
        x=0;
        yA=10000;
        xA=10000;
        
        if(parseInt(x0)>x) {  
        	x=parseInt(x0);
        }
        if(parseInt(x1)>x) {
        	x=parseInt(x1);
        }
        if(parseInt(x2)>x) {
        	x=parseInt(x2);
        }
        if(parseInt(x3)>x) {
        	x=parseInt(x3);
        }
        if(parseInt(x0)<xA) {
        	xA=parseInt(x0);
        }
        if(parseInt(x1)<xA) {
        	xA=parseInt(x1);
        }
        if(parseInt(x2)<xA) {
        	xA=parseInt(x2);
        }
        if(parseInt(x3)<xA) {
        	xA=parseInt(x3);
        }
        
        
        if(y0>y) {
        	y=y0;
        }
        if(y1>y) {
        	y=y1;
        }
        if(y2>y) {
        	y=y2;
        }
        if(y3>y) {
        	y=y3;
        }
        if(y0<yA) {
        	yA=y0;
        }
        if(y1<yA) {
        	yA=y1;
        }
        if(y2<yA) {
        	yA=y2;
        }
        if(y3<yA) {
        	yA=y3;
        }
        
        // PARA CUANDO HAY DESPLAZAMIENTO EN EL CANVAS, NECESITAMOS OBTENER LA DIFERENCIA ENTRE TOP LEFT SOBRE EL INICIO DEL CANVAS Y EL NUEVO TOP Y LEFT DEL OBJETO
        var diferencia1=activeObject.aCoords.br.x-activeObject.oCoords.br.x;
        var diferencia2=activeObject.aCoords.br.y-activeObject.oCoords.br.y;
        yFinal=yA+diferencia2;
        xFinal=xA+diferencia1;
        
        // INSERTAMOS LA IMAGEN DEL CANVAS GENERADO ANTERIORMENTE EN UNO NUEVO Y LO INSERTAMOS EN UN NUEVO CANVAS RECORTANDO LA IMAGEN SOBRANTE
        var canvas2 = document.getElementById('background');
        var context = canvas2.getContext("2d");
        canvas2.setAttribute("class" ,"canvas");
        canvas2.height = parseInt(y-yA);
        canvas2.width =  parseInt(x-xA);
        canvas2.fill =  "black";
        var image = new Image();
        image.src = value;
        image.onload = function(){
           context.drawImage(image,-parseInt(xA), -parseInt(yA));
           getFinal();
           function getFinal() {
        	   // COMPROBAMOS HASTA QUE NOS ASEGURAMOS QUE LA IMAGEN ESTÃ INSERTADO EN EL CANVAS BACKGROUND (LA IMAGEN FINAL)
        	   if ( $("#background").length ) {
	        	   
        		    // OBTENEMOS LA IMAGEN DEL CANVAS (BASE 64)
	        	    resultCanvasFinal = document.getElementById('background');
		            imagenFinal  = resultCanvasFinal.toDataURL("image/png");  
			        
			        
		            // RESTAURAMOS LOS VALORES HTML DONDE UTILIZAMOS LA HERRAMIENTA DEFORMAR (LOS BOTONES DE GUARDAR, CANCELAR, VACIAR LOS CANVAS, LA IAMGEN...)
			        $("#container").html('<div id="guardar">Guardar</div><div id="cancelar">Cancelar</div> <canvas id="background"></canvas>  <img id="screen" src=""> <canvas width="500" height="507" id="screenCanvas"></canvas> <svg width="500" height="507" id="controlHandles"></svg>');
			        
			        
			        // A PARTIR DEL OBJETO QUE DEFORMAMOS, CALCULAMOS Y COLOCAMOS LAS NUEVAS MEDIDAS (TOP, LEFT, ANCHO, ALTO, ESCALA, ANGULO) Y LO HACEMOS VISIBLE
			        activeObject.set("src", imagenFinal); 
					activeObject.setSrc(imagenFinal  , function(img) {

						// CAMBIO DE LA ESCALA Y VISIBILIDAD
				        activeObject.set("scaleX", 1);
				        activeObject.set("scaleY", 1);
						activeObject.set("visible", true);

					    var top = activeObject.get("top");
					    var left = activeObject.get("left");
					    var widthA = activeObject.get("width")/canvasZoom;
					    var heightA = activeObject.get("height")/canvasZoom;
						// CAMBIO DEL ANCHO Y ALTO DE LA IMAGEN
				        activeObject.setAngle(0); 
			        	activeObject.set("width", widthA);
			        	activeObject.set("height", heightA);
 
				        // EN FUNCIÃ“N DE SI ESTÃ DESPLAZADO EL CANVAS TIENE DIFERENNTES TOP O LEFT
				        if(lastClientX==undefined) {
				        	activeObject.set("top", parseInt(yA)/canvasZoom);
				        	activeObject.set("left", parseInt(xA)/canvasZoom);
				        } else {
				        	if(canvasZoom!=1) {
				        		// SI TIENE ZOOM
				        		activeObject.set("top", top);
				        		activeObject.set("left", left);
				        	} else {
				        		activeObject.set("top", parseInt(yFinal));
				        		activeObject.set("left", parseInt(xFinal));
				        	}
				        }
				        canvas.renderAll();
				        // REACTIVAMOS EL OBJETO ORIGINAL
				        canvas.deactivateAll().renderAll();
				        canvas.setActiveObject(activeObject);

				        // SI EL ITEM ESTÃ VOLTEADO LO VOLTEAMOS, PORQUE LA IMAGEN QUE GENERA NO TIENE EN CUENTA EL VOLTEO
				        if(activeObject.get("flipX") && activeObject.get("flipY")) {
				        	canvas.getActiveObject().toggle('flipX'); 
				        	canvas.getActiveObject().toggle('flipY'); 
				        } else if(activeObject.get("flipX")) {
				        	canvas.getActiveObject().toggle('flipX'); 
				        } else if(activeObject.get("flipY")) {
				        	canvas.getActiveObject().toggle('flipY'); 
				        }

				        // AÃ‘ADIMOS ESTE NUEVO PASO A REHACER, DESACER
				         
						canvas.renderAll();
					    
						document.getElementById('imageData_Fondos').value = imagenFinal;
				    	document.getElementById('itemtitulo_Fondos').value = activeObject.get("title");
				    	document.getElementById('itemetiquetas_Fondos').value = activeObject.get("tags");
				    	document.getElementById('itemprecio_Fondos').value = activeObject.get("price");
				    	document.getElementById('itemurl_Fondos').value = activeObject.get("src");
				    	document.getElementById('itemsrc_Fondos').value = activeObject.get("url");

				    	document.getElementById('item_id_ldlc_Fondos').value = activeObject.get("id");
				    	document.getElementById('item_id_ldlc_tipo').value = "-3";
				    	
				    	  
				    	document.getElementById('senditemfromfondos').submit(); 
				    	
					    });	    
			        
					
			        
			        // ELIMINAMOS EL BOTON CARGANDO Y CAMBIAMOS EL INDEX DEL CANVAS QUE DEFORMA
			        $("#screenCanvas").css("z-index", "0"); 
		        	//$('#cargando').modal('hide'); 
			        $(document.body).css({ 'cursor': 'default' });
			        
			        
			        
			        
			        
	     	   } else { setTimeout(function(){ getFinal(); }, 1000);  }
		        
           }
        }
        }
		
		
	}
}

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
	var textColor  = document.getElementById('text-lines-color').value;
	var BgColor= $('input:checkbox[name=checkSinFondo]:checked').val();
	if(BgColor!=undefined) {
		if(BgColor=="on"){
			textBgColor="transparent";
		}
	}
	var fontSize = document.getElementById('text-font-size').value;
	var lineHeight = document.getElementById('text-line-height').value;
	var charSpacing = document.getElementById('text-char-spacing').value;
	
	
	var thetext = new fabric.IText(text, {
	      left: 100,
	      top: 150,
	      fontFamily: fontFamily,
	      fill: textColor,
	      textBackgroundColor:textBgColor,
	      fontSize: fontSize,
	      lineHeight: lineHeight,
	      charSpacing: charSpacing

	    });
	
	canvas.add(thetext);
	totalFromCanvas(); 
    cerramosONo=true;
}

function exportImage(){
    if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      }
      else {
        fabric.Image.fromURL(canvas.toDataURL(), function(img) {
              canvas.add(img);
              img.bringToFront();
              canvas.renderAll();
              state.recompute = true;
          },{ crossOrigin: 'Anonymous' });
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

function getObjectFromCanvasById2(id) {
	var activeObject = CanvasById(id);  
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
	canvas.renderAll();
}
var beforeId=1;
var j=-1;
function CanvasById(id) {
    const canvasObject = window.canvas.getObjects().filter((item) => {
        return item.id === parseInt(id)
        
    }) 
    var valor="";
    calcObjectId(id);
    function calcObjectId(idN){ 
    	j++;
	    if(beforeId==idN || j==0) {  
	    	if (j<=canvasObject.length-1){
	    		if(canvasObject[j].left<90000) {
			        beforeId=idN; 
			    	valor = canvasObject[j];
	    		} else { 
	    			calcObjectId(idN);
	    		}
	    	} else if(canvasObject.length-1<j){ 
			        beforeId=idN;
			        j=0;
			        valor = canvasObject[0]; 
	    	}
	    }  else { 
	        beforeId=idN;
	        j=0;
	        valor = canvasObject[0];
	    }
    }
    return valor;
}
function getObjectFromCanvasById(id) {
    const canvasObject = window.canvas.getObjects().filter((item) => {
        return item.id === parseInt(id)
        
    })
    
    return canvasObject[0]
}
function eliminarItems(id){
	
	var totalItems=$("#totalItem"+id).val(); 
	while(totalItems>=1){
		var bandera=false;  
		var activeObject = getObjectFromCanvasById(id);

		activeObject.remove(); 
		totalItems--;
	    totalFromCanvas();
	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));
	    stateJson++;lastJSONState[stateJson]=json;
	    document.getElementById('json').value = json;
		canvas.renderAll();
		listaItemsCargar();
	}    
	cerramosONo=true;
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
        totalFromCanvas();
	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
		stateJson++;lastJSONState[stateJson]=json;
	    document.getElementById('json').value = json;
		canvas.renderAll();
		listaItemsCargar();
    }
    else if (activeObject) {
    	longitud=activeObject.canvas._objects.length;
    	var j=0;
    	var invisibles=0;
    	var visibles=0;
    	for(i=0;i<longitud;i++){ 
    		if(activeObject.canvas._objects[i].id==activeObject.id){
    			if(activeObject.canvas._objects[i].left>90000){
    				invisibles++;
    			} else {
    				visibles++;
    			}
    			j++;
    			
    		}
    	} 
    	if(visibles>=2){
    		canvas.remove(activeObject);
    		//actualizo precio y json hidden
    	    totalFromCanvas();
    	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
    		stateJson++;lastJSONState[stateJson]=json;
    	    document.getElementById('json').value = json;
    		canvas.renderAll();
    		listaItemsCargar();
    	} else if(invisibles==0){
    		canvas.remove(activeObject);
    		//actualizo precio y json hidden
    	    totalFromCanvas();
    	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
    		stateJson++;lastJSONState[stateJson]=json;
    	    document.getElementById('json').value = json;
    		canvas.renderAll();
    		listaItemsCargar();
    	} else { 
    		var totalItems=$("#totalItem").val(); 
    		while(totalItems>=-1){
				var bandera=false;
				var activeObject = canvas.getActiveObject();
				for(var k=activeObject.canvas._objects.length-1;k>=0;k--){ 
					if(activeObject.canvas._objects[k].id==activeObject.id && bandera==false){ 
						if(activeObject.canvas._objects[k].left>90000){
							canvas.deactivateAll().renderAll();
							canvas.setActiveObject(canvas.item(k)); 
							canvas.getActiveObject().remove(); 
							canvas.setActiveObject(activeObject); 
							bandera=true; 
						}  
					}  
				}  
				totalItems--;
				//actualizar precio y json hidden 
				canvas.renderAll();
			}  
    		canvas.remove(activeObject);
    		//actualizo precio y json hidden
    	    totalFromCanvas();
    	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
    		stateJson++;lastJSONState[stateJson]=json;
    	    document.getElementById('json').value = json;
    		canvas.renderAll();
    		listaItemsCargar();
    	}
        
    } 
    
	cerramosONo=true;
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


var canvasZoom=1;
function zoomMore() {
    var factor=1.3;
    canvasZoom=canvasZoom+0.1;
    if(canvasZoom>=1.5) canvasZoom=1.5;
    canvas.setZoom(canvasZoom);

    //¿scroll?
    //canvas.setWidth(originalWidth * canvas.getZoom());
    //canvas.setHeight(originalHeight * canvas.getZoom());
}

function zoomLess() {
    var factor=0.7;
    canvasZoom=canvasZoom-0.1;
    if(canvasZoom<=0.6) canvasZoom=0.6;
    canvas.setZoom(canvasZoom);

  //  canvas.setZoom(factor);
}

function showRemoveTools(id){

    style = getComputedStyle(document.getElementById(id));
    if(style.display =='block'){
        document.getElementById(id).className = 'ocultar';
    }else{
        document.getElementById(id).className = 'mostrar toolscontainer-all';
    }
}

function putZero(){
	$("#totalItem").val(0);
}
var subiritem=true;

function modalCompra(){
	var lista=""; 
	var j=0;
	var totalFinal=0;
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');   
	lista+='<div style="overflow-y: scroll;height:400px;width:98%">';
	lista+='<div class="imagenPopUp5">'; 
	lista+='		<div style="padding:0;margin-bottom:5px;float:left;width:100%"><div style="width:50%;text-align:left;float:left">PRODUCTOS</div><div style="width:50%;text-align:right;float:left">CANTIDAD Y PRECIO</div></div>';  
	lista+='</div>';
	totalCompra=$('#total_lista_precio').text();
	 
	$.each(g, function(i, item) {
			style=""; 
			j++; 

		if(item[0].text==undefined && item[0].price>0) {
			var img = new Image();
			img.src = item[0].src; 
			if(img.width>img.height){
				style="height:100%;width:auto;";
			} else {
				style="width:100%;height:auto;";
			} 
			tiendaEnlace=item[0].url;
			array = ['http://', 'https://', 'http://www.', 'https://www.', 'www.'];
			array2 = ['.com', '.net', '.info', '.es', '.org', '.biz'];
			protocolos = new RegExp( array.join( '|' ), 'g' );
			terminaciones = new RegExp( array2.join( '|' ), 'g' );
		    url = tiendaEnlace.replace(protocolos, '');
		    url = url.replace(terminaciones, 'FIN'); 
		    url = url.split('FIN');
		    if(url[0]==""){
		    	urltienda="No disponible tienda";
		    } else {
		    	urltienda=url[0];
		    }
		    
			total=item[0].price*item.length; 
			total2=parseFloat(total).toFixed(2);  
			lista+='<div class="altoLista">';
			lista+='	<div class="imagenPopUp">';
			lista+='		<img style="width:95%;margin:2%;margin-left:0;margin-right:5%" src="'+item[0].src+'" alt="item'+i+'"/> '; 
			lista+='	</div>'; 
			lista+='	<div class="imagenPopUp2">'; 
			lista+='		<input  style="width:100%;margin-left:0;" readonly class="inputLista letra-xs puntos" type="text" name="fname2" value="'+item[0].title+'"/>'; 
			lista+='		<input  style="width:100%;margin-left:0;" readonly class="inputLista letra-xs puntos" type="text" name="fname2" value="'+urltienda+'"/>'; 
			lista+='		<input  style="width:100%;margin-left:0;" readonly class="inputLista letra-xs puntos" type="text" name="fname2" value="'+parseFloat(item[0].price).toFixed(2)+'&#8364;"/>'; 
			lista+='	</div>'; 
			lista+='<div class="imagenPopUp3">'; 
			lista+='		<input  style="width:100%;margin-bottom:6%" readonly class="inputLista  letra-xs text-center desplazar" type="text" name="fname2" value="'+item.length+'"/>';
			lista+='		<input  style="width:100%;margin-bottom:6%" readonly class="inputLista  letra-xs text-center desplazar" type="text" name="fname2" value="'+total2+'&#8364;"/>'; 
			lista+='</div>';
			lista+='</div>'; 
		}
	
	});  
	lista+='<div class="imagenPopUp4">'; 
	lista+='		<div style="padding:0;margin-top:15px;float:left;width:98%"><div style="width:50%;text-align:left;float:left">TOTAL</div><div style="width:50%;text-align:right;float:left">'+totalCompra+'&#8364;</div></div>';  
	lista+='</div>';
	lista+='</div>';
	$('.listaCompra').html(lista); 
	
}
function listaItemsCargar(){
	var lista="";   
	var j=0;
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');    
	lista+='<div style="width:100%;padding:0;float:left">';
	var div_alto = $("#menumiselementos").height(); 
	if(div_alto<380){div_alto=380; }
	j;
	$.each(g, function(i, item) {
			style=""; 
			j++;
		
		if(item[0].text==undefined) {
			lista+='<div class="cuadroLI">'; 
			lista+='<div class="imagenItems">';
			precioItem=parseFloat(item[0].price);
			if(item[0].visible==true) {
				lista+='<div style="width:19%;float:left;height: 24px;border-right:1px solid black;border-bottom:1px solid black;text-align:center;background-color:white"><img  onclick="visibleItem('+item[0].id+')" src="img/visible.svg" alt="Hacerlo invisible" title="Hacerlo invisible" style="cursor:pointer;height:19px;padding-top:0px;padding-left:0px;"/></div>';
			}else {
				lista+='<div style="width:19%;float:left;height: 24px;border-right:1px solid black;border-bottom:1px solid black;text-align:center;background-color:white"><img  onclick="invisibleItem('+item[0].id+')" src="img/no-visible.svg" alt="Hacerlo visible" title="Hacerlo visible" style="cursor:pointer;height:19px;padding-top:0px;padding-left:0px;"/></div>';
			} 
				lista+='<div style="width:19%;float:left;height: 24px;border-right:1px solid black;border-bottom:1px solid black;text-align:center;background-color:white"><img  onclick="getObjectFromCanvasById2('+item[0].id+')" src="img/seleccionar.svg" alt="Seleccionar item por orden de colocaci&oacute;n" title="Seleccionar item por orden de colocaci&oacute;n" style="cursor:pointer;height:19px;padding-top:0px;padding-left:0px;"/></div>';
			 
			lista+='<div style="width:19%;height: 24px;float:left;;border-right:1px solid black;border-bottom:1px solid black;text-align:center;background-color:white"><a href="'+item[0].url+'" target="_blank" title="Ir a la página del producto"><img src="img/ver-mas.svg" alt="Ir a la p&aacute;gina del producto" title="Ir a la p&aacute;gina del producto" style="cursor:pointer;height:19px;padding-top:0px;padding-left:0px;"/></a></div>';
			lista+='<div style="width:19%;float:left; border-bottom:1px solid black;border-right:1px solid black;text-align:center;background-color:white;height: 24px;"><img src="img/cerrar.svg" alt="Eliminar el producto" onclick="eliminarItems('+item[0].id+')" title="Eliminar el producto" style="cursor:pointer;height:13px;padding-top:0px;padding-left:2px;"/></div>';
	
			if(item[0].bloqueo==undefined || item[0].bloqueo=="false") {
				lista+='<div style="width:20%;float:left; border-bottom:1px solid black;text-align:center;background-color:white;height: 24px;"><img class="bloquear" src="img/bloquear.svg" alt="Bloquear el producto" onclick="bloquearItems('+item[0].id+')" title="Bloquear el producto" style="cursor:pointer;height:13px;padding-top:0px;padding-left:2px;"/>';
			}else {
				lista+='<div style="width:20%;float:left; border-bottom:1px solid black;text-align:center;background-color:white;height: 24px;"><img class="bloquear" src="img/bloqueado.svg" alt="Bloquear el producto" onclick="desbloquearItems('+item[0].id+')" title="Bloquear el producto" style="cursor:pointer;height:13px;padding-top:0px;padding-left:2px;"/>';
			}
			if(item[0].imagenOriginal!=undefined) { imgSRC=item[0].imagenOriginal; }
			else { imgSRC=item[0].src; }
			lista+='</div><div class="cuadroImg">';
			lista+='<img style="'+style+';background-color:white;max-height:110px;background-color:white; margin: 0 auto;vertical-align: middle;" src="'+imgSRC+'" alt="item'+i+'"/></div>';
			lista+='</div>';
			lista+='<div class="letra-xs letra-mayusculas" style="padding-left:4px;border-top:1px solid black;background-color:white;overflow: hidden"><div style="width:9%;float:left"><img src="img/izquierda.jpg"  onclick="deleteitem('+item[0].id+')" alt="Quitar un producto"  title="Quitar un producto" style="cursor:pointer;height:8px;padding-top:8px;padding-left:1px;"/></div><input id="totalItem'+item[0].id+'" title="N&uacute;mero de items" style="padding-top:5px;font-size:9px;width:12%;margin-bottom:0;text-align:center;float:left" type="text" value="'+item.length+'" readonly/><div style="width:9%;float:left;"><img src="img/derecha.jpg" onclick="additem('+item[0].id+')" alt="A&ntilde;adir un producto" title="A&ntilde;adir un producto"  style="cursor:pointer;height:8px;padding-top:8px;padding-left: 0px;"/></div><div style="float:left;padding-left: 1px; padding-right:5px; padding-top: 3px;font-size: 18px;">|</div><input id="totalPrecioItem'+item[0].id+'" style="padding-left:0;padding-top:4px;padding-bottom:3px;margin-top:5px;height:10px;border:1px solid black;padding-right:0;font-size:9px;width:39%;margin-bottom:0;text-align:center;float:left" onblur="valorItem('+item[0].id+')" class="precio" name="totalPrecioItem" type="text" value="'+parseFloat(precioItem).toFixed(2)+'"/><div style="padding-top:5px;padding-left:2px;width:auto;float:left;text-aling:right;font-size:10px;">&#8364</div></div></div>';
		}
		
	}); 
	if(j==1 && subiritem && div_alto>380) {
		var movi2=""; 
		var str = $(".listaItems").css("margin-top");
		var altura2 = $(".listaItems").height();
		alturaFinal=str.substr(0, str.length-2);
		alturaFinal=Math.trunc(alturaFinal);
		alturaFinal2=Math.trunc(altura2);
		var altura2 = alturaFinal; 
		function movimiento(){
			if(alturaFinal<altura2-200){
				clearInterval(movi);
				movi2 = setInterval(movimiento2, 10);
			}  
			alturaFinal=alturaFinal-2; 
			alturaFinal2=alturaFinal2+2;
			$('.listaItems').css("margin-top", alturaFinal+"px"); 
			$('.listaItems').css("height", alturaFinal2+"px"); 
		} 
		function movimiento2(){
			if(alturaFinal>altura2){
				clearInterval(movi2); 
			}  
			alturaFinal=alturaFinal+4;
			if(alturaFinal2>=altura2) { alturaFinal2=alturaFinal2-4; } else {
				 alturaFinal2=alturaFinal2-2;
			}
			$('.listaItems').css("margin-top", alturaFinal+"px"); 
			$('.listaItems').css("height", alturaFinal2+"px"); 
		} 
		subiritem=false;

		var movi = setInterval(movimiento, 10);
		 
	}
	lista+='</div>'; 
	lista+='<div style="width:100%;padding:0;float:left"><a class="letra-s boton"  data-toggle="modal" style="width:150px;margin-left:1%;" data-target="#modal-lista" onclick="modalCompra()">Lista de la compra</a></div>'; 
	$('.listaItems').html(lista); 

	$( ".precio" ).focus(function() { 
		canvas.deactivateAll().renderAll();
	});

}


function todoDesbloqueado(){ 
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {  
		if(item[0].text==undefined) {
			var activeObject = funcionGetElementCustom(item[0].id);  
			for(j=0;j<Object.keys(item).length;j++){ 
				
				canvas.deactivateAll().renderAll();
				activeObject[j].set("bloqueo", "false");
				activeObject[j].lockMovementX = false;
				activeObject[j].lockMovementY = false;

				activeObject[j].lockScalingX = false;
				activeObject[j].lockScalingY = false;

				activeObject[j].lockRotation = false;

				activeObject[j].hasControls = true;
				activeObject[j].hasBorders = true;
				activeObject[j].selectable = true;
				canvas.renderAll(); 
			}
			}
	})
	 
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;

}
function bloquearItems(id){

	var totalItems=$("#totalItem"+id).val(); 
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {
		if(item[0].text==undefined) {
		if(i==id) {
			var activeObject = funcionGetElementCustom(id);
			for(j=0;j<Object.keys(item).length;j++){ 
				canvas.deactivateAll().renderAll();
				activeObject[j].lockMovementX = true;
				activeObject[j].lockMovementY = true;


				activeObject[j].set("bloqueo", "true");
			    
			    
				activeObject[j].lockScalingX = true;
				activeObject[j].lockScalingY = true;

				activeObject[j].lockRotation = true;

				activeObject[j].hasControls = false;
				activeObject[j].hasBorders = false;
				activeObject[j].selectable = false;
				canvas.renderAll(); 
			}
			 
		} 
		}
	})
	$('.bloquear').attr("src","img/bloqueado.svg");
	
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	listaItemsCargar();
}
function desbloquearItems(id){
	var totalItems=$("#totalItem"+id).val(); 
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {
		if(i==id) {
			var activeObject = funcionGetElementCustom(id); 
			
			for(j=0;j<Object.keys(item).length;j++){ 
				canvas.deactivateAll().renderAll();
				activeObject[j].set("bloqueo", "false");
				activeObject[j].lockMovementX = false;
				activeObject[j].lockMovementY = false;

				activeObject[j].lockScalingX = false;
				activeObject[j].lockScalingY = false;

				activeObject[j].lockRotation = false;

				activeObject[j].hasControls = true;
				activeObject[j].hasBorders = true;
				activeObject[j].selectable = true;
				canvas.renderAll(); 
			}
			 
		} 
	})
	
	$('.bloquear').attr("src","img/bloquear.svg");
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	listaItemsCargar();
}

function deleteitem(id){
	var activeObject = getObjectFromCanvasById(id); 
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
	var j=0;
	for(i=0;i<longitud;i++){
		if(activeObject.canvas._objects[i].id==activeObject.id){
			j++;
		}
	}
	var totalItems=$("#totalItem"+id).val();
    j=j+1;
	
	while(j>totalItems){
		var bandera=false;
		var activeObject = canvas.getActiveObject();
		for(var k=activeObject.canvas._objects.length-1;k>=0;k--){ 
			if(activeObject.canvas._objects[k].id==activeObject.id && bandera==false){ 
				if(activeObject.canvas._objects[k].left>90000){
					canvas.deactivateAll().renderAll();
					canvas.setActiveObject(canvas.item(k)); 
					canvas.getActiveObject().remove(); 
					canvas.setActiveObject(activeObject); 
					bandera=true; 
				}
			}
		}
		
		j--;
		//actualizar precio y json hidden
	    totalFromCanvas();
	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));
	    document.getElementById('json').value = json; 
		canvas.renderAll();
	}
	
	cerramosONo=true;
	listaItemsCargar();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
}

function additem(id){

	var activeObject = getObjectFromCanvasById(id); 
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
	var j=0;
	for(i=0;i<longitud;i++){
		if(activeObject.canvas._objects[i].id==activeObject.id){
			j++;
		}
	}
	var totalItems=$("#totalItem"+id).val();
	var object = fabric.util.object.clone(canvas.getActiveObject());
    object.set("top", object.top+90000);
    object.set("left", object.left+90000);
    object.set("items", object.items+1);
    canvas.add(object);
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id']));  
	stateJson++;lastJSONState[stateJson]=json;
    document.getElementById('json').value = json; 
	canvas.renderAll();
	listaItemsCargar();
	cerramosONo=true;
}


function funcionGetElementCustom(myID) {
    var objectList  = [],
        objects = canvas.getObjects(); 
    for (var i = 0, len = canvas.size(); i < len; i++) {
        if (objects[i].id && objects[i].id=== myID) {
        	objectList.push(objects[i]); 
        }
    }
    return objectList;
};
function valorItem(id){
	
	 
	 
	var precioTotal=$("#totalPrecioItem"+id).val();
	precioTotal=precioTotal.replace(",", ".");
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {  
		 
		if(i==id) {
			var activeObject = funcionGetElementCustom(id); 
			canvas.deactivateAll().renderAll(); 
			for(j=0;j<activeObject.length;j++){ 
					activeObject[j].set("price", precioTotal);   
					canvas.renderAll(); 
			        //actualizar precio y json hidden
			}
			 
		} 
	
	});  
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
    document.getElementById('json').value = json; 
	listaItemsCargar();
	cerramosONo=true;	 
}
function visibleItem(id){
	
	
	 
	 var totalItems=$("#totalItem"+id).val(); 
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {  
		 
		if(i==id) { 

			var activeObject = funcionGetElementCustom(id);
			for(j=0;j<Object.keys(item).length;j++){ 
				canvas.deactivateAll().renderAll();
				activeObject[j].set("visible", false);   
				canvas.renderAll(); 
			}
			 
		} 
	
	});  
    //actualizar precio y json hidden
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json; 
    document.getElementById('json').value = json; 
	listaItemsCargar();
	cerramosONo=true;	 
}
function invisibleItem(id){
	
	var totalItems=$("#totalItem"+id).val(); 
	objson = JSON.parse(document.getElementById('json').value); 
	var g = _.groupBy(objson.objects, 'id');
	$.each(g, function(i, item) {  
		 
		if(i==id) { 

			var activeObject = funcionGetElementCustom(id);
			for(j=0;j<Object.keys(item).length;j++) {
				canvas.deactivateAll().renderAll();
				activeObject[j].set("visible", true);   
				canvas.renderAll();
			}
			
		}
	
	});  
    //actualizar precio y json hidden
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json; 
    document.getElementById('json').value = json;  
	listaItemsCargar();
	cerramosONo=true;
}
function checkRadioButtons(espacio) {
	$('.img_border').css("outline","rgb(0, 0, 0) solid 0");
	$("#"+espacio+" img").css("outline", "rgb(0, 0, 0) solid 1px");
	a=1;
	addHabitacion(espacio);
} 
function verify() {
	if(nextPaso==1){
		todoDesbloqueado();
		document.formsave.submit();
	} else if(nextPaso==2){
		console.log("Error al guardar la imagen"); 
	} else {
		setTimeout(function(){ verify() }, 500);
	}
}
function addHabitacion(espacio){
	 var id_ldlc=document.getElementById('item_id_ldlc').value;
	 try {
	  		$.ajaxSetup({
	  			scriptCharset : "utf-8",
	  			contentType : "application/json; charset=utf-8"
	  		});

	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

	  			data : {
	  				token : "token",
	  				id: id_ldlc,
	  				action : "ldlc_habitacion",
					espacio: espacio,
	  					
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$(document.body).css({'cursor' : 'default'});
	  				} else {
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		$(document.body).css({'cursor' : 'default'});
	  	}
}
var banderaNombre=true;
function addNombre(){
	 banderaNombre=true;
	 var nombre=$('.letra-xxxs').val();
	 try {
	  		$.ajaxSetup({
	  			scriptCharset : "utf-8",
	  			contentType : "application/json; charset=utf-8"
	  		});

	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

	  			data : {
	  				token : "token",
	  				id: id_ldlc,
	  				action : "ldlc_habitacion",
					nombre: nombre
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$(document.body).css({'cursor' : 'default'});
	  				} else {
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		$(document.body).css({'cursor' : 'default'});
	  	}
}



function addEtiquetas(){
	
	 var id_ldlc=document.getElementById('item_id_ldlc').value;
	 var arrayDeEtiquetas=[];
	 if(document.getElementById('cb1').checked){
		 arrayDeEtiquetas.push(1);
	 }
	 if(document.getElementById('cb2').checked){
		 arrayDeEtiquetas.push(2);
	 }
	 if(document.getElementById('cb3').checked){
		 arrayDeEtiquetas.push(3);
	 }
	 if(document.getElementById('cb4').checked){
		 arrayDeEtiquetas.push(4);
	 }
	 if(document.getElementById('cb5').checked){
		 arrayDeEtiquetas.push(5);
	 }
	 if(document.getElementById('cb6').checked){
		 arrayDeEtiquetas.push(6);
	 }
	 if(document.getElementById('cb7').checked){
		 arrayDeEtiquetas.push(7);
	 }
	 if(document.getElementById('cb8').checked){
		 arrayDeEtiquetas.push(8);
	 }
	 if(document.getElementById('cb9').checked){
		 arrayDeEtiquetas.push(9);
	 } 
	 var etiquetasJSON=  JSON.stringify(arrayDeEtiquetas);
	 
	 try {
	  		$.ajaxSetup({
	  			scriptCharset : "utf-8",
	  			contentType : "application/json; charset=utf-8"
	  		});

	  		$.ajax({
	  			// /type:"POST",
	  			dataType : "json",
	  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
	  			url : urlbaseForAjax + '/DecoradoresController',
	  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

	  			data : {
	  				token : "token",
	  				id: id_ldlc,
	  				action : "ldlc_etiquetas",
 					etiquetasJSON: etiquetasJSON,
	  					
	  			},
	  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
	  			contentType : "application/json; charset=utf-8",
	  			success : function(data) {
	  				
	  				if (isError(data)) {
	  					BootstrapDialog.alert(data);
	  					$(document.body).css({'cursor' : 'default'});
	  				} else {
	  					 
	  				}

	  			}
	  		});

	  	} catch (e) {
	  		BootstrapDialog
	  				.alert('Se ha producido un error en la conexión con el servidor');
	  		// put any code you want to execute if there's an exception here
	  		$(document.body).css({'cursor' : 'default'});
	  	}
}
let dragMode = false;
function dragmode(){ 
	  dragMode = !dragMode;
	  if(dragMode){
		  $('#dragmode img').attr("src", "img/mano-cerrada.svg");
	  }
	  if(dragMode==false){
		  $('#dragmode img').attr("src", "img/mano.svg");
	  }
	  canvas.toggleDragMode(dragMode);
}

var activeObj="";
var isCtrl=false;
$(document).ready(function(){ 
	 
	function PulsarTecla(event){
	    tecla = event.keyCode;
	    if(tecla==46 || tecla==8){
	    	removeSelected();
	    }
	    if(tecla == 16) { isShift=true; }
	    if(tecla == 17) { isCtrl=true; }
	    if(tecla == 90 && isCtrl == true) {
	    	undo(); 
	    	return false;
	    }

	    if(tecla == 89 && isCtrl == true) {
	    	redo();
	    	return false;
	    } 
	    if(tecla == 89 && isCtrl == true && isShift == true) {
	    	redo();
	    	return false;
	    } 
	}

	$('#enviarAtras').click(function() { 
		
        var activeObject=canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
            canvas.renderAll();
            }

        var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
    	stateJson++;lastJSONState[stateJson]=json;
    	document.getElementById('json').value = json;
    });


	$('#enviarAdelante').click(function() { 
	    var activeObject=canvas.getActiveObject();
        var elementos=canvas.getObjects().length;  
    	var zindex = canvas.getObjects().indexOf(activeObject);
    	zindex=zindex+elementos; 
	    if (activeObject) {

        	activeObject.moveTo(zindex);
	        canvas.renderAll();
	        }
	    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
		stateJson++;lastJSONState[stateJson]=json;
		document.getElementById('json').value = json;

     });
	/* 
	window.onkeypress=PulsarTecla3;
	function PulsarTecla3(event){
	    if(tecla == 32) {  
	    	dragmode(); 
	    } 
	}*/
	function PulsarTecla2(event){
	    tecla = event.keyCode;
	    if(tecla == 17) { 
	    	isCtrl=false; 
	    }
	    if(tecla == 16) { 
	    	isShift=false; 
	    } 
	    /*if(tecla == 32) { 
	    	dragmode();
	    }  */
	}
 
	
	$('#cuadroitems').bind('mousewheel', function(e) {
		
		var scrollTo = null;
	    if (e.type == 'mousewheel') {
	        scrollTo = (e.originalEvent.wheelDelta * -1);
	    }
	    else if (e.type == 'DOMMouseScroll') {
	        scrollTo = 40 * e.originalEvent.detail;
	    }
	    if (scrollTo) {
	        e.preventDefault();
	        $(this).scrollTop(scrollTo + $(this).scrollTop());
	    } 
		var obj=$(".objetoRaton").val();
	    if(e.originalEvent.wheelDelta / 120 > 0) {
	    	// rueda ratón adelante
	    	if(numero_paginas>page+1) {
	    		getItems(page+1, 1, idDecorador, donde, tags);
	    	}
	    } else {
	    	// rueda ratón atrás
	    	if(page>0) {
	    		getItems(page-1, 1, idDecorador, donde, tags);
	    	}
	    }
	});
	 
	$('#cuadroitemstodos').bind('mousewheel', function(e) {
		
		var scrollTo = null;
	    if (e.type == 'mousewheel') {
	        scrollTo = (e.originalEvent.wheelDelta * -1);
	    }
	    else if (e.type == 'DOMMouseScroll') {
	        scrollTo = 40 * e.originalEvent.detail;
	    }
	    if (scrollTo) {
	        e.preventDefault();
	        $(this).scrollTop(scrollTo + $(this).scrollTop());
	    }
	    
	    var obj=$(".objetoRaton").val();
	    if(e.originalEvent.wheelDelta / 120 > 0) {
	    	// rueda ratón adelante
	    	if(numero_paginas>page+1) {
	    		getItems(page+1, 1, idDecorador, donde, tags);
	    	}
	    } else {
	    	// rueda ratón atrás
	    	if(page>0) {
	    		getItems(page-1, 1, idDecorador, donde, tags);
	    	}
	    }
	});
	
	$("#cb1, #cb2, #cb3, #cb4, #cb5, #cb6, #cb7, #cb8, #cb9").on('click', function() {
		addEtiquetas();
	});
	$(".cargarEligiendoBorradores").on('click', function() {
		$('.modal').modal('hide');
		$('.modal-hacer').modal('show');
	});
	$(".cargarEligiendoPropuesta").on('click', function() {
		setTimeout(function(){	$('#cargando').modal('show'); }, 1000); 
	});
	$(".cargarBorradores").on('click', function() {
			$('.modal').modal('hide');
			$('#cargando').modal('show');
	});
	$("#btncreateldlc").on('click', function() {
		$('.modal').modal('hide');
		$('#cargando').modal('show');
	});
	$(".guardarFondoFinal").on('click', function() {
		if($(".guardarFondoFinal").attr("onclick")!=""){
			$('.modal').modal('hide');
			$('#cargando').modal('show');
		}
	});

	window.onkeydown=PulsarTecla;
	window.onkeyup=PulsarTecla2;
	
	$(".letra-xxxs").change(function(){
		if(banderaNombre==true){
		    banderaNombre=false;
			setTimeout(function(){  
					addNombre();
			}, 100);
		}
    }); 
	
	
	
	
	
	 $("#itemimagefile").change(function(){
         parts = $("#itemimagefile").val().split('\\');
         name_f = parts.pop();
         $("#imgSubir").attr("src","img/check.png"); 
         document.getElementById("nombre_archivo").value="Archivo subido: "+name_f;
         
         
         
     });
	
	canvas.on('object:selected', function(o) {
		var activeObject = canvas.getActiveObject();
		activeObj = o.target; 
		if(activeObj.get('type') == 'group') {
		     activeObj.set({transparentCorners: false,cornerSize : 10, cornerShape: 'circle', strokeLineJoin: 'round', cornerColor : '#BEC4C1','borderColor':'#BEC4C1','cornerColor':'#BEC4C1'});
		     
		 }
		if(activeObject){
		longitud=activeObject.canvas._objects.length;
			activeObject.set({transparentCorners: false,cornerSize : 10, cornerShape: 'circle', strokeLineJoin: 'round', cornerColor : '#BEC4C1','borderColor':'#BEC4C1','cornerColor':'#BEC4C1'});
		var j=0;
		for(i=0;i<longitud;i++){
			if(activeObject.canvas._objects[i].id==activeObject.id){
				j++;
			}
		}
		$("#totalItem").val(j);
		}
	})
	
	$( ".input-box" ).focus(function() { 
		canvas.deactivateAll().renderAll();
	});
	
	$("input[name=items]").change(function(){
		
		var activeObject = canvas.getActiveObject();  
	    if (activeObject) { 
	    	longitud=activeObject.canvas._objects.length;
	    	 
			var j=0;
			for(i=0;i<longitud;i++){
				if(activeObject.canvas._objects[i].id==activeObject.id){
					j++;
				}
			}
			var totalItems=$("#totalItem").val(); 
			if(totalItems>j){
		    	while(totalItems>j){ 
			    	var object = fabric.util.object.clone(canvas.getActiveObject());
			        object.set("top", object.top+90000);
			        object.set("left", object.left+90000);
			        object.set("items", object.items+1);
			        canvas.add(object);
			        j++; 
			        //actualizar precio y json hidden
				    totalFromCanvas();
				    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo'])); 
					stateJson++;lastJSONState[stateJson]=json;
				    document.getElementById('json').value = json; 
				    listaItemsCargar();
					canvas.renderAll();
					cerramosONo=true;
		    	}   
			} else if(totalItems>=1){  
				while(j>totalItems){
					var bandera=false;
					var activeObject = canvas.getActiveObject();
					for(var k=activeObject.canvas._objects.length-1;k>=0;k--){ 
						if(activeObject.canvas._objects[k].id==activeObject.id && bandera==false){ 
							if(activeObject.canvas._objects[k].left>90000){
								canvas.deactivateAll().renderAll();
								canvas.setActiveObject(canvas.item(k)); 
								canvas.getActiveObject().remove(); 
								canvas.setActiveObject(activeObject); 
								bandera=true; 
							}  
						}  
					}  
					j--;
					//actualizar precio y json hidden
				    totalFromCanvas();
				    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
					stateJson++;lastJSONState[stateJson]=json;
				    document.getElementById('json').value = json; 
				    listaItemsCargar();
					canvas.renderAll();
					cerramosONo=true;
				} 
				
			}
			 
	    } else { putZero(); }
	    
	});
});   
var etiquetasJSON="";
function asignar() {
	 
}

function flipv() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.getActiveObject().toggle('flipY');  
    }
    cerramosONo=true;
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	canvas.renderAll();
}

function fliph() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.getActiveObject().toggle('flipX');  
	    
    }
    cerramosONo=true;
    totalFromCanvas();
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	canvas.renderAll();
}

function clone() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5); 
        canvas.add(object);
    }
    

    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	cerramosONo=true;
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
    cerramosONo=true;
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	canvas.renderAll();
}

function sendToBack() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendBackwards(activeObject);
    }
    cerramosONo=true;
    var json = JSON.stringify(canvas.toDatalessJSON(['title','tags','price','url','id','imagenOriginal','bloqueo']));  
	stateJson++;lastJSONState[stateJson]=json;
	document.getElementById('json').value = json;
	canvas.renderAll();
}
var anterior=0;
var anterior2=0;
function undo() {
	$("#deshacer img").attr("onclick","");
	banderaCanvas=true;
	if(stateJson<=0){
		stateJson=0;
	} else { 
		stateJson--;
	}
	canvas.clear();
	canvas.loadFromJSON(lastJSONState[stateJson], function(){
		canvas.renderAll(); 
		longitud=0;
		banderaCanvas=false;
	});
	canvas.renderAll(); 
	cerramosONo=true;
	setTimeout(function(){  $("#deshacer img").attr("onclick","undo()");}, 500);
}

function redo() {
	$("#hacer img").attr("onclick","");
	banderaCanvas=true;
	if(lastJSONState.length<=stateJson){
		stateJson=lastJSONState.length-1;
	} else {
		stateJson++;  
		canvas.loadFromJSON(lastJSONState[stateJson], function(){
			canvas.renderAll(); 
			last=stateJson;
			longitud=0;
			banderaCanvas=false;
		});
		cerramosONo=true; 

	} 
	canvas.renderAll();
	setTimeout(function(){ $("#hacer img").attr("onclick","redo()");}, 500);
}

function totalFromCanvas() {
    json =  canvas.toJSON(['price']);
    
    total_lista = 0;
	var imgSrcArray = json.objects.map(function(objects){ return objects['price'] });
	
	var error = false;
	for(var i=0; i < imgSrcArray.length; i++){
		if (imgSrcArray[i]!=null && imgSrcArray[i] >0){//si tenemos ese dato, sino error
	    	   var price = imgSrcArray[i];
			   total_lista = total_lista + parseFloat(price);
		}else{
			error=true;
		}
	}
	
	document.getElementById("total_lista_precio").innerHTML = parseFloat(total_lista).toFixed(2);
	
	if (error){
		 
	}

}


function addImage(imageName, imageTitle, imageTags, image_url, imagePrice,item_id, minScale, maxScale) {
    
    var title = imageTitle;
    var tags = imageTags;
    var price = imagePrice;
    var id = item_id;
    var url = image_url; 
    
    




    // CÓDIGO QUE TOMA LA IMAGEN Y MANIPULA PARA SU INSERCIÓN EN EL CANVAS
    fabric.Image.fromURL( imageName, function(image) {
    	
    	var alturaImgNew= image.getHeight();
        var anchoImgNew = image.getWidth();
        var finalAltura=(100*alturaImgNew)/anchoImgNew;
        
        image.crossOrigin = "Anonymous";
        image.set({
	    	id:id,
        	title: title,
            tags: tags,
            price: price,
            url: url,
            src: imageName,
            imagenOriginal: imageName,
            left: 200,
            top: 200,
            angle: 0,
            width:100,
            height:finalAltura
        })
        .scale(1)
        .setCoords();

        console.log(image);
        canvas.add(image);
    },{ crossOrigin: 'Anonymous' });
    
    
    
    
    total_lista=total_lista+imagePrice;
    document.getElementById("total_lista_precio").innerHTML = parseFloat(total_lista).toFixed(2);
    cerramosONo=true;
};


function showItemInfo(image_path, image_title, image_tags, image_url, image_price,image_id, tipo){

	if (image_tags.substr(image_tags.length - 1)==","){
			image_tags = image_tags.substring(0, image_tags.length - 1);
	}
	

    if(tipo==-3 || tipo=="-3" || tipo==-4 || tipo=="-4"){
    	$(".money2").css("display","block"); 
    } else {
    	$(".money2").css("display","none"); 
    }
    
	document.getElementById('show-item-imageid').src= image_path;
	document.getElementById('show-item-titulo').innerHTML = image_title; 
	document.getElementById('show-item-url').value = image_url;
	document.getElementById('show-item-precio').innerHTML = image_price + " &euro;";
	document.getElementById('show-item-add-button').onclick = function() { 
        addImage(image_path, image_title, image_tags, image_url, image_price, image_id,1,1,image_url);
    };
	
	$('#modal-info-item').modal();
	
}
var objetoRueda;
var prueba=1; 

// número de items por página
var max=0;
// página que queremos cargar
var page=0;
var pagina=0;
// cantidad de páginas que queremos traer
var pages=0;
// donde cargar los items en todos o items personales
var donde=0;  
//  total items paginado
var totalItemsPaginado=0;
//  paginas totales
var numero_paginas=0;
// cortamos carga de imagenes cuando pasamos de página
var carga="off";
var tags="";
var etiquetasFinal="";
// que solo quite una vez el cargar al iniciar la página si items tiene cero (bandera)
var cargaInicial=0;

function getItems(pagina, pages, id_decorador, donde, tags) {
	etiquetasFinal=tags;
	// cortamos la carga de imagenes cuando llamamos este método y está en modo off (está en on cuando guardas quitar fondo/deformar)
	if(carga=="off") {
		window.stop();
	} else {
		carga="off";
	}
	// total items por página
	max= calcularMaxItems();
	items=max;
	// CON ESTE MÉTODO RECIBIMOS Y TRATAMOS LA LISTA DE ITEMS, LE PASAMOS LA PÁGINA QUE QUEREMOS CARGAR PRIMERO, NÚMERO DE ITEMS, CANTIDAD DE PÁGINAS QUE TRAER (NORMALMENTE SERÁ 1)
	// SI IDDECORADOR ES 0 TRAERÁ LOS ITEMS DE TODOS, SINO LOS DEL ID DEL DECORADOR QUE LE PASEMOS
		$("#cuadroitems").css("visibility", "hidden");
		$(".cargaSVGDecorador").css("display", "block");
	if(tags=="") {
		
		page=pagina;
  		$.ajaxSetup({
  			scriptCharset : "utf-8",
  			contentType : "application/json; charset=utf-8"
  		});

  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "cargarPromocion",
  				action : "get_items_paginado",
  				page: pagina,
  				items: items,
  				pages: pages,
  				id_decorador : id_decorador
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				// BootstrapDialog.alert("DATA: "+data);
  				// $usuarioGlobal=data;
  				if (isError(data)) {  
  					console.log(data);
  				} else {  
  					
  					// id_decorador,container_items,container_pager,tag
  					// <%=id_decorador%>,'items-div','pager-container',document.getElementById('buscarinput').value
  					// 0,'items-div2','pager-container-todos',document.getElementById('buscartodosinput').value
  					 
  						container_items='items-div';
  						container_pager='pager-container'; 
  						obj = [];
  						/*if(id_decorador==87){
  							obj.push({"id": 3, "precio":1,"url":"https://services.decotheco.com/img/lupa-.png", "path": "https://services.decotheco.com/img/lupa-.png","titulo": "services.decotheco", "etiquetas": "services.decotheco", "imagenOriginal": "https://services.decotheco.com/img/lupa-.png", "tipo": -1});
  						obj.push({"id": 1, "precio":1,"url":"http://decoradores.decotheco.com/img/home/fondo.jpg", "path": "http://decoradores.decotheco.com/img/home/fondo.jpg","titulo": "decoradores.decotheco", "etiquetas": "decoradores.decotheco", "imagenOriginal": "http://decoradores.decotheco.com/img/home/fondo.jpg", "tipo": -1});
 						 obj.push({"id": 2, "precio":2,"url":"https://decotheco.com/js/temporal/cara.jpg", "path": "https://decotheco.com/js/temporal/cara.jpg","titulo": "decotheco", "etiquetas": "decotheco", "imagenOriginal": "https://decotheco.com/js/temporal/cara.jpg", "tipo": -1});
  						}*/
  						// SI ES LA PRIMERA VEZ Y TRAE 0 ITEMS QUITAMOS EL LOADER
  						if(data.length==0 && cargaInicial==0) { setTimeout(function(){ $('.modal').modal('hide');  }, 1500); cargaInicial++; }
  						 for(var i=0;i<data.length;i++){ 
								if(i==0 && totalItemsPaginado==0) {
									totalItemsPaginado=data[i].numeroItems;  
									if(es_chrome && hasExtension==false){ 
									} else { $('.modal').modal('hide'); } 
								}
								 if(i==data.length-1) {

										if(data[i].numeroItems!=totalItemsPaginado) {
											if(data[i].numeroItems>totalItemsPaginado) {
												totalItemsPaginado=data[i].numeroItems;
											}
										} 
									}
								etiquetas="";
								for(var j=0;j<data[i].ListaEtiquetas.length;j++){
									if(j==data[i].ListaEtiquetas.length-1) { 
										etiquetas+=data[i].ListaEtiquetas[j];
									} else { 
										etiquetas+=data[i].ListaEtiquetas[j]+",";
									}
								} 
      						 obj.push({"id":data[i].itemLDC_id, "precio":data[i].Price,"url":data[i].URLImage, "path": urlItems+''+data[i].PathImage,"titulo": data[i].ImageTitle, "etiquetas": etiquetas, "imagenOriginal": urlItems+''+data[i].PathImage, "tipo": data[i].Tipo});
      					 	
      					} 
						numero_paginas=Math.ceil((totalItemsPaginado/max));
      					active_page=1;
      					max_iconos=5;
      					if(obj.length==0){
      						$("#items-div").css({"padding-left":"15px","padding-top":"40px", "display":"block"});
      						$("#items-div").html("No se encontraron resultados. Busca otras etiquetas o pulsa TODOS para buscar por categorias.");
	      					$("#cuadroitems").css("visibility", "visible");
	      					$(".cargaSVGDecorador").css("display", "none");
      					} else {

	      					$("#items-div").html(""); 
	      					$("#items-div").css({"padding-left":"15px","padding-top":"15px"});
	      					mostrarItemsPagina(container_items,obj, active_page);
	      					generarPaginas(container_pager,container_items,obj);
	      					$("#cuadroitems").css("visibility", "visible");
	      					$(".cargaSVGDecorador").css("display", "none");
						    
      					} 
  					 
  					
  					

  				}

  			}
  		
  		}); 
	} else { 
		page=pagina;
		if(donde==0) {
			decoradorId=id_decorador;
			$("#cuadroitems").css("visibility", "hidden");
			$(".cargaSVGDecorador").css("display", "block");
		} else {
			decoradorId=0;
			$("#cuadroitemstodos").css("visibility", "hidden");
			$(".cargaSVG").css("display", "block");
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
      			url : urlbaseForAjax + '/DecoradoresController',
      			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

      			data : {
      				token : "cargarPromocion",
      				action : "get_items_by_etiquetas",
      				etiquetas: tags,
      				id_decorador : decoradorId,
      				page: pagina,
      				items: items,
      				pages: pages, 
      				totalItems: totalItemsPaginado
      			},
      			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
      			contentType : "application/json; charset=utf-8",
      			success : function(data) {
      				// BootstrapDialog.alert("DATA: "+data);
      				// $usuarioGlobal=data;
      				if (isError(data)) {  
      				} else { 
      					if(donde==0) {
	      					container_items='items-div';
	  						container_pager='pager-container';
	  						obj = []; 
								for(var i=0;i<data.length;i++){ 
									if(i==0 && totalItemsPaginado==0) {
										totalItemsPaginado=data[i].cantidad; 
									} if(i==data.length-1) {
										if(data[i].cantidad!=totalItemsPaginado) {
											if(data[i].cantidad>totalItemsPaginado) {
												totalItemsPaginado=data[i].cantidad;
											}
										}
									}
									etiquetas=data[i].tags; 
	      						 obj.push({"id":data[i].id, "precio":data[i].price,"url":data[i].url, "path": urlItems+''+data[i].src,"titulo": data[i].title, "etiquetas": etiquetas, "imagenOriginal": urlItems+''+data[i].src, "tipo": data[i].tipo});
	      					 	
	      					} 
							numero_paginas=Math.ceil((totalItemsPaginado/max));
	      					active_page=1;
	      					max_iconos=5;
	      					if(obj.length==0){
	      						$("#items-div").css({"padding-left":"15px","padding-top":"40px", "display":"block"});
	      						$("#items-div").html("No se encontraron resultados. Busca otras etiquetas o pulsa TODOS para buscar por categorias.");
		      					$("#cuadroitems").css("visibility", "visible");
		      					$(".cargaSVGDecorador").css("display", "none");
	      					} else {
	 
		      					$("#items-div").html("");
		      					$("#items-div").css({"padding-left":"15px","padding-top":"15px"});
		      					mostrarItemsPagina(container_items,obj, active_page);
		      					generarPaginas(container_pager,container_items,obj);
		      					$("#cuadroitems").css("visibility", "visible");
		      					$(".cargaSVGDecorador").css("display", "none");
							    
	      					} 
      					} else {
      						container_items='items-div2';
	  						container_pager='pager-container-todos';
	  						obj = []; 
								for(var i=0;i<data.length;i++){ 
									if(i==0 && totalItemsPaginado==0) {
										totalItemsPaginado=data[i].cantidad; 
									} 
									if(i==data.length-1) {
										if(data[i].cantidad!=totalItemsPaginado) {
											if(data[i].cantidad>totalItemsPaginado) {
												totalItemsPaginado=data[i].cantidad;
											}
										}
									}
									etiquetas=data[i].tags; 
	      						 obj.push({"id":data[i].id, "precio":data[i].price,"url":data[i].url, "path": urlItems+''+data[i].src,"titulo": data[i].title, "etiquetas": etiquetas, "imagenOriginal": urlItems+''+data[i].src, "tipo": data[i].tipo});
	      					 	
	      					} 
							numero_paginas=Math.ceil((totalItemsPaginado/max));
	      					active_page=1;
	      					max_iconos=5;
	      					if(obj.length==0){
	      						$("#items-div2").css({"padding-left":"15px","padding-top":"40px", "display":"block"});
	      						$("#items-div2").html("No se encontraron resultados. Busca otras etiquetas o pulsa TODOS para buscar por categorias.");
		      					$("#cuadroitemstodos").css("visibility", "visible");
		      					$(".cargaSVG").css("display", "none");
		      					document.getElementById('preetiquetas').className = 'ocultar';
	      					} else {
	 
		      					$("#items-div2").html("");
		      					$("#items-div2").css({"padding-left":"15px","padding-top":"15px"});
		      					mostrarItemsPagina(container_items,obj, active_page);
		      					generarPaginas(container_pager,container_items,obj);
		      					$("#cuadroitemstodos").css("visibility", "visible");
		      					$(".cargaSVG").css("display", "none"); 
		      					document.getElementById('preetiquetas').className = 'ocultar';
							    
	      					} 
      					}
      				}
      			}
      		
      		});

      	} catch (e) {
      		console.log(e);
      		// put any code you want to execute if there's an exception here

      	}
	}
}




// GENERA EL PAGINADO BUENO
function generarPaginas(element_id,items_container,obj){ 
	document.getElementsByClassName("ul_pager").remove();
	max= calcularMaxItems();
		
	numero_paginas=Math.ceil((totalItemsPaginado/max)); 
	var max_numbers=3; 
    var row = document.createElement("ul"); 
    row.className="ul_pager";
    
    var back = document.createElement("img");
    back.src='img/back.png';
    var next = document.createElement("img");
    next.src='img/next.png';

    var puntos = document.createElement("div");
    puntos.innerHTML="...";
    var puntos2 = document.createElement("div");
    puntos2.innerHTML="...";

    
    if (numero_paginas>1){
        
        // si el número de páginas es inferior a 3
      
        	document.getElementsByClassName("li_pager_number").remove(); 
        	if(page==0) {
        		if(numero_paginas>=page+4) {
	    			 paginaFinal=page+4;
	    		 } else {
	    			 paginaFinal=numero_paginas;
	    		 }
        		
                for (c = 1; c <= paginaFinal; c++){
                	
        	        var row2 = document.createElement("li"); 
        	        row2.className="li_pager_number";
        	        row.appendChild(row2);
        	        
        	        var row3 = document.createElement("a"); 
        	        row3.id = "page_"+c;
        	        if(page==c-1) {
        	        	var linkText = document.createElement("b");
            	        linkText.innerHTML = c;
        	        } else {
        	        	var linkText = document.createTextNode(c);
        	        } 
        	        row3.appendChild(linkText);
        	        row2.appendChild(row3);

        	        document.getElementById(element_id).appendChild(row);
 
        	        	document.getElementById(row3.id).addEventListener("click", function() {

        	        		var idElemento= $(this).attr('id');
        	        		var idFinal = idElemento.split("_");
        	        		var pagina=idFinal[1]-1;
        	        		getItems(pagina, 1, idDecorador, donde, tags);
        	            })
        	        
                }

                // colocamos puntos suspensivos ...
	    		 if(numero_paginas>page+3) {
	    			var row_n = document.createElement("li"); 
		 	    	row_n.appendChild(puntos);
		 	    	row_n.id = "p_a_2";
		 	        row.appendChild(row_n);
	    		 } 
    	        
	    		 
	    		 if(numero_paginas>1) {
	      	       //flecha adelante 
	     	    	var row_n = document.createElement("li"); 
	     	    	next.id="next_arrow";
	     	    	row_n.appendChild(next);
	     	        row.appendChild(row_n);
	      	        objetoRueda=obj;  
	      	        // ir adelante 
	  	        	document.getElementById('next_arrow').addEventListener("click", function() {
	  	        		getItems(page+1, 1, idDecorador, donde, tags);
	  	            } ) 
	    		 }
        	} else if(page==1) {
        		
        		
    	    	//flecha atrás
    	    	var row_b = document.createElement("li"); 
    	    	back.id="back_arrow";
    	    	row_b.appendChild(back);
    	        row.appendChild(row_b); 
 	            
    	        
	    		 
    	        if(numero_paginas>=page+4) {
	    			 paginaFinal=page+4;
	    		 } else {
	    			 paginaFinal=numero_paginas;
	    		 }
        		 for (c = page; c <= paginaFinal; c++){
                 	
         	        var row2 = document.createElement("li"); 
         	        row2.className="li_pager_number";
         	        row.appendChild(row2);
         	        
         	        var row3 = document.createElement("a"); 
         	        row3.id = "page_"+c;
         	        if(page==c-1) {
         	        	var linkText = document.createElement("b");
             	        linkText.innerHTML = c;
         	        } else {
         	        	var linkText = document.createTextNode(c);
         	        } 
         	        row3.appendChild(linkText);
         	        row2.appendChild(row3);

         	        document.getElementById(element_id).appendChild(row);
  
         	        	document.getElementById(row3.id).addEventListener("click", function() {

         	        		var idElemento= $(this).attr('id');
         	        		var idFinal = idElemento.split("_");
         	        		var pagina=idFinal[1]-1;
         	        		getItems(pagina, 1, idDecorador, donde, tags);
         	            })
         	        
                 }

        		 // colocamos puntos suspensivos ...
	    		 if(numero_paginas>3) {
	    			var row_n = document.createElement("li"); 
		 	    	row_n.appendChild(puntos);
		 	    	row_n.id = "p_a_2";
		 	        row.appendChild(row_n);
	    		 } 

     	        // volver atrás 
 	        	document.getElementById('back_arrow').addEventListener("click", function() {
 	        		getItems(page-1, 1, idDecorador, donde, tags);
 	            })
    	        
     	         if(numero_paginas>2) {

          	        //flecha adelante 
          	    	var row_n = document.createElement("li"); 
          	    	next.id="next_arrow";
          	    	row_n.appendChild(next);
          	        row.appendChild(row_n);
          	        objetoRueda=obj; 
	     	        // ir adelante 
	     	        	document.getElementById('next_arrow').addEventListener("click", function() {
	     	        		getItems(page+1, 1, idDecorador, donde, tags);
	     	            } ) 
		    		 } 
     	        
        	} else if(page>1) {

    	    	//flecha atrás
    	    	var row_b = document.createElement("li"); 
    	    	back.id="back_arrow";
    	    	row_b.appendChild(back);
    	        row.appendChild(row_b); 
     	        
    	        
    	        // colocamos puntos suspensivos ...
	    		 if(page>3) {
	    			var row_n = document.createElement("li"); 
		 	    	row_n.appendChild(puntos2);
		 	    	row_n.id = "p_a_3";
		 	        row.appendChild(row_n);
	    		 } 
    	        
	    		 
	 	        if(numero_paginas>=page+4) {
	    			 paginaFinal=page+4;
	    		 } else {
	    			 paginaFinal=numero_paginas;
	    			 
	    		 } 
	 	         if(page-3>=0) {
	    			 paginaAntes=page-2;
	    			 if(paginaAntes==0) {
	    				 paginaAntes=1;
	    			 }
	    		 } else if(page-2>=0) {
	    			 paginaAntes=page-2;
	    			 if(paginaAntes==0) {
	    				 paginaAntes=1;
	    			 }
	    		 } else {
	    			 paginaAntes=page;
	    		 } 
	    		 for (c = paginaAntes; c <= paginaFinal; c++){
	             	
	     	        var row2 = document.createElement("li"); 
	     	        row2.className="li_pager_number";
	     	        row.appendChild(row2);
	     	        
	     	        var row3 = document.createElement("a"); 
	     	        row3.id = "page_"+c;
	     	        if(page==c-1) {
	     	        	var linkText = document.createElement("b");
	         	        linkText.innerHTML = c;
	     	        } else {
	     	        	var linkText = document.createTextNode(c);
	     	        } 
	     	        row3.appendChild(linkText);
	     	        row2.appendChild(row3);
	
	     	        document.getElementById(element_id).appendChild(row);
	
	     	        	document.getElementById(row3.id).addEventListener("click", function() {
	
	     	        		var idElemento= $(this).attr('id');
	     	        		var idFinal = idElemento.split("_");
	     	        		var pagina=idFinal[1]-1;
	     	        		getItems(pagina, 1, idDecorador, donde, tags);
	     	            })
	     	        
	             }
	    		 
	 	         // colocamos puntos suspensivos ...
	    		 if(numero_paginas>page+2) {
	    			var row_n = document.createElement("li"); 
		 	    	row_n.appendChild(puntos);
		 	    	row_n.id = "p_a_2";
		 	        row.appendChild(row_n);
	    		 } 
	 	    	
		    		// volver atrás  
	 	        	document.getElementById('back_arrow').addEventListener("click", function() {
	 	        		getItems(page-1, 1, idDecorador, donde, tags);
	 	            })

	    		 if(numero_paginas>page+1) {
		 	        //flecha adelante 
	     	    	var row_n = document.createElement("li"); 
	     	    	next.id="next_arrow";
	     	    	row_n.appendChild(next);
	     	        row.appendChild(row_n);
		 	        objetoRueda=obj; 
		 	        // ir adelante 
	 	        	document.getElementById('next_arrow').addEventListener("click", function() {
	 	        		getItems(page+1, 1, idDecorador, donde, tags);
	 	            } ) 
	    		 }
 	        
        	}

        
       

    }
    
}
//pager
function genPager(element_id,items_container,obj){ 
	//console.log('genPager: '+ element_id+" "+items_container);
	document.getElementsByClassName("ul_pager").remove();
	max= calcularMaxItems();
		
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
        objetoRueda=obj; 
        (function(element_id,items_container,obj){
        	document.getElementById('back_arrow').addEventListener("click", function() {
        		backPage(items_container,obj);
            }, false);})(element_id,items_container,obj);
        
        (function(element_id,items_container,obj){
        	document.getElementById('next_arrow').addEventListener("click", function() {
        		nextPage(items_container,obj);
            }, false);})(element_id,items_container,obj);
        

    }
    
}
function genPager2(element_id,items_container,obj){ 
	//console.log('genPager: '+ element_id+" "+items_container);
	document.getElementsByClassName("ul_pager").remove();
	max= calcularMaxItems2();
		
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
        objetoRueda=obj; 
        
        (function(element_id,items_container,obj){
        	document.getElementById('back_arrow').addEventListener("click", function() {
        		backPage(items_container,obj);
            }, false);})(element_id,items_container,obj);
        
        (function(element_id,items_container,obj){
        	document.getElementById('next_arrow').addEventListener("click", function() {
        		nextPage(items_container,obj);
            }, false);})(element_id,items_container,obj);
        

    }
    
}

 
	
function genDivItem(element_id,image_id, image_path, image_title, image_url, image_tags, image_price, tipo, image_path2){ 
	//console.log("genDivItem:"+ element_id+" "+image_id+" "+ image_path+" "+ image_title+" "+ image_tags+" "+ image_price);
    var row = document.createElement("div"); 
    row.id = 'picker-img-'+image_id;
    row.className = "clipper_image _83"; 
    if(tipo==-3 || tipo=="-3" || tipo==-4 || tipo=="-4"){
	    var row1 = document.createElement("img");
	    row1.title="Item afiliado, obtén ganancias si compran este artículo";
	    row1.className = "money";  
	    row1.src="img/euro.svg";
	    row1.setAttribute('draggable', false);
	    row.appendChild(row1); 
    }
    
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
    row4.url=image_url;
    row4.setAttribute('draggable', true);
    row3.appendChild(row4);

    document.getElementById(element_id).appendChild(row);
    
  
    document.getElementById('img'+image_id).onclick = function() { 
									        showItemInfo(image_path, image_title, image_tags,image_url, image_price, image_id, tipo);
								        };
					        
    document.getElementById('img'+image_id).onmousedown = function(){
    	updateVars(image_path, image_title, image_tags, image_url, image_price, image_id);
    };
   
    document.getElementById('img'+image_id).addEventListener('dragstart', handleDragStart, false);
    document.getElementById('img'+image_id).addEventListener('dragend', handleDragEnd, false);
}

function genDivItem2(element_id,image_id, image_path, image_title, image_url, image_tags, image_price, tipo,image_path2){ 
	//console.log("genDivItem:"+ element_id+" "+image_id+" "+ image_path+" "+ image_title+" "+ image_tags+" "+ image_price);
    var row = document.createElement("div"); 
    row.id = 'picker-img2-'+image_id;
    row.className = "clipper_image3 _83";
    if(image_tags==undefined) {
    	
    } else if(image_tags.indexOf("aff") > -1){
	    var row1 = document.createElement("img"); 
	    row1.title="Item afiliado, obtén ganancias si compran este artículo";
	    row1.className = "money";
	    row1.src="img/euro.svg";
	    row1.setAttribute('draggable', false);
	    row.appendChild(row1); 
    }
 

    if(tipo==-3 || tipo=="-3" || tipo==-4 || tipo=="-4"){
	    var row1 = document.createElement("img");
	    row1.title="Item afiliado, obtén ganancias si compran este artículo";
	    row1.className = "money";  
	    row1.src="img/euro.svg";
	    row1.setAttribute('draggable', false);
	    row.appendChild(row1); 
    }
    var row2 = document.createElement("div"); 
    row2.className = "image_wrapper2"; 
    row.appendChild(row2);
    
    var row3 = document.createElement("div"); 
    row3.className = "image_background2"; 
    row2.appendChild(row3);
    
    var row4 = document.createElement("img"); 
    row4.className = "clipper_image2"; 
    row4.id='img'+image_id;
    row4.src=image_path;
    row4.url=image_url; 
    row3.appendChild(row4);

    document.getElementById(element_id).appendChild(row);
    
  
    document.getElementById('img'+image_id).onclick = function() { 
    	colocarSinFondo(image_path, image_title, image_tags,image_url, image_price, image_id);activar();
								        };
					        
    document.getElementById('img'+image_id).onmousedown = function(){
    	updateVars(image_path, image_title, image_tags, image_url, image_price, image_id);
    };
    
}
var barraSup=true;
var cargar=0;
var div_alto=0;
function calcularMaxItems(){
	var salida = 0;
	
	var w_height = $(window).height(); 
	var w_width = $(window).width();
	var container_height = Math.round((70*w_height)/100); 
	var container_width = w_width * 0.38; 
	//console.log("Dimensines container: " + container_width+"x"+container_height); 
	var items_horizontal=1;
	if(container_width >750){ items_horizontal=7; }
	else if(container_width >594){ items_horizontal=6; }
	else if(container_width >445){ items_horizontal=5; }
	else if(container_width >100){ items_horizontal=5; }
	 
	var items_vertical=1;
	if(container_height >(1199)){ items_vertical=7;div_alto=750;}
	else if(container_height >(735)){ items_vertical=6;div_alto=750;}
	else if(container_height >(643)){ items_vertical=5; div_alto=650;}
	else if(container_height >(531)){ items_vertical=4;div_alto=500;}
	else if(container_height >(100)){ items_vertical=4;div_alto=500;}
	
	salida = items_horizontal*items_vertical;
	//console.log("N Items: " + salida); 
	
	if(cargar==0){
		if(div_alto<470){div_alto=500; }
		$(".listaItems").css("margin-top", div_alto+220);
		$(".leftbuttons").css("height", div_alto+250);
		$(".controls").css("height", div_alto+250);
		$("#menumiselementos").css("height", div_alto+30);
		$("#cuadroitemstodos").css("height", div_alto+30);
		
		setTimeout(function() {
			//$('#cargando').modal('hide');
			if(barraSup){
			i=1;
			var movi2=""; 
			function movimientoSuperior2(){
				if(i>124){
					barraSup=false;
					$("#completo").css("height","75px");
					$("#completo").css("margin-top","-1px");
					$('#ListaEtiquetas').css('display', "none");
					$('.letra-xxxs').css('padding-bottom', "5px");
					$('.letra-xxxs').css('padding-top', "5px");
					$('#subirEti img').css('display', "none");
					$('#bajarEti img').css('display', "block");
					$('#nombreProyecto').css("top", "1px");
					$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
					$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
					$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
					$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
					$("#ListaEtiquetas").css("filter", "alpha(opacity=30)");
					$('#bajarEti').css("filter", "alpha(opacity=30)");
					$('#subirEti').css("filter", "alpha(opacity=30)");
					$('#nombreProyecto').css("filter", "alpha(opacity=30)");
					$("#ListaEtiquetas").css("opacity", "0.3");
					$('#bajarEti').css("opacity", "0.3");
					$('#subirEti').css("opacity", "0.3");
					$('#subirEti').css("display", "none");
					$('#nombreProyecto').css("opacity", "0.3");

					$('#ListaEtiquetas').css("margin-top", "-122px");
					clearInterval(movi2); 
				} else {
					i=i+2;
					$("#completo").css("margin-top","-"+i+"px");
				}  
			}   
			movi2 = setInterval(movimientoSuperior2, 10);
			}
		  }, 3000);
	}
	return salida;
}
function calcularMaxItems2(){
	var salida = 0;
	
	var w_height = $(window).height(); 
	var w_width = $(window).width();
	var container_height = Math.round((70*w_height)/100); 
	var container_width = w_width * 0.38; 
	//console.log("Dimensines container: " + container_width+"x"+container_height); 
	var items_horizontal=1;
	if(container_width >750){ items_horizontal=7; }
	else if(container_width >594){ items_horizontal=6; }
	else if(container_width >445){ items_horizontal=5; }
	else if(container_width >100){ items_horizontal=5; }
	 
	var items_vertical=1;
	if(container_height >(1199)){ items_vertical=7;}
	else if(container_height >(735)){ items_vertical=6;}
	else if(container_height >(643)){ items_vertical=5; }
	else if(container_height >(531)){ items_vertical=4;}
	else if(container_height >(100)){ items_vertical=4;}
	
	salida = items_horizontal*items_vertical;
	//console.log("N Items: " + salida);
	
	 
	return salida;
}

function mostrarItemsPagina(element_id,obj,active_page){
	max= calcularMaxItems2();
	document.getElementsByClassName("clipper_image").remove();
	
	var start = 1;
	var end = obj.length;
	
	start = (active_page * max)-max;
	end = (active_page * max) -1;
	
	if (end>obj.length){
		end = obj.length-1;
	}
	
	//console.log("active page: "+active_page+", start: "+start+", end:"+end);
	
	for (i = start; i <= end; i++){
		if(obj[i]==undefined){}else {
			genDivItem(element_id,obj[i]['id'],obj[i]['path'], obj[i]['titulo'], obj[i]['url'], obj[i]['etiquetas'], obj[i]['precio'], obj[i]['tipo'],obj[i]['path']);
		}
	}
	
}

function mostrarItemsPagina2(element_id,obj,active_page){
	max= calcularMaxItems2();
	
	var start = 1;
	var end = obj.length;
	
	start = (active_page * max)-max;
	end = (active_page * max) -1;
	
	if (end>obj.length){
		end = obj.length-1;
	}
	
	//console.log("active page: "+active_page+", start: "+start+", end:"+end);
	
	for (i = start; i <= end; i++){
		genDivItem2(element_id,obj[i]['id'],obj[i]['path'], obj[i]['titulo'], obj[i]['url'], obj[i]['etiquetas'], obj[i]['precio'],obj[i]['tipo'],obj[i]['path']);
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
	var div_alto = $("#menumiselementos").height(); 
	$("#menumiselementos").css("height", div_alto);
	max= calcularMaxItems2();
	
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
var borrador=0;
var publicado=0;
function getBorradores(url,idDecorador){
	// OBTENEMOS LISTAS DE LA COMPRA BORRADORES POR ID DE DECORADOR
	if(borrador==0) {
	borrador++;
	// SOLO ENTRA LA PRIMERA VEZ
	try {
  		$.ajaxSetup({
  			scriptCharset : "utf-8",
  			contentType : "application/json; charset=utf-8"
  		});

  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "get_borradores",
  				decorador_id: idDecorador,
  					
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				
  				if (isError(data)) {
  					BootstrapDialog.alert(data);
  					$(document.body).css({'cursor' : 'default'});
  				} else {
  					// RECORREMOS EL OBJETO RECIBIDO Y LO PINTAMOS EN LA MODAL DE BORRADORES
  				  	var html="";
  				  	for (i=0;i<data.length;i++) {
		  				html+='<div id="ldlc-image'+data[i].ListaCompra_id+'" class="">';
	  					html+='<div class="image_wrapper">';
	  					html+='	<div class="image_background  borde" style="height:120px;width:120px;margin:15px;float:left;overflow:hidden">';
						html+='		<a href="ldlc.jsp?id_ldlc='+data[i].ListaCompra_id+'&id_decorador='+idDecorador+'&id_proyecto='+id_proyecto+'&lg=1" class="cargarBorradores">';
						html+='			<img src="'+url+'ldlc/imagenes/'+data[i].imagen+'" class="lower-canvas " width=120px height=120px style="width: 120px; height: auto"> '; 
						html+='		</a>';
						html+='	</div>';
						html+='</div>';
						html+='</div>';
					}
					$("#items-div-borradores").html(html);
  					//$(".items-div-borradores").html();
  					
  					
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here
  		$(document.body).css({'cursor' : 'default'});
  	}
  	}
}
function getPublicados(url,idDecorador){

	// OBTENEMOS LISTAS DE LA COMPRA PUBLICADAS POR ID DE DECORADOR
	if(publicado==0) {
	publicado++;
	// SOLO ENTRA LA PRIMERA VEZ
	try {
  		$.ajaxSetup({
  			scriptCharset : "utf-8",
  			contentType : "application/json; charset=utf-8"
  		});

  		$.ajax({
  			// /type:"POST",
  			dataType : "json",
  			// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews',
  			url : urlbaseForAjax + '/DecoradoresController',
  			// url: 'http://192.168.0.164:8080/OnlineAssistance/CreateUser',

  			data : {
  				token : "token",
  				action : "get_publicados",
  				decorador_id: idDecorador,
  					
  			},
  			// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
  			contentType : "application/json; charset=utf-8",
  			success : function(data) {
  				
  				if (isError(data)) {
  					BootstrapDialog.alert(data);
  					$(document.body).css({'cursor' : 'default'});
  				} else {
  					// RECORREMOS EL OBJETO RECIBIDO Y LO PINTAMOS EN LA MODAL DE PUBLICADOS
  					//$(".items-div-publicados").html();
  					var html="";

					for (i=0;i<data.length;i++) {
		  				html+='<div id="ldlc-image'+data[i].ListaCompra_id+'" class="">';
	  					html+='<div class="image_wrapper">';
	  					html+='	<div class="image_background  borde" style="height:120px;width:120px;margin:15px;float:left;overflow:hidden">';
						html+='		<a href="ldlc.jsp?id_ldlc='+data[i].ListaCompra_id+'&id_decorador='+idDecorador+'&id_proyecto='+id_proyecto+'&lg=1" class="cargarBorradores">';
						html+='			<img src="'+url+'ldlc/imagenes/'+data[i].imagen+'" class="lower-canvas " width=120px height=120px style="width: 120px; height: auto"> '; 
						html+='		</a>';
						html+='	</div>';
						html+='</div>';
						html+='</div>';
					}
					$("#items-div-publicados").html(html);
  				}

  			}
  		});

  	} catch (e) {
  		BootstrapDialog
  				.alert('Se ha producido un error en la conexión con el servidor');
  		// put any code you want to execute if there's an exception here
  		$(document.body).css({'cursor' : 'default'});
  	}
	}
}
function borradores(idDecorador){
	$('.canvas-container').css("width","30%"); 
	$('.canvas-container').css("height","120px");
	
}


/*function addImageToCustomCanvas(custom_canvas,imageName, imagePrice, minScale, maxScale) {

    $('.canvas-fondos').css("width","100%");
	$('.canvas-fondos').attr("width","100%");
	$('.canvas-fondos').css("height","500px");
	$('.canvas-fondos').attr("height","500px");
	$('.modal-body > .canvas-container').attr("width","46%");
	$('.modal-body > .canvas-container').attr("height","500px");
	$('#output_canvas').css("width","41%");
	
	

	
	
	var price = imagePrice;
    fabric.Image.fromURL( imageName, function(image) {
        image.set({
            price: price,
            left: 0,
            top: 0,
            angle: 0
        })
        .scale(1)
        .setCoords();
        
        var alturaImgNew= image.getHeight();
        var anchoImgNew = image.getWidth();

        
        
        
        var activeObject = canvas.getActiveObject();
        var alturaImg= activeObject.getHeight();
        var anchoImg = activeObject.getWidth();
        
        var alturaCanvas= custom_canvas.getHeight();
        var anchoCanvas= custom_canvas.getWidth();
        
        
        
      
        
       // image.scaleToWidth(500);
        
		anchoModal=550;  
        
        var isok=true;
        var altobueno=0;
        var anchobueno=0;
        //OJO QUE ME QUEDE AQUÍ
        factorAltura=alturaCanvas/alturaImg;
        factorAncho=anchoCanvas/anchoImg;
        var anchoCanvasBueno=0;
        var altoCanvasBueno=0;
         var factor=1;
        if(alturaImgNew>alturaCanvas || anchoImgNew>anchoCanvas){
        	if(alturaImgNew>anchoImgNew){
        		//es más alta que ancha, encajamos el alto
        		image.scaleToHeight(alturaCanvas);   			
        		anchoCanvasBueno=image.getWidth();
        		altoCanvasBueno=alturaCanvas; 
        		if(anchoModal>anchoCanvasBueno){
        			desplazar=(anchoModal-anchoCanvasBueno)/2;
        			//console.log("desplazar:" + desplazar)
        			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
        			$('#input-canvas').css("margin-left","0");  
        			$('#output_canvas').css("margin-left","0");   
        		} else {
        			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
        			$('#input-canvas').css("margin-left","0");  
        			$('#output_canvas').css("margin-left","0"); 
        		}
            	$('.canvas-container').css("width","41%");  
            	$('.canvas-container').css("height",altoCanvasBueno);
            	
        	}else{
        		image.scaleToWidth(anchoCanvas);   
        		anchoCanvasBueno=anchoCanvas;
        		altoCanvasBueno=image.getHeight();
            	if(anchoModal>anchoCanvasBueno){
        			desplazar=(anchoModal-anchoCanvasBueno)/2;
        			//console.log("desplazar:" + desplazar)
        			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
        			$('#input-canvas').css("margin-left","0");  
        			$('#output_canvas').css("margin-left","0");   
        		} else {
        			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
        			$('#input-canvas').css("margin-left","0");  
        			$('#output_canvas').css("margin-left","0"); 
        		}
            	$('.canvas-container').css("width","41%");
            	$('.canvas-container').css("height",altoCanvasBueno); 
    			  
        	}
        }else{
        	anchoCanvasBueno=anchoImgNew;
        	altoCanvasBueno=alturaImgNew;
        	if(anchoModal>anchoCanvasBueno){
    			desplazar=(anchoModal-anchoCanvasBueno)/2;
    			//console.log("desplazar:" + desplazar)
    			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
    			$('#input-canvas').css("margin-left","0");  
    			$('#output_canvas').css("margin-left","0");  
    		} else {
    			$('.canvas-container > .canvas-fondos').css("margin-left","0");  
    			$('#input-canvas').css("margin-left","0");  
    			$('#output_canvas').css("margin-left","0"); 
    		}
        	$('.canvas-container').css("height",altoCanvasBueno); 
        }

        $('.canvas-fondos').css("width",anchoCanvasBueno);
    	$('.canvas-fondos').attr("width",anchoCanvasBueno);
    	$('.canvas-fondos').css("height",altoCanvasBueno);
    	$('.canvas-fondos').attr("height",altoCanvasBueno);
    	$('.modal-body > .canvas-container').attr("width",anchoCanvasBueno);
    	$('.modal-body > .canvas-container').attr("height",altoCanvasBueno);
    	
      
		
		var alturaImgNew3= image.getHeight();
	    var anchoImgNew3 = image.getWidth();
	        
        anchoForCustomCanvasFinalImage=anchoImgNew3;
        altoForCustomCanvasFinalImage=alturaImgNew3;
        
        anchoModal=anchoCanvasBueno;  
		
		 $('.canvasMod').html('<canvas id="input_canvas" class="canvas-fondos" width='+anchoModal+'px height='+altoCanvasBueno+'px style="width='+anchoModal+'px; height='+altoCanvasBueno+'px;"></canvas><canvas id="output_canvas" class="canvas-fondos" width='+anchoModal+'px height='+altoCanvasBueno+'px style="width='+anchoModal+'px; height='+altoCanvasBueno+'px; "></canvas>')
		
        
		
        custom_canvas.add(image);
        
      

        
       
    },{ crossOrigin: 'Anonymous' });
    
    //total_lista=total_lista+imagePrice;
    //document.getElementById("total_lista_precio").innerHTML = total_lista;
}*/


function addImageToCustomCanvas2(custom_canvas,imageName, imagePrice, minScale, maxScale) {

	var price = imagePrice;
    fabric.Image.fromURL( imageName, function(image) {
        image.set({
            price: price,
            left: 0,
            top: 0,
            angle: 0
        })
        .scale(1)
        .setCoords();
        
        custom_canvas.add(image);
        
    },{ crossOrigin: 'Anonymous' });
    
    //total_lista=total_lista+imagePrice;
    //document.getElementById("total_lista_precio").innerHTML = total_lista;
}

//fondos
var imagen_sin_fondo={
		'titulo':null,
		'etiquetas':null,
		'precio':null,
		'url':null,
		'tipo':null
}
var imagen_sin_fondo2={
		'titulo':null,
		'etiquetas':null,
		'precio':null,
		'url':null,
		'tipo':null
}
function getData(){
	

}

function imagenCanvasQuitarFondos(imageName) {
	
	var altoPrefijado=500,anchoPrefijado=500;
	//Recuperamos el src de la imagen que queremos tratar
	activeObject = canvas.getActiveObject();
	var url_image = activeObject.get("src");
	imagenQuitarFondo=activeObject.get("src");
	
	//var price = imagePrice;
    fabric.Image.fromURL( imageName, function(image) {
        image.set({
            price: 0,
            left: 0,
            top: 0,
            angle: 0
        })
        .scale(1)
        .setCoords();
        
        var alturaImgNew= image.getHeight();
        var anchoImgNew = image.getWidth();

        
        
         
        


        var anchoCanvasBueno=0;
        var altoCanvasBueno=0;
         var factor=1;
        if(alturaImgNew>altoPrefijado || anchoImgNew>anchoPrefijado){
	        	if(alturaImgNew>anchoImgNew){
	        		//es más alta que ancha, encajamos el alto
	        		image.scaleToHeight(altoPrefijado);   			
	        		anchoCanvasBueno=image.getWidth();
	        		altoCanvasBueno=altoPrefijado;
	            	
	        	}else{
	        		image.scaleToWidth(anchoPrefijado);   
	        		anchoCanvasBueno=anchoPrefijado;
	        		altoCanvasBueno=image.getHeight(); 
	        	}
        }else{
	        	anchoCanvasBueno=anchoImgNew;
	        	altoCanvasBueno=alturaImgNew;
        }

		$('.canvas-container > .canvas-fondos').css("margin-left","0");  
		$('#input-canvas').css("margin-left","0");  
		$('#output_canvas').css("margin-left","0"); 
    	

		
		 $('.canvasMod').html('<canvas id="input_canvas" class="canvas-fondos" width='+anchoCanvasBueno+'px height='+altoCanvasBueno+'px style="width='+anchoCanvasBueno+'px; height='+altoCanvasBueno+'px;"></canvas><canvas id="output_canvas" class="canvas-fondos" width='+anchoCanvasBueno+'px height='+altoCanvasBueno+'px style="width='+anchoCanvasBueno+'px; height='+altoCanvasBueno+'px; "></canvas>')
		
		  output_canvas = new fabric.StaticCanvas('output_canvas');
		  input_canvas = new fabric.Canvas('input_canvas');
		 
		    
		   width = input_canvas.getWidth();
		   height = input_canvas.getHeight();
		     
	   	 	 	
	   	 	 	
		    
		    jqwindow = $(window);
		    delta_left = 0;
		    delta_top = 0;
		    yax = $('#yaxis');
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
		    };
			
		    var jsfeat_gui = new dat.GUI({ autoPlace: false });
		    
		    //pf_opt = function () {
		    //this.sigma = 0;
		    //this.threshold = 1000;
		    //this.minSize = 1000;
		    //};
		   
		    //state.options.pf = new pf_opt();
		    state.options.slic = new slic_opt();
		    
		   
		    
		   // console.log(state);
		    
		    var slic_gui = jsfeat_gui.addFolder('Superpixel Segmentation');
		    slic_gui.add(state.options.slic, "regionSize", 20, 400);
		    slic_gui.add(state.options.slic, "minSize", 2, 100);
		    //var pf_gui = jsfeat_gui.addFolder('PF Graph Segmentation (Not Used)');
		    //pf_gui.add(state.options.pf, "threshold", 20, 40000);
		    //pf_gui.add(state.options.pf, "sigma", 0, 20);
		    //pf_gui.add(state.options.pf, "minSize", 2, 10000);
		    $("#dat_gui").append(jsfeat_gui.domElement);
		    input_canvas.backgroundColor = '#ffffff';
		    $('#bg-color').val('#ffffff');
		    input_canvas.renderAll();
		    yax.hide();
		    
		      delta_left = $('#output_canvas').offset().left - $('#input_canvas').offset().left + jqwindow.scrollLeft();
		      delta_top = $('#output_canvas').offset().top - $('#input_canvas').offset().top + jqwindow.scrollTop();
		    jqwindow.scroll(function () {
		   
		      delta_left = $('#output_canvas').offset().left - $('#input_canvas').offset().left + jqwindow.scrollLeft();
		      delta_top = $('#output_canvas').offset().top - $('#input_canvas').offset().top + jqwindow.scrollTop(); 
		    });
		        
		   
		    $('#output_canvas').attr("width",anchoCanvasBueno);
		    $('#output_canvas').attr("height",altoCanvasBueno);
			
		    $('#input_canvas').attr("width",anchoCanvasBueno);
		    $('#input_canvas').attr("height",altoCanvasBueno);
			
		    $('.canvasMod > .canvas-container').css("width","500px");
			
			
			
			
        input_canvas.add(image);
        
        input_canvas.getObjects().map(function(o) {
			  o.hasBorders = false;
			  o.hasControls = false;
		      o.prevEvented = o.evented;
		      o.prevSelectable = o.selectable;
		      o.evented = false;
		      o.selectable = false;

		});
		imagen_sin_fondo2.objeto=activeObject;
		imagen_sin_fondo2.titulo=activeObject.get("title");
		imagen_sin_fondo2.etiquetas=activeObject.get("tags");
		imagen_sin_fondo2.precio=activeObject.get("price");
		imagen_sin_fondo2.url=activeObject.get("src");
		imagen_sin_fondo2.urlP=activeObject.get("url");
		imagen_sin_fondo2.id=activeObject.get("id");
		imagen_sin_fondo2.tipo=1;
		
		id=activeObject.get("id");
		showItemsSinFondo('items-div-sinfondo','pager-container', id);

		canvas.setActiveObject(activeObject); 
		$('.modal-fondos').modal('show');
        
        
    },{ crossOrigin: 'Anonymous' });
	
	
	
//    fabric.Image.fromURL("/static/img/demo.jpg", function(oImg){canvas.add(oImg);},load_options = {crossOrigin:"Anonymous"});
};

function removeBackground(){
	$(".canvas-container").css("width", "41%");  

	if(canvas.getActiveObject()==null || canvas.getActiveObject()=="" || canvas.getActiveObject()==undefined){
		
	} else {
		if(canvas.getActiveObject().text!=undefined){
			
		} else {
			/*input_canvas.clear();
			output_canvas.clear();
			canvas.renderAll();*/
			var activeObject = canvas.getActiveObject();
			
			//activeObject.crossOrigin = "Anonymous";
			//console.log("url: "+activeObject.get("src"));
			
			
			var url_image = activeObject.get("src");
			imagenQuitarFondo=activeObject.get("src");
			//var url_image="http://192.168.1.100:8080/items/32-1503754721317.jpg" 
			//addImageToCustomCanvas(input_canvas,url_image,1,1);
			imagenCanvasQuitarFondos(url_image);
			//var input_activeObject = input_canvas.getActiveObject();
			//input_activeObject.hasBorders = false;
			//input_activeObject.hasControls = false;
			
			
		}
	}
	cerramosONo=true;
}



function guardarSinFondo(){

	$(document.body).css({ 'cursor': 'wait' });
	document.getElementById('imageData_Fondos').value = document.getElementById('output_canvas').toDataURL('image/png');
	document.getElementById('itemtitulo_Fondos').value = imagen_sin_fondo.titulo;
	document.getElementById('itemetiquetas_Fondos').value = imagen_sin_fondo.etiquetas;
	document.getElementById('itemprecio_Fondos').value = imagen_sin_fondo.precio;
	document.getElementById('itemurl_Fondos').value = imagen_sin_fondo.url;
	document.getElementById('itemsrc_Fondos').value = imagen_sin_fondo.urlP;

	document.getElementById('item_id_ldlc_Fondos').value = imagen_sin_fondo.id;
	document.getElementById('item_id_ldlc_tipo').value = imagen_sin_fondo.tipo;
	
	  
	document.getElementById('senditemfromfondos').submit();
	$(document.body).css({ 'cursor': 'default' });

	activeObject = imagen_sin_fondo2.objeto;
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
}

var delta_top = 0;
var delta_left = 0;

mover_cursor = function(options) {yax.css({'top': options.e.y + delta_top,'left': options.e.x + delta_left});};

function setFreeDrawingMode(value,mode){
	input_canvas.isDrawingMode = !!value;
	input_canvas.freeDrawingBrush.color = mode == 1 ? 'green': 'red';
	yax = $('#yaxis');
    if (value && mode == 1){
        // console.log ("Drawing foreground, click segment to update results.");
    }else if(value){
    	// console.log ( "Drawing background, click segment to update results.");
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
    var alturaCanvas= altoForCustomCanvasFinalImage;
    var anchoCanvas= anchoForCustomCanvasFinalImage;
   // var imageData = context.createImageData(anchoCanvas, alturaCanvas);//= context.createImageData(output_canvas.getWidth(), output_canvas.getHeight());
    var imageData = context.createImageData(output_canvas.getWidth(), output_canvas.getHeight());
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
        state.canvas_data = input_canvas.getContext('2d').getImageData(0, 0,  input_canvas.width, input_canvas.height);
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
    state.mask_data = input_canvas.getContext('2d').getImageData(0, 0, input_canvas.width, input_canvas.height);
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
	
	output_canvas.clear();
	output_canvas.getObjects().map(function(o) {
		  o.hasBorders = false;
		  o.hasControls = false;
	});
	
	
	
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
        }
        else{
            console.log("Did not recompute, using previously computed superpixels.")
        }
        updateClusters();
        renderResults();
        state.recompute = false;
    }else {
    	console.log("Please mark background and foreground !! ");
    }
    
    
    
	
	imagen_sin_fondo.titulo=imagen_sin_fondo2.titulo
	imagen_sin_fondo.etiquetas=imagen_sin_fondo2.etiquetas
	imagen_sin_fondo.precio=imagen_sin_fondo2.precio
	imagen_sin_fondo.url=imagen_sin_fondo2.url
	imagen_sin_fondo.urlP=imagen_sin_fondo2.urlP;
	imagen_sin_fondo.id=imagen_sin_fondo2.id;
	imagen_sin_fondo.tipo=imagen_sin_fondo2.tipo; 
	
	 
}

function export_segment(){
	
}
var imagenQuitarFondo="";
function resetQuitarFondo(){
	output_canvas.clear();
	input_canvas.clear(); 
	desactivar();
	canvas.renderAll();
	 
	
	
	var activeObject = canvas.getActiveObject();
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
	activeObject = canvas.getActiveObject();
	
	//activeObject.crossOrigin = "Anonymous";
	//console.log("url: "+activeObject.get("src"));
	
	
	url_image = activeObject.get("src");
	//var url_image="http://192.168.1.100:8080/items/32-1503754721317.jpg" 
	//addImageToCustomCanvas(input_canvas,url_image,1,1);
	imagenCanvasQuitarFondos(url_image);
	//var input_activeObject = input_canvas.getActiveObject();
	//input_activeObject.hasBorders = false;
	//input_activeObject.hasControls = false;
	
	input_canvas.getObjects().map(function(o) {
		  o.hasBorders = false;
		  o.hasControls = false;
	});
	canvas.setActiveObject(activeObject); 
	canvas.renderAll();
	input_canvas.renderAll();
	
}
function resetOriginal(){
	output_canvas.clear();
	input_canvas.clear(); 
	desactivar();
	canvas.renderAll();
	 
	
	
	var activeObject = getObjectFromCanvasById(imagen_sin_fondo2.id); 
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
	activeObject = canvas.getActiveObject();
	
	//activeObject.crossOrigin = "Anonymous";
	//console.log("url: "+activeObject.get("src"));
	
	
	url_image = activeObject.get("imagenOriginal");
	//var url_image="http://192.168.1.100:8080/items/32-1503754721317.jpg" 
	//addImageToCustomCanvas(input_canvas,url_image,1,1);
	imagenCanvasQuitarFondos(url_image);
	//var input_activeObject = input_canvas.getActiveObject();
	//input_activeObject.hasBorders = false;
	//input_activeObject.hasControls = false;
	
	input_canvas.getObjects().map(function(o) {
		  o.hasBorders = false;
		  o.hasControls = false;
	});
	canvas.setActiveObject(activeObject); 
	canvas.renderAll();
	input_canvas.renderAll();
	
}
function quitarFondo(){
	output_canvas.clear();
	//var input_canvas = document.getElementById("input_canvas"), 
	input_canvas.setActiveObject(input_canvas.item(0));
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
	            pix[i] = 0;
	            pix[i+1] = 0;
	            pix[i+2] = 0;
	            pix[i+3] = 0;
	        }
	}
	
	var ctx2 = output_canvas.getContext("2d");
	ctx2.putImageData(imgd, 0, 0);
	
	
	imagen_sin_fondo.titulo=imagen_sin_fondo2.titulo
	imagen_sin_fondo.etiquetas=imagen_sin_fondo2.etiquetas
	imagen_sin_fondo.precio=imagen_sin_fondo2.precio
	imagen_sin_fondo.url=imagen_sin_fondo2.url
	imagen_sin_fondo.urlP=imagen_sin_fondo2.urlP;
	imagen_sin_fondo.id=imagen_sin_fondo2.id;
	imagen_sin_fondo.tipo=imagen_sin_fondo2.tipo; 
}

function colocarSinFondo(image_path, image_title, image_tags,image_url, image_price, image_id){
	    
	var img = document.querySelector('img.img_dragging');
	
    //console.log('event: ', e); 
	var src = image_path;
    var title = image_title;
    var tags = image_tags;
    var price = image_price;
    var url = image_url;
    var id = item_id;
    var newImage = null;
    newImage = new fabric.Image(img, {
    	id:id,
    	title: title,
        tags: tags,
        url: url,
        price: price,
        src: src,
        left: 0,
        top: 0
    });
    canvas.add(newImage);
    var activeObject = getObjectFromCanvasById(id); 
	canvas.deactivateAll().renderAll();
	canvas.setActiveObject(activeObject); 
    output_canvas.clear(); 
    
    
    imagen_sin_fondo.titulo=title;
	imagen_sin_fondo.etiquetas=tags;
	imagen_sin_fondo.precio=price;
	imagen_sin_fondo.url=src;
	imagen_sin_fondo.urlP=url;
	imagen_sin_fondo.id=id;
	imagen_sin_fondo.tipo=2; 
	
	
    addImageToCustomCanvas2(output_canvas,src,1,1);
	//var input_activeObject = input_canvas.getActiveObject();
	//input_activeObject.hasBorders = false;
	//input_activeObject.hasControls = false;
	
    output_canvas.getObjects().map(function(o) {
		  o.hasBorders = false;
		  o.hasControls = false;
	});
    removeSelected();
    
    cerramosONo=true;
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
          },{ crossOrigin: 'Anonymous' });
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




$(window).resize(function() {
	/*
    setInterval(function(){
    }, 300);
    	*/ 

	window_width = $(window).width();
	var display=$('#ListaEtiquetas').css('margin-top');  
	if(display=="-122px") { } else {
		if(window_width<=1130){
			$('#nombreProyecto').css("top", "118px");
		}else {
			$('#nombreProyecto').css("top", "122px");
		}
	}
	
	
	calcularMaxItems(); 
   
	$(".listaItems").css("margin-top", div_alto+200);
	$(".leftbuttons").css("height", div_alto+230);
	$(".controls").css("height", div_alto+250);
	$("#menumiselementos").css("height", div_alto);
	$("#cuadroitemstodos").css("height", div_alto);
	
	
    if(window_width>1050){
    	canvas_width = Math.round((62*window_width)/100); 
		document.getElementById("canvas").width = canvas_width;
		document.getElementById("canvas").style.width = canvas_width+'px'; 
		
		document.getElementById("canvas-div").style.width = canvas_width+'px'; 
		canvas.width = canvas_width;
		
		
		
		var alturaFinal = $(".controls").height()+40;
		document.getElementById("canvas").height = alturaFinal;
		document.getElementById("canvas").style.height = alturaFinal+'px'; 
		document.getElementById("canvas-div").style.height = alturaFinal+'px'; 
		canvas.height = alturaFinal;
		$(".canvas-container").css("width", canvas_width);  
		$(".upper-canvas ").attr("width",  canvas_width+'px'); 
		$(".upper-canvas ").attr("height", alturaFinal); 
		$(".upper-canvas ").css("width",  canvas_width+'px'); 
		$(".upper-canvas ").css("height", alturaFinal); 
		$("#canvas-div").css("height", alturaFinal); 
		$('.listaItems').css("width", window_width-47);
    } else {
    	canvas_width =583; 
		document.getElementById("canvas").width = canvas_width;
		document.getElementById("canvas").style.width = canvas_width+'px'; 
		
		document.getElementById("canvas-div").style.width = canvas_width+'px'; 
		canvas.width = canvas_width;
		
		
		
		var alturaFinal = $(".controls").height()+40;
		document.getElementById("canvas").height = alturaFinal;
		document.getElementById("canvas").style.height = alturaFinal+'px'; 
		document.getElementById("canvas-div").style.height = alturaFinal+'px'; 
		canvas.height = alturaFinal;
		$(".canvas-container").css("width", canvas_width);
		$(".upper-canvas ").attr("width",  canvas_width+'px'); 
		$(".upper-canvas ").attr("height", alturaFinal); 
		$(".upper-canvas ").css("width",  canvas_width+'px'); 
		$(".upper-canvas ").css("height", alturaFinal); 
		$('.listaItems').css("width", 1003);
    }
    
    modalfondos=$(".modal-fondos").css("display");
	if(modalfondos=="block"){
		$(".canvas-container").css("width", "41%"); 
	}
	modalborradores=$("#modal-borradores").css("display");
	modalpublicados=$("#modal-publicados").css("display");
	
	if(modalborradores=="block" || modalpublicados=="block"){
		$('.canvas-container').css("width","30%"); 
		$('.canvas-container').css("height","120px");
	}
	canvas.renderAll();
	
});



//valida el formulario de subir items
function validateFormSendItem(idDecorador){
	$(document.body).css({ 'cursor': 'wait' }); 
	var param_ok = true;
	
	document.getElementById("revise-datos").style.display = 'none'; 
	
	//nombre
	if (document.getElementById('itemtitulo').value.length<1 ){
		param_ok=false;
	}
	//etiquetas
	if (document.getElementById('itemetiquetas').value.length<1){
		valor=document.getElementById('itemetiquetas').value;
		
		tag = valor.toLowerCase();
		tag = tag.trim();
		tag=tag.split('-').join(',');
		tag=tag.split(' ').join(',');
		param_ok=false;
	}
	//Precio
	if (document.getElementById('itemprecio').value.length<1 ){
		param_ok=false;
	}
	if (document.getElementById('nombre_archivo').value.length<1 ){
		param_ok=false;
	} 
	urlFinal=document.getElementById('itemurl').value;
	url=document.getElementById('itemurl').value; 
	datos=addDecorator(url); 
	function promiseAff() {
		if(datos!=undefined) {
			data=datos;
			resultImageAfiliado();
		} else {
			setTimeout(function(){ promiseAff(); }, 500);
		}
	}
  	function resultImageAfiliado() {
		if (data==0) {
			BootstrapDialog.alert(data);
			$(document.body).css({'cursor' : 'default'});
			document.getElementById('item_tipo').value = "-2";
		} else {
			if(data.url_add==undefined){
				urlFinal=document.getElementById('itemurl').value;
				document.getElementById('item_tipo').value = "-2";
			}else { 
				if(data.ItemLDLC!="") { 
					urlFinal=data.ItemLDLC.URLImage;
					document.getElementById('item_tipo').value = "-4";
				} else { 
					if(data.tipo_afiliacion==2) {
						urlFinal="http://pdt.tradedoubler.com/click?"+data.url_add+"prod()ttid(5)url("+encodeURIComponent(url)+")";
					} else {
						parte=data.url_add.split("=")[0]; 
						if(urlFinal.indexOf(parte)> -1) {
	  						parte=urlFinal.split(parte)[0];
	  						urlFinal=parte+""+data.url_add;
						} else {
							if(urlFinal.indexOf("?")> -1) {
	  	  						urlFinal=urlFinal+"&"+data.url_add;
							}else {
	  	  						urlFinal=urlFinal+"?"+data.url_add;
							}
						}
					}
					document.getElementById('item_tipo').value = "-4";
				}
			}   
			if (param_ok){
					document.getElementById("itemurl").value = urlFinal;
					objetoParaInsertar={"precio": document.getElementById('itemprecio').value,"path":urlFinal, "titulo":document.getElementById('itemtitulo').value,"etiquetas":tag }
					
					document.getElementById('senditem').submit();
					$('.modal').modal('hide');
					$('#cargando').modal('show');
			}else{
				document.getElementById("revise-datos").style.display = 'block'; 
			}
			$(document.body).css({ 'cursor': 'default' });
		} 
  	}	 
  	promiseAff();
} 
function borrarSubirImagen(){

    $("#imgSubir").attr("src","img/subirgrande.png"); 
	document.getElementById('itemprecio').value="";
	document.getElementById('revise-datos').value="";
	document.getElementById('itemtitulo').value="";
	document.getElementById('itemetiquetas').value="";
	document.getElementById('itemurl').value="";
	document.getElementById('nombre_archivo').value="";
}

function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() == blank.toDataURL();
}
function subir() { 

	$('#ListaEtiquetas').animate({marginTop:"-=122px"},100); 
	$('.letra-xxxs').css('padding-bottom', "5px");
	$('.letra-xxxs').css('padding-top', "5px");
	$('#subirEti').css("display","none"); 
	if(window_width<=1130){
		$('#nombreProyecto').animate({top:"0"},100); 
		}else {
		$('#nombreProyecto').animate({top:"0"},100); 
		}

	$('#nombreProyecto').fadeTo("fast",0.3);
	$('#bajarEti img').fadeTo(100,0.3);

	$('#ListaEtiquetas').animate({marginTop:"-122px"},100); 
}
function bajar() {  
	$( ".letra-xxxs" ).removeClass( "transpar" );
	$("#completo").css("height","175px");
	$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$("#ListaEtiquetas").css("opacity", "1");
	$('#ListaEtiquetas').css("display","inline"); 
	$('#ListaEtiquetas').animate({marginTop:"0"},100); 
	$('.letra-xxxs').css('padding-bottom', "7px");
	$('.letra-xxxs').css('padding-top', "7px");
	$('#bajarEti img').fadeTo(0,0);
	$('#subirEti').css("display","inline");
	$('#subirEti img').css("display","inline");
	$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'!important");
	$("#ListaEtiquetas").css("filter", "alpha(opacity=100)");
	$('#bajarEti').css("filter", "alpha(opacity=100)");
	$('#subirEti').css("filter", "alpha(opacity=100)");
	$('#nombreProyecto').css("filter", "alpha(opacity=100)!important");
	$("#ListaEtiquetas").css("opacity", "1");
	$('#bajarEti').css("opacity", "1");
	$('#subirEti').css("opacity", "1");
	$('#nombreProyecto').css("opacity", "1!important");
	if(window_width<=1130){
	$('#nombreProyecto').animate({top:"118px"},100); 
	}else {
	$('#nombreProyecto').animate({top:"122px"},100); 
	}
}
$("#ListaEtiquetas,#bajarEti img,#subirEti img,#bajarEti,.letra-xxxs").mouseover(function() {
	$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)'");
	$("#ListaEtiquetas").css("filter", "alpha(opacity=100)");
	$('#bajarEti').css("filter", "alpha(opacity=100)");
	$('#subirEti').css("filter", "alpha(opacity=100)");
	$('#nombreProyecto').css("filter", "alpha(opacity=100)");
	$("#ListaEtiquetas").css("opacity", "1");
	$('#bajarEti').css("opacity", "1");
	$('#subirEti').css("opacity", "1");
	$('#nombreProyecto').css("opacity", "1");
});
$("#ListaEtiquetas,#bajarEti img,#subirEti img,#bajarEti,.letra-xxxs").mouseleave(function() {

	if($('#ListaEtiquetas').css('display')=="none") {

		$("#ListaEtiquetas").css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
		$('#bajarEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
		$('#subirEti').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
		$('#nombreProyecto').css("-ms-filter", "'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)'");
		$("#ListaEtiquetas").css("filter", "alpha(opacity=30)");
		$('#bajarEti').css("filter", "alpha(opacity=30)");
		$('#subirEti').css("filter", "alpha(opacity=30)");
		$('#nombreProyecto').css("filter", "alpha(opacity=30)");
		$("#ListaEtiquetas").css("opacity", "0.3");
		$('#bajarEti').css("opacity", "0.3");
		$('#subirEti').css("opacity", "0.3");
		$('#nombreProyecto').css("opacity", "0.3");
	}
}); 

var a=0;
$(".img_border").mouseover(function() { 
	if($(this).css('outline')=="rgb(0, 0, 0) solid 1px") {
		a=1;
	}
	$(this).css('outline', "rgb(0, 0, 0) solid 1px");
});
$(".img_border").mouseleave(function() {
	if(a==0) {
		$(this).css('outline', "rgb(0, 0, 0) solid 0");
	} else {
		a=0;
	}
}); 

