var tope=100;

function Addtext() { 
	tope=tope+40;
	canvas.add(new fabric.IText('Editable', { 
	      left: 90,
	      top: tope,
	      fontFamily: 'Arial',
	      fill: '#333',
		  fontSize: 30
	}));
	if(tope==220) {
		tope=100;
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
	canvas.renderAll(); 
}

$(document).ready(function(){ 
	

    document.getElementById('img-bg-color').onchange = function() { 
    	canvas.backgroundColor=this.value;
    	canvas.renderAll(); 
    };
	
	function PulsarTecla(event){
	    tecla = event.keyCode;
	    if(tecla==46 || tecla==8){
	    	removeSelected();
	    }
	}
	
	window.onkeydown=PulsarTecla;
	
	
	canvas.on('object:selected', function(o) {
		var activeObject = canvas.getActiveObject(); 
		activeObj = o.target; 
		if(activeObj.get('type') == 'group') {
		     
		}
		if(activeObject){  
	           
	           
	           
	           var color=canvas.getActiveObject().fill;
	           $("#text-color").val(color);
	           var color2=canvas.getActiveObject().backgroundColor;
	           $("#text-bg-color").val(color2);
	           var color3=canvas.getActiveObject().stroke;
	           $("#text-stroke-color").val(color3);
	           var letra=document.getElementById('font-family');
	           letra.value=canvas.getActiveObject().fontFamily;
	           var weight=canvas.getActiveObject().fontWeight;
	           var bold=document.getElementById('text-cmd-bold');
	           if(weight=="bold"){
	        	   bold.checked=1;
	           } else {
	        	   bold.checked=0; 
	           }
	           var style=canvas.getActiveObject().fontStyle;
	           var italic=document.getElementById('text-cmd-italic');
	           if(style=="italic"){
	        	   italic.checked=1;
	           } else {
	        	   italic.checked=0; 
	           }
	           var underline=canvas.getActiveObject().textDecoration;
	           var under=document.getElementById('text-cmd-underline');
	           if(underline=="underline"){
	        	   under.checked=1;
	           } else {
	        	   under.checked=0; 
	           }
	           
		}
	})
	
	
	 
});   

  var canvas = this.__canvas = new fabric.Canvas('c');
  	canvas.setHeight(300);
	canvas.setWidth(300);
	canvas.add(new fabric.IText('Editable', { 
	      left: 90,
	      top: 70,
	      fontFamily: 'Arial',
	      fill: '#333',
		  fontSize: 30
	}));
 
    
   
		document.getElementById('text-color').onchange = function() {
            canvas.getActiveObject().setFill(this.value);
            canvas.renderAll();
        };
		
		document.getElementById('text-bg-color').onchange = function() {
            canvas.getActiveObject().setBackgroundColor(this.value);
            canvas.renderAll();
        };
		 

		document.getElementById('text-stroke-color').onchange = function() {
            canvas.getActiveObject().setStroke(this.value);
            canvas.renderAll();
        };	

		/*document.getElementById('text-stroke-width').onchange = function() {
            canvas.getActiveObject().setStrokeWidth(this.value);
            canvas.renderAll();
        };		*/		
	
		document.getElementById('font-family').onchange = function() {
            canvas.getActiveObject().setFontFamily(this.value);
            canvas.renderAll();
        };
        
		   
	
 radios5 = document.getElementsByName("fonttype");  // wijzig naar button
    for(var i = 0, max = radios5.length; i < max; i++) {
        radios5[i].onclick = function() {
            
            if(document.getElementById(this.id).checked == true) {
                if(this.id == "text-cmd-bold") {
                    canvas.getActiveObject().set("fontWeight", "bold");
                }
                if(this.id == "text-cmd-italic") {
                    canvas.getActiveObject().set("fontStyle", "italic");
                }
                if(this.id == "text-cmd-underline") {
                    canvas.getActiveObject().set("textDecoration", "underline");
                } 
                
                
                
            } else {
                if(this.id == "text-cmd-bold") {
                    canvas.getActiveObject().set("fontWeight", "");
                }
                if(this.id == "text-cmd-italic") {
                    canvas.getActiveObject().set("fontStyle", "");
                }  
                if(this.id == "text-cmd-underline") {
                    canvas.getActiveObject().set("textDecoration", "");
                } 
            }
            
            
            canvas.renderAll();
        }
    }