var newtifryPro = require('../lib/NewtifryPro');

var registrationIds = [];

try {
  var priv = require('./credentials.js');
  registrationIds.push(priv.privateDeviceId);
} catch (e) {
  console.log('You have to add your device RegistrationId');
  process.exit();
}

var message = {
  type: 'ntp_message',
  message: 'Test message body',
  priority:	2,
  title: 'Simple test message',
  source: 'Test',
  notify: 1, 
};

var message_with_tag = {
  type: 'ntp_message',
  message: 'Test message body' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  priority:	2,
  title: 'Message with tag',
  source: 'Test',
  state: 1 ,// sticky
  notify: 1, 
  tag: 'message_with_tag'
};

var single_image_message = {
  type: 'ntp_message',
  message: 'Test message body',
  priority:	2,
  title: 'Message with one image',
  source: 'Test1',
  image: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG',
  url: 'https://newtifry.appspot.com',
  state: 2 // locked
};

// only for version > 1.1.0
var five_images_message = {
  type: 'ntp_message',
  message: 'Test message body',
  priority:	3,
  title: 'Message with 5 images',
  source: 'Test2',
  image1: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG',
  image2: 'http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg',
  image3: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg',
  image4: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg',
  image5: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg',
  url: 'https://newtifry.appspot.com'
};

var full_message = {
  type: 'ntp_message',
  source: 'TestFull',
  title: 'Message with 5 images',
  message: 'Test message body',
  nocache : 1, // 0 : images will be loaded and put on disk cache, 1 : image(s) will not be put in disk cache
  state : 0, // 0 : nothing, 1 : sticky message, 2 : locked message
  speak: 0, // -1 : system default, 0 : don't speak, 1 : force speak  
  notify: 0, // -1 : system default, 0 : don't notify, 1 : force notify  
  priority:	2,
  url : 'https://github.com/thunderace/NewtifryPro',
  image1: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG',
  image2: 'http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg',
  image3: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg',
  image4: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg',
  image5: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg',
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

newtifryPro.init('../serviceAccount.json');
/*
or 
newtifryPro.init2((project_id, client_email, private_key);
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


