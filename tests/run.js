var newtifryPro = require('../lib/NewtifryPro');

var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
} catch (e) {
  console.log('You have to add API_KEY and your device RegistrationId');
  process.exit();
}

var message = {
  data: {
    type: 'ntp_message',
    message: new Buffer.from('Test message body').toString('base64'),
    priority:	2,
    title: new Buffer.from('Simple test message').toString('base64'),
    source: new Buffer.from('Test').toString('base64'),
    notify: 1, 
  }
};

var message_with_tag = {
  data: {
    type: 'ntp_message',
    message: new Buffer.from('Test message body' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString('base64'),
    priority:	2,
    title: new Buffer.from('Simple test message').toString('base64'),
    source: new Buffer.from('Test').toString('base64'),
    state: 1 ,// sticky
    notify: 1, 
    tag: 'message_with_tag'
  }
};

var single_image_message = {
  data: {
    type: 'ntp_message',
    message: new Buffer.from('Test message body').toString('base64'),
    priority:	2,
    title: new Buffer.from('Message with one image').toString('base64'),
    source: new Buffer.from('Test1').toString('base64'),
    image: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    url: new Buffer.from('https://newtifry.appspot.com').toString('base64'),
    state: 2 // locked
  }
};

// only for version > 1.1.0
var five_images_message = {
  data: {
    type: 'ntp_message',
    message: new Buffer.from('Test message body').toString('base64'),
    priority:	3,
    title: new Buffer.from('Message with 5 images').toString('base64'),
    source: new Buffer.from('Test2').toString('base64'),
    image1: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    image2: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg').toString('base64'),
    image3: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg').toString('base64'),
    image4: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg').toString('base64'),
    image5: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg').toString('base64'),
    url: new Buffer.from('https://newtifry.appspot.com').toString('base64')
  }
};

var full_message = {
  data: {
    type: 'ntp_message',
    source: new Buffer.from('TestFull').toString('base64'),
    title: new Buffer.from('Message with 5 images').toString('base64'),
    message: new Buffer.from('Test message body').toString('base64'),
    nocache : 1, // 0 : images will be loaded and put on disk cache, 1 : image(s) will not be put in disk cache
    state : 0, // 0 : nothing, 1 : sticky message, 2 : locked message
    speak: 0, // -1 : system default, 0 : don't speak, 1 : force speak  
    notify: 0, // -1 : system default, 0 : don't notify, 1 : force notify  
    priority:	2,
    url : new Buffer.from('https://github.com/thunderace/NewtifryPro').toString('base64'),
    image1: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    image2: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg').toString('base64'),
    image3: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg').toString('base64'),
    image4: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg').toString('base64'),
    image5: new Buffer.from('http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg').toString('base64'),
  }
};


/*
newtifryPro.sendMessage(message, apikey, registrationIds, function (err, data) {
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

// only for NewtifryPro >= v2.xx
/*
newtifryPro.sendMessageToTopic(single_image_message, apikey, 'domo', function (err, data) {
  if (err === null) {
    console.log(data);
  } else {  
    console.log(err);
  }
});
*/
/*
// only for NewtifryPro >= v2.xx
newtifryPro.sendMessageToTopic(full_message, apikey, 'domo', function (err, data) {
  if (err === null) {
    console.log(data);
  } else {  
    console.log(err);
  }
});
*/
// only for NewtifryPro >= v2.10
newtifryPro.sendMessage(message, registrationIds, function (err, data) {
  if (err === null) {
    console.log(data);
  } else {
    console.log('Err : ' + err);
    console.log('Data : ' + data);
  }
});


