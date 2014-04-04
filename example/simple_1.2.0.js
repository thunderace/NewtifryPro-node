var newtifryPro = require('../lib/NewtifryPro');
var fs = require('fs');

var apikey = 'Your APIKEY';
var registrationIds = [];
registrationIds.push('You first device ID');
registrationIds.push('You second device ID');


var single_image_message = {
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with one image').toString('base64'),
		source: new Buffer('test').toString('base64'),
		image: new Buffer('http://www.newtifry.org/test_newtifry.jpg').toString('base64'),
//		url: new Buffer('url').toString('base64'),
//		image: new Buffer('image url').toString('base64'),
//		speak: 1, // -1 : default app config - 0 : don't speak - 1 : always speak
//		nocache: 0, // -1 : default app config - 0 : don't cache image(s) - 1 always cache images
//		notify : 1 // -1 : default app config - 0 : don't notify - 1 always notify
    }
};

var five_images_message = {
	data: {
		type: 'ntp_message',
		message: new Buffer('Test message body').toString('base64'),
		priority:	2,
		title: new Buffer('Message with 5 images').toString('base64'),
		source: new Buffer('test').toString('base64'),
		image1: new Buffer('http://www.newtifry.org/test_newtifry1.jpg').toString('base64'),
		image2: new Buffer('http://www.newtifry.org/test_newtifry2.png').toString('base64'),
		image3: new Buffer('http://www.newtifry.org/test_newtifry3.jpg').toString('base64'),
		image4: new Buffer('http://www.newtifry.org/test_newtifry4.jpg').toString('base64'),
		image5: new Buffer('http://www.newtifry.org/test_newtifry5.jpg').toString('base64')
    }
};


newtifryPro.sendMessage(single_image_message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});

newtifryPro.sendMessage(five_images_message, apikey, registrationIds, function (err, data) {
	if (err === null) {
		console.log(data);
	} else {
		console.log(err);
	}
});