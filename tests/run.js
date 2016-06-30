var newtifryPro = require('../lib/NewtifryPro');

var apikey = 'Your APIKEY';
var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
  apikey = priv.privateApikey;
} catch (e) {
  console.log('You have to add API_KEY and your device RegistrationId');
  process.exit();
}

var message = {
  data: {
    type: 'ntp_message',
    message: new Buffer('Test message body').toString('base64'),
    priority:	2,
    title: new Buffer('Simple test message').toString('base64'),
    source: new Buffer('Test').toString('base64'),
    state: 1 ,// sticky
    notify: 1
  }
};

var single_image_message = {
  data: {
    type: 'ntp_message',
    message: new Buffer('Test message body').toString('base64'),
    priority:	2,
    title: new Buffer('Message with one image').toString('base64'),
    source: new Buffer('Test1').toString('base64'),
    image: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    url: new Buffer('https://newtifry.appspot.com').toString('base64'),
    state: 2 // locked
  }
};

// only for version > 1.1.0
var five_images_message = {
  data: {
    type: 'ntp_message',
    message: new Buffer('Test message body').toString('base64'),
    priority:	3,
    title: new Buffer('Message with 5 images').toString('base64'),
    source: new Buffer('Test2').toString('base64'),
    image1: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    image2: new Buffer('http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg').toString('base64'),
    image3: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg').toString('base64'),
    image4: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg').toString('base64'),
    image5: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg').toString('base64'),
    url: new Buffer('https://newtifry.appspot.com').toString('base64')
  }
};

newtifryPro.sendMessage(message, apikey, registrationIds, function (err, data) {
  if (err === null) {
    console.log(data);
    console.log(message);
  } else {
    console.log(err);
  }
});

// only for NewtgifryPro >= v2.xx
newtifryPro.sendTopicMessage(single_image_message, apikey, function (err, data) {
  if (err === null) {
    console.log(data);
    console.log(single_image_message);
  } else {  
    console.log(err);
  }
});

newtifryPro.sendMessage(five_images_message, apikey, registrationIds, function (err, data) {
  if (err === null) {
    console.log(data);
    console.log(five_images_message);
  } else {
    console.log(err);
  }
});
