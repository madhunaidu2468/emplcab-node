var cab = require('../dao/cab');
var util = require('../util/util');

var add = function(req, res) {
	var cabId = req.query.cabId;
    
	cab.details(cabId, function(response) {
		if (response != null) {
			return res.status(409).send('cab exists');
		}
		cab.add(req, function() {
			return res.status(201).end();
		});

	});
};

var remove = function(req, res) {
	var cabId = req.params.cabId;
	cab.details(cabId, function(response) {
		if (response == null) {
			return res.status(404).send('cab invalid');
		}
		cab.remove(response, function() {
			return res.status(200).end();
		});
	});

};

var details = function(req, res) {
	var cabId = req.params.cabId;
	cab.details(cabId, function(response) {
		util.successResponse(res, response);
	});
}

var updateStatus = function(req, res) {
	var cabId = req.params.cabId;

	cab.details(cabId, function(response) {
		if (response == null) {
			return res.status(404).send('cab invalid');
		}
		cab.updateStatus(req, function() {
			return res.status(200).end();
		});
	});
}

var list = function(req, res) {
    var type=req.query.cabType;
	cab.list(type, function(response) {
		var resp = [];
		for (var i = 0; i < response.length; i++) {
			resp.push(response[i]);
		}
		util.successListResponse(res, resp);
	});
}


module.exports = {
	add : add,
	remove : remove,
	details : details,
	updateStatus : updateStatus,
	list : list,
	updateStatus:updateStatus
}