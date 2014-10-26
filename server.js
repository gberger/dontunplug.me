var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());

app.post('/alert', function(req, res) {
	console.log(req.body);
	res.end(200);
});

app.listen(port);
