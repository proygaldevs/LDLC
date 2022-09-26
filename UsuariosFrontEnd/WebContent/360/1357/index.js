
'use strict';
function createLinks(){ 
	$("#vrToggle, #vrToggle .icon").click(function() { 
		var idVr=$(".scenes .current").attr("data-id");
		var pathname = window.location.pathname;
		var href = pathname + 'vr.html?vr='+idVr;
		window.parent.location.href = href;
	});
	$("#fullscreenToggle3, #fullscreenToggle3 .icon").click(function() {   
		var pathname = window.location.pathname;
		var href = pathname;
		window.parent.location.href = href;
	});
	
	
	
};
function iniciarTodo(data) {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggle2Element = document.querySelector('#fullscreenToggle2');

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  var scenes = data.scenes.map(function(data) {
	  var urlPrefix = "../360/";
	    var source = Marzipano.ImageUrlSource.fromString(
	    		urlPrefix + idProyect+ "tiles/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
	      { cubeMapPreviewUrl: urlPrefix + idProyect+ "tiles/" + data.id + "/preview.jpg" });
	  if(encarpeta==true){
		   urlPrefix = "tiles";
		   source = Marzipano.ImageUrlSource.fromString(
		    		urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
		      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
	  }
    
    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.Solo si es un piso completo que se ve en el parámetro por get house=1
    if(isHouse==true) 
    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  // Set up autorotate, if enabled.
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled'); 
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener('click', toggleSceneList);

 

  scenes.forEach(function(scene) {
	    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
	    createMenuInside(scene.data.id,scene.data.name)
	  });
  
  document.getElementsByClassName('scenes')[0].innerHTML=htmlForInsertComplete;
  
  // Set handler for scene switch.
  setTimeout(function(){
	  scenes.forEach(function(scene) {
		    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
		    el.addEventListener('click', function() {
		      switchScene(scene);
		      // On mobile, hide scene list after selecting a scene.
		      if (document.body.classList.contains('mobile')) {
		        hideSceneList();
		      }
		    });
		  });
   }, 0);
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
 
  createLinks();
  // Start with the scene list open on desktop.
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }
  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function toggleFullscreen() {
    /*screenfull.toggle();
    if (screenfull.isFullscreen) {
      fullscreenToggle2Element.classList.add('enabled');
    } else {
      fullscreenToggle2Element.classList.remove('enabled');
    }*/
  }

  function createLinkHotspotElement(hotspot) {

	    // Create wrapper element to hold icon and tooltip.
	    var wrapper = document.createElement('div');
	    wrapper.classList.add('hotspot');
	    wrapper.classList.add('link-hotspot');

	    // Create image element.
	    var icon = document.createElement('img');
	    icon.src = 'img/link.png';
	    icon.classList.add('link-hotspot-icon');

	    // Set rotation transform.
	    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
	    for (var i = 0; i < transformProperties.length; i++) {
	      var property = transformProperties[i];
	      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
	    }

	    // Add click event handler.
	    wrapper.addEventListener('click', function() {
	      switchScene(findSceneById(hotspot.target));
	    });

	    // Prevent touch and scroll events from reaching the parent element.
	    // This prevents the view control logic from interfering with the hotspot.
	    stopTouchAndScrollEventPropagation(wrapper);

	    // Create tooltip element.
	    var tooltip = document.createElement('div');
	    tooltip.classList.add('hotspot-tooltip');
	    tooltip.classList.add('link-hotspot-tooltip');
	    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

	    wrapper.appendChild(icon);
	    wrapper.appendChild(tooltip);

	    return wrapper;
	  }
  
  function createInfoHotspotElement(hotspot) {

	    // Create wrapper element to hold icon and tooltip.
	    var wrapper = document.createElement('div');
	    wrapper.classList.add('hotspot');
	    wrapper.classList.add('link-hotspot');

	    // Create image element.
	    var icon = document.createElement('img');
	    icon.src = 'img/link.png';
	    icon.classList.add('link-hotspot-icon');

	    // Set rotation transform.
	    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
	    for (var i = 0; i < transformProperties.length; i++) {
	      var property = transformProperties[i];
	      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
	    }

	    // Add click event handler.
	    wrapper.addEventListener('click', function() {
			    	var href = urlbase + hotspot.title;
			    	//var href = "http://192.168.1.100:8444/OnlineAssistance/"+nombre;
			    	window.location = href;
	    });

	    // Prevent touch and scroll events from reaching the parent element.
	    // This prevents the view control logic from interfering with the hotspot.
	    stopTouchAndScrollEventPropagation(wrapper);

	    // Create tooltip element.
	    var tooltip = document.createElement('div');
	    tooltip.classList.add('hotspot-tooltip');
	    tooltip.classList.add('link-hotspot-tooltip');
	    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

	    wrapper.appendChild(icon);
	    wrapper.appendChild(tooltip);

	    return wrapper;
	  }

  
  
 /* function createInfoHotspotElement(hotspot) {

	    // Create wrapper element to hold icon and tooltip.
	    var wrapper = document.createElement('div');
	    wrapper.classList.add('hotspot');
	    wrapper.classList.add('info-hotspot');

	    // Create hotspot/tooltip header.
	    var header = document.createElement('div');
	    header.classList.add('info-hotspot-header');

	    // Create image element.
	    var iconWrapper = document.createElement('div');
	    iconWrapper.classList.add('info-hotspot-icon-wrapper');
	    var icon = document.createElement('img');
	    icon.src = 'img/info.png';
	    icon.classList.add('info-hotspot-icon');
	    iconWrapper.appendChild(icon);

	    // Create title element.
	    var titleWrapper = document.createElement('div');
	    titleWrapper.classList.add('info-hotspot-title-wrapper');
	    var title = document.createElement('div');
	    title.classList.add('info-hotspot-title');
	    title.innerHTML = hotspot.title;
	    titleWrapper.appendChild(title);

	    // Create close element.
	    var closeWrapper = document.createElement('div');
	    closeWrapper.classList.add('info-hotspot-close-wrapper');
	    var closeIcon = document.createElement('img');
	    closeIcon.src = 'img/close.png';
	    closeIcon.classList.add('info-hotspot-close-icon');
	    closeWrapper.appendChild(closeIcon);

	    // Construct header element.
	    header.appendChild(iconWrapper);
	    header.appendChild(titleWrapper);
	    header.appendChild(closeWrapper);

	    // Create text element.
	    var text = document.createElement('div');
	    text.classList.add('info-hotspot-text');
	    text.innerHTML = hotspot.text;

	    // Place header and text into wrapper element.
	    wrapper.appendChild(header);
	    wrapper.appendChild(text);

	    // Create a modal for the hotspot content to appear on mobile mode.
	    var modal = document.createElement('div');
	    modal.innerHTML = wrapper.innerHTML;
	    modal.classList.add('info-hotspot-modal');
	    document.body.appendChild(modal);

	    var toggle = function() {
	      wrapper.classList.toggle('visible');
	      modal.classList.toggle('visible');
	    };

	    // Show content when hotspot is clicked.
	    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

	    // Hide content when close icon is clicked.
	    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

	    // Prevent touch and scroll events from reaching the parent element.
	    // This prevents the view control logic from interfering with the hotspot.
	    stopTouchAndScrollEventPropagation(wrapper);

	    return wrapper;
	  }
*/
  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                      'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // Display the initial scene.
  switchScene(scenes[0]);

}
function getParameterByName(name, url) {
	
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return  decodeURIComponent(results[2].replace(/\+/g, " "));

    
    
}
//Declaro  la variable para guardar el id del proyecto
var idProyect;
var isHouse=false;
try {
	idProyect=getParameterByName('idvr');
	if(Number.isInteger(idProyect)){
		isHouse=true;
		console.log('idProyect si es un numero');
		console.log(idProyect);
	}else{
		console.log('idProyect no es un numero');
		idProyect=0;
	}
} catch (e) {
	// TODO: handle exception
	console.log('he entrado por la excepcion para coger el idvr');
	idProyect=0;
}


var encarpeta=false;

function recuperarDatosBBDD(){
	 console.log('recuperarDatosBBDD');
	 console.log(idProyect);
	if(idProyect==0){
		encarpeta=true;
	 var url = window.location.href;
	    var splites=url.split('/');
	    if(splites[splites.length-1].length>0) 
	    	idProyect= splites[splites.length-1];
	    else
	    idProyect= splites[splites.length-2] 
	   
	    
	    console.log('id recogido de la url');
	    console.log(idProyect);
	}

	 var urlvar=urlbaseForAjax + '/DecoradoresController';
	try {
		/*$.ajaxSetup({
			scriptCharset : "utf-8",
			contentType : "application/json; charset=utf-8"
		});*/
		//idProyect=718; 
		var urlvar=urlbaseForAjax + '/DecoradoresController';
		console.log('iaiaiaiai');
		console.log(urlvar);
		$.ajax({
					// /type:"POST",
					dataType : "json",
					// url: 'http://94.23.34.49:8442/Solvida_JSON_REST/getNews', 
					url : urlbaseForAjax + '/DecoradoresController',
					data : {  
		  				token : "token",
		  				action : "project_get_360",
						id_proyecto: idProyect 
					},
					// url: 'http://81.47.163.149:8080/Solvida_JSON_R/getNews',
					contentType : "application/json; charset=utf-8",
					success : function(data) {
						// $usuarioGlobal=data;
						  var datos = data;
						  console.log(datos);
						  var stringifado=JSON.stringify(datos.data360);
						  console.log(stringifado);
						  
						  var variableparajson;
						  variableparajson= JSON.parse(datos.data360);  

						  
						  console.log( variableparajson);
						
						  
						  iniciarTodo(variableparajson);
						
					},         
			        error : function(xhr, status) { 
			         console.log(xhr);
			        } 
				});

	} catch (e) {
		console.log(e);
		// put any code you want to execute if there's an exception here 
	} 
}
var htmlForInsertComplete='';
function createMenuInside(iddata,name){
	  var ARef = '<a  class="scene" data-id="'+iddata+'">';
	  ARef+=     '<li class="text">'+name+'</li>';
	  ARef+=     '</a>';
	  htmlForInsertComplete+=ARef;
}
function createMenuOutSide(url, name){
	  var ARef = '<a href="'+url+'" class="scene" >';
	  ARef+=      '<li class="text">'+name+'</li>';
	  ARef+=      '</a>';
	  htmlForInsertComplete+=ARef;
}
function insertIntoMenu(){
	console.log(htmlForInsertComplete);

	document.getElementsByClassName('scenes')[0].innerHTML=htmlForInsertComplete;
}
recuperarDatosBBDD();
