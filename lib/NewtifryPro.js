/**
 * NewtifryPro - nodeJS message push script.
 * for version up to 1.2.0
 */

var fcmV1Http2 = require('fcm-v1-http2');
var crypto = require('crypto');  



function SendController(timeout) {
  this.timeout = timeout || 500;
  this.queue = [];
  this.ready = true;
}

SendController.prototype.send = function(body, callback) {
  sendMessage(body, this.registrationIds, callback);
};

SendController.prototype.exec = function() {
  this.queue.push(arguments);
  this.process();
};

SendController.prototype.process = function() {
  if (this.queue.length === 0) return;
  if (!this.ready) return;
  var self = this;
  this.ready = false;
  this.send.apply(this, this.queue.shift());
  setTimeout(function () {
    self.ready = true;
    self.process();
  }, this.timeout);
};




var fcmClientV1;
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
	if (message.timestamp === undefined) {
		var now = new Date();
		var timestampSplit = now.toISOString().split('.'); 
		message.timestamp = timestampSplit[0];
  }

  var NTPmessage = {
    data: {
      type: 'ntp_message',
      title: Buffer.from(message.title).toString('base64')
    }
  };
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
/*  
  var toSend = JSON.stringify(message.data);
  var totalLength = Buffer.byteLength(toSend, 'utf8');
  if (totalLength > 4096) {
  	console.log('Message to big : spliting');
    // body is to big so we have to split it x parts
    var maxSize = 4096;
    var part = 0;                                                                                                                                                                                                
    var partCount = Math.ceil(totalLength / maxSize);     
    var hash = crypto.createHash('md5').update(toSend).digest('hex');  
    while(totalLength > maxSize) {                                                                                                                                                                               
      var partMessage = {                                                                                                                                                                                        
        type: 'ntp_message_multi',
        priority:	message.priority,
        partcount:  partCount.toString(),                                                                                                                                                                                   
        hash:       hash,                                                                                                                                                                                        
        index: (part + 1).toString(),                                                                                                                                                                                          
        body:  toSend.substr(part * maxSize, maxSize)                                                                                                                                                         
      };
  		FCMsend(partMessage, registrationIds, callback);
      totalLength -= maxSize;                                                                                                                                                                                    
      part++;                                                                                                                                                                                                    
    }                                                                                                                                                                                                            
    if (totalLength > 0) {                                                                                                                                                                                       
      partMessage = {                                                                                                                                                                                            
        type: 'ntp_message_multi',                                                                                                                                                                                       
        NPpriority:	message.NPpriority,
        hash:       hash,                                                                                                                                                                                        
        partcount: partCount.toString(),                                                                                                                                                                                    
        index:  (part + 1).toString(),                                                                                                                                                                                          
        body:  toSend.substr(part * maxSize, maxSize)                                                                                                                                                         
      };                                                                                                                                                                                                         
  		FCMsend(partMessage, registrationIds, callback);
      //send(JSON.stringify(body), senderKey, callback);
    }                                        
  } else {
  	FCMsend(message.data, registrationIds, callback);
  }
 */
  	FCMsend(NTPmessage, registrationIds, callback);
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



function NewtifryProMessage() {
    if((this instanceof NewtifryProMessage) === false) {
        return new NewtifryProMessage();
    }
	this.images = [];    
	this.url = null;
	this.registrationIds = [];
	this.date = null;
	this.message = null;
	this.NPpriority = 0;
	this.title = null;
	this.source = null;
	this.speak = -1;
	this.noCache = -1;
	this.notify = -1;
	this.senderId = null;
	this.state = 0;
	this.vibrate = -1;
	this.tag = null;
}

