/**
 * Module dependencies.
 */

var express = require('express'), router = express.Router(), routes = require('./routes/routes'), user = require('./routes/user'), http = require('http'), path = require('path'), bodyParser = require('body-parser'), expressValidator = require('express-validator'), methodOverride = require('method-override'), session = require('express-session'), errorHandler = require('errorhandler'),
     mqtt=require('./mqtt/mqtt');

var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.use(methodOverride());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(expressValidator());

routes(app);

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})


    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

module.exports = app;
