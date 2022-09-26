
var tc = {};
var nombreToChat;
var indexMine=0;
var indexOther=0;

var flagCargaInicialAcabada=false;
var mensajesIniciales=0;
var numeroMensajes=0;

function beep() {
	//ejecuta un sonido en base64
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}


function updateMemberMessageReadStatus(){
	if(flagCargaInicialAcabada==false) {
		alert('El chat todavía está cargando, intentalo en unos segundos');
		return;
	} 
	cerrarCargando();
	// retrieve the list of members for the active channel
    var members = tc.currentChannel.getMembers();
    // for each member, set up a listener for when the member is updated
    members.then(function(currentMembers) {
        currentMembers.forEach(function(member) {
            // handle the read status information for this member
            // note this method would use the provided information to render
            // this to the user in some way.
        	if(member.identity == nombreToChat){
        		//son míos
        		if(member.lastConsumedMessageIndex!=null){
        			if(member.lastConsumedMessageIndex<indexOther){
        				noLeidos();
        				beep();
        				beep();
        				//alert('hay mensajes sin leer' + member.lastConsumedMessageIndex + '- indexOther: ' + indexOther);
            		}else{
            			leidos();
            			//alert('todo leido');
            		}
        		}else { 
        			noLeidos();
    				beep();
    				beep();
        		}
        	}else{
        		//aquí lo del otro, no debería de hacer falta.
        	}
        	//alert('UPDATEMEMBER: '+member.identity+' '+member.lastConsumedMessageIndex+' '+member.lastConsumptionTimestamp+' ');
            /*updateMemberMessageReadStatus(
                , 
                , 
                
            );*/
        });
    });
	
}

function lleganMensajes(message){
	if(flagCargaInicialAcabada==false){
		//Son los mensajes de la carga inicial cuando se entra en la página
		if(message.author == nombreToChat){
			//alert("es mio");
			indexMine=message.index;
		}else{
			//alert("es del otro");
			indexOther=message.index;
		}
	}else
	if($('#modalChat').hasClass('in')){
		//alert('está abierta');
		if(message.author == nombreToChat){
			//alert("es mio");
			indexMine=message.index;
		}else{
			//alert("es del otro");
			indexOther=message.index;
		}
		leidos();
	}else{
		//alert('no está abierta');
		if(message.author == nombreToChat){
			//alert("es mio");
			indexMine=message.index;
		}else{
			//alert("es del otro");
			indexOther=message.index;
			if(message!='undefined'){
				//alert(message.author + ' te ha escrito : ' + message.body);
				console.log(message.body + ' - ' + message.author + ' - ' + message.index );
			}
			noLeidos();
			beep();
		}
	}
	
}

function leidos(){ 
	$('#imagenChat').attr("src","img/pasos/mensajes.svg");
	tc.currentChannel.setAllMessagesConsumed();
}
function noLeidos(){
	$('#imagenChat').attr("src","img/pasos/chat-animado.gif");
	
}

function comienzaAEscribir(lol){
	//alert(lol);
}
function dejaDeEscribir(lol){
	//alert(lol);
}

