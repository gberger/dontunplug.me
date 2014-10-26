var twilio = require("twilio");
var client = new twilio.RestClient(process.env.TWILIO_ACC, process.env.TWILIO_TOKEN);

module.exports = function(data) {
	if(data.phoneNumber) {
		client.messages.create({
			to: data.phoneNumber,
			from: process.env.TWILIO_NUMBER,
			body: "YOUR DEVICE'S CHARGER HAS BEEN UNPLUGGED"
		});

		if(data.imageUrl) {
			client.messages.create({
				to: data.phoneNumber,
				from: process.env.TWILIO_NUMBER,
				mediaUrl: data.imageUrl
			});			
		}
	}
}
