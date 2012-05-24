var Hipchat		= require(__dirname + '/../model/hipchat/custom');

//Home page view
module.exports = function (app) {
	app.get('/', function(request, response, next) {
		response.render('index.html');
	});
	
	app.get('/home', function(request, response, next) {
		response.render('index.html');
	});
    
    app.get('/home/room-list', function(request, response){
        Hipchat.roomList();
    });
	
	app.post('/hipchat-message', function(req, res){
		
		var obj = {
			"room_id"	: req.body.room_id,
			"username"	: req.body.username,
			"color"		: req.body.color,
			"message"	: req.body.message
		};
		
		Hipchat.message(obj, function(err, body){
			if(body){
				body = JSON.parse(body);
				if(body.status === 'sent'){
					res.send(['true']);
				}
				
				else if(body.error){
					res.send([body.error.message]);
				}
			}
		});
	});
}