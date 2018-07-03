var driver = require('../dao/driver');

var register = function(req, res) {
	driver.register(req, function(response){	
		res.status(201).send(response);
	});	
};

var login = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	driver.login(input.phoneNo, input.password, function(response){	
		if(response == null || response==""){
			res.status(401).send('Invalid credentials');
		}
		res.status(200).send(response);
	});	
};

var details = function(req, res) {
	var phoneNo = req.params.phoneNo;
	driver.details(phoneNo, function(response){	
		if(response == null || response==""){
			res.status(404).send('Not Found');
		}
		res.status(200).send(response);
	});	
};

var logout = function(req, res) {
	var driverId = req.params.driverId;
	driver.logout(driverId, function(response){	
		res.status(200).send(response);
	});
	
};


module.exports = {
	login : login,
	logout: logout,
    register: register,
    details: details
};
    

