var fs = require('fs');
var mailjet = require('./mailjet');

module.exports = function(data) {
	if(data.emailAddress) {
		var options = {
			to: data.emailAddress,
			from: "alert@dontunplug.me",
			subject: "UNPLUG ALERT",
			text: "YOUR DEVICE'S CHARGER HAS BEEN UNPLUGGED. "
		};

		if(data.imageFilename) {
			options.attachment = {
				value: fs.createReadStream(data.imageFilename),
				options: {
					filename: "image.jpg",
					contentType: 'image/jpg'
				}
			};
		}

		if(data.imageUrl) {
			text += data.imageUrl;
		}

		mailjet.send(options, function(err) {
			if(err) console.log(err);
		});
	};
}