NewtifryProMessage.prototype.send = function(callback) {
  var data = {};

	if (this.senderId === null) {
		return;
	}
	if (this.title === null) {
		return;
	}
	if ( this.date instanceof Date === false) {
		this.date = new Date();
	}

	data.type = 'ntp_message';
	data.timestamp = this.date.toISOString().split('.')[0];
	data.title = new Buffer.from(this.title).toString('base64');
	data.message = new Buffer.from(this.message).toString('base64');

	if (this.source) {
		data.source = new Buffer.from(this.source).toString('base64');
	}
	if (this.url) {
		data.url = new Buffer.from(this.url).toString('base64');
	}
	if (this.tag) {
		data.tag = new Buffer.from(this.tag).toString('base64');
	}
	if (this.images.length !== 0) {
		if (this.images.length == 1 ) {
			data.image = new Buffer.from(this.images[0]).toString('base64');		
		} else {
			if (typeof this.images[0] !== 'undefined') {
				data.image1 = new Buffer.from(this.images[0]).toString('base64');		
			}
			if (typeof this.images[1] !== 'undefined') {
				data.image2 = new Buffer.from(this.images[1]).toString('base64');		
			}
			if (typeof this.images[2] !== 'undefined') {
				data.image3 = new Buffer.from(this.images[2]).toString('base64');		
			}
			if (typeof this.images[3] !== 'undefined') {
				data.image4 = new Buffer.from(this.images[3]).toString('base64');		
			}
			if (typeof this.images[4] !== 'undefined') {
				data.image5 = new Buffer.from(this.images[4]).toString('base64');		
			}
		}
	}
	if (this.notify != -1) {
		data.notify = Buffer.from(this.notify.toString()).toString('base64');
	}
	if (this.noCache != -1) {
		data.noCache = Buffer.from(this.noCache.toString()).toString('base64');
	}
	if (this.speak != -1) {
		data.speak = Buffer.from(this.speak.toString()).toString('base64');
	}
	if (this.state !== 0) {
		data.state = Buffer.from(this.state.toString()).toString('base64');
	}
	data.NPpriority = Buffer.from(this.NPpriority.toString()).toString('base64');

  var message = {
    data : data
  };
  sendMessage(message, this.senderId, this.registrationIds, callback);
};

NewtifryProMessage.prototype.setSenderId = function(senderId) {
	this.senderId = senderId;
};


NewtifryProMessage.prototype.addImage = function(imageUrl) {
	this.images.push(imageUrl);
};

NewtifryProMessage.prototype.setUrl = function(url) {
	this.url = url;
};

NewtifryProMessage.prototype.setTag = function(tag) {
	this.tag = tag;
};

NewtifryProMessage.prototype.setMessage = function(message) {
	this.message = message;
};

NewtifryProMessage.prototype.setTitle = function(title) {
	this.title = title;
};

NewtifryProMessage.prototype.setSource = function(source) {
	this.source = source;
};

NewtifryProMessage.prototype.setDate = function(date) {
	this.date = date;
};

NewtifryProMessage.prototype.setSticky = function() {
	this.state = 1;
};

NewtifryProMessage.prototype.setLocked = function() {
	this.state = 2;
};

NewtifryProMessage.prototype.setNormalPriority = function() {
	this.NPpriority = 0;
};

NewtifryProMessage.prototype.setInfoPriority = function() {
	this.NPpriority = 1;
};

NewtifryProMessage.prototype.setWarningPriority = function() {
	this.NPpriority = 2;
};

NewtifryProMessage.prototype.setAlertPriority = function() {
	this.NPpriority = 3;
};

NewtifryProMessage.prototype.setPriority = function(priority) {
  if (priority > 3) {
    priority = 3;
  }
  if (priority < -512) {
    priority = -512;
  }
  
	this.NPpriority = priority;
};

NewtifryProMessage.prototype.speak = function() {
	this.speak = 1;
};

NewtifryProMessage.prototype.noSpeak = function() {
	this.speak = 0;
};

NewtifryProMessage.prototype.cacheImages = function() {
	this.cache = 1;
};

NewtifryProMessage.prototype.noCacheImage = function() {
	this.cache = 0;
};

NewtifryProMessage.prototype.notify = function() {
	this.notify = 1;
};

NewtifryProMessage.prototype.noNotify = function() {
	this.notify = 0;
};

NewtifryProMessage.prototype.vibrate = function() {
	this.vibrate = 1;
};

NewtifryProMessage.prototype.noVibrate = function() {
	this.vibrate = 0;
};

NewtifryProMessage.prototype.addRegistrationId = function(regId) {
	this.registrationIds.push(regId);
};



module.exports.sendMessage = sendMessage;
module.exports.init = init;
module.exports.NewtifryProMessage = NewtifryProMessage;
