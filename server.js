var _ = require('underscore');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 9000;

var mobileAlert = require('./lib/mobile-alert');
var emailAlert = require('./lib/email-alert');
var saveImage = require('./lib/save-image');

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/tmp'));
app.use(bodyParser.json());

app.post('/alert', function(req, res) {
	if(req.body.image) {
		req.body.imageFilename = saveImage(req.body.image);
		req.body.imageUrl = "http://dontunplug.me/" + _.last(req.body.imageFilename.split('/'));
		delete req.body.image;
	}
	mobileAlert(req.body);
	emailAlert(req.body);
	res.sendStatus(200);
});

app.listen(port);
