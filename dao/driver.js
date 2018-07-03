var db = require('diskdb');
db = db.connect(process.cwd(), [ 'empl_driver' ]);

var login = function(phoneNo, password, callback) {
	var resp = db.empl_driver.findOne({
		phoneNo : phoneNo,
		password : password
	});
	callback(resp);
};

var register = function(req, callback) {
    var input = JSON.parse(JSON.stringify(req.body));
    var phoneNo= input.phoneNo;
    var password= input.password;
    var name= input.name;
    var dlNo= input.dlNo;
    
	var driver = {
		phoneNo : phoneNo,
		password : password,
		name : name,
        dlNo:dlNo
	}
	var id=db.empl_driver.save(driver);
    callback({driverId:id._id});
};

var details = function(phoneNo, callback) {
	var resp = db.empl_driver.findOne({
		phoneNo : phoneNo
	});
	callback(resp);
};

var logout = function(driverId, callback) {
	var driver = details(driverId, function(resp){
		if(resp != null){
			//db.empl_driver.del(resp);	
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