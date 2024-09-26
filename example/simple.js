var newtifryPro = require('../lib/NewtifryPro');

var registrationIds = [];
registrationIds.push('You first device ID');
registrationIds.push('You second device ID');


newtifryPro.init('../serviceAccount.json');
/*
or 
newtifryPro.init2((project_id, client_email, private_key);
*/


var single_image_message = {
  data: {
    type: 'ntp_message',
    message: 'Test message body',
    priority:	2,
    title: 'Message with one image',
    source: 'test',
    image: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG'
  }
};

var five_images_message = {
  data: {
    type: 'ntp_message',
    message: 'Test message body',
    priority:	2,
    title: 'Message with 5 images',
    source: 'test',
    image1: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG',
    image2: 'http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg',
    image3: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg',
    image4: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg',
    image5: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg'
  }
};

var full_message = {
  data: {
    type: 'ntp_message',
    source: 'test',
    title: 'Message with 5 images',
    message: 'Test message body',
    nocache : 1, // 0 : images will be loaded and put on disk cache, 1 : image(s) will not be put in disk cache
    state : 0, // 0 : nothing, 1 : sticky message, 2 : locked message
    speak: 0, // -1 : system default, 0 : don't speak, 1 : force speak  
    notify: 1, // -1 : system default, 0 : don't notify, 1 : force notify  
    vibrate : 0, // -1 : system default, 0 : don't vibrate, 1 : force vibrate  
    priority:	2,
    url : 'https://github.com/thunderace/NewtifryPro',
    image1: 'http://upload.wikimedia.org/wikipedia/commons/b/b5/PA120016.JPG',
    image2: 'http://upload.wikimedia.org/wikipedia/commons/c/c3/The_Blue_Bell_-_geograph.org.uk_-_163687.jpg',
    image3: 'http://upload.wikimedia.org/wikipedia/commons/b/b3/Trassenheide%2C_Die_Welt_steht_Kopf.jpg',
    image4: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Bachorza%2C_dw%C3%B3r_A-259.jpg',
    image5: 'http://upload.wikimedia.org/wikipedia/commons/2/20/Interior_of_log_house.jpg',
  }
};



newtifryPro.sendMessage(single_image_message, registrationIds, function (err, data) {
  if (err === null) {
    console.log(data);
  } else {
    console.log(err);
  }
});

