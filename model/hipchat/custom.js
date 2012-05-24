var requests = require('request');

module.exports = {
	//initialize required parameters to connect hipchat API
	init : function init(){
		var options = {
			token : '752ff4f92f8244c38a0d1b1deede6a',
			notify: 1
		}
		
		return options;
	},
	
	message : function message(obj, callback){
		var init = this.init();
		init.from = obj.username.replace(/[\s]+/g, '+');
		init.room_id = obj.room_id;
		init.color = obj.color;
		var message = obj.message.replace(/[\s]+/g, '+');
		
		var url = 'https://api.hipchat.com/v1/rooms/message?'+
					'format=json&'+
					'auth_token='+ init.token +'&'+
					'room_id='+ init.room_id +'&'+
					'color='+ init.color +'&'+
					'notify='+ init.notify +'&'+
					'from='+ init.from +'&'+
					'message='+message;
				
		requests.post({
			headers : {
				'Content-Length' : url.length
			},
			url : url
		}, function(err, res, body){
			callback(err, body);
		});
	},
	
	//list all rooms in hipchat
	roomList : function roomList(){
		var options = this.init();
		var url = 'https://api.hipchat.com/v1/rooms/list?'+ 'format=json&'+ 'auth_token='+ options.token;
		
		requests.get({
			headers : {
				'Content-Length' : url.length
			},
			url: url
		}, function(err, res, body){
			body = JSON.parse(body);
			console.log(body);
		});
	},
	
	//list all users in hipchat
	userList : function userList(){
		var options = this.init();
		var url = 'https://api.hipchat.com/v1/users/list?'+ 'format=json&'+ 'auth_token='+ options.token;
		
		requests.get({
			headers : {
				'Content-Length' : url.length
			},
			url: url
		}, function(err, res, body){
			body = JSON.parse(body);
			console.log(body);
		});
	}
}