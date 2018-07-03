var db = require('diskdb');
db = db.connect(process.cwd(), [ 'empl_cab' ]);
var add = function(req, callback) {
    
    var input = JSON.parse(JSON.stringify(req.body));	    
    var cabId = input.cabId;
	var cabNo = input.cabNo;
    var driverId = input.driverId;
    var cabType = input.cabType;
    var engineNo = input.engineNo;
    var rcNo = input.rcNo;
    var vehicleType = input.vehicleType;
    var addedBy = input.addedBy;
    
	var data = {
			cabId : cabId,
			cabNo : cabNo,
            driverId:driverId,
            cabType:cabType,
            engineNo:engineNo,
            rcNo:rcNo,
            vehicleType:vehicleType,
			status : 'INACTIVE',
			creation_date : new Date()
		};	
    db.empl_cab.save(data);
	callback();
   
};

var remove = function(req, callback) {
	var cabId = req.params.cabId; 
	db.empl_cab.remove({cabId:cabId});
	callback();
};

var details = function(cabId, callback) {
	var resp = db.empl_cab.findOne({
		cabId : cabId
	});
	callback(resp);
}

var updateStatus = function(req, callback) {
	var cabId = req.params.cabId;
    var status = req.params.status;

    var query = {
    cabId : cabId
    };
    
    var dataToBeUpdate = {
        status : status
    };
    
    var options = {
   multi: false,
   upsert: false
    };
    
	db.empl_cab.update(query, dataToBeUpdate, options);
	callback("updated");
}

var updateLocation = function(msg) {
	var input = JSON.parse(msg.toString());	
	var cabId = input.cabId;
    var lat = input.lat;
    var lon = input.lon;
    var query = {
    cabId : cabId
    };
    
    var dataToBeUpdate = {
        lat : lat,
        long : lon
    };
    
    var options = {
   multi: true,
   upsert: true
    };
    
	db.empl_cab.update(query, dataToBeUpdate, options);
}

var list = function(type, callback) {
    var list=[];
//    console.log('type',type);
//    if(type == null || type==""){
//                	list=db.empl_cab.find({});
//    }else{
//                list=db.empl_cab.find({'cabType':type});
//    }
    list=db.empl_cab.find({});
	callback(list);
}

var nearbyCabList = function(startLat, startLong, type, callback) {
    var list=db.empl_cab.find({cabType:type});
   	callback(list);
}


module.exports = {
		add : add,
		remove : remove,
		details : details,
		list : list,
		updateStatus: updateStatus,
        updateLocation: updateLocation,
        nearbyCabList: nearbyCabList
}