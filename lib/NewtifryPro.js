/**
 * NewtifryPro - nodeJS message push script.
 * for version up to 1.2.0
 */

var fcmV1Http2 = require('fcm-v1-http2');
var crypto = require('crypto');  

var fcmClientV1;

function init2(project_id, client_email, private_key) {
  fcmClientV1 = new fcmV1Http2({
    // Pass in your service account JSON private key file (https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk)
    serviceAccount: { project_id: project_id, client_email: client_email, private_key: private_key },
    // Max number of concurrent HTTP/2 sessions (connections)
    maxConcurrentConnections: 1,
    // Max number of concurrent streams (requests) per session
    maxConcurrentStreamsAllowed: 1
  });
}

function init(path_to_google_service_account_file) {
  fcmClientV1 = new fcmV1Http2({
    // Pass in your service account JSON private key file (https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk)
    serviceAccount: require(path_to_google_service_account_file),
    // Max number of concurrent HTTP/2 sessions (connections)
    maxConcurrentConnections: 1,
    // Max number of concurrent streams (requests) per session
    maxConcurrentStreamsAllowed: 1
  });
}

function sendMessage(message, registrationIds, callback) {
  //console.log('NPsendMessage : ' + JSON.stringify(message.data));
  if (message === undefined) {
		return callback(-1, 'message.data must be defined');
	}

  var NTPmessage = {
    data: {
      type: 'ntp_message',
      title: Buffer.from(message.title).toString('base64')
    },
    android: {
      priority:"high"
    }
  };
	if (!message.timestamp) {
		var now = new Date();
		var timestampSplit = now.toISOString().split('.'); 
		NTPmessage.data.timestamp = timestampSplit[0];
  } else {
    NTPmessage.data.timestamp = message.timestamp;
  }

  if (message.NPpriority) {
    NTPmessage.data.NPpriority = Buffer.from(message.NPpriority.toString()).toString('base64');
  }
  if (message.nocache) {
    NTPmessage.data.nocache = Buffer.from(message.nocache.toString()).toString('base64');
  }
  if (message.speak) {
    NTPmessage.data.speak = Buffer.from(message.speak.toString()).toString('base64');
  }
  if (message.notify) {
    NTPmessage.data.notify = Buffer.from(message.notify.toString()).toString('base64');
  }
  if (message.state) {
    NTPmessage.data.state = Buffer.from(message.state.toString()).toString('base64');
  }
  if (message.source) {
    NTPmessage.data.source = Buffer.from(message.source).toString('base64');
  }
  if (message.message) {
    NTPmessage.data.message = Buffer.from(message.message).toString('base64');
  }
  if (message.url) {
      NTPmessage.data.url = Buffer.from(message.url).toString('base64');
  } else {
    if (message.image) {
      NTPmessage.data.image = Buffer.from(message.image).toString('base64');
    } else {
		  if (message.image1) {
			  NTPmessage.data.image1 = Buffer.from(message.image1).toString('base64');		
		  }
  	  if (message.image2) {
			  NTPmessage.data.image2 = Buffer.from(message.image2).toString('base64');		
		  }
  	  if (message.image3) {
			  NTPmessage.data.image3 = Buffer.from(message.image3).toString('base64');		
		  }
  	  if (message.image4) {
			  NTPmessage.data.image4 = Buffer.from(message.image4).toString('base64');		
		  }
  	  if (message.image5) {
		  	NTPmessage.data.image5 = Buffer.from(message.image5).toString('base64');		
		  }
    }
  }

  var toSend = JSON.stringify(NTPmessage.data);
  var totalLength = Buffer.byteLength(toSend, 'utf8');
  console.log('Msg Size : ' + totalLength);
  
  if (totalLength > 4096) {
  	console.log('Message to big : spliting');
    // body is to big so we have to split it x parts
    var maxSize = 4096;
    var part = 0;                                                                                                                                                                                                
    var partCount = Math.ceil(totalLength / maxSize);     
    var hash = crypto.createHash('md5').update(toSend).digest('hex');  
    while(totalLength > maxSize) {                                                                                                                                                                               
      var partMessage = {
        data : {
          type: 'ntp_message_multi',
          priority:	message.priority,
          partcount:  partCount.toString(),                                                                                                                                                                                   
          hash:       hash,                                                                                                                                                                                        
          index: (part + 1).toString(),                                                                                                                                                                                          
          body:  toSend.substr(part * maxSize, maxSize)
        }
      };
  		FCMsend(partMessage, registrationIds, callback);
      totalLength -= maxSize;                                                                                                                                                                                    
      part++;                                                                                                                                                                                                    
    }                                                                                                                                                                                                            
    if (totalLength > 0) {                                                                                                                                                                                       
      partMessage = {                                                                                                                                                                                            
        data : {
          type: 'ntp_message_multi',                                                                                                                                                                                       
          NPpriority:	message.NPpriority,
          hash:       hash,                                                                                                                                                                                        
          partcount: partCount.toString(),                                                                                                                                                                                    
          index:  (part + 1).toString(),                                                                                                                                                                                          
          body:  toSend.substr(part * maxSize, maxSize)                                                                                                                                                         
        }
      };                                                                                                                                                                                                         
  		FCMsend(partMessage, registrationIds, callback);
      //send(JSON.stringify(body), senderKey, callback);
    }                                        
  } else {
  	FCMsend(NTPmessage, registrationIds, callback);
  }
}

function FCMsend(message, registrationIds, callback) {
  fcmClientV1.sendMulticast(message, registrationIds).then((unregisteredTokens) => {
  		console.log('Msg sent');
      // Remove unregistered tokens from your database
      if (unregisteredTokens.length > 0) {
          console.log('Unregistered device token(s): ', unregisteredTokens.join(', '));
      }
      callback(null);
  }).catch((err) => {
      // Sending failed
      // Log error to console
  		console.log('Send Error');
      callback(-2, err);
  });
}

module.exports.sendMessage = sendMessage;
module.exports.init = init;
module.exports.init2 = init2;
