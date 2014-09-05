/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

/* GET home page. */
var https = require('https');
var Cookies = require('cookies');

exports.index = function(req, res){
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var final_data = {};
	
	if(typeof cookie_github == 'undefined')
	{
		console.log('Cookie not found');
		res.render('index', { data: final_data });
	}
	else
	{
		final_data.cookie = JSON.parse(cookie_github);
		console.log("Access token: " + final_data.cookie.access_token);
		
		var options = {
				hostname : 'api.github.com',
				port : 443,
				path : '/user?access_token=' + final_data.cookie.access_token,
				method : 'GET',
				rejectUnauthorized : false,
				requestCert : true,
				agent : false,
				headers: {'user-agent': 'node.js'}
			};
		
		var api_request = https.request(options, function(response) {
	      
			response.setEncoding('utf-8');
			var responseString = '';

			response.on('data', function(data) {
	            responseString += data;
	            //console.log("data log: " + data);
			});

	        response.on('end', function() {
				json = JSON.parse(responseString);
				callback(res, res.statusCode, json);
			});
			req.on('error', function(e) {
				console.log('problem with the request: ' + e.message);
			});
		});

		function callback(res, status, data){
			console.log('callback: status: '+ status);
			//console.log('data: ' + data);
			
			var json_data = JSON.stringify(data);
			cookies.set('mwd2014-user', json_data);

			final_data.user = data;

			res.render('index', { data: final_data });
		}
		
		api_request.end();
	}
};
