var NewtifryProMessage = require('../lib/NewtifryPro').NewtifryProMessage;

var apikey = 'Your APIKEY';
var registrationId = 'You first device ID';


var message1 = new NewtifryProMessage();

message1.setTitle('test message 1');
message1.setSenderId(apikey);
message1.addRegistrationId(registrationId);
message1.setMessage('OOAPI test');
message1.setSticky();
message1.send(function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});