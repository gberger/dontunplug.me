var mailjet = require('./mailjet');

module.exports = function(data) {
	if(data.emailAddress) {
		mailjet.send({
			to: data.emailAddress,
			from: "alert@dontunplug.me",
			subject: "UNPLUG ALERT",
			text: "YOUR DEVICE'S CHARGER HAS BEEN UNPLUGGED",
			attachmentDataUri: data.image
		}, function(err) {
			if(err) console.log(err);
		});
	};
}
