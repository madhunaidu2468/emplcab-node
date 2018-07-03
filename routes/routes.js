var index = require('./index'), driver = require('./driver'), cab = require('./cab'), trip = require('./trip'), user = require('./user');




module.exports = function(app) {
    
	app.get('/', index.index);

	// user
	app.post('/user/login', user.login);
	app.post('/user/register', user.register);
	app.get('/user/logout/:phoneNo', user.logout);
    app.get('/user/details/:phoneNo', user.details);

	// driver
	app.post('/driver/login', driver.login);
	app.get('/driver/logout/:phoneNo', driver.logout);
    app.get('/driver/details/:phoneNo', driver.details);
	app.post('/driver/register', driver.register);

	// cab
	app.post('/cab/add', cab.add);
	app.del('/cab/remove/:cabId', cab.remove);
	app.get('/cab/details/:cabId', cab.details);
	app.put('/cab/updateStatus/:cabId/:status', cab.updateStatus);
	app.get('/cab/list', cab.list);

	// trip
	app.post('/trip/nearby', trip.nearby);
    app.post('/trip/create', trip.create);
	app.post('/trip/start', trip.start);
	app.post('/trip/end', trip.end);
    app.get('/trip/list', trip.list);

}