function goChat(nombre, canal, historial) {
	console.log('goChat');
	console.log(nombre);
	console.log(canal);
	  
	tc = {};

	nombreToChat=nombre;
	var hexString = canal.toString(16)+"-decotheco-"+entorno;
	var GENERAL_CHANNEL_NAME = hexString;
	var GENERAL_CHANNEL_UNIQUE_NAME = hexString;
	var MESSAGES_HISTORY_LIMIT = historial;

  var $channelList;
  var $inputText;
  var $usernameInput;
  var $statusRow;
  var $connectPanel;
  var $newChannelInputRow;
  var $newChannelInput;
  var $typingRow;
  var $typingPlaceholder;

  $(document).ready(function() {
    tc.$messageList = $('#message-list');
    $channelList = $('#channel-list');
    $inputText = $('#input-text');
    $usernameInput = $('#username-input');
    $statusRow = $('#status-row');
    $connectPanel = $('#connect-panel');
    $newChannelInputRow = $('#new-channel-input-row');
    $newChannelInput = $('#new-channel-input');
    $typingRow = $('#typing-row');
    $typingPlaceholder = $('#typing-placeholder');
   // $usernameInput.focus();
    
    
    
    
    
    
    
    $usernameInput.on('keypress', handleUsernameInputKeypress);
    $inputText.on('keypress', handleInputTextKeypress);
    $newChannelInput.on('keypress', tc.handleNewChannelInputKeypress);
   
    $('#add-channel-image').on('click', showAddChannelInput);
    $('#leave-span').on('click', disconnectClient);
    $('#delete-channel-span').on('click', deleteCurrentChannel); 
   // connectClient('Pablo');
   //cargarChat();
    connectClient(nombreToChat);
  });

  function handleUsernameInputKeypress(event) {
    if (event.keyCode === 13){
      connectClientWithUsername();
    }
  }

  function handleInputTextKeypress(event) {
    if (event.keyCode === 13) {
      tc.currentChannel.sendMessage($(this).val()); 
      $(this).val('');
    }
    else {
      notifyTyping();
    }
  }

  var notifyTyping = $.throttle(function() {
    tc.currentChannel.typing();
  }, 1000);

  tc.handleNewChannelInputKeypress = function(event) {
   /* if (event.keyCode === 13) {
      tc.messagingClient.createChannel({
        friendlyName: $newChannelInput.val()
      }).then(hideAddChannelInput);
      $(this).val('');
      event.preventDefault();
    }*/
  };

  function connectClientWithUsername() {
	   /* var usernameText = $usernameInput.val();
	    $usernameInput.val('');
	    if (usernameText == '') {
	      console.log('Username cannot be empty');
	      return;
	    }
	    tc.username = usernameText;
	    fetchAccessToken(tc.username, connectMessagingClient);*/
	  }
  function connectClient(username) {
	    var usernameText = username;
	    tc.username = usernameText;
	    fetchAccessToken(tc.username, connectMessagingClient);
	  }
  function fetchAccessToken(username, handler) {
	  console.log ('username, handler');
	  console.log (username);
	  console.log (urlbaseForAjax+'/token');
	  

	  //
    $.post(urlbaseForAjax+'/token', {identity: username, device: 'browser'}, null, 'json')
      .done(function(response) {
    	  console.log('Successfully finished fetch of the Access Token.');
    	  console.log(response.token);
          handler(response.token);
      })
      .fail(function(error) {
    	  console.log('FAIL');
    	  
        console.log( error);
      });
  }

  function connectMessagingClient(token) {
    // Initialize the IP messaging client
    tc.accessManager = new Twilio.AccessManager(token);
    new Twilio.Chat.Client.create(token).then(function(chatClient) {
        //joinChannels(chatClient);
        tc.messagingClient=chatClient;
        
        var promise = tc.messagingClient.getChannelByUniqueName(GENERAL_CHANNEL_NAME);
        promise.then(function(channel) {
        	tc.generalChannel = channel;
            //console.log('Found general channel:');
            //console.log(generalChannel);
           // setupChannel();
            tc.messagingClient.initialize()
            .then(function() {
             // updateConnectedUI();
              //tc.joinGeneralChannel;
            	//console.log('antesde lanzar el loadchannel en connectMessagingClient');
              tc.loadChannelList(tc.joinGeneralChannel);
              tc.messagingClient.on('channelAdded', $.throttle(tc.loadChannelList));
              tc.messagingClient.on('channelRemoved', $.throttle(tc.loadChannelList));
              tc.messagingClient.on('tokenExpired', refreshToken);
            });
        }).catch(function() {
            // If it doesn't exist, let's create it
            //console.log('GENERAL CHANEL NOT FOUND');
            /*chatClient.createChannel({
                uniqueName: GENERAL_CHANNEL_NAME,
                friendlyName: GENERAL_CHANNEL_NAME
            }).then(function(channel) {
                console.log('Created general channel:');
                console.log(channel);
                generalChannel = channel;
                setupChannel();
            });*/
            tc.messagingClient.initialize()
            .then(function() {
             // updateConnectedUI();
              //tc.joinGeneralChannel;
            	//console.log('antesde lanzar el loadchannel en connectMessagingClient');
              tc.loadChannelList(tc.joinGeneralChannel);
              tc.messagingClient.on('channelAdded', $.throttle(tc.loadChannelList));
              tc.messagingClient.on('channelRemoved', $.throttle(tc.loadChannelList));
              tc.messagingClient.on('tokenExpired', refreshToken);
            });
        });
        
        
      });
    /*tc.messagingClient = new Twilio.Chat.Client(token);
    tc.messagingClient.initialize()
      .then(function() {
        updateConnectedUI();
        tc.loadChannelList(tc.joinGeneralChannel);
        tc.messagingClient.on('channelAdded', $.throttle(tc.loadChannelList));
        tc.messagingClient.on('channelRemoved', $.throttle(tc.loadChannelList));
        tc.messagingClient.on('tokenExpired', refreshToken);
      });*/
  }

  function refreshToken() {
    fetchAccessToken(tc.username, setNewToken);
  }

  function setNewToken(tokenResponse) {
    tc.accessManager.updateToken(tokenResponse.token);
  }

  function updateConnectedUI() {
    $('#username-span').text(tc.username);
    $statusRow.addClass('connected').removeClass('disconnected');
    tc.$messageList.addClass('connected').removeClass('disconnected');
    $connectPanel.addClass('connected').removeClass('disconnected');
    $inputText.addClass('with-shadow');
    $typingRow.addClass('connected').removeClass('disconnected');
  }

  tc.loadChannelList = function(handler) {
	  //console.log("en el loadChannelList");
	  //console.log(tc.messagingClient);
    if (tc.messagingClient === undefined) {
      //console.log('Client is not initialized');
      return;
    }

    tc.messagingClient.getPublicChannelDescriptors().then(function(channels) {
      tc.channelArray = tc.sortChannelsByName(channels.items);
      $channelList.text('');
      //console.log( tc.channelArray);
      tc.channelArray.forEach(addChannel);
      if (typeof handler === 'function') {
        handler();
      }
    });
  };

  tc.joinGeneralChannel = function() {
    //console.log('Attempting to join "'+ GENERAL_CHANNEL_UNIQUE_NAME +'" chat channel...');
    //console.log(tc.generalChannel);
    if (!tc.generalChannel) {
      // If it doesn't exist, let's create it
      tc.messagingClient.createChannel({
        uniqueName: GENERAL_CHANNEL_UNIQUE_NAME,
        friendlyName: GENERAL_CHANNEL_NAME
      }).then(function(channel) {
        //console.log('Created general channel');
        tc.generalChannel = channel;
        tc.loadChannelList(tc.joinGeneralChannel);
      });
    }
    else {
      //console.log('Found general channel:');
      setupChannel(tc.generalChannel);
    }
  };

  function initChannel(channel) {
    //console.log('Initialized channel ' + channel.friendlyName);
    return tc.messagingClient.getChannelBySid(channel.sid);
  }

  function joinChannel(_channel) {
    return _channel.join()
      .then(function(joinedChannel) {
        //console.log('Joined channel ' + joinedChannel.friendlyName);
        updateChannelUI(_channel);
        tc.currentChannel = _channel;
        tc.loadMessages();
        return joinedChannel;
      });
  }

  function initChannelEvents() {
    //console.log(tc.currentChannel.friendlyName + ' ready.');
    tc.currentChannel.on('messageAdded', tc.addMessageToList);
    tc.currentChannel.on('typingStarted', showTypingStarted);
    tc.currentChannel.on('typingEnded', hideTypingStarted);
    tc.currentChannel.on('memberJoined', notifyMemberJoined);
    tc.currentChannel.on('memberLeft', notifyMemberLeft);
   // $inputText.prop('disabled', false).focus();
    $inputText.prop('disabled', false);
  }

  function setupChannel(channel) {
    return leaveCurrentChannel()
      .then(function() {
        return initChannel(channel);
      })
      .then(function(_channel) {
        return joinChannel(_channel);
      })
      .then(initChannelEvents);
  }

  tc.loadMessages = function() {
    tc.currentChannel.getMessages(MESSAGES_HISTORY_LIMIT)
      .then(function(messages) {
    	  //console.log(messages);
    	  if(messages.items.length==0) { addMessageToListWellcome(); cerrarCargando(); }
    	  	mensajesIniciales = messages.items.length;
        messages.items.forEach(tc.addMessageToList);
    });
 
    //actualizarCanal(tc.currentChannel);
  };
  
  
  
  
  function leaveCurrentChannel() {
    if (tc.currentChannel) {
      return tc.currentChannel.leave().then(function(leftChannel) {
        //console.log('left ' + leftChannel.friendlyName);
        leftChannel.removeListener('messageAdded', tc.addMessageToList);
        leftChannel.removeListener('typingStarted', showTypingStarted);
        leftChannel.removeListener('typingEnded', hideTypingStarted);
        leftChannel.removeListener('memberJoined', notifyMemberJoined);
        leftChannel.removeListener('memberLeft', notifyMemberLeft);
      });
    } else {
      return Promise.resolve();
    }
  }

  
  tc.addMessageToList = function(message) {
	  	
	    var rowDiv = $('<div>').addClass('row no-margin');
	    rowDiv.loadTemplate($('#message-template'), {
	      username: message.author,
	      date: "<span style='cursor:default' title='"+dateFormatter.getTodayDate(message.timestamp)+"'>"+dateFormatter2.getTodayDate(message.timestamp)+"</span>",
	      body: message.body
	    });
	    if (message.author === tc.username) {
	      rowDiv.addClass('own-message');
	    }

	    tc.$messageList.append(rowDiv);
	    scrollToMessageListBottom();
	    
	    //añadimos para customizar chat
	    lleganMensajes(message);
	    numeroMensajes++;
	    if(numeroMensajes == mensajesIniciales){
	    		
	    		flagCargaInicialAcabada=true;
	    		updateMemberMessageReadStatus();
	    }else{
	      	//alert(numeroMensajes + "-" + mensajesIniciales);
	    }
	  };
	  function addMessageToListWellcome () {
		    var rowDiv = $('<div>').addClass('row no-margin');
		    rowDiv.loadTemplate($('#message-template'), {
		      username: "Bienvenid@",
		      date: "<span style='cursor:default' ></span>",
		      body: "Este es el chat directo con el decorador, escríbele cuando quieras para cualquier consulta. :)"
		    });

		    tc.$messageList.append(rowDiv);
		    scrollToMessageListBottom();
		  };

  function notifyMemberJoined(member) {
    notify(member.identity + ' joined the channel')
  }

  function notifyMemberLeft(member) {
    notify(member.identity + ' left the channel');
  }

  function notify(message) {
    var row = $('<div>').addClass('col-md-12');
    row.loadTemplate('#member-notification-template', {
      status: message
    });
    tc.$messageList.append(row);
    scrollToMessageListBottom();
  }

  function showTypingStarted(member) {
   // $typingPlaceholder.text(member.identity + '  typing...');
    //comienzaAEscribir(member.identity + '  esta escribiendo...');
  }

  function hideTypingStarted(member) {
	  //dejaDeEscribir(member.identity + '  esta ha dejado de escribir');
  }

  function scrollToMessageListBottom() {
    tc.$messageList.scrollTop(tc.$messageList[0].scrollHeight);
  }

  function updateChannelUI(selectedChannel) {
    var channelElements = $('.channel-element').toArray();
    var channelElement = channelElements.filter(function(element) {
      return $(element).data().sid === selectedChannel.sid;
    });
    channelElement = $(channelElement);
    if (tc.currentChannelContainer === undefined && selectedChannel.uniqueName === GENERAL_CHANNEL_UNIQUE_NAME) {
      tc.currentChannelContainer = channelElement;
    }
    tc.currentChannelContainer.removeClass('selected-channel').addClass('unselected-channel');
    channelElement.removeClass('unselected-channel').addClass('selected-channel');
    tc.currentChannelContainer = channelElement;
  }

  function showAddChannelInput() {
    if (tc.messagingClient) {
      $newChannelInputRow.addClass('showing').removeClass('not-showing');
      $channelList.addClass('showing').removeClass('not-showing');
      $newChannelInput.focus();
    }
  }

  function hideAddChannelInput() {
    $newChannelInputRow.addClass('not-showing').removeClass('showing');
    $channelList.addClass('not-showing').removeClass('showing');
    $newChannelInput.val('');
  }

  function addChannel(channel) {
	  //console.log("addchannel: "+channel);
    if (channel.uniqueName === GENERAL_CHANNEL_UNIQUE_NAME) {
      tc.generalChannel = channel;
    }
    var rowDiv = $('<div>').addClass('row channel-row');
    rowDiv.loadTemplate('#channel-template', {
      channelName: channel.friendlyName
    });

    var channelP = rowDiv.children().children().first();

    rowDiv.on('click', selectChannel);
    channelP.data('sid', channel.sid);
    if (tc.currentChannel && channel.sid === tc.currentChannel.sid) {
      tc.currentChannelContainer = channelP;
      channelP.addClass('selected-channel');
    }
    else {
      channelP.addClass('unselected-channel')
    }

    $channelList.append(rowDiv);
  }

  function deleteCurrentChannel() {
    if (!tc.currentChannel) {
      return;
    }
    if (tc.currentChannel.sid === tc.generalChannel.sid) {
      alert('You cannot delete the general channel');
      return;
    }
    tc.currentChannel.delete().then(function(channel) {
      //console.log('channel: '+ channel.friendlyName + ' deleted');
      setupChannel(tc.generalChannel);
    });
  }

  function selectChannel(event) {
    var target = $(event.target);
    var channelSid = target.data().sid;
    var selectedChannel = tc.channelArray.filter(function(channel) {
      return channel.sid === channelSid;
    })[0];
    if (selectedChannel === tc.currentChannel) {
      return;
    }
    setupChannel(selectedChannel);
  };

  function disconnectClient() {
    leaveCurrentChannel();
    $channelList.text('');
    tc.$messageList.text('');
    channels = undefined;
    $statusRow.addClass('disconnected').removeClass('connected');
    tc.$messageList.addClass('disconnected').removeClass('connected');
    $connectPanel.addClass('disconnected').removeClass('connected');
    $inputText.removeClass('with-shadow');
    $typingRow.addClass('disconnected').removeClass('connected');
  }

  tc.sortChannelsByName = function(channels) {
    return channels.sort(function(a, b) {
      if (a.friendlyName === GENERAL_CHANNEL_NAME) {
        return -1;
      }
      if (b.friendlyName === GENERAL_CHANNEL_NAME) {
        return 1;
      }
      return a.friendlyName.localeCompare(b.friendlyName);
    });
  };

  return tc;
};


