var db = require('diskdb');
db = db.connect(process.cwd(), [ 'empl_user' ]);

var login = function(phoneNo, password, callback) {
	var resp = db.empl_user.findOne({
		phoneNo : phoneNo,
		password : password
	});
	callback(resp);
};

var register = function(phoneNo, password, callback) {
	var user = {
		phoneNo : phoneNo,
		password : password,
		name : "test"
	}
	var id=db.empl_user.save(user);
    callback({userId:id._id});
};

var details = function(phoneNo, callback) {
	var resp = db.empl_user.findOne({
		phoneNo : phoneNo
	});
	callback(resp);
};

var logout = function(phoneNo, callback) {
	var user = details(phoneNo, function(resp){
		if(resp != null){
			//db.empl_user.del(resp);	
		}
	});
	callback();
};

module.exports = {
	login : login,
	logout : logout,
	register : register,
    details: details
};