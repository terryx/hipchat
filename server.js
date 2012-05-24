// globals
var fs			= require('fs'),
express			= require('express'),
app				= module.exports = express.createServer(),
requests		= require('request');

var options         = {
	host: 'localhost',
	port: 9999
};

var NEWLINE         = '\r\n';
// configuration
app.configure(function() {
	// register Embedded JavaScript to the html extension
	app.register('.html', require('ejs'));

	// using html (which is actually ejs) for views
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.set('view options', {
		open    : '{{',
		close   : '}}'
	});
	
	// parse url-encoded form data or JSON
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "NodeHackWeb Secret"
	}));

	// allow HTTP method override support
	app.use(express.methodOverride());
	
	// give priority to routing before static
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// development-specific configuration
app.configure('development', function() {
	console.log('DEVELOPMENT MODE');
	
	app.set('view options', {
		layout:false
	});

	app.use(express.errorHandler({
		dumpExceptions  : true,
		showStack       : true
	}));
});

// production-specific configuration
app.configure('production', function() {
	console.log('PRODUCTION MODE');

	app.use(express.errorHandler());
});

//routes - require each script respectively
var Home			= require(__dirname + '/controller/home')(app);

// dont run it if it's being included as a module!
if (!module.parent) {
	app.listen(options.port, options.host, function() {
		var address = app.address();

		console.log('Listening on mynode http://%s:%d', address.address, address.port);
	});
}