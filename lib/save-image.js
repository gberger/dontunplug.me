var crypto = require('crypto');
var fs = require('fs');

var regex = /^data:.+;base64,(.*)$/;

module.exports = function(base64Image) {
	var id = crypto.randomBytes(64).toString('hex');
	var matches = base64Image.match(regex);
	var data = matches[1];
	var buffer = new Buffer(data, 'base64');
	var filename = __dirname + '/../tmp/' + id + '.jpg';
	fs.writeFileSync(filename, buffer);
	return filename;
}