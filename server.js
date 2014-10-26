var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 9000;

var mobileAlert = require('./lib/mobile-alert');
var emailAlert = require('./lib/email-alert');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());

app.post('/alert', function(req, res) {
	mobileAlert(req.body);
	emailAlert(req.body);
	res.sendStatus(200);
});

app.listen(port);
