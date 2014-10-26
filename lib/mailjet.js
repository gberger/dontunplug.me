var fs = require('fs');
var crypto = require('crypto');
var request = require('request');
var streamifier = require('streamifier');
var exec = require('exec');

var regex = /^data:.+;base64,(.*)$/;

module.exports = {
	send: function(formData, callback) {
		var command = 'curl -X POST --user "' + process.env.MAILJET_API_KEY + ':' + process.env.MAILJET_API_SECRET + '" https://api.mailjet.com/v3/send/message '
			+ "-F from='DONTUNPLUGME ALERT <alert@dontunplug.me>' "
			+ "-F to='" + formData.to + "'' "
			+ "-F subject='UNPLUG ALERT' "
			+ "-F text=\"YOUR DEVICE'S CHARGER HAS BEEN UNPLUGGED\" "

		if(formData.attachmentDataUri) {
			var id = crypto.randomBytes(64).toString('hex');
			var matches = formData.attachmentDataUri.match(regex);
			var data = matches[1];
			var buffer = new Buffer(data, 'base64');
			var filename = __dirname + '/../tmp/' + id + '.jpg';
			fs.writeFileSync(filename, buffer);

			command += "-F attachment='@" + filename + ";filename=image.jpg' "
		}

		exec(command, function(err, out, code) {
			process.stderr.write(err);
			process.stdout.write(out);
		});
	}
}
