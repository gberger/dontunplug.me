var request = require('request');

module.exports = {
	send: function(formData, callback) {
		return request.post({
			url: "https://api.mailjet.com/v3/send",
			auth: {user: process.env.MAILJET_API_KEY, pass: process.env.MAILJET_API_SECRET},
			formData: formData,
		}, callback)
	}
}
