var db = require('diskdb');
db = db.connect(process.cwd(), [ 'empl_trip' ]);
var mqtt=require('../mqtt/mqtt');

var cab=require('./cab');

var create = function(req, callback) {
    var input = JSON.parse(JSON.stringify(req.body));	
	var userId = input.userId;
    var startLat = input.startLat;
    var startLong = input.startLong;
    var endLat = input.endLat;
    var endLong = input.endLong;
    var tripType = input.tripType;
    var cabType = input.cabType;
    var coupon = input.coupon;    
    var status = 'waiting';

    var cab=getNearestCab(startLat,startLong,cabType, function(response){
       console.log('cab',response);
	var data = {
		userId : userId,
		startLat : startLat,
		startLong : startLong,
        endLat : endLat,
        endLong : endLong,
        tripType : tripType,
        cabType : cabType,
        coupon: coupon,
        status: status,
        cabNo: response.cabNo,
        cabId: response.cabId,
        driverId: response.driverId
    };
	var id=db.empl_trip.save(data);
        console.log('id',id);
        var driverMsg={tripId:id._id, topic:id._id, cabId:id.cabId, userId : id.userId, lat:startLat, long:startLong};
        var userMsg={tripId:id._id, topic:id._id, cabId:id.cabId, cabNo:id.cabNo, driverId:id.driverId, lat:response.lat, long:response.long};
        
        console.log('driverMsg',driverMsg);
        console.log('userMsg',userMsg);
        
    mqtt.push(id.driverId, JSON.toString(driverMsg));
	callback(userMsg); 
    });
    
};

var getNearestCab=function(startLat, startLong, cabType, callback){
    cab.nearbyCabList(startLat, startLong, cabType, function(response){
        callback(response[0]);
    });
}

var start = function(req, callback) {
    var input = JSON.parse(JSON.stringify(req.body));	
    var tripId = input.tripId;
    var startLat = input.startLat;
    var startLong = input.startLong;
    var otp = input.otp;
    var status = 'active';
    
    var query = {
    _id : tripId
    };
    
    var dataToBeUpdate = {
        startLat : startLat,
		startLong : startLong,
		otp : otp,
        status:status
    };
    
    var options = {
   multi: false,
   upsert: false
    };
   
	db.empl_trip.update(query, dataToBeUpdate, options);
	callback("started");
};

var end = function(req, callback) {
	var input = JSON.parse(JSON.stringify(req.body));	
    var tripId = input.tripId;
    var endLat = input.endLat;
    var endLong = input.endLong;
    var status = 'end';

	 var query = {
    _id : tripId
    };
    
    var dataToBeUpdate = {
        endLat : endLat,
		endLong : endLong,
        status:status
    };
    
    var options = {
   multi: false,
   upsert: false
    };
    
	db.empl_trip.update(query, dataToBeUpdate, options);
	callback("ended");
};


var list = function(req, callback) {
    var status=req.query.status;
    var userId=req.query.userId;
    var driverId=req.query.driverId;
    
    var query={};
    if(status != null){
       query={'status':status};     
    }
    
    if(userId != null){ 
       query={'userId':userId}; 
    } 
                              
    if(driverId != null){ 
       query={'driverId':driverId};  
    } 

    var resp=db.empl_trip.find(query); 
	callback(resp);
}

var nearby = function(req, callback) {
    var input = JSON.parse(JSON.stringify(req.body));	
    var startLat = input.startLat;
	var startLon = input.startLon;
    var cabType = input.cabType;

    cab.nearbyCabList(startLat, startLon, cabType, function(resp){
    callback(resp);
    });
}
    
module.exports = {
    create: create,
	start : start,
	end : end,
     list: list,
    nearby: nearby
}