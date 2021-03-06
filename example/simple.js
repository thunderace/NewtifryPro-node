var newtifryPro = require('../lib/NewtifryPro');

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
    image: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64')
  }
};

var five_images_message = {
  data: {
    type: 'ntp_message',
    message: new Buffer('Test message body').toString('base64'),
    priority:	2,
    title: new Buffer('Message with 5 images').toString('base64'),
    source: new Buffer('test').toString('base64'),
    image1: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    image2: new Buffer('http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg').toString('base64'),
    image3: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg').toString('base64'),
    image4: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg').toString('base64'),
    image5: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg').toString('base64')
  }
};

var full_message = {
  data: {
    type: 'ntp_message',
    source: new Buffer('test').toString('base64'),
    title: new Buffer('Message with 5 images').toString('base64'),
    message: new Buffer('Test message body').toString('base64'),
    nocache : 1, // 0 : images will be loaded and put on disk cache, 1 : image(s) will not be put in disk cache
    state : 0, // 0 : nothing, 1 : sticky message, 2 : locked message
    speak: 0, // -1 : system default, 0 : don't speak, 1 : force speak  
    notify: 1, // -1 : system default, 0 : don't notify, 1 : force notify  
    vibrate : 0, // -1 : system default, 0 : don't vibrate, 1 : force vibrate  
    priority:	2,
    url : new Buffer('https://github.com/thunderace/NewtifryPro').toString('base64'),
    image1: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG').toString('base64'),
    image2: new Buffer('http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg').toString('base64'),
    image3: new Buffer('http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg').toString('base64'),
    image4: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg').toString('base64'),
    image5: new Buffer('http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg').toString('base64'),
  }
};



newtifryPro.sendMessage(single_image_message, apikey, registrationIds, function (err, data) {
  if (err === null) {
    console.log(data);
  } else {
    console.log(err);
  }
});

// only for NewtifryPro >= v2.xx
newtifryPro.sendMessageToTopic(full_message, apikey, 'newtifrypro', function (err, data) {
  if (err === null) {
    console.log(data);
  } else {  
    console.log(err);
  }
});

