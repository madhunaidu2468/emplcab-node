var trip = require('../dao/trip');
var util = require('../util/util');

var create = function(req, res) {	
	trip.create(req, function(response) {
        res.status(201);
        util.successResponse(res, response);
    });
};

var start = function(req, res) {
	trip.start(req, function(response) {
        res.status(200);
        util.successResponse(res, response);
    });
};

var end = function(req, res) {
	trip.end(req, function(response) {
        res.status(200);
        util.successResponse(res, response);
	});
};

var nearby = function(req, res) {
    
	trip.nearby(req, function(response) {	
        
        var resp = [];
		for (var i = 0; i < response.length; i++) {
			resp.push(response[i]);
		}
		util.successListResponse(res, resp);
	});
};

var list = function(req, res) {
	trip.list(req, function(response) {
		var resp = [];
		for (var i = 0; i < response.length; i++) {
			resp.push(response[i]);
		}
		util.successListResponse(res, resp);
	});
};




module.exports = {
	start : start,
	end : end,
	nearby : nearby,
    create: create,
    list: list
}