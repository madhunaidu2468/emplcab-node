var user = require('../dao/user');

var login = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	user.login(input.phoneNo, input.password, function(response) {
		if (response == null || response == "") {
			res.status(401).send('Invalid credentials');
		}
		res.status(200).send(response);
	});

};

var logout = function(req, res) {
	var phoneNo = req.params.phoneNo;
	user.logout(phoneNo, function(response) {
		res.status(200).send(response);
	});

};

var register = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	user.register(input.phoneNo, input.password, function(response) {
		res.status(201).send(response);
	});

};

var details = function(req, res) {
	var phoneNo = req.params.phoneNo;
	user.details(phoneNo, function(response){	
		if(response == null || response==""){
			res.status(404).send('Not Found');
		}
		res.status(200).send(response);
	});	
};

module.exports = {
	login : login,
	logout : logout,
	register : register,
    details: details
};
