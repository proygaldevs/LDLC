
/*describe('TwilioChat', function() {
  context('#sortChannelsByName()', function() {
    it('sorts channels by name', function() {
      var channels = [
        {friendlyName: 'BBB'},
        {friendlyName: 'BBA'},
        {friendlyName: 'BBA'},
      ];
      var result = twiliochat.sortChannelsByName(channels);
      assert.deepEqual(result,
                       [{friendlyName: 'BBA'}, {friendlyName: 'BBA'},
                       {friendlyName: 'BBB'}]
      );
    });

    it('sorts an empty list', function() {
      var channels = [];
      var result = twiliochat.sortChannelsByName(channels);
      assert.deepEqual(result, []);
    });
  });

  context('#addMessageToList()', function() {
    it('adds a message to chat', function() {
      var message = {
        body: 'test message',
        author: 'me',
        timestamp: new Date(),
      };
      var messageList = twiliochat.$messageList;
      twiliochat.addMessageToList(message);
      assert.isOk(messageList.html().includes('test message'));
    });
  });
*/

function cargarChat(){
	//conectarCliente('PAL');
}
  function conectarCliente(nombre){
	  twiliochat.connectClient(nombre);
  }
  function createAndJoinChannel(probando){//creamos un canal sino existe y nos unimos a el
	  
  }
  function onloadBody(){
		 $('#connect-image').on('click', cargarChat());
	}
 /* context('#joinGeneralChannel()', function() {
    it('creates a general channel if not present', function() {
      var messagingClientMock = {createChannel: function() {}};
      var mock = sinon.mock(messagingClientMock);
      twiliochat.messagingClient = messagingClientMock;
      mock.expects('createChannel').once().returns({then: function() {}});
      twiliochat.generalChannel = undefined;
      twiliochat.joinGeneralChannel();
      mock.verify();
    });

    it('creates a new channel', function() {
      var messagingClientMock = {createChannel: function() {}};
      var mock = sinon.mock(messagingClientMock);
      twiliochat.messagingClient = messagingClientMock;
      mock.expects('createChannel').once().returns({then: function() {}});
      twiliochat.handleNewChannelInputKeypress(
          {keyCode: 13, preventDefault: function() {}}
      );
      mock.verify();
    });
  });

  context('#loadChannelList()', function() {
    it('gets a list of channels', function() {
      var messagingClientMock = {getPublicChannels: function() {}};
      var mock = sinon.mock(messagingClientMock);
      twiliochat.messagingClient = messagingClientMock;
      mock.expects('getPublicChannels').once().returns({then: function() {}});
      twiliochat.loadChannelList();
      mock.verify();
    });
  });
});
*/