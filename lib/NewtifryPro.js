 var Constants = require('./constants');

var https = require('https');
var timer = require('timers');
var req = require('request')

function sendMessage(message, senderKey, registrationIds, callback) {
    var body = {},
        requestBody,
        post_options,
        post_req,
        timeout;

    if (message.data === undefined) {
		return callback(-1, 'message.data must be defined');
	}
	
	if (message.data.timestamp === undefined) {
		var now = new Date();
		message.data.timestamp = now.toISOString();
    }
	body[Constants.PARAM_PAYLOAD_KEY] = message.data;


    body[Constants.JSON_REGISTRATION_IDS] = registrationIds;

    if (message.delayWhileIdle !== undefined) {
        body[Constants.PARAM_DELAY_WHILE_IDLE] = message.delayWhileIdle;
    }
    if (message.collapseKey !== undefined) {
        body[Constants.PARAM_COLLAPSE_KEY] = message.collapseKey;
    }
    if (message.timeToLive !== undefined) {
        body[Constants.PARAM_TIME_TO_LIVE] = message.timeToLive;
    }

    requestBody = JSON.stringify(body);

    post_options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-length': Buffer.byteLength(requestBody, 'utf8'),
            'Authorization': 'key=' + senderKey
        },
        uri: Constants.GCM_SEND_URI,
        body: requestBody
    };

    timeout = Constants.SOCKET_TIMEOUT;

    post_options.timeout = timeout;

    post_req = req(post_options, function (err, res, resBody) {

        if (err)
            return callback(err, null);

        if (!res)
            return callback('response is null', null);

        if (res.statusCode === 503) {
            console.log('GCM service is unavailable');
            return callback(res.statusCode, null);
        } else if(res.statusCode == 401){
            console.log('Unauthorized');
            return callback(res.statusCode, null);
        } else if (res.statusCode !== 200) {
            console.log('Invalid request: ' + res.statusCode);
            return callback(res.statusCode, null);
        }

        // Make sure that we don't crash in case something goes wrong while
        // handling the response.
        try {
            var data = JSON.parse(resBody);
        } catch (e) {
            console.log("Error handling GCM response " + e);
            return callback("error", null);
        }
        callback(null, data);
    });
}

module.exports.sendMessage =  sendMessage;
